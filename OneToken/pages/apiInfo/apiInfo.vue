<template>
	<view class="pages">
		<view class="initHeader initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">更多信息</view>
			</view>
		</view>
		<view class="infoBox">
			<view class="infoBox-wrapper">
				<view class="infoBox-logo"><image :src="apiInfo.bourseLogo" mode="widthFix"></image></view>
				<view class="infoBox-title">{{ apiInfo.bourseName }}</view>
			</view>
		</view>
		<view class="listBox">
			<view class="listBox-wrapper">
				<view class="listBox-list">
					<view class="listBox-list__label">交易所</view>
					<view class="listBox-list__data">{{ apiInfo.bourseName }}</view>
				</view>
				<view class="listBox-list">
					<view class="listBox-list__label">绑定时间</view>
					<view class="listBox-list__data">{{ apiInfo.createTime }}</view>
				</view>
				<view class="listBox-list">
					<view class="listBox-list__label">账户类型</view>
					<view class="listBox-list__data">{{ apiInfo.roleStr }}</view>
				</view>
				<view class="listBox-list">
					<view class="listBox-list__label">连接状态</view>
					<view class="listBox-list__data listBox-list__data--style">连接{{ apiInfo.connectStatus == 1 ? '正常' : '异常' }}</view>
				</view>
			</view>
		</view>
		<view class="initButton initButton--absolute">
			<view class="initButton-row">
				<view class="initButton-btn initButton-btn--golden" @click="$tools.jump('../apiInfo/apiInfo_update', apiId)">更新API</view>
				<view class="initButton-btn initButton-btn--style" @click="deleteApi()">删除API</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			apiInfo: [],
			apiId: ''
		};
	},
	onLoad(hash) {
		this.apiId = hash.value1;
	},
	onShow() {
		this.getApiDetail();
	},
	methods: {
		getApiDetail() {
			this.$Ajax(
				'/front/api/detail',
				{
					id: this.apiId
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.apiInfo = res.obj;
					}
				}
			);
		},
		deleteApi() {
			this.$Ajax(
				'/front/api/bind/delete',
				{
					apiBindId: this.apiId, //交易所id
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.$tools.toastBack('删除成功', 1);
					}
				}
			);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/apiInfo';
</style>
