<template>
	<view class="pages">
		<view class="initHeader initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back()"></view>
				<view class="initHeader-title">我的邀请</view>
			</view>
		</view>
		<view class="main">
			<view class="titleBox">
				<view class="titleBox-wrapper">
					<view class="titleBox-title"><image src="../../static/invite/icon-title.png" mode="widthFix"></image></view>
					<view class="titleBox-desc">好友交易拿返佣，赚取每月100美金至100万美金不等的金额</view>
				</view>
			</view>
			<view class="bgBox"><image src="../../static/invite/icon-bg.png" mode="widthFix"></image></view>
			<view class="listBox">
				<view class="listBox-wrapper">
					<view class="listBox-list">
						<view class="listBox-list__label">{{ shareCode }}</view>
						<view class="listBox-list__btn" @click="$tools.copy(shareCode)">复制邀请码</view>
					</view>
					<view class="listBox-list">
						<view class="listBox-list__label">{{ shareAddress }}</view>
						<view class="listBox-list__btn" @click="$tools.copy(shareAddress)">复制邀请链接</view>
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
			shareAddress: '',
			shareCode: '',
		};
	},
	onShow() {
		this.init();
	},
	methods: {
		init() {
			this.getCopyLink();
		},
		getCopyLink() {
			this.$Ajax('/front/user/shareAddress', {}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.shareAddress = res.obj.address;
					this.shareCode = res.obj.inviteCode;
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/invite';
</style>
