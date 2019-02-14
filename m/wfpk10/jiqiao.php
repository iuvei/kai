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

<?php include("../public/pk10Head.php"); ?>
<?php include("../public/head3.php"); ?>



<div class="list">
    
        <ul>
		<?php
//		$query = mysql_query("select * from ot_document where category_id=$cid order by update_time desc limit 15");
//		while($row = mysql_fetch_array($query)){
        $mysqli = new mysqli('localhost', 'tckai168.com', '0Rs1M3LxCEBp69jF', 'tckai168.com');
        $sql="select * from ot_document where category_id=$cid order by update_time desc limit 15";
        $result = $mysqli->query($sql);
        $row = $result->fetch_assoc();
        while( $row = $result->fetch_assoc()){?>
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