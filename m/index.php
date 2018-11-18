<?php 
include(dirname(__FILE__)."\conn.php");

?>
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
	<meta name="viewport" content="initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0"/>
    
    <meta name="HandheldFriendly" content="true" />
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">

    <meta name="format-detection"content="telephone=no"/>
 <title><?=$web_type?>开奖直播_<?=$web_type?>历史记录_手机版开奖视频现场直播_<?=$webtitle?>手机版</title>

<script src="style/js/jquery.js"></script>
<script src="style/js/jquery.cookie.js"></script>
<link type="text/css" href="style/css/style.css?v=20181118" rel="stylesheet">
<style>
.add-home {
	position:fixed;
	bottom:10px;
	left:0;
	right:0;
	z-index:10; 
}
.add-home-content {
	border:solid 1px #000;
	border-radius:6px;
	height:70px;
	padding-left:70px;
	padding-top:5px;
	background:rgba(255, 255, 255, .9);
	max-width:150px;
	position:relative;
	margin:0 auto
}
.add-home img {
	height:50px;
	position:absolute;
	top:50%;
	margin-top:-25px;
	left:10px
}
.add-home p {
	margin:5px 0 0;  overflow:hidden
}
.add-home em {
	position:absolute;
	bottom:-20px;
	left:50%;
	margin-left:-10px;
	width:0;
	height:0;
	border:10px solid #000;
	border-color:#000 transparent transparent;
	z-index:5
}
.add-home em:before {
	content:"";
	position:absolute;
	bottom:-8px;
	right:-9px;
	width:0;
	height:0;
	border:9px solid rgba(255, 254, 241, .9);
	border-color:#fffef1 transparent transparent;
	z-index:3
}
.add-home .ion-ios-upload-outline {
	
	color:#007aff;
	background:url(/style/images/i.png) no-repeat;
	width:30px; height:30px; display:block; background-size: 70%; float:left
}
.add-home .ion-close-round {
	position:absolute;
	top:0;
	right:0;
	display:block;
	width:25px;
	height:25px;
	line-height:25px;
	text-align:center;
	color:rgba(0, 0, 0, .7);font-style:normal;
	cursor:pointer

}

 .num1 {
    background: url(/../images/images/bjpknum.png) no-repeat -424px 0
}
 .num2 {
    background: url(/../images/images/bjpknum.png) no-repeat -424px -43px
}

.num3 {
    background: url(/../images/images/bjpknum.png) no-repeat -424px -86px
}

 .num4 {
    background: url(/../images/images/bjpknum.png) no-repeat -424px -129px
}

.num5 {
    background: url(/../images/images/bjpknum.png) no-repeat -424px -172px
}

 .num6 {
    background: url(/../images/images/bjpknum.png) no-repeat -424px -215px
}

</style>
<script type="text/javascript">
$(function () {
$(".add-home").hide();
if(!$.cookie('home_cookiea')){
$(".add-home").show();
}
});　

function closeAddHome() 
{
$(".add-home").hide();
$.cookie('home_cookiea', '1', { expires: 7 });
}
</script>
</head>
<body>

<header class="header">
<!--	<a onClick="javascript:return_prepage();" class="back">上一页</a>-->
	<a href="./" class="logo" style="float: left;margin-left: 1vw"><img src="style/images/logo.png"></a>
	<a href="#" class="menu menu1">菜单</a>
    <div class="xia-yxx-list" id="xia-yxx-list1" style="top:8vw;display: none;">
        <ul class="">



            <li><a href="pk10/" game="pk10" class="">北京PK10</a></li>
            <li><a href="sfpk10/" game="jssc">TC三分赛车</a></li>
            <li><a href="tcpk10/" game="tcpk10">TC极速赛车</a></li>
            <li><a href="xyft/" game="xyft">幸运飞艇</a></li>
            <li><a href="cqssc/" game="cqssc">重庆时时彩</a></li>
            <li><a href="tcssc/" game="tcssc">TC分分彩</a></li>
            <li><a href="sfssc/" game="jsssc">TC三分彩</a></li>
            <li><a game="bjft" href="bjft/">北京番摊</a></li>
            <li><a game="cqft" href="cqft">重庆番摊</a></li>
            <li><a href="jsk3/" game="jsk3">江苏快3</a></li>
            <li><a href="gd11x5/" game="gd11x5">广东11选5</a></li>
        <!--    <li><a href="gdkl10/" game="gdkl10">广东快乐十分</a></li>-->
            <!--<li><a href="pc28/" game="pc28">加拿大28</a></li>-->
            <li><a href="txffc/" game="txffc" class="cur">腾讯分分彩</a></li>



        </ul>
    </div>
</header>


   
<div class="h50">

</div>
<div class="barner">
    <img src="style/images/bjpk10-index.jpg">
</div>

<ul class="kaij-mylist">
	     
    <li class="kaij-mylist-li" id="pk10">
	                <a href="pk10/" class="yx_a">

<!--	                <div class="kaij-mylist-l"><span class="ui-logo ui-logo-pk10"></span></div>-->
	                <div class="kaij-mylist-r">
	                    <div class="kaij-mylist-hd">
                            <div class="yx_name"> 北京PK10</div>
	                        <div class="itm-time">下期开奖：<span id="time" class="itm-time-time">载入中</span></div>
	                        <div class="itm-tit"><span class="itm-qih" id="qihao">载入中</span></div>
	                    </div>
	                    <div class="kaij-mylist-bd">
	                        <div class="itm-result">
	                            <div class="ball-wrap" id="number">
	                            <img src="style/images/loading2.gif" alt="载入中">
	                            </div>
	                        </div>
	                    </div>
	                </div>
                        <div class="bt-jg"> </div>
<!--                        <div class="bt-jg"><span>龙</span><span>虎</span><span>龙</span><span>虎</span><span>龙</span><span style="color: #bbbbbb">|</span> 冠亚和: 18 大 单  </div>-->

<!--<div class="bt-aa">-->
<!--<a href="pk10/">开奖历史</a>-->
<!--    <a href="pk10/smtj.php">两面统计</a>-->
<!--    <a href="pk10/cltj.php">长龙统计</a>-->
<!--    <a href="pk10/shipin.php">开奖视频</a>-->
<!--</div>-->
                    </a>

</li>
    <li class="kaij-mylist-li" id="sfpk10">
        <a href="sfpk10/" class="yx_a">

