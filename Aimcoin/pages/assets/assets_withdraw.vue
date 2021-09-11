<template>
	<view class="pages" :data-theme="pageTheme">
		<view class="initHeader initHeader--fixed" :class="pageTheme == 'light' ? 'initHeader--black' : 'initHeader--white'">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">提币</view>
				<view class="initHeader-record" @click="$tools.jump('../assets/assets_withdraw_record', currencyVal, currencyLabel)"></view>
			</view>
		</view>
		<view class="main">
			<view class="infoBox">
				<view class="titleBox"><view class="titleBox-label">USDT</view></view>

				<!-- <view class="selectBox" @click="currencyVisible = true">
					<view class="selectBox-wrapper">
						<view class="selectBox-label">选择币种</view>
						<view class="selectBox-data">{{ currencyLabel }}</view>
					</view>
				</view> -->

				<view class="filterBox">
					<view class="filterBox-wrapper">
						<view class="filterBox-label">链名称</view>
						<view class="filterBox-button">
							<view
								class="filterBox-button__btn"
								:class="{ 'filterBox-button__btn--active': typeActive == index }"
								v-for="(item, index) in typeList"
								:key="index"
								@click="changeTypeActive(index)"
							>
								{{ item.name }}
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="initFormBox">
				<view class="initFormBox-wrapper">
					<view class="initFormBox-item">
						<view class="initFormBox-item__label">提币地址</view>
						<view class="initFormBox-item__input">
							<input type="text" placeholder-class="initFormBox-item__placeholder" placeholder="输入或长按粘贴地址" v-model="address" />
							<view class="initFormBox-item__scan" @click="scanCode()">
								<image :src="'../../static/public/icon-scan-' + pageTheme + '.png'" mode="widthFix"></image>
							</view>
						</view>
					</view>
					<view class="initFormBox-item">
						<view class="initFormBox-item__label">数量</view>
						<view class="initFormBox-item__input">
							<input type="number" placeholder-class="initFormBox-item__placeholder" placeholder="请输入提币数量" v-model="quantity" />
							<text class="initFormBox-item__type">{{ currencyLabel }}</text>
							<text class="initFormBox-item__btn" @click="allNum()">全部</text>
						</view>
						<view class="initFormBox-item__note">*可用数量: {{ using | number(4) }} {{ currencyLabel }}</view>
					</view>

					<view class="initFormBox-item">
						<view class="initFormBox-item__label">交易密码</view>
						<view class="initFormBox-item__input">
							<input type="password" placeholder-class="initFormBox-item__placeholder" placeholder="请输入您的交易密码" v-model="tradePwd" />
						</view>
					</view>

					<!-- <view class="initFormBox-item">
						<view class="initFormBox-item__label">验证码</view>
						<view class="initFormBox-item__subLabel">向账号{{ phoneStr | conceal(3) }}发送验证码</view>
						<view class="initFormBox-item__input">
							<input type="number" maxlength="6" placeholder-class="initFormBox-item__placeholder" placeholder="请输入验证码" v-model="code" />
							<view class="initFormBox-item__code" :class="{ active: isSend }" @click.stop="sendCode">{{ remain }}</view>
						</view>
					</view> -->

					<view class="initFormBox-info">
						<view class="initFormBox-info__list">
							<view class="initFormBox-info__list-label">手续费</view>
							<view class="initFormBox-info__list-data">{{ serviceCharge | number(4) }} {{ currencyLabel }}</view>
						</view>
						<view class="initFormBox-info__list">
							<view class="initFormBox-info__list-label">实际到账</view>
							<view class="initFormBox-info__list-data">{{ actualArrival | number(4) }} {{ currencyLabel }}</view>
						</view>
					</view>
					<view class="initFormBox-tips">
						<view class="initFormBox-tips__title">温馨提示</view>
						<view class="initFormBox-tips__content">
							<view class="initFormBox-tips__list">1. 请确认目标提币地址是否存在且被激活，否则将会导致提币失败，且资产不可找回。</view>
							<view class="initFormBox-tips__list">
								2. 为保障资金安全，当您账户安全策略变更、密码修改、我们会对提币进行人工审核，请耐心等待工作人员电话或邮件联系。
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="initButton"><view class="initButton-btn initButton-btn--style" @click="sumbit()">提交</view></view>
		</view>

		<!-- 币种选择 -->
		<w-picker :visible.sync="currencyVisible" mode="selector" ref="currencyPicker" :options="currencyArray" @confirm="onPickerConfirm($event, 'currencyPicker')"></w-picker>
	</view>
