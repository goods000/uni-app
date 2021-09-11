<template>
	<view class="pages">
		<view class="initHeader initHeader--fixed initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-left">
					<view class="initHeader-tabs">
						<view class="initHeader-tabs__control">
							<view
								class="initHeader-tabs__control-item"
								:class="{ 'initHeader-tabs__control-item--active': headerTabsActive == 0 }"
								@click="changeHeaderTabsActive(0)"
							>
								精选
							</view>
							<view
								class="initHeader-tabs__control-item"
								:class="{ 'initHeader-tabs__control-item--active': headerTabsActive == 1 }"
								@click="changeHeaderTabsActive(1)"
							>
								分析
							</view>
							<view
								class="initHeader-tabs__control-item"
								:class="{ 'initHeader-tabs__control-item--active': headerTabsActive == 2 }"
								@click="changeHeaderTabsActive(2)"
							>
								快讯
							</view>
							<view
								class="initHeader-tabs__control-item"
								:class="{ 'initHeader-tabs__control-item--active': headerTabsActive == 3 }"
								@click="changeHeaderTabsActive(3)"
							>
								动态
							</view>
						</view>
					</view>
				</view>
				<view class="initHeader-right"><view class="initHeader-button initHeader-button--edit" @click="$tools.jump('../information/information_edit')"></view></view>
			</view>
		</view>
		<view class="main">
			<view class="choiceBox" v-show="headerTabsActive == 0">
				<view class="choiceBox-wrapper">
					<view class="choiceBox-list" v-for="(item, index) in choiceList" :key="index" @click="$tools.jump('../information/information_detail', item.id)">
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
			<view class="analysisBox" v-show="headerTabsActive == 1">
				<!-- <view class="initNoData">
					暂无数据
				</view> -->
				<view class="analysisBox-wrapper">
					<view class="analysisBox-list" v-for="(item, index) in analysisList" :key="index">
						<view class="analysisBox-list__header">
							<view class="analysisBox-list__date">{{ item.dateString }} BTC行情分析</view>
							<view class="analysisBox-list__rateBox rateBox">
								<view class="rateBox-wrapper">
									<view class="rateBox-label"><image src="../../static/information/icon-analysis-label.png" mode="widthFix"></image></view>
									<view class="rateBox-itemBox">
										<view class="rateBox-itemBox__item rateBox-itemBox__item--style1">
											<view
												class="rateBox-itemBox__item-line"
												:style="{ width: (item.longNum / (item.otherNum + item.longNum + item.shortNum)) * 100 + '%' }"
											></view>
										</view>
										<view class="rateBox-itemBox__item rateBox-itemBox__item--style2">
											<view
												class="rateBox-itemBox__item-line"
												:style="{ width: (item.shortNum / (item.otherNum + item.longNum + item.shortNum)) * 100 + '%' }"
											></view>
										</view>
										<view class="rateBox-itemBox__item rateBox-itemBox__item--style3">
											<view
												class="rateBox-itemBox__item-line"
												:style="{ width: (item.otherNum / (item.otherNum + item.longNum + item.shortNum)) * 100 + '%' }"
											></view>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="analysisBox-list__item" v-for="(subItem, subIndex) in item.bigVipMsgVos" :key="subIndex">
							<view class="analysisBox-list__plane">
								<view class="analysisBox-list__content">
									<view class="analysisBox-list__title">{{ subItem.bigVipName }}</view>
									<view class="analysisBox-list__msg">{{ subItem.content }}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="newsletterBox" v-show="headerTabsActive == 2">
				<view class="newsletterBox-wrapper">
					<view class="newsletterBox-list" v-for="(item, index) in newsletter" :key="index">
						<view class="newsletterBox-list__date">{{ item.createTime }}</view>
						<view class="newsletterBox-list__plane">
							<view class="newsletterBox-list__content">
								<view class="newsletterBox-list__title">{{ item.title }}</view>
								<view class="newsletterBox-list__msg">{{ item.content }}</view>
								<!-- <view class="newsletterBox-list__more" v-show="item.showMore" @click="showMore(index)">全文</view> -->
							</view>
							<view class="newsletterBox-list__button">
								<view class="newsletterBox-list__button-btn newsletterBox-list__button-btn--good" @click="goodORbad(item.id, index, 1)">
									利好({{ item.upCounts }})
								</view>
								<view class="newsletterBox-list__button-btn newsletterBox-list__button-btn--bad" @click="goodORbad(item.id, index, 0)">
									利空({{ item.downCounts }})
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="dynamicBox" v-show="headerTabsActive == 3">
				<view class="dynamicBox-wrapper">
					<view class="initNoData" v-if="dynamicList.length == 0">暂无数据</view>
					<view class="dynamicBox-list" v-for="(item, index) in dynamicList" :key="index">
						<view class="dynamicBox-list__header">
							<view class="dynamicBox-list__avatar"><image :src="item.userImage" mode="scaleToFill"></image></view>
							<view class="dynamicBox-list__info">
								<view class="dynamicBox-list__name">{{ item.userName }}</view>
								<view class="dynamicBox-list__date">{{ item.createTime }}</view>
							</view>
						</view>
						<view class="dynamicBox-list__message">{{ item.content }}</view>
						<view class="dynamicBox-list__imageList">
							<view class="dynamicBox-list__imageList-image" :style="{ 'background-image': 'url(' + subItem + ')' }" v-for="(subItem,subIndex) in item.imageList" :key="subIndex" @click="previewImage(item.imageList)">
								<!-- <image :src="subItem" mode="scaleToFill"></image> -->
							</view>
						</view>
						<view class="dynamicBox-list__button">
							<view class="dynamicBox-list__button-btn" :class="{'dynamicBox-list__button-btn--active': item.supportCount}" @click="dynamicSupport(item.id, item.focusFlag, index)">赞({{ item.supportCount }})</view>
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
			analysisList: [], //分析
			newsletter: [], //快讯
			dynamicList: [], //动态

			headerTabsActive: 0,

			// 分页
			pages: 1, //总页数
			pageNum: 1, //当前页数
			pageSize: 20 //请求记录
		};
	},
	onShow() {
		if(uni.getStorageSync('informationActive')){
			this.headerTabsActive = uni.getStorageSync('informationActive');
		}
		this.init();
	},
	onHide(){
		uni.removeStorageSync('informationActive');
	},
	onReachBottom() {
		if (this.headerTabsActive != 1) {
			if (this.pageNum >= this.pages) {
				return this.$tools.toast('到底啦');
			} else {
				this.pageNum++;
				this.getData();
			}
		}
	},
	methods: {
		init() {
			this.choiceList = [];
			this.analysisList = [];
			this.newsletter = [];
			this.dynamicList = [];
			this.pageNum = 1;
			this.getData();
		},
		getData() {
			if (this.headerTabsActive == 0) {
				this.getChoiceList();
			} else if (this.headerTabsActive == 1) {
				this.getAnalysisList();
			} else if (this.headerTabsActive == 2) {
				this.getNewsletter();
			} else if (this.headerTabsActive == 3) {
				this.getDynamicList();
			}
		},
		// 精选
		getChoiceList() {
			this.$Ajax(
				'/info/important/list',
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
		// 分析
		getAnalysisList() {
			this.$Ajax(
				'/front/data/analysis/get/list',
				{
					pageNum: 1,
					pageSize: 20
				},
				res => {
					// console.log('分析：' + JSON.stringify(res));
					if (res.code == 0) {
						this.pages = res.obj.pages;
						this.analysisList = this.analysisList.concat(res.obj.list);
					}
				}
			);
		},

		// 快讯
		getNewsletter() {
			this.$Ajax(
				'/info/normal/list',
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
				'/info/support/do',
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

		// 动态
		getDynamicList() {
			this.$Ajax(
				'/front/dynamic/publish/list',
				{
					pageNum: this.pageNum,
					pageSize: this.pageSize
				},
				res => {
					// console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.pages = res.obj.pages;
						this.dynamicList = this.dynamicList.concat(res.obj.list);
					}
				}
			);
		},
		dynamicSupport(id, flag, index) {
			if (flag == 1) {
				this.$Ajax(
					'/front/support/cancel',
					{
						dynamicRecordId: id
					},
					res => {
						if (res.code == 0) {
							this.$set(this.dynamicList[index], 'focusFlag', this.dynamicList[index].focusFlag  = 0);
							this.$set(this.dynamicList[index], 'supportCount', this.dynamicList[index].supportCount - 1);
						}
					}
				);
			} else {
				this.$Ajax(
					'/front/support/do',
					{
						dynamicRecordId: id
					},
					res => {
						if (res.code == 0) {
							this.$set(this.dynamicList[index], 'focusFlag', this.dynamicList[index].focusFlag  = 1);
							this.$set(this.dynamicList[index], 'supportCount', this.dynamicList[index].supportCount + 1);
						}
					}
				);
			}
		},
		
		previewImage(imageList){
			uni.previewImage({
				urls: imageList,
				success: function(data) {
					console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
				},
				fail: function(err) {
					console.log(err.errMsg);
				}
			});
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
				this.analysisList = [];
				this.newsletter = [];
				this.dynamicList = [];
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
