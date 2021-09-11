<template>
	<view class="page">
		<view class="exchangeDetails-bg">
			<view class="header_bar">
				<view class="header">
					<view class="header-back--white" @click="goBack()"></view>
					<view class="header-title-white">订单详情</view>
					<view class="header-right header-right--white"
					v-if="pageStatus == 1 || pageStatus == 2 || pageStatus == 3"
					 @click="$tools.jump('./appeal',recordId)">申诉</view>
				</view> 
			</view> 
			<!-- ['0待接单', '1待支付', '2待收款', '3已完成', '4已取消', '5申诉中', '6申诉成功', '7申诉失败'], -->
			<!-- 发布者: isPublishUser 买家: isBuyer -->
			<view class="exchangeDetails-status">
				<view class="exchangeDetails-status__item" v-if="pageStatus == 1 && isBuyer">
					<view class="exchangeDetails-status__item-statuTitle">订单待打款</view>
					<view class="exchangeDetails-status__item-statuTips">请耐心等待收取家确认订单后给您打款</view>
				</view>
				<view class="exchangeDetails-status__item" v-if="pageStatus == 1 && !isBuyer">
					<view class="exchangeDetails-status__item-statuTitle">订单待打款</view>
					<view class="exchangeDetails-status__item-statuTips">请确认订单及打款信息，及时给收取家打款并上传上款凭证</view>
				</view>
				<view class="exchangeDetails-status__item" v-if="pageStatus == 2 && isBuyer">
					<view class="exchangeDetails-status__item-statuTitle">订单待放币</view>
					<view class="exchangeDetails-status__item-statuTips">请耐心等待提供家确认收款后给您放币</view>
				</view>
				<view class="exchangeDetails-status__item" v-if="pageStatus == 2 && !isBuyer">
					<view class="exchangeDetails-status__item-statuTitle">订单打款待确认</view>
					<view class="exchangeDetails-status__item-statuTips">请确认订单及收款信息，及时给收取家放币</view>
					<!-- <view class="exchangeDetails-status__item-statuTips">请耐心等待卖家确认收款后，资产即刻到账</view> -->
				</view>
				<view class="exchangeDetails-status__item" v-if="pageStatus == 3">
					<view class="exchangeDetails-status__item-statuTitle">订单已完成</view>
					<view class="exchangeDetails-status__item-statuTips" v-if="isBuyer">已收取，订单完成</view>
					<view class="exchangeDetails-status__item-statuTips" v-else>已提供，订单完成</view>
				</view>
				<view class="exchangeDetails-status__item" v-if="pageStatus == 4">
					<view class="exchangeDetails-status__item-statuTitle">交易已取消</view>
					<view class="exchangeDetails-status__item-statuTips">交易已取消</view>
				</view>
				<view class="exchangeDetails-status__item" v-if="pageStatus == 5 || pageStatus == 6 || pageStatus == 7">
					<view class="exchangeDetails-status__item-statuTitle" v-if="pageStatus == 5">申诉中</view>
					<view class="exchangeDetails-status__item-statuTitle" v-if="pageStatus == 6">申诉成功</view>
					<view class="exchangeDetails-status__item-statuTitle" v-if="pageStatus == 7">申诉失败</view>
					<view class="exchangeDetails-status__item-statuTips">订单已冻结</view>
				</view>
				<image src="../../static/exchange/icon-exchange-icon.png" class="exchangeDetails-status__image" mode="widthFix"></image>
			</view>
		</view>
		<view class="exchangeDetails">
			<view class="exchangeDetails-content">
				<view class="exchangeDetails-content__item">
					<view class="exchangeDetails-content__item-title">支付金额</view>
				</view>
				<view class="exchangeDetails-content__cny">{{ (((detailsList.record || {}).quantity)*1 * ((detailsList.record || {}).price)*1) | number(2) }}CNY</view>
				<view class="exchangeDetails-content__item">
					<view class="exchangeDetails-content__item-title exchangeDetails-content__item-title--width">交易数量</view>
					<view class="exchangeDetails-content__item-num">{{ (detailsList.record || {}).quantity | number(2) }} {{ (detailsList.record || {}).currencyName }}</view>
				</view>
				<view class="exchangeDetails-content__item">
					<view class="exchangeDetails-content__item-title exchangeDetails-content__item-title--width">交易单价</view>
					<view class="exchangeDetails-content__item-num">{{ (((detailsList.record || {}).price)*1) | number(2) }}CNY / 1{{ (detailsList.record || {}).currencyName }}</view>
				</view>
			</view>
		</view>
		<!-- 打款信息 -->
		<view class="exchangeDetails exchangeDetails-padding">
			<view class="initTilte">
				<view class="initTilte-title">打款信息</view><view class="initTilte-tips"></view>
			</view>
			<view class="exchangeDetails-list">
				<view class="exchangeDetails-list__item">
					<view class="exchangeDetails-list__item-title">交易金额：</view>
					<view class="exchangeDetails-list__item-box" @click="navigateFlag = !navigateFlag">
						<view class="exchangeDetails-list__item-cny">{{ (((detailsList.record || {}).quantity)*1 * ((detailsList.record || {}).price)*1) | number(2) }}CNY</view>
						<image src="../../static/public/icon-drop-grey.png" mode="" class="exchangeDetails-list__item-image"
						:class="navigateFlag ? 'exchangeDetails-list__item-image--active' : ''"></image>
					</view>
				</view>
			</view>
			<view class="exchangeDetails-wrapper" v-if="navigateFlag == true">
				<view class="exchangeDetails-list" v-if="(pageStatus == 2 || pageStatus == 3 || pageStatus == 4 || pageStatus == 5 || pageStatus == 6 || pageStatus == 7) && detailsList.record.payment != null">
					<view class="exchangeDetails-list__item">
						<view class="exchangeDetails-list__item-title">支付方式</view>
						<view class="exchangeDetails-list__item-news" v-if="detailsList.record.payment == '银行卡'">银行卡</view>
						<view class="exchangeDetails-list__item-news" v-if="detailsList.record.payment == '支付宝'">支付宝</view>
						<view class="exchangeDetails-list__item-news" v-if="detailsList.record.payment == '微信'">微信</view>
					</view>
					<view class="exchangeDetails-list__item">
						<view class="exchangeDetails-list__item-title">收款人</view>
						<view class="exchangeDetails-list__item-news" v-if="detailsList.record.payment == '银行卡'">{{ (detailsList.yhk || {}).name }}</view>
						<view class="exchangeDetails-list__item-news" v-if="detailsList.record.payment == '支付宝'">{{ (detailsList.zfb || {}).name }}</view>
						<view class="exchangeDetails-list__item-news" v-if="detailsList.record.payment == '微信'">{{ (detailsList.wx || {}).name }}</view>
					</view>
					<view class="exchangeDetails-list__item">
						<view class="exchangeDetails-list__item-title">{{detailsList.record.payment}}账号</view>
						<view class="exchangeDetails-list__item-news" v-if="detailsList.record.payment == '银行卡'">{{ (detailsList.yhk || {}).no }}</view>
						<view class="exchangeDetails-list__item-news" v-if="detailsList.record.payment == '支付宝'">{{ (detailsList.zfb || {}).no }}</view>
						<view class="exchangeDetails-list__item-news" v-if="detailsList.record.payment == '微信'">{{ (detailsList.wx || {}).no }}</view>
					</view>
					<view class="exchangeDetails-list__item" v-if="detailsList.record.payment == '支付宝' || detailsList.record.payment == '微信'">
						<view class="exchangeDetails-list__item-title">收款二维码</view>
						<view class="exchangeDetails-list__item-box">
							<view class="exchangeDetails-list__item-copy" v-if="detailsList.record.payment == '支付宝'" @click="getIcon((detailsList.zfb || {}).pic)">点击查看</view>
							<view class="exchangeDetails-list__item-copy" v-if="detailsList.record.payment == '微信'" @click="getIcon((detailsList.wx || {}).pic)">点击查看</view>
							<image src="../../static/exchange/icon-exchange-code.png" mode="" class="exchangeDetails-list__item-boxImage"></image>
						</view>
					</view>
					<view class="exchangeDetails-list__item">
						<view class="exchangeDetails-list__item-title">付款凭证</view>
						<view class="exchangeDetails-list__item-copy exchangeDetails-list__item-copy--disable" @click="getIcon((detailsList.record || {}).picture)">点击查看</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 订单信息 -->
		<view class="orderBox">
			<view class="initTilte">
				<view class="initTilte-title">订单信息</view><view class="initTilte-tips"></view>
			</view>
			<view class="orderBox-list">
				<view class="orderBox-list-item">
					<view class="orderBox-list-item-title">订单编号：</view>
					<view class="orderBox-list-item-news">{{ (detailsList.record || {}).memo }}</view>
					<view class="orderBox-list-item-copy" @click="$tools.copy((detailsList.record || {}).memo)">复制</view>
				</view>
				<!-- <view class="orderBox-list-item">
					<view class="orderBox-list-item-title">订单生成时间：</view>
					<view class="orderBox-list-item-news">{{ (detailsList.record || {}).createTime }}</view>
				</view> -->
				<view class="orderBox-list-item"  v-for="(sub,key) in detailsList.logs" :key="key">
				<!-- <view class="orderBox-list-item"> -->
					<!-- <view class="orderBox-list-item-title">订单生成时间：</view>
					<view class="orderBox-list-item-title">打款时间：</view>
					<view class="orderBox-list-item-title">放币时间：</view>
					<view class="orderBox-list-item-title">取消时间：</view> -->
					<view class="orderBox-list-item-title" v-if="sub.remark == '发起交易'">订单生成时间：</view>
					<view class="orderBox-list-item-title" v-if="sub.remark == '付款'">打款时间：</view>
					<view class="orderBox-list-item-title" v-if="sub.remark == '用户操作收款'">收款时间：</view>
					<view class="orderBox-list-item-title" v-if="sub.remark == '系统放币'">提供时间：</view>
					<view class="orderBox-list-item-title" v-if="sub.remark == '超时自动取消'">取消时间：</view>
					<view class="orderBox-list-item-title" v-if="sub.remark.substr(0,4) == '提起申诉'">申诉时间：</view>
					<view class="orderBox-list-item-title" v-if="sub.remark == '申诉失败'">申诉失败：</view>
					<view class="orderBox-list-item-title" v-if="sub.remark == '申诉成功'">申诉成功：</view>
					<view class="orderBox-list-item-news" v-if="pageStatus">{{ sub.createTime }}</view>
					<!-- <view class="orderBox-list-item-news" v-if="sub.remark == '发起交易' || sub.remark == '付款' || sub.remark == '系统放币' || sub.remark == '超时自动取消'">{{ sub.createTime }}</view> -->
					<view class="orderBox-list-item-news" v-else>/</view>
				<!-- </view> -->
				</view>
				<!-- <view class="orderBox-list-item">
					<view class="orderBox-list-item-title">成交时间：</view>
					<view class="orderBox-list-item-news" v-if="pageStatus == 3 && (detailsList.record || {}).createTime == null">/</view>
					<view class="orderBox-list-item-news" v-else>{{ (detailsList.record || {}).createTime }</view>
				</view> -->
				<view class="orderBox-list-item">
					<view class="orderBox-list-item-title">订单进度：</view>
					<view class="orderBox-list-item-news progress">
						<view class="orderBox-progress">
							<!-- <view class="orderBox-progress__item" v-if="pageStatus != 4"> -->
							<view class="orderBox-progress__item" v-if="pageStatus == 1 || pageStatus == 2 || pageStatus == 3">
								<view class="orderBox-progress__item-tips" :class="{'orderBox-progress__item-tips--active' : (pageStatus == 1 || pageStatus == 2 || pageStatus == 3)}"></view>
								<view class="orderBox-progress__item-title" :class="{'orderBox-progress__item-title--active' : (pageStatus == 1 || pageStatus == 2 || pageStatus == 3)}">已付款，并提交订单</view>
							</view>
							<view class="orderBox-progress__item" v-if="pageStatus == 1 || pageStatus == 2 || pageStatus == 3">
								<view class="orderBox-progress__item-tips" :class="{'orderBox-progress__item-tips--active' : (pageStatus == 2 || pageStatus == 3)}"></view>
								<view class="orderBox-progress__item-title" :class="{'orderBox-progress__item-title--active' : (pageStatus == 2 || pageStatus == 3)}">提供家确认收款</view>
							</view>
							<view class="orderBox-progress__item" v-if="pageStatus == 1 || pageStatus == 2 || pageStatus == 3">
								<view class="orderBox-progress__item-tips" :class="{'orderBox-progress__item-tips--active' : pageStatus == 3}"></view>
								<view class="orderBox-progress__item-title" :class="{'orderBox-progress__item-title--active' : pageStatus == 3}" v-if="isBuyer">已收取，订单完成</view>
								<view class="orderBox-progress__item-title" :class="{'orderBox-progress__item-title--active' : pageStatus == 3}" v-else>已提供，订单完成</view>
							</view>
							<view class="orderBox-progress__item" v-if="pageStatus == 4">
								<view class="orderBox-progress__item-tips"></view>
								<view class="orderBox-progress__item-title">已取消</view>
							</view>
							<view class="orderBox-progress__item" v-if="pageStatus == 5 || pageStatus == 6 || pageStatus == 7">
								<view class="orderBox-progress__item-tips" :class="{'orderBox-progress__item-tips--active' : (pageStatus == 5 || pageStatus == 6 || pageStatus == 7)}"></view>
								<view class="orderBox-progress__item-title" :class="{'orderBox-progress__item-title--active' : (pageStatus == 5 || pageStatus == 6 || pageStatus == 7)}">申诉中</view>
							</view>
							<view class="orderBox-progress__item" v-if="pageStatus == 5 || pageStatus == 6">
								<view class="orderBox-progress__item-tips" :class="{'orderBox-progress__item-tips--active' : pageStatus == 6}"></view>
								<view class="orderBox-progress__item-title" :class="{'orderBox-progress__item-title--active' : pageStatus == 6}">申诉成功</view>
							</view>
							<view class="orderBox-progress__item" v-if="pageStatus == 5 || pageStatus == 7">
								<view class="orderBox-progress__item-tips" :class="{'orderBox-progress__item-tips--active' : pageStatus == 7}"></view>
								<view class="orderBox-progress__item-title" :class="{'orderBox-progress__item-title--active' : pageStatus == 7}">申诉失败</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- ['0待接单', '1待支付', '2待收款', '3已完成', '4已取消', '5申诉中', '6申诉成功', '7申诉失败'], -->
		<!-- 发布者: isPublishUser 买家: isBuyer -->
		<view class="exchangeDetails-btn" v-if="pageStatus == 1 || pageStatus == 2 || pageStatus == 3 || pageStatus == 4">
			<view class="exchangeDetails-btn__contact" v-if="!isBuyer" @click="callPhoneFunc((detailsList.sellInfo || {}).phone)">联系收取家</view>
			<view class="exchangeDetails-btn__contact" v-else @click="callPhoneFunc((detailsList.buyInfo || {}).phone)">联系提供家</view>
			
			<view class="exchangeDetails-btn__style" v-if="pageStatus == 1 && isBuyer" @click="$tools.jump('./upload')">上传付款凭证</view>
			
			<view class="exchangeDetails-btn__disable" v-if="pageStatus == 1 && !isBuyer">资产入账，确认验收</view>
			
			<view class="exchangeDetails-btn__style" @click="gatherOrder()" v-if="pageStatus == 2 && !isBuyer">确认收款，去放币</view>
			<view class="exchangeDetails-btn__disable" v-if="pageStatus == 2 && isBuyer">确认收款，去放币</view>
			
			<view class="exchangeDetails-btn__disable" v-if="pageStatus == 3">确认收款，交易完成</view>
			
			<view class="exchangeDetails-btn__disable" v-if="pageStatus == 4">交易已取消</view>
		</view>
		
		<!-- 收款码弹框 -->
		<uni-popup ref="codePopup" type="center" :animation="true">
			<view class="initPopup" @click="hidePopup('codePopup')">
				<view class="initImage">
					<image :src="src" mode="widthFix"></image>
					<!-- <view class="initImage-title">点击图片关闭弹框</view> -->
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
			data(){
				return{
					pageStatus: 1,
					status: 0,
					statusList: ['待接单', '待支付', '待收款', '已完成', '已取消', '申诉中', '申诉成功', '申诉失败'],
					detailsList:{},
					navigateFlag: false,
					src:'',
					isBuyer: true, //true为买家，false卖家
					isPublishUser: 0,
					backType:'',
				}
			},
			onLoad(hash) {
				this.recordId = hash.value1;
				this.backType = hash.value2;
			},
			onShow() {
				this.userId = uni.getStorageSync('userId');
				this.navigateFlag = false;
				this.init();
			},
			methods: {
				init() {
					this.getOrderDetails();
				},
				goBack(){
					if(this.backType == 1){
						this.$tools.switchTab('../exchange/exchange');
					}else{
						this.$tools.back(1);
					}
				},
				// 获取详情
				getOrderDetails() {
					let that = this;
					this.paymentList = [];
					this.$Ajax(
						'/front/otc/getRecord',
						{
							recordId: this.recordId
						},
						res => {
							if (res.code == 0) {
								this.detailsList = res.obj;
								console.log(this.userId + '-----' + this.detailsList.record.buyUserId);
								this.isBuyer = this.userId == this.detailsList.record.buyUserId;
								this.pageStatus = this.detailsList.record.status;
								// this.endTime = res.obj.time;
								// var minute = Number(((this.endTime / 60) % 60).toFixed(0));
								// var second = this.endTime % 60;
								// if (minute <= 0) {
								// 	that.endTimeStr = second + '秒';
								// } else {
								// 	that.endTimeStr = minute + '分' + second + '秒';
								// }
								// console.log(this.endTime);
								// this.endTimeOpen = true;
								this.isPublishUser = res.obj.order.userId == this.userId;
								console.log('pageStatus:'+this.pageStatus+' -- 是否发布者: ' + this.isPublishUser + ' -- 是否买家: ' + this.isBuyer + ' -- 当前页面状态: ' + this.pageStatus);
							}
						}
					);
				},
				// 放币
				gatherOrder() {
					this.$Ajax(
						'/front/otc/gathering',
						{
							recordId: this.recordId
						},
						res => {
							console.log(JSON.stringify(res));
							if (res.code == 0) {
								this.$tools.toast('确定收款成功');
								this.getOrderDetails();
							}
						}
					);
				},
				getIcon(src) {this.src = src;this.openPopup('codePopup');},
				// 联系对方
				callPhoneFunc(phone) {
					uni.makePhoneCall({
						phoneNumber: phone //仅为示例
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
				}
			},
		}
	</script>

<style lang="scss" scoped>
	@import '/scss/exchangeDetails';
</style>
