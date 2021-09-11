<template>
	<view class="pages">
		<view class="header_bar header_bg header_border">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">更多</view>
			</view> 
		</view> 
		<view class="listBox">
			<view class="listBox-wrapper">	
				<view class="listBox-list listBox-list-padding"  v-for="(item, index) in groupMember" :key="index"
				@click="into_myCircle(item.member || item.owner)">
					<view class="listBox-list__image"><image src="../../static/pack/logo.png" mode="widthFix"></image></view>
					<view class="listBox-list__label">{{ item.member || item.owner }}</view>
					<view class="listBox-list__line"></view>
				</view>
				<view class="listBox-more" v-if="groupMember.length >= 6"  @tap.stop="more_group">查看更多群成员﹥</view>
			</view>
		</view>
		<view class="listBox">
			<view class="listBox-wrapper">	
				<view class="listBox-list" v-if="isOwner" @click="$tools.jump('./editGroupName',roomId,groupName)">
					<view class="listBox-list__label">群聊名称</view>
					<view class="listBox-list__edit">{{ groupName }}</view>
				</view>
				<view class="listBox-list" v-if="!isOwner">
					<view class="listBox-list__label">群聊名称</view>
					<view class="listBox-list__edit">{{ groupName }}</view>
				</view>
				<view class="listBox-list">
					<view class="listBox-list__label">我在本群的昵称</view>
					<view class="listBox-list__edit">{{ currentName }}</view>
				</view>
			</view>
			<!-- <view class="listBox-wrapper">	
				<view class="listBox-list">
					<view class="listBox-list__label">清空聊天记录</view>
				</view>
			</view> -->
			<!-- 解散群组 -->
			<view class="listBox-wrapper" v-if="isOwner">		
				<view class="listBox-list" @tap="dissolveGroup"> 
					<view class="listBox-list__label active">删除聊天并退出</view> 
				</view>
			</view>
			<view class="listBox-wrapper" v-if="!isOwner">
				<view class="listBox-list" @tap="leaveGroup"> 
					<view class="listBox-list__label active">退出群组</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Image from "../../components/chat/inputbar/suit/image/image.vue";
	var WebIM = require("../../utils/WebIM")["default"];
	let disp = require("../../utils/broadcast");
	export default {
			data(){
				return{
					roomId: "",
					// 群id
					groupName: "",
					// 群名称
					currentName: "",
					// 当前用户
					groupMember: [],
					// 群成员
					curOwner: "",
					// 当前群管理员
					groupDec: "",
					// 群描述
					groupCount: "",
					//群人数
					addFriendName: [],
					isOwner: false,
				}
			},
			onLoad(options) {
				let me = this;
				this.setData({
				  roomId: JSON.parse(options.groupInfo).roomId,
				  groupName: JSON.parse(options.groupInfo).groupName,
				  currentName: JSON.parse(options.groupInfo).myName,
				});
				disp.on("em.group.leaveGroup", function () {
				  var pageStack = getCurrentPages(); // 判断是否当前路由是本页
				  if (pageStack[pageStack.length - 1].route === me.__route__) {
				    me.getGroupMember();
				    this.getGroupInfo();
				  }
				}); 
				// 获取群成员
				this.getGroupMember(); // 获取群信息
				this.getGroupInfo();
			},
			onShow() {
				// console.log(this.roomId, this.groupName, this.currentName);
				this.groupName = this.groupName == '' ? '群聊' : this.groupName
			},
			methods: {
				more_group: function () {
				  var nameList = {
					// myName: this.myName,
					// groupName: event.currentTarget.dataset.username,
					// roomId: event.currentTarget.dataset.roomid,
				  myName: this.currentName,
				  groupName: this.groupName,
				  roomId: this.roomId,
				  };
				  uni.navigateTo({
					url: "./people?groupInfo=" + JSON.stringify(nameList)
				  });
				},
				getGroupMember: function () {
				  var me = this; // 获取群成员
				  var pageNum = 1,
				    pageSize = 1000;
				  var options = {
				    pageNum: pageNum,
				    pageSize: pageSize,
				    groupId: this.roomId,
				    success: function (resp) {
						// console.log("resp",resp);
				      if (resp && resp.data) {
				        me.setData({
				          groupMember: resp.data,
				          groupCount: resp.count,
				        });
				      }
				    },
				    error: function (err) {},
				  };
				  WebIM.conn.listGroupMember(options);
				},
				getGroupInfo: function () {
				  var me = this;
				  // 获取群信息
				  var options = { 
				    groupId: this.roomId,
				    success: function (resp) {
				      if (resp && resp.data) {
				        me.setData({
				          curOwner: resp.data[0].owner,
				          groupDec: resp.data[0].description,
				        });
				
				        if (me.currentName == resp.data[0].owner) {
				          me.setData({
				            isOwner: true,
				          });
				        }
				      }
				    },
				    error: function () {},
				  };
				  WebIM.conn.getGroupInfo(options);
				},
				// 群主解散退出群聊
				dissolveGroup: function () {
				  var me = this; // 解散一个群组
				  WebIM.conn.dissolveGroup({
				    groupId: me.roomId,
				    success: function () {
						me.$tools.toastBack('解散成功',2);
						uni.removeStorageSync(me.roomId+me.currentName);
						uni.removeStorageSync('rendered_'+me.roomId+me.currentName);
				    },
				    error: function (err) {
				      uni.showToast({
				        title: err.data.error_description,
				        icon: "none",
				      });
				    },
				  });
				},
				// 群员退出群聊
				leaveGroup: function () {
				  var me = this;
				  WebIM.conn.quitGroup({
				    groupId: this.roomId,
				    success: function () {
						me.$tools.toastBack('退群成功',2);
						uni.removeStorageSync(me.roomId+me.currentName);
						uni.removeStorageSync('rendered_'+me.roomId+me.currentName);
				      // uni.showToast({
				      //   title: "已退群",
				      //   duration: 2000,
				      //   success: function (res) {
				      //     // redirectTo = 此操作不可返回
				      //     setTimeout(
				      //       () =>
				      //         uni.redirectTo({
				      //           url: "./groupChat?myName=" + me.currentName,
				      //         }),
				      //       2000
				      //     );
				      //   },
				      // });
				      disp.fire("em.invite.deleteGroup"); //退群
				    },
				    error: function (err) {
				      uni.showToast({
				        title: err.data.error_description,
				        icon: "none",
				      });
				    },
				  });
				},
				into_myCircle(type){
					console.log("item.member",type,this.currentName);
					this.hxUuid = uni.getStorageSync('myUuid');
					this.img = uni.getStorageSync('img');
					if(type == this.currentName){
						this.$tools.jump('../myCircle/myCircle',this.img,this.currentName,this.hxUuid);
					}else{
						this.$tools.jump('./myCircle',this.currentName,type);
					}
				}
			},
		}
	</script>

<style lang="scss" scoped>
	@import '../user/scss/user';
	.listBox{
		&-list{
			&-padding{
				padding: 20upx 30upx;
			}
			border-bottom: none;
			&__image{
				image{
					width: 74upx;
					height: 74upx;
					border-radius: 50%;
					margin-right: 30upx;
				}
			}
			&__line{
				background: #EDF1F4;
				width: 82%;
				height: 2upx;
				position:absolute;
				bottom: 0;right: 0;
			}
		}
		&-more{
			padding: 38upx 0;
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: $globalColor-fontStyle;
			text-align: center;
		}
	}
</style>
