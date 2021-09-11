// 版本号

// 正式
// const webSocketIP = 'xinghe.life'
// const IP = 'xinghe.life'
// var ISHTTPS = true;
// var version = "v0.11";
 
// 测试
const webSocketIP = '47.57.241.206:8802'
const IP = '47.57.241.206:8802'
var ISHTTPS = false;
var version = "v0.07";

// 本地
// const webSocketIP = '192.168.2.15:8081'
// const IP = '192.168.2.15:8081'
// var ISHTTPS = false;
// var version = "v0.07";

const webUrl = (ISHTTPS ? 'https://' : 'http://') + IP;
const websocketUrl = (ISHTTPS ? 'wss://' : 'ws://') + webSocketIP;

export default {
	webUrl: webUrl,
	websocketUrl: websocketUrl,
	version: version,
}
