<template>
	<view class="container">
		<view class="initHeader initHeader--bgWhite initHeader--fixed initHeader--black">
			<view class="initHeader-wrapper"><view class="initHeader-title">跟单</view></view>
		</view>
		<view class="info">
			<view class="Choice-box">
				<view class="title">跟单账户</view>
				<view class="select" @tap="showSelectAC">
					<view class="txt">
						<text class="name">{{ currentAC }}</text>
						<text class="txt-b">{{ subscription }}</text>
					</view>
					<view class="imgBox">
						<image v-if="mt4Id != ''" class="bourse" :src="bourseLogo" mode=""></image>
						<image src="/static/follow/arrowsRight.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="traders">
				<view class="header">交易员</view>
				<view class="userImg">
					<image :src="userImg" mode=""></image>
					<view class="message">
						<text class="name">{{ userName }}</text>
						<!-- <text class="news">{{currencyName}}</text> -->
					</view>
					<view class="imgBox">{{ currencyName }}</view>
				</view>
			</view>
			<view class="direction">
				<view class="head">跟单方向</view>
				<view class="box">
					<view
						class="item-box uni-border-radius"
						v-for="(item, index) in hyList"
						:key="index"
						:class="[{ active: currencyACId == item.id }, pixelClass]"
						@tap="changeHy(item.id)"
					>
						<image :src="currencyACId == item.id ? item.src + '1.png' : item.src + '.png'" mode=""></image>
						<text class="tit">{{ item.name }}</text>
						<text class="txt">{{ item.tit }}</text>
					</view>
				</view>
			</view>
			<view class="type">
				<view class="inputs">
					<view class="head">按比例</view>
					<view class="site uni-border-b">
						<input @input="changInput" v-model="num" type="digit" value="" placeholder="0.5" placeholder-style="color:#DDDEE2;font-family:DINS;" />
						<view class="scan">倍</view>
					</view>
					<view class="text">假如您设置为0.5倍比例跟单，交易员下单10USDT，那么您的 下单数是 10x0.5 = 5USDT</view>
				</view>
			</view>
			<view class="type">
				<view class="inputs2">
					<view class="head">止盈金额</view>
					<view class="site uni-border-b">
						<input v-model="zynum" type="digit" value="" placeholder="输入止盈金额" placeholder-style="color:#DDDEE2;font-family:DINS;" />
					</view>
				</view>
			</view>
			<view class="type">
				<view class="inputs2">
					<view class="head">止损金额</view>
					<view class="site uni-border-b">
						<input v-model="zsnum" type="digit" value="" placeholder="输入止损金额" placeholder-style="color:#DDDEE2;font-family:DINS;" />
					</view>
				</view>
			</view>
			<view class="submit" v-if="followstatus == 0"><button @tap="follow" type="primary">跟单</button></view>
			<view class="submit" v-if="followstatus == 1"><button @tap="changefollow" type="primary">修改跟单</button></view>
			<view class="submit" v-if="followstatus == 1"><button @tap="canclefollow" type="primary">取消跟单</button></view>
			<view class="agreement">
				跟单有风险，确定跟单表示您同意
				<text @tap="followagreement">跟单协议</text>
			</view>
		</view>
		<!-- 选择账户 -->
		<view v-if="isSelectAC" @touchmove.stop.prevent="moveHandle" class="selectAC">
			<view class="uni-mask" @tap="hideSelectAC"></view>
			<view class="inner">
				<view class="tit">选择账户</view>
				<view v-if="acList.length == 0" class="noAC">
					<view class="top">无账户</view>
					<view class="bind">
						<text>您还没未绑定交易账户</text>
						<view @click="gobind()">
							立即绑定
							<image src="/static/follow/arrowL.png" mode=""></image>
						</view>
					</view>
				</view>
				<view v-else class="list" @tap="selectAC(index, item.id, item.roleStatus, item.bourseId, item.bourseLogo)" v-for="(item, index) in acList" :key="index">
					<view class="left">
						<view class="top font" :class="{ active: item.roleStatus == 1 }">
							{{ item.bourseName }}
							<text>{{ item.roleStatusStr }}</text>
						</view>
						<view v-if="item.roleStatus == 1" class="time"><text>此账户为交易员，无法跟单</text></view>
						<view v-else class="time"><text :class="{ active: item.roleStatus == 1 }">可跟单</text></view>
					</view>
					<image :class="{ active: item.roleStatus == 1 }" :src="item.bourseLogo" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import webUrl from '../../components/url.js';
