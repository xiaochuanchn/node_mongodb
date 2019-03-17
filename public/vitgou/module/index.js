// import { url } from "inspector";



export class Mycart{
    constructor(options){
        this.getCookie=options.getCookie;
        this.addEvent();
        this.display();
    }
    addEvent(){
        var that=this;
        $(".cart").on({
            mouseover:function(){
                console.log(123)
            },
            click:function(){
                if(that.getCookie("logInfo")){
                    window.open("cart.html")
                }else{
                    window.open("login.html")
                }
            }
        })
    }
    display(){
        if(this.getCookie("goods")){
            this.goodsArr = JSON.parse(this.getCookie("goods"));
            var sum = 0;
            for(var i=0;i<this.goodsArr.length;i++){
                console.log(this.goodsArr[i].num)
                sum += parseInt(this.goodsArr[i].num)
            }
            $(".cart").children("em").text(sum)
        }
        // console.log(sum)
    }
}


export class Nav{
    constructor(options){
        this.navData=options.navData;
        this.setCookie=options.setCookie;
        this.addEvent();
    }
    addEvent(){
        var that=this;
        $("#nav").find(".navbar").on({
            mouseover:function(){
                $(this).addClass("current").siblings().removeClass("current");
            },
            mouseout:function(){
                $(this).removeClass("current");
            }

        },"li");
        $("#nav").find(".category").children(".cate-menu").children("ul").on({
            mouseover:function(){
                $(this).find(".content").show().parent().siblings().children(".content").hide();
                $(this).css({background:"#fff",color:"#d30939"})
                .children(".title").children("i").css({background:"url(images/class_arrow.png) no-repeat center",width:9,height:12,"background-position":"0 0"})
                .parent(".title").siblings(".subtitle").find("a").css({color:"#d30939"}).parent().parent().siblings().css({background:"#262626",color:"#fff"})
                .children(".title").children("i").css({background:"url(images/top_bg.png) no-repeat center",width:12,height:12,"background-position":"-150px -10px"})
                .parent(".title").siblings(".subtitle").find("a").css({color:"#fff"});
                that.display($(this).attr("index"))
            },
            mouseout:function(){
                $(this).find(".content").hide();
                $(this).css({background:"#262626",color:"#fff"})
                .children(".title").children("i").css({background:"url(images/top_bg.png) no-repeat center",width:12,height:12,"background-position":"-150px -10px"})
                .parent(".title").siblings(".subtitle").find("a").css({color:"#fff"});
            }
        },"li.cate-wrap");


        
        $("#top-bar").find(".topregist").click(function(){
            if($("#top-bar").find(".topregist").attr("onoff")==1){
                location.href="login.html";                
                that.setCookie("regist",1);
            }else{
                that.setCookie("logInfo",1,-1);
                location.href="index.html";
            }
            
        })
    }
    display(index){
        var str1 = "";
        var str2 = "";
        var str3 = "";
        for(let i=0;i<this.navData[index].subTitle.length;i++){
            str1+=`<li><a href="#">${this.navData[index].subTitle[i]}</a></li>`
        }

        for(let i=0;i<this.navData[index].brandUrl.length;i++){
            str2+=`<li><img src="${this.navData[index].brandUrl[i]}" alt=""></li>`
        }
        for(let i=0;i<this.navData[index].adImg.length;i++){
            str3+=`<li><img src="${this.navData[index].adImg[i]}" alt=""></li>`
        }
        $("#nav").find(".content").html(
            `<div class="content-left">
                <ul>
                    ${str1}
                </ul>
            </div>
            <div class="content-right">
                <div class="content-right-brand">
                    <ul>
                    ${str2}
                    </ul>
                </div>
                <div class="content-right-ad">
                    <ul>
                    ${str3}
                    </ul>
                </div>
            </div>`
        );
    }
}


