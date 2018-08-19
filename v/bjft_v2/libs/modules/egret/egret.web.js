var __reflect = this && this.__reflect || function (e, t, r) {
    e.__class__ = t, r ? r.push(t) : r = [t], e.__types__ = e.__types__ ? r.concat(e.__types__) : r
}, __extends = this && this.__extends || function (e, t) {
    function r() {
        this.constructor = e
    }

    for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
    e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
};
void 0 == window.HTMLVideoElement && (window.HTMLVideoElement = HTMLDivElement);
var egret;
!function (e) {
    var t;
    !function (t) {
        var r = "egret.BitmapData";
        e.registerClass(HTMLImageElement, r), e.registerClass(HTMLCanvasElement, r), e.registerClass(HTMLVideoElement, r)
    }(t = e.web || (e.web = {}))
}(egret || (egret = {})), function (e) {
    function t(t) {
        return t.hashCode = t.$hashCode = e.$hashCount++, t
    }

    e.$toBitmapData = t
}(egret || (egret = {}));
var egret;
!function (e) {
    var t;
    !function (e) {
        var t = function () {
            function e() {
            }

            return e
        }();
        t.blur_frag = "precision mediump float;\nuniform vec2 blur;\nuniform sampler2D uSampler;\nvarying vec2 vTextureCoord;\nuniform vec2 uTextureSize;\nvoid main()\n{\n    const int sampleRadius = 5;\n    const int samples = sampleRadius * 2 + 1;\n    vec2 blurUv = blur / uTextureSize;\n    vec4 color = vec4(0, 0, 0, 0);\n    vec2 uv = vec2(0.0, 0.0);\n    blurUv /= float(sampleRadius);\n    for (int i = -sampleRadius; i <= sampleRadius; i++) {\n        uv.x = vTextureCoord.x + float(i) * blurUv.x;\n        uv.y = vTextureCoord.y + float(i) * blurUv.y;\n        color += texture2D(uSampler, uv);\n    }\n    color /= float(samples);\n    gl_FragColor = color;\n}", t.colorTransform_frag = "precision mediump float;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nuniform mat4 matrix;\nuniform vec4 colorAdd;\nuniform sampler2D uSampler;\nvoid main(void) {\n    vec4 texColor = texture2D(uSampler, vTextureCoord);\n    if(texColor.a > 0.) {\n        texColor = vec4(texColor.rgb / texColor.a, texColor.a);\n    }\n    vec4 locColor = clamp(texColor * matrix + colorAdd, 0., 1.);\n    gl_FragColor = vColor * vec4(locColor.rgb * locColor.a, locColor.a);\n}", t.default_vert = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec2 aColor;\nuniform vec2 projectionVector;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nconst vec2 center = vec2(-1.0, 1.0);\nvoid main(void) {\n   gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);\n   vTextureCoord = aTextureCoord;\n   vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);\n}", t.glow_frag = "precision mediump float;\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform float dist;\nuniform float angle;\nuniform vec4 color;\nuniform float alpha;\nuniform float blurX;\nuniform float blurY;\nuniform float strength;\nuniform float inner;\nuniform float knockout;\nuniform float hideObject;\nuniform vec2 uTextureSize;\nfloat random(vec3 scale, float seed)\n{\n    return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);\n}\nvoid main(void) {\n    vec2 px = vec2(1.0 / uTextureSize.x, 1.0 / uTextureSize.y);\n    const float linearSamplingTimes = 7.0;\n    const float circleSamplingTimes = 12.0;\n    vec4 ownColor = texture2D(uSampler, vTextureCoord);\n    vec4 curColor;\n    float totalAlpha = 0.0;\n    float maxTotalAlpha = 0.0;\n    float curDistanceX = 0.0;\n    float curDistanceY = 0.0;\n    float offsetX = dist * cos(angle) * px.x;\n    float offsetY = dist * sin(angle) * px.y;\n    const float PI = 3.14159265358979323846264;\n    float cosAngle;\n    float sinAngle;\n    float offset = PI * 2.0 / circleSamplingTimes * random(vec3(12.9898, 78.233, 151.7182), 0.0);\n    float stepX = blurX * px.x / linearSamplingTimes;\n    float stepY = blurY * px.y / linearSamplingTimes;\n    for (float a = 0.0; a <= PI * 2.0; a += PI * 2.0 / circleSamplingTimes) {\n        cosAngle = cos(a + offset);\n        sinAngle = sin(a + offset);\n        for (float i = 1.0; i <= linearSamplingTimes; i++) {\n            curDistanceX = i * stepX * cosAngle;\n            curDistanceY = i * stepY * sinAngle;\n            \n            curColor = texture2D(uSampler, vec2(vTextureCoord.x + curDistanceX - offsetX, vTextureCoord.y + curDistanceY + offsetY));\n            totalAlpha += (linearSamplingTimes - i) * curColor.a;\n            maxTotalAlpha += (linearSamplingTimes - i);\n        }\n    }\n    ownColor.a = max(ownColor.a, 0.0001);\n    ownColor.rgb = ownColor.rgb / ownColor.a;\n    float outerGlowAlpha = (totalAlpha / maxTotalAlpha) * strength * alpha * (1. - inner) * max(min(hideObject, knockout), 1. - ownColor.a);\n    float innerGlowAlpha = ((maxTotalAlpha - totalAlpha) / maxTotalAlpha) * strength * alpha * inner * ownColor.a;\n    ownColor.a = max(ownColor.a * knockout * (1. - hideObject), 0.0001);\n    vec3 mix1 = mix(ownColor.rgb, color.rgb, innerGlowAlpha / (innerGlowAlpha + ownColor.a));\n    vec3 mix2 = mix(mix1, color.rgb, outerGlowAlpha / (innerGlowAlpha + ownColor.a + outerGlowAlpha));\n    float resultAlpha = min(ownColor.a + outerGlowAlpha + innerGlowAlpha, 1.);\n    gl_FragColor = vec4(mix2 * resultAlpha, resultAlpha);\n}", t.primitive_frag = "precision lowp float;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvoid main(void) {\n    gl_FragColor = vColor;\n}", t.texture_frag = "precision lowp float;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nuniform sampler2D uSampler;\nvoid main(void) {\n    gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor;\n}", e.EgretShaderLib = t, __reflect(t.prototype, "egret.web.EgretShaderLib")
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function (e) {
    var t;
    !function (t) {
        var r;
        !function (r) {
            function i(e) {
                return window.localStorage.getItem(e)
            }

            function n(t, r) {
                try {
                    return window.localStorage.setItem(t, r), !0
                } catch (i) {
                    return e.$warn(1047, t, r), !1
                }
            }

            function o(e) {
                window.localStorage.removeItem(e)
            }

            function a() {
                window.localStorage.clear()
            }

            t.getItem = i, t.setItem = n, t.removeItem = o, t.clear = a
        }(r = t.web || (t.web = {}))
    }(t = e.localStorage || (e.localStorage = {}))
}(egret || (egret = {}));
var egret;
!function (e) {
    var t;
    !function (t) {
        var r = function (r) {
            function i() {
                var e = r.call(this) || this;
                return e.loaded = !1, e
            }

            return __extends(i, r), Object.defineProperty(i.prototype, "length", {
                get: function () {
                    if (this.originAudio) return this.originAudio.duration;
                    throw new Error("sound not loaded!")
                }, enumerable: !0, configurable: !0
            }), i.prototype.load = function (t) {
                function r() {
                    o(), l.indexOf("firefox") >= 0 && (s.pause(), s.muted = !1), a.loaded = !0, a.dispatchEventWith(e.Event.COMPLETE)
                }

                function n() {
                    o(), a.dispatchEventWith(e.IOErrorEvent.IO_ERROR)
                }

                function o() {
                    s.removeEventListener("canplaythrough", r), s.removeEventListener("error", n)
                }

                var a = this;
                this.url = t, t || e.$error(3002);
                var s = new Audio(t);
                s.addEventListener("canplaythrough", r), s.addEventListener("error", n);
                var l = navigator.userAgent.toLowerCase();
                l.indexOf("firefox") >= 0 && (s.autoplay = !0, s.muted = !0), s.load(), this.originAudio = s, i.clearAudios[this.url] && delete i.clearAudios[this.url], i.$recycle(this.url, s)
            }, i.prototype.play = function (r, n) {
                r = +r || 0, n = +n || 0, 0 == this.loaded && e.$error(1049);
                var o = i.$pop(this.url);
                null == o && (o = this.originAudio.cloneNode()), o.autoplay = !0;
                var a = new t.HtmlSoundChannel(o);
                return a.$url = this.url, a.$loops = n, a.$startTime = r, a.$play(), e.sys.$pushSoundChannel(a), a
            }, i.prototype.close = function () {
                0 == this.loaded && this.originAudio && (this.originAudio.src = ""), this.originAudio && (this.originAudio = null), i.$clear(this.url)
            }, i.$clear = function (e) {
                i.clearAudios[e] = !0;
                var t = i.audios[e];
                t && (t.length = 0)
            }, i.$pop = function (e) {
                var t = i.audios[e];
                return t && t.length > 0 ? t.pop() : null
            }, i.$recycle = function (e, t) {
                if (!i.clearAudios[e]) {
                    var r = i.audios[e];
                    null == i.audios[e] && (r = i.audios[e] = []), r.push(t)
                }
            }, i
        }(e.EventDispatcher);
        r.MUSIC = "music", r.EFFECT = "effect", r.audios = {}, r.clearAudios = {}, t.HtmlSound = r, __reflect(r.prototype, "egret.web.HtmlSound", ["egret.Sound"])
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function (e) {
    var t;
    !function (t) {
        var r = function (r) {
            function i(t) {
                var i = r.call(this) || this;
                return i.$startTime = 0, i.audio = null, i.isStopped = !1, i.canPlay = function () {
                    i.audio.removeEventListener("canplay", i.canPlay);
                    try {
                        i.audio.currentTime = i.$startTime
                    } catch (e) {
                    } finally {
                        i.audio.play()
                    }
                }, i.onPlayEnd = function () {
                    return 1 == i.$loops ? (i.stop(), void i.dispatchEventWith(e.Event.SOUND_COMPLETE)) : (i.$loops > 0 && i.$loops--, void i.$play())
                }, i._volume = 1, t.addEventListener("ended", i.onPlayEnd), i.audio = t, i
            }

            return __extends(i, r), i.prototype.$play = function () {
                if (this.isStopped) return void e.$error(1036);
                try {
                    this.audio.volume = this._volume, this.audio.currentTime = this.$startTime
                } catch (t) {
                    return void this.audio.addEventListener("canplay", this.canPlay)
                }
                this.audio.play()
            }, i.prototype.stop = function () {
                if (this.audio) {
                    this.isStopped || e.sys.$popSoundChannel(this), this.isStopped = !0;
                    var r = this.audio;
                    r.removeEventListener("ended", this.onPlayEnd), r.volume = 0, this._volume = 0, this.audio = null;
                    var i = this.$url;
                    window.setTimeout(function () {
                        r.pause(), t.HtmlSound.$recycle(i, r)
                    }, 200)
                }
            }, Object.defineProperty(i.prototype, "volume", {
                get: function () {
                    return this._volume
                }, set: function (t) {
                    return this.isStopped ? void e.$error(1036) : (this._volume = t, void(this.audio && (this.audio.volume = t)))
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(i.prototype, "position", {
                get: function () {
                    return this.audio ? this.audio.currentTime : 0
                }, enumerable: !0, configurable: !0
            }), i
        }(e.EventDispatcher);
        t.HtmlSoundChannel = r, __reflect(r.prototype, "egret.web.HtmlSoundChannel", ["egret.SoundChannel", "egret.IEventDispatcher"])
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function (e) {
    var t;
    !function (t) {
        var r = function (r) {
            function i() {
                var e = r.call(this) || this;
                return e.loaded = !1, e
            }

            return __extends(i, r), i.prototype.load = function (r) {
                var i = this;
                this.url = r, r || e.$error(3002), QZAppExternal.preloadSound(function (t) {
                    0 == t.code ? (i.loaded = !0, i.dispatchEventWith(e.Event.COMPLETE)) : i.dispatchEventWith(e.IOErrorEvent.IO_ERROR)
                }, {bid: -1, url: t.Html5Capatibility._QQRootPath + r, refresh: 1})
            }, Object.defineProperty(i.prototype, "length", {
                get: function () {
                    throw new Error("qq sound not supported!")
                }, enumerable: !0, configurable: !0
            }), i.prototype.play = function (r, i) {
                r = +r || 0, i = +i || 0, 0 == this.loaded && e.$error(1049);
                var n = new t.QQSoundChannel;
                return n.$url = this.url, n.$loops = i, n.$type = this.type, n.$startTime = r, n.$play(), e.sys.$pushSoundChannel(n), n
            }, i.prototype.close = function () {
            }, i
        }(e.EventDispatcher);
        r.MUSIC = "music", r.EFFECT = "effect", t.QQSound = r, __reflect(r.prototype, "egret.web.QQSound", ["egret.Sound"])
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function (e) {
    var t;
    !function (t) {
        var r = function (t) {
            function r() {
                var r = t.call(this) || this;
                return r.$startTime = 0, r.isStopped = !1, r.onPlayEnd = function () {
                    return 1 == r.$loops ? (r.stop(), void r.dispatchEventWith(e.Event.SOUND_COMPLETE)) : (r.$loops > 0 && r.$loops--, void r.$play())
                }, r._startTime = 0, r
            }

            return __extends(r, t), r.prototype.$play = function () {
                if (this.isStopped) return void e.$error(1036);
                var t = this;
                this._startTime = Date.now();
                var r = 0;
                r = t.$loops > 0 ? t.$loops - 1 : -1, this.$type == e.Sound.EFFECT ? QZAppExternal.playLocalSound(function (e) {
                }, {bid: -1, url: t.$url, loop: r}) : QZAppExternal.playLocalBackSound(function (e) {
                }, {bid: -1, url: t.$url, loop: r})
            }, r.prototype.stop = function () {
                this.$type == e.Sound.EFFECT ? QZAppExternal.stopSound() : QZAppExternal.stopBackSound(), this.isStopped || e.sys.$popSoundChannel(this), this.isStopped = !0
            }, Object.defineProperty(r.prototype, "volume", {
                get: function () {
                    return 1
                }, set: function (t) {
                    if (this.isStopped) return void e.$error(1036)
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(r.prototype, "position", {
                get: function () {
                    return (Date.now() - this._startTime) / 1e3
                }, enumerable: !0, configurable: !0
            }), r
        }(e.EventDispatcher);
        t.QQSoundChannel = r, __reflect(r.prototype, "egret.web.QQSoundChannel", ["egret.SoundChannel", "egret.IEventDispatcher"])
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function (e) {
    var t;
    !function (t) {
        var r = function () {
            function e() {
            }

            return e.decodeAudios = function () {
                if (!(e.decodeArr.length <= 0 || e.isDecoding)) {
                    e.isDecoding = !0;
                    var t = e.decodeArr.shift();
                    e.ctx.decodeAudioData(t.buffer, function (r) {
                        t.self.audioBuffer = r, t.success && t.success(), e.isDecoding = !1, e.decodeAudios()
                    }, function () {
                        alert("sound decode error: " + t.url + "！\nsee http://edn.egret.com/cn/docs/page/156"), t.fail && t.fail(), e.isDecoding = !1, e.decodeAudios()
                    })
                }
            }, e
        }();
        r.canUseWebAudio = window.AudioContext || window.webkitAudioContext || window.mozAudioContext, r.ctx = r.canUseWebAudio ? new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext) : void 0, r.decodeArr = [], r.isDecoding = !1, t.WebAudioDecode = r, __reflect(r.prototype, "egret.web.WebAudioDecode");
        var i = function (i) {
            function n() {
                var e = i.call(this) || this;
                return e.loaded = !1, e
            }

            return __extends(n, i), Object.defineProperty(n.prototype, "length", {
                get: function () {
                    if (this.audioBuffer) return this.audioBuffer.duration;
                    throw new Error("sound not loaded!")
                }, enumerable: !0, configurable: !0
            }), n.prototype.load = function (t) {
                function i() {
                    o.loaded = !0, o.dispatchEventWith(e.Event.COMPLETE)
                }

                function n() {
                    o.dispatchEventWith(e.IOErrorEvent.IO_ERROR)
                }

                var o = this;
                this.url = t, t || e.$error(3002);
                var a = new XMLHttpRequest;
                a.open("GET", t, !0), a.responseType = "arraybuffer", a.onreadystatechange = function () {
                    if (4 == a.readyState) {
                        var t = a.status >= 400 || 0 == a.status;
                        t ? o.dispatchEventWith(e.IOErrorEvent.IO_ERROR) : (r.decodeArr.push({
                            buffer: a.response,
                            success: i,
                            fail: n,
                            self: o,
                            url: o.url
                        }), r.decodeAudios())
                    }
                }, a.send()
            }, n.prototype.play = function (r, i) {
                r = +r || 0, i = +i || 0, 0 == this.loaded && e.$error(1049);
                var n = new t.WebAudioSoundChannel;
                return n.$url = this.url, n.$loops = i, n.$audioBuffer = this.audioBuffer, n.$startTime = r, n.$play(), e.sys.$pushSoundChannel(n), n
            }, n.prototype.close = function () {
            }, n
        }(e.EventDispatcher);
        i.MUSIC = "music", i.EFFECT = "effect", t.WebAudioSound = i, __reflect(i.prototype, "egret.web.WebAudioSound", ["egret.Sound"])
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function (e) {
    var t;
    !function (t) {
        var r = function (r) {
            function i() {
                var i = r.call(this) || this;
                return i.$startTime = 0, i.bufferSource = null, i.context = t.WebAudioDecode.ctx, i.isStopped = !1, i._currentTime = 0, i._volume = 1, i.onPlayEnd = function () {
                    return 1 == i.$loops ? (i.stop(), void i.dispatchEventWith(e.Event.SOUND_COMPLETE)) : (i.$loops > 0 && i.$loops--, void i.$play())
                }, i._startTime = 0, i.context.createGain ? i.gain = i.context.createGain() : i.gain = i.context.createGainNode(), i
            }

            return __extends(i, r), i.prototype.$play = function () {
                if (this.isStopped) return void e.$error(1036);
                this.bufferSource && (this.bufferSource.onended = null, this.bufferSource = null);
                var t = this.context, r = this.gain, i = t.createBufferSource();
                this.bufferSource = i, i.buffer = this.$audioBuffer, i.connect(r), r.connect(t.destination), i.onended = this.onPlayEnd, this._startTime = Date.now(), this.gain.gain.value = this._volume, i.start(0, this.$startTime), this._currentTime = 0
            }, i.prototype.stop = function () {
                if (this.bufferSource) {
                    var t = this.bufferSource;
                    t.stop ? t.stop(0) : t.noteOff(0), t.onended = null, t.disconnect(), this.bufferSource = null, this.$audioBuffer = null
                }
                this.isStopped || e.sys.$popSoundChannel(this), this.isStopped = !0
            }, Object.defineProperty(i.prototype, "volume", {
                get: function () {
                    return this._volume
                }, set: function (t) {
                    return this.isStopped ? void e.$error(1036) : (this._volume = t, void(this.gain.gain.value = t))
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(i.prototype, "position", {
                get: function () {
                    return this.bufferSource ? (Date.now() - this._startTime) / 1e3 + this.$startTime : 0
                }, enumerable: !0, configurable: !0
            }), i
        }(e.EventDispatcher);
        t.WebAudioSoundChannel = r, __reflect(r.prototype, "egret.web.WebAudioSoundChannel", ["egret.SoundChannel", "egret.IEventDispatcher"])
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function (e) {
    var t;
    !function (t) {
        var r = function (t) {
            function r(r, i) {
                void 0 === i && (i = !0);
                var n = t.call(this) || this;
                return n.loaded = !1, n.closed = !1, n.heightSet = NaN, n.widthSet = NaN, n.waiting = !1, n.userPause = !1, n.userPlay = !1, n.isPlayed = !1, n.screenChanged = function (t) {
                    var r = document.fullscreenEnabled || document.webkitIsFullScreen;
                    r || (n.checkFullScreen(!1), e.Capabilities.isMobile || (n._fullscreen = r))
                }, n._fullscreen = !0, n.onVideoLoaded = function () {
                    n.video.removeEventListener("canplay", n.onVideoLoaded);
                    var t = n.video;
                    n.loaded = !0, n.posterData && (n.posterData.width = n.getPlayWidth(), n.posterData.height = n.getPlayHeight()), t.width = t.videoWidth, t.height = t.videoHeight, n.$invalidateContentBounds(), window.setTimeout(function () {
                        n.dispatchEventWith(e.Event.COMPLETE)
                    }, 200)
                }, n.$renderNode = new e.sys.BitmapNode, n.src = r, n.once(e.Event.ADDED_TO_STAGE, n.loadPoster, n), r && n.load(), n
            }

            return __extends(r, t), r.prototype.load = function (t, r) {
                var i = this;
                if (void 0 === r && (r = !0), t = t || this.src, this.src = t, t || e.$error(3002), !this.video || this.video.src != t) {
                    var n;
                    !this.video || e.Capabilities.isMobile ? (n = document.createElement("video"), this.video = n, n.controls = null) : n = this.video, n.src = t, n.setAttribute("autoplay", "autoplay"), n.setAttribute("webkit-playsinline", "true"), n.addEventListener("canplay", this.onVideoLoaded), n.addEventListener("error", function () {
                        return i.onVideoError()
                    }), n.addEventListener("ended", function () {
                        return i.onVideoEnded()
                    });
                    var o = !1;
                    n.addEventListener("canplay", function () {
                        i.waiting = !1, o ? i.userPause ? i.pause() : i.userPlay && i.play() : (o = !0, n.pause())
                    }), n.addEventListener("waiting", function () {
                        i.waiting = !0
                    }), n.load(), this.videoPlay(), n.style.position = "absolute", n.style.top = "0px", n.style.zIndex = "-88888", n.style.left = "0px", n.height = 1, n.width = 1
                }
            }, r.prototype.play = function (t, r) {
                var i = this;
                if (void 0 === r && (r = !1), 0 == this.loaded) return this.load(this.src), void this.once(e.Event.COMPLETE, function (e) {
                    return i.play(t, r)
                }, this);
                this.isPlayed = !0;
                var n = this.video;
                void 0 != t && (n.currentTime = +t || 0), n.loop = !!r, e.Capabilities.isMobile ? n.style.zIndex = "-88888" : n.style.zIndex = "9999", n.style.position = "absolute", n.style.top = "0px", n.style.left = "0px", n.height = n.videoHeight, n.width = n.videoWidth, "Windows PC" != e.Capabilities.os && "Mac OS" != e.Capabilities.os && window.setTimeout(function () {
                    n.width = 0
                }, 1e3), this.checkFullScreen(this._fullscreen)
            }, r.prototype.videoPlay = function () {
                return this.userPause = !1, this.waiting ? void(this.userPlay = !0) : (this.userPlay = !1, void this.video.play())
            }, r.prototype.checkFullScreen = function (t) {
                var r = this.video;
                if (t) null == r.parentElement && (r.removeAttribute("webkit-playsinline"), document.body.appendChild(r)), e.stopTick(this.markDirty, this), this.goFullscreen(); else if (null != r.parentElement && r.parentElement.removeChild(r), r.setAttribute("webkit-playsinline", "true"), this.setFullScreenMonitor(!1), e.startTick(this.markDirty, this), e.Capabilities.isMobile) return this.video.currentTime = 0, void this.onVideoEnded();
                this.videoPlay()
            }, r.prototype.goFullscreen = function () {
                var t, r = this.video;
                return t = e.web.getPrefixStyleName("requestFullscreen", r), !r[t] && (t = e.web.getPrefixStyleName("requestFullScreen", r), !r[t]) || (r.removeAttribute("webkit-playsinline"), r[t](), this.setFullScreenMonitor(!0), !0)
            }, r.prototype.setFullScreenMonitor = function (e) {
                var t = this.video;
                e ? (t.addEventListener("mozfullscreenchange", this.screenChanged), t.addEventListener("webkitfullscreenchange", this.screenChanged), t.addEventListener("mozfullscreenerror", this.screenError), t.addEventListener("webkitfullscreenerror", this.screenError)) : (t.removeEventListener("mozfullscreenchange", this.screenChanged), t.removeEventListener("webkitfullscreenchange", this.screenChanged), t.removeEventListener("mozfullscreenerror", this.screenError), t.removeEventListener("webkitfullscreenerror", this.screenError))
            }, r.prototype.screenError = function () {
                e.$error(3014)
            }, r.prototype.exitFullscreen = function () {
                document.exitFullscreen ? document.exitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.oCancelFullScreen ? document.oCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen()
            }, r.prototype.onVideoEnded = function () {
                this.pause(), this.isPlayed = !1, this.$invalidateContentBounds(), this.dispatchEventWith(e.Event.ENDED)
            }, r.prototype.onVideoError = function () {
                this.dispatchEventWith(e.IOErrorEvent.IO_ERROR)
            }, r.prototype.close = function () {
                var e = this;
                this.closed = !0, this.video.removeEventListener("canplay", this.onVideoLoaded), this.video.removeEventListener("error", function () {
                    return e.onVideoError()
                }), this.video.removeEventListener("ended", function () {
                    return e.onVideoEnded()
                }), this.pause(), 0 == this.loaded && this.video && (this.video.src = ""), this.video && this.video.parentElement && (this.video.parentElement.removeChild(this.video), this.video = null), this.loaded = !1
            }, r.prototype.pause = function () {
                return this.userPlay = !1, this.waiting ? void(this.userPause = !0) : (this.userPause = !1, e.stopTick(this.markDirty, this), void this.$invalidate())
            }, Object.defineProperty(r.prototype, "volume", {
                get: function () {
                    return this.video ? this.video.volume : 1
                }, set: function (e) {
                    this.video && (this.video.volume = e)
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(r.prototype, "position", {
                get: function () {
                    return this.video ? this.video.currentTime : 0
                }, set: function (e) {
                    this.video && (this.video.currentTime = e)
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(r.prototype, "fullscreen", {
                get: function () {
                    return this._fullscreen
                }, set: function (t) {
                    e.Capabilities.isMobile || (this._fullscreen = !!t, this.video && 0 == this.video.paused && this.checkFullScreen(this._fullscreen))
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(r.prototype, "bitmapData", {
                get: function () {
                    return this.video && this.loaded ? (this._bitmapData || (this.video.width = this.video.videoWidth, this.video.height = this.video.videoHeight, this._bitmapData = new e.BitmapData(this.video), this._bitmapData.$deleteSource = !1), this._bitmapData) : null
                }, enumerable: !0, configurable: !0
            }), r.prototype.loadPoster = function () {
                var t = this, r = this.poster;
                if (r) {
                    var i = new e.ImageLoader;
                    i.once(e.Event.COMPLETE, function (e) {
                        i.data;
                        t.posterData = i.data, t.posterData.width = t.getPlayWidth(), t.posterData.height = t.getPlayHeight(), t.$invalidateContentBounds()
                    }, this), i.load(r)
                }
            }, r.prototype.$measureContentBounds = function (e) {
                var t = this.bitmapData, r = this.posterData;
                t ? e.setTo(0, 0, this.getPlayWidth(), this.getPlayHeight()) : r ? e.setTo(0, 0, this.getPlayWidth(), this.getPlayHeight()) : e.setEmpty()
            }, r.prototype.getPlayWidth = function () {
                return isNaN(this.widthSet) ? this.bitmapData ? this.bitmapData.width : this.posterData ? this.posterData.width : NaN : this.widthSet
            }, r.prototype.getPlayHeight = function () {
                return isNaN(this.heightSet) ? this.bitmapData ? this.bitmapData.height : this.posterData ? this.posterData.height : NaN : this.heightSet
            }, r.prototype.$render = function () {
                var t = this.$renderNode, r = this.bitmapData, i = this.posterData, n = this.getPlayWidth(),
                    o = this.getPlayHeight();
                this.isPlayed && !e.Capabilities.isMobile || !i ? this.isPlayed && r && (t.image = r, t.imageWidth = r.width, t.imageHeight = r.height, e.WebGLUtils.deleteWebGLTexture(r.webGLTexture), r.webGLTexture = null, t.drawImage(0, 0, r.width, r.height, 0, 0, n, o)) : (t.image = i, t.imageWidth = n, t.imageHeight = o, t.drawImage(0, 0, i.width, i.height, 0, 0, n, o))
            }, r.prototype.markDirty = function () {
                return this.$invalidate(), !0
            }, r.prototype.$setHeight = function (e) {
                return this.heightSet = +e || 0, this.$invalidate(), this.$invalidateContentBounds(), t.prototype.$setHeight.call(this, e)
            }, r.prototype.$setWidth = function (e) {
                return this.widthSet = +e || 0, this.$invalidate(), this.$invalidateContentBounds(), t.prototype.$setWidth.call(this, e)
            }, Object.defineProperty(r.prototype, "paused", {
                get: function () {
                    return !this.video || this.video.paused
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(r.prototype, "length", {
                get: function () {
                    if (this.video) return this.video.duration;
                    throw new Error("Video not loaded!")
                }, enumerable: !0, configurable: !0
            }), r
        }(e.DisplayObject);
        t.WebVideo = r, __reflect(r.prototype, "egret.web.WebVideo", ["egret.Video", "egret.DisplayObject"]), e.Video = r
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function (e) {
    var t;
    !function (t) {
        var r = function (t) {
            function r() {
                var e = t.call(this) || this;
                return e._url = "", e._method = "", e
            }

            return __extends(r, t), Object.defineProperty(r.prototype, "response", {
                get: function () {
                    if (!this._xhr) return null;
                    if (void 0 != this._xhr.response) return this._xhr.response;
                    if ("text" == this._responseType) return this._xhr.responseText;
                    if ("arraybuffer" == this._responseType && /msie 9.0/i.test(navigator.userAgent)) {
                        var e = window;
                        return e.convertResponseBodyToText(this._xhr.responseBody)
                    }
                    return "document" == this._responseType ? this._xhr.responseXML : null
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(r.prototype, "responseType", {
                get: function () {
                    return this._responseType
                }, set: function (e) {
                    this._responseType = e
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(r.prototype, "withCredentials", {
                get: function () {
                    return this._withCredentials
                }, set: function (e) {
                    this._withCredentials = e
                }, enumerable: !0, configurable: !0
            }), r.prototype.getXHR = function () {
                return window.XMLHttpRequest ? new window.XMLHttpRequest : new ActiveXObject("MSXML2.XMLHTTP")
            }, r.prototype.open = function (e, t) {
                void 0 === t && (t = "GET"), this._url = e, this._method = t, this._xhr && (this._xhr.abort(), this._xhr = null), this._xhr = this.getXHR(), this._xhr.onreadystatechange = this.onReadyStateChange.bind(this), this._xhr.onprogress = this.updateProgress.bind(this), this._xhr.open(this._method, this._url, !0)
            }, r.prototype.send = function (e) {
                if (null != this._responseType && (this._xhr.responseType = this._responseType), null != this._withCredentials && (this._xhr.withCredentials = this._withCredentials), this.headerObj) for (var t in this.headerObj) this._xhr.setRequestHeader(t, this.headerObj[t]);
                this._xhr.send(e)
            }, r.prototype.abort = function () {
                this._xhr && this._xhr.abort()
            }, r.prototype.getAllResponseHeaders = function () {
                if (!this._xhr) return null;
                var e = this._xhr.getAllResponseHeaders();
                return e ? e : ""
            }, r.prototype.setRequestHeader = function (e, t) {
                this.headerObj || (this.headerObj = {}), this.headerObj[e] = t
            }, r.prototype.getResponseHeader = function (e) {
                if (!this._xhr) return null;
                var t = this._xhr.getResponseHeader(e);
                return t ? t : ""
            }, r.prototype.onReadyStateChange = function () {
                var t = this._xhr;
                if (4 == t.readyState) {
                    var r = t.status >= 400 || 0 == t.status, i = this._url, n = this;
                    window.setTimeout(function () {
                        r ? (n.hasEventListener(e.IOErrorEvent.IO_ERROR) || e.$error(1011, i), n.dispatchEventWith(e.IOErrorEvent.IO_ERROR)) : n.dispatchEventWith(e.Event.COMPLETE)
                    }, 0)
                }
            }, r.prototype.updateProgress = function (t) {
                t.lengthComputable && e.ProgressEvent.dispatchProgressEvent(this, e.ProgressEvent.PROGRESS, t.loaded, t.total)
            }, r
        }(e.EventDispatcher);
        t.WebHttpRequest = r, __reflect(r.prototype, "egret.web.WebHttpRequest", ["egret.HttpRequest"]), e.HttpRequest = r
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function (e) {
    var t;
    !function (t) {
        var r = window.URL || window.webkitURL, i = function (i) {
            function n() {
                var e = null !== i && i.apply(this, arguments) || this;
                return e.data = null, e._crossOrigin = null, e._hasCrossOriginSet = !1, e.currentImage = null, e.request = null, e
            }

            return __extends(n, i), Object.defineProperty(n.prototype, "crossOrigin", {
                get: function () {
                    return this._crossOrigin
                }, set: function (e) {
                    this._hasCrossOriginSet = !0, this._crossOrigin = e
                }, enumerable: !0, configurable: !0
            }), n.prototype.load = function (r) {
                if (t.Html5Capatibility._canUseBlob && 0 != r.indexOf("wxLocalResource:") && 0 != r.indexOf("data:") && 0 != r.indexOf("http:") && 0 != r.indexOf("https:")) {
                    var i = this.request;
                    i || (i = this.request = new e.web.WebHttpRequest, i.addEventListener(e.Event.COMPLETE, this.onBlobLoaded, this), i.addEventListener(e.IOErrorEvent.IO_ERROR, this.onBlobError, this), i.responseType = "blob"), this.currentURL = r, i.open(r), i.send()
                } else this.loadImage(r)
            }, n.prototype.onBlobLoaded = function (e) {
                var t = this.request.response;
                this.request = void 0, this.loadImage(r.createObjectURL(t))
            }, n.prototype.onBlobError = function (e) {
                this.dispatchIOError(this.currentURL), this.request = void 0
            }, n.prototype.loadImage = function (e) {
                var t = new Image;
                this.data = null, this.currentImage = t, this._hasCrossOriginSet ? this._crossOrigin && (t.crossOrigin = this._crossOrigin) : n.crossOrigin && (t.crossOrigin = n.crossOrigin), t.onload = this.onImageComplete.bind(this), t.onerror = this.onLoadError.bind(this), t.src = e
            }, n.prototype.onImageComplete = function (t) {
                var r = this.getImage(t);
                if (r) {
                    this.data = new e.BitmapData(r);
                    var i = this;
                    window.setTimeout(function () {
                        i.dispatchEventWith(e.Event.COMPLETE)
                    }, 0)
                }
            }, n.prototype.onLoadError = function (e) {
                var t = this.getImage(e);
                t && this.dispatchIOError(t.src)
            }, n.prototype.dispatchIOError = function (t) {
                var r = this;
                window.setTimeout(function () {
                    r.hasEventListener(e.IOErrorEvent.IO_ERROR) || e.$error(1011, t), r.dispatchEventWith(e.IOErrorEvent.IO_ERROR)
                }, 0)
            }, n.prototype.getImage = function (t) {
                var i = t.target, n = i.src;
                if (0 == n.indexOf("blob:")) try {
                    r.revokeObjectURL(i.src)
                } catch (o) {
                    e.$warn(1037)
                }
                return i.onerror = null, i.onload = null, this.currentImage !== i ? null : (this.currentImage = null, i)
            }, n
        }(e.EventDispatcher);
        i.crossOrigin = null, t.WebImageLoader = i, __reflect(i.prototype, "egret.web.WebImageLoader", ["egret.ImageLoader"]), e.ImageLoader = i
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function (e) {
    var t;
    !function (t) {
        var r = function (r) {
            function i() {
                var e = r.call(this) || this;
                return e._isNeedShow = !1, e.inputElement = null, e.inputDiv = null, e._gscaleX = 0, e._gscaleY = 0, e._isNeesHide = !1, e.textValue = "", e.colorValue = 16777215, e._styleInfoes = {}, e
            }

            return __extends(i, r), i.prototype.$setTextField = function (e) {
                return this.$textfield = e, !0
            }, i.prototype.$addToStage = function () {
                this.htmlInput = e.web.$getTextAdapter(this.$textfield)
            }, i.prototype._initElement = function () {
                var t = this.$textfield.localToGlobal(0, 0), r = t.x, i = t.y, n = this.htmlInput.$scaleX,
                    o = this.htmlInput.$scaleY;
                this.inputDiv.style.left = r * n + "px", this.inputDiv.style.top = i * o + "px", this.$textfield.multiline && this.$textfield.height > this.$textfield.size ? (this.inputDiv.style.top = i * o + "px", this.inputElement.style.top = -this.$textfield.lineSpacing / 2 * o + "px") : (this.inputDiv.style.top = i * o + "px", this.inputElement.style.top = "0px");
                for (var a = this.$textfield, s = 1, l = 1, h = 0; a.parent;) s *= a.scaleX, l *= a.scaleY, h += a.rotation, a = a.parent;
                var c = e.web.getPrefixStyleName("transform");
                this.inputDiv.style[c] = "rotate(" + h + "deg)", this._gscaleX = n * s, this._gscaleY = o * l
            }, i.prototype.$show = function () {
                this.htmlInput.isCurrentStageText(this) ? this.inputElement.onblur = null : (this.inputElement = this.htmlInput.getInputElement(this), this.$textfield.multiline ? this.inputElement.type = "text" : this.inputElement.type = this.$textfield.inputType, this.inputDiv = this.htmlInput._inputDIV), this.htmlInput._needShow = !0, this._isNeedShow = !0, this._initElement()
            }, i.prototype.onBlurHandler = function () {
                this.htmlInput.clearInputElement(), window.scrollTo(0, 0)
            }, i.prototype.executeShow = function () {
                this.inputElement.value = this.$getText(), null == this.inputElement.onblur && (this.inputElement.onblur = this.onBlurHandler.bind(this)), this.$resetStageText(), this.$textfield.maxChars > 0 ? this.inputElement.setAttribute("maxlength", this.$textfield.maxChars) : this.inputElement.removeAttribute("maxlength"), this.inputElement.selectionStart = this.inputElement.value.length, this.inputElement.selectionEnd = this.inputElement.value.length, this.inputElement.focus()
            }, i.prototype.$hide = function () {
                this._isNeesHide = !0, this.htmlInput && e.web.Html5Capatibility._System_OS == e.web.SystemOSType.IOS && this.htmlInput.disconnectStageText(this)
            }, i.prototype.$getText = function () {
                return this.textValue || (this.textValue = ""), this.textValue
            }, i.prototype.$setText = function (e) {
                return this.textValue = e, this.resetText(), !0
            }, i.prototype.resetText = function () {
                this.inputElement && (this.inputElement.value = this.textValue)
            }, i.prototype.$setColor = function (e) {
                return this.colorValue = e, this.resetColor(), !0
            }, i.prototype.resetColor = function () {
                this.inputElement && this.setElementStyle("color", e.toColorString(this.colorValue))
            }, i.prototype.$onBlur = function () {
                t.Html5Capatibility._System_OS == t.SystemOSType.WPHONE && e.Event.dispatchEvent(this, "updateText", !1)
            }, i.prototype._onInput = function () {
                var r = this;
                if (t.Html5Capatibility._System_OS == t.SystemOSType.WPHONE) {
                    var i = this.$textfield.$TextField;
                    null == i[35] && null == i[36] ? (r.textValue = r.inputElement.value, e.Event.dispatchEvent(r, "updateText", !1)) : window.setTimeout(function () {
                        r.inputElement && r.inputElement.selectionStart && r.inputElement.selectionEnd && r.inputElement.selectionStart == r.inputElement.selectionEnd && (r.textValue = r.inputElement.value, e.Event.dispatchEvent(r, "updateText", !1))
                    }, 0)
                } else window.setTimeout(function () {
                    r.inputElement && r.inputElement.selectionStart == r.inputElement.selectionEnd && (r.textValue = r.inputElement.value, e.Event.dispatchEvent(r, "updateText", !1))
                }, 0)
            }, i.prototype.setAreaHeight = function () {
                var t = this.$textfield;
                if (t.multiline) {
                    var r = e.TextFieldUtils.$getTextHeight(t);
                    if (t.height <= t.size) this.setElementStyle("height", t.size * this._gscaleY + "px"), this.setElementStyle("padding", "0px"),
                        this.setElementStyle("lineHeight", t.size * this._gscaleY + "px"); else if (t.height < r) this.setElementStyle("height", t.height * this._gscaleY + "px"), this.setElementStyle("padding", "0px"), this.setElementStyle("lineHeight", (t.size + t.lineSpacing) * this._gscaleY + "px"); else {
                        this.setElementStyle("height", (r + t.lineSpacing) * this._gscaleY + "px");
                        var i = (t.height - r) * this._gscaleY, n = e.TextFieldUtils.$getValign(t), o = i * n,
                            a = i - o;
                        this.setElementStyle("padding", o + "px 0px " + a + "px 0px"), this.setElementStyle("lineHeight", (t.size + t.lineSpacing) * this._gscaleY + "px")
                    }
                }
            }, i.prototype._onClickHandler = function (t) {
                this._isNeedShow && (t.stopImmediatePropagation(), this._isNeedShow = !1, this.executeShow(), this.dispatchEvent(new e.Event("focus")))
            }, i.prototype._onDisconnect = function () {
                this.inputElement = null, this.dispatchEvent(new e.Event("blur"))
            }, i.prototype.setElementStyle = function (e, t) {
                this.inputElement && this._styleInfoes[e] != t && (this.inputElement.style[e] = t)
            }, i.prototype.$removeFromStage = function () {
                this.inputElement && this.htmlInput.disconnectStageText(this)
            }, i.prototype.$resetStageText = function () {
                if (this.inputElement) {
                    var t = this.$textfield;
                    this.setElementStyle("fontFamily", t.fontFamily), this.setElementStyle("fontStyle", t.italic ? "italic" : "normal"), this.setElementStyle("fontWeight", t.bold ? "bold" : "normal"), this.setElementStyle("textAlign", t.textAlign), this.setElementStyle("fontSize", t.size * this._gscaleY + "px"), this.setElementStyle("color", e.toColorString(t.textColor));
                    var r = void 0;
                    if (t.stage ? (r = t.localToGlobal(0, 0).x, r = Math.min(t.width, t.stage.stageWidth - r)) : r = t.width, this.setElementStyle("width", r * this._gscaleX + "px"), this.setElementStyle("verticalAlign", t.verticalAlign), t.multiline) this.setAreaHeight(); else if (this.setElementStyle("lineHeight", t.size * this._gscaleY + "px"), t.height < t.size) {
                        this.setElementStyle("height", t.size * this._gscaleY + "px");
                        var i = t.size / 2 * this._gscaleY;
                        this.setElementStyle("padding", "0px 0px " + i + "px 0px")
                    } else {
                        this.setElementStyle("height", t.size * this._gscaleY + "px");
                        var n = (t.height - t.size) * this._gscaleY, o = e.TextFieldUtils.$getValign(t), a = n * o,
                            i = n - a;
                        i < t.size / 2 * this._gscaleY && (i = t.size / 2 * this._gscaleY), this.setElementStyle("padding", a + "px 0px " + i + "px 0px")
                    }
                    this.inputDiv.style.clip = "rect(0px " + t.width * this._gscaleX + "px " + t.height * this._gscaleY + "px 0px)", this.inputDiv.style.height = t.height * this._gscaleY + "px", this.inputDiv.style.width = r * this._gscaleX + "px"
                }
            }, i
        }(e.EventDispatcher);
        t.HTML5StageText = r, __reflect(r.prototype, "egret.web.HTML5StageText", ["egret.StageText"]), e.StageText = r
    }(t = e.web || (e.web = {}))
}(egret || (egret = {})), function (e) {
    var t;
    !function (t) {
        var r = function () {
            function t() {
                this._needShow = !1, this.$scaleX = 1, this.$scaleY = 1
            }

            return t.prototype.isInputOn = function () {
                return null != this._stageText
            }, t.prototype.isCurrentStageText = function (e) {
                return this._stageText == e
            }, t.prototype.initValue = function (e) {
                e.style.position = "absolute", e.style.left = "0px", e.style.top = "0px", e.style.border = "none", e.style.padding = "0"
            }, t.prototype.$updateSize = function () {
                if (this.canvas) {
                    var t = this.canvas.width, r = this.canvas.height, i = this.canvas.style.width.split("px")[0],
                        n = i * 9 / 16;
                    this.$scaleX = i / t, this.$scaleY = n / r, this.StageDelegateDiv.style.left = this.canvas.style.left, this.StageDelegateDiv.style.top = this.canvas.style.top;

                    var o = e.web.getPrefixStyleName("transform");
                    this.StageDelegateDiv.style[o] = this.canvas.style[o], this.StageDelegateDiv.style[e.web.getPrefixStyleName("transformOrigin")] = "0% 0% 0px"
                }
            }, t.prototype._initStageDelegateDiv = function (t, r) {
                this.canvas = r;
                var i, n = this;
                i || (i = document.createElement("div"), this.StageDelegateDiv = i, i.id = "StageDelegateDiv", t.appendChild(i), n.initValue(i), n._inputDIV = document.createElement("div"), n.initValue(n._inputDIV), n._inputDIV.style.width = "0px", n._inputDIV.style.height = "0px", n._inputDIV.style.left = "0px", n._inputDIV.style.top = "-100px", n._inputDIV.style[e.web.getPrefixStyleName("transformOrigin")] = "0% 0% 0px", i.appendChild(n._inputDIV), this.canvas.addEventListener("click", function (e) {
                    n._needShow ? (n._needShow = !1, n._stageText._onClickHandler(e), n.show()) : n._inputElement && (n.clearInputElement(), n._inputElement.blur(), n._inputElement = null)
                }), n.initInputElement(!0), n.initInputElement(!1))
            }, t.prototype.initInputElement = function (e) {
                var t, r = this;
                e ? (t = document.createElement("textarea"), t.style.resize = "none", r._multiElement = t, t.id = "egretTextarea") : (t = document.createElement("input"), r._simpleElement = t, t.id = "egretInput"), t.type = "text", r._inputDIV.appendChild(t), t.setAttribute("tabindex", "-1"), t.style.width = "1px", t.style.height = "12px", r.initValue(t), t.style.outline = "thin", t.style.background = "none", t.style.overflow = "hidden", t.style.wordBreak = "break-all", t.style.opacity = 0, t.oninput = function () {
                    r._stageText && r._stageText._onInput()
                }
            }, t.prototype.show = function () {
                var t = this, r = t._inputElement;
                e.$callAsync(function () {
                    r.style.opacity = 1
                }, t)
            }, t.prototype.disconnectStageText = function (e) {
                null != this._stageText && this._stageText != e || (this.clearInputElement(), this._inputElement && this._inputElement.blur())
            }, t.prototype.clearInputElement = function () {
                var e = this;
                if (e._inputElement) {
                    e._inputElement.value = "", e._inputElement.onblur = null, e._inputElement.style.width = "1px", e._inputElement.style.height = "12px", e._inputElement.style.left = "0px", e._inputElement.style.top = "0px", e._inputElement.style.opacity = 0;
                    var t = void 0;
                    t = e._simpleElement == e._inputElement ? e._multiElement : e._simpleElement, t.style.display = "block", e._inputDIV.style.left = "0px", e._inputDIV.style.top = "-100px", e._inputDIV.style.height = "0px", e._inputDIV.style.width = "0px"
                }
                e._stageText && (e._stageText._onDisconnect(), e._stageText = null, this.canvas.userTyping = !1)
            }, t.prototype.getInputElement = function (e) {
                var t = this;
                t.clearInputElement(), t._stageText = e, this.canvas.userTyping = !0, t._stageText.$textfield.multiline ? t._inputElement = t._multiElement : t._inputElement = t._simpleElement;
                var r;
                return r = t._simpleElement == t._inputElement ? t._multiElement : t._simpleElement, r.style.display = "none", t._inputElement
            }, t
        }();
        t.HTMLInput = r, __reflect(r.prototype, "egret.web.HTMLInput")
    }(t = e.web || (e.web = {}))
}(egret || (egret = {})), function (e) {
    var t;
    !function (e) {
        function t(e) {
            var t = e.stage ? e.stage.$hashCode : 0, r = i[t], a = n[t], s = o[t];
            return a && s && (delete n[t], delete o[t]), r
        }

        function r(e, t, r, a) {
            e._initStageDelegateDiv(r, a), i[t.$hashCode] = e, n[t.$hashCode] = a, o[t.$hashCode] = r
        }

        var i = {}, n = {}, o = {};
        e.$getTextAdapter = t, e.$cacheTextAdapter = r
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function (e) {
    var t;
    !function (t) {
        function r(e, t, r, o, a) {
            n || i();
            var s = "";
            return a && (s += "italic "), o && (s += "bold "), s += (r || 12) + "px ", s += t || "Arial", n.font = s, n.measureText(e).width
        }

        function i() {
            n = e.sys.canvasHitTestBuffer.context, n.textAlign = "left", n.textBaseline = "middle"
        }

        var n = null;
        e.sys.measureText = r
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function (e) {
    var t;
    !function (t) {
        function r(e, t) {
            var r = document.createElement("canvas");
            isNaN(e) || isNaN(t) || (r.width = e, r.height = t);
            var i = r.getContext("2d");
            if (void 0 === i.imageSmoothingEnabled) {
                for (var n, o = ["webkitImageSmoothingEnabled", "mozImageSmoothingEnabled", "msImageSmoothingEnabled"], a = o.length - 1; a >= 0 && (n = o[a], void 0 === i[n]); a--) ;
                try {
                    Object.defineProperty(i, "imageSmoothingEnabled", {
                        get: function () {
                            return this[n]
                        }, set: function (e) {
                            this[n] = e
                        }
                    })
                } catch (s) {
                    i.imageSmoothingEnabled = i[n]
                }
            }
            return r
        }

        var i, n = function () {
            function t(e, t, i) {
                this.surface = r(e, t), this.context = this.surface.getContext("2d")
            }

            return Object.defineProperty(t.prototype, "width", {
                get: function () {
                    return this.surface.width
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t.prototype, "height", {
                get: function () {
                    return this.surface.height
                }, enumerable: !0, configurable: !0
            }), t.prototype.resize = function (e, t, r) {
                var i = this.surface;
                if (r) {
                    var n = !1;
                    i.width < e && (i.width = e, n = !0), i.height < t && (i.height = t, n = !0), n || (this.context.globalCompositeOperation = "source-over", this.context.setTransform(1, 0, 0, 1, 0, 0), this.context.globalAlpha = 1)
                } else i.width != e && (i.width = e), i.height != t && (i.height = t);
                this.clear()
            }, t.prototype.resizeTo = function (e, t, n, o) {
                i || (i = r());
                var a = (this.context, this.surface), s = i, l = s.getContext("2d");
                i = a, this.context = l, this.surface = s, s.width = Math.max(e, 257), s.height = Math.max(t, 257), l.setTransform(1, 0, 0, 1, 0, 0), l.drawImage(a, n, o), a.height = 1, a.width = 1
            }, t.prototype.setDirtyRegionPolicy = function (e) {
            }, t.prototype.beginClip = function (t, r, i) {
                r = +r || 0, i = +i || 0;
                var n = e.sys.DisplayList.$pixelRatio, o = this.context;
                o.save(), o.beginPath(), o.setTransform(1, 0, 0, 1, r * n, i * n);
                for (var a = t.length, s = 0; s < a; s++) {
                    var l = t[s];
                    o.clearRect(l.minX * n, l.minY * n, l.width * n, l.height * n), o.rect(l.minX * n, l.minY * n, l.width * n, l.height * n)
                }
                o.clip()
            }, t.prototype.endClip = function () {
                this.context.restore()
            }, t.prototype.getPixels = function (e, t, r, i) {
                return void 0 === r && (r = 1), void 0 === i && (i = 1), this.context.getImageData(e, t, r, i).data
            }, t.prototype.toDataURL = function (e, t) {
                return this.surface.toDataURL(e, t)
            }, t.prototype.clear = function () {
                this.context.setTransform(1, 0, 0, 1, 0, 0), this.context.clearRect(0, 0, this.surface.width, this.surface.height)
            }, t.prototype.destroy = function () {
                this.surface.width = this.surface.height = 0
            }, t
        }();
        t.CanvasRenderBuffer = n, __reflect(n.prototype, "egret.web.CanvasRenderBuffer", ["egret.sys.RenderBuffer"])
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function (e) {
    var t;
    !function (t) {
        var r = function (t) {
            function r(r, i) {
                var n = t.call(this) || this;
                return n.onTouchBegin = function (e) {
                    var t = n.getLocation(e);
                    n.touch.onTouchBegin(t.x, t.y, e.identifier)
                }, n.onTouchMove = function (e) {
                    var t = n.getLocation(e);
                    n.touch.onTouchMove(t.x, t.y, e.identifier)
                }, n.onTouchEnd = function (e) {
                    var t = n.getLocation(e);
                    n.touch.onTouchEnd(t.x, t.y, e.identifier)
                }, n.scaleX = 1, n.scaleY = 1, n.rotation = 0, n.canvas = i, n.touch = new e.sys.TouchHandler(r), n.addListeners(), n
            }

            return __extends(r, t), r.prototype.addListeners = function () {
                var t = this;
                window.navigator.msPointerEnabled ? (this.canvas.addEventListener("MSPointerDown", function (e) {
                    e.identifier = e.pointerId, t.onTouchBegin(e), t.prevent(e)
                }, !1), this.canvas.addEventListener("MSPointerMove", function (e) {
                    e.identifier = e.pointerId, t.onTouchMove(e), t.prevent(e)
                }, !1), this.canvas.addEventListener("MSPointerUp", function (e) {
                    e.identifier = e.pointerId, t.onTouchEnd(e), t.prevent(e)
                }, !1)) : (e.Capabilities.$isMobile || this.addMouseListener(), this.addTouchListener())
            }, r.prototype.addMouseListener = function () {
                this.canvas.addEventListener("mousedown", this.onTouchBegin), this.canvas.addEventListener("mousemove", this.onTouchMove), this.canvas.addEventListener("mouseup", this.onTouchEnd)
            }, r.prototype.addTouchListener = function () {
                var e = this;
                this.canvas.addEventListener("touchstart", function (t) {
                    for (var r = t.changedTouches.length, i = 0; i < r; i++) e.onTouchBegin(t.changedTouches[i]);
                    e.prevent(t)
                }, !1), this.canvas.addEventListener("touchmove", function (t) {
                    for (var r = t.changedTouches.length, i = 0; i < r; i++) e.onTouchMove(t.changedTouches[i]);
                    e.prevent(t)
                }, !1), this.canvas.addEventListener("touchend", function (t) {
                    for (var r = t.changedTouches.length, i = 0; i < r; i++) e.onTouchEnd(t.changedTouches[i]);
                    e.prevent(t)
                }, !1), this.canvas.addEventListener("touchcancel", function (t) {
                    for (var r = t.changedTouches.length, i = 0; i < r; i++) e.onTouchEnd(t.changedTouches[i]);
                    e.prevent(t)
                }, !1)
            }, r.prototype.prevent = function (e) {
                e.stopPropagation(), 1 == e.isScroll || this.canvas.userTyping || e.preventDefault()
            }, r.prototype.getLocation = function (t) {
                t.identifier = +t.identifier || 0;
                var r = document.documentElement, i = this.canvas.getBoundingClientRect(),
                    n = i.left + window.pageXOffset - r.clientLeft, o = i.top + window.pageYOffset - r.clientTop,
                    a = t.pageX - n, s = a, l = t.pageY - o, h = l;
                return 90 == this.rotation ? (s = l, h = i.width - a) : this.rotation == -90 && (s = i.height - l, h = a), s /= this.scaleX, h /= this.scaleY, e.$TempPoint.setTo(Math.round(s), Math.round(h))
            }, r.prototype.updateScaleMode = function (e, t, r) {
                this.scaleX = e, this.scaleY = t, this.rotation = r
            }, r.prototype.$updateMaxTouches = function () {
                this.touch.$initMaxTouches()
            }, r
        }(e.HashObject);
        t.WebTouchHandler = r, __reflect(r.prototype, "egret.web.WebTouchHandler")
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function (e) {
    var t;
    !function (t) {
        var r = function (t) {
            function r(e) {
                var r = t.call(this) || this;
                return r.isActivate = !0, r.stage = e, r.registerListener(), r
            }

            return __extends(r, t), r.prototype.registerListener = function () {
                var t = this, r = function () {
                    t.isActivate && (t.isActivate = !1, t.stage.dispatchEvent(new e.Event(e.Event.DEACTIVATE)))
                }, i = function () {
                    t.isActivate || (t.isActivate = !0, t.stage.dispatchEvent(new e.Event(e.Event.ACTIVATE)))
                }, n = function () {
                    document[o] ? r() : i()
                };
                window.addEventListener("focus", i, !1), window.addEventListener("blur", r, !1);
                var o, a;
                "undefined" != typeof document.hidden ? (o = "hidden", a = "visibilitychange") : "undefined" != typeof document.mozHidden ? (o = "mozHidden", a = "mozvisibilitychange") : "undefined" != typeof document.msHidden ? (o = "msHidden", a = "msvisibilitychange") : "undefined" != typeof document.webkitHidden ? (o = "webkitHidden", a = "webkitvisibilitychange") : "undefined" != typeof document.oHidden && (o = "oHidden", a = "ovisibilitychange"), "onpageshow" in window && "onpagehide" in window && (window.addEventListener("pageshow", i, !1), window.addEventListener("pagehide", r, !1)), o && a && document.addEventListener(a, n, !1);
                var s = navigator.userAgent, l = /micromessenger/gi.test(s), h = /mqq/gi.test(s),
                    c = /mobile.*qq/gi.test(s);
                if ((c || l) && (h = !1), h) {
                    var u = window.browser || {};
                    u.execWebFn = u.execWebFn || {}, u.execWebFn.postX5GamePlayerMessage = function (e) {
                        var t = e.type;
                        "app_enter_background" == t ? r() : "app_enter_foreground" == t && i()
                    }, window.browser = u
                }
            }, r
        }(e.HashObject);
        t.WebHideHandler = r, __reflect(r.prototype, "egret.web.WebHideHandler")
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function (e) {
    var t;
    !function (t) {
        function r(e, t) {
            var r = "";
            if (null != t) r = i(e, t); else {
                if (null == s) {
                    var n = document.createElement("div").style;
                    s = i("transform", n)
                }
                r = s
            }
            return "" == r ? e : r + e.charAt(0).toUpperCase() + e.substring(1, e.length)
        }

        function i(e, t) {
            if (e in t) return "";
            e = e.charAt(0).toUpperCase() + e.substring(1, e.length);
            for (var r = ["webkit", "ms", "Moz", "O"], i = 0; i < r.length; i++) {
                var n = r[i] + e;
                if (n in t) return r[i]
            }
            return ""
        }

        var n = function () {
            function e() {
            }

            return e
        }();
        n.QQ_AUDIO = 1, n.WEB_AUDIO = 2, n.HTML5_AUDIO = 3, t.AudioType = n, __reflect(n.prototype, "egret.web.AudioType");
        var o = function () {
            function e() {
            }

            return e
        }();
        o.WPHONE = 1, o.IOS = 2, o.ADNROID = 3, t.SystemOSType = o, __reflect(o.prototype, "egret.web.SystemOSType");
        var a = function (t) {
            function r() {
                return t.call(this) || this
            }

            return __extends(r, t), r.$init = function () {
                var t = navigator.userAgent.toLowerCase();
                r.ua = t, e.Capabilities.$isMobile = t.indexOf("mobile") != -1 || t.indexOf("android") != -1, r._canUseBlob = !1;
                var i, a = r._audioType, s = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
                if (1 == a || 2 == a || 3 == a ? (i = !1, r.setAudioType(a)) : (i = !0, r.setAudioType(n.HTML5_AUDIO)), t.indexOf("windows phone") >= 0) r._System_OS = o.WPHONE, e.Capabilities.$os = "Windows Phone"; else if (t.indexOf("android") >= 0) {
                    if (e.Capabilities.$os = "Android", r._System_OS = o.ADNROID, i && (s ? r.setAudioType(n.WEB_AUDIO) : r.setAudioType(n.HTML5_AUDIO)), window.hasOwnProperty("QZAppExternal") && t.indexOf("qzone") >= 0) {
                        i && r.setAudioType(n.QQ_AUDIO);
                        var l = document.getElementsByTagName("base");
                        if (l && l.length > 0) r._QQRootPath = l[0].baseURI; else {
                            var h = window.location.href.indexOf("?");
                            h == -1 && (h = window.location.href.length);
                            var c = window.location.href.substring(0, h);
                            c = c.substring(0, c.lastIndexOf("/")), r._QQRootPath = c + "/"
                        }
                    }
                } else t.indexOf("iphone") >= 0 || t.indexOf("ipad") >= 0 || t.indexOf("ipod") >= 0 ? (e.Capabilities.$os = "iOS", r._System_OS = o.IOS, r.getIOSVersion() >= 7 && (r._canUseBlob = !0, i && r.setAudioType(n.WEB_AUDIO))) : t.indexOf("windows nt") != -1 ? e.Capabilities.$os = "Windows PC" : t.indexOf("mac os") != -1 && (e.Capabilities.$os = "Mac OS");
                var u = window.URL || window.webkitURL;
                u || (r._canUseBlob = !1), t.indexOf("egretnative") >= 0 && (r.setAudioType(n.HTML5_AUDIO), r._canUseBlob = !0), e.Sound = r._AudioClass
            }, r.setAudioType = function (t) {
                switch (r._audioType = t, t) {
                    case n.QQ_AUDIO:
                        r._AudioClass = e.web.QQSound;
                        break;
                    case n.WEB_AUDIO:
                        r._AudioClass = e.web.WebAudioSound;
                        break;
                    case n.HTML5_AUDIO:
                        r._AudioClass = e.web.HtmlSound
                }
            }, r.getIOSVersion = function () {
                var e = r.ua.toLowerCase().match(/cpu [^\d]*\d.*like mac os x/)[0];
                return parseInt(e.match(/\d+(_\d)*/)[0]) || 0
            }, r.checkHtml5Support = function () {
                var t = (navigator.language || navigator.browserLanguage).toLowerCase(), r = t.split("-");
                r.length > 1 && (r[1] = r[1].toUpperCase()), e.Capabilities.$language = r.join("-")
            }, r
        }(e.HashObject);
        a._canUseBlob = !1, a._audioType = 0, a._QQRootPath = "", a._System_OS = 0, a.ua = "", t.Html5Capatibility = a, __reflect(a.prototype, "egret.web.Html5Capatibility");
        var s = null;
        t.getPrefixStyleName = r, t.getPrefix = i
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function (e) {
    var t;
    !function (t) {
        function r(e) {
            e.onStart(h), l = e
        }

        function i() {
            if (c) for (var e = document.querySelectorAll(".egret-player"), t = e.length, r = 0; r < t; r++) {
                var i = e[r], n = i["egret-player"];
                n.updateScreenSize()
            }
        }

        function n(r) {
            if (!c) {
                if (c = !0, r || (r = {}), t.Html5Capatibility._audioType = r.audioType, t.Html5Capatibility.$init(), "webgl" == r.renderMode) {
                    var i = r.antialias;
                    t.WebGLRenderContext.antialias = !!i
                }
                if (e.sys.CanvasRenderBuffer = t.CanvasRenderBuffer, o(r.renderMode), r.retina) {
                    var n = e.sys.canvasHitTestBuffer.context,
                        s = n.backingStorePixelRatio || n.webkitBackingStorePixelRatio || n.mozBackingStorePixelRatio || n.msBackingStorePixelRatio || n.oBackingStorePixelRatio || n.backingStorePixelRatio || 1;
                    e.sys.DisplayList.$setDevicePixelRatio((window.devicePixelRatio || 1) / s)
                }
                var l = e.sys.$ticker;
                a(l), r.screenAdapter ? e.sys.screenAdapter = r.screenAdapter : e.sys.screenAdapter || (e.sys.screenAdapter = new e.sys.DefaultScreenAdapter);
                for (var h = document.querySelectorAll(".egret-player"), u = h.length, d = 0; d < u; d++) {
                    var p = h[d], f = new t.WebPlayer(p, r);
                    p["egret-player"] = f, "webgl" == e.Capabilities.$renderMode && (f.stage.dirtyRegionPolicy = e.DirtyRegionPolicy.OFF)
                }
                "webgl" == e.Capabilities.$renderMode && (e.sys.DisplayList.prototype.setDirtyRegionPolicy = function () {
                })
            }
        }

        function o(r) {
            "webgl" == r && e.WebGLUtils.checkCanUseWebGL() ? (e.sys.RenderBuffer = t.WebGLRenderBuffer, e.sys.systemRenderer = new t.WebGLRenderer, e.sys.canvasRenderer = new e.CanvasRenderer, e.sys.customHitTestBuffer = new t.WebGLRenderBuffer(3, 3), e.sys.canvasHitTestBuffer = new t.CanvasRenderBuffer(3, 3), e.Capabilities.$renderMode = "webgl") : (e.sys.RenderBuffer = t.CanvasRenderBuffer, e.sys.systemRenderer = new e.CanvasRenderer, e.sys.canvasRenderer = e.sys.systemRenderer, e.sys.customHitTestBuffer = new t.CanvasRenderBuffer(3, 3), e.sys.canvasHitTestBuffer = e.sys.customHitTestBuffer, e.Capabilities.$renderMode = "canvas")
        }

        function a(e) {
            function t() {
                l && l.onRender(h), e.update(), r.call(window, t)
            }

            var r = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
            r || (r = function (e) {
                return window.setTimeout(e, 1e3 / 60)
            }), r.call(window, t)
        }

        function s() {
            u = NaN, e.updateAllScreens(), l && l.onResize(h)
        }

        var l, h = {
            setAutoClear: function (e) {
                t.WebGLRenderBuffer.autoClear = e
            }, save: function () {
            }, restore: function () {
                var e = t.WebGLRenderContext.getInstance(0, 0), r = e.context;
                r.bindBuffer(r.ARRAY_BUFFER, e.vertexBuffer), r.bindBuffer(r.ELEMENT_ARRAY_BUFFER, e.indexBuffer), r.activeTexture(r.TEXTURE0), e.currentProgram = null, e.bindIndices = !1;
                var i = e.$bufferStack[1];
                e.activateBuffer(i), r.enable(r.BLEND), e.setBlendMode("source-over")
            }
        };
        e.setRendererContext = r;
        var c = !1;
        window.isNaN = function (e) {
            return e = +e, e !== e
        }, e.runEgret = n, e.updateAllScreens = i;
        var u = NaN;
        window.addEventListener("resize", function () {
            isNaN(u) && (u = window.setTimeout(s, 300))
        })
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var language = navigator.language || navigator.browserLanguage || "en_US";
language = language.replace("-", "_"), language in egret.$locale_strings && (egret.$language = language);
var egret;
!function (e) {
    var t;
    !function (t) {
        var r = function () {
            function e() {
            }

            return e.call = function (e, t) {
            }, e.addCallback = function (e, t) {
            }, e
        }();
        t.WebExternalInterface = r, __reflect(r.prototype, "egret.web.WebExternalInterface", ["egret.ExternalInterface"]);
        var i = navigator.userAgent.toLowerCase();
        i.indexOf("egretnative") < 0 && (e.ExternalInterface = r)
    }(t = e.web || (e.web = {}))
}(egret || (egret = {})), function (e) {
    var t;
    !function (t) {
        function r(t) {
            var r = JSON.parse(t), n = r.functionName, o = i[n];
            if (o) {
                var a = r.value;
                o.call(null, a)
            } else e.$warn(1050, n)
        }

        var i = {}, n = function () {
            function e() {
            }

            return e.call = function (e, t) {
                var r = {};
                r.functionName = e, r.value = t, egret_native.sendInfoToPlugin(JSON.stringify(r))
            }, e.addCallback = function (e, t) {
                i[e] = t
            }, e
        }();
        t.NativeExternalInterface = n, __reflect(n.prototype, "egret.web.NativeExternalInterface", ["egret.ExternalInterface"]);
        var o = navigator.userAgent.toLowerCase();
        o.indexOf("egretnative") >= 0 && (e.ExternalInterface = n, egret_native.receivedPluginInfo = r)
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function (e) {
    var t;
    !function (t) {
        var r = function (t) {
            function r(r, i, n, o, a) {
                var s = t.call(this) || this;
                if (s.showPanle = !0, s.fpsHeight = 0, s.WIDTH = 101, s.HEIGHT = 20, s.bgCanvasColor = "#18304b", s.fpsFrontColor = "#18fefe", s.WIDTH_COST = 33, s.cost1Color = "#18fefe", s.cost2Color = "#ffff00", s.cost3Color = "#ff0000", s.arrFps = [], s.arrCost = [], s.arrLog = [], i || n) {
                    "canvas" == e.Capabilities.renderMode ? s.renderMode = "Canvas" : s.renderMode = "WebGL", s.panelX = void 0 === a.x ? 0 : parseInt(a.x), s.panelY = void 0 === a.y ? 0 : parseInt(a.y), s.fontColor = void 0 === a.textColor ? "#ffffff" : a.textColor.replace("0x", "#"), s.fontSize = void 0 === a.size ? 12 : parseInt(a.size), e.Capabilities.isMobile && (s.fontSize -= 2);
                    var l = document.createElement("div");
                    l.style.position = "absolute", l.style.background = "rgba(0,0,0," + a.bgAlpha + ")", l.style.left = s.panelX + "px", l.style.top = s.panelY + "px", l.style.pointerEvents = "none", document.body.appendChild(l);
                    var h = document.createElement("div");
                    h.style.color = s.fontColor, h.style.fontSize = s.fontSize + "px", h.style.lineHeight = s.fontSize + "px", h.style.margin = "4px 4px 4px 4px", s.container = h, l.appendChild(h), i && s.addFps(), n && s.addLog()
                }
                return s
            }

            return __extends(r, t), r.prototype.addFps = function () {
                var e = document.createElement("div");
                e.style.display = "inline-block", this.containerFps = e, this.container.appendChild(e);
                var t = document.createElement("div");
                t.style.paddingBottom = "2px", this.fps = t, this.containerFps.appendChild(t), t.innerHTML = "0 FPS " + this.renderMode + "<br/>min0 max0 avg0";
                var r = document.createElement("canvas");
                this.containerFps.appendChild(r), r.width = this.WIDTH, r.height = this.HEIGHT, this.canvasFps = r;
                var i = r.getContext("2d");
                this.contextFps = i, i.fillStyle = this.bgCanvasColor, i.fillRect(0, 0, this.WIDTH, this.HEIGHT);
                var n = document.createElement("div");
                this.divDatas = n, this.containerFps.appendChild(n);
                var o = document.createElement("div");
                o.style["float"] = "left", o.innerHTML = "Draw<br/>Dirty<br/>Cost", n.appendChild(o);
                var a = document.createElement("div");
                a.style.paddingLeft = o.offsetWidth + 20 + "px", n.appendChild(a);
                var s = document.createElement("div");
                this.divDraw = s, s.innerHTML = "0<br/>0<br/>", a.appendChild(s);
                var l = document.createElement("div");
                this.divCost = l, l.innerHTML = '<font  style="color:' + this.cost1Color + '">0<font/> <font  style="color:' + this.cost2Color + '">0<font/> <font  style="color:' + this.cost3Color + '">0<font/>', a.appendChild(l), r = document.createElement("canvas"), this.canvasCost = r, this.containerFps.appendChild(r), r.width = this.WIDTH, r.height = this.HEIGHT, i = r.getContext("2d"), this.contextCost = i, i.fillStyle = this.bgCanvasColor, i.fillRect(0, 0, this.WIDTH, this.HEIGHT), i.fillStyle = "#000000", i.fillRect(this.WIDTH_COST, 0, 1, this.HEIGHT), i.fillRect(2 * this.WIDTH_COST + 1, 0, 1, this.HEIGHT), this.fpsHeight = this.container.offsetHeight
            }, r.prototype.addLog = function () {
                var e = document.createElement("div");
                e.style.maxWidth = document.body.clientWidth - 8 - this.panelX + "px", e.style.wordWrap = "break-word", this.log = e, this.container.appendChild(e)
            }, r.prototype.update = function (e, t) {
                void 0 === t && (t = !1);
                var r, i, n, o;
                t ? (r = this.arrFps[this.arrFps.length - 1], i = this.arrCost[this.arrCost.length - 1][0], n = this.arrCost[this.arrCost.length - 1][1], o = this.arrCost[this.arrCost.length - 1][2]) : (r = e.fps, i = e.costTicker, n = e.costDirty, o = e.costRender, this.lastNumDraw = e.draw, this.lastNumDirty = e.dirty, this.arrFps.push(r), this.arrCost.push([i, n, o]));
                var a = 0, s = this.arrFps.length;
                s > 101 && (s = 101, this.arrFps.shift(), this.arrCost.shift());
                for (var l = this.arrFps[0], h = this.arrFps[0], c = 0; c < s; c++) {
                    var u = this.arrFps[c];
                    a += u, u < l ? l = u : u > h && (h = u)
                }
                var d = this.WIDTH, p = this.HEIGHT, f = this.contextFps;
                f.drawImage(this.canvasFps, 1, 0, d - 1, p, 0, 0, d - 1, p), f.fillStyle = this.bgCanvasColor, f.fillRect(d - 1, 0, 1, p);
                var g = Math.floor(r / 60 * 20);
                g < 1 && (g = 1), f.fillStyle = this.fpsFrontColor, f.fillRect(d - 1, 20 - g, 1, g);
                var v = this.WIDTH_COST;
                f = this.contextCost, f.drawImage(this.canvasCost, 1, 0, v - 1, p, 0, 0, v - 1, p), f.drawImage(this.canvasCost, v + 2, 0, v - 1, p, v + 1, 0, v - 1, p), f.drawImage(this.canvasCost, 2 * v + 3, 0, v - 1, p, 2 * v + 2, 0, v - 1, p);
                var y = Math.floor(i / 2);
                y < 1 ? y = 1 : y > 20 && (y = 20);
                var m = Math.floor(n / 2);
                m < 1 ? m = 1 : m > 20 && (m = 20);
                var x = Math.floor(o / 2);
                x < 1 ? x = 1 : x > 20 && (x = 20), f.fillStyle = this.bgCanvasColor, f.fillRect(v - 1, 0, 1, p), f.fillRect(2 * v, 0, 1, p), f.fillRect(3 * v + 1, 0, 1, p), f.fillStyle = this.cost1Color, f.fillRect(v - 1, 20 - y, 1, y), f.fillStyle = this.cost2Color, f.fillRect(2 * v, 20 - m, 1, m), f.fillStyle = this.cost3Color, f.fillRect(3 * v + 1, 20 - x, 1, x);
                var b = Math.floor(a / s), w = r + " FPS " + this.renderMode;
                this.showPanle && (w += "<br/>min" + l + " max" + h + " avg" + b, this.divDraw.innerHTML = this.lastNumDraw + "<br/>" + this.lastNumDirty + "%<br/>", this.divCost.innerHTML = '<font  style="color:#18fefe">' + i + '<font/> <font  style="color:#ffff00">' + n + '<font/> <font  style="color:#ff0000">' + o + "<font/>"), this.fps.innerHTML = w
            }, r.prototype.updateInfo = function (e) {
                for (this.arrLog.push(e), this.log.innerHTML = this.arrLog.join("<br/>"); document.body.clientHeight < this.log.offsetHeight + this.fpsHeight + this.panelY + 2 * this.fontSize;) this.arrLog.shift(), this.log.innerHTML = this.arrLog.join("<br/>")
            }, r
        }(e.DisplayObject);
        t.WebFps = r, __reflect(r.prototype, "egret.web.WebFps", ["egret.FPSDisplay", "egret.DisplayObject"]), e.FPSDisplay = r
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function (e) {
    var t;
    !function (t) {
        function r(e) {
            if (window.location) {
                var t = location.search;
                if ("" == t) return "";
                t = t.slice(1);
                for (var r = t.split("&"), i = r.length, n = 0; n < i; n++) {
                    var o = r[n], a = o.split("=");
                    if (a[0] == e) return a[1]
                }
            }
            return ""
        }

        t.getOption = r, e.getOption = r
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function (e) {
    var t;
    !function (t) {
        var r = function (r) {
            function i(e, t) {
                var i = r.call(this) || this;
                return i.init(e, t), i.initOrientation(), i
            }

            return __extends(i, r), i.prototype.init = function (r, i) {
                var n = this.readOption(r, i), o = new e.Stage;
                o.$screen = this, o.$scaleMode = n.scaleMode, o.$orientation = n.orientation, o.$maxTouches = n.maxTouches, o.frameRate = n.frameRate, o.textureScaleFactor = n.textureScaleFactor;
                var a = new e.sys.RenderBuffer((void 0), (void 0), (!0)), s = a.surface;
                this.attachCanvas(r, s);
                var l = new t.WebTouchHandler(o, s), h = new e.sys.Player(a, o, n.entryClassName),
                    c = new e.web.WebHideHandler(o), u = new t.HTMLInput;
                h.showPaintRect(n.showPaintRect), (n.showFPS || n.showLog) && h.displayFPS(n.showFPS, n.showLog, n.logFilter, n.fpsStyles), this.playerOption = n, this.container = r, this.canvas = s, this.stage = o, this.player = h, this.webTouchHandler = l, this.webInput = u, this.webHide = c, e.web.$cacheTextAdapter(u, o, r, s), this.updateScreenSize(), this.updateMaxTouches(), h.start()
            }, i.prototype.initOrientation = function () {
                var t = this;
                window.addEventListener("orientationchange", function () {
                    window.setTimeout(function () {
                        e.StageOrientationEvent.dispatchStageOrientationEvent(t.stage, e.StageOrientationEvent.ORIENTATION_CHANGE)
                    }, 350)
                })
            }, i.prototype.readOption = function (t, r) {
                var i = {};
                i.entryClassName = t.getAttribute("data-entry-class"), i.scaleMode = t.getAttribute("data-scale-mode") || e.StageScaleMode.NO_SCALE, i.frameRate = +t.getAttribute("data-frame-rate") || 30, i.contentWidth = +t.getAttribute("data-content-width") || 480, i.contentHeight = +t.getAttribute("data-content-height") || 800, i.orientation = t.getAttribute("data-orientation") || e.OrientationMode.AUTO, i.maxTouches = +t.getAttribute("data-multi-fingered") || 2, i.textureScaleFactor = +t.getAttribute("texture-scale-factor") || 1, "webgl" == r.renderMode ? i.showPaintRect = !1 : i.showPaintRect = "true" == t.getAttribute("data-show-paint-rect"), i.showFPS = "true" == t.getAttribute("data-show-fps");
                for (var n = t.getAttribute("data-show-fps-style") || "", o = n.split(","), a = {}, s = 0; s < o.length; s++) {
                    var l = o[s].split(":");
                    a[l[0]] = l[1]
                }
                return i.fpsStyles = a, i.showLog = "true" == t.getAttribute("data-show-log"), i.logFilter = t.getAttribute("data-log-filter"), i
            }, i.prototype.attachCanvas = function (e, t) {
                var r = t.style;
                r.cursor = "inherit", r.position = "absolute", r.top = "0", r.bottom = "0", r.left = "0", r.right = "0", e.appendChild(t), r = e.style, r.overflow = "hidden", r.position = "relative"
            }, i.prototype.updateScreenSize = function () {
                var t = this.canvas;
                if (!t.userTyping) {
                    var r = this.playerOption, i = this.container.getBoundingClientRect(), n = !1,
                        o = this.stage.$orientation;
                    o != e.OrientationMode.AUTO && (n = o != e.OrientationMode.PORTRAIT && i.height > i.width || o == e.OrientationMode.PORTRAIT && i.width > i.height);
                    var a = n ? i.height : i.width, s = n ? i.width : i.height;
                    e.Capabilities.$boundingClientWidth = a, e.Capabilities.$boundingClientHeight = s;
                    var l = e.sys.screenAdapter.calculateStageSize(this.stage.$scaleMode, a, s, r.contentWidth, r.contentHeight),
                        h = l.stageWidth, c = l.stageHeight, u = a, d = u*9/16;
                    t.width !== h && (t.width = h), t.height !== c && (t.height = c), t.style[e.web.getPrefixStyleName("transformOrigin")] = "0% 0% 0px", t.style.width = u + "px", t.style.height = d + "px";
                    var p = 0;
                    n ? o == e.OrientationMode.LANDSCAPE ? (p = 90, t.style.top = (i.height - u) / 2 + "px", t.style.left = (i.width + d) / 2 + "px") : (p = -90, t.style.top = (i.height + u) / 2 + "px", t.style.left = (i.width - d) / 2 + "px") : (t.style.top = (i.height - d) / 2 + "px", t.style.left = (i.width - u) / 2 + "px");
                    var f = "rotate(" + p + "deg)";
                    t.style[e.web.getPrefixStyleName("transform")] = f;
                    var g = u / h, v = d / c;
                    this.webTouchHandler.updateScaleMode(g, v, p), this.webInput.$updateSize(), this.player.updateStageSize(h, c)
                }
            }, i.prototype.setContentSize = function (e, t) {
                var r = this.playerOption;
                r.contentWidth = e, r.contentHeight = t, this.updateScreenSize()
            }, i.prototype.updateMaxTouches = function () {
                this.webTouchHandler.$updateMaxTouches()
            }, i
        }(e.HashObject);
        t.WebPlayer = r, __reflect(r.prototype, "egret.web.WebPlayer", ["egret.sys.Screen"])
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function (e) {
    var t;
    !function (t) {
        function r(t, r) {
            s || (s = document.createElement("canvas"), l = s.getContext("2d"));
            var i = t.$getTextureWidth(), n = t.$getTextureHeight();
            null == r && (r = e.$TempRectangle, r.x = 0, r.y = 0, r.width = i, r.height = n), r.x = Math.min(r.x, i - 1), r.y = Math.min(r.y, n - 1), r.width = Math.min(r.width, i - r.x), r.height = Math.min(r.height, n - r.y);
            var o = r.width, a = r.height, h = s;
            if (h.style.width = o + "px", h.style.height = a + "px", s.width = o, s.height = a, "webgl" == e.Capabilities.$renderMode) {
                var c = void 0;
                t.$renderBuffer ? c = t : (c = new e.RenderTexture, c.drawToTexture(new e.Bitmap(t)));
                for (var u = c.$renderBuffer.getPixels(r.x, r.y, o, a), d = new ImageData(o, a), p = 0; p < u.length; p++) d.data[p] = u[p];
                return l.putImageData(d, 0, 0), t.$renderBuffer || c.dispose(), h
            }
            var f = t, g = Math.round(f._offsetX), v = Math.round(f._offsetY), y = f._bitmapWidth, m = f._bitmapHeight;
            return l.drawImage(f._bitmapData.source, f._bitmapX + r.x / e.$TextureScaleFactor, f._bitmapY + r.y / e.$TextureScaleFactor, y * r.width / i, m * r.height / n, g, v, r.width, r.height), h
        }

        function i(t, i) {
            try {
                var n = r(this, i), o = n.toDataURL(t);
                return o
            } catch (a) {
                e.$error(1033)
            }
            return null
        }

        function n(e, t, r) {
            var n = i.call(this, e, r);
            if (null != n) {
                var o = n.replace(/^data:image[^;]*/, "data:image/octet-stream"), a = document.createElement("a");
                a.download = t, a.href = o;
                var s = document.createEvent("MouseEvents");
                s.initMouseEvent("click", !0, !1, window, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), a.dispatchEvent(s)
            }
        }

        function o(t, r) {
            return e.$warn(1041, "getPixel32", "getPixels"), this.getPixels(t, r)
        }

        function a(t, i, n, o) {
            void 0 === n && (n = 1), void 0 === o && (o = 1);
            try {
                var a = (r(this), l.getImageData(t, i, n, o).data);
                return a
            } catch (s) {
                e.$error(1039)
            }
        }

        var s, l;
        e.Texture.prototype.toDataURL = i, e.Texture.prototype.saveToFile = n, e.Texture.prototype.getPixel32 = o, e.Texture.prototype.getPixels = a
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function (e) {
    var t;
    !function (t) {
        function r(e) {
            for (var t = s.parseFromString(e, "text/xml"), r = t.childNodes.length, n = 0; n < r; n++) {
                var o = t.childNodes[n];
                if (1 == o.nodeType) return i(o, null)
            }
            return null
        }

        function i(e, t) {
            if ("parsererror" == e.localName) throw new Error(e.textContent);
            for (var r = new o(e.localName, t, e.prefix, e.namespaceURI, e.nodeName), n = e.attributes, s = r.attributes, l = n.length, h = 0; h < l; h++) {
                var c = n[h], u = c.name;
                0 != u.indexOf("xmlns:") && (s[u] = c.value, r["$" + u] = c.value)
            }
            var d = e.childNodes;
            l = d.length;
            for (var p = r.children, h = 0; h < l; h++) {
                var f = d[h], g = f.nodeType, v = null;
                if (1 == g) v = i(f, r); else if (3 == g) {
                    var y = f.textContent.trim();
                    y && (v = new a(y, r))
                }
                v && p.push(v)
            }
            return r
        }

        var n = function () {
            function e(e, t) {
                this.nodeType = e, this.parent = t
            }

            return e
        }();
        t.XMLNode = n, __reflect(n.prototype, "egret.web.XMLNode");
        var o = function (e) {
            function t(t, r, i, n, o) {
                var a = e.call(this, 1, r) || this;
                return a.attributes = {}, a.children = [], a.localName = t, a.prefix = i, a.namespace = n, a.name = o, a
            }

            return __extends(t, e), t
        }(n);
        t.XML = o, __reflect(o.prototype, "egret.web.XML");
        var a = function (e) {
            function t(t, r) {
                var i = e.call(this, 3, r) || this;
                return i.text = t, i
            }

            return __extends(t, e), t
        }(n);
        t.XMLText = a, __reflect(a.prototype, "egret.web.XMLText");
        var s = new DOMParser;
        e.XML = {parse: r}
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function (e) {
    var t;
    !function (t) {
        var r = function (t) {
            function r() {
                var r = null !== t && t.apply(this, arguments) || this;
                return r.onChange = function (t) {
                    var i = new e.OrientationEvent(e.Event.CHANGE);
                    i.beta = t.beta, i.gamma = t.gamma, i.alpha = t.alpha, r.dispatchEvent(i)
                }, r
            }

            return __extends(r, t), r.prototype.start = function () {
                window.addEventListener("deviceorientation", this.onChange)
            }, r.prototype.stop = function () {
                window.removeEventListener("deviceorientation", this.onChange)
            }, r
        }(e.EventDispatcher);
        t.WebDeviceOrientation = r, __reflect(r.prototype, "egret.web.WebDeviceOrientation", ["egret.DeviceOrientation"])
    }(t = e.web || (e.web = {}))
}(egret || (egret = {})), egret.DeviceOrientation = egret.web.WebDeviceOrientation;
var egret;
!function (e) {
    var t;
    !function (t) {
        var r = function (t) {
            function r(r) {
                var i = t.call(this) || this;
                return i.onUpdate = function (t) {
                    var r = new e.GeolocationEvent(e.Event.CHANGE), n = t.coords;
                    r.altitude = n.altitude, r.heading = n.heading, r.accuracy = n.accuracy, r.latitude = n.latitude, r.longitude = n.longitude, r.speed = n.speed, r.altitudeAccuracy = n.altitudeAccuracy, i.dispatchEvent(r)
                }, i.onError = function (t) {
                    var r = e.GeolocationEvent.UNAVAILABLE;
                    t.code == t.PERMISSION_DENIED && (r = e.GeolocationEvent.PERMISSION_DENIED);
                    var n = new e.GeolocationEvent(e.IOErrorEvent.IO_ERROR);
                    n.errorType = r, n.errorMessage = t.message, i.dispatchEvent(n)
                }, i.geolocation = navigator.geolocation, i
            }

            return __extends(r, t), r.prototype.start = function () {
                var t = this.geolocation;
                t ? this.watchId = t.watchPosition(this.onUpdate, this.onError) : this.onError({
                    code: 2,
                    message: e.sys.tr(3004),
                    PERMISSION_DENIED: 1,
                    POSITION_UNAVAILABLE: 2
                })
            }, r.prototype.stop = function () {
                var e = this.geolocation;
                e.clearWatch(this.watchId)
            }, r
        }(e.EventDispatcher);
        t.WebGeolocation = r, __reflect(r.prototype, "egret.web.WebGeolocation", ["egret.Geolocation"]), e.Geolocation = e.web.WebGeolocation
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function (e) {
    var t;
    !function (t) {
        var r = function (t) {
            function r() {
                var r = null !== t && t.apply(this, arguments) || this;
                return r.onChange = function (t) {
                    var i = new e.MotionEvent(e.Event.CHANGE),
                        n = {x: t.acceleration.x, y: t.acceleration.y, z: t.acceleration.z}, o = {
                            x: t.accelerationIncludingGravity.x,
                            y: t.accelerationIncludingGravity.y,
                            z: t.accelerationIncludingGravity.z
                        }, a = {alpha: t.rotationRate.alpha, beta: t.rotationRate.beta, gamma: t.rotationRate.gamma};
                    i.acceleration = n, i.accelerationIncludingGravity = o, i.rotationRate = a, r.dispatchEvent(i)
                }, r
            }

            return __extends(r, t), r.prototype.start = function () {
                window.addEventListener("devicemotion", this.onChange)
            }, r.prototype.stop = function () {
                window.removeEventListener("devicemotion", this.onChange)
            }, r
        }(e.EventDispatcher);
        t.WebMotion = r, __reflect(r.prototype, "egret.web.WebMotion", ["egret.Motion"]), e.Motion = e.web.WebMotion
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function (e) {
    var t;
    !function (t) {
        function r(t) {
            switch (null == i && (i = {
                error: console.error,
                debug: console.debug,
                warn: console.warn,
                info: console.info,
                log: console.log
            }), t) {
                case e.Logger.OFF:
                    console.error = function () {
                    };
                case e.Logger.ERROR:
                    console.warn = function () {
                    };
                case e.Logger.WARN:
                    console.info = function () {
                    }, console.log = function () {
                    };
                case e.Logger.INFO:
                    console.debug = function () {
                    }
            }
            switch (t) {
                case e.Logger.ALL:
                case e.Logger.DEBUG:
                    console.debug = i.debug;
                case e.Logger.INFO:
                    console.log = i.log, console.info = i.info;
                case e.Logger.WARN:
                    console.warn = i.warn;
                case e.Logger.ERROR:
                    console.error = i.error
            }
        }

        var i;
        Object.defineProperty(e.Logger, "logLevel", {set: r, enumerable: !0, configurable: !0})
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function (e) {
    var t;
    !function (e) {
        var t = function () {
            function e() {
                this.drawData = [], this.drawDataLen = 0
            }

            return e.prototype.pushDrawRect = function () {
                if (0 == this.drawDataLen || 1 != this.drawData[this.drawDataLen - 1].type) {
                    var e = this.drawData[this.drawDataLen] || {};
                    e.type = 1, e.count = 0, this.drawData[this.drawDataLen] = e, this.drawDataLen++
                }
                this.drawData[this.drawDataLen - 1].count += 2
            }, e.prototype.pushDrawTexture = function (e, t, r, i, n) {
                if (void 0 === t && (t = 2), r) {
                    var o = this.drawData[this.drawDataLen] || {};
                    o.type = 0, o.texture = e, o.filter = r, o.count = t, o.textureWidth = i, o.textureHeight = n, this.drawData[this.drawDataLen] = o, this.drawDataLen++
                } else {
                    if (0 == this.drawDataLen || 0 != this.drawData[this.drawDataLen - 1].type || e != this.drawData[this.drawDataLen - 1].texture || this.drawData[this.drawDataLen - 1].filter) {
                        var o = this.drawData[this.drawDataLen] || {};
                        o.type = 0, o.texture = e, o.count = 0, this.drawData[this.drawDataLen] = o, this.drawDataLen++
                    }
                    this.drawData[this.drawDataLen - 1].count += t
                }
            }, e.prototype.pushChangeSmoothing = function (e, t) {
                e.smoothing = t;
                var r = this.drawData[this.drawDataLen] || {};
                r.type = 10, r.texture = e, r.smoothing = t, this.drawData[this.drawDataLen] = r, this.drawDataLen++
            }, e.prototype.pushPushMask = function (e) {
                void 0 === e && (e = 1);
                var t = this.drawData[this.drawDataLen] || {};
                t.type = 2, t.count = 2 * e, this.drawData[this.drawDataLen] = t, this.drawDataLen++
            }, e.prototype.pushPopMask = function (e) {
                void 0 === e && (e = 1);
                var t = this.drawData[this.drawDataLen] || {};
                t.type = 3, t.count = 2 * e, this.drawData[this.drawDataLen] = t, this.drawDataLen++
            }, e.prototype.pushSetBlend = function (e) {
                for (var t = this.drawDataLen, r = !1, i = t - 1; i >= 0; i--) {
                    var n = this.drawData[i];
                    if (n) {
                        if (0 != n.type && 1 != n.type || (r = !0), !r && 4 == n.type) {
                            this.drawData.splice(i, 1), this.drawDataLen--;
                            continue
                        }
                        if (4 == n.type) {
                            if (n.value == e) return;
                            break
                        }
                    }
                }
                var o = this.drawData[this.drawDataLen] || {};
                o.type = 4, o.value = e, this.drawData[this.drawDataLen] = o, this.drawDataLen++
            }, e.prototype.pushResize = function (e, t, r) {
                var i = this.drawData[this.drawDataLen] || {};
                i.type = 5, i.buffer = e, i.width = t, i.height = r, this.drawData[this.drawDataLen] = i, this.drawDataLen++
            }, e.prototype.pushClearColor = function () {
                var e = this.drawData[this.drawDataLen] || {};
                e.type = 6, this.drawData[this.drawDataLen] = e, this.drawDataLen++
            }, e.prototype.pushActivateBuffer = function (e) {
                for (var t = this.drawDataLen, r = !1, i = t - 1; i >= 0; i--) {
                    var n = this.drawData[i];
                    !n || (4 != n.type && 7 != n.type && (r = !0), r || 7 != n.type) || (this.drawData.splice(i, 1), this.drawDataLen--)
                }
                var o = this.drawData[this.drawDataLen] || {};
                o.type = 7, o.buffer = e, o.width = e.rootRenderTarget.width, o.height = e.rootRenderTarget.height, this.drawData[this.drawDataLen] = o, this.drawDataLen++
            }, e.prototype.pushEnableScissor = function (e, t, r, i) {
                var n = this.drawData[this.drawDataLen] || {};
                n.type = 8, n.x = e, n.y = t, n.width = r, n.height = i, this.drawData[this.drawDataLen] = n, this.drawDataLen++
            }, e.prototype.pushDisableScissor = function () {
                var e = this.drawData[this.drawDataLen] || {};
                e.type = 9, this.drawData[this.drawDataLen] = e, this.drawDataLen++
            }, e.prototype.clear = function () {
                for (var e = 0; e < this.drawDataLen; e++) {
                    var t = this.drawData[e];
                    t.type = 0, t.count = 0, t.texture = null, t.filter = null, t.uv = null, t.value = "", t.buffer = null, t.width = 0, t.height = 0
                }
                this.drawDataLen = 0
            }, e
        }();
        e.WebGLDrawCmdManager = t, __reflect(t.prototype, "egret.web.WebGLDrawCmdManager")
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function (e) {
    var t;
    !function (e) {
        var t = function () {
            function e() {
                this.size = 2e3, this.vertexMaxSize = 4 * this.size, this.indicesMaxSize = 6 * this.size, this.vertSize = 5, this.vertices = null, this.indices = null, this.indicesForMesh = null, this.vertexIndex = 0, this.indexIndex = 0, this.hasMesh = !1;
                var e = this.vertexMaxSize * this.vertSize, t = this.indicesMaxSize;
                this.vertices = new Float32Array(e), this.indices = new Uint16Array(t), this.indicesForMesh = new Uint16Array(t);
                for (var r = 0, i = 0; r < t; r += 6, i += 4) this.indices[r + 0] = i + 0, this.indices[r + 1] = i + 1, this.indices[r + 2] = i + 2, this.indices[r + 3] = i + 0, this.indices[r + 4] = i + 2, this.indices[r + 5] = i + 3
            }

            return e.prototype.reachMaxSize = function (e, t) {
                return void 0 === e && (e = 4), void 0 === t && (t = 6), this.vertexIndex > this.vertexMaxSize - e || this.indexIndex > this.indicesMaxSize - t
            }, e.prototype.getVertices = function () {
                var e = this.vertices.subarray(0, this.vertexIndex * this.vertSize);
                return e
            }, e.prototype.getIndices = function () {
                return this.indices
            }, e.prototype.getMeshIndices = function () {
                return this.indicesForMesh
            }, e.prototype.changeToMeshIndices = function () {
                if (!this.hasMesh) {
                    for (var e = 0, t = this.indexIndex; e < t; ++e) this.indicesForMesh[e] = this.indices[e];
                    this.hasMesh = !0
                }
            }, e.prototype.isMesh = function () {
                return this.hasMesh
            }, e.prototype.cacheArrays = function (e, t, r, i, n, o, a, s, l, h, c, u, d, p, f) {
                var g = e, v = g.a, y = g.b, m = g.c, x = g.d, b = g.tx, w = g.ty;
                0 == a && 0 == s || g.append(1, 0, 0, 1, a, s), n / l == 1 && o / h == 1 || g.append(l / n, 0, 0, h / o, 0, 0);
                var E = g.a, T = g.b, _ = g.c, S = g.d, C = g.tx, R = g.ty;
                if (g.a = v, g.b = y, g.c = m, g.d = x, g.tx = b, g.ty = w, p) {
                    var L = this.vertices, A = this.vertexIndex * this.vertSize, D = 0, O = 0, I = 0, M = 0, $ = 0,
                        B = 0, P = 0;
                    for (D = 0, I = d.length; D < I; D += 2) O = 5 * D / 2, B = p[D], P = p[D + 1], M = d[D], $ = d[D + 1], L[A + O + 0] = E * B + _ * P + C, L[A + O + 1] = T * B + S * P + R, L[A + O + 2] = (r + M * n) / c, L[A + O + 3] = (i + $ * o) / u, L[A + O + 4] = t;
                    if (this.hasMesh) for (var F = 0, W = f.length; F < W; ++F) this.indicesForMesh[this.indexIndex + F] = f[F] + this.vertexIndex;
                    this.vertexIndex += d.length / 2, this.indexIndex += f.length
                } else {
                    var N = c, G = u, H = n, U = o;
                    r /= N, i /= G, n /= N, o /= G;
                    var L = this.vertices, A = this.vertexIndex * this.vertSize;
                    if (L[A++] = C, L[A++] = R, L[A++] = r, L[A++] = i, L[A++] = t, L[A++] = E * H + C, L[A++] = T * H + R, L[A++] = n + r, L[A++] = i, L[A++] = t, L[A++] = E * H + _ * U + C, L[A++] = S * U + T * H + R, L[A++] = n + r, L[A++] = o + i, L[A++] = t, L[A++] = _ * U + C, L[A++] = S * U + R, L[A++] = r, L[A++] = o + i, L[A++] = t, this.hasMesh) {
                        var k = this.indicesForMesh;
                        k[this.indexIndex + 0] = 0 + this.vertexIndex, k[this.indexIndex + 1] = 1 + this.vertexIndex, k[this.indexIndex + 2] = 2 + this.vertexIndex, k[this.indexIndex + 3] = 0 + this.vertexIndex, k[this.indexIndex + 4] = 2 + this.vertexIndex, k[this.indexIndex + 5] = 3 + this.vertexIndex
                    }
                    this.vertexIndex += 4, this.indexIndex += 6
                }
            }, e.prototype.clear = function () {
                this.hasMesh = !1, this.vertexIndex = 0, this.indexIndex = 0
            }, e
        }();
        e.WebGLVertexArrayObject = t, __reflect(t.prototype, "egret.web.WebGLVertexArrayObject")
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function (e) {
    var t;
    !function (t) {
        var r = function (e) {
            function t(t, r, i) {
                var n = e.call(this) || this;
                return n.clearColor = [0, 0, 0, 0], n.useFrameBuffer = !0, n.gl = t, n.width = r || 1, n.height = i || 1, n
            }

            return __extends(t, e), t.prototype.resize = function (e, t) {
                var r = this.gl;
                this.width = e, this.height = t, this.frameBuffer && (r.bindTexture(r.TEXTURE_2D, this.texture), r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, e, t, 0, r.RGBA, r.UNSIGNED_BYTE, null)), this.stencilBuffer && (r.deleteRenderbuffer(this.stencilBuffer), this.stencilBuffer = null)
            }, t.prototype.activate = function () {
                var e = this.gl;
                e.bindFramebuffer(e.FRAMEBUFFER, this.getFrameBuffer())
            }, t.prototype.getFrameBuffer = function () {
                return this.useFrameBuffer ? this.frameBuffer : null
            }, t.prototype.initFrameBuffer = function () {
                if (!this.frameBuffer) {
                    var e = this.gl;
                    this.texture = this.createTexture(), this.frameBuffer = e.createFramebuffer(), e.bindFramebuffer(e.FRAMEBUFFER, this.frameBuffer), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, this.texture, 0)
                }
            }, t.prototype.createTexture = function () {
                var e = this.gl, t = e.createTexture();
                return e.bindTexture(e.TEXTURE_2D, t), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, this.width, this.height, 0, e.RGBA, e.UNSIGNED_BYTE, null), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), t
            }, t.prototype.clear = function (e) {
                var t = this.gl;
                e && this.activate(), t.colorMask(!0, !0, !0, !0), t.clearColor(this.clearColor[0], this.clearColor[1], this.clearColor[2], this.clearColor[3]), t.clear(t.COLOR_BUFFER_BIT)
            }, t.prototype.enabledStencil = function () {
                if (this.frameBuffer && !this.stencilBuffer) {
                    var e = this.gl;
                    e.bindFramebuffer(e.FRAMEBUFFER, this.frameBuffer), this.stencilBuffer = e.createRenderbuffer(), e.bindRenderbuffer(e.RENDERBUFFER, this.stencilBuffer), e.renderbufferStorage(e.RENDERBUFFER, e.DEPTH_STENCIL, this.width, this.height), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.DEPTH_STENCIL_ATTACHMENT, e.RENDERBUFFER, this.stencilBuffer)
                }
            }, t
        }(e.HashObject);
        t.WebGLRenderTarget = r, __reflect(r.prototype, "egret.web.WebGLRenderTarget")
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function (e) {
    var t;
    !function (t) {
        function r(e, t) {
            var r = document.createElement("canvas");
            return isNaN(e) || isNaN(t) || (r.width = e, r.height = t), r
        }

        var i = function () {
            function i(e, i) {
                this.glID = null, this.projectionX = NaN, this.projectionY = NaN, this.contextLost = !1, this.$scissorState = !1, this.vertSize = 5, this.surface = r(e, i), this.initWebGL(), this.$bufferStack = [];
                var n = this.context;
                this.vertexBuffer = n.createBuffer(), this.indexBuffer = n.createBuffer(), n.bindBuffer(n.ARRAY_BUFFER, this.vertexBuffer), n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, this.indexBuffer), this.drawCmdManager = new t.WebGLDrawCmdManager, this.vao = new t.WebGLVertexArrayObject, this.setGlobalCompositeOperation("source-over")
            }

            return i.getInstance = function (e, t) {
                return this.instance ? this.instance : (this.instance = new i(e, t), this.instance)
            }, i.prototype.pushBuffer = function (e) {
                this.$bufferStack.push(e), e != this.currentBuffer && (this.currentBuffer, this.drawCmdManager.pushActivateBuffer(e)), this.currentBuffer = e
            }, i.prototype.popBuffer = function () {
                if (!(this.$bufferStack.length <= 1)) {
                    var e = this.$bufferStack.pop(), t = this.$bufferStack[this.$bufferStack.length - 1];
                    e != t && this.drawCmdManager.pushActivateBuffer(t), this.currentBuffer = t
                }
            }, i.prototype.activateBuffer = function (e) {
                e.rootRenderTarget.activate(), this.bindIndices || this.uploadIndicesArray(this.vao.getIndices()), e.restoreStencil(), e.restoreScissor(), this.onResize(e.width, e.height)
            }, i.prototype.uploadVerticesArray = function (e) {
                var t = this.context;
                t.bufferData(t.ARRAY_BUFFER, e, t.STREAM_DRAW)
            }, i.prototype.uploadIndicesArray = function (e) {
                var t = this.context;
                t.bufferData(t.ELEMENT_ARRAY_BUFFER, e, t.STATIC_DRAW), this.bindIndices = !0
            }, i.prototype.destroy = function () {
                this.surface.width = this.surface.height = 0
            }, i.prototype.onResize = function (e, t) {
                e = e || this.surface.width, t = t || this.surface.height, this.projectionX = e / 2, this.projectionY = -t / 2, this.context && this.context.viewport(0, 0, e, t)
            }, i.prototype.resize = function (e, t, r) {
                var i = this.surface;
                r ? (i.width < e && (i.width = e), i.height < t && (i.height = t)) : (i.width != e && (i.width = e), i.height != t && (i.height = t)), this.onResize()
            }, i.prototype.initWebGL = function () {
                this.onResize(), this.surface.addEventListener("webglcontextlost", this.handleContextLost.bind(this), !1), this.surface.addEventListener("webglcontextrestored", this.handleContextRestored.bind(this), !1), this.getWebGLContext();
                var e = this.context;
                this.$maxTextureSize = e.getParameter(e.MAX_TEXTURE_SIZE)
            }, i.prototype.handleContextLost = function () {
                this.contextLost = !0
            }, i.prototype.handleContextRestored = function () {
                this.initWebGL(), this.contextLost = !1
            }, i.prototype.getWebGLContext = function () {
                for (var t, r = {
                    antialias: i.antialias,
                    stencil: !0
                }, n = ["webgl", "experimental-webgl"], o = 0; o < n.length; o++) {
                    try {
                        t = this.surface.getContext(n[o], r)
                    } catch (a) {
                    }
                    if (t) break
                }
                t || e.$error(1021), this.setContext(t)
            }, i.prototype.setContext = function (e) {
                this.context = e, e.id = i.glContextId++, this.glID = e.id, e.disable(e.DEPTH_TEST), e.disable(e.CULL_FACE), e.enable(e.BLEND), e.colorMask(!0, !0, !0, !0), e.activeTexture(e.TEXTURE0)
            }, i.prototype.enableStencilTest = function () {
                var e = this.context;
                e.enable(e.STENCIL_TEST)
            }, i.prototype.disableStencilTest = function () {
                var e = this.context;
                e.disable(e.STENCIL_TEST)
            }, i.prototype.enableScissorTest = function (e) {
                var t = this.context;
                t.enable(t.SCISSOR_TEST), t.scissor(e.x, e.y, e.width, e.height)
            }, i.prototype.disableScissorTest = function () {
                var e = this.context;
                e.disable(e.SCISSOR_TEST)
            }, i.prototype.getPixels = function (e, t, r, i, n) {
                var o = this.context;
                o.readPixels(e, t, r, i, o.RGBA, o.UNSIGNED_BYTE, n)
            }, i.prototype.createTexture = function (e) {
                var t = this.context, r = t.createTexture();
                return r ? (r.glContext = t, t.bindTexture(t.TEXTURE_2D, r), t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, e), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), r) : void(this.contextLost = !0)
            }, i.prototype.createTextureFromCompressedData = function (e, t, r, i, n) {
                return null
            }, i.prototype.updateTexture = function (e, t) {
                var r = this.context;
                r.bindTexture(r.TEXTURE_2D, e), r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, r.RGBA, r.UNSIGNED_BYTE, t)
            }, i.prototype.getWebGLTexture = function (e) {
                return e.webGLTexture || ("image" == e.format ? e.webGLTexture = this.createTexture(e.source) : "pvr" == e.format && (e.webGLTexture = this.createTextureFromCompressedData(e.source.pvrtcData, e.width, e.height, e.source.mipmapsCount, e.source.format)), e.$deleteSource && e.webGLTexture && (e.source = null), e.webGLTexture.smoothing = !0), e.webGLTexture
            }, i.prototype.clearRect = function (e, t, r, i) {
                if (0 != e || 0 != t || r != this.surface.width || i != this.surface.height) {
                    var n = this.currentBuffer;
                    if (n.$hasScissor) this.setGlobalCompositeOperation("destination-out"), this.drawRect(e, t, r, i), this.setGlobalCompositeOperation("source-over"); else {
                        var o = n.globalMatrix;
                        0 == o.b && 0 == o.c ? (e = e * o.a + o.tx, t = t * o.d + o.ty, r *= o.a, i *= o.d, this.enableScissor(e, -t - i + n.height, r, i), this.clear(), this.disableScissor()) : (this.setGlobalCompositeOperation("destination-out"), this.drawRect(e, t, r, i), this.setGlobalCompositeOperation("source-over"))
                    }
                } else this.clear()
            }, i.prototype.setGlobalCompositeOperation = function (e) {
                this.drawCmdManager.pushSetBlend(e)
            }, i.prototype.drawImage = function (e, t, r, i, n, o, a, s, l, h, c, u) {
                var d = this.currentBuffer;
                if (!this.contextLost && e && d) {
                    var p;
                    if (e.texture || e.source && e.source.texture) p = e.texture || e.source.texture, d.saveTransform(), d.transform(1, 0, 0, -1, 0, l + 2 * a); else {
                        if (!e.source && !e.webGLTexture) return;
                        p = this.getWebGLTexture(e)
                    }
                    p && (this.drawTexture(p, t, r, i, n, o, a, s, l, h, c, void 0, void 0, void 0, void 0, u), e.source && e.source.texture && d.restoreTransform())
                }
            }, i.prototype.drawMesh = function (e, t, r, i, n, o, a, s, l, h, c, u, d, p, f, g) {
                var v = this.currentBuffer;
                if (!this.contextLost && e && v) {
                    var y;
                    if (e.texture || e.source && e.source.texture) y = e.texture || e.source.texture, v.saveTransform(), v.transform(1, 0, 0, -1, 0, l + 2 * a); else {
                        if (!e.source && !e.webGLTexture) return;
                        y = this.getWebGLTexture(e)
                    }
                    y && (this.drawTexture(y, t, r, i, n, o, a, s, l, h, c, u, d, p, f, g), (e.texture || e.source && e.source.texture) && v.restoreTransform())
                }
            }, i.prototype.drawTexture = function (e, t, r, i, n, o, a, s, l, h, c, u, d, p, f, g) {
                var v = this.currentBuffer;
                if (!this.contextLost && e && v) {
                    d && p ? this.vao.reachMaxSize(d.length / 2, p.length) && this.$drawWebGL() : this.vao.reachMaxSize() && this.$drawWebGL(), void 0 != g && e.smoothing != g && this.drawCmdManager.pushChangeSmoothing(e, g), u && this.vao.changeToMeshIndices();
                    var y = v.globalMatrix, m = v.globalAlpha, x = p ? p.length / 3 : 2;
                    this.drawCmdManager.pushDrawTexture(e, x, this.$filter), this.vao.cacheArrays(y, m, t, r, i, n, o, a, s, l, h, c, u, d, p)
                }
            }, i.prototype.drawRect = function (e, t, r, i) {
                var n = this.currentBuffer;
                !this.contextLost && n && (this.vao.reachMaxSize() && this.$drawWebGL(), this.drawCmdManager.pushDrawRect(), this.vao.cacheArrays(n.globalMatrix, n.globalAlpha, 0, 0, r, i, e, t, r, i, r, i))
            }, i.prototype.pushMask = function (e) {
                var t = this.currentBuffer;
                if (!this.contextLost && t) {
                    t.$stencilList.push(e), this.vao.reachMaxSize() && this.$drawWebGL();
                    var r = e.length;
                    if (r) {
                        this.drawCmdManager.pushPushMask(r);
                        for (var i = 0; i < r; i++) {
                            var n = e[i];
                            this.vao.cacheArrays(t.globalMatrix, t.globalAlpha, 0, 0, n.width, n.height, n.minX, n.minY, n.width, n.height, n.width, n.height)
                        }
                    } else this.drawCmdManager.pushPushMask(), this.vao.cacheArrays(t.globalMatrix, t.globalAlpha, 0, 0, e.width, e.height, e.x, e.y, e.width, e.height, e.width, e.height)
                }
            }, i.prototype.popMask = function () {
                var e = this.currentBuffer;
                if (!this.contextLost && e) {
                    var t = e.$stencilList.pop();
                    this.vao.reachMaxSize() && this.$drawWebGL();
                    var r = t.length;
                    if (r) {
                        this.drawCmdManager.pushPopMask(r);
                        for (var i = 0; i < r; i++) {
                            var n = t[i];
                            this.vao.cacheArrays(e.globalMatrix, e.globalAlpha, 0, 0, n.width, n.height, n.minX, n.minY, n.width, n.height, n.width, n.height)
                        }
                    } else this.drawCmdManager.pushPopMask(), this.vao.cacheArrays(e.globalMatrix, e.globalAlpha, 0, 0, t.width, t.height, t.x, t.y, t.width, t.height, t.width, t.height)
                }
            }, i.prototype.clear = function () {
                this.drawCmdManager.pushClearColor()
            }, i.prototype.enableScissor = function (e, t, r, i) {
                var n = this.currentBuffer;
                this.drawCmdManager.pushEnableScissor(e, t, r, i), n.$hasScissor = !0
            }, i.prototype.disableScissor = function () {
                var e = this.currentBuffer;
                this.drawCmdManager.pushDisableScissor(), e.$hasScissor = !1
            }, i.prototype.$drawWebGL = function () {
                if (0 != this.drawCmdManager.drawDataLen && !this.contextLost) {
                    this.uploadVerticesArray(this.vao.getVertices()), this.vao.isMesh() && this.uploadIndicesArray(this.vao.getMeshIndices());
                    for (var e = this.drawCmdManager.drawDataLen, t = 0, r = 0; r < e; r++) {
                        var i = this.drawCmdManager.drawData[r];
                        t = this.drawData(i, t), 7 == i.type && (this.activatedBuffer = i.buffer), 0 != i.type && 1 != i.type && 2 != i.type && 3 != i.type || this.activatedBuffer && this.activatedBuffer.$computeDrawCall && this.activatedBuffer.$drawCalls++
                    }
                    this.vao.isMesh() && this.uploadIndicesArray(this.vao.getIndices()), this.drawCmdManager.clear(), this.vao.clear()
                }
            }, i.prototype.drawData = function (e, r) {
                if (e) {
                    var i, n = this.context, o = e.filter;
                    switch (e.type) {
                        case 0:
                            o ? "custom" === o.type ? i = t.EgretWebGLProgram.getProgram(n, o.$vertexSrc, o.$fragmentSrc, o.$shaderKey) : "colorTransform" === o.type ? i = t.EgretWebGLProgram.getProgram(n, t.EgretShaderLib.default_vert, t.EgretShaderLib.colorTransform_frag, "colorTransform") : "blurX" === o.type ? i = t.EgretWebGLProgram.getProgram(n, t.EgretShaderLib.default_vert, t.EgretShaderLib.blur_frag, "blur") : "blurY" === o.type ? i = t.EgretWebGLProgram.getProgram(n, t.EgretShaderLib.default_vert, t.EgretShaderLib.blur_frag, "blur") : "glow" === o.type && (i = t.EgretWebGLProgram.getProgram(n, t.EgretShaderLib.default_vert, t.EgretShaderLib.glow_frag, "glow")) : i = t.EgretWebGLProgram.getProgram(n, t.EgretShaderLib.default_vert, t.EgretShaderLib.texture_frag, "texture"), this.activeProgram(n, i), this.syncUniforms(i, o, e.textureWidth, e.textureHeight), r += this.drawTextureElements(e, r);
                            break;
                        case 1:
                            i = t.EgretWebGLProgram.getProgram(n, t.EgretShaderLib.default_vert, t.EgretShaderLib.primitive_frag, "primitive"), this.activeProgram(n, i), this.syncUniforms(i, o, e.textureWidth, e.textureHeight), r += this.drawRectElements(e, r);
                            break;
                        case 2:
                            i = t.EgretWebGLProgram.getProgram(n, t.EgretShaderLib.default_vert, t.EgretShaderLib.primitive_frag, "primitive"), this.activeProgram(n, i), this.syncUniforms(i, o, e.textureWidth, e.textureHeight), r += this.drawPushMaskElements(e, r);
                            break;
                        case 3:
                            i = t.EgretWebGLProgram.getProgram(n, t.EgretShaderLib.default_vert, t.EgretShaderLib.primitive_frag, "primitive"), this.activeProgram(n, i), this.syncUniforms(i, o, e.textureWidth, e.textureHeight), r += this.drawPopMaskElements(e, r);
                            break;
                        case 4:
                            this.setBlendMode(e.value);
                            break;
                        case 5:
                            e.buffer.rootRenderTarget.resize(e.width, e.height), this.onResize(e.width, e.height);
                            break;
                        case 6:
                            if (this.activatedBuffer) {
                                var a = this.activatedBuffer.rootRenderTarget;
                                0 == a.width && 0 == a.height || a.clear()
                            }
                            break;
                        case 7:
                            this.activateBuffer(e.buffer);
                            break;
                        case 8:
                            var s = this.activatedBuffer;
                            s && (s.rootRenderTarget && s.rootRenderTarget.enabledStencil(), s.enableScissor(e.x, e.y, e.width, e.height));
                            break;
                        case 9:
                            s = this.activatedBuffer, s && s.disableScissor();
                            break;
                        case 10:
                            n.bindTexture(n.TEXTURE_2D, e.texture), e.smoothing ? (n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MAG_FILTER, n.LINEAR), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, n.LINEAR)) : (n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MAG_FILTER, n.NEAREST), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, n.NEAREST))
                    }
                    return r
                }
            }, i.prototype.activeProgram = function (e, t) {
                if (t != this.currentProgram) {
                    e.useProgram(t.id);
                    var r = t.attributes;
                    for (var i in r) "aVertexPosition" === i ? (e.vertexAttribPointer(r.aVertexPosition.location, 2, e.FLOAT, !1, 20, 0), e.enableVertexAttribArray(r.aVertexPosition.location)) : "aTextureCoord" === i ? (e.vertexAttribPointer(r.aTextureCoord.location, 2, e.FLOAT, !1, 20, 8), e.enableVertexAttribArray(r.aTextureCoord.location)) : "aColor" === i && (e.vertexAttribPointer(r.aColor.location, 1, e.FLOAT, !1, 20, 16), e.enableVertexAttribArray(r.aColor.location));
                    this.currentProgram = t
                }
            }, i.prototype.syncUniforms = function (e, t, r, i) {
                var n = e.uniforms;
                t && "custom" === t.type;
                for (var o in n) if ("projectionVector" === o) n[o].setValue({
                    x: this.projectionX,
                    y: this.projectionY
                }); else if ("uTextureSize" === o) n[o].setValue({x: r, y: i}); else if ("uSampler" === o) ; else {
                    var a = t.$uniforms[o];
                    void 0 !== a && n[o].setValue(a)
                }
            }, i.prototype.drawTextureElements = function (e, t) {
                var r = this.context;
                r.bindTexture(r.TEXTURE_2D, e.texture);
                var i = 3 * e.count;
                return r.drawElements(r.TRIANGLES, i, r.UNSIGNED_SHORT, 2 * t), i
            }, i.prototype.drawRectElements = function (e, t) {
                var r = this.context, i = 3 * e.count;
                return r.drawElements(r.TRIANGLES, i, r.UNSIGNED_SHORT, 2 * t), i
            }, i.prototype.drawPushMaskElements = function (e, t) {
                var r = this.context, i = 3 * e.count, n = this.activatedBuffer;
                if (n) {
                    n.rootRenderTarget && n.rootRenderTarget.enabledStencil(), 0 == n.stencilHandleCount && (n.enableStencil(), r.clear(r.STENCIL_BUFFER_BIT));
                    var o = n.stencilHandleCount;
                    n.stencilHandleCount++, r.colorMask(!1, !1, !1, !1), r.stencilFunc(r.EQUAL, o, 255), r.stencilOp(r.KEEP, r.KEEP, r.INCR), r.drawElements(r.TRIANGLES, i, r.UNSIGNED_SHORT, 2 * t), r.stencilFunc(r.EQUAL, o + 1, 255), r.colorMask(!0, !0, !0, !0), r.stencilOp(r.KEEP, r.KEEP, r.KEEP)
                }
                return i
            }, i.prototype.drawPopMaskElements = function (e, t) {
                var r = this.context, i = 3 * e.count, n = this.activatedBuffer;
                if (n) if (n.stencilHandleCount--, 0 == n.stencilHandleCount) n.disableStencil(); else {
                    var o = n.stencilHandleCount;
                    r.colorMask(!1, !1, !1, !1), r.stencilFunc(r.EQUAL, o + 1, 255), r.stencilOp(r.KEEP, r.KEEP, r.DECR), r.drawElements(r.TRIANGLES, i, r.UNSIGNED_SHORT, 2 * t), r.stencilFunc(r.EQUAL, o, 255), r.colorMask(!0, !0, !0, !0), r.stencilOp(r.KEEP, r.KEEP, r.KEEP)
                }
                return i
            }, i.prototype.setBlendMode = function (e) {
                var t = this.context, r = i.blendModesForGL[e];
                r && t.blendFunc(r[0], r[1])
            }, i.prototype.drawTargetWidthFilters = function (e, r) {
                var i, n = r, o = e.length;
                if (o > 1) for (var a = 0; a < o - 1; a++) {
                    var s = e[a], l = r.rootRenderTarget.width, h = r.rootRenderTarget.height;
                    i = t.WebGLRenderBuffer.create(l, h), i.setTransform(1, 0, 0, 1, 0, 0), i.globalAlpha = 1, this.drawToRenderTarget(s, r, i), r != n && t.WebGLRenderBuffer.release(r), r = i
                }
                var c = e[o - 1];
                this.drawToRenderTarget(c, r, this.currentBuffer), r != n && t.WebGLRenderBuffer.release(r)
            }, i.prototype.drawToRenderTarget = function (e, r, i) {
                if (!this.contextLost) {
                    this.vao.reachMaxSize() && this.$drawWebGL(), this.pushBuffer(i);
                    var n, o = r, a = r.rootRenderTarget.width, s = r.rootRenderTarget.height;
                    if ("blur" == e.type) {
                        var l = e.blurXFilter, h = e.blurYFilter;
                        0 != l.blurX && 0 != h.blurY ? (n = t.WebGLRenderBuffer.create(a, s), n.setTransform(1, 0, 0, 1, 0, 0), n.globalAlpha = 1, this.drawToRenderTarget(e.blurXFilter, r, n), r != o && t.WebGLRenderBuffer.release(r), r = n, e = h) : e = 0 === l.blurX ? h : l
                    }
                    i.saveTransform(), i.transform(1, 0, 0, -1, 0, s), this.vao.cacheArrays(i.globalMatrix, i.globalAlpha, 0, 0, a, s, 0, 0, a, s, a, s), i.restoreTransform(), this.drawCmdManager.pushDrawTexture(r.rootRenderTarget.texture, 2, e, a, s), r != o && t.WebGLRenderBuffer.release(r), this.popBuffer()
                }
            }, i.initBlendMode = function () {
                i.blendModesForGL = {}, i.blendModesForGL["source-over"] = [1, 771], i.blendModesForGL.lighter = [1, 1], i.blendModesForGL["lighter-in"] = [770, 771], i.blendModesForGL["destination-out"] = [0, 771], i.blendModesForGL["destination-in"] = [0, 770]
            }, i
        }();
        i.glContextId = 0, i.blendModesForGL = null, t.WebGLRenderContext = i, __reflect(i.prototype, "egret.web.WebGLRenderContext"), i.initBlendMode()
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function (e) {
    var t;
    !function (t) {
        var r = function (r) {
            function n(i, n, o) {
                var a = r.call(this) || this;
                if (a.globalAlpha = 1, a.stencilState = !1, a.$stencilList = [], a.stencilHandleCount = 0, a.$scissorState = !1, a.scissorRect = new e.Rectangle, a.$hasScissor = !1, a.dirtyRegionPolicy = !0, a._dirtyRegionPolicy = !0, a.$drawCalls = 0, a.$computeDrawCall = !1, a.globalMatrix = new e.Matrix, a.savedGlobalMatrix = new e.Matrix, a.context = t.WebGLRenderContext.getInstance(i, n), a.rootRenderTarget = new t.WebGLRenderTarget(a.context.context, 3, 3), i && n && a.resize(i, n), a.root = o, a.root) a.context.pushBuffer(a), a.surface = a.context.surface; else {
                    var s = a.context.activatedBuffer;
                    s && s.rootRenderTarget.activate(), a.rootRenderTarget.initFrameBuffer(), a.surface = a.rootRenderTarget
                }
                return a
            }

            return __extends(n, r), n.prototype.enableStencil = function () {
                this.stencilState || (this.context.enableStencilTest(), this.stencilState = !0)
            }, n.prototype.disableStencil = function () {
                this.stencilState && (this.context.disableStencilTest(), this.stencilState = !1)
            }, n.prototype.restoreStencil = function () {
                this.stencilState ? this.context.enableStencilTest() : this.context.disableStencilTest()
            }, n.prototype.enableScissor = function (e, t, r, i) {
                this.$scissorState || (this.$scissorState = !0, this.scissorRect.setTo(e, t, r, i), this.context.enableScissorTest(this.scissorRect))
            }, n.prototype.disableScissor = function () {
                this.$scissorState && (this.$scissorState = !1, this.scissorRect.setEmpty(), this.context.disableScissorTest())
            }, n.prototype.restoreScissor = function () {
                this.$scissorState ? this.context.enableScissorTest(this.scissorRect) : this.context.disableScissorTest()
            }, Object.defineProperty(n.prototype, "width", {
                get: function () {
                    return this.rootRenderTarget.width
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(n.prototype, "height", {
                get: function () {
                    return this.rootRenderTarget.height
                }, enumerable: !0, configurable: !0
            }), n.prototype.resize = function (e, t, r) {
                this.context.pushBuffer(this), e = e || 1, t = t || 1, e == this.rootRenderTarget.width && t == this.rootRenderTarget.height || (this.context.drawCmdManager.pushResize(this, e, t), this.rootRenderTarget.width = e, this.rootRenderTarget.height = t), this.root && this.context.resize(e, t, r), this.context.clear(), this.context.popBuffer()
            }, n.prototype.resizeTo = function (e, t, r, i) {
                this.context.pushBuffer(this);
                var o = this.rootRenderTarget.width, a = this.rootRenderTarget.height, s = n.create(o, a);
                this.context.pushBuffer(s), this.context.drawImage(this.rootRenderTarget, 0, 0, o, a, 0, 0, o, a, o, a), this.context.popBuffer(), this.resize(e, t), this.setTransform(1, 0, 0, 1, 0, 0), this.context.drawImage(s.rootRenderTarget, 0, 0, o, a, r, i, o, a, o, a), n.release(s), this.context.popBuffer()
            }, n.prototype.setDirtyRegionPolicy = function (e) {
                this.dirtyRegionPolicy = "on" == e
            }, n.prototype.beginClip = function (e, t, r) {
                this.context.pushBuffer(this), this.root && (this._dirtyRegionPolicy ? (this.rootRenderTarget.useFrameBuffer = !0, this.rootRenderTarget.activate()) : (this.rootRenderTarget.useFrameBuffer = !1, this.rootRenderTarget.activate(), n.autoClear && this.context.clear())), t = +t || 0, r = +r || 0, this.setTransform(1, 0, 0, 1, t, r);
                e.length;
                this.maskPushed = !1, this.rootRenderTarget.useFrameBuffer && this.context.clear(), this.context.popBuffer()
            }, n.prototype.endClip = function () {
                (this.maskPushed || this.scissorEnabled) && (this.context.pushBuffer(this), this.maskPushed && (this.setTransform(1, 0, 0, 1, this.offsetX, this.offsetY), this.context.popMask()), this.scissorEnabled && this.context.disableScissor(), this.context.popBuffer())
            }, n.prototype.getPixels = function (e, t, r, i) {
                void 0 === r && (r = 1), void 0 === i && (i = 1);
                var n = new Uint8Array(4 * r * i), o = this.rootRenderTarget.useFrameBuffer;
                this.rootRenderTarget.useFrameBuffer = !0, this.rootRenderTarget.activate(), this.context.getPixels(e, t, r, i, n), this.rootRenderTarget.useFrameBuffer = o, this.rootRenderTarget.activate();
                for (var a = new Uint8Array(4 * r * i), s = 0; s < i; s++) for (var l = 0; l < r; l++) a[4 * (r * (i - s - 1) + l)] = n[4 * (r * s + l)], a[4 * (r * (i - s - 1) + l) + 1] = n[4 * (r * s + l) + 1], a[4 * (r * (i - s - 1) + l) + 2] = n[4 * (r * s + l) + 2], a[4 * (r * (i - s - 1) + l) + 3] = n[4 * (r * s + l) + 3];
                return a
            }, n.prototype.toDataURL = function (e, t) {
                return this.context.surface.toDataURL(e, t)
            }, n.prototype.destroy = function () {
                this.context.destroy()
            }, n.prototype.onRenderFinish = function () {
                this.$drawCalls = 0, this.root && (!this._dirtyRegionPolicy && this.dirtyRegionPolicy && this.drawSurfaceToFrameBuffer(0, 0, this.rootRenderTarget.width, this.rootRenderTarget.height, 0, 0, this.rootRenderTarget.width, this.rootRenderTarget.height, !0), this._dirtyRegionPolicy && this.drawFrameBufferToSurface(0, 0, this.rootRenderTarget.width, this.rootRenderTarget.height, 0, 0, this.rootRenderTarget.width, this.rootRenderTarget.height), this._dirtyRegionPolicy = this.dirtyRegionPolicy)
            }, n.prototype.drawFrameBufferToSurface = function (e, t, r, i, n, o, a, s, l) {
                void 0 === l && (l = !1), this.rootRenderTarget.useFrameBuffer = !1,
                    this.rootRenderTarget.activate(), this.context.disableStencilTest(), this.context.disableScissorTest(), this.setTransform(1, 0, 0, 1, 0, 0), this.globalAlpha = 1, this.context.setGlobalCompositeOperation("source-over"), l && this.context.clear(), this.context.drawImage(this.rootRenderTarget, e, t, r, i, n, o, a, s, r, i), this.context.$drawWebGL(), this.rootRenderTarget.useFrameBuffer = !0, this.rootRenderTarget.activate(), this.restoreStencil(), this.restoreScissor()
            }, n.prototype.drawSurfaceToFrameBuffer = function (e, t, r, i, n, o, a, s, l) {
                void 0 === l && (l = !1), this.rootRenderTarget.useFrameBuffer = !0, this.rootRenderTarget.activate(), this.context.disableStencilTest(), this.context.disableScissorTest(), this.setTransform(1, 0, 0, 1, 0, 0), this.globalAlpha = 1, this.context.setGlobalCompositeOperation("source-over"), l && this.context.clear(), this.context.drawImage(this.context.surface, e, t, r, i, n, o, a, s, r, i), this.context.$drawWebGL(), this.rootRenderTarget.useFrameBuffer = !1, this.rootRenderTarget.activate(), this.restoreStencil(), this.restoreScissor()
            }, n.prototype.clear = function () {
                this.context.clear()
            }, n.prototype.setTransform = function (e, t, r, i, n, o) {
                var a = this.globalMatrix;
                a.a = e, a.b = t, a.c = r, a.d = i, a.tx = n, a.ty = o
            }, n.prototype.transform = function (e, t, r, i, n, o) {
                var a = this.globalMatrix, s = a.a, l = a.b, h = a.c, c = a.d;
                1 == e && 0 == t && 0 == r && 1 == i || (a.a = e * s + t * h, a.b = e * l + t * c, a.c = r * s + i * h, a.d = r * l + i * c), a.tx = n * s + o * h + a.tx, a.ty = n * l + o * c + a.ty
            }, n.prototype.translate = function (e, t) {
                var r = this.globalMatrix;
                r.tx += e, r.ty += t
            }, n.prototype.saveTransform = function () {
                var e = this.globalMatrix, t = this.savedGlobalMatrix;
                t.a = e.a, t.b = e.b, t.c = e.c, t.d = e.d, t.tx = e.tx, t.ty = e.ty
            }, n.prototype.restoreTransform = function () {
                var e = this.globalMatrix, t = this.savedGlobalMatrix;
                e.a = t.a, e.b = t.b, e.c = t.c, e.d = t.d, e.tx = t.tx, e.ty = t.ty
            }, n.create = function (e, t) {
                var r = i.pop();
                if (r) {
                    r.resize(e, t);
                    var o = r.globalMatrix;
                    o.a = 1, o.b = 0, o.c = 0, o.d = 1, o.tx = 0, o.ty = 0
                } else r = new n(e, t), r.$computeDrawCall = !1;
                return r
            }, n.release = function (e) {
                i.push(e)
            }, n
        }(e.HashObject);
        r.autoClear = !0, t.WebGLRenderBuffer = r, __reflect(r.prototype, "egret.web.WebGLRenderBuffer", ["egret.sys.RenderBuffer"]);
        var i = []
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function (e) {
    var t;
    !function (t) {
        var r = ["source-over", "lighter", "destination-out"], i = "source-over", n = [], o = function () {
            function o() {
                this.nestLevel = 0
            }

            return o.prototype.render = function (e, t, r, i, o) {
                this.nestLevel++;
                var a = t, s = a.context, l = o ? e : null;
                s.pushBuffer(a), this.drawDisplayObject(e, a, i, r, null, null, l), s.$drawWebGL();
                var h = a.$drawCalls;
                if (a.onRenderFinish(), s.popBuffer(), this.nestLevel--, 0 === this.nestLevel) {
                    n.length > 6 && (n.length = 6);
                    for (var c = n.length, u = 0; u < c; u++) n[u].resize(0, 0)
                }
                return h
            }, o.prototype.drawDisplayObject = function (t, r, i, n, o, a, s) {
                var l, h = 0;
                if (o && !s ? (o.isDirty && (h += o.drawToSurface()), l = o.$renderNode) : l = t.$getRenderNode(), l) {
                    if (i) {
                        var c = l.renderRegion;
                        if (a && !a.intersects(c)) l.needRedraw = !1; else if (!l.needRedraw) for (var u = i.length, d = 0; d < u; d++) if (c.intersects(i[d])) {
                            l.needRedraw = !0;
                            break
                        }
                    } else l.needRedraw = !0;
                    if (l.needRedraw) {
                        h++;
                        var p = void 0, f = void 0;
                        s ? (p = t.$getConcatenatedAlphaAt(s, t.$getConcatenatedAlpha()), f = e.Matrix.create().copyFrom(t.$getConcatenatedMatrix()), t.$getConcatenatedMatrixAt(s, f)) : (p = l.renderAlpha, f = e.Matrix.create().copyFrom(l.renderMatrix)), n.$preMultiplyInto(f, f), r.setTransform(f.a, f.b, f.c, f.d, f.tx, f.ty), e.Matrix.release(f), r.globalAlpha = p, this.renderNode(l, r), l.needRedraw = !1
                    }
                }
                if (o && !s) return h;
                var g = t.$children;
                if (g) for (var v = g.length, y = 0; y < v; y++) {
                    var m = g[y];
                    if (!(!m.$visible || m.$alpha <= 0 || m.$maskedObject)) {
                        var x = m.$getFilters();
                        x && x.length > 0 ? h += this.drawWithFilter(m, r, i, n, a, s) : 0 !== m.$blendMode || m.$mask && (m.$mask.$parentDisplayList || s) ? h += this.drawWithClip(m, r, i, n, a, s) : m.$scrollRect || m.$maskRect ? h += this.drawWithScrollRect(m, r, i, n, a, s) : m.isFPS ? (r.context.$drawWebGL(), r.$computeDrawCall = !1, this.drawDisplayObject(m, r, i, n, m.$displayList, a, s), r.context.$drawWebGL(), r.$computeDrawCall = !0) : h += this.drawDisplayObject(m, r, i, n, m.$displayList, a, s)
                    }
                }
                return h
            }, o.prototype.drawWithFilter = function (t, o, a, s, l, h) {
                var c = 0;
                if (!t.$children || 0 != t.$children.length) {
                    var u, d = t.$getFilters(), p = 0 !== t.$blendMode;
                    if (p && (u = r[t.$blendMode], u || (u = i)), 1 == d.length && ("colorTransform" == d[0].type || "custom" === d[0].type && 0 === d[0].padding)) {
                        var f = this.getRenderCount(t);
                        if (!t.$children || 1 == f) return p && o.context.setGlobalCompositeOperation(u), o.context.$filter = d[0], c += t.$mask && (t.$mask.$parentDisplayList || h) ? this.drawWithClip(t, o, a, s, l, h) : t.$scrollRect || t.$maskRect ? this.drawWithScrollRect(t, o, a, s, l, h) : this.drawDisplayObject(t, o, a, s, t.$displayList, l, h), o.context.$filter = null, p && o.context.setGlobalCompositeOperation(i), c
                    }
                    var g = e.Matrix.create();
                    g.copyFrom(t.$getConcatenatedMatrix()), h && t.$getConcatenatedMatrixAt(h, g);
                    var v;
                    v = e.sys.Region.create();
                    var y = t.$getOriginalBounds();
                    v.updateRegion(y, g);
                    var m = this.createRenderBuffer(v.width * s.a, v.height * s.d);
                    m.context.pushBuffer(m), m.setTransform(s.a, 0, 0, s.d, -v.minX * s.a, -v.minY * s.d);
                    var x = e.Matrix.create().setTo(s.a, 0, 0, s.d, -v.minX * s.a, -v.minY * s.d);
                    return c += t.$mask && (t.$mask.$parentDisplayList || h) ? this.drawWithClip(t, m, a, x, v, h) : t.$scrollRect || t.$maskRect ? this.drawWithScrollRect(t, m, a, x, v, h) : this.drawDisplayObject(t, m, a, x, t.$displayList, v, h), e.Matrix.release(x), m.context.popBuffer(), c > 0 && (p && o.context.setGlobalCompositeOperation(u), c++, o.globalAlpha = 1, o.setTransform(1, 0, 0, 1, (v.minX + s.tx) * s.a, (v.minY + s.ty) * s.d), o.context.drawTargetWidthFilters(d, m), p && o.context.setGlobalCompositeOperation(i)), n.push(m), e.sys.Region.release(v), e.Matrix.release(g), c
                }
            }, o.prototype.getRenderCount = function (e) {
                var t = 0;
                if (e.$children) for (var r = 0, i = e.$children; r < i.length; r++) {
                    var n = i[r], o = n.$getRenderNode();
                    t += o.$getRenderCount(), n.$children && (t += this.getRenderCount(n))
                }
                return t
            }, o.prototype.drawWithClip = function (t, o, a, s, l, h) {
                var c, u = 0, d = 0 !== t.$blendMode;
                d && (c = r[t.$blendMode], c || (c = i));
                var p = t.$scrollRect ? t.$scrollRect : t.$maskRect, f = t.$mask;
                if (f) {
                    var g = f.$getRenderNode();
                    if (g) {
                        var v = g.renderMatrix;
                        if (0 == v.a && 0 == v.b || 0 == v.c && 0 == v.d) return u
                    }
                }
                var y, m = e.Matrix.create();
                if (m.copyFrom(t.$getConcatenatedMatrix()), h) t.$getConcatenatedMatrixAt(h, m); else if (t.$parentDisplayList) {
                    var x = t.$parentDisplayList.root;
                    x !== t.$stage && t.$getConcatenatedMatrixAt(x, m)
                }
                var b;
                if (f) {
                    b = f.$getOriginalBounds(), y = e.sys.Region.create();
                    var w = e.Matrix.create();
                    w.copyFrom(f.$getConcatenatedMatrix()), h && f.$getConcatenatedMatrixAt(h, w), y.updateRegion(b, w), e.Matrix.release(w)
                }
                var E;
                if (p && (E = e.sys.Region.create(), E.updateRegion(p, m)), E && y ? (E.intersect(y), e.sys.Region.release(y)) : !E && y && (E = y), E) {
                    if (E.isEmpty() || l && !l.intersects(E)) return e.sys.Region.release(E), e.Matrix.release(m), u
                } else E = e.sys.Region.create(), b = t.$getOriginalBounds(), E.updateRegion(b, m);
                var T = !1;
                if (a) {
                    for (var _ = a.length, S = 0; S < _; S++) if (E.intersects(a[S])) {
                        T = !0;
                        break
                    }
                } else T = !0;
                if (!T) return e.sys.Region.release(E), e.Matrix.release(m), u;
                if (f || t.$children && 0 != t.$children.length) {
                    var C = this.createRenderBuffer(E.width * s.a, E.height * s.d);
                    C.context.pushBuffer(C), C.setTransform(s.a, 0, 0, s.d, -E.minX * s.a, -E.minY * s.d);
                    var R = e.Matrix.create().setTo(s.a, 0, 0, s.d, -E.minX * s.a, -E.minY * s.d);
                    if (u += this.drawDisplayObject(t, C, a, R, t.$displayList, E, h), f) {
                        var L = this.createRenderBuffer(E.width * s.a, E.height * s.d);
                        L.context.pushBuffer(L), L.setTransform(s.a, 0, 0, s.d, -E.minX * s.a, -E.minY * s.d), R = e.Matrix.create().setTo(s.a, 0, 0, s.d, -E.minX * s.a, -E.minY * s.d), u += this.drawDisplayObject(f, L, a, R, f.$displayList, E, h), L.context.popBuffer(), C.context.setGlobalCompositeOperation("destination-in"), C.setTransform(1, 0, 0, -1, 0, L.height), C.globalAlpha = 1;
                        var A = L.rootRenderTarget.width, D = L.rootRenderTarget.height;
                        C.context.drawTexture(L.rootRenderTarget.texture, 0, 0, A, D, 0, 0, A, D, A, D), C.context.setGlobalCompositeOperation("source-over"), n.push(L)
                    }
                    if (e.Matrix.release(R), C.context.setGlobalCompositeOperation(i), C.context.popBuffer(), u > 0) {
                        if (u++, d && o.context.setGlobalCompositeOperation(c), p) {
                            var w = m;
                            s.$preMultiplyInto(w, w), C.setTransform(w.a, w.b, w.c, w.d, w.tx, w.ty), C.context.pushMask(p)
                        }
                        o.globalAlpha = 1, o.setTransform(1, 0, 0, -1, (E.minX + s.tx) * s.a, (E.minY + s.ty) * s.d + C.height);
                        var O = C.rootRenderTarget.width, I = C.rootRenderTarget.height;
                        o.context.drawTexture(C.rootRenderTarget.texture, 0, 0, O, I, 0, 0, O, I, O, I), p && C.context.popMask(), d && o.context.setGlobalCompositeOperation(i)
                    }
                    return n.push(C), e.sys.Region.release(E), e.Matrix.release(m), u
                }
                if (p) {
                    var w = m;
                    o.setTransform(w.a, w.b, w.c, w.d, w.tx, w.ty), o.context.pushMask(p)
                }
                return d && o.context.setGlobalCompositeOperation(c), u += this.drawDisplayObject(t, o, a, s, t.$displayList, l, h), d && o.context.setGlobalCompositeOperation(i), p && o.context.popMask(), e.sys.Region.release(E), e.Matrix.release(m), u
            }, o.prototype.drawWithScrollRect = function (t, r, i, n, o, a) {
                var s = 0, l = t.$scrollRect ? t.$scrollRect : t.$maskRect;
                if (l.isEmpty()) return s;
                var h = e.Matrix.create();
                if (h.copyFrom(t.$getConcatenatedMatrix()), a) t.$getConcatenatedMatrixAt(a, h); else if (t.$parentDisplayList) {
                    var c = t.$parentDisplayList.root;
                    c !== t.$stage && t.$getConcatenatedMatrixAt(c, h)
                }
                var u = e.sys.Region.create();
                if (u.updateRegion(l, h), u.isEmpty() || o && !o.intersects(u)) return e.sys.Region.release(u), e.Matrix.release(h), s;
                var d = !1;
                if (i) {
                    for (var p = i.length, f = 0; f < p; f++) if (u.intersects(i[f])) {
                        d = !0;
                        break
                    }
                } else d = !0;
                if (!d) return e.sys.Region.release(u), e.Matrix.release(h), s;
                n.$preMultiplyInto(h, h), r.setTransform(h.a, h.b, h.c, h.d, h.tx, h.ty);
                var g = r.context, v = !1;
                if (r.$hasScissor || 0 != h.b || 0 != h.c) g.pushMask(l); else {
                    var y = h.a, m = h.d, x = h.tx, b = h.ty, w = l.x, E = l.y, T = w + l.width, _ = E + l.height,
                        S = void 0, C = void 0, R = void 0, L = void 0;
                    if (1 == y && 1 == m) S = w + x, C = E + b, R = T + x, L = _ + b; else {
                        var A = y * w + x, D = m * E + b, O = y * T + x, I = m * E + b, M = y * T + x, $ = m * _ + b,
                            B = y * w + x, P = m * _ + b, F = 0;
                        A > O && (F = A, A = O, O = F), M > B && (F = M, M = B, B = F), S = A < M ? A : M, R = O > B ? O : B, D > I && (F = D, D = I, I = F), $ > P && (F = $, $ = P, P = F), C = D < $ ? D : $, L = I > P ? I : P
                    }
                    g.enableScissor(S + n.tx, -n.ty - L + r.height, R - S, L - C), v = !0
                }
                return s += this.drawDisplayObject(t, r, i, n, t.$displayList, u, a), r.setTransform(h.a, h.b, h.c, h.d, h.tx + n.tx, h.ty + n.ty), v ? g.disableScissor() : g.popMask(), e.sys.Region.release(u), e.Matrix.release(h), s
            }, o.prototype.drawNodeToBuffer = function (e, t, r, i) {
                var n = t;
                n.context.pushBuffer(n), n.setTransform(r.a, r.b, r.c, r.d, r.tx, r.ty), this.renderNode(e, t, i), n.context.$drawWebGL(), n.onRenderFinish(), n.context.popBuffer()
            }, o.prototype.renderNode = function (e, t, r) {
                switch (e.type) {
                    case 1:
                        this.renderBitmap(e, t);
                        break;
                    case 2:
                        this.renderText(e, t);
                        break;
                    case 3:
                        this.renderGraphics(e, t, r);
                        break;
                    case 4:
                        this.renderGroup(e, t);
                        break;
                    case 6:
                        t.globalAlpha = e.drawData[0];
                        break;
                    case 7:
                        this.renderMesh(e, t)
                }
            }, o.prototype.renderBitmap = function (e, t) {
                var n = e.image;
                if (n) {
                    var o = e.drawData, a = o.length, s = 0, l = e.matrix, h = e.blendMode, c = e.alpha;
                    l && (t.saveTransform(), t.transform(l.a, l.b, l.c, l.d, l.tx, l.ty)), h && t.context.setGlobalCompositeOperation(r[h]);
                    var u;
                    if (c == c && (u = t.globalAlpha, t.globalAlpha *= c), e.filter) {
                        for (t.context.$filter = e.filter; s < a;) t.context.drawImage(n, o[s++], o[s++], o[s++], o[s++], o[s++], o[s++], o[s++], o[s++], e.imageWidth, e.imageHeight, e.smoothing);
                        t.context.$filter = null
                    } else for (; s < a;) t.context.drawImage(n, o[s++], o[s++], o[s++], o[s++], o[s++], o[s++], o[s++], o[s++], e.imageWidth, e.imageHeight, e.smoothing);
                    h && t.context.setGlobalCompositeOperation(i), c == c && (t.globalAlpha = u), l && t.restoreTransform()
                }
            }, o.prototype.renderMesh = function (e, t) {
                var r = e.image, i = e.drawData, n = i.length, o = 0, a = e.matrix;
                for (a && (t.saveTransform(), t.transform(a.a, a.b, a.c, a.d, a.tx, a.ty)); o < n;) t.context.drawMesh(r, i[o++], i[o++], i[o++], i[o++], i[o++], i[o++], i[o++], i[o++], e.imageWidth, e.imageHeight, e.uvs, e.vertices, e.indices, e.bounds, e.smoothing);
                a && t.restoreTransform()
            }, o.prototype.renderText = function (r, i) {
                var n = r.width - r.x, o = r.height - r.y, a = e.sys.DisplayList.$pixelRatio,
                    s = i.context.$maxTextureSize;
                (n * a > s || o * a > s) && (a *= n * a > o * a ? s / (n * a) : s / (o * a)), n *= a, o *= a;
                var l = r.x * a, h = r.y * a;
                if (0 != r.drawData.length && (this.canvasRenderBuffer && this.canvasRenderBuffer.context ? r.dirtyRender && this.canvasRenderBuffer.resize(n, o) : (this.canvasRenderer = new e.CanvasRenderer, this.canvasRenderBuffer = new t.CanvasRenderBuffer(n, o), 1 != a && this.canvasRenderBuffer.context.setTransform(a, 0, 0, a, 0, 0)), this.canvasRenderBuffer.context)) {
                    if ((l || h) && (r.dirtyRender && this.canvasRenderBuffer.context.setTransform(a, 0, 0, a, -l, -h), i.transform(1, 0, 0, 1, l / a, h / a)), r.dirtyRender) {
                        var c = this.canvasRenderBuffer.surface;
                        this.canvasRenderer.renderText(r, this.canvasRenderBuffer.context);
                        var u = r.$texture;
                        u ? i.context.updateTexture(u, c) : (u = i.context.createTexture(c), r.$texture = u), r.$textureWidth = c.width, r.$textureHeight = c.height
                    }
                    var d = r.$textureWidth, p = r.$textureHeight;
                    i.context.drawTexture(r.$texture, 0, 0, d, p, 0, 0, d / a, p / a, d, p), (l || h) && (r.dirtyRender && this.canvasRenderBuffer.context.setTransform(a, 0, 0, a, 0, 0), i.transform(1, 0, 0, 1, -l / a, -h / a)), r.dirtyRender = !1
                }
            }, o.prototype.renderGraphics = function (r, i, n) {
                var o = r.width, a = r.height;
                if (!(o <= 0 || a <= 0) && o && a && 0 != r.drawData.length && (this.canvasRenderBuffer && this.canvasRenderBuffer.context ? (r.dirtyRender || n) && this.canvasRenderBuffer.resize(o, a) : (this.canvasRenderer = new e.CanvasRenderer, this.canvasRenderBuffer = new t.CanvasRenderBuffer(o, a)), this.canvasRenderBuffer.context)) {
                    (r.x || r.y) && ((r.dirtyRender || n) && this.canvasRenderBuffer.context.translate(-r.x, -r.y), i.transform(1, 0, 0, 1, r.x, r.y));
                    var s = this.canvasRenderBuffer.surface;
                    if (n) {
                        this.canvasRenderer.renderGraphics(r, this.canvasRenderBuffer.context, !0), e.WebGLUtils.deleteWebGLTexture(s);
                        var l = i.context.getWebGLTexture(s);
                        i.context.drawTexture(l, 0, 0, o, a, 0, 0, o, a, s.width, s.height)
                    } else {
                        if (r.dirtyRender) {
                            this.canvasRenderer.renderGraphics(r, this.canvasRenderBuffer.context);
                            var l = r.$texture;
                            l ? i.context.updateTexture(l, s) : (l = i.context.createTexture(s), r.$texture = l), r.$textureWidth = s.width, r.$textureHeight = s.height
                        }
                        var h = r.$textureWidth, c = r.$textureHeight;
                        i.context.drawTexture(r.$texture, 0, 0, h, c, 0, 0, h, c, h, c)
                    }
                    (r.x || r.y) && ((r.dirtyRender || n) && this.canvasRenderBuffer.context.translate(r.x, r.y), i.transform(1, 0, 0, 1, -r.x, -r.y)), n || (r.dirtyRender = !1)
                }
            }, o.prototype.renderGroup = function (e, t) {
                var r = e.matrix;
                r && (t.saveTransform(), t.transform(r.a, r.b, r.c, r.d, r.tx, r.ty));
                for (var i = e.drawData, n = i.length, o = 0; o < n; o++) {
                    var a = i[o];
                    this.renderNode(a, t)
                }
                r && t.restoreTransform()
            }, o.prototype.createRenderBuffer = function (e, r) {
                var i = n.pop();
                return i ? i.resize(e, r) : (i = new t.WebGLRenderBuffer(e, r), i.$computeDrawCall = !1), i
            }, o
        }();
        t.WebGLRenderer = o, __reflect(o.prototype, "egret.web.WebGLRenderer", ["egret.sys.SystemRenderer"])
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function (e) {
    var t;
    !function (e) {
        var t;
        !function (e) {
            e[e.FLOAT_VEC2 = 35664] = "FLOAT_VEC2", e[e.FLOAT_VEC3 = 35665] = "FLOAT_VEC3", e[e.FLOAT_VEC4 = 35666] = "FLOAT_VEC4", e[e.FLOAT = 5126] = "FLOAT", e[e.BYTE = 65535] = "BYTE", e[e.UNSIGNED_BYTE = 5121] = "UNSIGNED_BYTE", e[e.UNSIGNED_SHORT = 5123] = "UNSIGNED_SHORT"
        }(t = e.WEBGL_ATTRIBUTE_TYPE || (e.WEBGL_ATTRIBUTE_TYPE = {}));
        var r = function () {
            function e(e, t, r) {
                this.gl = e, this.name = r.name, this.type = r.type, this.size = r.size, this.location = e.getAttribLocation(t, this.name), this.count = 0, this.initCount(e), this.format = e.FLOAT, this.initFormat(e)
            }

            return e.prototype.initCount = function (e) {
                var r = this.type;
                switch (r) {
                    case t.FLOAT:
                    case t.BYTE:
                    case t.UNSIGNED_BYTE:
                    case t.UNSIGNED_SHORT:
                        this.count = 1;
                        break;
                    case t.FLOAT_VEC2:
                        this.count = 2;
                        break;
                    case t.FLOAT_VEC3:
                        this.count = 3;
                        break;
                    case t.FLOAT_VEC4:
                        this.count = 4
                }
            }, e.prototype.initFormat = function (e) {
                var r = this.type;
                switch (r) {
                    case t.FLOAT:
                    case t.FLOAT_VEC2:
                    case t.FLOAT_VEC3:
                    case t.FLOAT_VEC4:
                        this.format = e.FLOAT;
                        break;
                    case t.UNSIGNED_BYTE:
                        this.format = e.UNSIGNED_BYTE;
                        break;
                    case t.UNSIGNED_SHORT:
                        this.format = e.UNSIGNED_SHORT;
                        break;
                    case t.BYTE:
                        this.format = e.BYTE
                }
            }, e
        }();
        e.EgretWebGLAttribute = r, __reflect(r.prototype, "egret.web.EgretWebGLAttribute")
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function (e) {
    var t;
    !function (e) {
        function t(e, t, r) {
            var i = e.createShader(t);
            e.shaderSource(i, r), e.compileShader(i);
            var n = e.getShaderParameter(i, e.COMPILE_STATUS);
            return n || (console.log("shader not compiled!"), console.log(e.getShaderInfoLog(i))), i
        }

        function r(e, t, r) {
            var i = e.createProgram();
            return e.attachShader(i, t), e.attachShader(i, r), e.linkProgram(i), i
        }

        function i(t, r) {
            for (var i = {}, n = t.getProgramParameter(r, t.ACTIVE_ATTRIBUTES), o = 0; o < n; o++) {
                var a = t.getActiveAttrib(r, o), s = a.name, l = new e.EgretWebGLAttribute(t, r, a);
                i[s] = l
            }
            return i
        }

        function n(t, r) {
            for (var i = {}, n = t.getProgramParameter(r, t.ACTIVE_UNIFORMS), o = 0; o < n; o++) {
                var a = t.getActiveUniform(r, o), s = a.name, l = new e.EgretWebGLUniform(t, r, a);
                i[s] = l
            }
            return i
        }

        var o = function () {
            function e(e, o, a) {
                this.vshaderSource = o, this.fshaderSource = a, this.vertexShader = t(e, e.VERTEX_SHADER, this.vshaderSource), this.fragmentShader = t(e, e.FRAGMENT_SHADER, this.fshaderSource), this.id = r(e, this.vertexShader, this.fragmentShader), this.uniforms = n(e, this.id), this.attributes = i(e, this.id)
            }

            return e.getProgram = function (t, r, i, n) {
                return this.programCache[n] || (this.programCache[n] = new e(t, r, i)), this.programCache[n]
            }, e.deleteProgram = function (e, t, r, i) {
            }, e
        }();
        o.programCache = {}, e.EgretWebGLProgram = o, __reflect(o.prototype, "egret.web.EgretWebGLProgram")
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function (e) {
    var t;
    !function (e) {
        var t;
        !function (e) {
            e[e.FLOAT_VEC2 = 35664] = "FLOAT_VEC2", e[e.FLOAT_VEC3 = 35665] = "FLOAT_VEC3", e[e.FLOAT_VEC4 = 35666] = "FLOAT_VEC4", e[e.INT_VEC2 = 35667] = "INT_VEC2", e[e.INT_VEC3 = 35668] = "INT_VEC3", e[e.INT_VEC4 = 35669] = "INT_VEC4", e[e.BOOL = 35670] = "BOOL", e[e.BOOL_VEC2 = 35671] = "BOOL_VEC2", e[e.BOOL_VEC3 = 35672] = "BOOL_VEC3", e[e.BOOL_VEC4 = 35673] = "BOOL_VEC4", e[e.FLOAT_MAT2 = 35674] = "FLOAT_MAT2", e[e.FLOAT_MAT3 = 35675] = "FLOAT_MAT3", e[e.FLOAT_MAT4 = 35676] = "FLOAT_MAT4", e[e.SAMPLER_2D = 35678] = "SAMPLER_2D", e[e.SAMPLER_CUBE = 35680] = "SAMPLER_CUBE", e[e.BYTE = 65535] = "BYTE", e[e.UNSIGNED_BYTE = 5121] = "UNSIGNED_BYTE", e[e.SHORT = 5122] = "SHORT", e[e.UNSIGNED_SHORT = 5123] = "UNSIGNED_SHORT", e[e.INT = 5124] = "INT", e[e.UNSIGNED_INT = 5125] = "UNSIGNED_INT", e[e.FLOAT = 5126] = "FLOAT"
        }(t = e.WEBGL_UNIFORM_TYPE || (e.WEBGL_UNIFORM_TYPE = {}));
        var r = function () {
            function e(e, t, r) {
                this.gl = e, this.name = r.name, this.type = r.type, this.size = r.size, this.location = e.getUniformLocation(t, this.name), this.setDefaultValue(), this.generateSetValue(), this.generateUpload()
            }

            return e.prototype.setDefaultValue = function () {
                var e = this.type;
                switch (e) {
                    case t.FLOAT:
                    case t.SAMPLER_2D:
                    case t.SAMPLER_CUBE:
                    case t.BOOL:
                    case t.INT:
                        this.value = 0;
                        break;
                    case t.FLOAT_VEC2:
                    case t.BOOL_VEC2:
                    case t.INT_VEC2:
                        this.value = [0, 0];
                        break;
                    case t.FLOAT_VEC3:
                    case t.BOOL_VEC3:
                    case t.INT_VEC3:
                        this.value = [0, 0, 0];
                        break;
                    case t.FLOAT_VEC4:
                    case t.BOOL_VEC4:
                    case t.INT_VEC4:
                        this.value = [0, 0, 0, 0];
                        break;
                    case t.FLOAT_MAT2:
                        this.value = new Float32Array([1, 0, 0, 1]);
                        break;
                    case t.FLOAT_MAT3:
                        this.value = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
                        break;
                    case t.FLOAT_MAT4:
                        this.value = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
                }
            }, e.prototype.generateSetValue = function () {
                var e = this.type;
                switch (e) {
                    case t.FLOAT:
                    case t.SAMPLER_2D:
                    case t.SAMPLER_CUBE:
                    case t.BOOL:
                    case t.INT:
                        this.setValue = function (e) {
                            var t = this.value !== e;
                            this.value = e, t && this.upload()
                        };
                        break;
                    case t.FLOAT_VEC2:
                    case t.BOOL_VEC2:
                    case t.INT_VEC2:
                        this.setValue = function (e) {
                            var t = this.value[0] !== e.x || this.value[1] !== e.y;
                            this.value[0] = e.x, this.value[1] = e.y, t && this.upload()
                        };
                        break;
                    case t.FLOAT_VEC3:
                    case t.BOOL_VEC3:
                    case t.INT_VEC3:
                        this.setValue = function (e) {
                            this.value[0] = e.x, this.value[1] = e.y, this.value[2] = e.z, this.upload()
                        };
                        break;
                    case t.FLOAT_VEC4:
                    case t.BOOL_VEC4:
                    case t.INT_VEC4:
                        this.setValue = function (e) {
                            this.value[0] = e.x, this.value[1] = e.y, this.value[2] = e.z, this.value[3] = e.w, this.upload()
                        };
                        break;
                    case t.FLOAT_MAT2:
                    case t.FLOAT_MAT3:
                    case t.FLOAT_MAT4:
                        this.setValue = function (e) {
                            this.value.set(e), this.upload()
                        }
                }
            }, e.prototype.generateUpload = function () {
                var e = this.gl, r = this.type, i = this.location;
                switch (r) {
                    case t.FLOAT:
                        this.upload = function () {
                            var t = this.value;
                            e.uniform1f(i, t)
                        };
                        break;
                    case t.FLOAT_VEC2:
                        this.upload = function () {
                            var t = this.value;
                            e.uniform2f(i, t[0], t[1])
                        };
                        break;
                    case t.FLOAT_VEC3:
                        this.upload = function () {
                            var t = this.value;
                            e.uniform3f(i, t[0], t[1], t[2])
                        };
                        break;
                    case t.FLOAT_VEC4:
                        this.upload = function () {
                            var t = this.value;
                            e.uniform4f(i, t[0], t[1], t[2], t[3])
                        };
                        break;
                    case t.SAMPLER_2D:
                    case t.SAMPLER_CUBE:
                    case t.BOOL:
                    case t.INT:
                        this.upload = function () {
                            var t = this.value;
                            e.uniform1i(i, t)
                        };
                        break;
                    case t.BOOL_VEC2:
                    case t.INT_VEC2:
                        this.upload = function () {
                            var t = this.value;
                            e.uniform2i(i, t[0], t[1])
                        };
                        break;
                    case t.BOOL_VEC3:
                    case t.INT_VEC3:
                        this.upload = function () {
                            var t = this.value;
                            e.uniform3i(i, t[0], t[1], t[2])
                        };
                        break;
                    case t.BOOL_VEC4:
                    case t.INT_VEC4:
                        this.upload = function () {
                            var t = this.value;
                            e.uniform4i(i, t[0], t[1], t[2], t[3])
                        };
                        break;
                    case t.FLOAT_MAT2:
                        this.upload = function () {
                            var t = this.value;
                            e.uniformMatrix2fv(i, !1, t)
                        };
                        break;
                    case t.FLOAT_MAT3:
                        this.upload = function () {
                            var t = this.value;
                            e.uniformMatrix3fv(i, !1, t)
                        };
                        break;
                    case t.FLOAT_MAT4:
                        this.upload = function () {
                            var t = this.value;
                            e.uniformMatrix4fv(i, !1, t)
                        }
                }
            }, e
        }();
        e.EgretWebGLUniform = r, __reflect(r.prototype, "egret.web.EgretWebGLUniform")
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));
var egret;
!function (e) {
    var t;
    !function (t) {
        var r = function () {
            function t() {
            }

            return t.detect = function () {
                var r = e.Capabilities, i = navigator.userAgent.toLowerCase();
                r.$isMobile = i.indexOf("mobile") != -1 || i.indexOf("android") != -1, r.$isMobile ? i.indexOf("windows") < 0 && (i.indexOf("iphone") != -1 || i.indexOf("ipad") != -1 || i.indexOf("ipod") != -1) ? r.$os = "iOS" : i.indexOf("android") != -1 && i.indexOf("linux") != -1 ? r.$os = "Android" : i.indexOf("windows") != -1 && (r.$os = "Windows Phone") : i.indexOf("windows nt") != -1 ? r.$os = "Windows PC" : i.indexOf("mac os") != -1 && (r.$os = "Mac OS");
                var n = (navigator.language || navigator.browserLanguage).toLowerCase(), o = n.split("-");
                o.length > 1 && (o[1] = o[1].toUpperCase()), r.$language = o.join("-"), t.injectUIntFixOnIE9()
            }, t.injectUIntFixOnIE9 = function () {
                if (/msie 9.0/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent)) {
                    var e = "<!-- IEBinaryToArray_ByteStr -->\r\n<script type='text/vbscript' language='VBScript'>\r\nFunction IEBinaryToArray_ByteStr(Binary)\r\n   IEBinaryToArray_ByteStr = CStr(Binary)\r\nEnd Function\r\nFunction IEBinaryToArray_ByteStr_Last(Binary)\r\n   Dim lastIndex\r\n   lastIndex = LenB(Binary)\r\n   if lastIndex mod 2 Then\r\n       IEBinaryToArray_ByteStr_Last = Chr( AscB( MidB( Binary, lastIndex, 1 ) ) )\r\n   Else\r\n       IEBinaryToArray_ByteStr_Last = \"\"\r\n   End If\r\nEnd Function\r\n</script>\r\n<!-- convertResponseBodyToText -->\r\n<script>\r\nlet convertResponseBodyToText = function (binary) {\r\n   let byteMapping = {};\r\n   for ( let i = 0; i < 256; i++ ) {\r\n       for ( let j = 0; j < 256; j++ ) {\r\n           byteMapping[ String.fromCharCode( i + j * 256 ) ] =\r\n           String.fromCharCode(i) + String.fromCharCode(j);\r\n       }\r\n   }\r\n   let rawBytes = IEBinaryToArray_ByteStr(binary);\r\n   let lastChr = IEBinaryToArray_ByteStr_Last(binary);\r\n   return rawBytes.replace(/[\\s\\S]/g,                           function( match ) { return byteMapping[match]; }) + lastChr;\r\n};\r\n</script>\r\n";
                    document.write(e)
                }
            }, t
        }();
        t.WebCapability = r, __reflect(r.prototype, "egret.web.WebCapability"), r.detect()
    }(t = e.web || (e.web = {}))
}(egret || (egret = {}));