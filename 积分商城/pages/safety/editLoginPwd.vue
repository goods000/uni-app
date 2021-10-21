<template>
	<view class="pages bg_header">
		<view class="initHeader initHeader--bgStyle initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">修改登录密码</view>
			</view>
		</view>

		<view class="main">
			<view class="contentTrans contentTrans-no">
				<view class="inputBox">
					<view class="inputBox-wrapper">
						<view class="inputBox-item" :class="{ 'inputBox-item--active': isFocus == 0}">
							<view class="inputBox-item__label">旧密码</view>
							<view class="inputBox-item__list">
								<view class="inputBox-item__input">
									<input type="password" @blur="blurInput(0)" @focus="focusInput(0)" placeholder-class="inputBox-item__placeholder"
										placeholder="请输入旧登录密码" v-model="oldPassword" />
								</view>
							</view>
						</view>
						<view class="inputBox-item" :class="{ 'inputBox-item--active': isFocus == 1}">
							<view class="inputBox-item__label">新登录密码</view>
							<view class="inputBox-item__list">
								<view class="inputBox-item__input">
									<input type="password" @blur="blurInput(1)" @focus="focusInput(1)" placeholder-class="inputBox-item__placeholder"
										placeholder="请输入新的登录密码" v-model="newPassword" />
									<!-- <view class="inputBox-item__fixedBox"></view> -->
								</view>
							</view>
						</view>
						<view class="inputBox-item" :class="{ 'inputBox-item--active': isFocus == 2}">
							<view class="inputBox-item__label">确认密码</view>
							<view class="inputBox-item__list">
								<view class="inputBox-item__input">
									<input type="password" @blur="blurInput(2)" @focus="focusInput(2)" placeholder-class="inputBox-item__placeholder"
										placeholder="请再次输入登录密码进行确认" v-model="configPassword" />
								</view>
							</view>
						</view>
						
						
					</view>
				</view>
			</view>
			
			<view class="initBtn" @click="config()">
				确定
			</view>
			
		</view>

	</view>
</template>

<script>
import chartList from '../echart/chartList.vue';
	
export default {
	components: { chartList },
	data() {
		return {
			isFocus: null,
			oldPassword: '',
			newPassword: '',
			configPassword: '',
		};
	},
	onShow() {
	},
	methods: {
		focusInput(index) {
			this.isFocus = index;
		},
		blurInput(index) {
			this.isFocus = null;
		},
		config() {
			let that = this;
			if (this.oldPassword == '') {
				return this.$tools.toast('请输入旧登录密码');
			}
			if (this.newPassword == '') {
				return this.$tools.toast('请输入新的登录密码');
			}
			if (this.configPassword == '') {
				return this.$tools.toast('请再次输入登录密码进行确认');
			}
			if (this.configPassword != this.newPassword) {
				return this.$tools.toast('两者密码不一致');
			}
			this.$Ajax('/front/user/changePwd',
				{
					pwd: this.oldPassword,
					newPwd: this.newPassword,
					reNewPwd: this.configPassword,
				},
				res => {
					console.log(JSON.stringify(res.data));
					if (res.code == 0) {
						uni.removeStorage({
							key: 'token',
							success() {
								uni.removeStorageSync('statusPopup');
								that.$tools.toastJump('修改成功', '../operate/login');
							}
						})
					}
				}
			);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/transaction/transaction';
.initBtn{
	margin-top: 500upx;
}
</style>