<!--                     <div class="kaij-mylist-l"><span class="ui-logo ui-logo-xync"></span></div>-->
        <div class="kaij-mylist-r">
            <div class="kaij-mylist-hd">
                <div  class="yx_name">TC三分赛车
                </div>
                <div class="itm-time">下期开奖：<span id="time" class="itm-time-time">载入中</span></div>
                <div class="itm-tit"><span class="itm-qih" id="qihao">载入中</span></div>
            </div>
            <div class="kaij-mylist-bd">
                <div class="itm-result">
                    <div class="ball-wrap" id="number">
                        <img src="style/images/loading2.gif" alt="载入中">
                    </div>
                </div>
            </div>
        </div>
        <div class="bt-jg"> </div>
<!--        <div class="bt-aa">-->
<!--            <a href="jssc/">开奖历史</a>-->
<!--            <a href="jssc/smtj.php">两面统计</a>-->
<!--            <a href="jssc/cltj.php">长龙统计</a>-->
<!--            <a href="jssc/shipin.php">开奖视频</a>-->
<!--        </div>-->

        </a>
    </li>
    <li class="kaij-mylist-li" id="tcpk10">
        <a href="tcpk10/" class="yx_a">

        <!--            <div class="kaij-mylist-l"><span class="ui-logo ui-logo-tcpk10"></span></div>-->
        <div class="kaij-mylist-r">
            <div class="kaij-mylist-hd">
                <div class="yx_name">TC极速赛车
                </div>
                <div class="itm-time">下期开奖：<span id="time" class="itm-time-time">载入中</span></div>
                <div class="itm-tit"><span class="itm-qih" id="qihao">载入中</span></div>
            </div>
            <div class="kaij-mylist-bd">
                <div class="itm-result">
                    <div class="ball-wrap" id="number">
                        <img src="style/images/loading2.gif" alt="载入中">
                    </div>
                </div>
            </div>
        </div>
        <div class="bt-jg">  </div>
<!--        <div class="bt-aa">-->
<!--            <a href="tcpk10/">开奖历史</a>-->
<!--            <a href="tcpk10/smtj.php">两面统计</a>-->
<!--            <a href="tcpk10/cltj.php">长龙统计</a>-->
<!--            <a href="tcpk10/shipin.php">开奖视频</a>-->
<!--        </div>-->
        </a>
    </li>
    <li class="kaij-mylist-li" id="xyft">
        <a href="xyft/" class="yx_a">

        <!--            <div class="kaij-mylist-l"><span class="ui-logo ui-logo-xyft"></span></div>-->
        <div class="kaij-mylist-r">
            <div class="kaij-mylist-hd">
                <div class="yx_name">幸运飞艇
                </div>
                <div class="itm-time">下期开奖：<span id="time" class="itm-time-time">载入中</span></div>
                <div class="itm-tit"><span class="itm-qih" id="qihao">载入中</span></div>
            </div>
            <div class="kaij-mylist-bd">
                <div class="itm-result">
                    <div class="ball-wrap" id="number">
                        <img src="style/images/loading2.gif" alt="载入中">
                    </div>
                </div>
            </div>
        </div>

        <div class="bt-jg">  </div>
<!--        <div class="bt-aa">-->
<!--            <a href="xyft/">开奖历史</a>-->
<!--            <a href="xyft/smtj.php">两面统计</a>-->
<!--            <a href="xyft/cltj.php">长龙统计</a>-->
<!--            <a href="xyft/shipin.php">开奖视频</a>-->
<!--        </div>-->

        </a>
    </li>
    <li class="kaij-mylist-li cq-box" id="cqssc" >
        <a href="cqssc/" class="yx_a">

<!--            <div class="kaij-mylist-l"><span class="ui-logo ui-logo-cqssc"></span></div>-->
            <div class="kaij-mylist-r">
                <div class="kaij-mylist-hd">
                    <div  class="yx_name"> 重庆时时彩
                    </div>
                    <div class="itm-time">下期开奖：<span id="time"  class="itm-time-time">载入中</span></div>
                    <div class="itm-tit"><span class="itm-qih" id="qihao">载入中</span></div>
                </div>
                <div class="kaij-mylist-bd">
                    <div class="itm-result">
                        <div class="ball-wrap fl" id="number">
                            <img src="style/images/loading2.gif" alt="载入中">
                        </div>
                        <div class="bt-jg"> </div>
                    </div>
                </div>
            </div>

<!--        <div class="bt-aa">-->
<!--            <a href="cqssc/">开奖历史</a>-->
<!--            <a href="cqssc/smtj.php">两面统计</a>-->
<!--            <a href="cqssc/cltj.php">长龙统计</a>-->
<!--            <a href="cqssc/shipin.php">开奖视频</a>-->
<!--        </div>-->

        </a>
    </li>
    <li class="kaij-mylist-li cq-box" id="sfssc">
        <a href="sfssc/" class="yx_a">

<!--                       <div class="kaij-mylist-l"><span class="ui-logo ui-logo-xjssc"></span></div>-->
        <div class="kaij-mylist-r">
            <div class="kaij-mylist-hd">
                <div class="yx_name">TC三分彩
                </div>
                <div class="itm-time">下期开奖：<span id="time" class="itm-time-time">载入中</span></div>
                <div class="itm-tit"><span class="itm-qih" id="qihao">载入中</span></div>
            </div>
            <div class="kaij-mylist-bd">
                <div class="itm-result">
                    <div class="ball-wrap fl" id="number">
                        <img src="style/images/loading2.gif" alt="载入中">
                    </div>
                </div>
            </div>
        </div>
        <div class="bt-jg">  </div>
<!--        <div class="bt-aa">-->
<!--            <a href="jsssc/">开奖历史</a>-->
<!--            <a href="jsssc/smtj.php">两面统计</a>-->
<!--            <a href="jsssc/cltj.php">长龙统计</a>-->
<!--            <a href="jsssc/shipin.php">开奖视频</a>-->
<!--        </div>-->

        </a>
    </li>
    <li class="kaij-mylist-li cq-box" id="tcssc">
        <a href="tcssc/" class="yx_a">

        <!--            <div class="kaij-mylist-l"><span class="ui-logo ui-logo-tcssc"></span></div>-->
        <div class="kaij-mylist-r">
            <div class="kaij-mylist-hd">
                <div class="yx_name"> TC分分彩
                </div>
                <div class="itm-time">下期开奖：<span id="time" class="itm-time-time">载入中</span></div>
                <div class="itm-tit"><span class="itm-qih" id="qihao">载入中</span></div>
            </div>
            <div class="kaij-mylist-bd">
                <div class="itm-result">
                    <div class="ball-wrap fl" id="number">
                        <img src="style/images/loading2.gif" alt="载入中">
                    </div>
                </div>
            </div>
        </div>
        <div class="bt-jg">  </div>
