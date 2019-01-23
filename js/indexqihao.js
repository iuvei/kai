
bjpk10();
cqssc();
jsk3();
xyft();
txffc();
gd11x5();
//bjft();
/*倒计时ID*/
var jsk3_itvId =null;
var cqssc_itvId =null;
var bjpk10_hot_itvId =null;
var bjpk10_itvId =null;
var xyft_itvId =null;
var txffc_itvId =null;
var gd11x5_itvId =null;
var bjft_itvId =null;
var cqft_itvId =null;
var cqssc_hot_itvId =null;

/*倒计时*/
function countDown(time,gamekey){
     var itvId=setInterval(function () {
            var  minute=0, second=0;
            if(time-1 > 0){
                minute = Math.floor(time / 60);
                second = Math.floor(time) - (minute * 60);
            }
            if(minute == 0 && second <= 30){
                $("#"+gamekey+" .opentyle").text("开奖中...");
            }else {
                $("#"+gamekey+" .opentyle").text("");
            }
            $("#"+gamekey+" .minute").text(minute);
            $("#"+gamekey+" .second").text(second);

            time--;
            if(time<=0) {
                $(gamekey+" .minute").text('');
                $(gamekey+" .second").text('');
                switch (gamekey) {
                    case 'jsk3':
                        jsk3();
                        break;
                    case 'cqSsc_hot':
                        cqssc();
                        break;
                    case 'pk10_hot':
                        bjpk10();
                        break;
                    case 'xyft':
                        xyft();
                        break;
                    case 'txffc':
                        txffc();
                        break;
                    case 'gd11x5':
                        gd11x5();
                        break;
                    case 'bjft':
                        bjft();
                        break;
                }
            }
        },1000);
        return itvId
}
/*斗牛算法*/
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

    return niu;

}
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
/*快3鱼虾蟹*/
function yxx(a) {
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
/*时时彩龙虎*/
function sscLh(num0,num4,id) {
    if (Number(num0) < Number(num4)) {
        $("#" + id).find(".dragonTiger").text("虎");
    } else if (Number(num0) > Number(num4)) {
        $("#" + id).find(".dragonTiger").text("龙");
    } else {
        $("#" + id).find(".dragonTiger").text("和");
    }
}
/*时时彩前中后三*/
function sscqzhs(nums0,nums1,nums2,id,tdClass) {
    var type = '';
    if ((Number(nums0) == Number(nums1)) && (Number(nums0) == Number(nums2))) {
        type = '豹子';
    } else if (((Number(nums1) - Number(nums0)) == (Number(nums2) - Number(nums1))) && ((Number(nums0) - Number(nums1)) == 1) && ((Number(nums1) - Number(nums2)) == 1) && ((Number(nums0) - Number(nums2)) == 1) && ((Number(nums2) - Number(nums0)) == 1) || (nums0 + nums1 + nums2 == '0,8,9' || nums0 + nums1 + nums2 == '0,1,9')) {
        type = '顺子';
    } else if ((Number(nums0) - Number(nums1)) == 2 && (Number(nums1) - Number(nums2)) == -1 || (Number(nums1) - Number(nums0)) == 2 && (Number(nums1) - Number(nums2)) == 1 || (Number(nums1) - Number(nums2)) == 2 && (Number(nums1) - Number(nums0)) == 1 || (Number(nums2) - Number(nums1)) == 2 && (Number(nums1) - Number(nums0)) == -1) {
        type = '顺子';
    } else if (Number(nums0) == Number(nums1) || Number(nums1) == Number(nums2) || Number(nums0) == Number(nums2)) {
        type = '对子';
    } else if ((Number(nums0) - Number(nums1)) == 1 || (Number(nums1) - Number(nums0)) == 1 || (Number(nums2) - Number(nums1)) == 1 || (Number(nums1) - Number(nums2)) == 1 || (Number(nums0) - Number(nums2)) == 1 || (Number(nums2) - Number(nums0)) == 1 || (nums2 + nums0 == '0,9' || nums1 + nums0 == '0,9' || nums1 + nums2 == '0,9' || nums0 + nums2 == '0,9' || nums0 + nums1 == '0,9' || nums2 + nums1 == '0,9')) {
        type = '半顺';
    } else {
        type = '杂六';
    }
    $("#" + id).find("."+tdClass).text(type);
}
/*时时彩总和*/
function sscZh(num,type) {
    switch (type) {
        case 'size':
            if(num>=23){return '大'}else {return '小'}
            break
        case 'oddEven':
            if(num%2==0){return '双'}else {return '单'}
            break
    }

}
/*pk10龙虎*/
function pk10Lh(num1,num2) {
    var n1 = parseInt(num1);
    var n2 = parseInt(num2);
    if(n1>n2){return '龙'}else {return '虎'}
}
/*pk10冠亚和*/
function pk10Zh(num,type) {
    if(type=='size'){
        if(num>11){
            return '大'
        }else if(num<11){
            return '小'
        }else {return '和'}
    }else if(type=='oddEven'){
        if(num==11){
            return '和'
        }else if(num%2==0){
            return '双'
        }else {
            return '单'
        }
    }

}
function bjpk10() {
    $.getJSON("/pk10/getPk10AwardTimes.do", {t: Math.random()},
        function (data) {
            if(bjpk10_itvId){
                clearInterval(bjpk10_itvId);
                clearInterval(bjpk10_hot_itvId);
                clearInterval(bjft_itvId)
            }
            var time = parseInt(data.next.awardTimeInterval) / 1000;
            bjpk10_itvId = countDown(time,'pk10_hot');
            bjpk10_hot_itvId = countDown(time,'pk10');
            bjft_itvId = countDown(time,'bjft');

            if(data.current.awardNumbers == '' || data.current.awardNumbers == null){
                setTimeout(function () {
                    bjpk10()
                },3000);
                return
            }
            //号码
            var nums = data.current.awardNumbers.split(',');
            for (var i = 0; i < nums.length; i++) {
                $("#pk10_hot .numberbox li:eq(" + i + ")").removeClass();
                $("#pk10 .numberbox li:eq(" + i + ")").removeClass();
                $("#pk10_hot .numberbox li:eq(" + i + ")").addClass("nub" + nums[i]);
                $("#pk10 .numberbox li:eq(" + i + ")").addClass("nub" + nums[i]);
                $("#bjft .kajianhao li:eq(" + i + ")").removeClass();
                $("#bjft .kajianhao li:eq(" + i + ")").addClass("nub" + nums[i]);

            }
            //龙虎
            $("#pk10_hot .longhu td:eq(0)").text(pk10Lh(nums[0],nums[9]));
            $("#pk10_hot .longhu td:eq(1)").text(pk10Lh(nums[1],nums[8]));
            $("#pk10_hot .longhu td:eq(2)").text(pk10Lh(nums[2],nums[7]));
            $("#pk10_hot .longhu td:eq(3)").text(pk10Lh(nums[3],nums[6]));
            $("#pk10_hot .longhu td:eq(4)").text(pk10Lh(nums[4],nums[5]));
            $("#pk10 .longhu td:eq(0)").text(pk10Lh(nums[0],nums[9]));
            $("#pk10 .longhu td:eq(1)").text(pk10Lh(nums[1],nums[8]));
            $("#pk10 .longhu td:eq(2)").text(pk10Lh(nums[2],nums[7]));
            $("#pk10 .longhu td:eq(3)").text(pk10Lh(nums[3],nums[6]));
            $("#pk10 .longhu td:eq(4)").text(pk10Lh(nums[4],nums[5]));
            //冠亚和
            var num = Number(nums[0]) + Number(nums[1]);
            $("#pk10_hot .sumFS").text(num);
            $("#pk10 .sumFS").text(num);
            $("#pk10 .sumBigSamll").text(pk10Zh(parseInt(num),'size'));
            $("#pk10_hot .sumBigSamll").text(pk10Zh(parseInt(num),'size'));
            $("#pk10 .sumSingleDouble").text(pk10Zh(parseInt(num),'oddEven'));
            $("#pk10_hot .sumSingleDouble").text(pk10Zh(parseInt(num),'oddEven'));

            var num = Number(nums[0]) + Number(nums[1]) + Number(nums[2]);
            var str = num % 4;
            if (str == 0) {
                $("#bjft .sumBigSmall").text("大");
                $("#bjft .sumNum").text('4摊');
            } else {
                $("#bjft .sumNum").text(str + '摊');
                $("#bjft .sumBigSmall").text(str > 2 ? "大" : "小");
            }
            $("#bjft .sumSingleDouble").text(num % 2 != 0 ? "单" : "双");

            var num2 = Number(nums[4]) + Number(nums[5]) + Number(nums[6]);
            var str = num2 % 4;
            if (str == 0) {
                $("#bjft .firstSeafood").text('4摊');
                $("#bjft .thirdSeafood").text('大');

            } else {
                $("#bjft .firstSeafood").text(str + '摊');
                $("#bjft .thirdSeafood").text(str > 2 ? "大" : "小");
            }
            $("#bjft .secondSeafood").text(num2 % 2 != 0 ? "单" : "双");


            var num3 = Number(nums[7]) + Number(nums[8]) + Number(nums[9]);
            var str = num3 % 4;
            if (str == 0) {
                $("#bjft .dx").text("大");
                $("#bjft .tan").text('4摊');
            } else {
                $("#bjft .dx").text(str > 2 ? "大" : "小");
                $("#bjft .tan").text(str + '摊');
            }
            $("#bjft .ds").text(num3 % 2 != 0 ? "单" : "双");



            var cpNumber = data.current.periodNumber;
            $("#pk10_hot .drawCount").html(cpNumber);
            $("#pk10_hot .sdrawCountnext").html(data.current.surplus_num);
            $("#pk10_hot .preDrawIssue").html(data.current.periodNumber1);
            $("#pk10 .drawCount").html(cpNumber);
            $("#pk10 .sdrawCountnext").html(data.current.surplus_num);
            $("#pk10 .preDrawIssue").html(data.current.periodNumber1);
            $("#bjft .preDrawIssue").html(data.current.periodNumber1);
            $("#bjft .drawCount").html(cpNumber);
            $("#bjft .sdrawCountnext").html(179 - cpNumber);
        });
}

// function bjft() {
//     $.getJSON("/pk10/getPk10AwardTimes.do", {t: Math.random()},
//
//         function (data) {
//
//             if(bjft_itvId){clearInterval(bjft_itvId)}
//             var time = parseInt(data.next.awardTimeInterval) / 1000;
//             bjft_itvId = countDown(time,'bjft');
//             if(data.current.awardNumbers == '' || data.current.awardNumbers == null){
//                 setTimeout(bjft(),3000);
//                 return;
//             }
//
//             var nums = data.current.awardNumbers.split(',');
//             for (var i = 0; i < nums.length; i++) {
//                 $("#bjft .kajianhao li:eq(" + i + ")").removeClass();
//                 $("#bjft .kajianhao li:eq(" + i + ")").addClass("nub" + nums[i]);
//
//             }
//             var num = Number(nums[0]) + Number(nums[1]) + Number(nums[2]);
//             var str = num % 4;
//             if (str == 0) {
//                 $("#bjft .sumBigSmall").text("大");
//                 $("#bjft .sumNum").text('4摊');
//             } else {
//                 $("#bjft .sumNum").text(str + '摊');
//                 $("#bjft .sumBigSmall").text(str > 2 ? "大" : "小");
//             }
//
//             $("#bjft .sumSingleDouble").text(num % 2 != 0 ? "单" : "双");
//
//
//
//             var num2 = Number(nums[4]) + Number(nums[5]) + Number(nums[6]);
//             var str = num2 % 4;
//             if (str == 0) {
//                 $("#bjft .firstSeafood").text('4摊');
//                 $("#bjft .thirdSeafood").text('大');
//
//             } else {
//                 $("#bjft .firstSeafood").text(str + '摊');
//                 $("#bjft .thirdSeafood").text(str > 2 ? "大" : "小");
//             }
//             $("#bjft .secondSeafood").text(num2 % 2 != 0 ? "单" : "双");
//
//
//             var num3 = Number(nums[7]) + Number(nums[8]) + Number(nums[9]);
//             var str = num3 % 4;
//             if (str == 0) {
//                 $("#bjft .dx").text("大");
//                 $("#bjft .tan").text('4摊');
//             } else {
//                 $("#bjft .dx").text(str > 2 ? "大" : "小");
//                 $("#bjft .tan").text(str + '摊');
//             }
//             $("#bjft .ds").text(num3 % 2 != 0 ? "单" : "双");
//
//             var cpNumber = data.current.periodNumber;
//             $("#bjft .preDrawIssue").html(data.current.periodNumber1);
//             $("#bjft .drawCount").html(cpNumber);
//             $("#bjft .sdrawCountnext").html(179 - cpNumber);
//
//         });
// }

function cqssc() {

    $.getJSON("/cqssc/getCqsscAwardTimes.do", {t: Math.random()},
        function (data) {
            clearInterval(cqssc_itvId);
            clearInterval(cqssc_hot_itvId);
            clearInterval(cqft_itvId);
            var time = parseInt(data.next.awardTimeInterval) / 1000;
            cqssc_hot_itvId = countDown(time,'cqSsc_hot');
            cqssc_itvId = countDown(time,'cqSsc');
            cqft_itvId = countDown(time,'cqft');
            if(data.current.awardNumbers == '' || data.current.awardNumbers == null){
                setTimeout(function () {
                    cqssc()
                },3000);
                return
            }
            //开奖号码
            var nums = data.current.awardNumbers.split(',');
            for (var i = 0; i < nums.length; i++) {
                $("#cqSsc_hot .kajianhao li:eq(" + i + ")").text(nums[i]);
                $("#cqSsc .kajianhao li:eq(" + i + ")").text(nums[i]);
                $("#cqft .kajianhao li:eq(" + i + ")").text(nums[i]);
            }
            //龙虎
            sscLh(nums[0],nums[4],'cqSsc_hot');
            sscLh(nums[0],nums[4],'cqSsc');
            //前中后三
            sscqzhs(nums[0],nums[1],nums[2],'cqSsc_hot','behindThree');
            sscqzhs(nums[0],nums[1],nums[2],'cqSsc','behindThree');
            sscqzhs(nums[1],nums[2],nums[3],'cqSsc_hot','betweenThree');
            sscqzhs(nums[1],nums[2],nums[3],'cqSsc','betweenThree');
            sscqzhs(nums[2],nums[3],nums[4],'cqSsc_hot','lastThree');
            sscqzhs(nums[2],nums[3],nums[4],'cqSsc','lastThree');
            //斗牛 梭哈 总和
            var str = Number(nums[0]) + Number(nums[1]) + Number(Number(nums[2])) + Number(nums[3]) + Number(nums[4]);
            var niu = douniu(data.current.awardNumbers.split(','));
            var suo = suoha(data.current.awardNumbers.split(','));
            $("#cqSsc_hot").find(".sumNum").text(str);
            $("#cqSsc").find(".sumNum").text(str);
            $("#cqSsc_hot").find(".sumSingleDouble").text(sscZh(str,'oddEven'));
            $("#cqSsc").find(".sumSingleDouble").text(sscZh(str,'oddEven'));
            $("#cqSsc_hot").find(".sumBigSmall").text(sscZh(str,'size'));
            $("#cqSsc").find(".sumBigSmall").text(sscZh(str,'size'));
            $("#cqSsc_hot").find(".douniu").text(niu);
            $("#cqSsc").find(".douniu").text(niu);
            $("#cqSsc").find(".suoha").text(suo);
            $("#cqSsc_hot").find(".suoha").text(suo);

            var tan = str % 4;
            if (tan == 0) {
                $("#cqft").find(".sumNum").text('4摊');
                $("#cqft").find(".sumBigSmall").text("大");
            } else {
                $("#cqft").find(".sumNum").text(tan + '摊');
                $("#cqft").find(".sumBigSmall").text(tan > 2 ? "大" : "小");
            }
            $("#cqft").find(".sumSingleDouble").text(tan % 2 == 0 ? "双" : "单");


            //期号
            var cpNumber = data.current.periodNumber;
            $("#cqSsc .drawCount").html(cpNumber);
            $("#cqSsc .sdrawCountnext").html(data.current.surplus_num);
            $("#cqSsc .preDrawIssue").html(data.current.periodNumber1.toString().substr(4));
            $("#cqSsc_hot .drawCount").html(cpNumber);
            $("#cqSsc_hot .sdrawCountnext").html(data.current.surplus_num);
            $("#cqSsc_hot .preDrawIssue").html(data.current.periodNumber1.toString().substr(4));

            $("#cqft .drawCount").html(cpNumber);
            $("#cqft .sdrawCountnext").html(data.current.surplus_num);
            $("#cqft .preDrawIssue").html(data.current.periodNumber1.toString().substr(4));
        });
}

function gd11x5() {
    $.getJSON("/gd11x5/getPk10AwardTimes.do", {t: Math.random()},
        function (data) {
            if(gd11x5_itvId){clearInterval(gd11x5_itvId)}
            var time = parseInt(data.next.awardTimeInterval) / 1000;
            gd11x5_itvId = countDown(time,'gd11x5');
            if(data.current.awardNumbers == '' || data.current.awardNumbers == null){
                setTimeout(function () {
                    gd11x5()
                },3000);
                return
            }
            //开奖号码
            var nums = data.current.awardNumbers.split(',');
            for (var i = 0; i < nums.length; i++) {
                $("#gd11x5 .kajianhao li:eq(" + i + ")").text(nums[i]);
            }

            //前中后三
            sscqzhs(nums[0],nums[1],nums[2],'gd11x5','behindThree');
            sscqzhs(nums[1],nums[2],nums[3],'gd11x5','betweenThree');
            sscqzhs(nums[2],nums[3],nums[4],'gd11x5','lastThree');
            //斗牛 梭哈 总和
            var str = Number(nums[0]) + Number(nums[1]) + Number(Number(nums[2])) + Number(nums[3]) + Number(nums[4]);



            $("#gd11x5").find(".sumNum").text(str);
            $("#gd11x5").find(".sumSingleDouble").text(sscZh(str,'oddEven'));
            $("#gd11x5").find(".sumBigSmall").text(sscZh(str,'size'));
            //期号
            var cpNumber = data.current.periodNumber;
            $("#gd11x5 .drawCount").html(cpNumber);
            $("#gd11x5 .sdrawCountnext").html(data.current.surplus_num);
            $("#gd11x5 .preDrawIssue").html(data.current.periodNumber1.toString().substr(4));
        });
}

function txffc() {
    $.getJSON("/txffc/getCqsscAwardTimes.do", {t: Math.random()},
        function (data) {
            if(txffc_itvId){clearInterval(txffc_itvId)}
            var time = parseInt(data.next.awardTimeInterval) / 1000;
            txffc_itvId = countDown(time,'txffc');
            if(data.current.awardNumbers == '' || data.current.awardNumbers == null){
                setTimeout(function () {
                    txffc()
                },3000);
                return
            }
            //开奖号码
            var nums = data.current.awardNumbers.split(',');
            for (var i = 0; i < nums.length; i++) {
                $("#txffc .kajianhao li:eq(" + i + ")").text(nums[i]);
            }
            //龙虎
            sscLh(nums[0],nums[4],'txffc');
            //前中后三
            sscqzhs(nums[0],nums[1],nums[2],'txffc','behindThree');
            sscqzhs(nums[1],nums[2],nums[3],'txffc','betweenThree');
            sscqzhs(nums[2],nums[3],nums[4],'txffc','lastThree');
            //斗牛 梭哈 总和
            var str = Number(nums[0]) + Number(nums[1]) + Number(Number(nums[2])) + Number(nums[3]) + Number(nums[4]);
            var niu = douniu(data.current.awardNumbers.split(','));
            var suo = suoha(data.current.awardNumbers.split(','));

            $("#txffc").find(".sumNum").text(str);
            $("#txffc").find(".sumSingleDouble").text(sscZh(str,'oddEven'));
            $("#txffc").find(".sumBigSmall").text(sscZh(str,'size'));
            $("#txffc").find(".douniu").text(niu);
            $("#txffc").find(".suoha").text(suo);;
            //期号
            var cpNumber = data.current.periodNumber;
            $("#txffc .drawCount").html(cpNumber);
            $("#txffc .sdrawCountnext").html(data.current.surplus_num);
            $("#txffc .preDrawIssue").html(data.current.periodNumber1.toString().substr(4));
        });
}

function xyft() {
    $.getJSON("/xyft/getPk10AwardTimes.do", {t: Math.random()},
        function (data) {
            if(xyft_itvId){clearInterval(xyft_itvId)}
            var time = parseInt(data.next.awardTimeInterval) / 1000;
            xyft_itvId = countDown(time,'xyft');
            if(data.current.awardNumbers == '' || data.current.awardNumbers == null){
                setTimeout(function () {
                    xyft()
                },3000);
                return
            }
            //号码
            var nums = data.current.awardNumbers.split(',');
            for (var i = 0; i < nums.length; i++) {
                $("#xyft .numberbox li:eq(" + i + ")").removeClass();
                $("#xyft .numberbox li:eq(" + i + ")").addClass("nub" + nums[i]);
            }
            //龙虎
            $("#xyft .longhu td:eq(0)").text(pk10Lh(nums[0],nums[9]));
            $("#xyft .longhu td:eq(1)").text(pk10Lh(nums[1],nums[8]));
            $("#xyft .longhu td:eq(2)").text(pk10Lh(nums[2],nums[7]));
            $("#xyft .longhu td:eq(3)").text(pk10Lh(nums[3],nums[6]));
            $("#xyft .longhu td:eq(4)").text(pk10Lh(nums[4],nums[5]));
            //冠亚和
            var num = Number(nums[0]) + Number(nums[1]);
            $("#xyft .sumFS").text(num);
            $("#xyft .sumBigSamll").text(pk10Zh(parseInt(num),'size'));
            $("#xyft .sumSingleDouble").text(pk10Zh(parseInt(num),'oddEven'));

            var cpNumber = data.current.periodNumber;
            $("#xyft .drawCount").html(cpNumber);
            $("#xyft .sdrawCountnext").html(data.current.surplus_num);
            $("#xyft .preDrawIssue").html(data.current.periodNumber1);
        });
}

function jsk3() {
    $.getJSON("/jsk3/getPk10AwardTimes.do", {t: Math.random()},
        function (data) {
            if(jsk3_itvId){clearInterval(jsk3_itvId)}

            var time = parseInt(data.next.awardTimeInterval) / 1000
            jsk3_itvId =countDown(time,'jsk3')
            if(data.current.awardNumbers == '' || data.current.awardNumbers == null){
                setTimeout(function () {
                    jsk3()
                },3000);
                return
            }
            var nums = data.current.awardNumbers.split(',');
            var str = Number(nums[0]) + Number(nums[1]) + Number(nums[2]);

            for (var i = 0; i < nums.length; i++) {
                $("#jsk3 .kajianhao li:eq(" + i + ")").removeClass();
                $("#jsk3 .kajianhao li:eq(" + i + ")").text(nums[i]);
                $("#jsk3 .kajianhao li:eq(" + i + ")").addClass('num' + nums[i])
            }

            $("#jsk3 .rowbox2").find(".sumNum").text(str),
                $("#jsk3 .rowbox2").find(".sumSingleDouble").text(str % 2 == 0 ? "双" : "单"),
                $("#jsk3 .rowbox2").find(".sumBigSmall").text(str > 10 ? "大" : "小");

            var type_one = yxx(nums[0]);
            var type_two = yxx(nums[1]);
            var type_three = yxx(nums[2]);
            $("#jsk3").find(".firstSeafood").text(type_one);
            $("#jsk3").find(".secondSeafood").text(type_two);
            $("#jsk3").find(".thirdSeafood").text(type_three);

            var cpNumber = data.current.periodNumber;
            $("#jsk3 .preDrawIssue").html(data.current.periodNumber1.toString().substr(4));
            $("#jsk3 .drawCount").html(cpNumber);
            $("#jsk3 .sdrawCountnext").html(82 - cpNumber);

        });

}




