<template>
	<view class="pages">
		<view class="user">
			<view class="header_bar header_bg header_fixed">
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
								<view class="u">K{{userList.nodeLevel}}</view>
							</view>
						</view>	
						<view class="num">UID:{{userList.userId}}</view>
						<view class="user-cpye-image">
							<image src="../../static/user/icon-user-copy.png" mode="widthFix" @click="$tools.copy(userList.userId)"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="user-data">
			<view class="user-data-box">
				<view class="user-data-box-list">
					<view class="user-data-box-list-info">{{accountList.quietTotal*1 + accountList.dynamicTotal*1}}</view>
					<view class="user-data-box-list-txt">我的总收益</view>
				</view>
				<view class="user-data-box-list">
					<view class="user-data-box-list-info">{{accountList.quietToday*1 + accountList.dynamicToday*1}}</view>
					<view class="user-data-box-list-txt">今日收益</view>
				</view>
			</view>	
		</view>
		
		<view class="user-list mb user-b user">
			<view class="user-list-type" @click="$tools.jump('../collection/collection')">
				<view class="user-list-left">
					<image src="../../static/user/icon-user-1.png" class="user-icon">
					<view class="user-list-name">我的云算力</view>
				</view>
				<image src="../../static/public/icon-next.png" class="next_img">
			</view>
			<view class="user-list-type" @click="$tools.jump('../record/record')">
				<view class="user-list-left">
					<image src="../../static/user/icon-user-2.png" class="user-icon">
					<view class="user-list-name">收益记录</view>
				</view>
				<image src="../../static/public/icon-next.png" class="next_img">
			</view>
			<view class="user-list-type" @click="$tools.jump('../customer/customer')">
				<view class="user-list-left">
					<image src="../../static/user/icon-user-3.png" class="user-icon">
					<view class="user-list-name">在线客服</view>
				</view>
				<image src="../../static/public/icon-next.png" class="next_img">
			</view>
			<view class="user-list-type" @click="$tools.jump('../setting/setting')">
				<view class="user-list-left">
					<image src="../../static/user/icon-user-4.png" class="user-icon">
					<view class="user-list-name">安全中心</view>
				</view>
				<image src="../../static/public/icon-next.png" class="next_img">
			</view>
			<view class="user-list-type" @click="$tools.jump('../about/about')">
				<view class="user-list-left">
					<image src="../../static/user/icon-user-5.png" class="user-icon">
					<view class="user-list-name">关于我们</view>
				</view>
				<image src="../../static/public/icon-next.png" class="next_img">
			</view>
			
		</view>
		
		<!-- <uni-list>
			<uni-list-item title="我的质押" showArrow thumb="../../static/user/icon-user-1.png" thumb-size="sm" />
			<uni-list-item title="我的质押" note="列表描述信息" showArrow thumb="../../static/user/icon-user-1.png" thumb-size="base"/>
			<uni-list-item title="我的质押" showArrow thumb="../../static/user/icon-user-1.png" thumb-size="lg"/>
			<uni-list-item :show-extra-icon="true" showArrow :extra-icon="extraIcon" title="列表左侧带扩展图标" />
		</uni-list> -->
		
	</view>
</template>

<script>
	import QR from '../../components/qrcode/qrcode.js';
	import uniList from '../../components/uni-list/uni-list.vue';
	export default {
		components: { uniList },
		data() {
			return {
				userList:[],
				accountList:[],
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
							this.accountList = res.account
						}
					}
				);
			},
		}
	}
</script>


<style>
	@import '@/common/css/style.css';
</style>
