<template>
	<view class="pages">
		<view class="">
			<view class="header_bar header_bg header_border header_fixed">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">收益详情</view>
				</view> 
			</view>
			
			<view class="">
				<view class="initNoData" v-if="nodeList.length == 0">暂无记录</view>
				<view class="profitRecord-list-header" v-for="(item,index) in nodeList" :key="index" v-else>
					<view class="profitRecord-list-header-title">每日收益详情<text>({{item.createTime}})</text></view>
					<view class="profitRecord-list-header__item">
						<view class="profitRecord-list-header__item--info">
							<view class="profitRecord-list-header__item--txt">
								节点生产：<text>{{item.staticProfit | number(2)}}</text>
							</view>
							<view class="profitRecord-list-header__item--txt">
								直推加速产出：<text>{{(item.dynamicProfit + item.dynamicProfitOne) | number(2)}}</text>
							</view>
							<view class="profitRecord-list-header__item--txt">
								社区加速产出：<text>{{item.teamProfit | number(2)}}</text>
							</view>
							<view class="profitRecord-list-header__item--txt">
								管理生产奖励：<text>{{item.manageProfit | number(2)}}</text>
							</view>
						</view>
					</view>
					<view class="profitRecord-list-header__time">创建时间:{{item.createTime}}</view>
				</view>
			</view>
			
				
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nodeList:[],
				pageNum: 1,
				pageSize: 20,
				pages: 1,
				pageSum: 0,
				
			}
		},
		onShow() {
			this.init();
		},
		onReachBottom() {
			if (this.pageNum >= this.pages) {
				return this.$tools.toast('到底啦');
			} else {
				this.pageNum++;
				this.getNodeList();
			}
		},
		methods: {
			init(){
				this.nodeList = []
				this.getNodeList();
			},
			getNodeList() {
				this.$Ajax('/front/user/profitDetailList', {
					pageNum: this.pageNum,
					pageSize: this.pageSize,
				}, res => {
						if (res.code == 0) {
							this.pages = res.obj.pages;
							this.nodeList = this.nodeList.concat(res.obj.list);
						}
					}
				);
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/nodeOrder/profitRecord';
	.pages{background: $globalColor-bgStyle;}
</style>
