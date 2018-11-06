<?php
include("../conn.php");
$cid = 42;
?>
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0"/>

    <meta name="HandheldFriendly" content="true" />
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">

    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
    <meta name="format-detection"content="telephone=no"/>
    <title><?=$web_type?>开奖直播</title>
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
            <li><a href="../pk10/" game="pk10" class="">北京pk10</a></li>
            <li><a href="../sfpk10/" game="jssc">三分pk10</a></li>
            <li><a href="../tcpk10/" game="tcpk10">极速pk10</a></li>
            <li><a href="../xyft/" game="xyft">幸运飞艇</a></li>
            <li><a href="../cqssc/" game="cqssc">重庆时时彩</a></li>
            <li><a href="../tcssc/" game="tcssc">极速时时彩</a></li>
            <li><a href="../sfssc/" game="jsssc">三分时时彩</a></li>
            <li><a game="bjft" href="../bjft/">北京番摊</a></li>
            <li><a game="cqft" href="../cqft">重庆番摊</a></li>
            <li><a href="../jsk3/" game="jsk3">江苏快3</a></li>
            <li><a href="../gd11x5/" game="gd11x5">广东11选5</a></li>
<!--            <li><a href="../gdkl10/" game="gdkl10">广东快乐十分</a></li>-->
            <li><a href="../pc28/" game="pc28">加拿大28</a></li>
            <li><a href="../txffc/" game="txffc" class="cur">腾讯分分彩</a></li>
        </ul>
    </div>
    <div class="fl xia-yx" id="xia-yx1"><?=$web_type?><span class="xialabt" id="xialabt1"></span> </div>

    <div class="fr"><a class="sp" href="shipin.php">开奖直播</a></div>
</div>

<ul class="kaij-mylist">
    <li class="kaij-mylist-li" id="pk10" style="border-bottom: 1px solid #eeeeee;">

        <div class="kaij-mylist-r">
            <div class="kaij-mylist-hd daojishi " style="padding-top: 0;">
                <div class="itm-time"><em id="period"></em>期开奖剩余：<span id="time" class="itm-time-time">01:27</span></div>
                <div class="itm-tit"><span class="itm-qih" id="qihao">第710580期</span></div>
            </div>
            <div class="kaij-mylist-bd">
                <div class="itm-result">
                    <div class="ball-wrap" id="number"><i class="no10">10</i><i class="no3">03</i><i class="no6">06</i><i class="no9">09</i><i class="no4">04</i><i class="no2">02</i><i class="no8">08</i><i class="no7">07</i><i class="no5">05</i><i class="no1">01</i></div>
                </div>
            </div>
        </div>
        <div class="bt-jg">冠亚和 <span>18</span> <span>大</span><span>单</span> 1-5龙虎 <span>龙</span><span>虎</span><span>龙</span><span>虎</span><span>龙</span></div>


    </li>

</ul>
<div class="gametool">
    <div class="fl" id="xia-yx2">开奖直播<span class="xialabt " id="xialabt2"></span>


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
<div class="list">
    <iframe src="/v2/jspk10" style="    width: 100%;height: 220px">

    </iframe>

</div>

<?php include("../public/footer.php"); ?>
</body>
</html>