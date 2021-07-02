import React,{useState} from 'react';
import {View} from '@tarojs/components'
import s from './CategoryList.css'
import { Category } from 'src/typings/common';
import CategoryIcon from './CategoryIcon/CategoryIcon';



//容器组件
const CategoryList: React.FC<any> = ()=>{

    //定义状态
   const [categoryList, setCategoryList] = useState<Category[]>([{ID:'1',Name:'潮鞋服饰',ImgUrl:'http://'},{ID:'1',Name:'潮鞋服饰',ImgUrl:'http://'},{ID:'1',Name:'潮鞋服饰',ImgUrl:'http://'},{ID:'1',Name:'潮鞋服饰',ImgUrl:'http://'},{ID:'1',Name:'潮鞋服饰',ImgUrl:'http://'},{ID:'1',Name:'潮鞋服饰',ImgUrl:'http://'}]);

    //声明周期


    //渲染函数
    const categoryItems = categoryList.map((category:Category)=>{
        return <CategoryIcon Category={category} />
    })
    

    return<View className={s.container} >
       {categoryItems}
    </View>
}
export default CategoryList;