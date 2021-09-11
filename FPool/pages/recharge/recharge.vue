<template>
	<view class="page">
		<view class="header_bar">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">{{ i18n.global.recharge }}</view>
				<view class="header-right" @click="$tools.jump('./rechargeRecord',currencyId,selectType)">
					<image src="../../static/public/icon-record.png" mode="widthFix"></image>
				</view> 
			</view> 
		</view> 
		
		<view class="recharge">
			<view class="rechargeBox">
				<view class="rechargeBox-listItem" @click="currencyVisible = true">
					<view class="rechargeBox-listItem-title">{{ i18n.recharge.selectLabel }}</view>
					<view class="rechargeBox-listItem-picker">
						<!-- <picker @change="bindPickerChange" :value="index" :range="array" range-key="label">
							<view class="uni-input">{{array[index].label}}</view>
						</picker> -->
						<view class="uni-input">{{selectType}}</view>
					</view>
				</view> 
				<view class="rechargeBox-list" v-if="currencyId == 1">
					<view class="rechargeBox-list-title">{{ i18n.recharge.chainName }}</view>
					<view class="rechargeBox-list-item">
						<view class="rechargeBox-list-item-type" :class="{'rechargeBox-list-item-type--active': tabsActive == 0 }" @click="changeTabsActive(0)">ERC20</view>
						<view class="rechargeBox-list-item-type" :class="{'rechargeBox-list-item-type--active': tabsActive == 1 }" @click="changeTabsActive(1)">TRC20</view>
					</view>
				</view>
				
				<view class="rechargeBox-code">
					<view class="rechargeBox-code-qrcode">
						<image class="qrcode" v-if="qrcodeImage != ''" :src="qrcodeImage" mode="" />
					</view>
					<view class="rechargeBox-code-codeBtn" @click="saveQrcode()">{{ i18n.recharge.save }}</view>
					<view class="rechargeBox-code-title">{{ i18n.recharge.address }}</view>
					<view class="rechargeBox-code-box">
						<view class="rechargeBox-code-box-num">{{ qrcodeAddress }}</view>
						<view class="rechargeBox-code-box-image" @click="$tools.copy(qrcodeAddress)">
							<image src="../../static/public/icon-record.png" mode="widthFix"></image>
						</view>
					</view>
				</view>
				<view class="rechargeBox-tips">
					<view class="rechargeBox-tips-title">{{ i18n.global.reminder }}</view>
					<view class="rechargeBox-tips-item">1.{{ i18n.recharge.tips_01 }}</view>
					<view class="rechargeBox-tips-item">2.{{ i18n.recharge.tips_02 }}</view>
				</view>
				
			</view>
		</view>
		
		<!-- 币种选择 -->
		<w-picker
			:visible.sync="currencyVisible"
			mode="selector"
			ref="currencyPicker"
			default-type="label"
			:options="array"
			@confirm="onPickerConfirm($event, 'currencyPicker')"
		></w-picker>
		
	</view>
</template>

<script>
	import QR from '../../components/qrcode/qrcode.js';
	import vPicker from '@/components/w-picker/w-picker.vue';
	export default {
		components: {
			vPicker
		},
		data() {
			return {
				currencyVisible: false,
				array: [{label:''}],
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
			}
		},
		computed: {
			i18n() {
				return this.$t('message');
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
							this.ways = res.obj.list;
							if(this.currencyId == 1){
								if(this.ways == undefined){
									this.qrcodeAddress = res.obj.address;
									this.qrcodeImage = QR.createQrCodeImg(res.obj.address);
								}else{
									if(this.tabsActive == 0){
										this.qrcodeAddress = res.obj.list[0].erc20;
										this.qrcodeImage = QR.createQrCodeImg(res.obj.list[0].erc20);
									}else if(this.tabsActive == 1){
										this.qrcodeAddress = res.obj.list[1].trx20;
										this.qrcodeImage = QR.createQrCodeImg(res.obj.list[1].trx20);
									}
								}
							}else{
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
			/* 底部选项卡公用 */
			onPickerConfirm(res, type) {
				console.log('当前控制的Picker是：' + type + ';当前值是' + res.obj.label + ';key--value' + res.obj.value);
				if (type == 'currencyPicker') {
					this.selectType = res.obj.label;
					this.currencyId = res.obj.value;
					this.typeActive = 1;
					console.log(this.currencyId)
					this.getRecharge();
				}
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + this.array[e.detail.value].value +';当前值是' + this.array[e.detail.value].value)
				this.index = e.detail.value
				this.selectType = this.array[e.detail.value].label
				this.currencyId = this.array[e.detail.value].value
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
								that.$tools.toast(this.i18n.recharge.saveSuccess);
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
