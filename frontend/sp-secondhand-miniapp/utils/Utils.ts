import moment from 'moment-timezone';
export const Utils = {
    /**
     * 
     * @param keyword 关键字
     * @param original 全文
     * @returns 高亮全文
     */
    highlightKeyword:function(keyword,original,color) {
        if(keyword){
            let regex = new RegExp(keyword,'g');
            original = original.replace(regex,"<span style='color:"+color+"'>" + keyword +"</span>");
            return original;
        }
        
        return original;
    },

    groupBy : function(xs, key) {
        return xs.reduce(function(rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    },

    formatDate:function(time) {
		var format = 'YYYY-MM-DD';
		const formatted_time = moment(time).format(format);
		return formatted_time
	},

}