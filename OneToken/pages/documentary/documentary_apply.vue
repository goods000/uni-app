<template>
	<view class="pages">
		<view class="initHeader initHeader--black">
			<view class="initHeader-wrapper"><view class="initHeader-back" @click="$tools.back(1)"></view></view>
		</view>

		<view class="titleBox">
			<view class="titleBox-wrapper">
				<view class="titleBox-title">绑定{{ tradeExchangeName }}交易账户</view>
				<view class="titleBox-note">ONETOKEN仅为您的账户提供数据查询与自动交易服务，我们不会以任何形式泄露</view>
			</view>
		</view>

		<view class="formBox">
			<view class="formBox-wrapper">
				<view class="formBox-list">
					<view class="formBox-list__label">Api Key</view>
					<view class="formBox-list__input"><input type="text" placeholder-class="formBox-list__placeholder" placeholder="请输入您的Access Key" v-model="apiKey" /></view>
				</view>

				<view class="formBox-list">
					<view class="formBox-list__label">Secret Key</view>
					<view class="formBox-list__input">
						<input type="text" placeholder-class="formBox-list__placeholder" placeholder="请输入您的Secret Key" v-model="secretKey" />
					</view>
				</view>
			</view>
		</view>

		<view class="initButton initButton--absolute"><view class="initButton-btn initButton-btn--style" @click="bindTradeExchange()">提交绑定</view></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			role: 1,
			tradeExchangeId: '',
			tradeExchangeName: '',

			apiKey: '',
			secretKey: ''
		};
	},
	onLoad(hash) {
		this.role = hash.value1;
		this.tradeExchangeId = hash.value2;
		this.tradeExchangeName = hash.value3;
	},
	onShow() {
		// this.init();
	},
	methods: {
		init() {
			this.getBaseInfo();
		},
		bindTradeExchange() {
			if (this.apiKey == '') {
				return this.$tools.toast('请输入您的Access Key');
			}
			if (this.secretKey == '') {
				return this.$tools.toast('请输入您的Secret Key');
			}

			uni.showLoading({
				title: '绑定中',
				mask: true
			});

			this.$Ajax(
				'/front/api/bind/do',
				{
					bourseId: this.tradeExchangeId, //交易所id
					apiKey: this.apiKey, //apikey
					secretKey: this.secretKey, //secretKey
					role: this.role //绑定角色[1交易员，2跟随者]
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.$tools.toastBack('绑定成功', 3);
						uni.hideLoading();
					}
				}
			);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/documentary_apply';
</style>
