<template>
	<view class="pages">
		<view class="initHeader initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">{{ i18n.global.details }}</view>
			</view>
		</view>
		<view class="infoBox">
			<view class="infoBox-wrapper">
				<view class="infoBox-price">+{{ infoList.quantity }}{{ infoList.currencyName }}</view>
				<view class="infoBox-list">
					<view class="infoBox-list__title">{{ i18n.global.type }}</view>
					<view class="infoBox-list__data">{{ i18n.global.recharge }}</view>
				</view>
				<view class="infoBox-list">
					<view class="infoBox-list__title">{{ i18n.global.status }}</view>
					<view class="infoBox-list__data">{{ statusList[infoList.status] }}</view>
				</view>
				<view class="infoBox-list">
					<view class="infoBox-list__title">ID</view>
					<view class="infoBox-list__data">{{ infoList.hash }}</view>
				</view>
				<view class="infoBox-list">
					<view class="infoBox-list__title">{{ i18n.global.time }}</view>
					<view class="infoBox-list__data">{{ infoList.createTime }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			id: null,
			infoList: [],
			statusList: [this.$t('message').status.applying, this.$t('message').status.success, this.$t('message').status.cancelled, this.$t('message').status.confirming],
		};
	},
	computed: {
		i18n() {
			return this.$t('message');
		}
	},
	onLoad(hash) {
		this.id = hash.value1;
	},
	onShow(e) {
		this.getDetails();
	},
	methods: {
		getDetails(id) {
			this.$Ajax(
				'/front/financial/detailInfo',
				{
					type: 1, //type  1 充值  type2 提现
					id: this.id
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.infoList = res.obj;
					}
				}
			);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/assets_recharge_detail';
</style>
