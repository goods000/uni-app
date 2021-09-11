import Vue from 'vue'
import App from './App'
import store from './store'
import tools from './common/js/tools.js'
import Ajax from './common/js/ajax.js'
import * as filters from './common/js/filters.js'
import './components/ican-H5Api/ican-H5Api.js' //H5支持API
import i18n from './common/js/index18.js';

Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key]) //插入过滤器名和对应方法
})

Vue.config.productionTip = false

Vue.prototype.$tools = tools
Vue.prototype.$Ajax = Ajax
Vue.prototype.$filters = filters
Vue.prototype.$store = store

/* 动态更改原生Navbar文字 */
Vue.prototype.$setNarBar = function(title) {
	if (uni.getStorageSync('initlanguage') == 'en') {
		uni.setNavigationBarTitle({
			title: title
		})
	}
}

/* 动态更改Tarbar样式 */
Vue.prototype.$setStatusBarStyle = function() {
	// #ifdef APP-PLUS
	setTimeout(() => {
	uni.setNavigationBarColor({
		frontColor: this.$store.state.pageTheme == 'light' ? '#000000' : '#ffffff',
		backgroundColor: this.$store.state.pageTheme == 'light' ? '#000000' : '#ffffff'
	})

	// plus.navigator.setStatusBarStyle(this.$store.state.pageTheme == 'light' ? 'dark' : 'light');
	}, 200);
	// #endif
}

/* 动态更改Tarbar文字/图片 */
Vue.prototype.$setTarBar = function() {
	uni.setTabBarItem({
		index: 0,
		iconPath: 'static/tarbar/icon-tarbar-1-' + this.$store.state.pageTheme + '.png',
		selectedIconPath: 'static/tarbar/icon-tarbar-1-active-' + this.$store.state.pageTheme + '.png'
	});
	uni.setTabBarItem({
		index: 1,
		iconPath: 'static/tarbar/icon-tarbar-2-' + this.$store.state.pageTheme + '.png',
		selectedIconPath: 'static/tarbar/icon-tarbar-2-active-' + this.$store.state.pageTheme + '.png'
	});
	uni.setTabBarItem({
		index: 2,
		iconPath: 'static/tarbar/icon-tarbar-midButton.png',
		selectedIconPath: 'static/tarbar/icon-tarbar-midButton.png'
	});
	uni.setTabBarItem({
		index: 3,
		iconPath: 'static/tarbar/icon-tarbar-4-' + this.$store.state.pageTheme + '.png',
		selectedIconPath: 'static/tarbar/icon-tarbar-4-active-' + this.$store.state.pageTheme + '.png'
	});
	uni.setTabBarItem({
		index: 4,
		iconPath: 'static/tarbar/icon-tarbar-5-' + this.$store.state.pageTheme + '.png',
		selectedIconPath: 'static/tarbar/icon-tarbar-5-active-' + this.$store.state.pageTheme + '.png'
	});

	uni.setTabBarStyle({
		color: this.$store.state.pageTheme == 'light' ? '#999999' : '#dedffd',
		selectedColor: this.$store.state.pageTheme == 'light' ? '#3588fe' : '#3588fe',
		backgroundColor: this.$store.state.pageTheme == 'light' ? '#FFFFFF' : '#1e2c46',
		borderStyle: this.$store.state.pageTheme == 'light' ? 'white' : 'black'
	});
}

Vue.mixin({
	computed: {
		pageTheme() {
			return this.$store.state.pageTheme
		},
		i18n() {
			return this.$t('message')
		}
	},
	// onShow() {
	// 	// 如果UI没有设计单色背景的话可以使用全局
	// 	this.$setStatusBarStyle();
	// }
})

console.log('当前主题是：' + store.state.pageTheme)

App.mpType = 'app'

const app = new Vue({
	i18n,
	store,
	...App
})

app.$mount()
