function log(e) {
    for (var t = [], o = 1; o < arguments.length; o++) t[o - 1] = arguments[o];
    console.log.apply(null, t)
}

var __reflect = this && this.__reflect || function (e, t, o) {
    e.__class__ = t, o ? o.push(t) : o = [t], e.__types__ = e.__types__ ? o.concat(e.__types__) : o
}, __extends = this && this.__extends || function (e, t) {
    function o() {
        this.constructor = e
    }

    for (var s in t) t.hasOwnProperty(s) && (e[s] = t[s]);
    e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o)
}, Main = function (e) {
    function t() {
        var t = e.call(this) || this;
        return t.versionDate = "201708091631", t.isResourceLoadEnd = !1, t.isThemeLoadEnd = !1, t.once(egret.Event.ADDED_TO_STAGE, t.onAdded, t), t
    }

    return __extends(t, e), t.prototype.onAdded = function (e) {
        this.initParams(), this.showVersion()
    }, t.prototype.showVersion = function () {
        var e = "true" == game.GameConst.webParams.showver;
        if (e) {
            var t = new egret.TextField;
            t.text = "ver." + this.versionDate, t.size = 12, t.x = 10, t.y = this.stage.stageHeight - 15, t.cacheAsBitmap = !0, this.stage.addChild(t)
        }
    }, t.prototype.initParams = function () {
        game.GameConst.webParams = document.getElementById("paramters").dataset, game.GameConst.resHost = game.GameConst.webParams.reshost, document.getElementById("preloading").style.display = "none"
    }, t.prototype.createChildren = function () {
        e.prototype.createChildren.call(this), this.initParams(), document.getElementById("preloading").style.display = "none", game.GameConst.webParams = document.getElementById("paramters").dataset;
        var t = new AssetAdapter;
        egret.registerImplementation("eui.IAssetAdapter", t), egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter), this.preloadingView = new PreLoadingUI, this.addChild(this.preloadingView), RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        var o = game.GameConst.webParams.reshost;
        RES.loadConfig(o + "/resource/default.res.json", o + "/resource/")
    }, t.prototype.onConfigComplete = function (e) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        var t = game.GameConst.webParams.reshost, o = new eui.Theme(t + "/resource/default.thm.json", this.stage);
        o.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this), RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this), RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this), RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this), RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this), RES.loadGroup("preload")
    }, t.prototype.onResourceLoadComplete = function (e) {
        "preload" == e.groupName ? (this.removeChild(this.preloadingView), this.preloadingView = null, this.isResourceLoadEnd = !0, this.createLoading()) : "run" == e.groupName && (RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this), RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this), RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this), RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this), this.startCreateScene())
    }, t.prototype.onThemeLoadComplete = function () {
        this.isThemeLoadEnd = !0, this.createLoading()
    }, t.prototype.createLoading = function () {
        this.isThemeLoadEnd && this.isResourceLoadEnd && (this.loadingView = new LoadingUI, this.addChild(this.loadingView), RES.loadGroup("run"), this.loadingView.setProgress(0, 1))
    }, t.prototype.onItemLoadError = function (e) {
        console.warn("Url:" + e.resItem.url + " has failed to load")
    }, t.prototype.onResourceLoadError = function (e) {
        console.warn("Group:" + e.groupName + " has failed to load"), this.onResourceLoadComplete(e)
    }, t.prototype.onResourceProgress = function (e) {
        "preload" == e.groupName ? this.preloadingView.setProgress(e.itemsLoaded, e.itemsTotal) : "run" == e.groupName && this.loadingView.setProgress(e.itemsLoaded, e.itemsTotal)
    }, t.prototype.startCreateScene = function () {
        game.GameConst.urlConfig = RES.getRes("urlConfig_json"), game.DataManager.init(), game.DataManager.updateAwardData(), game.DataEventDispatcher.addEventListener(game.GameEventType.AWARD_DATA, this.onAwardDataUpdate, this), this.loadingView.showLab()
    }, t.prototype.onAwardDataUpdate = function (e) {
        game.DataEventDispatcher.removeEventListener(game.GameEventType.AWARD_DATA, this.onAwardDataUpdate, this), this.removeChild(this.loadingView), this.loadingView = null;
        var t = new game.GameLogic;
        this.stage.addChildAt(t, 0), this.stage.removeChild(this)
    }, t
}(eui.UILayer);
__reflect(Main.prototype, "Main");