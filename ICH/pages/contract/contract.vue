<template>
	<!-- 合约 -->
	<view class="pages">
		<view class="headerButtonTabs">
			<view class="headerButtonTabs-wrapper"><view class="headerButtonTabs-title">合约交易</view></view>
		</view>
		<!-- <view class="headerButtonTabs">
			<view class="headerButtonTabs-wrapper">
				<view class="headerButtonTabs-btn" :class="{ 'headerButtonTabs-btn--active': headerButtonTabsActive == 0 }" @click="changeHeaderButtonTabsActive(0)">合约交易</view>
				<view class="headerButtonTabs-btn" :class="{ 'headerButtonTabs-btn--active': headerButtonTabsActive == 1 }" @click="changeHeaderButtonTabsActive(1)">保险合约</view>
			</view>
		</view> -->
		<view class="initHeader initHeader--bgWhite">
			<view class="initHeader-wrapper">
				<view class="initHeader-title initHeader-title--left" @click="showDrawer('menuDrawer')">
					<text>{{ currencyTradeName }}/{{ currencyName }}永续</text>
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
				<view class="initHeader-right">
					<view class="initHeader-button initHeader-button--kline" @click="goKline()"></view>
					<view class="initHeader-button initHeader-button--more" @click="showMoreBox()"></view>
				</view>
			</view>
		</view>
		<view class="platformBox">
			<view class="platformBox-tabs">
				<view class="platformBox-tabs__control">
					<view
						class="platformBox-tabs__control-item"
						:class="{ 'platformBox-tabs__control-item--active': platformTabsActive == 0 }"
						@click="changePlatformTabsActive(0)"
					>
						开仓
					</view>
					<view
						class="platformBox-tabs__control-item"
						:class="{ 'platformBox-tabs__control-item--active': platformTabsActive == 1 }"
						@click="changePlatformTabsActive(1)"
					>
						平仓
					</view>
					<view
						class="platformBox-tabs__control-item"
						:class="{ 'platformBox-tabs__control-item--active': platformTabsActive == 2 }"
						@click="changePlatformTabsActive(2)"
					>
						持仓
					</view>
				</view>
			</view>
			<view class="platformBox-wrapper">
				<view class="platformBox-content" v-show="platformTabsActive == 0 || platformTabsActive == 1">
					<view class="platformBox-operateBox leftBigBox">
						<view class="platformBox-buttonBox">
							<view
								class="platformBox-buttonBox__btn platformBox-buttonBox__btn--green"
								:class="[{ 'platformBox-buttonBox__btn--active': buttonActive == 1 }]"
								@click="changeButtonActive(1)"
							>
								{{ platformTabsActive == 0 ? '买入开多' : '买入平空' }}
							</view>
							<view
								class="platformBox-buttonBox__btn platformBox-buttonBox__btn--red"
								:class="[{ 'platformBox-buttonBox__btn--active': buttonActive == 2 }]"
								@click="changeButtonActive(2)"
							>
								{{ platformTabsActive == 0 ? '卖出开空' : '卖出平多' }}
							</view>
						</view>
						<view class="platformBox-pickerBox">
							<view class="platformBox-pickerBox__wrapper">
								<view class="platformBox-pickerBox__item platformBox-pickerBox__item--flex2">
									<view class="platformBox-pickerBox__item-btn" @click="trustVisible = true">{{ trustLabel }}</view>
								</view>
								<view class="platformBox-pickerBox__item">
									<view class="platformBox-pickerBox__item-btn" @click="leverVisible = true">{{ leverLabel }}X</view>
								</view>
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
									<view class="platformBox-formBox__list-type">手</view>
								</view>
							</view>
						</view>
						<view class="platformBox-infoBox">
							<view class="platformBox-infoBox__wrapper">
								<view class="platformBox-infoBox__list">
									<view class="platformBox-infoBox__list-label">可用</view>
									<view class="platformBox-infoBox__list-data">{{ isLogin ? walletList.using : '--' | number(6) }} USDT</view>
								</view>
								<view class="platformBox-infoBox__list">
									<view class="platformBox-infoBox__list-label">保证金</view>
									<view class="platformBox-infoBox__list-data">{{ guarantee }} USDT</view>
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
									:class="[{ 'platformBox-enterBox__button--green': buttonActive == 1 }, { 'platformBox-enterBox__button--red': buttonActive == 2 }]"
									@click="checkPublishType()"
								>
									确定
								</view>
							</view>
						</view>
					</view>
					<view class="platformBox-sheetBox rightBigBox">
						<view class="platformBox-sheetHeader">
							<view class="platformBox-sheetHeader__left">价格(USD)</view>
							<view class="platformBox-sheetHeader__right">数量(手)</view>
						</view>
						<view class="platformBox-sheetContent">
							<view class="platformBox-resourceBox platformBox-resourceBox--sell" v-show="planeVal == 0 || planeVal == 2">
								<view class="platformBox-resourceBox__wrapper">
									<view
										class="platformBox-resourceBox__list platformBox-resourceBox__list--red"
										v-for="(item, index) in sellList.slice(planeVal == 0 ? -5 : -10, buyList.length)"
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
				<view class="platformBox-content" v-show="platformTabsActive == 2">
					<view class="holdBox" title="持仓">
						<view class="holdBox-wrapper">
							<!-- <view class="holdBox-filterBox">
								<view class="holdBox-filterBox__item">
									<view class="holdBox-filterBox__item-label">全部合约</view>
									<view class="holdBox-filterBox__item-arrow"><image src="../../static/public/icon-triangle-bottom-blue.png" mode="widthFix"></image></view>
								</view>
								<view class="holdBox-filterBox__item">
									<view class="holdBox-filterBox__item-label">全部类型</view>
									<view class="holdBox-filterBox__item-arrow"><image src="../../static/public/icon-triangle-bottom-blue.png" mode="widthFix"></image></view>
								</view>
							</view> -->
							<view class="ticketBox-noData" v-if="nowGetList.length == 0">暂无记录</view>
							<view class="holdBox-list ticketBox-list" v-for="(item, index) in nowGetList" :key="index" v-else>
								<view class="ticketBox-info">
									<view
										class="ticketBox-info__type"
										:class="item.tradeType == 1 || item.tradeType == 3 ? 'ticketBox-info__type--buy' : 'ticketBox-info__type--sell'"
									>
										{{ item.tradeTypeStr }}
									</view>
									<view class="ticketBox-info__content">
										<view class="ticketBox-info__content-label">
											<view>{{ item.tradeName }}</view>
											<view class="ticketBox-info__content-lever">{{ item.lever }}X</view>
										</view>
										<view class="ticketBox-info__content-date">{{ item.createTime }}</view>
									</view>
									<!-- <view class="ticketBox-info__button"><view class="ticketBox-info__button-btn">撤单</view></view> -->
								</view>
								<view class="ticketBox-itemBox">
									<view class="ticketBox-itemBox__wrapper">
										<view class="ticketBox-itemBox__item">
											<view class="ticketBox-itemBox__item-label">成交均价(USDT)</view>
											<view class="ticketBox-itemBox__item-data">{{ item.openPrice | number(4) }}</view>
										</view>
										<view class="ticketBox-itemBox__item">
											<view class="ticketBox-itemBox__item-label">收益(USDT)</view>
											<view class="ticketBox-itemBox__item-data">{{ item.actualProfit | number(4) }}</view>
										</view>
										<view class="ticketBox-itemBox__item">
											<view class="ticketBox-itemBox__item-label">预估强平价</view>
											<view class="ticketBox-itemBox__item-data">{{ item.expectClosePrice | number(4) }}</view>
										</view>
										<view class="ticketBox-itemBox__item">
											<view class="ticketBox-itemBox__item-label">收益率</view>
											<view class="ticketBox-itemBox__item-data">{{ item.actualPercent }}%</view>
										</view>
										<view class="ticketBox-itemBox__item">
											<view class="ticketBox-itemBox__item-label">止盈价</view>
											<view class="ticketBox-itemBox__item-data">{{ item.winPrice | number(4) }}</view>
										</view>
										<view class="ticketBox-itemBox__item">
											<view class="ticketBox-itemBox__item-label">止损价</view>
											<view class="ticketBox-itemBox__item-data">{{ item.lostPrice | number(4) }}</view>
										</view>
									</view>
								</view>
								<view class="ticketBox-button">
									<view class="ticketBox-button__btn ticketBox-button__btn--blue" @click="openPopup('cleanPopup', item)">一键平仓</view>
									<view class="ticketBox-button__btn ticketBox-button__btn--green" @click="openPopup('stopPopup', item)">止盈止损</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- <view class="platformBox-messageBox" v-if="headerButtonTabsActive == 0">
				<view class="platformBox-messageBox__wrapper" @click="changeHeaderButtonTabsActive(1)">
					<view class="platformBox-messageBox__title">温馨提示</view>
					<view class="platformBox-messageBox__data">合约交易有风险，点击查看详情</view>
				</view>
			</view> -->
		</view>
		<view class="recordTabsBox" v-show="platformTabsActive == 0 || platformTabsActive == 1">
			<view class="recordTabsBox-control">
				<view class="recordTabsBox-control__item" :class="{ 'recordTabsBox-control__item--active': recordTabsActive == 0 }" @click="changeRecordTabsActive(0)">
					当前持仓
				</view>
				<view class="recordTabsBox-control__item" :class="{ 'recordTabsBox-control__item--active': recordTabsActive == 1 }" @click="changeRecordTabsActive(1)">
					计划委托
				</view>
				<view class="recordTabsBox-control__record" @click="$tools.jump('../contract/contract_record', headerButtonTabsActive)"></view>
			</view>
			<view class="recordTabsBox-wrapper">
				<view class="recordTabsBox-content" v-if="recordTabsActive == 0">
					<view class="ticketBox">
						<view class="ticketBox-wrapper">
							<view class="ticketBox-noData" v-if="nowGetList.length == 0">暂无记录</view>
							<view class="ticketBox-list" v-for="(item, index) in nowGetList" :key="index" v-else>
								<view class="ticketBox-info">
									<view
										class="ticketBox-info__type"
										:class="item.tradeType == 1 || item.tradeType == 4 ? 'ticketBox-info__type--buy' : 'ticketBox-info__type--sell'"
									>
										{{ item.tradeTypeStr }}
									</view>
									<view class="ticketBox-info__content">
										<view class="ticketBox-info__content-label">
											<view>{{ item.tradeName }}</view>
											<view class="ticketBox-info__content-lever">{{ item.lever }}X</view>
										</view>
										<view class="ticketBox-info__content-date">{{ item.createTime }}</view>
									</view>
									<!-- <view class="ticketBox-info__button"><view class="ticketBox-info__button-btn">撤单</view></view> -->
								</view>
								<view class="ticketBox-itemBox">
									<view class="ticketBox-itemBox__wrapper">
										<view class="ticketBox-itemBox__item">
											<view class="ticketBox-itemBox__item-label">成交均价({{ currencyName }})</view>
											<view class="ticketBox-itemBox__item-data">{{ item.openPrice | number(4) }}</view>
										</view>
										<view class="ticketBox-itemBox__item">
											<view class="ticketBox-itemBox__item-label">收益({{ currencyName }})</view>
											<view class="ticketBox-itemBox__item-data">{{ item.actualProfit | number(4) }}</view>
										</view>
										<view class="ticketBox-itemBox__item">
											<view class="ticketBox-itemBox__item-label">预估强平价</view>
											<view class="ticketBox-itemBox__item-data">{{ item.expectClosePrice | number(4) }}</view>
										</view>
										<view class="ticketBox-itemBox__item">
											<view class="ticketBox-itemBox__item-label">收益率</view>
											<view class="ticketBox-itemBox__item-data">{{ item.actualPercent }}%</view>
										</view>
										<view class="ticketBox-itemBox__item">
											<view class="ticketBox-itemBox__item-label">止盈价</view>
											<view class="ticketBox-itemBox__item-data">{{ item.winPrice | number(4) }}</view>
										</view>
										<view class="ticketBox-itemBox__item">
											<view class="ticketBox-itemBox__item-label">止损价</view>
											<view class="ticketBox-itemBox__item-data">{{ item.lostPrice | number(4) }}</view>
										</view>
										<view class="ticketBox-itemBox__item">
											<view class="ticketBox-itemBox__item-label">持仓量({{ currencyName }})</view>
											<view class="ticketBox-itemBox__item-data">{{ item.curQuantity | number(4) }}</view>
										</view>
										<view class="ticketBox-itemBox__item">
											<view class="ticketBox-itemBox__item-label">保证金({{ currencyName }})</view>
											<view class="ticketBox-itemBox__item-data">{{ item.guarantee | number(4) }}</view>
										</view>
										<view class="ticketBox-itemBox__item">
											<view class="ticketBox-itemBox__item-label">可平量({{ currencyName }})</view>
											<view class="ticketBox-itemBox__item-data">{{ item.curQuantity | number(4) }}</view>
										</view>
									</view>
								</view>
								<view class="ticketBox-button">
									<view class="ticketBox-button__btn ticketBox-button__btn--blue" @click="openPopup('cleanPopup', item)">一键平仓</view>
									<view class="ticketBox-button__btn ticketBox-button__btn--green" @click="openPopup('stopPopup', item)">止盈止损</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="recordTabsBox-content" v-if="recordTabsActive == 1">
					<view class="ticketBox">
						<view class="ticketBox-wrapper">
							<view class="ticketBox-noData" v-if="nowEntrustList.length == 0">暂无记录</view>
							<view class="ticketBox-list" v-for="(item, index) in nowEntrustList" :key="index" v-else>
								<view class="ticketBox-info">
									<view
										class="ticketBox-info__type"
										:class="item.tradeType == 1 || item.tradeType == 4 ? 'ticketBox-info__type--buy' : 'ticketBox-info__type--sell'"
									>
										{{ item.tradeTypeStr }}
									</view>
									<view class="ticketBox-info__content">
										<view class="ticketBox-info__content-label">
											<view>{{ item.tradeName }}</view>
											<view class="ticketBox-info__content-lever">{{ item.lever }}X</view>
										</view>
										<view class="ticketBox-info__content-date">{{ item.createTime }}</view>
									</view>
									<view class="ticketBox-info__button"><view class="ticketBox-info__button-btn" @click="cancelOrder(item.id)">撤单</view></view>
								</view>
								<view class="ticketBox-itemBox">
									<view class="ticketBox-itemBox__wrapper">
										<view class="ticketBox-itemBox__item">
											<view class="ticketBox-itemBox__item-label">委托量({{ currencyLabel }})</view>
											<view class="ticketBox-itemBox__item-data">{{ item.pubQuantity }}</view>
										</view>
										<view class="ticketBox-itemBox__item">
											<view class="ticketBox-itemBox__item-label">委托价({{ item.currencyName }})</view>
											<view class="ticketBox-itemBox__item-data">{{ item.pubPrice }}</view>
										</view>
										<view class="ticketBox-itemBox__item">
											<view class="ticketBox-itemBox__item-label">保证金({{ item.currencyName }})</view>
											<view class="ticketBox-itemBox__item-data">{{ item.guarantee }}</view>
										</view>
										<view class="ticketBox-itemBox__item">
											<view class="ticketBox-itemBox__item-label">成交量({{ currencyLabel }})</view>
											<view class="ticketBox-itemBox__item-data">{{ item.status == 0 || item.status == 2 ? 0 : item.pubQuantity }}</view>
										</view>
										<view class="ticketBox-itemBox__item">
											<view class="ticketBox-itemBox__item-label">成交价({{ item.currencyName }})</view>
											<view class="ticketBox-itemBox__item-data">{{ item.status == 0 || item.status == 2 ? 0 : item.tradePrice }}</view>
										</view>
										<view class="ticketBox-itemBox__item">
											<view class="ticketBox-itemBox__item-label">手续费({{ item.currencyName }})</view>
											<view class="ticketBox-itemBox__item-data">{{ item.charge }}</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 右上角弹框 -->
		<view class="moreBox" v-if="moreShow">
			<uni-transition :mode-class="['fade']" :styles="maskClass" :duration="300" :show="moreTrans" @click="hideMoreBox" />
			<!-- <view class="moreBox-mask" @click="hideMoreBox()" @touchmove.stop.prevent></view> -->
			<!-- :show="showTrans" @click="onTap" -->
			<uni-transition class="moreBox-wrapper" :mode-class="moreMode" :show="moreTrans" :duration="300" @click="hideMoreBox">
				<!-- <view class="moreBox-wrapper"> -->
				<!-- <view class="moreBox-list" @click="$tools.noOpen()">
					<view class="moreBox-list__icon"><image src="../../static/contract/icon-popup-item-01.png" mode="widthFix"></image></view>
					<view class="moreBox-list__label">交易说明</view>
				</view> -->
				<view class="moreBox-list" @click="toMoreUrl('../contract/contract_setting')">
					<view class="moreBox-list__icon"><image src="../../static/contract/icon-popup-item-02.png" mode="widthFix"></image></view>
					<view class="moreBox-list__label">合约设置</view>
				</view>
				<view class="moreBox-list" @click="toMoreUrl('../contract/contract_calculator')">
					<view class="moreBox-list__icon"><image src="../../static/contract/icon-popup-item-03.png" mode="widthFix"></image></view>
					<view class="moreBox-list__label">计算器</view>
				</view>
				<!-- <view class="moreBox-list" @click="$tools.noOpen()">
					<view class="moreBox-list__icon"><image src="../../static/contract/icon-popup-item-04.png" mode="widthFix"></image></view>
					<view class="moreBox-list__label">费率</view>
				</view> -->
				<!-- </view> -->
			</uni-transition>
		</view>
		<!-- 保险保证金确认框 -->
		<uni-popup ref="promptPopup" type="center" :animation="true" @change="changePopup">
			<view class="centerModal">
				<view class="centerModal-wrapper">
					<view class="centerModal-title">温馨提示</view>
					<view class="centerModal-desc">购买本项合约需要支付保险金，用于保障交易风险。</view>
					<view class="centerModal-listBox">
						<view class="centerModal-listBox__list">
							<view class="centerModal-listBox__list-label">委托方式</view>
							<view class="centerModal-listBox__list-data">{{ trustLabel }}</view>
						</view>
						<view class="centerModal-listBox__list">
							<view class="centerModal-listBox__list-label">数量</view>
							<view class="centerModal-listBox__list-data">{{ quantity }}</view>
						</view>
						<view class="centerModal-listBox__list">
							<view class="centerModal-listBox__list-label">所需保证金</view>
							<view class="centerModal-listBox__list-data">{{ guarantee }}{{ currencyName }}</view>
						</view>
						<view class="centerModal-listBox__list">
							<view class="centerModal-listBox__list-label">所需保险金</view>
							<view class="centerModal-listBox__list-data">{{ seguro | number(4) }}{{ currencyName }}</view>
						</view>
					</view>
					<view class="centerModal-buttonBox">
						<view class="centerModal-buttonBox__btn centerModal-buttonBox__btn--cancel" @click="hidePopup('promptPopup')">取消</view>
						<view class="centerModal-buttonBox__btn centerModal-buttonBox__btn--confirm" @click="publishInfo()">确定</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 交易确认框 -->
		<uni-popup ref="transactionPopup" type="center" :animation="true" @change="changePopup">
			<view class="centerModal">
				<view class="centerModal-wrapper">
					<view class="centerModal-title">{{ currencyTradeName }}/{{ currencyName }}</view>
					<view class="centerModal-listBox">
						<view class="centerModal-listBox__list">
							<view class="centerModal-listBox__list-label">委托方式</view>
							<view class="centerModal-listBox__list-data">{{ trustLabel }}</view>
						</view>
						<view class="centerModal-listBox__list">
							<view class="centerModal-listBox__list-label">数量</view>
							<view class="centerModal-listBox__list-data">{{ quantity }}</view>
						</view>
						<view class="centerModal-listBox__list">
							<view class="centerModal-listBox__list-label">所需保证金</view>
							<view class="centerModal-listBox__list-data">{{ guarantee }}{{ currencyName }}</view>
						</view>
					</view>
					<view class="centerModal-buttonBox">
						<view class="centerModal-buttonBox__btn centerModal-buttonBox__btn--cancel" @click="hidePopup('transactionPopup')">取消</view>
						<view class="centerModal-buttonBox__btn centerModal-buttonBox__btn--confirm" @click="publishInfo()">确定</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 一键平仓操作框 -->
		<uni-popup ref="cleanPopup" type="bottom" :animation="true" @change="changePopup">
			<view class="cleanPopup">
				<view class="cleanPopup-wrapper">
					<view class="cleanPopup-info">
						<view class="cleanPopup-name">{{ orderInfoList.tradeName }}</view>
						<view class="cleanPopup-type">{{ orderInfoList.tradeTypeStr }}</view>
						<view class="cleanPopup-tabs">
							<view class="cleanPopup-tabs__control">
								<view
									class="cleanPopup-tabs__control-item"
									:class="{ 'cleanPopup-tabs__control-item--active': cleanPopupTabsActive == 2 }"
									@click="changeCleanPopupTabsActive(2)"
								>
									限价
								</view>
								<view
									class="cleanPopup-tabs__control-item"
									:class="{ 'cleanPopup-tabs__control-item--active': cleanPopupTabsActive == 1 }"
									@click="changeCleanPopupTabsActive(1)"
								>
									市价
								</view>
							</view>
						</view>
					</view>
					<view class="cleanPopup-content">
						<view class="cleanPopup-form">
							<view class="cleanPopup-form__wrapper">
								<view class="cleanPopup-form__list" :class="{ 'cleanPopup-form__list--disabled': cleanPopupTabsActive == 1 }">
									<view class="cleanPopup-form__list-input">
										<input
											type="number"
											:disabled="cleanPopupTabsActive == 1"
											placeholder-class="cleanPopup-form__list-placeholder"
											placeholder="价格"
											v-model="cleanPopupPrice"
										/>
									</view>
									<view class="cleanPopup-form__list-type">{{ currencyName }}</view>
									<!-- <view class="cleanPopup-form__list-btn">-</view>
									<view class="cleanPopup-form__list-btn">+</view> -->
								</view>
								<view class="cleanPopup-form__list">
									<view class="cleanPopup-form__list-input">
										<input type="number" placeholder-class="cleanPopup-form__list-placeholder" placeholder="数量" v-model="cleanPopupQuantity" />
									</view>
									<view class="cleanPopup-form__list-type">{{ currencyName }}</view>
								</view>
								<view class="cleanPopup-form__list">
									<view class="cleanPopup-form__list-btn" @click="changeCleanPopupQuantity(10)">10%</view>
									<view class="cleanPopup-form__list-btn" @click="changeCleanPopupQuantity(20)">20%</view>
									<view class="cleanPopup-form__list-btn" @click="changeCleanPopupQuantity(50)">50%</view>
									<view class="cleanPopup-form__list-btn" @click="changeCleanPopupQuantity(100)">100%</view>
								</view>
								<view class="cleanPopup-form__note">
									<text>可平量({{ currencyTradeName }})：</text>
									<text class="cleanPopup-form__note--highlight">{{ orderInfoList.curQuantity }}</text>
								</view>
							</view>
						</view>
						<view class="initButton"><view class="initButton-btn initButton-btn--blue" @click="closeOrder()">平仓</view></view>
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 止盈止损操作框 -->
		<uni-popup ref="stopPopup" type="bottom" :animation="true" @change="changePopup">
			<view class="stopPopup">
				<view class="stopPopup-wrapper">
					<view class="stopPopup-title">止盈止损</view>
					<view class="stopPopup-detailBox">
						<view class="stopPopup-detailBox__wrapper">
							<view class="stopPopup-detailBox__type">{{ orderInfoList.tradeTypeStr }}</view>
							<view class="stopPopup-detailBox__lever">{{ orderInfoList.lever }}x</view>
							<view class="stopPopup-detailBox__itemBox">
								<view class="stopPopup-detailBox__itemBox-item">
									<view class="stopPopup-detailBox__itemBox-data">{{ orderInfoList.openPrice | number(4) }}</view>
									<view class="stopPopup-detailBox__itemBox-label">开仓均价</view>
								</view>
							</view>
						</view>
					</view>
					<view class="stopPopup-form">
						<view class="stopPopup-form__wrapper">
							<view class="stopPopup-form__switch"><view class="stopPopup-form__switch-label">止盈</view></view>
							<view class="stopPopup-form__list">
								<view class="stopPopup-form__list-input">
									<input type="number" placeholder-class="stopPopup-form__list-placeholder" placeholder="价格" v-model="stopPopupProfit" />
								</view>
							</view>
							<view class="stopPopup-form__desc">&gt; 止盈 预计收益 {{ stopPopupProfitResult }}</view>
							<view class="stopPopup-form__switch"><view class="stopPopup-form__switch-label">止损</view></view>
							<view class="stopPopup-form__list">
								<view class="stopPopup-form__list-input">
									<input type="number" placeholder-class="stopPopup-form__list-placeholder" placeholder="价格" v-model="stopPopupLoss" />
								</view>
							</view>
							<view class="stopPopup-form__desc">&lt; 止损 预计收益 {{ stopPopupLossResult }}</view>

							<view class="stopPopup-form__button">
								<view class="stopPopup-form__button-btn stopPopup-form__button-btn--cancel" @click="hidePopup('stopPopup')">取消</view>
								<view class="stopPopup-form__button-btn stopPopup-form__button-btn--confirm" @click="stopOrder()">确定</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 左侧币种选择 -->
		<uni-drawer :width="menuDrawerWidth" ref="menuDrawer" @change="drawerChange($event)">
			<view class="menuDrawerBox">
				<view class="menuDrawerBox-wrapper">
					<view class="menuDrawerBox-title">USDT合约</view>
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

