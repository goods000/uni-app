<template>
	<view class="pages content">
		<view class="product">
			<view class="header_bar header_fixed header_main">
				<view class="header">
					<view class="header-tabs">
						<view class="header-tabs__title">创投</view>
					</view>
					<!-- <view class="header-right" @click="$tools.noOpen()"> -->
					<view class="header-right" @click="$tools.jump('./vipRecharge')">
						<image src="../../static/product/icon-information.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			
			<view class="productBox">
				<view class="productBox-list">
					<view class="initNoData" v-if="PowerList.length == 0">暂无数据</view>
					<view class="productBox-list-item" v-for="(item,index) in PowerList" :key="index" v-else>
					<!-- @click="$tools.noOpen()" v-else> -->
						<view class="tipsBox">
							<view class="tipsBox-wrapper">
								<view class="tipsBox-title">
									<view class="tipsBox-title__label">{{item.name}} (第{{item.periodical}}期)</view>
								</view>
							</view>
							<view class="productBox-list-status-image">
								<view class="productBox-list-status--end" v-if="item.status == 0">未开始</view>
								<view class="productBox-list-status--active" v-if="item.status == 1">进行中</view>
								<view class="productBox-list-status--end" v-if="item.status == 2">已完成</view>
								<view class="productBox-list-status--end" v-if="item.status == 3">已失败</view>
							</view>
						</view>
						<view class="productBox-list-status">
						</view>
						<view class="productBox-list-data">
							<view class="productBox-list-data-title">
								<image src="../../static/product/icon-tips.png" mode="widthFix" class="productBox-list-data-image"></image>
								创投总额
							</view>
							<view class="productBox-list-data-price">{{item.totalSum | number(2) }}{{item.typeStr}}</view>
						</view>
						<view class="productBox-list-data">
							<view class="productBox-list-data-title">
								<image src="../../static/product/icon-tips.png" mode="widthFix" class="productBox-list-data-image"></image>
								创投限额
							</view>
							<!-- <view class="productBox-list-data-price yellow">{{item.singeMoney * usdtcny | number(2) }}CNY/{{item.singeMoney | number(4) }}USDT</view> -->
							<view class="productBox-list-data-price yellow">{{item.quotaMin }}~{{item.quotaMax}}{{item.typeStr}}</view>
						</view>
						<view class="productBox-list-data">
							<view class="productBox-list-data-title">
								<image src="../../static/product/icon-tips.png" mode="widthFix" class="productBox-list-data-image"></image>
								燃烧LM
							</view>
							<view class="productBox-list-data-price">{{ventureLmFee}}%</view>
						</view>
						<view class="productBox-list-data">
							<view class="productBox-list-data-title">
								<image src="../../static/product/icon-tips.png" mode="widthFix" class="productBox-list-data-image"></image>
								开始时间
							</view>
							<view class="productBox-list-data-price">{{item.startTime}}</view>
						</view>
						<view class="productBox-list-data">
							<view class="productBox-list-data-title">
								<image src="../../static/product/icon-tips.png" mode="widthFix" class="productBox-list-data-image"></image>
								结束时间
							</view>
							<view class="productBox-list-data-price">{{item.endTime}}</view>
						</view>
						<view class="productBox-list-data">
							<view class="productBox-list-data-title">
								<image src="../../static/product/icon-tips.png" mode="widthFix" class="productBox-list-data-image"></image>
								倒计时
							</view>
							<view class="productBox-list-data-price" :class="{'yellow' : item.dayTime != '0天00小时00分钟00秒'}">{{item.dayTime}}</view>
						</view>
						<!-- <view class="productBox-list-data">
							<view class="productBox-list-data-title">
								<image src="../../static/product/icon-tips.png" mode="widthFix" class="productBox-list-data-image"></image>
								每期收益
							</view>
							<view class="productBox-list-data-price">{{item.periodical}}%</view>
						</view> -->
						<view class="productBox-list-data">
							<view class="productBox-list-data-title">
								<image src="../../static/product/icon-tips.png" mode="widthFix" class="productBox-list-data-image"></image>
								已完成/未完成
							</view>
						</view>
						<view class="productBox-list-content">
							<view class="productBox-list-content__chart">
								<view class="productBox-list-content__chart-line" :style="{ width: (((item.totalSum - item.surplus) / item.totalSum) *100) + '%' }"></view>
							</view>
						</view>
						<!-- <view class="productBox-list-data">
							<view class="productBox-list-data-title">
								<view class="productBox-list-data-price yellow">{{ item.surplus }}{{item.typeStr}}</view>
								<view class="productBox-list-data-price">/{{item.totalSum}}{{item.typeStr}}</view>
							</view>
							<view class="productBox-list-data-price">{{(( (item.totalSum - item.surplus) / item.totalSum) * 100) | number(2)}}%</view>
						</view> -->
						<view class="productBox-btn productBox-btn--active" v-if="item.status == 1"
						@click="$tools.jump('../venture/ventureDetails',item.id,ventureLmFee,item.currencyId,item.typeStr)">我要参与</view>
						<view class="productBox-btn" v-else>我要参与</view>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				recordTabsActive: 0,
				PowerList:[
					// {id:1,name:'创投5期：1 天 20 小时 56 分 48 秒',singeTb:'142',singeMoney:'450',contractDays:'20',startTime:'10',surplusNum:90,count:100},
					// {id:2,name:'创投4期：0 天 0 小时 0 分 0 秒',singeTb:'1',singeMoney:'450',contractDays:'20',startTime:'10',surplusNum:0,count:100},
				],
				// 页数
				pageSize: 20,
				pageNum: 1,
				pages: 0,
				usdtcny:'',
				ventureLmFee:'',
				time:'',
			}
		},
		onShow() {
			this.init();
			this.recordTabsActive == 0;
			this.timer();
		},
		onReachBottom() {
			if (this.pageNum >= this.pages) {
				return this.$tools.toast('到底啦');
			} else {
				this.pageNum++;
				this.getIPFSData();
			}
		},
		methods:{
			init(){
				this.recordTabsActive == 0;
				this.PowerList = [];
				this.getVentureLmFee();
				this.getIPFSData();
			},
			//获取运算力信息
			getVentureLmFee() {
				this.$Ajax('/front/venture/getVentureLmFee', {}, res => {
						if (res.code == 0) {
							this.ventureLmFee = res.obj;
						}
					}
				);
			},
			//获取运算力信息
			getIPFSData() {
				this.$Ajax('/front/venture/getVentureData', {
					// status: 0,
					pageSize: this.pageSize,
					pageNum: this.pageNum,
				}, res => {
						if (res.code == 0) {
							// console.log(JSON.stringify(res.obj))
							this.pages = res.obj.pages;
							this.PowerList = this.PowerList.concat(res.obj.list);
						}
					}
				);
			},
			timer() {
	　　　　　　//页面多个定时器 //主要逻辑都在这页面更新
	　　　　　　let _that = this;
	　　　　　　this.temp = setInterval(() => {
	　　　　　　　　this.PowerList.forEach((item, index) => {
	　　　　　　　　　　item.dayTime = _that.countDownFun(item.endTime);
					// console.log(item.dayTime)
	　　　　　　　　　　this.$set(this.PowerList, item.dayTime, _that.countDownFun(item.endTime));
	// 　　　　　　　	　console.log(this.temp, "6");
	　　　　　　　　});
	　　　　　　}, 1000);
	　　　　},
			// 倒计时函数
			 //时间倒计时函数，第一个值传id名字，第二个值传结束的时间
			countDownFun(endDateStr) {
				let _that = this;
				//结束时间
				var endDate = new Date(endDateStr);
				//当前时间
				var nowDate = new Date();
				//相差的总秒数
				var totalSeconds = parseInt((endDate - nowDate) / 1000);
				//天数
				var days = Math.floor(totalSeconds / (60 * 60 * 24));
				//取模（余数）
				var modulo = totalSeconds % (60 * 60 * 24);
				//小时数
				var hours = Math.floor(modulo / (60 * 60));
				modulo = modulo % (60 * 60);
				//分钟
				var minutes = Math.floor(modulo / 60);
				//秒
				var seconds = modulo % 60;
				//输出到页面
				// console.log("距离结束还有" + days + "天"+ hours + "小时"+ minutes + "分钟"+ seconds + "秒")
				if(days+hours+minutes+seconds <= 0){
					// console.log('已到时间',days+hours+minutes+seconds);
					// _that.dayTime = "00:00:00";
					_that.time = days+hours+minutes+seconds;
					_that.dayTime = "0天00小时00分钟00秒";
					return _that.dayTime;
				}else{
					_that.dayTime = days.toString().padStart(2, '0') + "天"+ hours.toString().padStart(2, '0') + "小时"+ minutes.toString().padStart(2, '0') + "分钟"+ seconds.toString().padStart(2, '0') + "秒";
					return _that.dayTime;
					//延迟一秒执行自己
					setTimeout(function () {
						_that.countDownFun(endDateStr);
					}, 1000)
				}
			}
			// countDownFun(time) {
			// 	time=time*1000;
			// 　　let nowTime = new Date().getTime(); //现在时间
			// 	let timediff = Math.floor((time - nowTime) / 1000); //时间
			// 	// console.log("nowTime:"+nowTime+"endTime:"+time+",timediff:"+timediff)
			// 	time--; //时间一秒秒的减
			// 　　if (timediff>0) {
			// 　　　　 var minute, hour, day, second;
			// 		var  day = Math.floor(timediff / 60 / 60 / 24) < 10 ? '0' + Math.floor(timediff / 60 / 60 / 24) : Math.floor(timediff / 60 / 60 / 24);
			// 		var  hour = Math.floor(timediff / 60 / 60 % 24) < 10 ? '0' + Math.floor(timediff / 60 / 60 % 24) : Math.floor(timediff / 60 / 60 % 24);
			// 		var  minute = Math.floor(timediff / 60 % 60) < 10 ? '0' + Math.floor(timediff / 60 % 60) : Math.floor(timediff / 60 % 60);
			// 		var  second = Math.floor(timediff % 60) < 10 ? '0' + Math.floor(timediff % 60) : Math.floor(timediff % 60);
			// 		// console.log("str:"+day + "天" + hour + "小时" + minute + "分" + second + "秒")
			// 　　		return day + "天" + hour + "小时" + minute + "分" + second + "秒";
			// 　　} else {
			// 　　　　return "00天00小时00分00秒";
			// 　　}
			// }
		},
		onHide() {
			//切记页面销毁需要销毁
	　　　　clearInterval(this.temp);
	　　　　console.log(this.temp, "销毁");
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/venture/venture';
	.header{
		padding: 3% 30upx;
	}
</style>
