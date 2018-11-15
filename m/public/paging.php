
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
    </div>
    <script src="/m/style/js/myPage.js" type="text/javascript"></script>
    <script type="text/javascript">




        function loadData(num) {
            $("#PageCount").val(num);
        }
        var onlyEvent = false;
        function exeData(num, type) {
            loadData(num);
            loadpage();
        }
        function loadpage(date) {
                $("#dateSle").val(date);
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
                            UpData(num,date);
                            exeData(num, type);
                        }
                    }
                });
        }

    </script>
</form>