<template>
	<view class="page">
		<view class="group-apply-out" v-if="toastStatus">
			<view class="group-toast-bg">
				<view class="group-toast-info">
					<view class="toast-title">{{ i18n.group.Time_limited }}</view>
					<view class="toast-input-title">{{ i18n.global.tradePassword }}：</view>
					<view class="toast-input">
						<input type="password" value="" v-model="pwd" :placeholder="i18n.global.placeholder_password" />
					</view>
					<view class="toast-btn">
						<view class="cancel-btn" @click="cancel()">{{ i18n.global.cancel }}</view>
						<view class="confirm-btn" @click="confirm()">{{ i18n.global.enter }}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="tips-btn-out">
			<view class="tips-btn" @click="openToast()">
				<view class="btn">{{ i18n.index.tips_02 }}</view>
			</view>
		</view>
		<view class="empty-public"></view>
		<view class="header-plate">
			<view class="back-pic" @click="$tools.back(1)">
				<image src="../../static/public/back-icon-white.png" mode=""></image>
			</view>
			<view class="header-title">{{ i18n.group.Time_limited }}</view>
			<view class="header-empty"></view>
		</view>
		<view class="time-plate-out">
			<view class="time-plate">
				<view class="hour">{{hour}}</view>
				<view class="symbol">:</view>
				<view class="minute">{{minute}}</view>
				<view class="symbol">:</view>
				<view class="second">{{second}}</view>
			</view>
		</view>
		<view class="group-bg">
			<view class="group-info">
				<view class="info-title-plate">
					<view class="title-text">{{langType == 'en' ? nameEnglish : name}}{{index}}{{ i18n.group.Expect }}</view>
					<view class="title-line"></view>
				</view>
				<view class="info-item">
					<view class="item-title">{{ i18n.index.name_03 }}：</view>
					<view class="item-count">{{min}}-{{max}}USDT</view>
				</view>
				<view class="info-item">
					<view class="item-title">{{ i18n.group.Number_Remaining }}：</view>
					<view class="item-count">{{total-qty}}USDT</view>
				</view>
			</view>
		</view>
		<view class="group-title-plate">
			<view class="plate-info">{{ i18n.group.Number_crowdfunding }}</view>
		</view>
		<view class="group-input">
			<input type="number" value="" v-model="quantity" :placeholder="i18n.group.placeholder_01" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				quantity: '',
				toastStatus: false,
				pwd: '',
				resourceId: 0,
				name: '',
				nameEnglish: '',
				min: 0,
				max: 0,
				total: 0,
				qty: 0,
				countDown: 600,
				index: 0,
				timer: null,
				hour:0,
				minute:0,
				second:0,
			};
		},
		computed: {
			i18n() {
				return this.$t('message');
			},
		},
		onLoad(option) {
			this.resourceId = option.resourceId;
		},
		onShow() {
			this.groupDetail();
			this.langType = uni.getStorageSync('initLanguage');
		},
		methods: {
			openToast() {
				console.log(666);
				if (!/^[1-9]\d*$/.test(this.quantity)) {
					return this.$tools.toast(this.i18n.group.placeholder_02);
				}
				this.toastStatus = true;
			},
			cancel() {
				this.toastStatus = false;
			},
			confirm() {
				this.$Ajax('/front/pdd/join/pdd', {
					resourceId: this.resourceId,
					quantity: this.quantity,
					tradePwd: this.pwd
				}, res => {
					console.log(res);
					this.pwd = '';
					if (res.code == 0) {
						this.toastStatus = false;
						uni.navigateTo({
							url: './groupSuccess'
						})
					}
				})
			},
			groupDetail() {
				this.$Ajax('/front/pdd/join/detail', {
					resourceId: this.resourceId
				}, res => {
					console.log(res);
					this.name = res.obj.name;
					this.nameEnglish = res.obj.nameEnglish;
					this.min = res.obj.min;
					this.max = res.obj.max;
					this.total = res.obj.total;
					this.qty = res.obj.qty;
					this.countDown = res.obj.countDown;
					this.index = res.obj.index;
					this.timer = setInterval(() => {
						let endTime = this.countDown - 1;
						if (endTime <= 0) {
							clearInterval(this.timer);
						} else {
							this.countDown = endTime;
							this.hour = parseInt(this.countDown/60/60);
							this.minute = parseInt((this.countDown-(this.hour*3600))/60);
							this.second = this.countDown%60;
						}
					}, 1000);
				})
			},
			join() {
				this.$Ajax('/front/pdd/join/pdd', {
					resourceId: this.resourceId,
					quantity: this.quantity,
					tradePwd: this.pwd
				}, res => {
					console.log(res);
				})
			},
		}
	}
</script>

