import Vue from 'vue'
import App from './App'
import store from './store'
import tools from './common/js/tools.js'
import Ajax from './common/js/ajax.js'
import * as filters from './common/js/filters.js'
import './common/js/ican-H5Api.js' //H5支持API

Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key]) //插入过滤器名和对应方法
})

Vue.config.productionTip = false

Vue.prototype.$tools = tools
Vue.prototype.$Ajax = Ajax

Vue.prototype.$setNarBar = function(title) {
	console.log('当前语言是：' + uni.getStorageSync('initlanguage'))
	if (uni.getStorageSync('initlanguage') == 'en') {
		uni.setNavigationBarTitle({
			title: title
		})
	}
}

import i18n from './common/js/index18.js';

App.mpType = 'app'

const app = new Vue({
	i18n,
	store,
	...App
})

app.$mount()