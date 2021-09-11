<template>
  <view class="contentBg">
	<view class="header_bar header_bg header_border header_fixed">
		<view class="header">
			<view class="header-wrapper">
				<view class="header-item" :class="{'header-item--active' : tabsActive == 0}" @click="changeTabs(0)">聊天</view>
				<view class="header-item" :class="{'header-item--active' : tabsActive == 1}" @click="changeTabs(1)">动态</view>
				<view class="header-item" :class="{'header-item--active' : tabsActive == 2}" @click="changeTabs(2)">通讯录</view>
			</view>
			<view class="header-right" @click="$tools.jump('./addFriends')">
				<image src="../../static/chat/icon-chat-add.png" mode="widthFix"></image>
			</view>
		</view>
	</view> 
	
	<view class="" v-if="tabsActive == 0">
		<view class="chat">
			<view class="chat-wrapper" @click="$tools.jump('./groupChat')">
				<view class="chat-group">
					<image src="../../static/chat/icon-chat-group.png" mode="widthFix"></image>
					<view class="chat-group__title">群聊</view>
				</view>
				<view class="chat-group__num">{{ listGroupItem }} 个</view>
			</view>
		</view>
		
		<!-- <view class="chat_list_wraper" > -->
		<scroll-view scroll-y="true" :class=" 'chat_list_wraper ' + (gotop ? (isIPX ? 'goTopX' : 'goTop') : 'goback')" :style="'padding-bottom: ' + (isIPX ? '270rpx' : '226rpx')">
		  <!-- <view class="search_input" v-if="search_chats">
		    <view>
		      <icon type="search" size="12"></icon>
		      <input placeholder="搜索" placeholder-style="color:#9B9B9B;line-height:21px;font-size:15px;" auto-focus
		        confirm-type="search" type="text" @confirm="onSearch" @input="onInput" :value="input_code"/>
		      <icon type="clear" size="12" @tap.stop="clearInput" v-if="show_clear"></icon>
		    </view>
		    <text @tap="cancel">取消</text>
		  </view> -->
		
		  <view v-for="(item, index) in arr" :key="index" class="chat_list" :data-item="item" @tap.stop="del_chat" @longpress="longpress">
		    <swipe-delete>
		      <!-- 通知模块 -->
		      <view class="tap_mask" @tap.stop="$tools.jump('./addFriends')" :data-item="item" v-if="item.chatType == 'INFORM'">
		        <view class="list_box">
		          <view class="list_left">
		            <view class="list_pic">
		              <!-- <view v-if="unReadTotalNotNum > 0" class="em-unread-spot2">{{unReadTotalNotNum}}</view> -->
		              <image :class="unReadTotalNotNum > 0 ? 'haveSpot' : ''" src="../../static/images/inform.png"></image>
		            </view>
		            <view class="list_text">
		              <text class="list_user"> 系统通知 </text>
		              <text class="list_word" v-if="item.chatType == 'INFORM'">申请通知来自：{{ item.info.from }}</text>
		            </view>
		          </view>
		          <view class="list_right">
		            <view class="list_right__item" :data-username="item.username">{{ item.time }}</view>
					<view v-if="unReadTotalNotNum > 0" class="em-msgNum">{{ unReadTotalNotNum }}</view>
		          </view>
				  <view class="list_box__line"></view>
		        </view>
		      </view>
		
		      <view class="tap_mask" @tap.stop="into_chatRoom" :data-item="item" v-else>
		        <!-- 消息列表 -->
		        <view class="list_box">
		          <view class="list_left" :data-username="item.username">
		            <view class="list_pic">
		              <image :src=" item.chatType == 'groupchat' || item.chatType == 'chatRoom' ? '../../static/images/groupTheme.png'
		                    : '../../static/images/theme2x.png'"></image>
		            </view>
		            <view class="list_text">
		              <text class="list_user">{{ item.chatType == "groupchat" || item.chatType == "chatRoom" || item.groupName ? (item.groupName == "" ? '群聊' : item.groupName) : item.username }}</text>
		              <!-- <text class="list_user">{{ item.chatType == "groupchat" || item.chatType == "chatRoom" || item.groupName ? item.groupName : item.username }}</text> -->
		              <text class="list_word" v-if="item.msg.data[0].data">{{item.msg.data[0].data}}</text>
		              <text class="list_word" v-if="item.msg.type == 'img'">[图片]</text>
		              <text class="list_word" v-if="item.msg.type == 'audio'">[语音]</text>
		              <text class="list_word" v-if="item.msg.type == 'video'">[视频]</text>
		            </view>
		          </view>
		          <view class="list_right">
		            <view class="list_right__item" :data-username="item.username">{{ item.time }}</view>
					<view class="em-msgNum" v-if="item.unReadCount > 0 || item.unReadCount == '99+'">{{ item.unReadCount }}</view>
		          </view>
				  <view class="list_box__line"></view>
		        </view>
		      </view>
		    </swipe-delete>
		  </view>
		
		  <long-press-modal :winSize="winSize" :popButton="popButton" @change="pickerMenuChange" :showPop="showPop" @hidePop="hidePop" :popStyle="popStyle"/>
		  <view v-if="arr.length == 0" class="chat_noChat">
		    <image class="ctbg" src="/static/images/ctbg.png"></image>
		    暂无聊天消息
		  </view>
		</scroll-view>
		<!-- bug: margin-bottom 不生效 需要加一个空标签-->
		<view style="height: 1px"></view>  
	</view>
	
	<view class="" v-if="tabsActive == 1">
		<view class="dynamic">
			<view class="initNoData" v-if="newsList.length == 0"></view>
			<view class="dynamic-wrapper newsList" v-for="(item,index) in newsList" :key="index">
				<view class="newsList-header">
					<view class="newsList-header__image" @click="into_myCircle(item.friedndUserName)">
						<image :src="item.headImg" mode="width"></image>
					</view>
					<view class="newsList-header__name">{{item.friedndUserName}}</view>
					<image v-if="item.isOwn == 1" @click="getdelFriendMoments(item.fcmid)" class="newsList-header__delete" src="../../static/public/icon-delete.png" mode="widthFix"></image>
				</view>
				<view class="newsList-box">
					<view class="newsList-box__title">{{item.content}}</view>
					<view class="newsList-box__imageList" v-if="item.picture != ''">
						<view class="newsList-box__imageList-imageBox"  v-for="(sub,key) in item.picture" :key="key">
							<image :src="sub" mode=""
							@click="$tools.previewImage(sub)" ></image>
							 <!-- @tap="previewImage" :data-url="sub"></image> -->
						</view>
					</view>
				</view>
				<view class="newsList-operate">
					<view class="newsList-operate__time">
						<image src="../../static/index/icon-index-time.png" mode="widthFix"></image>
						<view class="newsList-operate__time-title">{{item.createTime}}</view>
					</view>
					<view class="newsList-operate__like" @click="submit(index)">
						<image :src="item.userGit == false ? '../../static/public/icon-unlike.png' : '../../static/public/icon-like.png'" mode="widthFix"></image>
						<view class="newsList-operate__like-title" :class="{'newsList-operate__like-title--active' : item.userGit != false}">{{item.gitCount}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
	
	<view class="" v-if="tabsActive == 2">
		<view class="groupChat">
			<view class="groupChat-search" :class="{showCloseBtn: uid != ''}">
				<image src="../../static/chat/icon-chat-search.png" mode="widthFix" class="groupChat-search__image"
				:class="{'groupChat-search__image--active' : uid != ''}"></image>
				<input type="text" placeholder="搜索~" placeholder-class="groupChat-search--input" v-model="uid" 
				confirm-type="search" @confirm="onSearch_Brands"/>
				<view class="groupChat-search__fixedBox">
					<view class="groupChat-search__fixedBox-btn groupChat-search__fixedBox-btn--clear" @click="clearData('uid')">
						<image src="../../static/public/icon-clear.png" mode=""></image>
					</view>
				</view>
			</view>
			
			<scroll-view scroll-y="true" >
				<view class="groupChat-height">
					<view class="groupChat-wrapper" v-for="(item,index) in listMain" :key="index" :data-id="item.id">
						<!-- <view class="groupChat-letter">{{ item.region }}</view> -->
						<view class="groupChat-list" v-for="(sub,brandId) in item.brands" :key="brandId" :data-username="sub.name"
						@click="$tools.jump('./myCircle',myUsername,sub.name)">
						<!-- @tap.stop="into_room"> -->
						<!-- <swipe-delete class="groupChat-list"> -->
							<image src="../../static/images/theme2x.png" mode="widthFix" class="groupChat-list__image"></image>
							<view class="groupChat-list__item" :data-username="sub.name">
								<view class="groupChat-list__item-box" :data-username="sub.name">
									<view class="groupChat-list__item-title" :data-username="sub.name">{{sub.name}}</view>
								</view>
							</view>
						<!-- </swipe-delete>	 -->
						</view>
					</view>
				</view>
			</scroll-view>
			<!-- 右侧字母导航 -->
			<!-- <view class="orientation_region">
			  <block v-for="(item, id) in listMain" :key="id">
			    <view
			      :class="
			        'orientation_city ' + (isActive == item.id ? 'active' : '')
			      "
			      @tap="scrollToViewFn"
			      :data-id="item.id"
			      >{{ item.region }}</view
			    >
			  </block>
			</view> -->
		</view>
	</view>
	
  </view>
</template>

<script>
let disp = require("../../utils/broadcast");
var WebIM = require("../../utils/WebIM")["default"];
let isfirstTime = true;
let systemReady = false;
import swipeDelete from "../../components/swipedelete/swipedelete";
import longPressModal from "../../components/longPressModal/index";

export default {
  data() {
    return {
      search_btn: true,
      search_chats: false,
      show_mask: false,
      yourname: "",
      unReadSpotNum: 0,
      unReadNoticeNum: 0,
      messageNum: 0,
      unReadTotalNotNum: 0,
      arr: [
		  // {chatType:'INFORM',groupName:'groupName',info: {from: "a001", to: "mytest007"},msg:{type: "txt", url: "", data: [{data: "56757", type: "txt"}]},time: "2021-8-10 09:33:13"},
		  // {chatType:'groupchat',unReadCount:3,groupName:'groupName',info: {from: "a001", to: "mytest007"},msg:{type: "txt", url: "", data: [{data: "5675756756757567567575675675756756757567567575675675756756757567", type: "txt"}]},time: "2021-8-10 09:33:13"},
		  // {chatType:'chat',unReadCount:1,username:'a001',msg:{type: "txt", url: "", data: [{data: "ee_4.png", type: "emoji"}, {data: "ee_12.png", type: "emoji"}]},time: "2021-8-10 09:33:13"},
	  ],
      show_clear: false,
      member: "",
      isIPX: false,
      gotop: false,
      input_code: "",
      groupName: {},
      winSize: {},
      popButton: ["删除该聊天"],
      showPop: false,
      popStyle: "",
      currentVal:'',
	  tabsActive:0,
	  newsList:[],
	  uid:'',
	  typeActive:'',
	  // 分页
	  pages: 1, //总页数
	  pageNum: 1, //当前页数
	  pageSize: 20, //请求记录
	  // 通迅录
	  listMain:[],
	  myUsername:'',
	  myUser:'',
	  groupList: [], // 群聊列表
	  listGroupItem:'', //群聊个数
	  isActive: null, //侧边栏选中
	  IMToken:'',
	  isActive:true,
    };
  },
  components: {
    swipeDelete,
    longPressModal,
  },
  props: {},
  onLoad(hash) {
	console.log("this.typeActive",this.typeActive);
	this.typeActive = hash.value1;
	if(this.typeActive == 1){
		this.tabsActive == 1;
		this.getFriendDetail();
	}
    this.getWindowSize();
    let me = this;
    //监听加好友申请
    disp.on("em.subscribe", function () {
      me.getChatList();
      me.setData({
        messageNum: getApp().globalData.saveFriendList.length,
        unReadTotalNotNum:
          getApp().globalData.saveFriendList.length +
          getApp().globalData.saveGroupInvitedList.length,
      });
    });
    //监听解散群
    disp.on("em.invite.deleteGroup", function () {
      me.listGroups();
      me.getRoster();
      me.getChatList();
      me.setData({
        // arr: me.getChatList(),
        messageNum: getApp().globalData.saveFriendList.length,
      });
    });
    //监听未读消息数
    disp.on("em.unreadspot", function (message) {
      me.getChatList();
      me.setData({
        // arr: me.getChatList(),
        unReadSpotNum:
          getApp().globalData.unReadMessageNum > 99
            ? "99+"
            : getApp().globalData.unReadMessageNum,
      });
    });
    //监听未读加群“通知”
    disp.on("em.invite.joingroup", function () {
      me.setData({
        unReadNoticeNum: getApp().globalData.saveGroupInvitedList.length,
        unReadTotalNotNum:
          getApp().globalData.saveFriendList.length +
          getApp().globalData.saveGroupInvitedList.length,
      });
    });
    disp.on("em.contacts.remove", function () {
      me.getChatList();
      me.getRoster();
    });
    this.getRoster();
  },
  onShow: function () {
    // uni.hideHomeButton();
	// this.tabsActive = 0;
    this.getChatList();
    this.setData({
      //arr: this.getChatList(),
      unReadSpotNum:
        getApp().globalData.unReadMessageNum > 99
          ? "99+"
          : getApp().globalData.unReadMessageNum,
      messageNum: getApp().globalData.saveFriendList.length,
      unReadNoticeNum: getApp().globalData.saveGroupInvitedList.length,
      unReadTotalNotNum:
        getApp().globalData.saveFriendList.length +
        getApp().globalData.saveGroupInvitedList.length,
    });

    if (getApp().globalData.isIPX) {
      this.setData({
        isIPX: true,
      });
    }
	this.myUsername = uni.getStorageSync("myUsername");
	this.myUser = uni.getStorageSync("myUser");
	// console.log("this.myUsername：",this.myUsername);
	// 获取群聊
	// this.listGroupItem = uni.getStorageSync('listGroup').length;
	this.getListGroup();
	// console.log("listGroupItem：",this.listGroupItem);
	this.getRoster();
	this.IMToken = uni.getStorageSync('MItoken');
	if(this.IMToken == ''){
		this.MILogin();// 环信登录
	} 
  },
  methods: {
	// 环信登录
	MILogin(){
		if(!this.isActive){
			return false;
		}
		this.isActive = false;
		console.log("环信登录");
		var options = {
			apiUrl: WebIM.config.apiURL,
			user: this.myUsername,
			pwd: this.myUser,   //账号密码登录
			appKey: WebIM.config.appkey,
			success: function (res) {
				this.isActive = false;
				 var token = res.access_token;
				 uni.setStorageSync('MItoken', token);
			},
			error: function(){
				this.isActive = true;
			}
		};
		WebIM.conn.open(options);
	},
	// 头部导航栏切换
	changeTabs(index){
		if(this.tabsActive != index){
			this.tabsActive = index;
			if(this.tabsActive == 1){
				this.getFriendDetail(); // 获取用户的朋友圈
			}
			if(this.IMToken == ''){
				this.MILogin();// 环信登录
			}
		}
	},
	// 获取用户的朋友圈
	getFriendDetail() {
		this.$Ajax('/front/friend/getFriendDetail', {
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
	// 点赞朋友圈
	submit(index) {
		// this.newsList = [];
		this.$Ajax('/front/friend/friendGitLike', {
			id: this.newsList[index].fcmid,
		}, res => {
			if (res.code == 0) {
				this.newsList[index].userGit = !this.newsList[index].userGit;
				this.newsList[index].gitCount = this.newsList[index].gitCount +  (this.newsList[index].userGit ? 1 : - 1);
				console.log("fcmid",this.newsList[index].fcmid,"点赞成功");
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
				this.getFriendDetail();
			}
		});
	},
   // 查看图片
   previewImage(event) {
     var url = event.target.dataset.url;
     uni.previewImage({
       urls: [url] // 需要预览的图片 http 链接列表
     });
   },
	// 查看朋友个人信息
	into_myCircle(type){
		var myUsername = uni.getStorageSync('myUsername');
		this.hxUuid = uni.getStorageSync('myUuid');
		this.img = uni.getStorageSync('img');
		console.log("type",type,myUsername);
		if(type == myUsername){
			this.$tools.jump('../myCircle/myCircle',this.img,myUsername,this.hxUuid);
		}else{
			this.$tools.jump('./myCircle',myUsername,type);
		}
	},
	// 查询群聊个数
	getListGroup(){
		WebIM.conn.getGroup().then((res) => {
			this.listGroupItem = res.count;
		})
	},
	// 聊天列表
	listGroups() {
      var me = this;
      return WebIM.conn.getGroup({
        limit: 50,
        success: function (res) {
          let groupName = {};
          let listGroup = res.data || [];
          listGroup.forEach((item) => {
            groupName[item.groupid] = item.groupname;
          });

          me.setData({
            groupName: groupName,
          });
          uni.setStorage({
            key: "listGroup",
            data: res.data,
          });
          me.getChatList();
        },
        error: function (err) {
          console.log(err);
        },
      });
    },
	// 获取用户信息（包含列表好友）
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
            data: member,
          });
          me.setData({ member: member });
          me.listGroups();
          // if(!systemReady){
			  disp.fire("em.main.ready");
			  // systemReady = true;
          // }
          me.setData({
            arr: me.getChatList(),
            unReadSpotNum:
              getApp().globalData.unReadMessageNum > 99
                ? "99+"
                : getApp().globalData.unReadMessageNum,
          });
		  me.getBrands(member);
        },
        error(err) {
          console.log(err);
        },
      };
      WebIM.conn.getRoster(rosters);
    },
	// 包含陌生人版本
	getChatList() {
	  var myName = uni.getStorageSync("myUsername");
	  var array = [];
	  const me = this;
	  uni.getStorageInfo({
	    success: function (res) {
	      let storageKeys = res.keys;
	      let newChatMsgKeys = [];
	      let historyChatMsgKeys = [];
	      let len = myName.length;
	      storageKeys.forEach((item) => {
	        if (item.slice(-len) == myName && item.indexOf("rendered_") == -1) {
	          newChatMsgKeys.push(item);
	        } else if (
	          item.slice(-len) == myName &&
	          item.indexOf("rendered_") > -1
	        ) {
	          historyChatMsgKeys.push(item);
	        } else if (item === "INFORM") {
	          newChatMsgKeys.push(item);
	        }
	      });
	
	      cul.call(me, newChatMsgKeys, historyChatMsgKeys);
	    },
	  });
	
	  function cul(newChatMsgKeys, historyChatMsgKeys) {
	    let array = [];
	    let lastChatMsg;
	
	    for (let i = historyChatMsgKeys.length; i>0, i--; ) {
	      let index = newChatMsgKeys.indexOf(historyChatMsgKeys[i].slice(9));
	      if (index > -1) {
	        let newChatMsgs = uni.getStorageSync(newChatMsgKeys[index]) || [];
	        if (newChatMsgKeys.includes()) {
	        }
	        if (newChatMsgs.length) {
	          lastChatMsg = newChatMsgs[newChatMsgs.length - 1];
	          lastChatMsg.unReadCount = newChatMsgs.length;
	          if (lastChatMsg.unReadCount > 99) {
	            lastChatMsg.unReadCount = "99+";
	          }
	          let dateArr = lastChatMsg.time.split(" ")[0].split("-");
	          let timeArr = lastChatMsg.time.split(" ")[1].split(":");
	          let month = dateArr[2] < 10 ? "0" + dateArr[2] : dateArr[2];
	          lastChatMsg.dateTimeNum = `${dateArr[1]}${month}${timeArr[0]}${timeArr[1]}${timeArr[2]}`;
	          lastChatMsg.time = `${dateArr[1]}月${dateArr[2]}日 ${timeArr[0]}:${timeArr[1]}`;
	          newChatMsgKeys.splice(index, 1);
	        } else {
	          let historyChatMsgs = uni.getStorageSync(historyChatMsgKeys[i]);
	          if (historyChatMsgs.length) {
	            lastChatMsg = historyChatMsgs[historyChatMsgs.length - 1];
	            let dateArr = lastChatMsg.time.split(" ")[0].split("-");
	            let timeArr = lastChatMsg.time.split(" ")[1].split(":");
	            let month = dateArr[2] < 10 ? "0" + dateArr[2] : dateArr[2];
	            lastChatMsg.dateTimeNum = `${dateArr[1]}${month}${timeArr[0]}${timeArr[1]}${timeArr[2]}`;
	            lastChatMsg.time = `${dateArr[1]}月${dateArr[2]}日 ${timeArr[0]}:${timeArr[1]}`;
	          }
	        }
	      } else {
	        let historyChatMsgs = uni.getStorageSync(historyChatMsgKeys[i]);
	        if (historyChatMsgs.length) {
	          lastChatMsg = historyChatMsgs[historyChatMsgs.length - 1];
	          let dateArr = lastChatMsg.time.split(" ")[0].split("-");
	          let timeArr = lastChatMsg.time.split(" ")[1].split(":");
	          let month = dateArr[2] < 10 ? "0" + dateArr[2] : dateArr[2];
	          lastChatMsg.dateTimeNum = `${dateArr[1]}${month}${timeArr[0]}${timeArr[1]}${timeArr[2]}`;
	          lastChatMsg.time = `${dateArr[1]}月${dateArr[2]}日 ${timeArr[0]}:${timeArr[1]}`;
	        }
	      }
	      if (
	        lastChatMsg &&
	        (lastChatMsg.chatType == "groupchat" ||
	          lastChatMsg.chatType == "chatRoom")
	      ) {
	        lastChatMsg.groupName = me.groupName[lastChatMsg.info.to];
	      }
	      lastChatMsg && lastChatMsg.username != myName &&
	        array.push(lastChatMsg);
	    }
	
	    for (let i = newChatMsgKeys.length;i>0, i--; ) {
	      let newChatMsgs = uni.getStorageSync(newChatMsgKeys[i]) || [];
	      if (newChatMsgs.length) {
	        lastChatMsg = newChatMsgs[newChatMsgs.length - 1];
	        lastChatMsg.unReadCount = newChatMsgs.length;
	        if (lastChatMsg.unReadCount > 99) {
	          lastChatMsg.unReadCount = "99+";
	        }
	        let dateArr = lastChatMsg.time.split(" ")[0].split("-");
	        let timeArr = lastChatMsg.time.split(" ")[1].split(":");
	        let month = dateArr[2] < 10 ? "0" + dateArr[2] : dateArr[2];
	        lastChatMsg.dateTimeNum = `${dateArr[1]}${month}${timeArr[0]}${timeArr[1]}${timeArr[2]}`;
	        lastChatMsg.time = `${dateArr[1]}月${dateArr[2]}日 ${timeArr[0]}:${timeArr[1]}`;
	        if (
	          lastChatMsg.chatType == "groupchat" ||
	          lastChatMsg.chatType == "chatRoom"
	        ) {
	          lastChatMsg.groupName = me.groupName[lastChatMsg.info.to];
	        }
	        lastChatMsg.username != myName && array.push(lastChatMsg);
	      }
	    }
	
	    array.sort((a, b) => {
	      return b.dateTimeNum - a.dateTimeNum;
	    });
	    this.setData({
	      arr: array,
	    });
	  }
	},
    cancel: function () {
      this.getChatList();
      this.setData({
        search_btn: true,
        search_chats: false,
        //arr: this.getChatList(),
        unReadSpotNum:
          getApp().globalData.unReadMessageNum > 99
            ? "99+"
            : getApp().globalData.unReadMessageNum,
        gotop: false,
      });
    },
    into_chatRoom: function (event) {
      let detail = event.currentTarget.dataset.item;
      if (
        detail.chatType == "groupchat" ||
        detail.chatType == "chatRoom" ||
        detail.groupName
      ) {
        this.into_groupChatRoom(detail);
      } else {
        this.into_singleChatRoom(detail);
      }
    },
    // 单聊
    into_singleChatRoom: function (detail) {
      var my = uni.getStorageSync("myUsername");
      var nameList = {
        myName: my,
        your: detail.username,
      };
      uni.navigateTo({
        url: "../chatroom/chatroom?username=" + JSON.stringify(nameList),
      });
    },
    // 群聊 和 聊天室 （两个概念）
    into_groupChatRoom: function (detail) {
      var my = uni.getStorageSync("myUsername");
      var nameList = {
        myName: my,
        your: detail.groupName,
        groupId: detail.info.to,
      };
      uni.navigateTo({
        url:
          "../groupChatRoom/groupChatRoom?username=" + JSON.stringify(nameList),
      });
    },
	
    removeAndRefresh:function(event){
     let removeId = event.currentTarget.dataset.item.info.from
     let ary = getApp().globalData.saveFriendList
     let idx
    if (ary.length>0) {
      ary.forEach((v,k)=>{
        if (v.from == removeId) {
          idx = k
        }
      })
      getApp().globalData.saveFriendList.splice(idx, 1);
    }
      uni.removeStorageSync('INFORM')
    },
	// 删除聊天
    del_chat: function (event) {
      let detail = event.currentTarget.dataset.item;
      let nameList = {};
      let me = this;
      // 删除当前选中群组聊天列表
      if (detail.chatType == "groupchat" || detail.chatType == "chatRoom") {
        nameList = {
          your: detail.info.to,
        };
        //删除当前选中通知列表
      } else if (detail.chatType === "INFORM") {
        nameList = {
          your: "INFORM",
        };
      }
      //删除当前选中好友聊天列表
      else {
        nameList = {
          your: detail.username,
        };
      }
      var myName = uni.getStorageSync("myUsername");
      var currentPage = getCurrentPages();

      uni.showModal({
        title: "确认删除？",
        confirmText: "删除",
        success: function (res) {
          if (res.confirm) {
            uni.removeStorageSync(nameList.your + myName);
            uni.removeStorageSync("rendered_" + nameList.your + myName);
            nameList.your === 'INFORM' && me.removeAndRefresh(event);
            // if (Object.keys(currentPage[0]).length>0) {
            //   currentPage[0].onShow();
            // }
            disp.fire("em.chat.session.remove");
            me.getChatList();
          }
        },
        fail: function (err) {
          console.log('删除列表',err);
        },
      });
    },
    longpress: function (e) {
      //将当前选中的值存在data中方便后续操作
      this.currentVal = e
      let [touches, style, index] = [e.touches[0],"",e.currentTarget.dataset.index,];

      /* 因 非H5端不兼容 style 属性绑定 Object ，所以拼接字符 */
      if (touches.clientY > this.winSize.height / 2) {
        style = `bottom:${this.winSize.height - touches.clientY}px;`;
      } else {
        style = `top:${touches.clientY}px;`;
      }
      if (touches.clientX > this.winSize.witdh / 2) {
        style += `right:${this.winSize.witdh - touches.clientX}px`;
      } else {
        style += `left:${touches.clientX}px`;
      }

      this.popStyle = style;
      // this.pickerUserIndex = Number(index);
      this.showShade = true;
      this.$nextTick(() => {
        setTimeout(() => {
          this.showPop = true;
        }, 10);
      });
    },
    /* 获取窗口尺寸 */
    getWindowSize() {
      uni.getSystemInfo({
        success: (res) => {
          this.winSize = {
            witdh: res.windowWidth,
            height: res.windowHeight,
          };
        },
      });
    },
    hidePop() {
      this.showPop = false;
    },
    pickerMenuChange() {
      console.log("当前选中>>", this.currentVal);
      this.del_chat(this.currentVal)
    },
	
	// 通讯录处理数据格式，及获取分组高度
	getBrands: function (member) {
	  const that = this;
	  const reg = /[a-z]/i;
	  member.forEach((item) => {
	    if (reg.test(item.name.substring(0, 1))) {
	      item.initial = item.name.substring(0, 1).toUpperCase();
	    } else {
	      item.initial = "#";
	    }
	  });
	  member.sort((a, b) => a.initial.charCodeAt(0) - b.initial.charCodeAt(0));
	  var someTtitle = null;
	  var someArr = [];
	
	  for (var i = 0; i < member.length; i++) {
	    var newBrands = {
	      brandId: member[i].jid,
	      name: member[i].name,
	    };
	
	    if (member[i].initial == "#") {
	      if (!lastObj) {
	        var lastObj = {
	          id: i,
	          region: "#",
	          brands: [],
	        };
	      }
	
	      lastObj.brands.push(newBrands);
	    } else {
	      if (member[i].initial != someTtitle) {
	        someTtitle = member[i].initial;
	        var newObj = {
	          id: i,
	          region: someTtitle,
	          brands: [],
	        };
	        someArr.push(newObj);
	      }
	
	      newObj.brands.push(newBrands);
	    }
	  }
	
	  someArr.sort((a, b) => a.region.charCodeAt(0) - b.region.charCodeAt(0));
	
	  if (lastObj) {
	    someArr.push(lastObj);
	  }
	  //赋值给列表值
	  that.setData({
	    listMain: someArr,
	  }); //赋值给当前高亮的isActive
	
	  that.setData({
	    isActive: someArr.length > 0 ? someArr[0].id : "",
	  }); //计算分组高度,uni.createSelectotQuery()获取节点信息
	
	  let number = 0;
	
	  for (let j = 0; j < someArr.length; ++j) {
	    const query = uni.createSelectorQuery().in(this);
	    query
	      .select(`#inToView${someArr[j].id}`)
	      .boundingClientRect((rect) => {
	        if (rect) {
	          number = rect.height + number;
	          var newArry = [
	            {
	              height: number,
	              key: rect.dataset.id,
	              name: someArr[j].region,
	            },
	          ];
	          oHeight = oHeight.concat(newArry);
	        } else {
	          this.$nextTick(() => {
	            //this.getBrands(member)
	          });
	        }
	      })
	      .exec();
	  }
	},
	onSearch_Brands: function (val) {
	  let searchValue = val.detail.value;
	  let member = this.member;
	  let serchList = [];
	  member.forEach((item, index) => {
	    if (String(item.name).indexOf(searchValue) != -1) {
	      serchList.push(item);
	    }
	  });
	  this.getBrands(serchList);
	},
	// 通讯录好友进入聊天
	into_room: function (event) {
	  var nameList = {
	    myName: this.myName,
	    your: event.target.dataset.username,
	  };
	  console.log("event：",event);
	  uni.navigateTo({
	    url: "../chatroom/chatroom?username=" + JSON.stringify(nameList),
	  });
	},
	//点击右侧字母导航定位触发
	scrollToViewFn: function (e) {
	  let that = this;
	  let _id = e.target.dataset.id;
	
	  for (let i = 0; i < that.listMain.length; ++i) {
	    if (that.listMain[i].id === _id) {
	      that.setData({
	        isActive: _id,
	        toView: "inToView" + _id,
	      });
	      break;
	    }
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
	},
  },
};
</script>
<style lang="scss" scoped>
	@import '/scss/chat';
</style>