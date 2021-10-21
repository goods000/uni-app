let location = {
  protocol: "https"
};
let config = {
  // socketServer: 'im-api-v2-31.easemob.com',    // socket Server地址
  // 测试
  xmppURL: 'wss://im-api-wechat.easemob.com/websocket', // xmpp Server地址
  restServer: '//a1.easemob.com',      
  apiURL: "https://a1.easemob.com", 
  appkey: "1118210727047216#demo", // 自己申请的App key(需修改的地方)
  // 正式
  // xmppURL: 'wss://im-api-wechat-31.easemob.com/websocket', // xmpp Server地址
  // restServer: '//a31.easemob.com',               
  // apiURL: "https://a31.easemob.com", 
  // appkey: "1118210727047216#community", // 自己申请的App key(需修改的地方)
  
  Host: "easemob.com", //配置成自己的服务器的主机号+端口号(需修改的地方)
  https: false, // 是否使用https
  
  isHttpDNS: true, // 3.0 SDK支持，防止DNS劫持从服务端获取XMPPUrl、restUrl 

  isMultiLoginSessions: false, // 是否开启多页面同步收消息，注意，需要先联系商务开通此功能

  isAutoLogin: true, // 自动出席，（如设置为false，则表示离线，无法收消息，需要在登录成功后手动调用conn.setPresence()才可以收消息）

  isWindowSDK: false,
 
  isSandBox: false,

  isDebug: false, // 打开调试，会自动打印log，在控制台的console中查看log

  autoReconnectNumMax: 15, // 断线重连最大次数

  autoReconnectInterval: 2, // 断线重连时间间隔

  isWebRTC: false,

  isAutoLogin: true,
  
  heartBeatWait: 4500, // 使用webrtc（视频聊天）时发送心跳包的时间间隔，单位ms
  
  delivery: true, // 是否发送已读回执
  
  useOwnUploadFun: true,
};
export default config;