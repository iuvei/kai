$(function () {
    var cq_currentPeriodNumber = -1;
    var pk10_currentPeriodNumber = -1;
    var gd_currentPeriodNumber = -1;

    /*var cq_awardTick = function () {
     $.get('cqssc/ajax?' + Math.random(), { ajaxhandler: 'GetCqsscAwardData' }, function (data) {
     if ((data.current.periodNumber != cq_currentPeriodNumber)) {
     var nums = data.current.awardNumbers.split(',');
     var str = "";
     for (var i = 0; i < nums.length; i++) {
     str = str + "<span>" + nums[i] + "</span>";
     }
     $(".awardCont02 .cqssc-nums").html(str);
     var _date = data.current.awardTime.substring(0, 10).replace('-', '').replace('-', '');
     var _time = data.current.awardTime.substring(11, 16);
     $(".awardCont02 .period").html(_date + "-" + data.current.periodNumber + " " + _time);

     }

     cq_currentPeriodNumber = data.current.periodNumber;

     window.setTimeout(cq_awardTick, data.next.awardTimeInterval < 10 ? 10000 : data.next.awardTimeInterval);
     }, 'json');
     };*/

    var pk10_awardTick = function () {
        $.get('pk10/getPk10AwardData.do?' + Math.random(), { ajaxhandler: 'GetPk10AwardData' }, function (data) {
            if(!data)
                return;
            if ((data.current.periodNumber != pk10_currentPeriodNumber)) {
                $("#pk10_hot .numberbox").html("");
                $("#pk10 .numberbox").html("");
                $("#pk10_hot .longhu").html("");
                $("#pk10 .longhu").html("");
                var nums = data.current.awardNumbers.split(',');
                var str = "";
                for (var i = 0; i < nums.length; i++) {
                   // str += ;
                    if(nums[i] == 10){
                        $("#pk10_hot .numberbox").append("<li class='nub" + nums[i] + "'></li>");
                        $("#pk10 .numberbox").append("<li class='nub" + nums[i] + "'></li>");
                    }else {
                        $("#pk10_hot .numberbox").append("<li class='nub0" + nums[i] + "'></li>");
                        $("#pk10 .numberbox").append("<li class='nub0" + nums[i] + "'></li>");
                    }
                   //alert(nums[i]);
                }
                if(Number(nums[0]) > nums[9] ){
                    $("#pk10_hot .longhu").append("<td>龙</td>");
                    $("#pk10 .longhu").append("<td>龙</td>");
                }else if(Number(nums[0]) < nums[9]) {
                    $("#pk10_hot .longhu").append("<td>虎</td>");
                    $("#pk10 .longhu").append("<td>虎</td>");
                }else {
                    $("#pk10_hot .longhu").append("<td>和</td>");
                    $("#pk10 .longhu").append("<td>和</td>");
                }
                if(Number(nums[1]) >nums[8] ){
                    $("#pk10_hot .longhu").append("<td>龙</td>");
                    $("#pk10 .longhu").append("<td>龙</td>");
                }else if(Number(nums[1]) <nums[8]) {
                    $("#pk10_hot .longhu").append("<td>虎</td>");
                    $("#pk10 .longhu").append("<td>虎</td>");
                }else {
                    $("#pk10_hot .longhu").append("<td>和</td>");
                    $("#pk10 .longhu").append("<td>和</td>");
                }
                if(Number(nums[2]) >Number(nums[7]) ){
                    $("#pk10_hot .longhu").append("<td>龙</td>");
                    $("#pk10 .longhu").append("<td>龙</td>");
                }else if(Number(nums[2]) < Number(nums[7])) {
                    $("#pk10_hot .longhu").append("<td>虎</td>");
                    $("#pk10 .longhu").append("<td>虎</td>");
                }else {
                    $("#pk10_hot .longhu").append("<td>和</td>");
                    $("#pk10 .longhu").append("<td>和</td>");
                }
                if(Number(nums[3]) >Number(nums[6]) ){
                    $("#pk10_hot .longhu").append("<td>龙</td>");
                    $("#pk10 .longhu").append("<td>龙</td>");
                }else if(Number(nums[3]) <Number(nums[6]) ){
                    $("#pk10_hot .longhu").append("<td>虎</td>");
                    $("#pk10 .longhu").append("<td>虎</td>");
                }else {
                    $("#pk10_hot .longhu").append("<td>和</td>");
                    $("#pk10 .longhu").append("<td>和</td>");
                }

                if(Number(nums[4]) > Number(nums[5])){
                    $("#pk10_hot .longhu").append("<td>龙</td>");
                    $("#pk10 .longhu").append("<td>龙</td>");
                }else if( Number(nums[4]) < Number(nums[5])){
                    $("#pk10_hot .longhu").append("<td>虎</td>");
                    $("#pk10 .longhu").append("<td>虎</td>");
                }else {
                    $("#pk10_hot .longhu").append("<td>和</td>");
                    $("#pk10 .longhu").append("<td>和</td>");
                }
                var num = Number(nums[0])+ Number(nums[1]);
                $("#pk10_hot .longhu").append("<td class='sumFS'>"+ num +"</td>");
                $("#pk10 .longhu").append("<td class='sumFS'>"+ num +"</td>");
               // alert( Number(nums[0])+ Number(nums[3]));
                if(num <= 11){
                    $("#pk10_hot .longhu").append("<td class='sumBigSamll'>小</td>");
                    $("#pk10 .longhu").append("<td class='sumBigSamll'>小</td>");
                }else {
                    $("#pk10_hot .longhu").append("<td class='sumBigSamll'>大</td>");
                    $("#pk10 .longhu").append("<td class='sumBigSamll'>大</td>");
                }
                if(num%2 ==0)
                {
                    $("#pk10_hot .longhu").append("<td class='sumSingleDouble'>双</td>");
                    $("#pk10 .longhu").append("<td class='sumSingleDouble'>双</td>");
                }else {
                    $("#pk10_hot .longhu").append("<td class='sumSingleDouble'>单</td>");
                    $("#pk10 .longhu").append("<td class='sumSingleDouble'>单</td>");
                }

                cpNumber = data.current.periodNumber;
                var _time = data.current.awardTime.substring(11, 16);
              //  $(".num_ul .preDrawIssue").html(data.current.periodNumber);
                $("#pk10_hot .drawCount").html(data.next.periodNumber);
                $("#pk10 .drawCount").html(data.next.periodNumber);
                $("#pk10_hot .sdrawCountnext").html(data.firstPeriod+179-cpNumber);
                $("#pk10 .sdrawCountnext").html(data.firstPeriod+179-cpNumber);

                //drawTrend();
            }
            pk10_currentPeriodNumber = data.current.periodNumber;
            window.setTimeout(pk10_awardTick, data.next.awardTimeInterval < 10 ? 10000 : data.next.awardTimeInterval);
        }, 'json');
    };

    var xyft_awardTick = function () {
        $.get('xyft/getPk10AwardData.do?' + Math.random(), { ajaxhandler: 'GetPk10AwardData' }, function (data) {
            if(!data)
                return;
            if ((data.current.periodNumber != pk10_currentPeriodNumber)) {
                $("#xyft .numberbox").html("");
                $("#xyft .longhu").html("");
                var nums = data.current.awardNumbers.split(',');
                var str = "";
                for (var i = 0; i < nums.length; i++) {
                    // str += ;
                    if(nums[i] == 10){
                        $("#xyft .numberbox").append("<li class='nub" + nums[i] + "'></li>");
                    }else {
                        $("#xyft .numberbox").append("<li class='nub0" + nums[i] + "'></li>");
                    }
                    //alert(nums[i]);
                }
                if(Number(nums[0]) > nums[9] ){
                    $("#xyft .longhu").append("<td>龙</td>");
                }else if(Number(nums[0]) < nums[9]) {
                    $("#xyft .longhu").append("<td>虎</td>");
                }else {
                    $("#xyft .longhu").append("<td>和</td>");
                }
                if(Number(nums[1]) >nums[8] ){
                    $("#xyft .longhu").append("<td>龙</td>");
                }else if(Number(nums[1]) <nums[8]) {
                    $("#xyft .longhu").append("<td>虎</td>");
                }else {
                    $("#xyft .longhu").append("<td>和</td>");
                }
                if(Number(nums[2]) >Number(nums[7]) ){
                    $("#xyft .longhu").append("<td>龙</td>");
                }else if(Number(nums[2]) < Number(nums[7])) {
                   // $("#pk10_hot .longhu").append("<td>虎</td>");
                    $("#xyft .longhu").append("<td>虎</td>");
                }else {
                    $("#xyft .longhu").append("<td>和</td>");
                }
                if(Number(nums[3]) >Number(nums[6]) ){
                    $("#xyft .longhu").append("<td>龙</td>");
                }else if(Number(nums[3]) <Number(nums[6]) ){
                    $("#xyft .longhu").append("<td>虎</td>");
                }else {
                    $("#xyft .longhu").append("<td>和</td>");
                }

                if(Number(nums[4]) > Number(nums[5])){
                    $("#xyft .longhu").append("<td>龙</td>");
                }else if( Number(nums[4]) < Number(nums[5])){
                    $("#xyft .longhu").append("<td>虎</td>");
                }else {
                    $("#xyft .longhu").append("<td>和</td>");
                }
                var num = Number(nums[0])+ Number(nums[1]);
                $("#xyft .longhu").append("<td class='sumFS'>"+ num +"</td>");
                // alert( Number(nums[0])+ Number(nums[3]));
                if(num <= 11){
                    $("#xyft .longhu").append("<td class='sumBigSamll'>小</td>");
                }else {
                    $("#xyft .longhu").append("<td class='sumBigSamll'>大</td>");
                }
                if(num%2 ==0)
                {
                    $("#xyft .longhu").append("<td class='sumSingleDouble'>双</td>");
                }else {
                    $("#xyft .longhu").append("<td class='sumSingleDouble'>单</td>");
                }

                cpNumber = data.current.periodNumber;
                var _time = data.current.awardTime.substring(11, 16);
                //  $(".num_ul .preDrawIssue").html(data.current.periodNumber);
                $("#xyft .drawCount").html(data.next.periodNumber);
                $("#xyft .sdrawCountnext").html(data.firstPeriod+179-cpNumber);

                //drawTrend();
            }
            pk10_currentPeriodNumber = data.current.periodNumber;
            window.setTimeout(pk10_awardTick, data.next.awardTimeInterval < 10 ? 10000 : data.next.awardTimeInterval);
        }, 'json');
    };

    var jssc_awardTick = function () {
        $.get('jssc/getPk10AwardData.do?' + Math.random(), { ajaxhandler: 'GetPk10AwardData' }, function (data) {
            if(!data)
                return;
            if ((data.current.periodNumber != pk10_currentPeriodNumber)) {
                $("#jisusc .longhu").html("");
                $("#jisusc .numberbox").html("");
                var nums = data.current.awardNumbers.split(',');
                var str = "";
                for (var i = 0; i < nums.length; i++) {
                    // str += ;
                    if(nums[i] == 10){
                        $("#jisusc .numberbox").append("<li class='nub" + nums[i] + "'></li>");
                    }else {
                        $("#jisusc .numberbox").append("<li class='nub0" + nums[i] + "'></li>");
                    }
                    //alert(nums[i]);
                }
                if(Number(nums[0]) > nums[9] ){
                    $("#jisusc .longhu").append("<td>龙</td>");
                }else if(Number(nums[0]) < nums[9]) {
                    $("#jisusc .longhu").append("<td>虎</td>");
                }else {
                    $("#jisusc .longhu").append("<td>和</td>");
                }
                if(Number(nums[1]) >nums[8] ){
                    $("#jisusc .longhu").append("<td>龙</td>");
                }else if(Number(nums[1]) <nums[8]) {
                    $("#jisusc .longhu").append("<td>虎</td>");
                }else {
                    $("#jisusc .longhu").append("<td>和</td>");
                }
                if(Number(nums[2]) >Number(nums[7]) ){
                    $("#jisusc .longhu").append("<td>龙</td>");
                }else if(Number(nums[2]) < Number(nums[7])) {
                    $("#jisusc .longhu").append("<td>虎</td>");
                }else {
                    $("#jisusc .longhu").append("<td>和</td>");
                }
                if(Number(nums[3]) >Number(nums[6]) ){
                    $("#jisusc .longhu").append("<td>龙</td>");
                }else if(Number(nums[3]) <Number(nums[6]) ){
                    $("#jisusc .longhu").append("<td>虎</td>");
                }else {
                    $("#jisusc .longhu").append("<td>和</td>");
                }

                if(Number(nums[4]) > Number(nums[5])){

                    $("#jisusc .longhu").append("<td>龙</td>");
                }else if( Number(nums[4]) < Number(nums[5])){

                    $("#jisusc .longhu").append("<td>虎</td>");
                }else {
                    $("#jisusc .longhu").append("<td>和</td>");
                }
                var num = Number(nums[0])+ Number(nums[1]);
                $("#jisusc .longhu").append("<td class='sumFS'>"+ num +"</td>");
                // alert( Number(nums[0])+ Number(nums[3]));
                if(num <= 11){
                    $("#jisusc .longhu").append("<td class='sumBigSamll'>小</td>");
                }else {
                    $("#jisusc .longhu").append("<td class='sumBigSamll'>大</td>");
                }
                if(num%2 ==0)
                {
                    $("#jisusc .longhu").append("<td class='sumSingleDouble'>双</td>");
                }else {
                    $("#jisusc .longhu").append("<td class='sumSingleDouble'>单</td>");
                }

                cpNumber = data.current.periodNumber;
                var _time = data.current.awardTime.substring(11, 16);
                //  $(".num_ul .preDrawIssue").html(data.current.periodNumber);
                $("#jisusc .drawCount").html(data.next.periodNumber);
                $("#jisusc .sdrawCountnext").html(data.firstPeriod+179-cpNumber);

            }
            pk10_currentPeriodNumber = data.current.periodNumber;
            window.setTimeout(pk10_awardTick, data.next.awardTimeInterval < 10 ? 10000 : data.next.awardTimeInterval);
        }, 'json');
    };


    var cqssc_awardTick = function () {
        $.get('cqssc/getCqsscAwardData.do?' + Math.random(), { ajaxhandler: 'GetPk10AwardData' }, function (data) {
            if(!data)
                return;
            if ((data.current.periodNumber != pk10_currentPeriodNumber)) {
                $("#kajianhao5").html("");
                $("#kajianhao").html("");
                var nums = data.current.awardNumbers.split(',');
                var str = Number(nums[0])+Number(nums[1])+Number(Number(nums[2]))+Number(nums[3])+Number(nums[4]);
              //  cpNumber = data.current.periodNumber;

                    $("#cqSsc_hot").find(".sumNum").text(str),
                    $("#cqSsc_hot").find(".sumSingleDouble").text(str%2 == 0 ? "单" : "双"),
                    $("#cqSsc_hot").find(".sumBigSmall").text(str > 23 ? "大" : "小");
                    $("#cqSsc").find(".sumNum").text(str),
                    $("#cqSsc").find(".sumSingleDouble").text(str%2 == 0 ? "单" : "双"),
                    $("#cqSsc").find(".sumBigSmall").text(str > 23 ? "大" : "小");
                for (var i = 0; i < nums.length; i++) {
                    // str += ;
                    if(nums[i] == 10){
                        $("#kajianhao").append("<li class='numblueHead'>"+nums[i]+"</li>");
                        $("#kajianhao5").append("<li class='numblueHead'>"+nums[i]+"</li>");
                    }else {
                        $("#kajianhao5").append("<li class='numblueHead'>"+nums[i]+"</li>");
                        $("#kajianhao").append("<li class='numblueHead'>"+nums[i]+"</li>");
                    }
                }
                if(Number(nums[0]) < Number(nums[4])){
                    $("#cqSsc_hot").find(".dragonTiger").text("虎");
                    $("#cqSsc").find(".dragonTiger").text("虎");
                }else if( Number(nums[0]) > Number(nums[4])){
                    $("#cqSsc").find(".dragonTiger").text("龙");
                    $("#cqSsc_hot").find(".dragonTiger").text("龙");
                  //  $("#longhu2").append("<td class='dragonTiger'>龙&nbsp;&nbsp;</td>");
                }else {
                    $("#cqSsc_hot").find(".dragonTiger").text("和");
                    $("#cqSsc").find(".dragonTiger").text("和");
                    //$("#longhu2").append("<td class='dragonTiger'>和&nbsp;&nbsp;</td>");
                }
              //  var type = typeOf(nums);
                if ((Number(nums[0]) == Number(nums[1])) && (Number(nums[0]) == Number(nums[2]))) {
                    type = '豹子';
                } else if (((Number(nums[1]) - Number(nums[0])) == (Number(nums[2]) - Number(nums[1]))) && ((Number(nums[1]) - Number(nums[0])) == 1) || (nums == Array(0, 8, 9) || nums == Array(0, 1, 9))) {
                    type = '顺子';
                } else if (Number(nums[0]) == Number(nums[1]) || Number(nums[1]) == Number(nums[2])) {
                    type = '对子';
                } else if ((Number(nums[1]) - Number(nums[0])) == 1 || (Number(nums[2]) - Number(nums[1])) == 1) {
                    type = '半顺';
                } else {
                    type = '杂六';
                }
                $("#longhu2").find(".behindThree").text(type);
                $("#cqSsc .longhu2").find(".behindThree").text(type);
                var type1 = '';
               if ((Number(nums[1]) == Number(nums[2])) && (Number(nums[1]) == Number(nums[3]))) {
            type1 = '豹子';
        } else if (((Number(nums[2]) - Number(nums[1])) == (Number(nums[3]) - Number(nums[2]))) && ((Number(nums[2]) - Number(nums[1])) == 1) || (nums == Array(0, 8, 9) || nums == Array(0, 1, 9))) {
            type1 = '顺子';
        } else if (Number(nums[1]) == Number(nums[2]) || Number(nums[2]) == Number(nums[3])) {
            type1 = '对子';
        } else if ((Number(nums[2]) - Number(nums[1])) == 1 || (Number(nums[3]) - Number(nums[2])) == 1) {
            type1= '半顺';
        } else {
            type1 = '杂六';
        }
                $("#longhu2").find(".betweenThree").text(type1);
                $("#cqSsc .longhu2").find(".betweenThree").text(type1);
                var type2 = '';
                if ((Number(nums[2]) == Number(nums[3])) && (Number(nums[2]) == Number(nums[4]))) {
                    type2 = '豹子';
                } else if (((Number(nums[3]) - Number(nums[2])) == (Number(nums[4]) - Number(nums[3]))) && ((Number(nums[3]) - Number(nums[2])) == 1) || (nums == Array(0, 8, 9) || nums == Array(0, 1, 9))) {
                    type2 = '顺子';
                } else if (Number(nums[2]) == Number(nums[3]) || Number(nums[3]) == Number(nums[4])) {
                    type2 = '对子';
                } else if ((Number(nums[3]) - Number(nums[2])) == 1 || (Number(nums[4]) - Number(nums[3])) == 1) {
                    type2= '半顺';
                } else {
                    type2 = '杂六';
                }
                $("#longhu2").find(".lastThree").text(type2);
                $("#cqSsc .longhu2").find(".lastThree").text(type2);
                cpNumber = data.current.periodNumber;
                var _time = data.current.awardTime.substring(11, 16);
                  $("#cqSsc .preDrawIssue").html(data.next.periodNumber);
                $("#cqSsc_hot .drawCount").html(data.next.periodNumber);
                $("#cqSsc_hot .sdrawCountnext").html(data.firstPeriod+179-cpNumber);
                //$("#cqSsc .drawCount").html(data.next.periodNumber);
                $("#cqSsc .sdrawCountnext").html(data.firstPeriod+179-cpNumber);

                //drawTrend();
            }
            pk10_currentPeriodNumber = data.current.periodNumber;
            window.setTimeout(cqssc_awardTick, data.next.awardTimeInterval < 10 ? 10000 : data.next.awardTimeInterval);
        }, 'json');
    };

    var tjssc_awardTick = function () {
        $.get('tjssc/gettjsscAwardData.do?' + Math.random(), { ajaxhandler: 'GetPk10AwardData' }, function (data) {
            if(!data)
                return;
            if ((data.current.periodNumber != pk10_currentPeriodNumber)) {
                var nums = data.current.awardNumbers.split(',');
                var str = Number(nums[0])+Number(nums[1])+Number(Number(nums[2]))+Number(nums[3])+Number(nums[4]);
                //  cpNumber = data.current.periodNumber;

                $("#tjSsc").find(".sumNum").text(str),
                    $("#tjSsc").find(".sumSingleDouble").text(str%2 == 0 ? "单" : "双"),
                    $("#tjSsc").find(".sumBigSmall").text(str > 23 ? "大" : "小");
                for (var i = 0; i < nums.length; i++) {
                    // str += ;
                    if(nums[i] == 10){
                        $("#kajianhao2").append("<li class='numblueHead'>"+nums[i]+"</li>");
                    }else {
                        $("#kajianhao2").append("<li class='numblueHead'>"+nums[i]+"</li>");
                    }
                    //alert(nums[i]);
                }

                if(Number(nums[0]) < Number(nums[4])){
                    $("#tjSsc").find(".dragonTiger").text("虎");
                }else if( Number(nums[0]) > Number(nums[4])){
                    $("#tjSsc").find(".dragonTiger").text("龙");
                    //  $("#longhu2").append("<td class='dragonTiger'>龙&nbsp;&nbsp;</td>");
                }else {
                    $("#tjSsc").find(".dragonTiger").text("和");
                    //$("#longhu2").append("<td class='dragonTiger'>和&nbsp;&nbsp;</td>");
                }

                $("#tjSsc").find(".behindThree").text(typeOf("san", nun[0]));
                $("#tjSsc").find(".betweenThree").text(typeOf("san", nun[2]));
                $("#tjSsc").find(".lastThree").text(typeOf("san", nun[3]));

                if ((Number(nums[0]) == Number(nums[1])) && (Number(nums[0]) == Number(nums[2]))) {
                    type = '豹子';
                } else if (((Number(nums[1]) - Number(nums[0])) == (Number(nums[2]) - Number(nums[1]))) && ((Number(nums[1]) - Number(nums[0])) == 1) || (nums == Array(0, 8, 9) || nums == Array(0, 1, 9))) {
                    type = '顺子';
                } else if (Number(nums[0]) == Number(nums[1]) || Number(nums[1]) == Number(nums[2])) {
                    type = '对子';
                } else if ((Number(nums[1]) - Number(nums[0])) == 1 || (Number(nums[2]) - Number(nums[1])) == 1) {
                    type = '半顺';
                } else {
                    type = '杂六';
                }
                $("#tjSsc").find(".behindThree").text(type);
                var type1 = '';
               if ((Number(nums[1]) == Number(nums[2])) && (Number(nums[1]) == Number(nums[3]))) {
            type1 = '豹子';
        } else if (((Number(nums[2]) - Number(nums[1])) == (Number(nums[3]) - Number(nums[2]))) && ((Number(nums[2]) - Number(nums[1])) == 1) || (nums == Array(0, 8, 9) || nums == Array(0, 1, 9))) {
            type1 = '顺子';
        } else if (Number(nums[1]) == Number(nums[2]) || Number(nums[2]) == Number(nums[3])) {
            type1 = '对子';
        } else if ((Number(nums[2]) - Number(nums[1])) == 1 || (Number(nums[3]) - Number(nums[2])) == 1) {
            type1= '半顺';
        } else {
            type1 = '杂六';
        }
                $("#tjSsc").find(".betweenThree").text(type1);
                var type2 = '';
                if ((Number(nums[2]) == Number(nums[3])) && (Number(nums[2]) == Number(nums[4]))) {
                    type2 = '豹子';
                } else if (((Number(nums[3]) - Number(nums[2])) == (Number(nums[4]) - Number(nums[3]))) && ((Number(nums[3]) - Number(nums[2])) == 1) || (nums == Array(0, 8, 9) || nums == Array(0, 1, 9))) {
                    type2 = '顺子';
                } else if (Number(nums[2]) == Number(nums[3]) || Number(nums[3]) == Number(nums[4])) {
                    type2 = '对子';
                } else if ((Number(nums[3]) - Number(nums[2])) == 1 || (Number(nums[4]) - Number(nums[3])) == 1) {
                    type2= '半顺';
                } else {
                    type2 = '杂六';
                }
                $("#tjSsc").find(".lastThree").text(type2);
                cpNumber = data.current.periodNumber;
                var _time = data.current.awardTime.substring(11, 16);
                //  $(".num_ul .preDrawIssue").html(data.current.periodNumber);
                $("#tjSsc .drawCount").html(data.next.periodNumber);
                $("#tjSsc .sdrawCountnext").html(data.firstPeriod+179-cpNumber);

                //drawTrend();
            }
            pk10_currentPeriodNumber = data.current.periodNumber;
            window.setTimeout(tjssc_awardTick, data.next.awardTimeInterval < 10 ? 10000 : data.next.awardTimeInterval);
        }, 'json');
    };

    var jsssc_awardTick = function () {
        $.get('jsssc/getCqsscAwardData.do?' + Math.random(), { ajaxhandler: 'GetPk10AwardData' }, function (data) {
            if(!data)
                return;
            if ((data.current.periodNumber != pk10_currentPeriodNumber)) {
                var nums = data.current.awardNumbers.split(',');
                var str = Number(nums[0])+Number(nums[1])+Number(Number(nums[2]))+Number(nums[3])+Number(nums[4]);
                //  cpNumber = data.current.periodNumber;

                $("#jsssc").find(".sumNum").text(str),
                    $("#jsssc").find(".sumSingleDouble").text(str%2 == 0 ? "双" : "单"),
                    $("#jsssc").find(".sumBigSmall").text(str > 23 ? "大" : "小");
                for (var i = 0; i < nums.length; i++) {
                    // str += ;
                    if(nums[i] == 10){
                        $("#kajianhao3").append("<li class='numblueHead'>"+nums[i]+"</li>");
                    }else {
                        $("#kajianhao3").append("<li class='numblueHead'>"+nums[i]+"</li>");
                    }
                    //alert(nums[i]);
                }

                if(Number(nums[0]) < Number(nums[4])){
                    $("#jsssc").find(".dragonTiger").text("虎");
                }else if( Number(nums[0]) > Number(nums[4])){
                    $("#jsssc").find(".dragonTiger").text("龙");
                    //  $("#longhu2").append("<td class='dragonTiger'>龙&nbsp;&nbsp;</td>");
                }else {
                    $("#jsssc").find(".dragonTiger").text("和");
                    //$("#longhu2").append("<td class='dragonTiger'>和&nbsp;&nbsp;</td>");
                }

                if ((Number(nums[0]) == Number(nums[1])) && (Number(nums[0]) == Number(nums[2]))) {
                    type = '豹子';
                } else if (((Number(nums[1]) - Number(nums[0])) == (Number(nums[2]) - Number(nums[1]))) && ((Number(nums[1]) - Number(nums[0])) == 1) || (nums == Array(0, 8, 9) || nums == Array(0, 1, 9))) {
                    type = '顺子';
                } else if (Number(nums[0]) == Number(nums[1]) || Number(nums[1]) == Number(nums[2])) {
                    type = '对子';
                } else if ((Number(nums[1]) - Number(nums[0])) == 1 || (Number(nums[2]) - Number(nums[1])) == 1) {
                    type = '半顺';
                } else {
                    type = '杂六';
                }
                $("#jsssc").find(".behindThree").text(type);
                var type1 = '';
               if ((Number(nums[1]) == Number(nums[2])) && (Number(nums[1]) == Number(nums[3]))) {
            type1 = '豹子';
        } else if (((Number(nums[2]) - Number(nums[1])) == (Number(nums[3]) - Number(nums[2]))) && ((Number(nums[2]) - Number(nums[1])) == 1) || (nums == Array(0, 8, 9) || nums == Array(0, 1, 9))) {
            type1 = '顺子';
        } else if (Number(nums[1]) == Number(nums[2]) || Number(nums[2]) == Number(nums[3])) {
            type1 = '对子';
        } else if ((Number(nums[2]) - Number(nums[1])) == 1 || (Number(nums[3]) - Number(nums[2])) == 1) {
            type1= '半顺';
        } else {
            type1 = '杂六';
        }
                $("#jsssc").find(".betweenThree").text(type1);
                var type2 = '';
                if ((Number(nums[2]) == Number(nums[3])) && (Number(nums[2]) == Number(nums[4]))) {
                    type2 = '豹子';
                } else if (((Number(nums[3]) - Number(nums[2])) == (Number(nums[4]) - Number(nums[3]))) && ((Number(nums[3]) - Number(nums[2])) == 1) || (nums == Array(0, 8, 9) || nums == Array(0, 1, 9))) {
                    type2 = '顺子';
                } else if (Number(nums[2]) == Number(nums[3]) || Number(nums[3]) == Number(nums[4])) {
                    type2 = '对子';
                } else if ((Number(nums[3]) - Number(nums[2])) == 1 || (Number(nums[4]) - Number(nums[3])) == 1) {
                    type2= '半顺';
                } else {
                    type2 = '杂六';
                }
                $("#jsssc").find(".lastThree").text(type2);
                cpNumber = data.current.periodNumber;
                var _time = data.current.awardTime.substring(11, 16);
                //  $(".num_ul .preDrawIssue").html(data.current.periodNumber);
                $("#jsssc .drawCount").html(data.next.periodNumber);
                $("#jsssc .sdrawCountnext").html(data.firstPeriod+179-cpNumber);


                //drawTrend();
            }
            pk10_currentPeriodNumber = data.current.periodNumber;
            window.setTimeout(tjssc_awardTick, data.next.awardTimeInterval < 10 ? 10000 : data.next.awardTimeInterval);
        }, 'json');
    };

<<<<<<< HEAD
=======
    var gdkl10_awardTick = function () {
        $.get('gdkl10/getGdkl10AwardData.do?' + Math.random(), {ajaxhandler: 'GetPk10AwardData'}, function (data) {
            if (!data)
                return;
            if ((data.current.periodNumber != pk10_currentPeriodNumber)) {
                $("#gdkl10 .kajianhao").html("");
                var nums = data.current.awardNumbers.split(',');
                var str = Number(nums[0]) + Number(nums[1]) + Number(Number(nums[2])) + Number(nums[3]) + Number(nums[4]);
                //  cpNumber = data.current.periodNumber;
                for (var i = 0; i < nums.length; i++) {
                    $("#gdkl10 .kajianhao").append("<li class='numblueHead'>" + nums[i] + "</li>");
                }
                $("#gdkl10").find(".sumNum").text(str),
                    $("#gdkl10").find(".sumSingleDouble").text(str % 2 == 0 ? "单" : "双"),
                    $("#gdkl10").find(".sumBigSmall").text(str > 23 ? "大" : "小");
                var str_2 = String(str);
                if (str_2.charAt(str_2.length - 1) > 5) {
                    $("#gdkl10 .longhu2").find(".lastBigSmall").text("尾大");
                } else {
                    $("#gdkl10 .longhu2").find(".lastBigSmall").text("尾小");
                }

                if (Number(nums[0]) < Number(nums[7])) {
                    $("#gdkl10 .longhu2").find(".firstDragonTiger").text("虎");
                } else if (Number(nums[0]) > Number(nums[7])) {
                    $("#gdkl10 .longhu2").find(".firstDragonTiger").text("龙");
                } else {
                    $("#gdkl10 .longhu2").find(".firstDragonTiger").text("和");
                }
                if (Number(nums[1]) < Number(nums[6])) {
                    $("#gdkl10 .longhu2").find(".secondDragonTiger").text("虎");
                } else if (Number(nums[1]) > Number(nums[6])) {
                    $("#gdkl10 .longhu2").find(".secondDragonTiger").text("龙");
                } else {
                    $("#gdkl10 .longhu2").find(".secondDragonTiger").text("和");
                }
                if (Number(Number(nums[2])) < Number(nums[5])) {
                    $("#gdkl10 .longhu2").find(".thirdDragonTiger").text("虎");
                } else if (Number(Number(nums[2])) > Number(nums[5])) {
                    $("#gdkl10 .longhu2").find(".thirdDragonTiger").text("龙");
                } else {
                    $("#gdkl10 .longhu2").find(".thirdDragonTiger").text("和");
                }
                if (Number(nums[3]) < Number(nums[4])) {
                    $("#gdkl10 .longhu2").find(".fourthDragonTiger").text("虎");
                } else if (Number(nums[4]) < Number(nums[3])) {
                    $("#gdkl10 .longhu2").find(".fourthDragonTiger").text("龙");
                } else {
                    $("#gdkl10 .longhu2").find(".fourthDragonTiger").text("和");
                }

                cpNumber = data.current.periodNumber;
                var _time = data.current.awardTime.substring(11, 16);
                //  $(".num_ul .preDrawIssue").html(data.current.periodNumber);
                $("#gdkl10 .drawCount").html(data.next.periodNumber);
                $("#gdkl10 .sdrawCountnext").html(data.firstPeriod + 179 - cpNumber);
            }
            ;
        });
    };
>>>>>>> 46e754f58d2cf3dd15893025fc47ca0e3712e46b
    var gd11x5_awardTick = function () {
        $.get('gd11x5/getgd11x5AwardData.do?' + Math.random(), { ajaxhandler: 'GetPk10AwardData' }, function (data) {
            if(!data)
                return;
            if ((data.current.periodNumber != pk10_currentPeriodNumber)) {

                $("#gd11x5 .kajianhao").html("");
                var nums = data.current.awardNumbers.split(',');
                var str = Number(nums[0])+Number(nums[1])+Number(nums[2])+Number(nums[3])+Number(nums[4]);
                //  cpNumber = data.current.periodNumber;

                $("#gd11x5 .longhu2").find(".sumNum").text(str),
                    $("#gd11x5 .longhu2").find(".sumSingleDouble").text(str%2 == 0 ? "双" : "单"),
                    $("#gd11x5 .longhu2").find(".sumBigSmall").text(str == 30? "和":str > 30 ? "大" : "小");

                for (var i = 0; i < nums.length; i++) {
                        $("#gd11x5 .kajianhao").append("<li class='numblueHead'>"+nums[i]+"</li>")
                }


                $("#gd11x5").find(".behindThree").text(123);

                $("#gd11x5").find(".betweenThree").text(123);

                $("#gd11x5").find(".lastThree").text(123);



                cpNumber = data.current.periodNumber;
                var number = data.current.fullPeriodNumber.substring(data.current.fullPeriodNumber.length-3);
                //  $(".num_ul .preDrawIssue").html(data.current.periodNumber);
                $("#gd11x5 .drawCount").html(number);
                $("#gd11x5 .sdrawCountnext").html(cpNumber-number);

                //drawTrend();
            }
            pk10_currentPeriodNumber = data.current.periodNumber;
            window.setTimeout(gd11x5_awardTick,data.next.awardTimeInterval < 10 ? 10000 : data.next.awardTimeInterval);
        }, 'json');
    };

    var jsk3_awardTick = function () {
        $.get('jsk3/getJsk3AwardData.do?' + Math.random(), { ajaxhandler: 'GetPk10AwardData' }, function (data) {
            if(!data)
                return;
            if ((data.current.periodNumber != pk10_currentPeriodNumber)) {


                var nums = data.current.awardNumbers.split(',');
                var str = Number(nums[0])+Number(nums[1])+Number(nums[2]);
                //  cpNumber = data.current.periodNumber;

                    $("#kuai3 .rowbox2").find(".sumNum").text(str),
                    $("#kuai3 .rowbox2").find(".sumSingleDouble").text(str%2 == 0 ? "双" : "单"),
                    $("#kuai3 .rowbox2").find(".sumBigSmall").text(str > 10 ? "大" : "小");

                for (var i = 0; i < nums.length; i++) {
                    $("#kuai3 .kajianhao li:eq(" + i +")").removeClass()

                    $("#kuai3 .kajianhao li:eq(" + i +")").addClass('num'+nums[i])
                }

                 function test(a){
                     switch (a){
                         case "1":
                             return "鱼";
                             break;
                         case "2":
                             return "虾";
                             break;
                         case "3":
                             return "葫芦";
                             break;
                         case "4":
                             return "金钱";
                             break;
                         case "5":
                             return "蟹";
                             break;
                         default:
                             return "鸡";

                 }
             }
                var type_one = test(nums[0]);
                var type_two = test(nums[1]);
                var type_three = test(nums[2]);

                $("#kuai3").find(".firstSeafood").text(type_one);

                $("#kuai3").find(".secondSeafood").text(type_two);

                $("#kuai3").find(".thirdSeafood").text(type_three);

                var cpNumber = data.current.periodNumber;
                var number = data.current.fullPeriodNumber.substring(data.current.fullPeriodNumber.length-2);

                $("#kuai3 .preDrawIssue").html(cpNumber);
                $("#kuai3 .drawCount").html(number);
                $("#kuai3 .sdrawCountnext").html(cpNumber-number);

                //drawTrend();
            }
            pk10_currentPeriodNumber = data.current.periodNumber;
            window.setTimeout(gd11x5_awardTick,data.next.awardTimeInterval < 10 ? 10000 : data.next.awardTimeInterval);
        }, 'json');
    };


<<<<<<< HEAD
    function typeOf(e, t) {
        if ("san" == e) switch (1 * t) {
            case 0:
                return "杂六";
            case 1:
                return "半顺";
            case 2:
                return "顺子";
            case 3:
                return "对子";
            case 4:
                return "豹子"
=======

    function typeOf(nums) {
        if ((Number(nums[0]) == Number(nums[1])) && (Number(nums[0]) == Number(nums[2]))) {
            type = '豹子';
        } else if (((Number(nums[1]) - Number(nums[0])) == (Number(nums[2]) - Number(nums[1]))) && ((Number(nums[1]) - Number(nums[0])) == 1) || (nums == Array(0, 8, 9) || nums == Array(0, 1, 9))) {
            type = '顺子';
        } else if (Number(nums[0]) == Number(nums[1]) || Number(nums[1]) == Number(nums[2])) {
            type = '对子';
        } else if ((Number(nums[1]) - Number(nums[0])) == 1 || (Number(nums[2]) - Number(nums[1])) == 1) {
            type = '半顺';
        } else {
            type = '杂六';
        }
        
        var type1 = '';
        if ((Number(nums[1]) == Number(nums[2])) && (Number(nums[1]) == Number(nums[3]))) {
            type1 = '豹子';
        } else if (((Number(nums[2]) - Number(nums[1])) == (Number(nums[3]) - Number(nums[2]))) && ((Number(nums[2]) - Number(nums[1])) == 1) || (nums == Array(0, 8, 9) || nums == Array(0, 1, 9))) {
            type1 = '顺子';
        } else if (Number(nums[1]) == Number(nums[2]) || Number(nums[2]) == Number(nums[3])) {
            type1 = '对子';
        } else if ((Number(nums[2]) - Number(nums[1])) == 1 || (Number(nums[3]) - Number(nums[2])) == 1) {
            type1= '半顺';
        } else {
            type1 = '杂六';
        }

        var type2 = '';
        if ((Number(nums[2]) == Number(nums[3])) && (Number(nums[2]) == Number(nums[4]))) {
            type2 = '豹子';
        } else if (((Number(nums[3]) - Number(nums[2])) == (Number(nums[4]) - Number(nums[3]))) && ((Number(nums[3]) - Number(nums[2])) == 1) || (nums == Array(0, 8, 9) || nums == Array(0, 1, 9))) {
            type2 = '顺子';
        } else if (Number(nums[2]) == Number(nums[3]) || Number(nums[3]) == Number(nums[4])) {
            type2 = '对子';
        } else if ((Number(nums[3]) - Number(nums[2])) == 1 || (Number(nums[4]) - Number(nums[3])) == 1) {
            type2= '半顺';
        } else {
            type2 = '杂六';
>>>>>>> 46e754f58d2cf3dd15893025fc47ca0e3712e46b
        }
        return data=[type,type1,type2]
    }
<<<<<<< HEAD
=======
    /*var gd_awardTick = function () {
     $.get('gdkl10/ajax?' + Math.random(), { ajaxhandler: 'GetGdkl10AwardData' }, function (data) {
     if ((data.current.periodNumber != gd_currentPeriodNumber)) {
     var nums = data.current.awardNumbers.split(',');
     var str = "";
     for (var i = 0; i < nums.length; i++) {
     if (nums[i] > 18) {
     str = str + "<span class='red'>" + nums[i] + "</span>";
     }
     else{
     str = str + "<span>" + nums[i] + "</span>";
     }
     }
     $(".awardCont03 .cqssc-nums").html(str);
     var _date = data.current.awardTime.substring(0, 10).replace('-', '').replace('-', '');
     var _time = data.current.awardTime.substring(11, 16);
     $(".awardCont03 .period").html(_date + "-" + data.current.periodNumber + " " + _time);
     }
     gd_currentPeriodNumber = data.current.periodNumber;
     window.setTimeout(gd_awardTick, data.next.awardTimeInterval < 10 ? 15000 : data.next.awardTimeInterval);
     }, 'json');
     };*/

    window.setTimeout(gdkl10_awardTick, 500);
>>>>>>> 46e754f58d2cf3dd15893025fc47ca0e3712e46b
    window.setTimeout(pk10_awardTick, 5000);
    window.setTimeout(cqssc_awardTick, 5000);
    window.setTimeout(tjssc_awardTick, 5000);
    window.setTimeout(jsssc_awardTick, 5000);
    window.setTimeout(jssc_awardTick, 5000);
    window.setTimeout(xyft_awardTick, 500);
    window.setTimeout(gd11x5_awardTick, 5000);
    window.setTimeout(jsk3_awardTick, 5000);


    $(".award .lot-menu").hover(function () {
        $(this).parents(".lot").children(".lot-menu").removeClass("cur");
        $(this).addClass("cur");
        $(".awardCont01,.awardCont02,.awardCont03").hide();
        $("." + $(this).attr("name")).show();
    })

    $(".lot-trend .play-name a").each(function () {
        $(this).bind("click", function () {
            $(".lot-trend .play-name a").removeClass("cur");
            $(this).addClass("cur");
            drawTrend();
        });
    });
    $(".lot-trend .play-name a").first().click();
});

//绘制走势图
// function drawTrend() {
//     var ball = $(".lot-trend .play-name .cur").attr("ball");
//     if (!ball) ball = 1;
//
//     $.get("pk10/numbertrendData.do", { ball: ball, count: 25, t: Math.random() }, function (result) {
//         var data = eval(result);
//         showChartline("号码走势图", data, function () { return this.x + '期:' + this.y }, 0, 10, true, 1, 'lot-trend-container');
//     }, "json");
// }