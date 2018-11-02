<?php
header("Content-type:text/html;charset=utf-8"); 
const ONETHINK_ADDON_PATH = './Addons/';
define('APP_PATH',str_replace("\m","",dirname(__FILE__)));
$self = $_SERVER['PHP_SELF'];
if(strpos($self,"xyft")){
    $name = 34;
	$web_type = "幸运飞艇";
}elseif(strpos($self,"cqssc")){
    $name = 1;
	$web_type = "重庆时时彩";
}elseif(strpos($self,"gdkl10")){
    $name = 21;
	$web_type = "广东快乐十分";
}elseif(strpos($self,"jssc")){
	$web_type = "極速賽車";
    $name = 39;
}elseif(strpos($self,"jsssc")){
	$web_type = "極速时时彩";
    $name = 40;
}elseif(strpos($self,"gd11x5")){
    $name = 6;
	$web_type = "广东11选5";
}elseif(strpos($self,"jsk3")){
    $name = 22;
	$web_type = "江苏快三";
}elseif(strpos($self,"bjft")){
    $name = 42;
    $web_type = "北京番摊";
}elseif(strpos($self,"cqft")){
    $name = 41;
    $web_type = "重庆番摊";
}elseif(strpos($self,"pc28")){
    $name = 43;
    $web_type = "加拿大28";
}elseif(strpos($self,"txffc")){
    $name = 44;
    $web_type = "腾讯分分彩";
}elseif(strpos($self,"tcpk10")){
    $web_type = "极速赛车";
    $name = 46;
}elseif(strpos($self,"tcssc")){
    $web_type = "极速时时彩";
    $name = 45;
}elseif(strpos($self,"sfpk10")){
    $web_type = "三分赛车";
    $name = 47;
}elseif(strpos($self,"sfssc")){
    $web_type = "三分时时彩";
    $name = 48;
}else{
    $name = 20;
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