<!--        <div class="bt-aa">-->
<!--            <a href="tcssc/">开奖历史</a>-->
<!--            <a href="tcssc/smtj.php">两面统计</a>-->
<!--            <a href="tcssc/cltj.php">长龙统计</a>-->
<!--            <a href="tcssc/shipin.php">开奖视频</a>-->
<!--        </div>-->
        </a>
    </li>
    <li class="kaij-mylist-li" id="bjft">
        <a href="bjft/" class="yx_a">

<!--            <div class="kaij-mylist-l"><span class="ui-logo ui-logo-pk10"></span></div>-->
            <div class="kaij-mylist-r">
                <div class="kaij-mylist-hd">
                    <div class="yx_name"> 北京番摊
                    </div>
                    <div class="itm-time">下期开奖：<span id="time" class="itm-time-time">载入中</span></div>
                    <div class="itm-tit"><span class="itm-qih" id="qihao">载入中</span></div>
                </div>
                <div class="kaij-mylist-bd">
                    <div class="itm-result">
                        <div class="ball-wrap" id="number">
                            <img src="style/images/loading2.gif" alt="载入中">
                        </div>
                    </div>
                </div>
            </div>
            <div class='bjftjg'>
                <div class='q3box'></div>
                <div class='z3box'></div>
                <div class='h3box'><!--后三：<samp class='ball-red-span'></samp><samp class='ball-red-span'></samp><samp class='ball-red-span'></samp><samp class='ball-red-span'></samp>--></div>
            </div>
<!--        <div class="bt-aa">-->
<!--            <a href="bjft/">开奖历史</a>-->
<!--            <a href="bjft/smtj.php">两面统计</a>-->
<!--            <a href="bjft/cltj.php">长龙统计</a>-->
<!--            <a href="bjft/shipin.php">开奖视频</a>-->
<!--        </div>-->

        </a>
    </li>
    <li class="kaij-mylist-li" id="cqft">
        <a href="cqft/" class="yx_a">

        <!--            <div class="kaij-mylist-l"><span class="ui-logo ui-logo-cqssc"></span></div>-->
        <div class="kaij-mylist-r">
            <div class="kaij-mylist-hd">
                <div class="yx_name">重庆番摊
                </div>
                <div class="itm-time">下期开奖：<span id="time" class="itm-time-time">载入中</span></div>
                <div class="itm-tit"><span class="itm-qih" id="qihao">载入中</span></div>
            </div>
            <div class="kaij-mylist-bd">
                <div class="itm-result">
                    <div class="ball-wrap" id="number">
                        <img src="style/images/loading2.gif" alt="载入中">
                    </div>
                </div>
            </div>
        </div>
<!--        <div class="bt-aa">-->
<!--            <a href="pk10/">开奖历史</a>-->
<!--            <a href="pk10/smtj.php">两面统计</a>-->
<!--            <a href="pk10/cltj.php">长龙统计</a>-->
<!--            <a href="pk10/shipin.php">开奖视频</a>-->
<!--        </div>-->

        </a>
    </li>
<!--    <li class="kaij-mylist-li" id="pc28">-->
<!--        <a href="pc28/" class="yx_a">-->
<!---->
<!--        <!--            <div class="kaij-mylist-l"><span class="ui-logo ui-logo-pc28"></span></div>-->
<!--        <div class="kaij-mylist-r">-->
<!--            <div class="kaij-mylist-hd">-->
<!--                <div  class="yx_name"> 加拿大28-->
<!--                </div>-->
<!--                <div class="itm-time">下期开奖：<span id="time" class="itm-time-time">载入中</span></div>-->
<!--                <div class="itm-tit"><span class="itm-qih" id="qihao">载入中</span></div>-->
<!--            </div>-->
<!--            <div class="kaij-mylist-bd">-->
<!--                <div class="itm-result">-->
<!--                    <div class="ball-wrap" id="number">-->
<!--                        <img src="style/images/loading2.gif" alt="载入中">-->
<!--                    </div>-->
<!--                </div>-->
<!--<!--                <div class="bt-aa">-->
<!--<!--                    <a href="pc28/">开奖历史</a>-->
<!--<!--                    <a href="pc28/smtj.php">两面统计</a>-->
<!--<!--                    <a href="pc28/cltj.php">长龙统计</a>-->
<!--<!--                    <a href="pc28/shipin.php">开奖视频</a>-->
<!--<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--        </a>-->
<!--    </li>-->
    <li class="kaij-mylist-li" id="jsk3">
        <a href="jsk3/" class="yx_a">

<!--            <div class="kaij-mylist-l"><span class="ui-logo ui-logo-jsk3"></span></div>-->
            <div class="kaij-mylist-r">
                <div class="kaij-mylist-hd">
                    <div  class="yx_name">江苏快3
                    </div>
                    <div class="itm-time">下期开奖：<span id="time" class="itm-time-time">载入中</span></div>
                    <div class="itm-tit"><span class="itm-qih" id="qihao">载入中</span></div>
                </div>
                <div class="kaij-mylist-bd">
                    <div class="itm-result">
                        <div class="ball-wrap" id="number">
                            <img src="style/images/loading2.gif" alt="载入中">
                        </div>
                    </div>
                </div>
            </div>
            <div class="bt-jg">  </div>

<!--        <div class="bt-aa">-->
<!--            <a href="jsk3/">开奖历史</a>-->
<!--            <a href="jsk3/smtj.php">两面统计</a>-->
<!--            <a href="jsk3/cltj.php">长龙统计</a>-->
<!--            <a href="jsk3/shipin.php">开奖视频</a>-->
<!--        </div>-->

        </a>
    </li>
    <li class="kaij-mylist-li cq-box" id="gd11x5">
        <a href="gd11x5/" class="yx_a">

<!--            <div class="kaij-mylist-l"><span class="ui-logo ui-logo-gd11x5"></span></div>-->
            <div class="kaij-mylist-r">
                <div class="kaij-mylist-hd">
                    <div  class="yx_name"> 广东11选5
                    </div>
                    <div class="itm-time">下期开奖：<span id="time" class="itm-time-time">载入中</span></div>
                    <div class="itm-tit"><span class="itm-qih" id="qihao">载入中</span></div>
                </div>
                <div class="kaij-mylist-bd">
                    <div class="itm-result">
                        <div class="ball-wrap fl" id="number">
                            <img src="style/images/loading2.gif" alt="载入中">
                        </div>
                    </div>
                </div>
            </div>
        <div class="bt-jg">  </div>
