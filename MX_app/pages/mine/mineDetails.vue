<template>
	<view class="pages">
		<view class="mine">
			<view class="header_bar header_bg">
				<view class="mine-top-bg">
					<view class="header">
						<view class="header-back" @click="$tools.back(1)"></view>
						<view class="header-title">智能合约挖矿</view>
					</view> 
				</view> 
			</view> 
			<view class="mine-box">
				<view class="mine-list">
					<view class="mine-group">
						<view class="mine-title">
							<view class="mine-title-left">
								<view class="mine-title-iamge">
									<image src="../../static/mine/icon-mine-1.png" mode=""></image>
								</view>
								<view class="mine-title-name">{{ mineListDetails.gradeName }}</view>
							</view>
						</view>
						<view class="buy-details">
							<view class="buy-details-box">
								<view class="buy-details-date">{{ mineListDetails.interestScale }}</view>
								<view class="buy-details-date date">%</view>
							</view>
							<view class="buy-details-title">智能合约静态收益</view>
						</view>
						<view class="mine-title-data buy-details-bg">
							<view class="mine-title-data-l">
								<view class="mine-title-data-item">{{ mineListDetails.giveNum }}</view>
								<view class="mine-title-data-item">存币数量(MMX)</view>
							</view>
							<view class="mine-title-data-l">
								<view class="mine-title-data-item">{{ mineListDetails.reachNum }}</view>
								<view class="mine-title-data-item">消耗(SLC)</view>
							</view>
							<view class="mine-title-data-l">
								<view class="mine-title-data-item">{{ mineListDetails.unlockTime }}</view>
								<view class="mine-title-data-item">存币天数</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		
			<view class="buy-details-bottom">
				<view class="buy-details-tips">
					<view class="buy-details-tips-title">智能合约注意：</view>
					<view class="buy-details-tips-content">智能合约基金存币天数为{{ mineListDetails.unlockTime }}天，智能合约{{ mineListDetails.unlockTime }}天结算后，4天后才可再次购买智能合约基金在存币期间不能再次存其它级别币量。</view>
				</view>
				
				<view class="btn-active" @click="buy()">购买</view>
			</view>
		</view>
		
		<!-- 失败弹框 -->
		<uni-popup ref="failPopup" type="center" :animation="true">
			<view class="oppup-box">
				<view class="fail-image">
					<image src="../../static/mine/icon-mine-fail.png" mode="widthFix"></image>
				</view>
				<view class="fila-title">购买失败</view>
				<view class="fila-content">智能合约结算时间未到，暂时无法购买基金。</view>
				<view class="btn-active" @click="hidePopup('failPopup')">确定</view>
			</view>
			<view class="fila-close">
				<image src="../../static/mine/icon-mine-close.png" mode="widthFix" @click="hidePopup('failPopup')"></image>
			</view>
		</uni-popup>
		
		<!-- 交易密码验证 -->
		<!-- <uni-popup ref="tradePswPopup" type="center" :animation="true" @change="changePopup">
			<view class="initPopup">
				<view class="initPopup-wrapper">
					<view class="initPopup-title">请输入交易密码</view>
					<view class="initPopup-listBox">
						<view class="initPopup-listBox__list">
							<view class="initPopup-listBox__list-input">
								<input type="password" placeholder-class="initPopup-listBox__list-placeholder" placeholder="请输入交易密码" v-model="pay_password" />
							</view>
						</view>
					</view>
					<view class="initPopup-buttonBox">
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--cancel" @click="hidePopup('tradePswPopup')">取消</view>
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--confirm" @click="submitBuy()">确定</view>
					</view>
				</view>
			</view>
		</uni-popup> -->
		
		<!-- 购买基金弹框 -->
		<uni-popup ref="pswPopup" type="center" :animation="true">
			<view class="popupMain">
				<view class="popup-close">
					<image src="../../static/public/icon-popup-close.png" mode="widthFix"  @click="hidePopup('pswPopup')"></image>
				</view>
				<view class="popupBox">
					<view class="popup-Header">购买基金</view>
				</view>
				<view class="popupPrice">{{ mineListDetails.reachNum }}</view>
				<view class="popupCompany">(SLC)</view>
				<view class="popupData">可用余额：{{userList.slcNum}}(SLC）</view>
				<view class="popup-input">
					<input type="password" maxlength="6"  placeholder="" class="pwdInput" id="pwdInput" autofocus focus v-model="pay_password" >
					<view class="fakeBox">
						<input type="text" disabled="disabled">
						<input type="text" disabled="disabled">
						<input type="text" disabled="disabled">
						<input type="text" disabled="disabled">
						<input type="text" disabled="disabled">
						<input type="text" disabled="disabled">
					</view>
				</view>
				<view class="popup-btn">
					<view class="popup-btn-confirm" @click="submitBuy()">确定</view>
				</view>
			</view>
		</uni-popup>	
		
	</view>
</template>

<script>
	import md5 from '../../common/js/md5.js';
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: { uniPopup },
		data() {
			return {
				id: '',
				pay_password: '',
				mineListDetails: {},
				userList:[]
			}
		},
		onLoad(value1) {
			this.id = value1.value1;
			this.getMineDetails();
			this.getUserList()
		},
		methods: {
			getMineDetails() {
				this.$Ajax('/grade/info/'+ this.id, {}, res => {
						if (res.code == 0) {
							this.mineListDetails = res.item
						}
					}
				);
			},
			buy() {
				// this.openPopup('failPopup');
				this.openPopup('pswPopup');
				// this.openPopup('tradePswPopup');
			},
			submitBuy(){
				if(this.pay_password == ''){
					return this.$tools.toast('交易密码不能为空');
				}
				this.$Ajax('/lock/lock', 
				{
					level : this.mineListDetails.grade,
					payPassword : md5(this.pay_password).toString(),
				}, res => {
						if (res.code == 0) {
							this.pay_password ='',
							this.$tools.toast(res.msg);
							this.hidePopup('pswPopup');
						}
					}
				);
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
					this.pay_password = '';
				}
			}
		}
	};
</script>

<style>
	@import '@/common/css/style.css';
	.header{background: none !important;}
	.mine .mine-box .mine-list .mine-group .mine-title{padding: 10px;}
	.mine .mine-box .mine-list .mine-group{padding: 0;}
	.mine .mine-top-bg{background: linear-gradient(to bottom, #2048E3,#3D64FF) !important;padding-top: 0 !important;}
	.mine .mine-box{margin-top: -45%;}
</style>
