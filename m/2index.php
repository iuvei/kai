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
 <title><?=$web_type?>开奖直播_北京赛车pk10历史记录_手机版开奖视频现场直播_<?=$webtitle?>手机版</title>

<script src="style/js/jquery.js"></script>
<script src="style/js/jquery.cookie.js"></script>
<link type="text/css" href="style/css/style.css" rel="stylesheet">
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
	<a onClick="javascript:return_prepage();" class="back">上一页</a>
	<a href="./" class="logo"><img src="style/images/logo.png"></a>
	<a href="./" class="menu">首页</a>
</header>


   
<div class="h50">

</div>

<ul class="kaij-mylist">
	     
	            <li class="kaij-mylist-li" id="pk10">
	                <a href="../pk10/">
	                <div class="kaij-mylist-l"><span class="ui-logo ui-logo-pk10"></span></div>
	                <div class="kaij-mylist-r">
	                    <div class="kaij-mylist-hd">
	                        <div class="itm-time">下期开奖：<span id="time">载入中</span></div>
	                        <div class="itm-tit">北京赛车<span class="itm-qih" id="qihao">载入中</span></div>
	                    </div>
	                    <div class="kaij-mylist-bd">
	                        <div class="itm-result">
	                            <div class="ball-wrap" id="number">
	                            <img src="style/images/loading2.gif" alt="载入中">
	                            </div>
	                        </div>
	                    </div>
	                </div>
	                <span class="list-arrow"></span>
	                </a>
	            </li>

    <li class="kaij-mylist-li" id="jssc">
        <a href="../jssc/">
            <div class="kaij-mylist-l"><span class="ui-logo ui-logo-jssc"></span></div>
            <div class="kaij-mylist-r">
                <div class="kaij-mylist-hd">
                    <div class="itm-time">下期开奖：<span id="time">载入中</span></div>
                    <div class="itm-tit">極速赛车<span class="itm-qih" id="qihao">载入中</span></div>
                </div>
                <div class="kaij-mylist-bd">
                    <div class="itm-result">
                        <div class="ball-wrap" id="number">
                            <img src="style/images/loading2.gif" alt="载入中">
                        </div>
                    </div>
                </div>
            </div>
            <span class="list-arrow"></span>
        </a>
    </li>
	            <li class="kaij-mylist-li" id="xyft">
	                <a href="../xyft/">
	                <div class="kaij-mylist-l"><span class="ui-logo ui-logo-xyft"></span></div>
	                <div class="kaij-mylist-r">
	                    <div class="kaij-mylist-hd">
	                        <div class="itm-time">下期开奖：<span id="time">载入中</span></div>
	                        <div class="itm-tit">幸运飞艇<span class="itm-qih" id="qihao">载入中</span></div>
	                    </div>
	                    <div class="kaij-mylist-bd">
	                        <div class="itm-result">
	                            <div class="ball-wrap" id="number">
	                            <img src="style/images/loading2.gif" alt="载入中">
	                            </div>
	                        </div>
	                    </div>
	                </div>
	                <span class="list-arrow"></span>
	                </a>
	            </li>
		
		 
				<li class="kaij-mylist-li" id="cqssc">
                <a href="../cqssc/">
                <div class="kaij-mylist-l"><span class="ui-logo ui-logo-cqssc"></span></div>
                <div class="kaij-mylist-r">
                    <div class="kaij-mylist-hd">
                         <div class="itm-time">下期开奖：<span id="time">载入中</span></div>
	                     <div class="itm-tit">重庆时时彩<span class="itm-qih" id="qihao">载入中</span></div>
                    </div>
                    <div class="kaij-mylist-bd">
                        <div class="itm-result">
                            <div class="ball-wrap" id="number">
	                            <img src="style/images/loading2.gif" alt="载入中">
	                            </div>
                        </div>
                    </div>
                </div>
                <span class="list-arrow"></span>
                </a>
            </li>
            
			<li class="kaij-mylist-li" id="gdkl10">
                <a href="../gdkl10/">
                <div class="kaij-mylist-l"><span class="ui-logo ui-logo-gdkl10"></span></div>
                <div class="kaij-mylist-r">
                    <div class="kaij-mylist-hd">
                         <div class="itm-time">下期开奖：<span id="time">载入中</span></div>
	                     <div class="itm-tit">广东快乐十分<span class="itm-qih" id="qihao">载入中</span></div>
                    </div>
                    <div class="kaij-mylist-bd">
                        <div class="itm-result">
                            <div class="ball-wrap" id="number">
	                            <img src="style/images/loading2.gif" alt="载入中">
	                            </div>
                        </div>
                    </div>
                </div>
                <span class="list-arrow"></span>
                </a>
            </li>
            
