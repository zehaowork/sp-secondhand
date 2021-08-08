import React from 'react';
import {View} from '@tarojs/components'
import s from './CategoryTag.css'

interface Props{
    CategoryName: string;
}

const CategoryTag: React.FC<Props> = (props)=> {
    return <View  className={s.container} >{props.CategoryName}</View>
}
export default CategoryTag;