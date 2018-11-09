$(function () {
    var currentPeriodNumber = -1;
    var timeInterval = 5000;
    var nextPeriodNumber = -1;
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
                $.get('pc28/' + _page, { t: Math.random() }, function (text) {
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
        $.get('pc28/getCqsscAwardData.do', {  t: Math.random() }, function (data) {
            requireCount += 1;
            if ((data.current.periodNumber != currentPeriodNumber) && currentPeriodNumber != -1) {
                timeInterval = 16000;
                window.setTimeout(afterAwarded, 1000);
                $(".currentAward .period").css("color", "green");
                requireCount = errorCount = 0;
                hideLotPeriodNumWarn();
            }
            //if (timeInterval != 0) {
            $(".currentAward .period").html(data.current.periodNumber1 + " 期");
            var nums = data.current.awardNumbers.split(',');

            var totalNum_a = Number(nums[1]) + Number(nums[4]) + Number(nums[7]) +Number(nums[10]) + Number(nums[13]) + Number(nums[16]);
            var totalNum_b = Number(nums[2]) + Number(nums[5]) + Number(nums[8]) +Number(nums[11]) + Number(nums[14]) + Number(nums[17]);
            var totalNum_c = Number(nums[3]) + Number(nums[6]) + Number(nums[9]) +Number(nums[12]) + Number(nums[15]) + Number(nums[18]) ;

            totalNum_a = Number(totalNum_a)%10;
            totalNum_b = Number(totalNum_b) % 10;
            totalNum_c = Number(totalNum_c) % 10;
            // nums=totalNum_a+totalNum_b+totalNum_c;
            // alert(totalNum_a);
            // alert(totalNum_b);
            // alert(totalNum_c);
            // alert(nums);
            var str = "";

            str = str + "<span class='no1'>" + totalNum_a + "</span><span class='no2'>" + totalNum_b + "</span><span class='no3'>" + totalNum_c + "</span>";

            $(".lot-nums").html(str);
            if (currentPeriodNumber == -1) {
                $(".currentAward .period").css("color", "green");
            }
            if (currentPeriodNumber != -1 && $('.close').length == 0) {    //判断第一次加载
                $('.sound').html('<object type="application/x-shockwave-flash" width="0" height="0" data="js/clarion.swf-path=movie.swf" /></object>');
            }
            if (currentPeriodNumber == -1) {    //判断第一次加载
                currentPeriodNumber = data.current.periodNumber;
                luzhuFirstShow(currentPeriodNumber, ctimeOfPeriod);
            }
            currentPeriodNumber = data.current.periodNumber;
            nextPeriodNumber = data.next.periodNumber;
            //}
            var _time = parseInt(parseInt(data.next.awardTimeInterval) + timeInterval + parseInt(Math.random() * 3000));
            window.setTimeout(awardTick, data.next.awardTimeInterval < 10 ? 1000 : _time);
            timeInterval = 0;
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
        $.get('pc28/getCqsscAwardTimes.do', { t: Math.random() }, function (data) {
            //请求到数据后需要做的事情
            cpCurrAwardData = data;

            //期数不同，则开始封盘倒计时
            if (data.current.periodNumber != cpNumber) {
                cpNextAwardTimeInterval = data.next.awardTimeInterval;
//alert(cpNextAwardTimeInterval);
                // alert(cpNextAwardTimeInterval - 1000);
                if (countDownTimer) window.clearInterval(countDownTimer);
                countDownTimer = window.setInterval(function () {
                    cpNextAwardTimeInterval = Math.max(0, cpNextAwardTimeInterval-1000);

                    showCountDown(cpNextAwardTimeInterval, data.next.periodNumber);


//alert(showCountDown(cpNextAwardTimeInterval, data.next.periodNumber));
                }, 1000);
            }
            cpNumber = data.current.periodNumber;
            if (ctimeOfPeriod == -1) {//判断第一次加载
                ctimeOfPeriod = data.current.periodNumber;
                luzhuFirstShow(currentPeriodNumber, ctimeOfPeriod);
            }
            $(".warnTime #period").html("第" + (Number(data.next.periodNumber)+1) + "期");
            var leavePeriod = 120 - cpNumber;
            if (leavePeriod == 0) {
                var d = new Date();
                var nd = new Date(data.next.awardTime.split(' ')[0].replace("-", "/", "gi"));
                if (d.getDate() == nd.getDate()) leavePeriod = 120;
            }
            //$(" .lot-award .currentAward .period-info .period-leave").html(cpNumber);
            loadAwardTimesTimer = window.setTimeout(loadAwardTimes, cpNextAwardTimeInterval < 10 ? 10000 : cpNextAwardTimeInterval + 1000);
            //  alert(loadAwardTimesTimer);
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
});


function updateHistoryRecord() {
    $.get('pc28/getNewestRecord.do', { t: Math.random() }, function (data) {
        var numbers = data.numbers.split(',');
        var totalNum_a = Number(numbers[1]) + Number(numbers[4]) + Number(numbers[7]) +Number(numbers[10]) + Number(numbers[13]) + Number(numbers[16]);
        var totalNum_b = Number(numbers[2]) + Number(numbers[5]) + Number(numbers[8]) +Number(numbers[11]) + Number(numbers[14]) + Number(numbers[17]);
        var totalNum_c = Number(numbers[3]) + Number(numbers[6]) + Number(numbers[9]) +Number(numbers[12]) + Number(numbers[15]) + Number(numbers[18]) ;

        numbers[0] = Number(totalNum_a)%10;
        numbers[1] = Number(totalNum_b) % 10;
        numbers[2] = Number(totalNum_c) % 10;
        var tr1 = $("#history tr").eq(1);
        var clsName = "odd";
        if (tr1) {
            clsName = tr1.attr("class") == "odd" ? "even" : "odd";
        }
        var html = '<tr class="' + clsName + '"><td><p class="p">' + data.period + '</p><p class="t">' + data.drawingTime;
        html += '</p></td><td class="nums">';
        for (var i = 0; i < numbers.length; i++) {
            html += '<span>' + numbers[i] + '</span>';
        }
        html += '</td>';
        html += '<td>' + data.total + '</td>';
        html += '<td><p ' + (data.totalOddorEven == "单" ? 'class="r"' : '') + '>' + data.totalOddorEven + '</p></td>';
        html += '<td><p ' + (data.totalBigOrSmall == "大" ? 'class="r"' : '') + '>' + data.totalBigOrSmall + '</p></td>';

        html += '<td><p ' + (data.longhu == "龙" ? 'class="r"' : (data.longhu == "和" ? 'class="g"' : '')) + '>' + data.longhu + '</p></td>';
        html += '<td>' + data.qianSan + '</td>';
        html += '<td>' + data.zhongSan + '</td>';
        html += '<td>' + data.houSan + '</td>';
        html += '</tr>';

        $("#history .head").after(html);
        // drawColor();
    }, 'json');
    if (typeof reloadChangLong != 'undefined' && reloadChangLong instanceof Function) {
        reloadChangLong();
    }
    if ($("b", $("#twoball-switch")).hasClass("checked") && typeof reloadChangLong != 'undefined' && reloadChangLong instanceof Function) {
        reloadTwoBallRemind();
    }
    if ($("b", $("#numstat-switch")).hasClass("checked") && typeof reloadNumberStatRemind != 'undefined' && reloadNumberStatRemind instanceof Function) {
        reloadNumberStatRemind();
    }
}

function drawColor() {
    var firstTr = $("#history tr .nums").first().find('span');
    var firstNums = [];
    for (var i = 0; i < firstTr.length; i++) {
        firstNums.push($(firstTr[i]).text());
    }
    var allspan = $("#history tr .nums span");
    var count = allspan.length;
    for (var j = 0; j < count; j++) {
        var s = $(allspan[j]);
        if (s.text() == firstNums[0]) {
            s.attr("class", "no1");
        } else if (s.text() == firstNums[1]) {
            s.attr("class", "no2");
        } else if (s.text() == firstNums[2]) {
            s.attr("class", "no3");
        } else if (s.text() == firstNums[3]) {
            s.attr("class", "no4");
        } else if (s.text() == firstNums[4]) {
            s.attr("class", "no5");
        } else {
            s.attr("class", "no6");
        }
    }
}

function LoadCqssscTipSet() {
    var tip_numstat = parseInt($.cookie("cqssc_tip_numstat") == null ? 0 : $.cookie("cqssc_tip_numstat"));
    var tip_changlong = parseInt($.cookie("cqssc_tip_changlong") == null ? 1 : $.cookie("cqssc_tip_changlong"));
    var tip_twoball = parseInt($.cookie("cqssc_tip_twoball") == null ? 1 : $.cookie("cqssc_tip_twoball"));
    if (1 == tip_numstat) {
        if ($("#numstat-switch > b").attr("class") == "checkbox") {
            $("#numstat-switch > b").addClass("checked");
        }
    } else {
        $("#numstat-switch > b").removeClass("checked");
        $("#numstat_remind").hide();
    }
    if (1 == tip_changlong) {
        if ($("#changlong-switch > b").attr("class") == "checkbox") {
            $("#changlong-switch > b").addClass("checked");
        }
    } else {
        $("#changlong-switch > b").removeClass("checked");
        $("#changlong_warn").hide();
    }
    if (1 == tip_twoball) {
        if ($("#twoball-switch > b").attr("class") == "checkbox") {
            $("#twoball-switch > b").addClass("checked");

        }
    } else {
        $("#twoball-switch > b").removeClass("checked");
        $("#twoball_remind").hide();
    }

}

