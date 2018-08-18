<?php
include("../conn.php"); 
$ret = array();
$ret['pk10'] = gettopdata(20);
$ret['xyft'] = gettopdata(34);
$ret['cqssc'] = gettopdata(1);
$ret['gdkl10'] = gettopdata(21);
$ret['xync'] = gettopdata(18);
$ret['gd11x5'] = gettopdata(6);
$ret['xjssc'] = gettopdata(35);
$ret['tjssc'] = gettopdata(3);
$ret['jsk3'] = gettopdata(22);
echo json_encode($ret);

function gettopdata($id){
	$mycode = mysql_fetch_array(mysql_query("select dat_expect,dat_codes from lot_data where `dat_type`=$id order by dat_open_time desc limit 1"));
	return array(
	   'periodNumber'=>qqh($mycode[0]),
	   'awardNumbers'=>qcode($mycode[1],$id)
	);
	
}
function qqh($str){
	$date = date("Ymd",time());
	$str = str_replace($date,"",$str);
	return $str;
}
function qcode($str,$id){
	if($id==20 || $id==34){
		$str = str_replace("01","1",$str);
		$str = str_replace("02","2",$str);
		$str = str_replace("03","3",$str);
		$str = str_replace("04","4",$str);
		$str = str_replace("05","5",$str);
		$str = str_replace("06","6",$str);
		$str = str_replace("07","7",$str);
		$str = str_replace("08","8",$str);
		$str = str_replace("09","9",$str);
	}
	return $str;
}
?>