<template>
	<view class="pages">
		<view class="initHeader initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back()"></view>
				<view class="initHeader-record" @click="$tools.jump('../entrust/entrust_record')"></view>
			</view>
		</view>
		<view class="bgBox"><image src="../../static/entrust/img-bg.jpg" mode="widthFix"></image></view>
		<view class="main">
			<view class="infoBox">
				<view class="infoBox-wrapper">
					<view class="infoBox-item">
						<view class="infoBox-header">
							<view class="infoBox-label">BFM资产账户余额：</view>
							<view class="infoBox-data">{{ walletInfo.using | number(4) }}</view>
						</view>
						<view class="infoBox-form">
							<view class="infoBox-form__list">
								<view class="infoBox-form__list-label">委托数量</view>
								<view class="infoBox-form__list-input">
									<input type="text" placeholder-class="infoBox-form__list-placeholder" placeholder="请输入委托数量" v-model="quantity" />
								</view>
								<!-- <view class="infoBox-form__list-note">
									可用数量:
									<text class="infoBox-form__list-note--highlight">3000.0000BFM</text>
								</view> -->
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="initButton initButton--absolute"><view class="initButton-btn initButton-btn--style" @click="openPopup('tradePopup')">确认委托</view></view>
		
		<!-- 交易密码验证 -->
		<uni-popup ref="tradePopup" type="center" :animation="true" @change="changePopup">
			<view class="initPopup">
				<view class="initPopup-wrapper">
					<view class="initPopup-title">交易密码</view>
					<view class="initPopup-listBox">
						<view class="initPopup-listBox__list">
							<view class="initPopup-listBox__list-input">
								<input type="password" placeholder-class="initPopup-listBox__list-placeholder" placeholder="请输入交易密码" v-model="tradePwd" />
							</view>
						</view>
						<!-- <view class="initPopup-listBox__note">当前可用：<text class="initPopup-listBox__note--highlight">{{ bgfUsing }}BGF</text></view> -->
					</view>
					<view class="initPopup-buttonBox">
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--cancel" @click="hidePopup('tradePopup')">取消</view>
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
			tabsActive: 0,
			quantity: '',
			tradePwd: '',

			walletInfo: [],
			
			// 分页
			pages: 1,
			pageNum: 1,
			pageSize: 20
		};
	},
	onShow() {
		this.init();
	},
	methods: {
		init() {
			this.getWalletInfo();
		},
		getWalletInfo(){
			this.$Ajax('/front/financial/currency/wallet', {
				currencyName: 'BFM'
			}, res => {
				console.log(JSON.stringify(res));
				if(res.code == 0){
					this.walletInfo = res.obj;
				}
			});
		},
		confirmOrder(){
			if(this.tradePwd == ''){
				return this.$tools.toast('请输入交易密码');
			}
			this.$Ajax('/front/entrust/action/do', {
				quantity: this.quantity,
				tradePwd: this.tradePwd
			}, res => {
				console.log(JSON.stringify(res));
				if(res.code == 0){
					this.quantity = '';
					this.$tools.toast('委托成功');
					this.hidePopup('tradePopup');
					this.getWalletInfo();
				}
			});
		},
		
		changeTabsActive(index) {
			if (this.tabsActive != index) {
				this.tabsActive = index;
			}
		},
		
		/* 弹出框公用 */
		openPopup(e) {
			if(this.quantity == ''){
				return this.$tools.toast('请输入数量');
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
@import '@/common/scss/pages/entrust/entrust';
</style>
