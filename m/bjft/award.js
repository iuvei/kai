	
$(function () {

    /*筛选类型*/
    $('#chooseType a').click(function () {


        $('#chooseType a').removeClass('chooseTypeColor');
        $(this).addClass('chooseTypeColor');
        if( $(this).text()=='开奖') {
            $('.openCode a').show();
            $('.tanLu').hide();
            $('.tanLuDs').hide();
        }else if($(this).text()=='摊路'){
            $('.openCode a').hide();
            $('.tanLuDs').hide();
            $('.tanLu').show();
        }else if($(this).text()=='单双'){
            $('.openCode a').hide();
            $('.tanLu').hide();
            $('.tanLuDs').show();
        }

    });
    /*期数*/
    var issueStr = '';

    $('.chooseIssue').change(function () {
        issueStr=$(this).val();

        if(issueStr==''){//全部期数
            $('.openCode').show();
            return
        }
        for (var i=0;i<$('.Issue').length;i++){
            if( $('.Issue').eq(i).text() == issueStr){
                $('.Issue').eq(i).parent().parent().parent().show();
            }else {
                $('.Issue').eq(i).parent().parent().parent().hide();
            }
        }
    });
    $('#dateTime').change(function () {
        $('.choose2 a').removeClass('chooseTypeColor')
        getHistoryData('50', $("#dateData").val());
        $(".dataYMD").html( $("#dateTime").val());
        $('.dataWeed').html(getWeed($("#dateTime").val()))
        return false;

    });

















    var currentPeriodNumber = -1;
    var nextPeriodNumber = -1;
    var timeInterval = 5000;
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
            var nextOpenIssue = Number(data.next.periodNumber)+1;
            // var nextOpenTime =data.next.awardTime.substr(11,5);
            // $('.nextOpenIssue').html(nextOpenIssue);
            // $('.nextOpenTime').html(nextOpenTime);
            // $('.openIssue').html(data.current.periodNumber);
            // $('.residueIssue').html(data.current.surplus_num);
            // $('.totalIssue').html(data.current.current_num);


            $('.newIssue span').html(data.current.periodNumber1);
            $('.nextIssue span').html(nextOpenIssue);
            $('.periodNumber').html(data.current.periodNumber);
            $('.surplus_num').html(data.current.surplus_num);
            var nums = data.current.awardNumbers.split(',');
            var str = "";
            for (var i = 0; i < nums.length; i++) {
                str = str + '<a class="no' + nums[i] + '">' + nums[i] + '</a>';
            }
            $('.openCodeList').html(str)

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
                    window.setTimeout(getHistoryData('15'), data.next.awardTimeInterval < 10 ? 1000 : _time);

                }
                if (currentPeriodNumber == -1) {    //判断第一次加载
                    currentPeriodNumber = data.current.periodNumber;
                }
                currentPeriodNumber = data.current.periodNumber;
                nextPeriodNumber = data.next.periodNumber;
            }


            window.setTimeout(awardTick, data.next.awardTimeInterval < 10 ? 1000 : _time);
            timeInterval = 0;

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

            var xiaqi = parseInt(data.next.periodNumber)+1;

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
});
function getHistoryData(count,date) {
	layer.open({type: 2,time: 1});
    $.get("../../pk10/getHistoryData.do", { count:count,date:date,t: Math.random() }, function (result) {
        if(result&&result.rows){
        	var j = 0;
        	var html = '';
            var str = '';
            for(var i in result.rows){
        		var data = result.rows[i];



                var tan = Number(data.n1) + Number(data.n2) + Number(data.n3);
                var tan2 = Number(data.n5) + Number(data.n6) + Number(data.n7);
                var tan3 = Number(data.n8) + Number(data.n9) + Number(data.n10);
                var tan_2 = tan%4;
                if(tan_2 == 0){
                    tan_2 = 4;
                }
                var dx='';
                var ftds =''
                if(tan_2%2 ==0){
                    dx = '双';
                    ftds='Shuang'

                }else {
                    dx = '单';
                    ftds='Dan'
                }
                var ds='';
                if(tan_2 <=2){
                    ds = '小';
                }else {
                    ds = '大';
                }
                var tan_3 = tan2%4;
                if(tan_3 == 0){
                    tan_3 = 4;
                }
                var dx2='';
                var ftds2 ='';
                if(tan_3%2 ==0){
                    dx2 = '双';
                    ftds2='Shuang'
                }else {
                    dx2 = '单';
                    ftds2='Dan'
                }
                var ds2='';
                if(tan_3 <=2){
                    ds2 = '小';
                }else {
                    ds2 = '大';
                }
                var tan_4 = tan3%4;
                if(tan_4 == 0){
                    tan_4 = 4;
                }
                var dx3='';
                var ftds3 ='';
                if(tan_4%2 ==0){
                    ftds3 ='Shuang';
                    dx3 = '双';
                }else {
                    dx3 = '单';
                    ftds3 ='Dan';
                }
                var ds3='';
                if(tan_4 <=2){
                    ds3 = '小';
                }else {
                    ds3 = '大';
                }
                $('.chooseIssue').append('<option value="'+data.termNum+'">'+data.termNum+'</option>');
                html += '<div class="openCode">';
                html += '<div class="qihao">'+'<div>'+'<span class="Issue">'+data.termNum +'</span>'+'期'+'</div>'+'<div>'+ data.lotteryTime.substring(10, 16)+'</div>'+'</div>';
                html += '<div>'
                    +'<a class="no' + data.n1 +' '+'flm' +'"'+'>' + data.n1 + '</a>'
                    +'<a class="no' + data.n2 +' '+'flm' +'"'+'>' + data.n2 + '</a>'
                    +'<a class="no' + data.n3 +' '+'flm' +'"'+'>' + data.n3 + '</a>'
                    +'<div class="tanLu" style="display: none">'+'<span>番摊 : </span>'+'<span class="no4">'+tan_2+'</span>' + '</div>'
                    +'<div class="tanLuDs" style="display: none">'+'<span>单双 : </span>'+'<span class="'+'pk10'+ftds+'">'+dx+'</span>' + '</div>'
                    +'</div>';
                html += '<div>'
                    +'<a class="no' + data.n5 +' '+'flm' +'"'+'>' + data.n5 + '</a>'
                    +'<a class="no' + data.n6 +' '+'flm' +'"'+'>' + data.n6 + '</a>'
                    +'<a class="no' + data.n7 +' '+'flm' +'"'+'>' + data.n7 + '</a>'
                    +'<div class="tanLu" style="display: none">'+'<span>番摊 : </span>'+'<span class="no4">'+tan_3+'</span>' + '</div>'
                    +'<div class="tanLuDs" style="display: none">'+'<span>单双 : </span>'+'<span class="'+'pk10'+ftds2+'">'+dx2+'</span>' + '</div>'
                    +'</div>';
                html += '<div>'
                    +'<a class="no' + data.n8 +' '+'flm' +'"'+'>' + data.n8 + '</a>'
                    +'<a class="no' + data.n9 +' '+'flm' +'"'+'>' + data.n9 + '</a>'
                    +'<a class="no' + data.n10 +' '+'flm' +'"'+'>' + data.n10 + '</a>'
                    +'<div class="tanLu" style="display: none">'+'<span>番摊 : </span>'+'<span class="no4">'+tan_4+'</span>' + '</div>'
                    +'<div class="tanLuDs" style="display: none">'+'<span>单双 : </span>'+'<span class="'+'pk10'+ftds3+'">'+dx3+'</span>' + '</div>'
                    +'</div>';
                html += '</div>';
                //
                // str += '<li class="' + clsName + '">';
                // str += '<table width="100%">';
                // str += '<tr>';
                // str += '<td width="14%" style="word-wrap:break-word;word-break:break-all;">' + data.termNum.substring(3, 6) +'期</td>';
                // str += '<td width="14%">'+ data.lotteryTime.substring(10, 16)+'</td>';
                // str += '<td class="nums">';

                // str +="<i class='ball-red' style='font-size: 14px;width: 30px'>前三</i>&nbsp;&nbsp;&nbsp;&nbsp;<i class='ball-red' style='font-size: 14px;width: 30px'>中三</i>&nbsp;&nbsp;&nbsp;&nbsp;<i class='ball-red' style='font-size: 14px;width: 30px'>后三</i>";

                // str += "<i class='ball-red' style='font-size: 14px;width: 30px;'>"+ tan_2 +"摊</i><i class='ball-red' style='font-size: 14px;width: 30px'>"+ dx +"</i><i class='ball-red' style='font-size: 14px;width: 30px'>"+ ds +"</i>" +
                //     "<i class='ball-red' style='font-size: 14px;width: 30px'>"+ tan_3 +"摊</i><i class='ball-red' style='font-size: 14px;width: 30px'>"+ dx2 +"</i><i class='ball-red' style='font-size: 14px;width: 30px'>"+ ds2 +"</i>" +
                //     "<i class='ball-red' style='font-size: 14px;width: 30px'>"+ tan_4 +"摊</i><i class='ball-red' style='font-size: 14px;width: 30px'>"+ dx3 +"</i><i class='ball-red' style='font-size: 14px;width: 30px'>"+ ds3 +"</i>";
                // html +=str+'</td>';
                // html += '</tr>';
                // html += '</table>';
                // html += '</li>';
                j++;
        	}
			
        	$("#historyList").html(html);
        }else {
			 $("#historyList").html("<li>对不起，今天暂无数据，请按日期检索！</li>");
			}
    }, "json");
}


function tan(num,num_1,num_2) {
    var sum = parseInt(num)+parseInt(num_1)+parseInt(num_2);
    sum = sum%4;
    if(sum == 0){
        sum = 4;
    }
    var ds;
    var dx;
    var tan;
    tan = sum+'摊';
    if(sum%2 ==0){
        ds =  '双';
    }else {
        ds =  '单';
    }
    if(sum >2 ){
        dx =  '大';
    }else {
        dx =  '小';
    }
    return [tan,dx,ds];
}







