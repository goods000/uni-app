<template>
	<view class="pages" :data-theme="pageTheme">
		<view class="initHeader" :class="pageTheme == 'light' ? 'initHeader--black' : 'initHeader--white'">
			<view class="initHeader-wrapper"><view class="initHeader-back" @click="$tools.back(1)"></view></view>
		</view>

		<view class="main">
			<view class="titleBox">
				<view class="titleBox-wrapper">
					<view class="titleBox-title">选择交易所</view>
					<view class="titleBox-note">请选择需要绑定的交易所</view>
				</view>
			</view>

			<view class="itemBox">
				<view class="itemBox-wrapper">
					<view class="itemBox-item" v-for="(item, index) in bourseList" :key="index" @click="$tools.jump('../api/api_apply', item.id, item.name)">
						<view class="itemBox-item__image"><image :src="item.logo" mode="widthFix"></image></view>
						<view class="itemBox-item__label">{{ item.name }}</view>
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
			bourseList: [],

			nickName: '',
			role: 1
		};
	},
	onLoad(hash) {
		this.role = hash.value1;
	},
	onShow() {
		this.$setStatusBarStyle();
		this.init();
	},
	methods: {
		init() {
			this.getBourseList();
		},
		getBourseList() {
			this.$Ajax('/front/bourse/list', {}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.bourseList = res.obj;
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/api_add';
</style>
