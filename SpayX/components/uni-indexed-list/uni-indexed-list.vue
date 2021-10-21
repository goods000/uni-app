<template>
	<view class="uni-indexed">
		<scroll-view :scroll-into-view="scrollViewId" :style="{ height: winHeight + 'px' }" class="uni-indexed__list" scroll-y>
			<!-- <view class="common">
				<view class="tit">
					常用
				</view>
				<view  @click="onClick(idx, idx)"
				class="list" v-for="(item,idx) in commonList" 
				:key='idx'>
					<view>{{item.name}}</view>
					<view>{{item.num}}</view>
				</view>
			</view> -->
			<block v-for="(list, idx) in lists" :key="idx">
				<view v-if="list.items && list.items.length > 0" :id="'uni-indexed-list-' + list.key" class="uni-indexed__list-title">{{ list.key }}</view>
				<view v-if="list.items && list.items.length > 0" class="uni-list">
					<view v-for="(item, index) in list.items" :key="index" class="uni-list-item" hover-class="uni-list-item--hover">
						<view class="uni-list-item__container" @click="onClick(idx, index)">
							<!-- <view v-if="showSelect" style="margin-right: 20upx;">
								<uni-icon :type="item.checked ? 'checkbox-filled' : 'circle'" :color="item.checked ? '#007aff' : '#aaa'" size="24" />
							</view> -->
							<view class="uni-list-item__content">{{ item.name }}</view>
							<view class="num">
								+{{ item.num }}
							</view>
						</view>
					</view>
				</view>
			</block>
		</scroll-view>
		<view :class="touchmove ? 'active' : ''" :style="{ height: winHeight + 'px' }" class="uni-indexed__menu" @touchstart="touchStart" @touchmove.stop.prevent="touchMove" @touchend="touchEnd">
			<text v-for="(list, key) in lists" :key="key" :class="touchmoveIndex == key ? 'active' : ''" :style="{ height: itemHeight + 'px', lineHeight: itemHeight + 'px' }" class="uni-indexed__menu-item">
				{{ list.key }}
			</text>
		</view>
		<view v-if="touchmove" class="uni-indexed--alert">{{lists[touchmoveIndex].key}}</view>
	</view>
</template>
<script>
	export default {
		name: 'UniIndexedList',
		props: {
			options: {
				type: Array,
				default () {
					return [];
				}
			},
			showSelect: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				lists: this.options,
				touchmove: false,
				touchmoveIndex: -1,
				itemHeight: 0,
				winHeight: 0,
				scrollViewId: '',
				commonList:[
					
				]
			};
		},
		created() {
			let winHeight = uni.getSystemInfoSync().windowHeight  - 50;
			this.itemHeight = winHeight / this.options.length-2;
			this.winHeight = winHeight;

			// if (!this.showSelect) {
			// 	this.lists = this.options;
			// 	return;
			// }
			// console.log(this.options)
			this.lists = this.options.map(value => {
				// console.log(value)
				let items = value.data.map(item => {
					let obj = {};
					// for (let key in item) {
					obj['key'] = value.letter;
					obj['name'] = item.name;
					obj['num'] = item.num;
					// }
					// obj.checked = item.checked ? item.checked : false;
					// console.log(obj);
					return obj;
				});
				// console.log(items)
				return {
					title: value.letter,
					key: value.letter,
					items: items
				};
			});
			// console.log(this.lists)
		},
		methods: {
			touchStart(e) {
				this.touchmove = true;
				let pageY = e.touches[0].pageY-46;
				let index = Math.floor(pageY / this.itemHeight);
				let item = this.lists[index];
				if (item) {
					this.scrollViewId = 'uni-indexed-list-' + item.key;
					this.touchmoveIndex = index;
				}
			},
			touchMove(e) {
				let pageY = e.touches[0].pageY-46;
				let index = Math.floor(pageY / this.itemHeight);
				let item = this.lists[index];
				if (item) {
					this.scrollViewId = 'uni-indexed-list-' + item.key;
					this.touchmoveIndex = index;
				}
			},
			touchEnd() {
				this.touchmove = false;
				this.touchmoveIndex = -1;
			},
			onClick(idx, index) {
				let obj = {};
				for (let key in this.lists[idx].items[index]) {
					obj[key] = this.lists[idx].items[index][key];
				}
				let select = [];
				if (this.showSelect) {
					this.lists[idx].items[index].checked = !this.lists[idx].items[index].checked;
					this.lists.forEach((value, idx) => {
						value.items.forEach((item, index) => {
							if (item.checked) {
								let obj = {};
								for (let key in this.lists[idx].items[index]) {
									obj[key] = this.lists[idx].items[index][key];
								}
								select.push(obj);
							}
						});
					});
				}
				this.$emit('click', {
					item: obj,
					select: select
				});
			}
		}
	};
</script>
<style lang="less" scoped>
	@charset "UTF-8";
	@black: #2f3033;
	@orange: #ff6200;
	.uni-list {
		background-color: #fff;
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column
	}

	.uni-list::after {
		position: absolute;
		z-index: 10;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: transparent
	}

	.uni-list::before {
		position: absolute;
		z-index: 10;
		right: 0;
		top: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: transparent
	}

	.uni-list-item {
		font-size: 32upx;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center
	}

	.uni-list-item__container {
		padding: 0 40upx;
		width: 100%;
		box-sizing: border-box;
		flex: 1;
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		view {
			line-height: 100upx;
			font-size: 32upx;
			color:@black;
		}
	}

/* 	.uni-list-item__container:after {
		position: absolute;
		z-index: 3;
		right: 0;
		bottom: 0;
		left: 30upx;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc
	} */

	.uni-indexed {
		display: flex;
		flex-direction: row;
		margin-top:92upx; 
		// box-sizing: border-box;
		// padding-top: 92upx;
	}
	.common {
		padding-right: 44upx;
		.tit {
			font-size: 32upx;
			color:@black;
			line-height: 92upx;
			padding: 0 40upx;
			font-weight: bold;
		}
		.list {
			height: 92upx;
			padding: 0 40upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}
	.uni-indexed__list {
		flex: 1;
		height: 100vh
	}

	.uni-indexed__list-title {
		font-weight: bold;
		padding-left: 40upx;
		font-size: 32upx;
		color:@black;
		line-height: 92upx;
	}

	.uni-indexed__menu {
		width: 44upx;
		height: 100vh;
		/* background-color: #d3d3d3; */
		display: flex;
		flex-direction: column
	}

	.uni-indexed__menu.active {
		background-color: #f4f5f6
	}

	.uni-indexed__menu.active .uni-indexed__menu-item {
		color: #333
	}

	.uni-indexed__menu.active .uni-indexed__menu-item.active {
		color: #ff6200
	}

	.uni-indexed__menu-item {
		color: #aaa;
		font-size: 22upx;
		text-align: center
	}

	.uni-indexed--alert {
		position: absolute;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		z-index: 20;
		width: 160upx;
		height: 160upx;
		left: 50%;
		top: 50%;
		margin-left: -80upx;
		margin-top: -80upx;
		border-radius: 80upx;
		text-align: center;
		font-size: 70upx;
		color: #fff;
		background-color: rgba(0, 0, 0, .5)
	}
</style>