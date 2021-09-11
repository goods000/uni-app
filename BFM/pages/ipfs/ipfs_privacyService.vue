<template>
	<view class="pages">
		<view class="initHeader initHeader--line initHeader--bgWhite initHeader--fixed initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">用户协议</view>
			</view>
		</view>
		<view class="main">
			<view class="wrapper">
				<rich-text :nodes="content" class="textImage" style="color:#626266;line-height: 1.8;font-size: 28upx;"></rich-text>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				content: [],
			};
		},
		computed: {
			i18n() {
				return this.$t('message')
			}
		},
		onShow(){
			this.init();
		},
		methods:{
			init(){
				this.getContent();
			},
			getContent() {
				this.$Ajax('/front/coin/getUserAgreement', {}, res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.content = res.obj[0].content;
					}
				});
			},
		}
	};
</script>
<style lang="scss" scoped>
	.main {
		color: #101010;
	}

	.wrapper {
		padding: 30upx;
	}

	.list {
		margin-bottom: 15upx;
		font-size: 24upx;
	}
</style>
