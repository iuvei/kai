var __reflect = this && this.__reflect || function (n, t, r) {
    n.__class__ = t, r ? r.push(t) : r = [t], n.__types__ = n.__types__ ? r.concat(n.__types__) : r
}, __extends = this && this.__extends || function (n, t) {
    function r() {
        this.constructor = n
    }

    for (var e in t) t.hasOwnProperty(e) && (n[e] = t[e]);
    n.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
}, game;
!function (n) {
    var t = function (n) {
        function t() {
            return null !== n && n.apply(this, arguments) || this
        }

        return __extends(t, n), t.QianSan = function (n) {
            return t.GetQZHSanResult(n, 0)
        }, t.ZhongSan = function (n) {
            return t.GetQZHSanResult(n, 1)
        }, t.HouSan = function (n) {
            return t.GetQZHSanResult(n, 2)
        }, t.LongHu = function (n) {
            var t = flash.checkInt(n[0]), r = flash.checkInt(n[4]);
            return t > r ? "龍" : t < r ? "虎" : "和"
        }, t.total = function (n) {
            for (var t = 0, r = 0; r < n.length; r++) t += n[r];
            return t
        }, t.BigOrSmall = function (n) {
            return t.GetBigOrSmall(n)
        }, t.OddOrEven = function (n) {
            return t.GetOddOrEven(n)
        }, t.NumbersTotalOddOrEven = function (n) {
            return n = flash.checkInt(n), t.GetNumberOddOrEven(n)
        }, t.NumbersTotalBigOrSmall = function (n) {
            return n = flash.checkInt(n), t.GetTotalBigOrSamll(n)
        }, t.GetOddOrEven = function (n) {
            var t = 0;
            for (var r in n) {
                var e = n[r];
                e % 2 != 0 && t++
            }
            return t > 2 ? "单" : "双"
        }, t.GetQZHSanResult = function (n, r) {
            var e = flash.checkInt(n[r]), u = flash.checkInt(n[r + 1]), i = flash.checkInt(n[r + 2]);
            return t.IsBaozi(e, u, i) ? "豹子" : t.IsShunzi(e, u, i) ? "顺子" : t.IsDuizi(e, u, i) ? "对子" : t.IsBanshun(e, u, i) ? "半顺" : t.IsZaliu(e, u, i) ? "杂六" : ""
        }, t.GetBigOrSmall = function (n) {
            var t = 0;
            for (var r in n) {
                var e = n[r];
                e > 4 && t++
            }
            return t > 2 ? "大" : "小"
        }, t.IsBaozi = function (n, t, r) {
            return n == t && n == r
        }, t.IsShunzi = function (n, t, r) {
            var e = [n, t, r];
            return e.sort(function (n, t) {
                return n - t
            }), e[1] == e[0] + 1 && (e[2] == e[1] + 1 || 0 == e[0] && 9 == e[2]) || 0 == e[0] && 8 == e[1] && 9 == e[2]
        }, t.IsDuizi = function (n, t, r) {
            return n == t || t == r || n == r
        }, t.IsBanshun = function (n, t, r) {
            var e = [n, t, r];
            return e.sort(function (n, t) {
                return n - t
            }), e[1] == e[0] + 1 || e[2] == e[1] + 1 || 0 == e[0] && 9 == e[2]
        }, t.IsZaliu = function (n, r, e) {
            return !(t.IsBaozi(n, r, e) || t.IsShunzi(n, r, e) || t.IsDuizi(n, r, e) || t.IsBanshun(n, r, e))
        }, t.GetNumberBigOrSmall = function (n) {
            return n > 4 ? "大" : "小"
        }, t.GetNumberOddOrEven = function (n) {
            return n % 2 == 0 ? "双" : "单"
        }, t.GetTotalBigOrSamll = function (n) {
            return n > 22 ? "大" : "小"
        }, t
    }(egret.HashObject);
    n.CqsscExtension = t, __reflect(t.prototype, "game.CqsscExtension")
}(game || (game = {}));