var __reflect = this && this.__reflect || function (t, e, s) {
    t.__class__ = e, s ? s.push(e) : s = [e], t.__types__ = t.__types__ ? s.concat(t.__types__) : s
}, game;
!function (t) {
    var e = function () {
        function e() {
            this._speed = 0, this._direction = 0, this._tSpeed = 0, this._distance = 0, this.x = 0, this.y = 0, this.width = 0, this.height = 0
        }

        return e.prototype.contain = function (t) {
        }, e.prototype.setViewRange = function (t, e) {
            this.width = t, this.height = e
        }, e.prototype.setTarget = function (t) {
            this._target = t, this.x = t.x
        }, e.prototype.setDirection = function (t) {
            this._direction = t
        }, e.prototype.setConfig = function (e) {
            this._aiAcc = e.AI.accelerate;
            var s = e.unit;
            this._unitAndBorderDistance = parseInt(s.unitAndBorderDistance);
            s.list;
            this._startSpeed = parseInt(e.AI.startSpeed), this._distance = parseInt(s.startPoint) - this._unitAndBorderDistance, this._sprintAddSpeed = parseFloat(e.camera.sprintAddSpeed), this.setDirection(t.TileConst.DIRECTION)
        }, e.prototype.move = function () {
            this._speed < this._tSpeed && (this._speed += this.Acc, t.GameGlobal.status == t.Status.start && this._tSpeed <= this._speed && (this._tSpeed = 0, t.GameGlobal.status = t.Status.free)), this.x += this._direction * this._speed, this._target.x = -this.x
        }, Object.defineProperty(e.prototype, "speed", {
            get: function () {
                return this._speed
            }, set: function (e) {
                if (isNaN(this.Acc) || this._tSpeed > this._speed) {
                    var s = this._startSpeed, i = this._aiAcc, n = this._distance;
                    this.Acc = Math.pow(i, 2) * Math.pow(e, 2) / (Math.pow(e - s, 2) * i + 2 * n * Math.pow(i, 2)), this._tSpeed = e
                } else t.GameGlobal.status == t.Status.sprint ? this._speed = e + this._sprintAddSpeed : this._speed = e
            }, enumerable: !0, configurable: !0
        }), e.prototype.reset = function () {
            this._speed = 0, this.Acc = NaN, this._target.x = this.x = 0
        }, e
    }();
    t.Camera = e, __reflect(e.prototype, "game.Camera")
}(game || (game = {}));