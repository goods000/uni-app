// 版本号

// 正式
// const webSocketIP = 'ocex.xyz';
// const IP = 'ocex.xyz';
// var ISHTTPS = true;
// // var version = "0.0.9";
// var version = "2.0.2";

// 测试
const webSocketIP = '47.57.241.206:8958';
const IP = '47.57.241.206:8028';
var ISHTTPS = false;
var version = "0.0.1";

// 本地
// const IP = '192.168.2.13:8089';
// const webSocketIP = '192.168.2.13:8089';
// var ISHTTPS = false;
// var version = "0.0.1";

const webUrl = (ISHTTPS ? 'https://' : 'http://') + IP;
const websocketUrl = (ISHTTPS ? 'wss://' : 'ws://') + webSocketIP;
const basePthURL = (ISHTTPS ? 'https://' : 'http://') + IP;


export default {
	webUrl: webUrl,
	websocketUrl: websocketUrl,
	basePthURL: basePthURL,
	version: version
}
