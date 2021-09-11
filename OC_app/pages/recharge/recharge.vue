<template>
	<view class="pages">
		<view class="">
			
			<view class="header_bar header_bg">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">充币</view>
					<view class="header-right"@click="$tools.jump('./rechargeRecord',currencyId,selectType)">充币记录</view>
				</view> 
			</view> 
			
			<view class="form">
				
				<view class="formBg">
					<picker @change="bindPickerChange" :value="index" :range="array" range-key="name" class="form-wrapper-picker">
						<view class="form-wrapper__title">{{array[index].name}}</view>
						<view class="form-wrapper__txt">选择币种</view>
					</picker>
					<!-- <picker @change="bindChange" :value="index" :range="ways" range-key="name" class="form-wrapper-picker" v-if="currencyId == 1">
						<view class="form-wrapper__title">{{ways[index]}}</view>
						<view class="form-wrapper__txt">选择币种</view>
					</picker>
					 -->
					
					<view class="waysBox" v-if="currencyId == 1">
						<view class="waysBox-list">
							<view class="waysBox-list-item" :class="{ 'active': typeActive == 1 }" @click="bindChange(1)">ERC20</view>
							<view class="waysBox-list-item" :class="{ 'active': typeActive == 2 }" @click="bindChange(2)">TRC20</view>
						</view>
					</view>
					
					<view class="recharge-code">
						<view class="recharge-code-qrcode">
							<image class="qrcode" :src="qrcodeImage" mode="" />
						</view>
					</view>
					
					<view class="recharge-box">
						<view class="recharge-btn" @click="saveQrcode()">保存二维码到相册</view>
						<view class="recharge-border"></view>
						<view class="recharge-title">充币地址</view>
						<view class="recharge-addr">{{ qrcodeAddress }}</view>
						<view class="recharge-copy" @click="$tools.copy(qrcodeAddress)">复制</view>
					</view>
					
				</view>	
				
				<view class="form-tips">
					<view class="form-tips-txt">注意：</view>
					<view class="form-tips-txt">请勿向上述地址充币任何非{{ selectType }}资产，否则资产将不可找回。您充币到上述地址后，需要网络节点确认。您的充币地址不会经常改变，可以重复充币；如有更改我们将通过网站公告或邮件通知您。</view>
				</view>
							
				
			</view>
			
			
			
		</view>
	</view>
</template>

<script>
	import QR from '../../components/qrcode/qrcode.js';
	
	export default {
		data() {
			return {
				array: [{name:'USDT(ERC20)'},{name:'USDT(TRC20)'}],
				index: 0,
				size: 100,
				qrcodeAddress: '',
				qrcodeImage: '',
				type:1,
				typeActive: 1,
				selectType:'',
				currencyId:0,
				ways:[],
				omni:'',
				trx:'',
				erc:'',
			}
		},
		onShow() {
			this.init();
		},
		methods: {
			init() {
				this.getCurrencyList();
			},
			//获取币种
			getCurrencyList() {
				this.$Ajax(
					'/search/currencyList',
					{
						type: 2
					},
					res => {
						if (res.code == 0) {
							this.array = res.obj;
							this.array.forEach(item => {
								item.label = item.name;
								item.value = item.key;
							});
							
							if(this.selectType == ''){
								this.selectType = this.array[0].label;
							}
							if(this.currencyId == ''){
								this.currencyId = this.array[0].value;
							}
							
							this.getRecharge();
						}
					}
				);
			},
			//获取充值地址
			getRecharge() {
				this.$Ajax(
					'/front/financial/rechargeInit',
					{
						currencyId: this.currencyId
					},
					res => {
						if (res.code == 0) {
							console.log(JSON.stringify(res.obj));
							this.ways = res.obj.list;
							if(this.currencyId == 1){
								if(this.typeActive == 1){
									this.erc20 = res.obj.list[0];
									this.qrcodeAddress = res.obj.list[0].erc20;
									this.qrcodeImage = QR.createQrCodeImg(res.obj.list[0].erc20);
								}else if(this.typeActive == 2){
									this.trx = res.obj.list[1];
									this.qrcodeAddress = res.obj.list[1].trx;
									this.qrcodeImage = QR.createQrCodeImg(res.obj.list[1].trx);
								}
							}else{
								this.qrcodeAddress = res.obj.address;
								this.qrcodeImage = QR.createQrCodeImg(res.obj.address);
							}
						}
					}
				);
			},
			bindChange(index) {
				this.typeActive = index;
				this.getRecharge();
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + this.index +';currencyId：'+ this.array[e.detail.value].key+';selectType：' + this.array[e.detail.value].name)
				this.index = e.detail.value
				this.currencyId = this.array[e.detail.value].key
				this.selectType = this.array[e.detail.value].name
				this.typeActive = 1;
				this.getRecharge();
			},
			saveQrcode() {
				let that = this;
				base64ToPath(this.qrcodeImage)
					.then(path => {
						console.log(path);
						uni.saveImageToPhotosAlbum({
							filePath: path,
							success: function() {
								that.$tools.toast('保存成功');
								console.log('save success');
							}
						});
					})
					.catch(error => {
						console.error(error);
					});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/withdraw/withdraw';
	page{background: #FFFFFF;}
	.waysBox{
		&-list{
			@include flexLeft;
			&-item{
				background: #F5F5F5;
				color: #666666;
				font-size: 24upx;
				padding: 20upx;
				margin: 30upx;
			}
			.active{
				color: $globalColor-white;
				background: $globalColor-style;
			}
		}
	}
</style>
