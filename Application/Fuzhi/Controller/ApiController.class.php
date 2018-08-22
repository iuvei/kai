<?php
namespace Fuzhi\Controller;

use Think\Controller;
use Think\Page;

class ApiController extends Controller{
    private $prename = 'lot_';
    public $types;

    /**
     * @return string
     * 彩种接口
     */
    public function index(){
       // echo 1111;exit;
        if(empty($_POST)){
            $arr = array(
                'code'=>false,
                'msg'=>'参数为空',
            );
            echo json_encode($arr,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);exit;
        }
        file_put_contents('lgc1.log',date("Y-m-d H:i:s").var_export($_POST,true)."</br>",FILE_APPEND);//日志
        $data = $_POST;
        if(empty($data['name'])){
            $arr = array(
                'code'=>false,
                'msg'=>'彩种为空',
            );
            echo json_encode($arr,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);exit;
        }
        C('DB_PREFIX','lot_');
        $name = $this->caizhong($data['name']);
        file_put_contents('lgc5.log',date("Y-m-d H:i:s").var_export($name,true)."</br>",FILE_APPEND);//日志
        $res = M('type')->where(array('name'=>$name))->find();

        file_put_contents('lgc.log',date("Y-m-d H:i:s").var_export($res,true)."</br>",FILE_APPEND);

        if(empty($res)){
            $arr = array(
                'code'=>false,
                'msg'=>'没有这个彩种',
            );
            echo json_encode($arr,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);exit;
        }
        $where = array(
            'dat_type'=>$res['id'],
            'dat_open_time'=>time(),
            'dat_expect'=>$data['issue'],
            'dat_codes'=>$data['code'],
        );
        C('DB_PREFIX','lot_');
        $res = M('data')->add($where);

        file_put_contents('lgc2.log',date("Y-m-d H:i:s").var_export($res,true)."</br>",FILE_APPEND);
        if($res < 1){
            $arr = array(
                'code'=>false,
                'msg'=>'系统有误',
            );
            echo json_encode($arr,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);exit;
        }

        $arr = array(
            'code'=>true,
            'msg'=>'成功',
        );
        echo json_encode($arr,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);exit;
    }


    public function test(){
        // echo 1111;exit;
        if(empty($_GET)){
            $arr = array(
                'code'=>false,
                'msg'=>'参数为空',
            );
            echo json_encode($arr,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);exit;
        }

        file_put_contents('lgc1.log',date("Y-m-d H:i:s").var_export($_GET,true)."</br>",FILE_APPEND);//日志
        $data = $_GET;
        if(empty($data['name'])){
            $arr = array(
                'code'=>false,
                'msg'=>'彩种为空',
            );
            echo json_encode($arr,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);exit;
        }
        C('DB_PREFIX','lot_');
        $name = $this->caizhong($data['name']);
        file_put_contents('lgc5.log',date("Y-m-d H:i:s").var_export($name,true)."</br>",FILE_APPEND);//日志
        $res = M('type')->where(array('name'=>$name))->find();

        file_put_contents('lgc.log',date("Y-m-d H:i:s").var_export($res,true)."</br>",FILE_APPEND);

        if(empty($res)){
            $arr = array(
                'code'=>false,
                'msg'=>'没有这个彩种',
            );
            echo json_encode($arr,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);exit;
        }
        $where = array(
            'dat_type'=>$res['id'],
            'dat_open_time'=>time(),
            'dat_expect'=>$data['issue'],
            'dat_codes'=>$data['code'],
        );
        C('DB_PREFIX','lot_');
        $res = M('data')->add($where);

        file_put_contents('lgc2.log',date("Y-m-d H:i:s").var_export($res,true)."</br>",FILE_APPEND);
        if($res < 1){
            $arr = array(
                'code'=>false,
                'msg'=>'系统有误',
            );
            echo json_encode($arr,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);exit;
        }

        $arr = array(
            'code'=>true,
            'msg'=>'成功',
        );
        echo json_encode($arr,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);exit;
    }

