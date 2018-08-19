
var timer_countdown = '',//游戏倒计时计时器
     gamekey = 'jnd28',//游戏key
    apiurl = '',//请求地址
    opentime_remaining = -2;//开奖时间



init();
function init() {


    setTimeout(runKaiCode,1000);
    setApiurl();
    //重新设置上期的开奖期数状态【true:重新记录在last_expect】
    last_expect_status = true;
}
//检查是否提交请求
function setApiurl() {


    if (checkStorage('token') && checkStorage('host')) {
        var host = getStorage('host'),
            tk = getStorage('token');
        apiurl = host + '/event/present_expect?gamekey=' + gamekey + '&tk=' + tk;
        timer_countdown = setInterval(countDown, 1000);

        loadAjax();
    } else {
        objCount.innerHTML = '登陆错误';
        console.log(objCount);
        return false;
    }
}

 //打开页面请求数据
var typeSix, typetwo, nextopent,n;
function loadAjax() {
    $.ajax({
        url: apiurl,
        async: true,
        dataType: "json",
        success: function(data) {
            dateAndissue(data); ////填充下期开奖时间与开奖期号；
            n = data.last_opencode.opencode.split(",");
            opentime_remaining=data.present.opentime_remaining;
            //console.log(dateAndissue);
            last_opencode = data.last_opencode.expect;

            //记录上期开奖期数
            if (last_expect_status) {
                last_expect = last_opencode;
                last_expect_status = false;
            };
            setTimeout(loadAjax, 10000);//每10秒请求一次自身

        },
    });

}

function dateAndissue(data) {
    if(data.last_opencode){
        $("#issue").text(data.last_opencode.expect);
        $("#issue1").text(data.present.expect);
    }




}

//倒计时
function countDown() {
    var count = showTime(opentime_remaining);
    // console.log(returntime);
    if (opentime_remaining == -1) {//进入动画

        setTimeout(fc3d.startAnimate,100);
        $("#hourtxt").text("正在开奖");
        $(".headCode").find("ul").empty();
        //@todo 进入动画，清除倒计时
        clearInterval(timer_countdown);
    } else {
        $("#hourtxt").text(count);
        opentime_remaining--;
        //console.log(opentime_remaining);
    }
}
//格式化输出时间
function showTime(ciTime, type) {
    var iMinute, iSecond, iHour, xreturntime = '';
    var sMinute = "", sSecond = "", sHour = "";
    if (ciTime < 0) {
        if (type == 'stop') {
            return '已封盘';
        } else if (type == 'open') {
            return '开奖中';
        } else {
            return '已经封盘';
        }
    }
    iHour = parseInt(ciTime / 3600);
    if (iHour === 0) {
        //sHour = "00";
    } else {
        if (iHour > 0 && iHour < 10) {
            sHour = "0" + iHour;
        } else {
            sHour = iHour;
        }
        xreturntime += sHour.toString() + ":";
    }

    iMinute = parseInt((ciTime / 60) % 60);
    if (iMinute === 0) {
        sMinute = "00";
    }
    if (iMinute > 0 && iMinute < 10) {
        sMinute = "0" + iMinute;
    }
    if (iMinute >= 10) {
        sMinute = iMinute;
    }
    iSecond = parseInt(ciTime % 60);
    if (iSecond >= 0 && iSecond < 10) {
        sSecond = "0" + iSecond;
    }
    if (iSecond >= 10) {
        sSecond = iSecond;
    }


    xreturntime += sMinute.toString() + ":" + sSecond.toString();
    return xreturntime;
}



