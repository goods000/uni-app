<template>
	<view class="contentBg">
		<view class="header_bar">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">社区业绩</view>
			</view> 
		</view> 
		
		<view class="community">
			<view class="communityBox">
				<view class="communityBox-list">
					<view class="communityBox-list-title">社区总业绩</view>
					<view class="communityBox-list-price">{{ teamProfit == '' ? '0' : teamProfit }} T</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				teamProfit:''
			}
		},
		onShow() {
			this.init();
		},
		methods: {
			init(){
				this.getmyTeamProfit();
			},
			getmyTeamProfit(){
				this.$Ajax('/front/user/myTeamProfit', {}, res => {
					if (res.code == 0) {
						console.log(JSON.stringify(res.obj))
						this.teamProfit = res.obj;
					}
				});
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/community/community';
</style>