    /**
     * 视频接口
     */
    public function vodie(){
        C('DB_PREFIX','lot_');
        if(empty(I('get.gamekey'))){
            $arr = array(
                'code'=>false,
                'msg'=>'参数为空',
            );
            return json_encode($arr,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        }

        $data = I('get.gamekey');
        $data = $this->caizhong($data);
      //  print_r($data);exit;
        if($data == 404){
            $arr = array(
                'code'=>false,
                'msg'=>'参数有误',
            );
            return json_encode($arr,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        }

        $where = array(
            'name'=>$data
        );

        $info = M('type')->where($where)->find();
        if(empty($info)){
            $arr = array(
                'code'=>false,
                'msg'=>'没有这个彩种',
            );
            return json_encode($arr,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        }
        $data = array();
       // $db_name = 'th_game_queue_'.$_GET['gamekey'];

        $module = M();
        $sql = "select actionNo, actionTime from lot_data_time where type={$info['id']} and actionTime<='%s' order by actionTime desc limit 1";
        $date = date('H:i:s');
        $res = $module->query($sql, $date);
        $res=$res[0];
        $where2 = array(
            'dat_type'=>$info['id'],
           // 'b.actionNo'=>$res['actionNo']-1,
        );
        $game =  M('data')->where($where2)->order('dat_open_time desc')->find();
        $data['errorcode'] = 0;
        $data['errormsg'] = '';
        $data['present']['now']=date('Y-m-d H:i:s');
        $data['present']['expect']=$res['actionNo'];
        $data['present']['start_buytime']=$res['stopTime'];
        $data['present']['start_remaining']=strtotime($res['stopTime']) - time();
        $data['present']['start_buytimestamp']=date('Y-m-d ').$res['stopTime'];
        $data['present']['stop_buytime']=$res['stopTime'];
        $data['present']['stop_remaining']=strtotime($res['stopTime']) - time();
        $data['present']['stop_buytimestamp']=date('Y-m-d ').$res['stopTime'];
        $data['present']['opentime']=$res['actionTime'];
        $data['present']['opentime_remaining']=strtotime($res['actionTime']) - time();
        $data['present']['opentimestamp']=date('Y-m-d ').$res['actionTime'];
        $data['present']['status']=1;//因为暂时没有此字段 $game['status'];
        $data['last_opencode']['expect']=$game['dat_expect'];
        $data['last_opencode']['opencode']=$game['dat_codes'];
        $data['last_opencode']['opentime']=date('Y-m-d H:i:s',$game['dat_open_time']);
        $data['last_opencode']['opentimestamp']=$game['dat_open_time'];
       // $res = $this->getAwardTime($info['id']);
        echo json_encode($data,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);exit;
     //   print_r($data);exit;

    }
    private function caizhong($data){
        switch ($data){
            case "bjpk10":
                return "pk10-bj";
                break;
            case "pk10":
                return "pk10-bj";
                break;
            case "cqssc":
                return "ssc-cq";
                break;
            case "jssc":
                return "jssc";
                break;
            case "jsssc":
                return "jsssc";
                break;
            case "jsk3":
                return "jsk3";
                break;
            case "xyft":
                return "mlaft";
                break;
            case "gdkl10":
                return "gdkl10";
                break;
            case "gd11x5":
                return "syxw-gd";
                break;
            default:
                return "404";

        }
    }


    private function getAwardTime( $lotType)
    {
        $module = M();
        $retData = array();
        $MillisecondTime = getMillisecond();
        $kjHao = null;

            $kjHao = $module->query("select dat_codes,replace(dat_expect,'-','') dat_expect, dat_open_time from {$this->prename}data where dat_type={$lotType} order by dat_expect desc limit 1");
            //print_r($kjHao);exit;
            //echo $module->getLastSql();
            $time = $kjHao[0]['dat_open_time'];
            $currentNo = $this->getGameCurrentNo($lotType, $module, $time);
            //var_dump($currentNo);die;
            $nextNo = $this->getGameNextNo($lotType, $module, $time);

        $pan = null;
        if ($kjHao === false || count($kjHao) == 0) {
            $kjHao = null;
        } else {
            $data = explode(',', $kjHao[0]['dat_codes']);
            $pos = strpos(end($data), '+');
            if ($pos >= 0) {
                $pan = substr(end($data), $pos + 1);
            }
            $kjHao = '';
            foreach ($data as $value) {
                $t = (int)$value;
                if ($lotType == 23) {
                    $t = $t > 9 ? $t : '0' . $t;
                }
                $kjHao = $kjHao . $t . ',';
            }
            if ($kjHao != '') {
                $kjHao = substr($kjHao, 0, strlen($kjHao) - 1);
            }
        }
        $retData["time"] = $MillisecondTime;
         //print_r($currentNo);exit;
        $retData["firstPeriod"] = $currentNo["actionNo"] - $currentNo["actionNoIndex"];
        $retData["apiVersion"] = 1;
        $retData["last_opencode"]["opentime"] = $currentNo["actionTime"];
        if ($lotType == 1 || $lotType == 21 || $lotType == 3 || $lotType == 18 || $lotType == 22 || $lotType == 24 || $lotType == 35 || $lotType == 6 || $lotType == 34) {
            $retData["last_opencode"]["expect"] = $currentNo["actionNoIndex"];
        } else {
            $retData["last_opencode"]["expect"] = $currentNo["actionNo"];
        }
        //print_r($currentNo["actionNo"]);exit;
        $retData["last_opencode"]["fullPeriodNumber"] = $currentNo["actionNo"];
        $retData["last_opencode"]["periodNumberStr"] = null;
        $retData["last_opencode"]["awardTimeInterval"] = 0;
        $retData["last_opencode"]["opencode"] = $kjHao;
        $retData["last_opencode"]["delayTimeInterval"] = null;
        $retData["last_opencode"]["pan"] = $pan;
        $retData["last_opencode"]["isEnd"] = null;
        $retData["last_opencode"]["nextMinuteInterval"] = null;
        $retData["present"]["opentimestamp"] = $nextNo["actionTime"];
        if ($lotType == 1 || $lotType == 21 || $lotType == 3 || $lotType == 18 || $lotType == 22 || $lotType == 24 || $lotType == 35 || $lotType == 6 || $lotType == 34) {
            $retData["present"]["expect"] = $nextNo["actionNoIndex"];
        } else {
            $retData["present"]["expect"] = $nextNo["actionNo"];
        }
        $retData["present"]["fullPeriodNumber"] = 0;
        $retData["present"]["periodNumberStr"] = "{$nextNo["actionNo"]}";
        $retData["present"]["opentime_remaining"] = strtotime($nextNo["actionTime"]) * 1000 - $MillisecondTime;
        $retData["present"]["opentime"] = strtotime($nextNo["actionTime"]) * 1000 - $MillisecondTime;
        $retData["present"]["awardNumbers"] = null;
      //  $retData["present"]["opentime_remaining"] = null;
        $retData["present"]["pan"] = null;
        $retData["present"]["isEnd"] = null;
        $retData["present"]["nextMinuteInterval"] = null;
        $ret = json_encode($retData);
        return $ret;
    }


    public  function getGameNextNo($type, $module, $time)
    {
        $type = intval($type);
        $types = $this->getTypes($module);
        $kjTime = $types[$type]["data_ftime"];
        $atime = date('H:i:s', $time + $kjTime);
        $sql = "select actionNo, actionTime from {$this->prename}data_time where type={$type} and actionTime>'%s' order by actionTime limit 1";
        $return = $module->query($sql, $atime);
        if (!$return) {
            $sql = "select actionNo, actionTime from {$this->prename}data_time where type={$type} order by actionTime limit 1";
            $return = $module->query($sql);
            $time = $time + 24 * 3600;
        }
        $return = $return[0];
        $return['actionNoIndex'] = $return['actionNo'];
        if (($fun = $types[$type]['onGetNoed']) && method_exists($this, $fun)) {
            $this->{$fun}($return['actionNo'], $return['actionTime'], $time);
        }
        return $return;
    }

    public function getTypes($module)
    {
        if ($this->types) {
            return $this->types;
        }
        $sql = "select * from {$this->prename}type where isDelete=0 order by sort asc";
        $return = $module->query($sql);
        $data = array();
        if ($return) {
            foreach ($return as $var) {
                $data[$var['id']] = $var;
            }
        }
        return $this->types = $data;
    }

    public function getGameCurrentNo($type, $module, $time)
    {
        $type = intval($type);
        $types = $this->getTypes($module);

        $kjTime = $types[$type]["data_ftime"];
        $atime = date('H:i:s', $time + $kjTime);

        $sql = "select actionNo, actionTime from {$this->prename}data_time where type={$type} and actionTime<='%s' order by actionTime desc limit 1";

        $return = $module->query($sql, $atime);

        //var_dump($return);die;
        if (!$return) {
            $sql = "select actionNo, actionTime from {$this->prename}data_time where type={$type} order by actionTime desc limit 1";
            $return = $module->query($sql);

            $time = $time - 24 * 3600;
        }
        $return = $return[0];
        $return['actionNoIndex'] = $return['actionNo'];
        if (($fun = $types[$type]['onGetNoed']) && method_exists($this, $fun)) {
            $this->{$fun}($return['actionNo'], $return['actionTime'], $time);
        }

        return $return;
    }

    /**
     * 冷热分析
     */
    public function leng_re(){
       if(empty($_GET)){
           $arr = array(
               'code'=>false,
               'msg'=>'参数为空',
           );
           echo json_encode($arr,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);exit;
       }
       $data = $_GET;
       if(empty($data['id'])){
           $arr = array(
               'code'=>false,
               'msg'=>'参数为空',
           );
           echo json_encode($arr,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);exit;
       }
        $module = M();
        $sql = "select dat_expect, dat_codes from lot_data where dat_type= {$data['id']} order by dat_open_time desc limit 20";
        $return = $module->query($sql);
        $info = array();
        foreach($return as $k => $v){
            $info[$k] = explode(',',$v['dat_codes']);
        }
        $code = array();
        $num = '';
        switch ($data['ball']){
            case '1':
                $num = 0;
                break;
            case '2':
                $num = 1;
                break;
            case '3':
                $num = 2;
                break;
            case '4':
                $num = 3;
                break;
            case '5':
                $num = 4;
                break;
            case '6':
                $num = 5;
                break;
            case '7':
                $num = 6;
                break;
            case '8':
                $num = 7;
                break;
            case '9':
                $num = 8;
                break;
            case '10':
                $num = 9;
                break;
        }

        //print_r($info);exit;
            foreach($info as $t => $v ){
                if($data['id'] ==1 || $data['id'] == 40){
                    $code[$t] = $v[$num];
                }else{
                    $code[$t] = preg_replace('/^0+/','',$v[$num]);
                }

               // $code['issue'][$t] = $return[$k]['dat_expect'];
            }
            $arr = array_count_values($code);
//      /  print_r($code);exit;
        $code = implode(',',$code);
        switch ($data['id']){
            case 1:
                $num = 10;
                break;
            case 6:
                $num = 11;
                break;
            case 20:
                $num = 10;
                break;
            case 21:
                $num = 20;
                break;
            case 22:
                $num = 6;
                break;
            case 34:
                $num = 10;
                break;
            case 39:
                $num = 10;
                break;
            case 40:
                $num = 10;
                break;

        }

        for($i=0;$i<$num;$i++){
            if($data['id'] == 1 || $data['id'] == 40){
                if($arr[$i] == null){
                    $code_info[$i][1] = 0;
                    $code_info[$i][0] = $i;
                }else{
                    $code_info[$i][1] = $arr[$i];
                    $code_info[$i][0] = $i;
                }
            }else{
                if($arr[$i+1] == null){
                    $code_info[$i][1] = 0;
                    $code_info[$i][0] = $i+1;
                }else{
                    $code_info[$i][1] = $arr[$i+1];
                    $code_info[$i][0] = $i+1;
                }
            }

        }
        echo json_encode($code_info,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);exit;

    }


    /**
     * 长龙
     */
    public function changlong(){
        if(empty($_GET)){
            $arr = array(
                'code'=>false,
                'msg'=>'参数为空',
            );
            echo json_encode($arr,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);exit;
        }
        $data = $_GET;
        if(empty($data['id'])){
            $arr = array(
                'code'=>false,
                'msg'=>'参数为空',
            );
            echo json_encode($arr,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);exit;
        }
        C('DB_PREFIX','lot_');
        $res = M('data')->where(array('dat_type'=>$data['id']))->order('dat_open_time desc')->limit(50)->select();
        $info = array();
        foreach($res as $k => $v){
            $info[$k] = explode(',',$v['dat_codes']);
        }
        $lh = array();
        $lh_2 = array();
        $lh_3 = array();
        $lh_4 = array();
        $lh_5 = array();
       foreach($info as $n_k => $n_v){
            if($n_v[0]>$n_v[9] ){
               $lh[$n_k] = '龙';
           }else if($n_v[0]< $n_v[9] ){
               $lh[$n_k] = '虎';
           }else{
               $lh[$n_k] = '和';
           }
           if($n_v[1]>$n_v[8] ){
               $lh_2[$n_k]= '龙';
           }else if($n_v[1]< $n_v[8] ){
               $lh_2[$n_k] = '虎';
           }else{
               $lh_2[$n_k]= '和';
           }
           if($n_v[2]>$n_v[7] ){
               $lh_3[$n_k] = '龙';
           }else if($n_v[2]< $n_v[7] ){
               $lh_3[$n_k]= '虎';
           }else{
               $lh_3[$n_k] = '和';
           }
           if($n_v[3]>$n_v[6] ){
               $lh_4[$n_k] = '龙';
           }else if($n_v[3]< $n_v[6] ){
               $lh_4[$n_k] = '虎';
           }else{
               $lh_4[$n_k] = '和';
           }
           if($n_v[4]>$n_v[5] ){
               $lh_5[$n_k] = '龙';
           }else if($n_v[4]< $n_v[9] ){
               $lh_5[$n_k] = '虎';
           }else{
               $lh_5[$n_k] = '和';
           }
       }
        $lh_6[0]['type'] = '冠军';
        $lh_6[0]['data'][0]['name'] =substr_count(implode($lh,','),'龙') ;
        $lh_6[0]['data'][0]['title'] ='龙' ;
        $lh_6[0]['data'][1]['name'] =substr_count(implode($lh,','),'虎') ;
        $lh_6[0]['data'][1]['title'] ='虎' ;
        $lh_6[0]['data'][2]['name'] =substr_count(implode($lh,','),'和') ;
        $lh_6[0]['data'][2]['title'] ='和' ;

        $lh_6[1]['type'] = '亚军';
        $lh_6[1]['data'][0]['name'] =substr_count(implode($lh_2,','),'龙') ;
        $lh_6[1]['data'][0]['title'] ='龙' ;
        $lh_6[1]['data'][1]['name'] =substr_count(implode($lh_2,','),'虎') ;
        $lh_6[1]['data'][1]['title'] ='虎' ;
        $lh_6[1]['data'][2]['name'] =substr_count(implode($lh_2,','),'和') ;
        $lh_6[1]['data'][2]['title'] ='和' ;

        $lh_6[2]['type'] = '季军';
        $lh_6[2]['data'][0]['name'] =substr_count(implode($lh_3,','),'龙') ;
        $lh_6[2]['data'][0]['title'] ='龙' ;
        $lh_6[2]['data'][1]['name'] =substr_count(implode($lh_3,','),'虎') ;
        $lh_6[2]['data'][1]['title'] ='虎' ;
        $lh_6[2]['data'][2]['name'] =substr_count(implode($lh_3,','),'和') ;
        $lh_6[2]['data'][2]['title'] ='和' ;


        $lh_6[3]['type'] = '第四名';
        $lh_6[3]['data'][0]['name'] =substr_count(implode($lh_4,','),'龙') ;
        $lh_6[3]['data'][0]['title'] ='龙' ;
        $lh_6[3]['data'][1]['name'] =substr_count(implode($lh_4,','),'虎') ;
        $lh_6[3]['data'][1]['title'] ='虎' ;
        $lh_6[3]['data'][2]['name'] =substr_count(implode($lh_4,','),'和') ;
        $lh_6[3]['data'][2]['title'] ='和' ;

        $lh_6[4]['type'] = '第五名';
        $lh_6[4]['data'][0]['name'] =substr_count(implode($lh_5,','),'龙') ;
        $lh_6[4]['data'][0]['title'] ='龙' ;
        $lh_6[4]['data'][1]['name'] =substr_count(implode($lh_5,','),'虎') ;
        $lh_6[4]['data'][1]['title'] ='虎' ;
        $lh_6[4]['data'][2]['name'] =substr_count(implode($lh_5,','),'和') ;
        $lh_6[4]['data'][2]['title'] ='和' ;

        //print_r($lh_6);
        echo json_encode($lh_6,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);exit;
    }

}