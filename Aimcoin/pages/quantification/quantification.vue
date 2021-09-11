<template>
	<view class="pages" :data-theme="pageTheme">
		<view class="initTarBarShadow"></view>
		<view class="main">
			<view class="fixedBox">
				<view class="fixedBox-wrapper">
					<view class="headerInfoBox">
						<view class="headerInfoBox-wrapper">
							<view class="headerInfoBox-icon"><image src="../../static/quantification/icon-huobi-white.png" mode="widthFix"></image></view>
							<view class="headerInfoBox-info">
								<view class="headerInfoBox-info__label">可用数量:火币(U) / {{ $store.state.projectName }}({{ $store.state.projectCurrencyName }})</view>
								<view class="headerInfoBox-info__data">{{ assetInfo.bourseAsset | number(6) }} / {{ assetInfo.serviceAsset | number(6) }}</view>
							</view>
							<view class="headerInfoBox-add">
								<view class="headerInfoBox-add__icon" @click="toolsPopupVisible = !toolsPopupVisible"></view>
								<view class="headerInfoBox-add__popupList popupListBox" v-show="toolsPopupVisible">
									<view class="popupListBox-wrapper">
										<view class="popupListBox-list" @click="clearData2Popup('totalStartPopup')">
											<view class="popupListBox-list__icon"><image src="../../static/quantification/item-popup-01.png" mode="scaleToFill"></image></view>
											<view class="popupListBox-list__label">全部开始</view>
										</view>
										<view class="popupListBox-list" @click="clearData2Popup('totalClosePopup')">
											<view class="popupListBox-list__icon"><image src="../../static/quantification/item-popup-02.png" mode="scaleToFill"></image></view>
											<view class="popupListBox-list__label">全部平仓</view>
										</view>
										<view class="popupListBox-list" @click="clearData2Path('../quantification/quantification_orderRecord')">
											<view class="popupListBox-list__icon"><image src="../../static/quantification/item-popup-03.png" mode="scaleToFill"></image></view>
											<view class="popupListBox-list__label">下单记录</view>
										</view>
										<view class="popupListBox-list" @click="clearData2Path('../quantification/quantification_rewardRecord')">
											<view class="popupListBox-list__icon"><image src="../../static/quantification/item-popup-04.png" mode="scaleToFill"></image></view>
											<view class="popupListBox-list__label">利润统计</view>
										</view>
										<view class="popupListBox-list" @click="clearData2Popup('addTradePopup')">
											<view class="popupListBox-list__icon"><image src="../../static/quantification/item-popup-05.png" mode="scaleToFill"></image></view>
											<view class="popupListBox-list__label">新增交易对</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 绑定的交易对列表 -->
			<view class="listBox">
				<view class="listBox-wrapper">
					<view class="listBox-body">
						<view class="initNoData" v-if="Object.keys(myRobotList).length == 0">暂无绑定交易对</view>
						<view class="listBox-list" v-for="(item, index) in myRobotList" :key="index">
							<view class="listBox-list__plane">
								<view class="listBox-list__header">
									<view class="listBox-list__icon"><image :src="item.pic" mode="widthFix"></image></view>
									<view class="listBox-list__content">
										<view class="listBox-list__currencyName">
											<text class="listBox-list__currencyName--highlight">{{ item.quotaCurrency }}</text>
											/{{ item.baseCurrency }}
										</view>
										<view class="listBox-list__status">
											状态：
											<text class="listBox-list__status--highlight">{{ item.status == 1 ? '已开始' : '已暂停' }}</text>
										</view>
									</view>
									<view class="listBox-list__more" @click="openTools2Popup('toolsPopup', item)"></view>
								</view>

								<view class="listBox-list__itemBox itemBox">
									<view class="itemBox-wrapper">
										<view class="itemBox-item itemBox-item--flex2">
											<view class="itemBox-item__data">{{ item.currentPrice | number(6) }}</view>
											<view class="itemBox-item__label">行情</view>
										</view>
										<!-- <view class="itemBox-item itemBox-item--flex2">
											<view class="itemBox-item__data">{{ item.orderTime == 0 ? '-' : item.holdingPrice | number(6) }}</view>
											<view class="itemBox-item__label">均价</view>
										</view>
										<view class="itemBox-item">
											<view
												class="itemBox-item__data"
												:class="[
													{ 'itemBox-item__data--green': (item.currentPrice - item.holdingPrice) / item.holdingPrice > 0 && item.orderTime != 0 },
													{ 'itemBox-item__data--red': (item.currentPrice - item.holdingPrice) / item.holdingPrice < 0 && item.orderTime != 0 }
												]"
											>
												{{ item.orderTime == 0 ? 0 : (((item.currentPrice - item.holdingPrice) / item.holdingPrice) * 100) | number(4) }}%
											</view>
											<view class="itemBox-item__label">涨跌幅</view>
										</view> -->
									</view>
								</view>

								<view class="listBox-list__bottom" @click="changeDropdownType(index)">
									<view class="listBox-list__dropDown" :class="{ 'listBox-list__dropDown--open': dropdownType == index }"></view>
								</view>
							</view>

							<view class="listBox-list__dropDownBox dropDownBox" v-if="dropdownType == index">
								<view class="dropDownBox-wrapper">
									<view class="dropDownBox-itemBox">
										<view class="dropDownBox-itemBox__item">
											<view class="dropDownBox-itemBox__item-data">{{ item.baseTime | formatTime('HMS') }}</view>
											<view class="dropDownBox-itemBox__item-label">参照时间</view>
										</view>
										<view class="dropDownBox-itemBox__item">
											<view class="dropDownBox-itemBox__item-data">{{ item.basePrice | number(4) }}</view>
											<view class="dropDownBox-itemBox__item-label">参照价格</view>
										</view>
										<view class="dropDownBox-itemBox__item">
											<view class="dropDownBox-itemBox__item-data dropDownBox-itemBox__item-data--style">{{ item.totalProfit | number(4) }}</view>
											<view class="dropDownBox-itemBox__item-label">累计利润</view>
										</view>
										<!-- <view class="dropDownBox-itemBox__item">
											<view class="dropDownBox-itemBox__item-data">{{ item.orderTime == 0 ? '-' : item.establishTime | formatTime('HMS') }}</view>
											<view class="dropDownBox-itemBox__item-label">建仓时间</view>
										</view>
										<view class="dropDownBox-itemBox__item">
											<view class="dropDownBox-itemBox__item-data">{{ item.orderTime == 0 ? '-' : item.establishPrice | number(4) }}</view>
											<view class="dropDownBox-itemBox__item-label">建仓价格</view>
										</view>
										<view class="dropDownBox-itemBox__item">
											<view class="dropDownBox-itemBox__item-data">{{ item.orderTime == 0 ? 0 : item.orderTime - 1 }}</view>
											<view class="dropDownBox-itemBox__item-label">补仓次数</view>
										</view>
										<view class="dropDownBox-itemBox__item">
											<view class="dropDownBox-itemBox__item-data">{{ item.holdingPrice == 0 ? '-' : item.holdingPrice | number(4) }}</view>
											<view class="dropDownBox-itemBox__item-label">持仓均价</view>
										</view> -->
										<view class="dropDownBox-itemBox__item">
											<view class="dropDownBox-itemBox__item-data">{{ item.holdingPrice == 0 ? '-' : item.holdingQuantity | number(8) }}</view>
											<view class="dropDownBox-itemBox__item-label">持仓数量</view>
										</view>
										<view class="dropDownBox-itemBox__item">
											<view class="dropDownBox-itemBox__item-data">{{ item.holdingPrice == 0 ? '-' : item.holdingMoney | number(4) }}</view>
											<view class="dropDownBox-itemBox__item-label">持仓总额</view>
										</view>
										<view class="dropDownBox-itemBox__item">
											<view class="dropDownBox-itemBox__item-data">{{ item.bourseHolding | number(8) }}</view>
											<view class="dropDownBox-itemBox__item-label">交易所持币{{ item.quotaCurrency }}</view>
										</view>
									</view>

									<!-- <view class="dropDownBox-recordBox" v-if="item.orderList.length != 0">
										<view class="dropDownBox-recordBox__header">
											<view class="dropDownBox-recordBox__data dropDownBox-recordBox__data--flex2">时间</view>
											<view class="dropDownBox-recordBox__data">数量</view>
											<view class="dropDownBox-recordBox__data">单价</view>
										</view>
										<view class="dropDownBox-recordBox__body">
											<view class="dropDownBox-recordBox__list" v-for="(subItem, subIndex) in item.orderList" :key="subIndex">
												<view class="dropDownBox-recordBox__data dropDownBox-recordBox__data--flex2">{{ subItem.createTime }}</view>
												<view class="dropDownBox-recordBox__data">{{ subItem.quantity | number(6) }}</view>
												<view class="dropDownBox-recordBox__data">{{ subItem.price | number(6) }}</view>
											</view>
										</view>
									</view> -->
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 工具箱 -->
		<uni-popup ref="toolsPopup" type="bottom" :animation="true" @change="changePopup">
			<view class="toolsBox">
				<view class="toolsBox-wrapper">
					<view class="toolsBox-header">
						<view class="toolsBox-icon"><image :src="popupInfo.pic" mode="scaleToFill"></image></view>

						<view class="toolsBox-info">
							<view class="toolsBox-currencyName">
								<text class="toolsBox-currencyName--highlight">{{ popupInfo.quotaCurrency }}</text>
								/{{ popupInfo.baseCurrency }}
							</view>
							<view class="toolsBox-status">
								状态：
								<text class="toolsBox-status--highlight">{{ popupInfo.status == 1 ? '已开始' : '已暂停' }}</text>
							</view>
						</view>
					</view>
					<view class="toolsBox-itemBox">
						<view class="toolsBox-itemBox__item" @click="hideTools2Popup('strategyOrderPopup')">
							<view class="toolsBox-itemBox__item-icon">
								<image :src="'../../static/quantification/icon-tools-01-' + pageTheme + '.png'" mode="widthFix"></image>
							</view>
							<view class="toolsBox-itemBox__item-label">配置</view>
						</view>
						<view class="toolsBox-itemBox__item" @click="hideTools2Popup('toggleStatusPopup')">
							<view class="toolsBox-itemBox__item-icon">
								<image :src="'../../static/quantification/icon-tools-02-' + (popupInfo.status == 1 ? 'pause' : 'start') + '-' + pageTheme + '.png'" mode="widthFix"></image>
							</view>
							<view class="toolsBox-itemBox__item-label">{{ popupInfo.status == 1 ? '暂停' : '开始' }}</view>
						</view>
						<view class="toolsBox-itemBox__item" @click="hideTools2Popup('deleteOrderPopup')">
							<view class="toolsBox-itemBox__item-icon">
								<image :src="'../../static/quantification/icon-tools-03-' + pageTheme + '.png'" mode="widthFix"></image>
							</view>
							<view class="toolsBox-itemBox__item-label">删除</view>
						</view>
						<view class="toolsBox-itemBox__item" @click="hideTools2Popup('refreshOrderPopup')">
							<view class="toolsBox-itemBox__item-icon">
								<image :src="'../../static/quantification/icon-tools-04-' + pageTheme + '.png'" mode="widthFix"></image>
							</view>
							<view class="toolsBox-itemBox__item-label">刷新</view>
						</view>
						<view class="toolsBox-itemBox__item" @click="hideTools2Popup('openOrderPopup')">
							<view class="toolsBox-itemBox__item-icon">
								<image :src="'../../static/quantification/icon-tools-05-' + pageTheme + '.png'" mode="widthFix"></image>
							</view>
							<view class="toolsBox-itemBox__item-label">开仓</view>
						</view>
						<view class="toolsBox-itemBox__item" @click="hideTools2Popup('coverUpOrderPopup')">
							<view class="toolsBox-itemBox__item-icon">
								<image :src="'../../static/quantification/icon-tools-06-' + pageTheme + '.png'" mode="widthFix"></image>
							</view>
							<view class="toolsBox-itemBox__item-label">补仓</view>
						</view>
						<view class="toolsBox-itemBox__item" @click="hideTools2Popup('closeOrderPopup')">
							<view class="toolsBox-itemBox__item-icon">
								<image :src="'../../static/quantification/icon-tools-07-' + pageTheme + '.png'" mode="widthFix"></image>
							</view>
							<view class="toolsBox-itemBox__item-label">平仓</view>
						</view>
					</view>
					<!-- <view class="toolsBox-bottom" @click="hidePopup('toolsPopup')"><view class="toolsBox-btn">取消</view></view> -->
				</view>
			</view>
		</uni-popup>

		<!-- 新增交易对 -->
		<uni-popup ref="addTradePopup" type="bottom" :animation="true" @change="changePopup">
			<view class="addTradeBox">
				<view class="addTradeBox-wrapper">
					<view class="addTradeBox-top">
						<view class="addTradeBox-title">新增交易对</view>
						<view class="addTradeBox-body">
							<view class="addTradeBox-logo"><image :src="'../../static/exchangeLogo/icon-huobi-long-' + pageTheme + '.png'" mode="widthFix"></image></view>

							<view class="addTradeBox-pickerBox">
								<view class="addTradeBox-pickerBox__list" @click="accountVisible = true">
									<view class="addTradeBox-pickerBox__list-label">* 交易账户</view>
									<view class="addTradeBox-pickerBox__list-picker">{{ accountLabel }}</view>
								</view>
								<view class="addTradeBox-pickerBox__list" @click="bourseAreaVisible = true">
									<view class="addTradeBox-pickerBox__list-label">* 计价货币</view>
									<view class="addTradeBox-pickerBox__list-picker">{{ bourseAreaLabel }}</view>
								</view>
							</view>

							<view class="addTradeBox-formBox">
								<view class="addTradeBox-formBox__wrapper">
									<view class="addTradeBox-formBox__item" @click="bourseTradeVisible = true">
										<!-- <view class="addTradeBox-formBox__label">* 选择币种</view> -->
										<view class="addTradeBox-formBox__picker">
											<view class="addTradeBox-formBox__picker-label">选择交易币种</view>
											<view class="addTradeBox-formBox__picker-data"></view>
											<!-- {{ bourseTradeLabel }} -->
										</view>
										<!-- <view class="addTradeBox-formBox__note">当前价格：52194.3204</view> -->
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="addTradeBox-bottom">
						<view class="addTradeBox-tradeIdsBox" v-if="tradeIdsList.length > 0">
							<view class="addTradeBox-tradeIdsBox__wrapper">
								<view class="addTradeBox-tradeIdsBox__header">
									<view class="addTradeBox-tradeIdsBox__header-label">币种</view>
									<view class="addTradeBox-tradeIdsBox__header-label">删除</view>
								</view>
								<view class="addTradeBox-tradeIdsBox__body">
									<view class="addTradeBox-tradeIdsBox__list" v-for="(item, index) in tradeIdsList" :key="index">
										<view class="addTradeBox-tradeIdsBox__list-label">{{ item.label }}</view>
										<view class="addTradeBox-tradeIdsBox__list-btn" @click="deleteTradeItem(index)"></view>
									</view>
								</view>
							</view>
						</view>

						<view class="addTradeBox-btn initButton"><view class="initButton-btn initButton-btn--style" @click="addRobot()">确定</view></view>
					</view>
				</view>
			</view>
		</uni-popup>

		<!-- 全部开始 -->
		<uni-popup ref="totalStartPopup" type="center" :animation="true" @change="changePopup">
			<view class="initPopup">
				<view class="initPopup-wrapper">
					<view class="initPopup-title">温馨提示</view>
					<view class="initPopup-desc">确定开始全部交易对吗？</view>
					<view class="initPopup-buttonBox">
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--cancel" @click="hidePopup('totalStartPopup')">取消</view>
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--confirm" @click="totalStart()">确认</view>
					</view>
				</view>
			</view>
		</uni-popup>

		<!-- 全部开始 -->
		<uni-popup ref="totalClosePopup" type="center" :animation="true" @change="changePopup">
			<view class="initPopup">
				<view class="initPopup-wrapper">
					<view class="initPopup-title">温馨提示</view>
					<view class="initPopup-desc">确定平仓全部交易对吗？</view>
					<view class="initPopup-buttonBox">
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--cancel" @click="hidePopup('totalClosePopup')">取消</view>
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--confirm" @click="totalClose()">确认</view>
					</view>
				</view>
			</view>
		</uni-popup>

		<!-- 策略配置 -->
		<uni-popup ref="strategyOrderPopup" type="bottom" :animation="true" @change="changePopup">
			<view class="strategyBox">
				<view class="strategyBox-wrapper">
					<view class="strategyBox-title">策略配置</view>
					<view class="strategyBox-body">
						<view class="strategyBox-infoBox">
							<view class="strategyBox-infoBox__item">
								<view class="strategyBox-infoBox__item-label">交易所：</view>
								<view class="strategyBox-infoBox__item-data">
									<view class="strategyBox-infoBox__item-icon"><image :src="popupInfo.bourseLogo" mode="widthFix"></image></view>
									{{ popupInfo.bourseName }}
								</view>
							</view>
							<view class="strategyBox-infoBox__item">
								<view class="strategyBox-infoBox__item-label">交易账号：</view>
								<view class="strategyBox-infoBox__item-data">{{ popupInfo.apiName }}</view>
							</view>
							<view class="strategyBox-infoBox__item">
								<view class="strategyBox-infoBox__item-label">币种：</view>
								<view class="strategyBox-infoBox__item-data">{{ popupInfo.quotaCurrency }}</view>
							</view>
							<view class="strategyBox-infoBox__item">
								<view class="strategyBox-infoBox__item-label">计价货币：</view>
								<view class="strategyBox-infoBox__item-data">{{ popupInfo.baseCurrency }}</view>
							</view>
						</view>

						<view class="strategyBox-formBox">
							<view class="strategyBox-formBox__wrapper">
								<view class="strategyBox-formBox__item">
									<view class="strategyBox-formBox__item-label">* 本金数量</view>
									<view class="strategyBox-formBox__item-list">
										<view class="strategyBox-formBox__item-input">
											<input type="text" placeholder-class="strategyBox-formBox__item-placeholder" placeholder="请输入本金数量" v-model="needQuantity" />
										</view>
										<view class="strategyBox-formBox__item-type">{{ popupInfo.baseCurrency }}</view>
									</view>
									<view class="strategyBox-formBox__item-note">当前火币资产可用：{{ assetInfo.bourseAsset | number(6) }} {{ popupInfo.baseCurrency }}</view>
								</view>
							</view>
						</view>

						<view class="strategyBox-pickerBox">
							<view class="strategyBox-pickerBox__list" @click="strategyModeVisible = true">
								<view class="strategyBox-pickerBox__list-label">* 策略模式</view>
								<view class="strategyBox-pickerBox__list-data">智能策略</view>
							</view>
							<view class="strategyBox-pickerBox__list" @click="strategyValueVisible = true">
								<view class="strategyBox-pickerBox__list-label">* 选择策略</view>
								<view class="strategyBox-pickerBox__list-data">{{ strategyValueLabel }}</view>
							</view>
						</view>

						<view class="strategyBox-btn initButton"><view class="initButton-btn initButton-btn--style" @click="strategyOrder()">确定</view></view>
					</view>
				</view>
			</view>
		</uni-popup>

		<!-- 暂停交易对 -->
		<uni-popup ref="toggleStatusPopup" type="center" :animation="true" @change="changePopup">
			<view class="initPopup">
				<view class="initPopup-wrapper">
					<view class="initPopup-title">温馨提示</view>
					<view class="initPopup-desc">确定{{ popupInfo.status == 1 ? '暂停' : '开始' }}当前交易对吗？</view>
					<view class="initPopup-buttonBox">
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--cancel" @click="hidePopup('toggleStatusPopup')">取消</view>
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--confirm" @click="toggleStatus()">确认</view>
					</view>
				</view>
			</view>
		</uni-popup>

		<!-- 删除交易对 -->
		<uni-popup ref="deleteOrderPopup" type="center" :animation="true" @change="changePopup">
			<view class="initPopup">
				<view class="initPopup-wrapper">
					<view class="initPopup-title">温馨提示</view>
					<view class="initPopup-desc">确定删除当前交易对吗？</view>
					<view class="initPopup-buttonBox">
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--cancel" @click="hidePopup('deleteOrderPopup')">取消</view>
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--confirm" @click="deleteOrder()">确认</view>
					</view>
				</view>
			</view>
		</uni-popup>

		<!-- 刷新交易对 -->
		<uni-popup ref="refreshOrderPopup" type="center" :animation="true" @change="changePopup">
			<view class="initPopup">
				<view class="initPopup-wrapper">
					<view class="initPopup-title">温馨提示</view>
					<view class="initPopup-desc">确定刷新当前交易对吗？</view>
					<view class="initPopup-buttonBox">
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--cancel" @click="hidePopup('refreshOrderPopup')">取消</view>
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--confirm" @click="refreshOrder()">确认</view>
					</view>
				</view>
			</view>
		</uni-popup>

		<!-- 确认开仓 -->
		<uni-popup ref="openOrderPopup" type="center" :animation="true" @change="changePopup">
			<view class="initPopup">
				<view class="initPopup-wrapper">
					<view class="initPopup-title">温馨提示</view>
					<view class="initPopup-desc">确定以当前价格对{{ popupInfo.quotaCurrency }}执行开仓吗？</view>
					<view class="initPopup-buttonBox">
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--cancel" @click="hidePopup('openOrderPopup')">取消</view>
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--confirm" @click="openOrder()">确认</view>
					</view>
				</view>
			</view>
		</uni-popup>

		<!-- 手动补仓 -->
		<!-- 样式1-->
		<uni-popup ref="coverUpOrderPopup" type="center" :animation="true" @change="changePopup">
			<view class="initPopup">
				<view class="initPopup-wrapper">
					<view class="initPopup-title">温馨提示</view>
					<view class="initPopup-desc">确定以当前价格对{{ popupInfo.quotaCurrency }}执行补仓吗？</view>
					<view class="initPopup-buttonBox">
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--cancel" @click="hidePopup('coverUpOrderPopup')">取消</view>
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--confirm" @click="coverUpOrder()">确认</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 样式2 -->
		<uni-popup ref="coverUpOrder2Popup" type="bottom" :animation="true" @change="changePopup">
			<view class="coverUpBox">
				<view class="coverUpBox-wrapper">
					<view class="coverUpBox-title">手动补仓</view>
					<view class="coverUpBox-body">
						<view class="coverUpBox-infoBox">
							<view class="coverUpBox-infoBox__item">
								<view class="coverUpBox-infoBox__item-label">交易所：</view>
								<view class="coverUpBox-infoBox__item-data">
									<view class="coverUpBox-infoBox__item-icon"><image :src="popupInfo.bourseLogo" mode="widthFix"></image></view>
									{{ popupInfo.bourseName }}
								</view>
							</view>
							<view class="coverUpBox-infoBox__item">
								<view class="coverUpBox-infoBox__item-label">交易账号：</view>
								<view class="coverUpBox-infoBox__item-data">{{ popupInfo.apiName }}</view>
							</view>
							<view class="coverUpBox-infoBox__item">
								<view class="coverUpBox-infoBox__item-label">币种：</view>
								<view class="coverUpBox-infoBox__item-data">{{ popupInfo.quotaCurrency }}</view>
							</view>
							<view class="coverUpBox-infoBox__item">
								<view class="coverUpBox-infoBox__item-label">当前价格：</view>
								<view class="coverUpBox-infoBox__item-data">{{ popupInfo.baseCurrency }}</view>
							</view>
						</view>

						<view class="coverUpBox-formBox">
							<view class="coverUpBox-formBox__wrapper">
								<view class="coverUpBox-formBox__item">
									<view class="coverUpBox-formBox__item-label">* 补仓数量</view>
									<view class="coverUpBox-formBox__item-list">
										<view class="coverUpBox-formBox__item-input">
											<input type="text" placeholder-class="coverUpBox-formBox__item-placeholder" placeholder="请输入本金数量" v-model="needQuantity" />
										</view>
										<view class="coverUpBox-formBox__item-type">USDT</view>
									</view>
									<view class="coverUpBox-formBox__item-note">当前火币资产可用：94047.476401 USDT</view>
								</view>

								<view class="coverUpBox-formBox__info">
									<view class="coverUpBox-formBox__info-list">
										<view class="coverUpBox-formBox__info-label">折合</view>
										<view class="coverUpBox-formBox__info-data">40.0347EOS</view>
									</view>
								</view>
							</view>
						</view>

						<view class="coverUpBox-btn initButton"><view class="initButton-btn initButton-btn--style" @click="coverUpOrder()">确定</view></view>
					</view>
				</view>
			</view>
		</uni-popup>

		<!-- 确认平仓 -->
		<uni-popup ref="closeOrderPopup" type="center" :animation="true" @change="changePopup">
			<view class="initPopup">
				<view class="initPopup-wrapper">
					<view class="initPopup-title">温馨提示</view>
					<view class="initPopup-desc">确定以当前价格对{{ popupInfo.quotaCurrency }}执行平仓吗？</view>
					<view class="initPopup-buttonBox">
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--cancel" @click="hidePopup('closeOrderPopup')">取消</view>
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--confirm" @click="closeOrder()">确认</view>
					</view>
				</view>
			</view>
		</uni-popup>

		<!-- 确认平仓 -->
		<uni-popup ref="lessMoneyPopup" type="center" :animation="true" @change="changePopup">
			<view class="initPopup">
				<view class="initPopup-wrapper">
					<view class="initPopup-title">点卡不足预警</view>
					<view class="initPopup-desc">您的点卡不足20{{ $store.state.projectCurrencyName }}，请充值以免无法交易</view>
					<view class="initPopup-buttonBox">
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--confirm" @click="hidePopup('lessMoneyPopup')">确认</view>
					</view>
				</view>
			</view>
		</uni-popup>

		<!-- 账户选择 -->
		<w-picker :visible.sync="accountVisible" mode="selector" ref="accountPicker" :options="accountArray" @confirm="onPickerConfirm($event, 'accountPicker')"></w-picker>

		<!-- 账号下的计价货币 -->
		<w-picker
			:visible.sync="bourseAreaVisible"
			mode="selector"
			ref="bourseAreaPicker"
			:options="bourseAreaArray"
			@confirm="onPickerConfirm($event, 'bourseAreaPicker')"
		></w-picker>

		<!-- 账号下的计价货币 -->
		<w-picker
			:visible.sync="bourseTradeVisible"
			mode="selector"
			ref="bourseTradePicker"
			:options="bourseTradeArrayClone"
			@confirm="onPickerConfirm($event, 'bourseTradePicker')"
		></w-picker>

		<!-- 策略模式 -->
		<w-picker
			:visible.sync="strategyModeVisible"
			mode="selector"
			ref="strategyModePicker"
			:options="strategyModeArray"
			@confirm="onPickerConfirm($event, 'strategyModePicker')"
		></w-picker>

		<!-- 选择策略 -->
		<w-picker
			:visible.sync="strategyValueVisible"
			mode="selector"
			ref="strategyValuePicker"
			:options="strategyValueArray"
			@confirm="onPickerConfirm($event, 'strategyValuePicker')"
		></w-picker>
	</view>
