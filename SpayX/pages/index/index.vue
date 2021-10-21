<template>
	<view class="page">
		<view class="empty-public"></view>
		<view class="index-header-plate">
			<view class="plate-left">
				<view class="left-logo">
					<image src="../../static/index/left-logo-icon.png" mode=""></image>
				</view>
				<view class="left-text">Hi, {{name}}</view>
			</view>
			<view class="plate-rightBox">
				<view class="plate-right" @click="notice()"></view>
				<view class="plate-langBox" @click="langVisible = true">
					<view class="plate-langBox__wrapper">{{ i18n.global.language }}</view>
					<image src="../../static/index/icon-lang.png" mode="widthFix">
				</view>
			</view>
		</view>
		<view class="index-banner">
			<image src="../../static/index/index-gif.gif" mode=""></image>
		</view>
		<view class="menu-plate-out">
			<view class="menu-plate">
				<view class="menu-list">
					<view class="menu-item" @click="ecology()">
						<view class="item-pic">
							<image src="../../static/index/index-menu-1.png" mode=""></image>
						</view>
						<view class="item-text">SPXY{{ i18n.index.Ecology }}</view>
					</view>
					<view class="menu-item" @click="group()">
						<view class="item-pic">
							<image src="../../static/index/index-menu-2.png" mode=""></image>
						</view>
						<view class="item-text">{{ i18n.index.Crowdfunding }}</view>
					</view>
					<!-- <view class="menu-item" @click="news()">
						<view class="item-pic">
							<image src="../../static/index/index-menu-3.png" mode=""></image>
						</view>
						<view class="item-text">{{ i18n.index.News }}</view>
					</view> -->
					<view class="menu-item" @click="teamShare()">
						<view class="item-pic">
							<image src="../../static/index/index-menu-4.png" mode=""></image>
						</view>
						<view class="item-text">{{ i18n.index.inviteFriends }}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="index-block-plate">
			<view class="block-plate-left">
				<view class="left-top">
					<view class="left-title">{{ i18n.index.item_01 }}(USDT)</view>
					<view class="left-count">{{remain | number(2)}}</view>
				</view>
				<view class="block-empty"></view>
				<view class="left-bottom">
					<view class="left-title">{{ i18n.index.item_02 }}(SPAYX)</view>
					<view class="left-count">{{produce | number(2)}}</view>
				</view>
			</view>
			<view class="block-plate-middle">
				<view class="block-plate-middle-title">{{ i18n.index.Quantity_destroyed }}</view>
				<view class="block-plate-middle-num">{{destroyAll | number(2)}}</view>
			</view>
			<view class="block-plate-right">
				<view class="right-top">
					<view class="right-title">{{ i18n.index.item_03 }}</view>
					<view class="right-count">{{friend}}</view>
				</view>
				<view class="block-empty"></view>
				<view class="right-bottom">
					<view class="right-title">{{ i18n.index.item_04 }}</view>
					<view class="right-count">{{success}}</view>
				</view>
			</view>
		</view>
		<view class="seckill-pic">
			<image :src="i18n.image.index_01" mode="widthFix"></image>
		</view>
		<view class="group-title-plate">
			<view class="plate-info">{{ i18n.index.list_title }}</view>
		</view>
		<view class="group-plate-bg" v-for="(item,index) in timelist" :key="index">
			<view class="group-top">
				<view class="top-count">{{item.time}}{{ i18n.index.Spot_field }}</view>
			</view>
			<view class="group-middle-out">
				<view class="group-middle">
					<view class="middle-left">
						<view class="left-item" v-if="item.teamName!=null">{{ i18n.index.name_01 }}：{{langType == 'en' ? item.teamEnglishName : item.teamName }}</view>
						<view class="left-item" v-else>{{ i18n.index.name_01 }}：****</view>
						<view class="left-item" v-if="item.period!=null">{{ i18n.index.name_02 }}：{{item.period}}</view>
						<view class="left-item" v-else>{{ i18n.index.name_02 }}：****</view>
						<view class="left-item" v-if="item.minMax!=null">{{ i18n.index.name_03 }}：<text>{{item.minMax}}USDT</text></view>
						<view class="left-item" v-else>{{ i18n.index.name_03 }}：<text>****USDT</text></view>
						<view class="left-item" v-if="item.startTime!=null">{{ i18n.index.open_time }}：{{item.startTime}}</view>
						<view class="left-item" v-else>{{ i18n.index.open_time }}:****</view>
					</view>
					<view class="middle-right">
						<arprogress :percent="item.rate*100" :activeColor="activeColor" :inactiveColor="inactiveColor">
							<text>{{item.rate*100 | number(0)}}%</text>
						</arprogress>
					</view>
				</view>
			</view>
			<view class="group-bottom-grey" v-if="item.status==1">{{ i18n.index.tips_01 }}{{item.hour}}:{{item.minute}}:{{item.second}}
			</view>
			<view class="group-bottom" v-if="item.status==2" @click="groupLimited(item.resourceId)">{{ i18n.index.tips_02 }}</view>
			<view class="group-bottom-grey" v-if="item.status==3">{{ i18n.index.end }}</view>
		</view>
		<view class="footer-empty"></view>
		
		<!-- 语种选择 -->
		<w-picker :visible.sync="langVisible" mode="selector" ref="langPicker" :options="langArray" @confirm="onPickerConfirm($event, 'langPicker')"></w-picker>
		
	</view>
