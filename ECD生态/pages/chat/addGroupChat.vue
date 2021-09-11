<template>
	<view class="page">
		<view class="header_bar header_bg header_border header_fixed">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">发起群聊</view>
			</view> 
		</view> 
		
		<view class="addGroupChat">
			<view class="addGroupChat-wrapper">
				<!-- <checkbox-group class="checkbox-group" @change="inviteFriendFun"> -->
				<view class="addGroupChat-list" v-for="(item,index) in friendList" :key="index">
					<!-- <label class="addGroupChat-list__box" :class="[flag == true ? 'addGroupChat-list__box--active' : '']" ></label> -->
					<label class="addGroupChat-list__box" :class="[item.checked == true ? 'addGroupChat-list__box--active' : '']" @click="agreement(index,item.name)"></label>
					<!-- <checkbox class="addGroupChat-list__box" :value="item.name" ></checkbox> -->
					<image class="addGroupChat-list__image" src="../../static/pack/logo.png" mode="widthFix"></image>
					<view class="addGroupChat-list__title">{{ item.name }}</view>
					<view class="addGroupChat-list__line"></view>
				</view>
				<!-- </checkbox-group> -->
			</view>
		</view>
		
		<view class="addGroupChat-btn">
			<view class="initBtn" @tap="createGroup">确定({{inviteFriend.length}})</view>
		</view>
	</view>
</template>

<script>
	var WebIM = require("../../utils/WebIM")["default"];
	export default {
			data(){
				return{
					friendList: [],
					groupName:'',
					inviteFriend: [], // 允许群人员邀请
					owner: "", // = myName 需要加好友ID
					allowJoin: true, // 是否允许任何人加入
					flag: false,
					typeActive: 0,
					index:'',
				}
			},
			onLoad: function (options) {
			  this.setData({
			    owner: options.value1
			  });
			},
			onShow() {
				let taht = this;
				// 获取好友列表
				WebIM.conn.getRoster({
				  success: function (roster) {
				    var member = [];
				    for (let i = 0; i < roster.length; i++) {
				      if (roster[i].subscription == "both") {
				        member.push(roster[i]);
				      }
				    }
				    taht.setData({
				      friendList: member
				    });
				  }
				});
				console.log(this.friendList);
				this.init();
			},
			methods: {
				init(){
					this.friendList.forEach((item, index) => {
						that.$set(item, 'checked', false);
					});
				},
				inviteFriendFun: function (e) {
					this.setData({
						inviteFriend: e.detail.value
					});
				},
				// 创建群组
				createGroup: function () {
				  let that = this;
				  let allGroups = getApp().globalData.groupList;
				  console.log("this.inviteFriend：",this.inviteFriend);
				  let options = {
				    data: {
				      groupname: this.groupName,
				      desc: '',  // 群组描述
				      members: this.inviteFriend, // 用户名组成的数组
				      "public": this.allowJoin,  // pub等于true时，创建为公开群
				      // approval: this.data.allowApprove, // approval为true，加群需审批，为false时加群无需审批
				      // allowinvites: this.data.allowInvite,
				      owner: this.owner
				    },
				    success: function (respData) {
						that.$tools.toastBack('创建成功',1);
						// setTimeout(() => 
						// uni.redirectTo({
						//   url: "./chat?myName=" + uni.getStorageSync("myUsername")
						// }
						// ), 1000);
				    },
				    error: function (err) {
				      uni.showToast({
				        title: err.data.error_description,
				        icon:'none'
				      });
				    }
				  };
				  WebIM.conn.createGroupNew(options);
				},
				agreement(index,name){
					console.log("this.friendList",this.friendList);
					this.friendList[index].checked = !this.friendList[index].checked;
					if (this.friendList[index].checked) {
						this.inviteFriend.push(name);
						console.log("push",this.inviteFriend);
					} else {
						this.inviteFriend.splice(this.inviteFriend.indexOf(name), 1);
						console.log("splice",this.inviteFriend);
					}
				},
			},
		}
	</script>

<style lang="scss" scoped>
	@import '/scss/addGroupChat';
</style>
