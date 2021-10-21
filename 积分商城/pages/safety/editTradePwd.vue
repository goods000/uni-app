<template>
	<view class="pages bg_header">
		<view class="initHeader initHeader--bgStyle initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">修改交易密码</view>
			</view>
		</view>

		<view class="main">
			<view class="contentTrans contentTrans-no">
				<view class="inputBox">
					<view class="inputBox-wrapper">
						<view class="inputBox-item" :class="{ 'inputBox-item--active': isFocus == 0}">
							<view class="inputBox-item__label">绑定账号</view>
							<view class="inputBox-item__list">
								<view class="inputBox-item__input">
									<input type="text" @blur="blurInput(0)" @focus="focusInput(0)" placeholder-class="inputBox-item__placeholder"
										placeholder="请输入您绑定的手机/邮箱号" v-model="phone" />
								</view>
							</view>
						</view>
						<view class="inputBox-item" :class="{ 'inputBox-item--active': isFocus == 1}">
							<view class="inputBox-item__label">验证码</view>
							<view class="inputBox-item__list">
								<view class="inputBox-item__input">
									<input type="text" @blur="blurInput(1)" @focus="focusInput(1)" placeholder-class="inputBox-item__placeholder"
										placeholder="请输入短信验证码" v-model="code" />
									<view class="inputBox-item__verify" @click="sendCode()" v-if="isSend">{{ remain }}</view>
									<view class="inputBox-item__verify" v-else>{{ remain }}</view>
								</view>
							</view>
						</view>
						<view class="inputBox-item" :class="{ 'inputBox-item--active': isFocus == 2}">
							<view class="inputBox-item__label">新交易密码</view>
							<view class="inputBox-item__list">
								<view class="inputBox-item__input">
									<input type="password" @blur="blurInput(2)" @focus="focusInput(2)" placeholder-class="inputBox-item__placeholder"
										placeholder="请输入新的交易密码" v-model="newPassword" />
								</view>
							</view>
						</view>
						<view class="inputBox-item" :class="{ 'inputBox-item--active': isFocus == 3}">
							<view class="inputBox-item__label">确认密码</view>
							<view class="inputBox-item__list">
								<view class="inputBox-item__input">
									<input type="password" @blur="blurInput(3)" @focus="focusInput(3)" placeholder-class="inputBox-item__placeholder"
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
			phone: '',
			code: '',
			newPassword: '',
			configPassword: '',
			zone: '86',
			// 验证码
			remain: '获取验证码',
			isSend: true,
			time: 60,
			timer: null,
			
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
		sendCode() {
			uni.showLoading({
				title: '发送中',
				mask: true
			});
			if (this.phone == '' ) {
				return this.$tools.toast('请输入您绑定的手机/邮箱号');
			}
			if(this.tabsActive == 0){
				if (this.phone.length!=11 || !/^((1[0-9])+\d{9})$/.test(this.phone)){
					return this.$tools.toast('请输入正确的手机号');
				}
			}
			if(this.tabsActive == 1){
				if(!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g.test(this.phone)){
					return this.$tools.toast('请输入正确的邮箱');
				}
			}
			this.$Ajax(
				'/ajax/sendCode',
				{
					phoneEmail: this.phone,
					zone: this.zone
				},
				res => {
					if (res.code == 0) {
						this.$tools.toast('发送成功 ');
		
						this.isSend = false;
						this.remain = this.time + 's';
						this.timer = setInterval(() => {
							this.time--;
							this.remain = this.time + 's';
							if (this.time == 0) {
								clearInterval(this.timer);
								this.remain = '重新获取';
								(this.isSend = true), (this.time = 60);
							}
						}, 1000);
					}
				}
			);
			uni.hideLoading();
		},
		config() {
			if (this.phone == '') {
				return this.$tools.toast('请输入您绑定的手机/邮箱号');
			}
			if(this.phone.indexOf("@") <0){
				if (this.phone.length!=11 || !/^((1[0-9])+\d{9})$/.test(this.phone)){
					return this.$tools.toast('请输入正确的手机号');
				}
			}
			if(this.phone.indexOf("@") >-1){
				if(!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g.test(this.phone)){
					return this.$tools.toast('请输入正确的邮箱');
				}
			}
			if (this.code == '') {
				return this.$tools.toast('请输入短信验证码');
			}
			if (this.newPassword == '') {
				return this.$tools.toast('请输入新的交易密码');
			}
			if (this.configPassword == '') {
				return this.$tools.toast('请再次输入登录密码进行确认');
			}
			if (this.configPassword != this.newPassword) {
				return this.$tools.toast('两者密码不一致');
			}
			this.$Ajax('/front/user/changeTradePwd',
				{       
					code: this.code,
					tradePwd: this.newPassword,
				},
				res => {
					console.log(JSON.stringify(res.data));
					if (res.code == 0) {
						this.$tools.toastBack('修改成功', 1);
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
