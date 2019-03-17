

export class Regist{
    constructor(options){
        this.setCookie=options.setCookie;
        this.getCookie=options.getCookie;
        this.regUrl = "/api/reg";
        this.logUrl = "/api/login";
        this.a=0;
        this.b=0;
        this.addEvent();
        this.init();
        this.check()
    }
    init(){
        if(this.getCookie("regist")){
            $(".log").hide().siblings("h3").removeClass("active");
            $(".regist").show().siblings("h3").addClass("active");
            $(".log .msg").html("");
            this.setCookie("regist",1,-1);
        }else{
            $(".regist").hide().siblings("h3").removeClass("active");
            $(".log").show().siblings("h3").addClass("active");
            $(".regist .msg").html("");
        }
        $(".login-form").find(".regist").find(".user").children("input").val("")
        $(".login-form").find(".regist").find(".pass").children("input").val("")
        $(".login-form").find(".log").find(".user").children("input").val("")
        $(".login-form").find(".log").find(".pass").children("input").val("")
    }
    check(){
        var that=this;
        $(".login-form").find(".regist").find(".user").children("input").on("input",function(){
            var telReg=/^1[3-9]\d{9}$/;
            if(telReg.test($(".login-form").find(".regist").find(".user").children("input").val())){
                $(".login-form").find(".regist").find(".msg").text("");
                $(".login-form").find(".regist").find(".user").find("i").show().text("√").show().css({color:"#0f0"});
                that.a = 1;
                
            }else{
                $(".login-form").find(".regist").find(".msg").text("手机号填写不正确，请重新填写");
                $(".login-form").find(".regist").find(".user").find("i").text("×").show().css({color:"#f00"});
                that.a = 0;

            }

        });
        $(".login-form").find(".regist").find(".pass").children("input").on("input",function(){
            var telReg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
            if(telReg.test($(".login-form").find(".regist").find(".pass").children("input").val())){
                $(".login-form").find(".regist").find(".msg").text("");
                $(".login-form").find(".regist").find(".pass").find("i").text("√").show().css({color:"#0f0"});
                that.b = 1;
                
            }else{
                $(".login-form").find(".regist").find(".msg").text("密码填写不正确，请重新填写");
                $(".login-form").find(".regist").find(".pass").find("i").text("×").show().css({color:"#f00"});
                that.b = 0;
            }

        });
    }
    addEvent(){
        var that=this;
        $(".login").find(".regist").find(".btn").click(function(){
            console.log(that.a+"----"+that.b)
            if(that.a==1&&that.b==1){
                that.registLoad();
            }


            })
        
        $(".login").find(".log").find(".btn").click(function(){
            that.loginLoad();
        })
        $(".login").find("form").on("click","h3",function(){
            $(this).addClass("active").siblings().show().parent().siblings().children("h3").removeClass("active").siblings().hide();
            
            $(".login-form").find(".regist").find(".pass").children("input").val("");
            $(".login-form").find(".regist").find(".user").children("input").val("");
            $(".login-form").find(".log").find(".user").children("input").val("");
            $(".login-form").find(".log").find(".pass").children("input").val("");
            $(".login-form").find(".regist").find(".msg").text("");
            $(".login-form").find(".regist").find("i").hide();
        })
    }
    registLoad(){
        $.ajax({
            type: "post",
            url: this.regUrl,
            data: {
                    username:$(".login").find(".regist").find(".user").children("input").val(),
                    password:$(".login").find(".regist").find(".pass").children("input").val(),
                    nikename:$(".login").find(".regist").find(".nickname").children("input").val(),
                },
            success: function (response) {
                console.log(response);
                switch(response.error){
                    case 1:
                        $(".regist .msg").html("重名，换一个");break;
                    case 0:
                        $(".regist .msg").html("注册成功，3秒之后调转到登录");
                        setTimeout(() => {
                            $(".regist").hide().siblings("h3").removeClass("active");
                            $(".log").show().siblings("h3").addClass("active");
                            $(".regist .msg").html("");
                            $(".login-form").find(".regist").find(".user").children("input").val("");
                            $(".login-form").find(".regist").find(".pass").children("input").val("");
                            $(".login-form").find(".regist").find(".pass").find("i").hide();
                            $(".login-form").find(".regist").find(".user").find("i").hide();

                        }, 3000);
                        break;
                    case 2:
                        $(".regist .msg").html("网络错误");
                        break;
                }
            }
        });

    }
    loginLoad(){
        var that = this;
        $.ajax({
            type: "post",
            url: this.logUrl,
            data: {
                    username:$(".login").find(".log").find(".user").children("input").val(),
                    password:$(".login").find(".log").find(".pass").children("input").val()
                },
            success: function (res) {
                console.log(res.error)
                switch(res.error){
                    case 1:
                        $(".log .msg").html("用户名密码不符，请重新输入");
                        break;
                    case 0:
                        $(".log .msg").html("登录成功，1秒之后调转到购物车页面");
                        $(".login-form").find(".log").find(".user").children("input").val("");
                        $(".login-form").find(".log").find(".pass").children("input").val("");
                        setTimeout(() => {
                            location.href= "cart.html"
                        }, 1000);
                        let data = {username:res.data.username,password:res.data.password}
                        console.log(data)
                        that.setCookie("logInfo",JSON.stringify(data));
                }        
            }
        }) 
    }
}
