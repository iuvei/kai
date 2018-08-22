<?php
/**
 * Created by PhpStorm.
 * User: USER
 * Date: 2018/4/22
 * Time: 10:05
 */


namespace Fuzhi\Controller;

use Think\Controller;
use Fuzhi\Controller\Thcommission;
class Dragon extends Controller
{
    public function get_dragon_info($curIndex,$game)
    {
        $game = strtolower($game);//把变量的值全部转换为小写
        if($game=='hklhc')
        {
            return $this->imbet_result_all_hklhc($curIndex,$game);
        }
        else{
            return $this->imbet_result_all($curIndex,$game);
        }
    }
    public function imbet_result_all($curIndex,$game)
    {
        static $name_id;
        $origin_id=0;
        //$tongji = 0;
        /*$gameid = ['bjpk10','cqssc','xyft','hklhc','bjft','cqft','jnd28','jsk3','gd11x5','gdklsf'];
        $game = strtolower($game);
        $id = intval( array_search($game,$gameid) );
        $id +=1;*/
        $game = strtolower($game);//把变量的值全部转换为小写
        $id = $this->get_game_id($game);//获取游戏类型id
        $origin_id = $id;
        if(!$name_id)
        {
            /*$tongji=100;
            $setting = GameSettingModel::getInstance()->where(['game_id' => $id, 'status' => ['gt', -1]])
                ->field('id,uname')->order('id asc,row asc')->select();
            foreach ($setting as $r) {
                $name_id[ $r['uname'] ]=$r['id'];
            }*/

            $setting = M("th_game_setting")->where(['game_id' => $id, 'status' => ['gt', -1]])
                ->field('id,uname,min_odds,max_odds')->order('id asc,row asc')->select();
            foreach ($setting as $r) {
                $price = Thcommission::getInstance()->setType(config('commission_type'))->getOdds($curIndex, $r['min_odds'], $r['max_odds']);
                $name_id[ $r['uname'] ]=['id'=>$r['id'],'price'=>$price];
            }
        }
        $tt    = [];
        $i=0;
        $md2   =  db('th_game_result');
        $condition             = [];
        $condition['A.game_id'] = ['eq', $id];
        //$condition['A.status'] = ['gt', -1];
      //  $condition['A.state'] = $md2::STATE_1;
        $condition['A.state'] = 1;//状态 也可用开奖结果表里的状态
       // $condition['A.status'] = $md2::STATUS_1;
        $condition['A.status'] = 1;//状态  也可用开奖结果表里的状态
        $order_by = 'A.id';
        $sort_by  = 'desc';
        //$count    = $md2->where($condition)->alias('A')->count();
        $t = $md2->alias('A')->where($condition)
            ->order("{$order_by} {$sort_by}")->limit(0, 50)->select();//获取最新的五十条游戏结果的数据
        $darr=[];
        $r_leng=0;
        foreach ($t as $r)
        {
            $tt[ $i ] = ['game_name' => $r['game_name'], 'issue' => $r['issue'], 'number' => $r['number'], 'open_time' => $r['open_time'] ];//循环获取的所需的字段
            $i++;
        }
        $rk = [[],[],[],[],[],[],[],[],[],[]];
        foreach ($tt as $r)
        {
            $darr = explode(',',$r['number']);
            $r_leng = count($darr);
            for ($i = 0; $i < $r_leng; $i++) {

                array_push($rk[$i], $darr[$i]);//把五期的中将结果合并到一个数组里面
            }
        }

        $changlong_recoder = [];//定义空数组用来储存玩法标识和每期玩法出现的count

        //玩法分类
        $cararr['ds_11']=0;//大
        $cararr['ds_12']=0;//小
        $cararr['ds_15']=0;//和
        $cararr['ds_13']=0;//单
        $cararr['ds_14']=0;//双
        $cararr['ds_16']=0;//和

        $cararr['ds_17']=0;//尾大
        $cararr['ds_18']=0;//尾小
        $cararr['ds_19']=0;//合单
        $cararr['ds_20']=0;//合双

        /*$cararr['ds_21']=0;//大单
        $cararr['ds_22']=0;//小单
        $cararr['ds_23']=0;//大双
        $cararr['ds_24']=0;//小双
        $cararr['ds_25']=0;//极大
        $cararr['ds_26']=0;//极小*/

        $cararr['lh_1']=0;//龙
        $cararr['lh_2']=0;//虎
        $cararr['lh_3']=0;//和
        //玩法分类


        if($id==7)goto gyhe;//如果id=7就跳过这段代码

        if($id==12 || $id==14)
        {
            $id = 2;
        }
        if($id==2 || $id==12 || $id==14)$dx_line = 4;
        else if($id==10)$dx_line = 10;
        else $dx_line = 5;
        for($z=0; $z<count($rk); $z++)//把获取到的每期玩法出现次数的count循环，同时也循环玩法分类处理取得玩法标识
        {
            for($i=0; $i<count($rk[$z]); $i++)
            {
                if ($i == 0)
                {
                    $k = intval( $rk[$z][$i] );
                    if($id==9)$lastnum_dx = $k>$dx_line?($k==11?'ds_15':'ds_11'):'ds_12';
                    else $lastnum_dx = $k>$dx_line?'ds_11':'ds_12';

                    if($id==9)$lastnum_ds = $k%2==0?'ds_14':($k==11?'ds_16':'ds_13');
                    else $lastnum_ds = $k%2==0?'ds_14':'ds_13';
                    if($id==10)
                    {
                        $lastnum_wdx = $k%10>4?'ds_17':'ds_18';
                        $lastnum_hds = (intdiv($k, 10) + $k % 10)%2==0?'ds_20':'ds_19';
                        $cararr[$lastnum_wdx]=1;
                        $cararr[$lastnum_hds]=1;
                    }
                    if($z<intval($r_leng/2) && $id!=2 && $id!=9)
                    {
                        $k2 = intval( $rk[$r_leng-1-$z][$i] );
                        $lastnum_lh = $k>$k2?'lh_1':'lh_2';
                        $cararr[$lastnum_lh]=1;
                    }
                    else if($z==0 && ($id==2 || $id==9) )
                    {
                        $k2 = intval( $rk[$r_leng-1-$z][$i] );
                        $lastnum_lh = $k>$k2?'lh_1':($k==$k2?'lh_3':'lh_2');
                        $cararr[$lastnum_lh]=1;
                    }
                    $cararr[$lastnum_dx]=1;
                    $cararr[$lastnum_ds]=1;
                }
                else{
                    $k = intval( $rk[$z][$i] );
                    ///////////////////////******************/////////////////
                    if($id==9)$new_dx = $k>$dx_line?($k==11?'ds_15':'ds_11'):'ds_12';
                    else $new_dx = $k>$dx_line?'ds_11':'ds_12';

                    if($id==9)$new_ds = $k%2==0?'ds_14':($k==11?'ds_16':'ds_13');
                    else $new_ds = $k%2==0?'ds_14':'ds_13';

                    if($id==10)
                    {
                        $new_wdx = $k%10>4?'ds_17':'ds_18';
                        $new_hds = (intdiv($k, 10) + $k % 10)%2==0?'ds_20':'ds_19';
                    }
                    if($z<intval($r_leng/2) && $id!=2 && $id!=9)
                    {
                        $k2 = intval( $rk[$r_leng-1-$z][$i] );
                        $new_lh = $k>$k2?'lh_1':'lh_2';
                    }
                    else if($z==0 && ($id==2 || $id==9) )
                    {
                        $k2 = intval( $rk[$r_leng-1-$z][$i] );
                        $new_lh = $k>$k2?'lh_1':($k==$k2?'lh_3':'lh_2');
                    }
                    /// //////////////////*******************///////////////
                    if( isset($lastnum_dx) && $lastnum_dx == $new_dx )
                    {
                        $cararr[$lastnum_dx]+=1;
                    }
                    else {
                        if( isset($lastnum_dx) )unset($lastnum_dx);
                    }
                    if( isset($lastnum_ds) && $lastnum_ds == $new_ds )
                    {
                        $cararr[$lastnum_ds]+=1;
                    }
                    else {
                        if( isset($lastnum_ds) )unset($lastnum_ds);
                    }
                    if( isset($lastnum_wdx) && $lastnum_wdx == $new_wdx )
                    {
                        $cararr[$lastnum_wdx]+=1;
                    }
                    else {
                        if( isset($lastnum_wdx) )unset($lastnum_wdx);
                    }
                    if( isset($lastnum_hds) && $lastnum_hds == $new_hds )
                    {
                        $cararr[$lastnum_hds]+=1;
                    }
                    else {
                        if( isset($lastnum_hds) )unset($lastnum_hds);
                    }
                    if( isset($lastnum_lh) && $lastnum_lh == $new_lh )
                    {
                        $cararr[$lastnum_lh]+=1;
                    }
                    else {
                        if( isset($lastnum_lh) )unset($lastnum_lh);
                    }
                }
                if( !isset($lastnum_lh) && !isset($lastnum_dx) && !isset($lastnum_ds) && !isset($lastnum_wdx) && !isset($lastnum_hds) )
                {
                    break;
                }
            }
            /*****往数组里面填写长龙记录*****/
            $al = ['a','b','c','d','e','f','g','h','i','j','l'];
            if( $id==9 )
            {
                if ($cararr['ds_11'] > 1) $changlong_recoder[$al[$z] . '12'] = $cararr['ds_11'];
                if ($cararr['ds_12'] > 1) $changlong_recoder[$al[$z] . '13'] = $cararr['ds_12'];
                if ($cararr['ds_13'] > 1) $changlong_recoder[$al[$z] . '14'] = $cararr['ds_13'];
                if ($cararr['ds_14'] > 1) $changlong_recoder[$al[$z] . '15'] = $cararr['ds_14'];
            }
            else if( $id==10 )
            {
                if ($cararr['ds_11'] > 1) $changlong_recoder[$al[$z] . '21'] = $cararr['ds_11'];
                if ($cararr['ds_12'] > 1) $changlong_recoder[$al[$z] . '22'] = $cararr['ds_12'];
                if ($cararr['ds_13'] > 1) $changlong_recoder[$al[$z] . '23'] = $cararr['ds_13'];
                if ($cararr['ds_14'] > 1) $changlong_recoder[$al[$z] . '24'] = $cararr['ds_14'];

                if ($cararr['ds_17'] > 1) $changlong_recoder[$al[$z] . '25'] = $cararr['ds_17'];
                if ($cararr['ds_18'] > 1) $changlong_recoder[$al[$z] . '26'] = $cararr['ds_18'];
                if ($cararr['ds_19'] > 1) $changlong_recoder[$al[$z] . '27'] = $cararr['ds_19'];
                if ($cararr['ds_20'] > 1) $changlong_recoder[$al[$z] . '28'] = $cararr['ds_20'];
            }
            else {
                if ($cararr['ds_11'] > 1) $changlong_recoder[$al[$z] . '11'] = $cararr['ds_11'];
                if ($cararr['ds_12'] > 1) $changlong_recoder[$al[$z] . '12'] = $cararr['ds_12'];
                if ($cararr['ds_13'] > 1) $changlong_recoder[$al[$z] . '13'] = $cararr['ds_13'];
                if ($cararr['ds_14'] > 1) $changlong_recoder[$al[$z] . '14'] = $cararr['ds_14'];
            }
            if( $id==9 )
            {
                if ($cararr['lh_1'] > 1) $changlong_recoder['z7'] = $cararr['lh_1'];
                if ($cararr['lh_2'] > 1) $changlong_recoder['z8'] = $cararr['lh_2'];
            }
            else if($z<intval($r_leng/2) && $id!=2) {
                if ($cararr['lh_1'] > 1) $changlong_recoder[$al[10] . ($z * 2 + 1)] = $cararr['lh_1'];
                if ($cararr['lh_2'] > 1) $changlong_recoder[$al[10] . ($z * 2 + 2)] = $cararr['lh_2'];
            }
            else if($z==0 && $id==2) {
                if ($cararr['lh_1'] > 1) $changlong_recoder['z5'] = $cararr['lh_1'];
                if ($cararr['lh_2'] > 1) $changlong_recoder['z6'] = $cararr['lh_2'];
                if ($cararr['lh_3'] > 1) $changlong_recoder['z7'] = $cararr['lh_3'];
            }
            foreach($cararr as $key=>$val)
            {
                $cararr[ $key ]=0;
            }
            unset($lastnum_dx); unset($lastnum_ds); unset($lastnum_lh); unset($lastnum_wdx); unset($lastnum_hds);
            unset($new_dx); unset($new_ds); unset($new_lh);  unset($new_wdx); unset($new_hds);
            /**********/
        }
        //return Response::create($rk, 'json', 200);
        /*****往gyhe里面填写长龙记录*****/
        gyhe:
        //dump($r_leng);die;
        $dx_line=11;
        if ($id==2)$dx_line=22;
        else if ($id==9)$dx_line=30;
        else if ($id==10)$dx_line=84;
        else if ($id==7)$dx_line=13;
        for($i=0; $i<count($rk[0]); $i++)//把获取到的每期玩法出现次数的count循环，同时也循环玩法分类处理取得玩法标识
        {
            $k=0;
            if ($id == 2) $k = intval($rk[0][$i]) + intval($rk[1][$i]) + intval($rk[2][$i]) + intval($rk[3][$i]) + intval($rk[4][$i]);
            else if ($id == 9 || $id == 10 || $id == 7)
            {
                for($j=0; $j<$r_leng; $j++)
                {
                    $k += intval($rk[$j][$i]);
                }
            }
            else $k = intval($rk[0][$i]) + intval($rk[1][$i]);
            if ($i == 0) {
                if ($id == 9 || $id == 10) $lastnum_dx = $k > $dx_line ? 'ds_11' :($k == $dx_line?'ds_15':'ds_12');
                else $lastnum_dx = $k > $dx_line ? 'ds_11' : 'ds_12';

                $lastnum_ds = $k % 2 == 0 ? 'ds_14' : 'ds_13';

                if ($id == 9 || $id == 10)
                {
                    $lastnum_wdx = $k%10 > 4 ? 'ds_17' :'ds_18';
                    $cararr[$lastnum_wdx] = 1;
                }
                else if ($id == 7)
                {
                    if($k == 14 || $k == 13)$lastnum_dxds = 'lh_1';
                    else{
                        $lastnum_dxds = $k > 14 ?($k%2==0?'ds_18' :'ds_17'):($k%2==0?'ds_16' :'ds_15');
                    }
                    $cararr[$lastnum_dxds] = 1;

                    $lastnum_wdx = $k > 21 ? 'ds_19' :($k<6?'ds_20':'lh_1');
                    $cararr[$lastnum_wdx] = 1;
                }
                $cararr[$lastnum_dx] = 1;
                $cararr[$lastnum_ds] = 1;
            } else {
                if ($id == 9 || $id == 10) $new_dx = $k > $dx_line ? 'ds_11' :($k == $dx_line?'ds_15':'ds_12');
                else $new_dx = $k > $dx_line ? 'ds_11' : 'ds_12';

                $new_ds = $k % 2 == 0 ? 'ds_14' : 'ds_13';
                if ($id == 9 || $id == 10)
                {
                    $new_wdx = $k%10 > 4 ? 'ds_17' :'ds_18';
                }
                else if ($id == 7)
                {
                    if($k == 14 || $k == 13)$new_dxds = 'lh_1';
                    else{
                        $new_dxds = $k > 14 ?($k%2==0?'ds_18' :'ds_17'):($k%2==0?'ds_16' :'ds_15');
                    }
                    $cararr[$new_dxds] = 1;

                    $new_wdx = $k > 21 ? 'ds_19' :($k<6?'ds_20':'lh_1');
                    $cararr[$new_wdx] = 1;
                }
                if( isset($lastnum_dx) && $lastnum_dx == $new_dx )
                {
                    $cararr[$lastnum_dx]+=1;
                }
                else {
                    if( isset($lastnum_dx) )unset($lastnum_dx);
                }
                if( isset($lastnum_ds) && $lastnum_ds == $new_ds )
                {
                    $cararr[$lastnum_ds]+=1;
                }
                else {
                    if( isset($lastnum_ds) )unset($lastnum_ds);
                }

                if( isset($lastnum_wdx) && $lastnum_wdx == $new_wdx )
                {
                    $cararr[$lastnum_wdx]+=1;
                }
                else {
                    if( isset($lastnum_wdx) )unset($lastnum_wdx);
                }

                if( isset($lastnum_dxds) && $lastnum_dxds == $new_dxds )
                {
                    $cararr[$lastnum_dxds]+=1;
                }
                else {
                    if( isset($lastnum_dxds) )unset($lastnum_dxds);
                }
            }
            if( !isset($lastnum_dx) && !isset($lastnum_ds) && !isset($lastnum_wdx) && !isset($lastnum_dxds) )
            {
                break;
            }
        }
        if ($id != 7) {
            if ($cararr['ds_11'] > 1) $changlong_recoder['z1'] = $cararr['ds_11'];
            if ($cararr['ds_12'] > 1) $changlong_recoder['z2'] = $cararr['ds_12'];
            if ($cararr['ds_13'] > 1) $changlong_recoder['z3'] = $cararr['ds_13'];
            if ($cararr['ds_14'] > 1) $changlong_recoder['z4'] = $cararr['ds_14'];
        }

        if ($id == 9 || $id == 10) {
            if ($cararr['ds_17'] > 1) $changlong_recoder['z5'] = $cararr['ds_17'];
            if ($cararr['ds_18'] > 1) $changlong_recoder['z6'] = $cararr['ds_18'];
        }
        else if ($id == 7)
        {
            if ($cararr['ds_11'] > 1) $changlong_recoder['a1'] = $cararr['ds_11'];
            if ($cararr['ds_12'] > 1) $changlong_recoder['a2'] = $cararr['ds_12'];
            if ($cararr['ds_13'] > 1) $changlong_recoder['a3'] = $cararr['ds_13'];
            if ($cararr['ds_14'] > 1) $changlong_recoder['a4'] = $cararr['ds_14'];
            if ($cararr['ds_15'] > 1) $changlong_recoder['a6'] = $cararr['ds_15'];//小单
            if ($cararr['ds_16'] > 1) $changlong_recoder['a8'] = $cararr['ds_16'];//小双
            if ($cararr['ds_17'] > 1) $changlong_recoder['a5'] = $cararr['ds_17'];//大单
            if ($cararr['ds_18'] > 1) $changlong_recoder['a7'] = $cararr['ds_18'];//大双
            if ($cararr['ds_19'] > 1) $changlong_recoder['a9'] = $cararr['ds_19'];//极大
            if ($cararr['ds_20'] > 1) $changlong_recoder['a10'] = $cararr['ds_20'];//极小
        }
        /*****往gyhe里面填写长龙记录 end*****/
        arsort($changlong_recoder);//获取到的玩法标识和每期玩法出现次数的count
        $str = [];
        $sub=[];
        $mingci = ['冠军','亚军','季军','第四名','第五名','第六名','第七名','第八名','第九名','第十名'];
        $gyh = '冠亚';
        $lei = ['大','小','单','双','龙','虎','和'];
        if($id==2 || $id==9 || $id==10) {
            $mingci = ['第一球', '第二球', '第三球', '第四球', '第五球', '第六球', '第七球', '第八球', '第九球', '第十球'];
            $gyh = '总和';
            $te_lei = ['尾大','尾小','合单','合双'];
        }
        else if($id==7){
            $lei = ['大','小','单','双','大单','小单','大双','小双','极大','极小'];
        }
        foreach ($changlong_recoder as $key=>$val)
        {
            $ch = substr($key,0,1);
            $haoma = substr($key,1);
            $aa = ord($ch)-ord('a');//ord用来获取字符ascll数值的函数 即两个字符的ascll数值相减得出的值
            $bb = intval($haoma);
            $sub=[];
            if($aa<10)
            {
                if($id==9)$temp = $mingci[$aa].'-'.$lei[$bb-12];
                else if($id==10){
                    if($bb<25)$temp = $mingci[$aa].'-'.$lei[$bb-21];
                    else $temp = $mingci[$aa].'-'.$te_lei[$bb-25];
                }
                else if($id==7)
                {
                    $temp = $lei[$bb-1];
                }
                else $temp = $mingci[$aa].'-'.$lei[$bb-11];
                $bigclass = 'ball_'.($aa+1);
                if($id==9)
                {
                    if ($bb == 12) $cc = 13;
                    else if ($bb == 13) $cc = 12;
                    else if ($bb == 14) $cc = 15;
                    else if ($bb == 15) $cc = 14;
                }
                else if($id==10)
                {
                    if ($bb == 21) $cc = 22;
                    else if ($bb == 22) $cc = 21;
                    else if ($bb == 23) $cc = 24;
                    else if ($bb == 24) $cc = 23;
                    else if ($bb == 25) $cc = 26;
                    else if ($bb == 26) $cc = 25;
                    else if ($bb == 27) $cc = 28;
                    else if ($bb == 28) $cc = 27;
                }
                else if($id==7)
                {
                    if ($bb == 1) $cc = 2;
                    else if ($bb == 2) $cc = 1;
                    else if ($bb == 3) $cc = 4;
                    else if ($bb == 4) $cc = 3;
                    else if ($bb == 5) $cc = 6;
                    else if ($bb == 6) $cc = 5;
                    else if ($bb == 7) $cc = 8;
                    else if ($bb == 8) $cc = 7;
                    else if ($bb == 9) $cc = 10;
                    else if ($bb == 10) $cc = 9;
                }
                else {
                    if ($bb == 11) $cc = 12;
                    else if ($bb == 12) $cc = 11;
                    else if ($bb == 13) $cc = 14;
                    else if ($bb == 14) $cc = 13;
                }
                $sub[0]['play_method']=$ch.$cc;
                if($id==9)$sub[0]['play_dsc']=$mingci[$aa].'-'.$lei[$cc-12];
                else if($id==10)
                {
                    if($cc<25)$sub[0]['play_dsc']=$mingci[$aa].'-'.$lei[$cc-21];
                    else $sub[0]['play_dsc']=$mingci[$aa].'-'.$te_lei[$cc-25];
                }
                else if($id==7)
                {
                    $sub[0]['play_dsc']=$lei[$cc-1];
                }
                else $sub[0]['play_dsc']=$mingci[$aa].'-'.$lei[$cc-11];
                $sub[0]['price']=floor($name_id[$ch.$cc]['price']* 100) / 100;//保留两位小数，且不四舍五入//amountFormat($name_id[$ch.$cc]['price']);
               // $sub[0]['price']=1;
                $sub[0]['id']=$name_id[$ch.$cc]['id'];
            }
            else if($ch=='l')
            {
                if($bb==1 || $bb==2)$temp = $mingci[0];
                else if($bb==3 || $bb==4)$temp = $mingci[1];
                else if($bb==5 || $bb==6)$temp = $mingci[2];
                else if($bb==7 || $bb==8)$temp = $mingci[3];
                else if($bb==9 || $bb==10)$temp = $mingci[4];
                $temp .= '-';
                if($bb%2==0){ $temp2 =$temp.'龙'; $temp .='虎'; $cc=$bb-1; }
                else {$temp2 =$temp.'虎'; $temp .='龙'; $cc=$bb+1;  }
                if($id==10)$bigclass = 'ball_11';
                else $bigclass = 'ball_13';
                $sub[0]['play_method']=$ch.$cc;
                $sub[0]['play_dsc']=$temp2;
                $sub[0]['price']=floor($name_id[$ch.$cc]['price']* 100) / 100;//保留两位小数，且不四舍五入//amountFormat($name_id[$ch.$cc]['price']);
                $sub[0]['id']=$name_id[$ch.$cc]['id'];
            }
            else if($ch=='z')
            {
                if($id==2)
                {
                    if($bb==1)$cc=2;
                    else if($bb==2)$cc=1;
                    else if($bb==3)$cc=4;
                    else if($bb==4)$cc=3;
                    else if($bb==5)$cc=6;
                    else if($bb==6)$cc=5;
                    else if($bb==7)$cc=0;
                    if( $cc>0 )
                    {
                        $sub[0]['play_method']=$ch.$cc;
                        if($cc>4)$sub[0]['play_dsc']=$lei[$cc-1];
                        else $sub[0]['play_dsc']=$gyh.$lei[$cc-1];
                        $sub[0]['price']=floor($name_id[$ch.$cc]['price']* 100) / 100;//保留两位小数，且不四舍五入amountFormat($name_id[$ch.$cc]['price']);
                        $sub[0]['id']=$name_id[$ch.$cc]['id'];
                    }
                    if($bb>4){$temp = $lei[$bb-1]; $bigclass = 'ball_6';}
                    else {$temp = $gyh . $lei[$bb-1]; $bigclass = 'ball_6';}
                }
                else if( $id==9 || $id==10 )
                {
                    if($bb%2==0)$cc = $bb-1;
                    else $cc = $bb+1;

                    $sub[0]['play_method']=$ch.$cc;
                    if($cc<=4)$sub[0]['play_dsc']=$gyh.$lei[$cc-1];
                    else if($cc==5 || $cc==6)$sub[0]['play_dsc']=$gyh.$te_lei[$cc-5];
                    else $sub[0]['play_dsc']=$lei[$cc-3];
                    $sub[0]['price']=floor($name_id[$ch.$cc]['price']* 100) / 100;//保留两位小数，且不四舍五入amountFormat($name_id[$ch.$cc]['price']);
                    $sub[0]['id']=$name_id[$ch.$cc]['id'];

                    //if($bb>4){$temp = $lei[$bb-1]; $bigclass = 'ball_6';}
                    //else {$temp = $gyh . $lei[$bb-1]; $bigclass = 'ball_6';}

                    if($bb<=4)$temp = $gyh . $lei[$bb-1];
                    else if($bb==5 || $bb==6)$temp = $gyh.$te_lei[$bb-5];
                    else $temp = $lei[$bb-3];
                    if( $id==9 )$bigclass = 'ball_6';
                    else $bigclass = 'ball_9';
                }
                else {$temp = $gyh . '-' . $lei[$bb-1]; $bigclass = 'ball_11';
                    if($bb==1)$cc=2;
                    else if($bb==2)$cc=1;
                    else if($bb==3)$cc=4;
                    else if($bb==4)$cc=3;
                    $sub[0]['play_method']=$ch.$cc;
                    $sub[0]['play_dsc']=$gyh . '-' . $lei[$cc-1];
                    $sub[0]['price']=floor($name_id[$ch.$cc]['price']* 100) / 100;//保留两位小数，且不四舍五入amountFormat($name_id[$ch.$cc]['price']);
                   // $sub[0]['price']=1;
                    $sub[0]['id']=$name_id[$ch.$cc]['id'];
                }
            }
            //$str .=$key.'='.$val.','.$temp.';';
            $tempid = $name_id[$key]['id'];
            $tempprice =floor($name_id[$key]['price']* 100) / 100;//保留两位小数，且不四舍五入// amountFormat($name_id[$key]['price']);
            array_push($str,["id"=>$tempid,"type"=>$bigclass,"play_method"=>$key,"play_dsc"=>$temp,"count"=>$val,'price'=>$tempprice,'pair'=>$sub]);
        }
        //return Response::create($changlong_recoder, 'json', 200);
        return $str;
        //return ['detail'      => $str, 'game_name' => $game,'tongji'=>$tongji ];
    }
////////////////////////////////////////////////////chang long hklhc start
    public function imbet_result_all_hklhc($curIndex,$game)
    {
        static $name_id;
        //$tongji = 0;
        /*$gameid = ['bjpk10','cqssc','xyft','hklhc','bjft','cqft','jnd28'];
        $game = strtolower($game);
        $id = intval( array_search($game,$gameid) );
        $id +=1;*/
        $game = strtolower($game);
        $id = $this->get_game_id($game);

        if(!$name_id)
        {
            /*$tongji=100;
            $setting = GameSettingModel::getInstance()->where(['game_id' => $id, 'status' => ['gt', -1]])
                ->field('id,uname')->order('id asc,row asc')->select();
            foreach ($setting as $r) {
                $name_id[ $r['uname'] ]=$r['id'];
            }*/
            $setting = db("th_game_setting")->where(['game_id' => $id, 'status' => ['gt', -1]])
                ->field('id,uname,min_odds,max_odds')->order('id asc,row asc')->select();
            foreach ($setting as $r) {
                $price = Thcommission::getInstance()->setType(config('commission_type'))->getOdds($curIndex, $r['min_odds'], $r['max_odds']);
                $name_id[ $r['uname'] ]=['id'=>$r['id'],'price'=>$price];
            }
        }
        $tt = [];
        $i = 0;
        $md2 = db('th_game_result');
        $condition = [];
        $condition['A.game_id'] = ['eq', $id];
        //$condition['A.status'] = ['gt', -1];
        $condition['A.state'] = $md2::STATE_1;
        $condition['A.status'] = $md2::STATUS_1;
        $order_by = 'A.id';
        $sort_by = 'desc';
        //$count = $md2->where($condition)->alias('A')->count();
        $t = $md2->alias('A')->where($condition)
            ->order("{$order_by} {$sort_by}")->limit(0, 50)->select();
        $darr = [];
        foreach ($t as $r) {
            $tt[$i] = ['game_name' => $r['game_name'], 'issue' => $r['issue'], 'number' => $r['number'], 'open_time' => $r['open_time']];
            $i++;
        }
        $rk = [[], [], [], [], [], [], [], [], [], []];
        foreach ($tt as $r) {
            $darr = explode(',', $r['number']);
            for ($i = 0; $i < count($darr); $i++) {
                array_push($rk[$i], $darr[$i]);
            }
        }

        $hk6_color['red'] = [1, 2, 7, 8, 12, 13, 18, 19, 23, 24, 29, 30, 34, 35, 40, 45, 46];
        $hk6_color['blue'] = [3, 4, 9, 10, 14, 15, 20, 25, 26, 31, 36, 37, 41, 42, 47, 48];
        $hk6_color['green'] = [5, 6, 11, 16, 17, 21, 22, 27, 28, 32, 33, 38, 39, 43, 44, 49];
        $k = 0;$k2 = 0;
        $changlong_recoder = [];
        $cararr['ds_11'] = 0;//大
        $cararr['ds_12'] = 0;//小
        $cararr['ds_13'] = 0;//单
        $cararr['ds_14'] = 0;//双
        $cararr['ds_15'] = 0;//合大
        $cararr['ds_16'] = 0;//合小
        $cararr['ds_17'] = 0;//合单
        $cararr['ds_18'] = 0;//合双
        $cararr['ds_19'] = 0;//尾大
        $cararr['ds_20'] = 0;//尾小
        $cararr['ds_21'] = 0;//红波
        $cararr['ds_22'] = 0;//绿波
        $cararr['ds_23'] = 0;//蓝波
        $cararr['ds_24'] = 0;//大单
        $cararr['ds_25'] = 0;//小单
        $cararr['ds_26'] = 0;//大双
        $cararr['ds_27'] = 0;//小双
        $cararr['ds_28'] = 0;//家禽
        $cararr['ds_29'] = 0;//野兽

        for ($z = 0; $z < count($rk); $z++) {
            for ($i = 0; $i < count($rk[$z]); $i++) {
                if ($i == 0) {
                    $k = intval($rk[$z][$i]);
                    if ($k < 49) {
                        $k2 = intval($k / 10) + $k % 10;
                        $lastnum_dx = $k > 24 ? 'ds_11' : 'ds_12';
                        $lastnum_ds = $k % 2 == 0 ? 'ds_14' : 'ds_13';

                        $lasthe_dx = $k2 > 6 ? 'ds_15' : 'ds_16';
                        $lasthe_ds = $k2 % 2 == 0 ? 'ds_18' : 'ds_17';

                        $lastwei_dx = $k % 10 > 4 ? 'ds_19' : 'ds_20';
                        if (in_array($k, $hk6_color['red'])) {
                            $last_sb = 'ds_21';
                        } else if (in_array($k, $hk6_color['blue'])) {
                            $last_sb = 'ds_23';
                        } else if (in_array($k, $hk6_color['green'])) {
                            $last_sb = 'ds_22';
                        }
                        if ($z == 6) {
                            $lasttema_dxds = $k > 24 ? ($k % 2 == 0 ? 'ds_26' : 'ds_24') : (($k % 2 == 0 ? 'ds_27' : 'ds_25'));
                        } else $lasttema_dxds = '';
                        $cararr[$lastnum_dx] = 1;
                        $cararr[$lastnum_ds] = 1;

                        $cararr[$lasthe_dx] = 1;
                        $cararr[$lasthe_ds] = 1;
                        $cararr[$lastwei_dx] = 1;
                        $cararr[$last_sb] = 1;
                        if ($z == 6) $cararr[$lasttema_dxds] = 1;
                    } else {
                        if (isset($lastnum_dx)) unset($lastnum_dx);
                        if (isset($lastnum_ds)) unset($lastnum_ds);
                        if (isset($lasthe_dx)) unset($lasthe_dx);
                        if (isset($lasthe_ds)) unset($lasthe_ds);
                        if (isset($lastwei_dx)) unset($lastwei_dx);
                        if (isset($last_sb)) unset($last_sb);
                        if (isset($lasttema_dxds)) unset($lasttema_dxds);
                    }
                } else {
                    $k = intval($rk[$z][$i]);
                    if ($k < 49) {
                        $k2 = intval($k / 10) + $k % 10;
                        $new_num_dx = $k > 24 ? 'ds_11' : 'ds_12';
                        $new_num_ds = $k % 2 == 0 ? 'ds_14' : 'ds_13';

                        $new_he_dx = $k2 > 6 ? 'ds_15' : 'ds_16';
                        $new_he_ds = $k2 % 2 == 0 ? 'ds_18' : 'ds_17';

                        $new_wei_dx = $k % 10 > 4 ? 'ds_19' : 'ds_20';

                        if (in_array($k, $hk6_color['red'])) {
                            $new__sb = 'ds_21';
                        } else if (in_array($k, $hk6_color['blue'])) {
                            $new__sb = 'ds_23';
                        } else if (in_array($k, $hk6_color['green'])) {
                            $new__sb = 'ds_22';
                        }
                        if ($z == 6) {
                            $new_tema_dxds = $k > 24 ? ($k % 2 == 0 ? 'ds_26' : 'ds_24') : (($k % 2 == 0 ? 'ds_27' : 'ds_25'));
                        }
                    } else {
                        if (isset($new_num_dx)) unset($new_num_dx);
                        if (isset($new_num_ds)) unset($new_num_ds);
                        if (isset($new_he_dx)) unset($new_he_dx);
                        if (isset($new_he_ds)) unset($new_he_ds);
                        if (isset($new_wei_dx)) unset($new_wei_dx);
                        if (isset($new__sb)) unset($new__sb);
                        if (isset($new_tema_dxds)) unset($new_tema_dxds);
                    }

                    if (isset($lastnum_dx) && isset($new_num_dx) && $lastnum_dx == $new_num_dx) {
                        $cararr[$lastnum_dx] += 1;
                    } else {
                        if (isset($lastnum_dx)) unset($lastnum_dx);
                    }
                    if (isset($lastnum_ds) && isset($new_num_ds) && $lastnum_ds == $new_num_ds) {
                        $cararr[$lastnum_ds] += 1;
                    } else {
                        if (isset($lastnum_ds)) unset($lastnum_ds);
                    }

                    if (isset($lasthe_dx) && isset($new_he_dx) && $lasthe_dx == $new_he_dx) {
                        $cararr[$lasthe_dx] += 1;
                    } else {
                        if (isset($lasthe_dx)) unset($lasthe_dx);
                    }
                    if (isset($lasthe_ds) && isset($new_he_ds) && $lasthe_ds == $new_he_ds) {
                        $cararr[$lasthe_ds] += 1;
                    } else {
                        if (isset($lasthe_ds)) unset($lasthe_ds);
                    }
                    if (isset($lastwei_dx) && isset($new_wei_dx) && $lastwei_dx == $new_wei_dx) {
                        $cararr[$lastwei_dx] += 1;
                    } else {
                        if (isset($lastwei_dx)) unset($lastwei_dx);
                    }
                    if (isset($last_sb) && isset($new__sb) && $last_sb == $new__sb) {
                        $cararr[$last_sb] += 1;
                    } else {
                        if (isset($last_sb)) unset($last_sb);
                    }
                    if (isset($lasttema_dxds) && isset($new_tema_dxds) && $lasttema_dxds == $new_tema_dxds) {
                        $cararr[$lasttema_dxds] += 1;
                    } else {
                        if (isset($lasttema_dxds)) unset($lasttema_dxds);
                    }
                }
                if (!isset($lasthe_dx) && !isset($lastnum_dx) && !isset($lastnum_ds) && !isset($lasthe_ds) && !isset($lastwei_dx) && !isset($last_sb) && !isset($lasttema_dxds)) {
                    break;
                }
            }
            /*****往数组里面填写长龙记录*****/
            $al = ['zhengma1_', 'zhengma2_', 'zhengma3_', 'zhengma4_', 'zhengma5_', 'zhengma6_', 'tema_dxds_'];
            $b1 = ["da", "xiao", "dan", "shuang", "heda", "hexiao", "hedan", "heshuang", "weida", "weixiao", "red", "green", "blue", "dadan", "xiaodan", "dashuang", "xiaoshuang", "jiaqin", "yeshou"];
            for ($j = 11; $j < 30; $j++) {
                if ($cararr['ds_' . $j] > 1) $changlong_recoder[$al[$z] . $b1[$j - 11]] = $cararr['ds_' . $j];
                $cararr['ds_' . $j] = 0;
            }
            if (isset($lastnum_dx)) unset($lastnum_dx);
            if (isset($lastnum_ds)) unset($lastnum_ds);
            if (isset($lasthe_dx)) unset($lasthe_dx);
            if (isset($lasthe_ds)) unset($lasthe_ds);
            if (isset($lastwei_dx)) unset($lastwei_dx);
            if (isset($last_sb)) unset($last_sb);
            if (isset($lasttema_dxds)) unset($lasttema_dxds);
            if (isset($new_num_dx)) unset($new_num_dx);
            if (isset($new_num_ds)) unset($new_num_ds);
            if (isset($new_he_dx)) unset($new_he_dx);
            if (isset($new_he_ds)) unset($new_he_ds);
            if (isset($new_wei_dx)) unset($new_wei_dx);
            if (isset($new__sb)) unset($new__sb);
            if (isset($new_tema_dxds)) unset($new_tema_dxds);
            /**********/
        }
        /*****往gyhe里面填写长龙记录*****/
        for ($i = 0; $i < count($rk[0]); $i++) {
            $k = 0;$k2=0;
            for ($j = 0; $j < 6; $j++) {
                $k += intval($rk[$j][$i]);
                $k2 += intval($rk[$j][$i]%10);
            }
            if ($i == 0) {
                $lastnum_dx = $k > 149 ? 'ds_11' : 'ds_12';
                $lastnum_ds = $k % 2 == 0 ? 'ds_14' : 'ds_13';
                $lastwei_dx = $k2>29?'ds_19' : 'ds_20';
                $cararr[$lastnum_dx] = 1;
                $cararr[$lastnum_ds] = 1;
                $cararr[$lastwei_dx] = 1;
            } else {
                $new_dx = $k > 149 ? 'ds_11' : 'ds_12';
                $new_ds = $k % 2 == 0 ? 'ds_14' : 'ds_13';
                $new_wei_dx = $k2>29?'ds_19' : 'ds_20';

                if (isset($lastnum_dx) && $lastnum_dx == $new_dx) {
                    $cararr[$lastnum_dx] += 1;
                } else {
                    if (isset($lastnum_dx)) unset($lastnum_dx);
                }
                if (isset($lastnum_ds) && $lastnum_ds == $new_ds) {
                    $cararr[$lastnum_ds] += 1;
                } else {
                    if (isset($lastnum_ds)) unset($lastnum_ds);
                }
                if (isset($lastwei_dx) && $lastwei_dx == $new_wei_dx) {
                    $cararr[$lastwei_dx] += 1;
                } else {
                    if (isset($lastwei_dx)) unset($lastwei_dx);
                }
            }
            if (!isset($lastnum_dx) && !isset($lastnum_ds) && !isset($lastwei_dx) ) {
                break;
            }
        }
        if ($cararr['ds_11'] > 1) $changlong_recoder['zhengma_dxds_zongda'] = $cararr['ds_11'];
        if ($cararr['ds_12'] > 1) $changlong_recoder['zhengma_dxds_zongxiao'] = $cararr['ds_12'];
        if ($cararr['ds_13'] > 1) $changlong_recoder['zhengma_dxds_zongdan'] = $cararr['ds_13'];
        if ($cararr['ds_14'] > 1) $changlong_recoder['zhengma_dxds_zongshuang'] = $cararr['ds_14'];
        if ($cararr['ds_19'] > 1) $changlong_recoder['zhengma_dxds_zongweida'] = $cararr['ds_19'];
        if ($cararr['ds_20'] > 1) $changlong_recoder['zhengma_dxds_zongweixiao'] = $cararr['ds_20'];

        /*****往gyhe里面填写长龙记录 end*****/
        $str = ''; $bigclass='';
        $temp=[];
        $sub=[];
        $mingci = ['正码1', '正码2', '正码3', '正码4', '正码5', '正码6', '特码', '第八名', '第九名', '第十名'];
        $gyh = '总和';
        ///对统计数组进行排序start
        arsort($changlong_recoder);
        ///对统计数组进行排序end
        //console.log('chan2=',chan2);
        $a2 = ['zhengma1', 'zhengma2', 'zhengma3', 'zhengma4', 'zhengma5', 'zhengma6', 'tema_dxds_'];
        $b2 = ["da", "xiao", "dan", "shuang", "heda", "hexiao", "hedan", "heshuang", "weida", "weixiao", "red", "green", "blue", "dadan", "xiaodan", "dashuang", "xiaoshuang", "jiaqin", "yeshou"];
        $lei = ['大', '小', '单', '双', '合大', '合小', '合单', '合双', '尾大', '尾小', '红波', '绿波', '蓝波', '大单', '小单', '大双', '小双', '家禽', '野兽'];
        foreach ($changlong_recoder as $key => $val) {
            $leibie = explode('_', $key);
            $sub=[];
            if ($leibie[0] == 'zhengma') {
                if ($leibie[2] == 'zongda') {
                    $str = '正码-总大'; $cc='zongxiao'; $str2 = '正码-总小';
                } else if ($leibie[2] == 'zongxiao') {
                    $str = '正码-总小'; $cc='zongda'; $str2 = '正码-总大';
                } else if ($leibie[2] == 'zongdan') {
                    $str = '正码-总单'; $cc='zongshuang'; $str2 = '正码-总双';
                } else if ($leibie[2] == 'zongshuang') {
                    $str = '正码-总双'; $cc='zongdan'; $str2 = '正码-总单';
                }else if ($leibie[2] == 'zongweida') {
                    $str = '正码-总尾大'; $cc='zongweixiao'; $str2 = '正码-总尾小';
                }else if ($leibie[2] == 'zongweixiao') {
                    $str = '正码-总尾小'; $cc='zongweida'; $str2 = '正码-总尾大';
                }
                $bigclass='zhengma_dxds';
                $sub[0]['play_method']=$bigclass.'_'.$cc;
                $sub[0]['play_dsc']=$str2;
                $sub[0]['price']=floor($name_id[$bigclass.'_'.$cc]['price']* 100) / 100;//保留两位小数，且不四舍五入amountFormat($name_id[$bigclass.'_'.$cc]['price']);
                $sub[0]['id']=$name_id[$bigclass.'_'.$cc]['id'];
            } else if ($leibie[0] == 'tema') {
                $gyh = '特码';
                $bb = intval(array_search($leibie[2], $b2));
                $str = $gyh . '-' . $lei[$bb];
                $bigclass='tema_dxds';

                if($bb<10 && $bb%2==0){$cc = $bb+1;}
                else if($bb<10 && $bb%2==1){$cc = $bb-1;}
                else if($bb>12 && $bb%2==0){$cc = $bb-1;}
                else if($bb>12 && $bb%2==1){$cc = $bb+1;}
                if( $bb>9 && $bb<13 )
                {
                    if($bb==10){$cc=11; $cc1=12;}
                    else if($bb==11){$cc=10; $cc1=12;}
                    else if($bb==12){$cc=10; $cc1=11;}
                    $sub[0]['play_method'] = $bigclass . '_'.$b2[$cc];
                    $sub[0]['play_dsc'] = $gyh . '-' . $lei[$cc];
                    $sub[0]['price'] = floor($name_id[$bigclass . '_'.$b2[$cc]]['price']* 100) / 100;//保留两位小数，且不四舍五入amountFormat($name_id[$bigclass . '_'.$b2[$cc]]['price']);
                    $sub[0]['id']=$name_id[$bigclass . '_'.$b2[$cc]]['id'];

                    $sub[1]['play_method'] = $bigclass . '_'.$b2[$cc1];
                    $sub[1]['play_dsc'] = $gyh . '-' . $lei[$cc1];
                    $sub[1]['price'] = floor($name_id[$bigclass . '_'.$b2[$cc1]]['price']* 100) / 100;//保留两位小数，且不四舍五入amountFormat($name_id[$bigclass . '_'.$b2[$cc1]]['price']);
                    $sub[1]['id']=$name_id[$bigclass . '_'.$b2[$cc1]]['id'];
                }else {
                    $sub[0]['play_method'] = $bigclass . '_'.$b2[$cc];
                    $sub[0]['play_dsc'] = $gyh . '-' . $lei[$cc];
                    $sub[0]['price'] =floor($name_id[$bigclass . '_'.$b2[$cc]]['price']* 100) / 100;//保留两位小数，且不四舍五入 amountFormat($name_id[$bigclass .'_'. $b2[$cc]]['price']);
                    $sub[0]['id']=$name_id[$bigclass .'_'. $b2[$cc]]['id'];
                }
            } else if (intval(array_search($leibie[0], $a2)) >= 0) {
                $aa = intval(array_search($leibie[0], $a2));

                $bb = intval(array_search($leibie[1], $b2));
                $str = $mingci[$aa] . '-' . $lei[$bb];

                if($aa<6)$bigclass='zhengma_1to6';
                else $bigclass='tema_dxds';

                if($bb<10 && $bb%2==0){$cc = $bb+1;}
                else if($bb<10 && $bb%2==1){$cc = $bb-1;}
                else if($bb>12 && $bb%2==0){$cc = $bb-1;}
                else if($bb>12 && $bb%2==1){$cc = $bb+1;}
                if( $bb>9 && $bb<13 )
                {
                    if($bb==10){$cc=11; $cc1=12;}
                    else if($bb==11){$cc=10; $cc1=12;}
                    else if($bb==12){$cc=10; $cc1=11;}
                    $sub[0]['play_method'] = $a2[$aa] . '_'.$b2[$cc];
                    $sub[0]['play_dsc'] = $mingci[$aa] . '-' . $lei[$cc];
                    $sub[0]['price'] =floor($name_id[$a2[$aa] . '_'.$b2[$cc]]['price'] * 100) / 100;// amountFormat($name_id[$a2[$aa] . '_'.$b2[$cc]]['price']);//保留两位小数，且不四舍五入
                    $sub[0]['id']=$name_id[$a2[$aa] . '_'.$b2[$cc]]['id'];

                    $sub[1]['play_method'] = $a2[$aa] . '_'.$b2[$cc1];
                    $sub[1]['play_dsc'] = $mingci[$aa] . '-' . $lei[$cc1];
                    $sub[1]['price'] =floor($name_id[$a2[$aa] . '_'.$b2[$cc]]['price'] * 100) / 100;// amountFormat($name_id[$a2[$aa] . '_'.$b2[$cc1]]['price']);//保留两位小数，且不四舍五入
                    $sub[1]['id']=$name_id[$a2[$aa] . '_'.$b2[$cc1]]['id'];
                }else {
                    $sub[0]['play_method'] = $a2[$aa] . '_'.$b2[$cc];
                    $sub[0]['play_dsc'] = $mingci[$aa] . '-' . $lei[$cc];
                    $sub[0]['price'] = floor($name_id[$a2[$aa] . '_'.$b2[$cc]]['price'] * 100) / 100;//amountFormat($name_id[$a2[$aa] . '_'.$b2[$cc]]['price']);//保留两位小数，且不四舍五入
                    $sub[0]['id']=$name_id[$a2[$aa] . '_'.$b2[$cc]]['id'];
                }
            }
            //$temp .= $key . '=' . $val . ',' . $str . ';';
            $tempprice =floor($name_id[ $key ]['price'] * 100) / 100; //amountFormat($name_id[ $key ]['price']);//保留两位小数，且不四舍五入
            array_push($temp,["id"=>$name_id[ $key ]['id'],"type"=>$bigclass,"play_method"=>$key,"play_dsc"=>$str,"count"=>$val,'price'=>$tempprice,'pair'=>$sub]);
        }
        return $temp;
        //return ['detail' => $temp, 'game_name' => 'hklhc'];

    }
////////////////////////////////////////////////////chang long hklhc end
    public function imbet_result_yilou($curIndex,$game)
    {
        $name_id=[];
        $origin_id=0;
        /*$gameid = ['bjpk10','cqssc','xyft','hklhc','bjft','cqft','jnd28','jsk3','gd11x5','gdklsf'];
        $game = strtolower($game);
        $id = intval( array_search($game,$gameid) );
        $id +=1;*/
        $game = strtolower($game);
        $id = $this->get_game_id($game);
        $origin_id = $id;
        if( empty($name_id) )
        {
            $setting = db("th_game_setting")->where(['game_id' => $id, 'status' => ['gt', -1]])
                ->field('id,uname,min_odds,max_odds')->order('id asc,row asc')->select();
            foreach ($setting as $r) {
                $price = Thcommission::getInstance()->setType(config('commission_type'))->getOdds($curIndex, $r['min_odds'], $r['max_odds']);
                $name_id[ $r['uname'] ]=['id'=>$r['id'],'price'=>$price];
            }
        }
        $tt = [];
        $i = 0;
        $md2 =  db('th_game_result');
        $condition = [];
        $condition['A.game_id'] = ['eq', $id];
        $condition['A.state'] =1;// $md2::STATE_1;状态可从数据库获取
        $condition['A.status'] =1;// $md2::STATUS_1;状态可从数据库获取
        $order_by = 'A.id';
        $sort_by = 'desc';
        //$count = $md2->where($condition)->alias('A')->count();
        $t = $md2->alias('A')->where($condition)
            ->order("{$order_by} {$sort_by}")->limit(0, 100)->select();
        $darr = [];
        foreach ($t as $r) {
            $tt[$i] = ['game_name' => $r['game_name'], 'issue' => $r['issue'], 'number' => $r['number'], 'open_time' => $r['open_time']];
            $i++;
        }
        $rk = [[], [], [], [], [], [], [], [], [], []];
        foreach ($tt as $r) {
            $darr = explode(',', $r['number']);
            if($id==7)
            {
                $temp = 0;
                for ($i = 0; $i < count($darr); $i++) {
                    $temp += (int)$darr[$i];
                }
                array_push($rk[0], $temp);
            }
            else {
                for ($i = 0; $i < count($darr); $i++) {
                    array_push($rk[$i], $darr[$i]);
                }
            }
        }
        //dump($rk);die;
        //return $rk;
//////////////////////////////////////tongji yilou start
        $k = 0; $k2=0;
        $yilounums = [];
        $yilounums2 = [];
        $yilounums3 = [];
        $str='';
        $rklength = count($rk);
        $al = ['a','b','c','d','e','f','g','h','i','j'];
        $mingci = ['冠军','亚军','季军','第四名','第五名','第六名','第七名','第八名','第九名','第十名'];
        if($id==2 || $id==9 || $id==10 || $id==12 || $id==14) {
            $mingci = ['第一球', '第二球', '第三球', '第四球', '第五球', '第六球', '第七球', '第八球', '第九球', '第十球'];
        }
        for ($z = 0; $z < $rklength; $z++) {
            $mclength = count($rk[$z]);
            if($mclength<=0)break;
            /*for ($y = 0; $y < 10; $y++){
                if( $game=='bjpk10' || $game=='xyft' )$k2 = $y+1;
                else $k2 = $y;
                for ($x = 0; $x < $mclength; $x++){
                    $k = intval( $rk[$z][$x] );
                    if( $k==$k2 ){
                        break;
                    }
                }
                $bigclass = 'ball_'.($z+1);
                if( $game=='cqssc' ){
                    $play_method = $al[$z].($y+1);
                    $str = $mingci[$z].'-'.$y.'号';
                }
                else {
                    $play_method = $al[$z].$k2;
                    $str = $mingci[$z].'-'.$k2.'号';
                }
                $yilounums[$play_method] = $x;
                $newprice = amountFormat($name_id[ $play_method ]['price']);
                $yilounums2[$play_method] = ["id"=>$name_id[ $play_method ]['id'],"type"=>$bigclass,"play_method"=>$play_method,"play_dsc"=>$str,"count"=>$x,'price'=>$newprice];
            }*/
            if($id==2 || $id==12 || $id==14) {
                $start = 0; $end = 10;
            }
            else if($id==9){
                $start = 1; $end = 12;
            }
            else if($id==10){
                $start = 1; $end = 21;
            }
            else if($id==7){
                $start = 0; $end = 28;
            }
            else {
                $start = 1; $end = 11;
            }
            for ($y = $start; $y < $end; $y++) {
                for ($x = 0; $x < $mclength; $x++){
                    $k = intval( $rk[$z][$x] );
                    if( $k==$y ){
                        break;
                    }
                }
                if($id==7)$bigclass = 'ball_'.($z+3);
                else $bigclass = 'ball_'.($z+1);
                if( /*$game=='cqssc' || */$id==2 || $id==12 || $id==14){
                    $play_method = $al[$z].($y+1);
                    $str = $mingci[$z].'-'.$y.'号';
                }
                else if( /*$game=='jnd28'*/ $id==7 ){
                    $play_method = $al[$z+2].($y);
                    $str = '特码-'.$y.'号';
                }
                else {
                    $play_method = $al[$z].$y;
                    $str = $mingci[$z].'-'.$y.'号';
                }
                $yilounums[$play_method] = $x;
                $newprice = floor($name_id[ $play_method ]['price'] * 100) / 100;//amountFormat($name_id[ $play_method ]['price']);//保留两位小数，且不四舍五入
                $yilounums2[$play_method] = ["id"=>$name_id[ $play_method ]['id'],"type"=>$bigclass,"play_method"=>$play_method,"play_dsc"=>$str,"count"=>$x,'price'=>$newprice];
            }
        }
        arsort($yilounums);
        foreach ($yilounums as $key=>$val)
        {
            if( $yilounums2[$key]["count"]>1 ) {
                array_push($yilounums3, $yilounums2[$key]);
            }
        }
        return $yilounums3;
//////////////////////////////////////tongji yilou end
    }
    public function get_game_id($game)
    {
        $game =  db('th_game')->where('sname',$game)->find();
        return $game['id'];
    }
////////////////////////////only for test end -->

}

