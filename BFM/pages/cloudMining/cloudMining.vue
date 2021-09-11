<template>
	<view class="pages">
		<view class="initHeader initHeader--absolute initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back()"></view>
				<view class="initHeader-record" @click="$tools.jump('../cloudMining/cloudMining_record')"></view>
			</view>
		</view>
		<view class="bgBox"><image src="../../static/cloudMining/img-bg.jpg" mode="widthFix"></image></view>
		<view class="main">
			
			<view class="itemBox">
				<view class="itemBox-wrapper">
					<view class="itemBox-item">
						<view class="itemBox-item__data">{{ pagesInfo.todayProfit | number(4) }}</view>
						<view class="itemBox-item__label">今日收益(BNC)</view>
					</view>
					<view class="itemBox-item">
						<view class="itemBox-item__data">{{ pagesInfo.totalProfit | number(4) }}</view>
						<view class="itemBox-item__label">累计收益(BNC)</view>
					</view>
				</view>
			</view>
			
			<view class="infoBox">
				<view class="infoBox-wrapper">
					<view class="infoBox-title">云矿机购买</view>
					<view class="infoBox-price">价格：1T = <text class="infoBox-price--highlight">{{ pagesInfo.price }}BLJ</text></view>
				</view>
			</view>
			<view class="formBox">
				<view class="formBox-wrapper">
					<view class="formBox-list">
						<view class="formBox-list__label">认购数量</view>
						<view class="formBox-list__input"><input type="text" placeholder-class="formBox-list__placeholder" placeholder="认购数量" v-model="quantity" /></view>
						<view class="formBox-list__note">折合：{{ totalPrice }} BLJ</view>
					</view>
				</view>
			</view>
		</view>

		<view class="initButton initButton--absolute"><view class="initButton-btn initButton-btn--style" @click="openPopup('tradePopup')">确认</view></view>
		
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
			pagesInfo: [],
			tabsActive: 0,
			quantity: '',
			totalPrice: 0,
			tradePwd: '',

			// 分页
			pages: 1,
			pageNum: 1,
			pageSize: 20
		};
	},
	onShow() {
		this.init();
	},
	watch:{
		quantity(){
			this.totalPrice = this.quantity * this.pagesInfo.price;
		}
	},
	methods: {
		init() {
			this.getPagesInfo();
		},
		
		getPagesInfo(){
			this.$Ajax('/front/machine/index/info', {}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.pagesInfo = res.obj;
				}
			});
		},
		confirmOrder(){
			if(this.tradePwd == ''){
				return this.$tools.toast('请输入交易密码');
			}
			this.$Ajax('/front/machine/action/do', {
				quantity: this.quantity,
				tradePwd: this.tradePwd
			}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.quantity = '';
					this.$tools.toast('认购成功');
					this.hidePopup('tradePopup');
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
				return this.$tools.toast('请输入认购数量');
			}
			if(this.quantity % 1 != 0 || this.quantity < 0){
				return this.$tools.toast('请输入正整数值');
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
@import '@/common/scss/pages/cloudMining/cloudMining';
</style>
