	

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
        $.post('../../cqssc/getCqsscAwardTimes.do', { t: Math.random() }, function (data) {
            // console.log(data);
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
            $("#cqssc #number").html('');
            for(var i=0;i<nums.length;i++){
                html += '<i class="ball-red">' + nums[i] + '</i>';
            }
            // console.log(html);
            $("#cqssc #number").html(html);
            $("#cqssc .bt-jg").html('');
            var srt;
            // console.log(nums);
            srt = lh(nums);
            if(srt == undefined || srt == null){

                var srt = '';
                var sum = eval(nums.join("+"));
                var dx = '';
                var ds = '';
                if(sum > 22){
                    dx = '大';
                }else {
                    dx = '小';
                }
                if(sum%2 == 0){
                    ds = '双';
                }else {
                    ds = '单';
                }
                srt +="<span>"+long(nums[0],nums[4])+"</span>";
                // srt +="<span>"+long(nums[1],nums[8])+"</span>";
                // srt +="<span>"+long(nums[2],nums[7])+"</span>";
                // srt +="<span>"+long(nums[3],nums[6])+"</span>";
                // srt +="<span>"+long(nums[4],nums[5])+"</span>";
                srt +="<span style='color: #bbbbbb'>|</span> 冠亚和: ";
                srt +="<span>"+sum+"</span>";
                srt +="<span>"+dx+"</span>";
                srt +="<span>"+ds+"</span>";
            }
            $("#cqssc .bt-jg").html(srt);
            var qishu = parseInt(data.current.periodNumber1);
            //console.log(qishu)
            $("#cqssc .itm-tit #qihao").html('第'+qishu+'期结果');


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
        $.post('../../cqssc/getPk10AwardTimes.do', {t: Math.random() }, function (data) {
            console.log(data);
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
    $.get("../../cqssc/getHistoryData.do", { count:count,date:date,t: Math.random() }, function (result) {
        // console.log(result);
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
        		html += '<td width="20%">' + data.termNum.substring(8, 16) +'期</br>';
				html += ''+ data.lotteryTime.substring(10, 16)+'</td>';
                html += '<td class=""><div class="nums-div">';
				html += '<i class="ball-red">' + data.n1 + '</i>';
				html += '<i class="ball-red">' + data.n2 + '</i>';
				html += '<i class="ball-red">' + data.n3 + '</i>';
				html += '<i class="ball-red">' + data.n4 + '</i>';
				html += '<i class="ball-red">' + data.n5 + '</i>';
                var guanyahe = arr_num(data.lotteryNum);
                var sum = eval(guanyahe.join("+"));
                html += '<div class="bt-jg"><span>'+long(data.n1,data.n5)+'</span><span style="color: #bbbbbb">|</span><span>'+ sum +'</span><span>'+ dx(sum)+'</span><span>'+ds(sum)+'</span>'+
                    '</br><span class="span-2">'+shun(data.n1,data.n2,data.n3)+'</span><span class="span-2">'+shun(data.n2,data.n3,data.n4)+'</span>' +
                    '<span class="span-2">'+shun(data.n3,data.n4,data.n5)+'</span><span class="span-2">'+douniu(guanyahe)+'</span></div></div></td>';
              
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
    arr[3] = nums.substring(3,4);
    arr[4] = nums.substring(4,5);
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
    if(nums <= 22){
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

function shun(nums,nums_1,nums_2) {
    if ((Number(nums) == Number(nums_1)) && (Number(nums) == Number(nums_2))) {
        return'豹子';
    }

    else if (((Number(nums_1) - Number(nums)) == (Number(nums_2) - Number(nums_1))) && ((Number(nums) - Number(nums_1)) == 1) && ((Number(nums_1) - Number(nums_2)) == 1)
        && ((Number(nums) - Number(nums_2)) == 1) && ((Number(nums_2) - Number(nums)) == 1) || (nums + nums_1 + nums_2 == '0,8,9' || nums + nums_1 + nums_2 == '0,1,9')) {

        return '顺子';

    }

    else if ((Number(nums) - Number(nums_1)) == 2 && (Number(nums_1) - Number(nums_2)) == -1 || (Number(nums_1) - Number(nums)) == 2 && (Number(nums_1) - Number(nums_2)) == 1 ||
        (Number(nums_1) - Number(nums_2)) == 2 && (Number(nums_1) - Number(nums)) == 1 || (Number(nums_2) - Number(nums_1)) == 2 && (Number(nums_1) - Number(nums)) == -1) {

        return '顺子';
    }

    else if (Number(nums) == Number(nums_1) || Number(nums_1) == Number(nums_2) || Number(nums) == Number(nums_2)) {

        return '对子';
    }

    else if ((Number(nums) - Number(nums_1)) == 1 || (Number(nums_1) - Number(nums)) == 1 || (Number(nums_2) - Number(nums_1)) == 1 || (Number(nums_1) - Number(nums_2)) == 1 ||
        (Number(nums) - Number(nums_2)) == 1 || (Number(nums_2) - Number(nums)) == 1 || (nums_2 + nums == '0,9' || nums_1 + nums == '0,9' || nums_1 + nums_2 == '0,9' ||
            nums + nums_2 == '0,9' || nums + nums_1 == '0,9' || nums_2 + nums_1 == '0,9')) {

        return '半顺';

    } else {
        return '杂六';
    }
}

function douniu(nums){
    //var nums = str.split(',');
    var i = 0, j = 0, k = 0,nSum = 0,b=0,a=0;
    var num = '';
    var num2 = '';
    var num3='';
    var text = '';

    if(nums == [0,0,0,0,0]){
        niu ='牛牛';
    }else {
        for(i = 0; i <nums.length; ++ i)
        {
            for(j = i + 1; j < nums.length; ++ j)
            {
                for(k = j + 1; k < nums.length; ++ k)
                {
                    nSum = Number(nums[i]) + Number(nums[j]) + Number(nums[k]);
                    //  console.log(nSum);
                    nSum = Number(nSum)%10;
                    // console.log(nSum);
                    // alert(nSum);
                    if(nSum == 0){
                        num = i;
                        num2 = j;
                        num3=k;
                        text = '有牛';
                        break;
                    }
                }

            }

        }

        nums[num] = null;
        nums[num2] = null;
        nums[num3] = null;


        var num4=[];
        var num5=0;
        var niu = '';
        if(num2 ==0 || num2 != null || num ==0  || num != null|| num3 == 0 || num3 !=null){
            for(var t=0;t<nums.length;t++){
                if(nums[t] != null && nums[t] != '' ){
                    num4[num5]=nums[t]
                    num5++;
                }
            }
            //console.log(num4);
            if(num4 == 0 || num4 == null || num4 == ''){
                niu ='牛牛';
            }else {
                if (num4.length <= 2) {
                    if (num4[1]) {
                        niu = Number(num4[0]) + Number(num4[1]);
                    } else {
                        niu = Number(num4[0]);
                    }

                    if (niu > 10) {
                        niu = niu - 10;
                    } else if (niu == 10) {
                        niu = '牛牛';
                    }
                } else {
                    niu = '没牛';
                }
            }
        }else {
            niu ='没牛';
        }
    }
    if( niu !='没牛' && niu !='牛牛'){
        niu = '牛'+ niu;
        return niu;
    }else {
        return niu;
    }

    //console.log(niu);
    return niu;

}


function lh(nums) {
    var srt = '';
    var sum = eval(nums.join("+"));;
    var dx = '';
    var ds = '';
    if(sum > 22){
        dx = '大';
    }else {
        dx = '小';
    }
    if(sum%2 == 0){
        ds = '双';
    }else {
        ds = '单';
    }
    if(sum == 11){
        ds = '和';
    }
    srt +="<span>"+long(nums[0],nums[4])+"</span>";
    // srt +="<span>"+long(nums[1],nums[8])+"</span>";
    // srt +="<span>"+long(nums[2],nums[7])+"</span>";
    // srt +="<span>"+long(nums[3],nums[6])+"</span>";
    // srt +="<span>"+long(nums[4],nums[5])+"</span>";
    srt +="<span style='color: #bbbbbb'>|</span> 总和: ";
    srt +="<span>"+sum+"</span>";
    srt +="<span>"+dx+"</span>";
    srt +="<span>"+ds+"</span>";
   // console.log(srt);
    return srt;
}






