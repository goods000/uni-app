<template>
	<view class="pages">
		<view class="setting">
			<view class="header_bg header_border header_bar">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">收款信息</view>
				</view> 
			</view> 
			
			<view class="listBox">
				<view class="listBox-wrapper">
					<view class="listBox-list" @click="$tools.jump('./addBank',name,no,bank,bankAddress)">
						<view class="listBox-list__label">银行卡</view>
						<view class="listBox-list__edit">{{ status_1 == 1 ? '已绑定' : '未绑定' }}</view>
					</view>
					<view class="listBox-list" @click="$tools.jump('./addMethods','支付宝',zfbname,zfbno,zfbpic)">
						<view class="listBox-list__label">支付宝</view>
						<view class="listBox-list__edit">{{ status_2 == 2 ? '去修改' : '去绑定'}}</view>
					</view>
					<view class="listBox-list" @click="$tools.jump('./addMethods','微信',wxname,wxno,wxpic)">
						<view class="listBox-list__label">微信</view>
						<view class="listBox-list__edit">{{ status_3 == 3 ? '去修改' : '去绑定' }}</view>
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
					PayList:[],
					status_1:'',
					status_2:'',
					status_3:'',
					name:'',
					no:'',
					bank:'',
					bankAddress:'',
					zfbname:'',
					zfbno:'',
					zfbpic:'',
					wxname:'',
					wxno:'',
					wxpic:'',
				}
			},
			onShow() {
				this.init();
			},
			methods: {
				init(){
					this.getPayList();
				},
				// 
				getPayList() {
					this.$Ajax('/front/user/getPayList', {}, res => {
						if (res.code == 0) {
							this.PayList = res.obj;
							this.PayList.forEach((item,index) => {
								if(item.payType == 1){
									this.status_1 = 1;
									this.name = item.name;
									this.no = item.no;
									this.bank = item.bankName;
									this.bankAddress = item.bankAddress;
								}else if(item.payType == 2){
									this.status_2 = 2;
									this.zfbname = item.name;
									this.zfbno = item.no;
									this.zfbpic = item.pic;
								}else if(item.payType == 3){
									this.status_3 = 3;
									this.wxname = item.name;
									this.wxno = item.no;
									this.wxpic = item.pic;
								}
							})
							console.log("this.status_1：",this.status_1,"this.status_2：",this.status_2,"this.status_3：",this.status_3);
						}
					});
				},
				
			},
		}
	</script>

<style lang="scss" scoped>
	@import '../user/scss/user';
	.listBox{
		&-list{
			margin-left: 30upx;
			padding-left: 0px;
		}
	}
</style>
