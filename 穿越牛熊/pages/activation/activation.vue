<template>
	<view class="pages" :data-theme="pageTheme">
		<view class="initHeader initHeader--fixed" :class="pageTheme == 'light' ? 'initHeader--black' : 'initHeader--white'">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">激活量化</view>
				<view class="initHeader-record" @click="$tools.jump('./activation_record')"></view>
			</view>
		</view>
		<view class="main">
			<view class="headerInfoBox">
				<view class="headerInfoBox-wrapper">
					<!-- 用户信息 -->
					<view class="userInfoBox">
						<view class="userInfoBox-wrapper" @click="checkLogin()">
							<view class="userInfoBox-avatar"><image :src="isLogin ? userInfo.pic : '../../static/mine/icon-avatar.png'" mode="scaleToFill"></image></view>
							<view class="userInfoBox-content">
								<view class="userInfoBox-title" v-if="!isLogin">登录到您的账户</view>
								<view class="userInfoBox-msg" v-if="!isLogin">欢迎登录{{ $store.state.projectName }}</view>
								<view class="userInfoBox-row" v-if="isLogin">
									<view class="userInfoBox-title">{{ userInfo.name }}</view>
									<view class="userInfoBox-level"><image :src="'../../static/level/icon-level-' + userInfo.team + '.png'" mode="widthFix"></image></view>
								</view>
					
								<view class="userInfoBox-code" v-if="isLogin">邀请码：{{ userInfo.inviteCode }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="initFormBox">
				<view class="initFormBox-wrapper">
					<view class="initFormBox-item">
						<view class="initFormBox-item__label">选择套餐</view>
						
						<view class="typeList">
							<view class="typeList-item" v-for="(item,index) in typeList" :key="index"
							:class="{'typeList-item--active' :typeActive == index}" @click="changeTypeActive(index,item.id)" v-show="item.status == 0">
								<view class="typeList-item__day" :class="{'typeList-item__day--active' : typeActive == index}">{{ item.days }}{{ item.name }}</view>
								<view class="typeList-item__usdt">
									<view class="typeList-item__usdt-num" :class="{'typeList-item__usdt-num--active' :typeActive == index}">{{ item.price }}</view>
									<view class="typeList-item__usdt-company" :class="{'typeList-item__usdt-company--active' :typeActive == index}">USDT</view>
								</view>
								<view class="typeList-item__image" v-show="typeActive == index">
									<image src="../../static/index/icon-active-light.png" mode="widthFix"></image>
								</view>
							</view>
						</view>
					</view>
					<view class="initFormBox-item">
						<view class="initFormBox-item__label">交易密码</view>
						<view class="initFormBox-item__input">
							<input type="password" placeholder-class="initFormBox-item__placeholder" placeholder="请输入您的交易密码" v-model="tradePwd" />
						</view>
					</view>
				</view>
			</view>

			<view class="initButton initButton--fixed"><view class="initButton-btn initButton-btn--style" @click="sumbit()">提交</view></view>
		</view>

	</view>
</template>

<script>
export default {
	data() {
		return {
			userInfo: [],
			isLogin: false,
			tradePwd: '',
			typeList: [
				{days:'30',price:'100'},{days:'183',price:'500'},{days:'365',price:'1000'},
			],
			typeActive: 0,
			index: 0,
		};
	},
	onShow() {
		this.init();
		this.isLogin = uni.getStorageSync('token');
	},
	methods: {
		init() {
			if (!this.isLogin) {
				this.getUserInfo();
			}
			this.getVIPInfo();
		},
		changeTypeActive(index,id) {
			if (this.typeActive != index) {
				this.typeActive = index;
				this.configId = id;
			}
		},
		// 用户信息
		getUserInfo() {
			this.$Ajax('/front/user/baseInfo', {}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.userInfo = res.obj;
				}
			});
		},
		// 会员卡信息
		getVIPInfo() {
			this.$Ajax('/front/user/getVIPInfo', {}, res => {
				if(res.code == 0){
					this.typeList = res.obj;
					this.configId = this.typeList[0].id;
				}
			})
		},
		//提取申请
		sumbit() {
			if (this.configId == '') {
				return this.$tools.toast('请选择购买套餐类型');
			}
			if (this.tradePwd == '') {
				return this.$tools.toast('请输入交易密码');
			}
			this.$Ajax('/front/user/vip/order/do',{
					vipId: this.configId,
					tradePwd: this.tradePwd
				},
				res => {
					console.log(res);
					if (res.code == 0) {
						this.tradePwd = '';
						this.$tools.toast('购买成功');
					}
				}
			);
		},
		checkLogin() {
			if (!this.isLogin) {
				this.$tools.jump('../operate/login');
			}else{
				this.$tools.jump('../safety/safety_user');
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/activation';
</style>
