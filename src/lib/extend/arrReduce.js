/**
 * Array Reduce 常用操作封装
 */
layui.define(['admin', 'index'], function () {
    var $ = layui.jquery;
    admin = layui.admin;

    var obj = {
        /**
         * 求数组项之和
         * @param arr
         */
        sum: (arr) => {
            arr.reduce((prev, cur) => {
                return prev + cur
            }, 0)
        },

        /**
         * 求数组项最大值
         * @param arr
         */
        max: (arr) => {
            arr.reduce((prev, cur) => {
                return Math.max(prev, cur)
            })
        },

        /**
         *  数组去重
         * @param arr
         */
        repetition: (arr) => {
            arr.reduce((prev, cur) => {
                prev.indexOf(cur) === -1 && prev.push(cur);
                return prev;
            }, []);
        }
    }
    exports('arrReduce', obj)
});