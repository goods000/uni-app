<template>
	<view class="page contents">
		<view class="user">
			<view class="header_bar">
			<view class="userBox">
				<view class="userBox-image">
					<image src="../../static/public/logo.png" mode="widthFix"></image>
				</view>
				<view class="userBox-name">{{userList.name}}</view>
				<view class="userBox-level">
					<image :src="langType == 'cn' ? '../../static/user/icon-user-noActive--cn.png' : '../../static/user/icon-user-noActive.png'" mode="widthFix" v-if="userList.teamLevel == 0"></image>
					<image :src="langType == 'cn' ? '../../static/user/icon-user-1--cn.png' : '../../static/user/icon-user-1.png'" mode="widthFix" v-if="userList.teamLevel == 1"></image>
					<image :src="langType == 'cn' ? '../../static/user/icon-user-2--cn.png' : '../../static/user/icon-user-2.png'" mode="widthFix" v-if="userList.teamLevel == 2"></image>
					<image :src="langType == 'cn' ? '../../static/user/icon-user-3--cn.png' : '../../static/user/icon-user-3.png'" mode="widthFix" v-if="userList.teamLevel == 3"></image>
					<image :src="langType == 'cn' ? '../../static/user/icon-user-4--cn.png' : '../../static/user/icon-user-4.png'" mode="widthFix" v-if="userList.teamLevel == 4"></image>
					<!-- <view class="userBox-level-vip" v-if="userList.teamLevel == 0">{{ i18n.user.status_01 }}</view>
					<view class="userBox-level-vip" v-if="userList.teamLevel == 1">VIP</view>
					<view class="userBox-level-area" v-if="userList.teamLevel == 2">{{ i18n.user.status_02 }}</view>
					<view class="userBox-level-city" v-if="userList.teamLevel == 3">{{ i18n.user.status_03 }}</view>
					<view class="userBox-level-province" v-if="userList.teamLevel == 4">{{ i18n.user.status_04 }}</view> -->
				</view>
			</view>
			</view>
			
			<view class="userAsset">
				<view class="userAsset-Box">
					<view class="userAsset-Box-header">
						<view class="userAsset-Box-header-title">
							<view class="userAsset-Box-header-title-image">
								<image src="../../static/user/icon-user-a.png" mode="widthFix"></image>
							</view>
							<view class="userAsset-Box-header-name">FPool</view>
						</view>
						<view class="userAsset-Box-header-see">
							<image :src="eyeType ? '../../static/user/icon-user-see.png' : '../../static/user/icon-user-nosee.png'" @click="toggleAssetsInfo()" mode="widthFix"></image>
							<!-- <image src="../../static/user/icon-user-nosee.png" mode="widthFix"></image> -->
						</view>
					</view>
					<view class="userAsset-Box-middle">{{ i18n.user.total_btc }}(BTC)</view>
					<view class="userAsset-Box-data">
						<view class="userAsset-Box-data-item">
							<view class="userAsset-Box-data-item-num">{{ eyeType ? total.totalBtc : '***' | number(4) }}</view>
							<view class="userAsset-Box-data-item-price">≈{{ eyeType ? total.totalUsdt : '***' | number(2) }}USD</view>
						</view>
						<view class="userAsset-Box-data-item">
							<view class="userAsset-Box-data-item-price">{{ i18n.user.total_btc }}(USDT)</view>
							<view class="userAsset-Box-data-item-num_p">{{ eyeType ? total.totalUsdt : '***' | number(4) }}</view>
						</view>
					</view>
					<view class="userAsset-Box-open">
						<image src="../../static/user/icon-user-open.png" mode="widthFix" @click="triggerCollapse()"></image>
					</view>
				</view>
				
				<view class="userAsset-list-box" v-show="navigateFlag">
					<view class="userAsset-list" v-for="(item,index) in assetList" :key="index"
					v-if="item.currencyName == 'FIL' || item.currencyName == 'USDT'" @click="$tools.jump('./assetRecord',item.currencyId,item.currencyName)">
						<view class="userAsset-list-header">
							<view class="userAsset-list-header-title">
								<view class="userAsset-list-header-title-image">
									<image src="../../static/public/FIL.png" mode="widthFix" v-if="item.currencyName == 'FIL'"></image>
									<image src="../../static/public/USDT.png" mode="widthFix" v-if="item.currencyName == 'USDT'"></image>
								</view>
								<view class="userAsset-list-header-name">{{ item.currencyName }}</view>
							</view>
							<view class="userAsset-list-header-see">
								<image src="../../static/public/icon-next.png" mode="widthFix"></image>
							</view>
						</view>
						<view class="userAsset-list-data">
							<view class="userAsset-list-data-item">
								<view class="userAsset-list-data-item-title">{{ i18n.user.using }}</view>
								<view class="userAsset-list-data-item-num">{{ eyeType ? item.using : '***' | number(4) }}</view>
							</view>
							<view class="userAsset-list-data-item">
								<view class="userAsset-list-data-item-title">{{ i18n.user.freeze }}</view>
								<view class="userAsset-list-data-item-num">{{ eyeType ? item.freeze : '***' | number(4) }}</view>
							</view>
							<view class="userAsset-list-data-item">
								<view class="userAsset-list-data-item-title">{{ i18n.user.cny }}(USD)</view>
								<view class="userAsset-list-data-item-num_cny" v-if="item.currencyName == 'FIL'">{{ eyeType ? ((item.using + item.freeze) * item.price) : '***' | number(4) }}</view>
								<view class="userAsset-list-data-item-num_cny" v-if="item.currencyName == 'USDT'">{{ eyeType ? ((item.using + item.freeze)) : '***' | number(4) }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="userBtn">
				<view class="userBtn-btn" @click="$tools.jump('../withdraw/withdraw')">{{ i18n.user.withdraw }}</view>
				<view class="userBtn-btn-chioce" @click="$tools.jump('../recharge/recharge')">{{ i18n.user.recharge }}</view>
			</view>
			
			<view class="userBg">
				<view class="tipsBox">
					<view class="tipsBox-wrapper">
						<view class="tipsBox-title">
							<view class="tipsBox-title__label">{{ i18n.user.list_title_01 }}</view>
						</view>
					</view>
				</view>
				<view class="userBg-list">
					<view class="userBg-list-item" @click="$tools.jump('../community/structure')">
						<view class="userBg-list-item-image">
							<image src="../../static/user/icon-user-01.png" mode="widthFix"></image>
						</view>
						<view class="userBg-list-item-name">{{ i18n.user.list_01 }}</view>
					</view>
					<view class="userBg-list-item" @click="$tools.jump('../community/achievement')">
						<view class="userBg-list-item-image">
							<image src="../../static/user/icon-user-02.png" mode="widthFix"></image>
						</view>
						<view class="userBg-list-item-name">{{ i18n.user.list_02 }}</view>
					</view>
				</view>
			</view>
			<view class="userBg">
				<view class="tipsBox">
					<view class="tipsBox-wrapper">
						<view class="tipsBox-title">
							<view class="tipsBox-title__label">{{ i18n.user.list_title_02 }}</view>
						</view>
					</view>
				</view>
				<view class="userBg-list">
					<view class="userBg-list-item" @click="$tools.jump('../safety/safety')">
						<view class="userBg-list-item-image">
							<image src="../../static/user/icon-user-03.png" mode="widthFix"></image>
						</view>
						<view class="userBg-list-item-name">{{ i18n.user.list_03 }}</view>
					</view>
					<view class="userBg-list-item" @click="$tools.jump('../safety/realName')">
						<view class="userBg-list-item-image">
							<image src="../../static/user/icon-user-00.png" mode="widthFix"></image>
						</view>
						<view class="userBg-list-item-name">{{ i18n.safety.list_01 }}</view>
					</view>
					<view class="userBg-list-item" @click="$tools.noOpen()">
						<view class="userBg-list-item-image">
							<image src="../../static/user/icon-user-04.png" mode="widthFix"></image>
						</view>
						<view class="userBg-list-item-name">{{ i18n.user.list_04 }}</view>
					</view>
					<view class="userBg-list-item" @click="$tools.jump('../purchaseRecords/purchaseRecords')">
						<view class="userBg-list-item-image">
							<image src="../../static/user/icon-user-05.png" mode="widthFix"></image>
						</view>
						<view class="userBg-list-item-name">{{ i18n.user.list_05 }}</view>
					</view>
				</view>
			</view>
			
			<view class="listBox">
				<view class="listBox-wrapper">
					<view class="listBox-plane">
						<view class="listBox-list" @click="$tools.jump('../about/about',1)">
							<view class="listBox-list__icon"><image src="../../static/user/icon-item-01.png" mode="widthFix"></image></view>
							<view class="listBox-list__title">{{ i18n.user.list_06 }}</view>
						</view>
						<view class="listBox-list" @click="$tools.jump('../about/about',2)">
							<view class="listBox-list__icon"><image src="../../static/user/icon-item-02.png" mode="widthFix"></image></view>
							<view class="listBox-list__title">{{ i18n.user.list_07 }}</view>
						</view>
						<view class="listBox-list" @click="$tools.jump('../invite/invite')">
							<view class="listBox-list__icon"><image src="../../static/user/icon-item-03.png" mode="widthFix"></image></view>
							<view class="listBox-list__title">{{ i18n.user.list_08 }}</view>
						</view>
						<view class="listBox-list" @click="$tools.jump('../service/service')">
							<view class="listBox-list__icon"><image src="../../static/user/icon-item-04.png" mode="widthFix"></image></view>
							<view class="listBox-list__title">{{ i18n.user.list_09 }}</view>
						</view>
						<view class="listBox-list" @click="openSource()">
						<!-- <view class="listBox-list"  @click="$tools.jump('../about/about',3)"> -->
							<view class="listBox-list__icon"><image src="../../static/user/icon-item-05.png" mode="widthFix"></image></view>
							<view class="listBox-list__title">{{ i18n.user.list_10 }}</view>
						</view>
						<view class="listBox-list" @click="$tools.jump('../about/about',4)">
							<view class="listBox-list__icon"><image src="../../static/user/icon-item-06.png" mode="widthFix"></image></view>
							<view class="listBox-list__title">{{ i18n.user.list_11 }}</view>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 实名弹框 -->
			<uni-popup ref="realnamePopup" type="center" :animation="true" @change="changePopup($event,'realnamePopup')">
				<view class="oppupBox">
					<view class="oppupBox-title">{{ i18n.user.realNameTitle }}</view>
					<view class="oppupBox-btn">
						<view class="oppupBox-btn-close" @click="close()">{{ i18n.global.cancel }}</view>
						<view class="oppupBox-btn-config" @click="safety()">{{ i18n.user.toRealName }}</view>
					</view>
				</view>
			</uni-popup>
			
			
		</view>
	</view>
</template>

<script>
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue';
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue';
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: { uniCollapse, uniCollapseItem, uniPopup },
		data() {
			return {
				list:[],
				navigateFlag: false,
				total:'',
				assetList:[],
				userList:[],
				authList:[],
				eyeType: true,
				url:'https://filfox.info/zh',
				authStatus:'',
				langType:'',
				
				openLink: ''
			}
		},
		computed: {
			i18n() {
				return this.$t('message');
			}
		},
		onShow() {
			this.langType = uni.getStorageSync('initlanguage');
			let lang = uni.getStorageSync('initlanguage');
			uni.setTabBarItem({
				index: 0,
				text: this.$t('message').tarbar.item_01
			});
			uni.setTabBarItem({
				index: 1,
				text: this.$t('message').tarbar.item_02
			});
			// uni.setTabBarItem({
			// 	index: 2,
			// 	text: this.$t('message').tarbar.item_03
			// });
			uni.setTabBarItem({
				index: 2,
				text: this.$t('message').tarbar.item_04
			});
			uni.setTabBarItem({
				index: 3,
				text: this.$t('message').tarbar.item_05
			});
			 this.navigateFlag = false;
			 this.init();
			 
			 console.log('213213');
		},
		onLoad() {
			var eyeType = uni.getStorageSync('eyeType');
			if (eyeType == '' || eyeType == null || eyeType == undefined) {
				uni.setStorageSync('eyeType', true);
			}
		},
		methods: {
			init(){
				this.getUserList(); 
				this.getTotalList(); 
				this.getOpenUrl();
			},
			getOpenUrl(){
				this.$Ajax(
					'/search/indexContent',
					{
						num: 1,
						type: 3
					},
					res => {
						console.log(JSON.stringify(res));
						if (res.code == 0) {
							this.openLink = res.obj.contentList[0].title;
						}
					}
				);
			},
			// 跳转合作平台
			openSource(){
				plus.runtime.openURL(this.openLink);
			},
			triggerCollapse() {
				this.navigateFlag = !this.navigateFlag;
			},
			toggleAssetsInfo() {
				var eyeType = uni.getStorageSync('eyeType');
				if (eyeType) {
					uni.setStorageSync('eyeType', false);
					this.eyeType = false;
				} else {
					uni.setStorageSync('eyeType', true);
					this.eyeType = true;
				}
			},
			// 获取用户信息
			getUserList() {
				this.$Ajax('/front/user/authInfo', {}, res => {
						if (res.code == 0) {
							this.userList = res.obj.user;
							this.authList = res.obj.auth;
							this.authStatus = res.obj.auth.authStatus;
							this.getRealname(); 
						}
					}
				);
			},
			// 账户总资产(BTC)
			getTotalList() {
				this.$Ajax('/front/miner/assets/total', {}, res => {
						if (res.code == 0) {
							this.total = res.obj;
							this.assetList = res.obj.assetList;
						}
					}
				);
			},
			close() { 
				uni.showTabBar();
				this.hidePopup('realnamePopup');},
			safety() { 
				this.hidePopup('realnamePopup');
				this.$tools.jump('../safety/realName');},
			getRealname() {
				if(this.authStatus === 0 || this.authStatus === 3){
					this.openPopup('realnamePopup');
					uni.hideTabBar();
				}else{
					uni.showTabBar();
				}
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
				if (e.show) {
					uni.hideTabBar();
				} else {
					uni.showTabBar();
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/user/user';
</style>
