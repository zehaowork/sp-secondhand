import React from 'react';
import {ScrollView, View, Image} from '@tarojs/components'
import s from './Categories.css'




interface Props {
    categoryList:Array<Category>;
}

interface Category {
    id:number;
    name:string;
    logoUrl:string;
    order:1;
}

//容器组件
const Categories: React.FC<Props> = (props)=>{

 
    
    //渲染函数
    const categoryList = props.categoryList.slice(1).map( category => {
        return <View className={s.item} >
                <View className={s.category} >
                    <Image className={s.icon} src={"http://120.79.59.51:8087"+category.logoUrl} />
                    {category.name}
                </View>
            </View>
    })

    return<View className={s.container} >
        {props.categoryList.length>0 && <View className={s.all} >
                <View className={` ${s.category} ${s.active} ` } >
                    <Image className={s.icon} src={"http://120.79.59.51:8087"+props.categoryList[0].logoUrl} />
                    {props.categoryList[0].name}
                </View>
            </View>}
       <ScrollView scrollWithAnimation className={s.scroll} scrollX >
           {categoryList}
       </ScrollView>
    </View>
}
export default Categories;