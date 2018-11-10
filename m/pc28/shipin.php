<?php 
include("../conn.php");
$cid = 43;
?>
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0"/>

    <meta name="HandheldFriendly" content="true" />
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">

    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
    <meta name="format-detection"content="telephone=no"/>
    <title><?=$web_type?>开奖直播</title>
    <script src="../style/js/jquery.js"></script>
    <script src="../style/js/layer.js"></script>
    <script src="../style/js/lotcommon.js" type="text/javascript"></script>
    <script src="../style/js/warntime.js" type="text/javascript"></script>
    <link type="text/css" href="../style/css/style.css" rel="stylesheet">
</head>
<body>



<?php include("../public/header.php"); ?>


   
<script src="award.js" type="text/javascript"></script>
<link type="text/css" href="../style/css/pk10.css" rel="stylesheet">
<div class="openResult" style="margin-top: 8vw">
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
<?php include("../public/head3.php"); ?>

<div class="list">
    <iframe src="/v2/jnd28">

    </iframe>

        </div>

<?php include("../public/footer.php"); ?>
</body>
</html>