function tryRecoverArr() {
    var n = [];
    $(".headCode").find("ul li").each(function () {
        n.push(parseInt($(this).text()))
    }), runKaiCode(n)
}
//顶部开奖结果
/*function headKaiCode() {
    console.log(n);
    for (var a = "", i = "", e = "", t = 0; t < n.length; t++) 0 == t ? a = "<li id='oneCode'><span>" + n[t] + "</span></li>" : 1 == t ? i = "<li id='twoCode'><span>" + n[t] + "</span></li>" : e = "<li id='threeCode'><span>" + n[t] + "</span></li>";
    var l = a + i + e;
    $(".headCode").find("ul").append(l)
}*/
//中间开奖结果
function runKaiCode() {
    for (var a = "", i = "", e = "", t = 0; t < n.length; t++) 0 == t ? a = "<li class='firstBall'><span>" + n[t] + "</span></li>" : 1 == t ? i = "<li class='secondBall'><span>" + n[t] + "</span></li>" : e = "<li class='thirdBall'><span>" + n[t] + "</span></li>";
    var l = a + i + e;
    $("#curNumUl").append(l)
}
//开奖展示结果
function kaiCodeAnimate(n) {
    var a = 0;
    $(".runCode").find("#curNumUl").empty();
    var i = setInterval(function () {
        0 == a ? ($("#curNumUl").append("<li class='firstBall'><span>" + n[a] + "</span></li>"), clearInterval(runBall1), dropAgian(1)) : 1 == a ? ($("#curNumUl").append("<li class='secondBall'><span>" + n[a] + "</span></li>"), clearInterval(runBall2), dropAgian(2)) : 2 == a && ($("#curNumUl").append("<li class='thirdBall'><span>" + n[a] + "</span></li>"), clearInterval(runBall3), dropAgian(3)), ++a > 3 && (clearInterval(i), bgMusic())
    }, 1e3)
}
//中间号码隐藏，球在底部
function dropBall() {
    var n = $(".parLi").find("ul li"), a = 0;
    $(".runCode").find("#curNumUl").empty();
    for (a = 0; a < 30; a++) dropStart(a, a < 5 ? n.eq(a).position().top + 11 * (5 - a) : a >= 5 && a < 10 ? n.eq(a).position().top + 11 * (10 - a) : a >= 10 && a < 15 ? n.eq(a).position().top + 11 * (15 - a) : a >= 15 && a < 20 ? n.eq(a).position().top + 11 * (20 - a) : a >= 20 && a < 25 ? n.eq(a).position().top + 11 * (25 - a) : n.eq(a).position().top + 11 * (30 - a), n.eq(a).position().left)

}

function dropAgian(n) {
    var a = $(".parLi").find("ul li");
    1 == n ? agianAnimate(a, 0, 10) : 2 == n ? agianAnimate(a, 10, 20) : agianAnimate(a, 20, 30)
}

function agianAnimate(n, a, i) {
    for (var e = a; e < i; e++) topN = createNum(50, 55), leftN = n.eq(e).position().left + createNum(-5, 5), $(".parLi").find("ul li").eq(e).animate({
        top: topN + "px",
        left: leftN + "px"
    }, 500)
}

function dropStart(n, a, i) {
    var e = "";
    e = n < 5 || n >= 10 && n < 15 || n >= 20 && n < 25 ? createNum(0, 25) + i : createNum(-25, 0) + i;
    var t = a + createNum(-5, 1);
    $(".parLi").find("ul li").eq(n).animate({top: t + "px", left: e + "px"}, 500)
}

function ballRunning1() {
    for (var n = $(".firstBallPip").find("ul li"), a = 0, i = 0, e = 0; e < 10; e++) i = createNum(0, 55), e < 5 ? (a = createNum(-5, 25), ballAnimate(n[e], i, a)) : (a = createNum(-25, 5), ballAnimate(n[e], i, a))
}

function ballRunning2() {
    for (var n = $(".secondBallPip").find("ul li"), a = 0, i = 0, e = 0; e < 10; e++) i = createNum(0, 55), e < 5 ? (a = createNum(-5, 25), ballAnimate(n[e], i, a)) : (a = createNum(-25, 5), ballAnimate(n[e], i, a))
}

function ballRunning3() {
    for (var n = $(".thirdBallPip").find("ul li"), a = 0, i = 0, e = 0; e < 10; e++) i = createNum(0, 55), e < 5 ? (a = createNum(-5, 25), ballAnimate(n[e], i, a)) : (a = createNum(-25, 5), ballAnimate(n[e], i, a))
    if(last_expect != last_opencode) {
        clearInterval(fc3d.startAnimate);
        clearInterval(runBall1);
        clearInterval(runBall2);
        clearInterval(runBall3);
        bgMusic();

        setTimeout(fc3d.recoverBall, 100);
    }
}

function ballAnimate(n, a, i) {
    var e = createNum(10, 50);
    $(n).animate({top: a + "px", left: i + "px"}, e)
}

function createNum(n, a) {
    var i = a - n, e = Math.random();
    return n + Math.round(e * i)
}
//背景音乐
function bgMusic() {
    audioType = "b", fc3d.sound.play("audioidBg"), fc3d.sound.stop("audioidKai")
}
//开奖声音
function kaiMusic() {
    audioType = "r", fc3d.sound.play("audioidKai"), fc3d.sound.stop("audioidBg")
}

