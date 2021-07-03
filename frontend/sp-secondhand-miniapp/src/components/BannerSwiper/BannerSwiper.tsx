import React from 'react';
import {Swiper, View, SwiperItem, Image} from '@tarojs/components';
import s from './BannerSwiper.css';


interface Props {
    
}

const BannerSwiper: React.FC<Props> = (props)=>{





    //渲染函数
    
    return <View  className={s.container}>
        <Swiper className={s.swiper} >
            <SwiperItem>
                <Image  src='' className={s.image} />
            </SwiperItem>
        </Swiper>
    </View>
}
export default BannerSwiper;