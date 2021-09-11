<template>
	<view class="pages">
		<view class="mine">
			<view class="header_bar header_bg header_fixed">
				<view class="mine-top-bg">
					<view class="header">
						<view class="header-back" @click="$tools.back(1)"></view>
						<view class="header-title">算力购买</view>
					</view> 
				</view> 
			</view> 
			
			<view class="mine-box">
				<view class="mine-list">
					<view class="mine-count-box">
						<view class="mine-count-box-title">FIC 云算力</view>
						<view class="mine-count-box-txt">合约周期</view>
						<view class="mine-count-box-day">{{lock_end_day}}天</view>
					</view>
					<view class="mine-list-data">
						<view class="mine-list-left">购买单价/T</view>
						<view class="mine-list-right">{{lock_usdt_price}} USDT / 1 T</view>
					</view>
					<view class="mine-list-data">
						<view class="mine-list-left">合约周期</view>
						<view class="mine-list-right">{{lock_end_day}} 天</view>
					</view>
					<view class="mine-list-data">
						<view class="mine-list-left">购买数量</view>
						<view class="mine-list-right">
							<view class="mine-plus-image" @click="plus()">
								<image src="../../static/mine/icon-mine-plus.png" mode="widthFix"></image>
							</view>
							<input type="text" value="1" v-model="num"/>
							<view class="mine-plus-image" @click="reduce()">
								<image src="../../static/mine/icon-mine-icon-mine-bg.png" mode="widthFix"></image>
							</view>
							<view class="mine-data-wei"> T</view>
						</view>
					</view>
					<view class="mine-list-data">
						<view class="mine-list-left">合计金额</view>
						<view class="mine-list-right">
							<view class="mine-list-right-red">{{lock_usdt_price * this.num}}</view>
							<view class="mine-list-right-mo">USDT</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="mine-tips mt-mb">
				<view class="mine-tips-box">
					<view class="tips_view">
						<view class="s_view"></view>
						<view class="tips-txt">产品亮点</view>
					</view>
					
					<view class="mine-tips-list">
						<view class="mine-tips-list-image">
							<image src="../../static/mine/icon-mine-01.png" mode="widthFix"></image>
						</view>
						<view class="mine-tips-list-info">
							<view class="mine-tips-list-title">专业性公司</view>
							<view class="mine-tips-list-txt">凭借超高质量的客户服务、创新的经营模式、优秀的企业文化，为客户提供安全、高效的多样化服务。</view>
						</view>
					</view>
					<view class="mine-tips-list">
						<view class="mine-tips-list-image">
							<image src="../../static/mine/icon-mine-02.png" mode="widthFix"></image>
						</view>
						<view class="mine-tips-list-info">
							<view class="mine-tips-list-title">投资专业 收益稳健</view>
							<view class="mine-tips-list-txt">申购门槛低，产品封闭期到期后历史均未出现负收益，超存力集结，创下行业记录。</view>
						</view>
					</view>
				</view>
			</view>
			
		</view>
		
		<view class="mine-bottom-btn">
			<view class="btn-active-login" @click="buy()">购买</view>
		</view>
		
		<uni-popup ref="pswPopup" type="center" :animation="true">
			<view class="popupMain">
				<view class="popup-close">
					<image src="../../static/public/icon-popup-close.png" mode=""  @click="hidePopup('pswPopup')"></image>
				</view>
				<view class="popupBox">
					<view class="popup-Header">算力购买</view>
				</view>
				<view class="popupPrice">{{lock_usdt_price * this.num}}</view>
				<view class="popupCompany">(USDT)</view>
				<view class="popupData">可用余额：{{userList.usdtNum}}(USDT）</view>
				<view class="popup-input">
					<input type="password" maxlength="6"  placeholder="" class="pwdInput" id="pwdInput" autofocus focus v-model="pay_password" >
					<view class="fakeBox">
						<input type="text" disabled="disabled">
						<input type="text" disabled="disabled">
						<input type="text" disabled="disabled">
						<input type="text" disabled="disabled">
						<input type="text" disabled="disabled">
						<input type="text" disabled="disabled">
					</view>
				</view>
				<view class="popup-btn">
					<view class="popup-btn-confirm" @click="submitBuy()">确定</view>
				</view>
			</view>
		</uni-popup>	
		
	</view>
</template>

<script>
	import md5 from '../../common/js/md5.js';
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		data() {
			return {
				num:1,
				pay_password: '',
				 mineList:[],
				 lock_end_day: '',
				 lock_interest_scale: '',
				 lock_end_day: '',
				 lock_usdt_price: '',
				 userList:[]
			}
		},
		onShow() {
			this.getMineList();
			this.getUserList();
		},
		methods: {
			// 获取用户信息
			getUserList() {
				this.$Ajax('/user/info', {}, res => {
						if (res.code == 0) {
							this.userList = res.account
						}
					}
				);
			},
			getMineList() {
				this.$Ajax('/lock/index',{}, res => {
						if (res.code == 0) {
							this.lock_end_day = res.lock_end_day
							this.lock_interest_scale = res.lock_interest_scale
							this.lock_usdt_price = res.lock_usdt_price
						}
					}
				);
			},
			buy() {
				this.openPopup('pswPopup');
			},
			submitBuy(){
				if(this.pay_password == ''){
					return this.$tools.toast('交易密码不能为空');
				}
				this.$Ajax('/lock/lock', 
				{
					amount: this.num,
					payPassword : md5(this.pay_password).toString(),
				}, res => {
						if (res.code == 0) {
							this.pay_password ='',
							uni.showToast({
								title: res.msg,
								icon: "none",
								mask: true,
								duration: 1000,
								position: 'center'
							})
							// this.$tools.toast(res.msg);
							this.hidePopup('pswPopup');
						}
					}
				);
			},
			// 加
			plus() {
				this.num++
			},
			// 减
			reduce() {
				if(this.num == 1){
					this.num == 1
				}else{
					this.num--
				}
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
					this.pay_password = '';
				}
			}
		}
	};
</script>

<style>
	@import '@/common/css/style.css';
	.header{background: none !important;}
</style>