<!--        <div class="bt-aa">-->
<!--            <a href="gd11x5/">开奖历史</a>-->
<!--            <a href="gd11x5/smtj.php">两面统计</a>-->
<!--            <a href="gd11x5/cltj.php">长龙统计</a>-->
<!--            <a href="gd11x5/shipin.php">开奖视频</a>-->
<!--        </div>-->

        </a>
    </li>
<!--    <li class="kaij-mylist-li cq-box" id="gdkl10">
        <a href="gdkl10/" class="yx_a">

            <div class="kaij-mylist-r">
                <div class="kaij-mylist-hd">
                    <div class="yx_name">广东快乐十分
                    </div>
                    <div class="itm-time">下期开奖：<span id="time" class="itm-time-time">载入中</span></div>
                    <div class="itm-tit"><span class="itm-qih" id="qihao">载入中</span></div>
                </div>
                <div class="kaij-mylist-bd">
                    <div class="itm-result">
                        <div class="ball-wrap" id="number">
                            <img src="style/images/loading2.gif" alt="载入中">
                        </div>
                    </div>
                </div>
            </div>
        <div class="bt-jg"></div>
        </a>
    </li>
    -->
    <li class="kaij-mylist-li cq-box" id="txffc">
        <a href="txffc/" class="yx_a">

<!--            <div class="kaij-mylist-l"><span class="ui-logo ui-logo-txffc"></span></div>-->
            <div class="kaij-mylist-r">
                <div class="kaij-mylist-hd">
                    <div  class="yx_name">腾讯分分彩
                    </div>
                    <div class="itm-time">下期开奖：<span id="time" class="itm-time-time">载入中</span></div>
                    <div class="itm-tit"><span class="itm-qih" id="qihao">载入中</span></div>
                </div>
                <div class="kaij-mylist-bd">
                    <div class="itm-result">
                        <div class="ball-wrap fl" id="number">
                            <img src="style/images/loading2.gif" alt="载入中">
                        </div>
                    </div>
                </div>
            </div>
        <div class="bt-jg">  </div>
<!--        <div class="bt-aa">-->
<!--            <a href="txffc/">开奖历史</a>-->
<!--            <a href="txffc/smtj.php">两面统计</a>-->
<!--            <a href="txffc/cltj.php">长龙统计</a>-->
<!--            <a href="txffc/shipin.php">开奖视频</a>-->
<!--        </div>-->


        </a>
    </li>






            
</ul>
<!-- 游戏列表切换-->
<script type="text/javascript">
    $(document).ready(function(){
        $(".menu1").click(function(){
            $("#xialabt1").toggleClass("xialabt-on");
            $("#xia-yxx-list1").toggle();
        });
        $("#xia-yx2").click(function(){
            $("#xialabt2").toggleClass("xialabt-on");
            $("#xia-yxx-list2").toggle();
        });

    });
</script>
		
		

<?php include("public/footer.php"); ?>
<script>
 var cqssc_number = -1;
var cqssc_downTimer = null;
var xyft_number = -1;
var xyft_downTimer = null;
var pk10_number = -1;
var pk10_downTimer = null;
var gdkl10_number = -1;
var gdkl10_downTimer = null;
var jssc_number = -1;
var jssc_downTimer = null;
var gd11x5_number = -1;
var gd11x5_downTimer = null;
var jsssc_number = -1;
var jsssc_downTimer = null;
var jsk3_number = -1;
var jsk3_downTimer = null;
 var cqft_number = -1;
 var cqft_downTimer = null;
 var bjft_number = -1;
 var bjft_downTimer = null;
 var pc28_number = -1;
 var pc28_downTimer = null;
 var txffc_number = -1;
 var txffc_downTimer = null;
 var tcssc_number = -1;
 var tcssc_downTimer = null;
 var tcpk10_number = -1;
 var tcpk10_downTimer = null;
 var sfssc_number = -1;
 var sfssc_downTimer = null;
 var sfpk10_number = -1;
 var sfpk10_downTimer = null;
$(function() {
    CheckAward("xyft", "GetXyftAwardTimes", this.xyft_downTimer, xyft_number, "xyft");
    CheckAward("pk10", "GetPk10AwardTimes", this.pk10_downTimer, pk10_number, "pk10");
    CheckAward("cqssc", "GetCqsscAwardTimes", this.cqssc_downTimer, cqssc_number, "cqssc");
    CheckAward("gdkl10", "GetGdkl10AwardTimes", this.gdkl10_downTimer, gdkl10_number, "gdkl10");
    CheckAward("jssc", "GetPk10AwardTimes", this.jssc_downTimer, jssc_number, "jssc");
    CheckAward("gd11x5", "GetGd11x5AwardTimes", this.gd11x5_downTimer, gd11x5_number, "gd11x5");
    CheckAward("jsssc", "GetXjsscAwardTimes", this.jsssc_downTimer, jsssc_number, "jsssc");
    CheckAward("cqft", "GetTjsscAwardTimes", this.cqft_downTimer, pk10_downTimer, "cqft");
    CheckAward("jsk3", "GetJsk3AwardTimes", this.jsk3_downTimer, jsk3_number, "jsk3");
    CheckAward("bjft", "GetTjsscAwardTimes", this.bjft_downTimer, bjft_number, "bjft");
    CheckAward("pc28", "GetTjsscAwardTimes", this.pc28_downTimer, pc28_number, "pc28");
    CheckAward("txffc", "GetTjsscAwardTimes", this.txffc_downTimer, txffc_number, "txffc");
    CheckAward("tcssc", "GetXjsscAwardTimes", this.tcssc_downTimer, tcssc_number, "tcssc");
    CheckAward("sfssc", "GetXjsscAwardTimes", this.sfssc_downTimer, sfssc_number, "sfssc");
    CheckAward("tcpk10", "GetPk10AwardTimes", this.tcpk10_downTimer, tcpk10_number, "tcpk10");
    CheckAward("sfpk10", "GetPk10AwardTimes", this.sfpk10_downTimer, sfpk10_number, "sfpk10");
    IndexOpen();
});

