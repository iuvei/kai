var __extends = this && this.__extends || function () {
    var t = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (t, e) {
        t.__proto__ = e
    } || function (t, e) {
        for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i])
    };
    return function (e, i) {
        function a() {
            this.constructor = e
        }

        t(e, i), e.prototype = null === i ? Object.create(i) : (a.prototype = i.prototype, new a)
    }
}(), dragonBones;
!function (t) {
    var e = function () {
        function t() {
        }

        return t.hasArmature = function (e) {
            return t._armatures.indexOf(e) >= 0
        }, t.addArmature = function (e) {
            e && t._armatures.indexOf(e) < 0 && t._armatures.push(e)
        }, t.removeArmature = function (e) {
            if (e) {
                var i = t._armatures.indexOf(e);
                i >= 0 && t._armatures.splice(i, 1)
            }
        }, t
    }();
    e.PI_D = 2 * Math.PI, e.PI_H = Math.PI / 2, e.PI_Q = Math.PI / 4, e.ANGLE_TO_RADIAN = Math.PI / 180, e.RADIAN_TO_ANGLE = 180 / Math.PI, e.SECOND_TO_MILLISECOND = 1e3, e.NO_TWEEN = 100, e.VERSION = "5.0.0", e.ARGUMENT_ERROR = "Argument error.", e.debug = !1, e.debugDraw = !1, e._armatures = [], t.DragonBones = e
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function t() {
            this.hashCode = t._hashCode++
        }

        return t._returnObject = function (e) {
            var i = String(e.constructor), a = null == t._maxCountMap[i] ? t._defaultMaxCount : t._maxCountMap[i],
                n = t._poolsMap[i] = t._poolsMap[i] || [];
            if (n.length < a) {
                if (!(n.indexOf(e) < 0)) throw new Error;
                n.push(e)
            }
        }, t.setMaxCount = function (e, i) {
            if ((i < 0 || i !== i) && (i = 0), e) {
                var a = String(e);
                t._maxCountMap[a] = i;
                var n = t._poolsMap[a];
                n && n.length > i && (n.length = i)
            } else {
                t._defaultMaxCount = i;
                for (var a in t._poolsMap) if (null != t._maxCountMap[a]) {
                    t._maxCountMap[a] = i;
                    var n = t._poolsMap[a];
                    n.length > i && (n.length = i)
                }
            }
        }, t.clearPool = function (e) {
            if (void 0 === e && (e = null), e) {
                var i = t._poolsMap[String(e)];
                i && i.length && (i.length = 0)
            } else for (var a in t._poolsMap) {
                var i = t._poolsMap[a];
                i.length = 0
            }
        }, t.borrowObject = function (e) {
            var i = t._poolsMap[String(e)];
            if (i && i.length > 0) return i.pop();
            var a = new e;
            return a._onClear(), a
        }, t.prototype.returnToPool = function () {
            this._onClear(), t._returnObject(this)
        }, t
    }();
    e._hashCode = 0, e._defaultMaxCount = 5e3, e._maxCountMap = {}, e._poolsMap = {}, t.BaseObject = e
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function t(t, e) {
            void 0 === t && (t = 0), void 0 === e && (e = 0), this.x = t, this.y = e
        }

        return t.prototype.copyFrom = function (t) {
            this.x = t.x, this.y = t.y
        }, t.prototype.clear = function () {
            this.x = this.y = 0
        }, t
    }();
    t.Point = e
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function t(t, e, i, a) {
            void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === i && (i = 0), void 0 === a && (a = 0), this.x = t, this.y = e, this.width = i, this.height = a
        }

        return t.prototype.copyFrom = function (t) {
            this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height
        }, t.prototype.clear = function () {
            this.x = this.y = 0, this.width = this.height = 0
        }, t
    }();
    t.Rectangle = e
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function e(t, e, i, a, n, r) {
            void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === i && (i = 0), void 0 === a && (a = 0), void 0 === n && (n = 1), void 0 === r && (r = 1), this.x = t, this.y = e, this.skewX = i, this.skewY = a, this.scaleX = n, this.scaleY = r
        }

        return e.normalizeRadian = function (t) {
            return t = (t + Math.PI) % (2 * Math.PI), t += t > 0 ? -Math.PI : Math.PI
        }, e.prototype.toString = function () {
            return "[object dragonBones.Transform] x:" + this.x + " y:" + this.y + " skewX:" + 180 * this.skewX / Math.PI + " skewY:" + 180 * this.skewY / Math.PI + " scaleX:" + this.scaleX + " scaleY:" + this.scaleY
        }, e.prototype.copyFrom = function (t) {
            return this.x = t.x, this.y = t.y, this.skewX = t.skewX, this.skewY = t.skewY, this.scaleX = t.scaleX, this.scaleY = t.scaleY, this
        }, e.prototype.identity = function () {
            return this.x = this.y = this.skewX = this.skewY = 0, this.scaleX = this.scaleY = 1, this
        }, e.prototype.add = function (t) {
            return this.x += t.x, this.y += t.y, this.skewX += t.skewX, this.skewY += t.skewY, this.scaleX *= t.scaleX, this.scaleY *= t.scaleY, this
        }, e.prototype.minus = function (t) {
            return this.x -= t.x, this.y -= t.y, this.skewX = e.normalizeRadian(this.skewX - t.skewX), this.skewY = e.normalizeRadian(this.skewY - t.skewY), this.scaleX /= t.scaleX, this.scaleY /= t.scaleY, this
        }, e.prototype.fromMatrix = function (e) {
            var i = t.DragonBones.PI_Q, a = this.scaleX, n = this.scaleY;
            return this.x = e.tx, this.y = e.ty, this.skewX = Math.atan(-e.c / e.d), this.skewY = Math.atan(e.b / e.a), this.skewX !== this.skewX && (this.skewX = 0), this.skewY !== this.skewY && (this.skewY = 0), this.scaleY = this.skewX > -i && this.skewX < i ? e.d / Math.cos(this.skewX) : -e.c / Math.sin(this.skewX), this.scaleX = this.skewY > -i && this.skewY < i ? e.a / Math.cos(this.skewY) : e.b / Math.sin(this.skewY), a >= 0 && this.scaleX < 0 && (this.scaleX = -this.scaleX, this.skewY = this.skewY - Math.PI), n >= 0 && this.scaleY < 0 && (this.scaleY = -this.scaleY, this.skewX = this.skewX - Math.PI), this
        }, e.prototype.toMatrix = function (t) {
            return 0 !== this.skewX || 0 !== this.skewY ? (t.a = Math.cos(this.skewY), t.b = Math.sin(this.skewY), this.skewX === this.skewY ? (t.c = -t.b, t.d = t.a) : (t.c = -Math.sin(this.skewX), t.d = Math.cos(this.skewX)), 1 === this.scaleX && 1 === this.scaleY || (t.a *= this.scaleX, t.b *= this.scaleX, t.c *= this.scaleY, t.d *= this.scaleY)) : (t.a = this.scaleX, t.b = 0, t.c = 0, t.d = this.scaleY), t.tx = this.x, t.ty = this.y, this
        }, Object.defineProperty(e.prototype, "rotation", {
            get: function () {
                return this.skewY
            }, set: function (t) {
                var e = t - this.skewY;
                this.skewX += e, this.skewY += e
            }, enumerable: !0, configurable: !0
        }), e
    }();
    t.Transform = e
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function t(t, e, i, a, n, r) {
            void 0 === t && (t = 1), void 0 === e && (e = 0), void 0 === i && (i = 0), void 0 === a && (a = 1), void 0 === n && (n = 0), void 0 === r && (r = 0), this.a = t, this.b = e, this.c = i, this.d = a, this.tx = n, this.ty = r
        }

        return t.prototype.toString = function () {
            return "[object dragonBones.Matrix] a:" + this.a + " b:" + this.b + " c:" + this.c + " d:" + this.d + " tx:" + this.tx + " ty:" + this.ty
        }, t.prototype.copyFrom = function (t) {
            return this.a = t.a, this.b = t.b, this.c = t.c, this.d = t.d, this.tx = t.tx, this.ty = t.ty, this
        }, t.prototype.copyFromArray = function (t, e) {
            return void 0 === e && (e = 0), this.a = t[e], this.b = t[e + 1], this.c = t[e + 2], this.d = t[e + 3], this.tx = t[e + 4], this.ty = t[e + 5], this
        }, t.prototype.identity = function () {
            return this.a = this.d = 1, this.b = this.c = 0, this.tx = this.ty = 0, this
        }, t.prototype.concat = function (t) {
            var e = this.a * t.a, i = 0, a = 0, n = this.d * t.d, r = this.tx * t.a + t.tx, s = this.ty * t.d + t.ty;
            return 0 === this.b && 0 === this.c || (e += this.b * t.c, n += this.c * t.b, i += this.b * t.d, a += this.c * t.a), 0 === t.b && 0 === t.c || (i += this.a * t.b, a += this.d * t.c, r += this.ty * t.c, s += this.tx * t.b), this.a = e, this.b = i, this.c = a, this.d = n, this.tx = r, this.ty = s, this
        }, t.prototype.invert = function () {
            var t = this.a, e = this.b, i = this.c, a = this.d, n = this.tx, r = this.ty;
            if (0 === e && 0 === i) return this.b = this.c = 0, 0 === t || 0 === a ? this.a = this.b = this.tx = this.ty = 0 : (t = this.a = 1 / t, a = this.d = 1 / a, this.tx = -t * n, this.ty = -a * r), this;
            var s = t * a - e * i;
            if (0 === s) return this.a = this.d = 1, this.b = this.c = 0, this.tx = this.ty = 0, this;
            s = 1 / s;
            var o = this.a = a * s;
            return e = this.b = -e * s, i = this.c = -i * s, a = this.d = t * s, this.tx = -(o * n + i * r), this.ty = -(e * n + a * r), this
        }, t.prototype.transformPoint = function (t, e, i, a) {
            void 0 === a && (a = !1), i.x = this.a * t + this.c * e, i.y = this.b * t + this.d * e, a || (i.x += this.tx, i.y += this.ty)
        }, t
    }();
    t.Matrix = e
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function t(t, e, i, a, n, r, s, o) {
            void 0 === t && (t = 1), void 0 === e && (e = 1), void 0 === i && (i = 1), void 0 === a && (a = 1), void 0 === n && (n = 0), void 0 === r && (r = 0), void 0 === s && (s = 0), void 0 === o && (o = 0), this.alphaMultiplier = t, this.redMultiplier = e, this.greenMultiplier = i, this.blueMultiplier = a, this.alphaOffset = n, this.redOffset = r, this.greenOffset = s, this.blueOffset = o
        }

        return t.prototype.copyFrom = function (t) {
            this.alphaMultiplier = t.alphaMultiplier, this.redMultiplier = t.redMultiplier, this.greenMultiplier = t.greenMultiplier, this.blueMultiplier = t.blueMultiplier, this.alphaOffset = t.alphaOffset, this.redOffset = t.redOffset, this.redOffset = t.redOffset, this.greenOffset = t.blueOffset
        }, t.prototype.identity = function () {
            this.alphaMultiplier = this.redMultiplier = this.greenMultiplier = this.blueMultiplier = 1, this.alphaOffset = this.redOffset = this.greenOffset = this.blueOffset = 0
        }, t
    }();
    t.ColorTransform = e
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (t) {
        function e() {
            var e = t.call(this) || this;
            return e.boneMask = [], e.animationNames = [], e
        }

        return __extends(e, t), e.toString = function () {
            return "[class dragonBones.AnimationConfig]"
        }, e.prototype._onClear = function () {
            this.pauseFadeOut = !0, this.fadeOutMode = 4, this.fadeOutTime = -1, this.fadeOutEasing = 0, this.additiveBlending = !1, this.displayControl = !0, this.pauseFadeIn = !0, this.actionEnabled = !0, this.playTimes = -1, this.layer = 0, this.position = 0, this.duration = -1, this.timeScale = -100, this.fadeInTime = -1, this.autoFadeOutTime = -1, this.fadeInEasing = 0, this.weight = 1, this.name = null, this.animationName = null, this.group = null, this.boneMask.length = 0, this.animationNames.length = 0
        }, e.prototype.clear = function () {
            this._onClear()
        }, e.prototype.copyFrom = function (t) {
            this.pauseFadeOut = t.pauseFadeOut, this.fadeOutMode = t.fadeOutMode, this.autoFadeOutTime = t.autoFadeOutTime, this.fadeOutEasing = t.fadeOutEasing, this.additiveBlending = t.additiveBlending, this.displayControl = t.displayControl, this.pauseFadeIn = t.pauseFadeIn, this.actionEnabled = t.actionEnabled, this.playTimes = t.playTimes, this.layer = t.layer, this.position = t.position, this.duration = t.duration, this.timeScale = t.timeScale, this.fadeInTime = t.fadeInTime, this.fadeOutTime = t.fadeOutTime, this.fadeInEasing = t.fadeInEasing, this.weight = t.weight, this.name = t.name, this.animationName = t.animationName, this.group = t.group, this.boneMask.length = t.boneMask.length;
            for (var e = 0, i = this.boneMask.length; e < i; ++e) this.boneMask[e] = t.boneMask[e];
            this.animationNames.length = t.animationNames.length;
            for (var e = 0, i = this.animationNames.length; e < i; ++e) this.animationNames[e] = t.animationNames[e]
        }, e.prototype.containsBoneMask = function (t) {
            return 0 === this.boneMask.length || this.boneMask.indexOf(t) >= 0
        }, e.prototype.addBoneMask = function (t, e, i) {
            void 0 === i && (i = !0);
            var a = t.getBone(e);
            if (a && (this.boneMask.indexOf(e) < 0 && this.boneMask.push(e), i)) for (var n = t.getBones(), r = 0, s = n.length; r < s; ++r) {
                var o = n[r];
                this.boneMask.indexOf(o.name) < 0 && a.contains(o) && this.boneMask.push(o.name)
            }
        }, e.prototype.removeBoneMask = function (t, e, i) {
            void 0 === i && (i = !0);
            var a = this.boneMask.indexOf(e);
            if (a >= 0 && this.boneMask.splice(a, 1), i) {
                var n = t.getBone(e);
                if (n) {
                    var r = t.getBones();
                    if (this.boneMask.length > 0) for (var s = 0, o = r.length; s < o; ++s) {
                        var l = r[s], h = this.boneMask.indexOf(l.name);
                        h >= 0 && n.contains(l) && this.boneMask.splice(h, 1)
                    } else for (var s = 0, o = r.length; s < o; ++s) {
                        var l = r[s];
                        n.contains(l) || this.boneMask.push(l.name)
                    }
                }
            }
        }, e
    }(t.BaseObject);
    t.AnimationConfig = e
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (t) {
        function e() {
            return t.call(this) || this
        }

        return __extends(e, t), e.prototype._onClear = function () {
            this.position = 0, this.duration = 0, this.prev = null, this.next = null
        }, e
    }(t.BaseObject);
    t.FrameData = e;
    var i = function (e) {
        function i() {
            return e.call(this) || this
        }

        return __extends(i, e), i._getCurvePoint = function (t, e, i, a, n, r, s, o, l, h) {
            var _ = 1 - l, u = _ * _, c = l * l, f = _ * u, m = 3 * l * u, p = 3 * _ * c, d = l * c;
            h.x = f * t + m * i + p * n + d * s, h.y = f * e + m * a + p * r + d * o
        }, i.samplingEasingCurve = function (e, a) {
            for (var n = e.length, r = new t.Point, s = -2, o = 0, l = a.length; o < l; ++o) {
                for (var h = (o + 1) / (l + 1); (s + 6 < n ? e[s + 6] : 1) < h;) s += 6;
                for (var _ = s >= 0 && s + 6 < n, u = _ ? e[s] : 0, c = _ ? e[s + 1] : 0, f = e[s + 2], m = e[s + 3], p = e[s + 4], d = e[s + 5], g = _ ? e[s + 6] : 1, y = _ ? e[s + 7] : 1, v = 0, b = 1; b - v > .01;) {
                    var T = (b + v) / 2;
                    i._getCurvePoint(u, c, f, m, p, d, g, y, T, r), h - r.x > 0 ? v = T : b = T
                }
                a[o] = r.y
            }
        }, i.prototype._onClear = function () {
            e.prototype._onClear.call(this), this.tweenEasing = 0, this.curve = null
        }, i
    }(e);
    t.TweenFrameData = i;
    var a = function (t) {
        function e() {
            var e = t.call(this) || this;
            return e.actions = [], e.events = [], e
        }

        return __extends(e, t), e.toString = function () {
            return "[class dragonBones.AnimationFrameData]"
        }, e.prototype._onClear = function () {
            t.prototype._onClear.call(this);
            for (var e = 0, i = this.actions.length; e < i; ++e) this.actions[e].returnToPool();
            for (var e = 0, i = this.events.length; e < i; ++e) this.events[e].returnToPool();
            this.actions.length = 0, this.events.length = 0
        }, e
    }(e);
    t.AnimationFrameData = a;
    var n = function (t) {
        function e() {
            var e = t.call(this) || this;
            return e.zOrder = [], e
        }

        return __extends(e, t), e.prototype._onClear = function () {
            t.prototype._onClear.call(this), this.zOrder.length = 0
        }, e
    }(e);
    t.ZOrderFrameData = n;
    var r = function (e) {
        function i() {
            var i = e.call(this) || this;
            return i.transform = new t.Transform, i
        }

        return __extends(i, e), i.toString = function () {
            return "[class dragonBones.BoneFrameData]"
        }, i.prototype._onClear = function () {
            e.prototype._onClear.call(this), this.tweenScale = !1, this.tweenRotate = 0, this.transform.identity()
        }, i
    }(i);
    t.BoneFrameData = r;
    var s = function (e) {
        function i() {
            return e.call(this) || this
        }

        return __extends(i, e), i.generateColor = function () {
            return new t.ColorTransform
        }, i.toString = function () {
            return "[class dragonBones.SlotFrameData]"
        }, i.prototype._onClear = function () {
            e.prototype._onClear.call(this), this.displayIndex = 0, this.color = null
        }, i
    }(i);
    s.DEFAULT_COLOR = new t.ColorTransform, t.SlotFrameData = s;
    var o = function (t) {
        function e() {
            var e = t.call(this) || this;
            return e.tweens = [], e
        }

        return __extends(e, t), e.toString = function () {
            return "[class dragonBones.ExtensionFrameData]"
        }, e.prototype._onClear = function () {
            t.prototype._onClear.call(this), this.tweens.length = 0
        }, e
    }(i);
    t.ExtensionFrameData = o
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (t) {
        function e() {
            var e = t.call(this) || this;
            return e.frames = [], e
        }

        return __extends(e, t), e.toString = function () {
            return "[class dragonBones.TimelineData]"
        }, e.prototype._onClear = function () {
            for (var t = null, e = 0, i = this.frames.length; e < i; ++e) {
                var a = this.frames[e];
                t && a !== t && t.returnToPool(), t = a
            }
            this.scale = 1, this.offset = 0, this.frames.length = 0
        }, e
    }(t.BaseObject);
    t.TimelineData = e;
    var i = function (t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }

        return __extends(e, t), e.toString = function () {
            return "[class dragonBones.ZOrderTimelineData]"
        }, e
    }(e);
    t.ZOrderTimelineData = i;
    var a = function (e) {
        function i() {
            var i = e.call(this) || this;
            return i.originalTransform = new t.Transform, i
        }

        return __extends(i, e), i.toString = function () {
            return "[class dragonBones.BoneTimelineData]"
        }, i.prototype._onClear = function () {
            e.prototype._onClear.call(this), this.originalTransform.identity(), this.bone = null
        }, i
    }(e);
    t.BoneTimelineData = a;
    var n = function (t) {
        function e() {
            return t.call(this) || this
        }

        return __extends(e, t), e.toString = function () {
            return "[class dragonBones.SlotTimelineData]"
        }, e.prototype._onClear = function () {
            t.prototype._onClear.call(this), this.slot = null
        }, e
    }(e);
    t.SlotTimelineData = n;
    var r = function (t) {
        function e() {
            return t.call(this) || this
        }

        return __extends(e, t), e.toString = function () {
            return "[class dragonBones.FFDTimelineData]"
        }, e.prototype._onClear = function () {
            t.prototype._onClear.call(this), this.skin = null, this.slot = null, this.display = null
        }, e
    }(e);
    t.FFDTimelineData = r
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (e) {
        function i() {
            var t = e.call(this) || this;
            return t.boneTimelines = {}, t.slotTimelines = {}, t.ffdTimelines = {}, t.cachedFrames = [], t.boneCachedFrameIndices = {}, t.slotCachedFrameIndices = {}, t
        }

        return __extends(i, e), i.toString = function () {
            return "[class dragonBones.AnimationData]"
        }, i.prototype._onClear = function () {
            e.prototype._onClear.call(this);
            for (var t in this.boneTimelines) this.boneTimelines[t].returnToPool(), delete this.boneTimelines[t];
            for (var t in this.slotTimelines) this.slotTimelines[t].returnToPool(), delete this.slotTimelines[t];
            for (var t in this.ffdTimelines) {
                for (var i in this.ffdTimelines[t]) for (var a in this.ffdTimelines[t][i]) this.ffdTimelines[t][i][a].returnToPool();
                delete this.ffdTimelines[t]
            }
            for (var t in this.boneCachedFrameIndices) delete this.boneCachedFrameIndices[t];
            for (var t in this.slotCachedFrameIndices) delete this.slotCachedFrameIndices[t];
            this.zOrderTimeline && this.zOrderTimeline.returnToPool(), this.frameCount = 0, this.playTimes = 0, this.duration = 0, this.fadeInTime = 0, this.cacheFrameRate = 0, this.name = null, this.cachedFrames.length = 0, this.zOrderTimeline = null
        }, i.prototype.cacheFrames = function (t) {
            if (!(this.cacheFrameRate > 0)) {
                this.cacheFrameRate = Math.max(Math.ceil(t * this.scale), 1);
                var e = Math.ceil(this.cacheFrameRate * this.duration) + 1;
                this.cachedFrames.length = 0, this.cachedFrames.length = e;
                for (var i in this.boneTimelines) {
                    for (var a = new Array(e), n = 0, r = a.length; n < r; ++n) a[n] = -1;
                    this.boneCachedFrameIndices[i] = a
                }
                for (var i in this.slotTimelines) {
                    for (var a = new Array(e), n = 0, r = a.length; n < r; ++n) a[n] = -1;
                    this.slotCachedFrameIndices[i] = a
                }
            }
        }, i.prototype.addBoneTimeline = function (e) {
            if (!e || !e.bone || this.boneTimelines[e.bone.name]) throw new Error(t.DragonBones.ARGUMENT_ERROR);
            this.boneTimelines[e.bone.name] = e
        }, i.prototype.addSlotTimeline = function (e) {
            if (!e || !e.slot || this.slotTimelines[e.slot.name]) throw new Error(t.DragonBones.ARGUMENT_ERROR);
            this.slotTimelines[e.slot.name] = e
        }, i.prototype.addFFDTimeline = function (e) {
            if (!(e && e.skin && e.slot && e.display)) throw new Error(t.DragonBones.ARGUMENT_ERROR);
            var i = this.ffdTimelines[e.skin.name] = this.ffdTimelines[e.skin.name] || {},
                a = i[e.slot.slot.name] = i[e.slot.slot.name] || {};
            if (a[e.display.name]) throw new Error(t.DragonBones.ARGUMENT_ERROR);
            a[e.display.name] = e
        }, i.prototype.getBoneTimeline = function (t) {
            return this.boneTimelines[t]
        }, i.prototype.getSlotTimeline = function (t) {
            return this.slotTimelines[t]
        }, i.prototype.getFFDTimeline = function (t, e) {
            var i = this.ffdTimelines[t];
            return i ? i[e] : null
        }, i.prototype.getBoneCachedFrameIndices = function (t) {
            return this.boneCachedFrameIndices[t]
        }, i.prototype.getSlotCachedFrameIndices = function (t) {
            return this.slotCachedFrameIndices[t]
        }, i
    }(t.TimelineData);
    t.AnimationData = e
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (e) {
        function i() {
            var i = e.call(this) || this;
            return i.aabb = new t.Rectangle, i.bones = {}, i.slots = {}, i.skins = {}, i.animations = {}, i.actions = [], i._animationNames = [], i._sortedBones = [], i._sortedSlots = [], i._bonesChildren = {}, i
        }

        return __extends(i, e), i.toString = function () {
            return "[class dragonBones.ArmatureData]"
        }, i._onSortSlots = function (t, e) {
            return t.zOrder > e.zOrder ? 1 : -1
        }, i.prototype._onClear = function () {
            for (var t in this.bones) this.bones[t].returnToPool(), delete this.bones[t];
            for (var t in this.slots) this.slots[t].returnToPool(), delete this.slots[t];
            for (var t in this.skins) this.skins[t].returnToPool(), delete this.skins[t];
            for (var t in this.animations) this.animations[t].returnToPool(), delete this.animations[t];
            for (var e = 0, i = this.actions.length; e < i; ++e) this.actions[e].returnToPool();
            for (var t in this._bonesChildren) delete this._bonesChildren[t];
            this.userData && this.userData.returnToPool(), this.frameRate = 0, this.type = -1, this.cacheFrameRate = 0, this.scale = 1, this.name = null, this.aabb.clear(), this.actions.length = 0, this.parent = null, this.userData = null, this._boneDirty = !1, this._slotDirty = !1, this._animationNames.length = 0, this._sortedBones.length = 0, this._sortedSlots.length = 0, this._defaultSkin = null, this._defaultAnimation = null
        }, i.prototype._sortBones = function () {
            var t = this._sortedBones.length;
            if (!(t < 1)) {
                var e = this._sortedBones.concat(), i = 0, a = 0;
                for (this._sortedBones.length = 0; a < t;) {
                    var n = e[i++];
                    i >= t && (i = 0), this._sortedBones.indexOf(n) >= 0 || n.parent && this._sortedBones.indexOf(n.parent) < 0 || n.ik && this._sortedBones.indexOf(n.ik) < 0 || (n.ik && n.chain > 0 && n.chainIndex === n.chain ? this._sortedBones.splice(this._sortedBones.indexOf(n.parent) + 1, 0, n) : this._sortedBones.push(n), a++)
                }
            }
        }, i.prototype._sortSlots = function () {
            this._sortedSlots.sort(i._onSortSlots)
        }, i.prototype.cacheFrames = function (t) {
            if (!(this.cacheFrameRate > 0)) {
                this.cacheFrameRate = t;
                for (var e in this.animations) this.animations[e].cacheFrames(this.cacheFrameRate)
            }
        }, i.prototype.setCacheFrame = function (t, e) {
            var i = this.parent.cachedFrames, a = i.length;
            return i.length += 10, i[a] = t.a, i[a + 1] = t.b, i[a + 2] = t.c, i[a + 3] = t.d, i[a + 4] = t.tx, i[a + 5] = t.ty, i[a + 6] = e.skewX, i[a + 7] = e.skewY, i[a + 8] = e.scaleX, i[a + 9] = e.scaleY, a
        }, i.prototype.getCacheFrame = function (t, e, i) {
            var a = this.parent.cachedFrames;
            t.a = a[i], t.b = a[i + 1], t.c = a[i + 2], t.d = a[i + 3], t.tx = a[i + 4], t.ty = a[i + 5], e.skewX = a[i + 6], e.skewY = a[i + 7], e.scaleX = a[i + 8], e.scaleY = a[i + 9]
        }, i.prototype.addBone = function (e, i) {
            if (!e || !e.name || this.bones[e.name]) throw new Error(t.DragonBones.ARGUMENT_ERROR);
            if (i) {
                var a = this.getBone(i);
                a ? e.parent = a : (this._bonesChildren[i] = this._bonesChildren[i] || []).push(e)
            }
            var n = this._bonesChildren[e.name];
            if (n) {
                for (var r = 0, s = n.length; r < s; ++r) n[r].parent = e;
                delete this._bonesChildren[e.name]
            }
            this.bones[e.name] = e, this._sortedBones.push(e), this._boneDirty = !0
        }, i.prototype.addSlot = function (e) {
            if (!e || !e.name || this.slots[e.name]) throw new Error(t.DragonBones.ARGUMENT_ERROR);
            this.slots[e.name] = e, this._sortedSlots.push(e), this._slotDirty = !0
        }, i.prototype.addSkin = function (e) {
            if (!e || !e.name || this.skins[e.name]) throw new Error(t.DragonBones.ARGUMENT_ERROR);
            this.skins[e.name] = e, this._defaultSkin || (this._defaultSkin = e)
        }, i.prototype.addAnimation = function (e) {
            if (!e || !e.name || this.animations[e.name]) throw new Error(t.DragonBones.ARGUMENT_ERROR);
            this.animations[e.name] = e, this._animationNames.push(e.name), this._defaultAnimation || (this._defaultAnimation = e)
        }, i.prototype.getBone = function (t) {
            return this.bones[t]
        }, i.prototype.getSlot = function (t) {
            return this.slots[t]
        }, i.prototype.getSkin = function (t) {
            return t ? this.skins[t] : this._defaultSkin
        }, i.prototype.getAnimation = function (t) {
            return t ? this.animations[t] : this._defaultAnimation
        }, Object.defineProperty(i.prototype, "animationNames", {
            get: function () {
                return this._animationNames
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "sortedBones", {
            get: function () {
                return this._boneDirty && (this._boneDirty = !1, this._sortBones()), this._sortedBones
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "sortedSlots", {
            get: function () {
                return this._slotDirty && (this._slotDirty = !1, this._sortSlots()), this._sortedSlots
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "defaultSkin", {
            get: function () {
                return this._defaultSkin
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "defaultAnimation", {
            get: function () {
                return this._defaultAnimation
            }, enumerable: !0, configurable: !0
        }), i
    }(t.BaseObject);
    t.ArmatureData = e;
    var i = function (e) {
        function i() {
            var i = e.call(this) || this;
            return i.transform = new t.Transform, i
        }

        return __extends(i, e), i.toString = function () {
            return "[class dragonBones.BoneData]"
        }, i.prototype._onClear = function () {
            this.userData && this.userData.returnToPool(), this.inheritTranslation = !1, this.inheritRotation = !1, this.inheritScale = !1, this.bendPositive = !1, this.chain = 0, this.chainIndex = 0, this.weight = 0, this.length = 0, this.name = null, this.transform.identity(), this.parent = null, this.ik = null, this.userData = null
        }, i
    }(t.BaseObject);
    t.BoneData = i;
    var a = function (e) {
        function i() {
            var t = e.call(this) || this;
            return t.actions = [], t
        }

        return __extends(i, e), i.generateColor = function () {
            return new t.ColorTransform
        }, i.toString = function () {
            return "[class dragonBones.SlotData]"
        }, i.prototype._onClear = function () {
            for (var t = 0, e = this.actions.length; t < e; ++t) this.actions[t].returnToPool();
            this.userData && this.userData.returnToPool(), this.displayIndex = -1, this.zOrder = 0, this.blendMode = -1, this.name = null, this.actions.length = 0, this.parent = null, this.color = null, this.userData = null
        }, i
    }(t.BaseObject);
    a.DEFAULT_COLOR = new t.ColorTransform, t.SlotData = a;
    var n = function (e) {
        function i() {
            var t = e.call(this) || this;
            return t.slots = {}, t
        }

        return __extends(i, e), i.toString = function () {
            return "[class dragonBones.SkinData]"
        }, i.prototype._onClear = function () {
            for (var t in this.slots) this.slots[t].returnToPool(), delete this.slots[t];
            this.name = null
        }, i.prototype.addSlot = function (e) {
            if (!e || !e.slot || this.slots[e.slot.name]) throw new Error(t.DragonBones.ARGUMENT_ERROR);
            this.slots[e.slot.name] = e
        }, i.prototype.getSlot = function (t) {
            return this.slots[t]
        }, i
    }(t.BaseObject);
    t.SkinData = n;
    var r = function (e) {
        function i() {
            var t = e.call(this) || this;
            return t.displays = [], t.meshs = {}, t
        }

        return __extends(i, e), i.toString = function () {
            return "[class dragonBones.SkinSlotData]"
        }, i.prototype._onClear = function () {
            for (var t = 0, e = this.displays.length; t < e; ++t) this.displays[t].returnToPool();
            for (var i in this.meshs) this.meshs[i].returnToPool(), delete this.meshs[i];
            this.displays.length = 0, this.slot = null
        }, i.prototype.getDisplay = function (t) {
            for (var e = 0, i = this.displays.length; e < i; ++e) {
                var a = this.displays[e];
                if (a.name === t) return a
            }
            return null
        }, i.prototype.addMesh = function (e) {
            if (!e || !e.name || this.meshs[e.name]) throw new Error(t.DragonBones.ARGUMENT_ERROR);
            this.meshs[e.name] = e
        }, i.prototype.getMesh = function (t) {
            return this.meshs[t]
        }, i
    }(t.BaseObject);
    t.SkinSlotData = r;
    var s = function (e) {
        function i() {
            var i = e.call(this) || this;
            return i.pivot = new t.Point, i.transform = new t.Transform, i
        }

        return __extends(i, e), i.toString = function () {
            return "[class dragonBones.DisplayData]"
        }, i.prototype._onClear = function () {
            this.boundingBox && this.boundingBox.returnToPool(), this.isRelativePivot = !1, this.type = -1, this.inheritAnimation = !0, this.name = null, this.path = null, this.share = null, this.pivot.clear(), this.transform.identity(), this.texture = null, this.armature = null, this.mesh = null, this.boundingBox = null
        }, i
    }(t.BaseObject);
    t.DisplayData = s;
    var o = function (e) {
        function i() {
            var i = e.call(this) || this;
            return i.slotPose = new t.Matrix, i.uvs = [], i.vertices = [], i.vertexIndices = [], i.boneIndices = [], i.weights = [], i.boneVertices = [], i.bones = [], i.inverseBindPose = [], i
        }

        return __extends(i, e), i.toString = function () {
            return "[class dragonBones.MeshData]"
        }, i.prototype._onClear = function () {
            this.skinned = !1, this.name = null, this.slotPose.identity(), this.uvs.length = 0, this.vertices.length = 0, this.vertexIndices.length = 0, this.boneIndices.length = 0, this.weights.length = 0, this.boneVertices.length = 0, this.bones.length = 0, this.inverseBindPose.length = 0
        }, i
    }(t.BaseObject);
    t.MeshData = o;
    var l = function (t) {
        function e() {
            var e = t.call(this) || this;
            return e.vertices = [], e
        }

        return __extends(e, t), e.toString = function () {
            return "[class dragonBones.BoundingBoxData]"
        }, e._computeOutCode = function (t, e, i, a, n, r) {
            var s = 0;
            return t < i ? s |= 1 : t > n && (s |= 2), e < a ? s |= 4 : e > r && (s |= 8), s
        }, e.segmentIntersectsRectangle = function (t, i, a, n, r, s, o, l, h, _, u) {
            void 0 === h && (h = null), void 0 === _ && (_ = null), void 0 === u && (u = null);
            var c = t > r && t < o && i > s && i < l, f = a > r && a < o && n > s && n < l;
            if (c && f) return -1;
            for (var m = 0, p = e._computeOutCode(t, i, r, s, o, l), d = e._computeOutCode(a, n, r, s, o, l); ;) {
                if (!(p | d)) {
                    m = 2;
                    break
                }
                if (p & d) break;
                var g = 0, y = 0, v = 0, b = p ? p : d;
                4 & b ? (g = t + (a - t) * (s - i) / (n - i), y = s, u && (v = .5 * -Math.PI)) : 8 & b ? (g = t + (a - t) * (l - i) / (n - i), y = l, u && (v = .5 * Math.PI)) : 2 & b ? (y = i + (n - i) * (o - t) / (a - t), g = o, u && (v = 0)) : 1 & b && (y = i + (n - i) * (r - t) / (a - t), g = r, u && (v = Math.PI)), b === p ? (t = g, i = y, p = e._computeOutCode(t, i, r, s, o, l), u && (u.x = v)) : (a = g, n = y, d = e._computeOutCode(a, n, r, s, o, l), u && (u.y = v))
            }
            return m && (c ? (m = 2, h && (h.x = a, h.y = n), _ && (_.x = a, _.y = a), u && (u.x = u.y + Math.PI)) : f ? (m = 1, h && (h.x = t, h.y = i), _ && (_.x = t, _.y = i), u && (u.y = u.x + Math.PI)) : (m = 3, h && (h.x = t, h.y = i), _ && (_.x = a, _.y = n))), m
        }, e.segmentIntersectsEllipse = function (t, e, i, a, n, r, s, o, l, h, _) {
            void 0 === l && (l = null), void 0 === h && (h = null), void 0 === _ && (_ = null);
            var u = s / o, c = u * u;
            e *= u, a *= u;
            var f = i - t, m = a - e, p = Math.sqrt(f * f + m * m), d = f / p, g = m / p, y = (n - t) * d + (r - e) * g,
                v = y * y, b = t * t + e * e, T = s * s, D = T - b + v, O = 0;
            if (D >= 0) {
                var x = Math.sqrt(D), E = y - x, S = y + x, M = E < 0 ? -1 : E <= p ? 0 : 1,
                    A = S < 0 ? -1 : S <= p ? 0 : 1, w = M * A;
                if (w < 0) return -1;
                0 === w && (M === -1 ? (O = 2, i = t + S * d, a = (e + S * g) / u, l && (l.x = i, l.y = a), h && (h.x = i, h.y = a), _ && (_.x = Math.atan2(a / T * c, i / T), _.y = _.x + Math.PI)) : 1 === A ? (O = 1, t += E * d, e = (e + E * g) / u, l && (l.x = t, l.y = e), h && (h.x = t, h.y = e), _ && (_.x = Math.atan2(e / T * c, t / T), _.y = _.x + Math.PI)) : (O = 3, l && (l.x = t + E * d, l.y = (e + E * g) / u, _ && (_.x = Math.atan2(l.y / T * c, l.x / T))), h && (h.x = t + S * d, h.y = (e + S * g) / u, _ && (_.y = Math.atan2(h.y / T * c, h.x / T)))))
            }
            return O
        }, e.segmentIntersectsPolygon = function (t, e, i, a, n, r, s, o) {
            void 0 === r && (r = null), void 0 === s && (s = null), void 0 === o && (o = null), t === i && (t = i + .01), e === a && (e = a + .01);
            for (var l = n.length, h = t - i, _ = e - a, u = t * a - e * i, c = 0, f = n[l - 2], m = n[l - 1], p = 0, d = 0, g = 0, y = 0, v = 0, b = 0, T = 0; T < l; T += 2) {
                var D = n[T], O = n[T + 1];
                f === D && (f = D + .01), m === O && (m = O + .01);
                var x = f - D, E = m - O, S = f * O - m * D, M = h * E - _ * x, A = (u * x - h * S) / M;
                if ((A >= f && A <= D || A >= D && A <= f) && (0 === h || A >= t && A <= i || A >= i && A <= t)) {
                    var w = (u * E - _ * S) / M;
                    if ((w >= m && w <= O || w >= O && w <= m) && (0 === _ || w >= e && w <= a || w >= a && w <= e)) {
                        if (!s) {
                            g = A, y = w, v = A, b = w, c++, o && (o.x = Math.atan2(O - m, D - f) - .5 * Math.PI, o.y = o.x);
                            break
                        }
                        var B = A - t;
                        B < 0 && (B = -B), 0 === c ? (p = B, d = B, g = A, y = w, v = A, b = w, o && (o.x = Math.atan2(O - m, D - f) - .5 * Math.PI, o.y = o.x)) : (B < p && (p = B, g = A, y = w, o && (o.x = Math.atan2(O - m, D - f) - .5 * Math.PI)), B > d && (d = B, v = A, b = w, o && (o.y = Math.atan2(O - m, D - f) - .5 * Math.PI))), c++
                    }
                }
                f = D, m = O
            }
            return 1 === c ? (r && (r.x = g, r.y = y), s && (s.x = g, s.y = y), o && (o.y = o.x + Math.PI)) : c > 1 && (c++, r && (r.x = g, r.y = y), s && (s.x = v, s.y = b)), c
        }, e.prototype._onClear = function () {
            this.type = -1, this.color = 0, this.x = 0, this.y = 0, this.width = 0, this.height = 0, this.vertices.length = 0
        }, e.prototype.containsPoint = function (t, e) {
            var i = !1;
            if (2 === this.type) {
                if (t >= this.x && t <= this.width && e >= this.y && e <= this.height) for (var a = 0, n = this.vertices.length, r = n - 2; a < n; a += 2) {
                    var s = this.vertices[r + 1], o = this.vertices[a + 1];
                    if (o < e && s >= e || s < e && o >= e) {
                        var l = this.vertices[r], h = this.vertices[a];
                        (e - o) * (l - h) / (s - o) + h < t && (i = !i)
                    }
                    r = a
                }
            } else {
                var _ = .5 * this.width;
                if (t >= -_ && t <= _) {
                    var u = .5 * this.height;
                    e >= -u && e <= u && (1 === this.type ? (e *= _ / u, i = Math.sqrt(t * t + e * e) <= _) : i = !0)
                }
            }
            return i
        }, e.prototype.intersectsSegment = function (t, i, a, n, r, s, o) {
            void 0 === r && (r = null), void 0 === s && (s = null), void 0 === o && (o = null);
            var l = 0;
            switch (this.type) {
                case 0:
                    var h = .5 * this.width, _ = .5 * this.height;
                    l = e.segmentIntersectsRectangle(t, i, a, n, -h, -_, h, _, r, s, o);
                    break;
                case 1:
                    l = e.segmentIntersectsEllipse(t, i, a, n, 0, 0, .5 * this.width, .5 * this.height, r, s, o);
                    break;
                case 2:
                    0 !== e.segmentIntersectsRectangle(t, i, a, n, this.x, this.y, this.width, this.height, null, null) && (l = e.segmentIntersectsPolygon(t, i, a, n, this.vertices, r, s, o))
            }
            return l
        }, e
    }(t.BaseObject);
    t.BoundingBoxData = l
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (t) {
        function e() {
            var e = t.call(this) || this;
            return e.ints = [], e.floats = [], e.strings = [], e
        }

        return __extends(e, t), e.toString = function () {
            return "[class dragonBones.CustomData]"
        }, e.prototype._onClear = function () {
            this.ints.length = 0, this.floats.length = 0, this.strings.length = 0
        }, e.prototype.getInt = function (t) {
            return void 0 === t && (t = 0), t >= 0 && t < this.ints.length ? this.ints[t] : 0
        }, e.prototype.getFloat = function (t) {
            return void 0 === t && (t = 0), t >= 0 && t < this.floats.length ? this.floats[t] : 0
        }, e.prototype.getString = function (t) {
            return void 0 === t && (t = 0), t >= 0 && t < this.strings.length ? this.strings[t] : null
        }, e
    }(t.BaseObject);
    t.CustomData = e;
    var i = function (t) {
        function e() {
            return t.call(this) || this
        }

        return __extends(e, t), e.toString = function () {
            return "[class dragonBones.EventData]"
        }, e.prototype._onClear = function () {
            this.data && this.data.returnToPool(), this.type = -1, this.name = null, this.bone = null, this.slot = null, this.data = null
        }, e
    }(t.BaseObject);
    t.EventData = i;
    var a = function (t) {
        function e() {
            return t.call(this) || this
        }

        return __extends(e, t), e.toString = function () {
            return "[class dragonBones.ActionData]"
        }, e.prototype._onClear = function () {
            this.animationConfig && this.animationConfig.returnToPool(), this.type = -1, this.bone = null, this.slot = null, this.animationConfig = null
        }, e
    }(t.BaseObject);
    t.ActionData = a;
    var n = function (e) {
        function i() {
            var t = e.call(this) || this;
            return t.armatures = {}, t.cachedFrames = [], t._armatureNames = [], t
        }

        return __extends(i, e), i.toString = function () {
            return "[class dragonBones.DragonBonesData]"
        }, i.prototype._onClear = function () {
            if (t.DragonBones.debug) for (var e = 0, i = t.DragonBones._armatures.length; e < i; ++e) {
                var a = t.DragonBones._armatures[e];
                if (a.armatureData.parent === this) throw new Error("The DragonBonesData is being used, please make sure all armature references to the data have been deleted.")
            }
            for (var n in this.armatures) this.armatures[n].returnToPool(), delete this.armatures[n];
            this.userData && this.userData.returnToPool(), this.autoSearch = !1, this.frameRate = 0, this.name = null, this.cachedFrames.length = 0, this.userData = null, this._armatureNames.length = 0
        }, i.prototype.addArmature = function (e) {
            if (!e || !e.name || this.armatures[e.name]) throw new Error(t.DragonBones.ARGUMENT_ERROR);
            this.armatures[e.name] = e, this._armatureNames.push(e.name), e.parent = this
        }, i.prototype.getArmature = function (t) {
            return this.armatures[t]
        }, Object.defineProperty(i.prototype, "armatureNames", {
            get: function () {
                return this._armatureNames
            }, enumerable: !0, configurable: !0
        }), i.prototype.dispose = function () {
            this.returnToPool()
        }, i
    }(t.BaseObject);
    t.DragonBonesData = n
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (e) {
        function i() {
            var t = e.call(this) || this;
            return t.textures = {}, t
        }

        return __extends(i, e), i.prototype._onClear = function () {
            for (var t in this.textures) this.textures[t].returnToPool(), delete this.textures[t];
            this.autoSearch = !1, this.scale = 1, this.width = 0, this.height = 0, this.name = null, this.imagePath = null
        }, i.prototype.addTexture = function (e) {
            if (!e || !e.name || this.textures[e.name]) throw new Error(t.DragonBones.ARGUMENT_ERROR);
            this.textures[e.name] = e, e.parent = this
        }, i.prototype.getTexture = function (t) {
            return this.textures[t];
        }, i.prototype.copyFrom = function (t) {
            this.autoSearch = t.autoSearch, this.scale = t.scale, this.width = t.width, this.height = t.height, this.name = t.name, this.imagePath = t.imagePath;
            for (var e in this.textures) this.textures[e].returnToPool(), delete this.textures[e];
            for (var e in t.textures) {
                var i = this.generateTexture();
                i.copyFrom(t.textures[e]), this.textures[e] = i
            }
        }, i
    }(t.BaseObject);
    t.TextureAtlasData = e;
    var i = function (e) {
        function i() {
            var i = e.call(this) || this;
            return i.region = new t.Rectangle, i
        }

        return __extends(i, e), i.generateRectangle = function () {
            return new t.Rectangle
        }, i.prototype._onClear = function () {
            this.rotated = !1, this.name = null, this.region.clear(), this.frame = null, this.parent = null
        }, i.prototype.copyFrom = function (t) {
            this.rotated = t.rotated, this.name = t.name, !this.frame && t.frame ? this.frame = i.generateRectangle() : this.frame && !t.frame && (this.frame = null), this.frame && t.frame && this.frame.copyFrom(t.frame), this.parent = t.parent, this.region.copyFrom(t.region)
        }, i
    }(t.BaseObject);
    t.TextureData = i
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function e() {
            this._isOldData = !1, this._isGlobalTransform = !1, this._isAutoTween = !1, this._animationTweenEasing = 0, this._timelinePivot = new t.Point, this._helpPoint = new t.Point, this._helpTransformA = new t.Transform, this._helpTransformB = new t.Transform, this._helpMatrix = new t.Matrix, this._rawBones = [], this._data = null, this._armature = null, this._skin = null, this._skinSlotData = null, this._animation = null, this._timeline = null
        }

        return e._getArmatureType = function (t) {
            switch (t.toLowerCase()) {
                case"stage":
                    return 2;
                case"armature":
                    return 0;
                case"movieclip":
                    return 1;
                default:
                    return -1
            }
        }, e._getDisplayType = function (t) {
            switch (t.toLowerCase()) {
                case"image":
                    return 0;
                case"mesh":
                    return 2;
                case"armature":
                    return 1;
                case"boundingbox":
                    return 3;
                default:
                    return -1
            }
        }, e._getBoundingBoxType = function (t) {
            switch (t.toLowerCase()) {
                case"rectangle":
                    return 0;
                case"ellipse":
                    return 1;
                case"polygon":
                    return 2;
                default:
                    return -1
            }
        }, e._getBlendMode = function (t) {
            switch (t.toLowerCase()) {
                case"normal":
                    return 0;
                case"add":
                    return 1;
                case"alpha":
                    return 2;
                case"darken":
                    return 3;
                case"difference":
                    return 4;
                case"erase":
                    return 5;
                case"hardlight":
                    return 6;
                case"invert":
                    return 7;
                case"layer":
                    return 8;
                case"lighten":
                    return 9;
                case"multiply":
                    return 10;
                case"overlay":
                    return 11;
                case"screen":
                    return 12;
                case"subtract":
                    return 13;
                default:
                    return -1
            }
        }, e._getActionType = function (t) {
            switch (t.toLowerCase()) {
                case"play":
                case"gotoandplay":
                    return 0;
                default:
                    return -1
            }
        }, e.prototype._getTimelineFrameMatrix = function (e, i, a, n) {
            var r = Math.floor(a * e.frameCount / e.duration);
            if (1 === i.frames.length || r >= i.frames.length) n.copyFrom(i.frames[0].transform); else {
                var s = i.frames[r], o = 0;
                s.tweenEasing !== t.DragonBones.NO_TWEEN ? (o = (a - s.position) / s.duration, 0 !== s.tweenEasing && (o = t.TweenTimelineState._getEasingValue(o, s.tweenEasing))) : s.curve && (o = (a - s.position) / s.duration, o = t.TweenTimelineState._getEasingCurveValue(o, s.curve));
                var l = s.next;
                n.x = l.transform.x - s.transform.x, n.y = l.transform.y - s.transform.y, n.skewX = t.Transform.normalizeRadian(l.transform.skewX - s.transform.skewX), n.skewY = t.Transform.normalizeRadian(l.transform.skewY - s.transform.skewY), n.scaleX = l.transform.scaleX - s.transform.scaleX, n.scaleY = l.transform.scaleY - s.transform.scaleY, n.x = s.transform.x + n.x * o, n.y = s.transform.y + n.y * o, n.skewX = s.transform.skewX + n.skewX * o, n.skewY = s.transform.skewY + n.skewY * o, n.scaleX = s.transform.scaleX + n.scaleX * o, n.scaleY = s.transform.scaleY + n.scaleY * o
            }
            n.add(i.originalTransform)
        }, e.prototype._globalToLocal = function (t) {
            for (var e = new Array, i = t.sortedBones.concat().reverse(), a = 0, n = i.length; a < n; ++a) {
                var r = i[a];
                r.parent && (r.parent.transform.toMatrix(this._helpMatrix), this._helpMatrix.invert(), this._helpMatrix.transformPoint(r.transform.x, r.transform.y, this._helpPoint), r.transform.x = this._helpPoint.x, r.transform.y = this._helpPoint.y, r.transform.rotation -= r.parent.transform.rotation);
                for (var s in t.animations) {
                    var o = t.animations[s], l = o.getBoneTimeline(r.name);
                    if (l) {
                        var h = r.parent ? o.getBoneTimeline(r.parent.name) : null;
                        this._helpTransformB.copyFrom(l.originalTransform), e.length = 0;
                        for (var _ = 0, u = l.frames.length; _ < u; ++_) {
                            var c = l.frames[_];
                            e.indexOf(c) >= 0 || (e.push(c), h ? (this._getTimelineFrameMatrix(o, h, c.position, this._helpTransformA), c.transform.add(this._helpTransformB), this._helpTransformA.toMatrix(this._helpMatrix), this._helpMatrix.invert(), this._helpMatrix.transformPoint(c.transform.x, c.transform.y, this._helpPoint), c.transform.x = this._helpPoint.x, c.transform.y = this._helpPoint.y, c.transform.rotation -= this._helpTransformA.rotation) : c.transform.add(this._helpTransformB), c.transform.minus(r.transform), 0 === _ ? (l.originalTransform.copyFrom(c.transform), c.transform.identity()) : c.transform.minus(l.originalTransform))
                        }
                    }
                }
            }
        }, e.prototype._mergeFrameToAnimationTimeline = function (e, i, a) {
            var n = Math.floor(e * this._armature.frameRate), r = this._animation.frames;
            if (0 === r.length) {
                var s = t.BaseObject.borrowObject(t.AnimationFrameData);
                if (s.position = 0, this._animation.frameCount > 1) {
                    r.length = this._animation.frameCount + 1;
                    var o = t.BaseObject.borrowObject(t.AnimationFrameData);
                    o.position = this._animation.frameCount / this._armature.frameRate, r[0] = s, r[this._animation.frameCount] = o
                }
            }
            var l = null, h = r[n];
            if (!h || 0 !== n && r[n - 1] !== h.prev) {
                l = t.BaseObject.borrowObject(t.AnimationFrameData), l.position = n / this._armature.frameRate, r[n] = l;
                for (var _ = n + 1, u = r.length; _ < u; ++_) h && r[_] === h && (r[_] = null)
            } else l = h;
            if (i) for (var _ = 0, u = i.length; _ < u; ++_) l.actions.push(i[_]);
            if (a) for (var _ = 0, u = a.length; _ < u; ++_) l.events.push(a[_]);
            for (var c = null, f = null, _ = 0, u = r.length; _ < u; ++_) {
                var m = r[_];
                m && f !== m ? (f = m, c && (f.prev = c, c.next = f, c.duration = f.position - c.position), c = f) : r[_] = c
            }
            f.duration = this._animation.duration - f.position, f = r[0], c.next = f, f.prev = c
        }, e.parseDragonBonesData = function (e) {
            return t.ObjectDataParser.getInstance().parseDragonBonesData(e)
        }, e.parseTextureAtlasData = function (i, a) {
            void 0 === a && (a = 1);
            for (var n = {}, r = i[e.SUB_TEXTURE], s = 0, o = r.length; s < o; s++) {
                var l = r[s], h = l[e.NAME], _ = new t.Rectangle, u = null;
                _.x = l[e.X] / a, _.y = l[e.Y] / a, _.width = l[e.WIDTH] / a, _.height = l[e.HEIGHT] / a, e.FRAME_WIDTH in l && (u = new t.Rectangle, u.x = l[e.FRAME_X] / a, u.y = l[e.FRAME_Y] / a, u.width = l[e.FRAME_WIDTH] / a, u.height = l[e.FRAME_HEIGHT] / a), n[h] = {
                    region: _,
                    frame: u,
                    rotated: !1
                }
            }
            return n
        }, e
    }();
    e.DATA_VERSION_2_3 = "2.3", e.DATA_VERSION_3_0 = "3.0", e.DATA_VERSION_4_0 = "4.0", e.DATA_VERSION_4_5 = "4.5", e.DATA_VERSION_5_0 = "5.0", e.DATA_VERSION = e.DATA_VERSION_5_0, e.DATA_VERSIONS = [e.DATA_VERSION_5_0, e.DATA_VERSION_4_5, e.DATA_VERSION_4_0, e.DATA_VERSION_3_0, e.DATA_VERSION_2_3], e.TEXTURE_ATLAS = "TextureAtlas", e.SUB_TEXTURE = "SubTexture", e.FORMAT = "format", e.IMAGE_PATH = "imagePath", e.WIDTH = "width", e.HEIGHT = "height", e.ROTATED = "rotated", e.FRAME_X = "frameX", e.FRAME_Y = "frameY", e.FRAME_WIDTH = "frameWidth", e.FRAME_HEIGHT = "frameHeight", e.DRADON_BONES = "dragonBones", e.ARMATURE = "armature", e.BONE = "bone", e.IK = "ik", e.SLOT = "slot", e.SKIN = "skin", e.DISPLAY = "display", e.ANIMATION = "animation", e.Z_ORDER = "zOrder", e.FFD = "ffd", e.FRAME = "frame", e.ACTIONS = "actions", e.EVENTS = "events", e.INTS = "ints", e.FLOATS = "floats", e.STRINGS = "strings", e.PIVOT = "pivot", e.TRANSFORM = "transform", e.AABB = "aabb", e.COLOR = "color", e.VERSION = "version", e.COMPATIBLE_VERSION = "compatibleVersion", e.FRAME_RATE = "frameRate", e.TYPE = "type", e.SUB_TYPE = "subType", e.NAME = "name", e.PARENT = "parent", e.TARGET = "target", e.SHARE = "share", e.PATH = "path", e.LENGTH = "length", e.DISPLAY_INDEX = "displayIndex", e.BLEND_MODE = "blendMode", e.INHERIT_TRANSLATION = "inheritTranslation", e.INHERIT_ROTATION = "inheritRotation", e.INHERIT_SCALE = "inheritScale", e.INHERIT_ANIMATION = "inheritAnimation", e.INHERIT_FFD = "inheritFFD", e.BEND_POSITIVE = "bendPositive", e.CHAIN = "chain", e.WEIGHT = "weight", e.FADE_IN_TIME = "fadeInTime", e.PLAY_TIMES = "playTimes", e.SCALE = "scale", e.OFFSET = "offset", e.POSITION = "position", e.DURATION = "duration", e.TWEEN_TYPE = "tweenType", e.TWEEN_EASING = "tweenEasing", e.TWEEN_ROTATE = "tweenRotate", e.TWEEN_SCALE = "tweenScale", e.CURVE = "curve", e.EVENT = "event", e.SOUND = "sound", e.ACTION = "action", e.DEFAULT_ACTIONS = "defaultActions", e.X = "x", e.Y = "y", e.SKEW_X = "skX", e.SKEW_Y = "skY", e.SCALE_X = "scX", e.SCALE_Y = "scY", e.ALPHA_OFFSET = "aO", e.RED_OFFSET = "rO", e.GREEN_OFFSET = "gO", e.BLUE_OFFSET = "bO", e.ALPHA_MULTIPLIER = "aM", e.RED_MULTIPLIER = "rM", e.GREEN_MULTIPLIER = "gM", e.BLUE_MULTIPLIER = "bM", e.UVS = "uvs", e.VERTICES = "vertices", e.TRIANGLES = "triangles", e.WEIGHTS = "weights", e.SLOT_POSE = "slotPose", e.BONE_POSE = "bonePose", e.COLOR_TRANSFORM = "colorTransform", e.TIMELINE = "timeline", e.IS_GLOBAL = "isGlobal", e.PIVOT_X = "pX", e.PIVOT_Y = "pY", e.Z = "z", e.LOOP = "loop",e.AUTO_TWEEN = "autoTween",e.HIDE = "hide",e.DEFAULT_NAME = "__default",t.DataParser = e
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (e) {
        function i() {
            return e.call(this) || this
        }

        return __extends(i, e), i._getBoolean = function (t, e, i) {
            if (e in t) {
                var a = t[e], n = typeof a;
                if ("boolean" === n) return a;
                if ("string" !== n) return !!a;
                switch (a) {
                    case"0":
                    case"NaN":
                    case"":
                    case"false":
                    case"null":
                    case"undefined":
                        return !1;
                    default:
                        return !0
                }
            }
            return i
        }, i._getNumber = function (t, e, i) {
            if (e in t) {
                var a = t[e];
                return null == a || "NaN" === a ? i : +a || 0
            }
            return i
        }, i._getString = function (t, e, i) {
            return e in t ? String(t[e]) : i
        }, i.prototype._parseArmature = function (e, a) {
            var n = t.BaseObject.borrowObject(t.ArmatureData);
            if (n.name = i._getString(e, i.NAME, null), n.frameRate = i._getNumber(e, i.FRAME_RATE, this._data.frameRate), n.scale = a, 0 === n.frameRate && (n.frameRate = 24), i.TYPE in e && "string" == typeof e[i.TYPE] ? n.type = i._getArmatureType(e[i.TYPE]) : n.type = i._getNumber(e, i.TYPE, 0), this._armature = n, this._rawBones.length = 0, i.AABB in e) {
                var r = e[i.AABB];
                n.aabb.x = i._getNumber(r, i.X, 0), n.aabb.y = i._getNumber(r, i.Y, 0), n.aabb.width = i._getNumber(r, i.WIDTH, 0), n.aabb.height = i._getNumber(r, i.HEIGHT, 0)
            }
            if (i.BONE in e) for (var s = e[i.BONE], o = 0, l = s.length; o < l; ++o) {
                var h = s[o], _ = this._parseBone(h);
                n.addBone(_, i._getString(h, i.PARENT, null)), this._rawBones.push(_)
            }
            if (i.IK in e) for (var u = e[i.IK], o = 0, l = u.length; o < l; ++o) this._parseIK(u[o]);
            if (i.SLOT in e) for (var c = e[i.SLOT], f = 0, o = 0, l = c.length; o < l; ++o) n.addSlot(this._parseSlot(c[o], f++));
            if (i.SKIN in e) for (var m = e[i.SKIN], o = 0, l = m.length; o < l; ++o) n.addSkin(this._parseSkin(m[o]));
            if (i.ANIMATION in e) for (var p = e[i.ANIMATION], o = 0, l = p.length; o < l; ++o) n.addAnimation(this._parseAnimation(p[o]));
            return (i.ACTIONS in e || i.DEFAULT_ACTIONS in e) && this._parseActionData(e, n.actions, null, null), this._isOldData && this._isGlobalTransform && this._globalToLocal(n), this._armature = null, this._rawBones.length = 0, n
        }, i.prototype._parseBone = function (e) {
            var a = t.BaseObject.borrowObject(t.BoneData);
            return a.inheritTranslation = i._getBoolean(e, i.INHERIT_TRANSLATION, !0), a.inheritRotation = i._getBoolean(e, i.INHERIT_ROTATION, !0), a.inheritScale = i._getBoolean(e, i.INHERIT_SCALE, !0), a.length = i._getNumber(e, i.LENGTH, 0) * this._armature.scale, a.name = i._getString(e, i.NAME, null), i.TRANSFORM in e && this._parseTransform(e[i.TRANSFORM], a.transform), this._isOldData && (a.inheritScale = !1), a
        }, i.prototype._parseIK = function (t) {
            var e = this._armature.getBone(i._getString(t, i.BONE in t ? i.BONE : i.NAME, null));
            e && (e.bendPositive = i._getBoolean(t, i.BEND_POSITIVE, !0), e.chain = i._getNumber(t, i.CHAIN, 0), e.weight = i._getNumber(t, i.WEIGHT, 1), e.ik = this._armature.getBone(i._getString(t, i.TARGET, null)), e.chain > 0 && e.parent && !e.parent.ik ? (e.parent.ik = e.ik, e.parent.chainIndex = 0, e.parent.chain = 0, e.chainIndex = 1) : (e.chain = 0, e.chainIndex = 0))
        }, i.prototype._parseSlot = function (e, a) {
            var n = t.BaseObject.borrowObject(t.SlotData);
            return n.displayIndex = i._getNumber(e, i.DISPLAY_INDEX, 0), n.zOrder = i._getNumber(e, i.Z, a), n.name = i._getString(e, i.NAME, null), n.parent = this._armature.getBone(i._getString(e, i.PARENT, null)), i.COLOR in e || i.COLOR_TRANSFORM in e ? (n.color = t.SlotData.generateColor(), this._parseColorTransform(e[i.COLOR] || e[i.COLOR_TRANSFORM], n.color)) : n.color = t.SlotData.DEFAULT_COLOR, i.BLEND_MODE in e && "string" == typeof e[i.BLEND_MODE] ? n.blendMode = i._getBlendMode(e[i.BLEND_MODE]) : n.blendMode = i._getNumber(e, i.BLEND_MODE, 0), (i.ACTIONS in e || i.DEFAULT_ACTIONS in e) && this._parseActionData(e, n.actions, null, null), this._isOldData && (i.COLOR_TRANSFORM in e ? (n.color = t.SlotData.generateColor(), this._parseColorTransform(e[i.COLOR_TRANSFORM], n.color)) : n.color = t.SlotData.DEFAULT_COLOR), n
        }, i.prototype._parseSkin = function (e) {
            var a = t.BaseObject.borrowObject(t.SkinData);
            if (a.name = i._getString(e, i.NAME, i.DEFAULT_NAME), a.name || (a.name = i.DEFAULT_NAME), i.SLOT in e) {
                this._skin = a;
                for (var n = e[i.SLOT], r = 0, s = 0, o = n.length; s < o; ++s) this._isOldData && this._armature.addSlot(this._parseSlot(n[s], r++)), a.addSlot(this._parseSkinSlotData(n[s]));
                this._skin = null
            }
            return a
        }, i.prototype._parseSkinSlotData = function (e) {
            var a = t.BaseObject.borrowObject(t.SkinSlotData);
            if (a.slot = this._armature.getSlot(i._getString(e, i.NAME, null)), i.DISPLAY in e) {
                var n = e[i.DISPLAY];
                this._skinSlotData = a;
                for (var r = 0, s = n.length; r < s; ++r) a.displays.push(this._parseDisplay(n[r]));
                this._skinSlotData = null
            }
            return a
        }, i.prototype._parseDisplay = function (e) {
            var a = t.BaseObject.borrowObject(t.DisplayData);
            if (a.inheritAnimation = i._getBoolean(e, i.INHERIT_ANIMATION, !0), a.name = i._getString(e, i.NAME, null), a.path = i._getString(e, i.PATH, a.name), i.TYPE in e && "string" == typeof e[i.TYPE] ? a.type = i._getDisplayType(e[i.TYPE]) : a.type = i._getNumber(e, i.TYPE, 0), a.isRelativePivot = !0, i.PIVOT in e) {
                var n = e[i.PIVOT];
                a.pivot.x = i._getNumber(n, i.X, 0), a.pivot.y = i._getNumber(n, i.Y, 0)
            } else if (this._isOldData) {
                var r = e[i.TRANSFORM];
                a.isRelativePivot = !1, a.pivot.x = i._getNumber(r, i.PIVOT_X, 0) * this._armature.scale, a.pivot.y = i._getNumber(r, i.PIVOT_Y, 0) * this._armature.scale
            } else a.pivot.x = .5, a.pivot.y = .5;
            switch (i.TRANSFORM in e && this._parseTransform(e[i.TRANSFORM], a.transform), a.type) {
                case 0:
                    break;
                case 1:
                    break;
                case 2:
                    a.share = i._getString(e, i.SHARE, null), a.share || (a.inheritAnimation = i._getBoolean(e, i.INHERIT_FFD, !0), a.mesh = this._parseMesh(e), this._skinSlotData.addMesh(a.mesh));
                    break;
                case 3:
                    a.boundingBox = this._parseBoundingBox(e)
            }
            return a
        }, i.prototype._parseMesh = function (e) {
            var a = t.BaseObject.borrowObject(t.MeshData), n = e[i.VERTICES], r = e[i.UVS], s = e[i.TRIANGLES],
                o = Math.floor(n.length / 2), l = Math.floor(s.length / 3),
                h = new Array(this._armature.sortedBones.length);
            if (a.skinned = i.WEIGHTS in e && e[i.WEIGHTS].length > 0, a.name = i._getString(e, i.NAME, null), a.uvs.length = 2 * o, a.vertices.length = 2 * o, a.vertexIndices.length = 3 * l, a.skinned) {
                if (a.boneIndices.length = o, a.weights.length = o, a.boneVertices.length = o, i.SLOT_POSE in e) {
                    var _ = e[i.SLOT_POSE];
                    a.slotPose.a = _[0], a.slotPose.b = _[1], a.slotPose.c = _[2], a.slotPose.d = _[3], a.slotPose.tx = _[4] * this._armature.scale, a.slotPose.ty = _[5] * this._armature.scale
                }
                if (i.BONE_POSE in e) for (var u = e[i.BONE_POSE], c = 0, f = u.length; c < f; c += 7) {
                    var m = u[c], p = h[m] = new t.Matrix;
                    p.a = u[c + 1], p.b = u[c + 2], p.c = u[c + 3], p.d = u[c + 4], p.tx = u[c + 5] * this._armature.scale, p.ty = u[c + 6] * this._armature.scale, p.invert()
                }
            }
            for (var c = 0, d = 0, f = n.length; c < f; c += 2) {
                var g = c + 1, y = c / 2, v = a.vertices[c] = n[c] * this._armature.scale,
                    b = a.vertices[g] = n[g] * this._armature.scale;
                if (a.uvs[c] = r[c], a.uvs[g] = r[g], a.skinned) {
                    var T = e[i.WEIGHTS], D = T[d], O = a.boneIndices[y] = new Array(D),
                        x = a.weights[y] = new Array(D), E = a.boneVertices[y] = new Array(2 * D);
                    a.slotPose.transformPoint(v, b, this._helpPoint), v = a.vertices[c] = this._helpPoint.x, b = a.vertices[g] = this._helpPoint.y;
                    for (var S = 0; S < D; ++S) {
                        var M = d + 1 + 2 * S, m = T[M], A = this._rawBones[m], w = a.bones.indexOf(A);
                        w < 0 && (w = a.bones.length, a.bones[w] = A, a.inverseBindPose[w] = h[m]), a.inverseBindPose[w].transformPoint(v, b, this._helpPoint), O[S] = w, x[S] = T[M + 1], E[2 * S] = this._helpPoint.x, E[2 * S + 1] = this._helpPoint.y
                    }
                    d += 2 * D + 1
                }
            }
            for (var c = 0, f = s.length; c < f; ++c) a.vertexIndices[c] = s[c];
            return a
        }, i.prototype._parseBoundingBox = function (e) {
            var a = t.BaseObject.borrowObject(t.BoundingBoxData);
            switch (i.SUB_TYPE in e && "string" == typeof e[i.SUB_TYPE] ? a.type = i._getBoundingBoxType(e[i.SUB_TYPE]) : a.type = i._getNumber(e, i.SUB_TYPE, 0), a.color = i._getNumber(e, i.COLOR, 0), a.type) {
                case 0:
                case 1:
                    a.width = i._getNumber(e, i.WIDTH, 0), a.height = i._getNumber(e, i.HEIGHT, 0);
                    break;
                case 2:
                    if (i.VERTICES in e) {
                        var n = e[i.VERTICES];
                        a.vertices.length = n.length;
                        for (var r = 0, s = a.vertices.length; r < s; r += 2) {
                            var o = r + 1, l = n[r], h = n[o];
                            a.vertices[r] = l, a.vertices[o] = h, 0 === r ? (a.x = l, a.y = h, a.width = l, a.height = h) : (l < a.x ? a.x = l : l > a.width && (a.width = l), h < a.y ? a.y = h : h > a.height && (a.height = h))
                        }
                    }
            }
            return a
        }, i.prototype._parseAnimation = function (e) {
            var a = t.BaseObject.borrowObject(t.AnimationData);
            if (a.frameCount = Math.max(i._getNumber(e, i.DURATION, 1), 1), a.playTimes = i._getNumber(e, i.PLAY_TIMES, 1), a.duration = a.frameCount / this._armature.frameRate, a.fadeInTime = i._getNumber(e, i.FADE_IN_TIME, 0), a.name = i._getString(e, i.NAME, i.DEFAULT_NAME), a.name || (a.name = i.DEFAULT_NAME), this._animation = a, this._parseTimeline(e, a, this._parseAnimationFrame), i.Z_ORDER in e && (a.zOrderTimeline = t.BaseObject.borrowObject(t.ZOrderTimelineData), this._parseTimeline(e[i.Z_ORDER], a.zOrderTimeline, this._parseZOrderFrame)), i.BONE in e) for (var n = e[i.BONE], r = 0, s = n.length; r < s; ++r) a.addBoneTimeline(this._parseBoneTimeline(n[r]));
            if (i.SLOT in e) for (var o = e[i.SLOT], r = 0, s = o.length; r < s; ++r) a.addSlotTimeline(this._parseSlotTimeline(o[r]));
            if (i.FFD in e) for (var l = e[i.FFD], r = 0, s = l.length; r < s; ++r) a.addFFDTimeline(this._parseFFDTimeline(l[r]));
            if (this._isOldData) {
                if (this._isAutoTween = i._getBoolean(e, i.AUTO_TWEEN, !0), this._animationTweenEasing = i._getNumber(e, i.TWEEN_EASING, 0) || 0, a.playTimes = i._getNumber(e, i.LOOP, 1), i.TIMELINE in e) for (var h = e[i.TIMELINE], r = 0, s = h.length; r < s; ++r) {
                    var _ = h[r];
                    a.addBoneTimeline(this._parseBoneTimeline(_)), a.addSlotTimeline(this._parseSlotTimeline(_))
                }
            } else this._isAutoTween = !1, this._animationTweenEasing = 0;
            for (var r in this._armature.bones) {
                var u = this._armature.bones[r];
                if (!a.getBoneTimeline(u.name)) {
                    var c = t.BaseObject.borrowObject(t.BoneTimelineData),
                        f = t.BaseObject.borrowObject(t.BoneFrameData);
                    c.bone = u, c.frames[0] = f, a.addBoneTimeline(c)
                }
            }
            for (var r in this._armature.slots) {
                var m = this._armature.slots[r];
                if (!a.getSlotTimeline(m.name)) {
                    var p = t.BaseObject.borrowObject(t.SlotTimelineData),
                        d = t.BaseObject.borrowObject(t.SlotFrameData);
                    p.slot = m, d.displayIndex = m.displayIndex, m.color === t.SlotData.DEFAULT_COLOR ? d.color = t.SlotFrameData.DEFAULT_COLOR : (d.color = t.SlotFrameData.generateColor(), d.color.copyFrom(m.color)), p.frames[0] = d, a.addSlotTimeline(p), this._isOldData && (d.displayIndex = -1)
                }
            }
            return this._animation = null, a
        }, i.prototype._parseBoneTimeline = function (e) {
            var a = t.BaseObject.borrowObject(t.BoneTimelineData);
            a.bone = this._armature.getBone(i._getString(e, i.NAME, null)), this._parseTimeline(e, a, this._parseBoneFrame);
            for (var n = a.originalTransform, r = null, s = 0, o = a.frames.length; s < o; ++s) {
                var l = a.frames[s];
                r ? r !== l && l.transform.minus(n) : (n.copyFrom(l.transform), l.transform.identity(), 0 === n.scaleX && (n.scaleX = .001), 0 === n.scaleY && (n.scaleY = .001)), r = l
            }
            return this._isOldData && (i.PIVOT_X in e || i.PIVOT_Y in e) ? (this._timelinePivot.x = i._getNumber(e, i.PIVOT_X, 0) * this._armature.scale, this._timelinePivot.y = i._getNumber(e, i.PIVOT_Y, 0) * this._armature.scale) : this._timelinePivot.clear(), a
        }, i.prototype._parseSlotTimeline = function (e) {
            var a = t.BaseObject.borrowObject(t.SlotTimelineData);
            return a.slot = this._armature.getSlot(i._getString(e, i.NAME, null)), this._parseTimeline(e, a, this._parseSlotFrame), a
        }, i.prototype._parseFFDTimeline = function (e) {
            var a = t.BaseObject.borrowObject(t.FFDTimelineData);
            a.skin = this._armature.getSkin(i._getString(e, i.SKIN, null)), a.slot = a.skin.getSlot(i._getString(e, i.SLOT, null));
            for (var n = i._getString(e, i.NAME, null), r = 0, s = a.slot.displays.length; r < s; ++r) {
                var o = a.slot.displays[r];
                if (o.mesh && o.name === n) {
                    a.display = o;
                    break
                }
            }
            return this._parseTimeline(e, a, this._parseFFDFrame), a
        }, i.prototype._parseAnimationFrame = function (e, a, n) {
            var r = t.BaseObject.borrowObject(t.AnimationFrameData);
            return this._parseFrame(e, r, a, n), (i.ACTION in e || i.ACTIONS in e) && this._parseActionData(e, r.actions, null, null), (i.EVENTS in e || i.EVENT in e || i.SOUND in e) && this._parseEventData(e, r.events, null, null), r
        }, i.prototype._parseZOrderFrame = function (e, a, n) {
            var r = t.BaseObject.borrowObject(t.ZOrderFrameData);
            this._parseFrame(e, r, a, n);
            var s = e[i.Z_ORDER];
            if (s && s.length > 0) {
                var o = this._armature.sortedSlots.length, l = new Array(o - s.length / 2);
                r.zOrder.length = o;
                for (var h = 0; h < o; ++h) r.zOrder[h] = -1;
                for (var _ = 0, u = 0, c = 0, f = s.length; c < f; c += 2) {
                    for (var m = s[c], p = s[c + 1]; _ !== m;) l[u++] = _++;
                    r.zOrder[_ + p] = _++
                }
                for (; _ < o;) l[u++] = _++;
                for (var d = o; d--;) r.zOrder[d] === -1 && (r.zOrder[d] = l[--u])
            }
            return r
        }, i.prototype._parseBoneFrame = function (e, a, n) {
            var r = t.BaseObject.borrowObject(t.BoneFrameData);
            if (r.tweenRotate = i._getNumber(e, i.TWEEN_ROTATE, 0), r.tweenScale = i._getBoolean(e, i.TWEEN_SCALE, !0), this._parseTweenFrame(e, r, a, n), i.TRANSFORM in e) {
                var s = e[i.TRANSFORM];
                this._parseTransform(s, r.transform), this._isOldData && (this._helpPoint.x = this._timelinePivot.x + i._getNumber(s, i.PIVOT_X, 0) * this._armature.scale, this._helpPoint.y = this._timelinePivot.y + i._getNumber(s, i.PIVOT_Y, 0) * this._armature.scale, r.transform.toMatrix(this._helpMatrix), this._helpMatrix.transformPoint(this._helpPoint.x, this._helpPoint.y, this._helpPoint, !0), r.transform.x += this._helpPoint.x, r.transform.y += this._helpPoint.y)
            }
            var o = this._timeline.bone, l = new Array, h = new Array;
            if (i.ACTION in e || i.ACTIONS in e) {
                var _ = this._armature.getSlot(o.name);
                this._parseActionData(e, l, o, _)
            }
            return (i.EVENT in e || i.SOUND in e) && this._parseEventData(e, h, o, null), (l.length > 0 || h.length > 0) && this._mergeFrameToAnimationTimeline(r.position, l, h), r
        }, i.prototype._parseSlotFrame = function (e, a, n) {
            var r = t.BaseObject.borrowObject(t.SlotFrameData);
            if (r.displayIndex = i._getNumber(e, i.DISPLAY_INDEX, 0), this._parseTweenFrame(e, r, a, n), i.COLOR in e || i.COLOR_TRANSFORM in e ? (r.color = t.SlotFrameData.generateColor(), this._parseColorTransform(e[i.COLOR] || e[i.COLOR_TRANSFORM], r.color)) : r.color = t.SlotFrameData.DEFAULT_COLOR, this._isOldData) i._getBoolean(e, i.HIDE, !1) && (r.displayIndex = -1); else if (i.ACTION in e || i.ACTIONS in e) {
                var s = this._timeline.slot, o = new Array;
                this._parseActionData(e, o, s.parent, s), this._mergeFrameToAnimationTimeline(r.position, o, null)
            }
            return r
        }, i.prototype._parseFFDFrame = function (e, a, n) {
            var r = this._timeline, s = r.display.mesh, o = t.BaseObject.borrowObject(t.ExtensionFrameData);
            this._parseTweenFrame(e, o, a, n);
            for (var l = e[i.VERTICES], h = i._getNumber(e, i.OFFSET, 0), _ = 0, u = 0, c = 0, f = s.vertices.length; c < f; c += 2) if (!l || c < h || c - h >= l.length ? (_ = 0, u = 0) : (_ = l[c - h] * this._armature.scale, u = l[c + 1 - h] * this._armature.scale), s.skinned) {
                s.slotPose.transformPoint(_, u, this._helpPoint, !0), _ = this._helpPoint.x, u = this._helpPoint.y;
                for (var m = s.boneIndices[c / 2], p = 0, d = m.length; p < d; ++p) {
                    var g = m[p];
                    s.inverseBindPose[g].transformPoint(_, u, this._helpPoint, !0), o.tweens.push(this._helpPoint.x, this._helpPoint.y)
                }
            } else o.tweens.push(_, u);
            return o
        }, i.prototype._parseTweenFrame = function (e, a, n, r) {
            this._parseFrame(e, a, n, r), a.duration > 0 ? (i.TWEEN_EASING in e ? a.tweenEasing = i._getNumber(e, i.TWEEN_EASING, t.DragonBones.NO_TWEEN) : this._isOldData ? a.tweenEasing = this._isAutoTween ? this._animationTweenEasing : t.DragonBones.NO_TWEEN : a.tweenEasing = t.DragonBones.NO_TWEEN, this._isOldData && 1 === this._animation.scale && 1 === this._timeline.scale && a.duration * this._armature.frameRate < 2 && (a.tweenEasing = t.DragonBones.NO_TWEEN), r > 0 && i.CURVE in e && (a.curve = new Array(2 * r - 1), t.TweenFrameData.samplingEasingCurve(e[i.CURVE], a.curve))) : (a.tweenEasing = t.DragonBones.NO_TWEEN, a.curve = null)
        }, i.prototype._parseFrame = function (t, e, i, a) {
            e.position = i / this._armature.frameRate, e.duration = a / this._armature.frameRate
        }, i.prototype._parseTimeline = function (e, a, n) {
            if (a.scale = i._getNumber(e, i.SCALE, 1), a.offset = i._getNumber(e, i.OFFSET, 0), this._timeline = a, i.FRAME in e) {
                var r = e[i.FRAME];
                if (1 === r.length) a.frames.length = 1, a.frames[0] = n.call(this, r[0], 0, i._getNumber(r[0], i.DURATION, 1)); else if (r.length > 1) {
                    a.frames.length = this._animation.frameCount + 1;
                    for (var s = 0, o = 0, l = null, h = null, _ = 0, u = 0, c = a.frames.length; _ < c; ++_) {
                        if (s + o <= _ && u < r.length) {
                            var f = r[u++];
                            s = _, o = i._getNumber(f, i.DURATION, 1), l = n.call(this, f, s, o), h && (h.next = l, l.prev = h, this._isOldData && h instanceof t.TweenFrameData && i._getNumber(f, i.DISPLAY_INDEX, 0) === -1 && (h.tweenEasing = t.DragonBones.NO_TWEEN)), h = l
                        }
                        a.frames[_] = l
                    }
                    l.duration = this._animation.duration - l.position, l = a.frames[0], h.next = l, l.prev = h, this._isOldData && h instanceof t.TweenFrameData && i._getNumber(r[0], i.DISPLAY_INDEX, 0) === -1 && (h.tweenEasing = t.DragonBones.NO_TWEEN)
                }
            }
            this._timeline = null
        }, i.prototype._parseActionData = function (e, a, n, r) {
            var s = e[i.ACTION] || e[i.ACTIONS] || e[i.DEFAULT_ACTIONS];
            if ("string" == typeof s) {
                var o = t.BaseObject.borrowObject(t.ActionData);
                o.type = 0, o.bone = n, o.slot = r, o.animationConfig = t.BaseObject.borrowObject(t.AnimationConfig), o.animationConfig.animationName = s, a.push(o)
            } else if (s instanceof Array) for (var l = 0, h = s.length; l < h; ++l) {
                var _ = s[l], u = _ instanceof Array, o = t.BaseObject.borrowObject(t.ActionData),
                    c = u ? _[1] : i._getString(_, "gotoAndPlay", null);
                if (u) {
                    var f = _[0];
                    "string" == typeof f ? o.type = i._getActionType(f) : o.type = f
                } else o.type = 0;
                switch (o.type) {
                    case 0:
                        o.animationConfig = t.BaseObject.borrowObject(t.AnimationConfig), o.animationConfig.animationName = c
                }
                o.bone = n, o.slot = r, a.push(o)
            }
        }, i.prototype._parseEventData = function (e, a, n, r) {
            if (i.SOUND in e) {
                var s = t.BaseObject.borrowObject(t.EventData);
                s.type = 11, s.name = i._getString(e, i.SOUND, null), s.bone = n, s.slot = r, a.push(s)
            }
            if (i.EVENT in e) {
                var o = t.BaseObject.borrowObject(t.EventData);
                o.type = 10, o.name = i._getString(e, i.EVENT, null), o.bone = n, o.slot = r, a.push(o)
            }
            if (i.EVENTS in e) for (var l = e[i.EVENTS], h = 0, _ = l.length; h < _; ++h) {
                var u = l[h], c = i._getString(u, i.BONE, null), f = i._getString(u, i.SLOT, null),
                    o = t.BaseObject.borrowObject(t.EventData);
                if (o.type = 10, o.name = i._getString(u, i.NAME, null), o.bone = this._armature.getBone(c), o.slot = this._armature.getSlot(f), i.INTS in u) {
                    o.data || (o.data = t.BaseObject.borrowObject(t.CustomData));
                    for (var m = u[i.INTS], p = 0, d = m.length; p < d; ++p) o.data.ints.push(m[p])
                }
                if (i.FLOATS in u) {
                    o.data || (o.data = t.BaseObject.borrowObject(t.CustomData));
                    for (var g = u[i.FLOATS], y = 0, v = g.length; y < v; ++y) o.data.floats.push(g[y])
                }
                if (i.STRINGS in u) {
                    o.data || (o.data = t.BaseObject.borrowObject(t.CustomData));
                    for (var b = u[i.STRINGS], T = 0, D = b.length; T < D; ++T) o.data.strings.push(b[T])
                }
                a.push(o)
            }
        }, i.prototype._parseTransform = function (e, a) {
            a.x = i._getNumber(e, i.X, 0) * this._armature.scale, a.y = i._getNumber(e, i.Y, 0) * this._armature.scale, a.skewX = i._getNumber(e, i.SKEW_X, 0) * t.DragonBones.ANGLE_TO_RADIAN, a.skewY = i._getNumber(e, i.SKEW_Y, 0) * t.DragonBones.ANGLE_TO_RADIAN, a.scaleX = i._getNumber(e, i.SCALE_X, 1), a.scaleY = i._getNumber(e, i.SCALE_Y, 1)
        }, i.prototype._parseColorTransform = function (t, e) {
            e.alphaMultiplier = .01 * i._getNumber(t, i.ALPHA_MULTIPLIER, 100), e.redMultiplier = .01 * i._getNumber(t, i.RED_MULTIPLIER, 100), e.greenMultiplier = .01 * i._getNumber(t, i.GREEN_MULTIPLIER, 100), e.blueMultiplier = .01 * i._getNumber(t, i.BLUE_MULTIPLIER, 100), e.alphaOffset = i._getNumber(t, i.ALPHA_OFFSET, 0), e.redOffset = i._getNumber(t, i.RED_OFFSET, 0), e.greenOffset = i._getNumber(t, i.GREEN_OFFSET, 0), e.blueOffset = i._getNumber(t, i.BLUE_OFFSET, 0)
        }, i.prototype.parseDragonBonesData = function (e, a) {
            if (void 0 === a && (a = 1), e) {
                var n = i._getString(e, i.VERSION, null), r = i._getString(e, i.COMPATIBLE_VERSION, null);
                if (this._isOldData = n === i.DATA_VERSION_2_3 || n === i.DATA_VERSION_3_0, this._isOldData ? this._isGlobalTransform = i._getBoolean(e, i.IS_GLOBAL, !0) : this._isGlobalTransform = !1, i.DATA_VERSIONS.indexOf(n) >= 0 || i.DATA_VERSIONS.indexOf(r) >= 0) {
                    var s = t.BaseObject.borrowObject(t.DragonBonesData);
                    if (s.name = i._getString(e, i.NAME, null), s.frameRate = i._getNumber(e, i.FRAME_RATE, 24), 0 === s.frameRate && (s.frameRate = 24), i.ARMATURE in e) {
                        this._data = s;
                        for (var o = e[i.ARMATURE], l = 0, h = o.length; l < h; ++l) s.addArmature(this._parseArmature(o[l], a));
                        this._data = null
                    }
                    return s
                }
                throw new Error("Nonsupport data version.")
            }
            throw new Error(t.DragonBones.ARGUMENT_ERROR)
        }, i.prototype.parseTextureAtlasData = function (e, a, n) {
            if (void 0 === n && (n = 0), !e) throw new Error(t.DragonBones.ARGUMENT_ERROR);
            if (a.name = i._getString(e, i.NAME, null), a.imagePath = i._getString(e, i.IMAGE_PATH, null), a.width = i._getNumber(e, i.WIDTH, 0), a.height = i._getNumber(e, i.HEIGHT, 0), n > 0 ? a.scale = n : n = a.scale = i._getNumber(e, i.SCALE, a.scale), n = 1 / n, i.SUB_TEXTURE in e) for (var r = e[i.SUB_TEXTURE], s = 0, o = r.length; s < o; ++s) {
                var l = r[s], h = a.generateTexture();
                h.name = i._getString(l, i.NAME, null), h.rotated = i._getBoolean(l, i.ROTATED, !1), h.region.x = i._getNumber(l, i.X, 0) * n, h.region.y = i._getNumber(l, i.Y, 0) * n, h.region.width = i._getNumber(l, i.WIDTH, 0) * n, h.region.height = i._getNumber(l, i.HEIGHT, 0) * n;
                var _ = i._getNumber(l, i.FRAME_WIDTH, -1), u = i._getNumber(l, i.FRAME_HEIGHT, -1);
                _ > 0 && u > 0 && (h.frame = t.TextureData.generateRectangle(), h.frame.x = i._getNumber(l, i.FRAME_X, 0) * n, h.frame.y = i._getNumber(l, i.FRAME_Y, 0) * n, h.frame.width = _ * n, h.frame.height = u * n), a.addTexture(h)
            }
        }, i.getInstance = function () {
            return i._instance || (i._instance = new i), i._instance
        }, i
    }(t.DataParser);
    e._instance = null, t.ObjectDataParser = e
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (e) {
        function i() {
            var i = e.call(this) || this;
            return i.globalTransformMatrix = new t.Matrix, i.global = new t.Transform, i.offset = new t.Transform, i
        }

        return __extends(i, e), i.prototype._onClear = function () {
            this.name = null, this.global.identity(), this.offset.identity(), this.globalTransformMatrix.identity(), this.origin = null, this.userData = null, this._armature = null, this._parent = null
        }, i.prototype._setArmature = function (t) {
            this._armature = t
        }, i.prototype._setParent = function (t) {
            this._parent = t
        }, Object.defineProperty(i.prototype, "armature", {
            get: function () {
                return this._armature
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "parent", {
            get: function () {
                return this._parent
            }, enumerable: !0, configurable: !0
        }), i
    }(t.BaseObject);
    t.TransformObject = e
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (e) {
        function i() {
            var i = e.call(this) || this;
            return i._animationPose = new t.Transform, i._bones = [], i._slots = [], i
        }

        return __extends(i, e), i.toString = function () {
            return "[class dragonBones.Bone]"
        }, i.prototype._onClear = function () {
            e.prototype._onClear.call(this), this.inheritTranslation = !1, this.inheritRotation = !1, this.inheritScale = !1, this.ikBendPositive = !1, this.length = 0, this.ikWeight = 0, this._transformDirty = 0, this._visible = !0, this._cachedFrameIndex = -1, this._ikChain = 0, this._ikChainIndex = 0, this._updateState = -1, this._blendLayer = 0, this._blendLeftWeight = 1, this._blendTotalWeight = 0, this._animationPose.identity(), this._bones.length = 0, this._slots.length = 0, this._boneData = null, this._ik = null, this._cachedFrameIndices = null
        }, i.prototype._updateGlobalTransformMatrix = function () {
            if (this.global.x = this.origin.x + this.offset.x + this._animationPose.x, this.global.y = this.origin.y + this.offset.y + this._animationPose.y, this.global.skewX = this.origin.skewX + this.offset.skewX + this._animationPose.skewX, this.global.skewY = this.origin.skewY + this.offset.skewY + this._animationPose.skewY, this.global.scaleX = this.origin.scaleX * this.offset.scaleX * this._animationPose.scaleX, this.global.scaleY = this.origin.scaleY * this.offset.scaleY * this._animationPose.scaleY, this._parent) {
                var t = this._parent.global.skewY, e = this._parent.globalTransformMatrix;
                if (this.inheritScale) this.inheritRotation || (this.global.skewX -= t, this.global.skewY -= t), this.global.toMatrix(this.globalTransformMatrix), this.globalTransformMatrix.concat(e), this.inheritTranslation || (this.globalTransformMatrix.tx = this.global.x, this.globalTransformMatrix.ty = this.global.y), this.global.fromMatrix(this.globalTransformMatrix); else {
                    if (this.inheritTranslation) {
                        var i = this.global.x, a = this.global.y;
                        this.global.x = e.a * i + e.c * a + e.tx, this.global.y = e.d * a + e.b * i + e.ty
                    }
                    this.inheritRotation && (this.global.skewX += t, this.global.skewY += t), this.global.toMatrix(this.globalTransformMatrix)
                }
            } else this.global.toMatrix(this.globalTransformMatrix);
            this._ik && this._ikChainIndex === this._ikChain && this.ikWeight > 0 && (this.inheritTranslation && this._ikChain > 0 && this._parent ? this._computeIKB() : this._computeIKA())
        }, i.prototype._computeIKA = function () {
            var t = this._ik.global, e = this.globalTransformMatrix.a * this.length,
                i = this.globalTransformMatrix.b * this.length,
                a = (Math.atan2(t.y - this.global.y, t.x - this.global.x) + this.offset.skewY - 2 * this.global.skewY + Math.atan2(i, e)) * this.ikWeight;
            this.global.skewX += a, this.global.skewY += a, this.global.toMatrix(this.globalTransformMatrix)
        }, i.prototype._computeIKB = function () {
            var t = this._parent.global, e = this._ik.global, i = this.globalTransformMatrix.a * this.length,
                a = this.globalTransformMatrix.b * this.length, n = i * i + a * a, r = Math.sqrt(n),
                s = this.global.x - t.x, o = this.global.y - t.y, l = s * s + o * o, h = Math.sqrt(l);
            s = e.x - t.x, o = e.y - t.y;
            var _ = s * s + o * o, u = Math.sqrt(_), c = 0;
            if (r + h <= u || u + r <= h || u + h <= r) c = Math.atan2(e.y - t.y, e.x - t.x) + this._parent.offset.skewY,
            r + h <= u || h < r && (c += Math.PI); else {
                var f = (l - n + _) / (2 * _), m = Math.sqrt(l - f * f * _) / u, p = t.x + s * f, d = t.y + o * f,
                    g = -o * m, y = s * m;
                this.ikBendPositive ? (this.global.x = p - g, this.global.y = d - y) : (this.global.x = p + g, this.global.y = d + y), c = Math.atan2(this.global.y - t.y, this.global.x - t.x) + this._parent.offset.skewY
            }
            c = (c - t.skewY) * this.ikWeight, t.skewX += c, t.skewY += c, t.toMatrix(this._parent.globalTransformMatrix), this._parent._transformDirty = 1, this.global.x = t.x + Math.cos(t.skewY) * h, this.global.y = t.y + Math.sin(t.skewY) * h;
            var v = (Math.atan2(e.y - this.global.y, e.x - this.global.x) + this.offset.skewY - 2 * this.global.skewY + Math.atan2(a, i)) * this.ikWeight;
            this.global.skewX += v, this.global.skewY += v, this.global.toMatrix(this.globalTransformMatrix)
        }, i.prototype._init = function (t) {
            this._boneData || (this._boneData = t, this.inheritTranslation = this._boneData.inheritTranslation, this.inheritRotation = this._boneData.inheritRotation, this.inheritScale = this._boneData.inheritScale, this.length = this._boneData.length, this.name = this._boneData.name, this.origin = this._boneData.transform)
        }, i.prototype._setArmature = function (t) {
            if (this._armature !== t) {
                this._ik = null;
                var e = null, i = null;
                if (this._armature && (e = this.getSlots(), i = this.getBones(), this._armature._removeBoneFromBoneList(this)), this._armature = t, this._armature && this._armature._addBoneToBoneList(this), e) for (var a = 0, n = e.length; a < n; ++a) {
                    var r = e[a];
                    r.parent === this && r._setArmature(this._armature)
                }
                if (i) for (var a = 0, n = i.length; a < n; ++a) {
                    var s = i[a];
                    s.parent === this && s._setArmature(this._armature)
                }
            }
        }, i.prototype._setIK = function (t, e, i) {
            if (t) {
                if (e === i) {
                    var a = this._parent;
                    if (e && a ? e = 1 : (e = 0, i = 0, a = this), a === t || a.contains(t)) t = null, e = 0, i = 0; else for (var n = t; n.ik && n.ikChain;) {
                        if (a.contains(n.ik)) {
                            t = null, e = 0, i = 0;
                            break
                        }
                        n = n.parent
                    }
                }
            } else e = 0, i = 0;
            this._ik = t, this._ikChain = e, this._ikChainIndex = i, this._armature && (this._armature._bonesDirty = !0)
        }, i.prototype._update = function (t) {
            if (this._updateState = -1, t >= 0 && this._cachedFrameIndices) {
                var e = this._cachedFrameIndices[t];
                e >= 0 && this._cachedFrameIndex === e ? this._transformDirty = 0 : e >= 0 ? (this._transformDirty = 2, this._cachedFrameIndex = e) : 2 === this._transformDirty || this._parent && 0 !== this._parent._transformDirty || this._ik && this.ikWeight > 0 && 0 !== this._ik._transformDirty ? (this._transformDirty = 2, this._cachedFrameIndex = -1) : this._cachedFrameIndex >= 0 ? (this._transformDirty = 0, this._cachedFrameIndices[t] = this._cachedFrameIndex) : (this._transformDirty = 2, this._cachedFrameIndex = -1)
            } else (2 === this._transformDirty || this._parent && 0 !== this._parent._transformDirty || this._ik && this.ikWeight > 0 && 0 !== this._ik._transformDirty) && (t = -1, this._transformDirty = 2, this._cachedFrameIndex = -1);
            0 !== this._transformDirty && (2 === this._transformDirty ? (this._transformDirty = 1, this._cachedFrameIndex < 0 ? (this._updateGlobalTransformMatrix(), t >= 0 && (this._cachedFrameIndex = this._cachedFrameIndices[t] = this._armature._armatureData.setCacheFrame(this.globalTransformMatrix, this.global))) : this._armature._armatureData.getCacheFrame(this.globalTransformMatrix, this.global, this._cachedFrameIndex), this._updateState = 0) : this._transformDirty = 0)
        }, i.prototype.invalidUpdate = function () {
            this._transformDirty = 2
        }, i.prototype.contains = function (t) {
            if (t) {
                if (t === this) return !1;
                for (var e = t; e !== this && e;) e = e.parent;
                return e === this
            }
            return !1
        }, i.prototype.getBones = function () {
            this._bones.length = 0;
            for (var t = this._armature.getBones(), e = 0, i = t.length; e < i; ++e) {
                var a = t[e];
                a.parent === this && this._bones.push(a)
            }
            return this._bones
        }, i.prototype.getSlots = function () {
            this._slots.length = 0;
            for (var t = this._armature.getSlots(), e = 0, i = t.length; e < i; ++e) {
                var a = t[e];
                a.parent === this && this._slots.push(a)
            }
            return this._slots
        }, Object.defineProperty(i.prototype, "visible", {
            get: function () {
                return this._visible
            }, set: function (t) {
                if (this._visible !== t) {
                    this._visible = t;
                    for (var e = this._armature.getSlots(), i = 0, a = e.length; i < a; ++i) {
                        var n = e[i];
                        n._parent === this && n._updateVisible()
                    }
                }
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "slot", {
            get: function () {
                for (var t = this._armature.getSlots(), e = 0, i = t.length; e < i; ++e) {
                    var a = t[e];
                    if (a.parent === this) return a
                }
                return null
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "ikChain", {
            get: function () {
                return this._ikChain
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "ikChainIndex", {
            get: function () {
                return this._ikChainIndex
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "ik", {
            get: function () {
                return this._ik
            }, enumerable: !0, configurable: !0
        }), i
    }(t.TransformObject);
    t.Bone = e
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (e) {
        function i() {
            var i = e.call(this) || this;
            return i._localMatrix = new t.Matrix, i._colorTransform = new t.ColorTransform, i._ffdVertices = [], i._displayList = [], i._replacedDisplayDatas = [], i._meshBones = [], i
        }

        return __extends(i, e), i.prototype._onClear = function () {
            e.prototype._onClear.call(this);
            for (var i = [], a = 0, n = this._displayList.length; a < n; ++a) {
                var r = this._displayList[a];
                r !== this._rawDisplay && r !== this._meshDisplay && i.indexOf(r) < 0 && i.push(r)
            }
            for (var a = 0, n = i.length; a < n; ++a) {
                var r = i[a];
                r instanceof t.Armature ? r.dispose() : this._disposeDisplay(r)
            }
            this._meshDisplay && this._meshDisplay !== this._rawDisplay && this._disposeDisplay(this._meshDisplay), this._rawDisplay && this._disposeDisplay(this._rawDisplay), this.displayController = null, this._displayDirty = !1, this._zOrderDirty = !1, this._blendModeDirty = !1, this._colorDirty = !1, this._meshDirty = !1, this._originalDirty = !1, this._transformDirty = !1, this._updateState = -1, this._blendMode = 0, this._displayIndex = -1, this._zOrder = 0, this._cachedFrameIndex = -1, this._pivotX = 0, this._pivotY = 0, this._localMatrix.identity(), this._colorTransform.identity(), this._ffdVertices.length = 0, this._displayList.length = 0, this._replacedDisplayDatas.length = 0, this._meshBones.length = 0, this._skinSlotData = null, this._displayData = null, this._replacedDisplayData = null, this._textureData = null, this._meshData = null, this._boundingBoxData = null, this._rawDisplay = null, this._meshDisplay = null, this._display = null, this._childArmature = null, this._cachedFrameIndices = null
        }, i.prototype._isMeshBonesUpdate = function () {
            for (var t = 0, e = this._meshBones.length; t < e; ++t) if (0 !== this._meshBones[t]._transformDirty) return !0;
            return !1
        }, i.prototype._updateDisplayData = function () {
            var t = this._displayData, e = this._replacedDisplayData, a = this._textureData, n = this._meshData,
                r = this._displayIndex >= 0 && this._displayIndex < this._displayList.length ? this._displayList[this._displayIndex] : null;
            if (this._displayIndex >= 0 && this._displayIndex < this._skinSlotData.displays.length ? this._displayData = this._skinSlotData.displays[this._displayIndex] : this._displayData = null, this._displayIndex >= 0 && this._displayIndex < this._replacedDisplayDatas.length ? this._replacedDisplayData = this._replacedDisplayDatas[this._displayIndex] : this._replacedDisplayData = null, this._displayData !== t || this._replacedDisplayData !== e || this._display != r) {
                var s = this._replacedDisplayData ? this._replacedDisplayData : this._displayData;
                if (!s || r !== this._rawDisplay && r !== this._meshDisplay) this._textureData = null, this._meshData = null, this._pivotX = 0, this._pivotY = 0, this._meshBones.length = 0, this._ffdVertices.length = 0; else {
                    if (this._textureData = this._replacedDisplayData ? this._replacedDisplayData.texture : this._displayData.texture, r === this._meshDisplay ? this._replacedDisplayData && this._replacedDisplayData.mesh ? this._meshData = this._replacedDisplayData.mesh : this._meshData = this._displayData.mesh : this._meshData = null, this._meshData) this._pivotX = 0, this._pivotY = 0; else if (this._textureData) {
                        var o = this._armature.armatureData.scale;
                        if (this._pivotX = s.pivot.x, this._pivotY = s.pivot.y, s.isRelativePivot) {
                            var l = this._textureData.frame ? this._textureData.frame : this._textureData.region,
                                h = l.width * o, _ = l.height * o;
                            this._textureData.rotated && (h = l.height, _ = l.width), this._pivotX *= h, this._pivotY *= _
                        }
                        this._textureData.frame && (this._pivotX += this._textureData.frame.x * o, this._pivotY += this._textureData.frame.y * o)
                    } else this._pivotX = 0, this._pivotY = 0;
                    if (!this._displayData || s === this._displayData || this._meshData && this._meshData === this._displayData.mesh || (this._displayData.transform.toMatrix(i._helpMatrix), i._helpMatrix.invert(), i._helpMatrix.transformPoint(0, 0, i._helpPoint), this._pivotX -= i._helpPoint.x, this._pivotY -= i._helpPoint.y, s.transform.toMatrix(i._helpMatrix), i._helpMatrix.invert(), i._helpMatrix.transformPoint(0, 0, i._helpPoint), this._pivotX += i._helpPoint.x, this._pivotY += i._helpPoint.y), this._meshData !== n) if (this._meshData && this._displayData && this._meshData === this._displayData.mesh) {
                        if (this._meshData.skinned) {
                            this._meshBones.length = this._meshData.bones.length;
                            for (var u = 0, c = this._meshBones.length; u < c; ++u) this._meshBones[u] = this._armature.getBone(this._meshData.bones[u].name);
                            for (var f = 0, u = 0, c = this._meshData.boneIndices.length; u < c; ++u) f += this._meshData.boneIndices[u].length;
                            this._ffdVertices.length = 2 * f
                        } else this._meshBones.length = 0, this._ffdVertices.length = this._meshData.vertices.length;
                        for (var u = 0, c = this._ffdVertices.length; u < c; ++u) this._ffdVertices[u] = 0;
                        this._meshDirty = !0
                    } else this._meshBones.length = 0, this._ffdVertices.length = 0; else this._textureData !== a && (this._meshDirty = !0)
                }
                this._displayDirty = !0, this._originalDirty = !0, this._displayData ? this.origin = this._displayData.transform : this._replacedDisplayData && (this.origin = this._replacedDisplayData.transform)
            }
            this._replacedDisplayData ? this._boundingBoxData = this._replacedDisplayData.boundingBox : this._displayData ? this._boundingBoxData = this._displayData.boundingBox : this._boundingBoxData = null
        }, i.prototype._updateDisplay = function () {
            var e = this._display || this._rawDisplay, i = this._childArmature;
            this._displayIndex >= 0 && this._displayIndex < this._displayList.length ? (this._display = this._displayList[this._displayIndex], this._display instanceof t.Armature ? (this._childArmature = this._display, this._display = this._childArmature.display) : this._childArmature = null) : (this._display = null, this._childArmature = null);
            var a = this._display ? this._display : this._rawDisplay;
            if (a !== e && (this._onUpdateDisplay(), e ? this._replaceDisplay(e) : this._addDisplay(), this._blendModeDirty = !0, this._colorDirty = !0), a !== this._rawDisplay && a !== this._meshDisplay || this._updateFrame(), this._childArmature !== i && (i && (i._parent = null, i.clock = null, i.inheritAnimation && i.animation.reset()), this._childArmature && (this._childArmature._parent = this, this._childArmature.clock = this._armature.clock, this._childArmature.inheritAnimation))) {
                if (0 === this._childArmature.cacheFrameRate) {
                    var n = this._armature.cacheFrameRate;
                    0 !== n && (this._childArmature.cacheFrameRate = n)
                }
                var r = this._skinSlotData.slot.actions.length > 0 ? this._skinSlotData.slot.actions : this._childArmature.armatureData.actions;
                if (r.length > 0) for (var s = 0, o = r.length; s < o; ++s) this._childArmature._bufferAction(r[s]); else this._childArmature.animation.play()
            }
        }, i.prototype._updateLocalTransformMatrix = function () {
            this.origin ? this.global.copyFrom(this.origin).add(this.offset).toMatrix(this._localMatrix) : this.global.copyFrom(this.offset).toMatrix(this._localMatrix)
        }, i.prototype._updateGlobalTransformMatrix = function () {
            this.globalTransformMatrix.copyFrom(this._localMatrix), this.globalTransformMatrix.concat(this._parent.globalTransformMatrix), this.global.fromMatrix(this.globalTransformMatrix)
        }, i.prototype._init = function (t, e, i) {
            if (!this._skinSlotData) {
                this._skinSlotData = t;
                var a = this._skinSlotData.slot;
                this.name = a.name, this._zOrder = a.zOrder, this._blendMode = a.blendMode, this._colorTransform.copyFrom(a.color), this._rawDisplay = e, this._meshDisplay = i, this._blendModeDirty = !0, this._colorDirty = !0
            }
        }, i.prototype._setArmature = function (t) {
            this._armature !== t && (this._armature && this._armature._removeSlotFromSlotList(this), this._armature = t, this._onUpdateDisplay(), this._armature ? (this._armature._addSlotToSlotList(this), this._addDisplay()) : this._removeDisplay())
        }, i.prototype._update = function (t) {
            if (this._updateState = -1, this._displayDirty && (this._displayDirty = !1, this._updateDisplay()), this._zOrderDirty && (this._zOrderDirty = !1, this._updateZOrder()), this._display) {
                if (this._blendModeDirty && (this._blendModeDirty = !1, this._updateBlendMode()), this._colorDirty && (this._colorDirty = !1, this._updateColor()), this._originalDirty && (this._originalDirty = !1, this._transformDirty = !0, this._updateLocalTransformMatrix()), this._meshData && this._displayData && this._meshData === this._displayData.mesh && ((this._meshDirty || this._meshData.skinned && this._isMeshBonesUpdate()) && (this._meshDirty = !1, this._updateMesh()), this._meshData.skinned)) return void(this._transformDirty && (this._transformDirty = !1, this._updateTransform(!0)));
                if (t >= 0 && this._cachedFrameIndices) {
                    var e = this._cachedFrameIndices[t];
                    e >= 0 && this._cachedFrameIndex === e ? this._transformDirty = !1 : e >= 0 ? (this._transformDirty = !0, this._cachedFrameIndex = e) : this._transformDirty || 0 !== this._parent._transformDirty ? (this._transformDirty = !0, this._cachedFrameIndex = -1) : this._cachedFrameIndex >= 0 ? (this._transformDirty = !1, this._cachedFrameIndices[t] = this._cachedFrameIndex) : (this._transformDirty = !0, this._cachedFrameIndex = -1)
                } else (this._transformDirty || 0 !== this._parent._transformDirty) && (t = -1, this._transformDirty = !0, this._cachedFrameIndex = -1);
                this._transformDirty && (this._transformDirty = !1, this._cachedFrameIndex < 0 ? (this._updateGlobalTransformMatrix(), t >= 0 && (this._cachedFrameIndex = this._cachedFrameIndices[t] = this._armature._armatureData.setCacheFrame(this.globalTransformMatrix, this.global))) : this._armature._armatureData.getCacheFrame(this.globalTransformMatrix, this.global, this._cachedFrameIndex), this._updateTransform(!1), this._updateState = 0)
            }
        }, i.prototype._updateTransformAndMatrix = function () {
            this._updateState < 0 && (this._updateState = 0, this._updateLocalTransformMatrix(), this._updateGlobalTransformMatrix())
        }, i.prototype._setDisplayList = function (e) {
            if (e && e.length > 0) {
                this._displayList.length !== e.length && (this._displayList.length = e.length);
                for (var i = 0, a = e.length; i < a; ++i) {
                    var n = e[i];
                    n && n !== this._rawDisplay && n !== this._meshDisplay && !(n instanceof t.Armature) && this._displayList.indexOf(n) < 0 && this._initDisplay(n), this._displayList[i] = n
                }
            } else this._displayList.length > 0 && (this._displayList.length = 0);
            return this._displayIndex >= 0 && this._displayIndex < this._displayList.length ? this._displayDirty = this._display !== this._displayList[this._displayIndex] : this._displayDirty = null != this._display, this._updateDisplayData(), this._displayDirty
        }, i.prototype._setDisplayIndex = function (t) {
            return this._displayIndex !== t && (this._displayIndex = t, this._displayDirty = !0, this._updateDisplayData(), this._displayDirty)
        }, i.prototype._setZorder = function (t) {
            return this._zOrder === t, this._zOrder = t, this._zOrderDirty = !0, this._zOrderDirty
        }, i.prototype._setColor = function (t) {
            return this._colorTransform.copyFrom(t), this._colorDirty = !0, !0
        }, i.prototype.containsPoint = function (t, e) {
            return !!this._boundingBoxData && (this._updateTransformAndMatrix(), i._helpMatrix.copyFrom(this.globalTransformMatrix), i._helpMatrix.invert(), i._helpMatrix.transformPoint(t, e, i._helpPoint), this._boundingBoxData.containsPoint(i._helpPoint.x, i._helpPoint.y))
        }, i.prototype.intersectsSegment = function (t, e, a, n, r, s, o) {
            if (void 0 === r && (r = null), void 0 === s && (s = null), void 0 === o && (o = null), !this._boundingBoxData) return 0;
            this._updateTransformAndMatrix(), i._helpMatrix.copyFrom(this.globalTransformMatrix), i._helpMatrix.invert(), i._helpMatrix.transformPoint(t, e, i._helpPoint), t = i._helpPoint.x, e = i._helpPoint.y, i._helpMatrix.transformPoint(a, n, i._helpPoint), a = i._helpPoint.x, n = i._helpPoint.y;
            var l = this._boundingBoxData.intersectsSegment(t, e, a, n, r, s, o);
            return l > 0 && (1 === l || 2 === l ? r ? (this.globalTransformMatrix.transformPoint(r.x, r.y, r), s && (s.x = r.x, s.y = r.y)) : s && this.globalTransformMatrix.transformPoint(s.x, s.y, s) : (r && this.globalTransformMatrix.transformPoint(r.x, r.y, r), s && this.globalTransformMatrix.transformPoint(s.x, s.y, s)), o && (this.globalTransformMatrix.transformPoint(Math.cos(o.x), Math.sin(o.x), i._helpPoint, !0), o.x = Math.atan2(i._helpPoint.y, i._helpPoint.x), this.globalTransformMatrix.transformPoint(Math.cos(o.y), Math.sin(o.y), i._helpPoint, !0), o.y = Math.atan2(i._helpPoint.y, i._helpPoint.x))), l
        }, i.prototype.invalidUpdate = function () {
            this._displayDirty = !0
        }, Object.defineProperty(i.prototype, "skinSlotData", {
            get: function () {
                return this._skinSlotData
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "boundingBoxData", {
            get: function () {
                return this._boundingBoxData
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "rawDisplay", {
            get: function () {
                return this._rawDisplay
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "meshDisplay", {
            get: function () {
                return this._meshDisplay
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "displayIndex", {
            get: function () {
                return this._displayIndex
            }, set: function (t) {
                this._setDisplayIndex(t) && this._update(-1)
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "displayList", {
            get: function () {
                return this._displayList.concat()
            }, set: function (e) {
                var i = this._displayList.concat(), a = [];
                this._setDisplayList(e) && this._update(-1);
                for (var n = 0, r = i.length; n < r; ++n) {
                    var s = i[n];
                    s && s !== this._rawDisplay && s !== this._meshDisplay && this._displayList.indexOf(s) < 0 && a.indexOf(s) < 0 && a.push(s)
                }
                for (var n = 0, r = a.length; n < r; ++n) {
                    var s = a[n];
                    s instanceof t.Armature ? s.dispose() : this._disposeDisplay(s)
                }
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "display", {
            get: function () {
                return this._display
            }, set: function (t) {
                if (this._display !== t) {
                    var e = this._displayList.length;
                    if (this._displayIndex < 0 && 0 === e && (this._displayIndex = 0), !(this._displayIndex < 0)) {
                        var i = this.displayList;
                        e <= this._displayIndex && (i.length = this._displayIndex + 1), i[this._displayIndex] = t, this.displayList = i
                    }
                }
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "childArmature", {
            get: function () {
                return this._childArmature
            }, set: function (t) {
                this._childArmature !== t && (this.display = t)
            }, enumerable: !0, configurable: !0
        }), i.prototype.getDisplay = function () {
            return this._display
        }, i.prototype.setDisplay = function (t) {
            this.display = t
        }, i
    }(t.TransformObject);
    e._helpPoint = new t.Point, e._helpMatrix = new t.Matrix, t.Slot = e
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (e) {
        function i() {
            var t = e.call(this) || this;
            return t._bones = [], t._slots = [], t._actions = [], t._events = [], t.enableCache = !1, t
        }

        return __extends(i, e), i.toString = function () {
            return "[class dragonBones.Armature]"
        }, i._onSortSlots = function (t, e) {
            return t._zOrder > e._zOrder ? 1 : -1
        }, i.prototype._onClear = function () {
            for (var t = 0, e = this._bones.length; t < e; ++t) this._bones[t].returnToPool();
            for (var t = 0, e = this._slots.length; t < e; ++t) this._slots[t].returnToPool();
            for (var t = 0, e = this._events.length; t < e; ++t) this._events[t].returnToPool();
            this._clock && this._clock.remove(this), this._proxy && this._proxy._onClear(), this._replaceTextureAtlasData && this._replaceTextureAtlasData.returnToPool(), this._animation && this._animation.returnToPool(), this.inheritAnimation = !0, this.debugDraw = !1, this.userData = null, this._debugDraw = !1, this._delayDispose = !1, this._lockDispose = !1, this._bonesDirty = !1, this._slotsDirty = !1, this._bones.length = 0, this._slots.length = 0, this._actions.length = 0, this._events.length = 0, this._armatureData = null, this._skinData = null, this._animation = null, this._proxy = null, this._display = null, this._eventManager = null, this._parent = null, this._clock = null, this._replaceTextureAtlasData = null, this._replacedTexture = null
        }, i.prototype._sortBones = function () {
            var t = this._bones.length;
            if (!(t <= 0)) {
                var e = this._bones.concat(), i = 0, a = 0;
                for (this._bones.length = 0; a < t;) {
                    var n = e[i++];
                    i >= t && (i = 0), this._bones.indexOf(n) >= 0 || n.parent && this._bones.indexOf(n.parent) < 0 || n.ik && this._bones.indexOf(n.ik) < 0 || (n.ik && n.ikChain > 0 && n.ikChainIndex === n.ikChain ? this._bones.splice(this._bones.indexOf(n.parent) + 1, 0, n) : this._bones.push(n), a++)
                }
            }
        }, i.prototype._sortSlots = function () {
            this._slots.sort(i._onSortSlots)
        }, i.prototype._doAction = function (t) {
            switch (t.type) {
                case 0:
                    this._animation.playConfig(t.animationConfig)
            }
        }, i.prototype._init = function (e, i, a, n, r) {
            this._armatureData || (this._armatureData = e, this._skinData = i, this._animation = t.BaseObject.borrowObject(t.Animation), this._proxy = a, this._display = n, this._eventManager = r, this._animation._init(this), this._animation.animations = this._armatureData.animations)
        }, i.prototype._addBoneToBoneList = function (t) {
            this._bones.indexOf(t) < 0 && (this._bonesDirty = !0, this._bones.push(t), this._animation._timelineStateDirty = !0)
        }, i.prototype._removeBoneFromBoneList = function (t) {
            var e = this._bones.indexOf(t);
            e >= 0 && (this._bones.splice(e, 1), this._animation._timelineStateDirty = !0)
        }, i.prototype._addSlotToSlotList = function (t) {
            this._slots.indexOf(t) < 0 && (this._slotsDirty = !0, this._slots.push(t), this._animation._timelineStateDirty = !0)
        }, i.prototype._removeSlotFromSlotList = function (t) {
            var e = this._slots.indexOf(t);
            e >= 0 && (this._slots.splice(e, 1), this._animation._timelineStateDirty = !0)
        }, i.prototype._sortZOrder = function (t) {
            for (var e = this._armatureData.sortedSlots, i = !t || t.length < 1, a = 0, n = e.length; a < n; ++a) {
                var r = i ? a : t[a], s = e[r], o = this.getSlot(s.name);
                o && o._setZorder(a)
            }
            this._slotsDirty = !0
        }, i.prototype._bufferAction = function (t) {
            this._actions.push(t)
        }, i.prototype._bufferEvent = function (t, e) {
            t.type = e, t.armature = this, this._events.push(t)
        }, i.prototype.dispose = function () {
            this._delayDispose = !0, !this._lockDispose && this._armatureData && this.returnToPool()
        }, i.prototype.advanceTime = function (e) {
            if (!this._armatureData) throw new Error("The armature has been disposed.");
            if (!this._armatureData.parent) throw new Error("The armature data has been disposed.");
            this._bonesDirty && (this._bonesDirty = !1, this._sortBones()), this._slotsDirty && (this._slotsDirty = !1, this._sortSlots());
            var i = this._animation._cacheFrameIndex;
            this._animation._advanceTime(e);
            var a = this._animation._cacheFrameIndex, n = 0, r = 0;
            if (a < 0 || a !== i) {
                for (n = 0, r = this._bones.length; n < r; ++n) this._bones[n]._update(a);
                for (n = 0, r = this._slots.length; n < r; ++n) this._slots[n]._update(a)
            }
            var s = this.debugDraw || t.DragonBones.debugDraw;
            if ((s || this._debugDraw) && (this._debugDraw = s, this._proxy._debugDraw(this._debugDraw)), !this._lockDispose) {
                if (this._lockDispose = !0, r = this._events.length, r > 0) {
                    for (n = 0; n < r; ++n) {
                        var o = this._events[n];
                        this._proxy._dispatchEvent(o.type, o), o.type === t.EventObject.SOUND_EVENT && this._eventManager._dispatchEvent(o.type, o), o.returnToPool()
                    }
                    this._events.length = 0
                }
                if (r = this._actions.length, r > 0) {
                    for (n = 0; n < r; ++n) {
                        var l = this._actions[n];
                        if (l.slot) {
                            var h = this.getSlot(l.slot.name);
                            if (h) {
                                var _ = h.childArmature;
                                _ && _._doAction(l)
                            }
                        } else if (l.bone) for (var u = 0, c = this._slots.length; u < c; ++u) {
                            var _ = this._slots[u].childArmature;
                            _ && _._doAction(l)
                        } else this._doAction(l)
                    }
                    this._actions.length = 0
                }
                this._lockDispose = !1
            }
            this._delayDispose && this.returnToPool()
        }, i.prototype.invalidUpdate = function (t, e) {
            if (void 0 === t && (t = null), void 0 === e && (e = !1), t) {
                var i = this.getBone(t);
                if (i && (i.invalidUpdate(), e)) for (var a = 0, n = this._slots.length; a < n; ++a) {
                    var r = this._slots[a];
                    r.parent === i && r.invalidUpdate()
                }
            } else {
                for (var a = 0, n = this._bones.length; a < n; ++a) this._bones[a].invalidUpdate();
                if (e) for (var a = 0, n = this._slots.length; a < n; ++a) this._slots[a].invalidUpdate()
            }
        }, i.prototype.containsPoint = function (t, e) {
            for (var i = 0, a = this._slots.length; i < a; ++i) {
                var n = this._slots[i];
                if (n.containsPoint(t, e)) return n
            }
            return null
        }, i.prototype.intersectsSegment = function (t, e, i, a, n, r, s) {
            void 0 === n && (n = null), void 0 === r && (r = null), void 0 === s && (s = null);
            for (var o = t === i, l = 0, h = 0, _ = 0, u = 0, c = 0, f = 0, m = 0, p = 0, d = null, g = null, y = 0, v = this._slots.length; y < v; ++y) {
                var b = this._slots[y], T = b.intersectsSegment(t, e, i, a, n, r, s);
                if (T > 0) {
                    if (!n && !r) {
                        d = b;
                        break
                    }
                    if (n) {
                        var D = o ? n.y - e : n.x - t;
                        D < 0 && (D = -D), (!d || D < l) && (l = D, _ = n.x, u = n.y, d = b, s && (m = s.x))
                    }
                    if (r) {
                        var D = r.x - t;
                        D < 0 && (D = -D), (!g || D > h) && (h = D, c = r.x, f = r.y, g = b, s && (p = s.y))
                    }
                }
            }
            return d && n && (n.x = _, n.y = u, s && (s.x = m)), g && r && (r.x = c, r.y = f, s && (s.y = p)), d
        }, i.prototype.getBone = function (t) {
            for (var e = 0, i = this._bones.length; e < i; ++e) {
                var a = this._bones[e];
                if (a.name === t) return a
            }
            return null
        }, i.prototype.getBoneByDisplay = function (t) {
            var e = this.getSlotByDisplay(t);
            return e ? e.parent : null
        }, i.prototype.getSlot = function (t) {
            for (var e = 0, i = this._slots.length; e < i; ++e) {
                var a = this._slots[e];
                if (a.name === t) return a
            }
            return null
        }, i.prototype.getSlotByDisplay = function (t) {
            if (t) for (var e = 0, i = this._slots.length; e < i; ++e) {
                var a = this._slots[e];
                if (a.display === t) return a
            }
            return null
        }, i.prototype.addBone = function (e, i) {
            if (void 0 === i && (i = null), !e) throw new Error(t.DragonBones.ARGUMENT_ERROR);
            e._setArmature(this), e._setParent(i ? this.getBone(i) : null)
        }, i.prototype.removeBone = function (e) {
            if (!e || e.armature !== this) throw new Error(t.DragonBones.ARGUMENT_ERROR);
            e._setParent(null), e._setArmature(null)
        }, i.prototype.addSlot = function (e, i) {
            var a = this.getBone(i);
            if (!a) throw new Error(t.DragonBones.ARGUMENT_ERROR);
            e._setArmature(this), e._setParent(a)
        }, i.prototype.removeSlot = function (e) {
            if (!e || e.armature !== this) throw new Error(t.DragonBones.ARGUMENT_ERROR);
            e._setParent(null), e._setArmature(null)
        }, i.prototype.replaceTexture = function (t) {
            this.replacedTexture = t
        }, i.prototype.getBones = function () {
            return this._bones
        }, i.prototype.getSlots = function () {
            return this._slots
        }, Object.defineProperty(i.prototype, "name", {
            get: function () {
                return this._armatureData ? this._armatureData.name : null
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "armatureData", {
            get: function () {
                return this._armatureData
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "animation", {
            get: function () {
                return this._animation
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "eventDispatcher", {
            get: function () {
                return this._proxy
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "display", {
            get: function () {
                return this._display
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "parent", {
            get: function () {
                return this._parent
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "cacheFrameRate", {
            get: function () {
                return this._armatureData.cacheFrameRate
            }, set: function (t) {
                if (this._armatureData.cacheFrameRate !== t) {
                    this._armatureData.cacheFrames(t);
                    for (var e = 0, i = this._slots.length; e < i; ++e) {
                        var a = this._slots[e].childArmature;
                        a && (a.cacheFrameRate = t)
                    }
                }
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "clock", {
            get: function () {
                return this._clock
            }, set: function (t) {
                if (this._clock !== t) {
                    var e = this._clock;
                    this._clock = t, e && e.remove(this), this._clock && this._clock.add(this);
                    for (var i = 0, a = this._slots.length; i < a; ++i) {
                        var n = this._slots[i].childArmature;
                        n && (n.clock = this._clock)
                    }
                }
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "replacedTexture", {
            get: function () {
                return this._replacedTexture
            }, set: function (t) {
                this._replaceTextureAtlasData && (this._replaceTextureAtlasData.returnToPool(), this._replaceTextureAtlasData = null), this._replacedTexture = t;
                for (var e = 0, i = this._slots.length; e < i; ++e) {
                    var a = this._slots[e];
                    a.invalidUpdate(), a._update(-1)
                }
            }, enumerable: !0, configurable: !0
        }), i.prototype.hasEventListener = function (t) {
            return this._proxy.hasEvent(t)
        }, i.prototype.addEventListener = function (t, e, i) {
            this._proxy.addEvent(t, e, i)
        }, i.prototype.removeEventListener = function (t, e, i) {
            this._proxy.removeEvent(t, e, i)
        }, i.prototype.enableAnimationCache = function (t) {
            this.cacheFrameRate = t
        }, i.prototype.getDisplay = function () {
            return this._display
        }, i
    }(t.BaseObject);
    t.Armature = e
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (e) {
        function i() {
            var t = e.call(this) || this;
            return t._animationNames = [], t._animations = {}, t._animationStates = [], t
        }

        return __extends(i, e), i._sortAnimationState = function (t, e) {
            return t.layer > e.layer ? -1 : 1
        }, i.toString = function () {
            return "[class dragonBones.Animation]"
        }, i.prototype._onClear = function () {
            for (var t = 0, e = this._animationStates.length; t < e; ++t) this._animationStates[t].returnToPool();
            this._animationConfig && this._animationConfig.returnToPool();
            for (var i in this._animations) delete this._animations[i];
            this.timeScale = 1, this._isPlaying = !1, this._animationStateDirty = !1, this._timelineStateDirty = !1, this._cacheFrameIndex = -1, this._animationNames.length = 0, this._animationStates.length = 0, this._armature = null, this._lastAnimationState = null, this._animationConfig = null
        }, i.prototype._fadeOut = function (t) {
            var e = 0, i = this._animationStates.length, a = null;
            switch (t.fadeOutMode) {
                case 1:
                    for (; e < i; ++e) a = this._animationStates[e], a.layer === t.layer && a.fadeOut(t.fadeOutTime, t.pauseFadeOut);
                    break;
                case 2:
                    for (; e < i; ++e) a = this._animationStates[e], a.group === t.group && a.fadeOut(t.fadeOutTime, t.pauseFadeOut);
                    break;
                case 3:
                    for (; e < i; ++e) a = this._animationStates[e], a.layer === t.layer && a.group === t.group && a.fadeOut(t.fadeOutTime, t.pauseFadeOut);
                    break;
                case 4:
                    for (; e < i; ++e) a = this._animationStates[e], a.fadeOut(t.fadeOutTime, t.pauseFadeOut);
                    break;
                case 0:
            }
        }, i.prototype._init = function (e) {
            this._armature || (this._armature = e, this._animationConfig = t.BaseObject.borrowObject(t.AnimationConfig))
        }, i.prototype._advanceTime = function (t) {
            if (this._isPlaying) {
                t < 0 && (t = -t), this._armature.inheritAnimation && this._armature._parent && (t *= this._armature._parent._armature.animation.timeScale), 1 !== this.timeScale && (t *= this.timeScale);
                var e = this._animationStates.length;
                if (1 === e) {
                    var i = this._animationStates[0];
                    if (i._fadeState > 0 && i._subFadeState > 0) i.returnToPool(), this._animationStates.length = 0, this._animationStateDirty = !0, this._lastAnimationState = null; else {
                        var a = i.animationData, n = a.cacheFrameRate;
                        if (this._animationStateDirty && n > 0) {
                            this._animationStateDirty = !1;
                            for (var r = this._armature.getBones(), s = 0, o = r.length; s < o; ++s) {
                                var l = r[s];
                                l._cachedFrameIndices = a.getBoneCachedFrameIndices(l.name)
                            }
                            for (var h = this._armature.getSlots(), s = 0, o = h.length; s < o; ++s) {
                                var _ = h[s];
                                _._cachedFrameIndices = a.getSlotCachedFrameIndices(_.name)
                            }
                        }
                        this._timelineStateDirty && i._updateTimelineStates(), i._advanceTime(t, n)
                    }
                } else if (e > 1) {
                    for (var s = 0, u = 0; s < e; ++s) {
                        var i = this._animationStates[s];
                        i._fadeState > 0 && i._subFadeState > 0 ? (u++, i.returnToPool(), this._animationStateDirty = !0, this._lastAnimationState === i && (this._lastAnimationState = null)) : (u > 0 && (this._animationStates[s - u] = i), this._timelineStateDirty && i._updateTimelineStates(), i._advanceTime(t, 0)), s === e - 1 && u > 0 && (this._animationStates.length -= u, !this._lastAnimationState && this._animationStates.length > 0 && (this._lastAnimationState = this._animationStates[this._animationStates.length - 1]))
                    }
                    this._cacheFrameIndex = -1
                } else this._cacheFrameIndex = -1;
                this._timelineStateDirty = !1
            }
        }, i.prototype.reset = function () {
            for (var t = 0, e = this._animationStates.length; t < e; ++t) this._animationStates[t].returnToPool();
            this._isPlaying = !1, this._animationStateDirty = !1, this._timelineStateDirty = !1, this._cacheFrameIndex = -1, this._animationConfig.clear(), this._animationStates.length = 0, this._lastAnimationState = null
        }, i.prototype.stop = function (t) {
            if (void 0 === t && (t = null), t) {
                var e = this.getState(t);
                e && e.stop()
            } else this._isPlaying = !1
        }, i.prototype.playConfig = function (e) {
            if (!e) throw new Error(t.DragonBones.ARGUMENT_ERROR);
            var a = e.animationName ? e.animationName : e.name, n = this._animations[a];
            if (!n) return console.warn("Non-existent animation.\n", "DragonBones name: " + this._armature.armatureData.parent.name, "Armature name: " + this._armature.name, "Animation name: " + a), null;
            this._isPlaying = !0, e.playTimes < 0 && (e.playTimes = n.playTimes), (e.fadeInTime < 0 || e.fadeInTime !== e.fadeInTime) && (this._lastAnimationState ? e.fadeInTime = n.fadeInTime : e.fadeInTime = 0), (e.fadeOutTime < 0 || e.fadeOutTime !== e.fadeOutTime) && (e.fadeOutTime = e.fadeInTime), (e.timeScale <= -100 || e.timeScale !== e.timeScale) && (e.timeScale = 1 / n.scale), n.duration > 0 ? (e.position !== e.position ? e.position = 0 : e.position < 0 ? (e.position %= n.duration, e.position = n.duration - e.position) : e.position === n.duration ? e.position -= .001 : e.position > n.duration && (e.position %= n.duration), e.position + e.duration > n.duration && (e.duration = n.duration - e.position)) : (e.position = 0, e.duration = -1);
            var r = 0 === e.duration;
            r && (e.playTimes = 1, e.duration = -1, e.fadeInTime = 0), this._fadeOut(e), this._lastAnimationState = t.BaseObject.borrowObject(t.AnimationState), this._lastAnimationState._init(this._armature, n, e), this._animationStates.push(this._lastAnimationState), this._animationStateDirty = !0, this._cacheFrameIndex = -1, this._animationStates.length > 1 && this._animationStates.sort(i._sortAnimationState);
            for (var s = this._armature.getSlots(), o = 0, l = s.length; o < l; ++o) {
                var h = s[o].childArmature;
                h && h.inheritAnimation && h.animation.hasAnimation(a) && !h.animation.getState(a) && h.animation.fadeIn(a)
            }
            return e.fadeInTime <= 0 && this._armature.advanceTime(0), r && this._lastAnimationState.stop(), this._lastAnimationState
        }, i.prototype.fadeIn = function (t, e, i, a, n, r) {
            return void 0 === e && (e = -1), void 0 === i && (i = -1), void 0 === a && (a = 0), void 0 === n && (n = null),
            void 0 === r && (r = 3), this._animationConfig.clear(), this._animationConfig.fadeOutMode = r, this._animationConfig.playTimes = i, this._animationConfig.layer = a, this._animationConfig.fadeInTime = e, this._animationConfig.animationName = t, this._animationConfig.group = n, this.playConfig(this._animationConfig)
        }, i.prototype.play = function (t, e) {
            if (void 0 === t && (t = null), void 0 === e && (e = -1), this._animationConfig.clear(), this._animationConfig.playTimes = e, this._animationConfig.fadeInTime = 0, this._animationConfig.animationName = t, t) this.playConfig(this._animationConfig); else if (this._lastAnimationState) this._isPlaying && (this._lastAnimationState.isPlaying || this._lastAnimationState.isCompleted) ? (this._animationConfig.animationName = this._lastAnimationState.name, this.playConfig(this._animationConfig)) : (this._isPlaying = !0, this._lastAnimationState.play()); else {
                var i = this._armature.armatureData.defaultAnimation;
                i && (this._animationConfig.animationName = i.name, this.playConfig(this._animationConfig))
            }
            return this._lastAnimationState
        }, i.prototype.gotoAndPlayByTime = function (t, e, i) {
            return void 0 === e && (e = 0), void 0 === i && (i = -1), this._animationConfig.clear(), this._animationConfig.playTimes = i, this._animationConfig.position = e, this._animationConfig.fadeInTime = 0, this._animationConfig.animationName = t, this.playConfig(this._animationConfig)
        }, i.prototype.gotoAndPlayByFrame = function (t, e, i) {
            void 0 === e && (e = 0), void 0 === i && (i = -1), this._animationConfig.clear(), this._animationConfig.playTimes = i, this._animationConfig.fadeInTime = 0, this._animationConfig.animationName = t;
            var a = this._animations[t];
            return a && (this._animationConfig.position = a.duration * e / a.frameCount), this.playConfig(this._animationConfig)
        }, i.prototype.gotoAndPlayByProgress = function (t, e, i) {
            void 0 === e && (e = 0), void 0 === i && (i = -1), this._animationConfig.clear(), this._animationConfig.playTimes = i, this._animationConfig.fadeInTime = 0, this._animationConfig.animationName = t;
            var a = this._animations[t];
            return a && (this._animationConfig.position = a.duration * (e > 0 ? e : 0)), this.playConfig(this._animationConfig)
        }, i.prototype.gotoAndStopByTime = function (t, e) {
            void 0 === e && (e = 0);
            var i = this.gotoAndPlayByTime(t, e, 1);
            return i && i.stop(), i
        }, i.prototype.gotoAndStopByFrame = function (t, e) {
            void 0 === e && (e = 0);
            var i = this.gotoAndPlayByFrame(t, e, 1);
            return i && i.stop(), i
        }, i.prototype.gotoAndStopByProgress = function (t, e) {
            void 0 === e && (e = 0);
            var i = this.gotoAndPlayByProgress(t, e, 1);
            return i && i.stop(), i
        }, i.prototype.getState = function (t) {
            for (var e = 0, i = this._animationStates.length; e < i; ++e) {
                var a = this._animationStates[e];
                if (a.name === t) return a
            }
            return null
        }, i.prototype.hasAnimation = function (t) {
            return null != this._animations[t]
        }, Object.defineProperty(i.prototype, "isPlaying", {
            get: function () {
                return this._animationStates.length > 1 ? this._isPlaying && !this.isCompleted : this._lastAnimationState ? this._isPlaying && this._lastAnimationState.isPlaying : this._isPlaying
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "isCompleted", {
            get: function () {
                if (this._lastAnimationState) {
                    if (!this._lastAnimationState.isCompleted) return !1;
                    for (var t = 0, e = this._animationStates.length; t < e; ++t) if (!this._animationStates[t].isCompleted) return !1;
                    return !0
                }
                return !1
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "lastAnimationName", {
            get: function () {
                return this._lastAnimationState ? this._lastAnimationState.name : null
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "lastAnimationState", {
            get: function () {
                return this._lastAnimationState
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "animationConfig", {
            get: function () {
                return this._animationConfig
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "animationNames", {
            get: function () {
                return this._animationNames
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "animations", {
            get: function () {
                return this._animations
            }, set: function (t) {
                if (this._animations !== t) {
                    this._animationNames.length = 0;
                    for (var e in this._animations) delete this._animations[e];
                    if (t) for (var e in t) this._animations[e] = t[e], this._animationNames.push(e)
                }
            }, enumerable: !0, configurable: !0
        }), i.prototype.gotoAndPlay = function (t, e, i, a, n, r, s, o, l) {
            void 0 === e && (e = -1), void 0 === i && (i = -1), void 0 === a && (a = -1), void 0 === n && (n = 0), void 0 === r && (r = null), void 0 === s && (s = 3), void 0 === o && (o = !0), void 0 === l && (l = !0), this._animationConfig.clear(), this._animationConfig.fadeOutMode = s, this._animationConfig.playTimes = a, this._animationConfig.layer = n, this._animationConfig.fadeInTime = e, this._animationConfig.animationName = t, this._animationConfig.group = r;
            var h = this._animations[t];
            return h && i > 0 && (this._animationConfig.timeScale = h.duration / i), this.playConfig(this._animationConfig)
        }, i.prototype.gotoAndStop = function (t, e) {
            return void 0 === e && (e = 0), this.gotoAndStopByTime(t, e)
        }, Object.defineProperty(i.prototype, "animationList", {
            get: function () {
                return this._animationNames
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "animationDataList", {
            get: function () {
                for (var t = [], e = 0, i = this._animationNames.length; e < i; ++e) t.push(this._animations[this._animationNames[e]]);
                return t
            }, enumerable: !0, configurable: !0
        }), i
    }(t.BaseObject);
    e.None = 0, e.SameLayer = 1, e.SameGroup = 2, e.SameLayerAndGroup = 3, e.All = 4, t.Animation = e
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (e) {
        function i() {
            var t = e.call(this) || this;
            return t._boneMask = [], t._animationNames = [], t._boneTimelines = [], t._slotTimelines = [], t._ffdTimelines = [], t.autoTween = !1, t
        }

        return __extends(i, e), i.toString = function () {
            return "[class dragonBones.AnimationState]"
        }, i.prototype._onClear = function () {
            for (var t = 0, e = this._boneTimelines.length; t < e; ++t) this._boneTimelines[t].returnToPool();
            for (var t = 0, e = this._slotTimelines.length; t < e; ++t) this._slotTimelines[t].returnToPool();
            for (var t = 0, e = this._ffdTimelines.length; t < e; ++t) this._ffdTimelines[t].returnToPool();
            this._timeline && this._timeline.returnToPool(), this._zOrderTimeline && this._zOrderTimeline.returnToPool(), this.displayControl = !0, this.additiveBlending = !1, this.actionEnabled = !1, this.playTimes = 1, this.timeScale = 1, this.weight = 1, this.autoFadeOutTime = -1, this.fadeTotalTime = 0, this._playheadState = 0, this._fadeState = -1, this._subFadeState = -1, this._layer = 0, this._position = 0, this._duration = 0, this._fadeTime = 0, this._time = 0, this._fadeProgress = 0, this._weightResult = 0, this._name = null, this._group = null, this._boneMask.length = 0, this._animationNames.length = 0, this._boneTimelines.length = 0, this._slotTimelines.length = 0, this._ffdTimelines.length = 0, this._animationData = null, this._armature = null, this._timeline = null, this._zOrderTimeline = null
        }, i.prototype._advanceFadeTime = function (e) {
            var i = this._fadeState > 0;
            if (this._subFadeState < 0) {
                this._subFadeState = 0;
                var a = i ? t.EventObject.FADE_OUT : t.EventObject.FADE_IN;
                if (this._armature.eventDispatcher.hasEvent(a)) {
                    var n = t.BaseObject.borrowObject(t.EventObject);
                    n.animationState = this, this._armature._bufferEvent(n, a)
                }
            }
            if (e < 0 && (e = -e), this._fadeTime += e, this._fadeTime >= this.fadeTotalTime ? (this._subFadeState = 1, this._fadeProgress = i ? 0 : 1) : this._fadeTime > 0 ? this._fadeProgress = i ? 1 - this._fadeTime / this.fadeTotalTime : this._fadeTime / this.fadeTotalTime : this._fadeProgress = i ? 1 : 0, this._subFadeState > 0) {
                i || (this._playheadState |= 1, this._fadeState = 0);
                var a = i ? t.EventObject.FADE_OUT_COMPLETE : t.EventObject.FADE_IN_COMPLETE;
                if (this._armature.eventDispatcher.hasEvent(a)) {
                    var n = t.BaseObject.borrowObject(t.EventObject);
                    n.animationState = this, this._armature._bufferEvent(n, a)
                }
            }
        }, i.prototype._init = function (e, i, a) {
            if (this._armature = e, this._animationData = i, this._name = a.name ? a.name : a.animationName, this.actionEnabled = a.actionEnabled, this.additiveBlending = a.additiveBlending, this.displayControl = a.displayControl, this.playTimes = a.playTimes, this.timeScale = a.timeScale, this.fadeTotalTime = a.fadeInTime, this.autoFadeOutTime = a.autoFadeOutTime, this.weight = a.weight, a.pauseFadeIn ? this._playheadState = 2 : this._playheadState = 3, this._fadeState = -1, this._subFadeState = -1, this._layer = a.layer, this._time = a.position, this._group = a.group, a.duration < 0 ? (this._position = 0, this._duration = this._animationData.duration) : (this._position = a.position, this._duration = a.duration), this.fadeTotalTime <= 0 && (this._fadeProgress = .999999), a.boneMask.length > 0) {
                this._boneMask.length = a.boneMask.length;
                for (var n = 0, r = this._boneMask.length; n < r; ++n) this._boneMask[n] = a.boneMask[n]
            }
            if (a.animationNames.length > 0) {
                this._animationNames.length = a.animationNames.length;
                for (var n = 0, r = this._animationNames.length; n < r; ++n) this._animationNames[n] = a.animationNames[n]
            }
            this._timeline = t.BaseObject.borrowObject(t.AnimationTimelineState), this._timeline._init(this._armature, this, this._animationData), this._animationData.zOrderTimeline && (this._zOrderTimeline = t.BaseObject.borrowObject(t.ZOrderTimelineState), this._zOrderTimeline._init(this._armature, this, this._animationData.zOrderTimeline)), this._updateTimelineStates()
        }, i.prototype._updateTimelineStates = function () {
            for (var e = {}, i = {}, a = {}, n = 0, r = this._boneTimelines.length; n < r; ++n) {
                var s = this._boneTimelines[n];
                e[s.bone.name] = s
            }
            for (var o = this._armature.getBones(), n = 0, r = o.length; n < r; ++n) {
                var l = o[n], h = l.name;
                if (this.containsBoneMask(h)) {
                    var _ = this._animationData.getBoneTimeline(h);
                    if (_) if (e[h]) delete e[h]; else {
                        var s = t.BaseObject.borrowObject(t.BoneTimelineState);
                        s.bone = l, s._init(this._armature, this, _), this._boneTimelines.push(s)
                    }
                }
            }
            for (var u in e) {
                var s = e[u];
                s.bone.invalidUpdate(), this._boneTimelines.splice(this._boneTimelines.indexOf(s), 1), s.returnToPool()
            }
            for (var n = 0, r = this._slotTimelines.length; n < r; ++n) {
                var c = this._slotTimelines[n];
                i[c.slot.name] = c
            }
            for (var n = 0, r = this._ffdTimelines.length; n < r; ++n) {
                var f = this._ffdTimelines[n], m = f._timelineData.display,
                    p = m.inheritAnimation ? m.mesh.name : m.name;
                a[p] = f
            }
            for (var d = this._armature.getSlots(), n = 0, r = d.length; n < r; ++n) {
                var g = d[n], y = g.name, v = g.parent.name, b = !1;
                if (this.containsBoneMask(v)) {
                    var T = this._animationData.getSlotTimeline(y);
                    if (T) if (i[y]) delete i[y]; else {
                        var c = t.BaseObject.borrowObject(t.SlotTimelineState);
                        c.slot = g, c._init(this._armature, this, T), this._slotTimelines.push(c)
                    }
                    var D = this._animationData.getFFDTimeline(this._armature._skinData.name, y);
                    if (D) for (var u in D) if (a[u]) delete a[u]; else {
                        var f = t.BaseObject.borrowObject(t.FFDTimelineState);
                        f.slot = g, f._init(this._armature, this, D[u]), this._ffdTimelines.push(f)
                    } else b = !0
                } else b = !0;
                if (b) {
                    for (var O = 0, x = g._ffdVertices.length; O < x; ++O) g._ffdVertices[O] = 0;
                    g._meshDirty = !0
                }
            }
            for (var u in i) {
                var c = i[u];
                this._slotTimelines.splice(this._slotTimelines.indexOf(c), 1), c.returnToPool()
            }
            for (var u in a) {
                var f = a[u];
                this._ffdTimelines.splice(this._ffdTimelines.indexOf(f), 1), f.returnToPool()
            }
        }, i.prototype._advanceTime = function (t, e) {
            if (0 === this._fadeState && 0 === this._subFadeState || this._advanceFadeTime(t), 1 !== this.timeScale && (t *= this.timeScale), 0 !== t && 3 === this._playheadState && (this._time += t), this._weightResult = this.weight * this._fadeProgress, 0 !== this._weightResult) {
                var i = 0 === this._fadeState && e > 0, a = !0, n = !0, r = this._time;
                if (this._timeline.update(r), i && (this._timeline._currentTime = Math.floor(this._timeline._currentTime * e) / e), this._zOrderTimeline && this._zOrderTimeline.update(r), i) {
                    var s = Math.floor(this._timeline._currentTime * e);
                    this._armature.animation._cacheFrameIndex === s ? (a = !1, n = !1) : (this._armature.animation._cacheFrameIndex = s, this._animationData.cachedFrames[s] ? n = !1 : this._animationData.cachedFrames[s] = !0)
                }
                if (a) {
                    if (n) for (var o = 0, l = this._boneTimelines.length; o < l; ++o) this._boneTimelines[o].update(r);
                    for (var o = 0, l = this._slotTimelines.length; o < l; ++o) this._slotTimelines[o].update(r);
                    for (var o = 0, l = this._ffdTimelines.length; o < l; ++o) this._ffdTimelines[o].update(r)
                }
            }
            0 === this._fadeState && (this._subFadeState > 0 && (this._subFadeState = 0), this._timeline._playState > 0 && (this.autoFadeOutTime >= 0 && this.fadeOut(this.autoFadeOutTime), this._animationNames.length > 0))
        }, i.prototype._isDisabled = function (t) {
            return !(this.displayControl && (!t.displayController || t.displayController === this._name || t.displayController === this._group))
        }, i.prototype.play = function () {
            this._playheadState = 3
        }, i.prototype.stop = function () {
            this._playheadState &= 1
        }, i.prototype.fadeOut = function (t, e) {
            if (void 0 === e && (e = !0), (t < 0 || t !== t) && (t = 0), e && (this._playheadState &= 2), this._fadeState > 0) {
                if (t > t - this._fadeTime) return
            } else {
                this._fadeState = 1, this._subFadeState = -1, (t <= 0 || this._fadeProgress <= 0) && (this._fadeProgress = 1e-6);
                for (var i = 0, a = this._boneTimelines.length; i < a; ++i) this._boneTimelines[i].fadeOut();
                for (var i = 0, a = this._slotTimelines.length; i < a; ++i) this._slotTimelines[i].fadeOut();
                for (var i = 0, a = this._ffdTimelines.length; i < a; ++i) this._ffdTimelines[i].fadeOut()
            }
            this.displayControl = !1, this.fadeTotalTime = this._fadeProgress > 1e-6 ? t / this._fadeProgress : 0, this._fadeTime = this.fadeTotalTime * (1 - this._fadeProgress)
        }, i.prototype.containsBoneMask = function (t) {
            return 0 === this._boneMask.length || this._boneMask.indexOf(t) >= 0
        }, i.prototype.addBoneMask = function (t, e) {
            void 0 === e && (e = !0);
            var i = this._armature.getBone(t);
            if (i) {
                if (this._boneMask.indexOf(t) < 0 && this._boneMask.push(t), e) for (var a = this._armature.getBones(), n = 0, r = a.length; n < r; ++n) {
                    var s = a[n];
                    this._boneMask.indexOf(s.name) < 0 && i.contains(s) && this._boneMask.push(s.name)
                }
                this._updateTimelineStates()
            }
        }, i.prototype.removeBoneMask = function (t, e) {
            void 0 === e && (e = !0);
            var i = this._boneMask.indexOf(t);
            if (i >= 0 && this._boneMask.splice(i, 1), e) {
                var a = this._armature.getBone(t);
                if (a) {
                    var n = this._armature.getBones();
                    if (this._boneMask.length > 0) for (var r = 0, s = n.length; r < s; ++r) {
                        var o = n[r], l = this._boneMask.indexOf(o.name);
                        l >= 0 && a.contains(o) && this._boneMask.splice(l, 1)
                    } else for (var r = 0, s = n.length; r < s; ++r) {
                        var o = n[r];
                        a.contains(o) || this._boneMask.push(o.name)
                    }
                }
            }
            this._updateTimelineStates()
        }, i.prototype.removeAllBoneMask = function () {
            this._boneMask.length = 0, this._updateTimelineStates()
        }, Object.defineProperty(i.prototype, "layer", {
            get: function () {
                return this._layer
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "group", {
            get: function () {
                return this._group
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "name", {
            get: function () {
                return this._name
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "animationData", {
            get: function () {
                return this._animationData
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "isCompleted", {
            get: function () {
                return this._timeline._playState > 0
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "isPlaying", {
            get: function () {
                return 2 & this._playheadState && this._timeline._playState <= 0
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "currentPlayTimes", {
            get: function () {
                return this._timeline._currentPlayTimes
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "totalTime", {
            get: function () {
                return this._duration
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "currentTime", {
            get: function () {
                return this._timeline._currentTime
            }, set: function (t) {
                (t < 0 || t !== t) && (t = 0);
                var e = this._timeline._currentPlayTimes - (this._timeline._playState > 0 ? 1 : 0);
                if (t = t % this._duration + e * this._duration, this._time !== t) {
                    this._time = t, this._timeline.setCurrentTime(this._time), this._zOrderTimeline && (this._zOrderTimeline._playState = -1);
                    for (var i = 0, a = this._boneTimelines.length; i < a; ++i) this._boneTimelines[i]._playState = -1;
                    for (var i = 0, a = this._slotTimelines.length; i < a; ++i) this._slotTimelines[i]._playState = -1;
                    for (var i = 0, a = this._ffdTimelines.length; i < a; ++i) this._ffdTimelines[i]._playState = -1
                }
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "clip", {
            get: function () {
                return this._animationData
            }, enumerable: !0, configurable: !0
        }), i
    }(t.BaseObject);
    t.AnimationState = e
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (t) {
        function e() {
            return t.call(this) || this
        }

        return __extends(e, t), e.prototype._onClear = function () {
            this._playState = -1, this._currentPlayTimes = 0, this._currentTime = -1, this._timelineData = null, this._frameRate = 0, this._keyFrameCount = 0, this._frameCount = 0, this._position = 0, this._duration = 0, this._animationDutation = 0, this._timeScale = 1, this._timeOffset = 0, this._currentFrame = null, this._armature = null, this._animationState = null, this._mainTimeline = null
        }, e.prototype._onUpdateFrame = function () {
        }, e.prototype._onArriveAtFrame = function () {
        }, e.prototype._setCurrentTime = function (t) {
            var e = this._playState, i = 0, a = 0;
            if (this._mainTimeline && 1 === this._keyFrameCount) this._playState = this._mainTimeline._playState >= 0 ? 1 : -1, i = 1, a = this._mainTimeline._currentTime; else if (this._mainTimeline && 1 === this._timeScale && 0 === this._timeOffset) this._playState = this._mainTimeline._playState, i = this._mainTimeline._currentPlayTimes, a = this._mainTimeline._currentTime; else {
                var n = this._animationState.playTimes, r = n * this._duration;
                t *= this._timeScale, 0 !== this._timeOffset && (t += this._timeOffset * this._animationDutation), n > 0 && (t >= r || t <= -r) ? (this._playState <= 0 && 3 === this._animationState._playheadState && (this._playState = 1), i = n, a = t < 0 ? 0 : this._duration) : (0 !== this._playState && 3 === this._animationState._playheadState && (this._playState = 0), t < 0 ? (t = -t, i = Math.floor(t / this._duration), a = this._duration - t % this._duration) : (i = Math.floor(t / this._duration), a = t % this._duration))
            }
            return a += this._position, (this._currentPlayTimes !== i || this._currentTime !== a) && ((e < 0 && this._playState !== e || this._playState <= 0 && this._currentPlayTimes !== i) && (this._currentFrame = null), this._currentPlayTimes = i, this._currentTime = a, !0)
        }, e.prototype._init = function (t, e, i) {
            this._armature = t, this._animationState = e, this._timelineData = i, this._mainTimeline = this._animationState._timeline, this === this._mainTimeline && (this._mainTimeline = null), this._frameRate = this._armature.armatureData.frameRate, this._keyFrameCount = this._timelineData.frames.length, this._frameCount = this._animationState.animationData.frameCount, this._position = this._animationState._position, this._duration = this._animationState._duration, this._animationDutation = this._animationState.animationData.duration, this._timeScale = this._mainTimeline ? 1 / this._timelineData.scale : 1, this._timeOffset = this._mainTimeline ? this._timelineData.offset : 0
        }, e.prototype.fadeOut = function () {
        }, e.prototype.update = function (t) {
            if (this._playState <= 0 && this._setCurrentTime(t)) {
                var e = this._keyFrameCount > 1 ? Math.floor(this._currentTime * this._frameRate) : 0,
                    i = this._timelineData.frames[e];
                this._currentFrame !== i && (this._currentFrame = i, this._onArriveAtFrame()), this._onUpdateFrame()
            }
        }, e
    }(t.BaseObject);
    t.TimelineState = e;
    var i = function (e) {
        function i() {
            return e.call(this) || this
        }

        return __extends(i, e), i._getEasingValue = function (t, e) {
            if (t <= 0) return 0;
            if (t >= 1) return 1;
            var i = 1;
            if (e > 2) return t;
            if (e > 1) i = .5 * (1 - Math.cos(t * Math.PI)), e -= 1; else if (e > 0) i = 1 - Math.pow(1 - t, 2); else if (e >= -1) e *= -1, i = Math.pow(t, 2); else {
                if (!(e >= -2)) return t;
                e *= -1, i = Math.acos(1 - 2 * t) / Math.PI, e -= 1
            }
            return (i - t) * e + t
        }, i._getEasingCurveValue = function (t, e) {
            if (t <= 0) return 0;
            if (t >= 1) return 1;
            var i = e.length + 1, a = Math.floor(t * i), n = 0 === a ? 0 : e[a - 1], r = a === i - 1 ? 1 : e[a];
            return n + (r - n) * (t - a / i)
        }, i.prototype._onClear = function () {
            e.prototype._onClear.call(this), this._tweenProgress = 0, this._tweenEasing = t.DragonBones.NO_TWEEN, this._curve = null
        }, i.prototype._onArriveAtFrame = function () {
            this._keyFrameCount > 1 && (this._currentFrame.next !== this._timelineData.frames[0] || 0 === this._animationState.playTimes || this._animationState.currentPlayTimes < this._animationState.playTimes - 1) ? (this._tweenEasing = this._currentFrame.tweenEasing, this._curve = this._currentFrame.curve) : (this._tweenEasing = t.DragonBones.NO_TWEEN, this._curve = null)
        }, i.prototype._onUpdateFrame = function () {
            this._tweenEasing !== t.DragonBones.NO_TWEEN ? (this._tweenProgress = (this._currentTime - this._currentFrame.position + this._position) / this._currentFrame.duration, 0 !== this._tweenEasing && (this._tweenProgress = i._getEasingValue(this._tweenProgress, this._tweenEasing))) : this._curve ? (this._tweenProgress = (this._currentTime - this._currentFrame.position + this._position) / this._currentFrame.duration, this._tweenProgress = i._getEasingCurveValue(this._tweenProgress, this._curve)) : this._tweenProgress = 0
        }, i
    }(e);
    t.TweenTimelineState = i
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (e) {
        function i() {
            return e.call(this) || this
        }

        return __extends(i, e), i.toString = function () {
            return "[class dragonBones.AnimationTimelineState]"
        }, i.prototype._onCrossFrame = function (e) {
            if (this._animationState.actionEnabled) for (var i = e.actions, a = 0, n = i.length; a < n; ++a) this._armature._bufferAction(i[a]);
            for (var r = this._armature.eventDispatcher, s = e.events, a = 0, n = s.length; a < n; ++a) {
                var o = s[a], l = null;
                switch (o.type) {
                    case 10:
                        l = t.EventObject.FRAME_EVENT;
                        break;
                    case 11:
                        l = t.EventObject.SOUND_EVENT
                }
                if (r.hasEvent(l) || 11 === o.type) {
                    var h = t.BaseObject.borrowObject(t.EventObject);
                    h.name = o.name, h.frame = e, h.data = o.data, h.animationState = this._animationState, o.bone && (h.bone = this._armature.getBone(o.bone.name)), o.slot && (h.slot = this._armature.getSlot(o.slot.name)), this._armature._bufferEvent(h, l)
                }
            }
        }, i.prototype.update = function (e) {
            var i = this._playState, a = this._currentPlayTimes, n = this._currentTime;
            if (this._playState <= 0 && this._setCurrentTime(e)) {
                var r = this._armature.eventDispatcher;
                if (i < 0 && this._playState !== i && (this._animationState.displayControl && this._armature._sortZOrder(null), r.hasEvent(t.EventObject.START))) {
                    var s = t.BaseObject.borrowObject(t.EventObject);
                    s.animationState = this._animationState, this._armature._bufferEvent(s, t.EventObject.START)
                }
                if (n < 0) return;
                if (this._keyFrameCount > 1) {
                    var o = Math.floor(this._currentTime * this._frameRate), l = this._timelineData.frames[o];
                    if (this._currentFrame !== l) {
                        var h = this._currentPlayTimes === a && n > this._currentTime, _ = this._currentFrame;
                        if (this._currentFrame = l, !_) {
                            var u = Math.floor(n * this._frameRate);
                            _ = this._timelineData.frames[u], h || n <= _.position && (_ = _.prev)
                        }
                        if (h) for (; _ !== l;) this._onCrossFrame(_), _ = _.prev; else for (; _ !== l;) _ = _.next, this._onCrossFrame(_)
                    }
                } else this._keyFrameCount > 0 && !this._currentFrame && (this._currentFrame = this._timelineData.frames[0], this._onCrossFrame(this._currentFrame));
                if (this._currentPlayTimes !== a) {
                    if (r.hasEvent(t.EventObject.LOOP_COMPLETE)) {
                        var s = t.BaseObject.borrowObject(t.EventObject);
                        s.animationState = this._animationState, this._armature._bufferEvent(s, t.EventObject.LOOP_COMPLETE)
                    }
                    if (this._playState > 0 && r.hasEvent(t.EventObject.COMPLETE)) {
                        var s = t.BaseObject.borrowObject(t.EventObject);
                        s.animationState = this._animationState, this._armature._bufferEvent(s, t.EventObject.COMPLETE)
                    }
                }
            }
        }, i.prototype.setCurrentTime = function (t) {
            this._setCurrentTime(t), this._currentFrame = null
        }, i
    }(t.TimelineState);
    t.AnimationTimelineState = e;
    var i = function (t) {
        function e() {
            return t.call(this) || this
        }

        return __extends(e, t), e.toString = function () {
            return "[class dragonBones.ZOrderTimelineState]"
        }, e.prototype._onArriveAtFrame = function () {
            t.prototype._onArriveAtFrame.call(this), this._armature._sortZOrder(this._currentFrame.zOrder)
        }, e
    }(t.TimelineState);
    t.ZOrderTimelineState = i;
    var a = function (e) {
        function i() {
            var i = e.call(this) || this;
            return i._transform = new t.Transform, i._durationTransform = new t.Transform, i
        }

        return __extends(i, e), i.toString = function () {
            return "[class dragonBones.BoneTimelineState]"
        }, i.prototype._onClear = function () {
            e.prototype._onClear.call(this), this.bone = null, this._transformDirty = !1, this._tweenTransform = 0, this._tweenRotate = 0, this._tweenScale = 0, this._transform.identity(), this._durationTransform.identity(), this._boneTransform = null, this._originalTransform = null
        }, i.prototype._onArriveAtFrame = function () {
            if (e.prototype._onArriveAtFrame.call(this), this._tweenTransform = 1, this._tweenRotate = 1, this._tweenScale = 1, this._keyFrameCount > 1 && (this._tweenEasing !== t.DragonBones.NO_TWEEN || this._curve)) {
                var i = this._currentFrame.transform, a = this._currentFrame.next, n = a.transform;
                this._durationTransform.x = n.x - i.x, this._durationTransform.y = n.y - i.y, 0 === this._durationTransform.x && 0 === this._durationTransform.y || (this._tweenTransform = 2);
                var r = this._currentFrame.tweenRotate;
                r !== t.DragonBones.NO_TWEEN ? (r ? ((r > 0 ? n.skewY >= i.skewY : n.skewY <= i.skewY) && (r = r > 0 ? r - 1 : r + 1), this._durationTransform.skewX = n.skewX - i.skewX + t.DragonBones.PI_D * r, this._durationTransform.skewY = n.skewY - i.skewY + t.DragonBones.PI_D * r) : (this._durationTransform.skewX = t.Transform.normalizeRadian(n.skewX - i.skewX), this._durationTransform.skewY = t.Transform.normalizeRadian(n.skewY - i.skewY)), 0 === this._durationTransform.skewX && 0 === this._durationTransform.skewY || (this._tweenRotate = 2)) : (this._durationTransform.skewX = 0, this._durationTransform.skewY = 0), this._currentFrame.tweenScale ? (this._durationTransform.scaleX = n.scaleX - i.scaleX, this._durationTransform.scaleY = n.scaleY - i.scaleY, 0 === this._durationTransform.scaleX && 0 === this._durationTransform.scaleY || (this._tweenScale = 2)) : (this._durationTransform.scaleX = 0, this._durationTransform.scaleY = 0)
            } else this._durationTransform.x = 0, this._durationTransform.y = 0, this._durationTransform.skewX = 0, this._durationTransform.skewY = 0, this._durationTransform.scaleX = 0, this._durationTransform.scaleY = 0
        }, i.prototype._onUpdateFrame = function () {
            e.prototype._onUpdateFrame.call(this);
            var t = 0, i = this._currentFrame.transform;
            0 !== this._tweenTransform && (1 === this._tweenTransform ? (this._tweenTransform = 0, t = 0) : t = this._tweenProgress, this._animationState.additiveBlending ? (this._transform.x = i.x + this._durationTransform.x * t, this._transform.y = i.y + this._durationTransform.y * t) : (this._transform.x = this._originalTransform.x + i.x + this._durationTransform.x * t, this._transform.y = this._originalTransform.y + i.y + this._durationTransform.y * t), this._transformDirty = !0), 0 !== this._tweenRotate && (1 === this._tweenRotate ? (this._tweenRotate = 0, t = 0) : t = this._tweenProgress, this._animationState.additiveBlending ? (this._transform.skewX = i.skewX + this._durationTransform.skewX * t, this._transform.skewY = i.skewY + this._durationTransform.skewY * t) : (this._transform.skewX = this._originalTransform.skewX + i.skewX + this._durationTransform.skewX * t, this._transform.skewY = this._originalTransform.skewY + i.skewY + this._durationTransform.skewY * t), this._transformDirty = !0), 0 !== this._tweenScale && (1 === this._tweenScale ? (this._tweenScale = 0, t = 0) : t = this._tweenProgress, this._animationState.additiveBlending ? (this._transform.scaleX = i.scaleX + this._durationTransform.scaleX * t, this._transform.scaleY = i.scaleY + this._durationTransform.scaleY * t) : (this._transform.scaleX = this._originalTransform.scaleX * (i.scaleX + this._durationTransform.scaleX * t), this._transform.scaleY = this._originalTransform.scaleY * (i.scaleY + this._durationTransform.scaleY * t)), this._transformDirty = !0)
        }, i.prototype._init = function (t, i, a) {
            e.prototype._init.call(this, t, i, a), this._originalTransform = this._timelineData.originalTransform, this._boneTransform = this.bone._animationPose
        }, i.prototype.fadeOut = function () {
            this._transform.skewX = t.Transform.normalizeRadian(this._transform.skewX), this._transform.skewY = t.Transform.normalizeRadian(this._transform.skewY)
        }, i.prototype.update = function (t) {
            var i = this._animationState._layer, a = this._animationState._weightResult;
            this.bone._updateState <= 0 ? (e.prototype.update.call(this, t), this.bone._blendLayer = i, this.bone._blendLeftWeight = 1, this.bone._blendTotalWeight = a, this._boneTransform.x = this._transform.x * a, this._boneTransform.y = this._transform.y * a, this._boneTransform.skewX = this._transform.skewX * a, this._boneTransform.skewY = this._transform.skewY * a, this._boneTransform.scaleX = (this._transform.scaleX - 1) * a + 1, this._boneTransform.scaleY = (this._transform.scaleY - 1) * a + 1, this.bone._updateState = 1) : this.bone._blendLeftWeight > 0 && (this.bone._blendLayer !== i && (this.bone._blendTotalWeight >= this.bone._blendLeftWeight ? this.bone._blendLeftWeight = 0 : (this.bone._blendLayer = i, this.bone._blendLeftWeight -= this.bone._blendTotalWeight, this.bone._blendTotalWeight = 0)), a *= this.bone._blendLeftWeight, a >= 0 && (e.prototype.update.call(this, t), this.bone._blendTotalWeight += a, this._boneTransform.x += this._transform.x * a, this._boneTransform.y += this._transform.y * a, this._boneTransform.skewX += this._transform.skewX * a, this._boneTransform.skewY += this._transform.skewY * a, this._boneTransform.scaleX += (this._transform.scaleX - 1) * a, this._boneTransform.scaleY += (this._transform.scaleY - 1) * a, this.bone._updateState++)), this.bone._updateState > 0 && (this._transformDirty || 0 !== this._animationState._fadeState || 0 !== this._animationState._subFadeState) && (this._transformDirty = !1, this.bone.invalidUpdate())
        }, i
    }(t.TweenTimelineState);
    t.BoneTimelineState = a;
    var n = function (e) {
        function i() {
            var i = e.call(this) || this;
            return i._color = new t.ColorTransform, i._durationColor = new t.ColorTransform, i
        }

        return __extends(i, e), i.toString = function () {
            return "[class dragonBones.SlotTimelineState]"
        }, i.prototype._onClear = function () {
            e.prototype._onClear.call(this), this.slot = null, this._colorDirty = !1, this._tweenColor = 0, this._color.identity(), this._durationColor.identity(), this._slotColor = null
        }, i.prototype._onArriveAtFrame = function () {
            if (e.prototype._onArriveAtFrame.call(this), this._animationState._isDisabled(this.slot)) return this._tweenEasing = t.DragonBones.NO_TWEEN, this._curve = null, void(this._tweenColor = 0);
            var i = this._currentFrame.displayIndex;
            if (this._playState >= 0 && this.slot.displayIndex !== i && this.slot._setDisplayIndex(i), i >= 0) {
                this._tweenColor = 0;
                var a = this._currentFrame.color;
                if (this._tweenEasing !== t.DragonBones.NO_TWEEN || this._curve) {
                    var n = this._currentFrame.next, r = n.color;
                    a !== r && (this._durationColor.alphaMultiplier = r.alphaMultiplier - a.alphaMultiplier, this._durationColor.redMultiplier = r.redMultiplier - a.redMultiplier, this._durationColor.greenMultiplier = r.greenMultiplier - a.greenMultiplier, this._durationColor.blueMultiplier = r.blueMultiplier - a.blueMultiplier, this._durationColor.alphaOffset = r.alphaOffset - a.alphaOffset, this._durationColor.redOffset = r.redOffset - a.redOffset, this._durationColor.greenOffset = r.greenOffset - a.greenOffset, this._durationColor.blueOffset = r.blueOffset - a.blueOffset, 0 === this._durationColor.alphaMultiplier && 0 === this._durationColor.redMultiplier && 0 === this._durationColor.greenMultiplier && 0 === this._durationColor.blueMultiplier && 0 === this._durationColor.alphaOffset && 0 === this._durationColor.redOffset && 0 === this._durationColor.greenOffset && 0 === this._durationColor.blueOffset || (this._tweenColor = 2))
                }
                0 === this._tweenColor && (this._slotColor.alphaMultiplier === a.alphaMultiplier && this._slotColor.redMultiplier === a.redMultiplier && this._slotColor.greenMultiplier === a.greenMultiplier && this._slotColor.blueMultiplier === a.blueMultiplier && this._slotColor.alphaOffset === a.alphaOffset && this._slotColor.redOffset === a.redOffset && this._slotColor.greenOffset === a.greenOffset && this._slotColor.blueOffset === a.blueOffset || (this._tweenColor = 1))
            } else this._tweenEasing = t.DragonBones.NO_TWEEN, this._curve = null, this._tweenColor = 0
        }, i.prototype._onUpdateFrame = function () {
            e.prototype._onUpdateFrame.call(this);
            var t = 0;
            if (0 !== this._tweenColor && this.slot.parent._blendLayer >= this._animationState._layer) {
                1 === this._tweenColor ? (this._tweenColor = 0, t = 0) : t = this._tweenProgress;
                var i = this._currentFrame.color;
                this._color.alphaMultiplier = i.alphaMultiplier + this._durationColor.alphaMultiplier * t, this._color.redMultiplier = i.redMultiplier + this._durationColor.redMultiplier * t, this._color.greenMultiplier = i.greenMultiplier + this._durationColor.greenMultiplier * t, this._color.blueMultiplier = i.blueMultiplier + this._durationColor.blueMultiplier * t, this._color.alphaOffset = i.alphaOffset + this._durationColor.alphaOffset * t, this._color.redOffset = i.redOffset + this._durationColor.redOffset * t, this._color.greenOffset = i.greenOffset + this._durationColor.greenOffset * t, this._color.blueOffset = i.blueOffset + this._durationColor.blueOffset * t, this._colorDirty = !0
            }
        }, i.prototype._init = function (t, i, a) {
            e.prototype._init.call(this, t, i, a), this._slotColor = this.slot._colorTransform
        }, i.prototype.fadeOut = function () {
            this._tweenColor = 0
        }, i.prototype.update = function (t) {
            if (e.prototype.update.call(this, t), 0 !== this._tweenColor || this._colorDirty) if (0 !== this._animationState._fadeState || 0 !== this._animationState._subFadeState) {
                var i = Math.pow(this._animationState._fadeProgress, 4);
                this._slotColor.alphaMultiplier += (this._color.alphaMultiplier - this._slotColor.alphaMultiplier) * i, this._slotColor.redMultiplier += (this._color.redMultiplier - this._slotColor.redMultiplier) * i, this._slotColor.greenMultiplier += (this._color.greenMultiplier - this._slotColor.greenMultiplier) * i, this._slotColor.blueMultiplier += (this._color.blueMultiplier - this._slotColor.blueMultiplier) * i, this._slotColor.alphaOffset += (this._color.alphaOffset - this._slotColor.alphaOffset) * i, this._slotColor.redOffset += (this._color.redOffset - this._slotColor.redOffset) * i, this._slotColor.greenOffset += (this._color.greenOffset - this._slotColor.greenOffset) * i, this._slotColor.blueOffset += (this._color.blueOffset - this._slotColor.blueOffset) * i,
                    this.slot._colorDirty = !0
            } else this._colorDirty && (this._colorDirty = !1, this._slotColor.alphaMultiplier = this._color.alphaMultiplier, this._slotColor.redMultiplier = this._color.redMultiplier, this._slotColor.greenMultiplier = this._color.greenMultiplier, this._slotColor.blueMultiplier = this._color.blueMultiplier, this._slotColor.alphaOffset = this._color.alphaOffset, this._slotColor.redOffset = this._color.redOffset, this._slotColor.greenOffset = this._color.greenOffset, this._slotColor.blueOffset = this._color.blueOffset, this.slot._colorDirty = !0)
        }, i
    }(t.TweenTimelineState);
    t.SlotTimelineState = n;
    var r = function (e) {
        function i() {
            var t = e.call(this) || this;
            return t._ffdVertices = [], t._durationFFDVertices = [], t
        }

        return __extends(i, e), i.toString = function () {
            return "[class dragonBones.FFDTimelineState]"
        }, i.prototype._onClear = function () {
            e.prototype._onClear.call(this), this.slot = null, this._ffdDirty = !1, this._tweenFFD = 0, this._ffdVertices.length = 0, this._durationFFDVertices.length = 0, this._slotFFDVertices = null
        }, i.prototype._onArriveAtFrame = function () {
            if (e.prototype._onArriveAtFrame.call(this), this.slot.displayIndex >= 0 && this._animationState._isDisabled(this.slot)) return this._tweenEasing = t.DragonBones.NO_TWEEN, this._curve = null, void(this._tweenFFD = 0);
            if (this._tweenFFD = 0, this._tweenEasing !== t.DragonBones.NO_TWEEN || this._curve) for (var i = this._currentFrame.tweens, a = this._currentFrame.next.tweens, n = 0, r = i.length; n < r; ++n) {
                var s = a[n] - i[n];
                this._durationFFDVertices[n] = s, 0 !== s && (this._tweenFFD = 2)
            }
            if (0 === this._tweenFFD) {
                this._tweenFFD = 1;
                for (var n = 0, r = this._durationFFDVertices.length; n < r; ++n) this._durationFFDVertices[n] = 0
            }
        }, i.prototype._onUpdateFrame = function () {
            e.prototype._onUpdateFrame.call(this);
            var t = 0;
            if (0 !== this._tweenFFD && this.slot.parent._blendLayer >= this._animationState._layer) {
                1 === this._tweenFFD ? (this._tweenFFD = 0, t = 0) : t = this._tweenProgress;
                for (var i = this._currentFrame.tweens, a = 0, n = i.length; a < n; ++a) this._ffdVertices[a] = i[a] + this._durationFFDVertices[a] * t;
                this._ffdDirty = !0
            }
        }, i.prototype._init = function (t, i, a) {
            e.prototype._init.call(this, t, i, a), this._slotFFDVertices = this.slot._ffdVertices, this._ffdVertices.length = this._timelineData.frames[0].tweens.length, this._durationFFDVertices.length = this._ffdVertices.length;
            for (var n = 0, r = this._ffdVertices.length; n < r; ++n) this._ffdVertices[n] = 0;
            for (var n = 0, r = this._durationFFDVertices.length; n < r; ++n) this._durationFFDVertices[n] = 0
        }, i.prototype.fadeOut = function () {
            this._tweenFFD = 0
        }, i.prototype.update = function (t) {
            if (e.prototype.update.call(this, t), this.slot._meshData === this._timelineData.display.mesh && (0 !== this._tweenFFD || this._ffdDirty)) if (0 !== this._animationState._fadeState || 0 !== this._animationState._subFadeState) {
                for (var i = Math.pow(this._animationState._fadeProgress, 4), a = 0, n = this._ffdVertices.length; a < n; ++a) this._slotFFDVertices[a] += (this._ffdVertices[a] - this._slotFFDVertices[a]) * i;
                this.slot._meshDirty = !0
            } else if (this._ffdDirty) {
                this._ffdDirty = !1;
                for (var a = 0, n = this._ffdVertices.length; a < n; ++a) this._slotFFDVertices[a] = this._ffdVertices[a];
                this.slot._meshDirty = !0
            }
        }, i
    }(t.TweenTimelineState);
    t.FFDTimelineState = r
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function e() {
            this.time = (new Date).getTime() / t.DragonBones.SECOND_TO_MILLISECOND, this.timeScale = 1, this._animatebles = [], this._clock = null
        }

        return Object.defineProperty(e, "clock", {
            get: function () {
                return e._clock || (e._clock = new e), e._clock
            }, enumerable: !0, configurable: !0
        }), e.prototype.advanceTime = function (e) {
            if (e !== e && (e = 0), e < 0 && (e = (new Date).getTime() / t.DragonBones.SECOND_TO_MILLISECOND - this.time), 1 !== this.timeScale && (e *= this.timeScale), e < 0 ? this.time -= e : this.time += e, e) {
                for (var i = 0, a = 0, n = this._animatebles.length; i < n; ++i) {
                    var r = this._animatebles[i];
                    r ? (a > 0 && (this._animatebles[i - a] = r, this._animatebles[i] = null), r.advanceTime(e)) : a++
                }
                if (a > 0) {
                    for (n = this._animatebles.length; i < n; ++i) {
                        var r = this._animatebles[i];
                        r ? this._animatebles[i - a] = r : a++
                    }
                    this._animatebles.length -= a
                }
            }
        }, e.prototype.contains = function (t) {
            return this._animatebles.indexOf(t) >= 0
        }, e.prototype.add = function (e) {
            e && this._animatebles.indexOf(e) < 0 && (this._animatebles.push(e), e.clock = this, t.DragonBones.debug && e instanceof t.Armature && t.DragonBones.addArmature(e))
        }, e.prototype.remove = function (e) {
            var i = this._animatebles.indexOf(e);
            i >= 0 && (this._animatebles[i] = null, e.clock = null, t.DragonBones.debug && e instanceof t.Armature && t.DragonBones.removeArmature(e))
        }, e.prototype.clear = function () {
            for (var t = 0, e = this._animatebles.length; t < e; ++t) {
                var i = this._animatebles[t];
                this._animatebles[t] = null, null != i && (i.clock = null)
            }
        }, Object.defineProperty(e.prototype, "clock", {
            get: function () {
                return this._clock
            }, set: function (t) {
                if (this._clock !== t) {
                    var e = this._clock;
                    this._clock = t, e && e.remove(this), this._clock && this._clock.add(this)
                }
            }, enumerable: !0, configurable: !0
        }), e
    }();
    e._clock = null, t.WorldClock = e
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (t) {
        function e() {
            return t.call(this) || this
        }

        return __extends(e, t), e.toString = function () {
            return "[class dragonBones.EventObject]"
        }, e.prototype._onClear = function () {
            this.type = null, this.name = null, this.frame = null, this.data = null, this.armature = null, this.bone = null, this.slot = null, this.animationState = null
        }, e
    }(t.BaseObject);
    e.START = "start", e.LOOP_COMPLETE = "loopComplete", e.COMPLETE = "complete", e.FADE_IN = "fadeIn", e.FADE_IN_COMPLETE = "fadeInComplete", e.FADE_OUT = "fadeOut", e.FADE_OUT_COMPLETE = "fadeOutComplete", e.FRAME_EVENT = "frameEvent", e.SOUND_EVENT = "soundEvent", t.EventObject = e
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function e(i) {
            void 0 === i && (i = null), this.autoSearch = !1, this._dragonBonesDataMap = {}, this._textureAtlasDataMap = {}, this._dataParser = null, this._dataParser = i, this._dataParser || (e._defaultParser || (e._defaultParser = new t.ObjectDataParser), this._dataParser = e._defaultParser)
        }

        return e.prototype._getTextureData = function (t, e) {
            var i = this._textureAtlasDataMap[t];
            if (i) for (var a = 0, n = i.length; a < n; ++a) {
                var r = i[a].getTexture(e);
                if (r) return r
            }
            if (this.autoSearch) for (var s in this._textureAtlasDataMap) {
                i = this._textureAtlasDataMap[s];
                for (var a = 0, n = i.length; a < n; ++a) {
                    var o = i[a];
                    if (o.autoSearch) {
                        var r = o.getTexture(e);
                        if (r) return r
                    }
                }
            }
            return null
        }, e.prototype._fillBuildArmaturePackage = function (t, e, i, a, n) {
            var r = null, s = null;
            if (e && (r = this._dragonBonesDataMap[e], r && (s = r.getArmature(i))), !s && (!e || this.autoSearch)) for (var o in this._dragonBonesDataMap) if (r = this._dragonBonesDataMap[o], (!e || r.autoSearch) && (s = r.getArmature(i))) {
                e = o;
                break
            }
            return !!s && (t.dataName = e, t.textureAtlasName = n, t.data = r, t.armature = s, t.skin = s.getSkin(a), t.skin || (t.skin = s.defaultSkin), !0)
        }, e.prototype._buildBones = function (e, i) {
            for (var a = e.armature.sortedBones, n = 0, r = a.length; n < r; ++n) {
                var s = a[n], o = t.BaseObject.borrowObject(t.Bone);
                o._init(s), s.parent ? i.addBone(o, s.parent.name) : i.addBone(o), s.ik && (o.ikBendPositive = s.bendPositive, o.ikWeight = s.weight, o._setIK(i.getBone(s.ik.name), s.chain, s.chainIndex))
            }
        }, e.prototype._buildSlots = function (t, e) {
            var i = t.skin, a = t.armature.defaultSkin, n = {};
            for (var r in a.slots) {
                var s = a.slots[r];
                n[s.slot.name] = s
            }
            if (i !== a) for (var r in i.slots) {
                var s = i.slots[r];
                n[s.slot.name] = s
            }
            for (var o = t.armature.sortedSlots, l = 0, h = o.length; l < h; ++l) {
                var _ = o[l], s = n[_.name];
                if (s) {
                    var u = this._generateSlot(t, s, e);
                    u && (e.addSlot(u, _.parent.name), u._setDisplayIndex(_.displayIndex))
                }
            }
        }, e.prototype._replaceSlotDisplay = function (t, e, i, a) {
            if (a < 0 && (a = i.displayIndex), a >= 0) {
                var n = i.displayList;
                if (n.length <= a && (n.length = a + 1), i._replacedDisplayDatas.length <= a && (i._replacedDisplayDatas.length = a + 1), i._replacedDisplayDatas[a] = e, 1 === e.type) {
                    var r = this.buildArmature(e.path, t.dataName, null, t.textureAtlasName);
                    n[a] = r
                } else {
                    e.texture && !t.textureAtlasName || (e.texture = this._getTextureData(t.textureAtlasName ? t.textureAtlasName : t.dataName, e.path));
                    var s = i.skinSlotData.displays;
                    e.mesh || a < s.length && s[a].mesh ? n[a] = i.meshDisplay : n[a] = i.rawDisplay
                }
                i.displayList = n
            }
        }, e.prototype.parseDragonBonesData = function (t, e, i) {
            void 0 === e && (e = null), void 0 === i && (i = 1);
            var a = this._dataParser.parseDragonBonesData(t, i);
            return this.addDragonBonesData(a, e), a
        }, e.prototype.parseTextureAtlasData = function (t, e, i, a) {
            void 0 === i && (i = null), void 0 === a && (a = 0);
            var n = this._generateTextureAtlasData(null, null);
            return this._dataParser.parseTextureAtlasData(t, n, a), this._generateTextureAtlasData(n, e), this.addTextureAtlasData(n, i), n
        }, e.prototype.getDragonBonesData = function (t) {
            return this._dragonBonesDataMap[t]
        }, e.prototype.addDragonBonesData = function (e, i) {
            if (void 0 === i && (i = null), !e) throw new Error(t.DragonBones.ARGUMENT_ERROR);
            i = i || e.name, i ? this._dragonBonesDataMap[i] ? console.warn("Same name data.", i) : this._dragonBonesDataMap[i] = e : console.warn("Unnamed data.")
        }, e.prototype.removeDragonBonesData = function (t, e) {
            void 0 === e && (e = !0);
            var i = this._dragonBonesDataMap[t];
            i && (e && i.returnToPool(), delete this._dragonBonesDataMap[t])
        }, e.prototype.getTextureAtlasData = function (t) {
            return this._textureAtlasDataMap[t]
        }, e.prototype.addTextureAtlasData = function (e, i) {
            if (void 0 === i && (i = null), !e) throw new Error(t.DragonBones.ARGUMENT_ERROR);
            if (i = i || e.name) {
                var a = this._textureAtlasDataMap[i] ? this._textureAtlasDataMap[i] : this._textureAtlasDataMap[i] = [];
                a.indexOf(e) < 0 && a.push(e)
            } else console.warn("Unnamed data.")
        }, e.prototype.removeTextureAtlasData = function (t, e) {
            void 0 === e && (e = !0);
            var i = this._textureAtlasDataMap[t];
            if (i) {
                if (e) for (var a = 0, n = i.length; a < n; ++a) i[a].returnToPool();
                delete this._textureAtlasDataMap[t]
            }
        }, e.prototype.clear = function (t) {
            void 0 === t && (t = !0);
            for (var e in this._dragonBonesDataMap) t && this._dragonBonesDataMap[e].returnToPool(), delete this._dragonBonesDataMap[e];
            for (var e in this._textureAtlasDataMap) {
                if (t) for (var i = this._textureAtlasDataMap[e], a = 0, n = i.length; a < n; ++a) i[a].returnToPool();
                delete this._textureAtlasDataMap[e]
            }
        }, e.prototype.buildArmature = function (t, e, i, a) {
            void 0 === e && (e = null), void 0 === i && (i = null), void 0 === a && (a = null);
            var n = {};
            if (this._fillBuildArmaturePackage(n, e, t, i, a)) {
                var r = this._generateArmature(n);
                return this._buildBones(n, r), this._buildSlots(n, r), r.invalidUpdate(null, !0), r.advanceTime(0), r
            }
            return console.warn("No armature data.", t, e ? e : ""), null
        }, e.prototype.copyAnimationsToArmature = function (e, i, a, n, r) {
            void 0 === a && (a = null), void 0 === n && (n = null), void 0 === r && (r = !0);
            var s = {};
            if (this._fillBuildArmaturePackage(s, n, i, a, null)) {
                var o = s.armature;
                if (r) e.animation.animations = o.animations; else {
                    var l = {};
                    for (var h in e.animation.animations) l[h] = e.animation.animations[h];
                    for (var h in o.animations) l[h] = o.animations[h];
                    e.animation.animations = l
                }
                if (s.skin) {
                    for (var _ = e.getSlots(), u = 0, c = _.length; u < c; ++u) for (var f = _[u], m = f.displayList, p = 0, d = m.length; p < d; ++p) {
                        var g = m[p];
                        if (g instanceof t.Armature) {
                            var y = s.skin.getSlot(f.name).displays;
                            if (p < y.length) {
                                var v = y[p];
                                1 === v.type && this.copyAnimationsToArmature(g, v.path, a, n, r)
                            }
                        }
                    }
                    return !0
                }
            }
            return !1
        }, e.prototype.replaceSlotDisplay = function (t, e, i, a, n, r) {
            void 0 === r && (r = -1);
            var s = {};
            if (this._fillBuildArmaturePackage(s, t, e, null, null)) {
                var o = s.skin.getSlot(i);
                if (o) for (var l = 0, h = o.displays.length; l < h; ++l) {
                    var _ = o.displays[l];
                    if (_.name === a) {
                        this._replaceSlotDisplay(s, _, n, r);
                        break
                    }
                }
            }
        }, e.prototype.replaceSlotDisplayList = function (t, e, i, a) {
            var n = {};
            if (this._fillBuildArmaturePackage(n, t, e, null, null)) {
                var r = n.skin.getSlot(i);
                if (r) for (var s = 0, o = r.displays.length; s < o; ++s) {
                    var l = r.displays[s];
                    this._replaceSlotDisplay(n, l, a, s)
                }
            }
        }, e.prototype.getAllDragonBonesData = function () {
            return this._dragonBonesDataMap
        }, e.prototype.getAllTextureAtlasData = function () {
            return this._textureAtlasDataMap
        }, e
    }();
    e._defaultParser = null, t.BaseFactory = e
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (e) {
        function a() {
            return e.call(this) || this
        }

        return __extends(a, e), a.toString = function () {
            return "[class dragonBones.EgretTextureAtlasData]"
        }, a.prototype._onClear = function () {
            e.prototype._onClear.call(this), this.texture && (this.texture = null)
        }, a.prototype.generateTexture = function () {
            return t.BaseObject.borrowObject(i)
        }, a.prototype.dispose = function () {
            this.returnToPool()
        }, a
    }(t.TextureAtlasData);
    t.EgretTextureAtlasData = e;
    var i = function (t) {
        function e() {
            return t.call(this) || this
        }

        return __extends(e, t), e.toString = function () {
            return "[class dragonBones.EgretTextureData]"
        }, e.prototype._onClear = function () {
            t.prototype._onClear.call(this), this.texture && (this.texture = null)
        }, e
    }(t.TextureData);
    t.EgretTextureData = i
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (t) {
        function e(e, i, a, n) {
            return t.call(this, e, i, a, n) || this
        }

        return __extends(e, t), Object.defineProperty(e.prototype, "eventObject", {
            get: function () {
                return this.data
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(e.prototype, "animationName", {
            get: function () {
                return this.eventObject.animationState.name
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(e.prototype, "armature", {
            get: function () {
                return this.eventObject.armature
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(e.prototype, "bone", {
            get: function () {
                return this.eventObject.bone
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(e.prototype, "slot", {
            get: function () {
                return this.eventObject.slot
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(e.prototype, "animationState", {
            get: function () {
                return this.eventObject.animationState
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(e.prototype, "frameLabel", {
            get: function () {
                return this.eventObject.name
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(e.prototype, "sound", {
            get: function () {
                return this.eventObject.name
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(e.prototype, "movementID", {
            get: function () {
                return this.animationName
            }, enumerable: !0, configurable: !0
        }), e
    }(egret.Event);
    e.START = t.EventObject.START, e.LOOP_COMPLETE = t.EventObject.LOOP_COMPLETE, e.COMPLETE = t.EventObject.COMPLETE, e.FADE_IN = t.EventObject.FADE_IN, e.FADE_IN_COMPLETE = t.EventObject.FADE_IN_COMPLETE, e.FADE_OUT = t.EventObject.FADE_OUT, e.FADE_OUT_COMPLETE = t.EventObject.FADE_OUT_COMPLETE, e.FRAME_EVENT = t.EventObject.FRAME_EVENT, e.SOUND_EVENT = t.EventObject.SOUND_EVENT, e.ANIMATION_FRAME_EVENT = t.EventObject.FRAME_EVENT, e.BONE_FRAME_EVENT = t.EventObject.FRAME_EVENT, e.MOVEMENT_FRAME_EVENT = t.EventObject.FRAME_EVENT, e.SOUND = t.EventObject.SOUND_EVENT, t.EgretEvent = e;
    var i = function (i) {
        function a() {
            return i.call(this) || this
        }

        return __extends(a, i), a.prototype._onClear = function () {
            this._disposeProxy = !1, this._armature = null, this._debugDrawer = null
        }, a.prototype._dispatchEvent = function (t, a) {
            var n = egret.Event.create(e, t);
            n.data = a, i.prototype.dispatchEvent.call(this, n), egret.Event.release(n)
        }, a.prototype._debugDraw = function (t) {
            if (t) {
                this._debugDrawer || (this._debugDrawer = new egret.Sprite), this.addChild(this._debugDrawer), this._debugDrawer.graphics.clear();
                for (var e = this._armature.getBones(), i = 0, a = e.length; i < a; ++i) {
                    var n = e[i], r = n.length, s = n.globalTransformMatrix.tx, o = n.globalTransformMatrix.ty,
                        l = s + n.globalTransformMatrix.a * r, h = o + n.globalTransformMatrix.b * r;
                    this._debugDrawer.graphics.lineStyle(2, n.ik ? 16711680 : 65535, .7), this._debugDrawer.graphics.moveTo(s, o), this._debugDrawer.graphics.lineTo(l, h), this._debugDrawer.graphics.lineStyle(0, 0, 0), this._debugDrawer.graphics.beginFill(65535, .7), this._debugDrawer.graphics.drawCircle(s, o, 3), this._debugDrawer.graphics.endFill()
                }
                for (var _ = this._armature.getSlots(), i = 0, a = _.length; i < a; ++i) {
                    var u = _[i], c = u.boundingBoxData;
                    if (c) {
                        var f = this._debugDrawer.getChildByName(u.name);
                        switch (f || (f = new egret.Shape, f.name = u.name, this._debugDrawer.addChild(f)), f.graphics.clear(), f.graphics.beginFill(c.color ? c.color : 16711935, .3), c.type) {
                            case 0:
                                f.graphics.drawRect(.5 * -c.width, .5 * -c.height, c.width, c.height);
                                break;
                            case 1:
                                f.graphics.drawEllipse(.5 * -c.width, .5 * -c.height, c.width, c.height);
                                break;
                            case 2:
                                for (var m = c.vertices, p = 0, d = c.vertices.length; p < d; p += 2) 0 === p ? f.graphics.moveTo(m[p], m[p + 1]) : f.graphics.lineTo(m[p], m[p + 1])
                        }
                        f.graphics.endFill(), u._updateTransformAndMatrix(), f.$setMatrix(u.globalTransformMatrix, !1)
                    } else {
                        var f = this._debugDrawer.getChildByName(u.name);
                        f && this._debugDrawer.removeChild(f)
                    }
                }
            } else this._debugDrawer && this._debugDrawer.parent === this && this.removeChild(this._debugDrawer)
        }, a.prototype.dispose = function (t) {
            void 0 === t && (t = !0), this._disposeProxy = t, this._armature && (this._armature.dispose(), this._armature = null)
        }, a.prototype.hasEvent = function (t) {
            return this.hasEventListener(t)
        }, a.prototype.addEvent = function (t, e, i) {
            this.addEventListener(t, e, i)
        }, a.prototype.removeEvent = function (t, e, i) {
            this.removeEventListener(t, e, i)
        }, Object.defineProperty(a.prototype, "armature", {
            get: function () {
                return this._armature
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(a.prototype, "animation", {
            get: function () {
                return this._armature.animation
            }, enumerable: !0, configurable: !0
        }), a.prototype.advanceTimeBySelf = function (e) {
            e ? this._armature.clock = t.EgretFactory._clock : this._armature.clock = null
        }, a
    }(egret.DisplayObjectContainer);
    t.EgretArmatureDisplay = i;
    var a = function (t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }

        return __extends(e, t), e
    }(e);
    t.Event = a;
    var n = function (t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }

        return __extends(e, t), e
    }(e);
    t.ArmatureEvent = n;
    var r = function (t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }

        return __extends(e, t), e
    }(e);
    t.AnimationEvent = r;
    var s = function (t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }

        return __extends(e, t), e
    }(e);
    t.FrameEvent = s;
    var o = function (t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }

        return __extends(e, t), e
    }(e);
    t.SoundEvent = o;
    var l = function (e) {
        function i(i, a, n) {
            void 0 === n && (n = 1);
            var r = e.call(this) || this;
            return r._onClear(), r.texture = i, t.ObjectDataParser.getInstance().parseTextureAtlasData(a, r, n), r
        }

        return __extends(i, e), i.toString = function () {
            return "[class dragonBones.EgretTextureAtlas]"
        }, i
    }(t.EgretTextureAtlasData);
    t.EgretTextureAtlas = l;
    var h = function (t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }

        return __extends(e, t), e
    }(l);
    t.EgretSheetAtlas = h;
    var _ = function () {
        function e() {
        }

        return e.getInstance = function () {
            return t.EgretFactory.factory.soundEventManager
        }, e
    }();
    t.SoundEventManager = _;
    var u = function () {
        function t() {
        }

        return t
    }();
    t.AnimationCacheManager = u
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (e) {
        function i(a) {
            void 0 === a && (a = null);
            var n = e.call(this, a) || this;
            return i._eventManager || (i._eventManager = new t.EgretArmatureDisplay, i._clock = new t.WorldClock, i._clock.time = .001 * egret.getTimer(), egret.startTick(i._clockHandler, i)), n
        }

        return __extends(i, e), i._clockHandler = function (t) {
            t *= .001;
            var e = t - i._clock.time;
            return i._clock.advanceTime(e), i._clock.time = t, !1
        }, Object.defineProperty(i, "factory", {
            get: function () {
                return i._factory || (i._factory = new i), i._factory
            }, enumerable: !0, configurable: !0
        }), i.prototype._generateTextureAtlasData = function (e, i) {
            return e ? e.texture = i : e = t.BaseObject.borrowObject(t.EgretTextureAtlasData), e
        }, i.prototype._generateArmature = function (e) {
            var a = t.BaseObject.borrowObject(t.Armature), n = new t.EgretArmatureDisplay;
            return n._armature = a, a._init(e.armature, e.skin, n, n, i._eventManager), a
        }, i.prototype._generateSlot = function (e, i, a) {
            var n = i.slot, r = t.BaseObject.borrowObject(t.EgretSlot), s = [];
            r._init(i, new egret.Bitmap, new egret.Mesh);
            for (var o = 0, l = i.displays.length; o < l; ++o) {
                var h = i.displays[o];
                switch (h.type) {
                    case 0:
                        h.texture && !e.textureAtlasName || (h.texture = this._getTextureData(e.textureAtlasName || e.dataName, h.path)), s.push(r.rawDisplay);
                        break;
                    case 2:
                        h.texture && !e.textureAtlasName || (h.texture = this._getTextureData(e.textureAtlasName || e.dataName, h.path)), !h.mesh && h.share && (h.mesh = i.getMesh(h.share)), "webgl" === egret.Capabilities.renderMode || egret.Capabilities.runtimeType === egret.RuntimeType.NATIVE ? s.push(r.meshDisplay) : (console.warn("Canvas can not support mesh, please change renderMode to webgl."), s.push(r.rawDisplay));
                        break;
                    case 1:
                        var _ = this.buildArmature(h.path, e.dataName, null, e.textureAtlasName);
                        if (_) {
                            if (_.inheritAnimation = h.inheritAnimation, !_.inheritAnimation) {
                                var u = n.actions.length > 0 ? n.actions : _.armatureData.actions;
                                if (u.length > 0) for (var c = 0, f = u.length; c < f; ++c) _._bufferAction(u[c]); else _.animation.play()
                            }
                            h.armature = _.armatureData
                        }
                        s.push(_);
                        break;
                    default:
                        s.push(null)
                }
            }
            return r._setDisplayList(s), r
        }, i.prototype.buildArmatureDisplay = function (t, e, a, n) {
            void 0 === e && (e = null), void 0 === a && (a = null), void 0 === n && (n = null);
            var r = this.buildArmature(t, e, a, n);
            return r ? (i._clock.add(r), r.display) : null
        }, i.prototype.getTextureDisplay = function (t, e) {
            void 0 === e && (e = null);
            var i = this._getTextureData(e, t);
            if (i) {
                if (!i.texture) {
                    var a = i.parent.texture;
                    i.texture = new egret.Texture, i.texture._bitmapData = a._bitmapData, i.texture.$initData(i.region.x, i.region.y, i.region.width, i.region.height, 0, 0, i.region.width, i.region.height, a.textureWidth, a.textureHeight)
                }
                return new egret.Bitmap(i.texture)
            }
            return null
        }, Object.defineProperty(i.prototype, "soundEventManager", {
            get: function () {
                return i._eventManager
            }, enumerable: !0, configurable: !0
        }), i.prototype.addSkeletonData = function (t, e) {
            void 0 === e && (e = null), this.addDragonBonesData(t, e)
        }, i.prototype.getSkeletonData = function (t) {
            return this.getDragonBonesData(t)
        }, i.prototype.removeSkeletonData = function (t) {
            this.removeDragonBonesData(t)
        }, i.prototype.addTextureAtlas = function (t, e) {
            void 0 === e && (e = null), this.addTextureAtlasData(t, e)
        }, i.prototype.getTextureAtlas = function (t) {
            return this.getTextureAtlasData(t)
        }, i.prototype.removeTextureAtlas = function (t) {
            this.removeTextureAtlasData(t)
        }, i.prototype.buildFastArmature = function (t, e, i) {
            return void 0 === e && (e = null), void 0 === i && (i = null), this.buildArmature(t, e, i)
        }, i.prototype.dispose = function () {
            this.clear()
        }, Object.defineProperty(i.prototype, "soundEventManater", {
            get: function () {
                return i._eventManager
            }, enumerable: !0, configurable: !0
        }), i
    }(t.BaseFactory);
    e._factory = null, e._eventManager = null, e._clock = null, t.EgretFactory = e
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (e) {
        function i() {
            return e.call(this) || this
        }

        return __extends(i, e), i.toString = function () {
            return "[class dragonBones.EgretSlot]"
        }, i.prototype._onClear = function () {
            e.prototype._onClear.call(this), this.transformUpdateEnabled = !1, this._renderDisplay = null, this._colorFilter = null
        }, i.prototype._initDisplay = function (t) {
        }, i.prototype._disposeDisplay = function (t) {
        }, i.prototype._onUpdateDisplay = function () {
            this._renderDisplay = this._display ? this._display : this._rawDisplay
        }, i.prototype._addDisplay = function () {
            var t = this._armature.display;
            t.addChild(this._renderDisplay)
        }, i.prototype._replaceDisplay = function (t) {
            var e = this._armature.display, i = t;
            e.addChild(this._renderDisplay), e.swapChildren(this._renderDisplay, i), e.removeChild(i)
        }, i.prototype._removeDisplay = function () {
            this._renderDisplay.parent.removeChild(this._renderDisplay)
        }, i.prototype._updateZOrder = function () {
            var t = this._armature.display, e = t.getChildIndex(this._renderDisplay);
            e !== this._zOrder && t.addChildAt(this._renderDisplay, this._zOrder < e ? this._zOrder : this._zOrder + 1)
        }, i.prototype._updateVisible = function () {
            this._renderDisplay.visible = this._parent.visible
        }, i.prototype._updateBlendMode = function () {
            switch (this._blendMode) {
                case 0:
                    this._renderDisplay.blendMode = egret.BlendMode.NORMAL;
                    break;
                case 1:
                    this._renderDisplay.blendMode = egret.BlendMode.ADD;
                    break;
                case 5:
                    this._renderDisplay.blendMode = egret.BlendMode.ERASE
            }
        }, i.prototype._updateColor = function () {
            if (1 !== this._colorTransform.redMultiplier || 1 !== this._colorTransform.greenMultiplier || 1 !== this._colorTransform.blueMultiplier || 0 !== this._colorTransform.redOffset || 0 !== this._colorTransform.greenOffset || 0 !== this._colorTransform.blueOffset || 0 !== this._colorTransform.alphaOffset) {
                this._colorFilter || (this._colorFilter = new egret.ColorMatrixFilter);
                var t = this._colorFilter.matrix;
                t[0] = this._colorTransform.redMultiplier, t[6] = this._colorTransform.greenMultiplier, t[12] = this._colorTransform.blueMultiplier, t[18] = this._colorTransform.alphaMultiplier, t[4] = this._colorTransform.redOffset, t[9] = this._colorTransform.greenOffset, t[14] = this._colorTransform.blueOffset, t[19] = this._colorTransform.alphaOffset, this._colorFilter.matrix = t;
                var e = this._renderDisplay.filters;
                e || (e = []), e.indexOf(this._colorFilter) < 0 && e.push(this._colorFilter), this._renderDisplay.filters = e
            } else this._colorFilter && (this._colorFilter = null, this._renderDisplay.filters = null), this._renderDisplay.$setAlpha(this._colorTransform.alphaMultiplier)
        }, i.prototype._updateFrame = function () {
            var e = this._meshData && this._display === this._meshDisplay, i = this._textureData;
            if (this._displayIndex >= 0 && this._display && i) {
                var a = i.parent;
                this._armature.replacedTexture && this._displayData && a === this._displayData.texture.parent && (a = this._armature._replaceTextureAtlasData, a || (a = t.BaseObject.borrowObject(t.EgretTextureAtlasData), a.copyFrom(this._textureData.parent), a.texture = this._armature.replacedTexture, this._armature._replaceTextureAtlasData = a), i = a.getTexture(i.name));
                var n = a.texture ? a.texture._bitmapData : null;
                if (n) {
                    if (!i.texture) {
                        var r = a.width > 0 ? a.width : n.width, s = a.height > 0 ? a.height : n.height,
                            o = Math.min(i.region.width, r - i.region.x), l = Math.min(i.region.height, s - i.region.y);
                        i.texture = new egret.Texture, i.texture._bitmapData = n, i.texture.$initData(i.region.x, i.region.y, o, l, 0, 0, o, l, r, s)
                    }
                    if (e) {
                        var h = this._renderDisplay, _ = h.$renderNode;
                        _.uvs.length = 0, _.vertices.length = 0, _.indices.length = 0;
                        for (var u = 0, c = this._meshData.vertices.length; u < c; ++u) _.uvs[u] = this._meshData.uvs[u], _.vertices[u] = this._meshData.vertices[u];
                        for (var u = 0, c = this._meshData.vertexIndices.length; u < c; ++u) _.indices[u] = this._meshData.vertexIndices[u];
                        h.$setBitmapData(i.texture), h.$setAnchorOffsetX(this._pivotX), h.$setAnchorOffsetY(this._pivotY), h.$updateVertices(), h.$invalidateTransform()
                    } else {
                        var f = this._renderDisplay;
                        f.$setBitmapData(i.texture), f.$setAnchorOffsetX(this._pivotX), f.$setAnchorOffsetY(this._pivotY)
                    }
                    return void this._updateVisible()
                }
            }
            if (e) {
                var h = this._renderDisplay;
                h.visible = !1, h.$setBitmapData(null), h.x = 0, h.y = 0
            } else {
                var f = this._renderDisplay;
                f.visible = !1, f.$setBitmapData(null), f.x = 0, f.y = 0
            }
        }, i.prototype._updateMesh = function () {
            var t = this._renderDisplay, e = t.$renderNode, i = this._ffdVertices.length > 0;
            if (this._meshData.skinned) {
                for (var a = 0, n = 0, r = this._meshData.vertices.length; a < r; a += 2) {
                    for (var s = a / 2, o = this._meshData.boneIndices[s], l = this._meshData.boneVertices[s], h = this._meshData.weights[s], _ = 0, u = 0, c = 0, f = o.length; c < f; ++c) {
                        var m = this._meshBones[o[c]], p = m.globalTransformMatrix, d = h[c], g = 0, y = 0;
                        i ? (g = l[2 * c] + this._ffdVertices[n], y = l[2 * c + 1] + this._ffdVertices[n + 1]) : (g = l[2 * c], y = l[2 * c + 1]), _ += (p.a * g + p.c * y + p.tx) * d, u += (p.b * g + p.d * y + p.ty) * d, n += 2
                    }
                    e.vertices[a] = _, e.vertices[a + 1] = u
                }
                t.$updateVertices(), t.$invalidateTransform()
            } else if (i) {
                for (var v = this._meshData.vertices, a = 0, r = this._meshData.vertices.length; a < r; a += 2) {
                    var _ = v[a] + this._ffdVertices[a], u = v[a + 1] + this._ffdVertices[a + 1];
                    e.vertices[a] = _, e.vertices[a + 1] = u
                }
                t.$updateVertices(), t.$invalidateTransform()
            }
        }, i.prototype._updateTransform = function (t) {
            if (t) {
                var e = this._renderDisplay.matrix;
                e.identity(), this._renderDisplay.$setMatrix(e, this.transformUpdateEnabled)
            } else if (this.transformUpdateEnabled) this._renderDisplay.$setMatrix(this.globalTransformMatrix, this.transformUpdateEnabled), this._renderDisplay.$setAnchorOffsetX(this._pivotX), this._renderDisplay.$setAnchorOffsetX(this._pivotY); else {
                var i = this._renderDisplay.$DisplayObject, a = i[6];
                a.a = this.globalTransformMatrix.a, a.b = this.globalTransformMatrix.b, a.c = this.globalTransformMatrix.c, a.d = this.globalTransformMatrix.d, a.tx = this.globalTransformMatrix.tx, a.ty = this.globalTransformMatrix.ty, this._renderDisplay.$removeFlags(8), this._renderDisplay.$invalidatePosition()
            }
        }, i
    }(t.Slot);
    t.EgretSlot = e
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    function e(t, e) {
        for (var i = 0, a = t.length; i < a; ++i) {
            var n = t[i];
            if (n.name === e) return n
        }
        return null
    }

    function i(t) {
        if (t.groupName) {
            var i = c[t.groupName];
            if (i) {
                var a = e(i.movie, t.movieName);
                if (a) return t.groupConfig = i, t.movieConfig = a, !0
            }
        }
        if (!t.groupName) for (var n in c) {
            var i = c[n];
            if (!t.groupName) {
                var a = e(i.movie, t.movieName);
                if (a) return t.groupName = n, t.groupConfig = i, t.movieConfig = a, !0
            }
        }
        return !1
    }

    function a(t) {
        return null != c[t]
    }

    function n(t, e, i) {
        if (void 0 === i && (i = null), !t) throw new Error;
        var a = new egret.ByteArray(t);
        a.endian = egret.Endian.LITTLE_ENDIAN, a.position = 8;
        var n = JSON.parse(a.readUTF());
        n.offset = a.position, n.arrayBuffer = t, n.textures = [];
        var r = n.offset % 4;
        r && (n.offset += 4 - r);
        for (var s = 0, o = n.position.length; s < o; s += 3) switch (s / 3) {
            case 1:
                n.displayFrameArray = new Int16Array(n.arrayBuffer, n.offset + n.position[s], n.position[s + 1] / n.position[s + 2]);
                break;
            case 2:
                n.rectangleArray = new Float32Array(n.arrayBuffer, n.offset + n.position[s], n.position[s + 1] / n.position[s + 2]);
                break;
            case 3:
                n.transformArray = new Float32Array(n.arrayBuffer, n.offset + n.position[s], n.position[s + 1] / n.position[s + 2]);
                break;
            case 4:
                n.colorArray = new Int16Array(n.arrayBuffer, n.offset + n.position[s], n.position[s + 1] / n.position[s + 2])
        }
        if (i = i || n.name, c[i], c[i] = n, e instanceof Array) for (var s = 0, o = e.length; s < o; ++s) {
            var l = e[s];
            n.textures.push(l)
        } else n.textures.push(e)
    }

    function r(t) {
        var e = c[t];
        e && delete c[t]
    }

    function s() {
        for (var t in c) delete c[t]
    }

    function o(t, e) {
        void 0 === e && (e = null);
        var a = {movieName: t, groupName: e};
        if (i(a)) {
            var n = new m(a);
            return n
        }
        return console.warn("No movie named: " + t), null
    }

    function l(t) {
        var e = c[t];
        if (e) {
            for (var i = [], a = 0, n = e.movie.length; a < n; ++a) i.push(e.movie[a].name);
            return i
        }
        return console.warn("No group named: " + t), null
    }

    var h = function (t) {
        function e(e) {
            var i = t.call(this) || this;
            return i.displayIndex = -1, i.colorIndex = -1, i.transformIndex = -1, i.rawDisplay = new egret.Bitmap, i.childMovies = {}, i.config = null, i.displayConfig = null, i.display = null, i.childMovie = null, i.colorFilter = null, i.display = i.rawDisplay, i.config = e, i.rawDisplay.name = i.config.name, null == i.config.blendMode && (i.config.blendMode = 0), i
        }

        return __extends(e, t), e.prototype.dispose = function () {
            this.rawDisplay = null, this.childMovies = null, this.config = null, this.displayConfig = null, this.display = null, this.childMovie = null, this.colorFilter = null
        }, e
    }(egret.HashObject), _ = new egret.Rectangle, u = new egret.Matrix, c = {};
    t.hasMovieGroup = a, t.addMovieGroup = n, t.removeMovieGroup = r, t.removeAllMovieGroup = s, t.buildMovie = o, t.getMovieNames = l;
    var f = function (t) {
        function e(e) {
            var i = t.call(this, e) || this;
            return i.name = null, i.slotName = null, i.clipName = null, i.movie = null, i
        }

        return __extends(e, t), e
    }(egret.Event);
    f.START = "start", f.LOOP_COMPLETE = "loopComplete", f.COMPLETE = "complete", f.FRAME_EVENT = "frameEvent", f.SOUND_EVENT = "soundEvent", t.MovieEvent = f;
    var m = function (e) {
        function i(a) {
            var n = e.call(this) || this;
            n.timeScale = 1, n.clipTimeScale = 1, n._batchEnabled = !0, n._isLockDispose = !1, n._isDelayDispose = !1, n._isStarted = !1, n._isPlaying = !1, n._isReversing = !1, n._isCompleted = !1, n._playTimes = 0, n._time = 0, n._currentTime = 0, n._timeStamp = 0, n._currentPlayTimes = 0, n._cacheFrameIndex = 0, n._frameSize = 0, n._cacheRectangle = null, n._clock = null, n._groupConfig = null, n._config = null, n._clipConfig = null, n._currentFrameConfig = null, n._clipArray = null, n._clipNames = [], n._slots = [], n._childMovies = [], n._groupConfig = a.groupConfig, n._config = a.movieConfig, n._batchEnabled = !n._config.isNested, n._batchEnabled && (n.$renderNode = new egret.sys.GroupNode, n.$renderNode.cleanBeforeRender = i._cleanBeforeRender), n._clipNames.length = 0;
            for (var r = 0, s = n._config.clip.length; r < s; ++r) n._clipNames.push(n._config.clip[r].name);
            for (var r = 0, s = n._config.slot.length; r < s; ++r) {
                var o = new h(n._config.slot[r]);
                n._updateSlotBlendMode(o), n._slots.push(o), n._batchEnabled ? n.$renderNode.addNode(o.rawDisplay.$renderNode) : n.addChild(o.rawDisplay)
            }
            return n._frameSize = 2 * n._slots.length, t.EgretFactory.factory, n.advanceTimeBySelf(!0), n.name = n._config.name, n.play(), n.advanceTime(1e-6), n.stop(), n
        }

        return __extends(i, e), i._cleanBeforeRender = function () {
        }, i.prototype._configToEvent = function (t, e) {
            e.movie = this, e.clipName = this._clipConfig.name, e.name = t.name, e.slotName = t.slot
        }, i.prototype._onCrossFrame = function (e) {
            for (var i = 0, a = e.actionAndEvent.length; i < a; ++i) {
                var n = e.actionAndEvent[i];
                if (n) switch (n.type) {
                    case 11:
                        if (t.EgretFactory.factory.soundEventManager.hasEventListener(f.SOUND_EVENT)) {
                            var r = egret.Event.create(f, f.SOUND_EVENT);
                            this._configToEvent(n, r), t.EgretFactory.factory.soundEventManager.dispatchEvent(r), egret.Event.release(r)
                        }
                        break;
                    case 10:
                        if (this.hasEventListener(f.FRAME_EVENT)) {
                            var s = egret.Event.create(f, f.FRAME_EVENT);
                            this._configToEvent(n, s), this.dispatchEvent(s), egret.Event.release(s)
                        }
                        break;
                    case 0:
                    case 4:
                        if (n.slot) {
                            var o = this._getSlot(n.slot);
                            o && o.childMovie && o.childMovie.play(n.name)
                        } else this.play(n.name)
                }
            }
        }, i.prototype._updateSlotBlendMode = function (t) {
            var e = "";
            switch (t.config.blendMode) {
                case 0:
                    e = egret.BlendMode.NORMAL;
                    break;
                case 1:
                    e = egret.BlendMode.ADD;
                    break;
                case 5:
                    e = egret.BlendMode.ERASE
            }
            e && (this._batchEnabled ? t.display.$renderNode.blendMode = egret.sys.blendModeToNumber(e) : t.display.blendMode = e)
        }, i.prototype._updateSlotColor = function (t, e, i, a, n, r, s, o, l) {
            if (1 !== i || 1 !== a || 1 !== n || 0 !== s || 0 !== o || 0 !== l || 0 !== r) {
                t.colorFilter || (t.colorFilter = new egret.ColorMatrixFilter);
                var h = t.colorFilter.matrix;
                if (h[0] = i, h[6] = a, h[12] = n, h[18] = e, h[4] = s, h[9] = o, h[14] = l, h[19] = r, t.colorFilter.matrix = h, this._batchEnabled) {
                    t.display.$renderNode.filter;
                    t.display.$renderNode.filter = t.colorFilter
                } else {
                    var _ = t.display.filters;
                    _ || (_ = []), _.indexOf(t.colorFilter) < 0 && _.push(t.colorFilter), t.display.filters = _
                }
            } else t.colorFilter && (t.colorFilter = null), this._batchEnabled ? (t.display.$renderNode.filter = null, t.display.$renderNode.alpha = e) : (t.display.filters = null, t.display.$setAlpha(e))
        }, i.prototype._updateSlotDisplay = function (t) {
            var e = t.display || t.rawDisplay, i = t.childMovie;
            if (t.displayIndex >= 0) if (t.displayConfig = this._groupConfig.display[t.displayIndex], 1 === t.displayConfig.type) {
                var a = t.childMovies[t.displayConfig.name];
                a || (a = o(t.displayConfig.name, this._groupConfig.name), a.advanceTimeBySelf(!1), t.childMovies[t.displayConfig.name] = a), t.display = a, t.childMovie = a
            } else t.display = t.rawDisplay, t.childMovie = null; else t.displayConfig = null, t.display = t.rawDisplay, t.childMovie = null;
            if (t.display !== e && (e && (this.addChild(t.display), this.swapChildren(t.display, e), this.removeChild(e)), this._updateSlotBlendMode(t)), t.display === t.rawDisplay) if (t.displayConfig && null != t.displayConfig.regionIndex) {
                if (!t.displayConfig.texture) {
                    var n = this._groupConfig.textures[0], r = 4 * t.displayConfig.regionIndex,
                        s = this._groupConfig.rectangleArray[r], l = this._groupConfig.rectangleArray[r + 1],
                        h = this._groupConfig.rectangleArray[r + 2], _ = this._groupConfig.rectangleArray[r + 3];
                    t.displayConfig.texture = new egret.Texture, t.displayConfig.texture._bitmapData = n._bitmapData, t.displayConfig.texture.$initData(s, l, Math.min(h, n.textureWidth - s), Math.min(_, n.textureHeight - l), 0, 0, Math.min(h, n.textureWidth - s), Math.min(_, n.textureHeight - l), n.textureWidth, n.textureHeight)
                }
                if (this._batchEnabled) {
                    var u = t.displayConfig.texture, c = t.rawDisplay.$renderNode;
                    egret.sys.RenderNode.prototype.cleanBeforeRender.call(t.rawDisplay.$renderNode), c.image = u._bitmapData, c.drawImage(u._bitmapX, u._bitmapY, u._bitmapWidth, u._bitmapHeight, u._offsetX, u._offsetY, u.textureWidth, u.textureHeight), c.imageWidth = u._sourceWidth, c.imageHeight = u._sourceHeight
                } else t.rawDisplay.visible = !0, t.rawDisplay.$setBitmapData(t.displayConfig.texture)
            } else this._batchEnabled ? t.rawDisplay.$renderNode.image = null : (t.rawDisplay.visible = !1, t.rawDisplay.$setBitmapData(null));
            t.childMovie !== i && (i && (i.stop(), this._childMovies.slice(this._childMovies.indexOf(i), 1)), t.childMovie && (this._childMovies.indexOf(t.childMovie) < 0 && this._childMovies.push(t.childMovie), t.config.action ? t.childMovie.play(t.config.action) : t.childMovie.play(t.childMovie._config.action)))
        }, i.prototype._getSlot = function (t) {
            for (var e = 0, i = this._slots.length; e < i; ++e) {
                var a = this._slots[e];
                if (a.config.name === t) return a
            }
            return null
        }, i.prototype.$render = function () {
            this._batchEnabled || e.prototype.$render.call(this)
        }, i.prototype.$measureContentBounds = function (t) {
            this._batchEnabled && this._cacheRectangle ? t.setTo(this._cacheRectangle.x, this._cacheRectangle.y, this._cacheRectangle.width - this._cacheRectangle.x, this._cacheRectangle.height - this._cacheRectangle.y) : e.prototype.$measureContentBounds.call(this, t)
        }, i.prototype.$doAddChild = function (t, i, a) {
            return this._batchEnabled ? (console.warn("Can not add child."), null) : e.prototype.$doAddChild.call(this, t, i, a)
        }, i.prototype.$doRemoveChild = function (t, i) {
            return this._batchEnabled ? (console.warn("Can not remove child."), null) : e.prototype.$doRemoveChild.call(this, t, i)
        }, i.prototype.dispose = function () {
            if (this._isLockDispose) this._isDelayDispose = !0; else {
                if (this._clock && this._clock.remove(this), this._slots) for (var t = 0, e = this._slots.length; t < e; ++t) this._slots[t].dispose();
                this._isPlaying = !1, this._cacheRectangle = null, this._clock = null, this._groupConfig = null, this._config = null, this._clipConfig = null, this._currentFrameConfig = null, this._clipArray = null, this._clipNames = null, this._slots = null, this._childMovies = null
            }
        }, i.prototype.advanceTime = function (t) {
            if (this._isPlaying) {
                this._isLockDispose = !0, t < 0 && (t = -t), t *= this.timeScale, this._time += t * this.clipTimeScale;
                var e = this._clipConfig.duration, i = e * this._playTimes, a = this._time, n = this._currentPlayTimes;
                if (this._playTimes > 0 && (a >= i || a <= -i) ? (this._isCompleted = !0, n = this._playTimes, a = a < 0 ? 0 : e) : (this._isCompleted = !1, a < 0 ? (n = Math.floor(-a / e), a = e - -a % e) : (n = Math.floor(a / e), a %= e), this._playTimes > 0 && n > this._playTimes && (n = this._playTimes)), this._currentTime !== a) {
                    var r = Math.floor(a * this._clipConfig.cacheTimeToFrameScale);
                    if (this._cacheFrameIndex !== r) {
                        this._cacheFrameIndex = r;
                        var s = this._groupConfig.displayFrameArray, o = this._groupConfig.transformArray,
                            l = this._groupConfig.colorArray, h = !0, c = !1, m = !1, p = this._cacheRectangle;
                        this._cacheRectangle = this._clipConfig.cacheRectangles[this._cacheFrameIndex], this._batchEnabled && !this._cacheRectangle && (m = !0, this._cacheRectangle = new egret.Rectangle, this._clipConfig.cacheRectangles[this._cacheFrameIndex] = this._cacheRectangle);
                        for (var d = 0, g = this._slots.length; d < g; ++d) {
                            var y = this._slots[d], v = this._frameSize * this._cacheFrameIndex + 2 * d,
                                b = 2 * this._clipArray[v];
                            if (b >= 0) {
                                var T = s[b], D = 8 * s[b + 1], O = 6 * this._clipArray[v + 1], x = !1;
                                if (y.displayIndex !== T && (y.displayIndex = T, x = !0, this._updateSlotDisplay(y)), (y.colorIndex !== D || x) && (y.colorIndex = D, y.colorIndex >= 0 ? this._updateSlotColor(y, .01 * l[D], .01 * l[D + 1], .01 * l[D + 2], .01 * l[D + 3], l[D + 4], l[D + 5], l[D + 6], l[D + 7]) : this._updateSlotColor(y, 1, 1, 1, 1, 0, 0, 0, 0)), c = !0, y.transformIndex !== O) if (y.transformIndex = O, this._batchEnabled) {
                                    var E = y.display.$renderNode.matrix;
                                    E || (E = y.display.$renderNode.matrix = new egret.Matrix), E.a = o[O], E.b = o[O + 1], E.c = o[O + 2], E.d = o[O + 3], E.tx = o[O + 4], E.ty = o[O + 5]
                                } else u.a = o[O], u.b = o[O + 1], u.c = o[O + 2], u.d = o[O + 3], u.tx = o[O + 4], u.ty = o[O + 5], y.display.$setMatrix(u);
                                if (this._batchEnabled && m) {
                                    var E = y.display.$renderNode.matrix;
                                    _.x = 0, _.y = 0, _.width = y.displayConfig.texture.textureWidth, _.height = y.displayConfig.texture.textureHeight, E.$transformBounds(_), h ? (h = !1, this._cacheRectangle.x = _.x, this._cacheRectangle.width = _.x + _.width, this._cacheRectangle.y = _.y, this._cacheRectangle.height = _.y + _.height) : (this._cacheRectangle.x = Math.min(this._cacheRectangle.x, _.x), this._cacheRectangle.width = Math.max(this._cacheRectangle.width, _.x + _.width), this._cacheRectangle.y = Math.min(this._cacheRectangle.y, _.y), this._cacheRectangle.height = Math.max(this._cacheRectangle.height, _.y + _.height))
                                }
                            } else y.displayIndex !== -1 && (y.displayIndex = -1, this._updateSlotDisplay(y))
                        }
                        this._cacheRectangle && (c && m && h && p && (this._cacheRectangle.x = p.x, this._cacheRectangle.y = p.y, this._cacheRectangle.width = p.width, this._cacheRectangle.height = p.height), this.$invalidateContentBounds())
                    }
                    if (this._isCompleted && (this._isPlaying = !1), !this._isStarted && (this._isStarted = !0, this.hasEventListener(f.START))) {
                        var S = egret.Event.create(f, f.START);
                        S.movie = this, S.clipName = this._clipConfig.name, S.name = null, S.slotName = null, this.dispatchEvent(S)
                    }
                    this._isReversing = this._currentTime > a && this._currentPlayTimes === n;
                    var M = this._clipConfig.frame ? this._clipConfig.frame.length : 0;
                    if (M > 0) {
                        var A = Math.floor(this._currentTime * this._config.frameRate),
                            w = this._groupConfig.frame[this._clipConfig.frame[A]];
                        if (this._currentFrameConfig !== w) if (M > 1) {
                            var B = this._currentFrameConfig;
                            if (this._currentFrameConfig = w, !B) {
                                var C = Math.floor(this._currentTime * this._config.frameRate);
                                B = this._groupConfig.frame[this._clipConfig.frame[C]], this._isReversing || (this._currentTime <= B.position || this._currentPlayTimes !== n) && (B = this._groupConfig.frame[B.prev])
                            }
                            if (this._isReversing) for (; B !== w;) this._onCrossFrame(B), B = this._groupConfig.frame[B.prev]; else for (; B !== w;) B = this._groupConfig.frame[B.next], this._onCrossFrame(B)
                        } else this._currentFrameConfig = w, this._currentFrameConfig && this._onCrossFrame(this._currentFrameConfig)
                    }
                    this._currentTime = a;
                    for (var d = 0, g = this._childMovies.length; d < g; ++d) this._childMovies[d].advanceTime(t);
                    if (this._currentPlayTimes !== n) {
                        if (this._currentPlayTimes = n, this.hasEventListener(f.LOOP_COMPLETE)) {
                            var F = egret.Event.create(f, f.LOOP_COMPLETE);
                            F.movie = this, F.clipName = this._clipConfig.name, F.name = null, F.slotName = null, this.dispatchEvent(F), egret.Event.release(F)
                        }
                        if (this._isCompleted && this.hasEventListener(f.COMPLETE)) {
                            var N = egret.Event.create(f, f.COMPLETE);
                            N.movie = this, N.clipName = this._clipConfig.name, N.name = null, N.slotName = null, this.dispatchEvent(N), egret.Event.release(N)
                        }
                    }
                    this._isLockDispose = !1, this._isDelayDispose && this.dispose()
                }
            }
        }, i.prototype.play = function (t, e) {
            if (void 0 === t && (t = null), void 0 === e && (e = -1), t) {
                for (var i = null, a = 0, n = this._config.clip.length; a < n; ++a) {
                    var r = this._config.clip[a];
                    r.name === t && (i = r)
                }
                i ? (this._clipConfig = i, this._clipArray = new Int16Array(this._groupConfig.arrayBuffer, this._groupConfig.offset + this._groupConfig.position[0] + this._clipConfig.p, this._clipConfig.s / this._groupConfig.position[2]), this._clipConfig.cacheRectangles || (this._clipConfig.cacheRectangles = []), this._isPlaying = !0, this._isStarted = !1, this._isCompleted = !1, e < 0 || e !== e ? this._playTimes = this._clipConfig.playTimes : this._playTimes = e, this._time = 0, this._currentTime = 0, this._currentPlayTimes = 0, this._cacheFrameIndex = -1, this._currentFrameConfig = null, this._cacheRectangle = null, this.clipTimeScale = 1 / this._clipConfig.scale) : console.warn("No clip in movie.", this._config.name, t)
            } else this._clipConfig ? this._isPlaying || this._isCompleted ? this.play(this._clipConfig.name, this._playTimes) : this._isPlaying = !0 : this._config.action && this.play(this._config.action, e)
        }, i.prototype.stop = function () {
            this._isPlaying = !1
        }, i.prototype.gotoAndPlay = function (t, e, i) {
            void 0 === t && (t = null), void 0 === i && (i = -1), e %= this._clipConfig.duration, e < 0 && (e += this._clipConfig.duration), this.play(t, i), this._time = e, this._currentTime = e
        }, i.prototype.gotoAndStop = function (t, e) {
            void 0 === t && (t = null), e %= this._clipConfig.duration, e < 0 && (e += this._clipConfig.duration), this.play(t, 1), this._time = e, this._currentTime = e, this.advanceTime(.001), this.stop()
        }, i.prototype.hasClip = function (t) {
            for (var e = 0, i = this._config.clip.length; e < i; ++e) {
                var a = this._config.clip[e];
                if (a.name === t) return !0
            }
            return !1
        }, Object.defineProperty(i.prototype, "isPlaying", {
            get: function () {
                return this._isPlaying && !this._isCompleted
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "isComplete", {
            get: function () {
                return this._isCompleted
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "currentTime", {
            get: function () {
                return this._currentTime
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "totalTime", {
            get: function () {
                return this._clipConfig ? this._clipConfig.duration : 0
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "currentPlayTimes", {
            get: function () {
                return this._currentPlayTimes
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "playTimes", {
            get: function () {
                return this._playTimes
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "groupName", {
            get: function () {
                return this._groupConfig.name
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "clipName", {
            get: function () {
                return this._clipConfig ? this._clipConfig.name : null
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "clipNames", {
            get: function () {
                return this._clipNames
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(i.prototype, "clock", {
            get: function () {
                return this._clock
            }, set: function (t) {
                if (this._clock !== t) {
                    var e = this._clock;
                    this._clock = t, e && e.remove(this), this._clock && this._clock.add(this)
                }
            }, enumerable: !0, configurable: !0
        }), i.prototype.advanceTimeBySelf = function (e) {
            e ? this.clock = t.EgretFactory._clock : this.clock = null
        }, i
    }(egret.DisplayObjectContainer);
    t.Movie = m
}(dragonBones || (dragonBones = {}));