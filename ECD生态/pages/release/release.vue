<template>
	<view class="pages">
		<view class="header_bar header_bg header_border">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">发布动态</view>
			</view> 
		</view> 
		
		<view class="release">
			<view class="release-textarea">
				<textarea  placeholder="分享你当下的生活..." maxlength="200" placeholder-class="release-textarea--input" v-model="text"/>
				<view class="release-tips">(文字内容发表200字以内)</view>
			</view>
		</view>
		
		<view class="releaseBox">
			<view class="release__image" v-for="(item,index) in uploadList" :key="index" v-if="uploadList != ''">
				<view class="release__image-bg" :style="'background: url( '+ item +') no-repeat;background-size: 100% 100%;'"
				 @click="chooseImg(item)">
				</view>
			</view>
			<view class="release__image" v-if="uploadList.length < 9">
				<view class="release__image-bg" :style="'background: url( '+ upload +') no-repeat;background-size: 100% 100%;'"
				 @click="chooseImg()">
				</view>
			</view>
		</view>
		
		<view class="fixedBox">
			<view class="fixedBox-wrapper">
				<view class="initButton">
					<!-- <view class="initButton-btn initButton-btn--disable" v-if="text == ''">发布</view> -->
					<view class="initButton-btn initButton-btn--style" @click="submit()">发布</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import weburl from '../../common/js/url.js';
	export default {
			data(){
				return{
					text:'',
					upload: [
						'../../static/public/img-upload-2.png',
					],
					uploadList: [],
					timer: null,
					isToggle:true,
				}
			},
			onShow() {
			},
			methods: {
				chooseImg(type) {
					let that = this;
					var token = uni.getStorageSync('token');
					uni.chooseImage({
						count: 9, //默认9
						sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
						// sourceType: ['camera', 'album'], //从相册选择
						sourceType: ['album'], //从相册选择
						success: res => {
							console.log(res.tempFilePaths);
							console.log("type",type);
							if(this.uploadList.length <= 9){
								if(type != undefined){
									this.uploadList.forEach((item,index) => {
										if(type == item){
											// this.uploadList.remove(type);
											this.uploadList.splice(index,1,res.tempFilePaths[0]);
											console.log("this.uploadList---1",this.uploadList)
										}
									})
								}else{
									this.uploadList = this.uploadList.concat(res.tempFilePaths);
									console.log("this.uploadList---2",this.uploadList)
								}
							}
						},
						fail: function() {
							console.log('上传图片接口调用失败');
							return;
						}
					});
				},
				submit() {
					let that = this;
					if(!that.isToggle){
						return false;
					}
					if(this.text == ''){
						return this.$tools.toast('请输入您的发布的内容');
					}
					// if (this.uploadList == '') {
					// 	return this.$tools.toast('请发布需要发布的图片');
					// }
					uni.showLoading({
						title: '上传中',
						mask: true
					});
					let token = uni.getStorageSync('token');
					// 文件路劲封装
					let imgs = that.uploadList.map((value, index) => {
						console.log("value",value);
					    return {
							name: "file" + (index + 1), 
							uri: value
						}
					});
					console.log("imgs",imgs);
					let data = {
						token: token,
						content: that.text,
					};
					
					if(imgs.length != 0){
						if(that.isToggle){
							that.isToggle = false;
							console.log("imgs",imgs);
							uni.uploadFile({
								url: weburl.webUrl + '/front/friend/postMoments',
								files: imgs,
								header: { token: token },
								formData: data,
								success: res => {
									var data = JSON.parse(res.data);
									console.log(data);
									if (data.code == 0) {
										that.text ='',
										that.uploadList ='',
										that.timer = setTimeout(function() {
											clearTimeout(that.timer);
											that.isToggle = true;
										}, 5000);
										that.$tools.toastSwitchTab('发布成功', '../chat/chat', 2);
									} else {
										that.$tools.toast(data.msg);
									}
								},
								fail(err) {
									console.log(err);
									that.isToggle = true;
								},
								complete: res => {
									console.log(res)
									uni.hideLoading();
								}
							});
							uni.hideLoading();
						}
					}else{
						this.$Ajax('/front/friend/postMoments', {
							content: that.text
						}, res => {
							if (res.code == 0) {
								that.$tools.toastSwitchTab('发布成功', '../chat/chat', 2);
							}
						});
					}
				}
			},
		}
	</script>

<style lang="scss" scoped>
	@import '/scss/release';
</style>
