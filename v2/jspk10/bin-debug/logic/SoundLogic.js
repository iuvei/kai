var __reflect=this&&this.__reflect||function(n,a,e){n.__class__=a,e?e.push(a):e=[a],n.__types__=n.__types__?e.concat(n.__types__):e},game;!function(n){var a=function(){function a(){}return a.init=function(){a.isMute=!0,a.loadSound(),n.DataEventDispatcher.addEventListener(n.GameEventType.STATUS_CHANGE,a.statusChange,a),n.DataEventDispatcher.addEventListener(n.GameEventType.MINI_GAME_STATE,a.isMiniState,a),n.DataEventDispatcher.addEventListener(n.GameEventType.COUNT_DOWN_TICK,a.onCountDown,a),n.DataEventDispatcher.addEventListener(n.GameEventType.START_ANIM_COMPLETE,a.onAnimateComplete,a)},a.loadSound=function(){n.SoundManager.setBGM(n.GameConst.SOUND_BGM),n.SoundManager.setBGMVolume(.5),n.SoundManager.loadSound(n.GameConst.SOUND_COUNTDOWN_MIN),n.SoundManager.loadSound(n.GameConst.SOUND_COUNT_DOWN),n.SoundManager.loadSound(n.GameConst.SOUND_HAIL),n.SoundManager.loadSound(n.GameConst.SOUND_ZHONG),n.SoundManager.loadSound(n.GameConst.SOUND_GO),n.SoundManager.loadSound(n.GameConst.SOUND_READY),n.SoundManager.loadSound(n.GameConst.SOUND_WIN)},a.onAnimateComplete=function(a){n.SoundManager.stopSound(n.GameConst.SOUND_GO),n.SoundManager.playSound(n.GameConst.SOUND_ZHONG,0)},a.isMiniState=function(n){var e=n.data;e?(a._miniBeforeMute=a._isMute,a.isMute=!0):a.isMute=a._miniBeforeMute},a.onCountDown=function(a){var e=a.data;e>0&&e<=10?n.SoundManager.playSound(n.GameConst.SOUND_COUNT_DOWN,1):0==e&&n.SoundManager.playSound(n.GameConst.SOUND_COUNTDOWN_MIN,1)},Object.defineProperty(a,"isMute",{get:function(){return this._isMute},set:function(a){this._isMute=a;var e=n.GameGlobal.status;n.SoundManager.setBGMVolume(a?0:e==n.Status.standby?.5:.3),n.SoundManager.setAllEffectSoundVolume(a?0:1)},enumerable:!0,configurable:!0}),a.initSound=function(){n.SoundManager.initAllSound(),this._inited||(this._inited=!0,n.SoundManager.playBGM())},a.statusChange=function(a){var e=this._status=a.data;switch(e){case n.Status.standby:this._isMute||n.SoundManager.setBGMVolume(.5);break;case n.Status.readyAnimate:n.SoundManager.playSound(n.GameConst.SOUND_READY,0);break;case n.Status.goAnimate:n.SoundManager.stopSound(n.GameConst.SOUND_READY),n.SoundManager.playSound(n.GameConst.SOUND_GO,1);break;case n.Status.start:this._isMute||n.SoundManager.setBGMVolume(.3);break;case n.Status.stop:n.SoundManager.stopSound(n.GameConst.SOUND_ZHONG);break;case n.Status.photo:n.SoundManager.playSound(n.GameConst.SOUND_WIN,1);break;case n.Status.finish:break;case n.Status.over:n.SoundManager.stopSound(n.GameConst.SOUND_ZHONG),n.SoundManager.playSound(n.GameConst.SOUND_HAIL,1)}},a}();a._miniBeforeMute=!1,a._count=0,a._inited=!1,n.SoundLogic=a,__reflect(a.prototype,"game.SoundLogic")}(game||(game={}));