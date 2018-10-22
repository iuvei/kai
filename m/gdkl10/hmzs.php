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
<title><?=$web_type?>走势_<?=$webtitle?>手机版</title>
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
<div class="daojishi1">
    <div class="xia-yxx-list" id="xia-yxx-list1" style="display: none;">
        <ul class="">
            <li><a href="../pk10/" game="pk10" class="">北京赛车pk10</a></li>
            <li><a href="../cqssc/" game="cqssc">重庆时时彩</a></li>
            <li><a href="../xyft/" game="xyft">幸运飞艇</a></li>
            <li><a game="bjft" href="../bjft/">北京番摊</a></li>
            <li><a game="cqft" href="../cqft">重庆番摊</a></li>
            <li><a href="../jsssc/" game="jsssc">极速时时彩</a></li>
            <li><a href="../jssc/" game="jssc">极速赛车</a></li>
            <li><a href="../jsk3/" game="jsk3">江苏快3</a></li>
            <li><a href="../gd11x5/" game="gd11x5">广东11选5</a></li>
            <li><a href="../gdkl10/" game="gdkl10">广东快乐十分</a></li>
            <li><a href="../pc28/" game="pc28">加拿大28</a></li>
            <li><a href="../txffc/" game="txffc" class="cur">腾讯分分彩</a></li>
            <li><a href="../tcssc/" game="tcssc">头彩时时彩</a></li>
            <li><a href="../tcpk10/" game="tcpk10">头彩PK10</a></li>
        </ul>
    </div>
    <div class="fl xia-yx" id="xia-yx1"><?=$web_type?><span class="xialabt" id="xialabt1"></span> </div>

    <div class="fr"><a class="sp" href="shipin.php">开奖直播</a></div>
</div>
<ul class="kaij-mylist">
    <li class="kaij-mylist-li" id="gdkl10" style="border-bottom: 1px solid #eeeeee;">

        <div class="kaij-mylist-r">
            <div class="kaij-mylist-hd daojishi " style="padding-top: 0;">
                <div class="itm-time"><em id="period"></em>期开奖剩余：<span id="time" class="itm-time-time">01:27</span></div>
                <div class="itm-tit"><span class="itm-qih" id="qihao">第710580期</span></div>
            </div>
            <div class="kaij-mylist-bd">
                <div class="itm-result">
                    <div class="ball-wrap" id="number"><i class="ball-red">7</i><i class="ball-red">0</i><i class="ball-red">5</i><i class="ball-red">6</i><i class="ball-red">4</i><i class="ball-red">5</i><i class="ball-red">6</i><i class="ball-red">4</i></div>
                </div>
            </div>
        </div>

        <div class="bt-jg">总和 <span>18</span> <span>大</span><span>单</span><span class="span-2">尾大</span> 1-4龙虎<span>龙</span><span>虎</span><span>龙</span><span>龙</span></div>

    </li>

</ul>
<div class="gametool">
    <div class="fl" id="xia-yx2">号码走势<span class="xialabt " id="xialabt2"></span>


        <div class="xia-yxx-list" id="xia-yxx-list2" style="display: none;">
            <ul class="">
                <li><a href="./" class="cur">开奖历史</a></li>
                <li><a href="smtj.php">两面统计</a></li>
                <li><a href="cltj.php">长龙统计</a></li>
                <li><a href="hmzs.php">号码走势</a></li>
                <li><a href="lrtj.php">冷热统计</a></li>
                <li><a href="jiqiao.php">玩法技巧</a></li>
                <li><a href="shipin.php">开奖直播</a></li>
            </ul>
        </div>


    </div>

    <!--    <ul class="fr">-->
    <!--        <input type="date" name="dateData" id="dateData" onchange="Search()"/>-->
    <!---->
    <!---->
    <!--    </ul>-->

</div>

<div id="container" style="border:1px solid #ddd">
<img src="../style/images/loading2.gif">
</div>

					<div class="balllist">
				<ul class="ball">
				  <li><a href="javascript:void(0);" class='cur' ball="1">第一球</a></li>
				  <li><a class="no" href="javascript:void(0);" ball="2">第二球</a></li>
				  <li><a class="no" href="javascript:void(0);" ball="3">第3球</a></li>
				  <li><a class="no" href="javascript:void(0);" ball="4">第4球</a></li>
				  <li><a class="no" href="javascript:void(0);" ball="5">第5球</a></li>
				  <li><a class="no" href="javascript:void(0);" ball="6">第6球</a></li>
				  <li><a class="no" href="javascript:void(0);" ball="7">第7球</a></li>
				  <li><a class="no" href="javascript:void(0);" ball="8">第8球</a></li>
			
				</ul>
			</div>


   
<?php include("../public/footer.php"); ?>


 <script type="text/javascript">
            $(function () {
            	$(".ball li a").each(function () {
                    $(this).bind("click", function () {
                        $(".ball li a").removeClass("cur");
                        $(this).addClass("cur");
                        drawTrend();
                    });
                });
            });
            
            function drawTrend() {
            	layer.open({type: 2,time: 1});
            	var ball = $(".ball li .cur").attr("ball");
            	var ballNames = new Array();
            	ballNames["1"] = "第一球";
            	ballNames["2"] = "第二球";
            	ballNames["3"] = "第三球";
            	ballNames["4"] = "第四球";
            	ballNames["5"] = "第五球";
            	ballNames["6"] = "第六球";
            	ballNames["7"] = "第七球"; 
				ballNames["8"] = "第八球";
				// ballNames["9"] = "第九球";
				// ballNames["10"] = "第十球";
            
            
               
               $.get("../ajax/pk10_trend.php", { type:21, ball: ball, count: 8, t: Math.random() }, function (data) {
            	   layer.closeAll();
                	data=eval(data);
                   showChartline(ballNames[ball]+"走势图", data, "号",1, 20, 'container',ballNames[ball]);
               }, "json");
               
            }
            drawTrend();
            function showChartline(title, data, mingzi, ymin, ymax, container,name) {

                var categories = [];
                var datas = [];
                var results = [];
                $.each(data, function(i, n) {
                    categories[i] = n[0];
                    datas[i] = parseInt(n[1]);
                    results[n[0]] = n[2];
                });
                var options = {
                    chart: {
                        type: 'line',
                        renderTo: container || 'container',
                        defaultSeriesType: 'spline'
                    },
                    title: {
                        text: title
                    },
                    xAxis: {
                        gridLineWidth: 1,
                        categories: categories,
                        labels: {
                            format: '{value}期'
                        }
                    },
                    yAxis: {

                        allowDecimals:false,
                        //minorTickInterval: 1,
                        tickPixelInterval: 1,
                        title: {
                            text: "",
                        },
                        min: ymin,
                        max: ymax,
                        labels: {
                            format: '{value}号',
                        }
                    },
                    legend: { enabled: false },//年份隐藏与显示
                    tooltip: {
                        shared: true,
                        style: {
                            'fontSize': '14px',
                            'fontWeight': 'bold',
                            'z-index:': '10000'
                        },
                        useHTML: true,
                        formatter: function() {
                            return "<div style='text-align:center;'>" + name + "：" + this.x + "期  开出：" + this.y + "号</div>" + results[this.x]
                        }
                    },
                    plotOptions: {
                        line: {
                            dataLabels: {
                                enabled: true
                            },
                        }
                    },
                    series: [{
                        data: datas,
                    }]
                };
                $(function() {
                    var chart = new Highcharts.Chart(options)
                })
            }
    </script>

			<script src="highcharts.js" type="text/javascript"></script>
			<script src="hmzs.js" type="text/javascript"></script>
</body>
</html>