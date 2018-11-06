var __reflect = this && this.__reflect || function (t, e, r) {
    t.__class__ = e, r ? r.push(e) : r = [e], t.__types__ = t.__types__ ? r.concat(t.__types__) : r
}, game;
!function (t) {
    var e = function () {
        function t() {
            this.request = new egret.HttpRequest;

                this.request.responseType = egret.HttpResponseType.TEXT,
                this.request.addEventListener(egret.Event.COMPLETE,
                    this.oncomplete, this),
                this.request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.showError, this)
        }

        return t.prototype.oncomplete = function (t) {
            try {
                var e = t.currentTarget;
                if (void 0 == e.response || "" == e.response) return void this.showError("null data");
                var r = JSON.parse(e.response);
                this._completeFunc.call(this._thisObj, r)
            } catch (s) {
                this.showError(s)
            }
        }, t.prototype.showError = function (t) {
            null != this._errorFunc && this._errorFunc.call(this._thisObj, t)
        }, t.prototype.loadData = function (t, e, r, s) {
            void 0 === s && (s = null), this._completeFunc = e, this._errorFunc = s, this._thisObj = r, this.request.abort(), this.request.open(t, egret.HttpMethod.GET), this.request.send()
        }, t
    }();
    t.ADLoader = e, __reflect(e.prototype, "game.ADLoader")
}(game || (game = {}));