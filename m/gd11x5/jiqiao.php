<?php 
include("../conn.php");
$cid = 48;
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
<title><?=$web_type?>技巧_<?=$webtitle?>手机版</title>
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
       <li><a href="lrtj.php">冷热</a></li>
       <li><a href="jiqiao.php" class="cur">技巧</a></li>
       
     </ul>


</div>
<div style="height:40px;"></div>
<div class="list">
    
        <ul>
		<?php
		$query = mysql_query("select * from ot_document where category_id=$cid order by update_time desc limit 15");
		while($row = mysql_fetch_array($query)){?>
        <li>
		<span class="list-arrow"></span>
		<a href="detail.php?cid=<?=$cid?>&id=<?=$row['id']?>" title="<?=$row['title']?>"><?=$row['title']?></a>
		</li>
		<?php } ?>
        </ul>
        </div>

<?php include("../public/footer.php"); ?>
</body>
</html>