function showTime(page, timeSpan, time, qihao) {
    if (time < 1) {
        if (timeSpan == "pk10") {
            CheckAward("pk10", "GetPk10AwardTimes", this.pk10_downTimer, pk10_number, "pk10", qihao)
        } else if (timeSpan == "xyft") {
            CheckAward("xyft", "GetXyftAwardTimes", this.xyft_downTimer, xyft_number, "xyft", qihao)
        } else if (timeSpan == "shishicai") {
            CheckAward("shishicai", "GetCqsscAwardTimes", this.cqssc_downTimer, cqssc_number, "cqssc", qihao)
        } else if (timeSpan == "gdkl10") {
            CheckAward("gdkl10", "GetGdkl10AwardTimes", this.gdkl10_downTimer, gdkl10_number, "gdkl10", qihao)
        } else if (timeSpan == "jssc") {
            CheckAward("jssc", "GetXyncAwardTimes", this.jssc_downTimer, jssc_number, "jssc", qihao)
        } else if (timeSpan == "gd11x5") {
            CheckAward("gd11x5", "GetGd11x5AwardTimes", this.gd11x5_downTimer, gd11x5_number, "gd11x5", qihao)
        } else if (timeSpan == "jsssc") {
            CheckAward("jsssc", "GetXjsscAwardTimes", this.jsssc_downTimer, jsssc_number, "jsssc", qihao)
        } else if (timeSpan == "cqft") {
            CheckAward("cqft", "GetCqsscAwardTimes", this.cqft_downTimer, cqft_number, "cqft", qihao)
        } else if (timeSpan == "jsk3") {
            CheckAward("jsk3", "GetJsk3AwardTimes", this.jsk3_downTimer, jsk3_number, "jsk3", qihao)
        }else if (timeSpan == "bjft") {
            CheckAward("bjft", "GetPk10AwardTimes", this.bjft_downTimer, bjft_number, "bjft", qihao)
        }else if (timeSpan == "pc28") {
            CheckAward("pc28", "GetPk10AwardTimes", this.pc28_downTimer, pc28_number, "pc28", qihao)
        }else if (timeSpan == "txffc") {
            CheckAward("txffc", "GetPk10AwardTimes", this.txffc_downTimer, txffc_number, "txffc", qihao)
        }else if (timeSpan == "tcssc") {
            CheckAward("tcssc", "GetXjsscAwardTimes", this.tcssc_downTimer, tcssc_number, "tcssc", qihao)
        }else if (timeSpan == "tcpk10") {
            CheckAward("tcpk10", "GetXjsscAwardTimes", this.tcpk10_downTimer, tcpk10_number, "tcpk10", qihao)
        }else if (timeSpan == "sfpk10") {
            CheckAward("sfpk10", "GetXjsscAwardTimes", this.sfpk10_downTimer, sfpk10_number, "sfpk10", qihao)
        }else if (timeSpan == "sfssc") {
            CheckAward("sfssc", "GetXjsscAwardTimes", this.sfssc_downTimer, sfssc_number, "sfssc", qihao)
        }

        IndexOpen();
    } else {
        $("#" + timeSpan + " #time").text(pad(Math.floor(time / 60), 2) + ":" + pad(time % 60, 2))
    }
}
function CheckAward(page, method, downTimer, number, timeSpan) {
    window.clearInterval(downTimer);
    $.post("../"+page+"/getPk10AwardTimes.do", {
        ajaxhandler: method
    },
    function(data,page) {
        if (data.current.periodNumber != number) {

            if(timeSpan == 'pc28'){
                var time = parseInt((data.next.awardTimeInterval * 1000) / 1000);
            }else {
                var time = parseInt(data.next.awardTimeInterval / 1000);
            }
            downTimer = window.setInterval(function() {
                if (time < 1) {

                    window.clearInterval(downTimer);
                }
                showTime(page, timeSpan, time--, data.next.periodNumber)
            },
            1000)

        }
        number = data.current.periodNumber
    },
    'json');

}
 IndexOpen();
