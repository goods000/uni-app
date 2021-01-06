<template>
	<view class="pages">
		<view class="user">
			<view class="header_bar">
			<view class="header">
				<view class="header-title">我的</view>
			</view> 
			</view> 
			
			<view class="user-box">
				<view class="user-top">
					<view class="user-image">
						<image src="../../static/logo.png" class="info_img" mode="widthFix">
					</view>
					<view class="user-left">
						<view class="user-title">
							<view class="user-name">{{userList.username}}</view>
							<view id="grade">
								<view class="u">{{userList.userLevel}}</view>
							</view>
						</view>	
						<view class="num">UID:{{userList.userId}}</view>
					</view>
				</view>
			</view>
			 
		</view>
		
		<view class="tips_view">
			<view class="tips-txt">常用功能</view>
		</view>
		<view class="user-list mb user-b">
			<view class="user-list-type" @click="$tools.jump('../pledge/pledge')">
				<view class="user-list-left">
					<image src="../../static/user/icon-user-1.png" class="user-icon">
					<view class="user-list-name">我的智能合约</view>
				</view>
				<image src="../../static/public/icon-next.png" class="next_img">
			</view>
			<view class="user-list-type" @click="$tools.jump('../invite/invite')">
				<view class="user-list-left">
					<image src="../../static/user/icon-user-invite.png" class="user-icon">
					<view class="user-list-name">邀请好友</view>
				</view>
				<image src="../../static/public/icon-next.png" class="next_img">
			</view>
			<view class="user-list-type" @click="$tools.jump('../team/team')">
				<view class="user-list-left">
					<image src="../../static/user/icon-user-team.png" class="user-icon">
					<view class="user-list-name">我的团队</view>
				</view>
				<image src="../../static/public/icon-next.png" class="next_img">
			</view>
			<view class="user-list-type" @click="$tools.jump('../help/help')">
				<view class="user-list-left">
					<image src="../../static/user/icon-user-help.png" class="user-icon">
					<view class="user-list-name">帮助中心</view>
				</view>
				<image src="../../static/public/icon-next.png" class="next_img">
			</view>
			<view class="user-list-type" @click="$tools.jump('../customer/customer')">
				<view class="user-list-left">
					<image src="../../static/user/icon-user-customer.png" class="user-icon">
					<view class="user-list-name">在线客服</view>
				</view>
				<image src="../../static/public/icon-next.png" class="next_img">
			</view>
			<view class="user-list-type" @click="$tools.jump('../setting/setting')">
				<view class="user-list-left">
					<image src="../../static/user/icon-user-setting.png" class="user-icon">
					<view class="user-list-name">安全中心</view>
				</view>
				<image src="../../static/public/icon-next.png" class="next_img">
			</view>
			
			
		</view>
		
	</view>
</template>

<script>
	import QR from '../../components/qrcode/qrcode.js';
	import uniList from '../../components/uni-list/uni-list.vue';
	export default {
		components: { uniList },
		data() {
			return {
				userList:[]
			}
		},
		onLoad(){
			//从上个页面获取的值
		},
		onShow() {
			this.getUserList()
		},
		methods: {
			// 获取用户信息
			getUserList() {
				this.$Ajax('/user/info', {}, res => {
						if (res.code == 0) {
							this.userList = res.user
						}
					}
				);
			},
		}
	}
</script>


<style>
	@import '@/common/css/style.css';
	.header{background: none !important;}
</style>
