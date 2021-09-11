// 版本号

// 测试
/* HBuilder账号 */
// 137134569@qq.com
// wangshuhao64*

// 测试
const IP = '47.57.191.190:8116'
const websocketIP = '47.57.191.190:8908';
var version = "v2.09";
var ISHTTPS = false;


//正式
// var version = "v2.09";
// var IP = 'ichex.vip';
// var websocketIP = 'ichex.vip';
// var ISHTTPS = true; 

const webUrl = (ISHTTPS ? 'https://' : 'http://') + IP;
const websocketUrl = (ISHTTPS ? 'wss://' : 'ws://') + websocketIP;
// const websocketUrl = (ISHTTPS ? 'wss://47.57.10.154:8903' : 'ws://47.57.10.154:8903');
//const websocketUrl = (ISHTTPS ? 'wss://47.57.10.154:8903' : 'ws://47.57.10.154:8903');
// const websocketUrl = (ISHTTPS ? 'wss://192.168.0.147:8089' : 'ws://192.168.0.147:8089');
const slideURL = webUrl + "/search/downloadSlide?id=";
const currnecyURL = webUrl + "/search/currencyById?id=";
const currnecyNameURL = webUrl + "/search/currencyByName?name=";
const basePthURL = webUrl + "/search/download?path=";
export default {
	webUrl: webUrl,
	websocketUrl: websocketUrl,
	slideURL: slideURL,
	currnecyURL: currnecyURL,
	currnecyNameURL: currnecyNameURL,
	basePthURL: basePthURL,
	version: version
}
