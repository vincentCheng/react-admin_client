/**
 * 代理服务器地址 http://localhost:5000 ，已经在package.json中的proxy配置
 * 这里只需要""
 * @type {string}
 */
export const BaseUrl = "/api";
export const ReqType = {GET: 'GET', POST: 'POST'};
export const ReqWeatherUrlParts = ['http://api.map.baidu.com/telematics/v3/weather?location=','&output=json&ak=3p4\n' +
'9MVra6urFRGOT9s8UBWr2'];