var gamekey = 'jsk3', //游戏key
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
		// apiurl = host + '/game/event/present_expect?gamekey=' + gamekey + '&tk=' + tk;
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
			var t;
			e = data.datas.last_opencode.opencode.split(","); //开奖结果
			x = data.datas.present.expect;
			b = data.datas.last_opencode.expect;
			cutTime = data.datas.present.opentime_remaining;
			k3v.stopVideo(t);
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
			setTimeout(init(), 1000);
			clearInterval(getajax);
		}
		},
	});

}

$(function() {
	$(".animate").find(".loading").fadeOut(1e3, function() {}), $(".kuai3Animate").on("click", ".kaimodule", function() {
		k3v.tryPlay()
	}), $("#soundBtn").on("click", "#spanbtn", function() {
		document.getElementById("audio");
		"sounds" == $("#spanbtn").attr("class") ? ($("#soundBtn").children().removeClass("sounds").addClass("sounds2"),
			k3v.sound.stop("")) : ($("#soundBtn").children().removeClass("sounds2").addClass("sounds"), k3v.sound.play("all"))
	})
});
var k3v = {},
	tryflag = !0,
	timer = null,
	ifpaused = "",
	animateId = {};
//开奖动画开始
k3v.startGame = function(t) {
	
		
		var e = this;
		e.codePlay = function() {
				var t = $("#code").find("li");
				e.run(2, "80", "0", t),
					e.run(5, "80", "1", t),
					e.run(8, "80", "2", t);
			}, e.run = function(t, e, n, a) {
			
				var i = setInterval(function() {
					$(a).eq(n).attr("class", "k3v0" + t), ++t >= 8 && (t = 1);
				}, e);
				animateId[n] = i;
			}, t && e.codePlay(),
			$(".linelist").find("li").addClass("redli"),
			ifpaused = "audioidB",
			ifopen && $("#spanbtn").hasClass("sounds") && k3v.sound.play("audioidR"),
			k3v.bressBG(10)
			
	},
	//开奖动画结束
	k3v.stopGame = function(t) {
		this.stop = function(t, e) {
			setTimeout(function() {
				clearInterval(animateId[t]);
				var n = $("#code").find("li");
				$(n).eq(t).attr("class", "k3v" + e)
			}, 800 * t)
		};
		for(var e = 0; e < 3; e++) this.stop(e, t[e]);
	};
