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
<title><?=$web_type?>双面_<?=$webtitle?>手机版</title>
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
        <a class="video2">
            <img src="/m/style/images/ico_sp.png"><span>开奖直播</span>
        </a>

    </div>
</div>
<?php include("../public/head3.php"); ?>

<table class="lot-table">
			
				<tbody id="smyc">
				<tr>
					<td colspan="6">
						<img src="../style/images/loading2.gif">					</td>
				<tr>
				</tbody>
			</table>

   
<?php include("../public/footer.php"); ?>

<script type="text/javascript">
    $(function () {
        shuangmiantongji();
    });
    function sm(rows,type){
        alert

        var html = '<tr>';

        var d1=0;
        var d2=0;
        var d3=0;
        var x1=0;
        var x2=0;
        var x3=0;
        var s1=0;
        var s2=0;
        var s3=0;
        var da1=0;
        var da2=0;
        var da3=0;
        for(var i=rows.length-1;i >= 0; i--){
            var data = rows[i];

            if(data.n1 % 2 !=0){
                d1++;
            }
            if(data.n2 % 2 !=0){
                d2++;
            }
            if(data.n3 % 2 !=0){
                d3++;
            }


            if(data.n1 % 2 ==0){
                s1++;
            }
            if(data.n2 % 2 ==0){
                s2++;
            }
            if(data.n3 % 2 ==0){
                s3++;
            }
            if(data.n1<=3){
                x1++;
            }
            if(data.n2<=3){
                x2++;
            }
            if(data.n3<=3){
                x3++;
            }
            if(data.n1>3){
                da1++;
            }
            if(data.n2>3){
                da2++;
            }
            if(data.n3>3){
                da3++;
            }

        }



        html += '<tr class="head"><td colspan="6">一</td></tr><tr><td height="20">大</td><td height="20">小</td><td height="20">单</td><td height="20">双</td></tr><tr><td>'+da1+'</td><td>'+x1+'</td><td>'+d1+'</td><td>'+s1+'</td></tr>';
        html += '<tr class="head"><td colspan="6">二</td></tr><tr><td height="20">大</td><td height="20">小</td><td height="20">单</td><td height="20">双</td></tr><tr><td>'+da2+'</td><td>'+x2+'</td><td>'+d2+'</td><td>'+s2+'</td></tr>';
        html += '<tr class="head"><td colspan="6">三</td></tr><tr><td height="20">大</td><td height="20">小</td><td height="20">单</td><td height="20">双</td></tr><tr><td>'+da3+'</td><td>'+x3+'</td><td>'+d3+'</td><td>'+s3+'</td></tr>';

        html += '</tr>';

        return html;
    }
    function shuangmiantongji() {
        layer.open({type: 2,time: 1});
        $.get("../../jsk3/getHistoryData.do?count=200",
            function(result){
                var dan='';
                if(result&&result.rows){
                    dan = sm(result.rows);
                }else {
                    $('#error').html("<font color=red>对不起，今天还没开奖所以没有数据哦！您可以将您的意见 <a href='/feedback' target='_blank' style='color:#333'>反馈</a> 给我们</font>");
                }
                $('#smyc').html(dan);

            }, "json");

    }
</script>
</body>
</html>