<style lang="scss">
	.page {
		color: #FFFFFF;

		.group-apply-out {
			width: 100vw;
			height: 100vh;
			position: fixed;
			background-color: rgba(0, 0, 0, .48);
			z-index: 2;
			padding-top: 30vh;

			.group-toast-bg {
				background-size: 100% 100%;
				background-position: center;
				background-repeat: no-repeat;
				height: 538rpx;
				width: 692rpx;
				background-image: url(../../static/group/group-toast-bg.png);
				margin: auto;

				.group-toast-info {
					padding: 60rpx 50rpx;

					.toast-title {
						text-align: center;
						font-size: 32rpx;
						font-family: PingFang SC-Bold;
						font-weight: bold;
						color: #FFFFFF;
					}

					.toast-input-title {
						font-size: 28rpx;
						font-family: PingFang SC-Bold;
						font-weight: 500;
						color: #FFFFFF;
						padding: 57rpx 0 38rpx 0;
					}

					.toast-input {
						background-size: 100% 100%;
						background-position: center;
						background-repeat: no-repeat;
						height: 106rpx;
						width: 594rpx;
						background-image: url(../../static/group/group-input-bg.png);
						margin: auto;

						input {
							height: 106rpx;
							line-height: 106rpx;
							padding-left: 35rpx;
							font-size: 32rpx;
							font-family: PingFang SC-Bold;
							font-weight: 500;
							color: #FFFFFF;
						}
					}

					.toast-btn {
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding-top: 30rpx;

						.cancel-btn {
							width: 264rpx;
							height: 88rpx;
							line-height: 88rpx;
							text-align: center;
							background: #182447;
							border-radius: 44rpx;
							font-size: 32rpx;
							font-family: PingFang SC-Bold;
							font-weight: 500;
							color: #FFFFFF;
						}

						.confirm-btn {
							width: 264rpx;
							height: 88rpx;
							line-height: 88rpx;
							text-align: center;
							background: #FFCF1E;
							box-shadow: 0px 4rpx 14rpx 0px rgba(255, 207, 30, 0.41);
							border-radius: 44rpx;
							font-size: 32rpx;
							font-family: PingFang SC-Bold;
							font-weight: 500;
							color: #00061A;
						}
					}
				}
			}
		}

		.tips-btn-out {
			width: 100vw;
			position: fixed;
			bottom: 2%;

			.tips-btn {
				width: 100%;

				.tips-plate {
					padding: 40rpx 30rpx;

					.tips-title {
						font-size: 32rpx;
						font-family: PingFang SC-Bold;
						font-weight: 500;
					}

					.tips-text {
						font-size: 22rpx;
						font-family: PingFang SC-Bold;
						font-weight: 500;
						word-break: break-all;
					}
				}

				.btn {
					width: 690rpx;
					height: 88rpx;
					background: #FFCF1E;
					box-shadow: 0px 4rpx 14rpx 0px rgba(255, 207, 30, 0.41);
					border-radius: 44rpx;
					margin: auto;
					text-align: center;
					line-height: 88rpx;
					font-size: 32rpx;
					font-family: PingFang SC-Bold;
					font-weight: bold;
					color: #00061A;
				}
			}
		}

		.header-plate {
			height: 88rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30rpx;

			.back-pic {
				width: 17rpx;
				height: 31rpx;

				image {
					width: 17rpx;
					height: 31rpx;
				}
			}

			.header-title {
				font-size: 36rpx;
				font-family: PingFang SC-Bold;
				font-weight: bold;
			}

			.header-empty {
				width: 17rpx;
			}
		}

		.time-plate-out {
			padding: 72rpx 0;

			.time-plate {
				width: 474rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: #00A2FF;
				margin: auto;
				font-family: DIN;
				font-weight: 500;

				.hour {
					background-size: 100% 100%;
					background-position: center;
					background-repeat: no-repeat;
					height: 89rpx;
					width: 118rpx;
					background-image: url(../../static/group/time-bg.png);
					line-height: 89rpx;
					text-align: center;
					font-size: 78rpx;
				}

				.minute {
					background-size: 100% 100%;
					background-position: center;
					background-repeat: no-repeat;
					height: 89rpx;
					width: 118rpx;
					background-image: url(../../static/group/time-bg.png);
					line-height: 89rpx;
					text-align: center;
					font-size: 78rpx;
				}

				.second {
					background-size: 100% 100%;
					background-position: center;
					background-repeat: no-repeat;
					height: 89rpx;
					width: 118rpx;
					background-image: url(../../static/group/time-bg.png);
					line-height: 89rpx;
					text-align: center;
					font-size: 78rpx;
				}

				.symbol {
					font-size: 78rpx;
				}
			}
		}

		.group-bg {
			background-size: 100% 100%;
			background-position: center;
			background-repeat: no-repeat;
			height: 296rpx;
			width: 662rpx;
			background-image: url(../../static/group/group-bg.png);
			margin: auto;

			.group-info {
				padding: 60rpx 30rpx;

				.info-title-plate {
					.title-text {
						font-size: 32rpx;
						font-family: DIN;
						font-weight: 500;
						color: #00A2FF;
					}

					.title-line {
						width: 96rpx;
						height: 4rpx;
						background: linear-gradient(90deg, #000B21 0%, #00A2FF 51%, #000B21 100%);
					}
				}

				.info-item {
					display: flex;
					align-items: center;
					justify-content: space-between;
					height: 64rpx;

					.item-title {
						font-size: 28rpx;
						font-family: PingFang SC-Bold;
						font-weight: 400;
					}

					.item-count {
						font-size: 28rpx;
						font-family: DIN;
						font-weight: 400;
						color: #FFCF1E;
					}
				}
			}
		}

		.group-title-plate {
			padding: 40rpx 30rpx;

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
				white-space: nowrap;
			}
		}

		.group-input {
			background-size: 100% 100%;
			background-position: center;
			background-repeat: no-repeat;
			height: 106rpx;
			width: 664rpx;
			background-image: url(../../static/group/group-input-bg.png);
			margin: auto;

			input {
				height: 106rpx;
				line-height: 106rpx;
				padding-left: 35rpx;
				font-size: 32rpx;
				font-family: PingFang SC-Bold;
				font-weight: 500;
				color: #FFFFFF;
			}
		}
	}
</style>
