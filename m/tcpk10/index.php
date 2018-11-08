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
<title><?=$web_type?>开奖直播_<?=$web_type?>开奖历史记录_<?=$webtitle?>手机版</title>
<script src="../style/js/jquery.js"></script>
<script src="../style/js/layer.js"></script>
<script src="../style/js/lotcommon.js" type="text/javascript"></script>
<script src="../style/js/warntime.js" type="text/javascript"></script>
<link type="text/css" href="../style/css/style.css" rel="stylesheet">
<link type="text/css" href="../style/css/histoly.css" rel="stylesheet">


<style type="text/css">



</style>


</head>
<body>



<?php include("../public/header.php"); ?>

<script src="award.js" type="text/javascript"></script>
<!--<link type="text/css" href="../style/css/pk10.css" rel="stylesheet">-->

<div class="daojishi1">

    <div class="xia-yxx-list" id="xia-yxx-list1" style="display: none;">
        <ul class="">
            <li><a href="../pk10/" game="pk10" class="">北京pk10</a></li>
            <li><a href="../sfpk10/" game="jssc">三分pk10</a></li>
            <li><a href="../tcpk10/" game="tcpk10">极速pk10</a></li>
            <li><a href="../xyft/" game="xyft">幸运飞艇</a></li>
            <li><a href="../cqssc/" game="cqssc">重庆时时彩</a></li>
            <li><a href="../tcssc/" game="tcssc">极速时时彩</a></li>
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

    <select class="chooseIssue">
        <option value="">全部期数</option>
    </select>
</div>
<div class="openResult">
    <div class="openIssueList">
        <div class="newIssue">
            第<span></span>期结果
        </div>
        <div class="issueList">
            已开<span class="periodNumber"></span>期，剩<span class="surplus_num"></span>期
        </div>
    </div>
    <div class="openCodeList">
        <img src="/m/style/images/loading2.gif">
    </div>
    <div class="lhResult">
        <a>龙</a>
        <a>龙</a>
        <a>龙</a>
        <a>龙</a>
        <a>龙</a>
        <a><span></span></a>
        <a id="zh">总和：</a>
        <a></a>
        <a></a>
        <a></a>
    </div>
    <div class="nextOpenList">
        <div class="nextIssue">距<span></span>期开奖</div>

        <div id="Bar">
            <div class="Bar">
                <div id="takeout_bar">
                    <span></span>
                </div>
            </div>
        </div>
        <div class="nextTime">
            <span id="headOpenTimeM"></span>:<span id="headOpenTimeS"></span>
        </div>
        <a class="video2" href="shipin.php">
            <img src="/m/style/images/ico_sp.png"><span>开奖直播</span>
        </a>

    </div>
</div>


<!--<div class="head">-->
<!--    <div class="headRow1">-->
<!--        <input type="date" id="dateTime" onchange="Search()">-->
<!--        <div><a class="dataYMD"></a><a class="dataWeed"></a></div>-->
<!--        <select class="chooseIssue">-->
<!--            <option value="">全部期数</option>-->
<!--        </select>-->
<!--    </div>-->
<!--    <div class="headRow2">-->
<!--        <div>今日已开<a class="openIssue"></a>期</div>-->
<!--        <div>剩余<a class="residueIssue"></a>期</div>-->
<!--        <div>总期数<a class="totalIssue"></a>期</div>-->
<!--    </div>-->
<!--    <div class="headRow3">-->
<!--        <div><a class="nextOpenIssue"></a>期剩</div>-->
<!--        <div class="headOpenTime">-->
<!--            <a class="headOpenTimeM" id="headOpenTimeM"></a>-->
<!--            <span>分</span>-->
<!--            <a class="headOpenTimeS" id="headOpenTimeS"></a>-->
<!--            <span>秒</span>-->
<!--        </div>-->
<!--        <div class="itm-time">开奖时间<a class="nextOpenTime" id="time"></a></div>-->
<!--    </div>-->
<!--</div>-->
<div class="choose" id="chooseNum">
    <div class="chooseRow1">
        <a>1</a>
        <a>2</a>
        <a>3</a>
        <a>4</a>
        <a>5</a>
        <a>6</a>
        <a>7</a>
        <a>8</a>
        <a>9</a>
        <a>10</a>
    </div>
    <div class="chooseRow1" id="chooseType2">
        <a>大</a>
        <a>小</a>
        <a>单</a>
        <a>双</a>
        <a>龙</a>
        <a>虎</a>
        <a>还原</a>
    </div>
