
//正式
// var version = "v0.03";
// const IP='spayx.info'
// var ISHTTPS = true;
// 测试
const IP = '47.75.120.242:8056';
var version = "v0.01";
var ISHTTPS= false;
// 本地
// const IP='192.168.2.12:8083'
// var version = "v0.01";
// var ISHTTPS= false;


const webUrl = (ISHTTPS ? 'https://' : 'http://') + IP;
const websocketUrl = (ISHTTPS ? 'wss://' : 'ws://') + IP;
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
