var gamekey = 'pc28', //游戏key
	apiurl = '', //请求地址
	opentime_remaining = -2, //开奖时间
	ifopen = true;
var last_expect,
	last_opencode;
var getajax;
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
		//apiurl = host + '/game/event/present_expect?gamekey=' + gamekey + '&tk=' + tk;
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
			var n, e;
			n = data.datas.last_opencode.opencode.split(","); //开奖结果
			e = data.datas.last_opencode.opencode.split(","); //开奖结果
			x = data.datas.present.expect; //下期开奖期号
			b = data.datas.last_opencode.expect; //本期开奖期号
			cutTime = data.datas.present.opentime_remaining; //开奖倒计时
			fcsdv.stopVid(n, e);
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
			isTry = !0;
			last_opencode = data.datas.last_opencode.expect;

			//记录上期开奖期数
			if(last_expect_status) {
				last_expect = last_opencode;
				last_expect_status = false;
			};
			if(last_expect != last_opencode) {
				setTimeout(init(), 1000);
				clearInterval(getajax);

			}
		},
	});

}

function tryRecoverArr() {
	var n = [];
	$(".headCode").find("ul li").each(function() {
		n.push(parseInt($(this).text()))
	}), runKaiCode(n)
}

function headKaiCode(n) {
	console.log(n);
	for(var e = "", a = "", t = "", i = 0; i < n.length; i++) 0 == i ? e = "<li id='oneCode'><span>" + n[i] + "</span></li>" : 1 == i ? a = "<li id='twoCode'><span>" + n[i] + "</span></li>" : t = "<li id='threeCode'><span>" + n[i] + "</span></li>";
	var l = e + a + t;
	$(".headCode").find("ul").append(l)
}

function runKaiCode(n) {
	for(var e = "", a = "", t = "", i = 0; i < n.length; i++) 0 == i ? e = "<li class='firstBall'><span>" + n[i] + "</span></li>" : 1 == i ? a = "<li class='secondBall'><span>" + n[i] + "</span></li>" : t = "<li class='thirdBall'><span>" + n[i] + "</span></li>";
	var l = e + a + t;
	$("#curNumUl").append(l)
}

function kaiCodeAnimate(n) {
	var e = 0;
	$(".runCode").find("#curNumUl").empty(); //中间号码隐藏
	var a = setInterval(function() {
		0 == e ? ($("#curNumUl").append("<li class='firstBall'><span>" + n[e] + "</span></li>"), clearInterval(runBall1), dropAgian(1)) : 1 == e ? ($("#curNumUl").append("<li class='secondBall'><span>" + n[e] + "</span></li>"), clearInterval(runBall2), dropAgian(2)) : 2 == e && ($("#curNumUl").append("<li class='thirdBall'><span>" + n[e] + "</span></li>"), clearInterval(runBall3), dropAgian(3)), ++e > 3 && (clearInterval(a), bgMusic())
	}, 1e3)
}
//中间号码隐藏，球在底部
function dropBall() {
	$(".runCode").find("#curNumUl").empty(); //中间号码隐藏
}

function dropAgian(n) {
	var e = $(".parLi").find("ul li");
	1 == n ? agianAnimate(e, 0, 10) : 2 == n ? agianAnimate(e, 10, 20) : agianAnimate(e, 20, 30)
}

function agianAnimate(n, e, a) {
	for(var t = e; t < a; t++) topN = createNum(4.4, 4.8), leftN = n.eq(t).position().left + createNum(-5, 5), $(".parLi").find("ul li").eq(t).animate({
		top: topN + "%",
		left: leftN + "%"
	}, 500)
}

