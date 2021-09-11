<template>
	<view class="page">
		<view class="header_bar header_bg header_border header_fixed">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">群聊</view>
				<view class="header-right" @tap="$tools.jump('./addGroupChat',myName)">
					<image src="../../static/chat/icon-chat-addPeople.png" mode="widthFix"></image>
				</view>
			</view> 
		</view> 
		
		<view class="groupChat">
			<view class="groupChat-search" :class="{showCloseBtn: groupname != ''}">
				<image src="../../static/chat/icon-chat-search.png" mode="widthFix" class="groupChat-search__image"
				:class="{'groupChat-search__image--active' : groupname != ''}"></image>
				<input type="text" placeholder="搜索~" placeholder-class="groupChat-search--input" v-model="groupname"
				confirm-type="search" @confirm="onSearch"/>
				<view class="groupChat-search__fixedBox">
					<view class="groupChat-search__fixedBox-btn groupChat-search__fixedBox-btn--clear" @click="clearData('groupname')">
						<image src="../../static/public/icon-clear.png" mode=""></image>
					</view>
				</view>
			</view>
			
			<scroll-view scroll-y="true" >
				<view class="groupChat-height">
					<view class="groupChat-wrapper">
						<view class="groupChat-list" v-for="(item,groupid) in groupList" :key="groupid"
						 :data-username="item.groupname" :data-roomid="item.groupid" @tap="into_room">
							<image src="../..//static/images/groupTheme.png" mode="widthFix" class="groupChat-list__image"  :data-username="item.groupname"></image>
							<view class="groupChat-list__item">
								<view class="groupChat-list__item-box" :data-username="item.groupname" :data-roomid="item.groupid">
									<view class="groupChat-list__item-title":data-username="item.groupname">{{ item.groupname == '' ? '群聊' : item.groupname }}</view>
								</view>
								<!-- <view class="groupChat-list__tips">75 人</view> -->
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		
	</view>
</template>

<script>
	var WebIM = require("../../utils/WebIM")["default"];
	let disp = require("../../utils/broadcast");
	export default {
			data(){
				return{
					groupList: [],
					groupname:'',
					myName:'',
				}
			},
			onLoad: function (option) {
				let me = this;
				disp.on("em.invite.joingroup", function () {
					var pageStack = getCurrentPages(); // 判断是否当前路由是本页
					if (pageStack[pageStack.length - 1].route === me.__route__) {
						me.listGroups();
					}
				});
				disp.on("em.invite.deleteGroup", function () {
					var pageStack = getCurrentPages(); // 判断是否当前路由是本页
			
					if (pageStack[pageStack.length - 1].route === me.__route__) {
						me.listGroups();
					}
				});
				this.setData({
					myName: option.myName
				});
			},
			onShow: function () {
				this.listGroups();
				this.myName = uni.getStorageSync('myUsername');
				// console.log(this.myName);
			},
			methods: {
				// 查询群聊
				listGroups() {
				  var me = this;
				  WebIM.conn.getGroup({
				    limit: 100,
				    success: function (res) {
				      me.setData({
				        groupList: res.data
				      });
				      getApp().globalData.groupList = res.data || [];
					  // console.log('res.data',res.data);
					  // 获取聊天室成员
					  // this.getlistChatRoomMember();
				    },
				    error: function () {}
				  });
				},
				// 进入群聊
				into_room: function (event) {
				  var nameList = {
				    myName: this.myName,
				    your: event.currentTarget.dataset.username,
				    groupId: event.currentTarget.dataset.roomid
				  };
				  uni.username = nameList
				  uni.navigateTo({
				    url: "../groupChatRoom/groupChatRoom?username=" + JSON.stringify(nameList)
				  });
				},
				// 新建群聊
				build_group: function () {
				  var me = this;
				  var nameList = {
				    myName: me.myName
				  };
				  uni.navigateTo({
				    url: "./addGroupChat?owner=" + JSON.stringify(nameList)
				  });
				},
				onSearch: function (val) {
				  let searchValue = val.detail.value;
				  console.log('searchValue',searchValue);
				  let groupList = this.groupList;
				  let serchList = [];
				  groupList.forEach((item, index) => {
				    if (String(item.groupname).indexOf(searchValue) != -1) {
				      serchList.push(item);
				    }
				  });
				  if(searchValue == ''){
					  this.listGroups();
				  }else{
					  this.groupList = serchList
				  }
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
					this.listGroups();
				},
			},
		}
	</script>

<style lang="scss" scoped>
	@import '/scss/groupChat';
</style>
