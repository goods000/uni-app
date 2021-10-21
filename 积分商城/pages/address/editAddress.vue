<template>
	<view class="pages bg_header">
		<view class="initHeader initHeader--bgStyle initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">{{ addressId == '' ? '添加' : '编辑' }}收货地址</view>
				<view class="initHeader-right initHeader-right--text" @click="deleteAddress()" v-if="addressId != ''">删除</view>
			</view>
		</view>

		<view class="main">
			<view class="contentTrans contentTrans-no">
				<view class="inputBox">
					<view class="inputBox-wrapper">
						<view class="inputBox-item" :class="{ 'inputBox-item--active': isFocus == 0}">
							<view class="inputBox-item__label">收货人</view>
							<view class="inputBox-item__list">
								<view class="inputBox-item__input">
									<input type="text" @blur="blurInput(0)" @focus="focusInput(0)" placeholder-class="inputBox-item__placeholder"
										placeholder="请输入收货人姓名" v-model="name" />
								</view>
							</view>
						</view>
						<view class="inputBox-item" :class="{ 'inputBox-item--active': isFocus == 1}">
							<view class="inputBox-item__label">手机号码</view>
							<view class="inputBox-item__list">
								<view class="inputBox-item__input">
									<input type="text" @blur="blurInput(1)" @focus="focusInput(1)" placeholder-class="inputBox-item__placeholder"
										placeholder="请填写收货人手机号" v-model="phone" />
									<!-- <view class="inputBox-item__fixedBox"></view> -->
								</view>
							</view>
						</view>
						<view class="inputBox-item" :class="{ 'inputBox-item--active': isFocus == 2}">
							<view class="inputBox-item__label">所在地区</view>
							<view class="inputBox-item__list">
								<view class="inputBox-item__input">
									<input type="text" @blur="blurInput(2)" @focus="focusInput(2)" placeholder-class="inputBox-item__placeholder"
										placeholder="县市区县等" v-model="result.result" @click="regionVisible = true" disabled="disabled"/>
									<view class="inputBox-item__fixedBox">
										<image src="../../static/public/icon-arrow-right-grey.png" mode="widthFix"></image>
									</view>
								</view>
							</view>
						</view>
						<view class="inputBox-item" :class="{ 'inputBox-item--active': isFocus == 3}">
							<view class="inputBox-item__label">详细地址</view>
							<view class="inputBox-item__list">
								<view class="inputBox-item__input">
									<input type="text" @blur="blurInput(3)" @focus="focusInput(3)" placeholder-class="inputBox-item__placeholder"
										placeholder="请输入您的详细住址，如小区名称，楼道号等" v-model="address" />
								</view>
							</view>
						</view>
						
						<view class="recommendBox">
							<view class="recommendBox-wrapper">
								<view class="recommendBox-wrapper-item">
									<view class="">
										<view class="recommendBox-title">设置默认地址</view>
										<view class="recommendBox-txt">注意：打开后,每次下单会默认使用该地址</view>
									</view>
									<view class="recommendBox-wrapper-right" v-if="this.addressId != ''">
										<view v-if="defaultFlag == 0">
											<image :src="addressType ? '../../static/address/icon-address-1.png' : '../../static/address/icon-address-0.png'" mode="widthFix" @click="upadtecheck()" class="recommendBox-wrapper-right--image"></image>
												</view>
										<view v-if="defaultFlag == 1">
											<image :src="addressType ? '../../static/address/icon-address-1.png' : '../../static/address/icon-address-0.png'" mode="widthFix" @click="upadtecheck()" class="recommendBox-wrapper-right--image"></image>
											<!-- <image v-if="defaultFlag == 0" src="../../static/address/icon-address-0.png" mode="widthFix" class="recommendBox-wrapper-right--image"></image> -->
											<!-- <image v-if="defaultFlag == 1" src="../../static/address/icon-address-1.png" mode="widthFix" class="recommendBox-wrapper-right--image"></image> -->
										</view>
									</view>
									<view class="recommendBox-wrapper-right" v-else>
										<image :src="addressType ? '../../static/address/icon-address-1.png' : '../../static/address/icon-address-0.png'" mode="widthFix" @click="check()" class="recommendBox-wrapper-right--image"></image>
									</view>
								</view>
							</view>
						</view>
						
					</view>
				</view>
			</view>
			
			<view class="initBtn"  @click="selectMethods()">
				确定
			</view>
		</view>
			
		<!-- 城市选择模态框 -->
		<w-picker
			:visible.sync="regionVisible"
			mode="region"
			:value="defaultRegion"
			default-type="value"
			:hide-area="false"
			@confirm="onConfirm($event, 'region')"
			ref="region"
		></w-picker>	
		
	</view>
