export class Cart{
    constructor(options){
        this.getCookie = options.getCookie;
        this.setCookie=options.setCookie;
        this.data = options.data;
        this.hotData=options.hotData;
        
        
        
        // this.check();
        this.init();
        
       
        
    }
    init(){
        if(this.getCookie("logInfo")){
            this.logInfo =  JSON.parse(this.getCookie("logInfo"));
            this.check();
            this.addevent();
            
        }
    }
    check(){
        var that =this;
        this.goodsArr = JSON.parse(this.getCookie("goods"));
        console.log(this.goodsArr)
            $.ajax({
                type:"get",
                url:"/api/product",
                data:{dataName:"swisse"},
                success:function(res){
                    that.arr = [];
                    for(let j=0;j<res.data.length;j++){
                        for(let i=0;i<that.goodsArr.length;i++){
                            if(res.data[j].id===that.goodsArr[i].id){
                                that.arr.push([that.goodsArr[i].num,res.data[j]]);
                            }

                        }
                    }
                    that.display();
                }
            })
    }
    display(){
        console.log(this.arr)
        var str = "";
        var total = 0;           
            for(var j=0;j<this.arr.length;j++){
                var subtotal = parseInt(this.arr[j][0]) * parseInt(this.arr[j][1].price/2);
                // var subtotal = parseInt($("tbody").find("tr").eq(5).val()) * parseInt(this.arr[j][0].price/2);
                        total+= subtotal;
                        str+=`
                        <tr id=${this.arr[j][1].id}>
                            <td>${j+1}</td>
                            <td><img src="${this.arr[j][1].imageUrls[0]}"></td>
                            <td>${this.arr[j][1].title}</td>
                            <td class="perPrice">￥<i>${parseInt(this.arr[j][1].price/2)}</i>.00</td>
                            <td class="num"><span class="diff">-</span><input type="text" value="${this.arr[j][0]}"><span class="add">+</span></td>
                            <td class="subtotal">￥<i>${subtotal}</i>.00</td>
                            <td class="del">删除</td>
                        </tr> `
                    }
        
        // }
        $("tbody").html(str)
        $("tfoot").find("em").html(`￥<i>${total}</i>.00`);
    }
    addevent(){
        var that=this;
        $("tbody").on("click",".del",function(){
            $(this).parent().remove();
            for(var i=0;i<that.goodsArr.length;i++){
                if(that.goodsArr[i].id==$(this).parent().attr("id")){
                    that.goodsArr.splice(i,1);
                }
            }
            console.log(parseInt($("tfoot").find("em").find("i").text()));
           console.log(parseInt($(this).siblings(".subtotal").find("i").text())) 
           $("tfoot").find("em").find("i").text(parseInt($("tfoot").find("em").find("i").text())-parseInt($(this).siblings(".subtotal").find("i").text()));

            var str = JSON.stringify(that.goodsArr);
            that.setCookie("goods",str);
            that.check();
            // that.display();
        });
        $("tbody").on("click",".add",function(){
            that.num = $(this).siblings("input").val();
            for(var i=0;i<that.goodsArr.length;i++){
                if(that.goodsArr[i].id==$(this).parent().parent().attr("id")){
                    that.goodsArr[i].num++;                    
                }                 
            }
            var str = JSON.stringify(that.goodsArr);
            that.setCookie("goods",str);
            that.num++;
            var str2 = that.num*parseInt($(this).parent().siblings(".perPrice").children("i").text())
            $(this).parent().siblings(".subtotal").find("i").html(str2)
            that.total()
            
            $(this).siblings("input").val(that.num);
            that.check();
           
        })
        $("tbody").on("click",".diff",function(){
            that.num = $(this).siblings("input").val();
            if($(this).siblings("input").val()>1){
                for(var i=0;i<that.goodsArr.length;i++){
                    if(that.goodsArr[i].id==$(this).parent().parent().attr("id")){
                        that.goodsArr[i].num--;                    
                    }                 
                }
                that.num--;
                var str2 = that.num*parseInt($(this).parent().siblings(".perPrice").children("i").text())
                $(this).parent().siblings(".subtotal").find("i").html(str2)
                
                $(this).siblings("input").val(that.num);
            }
            that.total();
            var str = JSON.stringify(that.goodsArr);
            that.setCookie("goods",str);
            that.check();
            // that.total();
            // that.display();
        })
        $("tbody").on("input","input",function(){
            // if($(this).siblings("input").val()>1){
                for(var i=0;i<that.goodsArr.length;i++){
                    if(that.goodsArr[i].id==$(this).parent().parent().attr("id")){
                        that.goodsArr[i].num = $(this).val();                    
                    }                 
                }
            // }
            var str3 = parseInt($(this).val())*parseInt($(this).parent().siblings(".perPrice").children("i").text())
            $(this).parent().siblings(".subtotal").find("i").html(str3)
            var str = JSON.stringify(that.goodsArr);
            that.setCookie("goods",str);
            that.total();
            console.log($(this).val());
            // that.display();
        })
    }
    total(){
        var total=0;
        for(var i=0;i<$("tbody").find("tr").length;i++){
            total+= parseInt($("tbody").find("tr").eq(i).find(".subtotal").find("i").html()) ;
        }
        $("tfoot").find("em").html(`￥<i>${total}</i>.00`);
    }

}


