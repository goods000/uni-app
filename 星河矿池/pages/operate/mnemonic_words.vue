<template>
	<view class="pages">
		<view class="operateBox">
			<view class="header_bar">
				<view class="header">
					<view class="header-goBack" @click="$tools.back(1)"></view>
				</view> 
			</view> 
			<view class="firstBox-titleBox">
				<view class="firstBox-titleBox-wrapper">验证助记词</view>
				<view class="firstBox-titleBox-title">请按上一步助记词顺序依次点击下方助记词</view>
			</view>
			<view class="operateBox-tabs">
				<view class="operateBox-formBox">
					<view class="operateBox-formBox-list-header"></view>
					<view class="operateBox-formBox-list operateBox-formBox-list-titleWords">
						<view class="operateBox-formBox-list-words" v-for="(item,index) in wordsArr" :key="index"
						:class="{ 'operateBox-formBox-list-words--active': item.flag }"
						@click="toggerFlag(item.title, index, item.flag)">
							{{item.title}}
						</view>
					</view>
				</view>
				<view class="operateBox-wordBox" v-show="filterSortArr.length != 0">
					<view class="operateBox-wordBox-wrapper">
						<view class="operateBox-wordBox-data">{{ filterSortArr }}</view>
						<view class="operateBox-wordBox-close" @click="deleteData()"></view>
						<view class="operateBox-wordBox-copy"  @click="$tools.copy(filterSortArr)">复制</view>
					</view>
				</view>
			</view>
			<view class="operateBox-bottomBox">
				<view class="operateBox-btn">
					<view class="operateBox-btn-chioce" @click="finish()">下一步</view>
				</view>
			</view>
			
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// wordsArr:[{title:'GLIB'},{title:'UN'},{title:'TOLD'},{title:'DEAL'},{title:'ITS'},{title:'MY'},{title:'FAME'},{title:'OBEY'},{title:'BAH'},{title:'LEON'},{title:'DRAM'}],
				wordsArr:[],
				sortArr: [],
			}
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
			this.contrastWord = uni.getStorageSync('wordList');
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
		methods: {
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
				// console.log('改变后的数组：' + JSON.stringify(this.sortArr));
			},
			deleteData() {
				this.sortArr = [];
				this.wordsArr.forEach((item, index) => {
					item.flag = false;
				});
				uni.removeStorageSync('sortArr');
				uni.removeStorageSync('wordsArr');
			},
			finish() {
				if (this.sortArr.length !== 12) {
					console.log(this.sortArr.length)
					return this.$tools.toast("助记词缺失");
				}
				let arr = [];
				this.sortArr.forEach(item => {
					arr.push(item.title);
				});
				this.words = uni.getStorageSync('wordList');
				if (arr.toString() !== this.words.toString()) {
					return this.$tools.toast("助记词顺序不正确");
				}
				console.log("注册成功");
				let passphrase = arr.toString().replace(/,/g," ");
				let information = uni.getStorageSync('information');
				this.$Ajax(
					'/front/register',
					{
						name: information.name,
						tradePwd: information.pwd,
						passphrase: passphrase,
						parentName: information.parentName
					},
					res => {
						console.log(JSON.stringify(res));
						if (res.code == 0) {
							this.token = res.obj;
							uni.setStorageSync('token', res.obj);
							uni.setStorageSync('passphrase', passphrase);
							uni.removeStorageSync('information');
							uni.removeStorageSync('wordList');
							uni.removeStorageSync('sortArr');
							uni.removeStorageSync('wordsArr');
							this.$tools.toastJump("验证成功",'./success');
						}
					}
				);
			}	
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/operate/register';
</style>
