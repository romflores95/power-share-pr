/**
 * Created by amos on 14-5-12.
 * --------------------------
 * Update:
 * 2017-06-14: by brysonzhang 
 * 对obj的key也加入转义，防止出现在key中的XSS攻击
 */
module.exports = function(obj){
    return JSON.stringify(obj).replace(/([& <>'\/])/g, '\\$1');
};