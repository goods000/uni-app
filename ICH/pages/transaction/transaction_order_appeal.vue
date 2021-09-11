<template>
	<view class="pages">
		<view class="initHeader initHeader--fixed initHeader--bgblue initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">订单申诉</view>
			</view>
		</view>
		<view class="main">
			<view class="appealBox">
				<view class="textareaBox"><textarea placeholder-style="color:#cccccc" placeholder="请输入您的申诉理由" v-model="content" /></view>
				<view class="initButton"><view class="initButton-btn initButton-btn--blue" @click="confirmContent()">确定提交</view></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			content: '',
			recordId: 0
		};
	},
	onLoad(hash) {
		this.recordId = hash.value1;
	},
	methods: {
		confirmContent() {
			if (this.content == '') {
				return this.$tools.toast('请输入您的申诉理由');
			}
			this.$Ajax(
				'/front/otc/appeal',
				{
					recordId: this.recordId,
					content: this.content
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.content = '';
						this.$tools.toastBack('提交成功',1);
						// this.$tools.toast(res.obj);
					}
				}
			);
		}
	}
};
</script>

<style lang="scss" scoped>

.appealBox {
	padding: 30upx;
}

.textareaBox {
	// padding: 30upx 0;
	border: 2upx solid #eeeeee;
	border-radius: 12upx;
	margin-bottom: 30upx;
	textarea {
		width: 100%;
		padding: 30upx;
		color: #333;
	}
}
.buttonBox {
	padding: 0 30upx;
	margin-top: 60upx;

	.buttonBox-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 60upx;
		padding: 30upx;
		color: #fff;
		text-align: center;
		font-size: 28upx;
	}
}
</style>
