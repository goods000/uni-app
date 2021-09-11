<template>
	<view class="pages">
		<view class="header_bar header_bg header_border">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">更多</view>
			</view> 
		</view> 
		<view class="listBox"  v-if="type != 0">
			<view class="listBox-wrapper" @click="into_myCircle(your)">	
				<view class="listBox-list listBox-list-padding">
					<view class="listBox-list__image"><image src="../../static/pack/logo.png" mode="widthFix"></image></view>
					<view class="listBox-list__label">{{ your }}</view>
					<view class="listBox-list__line"></view>
				</view>
			</view>
		</view>
		<view class="listBox"  v-else>
			<view class="listBox-wrapper">	
				<view class="listBox-list listBox-list-padding">
					<view class="listBox-list__image"><image src="../../static/pack/logo.png" mode="widthFix"></image></view>
					<view class="listBox-list__label">{{ your }}</view>
					<view class="listBox-list__line"></view>
				</view>
			</view>
		</view>
		<view class="listBox">
			<!-- <view class="listBox-wrapper" v-if="type != 0">	
				<view class="listBox-list">
					<view class="listBox-list__label">清空聊天记录</view>
				</view>
			</view>
			<view class="listBox-wrapper" v-if="type == 0">
				<view class="listBox-list">
					<view class="listBox-list__label">好友备注</view>
				</view>
			</view> -->
			<view class="listBox-wrapper">		
				<view class="listBox-list" @click="deleteFriendHx()"> 
					<view class="listBox-list__label active">删除该好友</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
			data(){
				return{
					your:'',
					type:'',
				}
			},
			onLoad(hash) {
				this.your = hash.value1;
				this.type = hash.value2;
			},
			onShow() {
				this.myUsername = uni.getStorageSync('myUsername');
				console.log(this.myUsername);
			},
			methods: {
				into_myCircle(type){
					console.log("item.member",type,this.myUsername);
					this.hxUuid = uni.getStorageSync('myUuid');
					this.img = uni.getStorageSync('img');
					if(type == this.myUsername){
						this.$tools.jump('../myCircle/myCircle',this.img,this.myUsername,this.hxUuid);
					}else{
						this.$tools.jump('./myCircle',this.myUsername,type);
					}
				},
				// 删除好友
				deleteFriendHx() {
					let that = this;
					uni.showModal({
					  title: "删除好友",
					  content: "确认删除该好友？",
					  success: function (res) {
					    that.$Ajax('/front/friend/deleteFriendHx', {
					    	ownerUsername: that.myUsername,
					    	friendUsername: that.your,
					    }, res => {
					    	if (res.code == 0) {
					    		that.$tools.toastBack('删除成功',2)
					    	}
					    });
					  },
					  fail: function (err) {},
					});
				},
				
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
