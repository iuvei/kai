var __reflect = this && this.__reflect || function (e, t, _) {
    e.__class__ = t, _ ? _.push(t) : _ = [t], e.__types__ = e.__types__ ? _.concat(e.__types__) : _
}, game;
!function (e) {
    var t = function () {
        function e() {
        }

        return e.reset = function () {
            this.rank.length = 0, this.usedTime.length = 0
        }, e
    }();
    t.rank = [], t.usedTime = [], e.SceneData = t, __reflect(t.prototype, "game.SceneData")
}(game || (game = {}));