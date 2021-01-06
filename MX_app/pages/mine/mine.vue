<template>
	<view class="pages">
		<view class="mine">
			<view class="header_bar header_bg">
				<view class="mine-top-bg">
					<view class="header">
						<view class="header-back" @click="$tools.back(1)"></view>
						<view class="header-title">智能合约挖矿</view>
					</view> 
					<!-- <image src="../../static/mine/icon-mine-bg.png" mode=""></image> -->
				</view> 
			</view> 
			<view class="mine-box">
				<view class="mine-list">
					<view class="mine-group" v-for="(item,index) in mineList" :key="index" @click="$tools.jump('./mineDetails',item.id)">
						<view class="mine-title">
							<view class="mine-title-left">
								<view class="mine-title-iamge">
									<image src="../../static/mine/icon-mine-1.png" mode="widthFix"></image>
								</view>
								<view class="mine-title-name">{{ item.gradeName }}</view>
							</view>
							<view class="mine-title-right">{{ item.interestScale }}</view>
						</view>
						<view class="mine-title-data">
							<view class="mine-title-data-l">
								<view class="mine-title-data-item">{{ item.giveNum }}</view>
								<view class="mine-title-data-item">存币数量(MMX)</view>
							</view>
							<view class="mine-title-data-l">
								<view class="mine-title-data-item">{{ item.reachNum }}</view>
								<view class="mine-title-data-item">消耗(SLC)</view>
							</view>
							<view class="mine-title-data-l">
								<view class="mine-title-data-item">{{ item.unlockTime }}</view>
								<view class="mine-title-data-item">存币天数</view>
							</view>
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
				 mineList:[]
			}
		},
		onShow() {
			this.getMineList()
		},
		methods: {
			getMineList() {
				this.$Ajax('/grade/list/user_level', {}, res => {
						if (res.code == 0) {
							this.mineList = res.list
						}
					}
				);
			}
		}
	};
</script>

<style>
	@import '@/common/css/style.css';
	.header{background: none !important;}
</style>
