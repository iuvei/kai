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
<script src="../style/js/jquery.js"></script>
<script src="../style/js/layer.js"></script>
<script src="../style/js/history.js"></script>
<script src="../style/js/lotcommon.js" type="text/javascript"></script>
<script src="../style/js/warntime.js" type="text/javascript"></script>
<link type="text/css" href="../style/css/style.css" rel="stylesheet">
<link type="text/css" href="../style/css/histoly.css" rel="stylesheet">





</head>
<body>



<?php include("../public/header.php"); ?>


   
<script src="award.js" type="text/javascript"></script>
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
            <li><a href="../gdkl10/" game="gdkl10">广东快乐十分</a></li>
            <li><a href="../pc28/" game="pc28">加拿大28</a></li>
            <li><a href="../txffc/" game="txffc" class="cur">腾讯分分彩</a></li>
        </ul>
    </div>
    <div class="fl xia-yx" id="xia-yx1"><?=$web_type?><span class="xialabt" id="xialabt1"></span> </div>

    <div class="fr"><a class="sp" href="shipin.php">开奖直播</a></div>
</div>




<div class="head">
    <div class="headRow1">
        <input type="date" id="dateTime" onchange="Search()">
        <div><a class="dataYMD"></a><a class="dataWeed"></a></div>
        <select class="chooseIssue">
            <option value="">全部期数</option>
        </select>
    </div>
    <div class="headRow2">
        <div>今日已开<a class="openIssue"></a>期</div>
        <div>剩余<a class="residueIssue"></a>期</div>
        <div>总期数<a class="totalIssue"></a>期</div>
    </div>
    <div class="headRow3">
        <div><a class="nextOpenIssue"></a>期剩</div>
        <div class="headOpenTime">
            <a class="headOpenTimeM" id="headOpenTimeM"></a>
            <span>分</span>
            <a class="headOpenTimeS" id="headOpenTimeS"></a>
            <span>秒</span>
        </div>
        <div class="itm-time">开奖时间<a class="nextOpenTime" id="time"></a></div>
    </div>
</div>
<div class="choose" style="display: none">
    <div class="chooseRow1" id="chooseNum">
        <a>1</a>
        <a>2</a>
        <a>3</a>
        <a>4</a>
        <a>5</a>
        <a>6</a>
        <a>7</a>
        <a>8</a>
        <a>9</a>
    </div>
    <div class="chooseRow1" id="chooseType2">
        <a>大</a>
        <a>小</a>
        <a>单</a>
        <a>双</a>
        <a>还原</a>
    </div>
</div>
<div class="choose2" id="chooseType">
    <a class="chooseType">号码</a>
    <a>大小</a>
    <a>单双</a>
    <a>筛选</a>
</div>
<div class="BallNum">
    <div class="BallNumHead">
        <a class="issue">期号</a>
        <a>一</a>
        <a>二</a>
        <a>三</a>
        <a>四</a>
        <a>五</a>
        <a>总</a>
        <a>和</a>
        <a>值</a>
        <a>龙虎</a>
    </div>
</div>
<div id="historyList"></div>
<!--<div class="openCode">
    <div class="qihao">
        <div>23:15</div>
        <div>12345678</div>
    </div>
    <div>
        <a class="no1">2</a>
    </div>
    <div>
        <a class="no1">3</a>
    </div>
    <div>
        <a class="no1">4</a>
    </div>
    <div>
        <a class="no1">5</a>
    </div>
    <div>
        <a class="no1">6</a>
    </div>
    <div>
        <a class="no1">7</a>
    </div>
    <div>
        <a class="no1">8</a>
    </div>
    <div>
        <a class="no1">9</a>
    </div>
    <div>
        <a class="no1">10</a>
    </div>
    <div>
        <a class="no1">10</a>
    </div>
</div>-->







   
<?php include("../public/footer.php"); ?>


      <script type="text/javascript">
      
  
  	
$(function () {

    // $('#chooseType').click(function () {
    //     alert(123)
    // })
	//显示默认日期
	var now = new Date();



  
    $("#dateTime").val(now.getFullYear()+"-"+((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1)+"-"+(now.getDate()<10?"0":"")+now.getDate());
    $(".dataYMD").html( $("#dateTime").val());
    $('.dataWeed').html(getWeed($("#dateTime").val()))



	//提取记录

    getHistoryData('50','');


});
//搜索


function Search() {
	
	getHistoryData('50', $("#dateTime").val());
    $(".dataYMD").html( $("#dateTime").val());
    $('.dataWeed').html(getWeed($("#dateTime").val()))
	return false;
}
//刷新
function refresh(){

	getHistoryData('50','');

}

</script> 	

</body>
</html>