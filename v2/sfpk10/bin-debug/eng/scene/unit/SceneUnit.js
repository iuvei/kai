var __reflect=this&&this.__reflect||function(t,e,n){t.__class__=e,n?n.push(e):n=[e],t.__types__=t.__types__?n.concat(t.__types__):n},__extends=this&&this.__extends||function(t,e){function n(){this.constructor=t}for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o]);t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)},game;!function(t){var e=function(e){function n(){var t=e.call(this)||this;return t._speed=0,t._status=0,t}return __extends(n,e),Object.defineProperty(n.prototype,"ai",{get:function(){return this._ai},set:function(t){this._ai=t},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"num",{get:function(){return this._num},set:function(t){this._num=t},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"rank",{get:function(){return this._rank},set:function(t){this._rank=t},enumerable:!0,configurable:!0}),n.prototype.stop=function(){},n.prototype.play=function(){},n.prototype.setData=function(t){this._data=t,this._num=t.number},Object.defineProperty(n.prototype,"speed",{get:function(){return this._speed},set:function(t){this._speed=t},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"status",{get:function(){return this._status},set:function(t){this._status=t},enumerable:!0,configurable:!0}),n.prototype.move=function(){},n.prototype.reset=function(){this.status=t.UnitStatus.standby,this._speed=0,this._ai.reset()},n.prototype.onLoop=function(){this._ai&&this._ai.onLoop()},n.prototype.resetObject=function(){this._data=null,this.parent&&this.parent.removeChild(this)},Object.defineProperty(n.prototype,"data",{get:function(){return this._data},enumerable:!0,configurable:!0}),n}(egret.Sprite);t.SceneUnit=e,__reflect(e.prototype,"game.SceneUnit",["game.IAIObject","game.iPoolObject"])}(game||(game={}));