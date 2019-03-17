;(function($){
    "use strict";
    $.fn.banner = function(options){
        this.LOCAL = {
            delayTime:options.delayTime || 2000,
            moveTime:options.moveTime || 300,
            index:0,
            iPre:options.items.length-1,
            onOff:0,
        };
        var that = this;
        //list点击滑动
        if(options.list!=undefined&&options.list.length>0){
            options.list.children("span").eq(0).css({background:"rgba(255,0,0,0.5)"});
            this.LOCAL.listMove = function(type,i){
                options.items.eq(that.LOCAL.index).css({left:0}).stop().animate({left:-type*options.items.eq(0).width()},that.LOCAL.moveTime)
                .end().eq(i).css({left:options.items.eq(0).width()*type}).stop().animate({left:0},that.LOCAL.moveTime);
            };
            //点击事件
            options.list.children("span").click(function(){
                console.log(this,$(this).index());
                if(that.LOCAL.index<$(this).index()){
                    that.LOCAL.listMove(1,$(this).index());
                }else{
                    that.LOCAL.listMove(-1,$(this).index());
                }
                that.LOCAL.index = $(this).index();
                $(this).css({background:"rgba(255,0,0,0.5)"}).siblings().css({background:"rgba(0, 0, 0, 0.5)"});

            });
        }
        //左右按钮点击滑动
        if(options.left!=undefined&&options.left.length>0&&options.right!=undefined&&options.right.length){           
            //右滑动
            options.right.click(function(){
                that.LOCAL.rightMove();
            });
            //左滑动
            options.left.click(function(){
                that.LOCAL.leftMove();
            });
        }
        //自动滑动

        if(options.autoMove==false){
            clearInterval(this.LOCAL.timer);
        }else{
            this.LOCAL.timer = setInterval(()=>{
                this.LOCAL.leftMove(1);
            },that.LOCAL.delayTime);
            this.hover(function(){
                clearInterval(that.LOCAL.timer);
                },function(){
                    that.LOCAL.timer = setInterval(()=>{
                        that.LOCAL.leftMove(1);
                    },that.LOCAL.delayTime);
    
                });
        }
        this.LOCAL.imgsMove= function(type){
            options.items.eq(that.LOCAL.index).css({left:type*options.items.eq(0).width()}).stop().animate({left:0},that.LOCAL.moveTime).end().eq(that.LOCAL.iPre).css({left:0}).stop().animate({left:-type*options.items.eq(0).width()},that.LOCAL.moveTime);
            if(options.list){

                options.list.children().eq(that.LOCAL.index).css({background:"rgba(255,0,0,0.5)"}).siblings().css({background:"rgba(0, 0, 0, 0.5)"});
            }
            

        };

        this.LOCAL.leftMove = function(){
            if(that.LOCAL.index==0){
                that.LOCAL.index=options.items.length-1;
                that.LOCAL.iPre = 0;
            }else{
                that.LOCAL.index--;
                that.LOCAL.iPre =that.LOCAL.index + 1;
            }
            that.LOCAL.imgsMove(-1);
        };

        this.LOCAL.rightMove = function(){
            if(that.LOCAL.index==options.items.length-1){
                that.LOCAL.index=0;
                that.LOCAL.iPre = options.items.length-1;
            }else{
                that.LOCAL.index++;
                that.LOCAL.iPre = that.LOCAL.index-1;
            }
            that.LOCAL.imgsMove(1);
        };
    };


})(jQuery);