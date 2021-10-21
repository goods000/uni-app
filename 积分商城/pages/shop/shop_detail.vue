<template>
	<view class="pages">
		<view class="initHeader initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back initHeader-back--mall" @click="$tools.back(1)"></view>
				<view class="initHeader-title">
					<view class="initHeader-title--info" :class="{'initHeader-title--info__active': tabsActive == 0 }" @click="changeTabsActive(0)">商品</view>
					<view class="initHeader-title--info initHeader-title--content" :class="{'initHeader-title--info__active': tabsActive == 1 }" @click="changeTabsActive(1)">详情</view>
				</view>
			</view>
		</view>
		<view class="main">
			<view class="swiperBox">
				<swiper :autoplay="true" :interval="2500" :duration="1000" :circular="true" class="swiperBox-swiper">
					<swiper-item class="swiperBox-swiper__item" v-for="(item, index) in goodsBanner" :key="index"><image :src="item+''" mode="widthFix"></image></swiper-item>
				</swiper>
			</view>

			<view class="detailBox">
				<view class="detailBox-wrapper">
					<!-- <view class="detailBox-title">凯撒专柜正品 新款女装2021纯色方领桑蚕丝上衣真丝衬衫女装打底衫</view> -->
					<view class="detailBox-title">{{ goodsInfo.name }}</view>
					<view class="detailBox-note" v-if="type == 0"><text>赠送</text>等价值的{{ (goodsInfo.cost/TPDPrice/usdtPrice/gPrice) | number(2) }}CLQ积分</view>
					<view class="detailBox-note" v-if="type == 1"><text>赠送</text>等价值的{{ goodsInfo.using/TPDPrice/gPrice | number(2) }}CLQ积分</view>

					<view class="detailBox-row">
						<view class="detailBox-priceInfo">
							<text class="detailBox-priceInfo__type">价格</text>
							<view class="detailBox-priceInfo__price" v-if="type == 0">{{ goodsInfo.cost }}<text>CNY</text></view>
							<view class="detailBox-priceInfo__price" v-if="type == 1">{{ goodsInfo.using }}<text>USDT</text></view>
						</view>
						
					</view>

					<view class="detailBox-info">
						<text class="detailBox-info__item">库存：{{ goodsInfo.inventory }}件</text>
						<text class="detailBox-info__item">月销：{{ goodsInfo.sellCount }}件</text>
					</view>
				</view>
			</view>
			<view class="contentBox">
				<view class="contentBox-wrapper">
					<view class="contentBox-title initTitle">商品详情</view>
					<view class="contentBox-details">
						<!-- <rich-text :nodes="shopDetailList.content" style="font-size: 28upx;"></rich-text></view> -->
						<image :src="item+''" mode="widthFix" v-for="(item, index) in goodsDetailImageList" :key="index"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="toolsBox">
			<view class="toolsBox-wrapper">
				<view class="toolsBox-shopCart" @click="$tools.switchTab('../index/index')">
					<view class="toolsBox-shopCart__icon"><image src="../../static/shop/icon-shop-index.png" mode="widthFix"></image></view>
					<view class="toolsBox-shopCart__label">首页</view>
				</view>
				<view class="toolsBox-button">
					<!-- <view class="toolsBox-button__btn" @click="addGoods2Cart()">加入购物车</view> -->
					<view class="toolsBox-button__btn toolsBox-button__btn--full" @click="openPopup('buyPopup')">立即购买</view>
				</view>
			</view>
		</view>
		
		
		<!-- 弹出层 -->
		<uni-popup ref="buyPopup" type="bottom" :animation="true">
			<view class="oppupBox">
				<view class="oppupBox-wrapper">
					<view class="oppupBox-wrapper-content">
						<view class="oppupBox-wrapper-content__image">
							<image :src="goodsInfo.titelPic" mode="" class=""></image>
						</view>
						<view class="oppupBox-wrapper-content__item">
							<view class="oppupBox-wrapper-content__price" v-if="type == 0">{{ goodsInfo.cost }} <text>CNY</text></view>
							<view class="oppupBox-wrapper-content__price" v-if="type == 1">{{ goodsInfo.using }} <text>USDT</text></view>
							<view class="oppupBox-wrapper-content__title">{{ goodsInfo.name }}</view>
						</view>
					</view>
					<view class="oppupBox-wrapper-ways oppupBox-wrapper-ways__border">
						<view class="oppupBox-wrapper-ways__title">购买方式</view>
						<view class="oppupBox-wrapper-ways__title">{{ type == 0 ? 'CNY' : 'USDT' }}购买</view>
					</view>
					<view class="oppupBox-wrapper-ways">
						<view class="oppupBox-wrapper-ways__title">购买数量</view>
						<view class="oppupBox-wrapper-ways__operate">
							<view class="oppupBox-wrapper-ways__operate--minus" @click="minusBtn()"></view>
							<view class="oppupBox-wrapper-ways__operate-quantity">{{ quantity }}</view>
							<view class="oppupBox-wrapper-ways__operate--plus" @click="plusBtn()"></view>
						</view>
					</view>
				</view>
				<view class="initBtn" @click="createOrder()">立即购买</view>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			goodsType: 0, //商品类型(0:积分商品 1:代金券商品)
			goodsId: '',
			goodsInfo: [{name:'凯撒专柜正品 新款女装2021纯色方领桑蚕丝上衣真丝衬衫女装打底衫',inventory:'124532',sellCount:'1212',using:'200'}],
			goodsDetailImageList: [{pic:'../../static/shop/icon-shop-01.png'},{pic:'../../static/shop/icon-shop-02.png'}],
			goodsBanner: [{pic:'../../static/shop/icon-shop-01.png'},{pic:'../../static/shop/icon-shop-02.png'}],
			quantity: 1,
			tabsActive:0,
			cnyToTPD:'',
			usdtToTPD:'',
			cost:'',
			TPDPrice:'',
			usdtPrice:'',
			gPrice:'',
		};
	},
	onLoad(hash) {
		console.log(hash.value1);
		this.goodsId = hash.value1;
		this.type = hash.value2;
	},
	onShow() {
		this.init();
	},
	methods: {
		change() {
			//从评论区域回到顶部
			uni.createSelectorQuery().select(".initHeader-title--content").boundingClientRect(data=>{//目标位置的节点：类或者id
				uni.createSelectorQuery().select(".contentBox").boundingClientRect(res=>{//最外层盒子的节点：类或者id
					uni.pageScrollTo({
						duration: 100,//过渡时间
						scrollTop:data.top + res.top  ,//到达距离顶部的top值
					})
					console.log(data.top + res.top);
					setTimeout(() => {
						this.tabsActive = 0;
					}, 500);
				}).exec()
			}).exec();
		},
		changeTabsActive(index) {
			if(this.tabsActive != index){
				this.tabsActive = index;
				if(index == 1){
					this.change();
				}
			}
		},
		init() {
			this.getDetailsInfo(); //获取商品详情信息
			this.getTPDPrice();
			this.getUSDTCNY();
			this.getComputeRadio();
			// this.getcnyToTPD();
			// this.getusdtToTPD();
		},
		createOrder() {
			if(this.type == 0){
				this.$tools.jump('../shop/shop_confirmOrder',this.goodsId,this.type,this.goodsInfo.titelPic,this.goodsInfo.cost,this.goodsInfo.name,this.quantity,this.goodsInfo.cost/this.TPDPrice/this.usdtPrice/this.gPrice,this.goodsInfo.inventory);
			}else{
				this.$tools.jump('../shop/shop_confirmOrder',this.goodsId,this.type,this.goodsInfo.titelPic,this.goodsInfo.using,this.goodsInfo.name,this.quantity,this.goodsInfo.using/this.TPDPrice/this.gPrice,this.goodsInfo.inventory);
			}
		},
		
		// 获取商品详情信息
		getDetailsInfo() {
			if(this.type == 0){
				this.$Ajax('/search/getProductDetailsInfo',{
						pointProductId: this.goodsId
					},
					res => {
						// console.log('goodsInfo：' + JSON.stringify(res));
						if (res.code == 0) {
							this.goodsInfo = res.obj.detailsInfo;
							this.cost = res.obj.detailsInfo.cost;
							
							let detailsPic = res.obj.detailsInfo.detailsPic;
							this.goodsDetailImageList = detailsPic.split(',')
							// console.log("图片：",this.goodsDetailImageList);
							
							let rotationPic = res.obj.detailsInfo.rotationPic;
							this.goodsBanner = rotationPic.split(',')
							// console.log("轮播图片：",this.goodsBanner);
						}
					}
				);
			}else{
				this.$Ajax('/search/getVoucherProductDetailsInfo',{
						voucherProductId: this.goodsId
					},
					res => {
						// console.log('goodsInfo：' + JSON.stringify(res));
						if (res.code == 0) {
							this.goodsInfo = res.obj.detailsInfo;
							this.using = res.obj.detailsInfo.using;
							
							let detailsPic = res.obj.detailsInfo.detailsPic;
							this.goodsDetailImageList = detailsPic.split(',')
							// console.log("图片：",this.goodsDetailImageList);
							
							let rotationPic = res.obj.detailsInfo.rotationPic;
							this.goodsBanner = rotationPic.split(',')
							// console.log("轮播图片：",this.goodsBanner);
						}
					}
				);
			}
		},
		// 获取TPD兑换USDT价格
		getTPDPrice() {
			this.$Ajax('/front/mine/getTPDPrice', {}, res => {
				if (res.code == 0) {
					this.TPDPrice = res.obj;
				}
			});
		},
		// 获取USDT-CNY价格
		getUSDTCNY() {
			this.$Ajax('/front/mine/getUSDTCNY', {}, res => {
				if (res.code == 0) {
					this.usdtPrice = res.obj;
				}
			});
		},
		// 获取2价格
		getComputeRadio() {
			this.$Ajax('/front/mine/getComputeRadio', {}, res => {
				if (res.code == 0) {
					this.gPrice = res.obj;
				}
			});
		},
		getcnyToTPD() {
			this.$Ajax('/front/order/cnyToTPD', {
				amount : 0
			}, res => {
				if (res.code == 0) {
					this.cnyToTPD = res.obj;
					console.log("结果",this.cnyToTPD);
				}
			});
		},
		getusdtToTPD() {
			this.$Ajax('/front/order/usdtToTPD', {
				amount : 0
			}, res => {
				if (res.code == 0) {
					this.usdtToTPD = res.obj;
					console.log("结果",this.usdtToTPD);
				}
			});
		},
		minusBtn() {
			if (this.quantity > 1) {
				this.quantity--;
			}
		},
		plusBtn() {
			this.quantity++;
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
			if (!e.show) {
			}
		}
	}
};
</script>
<style lang="scss" scoped>
@import '@/common/scss/pages/shop/shop_detail';
</style>
