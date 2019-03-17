class Floor{
    constructor(){
        this.init();
    }
    init(){
        var that = this;
        $.ajax({
            type:"get",
            url:"/api/banner",
            data:{dataName:"banner"},
            success:function(res){
             that.floorData = res.page_data;
             that.display();
            that.addEvent();

            }
        })
    }
    display(){
        var str = "";
        for(var i=0;i<this.floorData.length;i++){
            str+=`<li index="${i}"><span class="num">${i+1}F</span><span class="word">${this.floorData[i].title}</span></li>`
        }
        $(".floor").html(`<ul>${str}</ul>`);
    }
    addEvent(){
        var that=this;
       $(document).scroll(function () {
            // var before = $(window).scrollTop();
           if($(document).scrollTop()>=$("main").children().eq(0).offset().top){
                $(".floor").css({top:$(document).scrollTop()+300,display:"block"});
           }else{
            $(".floor").css({display:"none"});
           }
           that.rate = Math.floor(($(document).scrollTop()-$("main").children().eq(0).offset().top)/$("main").children().eq(0).height());
           $(".floor").children("ul").children().eq(that.rate).css({color:"#CB1C39"})
           .children(".word").show().siblings(".num").hide()
           .parent().siblings().css({color:"#666",background:"#ccc"})
           .children(".num").show().siblings(".word").hide();
        
           
        });
        $(".floor").on({
            mouseover:function(){
                $(this).css({background:"#CB1C39",color:"#fff"}).children(".num").hide().siblings(".word").show();
            },
            mouseout:function(){
                $(this).css({color:"#666",background:"#ccc"}).children(".word").hide().siblings(".num").show();
                $(".floor").children("ul").children().eq(that.rate).css({color:"#CB1C39"}).children(".word").show().siblings(".num").hide()

            },
            click:function(){
                $("html,body").animate({scrollTop:$("main").children().eq($(this).attr("index")).offset().top},1000)
            }
        },"li");
    }
}

new Floor();
