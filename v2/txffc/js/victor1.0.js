var gamekey = 'txffc', //游戏key
	apiurl = '', //请求地址
	opentime_remaining = -2, //开奖时间
	ifopen = true;
var last_expect,
	last_opencode;
var getajax;
var donghua;
init();

function init() {
	$(".tyrbtn").removeAttr("id");
	setApiurl();
	last_expect_status = true;
}

//检查是否提交请求
function setApiurl() {

	if(checkStorage('token') && checkStorage('host')) {
		var host = getStorage('host'),
			tk = getStorage('token');
        apiurl = '/Fuzhi/Api/vodie?gamekey=' + gamekey ;
		loadAjax();
	} else {
		objCount.innerHTML = '登陆错误';
		console.log(objCount);
		return false;
	}
}

//打开页面请求数据
function loadAjax() {
	$.ajax({
		url: apiurl,
		async: true,
		dataType: "json",
		success: function(data) {
			var n,e;
			o = data.datas.last_opencode.opencode.split(","); //开奖结果
			e = data.datas.last_opencode.opencode.split(","); //开奖结果
			x = data.datas.present.expect;//下期开奖期号
			b = data.datas.last_opencode.expect;//本期开奖期号
			cutTime = data.datas.present.opentime_remaining;//开奖倒计时
			videoTools.inseartData(o);
			animate.sscAnimateEnd(o);
			videoTools.cutTime();
			setTimeout(loadAjax1,1000)
		},
	});

}
//打开页面请求数据
function loadAjax1() {
	$.ajax({
		url: apiurl,
		async: true,
		dataType: "json",
		success: function(data) {
			last_opencode = data.datas.last_opencode.expect;

			//记录上期开奖期数
			if(last_expect_status) {
				last_expect = last_opencode;
				last_expect_status = false;
			};
			if(last_expect != last_opencode) {
			
			animate.sscAnimateEnd(videoTools.createNum(), "#numBig", datestr, !0);//清空随机开奖数据
			clearInterval(getajax);
			setTimeout(init,100);
			
			
		}
		},
	});

}



//动画结束
function sscAnimateEnd(o) {
	!ifopen && (animate.sscAnimateEnd(o.preDrawCode, o.id, o.counttime, !1), videoTools.inseartData(o), datestr = o.counttime, preDrawCode = o)
}

function stopSound(o) {
	videoTools.sounds.soundsT.stop(o)
}
$(function() {
	videoTools.createNum(), 
	setTimeout(function() {
		setTimeout(function() {
			$(".loading").fadeOut(600)
		}, 100)
	}, 200), 
	$(".menubox").on("click", ".tyrbtn", function() {
		$(this).attr("id") || ($(this).attr("id", "true"), animate.sscAnimate("#numBig"), videoTools.testOpen())
	}), 
	$(".menubox").on("click", ".soundbtn", function() {
		if($(this).hasClass("closesoundbtn")) {
			$(this).removeClass("closesoundbtn");
			$("audio");
			$(".oping ").is(":hidden") ? videoTools.ifsund() && ifopen && ($("#bgsound").attr("src", "sound/bg.mp3"), videoTools.sounds.soundsT.play("bgsound")) : videoTools.ifsund() && ifopen && ($("#bgsound").attr("src", "sound/opening.mp3"), videoTools.sounds.soundsT.play("bgsound"))
		} else $(this).addClass("closesoundbtn"), $("#bgsound").attr("src", "")
	}), 
	$(".djs").show();
	$(".codeboxl .perspectiveView")
});
var animate = {},
	datestr = "",
	timerInterval = "",
	ifopen = !1,
	preDrawCode = "",
	animateID = [],
	videoTools = {};