// import headerModel from '@/components/header-model/header-model.vue';
export default {
	// components: {
	// 	headerModel
	// },
	data() {
		return {
			basePthURL: webUrl.basePthURL,
			hash: '',
			tradeId: '',
			bourseName: '',
			userImg: '',
			userName: '',
			zynum: '',
			zsnum: '',
			//边框
			pixelRatio: '',
			pixelClass: '',
			//选择跟单方向
			currencyACId: 0,
			hyList: [
				{
					name: '正向',
					src: '/static/follow/forward',
					id: 1,
					tit: '交易员开多, 您也开多'
				},
				{
					name: '反向',
					src: '/static/follow/reverse',
					id: 2,
					tit: '交易员开多, 您则开空'
				}
			],
			//类型
			typeId: 1,
			typeList: [
				// {
				// 	name:'按固定数量下单',
				// 	src:'/static/num',
				// 	id:0,
				// },
				{
					name: '按比例下单',
					src: '/static/follow/scale',
					id: 1
				}
			],
			num: '',
			//账户弹窗
			currentAC: '选择账户', //当前账户
			subscription: '请您选择交易账户',
			mt4Id: '', //账户id
			bourseId: '', //跟单账户交易所id
			//账户
			isSelectAC: false,
			isEmpty: true,
			followIndirec: '',
			followStype: '',
			acList: [],
			//币种弹窗
			isCurrency: false,
			//获取的币种
			currencyList: [],
			// 选择
			currencyitem: [],
			// 提交
			selectitem: [],
			//币种确定状态
			currencystatus: false,
			//跟单的交易所id
			exchangeId: '',
			currencyName: '',
			bourseLogo: '',
			followstatus: 0,
			followRecordId: 0
		};
	},
	onLoad(e) {
		this.hash = e;
		if (this.hash.userImage != 'null') {
			this.userImg = this.hash.userImage;
		} else {
			this.userImg = '../../static/my/basePic.png';
		}

		this.userName = this.hash.userName;
		this.currencyName = this.hash.currencyName;
	},
	onShow() {
		//判断设备像素比
		// #ifdef APP-PLUS
		uni.getSystemInfo({
			success: res => {
				// console.log(res.pixelRatio);
				this.pixelRatio = res.pixelRatio;
				if (this.pixelRatio == 3) this.pixelClass = 'triple';
				if (this.pixelRatio == 4) this.pixelClass = 'quadruple';
			}
		});
		// #endif
		this.tradeId = this.hash.tradeId;
		this.bourseName = this.hash.name;
		this.exchangeId = this.hash.bourseId;
		this.init();
		this.getMt4();
	},
	methods: {
		gobind() {
			uni.navigateTo({
				url: '../bindingAC/bindingAC'
			});
		},
		init() {
			// this.$Ajax(
			// 	'/follow/followTrader',
			// 	{
			// 		bourseId: this.exchangeId,
			// 		tradeId: this.tradeId
			// 	},
			// 	res => {
			// 		this.userName = res.obj.trader.name;
			// 		this.userImg = res.obj.trader.userImage;
			// 	}
			// );
		},
		getMt4() {
			this.$Ajax('/front/api/bind/list', {}, res => {
				this.acList = res.obj;
			});
		},
		// 选择跟单方向
		changeHy(id) {
			if (this.currencyACId == id) return;
			this.currencyACId = id;
		},
		// 选择跟单类型
		changeType(id) {
			if (this.typeId == id) return;
			this.typeId = id;
		},
		//输入框
		changInput(e) {
			this.num = e.target.value;
			this.judge();
		},
		//判断
		judge() {
			if (this.num != '' && this.mt4Id != '' && this.selectitem.length != 0) this.isEmpty = false;
			else this.isEmpty = true;
		},
		//账户弹窗
		showSelectAC() {
			this.isSelectAC = true;
		},
		hideSelectAC() {
			this.isSelectAC = false;
		},
		// 选择账户
		selectAC(index, id, typeId, bourseId, bourseLogo) {
			if (typeId == 1) return;
			// console.log(index,id,typeId,bourseId)
			this.currentAC = this.acList[index].bourseName;
			this.subscription = '可跟单';
			this.mt4Id = id;
			this.bourseId = bourseId;
			this.bourseLogo = bourseLogo;
			this.isSelectAC = false;
			// this.getCurrencyList();
			this.getquerydata();

			if (this.num != '' && this.mt4Id != '') this.isEmpty = false;
			else this.isEmpty = true;
		},
		//查询跟单关系
		getquerydata() {
			this.$Ajax(
				'/front/follow/contract/follow/query',
				{
					currentUserApiId: this.mt4Id,
					traderId: this.tradeId
				},
				res => {
					if (res.obj != null) {
						this.followRecordId = res.obj.id;
						this.followstatus = 1;
					} else {
						this.followstatus = 0;
					}
				},
				err => {
					this.isEmpty = false;
				}
			);
		},
		//跟单
		follow() {
			if (this.currencyACId == '') {
				this.$tools.toast('请选择跟单方向');
			} else if (this.num == '') {
				this.$tools.toast('请填写跟单倍数');
			} else {
				this.$Ajax(
					'/front/follow/contract/follow/do',
					{
						currentUserApiId: this.mt4Id,
						traderId: this.tradeId,
						followOrientation: this.currencyACId,
						followRatio: this.num,
						winStopAmount: this.zynum,
						loseStopAmount: this.zsnum
					},
					res => {
						if (res.code == 0) {
							let data = res.obj;
							// console.log(res)
							uni.reLaunch({
								url:
									'../followSuccess/followSuccess?name=' +
									data.traderName +
									'&AC=' +
									data.currencyName +
									'&type=' +
									data.strategy +
									'&zynum=' +
									this.zynum +
									'&zsnum=' +
									this.zsnum
							});
						}
					},
					err => {
						this.isEmpty = false;
					}
				);
			}
		},
		//修改跟单
		changefollow() {
			this.$Ajax(
				'/front/follow/contract/follow/modify',
				{
					followRecordId: this.followRecordId,
					followOrientation: this.currencyACId,
					followRatio: this.num
				},
				res => {
					if (res.code == 0) {
						let data = res.obj;
						uni.reLaunch({
							url: '../followSuccess/followSuccess?name=' + data.traderName + '&AC=' + data.currencyName + '&type=' + data.strategy
						});
					}
				},
				err => {
					this.isEmpty = false;
				}
			);
		},
		//取消跟单
		canclefollow() {
			this.$Ajax(
				'/front/follow/contract/follow/cancel',
				{
					followRecordId: this.followRecordId
				},
				res => {
					if (res.code == 0) {
						this.$tools.toast(res.msg);
						uni.switchTab({
							url: '../follow/follow'
						});
					}
				},
				err => {
					this.isEmpty = false;
				}
			);
		},
		//禁止滑动
		moveHandle() {},
		hideCurrency() {
			this.isCurrency = false;
		},
		//筛选
		handleChange(data, id, multi, callBack) {
			const arr = [];
			for (let i = 0; i < data.length; i++) {
				let r = {};
				r.currencyName = data[i].currencyName;
				r.id = data[i].id;
				if (multi) {
					// 多选
					if (data[i].id === id) {
						// 选中项处理
						r.select = !data[i].select;
					} else {
						r.select = data[i].select;
					}
				} else {
					// 单选
					if (data[i].id === id) {
						// 选中项处理
						r.select = !data[i].select;
					} else {
						r.select = false;
					}
				}
				arr.push(r);
			}
			data = arr;
			const res = []; //返回选中id
			data.forEach(function(val) {
				if (val.select) {
					res.push(val.currencyName);
				}
			});
			return callBack(data, res);
		},
		//币种筛选
		currencySelect(id, currencyName) {
			if (this.bourseId == 3 && currencyName == 'USDT') return;
			const that = this;
			this.handleChange(that.currencyList, id, true, (data, res) => {
				// this.currencyNameId = res;
				// console.log(this.currencyNameId);
				that.currencyList = data;
				that.currencyitem = res;
				if (that.currencyitem.length != 0) {
					that.currencystatus = true;
				} else {
					that.currencystatus = false;
				}
			});
			// console.log(this.currencyitem.length)
		},
		//币种确定
		confirm() {
			if (this.currencyitem.length == 0) return;
			this.isCurrency = false;
			this.selectitem = this.currencyitem;
			this.judge();
		},
		followagreement() {
			uni.navigateTo({
				url: '../followagreement/followagreement'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
$black: #2f3033;
.container {
	height: 100%;
	background: #f6f7f8;
	.info {
		height: 100%;
		box-sizing: border-box;
		padding-top: 108upx;
		.traders {
			height: 224upx;
			background: #fff;
			box-sizing: border-box;
			padding: 0 36upx;
			margin-top: 8px;
			.header {
				width: 100%;
				line-height: 80upx;
				font-size: 28upx;
				color: #2f3033;
				font-weight: bold;
			}
			.userImg {
				height: 144upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				image {
					width: 80upx;
					height: 80upx;
					border-radius: 50%;
					// margin-right: 20upx;
				}
				.message {
					flex: 1;
					margin-left: 20upx;
					.name {
						line-height: 40upx;
						font-size: 28upx;
						color: #2f3033;
					}
					.news {
						display: block;
						line-height: 34upx;
						font-size: 22upx;
						color: #b2b6be;
						.news-item {
							margin-right: 6upx;
						}
					}
				}
				.imgBox {
					display: flex;
					justify-content: flex-end;
					align-items: center;
					image {
						width: 32upx;
						height: 32upx;
					}
					.bourse {
						width: 180upx;
						height: 45upx;
					}
				}
			}
		}
		.Choice-box {
			height: 224upx;
			background: #fff;
			box-sizing: border-box;
			padding: 0 36upx;
			.title {
				line-height: 80upx;
				font-size: 28upx;
				color: #2f3033;
				font-weight: bold;
			}
			.select {
				height: 144upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.txt {
					text {
						display: block;
					}
					.name {
						font-size: 28upx;
						color: #2f3033;
						line-height: 40upx;
					}
					.txt-b {
						font-size: 24upx;
						color: #b2b6be;
						line-height: 34upx;
						margin-top: 4upx;
					}
				}
				.imgBox {
					display: flex;
					justify-content: flex-end;
					align-items: center;
					image {
						width: 32upx;
						height: 32upx;
					}
					.bourse {
						width: 180upx;
						height: 45upx;
					}
				}
			}
		}
		.direction {
			height: 296upx;
			background: #fff;
			margin-top: 8px;
			box-sizing: border-box;
			padding: 0 36upx;
			.head {
				line-height: 80upx;
				font-size: 28upx;
				color: #2f3033;
				font-weight: bold;
			}
			.box {
				height: 216upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.item-box {
					width: 324upx;
					height: 160upx;
					background: #fafafa;
					color: #797c84;
					box-sizing: border-box;
					padding-left: 32upx;
					position: relative;
					border-radius: 8upx;
					text {
						display: block;
					}
					image {
						width: 40upx;
						height: 40upx;
						position: absolute;
						top: 16upx;
					}
					.tit {
						line-height: 40upx;
						font-weight: 600;
						font-size: 28upx;
						margin-top: 62upx;
					}
					.txt {
						line-height: 28upx;
						font-size: 20upx;
						margin-top: 2upx;
					}
				}
				.item-box:after {
					border-radius: 8upx;
					border: 2upx solid #e8e9eb;
				}
				.active {
					background: rgba(223, 168, 0, 0.2);
					color: $globalColor-blue;
				}
				.active:after {
					border-radius: 8upx;
					border-color: $globalColor-blue;
				}
			}
		}
		.type {
			// height: 590upx;
			background: #fff;
			margin-top: 8px;
			box-sizing: border-box;
			padding: 0 36upx;
			.header {
				width: 100%;
				line-height: 80upx;
				font-size: 28upx;
				color: #2f3033;
				font-weight: bold;
			}
			.box {
				height: 202upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.item-box {
					width: 324upx;
					height: 140upx;
					background: #e8e9eb;
					color: #797c84;
					box-sizing: border-box;
					padding-left: 32upx;
					position: relative;
					text {
						display: block;
					}
					image {
						width: 40upx;
						height: 40upx;
						position: absolute;
						top: 16upx;
					}
					.tit {
						line-height: 40upx;
						font-weight: 600;
						font-size: 28upx;
						margin-top: 74upx;
					}
				}
				.item-box:after {
					border-radius: 6upx;
				}
				.active {
					background: $globalColor-blue;
					color: $globalColor-blue;
				}
				.active:after {
					border-radius: 6upx;
					border-color: $globalColor-blue;
				}
			}
			.inputs {
				height: 308upx;
				box-sizing: border-box;
				padding-top: 22upx;
				.head {
					line-height: 40upx;
					font-size: 28upx;
					color: #2f3033;
				}
				.site {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 20upx;
					input {
						width: 90%;
						// line-height: 40upx;
						font-size: 48upx;
						color: #1f2023;
						height: 80upx;
					}
					.scan {
						line-height: 20upx;
						color: #797c84;
						font-size: 28upx;
					}
				}
				.text {
					width: 500upx;
					color: #797c84;
					font-size: 20upx;
					margin-top: 30upx;
				}
			}
			.inputs2 {
				// height: 308upx;
				box-sizing: border-box;
				padding-top: 22upx;
				.head {
					line-height: 40upx;
					font-size: 28upx;
					color: #2f3033;
				}
				.site {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 20upx;
					input {
						width: 90%;
						// line-height: 40upx;
						font-size: 24upx;
						color: #1f2023;
						height: 80upx;
					}
					.scan {
						line-height: 20upx;
						color: #797c84;
						font-size: 28upx;
					}
				}
				.text {
					width: 500upx;
					color: #797c84;
					font-size: 20upx;
					margin-top: 30upx;
				}
			}
		}
		.submit {
			width: 100%;
			margin-top: 48upx;
			padding: 0 40upx;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			box-sizing: border-box;
			button {
				width: 100%;
				height: 92upx;
				border-radius: 8upx;
				line-height: 92upx;
				background: #2989fd;
				font-size: 32upx;
			}
		}
		.agreement {
			line-height: 34upx;
			width: 100%;
			box-sizing: border-box;
			padding-left: 40upx;
			font-size: 24upx;
			color: #797c84;
			margin: 38upx 0 114upx 0;
			text {
				color: $globalColor-blue;
				margin-left: 6upx;
			}
		}
	}
	//账户弹窗
	.selectAC {
		.inner {
			width: 100%;
			box-sizing: border-box;
			padding-bottom: 60upx;
			position: fixed;
			bottom: 0px;
			left: 0;
			z-index: 1000;
			background: #fff;
			.tit {
				font-size: 28upx;
				color: $black;
				line-height: 96upx;
				padding: 0 36upx;
			}
			.noAC {
				width: 100%;
				padding: 26upx 28upx 28upx 36upx;
				box-sizing: border-box;
				.top {
					font-size: 40upx;
					color: $black;
					line-height: 48upx;
					font-weight: bold;
				}
				.bind {
					margin-top: 5px;
					display: flex;
					justify-content: flex-start;
					text {
						font-size: 22upx;
						color: #b2b6be;
						line-height: 32upx;
					}
					view {
						margin-left: 8px;
						font-size: 22upx;
						color: $globalColor-blue;
						line-height: 32upx;
						image {
							width: 16upx;
							height: 16upx;
						}
					}
				}
			}
			.list {
				width: 100%;
				padding: 26upx 28upx 28upx 36upx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.active {
					opacity: 0.3;
				}
				.left {
					.top {
						font-size: 40upx;
						color: $black;
						line-height: 48upx;
						text {
							font-size: 24upx;
							color: $black;
							line-height: 34upx;
							margin-left: 5px;
						}
					}
					.time {
						margin-top: 5px;
						display: flex;
						justify-content: flex-start;
						text {
							font-size: 22upx;
							color: #b2b6be;
							line-height: 32upx;
						}
						view {
							margin-left: 8px;
							font-size: 22upx;
							color: $globalColor-blue;
							line-height: 32upx;
							image {
								width: 16upx;
								height: 16upx;
							}
						}
					}
				}
				image {
					width: 180upx;
					height: 45upx;
				}
			}
		}
	}
	.selectBz {
		.inner {
			width: 100%;
			height: 60%;
			box-sizing: border-box;
			position: fixed;
			bottom: 0px;
			left: 0;
			z-index: 1000;
			background: #fff;
			.tit {
				font-size: 28upx;
				color: $black;
				padding: 0 36upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				view {
					line-height: 96upx;
				}
				.right {
					color: #b2b6be;
					// color: #FF6200;
				}
				.select {
					color: $globalColor-blue;
				}
			}
			.scroll {
				height: calc(100% - 96upx);
				.list {
					width: 100%;
					height: 108upx;
					padding: 36upx 36upx 34upx;
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 32upx;
					line-height: 38upx;
					color: $black;
					image {
						width: 48upx;
						height: 48upx;
						display: none;
					}
					.active {
						display: block;
					}
				}
			}
			.styles {
				color: #b2b6be !important;
			}
		}
	}
}
</style>
