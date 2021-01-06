<template>
	<view class="pages">
		<view class="team">
			<view class="header_bar">
				<view class="team-box">
					<view class="team-top">
						<view class="header">
							<view class="header-back" @click="$tools.back(1)"></view>
							<view class="header-title">我的团队</view>
						</view> 
						
						<view class="team-title">团队业绩</view>
						<view class="team-num">{{childAssets}}</view>
						
						<view class="team-data-box">
							<view class="team-data-info">
								<view class="team-data-num">{{pushNum}}人</view>
								<view class="team-data-item">直推人数</view>
							</view>
							<view class="team-data-info">
								<view class="team-data-num">{{groupNum}}人</view>
								<view class="team-data-item">团队人数</view>
							</view>
						</view>
					</view>
				</view>
			</view>
				
				
				<view class="tips_view">
					<view class="tips-txt">我的直推</view>
				</view>
				
				<view class="team-list">
					<view class="initNoData" v-if="teamList.length == 0">暂无数据</view>
					<view class="user-box" v-for="(item, key) in teamList" :key="key">
						<view class="user-top">
							<view class="user-image">
								<image src="../../static/logo.png" class="info_img" mode="widthFix">
							</view>
							<view class="user-left">
								<view class="user-title">
									<view class="user-name">{{item.username}}</view>
									<view class="grade">
										<view class="u">{{item.userLevel}}</view>
									</view>
								</view>	
								<view class="num">{{item.userId}}</view>
							</view>
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
			}
		},
		onShow() {
			this.getTeamList();
		},
		methods:{
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
