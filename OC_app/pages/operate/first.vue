<template>
	<view class="pages">
		<view class="first">
			<view class="first-header">
				<view class="first-header-image">
					<image src="../../static/operate/logo.png" mode="widthFix"></image>
				</view>
				<view class="first-header-icon">
					<image src="../../static/operate/icon-logo-title.png" mode="widthFix"></image>
				</view>
				<view class="first-header-title">安全/可靠/诚心为您服务</view>
			</view>
			 
			<view class="first-btn">
				<view class="first-btn-box first-btn-box-login" v-if="status == 0" @click="$tools.jump('../operate/setup',' ')">创建钱包</view>
				<view class="first-btn-box first-btn-box-login" v-else @click="scanCode()">创建钱包</view>
				<view class="first-btn-box first-btn-box-register" @click="$tools.jump('../operate/import')">导入钱包</view>
				<view class="first-btn-title">
					<view class="first-btn-title-name">点击上方任意按钮，既表示已同意</view>
					<view class="first-btn-title-xie">《用户使用协议》</view>
				</view>
			</view>
			
			<view class="first-bottom">
				<view class="first-bottom-title">
					SAFE AND RELIABLE, FOR YOUR DIGITAL TRANSACTION ESCORT
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status:'',
				parentName:''
			}
		},
		onShow() {
			this.getScanCode();
		},
		methods: {
			// 判断是否需要扫一扫
			getScanCode(){
				this.$Ajax(
					'/front/address/get/inviteCodeIsMust',{},
					res => {
						if (res.code == 0) {
							this.status = res.obj;
						}
					}
				);
			},
			// 判断是否为本APP的二维码			getParentName(){				this.$Ajax(					'/front/address/check/parentName',{
						parentName: this.parentName
					},					res => {						if (res.code == 0) {
							this.parentName = res.obj;							this.$tools.jump('../operate/setup',this.parentName);						}					}				);			},
			//扫一扫
			scanCode() {
				// #ifdef H5
					/*this.parentName = 'http://123.123.098:8080/register.html?parentName=34780'; */
					this.parentName = ''
					this.$tools.jump('../operate/setup',this.parentName)
				// #endif
				// #ifdef APP-PLUS
				uni.scanCode({
					onlyFromCamera: false,
					success: res => {
						let msg = res.result;
						this.parentName = msg.split('inviteCode=')[1];
						this.getParentName();
					}
				});
				// #endif
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/operate/first';
	page{background: #FFFFFF;}
</style>
