indexdata();
window.setInterval("indexdata()",30000);
function indexdata(){
$.getJSON("/pk10/getPk10AwardTimes.do",
 function(data){

     $("#pk10_hot .numberbox").html("");
     $("#pk10 .numberbox").html("");
     $("#pk10_hot .longhu").html("");
     $("#pk10 .longhu").html("");
     var nums = data.current.awardNumbers.split(',');
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
     timer(parseInt((data.next.awardTimeInterval)/1000),"pk10_hot .nextkai_time");
     timer(parseInt((data.next.awardTimeInterval)/1000),"pk10 .nextkai_time");
     timers(parseInt((data.next.awardTimeInterval)/1000),".pk10 .cuttime");
     cpNumber = data.current.periodNumber;
     var _time = data.current.awardTime.substring(11, 16);
     //  $(".num_ul .preDrawIssue").html(data.current.periodNumber);
     $("#pk10_hot .drawCount").html(cpNumber);
     $("#pk10 .drawCount").html(cpNumber);
     $("#pk10_hot .sdrawCountnext").html(Number(data.firstPeriod )+ 179-cpNumber);
     $("#pk10 .sdrawCountnext").html(Number(data.firstPeriod) + 179-cpNumber);
 });
 $.getJSON("/xyft/getPk10AwardTimes.do",
 function(data){

     timer(parseInt((data.next.awardTimeInterval)/1000),"xyft .nextkai_time");
     timers(parseInt((data.next.awardTimeInterval)/1000),".xyft_1 .cuttime");
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
     //      var number = data.current.fullPeriodNumber.substring(data.current.fullPeriodNumber.length-3);
     $("#xyft .drawCount").html(cpNumber);
     $("#xyft .sdrawCountnext").html(180-cpNumber);

 });
 $.getJSON("/cqssc/getCqsscAwardTimes.do",
 function(data){
     timer(parseInt((data.next.awardTimeInterval)/1000),"cqSsc_hot .nextkai_time");
     timer(parseInt((data.next.awardTimeInterval)/1000),"cqSsc .nextkai_time");
     timers(parseInt((data.next.awardTimeInterval)/1000),".cqssc .cuttime");
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
     $("#cqSsc .num_ul .drawCount").html(cpNumber);
     $("#cqSsc_hot .num_ul .drawCount").html(cpNumber);
     $("#cqSsc .num_ul .sdrawCountnext").html(120-cpNumber);
     $("#cqSsc_hot .num_ul .sdrawCountnext").html(120-cpNumber);

 
 });
 $.getJSON("/gdkl10/getGdkl10AwardTimes.do",
 function(data){

     timer(parseInt((data.next.awardTimeInterval)/1000),"gdkl10 .nextkai_time");
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
 $.getJSON("/jssc/getPk10AwardTimes.do",
 function(data){
     timer(parseInt((data.next.awardTimeInterval)/1000),"jisusc .nextkai_time");
     timers(parseInt((data.next.awardTimeInterval)/1000),".jssc .cuttime");
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
     if(num % 2 ==0)
     {
         $("#jisusc .longhu").append("<td class='sumSingleDouble'>双</td>");
     }else {
         $("#jisusc .longhu").append("<td class='sumSingleDouble'>单</td>");
     }

     cpNumber = data.current.periodNumber;
     var _time = data.current.awardTime.substring(11, 16);
     //  $(".num_ul .preDrawIssue").html(data.current.periodNumber);
     $("#jisusc .drawCount").html(cpNumber);
     $("#jisusc .sdrawCountnext").html(Number(data.firstPeriod )+ 179-cpNumber);
 });
 $.getJSON("/jsssc/getCqsscAwardTimes.do",
 function(data){
     timer(parseInt((data.next.awardTimeInterval)/1000),"jsssc .nextkai_time");
     timers(parseInt((data.next.awardTimeInterval)/1000),".jsssc_1 .cuttime");
     $("#jsssc #kajianhao3").html("");
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
     var number = data.current.fullPeriodNumber.substring(data.current.fullPeriodNumber.length-3);
     $("#jsssc .drawCount").html(number);
     $("#jsssc .sdrawCountnext").html(120-number);
 });
 $.getJSON("/tjssc/getCqsscAwardTimes.do",
 function(data){
     timer(parseInt((data.next.awardTimeInterval)/1000),"tjssc .nextkai_time");
     timers(parseInt((data.next.awardTimeInterval)/1000),".tjssc_1 .cuttime");
     $("#tjssc .kajianhao").html("");
     var nums = data.current.awardNumbers.split(',');
     var str = Number(nums[0])+Number(nums[1])+Number(Number(nums[2]))+Number(nums[3])+Number(nums[4]);
     //  cpNumber = data.current.periodNumber;

     $("#tjssc").find(".sumNum").text(str),
         $("#tjssc").find(".sumSingleDouble").text(str%2 == 0 ? "单" : "双"),
         $("#tjssc").find(".sumBigSmall").text(str > 23 ? "大" : "小");
     for (var i = 0; i < nums.length; i++) {
         // str += ;
         if(nums[i] == 10){
             $("#tjssc .kajianhao").append("<li class='numblueHead'>"+nums[i]+"</li>");
         }else {
             $("#tjssc .kajianhao").append("<li class='numblueHead'>"+nums[i]+"</li>");
         }
     }
     if(Number(nums[0]) < Number(nums[4])){
         $("#tjssc").find(".dragonTiger").text("虎");
     }else if( Number(nums[0]) > Number(nums[4])){
         $("#tjssc").find(".dragonTiger").text("龙");
     }else {
         $("#tjssc").find(".dragonTiger").text("和");
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
     $("#tjssc .longhu2").find(".behindThree").text(type);
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
     $("#tjssc .longhu2").find(".betweenThree").text(type1);
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
     $("#tjssc .longhu2").find(".lastThree").text(type2);
     cpNumber = data.current.periodNumber;
     var _time = data.current.awardTime.substring(11, 16);
     $("#tjssc .preDrawIssue").html(120);
     $("#tjssc .drawCount").html(cpNumber);
     $("#tjssc .sdrawCountnext").html(120-cpNumber);

 });
 $.getJSON("/gd11x5/getPk10AwardTimes.do",
 function(data){
     timer(parseInt((data.next.awardTimeInterval)/1000),"gd11x5 .nextkai_time");
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
     var type='';
     if ((Number(nums[0]) == Number(nums[1])) && (Number(nums[0]) == Number(nums[2]))) {
         type = '豹子';
     } else if (((Number(nums[1]) - Number(nums[0])) == (Number(nums[2]) - Number(nums[1]))) && ((Number(nums[1]) - Number(nums[0])) == 1) || (nums[0]+nums[1]+nums[2] == '0,8,9' || nums[0]+nums[1]+nums[2] == '0,1,9')) {
         type = '顺子';
     } else if (Number(nums[0]) == Number(nums[1]) || Number(nums[1]) == Number(nums[2])) {
         type = '对子';
     } else if ((Number(nums[1]) - Number(nums[0])) == 1 || (Number(nums[2]) - Number(nums[1])) == 1 || (Number(nums[1]) - Number(nums[2])) == 1) {
         type = '半顺';
     } else {
         type = '杂六';
     }
     $("#gd11x5").find(".behindThree").text(type);
     var type1 = '';
     if ((Number(nums[1]) == Number(nums[2])) && (Number(nums[1]) == Number(nums[3]))) {
         type1 = '豹子';
     } else if (((Number(nums[2]) - Number(nums[1])) == (Number(nums[3]) - Number(nums[2]))) && ((Number(nums[2]) - Number(nums[1])) == 1) || (nums[0]+nums[1]+nums[2] == '0,8,9' || nums[0]+nums[1]+nums[2] == '0,1,9')) {
         type1 = '顺子';
     } else if (Number(nums[1]) == Number(nums[2]) || Number(nums[2]) == Number(nums[3])) {
         type1 = '对子';
     } else if ((Number(nums[2]) - Number(nums[1])) == 1 || (Number(nums[3]) - Number(nums[2])) == 1 || (Number(nums[2]) - Number(nums[3])) == 1) {
         type1= '半顺';
     } else {
         type1 = '杂六';
     }
     $("#gd11x5").find(".betweenThree").text(type1);
     var type2 = '';
     if ((Number(nums[2]) == Number(nums[3])) && (Number(nums[2]) == Number(nums[4]))) {
         type2 = '豹子';
     } else if (((Number(nums[3]) - Number(nums[2])) == (Number(nums[4]) - Number(nums[3]))) && ((Number(nums[3]) - Number(nums[2])) == 1) || (nums == Array(0, 8, 9) || nums == Array(0, 1, 9))) {
         type2 = '顺子';
     } else if (Number(nums[2]) == Number(nums[3]) || Number(nums[3]) == Number(nums[4])) {
         type2 = '对子';
     } else if ((Number(nums[3]) - Number(nums[2])) == 1 || (Number(nums[4]) - Number(nums[3])) == 1 || (Number(nums[3]) - Number(nums[4])) == 1 || (Number(nums[2]) - Number(nums[3])) == 1) {
         type2= '半顺';
     } else {
         type2 = '杂六';
     }
     $("#gd11x5").find(".lastThree").text(type2);


     var cpNumber = data.current.periodNumber;
     var number = data.current.fullPeriodNumber.substring(data.current.fullPeriodNumber.length-3);
     //  $(".num_ul .preDrawIssue").html(data.current.periodNumber);
     $("#gd11x5 .drawCount").html(number);
     $("#gd11x5 .sdrawCountnext").html(85-number);

 });
  $.getJSON("/jsk3/getPk10AwardTimes.do",
 function(data){
     timer(parseInt((data.next.awardTimeInterval)/1000),"kuai3 .nextkai_time");
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
    // var number = data.current.fullPeriodNumber.substring(data.current.fullPeriodNumber.length-2);

     //  $("#kuai3 .preDrawIssue").html(cpNumber);
     $("#kuai3 .drawCount").html(cpNumber);
     $("#kuai3 .sdrawCountnext").html(82 - cpNumber);

 });
}
 
 function timer(intDiff,div){
	window.setInterval(function(){
	var day=0,
		hour=0,
		minute=0,
		second=0;//时间默认值		
	if(intDiff > 0){
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

	intDiff--;
    if(intDiff==0) location.reload();
	}, 1000);
}
function timers(intDiff,div){
    window.setInterval(function(){
        var day=0,
            hour=0,
            minute=0,
            second=0;//时间默认值
        if(intDiff > 0){
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
        $(div+" .minute").text(minute);
        $(div+" .second").text(second);
        intDiff--;
        if(intDiff==0) location.reload();
    }, 1000);
}