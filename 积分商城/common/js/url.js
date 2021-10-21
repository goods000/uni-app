// 版本号

// 正式
// const webSocketIP = 'mixushop.online'
// const IP = 'mixushop.online'
// var ISHTTPS = true;
// var version = "v0.07";
const webSocketIP = 'szmixu.com'
const IP = 'szmixu.com'
var ISHTTPS = true;
var version = "v1.02";

// 测试
// const webSocketIP = '47.57.241.206:8803'
// const IP = '47.57.241.206:8803'
// var ISHTTPS = false;
// var version = "v0.01";

// 本地 
// const webSocketIP = '192.168.2.15:8082';
// const IP = '192.168.2.15:8082';
// var ISHTTPS = false;
// var version = "v0.01";

const webUrl = (ISHTTPS ? 'https://' : 'http://') + IP;
const websocketUrl = (ISHTTPS ? 'wss://' : 'ws://') + webSocketIP;

export default {
	webUrl: webUrl,
	websocketUrl: websocketUrl,
	version: version,
}
