import Vue from 'vue'
import App from './App'
import tools from './common/js/tools.js'
import Ajax from './common/js/ajax.js'
import './components/ican-H5Api/ican-H5Api.js'
import * as filters from './common/js/filters.js'

Object.keys(filters).forEach(key=>{
    Vue.filter(key,filters[key])//插入过滤器名和对应方法
})

Vue.config.productionTip = false

Vue.prototype.$tools=tools
Vue.prototype.$Ajax=Ajax

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
