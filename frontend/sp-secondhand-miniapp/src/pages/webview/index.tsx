import React, { useState,useEffect } from 'react';
import Taro from '@tarojs/taro';
import {WebView} from '@tarojs/components';

 const Index: React.FC<any> = ()=>{
    const [url, setUrl] = useState<string>('');
    const $instance = Taro.getCurrentInstance(); //页面对象

    useEffect(() => {
        console.log($instance.router?.params.url);
        setUrl($instance.router?.params.url === undefined?'':$instance.router?.params.url); 
    }, [])

    return <WebView src={url}>

    </WebView>
}
export default Index;