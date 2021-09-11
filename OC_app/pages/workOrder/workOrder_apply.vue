<template>
	<view class="pages">
		<view class="initHeader initHeader--black">
			<view class="initHeader-wrapper"><view class="initHeader-back" @click="$tools.back(1)"></view></view>
		</view>

		<view class="titleBox">
			<view class="titleBox-wrapper">
				<view class="titleBox-title">请描述您遇到的问题</view>
				<view class="titleBox-note">请安要求在下方输入框中输入您想要对我们说的话</view>
			</view>
		</view>

		<view class="formBox">
			<view class="formBox-wrapper">
				<view class="formBox-list">
					<view class="formBox-list__label">工单标题</view>
					<view class="formBox-list__input"><input type="text" placeholder-class="formBox-list__placeholder" placeholder="请输入您的工单标题" v-model="title" /></view>
				</view>
				<view class="formBox-list">
					<view class="formBox-list__label">问题描述</view>
					<view class="formBox-list__textarea">
						<textarea type="text" placeholder-class="formBox-list__placeholder" :maxlength="maxMessageLength" placeholder="请详述您遇到的问题" v-model="message" />

						<view class="formBox-list__textarea-max">{{ messageLength }}/{{ maxMessageLength }}</view>
					</view>
				</view>
			</view>
		</view>

		<view class="imageBox">
			<view class="imageBox-wrapper">
				<view class="imageBox-item" v-for="(item, index) in imageList" :style="{ 'background-image': 'url(' + item + ')' }" :key="index">
					<view class="imageBox-item__delete" @click.stop="deleteImage(index)"></view>
				</view>
				<view class="imageBox-item imageBox-item--add" @click="chooseImage()" v-show="imageList.length < 3"></view>
			</view>
		</view>

		<view class="initButton"><view class="initButton-btn initButton-btn--style" @click="submitOrder()">提交</view></view>
	</view>
</template>

<script>
import webUrl from '@/common/js/url.js';
export default {
	data() {
		return {
			imageList: [],

			title: '',
			message: '',
			maxMessageLength: 120,
			typeId: null
		};
	},
	// 计算
	computed: {
		messageLength() {
			return this.message.length;
		}
	},
	onLoad(hash) {
		this.typeId = hash.value1;
	},
	onShow() {},
	methods: {
		async chooseImage() {
			// if (this.imageList.length === 7) {
			// 	return this.$tools.toast('最多上传7张图片');
			// }
			uni.chooseImage({
				sourceType: ['album'],
				sizeType: ['compressed'],
				count: 1,
				success: res => {
					this.imageList = this.imageList.concat(res.tempFilePaths);
					console.log(JSON.stringify(this.imageList));
				}
			});
		},
		deleteImage(index) {
			this.imageList.splice(index, 1);
		},
		previewImage(e) {
			var current = e.target.dataset.src;
			uni.previewImage({
				current: current,
				urls: this.imageList
			});
		},
		submitOrder() {
			let token = uni.getStorageSync('token');
			let files = [];
			if (this.imageList.length == 0) {
				this.imageList[0] = '';
			}
			this.imageList.forEach((item, idx) => {
				files.push({ name: 'file' + (idx + 1), uri: item });
			});
			let data = {
				token: token,
				typeId: this.typeId,
				title: this.title,
				content: this.message
			};
			uni.showLoading({
				title: '提交中',
				mask: true
			});
			uni.uploadFile({
				url: webUrl.webUrl + '/front/work/publish', //仅为示例，非真实的接口地址
				files: files,
				header: { token: token },
				formData: data,
				success: res => {
					let backRes = JSON.parse(JSON.stringify(res));
					console.log(backRes);
					console.log(JSON.parse(backRes.data));
					if (JSON.parse(backRes.data).code == 0) {
						this.title = '';
						this.message = '';
						this.imageList = [];
						uni.hideLoading();
						this.$tools.toastBack('提交成功', 2);
					} else {
						this.$tools.toast('请稍后重试');
						uni.hideLoading();
					}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/workOrder/workOrder_apply';
</style>
