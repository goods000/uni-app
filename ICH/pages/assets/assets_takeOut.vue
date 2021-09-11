<template>
	<view class="pages">
		<view class="initHeader initHeader--line initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">提币</view>
				<view class="initHeader-record" @click="$tools.jump('../assets/assets_takeOut_record', currencyVal, currencyLabel)"></view>
			</view>
		</view>
		<view class="main">
			<view class="selectBox" @click="currencyVisible = true">
				<view class="selectBox-wrapper">
					<view class="selectBox-title">选择币种</view>
					<view class="selectBox-data">{{ currencyLabel }}</view>
				</view>
			</view>

			<view class="formBox">
				<view class="formBox-wrapper">
					<view class="formBox-list">
						<view class="formBox-list__label">提币地址</view>
						<view class="formBox-list__input">
							<input type="text" placeholder-class="formBox-placeholder" placeholder="输入或长按粘贴地址" v-model="address" />
							<view class="formBox-list__scan" @click="scanCode()"><image src="../../static/assets/icon-scan.png" mode="widthFix"></image></view>
						</view>
					</view>
					<view class="formBox-list">
						<view class="formBox-list__label">提币数量</view>
						<view class="formBox-list__input">
							<input
								type="number"
								placeholder-class="formBox-placeholder"
								:placeholder="'最低提币' + currencyInfoList.min + '个'"
								v-model="quantity"
							/>
							<text class="formBox-list__input-type">{{ currencyLabel }}</text>
							<text class="formBox-list__input-btn" @click="allNum()">全部</text>
						</view>
						<view class="formBox-list__note">可用数量 {{ currencyInfoList.using | number(4) }} {{ currencyLabel }}</view>
					</view>

					<view class="formBox-info">
						<view class="formBox-info__list">
							<view class="formBox-info__list-label">手续费</view>
							<view class="formBox-info__list-data">{{ charge | number(4) }} {{ currencyLabel }}</view>
						</view>
						<view class="formBox-info__list">
							<view class="formBox-info__list-label">实际到账</view>
							<view class="formBox-info__list-data">{{ actual | number(4) }} {{ currencyLabel }}</view>
						</view>
					</view>

					<view class="formBox-list">
						<view class="formBox-list__label">验证码</view>
						<view class="formBox-list__note">向手机号{{ phoneStr | conceal(3) }}发送验证码</view>
						<view class="formBox-list__input">
							<input type="number" placeholder-class="formBox-placeholder" placeholder="请输入验证码" v-model="code" />
							<view class="formBox-list__input-code" :class="{ active: isSend }" @click.stop="sendCode">{{ remain }}</view>
						</view>
					</view>

					<view class="formBox-list">
						<view class="formBox-list__label">支付密码</view>
						<view class="formBox-list__input">
							<input type="password" placeholder-class="formBox-placeholder" placeholder="请输入支付密码" v-model="tradePsw" />
						</view>
					</view>

					<view class="formBox-list">
						<view class="formBox-list__tips">温馨提示</view>
						<view class="formBox-list__note">最小提币数量为： {{ currencyInfoList.min }} {{ currencyLabel }}。</view>
						<view class="formBox-list__note">为了保证资金安全，当您账户安全策略变更、密码修改、我们会对人工审核，请耐心等待。</view>
						<view class="formBox-list__note">请务必确认电脑及浏览器安全，防止信息被篡改或泄露。</view>
					</view>

					<view class="initButton"><view class="initButton-btn initButton-btn--blue" @click="apply()">提币</view></view>
				</view>
			</view>
		</view>

		<!-- 币种选择 -->
		<w-picker
			:visible.sync="currencyVisible"
			mode="selector"
			ref="currencyPicker"
			default-type="label"
			:options="currencyArray"
			@confirm="onPickerConfirm($event, 'currencyPicker')"
			themeColor="#2989fd"
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
			address: '', //充值地址
			quantity: '', //提币数量
			charge: 0, //手续费
			actual: 0, //实际到账
			tradePsw: '', //交易密码
			remark: '', //备注
			labelMsg: '', //充值标签
			
			
			using: '', //可提数量
			percentage: '', //提币规则是否百分比(百分比:提币数量*rate,不为百分比:提币数量-tate)
			rate: '', //提币扣除手续费
			min: 0,
			max: 0,
			temporary: '', //临时
			
			currencyId: '', //币种ID
			currencyList: [],
			code: '', //验证码
			remain: '获取验证码',
			isSend: true,
			time: 60,
			timer: null,
			phoneStr: '',

			currencyVisible: false,
			currencyLabel: '', //币种
			currencyVal: '',
			currencyArray: [],
			currencyInfoList: [],
		};
	},
	watch:{
		quantity(){
			if(this.quantity == ''){
				this.charge = 0;
			}else{
				if (this.currencyInfoList.percentage) {
					this.charge = this.quantity * this.currencyInfoList.rate;
				} else {
					this.charge = this.currencyInfoList.rate;
				}
			}
			
			this.actual = this.quantity - this.charge;
			
			// if(Number(this.quantity) + Number(this.charge) > this.currencyInfoList.using){
			// 	this.actual = this.quantity - this.charge;
			// }else{
			// 	this.actual = this.quantity;
			// }
			
			
			// console.log(this.currencyInfoList.using - this.quantity > 0)
			// console.log(this.currencyInfoList.using - this.quantity > this.charge)
			// if (this.currencyInfoList.using - this.quantity > 0 && this.currencyInfoList.using - this.quantity > this.charge) {
			// 	this.actual = this.quantity;
			// } else {
			// 	this.actual = this.quantity - this.charge;
			// }
			// console.log('手续费：' + this.charge);
		}
	},
	onLoad() {
		this.phoneStr = uni.getStorageSync('gobalUser');
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
						this.currencyArray = res.obj;
						this.currencyArray.forEach(item => {
							item.label = item.name;
							item.value = item.key;
						});
						console.log(JSON.stringify(this.currencyArray));
						
						if(this.currencyLabel == ''){
							this.currencyLabel = this.currencyArray[0].label;
						}
						if(this.currencyVal == ''){
							this.currencyVal = this.currencyArray[0].value;
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
					currencyId: this.currencyVal
				},
				res => {
					if(res.code == 0){
						console.log(JSON.stringify(res.obj));
						this.currencyInfoList = res.obj;
					}
				}
			);
		},
		
		//提币全部
		allNum() {
			this.quantity = this.currencyInfoList.using;
			if (this.percentage) {
				this.charge = this.quantity * this.rate;
			} else {
				this.charge = this.rate;
			}
			this.actual = this.quantity - this.charge;
		},
		//提取申请
		apply() {
			if(this.address == ''){
				return this.$tools.toast('请输入提币地址');
			}
			
			if(this.quantity == ''){
				return this.$tools.toast('请输入提币数量');
			}
			
			if(this.code == ''){
				return this.$tools.toast('请输入验证码');
			}
			
			if(this.tradePsw == ''){
				return this.$tools.toast('请输入支付密码');
			}
			
			uni.showLoading({
				title: '提币中',
				mask: true
			})
			
			
			this.$Ajax(
				'/front/financial/apply',
				{
					currencyId: this.currencyVal,
					address: this.address,
					memo: '',
					remark: this.remark,
					quantity: this.quantity,
					tradePassword: this.tradePsw,
					code: this.code
				},
				res => {
					console.log(res);
					if (res.code == 0) {
						this.$tools.toast('提现申请成功');
						this.address = '';
						this.quantity = '';
						this.tradePsw = '';
						this.code = '';
						
						setTimeout(()=>{
							uni.hideLoading();
						}, 500);
					}
				},
				fail =>{
					setTimeout(()=>{
						uni.hideLoading();
					}, 500);
					// uni.hideLoading();
				}
			);
		},
		//扫一扫
		scanCode() {
			uni.scanCode({
				onlyFromCamera: true,
				success: res => {
					// console.log('条码类型：' + res.scanType);
					// console.log('条码内容：' + res.result);
					let msg = res.result;
					this.address = msg;
				}
			});
		},
		// 获取验证码
		sendCode() {
			if (this.isSend) {
				this.$Ajax(
					'/ajax/sendMyCode',
					{},
					res => {
						this.isSend = false;
						this.remain = this.time + 's后可重发';
						this.timer = setInterval(() => {
							this.time--;
							this.remain = this.time + 's后可重发';
							if (this.time == 0) {
								this.remain = '重新获取';
								clearInterval(this.timer);
								(this.isSend = true), (this.time = 60);
							}
						}, 1000);
					},
					failResponse => {}
				);
			}
		},

		/* 底部选项卡公用 */
		onPickerConfirm(res, type) {
			console.log('当前控制的Picker是：' + type + ';当前值是' + res.obj.value);
			if (type == 'currencyPicker') {
				this.currencyLabel = res.obj.label;
				this.currencyVal = res.obj.value;
				this.getCurrencyInfo();
			}
		},
	}
};
</script>

