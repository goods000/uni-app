import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		isLogin: uni.getStorageSync('token') != '',
		token: uni.getStorageSync('token'),
		MItoken: uni.getStorageSync('MItoken'),
	},
	mutations: {
		changeToken(state) {
			uni.setStorageSync('MItoken');
			uni.setStorageSync('token');
		}

	}
})

export default store
