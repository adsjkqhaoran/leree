window.appTools = {
    version : '0.0.0',
    isTest : true,
    os : 'wap',
    timeDiff : 0,
    uri : {
        hostRoot : '',
        urlPrev  : '',//url前缀测试环境为d
        protocol : 'http://'
    },
    device : {
        lang :'',//设备语言
        ios : false,
        android : false,
        imei : ''//设备标示
    },
    api : {},//所有api统一管理
    request : {}//常用请求统一管理
};
//订单状态
appTools.orderState = {
    '-3':'check-fail',
    '-2': "closed",
    '-1': "canceled",
    '0': "all",
    '1': "wait-pay",
    '2' : "wait-check",
    '4': "wait-delivery",
    '8': "wait-receive",
    '16':'received',
    '32': 'finish'
};
//基本提交信息
appTools.baseInfo = {
    version : appTools.version,
    os : appTools.os
};
//用户信息
appTools.userInfo = {

};
//通过gulp改变环境参数
//___forceTest___
appTools.isTest =  /lemall\.ru.*/.test(location.host);

//获取cookie
appTools.getCookie =  function (cookieName) {
    var cookieValue = document.cookie;
    var cookieStartAt = cookieValue.indexOf(""+cookieName+"=");
    if(cookieStartAt==-1)
    {
        cookieStartAt = cookieValue.indexOf(cookieName+"=");
    }
    if(cookieStartAt==-1)
    {
        cookieValue = null;
    }
    else
    {
        cookieStartAt = cookieValue.indexOf("=",cookieStartAt)+1;
        cookieEndAt = cookieValue.indexOf(";",cookieStartAt);
        if(cookieEndAt==-1)
        {
            cookieEndAt = cookieValue.length;
        }
        cookieValue = unescape(cookieValue.substring(cookieStartAt,cookieEndAt));//解码latin-1
    }
    return cookieValue;
};
//设置cookie
appTools.setCookie =function (cookieName,cookieValue,cookieExpires,cookiePath) {
    cookieValue = escape(cookieValue);//编码latin-1
    if(cookieExpires=="")
    {
        var nowDate = new Date();
        nowDate.setMonth(nowDate.getMonth()+6);
        cookieExpires = nowDate.toGMTString();
    }
    if(cookiePath!="")
    {
        cookiePath = ";Path=/";
    }
    document.cookie= cookieName+"="+cookieValue+";expires="+cookieExpires+cookiePath;
};
//事件订阅器
(function(){
  var event = {
      clientList :[],
      listen : function(key,fn){
          if(!this.clientList[key]){
              this.clientList[key] = [];
          }
          this.clientList[key].push(fn);//订阅的消息添加到缓存列表
      },
      trigger : function(){
          var key = Array.prototype.shift.call(arguments),
              fns = this.clientList[key];
          if(!fns||fns.length===0){//如果没有绑定对应的消息
                return false;
          }
          for(var i = 0,fn;fn=fns[i++];){
              fn.apply(this,arguments);
          }
      }
  };
  appTools.event = event;
})();
/**
 * 常用Api封装 及 测试环境特殊处理
 */
(function(){
     var api = {};
    //url前缀 测试环境有d
    appTools.uri.urlPrev = appTools.isTest?'d':'';
    appTools.uri.hostRoot = appTools.isTest?'lemall.ru':'le.ru';
    //CMS模板页数据接口
    var uriPrev = appTools.uri.protocol+appTools.uri.urlPrev;
    var hostRoot = appTools.uri.hostRoot;
   
    //会员功能接口
    api.memberApi = uriPrev + 'member.' + hostRoot +'/api/member.action';
    // api.memberApi = 'http://tmember.lemall.ru/api/member.action';
    // 优惠劵
    api.couponApi = uriPrev + 'activity.' + hostRoot +'/api/querycoupon.action';
    //商品
    api.itemApi = uriPrev +'item.' + hostRoot +'/handler/command.action';
    //活动
    api.activityApi = uriPrev +'activity.' + hostRoot +'/api/queryactivity.action';
    //购物车
    api.cartApi = uriPrev +'cart.'+hostRoot +'/handler/mobilecart.action';
    //时间
    api.timeApi = uriPrev +'item.' + hostRoot +'/handler/timestamp.action';
    //商品详情
    api.productApi = uriPrev +'productapp.' + hostRoot +'/handler/command.action';
    //订单
    api.orderApi = uriPrev +'order.' + hostRoot +'/api/appapi.action';
    // api.orderApi = 'http://torder.lemall.ru/api/appapi.action';
    appTools.api = api;
})();

