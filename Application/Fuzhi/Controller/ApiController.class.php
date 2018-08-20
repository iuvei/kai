<?php
namespace Fuzhi\Controller;

use Think\Controller;
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
            return json_encode($arr,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        }

        file_put_contents('lgc.log',date("Y-m-d H:i:s").$_POST."</br>",FILE_APPEND);//日志

        $data = json_decode($_POST,true);
        if(empty($data['name'])){
            $arr = array(
                'code'=>false,
                'msg'=>'彩种为空',
            );
            return json_encode($arr,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        }
        C('DB_PREFIX','lot_');
        $res = M('type')->where(array('name'=>$data['name']))->find();

        file_put_contents('lgc.log',date("Y-m-d H:i:s").$res."</br>",FILE_APPEND);

        if(empty($res)){
            $arr = array(
                'code'=>false,
                'msg'=>'没有这个彩种',
            );
            return json_encode($arr,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        }
        $where = array(
            'dat_type'=>$res['id'],
            'dat_open_time'=>time(),
            'dat_expect'=>$data['issue'],
            'dat_codes'=>$data['code'],
        );
        C('DB_PREFIX','lot_');
        $res = M('data')->add($where);

        file_put_contents('lgc.log',date("Y-m-d H:i:s").$res."</br>",FILE_APPEND);
        if($res < 1){
            $arr = array(
                'code'=>false,
                'msg'=>'系统有误',
            );
            return json_encode($arr,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        }

        $arr = array(
            'code'=>true,
            'msg'=>'成功',
        );
        return json_encode($arr,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    }

    /**
     * 视频接口
     */
    public function vodie(){
        if(empty(I('get.gamekey'))){
            $arr = array(
                'code'=>false,
                'msg'=>'参数为空',
            );
            return json_encode($arr,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        }
        $data = I('get.gamekey');
        $data = $this->caizhong($data);
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
        C('DB_PREFIX','lot_');
        $info = M('type')->where($where)->find();
      //echo  M('type')->getLastSql();
        if(empty($info)){
            $arr = array(
                'code'=>false,
                'msg'=>'没有这个彩种',
            );
            return json_encode($arr,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        }
        $data = array();
       // $db_name = 'th_game_queue_'.$_GET['gamekey'];
        $res =  M("data_time")->where('stop_time','>',date('H:i:s'))->find();
        $game =  M('th_game')->where('sname',$_GET['gamekey'])->find();
        echo  M("data_time")->getLastsql();
          print_r($res);exit;
        $where = array(
            'game_id'=>$game['id'],
            'issue'=>$res['issue']-1
        );
        $res_2 =  M("th_game_result")->where($where)->find();
        $data['errorcode'] = 0;
        $data['errormsg'] = '';
        $data['present']['now']=date('Y-m-d H:i:s');
        $data['present']['expect']=$res['issue'];
        $data['present']['start_buytime']=$res['open_time'];
        $data['present']['start_remaining']=$res['open_time'] - time();
        $data['present']['start_buytimestamp']=date('Y-m-d H:i:s',$res['open_time']);
        $data['present']['stop_buytime']=$res['stop_time'];
        $data['present']['stop_remaining']=$res['stop_time'] - time();
        $data['present']['stop_buytimestamp']=date('Y-m-d H:i:s',$res['stop_time']);
        $data['present']['opentime']=$res['close_time'];
        $data['present']['opentime_remaining']=$res['close_time'] - time();
        $data['present']['opentimestamp']=date('Y-m-d H:i:s',$res['close_time']);
        $data['present']['status']=$res['status'];
        $data['last_opencode']['expect']=$res_2['issue'];
        $data['last_opencode']['opencode']=$res_2['number'];
        $data['last_opencode']['opentime']=date('Y-m-d H:i:s',$res_2['open_time']);
        $data['last_opencode']['opentimestamp']=$res_2['open_time'];
        $res = $this->getAwardTime($info['id']);
        echo $res;exit;

    }
    private function caizhong($data){
        switch ($data){
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
}