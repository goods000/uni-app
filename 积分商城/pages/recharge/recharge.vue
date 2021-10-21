<template>
	<view class="pages">
		<view class="">
			<view class="initHeader initHeader--bgStyle initHeader--white">
				<view class="initHeader-wrapper">
					<view class="initHeader-back" @click="$tools.back(1)"></view>
					<view class="initHeader-title">充值</view>
					<view class="initHeader-right initHeader-right--text" @click="$tools.jump('./rechargeRecord',currencyId)">充值记录</view>
				</view>
			</view>
			
			<view class="form">
				
				<view class="formBg">
					<picker @change="bindPickerChange" :value="index" :range="array" range-key="currencyName" class="form-wrapper-picker">
						<view class="form-wrapper__title">{{array[index].currencyName}}</view>
						<view class="form-wrapper__txt">选择币种</view>
					</picker>
					
					<view class="waysBox">
						<view class="waysBox-list">
							<view class="waysBox-list-item" v-for="(item,index) in typeList" :key="index"
							 :class="{ 'active': typeActive == index }" @click="bindChange(index)">{{item.name}}</view>
							<!-- <view class="waysBox-list-item" :class="{ 'active': typeActive == 0 }" @click="bindChange(0)">TRC20</view>
							<view class="waysBox-list-item" :class="{ 'active': typeActive == 1 }" @click="bindChange(1)">ERC20</view> -->
						</view>
					</view>
					
					<view class="recharge-code">
						<view class="recharge-code-qrcode">
							<image class="qrcode" :src="qrcodeImage" mode="" />
						</view>
					</view>
					
					<view class="recharge-box">
						<view class="recharge-btn" @click="saveQrcode()">保存二维码到相册</view>
						<!-- <view class="recharge-border"></view> -->
						<view class="recharge-title">充值地址</view>
						<view class="recharge-addr">{{ qrcodeAddress }}</view>
						<view class="recharge-copy" @click="$tools.copy(qrcodeAddress)">复制</view>
					</view>
					
				</view>	
				
				<view class="form-tips">
					<view class="form-tips-txt">温馨提示</view>
					<view class="form-tips-info">1.您充值到上述地址后，需要整个网络节点确认后方可到账。</view>
					<view class="form-tips-info">2.您的充值地址不会改变，可以重复充值；如有更改，我们会尽量通过网站公告或邮件通知您。</view>
					<view class="form-tips-info">3.请务必确认设备安全，防止信息被篡改或泄露。</view>
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
				array: [],
				typeList: [],
				index: 0,
				typeActive: 0,
				size: 100,
				name: '',
				qrcodeAddress: '',
				qrcodeImage: '',
				type:1,
				selectType:'',
				omni:'',
				trx:'',
				erc:'',
				currencyId:'',
				min:'',
			}
		},
		onShow() {
			this.init();
		},
		methods: {
			init() {
				this.array = [];
				this.getCurrencyList();
				// this.getRecharge();
			},
			//获取币种
			getCurrencyList() {
				this.$Ajax(
					'/front/financial/getCurrencyConfigList',{},
					res => {
						if (res.code == 0) {
							res.obj.forEach(item => {
								if(item.rechargeSwitch == 1){
									this.array.push(item);
								}
							});
							console.log("this.array：",this.array);
							if(this.selectType == ''){
								this.selectType = this.array[0].currencyName;
							}
							if(this.currencyId == ''){
								this.currencyId = this.array[0].currencyId;
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
							// console.log(JSON.stringify(res.obj));
							this.typeList = res.obj.address;
							if (res.obj.main) {
								this.qrcodeAddress = res.obj.address;
								this.qrcodeImage = QR.createQrCodeImg(res.obj.address);
							} else {
								this.qrcodeAddress = this.typeList[this.typeActive].address;
								this.qrcodeImage = QR.createQrCodeImg(this.typeList[this.typeActive].address);
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
				console.log('picker发送选择改变，携带值为：' + this.index +';currencyId：'+ this.array[e.detail.value].currencyId+';selectType：' + this.array[e.detail.value].currencyName)
				this.index = e.detail.value
				this.currencyId = this.array[e.detail.value].currencyId
				this.selectType = this.array[e.detail.value].currencyName
				this.typeActive = 0;
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
	page,.pages{background: $globalColor-bgStyle;height: 100vh;}
	.waysBox{
		&-list{
			@include flexLeft;
			&-item{
				background: #232323;
				color: #747474;
				font-size: 31upx;
				padding: 8upx 31upx;
				margin: 30upx;
				border-radius: 4upx;
			}
			.active{
				color: #232323;
				background: $globalColor-style;
			}
		}
	}
</style>
