import React, { Component } from 'react'
import { Provider } from 'react-redux'

import configStore from './store'

import { getCategoryList, getCityList } from './actions/home'

import './app.css'

const store = configStore()

export interface AppData {
  appId: string;
  projectId: string|number;
  cityId:number;
  countryId:number;
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
    countryId: 2,
    userId: 0,
    imgUrl: 'http://120.79.59.51:8087/',
    BASE_URL: 'http://test.smallpotatoestech.com:8087/api/'
    }
  }

  componentDidMount () {}

  componentDidShow () {
    store.dispatch(getCategoryList(this.AppData.BASE_URL))
    store.dispatch(getCityList(this.AppData.BASE_URL, this.AppData.countryId))
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
