import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Taro from "@tarojs/taro";
import { CoverView, CoverImage, View, Image } from "@tarojs/components";
import s from "./index.css";
import PERSONAL_UNCHECKED from "../../src/images/user.png";
import PERSONAL_CHECKED from "../../src/images/user_hover.png";

import ADD_UNCHECKED from "../../src/images/add.png";
import ADD_CHECKED from "../../src/images/add_hover.png";

import INDEX_UNCHECKED from "../../src/images/first.png";
import INDEX_CHECKED from "../../src/images/first_hover.png";

import SECOND_HAND from "../../src/images/secondhandpub.svg";
import HOUSE_RENT from "../../src/images/houserentpub.svg";
import Mask from "../../src/components/Mask/Mask";

const customTabBar: React.FC = () => {
  const [isPublishOpen, setIsPublishOpen] = useState(false);

  const list = [
    {
      pagePath: "pages/index/index",
      text: "首页",
      iconPath: INDEX_UNCHECKED,
      selectedIconPath: INDEX_CHECKED,
    },
    {
      pagePath: "pages/publish/index",
      text: "发布",
      iconPath: ADD_UNCHECKED,
      selectedIconPath: ADD_CHECKED,
    },
    {
      pagePath: "pages/personal/index",
      text: "个人",
      iconPath: PERSONAL_UNCHECKED,
      selectedIconPath: PERSONAL_CHECKED,
    },
  ];
  const tabBar = useSelector(({ tabBar }) => tabBar);

  useEffect(() => {
    console.log(tabBar);
  }, []);

  const switchTab = (item) => {
    setIsPublishOpen(false);
    const url = "/" + item.pagePath;
    Taro.switchTab({
      url: url,
    });
  };

  const toggleFloater = () => {
    setIsPublishOpen(!isPublishOpen);
  };

  const openPublish = (item) => {
    setIsPublishOpen(false);
    switchTab(item);
  };

  const color = "#777a84";
  const selectedColor = "#ffd101";

  const renderList = list.map((item, index) => {
    return (
      <React.Fragment>
        {index !== 1 ? (
          <CoverView
            className={s.item}
            onClick={() => {
              switchTab(item);
            }}
            data-path={item.pagePath}
            key={item.text}
          >
            <CoverImage
              className={s.img}
              src={
                tabBar.selected === index && !isPublishOpen
                  ? item.selectedIconPath
                  : item.iconPath
              }
            />
            <CoverView
              className={s.text}
              style={{
                color:
                  tabBar.selected === index && !isPublishOpen
                    ? selectedColor
                    : color,
              }}
            >
              {item.text}
            </CoverView>
          </CoverView>
        ) : (
          <CoverView
            className={s.item}
            onClick={toggleFloater}
            data-path={item.pagePath}
            key={item.text}
          >
            <CoverImage
              className={s.img}
              src={
                isPublishOpen || tabBar.selected === 1
                  ? item.selectedIconPath
                  : item.iconPath
              }
            />
            <CoverView
              className={s.text}
              style={{
                color:
                  isPublishOpen || tabBar.selected === 1
                    ? selectedColor
                    : color,
              }}
            >
              {item.text}
            </CoverView>
          </CoverView>
        )}
      </React.Fragment>
    );
  });

  return (
    <CoverView className={isPublishOpen ? s.container_lg : s.container}>
      {isPublishOpen && (
        <CoverView className={s.float}>
          <CoverView
            onClick={() => {
              openPublish(list[1]);
            }}
            className={s.category}
          >
            <CoverImage className={s.icon} src={SECOND_HAND} />
            闲置
          </CoverView>
          <CoverView className={s.category}>
            <CoverImage className={s.icon} src={HOUSE_RENT} />
            租房
          </CoverView>
        </CoverView>
      )}
      <Mask
        onClick={() => {
          setIsPublishOpen(!isPublishOpen);
        }}
        isActive={isPublishOpen}
      />
      <CoverView id="bottom-tab" className={s.tab_bar}>
        {renderList}
      </CoverView>
    </CoverView>
  );
};
export default customTabBar;
