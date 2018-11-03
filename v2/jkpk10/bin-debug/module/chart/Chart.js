var __reflect = this && this.__reflect || function (t, e, i) {
    t.__class__ = e, i ? i.push(e) : i = [e], t.__types__ = t.__types__ ? i.concat(t.__types__) : i
}, __extends = this && this.__extends || function (t, e) {
    function i() {
        this.constructor = t
    }

    for (var s in e) e.hasOwnProperty(s) && (t[s] = e[s]);
    t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
}, game;
!function (t) {
    var e = function (e) {
        function s(i) {
            var s = e.call(this) || this;
            return s._selectedIndex = 0, s.RK_Arr = [], s._carList = [], s._timeBtnStop = !1, s.ballStatArr = [], s.omitArr = [], s._hasSetCar = !1, s._ui = i, t.AttacherUtil.attachSkin(s, i), s.init(), s
        }

        return __extends(s, e), s.prototype.init = function () {
            this.carList.itemRenderer = i, this._carList = [this.cc_1, this.cc_2, this.cc_3, this.cc_4, this.cc_5, this.cc_6, this.cc_7, this.cc_8, this.cc_9, this.cc_10], this.RK_Arr = [this.RK_1, this.RK_2, this.RK_3, this.RK_4, this.RK_5, this.RK_6, this.RK_7, this.RK_8, this.RK_9, this.RK_10], this._timeCar = new egret.Timer(1e4, 0), this._timeCar.addEventListener(egret.TimerEvent.TIMER, this.Timered, this), this.Historybtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickDown, this), this.carList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.Click, this)
        }, s.prototype.clickDown = function (e) {
            null != this.getURL && t.WebUtil.openNewUrl(s.URL + this.getURL)
        }, s.prototype.setNext_txt = function (t) {
            t = flash.checkInt(t), this.Next_txt.text = String(t) + "期"
        }, s.prototype.toggle = function () {
            return false;
            t.PopUpManager.togglePopUp(this._ui, !1, !1, this.container), t.GameConst.isShowChart = null != this._ui.stage, t.GameConst.isShowChart ? 0 == this._timeBtnStop && this._timeCar.start() : this._timeCar.stop()
        }, s.prototype.hide = function () {
            t.PopUpManager.removePopUp(this._ui), t.GameConst.isShowChart = !1, this._timeCar.stop()
        }, s.prototype.setTxt = function (e) {
            if (e = flash.checkInt(e), e > 999) {
                this.nextTimeLab.text = "下期开奖";
                var i = t.DataManager.nextawardTime.split(" ")[1].substring(0, 5);
                this._time.text = i
            } else this.nextTimeLab.text = "倒计时", this._time.text = e.toString()
        }, s.prototype.reference = function (e) {
            if (e) if (this.getURL = e.dataUrl, e.betItems.length > 0) {
                e.betItems.length > 2 && (e.betItems = e.betItems.slice(0, 2));
                for (var i = flash.checkInt(0); i < e.betItems.length; i++) {
                    switch (e.betItems[i].betName.slice(0, 1)) {
                        case"冠":
                            this["txt_ReOne" + (i + 1)].text = "冠   军";
                            break;
                        case"亚":
                            this["txt_ReOne" + (i + 1)].text = "亚   军";
                            break;
                        default:
                            this["txt_ReOne" + (i + 1)].text = e.betItems[i].betName
                    }
                    this["txt_ReTwo" + (i + 1)].text = e.betItems[i].betItem, flash.checkInt(e.betItems[i].conWinOrLoss) > 0 ? (this["txt_ReThree" + (i + 1)].textColor = 16718637, this["txt_ReThree" + (i + 1)].text = "赢  " + e.betItems[i].conWinOrLoss) : (this["txt_ReThree" + (i + 1)].textColor = 7525928, this["txt_ReThree" + (i + 1)].text = "输  " + Math.abs(flash.checkInt(e.betItems[i].conWinOrLoss)))
                }
            } else this.txt_ReTwo2.text = "敬请期待", t.LoopManager.setTimeout(this.recovetReference, this, 5e3)
        }, s.prototype.setReferenceTXT = function (t) {
            if (t) if (t.betItems.length > 0) {
                t.betItems.length > 2 && (t.betItems = t.betItems.slice(0, 2));
                for (var e = flash.checkInt(0); e < t.betItems.length; e++) {
                    switch (t.betItems[e].betName.slice(0, 1)) {
                        case"冠":
                            this["txt_ReOne" + (e + 1)].text = "冠   军";
                            break;
                        case"亚":
                            this["txt_ReOne" + (e + 1)].text = "亚   军";
                            break;
                        default:
                            this["txt_ReOne" + (e + 1)].text = t.betItems[e].betName
                    }
                    this["txt_ReTwo" + (e + 1)].text = t.betItems[e].betItem, flash.checkInt(t.betItems[e].conWinOrLoss) > 0 ? (this["txt_ReThree" + (e + 1)].textColor = 12789533, this["txt_ReThree" + (e + 1)].text = "赢  " + t.betItems[e].conWinOrLoss) : (this["txt_ReThree" + (e + 1)].textColor = 32768, this["txt_ReThree" + (e + 1)].text = "输  " + Math.abs(flash.checkInt(t.betItems[e].conWinOrLoss)))
                }
            } else this.txt_ReTwo2.text = "敬请期待"
        }, s.prototype.recovetReference = function () {
            this.dispatchEvent(new egret.Event("recovetReference", (!0)))
        }, s.prototype["long"] = function (t) {
            if (t && t.length > 0) {
                for (var e, i = 16718637, s = t, r = flash.checkInt(0); r < s.length; r++) switch (e = t[r].name.slice(0, 1)) {
                    case"冠":
                        flash.checkInt(s[r].comingTimes) > 5 ? (this["txt_Lo" + (r + 1)].textColor = i, this["txt_Lo" + (r + 1)].text = "冠   军:  " + s[r].item + "  连开  " + s[r].comingTimes + "  期") : this["txt_Lo" + (r + 1)].text = "冠   军:  " + s[r].item + "  连开  " + s[r].comingTimes + "  期";
                        break;
                    case"亚":
                        flash.checkInt(s[r].comingTimes) > 5 ? (this["txt_Lo" + (r + 1)].textColor = i, this["txt_Lo" + (r + 1)].text = "亚   军:  " + s[r].item + "  连开  " + s[r].comingTimes + "  期") : this["txt_Lo" + (r + 1)].text = "亚   军:  " + s[r].item + "  连开  " + s[r].comingTimes + "  期";
                        break;
                    default:
                        flash.checkInt(s[r].comingTimes) > 5 ? (this["txt_Lo" + (r + 1)].textColor = i, this["txt_Lo" + (r + 1)].text = s[r].name + ":  " + s[r].item + "  连开  " + s[r].comingTimes + "  期") : this["txt_Lo" + (r + 1)].text = s[r].name + ":  " + s[r].item + "  连开  " + s[r].comingTimes + "  期"
                }
                for (var h = flash.checkInt(s.length); h < 6; h++) this["txt_Lo" + (h + 1)].text = ""
            }
        }, s.prototype.ballStat = function (t) {
            this.ballStatArr && (this.ballStatArr = t)
        }, s.prototype.setBallStat = function (t) {
            t = flash.checkInt(t), t && 0 != this.ballStatArr.length && (this.txt_BS1.text = this.ballStatArr[t - 1].big, this.txt_BS2.text = this.ballStatArr[t - 1].small, this.txt_BS3.text = this.ballStatArr[t - 1].odd, this.txt_BS4.text = this.ballStatArr[t - 1].even)
        }, s.prototype.omit = function (t) {
            t && (this.omitArr = t)
        }, s.prototype.setOmit = function (t) {
            if (t = flash.checkInt(t), t && 0 != this.omitArr.length) for (var e = 0; e < 10; e++) this["txtH_" + (e + 1)].text = this.omitArr[t - 1].data[e].num, this["txtZ_" + (e + 1)].text = this.omitArr[t - 1].data[e].coming, this["txtW_" + (e + 1)].text = this.omitArr[t - 1].data[e].uncoming
        }, s.prototype.HistoryNumber = function (t) {
            0 != t.length && (t.reverse(), this.carChart.dataProvider = t)
        }, s.prototype.setCarColor = function (e) {
            e && (this._timeBtnStop = !1, this._carRank = e, this.carList.dataProvider = new eui.ArrayCollection(e), t.LoopManager.setTimeout(this.Cargoto, this, 200))
        }, s.prototype.Cargoto = function () {
            this._hasSetCar = !0, this.selectedIndex = 1
        }, s.prototype.Timered = function (t) {
            var e = flash.checkInt(this._selectedIndex);
            e < 10 ? e++ : e = 1, this.selectedIndex = e
        }, s.prototype.Click = function (t) {
            this._timeCar.stop(), this._timeBtnStop = !0;
            var e = t.itemIndex + 1;
            this._selectedIndex != e && (this.selectedIndex = flash.checkInt(e))
        }, Object.defineProperty(s.prototype, "selectedIndex", {
            set: function (t) {
                t = flash.checkInt(t), this.setBallStat(t), this.setOmit(t), this.carChart.ranking = t, this._selectedIndex > 0 && (this.carList.selectedIndex = this._selectedIndex - 1), this._selectedIndex = flash.checkInt(t), this.carList.selectedIndex = this._selectedIndex - 1
            }, enumerable: !0, configurable: !0
        }), s
    }(egret.EventDispatcher);
    t.Chart = e, __reflect(e.prototype, "game.Chart");
    var i = function (t) {
        function e() {
            return t.call(this) || this
        }

        return __extends(e, t), e.prototype.dataChanged = function () {
            if (t.prototype.dataChanged.call(this), this.data) {
                var i = this.data, s = egret.superGetter(e, this, "selected");
                this.car.source = this.getSource("car" + i + (s ? "_1" : "_0")), this.rankLab.text = e.arr[this.itemIndex]
            }
        }, Object.defineProperty(e.prototype, "selected", {
            set: function (t) {
                var i = egret.superGetter(e, this, "selected");
                if (i != t && this.data) {
                    egret.superSetter(e, this, "selected", t);
                    var s = this.data;
                    t ? (this.car.source = this.getSource("car" + s + "_1"), this.animForward.play(0)) : (this.car.source = this.getSource("car" + s + "_0"), this.car.y = 43)
                }
            }, enumerable: !0, configurable: !0
        }), e.prototype.getSource = function (t) {
            return "chart_json." + t
        }, e
    }(eui.ItemRenderer);
    i.arr = ["", "", "", "", "", "", "", "", "", ""], __reflect(i.prototype, "ChartCarItemRenderer")
}(game || (game = {}));