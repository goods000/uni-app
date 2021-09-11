<template>
	<view class="pages">
		<view class="initHeader initHeader--black">
			<view class="initHeader-wrapper"><view class="initHeader-back" @click="$tools.back(1)"></view></view>
		</view>
		<view class="titleBox"><view class="titleBox-title">修改昵称</view></view>

		<view class="operateBox operateBox--setting">
			<view class="operateBox-wrapper">
				<view class="operateBox-list">
					<view class="operateBox-list__label">新的昵称</view>
					<view class="operateBox-list__input" :class="{ 'operateBox-list__input--active': isFocus == 0, showCloseBtn: nickName != '' }">
						<input @blur="blurInput(0)" @focus="focusInput(0)" placeholder-class="operateBox-placeholder" placeholder="请输入您新的昵称" v-model="nickName" />
						<view class="operateBox-list__fixedBox">
							<view class="operateBox-list__fixedBox-btn operateBox-list__fixedBox-btn--clear" @click="clearData('nickName')">
								<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="operateBox-button">
					<view class="operateBox-button__btn operateBox-button__btn--blue" :class="{ 'operateBox-button__btn--active': nickName != '' }" @click="change()">修改</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			nickName: '',

			isFocus: null,
		};
	},
	methods: {
		/* clear & eye */
		focusInput(index) {
			this.isFocus = index;
		},
		blurInput(index) {
			this.isFocus = null;
		},
		clearData(keyName) {
			for (var key in this.$data) {
				if (key == keyName) {
					this.$data[key] = '';
				}
			}
		},
		toggleEyeStatus(index) {
			this.eyeShowHideArray[index].show = !this.eyeShowHideArray[index].show;
		},
		/* End */

		change() {
			if (this.nickName == '') {
				return this.$tools.toast('请输入您的新昵称');
			}
			uni.showLoading({
				title: '修改中',
				mask: true
			});
			this.$Ajax(
				'/front/user/editName',
				{
					name: this.nickName
				},
				res => {
					if (res.code == 0) {
						uni.hideLoading();
						this.$tools.toastBack('修改成功', 1);
					}
				}
			);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/operate';
</style>
