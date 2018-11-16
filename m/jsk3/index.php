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
    <script src="../style/js/lotcommon.js?v=<?php echo date("Y/m/d")?>" type="text/javascript"></script>
    <script src="../style/js/warntime.js?v=<?php echo date("Y/m/d")?>" type="text/javascript"></script>
    <link type="text/css" href="../style/css/style.css?v=<?php echo date("Y/m/d")?>"  rel="stylesheet">


    <style type="text/css">



    </style>


</head>
<body>



<?php include("../public/header.php"); ?>

<script src="award.js?v=<?php echo date("Y/m/d")?>" type="text/javascript"></script>
<link type="text/css" href="../style/css/pk10.css" rel="stylesheet">
<?php include("../public/header2.php"); ?>
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
        <a class="video2" >
            <img src="/m/style/images/ico_sp.png"><span>开奖直播</span>
        </a>

    </div>
</div>


<div class="BallNum">
    <div class="BallNumHead">
        <a class="issue">期号</a>
        <a class="dianshu">江苏快3</a>
        <a class="yxx">鱼虾蟹</a>
        <a>点数</a>
    </div>
</div>
<div id="historyList"></div>
<?php include("../public/jsk3.php"); ?>
<div class="pageLod" style="display: none"><img src="../style/images/loading2.gif"></div>
<?php include("../public/footer.php"); ?>


      <script type="text/javascript">
      
  
  	
$(function () {

	
	//显示默认日期
	var now = new Date();




    $("#dateTime").val(now.getFullYear()+"-"+((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1)+"-"+(now.getDate()<10?"0":"")+now.getDate());
    $(".dataYMD").html( $("#dateTime").val());
    $('.dataWeed').html(getWeed($("#dateTime").val()))

	//提取记录

    getHistoryData('30','');

});
//搜索
var issueStr = '';
function chooseIssue() {
      issueStr=$('.chooseIssue').val();

        if(issueStr==''){//全部期数
            $('.openCode').show();
            return
        }
        for (var i=0;i<$('.Issue').length;i++){
            if( $('.Issue').eq(i).text() == issueStr){
                $('.Issue').eq(i).parent().parent().parent().show();
            }else {
                $('.Issue').eq(i).parent().parent().parent().hide();
            }
        }
   }

$('#dateTime').change(function () {
	getHistoryData('30', $("#dateTime").val());
	return false;
})
//刷新
function refresh(){

	getHistoryData('30','');

}

</script>
<script src="../style/js/common.js?v=<?php echo date("Y/m/d")?>" type="text/javascript"></script>
</body>
</html>