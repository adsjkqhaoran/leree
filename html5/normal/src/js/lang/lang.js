var langMessages = {
    ru: {
        //组件
        com: {
            loading: {
                default: 'подождите'//加载中
            },
            foot: {
                home: 'На главную',//主页
                fav: 'собирать',//心愿单
                cart: 'Корзина',//购物车
                user: 'мой'//我的
            },
            form: {

                selectTips :'Выбери',//请选择
                emptyTips :'Введи',//请输入
                must : 'Обязательное поле',//必填
                notMatchTips:'Неверный',//错误
                quhao : '7',//区号
                familyName :{
                    placeholder :'фамилия'
                },
                giveName :{
                    placeholder :'имя'
                },
                setPaw : {
                    placeholder :'Пароль',//输入您的密码
                    emptyTips :'Введи пароль',//输入您的密码
                    notMatchTips : 'Требования к паролю 6-20 символов, не поддерживает использование чистых цифр, букв в качестве пароля'

                },
                inputName :{
                  placeholder :'Имя пользователя',//输入您的用户名【注册时用填入号码或邮箱】
                  emptyTips :'Введи свой номер тел. или Email',//输入您的电话号码。或电子邮件
                  notMatchTips :'Неверный номер тел./Неверный email'//无效的电话号码。/电子邮件地址无效
                },
                inputPaw : {
                    placeholder :'Пароль',//输入您的密码
                    emptyTips :'Введи пароль'//输入您的密码
                },
                oldPaw : {
                  placeholder :'Старый пароль'//旧密码
                },
                oldEmail :　{
                    placeholder :'Старый Email'
                },
                newPaw :{
                    placeholder :'Новый пароль'//新密码
                },
                newEmail :{
                    placeholder :'Новый  Email'
                },
                confirm : {
                  placeholder : 'Подтвердите новый пароль'//确认密码
                },
                inputMsg :{
                    //验证码
                    placeholder : 'Введи символы с картинки',//输入验证码
                    emptyTips :'Введи символы с картинки', //输入验证码
                    notMatchTips :'Неверный символы с картинки' //无效验证码
                },
                inputValidate :{
                    //短信验证码
                    placeholder :'Введи код подтверждения', //校验码
                    emptyTips:'Введи код подтверждения',
                    notMatchTips : 'Неверный код' //无效验证码
                },
                confirmPaw : {
                  placeholder :'Подтвердите пароль',
                  emptyTips :'Повтори пароль'
                },
                inputNew : {
                    placeholder :'телефона / Email'//创建用户
                },
                oldTel : {
                  placeholder :'Старый номер телефона',
                  notMatchTips :'Старый пароль неверен'
                },
                newTel : {
                    placeholder :'Новый номер телефона'
                },
                nickName: {
                    placeholder: 'кличка'
                },
                userName: {
                    placeholder: 'грузополучатель'//姓名
                },
                tel: {
                    placeholder: 'телефон',
                    notMatchTips :'Введи номер мобильного телефона (10 цифр)'//输入10位手机号

                },
                email: {
                    placeholder: 'электронная почта',
                    notMatchTips :'Введи верный адрес Email'
                },
                zipCode: {
                    placeholder: 'Почтовый индекс'//邮编
                },
                sex: {
                    placeholder: 'Гендерные'
                },
                birthday: {
                    placeholder: 'Дата рождения'
                },
                country: {
                    placeholder: 'страна'//国家
                },
                area: {
                    placeholder: 'Выберите область' //一级区域
                },
                city: {
                    placeholder: 'Выберите город' // 二级区域
                },
                detailAdress: {
                    placeholder: 'Заполните адрес доставки'
                },
                inputComment :{
                    placeholder :'Пожалуйста, оценка ввода'
                }
            },
            btn: {
                save: 'Сохранить',
                cancel :'Отменить',
                send :'послать',//发送短信
                pay: 'оплата',
                getCode: 'получить',
                toCart: 'в корзину',
                buyNow: 'Купить',
                confirm: 'определить',
                newAdress: 'Новый адрес доставки',
                sendOut :'доставка',//发货
                addCoupon :'Добавление купонов',
                search : "поиск",

                returnGoods : 'замена Отмена',//申请退货
                goShopping :'Перейти в магазин',
                reset : 'сброс',
                login : 'Войти',
                register :'Регистрация',
                nextStep :'Дальше',
                sellOut :'Продано',
                rePay :'оплати повторно',//重新支付
                comment :'оценивать',//评价
                confirmReceive :'признание получения',
                edit:'модификация',//修改
                bind :'переплет'//绑定
            },
            sort: {
                priceAsc: 'Цена от низкого до высокого',
                priceDesc: 'Цена от высокой к низкой',
                saleDesc: 'Высокая низких продаж'
            },
            numControl : {
                num : 'количество',
                maxTips :'нет на складе',//库存不足
                minTips :'Минимальное количество покупки: {0}', //商品最低起售xx件
                limitTips :'Максимальное количество покупки: {0}'//限购xx件
            },
            loadMore:{
                scanMore :  'Просмотреть больше' //查看更多
            }
        },
        //常用
        hot: {
            ru :'Россия',
            money : 'руб',
            man :'мужчина',
            woman :'женщина',
            //常用提示
            tips:{
                selectFullAttrsTips :'Пожалуйста, выберите полную собственность',
                giftSelectedLimitedTips : 'Выбери {0} подарку|Выбери {0} подарки',//请选择n种赠品
                giftHasSelectedTips : 'Выбрано {0} подарку|Выбрано {0} подарки',//你已经选中多少种
                noEnoughStock :'нехватка запасов',//库存不足
                noStock :'Продано',//没有库存
                offShelf :'Товар от полки',//商品已下架
                addFavSuccess:'Отмеченный',
                pleaseLogin :'Пожалуйста, войдите',
                emptyCart : 'Корзина пуста, вы можете войти, чтобы просмотреть добавленные товары',//购物车为空,去购物
                confirmDel : 'Подтвердить удаление',//确认删除
                netError:'Сетевые аномалии',//网络异常
                enterDetailEdress :'Пожалуйста, введите полный адрес',//请输入完整地址
                BeRegisted :'Этот аккаунт уже зарегистрирован',//被注册
                noAccount :'Этот аккаунт не действителен',//用户不存在
                userPawNomatch:'Неверное имя использователя или пароль',//账号密码不匹配
                twoPawDifferent :'Пароль неправильно повторил',//两次密码输入不一致，请重新输入
                paySucces:'Оплата оформлена',//支付成功
                payErrorToRepay :'Не удалось оплатить.Пожалуйста, оплати повторно',//支付失败重新支付
                payExpectToRepay :'Оплатил необычайно.Пожалуйста, оплати повторно',//支付异常
                orderCommitSuccess :'Заказ оплатил.Ждать отправить.',//恭喜，您订单已经提交成功，请等待商品发货
                orderSearchTips:'Пожалуйста, введи номер заказа или название товара',//请输入您的订单号或产品名称
                orderCancelTips :'Заказ будет закрыт,утвержди отменить,пожалуйста.',//取消订单之后订单会关闭，请确认执行该操作
                orderReceiveToComment :'Товары доставлены, пиши отзыв.',//Товары доставлены, пиши отзыв.

                eventSuccess :'Готово',//操作成功
                eventError :'Не удалось'//操作失败
            },
            //订单相关
            order: {
                myOrder: 'Мои заказы',
                allOrder: 'полный',
                waitPay: 'Ожидание оплаты',
                waitPayWarn :'Неуплата, заказ будет автоматически отменен',
                waitSend: 'Ожидание отправки',
                waitSendTip :'Мы упаковаем посылку для вас.пожалуйста,жди с терпением.',
                send: 'Ожидание получения',
                waitReceive :'Ожидание получения',
                waitReceiveWarn :'Нет подтверждения приема, заказ будет автоматически подтверждено',
                return : 'возврат',//退货
                exchange :'замена',//换货
                receive: 'Доставлено',
                close :'закрыто',
                finish : 'полный',
                orderPrice :'Сумма заказа',
                originPrice :'Итого товаров на сумму',
                discountPrice :'Итого скидка',
                payWithFlow :'Выплаты (включая фрахт)',//付款含运费
                useCoupon :'Использовать сертификат',
                flowPrice :'Итого доставка',
                flowInfo :'Вернуться обратный адрес',
                flowNum :'номер',
                noflowTips :'Нет  материально - технической информации',
                orderLists :'Список товаров',
                createTime :'созданный',
                payTime : 'время выплаты',
                sendTime :'срок поставки',
                receiveTime :'Подтверждение получения',
                cancelTime :'Отменить заказ',
                closeTime : 'сомкнутый строй',
                finishTime : 'Полный порядок',
                orderListsEmptyTips :'Список заказов пуст, вы можете пойти, чтобы купить сейчас'
            },
            //优惠劵
            coupon: {
                unused: 'неиспользуемый',
                used: 'Используется',
                outDate: 'просрочен',
                useTip :'Используйте только один купон заказа, ваучеры были использованы не дают изменения, невозвращаемой'
            },
            //常用分类
            cate: {
                allCate: 'Все категории',
                mobile: 'сотовый телефон',
                tv: 'телевидение',
                smartDevice: 'Умные устройства',
                fitting: 'примерка'
            }
        },
        //正则
        regex:{
            email :'^\\w+@\\w+\\.\\w+$',
            tel : '^[0-9]{11}$',
            msg : '^[0-9]{6}$',
            limit50 :'^[^!#$%^&*~-]{1,50}?$',
            code :'^[0-9a-zA-Zp]{4}$',
            setPaw :'^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$'
        },
        //页面
        index: {
            superMobile: 'Супер Супер телефон',
            recommend: 'Рекомендуется для вас'
        },
        fav: {
            header: 'Список желаний'
        },
        cart: {
            header: 'Корзина',
            selectAll: 'Выбрано',
            finishEdit: 'Завершено',
            addFav: 'добавить в <br/> корзину'
        },
        user: {
            noNickName: 'Прозвище не установлен',
            //列表功能
            coupon: 'купон',
            sendAddress: 'адрес доставки',
            myAccount: 'Моя учетная запись',
            service: 'Как связаться с клиентами',
            setting: 'устанавливать'
        },
        account: {
            header: "Моя учетная запись",
            userInfo: 'профиль',
            loginTel: 'Вход телефона',
            loginEmail: 'Войти email',
            noneInfo: 'отсутствующий',
            paw: 'пароль',
            setted: "был установлен",
            editEmail: 'Изменить Email',
            editTel :'Изменить телефон'
        },
        coupon: {
            header: 'купон'
        },
        cate: {
            header: 'категория',

        },
        cateLists: {
            header: 'Список продуктов'
        },
        goodDetail: {
            header: 'Подробнее',
            detail: 'введение',
            param: 'спецификации',
            recommend: 'Оценка',
            flowRule : 'отгрузка',
            sales:'продаж',//销量
            freeFlow : 'Бесплатная доставка',
            selectType :'выбрать' //规格参数
        },
        editAdress: {
            header: 'Адрес доставки',
            setDefault: "Установить адрес по умолчанию"
        },
        comment: {
            header: 'оценка',
            product: 'товар',
            flow: 'логистика',
            service :'обслуживание'
        },
        pay : {
            header :'платить',
            choosePayType :'Выберите способ оплаты',
            cod :'Наложенный платеж',//货到付款cod
            yandexWallet :'Электронный кошелёк Яндекс',
            card : 'Банковская карта',
            confirmTel : 'Подтвердите свой номер телефона» to «Подтверди свой номер телефона',
            paypalTips :'Оплата через официальный сайт PayPal, переадресация автоматическая.'
        },
        order : {
            header : 'Подтвердить заказ',
            orderLists : 'Список товаров',
            disCount : 'Nредложения',
            useCoupon : 'Использовать сертификат le.ru',
            allPrice : 'Стоимость покупки'
        },
        orderLists : {
            header : 'Мои заказы'
        },
        orderDetail : {
            header : 'заказ детали'
        },
        login : {
            forgetPawTips : 'Восстановить пароль?',
            otherLogin : 'Вход через',
            noAccount :'Нет учетной записи? ',
            register : 'Для регистрации',
            commitRegisterTips : 'Регистрация считается согласен',
            leecoPromise : 'Я прочитал Условия пользовательского соглашения и согласен с ними',
            hasAccountTips :'Уже есть аккаунт?',
            msgSendedTips :'Код подтверждения был отправлен на Ваш почтовый ящик',
            setPawTips :'Требования к паролю 6-20 символов, не поддерживает использование чистых цифр, букв в качестве пароля'
        },
        find : {
            header : 'Восстановить пароль',
            findTips : 'Пожалуйста, введите ваш зарегистрированный аккаунтs',
            email :'email',
            enter : 'извлекатьs',
            chooseValidateType :'Выберите режим извлечения'
        },
        setting :{
            header:'устанавливать',
            about :'О компании',
            protocol :'обслуживание соглашение',//协议
            quite :'Выйти'
        },
        backLists  : {
            header : 'Подавать заявление возврата'
        }
    },

};
