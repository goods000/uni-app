<template>
	<view class="pages" :data-theme="pageTheme">
		<view class="initHeader initHeader--line" :class="pageTheme == 'light' ? 'initHeader--black' : 'initHeader--white'">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">购买等级</view>
				<view class="initHeader-record" @click="$tools.jump('../team/team_buyLevel_record')"></view>
			</view>
		</view>

		<view class="main">
			<view class="userInfoBox">
				<view class="userInfoBox-wrapper">
					<view class="userInfoBox-avatar"><image :src="userInfo.pic" mode="scaleToFill"></image></view>
					<view class="userInfoBox-userName">{{ userInfo.name }}</view>
					<view class="userInfoBox-level" v-if="userInfo.levelPic != null"><image :src="userInfo.levelPic" mode="widthFix"></image></view>
				</view>
			</view>

			<view class="itemBox">
				<view class="itemBox-wrapper">
					<view class="itemBox-title">选择购买等级</view>
					<view class="itemBox-body">
						<view class="initNoData" v-if="teamBuyList.length == 0">暂无数据</view>
						<view
							class="itemBox-item"
							:class="{ 'itemBox-item--active': buttonActive == index }"
							v-for="(item, index) in teamBuyList"
							:key="index"
							@click="changeButtonActive(index)"
						>
							<view class="itemBox-item__label">{{ item.name }}</view>
							<view class="itemBox-item__data">{{ item.price }}USDT</view>
						</view>
					</view>
				</view>
			</view>

			<view class="messageBox">
				<view class="messageBox-wrapper">
					<view class="messageBox-title">团队等级权益</view>
					<view class="messageBox-body">
						<view class="messageBox-item">
							<view class="messageBox-item__icon"><image src="../../static/team/icon-message-01.png" mode="widthFix"></image></view>
							<view class="messageBox-item__title">团队分红</view>
							<view class="messageBox-item__desc" v-if="teamBuyList.length != 0">{{ teamBuyList[buttonActive].rate * 100 }}%</view>
						</view>
						<view class="messageBox-item">
							<view class="messageBox-item__icon"><image src="../../static/team/icon-message-02.png" mode="widthFix"></image></view>
							<view class="messageBox-item__title">赠送点卡</view>
							<view class="messageBox-item__desc" v-if="teamBuyList.length != 0">{{ teamBuyList[buttonActive].giveQuantity }}枚</view>
						</view>
						<view class="messageBox-item">
							<view class="messageBox-item__icon"><image src="../../static/team/icon-message-03.png" mode="widthFix"></image></view>
							<view class="messageBox-item__title">团队级别</view>
							<view class="messageBox-item__desc">特殊标识</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="fixedBox">
			<view class="fixedBox-wrapper">
				<view class="initButton"><view class="initButton-btn initButton-btn--style" @click="openPopup('tradePopup')">确认</view></view>
			</view>
		</view>

		<!-- 交易密码验证 -->
		<uni-popup ref="tradePopup" type="center" :animation="true" @change="changePopup">
			<view class="initPopup">
				<view class="initPopup-wrapper">
					<view class="initPopup-title">交易密码</view>
					<view class="initPopup-listBox">
						<view class="initPopup-listBox__list">
							<view class="initPopup-listBox__list-input">
								<input type="password" placeholder-class="initPopup-listBox__list-placeholder" placeholder="请输入您的交易密码" v-model="tradePwd" />
							</view>
						</view>
					</view>
					<view class="initPopup-buttonBox">
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--cancel" @click="hidePopup('tradePopup')">取消</view>
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--confirm" @click="buyLevel()">确定</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userInfo: [],
			teamBuyList: [],

			buttonActive: 0,
			tradePwd: ''
		};
	},
	onShow() {
		this.$setStatusBarStyle();
		this.init();
	},
	methods: {
		init() {
			this.getUserInfo();
			this.getTeamBuyList();
		},
		getUserInfo() {
			this.$Ajax('/front/user/baseInfo', {}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.userInfo = res.obj;
				}
			});
		},
		getTeamBuyList() {
			this.$Ajax('/front/team/buy/list', {}, res => {
				// console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.teamBuyList = res.obj;
				}
			});
		},
		buyLevel(){
			if (this.tradePwd == '') {
				return this.$tools.toast('请输入交易密码');
			}
			
			this.$Ajax('/front/team/buy', {
				configId: this.teamBuyList[this.buttonActive].id,
				tradePwd: this.tradePwd
			}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.hidePopup('tradePopup');
					this.$tools.toast('购买成功');
					this.getUserInfo();
				}
			});
		},
		changeButtonActive(index) {
			if (this.buttonActive != index) {
				this.buttonActive = index;
			}
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
				this.tradePwd = '';
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/team_buyLevel';
</style>
