<template>
	<view class="pages">
		<view class="" style="padding-bottom: 28%;">
			<view class="businessOrder-header">
				<view class="header_bar header_bar--absolute">
					<view class="header">
						<view class="header-white" @click="clearBack()"></view>
						<view class="header-title-white">{{ statusList[pageStatus] }}</view>
					</view> 
				</view> 
				<!-- ['0待接单', '1待支付', '2待收款', '3已完成', '4已取消', '5申诉中', '6申诉成功', '7申诉失败'], -->
				<view v-if="pageStatus == 0 && isPublishUser">
					<view class="businessOrder-header-status">确认接单</view>
					<view class="businessOrder-header-txt">预计{{ endTimeStr }}后自动取消</view>
				</view>
				<view v-if="pageStatus == 1 && isBuyer && !isPublishUser || pageStatus == 1 && isBuyer && isPublishUser">
					<view class="businessOrder-header-status">请付款</view>
					<view class="businessOrder-header-txt">预计{{ endTimeStr }}后自动取消</view>
				</view>
				<view v-if="pageStatus == 1 && !isBuyer && isPublishUser || pageStatus == 1 && !isBuyer && !isPublishUser">
					<view class="businessOrder-header-status">待对方付款</view>
					<view class="businessOrder-header-txt">预计{{ endTimeStr }}后自动取消</view>
				</view>
				<view v-if="pageStatus == 2 && isBuyer">
					<view class="businessOrder-header-status">待对方放币</view>
					<view class="businessOrder-header-txt">等待对方放币</view>
				</view>
				<view v-if="pageStatus == 2 && !isBuyer">
					<view class="businessOrder-header-status">确定放币</view>
					<view class="businessOrder-header-txt">对方已付款，请及时放币</view>
				</view>
				<view v-if="pageStatus == 3">
					<view class="businessOrder-header-status">交易已完成</view>
					<view class="businessOrder-header-txt">您已完成订单</view>
				</view>
				<view v-if="pageStatus == 4">
					<view class="businessOrder-header-status">交易已取消</view>
					<view class="businessOrder-header-txt">您已取消订单</view>
				</view>
				<view v-if="pageStatus == 5">
					<view class="businessOrder-header-status">交易申诉中</view>
					<view class="businessOrder-header-end">订单已冻结</view>
				</view>
				<view v-if="pageStatus == 6">
					<view class="businessOrder-header-status">交易申诉成功</view>
					<view class="businessOrder-header-end">资金已返回</view>
				</view>
				<view v-if="pageStatus == 7">
					<view class="businessOrder-header-status">交易申诉失败</view>
					<view class="businessOrder-header-end">资金已返回</view>
				</view>
				<!-- <view class="businessOrder-header-mode" @click.stop="callPhoneFunc(isBuyer ? (detailsList.sellInfo || {}).phone : (detailsList.buyInfo || {}).phone)"
				v-if="pageStatus != 5 && pageStatus !=6  && pageStatus !=7">
					<image src="../../static/business/icon-business-phone.png" mode="widthFix"></image>
					<view class="businessOrder-header-mode__title">联系对方</view>
				</view> -->
			</view>
			
			<view class="businessOrder-wrapper">
				<view class="business-list-box">
					<view class="business-list-box-header">
						<view class="business-list-box-header-left">
							<image src="../../static/operate/logo.png" mode="widthFix"></image>
							<view class="business-list-box-header-left--name">{{ isBuyer ? '卖家' : '买家' }}：{{ isBuyer ? (detailsList.sellInfo || {}).name : (detailsList.buyInfo || {}).name }}</view>
						</view>
						<view class="business-list-box-header-left--tips"> 成交率 90%</view>
					</view>
					<view class="businessOrder-wrapper-box">
						<view class="businessOrder-wrapper-box__item">
							<view class="oppupBusiness-list-item__txt">交易金额</view>
							<view class="businessOrder-wrapper-box__item-cny">{{ (detailsList.record || {}).money | number(2) }} CNY</view>
						</view>
						<image src="../../static/business/icon-business-img.png" mode="widthFix"></image>
					</view>
					<view class="oppupBusiness-list">
						<view class="oppupBusiness-list-item">
							<view class="oppupBusiness-list-item__txt">交易数量</view>
							<view class="oppupBusiness-list-item__price">{{ (detailsList.record || {}).quantity | number(2) }} {{(detailsList.record || {}).currencyName}}</view>
						</view>
						<view class="oppupBusiness-list-item">
							<view class="oppupBusiness-list-item__txt">实付款</view>
							<view class="oppupBusiness-list-item__price">{{ (((detailsList.record || {}).quantity)*1 * ((detailsList.record || {}).price)*1) | number(2) }} CNY</view>
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
				
				
				<view class="v-block" v-if="(pageStatus == 2 || pageStatus == 3 || pageStatus == 4) && detailsList.record.payment != null">
					<view class="businessOrder-pay">
						<image src="../../static/payment/icon-payment-bank.png" mode="widthFix" v-if="detailsList.record.payment == '银联'"></image>
						<image src="../../static/payment/icon-payment-alipay.png" mode="widthFix" v-if="detailsList.record.payment == '支付宝'"></image>
						<image src="../../static/payment/icon-payment-weChat.png" mode="widthFix" v-if="detailsList.record.payment == '微信'"></image>
						<view class="businessOrder-pay__title">{{ detailsList.record.payment }}</view>
					</view>
					<view class="v-block">
						<view class="businessOrder-list">
							<view class="businessOrder-list-label">卖家信息</view>
							<view class="businessOrder-list-title" v-if="detailsList.record.payment == '银联'">{{ (detailsList.yhk || {}).name }}</view>
							<view class="businessOrder-list-title" v-if="detailsList.record.payment == '支付宝'">{{ (detailsList.zfb || {}).name }}</view>
							<view class="businessOrder-list-title" v-if="detailsList.record.payment == '微信'">{{ (detailsList.wx || {}).name }}</view>
						</view>
						<view class="businessOrder-list">
							<view class="businessOrder-list-label" v-if="detailsList.record.payment == '银联'">银联卡号</view>
							<view class="businessOrder-list-label" v-if="detailsList.record.payment == '支付宝'">支付宝{{ (detailsList.record || {}).type == 1 ? '收款' : '付款' }}码</view>
							<view class="businessOrder-list-label" v-if="detailsList.record.payment == '微信'">微信{{ (detailsList.record || {}).type == 1 ? '收款' : '付款' }}码</view>
							<view class="businessOrder-list-title" v-if="detailsList.record.payment == '银联'">	
								<text>{{ (detailsList.yhk || {}).no }}</text>
								<image src="../../static/business/icon-business-copy.png" mode="widthFix" class="businessOrder-list-title-copy"
								@click="$tools.copy((detailsList.yhk || {}).no)"></image>
							</view>
							<view class="businessOrder-list-title" v-if="detailsList.record.payment == '支付宝'">
								<text>点击查看缩小的二维码扫码支付</text>
								<image src="../../static/business/icon-business-code.png" mode="widthFix" class="businessOrder-list-title-img"
								@click="getIcon((detailsList.zfb || {}).pic)"></image>
							</view>
							<view class="businessOrder-list-title" v-if="detailsList.record.payment == '微信'">
								<text>点击查看缩小的二维码扫码支付</text>
								<image src="../../static/business/icon-business-code.png" mode="widthFix" class="businessOrder-list-title-img"
								@click="getIcon((detailsList.wx || {}).pic)"></image>
							</view>
						</view>
					</view>
				</view>
				
				<view class="v-block" v-if="pageStatus == 1 && detailsList.record.payment == null">
					<view class="businessOrder-pay">
						<image src="../../static/payment/icon-payment-bank.png" mode="widthFix" v-if="selectPaymentCurrency == 1 && (detailsList.order).yhk == 1"></image>
						<image src="../../static/payment/icon-payment-alipay.png" mode="widthFix" v-if="selectPaymentCurrency == 2 && (detailsList.order).zfb == 1"></image>
						<image src="../../static/payment/icon-payment-weChat.png" mode="widthFix" v-if="selectPaymentCurrency == 3 && (detailsList.order).wx == 1"></image>
						<picker @change="bindPickerChange" :value="index" :range="paymentList" range-key="payTypeStr" class="businessOrder-pay-picker">
							<view class="businessOrder-pay__title">{{selectPayment}}</view>
							<view class="businessOrder-pay__txt">切换支付方式</view>
						</picker>
					</view>
					<view class="v-block" v-if="selectPaymentCurrency == 1 && (detailsList.order).yhk == 1">
						<view class="businessOrder-list">
							<view class="businessOrder-list-label">卖家信息</view>
							<view class="businessOrder-list-title">{{ (detailsList.yhk || {}).name }}</view>
						</view>
						<view class="businessOrder-list">
							<view class="businessOrder-list-label">银联卡号</view>
							<view class="businessOrder-list-title">
								<text>{{ (detailsList.yhk || {}).no }}</text>
								<image src="../../static/business/icon-business-copy.png" mode="widthFix" class="businessOrder-list-title-copy"
								@click="$tools.copy((detailsList.yhk || {}).no)"></image>
							</view>
						</view>
					</view>
					<view class="v-block" v-if="selectPaymentCurrency == 2 && (detailsList.order).zfb == 1">
						<view class="businessOrder-list">
							<view class="businessOrder-list-label">{{(detailsList.record || {}).type == 1 ? '收款' : '付款'}}人</view>
							<view class="businessOrder-list-title">{{ (detailsList.zfb || {}).name }}</view>
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
							<view class="businessOrder-list-label">支付宝{{ (detailsList.record || {}).type == 1 ? '收款' : '付款' }}码</view>
							<view class="businessOrder-list-title">
								<text>点击查看缩小的二维码扫码支付</text>
								<image src="../../static/business/icon-business-code.png" mode="widthFix" class="businessOrder-list-title-img"
								@click="getIcon((detailsList.zfb || {}).pic)"></image>
							</view>
						</view>
					</view>
					<view class="v-block" v-if="selectPaymentCurrency == 3 && (detailsList.order).wx == 1">
						<view class="businessOrder-list">
							<view class="businessOrder-list-label">{{(detailsList.record || {}).type == 1 ? '收款' : '付款'}}人</view>
							<view class="businessOrder-list-title">{{ (detailsList.wx || {}).name }}</view>
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
							<view class="businessOrder-list-label">微信{{ (detailsList.record || {}).type == 1 ? '收款' : '付款' }}码</view>
							<view class="businessOrder-list-title">
								<text>点击查看缩小的二维码扫码支付</text>
								<image src="../../static/business/icon-business-code.png" mode="widthFix" class="businessOrder-list-title-img"
								@click="getIcon((detailsList.wx || {}).pic)"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="mt"></view>
			
			<!-- 备注 -->
			<view class="formBox" v-if="pageStatus == 4 && !isBuyer || pageStatus == 5 && !isBuyer || pageStatus == 6 && !isBuyer || pageStatus == 7 && !isBuyer">
				<view class="formBox-input">
					<view class="formBox-input-label">备注</view>
					<textarea :value="detailsList.logs[0].remark" disabled/>
				</view>
			</view>
			<!-- 申诉原因 -->
			<view class="businessOrder-list" v-if="pageStatus == 5 || pageStatus == 6 || pageStatus == 7">
				<view class="businessOrder-list-label">申诉原因</view>
				<view class="businessOrder-list-title chioce">{{ detailsList.record.appealContent}}</view>
			</view>
			
			<view class="businessOrder-bottom">
				<view class="businessOrder-bottom-box" v-if="pageStatus == 0 || pageStatus == 1 || pageStatus == 2 || pageStatus == 4">
					<!-- 卖家取消接单 -->
					<view class="businessOrder-bottom-btn" @click="closeOrder()" v-if="pageStatus == 0 || (pageStatus == 1  && isBuyer)">取消订单</view>
					
					<!-- 买家支付-->
					<view class="businessOrder-bottom-choice" @click="showPopup('securityPopup')" v-if="pageStatus == 1 && isBuyer">已支付</view>
					<!-- 卖家审核-->
					
					<!-- 卖家确认接单 -->
					<view class="businessOrder-bottom-choice" @click="enterOrder()" v-if="pageStatus == 0 && isPublishUser">确认接单</view>
					
					<view class="businessOrder-bottom-choice" @click="gatherOrder()" v-if="pageStatus == 2 && !isBuyer">立即放币</view>
					<view class="businessOrder-bottom-apply" @click="showPopup('appealPopup')" v-if="pageStatus == 2 && !isBuyer">立即申诉</view>
					
				</view>
				<view class="businessOrder-bottom-anniu" @click="showPopup('appealPopup')" v-if="pageStatus == 2 && isBuyer">立即申诉</view>
				<view class="businessOrder-bottom-cancel" @click="closeOrder()" v-if="pageStatus == 1 && !isBuyer">取消订单</view>
				
			</view>
		</view>
		
		<!-- 二维码图片 -->
		<uni-popup ref="iconPopup" type="center" :animation="true" @change="changePopup">
			<view class="oppupBoxicon">
				<view class="oppupBoxicon-close" @click="hidePopup('iconPopup')">
				</view>
				<view class="oppupBoxicon-image">
					<image :src="src" mode="widthFix"></image>
				</view>
			</view>
		</uni-popup>
		<!-- 安全验证 -->
		<uni-popup ref="securityPopup" type="bottom" :animation="true" @change="changePopup">
			<view class="oppupBox">
				<view class="header_bar">
					<view class="header">
						<view class="header-title">安全验证</view>
						<view class="header-right" @click="hidePopup('securityPopup')">
							<image src="../../static/public/icon-close.png" mode="widthFix"></image>
						</view> 
					</view> 
				</view>
				<view class="oppupBox-form">
					<view class="oppupBox-form-label">钱包密码</view>
					<input type="password" placeholder="请输入您的钱包密码" v-model="password"/>
				</view>
				<view class="oppupBox-forget">确认付款后将不可撤回，请谨慎操作！</view>
				<view class="initBtn" @click="payOrder()">确定</view>
			</view>
		</uni-popup>
		<!-- 申诉 -->
		<uni-popup ref="appealPopup" type="bottom" :animation="true" @change="changePopup">
			<view class="oppupBox">
				<view class="header_bar">
					<view class="header">
						<view class="header-title">申诉原因</view>
						<view class="header-right" @click="hidePopup('appealPopup')">
							<image src="../../static/public/icon-close.png" mode="widthFix"></image>
						</view> 
					</view> 
				</view>
				<view class="oppupBox-form">
					<view class="oppupBox-form-label">申诉内容</view>
					<input placeholder="请输入申诉内容" v-model="content"/>
					<!-- <picker @change="bindPickerAppeal" :value="appeaIndex" :range="appealList" range-key="name" class="oppupBox-form-picker">
						<view>{{appealList[appeaIndex].name}}</view>
					</picker> -->
				</view>
				<view class="oppupBox-forget">提起申诉后资产将会冻结,官方将介入本次交易，直至申诉结算恶意申诉将冻结账号。</view>
				<view class="initBtn" @click="confirmContent()">立即申诉</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status: 0,
				statusList: ['待接单', '待支付', '待收款', '已完成', '已取消', '申诉中', '申诉成功', '申诉失败'],
				// 0待接单 1待支付 2待收款 3完成 4取消 5申诉 6申诉成功 7申诉失败
				// array: [{name:'银行卡支付'},{name:'支付宝支付'},{name:'微信支付'}],
				paymentList: [],
				payTypeStr:'',
				index: 0,
				selectType:0,
				appealList: [{name:'请选择申诉原因'},{name:'对方未打款'},{name:'请求超时'}],
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
				detailsList: {
					// record:{memo:'5485415JHGV000000OOHB',name:'阿占比',money:'10.12615',quantity:'0.6',price:'5',createTime:'2017-01-12 12:10',type:'1',
					// },
					// yhk:{name:'阿占比',no:'6542 2222 2222 2222 552'},
					// zfb:{name:'支付宝',no:'17345652365',pic:'../../static/business/icon-business-img.png'},
					// wx:{name:'支付宝',no:'17345652365',pic:'../../static/business/icon-business-01.png'},
				},
				selectPayment: '',
				selectPaymentCurrency: 0,
				src:'',
				name:'',
				sellInfo:[],
				currencyName:'',
				content:'',
			}
		},
		onLoad(hash) {
			this.recordId = hash.value1;
		},
		onHide() {
			clearInterval(this.endTimer);
		},
		onShow() {
			this.userId = uni.getStorageSync('userId');
			this.init();
			this.countDownTime();
		},
		methods: {
			init() {
				this.getOrderDetails();
			},
			getIcon(src) {this.src = src;this.showPopup('iconPopup');},
			clearBack() {
				clearInterval(this.endTimer);
				this.$tools.back();
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
						// console.log('订单信息：'+JSON.stringify(res));
						if (res.code == 0) {
							this.detailsList = res.obj;
							// let buyUserId = this.detailsList.record.buyUserId;
							console.log(this.userId + '-----' + this.detailsList.record.buyUserId);
							this.isBuyer = this.userId == this.detailsList.record.buyUserId;
							// this.isBuyer = this.detailsList.record.typeShow == 0;
							this.pageStatus = this.detailsList.record.status;
							console.log("this.isBuyer",this.isBuyer);
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
							// this.isBuyer = res.obj.record.buyUserId == this.userId;
							// this.isPublishUserID = res.obj.record.type == 1 ? res.obj.record.buyUserId : res.obj.record.sellUserId;
							this.isPublishUser = res.obj.order.userId == this.userId;
							if (res.obj.yhk) {
								console.log('进入');
								var data = res.obj.yhk;
								data.payTypeStr = '银联';
								if(res.obj.order.yhk == 1){
									this.paymentList.push(data);
								}
							}
							if (res.obj.zfb) {
								var data = res.obj.zfb;
								data.payTypeStr = '支付宝';
								if(res.obj.order.zfb == 1){
									this.paymentList.push(data);
								}	
							}
							if (res.obj.wx) {
								var data = res.obj.wx;
								data.payTypeStr = '微信';
								if(res.obj.order.wx == 1){
									this.paymentList.push(data);
								}
							}
							this.selectPayment = this.paymentList[0].payTypeStr;
							this.selectPaymentCurrency = this.paymentList[0].payType;
							console.log(this.paymentList);
							console.log('是否发布者: ' + this.isPublishUser + ' -- 是否买家: ' + this.isBuyer + ' -- 当前页面状态: ' + this.pageStatus);
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
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.detail.value)
				this.selectPayment = this.paymentList[e.detail.value].payTypeStr;
				this.selectPaymentCurrency = this.paymentList[e.detail.value].payType;
				// this.selectType = this.index
			},
			// 已经支付
			payOrder() {
				if(this.password == ''){
					return this.$tools.toast("请输入您的钱包密码");
				}
				this.$Ajax(
					'/front/otc/pay',
					{
						payment: this.selectPayment,
						recordId: this.recordId,
					},
					res => {
						console.log(JSON.stringify(res));
						if (res.code == 0) {
							this.$tools.toast('请等待卖家审核收款');
							this.getOrderDetails();
							this.hidePopup('securityPopup');
						}
					}
				);
			},
			// 确认接单
			enterOrder() {
				this.$Ajax(
					'/front/otc/take',
					{
						recordId: this.recordId
					},
					res => {
						console.log(JSON.stringify(res));
						if (res.code == 0) {
							this.$tools.toast('确认成功');
							this.getOrderDetails();
						}
					}
				);
			},
			// 取消
			closeOrder() {
				this.$Ajax(
					'/front/otc/cancelRecord',
					{
						recordId: this.recordId
					},
					res => {
						console.log(JSON.stringify(res));
						if (res.code == 0) {
							this.$tools.toast('取消成功');
							this.getOrderDetails();
						}
					}
				);
			},
			// bindPickerAppeal: function(e) {
			// 	console.log('picker发送选择改变，携带值为：' + e.detail.value)
				
			// 	this.appeaIndex = e.detail.value
			// 	this.appeaSelectType = this.appeaIndex
			// },
			confirmContent() {
				console.log(this.appeaSelectType);
				if (this.content == '') {
					return this.$tools.toast('请输入您的申诉理由');
				}
				this.$Ajax(
					'/front/otc/appeal',
					{
						recordId: this.recordId,
						content: this.content,
					},
					res => {
						console.log(JSON.stringify(res));
						if (res.code == 0) {
							this.content = '';
							this.$tools.toastBack('提交成功',1);
							this.hidePopup('appealPopup');
							// this.$tools.toast(res.obj);
						}
					}
				);
			},
			countDownTime() {
				let that = this;
				this.endTimer = setInterval(function() {
					console.log('1');
					that.endTime = that.endTime - 1;
			
					var minute = Number(((that.endTime / 60) % 60).toFixed(0));
					var second = that.endTime % 60;
					if (minute <= 0) {
						that.endTimeStr = second + '秒';
					} else {
						that.endTimeStr = minute + '分' + second + '秒';
					}
			
					if (that.endTime < 0) {
						console.log('2');
						clearInterval(that.endTimer);
						that.getOrderDetails();
					}
				}, 1000);
			},
			// 联系对方
			callPhoneFunc(phone) {
				uni.makePhoneCall({
					phoneNumber: phone //仅为示例
				});
			},
			/* 弹出框公用 */
			changePopup(e) {
				console.log('popup ' + e.type + ' 状态', e.show);
			},
			showPopup(e) {
				this.$refs[e].open();
			},
			
			hidePopup(e) {
				this.$refs[e].close();
			},
			refresh() {
				clearInterval(this.endtimer);
				this.init();
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
