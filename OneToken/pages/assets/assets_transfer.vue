<template>
	<view class="pages">
		<view class="initHeader initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">划转</view>
				<view class="initHeader-record" @click="$tools.jump('../assets/assets_transfer_record')"></view>
			</view>
		</view>
		<view class="main">
			<!-- <view class="infoBox">
				<view class="selectBox" @click="currencyVisible = true">
					<view class="selectBox-wrapper">
						<view class="selectBox-label">选择币种</view>
						<view class="selectBox-data">{{ currencyLabel }}</view>
					</view>
				</view>
			</view> -->
			<view class="conversionBox">
				<view class="conversionBox-wrapper">
					<!-- <view class="conversionBox-ellipsis"></view> -->
					<view class="conversionBox-select">
						<view class="conversionBox-select__list">
							<view class="conversionBox-select__list-label">转出：</view>
							<!-- <text class="conversionBox-select__list-data">币币账户</text> -->
						</view>
						<view class="conversionBox-select__list">
							<view class="conversionBox-select__list-label">转入：</view>
							<!-- <text class="conversionBox-select__list-data conversionBox-select__list-data--arrow" @click="$tools.jump('../assets/assets_exchange_select')">法币账户</text> -->
						</view>
					</view>
					<view class="conversionBox-plane">
						<view class="conversionBox-plane__list" :class="conversionType == 0 ? 'conversionBox-plane__list--first' : 'conversionBox-plane__list--last'">
							{{ transferConstant }}
						</view>
						<view class="conversionBox-plane__list " :class="conversionType == 0 ? 'conversionBox-plane__list--last' : 'conversionBox-plane__list--first'">
							{{ transferChange }}
						</view>
					</view>
					 <!-- @click="changeConversionType()" -->
					<view class="conversionBox-button"></view>
				</view>
			</view>
			<view class="initFormBox">
				<view class="initFormBox-wrapper">
					<view class="initFormBox-item">
						<view class="initFormBox-item__label">数量</view>
						<view class="initFormBox-item__list">
							<view class="initFormBox-item__input">
								<input type="number" placeholder-class="initFormBox-item__placeholder" placeholder="请输入数量" v-model="quantity" />
								<text class="initFormBox-item__input-type">{{ currencyLabel }}</text>
								<text class="initFormBox-item__input-btn" @click="getAll()">全部</text>
							</view>
						</view>
						<view class="initFormBox-item__note">*可用数量: {{ currencyInfo.reward }} {{ currencyLabel }}</view>
					</view>
					<view class="initFormBox-item">
						<view class="initFormBox-item__label">交易密码</view>
						<view class="initFormBox-item__list">
							<view class="initFormBox-item__input">
								<input type="password" placeholder-class="initFormBox-item__placeholder" placeholder="请输入您的交易密码" v-model="tradePwd" />
							</view>
						</view>
					</view>
				</view>
			</view>
			
			
			<!-- <view class="inputBox">
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
			</view> -->
		</view>
		
		<view class="initButton initButton--absolute"><view class="initButton-btn initButton-btn--style" @click="transfer()">确定</view></view>

	</view>
</template>

<script>
export default {
	data() {
		return {
			currencyInfo: [],
			quantity: '',
			tradePwd: '',

			transferConstant: '佣金账户',
			transferConstantVal: 1,
			transferChange: '资金账户',
			transferChangeVal: 2,

			currencyVisible: false,
			currencyLabel: 'ONU', //币种
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
		this.init();
	},
	methods: {
		init() {
			this.getUsing();
		},
		getUsing() {
			this.$Ajax(
				'/front/wallet/currency/fund',
				{
					currencyName: this.currencyLabel
				},
				res => {
					console.log(JSON.stringify(res.obj));
					if (res.code == 0) {
						this.currencyInfo = res.obj;
					}
				}
			);
		},
		getAll() {
			this.quantity = this.currencyInfo.reward;
		},
		transfer() {
			if (this.quantity == '') {
				return this.$tools.toast('请输入划转数量');
			}

			if (this.tradePwd == '') {
				return this.$tools.toast('请输入交易密码');
			}

			this.$Ajax(
				'/front/wallet/reward/transfer',
				{
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
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/assets_transfer';
</style>
