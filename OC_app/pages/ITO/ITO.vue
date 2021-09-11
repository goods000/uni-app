<template>
	<view class="pages">
		<view class="header_bar header_bg">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">ITO</view>
			</view> 
		</view> 
		<view class="main">
			<view class="ito-header">
				<image src="../../static/ITO/icon-ITO-title.png" mode=""></image>
			</view>
			<view class="ito-title">
				<image src="../../static/ITO/icon-ITO-header.png" mode=""></image>
			</view>
			<view class="itoBox">
				<view class="itoBox-tips">ITO作为一种新理念,正在被越来越多的区块链从业者认可,相比于ICO和IEO,其具有四大优势：</view>
				<view class="itoBox-news">As a new concept, ITO is being recognized by more and more blockchain practitioners. Compared with ICO and IEO, ITO has four advantages:</view>
				<view class="itoBox-list">
					<view class="itoBox-list__item">
						<image src="../../static/ITO/icon-ITO-01.png" mode="widthFix"></image>
						<text>合法合规</text>
					</view>
					<view class="itoBox-list__item">
						<image src="../../static/ITO/icon-ITO-02.png" mode="widthFix"></image>
						<text>资金安全</text>
					</view>
					<view class="itoBox-list__item">
						<image src="../../static/ITO/icon-ITO-03.png" mode="widthFix"></image>
						<text>品控保障</text>
					</view>
					<view class="itoBox-list__item">
						<image src="../../static/ITO/icon-ITO-04.png" mode="widthFix"></image>
						<text>激励制度</text>
					</view>
				</view>
				<view class="itoBox-wrapper">
					<view class="itoBox-wrapper__tips">1）在法律层面来讲，ITO更加安全合规，规避了从个人手中 筹资的法律风险</view>
					<view class="itoBox-wrapper__tips">2）ITO没有代投跑路的风险，有效的保障参与者的资金安全</view>
					<view class="itoBox-wrapper__tips">3）ITO就是分布式创业本身，每一个参与人都是合伙人参与 者既是产品的用户,使用项目的服务，又是项目的员工可以为 项目进行工作</view>
					<view class="itoBox-wrapper__tips">4）ITO有一套合适的赏金分配制度，引导个人利益最大化与 社区利益一致的激励机制</view>
				</view>
			</view>
			<view class="initBtn" @click="$tools.jump('./introduction')">
				立即参与
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
		};
	},
	onShow() {
		// this.init();
	},
	methods: {
		init() {
			this.getDetails();
		},
		getDetails() {
			this.$Ajax('',{
					id: this.pageId
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						
					}
				}
			);
		}
	}
};
</script>

<style lang="scss" scoped>
	page,pages{background: #FFFFFF;}
	@import '@/common/scss/pages/ITO/ito';
</style>
