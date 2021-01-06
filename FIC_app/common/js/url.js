// 版本号

// 测试
const IP = '192.168.0.41:18083'
// const IP = '404.show/api'
const IP1 = '404.show'
var ISHTTPS = false;
var version = "1.0.0";


const webUrl = (ISHTTPS ? 'https://' : 'http://') + IP;
const basePthURL = (ISHTTPS ? 'https://' : 'http://') + IP1;

export default {
	webUrl: webUrl,
	basePthURL: basePthURL,
	version: version
}
