var __reflect = this && this.__reflect || function (t, e, a) {
    t.__class__ = e, a ? a.push(e) : a = [e], t.__types__ = t.__types__ ? a.concat(t.__types__) : a
}, game;
!function (t) {
    var e = function () {
        function e(e) {
            this._countDownId = 0, this._isPlayStartAnim = !1, this._animLoopID = 0, this._ui = e, t.AttacherUtil.attachSkin(this, e), this.init()
        }

        return e.prototype.init = function () {
            var e = new egret.Bitmap(RES.getRes("startBg_jpg"));
            this._ui.addChildAt(e, 0);
            var a = new dragonBones.EgretFactory;
            a.parseDragonBonesData(RES.getRes("start_ske_json")), a.parseTextureAtlasData(RES.getRes("start_tex_json"), RES.getRes("start_tex_png")), this._startAnim = a.buildArmatureDisplay("Armature", "start"), this._ui.addChildAt(this._startAnim, 1), this._startAnim.animation.gotoAndStop("stop"), this._startAnim.x = 490, this._startAnim.y = 315, this.timeLab.filters = [new egret.DropShadowFilter(4, 45, 0, .3, 4, 4, 1)], this._lightBmps = new Array(3);
            for (var i = 0; i < 3; i++) this._lightBmps[i] = this._ui["light" + i];
            this._countDownImg.visible = !1, this._countDownImg.scaleX = this._countDownImg.scaleY = .95, t.DataEventDispatcher.addEventListener(t.GameEventType.AWARD_DATA, this.onAwardDataUpdate, this), t.DataEventDispatcher.addEventListener(t.GameEventType.STATUS_CHANGE, this.statusChange, this), t.DataEventDispatcher.addEventListener(t.GameEventType.TRY_GAME, this.onTryGame, this)
        }, e.prototype.onTryGame = function (e) {
            t.GameGlobal.status = t.Status.readyAnimate;
            var a = this._startAnim.animation.gotoAndPlay("wait");
            a.playTimes = 3, this._startAnim.armature.addEventListener(dragonBones.AnimationEvent.COMPLETE, this.playGo, this)
        }, e.prototype.statusChange = function (e) {
            var a = flash.checkInt(e.data);
            switch (a) {
                case t.Status.standby:
                    this._isPlayStartAnim = !1, this._ui.visible = !0;
                    for (var i = flash.checkInt(0); i < this._lightBmps.length; i++) this._lightBmps[i].source = t.Resource.getBitmapData("redLight");
                    break;
                case t.Status.goAnimate:
                    break;
                case t.Status.rest:
                    this.onAwardDataUpdate(null)
            }
        }, e.prototype.playGo = function (e) {
            void 0 === e && (e = null), this._startAnim.armature.removeEventListener(dragonBones.AnimationEvent.COMPLETE, this.playGo, this);
            var a = this._startAnim.animation.gotoAndPlay("go");
            a.timeScale = 1.2, this._startAnim.armature.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.onStartAnimComplete, this), t.GameGlobal.status = t.Status.goAnimate
        }, e.prototype.onAwardDataUpdate = function (e) {
            0 != this._countDownId || t.GameGlobal.status != t.Status.standby && t.GameGlobal.status != t.Status.rest || (this._countDownId = t.LoopManager.addToSecond(this.onCountDown, this))
        }, e.prototype.onCountDown = function () {
            var e = this,
                a = flash.checkInt(t.DataManager.leftTime = Math.round((t.DataManager.nextawardTimeInterval - (egret.getTimer() - t.DataManager.startTimer)) / 1e3));
            if (this.timeLab.text = a + "", this.timeLab.visible = a > 10 && t.GameGlobal.status == t.Status.standby, t.DataEventDispatcher.dispatchEventWith(t.GameEventType.COUNT_DOWN_TICK, a), a <= 0) this._countDownImg.visible = !0, this._countDownImg.source = t.Resource.getBitmapData("cdGO"), this._countDownImg.x = this._ui.stage.stageWidth - this._countDownImg.width >> 1, this._countDownImg.y = this.timeLab.y, this.cdTween(), t.LoopManager.setTimeout(function () {
                e._countDownImg.visible = !1
            }, this, 500), this.playGo(), t.LoopManager.removeFromeSecond(this._countDownId), this._countDownId = 0; else if (a > 0 && a < 11) {
                if (a <= 5 && a >= 4) {
                    this.lightContainer.alpha = 0;
                    var i = egret.Tween.get(this.lightContainer);
                    i.to({alpha: 1}, 800)
                } else 3 == a ? (this.lightContainer.alpha = 1, this._lightBmps[0].source = t.Resource.getBitmapData("greenLight", t.Resource.RES_UI)) : 2 == a ? this._lightBmps[1].source = t.Resource.getBitmapData("greenLight", t.Resource.RES_UI) : 1 == a && (this._lightBmps[2].source = t.Resource.getBitmapData("greenLight", t.Resource.RES_UI));
                this._countDownImg.visible = !0, this._countDownImg.source = t.Resource.getBitmapData("cd" + a), this.cdTween(), 0 == this._isPlayStartAnim && (this._isPlayStartAnim = !0, this._startAnim.animation.gotoAndPlay("wait"), t.GameGlobal.status = t.Status.readyAnimate)
            } else this._countDownImg.visible = !1
        }, e.prototype.cdTween = function () {
            var t = (this._countDownImg.x, this._countDownImg.y, 1.05), e = 100;
            this._countDownImg.alpha = .4, egret.Tween.get(this._countDownImg).to({
                alpha: 1,
                scaleX: t,
                scaleY: t
            }, e).to({scaleX: 1, scaleY: 1}, 200)
        }, e.prototype.onStartAnimComplete = function () {
            this._startAnim.armature.removeEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.onStartAnimComplete, this), this._ui.visible = !1, this._startAnim.animation.gotoAndStop("stop"), t.DataEventDispatcher.dispatchEventWith(t.GameEventType.START_ANIM_COMPLETE)
        }, e
    }();
    t.MiddleView = e, __reflect(e.prototype, "game.MiddleView")
}(game || (game = {}));