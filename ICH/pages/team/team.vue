<template>
	<view class="pages">
		<view class="initHeader initHeader--line initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back()"></view>
				<view class="initHeader-title">我的团队</view>
				<view class="initHeader-right"><view class="initHeader-button initHeader-button--record" @click="$tools.jump('../team/team_record')"></view></view>
			</view>
		</view>
		<view class="main">
			<view class="cardBox">
				<view class="cardBox-wrapper">
					<view class="cardBox-itemBox">
						<view class="cardBox-itemBox__item">
							<view class="cardBox-itemBox__item-label">今日返佣</view>
							<view class="cardBox-itemBox__item-data">{{ inviteInfo.today }}</view>
						</view>
						<view class="cardBox-itemBox__item">
							<view class="cardBox-itemBox__item-label">累计返佣</view>
							<view class="cardBox-itemBox__item-data">{{ inviteInfo.total }}</view>
						</view>
						<view class="cardBox-itemBox__item">
							<view class="cardBox-itemBox__item-label">分享人数</view>
							<view class="cardBox-itemBox__item-data">{{ inviteInfo.subCount }}</view>
						</view>
						<view class="cardBox-itemBox__item">
							<view class="cardBox-itemBox__item-label">团队人数</view>
							<view class="cardBox-itemBox__item-data">{{ inviteInfo.teamCount }}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="listBox">
				<view class="listBox-title">邀请记录</view>
				<view class="listBox-wrapper">
					<view class="initNoData" v-if="teamRecord.length == 0"></view>
					<view class="listBox-list" v-for="(item, index) in teamRecord" :key="index">
						<view class="listBox-list__avatar"><image :src="item.userImg" mode="widthFix"></image></view>
						<view class="listBox-list__info">
							<view class="listBox-list__title">{{ item.nickName }}</view>
							<view class="listBox-list__date">{{ item.createTime }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="fixedBox">
			<view class="fixedBox-wrapper">
				<view class="initButton">
					<view class="initButton-btn initButton-btn--blue" @click="$tools.copy(shareAddress)">复制邀请链接</view>
					<view class="initButton-btn initButton-btn--blue" @click="openPopup('sharePopup')">生成邀请海报</view>
				</view>
			</view>
		</view>
		<view class="flex_row_c_c modalView" :class="qrShow ? 'show' : ''" @tap="hideQr()">
			<view class="flex_column">
				<view class="backgroundColor-white padding1vh border_radius_10px"><image :src="poster.finalPath || ''" mode="widthFix" class="posterImage"></image></view>
				<view class="flex_row marginTop2vh">
					<view class="initButton"><view class="initButton-btn initButton-btn--blue" @tap.prevent.stop="saveImage()">保存图片至相册</view></view>
				</view>
			</view>
		</view>
		<!-- 画布 -->
		<view class="hideCanvasView">
			<canvas class="hideCanvas" canvas-id="default_PosterCanvasId" :style="{ width: (poster.width || 10) + 'px', height: (poster.height || 10) + 'px' }"></canvas>
		</view>

		<uni-popup ref="sharePopup" type="bottom" :animation="true" @change="changePopup">
			<view class="shareModalBox">
				<view class="shareModalBox-wrapper">
					<view class="shareModalBox-title">选择海报</view>
					<view class="shareModalBox-swiperBox">
						<swiper class="shareModalBox-swiperBox__swiper" display-multiple-items="3" :disable-touch="sharePhotoList.length <= 3" :interval="3000" :duration="1000">
							<swiper-item class="shareModalBox-swiperBox__swiper-item" v-for="(item, index) in sharePhotoList" :key="index" @click="shareFc(item)">
								<view class="shareModalBox-swiperBox__swiper-image"><image :src="item" mode="widthFix"></image></view>
							</swiper-item>
						</swiper>
					</view>
					<view class="shareModalBox-buttonBox"><view class="shareModalBox-buttonBox__btn" @click="hidePopup('sharePopup')">关闭</view></view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import _app from '@/components/QS-SharePoster/app.js';
import { getSharePoster } from '@/components/QS-SharePoster/QS-SharePoster.js';
import uniPopup from '@/components/uni-popup/uni-popup.vue';

export default {
	components: {
		uniPopup
	},
	data() {
		return {
			inviteInfo: [],
			teamRecord: [],
			sharePhotoList: ['../../static/share/img-share-01.jpg'],

			poster: {},
			qrShow: false,
			canvasId: 'default_PosterCanvasId',
			count: 0,

			shareAddress: '',
			shareCode: 0
		};
	},
	onShow() {
		this.init();
	},
	methods: {
		init() {
			this.getInviteInfo(); // 获取我的个人信息
			this.getTeamRecord(); // 获取团队信息
			this.getCopyLink(); //获取邀请码相关
		},
		// 获取我的个人信息
		getInviteInfo() {
			this.$Ajax('/front/user/myInvite', {}, res => {
				if (res.code == 0) {
					console.log(JSON.stringify(res));
					this.inviteInfo = res.obj;
				}
			});
		},
		// 获取团队信息
		getTeamRecord() {
			this.$Ajax('/front/user/myInviteList', {}, res => {
				if (res.code == 0) {
					console.log(JSON.stringify(res.obj));
					this.teamRecord = res.obj.list;
				}
			});
		},
		getCopyLink() {
			this.$Ajax('/front/user/shareAddress', {}, res => {
				// console.log(JSON.stringify(res));
				if (res.code == 0) {
					// console.log(JSON.stringify(res));
					this.shareAddress = res.obj.address;
					let codeDate = res.obj.address.split('inviteCode=');
					this.shareCode = codeDate[1];
					// console.log('+123123' + JSON.stringify(this.shareAddress));
					// this.shareFc();
					// console.log(this.shareCode);
				}
			});
		},
		openPopup(e) {
			this.$refs[e].open();
		},
		hidePopup(e) {
			this.$refs[e].close();
		},
		changePopup(e) {
			if (!e.show) {
				uni.showTabBar();
			}
			console.log('popup ' + e.type + ' 状态', e.show);
		},

		/* 海报 */
		hideQr() {
			this.qrShow = false;
		},
		async shareFc(imgSrc) {
			this.hidePopup('sharePopup');
			let _this = this;
			try {
				this.count++;
				_app.log('准备生成:' + new Date());
				const d = await getSharePoster({
					_this: _this, //若在组件中使用 必传
					type: 'testShareType',
					formData: {
						//访问接口获取背景图携带自定义数据
					},
					posterCanvasId: _this.canvasId, //canvasId
					delayTimeScale: 20, //延时系数
					background: {
						height: 10,
						width: 10
					},
					setCanvasWH({ bgObj }) {
						_this.poster = bgObj;
					},
					drawArray({ bgObj, type, bgScale, setBgObj, getBgObj }) {
						return [
							{
								type: 'image',
								id: 'productImage',
								url: imgSrc,
								dx: 0,
								dy: 0,
								serialNum: 0,
								infoCallBack(imageInfo) {
									let width;
									let height;
									if (imageInfo.width > imageInfo.height) {
										width = imageInfo.width > 700 ? 700 : imageInfo.width;
										height = (width / imageInfo.width) * imageInfo.height;
									} else {
										height = imageInfo.height > 700 ? 700 : imageInfo.height;
										width = (height / imageInfo.height) * imageInfo.width;
									}
									if (width < 500) {
										width = 500;
										height = (width / imageInfo.width) * imageInfo.height;
									}
									let addHeight = height * 0.2;
									if (addHeight < 150) addHeight = 150;
									if (addHeight > 250) addHeight = 250;
									setBgObj({
										width,
										height: height + addHeight
									});
									return {
										dWidth: width,
										dHeight: height
									};
								}
							},
							{
								type: 'text',
								id: 'productName',
								text: '邀请码：',
								color: '#101010',
								serialNum: 1,
								allInfoCallback({ drawArray }) {
									const productImage = drawArray.find(item => item.id === 'productImage');
									const addHeight = getBgObj().height - productImage.dHeight;
									return {
										size: getBgObj().width * 0.07,
										lineFeed: {
											maxWidth: getBgObj().width * 1,
											lineNum: 1
										},
										dx: getBgObj().width * 0.05,
										dy: productImage.dHeight + addHeight * 0.4
									};
								}
							},
							{
								type: 'text',
								id: 'productName',
								text: _this.shareCode,
								color: '#1c74ff',
								serialNum: 1,
								allInfoCallback({ drawArray }) {
									const productImage = drawArray.find(item => item.id === 'productImage');
									const addHeight = getBgObj().height - productImage.dHeight;
									return {
										size: getBgObj().width * 0.09,
										lineFeed: {
											maxWidth: getBgObj().width * 0.5,
											lineNum: 1
										},
										dx: getBgObj().width * 0.3,
										dy: productImage.dHeight + addHeight * 0.4
									};
								}
							},
							{
								type: 'text',
								text: '邀请您加入ICH',
								color: '#999999',
								serialNum: 2,
								allInfoCallback({ drawArray }) {
									const productImage = drawArray.find(item => item.id === 'productImage');
									const addHeight = getBgObj().height - productImage.dHeight;
									return {
										size: getBgObj().width * 0.05,
										lineFeed: {
											maxWidth: getBgObj().width * 0.8,
											lineNum: 1
										},
										dx: getBgObj().width * 0.05,
										dy: productImage.dHeight + addHeight * 0.7
									};
								}
							},
							{
								type: 'qrcode',
								text: _this.shareAddress,
								serialNum: 4,
								allInfoCallback({ drawArray }) {
									const productImage = drawArray.find(item => item.id === 'productImage');
									const addHeight = getBgObj().height - productImage.dHeight;
									const widthSize = getBgObj().width * 0.4;
									const heightSize = addHeight;
									const countSize = widthSize > heightSize ? heightSize : widthSize;
									const size = countSize * 0.7;
									return {
										size: size,
										dx: getBgObj().width - countSize * 0.85,
										dy: getBgObj().height - countSize * 0.85
									};
								}
							}
						];
					}
				});
				_app.log('海报生成成功, 时间:' + new Date() + '， 临时路径: ' + d.poster.tempFilePath);
				_this.poster.finalPath = d.poster.tempFilePath;
				_this.qrShow = true;
			} catch (e) {
				_app.hideLoading();
				_app.showToast(JSON.stringify(e));
				console.log(JSON.stringify(e));
			}
		},
		saveImage() {
			let that = this;
			// #ifndef H5
			uni.saveImageToPhotosAlbum({
				filePath: this.poster.finalPath,
				success(res) {
					_app.showToast('保存成功');
					that.qrShow = false;
				}
			});
			// #endif
			// #ifdef H5
			_app.showToast('保存了');
			// #endif
		}
	}
};
</script>

<style lang="scss" scoped>
.main {
	padding-bottom: 280upx;
}
.cardBox {
	padding: 30upx;
	border-bottom: 12upx solid #f7f8fc;
	&-wrapper {
		background-image: url(../../static/team/img-card-bg.png);
		background-size: 100% 100%;
		padding: 30upx;
	}

	&-itemBox {
		@include flexLeft;
		@include calcMargin(15);
		flex-wrap: wrap;
		font-size: 28upx;
		color: #ffffff;
		padding: 0 30upx;
		&__item {
			flex: 50%;
			padding: 15upx;

			&:nth-child(2n + 2) {
				text-align: right;
			}

			&-label {
				font-size: 24upx;
				margin-bottom: 15upx;
				color: #ffffff;
			}
			&-data {
				color: #ffffff;
				font-size: 44upx;
				font-weight: bold;
			}
		}
	}
}

.listBox {
	padding: 30upx;
	&-title {
		margin-bottom: 30upx;
		font-size: 32upx;
		color: #101010;
	}
	&-list {
		padding: 30upx 0;
		border-bottom: 2upx solid #999999;
		@include flexBetween;
		&__avatar {
			width: 60upx;
			height: 60upx;
			overflow: hidden;
			border-radius: 50%;
			margin-right: 30upx;
			@include fullImage;
		}
		&__info {
			flex: 1;
		}
		&__title {
			font-size: 32upx;
			margin-bottom: 10upx;
		}
		&__date {
			font-size: 22upx;
			color: #999999;
		}

		&__price {
			color: #3583ff;
			font-size: 30upx;
		}
	}
}

.fixedBox {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	background-color: #ffffff;
	z-index: 9;
	box-shadow: 0upx 1upx 20upx rgba(0, 0, 0, 0.5);

	&-wrapper {
		@include flexCenter;
		padding: 30upx;
	}
}

.shareModalBox {
	background-color: #ffffff;

	&-wrapper {
	}
	&-title {
		font-size: 32upx;
		color: #101010;
		text-align: center;
		padding: 30upx 0;
	}

	&-swiperBox {
		padding: 30upx;
		&__swiper {
			height: 320upx;
			&-item {
				padding: 10upx;
				width: 100%;
			}

			&-image {
				@include fullImage;
				background-color: skyblue;
				border-radius: 8upx;
				overflow: hidden;
			}
		}
	}

	&-buttonBox {
		padding: 30upx;
		border-top: 12upx solid #f7f8fc;
		text-align: center;
		&__btn {
			color: #999999;
			font-size: 32upx;
		}
	}
}

.initButton {
	width: 100%;
}

.hideCanvasView {
	position: relative;
}

.hideCanvas {
	position: fixed;
	top: -99999upx;
	left: -99999upx;
	z-index: -99999;
}

.flex_row_c_c {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}

.modalView {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	opacity: 0;
	outline: 0;
	transform: scale(1.2);
	perspective: 2500upx;
	background: rgba(0, 0, 0, 0.6);
	transition: all 0.3s ease-in-out;
	pointer-events: none;
	backface-visibility: hidden;
	z-index: 999;
}

.modalView.show {
	opacity: 1;
	transform: scale(1);
	pointer-events: auto;
}

.flex_column {
	display: flex;
	flex-direction: column;
}

.backgroundColor-white {
	background-color: white;
}

.border_radius_10px {
	border-radius: 10px;
}

.padding1vh {
	padding: 1vh;
}

.posterImage {
	width: 50vw;
	// border: 2upx solid #c6d2e4;
}

.flex_row {
	display: flex;
	flex-direction: row;
}

.marginTop2vh {
	margin-top: 2vh;
}

.initButton{
	@include flexCenterColumn;
	
	&-btn{
		width: 100%;
	}
}
</style>
