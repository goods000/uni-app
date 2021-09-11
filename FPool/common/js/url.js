// 版本号

// 正式
const webSocketIP = 'fpool.site'
const IP = 'fpool.site'
var ISHTTPS = true;
var version = "v0.04";

// 测试
// const webSocketIP = '47.57.241.154:8802'
// const IP = '47.57.241.154:8802'
// var ISHTTPS = false; 
// var version = "v0.13";

// 本地
// const webSocketIP = '192.168.0.66:8808'
// const IP = '192.168.0.66:8808'
// var ISHTTPS = false;
// var version = "v0.13";

const webUrl = (ISHTTPS ? 'https://' : 'http://') + IP;
const websocketUrl = (ISHTTPS ? 'wss://' : 'ws://') + webSocketIP;

export default {
	webUrl: webUrl,
	websocketUrl: websocketUrl,
	version: version,
}
