<?php
    date_default_timezone_set('PRC');

    $date = [];
    $mysqli = new mysqli('localhost', 'tckai168.com', '0Rs1M3LxCEBp69jF', 'tckai168.com');

//    $time = strtotime('23:09:15');
//    $t = 180;
//    $a = $data[0]['actionTime'] ;
//    $b = $data[0]['id'];
////    "update lot_data_time t set t.NAME = 'mike', t.SEX = '1' where t.ID = '2';";
//
//    $result = $mysqli->query($sql);
//
//    for ($i=0;$i<98;$i++)
//    {
//        if($time <= strtotime('2018-11-12 04:00:00')){
//            $tt = $i*$t;
//            $ttt = date("H:i:s",$time+$tt);
//            $tttt =  date("H:i:s",$time+$tt+180);
//            $k = $i+1+343;
//            print_r($tt.'----');
//            print_r($time+$tt);
//            //$statime = $V['actionTime'];
//        $stotime = $V['stopTime'];
//        $actionNo = $V['actionNo'];
//            $id = $V["id"];
//            $sql="insert into lot_data_time (type,actionNo,actionTime,stopTime) values ('46',$k,\"$ttt\",\"$tttt\")";
//            $result = $mysqli->query($sql);
//            print_r($result.'----');
//        }
//
//
//    }

//    print_r($result.'----');die;

$sql = 'select open_time,close_time from `th_game_queue_bjpk10` ';


$result =  mysqli_query($mysqli,$sql);
$data = [];
while ($row=$result->fetch_assoc())
{
    $arr['open_time'] = date('H:i:s',$row['open_time']);
    $arr['close_time'] = date('H:i:s',$row['close_time']);
    $data[]= $arr;
}

print_r($data);die;
 $close_time='';
 $open_time='';
 foreach ($data as $k=>$v ){
//     if($k>=762){
         $close_time = $v['close_time'];
         $open_time = $v['open_time'];
         $sql = "insert into lot_data_time (type,actionTime,actionNo,stopTime) values (42,'$open_time',($k+1),'$close_time')";
         $result = $mysqli->query($sql);
         print_r($result.'----');
//     }

     //print_r($sql);exit;
//        $sql="update ot_document set `type`=43 and actionTime='$data_a' and actionNo= $a and stopTime ='$data_s' where category_id=$cid order by update_time desc limit 15";


 }
 print_r($date);
 exit;


/*$result = $mysqli->query($sql);
$row = $result->fetch_assoc();
while( $row = $result->fetch_assoc()) {
    '<li>
        <span class="list-arrow"></span>
        <a href="detail.php?cid=<?=$cid?>&id=<?=$row[\'id\']?>" title="<?=$row[\'title\']?>"><?=$row[\'title\']?></a>
    </li>';
}*/