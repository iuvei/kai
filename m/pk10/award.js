	
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
                $.get('http://m.qx66.com/pk10/' + _page, { t: Math.random() }, function (text) {
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

        $.post('../../pk10/getPk10AwardTimes.do', { t: Math.random() }, function (data) {
            $('.newIssue span').html(data.current.periodNumber1);
            $('.nextIssue span').html(data.next.periodNumberStr);
            $('.periodNumber').html(data.current.periodNumber);
            $('.surplus_num').html(data.current.surplus_num);
            var nums = data.current.awardNumbers.split(',');
            var str = "";
            for (var i = 0; i < nums.length; i++) {
                str = str + '<a class="no' + nums[i] + '">' + nums[i] + '</a>';
            }
            $('.openCodeList').html(str);
            var nums = data.current.awardNumbers.split(',');
            $('.lhResult a').eq(0).html(long(nums[0],nums[9]));
            $('.lhResult a').eq(1).html(long(nums[1],nums[8]));
            $('.lhResult a').eq(2).html(long(nums[2],nums[7]));
            $('.lhResult a').eq(3).html(long(nums[3],nums[6]));
            $('.lhResult a').eq(4).html(long(nums[4],nums[5]));

            var sum = parseInt(nums[0])+parseInt(nums[1]);
            var dx = '';
            var ds = '';
            if(sum > 11){
                dx = '大';
            }else if(sum < 11){
                dx = '小';
            }else {
                dx = '和';
            }
            if(sum%2 == 0){
                ds = '双';
            }else {
                ds = '单';
            }
            if(sum == 11){
                ds = '和';
            }
            $('.lhResult a').eq(7).html(sum);
            $('.lhResult a').eq(8).html(dx);
            $('.lhResult a').eq(9).html(ds);
            getHistoryData('15');
            //计数请求次数
            requireCount += 1;
            if ((data.current.periodNumber != currentPeriodNumber) && currentPeriodNumber != -1) {
                timeInterval = 16000;
                window.setTimeout(afterAwarded, 1000);
                $(".currentAward .period").css("color", "green");
                requireCount = errorCount = 0;
                hideLotPeriodNumWarn();
            }
            var _time = parseInt(parseInt(data.next.awardTimeInterval) + timeInterval + parseInt(Math.random() * 3000));
            if (timeInterval != 0) {
                 if (currentPeriodNumber != -1 ) {    //判断第一次加载


             }
                if (currentPeriodNumber == -1) {    //判断第一次加载
                    currentPeriodNumber = data.current.periodNumber;
                }
                currentPeriodNumber = data.current.periodNumber;

                nextPeriodNumber = data.next.periodNumber;
            }

		
            window.setTimeout(awardTick, data.next.awardTimeInterval < 10 ? 1000 : _time);
            timeInterval = 0;
            lastOpenCode =data.current.awardNumbers;
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
        $.post('../../pk10/getPk10AwardTimes.do', {t: Math.random() }, function (data) {
            $('.newIssue span').html(data.current.periodNumber1);
            $('.nextIssue span').html(data.next.periodNumberStr);
            $('.periodNumber').html(data.current.periodNumber);
            $('.surplus_num').html(data.current.surplus_num);
            var nums = data.current.awardNumbers.split(',');
            var str = "";
            for (var i = 0; i < nums.length; i++) {
                str = str + '<a class="no' + nums[i] + '">' + nums[i] + '</a>';
            }
            $('.openCodeList').html(str);
            var nums = data.current.awardNumbers.split(',');
            $('.lhResult a').eq(0).html(long(nums[0],nums[9]));
            $('.lhResult a').eq(1).html(long(nums[1],nums[8]));
            $('.lhResult a').eq(2).html(long(nums[2],nums[7]));
            $('.lhResult a').eq(3).html(long(nums[3],nums[6]));
            $('.lhResult a').eq(4).html(long(nums[4],nums[5]));

            var sum = parseInt(nums[0])+parseInt(nums[1]);
            var dx = '';
            var ds = '';
            if(sum > 11){
                dx = '大';
            }else if(sum < 11){
                dx = '小';
            }else {
                dx = '和';
            }
            if(sum%2 == 0){
                ds = '双';
            }else {
                ds = '单';
            }
            if(sum == 11){
                ds = '和';
            }
            $('.lhResult a').eq(7).html(sum);
            $('.lhResult a').eq(8).html(dx);
            $('.lhResult a').eq(9).html(ds);
            getHistoryData('15');

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

                    showCountDown(cpNextAwardTimeInterval, data.next.periodNumber);
                }, 1000);
            }
            cpNumber = data.current.periodNumber;
            if (ctimeOfPeriod == -1) {//判断第一次加载
                ctimeOfPeriod = data.current.periodNumber;
            }
            loadAwardTimesTimer = window.setTimeout(loadAwardTimes, data.next.awardTimeInterval < 10 ? 10000 : data.next.awardTimeInterval + 1000);
            lastOpenCode =data.current.awardNumbers;
            setTimeout(polling(),1000)
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
    var loading = -1;
    function polling() {
        $.post('pk10/getPk10AwardTimes.do', {t: Math.random()}, function (data) {
            if(data.status == 2){
                return
            }
            if(loading==-1){
                if(data.current.awardNumbers==''){
                    setTimeout(function () {
                        polling();
                    },3000)
                }
                loading=2
            }else {
                if (lastOpenCode == data.current.awardNumbers) {
                    $(".lot-nums").html('<p>等待开奖...<p>');
                    setTimeout(function () {
                        polling();
                    }, 3000)
                } else {
                    $('.newIssue span').html(data.current.periodNumber1);
                    $('.nextIssue span').html(data.next.periodNumberStr);
                    $('.periodNumber').html(data.current.periodNumber);
                    $('.surplus_num').html(data.current.surplus_num);
                    var nums = data.current.awardNumbers.split(',');
                    var str = "";
                    for (var i = 0; i < nums.length; i++) {
                        str = str + '<a class="no' + nums[i] + '">' + nums[i] + '</a>';
                    }
                    $('.openCodeList').html(str);
                    var nums = data.current.awardNumbers.split(',');
                    $('.lhResult a').eq(0).html(long(nums[0],nums[9]));
                    $('.lhResult a').eq(1).html(long(nums[1],nums[8]));
                    $('.lhResult a').eq(2).html(long(nums[2],nums[7]));
                    $('.lhResult a').eq(3).html(long(nums[3],nums[6]));
                    $('.lhResult a').eq(4).html(long(nums[4],nums[5]));

                    var sum = parseInt(nums[0])+parseInt(nums[1]);
                    var dx = '';
                    var ds = '';
                    if(sum > 11){
                        dx = '大';
                    }else if(sum < 11){
                        dx = '小';
                    }else {
                        dx = '和';
                    }
                    if(sum%2 == 0){
                        ds = '双';
                    }else {
                        ds = '单';
                    }
                    if(sum == 11){
                        ds = '和';
                    }
                    $('.lhResult a').eq(7).html(sum);
                    $('.lhResult a').eq(8).html(dx);
                    $('.lhResult a').eq(9).html(ds);
                    getHistoryData('15');
                }
            }
        }, 'json').error(function () {
        });
    }
});
function getHistoryData(count,date) {
    $.get("../../pk10/getHistoryData.do", { count:count,date:date,t: Math.random() }, function (result) {
        if(result&&result.rows){
        	var j = 0;
        	var html = '';
        	for(var i in result.rows){
        		var data = result.rows[i];
                $('.chooseIssue').append('<option value="'+data.termNum+'">'+data.termNum+'</option>');
                html += '<div class="openCode">';
                html += '<div class="qihao">'+'<div>'+'<span class="Issue">'+data.termNum +'</span>'+'期'+'</div>'+'<div>'+ data.lotteryTime.substring(10, 16)+'</div>'+'</div>';

                html += '<div>'+'<a class="no' + data.n1 + '"'+'name'+'='+'"'+long(data.n1,data.n10 )+'"'+'>' + data.n1 + '</a>'
                +'<a class="pk10'+DXClass(data.n1)+'"  style="display: none">' + DX(data.n1)+ '</a>'
                    +'<a class="pk10'+DSClass(data.n1)+'"  style="display: none">' + ds(data.n1)+ '</a>'
                +'<a class="zuhe" style="display: none">' +(data.n1+data.n2)+ '</a>'
                +'</div>';

                html += '<div>'+'<a class="no' + data.n2 + '"'+'name'+'='+'"'+long(data.n2,data.n9 )+'"'+'>' + data.n2 + '</a>'
                    +'<a class="pk10'+DXClass(data.n2)+'"  style="display: none">' + DX(data.n2)+ '</a>'
                    +'<a class="pk10'+DSClass(data.n2)+'"  style="display: none">' + ds(data.n2)+ '</a>'
                    +'<a class="pk10'+getClass(data.n2,data.n1)+' '+'zuhe'+'"  style="display: none">' + dx(data.n2+data.n1)+ '</a>'
                    +'</div>';
                html += '<div>'+'<a class="no' + data.n3 + '"'+'name'+'='+'"'+long(data.n3,data.n8 )+'"'+'>' + data.n3 + '</a>'
                    +'<a class="pk10'+DXClass(data.n3)+'"  style="display: none">' + DX(data.n3)+ '</a>'
                    +'<a class="pk10'+DSClass(data.n3)+'"  style="display: none">' + ds(data.n3)+ '</a>'
                    +'<a class="pk10'+getDSClass(data.n2,data.n1)+' '+'zuhe'+'"  style="display: none">' + ds(data.n2+data.n1)+ '</a>'
                    +'</div>';

                html += '<div>'+'<a class="no' + data.n4 + '"'+'name'+'='+'"'+long(data.n4,data.n7 )+'"'+'>' + data.n4 + '</a>'
                    +'<a class="pk10'+DXClass(data.n4)+'"  style="display: none">' + DX(data.n4)+ '</a>'
                    +'<a class="pk10'+DSClass(data.n4)+'"  style="display: none">' + ds(data.n4)+ '</a>'
                    +'<a class="pk10'+lhClass(data.n1,data.n10)+' '+'zuhe'+'"  style="display: none">' + long(data.n1,data.n10)+ '</a>'
                    +'</div>';
                html += '<div>'+'<a class="no' + data.n5 + '"'+'name'+'='+'"'+long(data.n5,data.n6 )+'"'+'>' + data.n5 + '</a>'
                    +'<a class="pk10'+DXClass(data.n5)+'"  style="display: none">' + DX(data.n5)+ '</a>'
                    +'<a class="pk10'+DSClass(data.n5)+'"  style="display: none">' + ds(data.n5)+ '</a>'
                    +'<a class="pk10'+lhClass(data.n2,data.n9)+' '+'zuhe'+'"  style="display: none">' + long(data.n2,data.n9)+ '</a>'
                    +'</div>';
                html += '<div>'+'<a class="no' + data.n6 + '">' + data.n6 + '</a>'
                    +'<a class="pk10'+DXClass(data.n6)+'"  style="display: none">' + DX(data.n6)+ '</a>'
                    +'<a class="pk10'+DSClass(data.n6)+'"  style="display: none">' + ds(data.n6)+ '</a>'
                    +'<a class="pk10'+lhClass(data.n3,data.n8)+' '+'zuhe'+'"  style="display: none">' + long(data.n3,data.n8)+ '</a>'
                    +'</div>';
                html += '<div>'+'<a class="no' + data.n7 + '">' + data.n7 + '</a>'
                    +'<a class="pk10'+DXClass(data.n7)+'"  style="display: none">' + DX(data.n7)+ '</a>'
                    +'<a class="pk10'+DSClass(data.n7)+'"  style="display: none">' + ds(data.n7)+ '</a>'
                    +'<a class="pk10'+lhClass(data.n4,data.n7)+' '+'zuhe'+'"  style="display: none">' + long(data.n4,data.n7)+ '</a>'
                    +'</div>';
                html += '<div>'+'<a class="no' + data.n8 + '">' + data.n8 + '</a>'
                    +'<a class="pk10'+DXClass(data.n8)+'"  style="display: none">' + DX(data.n8)+ '</a>'
                    +'<a class="pk10'+DSClass(data.n8)+'"  style="display: none">' + ds(data.n8)+ '</a>'
                    +'<a class="pk10'+lhClass(data.n5,data.n6)+' '+'zuhe'+'"  style="display: none">' + long(data.n5,data.n6)+ '</a>'
                    +'</div>';
                html += '<div class="lastDiv">'+'<a class="no' + data.n9 + '">' + data.n9 + '</a>'
                    +'<a class="pk10'+DXClass(data.n9)+'"  style="display: none">' + DX(data.n9)+ '</a>'
                    +'<a class="pk10'+DSClass(data.n9)+'"  style="display: none">' + ds(data.n9)+ '</a>'+'</div>';
                html += '<div class="lastDiv">'+'<a class="no' + data.n10 + '">' + data.n10 + '</a>'
                    +'<a class="pk10'+DXClass(data.n10)+'"  style="display: none">' + DX(data.n10)+ '</a>'
                    +'<a class="pk10'+DSClass(data.n10)+'"  style="display: none">' + ds(data.n10)+ '</a>'+'</div>';
                html += '</div>';

                j++;
        	}
			
        	$("#historyList").html(html);

        }else {
			 $("#historyList").html("<p>对不起，今天暂无数据，请按日期检索！</p>");
			}
    }, "json");
}













function getClass(num1,num2) {
    var sum = parseInt(num1)+parseInt(num2);
    if(sum > 11){
        return 'HeDa';
    }else if(sum<11){
        return 'HeXiao';
    }else {
        return 'He';
    }
}
function getDSClass(num1,num2) {
    var sum = parseInt(num1)+parseInt(num2);
    if(sum==11){
        return 'He';
    }
    if(sum%2 == 0){
        return  'HeShuang';
    }else {
        return  'HeDan';
    }
}
function lhClass(num1,num2) {
    if(parseInt(num1) > parseInt(num2)){
        return 'Long'
    }else if(parseInt(num1) < parseInt(num2)){
        return 'Hu'
    }
}


function DXClass(num) {
    if(num<=5){
        return 'Xiao';
    }else {
        return 'Da';
    }
}
function DSClass(nums) {
    if(nums%2 == 0){
        return  'Shuang';
    }else {
        return  'Dan';
    }
}
function DX(num) {
    if(num<=4){
        return '小';
    }else {
        return '大';
    }
}
function arr_num(nums) {
    var arr=[];
    arr[0] = nums.substring(0,2);
    arr[1] = nums.substring(2,4);
    arr[2] = nums.substring(4,6);
    arr[3] = nums.substring(6,8);
    arr[4] = nums.substring(8,10);
    return arr;
}

function lh(nums) {
    var srt = '';
    var sum = parseInt(nums[0])+parseInt(nums[1]);
    var dx = '';
    var ds = '';
    if(sum > 11){
        dx = '大';
    }else if(sum < 11){
        dx = '小';
    }else {
        dx = '和';
    }
    if(sum%2 == 0){
        ds = '双';
    }else {
        ds = '单';
    }
    if(sum == 11){
        ds = '和';
    }
    srt +="<span>"+long(nums[0],nums[9])+"</span>";
    srt +="<span>"+long(nums[1],nums[8])+"</span>";
    srt +="<span>"+long(nums[2],nums[7])+"</span>";
    srt +="<span>"+long(nums[3],nums[6])+"</span>";
    srt +="<span>"+long(nums[4],nums[5])+"</span>";
    srt +="<span style='color: #bbbbbb'>|</span> 冠亚和: ";
    srt +="<samp>"+sum+"</samp>";
    srt +="<samp>"+dx+"</samp>";
    srt +="<samp>"+ds+"</samp>";
    return srt;
}


function long(nums_1,nums_2) {
    if(parseInt(nums_1) > parseInt(nums_2)){
        return '龙'
    }else if(parseInt(nums_1) < parseInt(nums_2)){
        return '虎'
    }else {
        return '和'
    }
}
function dx(nums) {
    if(nums < 11){
        return '小';
    }else if(nums > 11) {
        return '大';
    }else {
        return '和';
    }
}
function ds(nums) {
    if(nums == 11){
        return '和';
    }
    if(nums%2 == 0){
        return  '双';
    }else {
        return  '单';
    }
}




