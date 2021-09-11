<template>
	<view class="pages contentBg">
		<view class="header_bar header_white">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">公告详情</view>
			</view> 
		</view> 
		<view class="notice ">
			<view class="notice-details">
				<view class="notice-details__title">{{noticeContent.title}}</view>
				<view class="notice-details__time">发布时间 {{noticeContent.createTime}}</view>
				<!-- <view class="notice-details__content" v-html="noticeContent.content"></view> -->
				<rich-text :nodes="noticeContent.content" class="notice-details__content"></rich-text>
			</view>
		</view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				noticeContent: {
					// title:'这里是系统公告标题展示',
					// createTime:'2021/04/12',
					// content:'这里是系统公告内容展示，正式内容详情见正式服,当前只做效果布局展示,无实际内容。 阿里云消息服务MNS（Message Service）是一种高效、可靠、安全、便捷、可弹性扩展的分布式消息服务。MNS能够帮助应用开发者在他们应用的分布式组件上自由的传递数据、通知消息，构建松耦合系统。 阿里云消息服务MNS（Message Service）是一种高效、可靠、安全、便捷、可弹性扩展的分布式消息服务。MNS能够帮助应用开发者在他们应用的分布式组件上自由的传递数据、通知消息，构建松耦合系统。',
				}
			}
		},
		onLoad(option) {
			this.pageId = option.value1;
		},
		onShow() {
			this.init();
		},
		methods: {
			init() {
				this.getDetailsContent();
			},
			getDetailsContent() {
				this.$Ajax(
					'/search/getContentInfo',
					{
						id: this.pageId
					},
					res => {
						console.log(JSON.stringify(res));
						if (res.code == 0) {
							this.noticeContent = res.obj.content;
							this.noticeContent.content = this.noticeContent.content.replace(/<img/g,"<img style='width:100%;margin: 15px 0;'");
							
							// this.noticeContent = res.obj;
							// this.noticeContent.content = this.noticeContent.content.replace(/<img/g, "<img style='width:100%;margin: 15px 0;'");
						}
					}
				);
			}
		}
	};
</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/notice/notice';
</style>
