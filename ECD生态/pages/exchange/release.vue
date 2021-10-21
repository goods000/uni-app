<template>
	<view class="pages">
		<view class="header_bar header_fixed header_bg">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">发布生态需求</view>
				<view class="header-right" @click="$tools.jump('./releaseRecord')">
					<image src="../../static/public/icon-records.png" mode="widthFix"></image>
				</view>
			</view> 
		</view> 
		<view class="record">
			<view class="initTabs">
				<view class="initTabs-title" :class="{'initTabs-title--active' : tabTitle == 1}" @click="changeTabTitle(1)">提供单发布</view>
				<view class="initTabs-title" :class="{'initTabs-title--active' : tabTitle == 0}" @click="changeTabTitle(0)">收取单发布</view>
			</view>
			
			<view class="release">
				<view class="safety-list">
					<view class="release-listItem">
						<view class="release-listItem-picker">
							<picker @change="bindPickerChange" :value="id" :range="pickerValueArray" range-key="currencyName">
								<view class="uni-input">{{ currencyName }}</view>
							</picker>
						</view>
					</view> 
				</view> 
				<view class="safety-list">
					<view class="safety-list-title">交易数量</view>
					<view class="safety-list-input">
						<input type="text" placeholder="请输入交易数量" placeholder-style="color:#999999" v-model="num" />
						<view class="safety-list-input__fixedBox">{{currencyName}}</view>
					</view>
				</view>
				<view class="safety-list">
					<view class="safety-list-title">交易价格</view>
					<view class="safety-list-input">
						<input type="text" placeholder="请输入交易价格" placeholder-style="color:#999999" v-model="price" />
						<view class="safety-list-input__fixedBox">{{currencyName}}</view>
					</view>
				</view>
				<view class="releaseBox">
					<view class="releaseBox-title">当前价格</view>
					<view class="releaseBox-title">{{ unit_Price }}CNY / 1{{currencyName}}</view>
				</view>
			</view>
			
			<view class="releaseMian">
				<view class="initTilte">
					<view class="initTilte-title">支付方</view><view class="initTilte-tips">式</view>
				</view>
				<view class="releaseMian-ways">
					<view class="releaseMian-ways__txtNo" v-if="paymentList.length == 0">未设置收款方式</view>
					<view v-for="(item, index) in paymentList" :key="index" class="releaseMian-ways__forBox">
						<view class="releaseMian-ways__item" @click="changeWays(index)"
						:class="{'releaseMian-ways__item--active' : item.checked == 1}">
							<image v-if="item.payType == 1 " :src="item.checked == 1 ? '../../static/public/icon-bank-show.png' : '../../static/public/icon-bank-hide.png'" mode=""></image>
							<image v-if="item.payType == 2 " :src="item.checked == 1 ? '../../static/public/icon-alipay-show.png' : '../../static/public/icon-alipay-hide.png'" mode=""></image>
							<image v-if="item.payType == 3 " :src="item.checked == 1 ? '../../static/public/icon-wechat-show.png' : '../../static/public/icon-wechat-hide.png'" mode=""></image>
							<view v-if="item.payType == 1" class="releaseMian-ways__item-title" :class="{'releaseMian-ways__item-title--active' : item.checked == 1 }">银行卡</view>
							<view v-if="item.payType == 2" class="releaseMian-ways__item-title" :class="{'releaseMian-ways__item-title--active' : item.checked == 1 }">支付宝</view>
							<view v-if="item.payType == 3" class="releaseMian-ways__item-title" :class="{'releaseMian-ways__item-title--active' : item.checked == 1 }">微信</view>
						</view>
					</view>
				</view>
			</view>
			<view class="releaseMian">
				<view class="initTilte">
					<view class="initTilte-title">注意</view><view class="initTilte-tips">事项</view>
				</view>
				<view class="releaseMian-tipsBox">
					<view class="releaseMian-tipsBox__tips">1.请务核实收款信息，以免造成财产损失。</view>
					<view class="releaseMian-tipsBox__tips">2.请核实款项来源及转账备注，以免冻结。</view>
				</view>
			</view>
		</view>
		
		<view class="initBtn" @click="next()">发布</view>
		
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				num:'',
				tabTitle: 1,
				// ways:0,
				paymentList:[],
				paymentActiveList: { yhk: false, zfb: false, wx: false },
				currencyId:'',
				price:'',
				currencyName:'',
				tradePwd:'',
				unit_Price:'',
				pickerValueArray:[],
				index:'',
				id:'',
			}
		},
		onShow() {
			this.init();
		},
		methods:{
			init() {
				this.getOTCList();
				this.getPayList();
			},
			// 支付方式
			getPayList() {
				let that = this;
				this.$Ajax('/front/otc/publishPay', {}, res => {
					if (res.code == 0) {
						this.paymentList = res.obj;
						this.paymentList.forEach((item, index) => {
							that.$set(item, 'checked', false);
						});
					}
				});
			},
			next(){
				let that =this;
				console.log(" that.tabTitle", that.tabTitle)
				if(that.num == ''){
					return that.$tools.toast('请输入交易数量');
				}
				if(that.price == ''){
					return that.$tools.toast('请输入交易价格');
				}
				if(!/^\d+(\.\d{1,2})?$/.test(that.price)){
					return that.$tools.toast('小数位只能保留两位');
				}
				console.log(that.paymentActiveList)
				if(that.paymentActiveList.yhk == false && that.paymentActiveList.zfb == false && that.paymentActiveList.wx == false){
					return that.$tools.toast('请选择支付方式');
				}
				that.openPopup('psdPopup');
			},
			submit(){
				let that =this;
				if(that.tradePwd == ''){
					return that.$tools.toast('请输入交易密码');
				}
				that.$Ajax('/front/otc/publish', {
					configId:that.currencyId,
					price: that.price,
					quantity: that.num,
					wx: that.paymentActiveList.wx ? '1' : '0',
					zfb: that.paymentActiveList.zfb ? '1' : '0',
					yhk: that.paymentActiveList.yhk ? '1' : '0',
					type: that.tabTitle,
					min: 1,
					max: 100000,
					remark: '',
					code: '',
					tradePassword: that.tradePwd,
				}, res => {
					if (res.code == 0) {
						that.num ='',
						that.price ='',
						that.min ='',
						that.max ='',
						that.remarks ='',
						that.tradePwd ='',
						that.paymentActiveList.yhk = false,
						that.paymentActiveList.zfb = false,
						that.paymentActiveList.wx = false,
						that.hidePopup('psdPopup');
						that.$tools.toast(res.msg);
					}
				});
			},
			changeTabTitle(index){
				if(this.tabTitle != index){
					this.tabTitle = index;
				}
			},
			changeWays(index){
				console.log("this.paymentList",this.paymentList);
				this.paymentList[index].checked = !this.paymentList[index].checked;
				if (this.paymentList[index].payType == 3) {
					if (this.paymentList[index].checked) {
						this.paymentActiveList.wx = true;
					} else {
						this.paymentActiveList.wx = false;
					}
				}
				if (this.paymentList[index].payType == 2) {
					if (this.paymentList[index].checked) {
						this.paymentActiveList.zfb = true;
					} else {
						this.paymentActiveList.zfb = false;
					}
				}
				if (this.paymentList[index].payType == 1) {
					if (this.paymentList[index].checked) {
						this.paymentActiveList.yhk = true;
					} else {
						this.paymentActiveList.yhk = false;
					}
				}
				console.log('微信' + this.paymentActiveList.wx + '---' + '支付宝' + this.paymentActiveList.zfb + '---' + '银联' + this.paymentActiveList.yhk);
				// if(this.ways != index){
				// 	this.ways = index;
				// }
			},
			getOTCList() {
				this.$Ajax('/front/otc/init', {}, res => {
					if (res.code == 0) {
						this.pickerValueArray = res.obj;
						this.pickerValueArray.forEach((item, index) => {
							item.label = item.currencyName;
						});
						this.currencyId = this.pickerValueArray[0].id;
						this.unit_Price = this.pickerValueArray[0].price;
						this.currencyName = this.pickerValueArray[0].currencyName;
					}
				});
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + this.pickerValueArray[e.detail.value].id +';当前值是' + this.pickerValueArray[e.detail.value].currencyName)
				this.index = e.detail.value
				this.currencyId = this.pickerValueArray[e.detail.value].id
				this.unit_Price = this.pickerValueArray[e.detail.value].price
				this.currencyName = this.pickerValueArray[e.detail.value].currencyName
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
				console.log('popup ' + e.type + ' 状态', e.show);
				if (e.show) {
					uni.hideTabBar();
				} else {
					uni.showTabBar();
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '/scss/release';
	@import '../safety/scss/safety';
</style>
