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
<title>重庆时时彩长龙统计_<?=$webtitle?>手机版</title>
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
       <li><a href="cltj.php" class="cur">长龙</a></li>
       <li><a href="hmzs.php">走势</a></li>
       <li><a href="lrtj.php">冷热</a></li>
       <li><a href="jiqiao.php">技巧</a></li>
       
     </ul>


</div>
<div style="height:40px;"></div>

<table class="lot-table">
			<thead>
					<tr class="head">
					
				  <td>长龙连开统计</td>
              

				  </tr>
				  </thead>
				<tbody id="changlong">
				<tr>
					<td>
						<img src="../style/images/loading2.gif">					</td>
				<tr>
				</tbody>
</table>


   
<?php include("../public/footer.php"); ?>

 <script type="text/javascript">
 $(function () {
	 changLong();
 });
 function changLong() {
	 layer.open({type: 2,time: 1});
     $.get("ajax_changlong.php", {}, function (data) {
     	if(data){
     		var html = '';
     		 for(var o in data){  
     		        html += '<tr><td>'+data[o].title+" "+data[o].num+' 期</td></tr>';
     		      }  
     	}
     	$("#changlong").html(html);
     	
     },"json");
 }
			</script> 
</body>
</html>