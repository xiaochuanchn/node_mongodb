export class GoodsList{
    constructor(options){
        this.data=null;
        this.setCookie=options.setCookie;
        this.getCookie=options.getCookie;
        this.getData()
        
    }
    getData(){
        var that = this;
        $.ajax({
            type:"get",
            url:"/api/product",
            data:{dataName:"swisse"},
            success:function(res){
                console.log(res)
             that.data = res.data;
             that.display();
            }
        })
    }
    display(){
        var str = '';
        for(var i=0;i<this.data.length;i++){           
            var str1 = "";
            for(var j=0;j<this.data[i].imageUrls.length;j++){
                str1+= `<img src=${this.data[i].imageUrls[j]}></img>`;
            }
            str +=`                        
            <li goodsid="${this.data[i].id}" dataName="${this.data[i].dataName}">
            <img src="${this.data[i].imageUrls[0]}" alt="" class="bigimg">
            <div class="small-imgs">
                ${str1}
            </div>
            <h3>${this.data[i].title}</h3>
            <p><b>￥${parseInt(this.data[i].price/2)}.00</b> <span>￥${this.data[i].price}.00</span> </p>
            <div class="add">加入购物车</div>
        </li>`
        }
        $("#brand-main").find(".list").children("ul").html(str);
        this.addEvent();  
    }
    addEvent(){
        var that = this;
        $(".list").children("ul").on({
            mouseover:function(){
            $(this).css({"border":"1px solid #c00"}).siblings().css({"border":"1px solid #f0f0f0"}).parent().siblings(".bigimg").attr("src",$(this).attr("src"));
            },
        },".small-imgs img");
        $(".list").children("ul").on("click",".add",function(){
            that.id = $(this).parents("li").attr("goodsid");
            that.dataName = $(this).parents("li").attr("dataName");
            console.log($(this).parents("li").attr("goodsid"));
            that.setGoods();
           $("header").find(".cart").find("em").text(parseInt($("header").find(".cart").find("em").text())+1);
            
        })
        $(".list").children("ul").on({
            mouseover:function(){$(this).css({"color":"#c00"});},
            mouseout:function(){$(this).css({"color":"#666"});},
        },"h3");
        $(".list").children("ul").on({
            click:function(){
                console.log(123);
                window.open("detail.html");
                that.setCookie("shopping",JSON.stringify({"goodsid":$(this).parent("li").attr("goodsid"),"dataName":$(this).parent("li").attr("dataName")}));
                console.log($(this).parent("li").attr("goodsid"));
            },
            
        },".bigimg,h3");
    }
    setGoods(){
        this.goodsInfo = this.getCookie("goods")===""?[]:JSON.parse(this.getCookie("goods"));
        if(this.goodsInfo.length<1){
            this.goodsInfo.push({
                "id":this.id,
                "num":1,
                "dataName":this.dataName
            });
        }else{
            var onOff = true;
            for(var i=0;i<this.goodsInfo.length;i++){
                if(this.id==this.goodsInfo[i].id){
                    this.goodsInfo[i].num++;
                    onOff = false;
                    break;
                }
            }
            if(onOff){
                this.goodsInfo.push({
                    "id":this.id,
                    "num":1,
                    "dataName":this.dataName
                });
            }
        }
        this.setCookie("goods",JSON.stringify(this.goodsInfo));

    }
}