</template>

<script>
	import arprogress from '../../components/ar-circle-progress/index.vue';
	export default {
		components: {
			arprogress
		},
		data() {
			return {
				percent: 80,
				activeColor: '#FFCF1E',
				inactiveColor: 'rgba(199, 237, 255, .1)',
				friend: 0,
				produce: 0,
				remain: 0,
				success: 0,
				destroyAll: 0,
				grouplist: [],
				timer: null,
				timelist: [],
				pageNum: 1,
				pageSize: 20,
				pages: 1,
				name: '',
				langVisible: false,
				langLabel: '',
				langVal: null,
				langType:'',
			};
		},
		created() {},
		computed: {
			i18n() {
				return this.$t('message');
			},
			langArray() {
				return [
					{
						label: this.i18n.language.cn,
						value: 'cn'
					},
					{
						label: this.i18n.language.en,
						value: 'en'
					}
				];
			},
		},
		onLoad() {
			
		},
		onShow() {
			this.networkData();
			this.getGrouplist();
			this.getBaseInfo();
			this.langType = uni.getStorageSync('initLanguage');
			let lang = uni.getStorageSync('initlanguage');
			if (lang == 'cn') {
				this.langLabel = this.langArray[0].label;
				this.langVal = this.langArray[0].value;
			} else if (lang == 'en') {
				this.langLabel = this.langArray[1].label;
				this.langVal = this.langArray[1].value;
			}
			uni.setTabBarItem({
				index: 0,
				text: this.$t('message').tarbar.item_01
			});
			uni.setTabBarItem({
				index: 1,
				text: this.$t('message').tarbar.item_02,
			});
			uni.setTabBarItem({
				index: 2,
				text: this.$t('message').tarbar.item_03
			});
			uni.setTabBarItem({
				index: 3,
				text: this.$t('message').tarbar.item_04
			});
		},
		onHide() {
			clearInterval(this.timer);
		},
		methods: {
			notice() {
				uni.navigateTo({
					url: './notice'
				})
			},
			onPickerConfirm(res, type) {
				console.log('当前控制的Picker是：' + type + ';当前值是' + res.obj.value);
			
				if (type == 'langPicker') {
					uni.setStorageSync('initLanguage', res.obj.value);
					this.$i18n.locale = res.obj.value;
					this.langVal = res.obj.value;
					this.$store.commit('changeLanguage', res.obj.value);
			
					this.langArray.forEach(item => {
						if (this.langVal == item.value) {
							this.langLabel = item.label;
						}
					});
					var lang = uni.getStorageSync('initLanguage');
					
					if (lang == 'cn') {
						var needLang = 'zh';
					} else if (lang == 'en') {
						var needLang = 'en';
					}
					uni.setTabBarItem({
						index: 0,
						text: this.$t('message').tarbar.item_01
					});
					uni.setTabBarItem({
						index: 1,
						text: this.$t('message').tarbar.item_02
					});
					uni.setTabBarItem({
						index: 2,
						text: this.$t('message').tarbar.item_03
					});
					uni.setTabBarItem({
						index: 3,
						text: this.$t('message').tarbar.item_04
					});
					this.$Ajax(
						'/search/changeLanauage',
						{
							lang: needLang
						},
						res => {}
					);
				}
			},
			ecology() {
				this.$tools.toast('暂未开放');
			},
			group() {
				uni.switchTab({
					url: '../group/group'
				})
			},
			news() {
				uni.navigateTo({
					url: './news'
				})
			},
			teamShare() {
				uni.navigateTo({
					url: '../my/teamShare'
				})
			},
			networkData() {
				this.$Ajax('/search/net/data', {}, res => {
					console.log(res);
					this.friend = res.obj.friend;
					this.produce = res.obj.produce;
					this.remain = res.obj.remain;
					this.success = res.obj.success;
					this.destroyAll = res.obj.destroyAll;
				})
			},
			getGrouplist() {
				this.$Ajax('/front/pdd/resource/list', {
					type: 1,
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}, res => {
					console.log(res);
					this.grouplist = res.obj;
					for (var i = 0; i < this.grouplist.length; i++) {
						this.$set(this.grouplist[i], 'hour', '');
						this.$set(this.grouplist[i], 'minute', '');
						this.$set(this.grouplist[i], 'second', '');
					}
					// console.log(111, this.grouplist);
					this.timelist = this.grouplist;
					// console.log(222, this.timelist);
					// this.timer = setInterval(() => {
					this.timelist.forEach((item, index) => {
						// let endTime = item.countDown - 1;
						if (item.countDown <= 0) {
							// clearInterval(this.timer);
						} else {
							this.timer = setInterval(() => {
								// item.countDown = endTime;
								item.countDown--;
								item.hour = parseInt(item.countDown / 60 / 60);
								item.minute = parseInt((item.countDown - item.hour * 60 * 60) / 60);
								item.second = item.countDown % 60;
								if(item.countDown<=0){
									item.hour = 0;
									item.minute = 0;
									item.second = 0;
									item.status = 2;
									// item[index].status = 2;
								}
							}, 1000);
						}
						// console.log(333, this.timelist);
					})
					// console.log(333, this.timelist);
					// }, 1000);
				})
			},
			groupLimited(resourceId) {
				uni.navigateTo({
					url: '../group/groupLimited?resourceId=' + resourceId
				})
			},
			getBaseInfo() {
				this.$Ajax('/front/user/baseInfo', {}, res => {
					console.log(res);
					this.name = res.obj.name;
				})
			},
		}
	};
