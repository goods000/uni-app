<template>
	<view class="pages">
		<view class="header_bar">
			<view class="header">
				<view class="header-goBack" @click="$tools.back(1)"></view>
				<view class="header-title">账户管理</view>
			</view> 
		</view> 
		
		<view class="account">
			<view class="account-wrapper">
				<view class="account-box">
					<view class="account-box__name">
						<text>{{userList.name}}</text>
						<image src="../../static/user/icon-user-more.png" mode="widthFix" @click="openPopup('securityPopup')"></image>
					</view>
					<view class="account-box__title">钱包地址: </view>
					<view class="account-box__address">
						<view class="account-box__address-num">
							{{userList.address}}
						</view>
						<image src="../../static/public/icon-record.png" mode="widthFix" @click="$tools.copy(userList.address)"></image>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 交易框 -->
		<uni-popup ref="psdPopup" type="center" :animation="true" @change="changePopup($event,'psdPopup')">
			<view class="frameBox">
				<view class="frameBox-wrapper">
					<view class="frameBox-wrapper__label">归集汇总</view>
				</view>
				<view class="frameBox-input">
					<input type="password" placeholder="请输入交易密码" placeholder-style="color:#cccccc"  v-model="password"/>
				</view>
				<view class="frameBox-btn">
					<view class="frameBox-btn__close" @click="hidePopup('psdPopup')">取消</view>
					<view class="frameBox-btn__config" @click="config()">确定</view>
				</view>
			</view>
		</uni-popup>
		
		<!-- 安全验证 -->
		<uni-popup ref="securityPopup" type="bottom" :animation="true">
			<view class="listBox">
				<view class="listBox-form" @click="operate(1)">
					<view class="listBox-form__label">修改钱包名称</view>
				</view>
				<view class="listBox-form" @click="operate(2)">
					<view class="listBox-form__label">导出助记词</view>
				</view>
				<view class="listBox-form" @click="operate(3)">
					<view class="listBox-form__label">导出私钥</view>
				</view>
				<view class="listBox-form" @click="logout()">
					<view class="listBox-form__label">退出账户</view>
				</view>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: { uniPopup },
			data(){
				return{
					password:'',
					userList:[
						{name:'哪里来的小饼干',address:'s3Y8VTUQNhsYmtJDUrsSFKXTKLze2HJJb'},
					],
					type:'',
				}
			},
			onShow() {
				this.init();
			},
			methods: {
				init(){
					this.getUserList();
				},
				// 修改钱包名称
				operate(type) {
					this.hidePopup('securityPopup');
					// this.openPopup('psdPopup');this.hidePopup('securityPopup');
					this.type = type;
					if(this.type == 1){
						this.$tools.jump('./editName');
					}else if(this.type == 2){
						this.$tools.jump('./words',1);
					}else if(this.type == 3){
						this.$tools.jump('./words',2);
					}
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
				config(){
					if(this.password == ''){
						return this.$tools.toast("请输入交易密码");
					}
					this.$Ajax('/front/address/get/address',{
							pwd: this.password
						},
						res => {
							if (res.code == 0) {
								this.hidePopup('securityPopup');
								if(this.type == 1){
									this.hidePopup('psdPopup');
									this.$tools.jump(res.msg,'./editName');
								}else if(this.type == 2){
									this.hidePopup('psdPopup');
									this.$tools.toastJump(res.msg,'./words',1);
								}else if(this.type == 3){
									this.hidePopup('psdPopup');
									this.$tools.toastJump(res.msg,'./words',2);
								}
							}
						}
					);
				},
				logout() {
					let that = this;
					this.$Ajax('/front/logout', {}, res => {
						uni.removeStorage({
							key: 'token',
							success() {
								uni.removeStorageSync('information');
								uni.removeStorageSync('wordList');
								uni.removeStorageSync('sortArr');
								uni.removeStorageSync('wordsArr');
								uni.removeStorageSync('passphrase');
								that.$tools.toastJump('安全退出成功', '../operate/first');
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
					if (e.show) {
						uni.hideTabBar();
					} else {
						uni.showTabBar();
					}
				}
			},
		}
	</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/account/account';
</style>
