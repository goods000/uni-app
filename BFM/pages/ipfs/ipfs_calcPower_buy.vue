<template>
	<view class="pages">
		<view class="initHeader initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">算力购买</view>
			</view>
		</view>
		<view class="bgBox"><image src="../../static/ipfs/img-bg-style-3.png" mode="widthFix"></image></view>
		<view class="main">
			<view class="planeBox">
				<view class="planeBox-wrapper">
					<view class="planeBox-info">
						<view class="planeBox-icon"><image src="../../static/ipfs/icon-buy-demo.png" mode="widthFix"></image></view>
						<view class="planeBox-content">
							<view class="planeBox-title">IPFS云算力</view>
							<view class="planeBox-desc">IPFS CLOUD WORK FORCE</view>
							<view class="planeBox-itemBox">
								<view class="planeBox-itemBox__item">
									<view class="planeBox-itemBox__item-label">合约周期</view>
									<view class="planeBox-itemBox__item-data">{{ orderInfo.cloudDays }}天</view>
								</view>
							</view>
						</view>
					</view>
					<view class="planeBox-listBox">
						<view class="planeBox-listBox__list">
							<view class="planeBox-listBox__list-label">购买单价/T</view>
							<view class="planeBox-listBox__list-data">{{ orderInfo.cloudMul }}CNY/1T</view>
						</view>
						<view class="planeBox-listBox__list">
							<view class="planeBox-listBox__list-label">产出收益时间</view>
							<view class="planeBox-listBox__list-data">购买后{{ orderInfo.profitDays }}天后生效</view>
						</view>
						<view class="planeBox-listBox__list">
							<view class="planeBox-listBox__list-label">合计金额</view>
							<view class="planeBox-listBox__list-data">
								<text class="planeBox-listBox__list-data--highlight">{{ amount | number(4) }}</text>
								BLJ
							</view>
						</view>
					</view>

					<view class="planeBox-toolsBox">
						<view class="planeBox-toolsBox__btn planeBox-toolsBox__btn--subtract" @click="quantitySubtract()"></view>
						<view class="planeBox-toolsBox__input"><input v-model="quantity" /></view>
						<view class="planeBox-toolsBox__btn planeBox-toolsBox__btn--add" @click="quantityAdd()"></view>
					</view>
				</view>
			</view>
			<view class="initButton"><view class="initButton-btn initButton-btn--style" @click="openPopup('tradePswPopup')">购买</view></view>

			<view class="agreementBox" @click="toggleStatus()">
				<view class="agreementBox-wrapper">
					<view class="agreementBox-checkbox" :class="{ 'agreementBox-checkbox--active': agreestatus == true }"></view>
					<view class="agreementBox-message">
						我已阅读并知悉
						<text @click.stop="$tools.jump('../ipfs/ipfs_privacyService')">《分币购买用户协议》</text>
						并自觉遵守相关规定
					</view>
				</view>
			</view>
		</view>

		<!-- 交易密码验证 -->
		<uni-popup ref="tradePswPopup" type="center" :animation="true" @change="changePopup">
			<view class="initPopup">
				<view class="initPopup-wrapper">
					<view class="initPopup-title">交易密码</view>
					<view class="initPopup-listBox">
						<view class="initPopup-listBox__list">
							<view class="initPopup-listBox__list-input">
								<input type="password" placeholder-class="initPopup-listBox__list-placeholder" placeholder="请输入交易密码" v-model="tradePwd" />
							</view>
						</view>
					</view>
					<view class="initPopup-buttonBox">
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--cancel" @click="hidePopup('tradePswPopup')">取消</view>
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--confirm" @click="buyOrder()">确定</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue';
export default {
	components: {
		uniPopup
	},
	data() {
		return {
			orderInfo: [],
			orderId: 0,
			tradePwd: '',
			agreestatus: false,
			quantity: 1,
			bljCurrencyId: 0,
			bljPrice: 0,
			amount: 0,
			getPrice_timer: null
		};
	},
	computed: {
		i18n() {
			return this.$t('message');
		}
	},
	watch: {
		bljPrice(newValue, oldValue) {
			this.amount =  this.quantity * this.orderInfo.cloudMul / this.bljPrice;
		},
		quantity(newValue, oldValue) {
			this.amount =  this.quantity * this.orderInfo.cloudMul / this.bljPrice;
		}
	},
	onLoad(hash) {
		this.orderId = hash.value1;
	},
	onShow() {
		this.init();
	},
	methods: {
		init() {
			this.getOrderDetail();
			this.getBLJ2CnyPrice();
			clearInterval(this.getPrice_timer);
			this.getPrice_timer = setInterval(() => {
				this.getBLJ2CnyPrice();
			}, 5000);
		},
		getOrderDetail() {
			this.$Ajax(
				'/front/coin/getCloudPowerList',
				{
					id: this.orderId
				},
				res => {
					console.log('算力信息' + JSON.stringify(res));
					if (res.code == 0) {
						this.orderInfo = res.obj.list[0];
					}
				}
			);
		},
		buyOrder() {
			if (this.tradePwd == '') {
				return this.$tools.toast('请先输入交易密码');
			}
			this.$Ajax(
				'/front/coin/cloudInvestment',
				{
					id: this.orderId,
					amount: this.quantity,
					tradePwd: this.tradePwd
				},
				res => {
					console.log('算力信息' + JSON.stringify(res));
					if (res.code == 0) {
						this.hidePopup('tradePswPopup');
						this.$tools.toastBack('购买成功', 1);
					}
				}
			);
		},
		getBLJCurrencyId() {
			this.$Ajax('/front/financial/assets/total', {}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					res.obj.assetList.forEach((item, index) => {
						if (item.currencyName == 'BLJ') {
							this.bljCurrencyId = item.currencyId;
							this.getBLJ2CnyPrice();
							this.getPrice_timer = setInterval(() => {
								this.getBLJ2CnyPrice();
							});
						}
					});
				}
			});
		},
		getBLJ2CnyPrice() {
			this.$Ajax('/front/coin/getCurrencyCnyPrice', {}, res => {
				console.log('BLJ价格' + JSON.stringify(res));
				if (res.code == 0) {
					this.bljPrice = res.obj;
				}
			});
		},
		
		quantitySubtract() {
			if (this.quantity > 1) {
				this.quantity -= 1;
			}
		},
		quantityAdd() {
			this.quantity += 1;
		},
		toggleStatus() {
			this.agreestatus = !this.agreestatus;
			console.log(JSON.stringify(this.agreestatus));
		},

		/* 弹出框公用 */
		openPopup(e) {
			if (!this.agreestatus) {
				return this.$tools.toast('请先勾选已阅读协议');
			}
			this.$refs[e].open();
		},
		hidePopup(e) {
			this.$refs[e].close();
		},
		changePopup(e) {
			console.log('popup ' + e.type + ' 状态', e.show);
			if (!e.show) {
				this.tradepwd = '';
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/ipfs/ipfs_calcPower_buy';
</style>