//常用的ajax
(function(){
    var ajax = {};
    /**
     * ajax前置方法
     * @param checkLogined
     */
    ajax.comPrev = function(checkLogined){
        window.loading = appTools.loading(vm.$t('com.loading.default'));
    }
    /**
     * 默认后置方法
     */
    ajax.comAlways = function(){
        loading.hide();
    }
    /**
     * 默认异常提示
     */
    ajax.comFail = function(errorType,error){
        if(!errorType) return false;
        Vue.$toast({message:vm.$t('hot.tips.netError')});
    }
    window.ajaxInstall = {};
    /**
     * 自动组装默认前置和默认后置处理
     * @type {ajax.install}
     */
    window.ajaxInstall.com  = function(){
        var method = [].shift.call(arguments);
        ajax.comPrev();
        return method.apply(this,arguments).always(function(){
                ajax.comAlways();
        }).fail(function(xhr, errorType, error){
            ajax.comFail( errorType, error);
        });
    }
    ajax.getMsg = function(user_name,type,uid){
        return $.ajax({
            url: appTools.api.memberApi,
            data:appTools.ajax.combineData({
                "opt": "1", //*
                "cmd": "1" //*
            },{
                "user_name": user_name, //* 用户帐号，手机或邮件
                "send_sms_type":type //* 发送类型，1:用户注册/2:绑定手机/3:绑定邮箱/4:忘记密码
            }),
            type: 'Post',dataType:'jsonp',
            cache:false
        });
    }
    ajax.getSimpleInfo = function(user_name){
        return $.ajax({
            url: appTools.api.memberApi,
            data:
                appTools.ajax.combineData({
                    "opt": "1", //*
                    "cmd": "20", //*
                },{
                    "user_name":user_name, //* 用户帐号，选择手机或邮箱
                }),
            type: 'get',dataType:'jsonp',
            cache:false
        });
    }
    ajax.getCartNum = function(){
        return $.ajax({
            url: appTools.api.cartApi,
            data:
                appTools.ajax.combineDataJson({
                    "opt": "5",//*购物车接口
                    "cmd": "8",//*获取当前选中的SKU数量
                },{
                    "v": "1",//*API版本
                    "is_login": appTools.userInfo?1:0
                })
              ,
            type: 'post',dataType:'json',
            cache:false
        });
    }
    ajax.getCity = function (id) {
        return $.ajax({
            url: appTools.api.memberApi,
            data: appTools.ajax.combineData({
                "opt": "1", //*
                "cmd": "24", //*
            },{
                "address_id": id, //* 地址id
            }),
            type: 'get',
            dataType:'jsonp',
            cache: false
        });
    }
    ajax.getTime = (function () {
        return $.ajax({
            url: appTools.api.timeApi,
            data: {},
            type: 'get',
            dataType:'jsonp',
            cache: false
        });
    })().done(function(data){
        appTools.timeDiff = parseInt(new Date().getTime()/1000)   - data;
    });
    ajax.combineData = function() {
        var uri = [].shift.call(arguments);
        var other = {};
        _.map(arguments, function (item) {
            $.extend(other, item)
        });
        return $.extend({}, ajax.getCrc(uri), other);
    }
    ajax.combineDataJson = function(){
        var uri = [].shift.call(arguments);
        var other = {};
        _.map(arguments,function(item){
            $.extend(other,item)
        });
        return JSON.stringify($.extend({},ajax.getCrc(uri),other));
    }
    ajax.getCrc = function(option){
        var fullParams = $.extend(option,{
            os:appTools.baseInfo.os,
            imei:appTools.device.imei,
            uid:appTools.userInfo.user_code?appTools.userInfo.user_code:0,
            time_stamp :  parseInt(new Date().getTime()/1000) - appTools.timeDiff
        });
        var crc = md5(_.values(fullParams).join('/'));
        return $.extend(fullParams,{crc:crc});
    }
    appTools.ajax = ajax;
})();


/**
 *获取初略设备信息
 *
 */
(function(){
    var browser={
        device:function(){
            var u = navigator.userAgent,
                app = navigator.appVersion;
            var imei = localStorage.getItem('imei');
            if(!imei){
                imei = 'imei'+new Date().getTime();
                localStorage.setItem('imei',imei);
            }
            return {
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
                iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
                qq: u.match(/\sQQ/i) == " qq", //是否QQ
                imei : imei
            };
        }()
    };
    appTools.device = {
        ios : browser.device.ios,
        android : browser.device.android,
        lang :  navigator.language,
        imei :  browser.device.imei
    };
    browser = null;
})();




