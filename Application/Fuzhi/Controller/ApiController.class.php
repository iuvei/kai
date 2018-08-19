<?php
namespace Fuzhi\Controller;

use Think\Controller;
class ApiController extends Controller{
    public function index(){
       // echo 1111;exit;
        if(empty($_POST)){
            $arr = array(
                'code'=>false,
                'msg'=>'参数为空',
            );
            return json_encode($arr,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        }
<<<<<<< HEAD
        file_put_contents('lgc.log',date("Y-m-d H:i:s".$_POST),FILE_APPEND);
=======
        file_put_contents('lgc.log',date("Y-m-d H:i:s".$_POST."</br>"),FILE_APPEND);
>>>>>>> 72628539c2aac1fd701e3ae99d53b5b1f20954e9
        $data = json_decode($_POST,true);
        if(empty($data['name'])){
            $arr = array(
                'code'=>false,
                'msg'=>'彩种为空',
            );
            return json_encode($arr,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        }
        $res = M('lot_type')->where(array('name'=>$data['name']))->find();
<<<<<<< HEAD
        file_put_contents('lgc.log',date("Y-m-d H:i:s".$res),FILE_APPEND);
=======
        file_put_contents('lgc.log',date("Y-m-d H:i:s".$res."</br>"),FILE_APPEND);
>>>>>>> 72628539c2aac1fd701e3ae99d53b5b1f20954e9
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
        $res = M('lot_data')->add($where);
<<<<<<< HEAD
        file_put_contents('lgc.log',date("Y-m-d H:i:s".$res),FILE_APPEND);
=======
        file_put_contents('lgc.log',date("Y-m-d H:i:s".$res."</br>"),FILE_APPEND);
>>>>>>> 72628539c2aac1fd701e3ae99d53b5b1f20954e9
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
}