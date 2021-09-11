<template>
	<view class="pages">
		<view class="header_bar">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">参与创投</view>
			</view> 
		</view> 
		
		<view class="productBox">
			<view class="productBox-list">
				<view class="productBox-list-item">
					<view class="tipsBox">
						<view class="tipsBox-wrapper">
							<view class="tipsBox-title">
								<view class="tipsBox-title__label">{{VentureDataInfo.name}}</view>
							</view>
						</view>
						<view class="productBox-list-time">
							{{VentureDataInfo.startTime}}~{{VentureDataInfo.endTime}}
						</view>
					</view>
				</view>
			</view>
			<view class="ventureBox">
				<view class="ventureBox-wrapper">
					<view class="ventureBox-headerTitle">参与数量</view>
					<view class="ventureBox-form-item-input" :class="{ 'ventureBox-form-item-input--active': isFocus == 1, showCloseBtn: num != '' }">
						<input placeholder="请输入你的参与数量" placeholder-style="color:#CCCCCC" v-model="num"
						type="text"
						@blur="blurInput(0)"
						@focus="focusInput(0)"/>
						<view class="ventureBox-form-item-image">
							<view class="ventureBox-form-item-image__clear ventureBox-form-item-image__clear--active" @click="clearData('num')">
								<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
							</view>
						</view>
					</view>
					<view class="ventureBox-using">可用数量：{{walletInfo.using}}{{typeStr}}</view>
					<view class="ventureBox-tips">现在参与创投将享受每期8%的收益，若规定时间内创投失败，则会返还一定数量的{{typeStr}}和LM，并重新参与新一期创投</view>
				</view>
				<view class="ventureBox-wrapper">
					<view class="ventureBox-headerTitle">燃烧{{ventureLmFee * 100}}%LM</view>
					<view class="ventureBox-headerNum">{{charge}}</view>
				</view>
			</view>
		</view>
		
		<view class="initBtn" @click="submit()">确定</view>
		
		<!-- 交易框 -->
		<uni-popup ref="psdPopup" type="center" :animation="true" @change="changePopup($event,'psdPopup')">
			<view class="frameBox">
				<view class="frameBox-wrapper">
					<view class="frameBox-wrapper__label">参与创投</view>
				</view>
				<view class="frameBox-input">
					<input type="password" placeholder="请输入交易密码" placeholder-style="color:#cccccc"  v-model="password"/>
				</view>
				<view class="frameBox-btn">
					<view class="frameBox-btn__close" @click="hidePopup('psdPopup')">取消</view>
					<view class="frameBox-btn__config" @click="config()">确定</view>
				</view>
			</view>
		</uni-popup>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				num:'',
				password:'',
				name:'',
				isFocus: null,
				eyeShow: '../../static/public/icon-eye-open.png',
				eyeHide: '../../static/public/icon-eye-close.png',
				eyeShowHideArray: [{ show: false }, { show: false }, { show: false }],
				VentureDataInfo:{},
				walletInfo:{},
				using:'',
				ventureLmFee:'',
				currencyId:'',
				typeStr:'',
				charge:0,
			}
		},
		watch:{
			num(){
				if(this.num == ''){
					this.charge = 0;
				}else{
					this.charge = this.num * this.ventureLmFee;
				}
			}
		},
		onLoad(value) {
			this.ventureId = value.value1;
			this.ventureLmFee = value.value2;
			this.currencyId = value.value3;
			this.typeStr = value.value4;
		},
		onShow() {
			this.init();
		},
		methods:{
			init(){
				this.getVentureDataInfo();
				this.getWalletInfo();
			},
			getVentureDataInfo(){
				this.$Ajax('/front/venture/getVentureDataInfo',{
					ventureId: this.ventureId
				},res => {
					if(res.code == 0){
						this.VentureDataInfo = res.obj;
					}
				})
			},
			getWalletInfo() {
				this.$Ajax('/front/userPassphrase/getWalletInfo', {
					currencyId:this.currencyId
				}, res => {
						if (res.code == 0) {
							this.walletInfo = res.obj;
						}
					}
				);
			},
			submit(){
				if (this.num == '' ) {
					return this.$tools.toast('请输入参与数量');
				}
				if (!/^\d+(\.\d+)?$/.test(this.num)) {
					return this.$tools.toast('请输入正确的参与数量');
				}
				this.openPopup('psdPopup');
			},
			config(){
				if (this.password == '' ) {
					return this.$tools.toast('请输入您的交易密码');
				}
				this.$Ajax('/front/venture/participateVenture',{
						ventureId: this.ventureId,
						num: this.num,
						pwd: this.password,
					},
					res => {
						if (res.code == 0) {
							this.num = '';
							this.password = '';
							this.$tools.toastBack(res.msg, 1);
						}
					}
				);
				this.hidePopup('psdPopup');
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
				if (e.show) {
					uni.hideTabBar();
				} else {
					uni.showTabBar();
				}
			},
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
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/venture/venture';
	.initBtn{
		position: absolute;
		bottom: 40upx;
		left: 0;right: 0;
		margin: auto;
	}
	.tipsBox{
		&-title{
			padding: 30upx;
		}
	}
</style>
