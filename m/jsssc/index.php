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
            <li><a href="../pk10/" game="pk10" class="">北京PK10</a></li>
            <li><a href="../sfpk10/" game="jssc">三分PK10</a></li>
            <li><a href="../tcpk10/" game="tcpk10">极速PK10</a></li>
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

//刷新
function refresh(){

	getHistoryData('50','');

}

</script> 	

</body>
</html>