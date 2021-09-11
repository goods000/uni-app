<template>
	<view class="pages">
		<view class="myCircle-bgBox">
			<view class="header_bar header_fixed header_style">
				<view class="header">
					<view class="header-back--white" @click="$tools.back(1)"></view>
				</view> 
			</view> 
			<view class="userInfoBox-wrapper">
				<view class="userInfoBox-row">
					<view class="userInfoBox-level"><image :src="img" mode=""></image></view>
				</view>
				<view class="userInfoBox-main">
					<view class="userInfoBox-tourist">{{name}}</view>
					<!-- <view class="userInfoBox-id">
						<text>UID:{{hxUuid}}</text>
					</view> -->
				</view>
				<!-- 发动态 -->
				<view class="myCircle-image" @click="$tools.jump('../release/release')">
					<image src="../../static/myCircle/icon-myCircle-01.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		
		<view class="myCircle">
			<view class="myCircle-wrapper">
				<view class="initNoData" v-if="newsList.length == 0"></view>
				<view class="myCircle-list" v-for="(item, index) in newsList" :key="index">
					<view class="myCircle-list__date">
						{{item.createTime}}
						<image v-if="item.isOwn == 1" @click="getdelFriendMoments(item.fcmid)" class="myCircle-list__delete" src="../../static/public/icon-delete.png" mode="widthFix"></image>
					</view>
					<view class="myCircle-list__title">{{item.content}}</view>
					<view class="myCircle-list__imageList" v-if="item.picture != ''">
						<view class="myCircle-list__imageList-imageBox"  v-for="(sub,key) in item.picture" :key="key">
							<image :src="sub" mode="" @click="$tools.previewImage(sub)"></image>
						</view>
					</view>
					<view class="myCircle-operate">
						<view class="myCircle-operate__time"></view>
						<view class="myCircle-operate__like" @click="submit(index)">
							<image :src="item.userGit == false ? '../../static/public/icon-unlike.png' : '../../static/public/icon-like.png'" mode="widthFix"></image>
							<view class="myCircle-operate__like-title" :class="{'myCircle-operate__like-title--active' : item.userGit != false}">{{item.gitCount}}</view>
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
					newsList:[],
					// 分页
					pages: 1, //总页数
					pageNum: 1, //当前页数
					pageSize: 20, //请求记录
				}
			},
			onLoad(hash) {
				this.img = hash.value1;
				this.name = hash.value2;
				this.hxUuid = hash.value3;
			},
			onShow() {
				this.init();
			},
			methods: {
				init(){
					// this.newsList = [];
					this.getFriendUserDetail();
				},
				// 获取我的的朋友圈
				getFriendUserDetail() {
					this.$Ajax('/front/friend/getFriendUserDetail', {
						pageNum: this.pageNum,
						pageSize: this.pageSize
					}, res => {
						if (res.code == 0) {
							this.newsList = res.obj.data;
							res.obj.data.forEach((item,index) => {
								if(item.picture != null){
									let picture = item.picture;
									item.picture = picture.split(',');
								}
							})
						}
					});
				},
				// 删除朋友圈
				getdelFriendMoments(id) {
					this.$Ajax('/front/friend/delFriendMoments', {
						id: id,
					}, res => {
						if (res.code == 0) {
							this.$tools.toast('删除成功');
							this.getFriendUserDetail();
						}
					});
				},
				// 点赞朋友圈
				submit(index) {
					// this.newsList = [];
					this.$Ajax('/front/friend/friendGitLike', {
						id: this.newsList[index].fcmid,
					}, res => {
						if (res.code == 0) {
							this.newsList[index].userGit = !this.newsList[index].userGit;
							this.newsList[index].gitCount = this.newsList[index].gitCount +  (this.newsList[index].userGit ? 1 : - 1);
						}
					});
				},
			},
		}
	</script>

<style lang="scss" scoped>
	@import '/scss/myCircle';
	@import '../user/scss/user';
	.userInfoBox-id{
		width: 80%;
	}
</style>
