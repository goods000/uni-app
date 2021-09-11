<template>
	<view class="pages">
		<view class="initHeader initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back()"></view>
				<view class="initHeader-title">Details</view>
			</view>
		</view>
		<view class="infoBox">
			<view class="infoBox-wrapper">
				<view class="infoBox-label">{{ detailInfo.currencyName }}({{ detailInfo.type == 1 ? i18n.transfer_details.out : i18n.transfer_details.in }})</view>
				<view class="infoBox-data">{{ detailInfo.type == 2 || detailInfo.type == 4 || detailInfo.type == 8 ? detailInfo.fee : detailInfo.amount }}</view>
			</view>
		</view>
		<view class="listBox">
			<view class="listBox-wrapper">
				<view class="listBox-list">
					<view class="listBox-list__label">{{ i18n.global.status }}</view>
					<view class="listBox-list__data">{{ statusList[detailInfo.status] }}</view>
				</view>
				<view class="listBox-list">
					<view class="listBox-list__label">{{ i18n.transfer_details.outAddress }}</view>
					<view class="listBox-list__data listBox-list__data--blue">{{ detailInfo.fromAddress }}</view>
				</view>
				<view class="listBox-list" v-if="detailInfo.type != 2">
					<view class="listBox-list__label">{{ i18n.transfer_details.inAddress }}</view>
					<view class="listBox-list__data listBox-list__data--blue">{{ detailInfo.toAddress }}</view>
				</view>
				<view class="listBox-list">
					<view class="listBox-list__label">ID</view>
					<view class="listBox-list__data listBox-list__data--blue">{{ detailInfo.txHash }}</view>
				</view>
				<view class="listBox-list">
					<view class="listBox-list__label">{{ i18n.global.serviceCharge }}</view>
					<view class="listBox-list__data">{{ detailInfo.fee }}{{ detailInfo.currencyName }}</view>
				</view>
				<view class="listBox-list">
					<view class="listBox-list__label">{{ i18n.global.time }}</view>
					<view class="listBox-list__data">{{ detailInfo.createTime }}</view>
				</view>
				<view class="listBox-list">
					<view class="listBox-list__label">{{ i18n.global.blockHeight }}</view>
					<view class="listBox-list__data">{{ detailInfo.height != null ? detailInfo.height : '---' }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			typeList: ['转账', '激活账号', '挖矿收益', '提币'],
			statusList: [this.$t('message').status.confirming, this.$t('message').status.success],
			id: 0,
			detailInfo: []
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
	onShow() {
		this.getDetail();
	},
	methods: {
		getDetail() {
			this.$Ajax(
				'/front/transfer/tx/detail',
				{
					id: this.id
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.detailInfo = res.obj;
					}
				}
			);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/assets_transfer_detail';
</style>
