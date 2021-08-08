export default {
  pages: [
    'pages/index/index',
    'pages/personal/index',
    'pages/Chatboard/Chatboard'
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
