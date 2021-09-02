import { GoodType } from "src/pages/index";
//物品接口
declare interface Item  {
    id:number;
    title:string;
    imgUrls:string;
    weChatId:string;
    telephone:string;
    price:number;
    type:number;
    address:string;
    userId:number;
    categoryId:number;
    publishTime:string;
    cityId:number;
    isSold:boolean;
    popularity:number;
  }

  //API参数接口
  declare interface searchSecondHandParam {
    catId:number;
    cityId:number;
    keyword:string;
    page:number;
    size:number
  }

  declare interface toggleFavoriteParam {
    userId:number;
    secondHandId:number
  }
  
declare module "*.png";
declare module "*.gif";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.css";
declare module "*.less";
declare module "*.scss";
declare module "*.sass";
declare module "*.styl";