/**
 * 将URL中的参数解释成Object
 * @param url 完整url
 * @returns {{}} 以object形式返回url中的请求参数
 */
appTools.parseUrlQuery = function(url) {
    var query = {}, i, params, param;
    if (url && url.indexOf('?') >= 0) url = url.split('?')[1];
    else return query;
    params = url.split('&');
    for (i = 0; i < params.length; i++) {
        param = params[i].split('=');
        if(param[0]) query[param[0]] = param[1];
    }
    return query;
};
/**
 * 拼接完整的图片地址
 * @param src 原地址段
 * @param size 图片请求的像素大小 1~8代表屏幕宽的平分份数大小 >8代表实际像素
 * @returns {*} 返回拼接完整的图片地址
 */
appTools.imgSrc = function(src,size) {
    if (!src || !src.trim()) return "";
    var imgs = [ 'img1','img2','img3','img4','img5'];
    //http协议头
    var hrefFilter = /^http:/i;
    var pick = src.split('.')[0];
    var s = pick.charCodeAt(pick.length - 1)%5;
    if (!hrefFilter.test(src)) {
        src = appTools.uri.protocol+appTools.uri.urlPrev+imgs[s]+'.'+appTools.uri.hostRoot+'/group1/'+src;
    }
    if(size) {
        if (size >= 1 && size <= 8) {
            size = parseInt(window.innerWidth / size * (window.devicePixelRatio || 1), 10);
        }
        size = "=" + size + "x4096";
        var imgtype = /\.[a-z]{1,4}$/i;
        var execResult = imgtype.exec(src);
        if(!execResult) {
            return src;
        }
        var suffixer = execResult[0];
        //去除原有尺寸，并赋值新尺寸
        src = src.replace(new RegExp('(=\\d+x\\d+)?\\' + suffixer), size + suffixer);
    }
    return src;
};
/**
 * 封装weui常用功能,确保到时平滑过渡到其他插件
 * */
/**
 *
 * @param msg
 * @param option {label,callback}
 */
appTools.alert = function(msg,option){
    var config = {
        label : 'определить',
        callback : function(){}
    }
    config = $.extend(config,option);
    weui.alert(msg, {
        buttons: [{
            label:config.label,
            type: 'default',
            onClick: config.callback
        }]
    });
}
/**
 *表单验证
 * @param formId
 * @fn callback
 */
appTools.validate = function(formId,callback){
    weui.form.validate(formId, function (error) {
        var $ele,msg,tips;
        if(error){
            $ele = $(error.ele);
            msg = error.msg;
            tips = $ele.attr(msg + 'Tips');
            switch(msg){
                case 'empty':
                    tips = tips?tips : vm.$t('com.form.emptyTips');
                    break;
                case 'notMatch':
                    tips = tips?tips : vm.$t('com.form.notMatchTips');
                    break;
            }
        }
        if(callback){
            callback(tips,$ele);
            return true;
        }
    })
}
/**
 * 进一步封装validate，增加错误的表单高亮
 * @param formId
 * @param special 特殊判断
 * @param success 成功回调
 */
appTools.formValidate = function(formId,option){
    var config = {
        special : '',
        success : function(){}
    };
    config = $.extend(config,option);
    $(formId).find('.warn').removeClass('warn');
    appTools.validate(formId, function (error,el) {
        if (error) {
            el.addClass('warn');
            Vue.$toast({message:error});
            return false;
        }
        if(config.special){
          var result = config.special();
           if(result==false) return false;
        }
        config.success();
    })
}
/**
 * 高亮input
 * @param formId
 * @param el
 */
appTools.hightInput = function(formId,el){
    $(formId).find('.warn').removeClass('warn');
    el.addClass('warn');
}
appTools.rHightInput = function(formId){
    $(formId).find('.warn').removeClass('warn');
}
/**
 * loading
 * @param loadingText
 * @param option
 * @returns {*|{default}}
 */
appTools.loading  = function(loadingText,option){
    loadingText = loadingText?loadingText:'подождите...';
    var config = {
        iconClass : 'full_loading_shadow'
    }
    config = $.extend(config,option);
    var loading = weui.loading(loadingText, {
        className:config.iconClass
    });
    return loading;
}
/**
 * toast
 * @param text
 * @param option
 */
appTools.toast = function(text,option){
    text = text?text:'Успешная';
    var config = {
        duration :3000,
        iconClass : 'custom-classname',
        callback : function(){}
    };
    config = $.extend(config,option);
    weui.toast(text, {
        duration: config.duration,
        className: config.iconClass,
        callback: config.callback
    });
}
/**
 * 确认弹框
 * @param text
 * @param option success ,error
 */
