<template>
	<view class="pages">
		<view class="initHeader initHeader--bgStyle initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-title">交易</view>
			</view>
		</view>

		<view class="main">
			<view class="recommendBox">
				<view class="recommendBox-wrapper">
					<view class="recommendBox-wrapper-item">
						<image src="../../static/index/icon-index-tips.png" mode="widthFix" class="recommendBox-wrapper-item__image"></image>
						<view class="">
							<view class="recommendBox-title">TPD积分价格走势图<view class="recommendBox-title-tips">(左右滑动查看每日价格)</view></view>
							<view class="recommendBox-txt">TPD PRICE CHART</view>
						</view>
						<!-- <view class="recommendBox-wrapper-right">(左右滑动查看每日价格)</view> -->
					</view>

					<view class="recommendBox-body">
						<view class="recommendBox-body-title">TPD 今日价格为</view>
						<view class="recommendBox-body-scale">1 TPD ={{ TPDPrice }} USDT (折合{{TPDPrice*usdtPrice | number(4)}}CNY)</view>
						<image :src="selectType ? '../../static/index/icon-index-select.png' : '../../static/index/icon-index-select1.png'" @click="triggerCollapse()" class="recommendBox-body-image"></image>
					</view>
					<view v-show="selectType">
						<chartList :showChartRam="showChartRam"></chartList>
					</view>
				</view>
			</view>
			
			<view class="contentTrans">
				<view class="contentTrans-coin">TPD/USDT</view>
				<view class="contentTrans-tabs">
					<view class="contentTrans-tabs__title" :class="{'contentTrans-tabs__title--green': tabsActive == 1 }" @click="changeTabsActive(1)">买入</view>
					<view class="contentTrans-tabs__title" :class="{'contentTrans-tabs__title--red': tabsActive == 2 }" @click="changeTabsActive(2)">卖出</view>
				</view>
				<view class="contentTrans-tips" v-show="tabsActive == 1">
					注:买入TPD积分,获得相应收益比例的<text>锁仓额度(锁仓额度=买入数量*收益比例)</text>,每天按锁仓总额度的{{ RadioData.config_tpd_release }}释放。
				</view>
				<view class="inputBox">
					<view class="inputBox-wrapper">
						<view class="inputBox-item" :class="{ 'inputBox-item--active': isFocus == 0}">
							<view class="inputBox-item__label">交易价格</view>
							<view class="inputBox-item__list">
								<view class="inputBox-item__input">
									<input type="text" @blur="blurInput(0)" @focus="focusInput(0)" placeholder-class="inputBox-item__placeholder"
										placeholder="请输入原登录密码" v-model="TPDPrice" disabled="disabled"/>
									<view class="inputBox-item__fixedBox">USDT</view>
								</view>
							</view>
						</view>
						<view class="inputBox-item" :class="{ 'inputBox-item--active': isFocus == 1}">
							<view class="inputBox-item__label">{{ tabsActive == 1 ? '买入' : '卖出' }}数量</view>
							<view class="inputBox-item__list">
								<view class="inputBox-item__input">
									<input type="text" @blur="blurInput(1)" @focus="focusInput(1)" placeholder-class="inputBox-item__placeholder"
										placeholder="请输入买入数量" v-model="num" />
									<view class="inputBox-item__fixedBox">TPD</view>
								</view>
							</view>
						</view>
						<!-- <view class="inputBox-item" :class="{ 'inputBox-item--active': isFocus == 2}"> -->
						<view class="inputBox-item" :class="{ 'inputBox-item--active': isFocus == 2}" v-show="tabsActive == 1">
							<view class="inputBox-item__label">锁仓额度</view>
							<view class="inputBox-item__list">
								<view class="inputBox-item__input">
									<input type="text" @blur="blurInput(2)" @focus="focusInput(2)" placeholder-class="inputBox-item__placeholder"
										placeholder="" v-model="num * RadioData.config_tpd_give" disabled="disabled"/>
									<view class="inputBox-item__fixedBox">(当前收益比例：{{ RadioData.config_tpd_give }}倍)</view>
								</view>
							</view>
						</view>
						<view class="inputBox-item" :class="{ 'inputBox-item--active': isFocus == 3}" v-show="tabsActive == 1">
							<view class="inputBox-item__label">手续费用</view>
							<view class="inputBox-item__list">
								<view class="inputBox-item__input">
									<input type="text" @blur="blurInput(3)" @focus="focusInput(3)" placeholder-class="inputBox-item__placeholder"
										placeholder="" v-model="buyFee" disabled="disabled"/>
								</view>
							</view>
						</view>
						<view class="inputBox-item" :class="{ 'inputBox-item--active': isFocus == 3}" v-show="tabsActive == 2">
							<view class="inputBox-item__label">手续费用</view>
							<view class="inputBox-item__list">
								<view class="inputBox-item__input">
									<input type="text" @blur="blurInput(3)" @focus="focusInput(3)" placeholder-class="inputBox-item__placeholder"
										placeholder="" v-model="sellFee" disabled="disabled"/>
								</view>
							</view>
						</view>
						<view class="inputBox-item" :class="{ 'inputBox-item--active': isFocus == 4}">
							<view class="inputBox-item__label">交易密码</view>
							<view class="inputBox-item__list">
								<view class="inputBox-item__input">
									<input type="password" @blur="blurInput(4)" @focus="focusInput(4)" placeholder-class="inputBox-item__placeholder"
										placeholder="请输入交易密码" v-model="pwd" />
								</view>
							</view>
						</view>
						<view class="inputBox-count" v-show="tabsActive == 1">共计：{{ actual | number(4) }} USDT</view>
						<view class="inputBox-count" v-show="tabsActive == 2">共计：{{ actual_sell | number(4) }} TPD</view>
						<view class="inputBox-countFlex" v-if="tabsActive == 1"><text>可用：</text><text>{{ assetsInfo.using | number(4) }}  USDT</text></view>
						<view class="inputBox-countFlex" v-if="tabsActive == 2"><text>可用：</text><text>{{ assetsInfo.usable | number(4) }}  TPD</text></view>
						<!-- <view class="inputBox-btn" :class="tabsActive == 0 ? 'inputBox-btn--green' : 'inputBox-btn--red'"
						@click="config(tabsActive)">
							{{ tabsActive == 0 ? '买入' : '卖出' }}
						</view> -->
						<view class="inputBox-btn inputBox-btn--green" v-if="tabsActive == 1" @click="tpdBuy()">买入</view>
						<view class="inputBox-btn inputBox-btn--red" v-if="tabsActive == 2" @click="tpdSell()">卖出</view>
					</view>
				</view>
			</view>
			
			<view class="recommendBox">
				<view class="recommendBox-wrapper">
					<view class="recommendBox-wrapper-item" @click="$tools.jump('./transactionRecord',tabsActive)">
						<image src="../../static/index/icon-index-record.png" mode="widthFix" class="recommendBox-wrapper-item__image"></image>
						<view class="">
							<view class="recommendBox-title">交易记录</view>
							<view class="recommendBox-txt">TRANSACTION RECORDS</view>
						</view>
						<view class="recommendBox-wrapper-right">
							<image src="../../static/public/icon-arrow-right-grey.png" mode="widthFix"></image>
						</view>
					</view>
				</view>
			</view>
			
			
			<view class="transitionBox">
				<view class="transitionBox-wrapper">
					<view class="initNoData" v-if="recordList.length ==0">暂无交易记录</view>
					<view class="transitionBox-wrapper__item" v-for="(item,index) in recordList" :key="index" v-else>
						<view class="transitionBox-wrapper__item--title">
							<text :class="item.type == 1 ? 'transitionBox-wrapper__item--title--green' : 'transitionBox-wrapper__item--title--red'">
							{{ item.type==1?'买入':'卖出' }}</text>
						</view>
						<view class="transitionBox-wrapper__item--box">
							<view class="transitionBox-content">
								<view class="transitionBox-content-title">数量</view>
								<view class="transitionBox-content-data">{{ item.amount }}</view>
							</view>
							<view class="transitionBox-content">
								<view class="transitionBox-content-title">手续费</view>
								<view class="transitionBox-content-data">{{ item.fee }}</view>
							</view>
							<view class="transitionBox-content">
								<view class="transitionBox-content-title">时间</view>
								<view class="transitionBox-content-data">{{ item.createTime }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
		</view>

	</view>
</template>

<script>
import chartList from '../echart/chart.vue';
// import chartList from '../echart/chartList.vue';
	
export default {
	components: { chartList },
	data() {
		return {
			tabsActive:1,
			selectType: true,
			isFocus: null,
			price:'',
			price:'0.68',
			num:'',
			quota:0,
			charge:0,
			pwd:'',
			assetsInfo:[],
			recordList:[],
			TPDPrice:'',
			usdtPrice:'',
			RadioData:{},
			actual:0, //到账
			actual_sell:0, //到账
			buyFee:'',
			sellFee:'',
			lockUp:'',
			// 页数
			pageSize: 20,
			pageNum: 1,
			pages: 0,
			showChartRam:'',
		};
	},
	onShow() {
		this.showChartRam = Math.random();
		console.log("this.showChartRam",this.showChartRam);
		this.init();
		this.num = '';
		this.pwd = '';
	},
	onLoad() {
		var selectType = uni.getStorageSync('selectType');
		console.log("selectType",selectType)
		if (selectType == '' || selectType == null || selectType == undefined) {
			uni.setStorageSync('selectType', true);
		}
	},
	watch:{
		num(){
			if (this.num == '') {
				this.actual = 0;
				this.actual_sell = 0;
			} else {
				this.actual = this.num * this.TPDPrice;
				let sellRate = this.sellRate;
				this.sellFee = this.num * sellRate;
				this.actual_sell = (this.num*1) + this.sellFee;
				// console.log(this.sellFee)
				// console.log(this.actual_sell)
				// if(this.tabsActive == 0){
				// 	if(this.buyFee == 0){
				// 		this.actual = this.num * this.TPDPrice;
				// 	}else{	
				// 		this.actual = (this.num * this.TPDPrice) * this.buyFee;
				// 	}
				// }else{
				// 	if(this.sellFee == 0){
				// 		console.log(33)
				// 		this.actual_sell = this.num * this.TPDPrice;
				// 	}else{
				// 		console.log(3333)
				// 		this.actual_sell = (this.num * this.TPDPrice) * this.sellFee;
				// 	}
				// }
				
			}
		}
	},
	// onReachBottom() {
	// 	if (this.pageNum >= this.pages) {
	// 		return this.$tools.toast('到底啦');
	// 	} else {
	// 		this.pageNum++;
	// 		this.getList();
	// 	}
	// },
	methods: {
		init() {
			this.recordList = [];
			this.getAssetsInfo(); 
			this.getUSDTCNY(); 
			this.getTPDPrice(); //获取TPD兑换USDT价格
			this.getRadioData(); //获取交易比例数据
			this.getList();
		},
		focusInput(index) {
			this.isFocus = index;
		},
		blurInput(index) {
			this.isFocus = null;
		},
		triggerCollapse() {
			var selectType = uni.getStorageSync('selectType');
			if (selectType) {
				uni.setStorageSync('selectType', false);
				this.selectType = false;
			} else {
				uni.setStorageSync('selectType', true);
				this.selectType = true;
			}
		},
		changeTabsActive(index) {
			if (this.tabsActive != index) {
				this.tabsActive = index;
				this.recordList = [];
				this.getList();
				// this.num = ''
			}
		},
		// 获取资产
		getAssetsInfo() {
			this.$Ajax('/front/mine/getAssetsInfo', {}, res => {
				// console.log(JSON.stringify(res.obj));
				if (res.code == 0) {
					this.assetsInfo = res.obj;
				}
			});
		},
		// 获取TPD兑换USDT价格
		getTPDPrice() {
			this.$Ajax('/front/mine/getTPDPrice', {}, res => {
				if (res.code == 0) {
					this.TPDPrice = res.obj;
				}
			});
		},
		// 获取USDT-CNY价格
		getUSDTCNY() {
			this.$Ajax('/front/mine/getUSDTCNY', {}, res => {
				if (res.code == 0) {
					this.usdtPrice = res.obj;
				}
			});
		},
		// 获取交易比例数据
		getRadioData() {
			this.$Ajax('/front/mine/getRadioData', {}, res => {
				// console.log(JSON.stringify(res.obj));
				if (res.code == 0) {
					this.RadioData = res.obj;
					this.lockUp = res.obj.config_tpd_give;
					this.buyFee = res.obj.config_buy_fee;
					this.sellFee = res.obj.config_sell_fee;
					this.sellRate = res.obj.config_sell_fee;
				}
			});
		},
		// 买入
		tpdBuy() {
			if (this.num == '') {
				return this.$tools.toast('请输入买入数量');
			}
			if (this.num < 0) {
				return this.$tools.toast('请输入正确的买入数量');
			}
			if (this.pwd == '') {
				return this.$tools.toast('请输入交易密码');
			}
			this.$Ajax('/front/mine/tpdBuy',{
					amount: this.num,
					tradePassword: this.pwd
				},
				res => {
					if (res.code == 0) {
						this.$tools.toast('买入成功');
						this.num = '';
						this.pwd = '';
					}
				}
			);
		},
		// 卖出
		tpdSell() {
			if (this.num == '') {
				return this.$tools.toast('请输入卖出数量');
			}
			if (this.num < 0) {
				return this.$tools.toast('请输入正确的卖出数量');
			}
			if (this.pwd == '') {
				return this.$tools.toast('请输入交易密码');
			}
			this.$Ajax('/front/mine/tpdSell',{
					amount: this.num,
					tradePassword: this.pwd
				},
				res => {
					if (res.code == 0) {
						this.$tools.toast('卖出成功');
						this.num = '';
						this.pwd = '';
					}
				}
			);
		},
		// 记录
		getList() {
			this.$Ajax('/front/mine/getTransferRecordList', {
				pageSize: this.pageSize,
				pageNum: this.pageNum,
				type: this.tabsActive
			}, res => {
					if (res.code == 0) {
						this.pages = res.obj.pages;
						this.recordList = this.recordList.concat(res.obj.list);
					}
				}
			);
		},
		/* 弹出框公用 */
		openPopup(e, item) {
			this.popupItem = item;
			this.$refs[e].open();
			uni.hideTabBar();
		},
		hidePopup(e) {
			this.$refs[e].close();
		},
		changePopup(e) {
			console.log('popup ' + e.type + ' 状态', e.show);
			if (!e.show) {
				this.tradepwd = '';
				uni.showTabBar();
			}
		}
	},
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/transaction/transaction';
</style>