function dropStart(n, e, a) {
	var t = "";
	t = n < 5 || n >= 10 && n < 15 || n >= 20 && n < 25 ? createNum(0, 2.4) + a : createNum(-2.4, 0) + a;
	var i = e + createNum(-5, 1);
	$(".parLi").find("ul li").eq(n).animate({
		top: i + "%",
		left: t + "%"
	}, 500)
}
//第一球搅动
function ballRunning1() {
	for(var n = $(".firstBallPip").find("ul li"), e = 0, a = 0, t = 0; t < 10; t++) a = createNum(0, 4.8), t < 5 ? (e = createNum(-5, 2.4), ballAnimate(n[t], a, e)) : (e = createNum(-25, 5), ballAnimate(n[t], a, e))
}
//第二球搅动
function ballRunning2() {
	for(var n = $(".secondBallPip").find("ul li"), e = 0, a = 0, t = 0; t < 10; t++) a = createNum(0, 4.8), t < 5 ? (e = createNum(-5, 2.4), ballAnimate(n[t], a, e)) : (e = createNum(-25, 5), ballAnimate(n[t], a, e))
}
//第三球搅动
function ballRunning3() {
	for(var n = $(".thirdBallPip").find("ul li"), e = 0, a = 0, t = 0; t < 10; t++) a = createNum(0, 4.8), t < 5 ? (e = createNum(-5, 2.4), ballAnimate(n[t], a, e)) : (e = createNum(-25, 5), ballAnimate(n[t], a, e))
}

function ballAnimate(n, e, a) {
	var t = createNum(0.8, 4.4);
	$(n).animate({
		top: e + "%",
		left: a + "%"
	}, t)
}

function createNum(n, e) {
	var a = e - n,
		t = Math.random();
	return n + Math.round(t * a)
}

function bgMusic() {
	audioType = "b",
		fcsdv.sound.play("audioidBg"),
		fcsdv.sound.stop("audioidKai")
}

function kaiMusic() {
	audioType = "r",
		fcsdv.sound.play("audioidKai"),
		fcsdv.sound.stop("audioidBg")
}
var fcsdv = {},
	isTry = !1,
	ifopen = !1,
	playa = "b",
	animateId = {},
	timer = null;
//模拟开奖数据
$(function() {
		$(".loading").fadeOut(1e3, function() {}), $("#soundBth").on("click", function() {
			"soundsOn" == $("#soundBth").attr("class") ? ($("#soundBth").removeClass("soundsOn").addClass("soundsOff"), fcsdv.sound.stop("audioidKai"), fcsdv.sound.stop("audioidBg")) : ($("#soundBth").removeClass("soundsOff").addClass("soundsOn"), "b" == audioType ? (fcsdv.sound.play("audioidBg"), fcsdv.sound.stop("audioidKai")) : (audioType, fcsdv.sound.play("audioidKai"), fcsdv.sound.stop("audioidBg")))
		}), $("#tryBtn").on("click", function() {
			if(isTry) return $(".jzCheck").show(), setTimeout(function() {
				$(".jzCheck").hide()
			}, 1e3), !1;
			isTry = !0, fcsdv.startGame(1)
		})
	}),
	//模拟开奖调用开奖动画
	fcsdv.startGame = function(n) {
		kaiMusic();
		var e = [];
		fcsdv.startAnimate(),
			setTimeout(function() {
				1 == n && (e = fcsdv.createArr(), fcsdv.stopAnimate(1, e))
			}, 4e3)
	},
	//球两排竖放
	fcsdv.recoverBall = function() {
		$(".parLi").find("ul").empty();
		$(".parLi").find("ul li");
		var n = "<li></li><li></li><li></li><li></li><li></li>";
		$(".leftUl").append(n), $(".rightUl").append(n)
	},
	//声音开关
	fcsdv.sound = {
		play: function(n) {
			"soundsOn" == $("#soundBth").attr("class") && document.getElementById(n).play()
		},
		stop: function(n) {
			document.getElementById(n).pause()
		}
	},
	fcsdv.startVid = function(n, e) {
		$("#hourtxt").show(),
			$("#opening").hide(),
			bgMusic(),
			fcsdv.Data(1, n, e)
	},
	fcsdv.defStartVid = function(n) {
		$("#hourtxt").hide(),
			$("#opening").show(),
			bgMusic(),
			$(".headCode").find("ul").empty(),
			$("#issue").text(data.drawIssue), //本期开奖期号
			$("#kaiTime").text(data.drawTime), //下期开奖期号
			$(".runCode").find("#curNumUl").empty(), //中间号码隐藏
			fcsdv.startAnimate(),
			headKaiCode(n) //开奖号码
	},
	fcsdv.stopVid = function(n, e) {
		$("#hourtxt").show(),
			$("#opening").hide(),
			fcsdv.stopAnimate(2, n), //开奖号码
			fcsdv.Data(2, n, e)
	},
	fcsdv.Data = function(n, e, a) {
		$(".headCode").find("ul").empty(),
			$("#issue").text(b), //本期开奖期号
			$("#kaiTime").text(x), //下期开奖期号
			$(".runCode").find("#curNumUl").empty(), //中间号码隐藏
			fcsdv.cutTime(e.cutime, a), //开奖倒计时
			headKaiCode(e), //开奖号码
			2 == n || runKaiCode(e) //开奖号码
	},
	fcsdv.stopAnimate = function(n, e) {
		$(".runCode").find("#curNumUl").empty(), //中间号码隐藏
			kaiCodeAnimate(e),
			setTimeout(function() {
				fcsdv.recoverBall(), //球两排竖放
					$(".runCode").find("#curNumUl").empty(), //中间号码隐藏
					1 == n ? tryRecoverArr() : runKaiCode(e),
					isTry = !1
			}, 5e3)
	};
