<template>
	<view class="pages">
		<view class="first">
			<view class="firstBox">
				<view class="firstBox-bg">
					<view class="firstBox-bg-image">
						<image src="../../static/operate/icon-logo.png" mode="widthFix"></image>
					</view>
					<view class="firstBox-bg-color"></view>
				</view>
				
				<view class="operateBox">
					<view class="operateBox-title">FPool</view>
					<view class="operateBox-txt">{{ i18n.operate.title }}</view>
					<view class="operateBox-btn">
						<view class="operateBox-btn-register" @click="$tools.jump('../operate/login')">{{ i18n.operate.account }}</view>
						<view class="operateBox-btn-login" @click="$tools.jump('../operate/register')">{{ i18n.operate.userRegister }}</view>
					</view>
					<view class="operateBox-agreement">
						<label :class="[isActive ? 'checkbox-active' : '']" @click="agreement()">
							<view class="checkbox" ></view>
						</label>
						<view class="operateBox-agreement-title">{{ i18n.operate.agreement }}</view>
						<view class="operateBox-agreement-name">《{{ i18n.operate.userAgreement }}》</view>
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
				isActive : true,
			}
		},
		computed: {
			i18n() {
				return this.$t('message');
			}
		},
		onShow() {
	
		},
		methods: {
			agreement(){
				if(!this.isActive){
					this.isActive = true;
				}else{
					this.isActive = false;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/operate/firstPage';
</style>