animate.sscAnimate = function(o) {
	var e;
	clearInterval(animateID[o]), videoTools.ifsund() && !ifopen && ($("#bgsound").attr("src", "sound/opening.mp3"), videoTools.sounds.soundsT.play("bgsound"));
	donghua = setInterval(function() {
			for(var e = $(o).find(".box"), n = $(e).find("span").length, s = 0; s < n; s++) {
				$(e).find("span").eq(s).removeClass().addClass("num" + $(e).find("span").eq(s).text()), $(e).find("span").eq(s).css({
					backgroundPositionY: "0",
					backgroundPositionX: "0",
					backgroundSize: "100%"
				});
				var i = videoTools.excutenum();
				$(e).find("span").eq(s).stop().animate({
					backgroundPositionY: "-30",
					backgroundPositionX: "67px",
					backgroundSize: "50%"
				}, 50 * i == "0" ? "100" : 50 * i), $(e).find("span").eq(s).text(videoTools.excutenum())
			}
		}, 100),
		n = $(".codeboxl .perspectiveView");
	$(n).each(function(o) {
		videoTools.xz3D(n[o], !1)
	}), $(".oping").show(), $(".djs").hide(), animateID[o] = donghua
}, 
animate.sscAnimateEnd = function(o, e, n, s) {
	
	clearInterval(donghua);
	console.log(e);
	if(!ifopen) {
		videoTools.ifsund() && ifopen && ($("#bgsound").attr("src", "sound/over.mp3"), videoTools.sounds.soundsT.play("bgsound")), clearInterval(animateID[o]);
		var i = $(e).find(".box");
		$(".oping").hide(), $(".djs").show();
		var t = [];
		$(i).each(function(e) {
			$(this).find("span").text(""), $(this).find("span").removeClass().addClass("num" + o[e]), t.push($(this).find("span"))
		}), videoTools.showNUM(t, o), s || videoTools.cutTime(n)
	}
}, 
videoTools.excutenum = function() {

	return Math.floor(10 * Math.random())
}, 
videoTools.xz3D = function(o, e) {
	var o = $(o);
	e ? ($(o).children(".flip").eq(0).addClass("out").removeClass("in"), setTimeout(function() {
		$(o).find(".flip").show().eq(1).addClass("in").removeClass("out"), $(o).children(".flip").eq(0).hide()
	}, 225)) : ($(o).children(".flip").eq(1).addClass("out").removeClass("in"), setTimeout(function() {
		$(o).find(".flip").show().eq(0).addClass("in").removeClass("out"), $(o).children(".flip").eq(1).hide()
	}, 225))
}, 
videoTools.showNUM = function(o, e) {
	for(var n = $(".tl .perspectiveView"), s = $(".bl .perspectiveView"), i = function(o) {
			$(o).css({
				backgroundPositionY: "28px",
				backgroundPositionX: "26px",
				backgroundSize: "10%"
			}), $(o).stop().animate({
				backgroundPositionY: "-18px",
				backgroundPositionX: "-16px",
				backgroundSize: "150%"
			}, 200, function() {
				$(o).stop().animate({
					backgroundPositionY: "0",
					backgroundPositionX: "0",
					backgroundSize: "100%"
				}, 200)
			})
		}, t = 0, a = 0; t < 5; t++) {
		if(a += 150, t >= 4) var d = 0;
		setTimeout(function() {
			i(o[d]), videoTools.xz3D(n[d], !0), videoTools.xz3D(s[d], !0), d++
		}, a)
	}
	setTimeout(function() {
		videoTools.ifsund() && !ifopen && ($("#bgsound").attr("src", "sound/bg.mp3"), setTimeout(videoTools.sounds.soundsT.play("bgsound"), 1e3))
	}, 2800), $(".tl").find(".box").each(function(o) {
		var n = "",
			s = $(this).find("span").eq(1).attr("class");
		e[o] >= 5 ? (n = "bigbg", -1 != s.indexOf(n) || (s = s.replace("smallbg", n))) : (n = "smallbg", -1 != s.indexOf(n) || (s = s.replace("bigbg", n))), $(this).find("span").eq(1).removeAttr("class").attr("class", s)
	}), $(".bl").find(".box").each(function(o) {
		var n = "",
			s = $(this).find("span").eq(1).attr("class");
		e[o] % 2 == 0 ? (n = "doublebg", -1 != s.indexOf(n) || (s = s.replace("singlebg", n))) : (n = "singlebg", -1 != s.indexOf(n) || (s = s.replace("doublebg", n))), $(this).find("span").eq(1).removeAttr("class").attr("class", s)
	})
}, 
videoTools.sounds = {
	soundsT: {
		play: function(o) {
			videoTools.ifsund() && ifopen && ("sound/over.mp3" == $("#" + o).attr("src") ? $("#" + o).removeAttr("loop", "loop") : $("#" + o).attr("loop", "loop"), document.getElementById(o).play())
		},
		stop: function(o) {
			document.getElementById(o).pause()
		}
	}
}, 
//开奖倒计时
videoTools.cutTime = function(o) {
	var e = cutTime;
	clearInterval(animateID.timer), timerInterval = setInterval(function() {
		if(e==0){
				getajax=setInterval(loadAjax1,2000);
			}
		if(e<15){
			$(".tyrbtn").attr("id", "true");
		}
		if(e >= 1) {
			e -= 1;
			var o = Math.floor(e / 3600),
				n = Math.floor(e / 60 % 60),
				s = Math.floor(e % 60),
				i = "";
			i = (i = o <= 0 ? "" : (o < 10 ? "0" + o : o) + ":") + "" + (n < 10 ? "0" + n : n) + ":" + (s < 10 ? "0" + s : s), $(".bluefont").text(i)
		} else clearInterval(timerInterval), !ifopen && animate.sscAnimate("#numBig")
	}, 1e3), animateID.timer = timerInterval
}, 
//获取开奖数据
videoTools.inseartData = function(o) {
	console.log(o);
	var lh,ds,dx;
	var zh =parseInt(o[0])+parseInt(o[1])+parseInt(o[2])+parseInt(o[3])+parseInt(o[4]);
		if(parseInt(o[0])>parseInt(o[4])){
				lh = '龙'
			}else{
				lh = '虎'
			};
		if(zh%2==0){
			ds = '双'
		}else{
			ds = '单'
		};
		if(zh>22){
			dx = '大'
		}else{
			dx = '小'
		};
		console.log(ds);
	$("#preDrawIssue").text(b), //开奖期号
	$("#drawTime").text(o.drawTime), //下期开奖时间
	$("#sumNum").text(zh), //开奖结果总和
	$("#sumSingleDouble").text(ds), //开奖结果单双
	$("#sumBigSmall").text(dx), //开奖结果大小
	$("#dragonTiger").text(lh), //开奖结果龙虎
	$("#litNum").find(".box").each(function(e) {
		$(this).find("span").removeClass().addClass("num" + o[e])//开奖结果
	}),
	$("#numBig").find(".box").each(function(e) {
		$(this).find("span").removeClass().addClass("num" + o[e])//开奖结果
	})
}, 
videoTools.createNum = function() {
	for(var o = [], e = 0; e < 5; e++) o.push((9 * Math.random() + "").split(".")[0]);
	return o;
	
}, 
videoTools.testOpen = function() {
	var o = 0,
		e = setInterval(function() {
			++o >= 2 && (clearInterval(e), animate.sscAnimateEnd(videoTools.createNum(), "#numBig", datestr, !0), setTimeout(function() {
				setTimeout(init,1000)
			}, 5e3))
		}, 1e3)
}, 
videoTools.clearInterval = function() {
	clearInterval(timerInterval)
}, 
videoTools.ifsund = function() {
	var o = null;
	return o = !$("#soundbtn").hasClass("closesoundbtn"), console.log("flag：" + o), o
};
	let n = $(window).width()/$('.cqsscAnimate').width();
let b = $(window).height()/$('.cqsscAnimate').height();
		$('.cqsscAnimate').css('transform','scaleX('+n+')');
	$(window).resize(function() {
		let n = $(window).width()/$('.cqsscAnimate').width();
		let b = $(window).height()/$('.cqsscAnimate').height();
		$('.cqsscAnimate').css('transform','scaleX('+n+')');
	})