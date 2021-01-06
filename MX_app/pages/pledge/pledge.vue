<template>
	<view class="pages">
		<view class="header_bar header_bg">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">我的智能合约</view>
				<view class="header-right"  @click="$tools.jump('./pledgeRecord')">
					<image src="../../static/public/icon-record.png" mode=""></image>
				</view> 
			</view> 
		</view>
		
		<view class="pledge">
			<view class="pledge-box">
				<view class="initNoData" v-if="pledgeList.length == 0">暂无智能合约（理财）</view>
				<view class="pledge-list" v-for="(item, key) in pledgeList" :key="key">
					<view class="pledge-group">
						<view class="pledge-title">
							<view class="pledge-title-left">
								<view class="pledge-title-iamge">
									<image src="../../static/pledge/icon-pledge-logo.png" mode="widthFix"></image>
								</view>
								<view class="pledge-title-name">L{{item.level}}级基金</view>
							</view>
						</view>
						<view class="pledge-title-right status_action" v-if="item.status == 'lock'">
							<view class="pledge-title-right-image">
								<image src="../../static/pledge/icon-pledge-1.png" mode="widthFix"></image>
							</view>
							<view class="pledge-title-right-title">智能合约中</view>
						</view>
						<view class="pledge-title-right status_end" v-if="item.status == 'unlock'">
							<view class="pledge-title-right-image">
								<image src="../../static/pledge/icon-pledge-1.png" mode="widthFix"></image>
							</view>
							<view class="pledge-title-right-title">智能合约结束</view>
						</view>
						<!-- <view class="pledge-title-right status_success" v-if="item.status == 'end'">
							<view class="pledge-title-right-image">
								<image src="../../static/pledge/icon-pledge-1.png" mode="widthFix"></image>
							</view>
							<view class="pledge-title-right-title">智能合约成功</view>
						</view> -->
						<view class="pledge-title-data">
							<view class="pledge-title-data-l">
								<view class="pledge-title-data-item">{{item.quiet}}</view>
								<view class="pledge-title-data-item">预计静态(MMX)</view>
							</view>
							<view class="pledge-title-data-l">
								<view class="pledge-title-data-item">{{item.dynamic}}</view>
								<view class="pledge-title-data-item">累计动态(MMX)</view>
							</view>
							<view class="pledge-title-data-l">
								<view class="pledge-title-data-item">{{item.day}}</view>
								<view class="pledge-title-data-item">剩余时间(天)</view>
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
			}
		},
		onShow() {
			this.getPledgeList();
		},
		methods:{
			// 获取用户信息
			getPledgeList() {
				this.$Ajax('/lock/ing/list', {}, res => {
						if (res.code == 0) {
							this.pledgeList = res.list
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
