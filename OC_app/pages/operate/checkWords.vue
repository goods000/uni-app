<template>
	<view class="pages">
		<view class="import setup">
			
			<view class="importBox-header">
				<view class="importBox-header-left" @click="$tools.back(1)">
					<image src="../../static/operate/icon-back.png" mode="widthFix"></image>
				</view>
			</view>
			
			<view class="importBox-txt">验证助记词</view>
			
			<view class="importBox-text-label">请按照顺序点击助记词，来确认您已正确备份</view>
			<view class="importBox-text">
				<view class="importBox-text-box">
					<view class="importBox-text-box__words" v-for="(item,index) in sortArr" :key="index">
						<view class="importBox-text-box__words--txt">
							{{item.title}}
							<image src="../../static/operate/icon-close.png" mode="widthFix" @click="deleteData(item.title,index)"></image>
						</view>
					</view>
				</view>
			</view>
			
			<view class="importBox-list">
				<view class="importBox-list-wordsBox">
					<view class="importBox-list-wordsBox-words" v-for="(item,index) in wordsArr" :key="index"
					:class="{ 'importBox-list-wordsBox-wordsChioce': item.flag}"
						@click="addWords(item.title, index, item.flag)">{{item.title}}
					</view>
				</view>
			</view>
			
			<view class="importBox-btn">
				<view class="initBtn" @click="submit()">
					下一步
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
				words:'',
				// wordsList:[{title:'GLIB'},{title:'UN'},{title:'TOLD'},{title:'DEAL'},{title:'ITS'},{title:'MY'},{title:'FAME'},{title:'OBEY'},{title:'BAH'},{title:'LEON'},{title:'DRAM'}],
				// words:[{title:'GLIB'},{title:'UN'},{title:'TOLD'},{title:'ALIA'}]
				wordsArr: [],
				sortArr: [],
			}
		},
		onLoad() {
			this.wordsList = uni.getStorageSync('wordsList');
			// this.sortArr = uni.getStorageSync('sortArr');
			// console.log("this.sortArr",this.sortArr);
			if (!uni.getStorageSync('wordsArr')) {
				this.getWordsArr();
			} else {
				this.wordsArr = uni.getStorageSync('wordsArr');
				this.sortArr = uni.getStorageSync('sortArr');
			}
			// this.wordsArr = uni.getStorageSync('wordsArr');
			// console.log("this.wordsArr",this.wordsArr);
		},
		onShow() {
			this.information = uni.getStorageSync('information');
			// console.log("information:",this.information);
			this.address = uni.getStorageSync('address');
			// console.log("address:",this.address);
			this.wordsList = uni.getStorageSync('wordsList');
			console.log("wordsList:",this.wordsList);
		},
		methods: {
			getWordsArr() {
				for (let i = 0, len = this.wordsList.length; i < len; i++) {
					let currentRandom = parseInt(Math.random() * (len - 1));
					let current = this.wordsList[i];
					this.wordsList[i] = this.wordsList[currentRandom];
					this.wordsList[currentRandom] = current;
				}
				var wordsArr = this.wordsList;
				[...this.wordsList].forEach(item => {
					var obj = {};
					obj.flag = false;
					obj.title = item;
					this.wordsArr.push(obj);
				});
				console.log('随机后的数组：' + JSON.stringify(this.wordsArr));
			},
			addWords(title, index, flag) {
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
				console.log('改变后的数组：' + JSON.stringify(this.sortArr));
			},
			deleteData(title, index) {
				this.sortArr.splice(index,1);
				// this.wordsArr[index].flag = false;
				console.log("title:",title);
				this.wordsArr.forEach(item => {
					if(item.title == title){
						item.flag = false;
					} 
				});
				uni.setStorageSync('sortArr', this.sortArr);
				uni.setStorageSync('wordsArr', this.wordsArr);
				// console.log("删除后的数组sortArr"+ JSON.stringify(this.sortArr))
				// console.log("删除后的数组wordsArr"+ JSON.stringify(this.wordsArr))
			},
			submit(){
				if (this.sortArr.length !== 12) {
					return this.$tools.toast('助记词缺失');
				}
				
				let newList = this.wordsList.toString().replace(/,/g," ");
				let arr = [];
				this.sortArr.forEach(item => {
					arr.push(item.title);
				});
				this.words = arr.toString().replace(/,/g," ");
				console.log("words:",this.words);
				console.log("newList:",newList);
				this.information = uni.getStorageSync('information');
				this.address = uni.getStorageSync('address');
				if (this.words != newList) {
					return this.$tools.toast('助记词顺序错误');
				}
				this.$Ajax(
					'/front/address/create/do',
					{
						passphrase: this.words,
						address:this.address.address,
						key:this.address.key,
						name: this.information.name,
						pwd: this.information.pwd,
						parentName: this.information.parentName,
					},
					res => {
						console.log(JSON.stringify(res));
						if (res.code == 0) {
							this.token = res.obj;
							// uni.setStorageSync('token', res.obj);
							// uni.setStorageSync('userId', res.obj.id);
							// uni.setStorageSync('passphrase', passphrase);
							this.$tools.toastJump(res.msg,'./export',res.obj.passphrase);
						}
					}
				);
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/operate/import';
	page{background: #FFFFFF;}
	.importBox-list-item{background: rgba(221,229,238,0.24);}
</style>
