import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/divider.scss";
import "taro-ui/dist/style/components/fab.scss";
import 'taro-ui/dist/style/index.scss'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configStore from './store'

import "./app.css";
import { User } from "./typings/common";
import { SAVE_USER_INFO } from "./actions/user";

const store = configStore();

export interface AppData {
  appId: string;
  projectId: string | number;
  cityId: number;
  userId: number | string;
  imgUrl: string;
  BASE_URL: string;
  user: User | undefined;
}
class App extends Component {
  AppData: AppData;
  store: any;

  constructor(props) {
    super(props);
    this.AppData = {
      appId: "wx10d7986d55886da6",
      projectId: 1,
      cityId: 0,
      userId: 0,
      imgUrl: "http://120.79.59.51:8087/",
      BASE_URL: "https://www.smallpotatoestech.com/",
      user: undefined,
    };
  }

  componentDidMount() {

  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}

export default App;
