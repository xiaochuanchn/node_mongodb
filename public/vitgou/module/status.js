export class Status{
    constructor(options){
        this.getCookie=options.getCookie;
        this.init();
    }
    init(){
        if(this.getCookie("logInfo")){
            this.logInfo=JSON.parse(this.getCookie("logInfo"));
            console.log(this.logInfo)
            $("#top-bar").find(".top-bar-right").find(".login").html(`用户：${this.logInfo.username}`).css({color:"#c00"}).siblings(".topregist").html("注销").attr("onoff","2");
        }
       
    }
}

