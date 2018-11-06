var gamekey = 'gd11x5', //游戏key
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
    apiurl = '/Fuzhi/Api/vodie?gamekey=' + gamekey ;
    loadAjax();
	// if(checkStorage('token') && checkStorage('host')) {
	// 	var host = getStorage('host'),
	// 		tk = getStorage('token');
	// 	// apiurl = host + '/game/event/present_expect?gamekey=' + gamekey + '&tk=' + tk;
    //     apiurl = '/Fuzhi/Api/vodie?gamekey=' + gamekey ;
	// 	loadAjax();
	// } else {
	// 	objCount.innerHTML = '登陆错误';
	// 	console.log(objCount);
	// 	return false;
	// }
}

//打开页面请求数据
function loadAjax() {
	$.ajax({
		url: apiurl,
		async: true,
		dataType: "json",
		success: function(data) {
			var t;
			e = data.datas.last_opencode.opencode.split(","); //开奖结果
			x = data.datas.present.expect; //下期期号
			b = data.datas.last_opencode.expect; //本期期号
			cutTime = data.datas.present.opentime_remaining;
			gxklsf.startVid(t);
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
			var t;
			last_opencode = data.datas.last_opencode.expect;

			//记录上期开奖期数
			if(last_expect_status) {
				last_expect = last_opencode;
				last_expect_status = false;
			};
			if(last_expect != last_opencode) {
				setTimeout(init(), 1000);
				gxklsf.stopVid(t);
				clearInterval(getajax);
			}
		},
	});

}

//顶部开奖数据
function headKaiCode(t) {
	$(".numShow").empty();
	var n = t,
		e = "";
	$(n).each(function() {
		e += "<li>" + this + "</li>"
	}), $(".numShow").append(e)
}

function defInterface(t, n) {
	var e = [
		[65, 25, .8],
		[74, 50, .7],
		[117, 45, .9],
		[55, 100, .6],
		[130, 80, .5],
		[108, 130, .6],
		[25, 30, .6],
		[37, 64, .7],
		[130, 25, .9],
		[60, 135, .5],
		[112, 100, .6],
		[87, 120, .5]
	];
	$(".kaiBox").each(function(o) {
		t = gxklsf.createArr();
		var i = $(this).find(".KaiUl").find("li").length;
		$(this).find(".KaiUl").find("li").each(function(a) {
			a < i - 1 ? ($(this).text(t[a]), $(this).css({
				"margin-left": e[a][0],
				"margin-top": e[a][1],
				transform: "scale(" + e[a][2] + ")"
			})) : $(this).addClass("actNum").text(n[o])
		})
	})
}

function recoverFun() {
	var t = [];
	$("#kaiNum").find("li").each(function() {
		t.push($(this).text())
	}), gxklsf.defBegin(t)
}

function tabDom(t) {
	anyNum = createNum(0, 11), $(t).each(function() {
		domitem = $(this).find("li"),
			$(domitem[anyNum]).removeClass("comNum").addClass("actNum").siblings(".actNum").removeClass("actNum").addClass("comNum").css({
				"margin-left": coordinate[anyNum][0],
				"margin-top": coordinate[anyNum][1],
				transform: "scale(" + coordinate[anyNum][2] + ")"
			})
	})
}
//停止动画
function stopAnimate(t) {
	bgMusic(),
		clearInterval(moveDom1),
		clearInterval(moveDom2),
		clearInterval(moveDom3),
		clearInterval(moveDom4),
		clearInterval(moveDom5),
		$(".kaiBox").each(function(n) {
			$(this).find("li").each(function() {
				$(this).hasClass("actNum") && $(this).text(t[n])
			})
		})
}
//背景音乐播放
function bgMusic() {
	audioType = "b",
		gxklsf.sound.play("audioidBg"),
		gxklsf.sound.stop("audioidKai")
}
//开奖音乐播放
function kaiMusic() {
	audioType = "r",
		gxklsf.sound.play("audioidKai"),
		gxklsf.sound.stop("audioidBg")
}

function createNum(t, n) {
	var e = n - t,
		o = Math.random();
	return t + Math.round(o * e)
}
var gxklsf = {},
	isTry = !1,
	ifopen = !1,
	audioType = "b",
	animateId = {},
	timer = null,
	ranTime = 0,
	moveDom1 = null,
	moveDom2 = null,
	moveDom3 = null,
	moveDom4 = null,
	moveDom5 = null,
	coordinate = [];
