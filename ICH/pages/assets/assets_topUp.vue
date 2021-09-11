<template>
	<view class="pages">
		<view class="initHeader initHeader--line initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back()"></view>
				<view class="initHeader-title">充币</view>
				<view class="initHeader-record" @click="$tools.jump('../assets/assets_topUp_record', currencyVal, currencyLabel)"></view>
			</view>
		</view>
		<view class="mian">
			<view class="infoBox">
				<view class="selectBox" @click="currencyVisible = true">
					<view class="selectBox-wrapper">
						<view class="selectBox-title">充值币种</view>
						<view class="selectBox-data">{{ currencyLabel }}</view>
					</view>
				</view>
				<view class="filterBox" v-show="currencyVal == 1">
					<view class="filterBox-wrapper">
						<view class="filterBox-title">链名称</view>
						<view class="filterBox-button">
							<view class="filterBox-button__btn" :class="{ 'filterBox-button__btn--active': typeActive == 0 }" @click="changeTypeActive(0)">ERC20</view>
							<view class="filterBox-button__btn" :class="{ 'filterBox-button__btn--active': typeActive == 1 }" @click="changeTypeActive(1)">OMNI</view>
							<view class="filterBox-button__btn" :class="{ 'filterBox-button__btn--active': typeActive == 2 }" @click="changeTypeActive(2)">TRC20</view>
						</view>
					</view>
				</view>
			</view>

			<view class="contentBox">
				<view class="contentBox-wrapper">
					<view class="qrcodeBox">
						<view class="qrcodeBox-image"><image :src="qrcodeImage" mode="widthFix"></image></view>
					</view>
					<view class="savaBtn"><view class="savaBtn-btn" @click="saveQrcode()">保存二维码至相册</view></view>

					<view class="addressBox">
						<view class="addressBox-title">充币地址</view>
						<view class="addressBox-data">{{ qrcodeAddress }}</view>
						<view class="addressBox-button" @click="$tools.copy(qrcodeAddress)"><image src="../../static/assets/icon-copy.png" mode="widthFix"></image></view>
					</view>
				</view>
			</view>

			<view class="tipsBox">
				<view class="tipsBox-title">温馨提示</view>
				<view class="tipsBox-content">
					<view class="tipsBox-content__list">{{ currencyLabel }}钱包地址禁止充值除{{ currencyLabel }}之外的其他资产，任何非{{ currencyLabel }}资产充值将不可找回。</view>
					<view class="tipsBox-content__list">充值地址不会经常发生变化，充值前请确认地址。</view>
				</view>
			</view>
		</view>
		<!-- 模态框 -->
		<!-- <view class="modalBox">
			<view class="modalBox-mask" v-show="modelShow" @click="closeModal()" @touchmove.stop.prevent></view>
			<view class="modalBox-wrapper" :animation="animationData">
				<view class="modalBox-title">选择币种</view>
				<view class="modalBox-listBox">
					<view
						class="modalBox-listBox__list"
						:class="{ 'modalBox-listBox__list--active': item.key == currencyId }"
						v-for="(item, index) in currencyList"
						:key="index"
						@click="selectCurrency(index)"
					>
						{{ item.name }}
					</view>
				</view>
			</view>
		</view> -->

		<!-- 币种选择 -->
		<w-picker
			:visible.sync="currencyVisible"
			mode="selector"
			ref="currencyPicker"
			default-type="label"
			:options="currencyArray"
			@confirm="onPickerConfirm($event, 'currencyPicker')"
			@cancel="onPickerCancel"
			themeColor="#2989fd"
		></w-picker>
	</view>
</template>

