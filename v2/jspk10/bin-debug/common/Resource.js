var __reflect = this && this.__reflect || function (e, t, _) {
    e.__class__ = t, _ ? _.push(t) : _ = [t], e.__types__ = e.__types__ ? _.concat(e.__types__) : _
}, game;
!function (e) {
    var t = function () {
        function e() {
        }

        return e.getRes = function (e) {
            return RES.getRes(e)
        }, e.getBitmapData = function (e, t) {
            return void 0 === t && (t = null), t ? RES.getRes(t + e) : RES.getRes(e)
        }, e
    }();
    t.gameConfigPath = "gameConfig_json", t.startAnimPath = "anim/startAnim.swf", t.webLogoPath = "webLogo_png", t.RES_UI = "ui_json.", e.Resource = t, __reflect(t.prototype, "game.Resource")
}(game || (game = {}));