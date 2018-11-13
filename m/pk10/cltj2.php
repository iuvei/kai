<?php 
include("../conn.php");
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
<title><?=$web_type?>长龙统计_<?=$webtitle?>手机版</title>
<script src="../style/js/jquery.js"></script>
<script src="../style/js/layer.js"></script>
<script src="../style/js/lotcommon.js" type="text/javascript"></script>
<script src="../style/js/warntime.js" type="text/javascript"></script>
<link type="text/css" href="../style/css/style.css" rel="stylesheet">


<style>

</style>


</head>
<body>



<?php include("../public/header.php"); ?>


   
<script src="award.js" type="text/javascript"></script>
<link type="text/css" href="../style/css/pk10.css" rel="stylesheet">
<div class="daojishi1">
    <div class="xia-yxx-list" id="xia-yxx-list1" style="display: none;">
        <ul class="">
            <li><a href="../pk10/" game="pk10" class="">北京PK10</a></li>
            <li><a href="../sfpk10/" game="jssc">三分PK10</a></li>
            <li><a href="../tcpk10/" game="tcpk10">TC极速赛车</a></li>
            <li><a href="../xyft/" game="xyft">幸运飞艇</a></li>
            <li><a href="../cqssc/" game="cqssc">重庆时时彩</a></li>
            <li><a href="../tcssc/" game="tcssc">TC极速时时彩</a></li>
            <li><a href="../sfssc/" game="jsssc">三分时时彩</a></li>
            <li><a game="bjft" href="../bjft/">北京番摊</a></li>
            <li><a game="cqft" href="../cqft">重庆番摊</a></li>
            <li><a href="../jsk3/" game="jsk3">江苏快3</a></li>
            <li><a href="../gd11x5/" game="gd11x5">广东11选5</a></li>
<!--            <li><a href="../gdkl10/" game="gdkl10">广东快乐十分</a></li>-->
            <li><a href="../pc28/" game="pc28">加拿大28</a></li>
            <li><a href="../txffc/" game="txffc" class="cur">腾讯分分彩</a></li>
        </ul>
    </div>
    <div class="fl xia-yx" id="xia-yx1"><?=$web_type?><span class="xialabt" id="xialabt1"></span> </div>

    <div class="fr"><a class="sp" href="shipin.php">开奖直播</a></div>
</div>

<ul class="kaij-mylist">
    <li class="kaij-mylist-li" id="pk10" style="border-bottom: 1px solid #eeeeee;">

        <div class="kaij-mylist-r">
            <div class="kaij-mylist-hd daojishi " style="padding-top: 0;">
                <div class="itm-time"><em id="period"></em>期开奖剩余：<span id="time" class="itm-time-time">01:27</span></div>
                <div class="itm-tit"><span class="itm-qih" id="qihao">第710580期</span></div>
            </div>
            <div class="kaij-mylist-bd">
                <div class="itm-result">
                    <div class="ball-wrap" id="number"><i class="no10">10</i><i class="no3">03</i><i class="no6">06</i><i class="no9">09</i><i class="no4">04</i><i class="no2">02</i><i class="no8">08</i><i class="no7">07</i><i class="no5">05</i><i class="no1">01</i></div>
                </div>
            </div>
        </div>
        <div class="bt-jg">冠亚和 <span>18</span> <span>大</span><span>单</span> 1-5龙虎 <span>龙</span><span>虎</span><span>龙</span><span>虎</span><span>龙</span></div>


    </li>

</ul>
<div class="gametool">
    <div class="fl" id="xia-yx2">长龙统计<span class="xialabt " id="xialabt2"></span>


        <div class="xia-yxx-list" id="xia-yxx-list2" style="display: none;">
            <ul class="">
                <li><a href="./" class="cur">开奖历史</a></li>
                <li><a href="smtj.php">两面统计</a></li>
                <li><a href="cltj.php">长龙统计</a></li>
                <li><a href="hmzs.php">号码走势</a></li>
                <li><a href="lrtj.php">冷热统计</a></li>
                <li><a href="jiqiao.php">玩法技巧</a></li>
                <li><a href="shipin.php">开奖直播</a></li>
            </ul>
        </div>


    </div></div>


<div class="changlongtj " style="left: 0rem; display: block;">
    <div class="line2box">
        <ul id="longDrag"><li><span>冠军</span>：<span>双</span><span style="color:#f11821">7</span>期</li><li><span>第三名</span>：<span>龙</span><span style="color:#f11821">6</span>期</li><li><span>第五名</span>：<span>大</span><span style="color:#f11821">5</span>期</li><li><span>第八名</span>：<span>小</span><span style="color:#f11821">5</span>期</li><li><span>第八名</span>：<span>单</span><span>4</span>期</li><li><span>第五名</span>：<span>双</span><span>3</span>期</li><li><span>冠军</span>：<span>小</span><span>2</span>期</li><li><span>第三名</span>：<span>单</span><span>2</span>期</li><li><span>第四名</span>：<span>大</span><span>2</span>期</li><li><span>第四名</span>：<span>龙</span><span>2</span>期</li></ul>
    </div>
</div>


