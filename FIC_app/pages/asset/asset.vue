<template>
	<view class="pages">
		<view class="asset">
			<view class="asset-box-data" :style="'background-image: url('+ src +')'">
				<view class="asset-tab">
					<view class="asset-tab-list">
						<view class="asset-tab-list-txt" :class="{ 'active': tabsActive == 1 }" @click="changeTabsActive(1)">USDT</view>
						<view class="asset-tab-list-txt" :class="{ 'active': tabsActive == 2 }" @click="changeTabsActive(2)">FIC</view>
					</view>
				</view>
				
				<view class="asset-box-item" v-if="type_c == 'FIC'">
					<view class="asset-box-count" >
						<view class="asset-box-count-title">{{userList.ficNum}}</view>
						<view class="asset-box-count-wei">FIC</view>
					</view>
					<view class="asset-box-count-yue">≈￥{{userList.ficCnyWorth}}</view>
				</view>
				<view class="asset-box-item" v-if="type_c == 'USDT'">
					<view class="asset-box-count" >
						<view class="asset-box-count-title">{{userList.usdtNum}}</view>
						<view class="asset-box-count-wei">USDT</view>
					</view>
					<view class="asset-box-count-yue">≈￥{{userList.usdtCnyWorth}}</view>
				</view>
				
				<view class="asset-box-type">
					<view class="asset-box-addr">{{userList.trxAddress}}</view>
					<view class="asset-box-image" @click="$tools.copy(userList.trxAddress)">
						<image src="../../static/asset/icon-asset-copy.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			
			<!-- 记录 -->
			<view class="asset-mt">
				<view class="asset-big-box">
					<view class="tips_view">
						<view class="tips_view_image">
							<image src="../../static/asset/icon-asset-record.png" mode="widthFix"></image>
						</view>
						<view class="tips-txt">明细记录</view>
						<view class="tips_view_right" @click="$tools.jump('../asset/assetRecord','usdt')" v-if="type_c == 'USDT'">
							<view class="tips_view_right_txt">查看更多</view>
							<view class="tips_view_right_image">
								<image src="../../static/public/icon-next.png" mode="widthFix"></image>
							</view>
						</view>
						<view class="tips_view_right" @click="$tools.jump('../asset/assetRecord','fic')" v-if="type_c == 'FIC'">
							<view class="tips_view_right_txt">查看更多</view>
							<view class="tips_view_right_image">
								<image src="../../static/public/icon-next.png" mode="widthFix"></image>
							</view>
						</view>
					</view>
					<view class="asset-record">
						<view class="initNoData" v-if="list.length == 0">暂无数据</view>
						<view class="asset-record asset-record-height">
							<view class="asset-record-box" v-for="(item, key) in list" :key="key">
								<view class="asset-record-title-box">
									<view class="asset-record-title">{{item.currType.toUpperCase()}}</view>	
									<view v-for="(info, key) in typeList" :key="key">
										<view v-if="info.code == item.sceneType">({{info.value}})</view>
									</view>
								</view>	
								<view class="asset-record-time">{{item.createTime}}</view>
								<view class="asset-record-num" v-if="item.amount < 0">{{item.amount}}</view>
								<view class="asset-record-num chioce" v-else>+{{item.amount}}</view>
							</view>
						</view>
					</view>
				</view>	
			</view>
			
			<!-- 列表 -->
			<!-- <view class="asset-list">
				<view class="asset-list-box" @click="$tools.jump('../recharge/recharge')">
					<view class="asset-list-box-image">
						<image src="../../static/asset/icon-asset-1.png" mode=""></image>
					</view>
					<view class="asset-list-box-title">充币</view>
				</view>
				<view class="asset-list-box" @click="$tools.jump('../withdraw/withdraw')">
					<view class="asset-list-box-image">
						<image src="../../static/asset/icon-asset-2.png" mode=""></image>
					</view>
					<view class="asset-list-box-title">提币</view>
				</view>
				<view class="asset-list-box" @click="$tools.jump('../exchange/exchange')">
					<view class="asset-list-box-image">
						<image src="../../static/asset/icon-asset-3.png" mode=""></image>
					</view>
					<view class="asset-list-box-title">兑换</view>
				</view>
				<view class="asset-list-box" @click="$tools.jump('../transfer/transfer')">
					<view class="asset-list-box-image">
						<image src="../../static/asset/icon-asset-4.png" mode=""></image>
					</view>
					<view class="asset-list-box-title">划转</view>
				</view>
			</view> -->
		
			
			<view class="asset-bottom-btn" v-if="type_c == 'USDT'">
				<view class="asset-bottom-btn-item" @click="$tools.jump('../recharge/recharge')">充币</view>
				<view class="asset-bottom-btn-item" @click="$tools.jump('../withdraw/withdraw')">提币</view>
			</view>
			<view class="asset-bottom-btn" v-else>
				<view class="asset-bottom-btn-item" @click="$tools.noOpen()">充币</view>
				<view class="asset-bottom-btn-item" @click="$tools.noOpen()">提币</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userList:[],
				typeList:[],
				list: [],
				limit:10,
				page:1,
				pages:1,
				tabsActive: 1,
				src: '../../static/asset/icon-asset-02.png',
				type_c:'USDT'
			}
		},
		// onReachBottom() {
		// 	if (this.page >= this.pages) {
		// 		return this.$tools.toast('到底啦');
		// 	} else {
		// 		this.page++;
		// 		this.getList();
		// 	}
		// },
		onShow() {
			this.getUserList();
			this.getList();
			this.tabsActive = 1
			this.changeTabsActive(this.tabsActive)
			this.type_c = 'USDT'
			this.getTypeList(this.type_c);
		},
		methods:{
			changeTabsActive(index) {
				if(this.tabsActive != index){
					this.tabsActive = index;
				}
				if(index == 1){
					this.type_c = 'USDT'
					this.src = '../../static/asset/icon-asset-02.png'
					this.getList(this.type_c) 
				}else{
					this.type_c = 'FIC'
					this.src = '../../static/asset/icon-asset-01.png'
					this.getList(this.type_c) 
				}
			},
			// 获取用户信息
			getUserList() {
				this.$Ajax('/user/info', {}, res => {
						if (res.code == 0) {
							this.userList = res.account
						}
					}
				);
			},
			getTypeList() {
				this.$Ajax('/dict/flow', {
					limit: this.limit,
					page: this.page
				}, res => {
						if (res.code == 0) {
							this.typeList = res.list
						}
					}
				);
			},
			getList(type_c) {
				this.$Ajax('/accountLog/page', {
					limit: this.limit,
					page: this.page,
					currType:this.type_c
				}, res => {
						if (res.code == 0) {
							this.list = res.page.list
						}
					}
				);
			}
		}
	}
</script>

<style>
	@import '@/common/css/style.css';
	.header{background: none;}
</style>
