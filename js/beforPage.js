/**
 * 在页面内容之前执行
 */
var beforPageJs = {
	getGameName : function() {
		var pathname = window.location.pathname;
		console.log(pathname);
		if (pathname.indexOf("/fc3d/") >= 0
				|| pathname.indexOf("/gdkl10/") >= 0
				|| pathname.indexOf("/jsk3/") >= 0
				|| pathname.indexOf("/tjssc/") >= 0
				|| pathname.indexOf("/kl8/") >= 0
				|| pathname.indexOf("/pk10/") >= 0
				|| pathname.indexOf("/cqssc/") >= 0
				|| pathname.indexOf("/cqft/") >= 0
				|| pathname.indexOf("/jsssc/") >= 0
				|| pathname.indexOf("/gd11x5/") >= 0
				|| pathname.indexOf("/xyft/") >= 0
				|| pathname.indexOf("/bjft/") >= 0
				|| pathname.indexOf("/jssc/") >= 0
				|| pathname.indexOf("/sfcft/") >= 0
				|| pathname.indexOf("/sfpk10ft/") >= 0
				|| pathname.indexOf("/ftft/") >= 0
				|| pathname.indexOf("/js11x5/") >= 0
				|| pathname.indexOf("/cqft") >= 0
				|| pathname.indexOf("/pc28") >= 0
				|| pathname.indexOf("/jnd28") >= 0
				|| pathname.indexOf("/js28") >= 0
				|| pathname.indexOf("/jsdd") >= 0
				|| pathname.indexOf("/txffc") >= 0
				|| pathname.indexOf("/tcssc") >= 0
				|| pathname.indexOf("/tcpk10") >= 0
				|| pathname.indexOf("/sfssc") >= 0
				|| pathname.indexOf("/sfpk10") >= 0
				|| pathname.indexOf("/pcdd") >= 0
				|| pathname.indexOf("/jlk3") >= 0
				|| pathname.indexOf("/jisuk3") >= 0
				|| pathname.indexOf("/gxk3") >= 0) {
            var i = 0;
            if(pathname.split("/")[1] == 'fuzhi')
                i = 1;
			beforPageJs.gameName = pathname.split("/")[1+i];
			// console.log("当前页面游戏名称： beforPageJs.gameName = " +
			// beforPageJs.gameName);
			beforPageJs.pageName = pathname.split("/")[2+i].split(".")[0];
			// console.log("当前页面： beforPageJs.pageName = " +
			// beforPageJs.pageName);
		}
	}
};
// 不等页面加载完，先处理
beforPageJs.getGameName();

