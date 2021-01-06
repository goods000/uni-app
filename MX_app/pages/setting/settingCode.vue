<template>
	<view class="pages">
		<view class="setting">
			<view class="header_bar">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">安全验证</view>
				</view> 
			</view> 
			
			<!-- <view class="setting-box">
				<view class="setting-status">
					<view class="setting-title">
						为保障您的账号安全，请先验证身份，验证成功后将进行下一步操作。
					</view>
					<view class="setting-num">
						+86150****8888
					</view>
				</view>
				
				<view class="btn-active-login">发送验证码</view>
			</view> -->
			
			<view class="setting-box">
				<view class="setting-status">
					<view class="setting-title">
						短信验证已发送至+68150****8888
					</view>
					<view class="setting-num">
						<input type="number" value="" />
						<input type="number" value="" />
						<input type="number" value="" />
						<input type="number" value="" />
						<input type="number" value="" />
						<input type="number" value="" />
					</view>
				</view>
				
				<view class="setting-status-title active">重新发送验证码</view>
				<!-- <view class="setting-status-title">56秒后重新发送验证码</view> -->
			</view>
			
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
	
		},
		methods: {
	
		}
	}
</script>


<style>
	@import '@/common/css/style.css';
	page{background: #FFFFFF;}
</style>
