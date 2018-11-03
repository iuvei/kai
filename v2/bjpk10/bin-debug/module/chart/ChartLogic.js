var __reflect = this && this.__reflect || function (t, e, a) {
    t.__class__ = e, a ? a.push(e) : a = [e], t.__types__ = t.__types__ ? a.concat(t.__types__) : a
}, __extends = this && this.__extends || function (t, e) {
    function a() {
        this.constructor = t
    }

    for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
    t.prototype = null === e ? Object.create(e) : (a.prototype = e.prototype, new a)
}, game;
!function (t) {
    var e = function (e) {
        function a() {
            return e.call(this) || this
        }

        return __extends(a, e), a.init = function (e) {
            var r = new eui.Component;
            r.skinName = ChartSkin, a._chart = new t.Chart(r), a._chart.container = e, t.Chart.URL = t.GameConst.urlConfig.dataHost, a._chart.carChart = new t.CarChart(r.car), a.loaderHao = new t.ADLoader, a.loaderRecommend = new t.ADLoader, a.reloadDataHao(), t.DataEventDispatcher.addEventListener(t.GameEventType.STATUS_CHANGE, a.statusChange, a), t.DataEventDispatcher.addEventListener(t.GameEventType.AWARD_DATA, a.onAwardDataUpdate, a), t.DataEventDispatcher.addEventListener(t.GameEventType.SHOW_CHART, a.onShowChart, a), t.DataEventDispatcher.addEventListener(t.GameEventType.COUNT_DOWN_TICK, a.onCountDown, a)
        }, a.getRequest = function (t, e, a) {
            function r(r) {
                try {
                    var n = r.currentTarget;
                    if (void 0 == n.response || "" == n.response) return;
                    var o = JSON.parse(n.response);
                    t.call(a, o)
                } catch (s) {
                    e.call(a)
                }
            }

            var n = new egret.HttpRequest;
            return n.responseType = egret.HttpResponseType.TEXT, n.addEventListener(egret.Event.COMPLETE, r, a), n.addEventListener(egret.IOErrorEvent.IO_ERROR, e, a), n
        }, a.sendRequest = function (t, e) {
            t.abort(), t.open(e, egret.HttpMethod.GET), t.send()
        }, a.onCountDown = function (e) {
            var r = flash.checkInt(e.data);
            a._chart.setTxt(r), r <= 10 && t.GameConst.isShowChart && a._chart.hide()
        }, a.reloadDataHao = function () {
            var e = t.GameConst.getIndexURLByName("analysisData");
            a.loaderHao.loadData(e, a.onNewDataHao, a, a.onErrorHao)
        }, a.onNewDataHao = function (t) {
            var e = t[0];
            a._chart.reference(e.betData), a._chart.ballStat(e.ballStat), a._chart.omit(e.numOmit), a._chart.setOmit(1), a._chart.HistoryNumber(e.drawHistories), a._chart.addEventListener("recovetReference", a.recovetReference, a), a._chart.setNext_txt(a._drawNo)
        }, a.onErrorHao = function (t) {
        }, a.onNewDataRE = function (t) {
            a._chart.setReferenceTXT(t.betData)
        }, a.onErrorRE = function (t) {
            console.log("加载数据失败:re")
        }, a.recovetReference = function (e) {
            var r = t.GameConst.getIndexURLByName("betData");
            a.loaderRecommend.loadData(r, a.onNewDataRE, a, a.onErrorRE)
        }, a.statusChange = function (e) {
            var r = flash.checkInt(e.data);
            switch (r) {
                case t.Status.rest:
                    t.DataManager.isSimulate || (a.reloadDataHao(), a._chart.toggle())
            }
        }, a.onAwardDataUpdate = function (e) {
            var r = flash.checkInt(t.GameGlobal.status);
            1 != e.data.isNew && r != t.Status.standby && r != t.Status.rest || (a._drawNo = parseInt(t.DataManager.nextperiodNumber), a._chart.setNext_txt(a._drawNo), a._chart.setCarColor(t.DataManager.currentawardNumbers))
        }, a.onShowChart = function (t) {
            a._chart.toggle()
        }, a
    }(egret.HashObject);
    e._drawNo = NaN, t.ChartLogic = e, __reflect(e.prototype, "game.ChartLogic")
}(game || (game = {}));