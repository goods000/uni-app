import Vue from 'vue'
import App from './App'
import store from './store'
import tools from './components/tools.js'
import Ajax from './components/ajax.js'
import * as filters from './components/filters.js'
// import md5 from './components/md5.js';
import {
	showActiveModel
} from "./common/model.js"


Vue.config.productionTip = false

/* 过滤器 */
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})

Vue.prototype.$tools = tools
Vue.prototype.$Ajax = Ajax
Vue.prototype.$showActiveModel = showActiveModel
// Vue.prototype.$md5 = md5;
Vue.prototype.$setNarBar = function(title) {
	console.log('当前语言是：' + uni.getStorageSync('initlanguage'))
	if (uni.getStorageSync('initlanguage') == 'en') {
		uni.setNavigationBarTitle({
			title: title
		})
	}
}

Vue.mixin({
	computed: {
		i18n() {
			return this.$t('message')
		}
	},
})

import i18n from './components/index18.js';
App.mpType = 'app'

const app = new Vue({
	i18n,
	store,
	...App
})
app.$mount()
