<template>
	<view class="pages">
		<view class="initHeader initHeader--fixed initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">FIL定存</view>
			</view>
		</view>
		<view class="main">
			<view class="infoBox">
				<view class="infoBox-wrapper">
					<view class="infoBox-header">
						<view class="infoBox-logo"><image src="../../static/ipfs/icon-coin-logo.png" mode="widthFix"></image></view>
						<view class="infoBox-content">
							<view class="infoBox-name">{{ orderInfo.fixedName }}</view>
							<view class="infoBox-desc">一次性结算100%兑付</view>
						</view>
					</view>
				</view>
			</view>

			<view class="formBox">
				<view class="formBox-wrapper">
					<view class="formBox-title">买入数量</view>

					<view class="formBox-list">
						<view class="formBox-list__input">
							<input type="text" placeholder-class="formBox-list__input-placeholder" :placeholder="orderInfo.fixedMul + 'FIL起购'" v-model="quantity" />
							<view class="formBox-list__input-unit">FIL</view>
						</view>
						<view class="formBox-list__note">可用FIL:{{ filInfo.using | number(4) }}</view>
					</view>
				</view>
			</view>
			<view class="initButton"><view class="initButton-btn initButton-btn--style" @click="openPopup('tradePswPopup')">购买</view></view>

			<view class="takeCareBox">
				<view class="takeCareBox-message">
					该产品买入后
					<text class="takeCareBox-message--highlight">不可撤销</text>
					，到期前
					<text class="takeCareBox-message--highlight">不可取出</text>
					，请再购买前仔细阅读买入流程。
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
								<input
									type="password"
									placeholder-class="initPopup-listBox__list-placeholder"
									placeholder="请输入交易密码"
									v-model="tradePwd"
								/>
							</view>
						</view>
					</view>
					<view class="initPopup-buttonBox">
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--cancel" @click="hidePopup('tradePswPopup')">取消</view>
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--confirm" @click="confirmOrder()">确定</view>
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
			filInfo: [],
			orderInfo: [],
			orderId: null,
			tradePwd: '',
			quantity: ''
		};
	},
	computed: {
		i18n() {
			return this.$t('message');
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
			this.getFilInfo();
		},
		getOrderDetail() {
			this.$Ajax(
				'/front/coin/getFixedDepositList',
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
		
		getFilInfo(){
			this.$Ajax('/front/financial/assets/total', {}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					res.obj.assetList.forEach((item,index) => {
						if(item.currencyName == 'FIL'){
							this.filInfo = item;
						}
					})
				}
			});
		},
		
		confirmOrder() {
			if (this.tradePwd == '') {
				return this.$tools.toast('请先输入交易密码');
			}
			this.$Ajax(
				'/front/coin/fixedInvestment',
				{
					id: this.orderId,
					amount: this.quantity,
					tradePwd: this.tradePwd
				},
				res => {
					console.log('算力信息' + JSON.stringify(res));
					if (res.code == 0) {
						this.getFilInfo();
						this.hidePopup('tradePswPopup');
						this.$tools.toastBack('存入成功', 2);
					}
				}
			);
		},

		/* 弹出框公用 */
		openPopup(e) {
			if (this.quantity == '') {
				return this.$tools.toast('请先输入存入数量');
			}
			this.$refs[e].open();
		},
		hidePopup(e) {
			this.$refs[e].close();
		},
		changePopup(e) {
			console.log('popup ' + e.type + ' 状态', e.show);
			if (!e.show) {
				this.tradePwd = '';
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/ipfs/ipfs_deposit_buy';
</style>
