import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		language: uni.getStorageSync('initlanguage') == 'en' ? 'en' : 'cn',
		isLogin: uni.getStorageSync('token') != '',
		token: uni.getStorageSync('token')
	},
	mutations: {
		changeLanguage(state, type = 'en') {
			console.log("type：",type);
			state.initlanguage = type;
			uni.setStorageSync('initlanguage', type);
			// #ifdef APP-PLUS
			// plus.navigator.setStatusBarStyle(type === "dark" ? "light" : "dark");
			// #endif
		},
	}
})

export default store
