<template>
	<view class="contentBg">
		<view class="header_bar">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">社区结构</view>
			</view> 
		</view> 
		
		<view class="community">
			<view class="communityBox">
				<view class="communityBox-list">
					<view class="communityBox-list-title">团队总数</view>
					<view class="communityBox-list-price">{{ myTeam.teamPeopleCount }}人</view>
				</view>
			</view>
			
			<view class="communityBox-box">
				<view class="communityBox-box-list">
					<view class="tipsBox">
						<view class="tipsBox-wrapper" @click="triggerCollapse(0)">
							<view class="tipsBox-title">
								<view class="tipsBox-title__label">直推</view>
								<view class="tipsBox-right">
									<view class="tipsBox-right-title">{{ myTeam.vipCount_1 }}人</view>
								</view>
							</view>
						</view>
					</view>
					<view class="communityBox-box-list__item" v-if="navigateFlag[0].show">
						<view class="initNoData" v-if="myTeamList_1 == null">暂无数据</view>
						<view class="communityBox-box-list__item-type" v-for="(item,index) in myTeamList_1" :key="index" v-else>
							<image src="../../static/public/logo.png" mode="widthFix"></image>
							<view class="communityBox-box-list__item-title">{{item.account}}</view>
							<view class="communityBox-box-list__item-title">{{item.money}}</view>
						</view>
						<!-- <view class="communityBox-box-list__item-type">
							<image src="../../static/public/logo.png" mode="widthFix"></image>
							<view class="communityBox-box-list__item-title">werwer</view>
							<view class="communityBox-box-list__item-title">5456</view>
						</view> -->
					</view>
				</view>
				<!-- <view class="communityBox-box-list">
					<view class="tipsBox">
						<view class="tipsBox-wrapper" @click="triggerCollapse(1)">
							<view class="tipsBox-title">
								<view class="tipsBox-title__label">二代</view>
								<view class="tipsBox-right">
									<view class="tipsBox-right-title">{{ myTeam.vipCount_2 }}人</view>
								</view>
							</view>
						</view>
					</view>
					<view class="communityBox-box-list__item" v-if="navigateFlag[1].show">
						<view class="initNoData" v-if="myTeamList_2 == null">暂无数据</view>
						<view class="communityBox-box-list__item-type" v-for="(item,index) in myTeamList_2" :key="index" v-else>
							<image src="../../static/public/logo.png" mode="widthFix"></image>
							<view class="communityBox-box-list__item-title">{{item.account}}</view>
							<view class="communityBox-box-list__item-title">{{item.money}}</view>
						</view>
					</view>
				</view>
				<view class="communityBox-box-list">
					<view class="tipsBox">
						<view class="tipsBox-wrapper" @click="triggerCollapse(2)">
							<view class="tipsBox-title">
								<view class="tipsBox-title__label">三代</view>
								<view class="tipsBox-right">
									<view class="tipsBox-right-title">{{ myTeam.vipCount_3 }}人</view>
								</view>
							</view>
						</view>
					</view>
					<view class="communityBox-box-list__item" v-if="navigateFlag[2].show">
						<view class="initNoData" v-if="myTeamList_3 == null">暂无数据</view>
						<view class="communityBox-box-list__item-type" v-for="(item,index) in myTeamList_3" :key="index" v-else>
							<image src="../../static/public/logo.png" mode="widthFix"></image>
							<view class="communityBox-box-list__item-title">{{item.account}}</view>
							<view class="communityBox-box-list__item-title">{{item.money}}</view>
						</view>
					</view>
				</view> -->
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navigateFlag: [{ show: false }, { show: false }, { show: false }],
				myTeam:[],
				myTeamList_1:[],
				myTeamList_2:[],
				myTeamList_3:[],
			}
		},
		onShow() {
			this.init();
		},
		methods: {
			triggerCollapse(index) {
				this.navigateFlag[index].show = !this.navigateFlag[index].show;
			},
			init(){
				this.getmyTeam();
			},
			getmyTeam(){
				this.$Ajax('/front/user/myTeam', {
					treeLevel:3,
				}, res => {
					if (res.code == 0) {
						console.log(JSON.stringify(res.obj))
						this.myTeam = res.obj;
						this.myTeamList_1 = res.obj.vipList_1;
						this.myTeamList_2 = res.obj.vipList_2;
						this.myTeamList_3 = res.obj.vipList_3;
					}
				});
				
			}
		}
	}
</script>

<style lang="scss">
	@import '@/common/scss/pages/community/community';
	page{
		background: $globalColor-bgStyle;
	}
	.tipsBox{
		&-right{
			right: 30upx;
		}
	}
</style>
