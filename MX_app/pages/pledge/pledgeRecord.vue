<template>
	<view class="pages">
		<view class="header_bar header_bg">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">智能合约记录</view>
			</view> 
		</view> 
		
		<view class="pledge-record">
			<view class="pledge-record-box">
				<view class="initNoData" v-if="pledgeList.length == 0">暂无智能合约（理财）</view>
				<view class="pledge-record-list" v-for="(item, key) in pledgeList" :key="key">
					<view class="pledge-list-group">
						<view class="pledge-name-box">
							<view class="pledge-status"></view>
							<view class="pledge-name">L{{item.level}}级基金</view>
						</view>
						<view class="pledge-data-box">
							<view class="pledge-data">
								<view class="data-name">动态收益：{{item.dynamic}}(MMX)</view>
								<view class="data-name">购买时间：{{item.createTime.slice(0,10)}}</view>
								<view class="data-name">结算时间：{{item.unlockTime.slice(0,10)}}</view>
							</view>
							<view class="pledge-data">
								<view class="data-name">静态收益：{{item.quiet}}(MMX)</view>
								<view class="data-name overflow">-----</view>
								<view class="data-name">成功时间：{{item.endTime.slice(0,10)}}</view>
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
				pledgeList: [],
				limit:10,
				page:1,
				pages:1
			}
		},
		onReachBottom() {
			if (this.page >= this.pages) {
				return this.$tools.toast('到底啦');
			} else {
				this.page++;
				this.getPledgeList();
			}
		},
		onShow() {
			this.getPledgeList();
		},
		methods:{
			// 获取用户信息
			getPledgeList() {
				this.$Ajax('/lock/page', {
					limit: this.limit,
					page: this.page
				}, res => {
						if (res.code == 0) {
							this.pledgeList = res.page.list
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
