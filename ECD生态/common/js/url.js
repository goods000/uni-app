// 版本号

// 正式
const webSocketIP = 'ecdpro.me'
const IP = 'ecdpro.me'
var ISHTTPS = true;
var version = "v0.07";
 
// 测试
// const webSocketIP = '47.57.241.206:9017'
// const IP = '47.57.241.206:8046'
// var ISHTTPS = false;
// var version = "v0.01";

// 本地
// const webSocketIP = '192.168.2.16:8088';
// const IP = '192.168.2.16:8088';
// var ISHTTPS = false;
// var version = "v0.01";

const webUrl = (ISHTTPS ? 'https://' : 'http://') + IP;
const websocketUrl = (ISHTTPS ? 'wss://' : 'ws://') + webSocketIP;

export default {
	webUrl: webUrl,
	websocketUrl: websocketUrl,
	version: version,
}
