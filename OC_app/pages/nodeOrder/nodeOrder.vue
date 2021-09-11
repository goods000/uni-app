<template>
	<view class="pages">
		<view class="nodeOrder">
			<view class="nodeOrderBox">
				<view class="header_bar header_bar--absolute">
					<view class="header">
						<view class="header-white" @click="$tools.back(1)"></view>
						<view class="header-title-white">节点订单</view>
					</view> 
				</view>
				
				<view class="nodeOrderBox-asset">
					<view class="nodeOrderBox-asset-title">节点总价值(USDT)</view>
					<view class="nodeOrderBox-asset-num">{{node.allNodeUsdt}}</view>
					<view class="nodeOrderBox-asset-box">
						<view class="nodeOrderBox-asset-box__item">
							<view class="nodeOrderBox-asset-box__item--txt">昨日总收益(USDT)</view>
							<view class="nodeOrderBox-asset-box__item--price">{{node.yesterdayProfitUsdt}}</view>
						</view>
						<view class="nodeOrderBox-asset-box__item">
							<view class="nodeOrderBox-asset-box__item--txt">累计释放(USDT)</view>
							<view class="nodeOrderBox-asset-box__item--price">{{node.allProfitUsdt}}</view>
						</view>
					</view>
				</view>
				
			</view>
			
			<view class="nodeOrderBox-list">
				<view class="nodeOrderBox-list-header">
					<view class="nodeOrderBox-list-header-title" @click="$tools.jump('../nodeOrder/profitRecord')">收益详情</view>
					<view class="nodeOrderBox-list-header__item">
						<view class="nodeOrderBox-list-header__item--info">
							<view class="nodeOrderBox-list-header__item--txt">
								节点生产：<text>{{node.allStaticProfit | number(2)}}</text>
							</view>
							<view class="nodeOrderBox-list-header__item--txt">
								直推加速产出：<text>{{node.allDynamicProfit | number(2)}}</text>
							</view>
							<view class="nodeOrderBox-list-header__item--txt">
								社区加速产出：<text>{{node.allTeamProfit | number(2)}}</text>
							</view>
							<view class="nodeOrderBox-list-header__item--txt">
								管理生产奖励：<text>{{node.allManageProfit | number(2)}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			
			<view class="nodeOrderBox-wrapper">
				<view class="nodeOrderBox-wrapper-header">节点列表</view>
				<view class="initNoData" v-if="nodeList.length == 0">暂无记录</view>
				<view class="nodeOrderBox-wrapper-list" v-else @click="$tools.jump('../nodeOrder/nodeRecord',item.id)"
				v-for="(item,index) in nodeList" :key="index">
					<view class="nodeOrderBox-wrapper-list__item">
						<view class="nodeOrderBox-wrapper-list__item-txt">{{item.name}}</view>
						<view class="nodeOrderBox-wrapper-list__box">
							<view class="nodeOrderBox__box">
								<view class="nodeOrderBox__box-item">
									<view class="nodeOrderBox__box-item-chioce">{{item.releaseRate*100}}%</view>
									<view class="nodeOrderBox__box-item-txt">每日生产</view>
								</view>
								<view class="nodeOrderBox__box-item">
									<view class="nodeOrderBox__box-item-num">{{item.joinQuantity}}</view>
									<view class="nodeOrderBox__box-item-txt">节点价值(USDT)</view>
								</view>
								<view class="nodeOrderBox__box-item">
									<view class="nodeOrderBox__box-item-num">{{item.nodeMultiple}}倍</view>
									<view class="nodeOrderBox__box-item-txt">节点倍数</view>
								</view>
							</view>
						</view>
						<view class="nodeOrderBox-wrapper-list__time">节点时间：{{item.createTime}}</view>
						
					</view>
				</view>
				<!-- <view class="nodeOrderBox-wrapper-list" @click="$tools.jump('../nodeOrder/nodeRecord',2)">
					<view class="nodeOrderBox-wrapper-list__item">
						<view class="nodeOrderBox-wrapper-list__item-txt">生态节点3</view>
						<view class="nodeOrderBox-wrapper-list__box">
							<view class="nodeOrderBox__box">
								<view class="nodeOrderBox__box-item">
									<view class="nodeOrderBox__box-item-chioce">0.6%</view>
									<view class="nodeOrderBox__box-item-txt">每日生产</view>
								</view>
								<view class="nodeOrderBox__box-item">
									<view class="nodeOrderBox__box-item-num">3000.00</view>
									<view class="nodeOrderBox__box-item-txt">节点价值(USDT)</view>
								</view>
								<view class="nodeOrderBox__box-item">
									<view class="nodeOrderBox__box-item-num">2倍</view>
									<view class="nodeOrderBox__box-item-txt">节点倍数</view>
								</view>
							</view>
						</view>
						<view class="nodeOrderBox-wrapper-list__time">节点时间：2021/01/12 14:00</view>
					</view>
				</view>
				 -->
				
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				node:[],
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
				this.nodeList = [];
				this.getNodeList();
			},
			getNodeList() {
				this.$Ajax('/front/user/myNodeList', {
					pageNum: this.pageNum,
					pageSize: this.pageSize,
				}, res => {
						if (res.code == 0) {
							this.node = res.obj;
							this.pages = res.obj.nodeOrderList.pages;
							this.nodeList = this.nodeList.concat(res.obj.nodeOrderList.list);
						}
					}
				);
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/nodeOrder/nodeOrder';
	.pages{background: $globalColor-bgStyle;}
</style>
