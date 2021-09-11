<template>
	<view class="page">
		<view class="safety">
			<view class="header_bar">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">修改钱包名称</view>
				</view> 
			</view> 
			
			<view class="safety-list">
				<view class="safety-list-title">修改钱包名称</view>
				<view class="safety-list-input">
					<input type="text" placeholder="请输入您的修改钱包名称" placeholder-style="color:#999999" v-model="name"/>
				</view>
			</view>
			
			<view class="initBtn" @click="submit()">确定</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				eyeShow: '../../static/public/icon-login-see.png',
				eyeHide: '../../static/public/icon-login-nosee.png',
				eyeShowHideArray: [{ show: false }, { show: false }, { show: false }, { show: false }],
				loginStatus:'',
				userList:[],
			}
		},
		onShow() {
			this.loginStatus = uni.getStorageSync('loginStatus');
			// console.log(this.loginStatus);
			this.init();
		},
		methods: {
			init(){
				this.getUserList(); 
			},
			// 获取用户信息
			getUserList() {
				this.$Ajax('/front/userPassphrase/baseInfo', {}, res => {
						if (res.code == 0) {
							this.userList = res.obj;
						}
					}
				);
			},
			toggleEyeStatus(index) {
				this.eyeShowHideArray[index].show = !this.eyeShowHideArray[index].show;
			},
			submit(){
				if (this.name == '') {
					return this.$tools.toast('请输入您的修改钱包名称');
				}
				this.$Ajax('/front/userPassphrase/updateUserName',{
						name: this.name,
					},
					res => {
						console.log(JSON.stringify(res));
						if (res.code == 0) {
							this.name = '';
							this.$tools.toastBack('修改成功', 1);
						}
					}
				);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/safety/safety';
	.initBtn{margin-top: 40%;position: absolute;bottom: 46upx;left: 0;right: 0;margin: auto;}
</style>
