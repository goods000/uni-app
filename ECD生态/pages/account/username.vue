<template>
	<view class="page">
		<view class="safety">
			<view class="header_bar header_border">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">个人信息</view>
				</view> 
			</view> 
			
			
			<view class="safety-list">
				<view class="safety-list-input" :class="{showCloseBtn: username != '' }">
					<input type="text" placeholder="请输入您的昵称" placeholder-style="color:#999999" v-model="username" />
					<view class="safety-list-input__fixedBox">
						<view class="safety-list-input__fixedBox-btn safety-list-input__fixedBox-btn--clear" @click="clearData('username')">
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
	let disp = require("../../utils/broadcast");
	var WebIM = require("../../utils/WebIM")["default"];
	export default {
		data() {
			return {
				username: '',
			}
		},
		onLoad(hash) {
			this.username = hash.value1;
		},
		onShow() {
			console.log("this.username：",this.username);
			WebIM.conn.fetchUserInfoById('test111').then((res) => {
			    console.log(res)
			})
		},
		methods: {
			submit(){
				if (this.username == '') {
					return this.$tools.toast('请输入您的昵称');
				}
				let that = this;
				WebIM.conn.updateCurrentUserNick(this.username).then((res) => {
				    that.$tools.toastBack('昵称修改成功',1);
					uni.setStorageSync('myUsername', this.username);
				})
				// WebIM.conn.updateOwnUserInfo({
				//   nickname: this.username,
				// 	success: function () {
				// 		console.log(res);
				// 		that.$tools.toastBack('昵称修改成功',1);
				// 	},
				// 	error: function (err) {
				// 		that.$tools.jump('修改失败');
				// 	},
				// })
				// this.$Ajax('/front/user/editName',{
				// 		name: this.username,
				// 	},
				// 	res => {
				// 		console.log(JSON.stringify(res));
				// 		if (res.code == 0) {
				// 			that.$tools.toastBack('昵称修改成功',1);
				// 		}
				// 	}
				// );
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
