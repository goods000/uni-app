<template>
	<view class="pages">
		<view class="initHeader initHeader--line initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">划转记录</view>
			</view>
		</view>
		
		<view class="listBox">
			<view class="initNoData" v-if="recordList.length == 0"></view>
			<view class="listBox-list" v-for="(item, index) in recordList" :key="index">
				<view class="listBox-list__content">
					<view class="listBox-list__item">
						<view class="listBox-list__item-title">时间</view>
						<view class="listBox-list__item-data">{{ item.createTime }}</view>
					</view>
					<view class="listBox-list__item">
						<view class="listBox-list__item-title">转出账户</view>
						<view class="listBox-list__item-data">{{ item.sourceStr }}</view>
					</view>
					<view class="listBox-list__item">
						<view class="listBox-list__item-title">转入账户</view>
						<view class="listBox-list__item-data">{{ item.targetStr }}</view>
					</view>
					<view class="listBox-list__item">
						<view class="listBox-list__item-title">币种</view>
						<view class="listBox-list__item-data">{{ item.currencyName }}</view>
					</view>
					<view class="listBox-list__item">
						<view class="listBox-list__item-title">数量</view>
						<view class="listBox-list__item-data">{{ item.quantity }}</view>
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
			recordList: [],
			currencyName: '',
			currencyId: '',
			
			// 页数
			pageSize: 20,
			pageNum: 1,
			pages: 0,
		};
	},
	onLoad(option) {
		this.currencyId = option.value1;
		this.currencyName = option.value2;
	},
	onShow(e) {
		this.init();
	},
	onReachBottom() {
		if (this.pageNum >= this.pages) {
			return this.$tools.toast('到底了');
		}
		this.pageNum++;
		this.getRecord();
	},
	methods: {
		init(){
			this.recordList = [];
			this.getRecord();
		},
		getRecord() {
			this.$Ajax(
				'/front/financial/walletTransfer',
				{
					pageSize: this.pageSize,
					pageNum: this.pageNum
				},
				res => {
					if(res.code == 0){
						var list = res.obj.list;
						console.log(JSON.stringify(res.obj));
						this.recordList = this.recordList.concat(list);
					}
					this.pages = res.obj.pages;
				}
			);
		}
	}
};
</script>

<style lang="scss" scoped>

.listBox {
	
	&-list {
		
		&__content {
			padding: 30upx;
			border-bottom: 2upx solid #c6d2e4;
		}
		&__item {
			flex: 1;
			font-size: 24upx;
			text-align: center;
			color: #101010;
			
			@include flexBetween;
			
			&:first-child {
				text-align: left;
			}
			&:last-child {
				text-align: right;
			}
			&--long {
				flex: 2;
			}
				
			&-title {
				color: #999999;
				margin-bottom: 15upx;
			}
		}
		&__msg {
			padding: 30upx;
			font-size: 24upx;
			color: #999999;
		
			text {
				color: #101010;
			}
		}
		
	}
	
	.revocation {
		// height:68upx;
		// line-height: 28upx;
		font-size: 28upx;
		color: $globalColor-green;
		text-align: center;
		padding-bottom: 30upx;
		// display: flex;
		// // align-items: center;
		// justify-content: flex-end;
		// box-sizing: border-box;
		// padding-right: 30upx;
	}
}
.noData {
	text-align: center;
	// height:  calc(100% - 0upx);
	// image {
	// 	width: 136upx;
	// 	height: 100upx;
	// }
	// text {
	// 	color: #A5ADC0;
	// 	font-size: 26upx;
	// 	line-height: 56upx;
	// }
}
</style>
