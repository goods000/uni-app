<template>
	<view class="pages content">
		<view class="product">
			<view class="header_bar header_fixed header_main">
				<view class="header">
					<view class="header-tabs">
						<view class="header-tabs__title">产品</view>
					</view>
					<view class="tabs">
						<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
							<view v-for="(tab,index) in tabBars" :key="index" class="uni-tab-item" :id="tab.key" :data-current="index" @click="ontabtap(index,tab.key,tab.name)">
								<text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
			<view class="productBox">
				<view class="productBox-list">
					<view class="initNoData" v-if="PowerList.length == 0">暂无数据</view>
					<view class="productBox-list-item" v-for="(item,index) in PowerList" :key="index"
					@click="$tools.jump('../product/productBuy',item.id)" v-else>
						<view class="tipsBox">
							<view class="tipsBox-wrapper">
								<view class="tipsBox-title">
									<view class="tipsBox-title__label">{{item.name}}</view>
								</view>
							</view>
							<view class="productBox-list-status-image">
								<image src="../../static/product/icon-product-after.png" mode="widthFix" v-if="item.surplusNum == 0"></image>
								<image src="../../static/product/icon-product-before.png" mode="widthFix" v-if="item.surplusNum != 0"></image>
							</view>
						</view>
						<view class="productBox-content">
							<view class="productBox-content__left">
								<view class="productBox-content__left-title" v-if="item.typeStr=='FIL'">*单份存力:<text>{{item.singeTb | number(2)}} T</text></view>
								<view class="productBox-content__left-title" v-if="item.typeStr=='ETH'">*单份存力:<text>{{item.singeTb | number(2)}} M</text></view>
								<view class="productBox-content__left-title" v-if="item.typeStr=='BZZ'">*单份存力:<text>{{item.singeTb | number(2)}} 个</text></view>
								<view class="productBox-content__left-title" v-if="item.typeStr=='PHA'">*单份存力:<text>{{item.singeTb | number(2)}} 核</text></view>
								<view class="productBox-content__left-usdt">{{item.singeMoney}}<text>USDT</text></view>
							</view>
							<view class="productBox-content__image">
								<image src="../../static/product/product.png" mode="widthFix"></image>
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
				scrollInto: "",
				showTips: false,
				tabIndex: 0,
				tabBars:[
					// {name:'FIL'},{name:'ETH'},{name:'BZZ'},{name:'PHA'},
				],
				recordTabsActive: 0,
				PowerList:[
					// {name:'产品名称1',singeTb:'1',singeMoney:'450',contractDays:'100',startTime:'T+7',surplusNum:90,count:100},
					// {name:'产品名称1',singeTb:'1',singeMoney:'450',contractDays:'100',startTime:'T+7',surplusNum:0,count:100},
				],
				// 页数
				pageSize: 20,
				pageNum: 1,
				pages: 0,
				index:0,
				currencyId:'',
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
				this.getList(this.index);
			}
		},
		methods:{
			init(){
				this.PowerList = [];
				this.getTabBars();
			},
			ontabtap(index,type,name) {
				this.PowerList = [];
				this.pageNum = 1;
				this.index = index;
				this.currencyId = type;
				if(name == 'ICP'){
					this.tabIndex = this.index;
					console.log(this.tabIndex);
					this.$tools.toast('敬请期待');
				}else{
					this.tabsName = name;
					this.index = index;
					this.getIPFSData(this.index,this.currencyId);
				}
			},
			//获取运算力信息
			getIPFSData(index,type) {
				this.tabIndex = index;
				this.$Ajax('/front/miner/getIPFSProduct', {
					currencyId: this.currencyId,
					pageSize: this.pageSize,
					pageNum: this.pageNum,
				}, res => {
						if (res.code == 0) {
							// console.log(JSON.stringify(res.obj))
							this.usdtcny = res.obj.usdtcny;
							this.pages = res.obj.data.pages;
							this.PowerList = this.PowerList.concat(res.obj.data.list);
						}
					}
				);
			},
			//获取矿机类型
			getTabBars() {
				this.$Ajax('/front/miner/currencyList', {
					type: 4,
				}, res => {
						if (res.code == 0) {
							console.log(JSON.stringify(res.obj))
							this.tabBars = res.obj;
							if(this.currencyId == ''){
								this.currencyId = this.tabBars[0].key;
							}
							this.getIPFSData(this.tabIndex,this.currencyId);
						}
					}
				);
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/product/product';
	.header{
		padding: 3% 30upx;
	}
	.tabs{
		background: $globalColor-bgStyle;
	}
	.scroll-h{
		padding: 0;
	}
	.uni-tab-item-title-active{
		color: $globalColor-style;
	}
</style>
