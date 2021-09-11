import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		projectName: '穿越牛熊',
		projectCurrencyName: 'AMC',
		pageTheme: uni.getStorageSync('pageTheme') == 'light' ? 'light' : 'dark',
		eyeShow: uni.getStorageSync('pageTheme') == 'light' ? '../../static/public/icon-eye-open-light.png' : '../../static/public/icon-eye-open-dark.png',
		eyeHide: uni.getStorageSync('pageTheme') == 'light' ? '../../static/public/icon-eye-close-light.png' : '../../static/public/icon-eye-close-dark.png',
		inputClear: uni.getStorageSync('pageTheme') == 'light' ? '../../static/public/icon-clear-light.png' : '../../static/public/icon-clear-dark.png',
		isLogin: uni.getStorageSync('token') != '',
		token: uni.getStorageSync('token')
	},
	mutations: {
		changePageTheme(state, type = 'light') {
			state.pageTheme = type;
			uni.setStorageSync('pageTheme', type);
			// #ifdef APP-PLUS
			// plus.navigator.setStatusBarStyle(type === "dark" ? "light" : "dark");
			// #endif
		}

	}
})

export default store
