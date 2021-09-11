<template>
	<view class="pages">
		<view class="">
			
			<view class="header_bar header_bg">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">提币</view>
					<view class="header-right"@click="$tools.jump('./withdrawRecord',currencyId,selectType)">提币记录</view>
				</view> 
			</view> 
			
			<view class="form">
				<picker @change="bindPickerChange" :value="index" :range="array" range-key="name" class="form-wrapper-picker">
					<view class="form-wrapper__title">{{array[index].name}}</view>
					<view class="form-wrapper__txt">选择币种</view>
				</picker>
				<view class="form-wrapper">
					<view class="form-wrapper-label">提币地址</view>
					<input type="text" placeholder="输入或长按粘贴地址" v-model="address" placeholder-style="color:#999999" />
					<image src="../../static/public/icon-scan.png" mode="widthFix" @click="scanCode()"></image>
				</view>
				<view class="form-wrapper">
					<view class="form-wrapper-label">提币数量</view>
					<input type="text" :placeholder="'最小提币数量' + currencyInfoList.min" v-model="num" placeholder-style="color:#999999" />
					<view class="form-wrapper-txt">{{ selectType }}</view>
				</view>
				<view class="form-item">余额 {{currencyInfoList.using}}{{ selectType }}</view>
				<view class="form-wrapper">
					<view class="form-wrapper-label">手续费</view>
					<input type="text" v-model="charge" placeholder-style="color:#999999" disabled/>
					<view class="form-wrapper-txt">{{ selectType }}</view>
				</view>
				<view class="form-wrapper">
					<view class="form-wrapper-label">钱包密码</view>
					<input type="password" placeholder="请输入您的钱包密码" v-model="password" placeholder-style="color:#999999" />
				</view>
				
				<view class="form-tips">
					<view class="form-tips-txt">注意：</view>
					<view class="form-tips-txt">最小提币数量为{{ currencyInfoList.min }}{{ selectType }}，为保障您的账号安全，策略变更，密码修改我们会对提币进行人工审核，请耐心等候。请务必确保电脑及浏览安全，防止信息被篡改或泄露。</view>
				</view>
			
				<view class="form-flex">
					<view class="form-flex-txt">到账数量</view>
					<view class="form-flex-num">{{actual}} {{ selectType }}</view>
				</view>
				
				<view class="initBtn" @click="submit()">提币</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				array: [{
					name:'',
				}],
				index: 0,
				selectType:'',
				currencyId:'',
				address:'',
				num:'',
				password:'',
				actual: 0, //到账数量
				charge: 0, //手续费
				currencyInfoList: [],
				using: '', //可提数量
				percentage: '', //提币规则是否百分比(百分比:提币数量*rate,不为百分比:提币数量-tate)
				rate: '', //提币扣除手续费
				min: 0,
				max: 0,
			}
		},
		watch:{
			num(){
				if(this.num == ''){
					this.charge = 0;
				}else{
					if (this.currencyInfoList.percentage) {
						this.charge = this.num * this.currencyInfoList.rate;
					} else {
						this.charge = this.currencyInfoList.rate;
					}
				}
				
				this.actual = this.num - this.charge;
			}
		},
		onShow() {
			this.init();
		},
		methods: {
			init() {
				this.getCurrencyList();
			},
			//获取币种
			getCurrencyList() {
				this.$Ajax(
					'/search/currencyList',
					{
						type: 3
					},
					res => {
						if (res.code == 0) {
							this.array = res.obj;
							this.array.forEach(item => {
								item.label = item.name;
								item.value = item.key;
							});
							console.log(JSON.stringify(this.array));
							
							if(this.selectType == ''){
								this.selectType = this.array[0].name;
							}
							if(this.currencyId == ''){
								this.currencyId = this.array[0].key;
							}
							
							this.getCurrencyInfo();
						}
					}
				);
			},
			//读取币种信息
			getCurrencyInfo() {
				this.$Ajax(
					'/front/financial/extractInit',
					{
						currencyId: this.currencyId
					},
					res => {
						if(res.code == 0){
							this.currencyInfoList = res.obj;
						}
					}
				);
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + this.array[e.detail.value].key +';当前值是' + this.array[e.detail.value].name)
				this.index = e.detail.value
				this.currencyId = this.array[e.detail.value].key
				this.selectType = this.array[e.detail.value].name
				this.getCurrencyInfo();
			},
			submit(){
				if(this.address == ''){
					return this.$tools.toast('请输入地址');
				}
				if(this.num == ''){
					return this.$tools.toast('请输入数量');
				}
				if(this.password == ''){
					return this.$tools.toast('请输入您的钱包密码');
				}
				this.$Ajax('/front/financial/apply', {
					currencyId:this.currencyId,
					quantity:this.num,
					address:this.address,
					memo: '',
					tradePassword:this.password,
				}, res => {
						if (res.code == 0) {
							this.address = '',
							this.num = '',
							this.password = '',
							this.$tools.toast(res.msg);
						}
					}
				);
			},
			// 扫一扫
			scanCode() {
				uni.scanCode({
					onlyFromCamera: true,
					success: res => {
						let msg = res.result;
						this.address = msg;
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/withdraw/withdraw';
	page{background: #FFFFFF;}
</style>
