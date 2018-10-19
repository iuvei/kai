var __reflect = this && this.__reflect || function (t, e, s) {
    t.__class__ = e, s ? s.push(e) : s = [e], t.__types__ = t.__types__ ? s.concat(t.__types__) : s
}, __extends = this && this.__extends || function (t, e) {
    function s() {
        this.constructor = t
    }

    for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
    t.prototype = null === e ? Object.create(e) : (s.prototype = e.prototype, new s)
}, game;
!function (t) {
    var e = function (e) {
        function s() {
            var s = e.call(this) || this;
            return s._sprintSpeed = 10, s._camera = new t.Camera, s._camera.setTarget(s), s
        }

        return __extends(s, e), Object.defineProperty(s.prototype, "camera", {
            get: function () {
                return this._camera
            }, enumerable: !0, configurable: !0
        }), s.prototype.setCameraRange = function (t, e) {
            this._camera.width = t, this._camera.height = e
        }, s.prototype.init = function (e) {
            this._camera.setConfig(e), this._unitList = [], this._cameraSpeedOffset = e.camera.speedOffset, this._endLineOffSet = parseInt(e.endLineOffSet), this._endLinePosOffset = e.endLinePosOffset;
            var s = e.unit;
            this._sprintSpeed = s.sprintSpeed;
            for (var i, n, a = s.list, r = s.startScale, o = s.stepScale, h = s.space, _ = s.startY, u = e.AI, c = (u.speed.split("-"), 0), p = t.TileConst.UNIT_NUM = a.length, f = t.GameConst.CAR_START_POINT = parseInt(s.startPoint); c < p;) i = new t.SceneAnimate, i.setData(a[c]), i.status = t.UnitStatus.standby, i.num = c + 1, this.addChild(i), this._unitList[this._unitList.length] = i, n = new t.AI(i), n.setCamera(this._camera), i.ai = n, n.setConfig(u), i.scaleX = i.scaleY = r + c * o, i.x = f, i.y = _ + h * c, ++c;
            this._currentRankUnitList = this._unitList.concat(), t.DataEventDispatcher.addEventListener(t.GameEventType.STATUS_CHANGE, this.onGameStatusChange, this)
        }, s.prototype.onGameStatusChange = function (e) {
            var s = e.data;
            if (s == t.Status.start) this._startTime = egret.getTimer(); else if (s == t.Status.stop) {
                for (var i = this._unitList.length, n = 0; n < i; ++n) this._unitList[n].stop();
                t.GameGlobal.status = t.Status.photo
            } else if (s == t.Status.finish) for (i = this._unitList.length, n = 0; n < i; ++n) this._unitList[n].play()
        }, s.prototype.reset = function () {
            this._startLinePos = NaN, this._endPos = NaN, this._camera.reset(), t.SceneData.reset();
            for (var e, s = (t.TileConst.UNIT_NUM, t.GameConst.CAR_START_POINT), i = 0; i < this._unitList.length; i++) e = this._unitList[i], e.x = s, e.reset()
        }, s.prototype.setEndPos = function (t) {
            var e = this.globalToLocal(t, 0);
            this._endPos = e.x
        }, s.prototype.setStartPos = function (t) {
            var e = this.globalToLocal(t, 0);
            this._startLinePos = e.x
        }, s.prototype.onLoop = function () {
            for (var e = this._unitList.length, s = 0; s < e; ++s) this._unitList[s].onLoop();
            var i = t.GameGlobal.status;
            switch (i) {
                case t.Status.start:
                case t.Status.free:
                case t.Status.sprint:
                    if (this.moveElement(), this.refreshRank(), this.moveCamera(), i == t.Status.sprint && !isNaN(this._endPos)) {
                        var n, a = Math.abs(this._endPos);
                        for (e = this._currentRankUnitList.length, s = 0; s < e; s++) if (n = this._currentRankUnitList[s], Math.abs(n.x) >= a + this._endLinePosOffset) {
                            t.GameGlobal.status = t.Status.stop;
                            break
                        }
                    }
                    break;
                case t.Status.finish:
                    this.moveElement()
            }
        }, s.prototype.moveElement = function () {
            for (var t = 0; t < this._unitList.length; t++) this._unitList[t].move()
        }, s.prototype.moveCamera = function () {
            var e = 0;
            if (t.GameGlobal.status == t.Status.start) for (var s, i = 0; i < this._unitList.length; i++) s = this._unitList[i].ai.targetSpeed, s > e && (e = s); else e = this._currentRankUnitList[0].speed - this._cameraSpeedOffset;
            this._camera.speed = e, this._camera.move()
        }, s.prototype.refreshRank = function () {
            this._currentRankUnitList.sort(this.sortRankFunc);
            for (var e = 0; e < this._currentRankUnitList.length; e++) t.SceneData.rank[e] = this._currentRankUnitList[e].num, this._currentRankUnitList[e].rank = e + 1
        }, s.prototype.sortRankFunc = function (t, e) {
            return t.x - e.x
        }, s.prototype.setRank = function (e) {
            egret.log("result:", e.toString());
            var s, i = 0;
            for (this._sprintSpeed; i < this._unitList.length;) s = this._unitList[e[i] - 1].ai, s.targetResultRank = i + 1, ++i;
            t.GameGlobal.status = t.Status.sprint
        }, s
    }(egret.Sprite);
    t.GameScene = e, __reflect(e.prototype, "game.GameScene")
}(game || (game = {}));