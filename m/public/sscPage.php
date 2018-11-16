
<script src="/m/style/js/jqPaginator.min.js" type="text/javascript"></script>
<link href="/m/style/css/myPage.css" rel="stylesheet" type="text/css" />
<form id="form1" runat="server">
    <div>
        <!--PageCount是一共多少条数据-->
        <ul class="pagination" id="pagination"></ul>
        <input type="hidden" id="PageCount" runat="server" />
        <!--PageSize是页面显示多少条数据-->
        <input type="hidden" id="PageSize" runat="server" value="50" />
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
            $.get('../../'+gamekey+'/getHistoryData.do',{ page:page,offset:50,date:date,t: Math.random() }, function (result) {
                if(result&&result.rows){
                    var j = 0;
                    var html = '';
                    if(gamekey=='cqssc'||gamekey=='gd11x5'){
                        for(var i in result.rows) {
                            var data = result.rows[i];
                            html += '<div class="openCode">';
                            html += '<div class="qihao">' + '<div>' + '<span class="Issue">' + data.termNum.substr(4) + '</span>' + '期' + '</div>' + '<div>' + data.lotteryTime.substring(10, 16) + '</div>' + '</div>';
                            /*数字*/
                            html += '<div>' + '<a class="sscBall">' + data.n1 + '</a>' +
                                '<a class="ssc' + DXClass(data.n1) + '"  style="display: none">' + DX(data.n1) + '</a>' +
                                '<a class="ssc' + DSClass(data.n1) + '"  style="display: none">' + ds(data.n1) + '</a>'
                                + '</div>';
                            html += '<div>' + '<a class="sscBall">' + data.n2 + '</a>' +
                                '<a class="ssc' + DXClass(data.n2) + '"  style="display: none">' + DX(data.n2) + '</a>'
                                + '<a class="ssc' + DSClass(data.n2) + '"  style="display: none">' + ds(data.n2) + '</a>'
                                + '</div>';
                            html += '<div>' + '<a class="sscBall">' + data.n3 + '</a>' +
                                '<a class="ssc' + DXClass(data.n3) + '"  style="display: none">' + DX(data.n3) + '</a>'
                                + '<a class="ssc' + DSClass(data.n3) + '"  style="display: none">' + ds(data.n3) + '</a>'
                                + '</div>';
                            html += '<div>' + '<a class="sscBall">' + data.n4 + '</a>' +
                                '<a class="ssc' + DXClass(data.n4) + '"  style="display: none">' + DX(data.n4) + '</a>'
                                + '<a class="ssc' + DSClass(data.n4) + '"  style="display: none">' + ds(data.n4) + '</a>'
                                + '</div>';
                            html += '<div>' + '<a class="sscBall">' + data.n5 + '</a>' +
                                '<a class="ssc' + DXClass(data.n5) + '"  style="display: none">' + DX(data.n5) + '</a>'
                                + '<a class="ssc' + DSClass(data.n5) + '"  style="display: none">' + ds(data.n5) + '</a>'
                                + '</div>';

                            var guanyahe = arr_num(data.lotteryNum);
                            var sum = eval(guanyahe.join("+"));
                            html += '<div>' + '<a>' + sum + '</a>' + '</div>';
                            html += '<div>' + '<a>' + dx(sum) + '</a>' + '</div>';
                            html += '<div>' + '<a>' + ds(sum) + '</a>' + '</div>';
                            html += '<div>' + '<a>' + long(data.n1, data.n5) + '</a>' + '</div>';

                            html += '</div>';
                            j++;
                        }
                    }else if(gamekey=='tcssc'||gamekey=='sfssc'||gamekey=='txffc'){
                        for(var i in result.rows) {
                            var data = result.rows[i];
                            html += '<div class="openCode">';
                            html += '<div class="qihao">' + '<div>' + '<span class="Issue">' + data.termNum.substr(6) + '</span>' + '期' + '</div>' + '<div>' + data.lotteryTime.substring(10, 16) + '</div>' + '</div>';
                            /*数字*/
                            html += '<div>' + '<a class="sscBall">' + data.n1 + '</a>' +
                                '<a class="ssc' + DXClass(data.n1) + '"  style="display: none">' + DX(data.n1) + '</a>' +
                                '<a class="ssc' + DSClass(data.n1) + '"  style="display: none">' + ds(data.n1) + '</a>'
                                + '</div>';
                            html += '<div>' + '<a class="sscBall">' + data.n2 + '</a>' +
                                '<a class="ssc' + DXClass(data.n2) + '"  style="display: none">' + DX(data.n2) + '</a>'
                                + '<a class="ssc' + DSClass(data.n2) + '"  style="display: none">' + ds(data.n2) + '</a>'
                                + '</div>';
                            html += '<div>' + '<a class="sscBall">' + data.n3 + '</a>' +
                                '<a class="ssc' + DXClass(data.n3) + '"  style="display: none">' + DX(data.n3) + '</a>'
                                + '<a class="ssc' + DSClass(data.n3) + '"  style="display: none">' + ds(data.n3) + '</a>'
                                + '</div>';
                            html += '<div>' + '<a class="sscBall">' + data.n4 + '</a>' +
                                '<a class="ssc' + DXClass(data.n4) + '"  style="display: none">' + DX(data.n4) + '</a>'
                                + '<a class="ssc' + DSClass(data.n4) + '"  style="display: none">' + ds(data.n4) + '</a>'
                                + '</div>';
                            html += '<div>' + '<a class="sscBall">' + data.n5 + '</a>' +
                                '<a class="ssc' + DXClass(data.n5) + '"  style="display: none">' + DX(data.n5) + '</a>'
                                + '<a class="ssc' + DSClass(data.n5) + '"  style="display: none">' + ds(data.n5) + '</a>'
                                + '</div>';

                            var guanyahe = arr_num(data.lotteryNum);
                            var sum = eval(guanyahe.join("+"));
                            html += '<div>' + '<a>' + sum + '</a>' + '</div>';
                            html += '<div>' + '<a>' + dx(sum) + '</a>' + '</div>';
                            html += '<div>' + '<a>' + ds(sum) + '</a>' + '</div>';
                            html += '<div>' + '<a>' + long(data.n1, data.n5) + '</a>' + '</div>';

                            html += '</div>';
                            j++;
                        }
                    }else if(gamekey=='cqft'){
                        for(var i in result.rows){
                            var data = result.rows[i];
                            $('.chooseIssue').append('<option value="'+data.termNum.substr(4)+'">'+data.termNum.substr(4)+'</option>');
                            html += '<div class="openCode">';
                            html += '<div class="qihao">'+'<div>'+'<span class="Issue">'+data.termNum.substr(4)+'</span>' +'期'+'</div>'+'<div>'+ data.lotteryTime.substring(10, 16)+'</div>'+'</div>';
                            /*数字*/
                            html += '<div>'+'<a class="sscBall">' + data.n1 + '</a>'+ '</div>';
                            html += '<div>'+'<a class="sscBall">' + data.n2 + '</a>'+ '</div>';
                            html += '<div>'+'<a class="sscBall">' + data.n3 + '</a>'+ '</div>';
                            html += '<div>'+'<a class="sscBall">' + data.n4 + '</a>'+ '</div>';
                            html += '<div>'+'<a class="sscBall">' + data.n5 + '</a>'+ '</div>';

                            var tan_num = [data.n1,data.n2,data.n3,data.n4,data.n5];
                            tan_num = tan(tan_num);
                            var guanyahe = arr_num(data.lotteryNum);
                            var sum = eval(guanyahe.join("+"));
                            html += '<div>'+'<a>'+ sum + '</a>'+'</div>';
                            html += '<div>'+'<a class="sscBall cqft">'+ tan_num + '</a>'+'</div>';
                            html += '<div>'+'<a>'+ dx(sum) + '</a>'+'</div>';
                            html += '<div>'+'<a>'+ ds(sum) + '</a>'+'</div>';


                            html += '</div>';

                            j++;
                        }
                    }
                    $("#historyList").html(html);
                    $('#form1').show();
                    $('.pageLod').hide();
                }else {
                    $("#historyList").html("<p>对不起，今天暂无数据，请按日期检索！</p>");
                }
            }, "json");
        }

    </script>
</form>