	
$(function () {
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
                $.get('http://m.qx66.com/cqssc/' + _page, { t: Math.random() }, function (text) {
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
        $.post('../../pc28/getCqsscAwardTimes.do', { t: Math.random() }, function (data) {
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
                 if (currentPeriodNumber != -1 ) {    //判断第一次加载
              
			          var nums = data.current.awardNumbers.split(',');
			  var str = "";
                for (var i = 0; i < nums.length; i++) {
                    
                        str = str + '<i class="no' + nums[i] + '">' + nums[i] + '</i>';
                   
                }
				
					layer.open({
		title: [
		        ''+data.current.awardTime.substring(10, 16)+' 最新第'+data.current.periodNumber+'期开奖号码：',
		        'background-color:#f9f9f9; color:#444;'
		    ],			
		    content:'<div class="nums">'+str+'</div>',
	    time: 2
	});
                }
                if (currentPeriodNumber == -1) {    //判断第一次加载
                    currentPeriodNumber = data.current.periodNumber;
                }
                currentPeriodNumber = data.current.periodNumber;
                nextPeriodNumber = data.next.periodNumber;
				
                
            }
            var _time = parseInt(parseInt(data.next.awardTimeInterval*1000) + timeInterval + parseInt(Math.random() * 3000));
		
            window.setTimeout(awardTick, (data.next.awardTimeInterval*1000) < 10 ? 1000 : _time);
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
        $.post('../../pc28/getPk10AwardTimes.do', {t: Math.random() }, function (data) {
            //请求到数据后需要做的事情
            cpCurrAwardData = data;

            //期数不同，则开始封盘倒计时
            if (data.current.periodNumber != cpNumber) {
                cpNextAwardTimeInterval = (data.next.awardTimeInterval * 1000);
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
            $(".daojishi #period").html(data.next.periodNumber);
             
            loadAwardTimesTimer = window.setTimeout(loadAwardTimes, (data.next.awardTimeInterval*1000) < 10 ? 10000 : (data.next.awardTimeInterval*1000) + 1000);
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
    $.get("../../pc28/getHistoryData.do", { count:count,date:date,t: Math.random() }, function (result) {
        if(result&&result.rows){
        	var j = 0;
        	var html = '';
        	for(var i in result.rows){
        		var data = result.rows[i];
        		var clsName = "even";
                if (j%2==0) {
                    clsName = "odd";
                }
                var totalNum_a = data.n2 + data.n5 + data.n8 +data.n11 + data.n14 + data.n17;
                var totalNum_b = data.n3 + data.n6 + data.n9 +data.n12 + data.n15 + data.n18;
                var totalNum_c = data.n4 + data.n7 + data.n10 +data.n13 + data.n16 + data.n19 ;
                totalNum_a = totalNum_a%10;
                totalNum_b = totalNum_b % 10;
                totalNum_c = totalNum_c % 10;
                var totalNum=totalNum_a+totalNum_b+totalNum_c;
                var sebo="";
                var danshaung="";
                if(totalNum == 1 || totalNum == 4 || totalNum == 7 || totalNum == 10 || totalNum == 16 || totalNum == 19 || totalNum == 22 || totalNum == 25){
                    sebo = '绿';
                }else if(totalNum == 2 || totalNum == 5 || totalNum == 8 || totalNum == 11 || totalNum == 17 || totalNum == 20 || totalNum == 23 || totalNum == 26){
                    sebo = '蓝';
                }else if(totalNum == 3 || totalNum == 6 || totalNum == 9 || totalNum == 12 || totalNum == 15 || totalNum == 18 || totalNum == 21 || totalNum == 24){
                    sebo = '红';
                }else if(totalNum == 0 || totalNum == 13 || totalNum == 14 || totalNum == 27 ){
                    sebo = '和';
                }
                if(totalNum  == 13 || totalNum == 14 ){
                    danshaung = '和';
                }else if(totalNum < 13 && totalNum > 5){
                    danshaung = '小';
                }else if(totalNum < 22 && totalNum > 14){
                    danshaung = '大';
                }else if(totalNum <= 5 && totalNum >= 0){
                    danshaung = '极小';
                }else if(totalNum <= 27 && totalNum >= 22){
                    danshaung = '极大';
                }
                var dx;
                if(totalNum%2 == 0){
                    dx = '双';
                }else{
                    dx = '单';
                }
                console.log(data);
        		html += '<li class="' + clsName + '" style="font-size: 10px">';
				html += '<table width="100%">';
				html += '<tr>';
        		html += '<td width="14%">' + data.termNum +'期</td>';
				html += '<td width="14%">'+ data.lotteryTime.substring(10, 16)+'</td>';	
                html += '<td class="">';			
				html += '<i class="ball-red">' + totalNum_a + '</i>';
				html += '+ ';
				html += '<i class="ball-red">' + totalNum_b + '</i>';
				html += '+ ';
				html += '<i class="ball-red">' + totalNum_c + '</i>';
				html += '= ';
				html += '<i class="ball-red" style="background-color: #4d4d4d;">' + totalNum + '</i>';
                if(sebo == '蓝'){
                    html += '<span class="ball-red" >'+sebo+'</span>';
                }else if(sebo == '红'){
                    html += '<span class="ball-red" >'+sebo+'</span>';
                }else if(sebo == '和'){
                    html += '<span class="ball-red" >'+sebo+'</span>';
                }else {
                    html += '<span class="ball-red" s>'+sebo+'</span>';
                }

                if(danshaung == '极大' || danshaung == '极小'){
                    html += '<span class="ball-red" >'+danshaung+'</span>';
                }else {
                    if(danshaung == '大'){
                        html += '<span class="ball-red" >'+danshaung+'</span>';
                    }else {
                        html += '<span class="ball-red" >'+danshaung+'</span>';
                    }

                }
                if(dx == '单'){
                    html += '<span class="ball-red" >'+dx+'</span>';
                }else {
                    html += '<span class="ball-red" >'+dx+'</span>';
                }

                var guanyahe = data.n1 + data.n2;
                html += '</td>';
            
              
                html += '</tr>';
				html += '</table>';
				html += '</li>';
                j++;
        	}
			
        	$("#historyList").html(html);
        }else {
			 $("#historyList").html("<li>对不起，今天暂无数据，请按日期检索！</li>");
			}
    }, "json");
}







