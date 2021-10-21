<template>
	<view class="pages bg_header">
		<view class="initHeader initHeader--bgStyle initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title" v-if="type == 5">USDT</view>
				<view class="initHeader-title" v-if="type == 2">CLQ</view>
			</view>
		</view>

		<view class="main">
			<view class="transitionBox">
				<view class="transitionBox-wrapper">
					<view class="transitionBox-wrapper__item noborder">
						<view class="transitionBox-wrapper__item--title wight" v-if="type == 5">USDT</view>
						<view class="transitionBox-wrapper__item--title wight" v-if="type == 2">CLQ</view>
						<view class="transitionBox-wrapper__item--box">
							<view class="transitionBox-content">
								<view class="transitionBox-content-title">可用</view>
								<view class="transitionBox-content-data">{{using | number(4) }}</view>
							</view>
							<view class="transitionBox-content" v-if="type == 5">
								<view class="transitionBox-content-title">冻结</view>
								<view class="transitionBox-content-data">{{freeze | number(4) }}</view>
							</view>
							<view class="transitionBox-content" v-if="type == 2">
								<view class="transitionBox-content-title">锁仓</view>
								<view class="transitionBox-content-data">{{freeze | number(4) }}</view>
							</view>
							<view class="transitionBox-content" v-if="type == 5">
								<view class="transitionBox-content-title">折合</view>
								<view class="transitionBox-content-data">{{cny | number(4) }}</view>
							</view>
							<view class="transitionBox-content" v-if="type == 2">
								<view class="transitionBox-content-title">已释放</view>
								<view class="transitionBox-content-data">{{cny | number(4) }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="recommendBox">
				<view class="recommendBox-wrapper">
					<view class="recommendBox-wrapper-item">
						<image src="../../static/asset/icon-asset-record1.png" mode="widthFix" class="recommendBox-wrapper-item__image"></image>
						<view class="">
							<view class="recommendBox-title">财务记录</view>
							<view class="recommendBox-txt">FINANCIAL RECORDS</view>
						</view>
					</view>
				</view>
			</view>
			
			
			<view class="">
				<view class="transitionBox-wrapper">
					<view class="initNoData" v-if="recordList.length ==0">暂无交易记录</view>
					<view class="transitionBox-wrapper__item" v-for="(item,index) in recordList" :key="index" v-else>
						<view class="transitionBox-wrapper__item--title">{{item.typeStr}}</view>
						<view class="transitionBox-wrapper__item--box">
							<view class="transitionBox-content">
								<view class="transitionBox-content-title">数量</view>
								<view class="transitionBox-content-data">{{ item.money }}</view>
							</view>
							<view class="transitionBox-content">
								<view class="transitionBox-content-title">状态</view>
								<view class="transitionBox-content-data">已完成</view>
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
			recordList:[],
			// 页数
			pageSize: 20,
			pageNum: 1,
			pages: 0,
		};
	},
	onLoad(hash) {
		this.type = hash.value1;
		this.using = hash.value2;
		this.freeze = hash.value3;
		this.cny = hash.value4;
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
			if(this.type == 2){
				this.numType = '2,6,7,9,10,103,105' // CLQ
			}else{
				this.numType = '3,4,5,11,13,14,101,102' //USDT
			}
			this.$Ajax('/search/getUserWalletRecordList', {
				pageSize: this.pageSize,
				pageNum: this.pageNum,
				typeStr: this.numType
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
@import '@/common/scss/pages/asset/asset';
.transitionBox{border: none;margin-top: 40upx;}
.wight{color: $globalColor-style;font-size: 39upx;}
.transitionBox-content-data{font-size: 31upx;white-space: nowrap;}
.noborder{border-bottom: none;}
</style>
