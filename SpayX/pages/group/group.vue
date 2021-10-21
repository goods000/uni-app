<template>
	<view class="page">
		<view class="empty-public"></view>
		<view class="group-header-plate">
			<view class="header-plate-left">
				<view class="left-item" @click="changeTitle(1)">
					<view class="item-text" :class="{itemText:titleActive==1}">{{ i18n.group.title }}</view>
					<view class="item-line" :class="{itemLine:titleActive==1}"></view>
				</view>
				<view class="left-item" @click="changeTitle(0)">
					<view class="item-text" :class="{itemText:titleActive==0}">{{ i18n.group.status }}</view>
					<view class="item-line" :class="{itemLine:titleActive==0}"></view>
				</view>
			</view>
			<view class="header-plate-right" @click="groupRecord()"></view>
		</view>
		<view class="index-banner">
			<image :src="i18n.image.group_01" mode=""></image>
		</view>
		<view class="group-list">
			<view class="group-plate-bg" v-for="(item,index) in grouplist" :key="index">
				<view class="group-top">
					<view class="top-count">{{item.time}}{{ i18n.group.Spot_field }}</view>
				</view>
				<view class="group-middle-out">
					<view class="group-middle">
						<view class="middle-left">
							<!-- <view class="left-item">众筹名称：{{item.teamName}}</view>
							<view class="left-item">众筹期数：{{item.period}} 期</view>
							<view class="left-item">参与金额：<text>{{item.minMax}}USDT</text></view>
							<view class="left-item">开始时间：{{item.startTime}}</view> -->
							<view class="left-item" v-if="item.teamName!=null">{{ i18n.index.name_01 }}：{{langType == 'en' ? item.teamEnglishName :item.teamName}}</view>
							<view class="left-item" v-else>{{ i18n.index.name_01 }}：****</view>
							<view class="left-item" v-if="item.period!=null">{{ i18n.index.name_02 }}：{{item.period}}</view>
							<view class="left-item" v-else>{{ i18n.index.name_02 }}：****</view>
							<view class="left-item" v-if="item.minMax!=null">{{ i18n.index.name_03 }}：<text>{{item.minMax}}USDT</text></view>
							<view class="left-item" v-else>{{ i18n.index.name_03 }}：<text>****USDT</text></view>
							<view class="left-item" v-if="item.startTime!=null">{{ i18n.index.open_time }}：{{item.startTime}}</view>
							<view class="left-item" v-else>{{ i18n.index.open_time }}:****</view>
						</view>
						<view class="middle-right">
							<arprogress :percent="item.rate*100" :activeColor="activeColor" :inactiveColor="inactiveColor"><text>{{item.rate*100 | number(0)}}%</text></arprogress>
						</view>
					</view>
				</view>
				<view class="group-bottom" v-if="item.status==2" @click="groupLimited(item.resourceId)">{{ i18n.index.tips_02 }}</view>
				<view class="group-bottom-grey" v-if="item.status==1">{{ i18n.index.tips_01 }}：{{item.hour}}:{{item.minute}}:{{item.second}}</view>
				<view class="group-bottom-grey" v-if="item.status==3">{{ i18n.index.end }}</view>
			</view>
		</view>
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
				titleActive:1,
				activeColor:'#FFCF1E',
				inactiveColor:'rgba(199, 237, 255, .1)',
				grouplist:[],
				timer: null,
				timelist: [],
				pageNum:1,
				pageSize:20,
				pages:1,
				langType:'',
			};
		},
		created() {},
		computed: {
			i18n() {
				return this.$t('message');
			}
		},
		onLoad() {

		},
		onShow() {
			this.getGrouplist();
			this.langType = uni.getStorageSync('initLanguage');
			let lang = uni.getStorageSync('initlanguage');
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
		},
		onHide() {

		},
		methods: {
			changeTitle(titleActive){
				this.grouplist = [];
				this.timelist = [];
				this.pageNum = 1;
				this.titleActive = titleActive;
				this.getGrouplist();
			},
			getGrouplist() {
				this.$Ajax('/front/pdd/resource/list', {
					type:this.titleActive,
					pageNum:this.pageNum,
					pageSize:this.pageSize
				}, res => {
					console.log(res);
					if(this.titleActive==1){
						this.grouplist = res.obj;
						for (var i = 0; i < this.grouplist.length; i++) {
							this.$set(this.grouplist[i], 'hour', '');
							this.$set(this.grouplist[i], 'minute', '');
							this.$set(this.grouplist[i], 'second', '');
						}
						// console.log(111, this.grouplist);
						this.timelist = this.grouplist;
						// console.log(222, this.timelist);
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
										// this.$set(this.grouplist[index], item.status, 2);
										// console.log("进来了。。。",this.grouplist[index],'---下标---',index,'---状态---',item.status);
									}
								}, 1000);
							}
						})
						console.log(333, this.timelist);
					}else{
						this.grouplist = res.obj.list;
					}
				})
			},
			groupRecord(){
				uni.navigateTo({
					url:'./groupRecord'
				})
			},
			groupLimited(resourceId){
				uni.navigateTo({
					url:'./groupLimited?resourceId=' + resourceId
				})
			},
		}
	};
</script>

<style lang="scss">
	.page {
		.group-header-plate{
			padding: 0 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid #2B3A5B;
			.header-plate-left{
				height: 88rpx;
				display: flex;
				align-items: center;
				.left-item{
					padding-right: 60rpx;
					.item-text{
						font-size: 32rpx;
						font-family: PingFang SC-Bold;
						font-weight: bold;
						color: #FFFFFF;
					}
					.itemText{
						font-size: 38rpx;
						font-family: PingFang SC-Bold;
						font-weight: bold;
						color: #FFCF1E;
					}
					.item-line{
						height: 6rpx;
						width: 95%;
						margin: auto;
					}
					.itemLine{
						height: 6rpx;
						background: #FFCF1E;
						width: 95%;
						margin: auto;
					}
				}
			}
			.header-plate-right{
				width: 40rpx;
				height: 40rpx;
				background-size: 100% 100%;
				background-position: center;
				background-repeat: no-repeat;
				background-image: url(../../static/public/record-icon.png);
			}
		}
		.index-banner {
			width: 100vw;
			height: 296rpx;
			margin-top: 20rpx;
			image {
				width: 100vw;
				height: 296rpx;
			}
		}
		.group-list{
			padding: 30rpx 0 110rpx;
			.group-plate-bg {
				width: 92vw;
				height: 550rpx;
				margin: auto;
				background-size: 100% 100%;
				background-position: center;
				background-repeat: no-repeat;
				background-image: url(../../static/index/group-plate-bg.png);
				margin-top: 20rpx;
			
				.group-top {
					padding: 35rpx 0 0 35rpx;
			
					.top-count {
						// width: 120rpx;
						height: 50rpx;
						line-height: 50rpx;
						text-align: center;
						background: rgba(199, 237, 255, .1);
						font-size: 26rpx;
						font-family: DINPro;
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
								height: 58rpx;
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
							.right-info{
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
				.group-bottom-grey{
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
		}
	}
</style>
