var __reflect = this && this.__reflect || function (t, i, r) {
    t.__class__ = i, r ? r.push(i) : r = [i], t.__types__ = t.__types__ ? r.concat(t.__types__) : r
}, game;
!function (t) {
    var i = function () {
        function i(i) {
            this._ranking = 1, this._pointVerticalArray = [0, 16, 32, 48, 64, 80, 96, 112, 128, 145], this._rankStrArr = ["冠军", "亚军", "第三名", "第四名", "第五名", "第六名", "第七名", "第八名", "第九名", "第十名"], this._ui = i, t.AttacherUtil.attachSkin(this, i), this.init(), this.clear(), this.chartGrp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this)
        }
        return i.prototype.init = function () {
            this.pointList = [];
            for (var t, i = 0, r = 16, s = RES.getRes("chart_json.bluePoint"), e = 0; e < 30; ++e) t = new egret.Bitmap(s), this.chartGrp.addChild(t), t.name = "point" + e, t.touchEnabled = !0, t.anchorOffsetX = s.textureWidth >> 1, t.anchorOffsetY = s.textureHeight >> 1, t.x = i + r * e, this.pointList[e] = t;
            var a;
            for (this.txtList = [], i = 0, r = 33, e = 0; e < 15; ++e) a = new egret.TextField, a.size = 14, a.textColor = 8437503, this.chartTextGrp.addChild(a), a.x = i + r * e, this.txtList[e] = a;
            for (this._analysisPointArray = [], e = 0; e < 10; ++e) this._analysisPointArray[e] = new Array;
            this.lineCtn = new egret.Sprite, this.chartGrp.addChild(this.lineCtn), this.chartGrp.setChildIndex(this.tip, this.chartGrp.numChildren - 1)
        }, i.prototype.analysisData = function () {
            if (!this._dataProvider || !this._dataProvider.length) return void this.clearAnalysisData();
            var t = 0;
            for (t = 0; t < 10; ++t) this._analysisPointArray[t] = new Array;
            this._analysisPeriodsArray = [];
            var i;
            for (this._dataProvider.length > 30 && (t = flash.checkInt(this._dataProvider.length - 30)), t; t < this._dataProvider.length; t++) i = this._dataProvider[t], "object" == typeof i && (this._analysisPeriodsArray.push(i.periodNumber), this.pushRanking(String(i.numbers)))
        }, i.prototype.pushRanking = function (t) {
            if (t) {
                var i = this._analysisPointArray.length, r = t.split(","), s = r.length;
                for (e = 0; e < i; ++e) s > e ? this._analysisPointArray[e].push(parseInt(r[e])) : this._analysisPointArray[e].push(0)
            } else for (var e = 0; e < 10; ++e) this._analysisPointArray[e].push(0)
        }, i.prototype.showRankingData = function (t) {
            t = flash.checkInt(t), this.clear();
            var i = this._rankStrArr[t - 1];
            if (this.txt_title.text = i + "走势图", this._analysisPeriodsArray && this._analysisPeriodsArray.length) {
                this.setPeriodsText(this._analysisPeriodsArray);
                var r = this._analysisPointArray[t - 1];
                if (r && r.length) {
                    this._pointVerticalArray_now = [];
                    for (var s = 0; s < r.length; s++) {
                        var e = flash.checkInt(flash.checkInt(r[s]) - 1);
                        e < 0 || e > 9 ? this._pointVerticalArray_now.push(-1) : this._pointVerticalArray_now.push(this._pointVerticalArray[e])
                    }
                    this.setPointY(this._pointVerticalArray_now), this.drawLine()
                }
            }
        }, i.prototype.setPointY = function (t) {
            for (var i, r = 0, s = 0; s < t.length; s++) r = flash.checkInt(flash.checkInt(t[s])), i = this.getPointDisplay(s), i && (r == -1 ? i.visible = !1 : (i.y = r, i.visible = !0))
        }, i.prototype.setPeriodsText = function (t) {
            for (var i, r = 0; r < t.length; r++) r % 2 == 1 && (i = this.getPeriodsTextFile((r - 1) / 2), i && (i.text = t[r], i.visible = !0))
        }, i.prototype.drawLine = function () {
            this.lineCtn.graphics.clear(), this.lineCtn.visible = !0, this.lineCtn.graphics.lineStyle(1, 5164799), this.lineCtn.graphics.moveTo(52, 210);
            var t = this.pointList[0];
            t.visible && this.lineCtn.graphics.moveTo(t.x, t.y);
            for (var i, r = this.pointList.length, s = 1; s < r; s++) i = this.getPointDisplay(s), i.visible && this.lineCtn.graphics.lineTo(i.x, i.y)
        }, i.prototype.clear = function () {
            for (var t = 0; t < this.pointList.length; ++t) this.pointList[t].visible = !1;
            for (var t = 0; t < this.txtList.length; ++t) this.txtList[t].visible = !1;
            this.lineCtn.visible = !1, this.tip.visible = !1
        }, i.prototype.clearAnalysisData = function () {
            for (var t = 0; t < this._analysisPointArray.length; ++t) this._analysisPointArray[t] = null;
            this._analysisPeriodsArray = null, this._pointVerticalArray_now = null
        }, i.prototype.getPointDisplay = function (t) {
            var i = this.pointList[t];
            return i
        }, i.prototype.getPeriodsTextFile = function (t) {
            var i = this.txtList[t];
            return i
        }, Object.defineProperty(i.prototype, "dataProvider", {
            get: function () {
                return this._dataProvider
            }, set: function (t) {
                return this._dataProvider = t, this._dataProvider && this._dataProvider.length ? (this.analysisData(), void this.showRankingData(this._ranking)) : (this.clear(), void this.clearAnalysisData())
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "ranking", {
            get: function () {
                return this._ranking
            }, set: function (t) {
                t = flash.checkInt(t), this._ranking = flash.checkInt(t), this.showRankingData(this._ranking)
            }, enumerable: !0, configurable: !0
        }), i.prototype.onTouchHandler = function (t) {
            if (t.target.name.indexOf("point") != -1) {
                for (var i = flash.checkInt(flash.checkInt(t.target.y)), r = 0; r < this._pointVerticalArray.length; r++) if (i == this._pointVerticalArray[r]) {
                    this.chartNumLab.text = "车号：" + String(r + 1);
                    break
                }
                this.tip.x = t.target.x, this.tip.y = t.target.y, this.tip.visible = !0
            } else this.tip.visible = !1
        }, i
    }();
    t.CarChart = i, __reflect(i.prototype, "game.CarChart")
}(game || (game = {}));