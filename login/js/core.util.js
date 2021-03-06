var CoreUtil = (function () {
    var coreUtil = {};
    // coreUtil.sendAjax = function (url, type, username, password, slideVerify, ft, method, headers,noAuthorityFt,contentType, async) {
    coreUtil.sendAjax = function (url, type, username, password, slideVerify, ft, method, headers,noAuthorityFt,contentType, async) {
        var roleSaveLoading = top.layer.msg('正在请求数据 ...',{icon: 16,time:false});
        var slideVerify1 = slideVerify
        $.ajax({
            url: url,
            cache: false,
            async: async == undefined ? true : async,
            data: JSON.stringify({
                type: type,
                username:username,
                password:password
            }),
            type: method == undefined ? "POST" : method,
            // contentType: contentType == undefined ? 'application/json; charset=UTF-8': contentType ,
            contentType: contentType == undefined ? 'application/json; charset=GBK': contentType ,
            dataType: "json",
            beforeSend: function(request) {
                if(headers == undefined){

                }else if(headers){
                    request.setRequestHeader("authorization", CoreUtil.getData("access_token"));
                    request.setRequestHeader("refresh_token", CoreUtil.getData("refresh_token"));
                }else {
                    request.setRequestHeader("authorization", CoreUtil.getData("access_token"));
                }
            },
            success: function (res) {
                // if(slideVerify1 != null){
                //     slideVerify1.resetVerify();
                // }
                top.layer.close(roleSaveLoading);
                if (typeof ft == "function") {
                    if(res.code==401001){ //凭证过期重新登录
                        layer.msg("凭证过期请重新登录")
                        top.window.location.href="/index/login"
                    }else if(res.code==401002){  //根据后端提示刷新token
                        /*记录要重复刷新的参数*/
                        var reUrl=url;
                        var reType= type;
                        var reUsername=username;
                        var rePassword=password;
                        var reSlideVerify = slideVerify;
                        var reFt=ft;
                        var reMethod=method;
                        var reHeaders=headers;
                        var reNoAuthorityFt=noAuthorityFt;
                        var reContentType=contentType;
                        var reAsync=async;
                        /*刷新token  然后存入缓存*/
                        CoreUtil.sendAjax("/sys/user/token",null,null,null,null,function (res) {
                            if(res.code==0){
                                CoreUtil.setData("access_token",res.data);
                                /*刷新成功后继续重复请求*/
                                CoreUtil.sendAjax(reUrl,reType,reUsername,rePassword,reSlideVerify,reFt,reMethod,reHeaders,reNoAuthorityFt,reContentType,reAsync);
                            }else {
                                layer.msg("凭证过期请重新登录");
                                top.window.location.href="/index/login"
                            }
                        },"GET",true)
                    }else if(res.code==0) {
                        if(ft!=null&&ft!=undefined){
                            ft(res);
                        }
                    }else if(res.code==401008){//无权限响应
                        if(ft!=null&&ft!=undefined){
                            noAuthorityFt(res);
                        }
                    } else {
                        layer.msg(res.msg)
                    }
                }
            },
            error:function (XMLHttpRequest, textStatus, errorThrown) {
                if(slideVerify1 != null){
                    slideVerify1.resetVerify();
                }
                top.layer.close(roleSaveLoading);
               if(XMLHttpRequest.status==404){
                    top.window.location.href="/index/404";
                }else{
                    layer.msg("服务器好像除了点问题！请稍后试试");
                }
            }
        });
    };

    coreUtil.sendVipAjax = function (url, type, username, password, slideVerify, ft, method, headers,noAuthorityFt,contentType, async) {
        var roleSaveLoading = top.layer.msg('正在请求数据 ...',{icon: 16,time:false});
        var slideVerify1 = slideVerify
        $.ajax({
            url: url,
            cache: false,
            async: async == undefined ? true : async,
            data: JSON.stringify({
                type: type,
                username:username,
                password:password
            }),
            type: method == undefined ? "POST" : method,
            // contentType: contentType == undefined ? 'application/json; charset=UTF-8': contentType ,
            contentType: contentType == undefined ? 'application/json; charset=GBK': contentType ,
            dataType: "json",
            beforeSend: function(request) {
                if(headers == undefined){

                }else if(headers){
                    request.setRequestHeader("authorization", CoreUtil.getData("access_token"));
                    request.setRequestHeader("refresh_token", CoreUtil.getData("refresh_token"));
                }else {
                    request.setRequestHeader("authorization", CoreUtil.getData("access_token"));
                }
            },
            success: function (res) {
                if(slideVerify1 != null){
                    slideVerify1.resetVerify();
                }
                top.layer.close(roleSaveLoading);
                if (typeof ft == "function") {
                    if(res.code==401001){ //凭证过期重新登录
                        layer.msg("凭证过期请重新登录")
                        top.window.location.href="/index/login"
                    }else if(res.code==401002){  //根据后端提示刷新token
                        /*记录要重复刷新的参数*/
                        var reUrl=url;
                        var reType= type;
                        var reUsername=username;
                        var rePassword=password;
                        var reSlideVerify = slideVerify;
                        var reFt=ft;
                        var reMethod=method;
                        var reHeaders=headers;
                        var reNoAuthorityFt=noAuthorityFt;
                        var reContentType=contentType;
                        var reAsync=async;
                        /*刷新token  然后存入缓存*/
                        CoreUtil.sendAjax("/sys/user/token",null,null,null,null,function (res) {
                            if(res.code==0){
                                CoreUtil.setData("access_token",res.data);
                                /*刷新成功后继续重复请求*/
                                CoreUtil.sendAjax(reUrl,reType,reUsername,rePassword,reSlideVerify,reFt,reMethod,reHeaders,reNoAuthorityFt,reContentType,reAsync);
                            }else {
                                layer.msg("凭证过期请重新登录");
                                top.window.location.href="/index/login"
                            }
                        },"GET",true)
                    }else if(res.code==0) {
                        if(ft!=null&&ft!=undefined){
                            ft(res);
                        }
                    }else if(res.code==401008){//无权限响应
                        if(ft!=null&&ft!=undefined){
                            noAuthorityFt(res);
                        }
                    } else {
                        layer.msg(res.msg)
                    }
                }
            },
            error:function (XMLHttpRequest, textStatus, errorThrown) {
                if(slideVerify1 != null){
                    slideVerify1.resetVerify();
                }
                top.layer.close(roleSaveLoading);
                if(XMLHttpRequest.status==404){
                    top.window.location.href="/index/404";
                }else{
                    layer.msg("服务器好像除了点问题！请稍后试试");
                }
            }
        });
    };


    /*表单数据封装成 json String*/
    coreUtil.formJson = function (frm) {  //frm：form表单的id
        var o = {};
        var a = $("#"+frm).serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [ o[this.name] ];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return JSON.stringify(o);
    };
    /*存入本地缓存*/
    coreUtil.setData = function(key, value){
        layui.data('LocalData',{
            key :key,
            value: value
        })
    };
    /*从本地缓存拿数据*/
    coreUtil.getData = function(key){
        var localData = layui.data('LocalData');
        return localData[key];
    };


    coreUtil.myFormatTime=function (val) {
        console.log(val);
        if(val == null){
            return val;
        }
        var date=new Date(val);
        var year=date.getFullYear();
        var month=date.getMonth()+1;
        month=month>9?month:('0'+month);
        var day=date.getDate();
        day=day>9?day:('0'+day);
        var hh=date.getHours();
        hh=hh>9?hh:('0'+hh);
        var mm=date.getMinutes();
        mm=mm>9?mm:('0'+mm);
        var ss=date.getSeconds();
        ss=ss>9?ss:('0'+ss);
        var time=year+'-'+month+'-'+day+' '+hh+':'+mm+':'+ss;
        return time;
    };


    coreUtil.formattime=function (val) {
        var date=new Date(val);
        var year=date.getFullYear();
        var month=date.getMonth()+1;
        month=month>9?month:('0'+month);
        var day=date.getDate();
        day=day>9?day:('0'+day);
        var hh=date.getHours();
        hh=hh>9?hh:('0'+hh);
        var mm=date.getMinutes();
        mm=mm>9?mm:('0'+mm);
        var ss=date.getSeconds();
        ss=ss>9?ss:('0'+ss);
        var time=year+'-'+month+'-'+day+' '+hh+':'+mm+':'+ss;
        return time;
    };

    return coreUtil;
})(CoreUtil, window);