function IndexOpen() {
    $.post("ajax/getindex.php", {},
    function(data) {
        $("#pk10 #qihao").text('第' + data.pk10.dat_expect + '期');
        var nums = data.pk10.dat_codes.split(',');
        var str = "";
        console.log(nums)
        for (var i = 0; i < nums.length; i++) {

            str = str + "<i class='no" + nums[i].replace(/\b(0+)/gi,"") + "'>" + nums[i].replace(/\b(0+)/gi,'') + "</i>"
        }
        $("#pk10 .bt-jg").html('');
        var long;
        long = lh(nums);
        $("#pk10 #number").html(str);
        $("#pk10 .bt-jg").html(long);


        $("#xyft #qihao").text('第' + data.xyft.dat_expect.substr(4) + '期');
        var nums = data.xyft.dat_codes.split(',');
        var str = "";
        for (var i = 0; i < nums.length; i++) {
            str = str + "<i class='no" + nums[i].replace(/\b(0+)/gi,"") + "'>" + nums[i].replace(/\b(0+)/gi,"") + "</i>"
        }
        $("#xyft .bt-jg").html('');
        var long;
        long = lh(nums);
        $("#xyft #number").html(str);
        $("#xyft .bt-jg").html(long);


        $("#cqssc #qihao").text('第' + data.cqssc.dat_expect.substr(4) + '期');
        var nums = data.cqssc.dat_codes.split(',');
        var str = "";
        for (var i = 0; i < nums.length; i++) {
            str = str + "<i class='ball-red'>" + nums[i] + "</i>"
        }
        $("#cqssc .bt-jg").html('');
        var long;
        long = ssclh(nums,1);
        $("#cqssc #number").html(str);
        $("#cqssc .bt-jg").html(long);


        $("#txffc #qihao").text('第' + data.txffc.dat_expect.substr(6) + '期');

        var nums = data.txffc.dat_codes.split(',');
        var str = "";
        for (var i = 0; i < nums.length; i++) {
            str = str + "<i class='ball-red'>" + nums[i] + "</i>"
        }
        $("#txffc .bt-jg").html('');
        var long;
        long = ssclh(nums,1);
        $("#txffc #number").html(str);
        $("#txffc .bt-jg").html(long);

        $("#gdkl10 #qihao").text('第' + pad(data.gdkl10.dat_expect, 3) + '期');
        var nums = data.gdkl10.dat_codes.split(',');
        var str = "";
        for (var i = 0; i < nums.length; i++) {
            if (parseInt(nums[i]) > 18) {
                str = str + "<i class='ball-blue'>" + nums[i] + "</i>"
            } else {
                str = str + "<i class='ball-red'>" + nums[i] + "</i>"
            }
        }
        $("#gdkl10 .bt-jg").html('');
        var long;
        long = ssclh(nums,2);
        $("#gdkl10 #number").html(str);
        $("#gdkl10 .bt-jg").html(long);


        $("#jssc #qihao").text('第' + pad(data.jssc.dat_expect, 3) + '期');
        var nums = data.jssc.dat_codes.split(',');
        var str = "";
        for (var i = 0; i < nums.length; i++) {
            str = str + "<i class='no" + nums[i].replace(/\b(0+)/gi,"") + "'>" + nums[i] + "</i>";
        }
        $("#jssc .bt-jg").html('');
        var long;
        long = lh(nums);
        $("#jssc #number").html(str);
        $("#jssc .bt-jg").html(long);




        $("#gd11x5 #qihao").text('第' + pad(data.gd11x5.dat_expect, 3).substr(4) + '期');
        var nums = data.gd11x5.dat_codes.split(',');
        var str = "";
        for (var i = 0; i < nums.length; i++) {
            str = str + "<i class='ball-red'>" + nums[i] + "</i>"
        }
        $("#gd11x5 .bt-jg").html('');
        var long;
        long = ssclh(nums,4);
        $("#gd11x5 #number").html(str);
        $("#gd11x5 .bt-jg").html(long);


        $("#jsssc #qihao").text('第' + pad(data.jsssc.dat_expect, 3) + '期');
        var nums = data.jsssc.dat_codes.split(',');
        var str = "";
        for (var i = 0; i < nums.length; i++) {
            str = str + "<i class='ball-red'>" + nums[i] + "</i>"
        }
        $("#jsssc .bt-jg").html('');
        var long;
        long = ssclh(nums,1);
        $("#jsssc #number").html(str);
        $("#jsssc .bt-jg").html(long);


        $("#jsk3 #qihao").text('第' + data.jsk3.dat_expect.substr(4) + '期');
        var nums = data.jsk3.dat_codes.split(',');
        var str = "";
        for (var i = 0; i < nums.length; i++) {
            str = str + "<i class='num" + nums[i]+ "'></i>"
        }
        var long;
        long = ssclh(nums,3);
        str = str + '<a class="k3zh">'+long+'</a>'

        str+='<div class="yxx">'
        for (var i = 0; i < nums.length; i++) {
            str = str + "<i class='num-yxx" + nums[i]+ "'></i>"
        }
        str = str + '<a class="k3zh">'+yxx(nums[0])+'</a>';
        str = str + '<a class="k3zh">'+yxx(nums[1])+'</a>';
        str = str + '<a class="k3zh">'+yxx(nums[2])+'</a>';
        str+='</div>';
        $("#jsk3 #number").html(str);



        $("#cqft #qihao").text('第' + data.cqssc.dat_expect.substr(4) + '期');
        var nums = data.cqssc.dat_codes.split(',');
        var str = "";
        for (var i = 0; i < nums.length; i++) {
            str = str + "<i class='ball-red'>" + nums[i] + "</i>"
        }
        var tan = Number(nums[0]) + Number(nums[1]) + Number(nums[2]) + Number(nums[3]) + Number(nums[4]);
        var tan_2 = tan%4;
        if(tan_2 == 0){
            tan_2 = 4;
        }
        var dx='';
        if(tan_2%2 ==2){
            dx = '双';
        }else {
            dx = '单';
        }
        var ds='';
        if(tan_2 <=2){
            ds = '小';
        }else {
            ds = '大';
        }
        var tanshu =''
        for(var i =0; i<tan_2;i++){
            tanshu +='<samp class="ball-red-span">'+'</samp>'
        }
        tanshu='番摊结果：'+tanshu
        // str += " 番摊结果：<samp class='ball-red-span'></samp><samp class='ball-red-span'></samp><samp class='ball-red-span'></samp>" +
        //     "<span class='ball-red span-2' >"+ tan_2 +"摊</span>" ;

        str+=tanshu;
        // if(ds == '大'){
        //     str += "<span class='ball-red' >"+ ds +"</span>";
        // }else {
        //     str += "<span class='ball-red' >"+ ds +"</span>"
        // }
        // if(dx == '单'){
        //     str +=  "<span class='ball-red' >"+ dx +"</span>";
        // }else {
        //     str +=  "<span class='ball-red'>"+ dx +"</span>";
        // }

        $("#cqft #number").html(str);

        $("#bjft #qihao").text('第' + data.pk10.dat_expect + '期');
        var nums = data.pk10.dat_codes.split(',');
        var str = "";
        var tan2 = Number(nums[4]) + Number(nums[5]) + Number(nums[6]);
        var tan3 = Number(nums[7]) + Number(nums[8]) + Number(nums[9]);
        var tan = Number(nums[0]) + Number(nums[1]) + Number(nums[2]);
        var tan_2 = tan%4;
        if(tan_2 == 0){
            tan_2 = 4;
        }
        var dx='';
        var css = '';
        if(tan_2%2 ==0){
            dx = '双';
            css='#4185ff';
        }else {
            dx = '单';
            css='#da2d21';
        }
        var ds='';
        if(tan_2 <=2){
            ds = '小';
            css='#4185ff';
        }else {
            ds = '大';
            css='#da2d21';
        }
        var tan_3 = tan2%4;
        if(tan_3 == 0){
            tan_3 = 4;
        }
        var dx2='';
        if(tan_3%2 ==0){
            dx2 = '双';
            css='#4185ff';
        }else {
            dx2 = '单';
            css='#da2d21';
        }
        var ds2='';
        if(tan_3 <=2){
            ds2 = '小';
            css='#4185ff';
        }else {
            ds2 = '大';
            css='#da2d21';
        }
        var tan_4 = tan3%4;
        if(tan_4 == 0){
            tan_4 = 4;
        }
        var dx3='';
        if(tan_4%2 ==0){
            dx3 = '双';
            css='#4185ff';
        }else {
            dx3 = '单';
            css='#da2d21';
        }
        var ds3='';
        if(tan_4 <=2){
            ds3 = '小';
            css='#4185ff';
        }else {
            ds3 = '大';
            css='#da2d21';
        }
        str = str + "<i class='no" + nums[0].replace(/\b(0+)/gi,"") + "'>" + nums[0].replace(/\b(0+)/gi,"") + "</i>" +
            "<i class='no" + nums[1].replace(/\b(0+)/gi,"") + "'>" + nums[1].replace(/\b(0+)/gi,"") + "</i>" +
            "<i class='no" + nums[2].replace(/\b(0+)/gi,"") + "'>" + nums[2].replace(/\b(0+)/gi,"") + "</i>" +

            "<i class='no" + nums[3].replace(/\b(0+)/gi,"") + "'>" + nums[3].replace(/\b(0+)/gi,"") + "</i>" +

            "<i class='no" + nums[4].replace(/\b(0+)/gi,"") + "'>" + nums[4].replace(/\b(0+)/gi,"") + "</i>" +
            "<i class='no" + nums[5].replace(/\b(0+)/gi,"") + "'>" + nums[5].replace(/\b(0+)/gi,"") + "</i>" +
            "<i class='no" + nums[6].replace(/\b(0+)/gi,"") + "'>" + nums[6].replace(/\b(0+)/gi,"") + "</i>" +

            "<i class='no" + nums[7].replace(/\b(0+)/gi,"") + "'>" + nums[7].replace(/\b(0+)/gi,"") + "</i>" +
            "<i class='no" + nums[8].replace(/\b(0+)/gi,"") + "'>" + nums[8].replace(/\b(0+)/gi,"") + "</i>" +
            "<i class='no" + nums[9].replace(/\b(0+)/gi,"") + "'>" + nums[9].replace(/\b(0+)/gi,"") + "</i>" +
        "<br/>";

        //
        // if(ds == "大"){
        //     str +="<span class='ball-red' >"+ ds +"</span>" ;
        // }else {
        //     str +="<span class='ball-red'>"+ ds +"</span>" ;
        // }
        // if(dx == '单'){
        //     str += "<span class='ball-red' >"+ dx +"</span>" ;
        // }else {
        //     str += "<span class='ball-red' >"+ dx +"</span>" ;
        // }


        // str +=  "<i class='ball-red' style='background-color: #fff;width: 1vw'></i>" +
        //           "中三：<span class='ball-red span-2' >"+ tan_3 +"摊</span>" ;
        // if(ds2 == "大"){
        //     str +="<span class='ball-red'>"+ ds2 +"</span>" ;
        // }else {
        //     str +="<span class='ball-red' >"+ ds2 +"</span>" ;
        // }
        // if(dx2 == '单'){
        //     str += "<span class='ball-red' >"+ dx2 +"</span>" ;
        // }else {
        //     str += "<span class='ball-red' >"+ dx2 +"</span>" ;
        // }
        // str +=  "<i class='ball-red' style='background-color: #fff;width: 1vw'></i>" +
        //     "后三：<span class='ball-red span-2' >"+ tan_4 +"摊</span>" ;
        // if(ds3 == "大"){
        //     str +="<span class='ball-red' >"+ ds3 +"</span>" ;
        // }else {
        //     str +="<span class='ball-red' >"+ ds3 +"</span>" ;
        // }
        // if(dx3 == '单'){
        //     str += "<span class='ball-red' >"+ dx3 +"</span>" ;
        // }else {
        //     str += "<span class='ball-red' >"+ dx3 +"</span>" ;
        // }
        $("#bjft #number").html(str);
        var tanshu='';
        for (var i=0 ;i<tan_2 ;i++){
            tanshu += '<samp class="ball-red-span">'+'</samp>'
        }
        var tanshu='前三：'+tanshu;
        $('.q3box').html(tanshu)

        var tanshu='';
        for (var i=0 ;i<tan_3 ;i++){
            tanshu += '<samp class="ball-red-span">'+'</samp>'
        }
        var tanshu='中三：'+tanshu;
        $('.z3box').html(tanshu)

        var tanshu='';
        for (var i=0 ;i<tan_4 ;i++){
            tanshu += '<samp class="ball-red-span">'+'</samp>'
        }
        var tanshu='后三：'+tanshu;
        $('.h3box').html(tanshu)



        $("#pc28 #qihao").text('第' + data.pc28.dat_expect + '期');
        var nums = data.pc28.dat_codes.split(',');
        var totalNum_a =  nums[1] + nums[4] + nums[7] + nums[10] + nums[13] + nums[16];
        var totalNum_b =  nums[2] + nums[5] + nums[8] + nums[11] + nums[14] + nums[17];
        var totalNum_c =  nums[3] + nums[6] + nums[9] + nums[12] + nums[15] + nums[18];
        totalNum_a = Number(totalNum_a)%10;
        totalNum_b = Number(totalNum_b) % 10;
        totalNum_c = Number(totalNum_c) % 10;
        var totalNum=Number(totalNum_a)+Number(totalNum_b)+Number(totalNum_c);
        var sebo="";
        var danshaung="";
        if(totalNum == 1 || totalNum == 4 || totalNum == 7 || totalNum == 10 || totalNum == 16 || totalNum == 19 || totalNum == 22 || totalNum == 25){
            sebo = '绿';
        }else if(totalNum == 2 || totalNum == 5 || totalNum == 8 || totalNum == 11 || totalNum == 17 || totalNum == 20 || totalNum == 23 || totalNum == 26){
            sebo = '蓝';
        }else if(totalNum == 3 || totalNum == 6 || totalNum == 9 || totalNum == 12 || totalNum == 15 || totalNum == 18 || totalNum == 21 || totalNum == 24){
            sebo = '红';
        }else if(totalNum == 0 || totalNum == 13 || totalNum == 14 || totalNum == 27 ){
            sebo = '和';
        }
        if(totalNum  == 13 || totalNum == 14 ){
            danshaung = '和';
        }else if(totalNum < 13 && totalNum > 5){
            danshaung = '小';
        }else if(totalNum < 22 && totalNum > 14){
            danshaung = '大';
        }else if(totalNum <= 5 && totalNum >= 0){
            danshaung = '极小';
        }else if(totalNum <= 27 && totalNum >= 22){
            danshaung = '极大';
        }
        var ds ;
        if(totalNum%2 == 0){
            ds = '双';
        }else {
            ds = '单';
        }
        var str = "";

        str = str + "<i class='ball-red' style='background-color: #a058c2;color: #fff;'>" +totalNum_a+ "</i>" +
            "<i class='ball-red' style='background-color: #fffaf4;color: #5a5a5a' >+</i>" +
            "<i class='ball-red' style='background-color: #a058c2;color: #fff;'>" +totalNum_b+ "</i>" +
            "<i class='ball-red' style='background-color: #fffaf4;color: #5a5a5a' >+</i>" +
            "<i class='ball-red' style='background-color: #a058c2 ;color: #fff;'>" +totalNum_c+ "</i>" +
            "<i class='ball-red' style='background-color: #fffaf4;color: #5a5a5a' >=</i>" +
            "<i class='ball-red' style='background-color: #ff7b00;color: #fff;'>" +totalNum+ "</i>";
                if(sebo == '红'){
                    str = str +   "<span style='background-color: #fffaf4;'>" +sebo+ "</span>" ;
                }else if(sebo == '蓝'){
                    str = str +   "<span style='background-color: #fffaf4;'>" +sebo+ "</span>" ;
                }else if(sebo == '绿'){
                    str = str +   "<span style='background-color: #fffaf4;'>" +sebo+ "</span>" ;
                }else {
                    str = str +   "<span class='ball-red' style='background-color: #fffaf4;' >" +sebo+ "</span>";
                }
        if( danshaung == '极大' ||  danshaung == '极小'){
            str += "<span style='background-color: #fffaf4;'>" +danshaung+ "</span>";
        }else {
            if(danshaung == '大'){
                str += "<span style='background-color: #fffaf4;'>" +danshaung+ "</span>";
            }else {
                str += "<span style='background-color: #fffaf4;'>" +danshaung+ "</span>";
            }

        }
        if(ds == '单'){
            str = str + "<span style='background-color: #fffaf4;'>" +ds+ "</span>";
        }else {
            str = str + "<span style='background-color: #fffaf4;'>" +ds+ "</span>";
        }

        $("#pc28 #number").html(str);

        $("#tcssc #qihao").text('第' + pad(data.tcssc.dat_expect, 3).substr(6) + '期');
        var nums = data.tcssc.dat_codes.split(',');
        var str = "";
        for (var i = 0; i < nums.length; i++) {
            str = str + "<i class='ball-red'>" + nums[i] + "</i>"
        }
        $("#tcssc .bt-jg").html('');
        var long;
        long = ssclh(nums,1);
        $("#tcssc #number").html(str);
        $("#tcssc .bt-jg").html(long);
        
        $("#tcpk10 #qihao").text('第' + data.tcpk10.dat_expect.substr(6) + '期');
        var nums = data.tcpk10.dat_codes.split(',');
        var str = "";
        for (var i = 0; i < nums.length; i++) {
            str = str + "<i class='no" + nums[i].replace(/\b(0+)/gi,"") + "'>" + nums[i].replace(/\b(0+)/gi,"") + "</i>"
        }
        $("#tcpk10 .bt-jg").html('');
        var long;
         long = lh(nums);
        $("#tcpk10 #number").html(str);
        $("#tcpk10 .bt-jg").html(long);
        console.log( data.sfssc);
        $("#sfssc #qihao").text('第' + pad(data.sfssc.dat_expect, 3).substr(6) + '期');

        var nums = data.sfssc.dat_codes.split(',');
        var str = "";
        for (var i = 0; i < nums.length; i++) {
            str = str + "<i class='ball-red'>" + nums[i] + "</i>"
        }
        $("#sfssc .bt-jg").html('');
        var long;
        long = ssclh(nums,1);
        $("#sfssc #number").html(str);
        $("#sfssc .bt-jg").html(long);

        $("#sfpk10 #qihao").text('第' + data.sfpk10.dat_expect.substr(6) + '期');
        var nums = data.sfpk10.dat_codes.split(',');
        var str = "";
        for (var i = 0; i < nums.length; i++) {
            str = str + "<i class='no" + nums[i].replace(/\b(0+)/gi,"") + "'>" + nums[i].replace(/\b(0+)/gi,"") + "</i>"
        }
        $("#sfpk10 .bt-jg").html('');
        var long;
        long = lh(nums);
        $("#sfpk10 #number").html(str);
        $("#sfpk10 .bt-jg").html(long);

    },



    "json");

}
window.setTimeout("IndexOpen()", 10000);
function pad(num, n) {
    if ((num + "").length >= n) return num;
    return pad("0" + num, n)
}

