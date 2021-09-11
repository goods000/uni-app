<template>
	<view class="pages">
		<view class="" style="padding-bottom: 28%;">
			
			<view class="businessOrder-header">
				<view class="header_bar header_bar--absolute">
					<view class="header">
						<view class="header-white" @click="$tools.back(1)"></view>
						<view class="header-title-white">订单详情</view>
					</view> 
				</view> 
				
				<view>
					<view class="businessOrder-header-status">请付款</view>
					<view class="businessOrder-header-txt">您已成功下单，请及时付款</view>
				</view>
				
				<!-- <view>
					<view class="businessOrder-header-status">待对方放币</view>
					<view class="businessOrder-header-txt">预计05:00后对方放币</view>
				</view> -->
				
				<!-- <view>
					<view class="businessOrder-header-status">交易申诉中</view>
					<view class="businessOrder-header-end">订单已冻结</view>
				</view> -->
				
				
				<view class="businessOrder-header-mode" @click.stop="callPhoneFunc(isBuyer ? (detailsList.sellInfo || {}).phone : (detailsList.buyInfo || {}).phone)">
					<image src="../../static/business/icon-business-phone.png" mode="widthFix"></image>
					<view class="businessOrder-header-mode__title">联系对方</view>
				</view>
			</view>
			
			<view class="businessOrder-wrapper">
				<view class="business-list-box">
					<view class="business-list-box-header">
						<view class="business-list-box-header-left">
							<image src="../../static/operate/logo.png" mode="widthFix"></image>
							<view class="business-list-box-header-left--name">{{ isBuyer ? '卖家' : '买家' }}{{ isBuyer ? (detailsList.sellInfo || {}).name : (detailsList.buyInfo || {}).name }}</view>
						</view>
						<view class="business-list-box-header-left--tips">成交率 142562  / 成交率 90%</view>
					</view>
					
					<view class="businessOrder-wrapper-box">
						<view class="businessOrder-wrapper-box__item">
							<view class="oppupBusiness-list-item__txt">交易金额</view>
							<view class="businessOrder-wrapper-box__item-cny">{{ (detailsList.record || {}).money }} CNY</view>
						</view>
						<image src="../../static/business/icon-business-img.png" mode="widthFix"></image>
					</view>
					
					<view class="oppupBusiness-list">
						<view class="oppupBusiness-list-item">
							<view class="oppupBusiness-list-item__txt">交易数量</view>
							<view class="oppupBusiness-list-item__price">{{ (detailsList.record || {}).quantity }} OC</view>
						</view>
						<view class="oppupBusiness-list-item">
							<view class="oppupBusiness-list-item__txt">实付款</view>
							<view class="oppupBusiness-list-item__price">{{ ((detailsList.record || {}).quantity)*1 * ((detailsList.record || {}).price)*1 }} CNY</view>
						</view>
						<view class="oppupBusiness-list-item">
							<view class="oppupBusiness-list-item__txt">订单编号</view>
							<view class="oppupBusiness-list-item__price">{{ (detailsList.record || {}).memo }}</view>
						</view>
						<view class="oppupBusiness-list-item">
							<view class="oppupBusiness-list-item__txt">下单时间</view>
							<view class="oppupBusiness-list-item__price">{{ (detailsList.record || {}).createTime }}</view>
						</view>
					</view>
				</view>
				
				<view class="v-block" v-if="(pageStatus == 1 && isBuyer) || (pageStatus == 2 && !isBuyer) || pageStatus == 3">
					<view class="businessOrder-pay">
						<image src="../../static/payment/icon-payment-bank.png" mode="widthFix" v-if="selectType == 0"></image>
						<image src="../../static/payment/icon-payment-alipay.png" mode="widthFix" v-if="selectType == 1"></image>
						<image src="../../static/payment/icon-payment-weChat.png" mode="widthFix" v-if="selectType == 2"></image>
						<picker @change="bindPickerChange" :value="index" :range="array" range-key="name" class="businessOrder-pay-picker">
							<view class="businessOrder-pay__title">{{array[index].name}}</view>
							<view class="businessOrder-pay__txt">切换支付方式</view>
						</picker>
					</view>
					<view class="v-block" v-if="selectPaymentCurrency == 1">
						<view class="businessOrder-list">
							<view class="businessOrder-list-label">收款人</view>
							<view class="businessOrder-list-title">{{ (detailsList.yhk || {}).name }}</view>
						</view>
						<view class="businessOrder-list">
							<view class="businessOrder-list-label">银行卡卡号</view>
							<view class="businessOrder-list-title">
								<text>{{ (detailsList.yhk || {}).no }}</text>
								<image src="../../static/business/icon-business-copy.png" mode="widthFix" class="businessOrder-list-title-copy"
								@click="$tools.copy((detailsList.yhk || {}).no)"></image>
							</view>
						</view>
					</view>
					<view class="v-block" v-if="selectPaymentCurrency == 2">
						<view class="businessOrder-list">
							<view class="businessOrder-list-label">收款人</view>
							<view class="businessOrder-list-title">{{ (detailsList.yhk || {}).name }}</view>
						</view>
						<view class="businessOrder-list">
							<view class="businessOrder-list-label">支付宝账号</view>
							<view class="businessOrder-list-title">
								<text>{{ (detailsList.zfb || {}).no }}</text>
								<image src="../../static/business/icon-business-copy.png" mode="widthFix" class="businessOrder-list-title-copy"
								@click="$tools.copy((detailsList.zfb || {}).no)"></image>
							</view>
						</view>
						<view class="businessOrder-list">
							<view class="businessOrder-list-label">收款二维码</view>
							<view class="businessOrder-list-title">
								<text>点击查看缩小的二维码扫码支付</text>
								<image src="../../static/business/icon-business-code.png" mode="widthFix" class="businessOrder-list-title-img"
								@click="getIcon((detailsList.zfb || {}).pic)"></image>
							</view>
						</view>
					</view>
					<view class="v-block" v-if="selectPaymentCurrency == 3">
						<view class="businessOrder-list">
							<view class="businessOrder-list-label">收款人</view>
							<view class="businessOrder-list-title">{{ (detailsList.yhk || {}).name }}</view>
						</view>
						<view class="businessOrder-list">
							<view class="businessOrder-list-label">微信账号</view>
							<view class="businessOrder-list-title">
								<text>{{ (detailsList.wx || {}).no }}</text>
								<image src="../../static/business/icon-business-copy.png" mode="widthFix" class="businessOrder-list-title-copy"
								@click="$tools.copy((detailsList.wx || {}).no)"></image>
							</view>
						</view>
						<view class="businessOrder-list">
							<view class="businessOrder-list-label">收款二维码</view>
							<view class="businessOrder-list-title">
								<text>点击查看缩小的二维码扫码支付</text>
								<image src="../../static/business/icon-business-code.png" mode="widthFix" class="businessOrder-list-title-img"
								@click="getIcon((detailsList.wx || {}).pic)"></image>
							</view>
						</view>
					</view>
					
					
				</view>
			</view>
			
			<view class="formBox">
				<view class="formBox-input">
					<view class="formBox-input-label">备注</view>
					<textarea value="" placeholder="请务必填写您的备注信息" />
				</view>
			</view>
			
			<view class="businessOrder-list">
				<view class="businessOrder-list-label">申诉原因</view>
				<view class="businessOrder-list-title chioce">对方未放币</view>
			</view>
			
			<view class="businessOrder-bottom">
				<!-- <view class="businessOrder-bottom-btn">取消订单</view>
				<view class="businessOrder-bottom-btn" @click="getSecurity()">立即支付</view> -->
				
				<view class="businessOrder-bottom-anniu" @click="getAppeal()">立即申诉</view>
			</view>
		</view>
		
		<!-- 二维码图片 -->
		<uni-popup ref="iconPopup" type="center" :animation="true">
			<view class="oppupBoxicon">
				<view class="header_bar">
					<view class="header">
						<view class="header-right" @click="iconClose()">
							<image src="../../static/public/icon-close.png" mode="widthFix"></image>
						</view> 
					</view> 
				</view>
				<image src="../../static/index/icon-banner-02.png" mode="widthFix"></image>
			</view>
		</uni-popup>
		<!-- 安全验证 -->
		<uni-popup ref="securityPopup" type="bottom" :animation="true">
			<view class="oppupBox">
				<view class="header_bar">
					<view class="header">
						<view class="header-title">安全验证</view>
						<view class="header-right" @click="close()">
							<image src="../../static/public/icon-close.png" mode="widthFix"></image>
						</view> 
					</view> 
				</view>
				<view class="oppupBox-form">
					<view class="oppupBox-form-label">钱包密码</view>
					<input type="password" placeholder="请输入您的钱包密码" v-model="password"/>
				</view>
				<view class="oppupBox-forget">确认付款后将不可撤回，请谨慎操作！</view>
				<view class="initBtn">立即支付</view>
			</view>
		</uni-popup>
		<!-- 申诉 -->
		<uni-popup ref="appealPopup" type="bottom" :animation="true">
			<view class="oppupBox">
				<view class="header_bar">
					<view class="header">
						<view class="header-title">申诉原因</view>
						<view class="header-right" @click="closeAppeal()">
							<image src="../../static/public/icon-close.png" mode="widthFix"></image>
						</view> 
					</view> 
				</view>
				<view class="oppupBox-form">
					<view class="oppupBox-form-label">申诉类型选择</view>
					<picker @change="bindPickerAppeal" :value="appeaIndex" :range="appealList" range-key="name" class="oppupBox-form-picker">
						<view>{{appealList[appeaIndex].name}}</view>
					</picker>
				</view>
				
				<view class="oppupBox-forget">提起申诉后资产将会冻结,官方将介入本次交易，直至申诉结算恶意申诉将冻结账号。</view>
				<view class="initBtn">立即支付</view>
				
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				array: [{name:'银行卡支付'},{name:'支付宝支付'},{name:'微信支付'}],
				index: 0,
				selectType:0,
				appealList: [{name:'对方未打款'},{name:'请求超时'}],
				appeaIndex: 0,
				appeaSelectType:0,
				password:'',
				
				isBuyer: true, //true为买家，false卖家
				pageStatus: 0,
				payType: 0,
				endTime: 0,
				endTimer: '',
				endTimeStr: '',
				endTimeOpen: false,
				isPublishUser: 0,
				userId: '',
				
				recordId: '',
				status: 0,
				statusList: ['待接单', '待支付', '待收款', '已完成', '已取消', '申诉中', '申诉成功', '申诉失败'],
				detailsList: {
					record:{memo:'5485415JHGV000000OOHB',name:'阿占比',money:'10.12615',quantity:'0.6',price:'5',createTime:'2017-01-12 12:10',type:'1',
					},
					yhk:{name:'阿占比',no:'6542 2222 2222 2222 552'},
					zfb:{name:'支付宝',no:'17345652365',pic:'../../static/business/icon-business-img.png'},
					wx:{name:'支付宝',no:'17345652365',pic:'../../static/business/icon-business-01.png'},
				},
				selectPaymentCurrency: 1,
			}
		},
		onLoad(hash) {
			this.recordId = hash.value1;
			this.userId = uni.getStorageSync('userId');
		},
		onShow() {
			
		},
		methods: {
			getIcon() {this.openPopup('iconPopup');},
			iconClose() {this.hidePopup('iconPopup');},
			// 安全验证
			getSecurity() {this.openPopup('securityPopup');},
			close() {this.hidePopup('securityPopup');},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.detail.value)
				this.index = e.detail.value
				this.selectType = this.index
			},
			// 申诉
			getAppeal() {this.openPopup('appealPopup');},
			closeAppeal() {this.hidePopup('appealPopup');},
			bindPickerAppeal: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.detail.value)
				this.appeaIndex = e.detail.value
				this.appeaSelectType = this.appeaIndex
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
						console.log(JSON.stringify(res));
						if (res.code == 0) {
							this.detailsList = res.obj;
							this.isBuyer = this.detailsList.record.typeShow == 0;
							this.pageStatus = this.detailsList.record.status;
							// this.payType = this.detailsList.record.payType;
							this.endTime = res.obj.time;
							var minute = Number(((this.endTime / 60) % 60).toFixed(0));
							var second = this.endTime % 60;
							if (minute <= 0) {
								that.endTimeStr = second + '秒';
							} else {
								that.endTimeStr = minute + '分' + second + '秒';
							}
							console.log(this.endTime);
							this.endTimeOpen = true;
							console.log(this.userId);
							this.isBuyer = res.obj.record.buyUserId == this.userId;
							// this.isPublishUserID = res.obj.record.type == 1 ? res.obj.record.buyUserId : res.obj.record.sellUserId;
							this.isPublishUser = res.obj.order.userId == this.userId;
							if (res.obj.yhk) {
								console.log('进入');
								var data = res.obj.yhk;
								data.payTypeStr = '银联';
								this.paymentList.push(data);
							}
							if (res.obj.zfb) {
								var data = res.obj.zfb;
								data.payTypeStr = '支付宝';
								this.paymentList.push(data);
							}
							if (res.obj.wx) {
								var data = res.obj.wx;
								data.payTypeStr = '微信';
								this.paymentList.push(data);
							}
							this.selectPayment = this.paymentList[0].payTypeStr;
							this.selectPaymentCurrency = this.paymentList[0].payType;
							console.log(this.paymentList);
							console.log('是否发布者: ' + this.isPublishUser + ' -- 是否买家: ' + this.isBuyer + ' -- 当前页面状态: ' + this.pageStatus);
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
				if (!e.show) {
					this.pay_password = '';
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/business/business';
	@import '@/common/scss/pages/business/businessOrder';
	@import '@/common/scss/pages/setting/setting';
	.header-title{font-size: 40upx;font-weight: bold;}
</style>
