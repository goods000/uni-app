<template>
	<view class="page">
		<view class="empty-public"></view>
		<view class="header-plate">
			<view class="back-pic" @click="$tools.back(1)">
				<image src="../../static/public/back-icon-white.png" mode=""></image>
			</view>
			<view class="header-title"></view>
			<view class="header-empty"></view>
		</view>
		<view class="page-title-cn">{{ i18n.mnemonic.code_mnemonic }}</view>
		<view class="fill-plate-out">
			<view class="fill-plate">
				<view class="input-plate input-plate__noPadding">
					<view class="input-flex__textarea">
						<textarea placeholder-class="input-flex__textarea--style" :placeholder="i18n.mnemonic.enter_01" v-model="words"/>
					</view>
				</view>
			</view>
		</view>
		<view class="fill-plate-out">
			<view class="fill-plate">
				<view class="operateBox-formBox-list operateBox-formBox-list-titleWords">
					<view class="operateBox-formBox-list-words" v-for="(item,index) in wordsArr" :key="index"
					:class="{ 'operateBox-formBox-list-words--active': item.flag }"
						@click="toggerFlag(item.title, index, item.flag)">
						{{item.title}}
					</view>
				</view>
				<view class="btn btn-border__margin" @click="submit()">{{ i18n.mnemonic.btn_02 }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				words:'',
				wordList:['GLIB','UN','join','onion','jump','rose','clay','cube','brief','forest','void','glare'],
				// wordsArr:[{title:'GLIB'},{title:'UN'},{title:'join'},{title:'onion'},{title:'jump'},{title:'forest'},{title:'void'},{title:'cube'},{title:'rose'},{title:'glare'},{title:'brief'},{title:'clay'}],
				wordsArr:[],
				sortArr: [],
			};
		},
		computed: {
			filterSortArr() {
				return this.sortArr
					.flatMap(item => {
						return item.title;
					})
					.join(' ');
			}
		},
		onLoad() {
			this.wordList = uni.getStorageSync('wordList');
			this.words = uni.getStorageSync('words');
			// this.getWordsArr();
			if (!uni.getStorageSync('wordsArr')) {
				this.getWordsArr();
			} else {
				this.wordsArr = uni.getStorageSync('wordsArr');
				this.sortArr = uni.getStorageSync('sortArr');
			}
		},
		onShow() {
			this.walletName = uni.getStorageSync('walletName');
			this.password = uni.getStorageSync('password');
			// #ifdef APP-PLUS
			this.uuid = plus.device.uuid;
			// #endif
		},
		methods:{
			getWordsArr() {
				for (let i = 0, len = this.wordList.length; i < len; i++) {
					let currentRandom = parseInt(Math.random() * (len - 1));
					let current = this.wordList[i];
					this.wordList[i] = this.wordList[currentRandom];
					this.wordList[currentRandom] = current;
				}
				var wordsArr = this.wordList;
				[...this.wordList].forEach(item => {
					var obj = {};
					obj.flag = false;
					obj.title = item;
					this.wordsArr.push(obj);
				});
				// console.log('随机后的数组：' + JSON.stringify(this.wordsArr));
			},
			toggerFlag(title, index, flag) {
				if (!flag) {
					var word = {};
					word.title = title;
					word.index = index;
					this.wordsArr[index].flag = true;
					this.sortArr.push(word);
					uni.setStorageSync('sortArr', this.sortArr);
					uni.setStorageSync('wordsArr', this.wordsArr);
				} else {
					this.wordsArr[index].flag = false;
					this.sortArr = this.sortArr.filter(item => item.index !== index);
					uni.setStorageSync('wordsArr', this.wordsArr);
					uni.setStorageSync('sortArr', this.sortArr);
				}
				let arr = [];
				this.sortArr.forEach(item => {
					arr.push(item.title);
				});
				this.words = arr.toString().replace(/,/g," ");
				uni.setStorageSync('words', this.words);
				// console.log('改变后的数组：' + JSON.stringify(this.sortArr) +'-----'+this.words);
			},
			deleteData() {
				this.sortArr = [];
				this.wordsArr.forEach((item, index) => {
					item.flag = false;
				});
				uni.removeStorageSync('sortArr');
				uni.removeStorageSync('wordsArr');
			},
			submit(){
				// if(this.words==''){
				if(this.filterSortArr==''){
					this.$tools.toast(this.i18n.mnemonic.enter_01);
				}else if(this.sortArr.length !== 12){
					console.log(this.sortArr.length)
					return this.$tools.toast(this.i18n.mnemonic.enter_02);
				}else {
					let arr = [];
					this.sortArr.forEach(item => {
						arr.push(item.title);
					});
					if (arr.toString() !== uni.getStorageSync('wordList').toString()) {
						return this.$tools.toast(this.i18n.mnemonic.enter_03);
					}
					console.log("注册成功");
					let passphrase = arr.toString().replace(/,/g," ");
					let account = uni.getStorageSync('account');
					let pwd = uni.getStorageSync('pwd');
					this.$Ajax(
						'/front/register/two',
						{
							name: account.name,
							passphrase: this.words,
							userId: account.id,
							parentId: account.parentId
						},
						res => {
							console.log(JSON.stringify(res));
							if (res.code == 0) {
								this.token = res.obj;
								uni.setStorageSync('token', res.obj);
								uni.setStorageSync('passphrase', passphrase);
								// this.$tools.toastJump(this.i18n.mnemonic.enter_04,'./login');
								this.$Ajax('/front/login',{
									// account:account.name,
									data:pwd,
									passphrase:this.words
								},res=>{
									console.log(res);
										this.$tools.toast(res.msg);
									if(res.code==0){
										uni.setStorageSync('token', res.obj.token);
										uni.removeStorageSync('account');
										uni.removeStorageSync('wordList');
										uni.removeStorageSync('sortArr');
										uni.removeStorageSync('wordsArr');
										uni.removeStorageSync('words');
										uni.removeStorageSync('pwd');
										uni.switchTab({
											url:'../index/index'
										})
									}
									
								})
							}
						}
					);
				}
			},
		}
	}
