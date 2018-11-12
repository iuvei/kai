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
    <script src="../style/js/lotcommon.js?v=<?php echo date("Y/m/d")?>" type="text/javascript"></script>
    <script src="../style/js/warntime.js?v=<?php echo date("Y/m/d")?>" type="text/javascript"></script>
    <link type="text/css" href="../style/css/style.css?v=<?php echo date("Y/m/d")?>"  rel="stylesheet">
    <link type="text/css" href="../style/css/histoly.css?v=<?php echo date("Y/m/d")?>" rel="stylesheet">


    <style type="text/css">
        .ftList a{
            width: 30vw;
            height: 4vw;
            display: block;
            float: left;
            margin-left: 2vw;
        }
    </style>


</head>
<body>



<?php include("../public/header.php"); ?>

<script src="award.js?v=<?php echo date("Y/m/d")?>" type="text/javascript"></script>
<?php include("../public/header2.php"); ?>
<div class="openResult">
    <div class="openIssueList">
        <div class="newIssue">
            第<span></span>期结果
        </div>
        <div class="issueList">
            已开<span class="periodNumber"></span>期，剩<span class="surplus_num"></span>期
        </div>
    </div>
    <div class="openCodeList1">
        <img src="/m/style/images/loading2.gif">
    </div>
    <div class="ftList">
        <a class="qiansan">番摊：<span class="ball-red-span"></span><span class="ball-red-span"></span><span class="ball-red-span"></span><span class="ball-red-span"></span></a>
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
        <a class="video2">
            <img src="/m/style/images/ico_sp.png"><span>开奖直播</span>
        </a>

    </div>
</div>


<div class="choose2" id="chooseType">
    <a class="chooseType">号码</a>
    <a>摊1</a>
    <a>摊2</a>
    <a>摊3</a>
    <a>摊4</a>
</div>
<div class="BallNum">
    <div class="BallNumHead">
        <a class="issue">期号</a>
        <a class="KJJG">开奖结果</a>
        <a>总和</a>
        <a>番摊</a>
        <a>大小</a>
        <a>单双</a>
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

        // $('#chooseType').click(function () {
        //     alert(123)
        // })
        //显示默认日期
        var now = new Date();




        $("#dateTime").val(now.getFullYear()+"-"+((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1)+"-"+(now.getDate()<10?"0":"")+now.getDate());
        $(".dataYMD").html( $("#dateTime").val());
        $('.dataWeed').html(getWeed($("#dateTime").val()))



        //提取记录

        getHistoryData('50','');


    });
    //搜索

    $('#dateTime').change(function () {
        $('.choose2 a').removeClass('chooseTypeColor');
        getHistoryData('50', $("#dateTime").val());
        $(".dataYMD").html( $("#dateTime").val());
        $('.dataWeed').html(getWeed($("#dateTime").val()))
        return false;
    })
    //刷新
    function refresh(){

        getHistoryData('50','');

    }

</script>
<script src="../style/js/common.js?v=<?php echo date("Y/m/d")?>" type="text/javascript"></script>
</body>
</html>
</html>