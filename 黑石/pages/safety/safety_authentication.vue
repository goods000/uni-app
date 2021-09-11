<!-- 实名认证 -->
<template>
	<view class="pages">
		<view class="initHeader initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back()"></view>
				<view class="initHeader-title">实名认证</view>
			</view>
		</view>
		<view class="main">
			<view class="formBox">
				<view class="formBox-wrapper">
					<view class="formBox-list">
						<view class="formBox-list__label">真实姓名</view>
						<view class="formBox-list__data">
							<input type="text" placeholder-class="formBox-list__placeholder" placeholder="请输入您的真实姓名" v-model="idCardName" />
						</view>
					</view>
					<view class="formBox-list">
						<view class="formBox-list__label">证件号码</view>
						<view class="formBox-list__data">
							<input type="text" placeholder-class="formBox-list__placeholder" maxlength="18" placeholder="请输入您的身份证号码" v-model="idCardId" />
						</view>
					</view>
				</view>
			</view>
			<view class="initButton">
				<view class="initButton-btn initButton-btn--golden" @click="next()">下一步</view>
			</view>
		</view>
	</view>
</template>
<script>
import weburl from '../../components/url.js';
export default {
	data() {
		return {
			idCardName: '',
			idCardId: ''
		};
	},
	onShow() {
		this.init();
	},
	methods: {
		init() {
			this.getAuthInfo();
		},
		getAuthInfo() {
			this.$Ajax('/front/user/authInfo', {}, res => {
				if (res.code == 0) {
					console.log(JSON.stringify(res.obj));
					this.idCardName = res.obj.auth.realName;
					this.idCardId = res.obj.auth.idcart;
				}
			});
		},
		next(){
			if (this.idCardName == '') {
				return this.$tools.toast('请输入您的真实姓名');
			}
			if (this.idCardId == '') {
				return this.$tools.toast('请输入您的身份证号码');
			}
			
			this.$Ajax('/front/user/approveOne', {
				realName: this.idCardName,
				idcart: this.idCardId,
			}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.$tools.redirectTo('../safety/safety_authentication_next');
				}
			});
		}
	}
};
</script>
<style lang="scss" scoped>
.formBox {
	&-wrapper {
		padding: 30upx;
	}
	&-list {
		margin-bottom: 30upx;
		@include clearLastMargin;
		&__label {
			margin-bottom: 15upx;
			color: #ffffff;
			font-size: 28upx;
		}

		&__data {
			color: #ffffff;
			font-size: 32upx;
			border-bottom: 1upx solid $globalColor-style;
			padding: 15upx 0;
			input {
				font-size: inherit;
				width: 100%;
			}
		}

		&-placeholder {
			font-size: 32upx;
			color: #bfc0c7;
		}
	}
}

.initButton {
	padding: 30upx;
}
</style>
