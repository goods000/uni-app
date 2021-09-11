<!-- 客服 -->
<template>
	<view><web-view :src="serviceUrl"></web-view></view>
</template>

<script>
export default {
	data() {
		return {
			serviceUrl: null
		};
	},
	onShow() {
		this.init();
	},
	methods: {
		init() {
			this.getServiceUrl();
		},
		getServiceUrl() {
			this.$Ajax('/search/service/link', {}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.serviceUrl = res.obj;
				}
			});
		}
	}
};
</script>

<style></style>
