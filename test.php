<!---->
<!--    --><?php
//    date_default_timezone_set('PRC');
//
//    $date = [];
//    $mysqli = new mysqli('localhost', 'tckai168.com', '0Rs1M3LxCEBp69jF', 'tckai168.com');
//    $a =0;
//
//    $sql = "select * from `lot_data_time` where `type`='20'";
//
//    $result = $mysqli->query($sql);
//
//
//    while ($row=$result->fetch_assoc())
//    {
//
//        $actionTime = (strtotime($row['actionTime'])+45);
//
//        $arr["id"] = $row['id'];
//        $arr["type"] = $row["type"];
//        $arr['actionTime'] = date('H:i:s',$actionTime);
//       // $arr['stopTime'] = date('H:i:s',$stopTime);
//        $data[]= $arr;
//
//    }
////    $a = $data[0]['actionTime'] ;
////    $b = $data[0]['id'];
//////    "update lot_data_time t set t.NAME = 'mike', t.SEX = '1' where t.ID = '2';";
////
////    print_r($sql);
////    $result = $mysqli->query($sql);
//
//    foreach ($data as $k => $V)
//    {
//
//        $statime = $V['actionTime'];
////        $stotime = $V['stopTime'];
////        $actionNo = $V['actionNo'];
//        $id = $V["id"];
//        $sql="update lot_data_time set actionTime = "."\"$statime\""." where id ="."\"$id\"";
//        $result = $mysqli->query($sql);
//
//
//
//    }

//    print_r($result.'----');die;

    /*$sql = 'select open_time,close_time from `th_game_queue_sfssc` ';*/

    /*print_r($sql);exit;*/
    /*$result =  mysqli_query($mysqli,$sql);
    $data = [];
    while ($row=$result->fetch_assoc())
    {
        $arr['open_time'] = date('H:i:s',$row['open_time']);
        $arr['close_time'] = date('H:i:s',$row['close_time']);
        $data[]= $arr;
    }*/

   /* $close_time='';
    $open_time='';
    foreach ($data as $k=>$v ){
        $close_time = $v['close_time'];
        $open_time = $v['open_time'];
        $sql = "insert into lot_data_time (type,actionTime,actionNo,stopTime) values (47,'$open_time',($k+1),'$close_time')";
        //print_r($sql);exit;
//        $sql="update ot_document set `type`=43 and actionTime='$data_a' and actionNo= $a and stopTime ='$data_s' where category_id=$cid order by update_time desc limit 15";
        $result = $mysqli->query($sql);
        print_r($result.'----');
    }
    print_r($date);
    exit;*/


    /*$result = $mysqli->query($sql);
    $row = $result->fetch_assoc();
    while( $row = $result->fetch_assoc()) {
        '<li>
            <span class="list-arrow"></span>
            <a href="detail.php?cid=<?=$cid?>&id=<?=$row[\'id\']?>" title="<?=$row[\'title\']?>"><?=$row[\'title\']?></a>
        </li>';
    }*/

