import { GoodType } from "src/pages/index";
//物品接口
declare interface Item {
  id: number;
  title: string;
  imgUrls: string;
  weChatId: string;
  telephone: string;
  price: number;
  type: number;
  address: string;
  userId: number;
  userName: string;
  userProfileImgUrl: string;
  categoryId: number;
  categoryName: string;
  publishTime: string;
  cityId: number;
  cityName: string;
  isSold: boolean;
  popularity: number;
  description: string;
  condition: string;
  status: string;
}

//Banner图片
interface Banner {
  id: number;
  imgUrl: string;
  link: string;
  order: number;
}

//地址列表
interface City {
  id: number;
  name: string;
  firstLetter: string;
  countryId: number;
  isPopular: boolean;
  englishName: string;
}

//API参数接口
declare interface searchSecondHandParam {
  catId: number;
  cityId: number;
  keyword?: string;
  page: number;
  size: number;
  sort: string;
}

declare interface getSecondHandByUserParam {
  userId: number;
  page: number;
  size: number;
}

declare interface toggleFavoriteParam {
  userId: number;
  secondHandId: number;
}

//Reducer接口
declare interface favoriteReducer {
  favorite: Array<Item>;
  isLoading: boolean;
  errMsg: string;
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
