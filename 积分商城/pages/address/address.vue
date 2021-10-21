<template>
	<view class="pages bg_header">
		<view>
			<view class="initHeader initHeader--bgStyle initHeader--white">
				<view class="initHeader-wrapper">
					<view class="initHeader-back" @click="$tools.back(1)"></view>
					<view class="initHeader-title">收货地址管理</view>
				</view>
			</view>
			
			<view class="main">
				<view class="addressList">
					<view class="addressList-wrapper">
						<view class="initNoAddress" v-if="addressList.length == 0">暂无收货地址</view>
						<view class="addressList-wrapper__item" v-for="(item,index) in addressList" :key="index" v-else>
							<view class="box" v-if="addType == 1" @click="getOrder(item.id)">
								<view class="addressList-wrapper__item--title">
									<text v-if="item.defaultFlag == 1">默认</text>
									{{ item.provinceName }} {{ item.cityName }}  {{ item.countyName }}
								</view>
								<view class="addressList-wrapper__item--address">{{ item.detailAddress }}</view>
								<view class="addressList-wrapper__item--operate">
									<text>{{ item.name }}</text>
									<text>{{ item.tel }}</text>
									<image src="../../static/address/icon-address-edit.png" mode="widthFix" @click="$tools.jump('./editAddress',item.id)"></image>
								</view>
							</view>
							<view class="box" v-else>
								<view class="addressList-wrapper__item--title">
									<text v-if="item.defaultFlag == 1">默认</text>
									{{ item.provinceName }} {{ item.cityName }}  {{ item.countyName }}
								</view>
								<view class="addressList-wrapper__item--address">{{ item.detailAddress }}</view>
								<view class="addressList-wrapper__item--operate">
									<text>{{ item.name }}</text>
									<text>{{ item.tel }}</text>
									<image src="../../static/address/icon-address-edit.png" mode="widthFix" @click="$tools.jump('./editAddress',item.id)"></image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="addressList-btn">
				<view class="initBtn" @click="$tools.jump('./editAddress','')">
					添加地址
				</view>
			</view>
		</view> 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressList:[
					{id:1,title:'广东省 深圳市 龙华区',address:'民治街道民泰社区龙华大道2号14楼14-3C',name:'小飞飞',phone:'188 **** 888'},
					{id:2,title:'广东省 深圳市 龙华区',address:'民治街道民泰社区龙华大道2号14楼14-3C',name:'小飞飞',phone:'188 **** 888'},
				],
				// 页数
				pageSize: 20,
				pageNum: 1,
				pages: 0,
				addType:'',
			}
		},
		onLoad(hash) {
			this.addType = hash.value1;
		},
		onShow() {
			this.init();
		},
		onReachBottom() {
			if (this.pageNum >= this.pages) {
				return this.$tools.toast('到底了');
			}
			this.pageNum++;
			this.getRecord();
		},
		methods: {
			init() {
				this.getAddressList();
			},
			getOrder(id){
				let addressuId = uni.setStorageSync('addressuId', id);
				// this.$tools.jump('../shop/shop_confirmOrder',addressuId);
				this.$tools.back(1);
			},
			getAddressList() {
				this.$Ajax('/front/address/getUserAddressList', {}, res => {
					// console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.addressList = res.obj;
					}
				});
			},
		}
	}
	</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/address/address';
</style>
