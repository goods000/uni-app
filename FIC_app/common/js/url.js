// 版本号

// 测试
// const IP = '192.168.0.41:18083'
// const IP = 'www.halt.vip/api'
// const IP1 = 'www.halt.vip'
// var ISHTTPS = false;
// var version = "1.0.0";

//正式
const IP = 'www.fic.world/api'
const IP1 = 'www.fic.world'
var ISHTTPS = true;
var version = "1.0.1";


const webUrl = (ISHTTPS ? 'https://' : 'http://') + IP;
const basePthURL = (ISHTTPS ? 'https://' : 'http://') + IP1;

export default {
	webUrl: webUrl,
	basePthURL: basePthURL,
	version: version
}
