var __reflect = this && this.__reflect || function (t, e, _) {
    t.__class__ = e, _ ? _.push(e) : _ = [e], t.__types__ = t.__types__ ? _.concat(t.__types__) : _
}, game;
!function (t) {
    var e = function () {
        function e() {
        }

        return Object.defineProperty(e, "status", {
            get: function () {
                return this._status
            }, set: function (e) {
                e != this._status && (this._status = e, egret.log("status:", e), t.DataEventDispatcher.dispatchEventWith(t.GameEventType.STATUS_CHANGE, e))
            }, enumerable: !0, configurable: !0
        }), e
    }();
    t.GameGlobal = e, __reflect(e.prototype, "game.GameGlobal")
}(game || (game = {}));