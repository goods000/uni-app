<template>
	<view class="page">
		<view class="empty-public"></view>
		<view class="header-plate">
			<view class="back-pic" @click="$tools.back(1)">
				<image src="../../static/public/back-icon-white.png" mode=""></image>
			</view>
			<view class="header-title">{{ i18n.user.item_03 }}</view>
			<view class="header-empty"></view>
		</view>
		<view class="team-bg-out">
			<view class="team-bg">
				<view class="bg-title-plate">
					<view class="bg-title-text">{{ i18n.user.level }}：</view>
					<view class="bg-title-pic">
						<image :src="langType == 'en' ? levelEnglish : level" mode=""></image>
					</view>
					<view class="bg-title-pic" v-if="comm==1">
						<image src="../../static/my/type-2.png" mode=""></image>
					</view>
					<view class="bg-title-pic" v-if="comm==2">
						<image src="../../static/my/type-1.png" mode=""></image>
					</view>
				</view>
				<view class="info-title-item">
					<view class="info-title">*{{ i18n.user.Direct_push }}{{directMoney}}U{{ i18n.user.tips_03 }}</view>
					<view class="info-title">*{{ i18n.user.Grand_total }}(USDT)</view>
				</view>
				<view class="info-count-item">
					<view class="info-count">{{directCount}}</view>
					<view class="info-count">{{teamMoney | number(2)}}</view>
				</view>
				<view class="info-title-item">
					<view class="info-title">*{{ i18n.user.Running_water }}{{commMoney/10000}}{{ i18n.user.tips_04 }}</view>
					<view class="info-title">*{{ i18n.user.people }}{{days}}{{ i18n.user.tips_05 }}(USDT)</view>
				</view>
				<view class="info-count-item">
					<view class="info-count">{{commCount}}</view>
					<view class="info-count">{{ownMoney | number(2)}}</view>
				</view>
			</view>
		</view>
		<view class="bg-empyt"></view>
		<view class="team-title-plate">
			<view class="team-title">{{ i18n.user.team_list }}</view>
		</view>
		<view class="record-out">
			<view class="record">
				<view class="record-title-item">
					<view class="record-title">{{ i18n.login.Identity_name }}</view>
					<view class="record-title">{{ i18n.user.Community_address }}</view>
					<view class="record-title">{{ i18n.user.Community_flow }}(USDT)</view>
				</view>
				<view class="record-item-out">
					<view class="record-item" v-for="(item,index) in teamlist" :key="index">
						<view class="item">{{item.hiddenAccount}}</view>
						<view class="item">{{item.teamCount}}</view>
						<view class="item">{{item.teamMoney | number(2)}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageNum:1,
				pageSize:20,
				teamlist:[],
				pages:1,
				directMoney:0,
				directCount:0,
				teamMoney:0,
				commMoney:0,
				commCount:0,
				days:0,
				ownMoney:0,
				level:'',
				levelEnglish:'',
				comm:0,
				langType:'',
			};
		},
		computed: {
			i18n() {
				return this.$t('message');
			},
		},
		onShow() {
			this.teamlist = [];
			this.myInvite();
			this.getTeamList();
			this.langType = uni.getStorageSync('initLanguage');
		},
		onReachBottom() {
			if (this.pageNum >= this.pages) {
				return this.$tools.toast(this.i18n.global.atLast);
			} else {
				this.pageNum++;
				this.getTeamList();
			}
		},
		methods:{
			myInvite(){
				this.$Ajax('/front/user/team/info',{},res=>{
					console.log(res);
					this.commCount = res.obj.commCount;
					this.commMoney = res.obj.commMoney;
					this.days = res.obj.days;
					this.directCount = res.obj.directCount;
					this.directMoney = res.obj.directMoney;
					this.ownMoney = res.obj.ownMoney;
					this.teamMoney = res.obj.teamMoney;
					this.level = res.obj.level;
					this.levelEnglish = res.obj.levelEnglish;
					this.comm = res.obj.comm;
				})
			},
			getTeamList(){
				this.$Ajax('/front/user/team/list',{
					pageNum:this.pageNum,
					pageSize:this.pageSize
				},res=>{
					console.log(res);
					this.pages = res.obj.pages;
					this.teamlist = this.teamlist.concat(res.obj.list);
				})
			},
		}
	}
</script>

<style lang="scss">
	.page{
		color: #FFFFFF;
		.header-plate{
			height: 88rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30rpx;
			.back-pic{
				width: 17rpx;
				height: 31rpx;
				image{
					width: 17rpx;
					height: 31rpx;
				}
			}
			.header-title{
				font-size: 36rpx;
				font-family: PingFang SC-Bold;
				font-weight: bold;
			}
			.header-empty{
				width: 17rpx;
			}
		}
		.team-bg-out{
			padding-top: 32rpx;
			.team-bg{
				background-size: 100% 100%;
				background-position: center;
				background-repeat: no-repeat;
				height: 418rpx;
				width: 662rpx;
				background-image: url(../../static/my/team-bg.png);
				margin: auto;
				.bg-title-plate{
					height: 120rpx;
					padding-left: 35rpx;
					display: flex;
					align-items: center;
					.bg-title-text{
						font-size: 28rpx;
						font-family: PingFang SC-Bold;
						font-weight: 400;
						color: #FFFFFF;
					}
					.bg-title-pic{
						width: 111rpx;
						height: 30rpx;
						margin-right: 30rpx;
						image{
							width: 111rpx;
							height: 30rpx;
						}
					}
				}
				.info-title-item{
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 35rpx;
					height: 75rpx;
					.info-title{
						flex: 1;
						font-size: 24rpx;
						font-family: PingFang SC-Bold;
						font-weight: 500;
						color: #999999;
					}
				}
				.info-count-item{
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 35rpx;
					.info-count{
						flex: 1;
						font-size: 36rpx;
						font-family: DIN;
						font-weight: 500;
						color: #FFCF1E;
					}
				}
			}
		}
		.bg-empyt{
			height: 66rpx;
		}
		.team-title-plate{
			padding-left: 30rpx;
			.team-title{
				width: 298rpx;
				height: 64rpx;
				background: linear-gradient(90deg, #00A1FE 0%, #1E3869 50%, #00061A 100%);
				font-size: 32rpx;
				font-family: PingFang SC-Bold;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 64rpx;
				padding-left: 22rpx;
			}
		}
		.record-out{
			padding-top: 50rpx;
			.record{
				padding: 0 30rpx;
				.record-title-item{
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 20rpx;
					font-family: PingFang SC-Bold;
					font-weight: 500;
					color: #999999;
					padding: 0 30rpx;
					.record-title{
						flex: 1;
					}
				}
				.record-title-item>:first-child{
					flex: 1.3;
				}
				.record-item-out{
					height: 35vh;
					.record-item{
						height: 88rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						font-size: 28rpx;
						font-family: DIN;
						font-weight: 500;
						color: #FFFFFF;
						border-bottom: 1px solid #1B2344;
						padding: 0 30rpx;
						.item{
							flex: 1;
						}
					}
					.record-item>:first-child{
						flex: 1.3;
					}
				}
			}
		}
	}
</style>