var fc3d = {}, isTry = !1, ifopen = !1, playa = "b", animateId = {}, timer = null;
//尝试开奖
$(function () {
    $("#soundBth").on("click", function () {
        "soundsOn" == $("#soundBth").attr("class") ? ($("#soundBth").removeClass("soundsOn").addClass("soundsOff"), fc3d.sound.stop("audioidKai"), fc3d.sound.stop("audioidBg")) : ($("#soundBth").removeClass("soundsOff").addClass("soundsOn"), "b" == audioType ? (fc3d.sound.play("audioidBg"), fc3d.sound.stop("audioidKai")) : (audioType, fc3d.sound.play("audioidKai"), fc3d.sound.stop("audioidBg")))
    }), $("#tryBtn").on("click", function () {
        if (isTry) return $(".jzCheck").show(), setTimeout(function () {
            $(".jzCheck").hide()
        }, 1e3), !1;
        isTry = !0, fc3d.startGame(1)
    })
}),

    fc3d.startGame = function (n) {
    kaiMusic();
    var a = [];
    fc3d.startAnimate(), setTimeout(function () {
        1 == n && (a = fc3d.createArr(), fc3d.stopAnimate(1, a))
    }, 4e3)
},
    fc3d.recoverBall = function () {
    $(".parLi").find("ul").empty();
    $(".parLi").find("ul li");
    var n = "<li></li><li></li><li></li><li></li><li></li>";
    $(".leftUl").append(n), $(".rightUl").append(n);
    clearInterval(fc3d.recoverBall);
    setTimeout(init(),1000);
},
    fc3d.sound = {
    play: function (n) {
        "soundsOn" == $("#soundBth").attr("class") && document.getElementById(n).play()
    }, stop: function (n) {
        document.getElementById(n).pause()
    }
},
    fc3d.startVid = function (n) {
    $("#hourtxt").show(), $("#opening").hide(), bgMusic(), fc3d.Data(1, n)
},
    fc3d.defStartVid = function (n) {
    $("#hourtxt").hide(), $("#opening").show(), bgMusic(), $(".headCode").find("ul").empty(), $("#issue").text(data.drawIssue), $("#kaiTime").text(data.drawTime), $(".runCode").find("#curNumUl").empty(), fc3d.startAnimate(), headKaiCode(data.preDrawCode)
},
    fc3d.stopVid = function (n) {
    $("#hourtxt").show(), $("#opening").hide(), fc3d.stopAnimate(2, n.preDrawCode), fc3d.Data(2, n)
},
    fc3d.Data = function (n, a) {
    $(".headCode").find("ul").empty(), $("#issue").text(a.drawIssue), $("#kaiTime").text(a.drawTime), $(".runCode").find("#curNumUl").empty();
    var i = a.preDrawTime.split(":");
    i[0], i[1], i[2];
    fc3d.cutTime(fc3d.getSecond(a.preDrawTime)), headKaiCode(a.preDrawCode), 2 == n || runKaiCode(a.preDrawCode)
},
    fc3d.stopAnimate = function (n, a) {
    $(".runCode").find("#curNumUl").empty(), kaiCodeAnimate(a), setTimeout(function () {
        fc3d.recoverBall(), $(".runCode").find("#curNumUl").empty(), 1 == n ? tryRecoverArr() : runKaiCode(a), isTry = !1
    }, 5e3)
};
var runBall1 = null, runBall2 = null, runBall3 = null;
//搅珠
fc3d.startAnimate = function () {

        dropBall(), setTimeout(function () {
            kaiMusic();
            runBall1 = setInterval(function () {
                ballRunning1()
            }, 50), runBall2 = setInterval(function () {
                ballRunning2()
            }, 50), runBall3 = setInterval(function () {
                ballRunning3()
            }, 50)
        }, 500)

},
    fc3d.getSecond = function (n) {
    var a = n.split(":"), i = a[0], e = a[1], t = a[2];
    return 3600 * (i = i < 10 ? i.substring(i.length - 1, i.length) : i) + 60 * (e = e < 10 ? e.substring(e.length - 1, e.length) : e) + 1 * (t = t < 10 ? t.substring(t.length - 1, t.length) : t)
},
/*    fc3d.cutTime = function (n) {
    null != timer && clearInterval(timer);
    var n = n;
    timer = setInterval(function () {
        if (n >= 1) {
            n -= 1;
            var a = Math.floor(n / 3600), i = Math.floor(n / 60 % 60), e = Math.floor(n % 60), t = "";
            if (t = (a < 10 ? "0" + a : a) + " : ", t = t + "" + (i < 10 ? "0" + i : i) + " : " + (e < 10 ? "0" + e : e), $("#hourtxt").text(t), n < 10) {
                var l = $(".linelist").find("li");
                $(l).eq(n).addClass("redli")
            }
        } else clearInterval(timer), $("#hourtxt").hide(), $("#opening").css("display", "block"), kaiMusic(), fc3d.startAnimate()
    }, 1e3)
},*/
    fc3d.clearTime = function () {
    clearInterval(timer)
},
    fc3d.createArr = function () {
    for (var n = [], a = 0; a < 3; a++) {
        var i = createNum(0, 9);
        if (0 != a) for (var e = 0, t = n.length - 1; e < n.length; e++) {
            if (i == n[e]) {
                a--;
                break
            }
            if (e == t) {
                n.push(i);
                break
            }
        } else n.push(i)
    }
    return n
};
