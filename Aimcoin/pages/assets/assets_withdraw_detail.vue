<template>
	<view class="pages" :data-theme="pageTheme">
		<view class="initHeader initHeader--fixed" :class="pageTheme == 'light' ? 'initHeader--black' : 'initHeader--white'">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">记录详情</view>
			</view>
		</view>
		<view class="infoBox">
			<view class="infoBox-wrapper">
				<view class="infoBox-header">
					<view class="infoBox-header__label">提币{{ detailInfo.currencyName }}</view>
					<view class="infoBox-header__data">{{ detailInfo.quantity }}</view>
				</view>
				<view class="infoBox-list">
					<view class="infoBox-list__label">状态</view>
					<view class="infoBox-list__data">{{ statusList[detailInfo.status] }}</view>
				</view>
				<view class="infoBox-list">
					<view class="infoBox-list__label">提币地址</view>
					<view class="infoBox-list__data infoBox-list__data--style">{{ detailInfo.address }}</view>
				</view>
				<view class="infoBox-list" v-if="detailInfo.hash != ''">
					<view class="infoBox-list__label">交易哈希</view>
					<view class="infoBox-list__data">{{ detailInfo.hash }}</view>
				</view>
				<view class="infoBox-list">
					<view class="infoBox-list__label">手续费</view>
					<view class="infoBox-list__data">{{ detailInfo.rate }} USDT</view>
				</view>
				<view class="infoBox-list">
					<view class="infoBox-list__label">时间</view>
					<view class="infoBox-list__data">{{ detailInfo.createTime }}</view>
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
			detailInfo: [],
			statusList: ['申请中', '成功', '取消', '确认中'],
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
		this.getDetail();
	},
	methods: {
		getDetail() {
			this.$Ajax(
				'/front/financial/detailInfo',
				{
					type: 2, //type  1 充值  type2 提现
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
@import '/scss/assets_withdraw_detail';
</style>
