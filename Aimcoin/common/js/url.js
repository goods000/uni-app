// 版本号

// 测试
// const IP = '192.168.0.50:8090'
// const webSocketIP = '192.168.0.50:8091'
// const IP = '47.57.241.206:8014'
// const webSocketIP = '47.57.241.206:9007'
// var ISHTTPS = false;
// var version = "v0.01";


//正式
var version = "v0.02";
var IP = 'aimcoin.online';
var webSocketIP = 'aimcoin.online';
var ISHTTPS = true;

const webUrl = (ISHTTPS ? 'https://' : 'http://') + IP;
const websocketUrl = (ISHTTPS ? 'wss://' : 'ws://') + webSocketIP;

export default {
	webUrl: webUrl,
	websocketUrl: websocketUrl,
	version: version
}
