<template>
	<div>
	<view  class="avtive-page">
		<view class="avtive-pop" v-if="showappPop">
			<view class="avtive-pop-title">信任网关</view>
			<view class="avtive-pop-input">
				<input type="text" value="" v-model="activepassword" />
			</view>
			<view class="avtive-confirm" @click="cancel">取消</view>
			<view class="avtive-confirm" @click="appconfirm">确定</view>
		</view>
	</view>
	</div>
</template>

<script>
	export default {
		props:{
			success:{
				type:Function,
				default:function(){
					return new Function()
				}
			},
			error:{
				type:Function,
				default:function(){
					return new Function()
				}
			}
		},
		data() {
			return {
				showappPop:true,
				activepassword:'',
			};
		},
		methods:{
			appconfirm(){
				this.$Ajax('/front/address/do/active',{
					tradePwd:this.activepassword
				},res=>{
					this.$tools.toast(res.msg);
					if(res.code==0){
						this.showappPop = false;
						this.success()
					}else {
						this.error()
					}
				})
			},
			cancel(){
				this.error({err:'cancel'})
			}
		}
	}
</script>

<style lang="scss">
	.avtive-page{
		height: 100%;
		width: 100%;
		.avtive-pop{
			width: 50%;
			position: fixed;
			top: 25%;
			left: 25%;
			background-color: red;
			padding: 30upx;
			.avtive-pop-title{
				height: 80upx;
				line-height: 80upx;
			}
			.avtive-pop-input{
				height: 80upx;
				input{
					height: 80upx;
					line-height: 80upx;
				}
			}
			.avtive-confirm{
				height: 80upx;
				line-height: 80upx;
				text-align: right;
				color: #F8B62B;
			}
		}
	}
</style>
