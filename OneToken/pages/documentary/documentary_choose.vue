<template>
	<view class="pages">
		<view class="initHeader initHeader--black">
			<view class="initHeader-wrapper"><view class="initHeader-back" @click="$tools.back(1)"></view></view>
		</view>

		<view class="titleBox">
			<view class="titleBox-wrapper">
				<view class="titleBox-title">选择交易所</view>
				<view class="titleBox-note">已选跟随者，现在选择您的账户所属交易所</view>
			</view>
		</view>

		<view class="itemBox">
			<view class="itemBox-wrapper">
				<view class="itemBox-item" v-for="(item,index) in bourseList" :key="index" @click="$tools.jump('../documentary/documentary_apply', role, item.id, item.name)">
					<view class="itemBox-item__image"><image :src="item.img" mode="widthFix"></image></view>
					<view class="itemBox-item__label">{{ item.name }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			bourseList: [],

			nickName: '',
			role: 1
		};
	},
	onLoad(hash) {
		this.role = hash.value1;
	},
	onShow() {
		this.init();
	},
	methods: {
		init() {
			this.getTradeExchangeList();
		},
		getTradeExchangeList() {
			this.$Ajax('/front/bourse/get/list', {}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.bourseList = res.obj;
				}
			});
		},
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/documentary_choose';
</style>
