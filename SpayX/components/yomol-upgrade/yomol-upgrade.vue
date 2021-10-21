<template>
	<view v-if="visible" class="mark" @touchmove.stop.prevent="moveHandle">
		<view class="view versionBox">
			<view class="versionBox-bg" :style="'background-image:url('+bgUrl+')'"></view>
			<view class="versionBox-close" @click.stop="hide"></view>
			<view class="versionBox-wrapper">
				<view class="versionBox-infoBox">
					<view class="versionBox-infoBox__title">发现新版本</view>
					<view class="versionBox-infoBox__data">{{ version }}</view>
				</view>
				<view class="versionBox-listBox">
					<view class="versionBox-listBox__title">更新的内容</view>
					<view class="versionBox-listBox__list">{{ content }}</view>
				</view>
				<view class="versionBox-button">
					<view class="versionBox-button__btn" @click.stop="onSureClick()">立即下载</view>
				</view>
			</view>
			<!-- <scroll-view class="scroll" scroll-y>
				<view class="item">{{ content }}</view>
			</scroll-view>
			<cmd-progress v-else class="progress" type="circle" stroke-color="#dfa800" :percent="progress"></cmd-progress> -->
		</view>
	</view>
</template>

<script>
import cmdProgress from '../cmd-progress/cmd-progress.vue';
export default {
	components: {
		cmdProgress
	},
	data() {
		return {
			visible: false,
			progress: 0,
			// content: '',
			downloading: false,
			success: true,
			bgUrl: '../../static/version/img-version-bg.jpg'
		};
	},
	props: {
		type: {
			type: String,
			default: 'pkg'
		},
		url: {
			type: String,
			default: ''
		},
		title: {
			type: String,
			default: '版本更新'
		},
		content: {
			type: String,
			default: ''
		},
		version: {
			type: String,
			default: ''
		}
	},
	watch: {
		// contents() {
		// 	var strs = this.content.split('\\n')
		// 	for (var i = 0; i < strs.length; i++) {
		// 		this.contents.push(strs[i])
		// 	}
		// }
	},
	methods: {
		moveHandle() {},
		show() {
			setTimeout(() => {
				if (this.success) {
					this.visible = true;
					uni.hideTabBar();
				}
			}, 800);
		},
		hide() {
			setTimeout(() => {
				this.visible = false;
				uni.showTabBar();
			}, 800);
		},
		onCancelClick() {
			this.hide();
		},
		onSureClick() {
			uni.removeStorageSync('token');
			// console.log(this.contents);
			var platform = uni.getSystemInfoSync().platform;
			if (platform == 'ios' || this.type == 'pkg') {
				plus.runtime.openURL(this.url);
			} else {
				this.downloading = true;
				var downloadTask = uni.downloadFile({
					url: this.url,
					success: downloadResult => {
						this.hide();
						if (downloadResult.statusCode === 200) {
							plus.runtime.install(
								downloadResult.tempFilePath,
								{
									force: false
								},
								function() {
									plus.runtime.restart();
								},
								e => {
									console.log(e);
									this.success = false;
									uni.showToast({
										title: '安装升级包失败',
										icon: 'none'
									});
								}
							);
						}
					}
				});
				downloadTask.onProgressUpdate(e => {
					this.progress = e.progress;
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.mark {
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	background: rgba(0, 0, 0, 0.6);
	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	align-items: center;
	z-index: 1000;
	.cancel {
		line-height: 34upx;
		color: #797c84;
		font-size: 24upx;
		position: absolute;
		top: 26upx;
		right: 40upx;
	}
}

.view {
	position: relative;
	// width: 540upx;
	// height: 596upx;
	// background-color: white;
	// border-radius: 10upx;
	// display: flex;
	// flex-flow: column;
	// justify-content: flex-start;
	// align-items: center;
	// .img {
	// 	display: block;
	// 	width: 100%;
	// 	height: 250upx;
	// }
}

.versionBox{
	width: 540upx;
	border-radius: 12upx;
	overflow: hidden;
	// width: 100%;
	.versionBox-bg{
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 0;
		background-size: 100% auto;
		background-position: top center;
		background-repeat: no-repeat;
	}
	
	.versionBox-close{
		width: 50upx;
		height: 50upx;
		position: absolute;
		right: 0;
		top: 0;
		background-image: url('../../static/version/icon-close.png');
		background-size: 20upx;
		background-repeat: no-repeat;
		background-position: center;
		z-index: 2;
	}
	
	.versionBox-wrapper{
		position: relative;
		padding: 60upx;
		height: 100%;
		box-sizing: border-box;
		z-index: 1;
	}
	
	.versionBox-infoBox{
		margin-bottom: 90upx;
		// padding-left: 30upx;
		.versionBox-infoBox__title,.versionBox-infoBox__data{
			font-size: 48upx;
			color: #FFFFFF;
		}
	}
	
	.versionBox-listBox{
		margin-bottom: 30upx;
		.versionBox-listBox__title{
			color: #333333;
			font-size: 36upx;
		}
		.versionBox-listBox__list{
			color: #707070;
			font-size: 28upx;
		}
	}
	
	.versionBox-button{
		.versionBox-button__btn{
			background-color: $globalColor-skyblue;
			color: #FFFFFF;
			border-radius: 60upx;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 15upx 0;
		}
	}
}

.title {
	margin-top: 20upx;
	color: #2f3033;
	font-weight: bold;
	font-size: 32upx;
	text-align: center;
	line-height: 44upx;
}

.tip {
	margin-top: 20upx;
	margin-left: 30upx;
	align-self: flex-start;
	font-size: 32upx;
	font-weight: 600;
	color: black;
}

.scroll {
	width: 100%;
	// height: 300upx;
	display: flex;
	flex-flow: column;
	justify-content: flex-start;
	align-items: flex-start;
	margin-top: 20upx;
}

.item {
	box-sizing: border-box;
	padding: 0 46upx;
	text-align: left;
	font-size: 24upx;
	line-height: 34upx;
	color: #797c84;
}

.btns {
	position: absolute;
	bottom: 38upx;
	left: 0;
	width: 100%;
	height: 76upx;
	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	align-items: center;
	.sure {
		width: 484upx;
		height: 100%;
		margin: 0 auto;
		background: #ff6200;
		border-radius: 8upx;
		color: #fff;
		font-size: 26upx;
		line-height: 36upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}

// .icon{
// 	width: 45upx;
// 	height: 45upx;
// 	margin-right: 10upx;
// }

.progress {
	margin-bottom: 20upx;
}
</style>
