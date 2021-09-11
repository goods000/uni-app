// 测试
// const IP = '47.57.191.190:8124'
// const webSocketIP = '47.57.191.190:8912'
// var ISHTTPS = false;
// var version = "v0.01";

//正式
var version = "v1.05";
var IP = 'bgfstar.com';
var webSocketIP = 'bgfstar.com';
var ISHTTPS = true; 

const webUrl = (ISHTTPS ? 'https://' : 'http://') + IP;
const websocketUrl = (ISHTTPS ? 'wss://' : 'ws://') + webSocketIP;

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
