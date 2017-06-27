Vue.config.devtools = true;
// 水平swiper
var swiperHorizon = {
    template: '<div class="top-swiper swiper-container">' +
    '<div class="swiper-wrapper">' +
    '<div class="swiper-slide" v-for="data in dataList">' +
    '<a :href="data.href" v-if="data.href"><img :data-src="data.src" :src="data.src" class="swiper-lazy"><div class="swiper-lazy-preloader"></div></a>' +
    '<div v-else><img :data-src="data.src" :src="data.src" class="swiper-lazy"><div class="swiper-lazy-preloader"></div></div>' +
    '</div>' +
    '</div>' +
    '<div class="swiper-pagination"></div>' +
    ' </div>',
    props: ['dataList', 'paginationType'],
    mounted: function () {
    },
    data: function () {
        return {
            mySwiper: false
        }
    },
    updated: function () {
        var xthis = this;
        Vue.nextTick(function(){
            xthis.init();
        })
    },
    methods: {
        init: function () {
            var xthis = this;
            if (!this.mySwiper) {
                this.mySwiper = new Swiper('.top-swiper', {
                    direction: 'horizontal',
                    autoplay: 5000,//可选选项，自动滑动
                    loop: false,
                    speed: 400,
                    slidesPerView: 1,
                    preloadImages: false,
                    // 如果需要分页器
                    pagination: '.swiper-pagination',
                    paginationType: xthis.paginationType ? xthis.paginationType : 'bullets',
                    lazyLoading: true,
                    paginationFractionRender: function (swiper, currentClassName, totalClassName) {
                        return '<span class="' + currentClassName + '"></span>' +
                            ' <span class="swiper-pagination-split">of</span> ' +
                            '<span class="' + totalClassName + '"></span>';
                    },
                    lazyLoadingInPrevNext: true,
                    touchAngle: 30
                });
            } else {
                this.mySwiper.update(true);
            }
        }
    }
};
//pop导航
var slidePop = {
    template: '<transition @before-enter="beforeEnter" @enter="enter" @leave="leave"  :css="false" >' +
    '<div v-show="state" class="slide-pop" :class="newSlideClass">' +
    '<transition name="fade">' +
    '<div class="shadow" v-show="state" :style="{opacity:xopacity}" @click="shadowClick"></div>' +
    '</transition>' +
    '<div class="content" :style="strategy[2]" >' +
        '<slot name="default"></slot>' +
    '</div>' +
    '</div>' +
    '</transition>',
    props: ['state', 'widthRem', 'duration', 'direct', 'slideClass', 'opacity'],
    computed: {
        'widthPercent': function () {
            return this.widthRem / 10 * 100;
        },
        'xopacity': function () {
            return this.opacity ? this.opacity : '.8';
        },
        'newSlideClass': function () {
            var classArr = [];
            if (this.slideClass) classArr.push(this.slideClass);
            classArr.push(this.direct + '-slide');
            return classArr;
        },
        'strategy': function () {
            var strategy = {
                'right': [{translateX: this.widthPercent + '%'}, {translateX: 0}, {
                    'width': this.widthPercent + '%',
                    'top': '0px',
                    'height': '100%',
                    'right' : '0px'
                }],
                'left': [{translateX: -this.widthPercent + '%'}, {translateX: 0}, {
                    'width': this.widthPercent + '%',
                    'top': '0px',
                    'height': '100%',
                    'left' : '0px'
                }],
                'top': [{translateY: -this.widthPercent + '%'}, {translateY: 0}, {
                    'height': this.widthPercent + '%',
                    'width': '100%',
                    'top': '0px'
                }],
                'bottom': [{translateY: this.widthPercent + '%'}, {translateY: 0}, {
                    'height': this.widthPercent + '%',
                    'width': '100%',
                    'bottom': '0px'
                }],
            };
            return strategy[this.direct];
        }
    },
    mounted: function () {
        var xthis = this;
        $('.left-slide>.shadow').click(function () {
            xthis.$emit('changestate');
        })
    },
    methods: {
        init: function () {
        },
        beforeEnter: function (el) {
            var xthis = this;
            $(el).find('.content').velocity(xthis.strategy[0],{duration: 0});
        },
        enter: function (el, done) {
            var xthis = this;
            var dom = $(el);
            dom.find('.content').velocity(xthis.strategy[1],
                {
                    duration: xthis.duration,
                    complete: function () {
                       done();
                    }
                });
            dom.find('.shadow').velocity({opacity: xthis.xopacity}, {
                duration: xthis.duration});
        },
        leave: function (el, done) {
            var xthis = this;
            var dom = $(el);
            dom.find('.content').velocity("reverse",{
                complete: function () {
                    done();
                }
            });
            // dom.find('.shadow').velocity("reverse");
        },
        shadowClick: function(){
            this.$emit('shadowclose');
        }
    }
}
//中间弹出窗
var halfPop = {
    template : '<transition name="fade">' +
    '<div class="half_pop_full" v-show="state" >' +
    '<div class="half_pop_shadow" @click="hideHalfPop()"></div>' +
    ' <div class="half_pop">' +
    ' <div class="half_pop_content">' +
    '<slot name="default"></slot>' +
    '</div>' +
    '<div class="half_pop_btn" :style="{width:btnWidth,color:item.color}" @click="btnCheck(key)" v-for="(item,key) in btn">{{item.name}}</div>' +
    '</div>' +
    '</div>' +
    '</transition>',
    props : ['shadowClose','state','btn'],
    computed:{
        btnWidth :function(){
            return 1/this.btn.length*100+'%';
        }
    },
    methods :{
        hideHalfPop : function(){
            if(this.shadowClose){
                this.$emit('hidehalfpop')
            }
        },
        btnCheck : function(key){
            this.$emit('btncheck',key);
        }
    }
}
//全局toast
var Toast = Vue.extend({
    template: '<transition name="le-toast">' +
    '<div class="le-toast" v-if="visible" :class="customClass" :style="{ \'padding\': iconClass === \'\' ? \'10px\' : \'20px\' }">' +
    '<i class="icon" :class="iconClass" v-if="iconClass !== \'\'"></i>' +
    '<span class="text" :style="{ \'padding-top\': iconClass === \'\' ? \'0\' : \'10px\' }">{{ message }}</span>' +
    '</div>' +
    '</transition>',
    data: function () {
        return {
            visible: false
        };
    },
    props: {
        message: String,
        className: {
            type: String,
            default: ''
        },
        position: {
            type: String,
            default: 'middle'
        },
        iconClass: {
            type: String,
            default: ''
        }
    },
    computed: {
        customClass: function () {
            var classes = [];
            switch (this.position) {
                case 'top':
                    classes.push('is-placetop');
                    break;
                case 'bottom':
                    classes.push('is-placebottom');
                    break;
                default:
                    classes.push('is-placemiddle');
            }
            classes.push(this.className);

            return classes.join(' ');
        }
    }
})
var createToast = function (option, duration) {
    var instance = new Toast({}).$mount();
    instance = $.extend(instance, option);
    document.body.appendChild(instance.$el);
    Vue.nextTick(function () {
        instance.visible = true;
        setTimeout(function () {
            instance.visible = false;
        }, duration ? duration : 2000);
    })
    return instance;
}
Vue.$toast = Vue.prototype.$toast = createToast;
//弹性滚动
var pullWrap = {
    template: '<div style="width: 100%;position: relative;min-height:100%;display:block;">' +
    '<slot name="default"></slot>' +
    '</div>',
    data : function(){
        return {
            touchObj : {},
            scrollerH : 0
        }
    },
    watch : {
        scrollerH : function(){
            //高度发生变化 立刻重置min
            this.touchObj.min = this.resizeH();
        },
        tabFix : function(){
            var tabFixPx =  this.tabFixPx?this.tabFixPx:0;
            //切换tab 先停掉原先动画
           cancelAnimationFrame(this.touchObj.tickID);
            //再立刻滚到0
           this.touchObj.to(-tabFixPx,0);
        }
    },
    props: ['wrapDom', 'scrollDom','tabFixPx','fixRem','tabFix','downRefresh','special'],
    mounted: function () {
        var xthis = this;
        var warpDom = $(this.wrapDom)[0];
        var scroller = $(this.scrollDom)[0];
        Transform(warpDom, true);
        Transform(scroller, true);
        var changeH = _.throttle(function(){
            xthis.scrollerH = $(scroller).height();
        },300);
        xthis.touchObj = new AlloyTouch({
            touch: warpDom,//反馈触摸的dom
            vertical: true,//不必需，默认是true代表监听竖直方向touch
            target: scroller, //运动的对象
            property: "translateY",  //被滚动的属性
            initialValue: 0,
            preventDefault: false,
            min: -0, //不必需,滚动属性的最小值
            max: 0,//不必需,滚动属性的最大值
            sensitivity:.9,//不必需,触摸区域的灵敏度，默认值为1，可以为负数
            factor:.8,//不必需,表示触摸位移与被运动属性映射关系，默认值是1
            change: function (value) {
                changeH();
                //备用处理特殊情况函数
                // if(xthis.special){
                //     xthis.$emit('special',value,xthis.special);
                // }
            },
            touchStart: function (evt, value) {
            },
            touchMove: function (evt, value) {
                evt.preventDefault();
                //下拉增加
                if(xthis.downRefresh){
                    if(value < xthis.touchObj.min - 40){
                        xthis.$emit('canload',xthis);
                    }
                }
            },
            touchEnd: function (evt, value) {
                //下拉增加
                if(xthis.downRefresh){
                    if(value < xthis.touchObj.min - 70){
                        xthis.touchObj.to(xthis.touchObj.min - 50);
                        xthis.$emit('loadmore',xthis);
                        return false;
                    }

                }
            },
            animationEnd: function(){
                if(xthis.downRefresh){
                   xthis.$emit('cancelload',xthis);
                }
            },
            reboundEnd : function(){
                // if(xthis.downRefresh){
                //     xthis.$emit('cancelLoad',xthis);
                // }
            },
            tap: function (evt, value) {
            }
        })
    },
    methods:{
        resizeH : function(){
            var xthis = this;
            var scroller = $(this.scrollDom)[0];
            var resizeMin = function (){
                var min = Math.floor(window.innerHeight - $(scroller).height() - xthis.fixRem * parseFloat(lib.flexible.rem));
                if (min > 0) {
                    min = -0;
                }
                return min;
            };
           return  resizeMin();
        }
    }

};
//使用原生滚动版pullwrap
var npullWrap = {
    template: '<div style="width: 100%;position: relative;min-height:100%;display:block;">' +
    '<slot name="default"></slot>' +
    '</div>',
    data:function(){
        return {
            touchObj : {},
            scrollerH : 0,
            footed : false,
            state :''
        }
    },
    watch : {
        scrollerH : function(){
        },
        tabFix : function(){
        }
    },
    props:['wrapDom', 'scrollDom','tabFixPx','fixRem','tabFix','downRefresh','special','canLoadMore'],
    mounted:function(){
        var xthis = this;
        var warpDom = $(this.wrapDom);
        var scroller = $(this.scrollDom);
        var footY = 0;
        var isDown = false;
        xthis.scrollerH = scroller.height();
        touch.on(scroller[0], 'swiping', function(option){
          var dist = Math.abs(scroller.height()-warpDom.scrollTop()-warpDom.height());

          if(dist<10&&!xthis.footed&&option.direction=='up'){
             xthis.footed = true;
             xthis.footY = option.y;
          }
          //到底并继续在向下滑动
          if(xthis.footed){
            var moveY = (option.y - xthis.footY)*.8;

            if(moveY>-100){
                  warpDom.velocity({translateY:moveY},{duration:0,delay:0});
                if(moveY<-60){
                    xthis.state = 'canload';
                    xthis.$emit('canload');
                }
            }

          }
        });
        touch.on(scroller[0],'swipeend',function(){
            if(!xthis.footed) return false;
            if(xthis.state='canload'){
                xthis.state='loadmore';
                var fixpx = xthis.tabFixPx?xthis.tabFixPx:0;
                xthis.footed = false;
                //是否继续发布loadMore
                if(xthis.canLoadMore){
                    xthis.to(-50);
                    xthis.$emit('loadmore',function(cancel){
                        if(fixpx){
                            warpDom[0].scrollTop = fixpx;
                        }
                        //取消绑定
                        if(cancel){
                            touch.off(scroller[0],'swiping swipeend');
                        }
                        xthis.to(0);
                    });
                }else{
                    xthis.to(0);
                }


            }else{
                xthis.footed = false;
                xthis.to(0);
            }

        });

    },
    methods : {
        to : function(y){
            $(this.wrapDom).velocity({translateY:y},{duration:300,delay:0,easing:'easeInOutCirc'})
        }
    }
};
//底部foot
var leFoot = {
    template: '<div class="le-foot">' +
    '<div class="item" :class="{active:aIndex==0}">' +
    '<a href="/">' +
    '<i class="home"></i>' +
    '<p>{{ $t("com.foot.home") }}</p>' +
    '</a>' +
    '</div>' +
    '<div class="item" :class="{active:aIndex==1}">' +
    '<a href="/view/user/fav.html">' +
    '<i class="fav"></i>' +
    '<p>{{ $t("com.foot.fav") }}</p>' +
    '</a>' +
    '</div>' +
    '<div class="item" :class="{active:aIndex==2}">' +
    '<a href="/view/cart/cart.html" >' +
    '<i class="cart"></i>' +
    '<p>{{ $t("com.foot.cart") }}</p>' +
    '</a>' +
    '</div>' +
    '<div class="item" :class="{active:aIndex==3}">' +
    '<a href="/view/user/user.html">' +
    '<i class="user"></i>' +
    '<p>{{ $t("com.foot.user") }}</p>' +
    '</a>' +
    '</div>' +
    '</div>',
    props: ['aIndex'],
    mounted: function () {
        appTools.event.listen('cartNumChange',function(){
            appTools.isUserLogined(true);
            ajaxInstall.com(
                appTools.ajax.getCartNum
            ).done(function(data){
                if(data.err==0){
                    if(parseInt(data.data)==0) {
                        $('.le-foot').find('i.cart').html('');
                    }else{
                        $('.le-foot').find('i.cart').html('<em>'+data.data+'</em>');
                    };

                }
            })
        })
        $(function(){
            appTools.event.trigger('cartNumChange');
        })
    }
}
//
var leCheck = {
    template: '<div class="le-check" :class="{checked:isChecked,disable:disable}"  >' +
    '<div class="circle"></div>' +
    '<div class="bar" @click="toggle()"></div>' +
    '</div>',
    props: ['isChecked', 'xkey', 'disable'],
    mounted: function () {
    },
    methods: {
        toggle: function () {
            if (!this.disable) {
                this.$emit('lecheck',this.$el);
            }
        }
    }
}
//数量控制
var numControl = {
    template: '<div class="le-num-control" :class="{active:state}">' +
    '<div class="del" :class="{disabled:cantDel}" @click="del()"></div>' +
    '<div class="num">{{num}}</div>' +
    '<div class="plus" :class="{disabled:cantPlus}" @click="plus()"></div>' +
    '</div>',
    props: ['num', 'step', 'trace', 'state', 'min', 'max','limit'],
    mounted: function () {
    },
    computed: {
        'cantDel': function () {
            var min = this.min?this.min:1;
            if (this.num - this.step < min) {
                return true
            } else {
                return false;
            }
        },
        'cantPlus': function () {
            var nextNum = this.num + this.step;
            this.limit = this.limit?this.limit:9999;
            if (( nextNum > this.max)||(nextNum > this.limit )) {
                return true
            } else {
                return false;
            }
        }
    },
    methods: {
        del: function () {
            if(!this.cantDel) {
                this.$emit('countnumdel',{
                    step :this.step,
                    trace : this.trace,
                    value : this.num - this.step
                });
            }else{
                var min = this.min?this.min:1;
                this.$emit('countnumdel',{state:'invalid',info:min});
            }
        },
        plus: function () {
            if(!this.cantPlus){
                this.$emit('countnumplus',{
                    step :this.step,
                    trace : this.trace,
                    value : this.num+this.step
                });
            }else{
                var nextNum = this.num + this.step;
                if(nextNum > this.max){
                    this.$emit('countnumplus',{state:'invalid',info:this.max});
                }else{
                    this.$emit('countnumplus',{state:'limit',info:this.limit});
                }
            }
        }
    }
}
//横向滑动
var pullTab = {
    template : '<div class="pull-tab">' +
    '<div class="tab-scroll">' +
    '<div v-for="(item,index) in tabArr" class="tab-item" :class="{active:defaultIndex == index}"  :style="{width:xwidthRem+\'rem\'}">{{item}}</div>' +
    '</div>' +
    '</div>',
    data : function(){
        return {
            touch :{}
        }
    },
    props : ['tabArr','widthRem','aIndex'],
    computed : {
        xwidthRem : function(){
          return this.widthRem?this.widthRem:4.6;
        },
        defaultIndex : function(){
           if(this.aIndex==undefined){
               return 0;
           }else{
               return this.aIndex;
           }
        }

    },
    watch :{
        aIndex : function(newValue, oldValue){
            var xthis = this;
            var itemPx = xthis.xwidthRem*lib.flexible.rem;
            //判断是否超过屏幕宽度
            var windowW = $(window).width();
            var movePx = parseInt(windowW - itemPx * (newValue+1));
            if(this.touch){
                if((movePx>0)){
                    movePx = 0;
                }
                this.touch.to(movePx);
            }

        },
        tabArr : function(){
            var xthis = this;
            Vue.nextTick(function(){
               xthis.bindClick();
            })

        }
    },
    mounted : function(){
        var xthis = this;
        var warpDom = $('.pull-tab')[0];
        var scroller = $('.tab-scroll')[0];
        Transform(warpDom,true);
        Transform(scroller,true);
        var resizeMin = _.once(function () {
            var min =$(window).width() - $(scroller).children().size()* $(scroller).children().eq(0).width();
            if (min > 0) {
                min = -0;
            }
            return min;
        });
        xthis.touch  = new AlloyTouch({
            touch: warpDom,//反馈触摸的dom
            vertical: false,//不必需，默认是true代表监听竖直方向touch
            target: scroller, //运动的对象
            property: "translateX",  //被滚动的属性
            initialValue: 0,
            preventDefault: false,
            min: -0, //不必需,滚动属性的最小值
            max: 0,//不必需,滚动属性的最大值
            change: function (value) {
                this.min = resizeMin();
            },
            touchMove: function (evt, value) {
                evt.preventDefault();
            },
            tap: function (evt, value) {
            }

        })


    },
    methods : {
        bindClick : function(){
            var scroller = $('.tab-scroll');
            var xthis = this;
            scroller.children().click(function(){
                var index = $(this).index();
                $(this).addClass('active').siblings().removeClass('active');
                xthis.$emit('changetab',index);
            });
        }
    }
}
//评论星星
var starts = {
    template : '<div class="le-starts">' +
    '<div class="bg"></div>' +
    '<div class="bg-y" :style="{width:yWidth}"></div>' +
    '<div class="all-starts">' +
    '<template v-for="(item,index) in allArr">' +
    '<div class="start-item" @click="comment(index)"></div>' +
    '<div class="start-margin" v-if="margin" :style="{width:margin+\'rem\'}"></div>' +
    '</template>' +
    '<div class="clearFloat"></div></div>' +
    '</div> ',
    props : ['num','all','margin','canused','xkey'],
    computed : {
        allArr : function(){
            if(!this.all) this.all=5;
            return _.range(this.all);
        },
        yWidth : function(){
            return (this.num / this.all)*100+'%';
        }

    },
    methods:{
        comment : function(index){
            var xthis = this;
            if (!this.canused) return false;
            this.num = index + 1;
            this.$emit('changestart',xthis.num,xthis.xkey);
        }
    }
}
//下拉加载更多
var loadMore = {
    template : '<div class="load_more" :class="state">' +
    '<slot name="default"></slot>' +
    '</div>',
    props : ['state'],
    methods : {
    }
}
//列表动画
var listsAnimate = {
    template :' <transition-group name="list" :css="false" @before-enter="beforeEnter" @enter="enter" @leave="leave">'+
    '<slot name="default"></slot>' +
     '</transition-group>',
     methods : {
        beforeEnter: function (el) {
            $(el).velocity(
                {translateX: '-0.2rem'},
                {duration:0}
            )
        },
        enter: function (el, done) {
            var delay = $(el).index() * 150
            $(el).velocity(
                {translateX: '0rem'},
                { complete: done,delay:delay}
            )

        },
        leave: function (el, done) {
            $(el).velocity(
                {  translateX: '1.6rem',opacity:0 },
                { complete: done,delay:0}
            )
        },
    }
}
//使用语言包
var i18n = new VueI18n({
    // locale: appTools.device.lang,//根据浏览器语言切换语言包
    locale : 'ru',
    messages: langMessages,
    fallbackLocale :'ru'//后备语言包为俄语
});
$(function(){
    $('.header').find('.back:not(.disable)').eq(0).click(function(){
        history.back();
        return false;
    })
})