<!--			<li class="kaij-mylist-li" id="xync">-->
<!--                <a href="../xync/">-->
<!--                <div class="kaij-mylist-l"><span class="ui-logo ui-logo-xync"></span></div>-->
<!--                <div class="kaij-mylist-r">-->
<!--                    <div class="kaij-mylist-hd">-->
<!--                        <div class="itm-time">下期开奖：<span id="time">载入中</span></div>-->
<!--	                    <div class="itm-tit">幸运农场<span class="itm-qih" id="qihao">载入中</span></div>-->
<!--                    </div>-->
<!--                    <div class="kaij-mylist-bd">-->
<!--                        <div class="itm-result">-->
<!--                            <div class="ball-wrap" id="number">-->
<!--	                            <img src="style/images/loading2.gif" alt="载入中">-->
<!--	                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <span class="list-arrow"></span>-->
<!--                </a>-->
<!--            </li>-->
            
				<li class="kaij-mylist-li" id="jsssc">
                <a href="../jsssc/">
                <div class="kaij-mylist-l"><span class="ui-logo ui-logo-xjssc"></span></div>
                <div class="kaij-mylist-r">
                    <div class="kaij-mylist-hd">
                         <div class="itm-time">下期开奖：<span id="time">载入中</span></div>
	                     <div class="itm-tit">極速时时彩<span class="itm-qih" id="qihao">载入中</span></div>
                    </div>
                    <div class="kaij-mylist-bd">
                        <div class="itm-result">
                            <div class="ball-wrap" id="number">
	                            <img src="style/images/loading2.gif" alt="载入中">
	                            </div>
                        </div>
                    </div>
                </div>
                <span class="list-arrow"></span>
                </a>
            </li>
            
				<li class="kaij-mylist-li" id="tjssc">
                <a href="../tjssc/">
                <div class="kaij-mylist-l"><span class="ui-logo ui-logo-tjssc"></span></div>
                <div class="kaij-mylist-r">
                    <div class="kaij-mylist-hd">
                        <div class="itm-time">下期开奖：<span id="time">载入中</span></div>
	                    <div class="itm-tit">天津时时彩<span class="itm-qih" id="qihao">载入中</span></div>
                    </div>
                    <div class="kaij-mylist-bd">
                        <div class="itm-result">
                            <div class="ball-wrap" id="number">
	                            <img src="style/images/loading2.gif" alt="载入中">
	                            </div>
                        </div>
                    </div>
                </div>
                <span class="list-arrow"></span>
                </a>
            </li>
            
			<li class="kaij-mylist-li" id="gd11x5">
                <a href="../gd11x5/">
                <div class="kaij-mylist-l"><span class="ui-logo ui-logo-gd11x5"></span></div>
                <div class="kaij-mylist-r">
                    <div class="kaij-mylist-hd">
                         <div class="itm-time">下期开奖：<span id="time">载入中</span></div>
	                     <div class="itm-tit">广东11选5<span class="itm-qih" id="qihao">载入中</span></div>
                    </div>
                    <div class="kaij-mylist-bd">
                        <div class="itm-result">
                            <div class="ball-wrap" id="number">
	                            <img src="style/images/loading2.gif" alt="载入中">
	                            </div>
                        </div>
                    </div>
                </div>
                <span class="list-arrow"></span>
                </a>
            </li>
            
				<li class="kaij-mylist-li" id="jsk3">
                <a href="../jsk3/">
                <div class="kaij-mylist-l"><span class="ui-logo ui-logo-jsk3"></span></div>
                <div class="kaij-mylist-r">
                    <div class="kaij-mylist-hd">
                         <div class="itm-time">下期开奖：<span id="time">载入中</span></div>
	                     <div class="itm-tit">江苏快三<span class="itm-qih" id="qihao">载入中</span></div>
                    </div>
                    <div class="kaij-mylist-bd">
                        <div class="itm-result">
                            <div class="ball-wrap" id="number">
	                            <img src="style/images/loading2.gif" alt="载入中">
	                            </div>
                        </div>
                    </div>
                </div>
                <span class="list-arrow"></span>
                </a>
            </li>
            
