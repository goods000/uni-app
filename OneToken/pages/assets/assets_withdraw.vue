<template>
	<view class="pages">
		<view class="initHeader initHeader--fixed initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">提币</view>
				<view class="initHeader-record" @click="$tools.jump('../assets/assets_withdraw_record', currencyVal, currencyLabel)"></view>
			</view>
		</view>
		<view class="main">
			<view class="infoBox">
				<view class="selectBox" @click="currencyVisible = true">
					<view class="selectBox-wrapper">
						<view class="selectBox-label">选择币种</view>
						<view class="selectBox-data">{{ currencyLabel }}</view>
					</view>
				</view>
			</view>

			<view class="formBox">
				<view class="formBox-wrapper">
					<view class="formBox-list">
						<view class="formBox-list__label">提币地址</view>
						<view class="formBox-list__input">
							<input type="text" placeholder-class="formBox-list__placeholder" placeholder="输入或长按粘贴地址" v-model="address" />
							<view class="formBox-list__scan" @click="scanCode()"><image src="../../static/public/icon-scan-black.png" mode="widthFix"></image></view>
						</view>
					</view>
					<view class="formBox-list">
						<view class="formBox-list__label">数量</view>
						<view class="formBox-list__input">
							<input type="number" placeholder-class="formBox-list__placeholder" placeholder="请输入提币数量" v-model="quantity" />
							<text class="formBox-list__input-type">{{ currencyLabel }}</text>
							<text class="formBox-list__input-btn" @click="allNum()">全部</text>
						</view>
						<view class="formBox-list__note">*可用数量: {{ currencyInfoList.using | number(4) }} {{ currencyLabel }}</view>
					</view>

					<view class="formBox-list">
						<view class="formBox-list__label">交易密码</view>
						<view class="formBox-list__input">
							<input type="password" placeholder-class="formBox-list__placeholder" placeholder="请输入您的交易密码" v-model="tradePsw" />
						</view>
					</view>

					<view class="formBox-list">
						<view class="formBox-list__label">验证码</view>
						<view class="formBox-list__subLabel">向手机号{{ phoneStr | conceal(3) }}发送验证码</view>
						<view class="formBox-list__input">
							<input type="number" maxlength="6" placeholder-class="formBox-list__placeholder" placeholder="请输入验证码" v-model="code" />
							<view class="formBox-list__input-code" :class="{ active: isSend }" @click.stop="sendCode">{{ remain }}</view>
						</view>
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
					<view class="formBox-tips">
						<view class="formBox-tips__title">温馨提示</view>
						<view class="formBox-tips__content">
							<view class="formBox-tips__list">1. 请确认目标提币地址是否存在且被激活，否则将会导致提币失败，且资产不可找回。</view>
							<view class="formBox-tips__list">2. 为保障资金安全，当您账户安全策略变更、密码修改、我们会对提币进行人工审核，请耐心等待工作人员电话或邮件联系。</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="initButton">
			<view class="initButton-btn initButton-btn--style" @click="sumbit()">提交</view>
		</view>

		<!-- 币种选择 -->
		<w-picker
			:visible.sync="currencyVisible"
			mode="selector"
			ref="currencyPicker"
			default-type="label"
			:options="currencyArray"
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
			currencyVal: null,
			currencyArray: [],
			currencyInfoList: []
		};
	},
	computed: {
		i18n() {
			return this.$t('message');
		}
	},
	watch: {
		quantity() {
			if (this.quantity == '') {
				this.charge = 0;
			} else {
				if (this.currencyInfoList.percentage) {
					this.charge = this.quantity * this.currencyInfoList.rate;
				} else {
					this.charge = this.currencyInfoList.rate;
				}
			}

			this.actual = this.quantity;

			// if(this.quantity + this.charge > this.currencyInfoList.using){
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
						this.currencyLabel = this.currencyArray[0].label;
						this.currencyVal = this.currencyArray[0].value;
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
					if (res.code == 0) {
						console.log(JSON.stringify(res.obj));
						this.currencyInfoList = res.obj;
					}
				}
			);
		},
		getUsing() {
			this.$Ajax(
				'/front/financial/currency/wallet',
				{
					currencyName: this.currencyLabel
				},
				res => {
					console.log(JSON.stringify(res.obj));
					if (res.code == 0) {
						this.using = res.obj.using;
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
		sumbit() {
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
			this.$Ajax(
				'/front/financial/apply',
				{
					currencyId: this.currencyVal,
					quantity: this.quantity,
					address: this.address,
					memo: '',
					code: this.code,
					tradePassword: this.tradePsw
				},
				res => {
					console.log(res);
					if (res.code == 0) {
						this.quantity = '';
						this.address = '';
						this.code = '';
						this.tradePsw = '';
						this.$tools.toast('提现申请成功');
						this.getCurrencyInfo();
					}
				}
			);
		},
		//扫一扫
		scanCode() {
			uni.scanCode({
				onlyFromCamera: true,
				success: res => {
					let msg = res.result;
					this.address = msg;
				}
			});
		},
		// 获取验证码
		sendCode() {
			if (this.isSend) {
				this.$Ajax('/ajax/sendMyCode', {}, res => {
					this.$tools.toast('发送成功');
					this.isSend = false;
					this.remain = this.time + 's';
					this.timer = setInterval(() => {
						this.time--;
						this.remain = this.time + 's';
						if (this.time == 0) {
							this.remain = '重新获取';
							clearInterval(this.timer);
							(this.isSend = true), (this.time = 60);
						}
					}, 1000);
				});
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
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/assets_withdraw';
</style>
