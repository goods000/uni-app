<template>
	<view class="page">
		<view class="header_bar">
			<view class="header">
				<view class="header-back--white" @click="$tools.back(1)"></view>
				<view class="header-title-white">充币</view>
				<view class="header-right" @click="$tools.jump('./rechargeRecord',currencyId,selectType)">
					<image src="../../static/public/icon-records-white.png" mode="widthFix"></image>
				</view>
			</view> 
		</view> 
		
		<view class="recharge">
			<view class="rechargeBox">
				<view class="rechargeBox-listItem">
					<!-- <view class="rechargeBox-listItem-title">选择币种</view> -->
					<view class="rechargeBox-listItem-picker">
						<picker @change="bindPickerChange" :value="index" :range="array" range-key="currencyName">
							<!-- <view class="uni-input">{{array[index].currencyName}}</view> -->
							<view class="uni-input">{{selectType}}</view>
						</picker>
					</view>
				</view> 
				<view class="rechargeBox-list">
					<view class="rechargeBox-list-title">链名称</view>
					<view class="rechargeBox-list-item">
						<view class="rechargeBox-list-item-type" v-for="(item,index) in typeList" :key="index"
						 :class="{ 'rechargeBox-list-item-type--active': tabsActive == index }" @click="changeTabsActive(index)">{{item.name}}</view>
						<!-- <view class="rechargeBox-list-item-type" :class="{'rechargeBox-list-item-type--active': tabsActive == 0 }" @click="changeTabsActive(0)">TRC20</view>
						<view class="rechargeBox-list-item-type" :class="{'rechargeBox-list-item-type--active': tabsActive == 1 }" @click="changeTabsActive(1)">ERC20</view>
				 -->	</view>
				</view>
				
				<view class="rechargeBox-code">
					<view class="rechargeBox-code-qrcode">
						<image class="qrcode" v-if="qrcodeImage != ''" :src="qrcodeImage" mode="" />
					</view>
					<view class="rechargeBox-code-codeBtn" @click="saveQrcode()">保存二维码至相册</view>
					<view class="rechargeBox-code-title">充币地址</view>
					<view class="rechargeBox-code-box">
						<view class="rechargeBox-code-box-num">{{ qrcodeAddress }}</view>
						<view class="rechargeBox-code-box-image" @click="$tools.copy(qrcodeAddress)">
							<image src="../../static/public/icon-copy-grey.png" mode="widthFix"></image>
						</view>
					</view>
				</view>
				<view class="rechargeBox-tips">
					<view class="rechargeBox-tips-title">温馨提示</view>
					<view class="rechargeBox-tips-item">1.USDT钱包地址禁止充币除USDT之外的其他资产充币将不可找回。</view>
					<view class="rechargeBox-tips-item">2.为保障资金安全，当您账户安全策略变更、密码修改、我们会对提币进行人工审核，请耐心等待工作人员电话或邮件联系。</view>
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
				title: 'picker',
				array: [{currencyName:'USDT',currencyId:1},{currencyName:'FIL',currencyId:3},],
				typeList:[],
				index: 0,
				tabsActive: 0,
				val : '0xdaurewfjenewiqru9ewfwou9ewjs',
				size: 100,
				img: '',
				userList:[],
				currencyId:'',
				selectType:'',
				showBackBtn: true,
				qrcodeAddress: '0xdai165sf1d45vdnf1fz1n1f10b12fb',
				qrcodeImage: '',
			}
		},
		onLoad(hash) {
			this.type = hash.value1;
		},
		onShow() {
			// this.qrcodeImage = QR.createQrCodeImg('0xdai165sf1d45vdnf1fz1n1f10b12fb');
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
						type: 1
					},
					res => {
						if (res.code == 0) {
							this.array = res.obj;
							this.array.forEach((item,index) => {
								item.currencyName = item.currencyName;
								item.currencyId = item.currencyId;
								if(item.currencyName == this.type){
									this.selectType = this.array[index].currencyName
									this.currencyId = this.array[index].currencyId
								}
							});
							
							// if(this.selectType == ''){
							// 	this.selectType = this.array[0].currencyName;
							// }
							// if(this.currencyId == ''){
							// 	this.currencyId = this.array[0].currencyId;
							// }
							
							this.getRecharge();
						}
					}
				);
			},
			//获取充币地址
			getRecharge() {
				this.$Ajax(
					'/front/financial/rechargeInit',
					{
						currencyId: this.currencyId
					},
					res => {
						if (res.code == 0) {
							console.log(JSON.stringify(res.obj));
							this.typeList = res.obj.address;
							if (res.obj.main) {
								this.qrcodeAddress = res.obj.address;
								this.qrcodeImage = QR.createQrCodeImg(res.obj.address);
							} else {
								this.qrcodeAddress = this.typeList[this.tabsActive].address;
								this.qrcodeImage = QR.createQrCodeImg(this.typeList[this.tabsActive].address);
							}
							
							// this.ways = res.obj.address;
							// if(this.currencyId == 1){
							// 	if(this.ways == undefined){
							// 		this.qrcodeAddress = res.obj.address;
							// 		this.qrcodeImage = QR.createQrCodeImg(res.obj.address);
							// 	}else{
							// 		if(this.tabsActive == 0){
							// 			if(res.obj.address[0].name == 'TRC20'){
							// 				this.qrcodeAddress = res.obj.address[0].address;
							// 				this.qrcodeImage = QR.createQrCodeImg(res.obj.address[0].address);
							// 			}
							// 		}else if(this.tabsActive == 1){
							// 			if(res.obj.address[1].name == 'ERC20'){
							// 				this.qrcodeAddress = res.obj.address[1].address;
							// 				this.qrcodeImage = QR.createQrCodeImg(res.obj.address[1].address);
							// 			}
							// 		}
							// 	}
							// }else{
							// 	this.qrcodeAddress = res.obj.address;
							// 	this.qrcodeImage = QR.createQrCodeImg(res.obj.address);
							// }
						}
					}
				);
			},
			changeTabsActive(index) {
				this.tabsActive = index;
				this.getRecharge();
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.detail.value+';当前值是' + this.array[e.detail.value].currencyName)
				this.index = e.detail.value
				this.selectType = this.array[e.detail.value].currencyName
				this.currencyId = this.array[e.detail.value].currencyId
				this.typeActive = 1;
				console.log(this.currencyId)
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
	@import '/scss/recharge';
	page,.page{
		background: $globalColor-style;
		/* #ifdef APP-PLUS */
		min-height: 100vh;
		/* #endif */
		overflow: scroll;
	}
</style>
