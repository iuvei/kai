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
<div class="daojishi1">
    <div class="xia-yxx-list" id="xia-yxx-list1" style="display: none;">
        <ul class="">
            <li><a href="../pk10/" game="pk10" class="">北京赛车pk10</a></li>
<!--            <li><a href="../jssc/" game="jssc">极速赛车</a></li>-->
            <li><a href="../tcpk10/" game="tcpk10">头彩PK10</a></li>
            <li><a href="../xyft/" game="xyft">幸运飞艇</a></li>
            <li><a href="../cqssc/" game="cqssc">重庆时时彩</a></li>
            <li><a href="../tcssc/" game="tcssc">头彩时时彩</a></li>
<!--            <li><a href="../jsssc/" game="jsssc">极速时时彩</a></li>-->
            <li><a game="bjft" href="../bjft/">北京番摊</a></li>
            <li><a game="cqft" href="../cqft">重庆番摊</a></li>
            <li><a href="../jsk3/" game="jsk3">江苏快3</a></li>
            <li><a href="../gd11x5/" game="gd11x5">广东11选5</a></li>
            <li><a href="../gdkl10/" game="gdkl10">广东快乐十分</a></li>
            <li><a href="../pc28/" game="pc28">加拿大28</a></li>
            <li><a href="../txffc/" game="txffc" class="cur">腾讯分分彩</a></li>
        </ul>
    </div>
    <div class="fl xia-yx" id="xia-yx1"><?=$web_type?><span class="xialabt" id="xialabt1"></span> </div>

    <div class="fr"><a class="sp" href="shipin.php">开奖直播</a></div>
</div>
<ul class="kaij-mylist">
    <li class="kaij-mylist-li" id="gdkl10" style="border-bottom: 1px solid #eeeeee;">

        <div class="kaij-mylist-r">
            <div class="kaij-mylist-hd daojishi " style="padding-top: 0;">
                <div class="itm-time"><em id="period"></em>期开奖剩余：<span id="time" class="itm-time-time">01:27</span></div>
                <div class="itm-tit"><span class="itm-qih" id="qihao">第710580期</span></div>
            </div>
            <div class="kaij-mylist-bd">
                <div class="itm-result">
                    <div class="ball-wrap" id="number"><i class="ball-red">7</i><i class="ball-red">0</i><i class="ball-red">5</i><i class="ball-red">6</i><i class="ball-red">4</i></div>
                </div>
            </div>
        </div>

        <div class="bt-jg">总和 <span>18</span> <span>大</span><span>单</span><span class="span-2">尾大</span> 1-4龙虎<span>龙</span><span>虎</span><span>龙</span><span>龙</span></div>

    </li>

</ul>
<div class="gametool">
    <div class="fl" id="xia-yx2">两面统计<span class="xialabt " id="xialabt2"></span>


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


    </div>

    <!--    <ul class="fr">-->
    <!--        <input type="date" name="dateData" id="dateData" onchange="Search()"/>-->
    <!---->
    <!---->
    <!--    </ul>-->

