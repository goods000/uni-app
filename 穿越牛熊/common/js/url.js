// 版本号


// 本地
// const IP = '192.168.0.157:8081'
// const webSocketIP = '192.168.0.157:8081'
// 测试
// const IP = '47.57.241.206:8016'
// const webSocketIP = '47.57.241.206:9008'
// var ISHTTPS = false;
// var version = "v0.04";


// //正式
var version = "v7.01";
var IP = 'cynx.online';
var webSocketIP = 'cynx.online';
var ISHTTPS = true;

const webUrl = (ISHTTPS ? 'https://' : 'http://') + IP;
const websocketUrl = (ISHTTPS ? 'wss://' : 'ws://') + webSocketIP;

export default {
	webUrl: webUrl,
	websocketUrl: websocketUrl,
	version: version
}
