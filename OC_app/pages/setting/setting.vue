<template>
	<view class="pages">
		<view class="">
			<view class="header_bar header_bg header_border">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">安全中心</view>
				</view> 
			</view> 
			
			<view class="user-list">
				<view class="user-list-type" @click="$tools.jump('../setting/editPassword')">
					<view class="user-list-left">
						<view class="user-list-name">修改钱包密码</view>
					</view>
					<image src="../../static/public/icon-next.png" class="next_img">
				</view>
				<view class="user-list-type" @click="$tools.jump('../setting/resetPassword')">
					<view class="user-list-left">
						<view class="user-list-name">重置钱包密码</view>
					</view>
					<image src="../../static/public/icon-next.png" class="next_img">
				</view>
				<view class="user-list-type" @click="getSecurity()">
					<view class="user-list-left">
						<view class="user-list-name">导出钱包信息</view>
					</view>
					<image src="../../static/public/icon-next.png" class="next_img">
				</view>
			</view>
			<view class="mt"></view>
			<view class="initBtn-box">
				<view class="initBtn" @click="logout()">安全退出</view>
			</view>
		</view>
		
		<!-- 安全验证 -->
		<uni-popup ref="securityPopup" type="bottom" :animation="true">
			<view class="oppupBox">
				<view class="header_bar">
					<view class="header">
						<view class="header-title">安全验证</view>
						<view class="header-right" @click="close()">
							<image src="../../static/public/icon-close.png" mode="widthFix"></image>
						</view> 
					</view> 
				</view>
				<view class="oppupBox-form">
					<view class="oppupBox-form-label">钱包密码</view>
					<input type="password" placeholder="请输入您的钱包密码" v-model="password"/>
				</view>
				<view class="oppupBox-forget" @click="close()">忘记钱包密码？</view>
				<view class="initBtn" @click="payOrder()">立即导出</view>
			</view>
		</uni-popup>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				password:'',
			}
		},
		onShow() {
	
		},
		methods: {
			// 安全验证
			getSecurity() {this.openPopup('securityPopup');},
			close() {this.hidePopup('securityPopup');},
			payOrder(){
				if(this.password == ''){
					return this.$tools.toast("请输入您的钱包密码");
				}
				this.$Ajax(
					'/front/address/get/address',
					{
						pwd: this.password
					},
					res => {
						if (res.code == 0) {
							this.hidePopup('securityPopup');
							this.$tools.toastJump(res.msg,'../setting/account',res.obj.address,res.obj.privateKey,res.obj.passphrase);
						}
					}
				);
			},
			logout() {
				let that = this;
				uni.removeStorageSync('userId');
				this.$Ajax('/front/logout', {}, res => {
					uni.removeStorage({
						key: 'token',
						success() {
							that.$tools.toastJump(res.msg, '../operate/first');
						}
					});
				});
			},
			/* 弹出框公用 */
			openPopup(e, item) {
				this.popupInfo = item;
				this.$refs[e].open();
			},
			hidePopup(e) {
				this.$refs[e].close();
			},
			changePopup(e) {
				console.log('popup ' + e.type + ' 状态', e.show);
				if (!e.show) {
					this.pay_password = '';
				}
			}
		}
	}
</script>


<style lang="scss" scoped>
	@import '@/common/scss/pages/setting/setting';
	page{background: #FFFFFF;}
</style>
