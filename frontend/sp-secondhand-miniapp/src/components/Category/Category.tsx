import React from 'react';
import {ScrollView, View} from '@tarojs/components'
import s from './Category.css'





//容器组件
const Category: React.FC<any> = ()=>{

   const dummyList = ['推荐','家具生活','电子电器','服装潮鞋','休闲娱乐','美容护肤','配饰包包','美食厨具','图书乐器','其他'];
    
    //渲染函数
    const categoryList = dummyList.map( category => <View className={s.item} >{category}</View>)

    return<View className={s.container} >
       <ScrollView scrollWithAnimation className={s.scroll} scrollX >
           {categoryList}
       </ScrollView>
    </View>
}
export default Category;