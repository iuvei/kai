var gamekey = 'gdkl10', //游戏key
	apiurl = '', //请求地址
	opentime_remaining = -2, //开奖时间
	ifopen = true;
var last_expect,
	last_opencode;
var getajax;
var initf, moveIn = !1,
	inttime = 10;
init();

function init() {
	setApiurl();
	last_expect_status = true;
}

//检查是否提交请求
function setApiurl() {

	if(checkStorage('token') && checkStorage('host')) {
		var host = getStorage('host'),
			tk = getStorage('token');
        apiurl = '/Fuzhi/Api/vodie?gamekey=' + gamekey ;
		// apiurl = host + '/game/event/present_expect?gamekey=' + gamekey + '&tk=' + tk;
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
			var u,i,e,n,a;
			e = data.datas.last_opencode.opencode.split(","); //开奖结果
			n = data.datas.present.expect; //下期期号
			t = data.datas.last_opencode.expect; //本期期号
			cutTime = data.datas.present.opentime_remaining;
			fun.Trueresult(e);
			fun.fillHtml(a, n, t, u, i);
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
				clearInterval(initf);
				setTimeout(init, 1000);
				clearInterval(getajax);
			}
		},
	});

}



var bgsound = document.getElementById("bgsound"),
	kaisound = document.getElementById("kaisound"),
	kaiing = bgsound,
	ifopen = !1,
	fun = {},
	interInt = !1,
	addint, fillTime;
fun.createNum = function(e, n) {
	var t = n - e,
		u = Math.random();
	return e + Math.round(u * t)
}, 
fun.createArr = function() {
	for(var e = [], n = 0; n < 8; n++) {
		var t = fun.createNum(1, 20);
		if(0 != n)
			for(var u = 0, i = e.length - 1; u < e.length; u++) {
				if(t == e[u]) {
					n--;
					break
				}
				if(u == i) {
					e.push(t);
					break
				}
			} else e.push(t)
	}
	return e
}, 
fun.createtwoArr = function() {
	for(var e = [], n = [], t = 0; t < 20; t++)(n = []).push(fun.createNum(253, 255), 
	fun.createNum(55, 274)), 
	e.push(n);
	return e
}, 
fun.soundrevsion = function() {
	$("#btnsound").hasClass("off") || (kaiing.pause(), kaiing.play())
}, 
fun.ballStatic = function() {
	kaiing.pause(), 
	kaiing = bgsound, fun.soundrevsion();
	for(var e = fun.createtwoArr(), n = $(".move_ballUl>li"), t = 0; t < n.length; t++) $(n[t]).css({
		top: e[t][0] + "px",
		left: e[t][1] + "px",
		"z-index": fun.createNum(0, 20)
	})
}, 
fun.resultContent = function(e) {
	if(void 0 == e) var e = fun.createArr()
};

