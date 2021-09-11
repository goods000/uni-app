<template>
	<view class="pages">
		<view class="initHeader initHeader--fixed initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">跟随</view>
			</view>
		</view>
		<view class="main">
			<view class="infoBox">
				<view class="selectBox" @click="accountVisible = true" v-if="hasAccount">
					<view class="selectBox-wrapper">
						<view class="selectBox-label">选择跟随账户</view>
						<view class="selectBox-data">{{ accountLabel }}</view>
					</view>
				</view>
				<view class="accountBox" @click="$tools.jump('../documentary/documentary_bind')">
					<view class="accountBox-wrapper">
						<view class="accountBox-label">前往绑定账户</view>
					</view>
				</view>
			</view>

			<view class="traderInfo">
				<view class="traderInfo-wrapper">
					<view class="traderInfo-title">
						<view class="traderInfo-title__label">交易员</view>
					</view>
					<view class="traderInfo-row">
						<view class="traderInfo-avatar"><image :src="traderInfo.userImage" mode="widthFix"></image></view>
						<view class="traderInfo-info">
							<view class="traderInfo-name">{{ traderInfo.userName }}</view>
							<view class="traderInfo-type">{{ traderInfo.bourseName }}交易员</view>
						</view>
						<view class="traderInfo-unit">{{ traderInfo.currencyName }}</view>
					</view>
				</view>
			</view>

			<view class="formBox">
				<view class="formBox-wrapper">
					<view class="formBox-list">
						<view class="formBox-list__label">跟随方向</view>
						<view class="formBox-plane">
							<view class="formBox-plane__item" :class="{ 'formBox-plane__item--active': buttonActive == 1 }" @click="changeButtonActive(1)">
								<view class="formBox-plane__item-icon">
									<image :src="'../../static/documentary/icon-forward' + (buttonActive == 1 ? '-active' : '') + '.png'" mode="widthFix"></image>
								</view>
								<view class="formBox-plane__item-label">正向</view>
								<view class="formBox-plane__item-desc">交易员开多，您也开多</view>
							</view>
							<view class="formBox-plane__item" :class="{ 'formBox-plane__item--active': buttonActive == 2 }" @click="changeButtonActive(2)">
								<view class="formBox-plane__item-icon">
									<image :src="'../../static/documentary/icon-backward' + (buttonActive == 2 ? '-active' : '') + '.png'" mode="widthFix"></image>
								</view>
								<view class="formBox-plane__item-label">反向</view>
								<view class="formBox-plane__item-desc">交易员开多，您则开空</view>
							</view>
						</view>
					</view>

					<!-- <view class="formBox-row">
						<view class="formBox-button">
							<view class="formBox-button__btn" :class="{ 'formBox-button__btn--active': buttonActive == 1 }" @click="changeButtonActive(1)">正向</view>
							<view class="formBox-button__btn" :class="{ 'formBox-button__btn--active': buttonActive == 2 }" @click="changeButtonActive(2)">反向</view>
						</view>
					</view> -->

					<view class="formBox-list">
						<view class="formBox-list__label">按比例</view>
						<view class="formBox-list__input">
							<input type="text" placeholder-class="formBox-list__placeholder" placeholder="0.5" v-model="rate" />
							<view class="formBox-list__input-type">倍</view>
						</view>
						<view class="formBox-list__note">假如您设置为0.5倍比例跟随，交易员下单10USDT，那么您的下单数是 10x0.5 = 5USDT</view>
					</view>
				</view>
			</view>
		</view>
		<view class="initButton initButton--absolute" v-if="hasAccount">
			<view class="initButton-row">
				<view v-if="followStatusInfo != null" class="initButton-btn initButton-btn--golden" @click="modifyFollowTrader()">修改跟随</view>
				<view v-if="followStatusInfo != null" class="initButton-btn initButton-btn--style" @click="cancelFollowTrader()">取消跟随</view>
				<view v-if="followStatusInfo == null" class="initButton-btn initButton-btn--style" @click="followTrader()">跟随</view>
			</view>
		</view>

		<!-- 币种选择 -->
		<w-picker
			:visible.sync="accountVisible"
			mode="selector"
			ref="accountPicker"
			default-type="label"
			:options="accountArray"
			@confirm="onPickerConfirm($event, 'accountPicker')"
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
			traderInfo: [],
			followStatusInfo: [],
			
			traderId: 0,
			buttonActive: 1,

			rate: '', //比例

			accountVisible: false,
			accountLabel: '', //币种
			accountVal: null,
			accountArray: [],
			accountInfoList: [],
			
			hasAccount: false
		};
	},
	onLoad(hash) {
		this.traderId = hash.value1;
	},
	onShow() {
		this.init();
	},
	methods: {
		init() {
			this.getAccountList();
			this.getTradeInfo();
		},
		//获取交易员信息
		getTradeInfo(){
			this.$Ajax('/front/trader/detail', {
				traderId: this.traderId
			}, res => {
				console.log('交易员信息：'+JSON.stringify(res));
				if (res.code == 0) {
					this.traderInfo = res.obj.traderInfo;
				}
			});
		},
		getAccountList() {
			this.$Ajax('/front/api/bind/list', {}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					if(res.obj.length != 0){
						this.accountArray = res.obj;
						this.accountArray.forEach(item => {
							item.label = item.bourseName + item.roleStr;
							item.value = item.id;
						});
						this.accountLabel = this.accountArray[0].label;
						this.accountVal = this.accountArray[0].value;
						this.checkFollowStatus();
						this.hasAccount = true;
					}else{
						this.hasAccount = false;
					}
				}
			});
		},
		checkFollowStatus(){
			this.$Ajax(
				'/front/follow/follow/query',
				{
					currentUserApiId: this.accountVal,
					traderId: this.traderId
				},
				res => {
					console.log('检测状态：' + JSON.stringify(res));
					if (res.code == 0) {
						this.followStatusInfo = res.obj;
						if(this.followStatusInfo != null){
							this.rate = this.followStatusInfo.followRatio;
							this.buttonActive = this.followStatusInfo.followOrientation;
						}
					}
				}
			);
		},
		modifyFollowTrader() {
			this.$Ajax(
				'/front/follow/follow/modify',
				{
					followRecordId: this.followStatusInfo.id,
					followOrientation: this.buttonActive, //跟随方向【1正向，2反向】
					followRatio: this.rate
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.rate = '';
						this.$tools.toastBack('修改成功', 1);
					}
				}
			);
		},
		cancelFollowTrader() {
			this.$Ajax(
				'/front/follow/follow/cancel',
				{
					followRecordId: this.followStatusInfo.id,
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.$tools.toastBack('取消成功', 1);
					}
				}
			);
		},
		
		followTrader() {
			this.$Ajax(
				'/front/follow/action/do',
				{
					currentUserApiId: this.accountVal,
					traderId: this.traderId,
					followOrientation: this.buttonActive, //跟随方向【1正向，2反向】
					followRatio: this.rate
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.rate = '';
						this.$tools.toastBack('跟随成功', 1);
					}
				}
			);
		},
		changeButtonActive(index) {
			if (this.buttonActive != index) {
				this.buttonActive = index;
			}
		},
		/* 底部选项卡公用 */
		onPickerConfirm(res, type) {
			console.log('当前控制的Picker是：' + type + ';当前值是' + res.obj.value);
			if (type == 'currencyPicker') {
				this.currencyLabel = res.obj.label;
				this.currencyVal = res.obj.value;
				this.getCurrencyInfo();
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/documentary_follow';
</style>