<script>
import QR from '@/components/qrcode/qrcode.js';
import vPicker from '@/components/w-picker/w-picker.vue';
import { pathToBase64, base64ToPath } from '../../components/image-tools/index.js';
export default {
	components: {
		vPicker
	},
	data() {
		return {
			typeActive: 0,

			qrcodeAddress: '',
			qrcodeImage: '',

			currencyVisible: false,
			currencyLabel: '', //币种
			currencyVal: '',
			currencyArray: []
		};
	},
	onShow() {
		this.init();
	},
	methods: {
		init() {
			this.getCurrencyList();
		},
		//获取币种
		getCurrencyList() {
			this.$Ajax(
				'/search/currencyList',
				{
					type: 2
				},
				res => {
					if (res.code == 0) {
						this.currencyArray = res.obj;
						this.currencyArray.forEach(item => {
							item.label = item.name;
							item.value = item.key;
						});
						
						if(this.currencyLabel == ''){
							this.currencyLabel = this.currencyArray[0].label;
						}
						if(this.currencyVal == ''){
							this.currencyVal = this.currencyArray[0].value;
						}
						
						this.getRecharge();
					}
				}
			);
		},
		//获取充值地址
		getRecharge() {
			this.$Ajax(
				'/front/financial/rechargeInit',
				{
					currencyId: this.currencyVal
				},
				res => {
					if (res.code == 0) {
						console.log(JSON.stringify(res.obj));
						if(this.currencyVal == 1){
							if(this.typeActive == 0){
								this.qrcodeAddress = res.obj.list[1].erc20;
								this.qrcodeImage = QR.createQrCodeImg(res.obj.list[1].erc20);
							}else if(this.typeActive == 1){
								this.qrcodeAddress = res.obj.list[0].omni;
								this.qrcodeImage = QR.createQrCodeImg(res.obj.list[0].omni);
							}else if(this.typeActive == 2){
								this.qrcodeAddress = res.obj.list[2].trc20;
								this.qrcodeImage = QR.createQrCodeImg(res.obj.list[2].trc20);
							}
						}else{
							this.qrcodeAddress = res.obj.address;
							this.qrcodeImage = QR.createQrCodeImg(res.obj.address);
						}
					}
				}
			);
		},

		// 复制地址
		copyMsg() {
			this.$tools.copy(this.qrcodeAddress);
		},
		// 复制标签
		copyLabel() {
			this.$tools.copy(this.labelMsg);
		},

		/* 底部选项卡公用 */
		onPickerConfirm(res, type) {
			console.log('当前控制的Picker是：' + type + ';当前值是' + res.obj.value);

			if (type == 'currencyPicker') {
				this.currencyLabel = res.obj.label;
				this.currencyVal = res.obj.value;
				this.typeActive = 0;
				this.getRecharge();
			}
		},
		onPickerCancel() {},
		changeTypeActive(index) {
			this.typeActive = index;
			this.getRecharge();
		},
		saveQrcode() {
			let that = this;
			base64ToPath(this.qrcodeImage)
				.then(path => {
					console.log(path);
					uni.saveImageToPhotosAlbum({
						filePath: path,
						success: function() {
							that.$tools.toast('保存成功');
							console.log('save success');
						}
					});
				})
				.catch(error => {
					console.error(error);
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.mian {
	// padding: 0 30upx;
}

.infoBox {
	border-bottom: 12upx solid #f7f8fc;
	padding: 30upx;
}

.selectBox {
	// padding: 30upx 0;
	&-wrapper {
		@include flexBetween;
		font-size: 32upx;
	}

	&-label {
		color: #101010;
	}

	&-data {
		@include flexRight;
		color: #101010;
		background-image: url(../../static/public/icon-arrow-right-grey.png);
		background-size: 14upx 26upx;
		background-position: right center;
		background-repeat: no-repeat;
		padding-right: 30upx;
	}
}

.filterBox {
	margin-top: 30upx;
	&-title {
		color: #101010;
		font-size: 28upx;
		margin-bottom: 15upx;
	}
	&-button {
		@include flexLeft;
		@include calcMargin(4);
		&__btn {
			@include initTransition(0.4);
			font-size: 24upx;
			border-radius: 8upx;
			padding: 8upx 15px;
			color: #99999d;
			border: 1upx solid transparent;
			background-color: #f7f8fc;
			margin: 0 8upx;

			&--active {
				background-color: #ffffff;
				color: #3583ff;
				border: 1upx solid #3583ff;
			}
		}
	}
}

.contentBox {
	padding: 60upx 30upx 0;

	&-wrapper {
		@include flexCenterColumn;
		border-bottom: 1upx solid #c6d2e4;
	}
}

.qrcodeBox {
	@include flexCenter;
	margin: 0 auto;
	padding: 30upx;
	background-color: #f7f6fb;
	border-radius: 15upx;
	overflow: hidden;
	&-image {
		@include fullImage;
		margin: 0 auto;
		width: 250upx;
	}
}

.savaBtn {
	margin-top: 30rpx;

	&-btn {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		color: #3583ff;
		font-size: 28upx;
		background-color: #aec8f1;
		border-radius: 8upx;
		border: solid 1upx #2997f0;
		margin: 0 auto;
		padding: 15upx 30upx;
	}
}

.addressBox {
	text-align: center;
	margin-top: 30upx;
	margin-bottom: 90upx;

	&-title {
		color: #cccccc;
		font-size: 24upx;
		margin-bottom: 15upx;
	}

	&-data {
		color: #101010;
		font-size: 26upx;
		width: 80%;
		word-break: break-all;
		margin: 0 auto;
		margin-bottom: 15upx;
	}

	&-info {
		color: $globalColor-green;
		font-size: 24upx;
		margin-bottom: 15upx;
	}

	&-button {
		// display: inline-flex;
		// justify-content: center;
		// align-items: center;
		// color: #27aae1;
		// background-color: #2a2b3a;
		// padding: 10upx 30upx;
		// font-size: 24upx;
		width: 40upx;
		margin: 0 auto;
		@include fullImage;
	}
}

.tipsBox {
	text-align: left;
	color: #999999;
	padding: 30upx;

	&-title {
		font-size: 28upx;
		font-weight: bold;
		margin-bottom: 10upx;
		text-align: left;
		color: #101010;
	}

	&-content {
		&__list {
			margin-left: 30upx;
			list-style-type: decimal;
			display: list-item;
			text-align: left;
			line-height: 40upx;
			font-size: 24upx;
		}
	}
}

.modalBox {
	// z-index: 999;
	font-size: 28upx;

	&-mask {
		width: 100vh;
		height: 100vh;
		position: fixed;
		left: 0;
		top: 0;
		background-color: rgba(0, 0, 0, 0.4);
		z-index: 9998;
	}
	&-wrapper {
		width: 650upx;
		position: fixed;
		left: 50upx;
		bottom: 0;
		background-color: #25263b;
		z-index: 9999;
		transform: translateY(calc(100% + 90upx));
		background-color: #ffffff;
		margin-bottom: 60upx;
		text-align: center;
		border-radius: 15upx;
		padding: 15upx 0;
	}

	&-title {
		color: #333333;
		font-size: 32upx;
		padding: 30upx 0;
	}

	&-listBox {
		color: #78849a;
		&__list {
			padding: 30upx 0;
			&--active {
				color: #27aae1;
			}
		}
	}
}
</style>