</script>

<style lang="scss">
	.page {
		.index-header-plate {
			padding: 0 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 88rpx;

			.plate-left {
				display: flex;
				align-items: center;

				.left-logo {
					width: 50rpx;
					height: 56rpx;

					image {
						width: 50rpx;
						height: 56rpx;
					}
				}

				.left-text {
					font-size: 42rpx;
					font-family: DIN;
					font-weight: bold;
					color: #FEFEFE;
					padding-left: 10rpx;
				}
			}
			.plate-rightBox{
				display: flex;
				align-items: center;
				justify-content: flex-end;
			}
			.plate-right {
				background-size: 100% 100%;
				background-position: center;
				background-repeat: no-repeat;
				height: 40rpx;
				width: 40rpx;
				background-image: url(../../static/index/message-icon.png);
			}
			.plate-langBox{
				border: 2rpx solid #FFFFFF;
				border-radius: 6rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0rpx 18rpx;
				margin-left: 30rpx;
				.plate-langBox__wrapper{
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FEFEFE;
				}
				image{
					width: 22rpx;
					height: 12rpx;
					margin-left: 10rpx;
				}
			}
		}

		.index-banner {
			width: 100vw;
			height: 658rpx;

			image {
				width: 100vw;
				height: 658rpx;
			}
		}

		.menu-plate-out {
			.menu-plate {
				.menu-list {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.menu-item {
						flex: 1;

						.item-pic {
							width: 108rpx;
							height: 108rpx;
							margin: auto;

							image {
								width: 108rpx;
								height: 108rpx;
							}
						}

						.item-text {
							height: 90rpx;
							line-height: 90rpx;
							font-size: 26rpx;
							font-family: PingFang SC-Bold;
							font-weight: 500;
							color: #FFFFFF;
							text-align: center;
						}
					}
				}
			}
		}

		.index-block-plate {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30rpx;

			.block-plate-left {
				.left-top {
					background-size: 100% 100%;
					background-position: center;
					background-repeat: no-repeat;
					// height: 192rpx;
					width: 330rpx;
					background-image: url(../../static/index/block-left-top.png);

					// padding: 40rpx 0 0 34rpx;
					.left-title {
						font-size: 26rpx;
						font-family: PingFang SC-Bold;
						font-weight: 500;
						color: #FFFFFF;
						padding: 40rpx 0 0 34rpx;
					}

					.left-count {
						font-size: 44rpx;
						font-family: DIN;
						font-weight: 500;
						color: #FFCF1E;
						padding: 0 0 30rpx 34rpx;
						width: 100px;
						overflow: scroll;
					}
				}

				.block-empty {
					height: 20rpx;
				}

				.left-bottom {
					background-size: 100% 100%;
					background-position: center;
					background-repeat: no-repeat;
					// height: 192rpx;
					width: 330rpx;
					background-image: url(../../static/index/block-left-bottom.png);

					// padding: 40rpx 0 0 34rpx;
					.left-title {
						font-size: 26rpx;
						font-family: PingFang SC-Bold;
						font-weight: 500;
						color: #FFFFFF;
						padding: 40rpx 0 0 34rpx;
					}

					.left-count {
						font-size: 44rpx;
						font-family: DIN;
						font-weight: 500;
						color: #FFCF1E;
						padding: 0 0 30rpx 34rpx;
						width: 130px;
						overflow: scroll;
					}
				}
			}

			.block-plate-middle {
				// background-size: 100% 100%;
				// background-position: center;
				// background-repeat: no-repeat;
				// background-image: url(../../static/index/block-middle.png);
				// height: 74rpx;
				// width: 74rpx;
				text-align: center;
				position: absolute;
				left: 50%;
				transform: translate(-50%);
				// padding-top: 24rpx;
				.block-plate-middle-title{
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					white-space: nowrap;
				}
				.block-plate-middle-num{
					font-size: 44rpx;
					font-family: DINPro;
					font-weight: 500;
					color: #FFCF1E;
					line-height: 70rpx;
					// width: 120px;
					width: 105px;
					overflow: scroll;
				}
			}

			.block-plate-right {
				.right-top {
					background-size: 100% 100%;
					background-position: center;
					background-repeat: no-repeat;
					// height: 192rpx;
					width: 330rpx;
					background-image: url(../../static/index/block-right-top.png);

					// padding: 40rpx 34rpx 0 0;
					.right-title {
						font-size: 26rpx;
						font-family: PingFang SC-Bold;
						font-weight: 500;
						color: #FFFFFF;
						text-align: right;
						padding: 40rpx 34rpx 0 0;
					}

					.right-count {
						font-size: 44rpx;
						font-family: DIN;
						font-weight: 500;
						color: #FFCF1E;
						text-align: right;
						padding: 0 34rpx 30rpx 0;
					}
				}

				.block-empty {
					height: 20rpx;
				}

				.right-bottom {
					background-size: 100% 100%;
					background-position: center;
					background-repeat: no-repeat;
					// height: 192rpx;
					width: 330rpx;
					background-image: url(../../static/index/block-right-bottom.png);

					// padding: 40rpx 34rpx 0 0;
					.right-title {
						font-size: 26rpx;
						font-family: PingFang SC-Bold;
						font-weight: 500;
						color: #FFFFFF;
						text-align: right;
						padding: 40rpx 34rpx 0 0;
					}

					.right-count {
						font-size: 44rpx;
						font-family: DIN;
						font-weight: 500;
						color: #FFCF1E;
						text-align: right;
						padding: 0 34rpx 30rpx 0;
					}
				}
			}
		}

		.seckill-pic {
			padding-top: 30rpx;

			image {
				width: 92vw;
				margin: auto;
			}
		}

		.group-title-plate {
			padding: 30rpx;

			.plate-info {
				width: 300rpx;
				height: 64rpx;
				line-height: 64rpx;
				background: linear-gradient(90deg, #00A1FE 0%, #1E3869 50%, #00061A 100%);
				font-size: 32rpx;
				font-family: PingFang SC-Bold;
				font-weight: 500;
				color: #FFFFFF;
				padding-left: 20rpx;
			}
		}

		.group-plate-bg {
			width: 92vw;
			height: 550rpx;
			margin: auto;
			background-size: 100% 100%;
			background-position: center;
			background-repeat: no-repeat;
			background-image: url(../../static/index/group-plate-bg.png);

			.group-top {
				padding: 35rpx 0 0 35rpx;

				.top-count {
					// width: 120rpx;
					height: 50rpx;
					line-height: 50rpx;
					text-align: center;
					background: rgba(199, 237, 255, .1);
					font-size: 26rpx;
					font-family: DIN;
					font-weight: 500;
					color: #FFFFFF;
					display: inline-block;
					padding: 0 19rpx;
				}
			}

			.group-middle-out {
				padding: 0 20rpx;

				.group-middle {
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-bottom: 1px solid #C7EDFF;
					padding: 35rpx 0;

					.middle-left {
						.left-item {
							// height: 58rpx;
							line-height: 58rpx;
							font-size: 28rpx;
							font-family: PingFang SC-Bold;
							font-weight: 400;
							color: #FFFFFF;
							white-space: nowrap;

							text {
								font-size: 28rpx;
								font-family: PingFang SC-Bold;
								font-weight: 400;
								color: #FFCF1E;
							}
						}
					}

					.middle-right {
						width: 212rpx;
						height: 212rpx;

						// background-color: #FFFFFF;
						.right-info {
							width: 212rpx;
							height: 212rpx;
							margin: auto;
						}
					}
				}
			}

			.group-bottom {
				width: 620rpx;
				height: 78rpx;
				line-height: 78rpx;
				text-align: center;
				margin: auto;
				background: #FFCF1E;
				box-shadow: 0rpx 4rpx 14rpx 0rpx rgba(255, 207, 30, 0.41);
				border-radius: 38rpx;
				font-size: 28rpx;
				font-family: PingFang SC-Bold;
				font-weight: bold;
				color: #040D32;
				margin-top: 40rpx;
			}

			.group-bottom-grey {
				width: 620rpx;
				height: 78rpx;
				line-height: 78rpx;
				text-align: center;
				margin: auto;
				background: #182447;
				border-radius: 38rpx;
				font-size: 28rpx;
				font-family: PingFang SC-Bold;
				font-weight: bold;
				color: #FFFFFF;
				margin-top: 40rpx;
			}
		}

		.footer-empty {
			height: 110rpx;
		}


	}
</style>
