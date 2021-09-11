<template>
	<view class="pages">
		<view class="import">
			
			<view class="importBox-header">
				<view class="importBox-header-left" @click="$tools.back(1)">
					<image src="../../static/operate/icon-back.png" mode="widthFix"></image>
				</view>
				<view class="importBox-title">导入钱包</view>
			</view>
			<view class="initButtonTabs">
				<view class="initButtonTabs-control">
					<view class="initButtonTabs-control__aniBg" :style="[{ left: (100 / 2) * recordTabsActive + '%' }, { width: 100 / 2 + '%' }]"></view>
					<view
						class="initButtonTabs-control__item"
						:class="{ 'initButtonTabs-control__item--active': recordTabsActive == 0 }"
						@click="changeRecordTabsActive(0)"
					>助记词导入
					</view>
					<view
						class="initButtonTabs-control__item"
						:class="{ 'initButtonTabs-control__item--active': recordTabsActive == 1 }"
						@click="changeRecordTabsActive(1)"
					>私钥导入
					</view>
				</view>
			</view>
			
			<view class="importBox-text">
				<textarea :placeholder="'请输入' + (recordTabsActive == 0 ? '助记词单词,助记词用空格分隔开' : '私钥,私钥请留意字符大小写')" v-model="words" placeholder-style="color:#999999" />
			</view>
			
			<view class="importBox-list">
				<view class="importBox-list-item">
					<input type="text" placeholder="请输入钱包名称" placeholder-style="color:#999999" v-model="username" />
				</view>
				<view class="importBox-list-item">
					<input type="password" placeholder="请输入钱包密码" placeholder-style="color:#999999" v-model="password" />
				</view>
				<view class="importBox-list-item">
					<input type="password" placeholder="请再次输入钱包密码" placeholder-style="color:#999999" v-model="re_password" />
				</view>
			</view>
			
			<view class="importBox-btn">
				<view class="initBtn" @click="submit()">
					开始导入
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				recordTabsActive: 0,
				words:'',
				username:'',
				password:'',
				re_password:'',
			}
		},
		onShow() {
	
		},
		methods: {
			changeRecordTabsActive(index) {
				if (this.recordTabsActive != index) {
					this.recordTabsActive = index;
					this.words = ''
				}
			},
			submit(){
				if (this.words == '' ) {
					return this.$tools.toast('请输入' + (this.recordTabsActive == 0 ? '助记词单词' : '私钥'));
				}
				if (this.username == '' ) {
					return this.$tools.toast('请输入钱包名称');
				}
				if (this.password == '' ) {
					return this.$tools.toast('请输入钱包密码');
				}
				if (this.re_password == '' ) {
					return this.$tools.toast('请再次输入钱包密码');
				}
				if (this.password != this.re_password){
					return this.$tools.toast('两者密码不一致');
				}
				if (this.recordTabsActive == 0){
					this.$Ajax(
						'/front/address/import/bypassphrase',
						{
							passphrase: this.words,
							name: this.username,
							pwd: this.password,
						},
						res => {
							if (res.code == 0) {
								uni.setStorageSync('token', res.obj.token);
								uni.setStorageSync('userId', res.obj.passphrase.userId);
								uni.setStorageSync('passphrase', this.words);
								
								this.$tools.toastSwitchTab(res.msg, '../index/index');
							}
						}
					);
				}else{
					this.$Ajax(
						'/front/address/import/byprivatekey',
						{
							privateKey: this.words,
							name: this.username,
							pwd: this.password,
						},
						res => {
							if (res.code == 0) {
								uni.setStorageSync('token', res.obj.token);
								uni.setStorageSync('userId', res.obj.passphrase.userId);
								uni.setStorageSync('passphrase', this.words);
								
								this.$tools.toastSwitchTab(res.msg, '../index/index');
							}
						}
					);
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/operate/import';
	page{background: #FFFFFF;}
</style>
