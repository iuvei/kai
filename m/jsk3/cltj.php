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





</head>
<body>



<?php include("../public/header.php"); ?>


   
<script src="award.js" type="text/javascript"></script>
<link type="text/css" href="../style/css/pk10.css" rel="stylesheet">
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

    <div class="fr"><a class="sp" href="shipin.php">开奖直播</a></div>
</div>

<ul class="kaij-mylist">
    <li class="kaij-mylist-li" id="jsk3" style="border-bottom: 1px solid #eeeeee;">

        <div class="kaij-mylist-r">
            <div class="kaij-mylist-hd daojishi " style="padding-top: 0;">
                <div class="itm-time"><em id="period"></em>期开奖剩余：<span id="time" class="itm-time-time">01:27</span></div>
                <div class="itm-tit"><span class="itm-qih" id="qihao">第710580期</span></div>
            </div>
            <div class="kaij-mylist-bd">
                <div class="itm-result">
                    <div class="ball-wrap" id="number"><i class="num3"></i><i class="num4"></i><i class="num6"></i><span class="ball-red">15</span><span class="ball-red">大</span></div>
                </div>
            </div>
        </div>



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


    </div>

    <!--    <ul class="fr">-->
    <!--        <input type="date" name="dateData" id="dateData" onchange="Search()"/>-->
    <!---->
    <!---->
    <!--    </ul>-->

</div>
<div class="changlongtj " style="left: 0rem; display: block;">
    <div class="line2box">
        <ul id="longDrag"><li><span>冠军</span>：<span>双</span><span style="color:#f11821">7</span>期</li><li><span>第三名</span>：<span>龙</span><span style="color:#f11821">6</span>期</li><li><span>第五名</span>：<span>大</span><span style="color:#f11821">5</span>期</li><li><span>第八名</span>：<span>小</span><span style="color:#f11821">5</span>期</li><li><span>第八名</span>：<span>单</span><span>4</span>期</li><li><span>第五名</span>：<span>双</span><span>3</span>期</li><li><span>冠军</span>：<span>小</span><span>2</span>期</li><li><span>第三名</span>：<span>单</span><span>2</span>期</li><li><span>第四名</span>：<span>大</span><span>2</span>期</li><li><span>第四名</span>：<span>龙</span><span>2</span>期</li></ul>
    </div>
</div>

<table class="lot-table">
			<thead>
					<tr class="head">
					
				  <td>长龙连开统计</td>
              

				  </tr>
				  </thead>
				<tbody id="changlong">
				<tr>
					<td>
						<img src="../style/images/loading2.gif">					</td>
				<tr>
				</tbody>
</table>


   
<?php include("../public/footer.php"); ?>
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
 <script type="text/javascript">
     chang();
     function chang() {
         var id = "<?= $name?>";
         layer.open({type: 2,time: 1});
         $.get("/Fuzhi/Api/cllz", {id:id}, function (result) {
             var data = eval(result);
             console.log(data.length);
             dataLen = data.length;
             var name;
             name = ['第一球','第二球','第三球'];
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

 $(function () {
	 changLong();
 });
 function changLong() {
	 layer.open({type: 2,time: 1});
     var id = "<?= $name?>";
     $.get("/Fuzhi/Api/changlong", {id:id}, function (data) {
     	if(data){
     		var html = '';
     		 for(var o in data){  
     		        html += '<tr><td>'+data[o].title+" "+data[o].num+' 期</td></tr>';
     		      }  
     	}
     	$("#changlong").html(html);
     	
     },"json");
 }
			</script> 
</body>
</html>