</ul>

		
		

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
// var xync_number = -1;
// var xync_downTimer = null;
var gd11x5_number = -1;
var gd11x5_downTimer = null;
// var xjssc_number = -1;
// var xjssc_downTimer = null;
 var jsssc_number = -1;
 var jsssc_downTimer = null;
 var jssc_number = -1;
 var jssc_downTimer = null;
var tjssc_number = -1;
var tjssc_downTimer = null;
var jsk3_number = -1;
var jsk3_downTimer = null;
$(function() {
    CheckAward("xyft", "GetXyftAwardTimes", this.xyft_downTimer, xyft_number, "xyft");
    CheckAward("pk10", "GetPk10AwardTimes", this.pk10_downTimer, pk10_number, "pk10");
    CheckAward("cqssc", "GetCqsscAwardTimes", this.cqssc_downTimer, cqssc_number, "cqssc");
    CheckAward("gdkl10", "GetGdkl10AwardTimes", this.gdkl10_downTimer, gdkl10_number, "gdkl10");
    CheckAward("jssc", "GetPk10AwardTimes", this.jssc_downTimer, jssc_number, "jssc");
    CheckAward("gd11x5", "GetGd11x5AwardTimes", this.gd11x5_downTimer, gd11x5_number, "gd11x5");
    CheckAward("jsssc", "GetXjsscAwardTimes", this.jsssc_downTimer, jsssc_number, "jsssc");
    CheckAward("tjssc", "GetTjsscAwardTimes", this.tjssc_downTimer, tjssc_number, "tjssc");
    CheckAward("jsk3", "GetJsk3AwardTimes", this.jsk3_downTimer, jsk3_number, "jsk3"); 
    IndexOpen()
});
function showTime(page, timeSpan, time, qihao) {
    if (time < 1) {
        if (page == "pk10") {
            CheckAward("pk10", "GetPk10AwardTimes", this.pk10_downTimer, pk10_number, "pk10", qihao)
        } else if (page == "xyft") {
            CheckAward("xyft", "GetXyftAwardTimes", this.xyft_downTimer, xyft_number, "xyft", qihao)
        } else if (page == "shishicai") {
            CheckAward("shishicai", "GetCqsscAwardTimes", this.cqssc_downTimer, cqssc_number, "cqssc", qihao)
        } else if (page == "gdkl10") {
            CheckAward("gdkl10", "GetGdkl10AwardTimes", this.gdkl10_downTimer, gdkl10_number, "gdkl10", qihao)
        } else if (page == "xync") {
            CheckAward("jssc", "GetPk10AwardTimes", this.xync_downTimer, xync_number, "jssc", qihao)
        } else if (page == "gd11x5") {
            CheckAward("gd11x5", "GetGd11x5AwardTimes", this.gd11x5_downTimer, gd11x5_number, "gd11x5", qihao)
        } else if (page == "xjssc") {
            CheckAward("jsssc", "GetXjsscAwardTimes", this.xjssc_downTimer, xjssc_number, "jsssc", qihao)
        } else if (page == "tjssc") {
            CheckAward("tjssc", "GetTjsscAwardTimes", this.tjssc_downTimer, tjssc_number, "tjssc", qihao)
        } else if (page == "jsk3") {
            CheckAward("jsk3", "GetJsk3AwardTimes", this.jsk3_downTimer, jsk3_number, "jsk3", qihao)
        }
    } else {
        $("#" + timeSpan + " #time").text(pad(Math.floor(time / 60), 2) + ":" + pad(time % 60, 2))
    }
}
function CheckAward(page, method, downTimer, number, timeSpan) {
    window.clearInterval(downTimer);
    $.post("../"+page+"/getPk10AwardTimes.do", {
        ajaxhandler: method
    },
    function(data) {
        if (data.current.periodNumber != number) {
            var time = parseInt(data.next.awardTimeInterval / 1000);
            downTimer = window.setInterval(function() {
                if (time < 1) {
                    window.clearInterval(downTimer)
                }
                showTime(page, timeSpan, time--, data.next.periodNumber)
            },
            1000)
        }
        number = data.current.periodNumber
    },
    'json')
}
function IndexOpen() {
    $.post("ajax/getindex.php", {},
    function(data) {
        $("#pk10 #qihao").text('第' + data.pk10.periodNumber + '期');
        var nums = data.pk10.awardNumbers.split(',');
        var str = "";
        for (var i = 0; i < nums.length; i++) {
            str = str + "<i class='no" + nums[i] + "'>" + nums[i] + "</i>"
        }
        $("#pk10 #number").html(str);

        $("#jssc #qihao").text('第' + data.jssc.periodNumber + '期');
        var nums = data.jssc.awardNumbers.split(',');
        var str = "";
        for (var i = 0; i < nums.length; i++) {
            str = str + "<i class='no" + nums[i] + "'>" + nums[i] + "</i>"
        }
        $("#jssc #number").html(str);

        $("#xyft #qihao").text('第' + data.xyft.periodNumber + '期');
        var nums = data.xyft.awardNumbers.split(',');
        var str = "";
        for (var i = 0; i < nums.length; i++) {
            str = str + "<i class='no" + nums[i] + "'>" + nums[i] + "</i>"
        }
        $("#xyft #number").html(str);
        $("#cqssc #qihao").text('第' + data.cqssc.periodNumber + '期');
        var nums = data.cqssc.awardNumbers.split(',');
        var str = "";
        for (var i = 0; i < nums.length; i++) {
            str = str + "<i class='ball-red'>" + nums[i] + "</i>"
        }
        $("#cqssc #number").html(str);
        $("#gdkl10 #qihao").text('第' + pad(data.gdkl10.periodNumber, 3) + '期');
        var nums = data.gdkl10.awardNumbers.split(',');
        var str = "";
        for (var i = 0; i < nums.length; i++) {
            if (parseInt(nums[i]) > 18) {
                str = str + "<i class='ball-blue'>" + nums[i] + "</i>"
            } else {
                str = str + "<i class='ball-red'>" + nums[i] + "</i>"
            }
        }
        $("#gdkl10 #number").html(str);
        // $("#xync #qihao").text('第' + pad(data.xync.periodNumber, 3) + '期');
        // var nums = data.xync.awardNumbers.split(',');
        // var str = "";
        // for (var i = 0; i < nums.length; i++) {
        //     str = str + "<i class='ball-red'>" + nums[i] + "</i>"
        // }
        // $("#xync #number").html(str);
        $("#gd11x5 #qihao").text('第' + pad(data.gd11x5.periodNumber, 3) + '期');
        var nums = data.gd11x5.awardNumbers.split(',');
        var str = "";
        for (var i = 0; i < nums.length; i++) {
            str = str + "<i class='ball-red'>" + nums[i] + "</i>"
        }
        $("#gd11x5 #number").html(str);
        $("#jsssc #qihao").text('第' + pad(data.xjssc.periodNumber, 3) + '期');
        var nums = data.xjssc.awardNumbers.split(',');
        var str = "";
        for (var i = 0; i < nums.length; i++) {
            str = str + "<i class='ball-red'>" + nums[i] + "</i>"
        }
        $("#jsssc #number").html(str);
        $("#tjssc #qihao").text('第' + data.tjssc.periodNumber + '期');
        var nums = data.tjssc.awardNumbers.split(',');
        var str = "";
        for (var i = 0; i < nums.length; i++) {
            str = str + "<i class='ball-red'>" + nums[i] + "</i>"
        }
        $("#tjssc #number").html(str);
        $("#jsk3 #qihao").text('第' + data.jsk3.periodNumber + '期');
        var nums = data.jsk3.awardNumbers.split(',');
        var str = "";
        for (var i = 0; i < nums.length; i++) {
            str = str + "<i class='ball-red'>" + nums[i] + "</i>"
        }
        $("#jsk3 #number").html(str)
    },
    "json");
    window.setTimeout("IndexOpen()", 10000)
}
function pad(num, n) {
    if ((num + "").length >= n) return num;
    return pad("0" + num, n)
}
		</script>		
			<div class="add-home">
<div class="add-home-content">
<img src="style/images/logo_icon.png">
<p><span style="float:left">先点击</span><i class="icon ion-ios-upload-outline"></i></p>
<p>再“添加到主屏幕”</p><i onClick="closeAddHome();" class="icon ion-close-round">X</i> 
<em></em>
</div>
</div>
</body>
</html>