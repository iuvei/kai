<script src="/m/style/js/paging.js" type="text/javascript"></script>
<link href="/m/style/css/paging.css" rel="stylesheet" type="text/css" />
<div class="pagger-box pagger" id="box"></div>
<script>
    $('#box').paging({
        callback: function(page) { // 回调函数
            console.log(page);
        }
    })
</script>