</template>

<script>
import vPicker from '@/components/w-picker/w-picker.vue';
	
export default {
	components: { vPicker },
	data() {
		return {
			isFocus: null,
			name: '',
			phone: '',
			city: '',
			address: '',
			addressId:'',
			defaultFlag: '',
			defaultAddress: 0,
			addressType:false,
			regionVisible: false,
			result: {
				result: '请选择地址'
			},
			defaultRegion: ['440000', '440300', '440307'],
		};
	},
	onShow() {
		this.init();
	},
	methods: {
		focusInput(index) {
			this.isFocus = index;
		},
		blurInput(index) {
			this.isFocus = null;
		},
		onLoad(hash) {
			if(hash.value1){
				this.addressId = hash.value1;
			}
		},
		init(){
			if (this.addressId != '') {
				this.getAddressInfo();
				console.log(this.defaultFlag)
			}
		},
		selectMethods() {
			if (this.addressId == '') {
				this.config();
			} else {
				this.upadteAddress();
			}
		},
		getAddressInfo(){
			this.$Ajax(
				'/front/address/getUserAddressDetail',
				{
					userAddressId: this.addressId
				},
				res => {
					// console.log('地址详情：' + JSON.stringify(res));
					if (res.code == 0) {
						this.name = res.obj.name;
						this.phone = res.obj.tel;
						this.province = res.obj.provinceName;
						this.city = res.obj.cityName;
						this.area = res.obj.countyName;
						this.result.result = this.province + this.city + this.area;
						this.address = res.obj.detailAddress;
						this.defaultFlag = res.obj.defaultFlag;
						if(this.defaultFlag == 1){
							this.addressType = true;
						}else{
							this.addressType = false;
						}
					}
				}
			);
		},
		config() {
			let that = this;
			if (this.name == '') {
				return this.$tools.toast('请输入收货人姓名');
			}
			if (this.phone == '') {
				return this.$tools.toast('请填写收货人手机号');
			}
			if (this.city == '') {
				return this.$tools.toast('请选择县市区县等');
			}
			if (this.address == '') {
				return this.$tools.toast('请输入您的详细住址，如小区名称，楼道号等');
			}
			this.$Ajax('/front/address/addUserAddress',{
					name: this.name,
					tel: this.phone,
					province: this.province,
					city: this.city,
					county: this.area,
					detailAddress: this.address,
					defaultFlag: this.defaultAddress
				},
				res => {
					console.log(JSON.stringify(res.data));
					if (res.code == 0) {
						that.$tools.toastBack('添加成功', 1);
					}
				}
			);
		},
		upadteAddress() {
			this.$Ajax(
				'/front/address/updateUserAddress',
				{
					name: this.name,
					tel: this.phone,
					province: this.province,
					city: this.city,
					county: this.area,
					detailAddress: this.address,
					userAddressId: this.addressId,
				},
				res => {
					if (res.code == 0) {
						this.$tools.toastBack('更新成功', 1);
					}
				}
			);
		},
		deleteAddress(){
			this.$Ajax(
				'/front/address/deleteUserAddressById',
				{
					userAddressId: this.addressId
				},
				res => {
					if (res.code == 0) {
						this.$tools.toastBack('删除成功', 1);
					}
				}
			);
		},
		check(){
			if(this.addressType == true){
				this.addressType = false;
				this.defaultAddress = 0;
			}else{
				this.addressType = true;
				this.defaultAddress = 1;
			}
		},
		upadtecheck(){
			if(this.addressType == true){
				this.addressType = false;
				this.defaultAddress = 0;
			}else{
				this.addressType = true;
				this.defaultAddress = 1;
			}
			this.$Ajax('/front/address/updateDefaultFlagById',{
					userAddressId: this.addressId,
					defaultFlag: this.defaultAddress,
				},
				res => {
					console.log(JSON.stringify(res.data));
					if (res.code == 0) {
						console.log("this.defaultAddress：",this.defaultAddress);
					}
				}
			);
		},
		// switchChange(e) {
		// 	console.log('switch1 发生 change 事件，携带值为', e.target.value);
		// 	if(e.target.value){
		// 		this.defaultAddress = 1;
		// 	}else{
		// 		this.defaultAddress = 0;
		// 	}
		// },
		onConfirm(res) {
			this.result = res;
			this.province = this.result.obj.province.label;
			this.city = this.result.obj.city.label;
			this.area = this.result.obj.area.label;
			console.log(JSON.stringify(res));
		},
	}
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/transaction/transaction';
.initBtn{
	margin-top: 273upx;
}
.recommendBox-wrapper{
	padding: 50upx 10upx;
}
</style>
