function editHashPair(e, t) {
    return HashMap.hashMapSingleton.editPair(e, t)
}

function getHashObject(e) {
    return HashMap.hashMapSingleton.getObject(e)
}

function deleteHashPair(e) {
    HashMap.hashMapSingleton.deletePair(e)
}

function reverseDeleteHashPairs(e) {
    HashMap.hashMapSingleton.reverseDeletePair(e)
}

function getHashKeyListCopy() {
    return HashMap.hashMapSingleton.getKeyListCopy()
}

function getHashObjectListCopy() {
    return HashMap.hashMapSingleton.getObjectListCopy()
}

function popup() {
    for (var e = [], t = 0; t < arguments.length; t++) e[t - 0] = arguments[t];
    if (popupAble) {
        var i = "";
        for (var r in arguments) i += arguments[r].toString()
    }
}

function trace() {
    for (var e = [], t = 0; t < arguments.length; t++) e[t - 0] = arguments[t];
    traceAble && console.log(Array.prototype.join.call(arguments, " "))
}

var InitConfig = function () {
    function e() {
    }

    var t = __define, i = e;
    return i.prototype, t(e, "isRelease", function () {
        return e._isRelease
    }, function (t) {
        e._isRelease = t, traceAble = !t
    }), t(e, "isPopup", function () {
        return e._isPopup
    }, function (t) {
        e._isPopup = t, popupAble = t
    }), e.res_path = "", e.req_host = "", e.isShowVersion = !0, e._isRelease = !1, e._isPopup = !0, e
}();
egret.registerClass(InitConfig, "InitConfig");
var SoundNames = function () {
    function e() {
        throw new Error(this.__class__ + " 鏄潤鎬佹垚鍛橀泦鎴愮被锛屾棤闇€瀹炰緥鍖�")
    }

    var t = (__define, e);
    return t.prototype, e.BGM_GAME = "backgroundMusic", e.SECONDS = "seconds", e.LAST_SECONDS = "lastSeconds", e.RUNNING = "running", e.CHEER = "cheer", e.RANK = "rank", e
}();
egret.registerClass(SoundNames, "SoundNames");
var SubjectTypes = function () {
    function e() {
        throw new Error(this.__class__ + " 鏄潤鎬佹垚鍛橀泦鎴愮被锛屾棤闇€瀹炰緥鍖�")
    }

    var t = (__define, e);
    return t.prototype, e.LINK_FAULT = "linkFault", e.DYNAMIC_COMPLETE = "dynamicComplete", e.APP_START = "appStart", e.OVER_TIME = "overTime", e.SOUND_RESTART = "soundRestart", e.GET_DATA = "getData", e.GET_REALDATA = "getRealData", e.GET_RECORD = "getRecord", e.GAME_START = "gameStart", e.TAKE_REALDATA = "takeRealData", e.TAKE_SPACE = "takeSpace", e.GAME_RANKING = "gameRanking", e.GAME_SHOWRANK = "gameShowRank", e.GAME_BGMOVE = "gameBgMove", e.GAME_BOATCONTAINERMOVE = "gameBoatContainerMove", e.GAME_SCREENREADY = "gameScreenReady", e.GAME_SHOWLABEL = "gameShowLabel", e.GAME_END = "gameEnd", e.GAME_INIT = "gameInit", e.GAME_UNMONI = "gameUnMoni", e.GAME_MONI = "gameMoni", e.SHOW_BTN = "showBtn", e.HIDE_BTN = "hideBtn", e
}();
egret.registerClass(SubjectTypes, "SubjectTypes");
var connect;
!function (e) {
    var t = function () {
        function e() {
            throw new Error(this.__class__ + " 鏄潤鎬佹垚鍛橀泦鎴愮被锛屾棤闇€瀹炰緥鍖�")
        }

        var t = __define, i = e;
        return i.prototype, t(e, "CONNECT_COMPLETE", function () {
            return "connect complete"
        }), t(e, "CONNECT_FAULT", function () {
            return "connect fault"
        }), e.connectToURL = function (e, t, i, r) {
            void 0 === r && (r = egret.URLRequestMethod.GET);
            var a = new egret.URLRequest(e), n = new egret.URLLoader;
            a.method = r, this.loaderArray.push(n), this.methodArray.push(t.bind(i)), n.addEventListener(egret.Event.COMPLETE, this.onComplete, this), n.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this), editHashPair(n, a), n.load(a)
        }, e.onError = function (e) {
            var t = e.target, i = this.loaderArray.indexOf(t), r = this.methodArray[i];
            t.removeEventListener(egret.Event.COMPLETE, this.onComplete, this), t.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this), r.length < 1 ? r.call(null) : r.call(null, this.CONNECT_FAULT)
        }, e.onComplete = function (e) {
            var t = e.target, i = this.loaderArray.indexOf(t), r = this.methodArray[i];
            t.removeEventListener(egret.Event.COMPLETE, this.onComplete, this), t.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this), deleteHashPair(t), this.reconnectTimes = 0, r.length < 1 ? r.call(null) : r.call(null, e.target.data), t.removeEventListener(egret.Event.COMPLETE, this.onComplete, this), t.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this), this.loaderArray.splice(i, 1), this.methodArray.splice(i, 1)
        }, e.methodArray = new Array, e.loaderArray = new Array, e.reconnectTimes = 0, e
    }();
    e.NetworkConnector = t, egret.registerClass(t, "connect.NetworkConnector")
}(connect || (connect = {}));
var disDev;
!function (e) {
    var t = function (e) {
        function t() {
            if (e.call(this), this.$loopStartFrame = 0, this.$loopEndFrame = 0, this.$driverType = disTypes.DriverType.FRAME, this.playInterval = 1, this.currentInterval = 0, this.executeFrameScript = !0, this.executeLoop = !0, this.executeDriverType = !0, "disDev.AbstractAnimation" == egret.getQualifiedClassName(this)) throw new Error(this.__class__ + " 鏄敤浜庤缁ф壙鐨勬娊璞＄被锛屼笉鑳藉疄渚嬪寲")
        }

        __extends(t, e);
        var i = __define, r = t, a = r.prototype;
        return a.addFrameScript = function (e, t, i, r) {
        }, a.removeFrameScript = function (e) {
        }, a.stop = function () {
        }, a.play = function () {
        }, a.gotoAndPlay = function (e) {
        }, a.gotoAndStop = function (e) {
        }, a.nextFrame = function () {
        }, a.prevFrame = function () {
        }, a.playHandler = function (e) {
            void 0 === e && (e = null)
        }, i(a, "totalFrames", function () {
            return this.$totalFrames
        }), i(a, "currentFrame", function () {
            return this.$currentFrame
        }), i(a, "isPlaying", function () {
            return this.$isPlaying
        }), a.setDriver = function (e, t) {
            void 0 === e && (e = disTypes.DriverType.FRAME), void 0 === t && (t = 1)
        }, a.setLoopPoint = function (e, t, i, r, a) {
            if (void 0 === i && (i = !1), void 0 === r && (r = this.$driverType), void 0 === a && (a = this.playInterval), 1 > e || t > this.$totalFrames) throw new Error("寰幆鎾斁鐗囨璧峰甯ф垨缁撴潫甯ц秴鍑鸿寖鍥达紒");
            if (e > t) throw new Error("寰幆鎾斁鐗囨璧峰甯у彿涓嶈兘澶т簬缁撴潫甯у彿锛�");
            this.$loopStartFrame = Math.floor(e), this.$loopEndFrame = Math.floor(t), this.$driverTypeOnLooping = r, this.$playIntervalOnLooping = a, this.executeLoop && i && this.gotoAndPlay(e)
        }, a.clearLoopPoint = function () {
            this.$loopStartFrame = 0, this.$loopEndFrame = 0
        }, i(a, "scaleWidth", function () {
            return this.width * this.scaleX
        }, function (e) {
            this.scaleX = e / this.width
        }), i(a, "scaleHeight", function () {
            return this.height * this.scaleY
        }, function (e) {
            this.scaleY = e / this.height
        }), a.destroy = function () {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.playHandler, this), this.timer && (this.timer.removeEventListener(egret.TimerEvent.TIMER, this.playHandler, this), this.timer.stop())
        }, t
    }(egret.Sprite);
    e.AbstractAnimation = t, egret.registerClass(t, "disDev.AbstractAnimation", ["disDev.IAnimation", "disDev.IDisplayObjectLite", "egret.IEventDispatcher"])
}(disDev || (disDev = {}));
var disDev;
!function (e) {
    var t = function (e) {
        function t(t, i, r, a) {
            void 0 === t && (t = null), void 0 === i && (i = 1), void 0 === r && (r = !0), void 0 === a && (a = disTypes.BitmapAlignEnum[0]), e.call(this), this.backGroundBitmap = new egret.Bitmap, this.$isNatureEnter = !1, this.$bitmapAlignType = disTypes.BitmapAlignEnum[0], t && this.reconstruct(t, i, r, a)
        }

        __extends(t, e);
        var i = __define, r = t, n = r.prototype;
        return n.reconstruct = function (e, t, i, r) {
            if (void 0 === t && (t = 1), void 0 === i && (i = !0), void 0 === r && (r = disTypes.BitmapAlignEnum[0]), !e || e.length < 1) throw new Error("textureInfoList涓嶈兘涓虹┖, 骞朵笖闀垮害涓嶈兘灏忎簬1");
            this.$totalFrames = 0, this.$partArray = new Array, this.$partHeadList = new Array, this.$partTailList = new Array, this.correctedPointArray = new Array, this.$textureNameList = new Array;
            for (var a = 0; a < e.length; a++) {
                var n = [this.$totalFrames + 1];
                this.$totalFrames += e[a].nameArray.length, n.push(this.$totalFrames), this.$partArray.push(n), this.$partHeadList.push(n[0] - 1), this.$partTailList.push(n[1] - 1), this.correctedPointArray.push(e[a].correctedPoint), this.$textureNameList = this.$textureNameList.concat(e[a].nameArray)
            }
            if (1 > t || t > this.$totalFrames) throw new Error("鍒濆甯tart瓒呭嚭鏈夋晥鑼冨洿");
            var s = this.checkAndCreateTexture(this.$textureNameList[t - 1]);
            this.$isPlaying = !1, this.removeEventListener(egret.Event.ENTER_FRAME, this.playHandler, this), this.timer && (this.timer.removeEventListener(egret.TimerEvent.TIMER, this.playHandler, this), this.timer.stop()), this.clearLoopPoint(), this.textureInfoList = e, this.start = Math.floor(t), this.$currentFrame = this.start, this.addChildAt(this.backGroundBitmap, 0), this.backGroundBitmap.texture = s, this.$initHeight = this.backGroundBitmap.height, this.$initWidth = this.backGroundBitmap.width, this.bitmapAlignType = r, this.setDriver(), i && this.play(), this.callBackFunctionCollection = new Array
        }, n.checkAndCreateTexture = function (e) {
            var t = RES.getRes(e);
            return this.$currentTextureName != e ? (this.$currentTextureName = e, e && (t || trace("鏃犳硶鑾峰彇鏈夋晥鐨� Texture: " + e + "锛岃妫€鏌ュ悕绉版嫾鍐欙紝鎴栫‘璁ゆ槸鍚﹀凡缁忔甯稿姞杞借璧勬簮")), t) : (this.$currentTextureName = e, t)
        }, n.push = function (e) {
            var t = [this.$totalFrames + 1];
            return this.$totalFrames += e.nameArray.length, t.push(this.$totalFrames), this.$partArray.push(t), this.$partHeadList.push(t[0] - 1), this.correctedPointArray.push(e.correctedPoint), this.$textureNameList = this.$textureNameList.concat(e.nameArray), this
        }, n.concat = function (e) {
            for (var t = 0; t < e.length; t++) {
                var i = e[t], r = [this.$totalFrames + 1];
                this.$totalFrames += i.nameArray.length, r.push(this.$totalFrames), this.$partArray.push(r), this.$partHeadList.push(r[0] - 1), this.correctedPointArray.push(i.correctedPoint), this.$textureNameList = this.$textureNameList.concat(i.nameArray)
            }
            return this
        }, n.addFrameScript = function (e, t, i, r) {
            if (void 0 === i && (i = this), void 0 === r && (r = !0), isNaN(Math.floor(e)) || Math.floor(e) < 0 || Math.floor(e) > this.$totalFrames - 1) throw new Error("浜嬩欢甯у簭鍙疯秴鍑烘湁鏁堣寖鍥�");
            this.callBackFunctionCollection[Math.floor(e)] = t.bind(i), r && Math.floor(e) == this.start && this.executeFrameScript && this.callBackFunctionCollection[Math.floor(e)].call(null)
        }, n.addFrameScriptOnce = function (e, t, i, r) {
            if (void 0 === i && (i = this), void 0 === r && (r = !0), isNaN(Math.floor(e)) || Math.floor(e) < 0 || Math.floor(e) > this.$totalFrames - 1) throw new Error("浜嬩欢甯у簭鍙疯秴鍑烘湁鏁堣寖鍥�");
            this.callBackFunctionCollection[Math.floor(e)] = function () {
                t.bind(i).call(null), this.removeFrameScript(Math.floor(e))
            }.bind(this), r && Math.floor(e) == this.start && this.executeFrameScript && this.callBackFunctionCollection[Math.floor(e)].call(null)
        }, n.removeFrameScript = function (e) {
            if (Math.floor(e) < 0 || Math.floor(e) > this.$totalFrames - 1) throw new Error("浜嬩欢甯у簭鍙疯秴鍑烘湁鏁堣寖鍥�");
            this.callBackFunctionCollection && this.callBackFunctionCollection[Math.floor(e)] && delete this.callBackFunctionCollection[Math.floor(e)]
        }, n.play = function () {
            return 1 == this.$totalFrames ? void this.stop() : (this.$isPlaying = !0, void(this.$driverType == disTypes.DriverType.FRAME ? (this.addEventListener(egret.Event.ENTER_FRAME, this.playHandler, this), this.timer && (this.timer.removeEventListener(egret.TimerEvent.TIMER, this.playHandler, this), this.timer.stop())) : this.$driverType == disTypes.DriverType.TIMER && (this.timer || (this.timer = new egret.Timer(this.playInterval)), this.timer.addEventListener(egret.TimerEvent.TIMER, this.playHandler, this), this.timer.delay = this.playInterval, this.timer.start())))
        }, n.gotoAndPlay = function (e) {
            if (1 == this.$totalFrames) return void this.stop();
            this.$isNatureEnter = !1;
            var t = this.$currentFrame;
            this.$currentFrame = Math.floor(e), this.$currentFrame < 1 ? this.$currentFrame = 1 : this.$currentFrame > this.$totalFrames && (this.$currentFrame = this.$totalFrames), this.start = this.$currentFrame;
            var i = this.checkAndCreateTexture(this.$textureNameList[this.start - 1]);
            this.backGroundBitmap.texture = i, this.bitmapAlignHandler(), this.callBackFunctionCollection && this.executeFrameScript && this.callBackFunctionCollection[this.$currentFrame - 1] && t != this.$currentFrame && this.callBackFunctionCollection[this.$currentFrame - 1].call(null), this.play()
        }, n.stop = function () {
            this.$isPlaying = !1, this.removeEventListener(egret.Event.ENTER_FRAME, this.playHandler, this), this.timer && (this.timer.removeEventListener(egret.TimerEvent.TIMER, this.playHandler, this), this.timer.stop()), this.start = this.$currentFrame;
            var e = this.checkAndCreateTexture(this.$textureNameList[this.start - 1]);
            this.backGroundBitmap.texture = e, this.bitmapAlignHandler()
        }, n.gotoAndStop = function (e) {
            if (1 == this.$totalFrames) return void this.stop();
            this.$isNatureEnter = !1;
            var t = this.$currentFrame;
            this.$currentFrame = Math.floor(e), this.$currentFrame < 1 ? this.$currentFrame = 1 : this.$currentFrame > this.$totalFrames && (this.$currentFrame = this.$totalFrames), this.stop(), this.callBackFunctionCollection && this.executeFrameScript && this.callBackFunctionCollection[this.$currentFrame - 1] && t != this.$currentFrame && this.callBackFunctionCollection[this.$currentFrame - 1].call(null)
        }, n.playHandler = function () {
            if (this.$isPlaying && this.executeDriverType) if (this.$driverType == disTypes.DriverType.FRAME) {
                for (this.currentInterval++; this.currentInterval >= 2 * this.playInterval;) if (this.currentInterval -= this.playInterval, this.autoNextFrame(!1), !this.$isPlaying) return;
                this.currentInterval >= this.playInterval && (this.currentInterval -= this.playInterval, this.autoNextFrame(!0))
            } else this.$driverType == disTypes.DriverType.TIMER && this.autoNextFrame()
        }, n.autoNextFrame = function (e) {
            void 0 === e && (e = !0), this.$isNatureEnter = !0, this.start <= this.$totalFrames && this.start++, this.start > this.$totalFrames && (this.isPlaying ? this.start = 1 : this.start = this.$totalFrames), this.executeLoop && this.isPlaying && this.$currentFrame == this.$loopEndFrame && (this.start = this.$loopStartFrame), this.executeLoop && this.isPlaying && this.$currentFrame >= this.$loopStartFrame && this.$currentFrame <= this.$loopEndFrame && (this.driverType != this.$driverTypeOnLooping || this.$playIntervalOnLooping != this.playInterval) && this.setDriver(this.$driverTypeOnLooping, this.$playIntervalOnLooping);
            var t = this.$currentFrame;
            if (this.$currentFrame = this.start, e) {
                var i = this.checkAndCreateTexture(this.$textureNameList[this.$currentFrame - 1]);
                this.backGroundBitmap.texture = i, this.bitmapAlignHandler()
            }
            this.executeLoop && this.isPlaying && this.start == this.$loopStartFrame && this.start == this.$loopEndFrame && (trace("鎻愮ず: 寰幆鐐圭殑璧峰甯у彿涓庣粨鏉熷抚鍙风浉鍚�, 鑷姩鍋滄鎾斁"), this.stop()), this.callBackFunctionCollection && this.executeFrameScript && this.callBackFunctionCollection[this.$currentFrame - 1] && t != this.$currentFrame && this.callBackFunctionCollection[this.$currentFrame - 1].call(null)
        }, n.autoPrevFrame = function (e) {
            if (void 0 === e && (e = !0), this.start > 1 && (this.start--, this.$isNatureEnter = !0), this.start < 1 && (this.start = 1), this.$currentFrame = this.start, e) {
                var t = this.checkAndCreateTexture(this.$textureNameList[this.start - 1]);
                this.backGroundBitmap.texture = t, this.bitmapAlignHandler()
            }
            this.callBackFunctionCollection && this.executeFrameScript && this.callBackFunctionCollection[this.$currentFrame - 1] && this.callBackFunctionCollection[this.$currentFrame - 1].call(null)
        }, n.nextFrame = function () {
            this.stop(), this.start < this.$totalFrames && this.autoNextFrame()
        }, n.prevFrame = function () {
            this.stop(), this.start > 1 && this.autoPrevFrame()
        }, i(n, "currentTextureName", function () {
            return this.$currentTextureName
        }), i(n, "isNatureEnter", function () {
            return this.$isNatureEnter
        }), n.getPartHeadAt = function (e) {
            return e = Math.floor(e), e >= this.$partHeadList.length || e < -this.$partHeadList.length ? (trace("鎻愮ず: 鎻愪緵缁� getPartHeadAt 鐨勭储寮曞€艰秴鍑虹墖娈靛ご鍒楄〃鑼冨洿"), NaN) : (0 > e && (e = this.$partHeadList.length + e), this.$partHeadList[e])
        }, n.getPartTailAt = function (e) {
            return e = Math.floor(e), e >= this.$partTailList.length || e < -this.$partTailList.length ? (trace("鎻愮ず: 鎻愪緵缁� getPartTailAt 鐨勭储寮曞€艰秴鍑虹墖娈靛熬鍒楄〃鑼冨洿"), NaN) : (0 > e && (e = this.$partTailList.length + e), this.$partTailList[e])
        }, n.getPartHeadAndTailList = function () {
            for (var e = new Array, t = 0; t < this.$partArray.length; t++) e.push(new a(this.$partArray[t][0] - 1, this.$partArray[t][1] - 1));
            return e
        }, n.getPartHeadAndTailAt = function (e) {
            return e = Math.floor(e), e >= this.$partArray.length || e < -this.$partArray.length ? (trace("鎻愮ず: 鎻愪緵缁� getPartHeadAt 鐨勭储寮曞€艰秴鍑虹墖娈靛ご鍒楄〃鑼冨洿"), null) : (0 > e && (e = this.$partArray.length + e), new a(this.$partHeadList[e], this.$partTailList[e]))
        }, n.getPlayPartIndexByFrame = function (e) {
            if (1 > e || e > this.totalFrames) throw new Error("甯у彿瓒呭嚭鏈夋晥鑼冨洿锛�");
            e = Math.floor(e);
            for (var t = 0; t < this.$partArray.length; t++) if (e >= this.$partArray[t][0] && e <= this.$partArray[t][1]) return t
        }, i(n, "bitmapAlignType", function () {
            return this.$bitmapAlignType
        }, function (e) {
            this.$bitmapAlignType = e, this.bitmapAlignHandler()
        }), n.bitmapAlignHandler = function () {
            switch (this.$bitmapAlignType) {
                case disTypes.BitmapAlignEnum[0]:
                    this.backGroundBitmap.x = 0, this.backGroundBitmap.y = 0;
                    break;
                case disTypes.BitmapAlignEnum[1]:
                    this.backGroundBitmap.x = (this.$initWidth - this.backGroundBitmap.width) / 2, this.backGroundBitmap.y = 0;
                    break;
                case disTypes.BitmapAlignEnum[2]:
                    this.backGroundBitmap.x = this.$initWidth - this.backGroundBitmap.width, this.backGroundBitmap.y = 0;
                    break;
                case disTypes.BitmapAlignEnum[3]:
                    this.backGroundBitmap.x = 0, this.backGroundBitmap.y = (this.$initHeight - this.backGroundBitmap.height) / 2;
                    break;
                case disTypes.BitmapAlignEnum[4]:
                    this.backGroundBitmap.x = (this.$initWidth - this.backGroundBitmap.width) / 2, this.backGroundBitmap.y = (this.$initHeight - this.backGroundBitmap.height) / 2;
                    break;
                case disTypes.BitmapAlignEnum[5]:
                    this.backGroundBitmap.x = this.$initWidth - this.backGroundBitmap.width, this.backGroundBitmap.y = (this.$initHeight - this.backGroundBitmap.height) / 2;
                    break;
                case disTypes.BitmapAlignEnum[6]:
                    this.backGroundBitmap.x = 0, this.backGroundBitmap.y = this.$initHeight - this.backGroundBitmap.height;
                    break;
                case disTypes.BitmapAlignEnum[7]:
                    this.backGroundBitmap.x = (this.$initWidth - this.backGroundBitmap.width) / 2, this.backGroundBitmap.y = this.$initHeight - this.backGroundBitmap.height;
                    break;
                case disTypes.BitmapAlignEnum[8]:
                    this.backGroundBitmap.x = this.$initWidth - this.backGroundBitmap.width, this.backGroundBitmap.y = this.$initHeight - this.backGroundBitmap.height
            }
            var e;
            for (e = 0; e < this.$partArray.length && !(this.$currentFrame >= this.$partArray[e][0] && this.$currentFrame <= this.$partArray[e][1]); e++) ;
            var t = this.correctedPointArray[e];
            this.backGroundBitmap.x += t.x, this.backGroundBitmap.y += t.y
        }, i(n, "smoothing", function () {
            return this.backGroundBitmap.smoothing
        }, function (e) {
            this.backGroundBitmap.smoothing = e
        }), n.destroy = function () {
            e.prototype.destroy.call(this), this.backGroundBitmap && this.backGroundBitmap.parent && this.backGroundBitmap.parent.removeChild(this.backGroundBitmap), this.callBackFunctionCollection = null
        }, n.setDriver = function (e, t) {
            if (void 0 === e && (e = disTypes.DriverType.FRAME), void 0 === t && (t = 1), 0 >= t) throw new Error("椹卞姩闂撮殧涓嶈兘绛変簬鎴栧皬浜�0锛�");
            this.executeDriverType && (this.$driverType = e, this.playInterval = t, this.$driverTypeOnLooping = this.$driverType, this.$playIntervalOnLooping = this.playInterval, this.currentInterval = 0, e == disTypes.DriverType.FRAME && this.playInterval % 1 != 0 ? trace("鎻愮ず: 褰撳墠閲囩敤閫愬抚椹卞姩鏂瑰紡, playInterval涓嶆槸鏁存暟(" + this.playInterval + "), 灏嗕細鍑虹幇涓㈠抚鐨勬儏鍐�") : e == disTypes.DriverType.TIMER && this.playInterval < 16 && trace("鎻愮ず: 褰撳墠閲囩敤璁℃椂鍣ㄩ┍鍔ㄦ柟寮�, playInterval浣庝簬涓嬮檺16姣(" + this.playInterval + "), 灏嗚嚜鍔ㄨ皟鏁翠负 甯�/16姣 鐨勯鐜�"), this.isPlaying && (this.removeEventListener(egret.Event.ENTER_FRAME, this.playHandler, this), this.timer && (this.timer.removeEventListener(egret.TimerEvent.TIMER, this.playHandler, this), this.timer.stop()), this.play()))
        }, i(n, "frameInterval", void 0, function (e) {
            this.setDriver(disTypes.DriverType.FRAME, e)
        }), i(n, "timerInterval", void 0, function (e) {
            this.setDriver(disTypes.DriverType.TIMER, e)
        }), i(n, "driverType", function () {
            return this.$driverType
        }), t
    }(e.AbstractAnimation);
    e.AnimationGroup = t, egret.registerClass(t, "disDev.AnimationGroup", ["disDev.IAnimation", "disDev.IDisplayObjectLite", "egret.IEventDispatcher"]);
    var i = function () {
        function e() {
            throw new Error(this.__class__ + " 鏄潤鎬佹垚鍛橀泦鎴愮被, 鏃犻渶瀹炰緥鍖�")
        }

        var t = (__define, e);
        return t.prototype, e.createInfo = function (e, t, i, a, n, s) {
            if (void 0 === t && (t = null), void 0 === i && (i = 0), void 0 === a && (a = 1), void 0 === n && (n = 0), void 0 === s && (s = 0), 1 > e) throw new Error("Texture瀵硅薄鍒楄〃闀垮害涓嶈兘灏忎簬1");
            if (1 > a) throw new Error("Texture瀵硅薄鐨勫簭鍙烽暱搴︿笉鑳藉皬浜�1");
            var o = e + i, h = new Array;
            a = Math.floor(a);
            for (var l = Math.floor(i); l < Math.floor(o); l++) null == t ? h.push(null) : h.push(t + this.getFrameByDigits(l, a));
            var c = new r(h, new egret.Point(n, s));
            return c
        }, e.createStaticInfo = function (e, t, i, a) {
            if (void 0 === t && (t = null), void 0 === i && (i = 0), void 0 === a && (a = 0), 1 > e) throw new Error("Texture瀵硅薄鍒楄〃闀垮害涓嶈兘灏忎簬1");
            for (var n = new Array, s = 0; e > s; s++) null == t ? n.push(null) : n.push(t);
            var o = new r(n, new egret.Point(i, a));
            return o
        }, e.getFrameByDigits = function (e, t) {
            1 > t && (t = 1), t = Math.floor(t);
            for (var i = e.toString(); i.length < t;) i = 0 + i;
            return i
        }, e
    }();
    e.TextureInfoMaker = i, egret.registerClass(i, "disDev.TextureInfoMaker");
    var r = function () {
        function t(e, t) {
            void 0 === t && (t = new egret.Point(0, 0)), this.nameArray = e, this.correctedPoint = t
        }

        var i = (__define, t), r = i.prototype;
        return r.reverse = function (t) {
            void 0 === t && (t = this.correctedPoint.clone());
            var i = this.nameArray.concat().reverse();
            return new e.TextureInfo(i, t)
        }, t
    }();
    e.TextureInfo = r, egret.registerClass(r, "disDev.TextureInfo");
    var a = function () {
        function e(e, t) {
            this.head = e, this.tail = t
        }

        var t = (__define, e);
        return t.prototype, e
    }();
    e.HeadAndTail = a, egret.registerClass(a, "disDev.HeadAndTail")
}(disDev || (disDev = {}));
var disDev;
!function (e) {
    var t = function (e) {
        function t(t, i, r, a, n, s) {
            void 0 === t && (t = 0), void 0 === i && (i = null), void 0 === r && (r = 0), void 0 === a && (a = 1), void 0 === n && (n = 1), void 0 === s && (s = !0), e.call(this), this.backGroundBitmap = new egret.Bitmap, i && this.reconstruct(t, i, r, a, n, s)
        }

        __extends(t, e);
        var i = __define, r = t, a = r.prototype;
        return a.reconstruct = function (e, t, i, r, a, n) {
            if (void 0 === t && (t = null), void 0 === i && (i = 0), void 0 === r && (r = 1), void 0 === a && (a = 1), void 0 === n && (n = !0), 1 > e) throw new Error("Texture瀵硅薄鍒楄〃闀垮害涓嶈兘灏忎簬1");
            if (1 > a || a > e) throw new Error("鍒濆甯tart瓒呭嚭鏈夋晥鑼冨洿");
            if (1 > r) throw new Error("Texture瀵硅薄鐨勫簭鍙烽暱搴︿笉鑳藉皬浜�1");
            var s = e - 1 + i, o = i + a - 1, h = this.checkAndCreateTexture(t + this.getFrameByDigits(o, r));
            this.$isPlaying = !1, this.removeEventListener(egret.Event.ENTER_FRAME, this.playHandler, this), this.timer && (this.timer.removeEventListener(egret.TimerEvent.TIMER, this.playHandler, this), this.timer.stop()), this.clearLoopPoint(), this.texturePrefix = t, this.min = Math.floor(i), this.max = Math.floor(s), this.start = Math.floor(o), this.digits = Math.floor(r), this.$totalFrames = this.max - this.min + 1, this.$currentFrame = this.start - this.min + 1, this.setDriver(), this.addChildAt(this.backGroundBitmap, 0), this.backGroundBitmap.texture = h, n && this.play(), this.callBackFunctionCollection = new Array
        }, a.checkAndCreateTexture = function (e) {
            this.$currentTextureName = e;
            var t = RES.getRes(e);
            return t || trace("鏃犳硶鑾峰彇鏈夋晥鐨� Texture: " + e + "锛岃妫€鏌ュ悕绉版嫾鍐欙紝鎴栫‘璁ゆ槸鍚﹀凡缁忔甯稿姞杞借璧勬簮"), t
        }, a.addFrameScript = function (e, t, i, r) {
            if (void 0 === i && (i = this), void 0 === r && (r = !0), isNaN(Math.floor(e)) || Math.floor(e) < 0 || Math.floor(e) > this.totalFrames - 1) throw new Error("浜嬩欢甯у簭鍙疯秴鍑烘湁鏁堣寖鍥�");
            this.callBackFunctionCollection[Math.floor(e)] = t.bind(i), r && Math.floor(e) == this.start && this.executeFrameScript && this.callBackFunctionCollection[Math.floor(e)].call(null)
        }, a.addFrameScriptOnce = function (e, t, i, r) {
            if (void 0 === i && (i = this), void 0 === r && (r = !0), isNaN(Math.floor(e)) || Math.floor(e) < 0 || Math.floor(e) > this.$totalFrames - 1) throw new Error("浜嬩欢甯у簭鍙疯秴鍑烘湁鏁堣寖鍥�");
            this.callBackFunctionCollection[Math.floor(e)] = function () {
                t.bind(i).call(null), this.removeFrameScript(Math.floor(e))
            }.bind(this), r && Math.floor(e) == this.start && this.executeFrameScript && this.callBackFunctionCollection[Math.floor(e)].call(null)
        }, a.removeFrameScript = function (e) {
            if (Math.floor(e) < 0 || Math.floor(e) > this.totalFrames - 1) throw new Error("浜嬩欢甯у簭鍙疯秴鍑烘湁鏁堣寖鍥�");
            this.callBackFunctionCollection && this.callBackFunctionCollection[Math.floor(e)] && delete this.callBackFunctionCollection[Math.floor(e)]
        }, a.play = function () {
            return 1 == this.$totalFrames ? void this.stop() : (this.$isPlaying = !0, void(this.$driverType == disTypes.DriverType.FRAME ? (this.addEventListener(egret.Event.ENTER_FRAME, this.playHandler, this), this.timer && (this.timer.removeEventListener(egret.TimerEvent.TIMER, this.playHandler, this), this.timer.stop())) : this.$driverType == disTypes.DriverType.TIMER && (this.timer || (this.timer = new egret.Timer(this.playInterval)), this.timer.addEventListener(egret.TimerEvent.TIMER, this.playHandler, this), this.timer.delay = this.playInterval, this.timer.start())))
        }, a.gotoAndPlay = function (e) {
            if (1 == this.$totalFrames) return void this.stop();
            var t = this.$currentFrame;
            this.$currentFrame = Math.floor(e), this.$currentFrame < 1 ? this.$currentFrame = 1 : this.$currentFrame > this.totalFrames && (this.$currentFrame = this.totalFrames), this.start = this.$currentFrame - 1 + this.min;
            var i = this.checkAndCreateTexture(this.texturePrefix + this.getFrameByDigits(this.start, this.digits));
            this.backGroundBitmap.texture = i, this.callBackFunctionCollection && this.executeFrameScript && this.callBackFunctionCollection[this.$currentFrame - 1] && t != this.$currentFrame && this.callBackFunctionCollection[this.$currentFrame - 1].call(null), this.play()
        }, a.stop = function () {
            this.$isPlaying = !1, this.removeEventListener(egret.Event.ENTER_FRAME, this.playHandler, this), this.timer && (this.timer.removeEventListener(egret.TimerEvent.TIMER, this.playHandler, this), this.timer.stop()), this.start = this.$currentFrame - 1 + this.min;
            var e = this.checkAndCreateTexture(this.texturePrefix + this.getFrameByDigits(this.start, this.digits));
            this.backGroundBitmap.texture = e
        }, a.gotoAndStop = function (e) {
            if (1 == this.$totalFrames) return void this.stop();
            var t = this.$currentFrame;
            this.$currentFrame = Math.floor(e), this.$currentFrame < 1 ? this.$currentFrame = 1 : this.$currentFrame > this.totalFrames && (this.$currentFrame = this.totalFrames), this.stop(), this.callBackFunctionCollection && this.executeFrameScript && this.callBackFunctionCollection[this.$currentFrame - 1] && t != this.$currentFrame && this.callBackFunctionCollection[this.$currentFrame - 1].call(null)
        }, a.playHandler = function () {
            if (this.$isPlaying && this.executeDriverType) if (this.$driverType == disTypes.DriverType.FRAME) {
                for (this.currentInterval++; this.currentInterval >= 2 * this.playInterval;) if (this.currentInterval -= this.playInterval, this.autoNextFrame(!1), !this.$isPlaying) return;
                this.currentInterval >= this.playInterval && (this.currentInterval -= this.playInterval, this.autoNextFrame(!0))
            } else this.$driverType == disTypes.DriverType.TIMER && this.autoNextFrame()
        }, a.autoNextFrame = function (e) {
            if (void 0 === e && (e = !0), this.start <= this.max && this.start++, this.start > this.max && (this.isPlaying ? this.start = this.min : this.start = this.max), this.executeLoop && this.isPlaying && this.$currentFrame == this.$loopEndFrame && (this.start = this.$loopStartFrame - 1 + this.min), this.executeLoop && this.isPlaying && this.$currentFrame >= this.$loopStartFrame && this.$currentFrame <= this.$loopEndFrame && (this.driverType != this.$driverTypeOnLooping || this.$playIntervalOnLooping != this.playInterval) && this.setDriver(this.$driverTypeOnLooping, this.$playIntervalOnLooping), this.$currentFrame = this.start - this.min + 1, e) {
                var t = this.checkAndCreateTexture(this.texturePrefix + this.getFrameByDigits(this.start, this.digits));
                this.backGroundBitmap.texture = t
            }
            this.executeLoop && this.isPlaying && this.$currentFrame == this.$loopStartFrame && this.$currentFrame == this.$loopEndFrame && (trace("鎻愮ず: 寰幆鐐圭殑璧峰甯у彿涓庣粨鏉熷抚鍙风浉鍚�, 鑷姩鍋滄鎾斁"), this.stop()), this.callBackFunctionCollection && this.executeFrameScript && this.callBackFunctionCollection[this.$currentFrame - 1] && this.callBackFunctionCollection[this.$currentFrame - 1].call(null)
        }, a.autoPrevFrame = function (e) {
            if (void 0 === e && (e = !0), this.start > this.min && this.start--, this.start < this.min && (this.start = this.min), this.$currentFrame = this.start - this.min + 1, e) {
                var t = this.checkAndCreateTexture(this.texturePrefix + this.getFrameByDigits(this.start, this.digits));
                this.backGroundBitmap.texture = t
            }
            this.callBackFunctionCollection && this.executeFrameScript && this.callBackFunctionCollection[this.$currentFrame - 1] && this.callBackFunctionCollection[this.$currentFrame - 1].call(null)
        }, a.nextFrame = function () {
            this.stop(), this.start < this.max && this.autoNextFrame()
        }, a.prevFrame = function () {
            this.stop(), this.start > this.min && this.autoPrevFrame()
        }, i(a, "currentTextureName", function () {
            return this.$currentTextureName
        }), a.getFrameByDigits = function (e, t) {
            1 > t && (t = 1), t = Math.floor(t);
            for (var i = e.toString(); i.length < t;) i = 0 + i;
            return i
        }, i(a, "smoothing", function () {
            return this.backGroundBitmap.smoothing
        }, function (e) {
            this.backGroundBitmap.smoothing = e
        }), a.destroy = function () {
            e.prototype.destroy.call(this), this.backGroundBitmap && this.contains(this.backGroundBitmap) && this.removeChild(this.backGroundBitmap), this.callBackFunctionCollection = null
        }, a.setDriver = function (e, t) {
            if (void 0 === e && (e = disTypes.DriverType.FRAME), void 0 === t && (t = 1), 0 >= t) throw new Error("椹卞姩闂撮殧涓嶈兘绛変簬鎴栧皬浜�0锛�");
            this.executeDriverType && (this.$driverType = e, this.playInterval = t, this.currentInterval = 0, this.isPlaying && (this.removeEventListener(egret.Event.ENTER_FRAME, this.playHandler, this), this.timer && (this.timer.removeEventListener(egret.TimerEvent.TIMER, this.playHandler, this), this.timer.stop()), this.play()))
        }, i(a, "driverType", function () {
            return this.$driverType
        }), t
    }(e.AbstractAnimation);
    e.AnimationLite = t, egret.registerClass(t, "disDev.AnimationLite", ["disDev.IAnimation", "disDev.IDisplayObjectLite", "egret.IEventDispatcher"])
}(disDev || (disDev = {}));
var disDev;
!function (e) {
    var t = function (e) {
        function t(t, i, r, a) {
            void 0 === t && (t = 1), void 0 === i && (i = null), void 0 === r && (r = 1), void 0 === a && (a = !0), e.call(this), this.start = 1, this.$isAutoEnter = !1, this.reconstruct(t, i, r, a)
        }

        __extends(t, e);
        var i = __define, r = t, a = r.prototype;
        return a.reconstruct = function (e, t, i, r) {
            if (void 0 === t && (t = null), void 0 === i && (i = 1), void 0 === r && (r = !0), 1 > e) throw new Error("totalFrames 涓嶈兘灏忎簬1");
            if (this.$totalFrames = Math.floor(e), 1 > i || i > this.$totalFrames) throw new Error("startFrame 瓒呭嚭鏈夋晥鑼冨洿");
            this.$isPlaying = !1, this.destroy(), this.clearLoopPoint(), this.$currentFrame = Math.floor(i), this.start = this.$currentFrame, this.setDriver(), t && t.length > 0 && (this.resetAnimations(t), r ? this.gotoAndPlay(this.start) : this.gotoAndStop(this.start)), this.callBackFunctionCollection = new Array
        }, a.resetAnimations = function (e) {
            for (; this.numChildren > 0;) this.removeChildAt(0);
            this.anmArray = new Array;
            for (var t = 0; t < e.length; t++) this.addAnimation(e[t])
        }, a.addAnimation = function (e) {
            return this.addAnimationAt(e, this.numChildren)
        }, a.addAnimationAt = function (e, t) {
            if (this.anmArray || (this.anmArray = new Array), this.$totalFrames != e.totalFrames) throw new Error("瀛愬姩鐢讳笌" + this.__class__ + "鐨� totalFrames 涓嶄竴鑷�");
            this.anmArray.push(e), e.executeFrameScript = !1, e.executeLoop = !1, e.executeDriverType = !1;
            var i = e;
            return this.addChildAt(i, t), e
        }, a.setAnimationIndex = function (e, t) {
            this.setChildIndex(e, t)
        }, a.removeAnimation = function (e) {
            this.removeChild(e)
        }, a.removeAnimationAt = function (e) {
            this.removeChildAt(e)
        }, a.stepAllLayer = function () {
            for (var e = 0; e < this.anmArray.length; e++) this.anmArray[e].gotoAndStop(this.currentFrame)
        }, a.addFrameScript = function (e, t, i, r) {
            if (void 0 === i && (i = this), void 0 === r && (r = !0), isNaN(Math.floor(e)) || Math.floor(e) < 0 || Math.floor(e) > this.$totalFrames - 1) throw new Error("浜嬩欢甯у簭鍙疯秴鍑烘湁鏁堣寖鍥�");
            this.callBackFunctionCollection[Math.floor(e)] = t.bind(i), r && Math.floor(e) == this.start && this.executeFrameScript && this.callBackFunctionCollection[Math.floor(e)].call(null)
        }, a.addFrameScriptOnce = function (e, t, i, r) {
            if (void 0 === i && (i = this), void 0 === r && (r = !0), isNaN(Math.floor(e)) || Math.floor(e) < 0 || Math.floor(e) > this.$totalFrames - 1) throw new Error("浜嬩欢甯у簭鍙疯秴鍑烘湁鏁堣寖鍥�");
            this.callBackFunctionCollection[Math.floor(e)] = function () {
                t.bind(i).call(null), this.removeFrameScript(Math.floor(e))
            }.bind(this), r && Math.floor(e) == this.start && this.executeFrameScript && this.callBackFunctionCollection[Math.floor(e)].call(null)
        }, a.removeFrameScript = function (e) {
            if (Math.floor(e) < 0 || Math.floor(e) > this.$totalFrames - 1) throw new Error("浜嬩欢甯у簭鍙疯秴鍑烘湁鏁堣寖鍥�");
            this.callBackFunctionCollection && this.callBackFunctionCollection[Math.floor(e)] && delete this.callBackFunctionCollection[Math.floor(e)]
        }, a.play = function () {
            return 1 == this.$totalFrames ? void this.stop() : (this.$isPlaying = !0, this.$driverType == disTypes.DriverType.FRAME ? (this.addEventListener(egret.Event.ENTER_FRAME, this.playHandler, this), this.timer && (this.timer.removeEventListener(egret.TimerEvent.TIMER, this.playHandler, this), this.timer.stop())) : this.$driverType == disTypes.DriverType.TIMER && (this.timer || (this.timer = new egret.Timer(this.playInterval)), this.timer.addEventListener(egret.TimerEvent.TIMER, this.playHandler, this), this.timer.delay = this.playInterval, this.timer.start()), void this.stepAllLayer())
        }, a.gotoAndPlay = function (e) {
            if (1 == this.$totalFrames) return void this.stop();
            this.$isAutoEnter = !1;
            var t = this.$currentFrame;
            this.$currentFrame = Math.floor(e), this.$currentFrame < 1 ? this.$currentFrame = 1 : this.$currentFrame > this.$totalFrames && (this.$currentFrame = this.$totalFrames), this.start = this.$currentFrame, this.callBackFunctionCollection && this.executeFrameScript && this.callBackFunctionCollection[this.$currentFrame - 1] && t != this.$currentFrame && this.callBackFunctionCollection[this.$currentFrame - 1].call(null), this.play()
        }, a.stop = function () {
            this.$isPlaying = !1, this.removeEventListener(egret.Event.ENTER_FRAME, this.playHandler, this), this.timer && (this.timer.removeEventListener(egret.TimerEvent.TIMER, this.playHandler, this), this.timer.stop()), this.start = this.$currentFrame, this.stepAllLayer()
        }, a.gotoAndStop = function (e) {
            if (1 == this.$totalFrames) return void this.stop();
            this.$isAutoEnter = !1;
            var t = this.$currentFrame;
            this.$currentFrame = Math.floor(e), this.$currentFrame < 1 ? this.$currentFrame = 1 : this.$currentFrame > this.$totalFrames && (this.$currentFrame = this.$totalFrames), this.stop(), this.callBackFunctionCollection && this.executeFrameScript && this.callBackFunctionCollection[this.$currentFrame - 1] && t != this.$currentFrame && this.callBackFunctionCollection[this.$currentFrame - 1].call(null)
        }, a.playHandler = function () {
            if (this.$isPlaying && this.executeDriverType) if (this.$driverType == disTypes.DriverType.FRAME) {
                for (this.currentInterval++; this.currentInterval >= 2 * this.playInterval;) if (this.currentInterval -= this.playInterval, this.autoNextFrame(!1), !this.$isPlaying) return;
                this.currentInterval >= this.playInterval && (this.currentInterval -= this.playInterval, this.autoNextFrame(!0))
            } else this.$driverType == disTypes.DriverType.TIMER && this.autoNextFrame()
        }, a.autoNextFrame = function (e) {
            void 0 === e && (e = !0), this.$isAutoEnter = !0, this.start <= this.$totalFrames && this.start++, this.start > this.$totalFrames && (this.isPlaying ? this.start = 1 : this.start = this.$totalFrames), this.executeLoop && this.isPlaying && this.$currentFrame == this.$loopEndFrame && (this.start = this.$loopStartFrame);
            var t = this.$currentFrame;
            this.$currentFrame = this.start, this.executeLoop && this.isPlaying && this.start == this.$loopStartFrame && this.start == this.$loopEndFrame && (trace("鎻愮ず: 寰幆鐐圭殑璧峰甯у彿涓庣粨鏉熷抚鍙风浉鍚�, 鑷姩鍋滄鎾斁"), this.stop()), this.callBackFunctionCollection && this.executeFrameScript && this.callBackFunctionCollection[this.$currentFrame - 1] && t != this.$currentFrame && this.callBackFunctionCollection[this.$currentFrame - 1].call(null), this.$isPlaying && this.stepAllLayer()
        }, a.autoPrevFrame = function (e) {
            void 0 === e && (e = !0), this.start > 1 && (this.start--, this.$isAutoEnter = !0), this.start < 1 && (this.start = 1), this.$currentFrame = this.start, this.callBackFunctionCollection && this.executeFrameScript && this.callBackFunctionCollection[this.$currentFrame - 1] && this.callBackFunctionCollection[this.$currentFrame - 1].call(null), this.stepAllLayer()
        }, a.nextFrame = function () {
            this.stop(), this.start < this.$totalFrames && this.autoNextFrame()
        }, a.prevFrame = function () {
            this.stop(), this.start > 1 && this.autoPrevFrame()
        }, i(a, "isAutoEnter", function () {
            return this.$isAutoEnter
        }), a.destroy = function () {
            for (e.prototype.destroy.call(this); this.numChildren > 0;) {
                if (egret.is(this.getChildAt(0), "disDev.AbstractAnimation")) {
                    var t = this.getChildAt(0);
                    t.destroy()
                }
                this.removeChildAt(0)
            }
            this.anmArray = null
        }, a.setDriver = function (e, t) {
            if (void 0 === e && (e = disTypes.DriverType.FRAME), void 0 === t && (t = 1), 0 >= t) throw new Error("椹卞姩闂撮殧涓嶈兘绛変簬鎴栧皬浜�0锛�");
            this.executeDriverType && (this.$driverType = e, this.playInterval = t, this.$driverTypeOnLooping = this.$driverType, this.$playIntervalOnLooping = this.playInterval, this.currentInterval = 0, e == disTypes.DriverType.FRAME && this.playInterval % 1 != 0 ? trace("鎻愮ず: 褰撳墠閲囩敤閫愬抚椹卞姩鏂瑰紡, playInterval涓嶆槸鏁存暟(" + this.playInterval + "), 灏嗕細鍑虹幇涓㈠抚鐨勬儏鍐�") : e == disTypes.DriverType.TIMER && this.playInterval < 16 && trace("鎻愮ず: 褰撳墠閲囩敤璁℃椂鍣ㄩ┍鍔ㄦ柟寮�, playInterval浣庝簬涓嬮檺16姣(" + this.playInterval + "), 灏嗚嚜鍔ㄨ皟鏁翠负 甯�/16姣 鐨勯鐜�"), this.isPlaying && (this.removeEventListener(egret.Event.ENTER_FRAME, this.playHandler, this), this.timer && (this.timer.removeEventListener(egret.TimerEvent.TIMER, this.playHandler, this), this.timer.stop()), this.play()))
        }, i(a, "frameInterval", void 0, function (e) {
            this.setDriver(disTypes.DriverType.FRAME, e)
        }), i(a, "timerInterval", void 0, function (e) {
            this.setDriver(disTypes.DriverType.TIMER, e)
        }), i(a, "driverType", function () {
            return this.$driverType
        }), t
    }(e.AbstractAnimation);
    e.AnimationMerger = t, egret.registerClass(t, "disDev.AnimationMerger", ["disDev.IAnimation", "disDev.IDisplayObjectLite", "egret.IEventDispatcher"])
}(disDev || (disDev = {}));
var disDev;
!function (e) {
    var t = function (t) {
        function i(e, i, r) {
            void 0 === e && (e = null), void 0 === i && (i = e), void 0 === r && (r = e), t.call(this), this.reconstruct(e, i, r)
        }

        __extends(i, t);
        var r = __define, a = i, n = a.prototype;
        return n.reconstruct = function (t, i, r) {
            void 0 === i && (i = t), void 0 === r && (r = t), this.$normalTexture = t, this.$pressTexture = i, this.$disabledTexture = r, this.$normalStatus = new e.ButtonStatus, this.$pressStatus = null, this.$disabledStatus = null, this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this), this.stage && (this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this), this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this), this.$stageObj = null), this.turnNormal(), this.touchEnabled = !0, this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this)
        }, n.setScale9Grids = function (e) {
            this.normalScale9Grid = e.normalGrid, this.pressScale9Grid = e.pressGrid, this.disabledScale9Grid = e.disabledGrid
        }, r(n, "touchRangeShape", function () {
            return this.$touchRangeShape
        }, function (e) {
            this.$touchRangeShape && this.$touchRangeShape.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this), this.$touchRangeShape = e, this.$touchRangeShape ? (this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this), this.$touchRangeShape.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this)) : this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this), this.touchEnabled = this.$touchEnabled
        }), n.onTouchBegin = function (e) {
            this.turnPress(), this.stage && (this.$stageObj = this.stage, this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this), this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this))
        }, n.touchMove = function (e) {
            var t = this.globalToLocal(e.stageX, e.stageY);
            if (this.$touchRangeShape) if (egret.is(this.$touchRangeShape, "egret.Shape")) this.$touchRangeShape.hitTestPoint(e.stageX, e.stageY, !0) ? "press" != this.$currentTexture && this.turnPress() : "normal" != this.$currentTexture && this.turnNormal(); else {
                var i = this.$touchRangeShape.x - this.$touchRangeShape.anchorOffsetX,
                    r = this.$touchRangeShape.y - this.$touchRangeShape.anchorOffsetY,
                    a = new egret.Rectangle(i, r, this.$touchRangeShape.width * this.$touchRangeShape.scaleX, this.$touchRangeShape.height * this.$touchRangeShape.scaleY);
                e.stageX < a.left || e.stageY < a.top || e.stageX > a.right || e.stageY > a.bottom ? "normal" != this.$currentTexture && this.turnNormal() : "press" != this.$currentTexture && this.turnPress()
            } else {
                var a = this.getBounds(),
                    n = new egret.Rectangle(a.x + this.anchorOffsetX, a.y + this.anchorOffsetY, a.width, a.height);
                t.x < n.x || t.y < n.y || t.x > n.x + n.width || t.y > n.y + n.height ? "normal" != this.$currentTexture && this.turnNormal() : "press" != this.$currentTexture && this.turnPress()
            }
        }, n.touchEnd = function (e) {
            this.turnNormal(), this.$stageObj && (this.$stageObj.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this), this.$stageObj.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this), this.$stageObj = null)
        }, n.refrash = function () {
            switch (this.$currentTexture) {
                case"normal":
                    this.turnNormal();
                    break;
                case"press":
                    this.turnPress();
                    break;
                case"disabled":
                    this.turnDisabled()
            }
        }, n.turnNormal = function () {
            this.scale9Grid = this.$normalScale9Grid, this.texture = RES.getRes(this.$normalTexture), this.$currentTexture = "normal", this.$normalStatus && (this.anchorOffsetX = this.$normalStatus.anchorOffsetX, this.anchorOffsetY = this.$normalStatus.anchorOffsetY, this.scaleX = this.$normalStatus.scaleX, this.scaleY = this.$normalStatus.scaleY, this.rotation = this.$normalStatus.rotation, this.alpha = this.$normalStatus.alpha)
        }, n.turnPress = function () {
            this.scale9Grid = this.$pressScale9Grid, this.texture = RES.getRes(this.$pressTexture), this.$currentTexture = "press", this.$pressStatus && (this.anchorOffsetX = this.$pressStatus.anchorOffsetX, this.anchorOffsetY = this.$pressStatus.anchorOffsetY, this.scaleX = this.$pressStatus.scaleX, this.scaleY = this.$pressStatus.scaleY, this.rotation = this.$pressStatus.rotation, this.alpha = this.$pressStatus.alpha)
        }, n.turnDisabled = function () {
            this.scale9Grid = this.$disabledScale9Grid, this.texture = RES.getRes(this.$disabledTexture), this.$currentTexture = "disabled", this.$disabledStatus && (this.anchorOffsetX = this.$disabledStatus.anchorOffsetX, this.anchorOffsetY = this.$disabledStatus.anchorOffsetY, this.scaleX = this.$disabledStatus.scaleX, this.scaleY = this.$disabledStatus.scaleY, this.rotation = this.$disabledStatus.rotation, this.alpha = this.$disabledStatus.alpha)
        }, r(n, "normalStatus", function () {
            return this.$normalStatus
        }, function (e) {
            this.$normalStatus = e, this.refrash()
        }), r(n, "pressStatus", function () {
            return this.$pressStatus
        }, function (e) {
            this.$pressStatus = e, this.refrash()
        }), r(n, "disabledStatus", function () {
            return this.$disabledStatus
        }, function (e) {
            this.$disabledStatus = e, this.refrash()
        }), r(n, "touchEnabled", function () {
            return this.$touchEnabled
        }, function (e) {
            0 == e ? (this.touchEnd(null), this.turnDisabled()) : 1 == e && ("press" == this.$currentTexture ? this.turnPress() : this.turnNormal()), this.$touchRangeShape ? (t.prototype.$setTouchEnabled.call(this, !1), this.$touchRangeShape.touchEnabled = e) : t.prototype.$setTouchEnabled.call(this, e), this.$touchEnabled = e
        }), r(n, "normalScale9Grid", function () {
            return this.$normalScale9Grid
        }, function (e) {
            this.$normalScale9Grid = e, "normal" == this.$currentTexture && this.turnNormal()
        }), r(n, "pressScale9Grid", function () {
            return this.$pressScale9Grid
        }, function (e) {
            this.$pressScale9Grid = e, "press" == this.$currentTexture && this.turnPress()
        }), r(n, "disabledScale9Grid", function () {
            return this.$disabledScale9Grid
        }, function (e) {
            this.$disabledScale9Grid = e, "disabled" == this.$currentTexture && this.turnDisabled()
        }), r(n, "scaleWidth", function () {
            return this.width * this.scaleX
        }, function (e) {
            this.scaleX = e / this.width
        }), r(n, "scaleHeight", function () {
            return this.height * this.scaleY
        }, function (e) {
            this.scaleY = e / this.height
        }), n.destroy = function () {
            this.texture = null, this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this), this.$stageObj && (this.$stageObj.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this), this.$stageObj.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this), this.$stageObj = null)
        }, i
    }(egret.Bitmap);
    e.ButtonLite = t, egret.registerClass(t, "disDev.ButtonLite", ["disDev.IDisplayObjectLite", "egret.IEventDispatcher"]);
    var i = function () {
        function e(e, t, i) {
            void 0 === t && (t = e), void 0 === i && (i = e), this.normalGrid = e, this.pressGrid = t, this.disabledGrid = i
        }

        var t = (__define, e);
        return t.prototype, e
    }();
    e.Scale9Grids = i, egret.registerClass(i, "disDev.Scale9Grids");
    var r = function () {
        function e(e, t, i, r, a, n) {
            void 0 === e && (e = 1), void 0 === t && (t = 1), void 0 === i && (i = 0), void 0 === r && (r = 0), void 0 === a && (a = 1), void 0 === n && (n = 0), this.scaleX = 1, this.scaleY = 1, this.anchorOffsetX = 0, this.anchorOffsetY = 0, this.alpha = 1, this.rotation = 0, this.scaleX = e, this.scaleY = t, this.anchorOffsetX = i, this.anchorOffsetY = r, this.alpha = a, this.rotation = n
        }

        var t = (__define, e);
        return t.prototype, e
    }();
    e.ButtonStatus = r, egret.registerClass(r, "disDev.ButtonStatus")
}(disDev || (disDev = {}));
var disDev;
!function (e) {
    var t = function (e) {
        function t(t) {
            e.call(this), this.fcoArray = t, this.frameDisplayObjectsArray = new Object, this.labelFromIndex = new Object, this.indexFromLabel = new Object, this.continuationFromIndex = new Object, this.layerFromIndex = new Object;
            for (var i = 0; i < t.length; i++) {
                var r = t[i].frame - 1;
                this.frameDisplayObjectsArray[r] = t[i].classNameArray, this.indexFromLabel["label_" + t[i].frameLabel] = r, this.labelFromIndex[r] = t[i].frameLabel, this.continuationFromIndex = t[i].continuation, this.layerFromIndex = t[i].layer
            }
        }

        __extends(t, e);
        var i = __define, r = t, a = r.prototype;
        return a.gotoAndStop = function (e) {
        }, i(a, "scaleWidth", function () {
            return this.width * this.scaleX
        }, function (e) {
            this.scaleX = e / this.width
        }), i(a, "scaleHeight", function () {
            return this.height * this.scaleY
        }, function (e) {
            this.scaleY = e / this.height
        }), a.destroy = function () {
        }, t
    }(egret.Sprite);
    e.MovieClipPlus = t, egret.registerClass(t, "disDev.MovieClipPlus", ["disDev.IDisplayObjectLite", "egret.IEventDispatcher"])
}(disDev || (disDev = {}));
var FrameContentObject = function () {
    function e(e, t, i, r, a) {
        void 0 === t && (t = null), void 0 === i && (i = null), void 0 === r && (r = 1), void 0 === a && (a = 0), this.frame = 0, this.frame = 1 > e ? 1 : Math.floor(e), this.classNameArray = t, this.frameLabel = i, this.continuation = 1 > r ? 1 : Math.floor(r), this.layer = a
    }

    var t = (__define, e);
    return t.prototype, e
}();
egret.registerClass(FrameContentObject, "FrameContentObject");
var TypeAndName = function () {
    function e(e, t) {
        this.classType = e, this.instanceName = t
    }

    var t = (__define, e);
    return t.prototype, e
}();
egret.registerClass(TypeAndName, "TypeAndName");
var disTypes;
!function (e) {
    !function (e) {
        e[e.TopAndLeft = 0] = "TopAndLeft", e[e.TopAndMiddle = 1] = "TopAndMiddle", e[e.TopAndRight = 2] = "TopAndRight", e[e.MiddleAndLeft = 3] = "MiddleAndLeft", e[e.Center = 4] = "Center", e[e.MiddleAndRight = 5] = "MiddleAndRight", e[e.BottomAndLeft = 6] = "BottomAndLeft", e[e.BottomAndMiddle = 7] = "BottomAndMiddle", e[e.BottomAndRight = 8] = "BottomAndRight"
    }(e.BitmapAlignEnum || (e.BitmapAlignEnum = {})), e.BitmapAlignEnum
}(disTypes || (disTypes = {}));
var disTypes;
!function (e) {
    var t = function () {
        function e() {
            throw new Error(this.__class__ + " 鏄潤鎬佹垚鍛橀泦鎴愮被锛屾棤闇€瀹炰緥鍖�")
        }

        var t = (__define, e);
        return t.prototype, e.FRAME = "runFrame", e.TIMER = "runTimer", e
    }();
    e.DriverType = t, egret.registerClass(t, "disTypes.DriverType")
}(disTypes || (disTypes = {}));
var HashMap = function () {
    function e() {
        this.keyArray = new Array, this.objArray = new Array
    }

    var t = __define, i = e, r = i.prototype;
    return t(e, "hashMapSingleton", function () {
        return this.instance || (this.instance = new e), this.instance
    }), r.editPair = function (e, t) {
        var i = this.keyArray.indexOf(e);
        return -1 == i ? (this.keyArray.push(e), this.objArray.push(t)) : this.objArray[i] = t, new HashPair(e, t)
    }, r.getObject = function (e) {
        var t = this.keyArray.indexOf(e);
        return -1 != t ? this.objArray[t] : null
    }, r.deletePair = function (e) {
        var t = this.keyArray.indexOf(e);
        -1 != t && (this.keyArray.splice(t, 1), this.objArray.splice(t, 1))
    }, r.getKeyListCopy = function () {
        return this.keyArray.concat()
    }, r.getObjectListCopy = function () {
        return this.objArray.concat()
    }, r.reverseDeletePair = function (e) {
        for (var t = 0; t < this.objArray.length; t++) this.objArray[t] === e && (this.keyArray.splice(t, 1), this.objArray.splice(t, 1), t--)
    }, e
}();
egret.registerClass(HashMap, "HashMap");
var HashPair = function () {
    function e(e, t) {
        void 0 === e && (e = null), void 0 === t && (t = null), this.key = e, this.object = t
    }

    var t = (__define, e);
    return t.prototype, e
}();
egret.registerClass(HashPair, "HashPair");
var esm;
!function (e) {
    var t = function () {
        function e() {
            throw new Error(this.__class__ + " 鏄潤鎬佹柟娉曢泦鎴愮被锛屼笉闇€瑕佸疄渚嬪寲")
        }

        var t = __define, i = e;
        return i.prototype, t(e, "isOpen", function () {
            return e._isSoundOpen
        }, function (t) {
            e._isSoundOpen = t, e._isSoundOpen ? e.setAllVolumeToDefault() : (e.setAllVolume(0), e.stopAllSound())
        }), e.registerSound = function (t, i, r) {
            if (void 0 === r && (r = 1), !i) throw new Error("鐢ㄤ簬娉ㄥ唽鐨勯煶鏁堜笉鑳戒负null锛岃妫€鏌ュ０闊虫枃浠舵槸鍚﹀凡鎴愬姛鍔犺浇(url鏄惁姝ｇ‘锛熸槸鍚﹀凡娣诲姞鍒癵roups鐨刱eys锛�)");
            if (e.soundObject || (e.soundObject = new Object, e.defaultVolumeObject = new Object), e.soundObject[t]) throw new Error("璇ラ煶鏁堝悕绉板凡琚敞鍐�");
            i.type = egret.Sound.MUSIC, e.soundObject[t] = i, e.defaultVolumeObject[t] = r
        }, e.initAllSoundWithExtreme = function () {
            if (!e.soundObject) throw new Error("璇ラ煶鏁堝皻鏈娉ㄥ唽鍜屽疄渚嬪寲");
            var t = e.isOpen;
            e.isOpen = !0;
            for (var i in e.soundObject) e.playSound(i, 0, 1, 0, 0);
            e.stopAllSound(), e.isOpen = t
        }, e.playSoundSingle = function (t, i, r, a, n) {
            if (void 0 === i && (i = 0), void 0 === r && (r = 1), void 0 === a && (a = i), void 0 === n && (n = NaN), !e.soundObject) throw new Error("璇ラ煶鏁堝皻鏈娉ㄥ唽鍜屽疄渚嬪寲");
            if (!e.soundObject[t]) throw new Error("璇ラ煶鏁堝皻鏈娉ㄥ唽鍜屽疄渚嬪寲");
            e.stopAllSound(), e.playSound(t, i, r, a, n)
        }, e.playSound = function (t, i, r, a, n) {
            if (void 0 === i && (i = 0), void 0 === r && (r = 1), void 0 === a && (a = i), void 0 === n && (n = NaN), !e.soundObject) throw new Error("璇ラ煶鏁堝皻鏈娉ㄥ唽鍜屽疄渚嬪寲");
            if (!e.soundObject[t]) throw new Error("璇ラ煶鏁堝皻鏈娉ㄥ唽鍜屽疄渚嬪寲");
            if (!egret.Capabilities.isMobile || e.isOpen) {
                var s = e.soundObject[t];
                e.soundChannelObject || (e.soundChannelObject = new Object), e.soundChannelObject[t] && e.soundChannelObject[t].stop(), e.isOpen ? isNaN(n) && (n = e.defaultVolumeObject[t]) : n = 0, e.stopSound(t);
                var o, h = [t, r, a, n];
                0 != i && 1 != Math.ceil(r) && a != i ? (o = s.play(i, 1), o.addEventListener(egret.Event.SOUND_COMPLETE, e.onSoundComplete, e)) : (o = s.play(a, r), 0 != r && o.addEventListener(egret.Event.SOUND_COMPLETE, e.onSoundEnd, e)), o.volume = n, e.hashMap.editPair(o, h), e.soundChannelObject[t] = o
            }
        }, e.onSoundComplete = function (t) {
            var i = t.currentTarget, r = e.hashMap.getObject(i);
            e.hashMap.deletePair(i);
            var a = r[0], n = r[1], s = r[2], o = r[3], h = e.soundObject[a];
            e.stopSound(a), 0 == Math.ceil(n) ? i = h.play(s, 0) : (i = h.play(s, Math.ceil(n) - 1), i.addEventListener(egret.Event.SOUND_COMPLETE, e.onSoundEnd, e)), i.volume = o, e.hashMap.editPair(i, r), e.soundChannelObject[a] = i, i.removeEventListener(egret.Event.SOUND_COMPLETE, e.onSoundComplete, e)
        }, e.onSoundEnd = function (t) {
            var i = t.currentTarget, r = e.hashMap.getObject(i), a = r[0];
            i.removeEventListener(egret.Event.SOUND_COMPLETE, e.onSoundEnd, e), e.hashMap.deletePair(i), delete e.soundChannelObject[a]
        }, e.stopSound = function (t) {
            if (!e.soundObject) throw new Error("璇ラ煶鏁堝皻鏈娉ㄥ唽鍜屽疄渚嬪寲");
            if (!e.soundObject[t]) throw new Error("璇ラ煶鏁堝皻鏈娉ㄥ唽鍜屽疄渚嬪寲");
            if (e.soundChannelObject || (e.soundChannelObject = new Object), e.soundChannelObject[t]) {
                var i = e.soundChannelObject[t];
                i.stop(), i.removeEventListener(egret.Event.SOUND_COMPLETE, e.onSoundComplete, e), i.removeEventListener(egret.Event.SOUND_COMPLETE, e.onSoundEnd, e), e.hashMap.deletePair(i), delete e.soundChannelObject[t]
            }
        }, e.stopAllSound = function () {
            if (e.soundChannelObject) for (var t in e.soundChannelObject) {
                var i = e.soundChannelObject[t];
                i.stop(), i.removeEventListener(egret.Event.SOUND_COMPLETE, e.onSoundComplete, e), i.removeEventListener(egret.Event.SOUND_COMPLETE, e.onSoundEnd, e), e.hashMap.deletePair(i), delete e.soundChannelObject[t]
            }
        }, e.setVolume = function (t, i) {
            if (!e.soundObject) throw new Error("璇ラ煶鏁堝皻鏈娉ㄥ唽鍜屽疄渚嬪寲");
            if (e.soundChannelObject || (e.soundChannelObject = new Object), (e.isOpen || 0 == i) && e.soundChannelObject[t]) {
                var r = e.soundChannelObject[t];
                r.volume = i
            }
        }, e.setAllVolume = function (t) {
            if (e.soundChannelObject && (e.isOpen || 0 == t)) for (var i in e.soundChannelObject) {
                var r = e.soundChannelObject[i];
                r.volume = t
            }
        }, e.setVolumeToDefault = function (t) {
            if (!e.soundObject) throw new Error("璇ラ煶鏁堝皻鏈娉ㄥ唽鍜屽疄渚嬪寲");
            if (!e.soundObject[t]) throw new Error("璇ラ煶鏁堝皻鏈娉ㄥ唽鍜屽疄渚嬪寲");
            if (e.soundChannelObject[t] && (e.isOpen || 0 == e.defaultVolumeObject[t])) {
                var i = e.soundChannelObject[t];
                i.volume = e.defaultVolumeObject[t]
            }
        }, e.setAllVolumeToDefault = function () {
            if (e.soundChannelObject) for (var t in e.soundChannelObject) {
                var i = e.soundChannelObject[t];
                i.volume = e.defaultVolumeObject[t]
            }
        }, e.setDefaultVolume = function (t, i) {
            if (!e.soundObject) throw new Error("璇ラ煶鏁堝皻鏈娉ㄥ唽鍜屽疄渚嬪寲");
            if (!e.soundObject[t]) throw new Error("璇ラ煶鏁堝皻鏈娉ㄥ唽鍜屽疄渚嬪寲");
            e.defaultVolumeObject[t] = i
        }, e.getDefaultVolume = function (t) {
            if (!e.soundObject) throw new Error("璇ラ煶鏁堝皻鏈娉ㄥ唽鍜屽疄渚嬪寲");
            if (!e.soundObject[t]) throw new Error("璇ラ煶鏁堝皻鏈娉ㄥ唽鍜屽疄渚嬪寲");
            return e.defaultVolumeObject[t]
        }, e.getSoundChannel = function (t) {
            if (!e.soundObject) throw new Error("璇ラ煶鏁堝皻鏈娉ㄥ唽鍜屽疄渚嬪寲");
            if (!e.soundObject[t]) throw new Error("璇ラ煶鏁堝皻鏈娉ㄥ唽鍜屽疄渚嬪寲");
            return e.soundChannelObject ? e.soundChannelObject[t] : void 0
        }, e.hashMap = new HashMap, e._isSoundOpen = !0, e
    }();
    e.SoundEffectManager = t, egret.registerClass(t, "esm.SoundEffectManager")
}(esm || (esm = {}));
var esm;
!function (e) {
    var t = function () {
        function e() {
            throw new Error(this.__class__ + " 鏄潤鎬佹柟娉曢泦鎴愮被锛屼笉闇€瑕佸疄渚嬪寲")
        }

        var t = __define, i = e;
        return i.prototype, t(e, "isOpen", function () {
            return e._isSoundOpen
        }, function (t) {
            e._isSoundOpen = t, e._isSoundOpen ? e.setAllVolumeToDefault() : (e.setAllVolume(0), e.stopAllSound())
        }), e.registerSound = function (t, i, r) {
            if (void 0 === r && (r = 1), !i) throw new Error("鐢ㄤ簬娉ㄥ唽鐨勯煶涔愪笉鑳戒负null锛岃妫€鏌ュ０闊虫枃浠舵槸鍚﹀凡鎴愬姛鍔犺浇(url鏄惁姝ｇ‘锛熸槸鍚﹀凡娣诲姞鍒癵roups鐨刱eys锛�)");
            if (e.soundObject || (e.soundObject = new Object, e.defaultVolumeObject = new Object), e.soundObject[t]) throw new Error("璇ラ煶涔愬悕绉板凡琚敞鍐�");
            i.type = egret.Sound.MUSIC, e.soundObject[t] = i, e.defaultVolumeObject[t] = r
        }, e.initAllSoundWithExtreme = function () {
            if (!e.soundObject) throw new Error("璇ラ煶涔愬皻鏈娉ㄥ唽鍜屽疄渚嬪寲");
            var t = e.isOpen;
            e.isOpen = !0;
            for (var i in e.soundObject) e.playSound(i, 0, 1, 0, 0);
            e.stopAllSound(), e.isOpen = t
        }, e.playSoundSingle = function (t, i, r, a, n) {
            if (void 0 === i && (i = 0), void 0 === r && (r = 1), void 0 === a && (a = i), void 0 === n && (n = NaN), !e.soundObject) throw new Error("璇ラ煶涔愬皻鏈娉ㄥ唽鍜屽疄渚嬪寲");
            if (!e.soundObject[t]) throw new Error("璇ラ煶涔愬皻鏈娉ㄥ唽鍜屽疄渚嬪寲");
            e.stopAllSound(), e.playSound(t, i, r, a, n)
        }, e.playSound = function (t, i, r, a, n) {
            if (void 0 === i && (i = 0), void 0 === r && (r = 1), void 0 === a && (a = i), void 0 === n && (n = NaN), !e.soundObject) throw new Error("璇ラ煶涔愬皻鏈娉ㄥ唽鍜屽疄渚嬪寲");
            if (!e.soundObject[t]) throw new Error("璇ラ煶涔愬皻鏈娉ㄥ唽鍜屽疄渚嬪寲");
            if (!egret.Capabilities.isMobile || e.isOpen) {
                var s = e.soundObject[t];
                e.soundChannelObject || (e.soundChannelObject = new Object), e.soundChannelObject[t] && e.soundChannelObject[t].stop(), e.isOpen ? isNaN(n) && (n = e.defaultVolumeObject[t]) : n = 0, e.stopSound(t);
                var o, h = [t, r, a, n];
                0 != i && 1 != Math.ceil(r) && a != i ? (o = s.play(i, 1), o.addEventListener(egret.Event.SOUND_COMPLETE, e.onSoundComplete, e)) : (o = s.play(a, r), 0 != r && o.addEventListener(egret.Event.SOUND_COMPLETE, e.onSoundEnd, e)), o.volume = n, e.hashMap.editPair(o, h), e.soundChannelObject[t] = o
            }
        }, e.onSoundComplete = function (t) {
            var i = t.currentTarget, r = e.hashMap.getObject(i);
            e.hashMap.deletePair(i);
            var a = r[0], n = r[1], s = r[2], o = r[3], h = e.soundObject[a];
            e.stopSound(a), 0 == Math.ceil(n) ? i = h.play(s, 0) : (i = h.play(s, Math.ceil(n) - 1), i.addEventListener(egret.Event.SOUND_COMPLETE, e.onSoundEnd, e)), i.volume = o, e.hashMap.editPair(i, r), e.soundChannelObject[a] = i, i.removeEventListener(egret.Event.SOUND_COMPLETE, e.onSoundComplete, e)
        }, e.onSoundEnd = function (t) {
            var i = t.currentTarget, r = e.hashMap.getObject(i), a = r[0];
            i.removeEventListener(egret.Event.SOUND_COMPLETE, e.onSoundEnd, e), e.hashMap.deletePair(i), delete e.soundChannelObject[a]
        }, e.stopSound = function (t) {
            if (!e.soundObject) throw new Error("璇ラ煶涔愬皻鏈娉ㄥ唽鍜屽疄渚嬪寲");
            if (!e.soundObject[t]) throw new Error("璇ラ煶涔愬皻鏈娉ㄥ唽鍜屽疄渚嬪寲");
            if (e.soundChannelObject || (e.soundChannelObject = new Object), e.soundChannelObject[t]) {
                var i = e.soundChannelObject[t];
                i.stop(), i.removeEventListener(egret.Event.SOUND_COMPLETE, e.onSoundComplete, e), i.removeEventListener(egret.Event.SOUND_COMPLETE, e.onSoundEnd, e), e.hashMap.deletePair(i), delete e.soundChannelObject[t]
            }
        }, e.stopAllSound = function () {
            if (e.soundChannelObject) for (var t in e.soundChannelObject) {
                var i = e.soundChannelObject[t];
                i.stop(), i.removeEventListener(egret.Event.SOUND_COMPLETE, e.onSoundComplete, e), i.removeEventListener(egret.Event.SOUND_COMPLETE, e.onSoundEnd, e), e.hashMap.deletePair(i), delete e.soundChannelObject[t]
            }
        }, e.setVolume = function (t, i) {
            if (!e.soundObject) throw new Error("璇ラ煶涔愬皻鏈娉ㄥ唽鍜屽疄渚嬪寲");
            if (e.soundChannelObject || (e.soundChannelObject = new Object), (e.isOpen || 0 == i) && e.soundChannelObject[t]) {
                var r = e.soundChannelObject[t];
                r.volume = i
            }
        }, e.setAllVolume = function (t) {
            if (e.soundChannelObject && (e.isOpen || 0 == t)) for (var i in e.soundChannelObject) {
                var r = e.soundChannelObject[i];
                r.volume = t
            }
        }, e.setVolumeToDefault = function (t) {
            if (!e.soundObject) throw new Error("璇ラ煶涔愬皻鏈娉ㄥ唽鍜屽疄渚嬪寲");
            if (!e.soundObject[t]) throw new Error("璇ラ煶涔愬皻鏈娉ㄥ唽鍜屽疄渚嬪寲");
            if (e.soundChannelObject[t] && (e.isOpen || 0 == e.defaultVolumeObject[t])) {
                var i = e.soundChannelObject[t];
                i.volume = e.defaultVolumeObject[t]
            }
        }, e.setAllVolumeToDefault = function () {
            if (e.soundChannelObject) for (var t in e.soundChannelObject) {
                var i = e.soundChannelObject[t];
                i.volume = e.defaultVolumeObject[t]
            }
        }, e.setDefaultVolume = function (t, i) {
            if (!e.soundObject) throw new Error("璇ラ煶涔愬皻鏈娉ㄥ唽鍜屽疄渚嬪寲");
            if (!e.soundObject[t]) throw new Error("璇ラ煶涔愬皻鏈娉ㄥ唽鍜屽疄渚嬪寲");
            e.defaultVolumeObject[t] = i
        }, e.getDefaultVolume = function (t) {
            if (!e.soundObject) throw new Error("璇ラ煶涔愬皻鏈娉ㄥ唽鍜屽疄渚嬪寲");
            if (!e.soundObject[t]) throw new Error("璇ラ煶涔愬皻鏈娉ㄥ唽鍜屽疄渚嬪寲");
            return e.defaultVolumeObject[t]
        }, e.getSoundChannel = function (t) {
            if (!e.soundObject) throw new Error("璇ラ煶涔愬皻鏈娉ㄥ唽鍜屽疄渚嬪寲");
            if (!e.soundObject[t]) throw new Error("璇ラ煶涔愬皻鏈娉ㄥ唽鍜屽疄渚嬪寲");
            return e.soundChannelObject ? e.soundChannelObject[t] : void 0
        }, e.hashMap = new HashMap, e._isSoundOpen = !0, e
    }();
    e.SoundMusicManager = t, egret.registerClass(t, "esm.SoundMusicManager")
}(esm || (esm = {}));
var AboutBrowser = function () {
    function e() {
    }

    var t = __define, i = e;
    return i.prototype, t(e, "info", function () {
        if (e.sys) return e.sys;
        var t = new BrowserInfo;
        e.sys = t;
        var i = navigator.userAgent, r = "unAutoPlaySound", a = "unControllable", n = "unSmooth", s = "unWebgl",
            o = "unPluralSounds", h = "unOrientation";
        i.indexOf("MQQBrowser") > -1 ? (t.browserKey = "MQQBrowser", t.description = "QQ娴忚鍣�", "Android" == egret.Capabilities.os && (t.assess = "鐩墠鎵€鐭ユ渶鐞嗘兂鐨勬祻瑙堝櫒锛岀編涓笉瓒虫槸鎾斁澹伴煶绋嶆湁寤惰繜", t.fullScreen = 3)) : i.indexOf("UCBrowser") > -1 ? (t.browserKey = "UCBrowser", t.description = "UC娴忚鍣�", "Android" == egret.Capabilities.os && (t.isAdvise = !0, t.assess = "杩欐娴忚鍣ㄥ湪瀹夊崜绯荤粺涓嬶紝涓嶈兘鎺у埗姝ｅ湪鎾斁鐨勫０闊崇殑闊抽噺锛屼笉寮€鍚祻瑙堝櫒鑷甫鐨勬覆鏌撳姞閫熷紩鎿庡氨鍗℃垚鐙楋紝寮€浜嗗姞閫熷張鍙兘浼氶€犳垚鐮村浘\n鍧戠埞鎸囨暟锛氣槄鈽�", t.defectList = [n, a])) : i.indexOf("DolphinBrowser") > -1 ? (t.browserKey = "DolphinBrowser", t.description = "娴疯睔娴忚鍣�", "Android" == egret.Capabilities.os && (t.isAdvise = !0, t.assess = "杩欐娴忚鍣ㄥ湪瀹夊崜绯荤粺涓嬶紝鏈墜鍔ㄨЕ鍙戣繃鐨勫０闊充笉鑳借嚜鍔ㄦ挱鏀撅紝蹇呴』鎵嬪姩鍏抽棴鏋侀€熷唴鏍革紝鎵嶈兘鎵撳紑webGL娓叉煋锛屽惁鍒欎細鍗￠】鎴栫己澶遍儴鍒哢I鍏冪礌\n鍧戠埞鎸囨暟锛氣槄鈽�", t.defectList = [r])) : i.indexOf("2345Browser") > -1 ? (t.browserKey = "2345Browser", t.description = "2345娴忚鍣�", "Android" == egret.Capabilities.os && (t.isAdvise = !0, t.assess = "杩欐娴忚鍣ㄥ湪瀹夊崜绯荤粺涓嬶紝鏈墜鍔ㄨЕ鍙戣繃鐨勫０闊充笉鑳借嚜鍔ㄦ挱鏀撅紱鍏ㄥ睆鍚庝笉鑳介殣钘忔墜鏈洪《绔殑淇℃伅鏍廫n鍧戠埞鎸囨暟锛氣槄鈽�", t.defectList = [r], t.fullScreen = 2)) : i.indexOf("LeBrowser") > -1 ? (t.browserKey = "LeBrowser", t.description = "缁胯尪娴忚鍣�", "Android" == egret.Capabilities.os && (t.isAdvise = !0, t.assess = "杩欐娴忚鍣ㄥ湪瀹夊崜绯荤粺涓嬶紝鏈墜鍔ㄨЕ鍙戣繃鐨勫０闊充笉鑳借嚜鍔ㄦ挱鏀撅紱娌℃湁閲嶅姏鎰熷簲浜嬩欢锛屼笉鑳借嚜鍔ㄨ浆灞廫n鍧戠埞鎸囨暟锛氣槄鈽呪槅", t.defectList = [r, h], t.fullScreen = 2)) : i.indexOf("baidubrowser") > -1 ? i.indexOf("baidubrowser/4") > -1 ? (t.browserKey = "baidubrowser.4", t.description = "鐧惧害娴忚鍣ㄦ瀬閫�", "Android" == egret.Capabilities.os && (t.isAdvise = !0, t.assess = "杩欐娴忚鍣ㄥ湪瀹夊崜绯荤粺涓嬶紝鏈墜鍔ㄨЕ鍙戣繃鐨勫０闊充笉鑳借嚜鍔ㄦ挱鏀撅紱鍏ㄥ睆鍚庢墦寮€鈥滆缃�-->鍙栨秷 鍏ㄥ睆娴忚鏃舵樉绀虹郴缁熼€氱煡鏍忊€濇墠鑳介殣钘忔墜鏈洪《绔殑淇℃伅鏍廫n鍧戠埞鎸囨暟锛氣槄鈽�", t.defectList = [r], t.fullScreen = 2)) : i.indexOf("baidubrowser/7") > -1 && (t.browserKey = "baidubrowser.7", t.description = "鐧惧害娴忚鍣�", "Android" == egret.Capabilities.os && (t.isAdvise = !0, t.assess = "杩欐娴忚鍣ㄥ湪瀹夊崜绯荤粺涓嬶紝鏈墜鍔ㄨЕ鍙戣繃鐨勫０闊充笉鑳借嚜鍔ㄦ挱鏀撅紝鑰屼笖涓嶈兘鍚屾椂鎾斁2涓垨2涓互涓婄殑澹伴煶锛涘叏灞忓悗鎵撳紑鈥滆缃�-->鍙栨秷 鍏ㄥ睆娴忚鏃舵樉绀虹郴缁熼€氱煡鏍忊€濇墠鑳介殣钘忔墜鏈洪《绔殑淇℃伅鏍� 涓嶆敮鎸亀ebGL娓叉煋\n鍧戠埞鎸囨暟锛氣槄鈽呪槅", t.defectList = [r, o, n], t.fullScreen = 2)) : i.indexOf("Ydb") > -1 ? (t.browserKey = "Ydb", t.description = "鎮﹀姩娴忚鍣�", "Android" == egret.Capabilities.os && (t.isAdvise = !0, t.assess = "杩欐娴忚鍣ㄥ湪瀹夊崜绯荤粺涓嬶紝鏈墜鍔ㄨЕ鍙戣繃鐨勫０闊充笉鑳借嚜鍔ㄦ挱鏀綷n鍧戠埞鎸囨暟锛氣槄", t.defectList = [r], t.fullScreen = 3)) : i.indexOf("chinabrowser") > -1 ? (t.browserKey = "chinabrowser", t.description = "涓崕娴忚鍣�", "Android" == egret.Capabilities.os && (t.isAdvise = !0, t.assess = "杩欐娴忚鍣ㄥ湪瀹夊崜绯荤粺涓嬶紝鏈墜鍔ㄨЕ鍙戣繃鐨勫０闊充笉鑳借嚜鍔ㄦ挱鏀綷n鍧戠埞鎸囨暟锛氣槄", t.defectList = [r], t.fullScreen = 3)) : i.indexOf("tiantian") > -1 ? (t.browserKey = "tiantian", t.description = "澶╁ぉ娴忚鍣�", "Android" == egret.Capabilities.os && (t.isAdvise = !0, t.assess = "杩欐娴忚鍣ㄥ湪瀹夊崜绯荤粺涓嬶紝鏈墜鍔ㄨЕ鍙戣繃鐨勫０闊充笉鑳借嚜鍔ㄦ挱鏀綷n鍧戠埞鎸囨暟锛氣槄", t.defectList = [r], t.fullScreen = 3)) : i.indexOf("SwiftBrowser") > -1 ? (t.browserKey = "SwiftBrowser", t.description = "闆ㄧ嚂娴忚鍣�", "Android" == egret.Capabilities.os && (t.isAdvise = !0, t.assess = "杩欐娴忚鍣ㄥ湪瀹夊崜绯荤粺涓嬶紝鏈墜鍔ㄨЕ鍙戣繃鐨勫０闊充笉鑳借嚜鍔ㄦ挱鏀撅紱涓嶆敮鎸亀ebgl娓叉煋锛岄〉闈㈠姩鐢讳笉澶熸祦鐣咃紱娌℃湁閲嶅姏鎰熷簲浜嬩欢锛屼笉鑳借嚜鍔ㄨ浆灞忥紱\n鍧戠埞鎸囨暟锛氣槄鈽呪槄", t.defectList = [r, n, s, h], t.fullScreen = 0)) : i.indexOf("MxBrowser") > -1 ? (t.browserKey = "MxBrowser", t.description = "閬ㄦ父浜戞祻瑙堝櫒(android)", "Android" == egret.Capabilities.os ? (t.isAdvise = !0, t.assess = "杩欐娴忚鍣ㄥ湪瀹夊崜绯荤粺涓嬶紝鏈墜鍔ㄨЕ鍙戣繃鐨勫０闊充笉鑳借嚜鍔ㄦ挱鏀�;鍏ㄥ睆鍚� 鎵撳紑鈥滆缃�-->椤甸潰鎺у埗-->韬复鍏跺妯″紡鈥濇墠鑳介殣钘忔墜鏈洪《绔殑淇℃伅鏍廫n鍧戠埞鎸囨暟锛氣槄鈽�", t.defectList = [r], t.fullScreen = 2) : t.description = "閬ㄦ父浜戞祻瑙堝櫒") : i.indexOf("LieBaoFast") > -1 ? (t.browserKey = "LieBaoFast", t.description = "鐚庤惫娴忚鍣�", "Android" == egret.Capabilities.os && (t.isAdvise = !0, t.assess = "杩欐娴忚鍣ㄥ湪瀹夊崜绯荤粺涓嬶紝鏈墜鍔ㄨЕ鍙戣繃鐨勫０闊充笉鑳借嚜鍔ㄦ挱鏀綷n鍧戠埞鎸囨暟锛氣槄", t.defectList = [r], t.fullScreen = 1)) : i.indexOf("360 Aphone Browser") > -1 ? (t.browserKey = "360 Aphone Browser", t.description = "360 Aphone娴忚鍣�", "Android" == egret.Capabilities.os && (i.indexOf("360browser") > -1 && (t.browserKey = "360browser", t.description = "360鏋侀€熸祻瑙堝櫒"), t.isAdvise = !0, t.assess = "杩欐娴忚鍣ㄥ湪瀹夊崜绯荤粺涓嬶紝鏈墜鍔ㄨЕ鍙戣繃鐨勫０闊充笉鑳借嚜鍔ㄦ挱鏀綷n鍧戠埞鎸囨暟锛氣槄", t.defectList = [r], t.fullScreen = 3)) : i.indexOf("HaoWangZhiDaQuanHD") > -1 ? (t.isAdvise = !0, t.browserKey = "HaoWangZhiDaQuanHD", t.description = "濂界綉鍧€澶у叏娴忚鍣ㄣ€備负浜嗘洿濂界殑浣撻獙锛屽缓璁洿鎹㈠叾浠栦富娴佹祻瑙堝櫒鎵撳紑鏈〉闈�") : i.indexOf("SogouMobileBrowser") > -1 ? (t.browserKey = "SogouMobileBrowser", "Android" == egret.Capabilities.os && (t.isAdvise = !0, t.description = "鎼滅嫍娴忚鍣�", t.assess = "杩欐娴忚鍣ㄥ湪瀹夊崜绯荤粺涓嬶紝鏈墜鍔ㄨЕ鍙戣繃鐨勫０闊充笉鑳借嚜鍔ㄦ挱鏀撅紱涓嶆敮鎸亀ebgl娓叉煋锛岄〉闈㈠姩鐢讳笉娴佺晠\n鍧戠埞鎸囨暟锛氣槄鈽呪槄", t.defectList = [r, n, s], t.fullScreen = 3)) : i.indexOf("Firefox") > -1 ? (t.browserKey = "Firefox", "Android" == egret.Capabilities.os ? (t.description = "鐏嫄娴忚鍣�(android)", t.fullScreen = 1) : t.description = "鐏嫄娴忚鍣�") : "Android" == egret.Capabilities.os && (t.isAdvise = !0, t.defectList = [r, a, s], t.description = "鎮ㄥ綋鍓嶄娇鐢ㄧ殑娴忚鍣ㄥ叿浣撳悕绉颁笉璇�", t.assess = "鏃犳硶璇嗗埆鐨勫畨鍗撴祻瑙堝櫒锛屼竴寰嬪綋鍋氫笉鑳借嚜鍔ㄦ挱鏀惧０闊炽€佷笉鑳芥帶鍒堕煶閲忕殑鎯呭喌澶勭悊"), "unkonw" == t.browserKey && (i.indexOf("Chrome") > -1 && i.indexOf("Safari") > -1 ? (t.browserKey = "Chrome&Safari", "Android" == egret.Capabilities.os ? t.description = "璋锋瓕鎴栧叾浠栨棤娉曡瘑鍒殑璋锋瓕鍐呮牳娴忚鍣�(android)" : t.description = "璋锋瓕鎴栧叾浠栨棤娉曡瘑鍒殑璋锋瓕鍐呮牳娴忚鍣�") : i.indexOf(" OPR") > -1 && i.indexOf("Safari") > -1 ? (t.browserKey = "OPR&Safari", "Android" == egret.Capabilities.os ? (t.isAdvise, t.description = "娆ф湅娴忚鍣�(android)", t.defectList = [r], t.assess = "鍦ㄥ畨鍗撶郴缁熶笅锛屼笉鎺ㄨ崘浣跨敤娆ф湅娴忚鍣ㄦ祻瑙堟湰椤甸潰") : t.description = "娆ф湅娴忚鍣�") : i.indexOf("Chrome") > -1 ? (t.browserKey = "Chrome", t.description = "鎮ㄥ綋鍓嶄娇鐢ㄧ殑娴忚鍣ㄥ睘浜嶤hrome绫诲瀷锛屽叿浣撳悕绉颁笉璇︺€備负浜嗘洿濂界殑浣撻獙锛屽缓璁洿鎹㈠叾浠栦富娴佹祻瑙堝櫒鎵撳紑鏈〉闈�") : i.indexOf("Safari") > -1 && (t.browserKey = "Safari", t.description = "Safari鎴栨棤娉曡瘑鍒殑Safari绫诲瀷娴忚鍣�")), "iOS" == egret.Capabilities.os && (e.info.isWebgl = !1);
        for (var l in t.defectList) {
            var c = String(t.defectList[l]), u = c.replace("un", "is");
            t[u] = !1
        }
        return t
    }), e.unAutoPlaySound = "unAutoPlaySound", e.unControllable = "unControllable", e.unSmooth = "unSmooth", e.unWebgl = "unWebgl", e.unPluralSounds = "unPluralSounds", e.unOrientation = "unOrientation", e.browserKeyCollection = ["UCBrowser", "2345Browser", "JiSuLiuLanQiHD", "searchBrowser", "chinabrowser", "LeBrowser", "CriOS", "MQQBrowser", "DolphinBrowser", "OPiOS", "BaiduHD", "FlyFlow", "baidubrowser", "tiantian", "SwiftBrowser", "FxiOS", "FingerBrowser", "MXiOS", "MxBrowser", "LieBaoFast", "HaoWangZhiDaQuanHD", "SogouMobileBrowser", "360 Aphone Browser", "360browser", "Ydb", "Chrome", "Firefox", "OPR"], e
}();
egret.registerClass(AboutBrowser, "AboutBrowser");
var BrowserInfo = function () {
    function e() {
        this.browserKey = "unkonw", this.isAdvise = !1, this.description = "涓嶇煡鍚嶆祻瑙堝櫒", this.fullScreen = 0, this.assess = "", this.defectList = [], this.isAutoPlaySound = !0, this.isControllable = !0, this.isSmooth = !0, this.isWebgl = !0, this.isPluralSounds = !0, this.isOrientation = !0
    }

    var t = (__define, e);
    return t.prototype, e
}();
egret.registerClass(BrowserInfo, "BrowserInfo");
var ActivateRunTimes = function () {
    function e() {
        throw new Error(this.__class__ + " 鏄潤鎬佹垚鍛橀泦鎴愮被锛屾棤闇€瀹炰緥鍖�")
    }

    var t = __define, i = e;
    return i.prototype, e.start = function () {
        e.timer && (e.timer.stop(), e.timer.removeEventListener(egret.TimerEvent.TIMER, e.timerHandler, e)), e.$activateRunTime = 0, e.$lastStepTime = egret.getTimer(), e.atStart = e.$lastStepTime, e.getTimerOnStart = e.$lastStepTime, e.timer = new egret.Timer(e.delta), e.timer.addEventListener(egret.TimerEvent.TIMER, e.timerHandler, e), e.timer.start(), e.$isStartUsing = !0
    }, e.stop = function () {
        e.timer && (e.timer.stop(), e.timer.removeEventListener(egret.TimerEvent.TIMER, e.timerHandler, e)), e.$isStartUsing = !1
    }, e.addCallbackBeforeStep = function (t, i, r) {
        e.beforeFunHashMap.editPair(t, i.bind(r))
    }, e.removeCallbackBeforeStep = function (t) {
        e.beforeFunHashMap.deletePair(t)
    }, e.addCallbackAfterStep = function (t, i, r) {
        e.afterFunHashMap.editPair(t, i.bind(r))
    }, e.removeCallbackAfterStep = function (t) {
        e.afterFunHashMap.deletePair(t)
    }, e.timerHandler = function () {
        e.funArray = e.beforeFunHashMap.getObjectListCopy();
        for (var t in e.funArray) e.funArray[t].call(null);
        e.$activateRunTime += e.delta, e.$lastStepTime = egret.getTimer(), e.funArray = e.afterFunHashMap.getObjectListCopy();
        for (var i in e.funArray) e.funArray[i].call(null)
    }, t(e, "isStartUsing", function () {
        return e.$isStartUsing
    }), t(e, "activateTimes", function () {
        return e.$isStartUsing ? Math.round(e.$activateRunTime) : (trace("ActivateRunTimes.start() 鏈鍚敤"), NaN)
    }), t(e, "startedTimes", function () {
        return e.$isStartUsing ? Math.round(egret.getTimer() - e.getTimerOnStart) : (trace("ActivateRunTimes.start() 鏈鍚敤"), NaN)
    }), t(e, "deviationTotalTimes", function () {
        return e.$isStartUsing ? Math.round(e.startedTimes - e.$activateRunTime) : (trace("ActivateRunTimes.start() 鏈鍚敤"), NaN)
    }), t(e, "deviationCurrentTimes", function () {
        return e.$isStartUsing ? Math.round(egret.getTimer() - e.$lastStepTime) : (trace("ActivateRunTimes.start() 鏈鍚敤"), NaN)
    }), e.delta = 1e3 / 60, e.funArray = new Array, e.beforeFunHashMap = new HashMap, e.afterFunHashMap = new HashMap, e
}();
egret.registerClass(ActivateRunTimes, "ActivateRunTimes");
var DragonBonesDataTree = function () {
    function e() {
        throw new Error(this.__class__ + " 鏄潤鎬佹垚鍛橀泦鎴愮被锛屾棤闇€瀹炰緥鍖�")
    }

    var t = (__define, e);
    return t.prototype, e.read = function (t, i) {
        void 0 === i && (i = !1), e.detailed = i;
        var r = new egret.URLLoader;
        r.addEventListener(egret.Event.COMPLETE, e.onComplete, e), r.addEventListener(egret.IOErrorEvent.IO_ERROR, e.onError, e), r.load(new egret.URLRequest(t))
    }, e.onError = function (e) {
        trace("璇诲彇淇℃伅閿欒,璇锋鏌ラ緳楠ㄦ枃浠舵槸鍚﹀瓨鍦紝鎴栨枃浠剁殑url鏄惁姝ｇ‘")
    }, e.onComplete = function (t) {
        var i = JSON.parse(t.target.data), r = i.armature;
        trace("鏁版嵁鐗堟湰:", i.version), trace("甯ч:", i.frameRate, "fps"), trace("鏂囦欢鍚�:", i.name);
        for (var a = 0, n = 0; n < r.length; n++) r[n] && r[n].name && a++;
        if (trace("楠ㄦ灦鏁伴噺:", a), e.detailed) {
            trace("楠ㄦ灦鍚嶇О:");
            for (var s = 0; s < r.length; s++) r[s] && r[s].name && trace("    [" + s + "] " + r[s].name)
        }
        for (s = 0; s < r.length; s++) {
            trace("\n\n    " + i.name + " 鏁版嵁楠ㄦ灦鍒楄〃鑺傜偣涓嬫爣涓� [" + s + "] 鐨勯鏋跺悕绉�(data鏍硅妭鐐�.armature[" + s + "].name):", r[s].name), e.detailed && trace("\n        data鏍硅妭鐐�.armature[" + s + "] 鎷ユ湁浠ヤ笅瀛愯妭鐐瑰璞★細");
            var o, h = r[s];
            if (e.detailed) for (o in h) trace("                                " + o);
            o = "animation";
            var l = h.animation, c = "";
            trace("\n        data鏍硅妭鐐�.armature[" + s + "] 鑺傜偣鐨勯楠煎姩鐢讳俊鎭垪琛�(闀垮害涓� " + l.length + "):");
            for (var u in l) e.detailed ? Number(i.version) >= 4 ? trace("                                鍔ㄧ敾鍚嶇О(animation[" + u + "].name):" + l[u].name, "  鎬诲抚鏁�(animation[" + u + "].duration):" + (l[u].duration + 1), "  榛樿寰幆娆℃暟(animation[" + u + "].playTimes):" + (void 0 == l[u].playTimes ? 1 : l[u].playTimes), "  棰勮榛樿寰幆鑰楁椂:" + (l[u].duration / i.frameRate).toFixed(4)) : trace("                                鍔ㄧ敾鍚嶇О(animation[" + u + "].name):" + l[u].name, "  鎬诲抚鏁�(animation[" + u + "].duration):" + (l[u].duration + 1), "  榛樿寰幆娆℃暟(animation[" + u + "].loop):" + (void 0 == l[u].loop ? 1 : l[u].loop), "  棰勮榛樿寰幆鑰楁椂:" + (l[u].duration / i.frameRate).toFixed(4)) : c += "\n                                " + l[u].name;
            e.detailed || trace(c), c = "", o = "bone";
            var d, m = h.bone;
            if (h.slot && (d = h.slot.concat()), Number(i.version) < 4 && r[s].skin && r[s].skin.length && (d = r[s].skin[0].slot.concat(), r[s].skin.length > 1)) for (var p = 1; p < r[s].skin.length; p++) r[s].skin[p].slot && d.concat(r[s].skin[p].slot);
            trace("\n        data鏍硅妭鐐�.armature[" + s + "] 鑺傜偣鐨勯楠奸儴浠跺悕绉板垪琛�(闀垮害涓� " + m.length + "):");
            for (var g in m) {
                var y = "undefined";
                for (var b in d) {
                    var v = d[b];
                    if (Number(i.version) >= 4) {
                        if (v.parent && v.parent == m[g].name) {
                            y = v.name;
                            break
                        }
                    } else if (v.name == m[g].name) {
                        y = v.name;
                        break
                    }
                }
                e.detailed ? "undefined" == y ? trace("                                楠ㄩ鍚嶇О(bone[" + g + "].name):" + m[g].name, "  ------鏈粦瀹氭彃妲�------") : Number(i.version) >= 4 ? trace("                                楠ㄩ鍚嶇О(bone[" + g + "].name):" + m[g].name, "  缁戝畾鐨勬彃妲藉悕绉�(slot[" + b + "].name):" + y) : trace("                                楠ㄩ鍚嶇О(bone[" + g + "].name):" + m[g].name, "  缁戝畾鐨勬彃妲藉悕绉�(skin[0].slot[" + b + "].name):" + y) : c += "\n                                " + m[g].name
            }
            if (e.detailed || trace(c), e.detailed) {
                var f = h.skin;
                trace("\n        data鏍硅妭鐐�.armature[" + s + "] 鑺傜偣鐨勭毊鑲や俊鎭垪琛�(闀垮害涓� " + f.length + "):");
                for (var p = 0; p < f.length; p++) {
                    var d = f[p].slot;
                    trace("\n            涓嬫爣涓� [" + p + "] 鐨勭毊鑲ゅ悕绉�(skin[" + p + "].name):" + f[p].name + " , 鎻掓Ы淇℃伅鍒楄〃(闀垮害涓�" + d.length + "): ");
                    for (var b in d) {
                        var C = "", A = d[b].display;
                        for (var E in A) C += "   " + A[E].name;
                        var S = "";
                        A.length > 1 && (S = "(" + A.length + "涓�)"), trace(A.length > 0 ? "                                鎻掓Ы鍚嶇О (skin[" + p + "].slot[" + b + "].name):" + d[b].name + "    宓屽叆鐨勫浘鍍忓垪琛�(skin[" + p + "].slot[" + b + "].display)娓呭崟" + S + ":  " + C : "                                鎻掓Ы鍚嶇О (skin[" + p + "].slot[" + b + "].name):" + d[b].name + "    ------鏈祵鍏ュ浘鍍�------")
                    }
                }
            }
            trace("\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"), trace("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
        }
    }, e
}();
egret.registerClass(DragonBonesDataTree, "DragonBonesDataTree");
var FrameDelayCaller = function () {
    function e() {
        throw new Error(this.__class__ + " 鏄潤鎬佹垚鍛橀泦鎴愮被锛屾棤闇€瀹炰緥鍖�")
    }

    var t = __define, i = e;
    return i.prototype, e.addCallerOnce = function (t, i, r, a) {
        for (var n = [], s = 4; s < arguments.length; s++) n[s - 4] = arguments[s];
        return e.addCallerRepeat.apply(e, [t, i, r, a, 1].concat(n))
    }, e.addCallerRepeat = function (t, i, r, a, n) {
        void 0 === n && (n = 0);
        for (var s = [], o = 5; o < arguments.length; o++) s[o - 5] = arguments[o];
        if (1 > a && (a = 1, trace("鎻愮ず锛氶棿闅斿抚鏁癷ntervalFrames 涓嶅簲璇ュ皬浜�1")), null == i) throw new Error("閿欒锛氭彁渚涚粰 FrameDelayCaller 鐨勫洖璋冨嚱鏁颁笉鑳戒负null");
        var h;
        e.objKeyFromCallerHash.getObject(t) ? h = e.objKeyFromCallerHash.getObject(t) : (e.$objID++, h = "objKey" + e.$objID, e.objKeyFromCallerHash.editPair(t, h)), e.idArrFromObjKey[h] || (e.idArrFromObjKey[h] = new Array), e.$useAbleID++;
        var l = new egret.Shape, c = "runnerKey" + e.$useAbleID;
        e.runnerKeyFromRunnerHash.editPair(l, c), e.idFromRunnerKey[c] = e.$useAbleID, e.functionFromID[e.$useAbleID] = i.bind(r), e.runnerFromID[e.$useAbleID] = l, e.currentFramesFromID[e.$useAbleID] = 0, e.intervalFramesFromID[e.$useAbleID] = Math.floor(a), e.currentRepeatsFromID[e.$useAbleID] = 0, e.totalRepeatsFromID[e.$useAbleID] = n, e.paramsFromID[e.$useAbleID] = s, e.isPauseFromID[e.$useAbleID] = "run", e.objKeyFromID[e.$useAbleID] = h;
        var u = e.idArrFromObjKey[h];
        return u.push(e.$useAbleID), l.addEventListener(egret.Event.ENTER_FRAME, e.frameHandler, e), e.$useAbleID
    }, e.frameHandler = function (t) {
        var i = t.currentTarget, r = e.runnerKeyFromRunnerHash.getObject(i), a = e.idFromRunnerKey[r];
        if ("pause" != e.isPauseFromID[a] && (e.currentFramesFromID[a]++, !(e.currentFramesFromID[a] < e.intervalFramesFromID[a]))) {
            e.currentFramesFromID[a] = 0, e.currentRepeatsFromID[a]++, e.$currentID = a, e.$currentRepeats = e.currentRepeatsFromID[a];
            var n = e.functionFromID[a], s = e.paramsFromID[a];
            n.apply(null, s), e.currentRepeatsFromID[a] >= e.totalRepeatsFromID[a] && e.totalRepeatsFromID[a] > 0 && e.clearCallerByID(a), e.$currentID = NaN, e.$currentRepeats = NaN
        }
    }, e.clearCallerByID = function (t) {
        var i = t;
        if (e.runnerFromID[i]) {
            var r = e.runnerFromID[i], a = e.runnerKeyFromRunnerHash.getObject(r), n = e.objKeyFromID[i];
            delete e.idFromRunnerKey[a], delete e.runnerFromID[i], delete e.functionFromID[i], delete e.paramsFromID[i], delete e.currentFramesFromID[i], delete e.intervalFramesFromID[i], delete e.currentRepeatsFromID[i], delete e.totalRepeatsFromID[i], delete e.isPauseFromID[i], delete e.objKeyFromID[i];
            var s = e.idArrFromObjKey[n], o = s.indexOf(i);
            s.splice(o, 1), 0 == s.length && (e.objKeyFromCallerHash.reverseDeletePair(n), delete e.idArrFromObjKey[n]), e.runnerKeyFromRunnerHash.deletePair(r), r.removeEventListener(egret.Event.ENTER_FRAME, e.frameHandler, e)
        }
    }, e.clearCallerAt = function (t) {
        if (e.objKeyFromCallerHash.getObject(t)) {
            var i = e.objKeyFromCallerHash.getObject(t), r = e.idArrFromObjKey[i], a = r.concat();
            for (var n in a) e.clearCallerByID(a[n])
        }
    }, e.clearAllCallers = function () {
        for (var t in e.idFromRunnerKey) e.clearCallerByID(e.idFromRunnerKey[t]);
        e.$useAbleID = 0, e.$objID = 0
    }, e.isPause = function (t) {
        var i = t;
        return !!e.runnerFromID[i] && "pause" == e.isPauseFromID[i]
    }, e.pauseCallerByID = function (t) {
        var i = t;
        if (e.runnerFromID[i] && !e.isPause(t)) {
            var r = e.runnerFromID[i];
            r.removeEventListener(egret.Event.ENTER_FRAME, e.frameHandler, e), e.isPauseFromID[i] = "pause"
        }
    }, e.pauseCallerAt = function (t) {
        if (e.objKeyFromCallerHash.getObject(t)) {
            var i = e.objKeyFromCallerHash.getObject(t), r = e.idArrFromObjKey[i], a = r.concat();
            for (var n in a) e.pauseCallerByID(a[n])
        }
    }, e.pauseAllCallers = function () {
        for (var t in e.idFromRunnerKey) e.pauseCallerByID(e.idFromRunnerKey[t])
    }, e.resumeCallerByID = function (t) {
        var i = t;
        if (e.runnerFromID[i] && e.isPause(t)) {
            var r = e.runnerFromID[i];
            r.addEventListener(egret.Event.ENTER_FRAME, e.frameHandler, e), e.isPauseFromID[i] = "run"
        }
    }, e.resumeCallerAt = function (t) {
        if (e.objKeyFromCallerHash.getObject(t)) {
            var i = e.objKeyFromCallerHash.getObject(t), r = e.idArrFromObjKey[i], a = r.concat();
            for (var n in a) e.resumeCallerByID(a[n])
        }
    }, e.resumeAllCallers = function () {
        for (var t in e.idFromRunnerKey) e.resumeCallerByID(e.idFromRunnerKey[t])
    }, e.getCurrentID = function () {
        return isNaN(e.$currentID) ? NaN : e.$currentID
    }, e.getCurrentRepeats = function () {
        return isNaN(e.$currentRepeats) ? NaN : e.$currentRepeats
    }, t(e, "delayCallerList", function () {
        var t = e.objKeyFromCallerHash.getKeyListCopy();
        return t ? 0 == t.length ? null : t : null
    }), t(e, "callerIDList", function () {
        var t = new Array;
        if (e.idFromRunnerKey) for (var i in e.idFromRunnerKey) t.push(e.idFromRunnerKey[i]);
        return 0 == t.length ? null : t
    }), e.runnerFromID = new Object, e.idFromRunnerKey = new Object, e.currentFramesFromID = new Object, e.intervalFramesFromID = new Object, e.functionFromID = new Object, e.paramsFromID = new Object, e.currentRepeatsFromID = new Object, e.totalRepeatsFromID = new Object, e.idArrFromObjKey = new Object, e.isPauseFromID = new Object, e.objKeyFromID = new Object, e.$useAbleID = 0, e.runnerKeyFromRunnerHash = new HashMap, e.$objID = 0, e.objKeyFromCallerHash = new HashMap, e
}();
egret.registerClass(FrameDelayCaller, "FrameDelayCaller");
var GetNumChildrenTotal = function () {
    function e() {
    }

    var t = (__define, e);
    return t.prototype, e.getTotalAt = function (t) {
        return e.count = 0, e.getNumChildrenTotal(t), e.count
    }, e.getListAt = function (t) {
        e.lastDisplayObjectArray = e.currentDisplayObjectArray, e.currentDisplayObjectArray = new Array, e.getNumChildrenList(t), e.addedDisplayObjectArray = new Array, e.removedDisplayObjectArray = new Array;
        for (var i in e.currentDisplayObjectArray) -1 == e.lastDisplayObjectArray.indexOf(e.currentDisplayObjectArray[i]) && e.addedDisplayObjectArray.push(e.currentDisplayObjectArray[i]);
        for (i in e.lastDisplayObjectArray) -1 == e.currentDisplayObjectArray.indexOf(e.lastDisplayObjectArray[i]) && e.removedDisplayObjectArray.push(e.lastDisplayObjectArray[i]);
        var r = [e.currentDisplayObjectArray, e.addedDisplayObjectArray, e.removedDisplayObjectArray];
        return r
    }, e.getNumChildrenTotal = function (t) {
        e.count += t.numChildren;
        for (var i = 0; i < t.numChildren; i++) egret.is(t.getChildAt(i), "egret.DisplayObjectContainer") && e.getNumChildrenTotal.call(null, t.getChildAt(i))
    }, e.getNumChildrenList = function (t) {
        for (var i = 0; i < t.numChildren; i++) e.currentDisplayObjectArray.push(t.getChildAt(i)), egret.is(t.getChildAt(i), "egret.DisplayObjectContainer") && e.getNumChildrenList.call(null, t.getChildAt(i))
    }, e.currentDisplayObjectArray = new Array, e
}();
egret.registerClass(GetNumChildrenTotal, "GetNumChildrenTotal");
var popupAble = !0, TimerDelayCaller = function () {
    function e() {
        throw new Error(this.__class__ + " 鏄潤鎬佹垚鍛橀泦鎴愮被锛屾棤闇€瀹炰緥鍖�")
    }

    var t = __define, i = e;
    return i.prototype, e.addCallerOnce = function (t, i, r, a) {
        for (var n = [], s = 4; s < arguments.length; s++) n[s - 4] = arguments[s];
        return e.addCallerRepeat.apply(e, [t, i, r, a, 1].concat(n))
    }, e.addCallerRepeat = function (t, i, r, a, n) {
        void 0 === n && (n = 0);
        for (var s = [], o = 5; o < arguments.length; o++) s[o - 5] = arguments[o];
        if (0 > n) throw new Error("鍙傛暟 repeatCount 涓嶈兘灏忎簬0");
        e.$useAbleID++;
        var h = new egret.Timer(a);
        if (h.addEventListener(egret.TimerEvent.TIMER, e.timerHandler, e), !e.idVectorFromDelayCallerHash.getObject(t)) {
            var l = new Array;
            e.idVectorFromDelayCallerHash.editPair(t, l)
        }
        return e.idVectorFromDelayCallerHash.getObject(t).push(e.$useAbleID), e.idFromTimerHash.editPair(h, e.$useAbleID), e.delayCallerFromID[e.$useAbleID] = t, e.totalRunTimesFromID[e.$useAbleID] = n, e.currentRunTimesFromID[e.$useAbleID] = 0, e.timerFromID[e.$useAbleID] = h, e.functionFromID[e.$useAbleID] = i.bind(r), e.paramsFromID[e.$useAbleID] = s, e.defaultDelayFromID[e.$useAbleID] = a, ActivateRunTimes.isStartUsing ? e.startTimeFromID[e.$useAbleID] = ActivateRunTimes.activateTimes : e.startTimeFromID[e.$useAbleID] = egret.getTimer(), e.passTimeFromID[e.$useAbleID] = 0, h.start(), e.$useAbleID
    }, e.timerHandler = function (t) {
        var i, r = t.currentTarget, a = e.idFromTimerHash.getObject(r), n = e.functionFromID[a], s = e.paramsFromID[a];
        if (e.currentRunTimesFromID[a]++, e.currentRunTimesFromID[a] >= e.totalRunTimesFromID[a] && 0 != e.totalRunTimesFromID[a]) {
            if (e.delayCallerFromID[a]) {
                i = e.delayCallerFromID[a];
                var o = e.idVectorFromDelayCallerHash.getObject(i), h = o.indexOf(a);
                o.splice(h, 1), 0 == o.length && e.idVectorFromDelayCallerHash.deletePair(i)
            }
            e.idFromTimerHash.deletePair(r), delete e.delayCallerFromID[a], delete e.timerFromID[a], delete e.currentRunTimesFromID[a], delete e.totalRunTimesFromID[a], delete e.functionFromID[a], delete e.paramsFromID[a], delete e.startTimeFromID[a], delete e.passTimeFromID[a], delete e.defaultDelayFromID[a], r.removeEventListener(egret.TimerEvent.TIMER, e.timerHandler, e), r.stop()
        } else r.delay != e.defaultDelayFromID[a] && (r.stop(), r.delay = e.defaultDelayFromID[a], r.start());
        n.apply(null, s)
    }, e.clearCallerByID = function (t) {
        if (e.timerFromID[t]) {
            var i = e.timerFromID[t];
            if (e.delayCallerFromID[t]) {
                var r = e.delayCallerFromID[t], a = e.idVectorFromDelayCallerHash.getObject(r);
                if (a) {
                    var n = a.indexOf(t);
                    a.splice(n, 1), e.idVectorFromDelayCallerHash.editPair(r, a), 0 == a.length && e.idVectorFromDelayCallerHash.deletePair(r)
                }
            }
            e.idFromTimerHash.deletePair(i), delete e.delayCallerFromID[t], delete e.timerFromID[t], delete e.currentRunTimesFromID[t], delete e.totalRunTimesFromID[t], delete e.functionFromID[t], delete e.paramsFromID[t], delete e.startTimeFromID[t], delete e.passTimeFromID[t], delete e.defaultDelayFromID[t], i.removeEventListener(egret.TimerEvent.TIMER, e.timerHandler, e), i.stop()
        }
    }, e.pauseCallerByID = function (t) {
        if (e.timerFromID[t]) {
            var i = e.timerFromID[t];
            i.running && (ActivateRunTimes.isStartUsing ? e.passTimeFromID[t] = ActivateRunTimes.activateTimes - e.startTimeFromID[t] : trace("ActivateRunTimes.start() 鏈鍚敤锛屾棤娉曡绠椾腑缁ф椂闂�"), i.stop())
        }
    }, e.resumeCallerByID = function (t, i) {
        if (void 0 === i && (i = !0), e.timerFromID[t]) {
            var r = e.timerFromID[t];
            r.running || (i && (ActivateRunTimes.isStartUsing ? r.delay > e.passTimeFromID[t] ? r.delay -= e.passTimeFromID[t] : r.delay = 0 : trace("ActivateRunTimes.start() 鏈鍚敤锛屾棤娉曡绠椾腑缁ф椂闂�")), e.startTimeFromID[t] = ActivateRunTimes.activateTimes, r.start())
        }
    }, e.clearCallerAt = function (t) {
        if (e.idVectorFromDelayCallerHash.getObject(t)) {
            var i = e.idVectorFromDelayCallerHash.getObject(t).concat();
            for (var r in i) e.clearCallerByID(i[r])
        }
    }, e.pauseCallerAt = function (t) {
        if (e.idVectorFromDelayCallerHash.getObject(t)) {
            var i = e.idVectorFromDelayCallerHash.getObject(t);
            for (var r in i) e.pauseCallerByID(i[r])
        }
    }, e.resumeCallerAt = function (t, i) {
        if (void 0 === i && (i = !0), e.idVectorFromDelayCallerHash.getObject(t)) {
            var r = e.idVectorFromDelayCallerHash.getObject(t);
            for (var a in r) e.resumeCallerByID(r[a], i)
        }
    }, e.clearAllCallers = function () {
        var t = e.idFromTimerHash.getObjectListCopy();
        for (var i in t) e.clearCallerByID(t[i]);
        e.$useAbleID = 0
    }, e.pauseAllCallers = function () {
        var t = e.idFromTimerHash.getObjectListCopy();
        for (var i in t) e.pauseCallerByID(t[i])
    }, e.resumeAllCallers = function (t) {
        void 0 === t && (t = !0);
        var i = e.idFromTimerHash.getObjectListCopy();
        for (var r in i) e.resumeCallerByID(i[r], t)
    }, e.hasDelayCaller = function (t) {
        for (var i in e.delayCallerFromID) if (e.delayCallerFromID[i] == t) return !0;
        return !1
    }, t(e, "delayCallerList", function () {
        var t = new Array;
        for (var i in e.delayCallerFromID) t.push(e.delayCallerFromID[i]);
        return 0 == t.length ? null : t
    }), t(e, "callerIDList", function () {
        var t = e.idFromTimerHash.getObjectListCopy();
        return 0 == t.length ? null : t
    }), e.idVectorFromDelayCallerHash = new HashMap, e.idFromTimerHash = new HashMap, e.delayCallerFromID = new Object, e.timerFromID = new Object, e.functionFromID = new Object, e.totalRunTimesFromID = new Object, e.currentRunTimesFromID = new Object, e.paramsFromID = new Object, e.startTimeFromID = new Object, e.passTimeFromID = new Object, e.defaultDelayFromID = new Object, e.$useAbleID = 0, e
}();
egret.registerClass(TimerDelayCaller, "TimerDelayCaller");
var traceAble = !0, localData;
!function (e) {
    var t = function () {
        function e() {
            this.current = new Current, this.next = new Next
        }

        var t = (__define, e);
        return t.prototype, e
    }();
    e.DataValueObject = t, egret.registerClass(t, "localData.DataValueObject")
}(localData || (localData = {}));
var Current = function () {
    function e() {
    }

    var t = __define, i = e, r = i.prototype;
    return t(r, "awardNumbers", function () {
        return this.$awardNumbers
    }, function (e) {
        this.$awardNumbers = e
    }), e
}();
egret.registerClass(Current, "Current");
var Next = function () {
    function e() {
    }

    var t = (__define, e);
    return t.prototype, e
}();
egret.registerClass(Next, "Next");
var localData;
!function (e) {
    var t = function () {
        function t() {
            throw new Error(this.__class__ + " 鏄潤鎬佹垚鍛橀泦鎴愮被锛屾棤闇€瀹炰緥鍖�")
        }

        var i = (__define, t);
        return i.prototype, t.data = new e.DataValueObject, t.boatData = [[600, 550, 1], [600, 500, .91], [600, 460, .84], [600, 425, .8], [600, 390, .76], [600, 365, .73], [600, 342, .7], [600, 322, .67], [600, 305, .65], [600, 290, .63]], t.rankPosition = [910, 840, 770, 700, 630, 560, 490, 420, 350, 280], t
    }();
    e.Cache = t, egret.registerClass(t, "localData.Cache")
}(localData || (localData = {}));
var localData;
!function (e) {
    var t = function () {
        function e() {
        }

        var t = (__define, e);
        return t.prototype, e.awardStatus = 0, e.takeSpaceCount = 0, e
    }();
    e.CommonVariable = t, egret.registerClass(t, "localData.CommonVariable")
}(localData || (localData = {}));
var Bitmap = egret.Bitmap, TextField = egret.TextField, DisplayObjectContainer = egret.DisplayObjectContainer,
    Sprite = egret.Sprite, CommonVariable = localData.CommonVariable, SoundMusicManager = esm.SoundMusicManager,
    SoundEffectManager = esm.SoundEffectManager, GameApplication = function (e) {
        function t() {
            if (e.call(this), this.versionDate = 201606281757, this.loadedCount = 0, AboutBrowser.info.isWebgl || ("iOS" == egret.Capabilities.os ? popup("鏈棰戦渶瑕佸惎鍔╓ebGL娓叉煋鍔犻€熷紩鎿庛€傚鏋滄挱鏀捐棰戞椂鍑虹幇鍗￠】銆佸欢杩熴€侀檷甯с€佺牬鍥剧瓑鐜拌薄锛屽缓璁偍鏇存崲鍏朵粬(濡係afari銆丆hrome銆丗irefox绛�)IOS娴忚鍣ㄣ€�") : "Android" == egret.Capabilities.os && popup("鏈棰戦渶瑕佸惎鍔╓ebGL娓叉煋鍔犻€熷紩鎿庯紝鑰屾偍褰撳墠鎵€浣跨敤鐨勬祻瑙堝櫒鍙兘涓嶆敮鎸佹鍔熻兘銆俓n濡傛灉鍑虹幇鍗￠】銆佸欢杩熴€侀檷甯с€佺牬鍥剧瓑鐜拌薄锛屽缓璁偍鏇存崲鍏朵粬(濡俀Q銆�360銆佺櫨搴︾瓑)娴忚鍣ㄣ€�")), AboutBrowser.info.isOrientation || popup("鎮ㄧ殑娴忚鍣ㄥ彲鑳戒笉鏀寔閲嶅姏鎰熷簲锛屾棤娉曞疄鐜拌浆灞忔晥鏋溿€傚缓璁偍鏇存崲鍏朵粬娴忚鍣�"), this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this), "iOS" == egret.Capabilities.os) {
                var t = document.createElement("img");
                document.body.appendChild(t), this.setWindowTop(), this.setTopID = egret.setInterval(this.setWindowTop, this, 500), document.documentElement.style.overflowY = "hidden"
            }
            this.subscribe(SubjectTypes.LINK_FAULT, this.onFault)
        }

        __extends(t, e);
        var i = (__define, t), r = i.prototype;
        return r.subscribe = function (e, t, i) {
            void 0 === i && (i = this), ConcreteSubject.addObserver(this, e, t, i)
        }, r.unsubscribe = function (e) {
            void 0 === e && (e = null), ConcreteSubject.removeObserver(this, e)
        }, r.onFault = function () {
            ConcreteSubject.notify(SubjectTypes.OVER_TIME), FrameDelayCaller.clearAllCallers(), TimerDelayCaller.clearAllCallers(), esm.SoundMusicManager.isOpen = !1, esm.SoundEffectManager.isOpen = !1, egret.Tween.removeAllTweens(), clearInterval(this.timeID), ActivateRunTimes.stop();
            var e = new Bitmap;
            e.texture = RES.getRes("gameLinkFault_png"), this.debugInfoLayer.addChild(e)
        }, r.setWindowTop = function () {
            window.scrollTo(0, 0)
        }, r.traceTime = function () {
            trace(ActivateRunTimes.activateTimes, egret.getTimer())
        }, r.onAddToStage = function (e) {
            !egret.Capabilities.isMobile, egret.Capabilities.isMobile && (window.onresize = function () {
                this.onResize()
            }.bind(this), this.onResize()), this.stage.dirtyRegionPolicy = egret.DirtyRegionPolicy.OFF, this.debugInfoLayer = new egret.Sprite, this.globalEffectLayer = new egret.Sprite, this.versionLayer = new egret.Sprite, this.loadingLayer = new egret.Sprite, this.infoLayer = new egret.Sprite, this.localEffectLayer = new egret.Sprite, this.gameLayer = new egret.Sprite, this.addChild(this.gameLayer), this.addChild(this.localEffectLayer), this.addChild(this.infoLayer), this.addChild(this.loadingLayer), this.addChild(this.versionLayer), this.addChild(this.debugInfoLayer), RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this), InitConfig.isShowVersion && (this.version_txt = new egret.TextField, this.version_txt.bold = !0, this.version_txt.text = "ver." + this.versionDate, this.version_txt.size = 16, this.version_txt.y = this.stage.stageHeight - 20, this.versionLayer.addChild(this.version_txt)), this.subscribe(SubjectTypes.DYNAMIC_COMPLETE, this.onDymamicAssect), connect.NetworkConnector.connectToURL(InitConfig.res_path + "dynamic/dynamic.json", this.getDynamicJson, this)
        }, r.getDynamicJson = function (e) {
            if (e == connect.NetworkConnector.CONNECT_FAULT) this.onDymamicAssect(); else {
                var t = JSON.parse(e);
                dataReq.DynamicLoader.load(t)
            }
        }, r.onDymamicAssect = function () {
            this.unsubscribe(SubjectTypes.DYNAMIC_COMPLETE), RES.loadConfig(InitConfig.res_path + "resource/defaultRes.json", InitConfig.res_path + "resource/")
        }, r.onResize = function () {
            window.innerWidth < window.innerHeight ? this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL : this.stage.scaleMode = egret.StageScaleMode.EXACT_FIT
        }, r.onConfigComplete = function (e) {
            RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this), RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this), RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this), RES.loadGroup("loadingUI")
        }, r.onResourceLoadComplete = function (e) {
            "loadingUI" == e.groupName ? (this.loadingView = new LoadingUI, this.loadingLayer.addChild(this.loadingView), document.getElementById("preloading").style.display = "none", RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this), this.preLoadList = ["gameUI"], RES.loadGroup(this.preLoadList.shift())) : this.preLoadList.length > 0 ? RES.loadGroup(this.preLoadList.shift()) : 0 == this.preLoadList.length && (RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this), RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this), RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this), TimerDelayCaller.addCallerOnce(null, this.createGameScene, this, 200))
        }, r.onResourceLoadError = function (e) {
            console.warn("Group:" + e.groupName + " has failed to load"), this.onResourceLoadComplete(e)
        }, r.onResourceProgress = function (e) {
            "loadingUI" != e.groupName && this.loadingView.setProgress(e.itemsLoaded, e.itemsTotal)
        }, r.createGameScene = function () {
            "iOS" == egret.Capabilities.os && (SoundMusicManager.isOpen = !1, SoundEffectManager.isOpen = !1), SoundEffectManager.registerSound(SoundNames.BGM_GAME, RES.getRes("BackGroundMusic_mp3"), .5), SoundEffectManager.registerSound(SoundNames.SECONDS, RES.getRes("Second_mp3"), .5), SoundEffectManager.registerSound(SoundNames.LAST_SECONDS, RES.getRes("LastSecond_mp3"), .5), SoundEffectManager.registerSound(SoundNames.RUNNING, RES.getRes("Running_mp3"), .5), SoundEffectManager.registerSound(SoundNames.CHEER, RES.getRes("Cheer_mp3"), .5), SoundEffectManager.registerSound(SoundNames.RANK, RES.getRes("Rank_mp3"), .5), this.stage.addEventListener("enterGame", this.enterGame, this), this.viewMediator = new gameModule.ViewMediator(this.infoLayer, this.localEffectLayer, this.gameLayer), ActivateRunTimes.start(), ActivateRunTimes.addCallbackBeforeStep("timeoutCheaking", this.deviationHandler, this)
        }, r.deviationHandler = function () {
            if (ActivateRunTimes.deviationCurrentTimes > 3e3) {
                for (trace("绛夊緟瓒呮椂,鑷姩閲嶆柊杞藉叆"), SoundEffectManager.stopAllSound(), this.loadingLayer.addChild(this.loadingView), this.loadingView.replay(), ConcreteSubject.notify(SubjectTypes.OVER_TIME), FrameDelayCaller.clearAllCallers(), TimerDelayCaller.clearAllCallers(), egret.Tween.removeAllTweens(), clearInterval(this.timeID), ActivateRunTimes.stop(), CommonVariable.isSimulating = !1, CommonVariable.awardStatus = 0; this.globalEffectLayer.numChildren > 0;) this.globalEffectLayer.removeChildAt(0);
                this.stage.removeEventListener("enterGame", this.enterGame, this), this.gameRestart(), this.onResize()
            }
        }, r.gameRestart = function () {
            ActivateRunTimes.start(), this.stage.addEventListener("enterGame", this.enterGame, this), FrameDelayCaller.addCallerOnce(null, this.viewMediator.reStart, this.viewMediator, 30)
        }, r.enterGame = function (e) {
            this.stage.removeEventListener("enterGame", this.enterGame, this), TimerDelayCaller.addCallerOnce(null, this.loadingLayer.removeChild, this.loadingLayer, 50, this.loadingView)
        }, t
    }(egret.DisplayObjectContainer);
