	
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
            var num = data.current.awardNumbers.split(',');
            var html;
            $("#pk10 #number").html('');
            html = '<i class="no'+ num[0] +'">'+  num[0] +'</i>' +
            '<i class="no'+ num[1] +'">'+  num[1] +'</i>' +
            '<i class="no'+ num[2] +'">'+  num[2] +'</i>' +
            '<i class="ball-red" style="background-color: #fff;width: 5px"></i>' +
            '<i class="no'+ num[3] +'">'+  num[3] +'</i>' +
            '<i class="ball-red" style="background-color: #fff;width: 5px"></i>' +
            '<i class="no'+ num[4] +'">'+  num[4] +'</i>' +
            '<i class="no'+ num[5] +'">'+  num[5] +'</i>' +
            '<i class="no'+ num[6] +'">'+  num[6] +'</i>' +
            '<i class="ball-red" style="background-color: #fff;width: 5px"></i>' +
            '<i class="no'+ num[7] +'">'+  num[7] +'</i>' +
            '<i class="no'+ num[8] +'">'+  num[8] +'</i>' +
            '<i class="no'+ num[9] +'">'+  num[9] +'</i>';
           // console.log(html)
            $("#pk10 #number").html(html);

            var qs = tan(num[0],num[1],num[2]);
            var zs = tan(num[4],num[5],num[6]);
            var hs = tan(num[7],num[8],num[9]);
            $("#pk10 .bt-jg").html('');
            str = '<span>'+ qs[0] +'</span><span>'+ qs[1] +'</span><span>'+ qs[2] +'</span><span style="color: #bbbbbb">|</span>';
            str += '<span>'+ zs[0] +'</span><span>'+ zs[1] +'</span><span>'+ zs[2] +'</span><span style="color: #bbbbbb">|</span>';
            str += '<span>'+ hs[0] +'</span><span>'+ hs[1] +'</span><span>'+ hs[2] +'</span>';
            $("#pk10 .bt-jg").html(str);
            var qishu = parseInt(data.current.periodNumber);
            $("#pk10 .itm-tit #qihao").html('第'+qishu+'期结果');

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

            $(".daojishi #period").html("距"+xiaqi);
             
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
        		var clsName = "even";
                if (j%2==0) {
                    clsName = "odd";
                }
        		html += '<li class="' + clsName + '" style="height: 70px">';
				html += '<table width="100%">';
				html += '<tr>';
        		html += '<td width="20%">' + data.termNum+'期</br>';
				html += ''+ data.lotteryTime.substring(10, 16)+'</td>';
                html += '<td class="nums"><div class="nums-div">';
				html += '<i class="no' + data.n1 + '">' + data.n1 + '</i>';
				html += '<i class="no' + data.n2 + '">' + data.n2 + '</i>';
				html += '<i class="no' + data.n3 + '">' + data.n3 + '</i>';
                html += '<i style="width: 6px;"> </i>';
				html += '<i class="no' + data.n4 + '">' + data.n4 + '</i>';
                html += '<i style="width: 6px;"></i>';
				html += '<i class="no' + data.n5 + '">' + data.n5 + '</i>';
				html += '<i class="no' + data.n6 + '">' + data.n6 + '</i>';
				html += '<i class="no' + data.n7 + '">' + data.n7 + '</i>';
                html += '<i style="width: 6px;"></i>';
				html += '<i class="no' + data.n8 + '">' + data.n8 + '</i>';
				html += '<i class="no' + data.n9 + '">' + data.n9 + '</i>';
				html += '<i class="no' + data.n10 + '">' + data.n10 + '</i></br>';

                var tan = Number(data.n1) + Number(data.n2) + Number(data.n3);
                var tan2 = Number(data.n5) + Number(data.n6) + Number(data.n7);
                var tan3 = Number(data.n8) + Number(data.n9) + Number(data.n10);
                var tan_2 = tan%4;
                if(tan_2 == 0){
                    tan_2 = 4;
                }
                var dx='';
                if(tan_2%2 ==0){
                    dx = '双';
                }else {
                    dx = '单';
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
                if(tan_3%2 ==0){
                    dx2 = '双';
                }else {
                    dx2 = '单';
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
                if(tan_4%2 ==0){
                    dx3 = '双';
                }else {
                    dx3 = '单';
                }
                var ds3='';
                if(tan_4 <=2){
                    ds3 = '小';
                }else {
                    ds3 = '大';
                }
                html += '<span >'+tan_2+'摊</span>';
                if(ds == '大') {
                    html += '<span >' + ds + '</span>';
                }else {
                    html += '<span >' + ds + '</span>';
                }
                if(dx == '单') {
                    html += '<span >' + dx + '</span>';
                }else {
                    html += '<span >' + dx + '</span>';
                }

                html += '<span style="color: #bbbbbb"> | </span><span >'+tan_3+'摊</span>';
                if(ds2 == '大') {
                    html += '<span >' + ds2 + '</span>';
                }else {
                    html += '<span >' + ds2 + '</span>';
                }
                if(dx2 == '单') {
                    html += '<span >' + dx2 + '</span>';
                }else {
                    html += '<span >' + dx2 + '</span>';
                }


                html += '<span style="color: #bbbbbb"> | </span><span  >'+tan_4+'摊</span>';
                if(ds3 == '大') {
                    html += '<span >' + ds3 + '</span>';
                }else {
                    html += '<span >' + ds3 + '</span>';
                }
                if(dx3 == '单') {
                    html += '<span >' + dx3 + '</span>';
                }else {
                    html += '<span >' + dx3 + '</span>';
                }
                var guanyahe = data.n1 + data.n2;
                html +='</div></td>'
                html += '</tr>';
				html += '</table>';
				html += '</li>';

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







