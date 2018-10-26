	
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
                $.get('http://m.qx66.com/jsk3/' + _page, { t: Math.random() }, function (text) {
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
        $.post('../../jsk3/getPk10AwardTimes.do', { t: Math.random() }, function (data) {
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

            var nums = data.current.awardNumbers.split(',');
            var html = '';
            $("#jsk3 #number").html('');
            for(var i=0;i<nums.length;i++){
                html += '<i class="num'+ nums[i] +'"></i>';
            }
                var sum = eval(nums.join("+"));
                var dx = '';
                var ds = '';
                if(sum > 10){
                    dx = '大';
                }else {
                    dx = '小';
                }
                if(sum%2 == 0){
                    ds = '双';
                }else {
                    ds = '单';
                }
            html +="<span>"+sum+"</span>";
            html +="<span>"+dx+"</span>";
            html +="<span>"+ds+"</span>";
            $("#jsk3 #number").html(html);

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
        $.post('../../jsk3/getPk10AwardTimes.do', {t: Math.random() }, function (data) {
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
    $.get("../../jsk3/getHistoryData.do", { count:count,date:date,t: Math.random() }, function (result) {
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
				html += '<table width="100%" id="jsk3">';
				html += '<tr>';
        		html += '<td width="14%">' + data.termNum.substring(8, 16) +'期</br>';
				html += '<td width="14%">'+ data.lotteryTime.substring(10, 16)+'</td>';
                html += '<td class="">';			
				html += '<i class="num'+data.n1+ '">'+ '</i>';
				html += '<i  class="num'+data.n2+ '">' + '</i>';
				html += '<i  class="num'+data.n3+ '">'  + '</i>';

                var guanyahe = arr_num(data.lotteryNum);
                var sum = eval(guanyahe.join("+"));
                html += '<div class="span1">总和<span style="color: #bbbbbb">|</span><span>'+ sum +'</span><span>'+ dx(sum)+'</span><span>'+ds(sum)+'</span>';
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

function arr_num(nums) {
    var arr=[];
    arr[0] = nums.substring(0,1);
    arr[1] = nums.substring(1,2);
    arr[2] = nums.substring(2,3);
    return arr;
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
    if(nums <= 10){
        return '小';
    }else {
        return '大';
    }
}
function ds(nums) {
    if(nums%2 == 0){
        return  '双';
    }else {
        return  '单';
    }
}






