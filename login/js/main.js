$(function(){
    var layer = layui.layer;
    var form = layui.form;
    // var SlideVerifyPlug = window.slideVerifyPlug;       滑块验证
    // var slideVerify = new SlideVerifyPlug('#verify-wrap',{});     滑块验证
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })
    })

    var input = $('.validate-input .input100');

    //登录检测
    $.ajax({
        url : "/sys/user/vip",
        type : "Post",
        dataType : "json",
        data :
            JSON.stringify({
                type: "1",
                username:"vip",
                password:"vip"
            }),
        contentType : 'application/json; charset=GBK',
        async : true,
        success : function (res) {
            console.log(res);
            if (res.data != null) {
                CoreUtil.setData("access_token", res.data.accessToken);
                console.log(res.data.accessToken);
                CoreUtil.setData("refresh_token", res.data.refreshToken);
                alert("检测到玉松内部人员登录" + "\n" + "点击右侧的【关闭】或【确定】自动登录！");
                window.location.href = "/index/home";
                // layer.msg("正在为您自动登录，请稍等！", {
                //     icon: 6,
                //     time: 2000,
                // },function () {
                //
                // });
            }
        }
    })

    // CoreUtil.sendAjax("/sys/user/vip","1","vip","vip",null,
    //     function (res) {
    //         CoreUtil.setData("access_token",res.data.accessToken);
    //         console.log(res.data.accessToken);
    //         CoreUtil.setData("refresh_token",res.data.refreshToken);
    //         window.location.href="/index/home";
    //     },"Post");


    $('.validate-form').on('submit',function(data){

        var form = document.getElementById("myform")
        // CoreUtil.sendAjax("/sys/user/login",form.type.value,form.username.value,form.password.value,slideVerify,
        CoreUtil.sendAjax("/sys/user/login",form.type.value,form.username.value,form.password.value,null,
            function (res) {
                CoreUtil.setData("access_token",res.data.accessToken);
                console.log(res.data.accessToken);
                CoreUtil.setData("refresh_token",res.data.refreshToken);
                window.location.href="/index/home";
            },"Post");



        //------ 滑块验证 ------
        // var check = true;
        // for(var i=0; i<input.length; i++) {
        //     if(validate(input[i]) == false){
        //         showValidate(input[i]);
        //         check=false;
        //     }
        // }
        // if(check == true){
        //     if(slideVerify.slideFinishState){
        //// CoreUtil.sendAjax("/sys/user/login",form.type.value,form.username.value,form.password.value,slideVerify,
        //         CoreUtil.sendAjax("/sys/user/login",form.type.value,form.username.value,form.password.value,null,
        //             function (res) {
        //                 CoreUtil.setData("access_token",res.data.accessToken);
        //                 console.log(res.data.accessToken);
        //                 CoreUtil.setData("refresh_token",res.data.refreshToken);
        //                 window.location.href="/index/home";
        //             },"Post");
        //     }else {
        //         top.layer.msg('请滑动滑块进行登录验证！',{icon: 7,time:1500});
        //     }
        // }
        return false;
    });
    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
            hideValidate(this);
        });
    });
    function validate (input) {
        if($(input).val().trim() == ''){
            return false;
        }
    }
    function showValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).addClass('alert-validate');

    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).removeClass('alert-validate');
    }
})