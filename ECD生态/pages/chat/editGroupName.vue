<template>
	<view class="page">
		<view class="safety">
			<view class="header_bar header_border">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">修改群聊名称</view>
				</view> 
			</view> 
			
			
			<view class="safety-list">
				<view class="safety-list-input" :class="{showCloseBtn: groupName != '' }">
					<input type="text" placeholder="请输入修改的群聊名称" placeholder-style="color:#999999" v-model="groupName" />
					<view class="safety-list-input__fixedBox">
						<view class="safety-list-input__fixedBox-btn safety-list-input__fixedBox-btn--clear" @click="clearData('groupName')">
							<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="initBtn" @click="submit()">提交</view>
		</view>
	</view>
</template>

<script>
	let WebIM = require("../../utils/WebIM")["default"];
	let disp = require("../../utils/broadcast");
	export default {
		data() {
			return {
				groupName: '',
				description: '',
			}
		},
		onLoad(hash) {
			this.groupId = hash.value1;
			this.groupName = hash.value2;
		},
		onShow() {
			console.log("this.groupName：",this.groupName);
		},
		methods: {
			submit(){
				const that = this;
				var options = {
				    groupId: that.groupId,
				    groupName: that.groupName,   
				    description: that.description,
				    success: function (res) {
					    console.log('res',res);
						that.$tools.toastBack('群名称修改成功',3);
				    },
				    error: function(){
				    }
				};
				WebIM.conn.modifyGroup(options);
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
		}
	}
</script>

<style lang="scss" scoped>
	@import '../safety/scss/safety';
	.initBtn{margin-top: 40%;position: absolute;bottom: 46upx;left: 0;right: 0;margin: auto;}
	.page{
		background: $globalColor-white;
		height: 100vh;
		overflow: scroll;
	}
</style>
