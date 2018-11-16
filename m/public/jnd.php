
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
                if(result&&result.rows) {
                    var j = 0;
                    var html = '';
                    for (var i in result.rows) {
                        var data = result.rows[i];
                        var clsName = "even";
                        if (j % 2 == 0) {
                            clsName = "odd";
                        }
                        var totalNum_a = data.n2 + data.n5 + data.n8 + data.n11 + data.n14 + data.n17;
                        var totalNum_b = data.n3 + data.n6 + data.n9 + data.n12 + data.n15 + data.n18;
                        var totalNum_c = data.n4 + data.n7 + data.n10 + data.n13 + data.n16 + data.n19;
                        totalNum_a = totalNum_a % 10;
                        totalNum_b = totalNum_b % 10;
                        totalNum_c = totalNum_c % 10;
                        var totalNum = totalNum_a + totalNum_b + totalNum_c;
                        var sebo = "";
                        var danshaung = "";
                        if (totalNum == 1 || totalNum == 4 || totalNum == 7 || totalNum == 10 || totalNum == 16 || totalNum == 19 || totalNum == 22 || totalNum == 25) {
                            sebo = '绿';
                        } else if (totalNum == 2 || totalNum == 5 || totalNum == 8 || totalNum == 11 || totalNum == 17 || totalNum == 20 || totalNum == 23 || totalNum == 26) {
                            sebo = '蓝';
                        } else if (totalNum == 3 || totalNum == 6 || totalNum == 9 || totalNum == 12 || totalNum == 15 || totalNum == 18 || totalNum == 21 || totalNum == 24) {
                            sebo = '红';
                        } else if (totalNum == 0 || totalNum == 13 || totalNum == 14 || totalNum == 27) {
                            sebo = '和';
                        }
                        if (totalNum == 13 || totalNum == 14) {
                            danshaung = '和';
                        } else if (totalNum < 13 && totalNum > 5) {
                            danshaung = '小';
                        } else if (totalNum < 22 && totalNum > 14) {
                            danshaung = '大';
                        } else if (totalNum <= 5 && totalNum >= 0) {
                            danshaung = '极小';
                        } else if (totalNum <= 27 && totalNum >= 22) {
                            danshaung = '极大';
                        }
                        var dx;
                        if (totalNum % 2 == 0) {
                            dx = '双';
                        } else {
                            dx = '单';
                        }
                        $('.chooseIssue').append('<option value="' + data.termNum + '">' + data.termNum + '</option>');
                        html += '<div class="openCode">';
                        html += '<div class="qihao">' + '<div>' + '<span class="Issue">' + data.termNum + '</span>' + '期' + '</div>' + '<div>' + data.lotteryTime.substring(10, 16) + '</div>' + '</div>';
                        html += '<div>' + '<a class="ball-red">' + totalNum_a + '</a>' + '</div>';
                        html += '<div>' + '<a class="ball-red">' + totalNum_b + '</a>' + '</div>';
                        html += '<div>' + '<a class="ball-red">' + totalNum_c + '</a>' + '</div>';
                        html += '<div>' + '<a >' + totalNum + '</a>' + '</div>';
                        if (danshaung == '极大' || danshaung == '极小') {
                            html += '<div>' + '<a >' + danshaung + '</a>' + '</div>';
                        } else {
                            if (danshaung == '大') {
                                html += '<div>' + '<a >' + danshaung + '</a>' + '</div>';
                            } else {
                                html += '<div>' + '<a >' + danshaung + '</a>' + '</div>';
                            }
                        }
                        if (dx == '单') {
                            html += '<div>' + '<a >' + dx + '</a>' + '</div>';
                        } else {
                            html += '<div>' + '<a >' + dx + '</a>' + '</div>';
                        }


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