<template>
	<view class="pages">
		<view class="header_bar header_fixed header_main">
			<view class="header">
				<view class="initButtonTabs">
					<view class="initButtonTabs-control">
						<view class="initButtonTabs-control__aniBg" :style="[{ left: (100 / 2) * headerTabsActive + '%' }, { width: 100 / 2 + '%' }]"></view>
						<view
							class="initButtonTabs-control__item"
							:class="{ 'initButtonTabs-control__item--active': headerTabsActive == 0 }"
							@click="changeHeaderTabsActive(0)"
						>
							快讯
						</view>
						<view
							class="initButtonTabs-control__item"
							:class="{ 'initButtonTabs-control__item--active': headerTabsActive == 1 }"
							@click="changeHeaderTabsActive(1)"
						>
							资讯
						</view>
					</view>
				</view>
			</view> 
		</view> 
				
		<view class="main">
			<view class="newsletterBox" v-show="headerTabsActive == 0">
				<view class="newsletterBox-wrapper">
					<view class="newsletterBox-list" v-for="(item, index) in newsletter" :key="index">
						<view class="newsletterBox-list__date">{{ item.createTime }}</view>
						<view class="newsletterBox-list__plane">
							<view class="newsletterBox-list__content">
								<view class="newsletterBox-list__title">{{ item.title }}</view>
								<view class="newsletterBox-list__msg" v-html="item.content">
									{{ item.content }}
								</view>
								<!-- <view class="newsletterBox-list__more" v-show="item.showMore" @click="showMore(index)">全文</view> -->
							</view>
							<view class="newsletterBox-list__button">
								<view class="newsletterBox-list__button-btn newsletterBox-list__button-btn--good" @click="goodORbad(item.id, index, 1)">利好({{ item.upCounts }})</view>
								<view class="newsletterBox-list__button-btn newsletterBox-list__button-btn--bad" @click="goodORbad(item.id, index, 0)">利空({{ item.downCounts }})</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="choiceBox" v-show="headerTabsActive == 1">
				<view class="choiceBox-wrapper">
					<view class="choiceBox-list" v-for="(item, index) in choiceList" :key="index" @click="$tools.jump('../information/information_details', item.id)">
						<view class="choiceBox-list__content">
							<view class="choiceBox-list__title">{{ item.title }}</view>
							<view class="choiceBox-list__body">
								<view class="choiceBox-list__type">{{ item.resource }}</view>
								<view class="choiceBox-list__date">{{ item.timeString }}</view>
							</view>
							
							<!-- <view class="choiceBox-list__date">{{ item.timeString }}</view> -->
						</view>
						<view class="choiceBox-list__image"><image :src="item.thumbnail" mode="widthFix"></image></view>
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
			choiceList: [], //资讯
			newsletter: [], //快讯
			headerTabsActive: 0,
			// 分页
			pages: 1, //总页数
			pageNum: 1, //当前页数
			pageSize: 20 //请求记录
		};
	},
	onShow() {
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
			this.choiceList = [];
			this.newsletter = [];
			this.pageNum = 1;
			this.getData();
		},
		getData() {
			if (this.headerTabsActive == 0) {
				this.getNewsletter();
			} else if (this.headerTabsActive == 1) {
				this.getChoiceList();
			} 
		},
		// 资讯
		getChoiceList() {
			this.$Ajax(
				'/search/important/list',
				{
					pageNum: this.pageNum,
					pageSize: this.pageSize
				},
				res => {
					console.log(JSON.stringify(res));
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
				'/search/info',
				{
					pageNum: this.pageNum,
					pageSize: this.pageSize
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.pages = res.obj.pages;
						this.newsletter = this.newsletter.concat(res.obj.list);
					}
				}
			);
		},
		goodORbad(id, index, type) {
			this.$Ajax(
				'/search/support/do',
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
						console.log(JSON.stringify(this.newsletter));
					}
				}
			);
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
@import '@/common/scss/pages/information/information';
</style>
