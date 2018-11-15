
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
                        UpData(num,date);
                        exeData(num, type);
                    }
                }
            });
        }
        function UpData(page,date) {
            $.get("../../pk10/getHistoryData.do", { page:page,offset:15,date:date,t: Math.random() }, function (result) {
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
</form>