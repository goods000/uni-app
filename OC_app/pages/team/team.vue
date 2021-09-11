<template>
	<view class="pages">
		
		<view class="team">
			<view class="header_bar header_bar--absolute">
				<view class="header">
					<view class="header-white" @click="$tools.back(1)"></view>
					<view class="header-title-white">我的团队</view>
				</view> 
			</view>
			
			<view class="teamBox">
				<view class="indexBox-drawer-header">
					<view class="indexBox-drawer-header-image">
						<image src="../../static/operate/logo.png" mode="widthFix"></image>
					</view>
					<view class="indexBox-drawer-header-news">
						<view class="indexBox-drawer-header-news__item">
							<view class="indexBox-drawer-header-news__item__name">{{userList.name}}</view>
						</view>
						<view class="indexBox-drawer-header-uid">
							<view class="indexBox-drawer-header-uid__txt">
								UID:{{userList.inviteCode}}
							</view>
							<image src="../../static/user/icon-user-coopy.png" mode="widthFix"  @click="$tools.copy(userList.inviteCode)"></image>
						</view>
						<view class="teamBox-level">
							<image src="../../static/user/icon-user-node.png" mode="widthFix"></image>
							<view class="teamBox-level-txt">生态节点{{nodeLevel}}</view>
						</view>
					</view>
				</view>
				
				<view class="teamBox-asset">
					<view class="teamBox-asset-num">{{team.allProfit}}</view>
					<view class="teamBox-asset-txt">加速生产收益(OC)</view>
					<view class="teamBox-asset-image">{{(userList.teamLevelName || '').slice(0,2)}}</view>
				</view>
				
				<view class="teamBox-list">
					<view class="teamBox-list-item">直推人数：{{team.oneVipCount}}人</view>
					<view class="teamBox-list-item">间推人数：{{team.twoVipCount}}人</view>
					<view class="teamBox-list-item">直推收益：{{team.oneProfit}}(OC)</view>
					<view class="teamBox-list-item">间推收益：{{team.twoProfit}}(OC)</view>
				</view>
			</view>
		</view>
		
		<view class="team_tabs">
			<view class="team_tabs-list">
				<view class="team_tabs-list-txt" :class="{ 'active': tabsActive == 1 }" @click="changeTabsActive(1)">我的直推</view>
				<view class="team_tabs-list-txt" :class="{ 'active': tabsActive == 2 }" @click="changeTabsActive(2)">我的间推</view>
			</view>
			<view class="teamItem">
				<view class=""v-if="tabsActive == 1" >
					<view class="initNoData" v-if="teamList == null || teamList.length == 0">暂无记录</view>
					<view class="teamItemBox"  v-for="(item,index) in teamList" :key="index" v-else>
						<view class="teamItem-box">
							<view class="teamItem-box-left">
								<view class="teamItem-box-left-image">{{(userList.teamLevelName || '').slice(0,2)}}</view>
								<view class="teamItem-box-left-news">
									<view class="teamItem-box-left-news__name">{{item.account}}</view>
									<view class="teamItem-box-left-news__node">锁仓量：<text>{{item.nodeOCSum}}</text></view>
								</view>
							</view>
							<view class="teamItem-box-right">
								<view class="teamItem-box-right__num">
									当前节点：
									<image src="../../static/user/icon-user-node.png" mode="widthFix"></image>
									<text>生态节点{{item.nodeLevel}}</text>
								</view>
								<view class="teamItem-box-right__count">
									伞下总业绩(OC/USDT)
									<text>{{(item.downHaveOC).toFixed(0)}}/{{item.downHaveOCToUSDT == null ? 0 : (item.downHaveOCToUSDT).toFixed(0)}}</text>
								</view>
							</view>
						</view>
						<view class="teamItem-bottom">
							<view class="teamItem-bottom__info">伞下有效节点人数：<text>{{item.downHaveOCNum}}人</text></view>
							<view class="teamItem-bottom__info">激活时间：{{item.time}}</view>
						</view>
					</view>
				</view>
				
				<view class="" v-if="tabsActive == 2">
					<view class="initNoData" v-if="inviteList == null || inviteList.length == 0">暂无记录</view>
					<view class="teamItemBox" v-for="(item,index) in inviteList" :key="index" v-else>
						<view class="teamItem-box">
							<view class="teamItem-box-left">
								<view class="teamItem-box-left-image">{{(userList.teamLevelName || '').slice(0,2)}}</view>
								<view class="teamItem-box-left-news">
									<view class="teamItem-box-left-news__name">{{item.account}}</view>
									<view class="teamItem-box-left-news__nodeTwo">当前节点：
										<image src="../../static/user/icon-user-node.png" mode="widthFix"></image>
										<text>生态节点{{item.nodeLevel}}</text>
									</view>
								</view>
							</view>
							<view class="teamItem-box-right">
								<view class="teamItem-box-right__num">锁仓量：<text>{{item.nodeOCSum}}</text></view>
								<view class="teamItem-box-right__time">激活时间：{{item.time}}</view>
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
				tabsActive: 1,
				pages: 1,
				pageNum: 1,
				pageSize: 15,
				pageSum: 0,
				userList:[],
				userBase:[],
				recordList:[],
				team:'',
				teamList:[],
				inviteList:[],
				nodeLevel:'',
				oneProfit: 0,
				oneVipCount: 0,
				twoProfit: 0,
				twoVipCount: 0,
			}
		},
		onShow() {
			this.init();
		},
		// onReachBottom() {
		// 	if (this.page >= this.pages) {
		// 		return this.$tools.toast('到底啦');
		// 	} else {
		// 		this.page++;
		// 		if(this.tabsActive == 1){
		// 			this.getTeamList();
		// 		}else{
		// 			this.getInviteList();
		// 		}
		// 	}
		// },
		methods: {
			init(){
				this.getTeamList();
				this.getUserList();
				this.recordList = []
			},
			changeTabsActive(index) {
				if(this.tabsActive != index){
					this.tabsActive = index;
				}
			},
			// 获取用户信息
			getUserList() {
				this.$Ajax('/front/user/baseInfo', {}, res => {
						if (res.code == 0) {
							this.nodeLevel = res.obj.nodeLevel;
							this.userList = res.obj.user;
							this.userBase = res.obj.userBase;
						}
					}
				);
			},
			// 团队信息
			getTeamList() {
				this.$Ajax('/front/team/myTeam', {}, res => {
						if (res.code == 0) {
							this.team = res.obj;
							this.teamList = res.obj.oneVipList;
							this.inviteList = res.obj.twoVipList;
						}
					}
				);
			},
			// 邀请会员信息
			// getInviteList() {
			// 	this.$Ajax('/front/user/myInviteList', {
			// 		pageNum: this.pageNum,
			// 		pageSize: this.pageSize,
			// 	}, res => {
			// 			if (res.code == 0) {
			// 				this.pages = res.obj.pages;
			// 				this.inviteList = this.inviteList.concat(res.obj.list);
			// 			}
			// 		}
			// 	);
			// },
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/index/index';
	@import '@/common/scss/pages/team/team';
	page,.pages{
		background: #F5F5F5;
		height: 100vh;
	}
	.indexBox-drawer-header{padding: 0px;}
	.indexBox-drawer-header-uid{
		position: relative;
		image{
			right: -60upx;
			bottom: 5upx;
		}
	}
</style>