</div>

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
		        	var d4=0;
		        	var d5=0;
		        	var d6=0;
		        	var d7=0;
		        	var d8=0;
		        	var d9=0;
		        	var d10=0;
		        	var x1=0;
		        	var x2=0;
		        	var x3=0;
		        	var x4=0;
		        	var x5=0;
		        	var x6=0;
		        	var x7=0;
		        	var x8=0;
		        	var x9=0;
		        	var x10=0;
		        	var s1=0;
		        	var s2=0;
		        	var s3=0;
		        	var s4=0;
		        	var s5=0;
		        	var s6=0;
		        	var s7=0;
		        	var s8=0;
		        	var s9=0;
		        	var s10=0;
		        	var da1=0;
		        	var da2=0;
		        	var da3=0;
		        	var da4=0;
		        	var da5=0;
		        	var da6=0;
		        	var da7=0;
		        	var da8=0;
		        	var da9=0;
		        	var da10=0;
		        	
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
			                    if(data.n4 % 2 !=0){
			                    	d4++;
			                    }
			                    if(data.n5 % 2 !=0){
			                    	d5++;
			                    }
			                    if(data.n6 % 2 !=0){
			                    	d6++;
			                    }
			                    if(data.n7 % 2 !=0){
			                    	d7++;
			                    }
			                    if(data.n8 % 2 !=0){
			                    	d8++;
			                    }
			                    if(data.n9 % 2 !=0){
			                    	d9++;
			                    }
			                    if(data.n10 % 2 !=0){
			                    	d10++;
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
			                    if(data.n4 % 2 ==0){
			                    	s4++;
			                    }
			                    if(data.n5 % 2 ==0){
			                    	s5++;
			                    }
			                    if(data.n6 % 2 ==0){
			                    	s6++;
			                    }
			                    if(data.n7 % 2 ==0){
			                    	s7++;
			                    }
			                    if(data.n8 % 2 ==0){
			                    	s8++;
			                    }
			                    if(data.n9 % 2 ==0){
			                    	s9++;
			                    }
			                    if(data.n10 % 2 ==0){
			                    	s10++;
			                    }	
	                
			                    if(data.n1<=5){
			                    	x1++;
			                    }
			                    if(data.n2<=5){
			                    	x2++;
			                    }
			                    if(data.n3<=5){
			                    	x3++;
			                    }
			                    if(data.n4<=5){
			                    	x4++;
			                    }
			                    if(data.n5<=5){
			                    	x5++;
			                    }
			                    if(data.n6<=5){
			                    	x6++;
			                    }
			                    if(data.n7<=5){
			                    	x7++;
			                    }
			                    if(data.n8<=5){
			                    	x8++;
			                    }
			                    if(data.n9<=5){
			                    	x9++;
			                    }
			                    if(data.n10<=5){
			                    	x10++;
			                    }	
                 		
			                    if(data.n1>5){
			                    	da1++;
			                    }
			                    if(data.n2>5){
			                    	da2++;
			                    }
			                    if(data.n3>5){
			                    	da3++;
			                    }
			                    if(data.n4>5){
			                    	da4++;
			                    }
			                    if(data.n5>5){
			                    	da5++;
			                    }
			                    if(data.n6>5){
			                    	da6++;
			                    }
			                    if(data.n7>5){
			                    	da7++;
			                    }
			                    if(data.n8>5){
			                    	da8++;
			                    }
			                    if(data.n9>5){
			                    	da9++;
			                    }
			                    if(data.n10>5){
			                    	da10++;
			                    }	
	                 				
	            	}
	            	
	            	

	            	html += '<tr class="head"><td colspan="6">第一球</td></tr><tr><td height="20">大</td><td height="20">小</td><td height="20">单</td><td height="20">双</td></tr><tr><td>'+da1+'</td><td>'+x1+'</td><td>'+d1+'</td><td>'+s1+'</td></tr>';
	            	html += '<tr class="head"><td colspan="6">第二球</td></tr><tr><td height="20">大</td><td height="20">小</td><td height="20">单</td><td height="20">双</td></tr><tr><td>'+da2+'</td><td>'+x2+'</td><td>'+d2+'</td><td>'+s2+'</td></tr>';
	            	html += '<tr class="head"><td colspan="6">第三球</td></tr><tr><td height="20">大</td><td height="20">小</td><td height="20">单</td><td height="20">双</td></tr><tr><td>'+da3+'</td><td>'+x3+'</td><td>'+d3+'</td><td>'+s3+'</td></tr>';
	            	html += '<tr class="head"><td colspan="6">第四球</td></tr><tr><td height="20">大</td><td height="20">小</td><td height="20">单</td><td height="20">双</td></tr><tr><td>'+da4+'</td><td>'+x4+'</td><td>'+d4+'</td><td>'+s4+'</td></tr>';
	            	html += '<tr class="head"><td colspan="6">第五球</td></tr><tr><td height="20">大</td><td height="20">小</td><td height="20">单</td><td height="20">双</td></tr><tr><td>'+da5+'</td><td>'+x5+'</td><td>'+d5+'</td><td>'+s5+'</td></tr>';
	            	html += '<tr class="head"><td colspan="6">第六球</td></tr><tr><td height="20">大</td><td height="20">小</td><td height="20">单</td><td height="20">双</td></tr><tr><td>'+da6+'</td><td>'+x6+'</td><td>'+d6+'</td><td>'+s6+'</td></tr>';
	            	html += '<tr class="head"><td colspan="6">第七球</td></tr><tr><td height="20">大</td><td height="20">小</td><td height="20">单</td><td height="20">双</td></tr><tr><td>'+da7+'</td><td>'+x7+'</td><td>'+d7+'</td><td>'+s7+'</td></tr>';
	            	html += '<tr class="head"><td colspan="6">第八球</td></tr><tr><td height="20">大</td><td height="20">小</td><td height="20">单</td><td height="20">双</td></tr><tr><td>'+da8+'</td><td>'+x8+'</td><td>'+d8+'</td><td>'+s8+'</td></tr>';

	            	html += '</tr>';
	   
	            	return html;
			    }
			    function shuangmiantongji() {
			    	layer.open({type: 2,time: 1});
					$.get("../../gdkl10/getHistoryData.do?adate",
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