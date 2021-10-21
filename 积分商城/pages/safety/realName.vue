<template>
	<view class="pages bg_header">
		<view class="initHeader initHeader--bgStyle initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">实名认证</view>
			</view>
		</view>

		<view v-if="authInfo.authStatus == 0 || authInfo.authStatus == 3">
			<view class="main">
				<view class="contentTrans contentTrans-no">
					<view class="inputBox">
						<view class="inputBox-wrapper">
							<view class="inputBox-item" :class="{ 'inputBox-item--active': isFocus == 0}">
								<view class="inputBox-item__label">姓名</view>
								<view class="inputBox-item__list">
									<view class="inputBox-item__input">
										<input type="text" @blur="blurInput(0)" @focus="focusInput(0)" placeholder-class="inputBox-item__placeholder"
											placeholder="请输入您的姓名" v-model="username" />
									</view>
								</view>
							</view>
							<view class="inputBox-item" :class="{ 'inputBox-item--active': isFocus == 1}">
								<view class="inputBox-item__label">身份证号码</view>
								<view class="inputBox-item__list">
									<view class="inputBox-item__input">
										<input type="text" @blur="blurInput(1)" @focus="focusInput(1)" placeholder-class="inputBox-item__placeholder"
											placeholder="请输入您的身份证号码" v-model="idCard" />
										<!-- <view class="inputBox-item__fixedBox"></view> -->
									</view>
								</view>
							</view>
							<view class="realNameBox">
								<view class="realNameBox-label">上传身份证信息</view>
								<view class="realNameBox-tips">拍摄上传身份证照片，注意保证照片清晰边角完整</view>
								
								<view class="realNameBox-wrapper">
									<view class="realName">
										<view class="realName-box">
											<view class="realName-box-bg" :style="'background-image: url( '+ userUploadList[0].src +');'"
											@click="chooseImg(1)">
												<view class="realName-box-bg__photo">
													<image src="../../static/safety/icon-realName-upload.png" mode="scaleToFill"></image>
												</view>
											</view>
											<view class="realName-tips">点击上传身份证正面</view>
										</view>
									</view>
									<view class="realName">
										<view class="realName-box">
											<view class="realName-box-bg" :style="'background-image: url( '+ userUploadList[1].src +');'"
											@click="chooseImg(2)">
												<view class="realName-box-bg__photo">
													<image src="../../static/safety/icon-realName-upload.png" mode="scaleToFill"></image>
												</view>
											</view>
											<view class="realName-tips">点击上传身份证反面</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="initBtn" @click="config()">提交</view>
			</view>
			<!-- 失败 -->
			<!-- <view class="main" v-show="!isShow">
				<view class="safetytopBg">
					<image src="../../static/safety/icon-realName-fail.png" mode="widthFix"></image>
				</view>
				<view class="realName-statusTitle">身份证信息审核失败</view>
				<view class="realName-statusEnd">请重新上传您的身份信息</view>
				<view class="realName-statusEnd realName-statusEnd--end">上传前请认真核对是否存在漏写和写错</view>
				<view class="initBtn" @click="isShow = true">重新认证</view>
			</view> -->
		</view>
		
		<view class="main" v-if="authInfo.authStatus == 2">
			<view class="safetytopBg">
				<image src="../../static/safety/icon-realName-success.png" mode="widthFix"></image>
			</view>
			<view class="realName-statusTitle">身份证信息认证成功</view>
			<view class="realName-statusEnd realName-statusEnd--end">恭喜您已完成实名认证</view>
			<view class="contentTrans">
				<view class="contentTrans-coin">认证身份证信息</view>
				<view class="inputBox">
					<view class="inputBox-wrapper">
						<view class="inputBox-item">
							<view class="inputBox-item__label">姓名</view>
							<view class="inputBox-item__list">
								<view class="inputBox-item__input">
									<input type="text" placeholder-class="inputBox-item__placeholder" v-model="num" disabled="disabled"/>
									<view class="inputBox-item__fixedBox">{{authInfo.userName}}</view>
								</view>
							</view>
						</view>
						<view class="inputBox-item">
							<view class="inputBox-item__label">身份证号码</view>
							<view class="inputBox-item__list">
								<view class="inputBox-item__input">
									<input type="text" placeholder-class="inputBox-item__placeholder" v-model="num" disabled="disabled"/>
									<view class="inputBox-item__fixedBox">{{authInfo.idcart}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="main" v-if="authInfo.authStatus == 1">
			<view class="safetytopBg">
				<image src="../../static/safety/icon-realName-middle.png" mode="widthFix"></image>
			</view>
			<view class="realName-statusTitle">身份证信息提交审核中</view>
			<view class="realName-statusEnd">请耐心等待后台工作人员审核</view>
			<view class="realName-statusEnd realName-statusEnd--end">预计1-2个工作日内完成审核</view>
		</view>
	</view>
</template>

<script>
import weburl from '../../common/js/url.js';
	
export default {
	data() {
		return {
			isShow:true,
			isFocus: null,
			username: '',
			idCard: '',
			uploadList: [{src:'../../static/realName/icon-realName-01.png'},{src:'../../static/realName/icon-realName-02.png'},],
			userUploadList: [{src:'../../static/realName/icon-realName-01.png'},{src:'../../static/realName/icon-realName-02.png'},],
			authInfo:{},
		};
	},
	onShow() {
		this.init();
	},
	methods: {
		init(){
			this.getAuthInfo();
		},
		focusInput(index) {
			this.isFocus = index;
		},
		blurInput(index) {
			this.isFocus = null;
		},
		getAuthInfo() {
			this.$Ajax('/front/user/authInfo', {}, res => {
				if (res.code == 0) {
					// console.log(JSON.stringify(res.obj))
					this.authInfo = res.obj.auth;
				}
			});
		},
		chooseImg(choosePhotoPath) {
			let that = this;
			var token = uni.getStorageSync('token');
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: res => {
					if (choosePhotoPath == 1) {
						this.userUploadList[0].src = res.tempFilePaths[0];
						console.log("src:",this.userUploadList[0].src)
					} else if (choosePhotoPath == 2) {
						this.userUploadList[1].src = res.tempFilePaths[0];
						console.log("src1:",this.userUploadList[1].src)
					}
				},
				fail: function() {
					console.log('上传图片接口调用失败');
					return;
				}
			});
		},
		config() {
			let that = this;
			if (this.username == '') {
				return this.$tools.toast('请输入您的姓名');
			}
			if (this.idCard == '') {
				return this.$tools.toast('请输入您的身份证号码');
			}
			if (this.uploadList[0].src == this.userUploadList[0].src) {
				return this.$tools.toast('请上传身份证正面照');
			}
			if (this.uploadList[1].src == this.userUploadList[1].src) {
				return this.$tools.toast('请上传身份证反面照');
			}
			uni.showLoading({
				title: '上传中',
				mask: true
			});
			let token = uni.getStorageSync('token');
			let files = [];
			files.push({ name: 'file1', uri: this.userUploadList[0].src });
			files.push({ name: 'file2', uri: this.userUploadList[1].src });
			let data = {
				token: token,
				realName: this.username,
				idcart: this.idCard,
				file1: this.userUploadList[0].src,
				file2: this.userUploadList[1].src,
			};
			console.log(files);
			uni.uploadFile({
				url: weburl.webUrl + '/front/user/approveTwo',
				files: files,
				header: { token: token },
				formData: data,
				success: res => {
					var data = JSON.parse(res.data);
					console.log(data);
					if (data.code == 0) {
						that.$tools.toastBack('提交成功，请等待审核', 1);
					} else {
						that.$tools.toast(data.msg);
					}
				},
				fail(err) {},
				complete: res => {
					uni.hideLoading();
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/transaction/transaction';
@import '@/common/scss/pages/safety/realName';

</style>
