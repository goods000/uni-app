<template>
	<view class="pages">
		<view class="bgBox"></view>
		<view class="main">
			<view class="logoBox"><image src="../../static/index/icon-logo.png" mode="widthFix"></image></view>

			<view class="titleBox">
				<view class="titleBox-wrapper">
					<view class="titleBox-image"><image src="../../static/index/icon-title.png" mode="widthFix"></image></view>
				</view>
			</view>

			<view class="infoBox">
				<view class="infoBox-wrapper">
					<view class="infoBox-title">BGF交易所</view>
					<view class="infoBox-desc">上线即为公链 ,发行量1.9亿,首发1000万枚，剩下的靠挖矿产出26年</view>
				</view>
			</view>

			<view class="operateBox">
				<view class="operateBox-wrapper">
					<view class="operateBox-button" v-if="!isLogin">
						<view class="operateBox-button__btn operateBox-button__btn--blue" @click="openPopup('loginPopup')">账号登录</view>
						<view class="operateBox-button__btn operateBox-button__btn--white" @click="openPopup('registerPopup')">欢迎注册</view>
					</view>
					<view class="operateBox-user" v-if="isLogin">
						<view class="operateBox-message">您好，{{ gobalUser }}</view>
						<view class="operateBox-invite" @click="$tools.copy(inviteCode)">邀请码：{{ inviteCode }}</view>
					</view>
					<view class="operateBox-linkBtn" v-if="isLogin">
						<view class="operateBox-linkBtn__btn" @click="openRechargeRecord()">充值记录</view>
						<view class="operateBox-linkBtn__btn" @click="openNodeRecord()">抢购记录</view>
						<view class="operateBox-linkBtn__btn" @click="logout()">退出登录</view>
					</view>
				</view>
			</view>

			<view class="stepBox">
				<view class="stepBox-wrapper">
					<view class="stepBox-image"><image src="../../static/index/icon-step.png" mode="widthFix"></image></view>
				</view>
			</view>

			<view class="subTitleBox">
				<view class="subTitleBox-wrapper">
					<view class="subTitleBox-image"><image src="../../static/index/icon-subTitle-01.png" mode="widthFix"></image></view>
					<view class="subTitleBox-desc">注册登录后，在页面充值入金，获得节点抢购资格</view>
					<view class="subTitleBox-list">
						<view class="subTitleBox-label">已充值人数：{{ rechargeCount }}</view>
						<view class="subTitleBox-linkBtn" @click="openRechargeRecord()">充值记录</view>
					</view>
				</view>
			</view>

			<view class="cardBox">
				<view class="cardBox-wrapper">
					<view class="cardBox-item">
						<view class="cardBox-item__title">充值ERC-20</view>
						<view class="cardBox-item__code"><image :src="isLogin ? ercImage : '../../static/index/img-qrcode.jpg'" mode="widthFix"></image></view>
						<view class="cardBox-item__btn" @click="$tools.copy(ercAddress)">复制地址</view>
					</view>
					<view class="cardBox-item">
						<view class="cardBox-item__title">充值TRC-20</view>
						<view class="cardBox-item__code"><image :src="isLogin ? trcImage : '../../static/index/img-qrcode.jpg'" mode="widthFix"></image></view>
						<view class="cardBox-item__btn" @click="$tools.copy(trcAddress)">复制地址</view>
					</view>
				</view>
			</view>

			<view class="addressBox" v-if="isLogin">
				<view class="addressBox-wrapper">
					<view class="addressBox-list">
						<view class="addressBox-list__label">*ERC-20地址</view>
						<view class="addressBox-list__data">{{ ercAddress }}</view>
					</view>
					<view class="addressBox-list">
						<view class="addressBox-list__label">*TRC-20地址</view>
						<view class="addressBox-list__data">{{ trcAddress }}</view>
					</view>
				</view>
			</view>

			<view class="stepBox">
				<view class="stepBox-wrapper">
					<view class="stepBox-image"><image src="../../static/index/icon-step.png" mode="widthFix"></image></view>
				</view>
			</view>

			<view class="subTitleBox">
				<view class="subTitleBox-wrapper">
					<view class="subTitleBox-image"><image src="../../static/index/icon-subTitle-02.png" mode="widthFix"></image></view>
					<view class="subTitleBox-desc">每个账户入金后有一次抢购资格，未成功抢购不消耗资格次数</view>
					<view class="subTitleBox-list">
						<!-- <view class="subTitleBox-label">剩余抢购资格：1</view> -->
						<view class="subTitleBox-linkBtn" @click="openNodeRecord()">抢购记录</view>
					</view>
				</view>
			</view>

			<view class="nodeBox">
				<view class="nodeBox-wrapper">
					<view class="nodeBox-header">
						<view class="nodeBox-date">抢购时间：{{ nodeInfo.time }}</view>
					</view>
					<view class="nodeBox-content">
						<view class="nodeBox-itemBox">
							<view class="nodeBox-itemBox__item">节点价格：{{ nodeInfo.price | number(4) }} USDT</view>
							<!-- <view class="nodeBox-itemBox__item">节点数量：20</view> -->
						</view>

						<view class="nodeBox-subTitle">抢购进度</view>

						<!-- <view class="nodeBox-progress"><view class="nodeBox-progress__bar" :style="'width: 400upx'"></view></view> -->

						<view class="nodeBox-itemBox">
							<!-- <view class="nodeBox-itemBox__item">抢购人数：{{ nodeInfo.queueCount }}</view> -->
							<view class="nodeBox-itemBox__item">已抢购人数：{{ nodeInfo.buyCount }}</view>
						</view>

						<view class="nodeBox-btn" @click="openPopup('tradePopup')">我要抢购</view>
					</view>
				</view>
			</view>

			<view class="footerBox">
				<view class="footerBox-wrapper">
					<view class="footerBox-image"><image src="../../static/index/icon-footer.png" mode="widthFix"></image></view>
				</view>
			</view>
		</view>

		<!-- 登录 -->
		<uni-popup ref="loginPopup" type="center" :maskClick="false" :animation="true" @change="changePopup">
			<view class="centerModal">
				<view class="centerModal-wrapper">
					<view class="centerModal-close" @click="hidePopup('loginPopup')"></view>
					<view class="centerModal-title">欢迎登录</view>
					<view class="centerModal-listBox">
						<view class="centerModal-listBox__list">
							<view class="centerModal-listBox__list-label">账号</view>
							<view class="centerModal-listBox__list-input">
								<input type="text" placeholder-class="centerModal-listBox__list-placeholder" placeholder="请输入登录手机号/邮箱" v-model="loginPhone" />
							</view>
						</view>
						<view class="centerModal-listBox__list">
							<view class="centerModal-listBox__list-label">密码</view>
							<view class="centerModal-listBox__list-input">
								<input type="password" placeholder-class="centerModal-listBox__list-placeholder" placeholder="请输入密码" v-model="loginPsw" />
							</view>
						</view>
						<view class="centerModal-listBox__note" @click="toForget()">忘记密码</view>
					</view>
					<view class="centerModal-buttonBox"><view class="centerModal-buttonBox__btn centerModal-buttonBox__btn--confirm" @click="login()">确定</view></view>
					<view class="centerModal-linkBtn" @click="toRegister()">还没有账号，去注册</view>
				</view>
			</view>
		</uni-popup>

		<!-- 注册 -->
		<uni-popup ref="registerPopup" type="center" :maskClick="false" :animation="true" @change="changePopup">
			<view class="centerModal">
				<view class="centerModal-wrapper">
					<view class="centerModal-close" @click="hidePopup('registerPopup')"></view>
					<view class="centerModal-title">{{ registerStep == 0 ? '欢迎注册' : '密码设置' }}</view>
					<view class="centerModal-listBox" v-show="registerStep == 0">
						<view class="centerModal-listBox__list">
							<view class="centerModal-listBox__list-label">账号</view>
							<view class="centerModal-listBox__list-input">
								<input type="text" placeholder-class="centerModal-listBox__list-placeholder" placeholder="请输入注册手机号/邮箱" v-model="registerPhone" />
							</view>
						</view>
						<view class="centerModal-listBox__list">
							<view class="centerModal-listBox__list-label">验证码</view>
							<view class="centerModal-listBox__list-input">
								<input type="text" placeholder-class="centerModal-listBox__list-placeholder" placeholder="请输入验证码" v-model="registerCode" />
								<view class="centerModal-listBox__fixedBox">
									<view class="centerModal-listBox__fixedBox-verification" @click="sendCode()">{{ remain }}</view>
								</view>
							</view>
						</view>
					</view>

					<view class="centerModal-listBox" v-show="registerStep == 1">
						<view class="centerModal-listBox__list">
							<view class="centerModal-listBox__list-label">登录密码</view>
							<view class="centerModal-listBox__list-input">
								<input type="password" placeholder-class="centerModal-listBox__list-placeholder" placeholder="请输入登录密码" v-model="registerLoginPsw" />
							</view>
						</view>
						<view class="centerModal-listBox__list">
							<view class="centerModal-listBox__list-label">交易密码</view>
							<view class="centerModal-listBox__list-input">
								<input type="password" placeholder-class="centerModal-listBox__list-placeholder" placeholder="请输入交易密码" v-model="registerTradePsw" />
							</view>
						</view>
						<view class="centerModal-listBox__list">
							<view class="centerModal-listBox__list-label">邀请码</view>
							<view class="centerModal-listBox__list-input">
								<input type="text" placeholder-class="centerModal-listBox__list-placeholder" placeholder="请输入邀请码" v-model="registerInviteCode" />
							</view>
						</view>
					</view>

					<view class="centerModal-buttonBox">
						<view class="centerModal-buttonBox__btn centerModal-buttonBox__btn--confirm" @click="registerNext()" v-show="registerStep == 0">下一步</view>
						<view class="centerModal-buttonBox__btn centerModal-buttonBox__btn--confirm" @click="register()" v-show="registerStep == 1">完成</view>
					</view>
					<view class="centerModal-linkBtn" @click="toLogin()" v-show="registerStep == 0">已有账号，去登录</view>
				</view>
			</view>
		</uni-popup>
		
		<!-- 忘记密码 -->
		<uni-popup ref="forgetPopup" type="center" :maskClick="false" :animation="true" @change="changePopup">
			<view class="centerModal">
				<view class="centerModal-wrapper">
					<view class="centerModal-close" @click="hidePopup('forgetPopup')"></view>
					<view class="centerModal-title">{{ forgetStep == 0 ? '忘记密码' : '密码设置' }}</view>
					<view class="centerModal-listBox" v-show="forgetStep == 0">
						<view class="centerModal-listBox__list">
							<view class="centerModal-listBox__list-label">账号</view>
							<view class="centerModal-listBox__list-input">
								<input type="text" placeholder-class="centerModal-listBox__list-placeholder" placeholder="请输入注册手机号/邮箱" v-model="forgetPhone" />
							</view>
						</view>
						<view class="centerModal-listBox__list">
							<view class="centerModal-listBox__list-label">验证码</view>
							<view class="centerModal-listBox__list-input">
								<input type="text" placeholder-class="centerModal-listBox__list-placeholder" placeholder="请输入验证码" v-model="forgetCode" />
								<view class="centerModal-listBox__fixedBox">
									<view class="centerModal-listBox__fixedBox-verification" @click="sendForgetCode()">{{ remain }}</view>
								</view>
							</view>
						</view>
					</view>
		
					<view class="centerModal-listBox" v-show="forgetStep == 1">
						<view class="centerModal-listBox__list">
							<view class="centerModal-listBox__list-label">登录密码</view>
							<view class="centerModal-listBox__list-input">
								<input type="password" placeholder-class="centerModal-listBox__list-placeholder" placeholder="请输入登录密码" v-model="forgetLoginPsw" />
							</view>
						</view>
						<view class="centerModal-listBox__list">
							<view class="centerModal-listBox__list-label">确认密码</view>
							<view class="centerModal-listBox__list-input">
								<input type="password" placeholder-class="centerModal-listBox__list-placeholder" placeholder="请确认登录密码" v-model="forgetAgainPsw" />
							</view>
						</view>
					</view>
		
					<view class="centerModal-buttonBox">
						<view class="centerModal-buttonBox__btn centerModal-buttonBox__btn--confirm" @click="forgetNext()" v-show="forgetStep == 0">下一步</view>
						<view class="centerModal-buttonBox__btn centerModal-buttonBox__btn--confirm" @click="forget()" v-show="forgetStep == 1">完成</view>
					</view>
				</view>
			</view>
		</uni-popup>

		<!-- 充值记录 -->
		<uni-popup ref="rechargePopup" type="center" :maskClick="false" :animation="true" @change="changePopup">
			<view class="centerModal">
				<view class="centerModal-wrapper">
					<view class="centerModal-close" @click="hidePopup('rechargePopup')"></view>
					<view class="centerModal-title">充值记录</view>
					<view class="centerModal-recordBox recordBox">
						<view class="recordBox-wrapper">
							<view class="recordBox-header">
								<view class="recordBox-data">币种</view>
								<view class="recordBox-data">数量</view>
								<view class="recordBox-data recordBox-data--long">时间</view>
							</view>
							<view class="recordBox-body">
								<scroll-view scroll-y="true" class="recordBox-scroll" @scrolltolower="recordScrolltolower()">
									<view class="recordBox-noData" v-if="rechargeRecord.length == 0">暂无数据</view>
									<view class="recordBox-list" v-for="(item, index) in rechargeRecord" :key="index">
										<view class="recordBox-data">{{ item.currencyName }}</view>
										<view class="recordBox-data">{{ item.quantity }}</view>
										<view class="recordBox-data recordBox-data--long">{{ item.createTime }}</view>
									</view>
								</scroll-view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>

		<!-- 认购记录 -->
		<uni-popup ref="nodePopup" type="center" :maskClick="false" :animation="true" @change="changePopup">
			<view class="centerModal">
				<view class="centerModal-wrapper">
					<view class="centerModal-close" @click="hidePopup('nodePopup')"></view>
					<view class="centerModal-title">抢购记录</view>
					<view class="centerModal-recordBox nodeRecordBox">
						<view class="nodeRecordBox-wrapper">
							<view class="nodeRecordBox-header">
								<view class="nodeRecordBox-data">价格</view>
								<view class="nodeRecordBox-data">数量</view>
								<view class="nodeRecordBox-data">状态</view>
							</view>
							<view class="nodeRecordBox-body">
								<scroll-view scroll-y="true" class="nodeRecordBox-scroll" @scrolltolower="recordScrolltolower()">
									<view class="nodeRecordBox-noData" v-if="nodeRecord.length == 0">暂无数据</view>
									<view class="nodeRecordBox-list" v-for="(item, index) in nodeRecord" :key="index">
										<view class="nodeRecordBox-list__header">
											<view class="nodeRecordBox-data">{{ item.price }}</view>
											<view class="nodeRecordBox-data">1</view>
											<view class="nodeRecordBox-data">抢购成功</view>
										</view>
										<view class="nodeRecordBox-list__date">抢购时间：{{ item.createTime }}</view>
									</view>
								</scroll-view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>

		<!-- 登录 -->
		<uni-popup ref="tradePopup" type="center" :maskClick="false" :animation="true" @change="changePopup">
			<view class="centerModal">
				<view class="centerModal-wrapper">
					<view class="centerModal-close" @click="hidePopup('tradePopup')"></view>
					<view class="centerModal-title">节点抢购</view>
					<view class="centerModal-listBox">
						<view class="centerModal-listBox__list">
							<view class="centerModal-listBox__list-label">交易密码</view>
							<view class="centerModal-listBox__list-input">
								<input type="password" placeholder-class="centerModal-listBox__list-placeholder" placeholder="请输入交易密码" v-model="nodeTradePsw" />
							</view>
						</view>
					</view>
					<view class="centerModal-buttonBox"><view class="centerModal-buttonBox__btn centerModal-buttonBox__btn--confirm" @click="buyNode()">抢购</view></view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import QR from '@/components/qrcode/qrcode.js';