egret.registerClass(GameApplication, "GameApplication", ["IObserver"]);
var LoadingUI = function (e) {
    function t() {
        e.call(this), this.bg1 = new Bitmap, this.bg2 = new Bitmap, this.bg3 = new Bitmap, this.bg4 = new Bitmap, this.bar = new Bitmap, this.bar_over = new Bitmap, this.bfh = new Bitmap, this.createView()
    }

    __extends(t, e);
    var i = (__define, t), r = i.prototype;
    return r.createView = function () {
        this.bg1.texture = RES.getRes("loadingBG1_jpg"), this.bg2.texture = RES.getRes("loadingBG2_png"), this.bg3.texture = RES.getRes("loadingBG3_jpg"), this.bg4.texture = RES.getRes("loadingBG4_jpg"), this.bar.texture = RES.getRes("loadingBar_png"), this.bfh.texture = RES.getRes("BaiFenHao_png"), this.addChild(this.bg4), this.addChild(this.bar), this.addChild(this.bg1), this.addChild(this.bg2), this.addChild(this.bg3), this.bg1.scaleX = this.bg1.scaleY = 1 / .7, this.bg2.scaleX = this.bg2.scaleY = 1 / .7, this.bg3.scaleX = this.bg3.scaleY = 1 / .7, this.bg4.scaleX = this.bg4.scaleY = 1 / .7, this.bar.scaleX = this.bar.scaleY = 1 / .7, this.bg2.y = this.bg1.height * this.bg1.scaleY, this.bg3.y = this.bg2.y + this.bg2.height * this.bg2.scaleY, this.bg4.x = 248, this.bg4.y = 509, this.addChild(this.bfh), this.bfh.x = 500, this.bfh.y = 485, this.bar.x = 250 - this.bar.width * this.bar.scaleX, this.bar.y = 511, this.bar_over.x = 0, this.bar_over.y = 458, this.num_b = new disDev.AnimationLite(1, "loadingNum", 1, 3, 1, (!1)), this.num_s = new disDev.AnimationLite(10, "loadingNum", 0, 3, 1, (!1)), this.num_g = new disDev.AnimationLite(10, "loadingNum", 0, 3, 1, (!1)), this.num_b.x = 459, this.num_s.x = 470, this.num_g.x = 485, this.num_b.y = this.num_s.y = this.num_g.y = 485, this.addChild(this.num_b), this.addChild(this.num_s), this.addChild(this.num_g), this.num_b.visible = !1, this.num_s.visible = !1;
        for (var e in dataReq.DynamicLoader.loadingAssets) {
            var t = dataReq.DynamicLoader.object[dataReq.DynamicLoader.loadingAssets[e]];
            t && this.addChild(t)
        }
    }, r.setProgress = function (e, t) {
        for (var i = Math.ceil(100 * e / t), r = i.toString(); r.length < 3;) r = 0 + r;
        i >= 10 && (this.num_s.visible = !0), i >= 100 && (i = 100, this.num_b.visible = !0, this.num_b.gotoAndStop(1), this.num_g.gotoAndStop(1));
        var a = Number(r.substr(1, 1)), n = Number(r.substr(2, 1));
        this.num_s.gotoAndStop(a + 1), this.num_g.gotoAndStop(n + 1), this.bar.x = 251 - this.bar.width * this.bar.scaleX * (1 - e / t)
    }, r.replay = function () {
    }, t
}(egret.Sprite);
egret.registerClass(LoadingUI, "LoadingUI");
var bones;
!function (e) {
    var t = function () {
        function e() {
            if (!e.dragonbonesFactory) {
                var t = RES.getRes("waterAnimation_json"), i = RES.getRes("watertexture_json"),
                    r = RES.getRes("watertexture_png");
                e.dragonbonesFactory = new dragonBones.EgretFactory, e.dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(t)), e.dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(r, i))
            }
            var a = e.dragonbonesFactory, n = a.buildArmature("Armature");
            this.armature = n, !e.anmcm, n.animation.gotoAndPlay("await", -1), dragonBones.WorldClock.clock.add(n)
        }

        var t = (__define, e);
        return t.prototype, e
    }();
    e.DragonBonesArmatureWater = t, egret.registerClass(t, "bones.DragonBonesArmatureWater")
}(bones || (bones = {}));
var bones;
!function (e) {
    var t = function () {
        function e() {
            if (!e.dragonbonesFactory) {
                var t = RES.getRes("boatPlayer_json"), i = RES.getRes("boatPlayerTexture_json"),
                    r = RES.getRes("boatPlayerTexture_png");
                e.dragonbonesFactory = new dragonBones.EgretFactory, e.dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(t)), e.dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(r, i))
            }
            var a = e.dragonbonesFactory;
            this.armature = a.buildArmature("Armature"), dragonBones.WorldClock.clock.add(this.armature)
        }

        var t = (__define, e);
        return t.prototype, e
    }();
    e.DragonBonesBoatPlayer = t, egret.registerClass(t, "bones.DragonBonesBoatPlayer")
}(bones || (bones = {}));
var bones;
!function (e) {
    var t = function () {
        function e() {
            if (!e.dragonbonesFactory) {
                var t = RES.getRes("clock_json"), i = RES.getRes("clocktexture_json"),
                    r = RES.getRes("clocktexture_png");
                e.dragonbonesFactory = new dragonBones.EgretFactory, e.dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(t)), e.dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(r, i))
            }
            var a = e.dragonbonesFactory;
            this.armature = a.buildArmature("Armature"), dragonBones.WorldClock.clock.add(this.armature)
        }

        var t = (__define, e);
        return t.prototype, e
    }();
    e.DragonBonesClock = t, egret.registerClass(t, "bones.DragonBonesClock")
}(bones || (bones = {}));
var bones;
!function (e) {
    var t = function () {
        function e() {
            if (!e.dragonbonesFactory) {
                var t = RES.getRes("seaMovie_json"), i = RES.getRes("seaMovietexture_json"),
                    r = RES.getRes("seaMovietexture_png");
                e.dragonbonesFactory = new dragonBones.EgretFactory, e.dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(t)), e.dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(r, i))
            }
            var a = e.dragonbonesFactory;
            this.armature = a.buildFastArmature("Armature"), e.anmcm ? (e.anmcm.bindCacheUserArmature(this.armature), this.armature.enableCache = !0) : e.anmcm = this.armature.enableAnimationCache(60, null, !0), dragonBones.WorldClock.clock.add(this.armature)
        }

        var t = (__define, e);
        return t.prototype, e
    }();
    e.DragonBonesSea = t, egret.registerClass(t, "bones.DragonBonesSea")
}(bones || (bones = {}));
var bones;
!function (e) {
    var t = function () {
        function e() {
            if (!e.dragonbonesFactory) {
                var t = RES.getRes("ship1_json"), i = RES.getRes("ship1texture_json"),
                    r = RES.getRes("ship1texture_png");
                e.dragonbonesFactory = new dragonBones.EgretFactory, e.dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(t)), e.dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(r, i))
            }
            var a = e.dragonbonesFactory;
            this.armature = a.buildArmature("Armature"), this.armature.display.anchorOffsetX = 322, this.armature.display.anchorOffsetY = 90, dragonBones.WorldClock.clock.add(this.armature)
        }

        var t = (__define, e), i = t.prototype;
        return i.destroy = function () {
            dragonBones.WorldClock.clock.remove(this.armature), this.armature.dispose(), this.armature.display && this.armature.display.parent && this.armature.display.parent.removeChild(this.armature.display)
        }, e
    }();
    e.DragonBonesShip1 = t, egret.registerClass(t, "bones.DragonBonesShip1")
}(bones || (bones = {}));
var bones;
!function (e) {
    var t = function () {
        function e() {
            if (!e.dragonbonesFactory) {
                var t = RES.getRes("ship2_json"), i = RES.getRes("ship2texture_json"),
                    r = RES.getRes("ship2texture_png");
                e.dragonbonesFactory = new dragonBones.EgretFactory, e.dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(t)), e.dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(r, i))
            }
            var a = e.dragonbonesFactory;
            this.armature = a.buildArmature("Armature"), this.armature.display.anchorOffsetX = 88, this.armature.display.anchorOffsetY = 90, dragonBones.WorldClock.clock.add(this.armature)
        }

        var t = (__define, e), i = t.prototype;
        return i.destroy = function () {
            dragonBones.WorldClock.clock.remove(this.armature), this.armature.dispose(), this.armature.display && this.armature.display.parent && this.armature.display.parent.removeChild(this.armature.display)
        }, e
    }();
    e.DragonBonesShip2 = t, egret.registerClass(t, "bones.DragonBonesShip2")
}(bones || (bones = {}));
var dataReq;
!function (e) {
    var t = function () {
        function e() {
            throw new Error(e.__class__ + " 鏄潤鎬佹柟娉曢泦鎴愮被锛屼笉闇€瑕佸疄渚嬪寲")
        }

        var t = (__define, e);
        return t.prototype, e.getData = function () {
            var t = InitConfig.req_host;
            "" == t ? InitConfig.isRelease ? connect.NetworkConnector.connectToURL("getdata.php?t=" + Math.random(), e.onGetData, e) : connect.NetworkConnector.connectToURL("/icpapi/GetMShiPinInfo?lotteryid=4", e.onGetData, e) : connect.NetworkConnector.connectToURL("getdata.php?t=" + Math.random(), e.onGetData, e)
        }, e.onGetData = function (t) {
            if (t == connect.NetworkConnector.CONNECT_FAULT) return void(e.dataRequestTimes < 10 ? (egret.setTimeout(e.getData, e, 500), e.dataRequestTimes++, trace("reconnect  " + e.dataRequestTimes)) : (ConcreteSubject.notify(SubjectTypes.LINK_FAULT), trace("澶氭璁块棶鏈嶅姟鍣ㄥけ璐ワ紝璇锋鏌ョ綉缁滈摼鎺ュ苟鎵嬪姩鍒锋柊椤甸潰")));
            try {
                var i = JSON.parse(t)
            } catch (r) {
                return trace("JSON鏁版嵁瑙ｆ瀽寮傚父锛岄噸鏂拌姹傛暟鎹�!"), void e.getData()
            }
            e.dataRequestTimes = 0;
            var a = localData.Cache.data;
            a.time = i.time.toString(), a.current.periodNumber = i.current.periodNumber.toString();
            var n = i.current.awardTime.toString().split(":");
            a.current.awardTime = n[0] + ":" + n[1],
                a.current.awardNumbers = i.current.awardNumbers.toString(),
                a.next.periodNumber = i.next.periodNumber.toString(),
                n = i.next.awardTime.toString().split(":"),
                a.next.awardTime = n[0] + ":" + n[1],
                a.next.awardTimeInterval = i.next.awardTimeInterval.toString(),
                a.next.delayTimeInterval = i.next.delayTimeInterval.toString(),
                localData.CommonVariable.resultArray = a.current.awardNumbers.split(","),
                localData.CommonVariable.timeInterval = Math.round(Number(localData.Cache.data.next.awardTimeInterval) / 1e3 + Number(localData.Cache.data.next.delayTimeInterval)),
                CommonVariable.awardStatus < 2 ? ConcreteSubject.notify(SubjectTypes.GET_DATA) : a.next.awardTimeInterval > 0 && ConcreteSubject.notify(SubjectTypes.GET_REALDATA)
        }, e.dataRequestTimes = 0, e.recordRequestTimes = 0, e
    }();
    e.DataRequester = t, egret.registerClass(t, "dataReq.DataRequester")
}(dataReq || (dataReq = {}));
var dataReq;
!function (e) {
    var t = function () {
        function e() {
            throw new Error(this.__class__ + " 鏄潤鎬佹垚鍛橀泦鎴愮被锛屾棤闇€瀹炰緥鍖�")
        }

        var t = __define, i = e;
        return i.prototype, t(e, "CONNECT_COMPLETE", function () {
            return "connect complete"
        }), t(e, "CONNECT_FAULT", function () {
            return "connect fault"
        }), e.load = function (t) {
            "string" == typeof t && (t = JSON.parse(t)), e.object.total = t.loading.length + t.game.length, e.object.current = 0;
            for (var i = 0; i < t.loading.length; i++) if (t.loading[i].url && "" != t.loading[i].url) {
                var r = new egret.ImageLoader;
                r.once(egret.Event.COMPLETE, this.completeHandler, this), r.once(egret.IOErrorEvent.IO_ERROR, this.errorHandler, this), e.loadingAssets.push(t.loading[i].key), editHashPair(r, t.loading[i]), r.load(InitConfig.res_path + t.loading[i].url)
            } else e.object.current++;
            for (var a = 0; a < t.game.length; a++) if (t.game[a].url && "" != t.game[a].url) {
                var r = new egret.ImageLoader;
                r.once(egret.Event.COMPLETE, this.completeHandler, this), r.once(egret.IOErrorEvent.IO_ERROR, this.errorHandler, this), e.gameAssets.push(t.game[a].key), editHashPair(r, t.game[a]), r.load(InitConfig.res_path + t.game[a].url)
            } else e.object.current++
        }, e.completeHandler = function (t) {
            var i = t.currentTarget, r = i.data, a = new egret.Bitmap(r), n = getHashObject(i).property;
            for (var s in n) a[s] = Number(n[s]);
            e.object[getHashObject(i).key] = a, deleteHashPair(i), e.object.current++, e.object.current == e.object.total && ConcreteSubject.notify(SubjectTypes.DYNAMIC_COMPLETE)
        }, e.errorHandler = function (t) {
            var i = t.currentTarget;
            deleteHashPair(i), e.object.current++, e.object.current == e.object.total && ConcreteSubject.notify(SubjectTypes.DYNAMIC_COMPLETE)
        }, e.loadingAssets = [], e.gameAssets = [], e.object = new Object, e
    }();
    e.DynamicLoader = t, egret.registerClass(t, "dataReq.DynamicLoader")
}(dataReq || (dataReq = {}));
var gameModule;
!function (e) {
    var t = function () {
        function e(e) {
            this.isOverTime = !1, this.isInited = !1, this.container = e, this.buildView(), this.subscribe(SubjectTypes.GET_DATA, this.onGetData), this.subscribe(SubjectTypes.OVER_TIME, this.timeOverHandler), this.subscribe(SubjectTypes.GAME_UNMONI, this.unMoniAble), this.subscribe(SubjectTypes.GAME_START, this.onGameStart),
                this.subscribe(SubjectTypes.GAME_SCREENREADY, this.boatsRun), this.subscribe(SubjectTypes.GAME_BGMOVE, this.bgMove), this.subscribe(SubjectTypes.GAME_END, this.gameEnd), this.subscribe(SubjectTypes.GAME_SHOWLABEL, this.showLabel)
        }

        var t = (__define, e), i = t.prototype;
        return i.subscribe = function (e, t, i) {
            void 0 === i && (i = this), ConcreteSubject.addObserver(this, e, t, i)
        }, i.unsubscribe = function (e) {
            void 0 === e && (e = null), ConcreteSubject.removeObserver(this, e)
        }, i.buildView = function () {
            egret.startTick(function (e) {
                return dragonBones.WorldClock.clock.advanceTime(1 / 60), !1
            }, this), this.bgFar0 = new Bitmap, this.bgFar1 = new Bitmap, this.bgFar2 = new Bitmap, this.bgFar3 = new Bitmap, this.bgFar0.texture = this.bgFar1.texture = this.bgFar2.texture = this.bgFar3.texture = RES.getRes("gameFarBuilding_png"), this.bgFar1.x = this.bgFar0.width, this.bgFar2.x = 2 * this.bgFar0.width, this.bgFar3.x = 3 * this.bgFar0.width, this.bgFar0.y = this.bgFar1.y = this.bgFar2.y = this.bgFar3.y = 23, this.bgNear0 = new Bitmap, this.bgNear1 = new Bitmap, this.bgNear2 = new Bitmap, this.bgNear3 = new Bitmap, this.bgNear0.texture = this.bgNear1.texture = this.bgNear2.texture = this.bgNear3.texture = RES.getRes("gameBuilding_png"), this.bgNear1.x = this.bgNear0.width, this.bgNear2.x = 2 * this.bgNear0.width, this.bgNear3.x = 3 * this.bgNear0.width, this.bgNear0.y = this.bgNear1.y = this.bgNear2.y = this.bgNear3.y = 39, this.seaContainer = new Sprite, this.seaArray = [];
            var e = new bones.DragonBonesSea;
            e.armature.animation.gotoAndPlay("await"), this.bgSea0 = e.armature.display, this.bgSea0.x = this.bgSea0.width / 2 - 32, this.bgSea0.y = 387;
            var t = new bones.DragonBonesSea;
            t.armature.animation.gotoAndPlay("await"), this.bgSea1 = t.armature.display, this.bgSea1.x = this.bgSea0.x + this.bgSea0.width - 8, this.bgSea1.y = 387;
            var i = new bones.DragonBonesSea;
            i.armature.animation.gotoAndPlay("await"), this.bgSea2 = i.armature.display, this.bgSea2.x = this.bgSea1.x + this.bgSea1.width - 8, this.bgSea2.y = 387;
            var r = new bones.DragonBonesSea;
            r.armature.animation.gotoAndPlay("await"), this.bgSea3 = r.armature.display, this.bgSea3.x = this.bgSea2.x + this.bgSea2.width - 8, this.bgSea3.y = 387;
            var a = new bones.DragonBonesSea;
            a.armature.animation.gotoAndPlay("await"), this.bgSea4 = a.armature.display, this.bgSea4.x = this.bgSea3.x + this.bgSea3.width - 8, this.bgSea4.y = 387, this.seaArray.push(e, t, i, r, a), this.container.addChild(this.seaContainer), this.water0 = new bones.DragonBonesArmatureWater, this.water0.armature.display.x = -960, this.water0.armature.display.y = 380, this.water0.armature.display.scaleY = .5, this.water0.armature.display.alpha = .3, this.container.addChild(this.water0.armature.display), this.water1 = new bones.DragonBonesArmatureWater, this.water1.armature.display.x = 480, this.water1.armature.display.y = 500, this.water1.armature.display.alpha = .5, this.container.addChild(this.water1.armature.display), this.seaContainer.addChild(this.bgSea0), this.seaContainer.addChild(this.bgSea1), this.seaContainer.addChild(this.bgSea2), this.seaContainer.addChild(this.bgSea3), this.seaContainer.addChild(this.bgSea4), this.container.addChild(this.bgFar0), this.container.addChild(this.bgFar1), this.container.addChild(this.bgFar2), this.container.addChild(this.bgFar3), this.container.addChild(this.bgNear0), this.container.addChild(this.bgNear1), this.container.addChild(this.bgNear2), this.container.addChild(this.bgNear3), dataReq.DynamicLoader.object.seaLogo && (this.logo_x = dataReq.DynamicLoader.object.seaLogo.x, this.container.addChild(dataReq.DynamicLoader.object.seaLogo)), this.jidiCover = new Bitmap, this.jidiCover.texture = RES.getRes("jidiCover_png"), this.jidiCover.scaleX = this.jidiCover.scaleY = 1 / .7, this.jidiCover.x = -1200, this.jidiGround = new Bitmap, this.jidiGround.texture = RES.getRes("jidiGround_png"), this.jidiGround.x = -652.35, this.jidiGround.y = 164.6, this.bgProxy = new proxy.BackGroundProxy([[this.bgFar0, this.bgFar1, this.bgFar2, this.bgFar3], [this.bgNear0, this.bgNear1, this.bgNear2, this.bgNear3], [this.bgSea0, this.bgSea1, this.bgSea2, this.bgSea3, this.bgSea4], [this.jidiCover, this.jidiGround]]), this.bgProxy.seaArmatureArray = [e.armature, t.armature, i.armature, r.armature, a.armature], this.bppArray = new Array(10), this.boatPlayerContainer = new Sprite, this.container.addChild(this.jidiGround), this.container.addChild(this.boatPlayerContainer), this.container.addChild(this.jidiCover), this.shipContainer = new Sprite, this.container.addChild(this.shipContainer), this.shipProxy = new proxy.ShipProxy(this.shipContainer), this.labelArray = [];
            for (var n = 9; n >= 0; n--) this.bppArray[n] = new proxy.BoatPlayerProxy, this.bppArray[n].id = n + 1, this.bppArray[n].display.anchorOffsetX = 112, this.bppArray[n].display.x = localData.Cache.boatData[n][0], this.bppArray[n].display.scaleX = this.bppArray[n].display.scaleY = .8 * Math.pow(.98, n), this.bppArray[n].display.y = 420 - 12 * n, this.boatPlayerContainer.addChild(this.bppArray[n].display);
            for (this.labelContainer = new Sprite, this.container.addChild(this.labelContainer), n = 0; 10 > n; n++) {
                var s = new Bitmap;
                s.texture = RES.getRes("label" + (n + 1) + "_png"), s.anchorOffsetX = s.width / 2, s.anchorOffsetY = s.height, s.visible = !1, this.labelArray.push(s), this.labelContainer.addChildAt(s, 0)
            }
            for (n = 2; 11 > n; n++) {
                var o = bones.DragonBonesBoatPlayer.dragonbonesFactory.getTextureDisplay("feiting_tou" + n),
                    h = this.bppArray[n - 1].armature.getSlot("feiting_tou1");
                h.display = o;
                var l = bones.DragonBonesBoatPlayer.dragonbonesFactory.getTextureDisplay("feiting_shen" + n),
                    c = this.bppArray[n - 1].armature.getSlot("feiting_shen1");
                c.display = l
            }
            for (n = 0; 5 > n; n++) {
                var u = this.seaArray[n].armature.getSlot("zhongdian_xian");
                u.display.visible = !1
            }
        }, i.timeOverHandler = function () {
            this.isOverTime = !0
        }, i.init = function () {
            this.isInited && ConcreteSubject.notify(SubjectTypes.SOUND_RESTART), SoundEffectManager.playSound(SoundNames.BGM_GAME, 0, 0), this.isOverTime = !1, this.jidiCover.x = -2400, this.jidiGround.x = -1852.35, this.bgProxy.init();
            for (var e = 0; 10 > e; e++) this.bppArray[e].init(), this.labelArray[e].visible = !1;
            dataReq.DynamicLoader.object.seaLogo && (dataReq.DynamicLoader.object.seaLogo.x = this.logo_x), this.gameEnd(), this.shipProxy.begin()
        }, i.onGetData = function () {
            this.isInited || (this.init(), this.isInited = !0);
            for (var e = localData.Cache.data.current.awardNumbers.split(","), t = 0; 8 > t; t++) e[t]
        }, i.showLabel = function (e) {
            this.labelArray[e - 1].visible = !0
        }, i.onGameStart = function () {
            this.container.addEventListener(egret.Event.ENTER_FRAME, this.stepHandler, this), this.subscribe(SubjectTypes.GAME_BOATCONTAINERMOVE, this.boatContainerMove), this.screenReverseMove(), this.boatPlayerContainer.x = 700, CommonVariable.isBgMoving = !1
        }, i.gameEnd = function () {
            this.container.removeEventListener(egret.Event.ENTER_FRAME, this.stepHandler, this), this.unsubscribe(SubjectTypes.GAME_BOATCONTAINERMOVE);
            for (var e = 0; 10 > e; e++) this.labelArray[e].visible = !1
        }, i.boatsRun = function () {
            for (var e = 0; 10 > e; e++) this.bppArray[e].readyToRun(), this.bppArray[e].startToRun();
            CommonVariable.awardStatus = 2.5, SoundEffectManager.playSoundSingle(SoundNames.RUNNING, 0, 0)
        }, i.screenReverseMove = function () {
            this.bgProxy.bgReversePlay()
        }, i.bgMove = function () {
            this.bgProxy.bgPlay(), egret.Tween.get(this.boatPlayerContainer).to({x: 0}, 1070)
        }, i.boatContainerMove = function () {
            this.unsubscribe(SubjectTypes.GAME_BOATCONTAINERMOVE), FrameDelayCaller.addCallerRepeat(this, function () {
                this.boatPlayerContainer.x += 1 * proxy.BackGroundProxy.speed
            }, this, 1, 140), CommonVariable.awardStatus = 4, FrameDelayCaller.addCallerOnce(this, function () {
                ConcreteSubject.notify(SubjectTypes.GAME_SHOWRANK)
            }, this, 90), FrameDelayCaller.addCallerOnce(this, function () {
                ConcreteSubject.notify(SubjectTypes.GAME_END)
            }, this, 500)
        }, i.stepHandler = function () {
            var e = this.bppArray.concat();
            e.sort(function (e, t) {
                return e.display.x > t.display.x ? -1 : 1
            });
            for (var t = 0; 10 > t; t++) this.labelArray[t].scaleX = this.labelArray[t].scaleY = this.bppArray[t].display.scaleX, this.labelArray[t].x = this.bppArray[t].display.x - 90 * this.bppArray[t].display.scaleX + this.boatPlayerContainer.x, this.labelArray[t].y = this.bppArray[t].display.y - this.bppArray[t].display.height * this.bppArray[t].display.scaleY * .5;
            ConcreteSubject.notify(SubjectTypes.GAME_RANKING, e)
        }, i.unMoniAble = function () {
        }, e
    }();
    e.GameView = t, egret.registerClass(t, "gameModule.GameView", ["IObserver"])
}(gameModule || (gameModule = {}));
var gameModule;
!function (e) {
    var t = function () {
        function e(e) {
            this.isInit = !0, this.container = e, this.buildView(), this.subscribe(SubjectTypes.GAME_START, this.onGameStart), this.subscribe(SubjectTypes.GAME_RANKING, this.ranking), this.subscribe(SubjectTypes.GET_DATA, this.onGetData), this.subscribe(SubjectTypes.SHOW_BTN, this.showBtn), this.subscribe(SubjectTypes.HIDE_BTN, this.hideBtn), this.subscribe(SubjectTypes.GAME_UNMONI, this.unMoni), this.subscribe(SubjectTypes.GAME_BOATCONTAINERMOVE, this.showData)
        }

        var t = (__define, e), i = t.prototype;
        return i.subscribe = function (e, t, i) {
            void 0 === i && (i = this), ConcreteSubject.addObserver(this, e, t, i)
        }, i.unsubscribe = function (e) {
            void 0 === e && (e = null), ConcreteSubject.removeObserver(this, e)
        }, i.buildView = function () {
            this.infoBoardTop = new Bitmap, this.infoBoardTop.texture = RES.getRes("infoBoardTop_png"), this.container.addChild(this.infoBoardTop), this.infoBoardTop.scaleX = this.infoBoardTop.scaleY = 1 / .7, this.infoBoard1 = new Bitmap, this.infoBoard2 = new Bitmap, this.infoBoard3 = new Bitmap, this.infoBoard1.texture = RES.getRes("infoBoard1_png"), this.container.addChild(this.infoBoard1), this.infoBoard1.scaleX = this.infoBoard1.scaleY = 1 / .7, this.infoBoard2.texture = RES.getRes("infoBoard2_png"), this.container.addChild(this.infoBoard2), this.infoBoard2.scaleX = this.infoBoard2.scaleY = 1 / .7, this.infoBoard3.texture = RES.getRes("infoBoard3_png"), this.container.addChild(this.infoBoard3), this.infoBoard3.scaleX = this.infoBoard3.scaleY = 1 / .7, this.infoBoard3.x = egret.MainContext.instance.stage.stageWidth - this.infoBoard3.width * this.infoBoard1.scaleX;
            var e = this.infoBoard1.width * this.infoBoard1.scaleX;
            this.infoBoard2.x = e + (this.infoBoard3.x - e - this.infoBoard2.width * this.infoBoard2.scaleX) / 2, this.infoBoard1.y = 508, this.infoBoard2.y = 508, this.infoBoard3.y = 508;
            var t = new Bitmap, i = new Bitmap, r = new Bitmap, a = new Bitmap, n = new Bitmap;
            t.texture = RES.getRes("infoBoardQH_png"), r.texture = RES.getRes("infoBoardLH_png"), i.texture = RES.getRes("infoBoardGYJH_png"), a.texture = RES.getRes("awardTime_png"), n.texture = RES.getRes("nextPeriod_png"), t.scaleX = t.scaleY = 1 / .7, this.container.addChild(t), t.x = 176, t.y = 536, i.scaleX = i.scaleY = 1 / .7, this.container.addChild(i), i.x = 438, i.y = 536, r.scaleX = r.scaleY = 1 / .7, this.container.addChild(r), r.x = 731, r.y = 536, a.scaleX = a.scaleY = 1 / .7, this.container.addChild(a), a.x = 795, a.y = 34, n.scaleX = n.scaleY = 1 / .7, this.container.addChild(n), n.x = 795, n.y = 10, this.luzhuContainer = new Sprite, this.next_periodNumber_txt = new TextField, this.next_periodNumber_txt.fontFamily = "Microsoft YaHei", this.next_periodNumber_txt.size = 20, this.next_periodNumber_txt.bold = !1, this.next_periodNumber_txt.textAlign = egret.HorizontalAlign.LEFT, this.next_periodNumber_txt.x = 886, this.next_periodNumber_txt.y = 9, this.next_periodNumber_txt.textColor = 16054049, this.container.addChild(this.next_periodNumber_txt), this.next_awardTime_txt = new TextField, this.next_awardTime_txt.fontFamily = "Microsoft YaHei", this.next_awardTime_txt.size = 20, this.next_awardTime_txt.bold = !1, this.next_awardTime_txt.textAlign = egret.HorizontalAlign.LEFT, this.next_awardTime_txt.x = 886, this.next_awardTime_txt.y = 33, this.next_awardTime_txt.textColor = 16054049, this.container.addChild(this.next_awardTime_txt), this.current_awardDate_txt = new TextField, this.current_awardDate_txt.fontFamily = "Microsoft YaHei", this.current_awardDate_txt.size = 24, this.current_awardDate_txt.bold = !0, this.current_awardDate_txt.textAlign = egret.HorizontalAlign.CENTER, this.current_awardDate_txt.x = 45, this.current_awardDate_txt.y = 575, this.current_awardDate_txt.textColor = 14088191, this.container.addChild(this.current_awardDate_txt), this.current_awardTime_txt = new TextField, this.current_awardTime_txt.fontFamily = "Microsoft YaHei", this.current_awardTime_txt.size = 24, this.current_awardTime_txt.bold = !0, this.current_awardTime_txt.textAlign = egret.HorizontalAlign.CENTER, this.current_awardTime_txt.x = 213, this.current_awardTime_txt.y = 575, this.current_awardTime_txt.textColor = 14088191, this.container.addChild(this.current_awardTime_txt), this.current_periodNumber_txt = new TextField, this.current_periodNumber_txt.fontFamily = "Microsoft YaHei", this.current_periodNumber_txt.size = 24, this.current_periodNumber_txt.bold = !0, this.current_periodNumber_txt.textAlign = egret.HorizontalAlign.CENTER, this.current_periodNumber_txt.width = 50, this.current_periodNumber_txt.x = 300, this.current_periodNumber_txt.y = 575, this.current_periodNumber_txt.textColor = 14088191, this.container.addChild(this.current_periodNumber_txt), this.zh_txt = new TextField, this.zh_txt.fontFamily = "Microsoft YaHei", this.zh_txt.size = 24, this.zh_txt.bold = !0, this.zh_txt.width = 30, this.zh_txt.textAlign = egret.HorizontalAlign.CENTER, this.zh_txt.x = 419, this.zh_txt.y = 575, this.zh_txt.textColor = 14088191, this.container.addChild(this.luzhuContainer), this.luzhuContainer.addChild(this.zh_txt), this.dx_anm = new disDev.AnimationLite(2, "lz", 0, 3, 1, (!1)), this.ds_anm = new disDev.AnimationLite(2, "lz", 2, 3, 1, (!1)), this.lh0_anm = new disDev.AnimationLite(2, "lz", 4, 3, 1, (!1)), this.lh1_anm = new disDev.AnimationLite(2, "lz", 4, 3, 1, (!1)), this.lh2_anm = new disDev.AnimationLite(2, "lz", 4, 3, 1, (!1)), this.lh3_anm = new disDev.AnimationLite(2, "lz", 4, 3, 1, (!1)), this.lh4_anm = new disDev.AnimationLite(2, "lz", 4, 3, 1, (!1)), this.luzhuContainer.addChild(this.dx_anm), this.luzhuContainer.addChild(this.ds_anm), this.luzhuContainer.addChild(this.lh0_anm), this.luzhuContainer.addChild(this.lh1_anm), this.luzhuContainer.addChild(this.lh2_anm), this.luzhuContainer.addChild(this.lh3_anm), this.luzhuContainer.addChild(this.lh4_anm), this.dx_anm.scaleX = this.dx_anm.scaleY = 1 / .7, this.ds_anm.scaleX = this.ds_anm.scaleY = 1 / .7, this.lh0_anm.scaleX = this.lh0_anm.scaleY = 1 / .7, this.lh1_anm.scaleX = this.lh1_anm.scaleY = 1 / .7,this.lh2_anm.scaleX = this.lh2_anm.scaleY = 1 / .7,this.lh3_anm.scaleX = this.lh3_anm.scaleY = 1 / .7,this.lh4_anm.scaleX = this.lh4_anm.scaleY = 1 / .7,this.dx_anm.x = 480,this.dx_anm.y = 573,this.ds_anm.x = 535,this.ds_anm.y = 573,this.lh0_anm.x = 657,this.lh0_anm.y = 573,this.lh1_anm.x = 711,this.lh1_anm.y = 573,this.lh2_anm.x = 765,this.lh2_anm.y = 573,this.lh3_anm.x = 819,this.lh3_anm.y = 573,this.lh4_anm.x = 875,this.lh4_anm.y = 573,this.numArray = new Array(10);
            for (var s = 0; 10 > s; s++) this.numArray[s] = new disDev.AnimationLite(10, "playerNum", 1, 4, 1, (!1)), this.numArray[s].x = 236 + 50 * s, this.numArray[s].y = 7, this.container.addChild(this.numArray[s]);
            this.clockProxy = new proxy.ClockProxy(this.container), this.container.addChild(this.clockProxy.display), this.clockProxy.display.x = 440, this.clockProxy.display.y = 265, this.clockProxy.turnBlue();
            var o = disDev.TextureInfoMaker.createInfo(10, "moniShowZC_", 0, 3),
                h = disDev.TextureInfoMaker.createInfo(1, "moniShowAX_", 0, 3, 1), l = o.reverse(),
                c = disDev.TextureInfoMaker.createInfo(10, "moniShowZB_", 0, 3), u = c.reverse();
            this.moniBtnAnm = new disDev.AnimationGroup([o, h, l, c, u]);
            var d = this.moniBtnAnm.getPartHeadAndTailAt(0),
                m = (this.moniBtnAnm.getPartHeadAndTailAt(1), this.moniBtnAnm.getPartHeadAndTailAt(2)),
                p = this.moniBtnAnm.getPartHeadAndTailAt(3), g = this.moniBtnAnm.getPartHeadAndTailAt(4);
            this.moniBtnAnm.addFrameScript(d.tail, this.btnShowEnd, this), this.moniBtnAnm.addFrameScript(m.tail, this.btnHideEnd, this), this.moniBtnAnm.addFrameScript(p.tail, this.btnShowEnd, this), this.moniBtnAnm.addFrameScript(g.tail, this.btnHideEnd, this), this.moniBtnAnm.stop(), this.moniBtnAnm.x = 495, this.moniBtnAnm.y = 229, this.container.addChild(this.moniBtnAnm), this.clockShape = new Bitmap, this.clockShape.texture = RES.getRes("clockRange_png"), this.clockShape.x = 372, this.clockShape.y = 198, this.clockShape.touchEnabled = !0, this.clockShape.alpha = .01, this.clockShape.visible = !1, this.container.addChild(this.clockShape), this.clockShape.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this), this.clockShape.addEventListener(egret.TouchEvent.TOUCH_TAP, this.moniHandler, this), this.soundBtnOpen = new disDev.ButtonLite("soundBtnOpen0001_png", "soundBtnOpen0002_png"), this.soundBtnOpen.x = 926, this.soundBtnOpen.y = 81, this.soundBtnClose = new disDev.ButtonLite("soundBtnClose0001_png", "soundBtnClose0002_png"), this.soundBtnClose.x = 926, this.soundBtnClose.y = 81;
            var y = new Bitmap;
            y.texture = RES.getRes("soundBtnBg_png"), this.container.addChild(y), y.scaleX = y.scaleY = 1 / .7, y.x = 913, y.y = 63, this.closeBitmap = new Bitmap, this.closeBitmap.texture = RES.getRes("soundBtnBg_png"), this.closeBitmap.scaleX = this.closeBitmap.scaleY = 1 / .6, this.closeBitmap.alpha = .01, this.closeBitmap.x = y.x - (this.closeBitmap.width / .6 - this.closeBitmap.width / .7) / 2, this.closeBitmap.y = y.y - (this.closeBitmap.height / .6 - this.closeBitmap.height / .7) / 2, this.openShape = new Bitmap, this.openShape.texture = RES.getRes("soundBtnBg_png"), this.openShape.scaleX = this.openShape.scaleY = 1 / .6, this.openShape.alpha = .01, this.openShape.x = y.x - (this.openShape.width / .6 - this.openShape.width / .7) / 2, this.openShape.y = y.y - (this.openShape.height / .6 - this.openShape.height / .7) / 2, this.container.addChild(this.soundBtnOpen), this.container.addChild(this.soundBtnClose), this.container.addChild(this.closeBitmap), this.container.addChild(this.openShape), this.soundBtnOpen.touchRangeShape = this.openShape, this.soundBtnClose.touchRangeShape = this.closeBitmap, this.soundBtnOpen.visible = this.openShape.visible = !1, this.soundBtnClose.visible = this.closeBitmap.visible = !1, AboutBrowser.info.isAutoPlaySound && "iOS" != egret.Capabilities.os || this.closeBitmap.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.soundInitHandler, this), this.closeBitmap.addEventListener(egret.TouchEvent.TOUCH_TAP, this.soundCloseHandler, this), this.openShape.addEventListener(egret.TouchEvent.TOUCH_TAP, this.soundOpenHandler, this);
            for (var b in dataReq.DynamicLoader.gameAssets) {
                var v = dataReq.DynamicLoader.object[dataReq.DynamicLoader.gameAssets[b]];
                v && this.container.addChild(v)
            }
        }, i.soundInitHandler = function () {
            SoundEffectManager.initAllSoundWithExtreme(), this.closeBitmap.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.soundInitHandler, this)
        }, i.init = function () {
            this.onGetData(), this.moniBtnAnm.gotoAndStop(1), this.clockShape.visible = !1, this.luzhuContainer.visible = !0
        }, i.onGetData = function () {
            this.isInit && (this.isInit = !1, "iOS" == egret.Capabilities.os ? (popup("寰堟姳姝夛紝鐢变簬IOS绯荤粺涓嶅厑璁告祻瑙堝櫒鑷姩鎾斁闊抽锛岃鎵嬪姩鎵撳紑闊虫晥寮€鍏炽€�"), SoundEffectManager.isOpen = !1, this.soundBtnClose.visible = this.closeBitmap.visible = !0) : "Android" == egret.Capabilities.os ? AboutBrowser.info.isAutoPlaySound ? this.soundBtnOpen.visible = this.openShape.visible = !0 : (popup("寰堟姳姝夛紝鎮ㄥ綋鍓嶆墍浣跨敤鐨勬祻瑙堝櫒涓嶆敮鎸佽嚜鍔ㄦ挱鏀鹃煶棰戯紝璇锋墜鍔ㄦ墦寮€闊虫晥寮€鍏炽€�"), SoundEffectManager.isOpen = !1, this.soundBtnClose.visible = this.closeBitmap.visible = !0) : this.soundBtnOpen.visible = this.openShape.visible = !0), this.next_periodNumber_txt.text = localData.Cache.data.next.periodNumber, this.next_awardTime_txt.text = localData.Cache.data.next.awardTime.split(" ")[1], this.getCurrentPeriodNumber(), this.getCurrentResult(), this.getAwardTimeInterval(), CommonVariable.awardStatus < 2 && (CommonVariable.timeInterval -= 1, this.clockProxy.startRun(), this.clockProxy.show())
        }, i.btnShowEnd = function () {
            this.moniBtnAnm.stop(), 10 == this.moniBtnAnm.currentFrame ? this.clockShape.visible = !0 : this.clockShape.visible = !1
        }, i.unMoni = function () {
            this.clockShape.visible = !1, this.moniBtnAnm.currentFrame < 10 ? this.moniBtnAnm.isPlaying ? this.moniBtnAnm.gotoAndPlay(this.moniBtnAnm.currentFrame + 21) : this.moniBtnAnm.gotoAndStop(this.moniBtnAnm.currentFrame + 21) : (10 == this.moniBtnAnm.currentFrame || 11 == this.moniBtnAnm.currentFrame) && this.moniBtnAnm.gotoAndStop(31), this.clockShape.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this), this.clockShape.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this)
        }, i.touchBegin = function () {
            this.clockShape.visible && (this.moniBtnAnm.gotoAndStop(11), this.clockShape.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this))
        }, i.touchMove = function (e) {
        }, i.touchEnd = function () {
            this.moniBtnAnm.gotoAndStop(10), this.clockShape.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this), this.clockShape.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this)
        }, i.moniHandler = function () {
            this.clockShape.visible && (CommonVariable.awardStatus = 2, CommonVariable.isSimulating = !0, this.clockShape.visible = !1, this.clockShape.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this), this.clockShape.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this), this.moniBtnAnm.gotoAndPlay(12))
        }, i.btnHideEnd = function () {
            this.moniBtnAnm.stop(), this.clockProxy.hide()
        }, i.showBtn = function () {
            CommonVariable.timeInterval >= 65 ? this.moniBtnAnm.gotoAndPlay(1) : (this.moniBtnAnm.gotoAndPlay(22), this.clockProxy.turnBlack())
        }, i.hideBtn = function () {
            this.moniBtnAnm.gotoAndPlay(32)
        }, i.onClockInComplete = function () {
        }, i.getCurrentPeriodNumber = function () {
            this.current_awardDate_txt.text = localData.Cache.data.current.awardTime.split(" ")[0], this.current_awardTime_txt.text = localData.Cache.data.current.awardTime.split(" ")[1], this.current_periodNumber_txt.text = localData.Cache.data.current.periodNumber
        }, i.getCurrentResult = function () {
            for (var e = localData.Cache.data.current.awardNumbers.split(","), t = 0; 10 > t; t++) {
                var i = e[t];
                this.numArray[t].gotoAndStop(Number(i))
            }
            var r = Number(e[0]) + Number(e[1]), a = r > 11 ? 1 : 2, n = r % 2 == 1 ? 1 : 2,
                s = Number(e[0]) > Number(e[9]) ? 1 : 2, o = Number(e[1]) > Number(e[8]) ? 1 : 2,
                h = Number(e[2]) > Number(e[7]) ? 1 : 2, l = Number(e[3]) > Number(e[6]) ? 1 : 2,
                c = Number(e[4]) > Number(e[5]) ? 1 : 2;
            this.zh_txt.visible = !0, this.dx_anm.visible = !0, this.ds_anm.visible = !0, this.lh0_anm.visible = !0, this.lh1_anm.visible = !0, this.lh2_anm.visible = !0, this.lh3_anm.visible = !0, this.lh4_anm.visible = !0, this.zh_txt.text = r.toString(), this.dx_anm.gotoAndStop(a), this.ds_anm.gotoAndStop(n), this.lh0_anm.gotoAndStop(s), this.lh1_anm.gotoAndStop(o), this.lh2_anm.gotoAndStop(h), this.lh3_anm.gotoAndStop(l), this.lh4_anm.gotoAndStop(c)
        }, i.getAwardTimeInterval = function () {
        }, i.onGameStart = function () {
            if (!CommonVariable.isSimulating) {
                localData.Cache.data.current.period = localData.Cache.data.next.period, this.next_periodNumber_txt.text = "寮€濂栦腑", this.next_awardTime_txt.text = "寮€濂栦腑", this.current_awardTime_txt.text = localData.Cache.data.next.awardTime.split(" ")[1], this.current_periodNumber_txt.text = localData.Cache.data.next.periodNumber, this.luzhuContainer.visible = !1;
                for (var e = 0; 8 > e; e++) ;
            }
        }, i.ranking = function (e) {
            for (var t in this.numArray) this.numArray[t].gotoAndStop(e[t].id)
        }, i.showData = function () {
            CommonVariable.isSimulating || (this.getCurrentResult(), this.luzhuContainer.visible = !0)
        }, i.soundOpenHandler = function () {
            SoundEffectManager.isOpen = !1, this.soundBtnOpen.visible = !1, this.soundBtnClose.visible = !0, this.openShape.visible = !1, this.closeBitmap.visible = !0
        }, i.soundCloseHandler = function () {
            SoundEffectManager.isOpen = !0, CommonVariable.awardStatus < 2.5 ? SoundEffectManager.playSound(SoundNames.BGM_GAME, 0, 0) : CommonVariable.awardStatus >= 2.5 && CommonVariable.awardStatus < 4 && SoundEffectManager.playSound(SoundNames.RUNNING, 0, 0), this.soundBtnOpen.visible = !0, this.soundBtnClose.visible = !1, this.openShape.visible = !0, this.closeBitmap.visible = !1
        }, e
    }();
    e.InfoView = t, egret.registerClass(t, "gameModule.InfoView", ["IObserver"])
}(gameModule || (gameModule = {}));
var gameModule;
!function (e) {
    var t = function () {
        function e(e) {
            this.st_mc = new Bitmap, this.nd_mc = new Bitmap, this.rd_mc = new Bitmap, this.container = e, this.buildView()
        }

        var t = (__define, e), i = t.prototype;
        return i.subscribe = function (e, t, i) {
            void 0 === i && (i = this), ConcreteSubject.addObserver(this, e, t, i)
        }, i.unsubscribe = function (e) {
            void 0 === e && (e = null), ConcreteSubject.removeObserver(this, e)
        }, i.buildView = function () {
            var e = new Bitmap;
            e.texture = RES.getRes("kaijiang_jieguo_jpg"), e.scaleX = e.scaleY = 1 / .7, this.container.addChild(e), this.container.addChild(this.rd_mc), this.container.addChild(this.nd_mc), this.container.addChild(this.st_mc);
            var t = new Bitmap;
            t.texture = RES.getRes("1st_png"), t.x = 441, t.y = 118, this.container.addChild(t);
            var i = new Bitmap;
            i.texture = RES.getRes("2nd_png"), i.x = 150, i.y = 170, this.container.addChild(i);
            var r = new Bitmap;
            r.texture = RES.getRes("3rd_png"), r.x = 740, r.y = 163, this.container.addChild(r)
        }, i.getRank = function (e, t, i) {
            this.st_mc.texture = RES.getRes("feiting_" + e), this.nd_mc.texture = RES.getRes("feiting_" + t), this.rd_mc.texture = RES.getRes("feiting_" + i), this.st_mc.scaleX = this.st_mc.scaleY = .8, this.nd_mc.scaleX = this.nd_mc.scaleY = .6, this.rd_mc.scaleX = this.rd_mc.scaleY = .6, this.st_mc.x = 330, this.st_mc.y = 175, this.nd_mc.x = 56, this.nd_mc.y = 223, this.rd_mc.x = 651, this.rd_mc.y = 223, egret.Tween.get(this.st_mc).wait(500).to({
                x: 295,
                y: 200,
                scaleX: 1,
                scaleY: 1
            }, 300), egret.Tween.get(this.nd_mc).wait(1e3).to({
                x: 46,
                y: 236,
                scaleX: .75,
                scaleY: .75
            }, 300), egret.Tween.get(this.rd_mc).wait(1e3).to({x: 642, y: 236, scaleX: .75, scaleY: .75}, 300)
        }, e
    }();
    e.RankView = t, egret.registerClass(t, "gameModule.RankView", ["IObserver"])
}(gameModule || (gameModule = {}));
var gameModule;
!function (e) {
    var t = function () {
        function t() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t - 0] = arguments[t];
            this.takeSpaceCount = 0, this.infoLayer = e[0], this.localEffectLayer = e[1], this.gameLayer = e[2], this.buildView(), this.init(), this.addEvents()
        }

        var i = (__define, t), r = i.prototype;
        return r.subscribe = function (e, t, i) {
            void 0 === i && (i = this), ConcreteSubject.addObserver(this, e, t, i)
        }, r.unsubscribe = function (e) {
            void 0 === e && (e = null), ConcreteSubject.removeObserver(this, e)
        }, r.reStart = function () {
            this.subscribe(SubjectTypes.GET_DATA, this.onGetData), this.gameView.init(), this.infoView.init(), this.init()
        }, r.init = function () {
            clearTimeout(this.timeID), clearInterval(this.timeID), this.localEffectLayer.visible = !1, dataReq.DataRequester.getData()
        }, r.addEvents = function () {
            this.subscribe(SubjectTypes.GAME_START, this.onGameStart), this.subscribe(SubjectTypes.GAME_END, this.onGameEnd), this.subscribe(SubjectTypes.GET_DATA, this.onGetData), this.subscribe(SubjectTypes.GET_REALDATA, this.getRealData), this.subscribe(SubjectTypes.TAKE_SPACE, this.oneTakeSpace), this.subscribe(SubjectTypes.GAME_SHOWRANK, this.showRank)
        }, r.buildView = function () {
            this.infoView = new e.InfoView(this.infoLayer), this.rankView = new e.RankView(this.localEffectLayer), this.gameView = new e.GameView(this.gameLayer)
        }, r.onGameStart = function () {
            clearTimeout(this.timeID), clearInterval(this.timeID), CommonVariable.isSimulating ? this.timeID = setTimeout(this.getResult.bind(this), 18e3) : this.timeID = setTimeout(this.getResult.bind(this), 8e3), CommonVariable.takeSpaceCount = 0, this.takeSpaceCount = 0
        }, r.getResult = function () {
            if (clearTimeout(this.timeID), clearInterval(this.timeID), CommonVariable.isSimulating) {
                CommonVariable.awardStatus = 3;
                for (var e = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], t = []; e.length > 0;) {
                    var i = Math.floor(e.length * Math.random());
                    t.push(e[i]), e.splice(i, 1)
                }
                this.rankArray = [], this.rankArray[0] = t[0], this.rankArray[1] = t[1], this.rankArray[2] = t[2], ConcreteSubject.notify(SubjectTypes.TAKE_REALDATA, t)
            } else dataReq.DataRequester.getData(), this.timeID = setInterval(dataReq.DataRequester.getData, 3e3)
        }, r.getRealData = function () {
            clearTimeout(this.timeID), clearInterval(this.timeID), CommonVariable.awardStatus = 3;
            for (var e = [], t = 0; 10 > t; t++) e.push(Number(localData.CommonVariable.resultArray[t]));
            this.rankArray = [], this.rankArray[0] = e[0], this.rankArray[1] = e[1], this.rankArray[2] = e[2], ConcreteSubject.notify(SubjectTypes.TAKE_REALDATA, e)
        }, r.onGetData = function () {
            this.gameLayer.dispatchEvent(new egret.Event("enterGame", (!0))), this.unsubscribe(SubjectTypes.GET_DATA)
        }, r.onGameEnd = function () {
            SoundMusicManager.isOpen, CommonVariable.isSimulating ? (CommonVariable.awardStatus = 0, this.gameView.init(), this.infoView.init(), this.localEffectLayer.visible = !1) : (CommonVariable.awardStatus = 0, this.gameView.init(), this.infoView.init(), this.localEffectLayer.visible = !1, ConcreteSubject.notify(SubjectTypes.GET_DATA))
        }, r.oneTakeSpace = function () {
            this.takeSpaceCount++, 10 == this.takeSpaceCount && TimerDelayCaller.addCallerOnce(null, function () {
                CommonVariable.takeSpaceCount = 10
            }, this, 17)
        }, r.showRank = function () {
            this.localEffectLayer.visible = !0, SoundEffectManager.playSoundSingle(SoundNames.RANK), this.rankView.getRank(this.rankArray[0], this.rankArray[1], this.rankArray[2])
        }, t
    }();
    e.ViewMediator = t, egret.registerClass(t, "gameModule.ViewMediator", ["IObserver"])
}(gameModule || (gameModule = {}));
var proxy;
!function (e) {
    var t = function () {
        function e(e) {
            this.farArray = e[0], this.nearArray = e[1], this.seaArray = e[2], this.jidiArray = e[3]
        }

        var t = (__define, e), i = t.prototype;
        return i.init = function () {
            this.endLine && (this.endLine.visible = !1, this.endLine = null), this.seaLogo = dataReq.DynamicLoader.object.seaLogo
        }, i.bgReversePlay = function () {
            FrameDelayCaller.addCallerRepeat(this, this.reversePlaying, this, 1, 0)
        }, i.reversePlaying = function () {
            for (var t in this.farArray) this.farArray[t].x += 2 * e.speed / 6, this.farArray[t].x > 3 * this.farArray[t].width && (this.farArray[t].x -= 4 * this.farArray[t].width);
            for (var i in this.nearArray) this.nearArray[i].x += 2 * e.speed / 4, this.nearArray[i].x > 3 * this.nearArray[i].width && (this.nearArray[i].x -= 4 * this.nearArray[i].width);
            for (var r in this.seaArray) this.seaArray[r].x += 2 * e.speed, this.seaArray[r].x > 362 * (this.seaArray.length - 1) && (this.seaArray[r].x -= 362 * this.seaArray.length, this.seaArray[r].parent.addChildAt(this.seaArray[r], 0));
            for (var a in this.jidiArray) this.jidiArray[a].x += 2 * e.speed;
            this.jidiArray[0].x >= 2 * -e.speed && (FrameDelayCaller.clearCallerAt(this), ConcreteSubject.notify(SubjectTypes.GAME_SCREENREADY)), this.seaLogo && (this.seaLogo.x += 2 * e.speed, this.seaLogo.x > 1e3 && (this.seaLogo.x = -650))
        }, i.bgPlay = function () {
            this.init(), FrameDelayCaller.addCallerRepeat(this, this.bgPlaying, this, 1, 0)
        }, i.onComplete1 = function () {
            egret.Tween.get(this.seaArray[0]).wait(350).to({
                scaleY: 1,
                y: this.seaArray[0].y + 40
            }, 3500, egret.Ease.quadOut).call(this.onComplete2, this), egret.Tween.get(this.seaArray[1]).wait(350).to({
                scaleY: 1,
                y: this.seaArray[0].y + 40
            }, 3500, egret.Ease.quadOut), egret.Tween.get(this.seaArray[2]).wait(350).to({
                scaleY: 1,
                y: this.seaArray[0].y + 40
            }, 3500, egret.Ease.quadOut), egret.Tween.get(this.seaArray[3]).wait(350).to({
                scaleY: 1,
                y: this.seaArray[0].y + 40
            }, 3500, egret.Ease.quadOut), egret.Tween.get(this.seaArray[4]).wait(350).to({
                scaleY: 1,
                y: this.seaArray[0].y + 40
            }, 3500, egret.Ease.quadOut)
        }, i.onComplete2 = function () {
            egret.Tween.get(this.seaArray[0]).to({
                scaleY: 1.2,
                y: this.seaArray[0].y - 40
            }, 3500, egret.Ease.quadIn).call(this.onComplete1, this), egret.Tween.get(this.seaArray[1]).to({
                scaleY: 1.2,
                y: this.seaArray[0].y - 40
            }, 3500, egret.Ease.quadIn), egret.Tween.get(this.seaArray[2]).to({
                scaleY: 1.2,
                y: this.seaArray[0].y - 40
            }, 3500, egret.Ease.quadIn), egret.Tween.get(this.seaArray[3]).to({
                scaleY: 1.2,
                y: this.seaArray[0].y - 40
            }, 3500, egret.Ease.quadIn), egret.Tween.get(this.seaArray[4]).to({
                scaleY: 1.2,
                y: this.seaArray[0].y - 40
            }, 3500, egret.Ease.quadIn)
        }, i.bgPlaying = function () {
            for (var t in this.farArray) this.farArray[t].x -= e.speed / 6, this.farArray[t].x < -this.farArray[t].width && (this.farArray[t].x += 4 * this.farArray[t].width);
            for (var i in this.nearArray) this.nearArray[i].x -= e.speed / 4, this.nearArray[i].x < -this.nearArray[i].width && (this.nearArray[i].x += 4 * this.nearArray[i].width);
            for (var r in this.seaArray) {
                if (this.seaArray[r].x -= e.speed, this.endLine) {
                    var a = this.endLine.parent.localToGlobal(this.endLine.x, this.endLine.y);
                    a.x < 980 && CommonVariable.awardStatus < 3.5 && (SoundEffectManager.playSoundSingle(SoundNames.CHEER, .2), CommonVariable.awardStatus = 3.5), a.x <= 490 && (FrameDelayCaller.clearCallerAt(this), ConcreteSubject.notify(SubjectTypes.GAME_BOATCONTAINERMOVE, a.x - 490))
                }
                if (this.seaArray[r].x < -370 && (this.seaArray[r].x += 362 * this.seaArray.length, this.seaArray[r].parent.addChild(this.seaArray[r]), 10 == CommonVariable.takeSpaceCount && !this.endLine)) {
                    var n = this.seaArmatureArray[r].getSlot("zhongdian_xian");
                    n.display.visible = !0, this.endLine = n.display
                }
            }
            for (var s in this.jidiArray) this.jidiArray[s].x -= e.speed, this.jidiArray[s].x < -980 && (this.jidiArray[s].x = -980);
            this.seaLogo && (this.seaLogo.x -= e.speed, this.seaLogo.x < -650 && (this.seaLogo.x = 1e3))
        }, e.speed = 14.4, e
    }();
    e.BackGroundProxy = t, egret.registerClass(t, "proxy.BackGroundProxy")
}(proxy || (proxy = {}));
var proxy;
!function (e) {
    var t = function () {
        function e() {
            this.takeSpace = 0, this.actionArray = ["start", "run", "ready_speed", "speed_run", "end_speed"], this.easeForwardArray = [null], this.easeBackArray = [null, egret.Ease.sineIn, egret.Ease.cubicIn, egret.Ease.cubicIn], this.dragonBonesBoatPlayer = new bones.DragonBonesBoatPlayer, this.armature = this.dragonBonesBoatPlayer.armature, this.armature.display.x = 142, this.armature.display.y = 300, this.armature.display.anchorOffsetX = 0, this.armature.display.anchorOffsetY = 0;
            var e = this.armature.display;
            this.display = e, this.armature.animation.timeScale = 1, this.subscribe(SubjectTypes.GAME_INIT, this.init),
                this.subscribe(SubjectTypes.TAKE_REALDATA, this.onTakeResult), this.armature.addEventListener(dragonBones.FrameEvent.ANIMATION_FRAME_EVENT, this.customEvent, this), this.display.visible = !1, this.armature.animation.gotoAndPlay("start", 1), TimerDelayCaller.addCallerOnce(null, this.armature.animation.stop, this.armature.animation, 200)
        }

        var t = (__define, e), i = t.prototype;
        return i.subscribe = function (e, t, i) {
            void 0 === i && (i = this), ConcreteSubject.addObserver(this, e, t, i)
        }, i.unsubscribe = function (e) {
            void 0 === e && (e = null), ConcreteSubject.removeObserver(this, e)
        }, i.init = function () {
            this.rankIndex = NaN, TimerDelayCaller.clearCallerAt(this), this.display.visible = !1, egret.Tween.removeTweens(this.display)
        }, i.startToRun = function () {
            this.takeSpace = 0, this.rankIndex = NaN, this.display.visible = !0;
            var e = this.id - 1;
            this.display.y = localData.Cache.boatData[e][1] - 120, this.display.scaleX = this.display.scaleY = .8 * Math.pow(.98, e), this.display.y = 420 - 12 * e, TimerDelayCaller.addCallerOnce(this, function () {
                this.gotoAndPlay("start", 1), egret.Tween.get(this.display, {
                    loop: !1,
                    useTicks: !1,
                    onChange: this.onChange,
                    onChangeObj: this
                }).wait(200 * Math.random()).to({
                    x: 750 + 250 * Math.random(),
                    y: localData.Cache.boatData[this.id - 1][1] - 120,
                    scaleX: .8 * localData.Cache.boatData[this.id - 1][2],
                    scaleY: .8 * localData.Cache.boatData[this.id - 1][2]
                }, 1500).call(this.onComplete, this)
            }, this, 500 * Math.random())
        }, i.onChange = function () {
            var e = this.display.parent.localToGlobal(this.display.x, this.display.y);
            e.x > 980 && !CommonVariable.isBgMoving && (CommonVariable.isBgMoving = !0, ConcreteSubject.notify(SubjectTypes.GAME_BGMOVE))
        }, i.readyToRun = function () {
            this.display.x = -150, this.stop()
        }, i.onComplete = function () {
            this.isSpeedIng && (this.gotoAndPlay("end_speed", 1), this.isSpeedIng = !1);
            var e;
            isNaN(this.rankIndex) ? e = 100 + 850 * Math.random() : (0 == this.takeSpace ? this.takeSpace = 1 : 1 == this.takeSpace && (this.takeSpace = 2, ConcreteSubject.notify(SubjectTypes.TAKE_SPACE)), e = localData.Cache.rankPosition[this.rankIndex] + 50 * Math.random());
            var t, i, r, a = 100 + 200 * Math.random();
            if (e > this.display.x) {
                var n = 100 + 80 * Math.random();
                i = n * this.display.scaleX, t = (e - this.display.x) / i * 1e3, 800 > t && e - this.display.x < 300 && (t = 800 * (1 + .2 * Math.random())), e - this.display.x > 300 && (this.gotoAndPlay("ready_speed", 1), this.isSpeedIng = !0, t > 2e3 && (t = 2e3), t *= .5 * Math.random() + .5, 800 > t && (t = 800)), r = this.easeForwardArray[Math.floor(Math.random() * this.easeForwardArray.length)], e - this.display.x > 450 ? TimerDelayCaller.addCallerOnce(null, this.endSpeed, this, a + t - 300 - 100 * Math.random()) : e - this.display.x > 300 && TimerDelayCaller.addCallerOnce(null, this.endSpeed, this, a + t - 150 - 100 * Math.random())
            } else i = (80 + 50 * Math.random()) * this.display.scaleX, t = (this.display.x - e) / i * 1e3, r = this.easeBackArray[Math.floor(Math.random() * this.easeBackArray.length)];
            isNaN(this.rankIndex) || this.isSpeedIng || (r = null, t = 2500 + 1500 * Math.random()), egret.Tween.get(this.display).wait(a).to({x: e}, t, r).call(this.onComplete, this)
        }, i.endSpeed = function () {
            this.isSpeedIng && (this.gotoAndPlay("end_speed", 1), this.isSpeedIng = !1)
        }, i.gotoAndPlay = function (e, t, i, r) {
            void 0 === t && (t = 0), void 0 === i && (i = 0), void 0 === r && (r = 1);
            var a = this.armature.display;
            a.touchEnabled = !1, this.anms = this.armature.animation.gotoAndPlay(e, 0, -1, t), this.anms.setCurrentTime(i), this.armature.animation.timeScale = r, this.currentAction = e
        }, i.stop = function () {
            this.anms && this.anms.isPlaying && this.anms.stop()
        }, i.customEvent = function (e) {
            switch (this.armature.display, e.frameLabel) {
                case"start_end":
                    this.display.visible ? (ConcreteSubject.notify(SubjectTypes.GAME_SHOWLABEL, this.id), this.gotoAndPlay("run", 0), egret.Tween.removeTweens(this.display), this.onComplete(), egret.Tween.get(this.display).to({
                        y: localData.Cache.boatData[this.id - 1][1] - 120,
                        scaleX: .8 * localData.Cache.boatData[this.id - 1][2],
                        scaleY: .8 * localData.Cache.boatData[this.id - 1][2]
                    }, 2e3 + 10 * Math.random())) : this.stop();
                    break;
                case"run_end":
                    break;
                case"ready_speed_end":
                    this.gotoAndPlay("speed_run", 0);
                    break;
                case"speed_run_end":
                    break;
                case"end_speed_end":
                    this.gotoAndPlay("run", 0)
            }
        }, i.onTakeResult = function (e) {
            this.rankIndex = e.indexOf(this.id), this.isSpeedIng || (egret.Tween.removeTweens(this.display), this.onComplete())
        }, e
    }();
    e.BoatPlayerProxy = t, egret.registerClass(t, "proxy.BoatPlayerProxy", ["IObserver"])
}(proxy || (proxy = {}));
var proxy;
!function (e) {
    var t = function () {
        function e(e) {
            this.numContainer = new Sprite, this.isTip60 = !1, this.dragonBonesClock = new bones.DragonBonesClock, this.armature = this.dragonBonesClock.armature, this.container = e;
            var t = this.armature.display;
            this.display = t, this.armature.animation.timeScale = 1, this.subscribe(SubjectTypes.GAME_INIT, this.init), this.armature.display.visible = !1, this.armature.addEventListener(dragonBones.FrameEvent.ANIMATION_FRAME_EVENT, this.customEvent, this), this.yellow_b = new disDev.AnimationLite(10, "timeNumYellow", 1, 4, 1, (!1)), this.yellow_b.anchorOffsetX = 17, this.yellow_b.anchorOffsetY = 19, this.numContainer.addChild(this.yellow_b), this.yellow_s = new disDev.AnimationLite(10, "timeNumYellow", 1, 4, 1, (!1)), this.yellow_s.anchorOffsetX = 17, this.yellow_s.anchorOffsetY = 19, this.numContainer.addChild(this.yellow_s), this.yellow_g = new disDev.AnimationLite(10, "timeNumYellow", 1, 4, 1, (!1)), this.yellow_g.anchorOffsetX = 17, this.yellow_g.anchorOffsetY = 19, this.numContainer.addChild(this.yellow_g), this.yellow_b.scaleX = this.yellow_b.scaleY = 1.3, this.yellow_s.scaleX = this.yellow_s.scaleY = 1.3, this.yellow_g.scaleX = this.yellow_g.scaleY = 1.3, this.red_s = new disDev.AnimationLite(10, "timeNumRed", 1, 4, 1, (!1)), this.red_s.anchorOffsetX = 29, this.red_s.anchorOffsetY = 34, this.numContainer.addChild(this.red_s), this.red_g = new disDev.AnimationLite(10, "timeNumRed", 1, 4, 1, (!1)), this.red_g.anchorOffsetX = 29, this.red_g.anchorOffsetY = 34, this.numContainer.addChild(this.red_g), this.subscribe(SubjectTypes.OVER_TIME, this.overTime)
        }

        var t = (__define, e), i = t.prototype;
        return i.subscribe = function (e, t, i) {
            void 0 === i && (i = this), ConcreteSubject.addObserver(this, e, t, i)
        }, i.unsubscribe = function (e) {
            void 0 === e && (e = null), ConcreteSubject.removeObserver(this, e)
        }, i.init = function () {
            this.numContainer.visible = !1, egret.Tween.removeTweens(this.numContainer), egret.Tween.removeTweens(this.red_g), this.red_g.scaleX = this.red_g.scaleY = 1, this.numContainer.scaleX = this.numContainer.scaleY = 1
        }, i.overTime = function () {
            clearInterval(this.internalID), clearTimeout(this.hideID), this.init()
        }, i.startRun = function () {
            CommonVariable.timeInterval < 10 && (CommonVariable.timeInterval = 10), CommonVariable.timeInterval += 1, this.runHandler(), clearInterval(this.internalID), this.internalID = setInterval(this.runHandler.bind(this), 1e3)
        }, i.runHandler = function () {
            CommonVariable.timeInterval -= 1;
            var e = CommonVariable.timeInterval;
            e >= 60 && !this.isTip60 && (this.isTip60 = !1), 60 > e && !this.isTip60 && (this.isTip60 = !0, this.turnBlack(), ConcreteSubject.notify(SubjectTypes.GAME_UNMONI)), e > 999 ? e = 999 : 0 > e && (e = 0);
            var t, i, r;
            e > 99 ? (this.yellow_b.visible = !0, this.yellow_s.visible = !0, this.yellow_g.visible = !0, this.red_s.visible = !1, this.red_g.visible = !1, t = Number(e.toString().substr(0, 1)), i = Number(e.toString().substr(1, 1)), r = Number(e.toString().substr(2, 1)), 0 == t && (t = 10), 0 == i && (i = 10), 0 == r && (r = 10), this.yellow_b.gotoAndStop(t), this.yellow_s.gotoAndStop(i), this.yellow_g.gotoAndStop(r), this.yellow_b.x = -26, this.yellow_s.x = 0, this.yellow_g.x = 26) : e > 20 && 99 >= e ? (this.yellow_b.visible = !1, this.yellow_s.visible = !0, this.yellow_g.visible = !0, this.red_s.visible = !1, this.red_g.visible = !1, i = Number(e.toString().substr(0, 1)), r = Number(e.toString().substr(1, 1)), 0 == i && (i = 10), 0 == r && (r = 10), this.yellow_s.gotoAndStop(i), this.yellow_g.gotoAndStop(r), this.yellow_s.x = -14, this.yellow_g.x = 14) : e > 9 && 20 >= e ? (this.yellow_b.visible = !1, this.yellow_s.visible = !1, this.yellow_g.visible = !1, this.red_s.visible = !0, this.red_g.visible = !0, i = Number(e.toString().substr(0, 1)), r = Number(e.toString().substr(1, 1)), 0 == i && (i = 10), 0 == r && (r = 10), this.red_g.scaleX = this.red_g.scaleY = 1, this.red_s.gotoAndStop(i), this.red_g.gotoAndStop(r), this.red_s.x = -16, this.red_g.x = 10) : e >= 0 && 9 >= e && (this.yellow_b.visible = !1, this.yellow_s.visible = !1, this.yellow_g.visible = !1, this.red_s.visible = !1, this.red_g.visible = !0, r = e, 0 == r && (r = 10), this.red_g.gotoAndStop(r), this.red_g.x = 0, CommonVariable.awardStatus < 2 && (this.red_g.scaleX = this.red_g.scaleY = .5, egret.Tween.removeTweens(this.red_g), egret.Tween.get(this.red_g).to({
                scaleX: 1.4,
                scaleY: 1.4
            }, 150, egret.Ease.cubicIn))), CommonVariable.timeInterval <= 9 && CommonVariable.timeInterval > 0 ? SoundEffectManager.playSound(SoundNames.SECONDS) : 0 == CommonVariable.timeInterval && CommonVariable.awardStatus < 2 && SoundEffectManager.playSound(SoundNames.LAST_SECONDS), CommonVariable.timeInterval <= 0 && CommonVariable.awardStatus < 2 && (CommonVariable.awardStatus = 2, CommonVariable.isSimulating = !1, this.hideID = setTimeout(function () {
                ConcreteSubject.notify(SubjectTypes.HIDE_BTN)
            }, 250))
        }, i.show = function () {
            this.gotoAndPlay("in", 1), this.armature.display.visible = !0, CommonVariable.timeInterval < 65 ? (this.turnBlack(), this.isTip60 = !0) : (this.turnBlue(), this.isTip60 = !1)
        }, i.hide = function () {
            var e = this;
            egret.Tween.get(this.numContainer).to({scaleX: .1, scaleY: .1}, 100, egret.Ease.cubicIn).call(function () {
                e.numContainer.visible = !1
            }), this.gotoAndPlay("out", 1, 0, 3)
        }, i.gotoAndPlay = function (e, t, i, r) {
            void 0 === t && (t = 0), void 0 === i && (i = 0), void 0 === r && (r = 1);
            var a = this.armature.display;
            a.touchEnabled = !1, this.anms = this.armature.animation.gotoAndPlay(e, -1, -1, t), this.anms.setCurrentTime(i), this.armature.animation.timeScale = r, this.currentAction = e
        }, i.stop = function () {
            this.anms && this.anms.isPlaying && this.anms.stop()
        }, i.customEvent = function (e) {
            switch (this.armature.display, e.frameLabel) {
                case"in_end":
                    this.gotoAndPlay("await", 0);
                    break;
                case"out_end":
                    this.armature.display.visible = !1, this.stop(), ConcreteSubject.notify(SubjectTypes.GAME_START);
                    break;
                case"show_btn":
                    ConcreteSubject.notify(SubjectTypes.SHOW_BTN), this.startRun(), this.container.addChild(this.numContainer), this.numContainer.visible = !0, this.numContainer.x = this.display.x + 4, this.numContainer.y = this.display.y + 4, this.numContainer.scaleX = this.numContainer.scaleY = .1, egret.Tween.get(this.numContainer).to({
                        scaleX: 1,
                        scaleY: 1
                    }, 200, egret.Ease.backOut)
            }
        }, i.turnBlue = function () {
            var e = bones.DragonBonesClock.dragonbonesFactory.getTextureDisplay("time_neiquan"),
                t = this.armature.getSlot("time_neiquan1");
            t.display = e
        }, i.turnBlack = function () {
            var e = bones.DragonBonesClock.dragonbonesFactory.getTextureDisplay("time_neiquan1"),
                t = this.armature.getSlot("time_neiquan1");
            t.display = e
        }, i.showTime = function () {
        }, e
    }();
    e.ClockProxy = t, egret.registerClass(t, "proxy.ClockProxy", ["IObserver"])
}(proxy || (proxy = {}));
var proxy;
!function (e) {
    var t = function () {
        function t(e) {
            this.container = e, this.container1 = new Sprite, this.container2 = new Sprite, e.addChild(this.container1), e.addChild(this.container2), this.shipArray = [], this.subscribe(SubjectTypes.GAME_START, this.onGameStart), this.subscribe(SubjectTypes.GAME_END, this.onGameEnd), this.subscribe(SubjectTypes.OVER_TIME, this.init), this.subscribe(SubjectTypes.GAME_SCREENREADY, this.onScreenReady)
        }

        var i = (__define, t), r = i.prototype;
        return r.subscribe = function (e, t, i) {
            void 0 === i && (i = this), ConcreteSubject.addObserver(this, e, t, i)
        }, r.unsubscribe = function (e) {
            void 0 === e && (e = null), ConcreteSubject.removeObserver(this, e)
        }, r.init = function () {
            FrameDelayCaller.clearCallerAt(this);
            for (var e in this.shipArray) this.shipArray[e].destroy();
            this.shipArray = [], this.container.x = 0, egret.clearTimeout(this.buildID1), egret.clearTimeout(this.buildID2)
        }, r.onGameEnd = function () {
            this.container.x = 0
        }, r.onGameStart = function () {
            var e = this.shipArray.concat();
            for (var t in e) {
                egret.Tween.removeTweens(e[t].armature.display);
                var i = e[t].armature.display;
                if (i.x + i.width < 100 || i.x - i.width > 1080) {
                    var r = this.shipArray.indexOf(e[t]);
                    this.shipArray[r].destroy(), this.shipArray.splice(r, 1)
                }
            }
            egret.clearTimeout(this.buildID1), egret.clearTimeout(this.buildID2), FrameDelayCaller.addCallerRepeat(this, this.moving, this, 1, 0)
        }, r.moving = function () {
            this.container.x += 2 * e.BackGroundProxy.speed
        }, r.onScreenReady = function () {
            FrameDelayCaller.clearCallerAt(this);
            for (var e in this.shipArray) this.shipArray[e].destroy();
            this.shipArray = []
        }, r.begin = function () {
            this.buildID1 = egret.setTimeout(this.buildAndPlay1, this, 5e3 * Math.random()), this.buildID2 = egret.setTimeout(this.buildAndPlay2, this, 5e3 * Math.random())
        }, r.buildAndPlay1 = function () {
            egret.clearTimeout(this.buildID1);
            var e = this.build();
            e.armature.display.x = 980, e.armature.display.y = 200 + 100 * Math.random(), e.armature.display.scaleY = .7 + .3 * (e.armature.display.y - 200) / 450, e.armature.display.scaleX = -e.armature.display.scaleY, this.container1.addChild(e.armature.display), egret.Tween.get(e.armature.display).to({x: -1650}, 28e3 + 2e3 * Math.random()).call(this.onComplete, this, [e]), this.shipArray.push(e), this.buildID1 = egret.setTimeout(this.buildAndPlay1, this, 18e3)
        }, r.buildAndPlay2 = function () {
            egret.clearTimeout(this.buildID2);
            var e = this.build();
            e.armature.display.x = 0, e.armature.display.y = 400 + 180 * Math.random(), e.armature.display.scaleY = .7 + .3 * (e.armature.display.y - 200) / 450, e.armature.display.scaleX = e.armature.display.scaleY, this.container2.addChild(e.armature.display), egret.Tween.get(e.armature.display).to({x: 2800}, 28e3 + 2e3 * Math.random()).call(this.onComplete, this, [e]), this.shipArray.push(e), this.buildID2 = egret.setTimeout(this.buildAndPlay2, this, 18e3)
        }, r.onComplete = function (e) {
            var t = this.shipArray.indexOf(e);
            this.shipArray.splice(t, 1), e.destroy()
        }, r.build = function () {
            var e;
            return Math.random() > .7 ? (e = new bones.DragonBonesShip1, e.armature.animation.gotoAndPlay("run")) : (e = new bones.DragonBonesShip2, e.armature.animation.gotoAndPlay("run")), e
        }, t
    }();
    e.ShipProxy = t, egret.registerClass(t, "proxy.ShipProxy", ["IObserver"])
}(proxy || (proxy = {}));
var SubjectBase = function () {
    function e() {
        this.observerCollection = {}, this.subjectTypeCollection = {}, this.callBackFunctionsArrayCollection = {}, this.notifyCollection = {}, this.obsArray = new Array, this.keyArray = new Array, this.currentKey = 0
    }

    var t = (__define, e), i = t.prototype;
    return i.addObserver = function (e, t, i, r) {
        if (null == i) throw new Error("閿欒锛氭彁渚涚粰 ConcreteSubject 鐨勫洖璋冨嚱鏁颁笉鑳戒负null");
        var a = this.getKeyByObserver(e);
        "undefined" == a && (a = this.createKeyByObserver(e)), (null == this.observerCollection[a] || null == this.observerCollection[a][t]) && (null == this.observerCollection[a] && (this.observerCollection[a] = {}), this.observerCollection[a][t] = i, null == this.callBackFunctionsArrayCollection[t] && (this.callBackFunctionsArrayCollection[t] = new Array), this.callBackFunctionsArrayCollection[t].push(i.bind(r)), null == this.subjectTypeCollection[t] && (this.subjectTypeCollection[t] = new Array), this.subjectTypeCollection[t].push(e))
    }, i.removeObserver = function (e, t) {
        void 0 === t && (t = null);
        var i = this.getKeyByObserver(e);
        if ("undefined" != i) {
            var r;
            if (null == t || "" == t) {
                for (var a in this.observerCollection[i]) r = this.callBackFunctionsArrayCollection[a].indexOf(this.observerCollection[i][a]), this.callBackFunctionsArrayCollection[a].splice(r, 1), delete this.observerCollection[i][a], r = this.subjectTypeCollection[a].indexOf(e), this.subjectTypeCollection[a].splice(r, 1), 0 == this.subjectTypeCollection[a].length && delete this.subjectTypeCollection[a];
                delete this.observerCollection[i]
            } else {
                if (null == this.observerCollection[i][t]) return;
                r = this.callBackFunctionsArrayCollection[t].indexOf(this.observerCollection[i][t]), this.callBackFunctionsArrayCollection[t].splice(r, 1), delete this.observerCollection[i][t], r = this.subjectTypeCollection[t].indexOf(e), this.subjectTypeCollection[t].splice(r, 1), 0 == this.subjectTypeCollection[t].length && delete this.subjectTypeCollection[t];
                for (a in this.observerCollection[i]) if (this.observerCollection[i][a]) return;
                this.clearKeyByObserver(e), delete this.observerCollection[i]
            }
        }
    }, i.notify = function (e) {
        for (var t = [], i = 1; i < arguments.length; i++) t[i - 1] = arguments[i];
        if (null != this.callBackFunctionsArrayCollection[e]) {
            this.notifyingSubjectType = e;
            var r = this.callBackFunctionsArrayCollection[e].concat();
            for (var a in r) {
                var n = r[a];
                null != n && n.call.apply(n, [null].concat(t))
            }
            this.notifyingSubjectType = null
        }
    }, i.notifyWeakly = function (e) {
        for (var t = [], i = 1; i < arguments.length; i++) t[i - 1] = arguments[i];
        if (null != this.callBackFunctionsArrayCollection[e]) {
            if (null != this.notifyCollection[e]) return this.notifyCollection[e] = null, delete this.notifyCollection[e], void(this.notifyingSubjectType = null);
            this.notifyCollection[e] = !0, this.notifyingSubjectType = e;
            var r = this.callBackFunctionsArrayCollection[e].concat();
            for (var a in r) {
                var n = r[a];
                null != n && n.call.apply(n, [null].concat(t))
            }
            this.notifyCollection[e] = null, delete this.notifyCollection[e], this.notifyingSubjectType = null
        }
    }, i.getObserversFromSubjectType = function (e) {
        var t;
        return null != this.subjectTypeCollection[e] && (t = this.subjectTypeCollection[e].concat()), t
    }, i.hasObserverAndSubjectType = function (e, t) {
        var i = this.getKeyByObserver(e);
        return null != this.observerCollection[i] && null != this.observerCollection[i][t]
    }, i.getSubjectTypesFromObserver = function (e) {
        var t, i = this.getKeyByObserver(e);
        if ("undefined" != i) {
            t = new Array;
            for (var r in this.observerCollection[i]) t.push(r)
        }
        return t
    }, i.getCurrentSubject = function () {
        return this.notifyingSubjectType
    }, i.getKeyByObserver = function (e) {
        var t = this.obsArray.indexOf(e);
        return -1 == t ? "undefined" : this.keyArray[t]
    }, i.createKeyByObserver = function (e) {
        return this.obsArray.push(e), this.keyArray.push("key" + this.currentKey.toString()), ("key" + this.currentKey++).toString()
    }, i.clearKeyByObserver = function (e) {
        var t = this.obsArray.indexOf(e);
        this.obsArray.splice(t, 1), this.keyArray.splice(t, 1)
    }, e
}();
egret.registerClass(SubjectBase, "SubjectBase", ["ISubject"]);
var ConcreteSubject = function () {
    function e() {
        throw new Error(e.__class__ + " 鏄潤鎬佹垚鍛橀泦鎴愮被锛屾棤闇€瀹炰緥鍖�")
    }

    var t = (__define, e);
    return t.prototype, e.addObserver = function (t, i, r, a) {
        e.subjectObj.addObserver(t, i, r, a)
    }, e.removeObserver = function (t, i) {
        void 0 === i && (i = null), e.subjectObj.removeObserver(t, i)
    }, e.notify = function (t) {
        for (var i = [], r = 1; r < arguments.length; r++) i[r - 1] = arguments[r];
        (a = e.subjectObj).notify.apply(a, [t].concat(i));
        var a
    }, e.notifyWeakly = function (t) {
        for (var i = [], r = 1; r < arguments.length; r++) i[r - 1] = arguments[r];
        (a = e.subjectObj).notifyWeakly.apply(a, [t].concat(i));
        var a
    }, e.getObserversFromSubjectType = function (t) {
        return e.subjectObj.getObserversFromSubjectType(t)
    }, e.hasObserverAndSubjectType = function (t, i) {
        return e.subjectObj.hasObserverAndSubjectType(t, i)
    }, e.getSubjectTypesFromObserver = function (t) {
        return e.subjectObj.getSubjectTypesFromObserver(t)
    }, e.getCurrentSubject = function () {
        return e.subjectObj.getCurrentSubject()
    }, e.subjectObj = new SubjectBase, e
}();
egret.registerClass(ConcreteSubject, "ConcreteSubject");
var ObserverBase = function () {
    function e(e) {
        this.subjectObj = e
    }

    var t = (__define, e), i = t.prototype;
    return i.subscribe = function (e, t, i) {
        void 0 === i && (i = this), this.subjectObj.addObserver(this, e, t, i)
    }, i.unsubscribe = function (e) {
        void 0 === e && (e = null), this.subjectObj.removeObserver(this, e)
    }, e
}();
egret.registerClass(ObserverBase, "ObserverBase", ["IObserver"]);