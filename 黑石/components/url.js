// 版本号

// 测试
// const IP = 'qyy891878034.qicp.io:80'
// const IP = '192.168.0.60:8081'
// const webSocketIP = '192.168.0.60:8089'
// var ISHTTPS = false;
// var version = "v0.01";
// const IP = '47.57.191.190:8150'
// const webSocketIP = '47.57.191.190:8917'


//正式
var version = "v1.02";
var IP = 'blackstone.cash';
var webSocketIP = 'blackstone.cash';
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
