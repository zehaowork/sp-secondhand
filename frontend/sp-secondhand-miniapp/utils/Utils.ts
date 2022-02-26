import moment from "moment-timezone";
import { GOOD_CONDITION } from "../src/typings/enum";
export const Utils = {
  /**
   *
   * @param keyword 关键字
   * @param original 全文
   * @returns 高亮全文
   */
  highlightKeyword: function (keyword, original, color) {
    if (keyword) {
      let regex = new RegExp(keyword, "g");
      original = original.replace(
        regex,
        "<span style='color:" + color + "'>" + keyword + "</span>"
      );
      return original;
    }

    return original;
  },

  groupBy: function (xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  },

  formatDate: function (time) {
    var format = "YYYY-MM-DD";
    const formatted_time = moment(time).format(format);
    return formatted_time;
  },

  convertGoodConditionToChinese: function (condition: string) {
    switch (condition) {
      case GOOD_CONDITION.BRAND_NEW:
        return "全新";
      case GOOD_CONDITION.LIKE_NEW:
        return "近乎全新";
      case GOOD_CONDITION.MINOR_FLAW:
        return "轻微瑕疵";
      case GOOD_CONDITION.OBVIOUS_FLAW:
        return "明显瑕疵";
    }
  },
  ellipsis: function (str: string, limit: number) {
    if (str.length > limit) {
      return str.slice(0, limit) + "...";
    }
    return str;
  },
};
