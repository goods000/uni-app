<template>
	<view class="pages contentBg">
		<view class="header_bar header_bg header_border">
			<view class="header">
				<view class="header-back" @click="goBack()"></view>
				<view class="header-title">上传付款凭证</view>
				<!-- <view class="header-title" v-else>提交成功</view> -->
			</view> 
		</view> 
		
		<view class="upload">
			<view class="buyBox">
				<view class="buyBox-wrapper">
					<view class="buyBox-price">{{ SharesInfo.newest * quantity }}</view>
					<view class="buyBox-txt">购买金额(CNY)</view>
				</view>
			</view>
			<view class="orderBox">
				<view class="tipsBox">
					<view class="tipsBox-title">
						<view class="tipsBox-title__label">收款银联信息</view>
					</view>
				</view>
				<view class="orderBox-list">
					<view class="orderBox-list-item">
						<view class="orderBox-list-item-title">收款方户名：</view>
						<view class="orderBox-list-item-news">{{ bankInfo.bank_name }}</view>
					</view>
					<view class="orderBox-list-item">
						<view class="orderBox-list-item-title">收款方开户行:</view>
						<view class="orderBox-list-item-news">{{ bankInfo.bank_bank }}</view>
					</view>
					<view class="orderBox-list-item">
						<view class="orderBox-list-item-title">收款方开户地址:</view>
						<view class="orderBox-list-item-news">{{ bankInfo.bank_address }}</view>
					</view>
					<view class="orderBox-list-item">
						<view class="orderBox-list-item-title">银行卡账号：</view>
						<view class="orderBox-list-item-news">{{ bankInfo.bank_no }}</view>
						<view class="orderBox-list-item-copy" @click="$tools.copy(bankInfo.bank_no)">复制</view>
					</view>
					
				</view>
			</view>
			
			<view class="mt-bg"></view>
			<view class="headerOrder">
				<view class="headerOrder_wrapper" :class="{ 'headerOrder_wrapper_orderActive': tabsActive == 1 }" @click="changeTabsActive(1)">银联转款</view>
				<view class="headerOrder_wrapper" :class="{ 'headerOrder_wrapper_orderActive': tabsActive == 2 }" @click="changeTabsActive(2)">佣金购买</view>
			</view>
			<view class="tipsBox" v-if="tabsActive == 1">
				<view class="tipsBox-title">
					<view class="tipsBox-title__label">上传付款凭证</view>
				</view>
			</view>
			<view class="upload-wrapper" v-if="tabsActive == 1">
				<view class="upload-wrapper-item">
					<!-- <view class="upload-wrapper-item-title">付款凭证: <text>*必需上传付款截图或照片</text></view> -->
					<!-- <view class="upload-wrapper-item-title">备注</view> -->
					<textarea placeholder="请输入您的备注..." placeholder-class="inputColor" v-model="remarks"
					class="upload-wrapper-item-textarea"/>
					<view class="upload-wrapper-item__info" @click="chooseImg()">
						<view class="upload-wrapper-item__photo" :style="'background-image: url( '+ uploadList.src +');background-size: 100% 100%;'">
							<image src="../../static/order/img-upload-1.png" mode="widthFix"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="tipsBox" v-if="tabsActive == 2">
				<view class="tipsBox-title">
					<view class="tipsBox-title__label">佣金可用余额:</view>
				</view>
				<view class="tipsBox-operate--active">{{ assetList.commission }}CNY</view>
			</view>
			
			<view class="orderBtn">
				<view class="orderBtn-btn" v-if="tabsActive == 1" @click="config()">提交</view>
				<view class="orderBtn-btn" v-if="tabsActive == 2" @click="openPopup('Popup')">提交</view>
			</view>
		</view>
		
		<!-- <view class="upload-status" v-if="isActive == 1">
			<view class="orderDetails">
				<image src="../../static/order/icon-order-success.png" mode="widthFix" class="orderDetails-image"></image>
				<view class="orderDetails-item">
					<view class="orderDetails-status">提交成功</view>
					<view class="orderDetails-title">恭喜您已成功提交订单！请耐心等待平台审核后给您发放股票。</view>
				</view>
			</view>
		</view> -->
		
		<!-- 提现框 -->
		<uni-popup ref="Popup" type="center" :animation="true" @change="changePopup($event,'Popup')">
			<view class="oppupBox">
				<view class="oppupBox-header">交易密码</view>
				<view class="oppupBox-title">
					<input type="password" placeholder="请输入您的交易密码" placeholder-class="inputColor" v-model="tradepwd"/>
				</view>
				<view class="oppupBox-btn">
					<view class="oppupBox-btn__close" @click="hidePopup('Popup')">取消</view>
					<view class="oppupBox-btn__config" @click="submit()">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import weburl from '../../common/js/url.js';
	export default {
		data(){
			return{
				tabsActive:1,
				isActive:0,
				remarks:'',
				uploadList: {src:''},
				bankInfo:{
					bank_name:'张赢川',bank_bank:'招商银行',bank_address:'梅龙支行',bank_no:'6214 8552 5124 9815'
				},
				tradepwd:'',
				quantity:'',
				SharesInfo:{},
				assetList:{},
			}
		},
		onLoad(hash) {
			this.quantity = hash.value1;
			this.id = hash.value2;
		},
		onShow() {
			this.init();
		},
		methods: {
			goBack(){
				// this.$tools.jump('./orderDetails',this.orderId);
				this.$tools.back(1)
			},
			init(){
				this.getBankInfo();
				this.getStatistics();
				this.getSharesInfo();
			},
			// 获取单个股票详情
			getSharesInfo() {
				this.$Ajax('/front/shares/getSharesInfo', {
					id: this.id
				}, res => {
					if (res.code == 0) {
						this.SharesInfo = res.obj;
					}
				});
			},
			// 获取用户所有钱包信息
			getStatistics() {
				this.$Ajax('/front/mine/getStatistics', {}, res => {
					if (res.code == 0) {
						this.assetList = res.obj;
					}
				});
			},
			// 获取收款信息
			getBankInfo() {
				this.$Ajax('/front/mine/getBankInfo', {}, res => {
					if (res.code == 0) {
						this.bankInfo = res.obj;
					}
				});
			},
			chooseImg() {
				let that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: res => {
						this.uploadList.src = res.tempFilePaths[0];
						console.log("this.uploadList.src：",this.uploadList.src);
					},
					fail: function() {
						console.log('上传图片接口调用失败');
						return;
					}
				});
			},
			config() {
				let that = this;
				if(this.remarks == ''){
					return this.$tools.toast('请输入您的备注');
				}
				if(this.uploadList.src == ''){
					return this.$tools.toast('请上传付款凭证');
				}
				uni.showLoading({
					title: '上传中',
					mask: true
				});
				let token = uni.getStorageSync('token');
				let files = [];
				files.push({ name: 'file', uri: this.uploadList.src });
				let data = {
					token: token,
					image: this.image == '' ? '' : this.uploadList.src,
					id:this.id,
					num:this.quantity,
					remark:this.remarks
				};
				console.log(files);
				uni.uploadFile({
					url: weburl.webUrl + '/front/shares/uploadFile',
					files: files,
					header: { token: token },
					formData: data,
					success: res => {
						var data = JSON.parse(res.data);
						console.log(data);
						if (data.code == 0) {
							this.remarks == '';
							this.uploadList.src == '';
							this.$tools.toastBack('成功', 2);
						}
					},
					fail(err) {},
					complete: res => {
						uni.hideLoading();
					}
				});
				uni.hideLoading();
			},
			submit(){
				if (this.tradepwd == '') {
					return this.$tools.toast('请输入您的交易密码');
				}
				this.$Ajax('/front/shares/commissionPurchase',
					{
						payPwd: this.tradepwd,
						id:this.id,
						num:this.quantity,
					},
					res => {
						console.log(JSON.stringify(res.data));
						if (res.code == 0) {
							if (res.code == 0) {
								this.tradepwd == '';
								this.hidePopup('Popup');
								this.$tools.toastBack('成功', 2);
							}
						}
					}
				);
			},
			changeTabsActive(index) {
				if (this.tabsActive != index) {
					this.tabsActive = index;
				}
			},
			/* 弹出框公用 */
			openPopup(e) {
				this.$refs[e].open();
			},
			hidePopup(e) {
				this.$refs[e].close();
			},
			changePopup(e) {
				console.log('popup ' + e.type + ' 状态', e.show);
				if (!e.show) {
					this.tradepwd = '';
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/order/orderDetails';
	.buyBox{
		padding: 40upx 0 20upx;
		&-wrapper{
			@include flexCenterColumn;
		}
		&-price{
			font-size: 68upx;
			font-family: DINPro;
			font-weight: bold;
			color: $globalColor-style;
		}
		&-txt{
			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #999999;
		}
	}
	.orderBox{
		&-list{
				padding-bottom: 20upx;
		}
	}
	.headerOrder{
		padding: 33upx 0;
	}
	.tipsBox-operate--active{
		font-size: 32upx;
	}
</style>
