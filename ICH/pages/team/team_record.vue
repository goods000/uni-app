<template>
	<view class="pages">
		<view class="initHeader initHeader--bgWhite initHeader--line initHeader--fixed initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">权益证明</view>
			</view>
		</view>
		<view class="main">
			<view class="listBox">
				<view class="listBox-wrapper">
					<view class="initNoData" v-if="inviteRecord.length == 0"></view>
					<view class="listBox-item" v-for="(item,index) in inviteRecord" :key="index">
						<view class="listBox-list">
							<view class="listBox-list__label">时间</view>
							<view class="listBox-list__data">{{ item.createTime }}</view>
						</view>
						<view class="listBox-list">
							<view class="listBox-list__label">数量</view>
							<view class="listBox-list__data">ICH≈{{ item.money }}USDT</view>
						</view>
						<view class="listBox-list">
							<view class="listBox-list__label">备注</view>
							<view class="listBox-list__data">{{ item.remark }}</view>
						</view>
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
			inviteRecord: []
		};
	},
	onShow() {
		this.init();
	},
	methods: {
		init() {
			this.getInviteRecord(); // 获取我的个人信息
		},
		// 获取我的个人信息
		getInviteRecord() {
			this.$Ajax('/front/user/teamReward', {}, res => {
				if (res.code == 0) {
					console.log(JSON.stringify(res.obj))
					this.inviteRecord = res.obj.list;
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
page,.pages{
	background-color: #f9f9f9;
}
.listBox {
	padding: 30upx;
	&-title{
		margin-bottom: 30upx;
		font-size: 32upx;
		color: #101010;
	}
	&-item{
		margin-bottom: 30upx;
		background-color: #f3f3f3;
		border-radius: 15upx;
		padding: 15upx 30upx;
	}
	&-list {
		padding: 15upx 0;
		@include flexBetween;
		&__avatar {
			width: 60upx;
			height: 60upx;
			border-radius: 50%;
			overflow: hidden;
			margin-right: 30upx;
			@include fullImage;
		}
		&__info {
			flex: 1;
		}
		&__label {
			font-size: 28upx;
		}
		&__data {
			font-size: 28upx;
		}
	}
}
</style>
