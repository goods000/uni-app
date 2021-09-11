<template>
	<view class="neil-modal" @touchmove.stop.prevent="bindTouchmove" :class="{ 'neil-modal--show': isOpen }">
		<view class="neil-modal__mask" @click="clickMask"></view>
		<view class="neil-modal__container">
			<view class="neil-modal__wrapper">
				<view class="neil-modal__header" v-if="title.length > 0">{{ title }}</view>
				<view class="neil-modal__content" v-if="content">
					<text class="modal-content">{{ content }}</text>
				</view>
				<view class="neil-modal__note" v-if="note">
					<text class="modal-note">{{ note }}</text>
				</view>
			</view>
			<view class="neil-modal__footer">
				<view
					v-if="showCancel"
					class="neil-modal__footer-left"
					@click="clickLeft"
					:style="{ color: cancelColor }"
					hover-class="neil-modal__footer-hover"
					:hover-start-time="20"
					:hover-stay-time="70"
				>
					{{ cancelText }}
				</view>
				<view
					class="neil-modal__footer-right"
					@click="clickRight"
					:style="{ color: confirmColor }"
					hover-class="neil-modal__footer-hover"
					:hover-start-time="20"
					:hover-stay-time="70"
				>
					{{ confirmText }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'neil-modal',
	props: {
		title: {
			//标题
			type: String,
			default: ''
		},
		content: String, //提示的内容
		note: String, //提示的内容
		align: {
			//content 的对齐方式left/center/right
			type: String,
			default: 'left'
		},
		cancelText: {
			//取消按钮的文字，默认为"取消"
			type: String,
			default: '取消'
		},
		cancelColor: {
			//取消按钮颜色
			type: String,
			default: '#999999'
		},
		confirmText: {
			//确定按钮的文字，默认为"确定"
			type: String,
			default: '确定'
		},
		confirmColor: {
			//确认按钮颜色
			type: String,
			default: '#f7ca42'
		},
		showCancel: {
			//是否显示取消按钮，默认为 true
			type: [Boolean, String],
			default: true
		},
		show: {
			//是否显示模态框
			type: [Boolean, String],
			default: false
		},
		autoClose: {
			//点击遮罩是否自动关闭弹窗
			type: [Boolean, String],
			default: true
		}
	},
	data() {
		return {
			isOpen: false
		};
	},
	watch: {
		show(val) {
			this.isOpen = val;
		}
	},
	created() {
		this.isOpen = this.show;
	},
	methods: {
		bindTouchmove() {},
		clickLeft() {
			setTimeout(() => {
				this.$emit('cancel');
			}, 200);
			this.closeModal();
		},
		clickRight() {
			setTimeout(() => {
				this.$emit('confirm');
			}, 200);
			this.closeModal();
		},
		clickMask() {
			if (this.autoClose) {
				this.closeModal();
			}
		},
		closeModal() {
			this.showAnimation = false;
			this.isOpen = false;
			this.$emit('close');
		}
	}
};
</script>

<style lang="scss">
$bg-color-mask: rgba(0, 0, 0, 0.5); //遮罩颜色
$bg-color-hover: #f1f1f1; //点击状态颜色

.neil-modal {
	position: fixed;
	visibility: hidden;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index: 1000;
	transition: visibility 200ms ease-in;
	.neil-modal__header {
		font-weight: bold;
		text-align: center;
		// padding: 60upx 0;
	}
	&.neil-modal--show {
		visibility: visible;
	}

	&__wrapper {
		padding: 60upx 0;
	}

	&__header {
		position: relative;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		// padding: 18upx 24upx;
		line-height: 1.5;
		color: #2f3033;
		font-size: 32upx;
		text-align: center;
		box-sizing: border-box;
		// &::after {
		// 	content: ' ';
		// 	position: absolute;
		// 	left: 0;
		// 	bottom: -0.5px;
		// 	right: 0;
		// 	border-top: 1px solid #e5e5e5;
		// 	transform-origin: 0 0;
		// 	transform: scaleY(0.5);
		// }
	}

	&__container {
		position: absolute;
		z-index: 999;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		transition: transform 0.3s;
		width: 540upx;
		border-radius: 20upx;
		background-color: #fff;
		text-align: center;
		overflow: hidden;
		opacity: 0;
		transition: opacity 200ms ease-in;
	}

	&__content {
		position: relative;
		color: #333;
		font-size: 28upx;
		box-sizing: border-box;
		line-height: 1.5;
	}

	&__note {
		position: relative;
		font-size: 28upx;
		box-sizing: border-box;
		line-height: 1.5;
		color: #999999;
	}

	&__footer {
		position: relative;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #333;
		font-size: 32upx;
		display: flex;
		flex-direction: row;
		border-top: 1upx solid rgba(229, 229, 229, 0.5);

		&-left,
		&-right {
			font-weight: bold;
			position: relative;
			flex: 1;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			height: 88upx;
			font-size: 28upx;
			line-height: 88upx;
			text-align: center;
			// background-color: #f6f6f7;
			color: #999999;
		}

		&-right {
			// background-color: #ff6200;
			// color: #fff;
			color: #f7ca42;
		}

		&-left::after {
			content: ' ';
			position: absolute;
			right: -1px;
			top: 0;
			width: 1px;
			bottom: 0;
			border-right: 1px solid #e5e5e5;
			transform-origin: 0 0;
			transform: scaleX(0.5);
		}

		&-hover {
			// background-color: $bg-color-hover;
			opacity: 0.9;
		}
	}

	&__mask {
		display: block;
		position: absolute;
		z-index: 998;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: $bg-color-mask;
		opacity: 0;
		transition: opacity 200ms ease-in;
		&.neil-modal--show {
			opacity: 1;
		}
	}

	&--padding {
		padding: 32upx 24upx;
		min-height: 90upx;
	}
	&--show {
		.neil-modal__container,
		.neil-modal__mask {
			opacity: 1;
		}
	}
}
</style>
