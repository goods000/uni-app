<template>
	<view class="pages" :data-theme="pageTheme">
		<view class="initTarBarShadow"></view>
		
		<view class="initHeader initHeader--line initHeader--fixed" :class="pageTheme == 'light' ? 'initHeader--black' : 'initHeader--white'">
			<view class="initHeader-wrapper">
				<view class="initHeader-tabs">
					<view class="initHeader-tabs__wrapper">
						<view class="initHeader-tabs__item" :class="{ 'initHeader-tabs__item--active': headerTabsActive == 0 }" @click="changeHeaderTabsActive(0)"><text>资讯</text></view>
						<view class="initHeader-tabs__item" :class="{ 'initHeader-tabs__item--active': headerTabsActive == 1 }" @click="changeHeaderTabsActive(1)"><text>快讯</text></view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="main">
			<view class="choiceBox" v-show="headerTabsActive == 0">
				<view class="choiceBox-wrapper">
					<view class="initNoData" v-if="choiceList.length == 0">暂无数据</view>
					<view class="choiceBox-list" v-for="(item, index) in choiceList" :key="index" @click="$tools.jump('../information/information_detail', item.id)">
						<view class="choiceBox-list__content">
							<view class="choiceBox-list__title">{{ item.title }}</view>
							<view class="choiceBox-list__body">
								<view class="choiceBox-list__type">{{ item.resource }}</view>
								<view class="choiceBox-list__date">{{ item.publishedAt }}</view>
							</view>
						</view>
						<view class="choiceBox-list__image"><image :src="item.thumbnail" mode="widthFix"></image></view>
					</view>
				</view>
			</view>
			<view class="newsletterBox" v-show="headerTabsActive == 1">
				<view class="initNoData" v-if="newsletter.length == 0">暂无数据</view>
				<view class="newsletterBox-wrapper">
					<view class="newsletterBox-list" v-for="(item, index) in newsletter" :key="index">
						<view class="newsletterBox-list__date">{{ item.pubTime }}</view>
						<view class="newsletterBox-list__plane">
							<view class="newsletterBox-list__content">
								<view class="newsletterBox-list__title">{{ item.title }}</view>
								<view class="newsletterBox-list__msg">{{ item.content }}</view>
							</view>
							<view class="newsletterBox-list__button">
								<view class="newsletterBox-list__button-btn newsletterBox-list__button-btn--good" @click="goodORbad(item.id, index, 1)">利好({{ item.upCounts }})</view>
								<view class="newsletterBox-list__button-btn newsletterBox-list__button-btn--bad" @click="goodORbad(item.id, index, 0)">利空({{ item.downCounts }})</view>
							</view>
						</view>
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
			choiceList: [], //精选
			newsletter: [], //快讯

			headerTabsActive: 0,

			// 分页
			pages: 1, //总页数
			pageNum: 1, //当前页数
			pageSize: 20 //请求记录
		};
	},
	onReady() {
		this.$setStatusBarStyle();
		this.$setTarBar();
	},
	onShow() {
		this.$setStatusBarStyle();
		this.$setTarBar();
		this.init();
	},
	onReachBottom() {
		if (this.pageNum >= this.pages) {
			return this.$tools.toast('到底啦');
		} else {
			this.pageNum++;
			this.getData();
		}
	},
	methods: {
		init() {
			// this.choiceList = [];
			// this.newsletter = [];
			// this.pageNum = 1;
			if(this.headerTabsActive == 0 && this.choiceList.length == 0 || this.headerTabsActive == 1 && this.newsletter.length == 0){
				this.getData();
			}
		},
		getData() {
			if (this.headerTabsActive == 0) {
				this.getChoiceList();
			} else if (this.headerTabsActive == 1) {
				this.getNewsletter();
			}
		},
		// 精选
		getChoiceList() {
			this.$Ajax(
				'/front/info/important/list',
				{
					pageNum: this.pageNum,
					pageSize: this.pageSize
				},
				res => {
					// console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.pages = res.obj.pages;
						this.choiceList = this.choiceList.concat(res.obj.list);
					}
				}
			);
		},

		// 快讯
		getNewsletter() {
			this.$Ajax(
				'/front/info/normal/list',
				{
					pageNum: this.pageNum,
					pageSize: this.pageSize
				},
				res => {
					// console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.pages = res.obj.pages;
						this.newsletter = this.newsletter.concat(res.obj.list);
					}
				}
			);
		},
		goodORbad(id, index, type) {
			this.$Ajax(
				'/front/info/support/do',
				{
					id: id,
					type: type
				},
				res => {
					if (res.code == 0) {
						if (type == 1) {
							this.$set(this.newsletter[index], 'upCounts', this.newsletter[index].upCounts + 1);
						} else if (type == 0) {
							this.$set(this.newsletter[index], 'downCounts', this.newsletter[index].downCounts + 1);
						}
					}
				}
			);
		},

		showMore(index) {
			this.newsletter[index].showMore = false;
		},
		getElementHeight(element, index) {
			setTimeout(() => {
				let ele = element + '--' + index;
				let query = uni.createSelectorQuery().in(this);
				query.select(ele).boundingClientRect();
				query.exec(res => {
					let lineHeight = uni.upx2px(36);
					console.log(uni.upx2px(36));
					console.log(res[0].height);
					if (!res) {
						//如果没获取到，再调一次
						this.getElementHeight();
					} else {
						if (res[0].height > lineHeight * 3) {
							this.newsletter[index].showMore = true;
						}
					}
				});
			}, 200);
		},
		changeHeaderTabsActive(index) {
			if (this.headerTabsActive != index) {
				this.headerTabsActive = index;
				this.choiceList = [];
				this.newsletter = [];
				this.pageNum = 1;
				this.getData();
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/information';
</style>
