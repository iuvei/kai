var __reflect = this && this.__reflect || function (t, e, r) {
    t.__class__ = e, r ? r.push(e) : r = [e], t.__types__ = t.__types__ ? r.concat(t.__types__) : r
}, __extends = this && this.__extends || function (t, e) {
    function r() {
        this.constructor = t
    }

    for (var a in e) e.hasOwnProperty(a) && (t[a] = e[a]);
    t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r)
}, game;
!function (t) {
    var e = function (e) {
        function r() {
            return e.call(this) || this
        }

        return __extends(r, e), r.init = function () {
            this._loader = new t.ADLoader
        }, r.updateAwardData = function () {
            var e = t.GameConst.getIndexURLByName("awardData");
            this._loader.loadData(e, this.onUpdateAwardData, this, this.onGetIOError)
        }, r.onGetIOError = function (t) {
        }, r.onUpdateAwardData = function (e) {
            if (e) {


                this.hasData = !0;
                var a = !1;
                void 0 != this.currentperiodNumber && this.currentperiodNumber != e.datas.last_opencode.expect && (egret.clearInterval(this._getId), this._getId = 0, a = !0);

                var n = parseInt(e.datas.present.opentime_remaining * 1e3);
                !a && n < 4e3 ? this.nextawardTimeInterval = 4e3 : this.nextawardTimeInterval = n ;//开奖倒计时
                    this.currentperiodNumber = e.datas.last_opencode.expect;//本期期号

                    this.currentawardTime = e.datas.last_opencode.opentime;//本期开奖时间

                    /*this.currentPeriodDate = e.current.periodDate;//？*/
                    this.currentawardNumbers = [];

                for (var i = e.datas.last_opencode.opencode.split(","), s = i.length, o = 0; o < s; ++o) r.currentawardNumbers[o] = parseInt(i[o]);
                this.nextperiodNumber = e.datas.present.expect;//下期期号
                    this.nextawardTime = e.datas.present.opentimestamp;//下期开奖时间
                    this.startTimer = egret.getTimer();
                    t.DataEventDispatcher.dispatchEventWith(t.GameEventType.AWARD_DATA, {
                    isNew: a,
                    numbers: this.currentawardNumbers
                })
            } else console.log("get data null  ")
        }, r.dispatchData = function () {
            t.DataEventDispatcher.dispatchEventWith(t.GameEventType.AWARD_DATA, {
                isNew: !1,
                numbers: r.currentawardNumbers
            })
        }, r.GetDataContinuty = function () {
            this._getId = egret.setInterval(this.updateAwardData, this, 1e3)
        }, r.getSimulateAwardData = function () {
            for (var e = t.GameConst.NUM, r = 0, a = []; r < e;) a[r] = ++r;
            r = 0;
            for (var n, i; r < e;) n = Math.random() * a.length >> 0, i = Math.random() * a.length >> 0, n != i && (a[n] ^= a[i], a[i] ^= a[n], a[n] ^= a[i], ++r);
            return a
        }, r
    }(egret.HashObject);
    e.hasData = !1, e.isSimulate = !1, t.DataManager = e, __reflect(e.prototype, "game.DataManager")
}(game || (game = {}));