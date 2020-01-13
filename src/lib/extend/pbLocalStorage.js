/**
 *  localStorage 有效期设置
 */

layui.define(['admin', 'index'],function (exports) {
    var $ = layui.jquery,
        admin = layui.admin;
    const obj = {
        set: (key, value, ttl_ms) => {
            const data = { value: value, exprirse: new Date(ttl_ms).getTime() };
            localStorage.setItem(key, JSON.stringify(data));
        },
        get: (key) => {
            const data = JSON.parse(localStorage.getItem(key));
            if (data !== null) {
                if (data.exprirse != null && data.exprirse < new Date().getTime()) {
                    localStorage.removeItem(key);
                } else {
                    return data.value;
                }
            }
            return null;
        }
    }
})