var runBall1 = null,
	runBall2 = null,
	runBall3 = null;
//调用开奖动画
fcsdv.startAnimate = function() {
	     dropBall();
			setTimeout(function() {
				runBall1 = setInterval(function() {
					ballRunning1()
				}, 30), runBall2 = setInterval(function() {
					ballRunning2()
				}, 30), runBall3 = setInterval(function() {
					ballRunning3()
				}, 30)
			}, 500)
	},
	fcsdv.getSecond = function(n) {
		var e = n.split(" ")[1].split(":"),
			a = e[0],
			t = e[1],
			i = e[2];
		return 3600 * (a = a < 10 ? a.substring(a.length - 1, a.length) : a) + 60 * (t = t < 10 ? t.substring(t.length - 1, t.length) : t) + 1 * (i = i < 10 ? i.substring(i.length - 1, i.length) : i)
	},
	//下期开奖时间
	fcsdv.nextopenTime = function(n, e) {
		var a = new Date(n).getTime() - new Date(e).getTime(),
			t = parseInt(a / 36e5 / 24),
			i = parseInt(a / 36e5 - 24 * t),
			l = parseInt(60 * (a / 36e5 - 24 * t - i)),
			o = parseInt(60 * (60 * (a / 36e5 - 24 * t - i) - l));
		return 3600 * (t > 0 ? 24 * t + i : i) + 60 * l + 1 * o
	},
	//开奖倒计时
	fcsdv.cutTime = function(n, e) {
		null != timer && clearInterval(timer);
		var n = cutTime;
		timer = setInterval(function() {
			if(n == 0) {
				getajax = setInterval(loadAjax1, 2000);
			}
			if(n >= 1) {
				n -= 1;
				var a = Math.floor(n / 3600),
					t = Math.floor(n / 60 % 60),
					i = Math.floor(n % 60),
					l = "";
				if(l = (a < 10 ? "0" + a : a) + " : ", l = l + "" + (t < 10 ? "0" + t : t) + " : " + (i < 10 ? "0" + i : i), $("#hourtxt").text(l), n < 10) {
					var o = $(".linelist").find("li");
					$(o).eq(n).addClass("redli")
				}
			} else clearInterval(timer),
				$("#hourtxt").hide(), //开奖倒计时隐藏
				$("#opening").css("display", "block"), //显示开奖中...
				kaiMusic(), //开奖音乐播放
				fcsdv.startAnimate() //调用开奖动画
		}, 1e3)
	},
	//清理开奖倒计时计时器
	fcsdv.clearTime = function() {
		clearInterval(timer)
	},
	fcsdv.createArr = function() {
		for(var n = [], e = 0; e < 3; e++) {
			var a = createNum(0, 9);
			if(0 != e)
				for(var t = 0, i = n.length - 1; t < n.length; t++) {
					if(a == n[t]) {
						e--;
						break
					}
					if(t == i) {
						n.push(a);
						break
					}
				} else n.push(a)
		}
		return n
	};
/*let n = $(window).width()/ $('.content').width();
let b = $(window).height() / $('.content').height();
$('.content').css('-webkit-transform', 'scale(' + n + ',' + b + ')');

$(window).resize(function() {
	let n = $(window).width() / $('.content').width();
	let b = $(window).height() / $('.content').height();
	$('.content').css('-webkit-transform', 'scale(' + n + ',' + b + ')');
	
})*/