<style lang="scss" scoped>
.main {
	padding: 30upx;
	margin-bottom: 60upx;
}

.selectBox {
	margin-bottom: 30upx;
	&-wrapper {
		@include flexBetween;
		font-size: 32upx;
	}

	&-label {
		color: #101010;
	}

	&-data {
		@include flexRight;
		color: #101010;
		background-image: url(../../static/public/icon-arrow-right-grey.png);
		background-size: 14upx 26upx;
		background-position: right center;
		background-repeat: no-repeat;
		padding-right: 30upx;
	}
}

.formBox {
	font-size: 28upx;
	&-list {
		margin-bottom: 60upx;
		color: #101010;
		&__input {
			display: flex;
			align-items: center;
			padding: 15upx 0;
			border-bottom: 2upx solid #c6d2e4;
			font-size: 28upx;

			input {
				font-size: inherit;
				flex: 1;
				text-align: left;
			}
			&-type {
				padding: 0 15upx;
				border-right: 2upx solid #e1e1e1;
				color: #acb1b0;
			}
			&-btn {
				color: #3583ff;
				padding-left: 15upx;
			}
			&-code {
				color: #3583ff;
			}
		}

		&__scan {
			width: 32upx;
			@include fullImage;
		}

		&__label {
			color: #101010;
		}

		&__note {
			font-size: 24upx;
			color: #acb1b0;
			margin-top: 15upx;
		}
	}
	&-info {
		margin-bottom: 60upx;
		&__list {
			@include flexBetween;
			margin-bottom: 15upx;
			color: #101010;

			&:last-child {
				margin-bottom: 0;
			}
		}
	}
	&-placeholder {
		color: rgba(172, 177, 176, 0.5);
	}
}

.modalBox {
	// z-index: 999;
	font-size: 28upx;

	&-mask {
		width: 100vh;
		height: 100vh;
		position: fixed;
		left: 0;
		top: 0;
		background-color: rgba(0, 0, 0, 0.4);
		z-index: 9998;
	}
	&-wrapper {
		width: 650upx;
		position: fixed;
		left: 50upx;
		bottom: 0;
		background-color: #25263b;
		z-index: 9999;
		transform: translateY(calc(100% + 90upx));
		background-color: #ffffff;
		margin-bottom: 60upx;
		text-align: center;
		border-radius: 15upx;
		padding: 15upx 0;
	}

	&-title {
		color: #333333;
		font-size: 32upx;
		padding: 30upx 0;
	}

	&-listBox {
		color: #78849a;
		&__list {
			padding: 30upx 0;
			&--active {
				color: #27aae1;
			}
		}
	}
}
</style>
