<template>
	<view class="pages">
		<view class="initHeader initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">发布动态</view>
			</view>
		</view>

		<view class="formBox">
			<view class="formBox-wrapper">
				<view class="formBox-list">
					<view class="formBox-list__textarea">
						<textarea
							type="text"
							placeholder-class="formBox-list__placeholder"
							:maxlength="maxMessageLength"
							placeholder="分享交易动态，聊一聊您的想法..."
							v-model="message"
						/>

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

		<view class="initButton"><view class="initButton-btn initButton-btn--style" @click="submitOrder()">发布</view></view>
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
				files.push({ name: 'files', uri: item });
			});
			
			console.log(files)
			
			// return
			let data = {
				token: token,
				title: '1231',
				content: this.message
			};
			uni.showLoading({
				title: '提交中',
				mask: true
			});
			uni.uploadFile({
				url: webUrl.webUrl + '/front/dynamic/publish/do', //仅为示例，非真实的接口地址
				files: files,
				header: { token: token },
				formData: data,
				success: res => {
					let backRes = JSON.parse(JSON.stringify(res));
					console.log(backRes);
					console.log(JSON.parse(backRes.data));
					if (JSON.parse(backRes.data).code == 0) {
						this.message = '';
						this.imageList = [];
						uni.hideLoading();
						this.$tools.toastBack('提交成功', 2);
					} else {
						this.$tools.toast(JSON.parse(backRes.data).msg);
						uni.hideLoading();
					}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/information_edit';
</style>
