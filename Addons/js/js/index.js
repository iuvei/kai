
function PK10(){
    localStorage.setItem('host','https://api.dk1288.com/');
    $('#bjpk10').attr('src','/v/bjpk10')
     $("#bjpk10").fadeIn(500)
     $('#body_none').show();
 }
function CQSSC(){
    localStorage.setItem('host','https://api.dk1288.com/');
    $('#cqssc_1').attr('src','/v/cqssc')
    $('#cqssc_1').fadeIn(500);
    $('#body_none').show();
}

function TJSSC(){
 alert("敬请期待!");
 return ;
}

function XYFT(){
    localStorage.setItem('host','https://api.dk1288.com/');
    $('#xyft_1').attr('src','/v/xyft')
    $('#xyft_1').fadeIn(500)
    $('#body_none').show();
}

function JSSC(){
    localStorage.setItem('host','https://api.dk1288.com/');
    $('#jssc').attr('src','/v/bjpk10')
    $("#jssc").fadeIn(500)
    $('#body_none').show();
}

function JSSSC(){
    localStorage.setItem('host','https://api.dk1288.com/');
    $('#jsssc_1').attr('src','/v/cqssc')
    $("#jsssc_1").fadeIn(500)
    $('#body_none').show();
}

$('.video_box .pk10').click(PK10);
$('.video_box .cqssc').click(CQSSC);
$('.video_box .xyft_1').click(XYFT);
$('.video_box .jsssc_1').click(JSSSC);
$('.video_box .tjssc_111').click(TJSSC);
$('.video_box .jssc').click(JSSC);
// $("#pk10_hot.video_a").click(PK10);
// $("#cqSsc_hot.video_a").click(CQSSC);
// $("#pk10.video_a").click(PK10);
// $("#jisusc.video_a").click(PK10);
// $("#xyft.video_a").click(XYFT);
// $("#cqSsc.video_a").click(CQSSC);
// $("#jsssc.video_a").click(CQSSC);


$('#body_none').click(function(){
    $(this).hide();

    $("#bjpk10").hide()
    $("#jsssc_1").hide()
    $("#jssc").hide()
    $("#tjssc_1").hide()
    $("#cqssc_1").hide()
    $('#xyft_1').hide()
});


$('.video_box .v_right').click(function(){

  $('.video_box .video_box_ul').css({'position':'relative','left':'-236px'})

});
$('.video_box .v_left').click(function(){

    $('.video_box .video_box_ul').css({'position':'relative','left':' 0px'})
});

$('#new_zhao').click(function(){
    alert("尽请期待")
})









function typeOf(e, t) {
    if ("rank" == e) switch (1 * t) {
        case 1:
            return "冠军";
        case 2:
            return "亚军";
        case 3:
            return "第三名";
        case 4:
            return "第四名";
        case 5:
            return "第五名";
        case 6:
            return "第六名";
        case 7:
            return "第七名";
        case 8:
            return "第八名";
        case 9:
            return "第九名";
        case 10:
            return "第十名";
        case 11:
            return "冠亚和"

    } else if ("state" == e)switch (1 * t) {

        case 1:
            return "单双";
        case 2:
            return "大小";
        case 3:
            return "龙虎"

    } else if ("san" == e)switch (1 * t) {
        case 0:
            return "杂六";
        case 1:
            return "半顺";
        case 2:
            return "顺子";
        case 3:
            return "对子";
        case 4:
            return "豹子"

    } else if ("seafood" == e)switch (1 * t) {
        case 1:
            return "鱼";
        case 2:
            return "虾";
        case 3:
            return "葫芦";
        case 4:
            return "金钱";
        case 5:
            return "蟹";
        case 6:
            return "鸡"

    } else if ("Indxh" == e) switch (1 * t) {
        case 0:
            return "大";
        case 1:
            return "小";
        case 2:
            return "和"
    }
}

function isIE() {
    return !!(window.ActiveXObject || "ActiveXObject" in window)
}


function isIE() {
    return !!(window.ActiveXObject || "ActiveXObject" in window)
}

function openVdio(e) {
    lc = e, ifopen || ($("#videobox").animate({"z-index": "19999"}, 200, function () {
        $(".content").animate({
            bottom: "50%",
            right: "50%",
            width: "880px",
            height: "640px",
            "margin-bottom": "-298px"
        }, 500, function () {
            $(".big").hide(), $(".small").show(), $(".animate").height("575"), iframe(lc), isfirthload = !1
        })
    }), ifopen = !0)
}
// function iframe(e) {
//     var t = {
//         pk10: "PK10/video.html?10001",
//         cqssc: "SSC/index.html?10002",
//         tjssc: "SSC/index.html?10003",
//         xjssc: "SSC/index.html?10004",
//         jsssc: "jsssc/",
//         gdklsf: "GDklsf/index.html?10005",
//         sdsyydj: "11x5_video/index.html?10008",
//         gdsyxw: "11x5_video/index.html?10006",
//         jsksan: "kuai3_video/Kuai3.html?10007",
//         jisusc: "PK10/video.html?10037",
//         xingyft: "jisuft_video/index.html?10035",
//         tjklsf: "GDklsf/index.html?10034",
//         aozxy8: "GDklsf/index.html?10011",
//         zjef: "11x5_video/index.html?10025",
//         gxft: "kuai3_video/Kuai3.html?10026",
//         bjft: "kuai3_video/Kuai3.html?10033",
//         cqxync: "cqnc/index.html?10009",
//         pailie3: "fc3DVideo/index.html?10043",
//         fcsd: "fc3DVideo/index.html?10041",
//         gxklsf: "gxklsf_video/index.html?10038"
//     }, a = {
//         pk10: "北京PK10",
//         cqssc: "重庆时时彩",
//         tjssc: "天津时时彩",
//         xjssc: "新疆时时彩",
//         jsssc: "新疆时时彩",
//         gdklsf: "广东快乐十分",
//         sdsyydj: "十一运夺金",
//         gdsyxw: "广东11选5",
//         jsksan: "江苏快3",
//         jisusc: "极速赛车",
//         xingyft: "极速飞艇",
//         tjklsf: "天津快乐十分",
//         aozxy8: "澳洲幸运8",
//         zjef: "浙江11选5",
//         gxft: "广西快3",
//         bjft: "北京快3",
//         cqxync: "重庆幸运农场",
//         egxy28: "pc蛋蛋幸运28",
//         qxc: "体彩七星彩",
//         pailie3: "体彩排列3",
//         fcsd: "福彩3D",
//         gxklsf: "广西快乐十分"
//     };
//   //  $("#videobox").find("#vtitle").text(a[e]), $("#videoIframe").find("iframe").attr("src", "//kj.kai861.com/view/video/" + t[e])
// }


$(function () {
    // ajaxRequst("", "#pk10"), ajaxRequst("", "#pk10_hot"), ajaxRequst("", "#jisusc"), ajaxRequst("", "#xingyft"), ajaxRequst("", "#cqSsc"), ajaxRequst("", "#cqSsc_hot"), ajaxRequst("", "#tjSsc"), ajaxRequst("", "#jsssx"), ajaxRequst("", "#gdklsf"), ajaxRequst("", "#tjklsf"), ajaxRequst("", "#aozxy8"), ajaxRequst("", "#shiyix5_sd"), ajaxRequst("", "#shiyix5_sd_hot"), ajaxRequst("", "#shiyix5_gd"), ajaxRequst("", "#11ckeck5_zjef"), ajaxRequst("", "#kuai3"), ajaxRequst("", "#gxk3"), ajaxRequst("", "#bjk3"), ajaxRequst("", "#cqnc"), ajaxRequst("", "#fc3d"), ajaxRequst("", "#tcpl3"), ajaxRequst("", "#gxklsf"), ajaxRequst("", "#sdsyydj"),
    $("#gotop").click(function () {
        return $("body,html").animate({scrollTop: 0}, 500), $(this).hide(), !1
    }), $(document).scroll(function () {
        $(this).scrollTop() > 10 ? $("#gotop").show() : $("#gotop").hide()
    }), $("#bannernews").on("click", "p>a", function (e) {
        var t = {data: bannernews, funame: "checkRight()", programaId: " ", pageNo: 1, pageSize: 7};
        JSON.stringify(t), sessionStorage.setItem("sessData", JSON.stringify(t))
    }), $("#fanganyc").on("click", "li>a", function (e) {
        var t = {data: fanganyc, funame: "checkRight()", newAll: !0, pageNo: 1, pageSize: 10};
        JSON.stringify(t), sessionStorage.setItem("sessData", JSON.stringify(t))
    })
});