</div>
<div class="choose2" id="chooseType">
    <a>号码</a>
    <a>大小</a>
    <a>单双</a>
   <!-- <a>组合</a>-->
    <a>筛选</a>
</div>
<div class="BallNum">
    <div class="BallNumHead">
        <a class="issue">期号</a>
        <a>冠</a>
        <a>亚</a>
        <a>三</a>
        <a>四</a>
        <a>五</a>
        <a>六</a>
        <a>七</a>
        <a>八</a>
        <a>九</a>
        <a>十</a>
    </div>
</div>
<div id="historyList"></div>
<!--<div class="openCode">
    <div class="qihao">
        <div>23:15</div>
        <div>12345678</div>
    </div>
    <div>
        <a class="no1">2</a>
    </div>
    <div>
        <a class="no1">3</a>
    </div>
    <div>
        <a class="no1">4</a>
    </div>
    <div>
        <a class="no1">5</a>
    </div>
    <div>
        <a class="no1">6</a>
    </div>
    <div>
        <a class="no1">7</a>
    </div>
    <div>
        <a class="no1">8</a>
    </div>
    <div>
        <a class="no1">9</a>
    </div>
    <div>
        <a class="no1">10</a>
    </div>
    <div>
        <a class="no1">10</a>
    </div>
</div>-->

<?php include("../public/footer.php"); ?>


