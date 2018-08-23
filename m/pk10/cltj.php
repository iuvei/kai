<?php 
include("../conn.php");
?>
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
	<meta name="viewport" content="initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0"/>
    
    <meta name="HandheldFriendly" content="true" />
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">

    
<meta name="format-detection"content="telephone=no"/>
<title><?=$web_type?>长龙统计_<?=$webtitle?>手机版</title>
<script src="../style/js/jquery.js"></script>
<script src="../style/js/layer.js"></script>
<script src="../style/js/lotcommon.js" type="text/javascript"></script>
<script src="../style/js/warntime.js" type="text/javascript"></script>
<link type="text/css" href="../style/css/style.css" rel="stylesheet">


<style>
    table{
        border-collapse: collapse;
        width: 96%;
        text-align: center;
        margin: 7px;
        color: #535353;
    }
</style>


</head>
<body>



<?php include("../public/header.php"); ?>


   
<script src="award.js" type="text/javascript"></script>
<link type="text/css" href="../style/css/pk10.css" rel="stylesheet">
<div class="daojishi">
 <div class="fl"><?=$web_type?></div>
 <div class="fr"><em id="period"></em>期开奖剩余：<span id="time"></span></div>
</div>
<div class="h100">

</div>
 
<div class="gametool">

     <ul class="fl">
    <li><a href="./">首页</a></li>
       <li><a href="smtj.php">双面</a></li>
       <li><a href="cltj.php" class="cur">长龙</a></li>
       <li><a href="hmzs.php">走势</a></li>
       <li><a href="lrtj.php">冷热</a></li>
       <li><a href="jiqiao.php">技巧</a></li>
       
     </ul>


</div>
<div style="height:40px;"></div>
<div class="balllist">
    <ul class="ball">
        <li><a href="javascript:void(0);" class='cur' ball="1" id="num_1">冠军</a></li>
        <li><a class="no" href="javascript:void(0);" ball="2" id="num_2">亚军</a></li>
        <li><a class="no" href="javascript:void(0);" ball="3" id="num_3">第3名</a></li>
        <li><a class="no" href="javascript:void(0);" ball="4" id="num_4">第4名</a></li>
        <li><a class="no" href="javascript:void(0);" ball="5" id="num_5">第5名</a></li>
        <li><a class="no" href="javascript:void(0);" ball="6" id="num_6">第6名</a></li>
        <li><a class="no" href="javascript:void(0);" ball="7" id="num_7">第7名</a></li>
        <li><a class="no" href="javascript:void(0);" ball="8" id="num_8">第8名</a></li>
        <li><a class="no" href="javascript:void(0);" ball="9" id="num_9">第9名</a></li>
        <li><a class="no" href="javascript:void(0);" ball="10" id="num_10">第10名</a></li>

    </ul>
</div>
<table class="lot-table">
			<thead>
					<tr class="head">
					
				  <td>长龙连开统计</td>
				  </tr>
				  </thead>

    <table border="1">
    <tr>
        <th></th>
        <th>2期</th>
        <th>3期</th>
        <th>4期</th>
        <th>5期</th>
        <th>6期</th>
        <th>7期</th>
        <th>8期</th>
        <th>9期</th>
        <th>10期</th>
        <th>11期</th>
        <th>12期</th>
        <th>13期</th>
        <th>14期</th>
    </tr>
    <tr class="n1">
    </tr>
    <tr class="n2">

    </tr>
    <tr class="n3">

    </tr>
    <tr class="n4">

    </tr>
    <tr class="n5">

    </tr>
    <tr class="n6">

    </tr>
    <tr class="n7">

    </tr>
    <tr class="n8">

    </tr>
    <tr class="n9">

    </tr>
    <tr class="n10">

    </tr>
    <tr class="long">

    </tr>
    <tr class="hu">

    </tr>
    <tr class="he">

    </tr>
    </table>

    <table border="1">
        <tr>
            <th style="color: red">冠亚和 </th>
            <th>2期</th>
            <th>3期</th>
            <th>4期</th>
            <th>5期</th>
            <th>6期</th>
            <th>7期</th>
            <th>8期</th>
            <th>9期</th>
            <th>10期</th>
            <th>11期</th>
            <th>12期</th>
            <th>13期</th>
            <th>14期</th>
        </tr>
        <tr class="dx">

        </tr>
        <tr class="x">
        </tr>
        <tr class="d">

        </tr>
        <tr class="s">

        </tr>
    </table>
    <tbody>

    </tbody>