var publicUrl = config.publicUrl, imgUrl = config.imgUrl, indexObj = new Object, indextools = {}, bannernews = "", fanganyc = "";
indexObj.ajaGxklsf = function (e, t, a) {
    var e = void 0 == e ? "" : e, n = !1;
    $.ajax({
        url: publicUrl + "gdkl10/getGdkl10AwardData.do?" + Math.random(),

        type: "GET",
        data: {lotCode: t},
        timeout: 6e4,
        success: function (t) {
            try {
                var n = tools.parseObj(t);

                if ("100002" == n.result.businessCode)throw new Error("error");
                if (n = n.result.data, tools.operatorTime("" == n.drawTime ? "0" : n.drawTime, n.serverTime) <= 0)throw new Error("error");
                tools.countDown(n.drawTime, n.serverTime, a)
            } catch (t) {
                indextools.repeatAjax(e, a)
            }
        },
        error: function (t) {
            indextools.repeatAjax(e, a), n = !0
        },
        complete: function (t, i) {
            (n = !1) || "timeout" == i && setTimeout(function () {
                ajaxRequst(e, a)
            }, "1000")
        }
    })
}, indexObj.ajaxpk10 = function (e, t, a) {
    var e = void 0 == e ? "" : e, n = !1;
    $.ajax({
        url: publicUrl + "pks/getLotteryPksInfo.do?issue=" + e,
        type: "GET",
        data: {lotCode: t},
        timeout: 6e4,
        beforeSend: function () {
            void 0 == animateID[a] && animateMethod.pk10OpenAnimate_GaryAddIndex(a)
        },
        success: function (n) {
            try {
                indexObj.pk10Data(n, t, a), clearInterval(animateID[a]), delete animateID[a]
            } catch (t) {
                indextools.repeatAjax(e, a)
            }
        },
        error: function (t) {
            indextools.repeatAjax(e, a), n = !0
        },
        complete: function (t, i) {
            (n = !1) || "timeout" == i && setTimeout(function () {
                ajaxRequst(e, a)
            }, "1000")
        }
    })
}, indexObj.ajaxSsc = function (e, t, a) {
    var e = void 0 == e ? "" : e, n = !1;
    $.ajax({
        url: publicUrl + "CQShiCai/getBaseCQShiCai.do?issue=" + e,
        type: "GET",
        data: {lotCode: t},
        timeout: 6e4,
        beforeSend: function () {
            void 0 == animateID[a] && animateMethod.sscAnimate(a)
        },
        success: function (n) {
            try {
                indexObj.sscData(n, t, a), clearInterval(animateID[a]), delete animateID[a]
            } catch (t) {
                indextools.repeatAjax(e, a)
            }
        },
        error: function (t) {
            indextools.repeatAjax(e, a), n = !0
        },
        complete: function (t, i) {
            (n = !1) || "timeout" == i && setTimeout(function () {
                ajaxRequst(e, a)
            }, "1000")
        }
    })
}, indexObj.ajaxPCdd = function (e, t, a) {
    var e = void 0 == e ? "" : e, n = !1;
    $.ajax({
        url: urlbublic + "LuckTwenty/getPcLucky28.do?issue=" + e, type: "GET", beforeSend: function () {
            void 0 == animateID[a] && animateMethod.sscAnimate(a)
        }, success: function (n) {
            try {
                indexObj.creatDataHead(n, t, a), clearInterval(animateID[a]), delete animateID[a]
            } catch (t) {
                indextools.repeatAjax(e, a)
            }
        }, error: function (t) {
            indextools.repeatAjax(e, a), n = !0
        }, complete: function (t, i) {
            (n = !1) || "timeout" == i && setTimeout(function () {
                ajaxRequst(e, a)
            }, "1000")
        }
    })
}, indexObj.typeOf = function (e, t) {
    if ("dxh" == e)switch (1 * t) {
        case-1:
            return "小";
        case 0:
            return "和";
        case 1:
            return "大"
    } else if ("dsh" == e)switch (1 * t) {
        case-1:
            return "双";
        case 0:
            return "和";
        case 1:
            return "单"
    }
}, indexObj.creatDataHead = function (e, t, a) {
    var n = tools.parseObj(e);
    if ("100002" == n.result.businessCode)throw new Error("error");
    if (n = n.result.data, tools.operatorTime("" == n.drawTime ? "0" : n.drawTime, n.serverTime) <= 0)throw new Error("error");
    n.totalCount;
    var i = n.totalCount;
    $(a).find(".preDrawIssue").text(n.preDrawIssue), $(a).find(".drawCount").text(n.drawCount), $(a).find(".sdrawCountnext").text(1 * i - 1 * n.drawCount), $(a).find(".sumNum").text(n.sumNum), $(a).find(".sumBigSmall").text(indexObj.typeOf("dxh", n.sumBigSmall)), $(a).find(".sumSingleDouble").text(indexObj.typeOf("dsh", n.sumSingleDouble)), animateMethod.sscAnimateEnd(n.preDrawCode, a), tools.countDown(n.drawTime, n.serverTime, a)
}, indexObj.ajaxKlsf = function (e, t, a) {
    var e = void 0 == e ? "" : e, n = !1;
    $.ajax({
        url: publicUrl + "klsf/getLotteryInfo.do?issue=" + e,
        type: "GET",
        data: {lotCode: t},
        timeout: 6e4,
        beforeSend: function () {
            void 0 == animateID[a] && animateMethod.sscAnimate(a)
        },
        success: function (n) {
            try {
                indexObj.klsfData(n, t, a), clearInterval(animateID[a]), delete animateID[a]
            } catch (t) {
                indextools.repeatAjax(e, a)
            }
        },
        error: function (t) {
            indextools.repeatAjax(e, a), n = !0
        },
        complete: function (t, i) {
            (n = !1) || "timeout" == i && indextools.repeatAjax(e, a)
        }
    })
}, indexObj.ajaxCqnc = function (e, t, a) {
    var e = void 0 == e ? "" : e, n = !1;
    $.ajax({
        url: publicUrl + "klsf/getLotteryInfo.do?issue=" + e,
        type: "GET",
        data: {lotCode: t},
        timeout: 6e4,
        beforeSend: function () {
            void 0 == animateID[a] && animateMethod.cqncAnimate(a)
        },
        success: function (t) {
            try {
                indexObj.cqncData(t, a), clearInterval(animateID[a]), delete animateID[a]
            } catch (t) {
                indextools.repeatAjax(e, a)
            }
        },
        error: function (t) {
            indextools.repeatAjax(e, a), n = !0
        },
        complete: function (t, i) {
            (n = !1) || "timeout" == i && indextools.repeatAjax(e, a)
        }
    })
}, indexObj.ajaxKuai3 = function (e, t, a) {
    e = void 0 == e ? "" : e, $.ajax({
        url: publicUrl + "lotteryJSFastThree/getBaseJSFastThree.do?issue=" + e,
        type: "GET",
        data: {lotCode: t},
        timeout: 6e4,
        beforeSend: function () {
            void 0 == animateID[a] && animateMethod.kuai3Animate(a)
        },
        success: function (n) {
            try {
                indexObj.kuai3Data(n, t, a), clearInterval(animateID[a]), delete animateID[a]
            } catch (t) {
                indextools.repeatAjax(e, a)
            }
        },
        error: function (t) {
            indextools.repeatAjax(e, a), iferror = !0
        },
        complete: function (t, n) {
            iferror = !1, iferror || "timeout" == n && indextools.repeatAjax(e, a)
        }
    })
}, indexObj.shiyix5 = function (e, t, a) {
    var e = void 0 == e ? "" : e, n = !1;
    $.ajax({
        url: publicUrl + "ElevenFive/getElevenFiveInfo.do?issue=" + e,
        type: "GET",
        data: {lotCode: t},
        timeout: 6e4,
        beforeSend: function () {
            void 0 == animateID[a] && animateMethod.sscAnimate(a)
        },
        success: function (n) {
            try {
                indexObj.shiyix5Data(n, t, a), clearInterval(animateID[a]), delete animateID[a]
            } catch (t) {
                indextools.repeatAjax(e, a)
            }
        },
        error: function (t) {
            indextools.repeatAjax(e, a), n = !0
        },
        complete: function (t, i) {
            (n = !1) || "timeout" == i && indextools.repeatAjax(e, a)
        }
    })
}, indexObj.pk10Data = function (e, t, a) {
    var n = tools.parseObj(e);
    if ("100002" == n.result.businessCode)throw new Error("error");
    if (n = n.result.data, tools.operatorTime("" == n.drawTime ? "0" : n.drawTime, n.serverTime) <= 0)throw new Error("error");
    $(a).find(".opentyle").hide(), $(a).find(".cuttime").css({display: "inline-block"});
    var i = n.totalCount;
    $(a).find(".drawCount").text(n.drawCount), $(a).find(".sdrawCountnext").text(i - 1 * n.drawCount);
    $(a).find(".nextIssue").text();
    $(a).find(".nextIssue").text(n.drawIssue), $(a).find(".preDrawIssue").text(n.preDrawIssue), $("#drawCount1").text(n.drawCount), $("#sdrawCount1").text(i - 1 * n.drawCount);
    for (var o = "", r = 0, s = $(".longhu").find("td").length; r < s; r++)switch (r) {
        case 0:
            o += "<td>" + ("0" == n.firstDT ? "龙" : "虎") + "</td>";
            break;
        case 1:
            o += "<td>" + ("0" == n.secondDT ? "龙" : "虎") + "</td>";
            break;
        case 2:
            o += "<td>" + ("0" == n.thirdDT ? "龙" : "虎") + "</td>";
            break;
        case 3:
            o += "<td>" + ("0" == n.fourthDT ? "龙" : "虎") + "</td>";
            break;
        case 4:
            o += "<td>" + ("0" == n.fifthDT ? "龙" : "虎") + "</td>";
            break;
        case 5:
            o += "<td>" + n.sumFS + "</td>";
            break;
        case 6:
            o += "<td>" + ("0" == n.sumBigSamll ? "大" : "小") + "</td>";
            break;
        case 7:
            o += "<td>" + ("0" == n.sumSingleDouble ? "单" : "双") + "</td>"
    }
    $(".longhu").html(""), $(".longhu").append(o);
    var d = n.preDrawCode.split(",");
    tools.countDown(n.drawTime, n.serverTime, a), animateMethod.pk10end_GaryAddIndex(d, a)
},

    indexObj.sscData = function (e, t, a) {
        var n = tools.parseObj(e);
        if ("100002" == n.result.businessCode)throw new Error("error");
        if (n = n.result.data, tools.operatorTime("" == n.drawTime ? "0" : n.drawTime, n.serverTime) <= 0)throw new Error("error");
        var i = n.totalCount;
        $(a).find(".preDrawIssue").text(n.preDrawIssue), $(a).find(".nextIssue").text(n.drawIssue), $(a).find(".drawCount").text(n.drawCount), $(a).find(".sdrawCountnext").text(1 * i - 1 * n.drawCount), $(a).find(".sumNum").text(n.sumNum), $(a).find(".sumSingleDouble").text(0 == n.sumSingleDouble ? "单" : "双"), $(a).find(".sumBigSmall").text(0 == n.sumBigSmall ? "大" : "小");
        var o = "";
        "0" == n.dragonTiger ? o = "龙" : "1" == n.dragonTiger ? o = "虎" : "2" == n.dragonTiger && (o = "和"), $(a).find(".dragonTiger").text(o), $(a).find(".behindThree").text(typeOf("san", n.behindThree)), $(a).find(".betweenThree").text(typeOf("san", n.betweenThree)), $(a).find(".lastThree").text(typeOf("san", n.lastThree)), animateMethod.sscAnimateEnd(n.preDrawCode, a), tools.countDown(n.drawTime, n.serverTime, a)
    },

    indexObj.shiyix5Data = function (e, t, a) {
        var n = tools.parseObj(e);
        if ("100002" == n.result.businessCode)throw new Error("error");
        if (n = n.result.data, tools.operatorTime("" == n.drawTime ? "0" : n.drawTime, n.serverTime) <= 0)throw new Error("error");
        var i = n.totalCount;
        $(a).find(".preDrawIssue").text(n.preDrawIssue), $(a).find(".nextIssue").text(n.drawIssue), $(a).find(".drawCount").text(n.drawCount), $(a).find(".sdrawCountnext").text(1 * i - 1 * n.drawCount), $(a).find(".sumNum").text(n.sumNum), $(a).find(".sumSingleDouble").text(0 == n.sumSingleDouble ? "单" : "双"), $(a).find(".sumBigSmall").text(typeOf("Indxh", n.sumBigSmall));
        "0" == n.dragonTiger || ("1" == n.dragonTiger || n.dragonTiger), $(a).find(".behindThree").text(typeOf("san", n.behindThree)), $(a).find(".betweenThree").text(typeOf("san", n.betweenThree)), $(a).find(".lastThree").text(typeOf("san", n.lastThree));
        $(a).find(".nextIssue").text();
        animateMethod.sscAnimateEnd(n.preDrawCode, a), tools.countDown(n.drawTime, n.serverTime, a)
    }, indexObj.kuai3Data = function (e, t, a) {
    var n = tools.parseObj(e);
    if ("100002" == n.result.businessCode)throw new Error("error");
    if (n = n.result.data, tools.operatorTime("" == n.drawTime ? "0" : n.drawTime, n.serverTime) <= 0)throw new Error("error");
    var i = n.totalCount;
    $(a).find(".preDrawIssue").text(n.preDrawIssue), $(a).find(".nextIssue").text(n.drawIssue), $(a).find(".sumNum").text(n.sumNum), $(a).find(".sumSingleDouble").text(0 == n.sumSingleDouble ? "单" : "双"), $(a).find(".sumBigSmall").text(0 == n.sumBigSmall ? "大" : "小"), $(a).find(".firstSeafood").text(typeOf("seafood", n.firstSeafood)), $(a).find(".secondSeafood").text(typeOf("seafood", n.secondSeafood)), $(a).find(".thirdSeafood").text(typeOf("seafood", n.thirdSeafood)), $(a).find(".drawCount").text(n.drawCount), $(a).find(".sdrawCount").text(i - 1 * n.drawCount);
    $(a).find(".dragonTiger").text(""), animateMethod.kuai3AnimateEnd(n.preDrawCode, a), tools.countDown(n.drawTime, n.serverTime, a)
}, indexObj.klsfData = function (e, t, a) {
    var n = tools.parseObj(e);
    if ("100002" == n.result.businessCode)throw new Error("error");
    if (n = n.result.data, tools.operatorTime("" == n.drawTime ? "0" : n.drawTime, n.serverTime) <= 0)throw new Error("error");
    var i = n.totalCount;
    $(a).find(".preDrawIssue").text(n.preDrawIssue), $(a).find(".nextIssue").text(n.drawIssue), $(a).find(".drawCount").text(n.drawCount), $(a).find(".sdrawCountnext").text(1 * i - 1 * n.drawCount), $(a).find(".sumNum").text(n.sumNum), $(a).find(".sumSingleDouble").text(0 == n.sumSingleDouble ? "单" : "双"), $(a).find(".sumBigSmall").text(typeOf("Indxh", n.sumBigSmall)), $(a).find(".lastBigSmall").text(0 == n.lastBigSmall ? "尾大" : "尾小");
    "0" == n.dragonTiger || ("1" == n.dragonTiger || n.dragonTiger), $(a).find(".firstDragonTiger").text(0 == n.firstDragonTiger ? "龙" : "虎"), $(a).find(".secondDragonTiger").text(0 == n.secondDragonTiger ? "龙" : "虎"), $(a).find(".thirdDragonTiger").text(0 == n.thirdDragonTiger ? "龙" : "虎"), $(a).find(".fourthDragonTiger").text(0 == n.fourthDragonTiger ? "龙" : "虎"), $(a).find(".numblue").each(function () {
        $(this).text() >= 19 && $(this).addClass("numred")
    }), animateMethod.sscAnimateEnd(n.preDrawCode, a), tools.countDown(n.drawTime, n.serverTime, a)
}, indexObj.cqncData = function (e, t) {
    var a = tools.parseObj(e);
    if ("100002" == a.result.businessCode)throw new Error("error");
    if (a = a.result.data, tools.operatorTime("" == a.drawTime ? "0" : a.drawTime, a.serverTime) <= 0)throw new Error("error");
    $(t).find(".preDrawIssue").text(a.preDrawIssue), $(t).find(".nextIssue").text(a.drawIssue), $(t).find(".drawCount").text(a.drawCount), $(t).find(".sdrawCountnext").text(84 - 1 * a.drawCount), $(t).find(".sumNum").text(a.sumNum), $(t).find(".sumSingleDouble").text(0 == a.sumSingleDouble ? "单" : "双"), $(t).find(".sumBigSmall").text(0 == a.sumBigSmall ? "大" : "小"), $(t).find(".lastBigSmall").text(0 == a.lastBigSmall ? "尾大" : "尾小");
    "0" == a.dragonTiger || ("1" == a.dragonTiger || a.dragonTiger), $(t).find(".firstDragonTiger").text(0 == a.firstDragonTiger ? "龙" : "虎"), $(t).find(".secondDragonTiger").text(0 == a.secondDragonTiger ? "龙" : "虎"), $(t).find(".thirdDragonTiger").text(0 == a.thirdDragonTiger ? "龙" : "虎"), $(t).find(".fourthDragonTiger").text(0 == a.fourthDragonTiger ? "龙" : "虎"), clearInterval(animateID[t]), animateMethod.cqncAnimateEnd_GaryAddNotUl(a.preDrawCode, t), tools.countDown(a.drawTime, a.serverTime, t), $(t).find(".opentyle").hide(), $(t).find(".cuttime").css({display: "inline-block"})
}, indexObj.ajaxTcpl3 = function (e, t, a) {
    var n = !1;
    $.ajax({
        url: config.publicUrl + "QuanGuoCai/getLotteryInfo1.do?issue=" + e,
        type: "GET",
        data: {lotCode: t},
        beforeSend: function () {
            void 0 == animateID[a] && animateMethod.sscAnimate(a)
        },
        success: function (t) {
            try {
                indexObj.insertHeadQGC(t, a), clearInterval(animateID[a]), delete animateID[a]
            } catch (t) {
                setTimeout(function () {
                    indextools.repeatAjax(e, a)
                }, "1000")
            }
        },
        error: function (t) {
            setTimeout(function () {
                indextools.repeatAjax(e, a)
            }, "1000"), n = !0
        },
        complete: function (e, t) {
            (n = !1) || "timeout" == t && setTimeout(function () {
                ajaxRequst(a)
            }, "1000")
        }
    })
}, indexObj.insertHeadQGC = function (e, t) {
    var a = tools.parseObj(e);
    if ("100002" == a.result.businessCode)throw new Error("error");
    if (a = a.result.data, tools.operatorTime("" == a.drawTime ? "0" : a.drawTime, a.serverTime) <= 0)throw new Error("error");
    a.totalCount;
    $(t).find(".preDrawIssue").text(a.preDrawIssue), $(t).find(".nextIssue").text(a.drawIssue), tools.countDown(a.drawTime, a.serverTime, t), animateMethod.sscAnimateEnd(a.preDrawCode, t), toolBoxs.resetRed(t), $("#waringbox").hide(300);
    var n = "<td style='color:#a91818'>" + a.sumHundredTen + "</td><td>" + (0 == a.htSingleDouble ? "单" : "双") + "</td><td>" + (0 == a.httailBigSmall ? "尾大" : "尾小") + "</td>";
    n += "<td style='color:#a91818'>" + a.sumHundredOne + "</td><td>" + (0 == a.hoSingleDouble ? "单" : "双") + "</td><td>" + (0 == a.hotailBigSmall ? "尾大" : "尾小") + "</td>", n += "<td style='color:#a91818'>" + a.sumTenOne + "</td><td>" + (0 == a.toSingleDouble ? "单" : "双") + "</td><td>" + (0 == a.totailBigSmall ? "尾大" : "尾小") + "</td>", n += "<td style='color:#a91818'>" + a.sumNum + "</td><td>" + (0 == a.sumSingleDouble ? "单" : "双") + "</td><td>" + (0 == a.sumBigSmall ? "大" : "小") + "</td>", $(t).find(".tabTr").html(n)
}, indexObj.loadBannerNews = function () {
    $.ajax({
        url: publicUrl + "news/findNewestHPNews.do",
        type: "GET",
        data: {limit: config.newRows},
        dataType: "json",
        timeout: 6e4,
        beforeSend: function () {
            $("#bannernews").empty().text("正在加载...")
        },
        success: function (e) {
            if ("object" == typeof(e = e) || (e = JSON.parse(e)), "0" == e.errorCode)if ("0" == e.result.businessCode) {
                $("#bannernews").empty();
                var t = "";
                bannernews = e.result.data, $(e.result.data).each(function () {
                    t += "<p><a target='_blank' href='/view/news/zx_detail.html?" + this.newsId + "'>" + this.title + "</a></p>"
                }), $("#bannernews").append(t)
            } else $("#bannernews").empty().text("数据加载异常！")
        },
        error: function (e) {
            $("#bannernews").empty().text("正在加载..."), indexObj.loadBannerNews()
        },
        complete: function (e, t) {
            null
        }
    })
}, indexObj.loadFangAanNews = function () {
    $.ajax({
        url: publicUrl + "news/findProjectPrediction.do",
        type: "GET",
        dataType: "json",
        data: {programaId: "", pageNo: 1, pageSize: 10},
        timeout: 6e4,
        beforeSend: function () {
            $("#fanganyc").empty().text("正在加载...")
        },
        success: function (e) {
            if ("object" == typeof(e = e) || (e = JSON.parse(e)), "0" == e.errorCode)if ("0" == e.result.businessCode) {
                $("#fanganyc").empty();
                var t = "";
                fanganyc = e.result.data.list, $(e.result.data.list).each(function () {
                    t += "<li><a target='_blank' href='/view/news/zx_detail.html?" + this.newsId + "'>" + this.title + "</a></li>"
                }), $("#fanganyc").append(t)
            } else $("#fanganyc").empty().text("数据加载异常！")
        },
        error: function (e) {
            $("#fanganyc").empty().text("正在加载..."), indexObj.loadFangAanNews()
        },
        complete: function (e, t) {
            null
        }
    })
}, indexObj.loadBanner = function () {
    $.ajax({
        url: publicUrl + "focusPicture/findPicture.do",
        type: "GET",
        dataType: "json",
        data: {type: "0", position: "0", sourceUrl: tools.YM()},
        timeout: 6e4,
        beforeSend: function () {
            $("#bannerContent").text("努力加载中...")
        },
        success: function (e) {
            "object" == typeof(e = e) || (e = JSON.parse(e)), "0" == e.errorCode && ("0" == e.result.businessCode ? tools.bannerImg(e.result.data) : $("#bannerContent").empty().text("数据加载异常！"))
        },
        error: function (e) {
            $("#bannerContent").empty().text("正在加载..."), setTimeout(indexObj.loadBanner(), 1e3)
        },
        complete: function (e, t) {
            null
        }
    })
}, indexObj.defaultViewigm = function (e) {
    $(e).attr("src", "img/banner/banner01.jpg"), $(e).parent().css({"background-color": "#d70042"})
}, indextools.repeatAjax = function (e, t) {
    setTimeout(function () {
        ajaxRequst(e, t)
    }, "1000")
}, indextools.LiText = function () {
    "block" == $(".check5_ran").css("display") && $(".check_zhuOrXa").text($(".check5_ran>.check_ran").text())
};
var canLeft = 0, canRight = "default", vlength = 0, viewCount = 2, defWidth = 167, moveLeft = 0;
indextools.videoMove = function (e) {
    if ((vlength = $(".video_box>ul>li").length) <= 5)return !1;
    if ("default" == canRight && (canRight = vlength - 5), canLeft && "v_left" == e)canLeft - viewCount >= 0 ? (moveLeft = defWidth * viewCount, canLeft -= viewCount, canRight += viewCount) : (moveLeft = defWidth * canLeft, canRight += canLeft, canLeft = 0); else {
        if (!canRight || "v_right" != e)return !1;
    }

    indexObj.ajaxpk10 = function (e, t, a) {
        var e = void 0 == e ? "" : e, n = !1;
        $.ajax({
            url: publicUrl + "pk10/getPk10AwardData.do?" + Math.random(),
            type: "GET",
            data: {lotCode: t},
            timeout: 6e4,
            beforeSend: function () {
                void 0 == animateID[a] && animateMethod.pk10OpenAnimate_GaryAddIndex(a)
            },
            success: function (n) {
                try {
                    indexObj.pk10Data(n, t, a), clearInterval(animateID[a]), delete animateID[a]
                } catch (t) {
                    indextools.repeatAjax(e, a)
                }
            },
            error: function (t) {
                indextools.repeatAjax(e, a), n = !0
            },
            complete: function (t, i) {
                (n = !1) || "timeout" == i && setTimeout(function () {
                    ajaxRequst(e, a)
                }, "1000")
            }
        })
    },

        indexObj.ajaxSsc = function (e, t, a) {
            var e = void 0 == e ? "" : e, n = !1;
            $.ajax({
                url: publicUrl + "cqssc/getCqsscAwardData.do?" + Math.random(),
                type: "GET",
                data: {lotCode: t},
                timeout: 6e4,
                beforeSend: function () {
                    void 0 == animateID[a] && animateMethod.sscAnimate(a)
                },
                success: function (n) {
                    try {
                        indexObj.sscData(n, t, a), clearInterval(animateID[a]), delete animateID[a]
                    } catch (t) {
                        indextools.repeatAjax(e, a)
                    }
                },
                error: function (t) {
                    indextools.repeatAjax(e, a), n = !0
                },
                complete: function (t, i) {
                    (n = !1) || "timeout" == i && setTimeout(function () {
                        ajaxRequst(e, a)
                    }, "1000")
                }
            })
        },

        indexObj.ajaxPCdd = function (e, t, a) {
            var e = void 0 == e ? "" : e, n = !1;
            $.ajax({
                url: urlbublic + "LuckTwenty/getPcLucky28.do?issue=" + e, type: "GET", beforeSend: function () {
                    void 0 == animateID[a] && animateMethod.sscAnimate(a)
                }, success: function (n) {
                    try {
                        indexObj.creatDataHead(n, t, a), clearInterval(animateID[a]), delete animateID[a]
                    } catch (t) {
                        indextools.repeatAjax(e, a)
                    }
                }, error: function (t) {
                    indextools.repeatAjax(e, a), n = !0
                }, complete: function (t, i) {
                    (n = !1) || "timeout" == i && setTimeout(function () {
                        ajaxRequst(e, a)
                    }, "1000")
                }
            })
        },

        indexObj.typeOf = function (e, t) {
            if ("dxh" == e) switch (1 * t) {
                case-1:
                    return "小";
                case 0:
                    return "和";
                case 1:
                    return "大"
            } else if ("dsh" == e) switch (1 * t) {
                case-1:
                    return "双";
                case 0:
                    return "和";
                case 1:
                    return "单"
            }
        },

        indexObj.creatDataHead = function (e, t, a) {
            var n = tools.parseObj(e);
            if ("100002" == n.result.businessCode) throw new Error("error");
            if (n = n.result.data, tools.operatorTime("" == n.drawTime ? "0" : n.drawTime, n.serverTime) <= 0) throw new Error("error");
            n.totalCount;
            var i = n.totalCount;
            $(a).find(".preDrawIssue").text(n.preDrawIssue), $(a).find(".drawCount").text(n.drawCount), $(a).find(".sdrawCountnext").text(1 * i - 1 * n.drawCount), $(a).find(".sumNum").text(n.sumNum), $(a).find(".sumBigSmall").text(indexObj.typeOf("dxh", n.sumBigSmall)), $(a).find(".sumSingleDouble").text(indexObj.typeOf("dsh", n.sumSingleDouble)), animateMethod.sscAnimateEnd(n.current.awardNumbers, a), tools.countDown(n.drawTime, n.serverTime, a)
        },

        indexObj.ajaxKlsf = function (e, t, a) {
            var e = void 0 == e ? "" : e, n = !1;
            $.ajax({
                url: publicUrl + "klsf/getLotteryInfo.do?issue=" + e,
                type: "GET",
                data: {lotCode: t},
                timeout: 6e4,
                beforeSend: function () {
                    void 0 == animateID[a] && animateMethod.sscAnimate(a)
                },
                success: function (n) {
                    try {
                        indexObj.klsfData(n, t, a), clearInterval(animateID[a]), delete animateID[a]
                    } catch (t) {
                        indextools.repeatAjax(e, a)
                    }
                },
                error: function (t) {
                    indextools.repeatAjax(e, a), n = !0
                },
                complete: function (t, i) {
                    (n = !1) || "timeout" == i && indextools.repeatAjax(e, a)
                }
            })
        },

        indexObj.ajaxCqnc = function (e, t, a) {
            var e = void 0 == e ? "" : e, n = !1;
            $.ajax({
                url: publicUrl + "klsf/getLotteryInfo.do?issue=" + e,
                type: "GET",
                data: {lotCode: t},
                timeout: 6e4,
                beforeSend: function () {
                    void 0 == animateID[a] && animateMethod.cqncAnimate(a)
                },
                success: function (t) {
                    try {
                        indexObj.cqncData(t, a), clearInterval(animateID[a]), delete animateID[a]
                    } catch (t) {
                        indextools.repeatAjax(e, a)
                    }
                },
                error: function (t) {
                    indextools.repeatAjax(e, a), n = !0
                },
                complete: function (t, i) {
                    (n = !1) || "timeout" == i && indextools.repeatAjax(e, a)
                }
            })
        },

        indexObj.ajaxKuai3 = function (e, t, a) {
            e = void 0 == e ? "" : e, $.ajax({
                url: publicUrl + "lotteryJSFastThree/getBaseJSFastThree.do?issue=" + e,//jsks
                type: "GET",
                data: {lotCode: t},
                timeout: 6e4,
                beforeSend: function () {
                    void 0 == animateID[a] && animateMethod.kuai3Animate(a)
                },
                success: function (n) {
                    try {
                        indexObj.kuai3Data(n, t, a), clearInterval(animateID[a]), delete animateID[a]
                    } catch (t) {
                        indextools.repeatAjax(e, a)
                    }
                },
                error: function (t) {
                    indextools.repeatAjax(e, a), iferror = !0
                },
                complete: function (t, n) {
                    iferror = !1, iferror || "timeout" == n && indextools.repeatAjax(e, a)
                }
            })
        },

        indexObj.shiyix5 = function (e, t, a) {
            var e = void 0 == e ? "" : e, n = !1;
            $.ajax({
                url: publicUrl + "ElevenFive/getElevenFiveInfo.do?issue=" + e,
                type: "GET",
                data: {lotCode: t},
                timeout: 6e4,
                beforeSend: function () {
                    void 0 == animateID[a] && animateMethod.sscAnimate(a)
                },
                success: function (n) {
                    try {
                        indexObj.shiyix5Data(n, t, a), clearInterval(animateID[a]), delete animateID[a]
                    } catch (t) {
                        indextools.repeatAjax(e, a)
                    }
                },
                error: function (t) {
                    indextools.repeatAjax(e, a), n = !0
                },
                complete: function (t, i) {
                    (n = !1) || "timeout" == i && indextools.repeatAjax(e, a)
                }
            })
        },

        indexObj.pk10Data = function (e, t, a) {
            var n = tools.parseObj(e);
            // console.log(n);
            //   if ("100002" == n.result.businessCode) throw new Error("error");
            // if (n = n.result.data, tools.operatorTime("" == n.time ? "0" : n.time, n.time) <= 0) throw new Error("error");
            $(a).find(".opentyle").hide(), $(a).find(".cuttime").css({display: "inline-block"});
            var i = n.totalCount;
            cpNumber = n.current.periodNumber;
            $(a).find(".drawCount").text(n.current.periodNumber), $(a).find(".sdrawCountnext").text(n.firstPeriod + 179 - cpNumber);
            $(a).find(".nextIssue").text();
            $(a).find(".nextIssue").text(n.next.periodNumber), $(a).find(".preDrawIssue").text(n.current.fullPeriodNumber), $("#drawCount1").text(n.drawCount), $("#sdrawCount1").text(i - 1 * n.drawCount);
            for (var o = "", r = 0, s = $(".longhu").find("td").length; r < s; r++) switch (r) {
                case 0:
                    o += "<td>" + ("0" == n.firstDT ? "龙" : "虎") + "</td>";
                    break;
                case 1:
                    o += "<td>" + ("0" == n.secondDT ? "龙" : "虎") + "</td>";
                    break;
                case 2:
                    o += "<td>" + ("0" == n.thirdDT ? "龙" : "虎") + "</td>";
                    break;
                case 3:
                    o += "<td>" + ("0" == n.fourthDT ? "龙" : "虎") + "</td>";
                    break;
                case 4:
                    o += "<td>" + ("0" == n.fifthDT ? "龙" : "虎") + "</td>";
                    break;
                case 5:
                    o += "<td>" + n.sumFS + "</td>";
                    break;
                case 6:
                    o += "<td>" + ("0" == n.sumBigSamll ? "大" : "小") + "</td>";
                    break;
                case 7:
                    o += "<td>" + ("0" == n.sumSingleDouble ? "单" : "双") + "</td>"
            }
            $(".longhu").html(""), $(".longhu").append(o);
            var d = n.current.awardNumbers.split(",");
            tools.countDown(n.drawTime, n.serverTime, a), animateMethod.pk10end_GaryAddIndex(d, a)
        },

        indexObj.sscData = function (e, t, a) {
            var n = tools.parseObj(e);
            if ("100002" == n.result.businessCode) throw new Error("error");
            if (n = n.result.data, tools.operatorTime("" == n.drawTime ? "0" : n.drawTime, n.serverTime) <= 0) throw new Error("error");
            var i = n.totalCount;
            $(a).find(".preDrawIssue").text(n.preDrawIssue), $(a).find(".nextIssue").text(n.drawIssue), $(a).find(".drawCount").text(n.drawCount), $(a).find(".sdrawCountnext").text(1 * i - 1 * n.drawCount), $(a).find(".sumNum").text(n.sumNum), $(a).find(".sumSingleDouble").text(0 == n.sumSingleDouble ? "单" : "双"), $(a).find(".sumBigSmall").text(0 == n.sumBigSmall ? "大" : "小");
            var o = "";
            "0" == n.dragonTiger ? o = "龙" : "1" == n.dragonTiger ? o = "虎" : "2" == n.dragonTiger && (o = "和"), $(a).find(".dragonTiger").text(o), $(a).find(".behindThree").text(typeOf("san", n.behindThree)), $(a).find(".betweenThree").text(typeOf("san", n.betweenThree)), $(a).find(".lastThree").text(typeOf("san", n.lastThree)), animateMethod.sscAnimateEnd(n.current.awardNumbers, a), tools.countDown(n.drawTime, n.serverTime, a)
        },

        indexObj.shiyix5Data = function (e, t, a) {
            var n = tools.parseObj(e);
            if ("100002" == n.result.businessCode) throw new Error("error");
            if (n = n.result.data, tools.operatorTime("" == n.drawTime ? "0" : n.drawTime, n.serverTime) <= 0) throw new Error("error");
            var i = n.totalCount;
            $(a).find(".preDrawIssue").text(n.preDrawIssue), $(a).find(".nextIssue").text(n.drawIssue), $(a).find(".drawCount").text(n.drawCount), $(a).find(".sdrawCountnext").text(1 * i - 1 * n.drawCount), $(a).find(".sumNum").text(n.sumNum), $(a).find(".sumSingleDouble").text(0 == n.sumSingleDouble ? "单" : "双"), $(a).find(".sumBigSmall").text(typeOf("Indxh", n.sumBigSmall));
            "0" == n.dragonTiger || ("1" == n.dragonTiger || n.dragonTiger), $(a).find(".behindThree").text(typeOf("san", n.behindThree)), $(a).find(".betweenThree").text(typeOf("san", n.betweenThree)), $(a).find(".lastThree").text(typeOf("san", n.lastThree));
            $(a).find(".nextIssue").text();
            animateMethod.sscAnimateEnd(n.current.awardNumbers, a), tools.countDown(n.drawTime, n.serverTime, a)
        },

        indexObj.kuai3Data = function (e, t, a) {
            var n = tools.parseObj(e);
            if ("100002" == n.result.businessCode) throw new Error("error");
            if (n = n.result.data, tools.operatorTime("" == n.drawTime ? "0" : n.drawTime, n.serverTime) <= 0) throw new Error("error");
            var i = n.totalCount;
            $(a).find(".preDrawIssue").text(n.preDrawIssue), $(a).find(".nextIssue").text(n.drawIssue), $(a).find(".sumNum").text(n.sumNum), $(a).find(".sumSingleDouble").text(0 == n.sumSingleDouble ? "单" : "双"), $(a).find(".sumBigSmall").text(0 == n.sumBigSmall ? "大" : "小"), $(a).find(".firstSeafood").text(typeOf("seafood", n.firstSeafood)), $(a).find(".secondSeafood").text(typeOf("seafood", n.secondSeafood)), $(a).find(".thirdSeafood").text(typeOf("seafood", n.thirdSeafood)), $(a).find(".drawCount").text(n.drawCount), $(a).find(".sdrawCount").text(i - 1 * n.drawCount);
            $(a).find(".dragonTiger").text(""), animateMethod.kuai3AnimateEnd(n.current.awardNumbers, a), tools.countDown(n.drawTime, n.serverTime, a)
        },

        indexObj.klsfData = function (e, t, a) {
            var n = tools.parseObj(e);
            if ("100002" == n.result.businessCode) throw new Error("error");
            if (n = n.result.data, tools.operatorTime("" == n.drawTime ? "0" : n.drawTime, n.serverTime) <= 0) throw new Error("error");
            var i = n.totalCount;
            $(a).find(".preDrawIssue").text(n.preDrawIssue), $(a).find(".nextIssue").text(n.drawIssue), $(a).find(".drawCount").text(n.drawCount), $(a).find(".sdrawCountnext").text(1 * i - 1 * n.drawCount), $(a).find(".sumNum").text(n.sumNum), $(a).find(".sumSingleDouble").text(0 == n.sumSingleDouble ? "单" : "双"), $(a).find(".sumBigSmall").text(typeOf("Indxh", n.sumBigSmall)), $(a).find(".lastBigSmall").text(0 == n.lastBigSmall ? "尾大" : "尾小");
            "0" == n.dragonTiger || ("1" == n.dragonTiger || n.dragonTiger), $(a).find(".firstDragonTiger").text(0 == n.firstDragonTiger ? "龙" : "虎"), $(a).find(".secondDragonTiger").text(0 == n.secondDragonTiger ? "龙" : "虎"), $(a).find(".thirdDragonTiger").text(0 == n.thirdDragonTiger ? "龙" : "虎"), $(a).find(".fourthDragonTiger").text(0 == n.fourthDragonTiger ? "龙" : "虎"), $(a).find(".numblue").each(function () {
                $(this).text() >= 19 && $(this).addClass("numred")
            }), animateMethod.sscAnimateEnd(n.current.awardNumbers, a), tools.countDown(n.drawTime, n.serverTime, a)
        },

        indexObj.cqncData = function (e, t) {
            var a = tools.parseObj(e);
            if ("100002" == a.result.businessCode) throw new Error("error");
            if (a = a.result.data, tools.operatorTime("" == a.drawTime ? "0" : a.drawTime, a.serverTime) <= 0) throw new Error("error");
            $(t).find(".preDrawIssue").text(a.preDrawIssue), $(t).find(".nextIssue").text(a.drawIssue), $(t).find(".drawCount").text(a.drawCount), $(t).find(".sdrawCountnext").text(84 - 1 * a.drawCount), $(t).find(".sumNum").text(a.sumNum), $(t).find(".sumSingleDouble").text(0 == a.sumSingleDouble ? "单" : "双"), $(t).find(".sumBigSmall").text(0 == a.sumBigSmall ? "大" : "小"), $(t).find(".lastBigSmall").text(0 == a.lastBigSmall ? "尾大" : "尾小");
            "0" == a.dragonTiger || ("1" == a.dragonTiger || a.dragonTiger), $(t).find(".firstDragonTiger").text(0 == a.firstDragonTiger ? "龙" : "虎"), $(t).find(".secondDragonTiger").text(0 == a.secondDragonTiger ? "龙" : "虎"), $(t).find(".thirdDragonTiger").text(0 == a.thirdDragonTiger ? "龙" : "虎"), $(t).find(".fourthDragonTiger").text(0 == a.fourthDragonTiger ? "龙" : "虎"), clearInterval(animateID[t]), animateMethod.cqncAnimateEnd_GaryAddNotUl(a.current.awardNumbers, t), tools.countDown(a.drawTime, a.serverTime, t), $(t).find(".opentyle").hide(), $(t).find(".cuttime").css({display: "inline-block"})
        },

        indexObj.ajaxTcpl3 = function (e, t, a) {
            var n = !1;
            $.ajax({
                url: config.publicUrl + "QuanGuoCai/getLotteryInfo1.do?issue=" + e,
                type: "GET",
                data: {lotCode: t},
                beforeSend: function () {
                    void 0 == animateID[a] && animateMethod.sscAnimate(a)
                },
                success: function (t) {
                    try {
                        indexObj.insertHeadQGC(t, a), clearInterval(animateID[a]), delete animateID[a]
                    } catch (t) {
                        setTimeout(function () {
                            indextools.repeatAjax(e, a)
                        }, "1000")
                    }
                },
                error: function (t) {
                    setTimeout(function () {
                        indextools.repeatAjax(e, a)
                    }, "1000"), n = !0
                },
                complete: function (e, t) {
                    (n = !1) || "timeout" == t && setTimeout(function () {
                        ajaxRequst(a)
                    }, "1000")
                }
            })
        },

        indexObj.insertHeadQGC = function (e, t) {
            var a = tools.parseObj(e);
            if ("100002" == a.result.businessCode) throw new Error("error");
            if (a = a.result.data, tools.operatorTime("" == a.drawTime ? "0" : a.drawTime, a.serverTime) <= 0) throw new Error("error");
            a.totalCount;
            $(t).find(".preDrawIssue").text(a.preDrawIssue), $(t).find(".nextIssue").text(a.drawIssue), tools.countDown(a.drawTime, a.serverTime, t), animateMethod.sscAnimateEnd(a.current.awardNumbers, t), toolBoxs.resetRed(t), $("#waringbox").hide(300);
            var n = "<td style='color:#a91818'>" + a.sumHundredTen + "</td><td>" + (0 == a.htSingleDouble ? "单" : "双") + "</td><td>" + (0 == a.httailBigSmall ? "尾大" : "尾小") + "</td>";
            n += "<td style='color:#a91818'>" + a.sumHundredOne + "</td><td>" + (0 == a.hoSingleDouble ? "单" : "双") + "</td><td>" + (0 == a.hotailBigSmall ? "尾大" : "尾小") + "</td>", n += "<td style='color:#a91818'>" + a.sumTenOne + "</td><td>" + (0 == a.toSingleDouble ? "单" : "双") + "</td><td>" + (0 == a.totailBigSmall ? "尾大" : "尾小") + "</td>", n += "<td style='color:#a91818'>" + a.sumNum + "</td><td>" + (0 == a.sumSingleDouble ? "单" : "双") + "</td><td>" + (0 == a.sumBigSmall ? "大" : "小") + "</td>", $(t).find(".tabTr").html(n)
        },

        indexObj.loadBannerNews = function () {
            $.ajax({
                url: publicUrl + "news/findNewestHPNews.do",
                type: "GET",
                data: {limit: config.newRows},
                dataType: "json",
                timeout: 6e4,
                beforeSend: function () {
                    $("#bannernews").empty().text("正在加载...")
                },
                success: function (e) {
                    if ("object" == typeof(e = e) || (e = JSON.parse(e)), "0" == e.errorCode) if ("0" == e.result.businessCode) {
                        $("#bannernews").empty();
                        var t = "";
                        bannernews = e.result.data, $(e.result.data).each(function () {
                            t += "<p><a target='_blank' href='/view/news/zx_detail.html?" + this.newsId + "'>" + this.title + "</a></p>"
                        }), $("#bannernews").append(t)
                    } else $("#bannernews").empty().text("数据加载异常！")
                },
                error: function (e) {
                    $("#bannernews").empty().text("正在加载..."), indexObj.loadBannerNews()
                },
                complete: function (e, t) {
                    null
                }
            })
        },

        indexObj.loadFangAanNews = function () {
            $.ajax({
                url: publicUrl + "news/findProjectPrediction.do",
                type: "GET",
                dataType: "json",
                data: {programaId: "", pageNo: 1, pageSize: 10},
                timeout: 6e4,
                beforeSend: function () {
                    $("#fanganyc").empty().text("正在加载...")
                },
                success: function (e) {
                    if ("object" == typeof(e = e) || (e = JSON.parse(e)), "0" == e.errorCode) if ("0" == e.result.businessCode) {
                        $("#fanganyc").empty();
                        var t = "";
                        fanganyc = e.result.data.list, $(e.result.data.list).each(function () {
                            t += "<li><a target='_blank' href='/view/news/zx_detail.html?" + this.newsId + "'>" + this.title + "</a></li>"
                        }), $("#fanganyc").append(t)
                    } else $("#fanganyc").empty().text("数据加载异常！")
                },
                error: function (e) {
                    $("#fanganyc").empty().text("正在加载..."), indexObj.loadFangAanNews()
                },
                complete: function (e, t) {
                    null
                }
            })
        },

        indexObj.loadBanner = function () {
            $.ajax({
                url: publicUrl + "focusPicture/findPicture.do",
                type: "GET",
                dataType: "json",
                data: {type: "0", position: "0", sourceUrl: tools.YM()},
                timeout: 6e4,
                beforeSend: function () {
                    $("#bannerContent").text("努力加载中...")
                },
                success: function (e) {
                    "object" == typeof(e = e) || (e = JSON.parse(e)), "0" == e.errorCode && ("0" == e.result.businessCode ? tools.bannerImg(e.result.data) : $("#bannerContent").empty().text("数据加载异常！"))
                },
                error: function (e) {
                    $("#bannerContent").empty().text("正在加载..."), setTimeout(indexObj.loadBanner(), 1e3)
                },
                complete: function (e, t) {
                    null
                }
            })
        },

        indexObj.defaultViewigm = function (e) {
            $(e).attr("src", "img/banner/banner01.jpg"), $(e).parent().css({"background-color": "#d70042"})
        },

        indextools.repeatAjax = function (e, t) {
            setTimeout(function () {
                ajaxRequst(e, t)
            }, "1000")
        },

        indextools.LiText = function () {
            "block" == $(".check5_ran").css("display") && $(".check_zhuOrXa").text($(".check5_ran>.check_ran").text())
        };

    var canLeft = 0, canRight = "default", vlength = 0, viewCount = 2, defWidth = 167, moveLeft = 0;

    indextools.videoMove = function (e) {
        if ((vlength = $(".video_box>ul>li").length) <= 5) return !1;
        if ("default" == canRight && (canRight = vlength - 5), canLeft && "v_left" == e) canLeft - viewCount >= 0 ? (moveLeft = defWidth * viewCount, canLeft -= viewCount, canRight += viewCount) : (moveLeft = defWidth * canLeft, canRight += canLeft, canLeft = 0); else {
            if (!canRight || "v_right" != e) return !1;
            canRight - viewCount >= 0 ? (moveLeft = defWidth * viewCount * -1, canRight -= viewCount, canLeft += viewCount) : (moveLeft = -1 * defWidth * canRight, canLeft += canRight, canRight = 0)
        }
        var t = 1 * $(".video_box>ul").css("left").replace("px", "");
        $(".video_box>ul").css("left", t + moveLeft + "px"),
            0 == canLeft ? $(".v_left").addClass("v_opacity") : $(".v_left").removeClass("v_opacity"),
            0 == canRight ? $(".v_right").addClass("v_opacity") : $(".v_right").removeClass("v_opacity")

    }, $(".video_box").on("click", "span", function () {
        indextools.videoMove($(this).attr("class"))
    }), $(".lottey_title").on("click", "li", function () {
        var e = $(this).addClass("check").attr("data-text");
        $(this).siblings(".check").removeClass("check"), $(e).siblings().css("height", 0), $(e).css({
            height: "650px",
            "z-index": 1
        })
    }), $(".movedowm").on({
        hover: function () {
            $(".tjlottey").addClass("hover")
        }
    }), $(".tjlottey").mouseleave(function () {
        $(this).removeClass("hover")
    });
},

    $(".video_box").on("click", "span", function () {
        indextools.videoMove($(this).attr("class"))
    }),
    $(".lottey_title").on("click", "li", function () {
        var e = $(this).addClass("check").attr("data-text");
        $(this).siblings(".check").removeClass("check"), $(e).siblings().css("height", 0), $(e).css({
            height: "650px",
            "z-index": 1
        })
    }),

    $(".movedowm").on({
        hover: function () {
            $(".tjlottey").addClass("hover")
        }
    }),
    $(".tjlottey").mouseleave(function () {
        $(this).removeClass("hover")
    });

