<template>
	<view class="pages">
		<view class="header_bar header_fixed header_bg">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">记录详情</view>
			</view> 
		</view> 
		<view class="record">
			<view class="recordBox">
				<view class="recordBox-list">
					<view class="recordBox-list-header">
						<view class="recordBox-list-header-title">{{fclName}}</view>
						<view class="recordBox-list-header-price">{{quantity}}</view>
					</view>
					<view class="recordBox-list-item">
						<view class="recordBox-list-item-title">利息</view>
						<view class="recordBox-list-item-status">{{interest}}%</view>
					</view>
					<view class="recordBox-list-item">
						<view class="recordBox-list-item-title">累计收益</view>
						<view class="recordBox-list-item-status yellow">{{accEarnings}}</view>
					</view>
					<view class="recordBox-list-item">
						<view class="recordBox-list-item-title">发布时间</view>
						<view class="recordBox-list-item-status">{{createTime}}</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="fixedBox">
			<view class="fixedBox-wrapper">
				<view class="initButton">
					<view class="initButton-btn initButton-btn--style" v-if="finclStatus == 0" @click="openPopup('tipsPopup')">撤销约定</view>
					<view class="initButton-btn initButton-btn--disable" v-else>撤销约定</view>
				</view>
			</view>
		</view>
		
		<!-- 密码弹出框 -->
		<uni-popup ref="psdPopup" type="center" :animation="true" @change="changePopup">
			<view class="initPopup">
				<view class="initPopup-wrapper">
					<view class="initPopup-headerTitle">交易密码</view>
					<view class="initPopup-body">
						<view class="initPopup-listBox">
							<view class="initPopup-listBox__list">
								<view class="initPopup-listBox__list-label">请输入您的交易密码:</view>
								<view class="initPopup-listBox__list-input">
									<input type="password" placeholder="请输入您的交易密码" placeholder-class="initPopup-listBox__list-input--class" v-model="tradePwd"/>
								</view>
							</view>
						</view>
					</view>
					<view class="initPopup-buttonBox">
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--cancel" @click="hidePopup('psdPopup');">取消</view>
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--confirm" @click="submit()">确定</view>
					</view>
				</view>
			</view>
		</uni-popup>
		
		<!-- 撤销弹出框 -->
		<uni-popup ref="tipsPopup" type="center" :animation="true" @change="changePopup">
			<view class="initPopup">
				<view class="initPopup-wrapper">
					<view class="initPopup-headerTitle">注 意</view>
					<view class="initPopup-body">
						<view class="initPopup-listBox">
							<view class="initPopup-listBox__list">
								<view class="initPopup-listBox__list-title">撤销当前理财将会导致您损失部分收益</view>
								<view class="initPopup-listBox__list-title">确定撤销吗？</view>
							</view>
						</view>
					</view>
					<view class="initPopup-buttonBox">
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--cancel" @click="hidePopup('tipsPopup')">取消</view>
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--confirm" @click="next()">下一步</view>
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
				// 页数
				pageSize: 20,
				pageNum: 1,
				pages: 0,
				tradePwd:'',
				recordList: {currency_id:1,currencyName:'提供GCT',createTime:'2122-2-23 23:23',quantity:12,statusStr:'EDD',num:'-452.332'}
				,
			}
		},
		onLoad(option) {
			this.orderId = option.value1;
			this.fclName = option.value2;
			this.quantity = option.value3;
			this.interest = option.value4;
			this.accEarnings = option.value5;
			this.createTime = option.value6;
			this.finclStatus = option.value7;
		},
		onReachBottom() {
			if (this.pageNum >= this.pages) {
				return this.$tools.toast('到底啦');
			} else {
				this.pageNum++;
				this.getList();
			}
		},
		onShow() {
		},
		methods:{
			submit(){
				if(this.tradePwd == ''){
					return this.$tools.toast('请输入您的交易密码');
				}
				this.$Ajax('/front/regular/financailPayUndo', {
					orderId: this.orderId,
					tradePwd: this.tradePwd,
				}, res => {
						if (res.code == 0) {
							return this.$tools.toastBack('撤销成功',1);
						}
					}
				);
			},
			next(){
				this.hidePopup('tipsPopup');this.openPopup('psdPopup');
			},
			getList() {
				this.$Ajax('/front/financial/detailInfo', {
					type: this.type,
					id: this.id,
				}, res => {
						if (res.code == 0) {
							this.recordList = res.obj;
						}
					}
				);
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '/scss/recordDetails';
	.record .recordBox-list-item{
		align-items: flex-start;
		.yellow{
			color: $globalColor-style;
			font-weight: bold;
		}
	}
</style>
