// 设置修改cookie 指定名字和值 几天后过期，没传就是会话级
export function setCookie(key,value,date) {
    var d = new Date();
    d.setDate(d.getDate()+date);
    document.cookie = key+"="+value+";expires="+d;
}


// 获取cookie 的值
export function getCookie(key){
    var cookieStr = document.cookie;
    var cookieArr = cookieStr.split("; ");
    for (var i = 0;i<cookieArr.length;i++){
        if(key == cookieArr[i].split("=")[0]){
            return cookieArr[i].split("=")[1]; 
        }    
    }
    return "";
}


//删除cookie
export function removeCookie(key) {
    setCookie(key,1,-1);
}