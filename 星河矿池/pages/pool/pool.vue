<template>
	<view class="contentBg">
		<view class="team">
			<view class="team-Bg"></view>
			<view class="header_bar">
				<view class="header">
					<view class="header-white" @click="$tools.back(1)"></view>
					<view class="header-title-white">激励池</view>
				</view> 
			</view> 
			
			<view class="tabs">
				<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
					<view v-for="(tab,index) in tabBars" :key="index" class="uni-tab-item" :id="tab.key" :data-current="index" @click="ontabtap(index,tab.key,tab.name)">
						<text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
					</view>
				</scroll-view>
			</view>
			
			<view class="teamBox">
				<view class="teamBox-bottom">
					<view class="teamBox-bottom__num">{{ventureJackpotData}}</view>
				</view>
			</view>
			
			
			<view class="record">
				<view class="recordBox">
					<view class="initNoData" v-if="recordList.length == 0">暂无数据</view>
					<scroll-view scroll-y="true" class="recordBox-height" @scrolltolower="newsListLower" v-else>
						<view class="" v-for="(item, key) in recordList" :key="key">
							<view class="tipsBox">
								<view class="tipsBox-wrapper">
									<view class="tipsBox-title">
										<view class="tipsBox-title__label">{{item.name}}</view>
									</view>
								</view>
							</view>
							<view class="recordBox-list" v-for="(sub,key) in item.list" :key="key">
								<view class="recordBox-list-header">
									<view class="recordBox-list-header-title">{{sub.userName}}</view>
								</view>
								<view class="recordBox-list-box">
									<view class="recordBox-list-item">
										<view class="recordBox-list-item-title">激励数量 </view>
										<view class="recordBox-list-item-status">{{ sub.money | number(5) }}</view>
									</view>
									<view class="recordBox-list-item">
										<view class="recordBox-list-item-title">奖励项目</view>
										<view class="recordBox-list-item-status">{{ sub.typeStr}}</view>
									</view>
									<view class="recordBox-list-item">
										<view class="recordBox-list-item-title">时间</view>
										<view class="recordBox-list-item-status">{{sub.createTime}}</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>	
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
				index:0,
				tabBars:[
					// {name:'FIL'},{name:'ETH'},{name:'BZZ'},{name:'PHA'},
				],
				// 页数
				pageSize: 3,
				pageNum: 1,
				pages: 0,
				currencyId:'',
				ventureJackpotData:{},
				recordList:[
					// {name:'哪里来的小饼干1',typeStr:'激励收益',money:'450',createTime:'2021-11-12 12:12:12',ipfsStatus:1},
					// {name:'哪里来的小饼干',typeStr:'激励收益',money:'450',createTime:'2021-11-12 12:12:12',ipfsStatus:3},
				],
			}
		},
		onShow() {
			this.init();
		},
		methods: {
			init(){
				this.getTabBars();
			},
			ontabtap(index,type,name) {
				this.recordList = [];
				this.pageNum = 1;
				this.index = index;
				this.currencyId = type;
				if(name == 'ICP'){
					this.tabIndex = this.index;
					this.ventureJackpotData = 0;
					console.log(this.tabIndex);
					this.$tools.toast('敬请期待');
				}else{
					this.tabsName = name;
					this.index = index;
					this.tabIndex = index;
					this.getVentureJackpotData();
					this.getVentureJackpotRecord();
				}
			},
			//获取矿机类型
			getTabBars() {
				this.$Ajax('/front/miner/currencyList', {
					type: 4,
				}, res => {
						if (res.code == 0) {
							this.tabBars = res.obj;
							if(this.currencyId == ''){
								this.currencyId = this.tabBars[0].key;
								this.getVentureJackpotData();
								this.getVentureJackpotRecord();
							}
						}
					}
				);
			},
			getVentureJackpotRecord(){
				this.$Ajax('/front/venture/ventureJackpotRecord', {
					currencyId: this.currencyId,
					// pageSize: this.pageSize,
					// pageNum: this.pageNum,
				}, res => {
					if (res.code == 0) {
						// console.log(JSON.stringify(res.obj))
						this.recordList = res.obj;
						// this.pages = res.obj.pages;
						// this.recordList = this.recordList.concat(res.obj.list);
					}
				});
			},
			//获取奖池数据
			getVentureJackpotData() {
				this.$Ajax('/front/venture/ventureJackpotData', {
					currencyId:this.currencyId
				}, res => {
						if (res.code == 0) {
							// console.log(JSON.stringify(res.obj))
							this.ventureJackpotData = res.obj;
						}
					}
				);
			},
			newsListLower(e) {
				console.log("ddd")
				if (this.pageNum >= this.pages) {
					return this.$tools.toast('到底了');
				} else {
					this.pageNum++;
					this.getVentureJackpotRecord();
				}
			},
		}
	}
</script>

<style lang="scss">
	@import '@/common/scss/pages/community/community';
	// @import '@/common/scss/pages/product/records';
	@import '@/common/scss/pages/recharge/rechargeRecord';
	page{
		background: $globalColor-bgStyle;
	}
	.tipsBox{
		&-title{
			padding: 22upx 0;
		}
	}
	.team-Bg{
		/* #ifdef H5 */
		height: 280upx;
		/* #endif */
		/* #ifdef APP-PLUS */
		height: 350upx;
		/* #endif */
	}
	.teamBox{
		padding: 40upx;
		margin: 0 30upx 30upx;
		&-bottom{
			&__num{
				font-weight: bold;
				font-size: 55upx;
			}
		}
	}
	.tabs {
		.uni-tab-item{
			text-align: center;
		}
		.uni-tab-item-title{
			font-weight: bold;
		}
		.uni-tab-item-title-active{
			color: $globalColor-white;
			font-weight: bold;
		}
		.uni-tab-item-title-active::before{
			background-color: $globalColor-white;
		}
	}
	.record{
		.recordBox{
			&-list{
				&-box{
					justify-content: space-between;
				}
				&-item{
					&-status{
						margin-top: 10upx;
					}
					&:nth-child(1){
						width: 30%;
					}
					&:nth-child(2){
						width: 40%;
					}
					&:nth-last-child(1){
						width: 40%;
					}
				}
			}
		}
	}
	.recordBox{
		&-height{
			height: 78vh;
			overflow: scroll;
			padding-bottom: 2%;
		}
	}
</style>
