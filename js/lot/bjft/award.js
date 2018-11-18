
$(function () {
    var currentPeriodNumber = -1;
    var nextPeriodNumber = -1;
    var timeInterval = 5000;
    var lastOpenCode = -1;
    //请求出错次数
    var errorCount = 0;
    //请求次数
    var requireCount = 0;
    function afterAwarded() {
        var _page = $("#pageName").val();
        if (_page) {
            var _container = $("#pageName").attr("container");
            var _time = $("#pageName").attr("time");
            var unload = $("#pageName").attr("unload");
            if (unload && unload == "1") return;
            _time = ~ ~_time;
            _container = _container ? _container : "lot-wrap";

            setTimeout(function () {
                $.get('pk10/' + _page, { t: Math.random() }, function (text) {
                    $('#' + _container).html(text);
                    //文字闪烁
                    Glitter();
                });
            }, _time);
        }
        else {
            var fun = $("#callFun").val();
            var _time = $("#callFun").attr("time");
            if (fun) {
                var funs = fun.split('|');
                setTimeout(function () {
                    for (var i = 0; i < funs.length; i++) {
                        window[funs[i]]();
                    }
                }, _time);
            }
        }
    }
    var awardTick = function () {
        $.get('pk10/getPk10AwardData.do', { ajaxhandler: 'GetPk10AwardData', t: Math.random() }, function (data) {
            if(data.current.awardNumbers!='') {
                var nums;
                var str = "";
                nums = data.current.awardNumbers.split(',');
                for (var i = 0; i < nums.length; i++) {
                    str = str + "<span class='no" + nums[i] + "'></span>";
                }
                console.log(str);
                $(".lot-nums").html(str);
                $(".currentAward .period").html(data.current.periodNumber1 + " 期");
                $(".warnTime #period").html("第" + data.next.periodNumberStr + "期");
                $(" .lot-award .currentAward .period-info .period-leave").html(data.current.surplus_num);
            }
            //计数请求次数
            requireCount += 1;
            if ((data.current.periodNumber != currentPeriodNumber) && currentPeriodNumber != -1) {
                timeInterval = 16000;
                window.setTimeout(afterAwarded, 1000);
                $(".currentAward .period").css("color", "green");
                requireCount = errorCount = 0;
                hideLotPeriodNumWarn();
            }
            if (timeInterval != 0) {

                if (currentPeriodNumber != -1 && $('.close').length == 0) {    //判断第一次加载
                    $('.sound').html('<object  width="0" height="0" type="application/x-shockwave-flash" data="js/clarion.swf-path=movie.swf" /></object>');
                }
                if (currentPeriodNumber == -1) {    //判断第一次加载
                    currentPeriodNumber = data.current.periodNumber;
                    luzhuFirstShow(currentPeriodNumber, ctimeOfPeriod);
                }
                currentPeriodNumber = data.current.periodNumber;
                nextPeriodNumber = data.next.periodNumber;

            }
            var _time = parseInt(parseInt(data.next.awardTimeInterval) + timeInterval + parseInt(Math.random() * 3000));
            window.setTimeout(awardTick, data.next.awardTimeInterval < 10 ? 1000 : _time);
            timeInterval = 0;
            setTimeout(polling(),1000)
        }, 'json').error(function () {
            if (errorCount < 20) {
                window.setTimeout(awardTick, 1000 + Math.random() * 10000);
                errorCount++;
            }
        });
        if (errorCount >= 5 || requireCount > 90) {
            showLotPeriodNumWarn(nextPeriodNumber);
        }
    };

    var loadAwardTimesTimer, ctimeOfPeriod = -1;
    var cpCurrAwardData = null;
    var cpNextAwardTimeInterval = -1;
    function loadAwardTimes() {
        $.get('pk10/getPk10AwardTimes.do', { ajaxhandler: 'GetPk10AwardTimes', t: Math.random() }, function (data) {
            if(data.current.awardNumbers!='') {
                var nums;
                var str = "";
                nums = data.current.awardNumbers.split(',');
                for (var i = 0; i < nums.length; i++) {
                    str = str + "<span class='no" + nums[i] + "'></span>";
                }
                var qiansan = parseInt(nums[0]) + parseInt(nums[1]) + parseInt(nums[2]);
                var zhongsan = parseInt(nums[4]) + parseInt(nums[5]) + parseInt(nums[6]);
                var housan = parseInt(nums[7])+ parseInt(nums[8]) + parseInt(nums[9]);

                qiansan = qiansan%4;
                zhongsan = zhongsan%4;
                housan = housan%4;

                if(qiansan == 0){
                    str += '<i class="qftTan">'+"前三："+'<i class="fantan">'+"4摊"+'</i>';
                    str+="&nbsp;<i class='fantan'>大</i>"+'</i>';
                }else {
                    str += '<i class="qftTan">'+"前三："+'<i class="fantan">'+qiansan+"摊"+'</i>';
                    if(qiansan == 3){
                        str+="&nbsp;<i class='fantan'>大</i>"+'</i>';
                    }else {
                        str+="&nbsp;<i class='fantan'>小</i>"+'</i>';
                    }
                }
                if(zhongsan == 0){
                    str += '<i class="ftTan">'+"中三："+'<i class="fantan">'+"4摊"+'</i>';
                    str+= "&nbsp;<i class='fantan'>大</i>"+'</i>';
                }else {
                    str += '<i class="ftTan">'+"中三："+'<i class="fantan">'+zhongsan+"摊"+'</i>';
                    if(zhongsan == 3){
                        str+="&nbsp;<i class='fantan'>大</i>"+'</i>';
                    }else {
                        str+="&nbsp;<i class='fantan'>小</i>"+'</i>';
                    }
                }
                if(housan == 0){
                    str += '<i class="ftTan">'+"后三："+'<i class="fantan">'+"4摊"+'</i>';
                    str+= "&nbsp;<i class='fantan'>大</i>"+'</i>';
                }else {
                    str += '<i class="ftTan">'+"后三："+'<i class="fantan">'+housan+"摊"+'</i>';
                    if(housan == 3){
                        str+="&nbsp;<i class='fantan'>大</i>"+'</i>';
                    }else {
                        str+="&nbsp;<i class='fantan'>小</i>"+'</i>';
                    }
                }

                $(".lot-nums").html(str);
                $(".currentAward .period").html(data.current.periodNumber1 + " 期");
                $(".warnTime #period").html("第" + data.next.periodNumberStr + "期");
                $(" .lot-award .currentAward .period-info .period-leave").html(data.current.surplus_num);
            }
            //请求到数据后需要做的事情
            cpCurrAwardData = data;

            //期数不同，则开始封盘倒计时
            if (data.current.periodNumber != cpNumber) {
                cpNextAwardTimeInterval = data.next.awardTimeInterval;
                if (countDownTimer) {
                    window.clearInterval(countDownTimer);
                }
                countDownTimer = window.setInterval(function () {
                    cpNextAwardTimeInterval = Math.max(0, cpNextAwardTimeInterval - 1000);
                    showCountDown(cpNextAwardTimeInterval, data.current.fullPeriodNumber);
                }, 1000);
            }
            cpNumber = data.current.periodNumber;
            if (ctimeOfPeriod == -1) {//判断第一次加载
                ctimeOfPeriod = data.current.periodNumber;
                luzhuFirstShow(currentPeriodNumber, ctimeOfPeriod);
            }
            loadAwardTimesTimer = window.setTimeout(loadAwardTimes, data.next.awardTimeInterval < 10 ? 10000 : data.next.awardTimeInterval + 1000);
        }, 'json').error(function () {
            if (errorCount < 20) {
                window.setTimeout(loadAwardTimes, 1000 + Math.random() * 10000);
                errorCount++;
            }
        });
        if (errorCount >= 5) {
            showLotPeriodNumWarn(nextPeriodNumber);
        }
    }

    window.setTimeout(awardTick, 1000);
    //每10秒刷新开奖时间数据
    loadAwardTimesTimer = window.setTimeout(loadAwardTimes, 1000);
    function polling() {
        $.post('pk10/getPk10AwardTimes.do', {t: Math.random()}, function (data) {
            if(data.status == 2){
                return
            }
            if(data.current.awardNumbers==''){
                $(".currentAward .period").html(data.current.periodNumber1.substr(4) + " 期");
                $(".warnTime #period").html("第" + data.next.periodNumberStr.substr(4)+ "期");
                $(".lot-nums").html('<p>等待开奖...<p>');
                setTimeout(function () {
                    polling();
                },3000)
            }else {
                if(data.current.awardNumbers!='') {
                    var nums;
                    var str = "";
                    nums = data.current.awardNumbers.split(',');
                    for (var i = 0; i < nums.length; i++) {
                        str = str + "<span class='no" + nums[i] + "'></span>";
                    }
                    var qiansan = parseInt(nums[0]) + parseInt(nums[1]) + parseInt(nums[2]);
                    var zhongsan = parseInt(nums[4]) + parseInt(nums[5]) + parseInt(nums[6]);
                    var housan = parseInt(nums[7])+ parseInt(nums[8]) + parseInt(nums[9]);

                    qiansan = qiansan%4;
                    zhongsan = zhongsan%4;
                    housan = housan%4;

                    if(qiansan == 0){
                        str += '<i class="qftTan">'+"前三："+'<i class="fantan">'+"4摊"+'</i>';
                        str+="&nbsp;<i class='fantan'>大</i>"+'</i>';
                    }else {
                        str += '<i class="qftTan">'+"前三："+'<i class="fantan">'+qiansan+"摊"+'</i>';
                        if(qiansan == 3){
                            str+="&nbsp;<i class='fantan'>大</i>"+'</i>';
                        }else {
                            str+="&nbsp;<i class='fantan'>小</i>"+'</i>';
                        }
                    }
                    if(zhongsan == 0){
                        str += '<i class="ftTan">'+"中三："+'<i class="fantan">'+"4摊"+'</i>';
                        str+= "&nbsp;<i class='fantan'>大</i>"+'</i>';
                    }else {
                        str += '<i class="ftTan">'+"中三："+'<i class="fantan">'+zhongsan+"摊"+'</i>';
                        if(zhongsan == 3){
                            str+="&nbsp;<i class='fantan'>大</i>"+'</i>';
                        }else {
                            str+="&nbsp;<i class='fantan'>小</i>"+'</i>';
                        }
                    }
                    if(housan == 0){
                        str += '<i class="ftTan">'+"后三："+'<i class="fantan">'+"4摊"+'</i>';
                        str+= "&nbsp;<i class='fantan'>大</i>"+'</i>';
                    }else {
                        str += '<i class="ftTan">'+"后三："+'<i class="fantan">'+housan+"摊"+'</i>';
                        if(housan == 3){
                            str+="&nbsp;<i class='fantan'>大</i>"+'</i>';
                        }else {
                            str+="&nbsp;<i class='fantan'>小</i>"+'</i>';
                        }
                    }
                    $(".lot-nums").html(str);
                    $(" .lot-award .currentAward .period-info .period-leave").html(data.current.surplus_num);
                }
                getHistoryData()
            }
        }, 'json').error(function () {
        });
    }
});
function getHistoryData(count) {
    $.get("pk10/getHistoryData.do", { count:typeof(count)=="undefined"?16:count,t: Math.random() }, function (result) {
        if(result&&result.rows){
            var j = 0;
            var html = '';
            for(var i in result.rows){
                var data = result.rows[i];
                var clsName = "even";
                if (j%2==0) {
                    clsName = "odd";
                }
                html += '<tr class="' + clsName + '"><td><p class="">' +  data.termNum  + '</p></td><td><p class="">'
                    +data.lotteryTime.substring(5, 16);
                html += '</p></td><td class="nums">';
                html += '<i class="pk-no' + data.n1 + '"></i>';
                html += '<i class="pk-no' + data.n2 + '"></i>';
                html += '<i class="pk-no' + data.n3 + '"></i>';
                html += '<i class="pk-no' + data.n4 + '"></i>';
                html += '<i class="pk-no' + data.n5 + '"></i>';
                html += '<i class="pk-no' + data.n6 + '"></i>';
                html += '<i class="pk-no' + data.n7 + '"></i>';
                html += '<i class="pk-no' + data.n8 + '"></i>';
                html += '<i class="pk-no' + data.n9 + '"></i>';
                html += '<i class="pk-no' + data.n10 + '"></i>';
                var guanyahe = data.n1 + data.n2 + data.n3;
                var srt = guanyahe%4;
                html += '</td>';
                if(srt == 0){
                    html += '<td><span class="fantan">4摊</span></td>';
                    html += "<td><p class='r'>大</p></td>";
                    html += '<td><p >双</p></td>';
                }else {
                    html += '<td><span class="fantan">' + srt + '摊</span></td>';
                    if(srt == 3){
                        html += "<td><p class='r'>大</p></td>";
                    }else {
                        html += "<td><p>小</td>";
                    }
                    if(srt == 2){
                        html += "<td><p >双</p></td>";
                    }else {
                        html += "<td><p class='r'>单</td>";
                    }
                }

                var guanyahe2 = data.n5 + data.n6 + data.n7;
                var srt = guanyahe2%4;
                html += '</td>';
                if(srt == 0){
                    html += '<td><span class="fantan">4摊</span></td>';
                    html += "<td><p class='r'>大</p></td>";
                    html += '<td><p >双</p></td>';
                }else {
                    html += '<td><span class="fantan">' + srt + '摊</span></td>';
                    if(srt == 3){
                        html += "<td><p class='r'>大</p></td>";
                    }else {
                        html += "<td><p>小</td>";
                    }
                    if(srt == 2){
                        html += "<td><p >双</p></td>";
                    }else {
                        html += "<td><p class='r'>单</td>";
                    }

                }


                var guanyahe3 = data.n8 + data.n9 + data.n10;
                var srt = guanyahe3%4;
                html += '</td>';
                if(srt == 0){
                    html += '<td><span class="fantan">4摊</span></td>';
                    html += "<td><p class='r'>大</p></td>";
                    html += '<td><p >双</p></td>';
                }else {
                    html += '<td><span class="fantan">' + srt + '摊</span></td>';
                    if(srt == 3){
                        html += "<td><p class='r'>大</p></td>";
                    }else {
                        html += "<td><p>小</td>";
                    }
                    if(srt == 2){
                        html += "<td><p >双</p></td>";
                    }else {
                        html += "<td><p class='r'>单</td>";
                    }

                }
                html += '</tr>';
                j++;
            }

            html ='<tr class="head">' +
                '<td width="140">期号</td>' +
                '<td width="120">时间</td>' +
                '<td width="650">开奖号码</td>' +
                '<td colspan="3">前三</td>' +
                '<td colspan="3">中三</td>' +
                '<td colspan="3">后三</td>' +
                '</tr>'+html
            $("#history").html(html);
        }
    }, "json");
}
function updateHistoryRecord() {
    $.get('pk10/getNewestRecord.do', { ajaxhandler: 'GetNewestRecord', t: Math.random() }, function (data) {
        var numbers = data.numbers.split(',');
        var longhu = data.longhu;
        var tr1 = $("#history tr").eq(1);
        var clsName = "odd";
        if (tr1) {
            clsName = tr1.attr("class") == "odd" ? "even" : "odd";
        }
        var html = '<tr class="' + clsName + '"><td><p class="p">' + data.period + '</p><p class="t">' + data.drawingTime;
        html += '</p></td><td class="nums">';
        for (var i = 0; i < numbers.length; i++) {
            html += '<i class="pk-no' + numbers[i] + '"></i>';
        }
        html += '</td>';
        html += '<td>' + data.guanyahe + '</td>';
        html += '<td><p ' + (data.guanyahedx == "大" ? 'class="r"' : '') + '>' + data.guanyahedx + '</p></td>';
        html += '<td><p ' + (data.guanyaheds == "单" ? 'class="r"' : '') + '>' + data.guanyaheds + '</p></td>';
        for (var i = 0; i < longhu.length; i++) {
            html += '<td><p ' + (longhu[i] == "龙" ? 'class="r"' : '') + '>' + longhu[i] + '</p></td>';
        }
        html += '</tr>';

        $("#history .head").after(html);
        if (typeof showCarNum != 'undefined' && showCarNum instanceof Function) {
            showCarNum();
        }
    }, 'json');

    if (typeof reloadChangLong != 'undefined' && reloadChangLong instanceof Function) {
        reloadChangLong();
    }
    if ($("b", $("#ballstat-switch")).hasClass("checked") && typeof reloadBallStatRemind != 'undefined' && reloadBallStatRemind instanceof Function) {
        reloadBallStatRemind();
    }
}

