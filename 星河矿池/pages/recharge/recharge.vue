<template>
	<view class="page">
		<view class="header_bar">
			<view class="header">
				<view class="header-goBack" @click="$tools.back(1)"></view>
				<view class="header-title">充币</view>
				<view class="header-goRight" @click="$tools.jump('./rechargeRecord',currencyId,selectType)"></view> 
			</view> 
		</view> 
		
		<view class="recharge">
			<view class="rechargeBox">
				<view class="rechargeBox-listItem">
					<view class="rechargeBox-listItem-title">选择币种</view>
					<view class="rechargeBox-listItem-picker">
						<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
							<view class="uni-input">{{array[index].name}}</view>
						</picker>
					</view>
				</view> 
				<view class="rechargeBox-list" v-if="currencyId == 1">
					<view class="rechargeBox-list-title">链名称</view>
					<view class="rechargeBox-list-item">
						<view class="rechargeBox-list-item-type" v-for="(item,index) in ways"
						 :class="{'rechargeBox-list-item-type--active': tabsActive == index }" @click="changeTabsActive(index)">{{ item.name }}</view>
					</view>
					<!-- <view class="rechargeBox-list-item">
						<view class="rechargeBox-list-item-type" :class="{'rechargeBox-list-item-type--active': tabsActive == 0 }" @click="changeTabsActive(0)">TRC20</view>
						<view class="rechargeBox-list-item-type" :class="{'rechargeBox-list-item-type--active': tabsActive == 1 }" @click="changeTabsActive(1)">ERC20</view>
					</view> -->
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
							<image src="../../static/public/icon-record.png" mode="widthFix"></image>
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
				array: [{name:'FIL',key:3},{name:'USDT',key:1}],
				index: 0,
				tabsActive: 0,
				val : '0xdaurewfjenewiqru9ewfwou9ewjs',
				size: 100,
				img: '',
				userList:[],
				currencyId:'',
				selectType:'',
				showBackBtn: true,
				qrcodeAddress: '',
				qrcodeImage: '',
				ways:[],
			}
		},
		onShow() {
			this.init();
		},
		methods: {
			init() {
				this.getCurrencyList();
				// if(this.selectType == ''){
				// 	this.selectType = this.array[0].name;
				// }
				// if(this.currencyId == ''){
				// 	this.currencyId = this.array[0].key;
				// }
				// this.getRecharge();
			},
			//获取币种
			getCurrencyList() {
				this.$Ajax(
					'/front/miner/currencyList',
					{
						type: 1
					},
					res => {
						if (res.code == 0) {
							this.array = res.obj;
							this.array.forEach(item => {
								item.name = item.name;
								item.key = item.key;
							});
							
							if(this.selectType == ''){
								this.selectType = this.array[0].name;
							}
							if(this.currencyId == ''){
								this.currencyId = this.array[0].key;
							}
							
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
							// this.ways = res.obj.address;
							if(res.obj.main == false){
								this.ways = res.obj.address;
								this.qrcodeAddress = res.obj.address[this.tabsActive].address;
								this.qrcodeImage = QR.createQrCodeImg(res.obj.address[this.tabsActive].address);
								
							}
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
							// }
							else{
								this.qrcodeAddress = res.obj.address;
								this.qrcodeImage = QR.createQrCodeImg(res.obj.address);
							}
						}
					}
				);
			},
			changeTabsActive(index) {
				this.tabsActive = index;
				this.getRecharge();
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.detail.value+';当前值是' + this.array[e.detail.value].name)
				this.index = e.detail.value
				this.selectType = this.array[e.detail.value].name
				this.currencyId = this.array[e.detail.value].key
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
	@import '@/common/scss/pages/recharge/recharge';
	.page{
		background: #F7F7F7;
		height: 100vh;
		overflow: scroll;
	}
</style>
