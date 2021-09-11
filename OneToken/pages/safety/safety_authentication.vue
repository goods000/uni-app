<!-- 实名认证 -->
<template>
	<view class="pages">
		<view class="initHeader initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">实名认证</view>
			</view>
		</view>
		<view class="main">
			<view class="initFormBox">
				<view class="initFormBox-wrapper">
					<view class="initFormBox-item">
						<view class="initFormBox-item__label">真实姓名</view>
						<view class="initFormBox-item__list">
							<view class="initFormBox-item__input">
								<input type="text" placeholder-class="initFormBox-item__placeholder" placeholder="请输入您的真实姓名" v-model="idCardName" />
							</view>
						</view>
					</view>
					<view class="initFormBox-item">
						<view class="initFormBox-item__label">证件号码</view>
						<view class="initFormBox-item__list">
							<view class="initFormBox-item__input">
								<input type="text" placeholder-class="initFormBox-item__placeholder" maxlength="18" placeholder="请输入您的身份证号码" v-model="idCardId" />
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="initButton initButton--absolute"><view class="initButton-btn initButton-btn--style" @click="next()">下一步</view></view>
		</view>
	</view>
</template>
<script>
import weburl from '@/common/js/url.js';
export default {
	data() {
		return {
			idCardName: '',
			idCardId: ''
		};
	},
	onShow() {
		// this.init();
	},
	methods: {
		init() {
			this.getAuthInfo();
		},
		getAuthInfo() {
			this.$Ajax('/front/user/authInfo', {}, res => {
				if (res.code == 0) {
					console.log(JSON.stringify(res.obj));
					this.idCardName = res.obj.realName;
					this.idCardId = res.obj.idcart;
				}
			});
		},
		next() {
			if (this.idCardName == '') {
				return this.$tools.toast('请输入您的真实姓名');
			}
			if (this.idCardId == '') {
				return this.$tools.toast('请输入您的身份证号码');
			}

			this.$Ajax(
				'/front/user/approveOne',
				{
					realName: this.idCardName,
					idcart: this.idCardId
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						// this.$tools.toastBack('提交成功', 1);
						this.$tools.jump('../safety/safety_authentication_next');
					}
				}
			);
		}
	}
};
</script>
<style lang="scss" scoped>
@import '/scss/safety_authentication';
</style>
