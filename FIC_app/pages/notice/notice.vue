<template>
	<view class="pages">
		<view class="header_bar header_bg">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">系统公告</view>
			</view> 
		</view> 
		<view class="notice">
			<view class="notice-box">
				<view class="initNoData" v-if="list.length == 0">暂无公告</view>
				<view class="notice-info" @click="$tools.jump('../notice/noticeDetails',item.id)" v-for="(item, key) in list" :key="key">
					<view class="notice-title">
						<view class="notice-image">
							<image src="../../static/index/icon-index-notice.png" mode="widthFix"></image>
						</view>
						<view class="notice-txt nowrap">{{item.title}}</view>
					</view>
					<view class="notice-content nowrap-over-2" v-html="item.content"></view>
					<view class="notice-time">{{item.createTime}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
			}
		},
		onShow() {
			this.getList();
		},
		methods:{
			getList() {
				this.$Ajax('/bulletin/list', {}, res => {
						if (res.code == 0) {
							this.list = res.list
						}
					}
				);
			}
		}
	}
</script>

<style>
	@import '@/common/css/style.css';
</style>
