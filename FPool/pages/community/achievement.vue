<template>
	<view class="contentBg">
		<view class="header_bar">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">{{ i18n.user.list_02 }}</view>
			</view> 
		</view> 
		
		<view class="community">
			<view class="communityBox">
				<view class="communityBox-list">
					<view class="communityBox-list-title">{{ i18n.team.total }}</view>
					<view class="communityBox-list-price">{{ teamProfit == '' ? '0' : teamProfit }} T</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				teamProfit:''
			}
		},
		computed: {
			i18n() {
				return this.$t('message');
			}
		},
		onShow() {
			this.init();
		},
		methods: {
			init(){
				this.getmyTeamProfit();
			},
			getmyTeamProfit(){
				this.$Ajax('/front/user/myTeamProfit', {}, res => {
					if (res.code == 0) {
						console.log(JSON.stringify(res.obj))
						this.teamProfit = res.obj;
					}
				});
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/community/community';
</style>