<div class="balllist">
    <ul class="ball">
        <li><a href="javascript:void(0);" class='cur' ball="1" id="num_1">冠军</a></li>
        <li><a class="no" href="javascript:void(0);" ball="2" id="num_2">亚军</a></li>
        <li><a class="no" href="javascript:void(0);" ball="3" id="num_3">第3名</a></li>
        <li><a class="no" href="javascript:void(0);" ball="4" id="num_4">第4名</a></li>
        <li><a class="no" href="javascript:void(0);" ball="5" id="num_5">第5名</a></li>
        <li><a class="no" href="javascript:void(0);" ball="6" id="num_6">第6名</a></li>
        <li><a class="no" href="javascript:void(0);" ball="7" id="num_7">第7名</a></li>
        <li><a class="no" href="javascript:void(0);" ball="8" id="num_8">第8名</a></li>
        <li><a class="no" href="javascript:void(0);" ball="9" id="num_9">第9名</a></li>
        <li><a class="no" href="javascript:void(0);" ball="10" id="num_10">第10名</a></li>

    </ul>
</div>
<table class="lot-table">
			<thead>
					<tr class="head">
					
				  <td>长龙连开统计</td>
				  </tr>
				  </thead>

    <table border="1">
    <tr>
        <th></th>
        <th>2期</th>
        <th>3期</th>
        <th>4期</th>
        <th>5期</th>
        <th>6期</th>
        <th>7期</th>
        <th>8期</th>
        <th>9期</th>
        <th>10期</th>
        <th>11期</th>
        <th>12期</th>
        <th>13期</th>
        <th>14期</th>
    </tr>
    <tr class="n1">
    </tr>
    <tr class="n2">

    </tr>
    <tr class="n3">

    </tr>
    <tr class="n4">

    </tr>
    <tr class="n5">

    </tr>
    <tr class="n6">

    </tr>
    <tr class="n7">

    </tr>
    <tr class="n8">

    </tr>
    <tr class="n9">

    </tr>
    <tr class="n10">

    </tr>
    <tr class="long">

    </tr>
    <tr class="hu">

    </tr>
    <tr class="he">

    </tr>
    </table>

    <table border="1">
        <tr>
            <th style="color: red">冠亚和 </th>
            <th>2期</th>
            <th>3期</th>
            <th>4期</th>
            <th>5期</th>
            <th>6期</th>
            <th>7期</th>
            <th>8期</th>
            <th>9期</th>
            <th>10期</th>
            <th>11期</th>
            <th>12期</th>
            <th>13期</th>
            <th>14期</th>
        </tr>
        <tr class="dx">

        </tr>
        <tr class="x">
        </tr>
        <tr class="d">

        </tr>
        <tr class="s">

        </tr>
    </table>

</table>


   
<?php include("../public/footer.php"); ?>

</body>

<script>
    var n = 0;
    $("#num_1").click(function () {
        n = 0;
        ll();
    });
    $("#num_2").click(function () {
        ll();
        n = 1;
    });
    $("#num_3").click(function () {
        n = 2;
        ll();
    });
    $("#num_4").click(function () {
        n = 3;
        ll();
    });
    $("#num_5").click(function () {
        n = 4;
        ll();
    });
    $("#num_6").click(function () {
        n = 5;
        ll();
    });
    $("#num_7").click(function () {
        n = 6;
        ll();
    });
    $("#num_8").click(function () {
        n = 7;
        ll();
    });
    $("#num_9").click(function () {
        n = 8;
        ll();
    });
    $("#num_10").click(function () {
        n = 9;
        ll();
    });

    chang();
    function chang() {
        var id = "<?= $name?>";
        layer.open({type: 2,time: 1});
        $.get("/Fuzhi/Api/cllz", {id:id}, function (result) {
            var data = eval(result);
            console.log(data.length);
            dataLen = data.length;
            var name;
            name = ['冠军','亚军','季军','第四名','第五名','第六名','第七名','第八名','第九名','第十名'];
            var html = '';
            for(var i=0;i<dataLen;i++){
                $("#longDrag").html('');
                console.log(data[i]['dx']);
                if(data[i]['ds'] && data[i]['ds']['times'] != 1){
                        html += '<li><span>'+name[i]+'</span>：<span>'+data[i]['ds']['type']+'</span><span class="num_'+data[i]['ds']['times']+'">'+data[i]['ds']['times']+'</span>期</li>';
                }
                if(data[i]['dx'] && data[i]['dx']['times'] != 1){

                        html += '<li><span>'+name[i]+'</span>：<span>'+data[i]['dx']['type']+'</span><span class="num_'+data[i]['dx']['times']+'">'+data[i]['dx']['times']+'</span>期</li>';

                }
                if(data[i]['lh'] && data[i]['lh']['times'] != 1){
                        html += '<li><span>'+name[i]+'</span>：<span>'+data[i]['lh']['type']+'</span><span class="num_'+data[i]['lh']['times']+'" >'+data[i]['lh']['times']+'</span>期</li>';
                }
            }
            $("#longDrag").html(html);

        },"json");
    }
</script>
<style>
    .num_5{
        color:#f11821;
    }.num_6{
        color:#f11821;
    }.num_7{
        color:#f11821;
    }.num_8{
        color:#f11821;
    }.num_9{
        color:#f11821;
    }.num_10{
        color:#f11821;
    }.num_11{
        color:#f11821;
    }.num_12{
        color:#f11821;
    }.num_13{
        color:#f11821;
    }

</style>
</html>