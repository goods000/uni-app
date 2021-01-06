<template>
	<view class="pages">
		<view class="team">
			<view class="header_bar header_fixed">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">我的团队</view>
				</view> 
			</view>	
			
			<view class="team-box">
				<view class="team-top">
					<view class="team-level">我的等级：K{{userList.nodeLevel}}</view>
					<view class="team-data-box">
						<view class="team-data-info">
							<view class="team-data-num">{{pushNum}}</view>
							<view class="team-data-item">直推人数</view>
						</view>
						<view class="team-data-info">
							<view class="team-data-num">{{groupNum}}</view>
							<view class="team-data-item">团队总人数</view>
						</view>
						<view class="team-data-info">
							<view class="team-data-num">{{childAssets}}</view>
							<view class="team-data-item">团队总算力</view>
						</view>
					</view>
				</view>
			</view>
			
				
				
				<view class="tips_view">
					<view class="tips_view_image">
						<image src="../../static/team/icon-team-01.png" mode="widthFix"></image>
					</view>
					<view class="tips-txt">我的直推</view>
				</view>
				
				<view class="team-list">
					<view class="initNoData" v-if="teamList.length == 0">暂无数据</view>
					<view class="team-top-list" v-for="(item,index) in teamList" :key="index">
						<view class="team-top">
							<view class="team-top-title">用户名</view>
							<view class="team-top-title">等级</view>
							<view class="team-top-title">算力</view>
						</view>
						<view class="team-bottom">
							<view class="team-top-value">{{item.username}}</view>
							<view class="team-top-value">K{{item.nodeLevel}}</view>
							<view class="team-top-value">{{item.leftAssets}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				childAssets: '',
				pushNum: '',
				groupNum: '',
				teamList: [],
				userList:[]
			}
		},
		onShow() {
			this.getUserList();
			this.getTeamList();
		},
		methods:{
			// 获取用户信息
			getUserList() {
				this.$Ajax('/user/info', {}, res => {
						if (res.code == 0) {
							this.userList = res.user
						}
					}
				);
			},
			// 获取团队列表
			getTeamList() {
				this.$Ajax('/user/pushList', {}, res => {
						if (res.code == 0) {
							this.childAssets = res.childAssets;
							this.pushNum = res.pushNum;
							this.groupNum = res.groupNum;
							this.teamList = res.list;
						}
					}
				);
			}
		}
	}
</script>

<style>
	@import '@/common/css/style.css';
	page{background: #FFFFFF;}
	.header{background: none !important;}
</style>
