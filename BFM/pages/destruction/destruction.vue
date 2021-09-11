<template>
	<view class="pages">
		<view class="initHeader initHeader--white">
			<view class="initHeader-wrapper"><view class="initHeader-back" @click="$tools.back(1)"></view></view>
		</view>

		<view class="bgBox"></view>

		<view class="main">
			<view class="logoBox">
				<view class="logoBox-wrapper">
					<view class="logoBox-logo"><image src="../../static/destruction/icon-logo.png" mode="widthFix"></image></view>
				</view>
			</view>
			
			<view class="planeBox">
				<view class="planeBox-wrapper">
					<view class="planeBox-bg"></view>
					<view class="planeBox-content">
						<view class="planeBox-title">
							<image src="../../static/destruction/icon-title-bfm.png" mode="widthFix" v-if="type == 0"></image>
							<image src="../../static/destruction/icon-title-blj.png" mode="widthFix" v-if="type == 1"></image>
						</view>
						<digital-rolling :digitTo="digitTo" :digitFrom="digitFrom" :limit="2"></digital-rolling>
						<!-- <view class="planeBox-data">2019.123123</view> -->
						<view class="planeBox-label">
							<image src="../../static/destruction/icon-label.png" mode="widthFix"></image>
						</view>
					</view>
				</view>
			</view>
			
			<view class="copyrightBox">
				<view class="copyrightBox-wrapper">
					<view class="copyrightBox-img">
						<image src="../../static/destruction/icon-copyright.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
import digitalRolling from "@/components/digital-rolling/digital-rolling.vue"
export default {
	components: {
		digitalRolling
	},
	data() {
		return {
			type: 1,
			
			digitTo: 0,
			digitFrom: 1000,
			start: 0,
		}
	},
	onLoad(hash) {
		this.type = hash.value1;
	},
	onShow() {
		this.init();
		
		// this.timer = setTimeout(() => {
		// 	this.start += Math.random() * 10;
		// 	this.makeMove(this.start);
		// }, 2000)
		// this.start += Math.random() * 10;
		// this.makeMove(this.start);
	},
	methods: {
		init(){
			this.getInfo();
		},
		getInfo(){
			if(this.type == 0){
				this.getBFM();
			}else if(this.type == 1){
				this.getBLJ();
			}
		},
		
		getBFM(){
			this.$Ajax('/search/bfm/destroy', {}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.timer = setTimeout(() => {
						this.digitTo = res.obj.toFixed(2);
					}, 1000)
				}
			});
		},
		getBLJ(){
			this.$Ajax('/search/blj/destroy', {}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					if (res.code == 0) {
						this.timer = setTimeout(() => {
							this.digitTo = res.obj.toFixed(2);
						}, 1000)
					}
				}
			});
		}
	},
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/destruction/destruction';
</style>