</template>

<script>
export default {
	data() {
		return {
			/* 链类型 */
			typeList: [],
			typeActive: 0,

			configId: null,
			address: '', //充值地址
			quantity: '', //提币数量
			serviceCharge: 0, //手续费
			actualArrival: 0, //实际到账
			tradePwd: '', //交易密码
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
			remain: '发送',
			isSend: true,
			time: 60,
			timer: null,
			phoneStr: '',

			currencyVisible: false,
			currencyLabel: '', //币种
			currencyVal: null,
			currencyArray: [],
			currencyInfoList: [],
			currencyMain: false //是否主网币
		};
	},
	watch: {
		quantity() {
			if (this.quantity == '') {
				this.serviceCharge = 0;
			} else {
				if (this.typeList[this.typeActive].percentage == 1) {
					this.serviceCharge = this.quantity * this.typeList[this.typeActive].rate;
				} else {
					this.serviceCharge = this.typeList[this.typeActive].rate;
				}
			}
			this.actualArrival = this.quantity - this.serviceCharge;
		}
	},
	onLoad() {
		this.phoneStr = uni.getStorageSync('gobalUser');
	},
	onShow() {
		this.$setStatusBarStyle();
		this.$setTarBar();

		this.typeList = [];
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
					type: 2
				},
				res => {
					// console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.currencyArray = res.obj;
						this.currencyArray.forEach(item => {
							item.label = item.currencyName;
							item.value = item.currencyId;
						});
						this.currencyLabel = this.currencyArray[0].label;
						this.currencyVal = this.currencyArray[0].value;
						this.getCurrencyInfo();
						this.getUsing();
					}
				}
			);
		},

		//读取币种信息
		getCurrencyInfo() {
			this.$Ajax(
				'/front/financial/extractInit',
				{
					currencyId: 1
				},
				res => {
					console.log('读取币种信息' + JSON.stringify(res));
					if (res.code == 0) {
						this.currencyMain = res.obj.main;
						if (res.obj.main) {
							this.typeList = this.typeList.push(res.obj);
							this.configId = res.obj.id;
						} else {
							this.typeList = res.obj.configList;
							this.configId = this.typeList[0].id;
						}
					}
				}
			);
		},

		//获取可用资产
		getUsing() {
			this.$Ajax(
				'/front/financial/get/balance',
				{
					walletType: 1
				},
				res => {
					console.log(JSON.stringify(res.obj));
					if (res.code == 0) {
						this.using = res.obj;
					}
				}
			);
		},

		//提币全部
		allNum() {
			this.quantity = this.using;
		},

		//提取申请
		sumbit() {
			if (this.address == '') {
				return this.$tools.toast('请输入提币地址');
			}

			if (this.quantity == '') {
				return this.$tools.toast('请输入提币数量');
			}

			if (this.actualArrival < 0) {
				return this.$tools.toast('可用数量不足');
			}

			// if (this.code == '') {
			// 	return this.$tools.toast('请输入验证码');
			// }

			if (this.tradePwd == '') {
				return this.$tools.toast('请输入支付密码');
			}

			if (this.quantity <= 0) {
				return this.$tools.toast('请输入正确的数量');
			}

			this.$Ajax(
				'/front/financial/apply',
				{
					configId: this.configId,
					quantity: this.quantity,
					address: this.address,
					tradePwd: this.tradePwd
					// code: this.code,
				},
				res => {
					console.log(res);
					if (res.code == 0) {
						this.quantity = '';
						this.address = '';
						this.code = '';
						this.tradePwd = '';
						this.$tools.toast('提现申请成功');
						this.getUsing();
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
		changeTypeActive(index) {
			if (this.typeActive != index) {
				this.typeActive = index;
				this.configId = this.typeList[index].id;
				this.quantity = '';
			}
		},

		/* 底部选项卡公用 */
		onPickerConfirm(res, type) {
			console.log('当前控制的Picker是：' + type + ';当前值是' + res.obj.value);
			if (type == 'currencyPicker') {
				this.typeList = [];
				this.typeActive = 0;
				this.currencyLabel = res.obj.label;
				this.currencyVal = res.obj.value;
				this.getCurrencyInfo();
				this.getUsing();
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/assets_withdraw';
</style>
