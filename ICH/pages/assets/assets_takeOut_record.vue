<template>
	<view class="pages">
		<view class="initHeader initHeader--line initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">{{ currencyName }} 提币记录</view>
			</view>
		</view>
		<!-- <view class="noData full" v-if="listData.length == 0">
			<image src="../../static/public/icon-noData-style-1.png" mode="widthFix"></image>
			<text>暂无记录</text>
		</view>
		<view class="listBox" v-else>
			<view class="list" v-for="(item, index) in listData" :key="index">
				<view class="top" @click="toDetails(item.status, item.id)">
					<view class="item">
						<view class="item-title">数量</view>
						<view class="item-data">{{ item.quantity }}</view>
					</view>
					<view class="item">
						<view class="item-title">状态</view>
						<view class="item-data">{{ item.statusStr }}</view>
					</view>
					<view class="item item--long">
						<view class="item-title">时间</view>
						<view class="item-data">{{ item.createTime }}</view>
					</view>
				</view>
				<view class="msg">
					<view class="order">
						提现地址：
						<text>{{ item.address }}</text>
					</view>
				</view>
				<view v-if="item.status == 0" class="revocation"><text @tap="revocation(item.id)">撤销提现</text></view>
			</view>
		</view> -->
		
		<view class="listBox">
			<view class="initNoData" v-if="recordList.length == 0"></view>
			<view class="listBox-list" v-for="(item, index) in recordList" :key="index" @click="$tools.jump('../assets/assets_takeOut_details', item.id)">
				<view class="listBox-list__content">
					<view class="listBox-list__item listBox-list__item--long">
						<view class="listBox-list__item-title">时间</view>
						<view class="listBox-list__item-data">{{ item.createTime }}</view>
					</view>
					<view class="listBox-list__item">
						<view class="listBox-list__item-title">数量</view>
						<view class="listBox-list__item-data">{{ item.quantity }}</view>
					</view>
					<view class="listBox-list__item">
						<view class="listBox-list__item-title">状态</view>
						<view class="listBox-list__item-data">{{ item.statusStr }}</view>
					</view>
				</view>
				<view class="listBox-list__msg">
					<view class="listBox-list__order">
						提现地址：
						<text>{{ item.address }}</text>
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
			this.getRecord();
		},
		getRecord() {
			this.$Ajax(
				'/front/financial/extractList',
				{
					pageSize: this.pageSize,
					pageNum: this.pageNum,
					currencyId: this.currencyId
				},
				res => {
					if(res.code == 0){
						var list = res.obj.list;
						console.log(list);
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
		border-bottom: 2upx solid #999999;
		&__content {
			display: flex;
			justify-content: space-between;
			padding: 30upx;
			border-bottom: 2upx dashed #999999;
		}
		&__item {
			flex: 1;
			font-size: 24upx;
			text-align: center;
			color: #101010;
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
</style>
