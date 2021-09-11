<template>
	<view class="pages">
		<view class="initHeader initHeader--black">
			<view class="initHeader-wrapper"><view class="initHeader-back" @click="$tools.back(1)"></view></view>
		</view>

		<view class="titleBox">
			<view class="titleBox-wrapper">
				<view class="titleBox-title">绑定您的交易账户</view>
				<view class="titleBox-note">请选择一下身份进行绑定</view>
			</view>
		</view>

		<view class="accountBox">
			<view class="accountBox-wrapper">
				<view class="accountBox-item">
					<view class="accountBox-item__title">跟随者</view>
					<view class="accountBox-item__plane accountBox-item__plane--1">
						<view class="accountBox-item__label">跟随者</view>
						<view class="accountBox-item__desc">成为OneToken跟随者，将享有跟随全球加密货币优秀交易员，同步复制交易策略，通过灵活的跟随机制进行绑定。</view>
						<view class="accountBox-item__btn" @click="$tools.jump('../documentary/documentary_choose', 2)">立即绑定</view>
					</view>
				</view>
				<view class="accountBox-item">
					<view class="accountBox-item__title">交易员</view>
					<view class="accountBox-item__plane accountBox-item__plane--2">
						<view class="accountBox-item__label">合约交易员</view>
						<view class="accountBox-item__desc">成为OneToken交易员，您将录入合约交易先锋排行榜，并实时在社区展现您的交易策略及交易记录。</view>
						<view class="accountBox-item__btn" @click="$tools.jump('../documentary/documentary_choose', 1)">立即绑定</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			authInfo: [],
			userInfo: [],

			nickName: ''
		};
	},
	onShow() {
		// this.init();
	},
	methods: {
		init() {
			this.getBaseInfo();
		},
		getBaseInfo() {
			this.$Ajax('/front/user/baseInfo', {}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.userInfo = res.obj;
				}
			});
		},
		uploadAvatar() {
			let that = this;
			uni.chooseImage({
				count: 1, //默认9
				sourceType: ['album'], //从相册选择
				success: res => {
					console.log(JSON.stringify(res.tempFilePaths));

					let tempFilePaths = res.tempFilePaths[0];
					let token = uni.getStorageSync('token');
					let files = [];
					files.push({ name: 'file', uri: tempFilePaths });
					let data = {
						token: token
					};

					uni.uploadFile({
						url: weburl.webUrl + '/front/user/modify/image',
						files: files,
						header: { token: token },
						formData: data,
						success: res => {
							console.log(data);
							that.getBaseInfo();
						},
						fail(err) {}
					});
				},
				fail: function() {
					console.log('上传图片接口调用失败');
					return;
				}
			});
		},
		modifyNickName() {
			if (this.nickName == '') {
				return this.$tools.toast('请输入您的昵称');
			}
			this.$Ajax(
				'/front/user/modify/name',
				{
					name: this.nickName
				},
				res => {
					if (res.code == 0) {
						this.hidePopup('nickNamePopup');
						this.$tools.toast('修改成功');
						this.getBaseInfo();
					}
				}
			);
		},
		/* 弹出框公用 */
		openPopup(e) {
			this.nickName = this.userInfo.name;
			this.$refs[e].open();
		},
		hidePopup(e) {
			this.$refs[e].close();
		},
		changePopup(e) {
			console.log('popup ' + e.type + ' 状态', e.show);
			if (!e.show) {
				// this.tradepwd = '';
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/documentary_bind';
</style>