$(function() {
		$("#soundBth").on("click", function() {
				"soundsOn" == $("#soundBth").attr("class") ? ($("#soundBth").removeClass("soundsOn").addClass("soundsOff"), gxklsf.sound.stop("audioidKai"), gxklsf.sound.stop("audioidBg")) : ($("#soundBth").removeClass("soundsOff").addClass("soundsOn"), "b" == audioType ? (gxklsf.sound.play("audioidBg"), gxklsf.sound.stop("audioidKai")) : (gxklsf.sound.play("audioidKai"), gxklsf.sound.stop("audioidBg")))
			}),
			$("#tryBtn").on("click", function() {
				if(isTry) return $(".jzCheck").show(),
					setTimeout(function() {
						$(".jzCheck").hide()
					}, 1e3), !1;
				isTry = !0,
					gxklsf.startAnimate(),
					gxklsf.tryKaiFun()
			})
	}),
	gxklsf.startVid = function(t) {
		$("#hourtxt").show(), //开奖倒计时展示
			$("#opening").hide(), //开奖中...隐藏
			bgMusic(), //播放背景音乐
			gxklsf.Data(t), //获取开奖数据
			gxklsf.defBegin(e)
	},
	gxklsf.stopVid = function(t) {
		$("#hourtxt").show(),
			$("#opening").hide(),
			gxklsf.Data(t),
			stopAnimate(e),
			gxklsf.defBegin(e),
			isTry = !1
	},
	//获取开奖数据
	gxklsf.Data = function(t) {
		$("#nextIssue").text(x), //下期期号
			$("#drawTime").text(b); //本期期号
		headKaiCode(e), //调用开奖号码
			gxklsf.cutTime(t) //调用开奖倒计时
	},
	gxklsf.defBegin = function(t) {
		defInterface(0, t)
	},
	//开奖动画开始
	gxklsf.startAnimate = function() {
		kaiMusic();
		var t = [];
		coordinate = [
			[65, 25, .8],
			[74, 50, .7],
			[117, 45, .9],
			[55, 100, .6],
			[130, 80, .5],
			[108, 130, .6],
			[25, 30, .6],
			[37, 64, .7],
			[130, 25, .9],
			[60, 135, .5],
			[112, 100, .6],
			[87, 120, .5]
		], moveDom1 = setInterval(function() {
			tabDom(t = $(".oneUl"))
		}, createNum(60, 100)), moveDom2 = setInterval(function() {
			tabDom(t = $(".twoUl"))
		}, createNum(60, 100)), moveDom3 = setInterval(function() {
			tabDom(t = $(".threeUl"))
		}, createNum(60, 100)), moveDom4 = setInterval(function() {
			tabDom(t = $(".fourUl"))
		}, createNum(60, 100)), moveDom5 = setInterval(function() {
			tabDom(t = $(".fiveUl"))
		}, createNum(60, 100))
	},
	//模拟开奖视频
	gxklsf.tryKaiFun = function() {
		setTimeout(function() {
			stopAnimate(gxklsf.createArr()),
				setTimeout(function() {
					recoverFun(), isTry = !1
				}, 3e3)
		}, 6e3)
	},
	//模拟开奖结束二次调用开奖倒计时
	gxklsf.getSecond = function(t) {
		var n = t.split(":"),
			e = n[0],
			o = n[1],
			i = n[2];
		return 3600 * (e = e < 10 ? e.substring(e.length - 1, e.length) : e) + 60 * (o = o < 10 ? o.substring(o.length - 1, o.length) : o) + 1 * (i = i < 10 ? i.substring(i.length - 1, i.length) : i)
	},
	//开奖倒计时
	gxklsf.cutTime = function(t) {
		null != timer && clearInterval(timer);
		var t = cutTime;
		timer = setInterval(function() {
			if(t == 0) {
				getajax = setInterval(loadAjax1, 2000);
			}
			if(t >= 1) {
				t -= 1;
				var n = Math.floor(t / 3600),
					e = Math.floor(t / 60 % 60),
					o = Math.floor(t % 60),
					i = "";
				if(i = (n < 10 ? "0" + n : n) + " : ", i = i + "" + (e < 10 ? "0" + e : e) + " : " + (o < 10 ? "0" + o : o), $("#hourtxt").text(i), t < 10) {
					var a = $(".linelist").find("li");
					$(a).eq(t).addClass("redli")
				}
			} else clearInterval(timer),
				$("#hourtxt").hide(),
				$("#opening").css("display", "block"),
				gxklsf.startAnimate()
		}, 1e3)
	},
	//清理计时器
	gxklsf.clearTime = function() {
		clearInterval(timer)
	},
	//声音开关
	gxklsf.sound = {
		play: function(t) {
			"soundsOn" == $("#soundBth").attr("class") && document.getElementById(t).play()
		},
		stop: function(t) {
			document.getElementById(t).pause()
		}
	},
	//随机出现1-11号码
	gxklsf.createArr = function() {
		for(var t = [], n = 0; n < 11; n++) {
			var e = createNum(1, 11);
			if(0 != n)
				for(var o = 0, i = t.length - 1; o < t.length; o++) {
					if(e == t[o]) {
						n--;
						break
					}
					if(o == i) {
						t.push(e);
						break
					}
				} else t.push(e)
		}
		return t
	};
	let n = window.screen.width /$('.content').width();
	let b = $(window).height()/$('.content').height();
	console.log(window.screen.width);
	console.log($(window).width());
	$('.content').css('zoom',n);
	$(window).resize(function() {
		let n = window.screen.width /$('.content').width();
		let b = $(window).height()/$('.content').height();
		$('.content').css('zoom', n);
	})