//试试手气动画
var trytime = [];
k3v.tryPlay = function() {

		var t = [];
		if(tryflag) {
			$("#timetitle").text("模拟开奖"), $("#hourtxt").hide(), $("#opening").show(), tryflag = !1, k3v.startGame(!0);

			var e = setTimeout(function() {
				for(var n = 0; n < 3; n++) t.push(Math.round(5 * Math.random() + 1));
				k3v.stopGame(t);
				var a = setTimeout(function() {
						setTimeout(init(), 5e3);
						for(var t = $("#codetop").find("li"), e = [], n = 0, a = t.length; n < a; n++) e.push($(t).eq(n).text());
						k3v.stopGame(e), setTimeout(function() {
							tryflag = !0
						}, 3e3)
					}, 8e3),
					i = setTimeout(function() {
						$("#timetitle").text("倒计时"), $("#hourtxt").show(), $("#opening").hide();
						var t = $("#hourtxt").text().split(":"),
							e = t[0],
							n = t[1],
							a = t[2],
							i = 3600 * (e = e < 10 ? e.substring(e.length - 1, e.length) : e) + 60 * (n = n < 10 ? n.substring(n.length - 1, n.length) : n) + 1 * (a = a < 10 ? a.substring(a.length - 1, a.length) : a);
						ifpaused = "audioidB",
							ifopen && $("#spanbtn").hasClass("sounds") && k3v.sound.play("audioidB"),
							k3v.bressBG()
					}, 2e3);
				trytime.push(e), trytime.push(a), trytime.push(i)
			}, 5e3)
		} else $(".noinfor").fadeIn(200, "", function() {
			setTimeout(function() {
				$(".noinfor").fadeOut("300")
			}, 1e3)
		})
	}, 
	//调用开奖动画
	k3v.playGame = function() {
	
		k3v.startGame(!0)
	},
	//获取开奖数据
	k3v.updateData = function(t) {
		var i = parseInt(e[0]) + parseInt(e[1]) + parseInt(e[2]);
		$("#num1").text(e[0]), //开奖结果第一位
			$("#num2").text(e[1]), //开奖结果第二位
			$("#num3").text(e[2]), //开奖结果第三位
			$("#sumNum").text(i); //开奖结果总和
		if(i > 10) {
			$("#sumBigSmall").text("大"); //开奖结果总和大小
		} else {
			$("#sumBigSmall").text("小");
		};
		k3v.cutTime(t);
		$("#drawIssue").text(x); //下期开奖期号
		$("#drawTime").text(b) //下期开奖时间
	},
	//开奖倒计时
	k3v.cutTime = function(t) {
		var t = cutTime;
		null != timer && clearInterval(timer);
		timer = setInterval(function() {
			if(t==0){
				getajax=setInterval(loadAjax1,1000);
			}
			if(t >= 1) {
				t -= 1;
				var e = Math.floor(t / 3600),
					n = Math.floor(t / 60 % 60),
					a = Math.floor(t % 60),
					i = "";
				if(i = (e < 10 ? "0" + e : e) + ":", i = i + "" + (n < 10 ? "0" + n : n) + ":" + (a < 10 ? "0" + a : a), $("#hourtxt").text(i), t < 10) {
					var s = $(".linelist").find("li");
					$(s).eq(t).addClass("redli")
				}
				t < 20 && (tryflag = !1, $(".noinfor").text("即将开奖，禁止模拟")) //开奖倒计时小于20秒，禁止模拟开奖
			} else $(".noinfor").text("正在开奖，禁止模拟"),
				clearInterval(timer),
				k3v.playGame(),
				$("#timetitle").text("正在开奖"),
				$("#hourtxt").hide(),
				$("#opening").show()
				
		}, 1e3)
	},
	//开奖背景声音
	k3v.sound = {
		play: function(t) {
			"sounds" == $("#spanbtn").attr("class") && ifopen && ("all" == t ? document.getElementById(ifpaused).play() : (document.getElementById("audioidB").pause(), document.getElementById("audioidR").pause(), document.getElementById(t).play()))
		},
		stop: function(t) {
			var e = document.getElementById("audioidB");
			ifpaused = e.paused ? "audioidR" : "audioidB",
				document.getElementById("audioidB").pause(),
				document.getElementById("audioidR").pause()
		}
	},
	//开奖动画结束，展示结果
	k3v.stopVideo = function(t) {
		k3v.stopGame(e),
		k3v.updateData(t),
			setTimeout(function() {
				$("#timetitle").text("倒计时"), //显示倒计时
					$("#hourtxt").fadeIn(), //开奖倒计时淡出
					$("#opening").hide(), //开奖中gif图隐藏
					$(".linelist").find("li").removeClass("redli"),
					ifpaused = "audioidB",
					ifopen && $("#spanbtn").hasClass("sounds") && k3v.sound.play("audioidB"),
					k3v.bressBG(),
					tryflag = !0
			}, 2e3)
	},
	//开奖背景闪烁
	k3v.bressBG = function(t) {
		var e = 1,
			n = !1;
		void 0 != animateId.bressBG && clearInterval(animateId.bressBG), void 0 == t && (t = 80);
		var a = setInterval(function() {
			$(".bodybg").find("img").stop().animate({
				opacity: "0." + e
			}, t), n ? (e -= 1) < 1 && (n = !1) : (e += 1) > 8 && (n = !0)
		}, t);
		animateId.bressBG = a
	},
	//开奖结果大小
	k3v.sumBigSmall = function(t) {
		return t <= 10 ? "小" : "大"
	};
	let n = window.screen.width /$('.content').width();
	let b = $(window).height()/$('.content').height();
	console.log(window.screen.width);
	console.log($(window).width());
	$('.content').css('zoom', n);
	$(window).resize(function() {
		let n = window.screen.width /$('.content').width();
		let b = $(window).height()/$('.content').height();
		$('.content').css('zoom', n);
	})