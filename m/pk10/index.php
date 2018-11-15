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
    <link href="../style/res/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <script src="../style/res/jqPaginator.min.js" type="text/javascript"></script>
    <link href="../style/res/myPage.css" rel="stylesheet" type="text/css" />

</head>
<body>
<script>

</script>
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
        <a class="video2" >
            <img src="/m/style/images/ico_sp.png"><span>开奖直播</span>
        </a>

    </div>
</div>

<div class="pagger-box pagger" id="box"></div>
<script src="../style/js/paging.js"></script>
<script>
            function getDate(page){
                $.get("../../pk10/getHistoryData.do", { page:page,count:50,t: Math.random() }, function (result) {
                    if(result&&result.rows){
                        var j = 0;
                        var html = '';
                        for(var i in result.rows){
                            var data = result.rows[i];
                            $('.chooseIssue').append('<option value="'+data.termNum+'">'+data.termNum+'</option>');
                            html += '<div class="openCode">';
                            html += '<div class="qihao">'+'<div>'+'<span class="Issue">'+data.termNum +'</span>'+'期'+'</div>'+'<div>'+ data.lotteryTime.substring(10, 16)+'</div>'+'</div>';

                            html += '<div>'+'<a class="no' + data.n1 + '"'+'name'+'='+'"'+long(data.n1,data.n10 )+'"'+'>' + data.n1 + '</a>'
                                +'<a class="pk10'+DXClass(data.n1)+'"  style="display: none">' + DX(data.n1)+ '</a>'
                                +'<a class="pk10'+DSClass(data.n1)+'"  style="display: none">' + ds(data.n1)+ '</a>'
                                +'<a class="zuhe" style="display: none">' +(data.n1+data.n2)+ '</a>'
                                +'</div>';

                            html += '<div>'+'<a class="no' + data.n2 + '"'+'name'+'='+'"'+long(data.n2,data.n9 )+'"'+'>' + data.n2 + '</a>'
                                +'<a class="pk10'+DXClass(data.n2)+'"  style="display: none">' + DX(data.n2)+ '</a>'
                                +'<a class="pk10'+DSClass(data.n2)+'"  style="display: none">' + ds(data.n2)+ '</a>'
                                +'<a class="pk10'+getClass(data.n2,data.n1)+' '+'zuhe'+'"  style="display: none">' + dx(data.n2+data.n1)+ '</a>'
                                +'</div>';
                            html += '<div>'+'<a class="no' + data.n3 + '"'+'name'+'='+'"'+long(data.n3,data.n8 )+'"'+'>' + data.n3 + '</a>'
                                +'<a class="pk10'+DXClass(data.n3)+'"  style="display: none">' + DX(data.n3)+ '</a>'
                                +'<a class="pk10'+DSClass(data.n3)+'"  style="display: none">' + ds(data.n3)+ '</a>'
                                +'<a class="pk10'+getDSClass(data.n2,data.n1)+' '+'zuhe'+'"  style="display: none">' + ds(data.n2+data.n1)+ '</a>'
                                +'</div>';

                            html += '<div>'+'<a class="no' + data.n4 + '"'+'name'+'='+'"'+long(data.n4,data.n7 )+'"'+'>' + data.n4 + '</a>'
                                +'<a class="pk10'+DXClass(data.n4)+'"  style="display: none">' + DX(data.n4)+ '</a>'
                                +'<a class="pk10'+DSClass(data.n4)+'"  style="display: none">' + ds(data.n4)+ '</a>'
                                +'<a class="pk10'+lhClass(data.n1,data.n10)+' '+'zuhe'+'"  style="display: none">' + long(data.n1,data.n10)+ '</a>'
                                +'</div>';
                            html += '<div>'+'<a class="no' + data.n5 + '"'+'name'+'='+'"'+long(data.n5,data.n6 )+'"'+'>' + data.n5 + '</a>'
                                +'<a class="pk10'+DXClass(data.n5)+'"  style="display: none">' + DX(data.n5)+ '</a>'
                                +'<a class="pk10'+DSClass(data.n5)+'"  style="display: none">' + ds(data.n5)+ '</a>'
                                +'<a class="pk10'+lhClass(data.n2,data.n9)+' '+'zuhe'+'"  style="display: none">' + long(data.n2,data.n9)+ '</a>'
                                +'</div>';
                            html += '<div>'+'<a class="no' + data.n6 + '">' + data.n6 + '</a>'
                                +'<a class="pk10'+DXClass(data.n6)+'"  style="display: none">' + DX(data.n6)+ '</a>'
                                +'<a class="pk10'+DSClass(data.n6)+'"  style="display: none">' + ds(data.n6)+ '</a>'
                                +'<a class="pk10'+lhClass(data.n3,data.n8)+' '+'zuhe'+'"  style="display: none">' + long(data.n3,data.n8)+ '</a>'
                                +'</div>';
                            html += '<div>'+'<a class="no' + data.n7 + '">' + data.n7 + '</a>'
                                +'<a class="pk10'+DXClass(data.n7)+'"  style="display: none">' + DX(data.n7)+ '</a>'
                                +'<a class="pk10'+DSClass(data.n7)+'"  style="display: none">' + ds(data.n7)+ '</a>'
                                +'<a class="pk10'+lhClass(data.n4,data.n7)+' '+'zuhe'+'"  style="display: none">' + long(data.n4,data.n7)+ '</a>'
                                +'</div>';
                            html += '<div>'+'<a class="no' + data.n8 + '">' + data.n8 + '</a>'
                                +'<a class="pk10'+DXClass(data.n8)+'"  style="display: none">' + DX(data.n8)+ '</a>'
                                +'<a class="pk10'+DSClass(data.n8)+'"  style="display: none">' + ds(data.n8)+ '</a>'
                                +'<a class="pk10'+lhClass(data.n5,data.n6)+' '+'zuhe'+'"  style="display: none">' + long(data.n5,data.n6)+ '</a>'
                                +'</div>';
                            html += '<div class="lastDiv">'+'<a class="no' + data.n9 + '">' + data.n9 + '</a>'
                                +'<a class="pk10'+DXClass(data.n9)+'"  style="display: none">' + DX(data.n9)+ '</a>'
                                +'<a class="pk10'+DSClass(data.n9)+'"  style="display: none">' + ds(data.n9)+ '</a>'+'</div>';
                            html += '<div class="lastDiv">'+'<a class="no' + data.n10 + '">' + data.n10 + '</a>'
                                +'<a class="pk10'+DXClass(data.n10)+'"  style="display: none">' + DX(data.n10)+ '</a>'
                                +'<a class="pk10'+DSClass(data.n10)+'"  style="display: none">' + ds(data.n10)+ '</a>'+'</div>';
                            html += '</div>';

                            j++;
                        }
                        $("#historyList").html(html);
                    }else {
                        $("#historyList").html("<p>对不起，今天暂无数据，请按日期检索！</p>");
                    }
                }, "json");
            }
