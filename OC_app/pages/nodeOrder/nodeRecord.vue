<template>
	<view class="pages">
		<view class="">
			
			<view class="header_bar header_bg header_border">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">节点详情</view>
				</view> 
			</view>
			
			<view class="nodeOrderBox-wrapper-list">
				<view class="nodeOrderBox-wrapper-list__item">
					<view class="nodeOrderBox-wrapper-list__item-txt">{{record.name}}</view>
					<view class="nodeOrderBox-wrapper-list__box">
						<view class="nodeOrderBox__box">
							<view class="nodeOrderBox__box-item">
								<view class="nodeOrderBox__box-item-chioce">{{record.releaseRate*100}}%</view>
								<view class="nodeOrderBox__box-item-txt">每日生产</view>
							</view>
							<view class="nodeOrderBox__box-item">
								<view class="nodeOrderBox__box-item-num">{{record.joinQuantity}}</view>
								<view class="nodeOrderBox__box-item-txt">节点价值(USDT)</view>
							</view>
							<view class="nodeOrderBox__box-item">
								<view class="nodeOrderBox__box-item-num">{{record.nodeMultiple}}倍</view>
								<view class="nodeOrderBox__box-item-txt">节点倍数</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="nodeRecord">
				<view class="nodeRecord-item">
					<view class="nodeRecord-item-left">节点生产</view>
					<view class="nodeRecord-item-right">{{record.staticProfit}}</view>
				</view>
				<view class="nodeRecord-item">
					<view class="nodeRecord-item-left">直推加速产出</view>
					<view class="nodeRecord-item-right">{{record.dynamicProfit}}</view>
				</view>
				<view class="nodeRecord-item">
					<view class="nodeRecord-item-left">社区加速产出</view>
					<view class="nodeRecord-item-right">{{record.teamProfit}}</view>
				</view>
				<view class="nodeRecord-item">
					<view class="nodeRecord-item-left">管理生产奖励</view>
					<view class="nodeRecord-item-right">{{record.manageProfit}}</view>
				</view>
				<view class="mt"></view>
				<view class="nodeRecord-item">
					<view class="nodeRecord-item-left">累计释放（USDT）</view>
					<view class="nodeRecord-item-right">{{record.profitUsdt}}</view>
				</view>
				<view class="nodeRecord-item">
					<view class="nodeRecord-item-left">累计折合数量（OC）</view>
					<view class="nodeRecord-item-right">{{record.profitOC}}</view>
				</view>
				<view class="nodeRecord-item">
					<view class="nodeRecord-item-left">节点状态</view>
					<view class="nodeRecord-item-right chioce" v-if="record.orderStatus == 0">未开始</view>
					<view class="nodeRecord-item-right chioce" v-if="record.orderStatus == 1">质押中</view>
					<view class="nodeRecord-item-right chioce" v-if="record.orderStatus == 2">已出局</view>
				</view>
				<view class="nodeRecord-item">
					<view class="nodeRecord-item-left">节点时间</view>
					<view class="nodeRecord-item-right">{{record.updateTime}}</view>
				</view>
				<!-- <view class="nodeRecord-item">
					<view class="nodeRecord-item-left">订单编号</view>
					<view class="nodeRecord-item-right">{{record.create_time}}</view>
				</view> -->
			</view>
			
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				record:'',
				level:0
				
			}
		},
		onLoad(value) {
			this.uid = value.value1;
			console.log(this.uid);
		},
		onShow() {
			this.init();
		},
		methods: {
			init(){
				this.getNodeRecord();
			},
			getNodeRecord() {
				this.$Ajax('/front/user/nodeOrderDetail', {
					orderId: this.uid,
				}, res => {
						if (res.code == 0) {
							this.record = res.obj;
						}
					}
				);
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/nodeOrder/nodeOrder';
	.nodeOrderBox-wrapper-list__box{
		background: none;
	}
	.nodeOrderBox__box-item:nth-last-child(1){
		text-align: right;
	}
	.chioce{
		color: $globalColor-style;
	}
</style>
