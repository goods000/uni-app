<script>
	console.log('%c代码由%c lowkey %c开发','color: white;font-size: 18px;','color: white;font-size: 24px;','color: white;font-size: 18px;');
	
	import version from './components/url.js';
	export default {
		// 修复了未登录的重复跳转问题
		globalData: {
			is_flag: true
		},
		onLaunch: function() {
			
		},
		onShow: function() {
			
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
</style>
