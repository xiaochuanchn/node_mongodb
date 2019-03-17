export class Detail{
    constructor(options){
        this.getCookie = options.getCookie;
        this.setCookie = options.setCookie;
        // this.data=options.data;
        // this.hotData=options.hotData;
        // this.goodsData=[];
        this.init();
        this.addevent();
        this.getbig();
        
    }
    init(){
        if(this.getCookie("shopping")){
            this.id = JSON.parse(this.getCookie("shopping")).goodsid; 
            this.dataName = JSON.parse(this.getCookie("shopping")).dataName; 
            var that = this;
            $.ajax({
                type:"get",
                url:"/api/product",
                data:{dataName:this.dataName},
                success:function(res){
                    console.log(that.data)
                    for(var i=0;i<res.data.length;i++){
                        if(res.data[i].id==that.id){
                            that.data = res.data[i];
                        }
                    }
                 that.display();
                }
            })

        }
    }
    display(){
                var str = "";
                var imgstr="";
                $("#detail-main").find(".detail-title").find("em").text(this.data.title);
                $("#detail-main").find(".big").children("img").attr("src",this.data.imageUrls[0]);
                $(".addnum").children("input").val(1);
                $("#detail-main").find(".small").children("ul").html(
                `<li>
                    <img src="${this.data.imageUrls[0]}" alt="">
                </li>
                <li>
                    <img src="${this.data.imageUrls[1]}" alt="">
                </li>
                <li>
                    <img src="${this.data.imageUrls[2]}" alt="">
                </li>
                <li>
                    <img src="${this.data.imageUrls[3]}" alt="">
                </li>`);
                $("#detail-main").find(".price").find(".txt").children("h3").text(this.data.title);
                $("#detail-main").find(".price").find(".price-tag").children(".num").find("em").text("￥"+this.data.price+".00");
                $("#detail-main").find(".price").find(".price-tag").children(".num").find("b").text("￥"+(parseInt(this.data.price/2))+".00");
                if(this.data.keyValues){
                    for(let j=0;j<this.data.keyValues.length;j++){
                        str+=`<li>${this.data.keyValues[j].key}：${this.data.keyValues[j].value}</li> `
                    }
                    $("#detail-main").find(".detail-info").children("ul").html(str);
                }
                if(this.data.detailImageUrls){
                    for(let j=0;j<this.data.detailImageUrls.length;j++){
                        imgstr+=`<img src="${this.data.detailImageUrls[j]}" alt="image">`
                    }
                    $("#detail-main").find(".detail-images").html(imgstr);
                }else{
                    $("#detail-main").find(".detail-images").html(
                        `<img src="http://img.vitagou.com/upload/image/20160517/20160517103958_22173.jpg" alt="image">
                        <img src="http://img.vitagou.com/upload/image/20170907/20170907093054_20497.jpg" alt="image">
                        <img src="http://img.vitagou.com/upload/image/20170907/20170907093055_93903.jpg" alt="image">
                        <img src="http://img.vitagou.com/upload/image/20170907/20170907093056_72544.jpg" alt="image">
                        <img src="http://img.vitagou.com/upload/image/20170907/20170907093056_43575.jpg" alt="image">
                        <img src="http://img.vitagou.com/upload/image/20170907/20170907093057_58913.jpg" alt="image">
                        <img src="http://img.vitagou.com/upload/image/20170907/20170907093058_60642.jpg" alt="image">
                        <img src="http://img.vitagou.com/upload/image/20170907/20170907093059_77462.jpg" alt="image">
                        <img src="http://img.vitagou.com/upload/image/20170907/20170907093100_53409.jpg" alt="image">
                        <img src="http://img.vitagou.com/upload/image/20170907/20170907093101_56231.jpg" alt="image">
                        <img src="http://img.vitagou.com/upload/image/20170907/20170907093101_92305.jpg" alt="image">
                        <img src="http://img.vitagou.com/upload/image/20170907/20170907093102_63484.jpg" alt="image">
                        <img src="http://img.vitagou.com/upload/image/20170907/20170907093103_73915.jpg" alt="image">
                        <img src="http://img.vitagou.com/upload/image/20171010/20171010144605_56270.jpg" alt="image"> 
                        <img src="http://img.vitagou.com/upload/image/20160704/20160704105407_29598.jpg" alt="image"> 
                        <img src="http://img.vitagou.com/upload/image/20160704/20160704105408_76100.jpg" alt="image"> 
                        <img src="http://img.vitagou.com/upload/image/20160704/20160704105408_85794.jpg" alt="image"> 
                        <img src="http://img.vitagou.com/upload/image/20160704/20160704105409_43738.jpg" alt="image"> 
                        <img src="http://img.vitagou.com/upload/image/20160704/20160704105410_90767.jpg" alt="image"> 
                        <img src="http://img.vitagou.com/upload/image/20160704/20160704105412_19987.jpg" alt="image"> 
                        <img src="http://img.vitagou.com/upload/image/20160704/20160704105413_88660.jpg" alt="image"> 
                        <img src="http://img.vitagou.com/upload/image/20160704/20160704105415_59860.jpg" alt="image"> 
                        <img src="http://img.vitagou.com/upload/image/20160704/20160704105416_50204.jpg" alt="image"> 
                        <img src="http://img.vitagou.com/upload/image/20160704/20160704105416_90352.jpg" alt="image"> 
                        <img src="http://img.vitagou.com/images/upload/image/20151112/20151112101908_49811.jpg" alt="image"> `
                    );

                }

            
        
    }
    addevent(){
        var that=this;
        $(".small").children("ul").on("mouseover","li",function(){
            $(this).css({"border": "1px solid #c00"}).siblings().css({"border": "1px solid #eee"})
            .parents(".image").find(".big").children("img").attr("src",$(this).children("img").attr("src"));   
        });
        var num = $(".addnum").children("input").val();
        $(".addnum").children(".btn").children(".plus").click(function(){
            num++;
            $(".addnum").children("input").val(num);
        });
        
        $(".addnum").children(".btn").children(".diff").click(function(){
            if(num<=1){
                num=1
            }else{
                num--;
            }
            $(".addnum").children("input").val(num);
        });
        $(".add").find("#add").click(function(){
            that.setGoods();
            $("header").find(".cart").find("em").text(parseInt($("header").find(".cart").find("em").text())+parseInt($(".addnum").children("input").val()));
            // alert("添加购物车成功");
            // location.reload();
        });
    }
    getbig(){
        $(".big").on("mouseover",function(){
            console.log(123)
            $(".big").children("span").css({"display":"block"});
            $(".big").children("#getbig").css({"display":"block"}).html(`<img src="${$(".big").children("img").attr("src")}" alt="">`);

            $(".big").on("mousemove",function(e){
                var l=e.pageX-$(".big").children("img").offset().left-$(".big").children("span").width()/2;
                var t=e.pageY-$(".big").children("img").offset().top-$(".big").children("span").height()/2;
                if(l<=0) l=0;
                if(t<=0) t=0;
                if(l>=$(".big img").width()-$(".big span").width()) l=$(".big img").width()-$(".big span").width();
                if(t>=$(".big img").height()-$(".big span").height()) t=$(".big img").height()-$(".big span").height();
                $(".big").children("span").css({"left":l,"top":t});
                var x = ($(".big span").width()-$(".big").children("img").width())/($("#getbig").width()-$("#getbig img").width());
                var y = ($(".big span").height()-$(".big").children("img").height())/($("#getbig").height()-$("#getbig img").height());

                $("#getbig img").css({top:-t/y,left:-l/x})
            })
            
        });
        $(".big").on("mouseout",function(){
            $(".big").children("span").css({"display":"none"});
            $(".big").children("#getbig").css({"display":"none"});
        });

    }
    setGoods(){
        console.log($(".addnum").children("input").val())
        this.goodsInfo = this.getCookie("goods")===""?[]:JSON.parse(this.getCookie("goods"));
        if(this.goodsInfo.length<1){
            this.goodsInfo.push({
                "id":this.id,
                "num":Number($(".addnum").children("input").val()),
                "dataName":this.dataName
            });
        }else{
            var onOff = true;
            for(var i=0;i<this.goodsInfo.length;i++){
                if(this.id==this.goodsInfo[i].id){
                    this.goodsInfo[i].num+=Number($(".addnum").children("input").val());
                    onOff = false;
                    break;
                }
            }
            if(onOff){
                this.goodsInfo.push({
                    "id":this.id,
                    "num":Number($(".addnum").children("input").val()),
                    "dataName":this.dataName
                });
            }
        }
        this.setCookie("goods",JSON.stringify(this.goodsInfo));
        console.log(JSON.parse(this.getCookie("goods")));

    }

}

