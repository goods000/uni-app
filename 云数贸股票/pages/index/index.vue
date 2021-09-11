<template>
	<view class="pages">
		<view class="index">
			<view class="indexTop">
				<view class="indexTop-header">
					<view class="indexTop-header-left">
						<image src="../../static/index/icon-index-logo.png" mode="widthFix" class="indexTop-header-left__image"></image>
						<view class="indexTop-header-left__account">{{ userList.phone }}</view>
					</view>
					<view class="indexTop-header-right" @click="showDrawer('showLeft')">
						<image src="../../static/index/icon-index-setup.png" mode="widthFix" class="indexTop-header-right__image"></image>
					</view>
				</view>
				<view class="indexTop-title">股票总价值：</view>
				<view class="indexTop-wrapper">
					<view class="indexTop-wrapper-left">
						<view class="indexTop-wrapper-left__num">{{ (SharesPrice * assetList.balance) | number(2) }}<text>CNY</text></view>
						<view class="indexTop-wrapper-left__txt">股数: {{ assetList.balance }}</view>
					</view>
					<view class="indexTop-wrapper-right" @click="$tools.jump('../wallet/wallet',SharesPrice,SharesUp.zhang,SharesUp.percentage)">
						<image src="../../static/index/icon-index-next.png" mode="widthFix" class="indexTop-wrapper-right__image"></image>
					</view>
				</view>
				<view class="indexTop-titleBox">
					<view class="indexTop-titleBox-info">·上月涨幅: {{ SharesUp.zhang }}/股</view>
					<view class="indexTop-titleBox-info">· 涨幅率: {{ SharesUp.percentage }}%</view>
				</view>
			</view>
			
			<view class="contentBox">
				<view class="contentBox-wrapper">
					<view class="contentBox-wrapper-image">
						<image src="../../static/index/icon-index-title.png" mode="widthFix"></image>
					</view>
					<view class="contentBox-wrapper-title">把握财富机会，成就明日之星</view>
					<view class="contentBox-wrapper-txt">Seize the opportunity of wealth and become the star of tomorrow</view>
				</view>
				<view class="contentBox-ringBox">
					<echart :SharesFales="SharesFales" ></echart>
				</view>
			</view>
			
			<view class="titleBox">
				<view class="titleBox-title">项目介绍：</view>
				<view class="titleBox-title">
				2021最新重点项目！大家都知道原始股的价值非常乐观的，想买都买不到，2021特此放出
				<!-- {{SharesFales.shares_total > 10000 ? ((SharesFales.shares_total/10000).toFixed(0))+ '万' : SharesFales.shares_total}} -->
				<!-- {{SharesFales.shares_total}} -->
				{{shares_total}}
				股云数原始股给大家，每股{{ SharesPrice }}，多买多得，股权每月分红增长{{ SharesUp.percentage }}%，售完即止。
				</view>
			</view>
			
			<view class="contentTitle">
				<view class="contentTitle-txt">原始股单价：</view>
				<view class="contentTitle-num">{{ SharesPrice }}CNY/股</view>
			</view>
			
			<view class="contentInput">
				<view class="contentInput-txt">认购数量</view>
				<view class="contentInput-wrapper">
					<input type="text" placeholder="请输入您认购的数量..." placeholder-class="inputColor" v-model="num"
					class="contentInput-wrapper-input"/>
					<view class="contentInput-wrapper-btn" @click="config()">提交订单</view>
				</view>
			</view>
			
			<view class="contentCode">
				<view class="contentCode-title">扫码加群</view>
				<view class="contentCode-image">
					<image v-if="img != ''" :src="img" mode="widthFix"></image>
				</view>
			</view>
			
			<!-- 左侧栏 -->
			<uni-drawer ref="showLeft" mode="left" :width="drawerWidth" @change="change($event,'showLeft')">
				<view class="indexBox-drawer">
					<view class="indexBox-drawer-header">Hi {{ userList.phone }}</view>
					<view class="indexBox-drawer-userList">
						<view class="indexBox-drawer-userList__item" @click="$tools.jump('../user/user',(SharesPrice * assetList.balance),assetList.balance)">
							<view class="indexBox-drawer-userList__item--left">
								<image src="../../static/user/icon-user-04.png" mode="widthFix"></image>
								<view class="indexBox-drawer-userList__item--left_txt">个人中心</view>
							</view>
							<view class="indexBox-drawer-userList__item--right">
								<image src="../../static/user/icon-user-next.png" mode="widthFix"></image>
							</view>
						</view>
						<view class="indexBox-drawer-userList__item" @click="$tools.jump('../order/order')">
							<view class="indexBox-drawer-userList__item--left">
								<image src="../../static/user/icon-user-01.png" mode="widthFix"></image>
								<view class="indexBox-drawer-userList__item--left_txt">我的订单</view>
							</view>
							<view class="indexBox-drawer-userList__item--right">
								<image src="../../static/user/icon-user-next.png" mode="widthFix"></image>
							</view>
						</view>
						<view class="indexBox-drawer-userList__item" @click="$tools.jump('../wallet/wallet',SharesPrice,SharesUp.zhang,SharesUp.percentage)">
							<view class="indexBox-drawer-userList__item--left">
								<image src="../../static/user/icon-user-02.png" mode="widthFix"></image>
								<view class="indexBox-drawer-userList__item--left_txt">我的钱包</view>
							</view>
							<view class="indexBox-drawer-userList__item--right">
								<image src="../../static/user/icon-user-next.png" mode="widthFix"></image>
							</view>
						</view>
						<view class="indexBox-drawer-userList__item" @click="$tools.jump('../safety/safety')">
							<view class="indexBox-drawer-userList__item--left">
								<image src="../../static/user/icon-user-03.png" mode="widthFix"></image>
								<view class="indexBox-drawer-userList__item--left_txt">安全中心</view>
							</view>
							<view class="indexBox-drawer-userList__item--right">
								<image src="../../static/user/icon-user-next.png" mode="widthFix"></image>
							</view>
						</view>
						<!-- <view class="indexBox-drawer-userList__item" @click="$tools.jump('../invite/invite')">
							<view class="indexBox-drawer-userList__item--left">
								<image src="../../static/user/icon-user-04.png" mode="widthFix"></image>
								<view class="indexBox-drawer-userList__item--left_txt">邀请好友</view>
							</view>
							<view class="indexBox-drawer-userList__item--right">
								<image src="../../static/user/icon-user-next.png" mode="widthFix"></image>
							</view>
						</view> -->
						<!-- <view class="indexBox-drawer-userList__item" @click="$tools.jump('../service/service')">
							<view class="indexBox-drawer-userList__item--left">
								<image src="../../static/user/icon-user-05.png" mode="widthFix"></image>
								<view class="indexBox-drawer-userList__item--left_txt">在线客服</view>
							</view>
							<view class="indexBox-drawer-userList__item--right">
								<image src="../../static/user/icon-user-next.png" mode="widthFix"></image>
							</view>
						</view> -->
						<view class="indexBox-drawer-userList__item" @click="logout()">
							<view class="indexBox-drawer-userList__item--left">
								<image src="../../static/user/icon-user-06.png" mode="widthFix"></image>
								<view class="indexBox-drawer-userList__item--left_txt">退出登录</view>
							</view>
							<view class="indexBox-drawer-userList__item--right">
								<image src="../../static/user/icon-user-next.png" mode="widthFix"></image>
							</view>
						</view>
						
					</view>
				</view>
			</uni-drawer>
			
		</view>
		
		<!-- 公告框 -->
		<uni-popup ref="noticePopup" type="center" :animation="true" @change="changePopup($event,'noticePopup')">
			<view class="oppupBox-popup" >
				<view class="oppupBox">
					<view class="oppupBox-header">
						<image src="../../static/index/icon-index-noticeBg.png" mode=""></image>
					</view>
					<scroll-view :scroll-y="true" :show-scrollbar="false" :scroll-into-view="scrollInto" class="oppupBox-height">
						<view class="oppupBox-title" v-html="noticeList"></view>
					</scroll-view>	
				</view>
				<view class="oppupBox-btn">
					<image src="../../static/index/icon-index-close.png" mode="" @click="hidePopup('noticePopup')"></image>
				</view>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	import echart from '../echart/echart.vue';
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue';
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			echart, uniDrawer, uniPopup
		},
		data(){
			return{
				userList: [],
				num:'',
				drawerWidth: uni.upx2px(600),
				SharesPrice:'',
				SharesFales:{},
				SharesUp:{},
				img:'',
				assetList:{},
				noticeList:'',
				scrollInto: "",
				shares_total:'',
			}
		},
		onShow() {
			uni.showTabBar();
			this.init();
			let statusPopup = uni.getStorageSync('statusPopup');
			console.log("statusPopup:",statusPopup);
			if (statusPopup != 1) {
				uni.setStorageSync('statusPopup', 1);
				this.$nextTick(() => {
					this.openPopup('noticePopup');
				})
			}
		},	
		watch:{
			shares_total(){
				if(this.shares_total >= 10000 && this.shares_total <= 10000000){
					this.shares_total = ((this.shares_total/10000).toFixed(0))+ '万';
					// console.log("this.shares_total_1：",this.shares_total);
				}else if(this.shares_total > 10000000){
					this.shares_total = ((this.shares_total/100000000).toFixed(0))+ '亿';
					// console.log("this.shares_total_2：",this.shares_total);
				}else{
					this.shares_total = this.shares_total;
					// console.log("this.shares_total_3：",this.shares_total);
				}
			}
		},
		methods: {
			init(){
				this.getUserList();
				this.getQrcode();
				this.getSharesPrice();
				this.getSharesFales();
				this.getSharesUp();
				this.getAssetsInfo();
				this.getNoticeTitle();
			},
			// 获取公告
			getNoticeTitle() {
				this.$Ajax('/search/getContentInfo', {
					id:1
				}, res => {
					if (res.code == 0) {
						this.noticeList = res.obj.content.content;
					}
				});
			},
			// 获取用户信息
			getUserList() {
				this.$Ajax('/front/user/baseInfo', {}, res => {
					if (res.code == 0) {
						this.userList = res.obj;
						if(this.userList.phone != null){
							this.userList.phone = this.userList.phone.substring(0,3) + "****" + this.userList.phone.substring(7);
							// console.log(this.userList.phone)
						}
					}
				});
			},
			// 资产
			getAssetsInfo() {
				this.$Ajax('/front/mine/getAssetsInfo', {}, res => {
					if (res.code == 0) {
						this.assetList = res.obj;
					}
				});
			},
			// 获取股票价格
			getSharesPrice() {
				this.$Ajax('/front/mine/getSharesPrice', {}, res => {
					if (res.code == 0) {
						this.SharesPrice = res.obj;
					}
				});
			},
			// 获取股票价格
			getSharesUp() {
				this.$Ajax('/front/mine/getSharesUp', {}, res => {
					if (res.code == 0) {
						this.SharesUp = res.obj;
					}
				});
			},
			// 获取虚拟股数
			getSharesFales() {
				this.$Ajax('/front/mine/getSharesFales', {}, res => {
					if (res.code == 0) {
						this.SharesFales = res.obj;
						this.shares_total = res.obj.shares_total;
						console.log("股数：",this.shares_total);
					}
				});
			},
			// 获取群二维码
			getQrcode() {
				this.$Ajax('/front/mine/getWechatGroup', {}, res => {
					if (res.code == 0) {
						this.img = res.obj;
					}
				});
			},
			config(){
				if (this.num == '') {
					return this.$tools.toast('请输入您认购的数量');
				}
				if (!/^[1-9]\d*$/.test(this.num)) {
					return this.$tools.toast('请输入正整数');
				}
				this.$Ajax('/front/mine/orderSubmit',{
						amount: this.num,
					},
					res => {
						console.log(JSON.stringify(res.data));
						if (res.code == 0) {
							this.num = '';
							this.$tools.toastJump(res.msg,'../order/indexDetails',res.obj);
						}
					}
				);
			},
			// 退出登录
			logout() {
				this.closeDrawer('showLeft');
				uni.removeStorageSync('statusPopup');
				let that = this;
				this.$Ajax('/front/logout', {}, res => {
					uni.removeStorage({
						key: 'token',
						success() {
							that.$tools.toastJump('安全退出成功', '../operate/login');
						}
					});
				});
			},
			/* 弹出框公用 */
			openPopup(e) {
				this.$refs[e].open();
				uni.hideTabBar();
			},
			hidePopup(e) {
				this.$refs[e].close();
				uni.showTabBar();
			},
			changePopup(e) {
				console.log('popup ' + e.type + ' 状态', e.show);
				if (e.show) {
					uni.hideTabBar();
				} else {
					uni.showTabBar();
				}
			},
			// 打开窗口
			showDrawer(e) {
				let that = this;
				that.$refs.showLeft.open()
			},
			// 关闭窗口
			closeDrawer(e) {
				let that = this;
				that.$refs.showLeft.close()
			},
			// 抽屉状态发生变化触发
			change(e, type) {
				console.log((type === 'showLeft' ? '左窗口' : '右窗口') + (e ? '打开' : '关闭'));
				let that = this;
				that[type] = e
				if (e) {
					uni.hideTabBar();
				} else {
					uni.showTabBar();
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/index/index';
</style>
