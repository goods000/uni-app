
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/firstPage/firstPage","pages/login/first","pages/index/index","pages/index/news","pages/index/newsDetail","pages/index/notice","pages/index/noticeDetail","pages/service/service","pages/my/service","pages/my/my","pages/my/certification","pages/my/safety","pages/my/language","pages/my/Mnemonic","pages/my/myTeam","pages/my/teamShare","pages/my/nickName","pages/assets/assets","pages/assets/myAssets","pages/assets/recharge","pages/assets/withdraw","pages/assets/transfer","pages/assets/rechargeRecord","pages/assets/withdrawRecord","pages/assets/transferRecord","pages/assets/recordDetail","pages/login/login","pages/login/register","pages/login/backupWallet","pages/login/backupMnemonic","pages/login/mnemonic","pages/login/changePwd","pages/login/changeTradepwd","pages/group/group","pages/group/groupRecord","pages/group/groupLimited","pages/group/groupSuccess"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"","navigationBarBackgroundColor":"#fff","backgroundColor":"#F8F8F8","scrollIndicator":"none"},"tabBar":{"color":"#FFFFFF","selectedColor":"#FFCF1E","backgroundColor":"#040D32","borderStyle":"#2B3A5B","list":[{"pagePath":"pages/index/index","iconPath":"static/tarbar/icon-tarbar-1.png","selectedIconPath":"static/tarbar/icon-tarbar-1-active.png","text":"首页"},{"pagePath":"pages/group/group","iconPath":"static/tarbar/icon-tarbar-2.png","selectedIconPath":"static/tarbar/icon-tarbar-2-active.png","text":"众筹"},{"pagePath":"pages/assets/assets","iconPath":"static/tarbar/icon-tarbar-3.png","selectedIconPath":"static/tarbar/icon-tarbar-3-active.png","text":"资产"},{"pagePath":"pages/my/my","iconPath":"static/tarbar/icon-tarbar-4.png","selectedIconPath":"static/tarbar/icon-tarbar-4-active.png","text":"我的"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"weex","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":false,"autoclose":true},"appname":"SpayX","compilerVersion":"3.2.2","entryPagePath":"pages/firstPage/firstPage","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/firstPage/firstPage","meta":{"isQuit":true},"window":{"navigationBarTitleText":"登录注册检测","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#FFFFFF","titleNView":false,"bounce":"none"}},{"path":"/pages/login/first","meta":{},"window":{"navigationBarTitleText":"选择登录注册页面","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#FFFFFF","titleNView":false,"bounce":"none"}},{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"首页","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#fff","bounce":"none","titleNView":false,"scrollIndicator":"none"}},{"path":"/pages/index/news","meta":{},"window":{"navigationBarTitleText":"资讯","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#FFFFFF","titleNView":false,"bounce":"none"}},{"path":"/pages/index/newsDetail","meta":{},"window":{"navigationBarTitleText":"资讯详情","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#FFFFFF","titleNView":false,"bounce":"none"}},{"path":"/pages/index/notice","meta":{},"window":{"navigationBarTitleText":"公告","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#FFFFFF","titleNView":false,"bounce":"none"}},{"path":"/pages/index/noticeDetail","meta":{},"window":{"navigationBarTitleText":"公告详情","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#FFFFFF","titleNView":false,"bounce":"none"}},{"path":"/pages/service/service","meta":{},"window":{"navigationBarTitleText":"客服","bounce":"none","titleNView":false}},{"path":"/pages/my/service","meta":{},"window":{"navigationBarTitleText":"客服","bounce":"none","titleNView":false}},{"path":"/pages/my/my","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#FFFFFF","titleNView":false,"bounce":"none"}},{"path":"/pages/my/certification","meta":{},"window":{"navigationBarTitleText":"实名认证","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#FFFFFF","titleNView":false,"bounce":"none"}},{"path":"/pages/my/safety","meta":{},"window":{"navigationBarTitleText":"安全中心","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#FFFFFF","titleNView":false,"bounce":"none"}},{"path":"/pages/my/language","meta":{},"window":{"navigationBarTitleText":"系统语言","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#FFFFFF","titleNView":false,"bounce":"none"}},{"path":"/pages/my/Mnemonic","meta":{},"window":{"navigationBarTitleText":"备份助记词","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#FFFFFF","titleNView":false,"bounce":"none"}},{"path":"/pages/my/myTeam","meta":{},"window":{"navigationBarTitleText":"我的团队","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#FFFFFF","titleNView":false,"bounce":"none"}},{"path":"/pages/my/teamShare","meta":{},"window":{"navigationBarTitleText":"邀请好友","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#FFFFFF","titleNView":false,"bounce":"none"}},{"path":"/pages/my/nickName","meta":{},"window":{"navigationBarTitleText":"修改昵称","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#FFFFFF","titleNView":false,"bounce":"none"}},{"path":"/pages/assets/assets","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"资产","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#FFFFFF","titleNView":false,"bounce":"none"}},{"path":"/pages/assets/myAssets","meta":{},"window":{"navigationBarTitleText":"我的资产","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#FFFFFF","titleNView":false,"bounce":"none"}},{"path":"/pages/assets/recharge","meta":{},"window":{"navigationBarTitleText":"充值","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#FFFFFF","titleNView":false,"bounce":"none"}},{"path":"/pages/assets/withdraw","meta":{},"window":{"navigationBarTitleText":"提币","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#FFFFFF","titleNView":false,"bounce":"none"}},{"path":"/pages/assets/transfer","meta":{},"window":{"navigationBarTitleText":"转账","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#FFFFFF","titleNView":false,"bounce":"none"}},{"path":"/pages/assets/rechargeRecord","meta":{},"window":{"navigationBarTitleText":"充值记录","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#FFFFFF","titleNView":false,"bounce":"none"}},{"path":"/pages/assets/withdrawRecord","meta":{},"window":{"navigationBarTitleText":"提币记录","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#FFFFFF","titleNView":false,"bounce":"none"}},{"path":"/pages/assets/transferRecord","meta":{},"window":{"navigationBarTitleText":"转账记录","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#FFFFFF","titleNView":false,"bounce":"none"}},{"path":"/pages/assets/recordDetail","meta":{},"window":{"navigationBarTitleText":"记录详情","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#FFFFFF","titleNView":false,"bounce":"none"}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"登录","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#FFFFFF","titleNView":false,"bounce":"none"}},{"path":"/pages/login/register","meta":{},"window":{"navigationBarTitleText":"注册","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#FFFFFF","titleNView":false,"bounce":"none"}},{"path":"/pages/login/backupWallet","meta":{},"window":{"navigationBarTitleText":"备份钱包","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#FFFFFF","titleNView":false,"bounce":"none"}},{"path":"/pages/login/backupMnemonic","meta":{},"window":{"navigationBarTitleText":"备份助记词","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#FFFFFF","titleNView":false,"bounce":"none"}},{"path":"/pages/login/mnemonic","meta":{},"window":{"navigationBarTitleText":"验证助记词","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#FFFFFF","titleNView":false,"bounce":"none"}},{"path":"/pages/login/changePwd","meta":{},"window":{"navigationBarTitleText":"修改登录密码","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#FFFFFF","titleNView":false,"bounce":"none"}},{"path":"/pages/login/changeTradepwd","meta":{},"window":{"navigationBarTitleText":"修改交易密码","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#FFFFFF","titleNView":false,"bounce":"none"}},{"path":"/pages/group/group","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"拼团","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#FFFFFF","titleNView":false,"bounce":"none"}},{"path":"/pages/group/groupRecord","meta":{},"window":{"navigationBarTitleText":"拼团记录","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#FFFFFF","titleNView":false,"bounce":"none"}},{"path":"/pages/group/groupLimited","meta":{},"window":{"navigationBarTitleText":"限时拼团","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#FFFFFF","titleNView":false,"bounce":"none"}},{"path":"/pages/group/groupSuccess","meta":{},"window":{"navigationBarTitleText":"拼团成功","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#FFFFFF","titleNView":false,"bounce":"none"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});