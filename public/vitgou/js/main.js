

import "../libs/jquery.js";
import "../libs/JQuery.banner.js";
import {myGetDate} from "../libs/public.js";
import {navData} from"../data/navdata.js";
import {getCookie,setCookie} from "../libs/cookie.js";
import {Detail} from "../module/detail.js";
import {HotDetail} from"../module/hot-detail.js";
import {Hot} from "../module/hot.js";
import {Nav,Mycart} from "../module/index.js";
import {Regist} from "../module/login.js";
import {Status} from "../module/status.js";
import {GoodsList} from "../module/swisse.js";
import {Cart} from "../module/cart.js";
import {Main} from "../module/index-main.js";

new Detail({
    getCookie:getCookie,
    setCookie:setCookie,
});
new HotDetail({
    getCookie:getCookie,
    setCookie:setCookie,
    myGetDate:myGetDate
});
new Hot({
    myGetDate:myGetDate,
    setCookie:setCookie
});
new Main({
    setCookie:setCookie,
});
new Nav({
    setCookie:setCookie,
    navData:navData
});
new Mycart({
    getCookie:getCookie
});
new Regist({
    setCookie:setCookie,
    getCookie:getCookie
});
new Status({
    getCookie:getCookie
});
new GoodsList({
    getCookie:getCookie,
    setCookie:setCookie,
});
new Cart({
    getCookie:getCookie,
    setCookie:setCookie,
});
$("#banner").banner({
    items:$("#banner").children(".imgbox").children("img"),
    list:$("#banner").children(".list"),
    delayTime:3000,
});