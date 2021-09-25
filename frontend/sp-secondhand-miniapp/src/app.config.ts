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
    'pages/detail/index'
    'pages/webview/index'
  ],
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
