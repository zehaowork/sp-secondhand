export default {
  pages: [
    'pages/index/index',
    'pages/personal/index',
    'pages/chatboard/index',
    'pages/favorites/index',
    'pages/search/index',
    'pages/search/result/result',
    'pages/city/index',
    'pages/shop/index',
    'pages/detail/index',
    'pages/webview/index'
  ],
  permission: {
    "scope.userLocation": {
      desc: "你的位置信息将用于小程序城市自动定位" // 高速公路行驶持续后台定位
    }
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '聊天板',
    navigationBarTextStyle: 'black'
  },

  tabBar: {
    
    list: [
    {
      pagePath: "pages/index/index",
      text: "首页" },
    {
      pagePath: "pages/personal/index",
      text: "个人" }]
    
    } 
  
}