var ifopen = !1, isfirthload = !0, lc = "";
$(function () {
    $(".video_a").click(function () {
        openVdio($(this).attr("data-text"))
    }), $("#videobox").click(function () {
        $(".content").animate({width: "0", "margin-right": "0"}, 200, function () {
            $("#videobox").css({"z-index": "-1", position: "fixed"}), $("#videobox .content").css({
                width: "880px",
                "margin-right": "-440px",
                bottom: "-50%"
            })
        }), ifopen = !1, $("#videoIframe").find("iframe").removeAttr("src")
    }), $(".video_box").on("click", "ul>li>a", function (e) {
        e.preventDefault(), openVdio($(this).attr("href"))
    })
}), indextools.userXahao = function (e, t, a) {
    $.ajax({
        type: "get",
        url: publicUrl + "KillNum/getPksKillPlanList.do?lotCode=" + e,
        async: !1,
        data: {lasCount: t, hisCount: a},
        dataType: "json",
        success: function (e) {
            "object" == typeof e || (e = JSON.parse(e));
            var e = e.result.data, t = $(".px10sanhao>.rank>span.active").attr("data-text");
            indextools.userXahao_adddom(t, e), $(".px10sanhao>.rank").on("click", "span", function () {
                var t = $(this).attr("data-text");
                $(this).addClass("active").siblings(".active").removeClass(), indextools.userXahao_adddom(t, e)
            })
        },
        error: function (e) {
            console.log(e)
        }
    })
}, indextools.userXahao_adddom = function (e, t) {
    for (var a = [], n = 0; n < t[e + "Num"].length; n++) {
        var i = t[e + "Num"][n];
        n % 2 == 0 && a.push(i)
    }
    var o = "";
    $.each(a, function (a, n) {
        o += "<li><div class='head_div'><a href='/view/zsh/index.html?lottype=pk10_Kill'> <img src='img/head_png/headicon_" + a + ".png' /></a>", o += "<span>" + config.Uname[a] + "</span> </div><div class='result'>", o += "<h3>最新冠军杀号: <span>" + n + "</span></h3><p>近10期成功率： <span class='clo_red'>" + t[e + "Percent"][a] + "</span></p>", o += "<p>历史战绩： <span>" + t[e + "HisPercent"][a] + "</span></p></div></li>"
    }), $(".px10sanhao>.user_score>ul").html(o)
}, indextools.userXahaoSsc = function (e, t, a) {
    $.ajax({
        type: "get",
        url: publicUrl + "KillNum/getSscKillPlanList.do?lotCode=" + e,
        async: !1,
        data: {lasCount: t, hisCount: a},
        dataType: "json",
        success: function (e) {
            "object" == typeof e || (e = JSON.parse(e));
            var e = e.result.data, t = $(".SSCsanhao>.rank>span.active").attr("data-text");
            indextools.userXahaoSsc_adddom(t, e), $(".SSCsanhao>.rank").on("click", "span", function () {
                var t = $(this).attr("data-text");
                $(this).addClass("active").siblings(".active").removeClass(), indextools.userXahaoSsc_adddom(t, e)
            })
        },
        error: function (e) {
            console.log(e)
        }
    })
}, indextools.userXahaoSsc_adddom = function (e, t) {
    for (var a = [], n = 0; n < t[e + "Num"].length; n++) {
        var i = t[e + "Num"][n];
        n % 2 == 0 && a.push(i)
    }
    var o = "";
    $.each(a, function (a, n) {
        o += "<li><div class='head_div'><a href='/view/zsh/index.html?lottype=cqssc_Kill'> <img src='img/head_png/headicon_" + a + ".png' /></a>", o += "<span>" + config.SscUname[a] + "</span> </div><div class='result'>", o += "<h3>最新冠军杀号: <span>" + n + "</span></h3><p>近10期成功率： <span class='clo_red'>" + t[e + "Percent"][a] + "</span></p>", o += "<p>历史战绩： <span>" + t[e + "HisPercent"][a] + "</span></p></div></li>"
    }), $(".SSCsanhao>.user_score>ul").html(o)
}, indextools.userXahao("10001", 10, 50), indextools.userXahaoSsc("10002", 10, 50), $(function () {
    fanganyc = JSON.parse($("#fanganycdata").val())
    /*bannernews = JSON.parse($("#bannernewsdata").val())*/
}),

    indextools.userXahao = function (e, t, a) {
        $.ajax({
            type: "get",
            url: publicUrl + "KillNum/getPksKillPlanList.do?lotCode=" + e,
            async: !1,
            data: {lasCount: t, hisCount: a},
            dataType: "json",
            success: function (e) {
                "object" == typeof e || (e = JSON.parse(e));
                var e = e.result.data, t = $(".px10sanhao>.rank>span.active").attr("data-text");
                indextools.userXahao_adddom(t, e), $(".px10sanhao>.rank").on("click", "span", function () {
                    var t = $(this).attr("data-text");
                    $(this).addClass("active").siblings(".active").removeClass(), indextools.userXahao_adddom(t, e)
                })
            },
            error: function (e) {
                console.log(e)
            }
        })
    },

    indextools.userXahao_adddom = function (e, t) {
        for (var a = [], n = 0; n < t[e + "Num"].length; n++) {
            var i = t[e + "Num"][n];
            n % 2 == 0 && a.push(i)
        }
        var o = "";
        $.each(a, function (a, n) {
            o += "<li><div class='head_div'><a href='/view/zsh/index.html?lottype=pk10_Kill'> <img src='img/head_png/headicon_" + a + ".png' /></a>", o += "<span>" + config.Uname[a] + "</span> </div><div class='result'>", o += "<h3>最新冠军杀号: <span>" + n + "</span></h3><p>近10期成功率： <span class='clo_red'>" + t[e + "Percent"][a] + "</span></p>", o += "<p>历史战绩： <span>" + t[e + "HisPercent"][a] + "</span></p></div></li>"
        }), $(".px10sanhao>.user_score>ul").html(o)
    },

    indextools.userXahaoSsc = function (e, t, a) {
        $.ajax({
            type: "get",
            url: publicUrl + "KillNum/getSscKillPlanList.do?lotCode=" + e,
            async: !1,
            data: {lasCount: t, hisCount: a},
            dataType: "json",
            success: function (e) {
                "object" == typeof e || (e = JSON.parse(e));
                var e = e.result.data, t = $(".SSCsanhao>.rank>span.active").attr("data-text");
                indextools.userXahaoSsc_adddom(t, e), $(".SSCsanhao>.rank").on("click", "span", function () {
                    var t = $(this).attr("data-text");
                    $(this).addClass("active").siblings(".active").removeClass(), indextools.userXahaoSsc_adddom(t, e)
                })
            },
            error: function (e) {
                console.log(e)
            }
        })
    },

    indextools.userXahaoSsc_adddom = function (e, t) {
        for (var a = [], n = 0; n < t[e + "Num"].length; n++) {
            var i = t[e + "Num"][n];
            n % 2 == 0 && a.push(i)
        }
        var o = "";
        $.each(a, function (a, n) {
            o += "<li><div class='head_div'><a href='/view/zsh/index.html?lottype=cqssc_Kill'> <img src='img/head_png/headicon_" + a + ".png' /></a>", o += "<span>" + config.SscUname[a] + "</span> </div><div class='result'>", o += "<h3>最新冠军杀号: <span>" + n + "</span></h3><p>近10期成功率： <span class='clo_red'>" + t[e + "Percent"][a] + "</span></p>", o += "<p>历史战绩： <span>" + t[e + "HisPercent"][a] + "</span></p></div></li>"
        }), $(".SSCsanhao>.user_score>ul").html(o)
    }, indextools.userXahao("10001", 10, 50), indextools.userXahaoSsc("10002", 10, 50), $(function () {
    fanganyc = JSON.parse($("#fanganycdata").val())
    //bannernews = JSON.parse($("#bannernewsdata").val())
});