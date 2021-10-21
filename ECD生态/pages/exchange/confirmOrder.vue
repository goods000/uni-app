<template>
	<view class="page">
		<view class="header_bar">
			<view class="header">
				<view class="header-back" @click="clearBack()"></view>
				<view class="header-title">确认订单</view>
				<view class="header-right header-right--title" @click="deleteOrder()">取消订单</view>
			</view> 
		</view> 
		
		<view class="confirmOrder">
			<view class="confirmOrder-header">
				<view class="confirmOrder-header__item">
					<view class="confirmOrder-header__item-name">{{buyInfo.realName}}</view>
					<view class="confirmOrder-header__item-tips">已成交{{ (detailsList.order || {}).success }}笔</view>
				</view>
				<view class="confirmOrder-header__ways">
					<image src="../../static/public/icon-bank-show.png" mode="widthFix" v-if="(detailsList.order || {}).yhk == 1"></image>
					<image src="../../static/public/icon-alipay-show.png" mode="widthFix" v-if="(detailsList.order || {}).zfb == 1"></image>
					<image src="../../static/public/icon-wechat-show.png" mode="widthFix" v-if="(detailsList.order || {}).wx == 1"></image>
				</view>
			</view>
			<view class="confirmOrder-content">
				<view class="confirmOrder-content__item">
					<view class="confirmOrder-content__item-title">支付金额</view>
					<view class="confirmOrder-content__item-num confirmOrder-content__item-num--position">订单号：{{ (detailsList.record || {}).memo }}</view>
				</view>
				<view class="confirmOrder-content__cny">{{ (((detailsList.record || {}).quantity)*1 * ((detailsList.record || {}).price)*1) | number(2) }}CNY</view>
				<view class="confirmOrder-content__item">
					<view class="confirmOrder-content__item-title confirmOrder-content__item-title--width">交易数量</view>
					<view class="confirmOrder-content__item-num">{{ (detailsList.record || {}).quantity | number(2) }} {{ (detailsList.record || {}).currencyName }}</view>
				</view>
				<view class="confirmOrder-content__item">
					<view class="confirmOrder-content__item-title confirmOrder-content__item-title--width">交易单价</view>
					<view class="confirmOrder-content__item-num">{{ (((detailsList.record || {}).price)*1) | number(2) }}CNY / 1{{ (detailsList.record || {}).currencyName }}</view>
				</view>
			</view>
			
			<view class="confirmOrder-ways">
				<view class="initTilte">
					<view class="initTilte-title">选择付款</view><view class="initTilte-tips">方式</view>
				</view>
				<view class="confirmOrder-ways__item" v-if="(detailsList.order || {}).yhk == 1">
					<view class="confirmOrder-chioce" @click="agreement(1)">
						<label class="confirmOrder-chioce__box" :class="[flag == 1 ? 'confirmOrder-chioce__box--active' : '']"></label>
						<view class="confirmOrder-chioce__title">国内银行转账</view>
					</view>
					<view class="confirmOrder-ways__item-box">
						<view class="confirmOrder-ways__title">收款方户名</view>
						<view class="confirmOrder-ways__news">{{ (detailsList.yhk || {}).name }}</view>
					</view>
					<view class="confirmOrder-ways__item-box">
						<view class="confirmOrder-ways__title">收款方开户行</view>
						<view class="confirmOrder-ways__news">{{ (detailsList.yhk || {}).bankName }}</view>
					</view>
					<view class="confirmOrder-ways__item-box">
						<view class="confirmOrder-ways__title">收款方开户地址</view>
						<view class="confirmOrder-ways__news">{{ (detailsList.yhk || {}).bankAddress }}</view>
					</view>
					<view class="confirmOrder-ways__item-box">
						<view class="confirmOrder-ways__title">收款方账户</view>
						<view class="confirmOrder-ways__news">{{ (detailsList.yhk || {}).no }}</view>
						<image class="confirmOrder-ways__image" @click="$tools.copy((detailsList.yhk || {}).no)" src="../../static/public/icon-copy-grey.png" mode="widthFix"></image>
					</view>
					<view class="confirmOrder-ways__item-tips">
						* 为了您的资金安全，请使用您本人的<text>银行账户</text>进行转账。使用任何非本人账户的支付方式操作视为无效。
					</view>
				</view>
				<view class="confirmOrder-ways__item" v-if="(detailsList.order || {}).zfb == 1">
					<view class="confirmOrder-chioce" @click="agreement(2)">
						<label class="confirmOrder-chioce__box" :class="[flag == 2 ? 'confirmOrder-chioce__box--active' : '']"></label>
						<view class="confirmOrder-chioce__title">支付宝</view>
					</view>
					<view class="confirmOrder-ways__item-code" @click="open((detailsList.zfb || {}).pic)">
						<image src="../../static/public/icon-code.png" mode="widthFix"></image>
					</view>
					<view class="confirmOrder-ways__item-content">
						<view class="confirmOrder-ways__item-name">{{ (detailsList.zfb || {}).name }}</view>
						<view class="confirmOrder-ways__item-words">点击放大右侧二维码，扫码付款</view>
					</view>
					<view class="confirmOrder-ways__item-box" v-if="flag == 2">
						<view class="confirmOrder-ways__news">已通过支付宝付款给你，注意查收</view>
					</view>
					<view class="confirmOrder-ways__item-box" v-else>
						<input type="text" v-model="remark" placeholder="请填写您的备注..." placeholder-class="confirmOrder-ways__item-box--input"/>
					</view>
				</view>
				<view class="confirmOrder-ways__item" v-if="(detailsList.order || {}).wx == 1">
					<view class="confirmOrder-chioce" @click="agreement(3)">
						<label class="confirmOrder-chioce__box" :class="[flag == 3 ? 'confirmOrder-chioce__box--active' : '']"></label>
						<view class="confirmOrder-chioce__title">微信</view>
					</view>
					<view class="confirmOrder-ways__item-code" @click="open((detailsList.wx || {}).pic)">
						<image src="../../static/public/icon-code.png" mode="widthFix"></image>
					</view>
					<view class="confirmOrder-ways__item-content">
						<view class="confirmOrder-ways__item-name">{{ (detailsList.wx || {}).name }}</view>
						<view class="confirmOrder-ways__item-words">点击放大右侧二维码，扫码付款</view>
					</view>
					<view class="confirmOrder-ways__item-box" v-if="flag == 3">
						<view class="confirmOrder-ways__news">已通过微信付款给你，注意查收</view>
					</view>
					<view class="confirmOrder-ways__item-box" v-else>
						<input type="text" v-model="remark" placeholder="请填写您的备注..." placeholder-class="confirmOrder-ways__item-box--input"/>
					</view>
				</view>
			</view>
			
			<view class="confirmOrder-upload">
				<view class="confirmOrder-upload__title">*上传付款凭证<text>(必填)</text></view>
				<view class="confirmOrder-upload__image">
					<view class="confirmOrder-upload__image-bg" :style="'background: url( '+ uploadList.src +') no-repeat;background-size: 100% 100%;'" @click="chooseImg()">
						<image src="../../static/exchange/icon-exchange-upload.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
		
		<view class="confirmOrder-btn">
			<view class="confirmOrder-btn__disable" v-if="isBuyer" @click="callPhoneFunc((sellInfo || {}).phone)">联系提供家</view>
			<view class="confirmOrder-btn__disable" v-else @click="callPhoneFunc((buyInfo || {}).phone)">联系收取家</view>
			<!-- <view class="confirmOrder-btn__style" @click="$tools.jump('./orderDetails')">提交订单</view> -->
			<view class="confirmOrder-btn__style——1" v-if="endTimeStr == '00:00'">提交订单</view>
			<view class="confirmOrder-btn__style" v-else @click="payOrder()">提交订单{{ endTimeStr }}</view>
		</view>
		
		<!-- 收款码弹框 -->
		<uni-popup ref="codePopup" type="center" :animation="true">
			<view class="initPopup">
				<view class="initImage">
					<image :src="src" mode="widthFix" class="initImage-codeImg" @click="saveQrcode()"></image>
					<view class="initImage-title">长按保存二维码至相册</view>
					<view @click="hidePopup('codePopup')">
						<image src="../../static/exchange/icon-exchange-close.png" class="initImage-closeImg" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import weburl from '../../common/js/url.js';
	import { pathToBase64, base64ToPath } from '../../components/image-tools/index.js';
	export default {
			data(){
				return{
					flag:'',
					text:'',
					selectPayment:'',
					uploadList: {src:''},
					detailsList:{},
					buyInfo:{},
					sellInfo:{},
					src:'',
					remark:'',
					endTimeStr: '',
					endtimer:'',
					isBuyer: true, //true为买家，false卖家
				}
			},
			onLoad(hash) {
				this.recordId = hash.value1;
			},
			onHide() {
				clearInterval(this.endTimer);
			},
			onShow() {
				this.init();
				this.countDownTime();
				this.userId = uni.getStorageSync('userId');
			},
			methods: {
				init(){
					this.getOrderDetails();
				},
				clearBack() {
					clearInterval(this.endTimer);
					this.$tools.back();
				},
				// 订单详情
				getOrderDetails() {
					let that = this;
					this.$Ajax('/front/otc/getRecord', {
						recordId: this.recordId
					}, res => {
						if (res.code == 0) {
							this.detailsList = res.obj;
							this.isBuyer = this.userId == this.detailsList.record.buyUserId;
							this.buyInfo = res.obj.buyInfo;
							this.sellInfo = res.obj.sellInfo;
							this.endTime = res.obj.time;
							var minute = Math.floor(((this.endTime % 86400) % 3600) / 60).toString().padStart(2, '0');
							var second = Math.floor(((this.endTime % 86400) % 3600) % 60).toString().padStart(2, '0');
							if (minute <= 0) {
								that.endTimeStr = '00:' + second;
							} else {
								that.endTimeStr = minute + ':' + second;
							}
							console.log(this.endTime);
						}
					});
				},
				countDownTime() {
					let that = this;
					this.endTimer = setInterval(function() {
						that.endTime = that.endTime - 1;
						var minute = Math.floor(((that.endTime % 86400) % 3600) / 60).toString().padStart(2, '0');
						console.log('1',that.endTimeStr);
						var second = Math.floor(((that.endTime % 86400) % 3600) % 60).toString().padStart(2, '0');
						if (minute <= 0) {
							that.endTimeStr = '00:' + second;
						} else {
							that.endTimeStr = minute + ':' + second;
						}
				
						if (that.endTime < 0) {
							console.log('2');
							clearInterval(that.endTimer);
							that.getOrderDetails();
						}
					}, 1000);
				},
				payOrder() {
					const that = this;
					if(that.selectPayment == ''){
						return that.$tools.toast("请选择支付方式");
					}
					if(that.uploadList.src == ''){
						return that.$tools.toast("请上传付款凭证");
					}
					uni.showLoading({
						title: '上传中',
						mask: true
					});
					let token = uni.getStorageSync('token');
					let files = [];
					files.push({ name: 'file1', uri: that.uploadList.src });
					let data = {
						token: token,
						payment: that.selectPayment,
						recordId: that.recordId,
						remark:this.remark,
						file1: that.uploadList.src,
					};
					console.log(data);
					uni.uploadFile({
						url: weburl.webUrl + '/front/otc/pay',
						files: files,
						header: { token: token },
						formData: data,
						success: res => {
							var data = JSON.parse(res.data);
							console.log(data);
							if (data.code == 0) {
								this.$tools.toastJump(data.msg,'./orderDetails', this.recordId);
							} else {
								that.$tools.toast(data.msg);
							}
						},
						fail(err) {},
						complete: res => {
							uni.hideLoading();
						}
					});
				},
				agreement(index){
					this.flag = index;
					if(index == 1){
						this.selectPayment = '银行卡';
						if(this.remark == ''){
							this.remark = '已通过银行卡付款给你，注意查收';
						}
					}else if(index == 2){
						this.selectPayment = '支付宝';
						if(this.remark == ''){
							this.remark = '已通过支付宝付款给你，注意查收';
						}
					}else if(index == 3){
						this.selectPayment = '微信';
						if(this.remark == ''){
							this.remark = '已通过微信付款给你，注意查收';
						}
					}
				},
				open(src){
					this.src = src;
					this.openPopup('codePopup');
				},
				chooseImg() {
					let that = this;
					var token = uni.getStorageSync('token');
					uni.chooseImage({
						count: 1, //默认9
						sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
						// sourceType: ['camera', 'album'], //从相册选择
						sourceType: ['album'], //从相册选择
						success: res => {
							this.uploadList.src = res.tempFilePaths[0];
						},
						fail: function() {
							console.log('上传图片接口调用失败');
							return;
						}
					});
				},
				// 取消订单
				deleteOrder() {
					this.$Ajax(
						// '/front/otc/cancelOrder',
						'/front/otc/cancelRecord',
						{
							recordId: this.recordId
						},
						res => {
							if (res.code == 0) {
								this.$tools.toastBack('取消订单成功',1);
							}
						}
					);
				},
				// 联系对方
				callPhoneFunc(phone) {
					uni.makePhoneCall({
						phoneNumber: phone //仅为示例
					});
				},
				// 保存相册
				saveQrcode() {
					console.log("123");
					let that = this;
					uni.saveImageToPhotosAlbum({
						filePath: that.src,
						success: function() {
							that.$tools.toast('保存成功');
							that.hidePopup('codePopup');
						}
					});
				},
				/* 弹出框公用 */
				openPopup(e, item) {
					this.popupInfo = item;
					this.$refs[e].open();
				},
				hidePopup(e) {
					this.$refs[e].close();
				},
				changePopup(e) {
					console.log('popup ' + e.type + ' 状态', e.show);
					if (e.show) {
						uni.hideTabBar();
					} else {
						uni.showTabBar();
					}
				},
				refresh() {
					clearInterval(this.endtimer);
					this.init();
				}
			},
		}
	</script>

<style lang="scss" scoped>
	@import '/scss/confirmOrder';
	@import '../safety/scss/safety';
</style>