fun.moveBall = function() {
	$(".video_box .middle_box li").show(), 
	kaiing.pause(), 
	kaiing = kaisound, fun.soundrevsion(), moveIn = !0, $(".result_box>ul").html("");
	var e = $(".move_ballUl>li");
	initf = setInterval(function() {
		for(var n = 0; n < e.length; n++) $(function() {
			var t = e[n];
			setTimeout(function() {
				var e = fun.createNum(0, 256),
					n = fun.createNum(0, 325);
				e < 10 ? n = fun.createNum(55, 255) : e < 15 && e > 10 ? n = fun.createNum(45, 300) : e < 20 && e > 10 ? n = fun.createNum(35, 295) : e < 25 && e > 15 ? n = fun.createNum(30, 300) : e < 30 && e > 20 ? n = fun.createNum(25, 305) : e < 45 && e > 30 ? n = fun.createNum(20, 315) : e < 55 && e > 45 ? n = fun.createNum(15, 320) : e < 70 && e > 55 ? n = fun.createNum(10, 325) : e < 90 && e > 70 ? n = fun.createNum(5, 325) : e < 110 && e > 90 ? n = fun.createNum(0, 325) : e < 130 && e > 110 ? n = fun.createNum(5, 325) : e < 150 && e > 130 ? n = fun.createNum(10, 325) : e < 165 && e > 150 ? n = fun.createNum(15, 325) : e < 175 && e > 165 ? n = fun.createNum(20, 325) : e < 190 && e > 175 ? n = fun.createNum(25, 315) : e < 200 && e > 190 ? n = fun.createNum(35, 310) : e < 210 && e > 200 ? n = fun.createNum(45, 300) : e < 220 && e > 200 ? n = fun.createNum(55, 290) : e > 220 && (n = fun.createNum(30, 290)), $(t).css({
					top: e + "px",
					left: n + "px",
					"z-index": fun.createNum(0, 20)
				})
			}, fun.createNum(100, 500))
		})
	}, inttime)
}, 
//获取开奖结果
fun.addresulthtml = function(e, n) {
	var t = e.length,
		u = "",
		i = 0,
		l = "blue";
	if(interInt) return clearInterval(a), !1;
	$(".result_box>ul").html("");
	var a = setInterval(function() {
		l = 19 == e[i] || 20 == e[i] ? "red" : "blue", $("." + e[i]).hide(), e[i] < 10 ? e[i] = "0" + e[i] : e[i];
		var o = "<li class='ball small " + l + "'>" + e[i] + "</li>";
		n && (u += o), $(".result_box>ul").append(o), ++i >= t && clearInterval(a), setTimeout(function() {
			$(".small").removeClass("small")
		}, 100), console.log(i), n && 8 == i && $("#rethtml").html(u)
	}, 300)
}, 
fun.Trueresult = function(e) {
	fun.addresulthtml(e, !0), setTimeout(function() {
		$(".video_box .middle_box li").css("transition", "all 10ms"), clearInterval(initf), setTimeout(function() {
			fun.ballStatic(), $(".video_box .middle_box li").css("transition", "0"), moveIn = !1
		}, 500)
	}, 3e3)
};
var timer;
fun.cutTime = function(e) {
	null != timer && clearInterval(timer);
	var e = cutTime;
	timer = setInterval(function() {
		if(e == 0) {
				getajax = setInterval(loadAjax1, 2000);
			}
		if(e >= 1) {
			e -= 1;
			var n = Math.floor(e / 3600),
				t = Math.floor(e / 60 % 60),
				u = Math.floor(e % 60),
				i = "";
			if(i = (n < 10 ? "0" + n : n) + ":", i = i + "" + (t < 10 ? "0" + t : t) + ":" + (u < 10 ? "0" + u : u), $(".Time_box").text(i), e < 10) {
				var l = $(".linelist").find("li");
				$(l).eq(e).addClass("redli")
			}
		} else clearInterval(timer), $(".Time_box").hide(), $(".opening").show(), fun.moveBall()
	}, 1e3)
}, 
fun.clearTime = function() {
	clearInterval(timer)
}, 
fun.getSecond = function(e) {
	var n = e.split(":"),
		t = n[0],
		u = n[1],
		i = n[2];
	return 3600 * (t = t < 10 ? t.substring(t.length - 1, t.length) : t) + 60 * (u = u < 10 ? u.substring(u.length - 1, u.length) : u) + 1 * (i = i < 10 ? i.substring(i.length - 1, i.length) : i)
}, 
fun.fillHtml = function(a, n, t, u, i) {
	console.log(a);
	console.log(n);
	console.log(t);
	console.log(u);
	console.log(i);
	if(void 0 != i && (clearInterval(addint), 
	clearTimeout(fillTime)), 
	$(".result_box>ul").html(""), 
	$(".Time_box").show(), 
	$(".opening").hide(), 
	$("#nextIssue").html(n),
	$("#nextOpTime").html(t), 
	fun.cutTime(u), 
	fun.ballStatic(), 
	void 0 != i
	) {
		console.log(a);
		for(var l = "blue", a = "", o = 0; o < i.length; o++) l = 19 == i[o] || 20 == i[o] ? "red" : "blue", i[o] < 10 ? i[o] = "0" + i[o] : i[o], a += "<li class='ball " + l + "'>" + i[o] + "</li>";
		$("#rethtml").html(a), $(".result_box>ul").html(a)
	}
}, 
fun.stateSound = function() {
	bgsound.play(), kaisound.play(), bgsound.pause(), kaisound.pause()
}, 
$(function() {
	bgsound = document.getElementById("bgsound"), kaisound = document.getElementById("kaisound"), kaiing = bgsound, $("#btnsound").on("click", function() {
		$(this).hasClass("off") ? (kaiing.play(), $(this).removeClass("off")) : (kaiing.pause(), $(this).addClass("off"))
	}), $(".kaiBtn").click(function() {
		if(moveIn) return !1;
		moveIn = !0, $(".video_box .middle_box li").show();
		var e = $(".result_box>ul").html();
		fun.moveBall(), setTimeout(function() {
			var e = fun.createArr();
			fun.addresulthtml(e)
		}, 3e3), setTimeout(function() {
			$(".video_box .middle_box li").css("transition", "all 10ms")
		}, 5e3), setTimeout(function() {
			clearInterval(initf), setTimeout(function() {
				fun.ballStatic(), setTimeout(function() {
					$(".video_box .middle_box li").show(), $(".result_box>ul").html(e), $(".video_box .middle_box li").css("transition", "0"), moveIn = !1
				}, 4e3)
			}, 500)
		}, 6e3)
	})
});
let n = $(window).width()/$('.video_box').width();
let b = $(window).height()/$('.video_box').height();
console.log($(window).width());
$('.video_box').css('transform','scale('+n+','+b+')');
$(window).resize(function() {
    let n = $(window).width()/$('.video_box').width();
    let b = $(window).height()/$('.video_box').height();
    $('.video_box').css('transform','scale('+n+','+b+')');
})