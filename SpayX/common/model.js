import Vue from 'vue'
import activeModel from "../components/activeModal.vue"
let activeModelVm;
function showActiveModel(props = {}){
	const remove = function(){
		document.body.removeChild(activeModelVm.$el)
		activeModelVm.$destroy()
	}
	return new Promise((resolve,reject)=>{
		if(activeModelVm) {
			remove()
		}
		props.success = function(res = {}){
			res.remove = remove
			resolve(res)
		}
		props.error = function(err = {}){
			err.remove = remove
			reject(err)
		}
		activeModelVm = new Vue({
			render(createElement){
				return createElement(activeModel,{props})
			}
		}).$mount()
		console.log(1111,uni.createSelectorQuery().select('body'))
		document.body.appendChild(activeModelVm.$el)
	})
}
module.exports = {
	showActiveModel
}