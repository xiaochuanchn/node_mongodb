export class Hot{
    constructor(options){
        // this.hotData=options.hotData;
        this.myGetDate=options.myGetDate;
        this.setCookie=options.setCookie;
        this.off = 0.5;  
        this.date = new Date("2019-04-2 17:46");
        this.date2 = new Date()
        this.msg = null;
        this.timer=null;     
        this.timer=null;
        this.init();
        this.time();
        this.addEvent();
    }
    init(){
        var that = this;
        $.ajax({
            type:"get",
            url:"/api/product",
            data:{dataName:"swisse"},
            success:function(res){
             that.hotData = res.data;
             that.display();
            }
        })
    }
    display(){
        var str = "";
        var str1="";
        var arr = [];
       for(var i=0;i<this.hotData.length;i++){
           if(this.hotData[i].hot=="true"){
               arr.push(this.hotData[i]);
               str+=`
               <li id="${this.hotData[i].id}" dataName="${this.hotData[i].dataName}">
                       <img src="${this.hotData[i].imageUrls[0]}" alt="">
                       <h3>${this.hotData[i].title}</h3>
                       <div class="hot-price">
                           <p>￥${Math.floor(this.hotData[i].price*this.off)}</p>
                           <span>.00</span>
                           <em>￥${this.hotData[i].price}.00</em>
                           <i>${this.off*10}折</i>
                           <input type="button" value="我要抢">
                       </div>
                   </li>
               `;
               
          }
          
        }

        $("#hot-buy").find("ul").html(str);
        var n=arr.length<5?arr.length:5
            for(var j=0;j<n;j++){
              str1+=`
              <li id="${arr[j].id}" dataName="${arr[j].dataName}">
                  <a>
                      <img src="${arr[j].imageUrls[0]}" alt="">
                      <h3>￥${Math.floor(arr[j].price*this.off)}.00</h3>
                      <p>${arr[j].title}</p>
                      <button>${this.msg}</button>
                  </a>
              </li>
              `
        }
       $("#crazy-price").find("ul").html(str1);

      if(this.date-this.date2>0){
        this.dateTime = this.myGetDate(this.date,this.date2);
        this.msg = `剩余时间：${this.dateTime.day}天${this.dateTime.hour}小时${this.dateTime.minute}分钟${this.dateTime.second}秒`;
    }else{
        this.msg = "已过期";
    }

      
      

    }
    addEvent(){
        var that=this;
        $("#hot-buy").find("ul").on("click","input",function(){
            this.id = $(this).parent().parent().attr("id");
            this.dataName = $(this).parent().parent().attr("dataName");

            that.setCookie("shopping",JSON.stringify({"goodsid":this.id,"dataName":this.dataName}));
            location.href = "hot-detail.html";
        })
        $($("#crazy-price")).on("click","li",function(){
            that.setCookie("shopping",JSON.stringify({"goodsid":$(this).attr("id"),"dataName":$(this).attr("dataName")}));
            location.href = "hot-detail.html";
        })
    }
    time(){
        var that = this;
        if(this.date-this.date2>0){
            this.timer = setInterval(()=>{
                if(this.dateTime.day==0&&this.dateTime.hour==0&&this.dateTime.minute==0&&this.dateTime.second==0){
                    clearInterval(this.timer);
                    $(".time").text(`已过期`);
                }else{
                    var date2 = new Date();
                    that.dateTime = this.myGetDate(that.date,date2);
                    console.log(that.dateTime)
                    $("#crazy-price").find("button").text(`剩余时间：${this.dateTime.day}天${this.dateTime.hour}小时${this.dateTime.minute}分钟${this.dateTime.second}秒`);
                }
                },1000)
        }
    }
}

