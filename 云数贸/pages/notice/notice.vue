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
				<view class="initNoData" v-if="noticeList.length == 0">暂无公告</view>
				<view class="notice-box-info" @click="$tools.jump('../notice/noticeDetails',item.id)" v-for="(item, key) in noticeList" :key="key">
					<view class="notice-box-wrapper">
						<!-- <view class="notice-box-wrapper__image">
							<image src="../../static/index/icon-index-notice-time.png" mode="widthFix"></image>
						</view> -->
						<view class="notice-box-wrapper__time">发布时间 {{item.createTime}}</view>
					</view>
					<view class="notice-box__txt nowrap">{{item.title}}</view>
					<rich-text :nodes="item.content" class="notice-box__content nowrap-over-2"></rich-text>
					<!-- <view class="notice-box__content nowrap-over-2" v-html="item.content"></view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				noticeList: [
					{title:'这里是系统公告标题展示',content:'这里是系统公告内容展示，正式内容详情见正式服,当前只做效果布局展示,无实际内容这里是系统公告内容展示，正式内容详情见正式服,当前只做效果布局展示,无实际内容…',createTime:'2021/04/12'},
					{title:'这里是系统公告标题展示',content:'这里是系统公告内容展示，正式内容详情见正式服,当前只做效果布局展示,无实际内',createTime:'2021/04/12'},
				],
				
				// 分页
				pages: 1, //总页数
				pageNum: 1, //当前页数
				pageSize: 20 //请求记录
			}
		},
		onShow() {
			this.noticeList = [];
			this.init();
		},
		onReachBottom() {
			if (this.pageNum >= this.pages) {
				return this.$tools.toast('到底啦');
			} else {
				this.pageNum++;
				this.getNoticeList();
			}
		},
		methods: {
			init() {
				this.getNoticeList();
			},
			getNoticeList() {
				this.$Ajax(
					'/search/getContent',
					{
						pageNum: this.pageNum,
						pageSize: this.pageSize
					},
					res => {
						if (res.code == 0) {
							this.pages = res.obj.pages;
							this.noticeList = this.noticeList.concat(res.obj.list);
						}
					}
				);
			}
		}
	}
</script>
<style lang="scss" scoped>
@import '@/common/scss/pages/notice/notice';
</style>
