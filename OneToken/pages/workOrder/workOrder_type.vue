<template>
	<view class="pages">
		<view class="initHeader initHeader--black">
			<view class="initHeader-wrapper"><view class="initHeader-back" @click="$tools.back(1)"></view></view>
		</view>

		<view class="titleBox">
			<view class="titleBox-wrapper">
				<view class="titleBox-title">选择工单类型</view>
				<view class="titleBox-note">请根据您的问题选择相应的工单类型，然后点击下一步</view>
			</view>
		</view>

		<view class="typeBox">
			<view class="typeBox-wrapper">
				<view class="typeBox-title"><view class="typeBox-title__label">我的工单</view></view>

				<radio-group @change="radioChange" class="typeBox-body">
					<label class="typeBox-list" v-for="(item, index) in typeList" :key="index">
						<view class="typeBox-list__lable">{{ item.name }}</view>
						<view class="typeBox-list__radio"><radio :value="String(item.id)" :checked="item.id === current" color="#cb0101" style="transform:scale(0.7)" /></view>
					</label>
				</radio-group>
			</view>
		</view>

		<view class="initButton initButton--absolute"><view class="initButton-btn initButton-btn--style" @click="$tools.jump('../workOrder/workOrder_apply', current)">下一步</view></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			typeList: [],
			current: 0
		};
	},
	onShow() {
		this.init();
	},
	methods: {
		init() {
			this.getTypeList();
		},
		getTypeList() {
			this.$Ajax('/front/work/typeList', {}, res => {
				console.log('工单类型：' + JSON.stringify(res));
				if (res.code == 0) {
					this.typeList = res.obj;
					this.current = res.obj[0].id;
				}
			});
		},
		radioChange(evt) {
			for (let i = 0; i < this.typeList.length; i++) {
				if (this.typeList[i].id == evt.target.value) {
					this.current = this.typeList[i].id;
					break;
				}
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/workOrder_type';
</style>
