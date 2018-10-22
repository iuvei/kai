<footer class="footer">
<!-- 游戏列表切换-->
    <script type="text/javascript">
        $(document).ready(function(){
            $("#xia-yx1").click(function(){
                $("#xialabt1").toggleClass("xialabt-on");
                $("#xia-yxx-list1").toggle();
            });
            $("#xia-yx2").click(function(){
                $("#xialabt2").toggleClass("xialabt-on");
                $("#xia-yxx-list2").toggle();
            });

        });
    </script>
<div class="footer_nav">
  <span>触屏版</span>｜<a href="../">电脑版</a> | 
</div>
    
<div class="hot_phone">易记域名：<?php echo $_SERVER['HTTP_HOST']; ?></div>
<p class="footer_copy">2016 <?=$webtitle?> 版权所有 </p>
</footer>