appTools.confirm = function(text,option){
    var config = {
        confirm : function(){},
        cancel : function(){}
    };
    config = $.extend(config,option);
    weui.confirm(text,{
        buttons: [{
            label: vm.$t('com.btn.cancel'),
            type: 'default',
            onClick: config.cancel
        }, {
            label: vm.$t('com.btn.confirm'),
            type: 'primary',
            onClick: config.confirm
        }]
    });
}

/**
 * 修复自带左右滑动浏览器
 */
appTools.fixSwiper = function(){
    var tapObj = {};
    document.addEventListener("touchstart", function (ev) {
        if(ev.touches[0]){
            tapObj.ox = ev.touches[0].pageX;
            tapObj.oy = ev.touches[0].pageY;
        }
    })
    document.addEventListener("touchmove", function (ev) {
        if (Math.abs(tapObj.ox - ev.touches[0].pageX) > 0) {
            if (Math.abs(tapObj.oy - ev.touches[0].pageY) < 20) {
                ev.preventDefault();
            }
        }
    });
}


/**
 * 画个验证码
 */
appTools.refreshGraphCode = function() {
    var graphCodeCanvas = $("#graphCodeCanvas");
    var randomCodeLength = 4;
    var randomCodeList = ['1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','m','n','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z'];
    window.curGraphCode='';
    var cvs = graphCodeCanvas[0];
    var ctx = cvs.getContext("2d");
    curGraphCode='';
    for(var i=0; i<randomCodeLength;i++){
        curGraphCode+=randomCodeList[Math.round(Math.random()*(randomCodeList.length-1))];
    }
    var dx = cvs.width / (randomCodeLength+1),dy = cvs.height*0.5;
    ctx.clearRect(0,0,cvs.width,cvs.height);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font="normal 36px Arial";

    for(var i=0; i<randomCodeLength; i++) {
        ctx.save();
        ctx.fillStyle = getRandomColor();
        ctx.translate(dx*(i+1), dy);
        ctx.rotate(-Math.PI/6 + Math.random()*(Math.PI/3));
        ctx.fillText(curGraphCode[i], 0,0);
        ctx.restore();
    }
    function getRandomColor() {
        var c = "#";
        for(var i=0;i<3;i++) c+=Math.round(Math.random()*100+100).toString(16);
        return c;
    }
}





/**
 * 把userInfo塞入cookies,并记录更新时间
 * @param userName
 * @param userData
 * @returns {*}
 */
appTools.setUserCookie =  function(userName,userData){
    //有时直接返回了用户信息,就直接用这个数据了
   if(userData)   {
       appTools.setCookie('user_info',JSON.stringify($.extend(
           {},
           userData,
           {'updateTime':new Date().getTime()}

       )));
       return false;
   }
  return  ajaxInstall.com(
        appTools.ajax.getSimpleInfo,
        userName
    ).done(function(data){
        if(data.err==0){
            appTools.setCookie('user_info',JSON.stringify($.extend(
                {},
                data.data,
                {'updateTime':new Date().getTime()}
            )));
        }
    });
}
//清空user_Info cookies
appTools.clearUserCookie = function(){
    appTools.setCookie('user_info','');
}
/**
 * 在需要验证登陆的地方使用,且验证userInfo是否需要强制更新,判断是否登陆并作出跳转
 * @returns {boolean}
 */
appTools.isUserLogined = function(disRedirect){
    if(appTools.getCookie('user_info')){
        appTools.userInfo = JSON.parse(appTools.getCookie('user_info'));
        //如果userInfo过期了更新下
        if(new Date().getTime() - appTools.userInfo.updateTime >12*3600*1000){
            appTools.setUserCookie(appTools.userInfo.user_name);
        }
    }else{
        appTools.userInfo = '';

    }
    if(disRedirect) return false;
    appTools.redirect();
}
appTools.redirect = function(){
    var isEmpty = _.isEmpty(appTools.userInfo);
    var isInLogin = (location.pathname=='/view/user/login.html');
    //未登陆且不在登陆页
    if(isEmpty&&(!isInLogin)){
        window.location = '/view/user/login.html?redict='+escape(location.pathname+location.search);
        return false;
    }
    //登陆成功过且不在登陆页
    if(!isEmpty&&(!isInLogin)){

    }
    //登陆成功过且在登陆页
    if(!isEmpty&&(isInLogin)){
        window.location ='/view/user/user.html';
        return false;
    }
}
/**
 *fastclick
 */
$(function(){
    FastClick.attach(document.body);
});
