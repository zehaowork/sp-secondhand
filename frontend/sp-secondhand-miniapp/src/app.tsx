import "taro-ui/dist/style/components/icon.scss";
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configStore from './store'


import './app.css'

const store = configStore()

export interface AppData {
  appId: string;
  projectId: string|number;
  cityId:number;
  userId:number | string;
  imgUrl:string
  BASE_URL:string

} 
class App extends Component {
  AppData: AppData;


  constructor(){
    super();
    this.AppData = {
    appId: 'wx10d7986d55886da6',
    projectId:1,
    cityId:0,
    userId: 0,
    imgUrl: 'http://120.79.59.51:8087/',
    BASE_URL: 'https://www.smallpotatoestech.com/'
    }
  }

  componentDidMount () {}

  componentDidShow () {
   
  }

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App;
