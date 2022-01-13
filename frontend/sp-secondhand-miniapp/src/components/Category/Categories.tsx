import React,{useState} from 'react';
import {ScrollView, View, Image} from '@tarojs/components'
import s from './Categories.css'
import { Category } from 'src/typings/common';



interface Props {
    //事件
    onClick:any;

    //参数
    categoryList:Array<Category>;
    current:number;
}

//容器组件
const Categories: React.FC<Props> = (props)=>{
    //组件状态
    const [scrollLeft, setScrollLeft] = useState<number>(5);//横向滚动条位置,以左为开始
    const [oldOffSetLeft, setOldOffSetLeft] = useState(5); //记录上一次滑动的位置
    
    //组件行为
    const onClick = (e)=>{
        props.onClick(e);
        if(e.currentTarget.id === '1'){
            setScrollLeft(5);
        }
        else{
            //判断是是否左滑
            if(e.currentTarget.offsetLeft >oldOffSetLeft){
                setScrollLeft(e.currentTarget.offsetLeft-140);
            }
            else{
                setScrollLeft(e.currentTarget.offsetLeft-140);
            }
            setOldOffSetLeft(e.currentTarget.offsetLeft);
        }
    }


    //渲染函数
    const categoryList = props.categoryList.slice(1).map( category => {
        return <View key={category.id} className={s.item} >
                <View id={category.id.toString()} onClick={onClick} className={` ${s.category} ${(category.id === props.current) && s.active} ` } >
                    <Image className={s.icon} src={"http://120.79.59.51:8087"+category.logoUrl} />
                    {category.name}
                </View>
            </View>
    })

    return<View className={s.container} >
        {props.categoryList.length>0 && <View className={s.all} >
                <View id={(props.categoryList[0].id-1).toString()} onClick={onClick}  className={` ${s.category} ${(props.categoryList[0].id-1 === props.current) && s.active} ` } >
                    <Image className={s.icon} src={"http://120.79.59.51:8087"+props.categoryList[0].logoUrl} />
                    {props.categoryList[0].name}
                </View>
            </View>}
       <ScrollView scrollLeft={scrollLeft} scrollWithAnimation className={s.scroll} scrollX >
           {categoryList}
       </ScrollView>
    </View>
}
export default Categories;