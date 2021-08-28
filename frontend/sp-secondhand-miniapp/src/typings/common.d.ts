import { GoodType } from "src/pages/index";
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

  declare interface Category{
    ID:string;
    ImgUrl:any;
    Name:string;
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
