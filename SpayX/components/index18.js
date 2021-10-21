import VueI18n from './vue-i18n.js'; //需先安装vue-i18n
import Vue from 'vue';

Vue.use(VueI18n);
import messagesEn from './en';

import messagesCn from './cn';

const messages = {
	en: {
		message: messagesEn
	},
	cn: {
		message: messagesCn
	}
}

if (uni.getStorageSync('initLanguage') == null || uni.getStorageSync('initLanguage') == undefined || uni.getStorageSync(
		'initLanguage') == '') {
	uni.setStorage({
		key: 'initLanguage',
		data: 'en',
	})
}

console.log(uni.getStorageSync('initLanguage'));

var langular = uni.getStorageSync('initLanguage') == 'en' ? 'en' : 'cn';
console.log(langular);
// var langular =  'en';

var i18n = new VueI18n({
	locale: langular, // 语言标识
	messages
});

Vue.prototype._i18n = i18n;
export default i18n
