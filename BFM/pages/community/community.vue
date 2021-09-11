<template>
	<view class="pages">
		<view class="initHeader initHeader--fixed initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">激活矿工</view>
			</view>
		</view>
		<view class="dataInfoBox">
			<view class="dataInfoBox-wrapper">
				<view class="dataInfoBox-list">
					<view class="dataInfoBox-list__label dataInfoBox-list__label--highlight">总激活数量</view>
					<view class="dataInfoBox-list__data">{{ minerInfo.activeCount }}</view>
				</view>
				<view class="dataInfoBox-list">
					<view class="dataInfoBox-list__label dataInfoBox-list__label--orange">总设备数量</view>
					<view class="dataInfoBox-list__data">{{ minerInfo.activeDevice }}</view>
				</view>
			</view>
		</view>
		<view class="listBox">
			<view class="listBox-wrapper">
				<view class="initNoData" v-if="minerList.length == 0">暂无数据</view>
				<view class="listBox-list" v-for="(item, index) in minerList" :key="index" v-else>
					<view class="listBox-list__info">
						<!-- <view class="listBox-list__price">{{ item.balance }} {{ item.currencyName }}</view> -->
						<view class="listBox-list__title">哪里来的小饼干</view>
						<view class="listBox-list__date">{{ item.createTime }}</view>
					</view>
					<view class="listBox-list__price">{{ item.balance }} {{ item.currencyName }}</view>
					<view class="listBox-list__address listBox-list__item">
						<view class="listBox-list__item-label">钱包地址：</view>
						<view class="listBox-list__item-data listBox-list__item-data--highlight">{{ item.toAddress }}</view>
					</view>
					<view class="listBox-list__total">
						<view class="listBox-list__item">
							<view class="listBox-list__item-label">激活数量：</view>
							<view class="listBox-list__item-data">{{ item.activeCount }}</view>
						</view>
						<view class="listBox-list__item">
							<view class="listBox-list__item-label">设备数量：</view>
							<view class="listBox-list__item-data">{{ item.activeDeviceCount }}</view>
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
			headerTabsActive: 0,
			pageNum: 1,
			pageSize: 20,
			pages: 1,
			teamVoteInfo: [],
			teamVoteList: [],
			minerInfo: [],
			minerList: [],
		};
	},
	onShow() {
		this.init();
	},
	onReachBottom() {
		if (this.pageNum >= this.pages) {
			return this.$tools.toast('到底了');
		}else{
			this.pageNum++;
			this.getList();
		}
	},
	methods: {
		init() {
			this.teamVoteList = [];
			this.minerList = [];
			this.getInfo();
			this.getList();
		},
		getInfo(){
			console.log(this.headerTabsActive);
			if(this.headerTabsActive == 0){
				this.getMinerInfo();	
			}else if(this.headerTabsActive == 1){
				this.getTeamVoteInfo();
			}
		},
		getList(){
			console.log(this.headerTabsActive);
			if(this.headerTabsActive == 0){
				this.getMinerList();	
			}else if(this.headerTabsActive == 1){
				this.getTeamVoteList();
			}
		},
		getTeamVoteInfo() {
			this.$Ajax('/front/user/myTeamCount', {}, res => {
				console.log(JSON.stringify(res.obj));
				if (res.code == 0) {
					this.teamVoteInfo = res.obj;
				}
			});
		},
		getTeamVoteList() {
			this.$Ajax('/front/user/myTeamVote', {}, res => {
				console.log(JSON.stringify(res.obj));
				if (res.code == 0) {
					this.pages = res.obj.pages;
					var list = res.obj.list;
					this.teamVoteList = this.teamVoteList.concat(list);
				}
			});
		},
		getMinerInfo() {
			this.$Ajax('/front/miner/acvite/count', {}, res => {
				console.log(JSON.stringify(res.obj));
				if (res.code == 0) {
					this.minerInfo = res.obj;
				}
			});
		},
		getMinerList() {
			this.$Ajax(
				'/front/miner/active/list',
				{
					currencyId: 1,
					pageNum: this.pageNum,
					pageSize: this.pageSize
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.pages = res.obj.pages;
						var list = res.obj.list;
						this.minerList = this.minerList.concat(list);
					}
				}
			);
		},
		changeHeaderTabsActive(index) {
			if (this.headerTabsActive != index) {
				this.headerTabsActive = index;
			}
			this.init();
		},
	}
};
</script>

<style lang="scss" scoped>
.dataInfoBox {
	// border-bottom: 16upx solid #ededf2;
	padding: 0 30upx;
	&-wrapper {
		padding: 0 30upx;
		border-radius: 15upx;
		background-color: #18181b;
	}

	&-list {
		@include flexBetween;
		padding: 30upx 0;
		color: #ffffff;
		font-size: 28upx;
		border-bottom: 1upx solid #666666;
		&:last-child {
			border-bottom: 0;
		}

		&__label {
			@include initBeforeHolder;
			position: relative;
			padding-left: 30upx;

			// &::before {
			// 	content: '';
			// 	display: inline-block;
			// 	height: 30upx;
			// 	width: 8upx;
			// 	border-radius: 8upx;
			// 	position: absolute;
			// 	left: 0;
			// 	top: 50%;
			// 	transform: translateY(-50%);
			// }

			&--highlight {
				&::before {
					background-color: $globalColor-style;
				}
			}

			&--orange {
				&::before {
					background-color: #f28018;
				}
			}
		}
	}
}

.listBox {
	&-list {
		padding: 30upx;
		&:last-child {
			border-bottom: 0;
		}

		&__info {
			@include flexBetween;
			margin-bottom: 15upx;
		}

		&__title {
			color: #ffffff;
			font-size: 32upx;
		}

		&__date {
			color: #999999;
			font-size: 24upx;
		}

		&__price {
			color: $globalColor-style;
			font-size: 32upx;
			margin-bottom: 15upx;
		}

		&__address {
			margin-bottom: 15upx;
		}

		&__total {
			@include flexBetween;
		}

		&__item {
			@include flexLeft;
			font-size: 24upx;

			&-label {
				color: #999999;
			}

			&-data {
				color: #ffffff;

				&--highlight {
					// color: $globalColor-style;
				}
			}
		}
	}
}
</style>
