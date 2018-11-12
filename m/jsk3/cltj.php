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
<div class="changlongtj " style="left: 0rem; display: block;">
    <div class="line2box">
        <ul id="longDrag"><li><span>冠军</span>：<span>双</span><span style="color:#f11821">7</span>期</li><li><span>第三名</span>：<span>龙</span><span style="color:#f11821">6</span>期</li><li><span>第五名</span>：<span>大</span><span style="color:#f11821">5</span>期</li><li><span>第八名</span>：<span>小</span><span style="color:#f11821">5</span>期</li><li><span>第八名</span>：<span>单</span><span>4</span>期</li><li><span>第五名</span>：<span>双</span><span>3</span>期</li><li><span>冠军</span>：<span>小</span><span>2</span>期</li><li><span>第三名</span>：<span>单</span><span>2</span>期</li><li><span>第四名</span>：<span>大</span><span>2</span>期</li><li><span>第四名</span>：<span>龙</span><span>2</span>期</li></ul>
    </div>
</div>

<!--<table class="lot-table">-->
<!--			<thead>-->
<!--					<tr class="head">-->
<!--					-->
<!--				  <td>长龙连开统计</td>-->
<!--              -->
<!---->
<!--				  </tr>-->
<!--				  </thead>-->
<!--				<tbody id="changlong">-->
<!--				<tr>-->
<!--					<td>-->
<!--						<img src="../style/images/loading2.gif">					</td>-->
<!--				<tr>-->
<!--				</tbody>-->
<!--</table> -->


   
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