<?php
namespace Fuzhi\Controller;

use Think\Controller;
use Think\Exception;
use Think\Page;
date_default_timezone_set('PRC');

class ApiController extends Controller{
    private $prename = 'lot_';
    public $types;

    /**
     * @return string
     * 彩种接口
     */
    public function index(){
        $data = $_POST;

        $jsonStr = json_encode($data);
        $payLogFile = 'text.txt';
        $newLog ='log_time:'.date('Y-m-d H:i:s').$jsonStr;
        file_put_contents($payLogFile, $newLog.PHP_EOL, FILE_APPEND);
        if(empty($data)){
            $arr = array(
                'code'=>false,
                'msg'=>'参数为空',
            );
            echo json_encode($arr,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);exit;
        }
        file_put_contents('lgc1.log',date("Y-m-d H:i:s").var_export($data,true)."</br>",FILE_APPEND);//日志

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


        $getData['dat_type'] = $res['id'];
        $getData['dat_expect'] = $data['issue'];

        $response = M('data')->where($getData)->find();

        if($response)
        {
            $arr = array(
                'code'=>true,
                'msg'=>'数据已存在',
            );
            $jsonStr = json_encode($response);
            $newLog ='log_time:'.date('Y-m-d H:i:s').$jsonStr;
            file_put_contents($payLogFile, $newLog.PHP_EOL, FILE_APPEND);
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


        $payLogFile = 'text.txt';
        $newLog ='log_time:'.date('Y-m-d H:i:s').$res;
        file_put_contents($payLogFile, $newLog.PHP_EOL, FILE_APPEND);


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
        $gamekey = I('get.gamekey');
        if(empty($gamekey)){
            $arr = array(
                'code'=>false,
                'msg'=>'参数为空',
            );
            return json_encode($arr,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        }

        $data = $gamekey;
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
        $sql = "select actionNo, actionTime from lot_data_time where type={$info['id']} and actionTime >='%s' order by actionTime asc limit 1";
        $date = date('H:i:s');
        $res = $module->query($sql, $date);
        $res=$res[0];
        $where2 = array(
            'dat_type'=>$info['id'],
           // 'b.actionNo'=>$res['actionNo']-1,
        );

        $game =  M('data')->where($where2)->order('dat_open_time desc')->find();


    try{
        if($gamekey == 'pc28'){
            if(time() >= strtotime(date('Y-m-d').'19:00:00') && time() < strtotime(date('Y-m-d').'21:00:00')){
                $date = $game['dat_open_time'] + 210;
                $data['present']['now']=date('Y-m-d H:i:s');
                $data['present']['expect']=$game['dat_expect']+1;
                $data['present']['start_buytime']=date('Y-m-d H:i:s',$date);
                $data['present']['start_remaining']=null;
                $data['present']['start_buytimestamp']=date('Y-m-d H:i:s',$date);
                $data['present']['stop_buytime']=date('Y-m-d H:i:s',$date);;
                $data['present']['stop_remaining']=null;
                $data['present']['stop_buytimestamp']=date('Y-m-d H:i:s',$date);
                $data['present']['opentime']=null;
                $data['present']['opentime_remaining']=null;
                $data['present']['opentimestamp']=date('Y-m-d ',$date);
                $data['present']['status']=1;//因为暂时没有此字段 $game['status'];
                $data['last_opencode']['expect']=$game['dat_expect'];
                $data['last_opencode']['opencode']=$game['dat_codes'];
                $data['last_opencode']['opentime']=date('Y-m-d H:i:s',$game['dat_open_time']);
                $data['last_opencode']['opentimestamp']=$game['dat_open_time'];
            }else if(time() >= strtotime(date('Y-m-d').'21:00:00')){
                $date = $game['dat_open_time'] + 210;
                $data['present']['now']=date('Y-m-d H:i:s');
                $data['present']['expect']=$game['dat_expect']+1;
                $data['present']['start_buytime']=date('Y-m-d H:i:s',$date);
                $data['present']['start_remaining']=strtotime($res['stopTime']) - time();
                $data['present']['start_buytimestamp']=date('Y-m-d H:i:s',$date);
                $data['present']['stop_buytime']=date('Y-m-d H:i:s',$date);;
                $data['present']['stop_remaining']=$date- time();
                $data['present']['stop_buytimestamp']=date('Y-m-d H:i:s',$date);
                $data['present']['opentime']=date('Y-m-d H:i:s',$date);;
                $data['present']['opentime_remaining']=$date - time();
                $data['present']['opentimestamp']=date('Y-m-d ',$date);
                $data['present']['status']=1;//因为暂时没有此字段 $game['status'];
            }else{
                $date = $game['dat_open_time'] + 210;
                $data['present']['now']=date('Y-m-d H:i:s');
                $data['present']['expect']=$game['dat_expect']+1;
                $data['present']['start_buytime']=date('Y-m-d H:i:s',$date);
                $data['present']['start_remaining']=strtotime($res['stopTime']) - time();
                $data['present']['start_buytimestamp']=date('Y-m-d H:i:s',$date);
                $data['present']['stop_buytime']=date('Y-m-d H:i:s',$date);;
                $data['present']['stop_remaining']=$date- time();
                $data['present']['stop_buytimestamp']=date('Y-m-d H:i:s',$date);
                $data['present']['opentime']=date('Y-m-d H:i:s',$date);;
                $data['present']['opentime_remaining']=$date - time();
                $data['present']['opentimestamp']=date('Y-m-d ',$date);
                $data['present']['status']=1;//因为暂时没有此字段 $game['status'];

            }
            $dat_codes = explode(',',$game['dat_codes']);
            $code_a = $dat_codes[1] + $dat_codes[4] + $dat_codes[7] + $dat_codes[10] + $dat_codes[13] +$dat_codes[16];
            $code_b = $dat_codes[2] + $dat_codes[5] + $dat_codes[8] + $dat_codes[11] + $dat_codes[14] +$dat_codes[17];
            $code_c = $dat_codes[3] + $dat_codes[6] + $dat_codes[9] + $dat_codes[12] + $dat_codes[15] +$dat_codes[18];
            $code = ($code_a%10).','.($code_b%10).','.($code_c%10);
            $data['last_opencode']['expect']=$game['dat_expect'];
            $data['last_opencode']['opencode']=$code;
            $data['last_opencode']['opentime']=date('Y-m-d H:i:s',$game['dat_open_time']);
            $data['last_opencode']['opentimestamp']=$game['dat_open_time'];

        }else{
            $data['present']['now']=date('Y-m-d H:i:s');
            $data['present']['expect']=$game['dat_expect']+1;
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
        }

        // $res = $this->getAwardTime($info['id']);
        $echos['status'] = true;
        $echos['code'] = 200;
        $echos['msg'] = '获取成功';
        $echos['datas'] = $data;
        $echos['extras'] = time();
        $echos['debug'] = 0;
        echo json_encode($echos,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);exit;
    }catch (\Exception $e){
        $echos['msg'] = '数据异常';
        $echos['code'] = 500;
        $echos['debug'] = 2;
        echo json_encode($echos,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);exit;
    }
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
            case "pc28":
                return "pc28";
                break;
            case "txffc":
                return "txffc";
                break;
            case "tcssc":
                return "tcssc";
                break;
            case "tcpk10":
                return "tcpk10";
                break;
            case "sfpk10":
                return "sfpk10";
                break;
            case "sfssc":
                return "sfssc";
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
            case 46:
                $num = 10;
                break;
            case 47:
                $num = 10;
                break;
            case 48:
                $num = 10;
                break;
            case 41:
                $num = 10;
                break;
            case 43:
                $num = 10;
                break;
            case 44:
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
        $num = array();
       foreach($info as $n_k => $n_v){

           if($data['id'] == 1 || $data['id'] == 40){
               if($n_v[0] == 0){
                $n_v[0] = 10;
               }else if( $n_v[1] == 0 ){
                   $n_v[1] = 10;
               }else if($n_v[2] == 0 ){
                   $n_v[2] = 10;
               }else if($n_v[3] == 0){
                    $n_v[3] = 10;
               }else if( $n_v[4]==0 ){
                   $n_v[4] = 10;
               }
               $num[0][$n_k] =$n_v[0];
               $num[1][$n_k] = $n_v[1];
               $num[2][$n_k] = $n_v[2];
               $num[3][$n_k] = $n_v[3];
               $num[4][$n_k] = $n_v[4];
                $count = $n_v[0]+$n_v[1]+$n_v[2]+$n_v[3]+$n_v[4];
               if ( $count< 23) {
                   $lh_2[0][$n_k] = '小';
               } else {
                   $lh_2[0][$n_k] = '大';
               }
               if ($count % 2 == 0) {
                   $lh_2[1][$n_k] = '双';
               } else {
                   $lh_2[1][$n_k] = '单';
               }
               if ($n_v[0] > $n_v[4]) {
                   $lh[0][$n_k] = '龙';
               } else if ($n_v[0] < $n_v[4]) {
                   $lh[0][$n_k] = '虎';
               } else {
                   $lh[0][$n_k] = '和';
               }

           }else if($data['id'] == 21){
               $num[0][$n_k] = preg_replace('/^0+/', '', $n_v[0]);
               $num[1][$n_k] = preg_replace('/^0+/', '', $n_v[1]);
               $num[2][$n_k] = preg_replace('/^0+/', '', $n_v[2]);
               $num[3][$n_k] = preg_replace('/^0+/', '', $n_v[3]);
               $num[4][$n_k] = preg_replace('/^0+/', '', $n_v[4]);
               $num[5][$n_k] = preg_replace('/^0+/', '', $n_v[5]);
               $num[6][$n_k] = preg_replace('/^0+/', '', $n_v[6]);
               $num[7][$n_k] = preg_replace('/^0+/', '', $n_v[7]);
               $count = $n_v[0]+$n_v[1]+$n_v[2]+$n_v[3]+$n_v[4]+$n_v[5]+$n_v[6]+$n_v[7];
               if ($count < 84) {
                   $lh_2[0][$n_k] = '小';
               }else if($count = 84){
                   $lh_2[0][$n_k] = '和';
               } else {
                   $lh_2[0][$n_k] = '大';
               }
               if(substr($count,-1)<= 4){
                   $lh_2[2][$n_k] = '尾小';
               }else{
                   $lh_2[2][$n_k] = '尾大';
               }
               if ($count % 2 == 0) {
                   $lh_2[1][$n_k] = '双';
               } else {
                   $lh_2[1][$n_k] = '单';
               }
               if ($n_v[0] > $n_v[7]) {
                   $lh[0][$n_k] = '龙';
               } else if ($n_v[0] < $n_v[7]) {
                   $lh[0][$n_k] = '虎';
               } else {
                   $lh[0][$n_k] = '和';
               }
               if ($n_v[1] > $n_v[6]) {
                   $lh[1][$n_k] = '龙';
               } else if ($n_v[1] < $n_v[6]) {
                   $lh[1][$n_k] = '虎';
               } else {
                   $lh[1][$n_k] = '和';
               }
               if ($n_v[2] > $n_v[5]) {
                   $lh[2][$n_k] = '龙';
               } else if ($n_v[2] < $n_v[5]) {
                   $lh[2][$n_k] = '虎';
               } else {
                   $lh[2][$n_k] = '和';
               }
               if ($n_v[3] > $n_v[4]) {
                   $lh[3][$n_k] = '龙';
               } else if ($n_v[3] < $n_v[4]) {
                   $lh[3][$n_k] = '虎';
               } else {
                   $lh[3][$n_k] = '和';
               }


           }else if($data['id'] == 6){


               $num[0][$n_k] = preg_replace('/^0+/', '', $n_v[0]);
               $num[1][$n_k] = preg_replace('/^0+/', '', $n_v[1]);
               $num[2][$n_k] = preg_replace('/^0+/', '', $n_v[2]);
               $num[3][$n_k] = preg_replace('/^0+/', '', $n_v[3]);
               $num[4][$n_k] = preg_replace('/^0+/', '', $n_v[4]);
               $count = $n_v[0]+$n_v[1]+$n_v[2]+$n_v[3]+$n_v[4];
               if ($count < 30) {
                   $lh_2[0][$n_k] = '小';
               }else if ($count == 30) {
                   $lh_2[0][$n_k] = '和';
               } else {
                   $lh_2[0][$n_k] = '大';
               }
               if ($count % 2 == 0) {
                   $lh_2[1][$n_k] = '双';
               } else {
                   $lh_2[1][$n_k] = '单';
               }
               if ($n_v[0] > $n_v[4]) {
                   $lh[0][$n_k] = '龙';
               } else if ($n_v[0] < $n_v[4]) {
                   $lh[0][$n_k] = '虎';
               } else {
                   $lh[0][$n_k] = '和';
               }


           } else{
               if ($n_v[0] + $n_v[1] < 12) {
                   $lh_2[0][$n_k] = '小';
               } else {
                   $lh_2[0][$n_k] = '大';
               }
               if (($n_v[0] + $n_v[1]) % 2 == 0) {
                   $lh_2[1][$n_k] = '双';
               } else {
                   $lh_2[1][$n_k] = '单';
               }
               $num[0][$n_k] = preg_replace('/^0+/', '', $n_v[0]);
               $num[1][$n_k] = preg_replace('/^0+/', '', $n_v[1]);
               $num[2][$n_k] = preg_replace('/^0+/', '', $n_v[2]);
               $num[3][$n_k] = preg_replace('/^0+/', '', $n_v[3]);
               $num[4][$n_k] = preg_replace('/^0+/', '', $n_v[4]);
               $num[5][$n_k] = preg_replace('/^0+/', '', $n_v[5]);
               $num[6][$n_k] = preg_replace('/^0+/', '', $n_v[6]);
               $num[7][$n_k] = preg_replace('/^0+/', '', $n_v[7]);
               $num[8][$n_k] = preg_replace('/^0+/', '', $n_v[8]);
               $num[9][$n_k] = preg_replace('/^0+/', '', $n_v[9]);
               if ($n_v[0] > $n_v[9]) {
                   $lh[0][$n_k] = '龙';
               } else if ($n_v[0] < $n_v[9]) {
                   $lh[0][$n_k] = '虎';
               } else {
                   $lh[0][$n_k] = '和';
               }
               if ($n_v[1] > $n_v[8]) {
                   $lh[1][$n_k] = '龙';
               } else if ($n_v[1] < $n_v[8]) {
                   $lh[1][$n_k] = '虎';
               } else {
                   $lh[1][$n_k] = '和';
               }
               if ($n_v[2] > $n_v[7]) {
                   $lh[2][$n_k] = '龙';
               } else if ($n_v[2] < $n_v[7]) {
                   $lh[2][$n_k] = '虎';
               } else {
                   $lh[2][$n_k] = '和';
               }
               if ($n_v[3] > $n_v[6]) {
                   $lh[3][$n_k] = '龙';
               } else if ($n_v[3] < $n_v[6]) {
                   $lh[3][$n_k] = '虎';
               } else {
                   $lh[3][$n_k] = '和';
               }
               if ($n_v[4] > $n_v[5]) {
                   $lh[4][$n_k] = '龙';
               } else if ($n_v[4] < $n_v[9]) {
                   $lh[4][$n_k] = '虎';
               } else {
                   $lh[4][$n_k] = '和';
               }


           }
       }
        $data['dx'][0] = $this->sdsd($lh_2[0]);
        $data['ds'][0] = $this->sdsd($lh_2[1]);

        $info_2['dx'][0] =$this-> cl($data['dx'][0]);
        $info_2['ds'][0] =$this-> cl($data['ds'][0]);


        if($data['id'] == 1 || $data['id']==40){

            for($i=0;$i<5;$i++)
            {
                $data['num'][$i] = $this->sdsd($num[$i]);
            }
            $data['lh'][0] = $this->sdsd($lh[0]);

            for($i=0;$i<5;$i++)
            {
                $info_2['num'][$i] =$this-> cl($data['num'][$i]);
            }
                $info_2['lh'][0] =$this-> cl($data['lh'][0]);

        }else if($data['id'] == 21){

            for($i=0;$i<8;$i++)
            {
                $data['num'][$i] = $this->sdsd($num[$i]);
            }
            for($i=0;$i<4;$i++)
            {
                $data['lh'][$i] = $this->sdsd($lh[$i]);
            }

            $data['w'][0] = $this->sdsd($lh_2[2]);
            for($i=0;$i<8;$i++)
            {
                $info_2['num'][$i] =$this-> cl($data['num'][$i]);
            }
            for($i=0;$i<4;$i++)
            {
                $info_2['lh'][$i] =$this-> cl($data['lh'][$i]);
            }

            $info_2['w'][0] =$this-> cl($data['w'][0]);

        }else if($data['id'] == 6){

            for($i=0;$i<5;$i++)
            {
                $data['num'][$i] = $this->sdsd($num[$i]);
            }
            $data['lh'][0] = $this->sdsd($lh[0]);
            $data['lh'][0] = $this->sdsd($lh[0]);
            $info_2['w'][0] =$this-> cl($data['w'][0]);
            for($i=0;$i<5;$i++)
            {
                $info_2['num'][$i] =$this-> cl($data['num'][$i]);
            }
            $info_2['lh'][0] =$this-> cl($data['lh'][0]);
        }else{
            for($i=0;$i<10;$i++)
            {
                $data['num'][$i] = $this->sdsd($num[$i]);
            }
            for($i=0;$i<5;$i++)
            {
                $data['lh'][$i] = $this->sdsd($lh[$i]);
            }

            for($i=0;$i<10;$i++)
            {
                $info_2['num'][$i] =$this-> cl($data['num'][$i]);
            }
            for($i=0;$i<5;$i++)
            {
                $info_2['lh'][$i] =$this-> cl($data['lh'][$i]);
            }
        }

    //rint_r($info_2);exit;
        echo json_encode($info_2,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);exit;
    }

    /**
     * @param $data
     * @return array
     * 去掉=1 的数据
     */
    public function cl($data){
        $info = array();
        $n = 0;
        foreach($data as $k => $v){
            if($v['times'] != 1){
                $info[$n]['num'] = $v['times'];
                $info[$n]['name'] = $v['type'];
                $n++;
            }
        }
        return $info;
    }

    /**
     * @param $lh
     * @return array
     * 获取连续出现的值
     */
    public function sdsd2($lh){
        $arr = array();
        $one = 0 ;
        foreach($lh as $k => $v){
            if(empty($arr)){
                $arr[$one]=array('times'=>1,'type'=>$v[$one]);
                continue;
            }
            if($arr[$one]['type'] ==  $v[$one]){
                $arr[$one]['times'] = $arr[$one]['times'] + 1;
                continue;
            }else{
                $one = $one + 1 ;
                $arr[$one] = array("times"=>1,'type'=>$v[$one]);
            }
        }
        return $arr;
    }

    public function sdsd($lh){
        $arr = array();
        $one = 0 ;
        foreach($lh as $k => $v){
            if(empty($arr)){
                $arr[$one]=array('times'=>1,'type'=>$v);
                continue;
            }
            if($arr[$one]['type'] ==  $v){
                $arr[$one]['times'] = $arr[$one]['times'] + 1;
                continue;
            }else{
                $one = $one + 1 ;
                $arr[$one] = array("times"=>1,'type'=>$v);
            }
        }
        return $arr;
    }

    public function cllz(){
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
        $res = M('data')->where(array('dat_type'=>$data['id']))->order('dat_open_time desc')->limit(20)->select();

        //开奖结果
        $code = [];
        foreach ($res as $k=>$v){
            $code[]=$v['dat_codes'];
        }

        if(empty($code)){
            return [];
        }

        //$result=array_keys(explode(',',$code[0]));
        //print_r($result);

        //开奖号码
        $nos=[];
        foreach ($code as $k=>$v){
            $arr = explode(',',$v);
            foreach ($arr as $kk=>$vv){
                $num= preg_replace('/^0+/', '', $vv);
                $nos[$kk][$k]=$num;
                //array_push($no[$arrKey],$arr);
            }
        }

        $result=[];
        $count = count($nos)-1;
        foreach ($nos as $k=>$no){
            $result[$k]['dx'] = $this->dx($no);
            $result[$k]['ds'] = $this->ds($no);
            if($data['id'] == 21){
                if($k<4){
                    $result[$k]['lh'] = $this->lh($no,$nos[$count-$k]);
                }
            }else if($data['id'] == 20 || $data['id'] == 34 || $data['id'] == 39 || $data['id'] == 46){
                if($k<5){
                    $result[$k]['lh'] = $this->lh($no,$nos[$count-$k]);
                }
            }else if($data['id'] == 1 || $data['id'] == 6 || $data['id'] == 40 || $data['id'] == 44 || $data['id'] == 45){
                if($k<1){
                    $result[$k]['lh'] = $this->lh($no,$nos[4]);
                }
            }
        }

        echo json_encode($result,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);exit;

    }

    /**
     * @param $code
     * @return string
     *
     */
    public function cldx($code){
        if($code >5 ){
            return '大';
        }else{
            return '小';
        }
    }
    public function clds($code){
        if($code%2 == 0 ){
            return '双';
        }else{
            return '单';
        }
    }
    public function cllh($code,$code2){
        if($code> $code2 ){
            return '龙';
        }else if($code < $code2 ){
            return '虎';
        }else{
            return '和';
        }
    }
    public function dx($no1){
        $dx=[];
        for($i=0;$i<20;$i++){
            $dx[]=$this->cldx($no1[$i]);
        }
        $dx = $this->sdsd($dx);
       // $dx =$this-> cl($dx);
        return $dx[0];
    }
    public function ds($no1){
        $dx=[];
        for($i=0;$i<20;$i++){
            $dx[]=$this->clds($no1[$i]);
        }
        $dx = $this->sdsd($dx);
       // $dx =$this-> cl($dx);
        return $dx[0];
    }

    public function lh($no1,$no10){
        $dx=[];
        for($i=0;$i<20;$i++){
            $dx[]=$this->cllh($no1[$i],$no10[$i]);
        }
        $dx = $this->sdsd($dx);
       // $dx =$this-> cl($dx);
        return $dx[0];
    }

}
