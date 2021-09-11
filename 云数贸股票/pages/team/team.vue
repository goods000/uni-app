<template>
	<view class="pages">
		<view class="team">
			<view class="team-Bg"></view>
			<view class="header_bar">
				<view class="header">
					<view class="header-title-white"></view>
				</view> 
			</view> 
			
			<view class="teamBox">
				<view class="teamBox-top">
					<view class="teamBox-top-txt">推荐奖余额(CNY)</view>
					<view class="teamBox-top-count">{{ assetList.consume | number(2) }}</view>
				</view>
				<view class="teamBox-bottom">
					<view class="teamBox-bottom-item">
						<view class="teamBox-bottom-item__num">{{ today }}</view>
						<view class="teamBox-bottom-item__title">今日收益</view>
					</view>
					<view class="teamBox-bottom-line"></view>
					<view class="teamBox-bottom-item">
						<view class="teamBox-bottom-item__num">{{ teamList.teamSize }}</view>
						<view class="teamBox-bottom-item__title">团队总人数</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="inviteBox">
			<image src="../../static/invite/icon-invite-title.png" mode="widthFix" class="inviteBox-image"></image>
			<view class="inviteBox-item">
				<view class="inviteBox-item-qrcode">
					<image v-if="img != ''" :src="img" mode="" class="inviteBox-item-qrcode-code"></image>
					<image src="../../static/pack/Icon-1024.png" mode="widthFix" class="inviteBox-item-qrcode-logo"></image>
				</view>
				<view class="inviteBox-item-coin">邀请码</view>
				<view class="inviteBox-item-code"> {{ code }} </view>
				<view class="inviteBox-item-btn" @click="$tools.copy(code)">复制</view>
			</view>
		</view>
		
		<!-- <view class="tipsBox">
			<view class="tipsBox-title">
				<view class="tipsBox-title__label">财务明细</view>
			</view>
		</view>
		
		<view class="teamList">
			<view class="teamList-header">
				<view class="teamList-header-txt">头像/手机号</view>
				<view class="teamList-header-txt">注册时间</view>
			</view>
			<view class="teamList-wrapper">
				<view class="initNoData" v-if="subList1.length == 0">暂无数据</view>
				<scroll-view scroll-y="true" class="teamList-wrapper-height" @scrolltolower="newsList" v-else>
					<view class="teamList-wrapper-item" v-for="(item,index) in subList1" :key="index">
						<view class="teamList-wrapper-item__left">
							<image src="../../static/team/icon-team-logo.png" mode="widthFix"></image>
							<view class="teamList-wrapper-item__left-account">{{ item.phone }}</view>
						</view>
						<view class="teamList-wrapper-item__time">{{ item.create_time.slice(0,19) }}</view>
					</view>
				</scroll-view>
			</view>
		</view> -->
		
	</view>
	
</template>

<script>
	import QR from '../../components/qrcode/qrcode.js';
	
	export default {
		data(){
			return{
				teamList: [],
				// 页数
				pageSize: 3,
				pageNum: 1,
				pages: 0,
				assetList:{},
				today:'',
				subList1:[],
				code:'',
				size: 100,
				img: '',
				userList:[],
			}
		},
		onShow() {
			this.init();
		},
		methods: {
			init(){
				this.getAssetsInfo();
				this.getUserList();
				this.getRevenueStatistics();
				this.myTeamList();
			},
			// 资产
			getAssetsInfo() {
				this.$Ajax('/front/mine/getAssetsInfo', {}, res => {
					if (res.code == 0) {
						this.assetList = res.obj;
					}
				});
			},
			// 团队人数
			getRevenueStatistics() {
				this.$Ajax('/front/mine/getRevenueStatistics', {}, res => {
					if (res.code == 0) {
						this.today = res.obj.today;
					}
				});
			},
			// 获取用户信息
			getUserList() {
				this.$Ajax('/front/user/shareAddress', {}, res => {
						console.log(JSON.stringify(res));
						if (res.code == 0) {
							this.address = res.obj.address;
							console.log(this.address)
							this.code = this.address.split('?uid=')[1];
							this.img = this.creatQrcode(this.address);
						}
					}
				);
			},
			creatQrcode(url) {
				if (url == '') {
					return false;
				}
				let img = QR.createQrCodeImg(url);
				return img;
			},
			// 获取信息
			myTeamList() {
				this.$Ajax('/front/user/myTeamList', {}, res => {
					if (res.code == 0) {
						this.teamList = res.obj;
						// this.subList1 = res.obj.subList1;
					}
				});
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/team/team';
	page,.pages{
		background: #EDEDF2;
		/* #ifdef H5 */
		height: 100%;
		/* #endif */
		/* #ifdef APP-PLUS */
		height: 100vh;
		/* #endif */
		
	}
</style>
