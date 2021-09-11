<template>
	<!-- 合约 -->
	<view class="pages">
		<view class="headerButtonTabs">
			<view class="headerButtonTabs-wrapper"><view class="headerButtonTabs-title">币币交易</view></view>
		</view>
		<view class="initHeader initHeader--bgWhite">
			<view class="initHeader-wrapper">
				<view class="initHeader-title initHeader-title--left" @click="showDrawer('menuDrawer')">
					<text>{{ currencyTradeName }}/{{ currencyName }}</text>
					<view class="initHeader-arrow"></view>
					<view class="initHeader-rate">
						<view
							class="initHeader-rate__btn"
							:class="{ 'initHeader-rate__btn--down': tradeInfoList.riseType == 1, 'initHeader-rate__btn--up': tradeInfoList.riseType == 0 }"
						>
							{{ tradeInfoList.rise }}%
						</view>
					</view>
				</view>
				<view class="initHeader-right"><view class="initHeader-button initHeader-button--kline" @click="goKline()"></view></view>
			</view>
		</view>
		<view class="platformBox">
			<view class="platformBox-wrapper">
				<view class="platformBox-content">
					<view class="platformBox-operateBox leftBigBox">
						<view class="platformBox-buttonBox">
							<view
								class="platformBox-buttonBox__btn platformBox-buttonBox__btn--green"
								:class="{ 'platformBox-buttonBox__btn--active': buttonActive == 0 }"
								@click="changeButtonActive(0)"
							>
								买入
							</view>
							<view
								class="platformBox-buttonBox__btn platformBox-buttonBox__btn--red"
								:class="{ 'platformBox-buttonBox__btn--active': buttonActive == 1 }"
								@click="changeButtonActive(1)"
							>
								卖出
							</view>
						</view>
						<view class="platformBox-formBox">
							<view class="platformBox-formBox__wrapper">
								<!-- <view class="platformBox-formBox__list" :class="{'platformBox-formBox__list--disabled':trustVal == 1}" v-show="trustVal == 1">
									<text>以当前最优价格交易</text>
								</view> -->
								<view class="platformBox-formBox__list" :class="{ 'platformBox-formBox__list--disabled': trustVal == 1 }">
									<view class="platformBox-formBox__list-input">
										<input
											type="number"
											placeholder="价格"
											placeholder-class="platformBox-formBox__list-placeholder"
											:disabled="trustVal == 1"
											v-model="price"
										/>
									</view>
								</view>
								<view class="platformBox-formBox__list">
									<view class="platformBox-formBox__list-input">
										<input type="number" placeholder="数量" placeholder-class="platformBox-formBox__list-placeholder" v-model="quantity" />
									</view>
									<view class="platformBox-formBox__list-type">{{ currencyTradeName }}</view>
								</view>
							</view>
						</view>
						<view class="platformBox-infoBox">
							<view class="platformBox-infoBox__wrapper">
								<view class="platformBox-infoBox__list">
									<view class="platformBox-infoBox__list-label">可用</view>
									<view class="platformBox-infoBox__list-data">
										{{ buttonActive == 0 ? (isLogin ? walletList.using : '--') : (isLogin ? tradeWalletList.using : '--') | number(4) }}
										{{ buttonActive == 0 ? currencyName : currencyTradeName }}
									</view>
								</view>
								<view class="platformBox-infoBox__list">
									<view class="platformBox-infoBox__list-label">交易额</view>
									<view class="platformBox-infoBox__list-data">{{ totalPrice | number(4) }} {{ currencyName }}</view>
								</view>
							</view>
						</view>
						<view class="platformBox-sliderBox">
							<view class="platformBox-sliderBox__wrapper">
								<slider
									:value="sliderVal"
									block-color="#2989fd"
									activeColor="#2989fd"
									backgroundColor="#eef1f6"
									block-size="14"
									:disabled="price == ''"
									@change="sliderChange"
									@changing="sliderChange"
								/>
								<view class="platformBox-sliderBox__button">
									<view class="platformBox-sliderBox__button-btn" @click="changeSliderTo(0)">0</view>
									<view class="platformBox-sliderBox__button-btn" @click="changeSliderTo(25)">25%</view>
									<view class="platformBox-sliderBox__button-btn" @click="changeSliderTo(50)">50%</view>
									<view class="platformBox-sliderBox__button-btn" @click="changeSliderTo(75)">75%</view>
									<view class="platformBox-sliderBox__button-btn" @click="changeSliderTo(100)">100%</view>
								</view>
							</view>
						</view>
						<view class="platformBox-enterBox">
							<view class="platformBox-enterBox__wrapper">
								<view
									class="platformBox-enterBox__button"
									:class="[{ 'platformBox-enterBox__button--green': buttonActive == 0 }, { 'platformBox-enterBox__button--red': buttonActive == 1 }]"
									@click="publishInfo()"
								>
									{{ buttonActive == 0 ? '买入' : '卖出' }}
								</view>
							</view>
						</view>
					</view>
					<view class="platformBox-sheetBox rightBigBox">
						<view class="platformBox-sheetHeader">
							<view class="platformBox-sheetHeader__left">价格</view>
							<view class="platformBox-sheetHeader__right">数量</view>
						</view>
						<view class="platformBox-sheetContent">
							<view class="platformBox-resourceBox platformBox-resourceBox--sell" v-show="planeVal == 0 || planeVal == 2">
								<view class="platformBox-resourceBox__wrapper">
									<view
										class="platformBox-resourceBox__list platformBox-resourceBox__list--red"
										v-for="(item, index) in sellList.slice(planeVal == 0 ? -5 : -10)"
										:key="index"
										@click="getPlatformPrice(item.price)"
									>
										<view class="platformBox-resourceBox__content">
											<view class="platformBox-resourceBox__price">{{ item.price | number(digitVal) }}</view>
											<view class="platformBox-resourceBox__quantity">{{ item.nums | number(digitVal) }}</view>
										</view>
										<view class="platformBox-resourceBox__chart">
											<view class="platformBox-resourceBox__chart-line" :style="{ width: item.ratio * 100 + '%' }"></view>
										</view>
									</view>
								</view>
							</view>

							<view class="platformBox-sheetInfo">
								<view class="platformBox-sheetInfo__price platformBox-sheetInfo__price--green">{{ tradeInfoList.currentPrice | number(digitVal) }}</view>
								<view class="platformBox-sheetInfo__money">≈{{ (tradeInfoList.currentPrice * tradeInfoList.usdtPirce) | number(digitVal) }} CNY</view>
							</view>

							<view class="platformBox-resourceBox  platformBox-resourceBox--buy" v-show="planeVal == 0 || planeVal == 1">
								<view class="platformBox-resourceBox__wrapper">
									<view
										class="platformBox-resourceBox__list platformBox-resourceBox__list--green"
										v-for="(item, index) in buyList.slice(0, planeVal == 0 ? 5 : 10)"
										:key="index"
										@click="getPlatformPrice(item.price)"
									>
										<view class="platformBox-resourceBox__content">
											<view class="platformBox-resourceBox__price">{{ item.price | number(digitVal) }}</view>
											<view class="platformBox-resourceBox__quantity">{{ item.nums | number(digitVal) }}</view>
										</view>
										<view class="platformBox-resourceBox__chart">
											<view class="platformBox-resourceBox__chart-line" :style="{ width: item.ratio * 100 + '%' }"></view>
										</view>
									</view>
								</view>
							</view>
						</view>

						<view class="platformBox-toolsBox">
							<view class="platformBox-toolsBox__wrapper">
								<view class="platformBox-toolsBox__item">
									<view class="platformBox-toolsBox__item-btn" @click="digitVisible = true">{{ digitLabel }}</view>
								</view>
								<view class="platformBox-toolsBox__item">
									<view class="platformBox-toolsBox__item-btn" @click="planeVisible = true">{{ planeLabel }}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="recordBox">
			<view class="recordBox-nav">
				<view class="recordBox-nav__title">当前委托</view>
				<view class="recordBox-nav__record" @click="jumpRecord()"></view>
			</view>
			<view class="recordBox-wrapper">
				<view class="recordBox-content">
					<view class="ticketBox">
						<view class="ticketBox-wrapper">
							<view class="ticketBox-noData" v-if="nowEntrustList.length == 0">暂无记录</view>
							<view class="ticketBox-list" v-for="(item, index) in nowEntrustList" :key="index" v-else>
								<view class="ticketBox-info">
									<view class="ticketBox-info__type" :class="item.tradeType == 0 ? 'ticketBox-info__type--buy' : 'ticketBox-info__type--sell'">
										{{ item.tradeTypeStr }}
									</view>
									<view class="ticketBox-info__content">
										<view class="ticketBox-info__content-label">{{ item.tradeCurrencyName }}/{{ item.currencyName }}</view>
										<view class="ticketBox-info__content-date">{{ item.createTime }}</view>
									</view>
									<view class="ticketBox-info__button"><view class="ticketBox-info__button-btn" @click="cancelOrder(item.id)">撤单</view></view>
								</view>
								<view class="ticketBox-itemBox">
									<view class="ticketBox-itemBox__wrapper">
										<view class="ticketBox-itemBox__item">
											<view class="ticketBox-itemBox__item-label">价格({{ item.currencyName }})</view>
											<view class="ticketBox-itemBox__item-data">{{ item.price }}</view>
										</view>
										<view class="ticketBox-itemBox__item">
											<view class="ticketBox-itemBox__item-label">委托数量({{ item.tradeCurrencyName }})</view>
											<view class="ticketBox-itemBox__item-data">{{ item.quantity | number(4) }}</view>
										</view>
										<view class="ticketBox-itemBox__item">
											<view class="ticketBox-itemBox__item-label">实际成交({{ item.currencyName }})</view>
											<view class="ticketBox-itemBox__item-data">{{ item.tradeQuantity | number(4) }}</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 左侧币种选择 -->
		<uni-drawer :width="menuDrawerWidth" ref="menuDrawer" @change="drawerChange($event)">
			<view class="menuDrawerBox">
				<view class="menuDrawerBox-wrapper">
					<view class="menuDrawerBox-title">币币列表</view>
					<view class="menuDrawerBox-listBox">
						<view class="menuDrawerBox-listBox__list" v-for="(item, index) in currencyList" :key="index" @click="changeTradeId(item.usings, item.tradeId)">
							<view class="menuDrawerBox-listBox__list-label">{{ item.tradeCurrencyName }}/{{ item.currencyName }}</view>
							<view
								class="menuDrawerBox-listBox__list-data"
								:class="[{ 'menuDrawerBox-listBox__list-data--green': item.riseType == 1 }, { 'menuDrawerBox-listBox__list-data--red': item.riseType == 0 }]"
							>
								{{ item.currentPrice }}
							</view>
						</view>
					</view>
				</view>
			</view>
		</uni-drawer>

		<!-- 保留小数位 -->
		<w-picker
			:visible.sync="digitVisible"
			mode="selector"
			ref="digitPicker"
			default-type="label"
			:default-props="defaultProps"
			:options="digitArray"
			@confirm="onPickerConfirm($event, 'digitPicker')"
			@cancel="onPickerCancel"
			themeColor="#2989fd"
		></w-picker>

		<!-- 设置表盘显示内容 -->
		<w-picker
			:visible.sync="planeVisible"
			mode="selector"
			ref="planePicker"
			default-type="label"
			:default-props="defaultProps"
			:options="planeArray"
			@confirm="onPickerConfirm($event, 'planePicker')"
			@cancel="onPickerCancel"
			themeColor="#2989fd"
		></w-picker>

		<!-- 委托方式选择 -->
		<w-picker
			:visible.sync="trustVisible"
			mode="selector"
			ref="trustPicker"
			default-type="label"
			:default-props="defaultProps"
			:options="trustArray"
			@confirm="onPickerConfirm($event, 'trustPicker')"
			@cancel="onPickerCancel"
			themeColor="#2989fd"
		></w-picker>

		<!-- 杠杆选择 -->
		<w-picker
			:visible.sync="leverVisible"
			mode="selector"
			ref="leverPicker"
			default-type="label"
			:default-props="defaultProps"
			:options="leverArray"
			@confirm="onPickerConfirm($event, 'leverPicker')"
			@cancel="onPickerCancel"
			themeColor="#2989fd"
		></w-picker>
	</view>
