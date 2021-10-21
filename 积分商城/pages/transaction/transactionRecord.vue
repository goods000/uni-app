<template>
	<view class="pages bg_header">
		<view class="initHeader initHeader--bgStyle initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">交易记录</view>
			</view>
		</view>

		<view class="main">
			<view class="transitionBox">
				<view class="transitionBox-wrapper">
					<view class="initNoData" v-if="recordList.length ==0">暂无交易记录</view>
					<view class="transitionBox-wrapper__item" v-for="(item,index) in recordList" :key="index" v-else>
						<view class="transitionBox-wrapper__item--title">
							<text :class="item.type == 1 ? 'transitionBox-wrapper__item--title--green' : 'transitionBox-wrapper__item--title--red'">
							{{ item.type==1?'买入':'卖出' }}</text>
						</view>
						<view class="transitionBox-wrapper__item--box">
							<view class="transitionBox-content">
								<view class="transitionBox-content-title">数量</view>
								<view class="transitionBox-content-data">{{ item.amount }}</view>
							</view>
							<view class="transitionBox-content">
								<view class="transitionBox-content-title">手续费</view>
								<view class="transitionBox-content-data">{{ item.fee }}</view>
							</view>
							<view class="transitionBox-content">
								<view class="transitionBox-content-title">时间</view>
								<view class="transitionBox-content-data">{{ item.createTime }}</view>
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
			recordList:[
				{coin:'TPD',num:'23.30200',charge:'0',time:'21/03/22 12:11'},{coin:'TPD',num:'5.2200',charge:'0.23',time:'21/03/22 12:11'}
			],
			// 页数
			pageSize: 20,
			pageNum: 1,
			pages: 0,
		};
	},
	onShow() {
		this.recordList = [];
		this.init();
	},
	onLoad(hash) {
		this.type = hash.value1;
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
			this.$Ajax('/front/mine/getTransferRecordList', {
				pageSize: this.pageSize,
				pageNum: this.pageNum,
				type: this.type
			}, res => {
					if (res.code == 0) {
						this.pages = res.obj.pages;
						this.recordList = this.recordList.concat(res.obj.list);
					}
				}
			);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/transaction/transaction';
.transitionBox{border: none;margin-top: 40upx;}
</style>
