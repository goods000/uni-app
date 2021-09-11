<template>
	<view class="pages">
		<view class="initHeader initHeader--bgWhite initHeader--line initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">个人资料</view>
			</view>
		</view>
		<view class="listBox">
			<view class="listBox-wrapper">
				<view class="listBox-list" @click="uploadAvatar()">
					<view class="listBox-list__label">头像</view>
					<view class="listBox-list__data">
						<view class="listBox-list__avatar"><image :src="userInfo.img" mode="scaleToFill"></image></view>
					</view>
				</view>
				<view class="listBox-list listBox-list--holder" @click="$tools.jump('../setting/setting_changeNickName')">
					<view class="listBox-list__label">昵称</view>
					<view class="listBox-list__data">{{ userInfo.nick }}</view>
				</view>
				<view class="listBox-list listBox-list--holder">
					<view class="listBox-list__label">UID</view>
					<view class="listBox-list__data listBox-list__data--noArrow">{{ userInfo.uuidStr }}</view>
				</view>
				<view class="listBox-list" @click="toAuthentication()">
					<view class="listBox-list__label">身份认证</view>
					<view class="listBox-list__data" :class="{ 'listBox-list__data--noArrow': this.userInfo.hasAuth == 1 }">{{ userInfo.hasAuth == 1 ? '已认证' : '未认证' }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import weburl from '../../components/url.js';
export default {
	data() {
		return {
			authInfo: [],
			userInfo: []
		};
	},
	onShow() {
		this.init();
	},
	methods: {
		init() {
			this.getUserInfo();
		},
		getUserInfo() {
			this.$Ajax('/front/user/baseInfo', {}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.userInfo = res.obj.userBase;
					this.userInfo.hasAuth = res.obj.user.hasAuth;
					this.userInfo.uuidStr = res.obj.user.uuidStr;
				}
			});
		},
		uploadAvatar() {
			let that = this;
			var token = uni.getStorageSync('token');

			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: res => {
					console.log(res);

					let files = [];
					files.push({ name: 'file', uri: res.tempFilePaths[0] });
					let data = {
						token: token,
						userImage: res.tempFilePaths[0]
					};
					uni.uploadFile({
						url: weburl.webUrl + '/front/user/userImage',
						files: files,
						header: { token: token },
						formData: data,
						success: res => {
							var data = JSON.parse(res.data);
							if (data.code == 0) {
								that.$tools.toast('提交成功');
								that.getUserInfo();
							} else {
								that.$tools.toast(data.msg);
							}
						}
					});
				},
				fail: function() {
					console.log('上传图片接口调用失败');
					return;
				}
			});
		},
		toAuthentication() {
			if (this.userInfo.hasAuth == 1) {
				return false;
			} else {
				this.$tools.jump('../setting/setting_authentication');
			}
		}
	}
};
</script>

<style lang="scss" scoped>
page,.pages {
	background-color: #f7f8fc;
}
.listBox {
	// padding: 0 30upx;
	// padding-top: 92upx;
	&-list {
		@include flexBetween;
		align-items: stretch;
		padding: 30upx;
		font-size: 32upx;
		color: #101010;
		border-bottom: 2upx solid #c6d2e4;
		background-color: #ffffff;

		&--holder {
			margin-bottom: 15upx;

			& + view {
				border-top: 2upx solid #c6d2e4;
			}
		}

		&--btn {
			@include flexCenter;
			margin-top: 60upx;
			border-top: 2upx solid #c6d2e4;
		}

		&__label {
			@include flexCenter;
			&--colorRed {
				color: #f75555;
			}
		}

		&__data {
			@include flexCenter;
			color: #bfc0c7;
			padding-right: 30upx;
			background: url(@/static/public/icon-arrow-right-grey.png) no-repeat;
			background-size: 14upx 26upx;
			background-position: right center;

			&--noArrow {
				padding-right: 0;
				background: none;
			}
		}
		&__avatar {
			width: 80upx;
			height: 80upx;
			border-radius: 50%;
			overflow: hidden;
			@include fullImage;
			image{
				height: 100%;
			}
		}
	}
}
</style>