<script type="text/javascript">



    $(function () {


        //显示默认日期
        var now = new Date();


        $("#dateTime").val(now.getFullYear()+"-"+((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1)+"-"+(now.getDate()<10?"0":"")+now.getDate());
        $(".dataYMD").html( $("#dateTime").val());
        $('.dataWeed').html(getWeed($("#dateTime").val()))




        //提取记录

        getHistoryData('15','');


    });

    /*期数*/
    var issueStr = '';
    var arr=[];
    $('.chooseIssue').change(function () {
        issueStr=$(this).val();

        if(issueStr==''){//全部期数
            $('.openCode').show();
            return
        }
        for (var i=0;i<$('.Issue').length;i++){
            if( $('.Issue').eq(i).text() == issueStr){
                $('.Issue').eq(i).parent().parent().parent().show();
            }else {
                $('.Issue').eq(i).parent().parent().parent().hide();
            }
        }
    });

    /*筛选类型*/
    $('#chooseType a').click(function () {
        arr=[];
        $('#chooseNum a').removeClass('chooseTypeColor')
        $('.openCode a').removeClass('pk10BallNoColor');
        $('.choose').hide();

        $('#chooseType a').removeClass('chooseTypeColor');
        $('#chooseType2 a').removeClass('chooseTypeColor');
        $(this).addClass('chooseTypeColor');
        if( $(this).text()=='筛选'){
            $('.openCode a').show();
            $('.BallNum').show();
            $('.zuhe').hide();
            $('.pk10Da').hide();
            $('.pk10Xiao').hide();
            $('.pk10Dan').hide();
            $('.pk10Shuang').hide();
            $('.choose').show();
        }else if($(this).text()=='大小'){
            $('.openCode a').hide();
            $('.BallNum').show();
            $('.zuhe').hide();
            $('.pk10Dan').hide();
            $('.pk10Shuang').hide();
            $('.pk10Da').show();
            $('.pk10Xiao').show();
        }else if($(this).text()=='单双'){
            $('.openCode a').hide();
            $('.BallNum').show();
            $('.zuhe').hide();
            $('.pk10Da').hide();
            $('.pk10Xiao').hide();
            $('.pk10Dan').show();
            $('.pk10Shuang').show();
        }else if($(this).text()=='号码'){
            $('.openCode a').show();
            $('.BallNum').show();
            $('.zuhe').hide();
            $('.pk10Da').hide();
            $('.pk10Xiao').hide();
            $('.pk10Dan').hide();
            $('.pk10Shuang').hide();
        } else if($(this).text()=='组合'){
            $('.openCode a').hide();
            $('.BallNum').hide();
            $('.zuhe').show();

        }

    });
    /*筛选数字*/
    $('#chooseNum a').click(function () {
        $('.openCode a').addClass('pk10BallNoColor');
        $('#chooseType2 a').removeClass('chooseTypeColor');
        if($.inArray($(this).text(),arr)!= -1){

            $(this).removeClass('chooseTypeColor');
            arr.splice($.inArray($(this).text(), arr), 1)
        }else {
            $(this).addClass('chooseTypeColor');
            arr.push($(this).text());
        }
        for (var i=0;i< $('.openCode a').text().length;i++){

            if($.inArray( $('.openCode a').eq([i]).text(),arr)!=-1){
                $('.openCode a').eq([i]).removeClass('pk10BallNoColor')
            }
        }
    });

    /*筛选类型*/
    $('#chooseType2 a').click(function () {
        arr=[]
        $('#chooseNum a').removeClass('chooseTypeColor');
        $('#chooseType2 a').removeClass('chooseTypeColor');
        $(this).addClass('chooseTypeColor');
        if( $(this).text()=='还原'){
            $('#chooseNum a').removeClass('chooseTypeColor')
            $('.openCode a').removeClass('pk10BallNoColor');
            $('.choose').hide();
        }else if($(this).text()=='大'){
            $('.openCode a').addClass('pk10BallNoColor');
            for (var i=0;i<$('.openCode a').text().length;i++){
                if($('.openCode a').eq([i]).text()>=5){
                    $('.openCode a').eq([i]).removeClass('pk10BallNoColor')
                }
            }
        }else if($(this).text()=='小'){
            $('.openCode a').addClass('pk10BallNoColor');
            for (var i=0;i<$('.openCode a').text().length;i++){
                if($('.openCode a').eq([i]).text()<5){
                    $('.openCode a').eq([i]).removeClass('pk10BallNoColor')
                }
            }
        }else if($(this).text()=='单'){
            $('.openCode a').addClass('pk10BallNoColor');
            for (var i=0;i<$('.openCode a').text().length;i++){
                if($('.openCode a').eq([i]).text()%2!=0){
                    $('.openCode a').eq([i]).removeClass('pk10BallNoColor')
                }
            }
        }else if($(this).text()=='双'){
            $('.openCode a').addClass('pk10BallNoColor');
            for (var i=0;i<$('.openCode a').text().length;i++){
                if($('.openCode a').eq([i]).text()%2==0){
                    $('.openCode a').eq([i]).removeClass('pk10BallNoColor')
                }
            }
        }else if($(this).text()=='龙'){
            $('.openCode a').addClass('pk10BallNoColor');
            for (var i=0;i<$('.openCode a').text().length;i++){
                if($('.openCode a').eq(i).attr('name')=='龙'){
                    $('.openCode a').eq([i]).removeClass('pk10BallNoColor')
                }
            }
        }else if($(this).text()=='虎'){
            $('.openCode a').addClass('pk10BallNoColor');
            for (var i=0;i<$('.openCode a').text().length;i++){
                if($('.openCode a').eq(i).attr('name')=='虎'){
                    $('.openCode a').eq([i]).removeClass('pk10BallNoColor')
                }
            }
        }
    });
    //搜索
    function Search() {
        arr=[];
        issueStr = '';
        $('#chooseNum a').removeClass('chooseTypeColor');
        $('#chooseType2 a').removeClass('chooseTypeColor');
        $('#chooseType a').removeClass('chooseTypeColor');
        $('.openCode a').show();
        $('.pk10Da').hide();
        $('.pk10Xiao').hide();
        $('.pk10Dan').hide();
        $('.pk10Shuang').hide();
        getHistoryData('15', $("#dateTime").val());
        $(".dataYMD").html( $("#dateTime").val());
        $('.dataWeed').html(getWeed($("#dateTime").val()))
        return false;
    }
    //刷新
    function refresh(){

        getHistoryData('15','');

    }




</script>
</body>
</html>
