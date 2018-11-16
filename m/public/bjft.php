
<script src="/m/style/js/jqPaginator.min.js" type="text/javascript"></script>
<link href="/m/style/css/myPage.css" rel="stylesheet" type="text/css" />
<form id="form1" runat="server">
    <div>
        <!--PageCount是一共多少条数据-->
        <ul class="pagination" id="pagination"></ul>
        <input type="hidden" id="PageCount" runat="server" />
        <!--PageSize是页面显示多少条数据-->
        <input type="hidden" id="PageSize" runat="server" value="15" />
        <!--countindex这个参数是通过上面的PageCount与PageSize计算出来的分多少页-->
        <!--js中是自动计算的，可默认也可以自己填-->
        <input type="hidden" id="countindex" runat="server" value="10"/>
        <!--设置最多显示的页码数 可以手动设置 默认为7-->
        <input type="hidden" id="visiblePages" runat="server" value="5" />
        <input type="hidden" id="dateSle" value="" />
        <input type="hidden" id="gamekey" value="" />
    </div>
    <!--    <script src="/m/style/js/myPage.js" type="text/javascript"></script>-->
    <script type="text/javascript">
        function loadData(num) {
            $("#PageCount").val(num);
        }
        function exeData(num, type) {
            loadData(num);
            loadpage();
        }
        function loadpage(date,gamekey) {
            $("#dateSle").val(date);
            $("#dateSle").val(gamekey);
            var myPageCount = parseInt($("#PageCount").val());
            var myPageSize = parseInt($("#PageSize").val());
            var countindex = myPageCount % myPageSize > 0 ? (myPageCount / myPageSize) + 1 : (myPageCount / myPageSize);
            $("#countindex").val(countindex);
            $.jqPaginator('#pagination', {
                totalPages: parseInt($("#countindex").val()),
                visiblePages: parseInt($("#visiblePages").val()),
                currentPage: 1,
                first: '<li class="first"><a href="javascript:;">首页</a></li>',
                prev: '<li class="prev"><a href="javascript:;"><i class="arrow arrow2"></i>上页</a></li>',
                next: '<li class="next"><a href="javascript:;">下页<i class="arrow arrow3"></i></a></li>',
                last: '<li class="last"><a href="javascript:;">末页</a></li>',
                page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
                onPageChange: function (num, type) {
                    if (type == "change") {
                        $('#form1').hide();
                        $('.pageLod').show();
                        UpData(num,date,gamekey);
                        exeData(num, type);
                    }
                }
            });
        }
        function UpData(page,date,gamekey) {
            $.get('../../'+gamekey+'/getHistoryData.do',{ page:page,offset:15,date:date,t: Math.random() }, function (result) {
                if(result&&result.rows) {
                    var j = 0;
                    var html = '';
                    for(var i in result.rows){
                        var data = result.rows[i];



                        var tan = Number(data.n1) + Number(data.n2) + Number(data.n3);
                        var tan2 = Number(data.n5) + Number(data.n6) + Number(data.n7);
                        var tan3 = Number(data.n8) + Number(data.n9) + Number(data.n10);
                        var tan_2 = tan%4;
                        if(tan_2 == 0){
                            tan_2 = 4;
                        }
                        var dx='';
                        var ftds =''
                        if(tan_2%2 ==0){
                            dx = '双';
                            ftds='Shuang'

                        }else {
                            dx = '单';
                            ftds='Dan'
                        }
                        var ds='';
                        if(tan_2 <=2){
                            ds = '小';
                        }else {
                            ds = '大';
                        }
                        var tan_3 = tan2%4;
                        if(tan_3 == 0){
                            tan_3 = 4;
                        }
                        var dx2='';
                        var ftds2 ='';
                        if(tan_3%2 ==0){
                            dx2 = '双';
                            ftds2='Shuang'
                        }else {
                            dx2 = '单';
                            ftds2='Dan'
                        }
                        var ds2='';
                        if(tan_3 <=2){
                            ds2 = '小';
                        }else {
                            ds2 = '大';
                        }
                        var tan_4 = tan3%4;
                        if(tan_4 == 0){
                            tan_4 = 4;
                        }
                        var dx3='';
                        var ftds3 ='';
                        if(tan_4%2 ==0){
                            ftds3 ='Shuang';
                            dx3 = '双';
                        }else {
                            dx3 = '单';
                            ftds3 ='Dan';
                        }
                        var ds3='';
                        if(tan_4 <=2){
                            ds3 = '小';
                        }else {
                            ds3 = '大';
                        }
                        $('.chooseIssue').append('<option value="'+data.termNum+'">'+data.termNum+'</option>');
                        html += '<div class="openCode">';
                        html += '<div class="qihao">'+'<div>'+'<span class="Issue">'+data.termNum +'</span>'+'期'+'</div>'+'<div>'+ data.lotteryTime.substring(10, 16)+'</div>'+'</div>';
                        html += '<div>'
                            +'<a class="no' + data.n1 +' '+'flm' +'"'+'>' + data.n1 + '</a>'
                            +'<a class="no' + data.n2 +' '+'flm' +'"'+'>' + data.n2 + '</a>'
                            +'<a class="no' + data.n3 +' '+'flm' +'"'+'>' + data.n3 + '</a>'
                            +'<div class="tanLu" style="display: none">'+'<span>番摊 : </span>'+'<span class="no4">'+tan_2+'</span>' + '</div>'
                            +'<div class="tanLuDs" style="display: none">'+'<span>单双 : </span>'+'<span class="'+'pk10'+ftds+'">'+dx+'</span>' + '</div>'
                            +'</div>';
                        html += '<div>'
                            +'<a class="no' + data.n5 +' '+'flm' +'"'+'>' + data.n5 + '</a>'
                            +'<a class="no' + data.n6 +' '+'flm' +'"'+'>' + data.n6 + '</a>'
                            +'<a class="no' + data.n7 +' '+'flm' +'"'+'>' + data.n7 + '</a>'
                            +'<div class="tanLu" style="display: none">'+'<span>番摊 : </span>'+'<span class="no4">'+tan_3+'</span>' + '</div>'
                            +'<div class="tanLuDs" style="display: none">'+'<span>单双 : </span>'+'<span class="'+'pk10'+ftds2+'">'+dx2+'</span>' + '</div>'
                            +'</div>';
                        html += '<div>'
                            +'<a class="no' + data.n8 +' '+'flm' +'"'+'>' + data.n8 + '</a>'
                            +'<a class="no' + data.n9 +' '+'flm' +'"'+'>' + data.n9 + '</a>'
                            +'<a class="no' + data.n10 +' '+'flm' +'"'+'>' + data.n10 + '</a>'
                            +'<div class="tanLu" style="display: none">'+'<span>番摊 : </span>'+'<span class="no4">'+tan_4+'</span>' + '</div>'
                            +'<div class="tanLuDs" style="display: none">'+'<span>单双 : </span>'+'<span class="'+'pk10'+ftds3+'">'+dx3+'</span>' + '</div>'
                            +'</div>';
                        html += '</div>';
                        j++;
                    }
                }
                $("#historyList").html(html);
                $('#form1').show();
                $('.pageLod').hide();
            }, "json");
        }

    </script>
</form>