import URLSET from '../../components/url.js';

var _self;
var url = URLSET.websocketUrl + '/websocket/trade';

export default {
	components: {
		uniPopup
	},
	data() {
		return {
			/* socket相关 */
			socketOpen: false,
			myColse: false,
			websocket: '',
			socketUrl: url,

			nodeInfo: [],
			nodeRecord: [],
			rechargeCount: 0,
			rechargeRecord: 0,

			showAni: false,
			isLogin: false,

			zone: '86',
			inviteCode: '123456',
			loginPhone: '',
			loginPsw: '',
			
			registerPhone: '',
			registerCode: '',
			registerUUID: '',
			registerLoginPsw: '',
			registerTradePsw: '',
			registerInviteCode: '',
			
			forgetPhone: '',
			forgetCode: '',
			forgetUUID: '',
			forgetLoginPsw: '',
			forgetAgainPsw: '',
			
			nodeTradePsw: '',
			ercAddress: '',
			ercImage: '',
			trcAddress: '',
			trcImage: '',

			gobalUser: '',
			token: '',

			// 验证码
			remain: '发送验证码',
			isSend: true,
			time: 60,
			timer: null,

			registerStep: 0,
			forgetStep: 0,
			
			
			rechargePageNum: 1,
			rechargePageSize: 20,
			rechargePageS: 1,
		};
	},
	onShow() {
		_self = this;
		this.isLogin = uni.getStorageSync('token') != '';
		this.token = uni.getStorageSync('token');
		this.gobalUser = uni.getStorageSync('gobalUser');
		this.inviteCode = uni.getStorageSync('inviteCode');
		// setTimeout(() => {
		// 	_self.showAni = true;
		// }, 1000);
		this.init();

		clearTimeout(this.socket_timer);
		this.socket_timer = '';

		this.socket_timer = setTimeout(() => {
			_self.initSocket();
		}, 700);
	},
	methods: {
		init() {
			if (this.isLogin) {
				this.getRechargeAddress();
			}
		},
		getRechargeAddress() {
			this.$Ajax(
				'/front/financial/rechargeInit',
				{
					currencyId: 1
				},
				res => {
					if (res.code == 0) {
						console.log(JSON.stringify(res.obj));
						this.ercAddress = res.obj.list[0].erc20;
						this.ercImage = QR.createQrCodeImg(res.obj.list[0].erc20);

						this.trcAddress = res.obj.list[1].trx;
						this.trcImage = QR.createQrCodeImg(res.obj.list[1].trx);
					}
				}
			);
		},
		getNodeRecord() {
			this.$Ajax(
				'/front/node/buy/list',
				{
					pageNum: 1,
					pageSize: 20
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.nodeRecord = res.obj.list;
					}
				}
			);
		},
		openNodeRecord() {
			if (this.isLogin) {
				this.getNodeRecord();
				this.openPopup('nodePopup');
			} else {
				this.$tools.toast('请先登录');
				this.openPopup('loginPopup');
			}
		},
		
		getRechargeRecord(){
			this.$Ajax(
				'/front/financial/rechargeList',
				{
					currencyId: 1,
					pageNum: this.rechargePageNum,
					pageSize: this.rechargePageSize
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.rechargePages = res.obj.pages;
						this.rechargeRecord = this.rechargeRecord.concat(res.obj.list);
					}
				}
			);
		},
		openRechargeRecord() {
			if (this.isLogin) {
				this.rechargePages = 1;
				this.rechargePageNum = 1;
				this.rechargeRecord = [];
				this.getRechargeRecord();
				this.openPopup('rechargePopup');
			} else {
				this.$tools.toast('请先登录');
				this.openPopup('loginPopup');
			}
		},

		recordScrolltolower() {
			if (this.rechargePageNum >= this.rechargePages) {
				return this.$tools.toast('到底啦');
			} else {
				this.rechargePageNum++;
				this.getRechargeRecord();
			}
		},
		sendCode() {
			if (!this.isSend) {
				return this.$tools.toast('请稍后再试');
			}

			uni.showLoading({
				title: '发送中',
				mask: true
			});
			this.$Ajax(
				'/ajax/sendCode',
				{
					phoneEmail: this.registerPhone,
					zone: this.zone
				},
				res => {
					if (res.code == 0) {
						this.$tools.toast('发送成功');

						this.isSend = false;
						this.remain = this.time + 's后重新获取';
						this.timer = setInterval(() => {
							this.time--;
							this.remain = this.time + 's后重新获取';
							if (this.time == 0) {
								clearInterval(this.timer);
								this.remain = '重新获取';
								(this.isSend = true), (this.time = 60);
							}
						}, 1000);
					}
				}
			);
			uni.hideLoading();
		},
		
		sendForgetCode() {
			if (!this.isSend) {
				return this.$tools.toast('请稍后再试');
			}
		
			uni.showLoading({
				title: '发送中',
				mask: true
			});
			this.$Ajax(
				'/ajax/sendCode',
				{
					phoneEmail: this.forgetPhone,
					zone: this.zone
				},
				res => {
					if (res.code == 0) {
						this.$tools.toast('发送成功');
		
						this.isSend = false;
						this.remain = this.time + 's后重新获取';
						this.timer = setInterval(() => {
							this.time--;
							this.remain = this.time + 's后重新获取';
							if (this.time == 0) {
								clearInterval(this.timer);
								this.remain = '重新获取';
								(this.isSend = true), (this.time = 60);
							}
						}, 1000);
					}
				}
			);
			uni.hideLoading();
		},
		
		toRegister(e) {
			this.hidePopup('loginPopup');
			setTimeout(() => {
				_self.openPopup('registerPopup');
			}, 200);
		},
		toLogin(e) {
			this.hidePopup('registerPopup');
			setTimeout(() => {
				_self.openPopup('loginPopup');
			}, 200);
		},
		toForget(e) {
			this.hidePopup('loginPopup');
			setTimeout(() => {
				_self.openPopup('forgetPopup');
			}, 200);
		},
		registerNext() {
			if (this.registerPhone == '') {
				return this.$tools.toast('请输入注册手机号/邮箱');
			}
			if (this.registerCode == '') {
				return this.$tools.toast('请输入验证码');
			}

			this.registerStep = 1;
		},

		login() {
			if (this.loginPhone == '') {
				return this.$tools.toast('请输入手机号/邮箱');
			}
			if (this.loginPsw == '') {
				return this.$tools.toast('请输入登录密码');
			}

			this.$Ajax(
				'/front/login',
				{
					account: this.loginPhone,
					pwd: this.loginPsw
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						uni.setStorageSync('gobalUser', res.obj.name);
						uni.setStorageSync('token', res.obj.token);
						uni.setStorageSync('inviteCode', res.obj.inviteCode);
						this.gobalUser = res.obj.name;
						this.token = res.obj.token;
						this.inviteCode = res.obj.inviteCode;
						this.isLogin = true;
						this.$tools.toast('登陆成功');
						this.hidePopup('loginPopup');
						this.init();
					}
				}
			);
		},
		registerNext() {
			if (this.registerPhone == '') {
				return this.$tools.toast('请输入手机号/邮箱');
			}
			if (this.registerCode == '') {
				return this.$tools.toast('请输入验证码');
			}

			this.$Ajax(
				'/front/register/one',
				{
					account: this.registerPhone,
					code: this.registerCode
				},
				res => {
					if (res.code == 0) {
						this.registerUUID = res.obj;
						this.registerStep = 1;
					}
				}
			);
		},
		register() {
			if (this.registerLoginPsw == '') {
				return this.$tools.toast('请输入登录密码');
			}
			if (this.registerTradePsw == '') {
				return this.$tools.toast('请输入交易密码');
			}

			this.$Ajax(
				'/front/register/two',
				{
					pwd: this.registerLoginPsw,
					tradePwd: this.registerTradePsw,
					inviteCode: this.registerInviteCode,
					uuid: this.registerUUID
				},
				res => {
					if (res.code == 0) {
						this.$tools.toast('注册成功');
						this.hidePopup('registerPopup');
					}
				}
			);
		},
		
		forgetNext() {
			if (this.forgetPhone == '') {
				return this.$tools.toast('请输入手机号/邮箱');
			}
			if (this.forgetCode == '') {
				return this.$tools.toast('请输入验证码');
			}
		
			this.$Ajax(
				'/front/forget/one',
				{
					account: this.forgetPhone,
					code: this.forgetCode
				},
				res => {
					if (res.code == 0) {
						this.forgetUUID = res.obj;
						this.forgetStep = 1;
					}
				}
			);
		},
		forget() {
			if (this.forgetLoginPsw == '') {
				return this.$tools.toast('请输入登录密码');
			}
			if (this.forgetAgainPsw != this.forgetLoginPsw) {
				return this.$tools.toast('两次密码输入的不同');
			}
		
			this.$Ajax(
				'/front/forget/two',
				{
					pwd: this.forgetLoginPsw,
					uuid: this.forgetUUID
				},
				res => {
					if (res.code == 0) {
						this.$tools.toast('修改成功');
						this.hidePopup('forgetPopup');
					}
				}
			);
		},
		logout() {
			let _self = this;
			this.$Ajax('/front/logout', {}, res => {
				uni.removeStorage({
					key: 'token',
					success() {
						_self.$tools.toast('退出成功');
						_self.isLogin = false;
					}
				});
			});
		},
		buyNode() {
			if (this.nodeTradePsw == '') {
				return this.$tools.toast('请输入交易密码');
			}
			this.$Ajax(
				'/front/node/do/buy',
				{
					tradePwd: this.nodeTradePsw
				},
				res => {
					if (res.code == 0) {
						this.$tools.toast('购买成功');
						this.hidePopup('tradePopup');
					}
				}
			);
		},
		sendNodeInfo() {
			let sendInfo = {};
			sendInfo.method = 'sub';
			sendInfo.tradeId = '1';
			sendInfo.type = '4';
			this.send(JSON.stringify(sendInfo));
		},
		sendRechargeInfo() {
			let sendInfo = {};
			sendInfo.method = 'sub';
			sendInfo.tradeId = '1';
			sendInfo.type = '5';
			this.send(JSON.stringify(sendInfo));
		},
		send(message) {
			// console.log('exchange --- message' + message);
			if (this.socketOpen) {
				uni.sendSocketMessage({
					data: message
				});
			}
		},
		parseJSONorNot(mayBeJSON) {
			if (typeof mayBeJSON === 'string') {
				return JSON.parse(mayBeJSON);
			} else {
				return mayBeJSON;
			}
		},
		getNodeInfo(data) {
			data = this.parseJSONorNot(data);
			console.log(JSON.stringify(data.obj));
			_self.nodeInfo = data.obj;
		},
		getRechargeInfo(data) {
			data = this.parseJSONorNot(data);
			_self.rechargeCount = data.obj.rechargeCount;
		},
		initSocket() {
			// if (!_self.socketOpen && !_self.myColse) {
			uni.connectSocket({
				url: _self.socketUrl
			});
			uni.onSocketOpen(function(res) {
				console.log('WebSocket连接已打开！');
				_self.socketOpen = true;
				_self.sendNodeInfo();
				_self.sendRechargeInfo();
			});
			uni.onSocketError(function(res) {
				_self.socketOpen = false;
				//_self.$tools.toast('连接失败,请稍后再试');
				_self.socket();
			});
			uni.onSocketMessage(function(res) {
				var message = _self.parseJSONorNot(res);
				message = _self.parseJSONorNot(message.data);
				message = _self.parseJSONorNot(message);
				console.log('socket的数据：' + JSON.stringify(message));
				if (message.code == 8) {
					// 节点数据
					_self.getNodeInfo(message);
				} else if (message.code == 9) {
					// 充值人数
					_self.getRechargeInfo(message);
				}
			});
			uni.onSocketClose(function(res) {
				_self.socketOpen = false;
				console.log('WebSocket 已关闭！');
			});
			// }
		},

		/* 弹出框公用 */
		openPopup(e) {
			this.$refs[e].open();
		},
		hidePopup(e) {
			this.$refs[e].close();
		},
		changePopup(e) {
			console.log('popup ' + e.type + ' 状态', e.show);
			if (!e.show) {
				this.loginPhone = '';
				this.loginPsw = '';
				this.registerPhone = '';
				this.registerCode = '';
				this.registerLoginPsw = '';
				this.registerTradePsw = '';
				this.registerInviteCode = '';
				this.nodeTradePsw = '';
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/index';
</style>