function LoadPk10TipSet() {
    var tip_car = parseInt($.cookie("pk10_tip_car") == null ? 1 : $.cookie("pk10_tip_car"));
    var tip_changlong = parseInt($.cookie("pk10_tip_changlong") == null ? 1 : $.cookie("pk10_tip_changlong"));
    var tip_ballstat = parseInt($.cookie("pk10_tip_ballstat") == null ? 1 : $.cookie("pk10_tip_ballstat"));
    if (1 == tip_car) {
        if ($("#car-switch > b").attr("class") == "checkbox") {
            $("#car-switch > b").addClass("checked");

        }
    } else {
        $("#car-switch > b").removeClass("checked");
        $("#ball-choose").hide();
    }
    if (1 == tip_changlong) {
        if ($("#changlong-switch > b").attr("class") == "checkbox") {
            $("#changlong-switch > b").addClass("checked");

        }
    } else {
        $("#changlong-switch > b").removeClass("checked");
        $("#changlong_warn").hide();
    }
    if (1 == tip_ballstat) {
        if ($("#ballstat-switch > b").attr("class") == "checkbox") {
            $("#ballstat-switch > b").addClass("checked");

        }
    } else {
        $("#ballstat-switch > b").removeClass("checked");
        $("#ballstat_remind").hide();
    }

}
