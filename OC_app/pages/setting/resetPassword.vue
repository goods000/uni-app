<template>
	<view class="pages">
		<view class="header_bar header_bg header_border">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">重置钱包密码</view>
			</view> 
		</view> 
		<view class="form">
			<view class="formBox">
				<view class="importBox-text-label">助记词\私钥</view>
				<view class="importBox-text">
					<textarea placeholder="请输入助记词或私钥重置密码,助记词用空格分隔开" v-model="words" placeholder-style="color:#999999" />
				</view>
				<view class="formBox-group">
					<input type="test" placeholder="请输入钱包名称" v-model="name" placeholder-style="color:#999999"/>
				</view>
				<view class="formBox-group">
					<input type="password" placeholder="请输入钱包新密码" v-model="newPassword" placeholder-style="color:#999999"/>
				</view>
				<view class="formBox-group">
					<input type="password" placeholder="请再次输入钱包新密码" v-model="confirmPassword" placeholder-style="color:#999999"/>
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
				words: '',
				name: '',
				newPassword: '',
				confirmPassword: '',
			}
		},
		onLoad() {
		},
		methods:{
			submit() {
				if(this.words == ''){
					return this.$tools.toast('请输入助记词或私钥重置密码,助记词用空格分隔开');
				}
				if(this.name == ''){
					return this.$tools.toast('请输入钱包名称');
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
				this.$Ajax('/front/user/reset/pwd', {
					address: this.words,
					pwd: this.newPassword,
					name: this.name,
				}, res => {
					if (res.code == 0) {
						this.words ='',
						this.name ='',
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
	@import '@/common/scss/pages/operate/import';
	page{background: #FFFFFF;}
	.formBox{
		padding-top: 46upx;
	}
</style>
