<?php
namespace Fuzhi\Controller;

require_once dirname(__FILE__) . "/../BLL/LottoryDataMgr.php";
class EmptyController extends HomeController
{
    public function _empty($name)
    {

        $ctrlName = CONTROLLER_NAME;
        $ctrlName = strtolower($ctrlName);
        $name = strtolower($name);

		//echo $name;
		switch($name){
		     case 'kaijiang':
			 $title_c = "开奖记录-";
			 break;
			 case 'merge':
			 $title_c = "综合版面-";
			 break;
			 case 'yilou':
			 $title_c = "号码遗漏统计-";
			 break;
			 case 'luzhulonghu':
			 $title_c = "龙虎路珠-";
			 break;
			 case 'luzhuleftorright':
			 $title_c = "号码前后路珠-";
			 break;
			 case 'guanyahestat':
			 $title_c = "冠、亚和路珠-";
			 break;
			 case 'luzhubigorsmall':
			 $title_c = "单双大小路珠-";
			 break;
			 case 'numberrulestat':
			 $title_c = "号码规律统计-";
			 break;
			 case 'opencodeanalysis':
			 $title_c = "今日号码统计-";
			 break;
			 case 'ballstat':
			 $title_c = "单双大小历史-";
			 break;
			 case 'numberstat':
			 $title_c = "龍虎历史-";
			 break;
			 case 'betgame':
			 $title_c = "免费参考-";
			 break;
			 case 'shipin':
			 $title_c = "视频直播-";
			 break;
			 case 'coldhotnumber':
			 $title_c = "冷热码分析-";
			 break;
			 case 'shdd':
			 $title_c = "杀号定胆-";
			 break;
			 case 'omitdata':
			 $title_c = "遗漏大数据-";
			 break;
			 case 'twosidedstat':
			 $title_c = "两面数据统计-";
			 break;
			 case 'positionanalyze':
			 $title_c = "免费多选分析-";
			 break;
			 case 'zoushitu':
			 $title_c = "横版走势图-";
			 break;
			 case 'luzhunumber':
			 $title_c = "号码路珠-";
			 break;
			 case 'luzhutotal':
			 $title_c = "总和路珠-";
			 break;
			 default :
			 $title_c = "";
			 break;
			 
		}
        $this->assign('lottory', $ctrlName);
        if ($ctrlName == 'pk10' || $ctrlName == 'cqssc' || $ctrlName == 'gdkl10' || $ctrlName == 'jssc' || $ctrlName == 'jsk3' || $ctrlName == 'kl8' || $ctrlName == 'tjssc' || $ctrlName == 'jsssc'  || $ctrlName == 'xyft'  || $ctrlName == 'fc3d' || $ctrlName == 'pl3' || $ctrlName == 'pl3' || $ctrlName == 'gd11x5' || $ctrlName == 'shssl') {
            $lottoryName = '';
            $totalExpect = 0;
            if ($ctrlName == 'pk10') {
                $this->title = $title_c.C("WEB_SITE_PK10_TITLE") . ' - ' . C('WEB_SITE_TITLE');
                $this->keyword = C("WEB_SITE_PK10_KEYWORDS") . ' - ' . C('WEB_SITE_KEYWORD');
                $this->description = C("WEB_SITE_PK10_DESCR");
                $lottoryName = "北京赛车pk10";
                $totalExpect = 179;
            } else {
                if ($ctrlName == 'cqssc') {
                    $this->title = $title_c.C("WEB_SITE_cqssc_TITLE") . ' - ' . C('WEB_SITE_TITLE');
                    $this->keyword = C("WEB_SITE_cqssc_KEYWORDS") . ' - ' . C('WEB_SITE_KEYWORD');
                    $this->description = C("WEB_SITE_cqssc_DESCR");
                    $lottoryName = "重庆时时彩";
                    $totalExpect = 120;
                } else {
                    if ($ctrlName == 'gdkl10') {
                        $this->title = $title_c.C("WEB_SITE_GDKL10_TITLE") . ' - ' . C('WEB_SITE_TITLE');
                        $this->keyword = C("WEB_SITE_GDKL10_KEYWORDS") . ' - ' . C('WEB_SITE_KEYWORD');
                        $this->description = C("WEB_SITE_GDKL10_DESCR");
                        $lottoryName = "广东快乐十分";
                        $totalExpect = 84;
                    } else {
                        if ($ctrlName == 'kl8') {
                            $this->title = $title_c.C("WEB_SITE_KL8_TITLE") . ' - ' . C('WEB_SITE_TITLE');
                            $this->keyword = C("WEB_SITE_KL8_KEYWORDS") . ' - ' . C('WEB_SITE_KEYWORD');
                            $this->description = C("WEB_SITE_KL8_DESCR");
                            $lottoryName = "北京快乐8";
                            $totalExpect = 179;
                        } else {
                            if ($ctrlName == 'tjssc') {
                                $this->title = $title_c.C("WEB_SITE_tjssc_TITLE").' - ' . C('WEB_SITE_TITLE');
                                $this->keyword = C("WEB_SITE_tjssc_KEYWORDS") . ' - ' . C('WEB_SITE_KEYWORD');
                                $this->description = C("WEB_SITE_tjssc_DESCR");
                                $lottoryName = "天津时时彩";
                                $totalExpect = 84;
                            } else {
								if ($ctrlName == 'jsssc') {
                                $this->title = $title_c.'极速时时彩开奖视频_极速时时彩开奖号码_极速时时彩开奖记录 - ' . C('WEB_SITE_TITLE');
                                $this->keyword = C("WEB_SITE_jsssc_KEYWORDS") . ' - ' . C('WEB_SITE_KEYWORD');
                                $this->description = C("WEB_SITE_jsssc_DESCR");
                                $lottoryName = "极速时时彩";
                                $totalExpect = 120;
                            } else {
                                if ($ctrlName == 'jssc') {
                                    $this->title = $title_c.C("WEB_SITE_JSSC_TITLE") . ' - ' . C('WEB_SITE_TITLE');
                                    $this->keyword = C("WEB_SITE_JSSC_KEYWORDS") . ' - ' . C('WEB_SITE_KEYWORD');
                                    $this->description = C("WEB_SITE_JSSC_DESCR");
                                    $lottoryName = "极速赛车";
                                    $totalExpect = 179;
                                } else {
                                    if ($ctrlName == 'jsk3') {
                                        $this->title = $title_c.C("WEB_SITE_JSK3_TITLE") . ' - ' . C('WEB_SITE_TITLE');
                                        $this->keyword = C("WEB_SITE_JSK3_KEYWORDS") . ' - ' . C('WEB_SITE_KEYWORD');
                                        $this->description = C("WEB_SITE_JSK3_DESCR");
                                        $lottoryName = "江苏骰宝";
                                        $totalExpect = 82;
                                    } else {
                                        if ($ctrlName == 'shssl') {
                                            $this->title = $title_c.C("WEB_SITE_SHSSL_TITLE") . ' - ' . C('WEB_SITE_TITLE');
                                            $this->keyword = C("WEB_SITE_SHSSL_KEYWORDS") . ' - ' . C('WEB_SITE_KEYWORD');
                                            $this->description = C("WEB_SITE_SHSSL_DESCR");
                                            $lottoryName = "上海时时乐";
                                            $totalExpect = 23;
                                        }else{
											if ($ctrlName == 'gd11x5') {
                                $this->title = $title_c.'广东11选5开奖视频_广东11选5开奖号码_广东11选5开奖记录 - ' . C('WEB_SITE_TITLE');
                                $this->keyword = C("WEB_SITE_xjssc_KEYWORDS") . ' - ' . C('WEB_SITE_KEYWORD');
                                $this->description = C("WEB_SITE_xjssc_DESCR");
                                $lottoryName = "广东11选5";
                                $totalExpect = 84;
											}else{
												if ($ctrlName == 'xyft') {
                                $this->title = $title_c.'幸运飞艇开奖视频_幸运飞艇开奖号码_幸运飞艇开奖记录 - ' . C('WEB_SITE_TITLE');
                                $this->keyword = C("WEB_SITE_xjssc_KEYWORDS") . ' - ' . C('WEB_SITE_KEYWORD');
                                $this->description = C("WEB_SITE_xjssc_DESCR");
                                $lottoryName = "幸运飞艇";
                                $totalExpect = 180;
											}else{
												if ($ctrlName == 'fc3d') {
                                $this->title = $title_c.'福彩3d开奖视频_福彩3d开奖号码_福彩3d开奖记录 - ' . C('WEB_SITE_TITLE');
                                $this->keyword = C("WEB_SITE_xjssc_KEYWORDS") . ' - ' . C('WEB_SITE_KEYWORD');
                                $this->description = C("WEB_SITE_xjssc_DESCR");
                                $lottoryName = "福彩3d";
                                $totalExpect = 1;
												}else{
													if ($ctrlName == 'pl3') {
                                $this->title = $title_c.'排列3开奖视频_排列3开奖号码_排列3开奖记录 - ' . C('WEB_SITE_TITLE');
                                $this->keyword = C("WEB_SITE_xjssc_KEYWORDS") . ' - ' . C('WEB_SITE_KEYWORD');
                                $this->description = C("WEB_SITE_xjssc_DESCR");
                                $lottoryName = "排列3";
                                $totalExpect = 1;
												}
												}
												
											}
											}
										}
                                    }
                                }
                            }}
                        }
                    }
                }
            }
            $this->assign('title', $this->title);
            $this->assign('keyword', $this->keyword);
            $this->assign('description', $this->description);
            $this->assign('lottoryName', $lottoryName);
            $this->assign('totalExpect', $totalExpect);
            if (ACTION_NAME == "index") {
                $id = 0;

                switch ($ctrlName) {
                    case 'pk10':
					    $swfurl = "http://f.907794.com/pk10/Preloader.swf";
                        $id = 42;
                        break;
                    case 'jssc':
                        $swfurl = "http://f.907794.com/pk10/Preloader.swf";
                        $id = 53;
                        break;
                    case 'cqssc':
					    $swfurl = "http://f.907794.com/shishicai/shishicai_self.swf";
                        $id = 43;
                        break;
						case 'jsssc':
						$swfurl = "http://f.907794.com/pk10/Preloader.swf";
                        $id = 54;
                        break;
						case 'gd11x5':
						$swfurl = "http://f.907794.com/pk10/Preloader.swf";
                        $id = 48;
                        break;
						case 'xyft':
						$swfurl = "http://f.907794.com/pk10/Preloader.swf";
                        $id = 49;
                        break;
						case 'fc3d':
						$swfurl = "http://f.907794.com/pk10/Preloader.swf";
                        $id = 50;
                        break;
						case 'pl3':
						$swfurl = "http://f.907794.com/pk10/Preloader.swf";
                        $id = 51;
                        break;
                    case 'gdkl10':
					    $swfurl = "http://f.907794.com/gdkl10/horserace_self.swf";
                        $id = 2;
                        break;
//                    case 'xync':
//					    $swfurl = "http://f.907794.com/xync/luckyfarm.swf";
//                        $id = 45;
//                        break;
                    case 'jsk3':
                        $id = 39;
						$swfurl = "http://f.907794.com/jsk3/jsk3_self.swf";
                        break;
                    case 'kl8':
                        $id = 41;
						$swfurl = "http://f.907794.com/kl8/Preloader.swf";
                        break;
                    case 'tjssc':
					    $swfurl = "http://f.907794.com/pk10/Preloader.swf";
                        $id = 40;
                        break;
                    case 'shssl':
					    $swfurl = "http://f.907794.com/pk10/Preloader.swf";
                        $id = 44;
                        break;
                    default:
					    $swfurl = "http://f.907794.com/pk10/Preloader.swf";
                        $id = 43;
                        break;
                }
                $lists = D('Document')->lists($id);
                $articalfirst = null;
                if (count($lists) >= 1) {
                    $articalfirst = $lists[0];
                }
                $this->assign('artical_first', $articalfirst);
                $this->assign('lists', array_slice($lists, 1, 5));
                $this->assign('page', D('Document')->page);
            }
            if (substr($name, strlen($name) - 3) == '.do') {
                if (IS_POST) {
                    $param = @file_get_contents("php://input");
                    $type = substr(__SELF__, stripos(__SELF__, CONTROLLER_NAME), strlen(CONTROLLER_NAME));
                    $page = substr(__SELF__, stripos(__SELF__, ACTION_NAME), strlen(ACTION_NAME));
                } else {
                    $pos = stripos(__SELF__, '?');
                    $param = '';
                    if ($pos != false) {
                        $param = substr(__SELF__, $pos + 1);
                    }
                    $type = substr(__SELF__, stripos(__SELF__, CONTROLLER_NAME), strlen(CONTROLLER_NAME));
                    $page = substr(__SELF__, stripos(__SELF__, ACTION_NAME), strlen(ACTION_NAME));
                }
                echo \Fuzhi\BLL\LottoryDataMgr::getAwardData($type, $page, $param);
            } else {
                if ($name == "shipin") {
				 switch ($ctrlName) {
                    case 'pk10':
					    $swfurl = "Application/Fuzhi/View/shipin/new_pk10.html";
						//http://www.1396cp.me/video/bjpk10/bjpk10.swf
						//http://pk10.041.net/v/pk10.swf
						//http://f.907794.com/pk10/Preloader.swf
                        break;
                    case 'cqssc':
					    $swfurl = "Application/Fuzhi/View/shipin/new_cqssc.html";
						//http://www.1396cp.me/video/cqssc/cqssc.swf
						//http://f.907794.com/shishicai/shishicai_self.swf
                        break;
//						case 'xjssc':
//						$swfurl = "Application/Fuzhi/View/shipin/new_xjssc.html";
//                        break;
						case 'gd11x5':
						$swfurl = "Application/Fuzhi/View/shipin/new_gd11x5.html";
                        break;
						case 'xyft':
						$swfurl = "Application/Fuzhi/View/shipin/new_xyft.html";
						//http://f.907794.com/xyft/SpeedBoat.swf
                        break;
						case 'fc3d':
						$swfurl = "Application/Fuzhi/View/shipin/new_fc3d.html";
                        break;
						case 'pl3':
						$swfurl = "Application/Fuzhi/View/shipin/new_pl3.html";
                        break;
                    case 'gdkl10':
					    $swfurl = "Application/Fuzhi/View/shipin/new_gdkl10.html";
						//http://www.1396cp.me/video/gdklsf/gdklsf.swf
						//http://f.907794.com/gdkl10/horserace_self.swf
                        break;
//                    case 'xync':
//					    $swfurl = "Application/Fuzhi/View/shipin/new_xync.html";
//                        break;
                    case 'jsk3':
						$swfurl = "Application/Fuzhi/View/shipin/new_jsk3.html";
                        break;
                    case 'kl8':
						$swfurl = "Application/Fuzhi/View/shipin/new_kl8.html";
                        break;
                    case 'tjssc':
					    $swfurl = "Application/Fuzhi/View/shipin/new_tjssc.html";
                        break;
                    case 'shssl':
					    $swfurl = "http://rescsj.56hx.com/flash/shssl/shssl.swf?v=20140805";
                        break;
                     case 'jsssc':
                         $swfurl = "Application/Fuzhi/View/shipin/new_jsssc.html";
                         break;
                     case 'jssc':
                         $swfurl = "Application/Fuzhi/View/shipin/new_jssc.html";
                         break;
                    default:
					    $swfurl = "Application/Fuzhi/View/shipin/new_pk10.html";
                        break;
                } 
				    //$swfurl = "http://rescsj.56hx.com/flash/$ctrlName/$ctrlName.swf?v=20140805";
					$this->assign('swfurl', $swfurl);
                    $this->assign('lottory', $ctrlName);
                    $this->display("{$name}:index");
                } else {
                    $this->display("{$ctrlName}:{$name}");
                }
            }
        } else {
            if ($ctrlName == 'recommend' || $ctrlName == 'missing' || $ctrlName == 'webnews' || $ctrlName == 'lotteryblock') {
				//die("ss");
                if (IS_POST) {
                    $param = @file_get_contents("php://input");
                    $type = substr(__SELF__, stripos(__SELF__, CONTROLLER_NAME), strlen(CONTROLLER_NAME));
                    $page = substr(__SELF__, stripos(__SELF__, ACTION_NAME), strlen(ACTION_NAME));
                } else {
                    $pos = stripos(__SELF__, '?');
                    $param = '';
                    if ($pos != false) {
                        $param = substr(__SELF__, $pos + 1);
                    }
                    $type = substr(__SELF__, stripos(__SELF__, CONTROLLER_NAME), strlen(CONTROLLER_NAME));
                    $page = substr(__SELF__, stripos(__SELF__, ACTION_NAME), strlen(ACTION_NAME));
                }
                echo \Fuzhi\BLL\LottoryDataMgr::getAwardData($type, $page, $param);
            } else {
                if ($ctrlName == 'jiqiao') {
                    $this->assign('lottory', $name);
                    $id = 0;
                    switch ($name) {
                        case 'pk10':
                            $JiQiaotitle = '北京赛车pk10技巧';
                            $id = 42;
                            break;
                        case 'cqssc':
                            $JiQiaotitle = '重庆时时彩技巧';
                            $id = 43;
                            break;
                        case 'gdkl10':
                            $JiQiaotitle = '广东快乐十分技巧';
                            $id = 2;
                            break;
//                        case 'xync':
//                            $JiQiaotitle = '幸运农场技巧';
//                            $id = 45;
//                            break;
                        case 'jsk3':
                            $JiQiaotitle = '江苏快3技巧';
                            $id = 39;
                            break;
                        case 'kl8':
                            $JiQiaotitle = '快乐8技巧';
                            $id = 41;
                            break;
                        case 'tjssc':
                            $JiQiaotitle = '天津时时彩技巧';
                            $id = 40;
                            break;
//							 case 'xjssc':
//                            $JiQiaotitle = '新疆时时彩技巧';
//                            $id = 47;
//                            break;
							case 'gd11x5':
                            $JiQiaotitle = '广东11选5技巧';
                            $id = 48;
                            break;
							case 'xyft':
                            $JiQiaotitle = '幸运飞艇技巧';
                            $id = 49;
                            break;
//							case 'fc3d':
//                            $JiQiaotitle = '福彩3d彩技巧';
//                            $id = 50;
//                            break;
							case 'pl3':
                            $JiQiaotitle = '排列3技巧';
                            $id = 51;
                            break;
                        case 'shssl':
                            $JiQiaotitle = '上海时时乐技巧';
                            $id = 44;
                            break;
                        case 'jsssc':
                            $JiQiaotitle = '極速時時彩技巧';
                            $id = 53;
                            break;
                        case 'jssc':
                            $JiQiaotitle = '極速賽車技巧';
                            $id = 54;
                            break;
                        default:
                            $JiQiaotitle = '重庆时时彩技巧';
                            $id = 43;
                            break;
                    }
                    $this->assign('title', $JiQiaotitle.'-'.$this->title);
					$this->assign('JiQiaotitle', $JiQiaotitle);
                    $perPage = 10;
                    $file = __SELF__;
                    $file = substr($file, 1);
                    $file = strtolower($file);
                    $file = str_replace(".html", "", $file);
                    $aid = substr($file, strrpos($file, '/') + 1);
                    if ($aid != false && substr($aid, 0, 5) != 'index' && empty($_GET['p'])) {
                        if (!($aid && is_numeric($aid))) {
                            $this->error('文档ID错误！');
                        }
                        $Document = D('Document');
                        $info = $Document->detail($aid);
                        if (!$info) {
                            $this->error($Document->getError());
                        }
                        $map = array('id' => $id);
                        $Document->where($map)->setInc('view');
                        $this->assign('info', $info);
                        $lists = D('Document')->page(!empty($_GET["p"]) ? $_GET["p"] : 1, 5)->lists($id);
                        $this->assign('lists', $lists);
						$this->assign('title', $info['title'].'-'.$this->title);
						$module = M();
						$list_pk10 = $module->query("SELECT * FROM lot_data where dat_type=20 order by dat_open_time desc limit 4");
        				$this->assign('list_pk10', $list_pk10);

                        $list_jssc = $module->query("SELECT * FROM lot_data where dat_type=39 order by dat_open_time desc limit 4");
                        $this->assign('list_jssc', $list_jssc);
		
						$list_cqssc = $module->query("SELECT * FROM lot_data where dat_type=1 order by dat_open_time desc limit 4");
        				$this->assign('list_cqssc', $list_cqssc);
		
						$list_gdkl10 = $module->query("SELECT * FROM lot_data where dat_type=21 order by dat_open_time desc limit 4");
        				$this->assign('list_gdkl10', $list_gdkl10);
		
						$list_xync = $module->query("SELECT * FROM lot_data where dat_type=18 order by dat_open_time desc limit 4");
						$this->assign('list_xync', $list_xync);
		
						$list_jsssc = $module->query("SELECT * FROM lot_data where dat_type=40 order by dat_open_time desc limit 4");
						$this->assign('list_jsssc', $list_jsssc);
		
						$list_tjssc = $module->query("SELECT * FROM lot_data where dat_type=3 order by dat_open_time desc limit 4");
					    $this->assign('list_tjssc', $list_tjssc);
		
						$list_gd11x5 = $module->query("SELECT * FROM lot_data where dat_type=6 order by dat_open_time desc limit 4");
						$this->assign('list_gd11x5', $list_gd11x5);
		
						$list_jsk3 = $module->query("SELECT * FROM lot_data where dat_type=22 order by dat_open_time desc limit 4");
						$this->assign('list_jsk3', $list_jsk3);	
						
						$lists = D('Document')->page(!empty($_GET["p"]) ? $_GET["p"] : 1, $perPage)->lists($id);
                        $page = new \Think\Page(get_list_count($id), $perPage);
                        $_page = $page->show();
                        $_page = str_replace("/index.php?s=", "", $_page);
                        $this->assign('lists', $lists);
                        $this->assign('_page', $_page);
						
                        $this->display("jiqiao/article");
                    } else {
                        $lists = D('Document')->page(empty($_GET["p"]) ? 1 : $_GET["p"], $perPage)->lists($id);
                        $page = new \Think\Page(get_list_count($id), $perPage);
                        $_page = $page->show(true);
                        $this->assign('lists', $lists);
                        $this->assign('_page', $_page);
						$module = M();
						$list_pk10 = $module->query("SELECT * FROM lot_data where dat_type=20 order by dat_open_time desc limit 4");
        				$this->assign('list_pk10', $list_pk10);

                        $list_jssc = $module->query("SELECT * FROM lot_data where dat_type=39 order by dat_open_time desc limit 4");
                        $this->assign('list_jssc', $list_jssc);
		
						$list_cqssc = $module->query("SELECT * FROM lot_data where dat_type=1 order by dat_open_time desc limit 4");
        				$this->assign('list_cqssc', $list_cqssc);
		
						$list_gdkl10 = $module->query("SELECT * FROM lot_data where dat_type=21 order by dat_open_time desc limit 4");
        				$this->assign('list_gdkl10', $list_gdkl10);
		
						$list_xync = $module->query("SELECT * FROM lot_data where dat_type=18 order by dat_open_time desc limit 4");
						$this->assign('list_xync', $list_xync);
		
						$list_jsssc = $module->query("SELECT * FROM lot_data where dat_type=40 order by dat_open_time desc limit 4");
						$this->assign('list_jsssc', $list_jsssc);
		
						$list_tjssc = $module->query("SELECT * FROM lot_data where dat_type=3 order by dat_open_time desc limit 4");
					    $this->assign('list_tjssc', $list_tjssc);
		
						$list_gd11x5 = $module->query("SELECT * FROM lot_data where dat_type=6 order by dat_open_time desc limit 4");
						$this->assign('list_gd11x5', $list_gd11x5);
		
						$list_jsk3 = $module->query("SELECT * FROM lot_data where dat_type=22 order by dat_open_time desc limit 4");
						$this->assign('list_jsk3', $list_jsk3);
                        $this->display("jiqiao/index");
                    }
                } else {
                    if ($ctrlName == 'common') {
                        $this->display("{$ctrlName}/feedback");
                    } else {
                        if ($ctrlName == 'gallery') {
                            $file = __SELF__;
                            $file = substr($file, 1);
                            $file = strtolower($file);
                            $file = str_replace(".html", "", $file);
                            $aid = substr($file, strrpos($file, '/') + 1);
                            if ($aid != false && $name != 'index') {
                                if (!($aid && is_numeric($aid))) {
                                    $this->error('文档ID错误！');
                                }
                                $Document = D('Document');
                                $info = $Document->detail($name);
                                if (!$info) {
                                    $this->error($Document->getError());
                                }
                                $map = array('id' => $name);
                                $Document->where($map)->setInc('view');
                                $pic = get_cover($info["cover_id"]);
                                $info['cover_path'] = $pic["path"];
                                $this->assign('info', $info);			
                                $this->display("{$ctrlName}/article");
                            } else {
                                $perPage = 30;
                                $lists = D('Document')->page(!empty($_GET["p"]) ? $_GET["p"] : 1, $perPage)->lists(46);
                                foreach ($lists as $seq => $doc) {
                                    $pic = get_cover($doc["cover_id"]);
                                    $lists[$seq]['cover_path'] = $pic["path"];
                                }
                                $page = new \Think\Page(get_list_count(46), $perPage);
                                $_page = $page->show();
                                $_page = str_replace("/index.php?s=", "", $_page);
                                $this->assign('lists', $lists);
                                $this->assign('_page', $_page);
                                $this->display("{$ctrlName}/index");
                            }
                        } else {
                            if ($ctrlName == 'list.php') {
                                $ajaxHandler = wjStrFilter(I('get.ajaxHandler'));
                                if ($ajaxHandler == 'GetPk10AwardData' || $ajaxHandler == 'GetPk10AnalysisData') {
                                    echo \Fuzhi\BLL\LottoryDataMgr::getAwardData('pk10', 'GetPk10AnalysisData', null);
                                }
                            } else {
                                if ($ctrlName == 'check.php') {
                                    echo 'fuzhi.biz';
                                } else {

                                    if ($ctrlName == 'sitemap') {
                                        $this->display("sitemap/index");
                                    } else {
                                        echo $ctrlName . '->' . $name;

                                        header("HTTP/1.0 404 Not Found");
                                        $this->display('Common:404');
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}