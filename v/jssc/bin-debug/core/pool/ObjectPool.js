var __reflect = this && this.__reflect || function (t, e, o) {
    t.__class__ = e, o ? o.push(e) : o = [e], t.__types__ = t.__types__ ? o.concat(t.__types__) : o
}, game;
!function (t) {
    var e = function () {
        function t() {
        }

        return t.getObj = function (e) {
            var o;
            return t._objList.hasOwnProperty(e) ? o = t._objList[e] : t._objList[e] = o = [], 0 == o.length ? new e : o.pop()
        }, t.putInt = function (t) {
            t.resetObject(), this.putIntCommon(t)
        }, t.putIntCommon = function (e) {
            var o = Object.getPrototypeOf(e).constructor;
            if (!o) {
                var n = egret.getQualifiedClassName(e);
                o = egret.getDefinitionByName(n)
            }
            var _;
            t._objList.hasOwnProperty(o) ? _ = t._objList[o] : t._objList[o] = _ = [], _.push(e)
        }, t.destruct = function () {
            t._objList = {}
        }, t
    }();
    e._objList = {}, t.ObjectPool = e, __reflect(e.prototype, "game.ObjectPool")
}(game || (game = {}));