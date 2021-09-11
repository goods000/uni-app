<template>
	<view class="pages">
		<view class="initHeader initHeader--fixed initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">工单</view>
				<view class="initHeader-right initHeader-right--text" @click="openPopup('closePopup')" v-if="workInfo.status != 1">结束</view>
			</view>
		</view>
		<view class="main">
			<view class="titleInfoBox">
				<view class="titleInfoBox-wrapper">
					<view class="titleInfoBox-title">{{ workInfo.title }}</view>
					<view class="titleInfoBox-date">{{ workInfo.createTime }}</view>
				</view>
			</view>
			<view class="messageBox">
				<scroll-view
					class="messageBox-wrapper"
					:scroll-y="true"
					:scroll-into-view="scrollId"
					:scroll-with-animation="true"
					:style="{ height: style.contentViewHeight + 'px' }"
				>
					<view class="messageBox-content">
						<view
							class="messageBox-list"
							v-for="(item, index) in workMessageList"
							:key="index"
							:id="'init' + item.id"
						>
							<view class="messageBox-list__date">{{ item.createTime }}</view>
							<view class="messageBox-list__plane" :class="[{ 'messageBox-list__plane--left': item.type == 0 }, { 'messageBox-list__plane--right': item.type == 1 }]">
								<view class="messageBox-list__content">
									<view class="messageBox-list__content-pic" v-if="item.pic1 != ''"><image :src="item.pic1" mode="widthFix"></image></view>
									<view class="messageBox-list__content-pic" v-if="item.pic2 != ''"><image :src="item.pic2" mode="widthFix"></image></view>
									<view class="messageBox-list__content-pic" v-if="item.pic3 != ''"><image :src="item.pic3" mode="widthFix"></image></view>
									<view class="messageBox-list__content-message">{{ item.content }}</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="fixedBox">
				<view class="fixedBox-wrapper">
					<view class="initButton"><view class="initButton-btn initButton-btn--style" @click="openPopup('messagePopup')">发消息</view></view>
				</view>
			</view>
		</view>

		<!-- 策略填写 -->
		<uni-popup ref="messagePopup" type="center" :animation="true" @change="changePopup">
			<view class="initPopup">
				<view class="initPopup-wrapper">
					<view class="initPopup-title">消息回复</view>
					<view class="initPopup-listBox">
						<view class="initPopup-listBox__list">
							<view class="initPopup-listBox__list-textarea initPopup-listBox__list-textarea--long">
								<textarea
									type="text"
									placeholder-class="initPopup-listBox__list-placeholder"
									:maxlength="maxMessageLength"
									placeholder="请输入您要回复的消息"
									v-model="message"
								/>
								<view class="initPopup-listBox__list-max">{{ messageLength }}/{{ maxMessageLength }}</view>
							</view>
						</view>
					</view>
					<view class="initPopup-buttonBox">
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--cancel" @click="hidePopup('messagePopup')">取消</view>
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--confirm" @click="sendMessage()">发送</view>
					</view>
				</view>
			</view>
		</uni-popup>

		<!-- 结束工单 -->
		<uni-popup ref="closePopup" type="center" :animation="true" @change="changePopup">
			<view class="initPopup">
				<view class="initPopup-wrapper">
					<view class="initPopup-title">有解决您的问题吗？</view>
					<view class="initPopup-buttonBox">
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--cancel" @click="closeOrder(0)">未解决</view>
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--confirm" @click="closeOrder(1)">已解决</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue';
export default {
	components: {
		uniPopup
	},
	data() {
		return {
			workInfo: [],
			workMessageList: [],
			workId: null,

			message: '',
			maxMessageLength: 120,

			scrollId: '',
			scrollTop: 999,
			old: {
				scrollTop: 0
			},
			style: {
				pageHeight: 0,
				contentViewHeight: 0,
				footViewHeight: 90,
				mitemHeight: 0
			}
		};
	},
	// 计算
	computed: {
		messageLength() {
			return this.message.length;
		}
	},
	onLoad(hash) {
		this.workId = hash.value1;
	},
	onShow() {
		this.init();
		const res = uni.getSystemInfoSync(); //获取手机可使用窗口高度     api为获取系统信息同步接口
		let statusBarHeight= res.statusBarHeight;
		this.style.pageHeight = res.windowHeight;
		this.style.contentViewHeight = res.windowHeight - uni.upx2px(90) - uni.upx2px(120) - uni.upx2px(140) - statusBarHeight; //像素   因为给出的是像素高度 然后我们用的是upx  所以换算一下

		// this.goTop();
	},
	methods: {
		init() {
			this.scrollId = '';
			this.workMessageList = [];
			this.getOrderInfo();
		},
		getOrderInfo() {
			this.$Ajax(
				'/front/work/myWorkDetail',
				{
					workId: this.workId
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.workInfo = res.obj.model;
						this.workMessageList = res.obj.detail.reverse();
						this.scrollToLastView();
					}
				}
			);
		},
		scrollToLastView() {
			setTimeout(()=>{
				let arrayLength = this.workMessageList.length;
				let lastId = this.workMessageList[arrayLength - 1].id;
				this.scrollId = 'init' + lastId;
			}, 200)
		},
		sendMessage() {
			this.$Ajax(
				'/front/work/reply',
				{
					workId: this.workId,
					content: this.message
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.hidePopup('messagePopup');
						this.workMessageList.push()
						this.init();
						this.$tools.toast('发送成功');
					}
				}
			);
		},
		closeOrder(type) {
			this.$Ajax(
				'/front/work/end',
				{
					workId: this.workId,
					result: type
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.$tools.toastBack('谢谢您的理解', 1);
					}
				}
			);
		},
		/* 弹出框公用 */
		openPopup(e) {
			this.$refs[e].open();
		},
		hidePopup(e) {
			this.$refs[e].close();
		},
		changePopup(e) {
			console.log('popup ' + e.type + ' 状态', e.show);
			if (!e.show) {
				this.message = '';
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/workOrder_detail';
</style>
