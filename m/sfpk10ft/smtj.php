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
<?php include("../public/pk10Head.php"); ?>
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
	            	
	            	

	            	html += '<tr class="head"><td colspan="6">冠军</td></tr><tr><td height="20">大</td><td height="20">小</td><td height="20">单</td><td height="20">双</td></tr><tr><td>'+da1+'</td><td>'+x1+'</td><td>'+d1+'</td><td>'+s1+'</td></tr>';
	            	html += '<tr class="head"><td colspan="6">亚军</td></tr><tr><td height="20">大</td><td height="20">小</td><td height="20">单</td><td height="20">双</td></tr><tr><td>'+da2+'</td><td>'+x2+'</td><td>'+d2+'</td><td>'+s2+'</td></tr>';
	            	html += '<tr class="head"><td colspan="6">第三名</td></tr><tr><td height="20">大</td><td height="20">小</td><td height="20">单</td><td height="20">双</td></tr><tr><td>'+da3+'</td><td>'+x3+'</td><td>'+d3+'</td><td>'+s3+'</td></tr>';
	            	html += '<tr class="head"><td colspan="6">第四名</td></tr><tr><td height="20">大</td><td height="20">小</td><td height="20">单</td><td height="20">双</td></tr><tr><td>'+da4+'</td><td>'+x4+'</td><td>'+d4+'</td><td>'+s4+'</td></tr>';
	            	html += '<tr class="head"><td colspan="6">第五名</td></tr><tr><td height="20">大</td><td height="20">小</td><td height="20">单</td><td height="20">双</td></tr><tr><td>'+da5+'</td><td>'+x5+'</td><td>'+d5+'</td><td>'+s5+'</td></tr>';
	            	html += '<tr class="head"><td colspan="6">第六名</td></tr><tr><td height="20">大</td><td height="20">小</td><td height="20">单</td><td height="20">双</td></tr><tr><td>'+da6+'</td><td>'+x6+'</td><td>'+d6+'</td><td>'+s6+'</td></tr>';
	            	html += '<tr class="head"><td colspan="6">第七名</td></tr><tr><td height="20">大</td><td height="20">小</td><td height="20">单</td><td height="20">双</td></tr><tr><td>'+da7+'</td><td>'+x7+'</td><td>'+d7+'</td><td>'+s7+'</td></tr>';
	            	html += '<tr class="head"><td colspan="6">第八名</td></tr><tr><td height="20">大</td><td height="20">小</td><td height="20">单</td><td height="20">双</td></tr><tr><td>'+da8+'</td><td>'+x8+'</td><td>'+d8+'</td><td>'+s8+'</td></tr>';
	            	html += '<tr class="head"><td colspan="6">第九名</td></tr><tr><td height="20">大</td><td height="20">小</td><td height="20">单</td><td height="20">双</td></tr><tr><td>'+da9+'</td><td>'+x9+'</td><td>'+d9+'</td><td>'+s9+'</td></tr>';
	            	html += '<tr class="head"><td colspan="6">第十名</td></tr><tr><td height="20">大</td><td height="20">小</td><td height="20">单</td><td height="20">双</td></tr><tr><td>'+da10+'</td><td>'+x10+'</td><td>'+d10+'</td><td>'+s10+'</td></tr>';

	            	html += '</tr>';
	   
	            	return html;
			    }
			    function shuangmiantongji() {
			    	layer.open({type: 2,time: 1});
					$.get("../../sfpk10/getHistoryData.do?count=179",
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