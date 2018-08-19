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
                if(nums[0] > nums[9] ){
                    $("#pk10_hot .longhu").append("<td>龙</td>");
                    $("#pk10 .longhu").append("<td>龙</td>");
                }else if(nums[0] < nums[9]) {
                    $("#pk10_hot .longhu").append("<td>虎</td>");
                    $("#pk10 .longhu").append("<td>虎</td>");
                }else {
                    $("#pk10_hot .longhu").append("<td>龙</td>");
                    $("#pk10 .longhu").append("<td>龙</td>");
                }
                if(nums[1] >nums[8] ){
                    $("#pk10_hot .longhu").append("<td>龙</td>");
                    $("#pk10 .longhu").append("<td>龙</td>");
                }else if(nums[1] <nums[8]) {
                    $("#pk10_hot .longhu").append("<td>虎</td>");
                    $("#pk10 .longhu").append("<td>虎</td>");
                }else {
                    $("#pk10_hot .longhu").append("<td>龙</td>");
                    $("#pk10 .longhu").append("<td>龙</td>");
                }
                if(nums[2] >nums[7] ){
                    $("#pk10_hot .longhu").append("<td>龙</td>");
                    $("#pk10 .longhu").append("<td>龙</td>");
                }else if(nums[2] < nums[7]) {
                    $("#pk10_hot .longhu").append("<td>虎</td>");
                    $("#pk10 .longhu").append("<td>虎</td>");
                }else {
                    $("#pk10_hot .longhu").append("<td>龙</td>");
                    $("#pk10 .longhu").append("<td>龙</td>");
                }
                if(nums[3] >nums[6] ){
                    $("#pk10_hot .longhu").append("<td>龙</td>");
                    $("#pk10 .longhu").append("<td>龙</td>");
                }else if(nums[3] <nums[6] ){
                    $("#pk10_hot .longhu").append("<td>虎</td>");
                    $("#pk10 .longhu").append("<td>虎</td>");
                }else {
                    $("#pk10_hot .longhu").append("<td>龙</td>");
                    $("#pk10 .longhu").append("<td>龙</td>");
                }

                if(nums[4] < nums[5]){
                    $("#pk10_hot .longhu").append("<td>龙</td>");
                    $("#pk10 .longhu").append("<td>龙</td>");
                }else if( nums[4] > nums[5]){
                    $("#pk10_hot .longhu").append("<td>虎</td>");
                    $("#pk10 .longhu").append("<td>虎</td>");
                }else {
                    $("#pk10_hot .longhu").append("<td>龙</td>");
                    $("#pk10 .longhu").append("<td>龙</td>");
                }
                var num = Number(nums[0])+ Number(nums[1]);
                $("#pk10_hot .longhu").append("<td class='sumFS'>"+ num +"</td>");
                $("#pk10 .longhu").append("<td class='sumFS'>"+ num +"</td>");
               // alert( nums[0]+ nums[1]);
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
                if(nums[0] > nums[9] ){
                    $("#jisusc .longhu").append("<td>龙</td>");
                }else if(nums[0] < nums[9]) {
                    $("#jisusc .longhu").append("<td>虎</td>");
                }else {
                    $("#jisusc .longhu").append("<td>龙</td>");
                }
                if(nums[1] >nums[8] ){
                    $("#jisusc .longhu").append("<td>龙</td>");
                }else if(nums[1] <nums[8]) {
                    $("#jisusc .longhu").append("<td>虎</td>");
                }else {
                    $("#jisusc .longhu").append("<td>龙</td>");
                }
                if(nums[2] >nums[7] ){
                    $("#jisusc .longhu").append("<td>龙</td>");
                }else if(nums[2] < nums[7]) {
                    $("#jisusc .longhu").append("<td>虎</td>");
                }else {
                    $("#jisusc .longhu").append("<td>龙</td>");
                }
                if(nums[3] >nums[6] ){
                    $("#jisusc .longhu").append("<td>龙</td>");
                }else if(nums[3] <nums[6] ){
                    $("#jisusc .longhu").append("<td>虎</td>");
                }else {
                    $("#jisusc .longhu").append("<td>龙</td>");
                }

                if(nums[4] < nums[5]){
                    $("#jisusc .longhu").append("<td>龙</td>");
                }else if( nums[4] > nums[5]){
                    $("#jisusc .longhu").append("<td>虎</td>");
                }else {
                    $("#jisusc .longhu").append("<td>龙</td>");
                }
                var num = Number(nums[0])+ Number(nums[1]);
                $("#jisusc .longhu").append("<td class='sumFS'>"+ num +"</td>");
                // alert( nums[0]+ nums[1]);
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
                var str = Number(nums[0])+Number(nums[1])+Number(nums[2])+Number(nums[3])+Number(nums[4]);
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
                if(nums[0] < nums[4]){
                    $("#cqSsc_hot").find(".dragonTiger").text("虎");
                    $("#cqSsc").find(".dragonTiger").text("虎");
                }else if( nums[0] > nums[4]){
                    $("#cqSsc").find(".dragonTiger").text("龙");
                    $("#cqSsc_hot").find(".dragonTiger").text("龙");
                  //  $("#longhu2").append("<td class='dragonTiger'>龙&nbsp;&nbsp;</td>");
                }else {
                    $("#cqSsc_hot").find(".dragonTiger").text("和");
                    $("#cqSsc").find(".dragonTiger").text("和");
                    //$("#longhu2").append("<td class='dragonTiger'>和&nbsp;&nbsp;</td>");
                }
                if ((nums[0] == nums[1]) && (nums[0] == nums[2])) {
                    type = '豹子';
                } else if (((nums[1] - nums[0]) == (nums[2] - nums[1])) && ((nums[1] - nums[0]) == 1) || (nums == Array(0, 8, 9) || nums == Array(0, 1, 9))) {
                    type = '顺子';
                } else if (nums[0] == nums[1] || nums[1] == nums[2]) {
                    type = '对子';
                } else if ((nums[1] - nums[0]) == 1 || (nums[2] - nums[1]) == 1) {
                    type = '半顺';
                } else {
                    type = '杂六';
                }
                $("#longhu2").find(".behindThree").text(type);
                $("#cqSsc .longhu2").find(".behindThree").text(type);
                var type1 = '';
                if ((nums[1] == nums[2]) && (nums[1] == nums[3])) {
                    type1 = '豹子';
                } else if (((nums[2] - nums[1]) == (nums[3] - nums[2])) && ((nums[2] - nums[1]) == 1) || (nums == Array(0, 8, 9) || nums == Array(0, 1, 9))) {
                    type1 = '顺子';
                } else if (nums[1] == nums[2] || nums[2] == nums[3]) {
                    type1 = '对子';
                } else if ((nums[2] - nums[1]) == 1 || (nums[3] - nums[2]) == 1) {
                    type1= '半顺';
                } else {
                    type1 = '杂六';
                }
                $("#longhu2").find(".betweenThree").text(type1);
                $("#cqSsc .longhu2").find(".betweenThree").text(type1);
                var type2 = '';
                if ((nums[2] == nums[3]) && (nums[2] == nums[4])) {
                    type2 = '豹子';
                } else if (((nums[3] - nums[2]) == (nums[4] - nums[3])) && ((nums[3] - nums[2]) == 1) || (nums == Array(0, 8, 9) || nums == Array(0, 1, 9))) {
                    type2 = '顺子';
                } else if (nums[2] == nums[3] || nums[3] == nums[4]) {
                    type2 = '对子';
                } else if ((nums[3] - nums[2]) == 1 || (nums[4] - nums[3]) == 1) {
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
                var str = Number(nums[0])+Number(nums[1])+Number(nums[2])+Number(nums[3])+Number(nums[4]);
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
                // var nun = Number(nums[0])+Number(nums[1])+Number(nums[2])+Number(nums[3])+Number(nums[4]);
                // $("#longhu2").append("<td class='sumNum'> "+ nun +" &nbsp;&nbsp;</td>");
                // if(nun%2 == 0){
                //     $("#longhu2").append("<td class='sumSingleDouble'>双 &nbsp;&nbsp;</td>");
                // }else {
                //     $("#longhu2").append("<td class='sumSingleDouble'>单&nbsp;&nbsp;</td>");
                // }
                // if(nun <= 23){
                //     $("#longhu2").append("<td class='sumBigSmall'>小&nbsp;&nbsp;</td>");
                // }else {
                //     $("#longhu2").append("<td class='sumBigSmall'>大&nbsp;&nbsp;</td>");
                // }
                if(nums[0] < nums[4]){
                    $("#tjSsc").find(".dragonTiger").text("虎");
                }else if( nums[0] > nums[4]){
                    $("#tjSsc").find(".dragonTiger").text("龙");
                    //  $("#longhu2").append("<td class='dragonTiger'>龙&nbsp;&nbsp;</td>");
                }else {
                    $("#tjSsc").find(".dragonTiger").text("和");
                    //$("#longhu2").append("<td class='dragonTiger'>和&nbsp;&nbsp;</td>");
                }

                $("#tjSsc").find(".behindThree").text(typeOf("san", nun[0]));
                $("#tjSsc").find(".betweenThree").text(typeOf("san", nun[2]));
                $("#tjSsc").find(".lastThree").text(typeOf("san", nun[3]));

                if ((nums[0] == nums[1]) && (nums[0] == nums[2])) {
                    type = '豹子';
                } else if (((nums[1] - nums[0]) == (nums[2] - nums[1])) && ((nums[1] - nums[0]) == 1) || (nums == Array(0, 8, 9) || nums == Array(0, 1, 9))) {
                    type = '顺子';
                } else if (nums[0] == nums[1] || nums[1] == nums[2]) {
                    type = '对子';
                } else if ((nums[1] - nums[0]) == 1 || (nums[2] - nums[1]) == 1) {
                    type = '半顺';
                } else {
                    type = '杂六';
                }
                $("#tjSsc").find(".behindThree").text(type);
                var type1 = '';
                if ((nums[1] == nums[2]) && (nums[1] == nums[3])) {
                    type1 = '豹子';
                } else if (((nums[2] - nums[1]) == (nums[3] - nums[2])) && ((nums[2] - nums[1]) == 1) || (nums == Array(0, 8, 9) || nums == Array(0, 1, 9))) {
                    type1 = '顺子';
                } else if (nums[1] == nums[2] || nums[2] == nums[3]) {
                    type1 = '对子';
                } else if ((nums[2] - nums[1]) == 1 || (nums[3] - nums[2]) == 1) {
                    type1= '半顺';
                } else {
                    type1 = '杂六';
                }
                $("#tjSsc").find(".betweenThree").text(type1);
                var type2 = '';
                if ((nums[2] == nums[3]) && (nums[2] == nums[4])) {
                    type2 = '豹子';
                } else if (((nums[3] - nums[2]) == (nums[4] - nums[3])) && ((nums[3] - nums[2]) == 1) || (nums == Array(0, 8, 9) || nums == Array(0, 1, 9))) {
                    type2 = '顺子';
                } else if (nums[2] == nums[3] || nums[3] == nums[4]) {
                    type2 = '对子';
                } else if ((nums[3] - nums[2]) == 1 || (nums[4] - nums[3]) == 1) {
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
                var str = Number(nums[0])+Number(nums[1])+Number(nums[2])+Number(nums[3])+Number(nums[4]);
                //  cpNumber = data.current.periodNumber;

                $("#jsssc").find(".sumNum").text(str),
                    $("#jsssc").find(".sumSingleDouble").text(str%2 == 0 ? "单" : "双"),
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
                // var nun = Number(nums[0])+Number(nums[1])+Number(nums[2])+Number(nums[3])+Number(nums[4]);
                // $("#longhu2").append("<td class='sumNum'> "+ nun +" &nbsp;&nbsp;</td>");
                // if(nun%2 == 0){
                //     $("#longhu2").append("<td class='sumSingleDouble'>双 &nbsp;&nbsp;</td>");
                // }else {
                //     $("#longhu2").append("<td class='sumSingleDouble'>单&nbsp;&nbsp;</td>");
                // }
                // if(nun <= 23){
                //     $("#longhu2").append("<td class='sumBigSmall'>小&nbsp;&nbsp;</td>");
                // }else {
                //     $("#longhu2").append("<td class='sumBigSmall'>大&nbsp;&nbsp;</td>");
                // }
                if(nums[0] < nums[4]){
                    $("#jsssc").find(".dragonTiger").text("虎");
                }else if( nums[0] > nums[4]){
                    $("#jsssc").find(".dragonTiger").text("龙");
                    //  $("#longhu2").append("<td class='dragonTiger'>龙&nbsp;&nbsp;</td>");
                }else {
                    $("#jsssc").find(".dragonTiger").text("和");
                    //$("#longhu2").append("<td class='dragonTiger'>和&nbsp;&nbsp;</td>");
                }

                if ((nums[0] == nums[1]) && (nums[0] == nums[2])) {
                    type = '豹子';
                } else if (((nums[1] - nums[0]) == (nums[2] - nums[1])) && ((nums[1] - nums[0]) == 1) || (nums == Array(0, 8, 9) || nums == Array(0, 1, 9))) {
                    type = '顺子';
                } else if (nums[0] == nums[1] || nums[1] == nums[2]) {
                    type = '对子';
                } else if ((nums[1] - nums[0]) == 1 || (nums[2] - nums[1]) == 1) {
                    type = '半顺';
                } else {
                    type = '杂六';
                }
                $("#jsssc").find(".behindThree").text(type);
                var type1 = '';
                if ((nums[1] == nums[2]) && (nums[1] == nums[3])) {
                    type1 = '豹子';
                } else if (((nums[2] - nums[1]) == (nums[3] - nums[2])) && ((nums[2] - nums[1]) == 1) || (nums == Array(0, 8, 9) || nums == Array(0, 1, 9))) {
                    type1 = '顺子';
                } else if (nums[1] == nums[2] || nums[2] == nums[3]) {
                    type1 = '对子';
                } else if ((nums[2] - nums[1]) == 1 || (nums[3] - nums[2]) == 1) {
                    type1= '半顺';
                } else {
                    type1 = '杂六';
                }
                $("#jsssc").find(".betweenThree").text(type1);
                var type2 = '';
                if ((nums[2] == nums[3]) && (nums[2] == nums[4])) {
                    type2 = '豹子';
                } else if (((nums[3] - nums[2]) == (nums[4] - nums[3])) && ((nums[3] - nums[2]) == 1) || (nums == Array(0, 8, 9) || nums == Array(0, 1, 9))) {
                    type2 = '顺子';
                } else if (nums[2] == nums[3] || nums[3] == nums[4]) {
                    type2 = '对子';
                } else if ((nums[3] - nums[2]) == 1 || (nums[4] - nums[3]) == 1) {
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
        }
    }
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

//    window.setTimeout(cq_awardTick, 500);
    window.setTimeout(pk10_awardTick, 5000);
    window.setTimeout(cqssc_awardTick, 5000);
    window.setTimeout(tjssc_awardTick, 5000);
    window.setTimeout(jsssc_awardTick, 5000);
    window.setTimeout(jssc_awardTick, 5000);
//    window.setTimeout(gd_awardTick, 500);

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