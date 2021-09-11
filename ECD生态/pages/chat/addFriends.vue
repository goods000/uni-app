<template>
	<view class="page">
		<view class="header_bar header_bg header_fixed">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">添加好友</view>
			</view> 
		</view> 
		
		<view class="addFriends">
			<view class="addFriends-search" :class="{showCloseBtn: friend_name != ''}">
				<image src="../../static/chat/icon-chat-search.png" mode="widthFix" class="addFriends-search__image"></image>
				<input type="text" placeholder="昵称搜索~" placeholder-class="addFriends-search--input" v-model="friend_name"/>
				<view class="addFriends-search__fixedBox">
					<view class="addFriends-search__fixedBox-btn addFriends-search__fixedBox-btn--clear" @click="clearData('friend_name')">
						<image src="../../static/public/icon-clear.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="addFriends-uid">
				<view class="addFriends-uid__num">我的UID:{{uid}}</view>
				<image src="../../static/public/icon-copy.png" mode="widthFix" class="addFriends-uid__image" @click="$tools.copy(uid)"></image>
			</view>
			
			
			<view class="addFriends-wrapper" v-if="friend_name != ''">
				<!-- <view class="addFriends-list" v-for="(item,index) in 5" :key="index" @click="$tools.jump('./more')"> -->
				<view class="addFriends-list">
					<image src="../../static/pack/logo.png" mode="widthFix" class="addFriends-list__image"></image>
					<view class="addFriends-list__item">
						<view class="addFriends-list__item-box">
							<view class="addFriends-list__item-title">{{friend_name}}</view>
							<!-- <view class="addFriends-list__item-uid">UID:{{friend_name}}</view> -->
						</view>
						<view class="addFriends-list__btn" @click="add_friend" :disabled="isdisable">添加</view>
					</view>
				</view>
			</view>
			
			<view class="addFriends-wrapper">
				<view class="addFriends-list" v-for="(item, index) in friendList" :key="index">
					<image src="../../static/images/theme2x.png" mode="widthFix" class="addFriends-list__image"></image>
					<view class="addFriends-list__item">
						<view class="addFriends-list__item-box">
							<view class="addFriends-list__item-title">{{ item.from }}</view>
							<view class="addFriends-list__item-uid">申请添加您为好友</view>
						</view>
						<view class="addFriends-list__btn" v-if="!item.typeText" :data-from="item.from" @tap="agree">添加</view>
						<view class="addFriends-list__btn" v-if="item.typeText">{{ item.typeText }}</view>
					</view>
				</view>
				<view class="addFriends-list" v-for="(sub, from) in groupList" :key="from">
					<image src="../../static/images/groupTheme.png" mode="widthFix" class="addFriends-list__image"></image>
					<view class="addFriends-list__item">
						<view class="addFriends-list__item-box">
							<view class="addFriends-list__item-title">{{ sub.from }}</view>
							<view class="addFriends-list__item-uid">邀请加入群组ID为{{ sub.gid }}</view>
						</view>
						<view class="addFriends-list__btn" v-if="!sub.typeText" :data-from="sub.gid" @tap="agree_group">同意</view>
						<view class="addFriends-list__btn" v-if="sub.typeText">{{ sub.typeText }}</view>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	var WebIM = require("../../utils/WebIM")["default"];
	let disp = require("../../utils/broadcast"); // 好友邀请提醒
	export default {
			data(){
				return{
					uid:'',
					friend_name:'',
					isdisable: false,
					input_code: "",
					lookup: "",
					myName: "",
					friendList: [],// 添加好友列表
					groupList: [], //同意加入群聊
				}
			},
			onLoad: function () {
			    let app = getApp().globalData;
			    var me = this;
				//监听未读消息数
				// disp.on("em.unreadspot", function () {
				//   me.setData({
				//     unReadSpotNum: getApp().globalData.unReadMessageNum
				//   });
				// });
				// 监听群聊
				disp.on("em.invite.joingroup", function () {
				    me.setData({
				      groupList: getApp().globalData.saveGroupInvitedList,
					  groupInviteNum: getApp().globalData.saveGroupInvitedList.length,
					  unReadTotalNotNum: getApp().globalData.saveFriendList.length + getApp().globalData.saveGroupInvitedList.length
				    });
				  });
				  this.setData({
				    groupList: uni.getStorageSync("groupNotiData"), //getApp().globalData.saveGroupInvitedList
				});
				// 监听添加好友
				disp.on("em.subscribe", function () {
				me.setData({
					friendList: getApp().globalData.saveFriendList
				});
				});
				this.setData({
					myName: uni.getStorageSync("myUsername"),
					friendList: uni.getStorageSync("friendNotiData") //getApp().globalData.saveFriendList 
				});
				uni.setStorageSync("friendNotiData", getApp().globalData.saveFriendList);
				uni.setStorageSync("groupNotiData", getApp().globalData.saveGroupInvitedList);
			},
			onShow() {
				this.listGroups();
				this.setData({
				  messageNum: getApp().globalData.saveFriendList.length,
				  unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum,
				  groupInviteNum: getApp().globalData.saveGroupInvitedList.length,
				  unReadTotalNotNum: getApp().globalData.saveFriendList.length + getApp().globalData.saveGroupInvitedList.length
				});
				this.uid = uni.getStorageSync('myUuid');
				console.log("friendList",getApp().globalData.saveFriendList);
				this.friendList = getApp().globalData.saveFriendList
				console.log("groupList--",this.groupList,"--this.friendList--",this.friendList);
			},
			methods: {
				// 获取用户列表
				getRoster() {
				  let me = this;
				  let rosters = {
				    success(roster) {
				      var member = [];
				      for (let i = 0; i < roster.length; i++) {
				        if (roster[i].subscription == "both") {
				          member.push(roster[i]);
				        }
				      }
				      uni.setStorage({
				        key: "member",
				        data: member
				      });
				    },
				    error(err) {
				      console.log(err);
				    }
				  };
				  WebIM.conn.getRoster(rosters);
				},
				// 群组
				listGroups() {
				  var me = this;
				  return WebIM.conn.getGroup({
				    success: function (rooms) {
				      uni.setStorage({
				        key: "listGroup",
				        data: rooms,
				      });
				    },
				    error: function (err) {
				      console.log(err);
				    },
				  });
				},
				// 同意群组
				agree_group(event) {
				  console.log("event", event, "groupList>>", this.groupList);
				  console.log(" WebIM.conn.context.userId：", WebIM.conn.context.userId)
				  var me = this;
				  let myName = uni.getStorageSync("myUsername");
				  // 同意（无回调）
				  WebIM.conn.agreeInviteIntoGroup({
				    invitee: WebIM.conn.context.userId,
				  // WebIM.conn.agreeInviteIntoGroup({
				  //   applicant: myName,
				    groupId: event.currentTarget.dataset.from,
				    success: () => {
				      uni.showToast({
				        title: "加入成功",
				        duration: 1000,
				      });
				    },
				  });
				  this.groupList.forEach((item) => {
				    if (item.gid == event.currentTarget.dataset.from) {
				      uni.setStorageSync("groupNotiData", this.groupList);
				      item.typeText = "已同意";
				      this.setData({
				        groupList: this.groupList,
				      });
				    }
				  });
				  this.removeAndRefresh_group(event.currentTarget.dataset.from);
				  this.listGroups();
				},
				removeAndRefresh_group(removeId) {
				  console.log("removeId>>", removeId);
				  var idx;
				  this.groupList.forEach(function (v, k) {
				    console.log("v>>", v);
				    if (v.gid === removeId) {
				      idx = k;
				    }
				  });
				  console.log("idx>>", idx);
				  this.groupList.splice(idx, 1);
				  getApp().globalData.saveGroupInvitedList.splice(idx, 1);
				},
				// 拒绝添加群聊
				reject_group(event) {
				  var me = this; // 无回调
				  WebIM.conn.rejectInviteIntoGroup({
				    invitee: WebIM.conn.context.userId,
				    groupId: event.currentTarget.dataset.from,
				    success: () => {
				      uni.showToast({
				        title: "已拒绝",
				        duration: 1000,
				      });
				    },
				  });
				  this.groupList.forEach((item) => {
				    if (item.gid == event.currentTarget.dataset.from) {
				      item.typeText = "已拒绝";
				      uni.setStorageSync("groupNotiData", this.groupList); //getApp().globalData.savegroupList = this.data.groupList;
				      this.setData({
				        groupList: this.groupList,
				      });
				    }
				  });
				  this.removeAndRefresh_group(event.currentTarget.dataset.from);
				},
				
				
				// 添加好友
				add_friend(){
					let that = this;
					let myName = uni.getStorageSync("myUsername");
					if (that.friend_name == '') {
						return that.$tools.toast('请输入昵称');
					}
					if (!/^[a-zA-Z0-9]{1,10}$/.test(that.friend_name)) {
						return that.$tools.toast('昵称只包含数字和字母(1-10位)');
					}
					that.$Ajax('/front/friend/addFriendHx', {
						ownerUsername: myName,
						friendUsername: that.friend_name,
					}, res => {
						if (res.code == 0) {
							that.$tools.toastBack('添加成功',2)
						}
					});
					// WebIM.conn.subscribe({
					//   to: that.friend_name,
					//   message: myName + '请求添加好友'
					// });
					// let rosters = {
					//   success: function (roster) {
					//     console.log('success');
					//     var member = [];
					//     for (let i = 0; i < roster.length; i++) {
					//       if (roster[i].subscription == "both") {
					//         member.push(roster[i]);
					//       }
					//     }
					//     if (that.isExistFriend(that.friend_name, member)) {
					//       uni.showToast({
					//           	title: "已经是你的好友",
					//           });
					//     } else {
					//        uni.showToast({
					//           	title: "已发出好友申请",
					//           });
					// 		  this.friend_name = '';
					//     }
					
					//     that.setData({
					//       isdisable: true
					//     });
					//   }
					// };
					// WebIM.conn.getRoster(rosters);
				},
				// isExistFriend: function (name, list) {
				// 	for (let index = 0; index < list.length; index++) {
				// 		if (name == list[index].name) {
				// 			return true;
				// 		}
				// 	}
				//   return false;
				// },
				
				
				removeAndRefresh(removeId) {
				  var idx;
				  this.friendList.forEach(function (v, k) {
				    if (v.from === removeId) {
				      idx = k;
				    }
				  });
				  this.friendList.splice(idx, 1);
				  getApp().globalData.saveFriendList.splice(idx, 1); // if(!this.data.friendList.length){
				},
				// 添加
				agree(event) {
				  var me = this; 
				  // 同意（无回调）
				  WebIM.conn.subscribed({
				    to: event.currentTarget.dataset.from,
				    message: "[resp:true]"
				  }); 
				  this.friendList.forEach(item => {
				    if (item.from == event.currentTarget.dataset.from) {
				      item.type = 'subscribed';
				      item.typeText = '已同意';
				      uni.setStorageSync("friendNotiData", this.friendList); //getApp().globalData.saveFriendList = this.data.friendList;
				      this.setData({
				        friendList: this.friendList
				      });
				    }
				  });  
				  this.removeAndRefresh(event.currentTarget.dataset.from);
				  this.getRoster();
				},
				// 拒绝添加好友
				reject(event) {
				  var me = this; // 无回调
				  WebIM.conn.unsubscribed({
				    to: event.currentTarget.dataset.from,
				    message: "rejectAddFriend"
				  });
				  this.friendList.forEach(item => {
				    if (item.from == event.currentTarget.dataset.from) {
				      item.type = 'unsubscribed';
				      item.typeText = '已拒绝';
				      uni.setStorageSync("friendNotiData", this.friendList); //getApp().globalData.saveFriendList = this.data.friendList;
				      this.setData({
				        friendList: this.friendList
				      });
				    }
				  });
				  this.removeAndRefresh(event.currentTarget.dataset.from);
				},
				focusInput(index) {
					this.isFocus = index;
				},
				blurInput(index) {
					this.isFocus = null;
				},
				clearData(keyName) {
					for (var key in this.$data) {
						if (key == keyName) {
							this.$data[key] = '';
						}
					}
				},
			},
		}
	</script>

<style lang="scss" scoped>
	@import '/scss/addFriends';
</style>
