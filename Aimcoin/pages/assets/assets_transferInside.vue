<template>
	<view class="pages" :data-theme="pageTheme">
		<view class="initHeader initHeader--line" :class="pageTheme == 'light' ? 'initHeader--black' : 'initHeader--white'">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">划转</view>
				<view class="initHeader-record" @click="$tools.jump('../assets/assets_transferInside_record')"></view>
			</view>
		</view>
		<view class="main">
			<view class="conversionBox">
				<view class="conversionBox-wrapper">
					<view class="conversionBox-select">
						<view class="conversionBox-select__list">
							<view class="conversionBox-select__list-label">转出：</view>
							<text class="conversionBox-select__list-data">佣金账户</text>
						</view>
						<view class="conversionBox-select__list">
							<view class="conversionBox-select__list-label">转入：</view>
							<text class="conversionBox-select__list-data">资金账户</text>
						</view>
					</view>
					<view class="conversionBox-button"></view>
				</view>
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
	</view>
</template>

<script>
export default {
	data() {
		return {
			quantity: '',
			tradePwd: '',

			using: 0,
		};
	},
	onShow() {
		this.$setStatusBarStyle();
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
					walletType: 3
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
				return this.$tools.toast('请输入划转数量');
			}

			if (this.tradePwd == '') {
				return this.$tools.toast('请输入交易密码');
			}
			
			if (this.quantity <= 0) {
				return this.$tools.toast('请输入正确的数量');
			}

			this.$Ajax(
				'/front/financial/inner/transfer',
				{
					quantity: this.quantity,
					tradePwd: this.tradePwd
				},
				res => {
					if (res.code == 0) {
						this.$tools.toast('划转成功');
						this.quantity = '';
						this.tradePwd = '';
						this.getUsing();
					}
				}
			);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/assets_transferInside';
</style>
