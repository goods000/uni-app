<template>
	<view class="pages">
		<view class="import setup">
			
			<view class="importBox-header">
				<view class="importBox-header-left" @click="$tools.back(1)">
					<image src="../../static/operate/icon-back.png" mode="widthFix"></image>
				</view>
			</view>
			
			<view class="importBox-txt">创建地址</view>
			
			<view class="importBox-list">
				<view class="importBox-list-item">
					<input type="text" placeholder="请输入钱包名称" placeholder-style="color:#999999" v-model="username" />
				</view>
				<view class="importBox-list-item">
					<input type="password" placeholder="请输入钱包密码" placeholder-style="color:#999999" v-model="password" />
				</view>
				<view class="importBox-list-item">
					<input type="password" placeholder="请再次输入确认密码" placeholder-style="color:#999999" v-model="re_password" />
				</view>
			</view>
			
			<view class="importBox-btn">
				<view class="initBtn" @click="submit()">
					下一步
				</view>
			</view>
			
			<view class="setup-title">
				<view class="setup-title-txt">注意：</view>
				<view class="setup-title-txt">钱包不会储存用户密码，无法提供找回或重置功能。如果忘记密码，用户只能通过自己备份的助记词或私钥，重新导入后重新设置密码。</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username:'',
				password:'',
				re_password:'',
			}
		},
		onLoad(value) {
			// #ifdef H5
				this.parentName = ''
			// #endif
			// #ifdef APP-PLUS
				this.parentName = value.value1;
				// this.parentName = hash.split('parentName=')[1];
				console.log("this.parentName",this.parentName);
			// #endif
		},
		onShow() {
			
		},
		methods: {
			submit(){
				// this.$tools.toastJump('导入成功', '../operate/backups');
				if (this.username == '' ) {
					return this.$tools.toast('请输入钱包名称');
				}
				if (this.password == '' ) {
					return this.$tools.toast('请输入钱包密码');
				}
				if (this.re_password == '' ) {
					return this.$tools.toast('请再次输入确认密码');
				}
				if (this.password != this.re_password){
					return this.$tools.toast('两者密码不一致');
				}
				
				const obj = {name: this.username, pwd:this.password,parentName:this.parentName}
				
				if (uni.getStorageSync('wordsList')) {
					uni.removeStorageSync('wordsList');
					uni.removeStorageSync('sortArr');
					uni.removeStorageSync('wordsArr');
				}
				
				uni.setStorageSync('information', obj);
				this.$tools.toastJump('成功', '../operate/seeWords');
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/operate/import';
	page{background: #FFFFFF;}
</style>
