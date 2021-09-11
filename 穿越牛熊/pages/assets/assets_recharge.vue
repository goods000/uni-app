<template>
	<view class="pages" :data-theme="pageTheme">
		<view class="initHeader initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">充币</view>
				<view class="initHeader-record" @click="$tools.jump('../assets/assets_recharge_record', currencyVal, currencyLabel)"></view>
			</view>
		</view>
		<view class="main">
			<view class="infoBox">
				<view class="titleBox">
					<view class="titleBox-label">{{ currencyLabel }}</view>
				</view>
				<!-- <view class="selectBox" @click="currencyVisible = true">
					<view class="selectBox-wrapper">
						<view class="selectBox-label">选择币种</view>
						<view class="selectBox-data">{{ currencyLabel }}</view>
					</view>
				</view> -->
				<view class="filterBox" v-show="!currencyMain">
					<view class="filterBox-wrapper">
						<view class="filterBox-label">链名称</view>
						<view class="filterBox-button">
							<view
								class="filterBox-button__btn"
								:class="{ 'filterBox-button__btn--active': typeActive == index }"
								v-for="(item, index) in typeList"
								:key="index"
								@click="changeTypeActive(index)"
							>
								{{ item.name }}
							</view>
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
						<view class="addressBox-label">充币地址</view>
						<view class="addressBox-data">{{ qrcodeAddress }}</view>
						<view class="addressBox-button" @click="$tools.copy(qrcodeAddress)">
							<image :src="'../../static/public/icon-copy-' + pageTheme + '.png'" mode="widthFix"></image>
						</view>
					</view>
				</view>
			</view>

			<!-- <view class="init">
				<view class="init-wrapper">
					<view class="init-title">虚拟充值：</view>
					<view class="init-input"><input type="text" placeholder="地址" v-model="initAddress" /></view>
					<view class="init-input"><input type="text" placeholder="数量" v-model="initQuantity" /></view>
					<view class="init-button" @click="initRecharge()">确定</view>
				</view>
			</view> -->

			<view class="tipsBox">
				<view class="tipsBox-title">温馨提示</view>
				<view class="tipsBox-content">
					<view class="tipsBox-content__list">
						1. {{ currencyLabel }}钱包地址禁止充值除{{ currencyLabel }}之外的其他资产，任何非{{ currencyLabel }}资产充值将不可找回。
					</view>
					<view class="tipsBox-content__list">2. 为保障资金安全，当您账户安全策略变更、密码修改、我们会对提币进行人工审核，请耐心等待工作人员电话或邮件联系。</view>
				</view>
			</view>
		</view>

		<!-- 币种选择 -->
		<w-picker :visible.sync="currencyVisible" mode="selector" ref="currencyPicker" :options="currencyArray" @confirm="onPickerConfirm($event, 'currencyPicker')"></w-picker>
	</view>
</template>

<script>
import version from '@/common/js/url.js';
import QR from '@/components/qrcode/qrcode.js';
import { pathToBase64, base64ToPath } from '../../components/image-tools/index.js';
export default {
	data() {
		return {
			typeList: [],
			typeActive: 0,

			qrcodeAddress: '',
			qrcodeImage: '',

			currencyVisible: false,
			currencyLabel: 'USDT', //币种
			currencyVal: null,
			currencyArray: [],
			currencyMain: false, //是否主网币

			initAddress: '',
			initQuantity: ''
		};
	},
	onShow() {
		this.$setStatusBarStyle();
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
					type: 1 //1充值 2提现 3所有币种
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.currencyArray = res.obj;
						this.currencyArray.forEach(item => {
							item.label = item.currencyName;
							item.value = item.currencyId;
						});
						this.currencyLabel = this.currencyArray[0].label;
						this.currencyVal = this.currencyArray[0].value;
						this.getCurrencyInfo();
					}
				}
			);
		},
		//获取充值地址
		getCurrencyInfo() {
			this.$Ajax(
				'/front/financial/recharge/address',
				{
					currencyId: 1
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.currencyMain = res.obj.main;

						if (res.obj.main) {
							this.qrcodeAddress = res.obj.address;
							this.qrcodeImage = QR.createQrCodeImg(res.obj.address);
						} else {
							this.typeList = res.obj.address;
							this.qrcodeAddress = this.typeList[this.typeActive].address;
							this.qrcodeImage = QR.createQrCodeImg(this.typeList[this.typeActive].address);
						}
					}
				}
			);
		},
		changeTypeActive(index) {
			if (this.typeActive != index) {
				this.typeActive = index;
				this.qrcodeAddress = this.typeList[this.typeActive].address;
				this.qrcodeImage = QR.createQrCodeImg(this.typeList[this.typeActive].address);
			}
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
						}
					});
				})
				.catch(error => {
					console.error(error);
				});
		},

		/* 底部选项卡公用 */
		onPickerConfirm(res, type) {
			console.log('当前控制的Picker是：' + type + ';当前值是' + res.obj.value);

			if (type == 'currencyPicker') {
				this.currencyLabel = res.obj.label;
				this.currencyVal = res.obj.value;
				this.typeActive = 0;
				this.getCurrencyInfo();
			}
		},

		initRecharge() {
			let that = this;
			if (this.initAddress == '') {
				return this.$tools.toast('别留空');
			}
			if (this.initQuantity == '') {
				return this.$tools.toast('别留空');
			}
			uni.request({
				url: version.webUrl + '/search/recharge',
				method: 'GET',
				dataType: 'json',
				data: {
					currencyId: that.currencyVal,
					userId: that.initAddress,
					quantity: that.initQuantity
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					that.initAddress = '';
					that.initQuantity = '';
					that.$tools.toast('成功');
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/assets_recharge';
</style>
