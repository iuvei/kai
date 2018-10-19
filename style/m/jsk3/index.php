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
     <li><a href="./" class="cur">首页</a></li>
       
       
       
       
       <li><a href="jiqiao.php">技巧</a></li>
       
     </ul>
     <ul class="fr">
     <input type="date" name="dateData" id="dateData" onchange="Search()"/>  


     </ul>

</div>


<input type="hidden" id="callFun" value="refresh" time="2000"/>


<div class="video">
<a class="sp" href="shipin.php">视频开奖直播</a>
<a class="qq" style="border-left:1px solid #ddd" href="<?=$qqun?>" target="_blank">高手交流QQ群</a>
</div>

 <div class="tabletop-sp">
 <table width="100%">
<tr>
<td width="14%">期号</td>
<td width="14%">时间</td>
<td>开奖号码</td>
</tr>

</table>
 </div>


<div style="height:103px;">

</div>


 <div class="openlist">
  <ul id="historyList">
  </ul>
 </div>
   
<?php include("../public/footer.php"); ?>


      <script type="text/javascript">
      
  
  	
$(function () {

	
	//显示默认日期
	var now = new Date();



  
    $("#dateData").val(now.getFullYear()+"-"+((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1)+"-"+(now.getDate()<10?"0":"")+now.getDate());




	//提取记录

    getHistoryData('200','');


});
//搜索


function Search() {
	
	getHistoryData('200', $("#dateData").val());
	return false;
}
//刷新
function refresh(){

	getHistoryData('200','');

}

</script> 	

</body>
</html>