var url = URLSET.websocketUrl + '/websocket/trade';
// var url = '/socket' + '/websocket/trade';

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
			buttonActive: 1,

			/* 初始化盒子 */
			nowGetList: [], //当前持仓
			nowEntrustList: [], //当前委托
			historyGetList: [], //当前持仓
			currencyList: [],
			buyList: [],
			sellList: [],
			tradeInfoList: [],
			// tradeWalletList: [],
			walletList: [],
			orderInfoList: [], //操作某条记录

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
			guarantee: '--', //保证金
			seguro: '--', //保险金
			seguroRate: 0,  //保险合约费用
			usdtBase: 0, //合约乘数

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
			socket_timer: null,
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

		console.log('当前tradeId:' + this.tradeId);
	},
	onShow() {
		this.clearTime();
		
		let that = this;

		var contractActive = uni.getStorageSync('contractActive');
		// console.log('contractActive --- ' + contractActive);
		if (contractActive == '' || contractActive == null || contractActive == undefined) {
			this.headerButtonTabsActive = 0;
		} else {
			this.headerButtonTabsActive = contractActive;
		}

		//控制交易确定弹出框
		var limiPopupShow = uni.getStorageSync('limiPopupShow');
		var marketPopupShow = uni.getStorageSync('marketPopupShow');
		if (limiPopupShow == '' || limiPopupShow == null || limiPopupShow == undefined) {
			uni.setStorageSync('limiPopupShow', true);
		}
		if (marketPopupShow == '' || marketPopupShow == null || marketPopupShow == undefined) {
			uni.setStorageSync('marketPopupShow', true);
		}

		this.token = uni.getStorageSync('token');
		this.isLogin = this.token != '';

		this.init();
		
		clearTimeout(this.socket_timer);
		this.socket_timer = '';
		
		this.socket_timer = setTimeout(() => {
			that.socket();
		}, 700);
	},
	onHide() {
		console.log('contract隐藏了');
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
			if ((this.price == '' && this.trustVal == 2) || this.quantity == '') {
				this.guarantee = '--';
				this.seguro = '--';
			} else {
				if(this.trustVal == 2){
					this.guarantee = (this.price * this.quantity * this.usdtBase / this.leverVal).toFixed(6);
				}else if(this.trustVal == 1){
					this.guarantee = (this.tradeInfoList.currentPrice * this.quantity * this.usdtBase / this.leverVal).toFixed(6);
				}
				
				this.seguro = this.guarantee * this.seguroRate;
				if(this.buttonActive == 0){
					if(this.guarantee > this.walletList.using){
						console.log('大于了')
						this.quantity = (this.quantity - 0.0001).toFixed(6);
						console.log('强制改变的数量:' + this.quantity);
					}
				}
				// this.getGuarantee();
			}
		},
		quantity() {
			if ((this.price == '' && this.trustVal == 2) || this.quantity == '') {
				this.guarantee = '--';
			} else {
				if(this.trustVal == 2){
					this.guarantee = (this.price * this.quantity * this.usdtBase / this.leverVal).toFixed(6);
				}else if(this.trustVal == 1){
					this.guarantee = (this.tradeInfoList.currentPrice * this.quantity * this.usdtBase / this.leverVal).toFixed(6);
				}
				
				this.seguro = this.guarantee * this.seguroRate;
				if(this.buttonActive == 0){
					if(this.guarantee > this.walletList.using){
						console.log('大于了')
						this.quantity = (this.quantity - 0.0001).toFixed(6);
						console.log('强制改变的数量:' + this.quantity);
					}
				}
				// this.getGuarantee();
			}
		},

		stopPopupProfit() {
			this.calcWin(0);
		},
		stopPopupLoss() {
			this.calcWin(1);
		}
	},
	methods: {
		_log(data) {
			console.log(JSON.stringify(data));
		},
		_json(data) {
			return JSON.stringify(data);
		},
		init() {
			// this.changeDigits(this.digitArray[0].value);
			this.getCurrencyInfo(); //获取币种信息
			if (this.isLogin) {
				this.getRecord(); //记录
				this.getSeguroRate();
			}
		},

		/* 获取数据接口 */

		// 获取币种信息
		getCurrencyInfo() {
			this.$Ajax(
				'/search/tradeInfo',
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

		// 获取保证金
		getGuarantee() {
			if (!this.isLogin || this.platformTabsActive == 1) {
				return;
			}

			if (this.trustVal == 1) {
				//市价
				var price = this.tradeInfoList.currentPrice;
			} else if (this.trustVal == 2) {
				//限价
				var price = this.price;
			}
			
			this.quantity = (this.walletList.using / price * this.leverVal / this.usdtBase).toFixed(4);
			
			// this.quantity = (this.walletList.using / this.price * this.leverVal / this.usdtBase).toFixed(4);
			// this.guarantee = 

			// this.$Ajax(
			// 	'/front/usdt/guarantee',
			// 	{
			// 		tradeId: this.tradeId,
			// 		lever: this.leverVal,
			// 		openPrice: price,
			// 		quantity: this.quantity
			// 	},
			// 	res => {
			// 		console.log(this._json(res.obj));
			// 		if (res.code == 0) {
			// 			this.guarantee = res.obj.guarantee.toFixed(6);
			// 			this.seguro = this.guarantee * this.seguroRate;
			// 		}
			// 	}
			// );
		},
		
		// 获取保险金算法比例
		getSeguroRate() {
			this.$Ajax('/front/usdt/contractConfig', {
				tradeId: this.tradeId
			}, res => {
				console.log('保险金：'+this._json(res))
				if (res.code == 0) {
					this.seguroRate = res.obj.rate;
					this.usdtBase = res.obj.usdtBase;
				}
			});
		},
		getRecord() {
			// this.pageNum = 1;
			// this.nowGetList = [];
			// this.nowEntrustList = [];
			// console.log('tradeId:' + this.tradeId + '--pageNum:' + this.pageNum + '--pageSize:' + this.pageSize + '--status:' + this.recordTabsActive);
			
			let that = this;
			
			if (this.record_timer != '') {
				clearInterval(this.record_timer);
				this.record_timer = '';
			}
			
			this.record_timer = setInterval(function() {
				if (that.recordTabsActive == 0) {
					console.log('刷新数据1')
					that.getNowGetList();
				} else {
					console.log('刷新数据2')
					that.getNowEntrustList();
				}
			}, 2000);
		},

		getNowGetList() {

			this.$Ajax(
				'/front/usdt/orderList',
				{
					tradeId: this.tradeId,
					pageNum: 1,
					pageSize: 10,
					usdtType: this.headerButtonTabsActive
				},
				res => {
					if (res.code == 0) {
						this.nowGetList = res.obj.list;
					}
				}
			);
		},
		getNowEntrustList() {
			this.$Ajax(
				'/front/usdt/tradeList',
				{
					tradeId: this.tradeId,
					usdtType: this.headerButtonTabsActive,
					tradeType: 0,
					status: 0,
					pageNum: 1,
					pageSize: 10,
					pubType: 0
				},
				res => {
					if (res.code == 0) {
						this.nowEntrustList = res.obj.list;
						console.log('nowEntrustList---' + JSON.stringify(this.nowEntrustList));
					}
				}
			);
		},

		/* 切换Tabs功能 */
		changePlatformTabsActive(index) {
			this.platformTabsActive = index;
			console.log(index);
			if (index == 2) {
				this.recordTabsActive = 0;
				this.getRecord();
			}
		},
		changeRecordTabsActive(index) {
			this.recordTabsActive = index;
			this.getRecord();
		},
		changeHeaderButtonTabsActive(index) {
			this.headerButtonTabsActive = index;
			this.getRecord();
		},
		changeCleanPopupTabsActive(index) {
			this.cleanPopupPrice = '';
			this.cleanPopupQuantity = '';
			this.cleanPopupTabsActive = index;
		},
		changeButtonActive(index) {
			this.buttonActive = index;
		},

		//右上角菜单栏
		toMoreUrl(url) {
			uni.showTabBar();
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
			this.stopPopupProfit = '';
			this.stopPopupLoss = '';
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
				this.quantity = '';
				this.sliderVal = 0;
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
				'/front/usdt/cancel',
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

		// 平仓
		closeOrder() {
			this.$Ajax(
				'/front/usdt/close',
				{
					orderId: this.orderInfoList.id,
					type: this.cleanPopupTabsActive,
					price: this.cleanPopupPrice,
					quantity: this.cleanPopupQuantity,
					usdtType: this.headerButtonTabsActive
				},
				res => {
					if (res.code == 0) {
						this.$tools.toast('平单成功');
						this.hidePopup('cleanPopup');
						this.getRecord();
					}
				}
			);
		},
		//设置盈亏
		stopOrder() {
			this.$Ajax(
				'/front/usdt/modifyWinLost',
				{
					orderId: this.orderInfoList.id,
					winPrice: this.stopPopupProfit,
					lostPrice: this.stopPopupLoss
				},
				res => {
					if (res.code == 0) {
						this.$tools.toast(res.msg);
						this.hidePopup('stopPopup');
						this.getRecord();
					}
				}
			);
		},
		calcWin(type) {
			// 计算止盈止损的盈亏
			if (type == 0) {
				var price = this.stopPopupProfit;
			} else {
				var price = this.stopPopupLoss;
			}

			this.$Ajax(
				'/front/usdt/calcWin',
				{
					orderId: this.orderInfoList.id,
					price: price
				},
				res => {
					if (res.code == 0) {
						if (type == 0) {
							this.stopPopupProfitResult = res.obj;
						} else {
							this.stopPopupLossResult = res.obj;
						}
					}
				}
			);
		},
		//计算平仓百分比
		changeCleanPopupQuantity(rate) {
			this.cleanPopupQuantity = ((this.orderInfoList.curQuantity / 100) * rate);
		},
		initallinfo(tradeId) {
			//缓存保留数据  下次进入时使用
			uni.setStorageSync('tradeId-temp', tradeId);
			//取消之前订阅
			this.unSubTrade();
			this.tradeId = tradeId;
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
			// console.log("订阅/取消订阅"+method+"-->"+"type:(1 交易 2深度图 3交易区域信息 4用户资产 5用户记录)"+type+"-->tradeId:"+tradeId+"-->areaId:"+areaId)
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
			// console.log('contract --- message' + message);
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

			// this.tradeInfoList = data.obj.tradeInfo;

			// console.log('tradeInfoList： ' + JSON.stringify(this.tradeInfoList));

			if (Number(this.tradeInfoList.rise) < 0) {
				this.tradeInfoList.riseType = 1;
			} else {
				this.tradeInfoList.riseType = 0;
			}
		},
		showUserData: function(data) {
			data = this.parseJSONorNot(data);
			// console.log('用户錢包信息：' + JSON.stringify(data));
			// this.tradeWalletList = data.obj.tradeWallet;
			this.walletList = data.obj.wallet;
		},
		showAreaData: function(data) {
			data = this.parseJSONorNot(data);
			// this._log(data);
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
			console.log('socket打开了');
			if (!that.socketOpen && !this.myColse) {
				uni.connectSocket({
					url: this.socketUrl
				});
				uni.onSocketOpen(function(res) {
					that.socketOpen = true;
					// console.log('WebSocket连接已打开！');
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
					// console.log('contract发送数据');
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
			// uni.navigateTo({
			// 	 url: '../tradeView/tradeView?trade=' + this.tradeId + '&name=' + this.currencyTradeName+'&type='+1
			// })
			// #ifdef APP-PLUS
			const dcRichAlert = uni.requireNativePlugin('DCloud-RichAlert');
			dcRichAlert.show(
				{
					type: '1',
					isbb: '0',
					tradeId: this.tradeId,
					title: this.currencyTradeName,
					currencyName: this.currencyName
				},
				result => {
					// if (result.type == 2) {
					// 	uni.switchTab({
					// 		url: '../number/number'
					// 	});
					// } else {
					// 	uni.switchTab({
					// 		url: '../usdt/usdt'
					// 	});
					// }
				}
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
			if(this.trustVal == 2){
				this.quantity = (this.walletList.using / this.price * this.leverVal / this.usdtBase * this.sliderVal / 100).toFixed(4);
			}else{
				this.quantity = (this.walletList.using / this.tradeInfoList.currentPrice * this.leverVal / this.usdtBase * this.sliderVal / 100).toFixed(4);
			}
			//this.quantity = Math.floor((this.walletList.using * this.sliderVal) / 100);
		},
		changeSliderTo(value) {
			console.log(this.trustVal);
			if (this.price != '' && this.trustVal == 2 || this.trustVal == 1) {
				// this.$refs.slider.value = value;
				this.sliderVal = value;
				if (this.isLogin) {
					
					if(this.trustVal == 2){
						this.quantity = (this.walletList.using / this.price * this.leverVal / this.usdtBase * this.sliderVal / 100).toFixed(4);
					}else{
						this.quantity = (this.walletList.using / this.tradeInfoList.currentPrice * this.leverVal / this.usdtBase * this.sliderVal / 100).toFixed(4);
					}
					
				} else {
					this.quantity = 0;
				}

				console.log(this.sliderVal);
			}
		},
		checkPublishType() {
			var limiPopupShow = uni.getStorageSync('limiPopupShow'); //限价
			var marketPopupShow = uni.getStorageSync('marketPopupShow'); //市价

			// if(limiPopupShow)

			if (this.price == '' && this.trustVal == 2) {
				return this.$tools.toast('价格不能小于0');
			}

			if (this.quantity == '') {
				return this.$tools.toast('数量不能小于0');
			}

			console.log('headerButtonTabsActive：：' + this.headerButtonTabsActive);

			if (this.headerButtonTabsActive == 0) {
				console.log('trustVal：' + this.trustVal + '---limiVal' + limiPopupShow);

				if ((this.trustVal == 2 && limiPopupShow) && this.platformTabsActive == 0 || (this.trustVal == 1 && marketPopupShow) && this.platformTabsActive == 0) {
					this.openPopup('transactionPopup');
				} else {
					this.publishInfo();
				}
			} else {
				if(this.platformTabsActive == 0){
					this.openPopup('promptPopup');
				}else{
					this.publishInfo();
				}
			}
		},
		//发布交易
		publishInfo() {

			if (!uni.getStorageSync('token')) {
				return this.$tools.toastJump('请先登录再进行交易', '../operate/login');
			}

			if (this.trustVal == 1) {
				//市价
				var price = this.tradeInfoList.currentPrice;
			} else if (this.trustVal == 2) {
				//限价
				var price = this.price;
			}
			console.log('headerButtonTabsActive：：' + this.headerButtonTabsActive);

			if (this.platformTabsActive == 0) {
				console.log('执行开仓接口');
				this.$Ajax(
					'/front/usdt/publish',
					{
						tradeId: this.tradeId,
						tradeType: this.buttonActive,
						pubQuantity: this.quantity,
						pubPrice: price,
						lever: this.leverVal,
						usdtType: this.headerButtonTabsActive,
						pubType: this.trustVal
					},
					res => {
						console.log(JSON.stringify(res));
						if (res.code == 0) {
							this.$tools.toast(res.msg);
							this.price = '';
							this.quantity = '';
							this.getUserInfo();
							this.getRecord();
							
						}
					}
				);
			} else if (this.platformTabsActive == 1) {
				console.log('执行平仓接口');
				if (this.buttonActive == 1) {
					var tradeType = 4;
				} else {
					var tradeType = 3;
				}
				this.$Ajax(
					'/front/usdt/closeByTradeType',
					{
						tradeId: this.tradeId,
						tradeType: tradeType, // 类型 3平多 4平空
						quantity: this.quantity,
						price: price,
						lever: this.leverVal,
						usdtType: this.headerButtonTabsActive,
						type: this.trustVal
					},
					res => {
						console.log(JSON.stringify(res));
						if (res.code == 0) {
							this.$tools.toast(res.msg);
							this.price = '';
							this.quantity = '';
							this.getUserInfo();
							this.getRecord();
						}
					}
				);
			}
		
			
			this.hidePopup('transactionPopup');
			this.hidePopup('promptPopup');
		},
		//检测
		setCheckTime() {
			var that = this;
			if (this.check_timer == '') {
				this.check_timer = setInterval(function() {
					that.getcheckInfo();
				}, 5000);
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
			if (this.user_timer == '') {
				this.user_timer = setInterval(function() {
					that.getUserInfo();
				}, 1000);
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
@import '@/common/scss/pages/contract';
</style>
