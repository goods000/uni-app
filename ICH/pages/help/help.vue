<template>
	<view class="pages">
		<view class="initHeader initHeader--bgWhite initHeader--line initHeader--fixed initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back()"></view>
				<view class="initHeader-title">帮助中心</view>
			</view>
		</view>
		<view class="listBox">
			<view class="listBox-wrapper">
				<view class="listBox-noData" v-if="helpCenterList.length == 0">暂无记录</view>
				<view class="listBox-list" v-for="(item, index) in helpCenterList" :key="index" v-else>
					<view class="listBox-list__title">{{ item.typeName }}</view>
					<view class="listBox-list__data" v-for="(subItem, subIndex) in item.list" :key="subIndex" @click="$tools.jump('../help/help_detail',subItem.id)">{{ subItem.title }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			helpCenterList: []
		};
	},
	onShow() {
		this.init();
	},
	methods: {
		init(){
			this.getTypeList();
			
		},
		getTypeList() {
			let that = this;
			this.$Ajax('/search/help/getContent', {}, res => {
				if(res.code == 0){
					console.log(JSON.stringify(res.obj))
					this.helpCenterList = res.obj;
				}
			});
		},
		navigateTo(id) {
			uni.navigateTo({
				url: '../guideDetail/guideDetail?id=' + id
			});
		}

		// 柳忠武 8-3 16:41:55
		// /search/help/typeList   获取分类

		// 柳忠武 8-3 16:42:50
		// /search/help/helpList   获取分类下的帮助列表

		// 柳忠武 8-3 16:43:11
		// /search/help/helpDetail  帮助信息明细
	}
};
</script>

<style lang="scss" scoped>
.listBox {
	&-wrapper {
	}

	&-list {
		padding: 30upx;
		&__title {
			font-size: 36upx;
			color: #1f2023;
			font-weight: bold;
			margin-bottom: 30upx;
		}
		&__data {
			font-size: 32upx;
			color: #1f2023;
			margin-bottom: 30upx;
		}
	}
}
</style>
