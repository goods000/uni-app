<template>
	<view class="pages">
		<view class="">
			
			<image src=".../../static/index/icon-index-bg.png" mode="widthFix" class="node_bg"></image>
			
			<view class="header_bar">
				<view class="header">
					<view class="header-white" @click="$tools.back(1)"></view>
					<view class="header-title-white">生态节点</view>
				</view> 
			</view> 
			
			<view class="node_box">
				<image src="../../static/node/icon-node-title.png" mode="widthFix" class="node_box_title"></image>
				<view class="node_box_tips">······</view>
				<view class="node_box_txt">每日高收益</view>
			</view>
			
			<view class="node-list">
				<view class="formBox">
					<view class="formBox-form">
						<view class="formBox-form-label">实时价格</view>
						<input type="text" :value="'1（OC）='+ usdt_price +'（USDT）'" disabled/>
					</view>
					<view class="formBox-form">
						<view class="formBox-form-label">锁仓数量</view>
						<input type="text" placeholder="请输入折合价格大于100U的OC锁仓数量" v-model="num"/>
						<view class="formBox-form-tips">OC</view>
					</view>
					<view class="formBox-item">当前可用OC {{ using }}</view>
					<view class="formBox-form">
						<view class="formBox-form-label">折合价格</view>
						<input type="text" placeholder="0.00" :value="price | number(4) " disabled/>
						<view class="formBox-form-tips">USDT</view>
					</view>
					<view class="formBox-form">
						<view class="formBox-form-label">每日算力</view>
						<input type="text" value="0.006%" class="chioce" disabled/>
					</view>
					<view class="formBox-form">
						<view class="formBox-form-label">钱包密码</view>
						<input type="password" placeholder="请输入您的钱包密码" v-model="password"/>
					</view>
					
					
				</view>
				<view class="initBtn" @click="submit()">立即锁仓</view>
			</view>
			
			<view class="formBox-tips">
				<view class="formBox-tips-title">注意：</view>
				<view class="formBox-tips-title">钱包不会储存用户密码，无法提供找回或重置功能。如果忘记密码，用户只能通过自己备份的助记词或私钥，重新导入后重新设置密码。</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				num:'',
				password:'',
				userList:[],
				userBase:[],
				assetsTotalList:[],
				currencyList:[],
				usdt_price:'',
				a_num:'',
				using: 0,
			}
		},
		onShow() {
			this.init();
		},
		computed:{
			price() {
				let a_num = this.num * this.usdt_price;
				return a_num;
			},
		},	
		methods: {
			init(){
				this.getUserList();
				this.getUsdt();
				this.getAssetsTotal();
			},
			// 获取用户信息
			getUserList() {
				this.$Ajax('/front/user/baseInfo', {}, res => {
						if (res.code == 0) {
							this.userList = res.user;
							this.userBase = res.userBase;
						}
					}
				);
			},
			// 获取USDT价格
			getUsdt() {
				this.$Ajax('/front/user/tradeUsdtAndOc', {}, res => {
						if (res.code == 0) {
							this.usdt_price = res.obj;
						}
					}
				);
			},
			// 获取资产
			getAssetsTotal() {
				this.$Ajax('/front/financial/assetsTotal', {}, res => {
					if (res.code == 0) {
						this.assetsTotalList = res.obj;
						res.obj.assetList.forEach((item,index) => {
							if(item.currencyName == 'OC'){
								this.using = item.using + item.partnerUsing
							}
						})
					}
				});
			},
			submit(){
				if(this.num == ''){
					return this.$tools.toast('请输入OC锁仓数量');
				}
				if(this.password == ''){
					return this.$tools.toast('请输入您的钱包密码');
				}
				this.$Ajax('/front/user/buyNode', {
					num: this.num,
					money: this.price,
					pwd: this.password,
				}, res => {
					if (res.code == 0) {
						this.num ='',
						this.password ='',
						this.$tools.toast(res.msg);
						this.getAssetsTotal()
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/node/node';
	page{background: #FFFFFF;}
</style>
