<template>
	<view class="pages">
		<view class="safety">
			<view class="header_bar header_bg header_border">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">安全中心</view>
				</view> 
			</view> 
			
			<view class="userNews">
				<view class="userNews-wrapper">
					<view class="userNews-wrapper_item">
						<view class="userNews-wrapper_item-tips"></view>
						<view class="userNews-wrapper_item-info">个人股数：{{shares}}</view>
					</view>
					<view class="userNews-wrapper_item">
						<view class="userNews-wrapper_item-tips"></view>
						<view class="userNews-wrapper_item-info">余额：{{balance}}</view>
					</view>
				</view>
			</view>
			
			<view class="safety-wrapper">
				<view class="safety-wrapper-item" @click="$tools.jump('./editName',userList.fullName)">
					<view class="safety-wrapper-item__title">姓名</view>
					<view class="safety-wrapper-item__operate">
						<view class="safety-wrapper-item__operate--edit" v-if="userList.fullName == null">去填写</view>
						<view class="safety-wrapper-item__operate-title" v-else>{{userList.fullName}}</view>
						<image src="../../static/user/icon-user-next.png" mode="widthFix" class="safety-wrapper-item__operate--image"></image>
					</view>
				</view>
				<view class="safety-wrapper-item" @click="$tools.jump('./editIdCard',userList.idCard)">
					<view class="safety-wrapper-item__title">身份证号</view>
					<view class="safety-wrapper-item__operate">
						<view class="safety-wrapper-item__operate--edit" v-if="userList.idCard == null">去填写</view>
						<view class="safety-wrapper-item__operate-title" v-else>{{userList.idCard}}</view>
						<image src="../../static/user/icon-user-next.png" mode="widthFix" class="safety-wrapper-item__operate--image"></image>
					</view>
				</view>
				<view class="safety-wrapper-item" @click="$tools.jump('./editAddress',userList.address)">
					<view class="safety-wrapper-item__title">地址</view>
					<view class="safety-wrapper-item__operate">
						<view class="safety-wrapper-item__operate--edit" v-if="userList.address == null">去填写</view>
						<view class="safety-wrapper-item__operate-title" v-else>{{userList.address}}</view>
						<image src="../../static/user/icon-user-next.png" mode="widthFix" class="safety-wrapper-item__operate--image"></image>
					</view>
				</view>
				<view class="safety-wrapper-item">
					<view class="safety-wrapper-item__title">电话</view>
					<view class="safety-wrapper-item__operate">
						<view class="safety-wrapper-item__operate-title">{{ userList.phone }}</view>
						<!-- <view class="safety-wrapper-item__operate--edit">去填写</view> -->
						<image src="../../static/user/icon-user-next.png" mode="widthFix" class="safety-wrapper-item__operate--image"></image>
					</view>
				</view>
				<view class="safety-wrapper-item" @click="$tools.jump('./edit',userList.abonus)">
					<view class="safety-wrapper-item__title">分红卡号</view>
					<view class="safety-wrapper-item__operate">
						<view class="safety-wrapper-item__operate--edit" v-if="userList.abonus == null">去填写</view>
						<view class="safety-wrapper-item__operate-title" v-else>{{userList.abonus}}</view>
						<image src="../../static/user/icon-user-next.png" mode="widthFix" class="safety-wrapper-item__operate--image"></image>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				userList: [],
				user:[{
					userName:'陈墨彤',
					idCard:'',
					address:'',
					card:'',
				}]
			}
		},
		onLoad(hash) {
			this.balance = hash.value1;
			this.shares = hash.value2;
		},
		onShow() {
			this.init();
		},
		methods: {
			init(){
				this.getUserList();
			},
			getUserList() {
				this.$Ajax('/front/user/baseInfo', {}, res => {
					if (res.code == 0) {
						this.userList = res.obj;
						if(this.userList.phone != null){
							this.userList.phone = this.userList.phone.substring(0,3) + "****" + this.userList.phone.substring(7);
							// console.log(this.userList.phone)
						}
					}
				});
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/safety/safety';
	.safety{
		&-wrapper{
			&-item:nth-last-child(1){
				border-bottom: none;
			}
			&-item{
				padding: 30upx 30upx;
				margin-bottom: 0;
				border-bottom: 1px solid $globalColor-border;
				&__operate{
					&-title{
						font-weight: bold;
					}
					&--image{
						margin-left: 20upx;
					}
				}
			}
		}
	}
	.userNews{
		background: $globalColor-white;
		padding: 40upx 30upx;
		margin-bottom: 18upx;
		&-wrapper{
			@include flexLeft;
			&_item{
				@include flexLeft;
				width: 50%;
				&-tips{
					width: 8upx;
					height: 36upx;
					background-color: $globalColor-style;
					margin: 0 15upx;
					border-radius: 4upx;
				}
				&-info{
					font-family: PingFang SC;
					font-weight: bold;
					color: #393536;
					font-size: 32upx;
				}
			}
		}
	}
</style>
