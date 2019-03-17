export class Main{
    constructor(options){
        // this.floorData=options.floorData;
        this.setCookie=options.setCookie;
        this.init();
       
    }
    init(){
        var that = this;
        $.ajax({
            type:"get",
            url:"/api/product",
            data:{dataName:"swisse"},
            success:function(res){
             that.data = res.data;
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
        }) 
    }
    display(){
    var str1="";
    var str2="";
    var n=this.data.length<10?this.data.length:10
    for(let i=0;i<n;i++){
        console.log(this.data[i].id)
        str2+=`<li goodsid="${this.data[i].id}" dataName="swisse">
        <img src="${this.data[i].imageUrls[0]}" alt="">
        <a href="#">${this.data[i].title}</a>
        <p>￥${parseInt(this.data[i].price/2)}.00 <span>￥${this.data[i].price}.00</span></p>
    </li>`
    }
    for(let i=0;i<this.floorData.length;i++){
        str1+=`<div class="contain">
        <div class="title">
            ${i+1}F ${this.floorData[i].title}
        </div>
        <div class="middle">
            <div class="middle-l">
                <img src="images/web-1-13.jpg" alt="">
                <h3>大家还喜欢</h3>
                <ul>
                    <li>
                        <a href="">钙</a>
                    </li>
                    <li>
                        <a href="">铁</a>
                    </li>
                    <li>
                        <a href="">锌</a>
                    </li>
                    <li>
                        <a href="">维C</a>
                    </li>
                    <li>
                        <a href="">维B</a>
                    </li>
                    <li>
                        <a href="">维D</a>
                    </li>
                    <li>
                        <a href="">复合维生素</a>
                    </li>
                </ul>
            </div>
            <div class="middle-r">
                <ul>
                    ${str2}
                </ul>
            </div>
        </div>
        
    </div>`;
    }
    $("main.toplist").html(str1);
        
    }
    addEvent(){
        var that =this;
        $("main.toplist").find(".middle").find(".middle-r").on("click","img,a",function(){
            console.log(123)
            that.setCookie("shopping",JSON.stringify({"goodsid":$(this).parent().attr("goodsid"),"dataName":$(this).parent().attr("dataName")}));
            window.open("detail.html");
        })
    }
}
