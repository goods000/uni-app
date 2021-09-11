<template>
	<view class="pages" :data-theme="pageTheme">
		<view class="initHeader initHeader--line" :class="pageTheme == 'light' ? 'initHeader--black' : 'initHeader--white'">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">兑换</view>
				<view class="initHeader-record" @click="$tools.jump('../assets/assets_exchange_record')"></view>
			</view>
		</view>
		<view class="main">
			<view class="accountBox" @click="accountVisible = true">
				<view class="accountBox-wrapper">
					<view class="accountBox-label">选择USDT账户</view>
					<view class="accountBox-data">{{ accountLabel }}</view>
				</view>
			</view>

			<view class="typeBox">
				<image src="../../static/assets/icon-exchange-type.png" mode="widthFix"></image>
			</view>

			<view class="initFormBox">
				<view class="initFormBox-wrapper">
					<view class="initFormBox-item">
						<view class="initFormBox-item__label">数量</view>
						<view class="initFormBox-item__list">
							<view class="initFormBox-item__input">
								<input type="number" placeholder-class="initFormBox-item__placeholder" placeholder="请输入数量" v-model="quantity" />
								<text class="initFormBox-item__type">USDT</text>
								<text class="initFormBox-item__btn" @click="getAll()">全部</text>
							</view>
						</view>
						<view class="initFormBox-item__note">*可用数量: {{ using | number(4) }} USDT</view>
					</view>
					<view class="initFormBox-item">
						<view class="initFormBox-item__label">交易密码</view>
						<view class="initFormBox-item__list">
							<view class="initFormBox-item__input">
								<input type="password" placeholder-class="initFormBox-item__placeholder" placeholder="请输入您的交易密码" v-model="tradePwd" />
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="initButton initButton--fixed"><view class="initButton-btn initButton-btn--style" @click="confirmOrder()">确定</view></view>

		<!-- 钱包选择 -->
		<w-picker :visible.sync="accountVisible" mode="selector" ref="accountPicker" :options="accountArray" @confirm="onPickerConfirm($event, 'accountPicker')"></w-picker>
	</view>
</template>

<script>
export default {
	data() {
		return {
			quantity: '',
			tradePwd: '',

			accountVisible: false,
			accountLabel: '', //币种
			accountVal: null,
			accountArray: [
				{
					label: '资金账户',
					value: 1
				},
				{
					label: '佣金账户',
					value: 3
				}
			],

			using: 0
		};
	},
	onShow() {
		this.$setStatusBarStyle();
		this.accountLabel = this.accountArray[0].label;
		this.accountVal = this.accountArray[0].value;
		
		this.init();
	},
	methods: {
		init() {
			this.getUsing();
		},
		getUsing() {
			this.$Ajax(
				'/front/financial/get/balance',
				{
					walletType: this.accountVal
				},
				res => {
					console.log(JSON.stringify(res.obj));
					if (res.code == 0) {
						this.using = res.obj;
					}
				}
			);
		},
		getAll() {
			this.quantity = this.using;
		},
		confirmOrder() {
			if (this.quantity == '') {
				return this.$tools.toast('请输入兑换数量');
			}

			if (this.tradePwd == '') {
				return this.$tools.toast('请输入交易密码');
			}
			
			if (this.quantity <= 0) {
				return this.$tools.toast('请输入正确的数量');
			}

			this.$Ajax(
				'/front/exchange/do',
				{
					walletType: this.accountVal,
					tradePwd: this.tradePwd,
					quantity: this.quantity
				},
				res => {
					if (res.code == 0) {
						this.$tools.toast('兑换成功');
						this.quantity = '';
						this.tradePwd = '';
						this.getUsing();
					}
				}
			);
		},

		/* 底部选项卡公用 */
		onPickerConfirm(res, type) {
			console.log('当前控制的Picker是：' + type + ';当前值是' + res.obj.value);
			if (type == 'accountPicker') {
				this.accountLabel = res.obj.label;
				this.accountVal = res.obj.value;
				this.getUsing();
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/assets_exchange';
</style>
