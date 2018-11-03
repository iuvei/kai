var __reflect = this && this.__reflect || function (t, e, a) {
    t.__class__ = e, a ? a.push(e) : a = [e], t.__types__ = t.__types__ ? a.concat(t.__types__) : a
}, game;
!function (t) {
    var e = function () {
        function e(e) {
            this._loopId = 0, this._countDownId = 0, this._awarding = !1, this._ui = e, t.AttacherUtil.attachSkin(this, e), this.init()
        }

        return e.prototype.init = function () {
            this.backRaceBtn.visible = this.awardingLab.visible = !1, this.cerrentPeriodLab.visible = !1;
            var e = flash.checkInt(t.TileConst.UNIT_NUM);
            this._rankImg = new Array(e);
            for (var a, i = 1; i <= e;) a = this._ui["num" + i], this._rankImg[i - 1] = a, ++i;
            this.soundBtn.selected = !0, this.soundBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, flash.bind(this.onBtnHandler, this), null), this.soundBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, flash.bind(this.onBtnHandler, this), null), this.countBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, flash.bind(this.onBtnHandler, this), null), this.backRaceBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, flash.bind(this.onBtnHandler, this), null), t.DataEventDispatcher.addEventListener(t.GameEventType.AWARD_DATA, this.onAwardDataUpdate, this), t.DataEventDispatcher.addEventListener(t.GameEventType.STATUS_CHANGE, this.onGameStatusChange, this), t.DataEventDispatcher.addEventListener(t.GameEventType.COUNT_DOWN_TICK, this.onCountDown, this), t.DataEventDispatcher.addEventListener(t.GameEventType.START_ANIM_COMPLETE, this.onDoStart, this)
        }, e.prototype.onDoStart = function (t) {
            this.start()
        }, e.prototype.onCountDown = function (e) {
            if (t.GameGlobal.status == t.Status.standby) {
                var a = flash.checkInt(e.data);
                this.countBtn.visible = a > 10 && !t.GameConst.isShowChart, this.backRaceBtn.visible = a > 10 && !this.countBtn.visible
            } else this.backRaceBtn.visible = this.countBtn.visible = !1
        }, e.prototype.onBtnHandler = function (e) {
            var a = e.target;
            switch (a) {
                case this.countBtn:
                    this.countBtn.visible = !1, this.backRaceBtn.visible = !0/*, t.GameConst.actionCount(t.GameConst.ACTION_CLICK, "data statistics"), t.DataEventDispatcher.dispatchEventWith(t.GameEventType.SHOW_CHART)*/;
                    break;
                case this.backRaceBtn:
                    this.countBtn.visible = !0, this.backRaceBtn.visible = !1, t.DataEventDispatcher.dispatchEventWith(t.GameEventType.SHOW_CHART);
                    break;
                case this.soundBtn:
                    e.type == egret.TouchEvent.TOUCH_BEGIN ? t.SoundLogic.initSound() : t.SoundLogic.isMute = this.soundBtn.selected
            }
        }, e.prototype.onGameStatusChange = function (e) {
            var a = flash.checkInt(e.data);
            switch (a) {
                case t.Status.standby:
                    this.setRank(t.DataManager.currentawardNumbers);
                    break;
                case t.Status.goAnimate:
                    t.DataManager.isSimulate || (this.cerrentPeriodLab.text = "本期 " + (parseInt(t.DataManager.currentperiodNumber) + 1) + "期", this.awardTimeLab.visible = this.nextPeriodLab.visible = !1, this.cerrentPeriodLab.visible = this.awardingLab.visible = this._awarding = !0);
                    break;
                case t.Status.start:
                    break;
                case t.Status.over:
                    this.cerrentPeriodLab.visible = this.awardingLab.visible = this._awarding = !1, t.LoopManager.clearInterval(this._loopId), this._loopId = 0, this.onAwardDataUpdate(null);
                    break;
                case t.Status.rest:
                    this.cerrentPeriodLab.visible = !1, t.DataManager.isSimulate ? this.cerrentPeriodLab.text = "上期 " + t.DataManager.currentperiodNumber + "期" : (this.countBtn.visible = !1, this.backRaceBtn.visible = !0)
            }
        }, e.prototype.start = function () {
            this._loopId = flash.checkInt(t.LoopManager.setInterval(this.onLoop, this, 500))
        }, e.prototype.onAwardDataUpdate = function (e) {
            e && !e.data.isNew && 1 == this._awarding || t.GameGlobal.status == t.Status.free || (this.awardTimeLab.visible = this.nextPeriodLab.visible = !0,
                this.cerrentPeriodLab.visible = this.awardingLab.visible = this._awarding = !1,
                this.nextPeriodLab.text = "本期 " + t.DataManager.currentperiodNumber ,
                this.awardTimeLab.text = "时间 " + t.DataManager.nextawardTime.split(" ")[1].substring(0, 5),
                this.cerrentPeriodLab.text = "上期 " + t.DataManager.currentperiodNumber + "期", t.GameGlobal.status == t.Status.standby && this.setRank(t.DataManager.currentawardNumbers))
        }, e.prototype.onLogoBtn = function (e) {
            t.WebUtil.openNewUrl(t.GameConst.urlConfig.dataHost)
        }, e.prototype.setRank = function (e) {
            if (e) for (var a, i = 0, n = 0; i < e.length;) n = flash.checkInt(e[i]), t.SceneData.rank[i] = n, a = this._rankImg[n - 1], a.parent.setChildIndex(a, i), ++i
        }, e.prototype.onLoop = function () {
            var e = t.SceneData.rank;
            this._lastRank && e.toString() == this._lastRank.toString() || (this._lastRank = e.concat(), this.setRank(e))
        }, e
    }();
    t.TopView = e, __reflect(e.prototype, "game.TopView")
}(game || (game = {}));