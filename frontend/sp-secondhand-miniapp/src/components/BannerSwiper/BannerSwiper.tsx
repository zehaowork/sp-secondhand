import React from 'react';
import {Swiper, View, SwiperItem, Image} from '@tarojs/components';
import s from './BannerSwiper.css';


interface Props {
    imageList: Array<string>;
}

const BannerSwiper: React.FC<Props> = (props)=>{





    //渲染函数
    const renderImage = props.imageList.map(img =>   <Image mode='aspectFill'  src={img} className={s.image} />)
    
    return <View  className={s.container}>
        <Swiper className={s.swiper} >
            <SwiperItem>
              {renderImage}
            </SwiperItem>
        </Swiper>
    </View>
}
export default BannerSwiper;