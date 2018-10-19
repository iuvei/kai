	
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
            $(".daojishi #period").html(data.next.periodNumber);
             
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
        	for(var i in result.rows){
        		var data = result.rows[i];
        		var clsName = "even";
                if (j%2==0) {
                    clsName = "odd";
                }
        		html += '<li class="' + clsName + '">';
				html += '<table width="100%">';
				html += '<tr>';
        		html += '<td width="14%">' + data.termNum.substring(3, 6) +'期</td>';
				html += '<td width="14%">'+ data.lotteryTime.substring(10, 16)+'</td>';	
                html += '<td class="nums">';			
				html += '<i class="no' + data.n1 + '">' + data.n1 + '</i>';
				html += '<i class="no' + data.n2 + '">' + data.n2 + '</i>';
				html += '<i class="no' + data.n3 + '">' + data.n3 + '</i>';
				html += '<i class="no' + data.n4 + '">' + data.n4 + '</i>';
				html += '<i class="no' + data.n5 + '">' + data.n5 + '</i>';
				html += '<i class="no' + data.n6 + '">' + data.n6 + '</i>';
				html += '<i class="no' + data.n7 + '">' + data.n7 + '</i>';
				html += '<i class="no' + data.n8 + '">' + data.n8 + '</i>';
				html += '<i class="no' + data.n9 + '">' + data.n9 + '</i>';
				html += '<i class="no' + data.n10 + '">' + data.n10 + '</i>';
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







