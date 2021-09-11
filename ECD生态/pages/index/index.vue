<template>
	<view class="pages">
		<view class="header_bar header_white">
			<view class="header">
				<view class="header-title">
					<image src="../../static/index/icon-index-logo.png" mode="widthFix"></image>
				</view>
			</view> 
		</view> 
		
		<view class="main">
			<!-- 轮播图 -->
			<uni-swiper-dot :info="slideList" :current="swiperCurrent" :mode="dotsMode" :dotsStyles="dotsStyles">
				<view class="swiperBox">
					<view class="swiperBox-wrapper">
						<swiper
							:indicator-dots="false"
							:autoplay="true"
							:interval="2500"
							:duration="1000"
							:circular="true"
							class="swiperBox-swiper"
							@change="changeSwiper"
							:disable-touch="slideList.length <= 1"
						>
							<swiper-item class="swiperBox-swiper__item" v-for="(item, index) in slideList" :key="index">
								<image :src="item.path" mode="widthFix"></image>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</uni-swiper-dot>
			
			<!--  -->
			<view class="indexBox">
				<view class="initTilte">
					<view class="initTilte-title">ECD COMM</view><view class="initTilte-tips">UNITY</view>
				</view>
				<view class="indexBox-title">Blockchain community ecological operation</view>
				<view class="indexBox-image">
					<image src="../../static/index/icon-index-01.png" mode="widthFix" @click="$tools.jump('../information/information')"></image>
					<image src="../../static/index/icon-index-02.png" mode="widthFix" @click="$tools.switchTab('../exchange/exchange')"></image>
				</view>
				
				<view class="indexBox-header">
					<view class="indexBox-header__image">
						<image src="../../static/index/icon-index-tips.png" mode="widthFix"></image>
					</view>
					<view class="indexBox-header__title">生态家园</view>
					<view class="indexBox-header__more">
						<image src="../../static/index/icon-index-more.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			
			<view class="dynamic">
				<view class="initNoData" v-if="newsList.length == 0"></view>
				<view class="dynamic-wrapper newsList" v-for="(item,index) in newsList" :key="index">
					<view class="newsList-header">
						<view class="newsList-header__image" @click="into_myCircle(item.friedndUserName)">
							<image :src="item.headImg" mode=""></image>
						</view>
						<view class="newsList-header__name">{{item.friedndUserName}}</view>
						<image v-if="item.isOwn == 1" @click="getdelFriendMoments(item.fcmid)" class="newsList-header__delete" src="../../static/public/icon-delete.png" mode="widthFix"></image>
					</view>
					<view class="newsList-box">
						<view class="newsList-box__title">{{item.content}}</view>
						<view class="newsList-box__imageList" v-if="item.picture != ''">
							<view class="newsList-box__imageList-imageBox" v-for="(sub,key) in item.picture" :key="key">
								<image :src="sub" mode="" @tap="previewImage" :data-url="sub"
								></image>
								<!-- @click="$tools.previewImage(sub)" -->
							</view>
						</view>
					</view>
					<view class="newsList-operate">
						<view class="newsList-operate__time">
							<image src="../../static/index/icon-index-time.png" mode="widthFix"></image>
							<view class="newsList-operate__time-title">{{item.createTime}}</view>
						</view>
						<!-- <view class="newsList-operate__like" v-if="item.isOwn == 1" @click="submit(item.id)">
						<view class="newsList-operate__like" v-else @click="close(item.id)"> -->
						<view class="newsList-operate__like" @click="submit(index)">
							<image :src="item.userGit == false ? '../../static/public/icon-unlike.png' : '../../static/public/icon-like.png'" mode="widthFix"></image>
							<view class="newsList-operate__like-title" :class="{'newsList-operate__like-title--active' : item.userGit != false}">{{item.gitCount}}</view>
						</view>
					</view>
				</view>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue';
	export default {
		components: { uniSwiperDot },
		data() {
			return {
				// 容器
				slideList: [{path:'../../static/index/icon-banner.png'},{path:'../../static/index/icon-banner.png'},{path:'../../static/index/icon-banner.png'}],
				// swiper
				swiperCurrent: 0,
				dotsMode: 'default',
				dotsStyles: {
					bottom: 5,
					backgroundColor: 'transparent',
					selectedBackgroundColor: 'transparent'
				},
				newsList:[
					// {friNickName:'大王叫我来挖矿',content:'今天在Richelieu Rock潜水， 好累，但是很开心~',imageList:[{image:'../../static/pack/logo.png'},{image:'../../static/pack/logo.png',name:'1111'},{image:'../../static/pack/logo.png'}],createTime:'2021.07.27 20:07',num:"124",flag:'0'},
					// {friNickName:'两广专业炒币~',content:'两天都在海边吹风，温暖的风夹杂这淡淡的海盐 味，这也许就是夏天的味道',imageList:[{image:'../../static/pack/logo.png'},{image:'../../static/pack/logo.png'}],createTime:'2021.07.27 18:54',num:"104",flag:'1'},
					// {friNickName:'大王叫我来挖矿',content:'今天在Richelieu Rock潜水， 好累，但是很开心~',imageList:[{image:'../../static/pack/logo.png'}],createTime:'2021.07.27 20:07',num:"124",flag:'0'},
					// {friNickName:'大王叫我来挖矿',content:'今天在Richelieu Rock潜水， 好累，但是很开心~',imageList:[{image:'../../static/pack/logo.png'},{image:'../../static/pack/logo.png',name:'1111'},{image:'../../static/pack/logo.png'},{image:'../../static/pack/logo.png',name:'1111'},{image:'../../static/pack/logo.png'},{image:'../../static/pack/logo.png',name:'1111'}],createTime:'2021.07.27 20:07',num:"124",flag:'0'},
					// {friNickName:'大王叫我来挖矿',content:'今天在Richelieu Rock潜水， 好累，但是很开心~',imageList:[{image:'../../static/pack/logo.png'},{image:'../../static/pack/logo.png',name:'1111'},{image:'../../static/pack/logo.png',name:'1111'},{image:'../../static/pack/logo.png'},{image:'../../static/pack/logo.png',name:'1111'},{image:'../../static/pack/logo.png'},{image:'../../static/pack/logo.png',name:'1111'},{image:'../../static/pack/logo.png'},{image:'../../static/pack/logo.png',name:'1111'}],createTime:'2021.07.27 20:07',num:"124",flag:'0'},
				],
				picture:[],
				// 分页
				pages: 1, //总页数
				pageNum: 1, //当前页数
				pageSize: 20 //请求记录
			}
		},
		onShow() {
			this.init();
		},
		methods: {
			init(){
				// this.newsList = [];
				this.getSlideList(); //轮播图
				this.getFriendDetail(); //获取用户的朋友圈
			},
			// 轮播图
			getSlideList() {
				this.$Ajax('/search/indexSlides', {}, res => {
					if (res.code == 0) {
						this.slideList = res.obj;
					}
				});
			},
			// 获取用户的朋友圈
			getFriendDetail() {
				this.$Ajax('/front/friend/getFriendDetail', {
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}, res => {
					if (res.code == 0) {
						this.newsList = res.obj.data;
						res.obj.data.forEach((item,index) => {
							if(item.picture != null){
								let picture = item.picture;
								item.picture = picture.split(',');
							}
						})
					}
				});
			},
			// 点赞朋友圈
			submit(index) {
				// this.newsList = [];
				this.$Ajax('/front/friend/friendGitLike', {
					id: this.newsList[index].fcmid,
				}, res => {
					if (res.code == 0) {
						this.newsList[index].userGit = !this.newsList[index].userGit;
						this.newsList[index].gitCount = this.newsList[index].gitCount +  (this.newsList[index].userGit ? 1 : - 1);
						// if(this.newsList[index].userGit){
						// 	this.newsList[index].userGit = false;
						// 	this.newsList[index].gitCount = this.newsList[index].gitCount - 1;
						// }else{
						// 	this.newsList[index].userGit = true;
						// 	this.newsList[index].gitCount = this.newsList[index].gitCount + 1;
						// }
						console.log("fcmid",this.newsList[index].fcmid,"点赞成功");
					}
				});
			},
			// 删除朋友圈
			getdelFriendMoments(id) {
				this.$Ajax('/front/friend/delFriendMoments', {
					id: id,
				}, res => {
					if (res.code == 0) {
						this.$tools.toast('删除成功');
						this.getFriendDetail();
					}
				});
			},
			// 查看朋友个人信息
			into_myCircle(type){
				var myUsername = uni.getStorageSync('myUsername');
				this.hxUuid = uni.getStorageSync('myUuid');
				this.img = uni.getStorageSync('img');
				console.log("type",type,myUsername);
				if(type == myUsername){
					this.$tools.jump('../myCircle/myCircle',this.img,myUsername,this.hxUuid);
				}else{
					this.$tools.jump('../chat/myCircle',myUsername,type);
				}
			},
			// 查看图片
			// previewImage(index) {
			//   let pictureList = this.picture.map(item => {
			// 	  return item.sub;
			//   });
			//   uni.previewImage({
			//     current: index,     // 当前显示图片的链接/索引值
			// 	urls: pictureList,    // 需要预览的图片链接列表，photoList要求必须是数组
			// 	loop:true   // 是否可循环预览
			//   });
			// },
			previewImage(event) {
			  var url = event.target.dataset.url;
			  uni.previewImage({
			    urls: [url], // 需要预览的图片 http 链接列表
				loop: "true",   // 是否可循环预览
			  });
			},
			changeSwiper(e) {
				this.swiperCurrent = e.detail.current;
			},
		}
	}
</script>

<style lang="scss" scoped>
@import '/scss/index';
</style>
