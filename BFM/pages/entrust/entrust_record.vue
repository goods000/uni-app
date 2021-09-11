<template>
	<view class="pages">
		<view class="initHeader initHeader--line initHeader--fixed initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">委托记录</view>
			</view>
		</view>
		<view class="main">
			<view class="tabsBox">
				<view class="tabsBox-control">
					<view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--active': tabsActive == 1 }" @click="changeTabsActive(1)">当前委托</view>
					<view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--active': tabsActive == 0 }" @click="changeTabsActive(0)">历史委托</view>
				</view>
			</view>
			<view class="listBox">
				<view class="listBox-wrapper">
					<view class="initNoData" v-if="recordList.length == 0">暂无数据</view>
					<view class="listBox-list" v-for="(item, index) in recordList" :key="index">
						<view class="listBox-list__content">
							<view class="listBox-list__logo">
								<image src="../../static/entrust/icon-record-logo.png" mode="widthFix"></image>
							</view>
							<view class="listBox-list__info">
								<view class="listBox-list__title">单号: {{ item.orderNo }}</view>
								<view class="listBox-list__list">
									<view class="listBox-list__list-label">委托时间：</view>
									<view class="listBox-list__list-data">{{ item.createTime }}</view>
								</view>
								<view class="listBox-list__list">
									<view class="listBox-list__list-label">BFM数量：</view>
									<view class="listBox-list__list-data">{{ item.quantity }}</view>
								</view>
								<view class="listBox-list__list">
									<view class="listBox-list__list-label">指数：</view>
									<view class="listBox-list__list-data">{{ item.rate * 100 | number(2) }}%</view>
								</view>
								<view class="listBox-list__list">
									<view class="listBox-list__list-label">累计收益：</view>
									<view class="listBox-list__list-data listBox-list__list-data--highlight">{{ item.profit }}</view>
								</view>
							</view>
						</view>
						<view class="listBox-list__btn" v-show="item.status == 1" @click="openPopup('tradePopup', item)">撤销赎回</view>
					</view>
				</view>
			</view>
		</view>
		
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
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--confirm" @click="cancelOrder()">确定</view>
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
			recordList: [],
			popupItem: [],
			tabsActive: 1,
			tradePwd: '',
			
			pageNum: 1,
			pageSize: 20,
			pages: 1,
		};
	},
	onShow() {
		this.init();
	},
	onReachBottom() {
		if (this.pageNum >= this.pages) {
			return this.$tools.toast('到底了');
		}else{
			this.pageNum++;
			this.getRecordList();
		}
	},
	methods: {
		init() {
			this.recordList = [];
			this.pageNum = 1;
			this.getRecordList();
			// this.getAFILPrice();
		},
		getRecordList() {
			this.$Ajax(
				'/front/entrust/user/list',
				{
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					type: this.tabsActive,
				},
				res => {
					console.log(JSON.stringify(res.obj));
					if (res.code == 0) {
						this.pages = res.obj.pages;
						this.recordList = this.recordList.concat(res.obj.list);
					}
				}
			);
		},
		cancelOrder(){
			if(this.tradePwd == ''){
				return this.$tools.toast('请输入交易密码');
			}
			
			this.$Ajax(
				'/front/entrust/action/cancel',
				{
					id: this.popupItem.id,
					tradePwd: this.tradePwd
				},
				res => {
					console.log(JSON.stringify(res.obj));
					if (res.code == 0) {
						this.$tools.toast('取消成功');
						this.init();
						this.hidePopup('tradePopup');
					}
				}
			);
		},
		changeTabsActive(index) {
			if(this.tabsActive != index){
				this.tabsActive = index;
				this.init();
			}
		},
		
		/* 弹出框公用 */
		openPopup(e,item) {
			this.popupItem = item;
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
@import '@/common/scss/pages/entrust/entrust_record';
</style>
