indexdata();
f12();
f11();
f10();
f9();
f8();
f7();
f6();
f5();
f4();
f3();
f2();

var m,s;


//window.setInterval("indexdata()",60000);


function indexdata() {

    $.getJSON("/pk10/getPk10AwardTimes.do", {t: Math.random()},
        function (data) {
            clearInterval(xiaoguo);
            $("#pk10_hot .numberbox").html("");
            $("#pk10 .numberbox").html("");
            $("#pk10_hot .longhu").html("");
            $("#pk10 .longhu").html("");
            var nums = data.current.awardNumbers.split(',');
            for (var i = 0; i < nums.length; i++) {
                // str += ;
                if (nums[i] == 10) {
                    $("#pk10_hot .numberbox").append("<li class='nub" + nums[i] + "'></li>");
                    $("#pk10 .numberbox").append("<li class='nub" + nums[i] + "'></li>");
                } else {
                    $("#pk10_hot .numberbox").append("<li class='nub0" + nums[i] + "'></li>");
                    $("#pk10 .numberbox").append("<li class='nub0" + nums[i] + "'></li>");
                }
                //alert(nums[i]);
            }
            if (Number(nums[0]) > nums[9]) {
                $("#pk10_hot .longhu").append("<td>龙</td>");
                $("#pk10 .longhu").append("<td>龙</td>");
            } else if (Number(nums[0]) < nums[9]) {
                $("#pk10_hot .longhu").append("<td>虎</td>");
                $("#pk10 .longhu").append("<td>虎</td>");
            } else {
                $("#pk10_hot .longhu").append("<td>和</td>");
                $("#pk10 .longhu").append("<td>和</td>");
            }
            if (Number(nums[1]) > nums[8]) {
                $("#pk10_hot .longhu").append("<td>龙</td>");
                $("#pk10 .longhu").append("<td>龙</td>");
            } else if (Number(nums[1]) < nums[8]) {
                $("#pk10_hot .longhu").append("<td>虎</td>");
                $("#pk10 .longhu").append("<td>虎</td>");
            } else {
                $("#pk10_hot .longhu").append("<td>和</td>");
                $("#pk10 .longhu").append("<td>和</td>");
            }
            if (Number(nums[2]) > Number(nums[7])) {
                $("#pk10_hot .longhu").append("<td>龙</td>");
                $("#pk10 .longhu").append("<td>龙</td>");
            } else if (Number(nums[2]) < Number(nums[7])) {
                $("#pk10_hot .longhu").append("<td>虎</td>");
                $("#pk10 .longhu").append("<td>虎</td>");
            } else {
                $("#pk10_hot .longhu").append("<td>和</td>");
                $("#pk10 .longhu").append("<td>和</td>");
            }
            if (Number(nums[3]) > Number(nums[6])) {
                $("#pk10_hot .longhu").append("<td>龙</td>");
                $("#pk10 .longhu").append("<td>龙</td>");
            } else if (Number(nums[3]) < Number(nums[6])) {
                $("#pk10_hot .longhu").append("<td>虎</td>");
                $("#pk10 .longhu").append("<td>虎</td>");
            } else {
                $("#pk10_hot .longhu").append("<td>和</td>");
                $("#pk10 .longhu").append("<td>和</td>");
            }

            if (Number(nums[4]) > Number(nums[5])) {
                $("#pk10_hot .longhu").append("<td>龙</td>");
                $("#pk10 .longhu").append("<td>龙</td>");
            } else if (Number(nums[4]) < Number(nums[5])) {
                $("#pk10_hot .longhu").append("<td>虎</td>");
                $("#pk10 .longhu").append("<td>虎</td>");
            } else {
                $("#pk10_hot .longhu").append("<td>和</td>");
                $("#pk10 .longhu").append("<td>和</td>");
            }
            var num = Number(nums[0]) + Number(nums[1]);
            $("#pk10_hot .longhu").append("<td class='sumFS'>" + num + "</td>");
            $("#pk10 .longhu").append("<td class='sumFS'>" + num + "</td>");
            // alert( Number(nums[0])+ Number(nums[3]));
            if (num <= 11) {
                $("#pk10_hot .longhu").append("<td class='sumBigSamll'>小</td>");
                $("#pk10 .longhu").append("<td class='sumBigSamll'>小</td>");
            } else {
                $("#pk10_hot .longhu").append("<td class='sumBigSamll'>大</td>");
                $("#pk10 .longhu").append("<td class='sumBigSamll'>大</td>");
            }
            if (num % 2 == 0) {
                $("#pk10_hot .longhu").append("<td class='sumSingleDouble'>双</td>");
                $("#pk10 .longhu").append("<td class='sumSingleDouble'>双</td>");
            } else {
                $("#pk10_hot .longhu").append("<td class='sumSingleDouble'>单</td>");
                $("#pk10 .longhu").append("<td class='sumSingleDouble'>单</td>");
            }
            clearInterval(time_r);
            clearInterval(time_r1);
            clearInterval(time_r19);
            timer13(parseInt((data.next.awardTimeInterval) / 1000), "pk10_hot .nextkai_time", 'pk10_hot');
            timer(parseInt((data.next.awardTimeInterval) / 1000), "pk10 .nextkai_time", 'pk10');
            timers(parseInt((data.next.awardTimeInterval) / 1000), ".pk10 .cuttime");
            cpNumber = data.current.periodNumber;
            var _time = data.current.awardTime.substring(11, 16);
            //  $(".num_ul .preDrawIssue").html(data.current.periodNumber);
            $("#pk10_hot .drawCount").html(cpNumber);
            $("#pk10 .drawCount").html(cpNumber);
            $("#pk10_hot .sdrawCountnext").html(Number(data.firstPeriod) + 179 - cpNumber);
            $("#pk10 .sdrawCountnext").html(Number(data.firstPeriod) + 179 - cpNumber);
        });
}
    function f12() {
        $.getJSON("/xyft/getPk10AwardTimes.do", {t: Math.random()},
            function (data) {
                clearInterval(xiaoguo);
                clearInterval(time_r2);
                clearInterval(time_r3);
                timer2(parseInt((data.next.awardTimeInterval) / 1000), "xyft .nextkai_time", 'xyft');
                timers2(parseInt((data.next.awardTimeInterval) / 1000), ".xyft_1 .cuttime");
                $("#xyft .numberbox").html("");
                $("#xyft .longhu").html("");
                var nums = data.current.awardNumbers.split(',');
                var str = "";
                for (var i = 0; i < nums.length; i++) {
                    // str += ;
                    if (nums[i] == 10) {
                        $("#xyft .numberbox").append("<li class='nub" + nums[i] + "'></li>");
                    } else {
                        $("#xyft .numberbox").append("<li class='nub0" + nums[i] + "'></li>");
                    }
                    //alert(nums[i]);
                }
                if (Number(nums[0]) > nums[9]) {
                    $("#xyft .longhu").append("<td>龙</td>");
                } else if (Number(nums[0]) < nums[9]) {
                    $("#xyft .longhu").append("<td>虎</td>");
                } else {
                    $("#xyft .longhu").append("<td>和</td>");
                }
                if (Number(nums[1]) > nums[8]) {
                    $("#xyft .longhu").append("<td>龙</td>");
                } else if (Number(nums[1]) < nums[8]) {
                    $("#xyft .longhu").append("<td>虎</td>");
                } else {
                    $("#xyft .longhu").append("<td>和</td>");
                }
                if (Number(nums[2]) > Number(nums[7])) {
                    $("#xyft .longhu").append("<td>龙</td>");
                } else if (Number(nums[2]) < Number(nums[7])) {
                    // $("#pk10_hot .longhu").append("<td>虎</td>");
                    $("#xyft .longhu").append("<td>虎</td>");
                } else {
                    $("#xyft .longhu").append("<td>和</td>");
                }
                if (Number(nums[3]) > Number(nums[6])) {
                    $("#xyft .longhu").append("<td>龙</td>");
                } else if (Number(nums[3]) < Number(nums[6])) {
                    $("#xyft .longhu").append("<td>虎</td>");
                } else {
                    $("#xyft .longhu").append("<td>和</td>");
                }

                if (Number(nums[4]) > Number(nums[5])) {
                    $("#xyft .longhu").append("<td>龙</td>");
                } else if (Number(nums[4]) < Number(nums[5])) {
                    $("#xyft .longhu").append("<td>虎</td>");
                } else {
                    $("#xyft .longhu").append("<td>和</td>");
                }
                var num = Number(nums[0]) + Number(nums[1]);
                $("#xyft .longhu").append("<td class='sumFS'>" + num + "</td>");
                // alert( Number(nums[0])+ Number(nums[3]));
                if (num <= 11) {
                    $("#xyft .longhu").append("<td class='sumBigSamll'>小</td>");
                } else {
                    $("#xyft .longhu").append("<td class='sumBigSamll'>大</td>");
                }
                if (num % 2 == 0) {
                    $("#xyft .longhu").append("<td class='sumSingleDouble'>双</td>");
                } else {
                    $("#xyft .longhu").append("<td class='sumSingleDouble'>单</td>");
                }

                cpNumber = data.current.periodNumber;
                var _time = data.current.awardTime.substring(11, 16);
                //  $(".num_ul .preDrawIssue").html(data.current.periodNumber);
                //      var number = data.current.fullPeriodNumber.substring(data.current.fullPeriodNumber.length-3);
                $("#xyft .drawCount").html(cpNumber);
                $("#xyft .sdrawCountnext").html(180 - cpNumber);

            });
    }
    function f11() {
        $.getJSON("/cqssc/getCqsscAwardTimes.do", {t: Math.random()},
            function (data) {
                clearInterval(xiaoguo);
                clearInterval(time_r4);
                clearInterval(time_r5);
                clearInterval(time_r20);
                timer14(parseInt((data.next.awardTimeInterval) / 1000), "cqSsc_hot .nextkai_time", 'cqSsc_hot');
                timer3(parseInt((data.next.awardTimeInterval) / 1000), "cqSsc .nextkai_time", 'cqSsc');
                timers3(parseInt((data.next.awardTimeInterval) / 1000), ".cqssc .cuttime");
                $("#kajianhao5").html("");
                $("#kajianhao").html("");
                var nums = data.current.awardNumbers.split(',');
                //alert(nums);
                var str = Number(nums[0]) + Number(nums[1]) + Number(Number(nums[2])) + Number(nums[3]) + Number(nums[4]);
                console.log(nums);
                //  cpNumber = data.current.periodNumber;

                $("#cqSsc_hot").find(".sumNum").text(str),
                    $("#cqSsc_hot").find(".sumSingleDouble").text(str % 2 == 0 ? "单" : "双"),
                    $("#cqSsc_hot").find(".sumBigSmall").text(str > 23 ? "大" : "小");
                $("#cqSsc").find(".sumNum").text(str),
                    $("#cqSsc").find(".sumSingleDouble").text(str % 2 == 0 ? "单" : "双"),
                    $("#cqSsc").find(".sumBigSmall").text(str > 23 ? "大" : "小");
                for (var i = 0; i < nums.length; i++) {
                    // str += ;
                    if (nums[i] == 10) {
                        $("#kajianhao").append("<li class='numblueHead'>" + nums[i] + "</li>");
                        $("#kajianhao5").append("<li class='numblueHead'>" + nums[i] + "</li>");
                    } else {
                        $("#kajianhao5").append("<li class='numblueHead'>" + nums[i] + "</li>");
                        $("#kajianhao").append("<li class='numblueHead'>" + nums[i] + "</li>");
                    }
                }

                if (Number(nums[0]) < Number(nums[4])) {
                    $("#cqSsc_hot").find(".dragonTiger").text("虎");
                    $("#cqSsc").find(".dragonTiger").text("虎");
                } else if (Number(nums[0]) > Number(nums[4])) {
                    $("#cqSsc").find(".dragonTiger").text("龙");
                    $("#cqSsc_hot").find(".dragonTiger").text("龙");
                    //  $("#longhu2").append("<td class='dragonTiger'>龙&nbsp;&nbsp;</td>");
                } else {
                    $("#cqSsc_hot").find(".dragonTiger").text("和");
                    $("#cqSsc").find(".dragonTiger").text("和");
                    //$("#longhu2").append("<td class='dragonTiger'>和&nbsp;&nbsp;</td>");
                }
                //  var type = typeOf(nums);
                if ((Number(nums[0]) == Number(nums[1])) && (Number(nums[0]) == Number(nums[2]))) {
                    type = '豹子';
                } else if (((Number(nums[1]) - Number(nums[0])) == (Number(nums[2]) - Number(nums[1]))) && ((Number(nums[0]) - Number(nums[1])) == 1) && ((Number(nums[1]) - Number(nums[2])) == 1) && ((Number(nums[0]) - Number(nums[2])) == 1) && ((Number(nums[2]) - Number(nums[0])) == 1) || (nums[0] + nums[1] + nums[2] == '0,8,9' || nums[0] + nums[1] + nums[2] == '0,1,9')) {
                    type = '顺子';
                } else if ((Number(nums[0]) - Number(nums[1])) == 2 && (Number(nums[1]) - Number(nums[2])) == -1 || (Number(nums[1]) - Number(nums[0])) == 2 && (Number(nums[1]) - Number(nums[2])) == 1 || (Number(nums[1]) - Number(nums[2])) == 2 && (Number(nums[1]) - Number(nums[0])) == 1 || (Number(nums[2]) - Number(nums[1])) == 2 && (Number(nums[1]) - Number(nums[0])) == -1) {
                    type = '顺子';
                } else if (Number(nums[0]) == Number(nums[1]) || Number(nums[1]) == Number(nums[2]) || Number(nums[0]) == Number(nums[2])) {
                    type = '对子';
                } else if ((Number(nums[0]) - Number(nums[1])) == 1 || (Number(nums[1]) - Number(nums[0])) == 1 || (Number(nums[2]) - Number(nums[1])) == 1 || (Number(nums[1]) - Number(nums[2])) == 1 || (Number(nums[0]) - Number(nums[2])) == 1 || (Number(nums[2]) - Number(nums[0])) == 1 || (nums[2] + nums[0] == '0,9' || nums[1] + nums[0] == '0,9' || nums[1] + nums[2] == '0,9' || nums[0] + nums[2] == '0,9' || nums[0] + nums[1] == '0,9' || nums[2] + nums[1] == '0,9')) {
                    type = '半顺';
                } else {
                    type = '杂六';
                }
                $("#longhu2").find(".behindThree").text(type);
                $("#cqSsc").find(".behindThree").text(type);
                var type1 = '';
                if ((Number(nums[1]) == Number(nums[2])) && (Number(nums[1]) == Number(nums[3]))) {
                    type1 = '豹子';
                } else if (((Number(nums[2]) - Number(nums[1])) == (Number(nums[3]) - Number(nums[2]))) && ((Number(nums[1]) - Number(nums[2])) == 1) && ((Number(nums[3]) - Number(nums[1])) == 1) && ((Number(nums[1]) - Number(nums[3])) == 1) && ((Number(nums[2]) - Number(nums[3])) == 1) || (nums[0] + nums[1] + nums[2] == '0,8,9' || nums[0] + nums[1] + nums[2] == '0,1,9')) {
                    type1 = '顺子';
                } else if ((Number(nums[1]) - Number(nums[2])) == 2 && (Number(nums[2]) - Number(nums[3])) == -1 || (Number(nums[2]) - Number(nums[1])) == 2 && (Number(nums[2]) - Number(nums[3])) == 1 || (Number(nums[2]) - Number(nums[3])) == 2 && (Number(nums[2]) - Number(nums[1])) == 1 || (Number(nums[3]) - Number(nums[2])) == 2 && (Number(nums[2]) - Number(nums[1])) == -1) {
                    type1 = '顺子';
                } else if (Number(nums[1]) == Number(nums[2]) || Number(nums[2]) == Number(nums[3]) || Number(nums[3]) == Number(nums[1])) {
                    type1 = '对子';
                } else if ((Number(nums[2]) - Number(nums[1])) == 1 || (Number(nums[1]) - Number(nums[2])) == 1 || (Number(nums[2]) - Number(nums[3])) == 1 || (Number(nums[3]) - Number(nums[2])) == 1 || (Number(nums[1]) - Number(nums[3])) == 1 || (Number(nums[3]) - Number(nums[1])) == 1 || (nums[3] + nums[1] == '0,9' || nums[2] + nums[1] == '0,9' || nums[2] + nums[3] == '0,9' || nums[3] + nums[2] == '0,9' || nums[1] + nums[3] == '0,9' || nums[1] + nums[2] == '0,9')) {
                    type1 = '半顺';
                } else {
                    type1 = '杂六';
                }
                $("#longhu2").find(".betweenThree").text(type1);
                $("#cqSsc").find(".betweenThree").text(type1);
                var type2 = '';
                if ((Number(nums[2]) == Number(nums[3])) && (Number(nums[2]) == Number(nums[4]))) {
                    type2 = '豹子';
                } else if (((Number(nums[3]) - Number(nums[2])) == (Number(nums[4]) - Number(nums[3]))) && ((Number(nums[2]) - Number(nums[3])) == 1) && ((Number(nums[3]) - Number(nums[4])) == 1) && ((Number(nums[4]) - Number(nums[2])) == 1) && ((Number(nums[2]) - Number(nums[4])) == 1) || (nums == Array(0, 8, 9) || nums == Array(0, 1, 9))) {
                    type2 = '顺子';
                } else if ((Number(nums[2]) - Number(nums[3])) == 2 && (Number(nums[3]) - Number(nums[4])) == -1 || (Number(nums[3]) - Number(nums[2])) == 2 && (Number(nums[3]) - Number(nums[4])) == 1 || (Number(nums[3]) - Number(nums[4])) == 2 && (Number(nums[3]) - Number(nums[2])) == 1 || (Number(nums[4]) - Number(nums[3])) == 2 && (Number(nums[3]) - Number(nums[2])) == -1) {
                    type2 = '顺子';
                } else if (Number(nums[2]) == Number(nums[3]) || Number(nums[3]) == Number(nums[4]) || Number(nums[1]) == Number(nums[4])) {
                    type2 = '对子';
                } else if ((Number(nums[3]) - Number(nums[2])) == 1 || (Number(nums[2]) - Number(nums[3])) == 1 || (Number(nums[3]) - Number(nums[4])) == 1 || (Number(nums[4]) - Number(nums[3])) == 1 || (Number(nums[2]) - Number(nums[4])) == 1 || (Number(nums[4]) - Number(nums[2])) == 1 || (nums[4] + nums[2] == '0,9' || nums[3] + nums[2] == '0,9' || nums[3] + nums[4] == '0,9' || nums[4] + nums[3] == '0,9' || nums[2] + nums[4] == '0,9' || nums[2] + nums[3] == '0,9')) {
                    type2 = '半顺';
                } else {
                    type2 = '杂六';
                }
                $("#longhu2").find(".lastThree").text(type2);
                $("#cqSsc .longhu2").find(".lastThree").text(type2);

                var niu = douniu(data.current.awardNumbers.split(','));

                //   var niu = test(nums);

                var suo = suoha(data.current.awardNumbers.split(','));

                $("#longhu2").find(".douniu").text(niu);
                $("#longhu2").find(".suoha").text(suo);
                $("#cqSsc .longhu2").find(".douniu").text(niu);
                $("#cqSsc .longhu2").find(".suoha").text(suo);
                cpNumber = data.current.periodNumber;
                var _time = data.current.awardTime.substring(11, 16);
                $("#cqSsc .num_ul .drawCount").html(cpNumber);
                $("#cqSsc_hot .num_ul .drawCount").html(cpNumber);
                $("#cqSsc .num_ul .sdrawCountnext").html(120 - cpNumber);
                $("#cqSsc_hot .num_ul .sdrawCountnext").html(120 - cpNumber);
            });
    }

    function f10() {
    $.getJSON("/gdkl10/getGdkl10AwardTimes.do", {t: Math.random()},
        function (data) {
            clearInterval(xiaoguo);
            clearInterval(time_r6);
            timer4(parseInt((data.next.awardTimeInterval) / 1000), "gdkl10 .nextkai_time", 'gdkl10');
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
            $("#gdkl10 .drawCount").html(cpNumber);
            $("#gdkl10 .sdrawCountnext").html(84 - cpNumber);
        });
}
    function f9() {
        $.getJSON("/jssc/getPk10AwardTimes.do", {t: Math.random()},
            function (data) {
                clearInterval(xiaoguo);
                clearInterval(time_r8);
                clearInterval(time_r7);
                timer5(parseInt((data.next.awardTimeInterval) / 1000), "jisusc .nextkai_time", 'jisusc');
                timers5(parseInt((data.next.awardTimeInterval) / 1000), ".jssc .cuttime");
                $("#jisusc .longhu").html("");
                $("#jisusc .numberbox").html("");
                var nums = data.current.awardNumbers.split(',');
                var str = "";
                for (var i = 0; i < nums.length; i++) {
                    // str += ;
                    if (nums[i] == 10) {
                        $("#jisusc .numberbox").append("<li class='nub" + nums[i] + "'></li>");
                    } else {
                        $("#jisusc .numberbox").append("<li class='nub0" + nums[i] + "'></li>");
                    }
                    //alert(nums[i]);
                }
                if (Number(nums[0]) > nums[9]) {
                    $("#jisusc .longhu").append("<td>龙</td>");
                } else if (Number(nums[0]) < nums[9]) {
                    $("#jisusc .longhu").append("<td>虎</td>");
                } else {
                    $("#jisusc .longhu").append("<td>和</td>");
                }
                if (Number(nums[1]) > nums[8]) {
                    $("#jisusc .longhu").append("<td>龙</td>");
                } else if (Number(nums[1]) < nums[8]) {
                    $("#jisusc .longhu").append("<td>虎</td>");
                } else {
                    $("#jisusc .longhu").append("<td>和</td>");
                }
                if (Number(nums[2]) > Number(nums[7])) {
                    $("#jisusc .longhu").append("<td>龙</td>");
                } else if (Number(nums[2]) < Number(nums[7])) {
                    $("#jisusc .longhu").append("<td>虎</td>");
                } else {
                    $("#jisusc .longhu").append("<td>和</td>");
                }
                if (Number(nums[3]) > Number(nums[6])) {
                    $("#jisusc .longhu").append("<td>龙</td>");
                } else if (Number(nums[3]) < Number(nums[6])) {
                    $("#jisusc .longhu").append("<td>虎</td>");
                } else {
                    $("#jisusc .longhu").append("<td>和</td>");
                }

                if (Number(nums[4]) > Number(nums[5])) {

                    $("#jisusc .longhu").append("<td>龙</td>");
                } else if (Number(nums[4]) < Number(nums[5])) {

                    $("#jisusc .longhu").append("<td>虎</td>");
                } else {
                    $("#jisusc .longhu").append("<td>和</td>");
                }
                var num = Number(nums[0]) + Number(nums[1]);
                $("#jisusc .longhu").append("<td class='sumFS'>" + num + "</td>");
                // alert( Number(nums[0])+ Number(nums[3]));
                if (num <= 11) {
                    $("#jisusc .longhu").append("<td class='sumBigSamll'>小</td>");
                } else {
                    $("#jisusc .longhu").append("<td class='sumBigSamll'>大</td>");
                }
                if (num % 2 == 0) {
                    $("#jisusc .longhu").append("<td class='sumSingleDouble'>双</td>");
                } else {
                    $("#jisusc .longhu").append("<td class='sumSingleDouble'>单</td>");
                }

                cpNumber =( data.current.periodNumber - data.current.firstPeriod);
                var _time = data.current.awardTime.substring(11, 16);
                //  $(".num_ul .preDrawIssue").html(data.current.periodNumber);
                $("#jisusc .drawCount").html(data.current.fullPeriodNumber);
                $("#jisusc .sdrawCountnext").html(1152 - cpNumber);
            });
    }

    function f8() {
        $.getJSON("/jsssc/getCqsscAwardTimes.do", {t: Math.random()},
            function (data) {
                clearInterval(xiaoguo);
                clearInterval(time_r9);
                clearInterval(time_r10);
               // clearInterval(timers);
                timer6(parseInt((data.next.awardTimeInterval) / 1000), "jsssc .nextkai_time", 'jsssc');
                timers6(parseInt((data.next.awardTimeInterval) / 1000), ".jsssc_1 .cuttime");
                $("#jsssc #kajianhao3").html("");
                var nums = data.current.awardNumbers.split(',');
                var str = Number(nums[0]) + Number(nums[1]) + Number(Number(nums[2])) + Number(nums[3]) + Number(nums[4]);
                //  cpNumber = data.current.periodNumber;

                $("#jsssc").find(".sumNum").text(str),
                    $("#jsssc").find(".sumSingleDouble").text(str % 2 == 0 ? "双" : "单"),
                    $("#jsssc").find(".sumBigSmall").text(str > 23 ? "大" : "小");
                for (var i = 0; i < nums.length; i++) {
                    // str += ;
                    if (nums[i] == 10) {
                        $("#kajianhao3").append("<li class='numblueHead'>" + nums[i] + "</li>");
                    } else {
                        $("#kajianhao3").append("<li class='numblueHead'>" + nums[i] + "</li>");
                    }
                    //alert(nums[i]);
                }

                if (Number(nums[0]) < Number(nums[4])) {
                    $("#jsssc").find(".dragonTiger").text("虎");
                } else if (Number(nums[0]) > Number(nums[4])) {
                    $("#jsssc").find(".dragonTiger").text("龙");
                    //  $("#longhu2").append("<td class='dragonTiger'>龙&nbsp;&nbsp;</td>");
                } else {
                    $("#jsssc").find(".dragonTiger").text("和");
                    //$("#longhu2").append("<td class='dragonTiger'>和&nbsp;&nbsp;</td>");
                }

                if ((Number(nums[0]) == Number(nums[1])) && (Number(nums[0]) == Number(nums[2]))) {
                    type = '豹子';
                } else if (((Number(nums[1]) - Number(nums[0])) == (Number(nums[2]) - Number(nums[1]))) && ((Number(nums[0]) - Number(nums[1])) == 1) && ((Number(nums[1]) - Number(nums[2])) == 1) && ((Number(nums[0]) - Number(nums[2])) == 1) && ((Number(nums[2]) - Number(nums[0])) == 1) || (nums[0] + nums[1] + nums[2] == '0,8,9' || nums[0] + nums[1] + nums[2] == '0,1,9')) {
                    type = '顺子';
                } else if ((Number(nums[0]) - Number(nums[1])) == 2 && (Number(nums[1]) - Number(nums[2])) == -1 || (Number(nums[1]) - Number(nums[0])) == 2 && (Number(nums[1]) - Number(nums[2])) == 1 || (Number(nums[1]) - Number(nums[2])) == 2 && (Number(nums[1]) - Number(nums[0])) == 1 || (Number(nums[2]) - Number(nums[1])) == 2 && (Number(nums[1]) - Number(nums[0])) == -1) {
                    type = '顺子';
                } else if (Number(nums[0]) == Number(nums[1]) || Number(nums[1]) == Number(nums[2]) || Number(nums[0]) == Number(nums[2])) {
                    type = '对子';
                } else if ((Number(nums[0]) - Number(nums[1])) == 1 || (Number(nums[1]) - Number(nums[0])) == 1 || (Number(nums[2]) - Number(nums[1])) == 1 || (Number(nums[1]) - Number(nums[2])) == 1 || (Number(nums[0]) - Number(nums[2])) == 1 || (Number(nums[2]) - Number(nums[0])) == 1 || (nums[2] + nums[0] == '0,9' || nums[1] + nums[0] == '0,9' || nums[1] + nums[2] == '0,9' || nums[0] + nums[2] == '0,9' || nums[0] + nums[1] == '0,9' || nums[2] + nums[1] == '0,9')) {
                    type = '半顺';
                } else {
                    type = '杂六';
                }
                $("#jsssc").find(".behindThree").text(type);
                var type1 = '';
                if ((Number(nums[1]) == Number(nums[2])) && (Number(nums[1]) == Number(nums[3]))) {
                    type1 = '豹子';
                } else if ((Number(nums[1]) - Number(nums[2])) == 2 && (Number(nums[2]) - Number(nums[3])) == -1 || (Number(nums[2]) - Number(nums[1])) == 2 && (Number(nums[2]) - Number(nums[3])) == 1 || (Number(nums[2]) - Number(nums[3])) == 2 && (Number(nums[2]) - Number(nums[1])) == 1 || (Number(nums[3]) - Number(nums[2])) == 2 && (Number(nums[2]) - Number(nums[1])) == -1) {
                    type1 = '顺子';
                } else if (((Number(nums[2]) - Number(nums[1])) == (Number(nums[3]) - Number(nums[2]))) && ((Number(nums[1]) - Number(nums[2])) == 1) && ((Number(nums[3]) - Number(nums[1])) == 1) && ((Number(nums[1]) - Number(nums[3])) == 1) && ((Number(nums[2]) - Number(nums[3])) == 1) || (nums[0] + nums[1] + nums[2] == '0,8,9' || nums[0] + nums[1] + nums[2] == '0,1,9')) {
                    type1 = '顺子';
                } else if (Number(nums[1]) == Number(nums[2]) || Number(nums[2]) == Number(nums[3]) || Number(nums[1]) == Number(nums[3])) {
                    type1 = '对子';
                } else if ((Number(nums[2]) - Number(nums[1])) == 1 || (Number(nums[1]) - Number(nums[2])) == 1 || (Number(nums[2]) - Number(nums[3])) == 1 || (Number(nums[3]) - Number(nums[2])) == 1 || (Number(nums[1]) - Number(nums[3])) == 1 || (Number(nums[3]) - Number(nums[1])) == 1 || (nums[3] + nums[1] == '0,9' || nums[2] + nums[1] == '0,9' || nums[2] + nums[3] == '0,9' || nums[3] + nums[2] == '0,9' || nums[1] + nums[3] == '0,9' || nums[1] + nums[2] == '0,9')) {
                    type1 = '半顺';
                } else {
                    type1 = '杂六';
                }
                $("#jsssc").find(".betweenThree").text(type1);
                var type2 = '';
                if ((Number(nums[2]) == Number(nums[3])) && (Number(nums[2]) == Number(nums[4]))) {
                    type2 = '豹子';
                } else if (((Number(nums[3]) - Number(nums[2])) == (Number(nums[4]) - Number(nums[3]))) && ((Number(nums[2]) - Number(nums[3])) == 1) && ((Number(nums[3]) - Number(nums[4])) == 1) && ((Number(nums[4]) - Number(nums[2])) == 1) && ((Number(nums[2]) - Number(nums[4])) == 1) || (nums == Array(0, 8, 9) || nums == Array(0, 1, 9))) {
                    type2 = '顺子';
                } else if ((Number(nums[2]) - Number(nums[3])) == 2 && (Number(nums[3]) - Number(nums[4])) == -1 || (Number(nums[3]) - Number(nums[2])) == 2 && (Number(nums[3]) - Number(nums[4])) == 1 || (Number(nums[3]) - Number(nums[4])) == 2 && (Number(nums[3]) - Number(nums[2])) == 1 || (Number(nums[4]) - Number(nums[3])) == 2 && (Number(nums[3]) - Number(nums[2])) == -1) {
                    type2 = '顺子';
                } else if (Number(nums[2]) == Number(nums[3]) || Number(nums[3]) == Number(nums[4]) || Number(nums[2]) == Number(nums[4])) {
                    type2 = '对子';
                } else if ((Number(nums[3]) - Number(nums[2])) == 1 || (Number(nums[2]) - Number(nums[3])) == 1 || (Number(nums[3]) - Number(nums[4])) == 1 || (Number(nums[4]) - Number(nums[3])) == 1 || (Number(nums[2]) - Number(nums[4])) == 1 || (Number(nums[4]) - Number(nums[2])) == 1 || (nums[4] + nums[2] == '0,9' || nums[3] + nums[2] == '0,9' || nums[3] + nums[4] == '0,9' || nums[4] + nums[3] == '0,9' || nums[2] + nums[4] == '0,9' || nums[2] + nums[3] == '0,9')) {
                    type2 = '半顺';
                } else {
                    type2 = '杂六';
                }
                $("#jsssc").find(".lastThree").text(type2);


                var niu = douniu(data.current.awardNumbers.split(','));

                //   var niu = test(nums);

                var suo = suoha(data.current.awardNumbers.split(','));
                $("#jsssc .longhu2").find(".douniu").text(niu);
                $("#jsssc .longhu2").find(".suoha").text(suo);
                cpNumber = data.current.periodNumber;
                var _time = data.current.awardTime.substring(11, 16);
                //  $(".num_ul .preDrawIssue").html(data.current.periodNumber);
                var number = data.current.fullPeriodNumber.substring(data.current.fullPeriodNumber.length - 3);
                $("#jsssc .drawCount").html(number);
                $("#jsssc .sdrawCountnext").html(1152 - number);
            });
    }

    function f7() {
        $.getJSON("/cqft/getCqsscAwardTimes.do",
            function (data) {
                clearInterval(xiaoguo);
                clearInterval(time_r12);
                clearInterval(time_r11);
                timer7(parseInt((data.next.awardTimeInterval) / 1000), "cqft .nextkai_time",'cqft');
                 timers7(parseInt((data.next.awardTimeInterval)/1000),".cqft .cuttime");
                $("#cqft .kajianhao").html("");
                var nums = data.current.awardNumbers.split(',');
                var str = Number(nums[0]) + Number(nums[1]) + Number(Number(nums[2])) + Number(nums[3]) + Number(nums[4]);
                //  cpNumber = data.current.periodNumber;
                var tan = str % 4;
                if (tan == 0) {
                    $("#cqft").find(".sumNum").text('4摊');
                    $("#cqft").find(".sumBigSmall").text("大");
                } else {

                    $("#cqft").find(".sumNum").text(tan + '摊');
                    $("#cqft").find(".sumBigSmall").text(tan >= 2 ? "大" : "小");
                }

                $("#cqft").find(".sumSingleDouble").text(tan % 2 == 0 ? "双" : "单");

                for (var i = 0; i < nums.length; i++) {
                    // str += ;
                    if (nums[i] == 10) {
                        $("#cqft .kajianhao").append("<li class='numblueHead'>" + nums[i] + "</li>");
                    } else {
                        $("#cqft .kajianhao").append("<li class='numblueHead'>" + nums[i] + "</li>");
                    }
                }
                cpNumber = data.current.periodNumber;
                var _time = data.current.awardTime.substring(11, 16);
                $("#cqft .preDrawIssue").html(120);
                $("#cqft .drawCount").html(cpNumber);
                $("#cqft .sdrawCountnext").html(120 - cpNumber);

            });
    }

    function f6() {
        $.getJSON("/pk10/getPk10AwardTimes.do", {t: Math.random()},
            function (data) {
                clearInterval(xiaoguo);
                clearInterval(time_r14);
                clearInterval(time_r13);
                timer8(parseInt((data.next.awardTimeInterval) / 1000), "bjft .nextkai_time", 'bjft');
                timers8(parseInt((data.next.awardTimeInterval) / 1000), ".bjft .cuttime");
                $("#bjft .kajianhao").html("");
                $("#bjft .longhu").html("");
                var nums = data.current.awardNumbers.split(',');

                for (var i = 0; i < nums.length; i++) {
                    // str += ;
                    if (nums[i] == 10) {
                        $("#bjft .kajianhao").append("<li class='nub" + nums[i] + "'></li>");
                    } else {
                        $("#bjft .kajianhao").append("<li class='nub0" + nums[i] + "'></li>");
                    }
                    //alert(nums[i]);
                }
                var num = Number(nums[0]) + Number(nums[1]) + Number(nums[2]);
                var str = num % 4;
                if (str == 0) {
                    $("#bjft").find(".sumBigSmall").text("大");
                    $("#bjft .rowbox2").find(".sumNum").text('4摊');
                } else {
                    $("#bjft .rowbox2").find(".sumNum").text(str + '摊');
                    $("#bjft").find(".sumBigSmall").text(str > 2 ? "大" : "小");
                }
                $("#bjft").find(".sumSingleDouble").text(num % 2 != 0 ? "单" : "双");


                var num2 = Number(nums[4]) + Number(nums[5]) + Number(nums[6]);
                var str = num2 % 4;
                if (str == 0) {
                    $("#bjft").find(".thirdSeafood").text("大");
                    $("#bjft .rowbox2").find(".firstSeafood").text('4摊');
                } else {
                    $("#bjft .rowbox2").find(".firstSeafood").text(str + '摊');
                    $("#bjft").find(".thirdSeafood").text(str > 2 ? "大" : "小");
                }
                $("#bjft").find(".secondSeafood").text(num2 % 2 != 0 ? "单" : "双");


                var num3 = Number(nums[7]) + Number(nums[8]) + Number(nums[9]);
                var str = num3 % 4;
                if (str == 0) {
                    $("#bjft").find(".dx").text("大");
                    $("#bjft .rowbox2").find(".tan").text('4摊');
                } else {
                    $("#bjft").find(".dx").text(str > 2 ? "大" : "小");
                    $("#bjft .rowbox2").find(".tan").text(str + '摊');
                }
                $("#bjft").find(".ds").text(num3 % 2 != 0 ? "单" : "双");

                cpNumber = data.current.periodNumber;
                var _time = data.current.awardTime.substring(11, 16);
                //  $(".num_ul .preDrawIssue").html(data.current.periodNumber);
                //      var number = data.current.fullPeriodNumber.substring(data.current.fullPeriodNumber.length-3);
                $("#bjft .drawCount").html(cpNumber);
                $("#bjft .sdrawCountnext ").html(Number(data.firstPeriod) + 179 - cpNumber);
            });
    }


    function f5() {
        $.getJSON("/gd11x5/getPk10AwardTimes.do", {t: Math.random()},
            function (data) {
                clearInterval(xiaoguo);
                clearInterval(time_r15);
                timer9(parseInt((data.next.awardTimeInterval) / 1000), "gd11x5 .nextkai_time", 'gd11x5');
                $("#gd11x5 .kajianhao").html("");
                var nums = data.current.awardNumbers.split(',');
                var str = Number(nums[0]) + Number(nums[1]) + Number(nums[2]) + Number(nums[3]) + Number(nums[4]);
                //  cpNumber = data.current.periodNumber;

                $("#gd11x5 .longhu2").find(".sumNum").text(str),
                    $("#gd11x5 .longhu2").find(".sumSingleDouble").text(str % 2 == 0 ? "双" : "单"),
                    $("#gd11x5 .longhu2").find(".sumBigSmall").text(str == 30 ? "和" : str > 30 ? "大" : "小");

                for (var i = 0; i < nums.length; i++) {
                    $("#gd11x5 .kajianhao").append("<li class='numblueHead'>" + nums[i] + "</li>")
                }
                var type = '';
                nums_1 = [nums[0], nums[1], nums[2]];
                if ((Number(nums[0]) == Number(nums[1])) && (Number(nums[0]) == Number(nums[2]))) {
                    type = '豹子';
                } else if ((Number(nums_1[1]) - Number(nums_1[0])) == (Number(nums_1[2]) - Number(nums_1[1])) && (Number(nums_1[1]) - Number(nums_1[0]) == 1) || (nums_1 == Array(0, 8, 9) || nums_1 == Array(0, 1, 9))) {
                    type = '顺子';
                } else if ((Number(nums[0]) - Number(nums[1])) == 2 && (Number(nums[1]) - Number(nums[2])) == -1 || (Number(nums[1]) - Number(nums[0])) == 2 && (Number(nums[1]) - Number(nums[2])) == 1 || (Number(nums[1]) - Number(nums[2])) == 2 && (Number(nums[1]) - Number(nums[0])) == 1 || (Number(nums[2]) - Number(nums[1])) == 2 && (Number(nums[1]) - Number(nums[0])) == -1) {
                    type = '顺子';
                } else if (Number(nums[0]) == Number(nums[1]) || Number(nums[1]) == Number(nums[2]) || Number(nums[0]) == Number(nums[2])) {
                    type = '对子';
                } else if ((Number(nums[0]) - Number(nums[1])) == 1 || (Number(nums[1]) - Number(nums[0])) == 1 || (Number(nums[2]) - Number(nums[1])) == 1 || (Number(nums[1]) - Number(nums[2])) == 1 || (Number(nums[0]) - Number(nums[2])) == 1 || (Number(nums[2]) - Number(nums[0])) == 1 || (nums[2] + nums[0] == '0,9' || nums[1] + nums[0] == '0,9' || nums[1] + nums[2] == '0,9' || nums[0] + nums[2] == '0,9' || nums[0] + nums[1] == '0,9' || nums[2] + nums[1] == '0,9')) {
                    type = '半顺';
                } else {
                    type = '杂六';
                }
                $("#gd11x5").find(".behindThree").text(type);
                var type1 = '';
                if ((Number(nums[1]) == Number(nums[2])) && (Number(nums[1]) == Number(nums[3]))) {
                    type1 = '豹子';
                } else if (((Number(nums[2]) - Number(nums[1])) == (Number(nums[3]) - Number(nums[2]))) && ((Number(nums[1]) - Number(nums[2])) == 1) && ((Number(nums[3]) - Number(nums[1])) == 1) && ((Number(nums[1]) - Number(nums[3])) == 1) && ((Number(nums[2]) - Number(nums[3])) == 1) || (nums[0] + nums[1] + nums[2] == '0,8,9' || nums[0] + nums[1] + nums[2] == '0,1,9')) {
                    type1 = '顺子';
                } else if ((Number(nums[1]) - Number(nums[2])) == 2 && (Number(nums[2]) - Number(nums[3])) == -1 || (Number(nums[2]) - Number(nums[1])) == 2 && (Number(nums[2]) - Number(nums[3])) == 1 || (Number(nums[2]) - Number(nums[3])) == 2 && (Number(nums[2]) - Number(nums[1])) == 1 || (Number(nums[3]) - Number(nums[2])) == 2 && (Number(nums[2]) - Number(nums[1])) == -1) {
                    type1 = '顺子';
                } else if (Number(nums[1]) == Number(nums[2]) || Number(nums[2]) == Number(nums[3]) || Number(nums[1]) == Number(nums[3])) {
                    type1 = '对子';
                } else if ((Number(nums[2]) - Number(nums[1])) == 1 || (Number(nums[1]) - Number(nums[2])) == 1 || (Number(nums[2]) - Number(nums[3])) == 1 || (Number(nums[3]) - Number(nums[2])) == 1 || (Number(nums[1]) - Number(nums[3])) == 1 || (Number(nums[3]) - Number(nums[1])) == 1 || (nums[3] + nums[1] == '0,9' || nums[2] + nums[1] == '0,9' || nums[2] + nums[3] == '0,9' || nums[3] + nums[2] == '0,9' || nums[1] + nums[3] == '0,9' || nums[1] + nums[2] == '0,9')) {
                    type1 = '半顺';
                } else {
                    type1 = '杂六';
                }
                $("#gd11x5").find(".betweenThree").text(type1);
                var type2 = '';
                if ((Number(nums[2]) == Number(nums[3])) && (Number(nums[2]) == Number(nums[4]))) {
                    type2 = '豹子';
                } else if (((Number(nums[3]) - Number(nums[2])) == (Number(nums[4]) - Number(nums[3]))) && ((Number(nums[2]) - Number(nums[3])) == 1) && ((Number(nums[3]) - Number(nums[4])) == 1) && ((Number(nums[4]) - Number(nums[2])) == 1) && ((Number(nums[2]) - Number(nums[4])) == 1) || (nums == Array(0, 8, 9) || nums == Array(0, 1, 9))) {
                    type2 = '顺子';
                } else if ((Number(nums[2]) - Number(nums[3])) == 2 && (Number(nums[3]) - Number(nums[4])) == -1 || (Number(nums[3]) - Number(nums[2])) == 2 && (Number(nums[3]) - Number(nums[4])) == 1 || (Number(nums[3]) - Number(nums[4])) == 2 && (Number(nums[3]) - Number(nums[2])) == 1 || (Number(nums[4]) - Number(nums[3])) == 2 && (Number(nums[3]) - Number(nums[2])) == -1) {
                    type2 = '顺子';
                } else if (Number(nums[2]) == Number(nums[3]) || Number(nums[3]) == Number(nums[4]) || Number(nums[1]) == Number(nums[4])) {
                    type2 = '对子';
                } else if ((Number(nums[3]) - Number(nums[2])) == 1 || (Number(nums[2]) - Number(nums[3])) == 1 || (Number(nums[3]) - Number(nums[4])) == 1 || (Number(nums[4]) - Number(nums[3])) == 1 || (Number(nums[2]) - Number(nums[4])) == 1 || (Number(nums[4]) - Number(nums[2])) == 1 || (nums[4] + nums[2] == '0,9' || nums[3] + nums[2] == '0,9' || nums[3] + nums[4] == '0,9' || nums[4] + nums[3] == '0,9' || nums[2] + nums[4] == '0,9' || nums[2] + nums[3] == '0,9')) {
                    type2 = '半顺';
                } else {
                    type2 = '杂六';
                }
                $("#gd11x5").find(".lastThree").text(type2);


                var cpNumber = data.current.periodNumber;
                var number = data.current.fullPeriodNumber.substring(data.current.fullPeriodNumber.length - 3);
                //  $(".num_ul .preDrawIssue").html(data.current.periodNumber);
                $("#gd11x5 .drawCount").html(number);
                $("#gd11x5 .sdrawCountnext").html(85 - number);

            });
    }


    function f4() {
        $.getJSON("/jsk3/getPk10AwardTimes.do", {t: Math.random()},
            function (data) {
                clearInterval(xiaoguo);
                clearInterval(time_r16);
                timer10(parseInt((data.next.awardTimeInterval) / 1000), "kuai3 .nextkai_time",'jsk3');
                var nums = data.current.awardNumbers.split(',');
                var str = Number(nums[0]) + Number(nums[1]) + Number(nums[2]);
                //  cpNumber = data.current.periodNumber;

                $("#kuai3 .rowbox2").find(".sumNum").text(str),
                    $("#kuai3 .rowbox2").find(".sumSingleDouble").text(str % 2 == 0 ? "双" : "单"),
                    $("#kuai3 .rowbox2").find(".sumBigSmall").text(str > 10 ? "大" : "小");

                for (var i = 0; i < nums.length; i++) {
                    $("#kuai3 .kajianhao li:eq(" + i + ")").removeClass()

                    $("#kuai3 .kajianhao li:eq(" + i + ")").addClass('num' + nums[i])
                }

                function test(a) {
                    switch (a) {
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
                // var number = data.current.fullPeriodNumber.substring(data.current.fullPeriodNumber.length-2);

                //  $("#kuai3 .preDrawIssue").html(cpNumber);
                $("#kuai3 .drawCount").html(cpNumber);
                $("#kuai3 .sdrawCountnext").html(82 - cpNumber);

            });
    }
    function f3() {
        $.getJSON("/pc28/getPk10AwardTimes.do", {t: Math.random()},
            function (data) {
            if(data){
                clearInterval(pc28_2);
            }
                clearInterval(xiaoguo);
                clearInterval(time_r17);
                timer11(parseInt((data.next.awardTimeInterval)), "pc28 .nextkai_time", 'pc28');
                var nums = data.current.awardNumbers.split(',');
                var totalNum_a = nums[1] + nums[4] + nums[7] + nums[10] + nums[13] + nums[16];
                var totalNum_b = nums[2] + nums[5] + nums[8] + nums[11] + nums[14] + nums[17];
                var totalNum_c = nums[3] + nums[6] + nums[9] + nums[12] + nums[15] + nums[18];
                totalNum_a = Number(totalNum_a) % 10;
                totalNum_b = Number(totalNum_b) % 10;
                totalNum_c = Number(totalNum_c) % 10;
                var totalNum = Number(totalNum_a) + Number(totalNum_b) + Number(totalNum_c);

                var sebo = '';
                var danshaung = '';
                //  cpNumber = data.current.periodNumber;
                $("#pc28 .kajianhao").find(".num11").text(totalNum_a);
                $("#pc28 .kajianhao").find(".num22").text(totalNum_b);
                $("#pc28 .kajianhao").find(".num33").text(totalNum_c);
                $("#pc28 .kajianhao").find(".num55").text(totalNum);
                if (totalNum == 1 || totalNum == 4 || totalNum == 7 || totalNum == 10 || totalNum == 16 || totalNum == 19 || totalNum == 22 || totalNum == 25) {
                    sebo = '绿波';
                } else if (totalNum == 2 || totalNum == 5 || totalNum == 8 || totalNum == 11 || totalNum == 17 || totalNum == 20 || totalNum == 23 || totalNum == 26) {
                    sebo = '蓝波';
                } else if (totalNum == 3 || totalNum == 6 || totalNum == 9 || totalNum == 12 || totalNum == 15 || totalNum == 18 || totalNum == 21 || totalNum == 24) {
                    sebo = '红波';
                } else if (totalNum == 0 || totalNum == 13 || totalNum == 14 || totalNum == 27) {
                    sebo = '和';
                }
                if (totalNum == 13 || totalNum == 14) {
                    danshaung = '和';
                } else if (totalNum < 13 && totalNum > 5) {
                    danshaung = '小';
                } else if (totalNum < 22 && totalNum > 14) {
                    danshaung = '大';
                } else if (totalNum <= 5 && totalNum >= 0) {
                    danshaung = '极小';
                } else if (totalNum <= 27 && totalNum >= 22) {
                    danshaung = '极大';
                }

                $("#pc28 .rowbox2").find(".sumNum").text(sebo),
                    $("#pc28 .rowbox2").find(".sumNum2").text(totalNum % 2 == 0 ? "双" : "单"),
                    $("#pc28 .rowbox2").find(".sumBigSmall").text(danshaung);
                var cpNumber = data.current.periodNumber;
                // var number = data.current.fullPeriodNumber.substring(data.current.fullPeriodNumber.length-2);

                //  $("#kuai3 .preDrawIssue").html(cpNumber);
                $("#pc28 .drawCount").html(cpNumber);
                // $("#pc28 .sdrawCountnext").html(82 - cpNumber);

            });
    }
    function f2() {

        $.getJSON("/txffc/getCqsscAwardTimes.do", {t: Math.random()},
            function (data) {
                clearInterval(xiaoguo);
                clearInterval(time_r18);
                timer12(parseInt((data.next.awardTimeInterval) / 1000), "txffc .nextkai_time", 'txffc');
                $("#txffc .kajianhao").html("");
                var nums = data.current.awardNumbers.split(',');
                var str = Number(nums[0]) + Number(nums[1]) + Number(Number(nums[2])) + Number(nums[3]) + Number(nums[4]);
                //  cpNumber = data.current.periodNumber;

                $("#txffc").find(".sumNum").text(str),
                    $("#txffc").find(".sumSingleDouble").text(str % 2 == 0 ? "双" : "单"),
                    $("#txffc").find(".sumBigSmall").text(str > 23 ? "大" : "小");
                for (var i = 0; i < nums.length; i++) {
                    $("#txffc .kajianhao").append("<li class='numblueHead'>" + nums[i] + "</li>");
                }

                if (Number(nums[0]) < Number(nums[4])) {
                    $("#txffc").find(".dragonTiger").text("虎");
                } else if (Number(nums[0]) > Number(nums[4])) {
                    $("#txffc").find(".dragonTiger").text("龙");
                    //  $("#longhu2").append("<td class='dragonTiger'>龙&nbsp;&nbsp;</td>");
                } else {
                    $("#txffc").find(".dragonTiger").text("和");
                    //$("#longhu2").append("<td class='dragonTiger'>和&nbsp;&nbsp;</td>");
                }

                if ((Number(nums[0]) == Number(nums[1])) && (Number(nums[0]) == Number(nums[2]))) {
                    type = '豹子';
                } else if (((Number(nums[1]) - Number(nums[0])) == (Number(nums[2]) - Number(nums[1]))) && ((Number(nums[0]) - Number(nums[1])) == 1) && ((Number(nums[1]) - Number(nums[2])) == 1) && ((Number(nums[0]) - Number(nums[2])) == 1) && ((Number(nums[2]) - Number(nums[0])) == 1) || (nums[0] + nums[1] + nums[2] == '0,8,9' || nums[0] + nums[1] + nums[2] == '0,1,9')) {
                    type = '顺子';
                } else if ((Number(nums[0]) - Number(nums[1])) == 2 && (Number(nums[1]) - Number(nums[2])) == -1 || (Number(nums[1]) - Number(nums[0])) == 2 && (Number(nums[1]) - Number(nums[2])) == 1 || (Number(nums[1]) - Number(nums[2])) == 2 && (Number(nums[1]) - Number(nums[0])) == 1 || (Number(nums[2]) - Number(nums[1])) == 2 && (Number(nums[1]) - Number(nums[0])) == -1) {
                    type = '顺子';
                } else if (Number(nums[0]) == Number(nums[1]) || Number(nums[1]) == Number(nums[2]) || Number(nums[0]) == Number(nums[2])) {
                    type = '对子';
                } else if ((Number(nums[0]) - Number(nums[1])) == 1 || (Number(nums[1]) - Number(nums[0])) == 1 || (Number(nums[2]) - Number(nums[1])) == 1 || (Number(nums[1]) - Number(nums[2])) == 1 || (Number(nums[0]) - Number(nums[2])) == 1 || (Number(nums[2]) - Number(nums[0])) == 1 || (nums[2] + nums[0] == '0,9' || nums[1] + nums[0] == '0,9' || nums[1] + nums[2] == '0,9' || nums[0] + nums[2] == '0,9' || nums[0] + nums[1] == '0,9' || nums[2] + nums[1] == '0,9')) {
                    type = '半顺';
                } else {
                    type = '杂六';
                }
                $("#txffc").find(".behindThree").text(type);
                var type1 = '';
                if ((Number(nums[1]) == Number(nums[2])) && (Number(nums[1]) == Number(nums[3]))) {
                    type1 = '豹子';
                } else if ((Number(nums[1]) - Number(nums[2])) == 2 && (Number(nums[2]) - Number(nums[3])) == -1 || (Number(nums[2]) - Number(nums[1])) == 2 && (Number(nums[2]) - Number(nums[3])) == 1 || (Number(nums[2]) - Number(nums[3])) == 2 && (Number(nums[2]) - Number(nums[1])) == 1 || (Number(nums[3]) - Number(nums[2])) == 2 && (Number(nums[2]) - Number(nums[1])) == -1) {
                    type1 = '顺子';
                } else if (((Number(nums[2]) - Number(nums[1])) == (Number(nums[3]) - Number(nums[2]))) && ((Number(nums[1]) - Number(nums[2])) == 1) && ((Number(nums[3]) - Number(nums[1])) == 1) && ((Number(nums[1]) - Number(nums[3])) == 1) && ((Number(nums[2]) - Number(nums[3])) == 1) || (nums[0] + nums[1] + nums[2] == '0,8,9' || nums[0] + nums[1] + nums[2] == '0,1,9')) {
                    type1 = '顺子';
                } else if (Number(nums[1]) == Number(nums[2]) || Number(nums[2]) == Number(nums[3]) || Number(nums[1]) == Number(nums[3])) {
                    type1 = '对子';
                } else if ((Number(nums[2]) - Number(nums[1])) == 1 || (Number(nums[1]) - Number(nums[2])) == 1 || (Number(nums[2]) - Number(nums[3])) == 1 || (Number(nums[3]) - Number(nums[2])) == 1 || (Number(nums[1]) - Number(nums[3])) == 1 || (Number(nums[3]) - Number(nums[1])) == 1 || (nums[3] + nums[1] == '0,9' || nums[2] + nums[1] == '0,9' || nums[2] + nums[3] == '0,9' || nums[3] + nums[2] == '0,9' || nums[1] + nums[3] == '0,9' || nums[1] + nums[2] == '0,9')) {
                    type1 = '半顺';
                } else {
                    type1 = '杂六';
                }
                $("#txffc").find(".betweenThree").text(type1);
                var type2 = '';
                if ((Number(nums[2]) == Number(nums[3])) && (Number(nums[2]) == Number(nums[4]))) {
                    type2 = '豹子';
                } else if (((Number(nums[3]) - Number(nums[2])) == (Number(nums[4]) - Number(nums[3]))) && ((Number(nums[2]) - Number(nums[3])) == 1) && ((Number(nums[3]) - Number(nums[4])) == 1) && ((Number(nums[4]) - Number(nums[2])) == 1) && ((Number(nums[2]) - Number(nums[4])) == 1) || (nums == Array(0, 8, 9) || nums == Array(0, 1, 9))) {
                    type2 = '顺子';
                } else if ((Number(nums[2]) - Number(nums[3])) == 2 && (Number(nums[3]) - Number(nums[4])) == -1 || (Number(nums[3]) - Number(nums[2])) == 2 && (Number(nums[3]) - Number(nums[4])) == 1 || (Number(nums[3]) - Number(nums[4])) == 2 && (Number(nums[3]) - Number(nums[2])) == 1 || (Number(nums[4]) - Number(nums[3])) == 2 && (Number(nums[3]) - Number(nums[2])) == -1) {
                    type2 = '顺子';
                } else if (Number(nums[2]) == Number(nums[3]) || Number(nums[3]) == Number(nums[4]) || Number(nums[2]) == Number(nums[4])) {
                    type2 = '对子';
                } else if ((Number(nums[3]) - Number(nums[2])) == 1 || (Number(nums[2]) - Number(nums[3])) == 1 || (Number(nums[3]) - Number(nums[4])) == 1 || (Number(nums[4]) - Number(nums[3])) == 1 || (Number(nums[2]) - Number(nums[4])) == 1 || (Number(nums[4]) - Number(nums[2])) == 1 || (nums[4] + nums[2] == '0,9' || nums[3] + nums[2] == '0,9' || nums[3] + nums[4] == '0,9' || nums[4] + nums[3] == '0,9' || nums[2] + nums[4] == '0,9' || nums[2] + nums[3] == '0,9')) {
                    type2 = '半顺';
                } else {
                    type2 = '杂六';
                }
                $("#txffc").find(".lastThree").text(type2);


                var niu = douniu(data.current.awardNumbers.split(','));

                //   var niu = test(nums);

                var suo = suoha(data.current.awardNumbers.split(','));
                $("#txffc .longhu2").find(".douniu").text(niu);
                $("#txffc .longhu2").find(".suoha").text(suo);
                cpNumber = (data.current.periodNumber-data.current.firstPeriod);
                var _time = data.current.awardTime.substring(11, 16);
                //  $(".num_ul .preDrawIssue").html(data.current.periodNumber);
                var number = data.current.periodNumber;
                $("#txffc .drawCount").html(number);
                $("#txffc .sdrawCountnext").html(1440 - cpNumber);
            });
    }


//斗牛算法
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
            console.log(num4);
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

    console.log(niu);
    return niu;

}
var time_r;
var time_r1;
var time_r2;
var time_r3;
var time_r4;
var time_r5;
var time_r6;
var time_r7;
var time_r8;
var time_r9;
var time_r10;
var time_r11;
var time_r12;
var time_r13;
var time_r14;
var time_r15;
var time_r16;
var time_r17;
var time_r18;
var time_r19;
var time_r20;
//梭哈算法
function suoha(nums){
    if(Number(nums[4])-Number(nums[3]) == 1 && Number(nums[3])-Number(nums[2]) == 1 && Number(nums[2])-Number(nums[1]) == 1 && Number(nums[1])-Number(nums[0]) == 1 || nums == [0,1,2,3,4] || nums == [6,7,8,9,0] ||
        nums == [7,8,9,0,1] || nums == [8,9,0,1,2] || nums == [9,0,1,2,3]){
        suo = '顺子';
    }else {
        var _res = []; //

        nums.sort();
        for (var i = 0; i < nums.length;) {
            var count = 0;
            for (var j = i; j < nums.length; j++) {
                if (nums[i] == nums[j]) {
                    count++;
                }
            }
            _res.push([nums[i], count]);
            i += count;
        }

        console.log(_res)
        //_res 二维数维中保存了 值和值的重复数
        var _newArr = [];
        for (var i = 0; i < _res.length; i++) {
            // console.log(_res[i][0] + "重复次数:" + _res[i][1]);
            if(_res[i][1] > 1){
                _newArr.push(_res[i][1]);
            }

        }

        console.log(_newArr);
        var suo = '';

        if(_newArr){
            if(_newArr.length == 1 && _newArr[0] == 2){
                suo = '对子';
            }else if(_newArr.length == 2 && _newArr[0] == 2 && _newArr[1] == 2){
                suo = '两对';
            }else if(_newArr.length == 1 && _newArr[0] == 3){
                suo = '三条';
            }else if(_newArr.length == 1 && _newArr[0] == 4){
                suo = '四条';
            }else if(_newArr.length == 1 && _newArr[0] == 5){
                suo = '五条';
            }else if(_newArr.length == 2 && _newArr[0] == 2 & _newArr[1] == 3 || _newArr[0] == 3 && _newArr[1] == 2) {
                suo = '葫芦';
            }else {
                suo = '散号';
            }
        }else {
            suo = '散号';

        }
    }
    return suo;
}

//pk10
 function timer(intDiff,div,name){

	 time_r = window.setInterval( function(){
        var day=0,
            hour=0,
            minute=0,
            second=0;//时间默认值
        if(intDiff-1 > 0){
            day = Math.floor(intDiff / (60 * 60 * 24));
            hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
            minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        }
        if(minute == 0 && second <= 30){
            $("#"+div+" .opentyle").text("开奖中...");
        }else {
            $("#"+div+" .opentyle").text("");
        }
        $("#"+div+" .minute").text(minute);
        $("#"+div+" .second").text(second);

        m = minute;
        s = second;
        intDiff--;
        if(intDiff==0) {
            $(div+" .minute").text('');
            $(div+" .second").text('');
          //  f(name);
            setTimeout('indexdata()',3000)
        }
    }, 1000);

}
function timers(intDiff,div,name){
    time_r1 =   window.setInterval(function(){
        var day=0,
            hour=0,
            minute=0,
            second=0;//时间默认值
        if(intDiff-1 > 0){
            day = Math.floor(intDiff / (60 * 60 * 24));
            hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
            minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        }
        if(minute == 0 && second <= 30){
            $("#"+div+" .opentyle").text("开奖中...");
        }else {
            $("#"+div+" .opentyle").text("");
        }
        if(hour != 0 || hour != null || hour != ''){
            $(div+" .hour").text(hour);
        }

            $(div+" .minute").text(minute);
            $(div+" .second").text(second);


        intDiff--;
        if(intDiff==0) {
            $(div+" .minute").text('');
            $(div+" .second").text('');
            setTimeout('indexdata()',3000)
        }
    }, 1000);
}

//xyft
function timer2(intDiff,div,name){
    time_r2 = window.setInterval( function(){
        var day=0,
            hour=0,
            minute=0,
            second=0;//时间默认值
        if(intDiff-1 > 0){
            day = Math.floor(intDiff / (60 * 60 * 24));
            hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
            minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        }
        if(minute == 0 && second <= 30){
            $("#"+div+" .opentyle").text("开奖中...");
        }else {
            $("#"+div+" .opentyle").text("");
        }
        $("#"+div+" .minute").text(minute);
        $("#"+div+" .second").text(second);

        m = minute;
        s = second;
        intDiff--;
        if(intDiff==0) {
            $(div + " .minute").text('');
            $(div + " .second").text('');
           // f(name);
            setTimeout('f12()', 3000)
        }
    }, 1000);

}
function timers2(intDiff,div,name){
    time_r3 =  window.setInterval(function(){
        var day=0,
            hour=0,
            minute=0,
            second=0;//时间默认值
        if(intDiff-1 > 0){
            day = Math.floor(intDiff / (60 * 60 * 24));
            hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
            minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        }
        if(minute == 0 && second <= 30){
            $("#"+div+" .opentyle").text("开奖中...");
        }else {
            $("#"+div+" .opentyle").text("");
        }
        if(hour != 0 || hour != null || hour != ''){
            $(div+" .hour").text(hour);
        }

        $(div+" .minute").text(minute);
        $(div+" .second").text(second);


        intDiff--;
        if(intDiff==0) {
            $(div + " .minute").text('');
            $(div + " .second").text('');
            setTimeout('f12()', 3000);
        }
    }, 1000);
}

//cqssc
function timer3(intDiff,div,name){
    time_r4 = window.setInterval( function(){
        var day=0,
            hour=0,
            minute=0,
            second=0;//时间默认值
        if(intDiff-1 > 0){
            day = Math.floor(intDiff / (60 * 60 * 24));
            hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
            minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        }
        if(minute == 0 && second <= 30){
            $("#"+div+" .opentyle").text("开奖中...");
        }else {
            $("#"+div+" .opentyle").text("");
        }
        $("#"+div+" .minute").text(minute);
        $("#"+div+" .second").text(second);

        m = minute;
        s = second;
        intDiff--;
        if(intDiff==0) {
            $(div+" .minute").text('');
            $(div+" .second").text('');
            //f(name);
                setTimeout('f11()',3000);
        }
    }, 1000);

}
function timers3(intDiff,div,name){
    time_r5 = window.setInterval(function(){


        var day=0,
            hour=0,
            minute=0,
            second=0;//时间默认值
        if(intDiff-1 > 0){
            day = Math.floor(intDiff / (60 * 60 * 24));
            hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
            minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        }
        if(minute == 0 && second <= 30){
            $("#"+div+" .opentyle").text("开奖中...");
        }else {
            $("#"+div+" .opentyle").text("");
        }
        if(hour != 0 || hour != null || hour != ''){
            $(div+" .hour").text(hour);
        }

        $(div+" .minute").text(minute);
        $(div+" .second").text(second);


        intDiff--;
        if(intDiff==0) {
            $(div+" .minute").text('');
            $(div+" .second").text('');
                setTimeout('f11()',3000)
        }
    }, 1000);
}

//gdkl10
function timer4(intDiff,div,name){

    time_r6 = window.setInterval( function(){
        var day=0,
            hour=0,
            minute=0,
            second=0;//时间默认值
        if(intDiff-1 > 0){
            day = Math.floor(intDiff / (60 * 60 * 24));
            hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
            minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        }
        if(minute == 0 && second <= 30){
            $("#"+div+" .opentyle").text("开奖中...");
        }else {
            $("#"+div+" .opentyle").text("");
        }
        $("#"+div+" .minute").text(minute);
        $("#"+div+" .second").text(second);

        m = minute;
        s = second;
        intDiff--;
        if(intDiff==0) {
            $(div+" .minute").text('');
            $(div+" .second").text('');
            //Locan();
            //f(name);
                setTimeout('f10()',3000)
        }
    }, 1000);

}

//jssc
function timer5(intDiff,div,name){

    time_r7 = window.setInterval( function(){
        var day=0,
            hour=0,
            minute=0,
            second=0;//时间默认值
        if(intDiff-1 > 0){
            day = Math.floor(intDiff / (60 * 60 * 24));
            hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
            minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        }
        if(minute == 0 && second <= 30){
            $("#"+div+" .opentyle").text("开奖中...");
        }else {
            $("#"+div+" .opentyle").text("");
        }
        $("#"+div+" .minute").text(minute);
        $("#"+div+" .second").text(second);

        m = minute;
        s = second;
        intDiff--;
        if(intDiff==0) {
            $(div+" .minute").text('');
            $(div+" .second").text('');
           // f(name);
                setTimeout('f9()',3000)
        }
    }, 1000);

}
function timers5(intDiff,div,name){

    time_r8 = window.setInterval(function(){


        var day=0,
            hour=0,
            minute=0,
            second=0;//时间默认值
        if(intDiff-1 > 0){
            day = Math.floor(intDiff / (60 * 60 * 24));
            hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
            minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        }
        if(minute == 0 && second <= 30){
            $("#"+div+" .opentyle").text("开奖中...");
        }else {
            $("#"+div+" .opentyle").text("");
        }
        if(hour != 0 || hour != null || hour != ''){
            $(div+" .hour").text(hour);
        }

        $(div+" .minute").text(minute);
        $(div+" .second").text(second);


        intDiff--;
        if(intDiff==0) {
            $(div+" .minute").text('');
            $(div+" .second").text('');
           // f(name);
                setTimeout('f9()',3000);
        }
    }, 1000);
}

//jsssc
function timer6(intDiff,div,name){

    time_r9 = window.setInterval( function(){
        var day=0,
            hour=0,
            minute=0,
            second=0;//时间默认值
        if(intDiff-1 > 0){
            day = Math.floor(intDiff / (60 * 60 * 24));
            hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
            minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        }
        if(minute == 0 && second <= 30){
            $("#"+div+" .opentyle").text("开奖中...");
        }else {
            $("#"+div+" .opentyle").text("");
        }
        $("#"+div+" .minute").text(minute);
        $("#"+div+" .second").text(second);

        m = minute;
        s = second;
        intDiff--;
        if(intDiff==0) {
            $(div+" .minute").text('');
            $(div+" .second").text('');
           // f(name);
            setTimeout('f8()',3000);
        }
    }, 1000);

}
function timers6(intDiff,div,name){

    time_r10 = window.setInterval(function(){


        var day=0,
            hour=0,
            minute=0,
            second=0;//时间默认值
        if(intDiff-1 > 0){
            day = Math.floor(intDiff / (60 * 60 * 24));
            hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
            minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        }
        if(minute == 0 && second <= 30){
            $("#"+div+" .opentyle").text("开奖中...");
        }else {
            $("#"+div+" .opentyle").text("");
        }
        if(hour != 0 || hour != null || hour != ''){
            $(div+" .hour").text(hour);
        }

        $(div+" .minute").text(minute);
        $(div+" .second").text(second);


        intDiff--;
        if(intDiff==0) {
            $(div+" .minute").text('');
            $(div+" .second").text('');
          //  f(name);
            setTimeout('f8()',3000);
        }
    }, 1000);
}
//cqft
function timer7(intDiff,div,name){

    time_r11 = window.setInterval( function(){
        var day=0,
            hour=0,
            minute=0,
            second=0;//时间默认值
        if(intDiff-1 > 0){
            day = Math.floor(intDiff / (60 * 60 * 24));
            hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
            minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        }
        if(minute == 0 && second <= 30){
            $("#"+div+" .opentyle").text("开奖中...");
        }else {
            $("#"+div+" .opentyle").text("");
        }
        $("#"+div+" .minute").text(minute);
        $("#"+div+" .second").text(second);

        m = minute;
        s = second;
        intDiff--;
        if(intDiff==0) {
            $(div+" .minute").text('');
            $(div+" .second").text('');
           // f(name);
                setTimeout('f7()',3000)
        }
    }, 1000);

}
function timers7(intDiff,div,name){

    time_r12 = window.setInterval(function(){


        var day=0,
            hour=0,
            minute=0,
            second=0;//时间默认值
        if(intDiff-1 > 0){
            day = Math.floor(intDiff / (60 * 60 * 24));
            hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
            minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        }
        if(minute == 0 && second <= 30){
            $("#"+div+" .opentyle").text("开奖中...");
        }else {
            $("#"+div+" .opentyle").text("");
        }
        if(hour != 0 || hour != null || hour != ''){
            $(div+" .hour").text(hour);
        }

        $(div+" .minute").text(minute);
        $(div+" .second").text(second);


        intDiff--;
        if(intDiff==0) {
            $(div+" .minute").text('');
            $(div+" .second").text('');
          //  f(name);
                setTimeout('f7()',3000)
        }
    }, 1000);
}

//bjft
function timer8(intDiff,div,name){

    time_r13 = window.setInterval( function(){
        var day=0,
            hour=0,
            minute=0,
            second=0;//时间默认值
        if(intDiff-1 > 0){
            day = Math.floor(intDiff / (60 * 60 * 24));
            hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
            minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        }
        if(minute == 0 && second <= 30){
            $("#"+div+" .opentyle").text("开奖中...");
        }else {
            $("#"+div+" .opentyle").text("");
        }
        $("#"+div+" .minute").text(minute);
        $("#"+div+" .second").text(second);

        m = minute;
        s = second;
        intDiff--;
        if(intDiff==0) {
            $(div+" .minute").text('');
            $(div+" .second").text('');
            //f(name);
                setTimeout('f6()',3000)
        }
    }, 1000);

}
function timers8(intDiff,div,name){

    time_r14 = window.setInterval(function(){


        var day=0,
            hour=0,
            minute=0,
            second=0;//时间默认值
        if(intDiff-1 > 0){
            day = Math.floor(intDiff / (60 * 60 * 24));
            hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
            minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        }
        if(minute == 0 && second <= 30){
            $("#"+div+" .opentyle").text("开奖中...");
        }else {
            $("#"+div+" .opentyle").text("");
        }
        if(hour != 0 || hour != null || hour != ''){
            $(div+" .hour").text(hour);
        }

        $(div+" .minute").text(minute);
        $(div+" .second").text(second);


        intDiff--;
        if(intDiff==0) {
            $(div+" .minute").text('');
            $(div+" .second").text('');
            //f(name);
                setTimeout('f6()',3000)
        }
    }, 1000);
}
//gd11x5
function timer9(intDiff,div,name){

    time_r15 = window.setInterval( function(){
        var day=0,
            hour=0,
            minute=0,
            second=0;//时间默认值
        if(intDiff-1 > 0){
            day = Math.floor(intDiff / (60 * 60 * 24));
            hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
            minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        }
        if(minute == 0 && second <= 30){
            $("#"+div+" .opentyle").text("开奖中...");
        }else {
            $("#"+div+" .opentyle").text("");
        }
        $("#"+div+" .minute").text(minute);
        $("#"+div+" .second").text(second);

        m = minute;
        s = second;
        intDiff--;
        if(intDiff==0) {
            $(div+" .minute").text('');
            $(div+" .second").text('');
            //f(name);
                setTimeout('f5()',3000)
        }
    }, 1000);

}
//jsk3
function timer10(intDiff,div,name){

    time_r16 = window.setInterval( function(){
        var day=0,
            hour=0,
            minute=0,
            second=0;//时间默认值
        if(intDiff-1 > 0){
            day = Math.floor(intDiff / (60 * 60 * 24));
            hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
            minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        }
        if(minute == 0 && second <= 30){
            $("#"+div+" .opentyle").text("开奖中...");
        }else {
            $("#"+div+" .opentyle").text("");
        }
        $("#"+div+" .minute").text(minute);
        $("#"+div+" .second").text(second);

        m = minute;
        s = second;
        intDiff--;
        if(intDiff==0) {
            $(div+" .minute").text('');
            $(div+" .second").text('');
            //f(name);
                setTimeout('f4()',3000)
        }
    }, 1000);

}
//pc28
function timer11(intDiff,div,name){

    time_r17 =  window.setInterval(function(){


        var day=0,
            hour=0,
            minute=0,
            second=0;//时间默认值
        if(intDiff-1 > 0){
            day = Math.floor(intDiff / (60 * 60 * 24));
            hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
            minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        }
        if(minute == 0 && second <= 30){
            $("#"+div+" .opentyle").text("开奖中...");
        }else {
            $("#"+div+" .opentyle").text("");
        }
        if(hour != 0 || hour != null || hour != ''){
            $(div+" .hour").text(hour);
        }

        $("#"+div+" .minute").text(minute);
        $("#"+div+" .second").text(second);


        intDiff--;
        if(intDiff==0) {
            $("#"+div+" .minute").text('');
            $("#"+div+" .second").text('');
           // f(name);
            pc28_2 =   window.setInterval('f3()',3000);
        }
    }, 1000);
}
var pc28_2;
//txffc
function timer12(intDiff,div,name){
    time_r18 = window.setInterval( function(){
        var day=0,
            hour=0,
            minute=0,
            second=0;//时间默认值
        if(intDiff-1 > 0){
            day = Math.floor(intDiff / (60 * 60 * 24));
            hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
            minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        }
        if(minute == 0 && second <= 30){
            $("#"+div+" .opentyle").text("开奖中...");
        }else {
            $("#"+div+" .opentyle").text("");
        }
        $("#"+div+" .minute").text(minute);
        $("#"+div+" .second").text(second);

        m = minute;
        s = second;
        intDiff--;
        if(intDiff==0) {
            $(div+" .minute").text('');
            $(div+" .second").text('');
            //f(name);
                setTimeout('f2()',3000)
        }
    }, 1000);
}
//pk10_hot
function timer13(intDiff,div,name){
    time_r19 = window.setInterval( function(){
        var day=0,
            hour=0,
            minute=0,
            second=0;//时间默认值
        if(intDiff-1 > 0){
            day = Math.floor(intDiff / (60 * 60 * 24));
            hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
            minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        }
        if(minute == 0 && second <= 30){
            $("#"+div+" .opentyle").text("开奖中...");
        }else {
            $("#"+div+" .opentyle").text("");
        }
        $("#"+div+" .minute").text(minute);
        $("#"+div+" .second").text(second);

        m = minute;
        s = second;
        intDiff--;
        if(intDiff==0) {
            $(div+" .minute").text('');
            $(div+" .second").text('');
           // f(name);
            setTimeout('indexdata()',3000)
        }
    }, 1000);
}
//cqssc_hot
function timer14(intDiff,div,name){
    time_r20 = window.setInterval( function(){
        var day=0,
            hour=0,
            minute=0,
            second=0;//时间默认值
        if(intDiff-1 > 0){
            day = Math.floor(intDiff / (60 * 60 * 24));
            hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
            minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        }
        if(minute == 0 && second <= 30){
            $("#"+div+" .opentyle").text("开奖中...");
        }else {
            $("#"+div+" .opentyle").text("");
        }
        $("#"+div+" .minute").text(minute);
        $("#"+div+" .second").text(second);

        m = minute;
        s = second;
        intDiff--;
        if(intDiff==0) {
            $(div+" .minute").text('');
            $(div+" .second").text('');
            //f(name);
            setTimeout('f11()',3000)
        }
    }, 1000);
}

var xiaoguo;
function f(div) {
    var i = 0;
    function test(){
        i++;
        if(div == 'jsssc' || div == 'cqssc' || div == 'cqssc_hot' || div == 'txffc' || div == 'cqft'){
            if(i > 9){
                i = 0;
            }
            $("#"+div+" .numblueHead").text(i);
        }else if(div == 'gd11x5' ){
            if(i > 11){
                i = 1;
            }
            $("#"+div+" .numblueHead").text((Number(i)+1));
        }else if(div == 'gdkl10' ){
            if(i > 20){
                i = 1;
            }
            $("#"+div+" .numblueHead").text((Number(i)+1));
        }else  if(div == 'kuai3'){
            if(i > 6){
                i = 1;
            }
            $("#"+div+" .kajianhao li:eq(" + i +")").removeClass();

            $("#"+div+" .kajianhao li:eq(" + i +")").addClass('num'+i)
        }else  if(div == 'jssc' || div == 'bjft' || div == 'pk10_hot' || div == 'pk10' || div == 'xyft'){
            if(i > 11){
                i = 1;
            }
            $("#"+div+" .numberbox  li:eq(" + i +")").removeClass();
            var n ;
            if(i == 10){
                n = 'nub'+i;
                $("#"+div+" .numberbox  li:eq(" + i +")").addClass(n)
            }else {
                n = 'nub0'+i;
                $("#"+div+" .numberbox  li:eq(" + i +")").addClass(n)
            }
            $("#"+div+" .numberbox "+n).text(i)
        }
    }
    xiaoguo = window.setInterval(test,100);

}
//
function Locan() {

    $('#kajianhao3').html('');
    indexdata();
}

