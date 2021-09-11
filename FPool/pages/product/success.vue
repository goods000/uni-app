<template>
	<view class="pages pagesBg">
		<view class="header_bar header_border">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">{{ i18n.success.title }}</view>
			</view> 
		</view> 
		
		<view class="success">
			<view class="success-wrapper">
				<view class="success-image">
					<image src="../../static/product/icon-product-success.png" mode="widthFix"></image>
				</view>
				<view class="success-status">{{ i18n.success.title }}</view>
				<view class="success-title">{{ i18n.success.title_01 }}  {{ num }} {{ i18n.success.title_02 }} {{ langType == 'cn' ? name : remarks }} ,</view>
				<view class="success-title">{{ i18n.success.title_03 }}</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
			data(){
				return{
					num:'',
					name:'',
					remarks:'',
					langType:'',
				}
			},
			computed: {
				i18n() {
					return this.$t('message');
				}
			},
			onLoad(hash) {
				this.num = hash.value1;
				this.name = hash.value2;
				this.remarks = hash.value3;
			},
			onShow() {
				this.langType = uni.getStorageSync('initlanguage');
				// this.init();
			},
			methods: {
				
			},
		}
	</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/product/product';
	.pagesBg{
		height: 100vh;
	}
</style>
