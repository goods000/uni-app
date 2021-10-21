<template>
	<view class="pages bg_header">
		<view class="">
			<view class="initHeader initHeader--bgStyle initHeader--white">
				<view class="initHeader-wrapper">
					<view class="initHeader-back" @click="$tools.back(1)"></view>
					<view class="initHeader-title">{{selectType}}提现记录</view>
				</view>
			</view>
			
			<view class="record">
				<view class="record-wrapper">
					<view class="initNoData" v-if="recordList.length ==0">暂无交易记录</view>
					<view class="record-wrapper__item" v-for="(item,index) in recordList" :key="index" v-else>
						<view class="record-wrapper__item--header record-wrapper__item--header-top">
							<view class="record-wrapper__item--header-coin">{{item.currencyName}}</view>
							<!-- <view class="record-wrapper__item--header-status">提现成功</view> -->
							<view class="record-wrapper__item--header-status--active">{{item.statusStr}}</view>
							<!-- <view class="record-wrapper__item--header-status--end">{{item.statusStr}}</view> -->
						</view>
						<view class="record-wrapper__item--header">
							<view class="record-wrapper__item--header-title">提现数量：{{ item.quantity }}</view>
							<view class="record-wrapper__item--header-title">手续费：{{ item.rate }}</view>
						</view>
						<view class="record-wrapper__item--header">
							<view class="record-wrapper__item--header-title">提现地址：{{item.address}}</view>
						</view>
						<view class="record-wrapper__item--header">
							<view class="record-wrapper__item--header-title">提现时间：{{item.createTime}}</view>
							<!-- <view class="record-wrapper__item--header-btn">撤销</view> -->
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
				recordList:[
					{coin:'TPD',quantity:'23.30200',charge:'0',createTime:'21/03/22 12:11',address:'CGCHBJ00025478956548975BHGCVFFGVBVB0'},{coin:'TPD',quantity:'5.2200',charge:'0.23',createTime:'21/03/22 12:11'}
				],
				// 页数
				pageSize: 20,
				pageNum: 1,
				pages: 0,
			}
		},
		onLoad(hash) {
			this.currencyId = hash.value1;
			this.selectType = hash.value2;
		},
		onShow() {
			this.recordList = [];
			this.init();
		},
		onReachBottom() {
			if (this.pageNum >= this.pages) {
				return this.$tools.toast('到底啦');
			} else {
				this.pageNum++;
				this.getList();
			}
		},
		methods: {
			init() {
				this.getList()
			},
			getList() {
				this.$Ajax('/front/financial/extractList', {
					pageSize: this.pageSize,
					pageNum: this.pageNum,
					currencyId: this.currencyId,
				}, res => {
						if (res.code == 0) {
							this.pages = res.obj.pages;
							this.recordList = this.recordList.concat(res.obj.list);
						}
					}
				);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/withdraw/withdraw';
</style>