</template>

<script>
import uniDrawer from '@/components/uni-drawer/uni-drawer.vue';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import uniTransition from '@/components/uni-transition/uni-transition.vue';
import vPicker from '@/components/w-picker/w-picker.vue';
import URLSET from '../../components/url.js';

var url = URLSET.websocketUrl + '/websocket/bbtrade';
// var url = '/socket' + '/websocket/bbtrade';

export default {
	components: {
		uniDrawer,
		uniPopup,
		uniTransition,
		vPicker
	},
	data() {
		return {
			/* socket相关 */
			socketOpen: false,
			myColse: false,
			websocket: '',
			socketUrl: url,

			curAreaId: 1,
			curSubTradeId: 0, //当前订阅交易对
			curSubDeptId: 0, //当前订阅的深度图
			curSubAreaId: 0, //当前订阅的区域信息
			currentSeleId: 0, //当前持仓列表下拉id

			/* 更多 */
			moreShow: false,
			menuDrawerWidth: uni.upx2px(600),

			/* 初始化Tabs选中 */
			platformTabsActive: 0,
			headerButtonTabsActive: 0, //头部按钮
			recordTabsActive: 0, //记录Tabs
			cleanPopupTabsActive: 2, //平仓弹出框 类型1市价 2限价
			buttonActive: 0,

			/* 初始化盒子 */
			nowEntrustList: [], //当前委托
			currencyList: [],
			buyList: [],
			sellList: [],
			tradeInfoList: [],
			tradeWalletList: [],
			walletList: [],

			/* 初始化赋值 */
			tradeId: 1,
			cleanPopupPrice: '',
			cleanPopupQuantity: '',

			currencyName: '',
			currencyTradeName: '',

			stopPopupProfit: '',
			stopPopupProfitResult: 0,
			stopPopupLoss: '',
			stopPopupLossResult: 0,

			price: '',
			quantity: '',
			totalPrice: '--', //总金额
			sliderVal: 0,
			token: '',
			isLogin: '',

			/* 页数控制 */
			pageNum: 1,
			pageSize: 8,
			pages: 0,

			/* 弹出框动画 */
			maskClass: {
				position: 'fixed',
				bottom: 0,
				top: 0,
				left: 0,
				right: 0,
				zIndex: 8,
				backgroundColor: 'rgba(0, 0, 0, 0.4)'
			},
			moreMode: [],
			moreTrans: false,

			/* picker总和 */
			defaultProps: {
				label: 'label',
				value: 'id'
			},
			digitVisible: false,
			digitLabel: '',
			digitVal: 6,
			digitArray: [
				{
					label: '6位',
					value: 6
				},
				{
					label: '5位',
					value: 5
				},
				{
					label: '4位',
					value: 4
				},
				{
					label: '3位',
					value: 3
				},
				{
					label: '2位',
					value: 2
				}
			],
			planeVisible: false,
			planeLabel: '',
			planeVal: null,
			planeArray: [
				{
					label: '默认',
					value: 0
				},
				{
					label: '买入',
					value: 1
				},
				{
					label: '卖出',
					value: 2
				}
			],
			trustVisible: false, //类型1市价 2限价
			trustLabel: '',
			trustVal: null,
			trustArray: [
				{
					label: '限价委托',
					value: 2
				},
				{
					label: '市价委托',
					value: 1
				}
			],
			leverVisible: false,
			leverLabel: '',
			leverVal: null,
			leverArray: [],

			/* 定时器 */
			check_timer: null,
			user_timer: null,
			trade_timer: null,
			record_timer: null,
			socket_timer: null
		};
	},
	onLoad() {
		this.getLever();

		// Picker默认值
		this.digitLabel = this.digitArray[0].label;
		this.digitsVal = this.digitArray[0].value;
		this.planeLabel = this.planeArray[0].label;
		this.planeVal = this.planeArray[0].value;
		this.trustLabel = this.trustArray[0].label;
		this.trustVal = this.trustArray[0].value;
	},
	onShow() {
		this.clearTime();

		var tradeId = uni.getStorageSync('tradeId');
		if (tradeId == undefined || tradeId == '' || tradeId == null) {
			uni.setStorageSync('tradeId', 1);
			this.tradeId = 1;
		} else {
			this.tradeId = tradeId;
		}

		console.log('当前tradeId:' + this.tradeId);

		let that = this;
		// this.socketOpen = true;

		this.token = uni.getStorageSync('token');
		this.isLogin = this.token != '';

		this.init();
		clearTimeout(this.socket_timer);
		this.socket_timer = '';

		this.socket_timer = setTimeout(() => {
			that.socket();
		}, 700);
	},
	onTabItemTap(e) {
		this.price = '';
		this.quantity = '';

		//取消订阅
		this.unSubTrade();
		this.unSubArea();
		this.clearTime();
		uni.closeSocket();

		this.myColse = false;
		this.socketOpen = false;
	},
	onHide() {
		// console.log('exchange隐藏了');
		this.price = '';
		this.quantity = '';

		//取消订阅
		this.unSubTrade();
		this.unSubArea();
		this.clearTime();
		uni.closeSocket();

		this.myColse = false;
		this.socketOpen = false;
		//关闭websocket连接
	},
	watch: {
		price() {
			if (this.price == '' || this.quantity == '') {
				this.totalPrice = '--';
			} else {
				this.totalPrice = this.price * this.quantity;
			}
		},
		quantity() {
			if (this.price == '' || this.quantity == '') {
				this.totalPrice = '--';
			} else {
				console.log('原本的数量:' + this.quantity);

				this.totalPrice = this.price * this.quantity;

				// if (this.buttonActive == 0) {
				// 	//处理交易额大于可用的情况
				// 	if (this.totalPrice > this.walletList.using) {
				// 		console.log('大于了');
				// 		this.quantity = (this.quantity - 0.0001).toFixed(6);
				// 		console.log('强制改变的数量:' + this.quantity);
				// 	}
				// }
			}
		}
	},
	methods: {
		_log(data) {
			// console.log(JSON.stringify(data));
		},
		_json(data) {
			return JSON.stringify(data);
		},
		init() {
			// this.changeDigits(this.digitArray[0].value);
			this.getCurrencyInfo(); //获取币种信息
			if (this.isLogin) {
				this.getRecord(); //当前委托
			}
		},

		/* 获取数据接口 */

		// 获取币种信息
		getCurrencyInfo() {
			this.$Ajax(
				'/search/bbTradeInfo',
				{
					tradeId: this.tradeId
				},
				res => {
					// console.log('币种信息' + JSON.stringify(res));
					// console.log(res.code);
					if (res.code == 0) {
						// console.log('币种信息' + JSON.stringify(res.obj));
						this.currencyName = res.obj.currencyName;
						this.currencyTradeName = res.obj.currencyTradeName;
						// this.usdtRate = res.obj.usdtRate;
						// this.areaList = res.obj.areaList;
						// this.curAreaId = this.areaList[0].id;
					} else {
						this.$tools.toast(res.msg);
					}
				}
			);
		},
		// 获取合约杠杆
		getLever() {
			this.$Ajax('/search/leverList', {}, res => {
				if (res.code == 0) {
					this.leverArray = res.obj;
					this.leverArray.forEach(item => {
						item.label = item.lever;
						item.value = item.lever;
					});
					this.leverLabel = this.leverArray[0].label;
					this.leverVal = this.leverArray[0].value;
					// console.log('杠杆数据' + JSON.stringify(this.leverArray));
				}
			});
		},
		getRecord() {
			// this.pageNum = 1;
			// this.nowEntrustList = [];

			if (this.record_timer != '') {
				clearInterval(this.record_timer);
				this.record_timer = '';
			}

			let that = this;
			this.record_timer = setInterval(function() {
				// console.log('刷新纪录')
				that.getNowEntrustList();
			}, 2000);
		},
		getNowEntrustList() {
			// console.log(this.pageNum + ' ' + this.pageSize);
			this.$Ajax(
				'/front/trade/infoList',
				{
					tradeId: this.tradeId,
					pageNum: 1,
					pageSize: 100,
					type: 0 //0：交易中 1历史记录 2交易记录
				},
				res => {
					if (res.code == 0) {
						this.nowEntrustList = res.obj.list;
					}
				}
			);
		},
		jumpRecord() {
			console.log(this.tradeId);
			uni.setStorageSync('tradeId', this.tradeId);
			this.$tools.jump('../exchange/exchange_record', this.currencyTradeName, this.tradeId);
		},

		/* 切换Tabs功能 */
		changePlatformTabsActive(index) {
			this.platformTabsActive = index;
		},
		changeRecordTabsActive(index) {
			this.recordTabsActive = index;
		},
		changeHeaderButtonTabsActive(index) {
			this.headerButtonTabsActive = index;
		},
		changeCleanPopupTabsActive(index) {
			this.cleanPopupTabsActive = index;
		},
		changeButtonActive(index) {
			this.quantity = '';
			this.sliderVal = 0;
			this.buttonActive = index;
		},

		//右上角菜单栏
		toMoreUrl(url) {
			this.hideMoreBox();
			this.$tools.jump(url);
		},

		/* 侧滑框公用 */
		showDrawer(e) {
			this.$refs[e].open();
		},
		closeDrawer(e) {
			this.$refs[e].close();
		},
		drawerChange(e, type) {
			if (e) {
				uni.hideTabBar();
			} else {
				uni.showTabBar();
			}
		},

		/* 弹出框公用 */
		openPopup(e, item) {
			uni.hideTabBar();

			if (e == 'cleanPopup') {
				this.orderInfoList = item;
			}
			if (e == 'stopPopup') {
				this.orderInfoList = item;
			}

			this.$refs[e].open();
		},
		hidePopup(e) {
			uni.showTabBar();
			this.$refs[e].close();
		},
		changePopup(e) {
			if (!e.show) {
				uni.showTabBar();
			}
			console.log('popup ' + e.type + ' 状态', e.show);
		},

		/* 底部选项卡公用 */
		onPickerConfirm(res, type) {
			console.log('当前控制的Picker是：' + type + ';当前值是' + res.obj.value);

			if (type == 'digitPicker') {
				this.digitLabel = res.obj.label;
				this.digitVal = res.obj.value;
			} else if (type == 'planePicker') {
				this.planeLabel = res.obj.label;
				this.planeVal = res.obj.value;
			} else if (type == 'trustPicker') {
				this.trustLabel = res.obj.label;
				this.trustVal = res.obj.value;
				this.price = '';
			} else if (type == 'leverPicker') {
				this.leverLabel = res.obj.label;
				this.leverVal = res.obj.value;
				this.price = '';
				this.quantity = '';
				this.sliderVal = 0;
				// this.getInsurance();
			}
		},
		onPickerCancel() {},

		/* 新的开始 */
		changeTradeId(usings, tradeId) {
			if (usings) {
				this.closeDrawer('menuDrawer');
				this.initallinfo(tradeId);
				this.getRecord();
			} else {
				this.$tools.toast('未开放');
			}
		},

		// 撤单
		cancelOrder(id) {
			this.$Ajax(
				'/front/trade/cancel',
				{
					id: id
				},
				res => {
					if (res.code == 0) {
						this.$tools.toast('撤单成功');
						this.getRecord();
					}
				}
			);
		},
		initallinfo(tradeId) {
			//缓存保留数据  下次进入时使用
			uni.setStorageSync('tradeId', tradeId);
			//取消之前订阅
			this.unSubTrade();
			this.tradeId = tradeId;
			console.log('menu点击后的TradeId：' + this.tradeId);
			this.buyList = [];
			this.sellList = [];
			this.price = '';
			this.quantity = '';
			this.getCurrencyInfo();
			//重新订阅
			this.subTrade();
			this.getUserInfo();
			this.isBottom = false;
			// this.getRecord(true);
		},
		/* 废旧代码区 */

		subOrUnSub(method, type, tradeId, currencyId, token, areaId) {
			// console.log('订阅/取消订阅' + method + '-->' + 'type:(1 交易 2深度图 3交易区域信息 4用户资产 5用户记录)' + type + '-->tradeId:' + tradeId + '-->areaId:' + areaId);
			var sendInfo = {};
			sendInfo.method = method;
			sendInfo.tradeId = tradeId;
			if (areaId > 0) {
				sendInfo.areaId = areaId;
			}
			sendInfo.type = type;
			if (currencyId > 0) {
				sendInfo.currencyId = currencyId;
			}
			if (token != '') {
				sendInfo.token = token;
			}
			this.send(JSON.stringify(sendInfo));
		},
		send(message) {
			// console.log('exchange --- message' + message);
			if (this.socketOpen) {
				uni.sendSocketMessage({
					data: message
				});
			}
		},
		parseJSONorNot(mayBeJSON) {
			if (typeof mayBeJSON === 'string') {
				return JSON.parse(mayBeJSON);
			} else {
				return mayBeJSON;
			}
		},
		showTradeData: function(data) {
			data = this.parseJSONorNot(data);
			// console.log('列表值');
			// this._log(data);
			this.sellList = [];
			this.buyList = [];

			if (data.obj.sellList && this.tradeId == data.obj.tradeId) {
				this.sellList = data.obj.sellList;
			}
			if (data.obj.buyList && this.tradeId == data.obj.tradeId) {
				this.buyList = data.obj.buyList;
			}
			
			if(this.tradeId == data.obj.tradeId){
				this.tradeInfoList = data.obj.tradeInfo;
			}

			// console.log('tradeInfoList： ' + JSON.stringify(this.tradeInfoList));

			if (Number(this.tradeInfoList.rise) < 0) {
				this.tradeInfoList.riseType = 1;
			} else {
				this.tradeInfoList.riseType = 0;
			}
		},
		showUserData: function(data) {
			data = this.parseJSONorNot(data);
			// console.log('用户信息：' + JSON.stringify(data));
			this.tradeWalletList = data.obj.tradeWallet;
			this.walletList = data.obj.wallet;
		},
		showAreaData: function(data) {
			data = this.parseJSONorNot(data);
			this._log(data);
			this.currencyList = data.obj.tradeList;
			this.currencyList.forEach(item => {
				if (Number(item.rise) > 0) {
					item.riseType = 1;
				} else if (Number(item.rise) < 0) {
					item.riseType = 0;
				}
			});
			// console.log('币种数据：' + JSON.stringify(this.currencyList));
		},
		socket: function() {
			var that = this;
			// console.clear();
			console.log('exchange -- socket打开了');
			console.log('socketOpen:-------' + that.socketOpen);
			console.log('myColse:-------' + that.myColse);
			console.log(!that.socketOpen && !that.myColse);
			if (!that.socketOpen && !this.myColse) {
				uni.connectSocket({
					url: this.socketUrl
				});
				uni.onSocketOpen(function(res) {
					that.socketOpen = true;
					console.log('WebSocket连接已打开！');
					that.getUserInfo();
					//订阅交易信息
					that.subTrade();
					//订阅区域信息
					that.subArea();
					//定时交易查询
					//定时查询用户数据
					that.setUserTime();
					//定时检查
					that.setCheckTime();
				});
				uni.onSocketError(function(res) {
					that.socketOpen = false;
					//that.$tools.toast('连接失败,请稍后再试');
					that.socket();
				});
				uni.onSocketMessage(function(res) {
					// console.log('exchange发送数据');

					var message = that.parseJSONorNot(res);
					message = that.parseJSONorNot(message.data);
					message = that.parseJSONorNot(message);
					// console.log('socket的数据：' + JSON.stringify(message));
					if (message.code == 1) {
						//1交易
						that.showTradeData(message);
					} else if (message.code == 2) {
						//用户
						that.showUserData(message);
					} else if (message.code == 4) {
						//检测 不做处理
					} else if (message.code == 5) {
						//区域
						that.showAreaData(message);
					} else if (message.code == -1) {
						//未登录
						//that.userNoLogin();
					}
				});
				uni.onSocketClose(function(res) {
					that.socketOpen = false;
					console.log('WebSocket 已关闭！');
					// if (!that.myColse) {
					// 	setTimeout(() => {
					// 		that.socket();
					// 	}, 1000);
					// }
				});
			}
		},

		/* 原生K线图 */
		goKline() {
			// #ifdef APP-PLUS
			uni.setStorageSync('tradeId', this.tradeId);
			const dcRichAlert = uni.requireNativePlugin('DCloud-RichAlert');
			dcRichAlert.show(
				{
					type: '1',
					isbb: '1',
					tradeId: this.tradeId,
					title: this.currencyTradeName,
					currencyName: this.currencyName
				},
				result => {}
			);
			// #endif
		},

		//获取表盘的价格
		getPlatformPrice(price) {
			if (this.trustVal == 2) {
				this.price = price.toFixed(this.digitVal);
				this.quantity = '';
				this.sliderVal = 0;
			}
		},

		// 右上角更多弹出框
		showMoreBox() {
			this.moreShow = true;
			this.moreMode = ['fade', 'zoom-in'];
			this.$nextTick(() => {
				setTimeout(() => {
					uni.hideTabBar();
					this.moreTrans = true;
				}, 50);
			});
		},
		hideMoreBox() {
			this.moreTrans = false;
			this.$nextTick(() => {
				setTimeout(() => {
					uni.showTabBar();
					this.moreShow = false;
				}, 300);
			});
		},
		clearTime() {
			if (this.user_timer != '') {
				clearInterval(this.user_timer);
				this.user_timer = '';
			}
			if (this.check_timer != '') {
				clearInterval(this.check_timer);
				this.check_timer = '';
			}
			if (this.trade_timer != '') {
				clearInterval(this.trade_timer);
				this.trade_timer = '';
			}
			if (this.record_timer != '') {
				clearInterval(this.record_timer);
				this.record_timer = '';
			}
		},
		sliderChange(e) {
			this.sliderVal = e.detail.value;
			console.log(this.buttonActive);
			if (this.buttonActive == 0) {
				if (this.trustVal == 2) {
					this.quantity = ((this.walletList.using * this.sliderVal) / this.price / 100).toFixed(4);
				} else {
					this.quantity = ((this.walletList.using * this.sliderVal) / this.tradeInfoList.currentPrice / 100).toFixed(4);
				}
			} else {
				this.quantity = ((this.tradeWalletList.using * this.sliderVal) / 100).toFixed(4);
			}
		},
		changeSliderTo(value) {
			if (this.price != '') {
				// this.$refs.slider.value = value;
				this.sliderVal = value;
				if (this.isLogin) {
					if (this.buttonActive == 0) {
						if (this.trustVal == 2) {
							this.quantity = ((this.walletList.using * this.sliderVal) / this.price / 100).toFixed(4);
						} else {
							this.quantity = ((this.walletList.using * this.sliderVal) / this.tradeInfoList.currentPrice / 100).toFixed(4);
						}
					} else {
						this.quantity = ((this.tradeWalletList.using * this.sliderVal) / 100).toFixed(4);
					}
				} else {
					this.quantity = 0;
				}
				console.log(this.sliderVal);
			}
		},
		//发布交易
		publishInfo() {
			if (!uni.getStorageSync('token')) {
				return this.$tools.toastJump('请先登录再进行交易', '../operate/login');
			}

			if (this.price == '') {
				return this.$tools.toast('价格不能小于0');
			}

			if (this.quantity == '') {
				return this.$tools.toast('数量不能小于0');
			}

			console.log('buttonActive: ' + this.buttonActive + ' tradeId: ' + this.tradeId + ' quantity: ' + this.quantity + ' price: ' + this.price);

			this.$Ajax(
				'/front/trade/publish',
				{
					tradeId: this.tradeId,
					tradeType: this.buttonActive,
					quantity: this.quantity,
					price: this.price
				},
				res => {
					if (res.code == 0) {
						this.$tools.toast(res.msg);
						this.price = '';
						this.quantity = '';
						this.getUserInfo();
						this.getRecord();
					}
				}
			);
		},
		//检测
		setCheckTime() {
			var that = this;
			if (this.check_timer == '') {
				this.check_timer = setInterval(function() {
					that.getcheckInfo();
				}, 2000);
			}
		},
		getcheckInfo() {
			var sendInfo = {};
			sendInfo.method = 'check';
			sendInfo.tradeId = this.tradeId;
			this.send(JSON.stringify(sendInfo));
		},
		//用户数据
		setUserTime() {
			var that = this;
			// console.log('走到这一步');
			if (this.user_timer == '') {
				this.user_timer = setInterval(function() {
					that.getUserInfo();
				}, 2000);
			}
		},
		getUserInfo() {
			var token = uni.getStorageSync('token');
			if (token != '') {
				var sendInfo = {};
				sendInfo.method = 'userinfo';
				sendInfo.tradeId = this.tradeId;
				sendInfo.type = 'usdt';
				sendInfo.token = token;
				this.send(JSON.stringify(sendInfo));
			}
		},
		subTrade() {
			if (this.tradeId != '' && this.tradeId > 0) {
				this.curSubTradeId = this.tradeId;
				this.subOrUnSub('sub', 1, this.curSubTradeId, 0, '', 0);
			}
		},
		//取消订阅
		unSubTrade() {
			if (this.curSubTradeId != '' && this.curSubTradeId > 0) {
				this.subOrUnSub('unsub', 1, this.curSubTradeId, 0, '', 0);
			}
		},
		//订阅深度
		subDept() {
			if (this.tradeId != '' && this.tradeId > 0) {
				this.curSubDeptId = this.tradeId;
				this.subOrUnSub('sub', 2, this.curSubDeptId, 0, '', 0);
			}
		},
		//取消订阅深度
		unsubDept() {
			if (this.curSubDeptId != '' && this.curSubDeptId > 0) {
				this.subOrUnSub('unsub', 2, this.curSubDeptId, 0, '', 0);
			}
		},
		subArea() {
			if (this.curAreaId != '' && this.curAreaId > 0) {
				this.curSubAreaId = this.curAreaId;
				this.subOrUnSub('sub', 3, this.tradeId, 0, '', this.curSubAreaId);
			}
		},
		unSubArea() {
			if (this.curSubAreaId != '' && this.curSubAreaId > 0) {
				this.subOrUnSub('unsub', 3, this.tradeId, 0, '', this.curSubAreaId);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/exchange';
</style>