</script>
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
<div class="choose" id="chooseNum" style="display: none">
    <div class="chooseRow1 chooseRow1-on">
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
    <a>组合</a>
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
<div class="BallNum zuhe" style="display: none">
    <div class="BallNumHead">
        <a class="issue">期号</a>
        <a>组合</a>
        <a>组合</a>
        <a>组合</a>
        <a>冠军</a>
        <a>亚军</a>
        <a>季军</a>
        <a>第四</a>
        <a class="lastA">第五</a>
    </div>
</div>
<div id="historyList"></div>

<?php include("../public/footer.php"); ?>
<script type="text/javascript">





    $(function () {
        //显示默认日期
        var now = new Date();


        $("#dateTime").val(now.getFullYear()+"-"+((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1)+"-"+(now.getDate()<10?"0":"")+now.getDate());
        $(".dataYMD").html( $("#dateTime").val());
        $('.dataWeed').html(getWeed($("#dateTime").val()))


        //提取记录
        //getHistoryData('15','');


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
            $('.lastDiv').show();
            $('.openCode a').show();
            $('.BallNum').show();
            $('.zuhe').hide();
            $('.pk10Da').hide();
            $('.pk10Xiao').hide();
            $('.pk10Dan').hide();
            $('.pk10Shuang').hide();
            $('.choose').show();
        }else if($(this).text()=='大小'){
            $('.lastDiv').show();
            $('.openCode a').hide();
            $('.BallNum').show();
            $('.zuhe').hide();
            $('.pk10Dan').hide();
            $('.pk10Shuang').hide();
            $('.pk10Da').show();
            $('.pk10Xiao').show();
        }else if($(this).text()=='单双'){
            $('.lastDiv').show();
            $('.openCode a').hide();
            $('.BallNum').show();
            $('.zuhe').hide();
            $('.pk10Da').hide();
            $('.pk10Xiao').hide();
            $('.pk10Dan').show();
            $('.pk10Shuang').show();
        }else if($(this).text()=='号码'){
            $('.lastDiv').show();
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
            $('.lastDiv').hide();
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
    $('#dateTime').change(function () {
        arr=[];
        issueStr = '';
        $('.openCode a').show();
        $('.BallNum').show();
        $('.zuhe').hide();
        $('.pk10Da').hide();
        $('.pk10Xiao').hide();
        $('.pk10Dan').hide();
        $('.pk10Shuang').hide();
        $('#chooseNum a').removeClass('chooseTypeColor');
        $('#chooseType2 a').removeClass('chooseTypeColor');
        $('#chooseType a').removeClass('chooseTypeColor');
        getHistoryData('15', $("#dateTime").val());
        $(".dataYMD").html( $("#dateTime").val());
        $('.dataWeed').html(getWeed($("#dateTime").val()))
        return false;
    });
    //刷新
    function refresh(){

        getHistoryData('15','');

    }



</script>
<script src="../style/js/common.js?v=<?php echo date("Y/m/d")?>" type="text/javascript"></script>
</body>
</html>
