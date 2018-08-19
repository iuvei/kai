var __reflect = this && this.__reflect || function (t, e, a) {
    t.__class__ = e, a ? a.push(e) : a = [e], t.__types__ = t.__types__ ? a.concat(t.__types__) : a
}, game;
!function (t) {
    var e = function () {
        function e(e) {
            this._ui = e, t.AttacherUtil.attachSkin(this, e), this.init()
        }

        return e.prototype.init = function () {
            this.tryBtn.visible = !1,
                this.tryBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, flash.bind(this.onBtnHandler, this), null),
                t.DataEventDispatcher.addEventListener(t.GameEventType.AWARD_DATA, this.onAwardDataUpdate, this),
                t.DataEventDispatcher.addEventListener(t.GameEventType.COUNT_DOWN_TICK, this.onCountDown, this),
                t.DataEventDispatcher.addEventListener(t.GameEventType.START_ANIM_COMPLETE, this.onDoStart, this),
                t.DataEventDispatcher.addEventListener(t.GameEventType.STATUS_CHANGE, this.statusChange, this)
        }, e.prototype.statusChange = function (e) {
            var a = e.data;
            a == t.Status.rest && (this._ui.visible = !0)
        }, e.prototype.onDoStart = function (t) {
            this._ui.visible = !1
        }, e.prototype.onCountDown = function (e) {
            var a = flash.checkInt(e.data);
            this.tryBtn.touchEnabled = this.tryBtn.visible = a > t.GameConst.SIMULATE_ENABLE && t.GameGlobal.status == t.Status.standby, this.cup.visible = !this.tryBtn.visible
        }, e.prototype.onAwardDataUpdate = function (e) {
            this.periodstxt(t.DataManager.currentperiodNumber, t.DataManager.currentawardNumbers, t.DataManager.currentawardTime), this.longhu(t.DataManager.currentawardNumbers)
        }, e.prototype.onBtnHandler = function (e) {
            t.DataManager.isSimulate = !0, this.flag.play(), this.tryBtn.touchEnabled = !1, t.DataEventDispatcher.dispatchEventWith(t.GameEventType.TRY_GAME)/*, t.GameConst.actionCount(t.GameConst.ACTION_CLICK, "simulate award")*/
        }, e.prototype.periodstxt = function (t, e, a) {
            this.up_txt.text = t, this.day_txt.text = a.slice(0, 16);
            var i = e[0] + e[1] + e[2], n = i % 4;
            var z = e[4] + e[5] + e[6],x = z % 4;
            var h = e[7] + e[8] + e[9],g = h % 4;

            if(n==1){
                this.txt_total.text = "1";
            }if (n==2){
                this.txt_total.text = "2";
            } if(n==3){
                this.txt_total.text = "3";
            }if (n==0){
                this.txt_total.text = "4";
            }if(x==1){
                this.txt_bs.text = "1"
            }if(x==2){
                this.txt_bs.text = "2"
            }if(x==3){
                this.txt_bs.text = "3"
            }if (x==0){
                this.txt_bs.text = "4"
            }if(g==1){
                this.txt_ds.text = "1"
            }if(g==2){
                this.txt_ds.text = "2"
            }if(g==3){
                this.txt_ds.text = "3"
            }if(g==0){
                this.txt_ds.text = "4"
            }

               /* this.txt_total.text = i.toString(), i > 11 ? this.txt_bs.text = "大" : this.txt_bs.text = "小"*/
        }, e.prototype.longhu = function (t) {
            t[0] > t[9] ? this.txt_lh_1.text = "" : this.txt_lh_1.text = "",
                t[1] > t[8] ? this.txt_lh_2.text = "" : this.txt_lh_2.text = "",
                t[2] > t[7] ? this.txt_lh_3.text = "" : this.txt_lh_3.text = "",
                t[3] > t[6] ? this.txt_lh_4.text = "" : this.txt_lh_4.text = "",
                t[4] > t[5] ? this.txt_lh_5.text = "" : this.txt_lh_5.text = ""
        }, e
    }();
    t.BottomView = e, __reflect(e.prototype, "game.BottomView")
}(game || (game = {}));