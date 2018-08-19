var gamekey = 'bjpk10',//游戏key
    apiurl = '';//请求地址

setApiurl();

//检查是否提交请求
function setApiurl() {
  

    if (checkStorage('token') && checkStorage('host')) {
        var host = getStorage('host'),
            tk = getStorage('token');
        apiurl = host + '/event/present_expect?gamekey=' + gamekey + '&tk=' + tk;
    } else {
        objCount.innerHTML = '登陆错误';
        console.log(objCount);
        return false;
    }
}

var __reflect = this && this.__reflect || function (t, n, a) {
    t.__class__ = n, a ? a.push(n) : a = [n], t.__types__ = t.__types__ ? a.concat(t.__types__) : a
}, game;
!function (t) {
    var n = function () {
        function t() {
        }

        return t.getDataIndex = function () {
            return this._dataIndex == -1 && ("dataindex" in this.webParams ? this._dataIndex = this.webParams.dataindex : this._dataIndex = 0), this._dataIndex
        }, t.getIndexURLByName = function (t) {
            var n = this.getDataIndex();
            return apiurl;//获取数据
        },/*t.actionCount = function (n, a) {
            try {
                videoStat(t.CATEGORY, n, a)
            } catch (_) {
                console.log("error action")
            }
        }, */t
    }();
    n.STAGE_WIDTH = 980, n.STAGE_HEIGHT = 630, n.NUM = 10, n.PLAY_ENABLED_TIME = 25, n.SIMULATE_TIME = 12, n.SIMULATE_ENABLE = 30, n.CAR_START_POINT = 500, n.CAR_GO_DELAY_MS = 1200, n._dataIndex = -1, n.CATEGORY = "pk10_flash", n.ACTION_CLICK = "click", n.SOUND_BGM = "SoundBGM_mp3", n.SOUND_COUNTDOWN_MIN = "SoundCountDownmin_mp3", n.SOUND_COUNT_DOWN = "SoundCountDown_mp3", n.SOUND_HAIL = "SoundHail_mp3", n.SOUND_ZHONG = "Soundzhong_mp3", n.SOUND_GO = "SoundGo_mp3", n.SOUND_READY = "SoundReady_mp3", n.SOUND_WIN = "Soundwin_mp3", t.GameConst = n, __reflect(n.prototype, "game.GameConst")
}(game || (game = {}));