</template>

<script>
import webUrl from '@/common/js/url.js';
var url = webUrl.websocketUrl + '/websocket/trade';
export default {
	data() {
		return {
			socketUrl: url,
			socketOpen: false,
			token: '',

			myRobotList: [],
			popupInfo: [],
			assetInfo: [],
			tradeIdsList: [],

			toolsPopupVisible: false,
			dropdownType: null,
			moreType: null,

			needQuantity: '',

			/* 账户列表 - 选择 */
			accountVisible: false,
			accountLabel: '',
			accountVal: null,
			accountId: null,
			accountArray: [],

			/* 账号下的计价货币 - 选择 */
			bourseAreaVisible: false,
			bourseAreaLabel: '',
			bourseAreaVal: null,
			bourseAreaArray: [],

			/* 计价货币下的交易对 - 选择 */
			bourseTradeVisible: false,
			bourseTradeLabel: '',
			bourseTradeVal: null,
			bourseTradeArray: [],
			bourseTradeArrayClone: [],

			/* 策略模式 */
			strategyModeVisible: false,
			strategyModeLabel: '',
			strategyModeVal: null,
			strategyModeArray: [
				{
					label: '智能策略',
					value: 2
				}
			],

			/* 策略模式 - 选择 */
			strategyValueVisible: false,
			strategyValueLabel: '',
			strategyValueVal: null,
			strategyValueArray: [],

			// 分页
			pages: 1, //总页数
			pageNum: 1, //当前页数
			pageSize: 20, //请求记录

			disabledShowTarBar: false
		};
	},
	onReady() {
		this.$setStatusBarStyle();
		this.$setTarBar();
	},
	onShow() {
		uni.showTabBar();
		this.$setStatusBarStyle();
		this.$setTarBar();
		
		this.token = uni.getStorageSync('token');

		this.toolsPopupVisible = null;
		this.dropdownType = null;
		this.moreType = null;

		this.init();

		this.subTradeMessage();
		this.initSocket();
	},
	onHide() {
		uni.closeSocket();
	},
	// onReachBottom() {
	// 	if (this.pageNum >= this.pages) {
	// 		return this.$tools.toast('到底啦');
	// 	} else {
	// 		this.pageNum++;
	// 		this.getNoticeList();
	// 	}
	// },
	methods: {
		init() {
			// this.myRobotList = [];
			this.getApiAssets();
			this.getMyRobotList();
			this.getAccountList();
			// this.checkAmount();
		},
		getApiAssets() {
			this.$Ajax('/front/api/asset', {}, res => {
				// console.log('资产信息：' + JSON.stringify(res));
				if (res.code == 0) {
					this.assetInfo = res.obj;
				}
			});
		},
		getMyRobotList() {
			/* 获取配置的机器人列表 */
			this.$Ajax('/front/utrade/user/list', {}, res => {
				// console.log('获取配置的机器人列表：' + JSON.stringify(res));
				if (res.code == 0) {
					let needData = {};
					res.obj.forEach(item => {
						let obj = item;
						needData['currencyId_' + item.id] = obj;
					});
					this.myRobotList = needData;
				}
			});
		},
		getAccountList() {
			/* 获取账户列表 */
			this.$Ajax('/front/api/bind/list', {}, res => {
				// console.log(JSON.stringify(res));
				if (res.code == 0) {
					if (res.obj.length != 0) {
						this.accountArray = res.obj;
						this.accountArray.forEach(item => {
							item.label = item.name;
							item.value = item.bourseId;
						});
						this.accountLabel = this.accountArray[0].label;
						this.accountVal = this.accountArray[0].value;
						this.accountId = this.accountArray[0].id;
						this.getBourseArea();
					}
				}
			});
		},
		getBourseArea() {
			/* 获取账户下的计价货币 */
			this.$Ajax(
				'/front/bourse/get/area',
				{
					bourseId: this.accountVal
				},
				res => {
					// console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.bourseAreaArray = res.obj;
						this.bourseAreaArray.forEach(item => {
							item.label = item.currency;
							item.value = item.id;
						});
						this.bourseAreaLabel = this.bourseAreaArray[0].label;
						this.bourseAreaVal = this.bourseAreaArray[0].value;
						this.getBourseTrade();
					}
				}
			);
		},
		getBourseTrade() {
			/* 获取计价货币下的交易对 */
			this.$Ajax(
				'/front/bourse/get/trade',
				{
					apiId: this.accountId,
					bourseId: this.accountVal,
					baseCurrency: this.bourseAreaLabel
				},
				res => {
					// console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.bourseTradeArray = res.obj;
						this.bourseTradeArray.forEach(item => {
							item.label = item.quotaCurrency;
							item.value = item.id;
						});
						this.bourseTradeArrayClone = this.bourseTradeArray;
					}
				}
			);
		},
		checkAmount() {
			this.$Ajax('/front/utrade/checkUmAmount', {}, res => {
				// console.log(JSON.stringify(res));
				if (res.code == 0) {
					if (res.obj == -1) {
						this.$nextTick(() => {
							this.$refs['lessMoneyPopup'].open();
						});
					}
				}
			});
		},
		addRobot() {
			/* 添加机器人 */
			let tradeIds = [];
			this.tradeIdsList.forEach((item)=>{
				tradeIds.push(item.value);
			})

			this.$Ajax(
				'/front/utrade/add',
				{
					apiId: this.accountId,
					areaId: this.bourseAreaVal,
					tradeIds: tradeIds
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.$tools.toast('添加成功');
						this.hidePopup('addTradePopup');
						this.getMyRobotList();
					}
				}
			);
		},
		totalStart() {
			/* 全部开始 */
			this.$Ajax('/front/utrade/start/all', {}, res => {
				// console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.$tools.toast('执行成功');
					this.hidePopup('totalStartPopup');
					setTimeout(() => {
						this.getMyRobotList();
					}, 500);
				}
			});
		},
		totalClose() {
			/* 全部平仓 */
			this.$Ajax('/front/utrade/close/all', {}, res => {
				// console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.$tools.toast('执行成功');
					this.hidePopup('totalClosePopup');
					setTimeout(() => {
						this.getMyRobotList();
						this.getApiAssets();
					}, 500);
				}
			});
		},

		getStartegyByCurrency() {
			/* 获取交易对的策略 */
			this.$Ajax(
				'/front/strategy/currency/support',
				{
					quotaCurrency: this.popupInfo.quotaCurrency
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.strategyValueArray = res.obj;

						this.strategyValueArray.forEach(item => {
							item.label = item.strategyName;
							item.value = item.strategyId;
						});

						this.strategyValueVal = this.popupInfo.strategyId;
						this.strategyValueLabel = this.popupInfo.strategyName;
					}
				}
			);
		},
		strategyOrder() {
			/* 修改交易对策略 */
			if (this.needQuantity == '') {
				return this.$tools.toast('请输入本金数量');
			}

			if (this.strategyValueVal == 0) {
				return this.$tools.toast('请选择下单策略');
			}

			this.$Ajax(
				'/front/utrade/modify',
				{
					id: this.popupInfo.id,
					strategyId: this.strategyValueVal,
					money: this.needQuantity
				},
				res => {
					// console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.$tools.toast('修改成功');
						this.hidePopup('strategyOrderPopup');
						this.getMyRobotList();
					}
				}
			);
		},
		toggleStatus() {
			/* 开始/暂停交易对 */
			this.$Ajax(
				'/front/utrade/change/status',
				{
					id: this.popupInfo.id,
					status: this.popupInfo.status == 1 ? 0 : 1 //状态1启动，0暂停
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.$tools.toast('操作成功');
						this.hidePopup('toggleStatusPopup');
						this.getMyRobotList();
					}
				}
			);
		},
		deleteOrder() {
			/* 删除交易对 */
			this.$Ajax(
				'/front/utrade/delete',
				{
					id: this.popupInfo.id
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.$tools.toast('删除成功');
						this.hidePopup('deleteOrderPopup');
						this.getMyRobotList();
					}
				}
			);
		},
		refreshOrder() {
			/* 刷新交易对 */
			this.$Ajax(
				'/front/utrade/refresh',
				{
					id: this.popupInfo.id
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.$tools.toast('刷新成功');
						this.hidePopup('refreshOrderPopup');
						this.getMyRobotList();
					}
				}
			);
		},
		openOrder() {
			/* 交易对开仓 */
			this.$Ajax(
				'/front/utrade/open',
				{
					id: this.popupInfo.id
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.$tools.toast('开仓成功');
						this.hidePopup('openOrderPopup');
						setTimeout(() => {
							this.getMyRobotList();
							this.getApiAssets();
						}, 500);
					}
				}
			);
		},
		coverUpOrder() {
			/* 交易对补仓 */
			this.$Ajax(
				'/front/utrade/isolate',
				{
					id: this.popupInfo.id
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.$tools.toast('补仓成功');
						this.hidePopup('coverUpOrderPopup');
						setTimeout(() => {
							this.getMyRobotList();
							this.getApiAssets();
						}, 500);
					}
				}
			);
		},
		closeOrder() {
			/* 交易对平仓 */
			this.$Ajax(
				'/front/utrade/close',
				{
					id: this.popupInfo.id
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.$tools.toast('平仓成功');
						this.hidePopup('closeOrderPopup');
						setTimeout(() => {
							this.getMyRobotList();
							this.getApiAssets();
						}, 500);
					}
				}
			);
		},

		changeMoreType(index) {
			this.moreType = this.moreType == index ? null : index;
		},
		changeDropdownType(index) {
			this.dropdownType = this.dropdownType == index ? null : index;
		},
		clearData2Popup(popupName, item) {
			if (item) {
				this.popupInfo = item;
			}

			this.toolsPopupVisible = false;
			this.moreType = null;

			if (popupName == 'addTradePopup' && this.accountArray.length == 0) {
				return this.$tools.toast('请先前往绑定API');
			}
			
			if (popupName == 'addTradePopup') {
				this.bourseTradeArrayClone = this.bourseTradeArray;
				this.bourseTradeLabel = this.bourseTradeArray[0].label;
				this.bourseTradeVal = this.bourseTradeArray[0].value;
				this.tradeIdsList = [];
			}

			if (popupName == 'strategyOrderPopup') {
				this.needQuantity = this.popupInfo.money;
				this.getStartegyByCurrency();
			}
			this.disabledShowTarBar = false;
			this.openPopup(popupName);
		},
		openTools2Popup(popupName, item) {
			this.popupInfo = item;
			this.openPopup(popupName);
		},
		hideTools2Popup(popupName) {

			this.disabledShowTarBar = true;
			
			if (popupName == 'strategyOrderPopup') {
				this.needQuantity = this.popupInfo.money;
				this.getStartegyByCurrency();
			}

			this.hidePopup('toolsPopup');
			this.openPopup(popupName);

			setTimeout(() => {
				this.disabledShowTarBar = false;
			}, 300);
		},
		clearData2Path(path) {
			this.toolsPopupVisible = false;
			this.moreType = null;
			this.$tools.jump(path);
		},
		deleteTradeItem(index){
			this.bourseTradeArrayClone.push(this.tradeIdsList[index]);
			this.tradeIdsList.splice(index, 1);
		},

		/* Socket连接 */
		initSocket() {
			var that = this;
			uni.connectSocket({
				url: this.socketUrl
			});
			uni.onSocketOpen(res => {
				this.socketOpen = true;
				console.log('WebSocket连接已打开！');
				this.subTradeMessage();
				// this.setTradeMessage();
			});
			uni.onSocketMessage(res => {
				var message = this.parseJSONorNot(res);
				message = this.parseJSONorNot(message.data);
				message = this.parseJSONorNot(message);
				// console.log(message);

				if (message.code == 1) {
					this.setTradeData(message);
				}
			});
			uni.onSocketError(res => {
				this.socketOpen = false;
				this.initSocket();
			});
			uni.onSocketClose(res => {
				console.log('WebSocket 已关闭！');
				this.unSubTradeMessage();
			});
		},
		setTradeData(data) {
			if (this.myRobotList['currencyId_' + data.obj.id]) {
				this.myRobotList['currencyId_' + data.obj.id].currentPrice = data.obj.price;
				this.myRobotList['currencyId_' + data.obj.id].amount = data.obj.amount;
			}
		},
		subTradeMessage() {
			var sendInfo = {};
			sendInfo.method = 'sub';
			sendInfo.type = 1;
			sendInfo.token = this.token;
			this.sendMessage(JSON.stringify(sendInfo));
		},
		unSubTradeMessage() {
			var sendInfo = {};
			sendInfo.method = 'unsub';
			sendInfo.type = 1;
			sendInfo.token = this.token;
			this.sendMessage(JSON.stringify(sendInfo));
		},
		parseJSONorNot(mayBeJSON) {
			if (typeof mayBeJSON === 'string') {
				return JSON.parse(mayBeJSON);
			} else {
				return mayBeJSON;
			}
		},
		sendMessage(message) {
			if (this.socketOpen) {
				uni.sendSocketMessage({
					data: message
				});
			}
		},

		/* 弹出框公用 */
		openPopup(e, item, disabledShowTarBar) {
			if (item) {
			}
			uni.hideTabBar();
			this.$refs[e].open();
		},
		hidePopup(e) {
			this.$refs[e].close();
		},
		changePopup(e) {
			console.log('popup ' + e.type + ' 状态', e.show);
			if (!e.show && this.disabledShowTarBar == false) {
				uni.showTabBar();
			}
		},

		/* 底部选项卡公用 */
		onPickerConfirm(res, type) {
			console.log('当前控制的Picker是：' + type + ';当前值是' + JSON.stringify(res.obj));

			if (type == 'accountPicker') {
				this.accountLabel = res.obj.label;
				this.accountVal = res.obj.value;
				this.accountId = res.obj.id;
			}

			if (type == 'bourseAreaPicker') {
				this.bourseAreaLabel = res.obj.label;
				this.bourseAreaVal = res.obj.value;
			}

			if (type == 'bourseTradePicker') {
				this.bourseTradeLabel = res.obj.label;
				this.bourseTradeVal = res.obj.value;

				this.bourseTradeArrayClone.forEach((item, key) => {
					if (res.obj.value == item.value) {
						this.tradeIdsList.push(item);
						this.bourseTradeArrayClone.splice(key, 1);
						console.log(this.tradeIdsList);
					}
				});
			}

			if (type == 'strategyValuePicker') {
				this.strategyValueLabel = res.obj.label;
				this.strategyValueVal = res.obj.value;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/quantification';
</style>
