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
    <li class="kaij-mylist-li" id="cqft" style="border-bottom: 1px solid #eeeeee;">

        <div class="kaij-mylist-r">
            <div class="kaij-mylist-hd daojishi " style="padding-top: 0;">
                <div class="itm-time"><em id="period"></em>期开奖剩余：<span id="time" class="itm-time-time">01:27</span></div>
                <div class="itm-tit"><span class="itm-qih" id="qihao">第710580期</span></div>
            </div>
            <div class="kaij-mylist-bd">
                <div class="itm-result">
                    <div class="ball-wrap" id="number"><i class="ball-red">1</i><i class="ball-red">6</i><i class="ball-red">7</i><i class="ball-red">5</i><i class="ball-red">9</i><span class="ball-red span-2">4摊</span><span class="ball-red">大</span><span class="ball-red">单</span></div>
                </div>
            </div>
        </div>



    </li>

</ul>
<div class="gametool">
    <div class="fl" id="xia-yx2">冷热统计<span class="xialabt " id="xialabt2"></span>


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
                var name = "<?=$name?>";
                $.get("/Fuzhi/Api/leng_re", {ball: ball,id:name,t:Math.random()}, function (result) {
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
                var name = "<?=$name?>";
                $.get("/Fuzhi/Api/leng_re", {ball: ball,id:name,t:Math.random()}, function (result) {
            	   layer.closeAll();
                    var data = eval(result);
                    showChartline(ballNames[ball]+"号码遗漏",data,ballNames[ball],'leng');
               }, "json");
            }
            re();
            leng();
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
<script src="../style/js/highcharts.js" type="text/javascript"></script>
<script src="../style/js/column.js" type="text/javascript"></script>
</body>
</html>