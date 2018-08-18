<?php
header("Content-type:text/html;charset=utf-8"); 
const ONETHINK_ADDON_PATH = './Addons/';
define('APP_PATH',str_replace("\m","",dirname(__FILE__)));
$self = $_SERVER['PHP_SELF'];
if(strpos($self,"xyft")){
	$web_type = "幸运飞艇";
}elseif(strpos($self,"cqssc")){
	$web_type = "重庆时时彩";
}elseif(strpos($self,"gdkl10")){
	$web_type = "广东快乐十分";
}elseif(strpos($self,"jssc")){
	$web_type = "極速賽車";
}elseif(strpos($self,"jsssc")){
	$web_type = "極速时时彩";
}elseif(strpos($self,"tjssc")){
	$web_type = "天津时时彩";
}elseif(strpos($self,"gd11x5")){
	$web_type = "广东11选5";
}elseif(strpos($self,"jsk3")){
	$web_type = "江苏快三";
}else{
	$web_type = "北京赛车PK10";
}
$dbcon = include(APP_PATH."/Application/Common/Conf/config.php");
$con = mysqli_connect($dbcon['DB_HOST'],$dbcon['DB_USER'],$dbcon['DB_PWD']);
mysqli_select_db($con, $dbcon['DB_NAME']);
mysqli_query($con, "set names 'utf8'");
$webtitle = mysqli_fetch_array(mysqli_query($con, "select * from ot_config where name='WEB_SITE_TITLE'"));
$webtitle = $webtitle['value'];

$webkey = mysqli_fetch_array(mysqli_query($con, "select * from ot_config where name='WEB_SITE_KEYWORD'"));
$webkey = $webkey['value'];

$webdes = mysqli_fetch_array(mysqli_query($con, "select * from ot_config where name='WEB_SITE_DESCRIPTION'"));
$webdes = $webdes['value'];

$qqun = mysqli_fetch_array(mysqli_query($con, "select * from ot_config where name='WEB_SITE_QQ_GROUP_URL'"));
$qqun = $qqun['value'];
?>