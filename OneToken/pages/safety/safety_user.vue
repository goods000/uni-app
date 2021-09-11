<template>
	<view class="pages">
		<view class="initHeader initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">个人信息</view>
			</view>
		</view>
		<view class="listBox">
			<view class="listBox-wrapper">
				<view class="listBox-list" @click="uploadAvatar()">
					<view class="listBox-list__label">头像</view>
					<view class="listBox-list__data">
						<view class="listBox-list__avatar"><image :src="userInfo.image" mode="scaleToFill"></image></view>
					</view>
				</view>
				<view class="listBox-list" @click="openPopup('nickNamePopup')">
					<view class="listBox-list__label">昵称</view>
					<view class="listBox-list__data">{{ userInfo.name }}</view>
				</view>
				<view class="listBox-list" @click="openPopup('strategyPopup')">
					<view class="listBox-list__label">策略</view>
					<view class="listBox-list__data listBox-list__data--small">{{ userInfo.strategy }}</view>
				</view>
			</view>
		</view>

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

		<!-- 策略填写 -->
		<uni-popup ref="strategyPopup" type="center" :animation="true" @change="changePopup">
			<view class="initPopup">
				<view class="initPopup-wrapper">
					<view class="initPopup-title">修改策略</view>
					<view class="initPopup-listBox">
						<view class="initPopup-listBox__list">
							<view class="initPopup-listBox__list-textarea">
								<textarea type="text" placeholder-class="initPopup-listBox__list-placeholder" placeholder="请输入您的策略" v-model="strategy" />
								<view class="initPopup-listBox__list-max">{{ strategyLength }}/{{ maxStrategyLength }}</view>
							</view>
						</view>
					</view>
					<view class="initPopup-buttonBox">
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--cancel" @click="hidePopup('strategyPopup')">取消</view>
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--confirm" @click="modifyStrategy()">确定</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import weburl from '@/common/js/url.js';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
export default {
	components: {
		uniPopup
	},
	data() {
		return {
			authInfo: [],
			userInfo: [],

			nickName: '',
			strategy: '',
			maxStrategyLength: 16
		};
	},
	// 计算
	computed: {
		strategyLength() {
			return this.strategy.length;
		}
	},
	onShow() {
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
						url: weburl.webUrl + '/front/user/modify/image',
						files: files,
						header: { token: token },
						formData: data,
						success: res => {
							console.log(data);
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
		
		modifyStrategy() {
			if (this.strategy == '') {
				return this.$tools.toast('请输入您的策略');
			}
			if (this.strategyLength > this.maxStrategyLength) {
				return this.$tools.toast('超过可编辑字数');
			}
			this.$Ajax(
				'/front/user/modify/strategy',
				{
					strategy: this.strategy
				},
				res => {
					if (res.code == 0) {
						this.hidePopup('strategyPopup');
						this.$tools.toast('修改成功');
						this.getBaseInfo();
					}
				}
			);
		},
		
		/* 弹出框公用 */
		openPopup(e) {
			this.nickName = this.userInfo.name;
			this.strategy = this.userInfo.strategy;
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
