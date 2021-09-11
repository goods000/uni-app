<template>
	<view class="pages">
		<view class="initHeader initHeader--white">
			<view class="initHeader-wrapper"><view class="initHeader-back" @click="$tools.back()"></view></view>
		</view>
		<view class="bgBox"></view>
		<view class="infoBox">
			<view class="infoBox-wrapper">
				<view class="infoBox-info">
					<view class="infoBox-info__title">操作教程</view>
					<view class="infoBox-info__desc">我将竭尽所能为您排忧解难哦！</view>
				</view>
				<view class="infoBox-icon"><image src="../../static/help/icon-bgItem-01.png" mode="widthFix"></image></view>
			</view>
		</view>
		<view class="listBox">
			<view class="listBox-wrapper">
				<view class="initNoData" v-if="helpCenterList.length == 0">暂无记录</view>
				<view class="listBox-list" v-for="(item, index) in helpCenterList" :key="index" v-else>
					<view class="listBox-list__header">
						<view class="listBox-list__title">{{ item.typeName }}</view>
					</view>
					<view class="listBox-list__content">
						<view class="listBox-list__data" v-for="(subItem, subIndex) in item.list" :key="subIndex" @click="$tools.jump('../help/help_detail', subItem.id)">
							{{ subItem.title }}
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
			helpCenterList: []
		};
	},
	onShow() {
		this.init();
	},
	methods: {
		init() {
			this.getTypeList();
		},
		getTypeList() {
			let that = this;
			this.$Ajax('/search/help/getContent', {}, res => {
				if (res.code == 0) {
					console.log(JSON.stringify(res.obj));
					this.helpCenterList = res.obj;
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/help';
</style>
