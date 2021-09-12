import React from 'react';
import {Swiper, View, SwiperItem, Image} from '@tarojs/components';
import s from './BannerSwiper.css';
import { Banner } from 'src/typings/common';


interface Props {
    imageList: Banner[];
}

const BannerSwiper: React.FC<Props> = (props)=>{





    //渲染函数
    const renderImage = props.imageList.map(banner =>   <Image mode='aspectFill'  src={'http://120.79.59.51:8087/'+banner.imgUrl} className={s.image} />)
    
    return <View  className={s.container}>
        <Swiper className={s.swiper} >
            <SwiperItem>
              {renderImage}
            </SwiperItem>
        </Swiper>
    </View>
}
export default BannerSwiper;