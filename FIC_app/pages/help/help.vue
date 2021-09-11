<template>
	<view class="pages">
		<view class="help">
			<view class="header_bar header_bg">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">帮助中心</view>
				</view> 
			</view> 
			
			<view class="tips_view">
				<view class="tips-txt">猜你想问</view>
			</view>
			
			<uni-collapse ref="add" class="warp" v-for="(sub, key) in list" :key="key">
				<uni-collapse-item :open="sub.open" :show-animation="sub.showAnimation" :disabled="sub.disabled" :title="sub.question">
					<text class="content">{{ sub.answer }}</text>
				</uni-collapse-item>
			</uni-collapse>
			
			
		</view>
	</view>
</template>

<script>
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue';
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue';
	export default {
		components: { uniCollapse, uniCollapseItem },
		data() {
			return {
				list: [],
			}
		},
		onShow() {
			this.getUserList();
		},
		methods:{
			// 获取用户信息
			getUserList() {
				this.$Ajax('/help/list', {}, res => {
						if (res.code == 0) {
							this.list = res.list
						}
					}
				);
			},
		}
	}
</script>

<style>
	@import '@/common/css/style.css';
</style>
