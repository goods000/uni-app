<template>
	<view class="pages" :data-theme="pageTheme">
		<view class="initHeader initHeader--fixed" :class="pageTheme == 'light' ? 'initHeader--black' : 'initHeader--white'">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">API账户</view>
				<view class="initHeader-right initHeader-right--text" @click="$tools.jump('../api/api_add')">添加账户</view>
			</view>
		</view>
		<view class="main">
			<view class="listBox">
				<view class="listBox-wrapper">
					<view class="initNoData" v-if="myApiList.length == 0">暂无数据</view>
					<view class="listBox-list" :class="{'listBox-list--active' : item.flag == 1}" v-for="(item, index) in myApiList" :key="index" @click="openPopup('pickerPopup', item)">
						<view class="listBox-itemBox">
							<view class="listBox-itemBox__item">
								<view class="listBox-itemBox__item-label">交易所</view>
								<view class="listBox-itemBox__item-data">
									<view class="iconBox">
										<view class="iconBox-icon"><image :src="item.bourseLogo" mode="widthFix"></image></view>
										<view class="iconBox-label">{{ item.bourseName }}</view>
									</view>
								</view>
							</view>
							<view class="listBox-itemBox__item">
								<view class="listBox-itemBox__item-label">账户名称</view>
								<view class="listBox-itemBox__item-data">{{ item.name }}</view>
							</view>
							<view class="listBox-itemBox__item listBox-itemBox__item--flex2">
								<view class="listBox-itemBox__item-label">绑定时间</view>
								<view class="listBox-itemBox__item-data">{{ item.createTime }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<uni-popup ref="pickerPopup" type="bottom" :animation="true" @change="changePopup">
			<view class="pickerBox">
				<view class="pickerBox-wrapper">
					<view class="pickerBox-list" @click="hide2OpenPopup('namePopup')">修改名称</view>
					<view class="pickerBox-list" @click="hide2OpenPopup('apiPopup')">更新API</view>
					<!-- <view class="pickerBox-list" @click="hide2OpenPopup('deletePopup')">删除API</view> -->
					<view class="pickerBox-list" @click="hide2OpenPopup('defaultPopup')">设为默认API账户</view>
					<view class="pickerBox-list" @click="hidePopup('pickerPopup')">取消</view>
				</view>
			</view>
		</uni-popup>

		<uni-popup ref="namePopup" type="center" :animation="true" @change="changePopup">
			<view class="initPopup">
				<view class="initPopup-wrapper">
					<view class="initPopup-title">修改名称</view>
					<view class="initPopup-listBox">
						<view class="initPopup-listBox__list">
							<view class="initPopup-listBox__list-input">
								<input type="text" placeholder-class="initPopup-listBox__list-placeholder" placeholder="请输入您的名称" v-model="name" />
							</view>
						</view>
					</view>
					<view class="initPopup-buttonBox">
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--cancel" @click="hidePopup('namePopup')">取消</view>
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--confirm" @click="modifyName()">确定</view>
					</view>
				</view>
			</view>
		</uni-popup>

		<uni-popup ref="apiPopup" type="center" :animation="true" @change="changePopup">
			<view class="initPopup">
				<view class="initPopup-wrapper">
					<view class="initPopup-title">修改API</view>
					<view class="initPopup-listBox">
						<view class="initPopup-listBox__list">
							<view class="initPopup-listBox__list-input">
								<input type="text" placeholder-class="initPopup-listBox__list-placeholder" placeholder="请输入您的Access Key" v-model="apiKey" />
							</view>
						</view>
						<view class="initPopup-listBox__list">
							<view class="initPopup-listBox__list-input">
								<input type="text" placeholder-class="initPopup-listBox__list-placeholder" placeholder="请输入您的Secret Key" v-model="secretKey" />
							</view>
						</view>
					</view>
					<view class="initPopup-buttonBox">
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--cancel" @click="hidePopup('apiPopup')">取消</view>
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--confirm" @click="modifyApi()">确定</view>
					</view>
				</view>
			</view>
		</uni-popup>

		<uni-popup ref="defaultPopup" type="center" :animation="true" @change="changePopup">
			<view class="initPopup">
				<view class="initPopup-wrapper">
					<view class="initPopup-title">设定默认API</view>
					<view class="initPopup-buttonBox">
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--cancel" @click="hidePopup('defaultPopup')">取消</view>
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--confirm" @click="defaultApi()">确定</view>
					</view>
				</view>
			</view>
		</uni-popup>

		<uni-popup ref="deletePopup" type="center" :animation="true" @change="changePopup">
			<view class="initPopup">
				<view class="initPopup-wrapper">
					<view class="initPopup-title">删除API</view>
					<view class="initPopup-desc">确定删除API吗？</view>
					<view class="initPopup-buttonBox">
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--cancel" @click="hidePopup('deletePopup')">取消</view>
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--confirm" @click="deteleApi()">确定</view>
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
			myApiList: [],
			popupInfo: [],

			name: '',
			apiKey: '',
			secretKey: ''
		};
	},
	onShow() {
		this.$setStatusBarStyle();
		this.init();
	},
	methods: {
		init() {
			this.getMyApiList();
		},
		getMyApiList() {
			this.$Ajax('/front/api/bind/list', {}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.myApiList = res.obj;
				}
			});
		},

		modifyName() {
			if (this.name == '') {
				return this.$tools.toast('请输入名称');
			}

			this.$Ajax(
				'/front/api/modify/name',
				{
					id: this.popupInfo.id,
					tradePwd: '111111',
					name: this.name
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.$tools.toast('修改成功');
						this.hidePopup('namePopup');
						this.init();
					}
				}
			);
		},

		modifyApi() {
			if (this.apiKey == '') {
				return this.$tools.toast('请输入您的Access Key');
			}
			if (this.secretKey == '') {
				return this.$tools.toast('请输入您的Secret Key');
			}

			this.$Ajax(
				'/front/api/modify',
				{
					id: this.popupInfo.id,
					apiKey: this.apiKey,
					secretKey: this.secretKey
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.$tools.toast('修改成功');
						this.hidePopup('apiPopup');
						this.init();
					}
				}
			);
		},
		
		defaultApi() {
			this.$Ajax(
				'/front/api/set/default',
				{
					id: this.popupInfo.id
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.$tools.toast('设定成功');
						this.hidePopup('defaultPopup');
						this.init();
					}
				}
			);
		},

		deteleApi() {
			this.$Ajax(
				'/front/api/delete',
				{
					id: this.popupInfo.id
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.$tools.toast('删除成功');
						this.hidePopup('deletePopup');
						this.init();
					}
				}
			);
		},

		hide2OpenPopup(e) {
			this.hidePopup('pickerPopup');
			this.$refs[e].open();
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
				this.name = '';
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/api';
</style>
