<?php
include("../conn.php"); 
$typeid = (int)$_GET['type'];
$ball = $_GET['ball']-1;
$count = (int)$_GET['count'];
$query = mysql_query("select dat_expect,dat_codes from lot_data where `dat_type`=$typeid order by dat_open_time desc limit $count");
$array = array();
while($row = mysql_fetch_assoc($query)){
	$exp = explode(",",$row['dat_codes']);
	$tarr = array(
	0=>substr($row['dat_expect'],-2),
	1=>$exp[$ball],
	2=>"<article class='infos'>
			<table><tr><td class='no'>".$row['dat_expect']."期</td><td><div class='sortDown'>
				<div class='p'><div class='hm no".$exp[0]."'></div></div>
				<div class='p'><div class='hm no".$exp[1]."'></div></div>
				<div class='p'><div class='hm no".$exp[2]."'></div></div>
				<div class='p'><div class='hm no".$exp[3]."'></div></div>
				<div class='p'><div class='hm no".$exp[4]."'></div></div>
				<div class='p'><div class='hm no".$exp[5]."'></div></div>
				<div class='p'><div class='hm no".$exp[6]."'></div></div>
				<div class='p'><div class='hm no".$exp[7]."'></div></div>
				<div class='p'><div class='hm no".$exp[8]."'></div></div>
				<div class='p'><div class='hm no".$exp[9]."'></div></div>
				</div></td></tr></table>
			</article>"
	);
	$array[]=$tarr;
    
}
$array = array_reverse($array);
//var_dump($array);
echo json_encode($array);
?>