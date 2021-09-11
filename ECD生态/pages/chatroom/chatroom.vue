<template>
	<view class="pages">
		<view class="header_bar header_bg header_fixed">
			<view class="header">
				<view class="header-back" @click="$tools.back()"></view>
				<view class="header-title">{{username.your}}</view>
				<view class="header-right" @click="$tools.jump('../chat/morePeople',username.your)">
					<image src="../../static/chat/icon-chat-more.png" mode="width"></image>
				</view>
			</view> 
		</view> 
		
		<chat id="chat" :username="username" ref="chat" chatType="singleChat" @onClickInviteMsg="onClickMsg"></chat>
	</view>
</template>

<script>
let disp = require("../../utils/broadcast");
import chat from "../../components/chat/chat.vue";

export default {
  data() {
    return {
      username: {
		myName:'',
        your: "",
      }
    };
  },

  components: {
    chat
  },
  props: {},
  // options = 系统传入的 url 参数
  onLoad(options) {
    let username = JSON.parse(options.username);
    this.setData({
      username: username
    });
	uni.username = username;
	// 生成的支付宝小程序在onLoad里获取不到，这里放到全局变量下
    // uni.setNavigationBarTitle({
    //   title: username.your
    // });
	// this.myName = options.value1;
	// this.your = options.value2;
	// let username = {
	// 	myName : this.myName,
	// 	your : this.your
	// }
	// this.setData({
	// 	username: username
	// });
  },

  onUnload() {
    disp.fire("em.chatroom.leave");
  },

  onPullDownRefresh: function () {
    uni.showNavigationBarLoading();
    this.$refs.chat.getMore();
    // 停止下拉动作
    uni.hideNavigationBarLoading();
    uni.stopPullDownRefresh();
  },
  methods: {
	  onClickMsg(msg){
		console.log("msg",msg);
		msg.action = 'join'
		uni.navigateTo({
			url: "../emedia/index?srcData="+JSON.stringify(msg)
		});
	  }
  }
};
</script>
<style lang="scss" scoped>
@import "./chatroom.css";
</style>