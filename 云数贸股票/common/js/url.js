
// 正式
const webSocketIP = 'ysgweb.xyz'
const IP = 'ysgweb.xyz'
var ISHTTPS = true;
var version = "v0.06";

// 测试
// const webSocketIP = '47.57.191.190:8802'
// const IP = '47.57.191.190:8802'
// var ISHTTPS = false;
// var version = "v0.01";

// 本地
// const webSocketIP = '192.168.0.16:8082'
// const IP = '192.168.0.16:8082'
// var ISHTTPS = false;
// var version = "v0.01";

const webUrl = (ISHTTPS ? 'https://' : 'http://') + IP;
const websocketUrl = (ISHTTPS ? 'wss://' : 'ws://') + webSocketIP;

export default {
	webUrl: webUrl,
	websocketUrl: websocketUrl,
	version: version,
}
