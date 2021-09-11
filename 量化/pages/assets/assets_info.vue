<template>
	<view class="pages">
		<view class="initHeader initHeader--fixed initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">记录</view>
			</view>
		</view>
		<view class="main">
			<view class="listBox">
				<view class="listBox-wrapper">
					<view class="initNoData" v-show="currencyLogList.length == 0">暂无数据</view>
					<view class="listBox-list" v-for="(item, index) in currencyLogList" :key="index">
						<view class="listBox-list__title">{{ item.remark }}</view>
						<view class="listBox-itemBox">
							<view class="listBox-itemBox__item listBox-itemBox__item--long">
								<view class="listBox-itemBox__item-label">时间</view>
								<view class="listBox-itemBox__item-data">{{ item.createTime }}</view>
							</view>
							<view class="listBox-itemBox__item">
								<view class="listBox-itemBox__item-label">数量</view>
								<view class="listBox-itemBox__item-data">{{ item.money | number(4) }}</view>
							</view>
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
			currencyLogList: [],
			
			assetType: 1, //类型【1币币，2=节点，3=矿池，4=收益】
			
			pageNum: 1,
			pageSize: 20,
			pages: 1
		};
	},
	computed: {
		i18n() {
			return this.$t('message');
		}
	},
	onLoad(hash) {
		this.currencyId = hash.value1;
		this.assetType = hash.value2;
	},
	onShow() {
		this.init();
	},
	onReachBottom() {
		if (this.pageNum >= this.pages) {
			return this.$tools.toast('到底了');
		}else{
			this.pageNum++;
			this.getCurrencyLog();
		}
	},
	methods: {
		init() {
			this.currencyLogList =[];
			this.getCurrencyLog();
		},
		getCurrencyLog() {
			this.$Ajax(
				'/front/financial/getLog',
				{
					currencyId: this.currencyId,
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					assetType: this.assetType
				},
				res => {
					console.log(JSON.stringify(res));
					if(res.code == 0){
						this.pages = res.obj.pages;
						this.currencyLogList = this.currencyLogList.concat(res.obj.list);
					}
				}
			);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/assets_info';
</style>
