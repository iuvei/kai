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
}elseif(strpos($self,"js11x5")){
    $name = 58;
	$web_type = "极速11选5";
}elseif(strpos($self,"jsk3")){
    $name = 22;
	$web_type = "江苏快3";
}elseif(strpos($self,"gxk3")){
    $name = 51;
	$web_type = "广西快3";
}elseif(strpos($self,"jlk3")){
    $name = 50;
	$web_type = "吉林快3";
}elseif(strpos($self,"bjft")){
    $name = 42;
    $web_type = "北京番摊";
}elseif(strpos($self,"cqft")){
    $name = 41;
    $web_type = "重庆番摊";
}/*elseif(strpos($self,"pc28")){
    $name = 43;
    $web_type = "加拿大28";
}*/elseif(strpos($self,"txffc")){
    $name = 44;
    $web_type = "幸运分分彩";
}elseif(strpos($self,"tcpk10")){
    $web_type = "TC极速赛车";
    $name = 46;
}elseif(strpos($self,"tcssc")){
    $web_type = "TC分分彩";
    $name = 45;
}elseif(strpos($self,"sfpk10")){
    $web_type = "TC三分赛车";
    $name = 47;
}elseif(strpos($self,"sfpk10ft")){
    $web_type = "三分赛车番摊";
    $name = 52;
}elseif(strpos($self,"ftft")){
    $web_type = "飞艇番摊";
    $name = 34;
}elseif(strpos($self,"jisuk3")){
    $web_type = "极速快3";
    $name = 54;
}elseif(strpos($self,"js28")){
    $web_type = "极速28";
    $name = 55;
}elseif(strpos($self,"sfssc")){
    $web_type = "TC三分彩";
    $name = 48;
}elseif(strpos($self,"sfcft")){
    $web_type = "三分彩番摊";
    $name = 48;
}elseif(strpos($self,"pcdd")){
    $web_type = "PC蛋蛋";
    $name = 49;
}elseif(strpos($self,"jnd28")){
    $web_type = "加拿大28";
    $name = 55;
}elseif(strpos($self,"wfpk10")){
    $web_type = "五分PK10";
    $name = 62;
}elseif(strpos($self,"wfssc")){
    $web_type = "五分时时彩";
    $name = 61;
}else{
    $name = 20;
	$web_type = "北京PK10";
}
if(strpos($self,"sfpk10ft")){
    $web_type = "三分赛车番摊";
};
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
