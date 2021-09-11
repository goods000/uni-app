<template>
	<view class="pages">
		<view class="initHeader initHeader--line initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">银联收款账号</view>
			</view>
		</view>

		<view class="main">
			<view class="uploadBox">
				<view class="uploadBox-wrapper">
					<view class="uploadBox-form">
						<view class="uploadBox-list">
							<view class="uploadBox-list__label">姓名</view>
							<view class="uploadBox-list__data"><input placeholder-class="uploadBox-placeholder" placeholder="请输入真实姓名" v-model="name" /></view>
						</view>
						<view class="uploadBox-list">
							<view class="uploadBox-list__label">银行卡号</view>
							<view class="uploadBox-list__data">
								<input placeholder-class="uploadBox-placeholder" placeholder="请输入需要绑定的银行卡号" v-model="bankCardId" />
							</view>
						</view>
						<view class="uploadBox-list">
							<view class="uploadBox-list__label">开户行</view>
							<view class="uploadBox-list__data"><input placeholder-class="uploadBox-placeholder" placeholder="请输入银行卡开户行" v-model="bankName" /></view>
						</view>
						<view class="uploadBox-list">
							<view class="uploadBox-list__label">开户地址</view>
							<view class="uploadBox-list__data"><input placeholder-class="uploadBox-placeholder" placeholder="请输入银行卡开户地址" v-model="bankAddress" /></view>
						</view>
					</view>
				</view>
				<view class="uploadBox-button initButton"><view class="initButton-btn initButton-btn--blue" @click="bindFunc()">确认绑定</view></view>
			</view>
		</view>
	</view>
</template>

<script>
import weburl from '../../components/url.js';
export default {
	data() {
		return {
			type: 1, //1银联 2支付宝 3微信
			name: '',
			bankCardId: '',
			bankName: '',
			bankAddress: ''
		};
	},
	onShow() {
		this.init();
	},
	methods: {
		init() {
			this.getInfo();
		},
		getInfo() {
			this.$Ajax('/front/user/payInit', {
				'payType' : this.type
			}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.name = res.obj.name;
					this.bankCardId = res.obj.no;
					this.bankName = res.obj.bankName;
					this.bankAddress = res.obj.bankAddress;
				}
			});
		},

		bindFunc() {
			let that = this;
			if (this.name == '') {
				return this.$tools.toast('请输入真实姓名');
			}
			if (this.bankCardId == '') {
				return this.$tools.toast('请输入需要绑定的银行卡号');
			}
			if (this.bankName == '') {
				return this.$tools.toast('请输入银行卡开户行');
			}
			if (this.bankAddress == '') {
				return this.$tools.toast('请输入银行卡开户地址');
			}

			uni.showLoading({
				title: '绑定中',
				mask: true
			});

			this.$Ajax(
				'/front/user/updatePay',
				{
					payType: this.type,
					file: '',
					name: this.name,
					no: this.bankCardId,
					bankAddress: this.bankAddress,
					bankName: this.bankName,
					status: 1
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.$tools.toastBack('绑定成功', 1);
					}
				}
			);

			uni.hideLoading();
		}
	}
};
</script>

<style lang="scss" scoped>
.uploadBox {
	&-image {
		padding: 60upx 0;

		@include flexCenter;
		&__photo {
			width: 240upx;
			@include fullImage;
		}
	}

	&-form {
		padding: 30upx;
	}

	&-list {
		font-size: 28upx;
		border-bottom: 2upx solid #c6d2e4;
		padding: 30upx 0;
		
		@include flexBetween;

		&__label {
			color: #101010;
			width: 200upx;
		}
		&__data {
			color: #101010;
			font-size: 28upx;
			flex: 1;
			input{
				width: 100%;
				font-size: inherit;
			}
		}
	}

	&-button {
		padding: 30upx;
		margin-top: 120upx;
	}

	&-placeholder {
		color: #78849a;
	}
}
</style>
