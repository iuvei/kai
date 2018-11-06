	
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
                $.get('http://m.qx66.com/sfpk10/' + _page, { t: Math.random() }, function (text) {
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
        $.post('../../sfpk10/getPk10AwardTimes.do', { t: Math.random() }, function (data) {
            //console.log(data.next.awardTime);
            var nextOpenIssue = Number(data.next.periodNumber)+1;
            var nextOpenIssues = nextOpenIssue.toString().substr(4);
            var nextOpenTime =data.next.awardTime.substr(0,5);
            $('.nextOpenIssue').html(nextOpenIssues);
            $('.nextOpenTime').html(nextOpenTime);
            $('.openIssue').html(data.current.periodNumber);
            $('.residueIssue').html(data.current.surplus_num);
            $('.totalIssue').html(data.current.current_num);




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
            $("#pk10 #number").html('');
            for(var i=0;i<nums.length;i++){
                html += '<i class="no' + nums[i] + '">' + nums[i] + '</i>';
            }
            $("#pk10 #number").html(html);
            $("#pk10 .bt-jg").html('');
            var srt;
            srt = lh(nums);
            if(srt == undefined || srt == null){

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
            }
            $("#pk10 .bt-jg").html(srt);
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
        $.post('../../sfpk10/getPk10AwardTimes.do', {t: Math.random() }, function (data) {
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
    $.get("../../sfpk10/getHistoryData.do", { count:count,date:date,t: Math.random() }, function (result) {
        if(result&&result.rows){
        	var j = 0;
        	var html = '';
        	for(var i in result.rows){
        		var data = result.rows[i];
        		// var clsName = "even";
                // if (j%2==0) {
                //     clsName = "odd";
                // }
                $('.chooseIssue').append('<option value="'+data.termNum+'">'+data.termNum+'</option>');
                html += '<div class="openCode">';
                html += '<div class="qihao">'+'<div>'+'<span class="Issue">'+data.termNum.substr(4) +'</span>'+'期'+'</div>'+'<div>'+ data.lotteryTime.substring(10, 16)+'</div>'+'</div>';
                html += '<div>'+'<a class="no' + data.n1 + '"'+'name'+'='+'"'+long(data.n1,data.n10 )+'"'+'>' + data.n1 + '</a>'
                +'<a class="pk10'+DXClass(data.n1)+'"  style="display: none">' + DX(data.n1)+ '</a>'
                +'<a class="pk10'+DSClass(data.n1)+'"  style="display: none">' + ds(data.n1)+ '</a>'
                +'</div>';

                html += '<div>'+'<a class="no' + data.n2 + '"'+'name'+'='+'"'+long(data.n2,data.n9 )+'"'+'>' + data.n2 + '</a>'
                    +'<a class="pk10'+DXClass(data.n2)+'"  style="display: none">' + DX(data.n2)+ '</a>'
                    +'<a class="pk10'+DSClass(data.n2)+'"  style="display: none">' + ds(data.n2)+ '</a>'
                    +'</div>';
                html += '<div>'+'<a class="no' + data.n3 + '"'+'name'+'='+'"'+long(data.n3,data.n8 )+'"'+'>' + data.n3 + '</a>'
                    +'<a class="pk10'+DXClass(data.n3)+'"  style="display: none">' + DX(data.n3)+ '</a>'
                    +'<a class="pk10'+DSClass(data.n3)+'"  style="display: none">' + ds(data.n3)+ '</a>'+'</div>';
                html += '<div>'+'<a class="no' + data.n4 + '"'+'name'+'='+'"'+long(data.n4,data.n7 )+'"'+'>' + data.n4 + '</a>'
                    +'<a class="pk10'+DXClass(data.n4)+'"  style="display: none">' + DX(data.n4)+ '</a>'
                    +'<a class="pk10'+DSClass(data.n4)+'"  style="display: none">' + ds(data.n4)+ '</a>'+'</div>';
                html += '<div>'+'<a class="no' + data.n5 + '"'+'name'+'='+'"'+long(data.n5,data.n6 )+'"'+'>' + data.n5 + '</a>'
                    +'<a class="pk10'+DXClass(data.n5)+'"  style="display: none">' + DX(data.n5)+ '</a>'
                    +'<a class="pk10'+DSClass(data.n5)+'"  style="display: none">' + ds(data.n5)+ '</a>'+'</div>';
                html += '<div>'+'<a class="no' + data.n6 + '">' + data.n6 + '</a>'
                    +'<a class="pk10'+DXClass(data.n6)+'"  style="display: none">' + DX(data.n6)+ '</a>'
                    +'<a class="pk10'+DSClass(data.n6)+'"  style="display: none">' + ds(data.n6)+ '</a>'+'</div>';
                html += '<div>'+'<a class="no' + data.n7 + '">' + data.n7 + '</a>'
                    +'<a class="pk10'+DXClass(data.n7)+'"  style="display: none">' + DX(data.n7)+ '</a>'
                    +'<a class="pk10'+DSClass(data.n7)+'"  style="display: none">' + ds(data.n7)+ '</a>'+'</div>';
                html += '<div>'+'<a class="no' + data.n8 + '">' + data.n8 + '</a>'
                    +'<a class="pk10'+DXClass(data.n8)+'"  style="display: none">' + DX(data.n8)+ '</a>'
                    +'<a class="pk10'+DSClass(data.n8)+'"  style="display: none">' + ds(data.n8)+ '</a>'+'</div>';
                html += '<div>'+'<a class="no' + data.n9 + '">' + data.n9 + '</a>'
                    +'<a class="pk10'+DXClass(data.n9)+'"  style="display: none">' + DX(data.n9)+ '</a>'
                    +'<a class="pk10'+DSClass(data.n9)+'"  style="display: none">' + ds(data.n9)+ '</a>'+'</div>';
                html += '<div>'+'<a class="no' + data.n10 + '">' + data.n10 + '</a>'
                    +'<a class="pk10'+DXClass(data.n10)+'"  style="display: none">' + DX(data.n10)+ '</a>'
                    +'<a class="pk10'+DSClass(data.n10)+'"  style="display: none">' + ds(data.n10)+ '</a>'+'</div>';
                html += '</div>';


        		// html += '<li class="' + clsName + '">';
				// html += '<table width="100%">';
				// html += '<tr>';
        		// html += '<td style="width: 20%">' + data.termNum +'期</br>';
				// html += ''+ data.lotteryTime.substring(10, 16)+'</td>';
                // html += '<td class="nums"><div class="nums-div">';
				// html += '<i class="no' + data.n1 + '">' + data.n1 + '</i>';
				// html += '<i class="no' + data.n2 + '">' + data.n2 + '</i>';
				// html += '<i class="no' + data.n3 + '">' + data.n3 + '</i>';
				// html += '<i class="no' + data.n4 + '">' + data.n4 + '</i>';
				// html += '<i class="no' + data.n5 + '">' + data.n5 + '</i>';
				// html += '<i class="no' + data.n6 + '">' + data.n6 + '</i>';
				// html += '<i class="no' + data.n7 + '">' + data.n7 + '</i>';
				// html += '<i class="no' + data.n8 + '">' + data.n8 + '</i>';
				// html += '<i class="no' + data.n9 + '">' + data.n9 + '</i>';
				// html += '<i class="no' + data.n10 + '">' + data.n10 + '</i>';
                // var sum = parseInt(data.n1)+parseInt(data.n2);
                // html += '<div class="bt-jg">' +
                //     '<span>'+long(data.n1,data.n10)+'</span>' +
                //     '<span>'+long(data.n2,data.n9)+'</span>' +
                //     '<span>'+long(data.n3,data.n8)+'</span>' +
                //     '<span>'+long(data.n4,data.n7)+'</span>' +
                //     '<span>'+long(data.n5,data.n6)+'</span>' +
                //     '<span style="color: #bbbbbb">|</span><samp>'+ sum +'</><samp>'+ dx(sum)+'</samp><samp>'+ds(sum)+'</samp></div></div></td>';
                //
                //
                // html += '</tr>';
				// html += '</table>';
				// html += '</li>';
                j++;
        	}
			
        	$("#historyList").html(html);

        }else {
			 $("#historyList").html("<p>对不起，今天暂无数据，请按日期检索！</p>");
			}
    }, "json");
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


$(function () {

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

    /*筛选类型*/
    $('#chooseType a').click(function () {
        arr=[];
        $('#chooseNum a').removeClass('chooseTypeColor')
        $('.openCode a').removeClass('pk10BallNoColor');
        $('.choose').hide();

        $('#chooseType a').removeClass('chooseTypeColor');
        $('#chooseType2 a').removeClass('chooseTypeColor');
        $(this).addClass('chooseTypeColor');
        if( $(this).text()=='筛选'){
            $('.openCode a').show();
            $('.pk10Da').hide();
            $('.pk10Xiao').hide();
            $('.pk10Dan').hide();
            $('.pk10Shuang').hide();
            $('.choose').show();
        }else if($(this).text()=='大小'){
            $('.openCode a').hide();
            $('.pk10Dan').hide();
            $('.pk10Shuang').hide();
            $('.pk10Da').show();
            $('.pk10Xiao').show();
        }else if($(this).text()=='单双'){
            $('.openCode a').hide();
            $('.pk10Da').hide();
            $('.pk10Xiao').hide();
            $('.pk10Dan').show();
            $('.pk10Shuang').show();
        }else if($(this).text()=='号码'){
            $('.openCode a').show();
            $('.pk10Da').hide();
            $('.pk10Xiao').hide();
            $('.pk10Dan').hide();
            $('.pk10Shuang').hide();
        }

    });
    /*筛选数字*/
    var arr=[]
    $('#chooseNum a').click(function () {

        $('.openCode a').addClass('pk10BallNoColor');
        $('#chooseType2 a').removeClass('chooseTypeColor');
        if(arr.toString().indexOf($(this).text())!= -1){
            $(this).removeClass('chooseTypeColor');
            arr.splice($.inArray($(this).text(), arr), 1)
        }else {
            $(this).addClass('chooseTypeColor');
            arr.push($(this).text());
        }
        for (var i=0;i< $('.openCode a').text().length;i++){

            if($.inArray( $('.openCode a').eq([i]).text(),arr)!=-1){
                $('.openCode a').eq([i]).removeClass('pk10BallNoColor')
            }
        }
    });


    /*筛选类型*/
    $('#chooseType2 a').click(function () {
        $('#chooseNum a').removeClass('chooseTypeColor');
        $('#chooseType2 a').removeClass('chooseTypeColor');
        $(this).addClass('chooseTypeColor');
        if( $(this).text()=='还原'){
            arr=[];
            $('#chooseNum a').removeClass('chooseTypeColor')
            $('.openCode a').removeClass('pk10BallNoColor');
            $('.choose').hide();
        }else if($(this).text()=='大'){
            $('.openCode a').addClass('pk10BallNoColor');
            for (var i=0;i<$('.openCode a').text().length;i++){
                if($('.openCode a').eq([i]).text()>=5){
                    $('.openCode a').eq([i]).removeClass('pk10BallNoColor')
                }
            }
        }else if($(this).text()=='小'){
            $('.openCode a').addClass('pk10BallNoColor');
            for (var i=0;i<$('.openCode a').text().length;i++){
                if($('.openCode a').eq([i]).text()<5){
                    $('.openCode a').eq([i]).removeClass('pk10BallNoColor')
                }
            }
        }else if($(this).text()=='单'){
            $('.openCode a').addClass('pk10BallNoColor');
            for (var i=0;i<$('.openCode a').text().length;i++){
                if($('.openCode a').eq([i]).text()%2!=0){
                    $('.openCode a').eq([i]).removeClass('pk10BallNoColor')
                }
            }
        }else if($(this).text()=='双'){
            $('.openCode a').addClass('pk10BallNoColor');
            for (var i=0;i<$('.openCode a').text().length;i++){
                if($('.openCode a').eq([i]).text()%2==0){
                    $('.openCode a').eq([i]).removeClass('pk10BallNoColor')
                }
            }
        }else if($(this).text()=='龙'){
            $('.openCode a').addClass('pk10BallNoColor');
            for (var i=0;i<$('.openCode a').text().length;i++){
                if($('.openCode a').eq(i).attr('name')=='龙'){
                    $('.openCode a').eq([i]).removeClass('pk10BallNoColor')
                }
            }
        }else if($(this).text()=='虎'){
            $('.openCode a').addClass('pk10BallNoColor');
            for (var i=0;i<$('.openCode a').text().length;i++){
                if($('.openCode a').eq(i).attr('name')=='虎'){
                    $('.openCode a').eq([i]).removeClass('pk10BallNoColor')
                }
            }
        }

    })

});



