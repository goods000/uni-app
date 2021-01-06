<template>
	<view class="pages">
		<view class="header_bar header_bg">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">公告详情</view>
			</view> 
		</view> 
		<view class="notice ">
			<view class="notice-details">
				<view class="notice-details-title">{{details.title}}</view>
				<view class="notice-details-time">{{details.createTime}}</view>
				<view class="notice-details-content" v-html="details.content"></view>
			</view>
		</view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				details: {}
			}
		},
		onLoad(value1) {
			this.id = value1.value1;
			this.getDetails()
		},
		onshow() {
			
		},
		methods: {
			getDetails() {
				this.$Ajax('/bulletin/info/'+ this.id, {}, res => {
						if (res.code == 0) {
							this.details = res.item
						}
					}
				);
			},
		
		}
	};
</script>

<style>
	@import '@/common/css/style.css';
	page{background: #FFFFFF;}
</style>
