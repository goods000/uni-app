<template>
	<view class="page">
		<view class="header_bar">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">提币</view>
				<view class="header-right" @click="$tools.jump('./withdrawRecord',currencyId,selectType)">
					<image src="../../static/public/icon-record.png" mode="widthFix"></image>
				</view> 
			</view> 
		</view> 
		<view class="withdraw">
			<view class="withdrawBox">
				<view class="withdrawBox-listItem">
					<view class="withdrawBox-listItem-title">选择币种</view>
					<view class="withdrawBox-listItem-picker">
						<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
							<view class="uni-input">{{array[index].name}}</view>
						</picker>
					</view>
				</view> 
				<!-- <view class="withdrawBox-list">
					<view class="withdrawBox-list-title">链名称</view>
					<view class="withdrawBox-list-item">
						<view class="withdrawBox-list-item-type" :class="{'withdrawBox-list-item-type--active': tabsActive == 0 }" @click="changeTabsActive(0)">ERC20</view>
						<view class="withdrawBox-list-item-type" :class="{'withdrawBox-list-item-type--active': tabsActive == 1 }" @click="changeTabsActive(1)">TRC20</view>
					</view>
				</view> -->
				
				<view class="withdrawBox-list">
					<view class="withdrawBox-list-title">提币地址</view>
					<view class="withdrawBox-list-input">
						<input type="text" placeholder="输入或长按粘贴地址" placeholder-style="color:#999999" v-model="address"/>
						<view class="withdrawBox-list-input-image" @click="scanCode()">
							<image src="../../static/public/icon-scan.png" mode="widthFix"></image>
						</view>
					</view>
				</view>
				<view class="withdrawBox-list">
					<view class="withdrawBox-list-title">数量</view>
					<view class="withdrawBox-list-input">
						<input type="text" value="" placeholder="请输入提币数量" placeholder-style="color:#999999" v-model="num"/>
						<view class="withdrawBox-list-input-image">
							<view class="withdrawBox-list-input-u">{{ selectType }}</view>
							<view class="withdrawBox-list-input-all" @click="allNum()">全部</view>
						</view>
					</view>
				</view>
				<view class="withdrawBox-banlance">可用数量 {{ currencyInfoList.using | number(4) }} {{ selectType }}</view>
				
				<view class="withdrawBox-list">
					<view class="withdrawBox-list-title">验证码</view>
					<view class="withdrawBox-list-input">
						<input type="text" placeholder="请输入您的验证码" placeholder-style="color:#999999" v-model="code"/>
						<view class="withdrawBox-list-input-image">
							<view class="withdrawBox-list-input-send" @click="sendCode()">{{ remain }}</view>
						</view>
					</view>
				</view>
				<view class="withdrawBox-list">
					<view class="withdrawBox-list-title">交易密码</view>
					<view class="withdrawBox-list-input">
						<input type="password" placeholder="请输入您的交易密码" placeholder-style="color:#999999" v-model="password"/>
					</view>
				</view>
				
				<view class="withdrawBox-data">
					<view class="withdrawBox-data-bold">到账数量</view>
					<view class="withdrawBox-data-bold">{{actual | number(4) }} {{ selectType }}</view>
				</view>
				<view class="withdrawBox-data">
					<view class="withdrawBox-data-title">手续费</view>
					<view class="withdrawBox-data-title">{{ charge | number(4) }}</view>
				</view>
				
				<view class="initBtn" @click="sumbit()">提币</view>
				
				<view class="withdrawBox-tips">
					<view class="withdrawBox-tips-title">温馨提示</view>
					<view class="withdrawBox-tips-item">1.USDT钱包地址禁止充币除USDT之外的其他资产充币将不可找回。</view>
					<view class="withdrawBox-tips-item">2.为保障资金安全，当您账户安全策略变更、密码修改、我们会对提币进行人工审核，请耐心等待工作人员电话或邮件联系。</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'picker',
				array: [{name:''}],
				index: 0,
				tabsActive: 0,
				selectType:'',
				currencyId:'',
				address: '',
				num: '',
				password: '',
				code: '',
				// 验证码
				remain: '发送验证码',
				isSend: true,
				time: 60,
				timer: null,
				currencyInfoList:[],
				actual: 0, //到账数量
				charge: 0, //手续费
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
			changeTabsActive(index) {
				this.tabsActive = index;
			},
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
				this.num == ''
				this.charge == ''
				this.actual == ''
				this.getCurrencyInfo();
			},
			//提币全部
			allNum() {
				this.num = this.currencyInfoList.using;
				if (this.percentage) {
					this.charge = this.num * this.rate;
				} else {
					this.charge = this.rate;
				}
				this.actual = this.num - this.charge;
			},
			sumbit() {
				if(this.address == ''){
					return this.$tools.toast('请输入地址');
				}
				
				if(this.num == ''){
					return this.$tools.toast('请输入提币数量');
				}
				if(this.code == ''){
					return this.$tools.toast('请输入您的验证码');
				}
				if(this.password == ''){
					return this.$tools.toast('请输入交易密码');
				}
				this.$Ajax(
					'/front/financial/apply',
					{
						currencyId:this.currencyId,
						quantity:this.num,
						address:this.address,
						memo: '',
						tradePassword:this.password,
						code: this.code,
					},
					res => {
						if (res.code == 0) {
							this.address = '';
							this.num = '';
							this.code = '';
							this.password = '';
							this.$tools.toast('提币申请成功');
						}
					}
				);
			},
			sendCode() {
				uni.showLoading({
					title: '发送中',
					mask: true
				});
				this.$Ajax('/ajax/sendMyCode',{},res => {
						if (res.code == 0) {
							this.$tools.toast('发送成功 ');
							this.isSend = false;
							this.remain = this.time + 's后重新获取';
							this.timer = setInterval(() => {
								this.time--;
								this.remain = this.time + 's后重新获取';
								if (this.time == 0) {
									clearInterval(this.timer);
									this.remain = '重新获取';
									(this.isSend = true), (this.time = 60);
								}
							}, 1000);
						}
					}
				);
				uni.hideLoading();
			},
			//扫一扫
			scanCode() {
				uni.scanCode({
					onlyFromCamera: true,
					// success: res => {
					success: function (res)  {  
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
	page,.page{
		background: #F5F6FA;
		height: 100vh;
		overflow: scroll;
	}
</style>
