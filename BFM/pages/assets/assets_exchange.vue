<template>
	<view class="pages">
		<view class="initHeader initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.switchTab('../assets/assets')"></view>
				<view class="initHeader-title">划转</view>
				<view class="initHeader-record" @click="$tools.jump('../assets/assets_exchange_record', currencyVal, currencyLabel)"></view>
			</view>
		</view>
		<view class="main">
			<view class="selectBox" @click="currencyVisible = true">
				<view class="selectBox-wrapper">
					<view class="selectBox-label">选择币种</view>
					<view class="selectBox-data">{{ currencyLabel }}</view>
				</view>
			</view>
			
			<view class="conversionBox">
				<view class="conversionBox-wrapper">
					<!-- <view class="conversionBox-ellipsis"></view> -->
					<view class="conversionBox-select">
						<view class="conversionBox-select__list">
							<view class="conversionBox-select__list-label">币币账户：</view>
							<text class="conversionBox-select__list-data">{{ currencyLabel }}</text>
						</view>
						<view class="conversionBox-select__list">
							<view class="conversionBox-select__list-label">矿池账户：</view>
							<text class="conversionBox-select__list-data">BLJ</text>
						</view>
					</view>
					<!-- <view class="conversionBox-plane">
						<view class="conversionBox-plane__list" :class="conversionType == 0 ? 'conversionBox-plane__list--first' : 'conversionBox-plane__list--last'">
							{{ transferConstant }}
						</view>
						<view class="conversionBox-plane__list " :class="conversionType == 0 ? 'conversionBox-plane__list--last' : 'conversionBox-plane__list--first'">
							{{ transferChange }}
						</view>
					</view> -->
					 <!-- @click="changeConversionType()" -->
					<view class="conversionBox-button"></view>
				</view>
			</view>
			<!-- <view class="filterBox" v-show="conversionType == 1">
				<view class="filterBox-wrapper">
					<view class="filterBox-title">类型</view>
					<view class="filterBox-button">
						<view class="filterBox-button__btn" :class="{ 'filterBox-button__btn--active': typeActive == 0 }" @click="changeTypeActive(0)">矿池</view>
						<view class="filterBox-button__btn" :class="{ 'filterBox-button__btn--active': typeActive == 1 }" @click="changeTypeActive(1)">节点</view>
						<view class="filterBox-button__btn" :class="{ 'filterBox-button__btn--active': typeActive == 2 }" @click="changeTypeActive(2)">收益</view>
					</view>
				</view>
			</view> -->
			<view class="inputBox">
				<view class="inputBox-title">划转数量</view>
				<view class="inputBox-list">
					<view class="inputBox-list__input"><input type="text" placeholder-class="inputBox-list__placeholder" placeholder="请输入划转的数量" v-model="quantity" /></view>
					<text class="inputBox-list__type">{{ currencyLabel }}</text>
					<text class="inputBox-list__btn" @click="getAll()">全部</text>
				</view>
				<view class="inputBox-result">可用: {{ using }} {{ currencyLabel }}</view>
				
				<view class="inputBox-title">交易密码</view>
				<view class="inputBox-list">
					<view class="inputBox-list__input"><input type="password" placeholder-class="inputBox-list__placeholder" placeholder="请输入您的交易密码" v-model="tradePwd" /></view>
				</view>
			</view>
			<view class="initButton"><view class="initButton-btn initButton-btn--style" @click="transter()">确定</view></view>
		</view>

		<!-- 币种选择 -->
		<w-picker
			:visible.sync="currencyVisible"
			mode="selector"
			ref="currencyPicker"
			default-type="label"
			:options="currencyArray"
			@confirm="onPickerConfirm($event, 'currencyPicker')"
		></w-picker>
	</view>
</template>

<script>
import vPicker from '@/components/w-picker/w-picker.vue';
export default {
	components: {
		vPicker
	},
	data() {
		return {
			quantity: '',
			tradePwd: '',

			transferConstant: '币币账户',
			transferConstantVal: 1,
			transferChange: '矿池账户',
			transferChangeVal: 2,

			currencyVisible: false,
			currencyLabel: '', //币种
			currencyVal: null,
			currencyArray: [],

			conversionType: 0,
			typeActive: 0,

			assetsModeList: [],
			walletList: [],

			using: 0
		};
	},
	onShow() {
		this.quantity = '';
		this.init();
	},
	methods: {
		init() {
			// this.getAssetsMode();
			this.getCurrencyList();
		},
		getCurrencyList() {
			this.$Ajax('/front/inner/coin/list', {}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					if(res.obj.length == 0){
						return false;
					}
					this.currencyArray = res.obj;
					this.currencyArray.forEach(item => {
						item.label = item.currencyName;
						item.value = item.currencyId;
					});
					console.log(JSON.stringify(this.currencyArray));
					this.currencyLabel = this.currencyArray[0].label;
					this.currencyVal = this.currencyArray[0].value;
					this.getUsing();
				}
			});
		},
		getUsing() {
			this.$Ajax(
				'/front/financial/currency/wallet',
				{
					currencyName: this.currencyLabel
				},
				res => {
					console.log(JSON.stringify(res.obj));
					if (res.code == 0) {
						console.log(this.conversionType);
						if (this.conversionType == 0) {
							this.using = res.obj.using;
						} else if (this.conversionType == 1 && this.typeActive == 0) {
							this.using = res.obj.poolUsing;
						} else if (this.conversionType == 1 && this.typeActive == 1) {
							this.using = res.obj.poolDrop;
						} else if (this.conversionType == 1 && this.typeActive == 2) {
							this.using = res.obj.poolProfit;
						}
					}
				}
			);
		},
		changeTypeActive(index) {
			this.typeActive = index;
			this.getUsing();
		},
		changeConversionType() {
			if (this.conversionType == 0) {
				this.conversionType = 1;
			} else {
				this.conversionType = 0;
			}
			this.quantity = '';
			this.tradePwd = '';
			this.getUsing();
		},
		getAll() {
			this.quantity = this.using;
		},
		transter() {
			if (this.quantity == '') {
				return this.$tools.toast('请输入划转数量');
			}

			if (this.tradePwd == '') {
				return this.$tools.toast('请输入您的交易密码');
			}

			this.$Ajax(
				'/front/inner/action/do',
				{
					currencyId: this.currencyVal,
					quantity: this.quantity,
					tradePwd: this.tradePwd
				},
				res => {
					if (res.code == 0) {
						this.$tools.toast('划转成功');
						this.quantity = '';
						this.tradePwd = '';
						this.getUsing();
					}
				}
			);
		},

		/* 底部选项卡公用 */
		onPickerConfirm(res, type) {
			console.log('当前控制的Picker是：' + type + ';当前值是' + res.obj.value);

			if (type == 'currencyPicker') {
				this.currencyLabel = res.obj.label;
				this.currencyVal = res.obj.value;
				this.getUsing();
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/assets/assets_exchange';
</style>
