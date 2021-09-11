
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/firstPage/firstPage","pages/index/index","pages/mine/mine","pages/notice/notice","pages/notice/notice_detail","pages/information/information","pages/information/information_detail","pages/information/information_edit","pages/operate/selectType","pages/operate/login","pages/operate/register","pages/operate/register_next","pages/operate/forget","pages/operate/forget_next","pages/about/about","pages/assets/assets","pages/assets/assets_info","pages/assets/assets_withdraw","pages/assets/assets_withdraw_record","pages/assets/assets_withdraw_detail","pages/assets/assets_recharge","pages/assets/assets_recharge_record","pages/assets/assets_recharge_detail","pages/assets/assets_exchange","pages/assets/assets_exchange_record","pages/assets/assets_transfer","pages/assets/assets_transfer_record","pages/assets/assets_transfer_detail","pages/service/service","pages/safety/safety","pages/safety/safety_user","pages/safety/safety_authentication","pages/safety/safety_authentication_next","pages/safety/safety_changeLoginPwd","pages/safety/safety_changeTradePwd","pages/share/share","pages/team/team","pages/help/help","pages/help/help_detail","pages/documentary/documentary","pages/documentary/documentary_bind","pages/documentary/documentary_choose","pages/documentary/documentary_apply","pages/documentary/documentary_follow","pages/chain/chain","pages/agent/agent","pages/agent/agent_apply","pages/userInfo/userInfo","pages/apiInfo/apiInfo","pages/apiInfo/apiInfo_update","pages/apiInfo/apiInfo_followReward","pages/invite/invite","pages/workOrder/workOrder","pages/workOrder/workOrder_type","pages/workOrder/workOrder_apply","pages/workOrder/workOrder_detail"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"OneToken","navigationBarBackgroundColor":"#FFFFFF","backgroundColor":"#FFFFFF","bounce":"none","enablePullDownRefresh":false,"titleNView":false,"background":"#ffffff"},"tabBar":{"color":"#c2c6cc","selectedColor":"#cb0101","borderStyle":"white","backgroundColor":"#ffffff","list":[{"pagePath":"pages/index/index","iconPath":"static/tarbar/icon-tarbar-1.png","selectedIconPath":"static/tarbar/icon-tarbar-1-active.png","text":"首页"},{"pagePath":"pages/documentary/documentary","iconPath":"static/tarbar/icon-tarbar-2.png","selectedIconPath":"static/tarbar/icon-tarbar-2-active.png","text":"跟单"},{"pagePath":"pages/information/information","iconPath":"static/tarbar/icon-tarbar-3.png","selectedIconPath":"static/tarbar/icon-tarbar-3-active.png","text":"资讯"},{"pagePath":"pages/chain/chain","iconPath":"static/tarbar/icon-tarbar-4.png","selectedIconPath":"static/tarbar/icon-tarbar-4-active.png","text":"链上"},{"pagePath":"pages/mine/mine","iconPath":"static/tarbar/icon-tarbar-5.png","selectedIconPath":"static/tarbar/icon-tarbar-5-active.png","text":"我的"}]},"nvueCompiler":"weex","nvueStyleCompiler":"weex","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":false,"autoclose":true},"appname":"OneToken","compilerVersion":"3.1.4","entryPagePath":"pages/firstPage/firstPage","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/firstPage/firstPage","meta":{"isQuit":true},"window":{"navigationBarTitleText":"登录状态检测","bounce":"none","titleNView":false}},{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"首页","bounce":"none","titleNView":false}},{"path":"/pages/mine/mine","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","bounce":"none","titleNView":false}},{"path":"/pages/notice/notice","meta":{},"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"资讯","bounce":"none","titleNView":false}},{"path":"/pages/notice/notice_detail","meta":{},"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"资讯详情","bounce":"none","titleNView":false}},{"path":"/pages/information/information","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"快讯","bounce":"none","titleNView":false}},{"path":"/pages/information/information_detail","meta":{},"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"快讯详情","bounce":"none","titleNView":false}},{"path":"/pages/information/information_edit","meta":{},"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"动态发布","bounce":"none","titleNView":false}},{"path":"/pages/operate/selectType","meta":{},"window":{"navigationBarTitleText":"登录选择","bounce":"none","titleNView":false}},{"path":"/pages/operate/login","meta":{},"window":{"navigationBarTitleText":"登录","bounce":"none","titleNView":false}},{"path":"/pages/operate/register","meta":{},"window":{"navigationBarTitleText":"注册","bounce":"none","titleNView":false}},{"path":"/pages/operate/register_next","meta":{},"window":{"navigationBarTitleText":"注册 - 下一步","bounce":"none","titleNView":false}},{"path":"/pages/operate/forget","meta":{},"window":{"navigationBarTitleText":"忘记密码","bounce":"none","titleNView":false}},{"path":"/pages/operate/forget_next","meta":{},"window":{"navigationBarTitleText":"忘记密码 - 下一步","bounce":"none","titleNView":false}},{"path":"/pages/about/about","meta":{},"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"关于","bounce":"none","titleNView":false}},{"path":"/pages/assets/assets","meta":{},"window":{"navigationBarTitleText":"我的资产","bounce":"none","titleNView":false}},{"path":"/pages/assets/assets_info","meta":{},"window":{"navigationBarTitleText":"财务记录","bounce":"none","titleNView":false}},{"path":"/pages/assets/assets_withdraw","meta":{},"window":{"navigationBarTitleText":"我的资产 - 提币","bounce":"none","titleNView":false}},{"path":"/pages/assets/assets_withdraw_record","meta":{},"window":{"navigationBarTitleText":"我的资产 - 提币记录","bounce":"none","titleNView":false}},{"path":"/pages/assets/assets_withdraw_detail","meta":{},"window":{"navigationBarTitleText":"我的资产 - 提币详情","bounce":"none","titleNView":false}},{"path":"/pages/assets/assets_recharge","meta":{},"window":{"navigationBarTitleText":"我的资产 - 充币","bounce":"none","titleNView":false}},{"path":"/pages/assets/assets_recharge_record","meta":{},"window":{"navigationBarTitleText":"我的资产 - 充币记录","bounce":"none","titleNView":false}},{"path":"/pages/assets/assets_recharge_detail","meta":{},"window":{"navigationBarTitleText":"我的资产 - 充币详情","bounce":"none","titleNView":false}},{"path":"/pages/assets/assets_exchange","meta":{},"window":{"navigationBarTitleText":"我的资产 - 划转","bounce":"none","titleNView":false}},{"path":"/pages/assets/assets_exchange_record","meta":{},"window":{"navigationBarTitleText":"我的资产 - 划转记录","bounce":"none","titleNView":false}},{"path":"/pages/assets/assets_transfer","meta":{},"window":{"navigationBarTitleText":"转账","bounce":"none","titleNView":false}},{"path":"/pages/assets/assets_transfer_record","meta":{},"window":{"navigationBarTitleText":"转账 - 记录","bounce":"none","titleNView":false}},{"path":"/pages/assets/assets_transfer_detail","meta":{},"window":{"navigationBarTitleText":"转账 - 记录详情","bounce":"none","titleNView":false}},{"path":"/pages/service/service","meta":{},"window":{"navigationBarTitleText":"客服","bounce":"none","titleNView":false}},{"path":"/pages/safety/safety","meta":{},"window":{"navigationBarTitleText":"安全中心","bounce":"none","titleNView":false}},{"path":"/pages/safety/safety_user","meta":{},"window":{"navigationBarTitleText":"个人信息","bounce":"none","titleNView":false}},{"path":"/pages/safety/safety_authentication","meta":{},"window":{"navigationBarTitleText":"实名认证","bounce":"none","titleNView":false}},{"path":"/pages/safety/safety_authentication_next","meta":{},"window":{"navigationBarTitleText":"实名认证 - 下一步","bounce":"none","titleNView":false}},{"path":"/pages/safety/safety_changeLoginPwd","meta":{},"window":{"navigationBarTitleText":"修改登录密码","bounce":"none","titleNView":false}},{"path":"/pages/safety/safety_changeTradePwd","meta":{},"window":{"navigationBarTitleText":"修改交易密码","bounce":"none","titleNView":false}},{"path":"/pages/share/share","meta":{},"window":{"navigationBarTitleText":"分享APP","bounce":"none","titleNView":false}},{"path":"/pages/team/team","meta":{},"window":{"navigationBarTitleText":"我的团队","bounce":"none","titleNView":false}},{"path":"/pages/help/help","meta":{},"window":{"navigationBarTitleText":"帮助中心","enablePullDownRefresh":false,"bounce":"none","titleNView":false}},{"path":"/pages/help/help_detail","meta":{},"window":{"navigationBarTitleText":"帮助中心 - 详情","enablePullDownRefresh":false,"bounce":"none","titleNView":false}},{"path":"/pages/documentary/documentary","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"跟单","enablePullDownRefresh":false,"bounce":"none","titleNView":false}},{"path":"/pages/documentary/documentary_bind","meta":{},"window":{"navigationBarTitleText":"跟单 - 绑定","enablePullDownRefresh":false,"bounce":"none","titleNView":false}},{"path":"/pages/documentary/documentary_choose","meta":{},"window":{"navigationBarTitleText":"跟单 - 选择交易所","enablePullDownRefresh":false,"bounce":"none","titleNView":false}},{"path":"/pages/documentary/documentary_apply","meta":{},"window":{"navigationBarTitleText":"跟单 - 绑定提交","enablePullDownRefresh":false,"bounce":"none","titleNView":false}},{"path":"/pages/documentary/documentary_follow","meta":{},"window":{"navigationBarTitleText":"跟单 - 跟随","enablePullDownRefresh":false,"bounce":"none","titleNView":false}},{"path":"/pages/chain/chain","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"链上","enablePullDownRefresh":false,"bounce":"none","titleNView":false}},{"path":"/pages/agent/agent","meta":{},"window":{"navigationBarTitleText":"经纪人","bounce":"none","titleNView":false}},{"path":"/pages/agent/agent_apply","meta":{},"window":{"navigationBarTitleText":"申请经纪人","bounce":"none","titleNView":false}},{"path":"/pages/userInfo/userInfo","meta":{},"window":{"navigationBarTitleText":"用户信息主页","bounce":"none","titleNView":false}},{"path":"/pages/apiInfo/apiInfo","meta":{},"window":{"navigationBarTitleText":"Api信息","bounce":"none","titleNView":false}},{"path":"/pages/apiInfo/apiInfo_update","meta":{},"window":{"navigationBarTitleText":"Api信息 - 更新","bounce":"none","titleNView":false}},{"path":"/pages/apiInfo/apiInfo_followReward","meta":{},"window":{"navigationBarTitleText":"Api信息 - 更新","bounce":"none","titleNView":false}},{"path":"/pages/invite/invite","meta":{},"window":{"navigationBarTitleText":"邀请好友","bounce":"none","titleNView":false}},{"path":"/pages/workOrder/workOrder","meta":{},"window":{"navigationBarTitleText":"工单","bounce":"none","titleNView":false}},{"path":"/pages/workOrder/workOrder_type","meta":{},"window":{"navigationBarTitleText":"工单 - 选择类型","bounce":"none","titleNView":false}},{"path":"/pages/workOrder/workOrder_apply","meta":{},"window":{"navigationBarTitleText":"工单 - 提交","bounce":"none","titleNView":false}},{"path":"/pages/workOrder/workOrder_detail","meta":{},"window":{"navigationBarTitleText":"工单 - 详情","bounce":"none","titleNView":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
