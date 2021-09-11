<template>
	<view class="page">
		<view class="header_bar">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">{{ i18n.withdraw.title }}</view>
				<view class="header-right" @click="$tools.jump('./withdrawRecord',currencyId,selectType)">
					<image src="../../static/public/icon-record.png" mode="widthFix"></image>
				</view> 
			</view> 
		</view> 
		<view class="withdraw">
			<view class="withdrawBox">
				<view class="withdrawBox-listItem" @click="currencyVisible = true">
					<view class="withdrawBox-listItem-title">{{ i18n.withdraw.selectLabel }}</view>
					<view class="withdrawBox-listItem-picker">
						<view class="uni-input">{{selectType}}</view>
					</view>
				</view> 
				<!-- <view class="withdrawBox-list"> -->
				<!-- <view class="withdrawBox-list" v-if="currencyId == 1">
					<view class="withdrawBox-list-title">{{ i18n.recharge.chainName }}</view>
					<view class="withdrawBox-list-item">
						<view class="withdrawBox-list-item-type" :class="{'withdrawBox-list-item-type--active': tabsActive == 0 }" @click="changeTabsActive(0)">ERC20</view>
						<view class="withdrawBox-list-item-type" :class="{'withdrawBox-list-item-type--active': tabsActive == 1 }" @click="changeTabsActive(1)">TRC20</view>
					</view>
				</view> -->
				
				<view class="withdrawBox-list">
					<view class="withdrawBox-list-title">{{ i18n.withdraw.label_01 }}</view>
					<view class="withdrawBox-list-input">
						<input type="text" :placeholder="i18n.withdraw.placeholder_01" placeholder-style="color:#999999" v-model="address"/>
						<view class="withdrawBox-list-input-image" @click="scanCode()">
							<image src="../../static/public/icon-scan.png" mode="widthFix"></image>
						</view>
					</view>
				</view>
				<view class="withdrawBox-list">
					<view class="withdrawBox-list-title">{{ i18n.withdraw.label_02 }}</view>
					<view class="withdrawBox-list-input">
						<input type="text" value="" :placeholder="i18n.withdraw.placeholder_02" placeholder-style="color:#999999" v-model="num"/>
						<view class="withdrawBox-list-input-image">
							<view class="withdrawBox-list-input-u">{{ selectType }}</view>
							<view class="withdrawBox-list-input-all" @click="allNum()">{{ i18n.withdraw.all }}</view>
						</view>
					</view>
				</view>
				<view class="withdrawBox-banlance">{{ i18n.withdraw.using }} {{ currencyInfoList.using | number(4) }} {{ selectType }}</view>
				
				<view class="withdrawBox-list">
					<view class="withdrawBox-list-title">{{ i18n.global.code }}</view>
					<view class="withdrawBox-list-input">
						<input type="text" :placeholder="i18n.global.placeholder_code" placeholder-style="color:#999999" v-model="code"/>
						<view class="withdrawBox-list-input-image">
							<view class="withdrawBox-list-input-send" @click="sendCode()">{{ remain }}</view>
						</view>
					</view>
				</view>
				<view class="withdrawBox-list">
					<view class="withdrawBox-list-title">{{ i18n.global.tradePassword }}</view>
					<view class="withdrawBox-list-input">
						<input type="password" :placeholder="i18n.withdraw.placeholder_03" placeholder-style="color:#999999" v-model="password"/>
					</view>
				</view>
				
				<view class="withdrawBox-data">
					<view class="withdrawBox-data-bold">{{ i18n.withdraw.label_03 }}</view>
					<view class="withdrawBox-data-bold">{{actual | number(4) }} {{ selectType }}</view>
				</view>
				<view class="withdrawBox-data">
					<view class="withdrawBox-data-title">{{ i18n.withdraw.label_04 }}</view>
					<view class="withdrawBox-data-title">{{ charge | number(4) }}</view>
				</view>
				
				<view class="initBtn" @click="sumbit()">{{ i18n.withdraw.title }}</view>
				
				<view class="withdrawBox-tips">
					<view class="withdrawBox-tips-title">{{ i18n.withdraw.desc_00 }}</view>
					<view class="withdrawBox-tips-item">1.{{selectType}}{{ i18n.withdraw.desc_01 }}{{ i18n.withdraw.desc_011 }}{{selectType}}{{ i18n.withdraw.desc_0111 }}</view>
					<view class="withdrawBox-tips-item">2.{{ i18n.withdraw.desc_02 }}</view>
				</view>
				
			</view>
		</view>
		
		<!-- 币种选择 -->
		<w-picker
			:visible.sync="currencyVisible"
			mode="selector"
			ref="currencyPicker"
			default-type="label"
			:options="array"
			@confirm="onPickerConfirm($event, 'currencyPicker')"
		></w-picker>
	</view>
</template>

<script>
	import vPicker from '@/components/w-picker/w-picker.vue';
	export default {
		components: {
			vPicker
		},
		data() {
			return {
				currencyVisible: false,
				array: [{label:''}],
				index: 0,
				tabsActive: 0,
				selectType:'',
				currencyId:'',
				address: '',
				num: '',
				password: '',
				code: '',
				// 验证码
				remain: this.$t('message').global.sendCode,
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
		computed: {
			i18n() {
				return this.$t('message');
			}
		},
		onShow() {
			this.init();
		},
		methods: {
			changeTabsActive(index) {
				this.tabsActive = index;
				// if(this.tabsActive == 1){
				// 	this.currencyId = 0;
				// 	this.getCurrencyInfo();
				// }
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
								this.selectType = this.array[0].label;
							}
							if(this.currencyId == ''){
								this.currencyId = this.array[0].value;
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
					return this.$tools.toast(this.i18n.withdraw.toast_01);
				}
				
				if(this.num == ''){
					return this.$tools.toast(this.i18n.withdraw.toast_02);
				}
				if(this.code == ''){
					return this.$tools.toast(this.i18n.withdraw.toast_03);
				}
				if(this.password == ''){
					return this.$tools.toast(this.i18n.withdraw.toast_04);
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
							this.$tools.toast(this.i18n.withdraw.toast_05);
						}
					}
				);
			},
			sendCode() {
				uni.showLoading({
					title: this.i18n.global.sending,
					mask: true
				});
				this.$Ajax('/ajax/sendMyCode',{},res => {
						if (res.code == 0) {
							this.$tools.toast(this.i18n.global.sendSuccess);
							this.isSend = false;
							this.remain = this.time + this.i18n.global.reacquire;
							this.timer = setInterval(() => {
								this.time--;
								this.remain = this.time + this.i18n.global.reacquire;
								if (this.time == 0) {
									clearInterval(this.timer);
									this.remain = this.i18n.global.reacquire_01;
									(this.isSend = true), (this.time = 60);
								}
							}, 1000);
						}
					}
				);
				uni.hideLoading();
			},
			/* 底部选项卡公用 */
			onPickerConfirm(res, type) {
				console.log('当前控制的Picker是：' + type + ';当前值是' + res.obj.label + ';key--value' + res.obj.value);
				if (type == 'currencyPicker') {
					this.selectType = res.obj.label;
					this.currencyId = res.obj.value;
					this.num = ''
					this.charge = ''
					this.actual = ''
					this.getCurrencyInfo();
				}
			},
			//扫一扫
			scanCode() {
				var that = this; 
				uni.scanCode({
					onlyFromCamera: true,
					// success: res => {
					success: function (res)  {  
						let msg = res.result;
						that.address = msg;
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