</table>


   
<?php include("../public/footer.php"); ?>

 <script type="text/javascript">
 $(function () {
	 changLong();
 });
 var n = 0;
 $("#num_1").click(function () {
     n = 0;
     ll();
 });
 $("#num_2").click(function () {
     ll();
     n = 1;
 });
 $("#num_3").click(function () {
     n = 2;
     ll();
 });
 $("#num_4").click(function () {
     n = 3;
     ll();
 });
 $("#num_5").click(function () {
     n = 4;
     ll();
 });
 $("#num_6").click(function () {
     n = 5;
     ll();
 });
 $("#num_7").click(function () {
     n = 6;
     ll();
 });
 $("#num_8").click(function () {
     n = 7;
     ll();
 });
 $("#num_9").click(function () {
     n = 8;
     ll();
 });
 $("#num_10").click(function () {
     n = 9;
     ll();
 });

 function changLong() {
     var id = "<?= $name?>";
	 layer.open({type: 2,time: 1});
     $.get("/Fuzhi/Api/changlong", {id:id}, function (result) {
         var data = eval(result);
     	if(data) {
            console.log(data['dx'][0].length);
            var dx = data['dx'][0];
            var ds = data['ds'][0];
            cl(n,data['num'][n]);
            lh(data['lh'][n]);
            dx_guanya(dx);
            ds_guanya(ds);
        }
     	
     },"json");
 }
 function ll() {
     var id = "<?= $name?>";
     layer.open({type: 2,time: 1});
     $.get("/Fuzhi/Api/changlong", {id:id}, function (result) {
         var data = eval(result);
         if(data) {
             info= data;
             console.log(data['dx'][0].length);
             $(".n1").html("");
             $(".n2").html("");
             $(".n3").html("");
             $(".n4").html("");
             $(".n5").html("");
             $(".n6").html("");
             $(".n7").html("");
             $(".n8").html("");
             $(".n9").html("");
             $(".n10").html("");
             $(".long").html("");
             $(".hu").html("");
             $(".he").html("");
             cl(n,data['num'][n]);
             if(n < 5 ){
                 lh(data['lh'][n]);
             }

         }

     },"json");
 }

 //1-5名龙虎
 function lh(dx) {
     var num = 0;
     var num2 = 0;
     var num3= 0;
     var num4 = 0;
     var num5 = 0;
     var num6 = 0;
     var num7 = 0;
     var num8 = 0;
     var num9 = 0;
     var num10 = 0;
     var num11 = 0;
     var num12 = 0;
     var num13 = 0;

     var xnum = 0;
     var xnum2 = 0;
     var xnum3= 0;
     var xnum4 = 0;
     var xnum5 = 0;
     var xnum6 = 0;
     var xnum7 = 0;
     var xnum8 = 0;
     var xnum9 = 0;
     var xnum10 = 0;
     var xnum11 = 0;
     var xnum12 = 0;
     var xnum13 = 0;

     var hnum = 0;
     var hnum2 = 0;
     var hnum3= 0;
     var hnum4 = 0;
     var hnum5 = 0;
     var hnum6 = 0;
     var hnum7 = 0;
     var hnum8 = 0;
     var hnum9 = 0;
     var hnum10 = 0;
     var hnum11 = 0;
     var hnum12 = 0;
     var hnum13 = 0;

     for(var o=0; o<dx.length;o++) {
         if (dx[o]['name'] == '龙') {
             if (dx[o]['num'] == 2) {
                 num++;
             }
             if (dx[o]['num'] == 3) {
                 num2++;
             }
             if (dx[o]['num'] == 4) {
                 num3++;
             }
             if (dx[o]['num'] == 5) {
                 num4++;
             }
             if (dx[o]['num'] == 6) {
                 num5++;
             }
             if (dx[o]['num'] == 7) {
                 num6++;
             }
             if (dx[o]['num'] == 8) {
                 num7++;
             }
             if (dx[o]['num'] == 9) {
                 num8++;
             }
             if (dx[o]['num'] == 10) {
                 num9++;
             }
             if (dx[o]['num'] == 11) {
                 num10++;
             }
             if (dx[o]['num'] == 12) {
                 num11++;
             }
             if (dx[o]['num'] == 13) {
                 num12++;
             }
             if (dx[o]['num'] == 14) {
                 num13++;
             }
         }
         if (dx[o]['name'] == '虎') {
             if (dx[o]['num'] == 2) {
                 xnum++;
             }
             if (dx[o]['num'] == 3) {
                 xnum2++;
             }
             if (dx[o]['num'] == 4) {
                 xnum3++;
             }
             if (dx[o]['num'] == 5) {
                 xnum4++;
             }
             if (dx[o]['num'] == 6) {
                 xnum5++;
             }
             if (dx[o]['num'] == 7) {
                 xnum6++;
             }
             if (dx[o]['num'] == 8) {
                 xnum7++;
             }
             if (dx[o]['num'] == 9) {
                 xnum8++;
             }
             if (dx[o]['num'] == 10) {
                 xnum9++;
             }
             if (dx[o]['num'] == 11) {
                 xnum10++;
             }
             if (dx[o]['num'] == 12) {
                 xnum11++;
             }
             if (dx[o]['num'] == 13) {
                 xnum12++;
             }
             if (dx[o]['num'] == 14) {
                 xnum13++;
             }
         }

         if (dx[o]['name'] == '和') {
             if (dx[o]['num'] == 2) {
                 hnum++;
             }
             if (dx[o]['num'] == 3) {
                 hnum2++;
             }
             if (dx[o]['num'] == 4) {
                 hnum3++;
             }
             if (dx[o]['num'] == 5) {
                 hnum4++;
             }
             if (dx[o]['num'] == 6) {
                 hnum5++;
             }
             if (dx[o]['num'] == 7) {
                 hnum6++;
             }
             if (dx[o]['num'] == 8) {
                 hnum7++;
             }
             if (dx[o]['num'] == 9) {
                 hnum8++;
             }
             if (dx[o]['num'] == 10) {
                 hnum9++;
             }
             if (dx[o]['num'] == 11) {
                 hnum10++;
             }
             if (dx[o]['num'] == 12) {
                 hnum11++;
             }
             if (dx[o]['num'] == 13) {
                 hnum12++;
             }
             if (dx[o]['num'] == 14) {
                 hnum13++;
             }
         }
     }
     $(".long").append("<td>龙</td>");
     $(".long").append("<td>"+num+"</td>");
     $(".long").append("<td>"+num2+"</td>");
     $(".long").append("<td>"+num3+"</td>");
     $(".long").append("<td>"+num4+"</td>");
     $(".long").append("<td>"+num5+"</td>");
     $(".long").append("<td>"+num6+"</td>");
     $(".long").append("<td>"+num7+"</td>");
     $(".long").append("<td>"+num8+"</td>");
     $(".long").append("<td>"+num9+"</td>");
     $(".long").append("<td>"+num10+"</td>");
     $(".long").append("<td>"+num11+"</td>");
     $(".long").append("<td>"+num12+"</td>");
     $(".long").append("<td>"+num13+"</td>");

     $(".hu").append("<td>虎</td>");
     $(".hu").append("<td>"+xnum+"</td>");
     $(".hu").append("<td>"+xnum2+"</td>");
     $(".hu").append("<td>"+xnum3+"</td>");
     $(".hu").append("<td>"+xnum4+"</td>");
     $(".hu").append("<td>"+xnum5+"</td>");
     $(".hu").append("<td>"+xnum6+"</td>");
     $(".hu").append("<td>"+xnum7+"</td>");
     $(".hu").append("<td>"+xnum8+"</td>");
     $(".hu").append("<td>"+xnum9+"</td>");
     $(".hu").append("<td>"+xnum10+"</td>");
     $(".hu").append("<td>"+xnum11+"</td>");
     $(".hu").append("<td>"+xnum12+"</td>");
     $(".hu").append("<td>"+xnum13+"</td>");

     $(".he").append("<td>和</td>");
     $(".he").append("<td>"+hnum+"</td>");
     $(".he").append("<td>"+hnum2+"</td>");
     $(".he").append("<td>"+hnum3+"</td>");
     $(".he").append("<td>"+hnum4+"</td>");
     $(".he").append("<td>"+hnum5+"</td>");
     $(".he").append("<td>"+hnum6+"</td>");
     $(".he").append("<td>"+hnum7+"</td>");
     $(".he").append("<td>"+hnum8+"</td>");
     $(".he").append("<td>"+hnum9+"</td>");
     $(".he").append("<td>"+hnum10+"</td>");
     $(".he").append("<td>"+hnum11+"</td>");
     $(".he").append("<td>"+hnum12+"</td>");
     $(".he").append("<td>"+hnum13+"</td>");

 }

 //1-10名出现的1-10数字长龙
 function cl(n,dx) {
     var num = 0;
     var num2 = 0;
     var num3 = 0;
     var num4 = 0;
     var num5 = 0;
     var num6 = 0;
     var num7 = 0;
     var num8 = 0;
     var num9 = 0;
     var num10 = 0;
     var num11 = 0;
     var num12 = 0;
     var num13 = 0;

     var num_2 = 0;
     var num2_2 = 0;
     var num3_2 = 0;
     var num4_2 = 0;
     var num5_2 = 0;
     var num6_2 = 0;
     var num7_2 = 0;
     var num8_2 = 0;
     var num9_2 = 0;
     var num10_2 = 0;
     var num11_2 = 0;
     var num12_2 = 0;
     var num13_2 = 0;

     var num_3 = 0;
     var num2_3 = 0;
     var num3_3 = 0;
     var num4_3 = 0;
     var num5_3 = 0;
     var num6_3 = 0;
     var num7_3 = 0;
     var num8_3 = 0;
     var num9_3= 0;
     var num10_3 = 0;
     var num11_3 = 0;
     var num12_3 = 0;
     var num13_3 = 0;

     var num_4 = 0;
     var num2_4 = 0;
     var num3_4 = 0;
     var num4_4 = 0;
     var num5_4 = 0;
     var num6_4 = 0;
     var num7_4 = 0;
     var num8_4 = 0;
     var num9_4 = 0;
     var num10_4 = 0;
     var num11_4 = 0;
     var num12_4 = 0;
     var num13_4 = 0;

     var num_5 = 0;
     var num2_5 = 0;
     var num3_5 = 0;
     var num4_5 = 0;
     var num5_5 = 0;
     var num6_5 = 0;
     var num7_5 = 0;
     var num8_5 = 0;
     var num9_5 = 0;
     var num10_5 = 0;
     var num11_5 = 0;
     var num12_5 = 0;
     var num13_5 = 0;

     var num_6 = 0;
     var num2_6 = 0;
     var num3_6 = 0;
     var num4_6 = 0;
     var num5_6 = 0;
     var num6_6 = 0;
     var num7_6 = 0;
     var num8_6 = 0;
     var num9_6 = 0;
     var num10_6 = 0;
     var num11_6 = 0;
     var num12_6 = 0;
     var num13_6 = 0;

     var num_7= 0;
     var num2_7 = 0;
     var num3_7 = 0;
     var num4_7 = 0;
     var num5_7 = 0;
     var num6_7 = 0;
     var num7_7 = 0;
     var num8_7 = 0;
     var num9_7 = 0;
     var num10_7 = 0;
     var num11_7 = 0;
     var num12_7 = 0;
     var num13_7 = 0;

     var num_8 = 0;
     var num2_8 = 0;
     var num3_8 = 0;
     var num4_8 = 0;
     var num5_8 = 0;
     var num6_8 = 0;
     var num7_8 = 0;
     var num8_8 = 0;
     var num9_8 = 0;
     var num10_8 = 0;
     var num11_8 = 0;
     var num12_8 = 0;
     var num13_8 = 0;

     var num_9 = 0;
     var num2_9 = 0;
     var num3_9 = 0;
     var num4_9 = 0;
     var num5_9 = 0;
     var num6_9 = 0;
     var num7_9 = 0;
     var num8_9 = 0;
     var num9_9 = 0;
     var num10_9 = 0;
     var num11_9 = 0;
     var num12_9 = 0;
     var num13_9 = 0;

     var num_10 = 0;
     var num2_10 = 0;
     var num3_10 = 0;
     var num4_10 = 0;
     var num5_10 = 0;
     var num6_10 = 0;
     var num7_10 = 0;
     var num8_10 = 0;
     var num9_10 = 0;
     var num10_10 = 0;
     var num11_10 = 0;
     var num12_10 = 0;
     var num13_10 = 0;

     for (var o = 0; o < dx.length; o++) {
            if(dx[o]['name'] == 1){
                if (dx[o]['num'] == 2) {
                    num++;
                }
                if (dx[o]['num'] == 3) {
                    num2++;
                }
                if (dx[o]['num'] == 4) {
                    num3++;
                }
                if (dx[o]['num'] == 5) {
                    num4++;
                }
                if (dx[o]['num'] == 6) {
                    num5++;
                }
                if (dx[o]['num'] == 7) {
                    num6++;
                }
                if (dx[o]['num'] == 8) {
                    num7++;
                }
                if (dx[o]['num'] == 9) {
                    num8++;
                }
                if (dx[o]['num'] == 10) {
                    num9++;
                }
                if (dx[o]['num'] == 11) {
                    num10++;
                }
                if (dx[o]['num'] == 12) {
                    num11++;
                }
                if (dx[o]['num'] == 13) {
                    num12++;
                }
                if (dx[o]['num'] == 14) {
                    num13++;
                }
            }
         if(dx[o]['name'] == 2){
             if (dx[o]['num'] == 2) {
                 num_2++;
             }
             if (dx[o]['num'] == 3) {
                 num2_2++;
             }
             if (dx[o]['num'] == 4) {
                 num3_2++;
             }
             if (dx[o]['num'] == 5) {
                 num4_2++;
             }
             if (dx[o]['num'] == 6) {
                 num5_2++;
             }
             if (dx[o]['num'] == 7) {
                 num6_2++;
             }
             if (dx[o]['num'] == 8) {
                 num7_2++;
             }
             if (dx[o]['num'] == 9) {
                 num8_2++;
             }
             if (dx[o]['num'] == 10) {
                 num9_2++;
             }
             if (dx[o]['num'] == 11) {
                 num10_2++;
             }
             if (dx[o]['num'] == 12) {
                 num11_2++;
             }
             if (dx[o]['num'] == 13) {
                 num12_2++;
             }
             if (dx[o]['num'] == 14) {
                 num13_2++;
             }
         }
         if(dx[o]['name'] == 3){
             if (dx[o]['num'] == 2) {
                 num_3++;
             }
             if (dx[o]['num'] == 3) {
                 num2_3++;
             }
             if (dx[o]['num'] == 4) {
                 num3_3++;
             }
             if (dx[o]['num'] == 5) {
                 num4_3++;
             }
             if (dx[o]['num'] == 6) {
                 num5_3++;
             }
             if (dx[o]['num'] == 7) {
                 num6_3++;
             }
             if (dx[o]['num'] == 8) {
                 num7_3++;
             }
             if (dx[o]['num'] == 9) {
                 num8_3++;
             }
             if (dx[o]['num'] == 10) {
                 num9_3++;
             }
             if (dx[o]['num'] == 11) {
                 num10_3++;
             }
             if (dx[o]['num'] == 12) {
                 num11_3++;
             }
             if (dx[o]['num'] == 13) {
                 num12_3++;
             }
             if (dx[o]['num'] == 14) {
                 num13_3++;
             }
         }
         if(dx[o]['name'] == 4){
             if (dx[o]['num'] == 2) {
                 num_4++;
             }
             if (dx[o]['num'] == 3) {
                 num2_4++;
             }
             if (dx[o]['num'] == 4) {
                 num3_4++;
             }
             if (dx[o]['num'] == 5) {
                 num4_4++;
             }
             if (dx[o]['num'] == 6) {
                 num5_4++;
             }
             if (dx[o]['num'] == 7) {
                 num6_4++;
             }
             if (dx[o]['num'] == 8) {
                 num7_4++;
             }
             if (dx[o]['num'] == 9) {
                 num8_4++;
             }
             if (dx[o]['num'] == 10) {
                 num9_4++;
             }
             if (dx[o]['num'] == 11) {
                 num10_4++;
             }
             if (dx[o]['num'] == 12) {
                 num11_4++;
             }
             if (dx[o]['num'] == 13) {
                 num12_4++;
             }
             if (dx[o]['num'] == 14) {
                 num13_4++;
             }
         }
         if(dx[o]['name'] == 5){
             if (dx[o]['num'] == 2) {
                 num_5++;
             }
             if (dx[o]['num'] == 3) {
                 num2_5++;
             }
             if (dx[o]['num'] == 4) {
                 num3_5++;
             }
             if (dx[o]['num'] == 5) {
                 num4_5++;
             }
             if (dx[o]['num'] == 6) {
                 num5_5++;
             }
             if (dx[o]['num'] == 7) {
                 num6_5++;
             }
             if (dx[o]['num'] == 8) {
                 num7_5++;
             }
             if (dx[o]['num'] == 9) {
                 num8_5++;
             }
             if (dx[o]['num'] == 10) {
                 num9_5++;
             }
             if (dx[o]['num'] == 11) {
                 num10_5++;
             }
             if (dx[o]['num'] == 12) {
                 num11_5++;
             }
             if (dx[o]['num'] == 13) {
                 num12_5++;
             }
             if (dx[o]['num'] == 14) {
                 num13_5++;
             }
         }

         if(dx[o]['name'] == 6){
             if (dx[o]['num'] == 2) {
                 num_6++;
             }
             if (dx[o]['num'] == 3) {
                 num2_6++;
             }
             if (dx[o]['num'] == 4) {
                 num3_6++;
             }
             if (dx[o]['num'] == 5) {
                 num4_6++;
             }
             if (dx[o]['num'] == 6) {
                 num5_6++;
             }
             if (dx[o]['num'] == 7) {
                 num6_6++;
             }
             if (dx[o]['num'] == 8) {
                 num7_6++;
             }
             if (dx[o]['num'] == 9) {
                 num8_6++;
             }
             if (dx[o]['num'] == 10) {
                 num9_6++;
             }
             if (dx[o]['num'] == 11) {
                 num10_6++;
             }
             if (dx[o]['num'] == 12) {
                 num11_6++;
             }
             if (dx[o]['num'] == 13) {
                 num12_6++;
             }
             if (dx[o]['num'] == 14) {
                 num13_6++;
             }
         }

         if(dx[o]['name'] == 7){
             if (dx[o]['num'] == 2) {
                 num_7++;
             }
             if (dx[o]['num'] == 3) {
                 num2_7++;
             }
             if (dx[o]['num'] == 4) {
                 num3_7++;
             }
             if (dx[o]['num'] == 5) {
                 num4_7++;
             }
             if (dx[o]['num'] == 6) {
                 num5_7++;
             }
             if (dx[o]['num'] == 7) {
                 num6_7++;
             }
             if (dx[o]['num'] == 8) {
                 num7_7++;
             }
             if (dx[o]['num'] == 9) {
                 num8_7++;
             }
             if (dx[o]['num'] == 10) {
                 num9_7++;
             }
             if (dx[o]['num'] == 11) {
                 num10_7++;
             }
             if (dx[o]['num'] == 12) {
                 num11_7++;
             }
             if (dx[o]['num'] == 13) {
                 num12_7++;
             }
             if (dx[o]['num'] == 14) {
                 num13_7++;
             }
         }

         if(dx[o]['name'] == 8){
             if (dx[o]['num'] == 2) {
                 num_8++;
             }
             if (dx[o]['num'] == 3) {
                 num2_8++;
             }
             if (dx[o]['num'] == 4) {
                 num3_8++;
             }
             if (dx[o]['num'] == 5) {
                 num4_8++;
             }
             if (dx[o]['num'] == 6) {
                 num5_8++;
             }
             if (dx[o]['num'] == 7) {
                 num6_8++;
             }
             if (dx[o]['num'] == 8) {
                 num7_8++;
             }
             if (dx[o]['num'] == 9) {
                 num8_8++;
             }
             if (dx[o]['num'] == 10) {
                 num9_8++;
             }
             if (dx[o]['num'] == 11) {
                 num10_8++;
             }
             if (dx[o]['num'] == 12) {
                 num11_8++;
             }
             if (dx[o]['num'] == 13) {
                 num12_8++;
             }
             if (dx[o]['num'] == 14) {
                 num13_8++;
             }
         }

         if(dx[o]['name'] == 9){
             if (dx[o]['num'] == 2) {
                 num_9++;
             }
             if (dx[o]['num'] == 3) {
                 num2_9++;
             }
             if (dx[o]['num'] == 4) {
                 num3_9++;
             }
             if (dx[o]['num'] == 5) {
                 num4_9++;
             }
             if (dx[o]['num'] == 6) {
                 num5_9++;
             }
             if (dx[o]['num'] == 7) {
                 num6_9++;
             }
             if (dx[o]['num'] == 8) {
                 num7_9++;
             }
             if (dx[o]['num'] == 9) {
                 num8_9++;
             }
             if (dx[o]['num'] == 10) {
                 num9_9++;
             }
             if (dx[o]['num'] == 11) {
                 num10_9++;
             }
             if (dx[o]['num'] == 12) {
                 num11_9++;
             }
             if (dx[o]['num'] == 13) {
                 num12_9++;
             }
             if (dx[o]['num'] == 14) {
                 num13_9++;
             }
         }

         if(dx[o]['name'] == 10){
             if (dx[o]['num'] == 2) {
                 num_10++;
             }
             if (dx[o]['num'] == 3) {
                 num2_10++;
             }
             if (dx[o]['num'] == 4) {
                 num3_10++;
             }
             if (dx[o]['num'] == 5) {
                 num4_10++;
             }
             if (dx[o]['num'] == 6) {
                 num5_10++;
             }
             if (dx[o]['num'] == 7) {
                 num6_10++;
             }
             if (dx[o]['num'] == 8) {
                 num7_10++;
             }
             if (dx[o]['num'] == 9) {
                 num8_10++;
             }
             if (dx[o]['num'] == 10) {
                 num9_10++;
             }
             if (dx[o]['num'] == 11) {
                 num10_10++;
             }
             if (dx[o]['num'] == 12) {
                 num11_10++;
             }
             if (dx[o]['num'] == 13) {
                 num12_10++;
             }
             if (dx[o]['num'] == 14) {
                 num13_10++;
             }
         }
     }

         $(".n1").append("<td>1</td>");
     $(".n1").append("<td>" + num + "</td>");
     $(".n1").append("<td>" + num2 + "</td>");
     $(".n1").append("<td>" + num3 + "</td>");
     $(".n1").append("<td>" + num4 + "</td>");
     $(".n1").append("<td>" + num5 + "</td>");
     $(".n1").append("<td>" + num6 + "</td>");
     $(".n1").append("<td>" + num7 + "</td>");
     $(".n1").append("<td>" + num8 + "</td>");
     $(".n1").append("<td>" + num9 + "</td>");
     $(".n1").append("<td>" + num10 + "</td>");
     $(".n1").append("<td>" + num11 + "</td>");
     $(".n1").append("<td>" + num12 + "</td>");
     $(".n1").append("<td>" + num13 + "</td>");

     $(".n2").append("<td>2</td>");
     $(".n2").append("<td>" + num_2 + "</td>");
     $(".n2").append("<td>" + num2_2 + "</td>");
     $(".n2").append("<td>" + num3_2 + "</td>");
     $(".n2").append("<td>" + num4_2 + "</td>");
     $(".n2").append("<td>" + num5_2 + "</td>");
     $(".n2").append("<td>" + num6_2 + "</td>");
     $(".n2").append("<td>" + num7_2 + "</td>");
     $(".n2").append("<td>" + num8_2 + "</td>");
     $(".n2").append("<td>" + num9_2 + "</td>");
     $(".n2").append("<td>" + num10_2 + "</td>");
     $(".n2").append("<td>" + num11_2 + "</td>");
     $(".n2").append("<td>" + num12_2 + "</td>");
     $(".n2").append("<td>" + num13_2 + "</td>");

     $(".n3").append("<td>3</td>");
     $(".n3").append("<td>" + num_3 + "</td>");
     $(".n3").append("<td>" + num2_3 + "</td>");
     $(".n3").append("<td>" + num3_3 + "</td>");
     $(".n3").append("<td>" + num4_3 + "</td>");
     $(".n3").append("<td>" + num5_3 + "</td>");
     $(".n3").append("<td>" + num6_3 + "</td>");
     $(".n3").append("<td>" + num7_3 + "</td>");
     $(".n3").append("<td>" + num8_3 + "</td>");
     $(".n3").append("<td>" + num9_3 + "</td>");
     $(".n3").append("<td>" + num10_3 + "</td>");
     $(".n3").append("<td>" + num11_3 + "</td>");
     $(".n3").append("<td>" + num12_3 + "</td>");
     $(".n3").append("<td>" + num13_3 + "</td>");

     $(".n4").append("<td>4</td>");
     $(".n4").append("<td>" + num_4 + "</td>");
     $(".n4").append("<td>" + num2_4 + "</td>");
     $(".n4").append("<td>" + num3_4 + "</td>");
     $(".n4").append("<td>" + num4_4 + "</td>");
     $(".n4").append("<td>" + num5_4 + "</td>");
     $(".n4").append("<td>" + num6_4 + "</td>");
     $(".n4").append("<td>" + num7_4 + "</td>");
     $(".n4").append("<td>" + num8_4 + "</td>");
     $(".n4").append("<td>" + num9_4 + "</td>");
     $(".n4").append("<td>" + num10_4 + "</td>");
     $(".n4").append("<td>" + num11_4 + "</td>");
     $(".n4").append("<td>" + num12_4 + "</td>");
     $(".n4").append("<td>" + num13_4 + "</td>");

     $(".n5").append("<td>5</td>");
     $(".n5").append("<td>" + num_5 + "</td>");
     $(".n5").append("<td>" + num2_5 + "</td>");
     $(".n5").append("<td>" + num3_5 + "</td>");
     $(".n5").append("<td>" + num4_5 + "</td>");
     $(".n5").append("<td>" + num5_5 + "</td>");
     $(".n5").append("<td>" + num6_5 + "</td>");
     $(".n5").append("<td>" + num7_5 + "</td>");
     $(".n5").append("<td>" + num8_5 + "</td>");
     $(".n5").append("<td>" + num9_5 + "</td>");
     $(".n5").append("<td>" + num10_5 + "</td>");
     $(".n5").append("<td>" + num11_5 + "</td>");
     $(".n5").append("<td>" + num12_5 + "</td>");
     $(".n5").append("<td>" + num13_5 + "</td>");

     $(".n6").append("<td>6</td>");
     $(".n6").append("<td>" + num_6 + "</td>");
     $(".n6").append("<td>" + num2_6 + "</td>");
     $(".n6").append("<td>" + num3_6 + "</td>");
     $(".n6").append("<td>" + num4_6 + "</td>");
     $(".n6").append("<td>" + num5_6 + "</td>");
     $(".n6").append("<td>" + num6_6 + "</td>");
     $(".n6").append("<td>" + num7_6 + "</td>");
     $(".n6").append("<td>" + num8_6 + "</td>");
     $(".n6").append("<td>" + num9_6 + "</td>");
     $(".n6").append("<td>" + num10_6 + "</td>");
     $(".n6").append("<td>" + num11_6 + "</td>");
     $(".n6").append("<td>" + num12_6 + "</td>");
     $(".n6").append("<td>" + num13_6 + "</td>");

     $(".n7").append("<td>7</td>");
     $(".n7").append("<td>" + num_7 + "</td>");
     $(".n7").append("<td>" + num2_7 + "</td>");
     $(".n7").append("<td>" + num3_7 + "</td>");
     $(".n7").append("<td>" + num4_7 + "</td>");
     $(".n7").append("<td>" + num5_7 + "</td>");
     $(".n7").append("<td>" + num6_7 + "</td>");
     $(".n7").append("<td>" + num7_7 + "</td>");
     $(".n7").append("<td>" + num8_7 + "</td>");
     $(".n7").append("<td>" + num9_7 + "</td>");
     $(".n7").append("<td>" + num10_7 + "</td>");
     $(".n7").append("<td>" + num11_7 + "</td>");
     $(".n7").append("<td>" + num12_7 + "</td>");
     $(".n7").append("<td>" + num13_7 + "</td>");

     $(".n8").append("<td>8</td>");
     $(".n8").append("<td>" + num_8 + "</td>");
     $(".n8").append("<td>" + num2_8 + "</td>");
     $(".n8").append("<td>" + num3_8 + "</td>");
     $(".n8").append("<td>" + num4_8 + "</td>");
     $(".n8").append("<td>" + num5_8 + "</td>");
     $(".n8").append("<td>" + num6_8 + "</td>");
     $(".n8").append("<td>" + num7_8 + "</td>");
     $(".n8").append("<td>" + num8_8 + "</td>");
     $(".n8").append("<td>" + num9_8 + "</td>");
     $(".n8").append("<td>" + num10_8 + "</td>");
     $(".n8").append("<td>" + num11_8 + "</td>");
     $(".n8").append("<td>" + num12_8 + "</td>");
     $(".n8").append("<td>" + num13_8 + "</td>");


     $(".n9").append("<td>9</td>");
     $(".n9").append("<td>" + num_9 + "</td>");
     $(".n9").append("<td>" + num2_9 + "</td>");
     $(".n9").append("<td>" + num3_9 + "</td>");
     $(".n9").append("<td>" + num4_9 + "</td>");
     $(".n9").append("<td>" + num5_9 + "</td>");
     $(".n9").append("<td>" + num6_9 + "</td>");
     $(".n9").append("<td>" + num7_9 + "</td>");
     $(".n9").append("<td>" + num8_9 + "</td>");
     $(".n9").append("<td>" + num9_9 + "</td>");
     $(".n9").append("<td>" + num10_9 + "</td>");
     $(".n9").append("<td>" + num11_9 + "</td>");
     $(".n9").append("<td>" + num12_9 + "</td>");
     $(".n9").append("<td>" + num13_9 + "</td>");

     $(".n10").append("<td>10</td>");
     $(".n10").append("<td>" + num_10 + "</td>");
     $(".n10").append("<td>" + num2_10 + "</td>");
     $(".n10").append("<td>" + num3_10 + "</td>");
     $(".n10").append("<td>" + num4_10 + "</td>");
     $(".n10").append("<td>" + num5_10 + "</td>");
     $(".n10").append("<td>" + num6_10 + "</td>");
     $(".n10").append("<td>" + num7_10 + "</td>");
     $(".n10").append("<td>" + num8_10 + "</td>");
     $(".n10").append("<td>" + num9_10 + "</td>");
     $(".n10").append("<td>" + num10_10 + "</td>");
     $(".n10").append("<td>" + num11_10 + "</td>");
     $(".n10").append("<td>" + num12_10 + "</td>");
     $(".n10").append("<td>" + num13_10 + "</td>");

     // $(".s").append("<td>小</td>");
     // $(".s").append("<td>" + xnum + "</td>");
     // $(".s").append("<td>" + xnum2 + "</td>");
     // $(".s").append("<td>" + xnum3 + "</td>");
     // $(".s").append("<td>" + xnum4 + "</td>");
     // $(".s").append("<td>" + xnum5 + "</td>");
     // $(".s").append("<td>" + xnum6 + "</td>");
     // $(".s").append("<td>" + xnum7 + "</td>");
     // $(".s").append("<td>" + xnum8 + "</td>");
     // $(".s").append("<td>" + xnum9 + "</td>");
     // $(".s").append("<td>" + xnum10 + "</td>");
     // $(".s").append("<td>" + xnum11 + "</td>");
     // $(".s").append("<td>" + xnum12 + "</td>");
     // $(".s").append("<td>" + xnum13 + "</td>");

 }

 //冠亚和单双
 function dx_guanya(dx) {
     var num = 0;
     var num2 = 0;
     var num3 = 0;
     var num4 = 0;
     var num5 = 0;
     var num6 = 0;
     var num7 = 0;
     var num8 = 0;
     var num9 = 0;
     var num10 = 0;
     var num11 = 0;
     var num12 = 0;
     var num13 = 0;

     var xnum = 0;
     var xnum2 = 0;
     var xnum3 = 0;
     var xnum4 = 0;
     var xnum5 = 0;
     var xnum6 = 0;
     var xnum7 = 0;
     var xnum8 = 0;
     var xnum9 = 0;
     var xnum10 = 0;
     var xnum11 = 0;
     var xnum12 = 0;
     var xnum13 = 0;

     for (var o = 0; o < dx.length; o++) {
         if (dx[o]['name'] == '大') {
             if (dx[o]['num'] == 2) {
                 num++;
             }
             if (dx[o]['num'] == 3) {
                 num2++;
             }
             if (dx[o]['num'] == 4) {
                 num3++;
             }
             if (dx[o]['num'] == 5) {
                 num4++;
             }
             if (dx[o]['num'] == 6) {
                 num5++;
             }
             if (dx[o]['num'] == 7) {
                 num6++;
             }
             if (dx[o]['num'] == 8) {
                 num7++;
             }
             if (dx[o]['num'] == 9) {
                 num8++;
             }
             if (dx[o]['num'] == 10) {
                 num9++;
             }
             if (dx[o]['num'] == 11) {
                 num10++;
             }
             if (dx[o]['num'] == 12) {
                 num11++;
             }
             if (dx[o]['num'] == 13) {
                 num12++;
             }
             if (dx[o]['num'] == 14) {
                 num13++;
             }
         }
         if (dx[o]['name'] == '小') {
             if (dx[o]['num'] == 2) {
                 xnum++;
             }
             if (dx[o]['num'] == 3) {
                 xnum2++;
             }
             if (dx[o]['num'] == 4) {
                 xnum3++;
             }
             if (dx[o]['num'] == 5) {
                 xnum4++;
             }
             if (dx[o]['num'] == 6) {
                 xnum5++;
             }
             if (dx[o]['num'] == 7) {
                 xnum6++;
             }
             if (dx[o]['num'] == 8) {
                 xnum7++;
             }
             if (dx[o]['num'] == 9) {
                 xnum8++;
             }
             if (dx[o]['num'] == 10) {
                 xnum9++;
             }
             if (dx[o]['num'] == 11) {
                 xnum10++;
             }
             if (dx[o]['num'] == 12) {
                 xnum11++;
             }
             if (dx[o]['num'] == 13) {
                 xnum12++;
             }
             if (dx[o]['num'] == 14) {
                 xnum13++;
             }

         }
     }
         $(".d").append("<td>大</td>");
         $(".d").append("<td>" + num + "</td>");
         $(".d").append("<td>" + num2 + "</td>");
         $(".d").append("<td>" + num3 + "</td>");
         $(".d").append("<td>" + num4 + "</td>");
         $(".d").append("<td>" + num5 + "</td>");
         $(".d").append("<td>" + num6 + "</td>");
         $(".d").append("<td>" + num7 + "</td>");
         $(".d").append("<td>" + num8 + "</td>");
         $(".d").append("<td>" + num9 + "</td>");
         $(".d").append("<td>" + num10 + "</td>");
         $(".d").append("<td>" + num11 + "</td>");
         $(".d").append("<td>" + num12 + "</td>");
         $(".d").append("<td>" + num13 + "</td>");
         $(".s").append("<td>小</td>");
         $(".s").append("<td>" + xnum + "</td>");
         $(".s").append("<td>" + xnum2 + "</td>");
         $(".s").append("<td>" + xnum3 + "</td>");
         $(".s").append("<td>" + xnum4 + "</td>");
         $(".s").append("<td>" + xnum5 + "</td>");
         $(".s").append("<td>" + xnum6 + "</td>");
         $(".s").append("<td>" + xnum7 + "</td>");
         $(".s").append("<td>" + xnum8 + "</td>");
         $(".s").append("<td>" + xnum9 + "</td>");
         $(".s").append("<td>" + xnum10 + "</td>");
         $(".s").append("<td>" + xnum11 + "</td>");
         $(".s").append("<td>" + xnum12 + "</td>");
         $(".s").append("<td>" + xnum13 + "</td>");

 }

 //冠亚和大小
 function ds_guanya(dx) {
     var num = 0;
     var num2 = 0;
     var num3= 0;
     var num4 = 0;
     var num5 = 0;
     var num6 = 0;
     var num7 = 0;
     var num8 = 0;
     var num9 = 0;
     var num10 = 0;
     var num11 = 0;
     var num12 = 0;
     var num13 = 0;

     var xnum = 0;
     var xnum2 = 0;
     var xnum3= 0;
     var xnum4 = 0;
     var xnum5 = 0;
     var xnum6 = 0;
     var xnum7 = 0;
     var xnum8 = 0;
     var xnum9 = 0;
     var xnum10 = 0;
     var xnum11 = 0;
     var xnum12 = 0;
     var xnum13 = 0;

     for(var o=0; o<dx.length;o++) {
         if (dx[o]['name'] == '单') {
             if (dx[o]['num'] == 2) {
                 num++;
             }
             if (dx[o]['num'] == 3) {
                 num2++;
             }
             if (dx[o]['num'] == 4) {
                 num3++;
             }
             if (dx[o]['num'] == 5) {
                 num4++;
             }
             if (dx[o]['num'] == 6) {
                 num5++;
             }
             if (dx[o]['num'] == 7) {
                 num6++;
             }
             if (dx[o]['num'] == 8) {
                 num7++;
             }
             if (dx[o]['num'] == 9) {
                 num8++;
             }
             if (dx[o]['num'] == 10) {
                 num9++;
             }
             if (dx[o]['num'] == 11) {
                 num10++;
             }
             if (dx[o]['num'] == 12) {
                 num11++;
             }
             if (dx[o]['num'] == 13) {
                 num12++;
             }
             if (dx[o]['num'] == 14) {
                 num13++;
             }
         }
         if (dx[o]['name'] == '双') {
             if (dx[o]['num'] == 2) {
                 xnum++;
             }
             if (dx[o]['num'] == 3) {
                 xnum2++;
             }
             if (dx[o]['num'] == 4) {
                 xnum3++;
             }
             if (dx[o]['num'] == 5) {
                 xnum4++;
             }
             if (dx[o]['num'] == 6) {
                 xnum5++;
             }
             if (dx[o]['num'] == 7) {
                 xnum6++;
             }
             if (dx[o]['num'] == 8) {
                 xnum7++;
             }
             if (dx[o]['num'] == 9) {
                 xnum8++;
             }
             if (dx[o]['num'] == 10) {
                 xnum9++;
             }
             if (dx[o]['num'] == 11) {
                 xnum10++;
             }
             if (dx[o]['num'] == 12) {
                 xnum11++;
             }
             if (dx[o]['num'] == 13) {
                 xnum12++;
             }
             if (dx[o]['num'] == 14) {
                 xnum13++;
             }
         }
     }
     $(".dx").append("<td>单</td>");
     $(".dx").append("<td>"+num+"</td>");
     $(".dx").append("<td>"+num2+"</td>");
     $(".dx").append("<td>"+num3+"</td>");
     $(".dx").append("<td>"+num4+"</td>");
     $(".dx").append("<td>"+num5+"</td>");
     $(".dx").append("<td>"+num6+"</td>");
     $(".dx").append("<td>"+num7+"</td>");
     $(".dx").append("<td>"+num8+"</td>");
     $(".dx").append("<td>"+num9+"</td>");
     $(".dx").append("<td>"+num10+"</td>");
     $(".dx").append("<td>"+num11+"</td>");
     $(".dx").append("<td>"+num12+"</td>");
     $(".dx").append("<td>"+num13+"</td>");
     $(".x").append("<td>双</td>");
     $(".x").append("<td>"+xnum+"</td>");
     $(".x").append("<td>"+xnum2+"</td>");
     $(".x").append("<td>"+xnum3+"</td>");
     $(".x").append("<td>"+xnum4+"</td>");
     $(".x").append("<td>"+xnum5+"</td>");
     $(".x").append("<td>"+xnum6+"</td>");
     $(".x").append("<td>"+xnum7+"</td>");
     $(".x").append("<td>"+xnum8+"</td>");
     $(".x").append("<td>"+xnum9+"</td>");
     $(".x").append("<td>"+xnum10+"</td>");
     $(".x").append("<td>"+xnum11+"</td>");
     $(".x").append("<td>"+xnum12+"</td>");
     $(".x").append("<td>"+xnum13+"</td>");

 }
			</script> 
</body>
</html>