</script>

<style lang="scss">
	.page{
		background-size: 100% 100%;
		background-position: center;
		background-repeat: no-repeat;
		height: 100vh;
		width: 100vw;
		color: #FFFFFF;
		.header-plate{
			height: 88rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30rpx;
			.back-pic{
				width: 17rpx;
				height: 31rpx;
				image{
					width: 17rpx;
					height: 31rpx;
				}
			}
			.header-title{
				font-size: 36rpx;
				font-family: PingFang SC-Bold;
				font-weight: bold;
			}
			.header-empty{
				width: 17rpx;
			}
		}
		.page-title-cn{
			font-size: 52rpx;
			font-family: PingFang SC-Bold;
			font-weight: 500;
			padding:20rpx 0 80rpx 60rpx;
		}
		.fill-plate-out{
			padding: 0rpx 30rpx 30rpx;
			.fill-plate{
				background-color: #040D32;
				padding: 15rpx 30rpx;
				.operateBox-formBox-list{
					
				}
				.operateBox-formBox-list-titleWords{
					display: flex;
					align-items: center;
					justify-content: space-between;
					flex-wrap: wrap;
					padding: 60upx 0upx 0;
				}
				.operateBox-formBox-list-words{
					background: #102E4D;
					color: rgba(255, 255, 255, .3);
					width: 30%;
					text-align: center;
					font-size: 32upx;
					font-weight: 500;
					padding: 25upx 0;
					margin: 0 0 32upx;
				}
				.operateBox-formBox-list-words--active{
					background: url(../../static/login/icon-words-bg.png);
					background-size: 100% 100%;
					background-repeat: no-repeat;
					color: #FFFFFF;
				}
				.input-plate{
					padding-top: 40rpx;
					.input-flex__textarea{
						background: #040D32;
						// border: 1px solid #043680;
						display: flex;
						align-items: center;
						justify-content: space-between;
						textarea{
							max-height: 210rpx;
						}
						.input-flex__textarea--style{
							font-size: 32rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: rgba(255, 255, 255, .1);
						}
					}
				}
				.model-list{
					display: flex;
					align-items: center;
					justify-content: space-between;
					height: 64rpx;
					.item{
						font-size: 24rpx;
						font-family: PingFang SC-Bold;
						font-weight: 500;
						color: #00A2FF;
					}
				}
				.btn{
					width: 620rpx;
					height: 88rpx;
					background: #FFCF1E;
					box-shadow: 0rpx 4rpx 14rpx 0rpx rgba(255, 207, 30, 0.41);
					border-radius: 44rpx;
					text-align: center;
					line-height: 88rpx;
					margin: auto;
					font-size: 34rpx;
					font-family: PingFang SC-Bold;
					font-weight: bold;
					color: #040D32;
				}
				.btn-border__margin{
					margin: 80upx auto;
				}
			}
			.input-plate__noPadding{
				padding-top: 20rpx !important;
			}
		}
	}
</style>
