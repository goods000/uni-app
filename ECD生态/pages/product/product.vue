<template>
	<view class="contentBg">
		<view class="header_bar header_bg header_border">
			<view class="header">
				<view class="header-wrapper">
					<view class="header-item" :class="{'header-item--active' : tabsActive == 0}" @click="changeTabs(0)">我的</view>
					<view class="header-item" :class="{'header-item--active' : tabsActive == 1}" @click="changeTabs(1)">收益</view>
				</view>
				<view class="header-right" @click="$tools.jump('./productRecord')">
					<image src="../../static/public/icon-records.png" mode="widthFix"></image>
				</view>
			</view>
		</view> 
		
		<view class="product" v-if="tabsActive == 0">
			<view class="product-image">
				<image src="../../static/product/icon-product-bg.png" mode="widthFix"></image>
			</view>
			
			<view class="initTilte">
				<view class="initTilte-title">选择币种</view><view class="initTilte-tips">：</view>
				
				<view class="initTabs">
					<view class="initTabs-title" v-for="(item,index) in curList" :class="{'initTabs-title--active' : tabTitle == index}" @click="changeTabTitle(index,item.id,item.name)">{{item.name}}</view>
					<!-- <view class="initTabs-title" :class="{'initTabs-title--active' : tabTitle == 1}" @click="changeTabTitle(1)">USDT</view> -->
				</view>
			</view>
			
			<view class="initTilte">
				<view class="initTilte-title">选择币种</view><view class="initTilte-tips">规则</view>
			</view>
			
			<view class="product-table">
				<view class="product-table__item">
					<view class="product-table__box">周期</view>
					<view class="product-table__box">利息</view>
				</view>
				<view class="product-table__item" v-for="(item,index) in ruleList" :key="index">
					<view class="product-table__box">{{item.fclCycle}}天</view>
					<view class="product-table__box product-table__box--big">{{item.interest}}%</view>
				</view>
			</view>
			
			<view class="initTilte">
				<view class="initTilte-title">选择理财</view><view class="initTilte-tips">周期</view>
			</view>
			
			<view class="product-checkboxBox">
				<view class="product-wrapper">
					<view class="product-chioce" v-for="(item,index) in ruleList" :key="index"  @click="agreement(index,item.id,item.version)">
						<label class="product-chioce__box" :class="[item.version ? 'product-chioce__box--active' : '']">
							<!-- <view class="checkbox" ></view> -->
						</label>
						<view class="product-chioce__title">{{item.fclCycle}}</view>
						<view class="product-chioce__company">天</view>
					</view>
				</view>
				<view class="initButton">
					<view class="initButton-btn initButton-btn--style" @click="Deposit()">立即存入</view>
				</view>
			</view>
		</view>
		
		<view class="product" v-if="tabsActive == 1">
			<view class="profit">
				<view class="profit-wrapper">
					<view class="profit-wrapper__see">
						<image :src="eyeType ? '../../static/product/icon-product-see.png' : '../../static/product/icon-roduct-nosee.png'" @click="toggleAssetsInfo()"  mode="widthFix"></image>
					</view>
					<view class="profit-wrapper__title" @click="open()">
						<text>{{currencyName}}</text>持币总量
						<image src="../../static/public/icon-select-white.png" :class="navigateFlag ? 'profit-wrapper__title--active' : ''" mode=""></image>
					</view>
					<view class="profit-wrapper__sum">{{ eyeType ? asset.total : '***' | number(4) }}</view>
					<view class="profit-wrapper__item">
						<view class="profit-wrapper__item-box">
							<view class="profit-wrapper__item-box--title">累计收益({{currencyName}})</view>
							<view class="profit-wrapper__item-box--num">{{ eyeType ? asset.accEarnings : '***' | number(4) }}</view>
						</view>
						<view class="profit-wrapper__item-box">
							<view class="profit-wrapper__item-box--title">存入数量({{currencyName}})</view>
							<view class="profit-wrapper__item-box--num">{{ eyeType ? asset.quantity : '***' | number(4) }}</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="initTilte initTilte--mt">
				<view class="initTilte-title">收益发放</view><view class="initTilte-tips">明细</view>
			</view>
			
			<view class="profit-list">
				<view class="profit-list__box">
					<view class="initNoData" v-if="recordList.length == 0"></view>
					<scroll-view scroll-y="true" class="profit-list__height" @scrolltolower="newsListLower" v-else>
					<view class="profit-list__box-item" v-for="(tab,index1) in recordList" :key="index1">
						<view class="profit-list__box-item-time">{{ eyeType ? tab.createTime : '***'}}</view>
						<view class="profit-list__box-item-price">{{ eyeType ? tab.money : '***'}} {{tab.currencyName}}</view>
					</view>
					</scroll-view>
				</view>
			</view>
			
		</view>
		
		<!-- 产品弹出框 -->
		<uni-popup ref="numPopup" type="center" :animation="true" @change="changePopup">
			<view class="initPopup">
				<view class="initPopup-wrapper">
					<view class="initPopup-headerTitle">理财存入</view>
					<view class="initPopup-body">
						<view class="initPopup-listBox">
							<view class="initPopup-listBox__list">
								<view class="initPopup-listBox__list-label">请输入您需要存入的数量:</view>
								<view class="initPopup-listBox__list-input">
									<input type="text" placeholder="请输入数量..." placeholder-class="initPopup-listBox__list-input--class" v-model="quantity"/>
								</view>
								<view class="initPopup-listBox__list-using">
									<image src=".../../static/public/icon-tips.png" mode="widthFix" class="initPopup-listBox__list-using__image"></image>
									<view class="initPopup-listBox__list-using__balance">可用数量：{{using}} {{selectType}}</view>
								</view>
							</view>
						</view>
					</view>
					<view class="initPopup-buttonBox">
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--cancel" @click="hidePopup('numPopup');">取消</view>
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--confirm" @click="next()">下一步</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 密码弹出框 -->
		<uni-popup ref="psdPopup" type="center" :animation="true" @change="changePopup">
			<view class="initPopup">
				<view class="initPopup-wrapper">
					<view class="initPopup-headerTitle">交易密码</view>
					<view class="initPopup-body">
						<view class="initPopup-listBox">
							<view class="initPopup-listBox__list">
								<view class="initPopup-listBox__list-label">请输入您的交易密码:</view>
								<view class="initPopup-listBox__list-input">
									<input type="password" placeholder="请输入您的交易密码" placeholder-class="initPopup-listBox__list-input--class" v-model="tradePwd"/>
								</view>
							</view>
						</view>
					</view>
					<view class="initPopup-buttonBox">
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--cancel" @click="hidePopup('psdPopup');">取消</view>
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--confirm" @click="submit()">确定</view>
					</view>
				</view>
			</view>
		</uni-popup>
		
		<!-- 币种选项 -->
		<uni-popup ref="securityPopup" type="bottom" :animation="true">
			<view class="initPopup">
				<view class="initBox">
					<!-- <view class="initBox-form" @click="selectType = 'CNDT';hidePopup('securityPopup');uni.showTabBar();"> -->
					<view class="initBox-form"v-for="(item,index) in curList" :key="index" @click="close(item.id,item.name)">
						<view class="initBox-form__label">{{item.name}}</view>
					</view>
					<!-- <view class="initBox-form" @click="close(2)">
						<view class="initBox-form__label">USDT</view>
					</view> -->
					<view class="initBox-form" @click="closePopup()">
						<view class="initBox-form__label">取 消</view>
					</view>
				</view>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	export default {
			data(){
				return{
					tabsActive: 0,
					tabTitle: 0,
					ruleList:[
						{fclCycle:'7',interest:'50%',flag:0},{fclCycle:'14',interest:'55%',flag:0},{fclCycle:'30',interest:'60%',flag:0},{fclCycle:'90',interest:'65%',flag:0},{fclCycle:'180',interest:'70%',flag:0},
						{fclCycle:'365',interest:'75%',flag:0},
					],
					isActive:0,
					recordList:[
						{createTime:'2021.07.22 10:24 ',money:'20.0413'}
					],
					eyeType: true,
					selectType:'',
					// 页数
					pageSize: 20,
					pageNum: 1,
					pages: 0,
					navigateFlag: false,
					curList:[],
					currencyId:'',
					currencyName:'',
					fclId:'',
					quantity:'',
					tradePwd:'',
					assetsList:[],
					using:0,
					asset:{},
				}
			},
			onLoad() {
				var eyeType = uni.getStorageSync('eyeType');
				if (eyeType == '' || eyeType == null || eyeType == undefined) {
					uni.setStorageSync('eyeType', true);
				}
			},
			onShow() {
				this.init();
				this.tabsActive = 0;
				this.navigateFlag = false;
				this.quantity = '';
				this.tradePwd = '';
			},
			methods: {
				init(){
					this.pageNum = 0;
					this.curList = [];
					this.getFinancialCurList(); 	// 理财相关[理财币种列表]
					// this.getUserFinancialDetail(); // 理财相关[理财收益记录]
					// this.getUserList();
				},
				// 理财相关[理财币种列表]
				getAssets() {
					this.$Ajax('/front/financial/assetsByCurrency', {
						assetType:1,
						currencyId:this.currencyId
					}, res => {
						if (res.code == 0) {
							this.assetsList = res.obj;
							this.using = res.obj.wallet.using;
						}
					});
				},
				// 理财相关[理财规则列表]
				getFinancialRuleList() {
					this.$Ajax('/front/regular/getFinancialRuleList', {
						currencyId: this.currencyId,
					}, res => {
						if (res.code == 0) {
							this.ruleList = res.obj;
						}
					});
				},
				// 理财相关[理财币种列表]
				getFinancialCurList() {
					this.$Ajax('/front/regular/getFinancialCurList', {}, res => {
						if (res.code == 0) {
							this.curList = res.obj;
							if(this.currencyId == ''){
								this.currencyId = this.curList[0].id;
							}
							if(this.selectType == ''){
								this.selectType = this.curList[0].name;
							}
							console.log("this.currencyId",this.currencyId,"this.selectType",this.selectType);
							this.getAssets();
							this.getFinancialRuleList();   // 理财相关[理财规则列表]
						}
					});
				},
				Deposit(){
					// console.log("理财周期---",this.fclId);
					if(this.fclId == ''){
						return this.$tools.toast('请选择理财周期');
					}
					this.openPopup('numPopup');
				},
				next(){
					if(this.quantity == ''){
						return this.$tools.toast('请输入数量');
					}
					if (!/^[1-9]\d*$/.test(this.quantity)) {
						return this.$tools.toast('请输入整数数量');
					}
					this.hidePopup('numPopup');
					this.openPopup('psdPopup');
				},
				submit(){
					if(this.tradePwd == ''){
						return this.$tools.toast('请输入您的交易密码');
					}
					this.$Ajax('/front/regular/financailPay',{
							currencyId: this.currencyId,
							fclId: this.fclId,
							quantity: this.quantity,
							tradePwd: this.tradePwd
						},
						res => {
							console.log(JSON.stringify(res));
							if (res.code == 0) {
								this.$tools.toast('收取成功');
								this.quantity = '';
								this.tradePwd = '';
								uni.showTabBar();
								this.hidePopup('psdPopup');
							}
						}
					);
				},
				open(){
					this.navigateFlag = true;
					console.log('打开了');
					this.openPopup('securityPopup');uni.hideTabBar();
				},
				close(currencyId,currencyName){
					this.navigateFlag = false;
					this.currencyId = currencyId;
					this.currencyName = currencyName;
					this.getAssets();
					this.getUserFinancialDetail();
					this.pageNum = 1;
					this.recordList = [];
					this.getList();
					this.hidePopup('securityPopup');uni.showTabBar();
				},
				closePopup(){
					this.navigateFlag = false;
					this.hidePopup('securityPopup');uni.showTabBar();
				},
				// 理财相关[理财收益记录]
				getUserFinancialDetail() {
					this.$Ajax('/front/regular/getUserFinancialDetail', {
						currencyId: this.currencyId,
					}, res => {
						if (res.code == 0) {
							this.asset = res.obj;
						}
					});
				},
				// 理财相关[收益发放明细]
				getLogType() {
					this.$Ajax('/front/financial/getLogType', {
						assetType: 1,
					}, res => {
							if (res.code == 0) {
								res.obj.forEach((item,index) => {
									if(item == "理财收益"){
										
									}
								})
							}
						}
					);
				},
				getList() {
					this.$Ajax('/front/financial/getLog', {
						pageSize: this.pageSize,
						pageNum: this.pageNum,
						assetType: this.currencyId,
					}, res => {
							if (res.code == 0) {
								this.pages = res.obj.pages;
								console.log("this.currencyName ",this.currencyName )
								res.obj.list.forEach((item,index) => {
									if(this.currencyName == "USDT"){
										if(item.typeStr == "理财收益" && item.currencyName == "USDT"){
											this.recordList = this.recordList.concat(item);
											// console.log("USDTrecordList",this.recordList);
										}
									}else if(this.currencyName == "CNDT"){
										if(item.typeStr == "理财收益" && item.currencyName == "CNDT"){
											this.recordList = this.recordList.concat(item);
											// console.log("CNDTrecordList",this.recordList);
										}
									}
								})
							}
						}
					);
				},
				newsListLower(e) {
					if (this.pageNum >= this.pages) {
						return this.$tools.toast('到底了');
					} else {
						this.pageNum++;
						this.getList();
					}
				},
				agreement(i,fclId,version){
					this.ruleList.filter((item,j) => {
						if(i == j){
							item.version = !item.version;
							if(item.version == false){
								this.fclId = '';
							}else{
								this.fclId = fclId;
							}
						}else{
							item.version = 0;
							this.fclId == '';
						}
					})
				},
				changeTabs(index){
					this.recordList = [];
					if(this.tabsActive != index){
						this.tabsActive = index;
						this.tabTitle = 0;
						this.currencyId = this.curList[0].id;
						this.selectType = this.curList[0].name;
						this.currencyName = this.curList[0].name;
						this.getAssets();
						this.getUserFinancialDetail();
						// this.pageNum = 0;
						// this.curList = [];
						this.getList();
					}
				},
				changeTabTitle(index,currencyId,selectType){
					if(this.tabTitle != index){
						this.tabTitle = index;
						this.currencyId = currencyId;
						this.selectType = selectType;
						this.getAssets();
						this.getFinancialRuleList();
					}
				},
				toggleAssetsInfo() {
					var eyeType = uni.getStorageSync('eyeType');
					if (eyeType) {
						uni.setStorageSync('eyeType', false);
						this.eyeType = false;
					} else {
						uni.setStorageSync('eyeType', true);
						this.eyeType = true;
					}
				},
				/* 弹出框公用 */
				openPopup(e, item) {
					this.popupInfo = item;
					this.$refs[e].open();
				},
				hidePopup(e) {
					this.$refs[e].close();
				},
				changePopup(e) {
					// console.log('popup ' + e.type + ' 状态', e.show);
					if (e.show) {
						uni.hideTabBar();
					} else {
						uni.showTabBar();
					}
				}
			},
		}
	</script>

<style lang="scss" scoped>
	@import '/scss/product';
</style>
