<template>
	<view class="pages" :data-theme="pageTheme">
		<view class="initHeader initHeader--line initHeader--bgStyle" :class="pageTheme == 'light' ? 'initHeader--black' : 'initHeader--white'">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">账户设置</view>
			</view>
		</view>
		<view class="main">
			<view class="listBox">
				<view class="listBox-wrapper">
					<view class="listBox-list" @click="uploadAvatar()">
						<view class="listBox-list__label">头像</view>
						<view class="listBox-list__data">
							<view class="listBox-list__avatar"><image :src="userInfo.pic" mode="scaleToFill"></image></view>
						</view>
					</view>
					<view class="listBox-list" @click="openPopup('nickNamePopup')">
						<view class="listBox-list__label">昵称</view>
						<view class="listBox-list__data">{{ userInfo.name }}</view>
					</view>
					<view class="listBox-list listBox-list--holder">
						<view class="listBox-list__label">深色模式</view>
						<view class="listBox-list__switch"><switch :checked="switchShow" @change="switchChange" style="transform: scale(0.7);" color="#0169ff" /></view>
					</view>
				</view>
			</view>
		</view>

		<!-- <view class="initButton initButton--absolute">
			<view class="initButton-btn initButton-btn--disable" @click="logout()">退出登录</view>
		</view> -->

		<!-- 昵称填写 -->
		<uni-popup ref="nickNamePopup" type="center" :animation="true" @change="changePopup">
			<view class="initPopup">
				<view class="initPopup-wrapper">
					<view class="initPopup-title">修改昵称</view>
					<view class="initPopup-listBox">
						<view class="initPopup-listBox__list">
							<view class="initPopup-listBox__list-input">
								<input type="text" placeholder-class="initPopup-listBox__list-placeholder" placeholder="请输入您的昵称" v-model="nickName" />
							</view>
						</view>
					</view>
					<view class="initPopup-buttonBox">
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--cancel" @click="hidePopup('nickNamePopup')">取消</view>
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--confirm" @click="modifyNickName()">确定</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import weburl from '@/common/js/url.js';
export default {
	data() {
		return {
			authInfo: [],
			userInfo: [],

			nickName: '',
			strategy: '',
			maxStrategyLength: 16,
			switchShow: false
		};
	},
	watch: {
		'$store.state.pageTheme': function() {
			this.$setStatusBarStyle();
			this.$setTarBar();
		}
	},
	// 计算
	computed: {
		strategyLength() {
			return this.strategy.length;
		}
	},
	onShow() {
		this.$setStatusBarStyle();
		this.switchShow = this.pageTheme == 'dark';
		this.init();
	},
	methods: {
		init() {
			this.getBaseInfo();
		},
		getBaseInfo() {
			this.$Ajax('/front/user/baseInfo', {}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.userInfo = res.obj;
				}
			});
		},
		uploadAvatar() {
			let that = this;
			uni.chooseImage({
				count: 1, //默认9
				sourceType: ['album'], //从相册选择
				success: res => {
					console.log(JSON.stringify(res.tempFilePaths));

					let tempFilePaths = res.tempFilePaths[0];
					let token = uni.getStorageSync('token');
					let files = [];
					files.push({ name: 'file', uri: tempFilePaths });
					let data = {
						token: token
					};

					uni.uploadFile({
						url: weburl.webUrl + '/front/user/modify/pic',
						files: files,
						header: { token: token },
						formData: data,
						success: res => {
							that.getBaseInfo();
						},
						fail(err) {}
					});
				},
				fail: function() {
					console.log('上传图片接口调用失败');
					return;
				}
			});
		},
		modifyNickName() {
			if (this.nickName == '') {
				return this.$tools.toast('请输入您的昵称');
			}
			this.$Ajax(
				'/front/user/modify/name',
				{
					name: this.nickName
				},
				res => {
					if (res.code == 0) {
						this.hidePopup('nickNamePopup');
						this.$tools.toast('修改成功');
						this.getBaseInfo();
					}
				}
			);
		},

		switchChange(e) {
			console.log('switch2 发生 change 事件，携带值为', e.target.value);
			if (e.target.value) {
				this.$store.commit('changePageTheme', 'dark');
			} else {
				this.$store.commit('changePageTheme', 'light');
			}
		},

		/* 弹出框公用 */
		openPopup(e) {
			this.nickName = this.userInfo.name;
			this.$refs[e].open();
		},
		hidePopup(e) {
			this.$refs[e].close();
		},
		changePopup(e) {
			console.log('popup ' + e.type + ' 状态', e.show);
			if (!e.show) {
				// this.tradepwd = '';
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/safety_user';
</style>
