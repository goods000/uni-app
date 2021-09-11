<template>
	<view class="pages">
		<view class="header_bar header_border">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">{{ type == '' ? '绑定' : '修改' }}分红卡号</view>
			</view> 
		</view> 
		
		<view class="content">
			<view class="content-warpper">
				<view class="content-warpper-input">
					<input type="text" placeholder="请输入您的分红卡号" placeholder-class="inputColor" v-model="addType"
					@blur="blurInput(1)" @focus="focusInput(1)"/>
				</view>
			</view>
		</view>
		
		<view class="orderBtn">
			<view class="orderBtn-btn" @click="config()">确认</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				addType: '',
				type:'',
			}
		},
		onLoad(hash){
			if(hash.value1){
				this.addType = hash.value1;
				this.type = this.addType;
			}else{
				this.type = '';
			}
		},
		onShow() {
			// this.init();
		},
		methods: {
			focusInput(index) {
				this.isFocus = index;
			},
			blurInput(index) {
				this.isFocus = null;
			},
			config() {
				if (this.addType == '') {
					return this.$tools.toast('请输入您的分红卡号');
				}
				this.$Ajax('/front/user/updateUser',{
						aBonus: this.addType,
					},
					res => {
						console.log(JSON.stringify(res.data));
						if (res.code == 0) {
							this.$tools.toastBack('修改成功', 1);
						}
					}
				);
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/safety/safety';
</style>
