<template>
	<view class="pages">
		<view class="myCircle-bgBox">
			<view class="header_bar header_fixed header_style">
				<view class="header">
					<view class="header-back--white" @click="$tools.back(1)"></view>
					<view class="header-right" @click="$tools.jump('../chat/morePeople',nickName,0)">
						<image src="../../static/chat/icon-chat-more--light.png" mode="width"></image>
					</view>
				</view> 
			</view> 
			<view class="userInfoBox-wrapper">
				<view class="userInfoBox-row">
					<view class="userInfoBox-level"><image :src="headImg" mode=""></image></view>
				</view>
				<view class="userInfoBox-main">
					<view class="userInfoBox-tourist">{{ nickName }}</view>
					<!-- <view class="userInfoBox-id">
						<text>UID:{{ hxUuid }}</text>
					</view> -->
				</view>
				<!-- 加好友 -->
				<!-- <view class="myCircle-image" @click="$tools.jump('..//')">
					<image src="../../static/myCircle/icon-myCircle-02.png" mode="widthFix"></image>
				</view> -->
				<!-- 发信息 -->
				<view class="myCircle-image" @click="into_room()">
					<image src="../../static/myCircle/icon-myCircle-03.png" mode="widthFix"></image>
				</view>
			</view>
			<!-- <view class="userInfoBox-remarks">
				<view class="userInfoBox-remarks__title">好友备注</view>
				<image src="../../static/public/icon-arrow-right-white.png" mode="widthFix" class="userInfoBox-remarks__image"></image>
			</view> -->
		</view>
		
		<view class="myCircle">
			<view class="myCircle-wrapper">
				<view class="initNoData" v-if="newsList.length == 0"></view>
				<view class="myCircle-list" v-for="(item, index) in newsList" :key="index">
					<view class="myCircle-list__date">{{item.createTime}}</view>
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
					myUsername:'',
					nickName:'',
					headImg:'',
					hxUuid:'',
					// 页数
					pageSize: 20,
					pageNum: 1,
					pages: 0,
					newsList:[],
				}
			},
			onLoad(hash) {
				this.myUsername = hash.value1;
				this.nickName = hash.value2;
			},
			onShow() {
				this.init();
			},
			methods: {
				init(){
					this.getGoodFriendDetail();
				},
				// 获取好友详情
				getGoodFriendDetail() {
					this.$Ajax('/front/friend/getGoodFriendDetail', {
						pageSize: this.pageSize,
						pageNum: this.pageNum,
						nickName:this.nickName
					}, res => {
						if (res.code == 0) {
							this.headImg = res.obj.headImg;
							this.hxUuid = res.obj.hxUuid;
							this.newsList = res.obj.list.data;
							res.obj.list.data.forEach((item,index) => {
								if(item.picture != null){
									let picture = item.picture;
									item.picture = picture.split(',');
								}
							})
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
				into_room: function () {
				  var nameList = {
				    myName: this.myUsername,
				    your: this.nickName,
				  };
				  uni.navigateTo({
				    url: "../chatroom/chatroom?username=" + JSON.stringify(nameList),
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
