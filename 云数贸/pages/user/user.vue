<template>
	<view class="pages">
		<view class="header_bar header_bg">
			<view class="header">
				<view class="header-title">我 的</view>
			</view> 
		</view> 
		
		<view class="indexBox">
			<view class="indexBox-drawer">
				<view class="indexBox-drawer-header">
					Hi {{ userList.phone }}
					<text>邀请码：{{ userList.id }}</text>
				</view>
				<view class="indexBox-drawer-userList">
					<view class="indexBox-drawer-userList__item" @click="$tools.jump('../wallet/wallet')">
						<view class="indexBox-drawer-userList__item--left">
							<image src="../../static/user/icon-user-01.png" mode="widthFix"></image>
							<view class="indexBox-drawer-userList__item--left_txt">我的钱包</view>
						</view>
						<view class="indexBox-drawer-userList__item--right">
							<image src="../../static/user/icon-user-next.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="indexBox-drawer-userList__item" @click="$tools.jump('../order/order')">
						<view class="indexBox-drawer-userList__item--left">
							<image src="../../static/user/icon-user-02.png" mode="widthFix"></image>
							<view class="indexBox-drawer-userList__item--left_txt">我的订单</view>
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
					<view class="indexBox-drawer-userList__item" @click="$tools.jump('../team/team',userList.phone,userList.id)">
						<view class="indexBox-drawer-userList__item--left">
							<image src="../../static/user/icon-user-04.png" mode="widthFix"></image>
							<view class="indexBox-drawer-userList__item--left_txt">我的团队</view>
						</view>
						<view class="indexBox-drawer-userList__item--right">
							<image src="../../static/user/icon-user-next.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="indexBox-drawer-userList__item" @click="$tools.jump('../invite/invite')">
						<view class="indexBox-drawer-userList__item--left">
							<image src="../../static/user/icon-user-05.png" mode="widthFix"></image>
							<view class="indexBox-drawer-userList__item--left_txt">邀请好友</view>
						</view>
						<view class="indexBox-drawer-userList__item--right">
							<image src="../../static/user/icon-user-next.png" mode="widthFix"></image>
						</view>
					</view> 
					<view class="indexBox-drawer-userList__item" @click="$tools.jump('../service/service')">
						<view class="indexBox-drawer-userList__item--left">
							<image src="../../static/user/icon-user-06.png" mode="widthFix"></image>
							<view class="indexBox-drawer-userList__item--left_txt">联系客服</view>
						</view> 
						<view class="indexBox-drawer-userList__item--right">
							<image src="../../static/user/icon-user-next.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="indexBox-drawer-userList__item" @click="logout()">
						<view class="indexBox-drawer-userList__item--left">
							<image src="../../static/user/icon-user-07.png" mode="widthFix"></image>
							<view class="indexBox-drawer-userList__item--left_txt">退出登录</view>
						</view>
						<view class="indexBox-drawer-userList__item--right">
							<image src="../../static/user/icon-user-next.png" mode="widthFix"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
			data(){
				return{
					userList: 
						{phone:'173****4565'},
					SharesPrice:'123',
					SharesFales:{},
					SharesUp:{
						zhang:'100',percentage:'20'
					},
					img:'',
					assetList:{},
					noticeList:'',
					scrollInto: "",
					shares_total:'',
				}
			},
			onShow() {
				this.init();
			},
			methods: {
				init(){
					this.getUserList();
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
				// 退出登录
				logout() {
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
			},
		}
	</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/user/user';
</style>
