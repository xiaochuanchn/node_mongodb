export class HotDetail{
    constructor(options){
        this.getCookie = options.getCookie;
        this.setCookie = options.setCookie;
        // this.hotData = options.hotData;
        this.myGetDate=options.myGetDate;
        this.off = 0.5;
        this.date = new Date("2019-04-2 17:46");
        this.date2 = new Date();
        this.msg = null;
        this.timer=null;
        this.init();
        this.time();
    }
    init(){
        console.log(this.getCookie("shopping"))
        if(this.getCookie("shopping")){
            this.hotid = JSON.parse(this.getCookie("shopping")).goodsid;
            this.dataName = JSON.parse(this.getCookie("shopping")).dataName;
            console.log(this.hotid)
            var that = this;
            $.ajax({
                type:"get",
                url:"/api/product",
                data:{dataName:this.dataName},
                success:function(res){
                    console.log(res.data)
                    for(var i=0;i<res.data.length;i++){
                        if(res.data[i].id==that.hotid){
                            that.hotData = res.data[i];
                            console.log(that.hotData)
                        }
                    }
                    that.display();
                    that.addEvent();
                }
            })
        }
    }
    display(){
        
       
       var  str=`
        <div class="hot-product">
        <h3>${this.hotData.title}</h3>
        <div class="info">
            <div class="info-left">
                <div class="title">
                    <p>￥${Math.floor(this.hotData.price*this.off)}.00</p>
                    <input type="button" value="我要抢">
                </div>
                <div class="price-off">
                    <ul>
                        <li>
                            <p>原价</p>
                            <em>￥${this.hotData.price}.00</em>
                        </li>
                        <li>
                            <p>折扣</p>
                            <i>￥${Math.floor(this.hotData.price*this.off)}.00</i>
                        </li>
                        <li>
                            <p>节省</p>
                            <b>￥${Math.floor(this.hotData.price*(1-this.off))}.00</b>
                        </li>
                    </ul>
                </div>
                <div class="time">${this.msg}</div>
            </div>
            <div class="info-right">
                <img src="${this.hotData.imageUrls[0]}" alt="">
            </div>
        </div>
        `
            
        
        $(".hot-wrap").html(str);
        if(this.date-this.date2>0){
            this.dateTime = this.myGetDate(this.date,this.date2);
            this.msg = `剩余时间：${this.dateTime.day}天${this.dateTime.hour}小时${this.dateTime.minute}分钟${this.dateTime.second}秒`;
        }else{
            this.msg = "已过期";
            $(".hot-product").find(".info").find(".title").children("input").remove();
        }
    }
    addEvent(){
        var that = this;
        $(".hot-product").find(".info").find(".title").children("input").on("click",function(){
            location.href = "detail.html";
            that.setCookie("shopping",JSON.stringify({"goodsid":that.hotid,"dataName":that.dataName}) );
        })
    }
    time(){
        var that = this;
        if(this.date-this.date2>0){
            this.timer = setInterval(()=>{
                if(that.dateTime.day==0&&that.dateTime.hour==0&&that.dateTime.minute==0&&that.dateTime.second==0){
                    clearInterval(this.timer);
                    $(".time").text(`已过期`);
                    $(".hot-product").find(".info").find(".title").children("input").remove();
                }else{
                    var date2 = new Date();
                    that.dateTime = that.myGetDate(that.date,date2);
                    console.log(that.dateTime)
                    $(".time").text(`剩余时间：${that.dateTime.day}天${that.dateTime.hour}小时${that.dateTime.minute}分钟${that.dateTime.second}秒`);
                }
                },1000);
        }
    }
}
