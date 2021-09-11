<template>
	<view class="pages">
		<view class="header_bar header_bg header_border">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">修改钱包密码</view>
			</view> 
		</view> 
		<view class="form">
			<view class="formBox">
				<view class="formBox-group">
					<input type="password" placeholder="请输入钱包原密码" v-model="oldPassword" />
				</view>
				<view class="formBox-group">
					<input type="password" placeholder="请输入钱包新密码" v-model="newPassword" />
				</view>
				<view class="formBox-group">
					<input type="password" placeholder="请再次输入钱包新密码" v-model="confirmPassword" />
				</view>
			</view>
			
			<view class="mt"></view>
			<view class="initBtn" @click="submit()">确定</view>
			
			<view class="formBox-tips">
				<view class="formBox-tips-title">注意：</view>
				<view class="formBox-tips-title">钱包不会储存用户密码，无法提供找回或重置功能。如果忘记密码，用户只能通过自己备份的助记词或私钥，重新导入后重新设置密码。</view>
			</view>
		</view>
	</view>
</template>

<script>
	import md5 from '../../common/js/md5.js';
	export default {
		data() {
			return {
				oldPassword: '',
				newPassword: '',
				confirmPassword: '',
			}
		},
		onLoad() {
		},
		methods:{
			submit() {
				if(this.oldPassword == ''){
					return this.$tools.toast('请输入钱包原密码');
				}
				if(this.newPassword == ''){
					return this.$tools.toast('请输入钱包新密码');
				}
				if(this.confirmPassword == ''){
					return this.$tools.toast('请再次输入钱包新密码');
				}
				if(this.confirmPassword != this.newPassword){
					return this.$tools.toast('两者密码不一致');
				}
				this.$Ajax('/front/user/changePwd', {
					pwd: this.oldPassword,
					newPwd: this.newPassword,
					reNewPwd: this.confirmPassword,
				}, res => {
					if (res.code == 0) {
						this.oldPassword ='',
						this.newPassword ='',
						this.confirmPassword ='',
						this.$tools.toast(res.msg);
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/setting/setting';
	page{background: #FFFFFF;}
</style>
