// 版本号

// 正式
// const webSocketIP = 'rycc.in'
// const IP = 'rycc.in'
// var ISHTTPS = true;
// var version = "v0.04";
 
// 测试
const webSocketIP = '47.57.191.190:8945'
const IP = '47.57.191.190:8220'
var ISHTTPS = false;
var version = "v0.13";

// 本地
// const webSocketIP = '192.168.0.157:8689'
// const IP = '192.168.0.157:8689'
// var ISHTTPS = false;
// var version = "v0.13";

const webUrl = (ISHTTPS ? 'https://' : 'http://') + IP;
const websocketUrl = (ISHTTPS ? 'wss://' : 'ws://') + webSocketIP;

export default {
	webUrl: webUrl,
	websocketUrl: websocketUrl,
	version: version,
}
