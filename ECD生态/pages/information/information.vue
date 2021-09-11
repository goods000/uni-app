<template>
	<view class="pages">
		<view class="header_bar header_fixed header_bg">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">热点资讯</view>
			</view> 
		</view> 
		
		<view class="main">
			<view class="choiceBox">
				<view class="choiceBox-wrapper">
					<view class="choiceBox-list" v-for="(item, index) in choiceList" :key="index" @click="$tools.jump('../information/information_details', item.id)">
						<view class="choiceBox-list__content">
							<view class="choiceBox-list__title">{{ item.title }}</view>
							<view class="choiceBox-list__body">
								<view class="choiceBox-list__type">{{ item.thelabel }}</view>
								<view class="choiceBox-list__date">{{ item.createTime }}</view>
							</view>
							
							<!-- <view class="choiceBox-list__date">{{ item.timeString }}</view> -->
						</view>
						<view class="choiceBox-list__image"><image :src="item.path" mode="widthFix"></image></view>
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
			choiceList: [], //资讯
			// 分页
			pages: 1, //总页数
			pageNum: 1, //当前页数
			pageSize: 20 //请求记录
		};
	},
	onShow() {
		this.init();
	},
	onReachBottom() {
		if (this.pageNum >= this.pages) {
			return this.$tools.toast('到底啦');
		} else {
			this.pageNum++;
			this.getChoiceList();
		}
	},
	methods: {
		init() {
			this.pageNum = 1;
			this.getChoiceList();
		},
		// 资讯
		getChoiceList() {
			this.choiceList = [];
			this.$Ajax(
				'/search/getHoteInformation',
				{
					pageNum: this.pageNum,
					pageSize: this.pageSize
				},
				res => {
					// console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.pages = res.obj.pages;
						this.choiceList = this.choiceList.concat(res.obj.list);
					}
				}
			);
		},
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/information';
</style>
