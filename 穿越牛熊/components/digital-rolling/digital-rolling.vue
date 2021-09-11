<template>
	<view>
		<!-- #ifdef H5 -->
		<view class="digital-rolling">
			<view v-for="(item, index) in currentList" :key="index">
				<view class="digital-rolling-each-item-cur-item digital-rolling-dot" v-if="item === '.'">{{ item }}</view>
				<swiper v-else :duration="300" :vertical="true" :circular="true" :current="item % 10" class="digital-rolling-each-item">
					<swiper-item class="digital-rolling-each-item-cur-item" v-for="i in 10" :key="i">{{ i - 1 }}</swiper-item>
				</swiper>
			</view>
			<view class="stopmove" @touchmove.stop.prevent=""><!-- 禁止用户手动滚动 --></view>
		</view>
		<!-- #endif -->
		<!-- #ifndef H5 -->
		<view class="digital-rolling">
			<view v-for="(item, index) in currentList" :key="index">
				<view class="digital-rolling-each-item-cur-item digital-rolling-dot" v-if="item === '.'">{{ item }}</view>
				<swiper v-else :duration="300" :vertical="true" :circular="true" :current="item % 10" class="digital-rolling-each-item">
					<swiper-item class="digital-rolling-each-item-cur-item" v-for="i in 10" :key="i">{{ i - 1 }}</swiper-item>
				</swiper>
			</view>
			<view class="digital-rolling-stopmove" @touchmove.stop.prevent=""><!-- 禁止用户手动滚动 --></view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			currentList: [],
			count: 0
		};
	},
	props: {
		digitFrom: {
			//初始值
			type: Number,
			default: 0,
			required: true
		},
		digitTo: {
			//目标值
			type: [String, Number],
			default: 0,
			required: true
		},
		limit: {
			// 小数位数限制，注意是截断，非四舍五入
			type: Number,
			default: 0
		}
	},
	created() {
		this.genCurrentList();
		this.makeMove();
	},
	computed: {
		digitFromList() {
			return this.genTargetList(this.digitFrom);
		},
		digitToList() {
			return this.genTargetList(this.digitTo);
		}
	},
	methods: {
		genTargetList(target) {
			const arr = target.toString().split('');
			const hasDot = arr.includes('.');
			let index = 0;
			if (hasDot) {
				index = arr.indexOf('.');
			}
			if (this.limit) {
				const len = arr.length;
				if (hasDot) {
					if (len >= index + 1 + this.limit) {
						return arr.slice(0, index + this.limit + 1);
					}
				} else {
					arr.push('.');
				}
				const diff = Math.abs(len - index - 1 - this.limit);
				for (let i = 0; i < diff; i++) {
					arr.push(0);
				}
				return arr;
			}
			if (hasDot) {
				return arr.slice(0, index);
			}
			return arr;
		},
		genCurrentList() {
			this.currentList = this.digitToList.map(item => (item === '.' ? item : Number(item)));
		},
		makeMove() {
			clearInterval(this.timer);
			this.timer = setInterval(() => {
				this.count++;

				for (let i = 0; i < this.digitFromList.length; i++) {
					if (this.currentList[i] === '.') continue;
					if (this.currentList[i] % 10 != this.digitToList[i]) {
						this.$set(this.currentList, i, this.currentList[i] + 1);
					}
				}
				if (this.count === 9) {
					this.count = 0;
					clearInterval(this.timer);
				}
			}, 20);
		}
	},
	watch: {
		digitTo(newV, oldV) {
			if (newV.toString().length != oldV.toString().length) {
				this.genCurrentList();
			} else {
				this.makeMove();
			}
		}
	},
	beforeDestroy() {
		clearInterval(this.timer);
	}
};
</script>

<style>
.digital-rolling {
	display: flex;
	position: relative;
	align-items: center;
	height: 50rpx;
	width: 100%;
}

.digital-rolling-each-item {
	height: 50rpx;
	width: 50rpx;
	text-align: center;
}

.digital-rolling-each-item-cur-item {
	height: 100%;
	font-size: 32rpx;
}

.digital-rolling-stopmove {
	position: absolute;
	width: 750rpx;
	height: 50rpx;
	z-index: 101;
}
</style>
