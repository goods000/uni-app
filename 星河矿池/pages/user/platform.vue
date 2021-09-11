<template>
	<view class="page">
		<view class="header_bar header_bg header_border">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">合作平台</view>
			</view> 
		</view> 
		
		<view class="main">
			<view class="announcement">
				<view class="announcement-wrapper">
					<view class="initNoData" v-if="sourceList.length == 0">暂无数据</view>
					
					<view class="announcement-item announcement-item" 
					v-for="(item,index) in sourceList" :key="index"
					@click="openSource(item.url)">
						<view class="announcement-item__content">
							<view class="announcement-item__title">{{item.name}}</view>
							<view class="announcement-item__date">{{item.url}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			sourceList:[
				{name:'IPFS',url:'https://filfox.info/zh'},
				{name:'ETH',url:'https://cn.etherscan.com/'},
				{name:'BZZ',url:'http://bzzscan.com/'},
				{name:'PHA',url:'https://phala.subscan.io/'},
				{name:'ICP',url:'https://m.bibiqing.com/coin/dfinity'},
			]
		};
	},
	onShow() {
	},
	methods: {
		openSource(url){
			console.log(url);
			plus.runtime.openURL(url, function(res) {  
				console.log(res);  
			});  
		},
	}
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/announcement/announcement';
page{background: #FFFFFF;}
.announcement-item__date{
	background: none;
}
</style>
