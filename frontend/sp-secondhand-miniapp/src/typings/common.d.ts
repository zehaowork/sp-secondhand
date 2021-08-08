import { GoodType } from "src/pages/index";
declare interface Item  {
    ID:string;
    imgUrl:string;
    isSale:boolean;
    popularity:number;
    Title:string;
    Price:number;
    CityName:string;
    GoodType:GoodType;
    CategoryName:string;
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
