<?php

namespace Fuzhi\BLL;

require_once "RemoteDataMgr.php";
require_once "ZstAnalyser.php";
require_once "ConfigMgr.php";

class LottoryDataMgr
{
    private static $_instance = null;

    function __construct()
    {
        header("Access-Control-Allow-Origin: *");
        header('Access-Control-Allow-Methods:OPTIONS, GET, POST'); // 允许option，get，post请求
        header('Access-Control-Allow-Headers:x-requested-with'); // 允许x-requested-with请求头
        header('Access-Control-Max-Age:86400'); // 允许访问的有效期
        date_default_timezone_set('Asia/Shanghai');
    }

    public static function getInstance()
    {

        if (is_null(self::$_instance) || isset(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    private $prename = 'lot_';
    public $types;

    static function getAwardData($type, $page, $param)
    {


        //print_r($type);die;
        $ret = '';
        $ver = '1.1';
        if (S('lanmaocai_version') != $ver) {
            $module = M();
            $cfg = new ConfigMgr();
            $cfg->setValue($module, 'pk10', 'vc', $ver);
            S('lanmaocai_version', $ver, array('type' => 'file', 'expire' => 60 * 60 * 24 * 10));
        }
        //print_r($cfg);die;
        $ret = LottoryDataMgr::getInstance()->getData($type, $page, $param);
        if (!($ret === false) && $ret != '') {
            return $ret;
        }
        $url = "http://www.cp166.com/{$type}/{$page}";

        $urlAll = $url;
        $cacheName = $url;
        $postParam = '';
        if (IS_POST) {
            $postParam = $param;
        } else {
            if ($param != "") {
                $urlAll = $url . "?" . $param;
            }
        }
        if ($page == "kaijiang.do") {
            $ret = RemoteDataMgr::getData($urlAll, $urlAll);
        } else {
            if (substr($page, strlen($page) - 13) == 'AwardTimes.do') {
                $ret = RemoteDataMgr::getData($urlAll);
            } else {
                if ($page == "twoSidedStat.do") {
                    $ret = RemoteDataMgr::getData($urlAll, "", $cacheName . I('get.id'));
                } else {
                    if ($page == "numbertrendData.do" || $page == "positiontrenddata.do") {
                        http:
                        $ret = RemoteDataMgr::getData($urlAll, "", $cacheName . I('get.ball') . ',' . I('get.count'));
                    } else {
                        if ($page == "luZhuTongji.do" || $page == "findTwosideCount.do") {
                            $ret = RemoteDataMgr::getData($urlAll, "", $cacheName . I('get.type') . ',' . I('get.date'));
                        } else {
                            if ($page == "luZhuLonghu.do" || $page == "luZhuTotal.do" || $page == "getHaomaLuData.do" || $page == "getLonghuLuzhuData.do" || $page == "guanyaLuzhubseo.do" || $page == "eobsLuzhu.do") {

                                $ret = RemoteDataMgr::getData($urlAll, "", $cacheName . I('get.date'));
                            } else {
                                if ($page == "getTodayNum.do") {
                                    $ret = RemoteDataMgr::getData($urlAll, "", $cacheName . I('get.gameId'));
                                } else {
                                    if ($page == "getDataList.do") {
                                        $ret = RemoteDataMgr::getData($urlAll, "", $cacheName . I('get.num') . ',' . I('get.count'));
                                    } else {
                                        if ($page == "getAwardList.do") {
                                            $ret = RemoteDataMgr::getData($urlAll, "", $cacheName . I('get.count'));
                                        } else {
                                            if ($page == "positionTrend.do" || $page == "numberTrend.do" || $page == "guanyaTrend.do") {
                                                $ret = RemoteDataMgr::getData($urlAll, "", $cacheName . I('get.count') . ',' . I('get.ball') . ',' . I('get.isToday'));
                                            } else {
                                                if ($page == "samePositionTrend.do" || $page == "sameNoTrend.do" || $page == "sameSumTrend.do") {
                                                    $ret = RemoteDataMgr::getData($urlAll, "", $cacheName . I('get.id') . ',' . I('get.pid'));
                                                } else {
                                                    if (IS_POST) {
                                                        $ret = RemoteDataMgr::getData($urlAll, $postParam, $urlAll . $postParam);
                                                    } else {
                                                        $ret = RemoteDataMgr::getData($urlAll, "", $cacheName);
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
            }
        }
        return $ret;
    }

    private function getLottoryByCnt($module, $lotType, $count)
    {
        $lotType = (int)$lotType;
        $count = (int)$count;
        $ret = $module->query("select replace(dat_expect,'-','') dat_expect,dat_codes,dat_open_time from {$this->prename}data where dat_type=%d order by dat_expect desc limit %d", $lotType, $count);

        if ($ret === false) {
            $ret = array();
        }
        return $ret;
    }

    private function getLottoryByDate($module, $lotType, $date, $count = null, $pages = 0, $offset = 0)
    {
        if (empty($count)) {
            $count = 50;
        }
        $lotType = (int)$lotType;
        $date = date('Y-m-d', strtotime($date));
        $yestoday = date("Y-m-d", strtotime("-$date day"));
        if ($lotType == 43) {
            $startTime = strtotime($yestoday . ' 21:00:00');
            $endTime = strtotime($date . ' 19:00:00');
        } else {
            $startTime = strtotime($date . ' 00:00:00');
            $endTime = strtotime($date . ' 23:59:59');
        }

//        print_r($pages);
        if ($pages != 0 && $offset != 0) {
            /* $pages  = 1;
             $offset = 10;*/
            $counts = ($pages - 1) * $offset . "," . $offset;
            $ret = $module->query("select replace(dat_expect,'-','') dat_expect,dat_codes,dat_open_time from {$this->prename}data where dat_type=%d and dat_open_time between %d and %d order by dat_expect desc limit $counts", $lotType, $startTime, $endTime);
        } else {
            $ret = $module->query("select replace(dat_expect,'-','') dat_expect,dat_codes,dat_open_time from {$this->prename}data where dat_type=%d and dat_open_time between %d and %d order by dat_expect desc limit %d", $lotType, $startTime, $endTime, $count);
        }

        if ($ret === false) {
            $ret = array();
        }
        return $ret;
    }

    private function getData($type, $page, $param)
    {
//        findLonghulishi.doprint_r($type);echo "</br>";print_r($page);echo "</br>";print_r($param);die;
        $ret = false;
        $lotType = $this->getLotTypeByType($type);
        $expire = 2;

        if ($page == 'getHistoryData.do') {

            $ret = $this->getHistoryData($type, $page, $lotType, $expire);
        } else {
            if ($page == "numbertrendData.do") {
                $ret = $this->getNumberTrendData($type, $page, $lotType, $expire);
            } else {
                //print_r("123");die;
                if ($page == 'getPk10AwardData.do' || $page == 'getPk10AwardTimes.do' || $page == 'getCqsscAwardData.do' || $page == 'getCqsscAwardTimes.do' || $page == 'getGdkl10AwardData.do' || $page == 'getGdkl10AwardTimes.do' || $page == 'getJsk3AwardData.do' || $page == 'getJsk3AwardTimes.do' || $page == 'gettjsscAwardData.do' || $page == 'getxjsscAwardData.do' || $page == 'getfc3dAwardData.do' || $page == 'getpl3AwardData.do' || $page == 'getgd11x5AwardData.do' || $page == 'gettjsscAwardTimes.do' || $page == 'getpl3AwardTimes.do' || $page == 'getfc3dcAwardTimes.do' || $page == 'getxjsscAwardTimes.do' || $page == 'getShsslAwardData.do' || $page == 'getShsslAwardTimes.do' || $page == 'getXyncAwardData.do' || $page == 'getXyncAwardTimes.do' || $page == 'getkl8AwardData.do' || $page == 'getkl8AwardTimes.do') {
                    if ($type == 'cqft') {
                        $type = 'cqssc';
                        $lotType = 1;
                    } elseif ($type == 'bjft') {
                        $type = 'pk10';
                        $lotType = 20;
                    }
                    $ret = $this->getAwardTime($type, $page, $lotType, $expire);
                } else {
                    //print_r("123");die;
                    if ($page == "GetPk10AnalysisData") {
                        $ret = $this->getPk10AnalysisData($type, $page, $lotType, $expire);
                    } else {
                        if ($page == "getDataListByAll.do") {
                            $ret = $this->getDataListByAll($type, $page, $lotType, $expire);
                        } else {
                            if ($page == 'getBallStat.do') {
                                $ret = $this->getBallStat($type, $page, $lotType, $expire);
                            } else {
                                if ($page == 'getNumberStat.do') {
                                    $ret = $this->getNumberStat($type, $page, $lotType, $expire);
                                } else {
                                    if ($page == 'twoSidedStat.do') {
                                        $ret = $this->getTwoSidedStat($type, $page, $lotType, $expire);
                                    } else {
                                        if ($page == "twoBallRemind.do") {
                                            $ret = $this->getTwoBallRemind($type, $page, $lotType, $expire);
                                        } else {
                                            if ($page == 'getLuzhuNumber.do') {
                                                $ret = $this->getLuzhuNumber($type, $page, $lotType, $expire);
                                            } else {
                                                if ($page == 'luZhuLonghu.do') {
                                                    $ret = $this->getLuZhuLonghu($type, $page, $lotType, $expire);
                                                } else {
                                                    if ($page == 'getLuzhuLonghu.do') {
                                                        $ret = $this->getGetLuZhuLonghu($type, $page, $lotType, $expire);
                                                    } else {
                                                        if ($page == 'getLuzhuBigOrSmall.do') {
                                                            $ret = $this->getLuzhuBigOrSmall($type, $page, $lotType, $expire);
                                                        } else {
                                                            if ($page == 'getLuzhuTotal.do') {
                                                                $ret = $this->getLuzhuTotal($type, $page, $lotType, $expire);
                                                            } else {
                                                                if ($page == 'positionTrend.do') {
                                                                    if ($type == "jsk3") {
                                                                        $ret = $this->getAllSumTrend($type, $page, $lotType, $expire);
                                                                    } else {
                                                                        $ret = $this->getPositionTrend($type, $page, $lotType, $expire);
                                                                    }
                                                                } else {
                                                                    if ($page == 'numberTrend.do') {
                                                                        $ret = $this->getNumberTrend($type, $page, $lotType, $expire);
                                                                    } else {
                                                                        if ($page == 'guanyaTrend.do') {
                                                                            $ret = $this->getGuanYaTrend($type, $page, $lotType, $expire);
                                                                        } else {
                                                                            if ($page == 'samePositionTrend.do') {
                                                                                $ret = $this->getSamePositionTrend($type, $page, $lotType, $expire);
                                                                            } else {
                                                                                if ($page == 'sameNoTrend.do') {
                                                                                    $ret = $this->getSameNoTrend($type, $page, $lotType, $expire);
                                                                                } else {
                                                                                    if ($page == 'sameSumTrend.do') {
                                                                                        $ret = $this->getSameSumTrend($type, $page, $lotType, $expire);
                                                                                    } else {
                                                                                        //print_r("123");die;
                                                                                        if ($page == 'ajaxTrend.do') {
                                                                                            $ret = $this->getAjaxTrend($type, $page, $lotType, $expire);
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
        }
        if ($ret === false) {
            if ($type == 'pc28') {
                $ret = $this->getPk10Data($type, $page, $param);
            }
            if ($type == 'sfssc') {
                $ret = $this->getcqsscData($type, $page, $param);
            }
            if ($type == 'tcssc') {
                $ret = $this->getcqsscData($type, $page, $param);
            }
            if ($type == 'tcpk10') {
                $ret = $this->getPk10Data($type, $page, $param);
            }
            if ($type == 'sfpk10') {
                //  dump($type);die;
                $ret = $this->getPk10Data($type, $page, $param);
            }
            if ($type == 'pk10') {
                // dump($type);die;
                $ret = $this->getPk10Data($type, $page, $param);
            } else {
                if ($type == 'cqssc') {
                    $ret = $this->getcqsscData($type, $page, $param);

                } else {
                    if ($type == 'gdkl10') {
                        $ret = $this->getGdkl10Data($type, $page, $param);
                    } else {
                        if ($type == 'cqft') {
                            $ret = $this->getPk10Data($type, $page, $param);
                        } else {
                            if ($type == 'jssc') {
                                $ret = $this->getPk10Data($type, $page, $param);
                            } else {
                                if ($type == 'jsssc') {
                                    $ret = $this->getcqsscData($type, $page, $param);
                                } else {
                                    if ($type == 'missing') {
                                        if ($page == "getMissingList.do") {
                                            $ret = $this->getMissingList($type, $page, $param);
                                        } else {
                                            // print_r($page);die;
                                            if ($page == "getLmcList.do") {
                                                $ret = $this->getLmcList($type, $page, $param);
                                            } else {
                                                if ($page == "getTodayNum.do") {
                                                    $ret = $this->getTodayNum($type, $page, $param);
                                                } else {

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
        }

        return $ret;
    }

    private function getPk10Data($type, $page, $param)
    {
        $ret = false;
        $expire = 2;
        if ($type == 'cqft') {
            $type = 'cqssc';
        }
        $lotType = $this->getLotTypeByType($type);
        if ($page == 'getMergeData.do') {
            $ret = $this->getPk10MergeData($type, $page, $lotType, $expire);

        } else {
            if ($page == "kaijiang.do") {
                $ret = $this->getPk10KaiJiang($type, $page, $lotType, $expire);
            } else {
                if ($page == "eobsLuzhu.do") {
                    $ret = $this->getPk10EobsLuZhu($type, $page, $lotType, $expire);
                } else {
                    if ($page == "guanyaLuzhubseo.do") {
                        $ret = $this->getPk10GuanYaLuzhuBseo($type, $page, $lotType, $expire);
                    } else {
                        if ($page == "getDataList.do") {
                            $ret = $this->getPk10DataList($type, $page, $lotType, $expire);
                        } else {
                            if ($page == "findTodayCount.do") {
                                $ret = $this->findPk10TodayCount($type, $page, $lotType, $expire);
                            } else {
                                if ($page == "findLonghulishi.do") {
                                    $ret = $this->findPk10LongHuLiShi($type, $page, $lotType, $expire);
                                } else {
                                    if ($page == "findColdHotNumber.do") {
                                        $ret = $this->findPk10ColdHotNumber($type, $page, $lotType, $expire);
                                    } else {
                                        if ($page == "findTwosideCount.do") {
                                            $ret = $this->findPk10TwosideCount($type, $page, $lotType, $expire);
                                        } else {
                                            if ($page == "getAwardList.do") {
                                                $ret = $this->getPk10AwardList($type, $page, $lotType, $expire);
                                            } else {
                                                if ($page == "positiontrenddata.do") {
                                                    $ret = $this->getPk10PositionTrendData($type, $page, $lotType, $expire);
                                                } else {
                                                    if ($page == "guangyatrenddata.do") {
                                                        $ret = $this->getPk10GuangYaTrendData($type, $page, $lotType, $expire);
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
            }
        }
        return $ret;
    }

    private function getcqsscData($type, $page, $param)
    {
        $ret = false;
        $expire = 2;
        $lotType = $this->getLotTypeByType($type);
        $name = I("get.name");
        // print_r($lotType);exit;
        if ($page == 'getMergeData.do') {
            $ret = "{'clList':[]}";
        } else {
            if ($page == 'luZhuTongji.do') {
                $ret = $this->getcqsscLuZhuTongji($type, $page, $lotType, $expire);
            } else {
                if ($page == 'getLonghuLuzhuData.do') {
                    $ret = $this->getcqsscLonghuLuzhuData($type, $page, $lotType, $expire, $name);
                } else {
                    if ($page == 'getHaomaLuData.do') {
                        $ret = $this->getcqsscHaomaLuData($type, $page, $lotType, $expire);
                    }
                }
            }
        }
        return $ret;
    }

    private function getGdkl10Data($type, $page, $param)
    {
        $ret = false;
        $expire = 2;
        $lotType = $this->getLotTypeByType($type);
        if ($page == 'luZhuTongji.do') {
            $ret = $this->getGdkl10LuZhuTongji($type, $page, $lotType, $expire);
        } else {
            if ($page == 'luZhuTotal.do') {
                $ret = $this->getGdkl10LuZhuTotal($type, $page, $lotType, $expire);
            } else {
                if ($page == 'getMergeData.do') {
                    $ret = "{'clList':[]}";
                }
            }
        }
        return $ret;
    }

    private function getKl8Data($type, $page, $param)
    {
        $ret = false;
        $expire = 2;
        $lotType = $this->getLotTypeByType($type);
        if ($page == 'getLuzhuOddOrEven.do') {
            $ret = $this->getKl8LuzhuOddOrEven($type, $page, $lotType, $expire);
        } else {
            if ($page == 'getLuzhuUpOrDown.do') {
                $ret = $this->getKl8LuzhuUpOrDown($type, $page, $lotType, $expire);
            }
        }
        return $ret;
    }

    private function getXyncData($type, $page, $param)
    {
        $ret = false;
        $expire = 2;
        $lotType = $this->getLotTypeByType($type);
        if ($page == 'getLuzhuZfb.do') {
            $ret = $this->getXyncLuzhuZfb($type, $page, $lotType, $expire);
        } else {
            if ($page == 'getLuzhuDnxb.do') {
                $ret = $this->getXyncLuzhuDnxb($type, $page, $lotType, $expire);
            } else {
                if ($page == 'getLuzhuMerge.do') {
                    $ret = $this->getXyncLuzhuMerge($type, $page, $lotType, $expire);
                } else {
                    if ($page == 'getLuzhuMantissa.do') {
                        $ret = $this->getXyncLuzhuMantissa($type, $page, $lotType, $expire);
                    }
                }
            }
        }
        return $ret;
    }

    function getNumberTrendData($type, $page, $lotType, $expire)
    {
        $ball = (int)wjStrFilter(I('get.ball'));
        $count = (int)wjStrFilter(I('get.count'));
        $tan_2 = I('get.tan');
        $name = I('get.name');
        $cacheName = $lotType . '_' . $page . '_' . $ball . '_' . $count;
        $ret = S($cacheName);

        if ($ret === false || $ret == '') {
            $module = M();
            $retData = array();
            $openedCaiList = $this->getLottoryByCnt($module, $lotType, $count);

            $openedCaiList = array_reverse($openedCaiList);
            for ($i = 0; $i < count($openedCaiList); $i++) {
                $OpenCodes = ZstAnalyser::getCodeArr($openedCaiList[$i]["dat_codes"]);
                if (count($OpenCodes) < $ball || strlen($openedCaiList[$i]["dat_expect"]) < 2) {
                    continue;
                }
                if ($lotType == 22) {
                    $retData[$i]["Value"] = "" . ZstAnalyser::getArrSum($OpenCodes);
                } else if ($lotType == 43) {
                    $totalNum_a = (int)$OpenCodes[1] + (int)$OpenCodes[4] + (int)$OpenCodes[7] + (int)$OpenCodes[10] + (int)$OpenCodes[13] + (int)$OpenCodes[16];
                    $totalNum_b = (int)$OpenCodes[2] + (int)$OpenCodes[5] + (int)$OpenCodes[8] + (int)$OpenCodes[11] + (int)$OpenCodes[14] + (int)$OpenCodes[17];
                    $totalNum_c = (int)$OpenCodes[3] + (int)$OpenCodes[6] + (int)$OpenCodes[9] + (int)$OpenCodes[12] + (int)$OpenCodes[15] + (int)$OpenCodes[18];
                    $totalNum = ($totalNum_a % 10) + ($totalNum_b % 10) + ($totalNum_c % 10);
                    $retData[$i]["Value"] = $totalNum;
                } else {
                    if (empty($tan_2)) {
                        $retData[$i]["Value"] = "" . (int)$OpenCodes[$ball - 1];
                    } else if ($name == 'bjft') {
                        if ($tan_2 == 1) {
                            $tan = (int)$OpenCodes[0] + (int)$OpenCodes[1] + (int)$OpenCodes[2];
                        } else if ($tan_2 == 2) {
                            $tan = (int)$OpenCodes[4] + (int)$OpenCodes[5] + (int)$OpenCodes[6];
                        } else {
                            $tan = (int)$OpenCodes[7] + (int)$OpenCodes[8] + (int)$OpenCodes[9];
                        }
                        if ($tan % 4 == 0) {
                            $retData[$i]["Value"] = 4;
                        } else {
                            $retData[$i]["Value"] = $tan % 4;
                        }
                    } else if ($name == 'cqft') {
                        $tan = (int)$OpenCodes[0] + (int)$OpenCodes[1] + (int)$OpenCodes[2] + (int)$OpenCodes[3] + (int)$OpenCodes[4];
                        if ($tan % 4 == 0) {
                            $retData[$i]["Value"] = 4;
                        } else {
                            $retData[$i]["Value"] = $tan % 4;
                        }
                    }
                }
                $retData[$i]["Key"] = substr($openedCaiList[$i]["dat_expect"], -2);
            }

            $ret = json_encode($retData);
            S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
        }
        return $ret;
    }

    private function getHistoryData($type, $page, $lotType, $expire)
    {
        if (IS_POST) {
            $count = (int)wjStrFilter(I('post.count'));
            $date = wjStrFilter(I('post.date'));
            $pages = (int)wjStrFilter(I('post.page'));
            $offset = (int)wjStrFilter(I('get.offset'));
        } else {
            $count = (int)wjStrFilter(I('get.count'));
            $date = wjStrFilter(I('get.date'));
            $pages = (int)wjStrFilter(I('get.page'));
            $offset = (int)wjStrFilter(I('get.offset'));
        }

        if (empty($date)) {
            $date = date('Y-m-d');
        }
        $cacheName = $type . '_' . $page . '_' . $count . '_' . $date;
//        $ret = S($cacheName);
        $ret=false;

        if ($ret === false || $ret == '') {
            $module = M();
            $retData = array();
            $retData["success"] = true;
            $retData["code"] = null;
            $retData["msg"] = null;
            $retData["rows"] = array();
            // dump($lotType);die;
            if (isset($_GET['adate'])) $date = date("Y-m-d", time());
            if ($date == '' || $date == 'null') {
                $openedCaiList = $this->getLottoryByCnt($module, $lotType, $count);
            } else {
                $openedCaiList = $this->getLottoryByDate($module, $lotType, $date, $count, $pages, $offset);
            }
            if ($lotType == 44) {
                for ($i = 0; $i < count($openedCaiList); $i++) {
                    if ($date == '' && $count > 0 && $i >= $count) {
                        break;
                    }
                    $lingdian = strtotime(date('Y-m-d', time()));
                    $opentime = substr($openedCaiList[$i]["dat_expect"], 8);
                    $opentime = $opentime * 60 + $lingdian;
                    /*dump($opentime);die;*/
                    $retData["rows"][$i] = array();
                    $OpenCodes = ZstAnalyser::getCodeArr($openedCaiList[$i]["dat_codes"]);
                    $retData["rows"][$i]["id"] = $i;
                    $retData["rows"][$i]["betEndTime"] = null;
                    $retData["rows"][$i]["termNum"] = $openedCaiList[$i]["dat_expect"];
                    $retData["rows"][$i]["lotteryNum"] = implode('', $OpenCodes);
                    $retData["rows"][$i]["lotteryTime"] = date('Y-m-d H:i:s', $opentime);;
                    $retData["rows"][$i]["gameId"] = $this->getGameIdByLotType($lotType);
                    for ($j = 0; $j < 21; $j++) {
                        if ($j < count($OpenCodes)) {
                            $retData["rows"][$i]["n" . ($j + 1)] = (int)$OpenCodes[$j];
                        } else {
                            $retData["rows"][$i]["n" . ($j + 1)] = null;
                        }
                    }
                    $retData["rows"][$i]["lotteryDate"] = date('Y-m-d 00:00:00', $openedCaiList[$i]["dat_open_time"]);
                    $retData["rows"][$i]["lotteryDateStr"] = date('Y-m-d', $openedCaiList[$i]["dat_open_time"]);
                    $retData["rows"][$i]["termNumStr"] = "";
                }
            } else {

                for ($i = 0; $i < count($openedCaiList); $i++) {
                    if ($date == '' && $count > 0 && $i >= $count) {
                        break;
                    }
                    $retData["rows"][$i] = array();
                    $OpenCodes = ZstAnalyser::getCodeArr($openedCaiList[$i]["dat_codes"]);
                    $retData["rows"][$i]["id"] = $i;
                    $retData["rows"][$i]["betEndTime"] = null;
                    $retData["rows"][$i]["termNum"] = $openedCaiList[$i]["dat_expect"];
                    $retData["rows"][$i]["lotteryNum"] = implode('', $OpenCodes);
                    $retData["rows"][$i]["lotteryTime"] = date('Y-m-d H:i:s', $openedCaiList[$i]["dat_open_time"]);
                    $retData["rows"][$i]["gameId"] = $this->getGameIdByLotType($lotType);
                    for ($j = 0; $j < 21; $j++) {
                        if ($j < count($OpenCodes)) {
                            $retData["rows"][$i]["n" . ($j + 1)] = (int)$OpenCodes[$j];
                        } else {
                            $retData["rows"][$i]["n" . ($j + 1)] = null;
                        }
                    }
                    $retData["rows"][$i]["lotteryDate"] = date('Y-m-d 00:00:00', $openedCaiList[$i]["dat_open_time"]);
                    $retData["rows"][$i]["lotteryDateStr"] = date('Y-m-d', $openedCaiList[$i]["dat_open_time"]);
                    $retData["rows"][$i]["termNumStr"] = "";
                }
            }


            if ($offset != 0 && $pages != 0) {
                $lotType = (int)$lotType;
                $date = date('Y-m-d', strtotime($date));
                $yestoday = date("Y-m-d", strtotime("-$date day"));
                if ($lotType == 43) {
                    $startTime = strtotime($yestoday . ' 21:00:00');
                    $endTime = strtotime($date . ' 19:00:00');
                } else {
                    $startTime = strtotime($date . ' 00:00:00');
                    $endTime = strtotime($date . ' 23:59:59');
                }
                $sql = "SELECT count(*) as count FROM {$this->prename}data where dat_type=$lotType and  dat_open_time>$startTime and dat_open_time<$endTime";
                $res = $module->query($sql);
                $retData["count"] = $res[0]['count'];
                $retData["page"] = $pages;
                $retData["offset"] = $offset;
            }

            $ret = json_encode($retData);
            S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
        }

        return $ret;
    }


    private function getAwardTime($type, $page, $lotType, $expire)
    {
        $module = M();
        $retData = array();
        $time = time();
        $MillisecondTime = getMillisecond();
        $kjHao = null;
//        if (substr($page, -7) == "Data.do") {
//            $kjHao = $module->query("select dat_codes,replace(dat_expect,'-','') dat_expect, dat_open_time from {$this->prename}data where dat_type={$lotType} order by dat_expect desc limit 1");
//            $time = $kjHao[0]['dat_open_time'];
//            $currentNo = $this->getGameCurrentNo($lotType, $module, $time);
//            $nextNo = $this->getGameNextNo($lotType, $module, time());
//        } else {
//
//            $currentNo = $this->getGameCurrentNo($lotType, $module, $time);
//            $nextNo = $this->getGameNextNo($lotType, $module, $time);
//
//            //$newqihao = str_replace("-","",$currentNo['actionNo']);
////            if($lotType == 43){
////                $kjHao = $module->query("select dat_codes,replace(dat_expect,'-','') dat_expect, dat_open_time from {$this->prename}data where dat_type={$lotType} order by dat_expect desc limit 1");
////            }else{
////                $kjHao = $module->query("select dat_codes from {$this->prename}data where dat_type={$lotType} and dat_expect='{$currentNo['actionNo']}'");
////            }
//            $kjHao = $module->query("select dat_codes from {$this->prename}data where dat_type={$lotType} and dat_expect='{$currentNo['actionNo']}'");
//           // print_r("select dat_codes from {$this->prename}data where dat_type={$lotType} and dat_expect='{$currentNo['actionNo']}");exit;
//            if (!is_array($kjHao) || !$kjHao['dat_codes']) {
////                if($lotType == 43){
////                    $kjHao = $module->query("select dat_codes,dat_expect,dat_open_time from {$this->prename}data where dat_type={$lotType} order by dat_id desc limit 1");
////                }else{
////                    $kjHao = $module->query("select dat_codes,dat_expect from {$this->prename}data where dat_type={$lotType} order by dat_id desc limit 1");
////                }
//                $kjHao = $module->query("select dat_codes,dat_expect from {$this->prename}data where dat_type={$lotType} order by dat_id desc limit 1");
//            }
//
//        }
//       // print_r($nextNo);exit;
//        //print_r($currentNo);exit;
//        $dat_expect = $kjHao[0]['dat_expect'];
//        $awrdtime = date('Y-m-d H:i:s',$kjHao[0]['dat_open_time']);
//        $awrdtime2 = date('Y-m-d H:i:s',$kjHao[0]['dat_open_time']+210);
//        $awrdtime3 = ($kjHao[0]['dat_open_time']+210) - time();
//       // print_r($awrdtime);exit;
//        $pan = null;
//        if ($kjHao === false || count($kjHao) == 0) {
//            $kjHao = null;
//        } else {
//            $data = explode(',', $kjHao[0]['dat_codes']);
//            $pos = strpos(end($data), '+');
//            if ($pos >= 0) {
//                $pan = substr(end($data), $pos + 1);
//            }
//            $kjHao = '';
//            foreach ($data as $value) {
//                $t = (int)$value;
//                if ($lotType == 23) {
//                    $t = $t > 9 ? $t : '0' . $t;
//                }
//                $kjHao = $kjHao . $t . ',';
//            }
//            if ($kjHao != '') {
//                $kjHao = substr($kjHao, 0, strlen($kjHao) - 1);
//            }
//        }
//        $retData["time"] = $MillisecondTime;
//        //
//        //$retData["firstPeriod"] = $currentNo["actionNo"] - $currentNo["actionNoIndex"];
////        if($lotType == 43){
////            $retData["firstPeriod"] = $dat_expect; //测试数据是否正常
////        }else{
//            $retData["firstPeriod"] = $dat_expect - $currentNo["actionNoIndex"]; //测试数据是否正常
//       // }
//
//        $retData["apiVersion"] = 1;
////        if($lotType == 43){
////            $retData["current"]["awardTime"] = $awrdtime;
////        }else{
//            $retData["current"]["awardTime"] = $currentNo["actionTime"];
//   //     }
//if ( $lotType == 21 || $lotType == 3 || $lotType == 18 || $lotType == 22 || $lotType == 24 || $lotType == 35 || $lotType == 34 || $lotType == 40||$lotType==2 ||$lotType == 44 ) {
//            $retData["current"]["periodNumber"] = $currentNo["actionNoIndex"];
//        } else if($lotType == 43 ||$lotType == 6 ){
//            //$retData["current"]["periodNumber"] =$dat_expect;//测试数据是否正常
//            $retData["current"]["periodNumber"] = substr($currentNo["actionNo"],9);
//        }else if($lotType == 45 || $lotType == 46 || $lotType == 47  ||$lotType == 48 || $lotType == 1)
//        {
//            $retData["current"]["periodNumber"] = intval(substr($dat_expect,8));
//        }else
//        {
//            $retData["current"]["periodNumber"] =$dat_expect;
//        }
//
//            $current_num = $module->query("select count(*) as count from lot_data_time where type =".$lotType);
//
//       // dump($lotType);
//            $retData["current"]["current_num"] =  $current_num[0]['count'];
//
//                /*$retData["current"]["surplus_num"] = $current_num[0]['count'] - $currentNo["actionNo"];*/
//            if($lotType == 43 || $lotType == 22 || $lotType == 6 ||$lotType == 21 ){
//                $retData["current"]["surplus_num"] = $current_num[0]['count'] - substr($currentNo["actionNo"],9);
//            }else if($lotType == 20 || $lotType == 34 ){
//                $retData["current"]["surplus_num"] = $current_num[0]['count'] - $currentNo["actionNoIndex"];
//            }else if ($lotType == 45 || $lotType == 46 || $lotType == 47 || $lotType == 48 || $lotType == 1)
//            {
//                $retData["current"]["surplus_num"] = $current_num[0]['count'] - $retData["current"]["periodNumber"];
//            }else if($lotType == 44 ){
//                $retData["current"]["surplus_num"] = $current_num[0]['count'] - $currentNo["actionNoIndex"]+1;
//            }
//
//        $retData["current"]["periodNumber1"] = $dat_expect;
//        $retData["current"]["fullPeriodNumber"] = $currentNo["actionNo"];
//        $retData["current"]["periodNumberStr"] = null;
//        $retData["current"]["awardTimeInterval"] = 0;
//        $retData["current"]["awardNumbers"] = $kjHao;
//        $retData["current"]["delayTimeInterval"] = null;
//        $retData["current"]["pan"] = $pan;
//        $retData["current"]["isEnd"] = null;
//        $retData["current"]["nextMinuteInterval"] = null;
//
//        //下期期数
//        $nextNoqishu = $this->getGameNextNoqishu($lotType, $module, $time);
//
//
//       /* print_r($nextNoqishu[0]["dat_expect"]);//die;
//
//        print_r("----");
//
//        print_r($nextNo["actionNoIndex"]);*/
//
//            $retData["next"]["awardTime"] = $nextNo["actionTime"];
//            if ($lotType == 1 || $lotType == 21 || $lotType == 3 || $lotType == 18 || $lotType == 22 || $lotType == 24 || $lotType == 35 || $lotType == 6 || $lotType == 34) {
//                $retData["next"]["periodNumber"] = $nextNo["actionNoIndex"];
//            } else {
//
//                $retData["next"]["periodNumber"] =$dat_expect;//测试数据是否正常
//            }
//            if($lotType == 44){
//                $retData["next"]["periodNumber"] =$dat_expect+1;
//            }
//            //bjpk10 bjft期数
//            if($lotType == 20 ||$lotType == 42)
//            {
//                $retData["next"]["periodNumber"] =$nextNoqishu[0]["dat_expect"] + $nextNo["actionNoIndex"] -1;
//                $retData['stauts'] = "1";
//                if($nextNo["actionTime"]>300)
//                {
//                    $retData["next"]["periodNumber"]=$nextNoqishu[0]["dat_expect"]+1;
//                    $retData['stauts'] = "2";
//                }
//
//            }
//
//            //xyft期数
//            if($lotType == 34 ||$lotType == 1 || $lotType == 41 || $lotType == 22 ||$lotType == 6){
//
//                if($nextNo["actionNoIndex"]<10)
//                {
//                    $nextNo["actionNoIndex"]= "00".$nextNo["actionNoIndex"];
//                }
//                if($nextNo["actionNoIndex"] >=10 && $nextNo["actionNoIndex"]<100)
//                {
//                    $nextNo["actionNoIndex"]= "0".$nextNo["actionNoIndex"];
//                }
//                $retData["next"]["periodNumber"]=substr($nextNo["actionNo"],0,8).$nextNo["actionNoIndex"];
//
//                $retData['stauts'] = "1";
//                if($nextNo["actionTime"]>300 && $lotType == 34 )
//                {
//                    $retData['stauts'] = "2";
//                }
//            }
//
//        $retData["next"]["awardTimeInterval"] = strtotime($nextNo["actionTime"]) * 1000 - $MillisecondTime;
//
////dump($dat_expect);die;
//        $retData["next"]["fullPeriodNumber"] = 0;
//        $retData["next"]["periodNumberStr"] = "{$nextNo["actionNo"]}";
//
//        $retData["next"]["awardNumbers"] = null;
//        $retData["next"]["delayTimeInterval"] = null;
//        $retData["next"]["pan"] = null;
//        $retData["next"]["isEnd"] = null;
//        $retData["next"]["nextMinuteInterval"] = null;
//
//        $ret = json_encode($retData);
//
//        return $ret;


        /*
         time: 1542068782325, firstPeriod: 20181113000, apiVersion: 1,…}
apiVersion: 1
current: {awardTime: "2018-11-13 01:50:00", periodNumber: 23, current_num: "121", surplus_num: 98,…}
awardNumbers: "4,8,6,3,0"
awardTime: "2018-11-13 01:50:00"
awardTimeInterval: 0
current_num: "121"
delayTimeInterval: null
fullPeriodNumber: "20181113-023"
isEnd: null
nextMinuteInterval: null
pan: ""
periodNumber: 23
periodNumber1: "20181113023"
periodNumberStr: null
surplus_num: 98
firstPeriod: 20181113000
next: {awardTime: "2018-11-13 09:50:00", periodNumber: "24", awardTimeInterval: 5017675, fullPeriodNumber: 0,…}
awardNumbers: null
awardTime: "2018-11-13 09:50:00"
awardTimeInterval: 5017675
delayTimeInterval: null
fullPeriodNumber: 0
isEnd: null
nextMinuteInterval: null
pan: null
periodNumber: "24"
periodNumberStr: "20181113-024"
time: 1542068782325*/

        $ret = $this->getIssueInfo($type);
        $xqqihao = str_replace("-", "0", $ret['issue']);

        if ($lotType == 44 || $lotType == 1 || $lotType == 34 || $lotType == 47 || $lotType == 48 || $lotType == 46 || $lotType == 45 || $lotType == 6) {
            $sqqihao = str_replace("-", "", $ret['preIssue']['issue']);
            $xqqihao = str_replace("-", "", $ret['issue']);
        } else {
            $xqqihao = str_replace("-", "0", $ret['issue']);
            $sqqihao = str_replace("-", "0", $ret['preIssue']['issue']);
        }

        $kjHao1 = $module->query("select dat_codes,dat_expect,dat_open_time from {$this->prename}data where dat_type={$lotType} and dat_expect = $sqqihao");
        //  $kjHao2 = $module->query("select dat_codes,dat_expect,dat_open_time from {$this->prename}data where dat_type={$lotType} and dat_expect = $xqqihao");

        if ($kjHao1[0]['dat_codes'] == null) {
            $kjHao1[0]['dat_codes'] = "";
        }


        $sres['surplus_num'] = $ret['issue_total'] - $ret['preIssue']['issue_no'];

        if ($lotType == 20 || $lotType == 34 || $lotType == 47 || $lotType == 46 || $lotType == 6) {
            $arr = explode(",", $kjHao1[0]['dat_codes']);
            foreach ($arr as $k => $v) {
                $arr[$k] = preg_replace('/^0*/', '', $v);
            }
            $arr_str = implode(",", $arr);
            $sres["awardNumbers"] = $arr_str;

        } else {
            $sres["awardNumbers"] = $kjHao1[0]['dat_codes'];
        }

        $sres["awardTime"] = $ret['preIssue']['opentime'];
        $sres['fullPeriodNumber'] = $ret['preIssue']['issue'];


//        if($lotType ==20 || $lotType == 34){
//            $sres['periodNumber'] = $ret['preIssue']['issue_no'] +1;
//        }else{

//        }
        $sres['periodNumber'] = $ret['preIssue']['issue_no'];
        $sres['periodNumber1'] = $sqqihao;
        $sres['current_num'] = $ret['issue_total'];


        if ($lotType == 20) {
            $xres["awardTimeInterval"] = ($ret['timeremain'] + 30) * 1000;

        } else {
            $xres["awardTimeInterval"] = $ret['timeremain'] * 1000;
            $xres['periodNumber'] = $ret['issue_no'];
        }
        $xres["awardTime"] = $ret['opentime'];
        $xres['fullPeriodNumber'] = $ret['issue'];

        $xres['periodNumberStr'] = $xqqihao;


        $datas["current"] = $sres;
        $datas["next"] = $xres;
        $datas['status'] = $ret['status'];

        //     dump($datas);die;
        $datas = json_encode($datas);

        return $datas;

    }

    function getPk10AnalysisData($type, $page, $lotType, $expire)
    {
        $module = M();
        $retData = array();
        $time = time();
        $MillisecondTime = getMillisecond();
        $currentNo = $this->getGameCurrentNo($lotType, $module, $time);
        $nextNo = $this->getGameNextNo($lotType, $module, $time);
        $kjHao = null;
        $kjHao = $module->query("select dat_codes,replace(dat_expect,'-','') dat_expect from {$this->prename}data where dat_type={$lotType} order by dat_expect desc limit 1");
        if ($kjHao[0]['dat_expect'] != $currentNo["actionNo"]) {
            $currentNo["actionNo"] = $kjHao[0]['dat_expect'];
        }
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
        $retData["time"] = "{$time}";
        $retData["current"]["awardTime"] = $currentNo["actionTime"];
        $retData["current"]["periodNumber"] = $currentNo["actionNo"];
        $retData["current"]["awardNumbers"] = $kjHao;
        $retData["next"]["awardTime"] = $nextNo["actionTime"];
        $retData["next"]["periodNumber"] = $nextNo["actionNo"];
        $retData["next"]["awardTimeInterval"] = '' . (strtotime($nextNo["actionTime"]) - $time);
        $retData["next"]["delayTimeInterval"] = "15";
        $ret = json_encode($retData);
        return $ret;
    }

    function getBallStat($type, $page, $lotType, $expire)
    {
        $cacheName = $type . '_' . $page . '_' . wjStrFilter(I('get.today'));
        $ret = S($cacheName);
        if ($ret === false || $ret == '') {
            $module = M();
            $retData = array();
            $iOpenCodeCnt = $this->getOpenCodeCntByLotType($lotType);
            $iAllCodesCnt = $this->getAllCodesCntByLotType($lotType);
            $bFirstZero = $this->isStartFromZero($lotType);
            $today = empty($_GET['date']) ? date('Y-m-d') : $_GET['date'];
            $shows = $this->calPk10BallStateDay($module, $lotType, $today);
            $iIndex = 0;
            for ($i = 0; $i < $iOpenCodeCnt; $i++) {
                for ($j = 0; $j < 4; $j++) {
                    $row = array();
                    $row['id'] = $iIndex++;
                    $row['gameId'] = null;
                    $row['rank'] = $i + 1;
                    $row['dataType'] = $j < 2 ? 6 : 5;
                    $row['num'] = $j % 2 + 1;
                    $row['nowMissing'] = null;
                    $row['dayMissing'] = null;
                    $row['dayTotalNum'] = $shows[$i][$j];
                    $row['lotteryDate'] = $today . " 00:00:00";
                    $row['lotteryTime'] = null;
                    $retData[] = $row;
                }
            }
            if (wjStrFilter(I('get.today')) == '') {
                $cfg = new ConfigMgr();
                $historyString = $cfg->getString($module, $type, "BallStatLast19Days");
                $history = array();
                if ($historyString != NULL) {
                    $history = json_decode($historyString, TRUE);
                }
                $foundNew = false;
                for ($i = 0; $i < 19; $i++) {
                    $lastDay = date("Y-m-d", strtotime("-{$i} day", strtotime($today)));
                    if ($history == NULL or !array_key_exists($lastDay, $history)) {
                        $history[$lastDay] = $this->calPk10BallStateDay($module, $lotType, $lastDay);
                        $foundNew = true;
                    }
                }
                //dump($history);die;
                krsort($history);

                if (count($history) > 29) {
                    $history = array_slice($history, 0, 29);
                }
                if ($foundNew) {
                    $cfg->setValue($module, $type, "BallStatLast19Days", json_encode($history));
                }

                foreach ($history as $date => $showsHis) {
                    $isEmpty = true;
                    foreach ($showsHis as $values) {
                        foreach ($values as $value) {
                            //dump($values);
                            if ($value <> 0) {
                                //unset($history[$date]);
                                $isEmpty = false;
                            }
                        }
                    }
                    //if ($isEmpty) {
                    //   break;
                    //}
                    //echo $iOpenCodeCnt;die;
                    if (!$isEmpty) {
                        for ($i = 0; $i < $iOpenCodeCnt; $i++) {
                            for ($j = 0; $j < 4; $j++) {
                                $row = array();
                                $row['id'] = $iIndex++;
                                $row['gameId'] = null;
                                $row['rank'] = $i + 1;
                                $row['dataType'] = $j < 2 ? 6 : 5;
                                $row['num'] = $j % 2 + 1;
                                $row['nowMissing'] = null;
                                $row['dayMissing'] = null;
                                $row['dayTotalNum'] = $showsHis[$i][$j];
                                $row['lotteryDate'] = $date . " 00:00:00";
                                $row['lotteryTime'] = null;
                                $retData[] = $row;
                            }
                        }
                    }
                }
                //dump($retData);die;
            }
            $ret = json_encode($retData);
            S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
        }
        //dump($ret);die;
        return $ret;
    }

    function getPk10MergeData($type, $page, $lotType, $expire)
    {

        $cacheName = $type . '_' . $page;
        $ret = S($cacheName);
        if ($ret === false || $ret == '') {
            $module = M();
            $omits = array();
            $iniOmit = -1;
            for ($i = 0; $i < 10; $i++) {
                for ($j = 0; $j < 6; $j++) {
                    $omits[$i][$j] = $iniOmit;
                }
            }
            $date = empty($_GET['date']) ? date('Y-m-d') : $_GET['date'];
            // print_r($date);exit;
            $openedCaiList = $this->getLottoryByDate($module, $lotType, $date);

            foreach ($openedCaiList as $openedCai) {
                $OpenCodes = ZstAnalyser::getCodeArr($openedCai['dat_codes']);
                if (count($OpenCodes) != 10) {
                    continue;
                }
                $checkNext = false;
                for ($i = 0; $i < 10; $i++) {
                    for ($j = 0; $j < 3; $j++) {
                        if ($j == 0) {
                            $isTarget = (int)$OpenCodes[$i] > 5;
                        } else {
                            if ($j == 1) {
                                $isTarget = (int)$OpenCodes[$i] % 2 != 0;
                            } else {
                                $isTarget = (int)$OpenCodes[$i] > (int)$OpenCodes[9 - $i];
                            }
                        }
                        if ($isTarget && $omits[$i][$j * 2] < 0) {
                            $omits[$i][$j * 2]--;
                            if ($omits[$i][$j * 2 + 1] < 0) {
                                $omits[$i][$j * 2 + 1] = $iniOmit - $omits[$i][$j * 2 + 1];
                            }
                            $checkNext = true;
                        } else {
                            if (!$isTarget && $omits[$i][$j * 2 + 1] < 0) {
                                if ($omits[$i][$j * 2] < 0) {
                                    $omits[$i][$j * 2] = $iniOmit - $omits[$i][$j * 2];
                                }
                                $omits[$i][$j * 2 + 1]--;
                                $checkNext = true;
                            } else {
                                if ($omits[$i][$j * 2] < 0) {
                                    $omits[$i][$j * 2] = $iniOmit - $omits[$i][$j * 2];
                                }
                                if ($omits[$i][$j * 2 + 1] < 0) {
                                    $omits[$i][$j * 2 + 1] = $iniOmit - $omits[$i][$j * 2 + 1];
                                }
                            }
                        }
                    }
                }
                if (!$checkNext) {
                    break;
                }
            }
            $omits2 = array();
            foreach ($omits as $b => $t) {
                foreach ($t as $key => $value) {
                    $omits2[$key]["0" . $b] = $value;
                }
            }
            $omits = $omits2;
            $omits2 = array();
            foreach ($omits as $b => $t) {
                arsort($omits[$b]);
                $omits2[$b] = current($omits[$b]);
            }
            arsort($omits2);
            $retData = array();
            $retData["clList"] = array();
            $iIndex = 0;
            foreach ($omits2 as $key => $value) {
                $keys = array_keys($omits[$key]);
                if ($key == 4 && $keys[4] > $keys[5] || $key == 5 && $keys[4] < $keys[5]) {
                    continue;
                }
                for ($i = 0; $i < 10; $i++) {
                    if ($omits[$key][$keys[$i]] < 3) {
                        break;
                    }
                    $lastValue = $omits[$key][$keys[$i]];
                    $row = array();
                    $row['id'] = $iIndex++;
                    $row['gameId'] = null;
                    $row['rank'] = (int)$keys[$i] + 1;
                    $row['dataType'] = $key < 2 ? 6 : ($key < 4 ? 5 : 2);
                    $row['num'] = $key < 2 ? $key % 2 : $key % 2 + 1;
                    $row['nowMissing'] = $lastValue;
                    $row['dayMissing'] = null;
                    $row['dayTotalNum'] = null;
                    $row['lotteryDate'] = $date . " 00:00:00";
                    $row['lotteryTime'] = null;
                    $retData["clList"][] = $row;
                }
            }
            $ret = json_encode($retData);
            S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
        }

        return $ret;
    }

    function getPk10KaiJiang($type, $page, $lotType, $expire)
    {
        $date = wjStrFilter(I('get.date'));
        $today = empty($_GET['date']) ? date('Y-m-d') : $_GET['date'];
        if ($date == '' || $date > $today) {
            $date = $today;
        }
        $cacheName = $type . '_' . $page . '_' . $date;
        $ret = S($cacheName);
        if ($ret === false || $ret == '') {
            $module = M();
            $retData = array();
            $retData["success"] = true;
            $retData["code"] = null;
            $retData["msg"] = null;
            $retData["rows"] = array();
            $openedCaiList = $this->getLottoryByDate($module, $lotType, $date);
            for ($i = 0; $i < count($openedCaiList); $i++) {
                $retData["rows"][$i] = array();
                $OpenCodes = ZstAnalyser::getCodeArr($openedCaiList[$i]["dat_codes"]);
                $retData["rows"][$i]["id"] = $i;
                $retData["rows"][$i]["betEndTime"] = null;
                $retData["rows"][$i]["termNum"] = $openedCaiList[$i]["dat_expect"];
                $retData["rows"][$i]["lotteryNum"] = implode('', $OpenCodes);
                $retData["rows"][$i]["lotteryTime"] = date('Y-m-d H:i:s', $openedCaiList[$i]["dat_open_time"]);
                $retData["rows"][$i]["gameId"] = $this->getGameIdByLotType($lotType);
                for ($j = 0; $j < 21; $j++) {
                    if ($j < 10) {
                        $retData["rows"][$i]["n" . ($j + 1)] = (int)$OpenCodes[$j];
                    } else {
                        $retData["rows"][$i]["n" . ($j + 1)] = null;
                    }
                }
                $retData["rows"][$i]["lotteryDate"] = date('Y-m-d 00:00:00', $openedCaiList[$i]["dat_open_time"]);
                $retData["rows"][$i]["lotteryDateStr"] = date('Y-m-d', $openedCaiList[$i]["dat_open_time"]);
                $retData["rows"][$i]["termNumStr"] = "";
            }
            $ret = json_encode($retData);
            S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
        }
        return $ret;
    }

    function getMissingList($type, $page, $param)
    {
        $ret = false;
        $url = '';
        $postParam = "";
        $cacheName = NULL;
        $expire = 2;
        $dataType = (int)wjStrFilter(I('post.dataType'));
        $gameId = (int)wjStrFilter(I('post.gameId'));
        $rank = (int)wjStrFilter(I('post.rank'));
        $orderCloumn = (int)wjStrFilter(I('post.orderCloumn'));
        $orderType = (int)wjStrFilter(I('post.orderType'));
        $cacheName = $type . '_' . $page . '_' . $dataType . '_' . $gameId . '_' . $rank . '_' . $orderCloumn . '_' . $orderType;
        $ret = S($cacheName);
        if ($ret === false || $ret == '') {
            $module = M();
            $retData = array();
            $lotType = $this->getLotTypeByGameId($gameId);
            $date = date('Y-m-d');
            $retData["success"] = true;
            $retData["code"] = null;
            $retData["msg"] = null;
            $retData["t"] = null;

            if ($lotType == 0 || $rank < 0 || $rank > 10 || !($orderCloumn <= 8 && $orderCloumn >= 1) || $orderType != 1 && $orderType != 2) {
                $retData["msg"] = "参数异常";
            } else {
                $openedCaiList = $this->getLottoryByDate($module, $lotType, $date);
                $iOpenCodeCnt = $this->getOpenCodeCntByLotType($lotType);
                $iAllCodesCnt = $this->getAllCodesCntByLotType($lotType);
                $bFirstZero = $this->isStartFromZero($lotType);
                $iColNeeds = $iAllCodesCnt;
                $iStart = 0;
                if ($dataType == 10) {
                    $arrSumValues = array();
                    for ($j = 0; $j < $iAllCodesCnt; $j++) {
                        for ($m = 0; $m < $iAllCodesCnt; $m++) {
                            for ($n = 0; $n < $iAllCodesCnt; $n++) {
                                $sum = $j + $m + $n + 3;
                                if ($bFirstZero) {
                                    $sum = $j + $m + $n;
                                }
                                if (!in_array($sum, $arrSumValues)) {
                                    $arrSumValues[] = $sum;
                                }
                            }
                        }
                    }
                    $iColNeeds = max($arrSumValues);
                    $iStart = min($arrSumValues) - 1;
                }
                $ballCnt = array();
                $ballOmmit = array();
                $iniOmit = -1;
                $ballWin = array();
                for ($i = $iStart; $i < $iColNeeds; $i++) {
                    $ball = $i < 9 ? "0" . ($i + 1) : "" . ($i + 1);
                    $ballCnt[$ball] = 0;
                    $ballOmmit[$ball] = $iniOmit;
                    $ballWin[$ball] = 0;
                }
                for ($i = 0; $i < count($openedCaiList); $i++) {
                    $OpenCodes = ZstAnalyser::getCodeArr($openedCaiList[$i]["dat_codes"]);
                    if ($rank > count($OpenCodes)) {
                        $retData["msg"] = "参数异常";
                        break;
                    }

                    if ($dataType == 1) {
                        if ($rank != 0) {
                            $iLoop = 1;
                        } else {
                            $iLoop = $iOpenCodeCnt;
                        }

                        for ($j = 0; $j < $iLoop; $j++) {
                            if ($rank != 0) {
                                $ball = $OpenCodes[$rank - 1];
                            } else {
                                $ball = $OpenCodes[$j];
                            }
                            $ball = $ball < 9 ? "0" . $ball : "" . $ball;
                            $ballCnt[$ball]++;
                            foreach ($ballOmmit as $b => $o) {
                                if ($b == $ball && $o < 0) {
                                    $ballOmmit[$b] = $iniOmit - $o;
                                } else {
                                    if ($o < 0) {
                                        $ballOmmit[$b]--;
                                    }
                                }
                            }
                            if ($ballCnt[$ball] == $i + 1) {
                                $ballWin[$ball]++;
                            }
                        }
                    } else {

                        if ($dataType == 2) {
                            if ($gameId == 1) {
                                $iColNeeds = 3;
                                $ball = '01';
                                $ball2 = '02';
                                $ball3 = '03';
                                if ($OpenCodes[0] > $OpenCodes[$iOpenCodeCnt - 1]) {
                                    $ball3 = '01';
                                    $ball = '02';
                                    $ball2 = '03';
                                } else {
                                    if ($OpenCodes[0] < $OpenCodes[$iOpenCodeCnt - 1]) {
                                        $ball3 = '02';
                                        $ball = '01';
                                        $ball2 = '03';
                                    } else {
                                        $ball3 = '03';
                                        $ball = '02';
                                        $ball2 = '01';
                                    }
                                }
                                $ballCnt[$ball3]++;

                                if ($ballOmmit[$ball] < 0) {
                                    $ballOmmit[$ball]--;
                                }
                                if ($ballOmmit[$ball2] < 0) {
                                    $ballOmmit[$ball2]--;
                                }
                                if ($ballOmmit[$ball3] < 0) {
                                    $ballOmmit[$ball3] = $iniOmit - $ballOmmit[$ball3];
                                }
                                if ($ballCnt[$ball3] == $i + 1) {
                                    $ballWin[$ball3]++;
                                }
                            } else {
                                for ($j = 0; $j < $iOpenCodeCnt / 2; $j++) {
                                    $ball = "0" . ($j * 2 + 1);
                                    $k = $j * 2 + 1 + 1;
                                    $ball2 = $k < 10 ? "0" . $k : "" . $k;
                                    if ($OpenCodes[$j] > $OpenCodes[$iOpenCodeCnt - 1 - $j]) {
                                        $ballCnt[$ball]++;
                                        if ($ballOmmit[$ball] < 0) {
                                            $ballOmmit[$ball] = $iniOmit - $ballOmmit[$ball];
                                        }
                                        if ($ballOmmit[$ball2] < 0) {
                                            $ballOmmit[$ball2]--;
                                        }
                                        if ($ballCnt[$ball] == $i + 1) {
                                            $ballWin[$ball]++;
                                        }
                                    } else {
                                        $ballCnt[$ball2]++;
                                        if ($ballOmmit[$ball] < 0) {
                                            $ballOmmit[$ball]--;
                                        }
                                        if ($ballOmmit[$ball2] < 0) {
                                            $ballOmmit[$ball2] = $iniOmit - $ballOmmit[$ball2];
                                        }
                                        if ($ballCnt[$ball2] == $i + 1) {
                                            $ballWin[$ball2]++;
                                        }
                                    }
                                }
                            }
                        } else {
                            if ($dataType == 3 || $dataType == 4 || $dataType == 5 || $dataType == 6 || $dataType == 7 || $dataType == 8) {
                                $ball = "01";
                                $ball2 = "02";
                                $bValue = false;
                                if ($dataType == 3) {
                                    $sum = $OpenCodes[0] + $OpenCodes[1];
                                    $bValue = $sum % 2 != 0;
                                } else {
                                    if ($dataType == 4) {
                                        $sum = $OpenCodes[0] + $OpenCodes[1];
                                        $bValue = $sum >= 12;
                                    } else {
                                        if ($dataType == 5) {
                                            $bValue = $OpenCodes[$rank] % 2 != 0;
                                        } else {
                                            if ($dataType == 6) {
                                                $bValue = $OpenCodes[$rank] >= 6;
                                            } else {
                                                if ($dataType == 7) {
                                                    $sum = ZstAnalyser::getArrSum($OpenCodes);
                                                    $bValue = $sum % 2 != 0;
                                                } else {
                                                    if ($dataType == 8) {
                                                        $sum = ZstAnalyser::getArrSum($OpenCodes);
                                                        $iSumTotal = 0;
                                                        for ($j = 0; $j < $iAllCodesCnt; $j++) {
                                                            if ($bFirstZero) {
                                                                $iSumTotal += $j;
                                                            } else {
                                                                $iSumTotal += $j + 1;
                                                            }
                                                        }
                                                        $bValue = $sum >= $iSumTotal / 2;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                if ($bValue) {
                                    $ballCnt[$ball]++;
                                    if ($ballOmmit[$ball] < 0) {
                                        $ballOmmit[$ball] = $iniOmit - $ballOmmit[$ball];
                                    }
                                    if ($ballOmmit[$ball2] < 0) {
                                        $ballOmmit[$ball2]--;
                                    }
                                    if ($ballCnt[$ball] == $i + 1) {
                                        $ballWin[$ball]++;
                                    }
                                } else {
                                    $ballCnt[$ball2]++;
                                    if ($ballOmmit[$ball] < 0) {
                                        $ballOmmit[$ball]--;
                                    }
                                    if ($ballOmmit[$ball2] < 0) {
                                        $ballOmmit[$ball2] = $iniOmit - $ballOmmit[$ball2];
                                    }
                                    if ($ballCnt[$ball2] == $i + 1) {
                                        $ballWin[$ball2]++;
                                    }
                                }
                                $iColNeeds = 2;
                            } else {
                                if ($dataType == 9) {
                                    $twoBall = ZstAnalyser::fetchRepeatMemberInArray($OpenCodes);
                                    if (count($twoBall) > 0) {
                                        $ball = $twoBall[0];
                                        $ball = $ball < 9 ? "0" . $ball : "" . $ball;
                                        $ballCnt[$ball]++;
                                        foreach ($ballOmmit as $b => $o) {
                                            if ($b == $ball && $o < 0) {
                                                $ballOmmit[$b] = $iniOmit - $o;
                                            } else {
                                                if ($o < 0) {
                                                    $ballOmmit[$b]--;
                                                }
                                            }
                                        }
                                        if ($ballCnt[$ball] == $i + 1) {
                                            $ballWin[$ball]++;
                                        }
                                    } else {
                                        foreach ($ballOmmit as $b => $o) {
                                            if ($o < 0) {
                                                $ballOmmit[$b]--;
                                            }
                                        }
                                    }
                                } else {
                                    if ($dataType == 10) {
                                        $ball = ZstAnalyser::getArrSum($OpenCodes);
                                        $ball = $ball < 9 ? "0" . $ball : "" . $ball;
                                        $ballCnt[$ball]++;
                                        foreach ($ballOmmit as $b => $o) {
                                            if ($b == $ball && $o < 0) {
                                                $ballOmmit[$b] = $iniOmit - $o;
                                            } else {
                                                if ($o < 0) {
                                                    $ballOmmit[$b]--;
                                                }
                                            }
                                        }
                                        if ($ballCnt[$ball] == $i + 1) {
                                            $ballWin[$ball]++;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                foreach ($ballOmmit as $b => $o) {
                    if ($o < 0) {
                        $ballOmmit[$b] = $iniOmit - $o;
                    }
                }
                $iIndex = 0;
                foreach ($ballOmmit as $b => $o) {
                    if ($iIndex >= $iColNeeds) {
                        break;
                    }
                    $row = array();
                    $row["num"] = (int)$b;
                    $row["nowMissing"] = $o == 0 ? $ballWin[$b] : -(int)$o;
                    $row["dayTotalNum"] = (int)$ballCnt[$b];
                    $row["dayMissing"] = $o;
                    $row["weekTotalNum"] = $o;
                    $row["monthTotalNum"] = $o;
                    $row["allTotalNum"] = $o;
                    $row["dataType"] = null;
                    $retData["t"][] = $row;
                    $iIndex++;
                }
                $keys = array_keys($retData["t"][0]);
                $retData["t"] = my_sort($retData["t"], $keys[$orderCloumn], $orderType == 1 ? SORT_DESC : SORT_ASC);
            }
            $ret = json_encode($retData);
            S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
        }
        return $ret;
    }

    function getPk10EobsLuZhu($type, $page, $lotType, $expire)
    {
        $cacheName = $type . '_' . $page;
        $ret = S($cacheName);
        if ($ret === false || $ret == '') {
            $module = M();
            $ZstData = '';
            $descrs = array("冠军", "亚军", "第三名", "第四名", "第五名", "第六名", "第七名", "第八名", "第九名", "第十名", "冠亚和");
            $date = empty($_GET['date']) ? date('Y-m-d') : $_GET['date'];
            $values = array();
            $cnt = array();
            $last = array();
            $index = array();
            for ($i = 0; $i < 3; $i++) {
                for ($j = 0; $j < 11; $j++) {
                    $values[$i][$j] = '';
                    $cnt[$i][$j] = 0;
                    $last[$i][$j] = '';
                    $index[$i][$j] = 1;
                }
            }
            $openedCaiList = $this->getLottoryByDate($module, $lotType, $date);
            foreach ($openedCaiList as $openedCai) {
                $OpenCodes = ZstAnalyser::getCodeArr($openedCai['dat_codes']);
                if (count($OpenCodes) != 10) {
                    continue;
                }
                $OpenCodes[10] = $OpenCodes[0] + $OpenCodes[9];
                for ($i = 0; $i < 10; $i++) {
                    $value = ZstAnalyser::getEvenOrOdd($OpenCodes[$i]);
                    $this->addPk10LzValue($values[0][$i], $value, "单", $cnt[0][$i], $last[0][$i], $index[0][$i]);
                    $threshold = 6;
                    if ($i == 10) {
                        $threshold = 12;
                    }
                    $value = ZstAnalyser::getBigOrSmall($OpenCodes[$i], $threshold);
                    $this->addPk10LzValue($values[1][$i], $value, "大", $cnt[1][$i], $last[1][$i], $index[1][$i]);
                }
            }
            for ($i = 0; $i < 10; $i++) {
                $this->addPk10LzHeader($values[0][$i], $i + 1, $cnt[0][$i], count($openedCaiList), "单", "双", $descrs[$i]);
                $ZstData = $ZstData . $values[0][$i] . "</td></tr></tbody></table></div></div>";
                $this->addPk10LzHeader($values[1][$i], $i + 1, $cnt[1][$i], count($openedCaiList), "大", "小", $descrs[$i]);
                $ZstData = $ZstData . $values[1][$i] . "</td></tr></tbody></table></div></div>";
            }
            $ret = "<div class=\"clear\"></div>" . $ZstData;
            S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
        }
        return $ret;
    }

    function addPk10LzValue(&$data, $value, $cntKey, &$cnt, &$lastValue, &$iIndex, $cntOther = '')
    {
        if ($value == $cntKey) {
            $cnt++;
        }
        if ($value != $lastValue) {
            if ($lastValue != '') {
                $data = $data . "</td>";
            }
            $data = $data . "<td class=\"" . ($iIndex % 2 == 0 ? "odd" : "even") . "\">";
            $lastValue = $value;
            $iIndex++;
        }
        if ($value == $cntOther) {
            $data = $data . "<p>" . $value . "</p>";
        } else {
            if ($value != $cntKey) {
                $data = $data . "<span>" . $value . "</span>";
            } else {
                $data = $data . "<label>" . $value . "</label>";
            }
        }
    }

    function addPk10LzHeader(&$value, $iBall, $iCnt, $iTotal, $first, $second, $descr)
    {
        $data = "";
        $data = $data . "<div class=\"luzhu t_{$iBall}\" style=\"width: 1198px; overflow-x: auto;\">";
        $data = $data . "<table class=\"roadmap-table-caption\"><tbody><tr>";
        $data = $data . "<td><span>今日累计：<span class=\"count\"> {$first}（{$iCnt}） {$second}（" . ($iTotal - $iCnt) . "） </span></span> {$descr}{$first}{$second}</td>";
        $data = $data . "</tr></tbody></table><div style=\"width: 1198px; overflow-x: auto;\" class=\"luzhu_scroll\">";
        $data = $data . "<table class=\"roadmap-table \"><tbody><tr valign=\"top\">";
        $value = $data . $value;
    }

    function getPk10GuanYaLuzhuBseo($type, $page, $lotType, $expire)
    {
        $cacheName = $type . '_' . $page;
        $ret = S($cacheName);
        if ($ret === false || $ret == '') {
            $module = M();
            $ZstData = '';
            $descrs = array("冠军", "亚军", "第三名", "第四名", "第五名", "第六名", "第七名", "第八名", "第九名", "第十名", "冠亚和");
            $date = empty($_GET['date']) ? date('Y-m-d') : $_GET['date'];
            $values = array();
            $cnt = array();
            $last = array();
            $index = array();
            for ($i = 0; $i < 3; $i++) {
                for ($j = 0; $j < 13; $j++) {
                    $values[$i][$j] = '';
                    $cnt[$i][$j] = 0;
                    $last[$i][$j] = '';
                    $index[$i][$j] = 1;
                }
            }
            $openedCaiList = $this->getLottoryByDate($module, $lotType, $date);
            foreach ($openedCaiList as $openedCai) {
                $OpenCodes = ZstAnalyser::getCodeArr($openedCai['dat_codes']);
                if (count($OpenCodes) != 10) {
                    continue;
                }
                $OpenCodes[10] = $OpenCodes[0] + $OpenCodes[9];
                for ($i = 0; $i < 1; $i++) {
                    $value = ZstAnalyser::getEvenOrOdd($OpenCodes[$i]);
                    $this->addPk10LzValue($values[0][$i], $value, "单", $cnt[0][$i], $last[0][$i], $index[0][$i]);
                    $threshold = 6;
                    if ($i == 10) {
                        $threshold = 12;
                    }
                    $value = ZstAnalyser::getBigOrSmall($OpenCodes[$i], $threshold);
                    $this->addPk10LzValue($values[1][$i], $value, "大", $cnt[1][$i], $last[1][$i], $index[1][$i]);
                }
                $j = 10;
                $value = $OpenCodes[10] >= 9 && $OpenCodes[$j] <= 14 ? "赢" : "输";
                $this->addPk10LuZhuHeOtherValue($values[0][$j], $value, "赢", $cnt[0][$j], $last[0][$j], $index[0][$j]);
                $j = 11;
                $value = $OpenCodes[10] <= 8 ? "赢" : "输";
                $this->addPk10LuZhuHeOtherValue($values[0][$j], $value, "赢", $cnt[0][$j], $last[0][$j], $index[0][$j]);
                $j = 12;
                $value = $OpenCodes[10] >= 15 ? "赢" : "输";
                $this->addPk10LuZhuHeOtherValue($values[0][$j], $value, "赢", $cnt[0][$j], $last[0][$j], $index[0][$j]);
            }
            for ($i = 0; $i < 1; $i++) {
                $this->addPk10LzHeader($values[0][$i], $i + 1, $cnt[0][$i], count($openedCaiList), "单", "双", $descrs[$i]);
                $ZstData = $ZstData . $values[0][$i] . "</td></tr></tbody></table></div></div>";
                $this->addPk10LzHeader($values[1][$i], $i + 1, $cnt[1][$i], count($openedCaiList), "大", "小", $descrs[$i]);
                $ZstData = $ZstData . $values[1][$i] . "</td></tr></tbody></table></div></div>";
            }
            $ZstData = "<div id='LuzhuSelectDate'><div class=\"clear\"></div>" . $ZstData . "</div>";
            $ZstData = $ZstData . "<div id='luzhuhe_other'><div class='tips'>小贴士：以下为冠亚19个和数，模式拆分为3组号码段，可以结合各个号段的路珠以选择机会突出的进行参考。</div>";
            $titles = array('冠亚和中段模式', '冠亚和前段模式', '冠亚和后段模式');
            $marks = array('9,10,11,12,13,14', '3,4,5,6,7,8', '15,16,17,18,19');
            for ($i = 0; $i < 3; $i++) {
                $ZstData = $ZstData . $this->getPk10LuZhuHeOtherTemplate($titles[$i], $cnt[0][10 + $i], count($openedCaiList) - $cnt[0][10 + $i], $values[0][10 + $i], $openedCaiList[0]["dat_expect"], $marks[$i]);
            }
            $ret = $ZstData;
            S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
        }
        return $ret;
    }

    function getPk10LuZhuHeOtherTemplate($descr, $value1, $value2, $cols, $expect, $mark)
    {
        $ret = '';
        $ret = $ret . "<table style='width: 100%;'><tr><td><table class='roadmap-table-caption'><tr><td style='text-align: center;'>{$descr}</td></tr></table>";
        $ret = $ret . "<table class='roadmap-table'><tr valign='top'>" . $cols;
        $ret = $ret . "</tr></table></td><td style='width: 200px; vertical-align: top;'><div class='betMode-one'><div class='head'>{$descr} ";
        $ret = $ret . "<span>中奖数量：{$value1} &nbsp;输&nbsp;{$value2}</span></div><div class='period'><span>期&nbsp;&nbsp;&nbsp;&nbsp;号：</span> <b>{$expect}</b></div>";
        $ret = $ret . "<div class='betdata'><div><span>冠亚和：</span> <span>{$mark}</span></div></div><div class='bottom'></div></div></td></tr></table>";
        return $ret;
    }

    function addPk10LuZhuHeOtherValue(&$data, $value, $cntKey, &$cnt, &$lastValue, &$iIndex)
    {
        if ($value == $cntKey) {
            $cnt++;
        }
        if ($value != $lastValue) {
            if ($lastValue != '') {
                $data = $data . "</td>";
            }
            $data = $data . "<td class=\"" . ($iIndex % 2 == 0 ? "odd" : "even") . "\">";
            $lastValue = $value;
            $iIndex++;
        }
        if ($value == $cntKey) {
            $data = $data . "<span>" . $value . "</span>";
        } else {
            $data = $data . "<p>" . $value . "</p>";
        }
    }

    function getPk10DataList($type, $page, $lotType, $expire)
    {
        $num = (int)wjStrFilter(I('get.num'));
        $count = (int)wjStrFilter(I('get.count'));
        $cacheName = $type . '_' . $page . '_' . $num . '_' . $count;
        $ret = S($cacheName);
        if ($ret === false || $ret == '') {
            $module = M();
            $retData["success"] = true;
            if (!($num >= 1 && $num <= 10) || !($count >= 0 && $count <= 100)) {
                $retData["success"] = false;
            } else {
                $openedCaiList = $this->getLottoryByCnt($module, $lotType, $count);
                $openedCaiList = array_reverse($openedCaiList);
                $nums = array();
                $pos = -1;
                foreach ($openedCaiList as $openedCai) {
                    $OpenCodes = ZstAnalyser::getCodeArr($openedCai['dat_codes']);
                    if (count($OpenCodes) != 10) {
                        continue;
                    }
                    if ($pos > -1) {
                        $nums[] = (int)$OpenCodes[$pos];
                    }
                    for ($i = 0; $i < 10; $i++) {
                        if ((int)$OpenCodes[$i] == $num) {
                            $pos = $i;
                            break;
                        }
                    }
                }
                $retData["nums"] = array_reverse($nums);
                $cnts = array_count_values($nums);
                for ($i = 0; $i < 10; $i++) {
                    if (array_key_exists($i + 1, $cnts)) {
                        $retData["num" . ($i + 1)] = $cnts[$i + 1];
                    } else {
                        $retData["num" . ($i + 1)] = null;
                    }
                }
            }
            $ret = json_encode($retData);
            S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
        }
        return $ret;
    }

    function findPk10TodayCount($type, $page, $lotType, $expire)
    {
        $cacheName = $type . '_' . $page;
        $ret = S($cacheName);
        if ($ret === false || $ret == '') {
            $module = M();
            $ZstData = '';
            $date = date('Y-m-d');
            $openedCaiList = $this->getLottoryByDate($module, $lotType, $date);
            $shows = array();
            $omits = array();
            $iniOmit = -1;
            for ($i = 0; $i < 10; $i++) {
                $ball = ($i < 9 ? "0" : "") . "" . ($i + 1);
                for ($j = 0; $j < 10; $j++) {
                    $shows[$ball][$j] = 0;
                    $omits[$ball][$j] = $iniOmit;
                }
            }
            foreach ($openedCaiList as $openedCai) {
                $OpenCodes = ZstAnalyser::getCodeArr($openedCai['dat_codes']);
                if (count($OpenCodes) != 10) {
                    continue;
                }
                for ($i = 0; $i < 10; $i++) {
                    $shows[$OpenCodes[$i]][$i]++;
                    if ($omits[$OpenCodes[$i]][$i] < 0) {
                        $omits[$OpenCodes[$i]][$i] = $iniOmit - $omits[$OpenCodes[$i]][$i];
                    }
                    foreach ($omits as $ball => $cnt) {
                        if ($ball != $OpenCodes[$i] && $omits[$ball][$i] < 0) {
                            $omits[$ball][$i]--;
                        }
                    }
                }
            }
            for ($i = 0; $i < 10; $i++) {
                $ball = ($i < 9 ? "0" : "") . "" . ($i + 1);
                for ($j = 0; $j < 10; $j++) {
                    if ($omits[$ball][$j] < 0) {
                        $omits[$ball][$j] = $iniOmit - $omits[$ball][$j];
                    }
                }
            }
            for ($i = 0; $i < 10; $i++) {
                $ball = ($i < 9 ? "0" : "") . ($i + 1);
                $ZstData = $ZstData . "<tr class='f14'>";
                for ($j = 0; $j < 10; $j++) {
                    $ZstData = $ZstData . "<td style='height: 30px;' class='ball'>" . ($i + 1) . "</td>";
                    $ZstData = $ZstData . "<td style='background: #fff;'>" . $shows[$ball][$j] . "</td>";
                    $v = $omits[$ball][$j];
                    $ZstData = $ZstData . "<td style='background: #fff;'><span class='" . ($v >= 15 ? "red" : "span") . "' data={$v}>{$v}</span></td>";
                }
                $ZstData = $ZstData . "</tr>";
            }
            $ret = $ZstData;
            S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
        }
        return $ret;
    }

    function findPk10LongHuLiShi($type, $page, $lotType, $expire)
    {

        //dump($type);dump($lotType);dump($expire);die;
        $gameId = (int)wjStrFilter(I('get.gameId'));
        $type = (int)wjStrFilter(I('get.type'));
        //dump($type);die;
        $rows = (int)wjStrFilter(I('get.rows'));
        $cacheName = $type . '_' . $page . '_' . $gameId . '_' . $type . '_' . $rows;

        $ret = S($cacheName);
        // dump(S($cacheName));die;
        if ($ret === false || $ret == '') {
            $ZstData = '';
            $module = M();
            $today = empty($_GET['date']) ? date('Y-m-d') : $_GET['date'];
            $lotType = $this->getLotTypeByGameId($gameId);
            //dump($lotTyped);die;
            $shows = $this->calZstDataPk10LongHuDay($module, $lotType, $today);
            $cfg = new ConfigMgr();
            $historyString = $cfg->getString($module, "pk10", "LongHuLiShi");
            $history = array();
            if ($historyString != NULL) {
                $history = json_decode($historyString, TRUE);
            }
            $foundNew = false;
            for ($i = 1; $i < 40; $i++) {
                $lastDay = date("Y-m-d", strtotime("-{$i} day", strtotime($today)));
                if ($history == NULL or !array_key_exists($lastDay, $history)) {
                    $history[$lastDay] = $this->calZstDataPk10LongHuDay($module, $lotType, $lastDay);
                    $foundNew = true;
                }
            }
            krsort($history);
            if (count($history) > 39) {
                $history = array_slice($history, 0, 39);
            }
            if ($foundNew) {
                $cfg->setValue($module, "pk10", "LongHuLiShi", json_encode($history));
            }
            $ZstData = $ZstData . "<tr class=\"even\"><td>{$today}</td>";
            for ($i = 0; $i < 5; $i++) {
                $ZstData = $ZstData . "<td>{$shows[$i][0]}</td><td>{$shows[$i][1]}</td>";
            }
            $ZstData = $ZstData . "</tr>";
            $iIndex = 0;
            foreach ($history as $date => $showsHis) {
                $isEmpty = true;
                $tmpData = '';
                foreach ($showsHis as $values) {
                    foreach ($values as $value) {
                        if ($value != 0) {
                            $isEmpty = false;
                        }
                    }
                    $tmpData = $tmpData . "<td>{$values[0]}</td><td>{$values[1]}</td>";
                }
                if ($isEmpty) {
                    break;
                }
                $ZstData = $ZstData . "<tr class=\"" . ($iIndex % 2 == 0 ? "odd" : "even") . "\"><td>{$date}</td>{$tmpData}</tr>";
                $iIndex++;
            }
            $ret = $ZstData;

            S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
        }
        return $ret;
    }

    function calZstDataPk10LongHuDay($module, $lotType, $day)
    {
        $shows = array();
        for ($i = 0; $i < 5; $i++) {
            for ($j = 0; $j < 2; $j++) {
                $shows[$i][$j] = 0;
            }
        }
        $openedCaiList = $this->getLottoryByDate($module, $lotType, $day);
        foreach ($openedCaiList as $openedCai) {
            $OpenCodes = ZstAnalyser::getCodeArr($openedCai['dat_codes']);
            if (count($OpenCodes) != 10) {
                continue;
            }
            for ($i = 0; $i < 5; $i++) {
                if ($OpenCodes[$i] > $OpenCodes[9 - $i]) {
                    $shows[$i][0]++;
                } else {
                    $shows[$i][1]++;
                }
            }
        }
        return $shows;
    }

    protected function getDataListByAll($type, $page, $lotType, $expire)
    {
        $count = (int)wjStrFilter(I('get.count'));
        $cacheName = $type . '_' . $page . '_' . $count;
        $ret = S($cacheName);
        if ($ret === false || $ret == '') {
            $module = M();
            $retData = array();
            $iOpenCodeCnt = $this->getOpenCodeCntByLotType($lotType);
            $iAllCodesCnt = $this->getAllCodesCntByLotType($lotType);
            $bFirstZero = $this->isStartFromZero($lotType);
            $openedCaiList = $this->getLottoryByCnt($module, $lotType, $count);
            $openedCaiList = array_reverse($openedCaiList);
            $nums = array();
            $pos = array();
            for ($i = 0; $i < $iAllCodesCnt; $i++) {
                $nums[$i] = array();
                $pos[$i] = -1;
            }
            foreach ($openedCaiList as $openedCai) {
                $OpenCodes = ZstAnalyser::getCodeArr($openedCai['dat_codes']);
                if (count($OpenCodes) != $iOpenCodeCnt) {
                    continue;
                }
                for ($i = 0; $i < $iAllCodesCnt; $i++) {
                    if ($pos[$i] > -1) {
                        $nums[$i][] = (int)$OpenCodes[$pos[$i]];
                        $pos[$i] = -1;
                    }
                }
                for ($i = 0; $i < $iOpenCodeCnt; $i++) {
                    if ($bFirstZero) {
                        $pos[(int)$OpenCodes[$i]] = $i;
                    } else {
                        $pos[(int)$OpenCodes[$i] - 1] = $i;
                    }
                }
            }
            for ($i = 0; $i < $iAllCodesCnt; $i++) {
                $nums[$i] = array_reverse($nums[$i]);
                $key = $i + 1;
                if ($bFirstZero) {
                    $key = $i;
                }
                $retData["num" . $key] = $nums[$i];
            }
            $ret = json_encode($retData);
            S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
        }
        return $ret;
    }

    function findPk10ColdHotNumber($type, $page, $lotType, $expire)
    {
        $cacheName = $type . '_' . $page;
        $ret = S($cacheName);
        if ($ret === false || $ret == '') {
            $module = M();
            $ZstData = '';
            $today = date("Y-m-d");
            $openedCaiList = $this->getLottoryByDate($module, $lotType, $today);
            $shows = array();
            for ($i = 0; $i < 10; $i++) {
                for ($j = 0; $j < 10; $j++) {
                    $ball = ($j < 9 ? "0" : "") . "" . ($j + 1);
                    $shows[$i][$ball] = 0;
                }
            }
            $iBallCnt = 1;
            foreach ($openedCaiList as $openedCai) {
                if ($iBallCnt > 20) {
                    break;
                }
                $OpenCodes = ZstAnalyser::getCodeArr($openedCai['dat_codes']);
                if (count($OpenCodes) != 10) {
                    continue;
                }
                for ($i = 0; $i < 10; $i++) {
                    $shows[$i][$OpenCodes[$i]]++;
                }
                $iBallCnt++;
            }
            $ZstData = $ZstData . "<table class='lot-table'><tbody><tr class='head'><td width='160'>名次</td><td>热</td><td>温</td><td>冷</td></tr>";
            for ($i = 0; $i < 10; $i++) {
                $ZstData = $ZstData . "<tr><td>第" . ($i + 1) . "名</td>";
                arsort($shows[$i]);
                $iColumn = 0;
                foreach ($shows[$i] as $ball => $cnt) {
                    $rowHead = "<td style='width: auto' class='nums'>";
                    if ($iColumn == 0) {
                        $ZstData = $ZstData . $rowHead;
                        $iColumn = 1;
                    }
                    if ($iColumn == 1) {
                        if ($cnt >= 4) {
                            $ZstData = $ZstData . "<i style='position: relative;' class='pk-no" . (int)$ball . "'>";
                            $ZstData = $ZstData . "<span style='display: none;' class='redBalls2'>{$cnt}</span></i>";
                        } else {
                            $ZstData = $ZstData . "</td>" . $rowHead;
                            $iColumn = 2;
                        }
                    }
                    if ($iColumn == 2) {
                        if ($cnt >= 2) {
                            $ZstData = $ZstData . "<i style='position: relative;' class='pk-no" . (int)$ball . "'></i>";
                        } else {
                            $ZstData = $ZstData . "</td>" . $rowHead;
                            $iColumn = 3;
                        }
                    }
                    if ($iColumn == 3) {
                        $ZstData = $ZstData . "<i style='position: relative;' class='pk-no" . (int)$ball . "'></i>";
                    }
                }
                $ZstData = $ZstData . "</td></tr>";
            }
            $ZstData = $ZstData . "</tbody></table>";
            $ret = $ZstData;
            S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
        }
        return $ret;
    }

    function getLmcList($type, $page, $param)
    {
        $dateType = (int)wjStrFilter(I('post.dateType'));
        $gameId = (int)wjStrFilter(I('post.gameId'));
        $rank = (int)wjStrFilter(I('post.rank'));
        $name = I('post.name');

        $expire = 2;
        $cacheName = $type . '_' . $page;
        $ret = S($cacheName);
        if ($ret === false || $ret == '') {
            $retData = array();
            $lotType = $this->getLotTypeByGameId($gameId);
            $iOpenCodeCnt = $this->getOpenCodeCntByLotType($lotType);
            $iAllCodesCnt = $this->getAllCodesCntByLotType($lotType);
            $bFirstZero = $this->isStartFromZero($lotType);

            //print_r($lotType.'-');print_r($iOpenCodeCnt.'-');print_r($iAllCodesCnt);exit;
            $retData["success"] = true;
            $retData["code"] = null;
            $retData["msg"] = null;
            $retData["t"] = null;
            if ($lotType == 0 || $rank < 0 || $rank > $iOpenCodeCnt || !($dateType > 0 && $dateType <= 12)) {
                $retData["msg"] = "参数异常";
            } else {
                $module = M();
                $today = date("Y-m-d");
                $totalDates = getDates(date("Y-m-d", strtotime("-{$dateType} month")), $today);
                $lotType = $this->getLotTypeByGameId($gameId);
                $shows = $this->calLmcListDay($module, $lotType, $today, $rank - 1, $iAllCodesCnt / 2, $name);
                $cfg = new ConfigMgr();
                $historyString = '';
                $history = array();
                if ($historyString != NULL) {
                    $history = json_decode($historyString, TRUE);
                }
                $foundNew = false;

                foreach ($totalDates as $d) {
                    $lastDay = $d;
                    if ($history == NULL or !array_key_exists($lastDay, $history)) {
                        $history[$lastDay] = $this->calLmcListDay($module, $lotType, $lastDay, $rank - 1, $iAllCodesCnt / 2, $name);
                        $foundNew = true;
                    }
                }

                krsort($history);
                if (count($history) > 365) {
                    $history = array_slice($history, 0, 365);
                }
                if ($foundNew) {
                    $cfg->setValue($module, "lotType_" . $lotType, "LmcList_" . $rank, json_encode($history));
                }
                foreach ($totalDates as $d) {
                    if (array_key_exists($d, $history)) {
                        foreach ($shows as $k => $a) {
                            foreach ($a as $t => $v) {
                                $shows[$k][$t] += $history[$d][$k][$t];
                            }
                        }
                    }
                }
                $dt = array(2, 1, 3, 4);
                foreach ($shows as $k => $a) {
                    foreach ($a as $t => $v) {
                        $row = array();
                        $row["id"] = null;
                        $row["gameId"] = $gameId;
                        $row["rank"] = $rank;
                        $row["dataType"] = $dt[$t];
                        $row["continuousNum"] = $k;
                        $row["continuousTotal"] = $v == 0 ? null : $v;
                        $row["addDate"] = null;
                        $row["addTime"] = null;
                        $retData["t"][] = $row;
                    }
                }
            }
            //   print_r($retData);exit;
            $ret = json_encode($retData);
            S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
        }
        return $ret;
    }

    function calLmcListDay($module, $lotType, $day, $rank, $threshold, $name)
    {
        $shows = array();
        $omits = array();
        for ($i = 1; $i < 31; $i++) {
            for ($j = 0; $j < 4; $j++) {
                $shows[$i][$j] = 0;
            }
        }
        for ($i = 0; $i < 4; $i++) {
            $omits[$i] = 0;
        }
        $openedCaiList = $this->getLottoryByDate($module, $lotType, $day);
        foreach ($openedCaiList as $openedCai) {
            $OpenCodes = ZstAnalyser::getCodeArr($openedCai['dat_codes']);
            if (count($OpenCodes) <= $rank) {
                continue;
            }
            if ($name == 'bjft') {
                if ($rank == 1) {
                    $code = (int)$OpenCodes[0] + (int)$OpenCodes[1] + (int)$OpenCodes[2];
                } else if ($rank == 2) {
                    $code = (int)$OpenCodes[4] + (int)$OpenCodes[5] + (int)$OpenCodes[6];
                } else {
                    $code = (int)$OpenCodes[7] + (int)$OpenCodes[8] + (int)$OpenCodes[9];
                }
                $code_1 = $code % 4;
                if ($code_1 == 0) {
                    $code_1 = 4;
                }

                $m = $code_1 >= 2 ? 0 : 1;
                $n = $code_1 >= 2 ? 1 : 0;
                $omits[$m]++;
                if ($omits[$n] > 0) {
                    $shows[$omits[$n]][$n]++;
                    $omits[$n] = 0;
                }
                $m = $code_1 % 2 != 0 ? 2 : 3;
                $n = $code_1 % 2 != 0 ? 3 : 2;
                $omits[$m]++;
                if ($omits[$n] > 0) {
                    $shows[$omits[$n]][$n]++;
                    $omits[$n] = 0;
                }
            } else if ($name == 'cqft') {
                $code = (int)$OpenCodes[0] + (int)$OpenCodes[1] + (int)$OpenCodes[2] + (int)$OpenCodes[3] + (int)$OpenCodes[4];
                $code_1 = $code % 4;
                if ($code_1 == 0) {
                    $code_1 = 4;
                }
                $m = $code_1 >= 2 ? 0 : 1;
                $n = $code_1 >= 2 ? 1 : 0;
                $omits[$m]++;

                if ($omits[$n] > 0) {
                    $shows[$omits[$n]][$n]++;
                    $omits[$n] = 0;
                }
                $m = $code_1 % 2 != 0 ? 2 : 3;
                $n = $code_1 % 2 != 0 ? 3 : 2;
                $omits[$m]++;
                if ($omits[$n] > 0) {
                    $shows[$omits[$n]][$n]++;
                    $omits[$n] = 0;
                }
            } else if ($lotType == 43) {
                $totalNum_a = (int)$OpenCodes[1] + (int)$OpenCodes[4] + (int)$OpenCodes[7] + (int)$OpenCodes[10] + (int)$OpenCodes[13] + (int)$OpenCodes[16];
                $totalNum_b = (int)$OpenCodes[2] + (int)$OpenCodes[5] + (int)$OpenCodes[8] + (int)$OpenCodes[11] + (int)$OpenCodes[14] + (int)$OpenCodes[17];
                $totalNum_c = (int)$OpenCodes[3] + (int)$OpenCodes[6] + (int)$OpenCodes[9] + (int)$OpenCodes[12] + (int)$OpenCodes[15] + (int)$OpenCodes[18];
                $totalNum = ($totalNum_a % 10) + ($totalNum_b % 10) + ($totalNum_c % 10);
                $m = $totalNum > 13 ? 0 : 1;
                $n = $totalNum > 14 ? 1 : 0;
                $omits[$m]++;
                if ($omits[$n] > 0) {
                    $shows[$omits[$n]][$n]++;
                    $omits[$n] = 0;
                }
                $m = $totalNum % 2 != 0 ? 2 : 3;
                $n = $totalNum % 2 != 0 ? 3 : 2;
                $omits[$m]++;
                if ($omits[$n] > 0) {
                    $shows[$omits[$n]][$n]++;
                    $omits[$n] = 0;
                }
            } else {
                $code = (int)$OpenCodes[$rank];

                $m = $code >= $threshold ? 0 : 1;
                $n = $code >= $threshold ? 1 : 0;
                $omits[$m]++;
                if ($omits[$n] > 0) {
                    $shows[$omits[$n]][$n]++;
                    $omits[$n] = 0;
                }
                $m = $code % 2 != 0 ? 2 : 3;
                $n = $code % 2 != 0 ? 3 : 2;
                $omits[$m]++;
                if ($omits[$n] > 0) {
                    $shows[$omits[$n]][$n]++;
                    $omits[$n] = 0;
                }
            }


        }

        for ($i = 0; $i < 4; $i++) {
            if ($omits[$i] > 0) {
                $shows[$omits[$i]][$i]++;
            }
        }

        return $shows;
    }

    function getTodayNum($type, $page, $param)
    {
        $gameId = (int)wjStrFilter(I('get.gameId'));
        $expire = 2;
        $cacheName = $type . '_' . $page . '_' . $gameId;
        $ret = S($cacheName);
        if ($ret === false || $ret == '') {
            $module = M();
            $retData = array();
            $ballCnt = array();
            $valueCnt = array();
            for ($i = 0; $i < 10; $i++) {
                $ballCnt[$i] = 0;
            }
            for ($i = 0; $i < 7; $i++) {
                $valueCnt[$i] = 0;
            }
            $lotType = $this->getLotTypeByGameId($gameId);
            $today = date("Y-m-d");
            $openedCaiList = $this->getLottoryByDate($module, $lotType, $today);
            for ($i = 0; $i < count($openedCaiList); $i++) {
                $OpenCodes = ZstAnalyser::getCodeArr($openedCaiList[$i]["dat_codes"]);
                for ($j = 0; $j < count($OpenCodes); $j++) {
                    $ball = (int)$OpenCodes[$j];
                    $ballCnt[$ball]++;
                    if ($ball % 2 != 0) {
                        $valueCnt[0]++;
                    } else {
                        $valueCnt[1]++;
                    }
                    if ($ball < 5) {
                        $valueCnt[2]++;
                    } else {
                        $valueCnt[3]++;
                    }
                }
                if ($OpenCodes[0] > end($OpenCodes)) {
                    $valueCnt[4]++;
                } else {
                    if ($OpenCodes[0] < end($OpenCodes)) {
                        $valueCnt[5]++;
                    } else {
                        $valueCnt[6]++;
                    }
                }
            }
            for ($i = 0; $i < count($ballCnt) + count($valueCnt); $i++) {
                if ($i < count($ballCnt)) {
                    $num = $i;
                    $total = $ballCnt[$i];
                    $dataType = 1;
                } else {
                    if ($i >= count($ballCnt) + 4) {
                        $num = $i - (count($ballCnt) + 4) + 1;
                        $total = $valueCnt[$i - count($ballCnt)];
                        $dataType = 2;
                    } else {
                        if ($i >= count($ballCnt) && $i < count($ballCnt) + 2) {
                            $num = $i - count($ballCnt) + 1;
                            $total = $valueCnt[$i - count($ballCnt)];
                            $dataType = 5;
                        } else {
                            if ($i >= count($ballCnt) + 2 && $i < count($ballCnt) + 4) {
                                $num = $i - (count($ballCnt) + 2) + 1;
                                $total = $valueCnt[$i - count($ballCnt)];
                                $dataType = 6;
                            }
                        }
                    }
                }
                $row = array();
                $row["num"] = $num;
                $row["dayTotalNum"] = $total;
                $row["nowMissing"] = null;
                $row["dayMissing"] = null;
                $row["weekTotalNum"] = null;
                $row["monthTotalNum"] = null;
                $row["allTotalNum"] = null;
                $row["dataType"] = $dataType;
                $retData[] = $row;
            }
            $ret = json_encode($retData);
            S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
        }
        return $ret;
    }

    function findPk10TwosideCount($type, $page, $lotType, $expire)
    {
        $typeA = (int)wjStrFilter(I('get.type'));
        $cacheName = $type . '_' . $page . '_' . $typeA;
        $ret = S($cacheName);
        if ($ret === false || $ret == '') {
            $zstData = '';
            if ($typeA > 0 && $typeA <= 10) {
                $module = M();
                $shows = array();
                $openedCaiList = $this->getLottoryByCnt($module, $lotType, 200);
                $iIndex = 0;
                foreach ($openedCaiList as $openedCai) {
                    $OpenCodes = ZstAnalyser::getCodeArr($openedCai['dat_codes']);
                    if (count($OpenCodes) < 10) {
                        continue;
                    }
                    $m = (int)($iIndex / 10);
                    if ($iIndex % 10 == 0) {
                        $shows[$m]["date"] = '';
                        $shows[$m]["start"] = '';
                        $shows[$m]["end"] = '';
                        $shows[$m]["da"] = 0;
                        $shows[$m]["xiao"] = 0;
                        $shows[$m]["dan"] = 0;
                        $shows[$m]["shuang"] = 0;
                    }
                    if ($shows[$m]["start"] == '' || $openedCai['dat_expect'] < $shows[$m]["start"]) {
                        $shows[$m]["date"] = date('Y-m-d', $openedCai["dat_open_time"]);
                        $shows[$m]["start"] = $openedCai['dat_expect'];
                    }
                    if ($shows[$m]["end"] == '') {
                        $shows[$m]["end"] = $openedCai['dat_expect'];
                    }
                    if ($OpenCodes[$type - 1] >= 6) {
                        $shows[$m]["da"]++;
                    } else {
                        $shows[$m]["xiao"]++;
                    }
                    if ($OpenCodes[$type - 1] % 2 != 0) {
                        $shows[$m]["dan"]++;
                    } else {
                        $shows[$m]["shuang"]++;
                    }
                    $iIndex++;
                }
                $zstData = "<caption></caption><tbody><tr class='head'><td><b>日期</b></td><td width='18%'><b>单</b></td><td width='18%'><b>双</b></td><td width='18%'><b>大</b></td><td width='18%'><b>小</b></td></tr>";
                for ($i = 0; $i < 20; $i++) {
                    $zstData = $zstData . "<tr class='" . ($i % 2 == 0 ? "odd" : "even") . "'><td class='align'><table cellspacing='0' cellpadding='0' class='ptable'>";
                    $zstData = $zstData . "<tbody><tr><td class='td1'>{$shows[$i]["date"]}</td><td class='td2'>";
                    $zstData = $zstData . "<span>{$shows[$i]["start"]}-{$shows[$i]["end"]} 期</span></td></tr></tbody></table></td>";
                    $zstData = $zstData . "<td>{$shows[$i]["da"]}</td><td>{$shows[$i]["xiao"]}</td><td>{$shows[$i]["dan"]}</td><td>{$shows[$i]["shuang"]}</td></tr>";
                }
            }
            $ret = $zstData;
            S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
        }
        return $ret;
    }

    function getPk10AwardList($type, $page, $lotType, $expire)
    {
        $count = (int)wjStrFilter(I('get.count'));
        $cacheName = $type . '_' . $page . '_' . $count;
        $ret = S($cacheName);
        if ($ret === false || $ret == '') {
            $zstData = '';
            $retData = array();
            $retData['datas'] = null;
            if ($count > 0 && $count <= 100) {
                $module = M();
                $openedCaiList = $this->getLottoryByCnt($module, $lotType, $count);
                foreach ($openedCaiList as $openedCai) {
                    $OpenCodes = ZstAnalyser::getCodeArr($openedCai['dat_codes']);
                    if (count($OpenCodes) < 10) {
                        continue;
                    }
                    $row = array();
                    $row['p'] = (double)$openedCai['dat_expect'];
                    for ($i = 0; $i < count($OpenCodes); $i++) {
                        $OpenCodes[$i] = (int)$OpenCodes[$i];
                    }
                    $row['nums'] = $OpenCodes;
                    $retData['datas'][] = $row;
                }
            }
            $ret = json_encode($retData);
            S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
        }
        return $ret;
    }

    function getPk10PositionTrendData($type, $page, $lotType, $expire)
    {
        $ball = (int)wjStrFilter(I('get.ball'));
        $count = (int)wjStrFilter(I('get.count'));
        $cacheName = $lotType . '_' . $page . '_' . $ball . '_' . $count;
        $ret = S($cacheName);
        if ($ret === false || $ret == '') {
            $module = M();
            $retData = array();
            $openedCaiList = $this->getLottoryByCnt($module, $lotType, $count);
            for ($i = 0; $i < count($openedCaiList); $i++) {
                $OpenCodes = ZstAnalyser::getCodeArr($openedCaiList[$i]["dat_codes"]);
                if (count($OpenCodes) < 10 || strlen($openedCaiList[$i]["dat_expect"]) < 2) {
                    continue;
                }
                for ($j = 0; $j < 10; $j++) {
                    if ((int)$OpenCodes[$j] == $ball) {
                        break;
                    }
                }
                $retData[$i]["value"] = "" . ($j + 1);
                $retData[$i]["key"] = substr($openedCaiList[$i]["dat_expect"], -2);
            }
            $ret = json_encode($retData);
            S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
        }
        return $ret;
    }

    function getPk10GuangYaTrendData($type, $page, $lotType, $expire)
    {
        $count = (int)wjStrFilter(I('get.count'));
        $cacheName = $lotType . '_' . $page . '_' . $count;
        $ret = S($cacheName);
        if ($ret === false || $ret == '') {
            $module = M();
            $retData = array();
            $openedCaiList = $this->getLottoryByCnt($module, $lotType, $count);
            for ($i = 0; $i < count($openedCaiList); $i++) {
                $OpenCodes = ZstAnalyser::getCodeArr($openedCaiList[$i]["dat_codes"]);
                if (count($OpenCodes) < 10 || strlen($openedCaiList[$i]["dat_expect"]) < 2) {
                    continue;
                }
                $retData[$i]["Value"] = "" . ($OpenCodes[0] + $OpenCodes[1]);
                $retData[$i]["Key"] = substr($openedCaiList[$i]["dat_expect"], -2);
            }
            $ret = json_encode($retData);
            S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
        }
        return $ret;
    }

    function getTwoBallRemind($type, $page, $lotType, $expire)
    {
        $cacheName = $lotType . '_' . $page;
        $ret = S($cacheName);
        if ($ret === false || $ret == '') {
            $module = M();
            $retData = array();
            $iOpenCodeCnt = $this->getOpenCodeCntByLotType($lotType);
            $iAllCodesCnt = $this->getAllCodesCntByLotType($lotType);
            $today = date("Y-m-d");
            $openedCaiList = $this->getLottoryByDate($module, $lotType, $today);
            $retData["TwoSided"] = "";
            $retData["OmitTodayMax"] = 0;
            $retData["IssueToday"] = 0;
            $retData["OmitCurrent"] = 0;
            $omit = 0;
            for ($i = 0; $i < count($openedCaiList); $i++) {
                $OpenCodes = ZstAnalyser::getCodeArr($openedCaiList[$i]["dat_codes"]);
                if (count($OpenCodes) < $iOpenCodeCnt) {
                    continue;
                }
                for ($j = 0; $j < count($OpenCodes); $j++) {
                    $OpenCodes[$j] = (int)$OpenCodes[$j];
                }
                $twoBall = ZstAnalyser::fetchRepeatMemberInArray($OpenCodes);
                if (count($twoBall) > 0) {
                    if ($i == 0) {
                        $retData["TwoSided"] = implode(',', $twoBall);
                    }
                    $omit = 0;
                } else {
                    if ($retData["OmitCurrent"] == $i) {
                        $retData["OmitCurrent"]++;
                    }
                    $retData["IssueToday"]++;
                    $omit++;
                    if ($omit > $retData["OmitTodayMax"]) {
                        $retData["OmitTodayMax"] = $omit;
                    }
                }
            }
            $retData["IssueNext"] = count($openedCaiList) - $retData["IssueToday"];
            $ret = json_encode($retData);
            S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
        }
        return $ret;
    }

    function getcqsscLuZhuTongji($type, $page, $lotType, $expire)
    {
        $typeA = wjStrFilter(I('get.type'));
        $date = wjStrFilter(I('get.date'));
        $today = empty($_GET['date']) ? date('Y-m-d') : $_GET['date'];
        if ($date == '' || $date > $today) {
            $date = $today;
        }
        $cacheName = $type . '_' . $page . '_' . $typeA . '_' . $date;
        $ret = S($cacheName);
        if ($ret === false || $ret == '') {
            $ZstData = '';
            $module = M();
            if ($typeA == 'bseo') {
                $values = array();
                $cnt = array();
                $last = array();
                $index = array();
                for ($i = 0; $i < 2; $i++) {
                    for ($j = 0; $j < 5; $j++) {
                        $values[$i][$j] = '';
                        $cnt[$i][$j] = 0;
                        $last[$i][$j] = '';
                        $index[$i][$j] = 1;
                    }
                }
                $openedCaiList = $this->getLottoryByDate($module, $lotType, $date);
                foreach ($openedCaiList as $openedCai) {
                    $OpenCodes = ZstAnalyser::getCodeArr($openedCai['dat_codes']);
                    if (count($OpenCodes) != 5) {
                        continue;
                    }
                    for ($i = 0; $i < 5; $i++) {
                        $value = ZstAnalyser::getEvenOrOdd($OpenCodes[$i]);
                        $this->addPk10LzValue($values[0][$i], $value, "单", $cnt[0][$i], $last[0][$i], $index[0][$i]);
                        $threshold = 5;
                        $value = ZstAnalyser::getBigOrSmall($OpenCodes[$i], $threshold);
                        $this->addPk10LzValue($values[1][$i], $value, "大", $cnt[1][$i], $last[1][$i], $index[1][$i]);
                    }
                }
                for ($i = 0; $i < 5; $i++) {
                    $this->addPk10LzHeader($values[1][$i], $i + 1, $cnt[1][$i], count($openedCaiList), "大", "小", "第" . ($i + 1) . "球");
                    $ZstData = $ZstData . $values[1][$i] . "</td></tr></tbody></table></div></div>";
                    $this->addPk10LzHeader($values[0][$i], $i + 1, $cnt[0][$i], count($openedCaiList), "单", "双", "第" . ($i + 1) . "球");
                    $ZstData = $ZstData . $values[0][$i] . "</td></tr></tbody></table></div></div>";
                }
                $ZstData = "<div class=\"clear\"></div>" . $ZstData;
            } else {
                if ($typeA == 'total') {
                    $values = array();
                    $cnt = array();
                    $last = array();
                    $index = array();
                    for ($i = 0; $i < 2; $i++) {
                        for ($j = 0; $j < 1; $j++) {
                            $values[$i][$j] = '';
                            $cnt[$i][$j] = 0;
                            $last[$i][$j] = '';
                            $index[$i][$j] = 1;
                        }
                    }
                    $openedCaiList = $this->getLottoryByDate($module, $lotType, $today);
                    foreach ($openedCaiList as $openedCai) {
                        $OpenCodes = ZstAnalyser::getCodeArr($openedCai['dat_codes']);
                        if (count($OpenCodes) != 5) {
                            continue;
                        }
                        $sum = ZstAnalyser::getArrSum($OpenCodes);
                        for ($i = 0; $i < 1; $i++) {
                            $value = ZstAnalyser::getEvenOrOdd($sum);
                            $this->addPk10LzValue($values[0][$i], $value, "单", $cnt[0][$i], $last[0][$i], $index[0][$i]);
                            $threshold = 23;
                            $value = ZstAnalyser::getBigOrSmall($sum, $threshold);
                            $this->addPk10LzValue($values[1][$i], $value, "大", $cnt[1][$i], $last[1][$i], $index[1][$i]);
                        }
                    }
                    for ($i = 0; $i < 1; $i++) {
                        $this->addcqsscLonghuLuzhuDataHeader($values[1][$i], $cnt[1][$i], count($openedCaiList) - $cnt[1][$i], 0, "大", "小", "", "总和");
                        $ZstData = $ZstData . $values[1][$i] . "</td></tr></tbody></table></div></div>";
                        $this->addcqsscLonghuLuzhuDataHeader($values[0][$i], $cnt[0][$i], count($openedCaiList) - $cnt[0][$i], 0, "单", "双", "", "总和");
                        $ZstData = $ZstData . $values[0][$i] . "</td></tr></tbody></table></div></div>";
                    }
                    $ZstData = "<div class=\"clear\"></div>" . $ZstData;
                }
            }
            $ret = $ZstData;
            S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
        }
        return $ret;
    }

    function getcqsscLonghuLuzhuData($type, $page, $lotType, $expire, $name)
    {
        $cacheName = $type . '_' . $page;
        $ret = S($cacheName);
        if ($ret === false || $ret == '') {
            $ZstData = '';
            $module = M();
            $today = empty($_GET['date']) ? date('Y-m-d') : $_GET['date'];
            $values = array();
            $cnt = array();
            $last = array();
            $index = array();
            $cntEqual = 0;
            for ($i = 0; $i < 1; $i++) {
                for ($j = 0; $j < 1; $j++) {
                    $values[$i][$j] = '';
                    $cnt[$i][$j] = 0;
                    $last[$i][$j] = '';
                    $index[$i][$j] = 1;
                }
            }
            $openedCaiList = $this->getLottoryByDate($module, $lotType, $today);
            $data = array();
            $data1 = array();
            foreach ($openedCaiList as $k => $openedCai) {
                $OpenCodes = ZstAnalyser::getCodeArr($openedCai['dat_codes']);
                if (count($OpenCodes) != 5) {
                    continue;
                }
                if (empty($name)) {
                    for ($i = 0; $i < 1; $i++) {
                        $value = ZstAnalyser::getDragonOrTiger($OpenCodes[$i], $OpenCodes[4 - $i]);
                        $this->addPk10LzValue($values[0][$i], $value, "龙", $cnt[0][$i], $last[0][$i], $index[0][$i], "和");
                        if ($OpenCodes[$i] == $OpenCodes[4 - $i]) {
                            $cntEqual++;
                        }
                    }
                } else {
                    $num = $OpenCodes[0] + $OpenCodes[1] + $OpenCodes[2] + $OpenCodes[3] + $OpenCodes[4];
                    $num = $num % 4;
                    $data[$k] = $num;
//                    if($num == 0){
//                        $num_tow = 4;
//                    }
//                    if($num_tow >= 2 ){
//                        $data['dx'][$k] = '小';
//                    }else{
//                        $data['dx'][$k]= '大';
//                    }
//                    if($num_tow%2 == 0 ){
//                        $data['ds'][$k] = '双';
//                    }else{
//                        $data['ds'][$k] = '单';
//                    }
                    //  print_r($data);
                }

            }

            if (empty($name)) {
                for ($i = 0; $i < 1; $i++) {
                    $this->addcqsscLonghuLuzhuDataHeader($values[0][$i], $cnt[0][$i], count($openedCaiList) - $cnt[0][$i] - $cntEqual, $cntEqual, "龙", "虎", "和", "龙虎");
                    $ZstData = $ZstData . $values[0][$i] . "</td></tr></tbody></table></div>";
                }
                $ret = $ZstData;
                S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
            } else {
                $html1 = '';
                // $text='';
                $n = 0;
                $n2 = 0;
                $n3 = 0;
                $n4 = 0;
                foreach ($data as $k => $v) {
                    if ($v == 0) {
                        $v = 4;
                    }

                    if ($v >= 2) {
                        $html1 .= "<td class='odd'><label>小</label></td>";
                        $n++;
                        // $data1['dx'][$k]='小';
                    } else {
                        $html1 .= "<td class='even'><p>大</p></td>";
                        $n2++;
                        //  $data1['dx'][$k]='大';
                    }
                    if ($v % 2 == 0) {
                        $html1 .= "<td class=\"even\"><span>双</span></td>";
                        $n3++;
                    } else {
                        $html1 .= "<td class='odd'><label style=\"font-weight: bold; display: block;\">单</label></td>";
                        $n4++;
                    }


                }
                $html = "<div class=\"luzhu_scroll\" style=\"width: 1198px; overflow-x: auto;\"><table class=\"roadmap-table \"><tbody><tr valign=\"top\">" . $html1 . "</tr></tbody></table></div>";
                $text = " <table class=\"roadmap-table-caption\"><tbody><tr><td><span>今日号码累计：<span class=\"count\"> 大（" . $n2 . "） 小（" . $n . "） 单（" . $n4 . "）双（" . $n3 . "）</span> 番摊</span></td></tr></tbody></table>";


                $ret = $text . $html;
                //print_r($data1);exit;
            }

        }
        return $ret;

    }

    function addcqsscLonghuLuzhuDataHeader(&$value, $iCntOne, $iCntTwo, $iCntThree, $first, $second, $three, $descr)
    {
        $data = "";
        $data = $data . "<table class=\"roadmap-table-caption\"><tbody><tr>";
        $data = $data . "<td><span>今日号码累计：<span class=\"count\"> {$first}（{$iCntOne}） {$second}（{$iCntTwo}） ";
        if ($three != '') {
            $data = $data . "{$three}（{$iCntThree}） ";
        }
        $data = $data . "</span></span> {$descr}</td>";
        $data = $data . "</tr></tbody></table><div style=\"width: 1198px; overflow-x: auto;\" class=\"luzhu_scroll\">";
        $data = $data . "<table class=\"roadmap-table \"><tbody><tr valign=\"top\">";
        $value = $data . $value;
    }

    function getcqsscHaomaLuData($type, $page, $lotType, $expire)
    {

//        dump($type);dump($page);dump($lotType);dump($expire);die;
        $date = wjStrFilter(I('get.date'));
        $today = date("Y-m-d");
        if ($date == '' || $date > $today) {
            $date = $today;
        }
        $cacheName = $type . '_' . $page . '_' . $date;
        $ret = S($cacheName);
        //dump($ret);die;
        if ($ret === false || $ret == '') {
            $ZstData = '';
            $module = M();
            $iOpenCodeCnt = $this->getOpenCodeCntByLotType($lotType);
            $iAllCodesCnt = $this->getAllCodesCntByLotType($lotType);
            $values = array();
            $cnt = array();
            $last = array();
            $index = array();

            for ($i = 0; $i < 1; $i++) {
                for ($j = 0; $j < $iAllCodesCnt; $j++) {
                    $values[$i][$j] = '';
                    $cnt[$i][$j] = 0;
                    $last[$i][$j] = '';
                    $index[$i][$j] = 1;
                }
            }
            // dump($index);die;
            $openedCaiList = $this->getLottoryByDate($module, $lotType, $date);
            foreach ($openedCaiList as $openedCai) {
                $OpenCodes = ZstAnalyser::getCodeArr($openedCai['dat_codes']);
                if (count($OpenCodes) != $iOpenCodeCnt) {
                    continue;
                }
                for ($i = 0; $i < $iOpenCodeCnt; $i++) {
                    $OpenCodes[$i] = (int)$OpenCodes[$i];
                }
                for ($i = 0; $i < $iAllCodesCnt; $i++) {
                    if (in_array($i, $OpenCodes)) {
                        $this->addPk10LzValue($values[0][$i], '√', "×", $cnt[0][$i], $last[0][$i], $index[0][$i]);
                    } else {
                        $this->addPk10LzValue($values[0][$i], '×', "×", $cnt[0][$i], $last[0][$i], $index[0][$i]);
                    }
                }
            }
            for ($i = 0; $i < $iAllCodesCnt; $i++) {
                $this->addcqsscLonghuLuzhuDataHeader($values[0][$i], count($openedCaiList) - $cnt[0][$i], $cnt[0][$i], 0, "总来", "没来", "", "号码" . $i);
                $ZstData = $ZstData . "<div class='luzhu t_" . ($i + 1) . "' style='display: block;'>" . $values[0][$i] . "</td></tr></tbody></table></div></div>";
            }
            $ZstData = "<div class=\"clear\"></div>" . $ZstData;
            $ret = $ZstData;
            S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
        }
        return $ret;
    }

    function getNumberStat($type, $page, $lotType, $expire)
    {
        $cacheName = $type . '_' . $page . '_' . wjStrFilter(I('get.today'));
        $ret = S($cacheName);
        if ($ret === false || $ret == '') {
            $module = M();
            $retData = array();
            $iOpenCodeCnt = $this->getOpenCodeCntByLotType($lotType);
            $iAllCodesCnt = $this->getAllCodesCntByLotType($lotType);
            $bFirstZero = $this->isStartFromZero($lotType);
            $today = date("Y-m-d");
            $shows = $this->calcqsscNumberStatDay($module, $lotType, $today);

            $dataTypes = array();
            for ($i = 0; $i < $iAllCodesCnt; $i++) {
                $dataTypes[] = array(1, $i);
            }
            $dataTypes[] = array(5, 1);
            $dataTypes[] = array(5, 2);
            $dataTypes[] = array(6, 1);
            $dataTypes[] = array(6, 2);
            $dataTypes[] = array(2, 1);
            $dataTypes[] = array(2, 2);
            $dataTypes[] = array(2, 3);
            for ($i = 0; $i < count($shows); $i++) {
                $row = array();
                $row['id'] = null;
                $row['gameId'] = null;
                $row['rank'] = null;
                $row['dataType'] = $dataTypes[$i][0];
                $row['num'] = $dataTypes[$i][1];
                $row['nowMissing'] = null;
                $row['dayMissing'] = null;
                $row['dayTotalNum'] = $shows[$i];
                $row['lotteryDate'] = $today;
                $row['lotteryTime'] = null;
                $retData[] = $row;
            }
            if (wjStrFilter(I('get.today')) == '') {
                $cfg = new ConfigMgr();
                $historyString = $cfg->getString($module, $type, "NumberStatLast19Days");
                $history = array();
                if ($historyString != NULL) {
                    $history = json_decode($historyString, TRUE);
                }
                $foundNew = false;
                for ($i = 0; $i < 19; $i++) {
                    $lastDay = date("Y-m-d", strtotime("-{$i} day", strtotime($today)));
                    if ($history == NULL or !array_key_exists($lastDay, $history)) {
                        $history[$lastDay] = $this->calcqsscNumberStatDay($module, $lotType, $lastDay);
                        $foundNew = true;
                    }
                }
                krsort($history);
                if (count($history) > 29) {
                    $history = array_slice($history, 0, 29);
                }
                if ($foundNew) {
                    $cfg->setValue($module, $type, "NumberStatLast19Days", json_encode($history));
                }
                foreach ($history as $date => $showsHis) {
                    $isEmpty = true;
                    foreach ($showsHis as $value) {
                        if ($value != 0) {
                            $isEmpty = false;
                        }
                    }
                    //if ($isEmpty) {
                    //    break;
                    //}
                    if (!$isEmpty) {
                        for ($i = 0; $i < count($showsHis); $i++) {
                            $row = array();
                            $row['id'] = null;
                            $row['gameId'] = null;
                            $row['rank'] = null;
                            $row['dataType'] = $dataTypes[$i][0];
                            $row['num'] = $dataTypes[$i][1];
                            $row['nowMissing'] = null;
                            $row['dayMissing'] = null;
                            $row['dayTotalNum'] = $showsHis[$i];
                            $row['lotteryDate'] = $date;
                            $row['lotteryTime'] = null;
                            $retData[] = $row;
                        }
                    }
                }
            }
            $ret = json_encode($retData);
            S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
        }
        return $ret;
    }

    function calcqsscNumberStatDay($module, $lotType, $day)
    {
        $shows = array();
        $iOpenCodeCnt = $this->getOpenCodeCntByLotType($lotType);
        $iAllCodesCnt = $this->getAllCodesCntByLotType($lotType);
        $bFirstZero = $this->isStartFromZero($lotType);
        for ($i = 0; $i < $iAllCodesCnt + 7; $i++) {
            $shows[$i] = 0;
        }

        $openedCaiList = $this->getLottoryByDate($module, $lotType, $day);

        foreach ($openedCaiList as $openedCai) {
            $OpenCodes = ZstAnalyser::getCodeArr($openedCai['dat_codes']);

            if (count($OpenCodes) != $iOpenCodeCnt) {
                continue;
            }
            for ($i = 0; $i < $iOpenCodeCnt; $i++) {
                if ($bFirstZero) {
                    $shows[(int)$OpenCodes[$i]]++;
                } else {
                    $shows[(int)$OpenCodes[$i] - 1]++;
                }
                if ($OpenCodes[$i] % 2 != 0) {
                    $shows[$iAllCodesCnt]++;
                } else {
                    $shows[$iAllCodesCnt + 1]++;
                }
                if ($OpenCodes[$i] > $iAllCodesCnt / 2) {
                    $shows[$iAllCodesCnt + 2]++;
                } else {
                    $shows[$iAllCodesCnt + 3]++;
                }
                if ($i == 0) {
                    if ($OpenCodes[0] > $OpenCodes[$iOpenCodeCnt - 1]) {
                        $shows[$iAllCodesCnt + 4]++;
                    } else {
                        if ($OpenCodes[0] < $OpenCodes[$iOpenCodeCnt - 1]) {
                            $shows[$iAllCodesCnt + 5]++;
                        } else {
                            $shows[$iAllCodesCnt + 6]++;
                        }
                    }
                }
            }
        }

        return $shows;
    }

    function getTwoSidedStat($type, $page, $lotType, $expire)
    {

        $id = (int)wjStrFilter(I('get.id'));

        $cacheName = $type . '_' . $page . '_' . $id;
        $ret = S($cacheName);
        if ($ret === false || $ret == '') {
            $shows = array();
            $iOpenCodeCnt = $this->getOpenCodeCntByLotType($lotType);
            $iAllCodesCnt = $this->getAllCodesCntByLotType($lotType);

            $bFirstZero = $this->isStartFromZero($lotType);

            if ($id > 0 && $id <= $iOpenCodeCnt) {
                $module = M();
                $openedCaiList = $this->getLottoryByCnt($module, $lotType, 200);
                $iIndex = 0;
                //print_r($openedCaiList);exit;
                foreach ($openedCaiList as $openedCai) {
                    $OpenCodes = ZstAnalyser::getCodeArr($openedCai['dat_codes']);
                    if (count($OpenCodes) != $iOpenCodeCnt) {
                        continue;
                    }
                    $m = (int)($iIndex / 10);
                    if ($iIndex % 10 == 0) {
                        $shows[$m]["small"] = 0;
                        $shows[$m]["big"] = 0;
                        $shows[$m]["startIndex"] = 0;
                        $shows[$m]["even"] = 0;
                        $shows[$m]["endIndex"] = 0;
                        $shows[$m]["lDate"] = '';
                        $shows[$m]["odd"] = 0;
                    }
                    $shows[$m]["lDate"] = date('Y-m-d', $openedCai["dat_open_time"]);

                    if ($lotType == 1 || $lotType == 34 || $lotType == 47 || $lotType == 48 || $lotType == 6 || $lotType == 21 | $lotType == 45) {
                        $shows[$m]["endIndex"] = substr($openedCai['dat_expect'], 6);
                        if ($shows[$m]["startIndex"] == 0) {
                            $shows[$m]["startIndex"] = substr($openedCai['dat_expect'], 6);
                        }
                    } else {
                        $shows[$m]["endIndex"] = $openedCai['dat_expect'];
                        if ($shows[$m]["startIndex"] == 0) {
                            $shows[$m]["startIndex"] = $openedCai['dat_expect'];
                        }
                    }

                    if ($lotType == 20 || $lotType == 34 || $lotType == 46 || $lotType == 47) {
                        $code = $OpenCodes[0] + $OpenCodes[1];
                        $code_num = 11;
                    } else if ($lotType == 1 || $lotType == 45 || $lotType == 48 || $lotType == 44 || $lotType == 6) {
                        $code = array_sum($OpenCodes);
                        $code_num = 22;
                    }

                    if ($code > $code_num) {
                        $shows[$m]["big"]++;
                    } else {
                        $shows[$m]["small"]++;
                    }
                    if ($code % 2 != 0) {
                        $shows[$m]["even"]++;
                    } else {
                        $shows[$m]["odd"]++;
                    }
//                    if ($OpenCodes[$id - 1] > $iOpenCodeCnt / 2) {
//                        $shows[$m]["big"]++;
//                    } else {
//                        $shows[$m]["small"]++;
//                    }
//                    if ($OpenCodes[$id - 1] % 2 != 0) {
//                        $shows[$m]["even"]++;
//                    } else {
//                        $shows[$m]["odd"]++;
//                    }
                    $iIndex++;
                }
            }

            $ret = json_encode($shows);
            S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
        }
        return $ret;
    }

    function getGdkl10LuZhuTongji($type, $page, $lotType, $expire)
    {
        $typeA = (int)wjStrFilter(I('get.type'));
        $date = empty($_GET['date']) ? date('Y-m-d') : $_GET['date'];
        $today = empty($_GET['date']) ? date('Y-m-d') : $_GET['date'];
        if ($date == '' || $date > $today) {
            $date = $today;
        }
        $cacheName = $type . '_' . $page . '_' . $typeA . '_' . $date;
        $ret = S($cacheName);
        if ($ret === false || $ret == '') {
            $ZstData = '';
            $module = M();
            $iOpenCodeCnt = $this->getOpenCodeCntByLotType($lotType);
            $iAllCodesCnt = $this->getAllCodesCntByLotType($lotType);
            $bFirstZero = $this->isStartFromZero($lotType);
            if ($typeA == '4') {
                $values = array();
                $cnt = array();
                $last = array();
                $index = array();
                for ($i = 0; $i < 2; $i++) {
                    for ($j = 0; $j < $iOpenCodeCnt; $j++) {
                        $values[$i][$j] = '';
                        $cnt[$i][$j] = 0;
                        $last[$i][$j] = '';
                        $index[$i][$j] = 1;
                    }
                }
                $openedCaiList = $this->getLottoryByDate($module, $lotType, $date);
                foreach ($openedCaiList as $openedCai) {
                    $OpenCodes = ZstAnalyser::getCodeArr($openedCai['dat_codes']);
                    if (count($OpenCodes) != $iOpenCodeCnt) {
                        continue;
                    }
                    for ($i = 0; $i < $iOpenCodeCnt; $i++) {
                        $value = ZstAnalyser::getEvenOrOdd($OpenCodes[$i]);
                        $this->addPk10LzValue($values[0][$i], $value, "单", $cnt[0][$i], $last[0][$i], $index[0][$i]);
                        $threshold = 11;
                        $value = ZstAnalyser::getBigOrSmall($OpenCodes[$i], $threshold);
                        $this->addPk10LzValue($values[1][$i], $value, "大", $cnt[1][$i], $last[1][$i], $index[1][$i]);
                    }
                }
                for ($i = 0; $i < $iOpenCodeCnt; $i++) {
                    $this->addPk10LzHeader($values[1][$i], $i + 1, $cnt[1][$i], count($openedCaiList), "大", "小", "第" . ($i + 1) . "球");
                    $ZstData = $ZstData . $values[1][$i] . "</td></tr></tbody></table></div></div>";
                    $this->addPk10LzHeader($values[0][$i], $i + 1, $cnt[0][$i], count($openedCaiList), "单", "双", "第" . ($i + 1) . "球");
                    $ZstData = $ZstData . $values[0][$i] . "</td></tr></tbody></table></div></div>";
                }
                $ZstData = "<div class=\"clear\"></div>" . $ZstData;
            } else {
                if ($typeA == '6') {
                    $values = array();
                    $cnt = array();
                    $last = array();
                    $index = array();
                    for ($i = 0; $i < 4; $i++) {
                        for ($j = 0; $j < $iOpenCodeCnt; $j++) {
                            $values[$i][$j] = '';
                            $cnt[$i][$j] = 0;
                            $last[$i][$j] = '';
                            $index[$i][$j] = 1;
                        }
                    }
                    $openedCaiList = $this->getLottoryByDate($module, $lotType, $date);
                    foreach ($openedCaiList as $openedCai) {
                        $OpenCodes = ZstAnalyser::getCodeArr($openedCai['dat_codes']);
                        if (count($OpenCodes) != $iOpenCodeCnt) {
                            continue;
                        }
                        for ($i = 0; $i < $iOpenCodeCnt; $i++) {
                            $value = (int)$OpenCodes[$i] % 4;
                            $cnt[($value - 1) % 4][$i]++;
                            if ($value == 1) {
                                $value = '東';
                            } else {
                                if ($value == 2) {
                                    $value = '南';
                                } else {
                                    if ($value == 3) {
                                        $value = '西';
                                    } else {
                                        $value = '北';
                                    }
                                }
                            }
                            if ($value != $last[0][$i]) {
                                if ($last[0][$i] != '') {
                                    $values[0][$i] = $values[0][$i] . "</td>";
                                }
                                $values[0][$i] = $values[0][$i] . "<td class=\"" . ($index[0][$i] % 2 == 0 ? "odd" : "even") . "\">";
                                $last[0][$i] = $value;
                                $index[0][$i]++;
                            }
                            if ($value == '南') {
                                $values[0][$i] = $values[0][$i] . "<p>" . $value . "</p>";
                            } else {
                                if ($value == '東') {
                                    $values[0][$i] = $values[0][$i] . "<span>" . $value . "</span>";
                                } else {
                                    if ($value == '西') {
                                        $values[0][$i] = $values[0][$i] . "<label>" . $value . "</label>";
                                    } else {
                                        $values[0][$i] = $values[0][$i] . $value;
                                    }
                                }
                            }
                        }
                    }
                    for ($i = 0; $i < $iOpenCodeCnt; $i++) {
                        $data = "";
                        $data = $data . "<div class=\"luzhu t_" . ($i + 1) . "\" style=\"width: 1198px; overflow-x: auto;\">";
                        $data = $data . "<table class=\"roadmap-table-caption\"><tbody><tr>";
                        $data = $data . "<td><span>今日累计：<span class=\"count\"> 东（{$cnt[0][$i]}） 西（{$cnt[2][$i]}）南（{$cnt[1][$i]}）北（{$cnt[3][$i]}）</span></span> 第" . ($i + 1) . "球方位</td>";
                        $data = $data . "</tr></tbody></table><div style=\"width: 1198px; overflow-x: auto;\" class=\"luzhu_scroll\">";
                        $data = $data . "<table class=\"roadmap-table \"><tbody><tr valign=\"top\">";
                        $ZstData = $ZstData . $data . $values[0][$i] . "</td></tr></tbody></table></div></div>";
                    }
                    $ZstData = "<div class=\"clear\"></div>" . $ZstData;
                } else {
                    if ($typeA == '1') {
                        $values = array();
                        $cnt = array();
                        $last = array();
                        $index = array();
                        for ($i = 0; $i < 2; $i++) {
                            for ($j = 0; $j < $iOpenCodeCnt; $j++) {
                                $values[$i][$j] = '';
                                $cnt[$i][$j] = 0;
                                $last[$i][$j] = '';
                                $index[$i][$j] = 1;
                            }
                        }
                        $openedCaiList = $this->getLottoryByDate($module, $lotType, $date);
                        foreach ($openedCaiList as $openedCai) {
                            $OpenCodes = ZstAnalyser::getCodeArr($openedCai['dat_codes']);
                            if (count($OpenCodes) != $iOpenCodeCnt) {
                                continue;
                            }
                            for ($i = 0; $i < $iOpenCodeCnt; $i++) {
                                $value = ZstAnalyser::getEvenOrOdd($OpenCodes[$i]);
                                $this->addPk10LzValue($values[0][$i], $value, "单", $cnt[0][$i], $last[0][$i], $index[0][$i]);
                            }
                        }
                        for ($i = 0; $i < $iOpenCodeCnt; $i++) {
                            $this->addPk10LzHeader($values[0][$i], $i + 1, $cnt[0][$i], count($openedCaiList), "单", "双", "第" . ($i + 1) . "球");
                            $ZstData = $ZstData . $values[0][$i] . "</td></tr></tbody></table></div></div>";
                        }
                        $ZstData = "<div class=\"clear\"></div>" . $ZstData;
                    } else {
                        if ($typeA == '5') {
                            $values = array();
                            $cnt = array();
                            $last = array();
                            $index = array();
                            for ($i = 0; $i < 3; $i++) {
                                for ($j = 0; $j < $iOpenCodeCnt; $j++) {
                                    $values[$i][$j] = '';
                                    $cnt[$i][$j] = 0;
                                    $last[$i][$j] = '';
                                    $index[$i][$j] = 1;
                                }
                            }
                            $openedCaiList = $this->getLottoryByDate($module, $lotType, $date);
                            foreach ($openedCaiList as $openedCai) {
                                $OpenCodes = ZstAnalyser::getCodeArr($openedCai['dat_codes']);
                                if (count($OpenCodes) != $iOpenCodeCnt) {
                                    continue;
                                }
                                for ($i = 0; $i < $iOpenCodeCnt; $i++) {
                                    $value = (int)$OpenCodes[$i];
                                    if ($value < 8) {
                                        $value = '中';
                                        $cnt[0][$i]++;
                                    } else {
                                        if ($value >= 15) {
                                            $value = '白';
                                            $cnt[2][$i]++;
                                        } else {
                                            $value = '發';
                                            $cnt[1][$i]++;
                                        }
                                    }
                                    if ($value != $last[0][$i]) {
                                        if ($last[0][$i] != '') {
                                            $values[0][$i] = $values[0][$i] . "</td>";
                                        }
                                        $values[0][$i] = $values[0][$i] . "<td class=\"" . ($index[0][$i] % 2 == 0 ? "odd" : "even") . "\">";
                                        $last[0][$i] = $value;
                                        $index[0][$i]++;
                                    }
                                    if ($value == '白') {
                                        $values[0][$i] = $values[0][$i] . "<p>" . $value . "</p>";
                                    } else {
                                        if ($value == '中') {
                                            $values[0][$i] = $values[0][$i] . "<span>" . $value . "</span>";
                                        } else {
                                            if ($value == '發') {
                                                $values[0][$i] = $values[0][$i] . "<label>" . $value . "</label>";
                                            }
                                        }
                                    }
                                }
                            }
                            for ($i = 0; $i < $iOpenCodeCnt; $i++) {
                                $data = "";
                                $data = $data . "<div class=\"luzhu t_" . ($i + 1) . "\" style=\"width: 1198px; overflow-x: auto;\">";
                                $data = $data . "<table class=\"roadmap-table-caption\"><tbody><tr>";
                                $data = $data . "<td><span>今日累计：<span class=\"count\"> 中（{$cnt[0][$i]}） 發（{$cnt[1][$i]}）白（{$cnt[2][$i]}）</span></span> 第" . ($i + 1) . "球中发白</td>";
                                $data = $data . "</tr></tbody></table><div style=\"width: 1200px; overflow-x: auto;\" class=\"luzhu_scroll\">";
                                $data = $data . "<table class=\"roadmap-table \"><tbody><tr valign=\"top\">";
                                $ZstData = $ZstData . $data . $values[0][$i] . "</td></tr></tbody></table></div></div>";
                            }
                            $ZstData = "<div class=\"clear\"></div>" . $ZstData;
                        } else {
                            if ($typeA == 2) {
                                $values = array();
                                $cnt = array();
                                $last = array();
                                $index = array();
                                for ($i = 0; $i < 2; $i++) {
                                    for ($j = 0; $j < $iOpenCodeCnt; $j++) {
                                        $values[$i][$j] = '';
                                        $cnt[$i][$j] = 0;
                                        $last[$i][$j] = '';
                                        $index[$i][$j] = 1;
                                    }
                                }
                                $openedCaiList = $this->getLottoryByDate($module, $lotType, $date);
                                foreach ($openedCaiList as $openedCai) {
                                    $OpenCodes = ZstAnalyser::getCodeArr($openedCai['dat_codes']);
                                    if (count($OpenCodes) != $iOpenCodeCnt) {
                                        continue;
                                    }
                                    for ($i = 0; $i < $iOpenCodeCnt; $i++) {
                                        $threshold = 11;
                                        $value = ZstAnalyser::getBigOrSmall($OpenCodes[$i], $threshold);
                                        $this->addPk10LzValue($values[1][$i], $value, "大", $cnt[1][$i], $last[1][$i], $index[1][$i]);
                                    }
                                    $sum = ZstAnalyser::getArrSum($OpenCodes);
                                    $i = 0;
                                    $value = ZstAnalyser::getBigOrSmall($sum % 10, 6);
                                    $this->addPk10LzValue($values[2][$i], $value, "大", $cnt[2][$i], $last[2][$i], $index[2][$i]);
                                }
                                for ($i = 0; $i < $iOpenCodeCnt; $i++) {
                                    $this->addPk10LzHeader($values[1][$i], $i + 1, $cnt[1][$i], count($openedCaiList), "大", "小", "第" . ($i + 1) . "球");
                                    $ZstData = $ZstData . $values[1][$i] . "</td></tr></tbody></table></div></div>";
                                }
                                $i = 0;
                                $this->addPk10LzHeader($values[2][$i], $i + 1, $cnt[2][$i], count($openedCaiList), "大", "小", "总和尾数");
                                $ZstData = $ZstData . $values[2][$i] . "</td></tr></tbody></table></div></div>";
                                $ZstData = "<div class=\"clear\"></div>" . $ZstData;
                            }
                        }
                    }
                }
            }
            $ret = $ZstData;
            S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
        }
        return $ret;
    }

    function getLuZhuLonghu($type, $page, $lotType, $expire)
    {
        $date = empty($_GET['date']) ? date('Y-m-d') : $_GET['date'];
        $today = empty($_GET['date']) ? date('Y-m-d') : $_GET['date'];
        if ($date == '' || $date > $today) {
            $date = $today;
        }
        $cacheName = $type . '_' . $page . '_' . $date;
        $ret = S($cacheName);
        if ($ret === false || $ret == '') {
            $ZstData = '';
            $module = M();
            $today = empty($_GET['date']) ? date('Y-m-d') : $_GET['date'];
            $iOpenCodeCnt = $this->getOpenCodeCntByLotType($lotType);
            $iAllCodesCnt = $this->getAllCodesCntByLotType($lotType);
            $bFirstZero = $this->isStartFromZero($lotType);
            $values = array();
            $cnt = array();
            $last = array();
            $index = array();
            $cntEqual = 0;
            for ($i = 0; $i < 1; $i++) {
                for ($j = 0; $j < $iOpenCodeCnt / 2; $j++) {
                    $values[$i][$j] = '';
                    $cnt[$i][$j] = 0;
                    $last[$i][$j] = '';
                    $index[$i][$j] = 1;
                }
            }
            $openedCaiList = $this->getLottoryByDate($module, $lotType, $today);
            foreach ($openedCaiList as $openedCai) {
                $OpenCodes = ZstAnalyser::getCodeArr($openedCai['dat_codes']);
                if (count($OpenCodes) < $iOpenCodeCnt) {
                    continue;
                }
                for ($i = 0; $i < $iOpenCodeCnt / 2; $i++) {
                    $value = ZstAnalyser::getDragonOrTiger($OpenCodes[$i], $OpenCodes[$iOpenCodeCnt - 1 - $i]);
                    $this->addPk10LzValue($values[0][$i], $value, "龙", $cnt[0][$i], $last[0][$i], $index[0][$i], "和");
                    if ($OpenCodes[$i] == $OpenCodes[4 - $i]) {
                        $cntEqual++;
                    }
                }
            }
            for ($i = 0; $i < $iOpenCodeCnt / 2; $i++) {
                $k = $i + 1;
                if ($bFirstZero) {
                    $k = $i;
                }
                $desc = "第{$k}球";
                if ($lotType == 3) {
                    $desc = '';
                    if ($i > 0) {
                        break;
                    }
                }
                $this->addPk10LzHeader($values[0][$i], $i + 1, $cnt[0][$i], count($openedCaiList), "龙", "虎", $desc);
                $ZstData = $ZstData . $values[0][$i] . "</td></tr></tbody></table></div>";
            }
            $ret = $ZstData;
            S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
        }
        return $ret;
    }

    function getGetLuZhuLonghu($type, $page, $lotType, $expire)
    {
        $date = wjStrFilter(I('post.date'));
        $today = empty($_REQUEST['date']) ? date('Y-m-d') : $_REQUEST['date'];
        if ($date == '' || $date > $today) {
            $date = $today;
        }
        $cacheName = $type . '_' . $page . '_' . $date;
        $ret = S($cacheName);
        if ($ret === false || $ret == '') {
            $retData = array();
            $module = M();
            $today = empty($_REQUEST['date']) ? date('Y-m-d') : $_REQUEST['date'];
            $iOpenCodeCnt = $this->getOpenCodeCntByLotType($lotType);
            $iAllCodesCnt = $this->getAllCodesCntByLotType($lotType);
            $bFirstZero = $this->isStartFromZero($lotType);
            $iNeedCol = 0;
            if ($type == 'gdkl10') {
                $iNeedCol = 1;
            } else {
                if ($type = 'xync') {
                    $iNeedCol = $iOpenCodeCnt / 2;
                }
            }
            $values = array();
            $cnt = array();
            $last = array();
            $index = array();
            $cntEqual = array();
            for ($j = 0; $j < $iNeedCol; $j++) {
                $cntEqual[$j] = 0;
            }
            for ($i = 0; $i < 1; $i++) {
                for ($j = 0; $j < $iNeedCol; $j++) {
                    $values[$i][$j] = '';
                    $cnt[$i][$j] = 0;
                    $last[$i][$j] = '';
                    $index[$i][$j] = 1;
                }
            }
            $openedCaiList = $this->getLottoryByDate($module, $lotType, $today);
            foreach ($openedCaiList as $openedCai) {
                $OpenCodes = ZstAnalyser::getCodeArr($openedCai['dat_codes']);
                if (count($OpenCodes) < $iOpenCodeCnt) {
                    continue;
                }
                for ($i = 0; $i < $iNeedCol; $i++) {
                    $value = ZstAnalyser::getDragonOrTiger($OpenCodes[$i], $OpenCodes[$iOpenCodeCnt - 1 - $i]);
                    $this->addPk10LzValue($values[0][$i], $value, "龙", $cnt[0][$i], $last[0][$i], $index[0][$i], "和");
                    if ($OpenCodes[$i] == $OpenCodes[4 - $i]) {
                        $cntEqual[$i]++;
                    }
                    if ($value == "龙") {
                        $value = "龙";
                    }
                    $k = $i + 1;
                    if ($bFirstZero) {
                        $k = $i;
                    }
                    $retData[$k][] = $value;
                }
            }
            for ($i = 0; $i < $iNeedCol; $i++) {
                $k = $i + 1;
                if ($bFirstZero) {
                    $k = $i;
                }
                $retData["totalLong{$k}"] = $cnt[0][$i];
                $retData["totalHu{$k}"] = count($openedCaiList) - $cnt[0][$i];
                $retData["totalHe{$k}"] = $cntEqual[$i];
            }
            $ret = json_encode($retData);
            S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
        }
        return $ret;
    }

    function getGdkl10LuZhuTotal($type, $page, $lotType, $expire)
    {
        $date = wjStrFilter(I('get.date'));
        $today = date("Y-m-d");
        if ($date == '' || $date > $today) {
            $date = $today;
        }
        $cacheName = $type . '_' . $page . '_' . $date;
        $ret = S($cacheName);
        if ($ret === false || $ret == '') {
            $ZstData = '';
            $module = M();
            $iOpenCodeCnt = $this->getOpenCodeCntByLotType($lotType);
            $iAllCodesCnt = $this->getAllCodesCntByLotType($lotType);
            $bFirstZero = $this->isStartFromZero($lotType);
            $values = array();
            $cnt = array();
            $last = array();
            $index = array();
            for ($i = 0; $i < 3; $i++) {
                for ($j = 0; $j < 1; $j++) {
                    $values[$i][$j] = '';
                    $cnt[$i][$j] = 0;
                    $last[$i][$j] = '';
                    $index[$i][$j] = 1;
                }
            }
            $openedCaiList = $this->getLottoryByDate($module, $lotType, $date);
            foreach ($openedCaiList as $openedCai) {
                $OpenCodes = ZstAnalyser::getCodeArr($openedCai['dat_codes']);
                if (count($OpenCodes) != $iOpenCodeCnt) {
                    continue;
                }
                $sum = ZstAnalyser::getArrSum($OpenCodes);
                $i = 0;
                $value = ZstAnalyser::getEvenOrOdd($sum);
                $this->addPk10LzValue($values[0][$i], $value, "单", $cnt[0][$i], $last[0][$i], $index[0][$i]);
                $value = ZstAnalyser::getBigOrSmall($sum, 106);
                $this->addPk10LzValue($values[1][$i], $value, "大", $cnt[1][$i], $last[1][$i], $index[1][$i]);
                $value = ZstAnalyser::getBigOrSmall($sum % 10, 6);
                $this->addPk10LzValue($values[2][$i], $value, "大", $cnt[2][$i], $last[2][$i], $index[2][$i]);
            }
            for ($i = 0; $i < 1; $i++) {
                $this->addPk10LzHeader($values[1][$i], $i + 1, $cnt[1][$i], count($openedCaiList), "大", "小", "总和");
                $ZstData = $ZstData . $values[1][$i] . "</td></tr></tbody></table></div></div>";
                $this->addPk10LzHeader($values[0][$i], $i + 1, $cnt[0][$i], count($openedCaiList), "单", "双", "总和");
                $ZstData = $ZstData . $values[0][$i] . "</td></tr></tbody></table></div></div>";
                $this->addPk10LzHeader($values[2][$i], $i + 1, $cnt[2][$i], count($openedCaiList), "大", "小", "总和尾数");
                $ZstData = $ZstData . $values[2][$i] . "</td></tr></tbody></table></div></div>";
            }
            $ZstData = "<div class=\"clear\"></div>" . $ZstData;
            $ret = $ZstData;
            S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
        }
        return $ret;
    }

    function getLuzhuNumber($type, $page, $lotType, $expire)
    {
        $date = wjStrFilter(I('post.date'));
        $today = date("Y-m-d");
        if ($date == '' || $date > $today) {
            $date = $today;
        }
        $cacheName = $type . '_' . $page . '_' . $date;
        $ret = S($cacheName);
        if ($ret === false || $ret == '') {
            $shows = array();
            $module = M();
            $iOpenCodeCnt = $this->getOpenCodeCntByLotType($lotType);
            $iAllCodesCnt = $this->getAllCodesCntByLotType($lotType);
            $bFirstZero = $this->isStartFromZero($lotType);
            $openedCaiList = $this->getLottoryByDate($module, $lotType, $date);
            foreach ($openedCaiList as $openedCai) {
                $OpenCodes = ZstAnalyser::getCodeArr($openedCai['dat_codes']);
                if (count($OpenCodes) != $iOpenCodeCnt) {
                    continue;
                }
                $row = array();
                for ($i = 0; $i < $iAllCodesCnt; $i++) {
                    $row[] = 0;
                }
                for ($i = 0; $i < $iOpenCodeCnt; $i++) {
                    $OpenCodes[$i] = (int)$OpenCodes[$i];
                    $k = $OpenCodes[$i] - 1;
                    if ($bFirstZero) {
                        $k = $OpenCodes[$i];
                    }
                    $row[$k] = 1;
                }
                for ($i = 0; $i < $iAllCodesCnt; $i++) {
                    $shows[$i][] = $row[$i];
                }
            }
            $ret = "{";
            for ($i = 0; $i < $iAllCodesCnt; $i++) {
                $k = $i + 1;
                if ($bFirstZero) {
                    $k = $i;
                }
                $ret = $ret . "\"" . $k . "\":" . json_encode($shows[$i]);
                if ($i != $iAllCodesCnt - 1) {
                    $ret = $ret . ",";
                }
            }
            $ret = $ret . "}";
            S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
        }
        return $ret;
    }

    function getLuzhuTotal($type, $page, $lotType, $expire)
    {
        $date = empty($_REQUEST['date']) ? date('Y-m-d') : $_REQUEST['date'];
        $typeA = wjStrFilter(I('post.type'));
        $today = empty($_REQUEST['date']) ? date('Y-m-d') : $_REQUEST['date'];
        if ($date == '' || $date > $today) {
            $date = $today;
        }
        $cacheName = $type . '_' . $page . '_' . $date . '_' . $typeA;
        $ret = S($cacheName);
        if ($ret === false || $ret == '') {
            $module = M();
            $iOpenCodeCnt = $this->getOpenCodeCntByLotType($lotType);
            $iAllCodesCnt = $this->getAllCodesCntByLotType($lotType);
            $ret = '';
            $openedCaiList = $this->getLottoryByDate($module, $lotType, $date);
            foreach ($openedCaiList as $openedCai) {
                $OpenCodes = ZstAnalyser::getCodeArr($openedCai['dat_codes']);
                if (count($OpenCodes) < $iOpenCodeCnt) {
                    continue;
                }
                $OpenCodes = array_slice($OpenCodes, 0, $iOpenCodeCnt);
                if ($typeA == 2) {
                    $ret = $ret . "\"" . ZstAnalyser::getEvenOrOdd(ZstAnalyser::getArrSum($OpenCodes)) . "\",";
                } else {
                    if ($typeA == 3) {
                        $ret = $ret . "\"" . ZstAnalyser::getBigOrSmall(ZstAnalyser::getArrSum($OpenCodes) % 10, 5) . "\",";
                    } else {
                        if ($lotType == 3) {
                            $iAllSum = 23;
                        } else {
                            if ($lotType == 23) {
                                $iAllSum = 810;
                            } else {
                                if ($lotType == 18) {
                                    $iAllSum = 84;
                                } else {
                                    if ($lotType == 24) {
                                        $iAllSum = 11;
                                    } else {
                                        if ($lotType == 22) {
                                            $iAllSum = 11;
                                        }
                                    }
                                }
                            }
                        }
                        if ($lotType != 24 && $lotType != 22) {
                            $sum = ZstAnalyser::getArrSum($OpenCodes);
                            $ret = $ret . "\"" . ($sum > $iAllSum ? "大" : ($sum == $iAllSum ? "和" : "小")) . "\",";
                        } else {
                            $sum = ZstAnalyser::getArrSum($OpenCodes);
                            $ret = $ret . "\"" . ($sum > $iAllSum ? "大" : "小") . "\",";
                        }
                    }
                }
            }
            $ret = substr($ret, 0, strlen($ret) - 1);
            if ($lotType == 22) {
                $arr = explode(",", $ret);
                $last = '';
                $ret = "[";
                foreach ($arr as $a) {
                    if ($a != $last) {
                        if ($last != '') {
                            $ret = $ret . "]";
                            $ret = $ret . ",[" . $a;
                        } else {
                            $ret = $ret . $a;
                        }
                        $last = $a;
                    } else {
                        $ret = $ret . "," . $a;
                    }
                }
                $ret = $ret . "]";
            }
            $ret = "[" . $ret . "]";
            S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
        }
        return $ret;
    }

    function getKl8LuzhuOddOrEven($type, $page, $lotType, $expire)
    {
        $date = wjStrFilter(I('post.date'));
        $today = date("Y-m-d");
        if ($date == '' || $date > $today) {
            $date = $today;
        }
        $cacheName = $type . '_' . $page . '_' . $date;
        $ret = S($cacheName);
        if ($ret === false || $ret == '') {
            $module = M();
            $iOpenCodeCnt = $this->getOpenCodeCntByLotType($lotType);
            $iAllCodesCnt = $this->getAllCodesCntByLotType($lotType);
            $ret = '';
            $openedCaiList = $this->getLottoryByDate($module, $lotType, $date);
            foreach ($openedCaiList as $openedCai) {
                $OpenCodes = ZstAnalyser::getCodeArr($openedCai['dat_codes']);
                if (count($OpenCodes) != $iOpenCodeCnt + 1) {
                    continue;
                }
                $OpenCodes = array_slice($OpenCodes, 0, $iOpenCodeCnt);
                $cnt = 0;
                foreach ($OpenCodes as $code) {
                    if ($code % 2 == 0) {
                        $cnt++;
                    }
                }
                $ret = $ret . "\"" . ($cnt > 10 ? "双" : ($cnt == 10 ? "和" : "单")) . "\",";
            }
            $ret = "[" . substr($ret, 0, strlen($ret) - 1) . "]";
            S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
        }
        return $ret;
    }

    function getKl8LuzhuUpOrDown($type, $page, $lotType, $expire)
    {
        $date = wjStrFilter(I('post.date'));
        $today = date("Y-m-d");
        if ($date == '' || $date > $today) {
            $date = $today;
        }
        $cacheName = $type . '_' . $page . '_' . $date;
        $ret = S($cacheName);
        if ($ret === false || $ret == '') {
            $module = M();
            $iOpenCodeCnt = $this->getOpenCodeCntByLotType($lotType);
            $iAllCodesCnt = $this->getAllCodesCntByLotType($lotType);
            $ret = '';
            $openedCaiList = $this->getLottoryByDate($module, $lotType, $date);
            foreach ($openedCaiList as $openedCai) {
                $OpenCodes = ZstAnalyser::getCodeArr($openedCai['dat_codes']);
                if (count($OpenCodes) != $iOpenCodeCnt + 1) {
                    continue;
                }
                $OpenCodes = array_slice($OpenCodes, 0, $iOpenCodeCnt);
                $cnt = 0;
                foreach ($OpenCodes as $code) {
                    if ($code < 41) {
                        $cnt++;
                    }
                }
                $ret = $ret . "\"" . ($cnt > 10 ? "上" : ($cnt == 10 ? "中" : "下")) . "\",";
            }
            $ret = "[" . substr($ret, 0, strlen($ret) - 1) . "]";
            S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
        }
        return $ret;
    }

    function getLuzhuBigOrSmall($type, $page, $lotType, $expire)
    {
        $date = wjStrFilter(I('post.date'));
        $today = date("Y-m-d");
        if ($date == '' || $date > $today) {
            $date = $today;
        }
        $cacheName = $type . '_' . $page . '_' . $date;
        $ret = S($cacheName);
        if ($ret === false || $ret == '') {
            $retData = array();
            $module = M();
            $iOpenCodeCnt = $this->getOpenCodeCntByLotType($lotType);
            $iAllCodesCnt = $this->getAllCodesCntByLotType($lotType);
            $bFirstZero = $this->isStartFromZero($lotType);
            $values = array();
            for ($i = 0; $i < 2; $i++) {
                for ($j = 0; $j < $iOpenCodeCnt; $j++) {
                    $values[$i][$j] = '';
                }
            }
            $openedCaiList = $this->getLottoryByDate($module, $lotType, $date);
            foreach ($openedCaiList as $openedCai) {
                $OpenCodes = ZstAnalyser::getCodeArr($openedCai['dat_codes']);
                if (count($OpenCodes) != $iOpenCodeCnt) {
                    continue;
                }
                for ($i = 0; $i < $iOpenCodeCnt; $i++) {
                    $value = ZstAnalyser::getEvenOrOdd($OpenCodes[$i]);
                    $values[0][$i][] = $value;
                    $threshold = $iAllCodesCnt / 2;
                    $value = ZstAnalyser::getBigOrSmall($OpenCodes[$i], $threshold);
                    $values[1][$i][] = $value;
                }
            }
            for ($i = 0; $i < $iOpenCodeCnt; $i++) {
                $k = $i + 1;
                $retData["dx" . $k] = $values[1][$i];
                $retData["ds" . $k] = $values[0][$i];
            }
            $ret = json_encode($retData);
            S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
        }
        return $ret;
    }

    function getXyncLuzhuZfb($type, $page, $lotType, $expire)
    {
        $date = empty($_REQUEST['date']) ? date('Y-m-d') : $_REQUEST['date'];
        $today = empty($_REQUEST['date']) ? date('Y-m-d') : $_REQUEST['date'];
        if ($date == '' || $date > $today) {
            $date = $today;
        }
        $cacheName = $type . '_' . $page . '_' . $date;
        $ret = S($cacheName);
        if ($ret === false || $ret == '') {
            $retData = array();
            $module = M();
            $iOpenCodeCnt = $this->getOpenCodeCntByLotType($lotType);
            $iAllCodesCnt = $this->getAllCodesCntByLotType($lotType);
            $bFirstZero = $this->isStartFromZero($lotType);
            $values = array();
            for ($i = 0; $i < 1; $i++) {
                for ($j = 0; $j < $iOpenCodeCnt; $j++) {
                    $values[$i][$j] = '';
                }
            }
            $openedCaiList = $this->getLottoryByDate($module, $lotType, $date);
            foreach ($openedCaiList as $openedCai) {
                $OpenCodes = ZstAnalyser::getCodeArr($openedCai['dat_codes']);
                if (count($OpenCodes) != $iOpenCodeCnt) {
                    continue;
                }
                for ($i = 0; $i < $iOpenCodeCnt; $i++) {
                    $value = (int)$OpenCodes[$i];
                    if ($value < 8) {
                        $values[0][$i][] = "中";
                    } else {
                        if ($value >= 15) {
                            $values[0][$i][] = "发";
                        } else {
                            $values[0][$i][] = "白";
                        }
                    }
                }
            }
            for ($i = 0; $i < $iOpenCodeCnt; $i++) {
                $k = $i + 1;
                $retData[$k] = $values[0][$i];
            }
            $ret = json_encode($retData);
            S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
        }
        return $ret;
    }

    function getXyncLuzhuDnxb($type, $page, $lotType, $expire)
    {
        $date = empty($_REQUEST['date']) ? date('Y-m-d') : $_REQUEST['date'];
        $today = empty($_REQUEST['date']) ? date('Y-m-d') : $_REQUEST['date'];
        if ($date == '' || $date > $today) {
            $date = $today;
        }
        $cacheName = $type . '_' . $page . '_' . $date;
        $ret = S($cacheName);
        if ($ret === false || $ret == '') {
            $retData = array();
            $module = M();
            $iOpenCodeCnt = $this->getOpenCodeCntByLotType($lotType);
            $iAllCodesCnt = $this->getAllCodesCntByLotType($lotType);
            $bFirstZero = $this->isStartFromZero($lotType);
            $values = array();
            for ($i = 0; $i < 1; $i++) {
                for ($j = 0; $j < $iOpenCodeCnt; $j++) {
                    $values[$i][$j] = '';
                }
            }
            $openedCaiList = $this->getLottoryByDate($module, $lotType, $date);
            foreach ($openedCaiList as $openedCai) {
                $OpenCodes = ZstAnalyser::getCodeArr($openedCai['dat_codes']);
                if (count($OpenCodes) != $iOpenCodeCnt) {
                    continue;
                }
                for ($i = 0; $i < $iOpenCodeCnt; $i++) {
                    $value = (int)$OpenCodes[$i] % 4;
                    if ($value == 1) {
                        $value = '東';
                    } else {
                        if ($value == 2) {
                            $value = '南';
                        } else {
                            if ($value == 3) {
                                $value = '西';
                            } else {
                                $value = '北';
                            }
                        }
                    }
                    $values[0][$i][] = $value;
                }
            }
            for ($i = 0; $i < $iOpenCodeCnt; $i++) {
                $k = $i + 1;
                $retData[$k] = $values[0][$i];
            }
            $ret = json_encode($retData);
            S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
        }
        return $ret;
    }

    function getXyncLuzhuMerge($type, $page, $lotType, $expire)
    {
        $date = empty($_REQUEST['date']) ? date('Y-m-d') : $_REQUEST['date'];
        $today = empty($_REQUEST['date']) ? date('Y-m-d') : $_REQUEST['date'];
        if ($date == '' || $date > $today) {
            $date = $today;
        }
        $cacheName = $type . '_' . $page . '_' . $date;
        $ret = S($cacheName);
        if ($ret === false || $ret == '') {
            $retData = array();
            $module = M();
            $iOpenCodeCnt = $this->getOpenCodeCntByLotType($lotType);
            $iAllCodesCnt = $this->getAllCodesCntByLotType($lotType);
            $bFirstZero = $this->isStartFromZero($lotType);
            $values = array();
            for ($i = 0; $i < 1; $i++) {
                for ($j = 0; $j < $iOpenCodeCnt; $j++) {
                    $values[$i][$j] = '';
                }
            }
            $openedCaiList = $this->getLottoryByDate($module, $lotType, $date);
            foreach ($openedCaiList as $openedCai) {
                $OpenCodes = ZstAnalyser::getCodeArr($openedCai['dat_codes']);
                if (count($OpenCodes) != $iOpenCodeCnt) {
                    continue;
                }
                for ($i = 0; $i < $iOpenCodeCnt; $i++) {
                    $value = ZstAnalyser::getValueDigitSum($OpenCodes[$i]);
                    $values[0][$i][] = ZstAnalyser::getEvenOrOdd($value);
                }
            }
            for ($i = 0; $i < $iOpenCodeCnt; $i++) {
                $k = $i + 1;
                $retData[$k] = $values[0][$i];
            }
            $ret = json_encode($retData);
            S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
        }
        return $ret;
    }

    function getXyncLuzhuMantissa($type, $page, $lotType, $expire)
    {
        $date = wjStrFilter(I('get.date'));
        $today = empty($_REQUEST['date']) ? date('Y-m-d') : $_REQUEST['date'];
        if ($date == '' || $date > $today) {
            $date = $today;
        }
        $cacheName = $type . '_' . $page . '_' . $date;
        $ret = S($cacheName);
        if ($ret === false || $ret == '') {
            $retData = array();
            $module = M();
            $iOpenCodeCnt = $this->getOpenCodeCntByLotType($lotType);
            $iAllCodesCnt = $this->getAllCodesCntByLotType($lotType);
            $bFirstZero = $this->isStartFromZero($lotType);
            $values = array();
            for ($i = 0; $i < 1; $i++) {
                for ($j = 0; $j < $iOpenCodeCnt; $j++) {
                    $values[$i][$j] = '';
                }
            }
            $openedCaiList = $this->getLottoryByDate($module, $lotType, $date);
            foreach ($openedCaiList as $openedCai) {
                $OpenCodes = ZstAnalyser::getCodeArr($openedCai['dat_codes']);
                if (count($OpenCodes) != $iOpenCodeCnt) {
                    continue;
                }
                for ($i = 0; $i < $iOpenCodeCnt; $i++) {
                    $values[0][$i][] = ZstAnalyser::getBigOrSmall($OpenCodes[$i] % 10, 5);
                }
            }
            for ($i = 0; $i < $iOpenCodeCnt; $i++) {
                $k = $i + 1;
                $retData[$k] = $values[0][$i];
            }
            $ret = json_encode($retData);
            S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
        }
        return $ret;
    }

    function getPositionTrend($type, $page, $lotType, $expire)
    {
        $ball = (int)wjStrFilter(I('get.ball'));
        $count = (int)wjStrFilter(I('get.count'));
        $isToday = wjStrFilter(I('get.isToday'));
        $cacheName = $lotType . '_' . $page . '_' . $ball . '_' . $count . '_' . $isToday;
        $ret = S($cacheName);
        if ($ret === false || $ret == '') {
            $module = M();
            $retData = array();
            $iOpenCodeCnt = $this->getOpenCodeCntByLotType($lotType);
            $iAllCodesCnt = $this->getAllCodesCntByLotType($lotType);
            $bFirstZero = $this->isStartFromZero($lotType);
            $ball = $ball - 1;
            if ($ball < $iAllCodesCnt && $ball >= 0 && $count < 200) {
                $ballCnt = array();
                $ballCnt2 = array();
                $omits = array();
                $omits2 = array();
                $iniOmit = -1;
                $omitsMax = array();
                $omitsMax2 = array();
                for ($i = 0; $i < $iAllCodesCnt; $i++) {
                    $k = $i + 1;
                    if ($bFirstZero) {
                        $k = $i;
                    }
                    $ballA = ($k < 10 ? "0" : "") . "" . $k;
                    $ballCnt[$ballA] = 0;
                    $omits[$ballA] = $iniOmit;
                    $omitsMax[$ballA] = 0;
                }
                for ($i = 0; $i < 7; $i++) {
                    $omits2[$i] = $iniOmit;
                    $ballCnt2[$i] = 0;
                    $omitsMax2[$i] = 0;
                }
                $today = date("Y-m-d");
                if ($isToday = 'true') {
                    $openedCaiList = $this->getLottoryByDate($module, $lotType, $today);
                } else {
                    $openedCaiList = $this->getLottoryByCnt($module, $lotType, $count);
                }
                $openedCaiList = array_reverse($openedCaiList);
                $lastResult = -1;
                $shows = array();
                foreach ($openedCaiList as $openedCai) {
                    $OpenCodes = ZstAnalyser::getCodeArr($openedCai['dat_codes']);
                    if (count($OpenCodes) != $iOpenCodeCnt) {
                        continue;
                    }
                    $value = $OpenCodes[$ball];
                    foreach ($omits as $b => $cnt) {
                        if ($value == $b && $cnt < 0) {
                            $omits[$b] = $iniOmit - $omits[$b];
                        } else {
                            $omits[$b]--;
                        }
                        if ($iniOmit - $omits[$b] > $omitsMax[$b]) {
                            $omitsMax[$b] = $iniOmit - $omits[$b];
                        }
                    }
                    $ballCnt[$value]++;
                    if ($lastResult == -1) {
                        $omits2[0]--;
                        $omits2[1] = 0;
                        $omits2[2]--;
                        $lastResult = $value;
                    } else {
                        if ($value < $lastResult) {
                            $omits2[0] = $iniOmit - $omits2[0];
                            $omits2[1]--;
                            $omits2[2]--;
                            $ballCnt2[0]++;
                        } else {
                            if ($value == $lastResult) {
                                $omits2[0]--;
                                $omits2[1] = $iniOmit - $omits2[1];
                                $omits2[2]--;
                                $ballCnt2[1]++;
                            } else {
                                $omits2[0]--;
                                $omits2[1]--;
                                $omits2[2] = $iniOmit - $omits2[2];
                                $ballCnt2[2]++;
                            }
                        }
                        $lastResult = $value;
                    }
                    if ($value % 2 != 0) {
                        $omits2[3] = $iniOmit - $omits2[3];
                        $omits2[4]--;
                        $ballCnt2[3]++;
                    } else {
                        $omits2[4] = $iniOmit - $omits2[4];
                        $omits2[3]--;
                        $ballCnt2[4]++;
                    }
                    if ($value > $iAllCodesCnt / 2) {
                        $omits2[5] = $iniOmit - $omits2[5];
                        $omits2[6]--;
                        $ballCnt2[5]++;
                    } else {
                        $omits2[6] = $iniOmit - $omits2[6];
                        $omits2[5]--;
                        $ballCnt2[6]++;
                    }
                    if ($iniOmit - $omits2[0] > $omitsMax2[0]) {
                        $omitsMax2[0] = $iniOmit - $omits2[0];
                    }
                    if ($iniOmit - $omits2[1] > $omitsMax2[1]) {
                        $omitsMax2[1] = $iniOmit - $omits2[1];
                    }
                    if ($iniOmit - $omits2[2] > $omitsMax2[2]) {
                        $omitsMax2[2] = $iniOmit - $omits2[2];
                    }
                    if ($iniOmit - $omits2[3] > $omitsMax2[3]) {
                        $omitsMax2[3] = $iniOmit - $omits2[3];
                    }
                    if ($iniOmit - $omits2[4] > $omitsMax2[4]) {
                        $omitsMax2[4] = $iniOmit - $omits2[4];
                    }
                    if ($iniOmit - $omits2[5] > $omitsMax2[5]) {
                        $omitsMax2[5] = $iniOmit - $omits2[5];
                    }
                    if ($iniOmit - $omits2[6] > $omitsMax2[6]) {
                        $omitsMax2[6] = $iniOmit - $omits2[6];
                    }
                    $row = array();
                    $tmp = array();
                    foreach ($omits as $b => $cnt) {
                        if ($cnt <= $iniOmit) {
                            $tmp[] = $iniOmit - $cnt;
                        } else {
                            $tmp[] = 0;
                            $omits[$b] = $iniOmit;
                        }
                    }
                    $row["Drawing_Date"] = null;
                    $row["Drawing_Time"] = null;
                    $row["Period"] = (double)$openedCai['dat_expect'];
                    $row["Nums"] = $tmp;
                    $row["ZX"] = $omits2[2] >= 0 ? 0 : $iniOmit - $omits2[2];
                    $row["FX"] = $omits2[0] >= 0 ? 0 : $iniOmit - $omits2[0];
                    $row["CH"] = $omits2[1] >= 0 ? 0 : $iniOmit - $omits2[1];
                    $row["Odd"] = $omits2[3] >= 0 ? 0 : $iniOmit - $omits2[3];
                    $row["Even"] = $omits2[4] >= 0 ? 0 : $iniOmit - $omits2[4];
                    $row["Big"] = $omits2[5] >= 0 ? 0 : $iniOmit - $omits2[5];
                    $row["Small"] = $omits2[6] >= 0 ? 0 : $iniOmit - $omits2[6];
                    $row["Front"] = null;
                    $row["Back"] = null;
                    $row["Middle"] = null;
                    $row["Result"] = $value;
                    $shows[] = $row;
                    foreach ($omits2 as $b => $cnt) {
                        if ($cnt >= 0) {
                            $omits2[$b] = $iniOmit;
                        }
                    }
                }
                $statRow1 = array();
                $statRow1["Drawing_Date"] = null;
                $statRow1["Drawing_Time"] = null;
                $statRow1["Period"] = null;
                $statRow1["Nums"] = array_values($ballCnt);
                $statRow1["ZX"] = $ballCnt2[2];
                $statRow1["FX"] = $ballCnt2[0];
                $statRow1["CH"] = $ballCnt2[1];
                $statRow1["Big"] = $ballCnt2[3];
                $statRow1["Small"] = $ballCnt2[4];
                $statRow1["Odd"] = $ballCnt2[5];
                $statRow1["Even"] = $ballCnt2[6];
                $statRow1["Front"] = null;
                $statRow1["Back"] = null;
                $statRow1["Middle"] = null;
                $statRow1["Result"] = null;
                $statRow2 = array();
                $statRow2["Drawing_Date"] = null;
                $statRow2["Drawing_Time"] = null;
                $statRow2["Period"] = null;
                $statRow2["Nums"] = array_values($omitsMax);
                $statRow2["ZX"] = $omitsMax2[2];
                $statRow2["FX"] = $omitsMax2[0];
                $statRow2["CH"] = $omitsMax2[1];
                $statRow2["Odd"] = $omitsMax2[3];
                $statRow2["Even"] = $omitsMax2[4];
                $statRow2["Big"] = $omitsMax2[5];
                $statRow2["Small"] = $omitsMax2[6];
                $statRow2["Front"] = null;
                $statRow2["Back"] = null;
                $statRow2["Middle"] = null;
                $statRow2["Result"] = null;
                $hotcold1 = array();
                for ($j = 0; $j < $iAllCodesCnt; $j++) {
                    $k = $j + 1;
                    if ($bFirstZero) {
                        $k = $j;
                    }
                    $hotcold1[] = $k;
                }
                $retData["stat"][] = $statRow1;
                $retData["stat"][] = $statRow2;
                $retData["hotcold"][] = $hotcold1;
                $retData["hotcold"][] = array();
                $retData["hotcold"][] = array();
                $retData["list"] = array_reverse($shows);
            }
            $ret = json_encode($retData);
            S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
        }
        return $ret;
    }

    function getAllSumTrend($type, $page, $lotType, $expire)
    {
        $count = (int)wjStrFilter(I('get.count'));
        $isToday = wjStrFilter(I('get.isToday'));
        $cacheName = $lotType . '_' . $page . '_' . $count . '_' . $isToday;
        $ret = S($cacheName);
        if ($ret === false || $ret == '') {
            $module = M();
            $retData = array();
            $iOpenCodeCnt = $this->getOpenCodeCntByLotType($lotType);
            $iAllCodesCnt = $this->getAllCodesCntByLotType($lotType);
            $bFirstZero = $this->isStartFromZero($lotType);
            if ($count < 200) {
                $ballCnt = array();
                $ballCnt2 = array();
                $omits = array();
                $omits2 = array();
                $iniOmit = -1;
                $omitsMax = array();
                $omitsMax2 = array();
                $iColNeeds = 0;
                $arrSumValues = array();
                for ($j = 0; $j < $iAllCodesCnt; $j++) {
                    for ($n = 0; $n < $iAllCodesCnt; $n++) {
                        for ($m = 0; $m < $iAllCodesCnt; $m++) {
                            $sum = $j + $m + $n + 3;
                            if ($bFirstZero) {
                                $sum = $j + $m + $n;
                            }
                            if (!in_array($sum, $arrSumValues)) {
                                $arrSumValues[] = $sum;
                            }
                        }
                    }
                }
                $iColNeeds = max($arrSumValues);
                $iStart = min($arrSumValues) - 1;
                for ($i = $iStart; $i < $iColNeeds; $i++) {
                    $ballA = $i < 9 ? "0" . ($i + 1) : "" . ($i + 1);
                    $ballCnt[$ballA] = 0;
                    $omits[$ballA] = $iniOmit;
                    $omitsMax[$ballA] = 0;
                }
                for ($i = 0; $i < 10; $i++) {
                    $omits2[$i] = $iniOmit;
                    $ballCnt2[$i] = 0;
                    $omitsMax2[$i] = 0;
                }
                $today = date("Y-m-d");
                if ($isToday = 'true') {
                    $openedCaiList = $this->getLottoryByDate($module, $lotType, $today);
                } else {
                    $openedCaiList = $this->getLottoryByCnt($module, $lotType, $count);
                }
                $openedCaiList = array_reverse($openedCaiList);
                $lastResult = -1;
                $shows = array();
                foreach ($openedCaiList as $openedCai) {
                    $OpenCodes = ZstAnalyser::getCodeArr($openedCai['dat_codes']);
                    if (count($OpenCodes) < $iOpenCodeCnt) {
                        continue;
                    }
                    $value = ZstAnalyser::getArrSum($OpenCodes);
                    $value = $value < 10 ? '0' . $value : $value;
                    foreach ($omits as $b => $cnt) {
                        if ($value == $b && $cnt < 0) {
                            $omits[$b] = $iniOmit - $omits[$b];
                        } else {
                            $omits[$b]--;
                        }
                        if ($iniOmit - $omits[$b] > $omitsMax[$b]) {
                            $omitsMax[$b] = $iniOmit - $omits[$b];
                        }
                    }
                    $ballCnt[$value]++;
                    if ($lastResult == -1) {
                        $omits2[0]--;
                        $omits2[1] = 0;
                        $omits2[2]--;
                        $lastResult = $value;
                    } else {
                        if ($value < $lastResult) {
                            $omits2[0] = $iniOmit - $omits2[0];
                            $omits2[1]--;
                            $omits2[2]--;
                            $ballCnt2[0]++;
                        } else {
                            if ($value == $lastResult) {
                                $omits2[0]--;
                                $omits2[1] = $iniOmit - $omits2[1];
                                $omits2[2]--;
                                $ballCnt2[1]++;
                            } else {
                                $omits2[0]--;
                                $omits2[1]--;
                                $omits2[2] = $iniOmit - $omits2[2];
                                $ballCnt2[2]++;
                            }
                        }
                        $lastResult = $value;
                    }
                    if ($value % 2 != 0) {
                        $omits2[3] = $iniOmit - $omits2[3];
                        $omits2[4]--;
                        $ballCnt2[3]++;
                    } else {
                        $omits2[4] = $iniOmit - $omits2[4];
                        $omits2[3]--;
                        $ballCnt2[4]++;
                    }
                    if ($value > (min($arrSumValues) + max($arrSumValues)) / 2) {
                        $omits2[5] = $iniOmit - $omits2[5];
                        $omits2[6]--;
                        $ballCnt2[5]++;
                    } else {
                        $omits2[6] = $iniOmit - $omits2[6];
                        $omits2[5]--;
                        $ballCnt2[6]++;
                    }
                    if ($value < min($arrSumValues) + count($arrSumValues) / 3) {
                        $omits2[7] = $iniOmit - $omits2[7];
                        $omits2[8]--;
                        $omits2[9]--;
                        $ballCnt2[7]++;
                    } else {
                        if ($value > min($arrSumValues) + count($arrSumValues) / 3 * 2) {
                            $omits2[9] = $iniOmit - $omits2[9];
                            $omits2[8]--;
                            $omits2[7]--;
                            $ballCnt2[9]++;
                        } else {
                            $omits2[8] = $iniOmit - $omits2[8];
                            $omits2[9]--;
                            $omits2[7]--;
                            $ballCnt2[8]++;
                        }
                    }
                    if ($iniOmit - $omits2[0] > $omitsMax2[0]) {
                        $omitsMax2[0] = $iniOmit - $omits2[0];
                    }
                    if ($iniOmit - $omits2[1] > $omitsMax2[1]) {
                        $omitsMax2[1] = $iniOmit - $omits2[1];
                    }
                    if ($iniOmit - $omits2[2] > $omitsMax2[2]) {
                        $omitsMax2[2] = $iniOmit - $omits2[2];
                    }
                    if ($iniOmit - $omits2[3] > $omitsMax2[3]) {
                        $omitsMax2[3] = $iniOmit - $omits2[3];
                    }
                    if ($iniOmit - $omits2[4] > $omitsMax2[4]) {
                        $omitsMax2[4] = $iniOmit - $omits2[4];
                    }
                    if ($iniOmit - $omits2[5] > $omitsMax2[5]) {
                        $omitsMax2[5] = $iniOmit - $omits2[5];
                    }
                    if ($iniOmit - $omits2[6] > $omitsMax2[6]) {
                        $omitsMax2[6] = $iniOmit - $omits2[6];
                    }
                    if ($iniOmit - $omits2[7] > $omitsMax2[7]) {
                        $omitsMax2[7] = $iniOmit - $omits2[7];
                    }
                    if ($iniOmit - $omits2[8] > $omitsMax2[8]) {
                        $omitsMax2[8] = $iniOmit - $omits2[8];
                    }
                    if ($iniOmit - $omits2[9] > $omitsMax2[9]) {
                        $omitsMax2[9] = $iniOmit - $omits2[9];
                    }
                    $row = array();
                    $tmp = array();
                    foreach ($omits as $b => $cnt) {
                        if ($cnt <= $iniOmit) {
                            $tmp[] = $iniOmit - $cnt;
                        } else {
                            $tmp[] = 0;
                            $omits[$b] = $iniOmit;
                        }
                    }
                    $row["Drawing_Date"] = null;
                    $row["Drawing_Time"] = null;
                    $row["Period"] = (double)$openedCai['dat_expect'];
                    $row["Nums"] = $tmp;
                    $row["ZX"] = $omits2[2] >= 0 ? 0 : $iniOmit - $omits2[2];
                    $row["FX"] = $omits2[0] >= 0 ? 0 : $iniOmit - $omits2[0];
                    $row["CH"] = $omits2[1] >= 0 ? 0 : $iniOmit - $omits2[1];
                    $row["Odd"] = $omits2[3] >= 0 ? 0 : $iniOmit - $omits2[3];
                    $row["Even"] = $omits2[4] >= 0 ? 0 : $iniOmit - $omits2[4];
                    $row["Big"] = $omits2[5] >= 0 ? 0 : $iniOmit - $omits2[5];
                    $row["Small"] = $omits2[6] >= 0 ? 0 : $iniOmit - $omits2[6];
                    $row["Front"] = $omits2[7] >= 0 ? 0 : $iniOmit - $omits2[7];
                    $row["Back"] = $omits2[9] >= 0 ? 0 : $iniOmit - $omits2[9];
                    $row["Middle"] = $omits2[8] >= 0 ? 0 : $iniOmit - $omits2[8];
                    $row["Result"] = $value;
                    $shows[] = $row;
                    foreach ($omits2 as $b => $cnt) {
                        if ($cnt >= 0) {
                            $omits2[$b] = $iniOmit;
                        }
                    }
                }
                $statRow1 = array();
                $statRow1["Drawing_Date"] = null;
                $statRow1["Drawing_Time"] = null;
                $statRow1["Period"] = null;
                $statRow1["Nums"] = array_values($ballCnt);
                $statRow1["ZX"] = $ballCnt2[2];
                $statRow1["FX"] = $ballCnt2[0];
                $statRow1["CH"] = $ballCnt2[1];
                $statRow1["Odd"] = $ballCnt2[3];
                $statRow1["Even"] = $ballCnt2[4];
                $statRow1["Big"] = $ballCnt2[5];
                $statRow1["Small"] = $ballCnt2[6];
                $statRow1["Front"] = $ballCnt2[7];
                $statRow1["Back"] = $ballCnt2[9];
                $statRow1["Middle"] = $ballCnt2[8];
                $statRow1["Result"] = null;
                $statRow2 = array();
                $statRow2["Drawing_Date"] = null;
                $statRow2["Drawing_Time"] = null;
                $statRow2["Period"] = null;
                $statRow2["Nums"] = array_values($omitsMax);
                $statRow2["ZX"] = $omitsMax2[2];
                $statRow2["FX"] = $omitsMax2[0];
                $statRow2["CH"] = $omitsMax2[1];
                $statRow2["Odd"] = $omitsMax2[3];
                $statRow2["Even"] = $omitsMax2[4];
                $statRow2["Big"] = $omitsMax2[5];
                $statRow2["Small"] = $omitsMax2[6];
                $statRow2["Front"] = $omitsMax2[7];
                $statRow2["Back"] = $omitsMax2[9];
                $statRow2["Middle"] = $omitsMax2[8];
                $statRow2["Result"] = null;
                $hotcold1 = array();
                for ($j = 0; $j < $iOpenCodeCnt; $j++) {
                    $k = $j + 1;
                    $hotcold1[] = $k;
                }
                $retData["stat"][] = $statRow1;
                $retData["stat"][] = $statRow2;
                $retData["hotcold"][] = $hotcold1;
                $retData["hotcold"][] = array();
                $retData["hotcold"][] = array();
                $retData["list"] = array_reverse($shows);
            }
            $ret = json_encode($retData);
            S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
        }
        return $ret;
    }

    function getNumberTrend($type, $page, $lotType, $expire)
    {
        $ball = (int)wjStrFilter(I('get.ball'));
        $count = (int)wjStrFilter(I('get.count'));
        $isToday = wjStrFilter(I('get.isToday'));
        $cacheName = $lotType . '_' . $page . '_' . $ball . '_' . $count . '_' . $isToday;
        $ret = S($cacheName);
        if ($ret === false || $ret == '') {
            $module = M();
            $retData = array();
            $iOpenCodeCnt = $this->getOpenCodeCntByLotType($lotType);
            $iAllCodesCnt = $this->getAllCodesCntByLotType($lotType);
            $bFirstZero = $this->isStartFromZero($lotType);
            if ($ball < $iAllCodesCnt && $ball >= 0 && $count < 200) {
                $ballCnt = array();
                $ballCnt2 = array();
                $omits = array();
                $omits2 = array();
                $iniOmit = -1;
                $omitsMax = array();
                $omitsMax2 = array();
                for ($i = 0; $i < $iOpenCodeCnt; $i++) {
                    $ballA = $i;
                    $ballCnt[$ballA] = 0;
                    $omits[$ballA] = $iniOmit;
                    $omitsMax[$ballA] = 0;
                }
                for ($i = 0; $i < 7; $i++) {
                    $omits2[$i] = $iniOmit;
                    $ballCnt2[$i] = 0;
                    $omitsMax2[$i] = 0;
                }
                $today = date("Y-m-d");
                if ($isToday = 'true') {
                    $openedCaiList = $this->getLottoryByDate($module, $lotType, $today);
                } else {
                    $openedCaiList = $this->getLottoryByCnt($module, $lotType, $count);
                }
                $openedCaiList = array_reverse($openedCaiList);
                $lastResult = -1;
                $shows = array();
                foreach ($openedCaiList as $openedCai) {
                    $OpenCodes = ZstAnalyser::getCodeArr($openedCai['dat_codes']);
                    if (count($OpenCodes) < $iOpenCodeCnt) {
                        continue;
                    }
                    $value = -1;
                    for ($i = 0; $i < count($OpenCodes); $i++) {
                        if ((int)$OpenCodes[$i] == $ball) {
                            $value = $i;
                            break;
                        }
                    }
                    if ($value == -1) {
                        continue;
                    }
                    foreach ($omits as $b => $cnt) {
                        if ($value == $b && $cnt < 0) {
                            $omits[$b] = $iniOmit - $omits[$b];
                        } else {
                            $omits[$b]--;
                        }
                        if ($iniOmit - $omits[$b] > $omitsMax[$b]) {
                            $omitsMax[$b] = $iniOmit - $omits[$b];
                        }
                    }
                    $ballCnt[$value]++;
                    if ($lastResult == -1) {
                        $omits2[0]--;
                        $omits2[1] = 0;
                        $omits2[2]--;
                        $lastResult = $value;
                    } else {
                        if ($value < $lastResult) {
                            $omits2[0] = $iniOmit - $omits2[0];
                            $omits2[1]--;
                            $omits2[2]--;
                            $ballCnt2[0]++;
                        } else {
                            if ($value == $lastResult) {
                                $omits2[0]--;
                                $omits2[1] = $iniOmit - $omits2[1];
                                $omits2[2]--;
                                $ballCnt2[1]++;
                            } else {
                                $omits2[0]--;
                                $omits2[1]--;
                                $omits2[2] = $iniOmit - $omits2[2];
                                $ballCnt2[2]++;
                            }
                        }
                        $lastResult = $value;
                    }
                    if ($value % 2 != 0) {
                        $omits2[3] = $iniOmit - $omits2[3];
                        $omits2[4]--;
                        $ballCnt2[3]++;
                    } else {
                        $omits2[4] = $iniOmit - $omits2[4];
                        $omits2[3]--;
                        $ballCnt2[4]++;
                    }
                    if ($value > $iOpenCodeCnt / 2) {
                        $omits2[5] = $iniOmit - $omits2[5];
                        $omits2[6]--;
                        $ballCnt2[5]++;
                    } else {
                        $omits2[6] = $iniOmit - $omits2[6];
                        $omits2[5]--;
                        $ballCnt2[6]++;
                    }
                    if ($iniOmit - $omits2[0] > $omitsMax2[0]) {
                        $omitsMax2[0] = $iniOmit - $omits2[0];
                    }
                    if ($iniOmit - $omits2[1] > $omitsMax2[1]) {
                        $omitsMax2[1] = $iniOmit - $omits2[1];
                    }
                    if ($iniOmit - $omits2[2] > $omitsMax2[2]) {
                        $omitsMax2[2] = $iniOmit - $omits2[2];
                    }
                    if ($iniOmit - $omits2[3] > $omitsMax2[3]) {
                        $omitsMax2[3] = $iniOmit - $omits2[3];
                    }
                    if ($iniOmit - $omits2[4] > $omitsMax2[4]) {
                        $omitsMax2[4] = $iniOmit - $omits2[4];
                    }
                    if ($iniOmit - $omits2[5] > $omitsMax2[5]) {
                        $omitsMax2[5] = $iniOmit - $omits2[5];
                    }
                    if ($iniOmit - $omits2[6] > $omitsMax2[6]) {
                        $omitsMax2[6] = $iniOmit - $omits2[6];
                    }
                    $row = array();
                    $tmp = array();
                    foreach ($omits as $b => $cnt) {
                        if ($cnt <= $iniOmit) {
                            $tmp[] = $iniOmit - $cnt;
                        } else {
                            $tmp[] = 0;
                            $omits[$b] = $iniOmit;
                        }
                    }
                    $row["Drawing_Date"] = null;
                    $row["Drawing_Time"] = null;
                    $row["Period"] = (double)$openedCai['dat_expect'];
                    $row["Nums"] = $tmp;
                    $row["ZX"] = $omits2[2] >= 0 ? 0 : $iniOmit - $omits2[2];
                    $row["FX"] = $omits2[0] >= 0 ? 0 : $iniOmit - $omits2[0];
                    $row["CH"] = $omits2[1] >= 0 ? 0 : $iniOmit - $omits2[1];
                    $row["Odd"] = $omits2[3] >= 0 ? 0 : $iniOmit - $omits2[3];
                    $row["Even"] = $omits2[4] >= 0 ? 0 : $iniOmit - $omits2[4];
                    $row["Big"] = $omits2[5] >= 0 ? 0 : $iniOmit - $omits2[5];
                    $row["Small"] = $omits2[6] >= 0 ? 0 : $iniOmit - $omits2[6];
                    $row["Front"] = $omits2[6] >= 0 ? 0 : $iniOmit - $omits2[6];
                    $row["Back"] = $omits2[5] >= 0 ? 0 : $iniOmit - $omits2[5];
                    $row["Middle"] = null;
                    $row["Result"] = $value + 1;
                    $shows[] = $row;
                    foreach ($omits2 as $b => $cnt) {
                        if ($cnt >= 0) {
                            $omits2[$b] = $iniOmit;
                        }
                    }
                }
                $statRow1 = array();
                $statRow1["Drawing_Date"] = null;
                $statRow1["Drawing_Time"] = null;
                $statRow1["Period"] = null;
                $statRow1["Nums"] = array_values($ballCnt);
                $statRow1["ZX"] = $ballCnt2[2];
                $statRow1["FX"] = $ballCnt2[0];
                $statRow1["CH"] = $ballCnt2[1];
                $statRow1["Odd"] = $ballCnt2[3];
                $statRow1["Even"] = $ballCnt2[4];
                $statRow1["Big"] = $ballCnt2[5];
                $statRow1["Small"] = $ballCnt2[6];
                $statRow1["Front"] = $ballCnt2[6];
                $statRow1["Back"] = $ballCnt2[5];
                $statRow1["Middle"] = null;
                $statRow1["Result"] = null;
                $statRow2 = array();
                $statRow2["Drawing_Date"] = null;
                $statRow2["Drawing_Time"] = null;
                $statRow2["Period"] = null;
                $statRow2["Nums"] = array_values($omitsMax);
                $statRow2["ZX"] = $omitsMax2[2];
                $statRow2["FX"] = $omitsMax2[0];
                $statRow2["CH"] = $omitsMax2[1];
                $statRow2["Odd"] = $omitsMax2[3];
                $statRow2["Even"] = $omitsMax2[4];
                $statRow2["Big"] = $omitsMax2[5];
                $statRow2["Small"] = $omitsMax2[6];
                $statRow2["Front"] = $omitsMax2[6];
                $statRow2["Back"] = $omitsMax2[5];
                $statRow2["Middle"] = null;
                $statRow2["Result"] = null;
                $hotcold1 = array();
                for ($j = 0; $j < $iOpenCodeCnt; $j++) {
                    $k = $j + 1;
                    $hotcold1[] = $k;
                }
                $retData["stat"][] = $statRow1;
                $retData["stat"][] = $statRow2;
                $retData["hotcold"][] = $hotcold1;
                $retData["hotcold"][] = array();
                $retData["hotcold"][] = array();
                $retData["list"] = array_reverse($shows);
            }
            $ret = json_encode($retData);
            S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
        }
        return $ret;
    }

    function getGuanYaTrend($type, $page, $lotType, $expire)
    {
        $count = (int)wjStrFilter(I('get.count'));
        $isToday = wjStrFilter(I('get.isToday'));
        $cacheName = $lotType . '_' . $page . '_' . $count . '_' . $isToday;
        $ret = S($cacheName);
        if ($ret === false || $ret == '') {
            $module = M();
            $retData = array();
            $iOpenCodeCnt = $this->getOpenCodeCntByLotType($lotType);
            $iAllCodesCnt = $this->getAllCodesCntByLotType($lotType);
            $bFirstZero = $this->isStartFromZero($lotType);
            if ($count < 200) {
                $ballCnt = array();
                $ballCnt2 = array();
                $omits = array();
                $omits2 = array();
                $iniOmit = -1;
                $omitsMax = array();
                $omitsMax2 = array();
                $iColNeeds = 0;
                $arrSumValues = array();
                for ($j = 0; $j < $iAllCodesCnt; $j++) {
                    for ($m = 0; $m < $iAllCodesCnt; $m++) {
                        if ($j == $m) {
                            continue;
                        }
                        $sum = $j + $m + 2;
                        if ($bFirstZero) {
                            $sum = $j + $m;
                        }
                        if (!in_array($sum, $arrSumValues)) {
                            $arrSumValues[] = $sum;
                        }
                    }
                }
                $iColNeeds = max($arrSumValues);
                $iStart = min($arrSumValues) - 1;
                for ($i = $iStart; $i < $iColNeeds; $i++) {
                    $ballA = $i < 9 ? "0" . ($i + 1) : "" . ($i + 1);
                    $ballCnt[$ballA] = 0;
                    $omits[$ballA] = $iniOmit;
                    $omitsMax[$ballA] = 0;
                }
                for ($i = 0; $i < 10; $i++) {
                    $omits2[$i] = $iniOmit;
                    $ballCnt2[$i] = 0;
                    $omitsMax2[$i] = 0;
                }
                $today = empty($_GET['date']) ? date('Y-m-d') : $_GET['date'];
                if ($isToday = 'true') {
                    $openedCaiList = $this->getLottoryByDate($module, $lotType, $today);
                } else {
                    $openedCaiList = $this->getLottoryByCnt($module, $lotType, $count);
                }
                $openedCaiList = array_reverse($openedCaiList);
                $lastResult = -1;
                $shows = array();
                foreach ($openedCaiList as $openedCai) {
                    $OpenCodes = ZstAnalyser::getCodeArr($openedCai['dat_codes']);
                    if (count($OpenCodes) < $iOpenCodeCnt) {
                        continue;
                    }
                    $value = (int)$OpenCodes[0] + (int)$OpenCodes[1];
                    $value = $value < 10 ? '0' . $value : $value;
                    foreach ($omits as $b => $cnt) {
                        if ($value == $b && $cnt < 0) {
                            $omits[$b] = $iniOmit - $omits[$b];
                        } else {
                            $omits[$b]--;
                        }
                        if ($iniOmit - $omits[$b] > $omitsMax[$b]) {
                            $omitsMax[$b] = $iniOmit - $omits[$b];
                        }
                    }
                    $ballCnt[$value]++;
                    if ($lastResult == -1) {
                        $omits2[0]--;
                        $omits2[1] = 0;
                        $omits2[2]--;
                        $lastResult = $value;
                    } else {
                        if ($value < $lastResult) {
                            $omits2[0] = $iniOmit - $omits2[0];
                            $omits2[1]--;
                            $omits2[2]--;
                            $ballCnt2[0]++;
                        } else {
                            if ($value == $lastResult) {
                                $omits2[0]--;
                                $omits2[1] = $iniOmit - $omits2[1];
                                $omits2[2]--;
                                $ballCnt2[1]++;
                            } else {
                                $omits2[0]--;
                                $omits2[1]--;
                                $omits2[2] = $iniOmit - $omits2[2];
                                $ballCnt2[2]++;
                            }
                        }
                        $lastResult = $value;
                    }
                    if ($value % 2 != 0) {
                        $omits2[3] = $iniOmit - $omits2[3];
                        $omits2[4]--;
                        $ballCnt2[3]++;
                    } else {
                        $omits2[4] = $iniOmit - $omits2[4];
                        $omits2[3]--;
                        $ballCnt2[4]++;
                    }
                    if ($value > (min($arrSumValues) + max($arrSumValues)) / 2) {
                        $omits2[5] = $iniOmit - $omits2[5];
                        $omits2[6]--;
                        $ballCnt2[5]++;
                    } else {
                        $omits2[6] = $iniOmit - $omits2[6];
                        $omits2[5]--;
                        $ballCnt2[6]++;
                    }
                    if ($value < min($arrSumValues) + count($arrSumValues) / 3) {
                        $omits2[7] = $iniOmit - $omits2[7];
                        $omits2[8]--;
                        $omits2[9]--;
                        $ballCnt2[7]++;
                    } else {
                        if ($value > min($arrSumValues) + count($arrSumValues) / 3 * 2) {
                            $omits2[9] = $iniOmit - $omits2[9];
                            $omits2[8]--;
                            $omits2[7]--;
                            $ballCnt2[9]++;
                        } else {
                            $omits2[8] = $iniOmit - $omits2[8];
                            $omits2[9]--;
                            $omits2[7]--;
                            $ballCnt2[8]++;
                        }
                    }
                    if ($iniOmit - $omits2[0] > $omitsMax2[0]) {
                        $omitsMax2[0] = $iniOmit - $omits2[0];
                    }
                    if ($iniOmit - $omits2[1] > $omitsMax2[1]) {
                        $omitsMax2[1] = $iniOmit - $omits2[1];
                    }
                    if ($iniOmit - $omits2[2] > $omitsMax2[2]) {
                        $omitsMax2[2] = $iniOmit - $omits2[2];
                    }
                    if ($iniOmit - $omits2[3] > $omitsMax2[3]) {
                        $omitsMax2[3] = $iniOmit - $omits2[3];
                    }
                    if ($iniOmit - $omits2[4] > $omitsMax2[4]) {
                        $omitsMax2[4] = $iniOmit - $omits2[4];
                    }
                    if ($iniOmit - $omits2[5] > $omitsMax2[5]) {
                        $omitsMax2[5] = $iniOmit - $omits2[5];
                    }
                    if ($iniOmit - $omits2[6] > $omitsMax2[6]) {
                        $omitsMax2[6] = $iniOmit - $omits2[6];
                    }
                    if ($iniOmit - $omits2[7] > $omitsMax2[7]) {
                        $omitsMax2[7] = $iniOmit - $omits2[7];
                    }
                    if ($iniOmit - $omits2[8] > $omitsMax2[8]) {
                        $omitsMax2[8] = $iniOmit - $omits2[8];
                    }
                    if ($iniOmit - $omits2[9] > $omitsMax2[9]) {
                        $omitsMax2[9] = $iniOmit - $omits2[9];
                    }
                    $row = array();
                    $tmp = array();
                    foreach ($omits as $b => $cnt) {
                        if ($cnt <= $iniOmit) {
                            $tmp[] = $iniOmit - $cnt;
                        } else {
                            $tmp[] = 0;
                            $omits[$b] = $iniOmit;
                        }
                    }
                    $row["Drawing_Date"] = null;
                    $row["Drawing_Time"] = null;
                    $row["Period"] = (double)$openedCai['dat_expect'];
                    $row["Nums"] = $tmp;
                    $row["ZX"] = $omits2[2] >= 0 ? 0 : $iniOmit - $omits2[2];
                    $row["FX"] = $omits2[0] >= 0 ? 0 : $iniOmit - $omits2[0];
                    $row["CH"] = $omits2[1] >= 0 ? 0 : $iniOmit - $omits2[1];
                    $row["Odd"] = $omits2[3] >= 0 ? 0 : $iniOmit - $omits2[3];
                    $row["Even"] = $omits2[4] >= 0 ? 0 : $iniOmit - $omits2[4];
                    $row["Big"] = $omits2[5] >= 0 ? 0 : $iniOmit - $omits2[5];
                    $row["Small"] = $omits2[6] >= 0 ? 0 : $iniOmit - $omits2[6];
                    $row["Front"] = $omits2[7] >= 0 ? 0 : $iniOmit - $omits2[7];
                    $row["Back"] = $omits2[9] >= 0 ? 0 : $iniOmit - $omits2[9];
                    $row["Middle"] = $omits2[8] >= 0 ? 0 : $iniOmit - $omits2[8];
                    $row["Result"] = $value;
                    $shows[] = $row;
                    foreach ($omits2 as $b => $cnt) {
                        if ($cnt >= 0) {
                            $omits2[$b] = $iniOmit;
                        }
                    }
                }
                $statRow1 = array();
                $statRow1["Drawing_Date"] = null;
                $statRow1["Drawing_Time"] = null;
                $statRow1["Period"] = null;
                $statRow1["Nums"] = array_values($ballCnt);
                $statRow1["ZX"] = $ballCnt2[2];
                $statRow1["FX"] = $ballCnt2[0];
                $statRow1["CH"] = $ballCnt2[1];
                $statRow1["Odd"] = $ballCnt2[3];
                $statRow1["Even"] = $ballCnt2[4];
                $statRow1["Big"] = $ballCnt2[5];
                $statRow1["Small"] = $ballCnt2[6];
                $statRow1["Front"] = $ballCnt2[7];
                $statRow1["Back"] = $ballCnt2[9];
                $statRow1["Middle"] = $ballCnt2[8];
                $statRow1["Result"] = null;
                $statRow2 = array();
                $statRow2["Drawing_Date"] = null;
                $statRow2["Drawing_Time"] = null;
                $statRow2["Period"] = null;
                $statRow2["Nums"] = array_values($omitsMax);
                $statRow2["ZX"] = $omitsMax2[2];
                $statRow2["FX"] = $omitsMax2[0];
                $statRow2["CH"] = $omitsMax2[1];
                $statRow2["Odd"] = $omitsMax2[3];
                $statRow2["Even"] = $omitsMax2[4];
                $statRow2["Big"] = $omitsMax2[5];
                $statRow2["Small"] = $omitsMax2[6];
                $statRow2["Front"] = $omitsMax2[7];
                $statRow2["Back"] = $omitsMax2[9];
                $statRow2["Middle"] = $omitsMax2[8];
                $statRow2["Result"] = null;
                $hotcold1 = array();
                for ($j = 0; $j < $iOpenCodeCnt; $j++) {
                    $k = $j + 1;
                    $hotcold1[] = $k;
                }
                $retData["stat"][] = $statRow1;
                $retData["stat"][] = $statRow2;
                $retData["hotcold"][] = $hotcold1;
                $retData["hotcold"][] = array();
                $retData["hotcold"][] = array();
                $retData["list"] = array_reverse($shows);
            }
            $ret = json_encode($retData);
            S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
        }
        return $ret;
    }

    function getSamePositionTrend($type, $page, $lotType, $expire)
    {
        $id = (int)wjStrFilter(I('get.id'));
        $pid = (int)wjStrFilter(I('get.pid'));
        $cacheName = $lotType . '_' . $page . '_' . $id . '_' . $pid;
        $ret = S($cacheName);
        if ($ret === false || $ret == '') {
            $module = M();
            $retData = array();
            $iOpenCodeCnt = $this->getOpenCodeCntByLotType($lotType);
            $iAllCodesCnt = $this->getAllCodesCntByLotType($lotType);
            $bFirstZero = $this->isStartFromZero($lotType);
            if ($id < $iAllCodesCnt + 2) {
                $expects = array();
                $sql = "select actionNo, actionTime from {$this->prename}data_time where type={$lotType} order by actionTime";
                $dataTimes = $module->query($sql);
                $types = $this->getTypes($module);
                $kjTime = $types[$type]["data_ftime"];
                $time = time();
                $now = $time;
                $nextExpect = 0;
                if ($pid != 0) {
                    $loop = 1;
                    while ($loop < 60 * 24) {
                        $atime = date('H:i:s', $time + $kjTime);
                        foreach ($dataTimes as $dt) {
                            if ($dt["actionTime"] > $atime) {
                                if (($fun = $types[$lotType]['onGetNoed']) && method_exists($this, $fun)) {
                                    $actionNo = $dt['actionNo'];
                                    $actionTime = $dt['actionTime'];
                                    $this->{$fun}($actionNo, $actionTime, $time);
                                    if ($actionNo == $pid) {
                                        $loop = 60 * 24;
                                        break;
                                    }
                                }
                            }
                        }
                        if ($loop < 60 * 24) {
                            $time -= 300;
                        }
                        $loop++;
                    }
                }
                $dataNext = array();
                $atime = date('H:i:s', $time + $kjTime);
                foreach ($dataTimes as $dt) {
                    if ($dt["actionTime"] > $atime) {
                        $nextExpect = $dt['actionNo'];
                        $dataNext["actionNo"] = $dt['actionNo'];
                        $dataNext["actionTime"] = $dt['actionTime'];
                        break;
                    }
                }
                if (count($dataNext) == 0) {
                    return '';
                }
                for ($i = 0; $i < 30; $i++) {
                    $time = $time - $i * 60 * 60 * 24;
                    if (($fun = $types[$lotType]['onGetNoed']) && method_exists($this, $fun)) {
                        $actionNo = $dt['actionNo'];
                        $actionTime = $dt['actionTime'];
                        $this->{$fun}($actionNo, $actionTime, $time);
                        $expects[] = "'{$actionNo}'";
                    }
                }
                if (count($expects) != 30) {
                    return '';
                }
                $sql = "select replace(dat_expect,'-','') dat_expect,dat_codes,dat_open_time from {$this->prename}data where dat_expect in (" . implode(',', $expects) . ") and dat_type={$lotType} order by dat_expect desc";
                $openedCaiList = $module->query($sql);
                if ($openedCaiList === false) {
                    $openedCaiList = array();
                }
                $chart = array();
                foreach ($openedCaiList as $openedCai) {
                    $OpenCodes = ZstAnalyser::getCodeArr($openedCai['dat_codes']);
                    if (count($OpenCodes) < $iOpenCodeCnt) {
                        continue;
                    }
                    $row = array();
                    $row["Drawing_Date"] = date('m-d', $openedCai["dat_open_time"]);
                    $row["Drawing_Time"] = date('H:i', $openedCai["dat_open_time"]);
                    $row["Period"] = (double)$openedCai['dat_expect'];
                    $row["Nums"] = $OpenCodes[$id];
                    $row["ZX"] = 0;
                    $row["FX"] = 0;
                    $row["CH"] = 0;
                    $row["Odd"] = $OpenCodes[$id] % 2 != 0 ? 1 : 0;
                    $row["Even"] = $OpenCodes[$id] % 2 != 0 ? 0 : 1;
                    $row["Big"] = $OpenCodes[$id] > $iAllCodesCnt / 2 ? 1 : 0;
                    $row["Small"] = $OpenCodes[$id] > $iAllCodesCnt / 2 ? 0 : 1;
                    $row["Front"] = 0;
                    $row["Back"] = 0;
                    $row["Middle"] = 0;
                    $row["Result"] = null;
                    $chart[] = $row;
                }
                $options = array();
                for ($i = $nextExpect; $i > 0; $i--) {
                    $actionNo = $i;
                    $actionTime = "00:00:00";
                    $this->{$fun}($actionNo, $actionTime, $now);
                    $options[] = $actionNo;
                }
                $retData["time"] = date('H:i', $time + $kjTime);
                $retData["chart"] = $chart;
                $retData["option"] = $options;
            }
            $ret = json_encode($retData);
            S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
        }
        return $ret;
    }

    function getSameNoTrend($type, $page, $lotType, $expire)
    {
        $id = (int)wjStrFilter(I('get.id'));
        $pid = (int)wjStrFilter(I('get.pid'));
        $cacheName = $lotType . '_' . $page . '_' . $id . '_' . $pid;
        $ret = S($cacheName);
        if ($ret === false || $ret == '') {
            $module = M();
            $retData = array();
            $iOpenCodeCnt = $this->getOpenCodeCntByLotType($lotType);
            $iAllCodesCnt = $this->getAllCodesCntByLotType($lotType);
            $bFirstZero = $this->isStartFromZero($lotType);
            if ($id < $iAllCodesCnt + 2) {
                $expects = array();
                $sql = "select actionNo, actionTime from {$this->prename}data_time where type={$lotType} order by actionTime";
                $dataTimes = $module->query($sql);
                $types = $this->getTypes($module);
                $kjTime = $types[$type]["data_ftime"];
                $time = time();
                $now = $time;
                $nextExpect = 0;
                if ($pid != 0) {
                    $loop = 1;
                    while ($loop < 60 * 24) {
                        $atime = date('H:i:s', $time + $kjTime);
                        foreach ($dataTimes as $dt) {
                            if ($dt["actionTime"] > $atime) {
                                if (($fun = $types[$lotType]['onGetNoed']) && method_exists($this, $fun)) {
                                    $actionNo = $dt['actionNo'];
                                    $actionTime = $dt['actionTime'];
                                    $this->{$fun}($actionNo, $actionTime, $time);
                                    if ($actionNo == $pid) {
                                        $loop = 60 * 24;
                                        break;
                                    }
                                }
                            }
                        }
                        if ($loop < 60 * 24) {
                            $time -= 300;
                        }
                        $loop++;
                    }
                }
                $dataNext = array();
                $atime = date('H:i:s', $time + $kjTime);
                foreach ($dataTimes as $dt) {
                    if ($dt["actionTime"] > $atime) {
                        $nextExpect = $dt['actionNo'];
                        $dataNext["actionNo"] = $dt['actionNo'];
                        $dataNext["actionTime"] = $dt['actionTime'];
                        break;
                    }
                }
                if (count($dataNext) == 0) {
                    return '';
                }
                for ($i = 0; $i < 30; $i++) {
                    $time = $time - $i * 60 * 60 * 24;
                    if (($fun = $types[$lotType]['onGetNoed']) && method_exists($this, $fun)) {
                        $actionNo = $dt['actionNo'];
                        $actionTime = $dt['actionTime'];
                        $this->{$fun}($actionNo, $actionTime, $time);
                        $expects[] = "'{$actionNo}'";
                    }
                }
                if (count($expects) != 30) {
                    return '';
                }
                $sql = "select replace(dat_expect,'-','') dat_expect,dat_codes,dat_open_time from {$this->prename}data where dat_expect in (" . implode(',', $expects) . ") and dat_type={$lotType} order by dat_expect desc";
                $openedCaiList = $module->query($sql);
                if ($openedCaiList === false) {
                    $openedCaiList = array();
                }
                $chart = array();
                $descr = array("冠", "亚", "三", "四", "五", "六", "七", "八", "九", "十");
                foreach ($openedCaiList as $openedCai) {
                    $OpenCodes = ZstAnalyser::getCodeArr($openedCai['dat_codes']);
                    if (count($OpenCodes) < $iOpenCodeCnt) {
                        continue;
                    }
                    $value = -1;
                    for ($i = 0; $i < count($OpenCodes); $i++) {
                        if ((int)$OpenCodes[$i] == $id + 1) {
                            $value = $i;
                            break;
                        }
                    }
                    if ($value == -1) {
                        continue;
                    }
                    $row = array();
                    $row["Drawing_Date"] = date('m-d', $openedCai["dat_open_time"]);
                    $row["Drawing_Time"] = date('H:i', $openedCai["dat_open_time"]);
                    $row["Period"] = (double)$openedCai['dat_expect'];
                    $row["Nums"] = $descr[$value];
                    $row["ZX"] = 0;
                    $row["FX"] = 0;
                    $row["CH"] = 0;
                    $row["Odd"] = $value % 2 != 0 ? 1 : 0;
                    $row["Even"] = $value % 2 != 0 ? 0 : 1;
                    $row["Big"] = $value > $iAllCodesCnt / 2 ? 1 : 0;
                    $row["Small"] = $value > $iAllCodesCnt / 2 ? 0 : 1;
                    $row["Front"] = $value + 1 > $iAllCodesCnt / 2 ? 0 : 1;
                    $row["Back"] = $value + 1 > $iAllCodesCnt / 2 ? 1 : 0;
                    $row["Middle"] = 0;
                    $row["Result"] = null;
                    $chart[] = $row;
                }
                $options = array();
                for ($i = $nextExpect; $i > 0; $i--) {
                    $actionNo = $i;
                    $actionTime = "00:00:00";
                    $this->{$fun}($actionNo, $actionTime, $now);
                    $options[] = $actionNo;
                }
                $retData["time"] = date('H:i', $time + $kjTime);
                $retData["chart"] = $chart;
                $retData["option"] = $options;
            }
            $ret = json_encode($retData);
            S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
        }
        return $ret;
    }

    function getSameSumTrend($type, $page, $lotType, $expire)
    {
        $id = (int)wjStrFilter(I('get.id'));
        $pid = (int)wjStrFilter(I('get.pid'));
        $cacheName = $lotType . '_' . $page . '_' . $id . '_' . $pid;
        $ret = S($cacheName);
        if ($ret === false || $ret == '') {
            $module = M();
            $retData = array();
            $iOpenCodeCnt = $this->getOpenCodeCntByLotType($lotType);
            $iAllCodesCnt = $this->getAllCodesCntByLotType($lotType);
            $bFirstZero = $this->isStartFromZero($lotType);
            if ($id < $iAllCodesCnt + 2) {
                $expects = array();
                $sql = "select actionNo, actionTime from {$this->prename}data_time where type={$lotType} order by actionTime";
                $dataTimes = $module->query($sql);
                $types = $this->getTypes($module);
                $kjTime = $types[$type]["data_ftime"];
                $time = time();
                $now = $time;
                $nextExpect = 0;
                if ($pid != 0) {
                    $loop = 1;
                    while ($loop < 60 * 24) {
                        $atime = date('H:i:s', $time + $kjTime);
                        foreach ($dataTimes as $dt) {
                            if ($dt["actionTime"] > $atime) {
                                if (($fun = $types[$lotType]['onGetNoed']) && method_exists($this, $fun)) {
                                    $actionNo = $dt['actionNo'];
                                    $actionTime = $dt['actionTime'];
                                    $this->{$fun}($actionNo, $actionTime, $time);
                                    if ($actionNo == $pid) {
                                        $loop = 60 * 24;
                                        break;
                                    }
                                }
                            }
                        }
                        if ($loop < 60 * 24) {
                            $time -= 300;
                        }
                        $loop++;
                    }
                }
                $dataNext = array();
                $atime = date('H:i:s', $time + $kjTime);
                foreach ($dataTimes as $dt) {
                    if ($dt["actionTime"] > $atime) {
                        $nextExpect = $dt['actionNo'];
                        $dataNext["actionNo"] = $dt['actionNo'];
                        $dataNext["actionTime"] = $dt['actionTime'];
                        break;
                    }
                }
                if (count($dataNext) == 0) {
                    return '';
                }
                for ($i = 0; $i < 30; $i++) {
                    $time = $time - $i * 60 * 60 * 24;
                    if (($fun = $types[$lotType]['onGetNoed']) && method_exists($this, $fun)) {
                        $actionNo = $dt['actionNo'];
                        $actionTime = $dt['actionTime'];
                        $this->{$fun}($actionNo, $actionTime, $time);
                        $expects[] = "'{$actionNo}'";
                    }
                }
                if (count($expects) != 30) {
                    return '';
                }
                $iColNeeds = 0;
                $arrSumValues = array();
                for ($j = 0; $j < $iAllCodesCnt; $j++) {
                    for ($m = 0; $m < $iAllCodesCnt; $m++) {
                        if ($j == $m) {
                            continue;
                        }
                        $sum = $j + $m + 2;
                        if ($bFirstZero) {
                            $sum = $j + $m;
                        }
                        if (!in_array($sum, $arrSumValues)) {
                            $arrSumValues[] = $sum;
                        }
                    }
                }
                $sql = "select replace(dat_expect,'-','') dat_expect,dat_codes,dat_open_time from {$this->prename}data where dat_expect in (" . implode(',', $expects) . ") and dat_type={$lotType} order by dat_expect desc";
                $openedCaiList = $module->query($sql);
                if ($openedCaiList === false) {
                    $openedCaiList = array();
                }
                $chart = array();
                foreach ($openedCaiList as $openedCai) {
                    $OpenCodes = ZstAnalyser::getCodeArr($openedCai['dat_codes']);
                    if (count($OpenCodes) < $iOpenCodeCnt) {
                        continue;
                    }
                    $value = (int)$OpenCodes[0] + (int)$OpenCodes[1];
                    $row = array();
                    $row["Drawing_Date"] = date('m-d', $openedCai["dat_open_time"]);
                    $row["Drawing_Time"] = date('H:i', $openedCai["dat_open_time"]);
                    $row["Period"] = (double)$openedCai['dat_expect'];
                    $row["Nums"] = $value;
                    $row["ZX"] = 0;
                    $row["FX"] = 0;
                    $row["CH"] = 0;
                    $row["Odd"] = $value % 2 != 0 ? 1 : 0;
                    $row["Even"] = $value % 2 != 0 ? 0 : 1;
                    $row["Big"] = $value > (min($arrSumValues) + max($arrSumValues)) / 2 ? 1 : 0;
                    $row["Small"] = $value > (min($arrSumValues) + max($arrSumValues)) / 2 ? 0 : 1;
                    $row["Front"] = $value < min($arrSumValues) + count($arrSumValues) / 3 ? 1 : 0;
                    $row["Back"] = $value > min($arrSumValues) + count($arrSumValues) / 3 * 2 ? 1 : 0;
                    $row["Middle"] = $value >= min($arrSumValues) + count($arrSumValues) / 3 && $value <= min($arrSumValues) + count($arrSumValues) / 3 * 2 ? 1 : 0;
                    $row["Result"] = null;
                    $chart[] = $row;
                }
                $options = array();
                for ($i = $nextExpect; $i > 0; $i--) {
                    $actionNo = $i;
                    $actionTime = "00:00:00";
                    $this->{$fun}($actionNo, $actionTime, $now);
                    $options[] = $actionNo;
                }
                $retData["time"] = date('H:i', $time + $kjTime);
                $retData["chart"] = $chart;
                $retData["option"] = $options;
            }
            $ret = json_encode($retData);
            S($cacheName, $ret, array('type' => 'file', 'expire' => $expire));
        }
        return $ret;
    }

    function getAjaxTrend($type, $page, $lotType, $expire)
    {
        $module = M();
        $retData = array();
        $time = time();
        $MillisecondTime = getMillisecond();
        $currentNo = $this->getGameCurrentNo($lotType, $module, $time);
        $nextNo = $this->getGameNextNo($lotType, $module, $time);
        $kjHao = null;
        $kjHao = $module->query("select dat_codes from {$this->prename}data where dat_type={$lotType} and dat_expect='{$currentNo['actionNo']}'");
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
        $retData["current"]["periodNumber"] = $currentNo["actionNo"];
        $retData["current"]["awardTime"] = $currentNo["actionTime"];
        $retData["next"]["periodNumber"] = $nextNo["actionNo"];
        $retData["next"]["count"] = "";
        $retData["next"]["awardTime"] = $nextNo["actionTime"];
        $retData["time"] = $MillisecondTime;
        $retData["newIssue"]["periodNumber"] = $currentNo['actionNo'];
        $retData["newIssue"]["awardNumber"] = $data;
        $ret = json_encode($retData);
        return $ret;
    }

    function getLotTypeByGameId($gameId)
    {
        if ($gameId == 50) {
            return 20;
        } else {
            if ($gameId == 1) {
                return 1;
            } else {
                if ($gameId == 5) {
                    return 21;
                } else {
                    if ($gameId == 10) {
                        return 22;
                    } else {
                        if ($gameId == 3) {
                            return 3;
                        } else {
                            if ($gameId == 6) {
                                return 23;
                            } else {
                                if ($gameId == 8) {
                                    return 24;
                                } else {
                                    if ($gameId == 7) {
                                        return 18;
                                    } else {
                                        if ($gameId == 43) {
                                            return 43;
                                        } else {
                                            if ($gameId == 44) {
                                                return 44;
                                            } else {
                                                if ($gameId == 45) {
                                                    return 45;
                                                } else {
                                                    if ($gameId == 46) {
                                                        return 46;
                                                    } else {
                                                        if ($gameId == 47) {
                                                            return 47;
                                                        } else {
                                                            if ($gameId == 48) {
                                                                return 48;
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
                    }
                }
            }
        }
        return 0;
    }

    function getLotTypeByType($type)
    {
        if ($type == 'pk10') {
            return 20;
        } else {
            if ($type == 'cqssc') {
                return 1;
            } else {
                switch ($type) {
                    case 'gdkl10':
                        return 21;
                    case 'jsssc':
                        return 40;
                    case 'xyft':
                        return 34;
                    case 'jsk3':
                        return 22;
                    case 'tjssc':
                        return 3;
                    case 'kl8':
                        return 23;
                    case 'shssl':
                        return 24;
                    case 'jssc':
                        return 39;
                    case 'gd11x5':
                        return 6;
                    case 'fc3d':
                        return 9;
                    case 'pl3':
                        return 10;
                    case 'pc28':
                        return 43;
                    case 'txffc':
                        return 44;
                    case 'tcssc':
                        return 45;
                    case 'tcpk10':
                        return 46;
                    case 'sfpk10':
                        return 47;
                    case 'sfssc':
                        return 48;
                }
            }
        }
        return 0;
    }

    function getGameIdByLotType($lotType)
    {
        if ($lotType == 20 || $lotType == 34) {
            return 50;
        } else {
            if ($lotType == 1) {
                return 1;
            } else {
                if ($lotType == 21) {
                    return 5;
                } else {
                    if ($lotType == 22) {
                        return 10;
                    } else {
                        if ($lotType == 3) {
                            return 3;
                        } else {
                            if ($lotType == 23) {
                                return 6;
                            } else {
                                if ($lotType == 24) {
                                    return 8;
                                } else {
                                    if ($lotType == 18) {
                                        return 7;
                                    } else {
                                        if ($lotType == 43) {
                                            return 43;
                                        } else {
                                            if ($lotType == 44) {
                                                return 44;
                                            } else {
                                                if ($lotType == 45) {
                                                    return 45;
                                                } else {
                                                    if ($lotType == 46) {
                                                        return 46;
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
            }
        }
        return 0;
    }

    function getOpenCodeCntByLotType($lotType)
    {

        if ($lotType == 20 || $lotType == 34 || $lotType == 44 || $lotType == 46 || $lotType == 47) {

            return 10;
        } else {
            if ($lotType == 1 || $lotType == 43 || $lotType == 45 || $lotType == 48) {
                return 5;
            } else {
                if ($lotType == 21) {
                    return 8;
                } else {
                    if ($lotType == 22) {
                        return 3;
                    } else {
                        if ($lotType == 3 || $lotType == 35 || $lotType == 6) {
                            return 5;
                        } else {
                            if ($lotType == 23) {
                                return 20;
                            } else {
                                if ($lotType == 24) {
                                    return 3;
                                } else {
                                    if ($lotType == 18) {
                                        return 8;
                                    } else {
                                        return 10;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return 0;
    }

    function getAllCodesCntByLotType($lotType)
    {
        if ($lotType == 20 || $lotType == 34) {
            return 10;
        } else {
            if ($lotType == 1) {
                return 10;
            } else {
                if ($lotType == 21) {
                    return 20;
                } else {
                    if ($lotType == 22) {
                        return 6;
                    } else {
                        if ($lotType == 3 || $lotType == 35 || $lotType == 6) {
                            return 10;
                        } else {
                            if ($lotType == 23) {
                                return 80;
                            } else {
                                if ($lotType == 24) {
                                    return 10;
                                } else {
                                    if ($lotType == 18) {
                                        return 20;
                                    } else {
                                        if ($lotType == 43) {
                                            return 43;
                                        } else {
                                            if ($lotType == 44) {
                                                return 44;
                                            } else {
                                                if ($lotType == 45) {
                                                    return 45;
                                                } else {
                                                    if ($lotType == 46) {
                                                        return 46;
                                                    } else {
                                                        if ($lotType == 47) {
                                                            return 10;
                                                        } else {
                                                            if ($lotType == 48) {
                                                                return 10;
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
                    }
                }
            }
        }
        return 0;
    }

    function isStartFromZero($lotType)
    {
        if ($lotType == 20 || $lotType == 34) {
            return false;
        } else {
            if ($lotType == 1) {
                return true;
            } else {
                if ($lotType == 21) {
                    return false;
                } else {
                    if ($lotType == 22) {
                        return false;
                    } else {
                        if ($lotType == 3 || $lotType == 35 || $lotType == 6) {
                            return true;
                        } else {
                            if ($lotType == 23) {
                                return false;
                            } else {
                                if ($lotType == 24) {
                                    return true;
                                } else {
                                    if ($lotType == 18) {
                                        return false;
                                    } else {
                                        if ($lotType == 43) {
                                            return true;
                                        } else {
                                            if ($lotType == 44) {
                                                return true;
                                            } else {
                                                if ($lotType == 45) {
                                                    return true;
                                                } else {
                                                    if ($lotType == 46) {
                                                        return true;
                                                    } else {
                                                        if ($lotType == 47) {
                                                            return true;
                                                        } else {
                                                            if ($lotType == 48) {
                                                                return true;
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
                    }
                }
            }
        }
        return false;
    }

    function getGameAllExpects($lotType)
    {
        if ($lotType == 20 || $lotType == 34) {
            return 179;
        } else {
            if ($lotType == 1) {
                return 120;
            } else {
                if ($lotType == 21) {
                    return 84;
                } else {
                    if ($lotType == 22) {
                        return 82;
                    } else {
                        if ($lotType == 3) {
                            return 84;
                        } else {
                            if ($lotType == 23) {
                                return 179;
                            } else {
                                if ($lotType == 24) {
                                    return 23;
                                } else {
                                    if ($lotType == 18) {
                                        return 97;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return false;
    }

    function getGameNextNo($type, $module, $time)
    {
        $type = intval($type);

        $types = $this->getTypes($module);
        // $kjTime = $types[$type]["data_ftime"];
        // $atime = date('H:i:s', $time + $kjTime);
        $atime = date('H:i:s', $time);
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

    public function getGameNextNoqishu($type, $module, $time)
    {

        date_default_timezone_set('PRC');

        $type = intval($type);

        $types = $this->getTypes($module);

        if ($type == 20) {
            $today = strtotime(date("Y-m-d"), time());
        }


        // $sql = "select * from {$this->prename}data where type={$type} and actionTime{$today} order by actionTime limit 1";

        $sql = "select dat_expect from {$this->prename}data where dat_type={$type} and dat_open_time<{$today} order by dat_open_time desc limit 1";

        $return = $module->query($sql);


        return $return;
    }

    public function getGameCurrentNo($type, $module, $time)
    {


        $type = intval($type);
        $types = $this->getTypes($module);
//        $kjTime = $types[$type]["data_ftime"];
//        $atime = date('H:i:s', $time + $kjTime);
        $atime = date('H:i:s', $time);

        $sql = "select actionNo, actionTime from {$this->prename}data_time where type={$type} and actionTime<='%s' order by actionTime desc limit 1";

        $return = $module->query($sql, $atime);
        // echo
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


    public function getTypeFtime($type, $module)
    {
        $Ftime = 0;
        if ($type) {
            $Ftime = $module->query("select data_ftime from {$this->prename}type where id = %d ", $type);
            if (!$Ftime) {
                $Ftime = 0;
            } else {
                $Ftime = $Ftime[0]["data_ftime"];
            }
        }
        return intval($Ftime);
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

    private function setTimeNo(&$actionTime, &$time)
    {
        $actionTime = wjStrFilter($actionTime);
        $actionTime = date('Y-m-d ', $time) . $actionTime;
    }

    public function noHdCQSSC(&$actionNo, &$actionTime, $time = null)
    {
        $actionNo = wjStrFilter($actionNo);
        $this->setTimeNo($actionTime, $time);
        if ($actionNo == 0 || $actionNo == 120) {
            $actionNo = date('Ymd-120', $time - 24 * 3600);
            $actionTime = date('Y-m-d 00:00', $time);
        } else {
            $actionNo = date('Ymd-', $time) . substr(1000 + $actionNo, 1);
        }
    }

    public function onHdXjSsc(&$actionNo, &$actionTime, $time = null)
    {
        $this->setTimeNo($actionTime, $time);
        if ($actionNo >= 84) {
            $actionNo = date('Ymd-' . $actionNo, $time - 24 * 3600);
        } else {
            $actionNo = date('Ymd-', $time) . substr(1000 + $actionNo, 1);
        }
    }

    public function noHd(&$actionNo, &$actionTime, $time = null)
    {
        $this->setTimeNo($actionTime, $time);
        $actionNo = date('Ymd-', $time) . substr(100 + $actionNo, 1);
    }

    public function noxHd(&$actionNo, &$actionTime, $time = null)
    {
        $this->setTimeNo($actionTime, $time);
        if ($actionNo > 84) {
            $time -= 24 * 3600;
        }
        $actionNo = date('Ymd-', $time) . substr(100 + $actionNo, 1);
    }

    public function no0Hd(&$actionNo, &$actionTime, $time = null)
    {
        $this->setTimeNo($actionTime, $time);
        $actionNo = date('Ymd-', $time) . substr(1000 + $actionNo, 1);
    }

    public function no6Hd(&$actionNo, &$actionTime, $time = null)
    {
        $this->setTimeNo($actionTime, $time);
        $actionNo = date('yz', $time);
        $actionNo = substr($actionNo, 0, 4) . substr(substr($actionNo, 4) + 1000, 1);
        if ($actionTime >= date('Y-m-d H:i:s', $time)) {
        } else {
            $actionTime = date('Y-m-d 21:40', $time);
        }
    }

    public function no0Hdk3(&$actionNo, &$actionTime, $time = null)
    {
        $this->setTimeNo($actionTime, $time);
        $actionNo = date('md', $time) . substr(100 + $actionNo, 1);
    }

    public function no0Hdf(&$actionNo, &$actionTime, $time = null)
    {
        $this->setTimeNo($actionTime, $time);
        $actionNo = date('Ymd-', $time) . substr(10000 + $actionNo, 1);
    }

    public function pai3(&$actionNo, &$actionTime, $time = null)
    {
        $this->setTimeNo($actionTime, $time);
        $actionNo = date('Yz', $time) - 6;
        $actionNo = substr($actionNo, 0, 4) . substr(substr($actionNo, 4) + 1000, 1);
        if ($actionTime >= date('Y-m-d H:i:s', $time)) {
        } else {
            $actionTime = date('Y-m-d 18:30', $time);
        }
    }

    public function GXklsf(&$actionNo, &$actionTime, $time = null)
    {
        $this->setTimeNo($actionTime, $time);
        $actionNo = date('Yz', $time) . substr(100 + $actionNo, 1) + 100;
        $actionNo = substr($actionNo, 0, 4) . substr(substr($actionNo, 4) + 100000, 1);
    }

    public function BJpk10(&$actionNo, &$actionTime, $time = null)
    {
        $this->setTimeNo($actionTime, $time);
        //echo $actionNo;die;
        $actionNo = 179 * (strtotime(date('Y-m-d', $time)) - strtotime('2007-11-18')) / 3600 / 24 + $actionNo - 1267;
    }

    public function Kuai8(&$actionNo, &$actionTime, $time = null)
    {
        $this->setTimeNo($actionTime, $time);
        strtotime('2004-09-19');
        $actionNo = 179 * (strtotime(date('Y-m-d', $time)) - strtotime('2004-09-19')) / 3600 / 24 + $actionNo - 2584;//20160625
        //$actionNo = 179 * (strtotime(date('Y-m-d', $time)) - strtotime('2004-09-19')) / 3600 / 24 + $actionNo - 77;
    }

    private function calPk10BallStateDay($module, $lotType, $day)
    {
        $shows = array();
        $iOpenCodeCnt = $this->getOpenCodeCntByLotType($lotType);
        $iAllCodesCnt = $this->getAllCodesCntByLotType($lotType);
        $bFirstZero = $this->isStartFromZero($lotType);
        for ($i = 0; $i < $iOpenCodeCnt; $i++) {
            for ($j = 0; $j < 4; $j++) {
                $shows[$i][$j] = 0;
            }
        }
        $openedCaiList = $this->getLottoryByDate($module, $lotType, $day);

        foreach ($openedCaiList as $openedCai) {
            $OpenCodes = ZstAnalyser::getCodeArr($openedCai['dat_codes']);
            //  print_r($iOpenCodeCnt); print_r(count($OpenCodes) );exit;
            if (count($OpenCodes) != $iOpenCodeCnt) {
                continue;
            }

            for ($i = 0; $i < $iOpenCodeCnt; $i++) {
                if ($OpenCodes[$i] > $iAllCodesCnt / 2) {
                    $shows[$i][0]++;
                } else {
                    $shows[$i][1]++;
                }
                if ($OpenCodes[$i] % 2 != 0) {
                    $shows[$i][2]++;
                } else {
                    $shows[$i][3]++;
                }
            }
        }
        return $shows;
    }


    public function getIssueInfo($lottery_id, $time = 0)
    {
        //dump($lottery_id);
        switch ($lottery_id) {
            case "cqssc":
                $issue = $this->getSscOpentimes($time);
                break;
            case "cqft":
                $issue = $this->getSscOpentimes($time);
                break;
            case "pk10":
                $issueStart = 674080 + intval((time() - 32820 - strtotime('2018-04-01 00:00:00')) / 86400) * 179;
                $issue = $this->getCombOpentimes_v2(32520, 179, 300, $time, $issueStart);
                break;
            case "xyft":
                $issue = $this->getCombOpentimes_v2(46500 + 540, 180, 300, $time);
                break;
            case "jsk3":
                $issue = $this->getCombOpentimes_v2(30540, 82, 600, time());
                break;
            case "txffc":
                $issue = $this->getCombOpentimes_v2(0, 1440, 60, time());
                break;
            case "sfpk10":
                $issue = $this->getSfpkSscOpentimes($time);
                break;
            case "sfssc":
                $issue = $this->getSfSscOpentimes($time);
                break;
            case "tcssc":
                $issue = $this->getJsSscOpentimes($time);
                break;
            case "tcpk10":
                $issue = $this->getJspkSscOpentimes($time);
                break;
            case "pc28":
                $issueStart = 2354785 + intval((time() - 0 - strtotime('2018-11-14 00:00:00')) / 86400) * 397;
                $issue = $this->getCombOpentimes_v2(0, 397, 210, $time, $issueStart);
                break;
            case "gd11x5":
                $issue = $this->getCombOpentimes_v2(32430, 84, 600, time());
                break;
            /*
             case LotteryMain::pc28_bjpc28:
             case LotteryMain::kl8_bjkl8:
                 $issueStart = 880058 + intval((time() - 32700 - strtotime('2018-04-01 00:00:00')) / 86400) * 179;
                 $issue = $this->getCombOpentimes_v2(32400, 179, 300, time(), $issueStart);
                 break;
             case LotteryMain::pc28_jndpc28:
             case LotteryMain::kl8_jndkl8:
                 $where = Array();
                 $where['lottery_id'] = LotteryMain::kl8_jndkl8;
                 $issueStartObj = OpencodeIssue::inst()->where($where)->first();
                 $issueStart = $issueStartObj['issue'];
                 $issue = $this->getCombOpentimes_v2(75660, 378, 210, time(), $issueStart);
                 break;

             case LotteryMain::kl10_gdkl10:
                 $issue = $this->getCombOpentimes_v2(33000, 84, 600, time());
                 break;
             case LotteryMain::xync_cqxync:
                 $issue = $this->getCombOpentimes_v2(46800 + 540, 180, 300, time());
                 break;
             case LotteryMain::lhc_xglhc:
                 $stopIssueCount = 6; // 停开期数
                 $time = time();
                 $issue = $this->getLhcOpentimes($time, $stopIssueCount);
                 break;
             case LotteryMain::ssc_75ssc:
             case LotteryMain::pk10_75pk10:
             case LotteryMain::pc28_75pc28:
             case LotteryMain::kl8_75kl8:
             case LotteryMain::k3_75k3:
             case LotteryMain::_3d_75_3d:
             case LotteryMain::kl10_75kl10:
             case LotteryMain::_11x5_75_11x5:
             case LotteryMain::lhc_75lhc:
                 $issue = $this->getCombOpentimes_v2(28800, 960, 75, $time);
                 break;
             case LotteryMain::ssc_60ssc:
             case LotteryMain::pk10_60pk10:
             case LotteryMain::pc28_60pc28:
             case LotteryMain::kl8_60kl8:
             case LotteryMain::k3_60k3:
             case LotteryMain::_3d_603d:
             case LotteryMain::kl10_60kl10:
             case LotteryMain::lhc_60lhc:
             case LotteryMain::_11x5_60_11x5:
                 $issue = $this->getCombOpentimes_v2(21600, 1400, 60, $time);
                 break;
             case LotteryMain::ssc_tjssc:
             case LotteryMain::ssc_xjssc:
             case LotteryMain::ssc_txffc:
             case LotteryMain::ssc_hg90s:
             case LotteryMain::_3d_fc3d:
             case LotteryMain::_3d_shssl:*/
            default:
                $issue = null;
                break;
        }
        return $issue;
    }

    /**
     * 获得六合彩的开奖时间
     * @param int $time
     * @param $stopIssueCount
     */
    private function getLhcOpentimes($time = 0, $stopIssueCount)
    {
        $yearStart = strtotime('2018-01-01 21:30:00');
        $opentimes = Array();
        $preIssue = Array();

        for ($i = 0; $i < 365; $i++) {
            $timespan = $yearStart + ($i * 86400);
            switch (date('w', $timespan)) {
                case 2:
                case 4:
                case 6:
                    $issueNo = sizeof($opentimes) + 1 - $stopIssueCount;
                    $opentimes[$issueNo] = Array(
                        'issue_no' => $issueNo,
                        'issue' => date('Y-') . sprintf("%03d", (sizeof($opentimes) + 1) - $stopIssueCount),
                        'timespan' => $timespan,
                        'opentime' => date('Y-m-d H:i:s', $timespan),
                    );
                    if ($time > $timespan) {
                        $preIssue = $opentimes[$issueNo];
                    }
                    break;
            }
        }

        $issue = $opentimes[$preIssue['issue_no'] + 1];
        $issue['preIssue'] = $preIssue;
        $issue['timeremain'] = $issue['timespan'] - $time;
        $issue['status'] = 1;
        return $issue;
    }

    /**
     * 获得时时彩的开奖时间
     * @param int $time
     */
    private function getSscOpentimes($time = 0)
    {
        $tsStart = 300;
        $issueCount = 120;
        $ts = 600;

        // 默认当前时间
        if (empty($time)) {
            $time = time();
        }
        /*
         * 期号日期
         *  假定每天的第一期开奖时间为00:00:00，那么当时间为time()时100%是当前的期号日期
         *  如果开奖时间不是00:00:00，那么time()的当前期号日期，可能自动跳为第二天
         *  所以，time()减去tsStart【第一期开奖时间】，则期号日期100%是当天的
         */
        $rootTimespan = strtotime(date('Y-m-d', ($time - $tsStart)));
        $opentimes = Array();
        $subIssueLength = strlen($issueCount);
        $preIssue = Array();
        for ($issue_no = 1; $issue_no <= $issueCount; $issue_no++) {

            if ($issue_no < 24) {
                $timespan = $rootTimespan + ($issue_no) * 300;
            } elseif ($issue_no == 24) {
                $timespan = $rootTimespan + 36000;
            } elseif ($issue_no < 97) {
                $timespan = $rootTimespan + (36000) + ($issue_no - 24) * 600;
            } else {
                $timespan = $rootTimespan + (79500) + ($issue_no - 97) * 300;
            }

            // 开奖时间
            $opentime = Array();
            $opentime['timespan'] = $timespan;
            $opentime['issue_no'] = $issue_no;
            $opentime['opentime'] = date('Y-m-d H:i:s', $timespan);
            if (empty($issueStart)) {
                $opentime['issue'] = date('Ymd-', $rootTimespan) . sprintf("%0{$subIssueLength}d", $issue_no);
            } else {
                $opentime['issue'] = $issueStart + $issue_no;
            }
            $opentimes[$issue_no] = $opentime;

            if ($time > $timespan) {
                $preIssue = $opentime;
            }
        }
        $opentime = Array();
        $timespan = $rootTimespan + 86400 + $tsStart;
        $opentime['timespan'] = $timespan;
        $opentime['issue_no'] = 1;
        $opentime['opentime'] = date('Y-m-d H:i:s', $timespan);
        if (empty($issueStart)) {
            $opentime['issue'] = date('Ymd-', $rootTimespan + 86400) . sprintf("%0{$subIssueLength}d", 1);
        } else {
            $opentime['issue'] = $issueStart + $issueCount + 1;
        }
        $opentimes[$issueCount + 1] = $opentime;

        $issue = $opentimes[$preIssue['issue_no'] + 1];
        $issue['timeremain'] = $issue['timespan'] - $time;
        $issue['preIssue'] = $preIssue;
        if ($time < ($opentimes[24]['timespan'] - $ts) && $time > $opentimes[23]['timespan']) {
            $issue['status'] = 0;
        } else {
            $issue['status'] = 1;
        }
        $issue['issue_total'] = $issueCount;

        return $issue;
    }


    //js

    /**
     * 获得sf时时彩的开奖时间
     * @param int $time
     */
    private function getSfSscOpentimes($time = 0)
    {
        $tsStart = 300;
        $issueCount = 439;
        $ts = 180;

        // 默认当前时间
        if (empty($time)) {
            $time = time();
        }
        /*
         * 期号日期
         *  假定每天的第一期开奖时间为00:00:00，那么当时间为time()时100%是当前的期号日期
         *  如果开奖时间不是00:00:00，那么time()的当前期号日期，可能自动跳为第二天
         *  所以，time()减去tsStart【第一期开奖时间】，则期号日期100%是当天的
         */
        $rootTimespan = strtotime(date('Y-m-d', ($time - 180)));
        $opentimes = Array();
        $subIssueLength = strlen($issueCount);
        $preIssue = Array();
        for ($issue_no = 1; $issue_no <= $issueCount; $issue_no++) {

            if ($issue_no < 81) {
                $timespan = $rootTimespan + ($issue_no) * $ts;
            } elseif ($issue_no == 81) {
                $timespan = $rootTimespan + 3600 * 6 + 195;
            } else {
                $timespan = $rootTimespan + 3600 * 6 + 195 + ($issue_no - 81) * 180;
            }
            // 开奖时间
            $opentime = Array();
            $opentime['timespan'] = $timespan;
            $opentime['issue_no'] = $issue_no;
            $opentime['opentime'] = date('Y-m-d H:i:s', $timespan);
            if (empty($issueStart)) {
                $opentime['issue'] = date('Ymd-', $rootTimespan) . sprintf("%0{$subIssueLength}d", $issue_no);
            } else {
                $opentime['issue'] = $issueStart + $issue_no;
            }
            $opentimes[$issue_no] = $opentime;

            if ($time > $timespan) {
                $preIssue = $opentime;
            }
            // echo date('Y-m-d H:i:s', $timespan).":".$issue_no."\n";
        }
        $opentime = Array();
        $timespan = $rootTimespan + 86400 + 180;
        $opentime['timespan'] = $timespan;
        $opentime['issue_no'] = 1;
        $opentime['opentime'] = date('Y-m-d H:i:s', $timespan);
        if (empty($issueStart)) {
            $opentime['issue'] = date('Ymd-', $rootTimespan + 86400) . sprintf("%0{$subIssueLength}d", 1);
        } else {
            $opentime['issue'] = $issueStart + $issueCount + 1;
        }
        $opentimes[$issueCount + 1] = $opentime;

        $issue = $opentimes[$preIssue['issue_no'] + 1];
        $issue['timeremain'] = $issue['timespan'] - $time;
        $issue['preIssue'] = $preIssue;
        $issue['issue_total'] = $issueCount;

        return $issue;
    }


    /**
     * 获得sf赛车的开奖时间
     * @param int $time
     */
    private function getSfpkSscOpentimes($time = 0)
    {
        $tsStart = 300;
        $issueCount = 439;
        $ts = 180;

        // 默认当前时间
        if (empty($time)) {
            $time = time();
        }
        /*
         * 期号日期
         *  假定每天的第一期开奖时间为00:00:00，那么当时间为time()时100%是当前的期号日期
         *  如果开奖时间不是00:00:00，那么time()的当前期号日期，可能自动跳为第二天
         *  所以，time()减去tsStart【第一期开奖时间】，则期号日期100%是当天的
         */
        $rootTimespan = strtotime(date('Y-m-d', ($time - 180)));
        $opentimes = Array();
        $subIssueLength = strlen($issueCount);
        $preIssue = Array();
        for ($issue_no = 1; $issue_no <= $issueCount; $issue_no++) {

            if ($issue_no < 81) {
                $timespan = $rootTimespan + ($issue_no) * $ts;
            } elseif ($issue_no == 81) {
                $timespan = $rootTimespan + 3600 * 6 + 180;
            } else {
                $timespan = $rootTimespan + 3600 * 6 + 180 + ($issue_no - 81) * 180;
            }
            // 开奖时间
            $opentime = Array();
            $opentime['timespan'] = $timespan;
            $opentime['issue_no'] = $issue_no;
            $opentime['opentime'] = date('Y-m-d H:i:s', $timespan);
            if (empty($issueStart)) {
                $opentime['issue'] = date('Ymd-', $rootTimespan) . sprintf("%0{$subIssueLength}d", $issue_no);
            } else {
                $opentime['issue'] = $issueStart + $issue_no;
            }
            $opentimes[$issue_no] = $opentime;

            if ($time > $timespan) {
                $preIssue = $opentime;
            }
            //    echo date('Y-m-d H:i:s', $timespan).":".$issue_no."\n";
        }
        $opentime = Array();
        $timespan = $rootTimespan + 86400 + 180;
        $opentime['timespan'] = $timespan;
        $opentime['issue_no'] = 1;
        $opentime['opentime'] = date('Y-m-d H:i:s', $timespan);
        if (empty($issueStart)) {
            $opentime['issue'] = date('Ymd-', $rootTimespan + 86400) . sprintf("%0{$subIssueLength}d", 1);
        } else {
            $opentime['issue'] = $issueStart + $issueCount + 1;
        }
        $opentimes[$issueCount + 1] = $opentime;

        $issue = $opentimes[$preIssue['issue_no'] + 1];
        $issue['timeremain'] = $issue['timespan'] - $time;
        $issue['preIssue'] = $preIssue;
        if ($time < ($opentimes[80]['timespan'] - $ts) && $time > $opentimes[79]['timespan']) {
            $issue['status'] = 0;
        } else {
            $issue['status'] = 1;
        }
        $issue['issue_total'] = $issueCount;

        return $issue;
    }


    /**
     * 获得js时时彩的开奖时间
     * @param int $time
     */
    private function getJsSscOpentimes($time = 0)
    {
        $tsStart = 300;
        $issueCount = 1054;
        $ts = 75;

        // 默认当前时间
        if (empty($time)) {
            $time = time();
        }
        /*
         * 期号日期
         *  假定每天的第一期开奖时间为00:00:00，那么当时间为time()时100%是当前的期号日期
         *  如果开奖时间不是00:00:00，那么time()的当前期号日期，可能自动跳为第二天
         *  所以，time()减去tsStart【第一期开奖时间】，则期号日期100%是当天的
         */
        $rootTimespan = strtotime(date('Y-m-d', ($time - 75)));
        $opentimes = Array();
        $subIssueLength = strlen($issueCount);
        $preIssue = Array();
        for ($issue_no = 1; $issue_no <= $issueCount; $issue_no++) {

            if ($issue_no < 193) {
                $timespan = $rootTimespan + ($issue_no) * $ts;
            } elseif ($issue_no == 193) {
                $timespan = $rootTimespan + 3600 * 6 + 165;
            } else {
                $timespan = $rootTimespan + 3600 * 6 + 165 + ($issue_no - 193) * 75;
            }
            // 开奖时间
            $opentime = Array();
            $opentime['timespan'] = $timespan;
            $opentime['issue_no'] = $issue_no;
            $opentime['opentime'] = date('Y-m-d H:i:s', $timespan);
            if (empty($issueStart)) {
                $opentime['issue'] = date('Ymd-', $rootTimespan) . sprintf("%0{$subIssueLength}d", $issue_no);
            } else {
                $opentime['issue'] = $issueStart + $issue_no;
            }
            $opentimes[$issue_no] = $opentime;

            // echo date('Y-m-d H:i:s', $timespan).":".$issue_no."\n";

            if ($time > $timespan) {
                $preIssue = $opentime;
            }
        }
        $opentime = Array();
        $timespan = $rootTimespan + 86400 + 75;
        $opentime['timespan'] = $timespan;
        $opentime['issue_no'] = 1;
        $opentime['opentime'] = date('Y-m-d H:i:s', $timespan);
        if (empty($issueStart)) {
            $opentime['issue'] = date('Ymd-', $rootTimespan + 86400) . sprintf("%0{$subIssueLength}d", 1);
        } else {
            $opentime['issue'] = $issueStart + $issueCount + 1;
        }
        $opentimes[$issueCount + 1] = $opentime;

        $issue = $opentimes[$preIssue['issue_no'] + 1];
        $issue['timeremain'] = $issue['timespan'] - $time;
        $issue['preIssue'] = $preIssue;
        $issue['issue_total'] = $issueCount;
        //print_r($issue);

        return $issue;
    }


    /**
     * 获得js赛车的开奖时间
     * @param int $time
     */
    private function getJspkSscOpentimes($time = 0)
    {
        $tsStart = 300;
        $issueCount = 1054;
        $ts = 75;

        // 默认当前时间
        if (empty($time)) {
            $time = time();
        }
        /*
         * 期号日期
         *  假定每天的第一期开奖时间为00:00:00，那么当时间为time()时100%是当前的期号日期
         *  如果开奖时间不是00:00:00，那么time()的当前期号日期，可能自动跳为第二天
         *  所以，time()减去tsStart【第一期开奖时间】，则期号日期100%是当天的
         */
        $rootTimespan = strtotime(date('Y-m-d', ($time - 75)));
        $opentimes = Array();
        $subIssueLength = strlen($issueCount);
        $preIssue = Array();
        for ($issue_no = 1; $issue_no <= $issueCount; $issue_no++) {

            if ($issue_no < 193) {
                $timespan = $rootTimespan + ($issue_no) * $ts;
            } elseif ($issue_no == 193) {
                $timespan = $rootTimespan + 3600 * 6 + 150;
            } else {
                $timespan = $rootTimespan + 3600 * 6 + 150 + ($issue_no - 193) * 75;
            }
            // 开奖时间
            $opentime = Array();
            $opentime['timespan'] = $timespan;
            $opentime['issue_no'] = $issue_no;
            $opentime['opentime'] = date('Y-m-d H:i:s', $timespan);
            if (empty($issueStart)) {
                $opentime['issue'] = date('Ymd-', $rootTimespan) . sprintf("%0{$subIssueLength}d", $issue_no);
            } else {
                $opentime['issue'] = $issueStart + $issue_no;
            }
            $opentimes[$issue_no] = $opentime;

            //      echo date('Y-m-d H:i:s', $timespan).":".$issue_no."\n";

            if ($time > $timespan) {
                $preIssue = $opentime;
            }
        }

        $opentime = Array();
        $timespan = $rootTimespan + 86400 + 75;
        $opentime['timespan'] = $timespan;
        $opentime['issue_no'] = 1;
        $opentime['opentime'] = date('Y-m-d H:i:s', $timespan);
        if (empty($issueStart)) {
            $opentime['issue'] = date('Ymd-', $rootTimespan + 86400) . sprintf("%0{$subIssueLength}d", 1);
        } else {
            $opentime['issue'] = $issueStart + $issueCount + 1;
        }
        $opentimes[$issueCount + 1] = $opentime;

        $issue = $opentimes[$preIssue['issue_no'] + 1];
        $issue['timeremain'] = $issue['timespan'] - $time;
        $issue['preIssue'] = $preIssue;
        $issue['issue_total'] = $issueCount;
        return $issue;
    }


    private function getCombOpentimes_v2($tsDayStart, $issueCount, $ts, $time = 0, $issueStart = null)
    {
//        $time ?: time();
        if ($time == 0) {// 默认当前时间
            $time = time();
        }
        /*
         * 今天的起始时间戳
         * 针对夸天的彩种，需要将当期时间减去今天的开始时间
         */
        $tsDay = strtotime(date('Y-m-d 00:00:00', $time - $tsDayStart)); // 今天的起始时间戳

        if (empty($issueStart)) {
            $subIssueLength = strlen($issueCount); // 期号长度
        }

        $opentimes = Array();
        $preIssueNo = 0;

        for ($issue_no = 1; $issue_no <= $issueCount; $issue_no++) {

            $timespan = $tsDayStart + $tsDay + $issue_no * $ts;
            $opentime = Array();
            $opentime['timespan'] = $timespan;
            $opentime['issue_no'] = $issue_no;
            $opentime['opentime'] = date('Y-m-d H:i:s', $timespan);
            if (empty($issueStart)) {
                $opentime['issue'] = date('Ymd-', $tsDay) . sprintf("%0{$subIssueLength}d", $issue_no);
            } else {
                $opentime['issue'] = $issueStart + $issue_no;
            }
            $opentimes[$issue_no] = $opentime;

            /*
             * 如果当期开奖时间大于等于开奖时间，则当期时间所在的期号便是上一期
             */
            if ($time >= $timespan) {
                $preIssueNo = $issue_no;
            }
        }

        // 前一天的最后一期
        $opentime = Array();
        $timespan = $opentimes[$issueCount]['timespan'] - 86400;
        $opentime['timespan'] = $timespan;
        $opentime['issue_no'] = $issueCount;
        $opentime['opentime'] = date('Y-m-d H:i:s', $timespan);
        if (empty($issueStart)) {
            $opentime['issue'] = date('Ymd-', $tsDay - 86400) . sprintf("%0{$subIssueLength}d", $issueCount);
        } else {
            $opentime['issue'] = $issueStart - $issueCount;
        }
        $opentimes[0] = $opentime;

        /*
         * 第二天的第一期
         */
        $opentime = Array();
        $timespan = $opentimes[1]['timespan'] + 86400; // 开奖时间=当天的第一期+一天的时间戳
        $opentime['timespan'] = $timespan;
        $opentime['issue_no'] = 1;
        $opentime['opentime'] = date('Y-m-d H:i:s', $timespan);
        if (empty($issueStart)) {
            $opentime['issue'] = date('Ymd-', $tsDay + 86400) . sprintf("%0{$subIssueLength}d", 1);
        } else {
            $opentime['issue'] = $issueStart + $issueCount + 1;
        }
        $opentimes[$issueCount + 1] = $opentime;


        $issue = $opentimes[$preIssueNo + 1];
        $issue['preIssue'] = $opentimes[$preIssueNo];
        $issue['timeremain'] = $issue['timespan'] - $time;
        if ($time < ($opentimes[$issueCount + 1]['timespan']) && $time > $opentimes[$issueCount]['timespan']) {
            $issue['status'] = 0;
        } else {
            $issue['status'] = 1;
        }
        $issue['issue_total'] = $issueCount;

        return $issue;
    }

}