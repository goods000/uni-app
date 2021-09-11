<template>
	<view class="pages" :data-theme="pageTheme">
		<view class="initHeader" :class="pageTheme == 'light' ? 'initHeader--black' : 'initHeader--white'">
			<view class="initHeader-wrapper"><view class="initHeader-back" @click="$tools.back(1)"></view></view>
		</view>

		<view class="main">
			<view class="titleBox">
				<view class="titleBox-wrapper">
					<view class="titleBox-title">绑定{{ tradeExchangeName }}交易账户</view>
					<view class="titleBox-note">GG仅为您的账户提供数据查询与自动交易服务，我们不会以任何形式泄露</view>
				</view>
			</view>

			<view class="initFormBox">
				<view class="initFormBox-wrapper">
					<view class="initFormBox-item">
						<view class="initFormBox-item__label">名称</view>
						<view class="initFormBox-item__input"><input type="text" placeholder-class="initFormBox-item__placeholder" placeholder="请输入您的名称" v-model="name" /></view>
					</view>

					<view class="initFormBox-item">
						<view class="initFormBox-item__label">Api Key</view>
						<view class="initFormBox-item__input">
							<input type="text" placeholder-class="initFormBox-item__placeholder" placeholder="请输入您的Access Key" v-model="apiKey" />
						</view>
					</view>

					<view class="initFormBox-item">
						<view class="initFormBox-item__label">Secret Key</view>
						<view class="initFormBox-item__input">
							<input type="text" placeholder-class="initFormBox-item__placeholder" placeholder="请输入您的Secret Key" v-model="secretKey" />
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="initButton initButton--absolute"><view class="initButton-btn initButton-btn--style" @click="bindBourse()">提交绑定</view></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			bourseId: null,
			name: '',
			apiKey: '',
			secretKey: '',
			tradeExchangeName: ''
		};
	},
	onLoad(hash) {
		this.bourseId = hash.value1;
		this.tradeExchangeName = hash.value2;
	},
	onShow() {
		this.$setStatusBarStyle();
	},
	methods: {
		bindBourse() {
			if (this.name == '') {
				return this.$tools.toast('请输入您的名称');
			}
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
					bourseId: this.bourseId, //交易所id
					apiKey: this.apiKey, //apikey
					secretKey: this.secretKey, //secretKey
					name: this.name //备注
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.$tools.toastBack('绑定成功', 2);
						uni.hideLoading();
					}
				}
			);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/api_apply';
</style>
