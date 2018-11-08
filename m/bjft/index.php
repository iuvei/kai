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
<title><?=$web_type?>开奖直播_<?=$web_type?>开奖历史记录_<?=$webtitle?>手机版</title>
<script src="../style/js/jquery.js?t=2018"></script>
<script src="../style/js/layer.js?t=2018"></script>
<script src="../style/js/lotcommon.js?t=2018" type="text/javascript"></script>
<script src="../style/js/warntime.js" type="text/javascript"></script>
<link type="text/css" href="../style/css/style.css?t=2018" rel="stylesheet">
<link type="text/css" href="../style/css/histoly.css?t=2018" rel="stylesheet">





</head>
<body>



<?php include("../public/header.php"); ?>


   
<script src="award.js?t=2018" type="text/javascript"></script>
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

    <select class="chooseIssue">
        <option value="">全部期数</option>
    </select>
</div>

<style type="text/css">

</style>

<div class="openResult">
    <div class="openIssueList">
        <div class="newIssue">
            第<span></span>期结果
        </div>
        <div class="issueList">
            已开<span class="periodNumber"></span>期，剩<span class="surplus_num"></span>期
        </div>
    </div>
    <div class="openCodeList">
        <img src="/m/style/images/loading2.gif">
    </div>
    <div class="lhResult">
        <a>龙</a>
        <a>龙</a>
        <a>龙</a>
        <a>龙</a>
        <a>龙</a>
        <a><span></span></a>
        <a id="zh">总和：</a>
        <a></a>
        <a></a>
        <a></a>
    </div>
    <div class="nextOpenList">
        <div class="nextIssue">距<span></span>期开奖</div>

        <div id="Bar">
            <div class="Bar">
                <div id="takeout_bar">
                    <span></span>
                </div>
            </div>
        </div>
        <div class="nextTime">
            <span id="headOpenTimeM"></span>:<span id="headOpenTimeS"></span>
        </div>
        <a class="video2" href="shipin.php">
            <img src="/m/style/images/ico_sp.png"><span>开奖直播</span>
        </a>

    </div>
</div>

<div class="choose2" id="chooseType">
    <a>开奖</a>
    <a>摊路</a>
    <a>单双</a>
</div>
<div class="BallNum">
    <div class="BallNumHead">
        <a class="issue">期号</a>
        <a>前三</a>
        <a>中三</a>
        <a>后三</a>
    </div>
</div>
<div id="historyList"></div>
   
<?php include("../public/footer.php"); ?>


      <script type="text/javascript">
      
  
  	
$(function () {

	
	//显示默认日期
	var now = new Date();





    $("#dateTime").val(now.getFullYear()+"-"+((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1)+"-"+(now.getDate()<10?"0":"")+now.getDate());
    $(".dataYMD").html( $("#dateTime").val());
    $('.dataWeed').html(getWeed($("#dateTime").val()));

    //提取记录
    getHistoryData('50','');

});



//刷新
function refresh(){

	getHistoryData('50','');

}

</script> 	

</body>
</html>