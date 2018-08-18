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
<title><?=$web_type?>冷热统计_<?=$webtitle?>手机版</title>
<script src="../style/js/jquery.js"></script>
<script src="../style/js/layer.js"></script>
<script src="../style/js/lotcommon.js" type="text/javascript"></script>
<script src="../style/js/warntime.js" type="text/javascript"></script>
<link type="text/css" href="../style/css/style.css" rel="stylesheet">





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
       
       <li><a href="hmzs.php">走势</a></li>
       <li><a href="lrtj.php" class="cur">冷热</a></li>
       <li><a href="jiqiao.php">技巧</a></li>
       
     </ul>


</div>
<div style="height:40px;"></div>
<div id="re" class="container" style="border:1px solid #ddd">
<img src="../style/images/loading2.gif">
</div>
 <div id="leng" class="container" style="border:1px solid #ddd">
<img src="../style/images/loading2.gif">
</div>

<div class="balllist">
				<ul class="ball">
				  <li><a href="javascript:void(0);" class='cur' ball="1">冠军</a></li>
				  <li><a class="no" href="javascript:void(0);" ball="2">亚军</a></li>
				  <li><a class="no" href="javascript:void(0);" ball="3">第3名</a></li>
				  <li><a class="no" href="javascript:void(0);" ball="4">第4名</a></li>
				  <li><a class="no" href="javascript:void(0);" ball="5">第5名</a></li>
				  <li><a class="no" href="javascript:void(0);" ball="6">第6名</a></li>
				  <li><a class="no" href="javascript:void(0);" ball="7">第7名</a></li>
				  <li><a class="no" href="javascript:void(0);" ball="8">第8名</a></li>
				  <li><a class="no" href="javascript:void(0);" ball="9">第9名</a></li>
				  <li><a class="no" href="javascript:void(0);" ball="10">第10名</a></li>
			
				</ul>
			</div>

   
<?php include("../public/footer.php"); ?>

 <script type="text/javascript">
            $(function () {
            	$(".ball li a").each(function () {
                    $(this).bind("click", function () {
                        $(".ball li a").removeClass("cur");
                        $(this).addClass("cur");
                        re();
                        leng();
                    });
                });
            });
            
            function re() {
            	layer.open({type: 2,time: 1});
            	var ball = $(".ball li .cur").attr("ball");
            	var ballNames = new Array();
            	ballNames["1"] = "冠军";
            	ballNames["2"] = "亚军";
            	ballNames["3"] = "第三名";
            	ballNames["4"] = "第四名";
            	ballNames["5"] = "第五名";
            	ballNames["6"] = "第六名";
            	ballNames["7"] = "第七名"; 
				ballNames["8"] = "第八名";
				ballNames["9"] = "第九名";
				ballNames["10"] = "第十名";
            
               $.get("ajax_rmhmdata.php", {ball: ball,t:Math.random()}, function (result) {
            	   layer.closeAll();
                    var data = eval(result);
                    showChartline(ballNames[ball]+"热门号码",data,ballNames[ball],'re');
               }, "json");
            }
            function leng() {
            	layer.open({type: 2,time: 1});
            	var ball = $(".ball li .cur").attr("ball");
            	var ballNames = new Array();
            	ballNames["1"] = "冠军";
            	ballNames["2"] = "亚军";
            	ballNames["3"] = "第三名";
            	ballNames["4"] = "第四名";
            	ballNames["5"] = "第五名";
            	ballNames["6"] = "第六名";
            	ballNames["7"] = "第七名"; 
				ballNames["8"] = "第八名";
				ballNames["9"] = "第九名";
				ballNames["10"] = "第十名";
               $.get("ajax_hmyldata.php", {ball: ball,t:Math.random()}, function (result) {
            	   layer.closeAll();
                    var data = eval(result);
                    showChartline(ballNames[ball]+"号码遗漏",data,ballNames[ball],'leng');
               }, "json");
            }
            re();
            leng();
    </script>
<script src="../style/js/highcharts.js" type="text/javascript"></script>
<script src="../style/js/column.js" type="text/javascript"></script>
</body>
</html>