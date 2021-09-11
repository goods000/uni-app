<template>
	<view class="page contents">
		<view class="user">
			<view class="header_bar">
			<view class="userBox">
				<view class="userBox-image">
					<image src="../../static/pack/logo.png" mode="widthFix"></image>
				</view>
				<view class="userBox-newBox">
					<view class="userBox-name">{{userList.name}}</view>
					<view class="userBox-inviteCode">邀请码: {{userList.inviteCode}}</view>
				</view>
				<view class="userBox-level">
					<image src="../../static/user/icon-level.png" mode="widthFix" v-if="activ == 1" class="userBox-level--activ"></image>
					<image src="../../static/user/icon-level-1.png" mode="widthFix" v-if="userList.teamLevel == 1" class="userBox-level--team"></image>
					<image src="../../static/user/icon-level-2.png" mode="widthFix" v-if="userList.teamLevel == 2" class="userBox-level--team"></image>
					<image src="../../static/user/icon-level-3.png" mode="widthFix" v-if="userList.teamLevel == 3" class="userBox-level--team"></image>
					
					<image src="../../static/user/icon-node-1.png" mode="widthFix" v-if="userList.ventureLevel == 1" class="userBox-level--team"></image>
					<image src="../../static/user/icon-node-2.png" mode="widthFix" v-if="userList.ventureLevel == 2" class="userBox-level--team"></image>
					<image src="../../static/user/icon-node-3.png" mode="widthFix" v-if="userList.ventureLevel == 3" class="userBox-level--team"></image>
					
					<!-- <view class="userBox-level-vip" v-if="userList.teamLevel == 0">暂无</view>
					<view class="userBox-level-vip" v-if="userList.teamLevel == 1">VIP</view>
					<view class="userBox-level-area" v-if="userList.teamLevel == 2">代理商</view>
					<view class="userBox-level-city" v-if="userList.teamLevel == 3">运营中心</view>
					<view class="userBox-level-province" v-if="userList.teamLevel == 4">分公司</view> -->
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
							<view class="userAsset-Box-header-name">星河</view>
						</view>
						<view class="userAsset-Box-header-see">
							<image :src="eyeType ? '../../static/user/icon-user-see.png' : '../../static/user/icon-user-nosee.png'" @click="toggleAssetsInfo()" mode="widthFix"></image>
							<!-- <image src="../../static/user/icon-user-nosee.png" mode="widthFix"></image> -->
						</view>
					</view>
					<view class="userAsset-Box-middle">账户资产总折合(BTC/USDT)</view>
					<view class="userAsset-Box-data">
						<view class="userAsset-Box-data-item">
							<view class="userAsset-Box-data-item-num">{{ eyeType ? total.totalBtc : '***' | number(4) }}/{{ eyeType ? total.totalUsdt : '***' | number(4) }}</view>
							<view class="userAsset-Box-data-item-price">≈ {{ eyeType ? (total.usdtPrice * total.totalUsdt ) : '***' | number(2) }} CNY</view>
						</view>
						<!-- <view class="userAsset-Box-data-item">
							<view class="userAsset-Box-data-item-price">账户资产总折合(USDT)</view>
							<view class="userAsset-Box-data-item-num_p">{{ eyeType ? total.totalUsdt : '***' | number(4) }}</view>
						</view> -->
					</view>
					<view class="userAsset-Box-open" :class="navigateFlag ? 'userAsset-Box-open--active' : ''">
						<image src="../../static/user/icon-user-open.png" mode="widthFix" @click="triggerCollapse()"></image>
					</view>
				</view>
				
				<view class="userAsset-list-box" v-show="navigateFlag">
					<view class="userAsset-list" v-for="(item,index) in assetList" :key="index"
					@click="$tools.jump('./assetRecord',item.currencyId,item.currencyName,item.using,item.freeze,item.price,total.usdtPrice,item.cpic)">
						<view class="userAsset-list-header">
							<view class="userAsset-list-header-title">
								<view class="userAsset-list-header-title-image">
									<image :src="item.cpic" mode="widthFix"></image>
								</view>
								<view class="userAsset-list-header-name">{{ item.currencyName }}</view>
							</view>
							<view class="userAsset-list-header-see">
								<image src="../../static/public/icon-next.png" mode="widthFix"></image>
							</view>
						</view>
						<view class="userAsset-list-data">
							<view class="userAsset-list-data-item">
								<view class="userAsset-list-data-item-title">可用</view>
								<view class="userAsset-list-data-item-num">{{ eyeType ? item.using : '***' | number(4) }}</view>
							</view>
							<view class="userAsset-list-data-item">
								<view class="userAsset-list-data-item-title">冻结</view>
								<view class="userAsset-list-data-item-num">{{ eyeType ? item.freeze : '***' | number(4) }}</view>
							</view>
							<view class="userAsset-list-data-item">
								<view class="userAsset-list-data-item-title">折合(CNY)</view>
								<view class="userAsset-list-data-item-num_cny" v-if="item.currencyName == 'LM'">{{ eyeType ? ((item.using + item.freeze) / item.price * total.usdtPrice) : '***' | number(4) }}</view>
								<view class="userAsset-list-data-item-num_cny" v-else>{{ eyeType ? ((item.using + item.freeze) * item.price * total.usdtPrice) : '***' | number(4) }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="userBtn">
				<view class="userBtn-btn" @click="$tools.jump('../withdraw/withdraw')">提 币</view>
				<view class="userBtn-btn-chioce" @click="$tools.jump('../recharge/recharge')">充 币</view>
			</view>
			
			<view class="userBg">
				<view class="tipsBox">
					<view class="tipsBox-wrapper">
						<view class="tipsBox-title">
							<view class="tipsBox-title__label">我的团队</view>
						</view>
					</view>
				</view>
				<view class="userBg-list">
					<view class="userBg-list-item" @click="$tools.jump('../community/structure')">
						<view class="userBg-list-item-image">
							<image src="../../static/user/icon-user-01.png" mode="aspectFit"></image>
						</view>
						<view class="userBg-list-item-name">社区结构</view>
					</view>
					<view class="userBg-list-item" @click="$tools.jump('../community/achievement',userList.teamLevel,userList.ventureLevel)">
						<view class="userBg-list-item-image">
							<image src="../../static/user/icon-user-02.png" mode="aspectFit"></image>
						</view>
						<view class="userBg-list-item-name">社区业绩</view>
					</view><view class="userBg-list-item" @click="$tools.jump('../pool/pool')">
						<view class="userBg-list-item-image">
							<image src="../../static/user/icon-user-07.png" mode="aspectFit"></image>
						</view>
						<view class="userBg-list-item-name">激励池</view>
					</view>
				</view>
			</view>
			<view class="userBg">
				<view class="tipsBox">
					<view class="tipsBox-wrapper">
						<view class="tipsBox-title">
							<view class="tipsBox-title__label">账户管理</view>
						</view>
					</view>
				</view>
				<view class="userBg-list">
					<view class="userBg-list-item" @click="$tools.jump('../safety/safety')">
						<view class="userBg-list-item-image">
							<image src="../../static/user/icon-user-03.png" mode="aspectFit"></image>
						</view>
						<view class="userBg-list-item-name">安全中心</view>
					</view>
					<view class="userBg-list-item" @click="$tools.jump('../account/account')">
						<view class="userBg-list-item-image">
							<image src="../../static/user/icon-user-06.png" mode="aspectFit"></image>
						</view>
						<view class="userBg-list-item-name">账户设置</view>
					</view>
					<!-- <view class="userBg-list-item" @click="$tools.noOpen()"> -->
					<view class="userBg-list-item" @click="$tools.jump('../purchaseRecords/purchaseRecords')">
						<view class="userBg-list-item-image">
							<image src="../../static/user/icon-user-04.png" mode="aspectFit"></image>
						</view>
						<view class="userBg-list-item-name">创投记录</view>
					</view>
					<!-- <view class="userBg-list-item" @click="$tools.noOpen()"> -->
					<view class="userBg-list-item" @click="$tools.jump('../product/records')">
						<view class="userBg-list-item-image">
							<image src="../../static/user/icon-user-05.png" mode="aspectFit"></image>
						</view>
						<view class="userBg-list-item-name">购买记录</view>
					</view>
				</view>
			</view>
			
			<view class="listBox">
				<view class="listBox-wrapper">
					<view class="listBox-plane">
						<view class="listBox-list" @click="$tools.jump('../about/about',4)">
							<view class="listBox-list__icon"><image src="../../static/user/icon-item-06.png" mode="widthFix"></image></view>
							<view class="listBox-list__title">公司简介</view>
						</view>
						<view class="listBox-list" @click="$tools.jump('../about/about',1)">
							<view class="listBox-list__icon"><image src="../../static/user/icon-item-00.png" mode="widthFix"></image></view>
							<view class="listBox-list__title">币种简介</view>
						</view>
						<view class="listBox-list" @click="$tools.jump('../about/about',2)">
							<view class="listBox-list__icon"><image src="../../static/user/icon-item-02.png" mode="widthFix"></image></view>
							<view class="listBox-list__title">矿机信息</view>
						</view>
						<view class="listBox-list" @click="$tools.jump('../invite/invite')">
							<view class="listBox-list__icon"><image src="../../static/user/icon-item-03.png" mode="widthFix"></image></view>
							<view class="listBox-list__title">邀请好友</view>
						</view>
						<!-- <view class="listBox-list" @click="$tools.noOpen()"> -->
						<view class="listBox-list" @click="$tools.jump('../workOrder/workOrder')">
							<view class="listBox-list__icon"><image src="../../static/user/icon-item-04.png" mode="widthFix"></image></view>
							<view class="listBox-list__title">专属工单</view>
						</view>
						<!-- <view class="listBox-list"  @click="openSource()"> -->
						<view class="listBox-list"  @click="$tools.jump('../user/platform')">
							<view class="listBox-list__icon"><image src="../../static/user/icon-item-05.png" mode="widthFix"></image></view>
							<view class="listBox-list__title">合作平台</view>
						</view>
						
					</view>
				</view>
			</view>
			
			<!-- 实名弹框 -->
			<uni-popup ref="realnamePopup" type="center" :animation="true" @change="changePopup($event,'realnamePopup')">
				<view class="oppupBox">
					<view class="oppupBox-title">你还没有实名认证,请先进行实名认证！</view>
					<view class="oppupBox-btn">
						<view class="oppupBox-btn-close" @click="close()">取消</view>
						<view class="oppupBox-btn-config" @click="safety()">去认证</view>
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
				assetList:[
					{currencyId:1,currencyName:'USDT',using:'1000',freeze:'20',price:'222',usdtPrice:'6.5'},
					{currencyId:2,currencyName:'FIL',using:'1000',freeze:'20',price:'222',usdtPrice:'6.5'},
					{currencyId:3,currencyName:'ETH',using:'1000',freeze:'20',price:'222',usdtPrice:'6.5'},
				],
				userList:[
					{name:'test',teamLevel:2},
				],
				eyeType: true,
				url:'https://filfox.info/zh',
				activ:'',
				authStatus:'',
			}
		},
		onShow() {
			 this.navigateFlag = false;
			 this.init();
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
				this.getUserAuthInfo(); 
			},
			// 跳转合作平台
			openSource(){
				this.$Ajax(
					'/search/indexContent',
					{
						num: 1,
						type: 3
					},
					res => {
						if (res.code == 0) {
							this.url = res.obj.contentList;
						}
					}
				);
				console.log(this.url);
				plus.runtime.openURL(this.url, function(res) {  
					console.log(res);  
				});  
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
				this.$Ajax('/front/userPassphrase/baseInfo', {}, res => {
						if (res.code == 0) {
							this.userList = res.obj;
							this.activ = res.obj.activ;
						}
					}
				);
			},
			// 账户总资产(BTC)
			getTotalList() {
				this.$Ajax('/front/userPassphrase/assets/total', {}, res => {
						if (res.code == 0) {
							this.total = res.obj;
							this.assetList = res.obj.assetList;
						}
					}
				);
			},
			// 获取用户信息
			getUserAuthInfo() {
				this.$Ajax('/front/userPassphrase/userAuthInfo', {}, res => {
						if (res.code == 0) {
							this.authStatus = res.obj.authStatus;
							this.getRealname(); 
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