function lh(nums) {
    var srt = '';
    var sum = (Number(nums[0])+Number(nums[1]));
    var dx = '';
    var ds = '';
    if(sum > 11){
        dx = '大';
    }else if(sum < 11){
        dx = '小';
    }else {
        dx = '和';
    }
    if(sum%2 == 0){
        ds = '双';
    }else {
        ds = '单';
    }
    if(sum == 11){
        ds = '和';
    }
    srt +="<span>"+long(nums[0],nums[9])+"</span>";
    srt +="<span>"+long(nums[1],nums[8])+"</span>";
    srt +="<span>"+long(nums[2],nums[7])+"</span>";
    srt +="<span>"+long(nums[3],nums[6])+"</span>";
    srt +="<span>"+long(nums[4],nums[5])+"</span>";
    srt +="<span style='color: #bbbbbb'>|</span> 冠亚和: ";
    srt +=""+sum+" ";
    srt +=""+dx+" ";
    srt +=""+ds+"";
    return srt;
}
function long(nums_1,nums_2) {
    if(nums_1 > nums_2){
        return '龙'
    }else if(nums_1 < nums_2){
        return '虎'
    }else {
        return '和'
    }
}
function yxx(num) {
    switch (num) {
        case '1':
            return '鱼';
        break;
            case '2':
            return '虾';
        break;
            case '3':
            return '蟹';
        break;
            case '4':
            return '金钱';
        break;
            case '5':
            return '葫芦';
        break;
            case '6':
            return '鸡';
        break;
    }
}


 function ssclh(nums,num) {
     var srt = '';
     var sum =  eval(nums.join("+"));
     var dx = '';
     var ds = '';
     if(sum%2 == 0){
         ds = '双';
     }else {
         ds = '单';
     }
    if(num == 3){
        if(sum <= 10){
            dx = '小';
        }else {
            dx = '大';
        }
        srt +="  总和: ";
    }else if(num  == 2) {
        if(sum < 84){
            dx = '小';
        }else if(sum > 84) {
            dx = '大';
        }else {
            dx = '和';
        }
        srt +="<span>"+long(nums[0],nums[7])+"</span>";
        srt +="<span>"+long(nums[1],nums[6])+"</span>";
        srt +="<span>"+long(nums[2],nums[5])+"</span>";
        srt +="<span>"+long(nums[3],nums[4])+"</span>";
        srt +="<span style='color: #bbbbbb'>|</span> 总和: ";
    }else {
        if(num == 4){
            if(sum < 30){
                dx = '小';
            }else if(sum > 30) {
                dx = '大';
            }else {
                dx = '和';
            }
        }else {
            if(sum <= 22){
                dx = '小';
            }else {
                dx = '大';
            }
        }


        srt +="<span>"+long(nums[0],nums[4])+"</span>";
        srt +="<span style='color: #bbbbbb'>|</span> 总和: ";
    }



     srt +=""+sum+" ";
     srt +=""+dx+" ";
     srt +=""+ds+" ";
     return srt;
 }


</script>		
			
</body>
</html>
