import Vue from 'vue'
import App from './App'
import tools from './components/tools.js'
import Ajax from './components/ajax.js'
import * as filters from './components/filters.js'

Object.keys(filters).forEach(key=>{
    Vue.filter(key,filters[key])//插入过滤器名和对应方法
})

Vue.config.productionTip = false

Vue.prototype.$tools=tools
Vue.prototype.$Ajax=Ajax

// Vue.prototype.$setNarBar = function(title){
// 	console.log('当前语言是：' + uni.getStorageSync('initlanguage'))
// 	if(uni.getStorageSync('initlanguage') == 'en'){
// 		uni.setNavigationBarTitle({
// 			title: title
// 		})
// 	}
// }

// import i18n from './components/index18.js';

App.mpType = 'app'

const app = new Vue({
	 // i18n,
    ...App
})

app.$mount()
