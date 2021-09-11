<template>
	<view class="pages">
		<view class="initHeader initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">新的API</view>
			</view>
		</view>

		<view class="titleBox">
			<view class="titleBox-wrapper"><view class="titleBox-note">社区仅为您的账户提供数据查询与自动交易服务，我们不会以任何形式透露</view></view>
		</view>

		<view class="formBox">
			<view class="formBox-wrapper">
				<view class="formBox-list">
					<view class="formBox-list__label">更新API Key</view>
					<view class="formBox-list__input"><input type="text" placeholder-class="formBox-list__placeholder" placeholder="请输入您的Access Key" v-model="apiKey" /></view>
				</view>

				<view class="formBox-list">
					<view class="formBox-list__label">更新Secret Key</view>
					<view class="formBox-list__input">
						<input type="text" placeholder-class="formBox-list__placeholder" placeholder="请输入您的Secret Key" v-model="secretKey" />
					</view>
				</view>
			</view>
		</view>

		<view class="initButton initButton--absolute"><view class="initButton-btn initButton-btn--style" @click="updateApi()">确认</view></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			apiId: 1,

			apiKey: '',
			secretKey: ''
		};
	},
	onLoad(hash) {
		this.apiId = hash.value1;
	},
	methods: {
		updateApi() {
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
				'/front/api/bind/modify',
				{
					apiBindId: this.apiId, //交易所id
					apiKey: this.apiKey, //apikey
					secretKey: this.secretKey, //secretKey
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.$tools.toastBack('更新成功', 1);
						uni.hideLoading();
					}
				}
			);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/apiInfo_update';
</style>
