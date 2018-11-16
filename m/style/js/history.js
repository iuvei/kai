$(function () {

    /*期数*/
    var issueStr = '';

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
        $('.sscBall').removeClass('sscBallNoColor');
        $('.choose').hide();

        $('#chooseType a').removeClass('chooseTypeColor');
        $('#chooseType2 a').removeClass('chooseTypeColor');
        $(this).addClass('chooseTypeColor');
        if( $(this).text()=='筛选'){
            $('.sscDa').hide();
            $('.sscXiao').hide();
            $('.sscDan').hide();
            $('.sscShuang').hide();
            $('.choose').show();
            $('.sscBall').show();
        }else if($(this).text()=='大小'){
            $('.sscBall').hide();
            $('.sscDan').hide();
            $('.sscShuang').hide();
            $('.sscDa').show();
            $('.sscXiao').show();
        }else if($(this).text()=='单双'){
            $('.sscBall').hide();
            $('.sscDa').hide();
            $('.sscXiao').hide();
            $('.sscDan').show();
            $('.sscShuang').show();
        }else if($(this).text()=='号码'){
            $('.sscDa').hide();
            $('.sscXiao').hide();
            $('.sscDan').hide();
            $('.sscShuang').hide();
            $('.sscBall').show();
        }

    });
    /*筛选数字*/
    var arr=[]
    $('#chooseNum a').click(function () {
        $('.sscBall').addClass('sscBallNoColor');
        $('#chooseType2 a').removeClass('chooseTypeColor');
        if(arr.toString().indexOf($(this).text())!= -1){
            $(this).removeClass('chooseTypeColor');
            arr.splice($.inArray($(this).text(), arr), 1)
        }else {
            $(this).addClass('chooseTypeColor');
            arr.push($(this).text());
        }
        for (var i=0;i<$('.sscBall').text().length;i++){

            if($.inArray($('.sscBall').eq([i]).text(),arr)!=-1){
                $('.sscBall').eq([i]).removeClass('sscBallNoColor')
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
            arr=[];
            $('#chooseNum a').removeClass('chooseTypeColor')
            $('.sscBall').removeClass('sscBallNoColor');
            $('.choose').hide();
        }else if($(this).text()=='大'){
            $('.sscBall').addClass('sscBallNoColor');
            for (var i=0;i<$('.sscBall').text().length;i++){
                if($('.sscBall').eq([i]).text()>=5){
                    $('.sscBall').eq([i]).removeClass('sscBallNoColor')
                }
            }
        }else if($(this).text()=='小'){
            $('.sscBall').addClass('sscBallNoColor');
            for (var i=0;i<$('.sscBall').text().length;i++){
                if($('.sscBall').eq([i]).text()<5){
                    $('.sscBall').eq([i]).removeClass('sscBallNoColor')
                }
            }
        }else if($(this).text()=='单'){
            $('.sscBall').addClass('sscBallNoColor');
            for (var i=0;i<$('.sscBall').text().length;i++){
                if($('.sscBall').eq([i]).text()%2!=0){
                    $('.sscBall').eq([i]).removeClass('sscBallNoColor')
                }
            }
        }else if($(this).text()=='双'){
            $('.sscBall').addClass('sscBallNoColor');
            for (var i=0;i<$('.sscBall').text().length;i++){
                if($('.sscBall').eq([i]).text()%2==0){
                    $('.sscBall').eq([i]).removeClass('sscBallNoColor')
                }
            }
        }

    })
    //搜索
    $('#dateTime').change(function () {
        arr=[];
        issueStr = '';
        $('.choose').hide();
        $('#chooseNum a').removeClass('chooseTypeColor');
        $('#chooseType2 a').removeClass('chooseTypeColor');
        $('#chooseType a').removeClass('chooseTypeColor');
        getHistoryData('50', $("#dateTime").val());
        $(".dataYMD").html( $("#dateTime").val());
        $('.dataWeed').html(getWeed($("#dateTime").val()))
        return false;
    })

});