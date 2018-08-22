<?php
/**
 * Created by PhpStorm.
 * User: mxboke(mxboke@gmail.com)
 * Date: 2017/12/7
 * Time: 16:08
 */

namespace Fuzhi\Controller;

use Think\Controller;
class Thcommission extends Controller
{
    private $type        = 'ab';
    private $arrOddsComm = [];
    const AB_END_INDEX  = 121;
    const AB_HALF_INDEX = 61;
    //const AB_MIN_ODDS   = 2.0;
    const AB_ODDS_MIN   = 1940;
    const AB_ODDS_MAX   = 1980;

    const COM_END_INDEX = 90;
    const COM_MAX_COMM  = 9;
    const COM_ODDS_MIN  = 1800;
    const COM_ODDS_MAX  = 1900;

    private $maxComm = 2.6;
    private $minComm = 2.0;

    /**
     * @var Thcommission
     */
    private static $instance;

    /**
     * @return Thcommission
     */
    public static function getInstance()
    {
        if (self::$instance == null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * @return string
     */
    public function getType(): string
    {
        return $this->type;
    }

    /**
     * @param string $type
     * @return Thcommission
     */
    public function setType(string $type): Thcommission
    {
        $this->type = $type;
        return $this;
    }

    public function setMaxComm($comm)
    {
        $this->maxComm = $comm;
        if ($comm >= 0.006) {
            $this->minComm = $comm * 100 - 0.6;
        }
        return $this;
    }

    public function setMinComm($comm)
    {
        $this->minComm = $comm;
        return $this;
    }

    public function genArrOddsComm()
    {
        if ($this->type == 'ab') {
            for ($i = 0; $i <= self::AB_END_INDEX; $i++) {
                $odds                    = $i < self::AB_HALF_INDEX ? self::AB_ODDS_MIN : self::AB_ODDS_MAX;
                $comm                  = $i < self::AB_HALF_INDEX ? 0.01 * $i : $this->minComm + 0.01 * ($i - self::AB_HALF_INDEX);
                $this->arrOddsComm[ $i ] = ['odds' => $odds, 'comm' => $comm];
            }
        } else {
            $ucomm = self::COM_MAX_COMM / self::COM_END_INDEX;
            $uodds = (self::COM_ODDS_MAX - self::COM_ODDS_MIN) / self::COM_END_INDEX;
            for ($i = 0; $i <= self::COM_END_INDEX; $i++) {
                $this->arrOddsComm[ $i ] = ['odds' => self::COM_ODDS_MIN + $uodds * $i, 'comm' => number_format($ucomm * $i, 1, '.', '')];
            }
        }
        return $this->arrOddsComm;
    }

    public function getArrOddsComm($index)
    {
        //empty($this->arrOddsComm) &&
        $this->genArrOddsComm();
        if ($this->type == 'ab') {
            $index = $index < 1 ? self::AB_END_INDEX : min(self::AB_END_INDEX, $index);
            $t     = array_slice($this->arrOddsComm, self::AB_HALF_INDEX, $index - self::AB_HALF_INDEX + 1, true);
        } else {
            $index = $index < 1 ? self::COM_END_INDEX : min(self::COM_END_INDEX, $index);
            $t     = array_slice($this->arrOddsComm, 0, $index, true);
        }

        krsort($t);
        return $t;
    }

    public function getRowOddsComm($key, $default = '', $returns = 'arr')
    {
        $this->minComm = 2.0;
        //empty($this->arrOddsComm) &&
        $this->genArrOddsComm();
        if (!empty($this->arrOddsComm[ $key ])) {
            $t = $this->arrOddsComm[ $key ];
            if ($returns == 'arr') {
                return $t;
            } else {
                return $t['comm'] . '% -- ' . $t['odds'];
            }
        } else {
            return $default;
        }
    }

    public function getOdds($curIndex, $minOdds, $maxOdds)
    {
        if ($this->type == 'ab') {
            $t = $curIndex < self::AB_HALF_INDEX ? $minOdds : $maxOdds;
        } else {
            $t = $minOdds + ($maxOdds - $minOdds) / self::COM_END_INDEX * $curIndex;
        }
       // print_r($t);
        return $t;
    }

    public function getCommission($userIndex, $curIndex)
    {
        //empty($this->arrOddsComm) &&
        $this->genArrOddsComm();
        $index = $userIndex - $curIndex;
        $t     = !empty($this->arrOddsComm[ $index ]) ? $this->arrOddsComm[ $index ]['comm'] : false;
        return $t;
    }
}
/*
$obj = Thcommission::getInstance()->setType('ab')->genArrOddsComm();
//var_export($obj);
$obj = Thcommission::getInstance()->setType('ab')->getCommission(121, 0);
echo "121,121:", $obj, "\n";
$obj = Thcommission::getInstance()->setType('ab')->getCommission(121, 61);
echo "121,61:", $obj, "\n";
//die;
for($i=0; $i<122; $i ++){
    $cur = 121;
    $obj = Thcommission::getInstance()->setType('ab')->getCommission($cur, $i);
    echo "$cur - $i:", $obj, "\n";
}
//*/