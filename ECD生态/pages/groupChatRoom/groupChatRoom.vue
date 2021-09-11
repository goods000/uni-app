<template>
	<view class="pages">
		<view class="header_bar header_bg header_fixed">
			<view class="header">
				<view class="header-back" @click="$tools.back()"></view>
				<view class="header-title">{{username.your == '' ? '群聊' : username.your}}</view>
				<view class="header-right" @tap.stop="more_group">
				<!-- <view class="header-right" @click="$tools.jump('../chat/more',username.your)"> -->
					<image src="../../static/chat/icon-chat-more.png" mode="width"></image>
				</view>
			</view> 
		</view> 
		
		<chat
			id="groupchat" 
			ref="chat" 
			:username="username" 
			:groupId="groupId" 
			chatType="chatRoom" 
			@onMakeVideoCall="makeVideoCall" 
			@onClickInviteMsg="onClickMsg">
		</chat>
	</view>
</template>

<script>
let disp = require("../../utils/broadcast");
import chat from "../../components/chat/chat.vue";

export default {
  data() {
    return {
      username: {
        your: ""
      }
    };
  },

  components: {
    chat
  },

   props: {
    groupId:{
      type:String,
      default:''
    }
  },

  // options = 系统传入的 url 参数
  onLoad(options) {
    let username = JSON.parse(options.username);
    this.setData({
      username: username
    });
	uni.username = username;
    uni.setNavigationBarTitle({
      title: username.your
    });
  },

  onUnload() {
    disp.fire("em.chatroom.leave");
  },

  onPullDownRefresh: function () {
    uni.showNavigationBarLoading();
    // this.selectComponent('#groupchat').$vm.getMore(); 
    // 停止下拉动作
    this.$refs.chat.getMore();
    uni.hideNavigationBarLoading();
    uni.stopPullDownRefresh();
  },
  methods: {
	more_group: function () {
	  var nameList = {
		// myName: this.myName,
		// groupName: event.currentTarget.dataset.username,
		// roomId: event.currentTarget.dataset.roomid,
	  myName: this.username.myName,
	  groupName: this.username.your,
	  roomId: this.username.groupId,
	  };
	  uni.navigateTo({
		url: "../chat/more?groupInfo=" + JSON.stringify(nameList)
	  });
	},
	makeVideoCall(data){
		 if(false){
			uni.showToast({
				title: '请输入会议Id',
				duration: 2000
			});
			return
		}
		uni.navigateTo({
		  url: "../emedia/index?srcData="+JSON.stringify(data)
		});
		// let subNVue = uni.getSubNVueById('drawer')
		// subNVue.show('fade-out', 200)
		// uni.$emit('page-popup', {
		// 	state: 201,
		// 	room:{
		// 		id: 'LBJ13H05522QATH0DW164400C69796', //this.confrId,
		// 		pwd:this.pwd||''
		// 	},
		// 	desp: "开始初始化nvue",
		// })
	},
	onClickMsg(msg){
		msg.action = 'join'
		uni.navigateTo({
			url: "../emedia/index?srcData="+JSON.stringify(msg)
		});
	}
  }
};
</script>
<style lang="scss" scoped>
@import "./groupChatRoom.css";
</style>
