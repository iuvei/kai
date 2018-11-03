function __extends(t, e) {
    function i() {
        this.constructor = t
    }

    for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
    i.prototype = e.prototype, t.prototype = new i
}

var egret;
!function (t) {
    function e() {
        return ""
    }

    function i(t) {
        throw new Error("#" + t)
    }

    function n() {
    }

    function s() {
    }

    function a() {
    }

    t.getString = e, t.$error = i, t.$warn = n, t.$markReadOnly = s, t.$markCannotUse = a
}(egret || (egret = {}));
var egret;
!function (t) {
    function e(t, e, i) {
        var n = t.prototype;
        n.__class__ = e;
        var s = [e];
        i && (s = s.concat(i));
        var a = n.__types__;
        if (n.__types__) for (var r = a.length, o = 0; r > o; o++) {
            var h = a[o];
            -1 == s.indexOf(h) && s.push(h)
        }
        n.__types__ = s
    }

    t.registerClass = e
}(egret || (egret = {}));
var __define = this.__define || function (t, e, i, n) {
    Object.defineProperty(t, e, {configurable: !0, enumerable: !0, get: i, set: n})
}, egret;
!function (t) {
    t.$hashCount = 1;
    var e = function () {
        function e() {
            this.$hashCode = t.$hashCount++
        }

        var i = __define, n = e, s = n.prototype;
        return i(s, "hashCode", function () {
            return this.$hashCode
        }), e
    }();
    t.HashObject = e, t.registerClass(e, "egret.HashObject", ["egret.IHashObject"])
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = [], i = function (i) {
        function n(t) {
            void 0 === t && (t = null), i.call(this), this.$EventDispatcher = {0: t ? t : this, 1: {}, 2: {}, 3: 0}
        }

        __extends(n, i);
        var s = n, a = s.prototype;
        return a.$getEventMap = function (t) {
            var e = this.$EventDispatcher, i = t ? e[2] : e[1];
            return i
        }, a.addEventListener = function (t, e, i, n, s) {
            this.$addListener(t, e, i, n, s)
        }, a.once = function (t, e, i, n, s) {
            this.$addListener(t, e, i, n, s, !0)
        }, a.$addListener = function (t, e, i, n, s, a) {
            var r = this.$EventDispatcher, o = n ? r[2] : r[1], h = o[t];
            h ? 0 !== r[3] && (o[t] = h = h.concat()) : h = o[t] = [], this.$insertEventBin(h, t, e, i, n, s, a)
        }, a.$insertEventBin = function (t, e, i, n, s, a, r) {
            a = 0 | +a;
            for (var o = -1, h = t.length, l = 0; h > l; l++) {
                var u = t[l];
                if (u.listener == i && u.thisObject == n && u.target == this) return !1;
                -1 == o && u.priority < a && (o = l)
            }
            var c = {type: e, listener: i, thisObject: n, priority: a, target: this, useCapture: s, dispatchOnce: !!r};
            return -1 !== o ? t.splice(o, 0, c) : t.push(c), !0
        }, a.removeEventListener = function (t, e, i, n) {
            var s = this.$EventDispatcher, a = n ? s[2] : s[1], r = a[t];
            r && (0 !== s[3] && (a[t] = r = r.concat()), this.$removeEventBin(r, e, i), 0 == r.length && (a[t] = null))
        }, a.$removeEventBin = function (t, e, i) {
            for (var n = t.length, s = 0; n > s; s++) {
                var a = t[s];
                if (a.listener == e && a.thisObject == i && a.target == this) return t.splice(s, 1), !0
            }
            return !1
        }, a.hasEventListener = function (t) {
            var e = this.$EventDispatcher;
            return !(!e[1][t] && !e[2][t])
        }, a.willTrigger = function (t) {
            return this.hasEventListener(t)
        }, a.dispatchEvent = function (t) {
            return t.$currentTarget = this.$EventDispatcher[0], t.$setTarget(t.$currentTarget), this.$notifyListener(t, !1)
        }, a.$notifyListener = function (t, i) {
            var n = this.$EventDispatcher, s = i ? n[2] : n[1], a = s[t.$type];
            if (!a) return !0;
            var r = a.length;
            if (0 == r) return !0;
            var o = e;
            n[3]++;
            for (var h = 0; r > h; h++) {
                var l = a[h];
                if (l.listener.call(l.thisObject, t), l.dispatchOnce && o.push(l), t.$isPropagationImmediateStopped) break
            }
            for (n[3]--; o.length;) l = o.pop(), l.target.removeEventListener(l.type, l.listener, l.thisObject, l.useCapture);
            return !t.$isDefaultPrevented
        }, a.dispatchEventWith = function (e, i, n) {
            if (i || this.hasEventListener(e)) {
                var s = t.Event.create(t.Event, e, i);
                s.data = n;
                var a = this.dispatchEvent(s);
                return t.Event.release(s), a
            }
            return !0
        }, n
    }(t.HashObject);
    t.EventDispatcher = i, t.registerClass(i, "egret.EventDispatcher", ["egret.IEventDispatcher"])
}(egret || (egret = {}));
var egret;
!function (t) {
    function e(t) {
        return t %= 360, t > 180 ? t -= 360 : -180 > t && (t += 360), t
    }

    var i = function (i) {
        function n() {
            i.call(this), this.$children = null, this.$parent = null, this.$stage = null, this.$nestLevel = 0, this.$visible = !0, this.$displayList = null, this.$alpha = 1, this.$touchEnabled = n.defaultTouchEnabled, this.$scrollRect = null, this.$blendMode = 0, this.$maskedObject = null, this.$mask = null, this.$maskRect = null, this.$parentDisplayList = null, this.$renderNode = null, this.$displayFlags = 2032, this.$DisplayObject = {
                0: 1,
                1: 1,
                2: 0,
                3: 0,
                4: 0,
                5: "",
                6: new t.Matrix,
                7: new t.Matrix,
                8: new t.Matrix,
                9: new t.Rectangle,
                10: new t.Rectangle,
                11: !1,
                12: 0,
                13: 0,
                14: NaN,
                15: NaN,
                16: 0,
                17: 0,
                18: 0
            }
        }

        __extends(n, i);
        var s = __define, a = n, r = a.prototype;
        return r.$setFlags = function (t) {
            this.$displayFlags |= t
        }, r.$removeFlags = function (t) {
            this.$displayFlags &= ~t
        }, r.$removeFlagsUp = function (t) {
            if (this.$hasAnyFlags(t)) {
                this.$removeFlags(t);
                var e = this.$parent;
                e && e.$removeFlagsUp(t)
            }
        }, r.$hasFlags = function (t) {
            return (this.$displayFlags & t) == t
        }, r.$propagateFlagsUp = function (t) {
            if (!this.$hasFlags(t)) {
                this.$setFlags(t);
                var e = this.$parent;
                e && e.$propagateFlagsUp(t)
            }
        }, r.$propagateFlagsDown = function (t) {
            this.$setFlags(t)
        }, r.$hasAnyFlags = function (t) {
            return !!(this.$displayFlags & t)
        }, r.invalidateMatrix = function () {
            this.$setFlags(8), this.invalidatePosition()
        }, r.invalidatePosition = function () {
            this.$invalidateTransform(), this.$propagateFlagsDown(48), this.$parent && this.$parent.$propagateFlagsUp(4)
        }, s(r, "name", function () {
            return this.$DisplayObject[5]
        }, function (t) {
            this.$DisplayObject[5] = t
        }), s(r, "parent", function () {
            return this.$parent
        }), r.$setParent = function (t) {
            return this.$parent != t && (this.$parent = t, !0)
        }, r.$onAddToStage = function (e, i) {
            this.$stage = e, this.$nestLevel = i, t.Sprite.$EVENT_ADD_TO_STAGE_LIST.push(this)
        }, r.$onRemoveFromStage = function () {
            this.$nestLevel = 0, t.Sprite.$EVENT_REMOVE_FROM_STAGE_LIST.push(this)
        }, s(r, "stage", function () {
            return this.$stage
        }), s(r, "matrix", function () {
            return this.$getMatrix().clone()
        }, function (t) {
            this.$setMatrix(t)
        }), r.$getMatrix = function () {
            var t = this.$DisplayObject;
            return this.$hasFlags(8) && (t[6].$updateScaleAndRotation(t[0], t[1], t[2], t[3]), this.$removeFlags(8)), t[6]
        }, r.$setMatrix = function (t, i) {
            void 0 === i && (i = !0);
            var n = this.$DisplayObject, s = n[6];
            return !s.equals(t) && (s.copyFrom(t), i && (n[0] = s.$getScaleX(), n[1] = s.$getScaleY(), n[2] = t.$getSkewX(), n[3] = t.$getSkewY(), n[16] = e(180 * n[2] / Math.PI), n[17] = e(180 * n[3] / Math.PI), n[4] = e(180 * n[3] / Math.PI)), this.$removeFlags(8), this.invalidatePosition(), !0)
        }, r.$getConcatenatedMatrix = function () {
            var e = this.$DisplayObject[7];
            if (this.$hasFlags(16)) {
                this.$parent ? this.$parent.$getConcatenatedMatrix().$preMultiplyInto(this.$getMatrix(), e) : e.copyFrom(this.$getMatrix());
                var i = this.$DisplayObject, n = i[12], s = i[13], a = this.$scrollRect;
                a ? e.$preMultiplyInto(t.$TempMatrix.setTo(1, 0, 0, 1, -a.x - n, -a.y - s), e) : (0 != n || 0 != s) && e.$preMultiplyInto(t.$TempMatrix.setTo(1, 0, 0, 1, -n, -s), e), this.$displayList && (this.$displayList.$renderNode.moved = !0), this.$renderNode && (this.$renderNode.moved = !0), this.$removeFlags(16)
            }
            return e
        }, r.$getInvertedConcatenatedMatrix = function () {
            var t = this.$DisplayObject;
            return this.$hasFlags(32) && (this.$getConcatenatedMatrix().$invertInto(t[8]), this.$removeFlags(32)), t[8]
        }, s(r, "x", function () {
            return this.$getX()
        }, function (t) {
            this.$setX(t)
        }), r.$getX = function () {
            return this.$DisplayObject[6].tx
        }, r.$setX = function (t) {
            t = +t || 0;
            var e = this.$DisplayObject[6];
            return t != e.tx && (e.tx = t, this.invalidatePosition(), !0)
        }, s(r, "y", function () {
            return this.$getY()
        }, function (t) {
            this.$setY(t)
        }), r.$getY = function () {
            return this.$DisplayObject[6].ty
        }, r.$setY = function (t) {
            t = +t || 0;
            var e = this.$DisplayObject[6];
            return t != e.ty && (e.ty = t, this.invalidatePosition(), !0)
        }, s(r, "scaleX", function () {
            return this.$getScaleX()
        }, function (t) {
            this.$setScaleX(t)
        }), r.$getScaleX = function () {
            return this.$DisplayObject[0]
        }, r.$setScaleX = function (t) {
            t = +t || 0;
            var e = this.$DisplayObject;
            return t != e[0] && (e[0] = t, this.invalidateMatrix(), !0)
        }, s(r, "scaleY", function () {
            return this.$getScaleY()
        }, function (t) {
            this.$setScaleY(t)
        }), r.$getScaleY = function () {
            return this.$DisplayObject[1]
        }, r.$setScaleY = function (t) {
            return t = +t || 0, t != this.$DisplayObject[1] && (this.$DisplayObject[1] = t, this.invalidateMatrix(), !0)
        }, s(r, "rotation", function () {
            return this.$getRotation()
        }, function (t) {
            this.$setRotation(t)
        }), r.$getRotation = function () {
            return this.$DisplayObject[4]
        }, r.$setRotation = function (t) {
            t = +t || 0, t = e(t);
            var i = this.$DisplayObject;
            if (t == i[4]) return !1;
            var n = t - i[4], s = n / 180 * Math.PI;
            return i[2] += s, i[3] += s, i[4] = t, this.invalidateMatrix(), !0
        }, s(r, "skewX", function () {
            return this.$DisplayObject[16]
        }, function (t) {
            this.$setSkewX(t)
        }), r.$setSkewX = function (t) {
            t = +t || 0;
            var i = this.$DisplayObject;
            return t != i[16] && (i[16] = t, t = e(t), t = t / 180 * Math.PI, i[2] = t, this.invalidateMatrix(), !0)
        }, s(r, "skewY", function () {
            return this.$DisplayObject[17]
        }, function (t) {
            this.$setSkewY(t)
        }), r.$setSkewY = function (t) {
            t = +t || 0;
            var i = this.$DisplayObject;
            return t != i[17] && (i[17] = t, t = e(t), t = t / 180 * Math.PI, i[3] = t, this.invalidateMatrix(), !0)
        }, s(r, "width", function () {
            return this.$getWidth()
        }, function (t) {
            this.$setWidth(t)
        }), r.$getWidth = function () {
            return isNaN(this.$getExplicitWidth()) ? this.$getOriginalBounds().width : this.$getExplicitWidth()
        }, r.$getExplicitWidth = function () {
            return this.$DisplayObject[14]
        }, r.$setWidth = function (t) {
            return this.$DisplayObject[14] = isNaN(t) ? NaN : t, t = +t, !(0 > t) && (this.invalidateMatrix(), !0)
        }, s(r, "height", function () {
            return this.$getHeight()
        }, function (t) {
            this.$setHeight(t)
        }), r.$getHeight = function () {
            return isNaN(this.$getExplicitHeight()) ? this.$getOriginalBounds().height : this.$getExplicitHeight()
        }, r.$getExplicitHeight = function () {
            return this.$DisplayObject[15]
        }, r.$setHeight = function (t) {
            return this.$DisplayObject[15] = isNaN(t) ? NaN : t, t = +t, !(0 > t) && (this.invalidateMatrix(), !0)
        }, s(r, "measuredWidth", function () {
            return this.$getOriginalBounds().width
        }), s(r, "measuredHeight", function () {
            return this.$getOriginalBounds().height
        }), s(r, "anchorOffsetX", function () {
            return this.$DisplayObject[12]
        }, function (t) {
            this.$setAnchorOffsetX(t)
        }), r.$setAnchorOffsetX = function (t) {
            return t = +t || 0, t != this.$DisplayObject[12] && (this.$DisplayObject[12] = t, this.invalidatePosition(), !0)
        }, s(r, "anchorOffsetY", function () {
            return this.$DisplayObject[13]
        }, function (t) {
            this.$setAnchorOffsetY(t)
        }), r.$setAnchorOffsetY = function (t) {
            return t = +t || 0, t != this.$DisplayObject[13] && (this.$DisplayObject[13] = t, this.invalidatePosition(), !0)
        }, s(r, "visible", function () {
            return this.$visible
        }, function (t) {
            this.$setVisible(t)
        }), r.$setVisible = function (t) {
            return t = !!t, t != this.$visible && (this.$visible = t, this.$propagateFlagsDown(1024), this.$invalidateTransform(), !0)
        }, r.$getConcatenatedVisible = function () {
            var t = this.$DisplayObject;
            if (this.$hasFlags(1024)) {
                if (this.$parent) {
                    var e = this.$parent.$getConcatenatedVisible();
                    t[19] = e && this.$visible
                } else t[19] = this.$visible;
                this.$removeFlags(1024)
            }
            return t[19]
        }, s(r, "cacheAsBitmap", function () {
            return this.$DisplayObject[11]
        }, function (e) {
            e = !!e, this.$DisplayObject[11] = e;
            var i = !!this.$displayList;
            if (i != e) if (e) {
                var n = t.sys.DisplayList.create(this);
                n && (this.$displayList = n, this.$parentDisplayList && this.$parentDisplayList.markDirty(n), this.$cacheAsBitmapChanged())
            } else this.$displayList = null, this.$cacheAsBitmapChanged()
        }), r.$cacheAsBitmapChanged = function () {
            var t = this.$displayList || this.$parentDisplayList;
            this.$renderNode && t.markDirty(this), this.$propagateFlagsDown(48)
        }, s(r, "alpha", function () {
            return this.$alpha
        }, function (t) {
            this.$setAlpha(t)
        }), r.$setAlpha = function (t) {
            return t = +t || 0, t != this.$alpha && (this.$alpha = t, this.$propagateFlagsDown(64), this.$invalidate(), !0)
        }, r.$getConcatenatedAlpha = function () {
            var t = this.$DisplayObject;
            if (this.$hasFlags(64)) {
                if (this.$parent) {
                    var e = this.$parent.$getConcatenatedAlpha();
                    t[18] = e * this.$alpha
                } else t[18] = this.$alpha;
                this.$removeFlags(64)
            }
            return t[18]
        }, s(r, "touchEnabled", function () {
            return this.$getTouchEnabled()
        }, function (t) {
            this.$setTouchEnabled(t)
        }), r.$getTouchEnabled = function () {
            return this.$touchEnabled
        }, r.$setTouchEnabled = function (t) {
            return this.$touchEnabled != t && (this.$touchEnabled = t, !0)
        }, s(r, "scrollRect", function () {
            return this.$scrollRect
        }, function (t) {
            this.$setScrollRect(t)
        }), r.$setScrollRect = function (e) {
            return !(!e && !this.$scrollRect) && (e ? (this.$scrollRect || (this.$scrollRect = new t.Rectangle), this.$scrollRect.copyFrom(e)) : this.$scrollRect = null, this.invalidatePosition(), !0)
        }, s(r, "blendMode", function () {
            return t.sys.numberToBlendMode(this.$blendMode)
        }, function (e) {
            var i = t.sys.blendModeToNumber(e);
            i != this.$blendMode && (this.$blendMode = i, this.$invalidateTransform())
        }), s(r, "mask", function () {
            return this.$mask ? this.$mask : this.$maskRect
        }, function (t) {
            if (t !== this) {
                if (t) if (t instanceof n) {
                    if (t == this.$mask) return;
                    t.$maskedObject && (t.$maskedObject.mask = null), t.$maskedObject = this, this.$mask = t, this.$maskRect = null
                } else this.$setMaskRect(t), this.$mask = null; else this.$mask = null, this.$maskRect = null;
                this.$invalidateTransform()
            }
        }), r.$setMaskRect = function (e) {
            return !(!e && !this.$maskRect) && (e ? (this.$maskRect || (this.$maskRect = new t.Rectangle), this.$maskRect.copyFrom(e)) : this.$maskRect = null, this.invalidatePosition(), !0)
        }, r.getTransformedBounds = function (t, e) {
            return t = t || this, this.$getTransformedBounds(t, e)
        }, r.getBounds = function (t, e) {
            if (void 0 === e && (e = !0), t = this.$getTransformedBounds(this, t), e) {
                var i = this.$DisplayObject;
                (0 != i[12] || 0 != i[13]) && (t.x -= i[12], t.y -= i[13])
            }
            return t
        }, r.$getTransformedBounds = function (e, i) {
            var n = this.$getOriginalBounds();
            if (i || (i = new t.Rectangle), i.copyFrom(n), e == this || i.isEmpty()) return i;
            var s;
            if (e) {
                s = t.$TempMatrix;
                var a = e.$getInvertedConcatenatedMatrix();
                a.$preMultiplyInto(this.$getConcatenatedMatrix(), s)
            } else s = this.$getConcatenatedMatrix();
            return s.$transformBounds(i), i
        }, r.globalToLocal = function (t, e, i) {
            void 0 === t && (t = 0), void 0 === e && (e = 0);
            var n = this.$getInvertedConcatenatedMatrix();
            return n.transformPoint(t, e, i)
        }, r.localToGlobal = function (t, e, i) {
            void 0 === t && (t = 0), void 0 === e && (e = 0);
            var n = this.$getConcatenatedMatrix();
            return n.transformPoint(t, e, i)
        }, r.$invalidateContentBounds = function () {
            this.$invalidate(), this.$setFlags(2), this.$propagateFlagsUp(4)
        }, r.$getOriginalBounds = function () {
            var t = this.$DisplayObject[9];
            return this.$hasFlags(4) && (t.copyFrom(this.$getContentBounds()), this.$measureChildBounds(t), this.$removeFlags(4), this.$displayList && (this.$displayList.$renderNode.moved = !0)), t
        }, r.$measureChildBounds = function (t) {
        }, r.$getContentBounds = function () {
            var t = this.$DisplayObject[10];
            return this.$hasFlags(2) && (this.$measureContentBounds(t), this.$renderNode && (this.$renderNode.moved = !0), this.$removeFlags(2)), t
        }, r.$measureContentBounds = function (t) {
        }, r.$invalidate = function (t) {
            if (this.$renderNode && !this.$hasFlags(256)) {
                this.$setFlags(384);
                var e = this.$displayList ? this.$displayList : this.$parentDisplayList;
                e && e.markDirty(this)
            }
        }, r.$invalidateTransform = function () {
            if (!this.$hasFlags(512)) {
                this.$setFlags(512);
                var t = this.$displayList;
                (t || this.$renderNode) && this.$parentDisplayList && this.$parentDisplayList.markDirty(t || this)
            }
        }, r.$getRenderNode = function () {
            var t = this.$renderNode;
            return t ? (128 & this.$displayFlags && (t.cleanBeforeRender(), this.$render(), this.$removeFlags(128)), t) : null
        }, r.$update = function (t) {
            this.$removeFlagsUp(768);
            var e = this.$renderNode, i = this.$getConcatenatedMatrix(), n = t || this.$getContentBounds();
            e.renderAlpha = this.$getConcatenatedAlpha(), e.renderVisible = this.$getConcatenatedVisible();
            var s = this.$displayList || this.$parentDisplayList, a = e.renderRegion;
            if (!s) return a.setTo(0, 0, 0, 0), e.moved = !1, !1;
            if (!e.moved) return !1;
            e.moved = !1;
            var r = e.renderMatrix;
            r.copyFrom(i);
            var o = s.root;
            return o !== this.$stage && this.$getConcatenatedMatrixAt(o, r), a.updateRegion(n, r), !0
        }, r.$getConcatenatedMatrixAt = function (e, i) {
            var n = e.$getInvertedConcatenatedMatrix();
            if (0 === n.a || 0 === n.d) {
                var s = this, a = e.$nestLevel;
                for (i.identity(); s.$nestLevel > a;) {
                    var r = s.$scrollRect;
                    r && i.concat(t.$TempMatrix.setTo(1, 0, 0, 1, -r.x, -r.y)), i.concat(s.$getMatrix()), s = s.$parent
                }
            } else n.$preMultiplyInto(i, i)
        }, r.$getConcatenatedAlphaAt = function (t, e) {
            var i = t.$getConcatenatedAlpha();
            if (0 === i) {
                e = 1;
                for (var n = this, s = t.$nestLevel; n.$nestLevel > s;) e *= n.$alpha, n = n.$parent
            } else e /= i;
            return e
        }, r.$render = function () {
        }, r.$hitTest = function (t, e) {
            var i = this.$DisplayObject;
            if (!this.$renderNode || !this.$visible || 0 == i[0] || 0 == i[1]) return null;
            var n = this.$getInvertedConcatenatedMatrix();
            if (0 == n.a && 0 == n.b && 0 == n.c && 0 == n.d) return null;
            var s = this.$getContentBounds(), a = n.a * t + n.c * e + n.tx, r = n.b * t + n.d * e + n.ty;
            if (s.contains(a, r)) {
                if (!this.$children) {
                    var o = this.$scrollRect ? this.$scrollRect : this.$maskRect;
                    if (o && !o.contains(a, r)) return null;
                    if (this.$mask && !this.$mask.$hitTest(t, e)) return null
                }
                return this
            }
            return null
        }, r.hitTestPoint = function (e, i, n) {
            if (n) {
                var s, a = this.$getInvertedConcatenatedMatrix(), r = a.a * e + a.c * i + a.tx,
                    o = a.b * e + a.d * i + a.ty, h = this.$displayList;
                if (h) {
                    var l = h.renderBuffer;
                    try {
                        s = l.getPixel(r - h.offsetX, o - h.offsetY)
                    } catch (u) {
                        throw new Error(t.sys.tr(1039))
                    }
                } else {
                    var l = t.sys.hitTestBuffer;
                    l.resize(3, 3);
                    var c = t.Matrix.create();
                    c.identity(), c.translate(1 - r, 1 - o), t.sys.systemRenderer.render(this, l, c, null, !0), t.Matrix.release(c);
                    try {
                        s = l.getPixel(1, 1)
                    } catch (u) {
                        throw new Error(t.sys.tr(1039))
                    }
                }
                return 0 !== s[3]
            }
            var d = this.$DisplayObject;
            if (0 == d[0] || 0 == d[1]) return !1;
            var a = this.$getInvertedConcatenatedMatrix(), f = this.getBounds(null, !1), r = a.a * e + a.c * i + a.tx,
                o = a.b * e + a.d * i + a.ty;
            if (f.contains(r, o)) {
                var g = this.$scrollRect ? this.$scrollRect : this.$maskRect;
                return !(g && !g.contains(r, o))
            }
            return !1
        }, r.$addListener = function (e, s, a, r, o, h) {
            i.prototype.$addListener.call(this, e, s, a, r, o, h);
            var l = e == t.Event.ENTER_FRAME;
            if (l || e == t.Event.RENDER) {
                var u = l ? n.$enterFrameCallBackList : n.$renderCallBackList;
                -1 == u.indexOf(this) && u.push(this)
            }
        }, r.removeEventListener = function (e, s, a, r) {
            i.prototype.removeEventListener.call(this, e, s, a, r);
            var o = e == t.Event.ENTER_FRAME;
            if ((o || e == t.Event.RENDER) && !this.hasEventListener(e)) {
                var h = o ? n.$enterFrameCallBackList : n.$renderCallBackList, l = h.indexOf(this);
                -1 !== l && h.splice(l, 1)
            }
        }, r.dispatchEvent = function (t) {
            if (!t.$bubbles) return i.prototype.dispatchEvent.call(this, t);
            var e = this.$getPropagationList(this), n = .5 * e.length;
            return t.$setTarget(this), this.$dispatchPropagationEvent(t, e, n), !t.$isDefaultPrevented
        }, r.$getPropagationList = function (t) {
            for (var e = []; t;) e.push(t), t = t.$parent;
            var i = e.concat();
            return i.reverse(), e = i.concat(e)
        }, r.$dispatchPropagationEvent = function (t, e, i) {
            for (var n = e.length, s = i - 1, a = 0; n > a; a++) {
                var r = e[a];
                if (t.$currentTarget = r, s > a ? t.$eventPhase = 1 : a == i || a == s ? t.$eventPhase = 2 : t.$eventPhase = 3, r.$notifyListener(t, i > a), t.$isPropagationStopped || t.$isPropagationImmediateStopped) return
            }
        }, r.willTrigger = function (t) {
            for (var e = this; e;) {
                if (e.hasEventListener(t)) return !0;
                e = e.$parent
            }
            return !1
        }, n.defaultTouchEnabled = !1, n.$enterFrameCallBackList = [], n.$renderCallBackList = [], n
    }(t.EventDispatcher);
    t.DisplayObject = i, t.registerClass(i, "egret.DisplayObject", ["egret.sys.Renderable"])
}(egret || (egret = {}));
var egret;
!function (t) {
    function e(t, e, i, n, s, a, r, o, h, l, u, c) {
        void 0 === u && (u = 0), void 0 === c && (c = 0);
        var d = r + s - h;
        d > 0 && (s -= d), d = o + a - l, d > 0 && (a -= d), t.drawImage(i, n, s / e, a / e, u + r, c + o, s, a)
    }

    var i = function (i) {
        function n(e) {
            i.call(this), this.$scale9Grid = null, this.$fillMode = "scale", this._pixelHitTest = !1, this.$renderNode = new t.sys.BitmapNode, this.$Bitmap = {
                0: null,
                1: null,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
                8: 0,
                9: 0,
                10: n.defaultSmoothing,
                11: NaN,
                12: NaN
            }, this.$setBitmapData(e)
        }

        __extends(n, i);
        var s = __define, a = n, r = a.prototype;
        return r.$onAddToStage = function (e, n) {
            i.prototype.$onAddToStage.call(this, e, n);
            var s = this.$Bitmap[0];
            s && t.Texture.$addDisplayObject(this, s)
        }, r.$onRemoveFromStage = function () {
            i.prototype.$onRemoveFromStage.call(this);
            var e = this.$Bitmap[0];
            e && t.Texture.$removeDisplayObject(this, e)
        }, s(r, "bitmapData", function () {
            var e = this.$Bitmap[0];
            return e instanceof t.Texture ? null : e
        }, function (t) {
            this.$setBitmapData(t)
        }), s(r, "texture", function () {
            var e = this.$Bitmap[0];
            return e instanceof t.Texture ? e : null
        }, function (t) {
            this.$setBitmapData(t)
        }), r.$setBitmapData = function (e) {
            var i = this.$Bitmap, n = i[0];
            return e != n && (i[0] = e, e ? (this.$refreshImageData(), this.$stage && (n && t.Texture.$removeDisplayObject(this, n), t.Texture.$addDisplayObject(this, e)), this.$invalidateContentBounds(), !0) : (this.setImageData(null, 0, 0, 0, 0, 0, 0, 0, 0), this.$invalidateContentBounds(), !0))
        }, r.$refreshImageData = function () {
            var e = this.$Bitmap, i = e[0];
            if (i) if (i instanceof t.Texture) {
                var n = i;
                this.setImageData(n._bitmapData, n._bitmapX, n._bitmapY, n._bitmapWidth, n._bitmapHeight, n._offsetX, n._offsetY, n.$getTextureWidth(), n.$getTextureHeight())
            } else this.setImageData(i, 0, 0, i.width, i.height, 0, 0, i.width, i.height)
        }, r.setImageData = function (t, e, i, n, s, a, r, o, h) {
            var l = this.$Bitmap;
            l[1] = t, l[2] = e, l[3] = i, l[4] = n, l[5] = s, l[6] = a, l[7] = r, l[8] = o, l[9] = h
        }, s(r, "scale9Grid", function () {
            return this.$scale9Grid
        }, function (t) {
            this.$scale9Grid = t, this.$invalidateContentBounds()
        }), s(r, "fillMode", function () {
            return this.$fillMode
        }, function (t) {
            this.$setFillMode(t)
        }), r.$setFillMode = function (t) {
            return t != this.$fillMode && (this.$fillMode = t, !0)
        }, s(r, "smoothing", function () {
            var t = this.$Bitmap;
            return t[10]
        }, function (t) {
            t = !!t;
            var e = this.$Bitmap;
            t != e[10] && (e[10] = t, this.$invalidate())
        }), r.$setWidth = function (t) {
            var e = this.$Bitmap;
            return !(0 > t || t == e[11]) && (e[11] = t, this.$invalidateContentBounds(), !0)
        }, r.$setHeight = function (t) {
            var e = this.$Bitmap;
            return !(0 > t || t == e[12]) && (e[12] = t, this.$invalidateContentBounds(), !0)
        }, r.$getWidth = function () {
            var t = this.$Bitmap;
            return isNaN(t[11]) ? this.$getContentBounds().width : t[11]
        }, r.$getHeight = function () {
            var t = this.$Bitmap;
            return isNaN(t[12]) ? this.$getContentBounds().height : t[12]
        }, r.$measureContentBounds = function (t) {
            var e = this.$Bitmap;
            if (e[1]) {
                var e = this.$Bitmap, i = isNaN(e[11]) ? e[8] : e[11], n = isNaN(e[12]) ? e[9] : e[12];
                t.setTo(0, 0, i, n)
            } else i = isNaN(e[11]) ? 0 : e[11], n = isNaN(e[12]) ? 0 : e[12], t.setTo(0, 0, i, n)
        }, r.$render = function () {
            var t = this.$Bitmap;
            if (t[1]) {
                var e = isNaN(t[11]) ? t[8] : t[11], i = isNaN(t[12]) ? t[9] : t[12];
                n.$drawImage(this.$renderNode, t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8], t[9], e, i, this.scale9Grid || t[0].scale9Grid, this.fillMode, t[10])
            }
        }, s(r, "pixelHitTest", function () {
            return this._pixelHitTest
        }, function (t) {
            this._pixelHitTest = !!t
        }), r.$hitTest = function (t, e) {
            var n = i.prototype.$hitTest.call(this, t, e);
            return n && this._pixelHitTest && (n = this.hitTestPixel(t, e)), n
        }, r.hitTestPixel = function (e, i) {
            var n, s = this.$getInvertedConcatenatedMatrix(), a = s.a * e + s.c * i + s.tx,
                r = s.b * e + s.d * i + s.ty, o = this.$displayList;
            if (o) {
                var h = o.renderBuffer;
                try {
                    n = h.getPixel(a - o.offsetX, r - o.offsetY)
                } catch (l) {
                    throw console.log(this.$Bitmap[0]), new Error(t.sys.tr(1039))
                }
            } else {
                var h = t.sys.hitTestBuffer;
                h.resize(3, 3);
                var u = this.$getRenderNode(), c = t.Matrix.create();
                c.identity(), c.translate(1 - a, 1 - r), t.sys.systemRenderer.drawNodeToBuffer(u, h, c, !0), t.Matrix.release(c);
                try {
                    n = h.getPixel(1, 1)
                } catch (l) {
                    throw console.log(this.$Bitmap[0]), new Error(t.sys.tr(1039))
                }
            }
            return 0 === n[3] ? null : this
        }, n.$drawImage = function (i, s, a, r, o, h, l, u, c, d, f, g, p, _, m) {
            if (s) {
                var v = t.$TextureScaleFactor;
                if (i.smoothing = m, i.image = s, p) n.drawScale9GridImage(i, p, a, r, o, h, l, u, c, d, f, g); else if (_ == t.BitmapFillMode.SCALE) {
                    var T = f / c, y = g / d;
                    i.drawImage(a, r, o, h, l * T, u * y, T * o, y * h)
                } else if (_ == t.BitmapFillMode.CLIP) {
                    var E = Math.min(c, f), x = Math.min(d, g), b = o * v, D = h * v;
                    e(i, v, a, r, b, D, l, u, E, x)
                } else for (var b = o * v, D = h * v, S = 0; f > S; S += c) for (var C = 0; g > C; C += d) {
                    var E = Math.min(f - S, c), x = Math.min(g - C, d);
                    e(i, v, a, r, b, D, l, u, E, x, S, C)
                }
            }
        }, n.drawScale9GridImage = function (e, i, n, s, a, r, o, h, l, u, c, d) {
            var f = a, g = r;
            c -= l - a * t.$TextureScaleFactor, d -= u - r * t.$TextureScaleFactor;
            var p = i.x - o, _ = i.y - h, m = p / t.$TextureScaleFactor, v = _ / t.$TextureScaleFactor,
                T = i.width / t.$TextureScaleFactor, y = i.height / t.$TextureScaleFactor;
            0 == y && (y = 1, v >= g && v--), 0 == T && (T = 1, m >= f && m--);
            var E = n, x = E + m, b = x + T, D = f - m - T, S = s, C = S + v, w = C + y, L = g - v - y,
                $ = D * t.$TextureScaleFactor, A = L * t.$TextureScaleFactor;
            if ((m + D) * t.$TextureScaleFactor > c || (v + L) * t.$TextureScaleFactor > d) return void e.drawImage(n, s, a, r, o, h, c, d);
            var O = o, M = O + p, I = O + (c - $), F = c - p - $, P = h, R = P + _, B = P + d - A, N = d - _ - A;
            v > 0 && (m > 0 && e.drawImage(E, S, m, v, O, P, p, _), T > 0 && e.drawImage(x, S, T, v, M, P, F, _), D > 0 && e.drawImage(b, S, D, v, I, P, $, _)), y > 0 && (m > 0 && e.drawImage(E, C, m, y, O, R, p, N), T > 0 && e.drawImage(x, C, T, y, M, R, F, N), D > 0 && e.drawImage(b, C, D, y, I, R, $, N)), L > 0 && (m > 0 && e.drawImage(E, w, m, L, O, B, p, A), T > 0 && e.drawImage(x, w, T, L, M, B, F, A), D > 0 && e.drawImage(b, w, D, L, I, B, $, A))
        }, n.defaultSmoothing = !0, n
    }(t.DisplayObject);
    t.Bitmap = i, t.registerClass(i, "egret.Bitmap")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function () {
        function t() {
        }

        var e = t;
        return e.prototype, t.REPEAT = "repeat", t.SCALE = "scale", t.CLIP = "clip", t
    }();
    t.BitmapFillMode = e, t.registerClass(e, "egret.BitmapFillMode")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function () {
        function t() {
        }

        var e = t;
        return e.prototype, t.NORMAL = "normal", t.ADD = "add", t.ERASE = "erase", t
    }();
    t.BlendMode = e, t.registerClass(e, "egret.BlendMode")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (t) {
        function e(t) {
            var e = s[t];
            return void 0 === e ? 0 : e
        }

        function i(t) {
            var e = n[t];
            return void 0 === e ? "normal" : e
        }

        for (var n = ["normal", "add", "erase"], s = {}, a = n.length, r = 0; a > r; r++) {
            var o = n[r];
            s[o] = r
        }
        t.blendModeToNumber = e, t.numberToBlendMode = i
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function () {
        function t() {
        }

        var e = t;
        return e.prototype, t.NONE = "none", t.ROUND = "round", t.SQUARE = "square", t
    }();
    t.CapsStyle = e, t.registerClass(e, "egret.CapsStyle")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function () {
        function t() {
        }

        var e = t;
        return e.prototype, t.OFF = "off", t.ON = "on", t
    }();
    t.DirtyRegionPolicy = e, t.registerClass(e, "egret.DirtyRegionPolicy")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function (e) {
        function i() {
            e.call(this), this.$touchChildren = !0, this.$children = []
        }

        __extends(i, e);
        var n = __define, s = i, a = s.prototype;
        return a.$propagateFlagsDown = function (t) {
            if (!this.$hasFlags(t)) {
                this.$setFlags(t);
                for (var e = this.$children, i = 0; i < e.length; i++) e[i].$propagateFlagsDown(t)
            }
        }, n(a, "numChildren", function () {
            return this.$children.length
        }), a.addChild = function (t) {
            var e = this.$children.length;
            return t.$parent == this && e--, this.$doAddChild(t, e)
        }, a.addChildAt = function (t, e) {
            return e = 0 | +e, (0 > e || e >= this.$children.length) && (e = this.$children.length, t.$parent == this && e--), this.$doAddChild(t, e)
        }, a.$doAddChild = function (e, n, s) {
            void 0 === s && (s = !0);
            var a = e.$parent;
            if (a == this) return this.doSetChildIndex(e, n), e;
            a && a.removeChild(e), this.$children.splice(n, 0, e), e.$setParent(this);
            var r = this.$stage;
            if (r && e.$onAddToStage(r, this.$nestLevel + 1), s && e.dispatchEventWith(t.Event.ADDED, !0), r) for (var o = i.$EVENT_ADD_TO_STAGE_LIST; o.length;) {
                var h = o.shift();
                h.$stage && s && h.dispatchEventWith(t.Event.ADDED_TO_STAGE)
            }
            var l = this.$displayList || this.$parentDisplayList;
            return this.assignParentDisplayList(e, l, l), e.$propagateFlagsDown(1648), this.$propagateFlagsUp(4), this.$childAdded(e, n), e
        }, a.contains = function (t) {
            for (; t;) {
                if (t == this) return !0;
                t = t.$parent
            }
            return !1
        }, a.getChildAt = function (t) {
            return t = 0 | +t, t >= 0 && t < this.$children.length ? this.$children[t] : null
        }, a.getChildIndex = function (t) {
            return this.$children.indexOf(t)
        }, a.getChildByName = function (t) {
            for (var e, i = this.$children, n = i.length, s = 0; n > s; s++) if (e = i[s], e.name == t) return e;
            return null
        }, a.removeChild = function (t) {
            var e = this.$children.indexOf(t);
            return e >= 0 ? this.$doRemoveChild(e) : null
        }, a.removeChildAt = function (t) {
            return t = 0 | +t, t >= 0 && t < this.$children.length ? this.$doRemoveChild(t) : null
        }, a.$doRemoveChild = function (e, n) {
            void 0 === n && (n = !0), e = 0 | +e;
            var s = this.$children, a = s[e];
            if (this.$childRemoved(a, e), n && a.dispatchEventWith(t.Event.REMOVED, !0), this.$stage) {
                a.$onRemoveFromStage();
                for (var r = i.$EVENT_REMOVE_FROM_STAGE_LIST; r.length > 0;) {
                    var o = r.shift();
                    n && o.dispatchEventWith(t.Event.REMOVED_FROM_STAGE), o.$stage = null
                }
            }
            var h = this.$displayList || this.$parentDisplayList;
            this.assignParentDisplayList(a, h, null), a.$propagateFlagsDown(1648), a.$setParent(null);
            var l = s.indexOf(a);
            return s.splice(l, 1), this.$propagateFlagsUp(4), a
        }, a.setChildIndex = function (t, e) {
            e = 0 | +e, (0 > e || e >= this.$children.length) && (e = this.$children.length - 1), this.doSetChildIndex(t, e)
        }, a.doSetChildIndex = function (t, e) {
            var i = this.$children.indexOf(t);
            i != e && (this.$childRemoved(t, i), this.$children.splice(i, 1), this.$children.splice(e, 0, t), this.$childAdded(t, e), t.$invalidateTransform(), this.$propagateFlagsUp(4))
        }, a.swapChildrenAt = function (t, e) {
            t = 0 | +t, e = 0 | +e, t >= 0 && t < this.$children.length && e >= 0 && e < this.$children.length && this.doSwapChildrenAt(t, e)
        }, a.swapChildren = function (t, e) {
            var i = this.$children.indexOf(t), n = this.$children.indexOf(e);
            -1 == i || -1 == n || this.doSwapChildrenAt(i, n)
        }, a.doSwapChildrenAt = function (t, e) {
            if (t > e) {
                var i = e;
                e = t, t = i
            } else if (t == e) return;
            var n = this.$children, s = n[t], a = n[e];
            this.$childRemoved(s, t), this.$childRemoved(a, e), n[t] = a, n[e] = s, this.$childAdded(a, t), this.$childAdded(s, e), s.$invalidateTransform(), a.$invalidateTransform(), this.$propagateFlagsUp(4)
        }, a.removeChildren = function () {
            for (var t = this.$children, e = t.length - 1; e >= 0; e--) this.$doRemoveChild(e)
        }, a.$childAdded = function (t, e) {
        }, a.$childRemoved = function (t, e) {
        }, a.$onAddToStage = function (t, i) {
            e.prototype.$onAddToStage.call(this, t, i);
            var n = this.$children, s = n.length;
            i++;
            for (var a = 0; s > a; a++) {
                var r = this.$children[a];
                r.$onAddToStage(t, i)
            }
        }, a.$onRemoveFromStage = function () {
            e.prototype.$onRemoveFromStage.call(this);
            for (var t = this.$children, i = t.length, n = 0; i > n; n++) {
                var s = t[n];
                s.$onRemoveFromStage()
            }
        }, a.$measureChildBounds = function (e) {
            var i = this.$children, n = i.length;
            if (0 != n) {
                for (var s = 0, a = 0, r = 0, o = 0, h = !1, l = -1; n > l; l++) {
                    var u = -1 == l ? e : i[l].$getTransformedBounds(this, t.$TempRectangle);
                    u.isEmpty() || (h ? (s = Math.min(s, u.x), a = Math.max(a, u.x + u.width), r = Math.min(r, u.y), o = Math.max(o, u.y + u.height)) : (h = !0, s = u.x, a = s + u.width, r = u.y, o = r + u.height))
                }
                e.setTo(s, r, a - s, o - r)
            }
        }, n(a, "touchChildren", function () {
            return this.$getTouchChildren()
        }, function (t) {
            this.$setTouchChildren(!!t)
        }), a.$getTouchChildren = function () {
            return this.$touchChildren
        }, a.$setTouchChildren = function (t) {
            return this.$touchChildren != t && (this.$touchChildren = t, !0)
        }, a.$invalidate = function (t) {
            if (e.prototype.$invalidate.call(this, t), t) {
                var i = this.$displayList || this.$parentDisplayList, n = this.$children;
                if (n) for (var s = n.length - 1; s >= 0; s--) this.markChildDirty(n[s], i)
            }
        }, a.$invalidateTransform = function () {
            this.markChildDirty(this, this.$parentDisplayList)
        }, a.markChildDirty = function (t, e) {
            if (!t.$hasFlags(512)) {
                t.$setFlags(512);
                var i = t.$displayList;
                if ((i || t.$renderNode) && e && e.markDirty(i || t), !i) {
                    var n = t.$children;
                    if (n) for (var s = n.length - 1; s >= 0; s--) this.markChildDirty(n[s], e)
                }
            }
        }, a.$cacheAsBitmapChanged = function () {
            e.prototype.$cacheAsBitmapChanged.call(this);
            for (var t = this.$displayList || this.$parentDisplayList, i = this.$children, n = i.length - 1; n >= 0; n--) this.assignParentDisplayList(i[n], t, t)
        }, a.assignParentDisplayList = function (t, e, i) {
            t.$parentDisplayList = i, t.$setFlags(512);
            var n = t.$displayList;
            if ((t.$renderNode || n) && e && e.markDirty(n || t), !n) {
                var s = t.$children;
                if (s) for (var a = s.length - 1; a >= 0; a--) this.assignParentDisplayList(s[a], e, i)
            }
        }, a.$hitTest = function (t, i) {
            if (!this.$visible) return null;
            var n = this.$getInvertedConcatenatedMatrix(), s = n.a * t + n.c * i + n.tx, a = n.b * t + n.d * i + n.ty,
                r = this.$scrollRect ? this.$scrollRect : this.$maskRect;
            if (r && !r.contains(s, a)) return null;
            if (this.$mask && !this.$mask.$hitTest(t, i)) return null;
            for (var o = this.$children, h = !1, l = o.length - 1; l >= 0; l--) {
                var u = o[l];
                if (!u.$maskedObject) {
                    var c = u.$hitTest(t, i);
                    if (c) {
                        if (h = !0, c.$touchEnabled) break;
                        c = null
                    }
                }
            }
            return c ? this.$touchChildren ? c : this : h ? this : e.prototype.$hitTest.call(this, t, i)
        }, a.$setAlpha = function (t) {
            return t = +t || 0, t != this.$alpha && (this.$alpha = t, this.$propagateFlagsDown(64), this.$invalidate(), this.$invalidateAllChildren(), !0)
        }, a.$invalidateAllChildren = function () {
            var t = this.$children;
            if (t) for (var e = t.length - 1; e >= 0; e--) {
                var i = t[e];
                i.$invalidate(), i.$children && i.$invalidateAllChildren()
            }
        }, i.$EVENT_ADD_TO_STAGE_LIST = [], i.$EVENT_REMOVE_FROM_STAGE_LIST = [], i
    }(t.DisplayObject);
    t.DisplayObjectContainer = e, t.registerClass(e, "egret.DisplayObjectContainer")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function () {
        function t() {
        }

        var e = t;
        return e.prototype, t.LINEAR = "linear", t.RADIAL = "radial", t
    }();
    t.GradientType = e, t.registerClass(e, "egret.GradientType")
}(egret || (egret = {}));
var egret;
!function (t) {
    function e(t) {
        return t %= 2 * Math.PI, 0 > t && (t += 2 * Math.PI), t
    }

    var i = function (i) {
        function n() {
            i.call(this), this.lastX = 0, this.lastY = 0, this.fillPath = null, this.strokePath = null, this.topLeftStrokeWidth = 0, this.bottomRightStrokeWidth = 0, this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -(1 / 0), this.maxY = -(1 / 0), this.includeLastPosition = !0, this.$renderNode = new t.sys.GraphicsNode
        }

        __extends(n, i);
        var s = n, a = s.prototype;
        return a.$setTarget = function (t) {
            this.targetDisplay && (this.targetDisplay.$renderNode = null), t.$renderNode = this.$renderNode, this.targetDisplay = t
        }, a.setStrokeWidth = function (t) {
            switch (t) {
                case 1:
                    this.topLeftStrokeWidth = 0, this.bottomRightStrokeWidth = 1;
                    break;
                case 3:
                    this.topLeftStrokeWidth = 1, this.bottomRightStrokeWidth = 2;
                    break;
                default:
                    var e = 0 | Math.ceil(.5 * t);
                    this.topLeftStrokeWidth = e, this.bottomRightStrokeWidth = e
            }
        }, a.beginFill = function (t, e) {
            void 0 === e && (e = 1), t = +t || 0, e = +e || 0, this.fillPath = this.$renderNode.beginFill(t, e, this.strokePath), this.fillPath.moveTo(this.lastX, this.lastY)
        }, a.beginGradientFill = function (t, e, i, n, s) {
            void 0 === s && (s = null), this.fillPath = this.$renderNode.beginGradientFill(t, e, i, n, s, this.strokePath), this.fillPath.moveTo(this.lastX, this.lastY);
        }, a.endFill = function () {
            this.fillPath = null
        }, a.lineStyle = function (t, e, i, n, s, a, r, o) {
            void 0 === t && (t = NaN), void 0 === e && (e = 0), void 0 === i && (i = 1), void 0 === n && (n = !1), void 0 === s && (s = "normal"), void 0 === a && (a = null), void 0 === r && (r = null), void 0 === o && (o = 3), t = +t || 0, 0 >= t ? (this.strokePath = null, this.setStrokeWidth(0)) : (e = +e || 0, i = +i || 0, o = +o || 0, this.setStrokeWidth(t), this.strokePath = this.$renderNode.lineStyle(t, e, i, a, r, o), this.strokePath.moveTo(this.lastX, this.lastY))
        }, a.drawRect = function (t, e, i, n) {
            t = +t || 0, e = +e || 0, i = +i || 0, n = +n || 0;
            var s = this.fillPath, a = this.strokePath;
            s && s.drawRect(t, e, i, n), a && a.drawRect(t, e, i, n), this.extendBoundsByPoint(t + i, e + n), this.updatePosition(t, e)
        }, a.drawRoundRect = function (t, e, i, n, s, a) {
            t = +t || 0, e = +e || 0, i = +i || 0, n = +n || 0, s = +s || 0, a = +a || 0;
            var r = this.fillPath, o = this.strokePath;
            r && r.drawRoundRect(t, e, i, n, s, a), o && o.drawRoundRect(t, e, i, n, s, a);
            var h = .5 * s | 0, l = a ? .5 * a | 0 : h, u = t + i, c = e + n, d = c - l;
            this.extendBoundsByPoint(t, e), this.extendBoundsByPoint(u, c), this.updatePosition(u, d)
        }, a.drawCircle = function (t, e, i) {
            t = +t || 0, e = +e || 0, i = +i || 0;
            var n = this.fillPath, s = this.strokePath;
            n && n.drawCircle(t, e, i), s && s.drawCircle(t, e, i), this.extendBoundsByPoint(t - i, e - i), this.extendBoundsByPoint(t + i, e + i), this.updatePosition(t + i, e)
        }, a.drawEllipse = function (t, e, i, n) {
            t = +t || 0, e = +e || 0, i = +i || 0, n = +n || 0;
            var s = this.fillPath, a = this.strokePath;
            s && s.drawEllipse(t, e, i, n), a && a.drawEllipse(t, e, i, n), this.extendBoundsByPoint(t + i, e + n), this.updatePosition(t, e)
        }, a.moveTo = function (t, e) {
            t = +t || 0, e = +e || 0;
            var i = this.fillPath, n = this.strokePath;
            i && i.moveTo(t, e), n && n.moveTo(t, e), this.includeLastPosition = !1, this.lastX = t, this.lastY = e
        }, a.lineTo = function (t, e) {
            t = +t || 0, e = +e || 0;
            var i = this.fillPath, n = this.strokePath;
            i && i.lineTo(t, e), n && n.lineTo(t, e), this.updatePosition(t, e)
        }, a.curveTo = function (t, e, i, n) {
            t = +t || 0, e = +e || 0, i = +i || 0, n = +n || 0;
            var s = this.fillPath, a = this.strokePath;
            s && s.curveTo(t, e, i, n), a && a.curveTo(t, e, i, n), this.extendBoundsByPoint(t, e), this.extendBoundsByPoint(i, n), this.updatePosition(i, n)
        }, a.cubicCurveTo = function (t, e, i, n, s, a) {
            t = +t || 0, e = +e || 0, i = +i || 0, n = +n || 0, s = +s || 0, a = +a || 0;
            var r = this.fillPath, o = this.strokePath;
            r && r.cubicCurveTo(t, e, i, n, s, a), o && o.cubicCurveTo(t, e, i, n, s, a), this.extendBoundsByPoint(t, e), this.extendBoundsByPoint(i, n), this.extendBoundsByPoint(s, a), this.updatePosition(s, a)
        }, a.drawArc = function (i, n, s, a, r, o) {
            if (!(0 > s || a === r)) {
                i = +i || 0, n = +n || 0, s = +s || 0, a = +a || 0, r = +r || 0, o = !!o, a = e(a), r = e(r);
                var h = this.fillPath, l = this.strokePath;
                h && h.drawArc(i, n, s, a, r, o), l && l.drawArc(i, n, s, a, r, o), o ? this.arcBounds(i, n, s, r, a) : this.arcBounds(i, n, s, a, r);
                var u = i + t.$cos(r) * s, c = n + t.$sin(r) * s;
                this.updatePosition(u, c)
            }
        }, a.arcBounds = function (t, e, i, n, s) {
            var a = Math.PI;
            if (Math.abs(n - s) < .01) return this.extendBoundsByPoint(t - i, e - i), void this.extendBoundsByPoint(t + i, e + i);
            n > s && (s += 2 * a);
            for (var r = Math.cos(n) * i, o = Math.cos(s) * i, h = Math.min(r, o), l = Math.max(r, o), u = Math.sin(n) * i, c = Math.sin(s) * i, d = Math.min(u, c), f = Math.max(u, c), g = n / (.5 * a), p = s / (.5 * a), _ = Math.ceil(g); p >= _; _++) switch (_ % 4) {
                case 0:
                    l = i;
                    break;
                case 1:
                    f = i;
                    break;
                case 2:
                    h = -i;
                    break;
                case 3:
                    d = -i
            }
            h = Math.floor(h), d = Math.floor(d), l = Math.ceil(l), f = Math.ceil(f), this.extendBoundsByPoint(h + t, d + e), this.extendBoundsByPoint(l + t, f + e)
        }, a.clear = function () {
            this.$renderNode.clear(), this.updatePosition(0, 0), this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -(1 / 0), this.maxY = -(1 / 0)
        }, a.extendBoundsByPoint = function (t, e) {
            this.extendBoundsByX(t), this.extendBoundsByY(e)
        }, a.extendBoundsByX = function (t) {
            this.minX = Math.min(this.minX, t - this.topLeftStrokeWidth), this.maxX = Math.max(this.maxX, t + this.bottomRightStrokeWidth)
        }, a.extendBoundsByY = function (t) {
            this.minY = Math.min(this.minY, t - this.topLeftStrokeWidth), this.maxY = Math.max(this.maxY, t + this.bottomRightStrokeWidth)
        }, a.updatePosition = function (t, e) {
            this.includeLastPosition || (this.extendBoundsByPoint(this.lastX, this.lastY), this.includeLastPosition = !0), this.lastX = t, this.lastY = e, this.extendBoundsByPoint(t, e), this.targetDisplay.$invalidateContentBounds()
        }, a.$measureContentBounds = function (t) {
            this.minX === 1 / 0 ? t.setEmpty() : t.setTo(this.minX, this.minY, this.maxX - this.minX, this.maxY - this.minY)
        }, a.$hitTest = function (e, i) {
            var n = this.targetDisplay, s = n.$getInvertedConcatenatedMatrix(), a = s.a * e + s.c * i + s.tx,
                r = s.b * e + s.d * i + s.ty, o = t.sys.hitTestBuffer;
            o.resize(3, 3);
            var h = this.$renderNode, l = t.Matrix.create();
            l.identity(), l.translate(1 - a, 1 - r), t.sys.systemRenderer.drawNodeToBuffer(h, o, l, !0), t.Matrix.release(l);
            try {
                var u = o.getPixel(1, 1)
            } catch (c) {
                throw new Error(t.sys.tr(1039))
            }
            return 0 === u[3] ? null : n
        }, n
    }(t.HashObject);
    t.Graphics = i, t.registerClass(i, "egret.Graphics")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function () {
        function t() {
        }

        var e = t;
        return e.prototype, t.BEVEL = "bevel", t.MITER = "miter", t.ROUND = "round", t
    }();
    t.JointStyle = e, t.registerClass(e, "egret.JointStyle")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function () {
        function t() {
        }

        var e = t;
        return e.prototype, t.AUTO = "auto", t.PORTRAIT = "portrait", t.LANDSCAPE = "landscape", t.LANDSCAPE_FLIPPED = "landscapeFlipped", t
    }();
    t.OrientationMode = e, t.registerClass(e, "egret.OrientationMode")
}(egret || (egret = {}));
var egret;
!function (t) {
    t.$TextureScaleFactor = 1;
    var e = function (e) {
        function i() {
            e.call(this), this._bitmapX = 0, this._bitmapY = 0, this._bitmapWidth = 0, this._bitmapHeight = 0, this._offsetX = 0, this._offsetY = 0, this._textureWidth = 0, this._textureHeight = 0, this._sourceWidth = 0, this._sourceHeight = 0, this._bitmapData = null
        }

        __extends(i, e);
        var n = __define, s = i, a = s.prototype;
        return n(a, "textureWidth", function () {
            return this.$getTextureWidth()
        }), a.$getTextureWidth = function () {
            return this._textureWidth
        }, n(a, "textureHeight", function () {
            return this.$getTextureHeight()
        }), a.$getTextureHeight = function () {
            return this._textureHeight
        }, a.$getScaleBitmapWidth = function () {
            return this._bitmapWidth * t.$TextureScaleFactor
        }, a.$getScaleBitmapHeight = function () {
            return this._bitmapHeight * t.$TextureScaleFactor
        }, n(a, "bitmapData", function () {
            return this._bitmapData
        }), a._setBitmapData = function (e) {
            this._bitmapData = e;
            var i = e.width * t.$TextureScaleFactor, n = e.height * t.$TextureScaleFactor;
            this.$initData(0, 0, i, n, 0, 0, i, n, i, n)
        }, a.$initData = function (e, n, s, a, r, o, h, l, u, c) {
            var d = t.$TextureScaleFactor;
            this._bitmapX = e / d, this._bitmapY = n / d, this._bitmapWidth = s / d, this._bitmapHeight = a / d, this._offsetX = r, this._offsetY = o, this._textureWidth = h, this._textureHeight = l, this._sourceWidth = u, this._sourceHeight = c, i.$invalidate(this)
        }, a.getPixel32 = function (t, e) {
            throw new Error
        }, a.toDataURL = function (t, e) {
            throw new Error
        }, a.saveToFile = function (t, e, i) {
            throw new Error
        }, a.dispose = function () {
            this._bitmapData && (this._bitmapData.dispose && this._bitmapData.dispose(), i.$dispose(this), this._bitmapData = null)
        }, i.$addDisplayObject = function (t, e) {
            var n;
            if (e instanceof i ? e._bitmapData && (n = e._bitmapData.hashCode) : n = e.hashCode, n) {
                if (!i._displayList[n]) return void(i._displayList[n] = [t]);
                var s = i._displayList[n];
                s.indexOf(t) < 0 && s.push(t)
            }
        }, i.$removeDisplayObject = function (t, e) {
            var n;
            if (e instanceof i ? e._bitmapData && (n = e._bitmapData.hashCode) : n = e.hashCode, n && i._displayList[n]) {
                var s = i._displayList[n], a = s.indexOf(t);
                a >= 0 && s.splice(a)
            }
        }, i.$invalidate = function (e) {
            var n;
            if (e instanceof i ? e._bitmapData && (n = e._bitmapData.hashCode) : n = e.hashCode, n && i._displayList[n]) for (var s = i._displayList[n], a = 0; a < s.length; a++) s[a] instanceof t.Bitmap && s[a].$refreshImageData(), s[a].$invalidateContentBounds()
        }, i.$dispose = function (e) {
            var n;
            if (e instanceof i ? e._bitmapData && (n = e._bitmapData.hashCode) : n = e.hashCode, n && i._displayList[n]) {
                for (var s = i._displayList[n], a = 0; a < s.length; a++) s[a] instanceof t.Bitmap && (s[a].$Bitmap[1] = null), s[a].$invalidateContentBounds();
                delete i._displayList[n]
            }
        }, i._displayList = {}, i
    }(t.HashObject);
    t.Texture = e, t.registerClass(e, "egret.Texture")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function (e) {
        function i() {
            e.call(this), this.renderBuffer = new t.sys.RenderBuffer, this._setBitmapData(this.renderBuffer.surface)
        }

        __extends(i, e);
        var n = i, s = n.prototype;
        return s.drawToTexture = function (e, i, n) {
            if (void 0 === n && (n = 1), i && (0 == i.width || 0 == i.height)) return !1;
            var s = i || e.$getOriginalBounds();
            if (0 == s.width || 0 == s.height) return !1;
            n /= t.$TextureScaleFactor;
            var a = (s.x + s.width) * n, r = (s.y + s.height) * n;
            i && (a = s.width * n, r = s.height * n);
            var o = this.renderBuffer;
            if (!o) return !1;
            o.resize(a, r);
            var h = t.Matrix.create();
            return h.identity(), i && h.translate(-i.x, -i.y), h.scale(n, n), t.sys.systemRenderer.render(e, o, h, null, !0), t.Matrix.release(h), this.$initData(0, 0, a, r, 0, 0, a, r, a, r), !0
        }, s.getPixel32 = function (e, i) {
            var n;
            if (this.renderBuffer) {
                var s = t.$TextureScaleFactor;
                e = Math.round(e / s), i = Math.round(i / s), n = this.renderBuffer.getPixel(e, i)
            }
            return n
        }, s.dispose = function () {
            e.prototype.dispose.call(this), this.renderBuffer = null
        }, i
    }(t.Texture);
    t.RenderTexture = e, t.registerClass(e, "egret.RenderTexture")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function (e) {
        function i() {
            e.call(this), this.$graphics = new t.Graphics, this.$graphics.$setTarget(this)
        }

        __extends(i, e);
        var n = __define, s = i, a = s.prototype;
        return n(a, "graphics", function () {
            return this.$graphics
        }), a.$measureContentBounds = function (t) {
            this.$graphics.$measureContentBounds(t)
        }, a.$hitTest = function (t, i) {
            var n = e.prototype.$hitTest.call(this, t, i);
            return n == this && (n = this.$graphics.$hitTest(t, i)), n
        }, i
    }(t.DisplayObject);
    t.Shape = e, t.registerClass(e, "egret.Shape")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function (e) {
        function i() {
            e.call(this), this.$graphics = new t.Graphics, this.$graphics.$setTarget(this)
        }

        __extends(i, e);
        var n = __define, s = i, a = s.prototype;
        return n(a, "graphics", function () {
            return this.$graphics
        }), a.$hitTest = function (e, i) {
            if (!this.$visible) return null;
            var n = this.$getInvertedConcatenatedMatrix(), s = n.a * e + n.c * i + n.tx, a = n.b * e + n.d * i + n.ty,
                r = this.$scrollRect ? this.$scrollRect : this.$maskRect;
            if (r && !r.contains(s, a)) return null;
            if (this.$mask && !this.$mask.$hitTest(e, i)) return null;
            for (var o = this.$children, h = !1, l = o.length - 1; l >= 0; l--) {
                var u = o[l];
                if (!u.$maskedObject) {
                    var c = u.$hitTest(e, i);
                    if (c) {
                        if (h = !0, c.$touchEnabled) break;
                        c = null
                    }
                }
            }
            return c ? this.$touchChildren ? c : this : h ? this : (c = t.DisplayObject.prototype.$hitTest.call(this, e, i), c && (c = this.$graphics.$hitTest(e, i)), c)
        }, a.$measureContentBounds = function (t) {
            this.$graphics.$measureContentBounds(t)
        }, i
    }(t.DisplayObjectContainer);
    t.Sprite = e, t.registerClass(e, "egret.Sprite")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function (e) {
        function i(t) {
            e.call(this), this._bitmapX = 0, this._bitmapY = 0, this._textureMap = {}, this.$texture = t, this._bitmapX = t._bitmapX - t._offsetX, this._bitmapY = t._bitmapY - t._offsetY
        }

        __extends(i, e);
        var n = i, s = n.prototype;
        return s.getTexture = function (t) {
            return this._textureMap[t]
        }, s.createTexture = function (e, i, n, s, a, r, o, h, l) {
            void 0 === r && (r = 0), void 0 === o && (o = 0), void 0 === h && (h = r + s), void 0 === l && (l = o + a);
            var u = new t.Texture;
            return u._bitmapData = this.$texture._bitmapData, u.$initData(this._bitmapX + i, this._bitmapY + n, s, a, r, o, h, l, this.$texture._sourceWidth, this.$texture._sourceHeight), this._textureMap[e] = u, u
        }, s.dispose = function () {
            this.$texture && this.$texture.dispose()
        }, i
    }(t.HashObject);
    t.SpriteSheet = e, t.registerClass(e, "egret.SpriteSheet")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function (e) {
        function i() {
            e.call(this), this.$stageWidth = 0, this.$stageHeight = 0, this.implMap = {}, this.$scaleMode = t.StageScaleMode.SHOW_ALL, this.$orientation = t.OrientationMode.AUTO, this.$maxTouches = 99, this.$dirtyRegionPolicy = t.DirtyRegionPolicy.ON, this.$stage = this, this.$nestLevel = 1
        }

        __extends(i, e);
        var n = __define, s = i, a = s.prototype;
        return n(a, "frameRate", function () {
            return t.sys.$ticker.$frameRate
        }, function (e) {
            t.sys.$ticker.$setFrameRate(e)
        }), n(a, "stageWidth", function () {
            return this.$stageWidth
        }), n(a, "stageHeight", function () {
            return this.$stageHeight
        }), a.invalidate = function () {
            t.sys.$invalidateRenderFlag = !0
        }, a.registerImplementation = function (t, e) {
            this.implMap[t] = e
        }, a.getImplementation = function (t) {
            return this.implMap[t]
        }, n(a, "scaleMode", function () {
            return this.$scaleMode
        }, function (t) {
            this.$scaleMode != t && (this.$scaleMode = t, this.$screen.updateScreenSize())
        }), n(a, "orientation", function () {
            return this.$orientation
        }, function (t) {
            this.$orientation != t && (this.$orientation = t, this.$screen.updateScreenSize())
        }), n(a, "textureScaleFactor", function () {
            return t.$TextureScaleFactor
        }, function (e) {
            t.$TextureScaleFactor = e
        }), n(a, "maxTouches", function () {
            return this.$maxTouches
        }, function (t) {
            this.$maxTouches != t && (this.$maxTouches = t, this.$screen.updateMaxTouches())
        }), n(a, "dirtyRegionPolicy", function () {
            return this.$dirtyRegionPolicy
        }, function (t) {
            this.$dirtyRegionPolicy != t && (this.$dirtyRegionPolicy = t, this.$displayList.setDirtyRegionPolicy(t))
        }), a.setContentSize = function (t, e) {
            this.$screen.setContentSize(t, e)
        }, i
    }(t.DisplayObjectContainer);
    t.Stage = e, t.registerClass(e, "egret.Stage")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function (t) {
        function e(e, i, n, s) {
            t.call(this), this.$eventPhase = 2, this.$currentTarget = null, this.$target = null, this.$isDefaultPrevented = !1, this.$isPropagationStopped = !1, this.$isPropagationImmediateStopped = !1, this.$type = e, this.$bubbles = !!i, this.$cancelable = !!n, this.data = s
        }

        __extends(e, t);
        var i = __define, n = e, s = n.prototype;
        return i(s, "type", function () {
            return this.$type
        }), i(s, "bubbles", function () {
            return this.$bubbles
        }), i(s, "cancelable", function () {
            return this.$cancelable
        }), i(s, "eventPhase", function () {
            return this.$eventPhase
        }), i(s, "currentTarget", function () {
            return this.$currentTarget
        }), i(s, "target", function () {
            return this.$target
        }), s.$setTarget = function (t) {
            return this.$target = t, !0
        }, s.isDefaultPrevented = function () {
            return this.$isDefaultPrevented
        }, s.preventDefault = function () {
            this.$cancelable && (this.$isDefaultPrevented = !0)
        }, s.stopPropagation = function () {
            this.$bubbles && (this.$isPropagationStopped = !0)
        }, s.stopImmediatePropagation = function () {
            this.$bubbles && (this.$isPropagationImmediateStopped = !0)
        }, s.clean = function () {
            this.data = this.$currentTarget = null, this.$setTarget(null)
        }, e.dispatchEvent = function (t, i, n, s) {
            void 0 === n && (n = !1);
            var a = e.create(e, i, n), r = e._getPropertyData(e);
            void 0 != s && (r.data = s);
            var o = t.dispatchEvent(a);
            return e.release(a), o
        }, e._getPropertyData = function (t) {
            var e = t._props;
            return e || (e = t._props = {}), e
        }, e.create = function (t, e, i, n) {
            var s = t.eventPool;
            if (s || (s = t.eventPool = []), s.length) {
                var a = s.pop();
                return a.$type = e, a.$bubbles = !!i, a.$cancelable = !!n, a.$isDefaultPrevented = !1, a.$isPropagationStopped = !1, a.$isPropagationImmediateStopped = !1, a.$eventPhase = 2, a
            }
            return new t(e, i, n)
        }, e.release = function (t) {
            t.clean();
            var e = Object.getPrototypeOf(t).constructor;
            e.eventPool.push(t)
        }, e.ADDED_TO_STAGE = "addedToStage", e.REMOVED_FROM_STAGE = "removedFromStage", e.ADDED = "added", e.REMOVED = "removed", e.ENTER_FRAME = "enterFrame", e.RENDER = "render", e.RESIZE = "resize", e.CHANGE = "change", e.CHANGING = "changing", e.COMPLETE = "complete", e.LOOP_COMPLETE = "loopComplete", e.FOCUS_IN = "focusIn", e.FOCUS_OUT = "focusOut", e.ENDED = "ended", e.ACTIVATE = "activate", e.DEACTIVATE = "deactivate", e.CLOSE = "close", e.CONNECT = "connect", e.LEAVE_STAGE = "leaveStage", e.SOUND_COMPLETE = "soundComplete", e
    }(t.HashObject);
    t.Event = e, t.registerClass(e, "egret.Event")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function (t) {
        function e(e, i, n) {
            void 0 === i && (i = !1), void 0 === n && (n = !1), t.call(this, e, i, n)
        }

        __extends(e, t);
        var i = e;
        return i.prototype, e.FOCUS_IN = "focusIn", e.FOCUS_OUT = "focusOut", e
    }(t.Event);
    t.FocusEvent = e, t.registerClass(e, "egret.FocusEvent")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function (t) {
        function e() {
            t.apply(this, arguments)
        }

        __extends(e, t);
        var i = e;
        return i.prototype, e.PERMISSION_DENIED = "permissionDenied", e.UNAVAILABLE = "unavailable", e
    }(t.Event);
    t.GeolocationEvent = e, t.registerClass(e, "egret.GeolocationEvent")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function (e) {
        function i(t, i, n) {
            void 0 === i && (i = !1), void 0 === n && (n = !1), e.call(this, t, i, n), this._status = 0
        }

        __extends(i, e);
        var n = __define, s = i, a = s.prototype;
        return n(a, "status", function () {
            return this._status
        }), i.dispatchHTTPStatusEvent = function (e, n) {
            var s = t.Event.create(i, i.HTTP_STATUS);
            s._status = n;
            var a = e.dispatchEvent(s);
            return t.Event.release(s), a
        }, i.HTTP_STATUS = "httpStatus", i
    }(t.Event);
    t.HTTPStatusEvent = e, t.registerClass(e, "egret.HTTPStatusEvent")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function (e) {
        function i(t, i, n) {
            void 0 === i && (i = !1), void 0 === n && (n = !1), e.call(this, t, i, n)
        }

        __extends(i, e);
        var n = i;
        return n.prototype, i.dispatchIOErrorEvent = function (e) {
            var n = t.Event.create(i, i.IO_ERROR), s = e.dispatchEvent(n);
            return t.Event.release(n), s
        }, i.IO_ERROR = "ioError", i
    }(t.Event);
    t.IOErrorEvent = e, t.registerClass(e, "egret.IOErrorEvent")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function (t) {
        function e() {
            t.apply(this, arguments)
        }

        __extends(e, t);
        var i = e;
        return i.prototype, e
    }(t.Event);
    t.MotionEvent = e, t.registerClass(e, "egret.MotionEvent")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function (t) {
        function e() {
            t.apply(this, arguments)
        }

        __extends(e, t);
        var i = e;
        return i.prototype, e
    }(t.Event);
    t.OrientationEvent = e, t.registerClass(e, "egret.OrientationEvent")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function (e) {
        function i(t, i, n, s, a) {
            void 0 === i && (i = !1), void 0 === n && (n = !1), void 0 === s && (s = 0), void 0 === a && (a = 0), e.call(this, t, i, n), this.bytesLoaded = 0, this.bytesTotal = 0, this.bytesLoaded = s, this.bytesTotal = a
        }

        __extends(i, e);
        var n = i;
        return n.prototype, i.dispatchProgressEvent = function (e, n, s, a) {
            void 0 === s && (s = 0), void 0 === a && (a = 0);
            var r = t.Event.create(i, n);
            r.bytesLoaded = s, r.bytesTotal = a;
            var o = e.dispatchEvent(r);
            return t.Event.release(r), o
        }, i.PROGRESS = "progress", i.SOCKET_DATA = "socketData", i
    }(t.Event);
    t.ProgressEvent = e, t.registerClass(e, "egret.ProgressEvent")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function (e) {
        function i(t, i, n) {
            void 0 === i && (i = !1), void 0 === n && (n = !1), e.call(this, t, i, n)
        }

        __extends(i, e);
        var n = i;
        return n.prototype, i.dispatchStageOrientationEvent = function (e, n) {
            var s = t.Event.create(i, n), a = e.dispatchEvent(s);
            return t.Event.release(s), a
        }, i.ORIENTATION_CHANGE = "orientationChange", i
    }(t.Event);
    t.StageOrientationEvent = e, t.registerClass(e, "egret.StageOrientationEvent")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function (e) {
        function i(t, i, n, s) {
            void 0 === i && (i = !1), void 0 === n && (n = !1), void 0 === s && (s = ""), e.call(this, t, i, n), this.text = s
        }

        __extends(i, e);
        var n = i;
        return n.prototype, i.dispatchTextEvent = function (e, n, s) {
            var a = t.Event.create(i, n);
            a.text = s;
            var r = e.dispatchEvent(a);
            return t.Event.release(a), r
        }, i.LINK = "link", i
    }(t.Event);
    t.TextEvent = e, t.registerClass(e, "egret.TextEvent")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function (e) {
        function i(t, i, n) {
            e.call(this, t, i, n)
        }

        __extends(i, e);
        var n = i, s = n.prototype;
        return s.updateAfterEvent = function () {
            t.sys.$requestRenderingFlag = !0
        }, i.dispatchTimerEvent = function (e, n, s, a) {
            var r = t.Event.create(i, n, s, a), o = e.dispatchEvent(r);
            return t.Event.release(r), o
        }, i.TIMER = "timer", i.TIMER_COMPLETE = "timerComplete", i
    }(t.Event);
    t.TimerEvent = e, t.registerClass(e, "egret.TimerEvent")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = [], i = Math.PI / 180, n = function (n) {
        function s(t, e) {
            void 0 === t && (t = 0), void 0 === e && (e = 0), n.call(this), this.x = t, this.y = e
        }

        __extends(s, n);
        var a = __define, r = s, o = r.prototype;
        return s.release = function (t) {
            t && e.push(t)
        }, s.create = function (t, i) {
            var n = e.pop();
            return n || (n = new s), n.setTo(t, i)
        }, a(o, "length", function () {
            return Math.sqrt(this.x * this.x + this.y * this.y)
        }), o.setTo = function (t, e) {
            return this.x = t, this.y = e, this
        }, o.clone = function () {
            return new s(this.x, this.y)
        }, o.equals = function (t) {
            return this.x == t.x && this.y == t.y
        }, s.distance = function (t, e) {
            return Math.sqrt((t.x - e.x) * (t.x - e.x) + (t.y - e.y) * (t.y - e.y))
        }, o.copyFrom = function (t) {
            this.x = t.x, this.y = t.y
        }, o.add = function (t) {
            return new s(this.x + t.x, this.y + t.y)
        }, s.interpolate = function (t, e, i) {
            var n = 1 - i;
            return new s(t.x * i + e.x * n, t.y * i + e.y * n)
        }, o.normalize = function (t) {
            if (0 != this.x || 0 != this.y) {
                var e = t / this.length;
                this.x *= e, this.y *= e
            }
        }, o.offset = function (t, e) {
            this.x += t, this.y += e
        }, s.polar = function (e, n) {
            return new s(e * t.NumberUtils.cos(n / i), e * t.NumberUtils.sin(n / i))
        }, o.subtract = function (t) {
            return new s(this.x - t.x, this.y - t.y)
        }, o.toString = function () {
            return "(x=" + this.x + ", y=" + this.y + ")"
        }, s
    }(t.HashObject);
    t.Point = n, t.registerClass(n, "egret.Point"), t.$TempPoint = new n
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = new t.Point, i = function (i) {
        function n(t, e, n, s, a, r) {
            i.call(this, t, e, n), this.targetChanged = !0, this.touchDown = !1, this.$initTo(s, a, r)
        }

        __extends(n, i);
        var s = __define, a = n, r = a.prototype;
        return r.$initTo = function (t, e, i) {
            this.touchPointID = +i || 0, this.$stageX = +t || 0, this.$stageY = +e || 0
        }, s(r, "stageX", function () {
            return this.$stageX
        }), s(r, "stageY", function () {
            return this.$stageY
        }), s(r, "localX", function () {
            return this.targetChanged && this.getLocalXY(), this._localX
        }), s(r, "localY", function () {
            return this.targetChanged && this.getLocalXY(), this._localY
        }), r.getLocalXY = function () {
            this.targetChanged = !1;
            var t = this.$target.$getInvertedConcatenatedMatrix();
            t.transformPoint(this.$stageX, this.$stageY, e), this._localX = e.x, this._localY = e.y
        }, r.$setTarget = function (t) {
            return this.$target = t, this.targetChanged = !!t, !0
        }, r.updateAfterEvent = function () {
            t.sys.$requestRenderingFlag = !0
        }, n.dispatchTouchEvent = function (e, i, s, a, r, o, h, l) {
            if (void 0 === l && (l = !1), !s && !e.hasEventListener(i)) return !0;
            var u = t.Event.create(n, i, s, a);
            u.$initTo(r, o, h), u.touchDown = l;
            var c = e.dispatchEvent(u);
            return t.Event.release(u), c
        }, n.TOUCH_MOVE = "touchMove", n.TOUCH_BEGIN = "touchBegin", n.TOUCH_END = "touchEnd", n.TOUCH_CANCEL = "touchcancel", n.TOUCH_TAP = "touchTap", n.TOUCH_RELEASE_OUTSIDE = "touchReleaseOutside", n.TOUCH_ROLL_OUT = "touchRollOut", n.TOUCH_ROLL_OVER = "touchRollOver", n
    }(t.Event);
    t.TouchEvent = i, t.registerClass(i, "egret.TouchEvent")
}(egret || (egret = {}));
var egret;
!function (t) {
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function (t) {
        function e() {
            t.apply(this, arguments), this.type = null
        }

        __extends(e, t);
        var i = e;
        return i.prototype, e
    }(t.HashObject);
    t.Filter = e, t.registerClass(e, "egret.Filter")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function (t) {
        function e(e, i) {
            t.call(this), this.blurX = e, this.blurY = i, this.type = "blur"
        }

        __extends(e, t);
        var i = e;
        return i.prototype, e
    }(t.Filter);
    t.BlurFilter = e, t.registerClass(e, "egret.BlurFilter")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function (t) {
        function e(e) {
            void 0 === e && (e = null), t.call(this), this.$matrix = [], this.matrix2 = [], this.type = "colorTransform", this.setMatrix(e)
        }

        __extends(e, t);
        var i = __define, n = e, s = n.prototype;
        return i(s, "matrix", function () {
            for (var t = 0; 20 > t; t++) this.matrix2[t] = this.$matrix[t];
            return this.matrix2
        }, function (t) {
            this.setMatrix(t)
        }), s.setMatrix = function (t) {
            for (var e = 0; 20 > e; e++) this.$matrix[e] = t && t[e] || 0
        }, e
    }(t.Filter);
    t.ColorMatrixFilter = e, t.registerClass(e, "egret.ColorMatrixFilter")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function (t) {
        function e(e, i, n, s, a, r, o, h) {
            void 0 === e && (e = 16711680), void 0 === i && (i = 1), void 0 === n && (n = 6), void 0 === s && (s = 6), void 0 === a && (a = 2), void 0 === r && (r = 1), void 0 === o && (o = !1), void 0 === h && (h = !1), t.call(this), this.color = e, this.alpha = i, this.blurX = n, this.blurY = s, this.strength = a, this.quality = r, this.inner = o, this.knockout = h, this.type = "glow", this.$blue = 255 & e, this.$green = (65280 & e) >> 8, this.$red = e >> 16
        }

        __extends(e, t);
        var i = e;
        return i.prototype, e
    }(t.Filter);
    t.GlowFilter = e, t.registerClass(e, "egret.GlowFilter")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function (t) {
        function e(e, i, n, s, a, r, o, h, l, u, c) {
            void 0 === e && (e = 4), void 0 === i && (i = 45), void 0 === n && (n = 0), void 0 === s && (s = 1), void 0 === a && (a = 4), void 0 === r && (r = 4), void 0 === o && (o = 1), void 0 === h && (h = 1), void 0 === l && (l = !1), void 0 === u && (u = !1), void 0 === c && (c = !1), t.call(this, n, s, a, r, o, h, l, u), this.distance = e, this.angle = i
        }

        __extends(e, t);
        var i = e;
        return i.prototype, e
    }(t.GlowFilter);
    t.DropShadowFilter = e, t.registerClass(e, "egret.DropShadowFilter")
}(egret || (egret = {}));
var egret;
!function (t) {
    function e(t) {
        switch (t) {
            case s:
            case-a:
                return 0;
            case n:
            case-n:
                return -1;
            case a:
            case-s:
                return 0;
            default:
                return Math.cos(t)
        }
    }

    function i(t) {
        switch (t) {
            case s:
            case-a:
                return 1;
            case n:
            case-n:
                return 0;
            case a:
            case-s:
                return -1;
            default:
                return Math.sin(t)
        }
    }

    var n = Math.PI, s = n / 2, a = n + s, r = 2 * n, o = Math.PI / 180;
    t.$cos = e, t.$sin = i;
    var h = [], l = function (s) {
        function a(t, e, i, n, a, r) {
            void 0 === t && (t = 1), void 0 === e && (e = 0), void 0 === i && (i = 0), void 0 === n && (n = 1), void 0 === a && (a = 0), void 0 === r && (r = 0), s.call(this), this.a = t, this.b = e, this.c = i, this.d = n, this.tx = a, this.ty = r
        }

        __extends(a, s);
        var l = a, u = l.prototype;
        return a.release = function (t) {
            t && h.push(t)
        }, a.create = function () {
            var t = h.pop();
            return t || (t = new a), t
        }, u.clone = function () {
            return new a(this.a, this.b, this.c, this.d, this.tx, this.ty)
        }, u.concat = function (t) {
            var e = this.a * t.a, i = 0, n = 0, s = this.d * t.d, a = this.tx * t.a + t.tx, r = this.ty * t.d + t.ty;
            (0 !== this.b || 0 !== this.c || 0 !== t.b || 0 !== t.c) && (e += this.b * t.c, s += this.c * t.b, i += this.a * t.b + this.b * t.d, n += this.c * t.a + this.d * t.c, a += this.ty * t.c, r += this.tx * t.b), this.a = e, this.b = i, this.c = n, this.d = s, this.tx = a, this.ty = r
        }, u.copyFrom = function (t) {
            return this.a = t.a, this.b = t.b, this.c = t.c, this.d = t.d, this.tx = t.tx, this.ty = t.ty, this
        }, u.identity = function () {
            this.a = this.d = 1, this.b = this.c = this.tx = this.ty = 0
        }, u.invert = function () {
            this.$invertInto(this)
        }, u.$invertInto = function (t) {
            var e = this.a, i = this.b, n = this.c, s = this.d, a = this.tx, r = this.ty;
            if (0 == i && 0 == n) return t.b = t.c = 0, void(0 == e || 0 == s ? t.a = t.d = t.tx = t.ty = 0 : (e = t.a = 1 / e, s = t.d = 1 / s, t.tx = -e * a, t.ty = -s * r));
            var o = e * s - i * n;
            if (0 == o) return void t.identity();
            o = 1 / o;
            var h = t.a = s * o;
            i = t.b = -i * o, n = t.c = -n * o, s = t.d = e * o, t.tx = -(h * a + n * r), t.ty = -(i * a + s * r)
        }, u.rotate = function (t) {
            if (t = +t, 0 !== t) {
                var n = e(t), s = i(t), a = this.a, r = this.b, o = this.c, h = this.d, l = this.tx, u = this.ty;
                this.a = a * n - r * s, this.b = a * s + r * n, this.c = o * n - h * s, this.d = o * s + h * n, this.tx = l * n - u * s, this.ty = l * s + u * n
            }
        }, u.scale = function (t, e) {
            1 !== t && (this.a *= t, this.c *= t, this.tx *= t), 1 !== e && (this.b *= e, this.d *= e, this.ty *= e)
        }, u.setTo = function (t, e, i, n, s, a) {
            return this.a = t, this.b = e, this.c = i, this.d = n, this.tx = s, this.ty = a, this
        }, u.transformPoint = function (e, i, n) {
            var s = this.a * e + this.c * i + this.tx, a = this.b * e + this.d * i + this.ty;
            return n ? (n.setTo(s, a), n) : new t.Point(s, a)
        }, u.translate = function (t, e) {
            this.tx += t, this.ty += e
        }, u.equals = function (t) {
            return this.a == t.a && this.b == t.b && this.c == t.c && this.d == t.d && this.tx == t.tx && this.ty == t.ty
        }, u.prepend = function (t, e, i, n, s, a) {
            var r = this.tx;
            if (1 != t || 0 != e || 0 != i || 1 != n) {
                var o = this.a, h = this.c;
                this.a = o * t + this.b * i, this.b = o * e + this.b * n, this.c = h * t + this.d * i, this.d = h * e + this.d * n
            }
            return this.tx = r * t + this.ty * i + s, this.ty = r * e + this.ty * n + a, this
        }, u.append = function (t, e, i, n, s, a) {
            var r = this.a, o = this.b, h = this.c, l = this.d;
            return (1 != t || 0 != e || 0 != i || 1 != n) && (this.a = t * r + e * h, this.b = t * o + e * l, this.c = i * r + n * h, this.d = i * o + n * l), this.tx = s * r + a * h + this.tx, this.ty = s * o + a * l + this.ty, this
        }, u.deltaTransformPoint = function (e) {
            var i = this, n = i.a * e.x + i.c * e.y, s = i.b * e.x + i.d * e.y;
            return new t.Point(n, s)
        }, u.toString = function () {
            return "(a=" + this.a + ", b=" + this.b + ", c=" + this.c + ", d=" + this.d + ", tx=" + this.tx + ", ty=" + this.ty + ")"
        }, u.createBox = function (e, i, n, s, a) {
            void 0 === n && (n = 0), void 0 === s && (s = 0), void 0 === a && (a = 0);
            var r = this;
            if (0 !== n) {
                n /= o;
                var h = t.NumberUtils.cos(n), l = t.NumberUtils.sin(n);
                r.a = h * e, r.b = l * i, r.c = -l * e, r.d = h * i
            } else r.a = e, r.b = 0, r.c = 0, r.d = i;
            r.tx = s, r.ty = a
        }, u.createGradientBox = function (t, e, i, n, s) {
            void 0 === i && (i = 0), void 0 === n && (n = 0), void 0 === s && (s = 0), this.createBox(t / 1638.4, e / 1638.4, i, n + t / 2, s + e / 2)
        }, u.$transformBounds = function (t) {
            var e = this.a, i = this.b, n = this.c, s = this.d, a = this.tx, r = this.ty, o = t.x, h = t.y,
                l = o + t.width, u = h + t.height, c = e * o + n * h + a, d = i * o + s * h + r, f = e * l + n * h + a,
                g = i * l + s * h + r, p = e * l + n * u + a, _ = i * l + s * u + r, m = e * o + n * u + a,
                v = i * o + s * u + r, T = 0;
            c > f && (T = c, c = f, f = T), p > m && (T = p, p = m, m = T), t.x = Math.floor(p > c ? c : p), t.width = Math.ceil((f > m ? f : m) - t.x), d > g && (T = d, d = g, g = T), _ > v && (T = _, _ = v, v = T), t.y = Math.floor(_ > d ? d : _), t.height = Math.ceil((g > v ? g : v) - t.y)
        }, u.getDeterminant = function () {
            return this.a * this.d - this.b * this.c
        }, u.$getScaleX = function () {
            var t = this;
            if (1 == t.a && 0 == t.b) return 1;
            var e = Math.sqrt(t.a * t.a + t.b * t.b);
            return this.getDeterminant() < 0 ? -e : e
        }, u.$getScaleY = function () {
            var t = this;
            if (0 == t.c && 1 == t.d) return 1;
            var e = Math.sqrt(t.c * t.c + t.d * t.d);
            return this.getDeterminant() < 0 ? -e : e
        }, u.$getSkewX = function () {
            return Math.atan2(this.d, this.c) - n / 2
        }, u.$getSkewY = function () {
            return Math.atan2(this.b, this.a)
        }, u.$updateScaleAndRotation = function (t, n, s, a) {
            if (!(0 != s && s != r || 0 != a && a != r)) return this.a = t, this.b = this.c = 0, void(this.d = n);
            var o = e(s), h = i(s);
            s == a ? (this.a = o * t, this.b = h * t) : (this.a = e(a) * t, this.b = i(a) * t), this.c = -h * n, this.d = o * n
        }, u.$preMultiplyInto = function (t, e) {
            var i = t.a * this.a, n = 0, s = 0, a = t.d * this.d, r = t.tx * this.a + this.tx,
                o = t.ty * this.d + this.ty;
            (0 !== t.b || 0 !== t.c || 0 !== this.b || 0 !== this.c) && (i += t.b * this.c, a += t.c * this.b, n += t.a * this.b + t.b * this.d, s += t.c * this.a + t.d * this.c, r += t.ty * this.c, o += t.tx * this.b), e.a = i, e.b = n, e.c = s, e.d = a, e.tx = r, e.ty = o
        }, a
    }(t.HashObject);
    t.Matrix = l, t.registerClass(l, "egret.Matrix"), t.$TempMatrix = new l
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = [], i = function (i) {
        function n(t, e, n, s) {
            void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === n && (n = 0), void 0 === s && (s = 0), i.call(this), this.x = t, this.y = e, this.width = n, this.height = s
        }

        __extends(n, i);
        var s = __define, a = n, r = a.prototype;
        return n.release = function (t) {
            t && e.push(t)
        }, n.create = function () {
            var t = e.pop();
            return t || (t = new n), t
        }, s(r, "right", function () {
            return this.x + this.width
        }, function (t) {
            this.width = t - this.x
        }), s(r, "bottom", function () {
            return this.y + this.height
        }, function (t) {
            this.height = t - this.y
        }), s(r, "left", function () {
            return this.x
        }, function (t) {
            this.width += this.x - t, this.x = t
        }), s(r, "top", function () {
            return this.y
        }, function (t) {
            this.height += this.y - t, this.y = t
        }), s(r, "topLeft", function () {
            return new t.Point(this.left, this.top)
        }, function (t) {
            this.top = t.y, this.left = t.x
        }), s(r, "bottomRight", function () {
            return new t.Point(this.right, this.bottom)
        }, function (t) {
            this.bottom = t.y, this.right = t.x
        }), r.copyFrom = function (t) {
            return this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height, this
        }, r.setTo = function (t, e, i, n) {
            return this.x = t, this.y = e, this.width = i, this.height = n, this
        }, r.contains = function (t, e) {
            return this.x <= t && this.x + this.width >= t && this.y <= e && this.y + this.height >= e
        }, r.intersection = function (t) {
            return this.clone().$intersectInPlace(t)
        }, r.inflate = function (t, e) {
            this.x -= t, this.width += 2 * t, this.y -= e, this.height += 2 * e
        }, r.$intersectInPlace = function (t) {
            var e = this.x, i = this.y, n = t.x, s = t.y, a = Math.max(e, n), r = Math.min(e + this.width, n + t.width);
            if (r >= a) {
                var o = Math.max(i, s), h = Math.min(i + this.height, s + t.height);
                if (h >= o) return this.setTo(a, o, r - a, h - o), this
            }
            return this.setEmpty(), this
        }, r.intersects = function (t) {
            return Math.max(this.x, t.x) <= Math.min(this.right, t.right) && Math.max(this.y, t.y) <= Math.min(this.bottom, t.bottom)
        }, r.isEmpty = function () {
            return this.width <= 0 || this.height <= 0
        }, r.setEmpty = function () {
            this.x = 0, this.y = 0, this.width = 0, this.height = 0
        }, r.clone = function () {
            return new n(this.x, this.y, this.width, this.height)
        }, r.containsPoint = function (t) {
            return this.x < t.x && this.x + this.width > t.x && this.y < t.y && this.y + this.height > t.y
        }, r.containsRect = function (t) {
            var e = t.x + t.width, i = t.y + t.height, n = this.x + this.width, s = this.y + this.height;
            return t.x >= this.x && t.x < n && t.y >= this.y && t.y < s && e > this.x && n >= e && i > this.y && s >= i
        }, r.equals = function (t) {
            return this === t || this.x === t.x && this.y === t.y && this.width === t.width && this.height === t.height
        }, r.inflatePoint = function (t) {
            this.inflate(t.x, t.y)
        }, r.offset = function (t, e) {
            this.x += t, this.y += e
        }, r.offsetPoint = function (t) {
            this.offset(t.x, t.y)
        }, r.toString = function () {
            return "(x=" + this.x + ", y=" + this.y + ", width=" + this.width + ", height=" + this.height + ")"
        }, r.union = function (t) {
            var e = this.clone();
            if (t.isEmpty()) return e;
            if (e.isEmpty()) return e.copyFrom(t), e;
            var i = Math.min(e.x, t.x), n = Math.min(e.y, t.y);
            return e.setTo(i, n, Math.max(e.right, t.right) - i, Math.max(e.bottom, t.bottom) - n), e
        }, r.$getBaseWidth = function (t) {
            var e = Math.abs(Math.cos(t)), i = Math.abs(Math.sin(t));
            return e * this.width + i * this.height
        }, r.$getBaseHeight = function (t) {
            var e = Math.abs(Math.cos(t)), i = Math.abs(Math.sin(t));
            return i * this.width + e * this.height
        }, n
    }(t.HashObject);
    t.Rectangle = i, t.registerClass(i, "egret.Rectangle"), t.$TempRectangle = new i
}(egret || (egret = {}));
var egret;
!function (t) {
    t.$locale_strings = t.$locale_strings || {}, t.$locale_strings.en_US = t.$locale_strings.en_US || {};
    var e = t.$locale_strings.en_US;
    e[1001] = "Could not find Egret entry class: {0}。", e[1002] = "Egret entry class '{0}' must inherit from egret.DisplayObject.", e[1003] = "Parameter {0} must be non-null.", e[1004] = "An object cannot be added as a child to one of it's children (or children's children, etc.).", e[1005] = "An object cannot be added as a child of itself.", e[1006] = "The supplied DisplayObject must be a child of the caller.", e[1007] = "An index specified for a parameter was out of range.", e[1008] = "Instantiate singleton error，singleton class {0} can not create multiple instances.", e[1009] = 'the Class {0} cannot use the property "{1}"', e[1010] = 'the property "{1}" of the Class "{0}" is readonly',
        e[1011] = "Stream Error. URL: {0}", e[1012] = "The type of parameter {0} must be Class.", e[1013] = "Variable assignment is NaN, please see the code!", e[1014] = 'the constant "{1}" of the Class "{0}" is read-only', e[1015] = "xml not found!", e[1016] = "{0}has been obsoleted", e[1017] = "The format of JSON file is incorrect: {0}\ndata: {1}", e[1018] = "the scale9Grid is not correct", e[1022] = "{0} ArgumentError", e[1023] = "This method is not available in the ScrollView!", e[1025] = "end of the file", e[1026] = "! EncodingError The code point {0} could not be encoded.", e[1027] = "DecodingError", e[1028] = ". called injection is not configured rule: {0}, please specify configuration during its initial years of injection rule, and then call the corresponding single case.", e[1029] = "Function.prototype.bind - what is trying to be bound is not callable", e[1033] = "Photos can not be used across domains toDataURL to convert base64", e[1034] = 'Music file decoding failed: "{0}", please use the standard conversion tool reconversion under mp3.', e[1035] = "Native does not support this feature!", e[1036] = "Sound has stopped, please recall Sound.play () to play the sound!", e[1037] = "Non-load the correct blob!", e[1038] = "XML format error!", e[1039] = "crossOrigin images can not set pixelHitTest  property!", e[1040] = "hitTestPoint can not detect crossOrigin images! Please check if the display object has crossOrigin elements.", e[1041] = "egret.MainContext.runtimeType is deprecated, please use egret.Capabilities.runtimeType replace", e[1042] = "The parameters passed in the region needs is an integer in drawToTexture method. Otherwise, some browsers will draw abnormal.", e[3e3] = "Theme configuration file failed to load: {0}", e[3001] = "Cannot find the skin name which is configured in Theme: {0}", e[3002] = 'Index:"{0}" is out of the collection element index range', e[3003] = "Cannot be available in this component. If this component is container, please continue to use", e[3004] = "addChild(){0}addElement() replace", e[3005] = "addChildAt(){0}addElementAt() replace", e[3006] = "removeChild(){0}removeElement() replace", e[3007] = "removeChildAt(){0}removeElementAt() replace", e[3008] = "setChildIndex(){0}setElementIndex() replace", e[3009] = "swapChildren(){0}swapElements() replace", e[3010] = "swapChildrenAt(){0}swapElementsAt() replace", e[3011] = 'Index:"{0}" is out of the visual element index range', e[3012] = "This method is not available in Scroller component!", e[3013] = "UIStage is GUI root container, and only one such instant is in the display list！", e[3100] = "Current browser does not support WebSocket", e[3101] = "Please connect Socket firstly", e[3102] = "Please set the type of binary type", e[4e3] = "An Bone cannot be added as a child to itself or one of its children (or children's children, etc.)", e[4001] = "Abstract class can not be instantiated!", e[4002] = "Unnamed data!", e[4003] = "Nonsupport version!"
}(egret || (egret = {}));
var egret;
!function (t) {
    t.$locale_strings = t.$locale_strings || {}, t.$language = "en_US"
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        function i(e) {
            for (var i = [], n = 1; n < arguments.length; n++) i[n - 1] = arguments[n];
            var s = t.$locale_strings[t.$language][e];
            if (!s) return "{" + e + "}";
            for (var a = i.length, r = 0; a > r; r++) s = s.replace("{" + r + "}", i[r]);
            return s
        }

        e.tr = i
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    t.$locale_strings = t.$locale_strings || {}, t.$locale_strings.zh_CN = t.$locale_strings.zh_CN || {};
    var e = t.$locale_strings.zh_CN;
    e[1001] = "找不到Egret入口类: {0}。", e[1002] = "Egret入口类 {0} 必须继承自egret.DisplayObject。", e[1003] = "参数 {0} 不能为 null。", e[1004] = "无法将对象添加为它的一个子对象（或子对象的子对象等）的子对象。", e[1005] = "不能将对象添加为其自身的子对象。", e[1006] = "提供的 DisplayObject 必须是调用者的子级。", e[1007] = "为参数指定的索引不在范围内。", e[1008] = "实例化单例出错，不允许实例化多个 {0} 对象。", e[1009] = "类 {0} 不可以使用属性 {1}", e[1010] = "类 {0} 属性 {1} 是只读的", e[1011] = "流错误。URL: {0}", e[1012] = "参数 {0} 的类型必须为 Class。", e[1013] = "变量赋值为NaN，请查看代码！", e[1014] = "类 {0} 常量 {1} 是只读的", e[1015] = "xml not found!", e[1016] = "{0}已经废弃", e[1017] = "JSON文件格式不正确: {0}\ndata: {1}", e[1018] = "9宫格设置错误", e[1022] = "{0} ArgumentError", e[1023] = "此方法在ScrollView内不可用!", e[1025] = "遇到文件尾", e[1026] = "EncodingError! The code point {0} could not be encoded.", e[1027] = "DecodingError", e[1028] = "调用了未配置的注入规则:{0}。 请先在项目初始化里配置指定的注入规则，再调用对应单例。", e[1029] = "Function.prototype.bind - what is trying to be bound is not callable", e[1033] = "跨域图片不可以使用toDataURL来转换成base64", e[1034] = '音乐文件解码失败："{0}"，请使用标准的转换工具重新转换下mp3。', e[1035] = "Native 下暂未实现此功能！", e[1036] = "声音已停止，请重新调用 Sound.play() 来播放声音！", e[1037] = "非正确的blob加载！", e[1038] = "XML 格式错误!", e[1039] = "跨域图片不能设置 pixelHitTest 属性!", e[1040] = "hitTestPoint 不能对跨域图片进行检测! 请检查该显示对象内是否含有跨域元素", e[1041] = "egret.MainContext.runtimeType 已废弃,请使用egret.Capabilities.runtimeType 代替", e[1042] = "drawToTexture方法传入的区域各个参数需要为整数,否则某些浏览器绘制会出现异常", e[3e3] = "主题配置文件加载失败: {0}", e[3001] = "找不到主题中所配置的皮肤类名: {0}", e[3002] = '索引:"{0}"超出集合元素索引范围', e[3003] = "在此组件中不可用，若此组件为容器类，请使用", e[3004] = "addChild(){0}addElement()代替", e[3005] = "addChildAt(){0}addElementAt()代替", e[3006] = "removeChild(){0}removeElement()代替", e[3007] = "removeChildAt(){0}removeElementAt()代替", e[3008] = "setChildIndex(){0}setElementIndex()代替", e[3009] = "swapChildren(){0}swapElements()代替", e[3010] = "swapChildrenAt(){0}swapElementsAt()代替", e[3011] = '索引:"{0}"超出可视元素索引范围', e[3012] = "此方法在Scroller组件内不可用!", e[3013] = "UIStage是GUI根容器，只能有一个此实例在显示列表中！", e[3100] = "当前浏览器不支持WebSocket", e[3101] = "请先连接WebSocket", e[3102] = "请先设置type为二进制类型", e[4e3] = "An Bone cannot be added as a child to itself or one of its children (or children's children, etc.)", e[4001] = "Abstract class can not be instantiated!", e[4002] = "Unnamed data!", e[4003] = "Nonsupport version!"
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (t) {
    }(e = t.localStorage || (t.localStorage = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (t) {
        function e(t) {
            n.indexOf(t) < 0 && n.push(t)
        }

        function i(t) {
            var e = n.indexOf(t);
            return 0 > e && (n.splice(e, 1), !0)
        }

        var n = [];
        t.$pushSoundChannel = e, t.$popSoundChannel = i
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
}(egret || (egret = {}));
var egret;
!function (t) {
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function () {
        function e() {
            this.onSuccessFunc = null, this.onSuccessThisObject = null, this.onErrorFunc = null, this.onErrorThisObject = null, this.downloadingSizeFunc = null, this.downloadingSizeThisObject = null, this.onResponseHeaderFunc = null, this.onResponseHeaderThisObject = null
        }

        var i = e, n = i.prototype;
        return e.create = function () {
            return e.promiseObjectList.length ? e.promiseObjectList.pop() : new t.PromiseObject
        }, n.onSuccess = function () {
            for (var t = [], e = 0; e < arguments.length; e++) t[e - 0] = arguments[e];
            this.onSuccessFunc && this.onSuccessFunc.apply(this.onSuccessThisObject, t), this.destroy()
        }, n.onError = function () {
            for (var t = [], e = 0; e < arguments.length; e++) t[e - 0] = arguments[e];
            this.onErrorFunc && this.onErrorFunc.apply(this.onErrorThisObject, t), this.destroy()
        }, n.downloadingSize = function () {
            for (var t = [], e = 0; e < arguments.length; e++) t[e - 0] = arguments[e];
            this.downloadingSizeFunc && this.downloadingSizeFunc.apply(this.downloadingSizeThisObject, t)
        }, n.onResponseHeader = function () {
            for (var t = [], e = 0; e < arguments.length; e++) t[e - 0] = arguments[e];
            this.onResponseHeaderFunc && this.onResponseHeaderFunc.apply(this.onResponseHeaderThisObject, t)
        }, n.destroy = function () {
            this.onSuccessFunc = void 0, this.onSuccessThisObject = void 0, this.onErrorFunc = void 0, this.onErrorThisObject = void 0, this.downloadingSizeFunc = void 0, this.downloadingSizeThisObject = void 0, this.onResponseHeaderFunc = void 0, this.onResponseHeaderThisObject = void 0, e.promiseObjectList.push(this)
        }, e.promiseObjectList = [], e
    }();
    t.PromiseObject = e, t.registerClass(e, "egret.PromiseObject")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function () {
        function t() {
        }

        var e = t;
        return e.prototype, t.GET = "GET", t.POST = "POST", t
    }();
    t.HttpMethod = e, t.registerClass(e, "egret.HttpMethod")
}(egret || (egret = {}));
var egret;
!function (t) {
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function () {
        function t() {
        }

        var e = t;
        return e.prototype, t.TEXT = "text", t.ARRAY_BUFFER = "arraybuffer", t
    }();
    t.HttpResponseType = e, t.registerClass(e, "egret.HttpResponseType")
}(egret || (egret = {}));
var egret;
!function (t) {
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        function i(t, e) {
            var i = t.minX < e.minX ? t.minX : e.minX, n = t.minY < e.minY ? t.minY : e.minY,
                s = t.maxX > e.maxX ? t.maxX : e.maxX, a = t.maxY > e.maxY ? t.maxY : e.maxY;
            return (s - i) * (a - n)
        }

        var n = function () {
            function n(e) {
                this.dirtyList = [], this.hasClipRect = !1, this.clipWidth = 0, this.clipHeight = 0, this.clipArea = 0, this.clipRectChanged = !1, this.$dirtyRegionPolicy = t.DirtyRegionPolicy.ON, this.root = e
            }

            var s = n, a = s.prototype;
            return a.setClipRect = function (t, e) {
                this.hasClipRect = !0, this.clipRectChanged = !0, this.clipWidth = Math.ceil(t), this.clipHeight = Math.ceil(e), this.clipArea = this.clipWidth * this.clipHeight
            }, a.addRegion = function (i) {
                var n = i.minX, s = i.minY, a = i.maxX, r = i.maxY;
                if (this.hasClipRect && (0 > n && (n = 0), 0 > s && (s = 0), a > this.clipWidth && (a = this.clipWidth), r > this.clipHeight && (r = this.clipHeight)), n >= a || s >= r) return !1;
                if (this.clipRectChanged) return !0;
                var o = this.dirtyList, h = e.Region.create();
                return o.push(h.setTo(n, s, a, r)), this.$dirtyRegionPolicy != t.DirtyRegionPolicy.OFF && this.mergeDirtyList(o), !0
            }, a.clear = function () {
                for (var t = this.dirtyList, i = t.length, n = 0; i > n; n++) e.Region.release(t[n]);
                t.length = 0
            }, a.getDirtyRegions = function () {
                var i = this.dirtyList;
                if (this.$dirtyRegionPolicy == t.DirtyRegionPolicy.OFF || t.Capabilities.runtimeType == t.RuntimeType.NATIVE && !t["native"].$supportCanvas) {
                    this.clipRectChanged = !0, this.clear();
                    var n = e.Region.create();
                    if (this.hasClipRect) i.push(n.setTo(0, 0, this.clipWidth, this.clipHeight)); else {
                        var s = this.root.$getOriginalBounds();
                        i.push(n.setTo(s.x, s.y, s.width, s.height))
                    }
                } else if (this.clipRectChanged) {
                    this.clipRectChanged = !1, this.clear();
                    var n = e.Region.create();
                    i.push(n.setTo(0, 0, this.clipWidth, this.clipHeight))
                } else for (; this.mergeDirtyList(i);) ;
                return this.dirtyList
            }, a.mergeDirtyList = function (t) {
                var n = t.length;
                if (2 > n) return !1;
                for (var s = this.hasClipRect, a = n > 3 ? Number.POSITIVE_INFINITY : 0, r = 0, o = 0, h = 0, l = 0; n - 1 > l; l++) {
                    var u = t[l];
                    s && (h += u.area);
                    for (var c = l + 1; n > c; c++) {
                        var d = t[c], f = i(u, d) - u.area - d.area;
                        a > f && (r = l, o = c, a = f)
                    }
                }
                if (s && h / this.clipArea > .95 && (this.clipRectChanged = !0), r != o) {
                    var g = t[o];
                    return t[r].union(g), e.Region.release(g), t.splice(o, 1), !0
                }
                return !1
            }, a.setDirtyRegionPolicy = function (t) {
                this.$dirtyRegionPolicy = t
            }, n
        }();
        e.DirtyRegion = n, t.registerClass(n, "egret.sys.DirtyRegion")
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        var i = function (i) {
            function n(n) {
                i.call(this), this.isStage = !1, this.$renderNode = new e.BitmapNode, this.renderBuffer = null, this.offsetX = 0, this.offsetY = 0, this.offsetMatrix = new t.Matrix, this.isDirty = !1, this.needUpdateRegions = !1, this.dirtyNodes = {}, this.dirtyNodeList = [], this.dirtyList = null, this.sizeChanged = !1, this.root = n, this.dirtyRegion = new e.DirtyRegion(n), this.isStage = n instanceof t.Stage
            }

            __extends(n, i);
            var s = n, a = s.prototype;
            return n.create = function (i) {
                var n = new t.sys.DisplayList(i);
                try {
                    var s = new e.RenderBuffer
                } catch (a) {
                    return null
                }
                return n.renderBuffer = s, n.root = i, n
            }, a.$getRenderNode = function () {
                return this.$renderNode
            }, a.$update = function () {
                var t = this.root;
                if (null == t) return !1;
                t.$removeFlagsUp(768);
                var e = this.$renderNode, i = t.$getConcatenatedMatrix(), n = t.$getOriginalBounds(),
                    s = t.$parentDisplayList, a = e.renderRegion;
                if (this.needUpdateRegions && this.updateDirtyRegions(), !s) return a.setTo(0, 0, 0, 0), e.moved = !1, !1;
                if (!e.moved) return !1;
                e.moved = !1;
                var r = e.renderMatrix;
                r.copyFrom(i);
                var o = s.root;
                return o !== t.$stage && t.$getConcatenatedMatrixAt(o, r), a.updateRegion(n, r), !0
            }, a.setClipRect = function (t, e) {
                this.dirtyRegion.setClipRect(t, e), this.renderBuffer.resize(t, e)
            }, a.markDirty = function (t) {
                var e = t.$hashCode;
                if (!this.dirtyNodes[e] && (this.dirtyNodes[e] = !0, this.dirtyNodeList.push(t), !this.needUpdateRegions)) {
                    this.needUpdateRegions = !0, this.isDirty = !0;
                    var i = this.root.$parentDisplayList;
                    i && i.markDirty(this)
                }
            }, a.updateDirtyRegions = function () {
                var t = this.dirtyNodeList;
                this.dirtyNodeList = [], this.dirtyNodes = {}, this.needUpdateRegions = !1;
                for (var e = this.dirtyRegion, i = t.length, n = 0; i > n; n++) {
                    var s = t[n], a = s.$getRenderNode();
                    a.needRedraw = !1, a.renderAlpha > 0 && a.renderVisible && e.addRegion(a.renderRegion) && (a.needRedraw = !0);
                    var r = s.$update();
                    a.renderAlpha > 0 && a.renderVisible && (r || !a.needRedraw) && e.addRegion(a.renderRegion) && (a.needRedraw = !0)
                }
                return this.dirtyList = e.getDirtyRegions(), this.dirtyList
            }, a.drawToSurface = function () {
                var t = 0, i = this.dirtyList;
                if (i && i.length > 0) {
                    this.isStage || this.changeSurfaceSize();
                    var n = this.renderBuffer;
                    n.beginClip(this.dirtyList, this.offsetX, this.offsetY);
                    var t = e.systemRenderer.render(this.root, n, this.offsetMatrix, this.dirtyList);
                    n.endClip();
                    var s = n.surface, a = this.$renderNode;
                    a.drawData.length = 0, a.image = s, a.drawImage(0, 0, s.width, s.height, -this.offsetX, -this.offsetY, s.width, s.height)
                }
                return this.dirtyList = null, this.dirtyRegion.clear(), this.isDirty = !1, t
            }, a.changeSurfaceSize = function () {
                var t = (this.root, this.offsetX), e = this.offsetY, i = this.root.$getOriginalBounds();
                this.offsetX = -i.x, this.offsetY = -i.y, this.offsetMatrix.setTo(1, 0, 0, 1, this.offsetX, this.offsetY);
                var n = this.renderBuffer, s = Math.max(257, i.width), a = Math.max(257, i.height);
                this.sizeChanged ? n.resizeTo(s, a, this.offsetX - t, this.offsetY - e) : (this.sizeChanged = !0, n.resize(s, a))
            }, a.setDirtyRegionPolicy = function (t) {
                this.dirtyRegion.setDirtyRegionPolicy(t)
            }, n
        }(t.HashObject);
        e.DisplayList = i, t.registerClass(i, "egret.sys.DisplayList", ["egret.sys.Renderable"])
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        function i(i, n, s, a) {
            if (n && (t.log = function () {
                for (var t = arguments.length, i = "", n = 0; t > n; n++) i += arguments[n] + " ";
                e.$logToFPS(i), console.log.apply(console, r(arguments))
            }), l = a ? {} : a, n = !!n, this.showFPS = !!i, this.showLog = n, !this.fpsDisplay) {
                var o = void 0 === a.x ? 0 : a.x, c = void 0 === a.y ? 0 : a.y;
                h = this.fpsDisplay = new FPS(this.stage, i, n, s, a), h.x = o, h.y = c;
                for (var d = u.length, f = 0; d > f; f++) h.updateInfo(u[f]);
                u = null
            }
        }

        function n(t) {
            t = !!t, this._showPaintRect != t && (this._showPaintRect = t, t ? (this.stageDisplayList || (this.stageDisplayList = e.DisplayList.create(this.stage)), this.stage.$displayList = this.stageDisplayList) : this.stage.$displayList = this.screenDisplayList)
        }

        function s(t) {
            for (var e = t.length, i = [], n = 0; e > n; n++) {
                var s = t[n];
                i[n] = [s.minX, s.minY, s.width, s.height], s.width -= 1, s.height -= 1
            }
            var a = this.paintList;
            a.push(i), a.length > 1 && a.shift();
            var r = this.screenDisplayList.renderBuffer, o = r.context;
            for (o.setTransform(1, 0, 0, 1, 0, 0), o.clearRect(0, 0, r.surface.width, r.surface.height), o.drawImage(this.stageDisplayList.renderBuffer.surface, 0, 0), e = a.length, n = 0; e > n; n++) {
                i = a[n];
                for (var h = i.length - 1; h >= 0; h--) {
                    var l = i[h];
                    this.drawDirtyRect(l[0], l[1], l[2], l[3], o)
                }
            }
            o.save(), o.beginPath();
            for (var e = t.length, n = 0; e > n; n++) {
                var s = t[n];
                o.clearRect(s.minX, s.minY, s.width, s.height), o.rect(s.minX, s.minY, s.width, s.height)
            }
            o.clip(), o.drawImage(this.stageDisplayList.renderBuffer.surface, 0, 0), o.restore()
        }

        function a(t, e, i, n, s) {
            s.strokeStyle = "rgb(255,0,0)", s.lineWidth = 5, s.strokeRect(t - .5, e - .5, i, n)
        }

        function r(t) {
            for (var e = [], i = 0; i < t.length; i++) e.push(t[i]);
            return e
        }

        var o = function (r) {
            function o(t, e, o) {
                r.call(this), this.isPlaying = !1, this.entryClassName = o, this.stage = e, this.screenDisplayList = this.createDisplayList(e, t), this.showFPS = !1, this.showLog = !1, this._showPaintRect = !1, this.stageDisplayList = null, this.paintList = [], this.displayFPS = i, this.showPaintRect = n, this.drawPaintRect = s, this.drawDirtyRect = a
            }

            __extends(o, r);
            var h = o, l = h.prototype;
            return l.createDisplayList = function (t, i) {
                var n = new e.DisplayList(t);
                return n.renderBuffer = i, t.$displayList = n, n.setClipRect(t.$stageWidth, t.$stageHeight), n
            }, l.start = function () {
                !this.isPlaying && this.stage && (e.$TempStage = e.$TempStage || this.stage, this.isPlaying = !0, this.root || this.initialize(), e.$ticker.$addPlayer(this))
            }, l.initialize = function () {
                var e;
                if (this.entryClassName && (e = t.getDefinitionByName(this.entryClassName)), e) {
                    var i = new e;
                    this.root = i, i instanceof t.DisplayObject && this.stage.addChild(i)
                }
            }, l.stop = function () {
                this.pause(), this.stage = null
            }, l.pause = function () {
                this.isPlaying && (this.isPlaying = !1, e.$ticker.$removePlayer(this))
            }, l.$render = function (e, i) {
                (this.showFPS || this.showLog) && this.stage.addChild(this.fpsDisplay), this.callLaters(), this.callLaterAsyncs();
                var n = this.stage, s = t.getTimer(), a = n.$displayList.updateDirtyRegions(), r = t.getTimer();
                a = a.concat();
                var o = n.$displayList.drawToSurface();
                this._showPaintRect && this.drawPaintRect(a);
                var h = t.getTimer();
                if (e && this.showFPS) {
                    var l = 0;
                    if (o > 0) {
                        for (var u = a.length, c = 0, d = 0; u > d; d++) c += a[d].area;
                        l = Math.ceil(1e3 * c / (n.stageWidth * n.stageHeight)) / 10
                    }
                    this.fpsDisplay.update(o, l, r - s, h - r, i)
                }
            }, l.callLaters = function () {
                if (t.$callLaterFunctionList.length > 0) {
                    var e = t.$callLaterFunctionList;
                    t.$callLaterFunctionList = [];
                    var i = t.$callLaterThisList;
                    t.$callLaterThisList = [];
                    var n = t.$callLaterArgsList;
                    t.$callLaterArgsList = []
                }
                if (e) for (var s = e.length, a = 0; s > a; a++) {
                    var r = e[a];
                    null != r && r.apply(i[a], n[a])
                }
            }, l.callLaterAsyncs = function () {
                if (t.$callAsyncFunctionList.length > 0) {
                    var e = t.$callAsyncFunctionList, i = t.$callAsyncThisList, n = t.$callAsyncArgsList;
                    t.$callAsyncFunctionList = [], t.$callAsyncThisList = [], t.$callAsyncArgsList = [];
                    for (var s = 0; s < e.length; s++) {
                        var a = e[s];
                        null != a && a.apply(i[s], n[s])
                    }
                }
            }, l.updateStageSize = function (e, i) {
                var n = this.stage;
                (e !== n.$stageWidth || i !== n.$stageHeight) && (n.$stageWidth = e, n.$stageHeight = i, this.screenDisplayList.setClipRect(e, i), this.stageDisplayList && this.stageDisplayList.setClipRect(e, i), n.dispatchEventWith(t.Event.RESIZE), n.$invalidate(!0))
            }, o
        }(t.HashObject);
        e.Player = o, t.registerClass(o, "egret.sys.Player");
        var h, l, u = [];
        e.$logToFPS = function (t) {
            return h ? void h.updateInfo(t) : void u.push(t)
        }, FPS = function (e) {
            function i(i, n, s, a, r) {
                e.call(this), this.isFPS = !0, this.infoLines = [], this.totalTime = 0, this.totalTick = 0, this.lastTime = 0, this.drawCalls = 0, this.dirtyRatio = 0, this.costDirty = 0, this.costRender = 0, this.costTicker = 0, this._stage = i, this.showFPS = n, this.showLog = s, this.logFilter = a, this.touchChildren = !1, this.touchEnabled = !1, this.styles = r, this.createDisplay();
                try {
                    var o = a ? new RegExp(a) : null
                } catch (h) {
                    t.log(h)
                }
                this.filter = function (t) {
                    return o ? o.test(t) : !a || 0 == t.indexOf(a)
                }
            }

            return __extends(i, e), i.prototype.createDisplay = function () {
                this.shape = new t.Shape, this.addChild(this.shape);
                var e = new t.TextField;
                e.size = void 0 === this.styles.size ? 24 : parseInt(this.styles.size), this.addChild(e), this.textField = e, e.textColor = void 0 === this.styles.textColor ? 49664 : parseInt(this.styles.textColor), e.fontFamily = "monospace", e.x = 10, e.y = 10;
                var e = new t.TextField;
                this.infoText = e, this.addChild(e), e.textColor = void 0 === this.styles.textColor ? 49664 : parseInt(this.styles.textColor), e.fontFamily = "monospace", e.x = 10, e.size = void 0 === this.styles.size ? 12 : this.styles.size / 2, e.y = 10
            }, i.prototype.update = function (e, i, n, s, a) {
                var r = t.getTimer();
                if (this.totalTime += r - this.lastTime, this.lastTime = r, this.totalTick++, this.drawCalls += e, this.dirtyRatio += i, this.costDirty += n, this.costRender += s, this.costTicker += a, this.totalTime >= 1e3) {
                    var o = Math.ceil(1e3 * this.totalTick / this.totalTime),
                        h = Math.round(this.drawCalls / this.totalTick),
                        l = Math.round(this.dirtyRatio / this.totalTick),
                        u = Math.round(this.costDirty / this.totalTick),
                        c = Math.round(this.costRender / this.totalTick),
                        d = Math.round(this.costTicker / this.totalTick),
                        f = "FPS: " + o + "\nDraw: " + h + "," + l + "%\nCost: " + d + "," + u + "," + c;
                    this.textField.text != f && (this.textField.text = f, this.updateLayout()), this.totalTick = 0, this.totalTime = this.totalTime % 500, this.drawCalls = 0, this.dirtyRatio = 0, this.costDirty = 0, this.costRender = 0, this.costTicker = 0
                }
            }, i.prototype.updateInfo = function (t) {
                if (this.showLog && this.filter(t)) {
                    var e = this.infoLines;
                    if (t && e.push(t), this.infoText.width = NaN, this.infoText.text = e.join("\n"), this._stage.stageHeight > 0) for (this.infoText.textWidth > this._stage.stageWidth - 20 && (this.infoText.width = this._stage.stageWidth - 20); this.infoText.textHeight > this._stage.stageHeight - 20;) e.shift(), this.infoText.text = e.join("\n");
                    this.updateLayout()
                }
            }, i.prototype.updateLayout = function () {
                if (this.showFPS && (this.infoText.y = this.textField.height + 20), t.Capabilities.runtimeType != t.RuntimeType.NATIVE) {
                    var e = this.shape.$graphics;
                    e.clear(), e.beginFill(4473924, this.styles.bgAlpha || .9), e.drawRect(0, 0, Math.max(160, this.width + 20), this.height + 20), e.endFill()
                }
            }, i
        }(t.Sprite), t.warn = function () {
            console.warn.apply(console, r(arguments))
        }, t.error = function () {
            console.error.apply(console, r(arguments))
        }, t.assert = function () {
            console.assert.apply(console, r(arguments))
        }, t.log = function () {
            console.log.apply(console, r(arguments))
        }
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        var i = [], n = function () {
            function t() {
                this.minX = 0, this.minY = 0, this.maxX = 0, this.maxY = 0, this.width = 0, this.height = 0, this.area = 0, this.moved = !1
            }

            var e = t, n = e.prototype;
            return t.release = function (t) {
                i.push(t)
            }, t.create = function () {
                var e = i.pop();
                return e || (e = new t), e
            }, n.setTo = function (t, e, i, n) {
                return this.minX = t, this.minY = e, this.maxX = i, this.maxY = n, this.updateArea(), this
            }, n.updateArea = function () {
                this.width = this.maxX - this.minX, this.height = this.maxY - this.minY, this.area = this.width * this.height
            }, n.union = function (t) {
                this.minX > t.minX && (this.minX = t.minX), this.minY > t.minY && (this.minY = t.minY), this.maxX < t.maxX && (this.maxX = t.maxX), this.maxY < t.maxY && (this.maxY = t.maxY), this.updateArea()
            }, n.intersect = function (t) {
                return this.minX < t.minX && (this.minX = t.minX), this.maxX > t.maxX && (this.maxX = t.maxX), this.minX >= this.maxX ? void this.setEmpty() : (this.minY < t.minY && (this.minY = t.minY), this.maxY > t.maxY && (this.maxY = t.maxY), this.minY >= this.maxY ? void this.setEmpty() : void this.updateArea())
            }, n.setEmpty = function () {
                this.minX = 0, this.minY = 0, this.maxX = 0, this.maxY = 0, this.width = 0, this.height = 0, this.area = 0
            }, n.isEmpty = function () {
                return this.width <= 0 || this.height <= 0
            }, n.intersects = function (t) {
                if (this.isEmpty()) return !1;
                var e = this.minX > t.minX ? this.minX : t.minX, i = this.maxX < t.maxX ? this.maxX : t.maxX;
                return !(e > i) && (e = this.minY > t.minY ? this.minY : t.minY, i = this.maxY < t.maxY ? this.maxY : t.maxY, i >= e)
            }, n.updateRegion = function (t, e) {
                if (0 == t.width || 0 == t.height) return void this.setEmpty();
                var i, n, s, a, r = e, o = r.a, h = r.b, l = r.c, u = r.d, c = r.tx, d = r.ty, f = t.x, g = t.y,
                    p = f + t.width, _ = g + t.height;
                if (1 == o && 0 == h && 0 == l && 1 == u) i = Math.floor(f + c) - 1, n = Math.floor(g + d) - 1, s = Math.ceil(p + c) + 1, a = Math.ceil(_ + d) + 1; else {
                    var m = o * f + l * g + c, v = h * f + u * g + d, T = o * p + l * g + c, y = h * p + u * g + d,
                        E = o * p + l * _ + c, x = h * p + u * _ + d, b = o * f + l * _ + c, D = h * f + u * _ + d,
                        S = 0;
                    m > T && (S = m, m = T, T = S), E > b && (S = E, E = b, b = S), i = Math.floor(E > m ? m : E) - 1, s = Math.ceil(T > b ? T : b) + 1, v > y && (S = v, v = y, y = S), x > D && (S = x, x = D, D = S), n = Math.floor(x > v ? v : x) - 1, a = Math.ceil(y > D ? y : D) + 1
                }
                this.minX = i, this.minY = n, this.maxX = s, this.maxY = a, this.width = s - i, this.height = a - n, this.area = this.width * this.height
            }, t
        }();
        e.Region = n, t.registerClass(n, "egret.sys.Region")
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (t) {
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        var i = function (e) {
            function i() {
                e.call(this)
            }

            __extends(i, e);
            var n = i, s = n.prototype;
            return s.calculateStageSize = function (e, i, n, s, a) {
                var r = i, o = n, h = s, l = a, u = i / h || 0, c = n / l || 0;
                switch (e) {
                    case t.StageScaleMode.EXACT_FIT:
                        break;
                    case t.StageScaleMode.FIXED_HEIGHT:
                        h = Math.round(i / c);
                        break;
                    case t.StageScaleMode.FIXED_WIDTH:
                        l = Math.round(n / u);
                        break;
                    case t.StageScaleMode.NO_BORDER:
                        u > c ? o = Math.round(l * u) : r = Math.round(h * c);
                        break;
                    case t.StageScaleMode.SHOW_ALL:
                        u > c ? r = Math.round(h * c) : o = Math.round(l * u);
                        break;
                    case t.StageScaleMode.FIXED_NARROW:
                        u > c ? h = Math.round(i / c) : l = Math.round(n / u);
                        break;
                    case t.StageScaleMode.FIXED_WIDE:
                        u > c ? l = Math.round(n / u) : h = Math.round(i / c);
                        break;
                    default:
                        h = i, l = n
                }
                return {stageWidth: h, stageHeight: l, displayWidth: r, displayHeight: o}
            }, i
        }(t.HashObject);
        e.DefaultScreenAdapter = i, t.registerClass(i, "egret.sys.DefaultScreenAdapter", ["egret.sys.IScreenAdapter"])
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function () {
        function t() {
        }

        var e = t;
        return e.prototype, t.NO_SCALE = "noScale", t.SHOW_ALL = "showAll", t.NO_BORDER = "noBorder", t.EXACT_FIT = "exactFit", t.FIXED_WIDTH = "fixedWidth", t.FIXED_HEIGHT = "fixedHeight", t.FIXED_NARROW = "fixedNarrow", t.FIXED_WIDE = "fixedWide", t
    }();
    t.StageScaleMode = e, t.registerClass(e, "egret.StageScaleMode")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (t) {
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        e.$START_TIME = 0, e.$invalidateRenderFlag = !1, e.$requestRenderingFlag = !1;
        var i = function () {
            function i() {
                this.playerList = [], this.callBackList = [], this.thisObjectList = [], this.$frameRate = 30, this.frameInterval = 2e3, this.lastCount = 2e3, this.costEnterFrame = 0, e.$START_TIME = Date.now()
            }

            var n = i, s = n.prototype;
            return s.$addPlayer = function (t) {
                -1 == this.playerList.indexOf(t) && (this.playerList = this.playerList.concat(), this.playerList.push(t))
            }, s.$removePlayer = function (t) {
                var e = this.playerList.indexOf(t);
                -1 !== e && (this.playerList = this.playerList.concat(), this.playerList.splice(e, 1))
            }, s.$startTick = function (t, e) {
                var i = this.getTickIndex(t, e);
                -1 == i && (this.concatTick(), this.callBackList.push(t), this.thisObjectList.push(e))
            }, s.$stopTick = function (t, e) {
                var i = this.getTickIndex(t, e);
                -1 != i && (this.concatTick(), this.callBackList.splice(i, 1), this.thisObjectList.splice(i, 1))
            }, s.getTickIndex = function (t, e) {
                for (var i = this.callBackList, n = this.thisObjectList, s = i.length - 1; s >= 0; s--) if (i[s] == t && n[s] == e) return s;
                return -1
            }, s.concatTick = function () {
                this.callBackList = this.callBackList.concat(), this.thisObjectList = this.thisObjectList.concat()
            }, s.$setFrameRate = function (e) {
                return e = +e || 0, !(0 >= e) && (this.$frameRate != e && (this.$frameRate = e, e > 60 && (e = 60), t.Capabilities.runtimeType == t.RuntimeType.NATIVE && (egret_native.setFrameRate(e), e = 60), this.lastCount = this.frameInterval = Math.round(6e4 / e), !0))
            }, s.update = function () {
                for (var i = t.getTimer(), n = this.callBackList, s = this.thisObjectList, a = n.length, r = e.$requestRenderingFlag, o = t.getTimer(), h = 0; a > h; h++) n[h].call(s[h], o) && (r = !0);
                this.lastCount -= 1e3;
                var l = t.getTimer();
                if (this.lastCount > 0) return void(r && this.render(!1, this.costEnterFrame + l - i));
                this.lastCount += this.frameInterval, this.render(!0, this.costEnterFrame + l - i);
                var u = t.getTimer();
                this.broadcastEnterFrame();
                var c = t.getTimer();
                this.costEnterFrame = c - u
            }, s.render = function (t, i) {
                var n = this.playerList, s = n.length;
                if (0 != s) {
                    e.$invalidateRenderFlag && (this.broadcastRender(), e.$invalidateRenderFlag = !1);
                    for (var a = 0; s > a; a++) n[a].$render(t, i);
                    e.$requestRenderingFlag = !1
                }
            }, s.broadcastEnterFrame = function () {
                var e = t.DisplayObject.$enterFrameCallBackList, i = e.length;
                if (0 != i) {
                    e = e.concat();
                    for (var n = 0; i > n; n++) e[n].dispatchEventWith(t.Event.ENTER_FRAME)
                }
            }, s.broadcastRender = function () {
                var e = t.DisplayObject.$renderCallBackList, i = e.length;
                if (0 != i) {
                    e = e.concat();
                    for (var n = 0; i > n; n++) e[n].dispatchEventWith(t.Event.RENDER)
                }
            }, i
        }();
        e.SystemTicker = i, t.registerClass(i, "egret.sys.SystemTicker"), e.$ticker = new e.SystemTicker
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret_stages, egret;
!function (t) {
    var e;
    !function (e) {
        var i = function (e) {
            function i(t) {
                e.call(this), this.maxTouches = 0, this.useTouchesCount = 0, this.touchDownTarget = {}, this.lastTouchX = -1, this.lastTouchY = -1, this.stage = t
            }

            __extends(i, e);
            var n = i, s = n.prototype;
            return s.$initMaxTouches = function () {
                this.maxTouches = this.stage.$maxTouches
            }, s.onTouchBegin = function (e, i, n) {
                if (!(this.useTouchesCount >= this.maxTouches)) {
                    this.lastTouchX = e, this.lastTouchY = i;
                    var s = this.findTarget(e, i);
                    null == this.touchDownTarget[n] && (this.touchDownTarget[n] = s, this.useTouchesCount++), t.TouchEvent.dispatchTouchEvent(s, t.TouchEvent.TOUCH_BEGIN, !0, !0, e, i, n, !0)
                }
            }, s.onTouchMove = function (e, i, n) {
                if (null != this.touchDownTarget[n] && (this.lastTouchX != e || this.lastTouchY != i)) {
                    this.lastTouchX = e, this.lastTouchY = i;
                    var s = this.findTarget(e, i);
                    t.TouchEvent.dispatchTouchEvent(s, t.TouchEvent.TOUCH_MOVE, !0, !0, e, i, n, !0)
                }
            }, s.onTouchEnd = function (e, i, n) {
                if (null != this.touchDownTarget[n]) {
                    var s = this.findTarget(e, i), a = this.touchDownTarget[n];
                    delete this.touchDownTarget[n], this.useTouchesCount--, t.TouchEvent.dispatchTouchEvent(s, t.TouchEvent.TOUCH_END, !0, !0, e, i, n, !1), a == s ? t.TouchEvent.dispatchTouchEvent(s, t.TouchEvent.TOUCH_TAP, !0, !0, e, i, n, !1) : t.TouchEvent.dispatchTouchEvent(a, t.TouchEvent.TOUCH_RELEASE_OUTSIDE, !0, !0, e, i, n, !1)
                }
            }, s.findTarget = function (t, e) {
                var i = this.stage.$hitTest(t, e);
                return i || (i = this.stage), i
            }, i
        }(t.HashObject);
        e.TouchHandler = i, t.registerClass(i, "egret.sys.TouchHandler")
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        var i = function () {
            function i() {
                this.type = 0, this.needRedraw = !1, this.renderAlpha = 1, this.renderVisible = !0, this.renderMatrix = new t.Matrix, this.renderRegion = new e.Region, this.moved = !1, this.drawData = [], this.renderCount = 0
            }

            var n = i, s = n.prototype;
            return s.cleanBeforeRender = function () {
                this.drawData.length = 0, this.renderCount = 0
            }, s.$getRenderCount = function () {
                return this.renderCount
            }, i
        }();
        e.RenderNode = i, t.registerClass(i, "egret.sys.RenderNode")
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        var i = function (t) {
            function e() {
                t.call(this), this.image = null, this.smoothing = !0, this.type = 1
            }

            __extends(e, t);
            var i = e, n = i.prototype;
            return n.drawImage = function (t, e, i, n, s, a, r, o) {
                this.drawData.push(t, e, i, n, s, a, r, o), this.renderCount++
            }, n.cleanBeforeRender = function () {
                t.prototype.cleanBeforeRender.call(this), this.image = null
            }, e
        }(e.RenderNode);
        e.BitmapNode = i, t.registerClass(i, "egret.sys.BitmapNode")
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        var i = ["none", "round", "square"], n = ["bevel", "miter", "round"], s = function (s) {
            function a() {
                s.call(this), this.type = 3
            }

            __extends(a, s);
            var r = a, o = r.prototype;
            return o.beginFill = function (t, i, n) {
                void 0 === i && (i = 1);
                var s = new e.FillPath;
                if (s.fillColor = t, s.fillAlpha = i, n) {
                    var a = this.drawData.lastIndexOf(n);
                    this.drawData.splice(a, 0, s)
                } else this.drawData.push(s);
                return s
            }, o.beginGradientFill = function (i, n, s, a, r, o) {
                var h = new t.Matrix;
                r ? (h.a = 819.2 * r.a, h.b = 819.2 * r.b, h.c = 819.2 * r.c, h.d = 819.2 * r.d, h.tx = r.tx, h.ty = r.ty) : (h.a = 100, h.d = 100);
                var l = new e.GradientFillPath;
                if (l.gradientType = i, l.colors = n, l.alphas = s, l.ratios = a, l.matrix = h, o) {
                    var u = this.drawData.lastIndexOf(o);
                    this.drawData.splice(u, 0, l)
                } else this.drawData.push(l);
                return l
            }, o.lineStyle = function (s, a, r, o, h, l) {
                void 0 === r && (r = 1), void 0 === l && (l = 3), -1 == i.indexOf(o) && (o = "round"), -1 == n.indexOf(h) && (h = "round");
                var u = new e.StrokePath;
                return u.lineWidth = s, u.lineColor = a, u.lineAlpha = r, u.caps = o || t.CapsStyle.ROUND, u.joints = h, u.miterLimit = l, this.drawData.push(u), u
            }, o.clear = function () {
                this.drawData.length = 0
            }, o.cleanBeforeRender = function () {
            }, a
        }(e.RenderNode);
        e.GraphicsNode = s, t.registerClass(s, "egret.sys.GraphicsNode")
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        var i = function (t) {
            function e() {
                t.call(this), this.type = 4
            }

            __extends(e, t);
            var i = e, n = i.prototype;
            return n.addNode = function (t) {
                this.drawData.push(t)
            }, n.cleanBeforeRender = function () {
                for (var t = this.drawData, e = t.length - 1; e >= 0; e--) t[e].cleanBeforeRender()
            }, n.$getRenderCount = function () {
                for (var t = 0, e = this.drawData, i = e.length - 1; i >= 0; i--) t += e[i].$getRenderCount();
                return t
            }, e
        }(e.RenderNode);
        e.GroupNode = i, t.registerClass(i, "egret.sys.GroupNode")
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        var i = function (t) {
            function e() {
                t.call(this), this.type = 6
            }

            __extends(e, t);
            var i = e, n = i.prototype;
            return n.setAlpha = function (t) {
                0 != this.drawData.length && (this.drawData.length = 0), this.drawData.push(t), this.renderCount++
            }, e
        }(e.RenderNode);
        e.SetAlphaNode = i, t.registerClass(i, "egret.sys.SetAlphaNode")
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        var i = function (t) {
            function e() {
                t.call(this), this.type = 5
            }

            __extends(e, t);
            var i = e, n = i.prototype;
            return n.setTransform = function (t, e, i, n, s, a) {
                0 != this.drawData.length && (this.drawData.length = 0), this.drawData.push(t, e, i, n, s, a), this.renderCount++
            }, e
        }(e.RenderNode);
        e.SetTransformNode = i, t.registerClass(i, "egret.sys.SetTransformNode")
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        var i = function (t) {
            function e() {
                t.call(this), this.textColor = 16777215, this.strokeColor = 0, this.size = 30, this.stroke = 0, this.bold = !1, this.italic = !1, this.fontFamily = "Arial", this.type = 2
            }

            __extends(e, t);
            var i = e, n = i.prototype;
            return n.drawText = function (t, e, i, n) {
                this.drawData.push(t, e, i, n), this.renderCount++
            }, n.cleanBeforeRender = function () {
                t.prototype.cleanBeforeRender.call(this)
            }, e
        }(e.RenderNode);
        e.TextNode = i, t.registerClass(i, "egret.sys.TextNode")
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        var i = function () {
            function t() {
                this.type = 0, this.$commands = [], this.$data = [],
                    this.commandPosition = 0, this.dataPosition = 0
            }

            var e = t, i = e.prototype;
            return i.moveTo = function (t, e) {
                this.$commands[this.commandPosition++] = 1;
                var i = this.dataPosition;
                this.$data[i++] = t, this.$data[i++] = e, this.dataPosition = i
            }, i.lineTo = function (t, e) {
                this.$commands[this.commandPosition++] = 2;
                var i = this.dataPosition;
                this.$data[i++] = t, this.$data[i++] = e, this.dataPosition = i
            }, i.curveTo = function (t, e, i, n) {
                this.$commands[this.commandPosition++] = 3;
                var s = this.dataPosition;
                this.$data[s++] = t, this.$data[s++] = e, this.$data[s++] = i, this.$data[s++] = n, this.dataPosition = s
            }, i.cubicCurveTo = function (t, e, i, n, s, a) {
                this.$commands[this.commandPosition++] = 4;
                var r = this.dataPosition;
                this.$data[r++] = t, this.$data[r++] = e, this.$data[r++] = i, this.$data[r++] = n, this.$data[r++] = s, this.$data[r++] = a, this.dataPosition = r
            }, i.drawRect = function (t, e, i, n) {
                var s = t + i, a = e + n;
                this.moveTo(t, e), this.lineTo(s, e), this.lineTo(s, a), this.lineTo(t, a), this.lineTo(t, e)
            }, i.drawRoundRect = function (t, e, i, n, s, a) {
                var r = .5 * s | 0, o = a ? .5 * a | 0 : r;
                if (!r || !o) return void this.drawRect(t, e, i, n);
                var h = .5 * i, l = .5 * n;
                if (r > h && (r = h), o > l && (o = l), h === r && l === o) return void(r === o ? this.drawCircle(t + r, e + o, r) : this.drawEllipse(t, e, 2 * r, 2 * o));
                var u = t + i, c = e + n, d = t + r, f = u - r, g = e + o, p = c - o;
                this.moveTo(u, p), this.curveTo(u, c, f, c), this.lineTo(d, c), this.curveTo(t, c, t, p), this.lineTo(t, g), this.curveTo(t, e, d, e), this.lineTo(f, e), this.curveTo(u, e, u, g), this.lineTo(u, p)
            }, i.drawCircle = function (t, e, i) {
                this.arcToBezier(t, e, i, i, 0, 2 * Math.PI)
            }, i.drawEllipse = function (t, e, i, n) {
                var s = .5 * i, a = .5 * n;
                t += s, e += a, this.arcToBezier(t, e, s, a, 0, 2 * Math.PI)
            }, i.drawArc = function (t, e, i, n, s, a) {
                a ? s >= n && (s -= 2 * Math.PI) : n >= s && (s += 2 * Math.PI), this.arcToBezier(t, e, i, i, n, s, a)
            }, i.arcToBezier = function (t, e, i, n, s, a, r) {
                var o = .5 * Math.PI, h = s, l = h;
                r ? (l += -o - h % o, a > l && (l = a)) : (l += o - h % o, l > a && (l = a));
                var u = t + Math.cos(h) * i, c = e + Math.sin(h) * n;
                this.moveTo(u, c);
                for (var d = 0; 4 > d; d++) {
                    var f = l - h, g = 4 * Math.tan(f / 4) / 3, p = u - g * (c - e), _ = c + g * (u - t);
                    u = t + Math.cos(l) * i, c = e + Math.sin(l) * n;
                    var m = u + g * (c - e), v = c - g * (u - t);
                    if (this.cubicCurveTo(p, _, m, v, u, c), l === a) break;
                    h = l, r ? (l = h - o, a > l && (l = a)) : (l = h + o, l > a && (l = a))
                }
            }, t
        }();
        e.Path2D = i, t.registerClass(i, "egret.sys.Path2D")
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        var i = function (t) {
            function e() {
                t.call(this), this.type = 1
            }

            __extends(e, t);
            var i = e;
            return i.prototype, e
        }(e.Path2D);
        e.FillPath = i, t.registerClass(i, "egret.sys.FillPath")
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        var i = function (t) {
            function e() {
                t.call(this), this.type = 2
            }

            __extends(e, t);
            var i = e;
            return i.prototype, e
        }(e.Path2D);
        e.GradientFillPath = i, t.registerClass(i, "egret.sys.GradientFillPath")
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        var i = function (t) {
            function e() {
                t.call(this), this.type = 3
            }

            __extends(e, t);
            var i = e;
            return i.prototype, e
        }(e.Path2D);
        e.StrokePath = i, t.registerClass(i, "egret.sys.StrokePath")
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    function e(t, e) {
        var i = null == e.italic ? t.italic : e.italic, n = null == e.bold ? t.bold : e.bold,
            s = null == e.size ? t.size : e.size, a = e.fontFamily || t.fontFamily, r = i ? "italic " : "normal ";
        return r += n ? "bold " : "normal ", r += s + "px " + a
    }

    function i(t, e) {
        var i = t >> 16, n = t >> 8 & 255, s = 255 & t;
        return "rgba(" + i + "," + n + "," + s + "," + e + ")"
    }

    function n(e, n, s, a, r, o) {
        var h;
        h = n == t.GradientType.LINEAR ? e.createLinearGradient(-1, 0, 1, 0) : e.createRadialGradient(0, 0, 0, 0, 0, 1);
        for (var l = s.length, u = 0; l > u; u++) h.addColorStop(r[u] / 255, i(s[u], a[u]));
        return h
    }

    var s = ["source-over", "lighter", "destination-out"], a = "source-over", r = "#000000",
        o = {none: "butt", square: "square", round: "round"}, h = [], l = function () {
            function l() {
                this.nestLevel = 0
            }

            var u = l, c = u.prototype;
            return c.render = function (t, e, i, n, s) {
                this.nestLevel++;
                var a = e.context, r = s ? t : null, o = this.drawDisplayObject(t, a, n, i, null, null, r);
                if (this.nestLevel--, 0 === this.nestLevel) {
                    h.length > 6 && (h.length = 6);
                    for (var l = h.length, u = 0; l > u; u++) h[u].resize(0, 0)
                }
                return o
            }, c.drawDisplayObject = function (e, i, n, s, a, r, o) {
                var h, l = 0;
                if (a && !o ? (a.isDirty && (l += a.drawToSurface()), h = a.$renderNode) : h = e.$getRenderNode(), h) {
                    if (n) {
                        var u = h.renderRegion;
                        if (r && !r.intersects(u)) h.needRedraw = !1; else if (!h.needRedraw) for (var c = n.length, d = 0; c > d; d++) if (u.intersects(n[d])) {
                            h.needRedraw = !0;
                            break
                        }
                    } else h.needRedraw = !0;
                    if (h.needRedraw) {
                        l++;
                        var f, g;
                        o ? (f = e.$getConcatenatedAlphaAt(o, e.$getConcatenatedAlpha()), g = t.Matrix.create().copyFrom(e.$getConcatenatedMatrix()), e.$getConcatenatedMatrixAt(o, g), s.$preMultiplyInto(g, g), i.setTransform(g.a, g.b, g.c, g.d, g.tx, g.ty), t.Matrix.release(g)) : (f = h.renderAlpha, g = h.renderMatrix, i.setTransform(g.a, g.b, g.c, g.d, g.tx + s.tx, g.ty + s.ty)), i.globalAlpha = f, this.renderNode(h, i), h.needRedraw = !1
                    }
                }
                if (a && !o) return l;
                var p = e.$children;
                if (p) for (var _ = p.length, m = 0; _ > m; m++) {
                    var v = p[m];
                    !v.$visible || v.$alpha <= 0 || v.$maskedObject || (0 !== v.$blendMode || v.$mask && v.$mask.$parentDisplayList ? l += this.drawWithClip(v, i, n, s, r, o) : v.$scrollRect || v.$maskRect ? l += this.drawWithScrollRect(v, i, n, s, r, o) : v.isFPS ? this.drawDisplayObject(v, i, n, s, v.$displayList, r, o) : l += this.drawDisplayObject(v, i, n, s, v.$displayList, r, o))
                }
                return l
            }, c.drawWithClip = function (e, i, n, r, o, l) {
                var u = 0, c = 0 !== e.$blendMode;
                if (c) {
                    var d = s[e.$blendMode];
                    d || (d = a)
                }
                var f = e.$scrollRect ? e.$scrollRect : e.$maskRect, g = e.$mask;
                g && !g.$parentDisplayList && (g = null);
                var p, _ = t.Matrix.create();
                _.copyFrom(e.$getConcatenatedMatrix());
                var m, v = e.$parentDisplayList.root;
                if (v !== e.$stage && e.$getConcatenatedMatrixAt(v, _), g) {
                    var T = g.$getOriginalBounds();
                    p = t.sys.Region.create();
                    var y = t.Matrix.create();
                    y.copyFrom(g.$getConcatenatedMatrix()), m && m.$preMultiplyInto(y, y), p.updateRegion(T, y), t.Matrix.release(y)
                }
                var E;
                if (f && (E = t.sys.Region.create(), E.updateRegion(f, _)), E && p ? (E.intersect(p), t.sys.Region.release(p)) : !E && p && (E = p), E) {
                    if (E.isEmpty() || o && !o.intersects(E)) return t.sys.Region.release(E), t.Matrix.release(_), u
                } else E = t.sys.Region.create(), T = e.$getOriginalBounds(), E.updateRegion(T, _);
                for (var x = !1, b = n.length, D = 0; b > D; D++) if (E.intersects(n[D])) {
                    x = !0;
                    break
                }
                if (!x) return t.sys.Region.release(E), t.Matrix.release(_), u;
                var S = this.createRenderBuffer(E.width, E.height), C = S.context;
                if (!C) return u += this.drawDisplayObject(e, i, n, r, e.$displayList, o, l), t.sys.Region.release(E), t.Matrix.release(_), u;
                if (f) {
                    var y = _;
                    C.setTransform(y.a, y.b, y.c, y.d, y.tx - E.minX, y.ty - E.minY), C.beginPath(), C.rect(f.x, f.y, f.width, f.height), C.clip()
                }
                C.setTransform(1, 0, 0, 1, -E.minX, -E.minY);
                var w = t.Matrix.create().setTo(1, 0, 0, 1, -E.minX, -E.minY);
                if (u += this.drawDisplayObject(e, C, n, w, e.$displayList, E, l ? e : null), t.Matrix.release(w), g) {
                    var L = g.$getRenderNode();
                    if (L && 1 == L.$getRenderCount() || g.$displayList) C.globalCompositeOperation = "destination-in", u += this.drawDisplayObject(g, C, n, w, g.$displayList, E, l ? g : null); else {
                        var $ = this.createRenderBuffer(E.width, E.height), A = $.context;
                        if (!A) return u += this.drawDisplayObject(e, i, n, r, e.$displayList, o, l), h.push(S), t.sys.Region.release(E), t.Matrix.release(_), u;
                        A.setTransform(1, 0, 0, 1, -E.minX, -E.minY), w = t.Matrix.create().setTo(1, 0, 0, 1, -E.minX, -E.minY);
                        var O = this.drawDisplayObject(g, A, n, w, g.$displayList, E, l ? g : null);
                        t.Matrix.release(w), O > 0 && (u += O, C.globalCompositeOperation = "destination-in", C.setTransform(1, 0, 0, 1, 0, 0), C.globalAlpha = 1, C.drawImage($.surface, 0, 0)), h.push($)
                    }
                }
                return u > 0 && (u++, c && (i.globalCompositeOperation = d), i.globalAlpha = 1, i.setTransform(1, 0, 0, 1, E.minX + r.tx, E.minY + r.ty), i.drawImage(S.surface, 0, 0), c && (i.globalCompositeOperation = a)), h.push(S), t.sys.Region.release(E), t.Matrix.release(_), u
            }, c.drawWithScrollRect = function (e, i, n, s, a, r) {
                var o = 0, h = e.$scrollRect ? e.$scrollRect : e.$maskRect;
                if (0 == h.width || 0 == h.height) return o;
                var l = t.Matrix.create();
                l.copyFrom(e.$getConcatenatedMatrix());
                var u = e.$parentDisplayList.root;
                u !== e.$stage && e.$getConcatenatedMatrixAt(u, l);
                var c = t.sys.Region.create();
                if (h.isEmpty() || c.updateRegion(h, l), c.isEmpty() || a && !a.intersects(c)) return t.sys.Region.release(c), t.Matrix.release(l), o;
                for (var d = !1, f = n.length, g = 0; f > g; g++) if (c.intersects(n[g])) {
                    d = !0;
                    break
                }
                return d ? (i.save(), i.setTransform(l.a, l.b, l.c, l.d, l.tx + s.tx, l.ty + s.ty), i.beginPath(), i.rect(h.x, h.y, h.width, h.height), i.clip(), o += this.drawDisplayObject(e, i, n, s, e.$displayList, c, r), i.restore(), t.sys.Region.release(c), t.Matrix.release(l), o) : (t.sys.Region.release(c), t.Matrix.release(l), o)
            }, c.drawNodeToBuffer = function (t, e, i, n) {
                var s = e.context;
                s.setTransform(i.a, i.b, i.c, i.d, i.tx, i.ty), this.renderNode(t, s, n)
            }, c.renderNode = function (t, e, i) {
                switch (t.type) {
                    case 1:
                        this.renderBitmap(t, e);
                        break;
                    case 2:
                        this.renderText(t, e);
                        break;
                    case 3:
                        this.renderGraphics(t, e, i);
                        break;
                    case 4:
                        this.renderGroup(t, e);
                        break;
                    case 5:
                        e.setTransform(t.drawData[0], t.drawData[1], t.drawData[2], t.drawData[3], t.drawData[4], t.drawData[5]);
                        break;
                    case 6:
                        e.globalAlpha = t.drawData[0]
                }
            }, c.renderBitmap = function (t, e) {
                var i = t.image;
                e.imageSmoothingEnabled = t.smoothing;
                for (var n = t.drawData, s = n.length, a = 0; s > a;) e.drawImage(i, n[a++], n[a++], n[a++], n[a++], n[a++], n[a++], n[a++], n[a++])
            }, c.renderText = function (i, n) {
                n.textAlign = "left", n.textBaseline = "middle", n.lineJoin = "round";
                for (var s = i.drawData, a = s.length, r = 0; a > r;) {
                    var o = s[r++], h = s[r++], l = s[r++], u = s[r++];
                    n.font = e(i, u);
                    var c = null == u.textColor ? i.textColor : u.textColor,
                        d = null == u.strokeColor ? i.strokeColor : u.strokeColor,
                        f = null == u.stroke ? i.stroke : u.stroke;
                    n.fillStyle = t.toColorString(c), n.strokeStyle = t.toColorString(d), f && (n.lineWidth = 2 * f, n.strokeText(l, o, h)), n.fillText(l, o, h)
                }
            }, c.renderGraphics = function (t, e, s) {
                var a = t.drawData, h = a.length;
                s = !!s;
                for (var l = 0; h > l; l++) {
                    var u = a[l];
                    switch (u.type) {
                        case 1:
                            var c = u;
                            e.fillStyle = s ? r : i(c.fillColor, c.fillAlpha), this.renderPath(u, e), e.fill();
                            break;
                        case 2:
                            var d = u;
                            e.fillStyle = s ? r : n(e, d.gradientType, d.colors, d.alphas, d.ratios, d.matrix), e.save();
                            var f = d.matrix;
                            e.transform(f.a, f.b, f.c, f.d, f.tx, f.ty), this.renderPath(u, e), e.fill(), e.restore();
                            break;
                        case 3:
                            var g = u, p = g.lineWidth;
                            e.lineWidth = p, e.strokeStyle = s ? r : i(g.lineColor, g.lineAlpha), e.lineCap = o[g.caps], e.lineJoin = g.joints, e.miterLimit = g.miterLimit;
                            var _ = 1 === p || 3 === p;
                            _ && e.translate(.5, .5), this.renderPath(u, e), e.stroke(), _ && e.translate(-.5, -.5)
                    }
                }
            }, c.renderPath = function (t, e) {
                e.beginPath();
                for (var i = t.$data, n = t.$commands, s = n.length, a = 0, r = 0; s > r; r++) {
                    var o = n[r];
                    switch (o) {
                        case 4:
                            e.bezierCurveTo(i[a++], i[a++], i[a++], i[a++], i[a++], i[a++]);
                            break;
                        case 3:
                            e.quadraticCurveTo(i[a++], i[a++], i[a++], i[a++]);
                            break;
                        case 2:
                            e.lineTo(i[a++], i[a++]);
                            break;
                        case 1:
                            e.moveTo(i[a++], i[a++])
                    }
                }
            }, c.renderGroup = function (t, e) {
                for (var i = t.drawData, n = i.length, s = 0; n > s; s++) {
                    var a = i[s];
                    this.renderNode(a, e)
                }
            }, c.createRenderBuffer = function (e, i) {
                var n = h.pop();
                return n ? n.resize(e, i, !0) : n = new t.sys.RenderBuffer(e, i), n
            }, l
        }();
    t.CanvasRenderer = l, t.registerClass(l, "egret.CanvasRenderer", ["egret.sys.SystemRenderer"])
}(egret || (egret = {}));
var egret;
!function (t) {
    t.DeviceOrientation = null
}(egret || (egret = {}));
var egret;
!function (t) {
}(egret || (egret = {}));
var egret;
!function (t) {
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function () {
        function t() {
        }

        var e = t;
        return e.prototype, t.WEB = "web", t.NATIVE = "native", t
    }();
    t.RuntimeType = e, t.registerClass(e, "egret.RuntimeType");
    var i = function () {
        function t() {
        }

        var e = __define, i = t;
        return i.prototype, e(t, "language", function () {
            return t.$language
        }), e(t, "isMobile", function () {
            return t.$isMobile
        }), e(t, "os", function () {
            return t.$os
        }), e(t, "runtimeType", function () {
            return t.$runtimeType
        }), t.$setNativeCapabilities = function (e) {
            var i = e.split("-");
            if (i.length <= 4) {
                var n = i[0];
                switch (n) {
                    case"android":
                        n = "Android";
                        break;
                    case"ios":
                        n = "iOS"
                }
                t.$os = n;
                var s = i[2].substring(1, i[2].length);
                t.supportVersion = s
            }
        }, t.$language = "zh-CN", t.$os = "Unknown", t.$runtimeType = "Unknown", t.supportVersion = "Unknown", t
    }();
    t.Capabilities = i, t.registerClass(i, "egret.Capabilities")
}(egret || (egret = {}));
var testDeviceType = function () {
    if (!this.navigator) return !0;
    var t = navigator.userAgent.toLowerCase();
    return -1 != t.indexOf("mobile") || -1 != t.indexOf("android")
}, testRuntimeType = function () {
    return !!this.navigator
};
egret.Capabilities.$isMobile = testDeviceType(), egret.Capabilities.$runtimeType = testRuntimeType() ? egret.RuntimeType.WEB : egret.RuntimeType.NATIVE;
var egret;
!function (t) {
    var e = function (t) {
        function e(e, i) {
            t.call(this, e), this.firstCharHeight = 0, "string" == typeof i ? this.charList = this.parseConfig(i) : i && i.hasOwnProperty("frames") ? this.charList = i.frames : this.charList = {}
        }

        __extends(e, t);
        var i = e, n = i.prototype;
        return n.getTexture = function (t) {
            var e = this._textureMap[t];
            if (!e) {
                var i = this.charList[t];
                if (!i) return null;
                e = this.createTexture(t, i.x, i.y, i.w, i.h, i.offX, i.offY, i.sourceW, i.sourceH), this._textureMap[t] = e
            }
            return e
        }, n._getFirstCharHeight = function () {
            if (0 == this.firstCharHeight) for (var t in this.charList) {
                var e = this.charList[t];
                if (e) {
                    var i = e.sourceH;
                    if (void 0 === i) {
                        var n = e.h;
                        void 0 === n && (n = 0);
                        var s = e.offY;
                        void 0 === s && (s = 0), i = n + s
                    }
                    if (0 >= i) continue;
                    this.firstCharHeight = i;
                    break
                }
            }
            return this.firstCharHeight
        }, n.parseConfig = function (t) {
            t = t.split("\r\n").join("\n");
            for (var e = t.split("\n"), i = this.getConfigByKey(e[3], "count"), n = {}, s = 4; 4 + i > s; s++) {
                var a = e[s], r = String.fromCharCode(this.getConfigByKey(a, "id")), o = {};
                n[r] = o, o.x = this.getConfigByKey(a, "x"), o.y = this.getConfigByKey(a, "y"), o.w = this.getConfigByKey(a, "width"), o.h = this.getConfigByKey(a, "height"), o.offX = this.getConfigByKey(a, "xoffset"), o.offY = this.getConfigByKey(a, "yoffset")
            }
            return n
        }, n.getConfigByKey = function (t, e) {
            for (var i = t.split(" "), n = 0, s = i.length; s > n; n++) {
                var a = i[n];
                if (e == a.substring(0, e.length)) {
                    var r = a.substring(e.length + 1);
                    return parseInt(r)
                }
            }
            return 0
        }, e
    }(t.SpriteSheet);
    t.BitmapFont = e, t.registerClass(e, "egret.BitmapFont")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function (e) {
        function i() {
            e.call(this), this.$textOffsetX = 0, this.$textOffsetY = 0, this.$textStartX = 0, this.$textStartY = 0, this.$lineHeights = [], this.$renderNode = new t.sys.BitmapNode, this.$BitmapText = {
                0: NaN,
                1: NaN,
                2: "",
                3: 0,
                4: 0,
                5: null,
                6: !1,
                7: !1,
                8: !1,
                9: !1,
                10: "left",
                11: "top",
                12: t.Bitmap.defaultSmoothing
            }
        }

        __extends(i, e);
        var n = __define, s = i, a = s.prototype;
        return n(a, "smoothing", function () {
            var t = this.$BitmapText;
            return t[12]
        }, function (t) {
            t = !!t;
            var e = this.$BitmapText;
            t != e[12] && (e[12] = t, this.$invalidate())
        }), n(a, "text", function () {
            return this.$BitmapText[2]
        }, function (t) {
            this.$setText(t)
        }), a.$setText = function (t) {
            var e = this.$BitmapText;
            return t != e[2] && (e[2] = t, this.$invalidateContentBounds(), !0)
        }, a.$getWidth = function () {
            var t = this.$BitmapText[0];
            return isNaN(t) ? this.$getContentBounds().width : t
        }, a.$setWidth = function (t) {
            var e = this.$BitmapText;
            return !(0 > t || t == e[0]) && (e[0] = t, this.$invalidateContentBounds(), !0)
        }, a.$invalidateContentBounds = function () {
            e.prototype.$invalidateContentBounds.call(this), this.$BitmapText[7] = !0
        }, a.$getHeight = function () {
            var t = this.$BitmapText[1];
            return isNaN(t) ? this.$getContentBounds().height : t
        }, a.$setHeight = function (t) {
            var e = this.$BitmapText;
            return !(0 > t || t == e[1]) && (e[1] = t, this.$invalidateContentBounds(), !0)
        }, n(a, "font", function () {
            return this.$BitmapText[5]
        }, function (t) {
            this.$setFont(t)
        }), a.$setFont = function (t) {
            var e = this.$BitmapText;
            return e[5] != t && (e[5] = t, this.$BitmapText[6] = !0, this.$invalidateContentBounds(), !0)
        }, n(a, "lineSpacing", function () {
            return this.$BitmapText[3]
        }, function (t) {
            this.$setLineSpacing(t)
        }), a.$setLineSpacing = function (t) {
            t = +t || 0;
            var e = this.$BitmapText;
            return e[3] != t && (e[3] = t, this.$invalidateContentBounds(), !0)
        }, n(a, "letterSpacing", function () {
            return this.$BitmapText[4]
        }, function (t) {
            this.$setLetterSpacing(t)
        }), a.$setLetterSpacing = function (t) {
            t = +t || 0;
            var e = this.$BitmapText;
            return e[4] != t && (e[4] = t, this.$invalidateContentBounds(), !0)
        }, n(a, "textAlign", function () {
            return this.$BitmapText[10]
        }, function (t) {
            this.$setTextAlign(t)
        }), a.$setTextAlign = function (t) {
            var e = this.$BitmapText;
            return e[10] != t && (e[10] = t, this.$invalidateContentBounds(), !0)
        }, n(a, "verticalAlign", function () {
            return this.$BitmapText[11]
        }, function (t) {
            this.$setVerticalAlign(t)
        }), a.$setVerticalAlign = function (t) {
            var e = this.$BitmapText;
            return e[11] != t && (e[11] = t, this.$invalidateContentBounds(), !0)
        }, a.$render = function () {
            var e = this.$BitmapText, n = this.$getTextLines(), s = n.length;
            if (0 != s) {
                var a = this.$textLinesWidth, r = e[5], o = this.$renderNode;
                r.$texture && (o.image = r.$texture._bitmapData), o.smoothing = e[12];
                for (var h = r._getFirstCharHeight(), l = Math.ceil(h * i.EMPTY_FACTOR), u = !isNaN(e[1]), c = e[8], d = e[0], f = e[1], g = e[10], p = this.$textOffsetY + this.$textStartY, _ = this.$lineHeights, m = 0; s > m; m++) {
                    var v = _[m];
                    if (u && m > 0 && p + v > f) break;
                    var T = n[m], y = T.length, E = this.$textOffsetX;
                    if (g != t.HorizontalAlign.LEFT) {
                        var x = d > c ? d : c;
                        g == t.HorizontalAlign.RIGHT ? E += x - a[m] : g == t.HorizontalAlign.CENTER && (E += Math.floor((x - a[m]) / 2))
                    }
                    for (var b = 0; y > b; b++) {
                        var D = T.charAt(b), S = r.getTexture(D);
                        if (S) {
                            var C = S._bitmapWidth, w = S._bitmapHeight;
                            o.drawImage(S._bitmapX, S._bitmapY, C, w, E + S._offsetX, p + S._offsetY, S.$getScaleBitmapWidth(), S.$getScaleBitmapHeight()), E += S.$getTextureWidth() + e[4]
                        } else " " == D ? E += l : t.$warn(1011, D)
                    }
                    p += v + e[3]
                }
            }
        }, a.$measureContentBounds = function (t) {
            var e = this.$getTextLines();
            0 == e.length ? t.setEmpty() : t.setTo(this.$textOffsetX + this.$textStartX, this.$textOffsetY + this.$textStartY, this.$BitmapText[8] - this.$textOffsetX, this.$BitmapText[9] - this.$textOffsetY)
        }, n(a, "textWidth", function () {
            return this.$getTextLines(), this.$BitmapText[8]
        }), n(a, "textHeight", function () {
            return this.$getTextLines(), this.$BitmapText[9]
        }), a.$getTextLines = function () {
            function e(t) {
                return !(p && s.length > 0 && u > p) && (u += C + o, L || $ || (w -= h), s.push(t), r.push(C), a.push(w), l = Math.max(w, l), !0)
            }

            var n = this.$BitmapText;
            if (!n[7]) return this.textLines;
            var s = [];
            this.textLines = s;
            var a = [];
            this.$textLinesWidth = a, n[7] = !1;
            var r = [];
            if (this.$lineHeights = r, !n[2] || !n[5]) return s;
            for (var o = n[3], h = n[4], l = 0, u = 0, c = 0, d = 0, f = !isNaN(n[0]), g = n[0], p = n[1], _ = n[5], m = _._getFirstCharHeight(), v = Math.ceil(m * i.EMPTY_FACTOR), T = n[2], y = T.split(/(?:\r\n|\r|\n)/), E = y.length, x = !0, b = 0; E > b; b++) {
                for (var D = y[b], S = D.length, C = 0, w = 0, L = !0, $ = !1, A = 0; S > A; A++) {
                    L || (w += h);
                    var O, M, I = D.charAt(A), F = 0, P = 0, R = _.getTexture(I);
                    if (R) O = R.$getTextureWidth(), M = R.$getTextureHeight(), F = R._offsetX, P = R._offsetY; else {
                        if (" " != I) {
                            t.$warn(1011, I), L && (L = !1);
                            continue
                        }
                        O = v, M = m
                    }
                    if (L && (L = !1, c = Math.min(F, c)), x && (x = !1, d = Math.min(P, d)), f && A > 0 && w + O > g) {
                        if (!e(D.substring(0, A))) break;
                        D = D.substring(A), S = D.length, A = 0, w = O, C = M
                    } else w += O, C = Math.max(M, C)
                }
                if (p && b > 0 && u > p) break;
                if ($ = !0, !e(D)) break
            }
            u -= o, n[8] = l, n[9] = u, this.$textOffsetX = c, this.$textOffsetY = d, this.$textStartX = 0, this.$textStartY = 0;
            var B;
            return g > l && (B = n[10], B == t.HorizontalAlign.RIGHT ? this.$textStartX = g - l : B == t.HorizontalAlign.CENTER && (this.$textStartX = Math.floor((g - l) / 2))), p > u && (B = n[11], B == t.VerticalAlign.BOTTOM ? this.$textStartY = p - u : B == t.VerticalAlign.MIDDLE && (this.$textStartY = Math.floor((p - u) / 2))), s
        }, i.EMPTY_FACTOR = .33, i
    }(t.DisplayObject);
    t.BitmapText = e, t.registerClass(e, "egret.BitmapText")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function () {
        function t() {
        }

        var e = t;
        return e.prototype, t.LEFT = "left", t.RIGHT = "right", t.CENTER = "center", t.JUSTIFY = "justify", t.CONTENT_JUSTIFY = "contentJustify", t
    }();
    t.HorizontalAlign = e, t.registerClass(e, "egret.HorizontalAlign")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function () {
        function e() {
            this.replaceArr = [], this.resutlArr = [], this.initReplaceArr()
        }

        var i = e, n = i.prototype;
        return n.initReplaceArr = function () {
            this.replaceArr = [], this.replaceArr.push([/&lt;/g, "<"]), this.replaceArr.push([/&gt;/g, ">"]), this.replaceArr.push([/&amp;/g, "&"]), this.replaceArr.push([/&quot;/g, '"']), this.replaceArr.push([/&apos;/g, "'"])
        }, n.replaceSpecial = function (t) {
            for (var e = 0; e < this.replaceArr.length; e++) {
                var i = this.replaceArr[e][0], n = this.replaceArr[e][1];
                t = t.replace(i, n)
            }
            return t
        }, n.parser = function (e) {
            this.stackArray = [], this.resutlArr = [];
            for (var i = 0, n = e.length; n > i;) {
                var s = e.indexOf("<", i);
                if (0 > s) this.addToResultArr(e.substring(i)), i = n; else {
                    this.addToResultArr(e.substring(i, s));
                    var a = e.indexOf(">", s);
                    -1 == a ? (t.$error(1038), a = s) : "/" == e.charAt(s + 1) ? this.stackArray.pop() : this.addToArray(e.substring(s + 1, a)), i = a + 1
                }
            }
            return this.resutlArr
        }, n.addToResultArr = function (t) {
            "" != t && (t = this.replaceSpecial(t), this.stackArray.length > 0 ? this.resutlArr.push({
                text: t,
                style: this.stackArray[this.stackArray.length - 1]
            }) : this.resutlArr.push({text: t}))
        }, n.changeStringToObject = function (t) {
            t = t.trim();
            var e = {}, i = [];
            if ("i" == t.charAt(0) || "b" == t.charAt(0) || "u" == t.charAt(0)) this.addProperty(e, t, "true"); else if (i = t.match(/^(font|a)\s/)) {
                t = t.substring(i[0].length).trim();
                for (var n, s = 0; n = t.match(this.getHeadReg());) {
                    var a = n[0], r = "", t = t.substring(a.length).trim();
                    if ('"' == t.charAt(0)) {
                        var s = t.indexOf('"', 1);
                        r = t.substring(1, s), s += 1
                    } else if ("'" == t.charAt(0)) {
                        var s = t.indexOf("'", 1);
                        r = t.substring(1, s), s += 1
                    } else r = t.match(/(\S)+/)[0], s = r.length;
                    this.addProperty(e, a.substring(0, a.length - 1).trim(), r.trim()), t = t.substring(s).trim()
                }
            }
            return e
        }, n.getHeadReg = function () {
            return /^(color|textcolor|strokecolor|stroke|b|bold|i|italic|u|size|fontfamily|href|target)(\s)*=/
        }, n.addProperty = function (t, e, i) {
            switch (e.toLowerCase()) {
                case"color":
                case"textcolor":
                    i = i.replace(/#/, "0x"), t.textColor = parseInt(i);
                    break;
                case"strokecolor":
                    i = i.replace(/#/, "0x"), t.strokeColor = parseInt(i);
                    break;
                case"stroke":
                    t.stroke = parseInt(i);
                    break;
                case"b":
                case"bold":
                    t.bold = "true" == i;
                    break;
                case"u":
                    t.underline = "true" == i;
                    break;
                case"i":
                case"italic":
                    t.italic = "true" == i;
                    break;
                case"size":
                    t.size = parseInt(i);
                    break;
                case"fontfamily":
                    t.fontFamily = i;
                    break;
                case"href":
                    t.href = this.replaceSpecial(i);
                    break;
                case"target":
                    t.target = this.replaceSpecial(i)
            }
        }, n.addToArray = function (t) {
            var e = this.changeStringToObject(t);
            if (0 == this.stackArray.length) this.stackArray.push(e); else {
                var i = this.stackArray[this.stackArray.length - 1];
                for (var n in i) null == e[n] && (e[n] = i[n]);
                this.stackArray.push(e)
            }
        }, e
    }();
    t.HtmlTextParser = e, t.registerClass(e, "egret.HtmlTextParser")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function (e) {
        function i() {
            e.call(this), this._text = null, this._isFocus = !1
        }

        __extends(i, e);
        var n = i, s = n.prototype;
        return s.init = function (e) {
            this._text = e, this.stageText = new t.StageText, this.stageText.$setTextField(this._text)
        }, s._addStageText = function () {
            this._text.$inputEnabled || (this._text.$touchEnabled = !0), this.tempStage = this._text.stage, this.stageText.$addToStage(), this.stageText.addEventListener("updateText", this.updateTextHandler, this), this._text.addEventListener(t.TouchEvent.TOUCH_BEGIN, this.onMouseDownHandler, this), this.stageText.addEventListener("blur", this.blurHandler, this), this.stageText.addEventListener("focus", this.focusHandler, this)
        }, s._removeStageText = function () {
            this._text.$inputEnabled || (this._text.$touchEnabled = !1), this.stageText.$removeFromStage(), this.stageText.removeEventListener("updateText", this.updateTextHandler, this), this._text.removeEventListener(t.TouchEvent.TOUCH_BEGIN, this.onMouseDownHandler, this), this.tempStage.removeEventListener(t.TouchEvent.TOUCH_BEGIN, this.onStageDownHandler, this), this.stageText.removeEventListener("blur", this.blurHandler, this), this.stageText.removeEventListener("focus", this.focusHandler, this)
        }, s._getText = function () {
            return this.stageText.$getText()
        }, s._setText = function (t) {
            this.stageText.$setText(t)
        }, s._setColor = function (t) {
            this.stageText.$setColor(t)
        }, s.focusHandler = function (e) {
            this._isFocus || (this._isFocus = !0, e.showing || (this._text.$isTyping = !0), this._text.$invalidateContentBounds(), this._text.dispatchEvent(new t.FocusEvent(t.FocusEvent.FOCUS_IN, (!0))))
        }, s.blurHandler = function (e) {
            this._isFocus && (this._isFocus = !1, this.tempStage.removeEventListener(t.TouchEvent.TOUCH_BEGIN, this.onStageDownHandler, this), this._text.$isTyping = !1, this._text.$invalidateContentBounds(), this.stageText.$onBlur(), this._text.dispatchEvent(new t.FocusEvent(t.FocusEvent.FOCUS_OUT, (!0))))
        }, s.onMouseDownHandler = function (e) {
            e.stopPropagation(), this._text.visible && (this._isFocus || (this.tempStage.addEventListener(t.TouchEvent.TOUCH_BEGIN, this.onStageDownHandler, this), this.stageText.$show()))
        }, s.onStageDownHandler = function (t) {
            this.stageText.$hide()
        }, s.updateTextHandler = function (e) {
            var i = this._text.$TextField, n = this.stageText.$getText(), s = !1;
            if (null != i[35]) {
                var a = new RegExp("[" + i[35] + "]", "g"), r = n.match(a);
                n = r ? r.join("") : "", s = !0
            }
            null != i[36] && (a = new RegExp("[^" + i[36] + "]", "g"), r = n.match(a), n = r ? r.join("") : "", s = !0), s && this.stageText.$getText() != n && this.stageText.$setText(n), this.resetText(), this._text.dispatchEvent(new t.Event(t.Event.CHANGE, (!0)))
        }, s.resetText = function () {
            this._text.$setBaseText(this.stageText.$getText())
        }, s._hideInput = function () {
            this.stageText.$removeFromStage()
        }, s.updateInput = function () {
            !this._text.$visible && this.stageText && this._hideInput()
        }, s._updateProperties = function () {
            if (this._isFocus) return this.stageText.$resetStageText(), void this.updateInput();
            var t = this._text.$stage;
            if (null == t) ; else for (var e = this._text, i = e.$visible; i && (e = e.parent, e != t);) i = e.$visible;
            this.stageText.$setText(this._text.$TextField[13]), this.stageText.$resetStageText(), this.updateInput()
        }, i
    }(t.HashObject);
    t.InputController = e, t.registerClass(e, "egret.InputController")
}(egret || (egret = {}));
var egret;
!function (t) {
}(egret || (egret = {}));
var egret;
!function (t) {
    function e(e, i, s) {
        s = s || {};
        var a = null == s.italic ? i[16] : s.italic, r = null == s.bold ? i[15] : s.bold,
            o = null == s.size ? i[0] : s.size, h = s.fontFamily || i[8] || n.default_fontFamily;
        return t.sys.measureText(e, h, o, r, a)
    }

    var i = new RegExp("(?=[\\u00BF-\\u1FFF\\u2C00-\\uD7FF]|\\b|\\s)(?![。，！、》…）)}”】\\.\\,\\!\\?\\]\\:])"),
        n = function (n) {
            function s() {
                n.call(this), this.$inputEnabled = !1, this.inputUtils = null, this.graphicsNode = null, this.isFlow = !1, this.textArr = [], this.linesArr = [], this.$isTyping = !1;
                var e = new t.sys.TextNode;
                e.fontFamily = s.default_fontFamily, this.textNode = e, this.$renderNode = e, this.$TextField = {
                    0: 30,
                    1: 0,
                    2: 16777215,
                    3: NaN,
                    4: NaN,
                    5: 0,
                    6: 0,
                    7: 0,
                    8: s.default_fontFamily,
                    9: "left",
                    10: "top",
                    11: "#ffffff",
                    12: "",
                    13: "",
                    14: [],
                    15: !1,
                    16: !1,
                    17: !0,
                    18: !1,
                    19: !1,
                    20: !1,
                    21: 0,
                    22: 0,
                    23: 0,
                    24: t.TextFieldType.DYNAMIC,
                    25: 0,
                    26: "#000000",
                    27: 0,
                    28: -1,
                    29: 0,
                    30: !1,
                    31: !1,
                    32: 0,
                    33: !1,
                    34: 16777215,
                    35: null,
                    36: null
                }
            }

            __extends(s, n);
            var a = __define, r = s, o = r.prototype;
            return o.isInput = function () {
                return this.$TextField[24] == t.TextFieldType.INPUT
            }, o.$setTouchEnabled = function (t) {
                var e = n.prototype.$setTouchEnabled.call(this, t);
                return this.isInput() && (this.$inputEnabled = !0), e
            }, a(o, "fontFamily", function () {
                return this.$TextField[8]
            }, function (t) {
                this.$setFontFamily(t)
            }), o.$setFontFamily = function (t) {
                var e = this.$TextField;
                return e[8] != t && (e[8] = t, this.invalidateFontString(), !0)
            }, a(o, "size", function () {
                return this.$TextField[0]
            }, function (t) {
                this.$setSize(t)
            }), o.$setSize = function (t) {
                t = +t || 0;
                var e = this.$TextField;
                return e[0] != t && (e[0] = t, this.invalidateFontString(), !0)
            }, a(o, "bold", function () {
                return this.$TextField[15]
            }, function (t) {
                this.$setBold(t)
            }), o.$setBold = function (t) {
                t = !!t;
                var e = this.$TextField;
                return t != e[15] && (e[15] = t, this.invalidateFontString(), !0)
            }, a(o, "italic", function () {
                return this.$TextField[16]
            }, function (t) {
                this.$setItalic(t)
            }), o.$setItalic = function (t) {
                t = !!t;
                var e = this.$TextField;
                return t != e[16] && (e[16] = t, this.invalidateFontString(), !0)
            }, o.invalidateFontString = function () {
                this.$TextField[17] = !0, this.$invalidateTextField()
            }, a(o, "textAlign", function () {
                return this.$TextField[9]
            }, function (t) {
                this.$setTextAlign(t)
            }), o.$setTextAlign = function (t) {
                var e = this.$TextField;
                return e[9] != t && (e[9] = t, this.$invalidateTextField(), !0)
            }, a(o, "verticalAlign", function () {
                return this.$TextField[10]
            }, function (t) {
                this.$setVerticalAlign(t)
            }), o.$setVerticalAlign = function (t) {
                var e = this.$TextField;
                return e[10] != t && (e[10] = t, this.$invalidateTextField(), !0)
            }, a(o, "lineSpacing", function () {
                return this.$TextField[1]
            }, function (t) {
                this.$setLineSpacing(t)
            }), o.$setLineSpacing = function (t) {
                t = +t || 0;
                var e = this.$TextField;
                return e[1] != t && (e[1] = t, this.$invalidateTextField(), !0)
            }, a(o, "textColor", function () {
                return this.$TextField[2]
            }, function (t) {
                this.$setTextColor(t)
            }), o.$setTextColor = function (t) {
                t = 0 | +t;
                var e = this.$TextField;
                return e[2] != t && (e[2] = t, this.inputUtils && this.inputUtils._setColor(this.$TextField[2]), this.$invalidate(), !0)
            }, a(o, "wordWrap", function () {
                return this.$TextField[19]
            }, function (t) {
                t = !!t;
                var e = this.$TextField;
                t != e[19] && (e[20] || (e[19] = t, this.$invalidateTextField()))
            }), a(o, "type", function () {
                return this.$TextField[24]
            }, function (t) {
                this.$setType(t)
            }), o.$setType = function (e) {
                var i = this.$TextField;
                return i[24] != e && (i[24] = e, e == t.TextFieldType.INPUT ? (isNaN(i[3]) && this.$setWidth(100), isNaN(i[4]) && this.$setHeight(30), this.$setTouchEnabled(!0), null == this.inputUtils && (this.inputUtils = new t.InputController), this.inputUtils.init(this), this.$invalidateTextField(), this.$stage && this.inputUtils._addStageText()) : (this.inputUtils && (this.inputUtils._removeStageText(), this.inputUtils = null), this.$setTouchEnabled(!1)), !0)
            }, a(o, "text", function () {
                return this.$getText()
            }, function (t) {
                this.$setText(t)
            }), o.$getText = function () {
                return this.$TextField[24] == t.TextFieldType.INPUT ? this.inputUtils._getText() : this.$TextField[13]
            }, o.$setBaseText = function (t) {
                null == t && (t = ""), t = t.toString(), this.isFlow = !1;
                var e = this.$TextField;
                if (e[13] != t) {
                    this.$invalidateTextField(), e[13] = t;
                    var i = "";
                    return i = e[20] ? this.changeToPassText(t) : t, this.setMiddleStyle([{text: i}]), !0
                }
                return !1
            }, o.$setText = function (t) {
                null == t && (t = "");
                var e = this.$setBaseText(t);
                return this.inputUtils && this.inputUtils._setText(this.$TextField[13]), e
            }, a(o, "displayAsPassword", function () {
                return this.$TextField[20]
            }, function (t) {
                this.$setDisplayAsPassword(t)
            }), o.$setDisplayAsPassword = function (t) {
                var e = this.$TextField;
                if (e[20] != t) {
                    e[20] = t, this.$invalidateTextField();
                    var i = "";
                    return i = t ? this.changeToPassText(e[13]) : e[13], this.setMiddleStyle([{text: i}]), !0
                }
                return !1
            }, a(o, "strokeColor", function () {
                return this.$TextField[25]
            }, function (t) {
                t = +t || 0, this.$setStrokeColor(t)
            }), o.$setStrokeColor = function (e) {
                var i = this.$TextField;
                return i[25] != e && (this.$invalidateTextField(), i[25] = e, i[26] = t.toColorString(e), !0)
            }, a(o, "stroke", function () {
                return this.$TextField[27]
            }, function (t) {
                this.$setStroke(t)
            }), o.$setStroke = function (t) {
                return this.$TextField[27] != t && (this.$invalidateTextField(), this.$TextField[27] = t, !0)
            }, a(o, "maxChars", function () {
                return this.$TextField[21]
            }, function (t) {
                this.$setMaxChars(t)
            }), o.$setMaxChars = function (t) {
                return this.$TextField[21] != t && (this.$TextField[21] = t, !0)
            }, a(o, "scrollV", function () {
                return Math.min(Math.max(this.$TextField[28], 1), this.maxScrollV)
            }, function (t) {
                this.$TextField[28] = Math.max(t, 1), this.$invalidateTextField()
            }), a(o, "maxScrollV", function () {
                return this.$getLinesArr(), Math.max(this.$TextField[29] - t.TextFieldUtils.$getScrollNum(this) + 1, 1)
            }), a(o, "selectionBeginIndex", function () {
                return 0
            }), a(o, "selectionEndIndex", function () {
                return 0
            }), a(o, "caretIndex", function () {
                return 0
            }), o.$setSelection = function (t, e) {
                return !1
            }, o.$getLineHeight = function () {
                return this.$TextField[1] + this.$TextField[0]
            }, a(o, "numLines", function () {
                return this.$getLinesArr(), this.$TextField[29]
            }), a(o, "multiline", function () {
                return this.$TextField[30]
            }, function (t) {
                this.$setMultiline(t)
            }), o.$setMultiline = function (t) {
                return this.$TextField[30] = t, this.$invalidateTextField(), !0
            }, a(o, "restrict", function () {
                var t = this.$TextField, e = null;
                return null != t[35] && (e = t[35]), null != t[36] && (null == e && (e = ""), e += "^" + t[36]), e
            }, function (t) {
                var e = this.$TextField;
                if (null == t) e[35] = null, e[36] = null; else {
                    for (var i = -1; i < t.length && (i = t.indexOf("^", i), 0 != i) && i > 0 && "\\" == t.charAt(i - 1);) i++;
                    0 == i ? (e[35] = null, e[36] = t.substring(i + 1)) : i > 0 ? (e[35] = t.substring(0, i), e[36] = t.substring(i + 1)) : (e[35] = t, e[36] = null)
                }
            }), o.$setWidth = function (t) {
                var e = this.$TextField;
                if (isNaN(t)) {
                    if (isNaN(e[3])) return !1;
                    e[3] = NaN
                } else {
                    if (e[3] == t) return !1;
                    e[3] = t
                }
                return t = +t, !(0 > t) && (this.$invalidateTextField(), !0)
            }, o.$setHeight = function (t) {
                var e = this.$TextField;
                if (isNaN(t)) {
                    if (isNaN(e[4])) return !1;
                    e[4] = NaN
                } else {
                    if (e[4] == t) return !1;
                    e[4] = t
                }
                return t = +t, !(0 > t) && (this.$invalidateTextField(), !0)
            }, o.$getWidth = function () {
                var t = this.$TextField;
                return isNaN(t[3]) ? this.$getContentBounds().width : t[3]
            }, o.$getHeight = function () {
                var t = this.$TextField;
                return isNaN(t[4]) ? this.$getContentBounds().height : t[4]
            }, a(o, "border", function () {
                return this.$TextField[31]
            }, function (t) {
                this.$TextField[31] = !!t, this.$invalidate()
            }), a(o, "borderColor", function () {
                return this.$TextField[32]
            }, function (t) {
                this.$TextField[32] = +t || 0, this.$invalidate()
            }), a(o, "background", function () {
                return this.$TextField[33]
            }, function (t) {
                this.$TextField[33] = t, this.$invalidate()
            }), a(o, "backgroundColor", function () {
                return this.$TextField[34]
            }, function (t) {
                this.$TextField[34] = t, this.$invalidate()
            }), o.fillBackground = function (e) {
                var i = this.graphicsNode;
                i && i.clear();
                var n = this.$TextField;
                if (n[33] || n[31] || e.length > 0) {
                    if (!i) {
                        i = this.graphicsNode = new t.sys.GraphicsNode;
                        var s = new t.sys.GroupNode;
                        s.addNode(i), s.addNode(this.textNode), this.$renderNode = s;
                    }
                    var a, r;
                    if (n[33] && (a = i.beginFill(n[34]), a.drawRect(0, 0, this.$getWidth(), this.$getHeight())), n[31] && (r = i.lineStyle(1, n[32]), r.drawRect(0, 0, this.$getWidth() - 1, this.$getHeight() - 1)), e.length > 0) for (var o = n[2], h = -1, l = e.length, u = 0; l > u; u += 4) {
                        var c = e[u], d = e[u + 1], f = e[u + 2], g = e[u + 3] || o;
                        (0 > h || h != g) && (h = g, r = i.lineStyle(2, g, 1, t.CapsStyle.NONE)), r.moveTo(c, d), r.lineTo(c + f, d)
                    }
                }
            }, o.setFocus = function () {
                t.$warn(1013)
            }, o.$onRemoveFromStage = function () {
                n.prototype.$onRemoveFromStage.call(this), this.removeEvent(), this.$TextField[24] == t.TextFieldType.INPUT && this.inputUtils._removeStageText()
            }, o.$onAddToStage = function (e, i) {
                n.prototype.$onAddToStage.call(this, e, i), this.addEvent(), this.$TextField[24] == t.TextFieldType.INPUT && this.inputUtils._addStageText()
            }, o.$invalidateTextField = function () {
                this.$invalidateContentBounds(), this.$TextField[18] = !0
            }, o.$update = function (e) {
                var e = this.$getContentBounds(), i = t.Rectangle.create();
                i.copyFrom(e), this.$TextField[31] && (i.width += 2, i.height += 2);
                var s = 2 * this.$TextField[27];
                s > 0 && (i.width += 2 * s, i.height += 2 * s), i.x -= s + 2, i.y -= s + 2, i.width = Math.ceil(i.width) + 4, i.height = Math.ceil(i.height) + 4;
                var a = n.prototype.$update.call(this, i);
                return t.Rectangle.release(i), a
            }, o.$measureContentBounds = function (e) {
                this.$getLinesArr();
                var i = isNaN(this.$TextField[3]) ? this.$TextField[5] : this.$TextField[3],
                    n = isNaN(this.$TextField[4]) ? t.TextFieldUtils.$getTextHeight(this) : this.$TextField[4];
                e.setTo(0, 0, i, n)
            }, o.$render = function () {
                if (this.$TextField[24] == t.TextFieldType.INPUT) {
                    if ((this.$hasAnyFlags(2032) || this.$hasAnyFlags(1648)) && this.inputUtils._updateProperties(), this.$isTyping) return
                } else if (0 == this.$TextField[3]) return;
                var e = this.drawText();
                this.fillBackground(e)
            }, a(o, "textFlow", function () {
                return this.textArr
            }, function (t) {
                this.isFlow = !0;
                var e = "";
                null == t && (t = []);
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    e += n.text
                }
                this.$TextField[20] ? this.$setBaseText(e) : (this.$TextField[13] = e, this.setMiddleStyle(t))
            }), o.changeToPassText = function (t) {
                if (this.$TextField[20]) {
                    for (var e = "", i = 0, n = t.length; n > i; i++) switch (t.charAt(i)) {
                        case"\n":
                            e += "\n";
                            break;
                        case"\r":
                            break;
                        default:
                            e += "*"
                    }
                    return e
                }
                return t
            }, o.setMiddleStyle = function (t) {
                this.$TextField[18] = !0, this.textArr = t, this.$invalidateTextField()
            }, a(o, "textWidth", function () {
                return this.$getLinesArr(), this.$TextField[5]
            }), a(o, "textHeight", function () {
                return this.$getLinesArr(), t.TextFieldUtils.$getTextHeight(this)
            }), o.appendText = function (t) {
                this.appendElement({text: t})
            }, o.appendElement = function (t) {
                var e = this.$TextField[13] + t.text;
                this.$TextField[20] ? this.$setBaseText(e) : (this.$TextField[13] = e, this.textArr.push(t), this.setMiddleStyle(this.textArr))
            }, o.$getLinesArr = function () {
                var n = this.$TextField;
                if (!n[18]) return this.linesArr;
                n[18] = !1;
                var s = this.textArr;
                this.linesArr.length = 0, n[6] = 0, n[5] = 0;
                var a = n[3];
                if (!isNaN(a) && 0 == a) return n[29] = 0, [{
                    width: 0,
                    height: 0,
                    charNum: 0,
                    elements: [],
                    hasNextLine: !1
                }];
                for (var r, o = this.linesArr, h = 0, l = 0, u = 0, c = 0, d = 0, f = s.length; f > d; d++) {
                    var g = s[d];
                    g.style = g.style || {};
                    for (var p = g.text.toString(), _ = p.split(/(?:\r\n|\r|\n)/), m = 0, v = _.length; v > m; m++) {
                        null == o[c] && (r = {
                            width: 0,
                            height: 0,
                            elements: [],
                            charNum: 0,
                            hasNextLine: !1
                        }, o[c] = r, h = 0, u = 0, l = 0), u = n[24] == t.TextFieldType.INPUT ? n[0] : Math.max(u, g.style.size || n[0]);
                        var T = !0;
                        if ("" == _[m]) m == v - 1 && (T = !1); else {
                            var y = e(_[m], n, g.style);
                            if (isNaN(a)) h += y, l += _[m].length, r.elements.push({
                                width: y,
                                text: _[m],
                                style: g.style
                            }), m == v - 1 && (T = !1); else if (a >= h + y) r.elements.push({
                                width: y,
                                text: _[m],
                                style: g.style
                            }), h += y, l += _[m].length, m == v - 1 && (T = !1); else {
                                var E = 0, x = 0, b = _[m];
                                if (n[19]) var D = b.split(i); else D = b.match(/./g);
                                for (var S = D.length, C = 0; S > E && (y = e(D[E], n, g.style), !(0 != h && h + y > a && h + E != 0)); E++) if (x + y > a) for (var w = D[E].match(/./g), L = 0, $ = w.length; $ > L && (y = e(w[L], n, g.style), !(h + y > a)); L++) C += w[L].length, x += y, h += y, l += C; else C += D[E].length, x += y, h += y, l += C;
                                if (E > 0) {
                                    r.elements.push({width: x, text: b.substring(0, C), style: g.style});
                                    for (var A = b.substring(C), O = 0, M = A.length; M > O && " " == A.charAt(O); O++) ;
                                    _[m] = A.substring(O)
                                }
                                "" != _[m] && (m--, T = !1)
                            }
                        }
                        T && (l++, r.hasNextLine = !0), m < _.length - 1 && (r.width = h, r.height = u, r.charNum = l, n[5] = Math.max(n[5], h), n[6] += u, c++)
                    }
                    d == s.length - 1 && r && (r.width = h, r.height = u, r.charNum = l, n[5] = Math.max(n[5], h), n[6] += u)
                }
                return n[29] = o.length, o
            }, o.drawText = function () {
                var e = this.textNode, i = this.$TextField;
                e.bold = i[15], e.fontFamily = i[8] || s.default_fontFamily, e.italic = i[16], e.size = i[0], e.stroke = i[27], e.strokeColor = i[25], e.textColor = i[2];
                var n = this.$getLinesArr();
                if (0 == i[5]) return [];
                var a = isNaN(i[3]) ? i[5] : i[3], r = t.TextFieldUtils.$getTextHeight(this), o = 0,
                    h = t.TextFieldUtils.$getStartLine(this), l = i[4];
                if (!isNaN(l) && l > r) {
                    var u = t.TextFieldUtils.$getValign(this);
                    o += u * (l - r)
                }
                o = Math.round(o);
                for (var c = t.TextFieldUtils.$getHalign(this), d = 0, f = [], g = h, p = i[29]; p > g; g++) {
                    var _ = n[g], m = _.height;
                    if (o += m / 2, g != h) {
                        if (i[24] == t.TextFieldType.INPUT && !i[30]) break;
                        if (!isNaN(l) && o > l) break
                    }
                    d = Math.round((a - _.width) * c);
                    for (var v = 0, T = _.elements.length; T > v; v++) {
                        var y = _.elements[v], E = y.style.size || i[0];
                        e.drawText(d, o + (m - E) / 2, y.text, y.style), y.style.underline && f.push(d, o + m / 2, y.width, y.style.textColor), d += y.width
                    }
                    o += m / 2 + i[1]
                }
                return f
            }, o.addEvent = function () {
                this.addEventListener(t.TouchEvent.TOUCH_TAP, this.onTapHandler, this)
            }, o.removeEvent = function () {
                this.removeEventListener(t.TouchEvent.TOUCH_TAP, this.onTapHandler, this)
            }, o.onTapHandler = function (e) {
                if (this.$TextField[24] != t.TextFieldType.INPUT) {
                    var i = t.TextFieldUtils.$getTextElement(this, e.localX, e.localY);
                    if (null != i) {
                        var n = i.style;
                        if (n && n.href) if (n.href.match(/^event:/)) {
                            var s = n.href.match(/^event:/)[0];
                            t.TextEvent.dispatchTextEvent(this, t.TextEvent.LINK, n.href.substring(s.length))
                        } else open(n.href, n.target || "_blank")
                    }
                }
            }, s.default_fontFamily = "Arial", s
        }(t.DisplayObject);
    t.TextField = n, t.registerClass(n, "egret.TextField")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function () {
        function t() {
        }

        var e = t;
        return e.prototype, t.DYNAMIC = "dynamic", t.INPUT = "input", t
    }();
    t.TextFieldType = e, t.registerClass(e, "egret.TextFieldType")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function () {
        function e() {
        }

        var i = e;
        return i.prototype, e.$getStartLine = function (t) {
            var i = t.$TextField, n = e.$getTextHeight(t), s = 0, a = i[4];
            return isNaN(a) || (a > n || n > a && (s = Math.max(i[28] - 1, 0), s = Math.min(i[29] - 1, s)), i[30] || (s = Math.max(i[28] - 1, 0), i[29] > 0 && (s = Math.min(i[29] - 1, s)))), s
        }, e.$getHalign = function (e) {
            var i = e.$getLinesArr(), n = 0;
            return e.$TextField[9] == t.HorizontalAlign.CENTER ? n = .5 : e.$TextField[9] == t.HorizontalAlign.RIGHT && (n = 1), e.$TextField[24] == t.TextFieldType.INPUT && !e.$TextField[30] && i.length > 1 && (n = 0), n
        }, e.$getTextHeight = function (e) {
            var i = t.TextFieldType.INPUT != e.$TextField[24] || e.$TextField[30] ? e.$TextField[6] + (e.$TextField[29] - 1) * e.$TextField[1] : e.$TextField[0];
            return i
        }, e.$getValign = function (i) {
            var n = e.$getTextHeight(i), s = i.$TextField[4];
            if (!isNaN(s) && s > n) {
                var a = 0;
                return i.$TextField[10] == t.VerticalAlign.MIDDLE ? a = .5 : i.$TextField[10] == t.VerticalAlign.BOTTOM && (a = 1), a
            }
            return 0
        }, e.$getTextElement = function (t, i, n) {
            var s = e.$getHit(t, i, n), a = t.$getLinesArr();
            return s && a[s.lineIndex] && a[s.lineIndex].elements[s.textElementIndex] ? a[s.lineIndex].elements[s.textElementIndex] : null
        }, e.$getHit = function (t, i, n) {
            var s = t.$getLinesArr();
            if (0 == t.$TextField[3]) return null;
            var a = 0, r = e.$getTextHeight(t), o = 0, h = t.$TextField[4];
            if (!isNaN(h) && h > r) {
                var l = e.$getValign(t);
                o = l * (h - r), 0 != o && (n -= o)
            }
            for (var u = e.$getStartLine(t), c = 0, d = u; d < s.length; d++) {
                var f = s[d];
                if (c + f.height >= n) {
                    a = d + 1;
                    break
                }
                if (c += f.height, c + t.$TextField[1] > n) return null;
                c += t.$TextField[1]
            }
            if (0 == a) return null;
            var g = s[a - 1], p = 0;
            for (d = 0; d < g.elements.length; d++) {
                var _ = g.elements[d];
                if (!(p + _.width < i)) return {lineIndex: a - 1, textElementIndex: d};
                p += _.width
            }
            return null
        }, e.$getScrollNum = function (t) {
            var e = 1;
            if (t.$TextField[30]) {
                var i = t.height, n = t.size, s = t.lineSpacing;
                e = Math.floor(i / (n + s));
                var a = i - (n + s) * e;
                a > n / 2 && e++
            }
            return e
        }, e
    }();
    t.TextFieldUtils = e, t.registerClass(e, "egret.TextFieldUtils")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (t) {
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function () {
        function t() {
        }

        var e = t;
        return e.prototype, t.TOP = "top", t.BOTTOM = "bottom", t.MIDDLE = "middle", t.JUSTIFY = "justify", t.CONTENT_JUSTIFY = "contentJustify", t
    }();
    t.VerticalAlign = e, t.registerClass(e, "egret.VerticalAlign")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function () {
        function t() {
        }

        var e = t;
        return e.prototype, t.LITTLE_ENDIAN = "littleEndian", t.BIG_ENDIAN = "bigEndian", t
    }();
    t.Endian = e, t.registerClass(e, "egret.Endian");
    var i = function () {
        function i(t) {
            this.BUFFER_EXT_SIZE = 0, this.EOF_byte = -1, this.EOF_code_point = -1, this._setArrayBuffer(t || new ArrayBuffer(this.BUFFER_EXT_SIZE)), this.endian = e.BIG_ENDIAN
        }

        var n = __define, s = i, a = s.prototype;
        return a._setArrayBuffer = function (t) {
            this.write_position = t.byteLength, this.data = new DataView(t), this._position = 0
        }, a.setArrayBuffer = function (t) {
        }, n(a, "buffer", function () {
            return this.data.buffer
        }, function (t) {
            this.data = new DataView(t)
        }), n(a, "dataView", function () {
            return this.data
        }, function (t) {
            this.data = t, this.write_position = t.byteLength
        }), n(a, "bufferOffset", function () {
            return this.data.byteOffset
        }), n(a, "position", function () {
            return this._position
        }, function (t) {
            this._position = t, this.write_position = t > this.write_position ? t : this.write_position
        }), n(a, "length", function () {
            return this.write_position
        }, function (t) {
            this.write_position = t;
            var e = new Uint8Array(new ArrayBuffer(t)), i = this.data.buffer.byteLength;
            i > t && (this._position = t);
            var n = Math.min(i, t);
            e.set(new Uint8Array(this.data.buffer, 0, n)), this.buffer = e.buffer
        }), n(a, "bytesAvailable", function () {
            return this.data.byteLength - this._position
        }), a.clear = function () {
            this._setArrayBuffer(new ArrayBuffer(this.BUFFER_EXT_SIZE))
        }, a.readBoolean = function () {
            return this.validate(i.SIZE_OF_BOOLEAN) ? 0 != this.data.getUint8(this.position++) : null
        }, a.readByte = function () {
            return this.validate(i.SIZE_OF_INT8) ? this.data.getInt8(this.position++) : null
        }, a.readBytes = function (t, e, n) {
            if (void 0 === e && (e = 0), void 0 === n && (n = 0), 0 == n) n = this.bytesAvailable; else if (!this.validate(n)) return null;
            t ? t.validateBuffer(e + n) : t = new i(new ArrayBuffer(e + n));
            for (var s = 0; n > s; s++) t.data.setUint8(s + e, this.data.getUint8(this.position++))
        }, a.readDouble = function () {
            if (!this.validate(i.SIZE_OF_FLOAT64)) return null;
            var t = this.data.getFloat64(this.position, this.endian == e.LITTLE_ENDIAN);
            return this.position += i.SIZE_OF_FLOAT64, t
        }, a.readFloat = function () {
            if (!this.validate(i.SIZE_OF_FLOAT32)) return null;
            var t = this.data.getFloat32(this.position, this.endian == e.LITTLE_ENDIAN);
            return this.position += i.SIZE_OF_FLOAT32, t
        }, a.readInt = function () {
            if (!this.validate(i.SIZE_OF_INT32)) return null;
            var t = this.data.getInt32(this.position, this.endian == e.LITTLE_ENDIAN);
            return this.position += i.SIZE_OF_INT32, t
        }, a.readShort = function () {
            if (!this.validate(i.SIZE_OF_INT16)) return null;
            var t = this.data.getInt16(this.position, this.endian == e.LITTLE_ENDIAN);
            return this.position += i.SIZE_OF_INT16, t
        }, a.readUnsignedByte = function () {
            return this.validate(i.SIZE_OF_UINT8) ? this.data.getUint8(this.position++) : null
        }, a.readUnsignedInt = function () {
            if (!this.validate(i.SIZE_OF_UINT32)) return null;
            var t = this.data.getUint32(this.position, this.endian == e.LITTLE_ENDIAN);
            return this.position += i.SIZE_OF_UINT32, t
        }, a.readUnsignedShort = function () {
            if (!this.validate(i.SIZE_OF_UINT16)) return null;
            var t = this.data.getUint16(this.position, this.endian == e.LITTLE_ENDIAN);
            return this.position += i.SIZE_OF_UINT16, t
        }, a.readUTF = function () {
            if (!this.validate(i.SIZE_OF_UINT16)) return null;
            var t = this.data.getUint16(this.position, this.endian == e.LITTLE_ENDIAN);
            return this.position += i.SIZE_OF_UINT16, t > 0 ? this.readUTFBytes(t) : ""
        }, a.readUTFBytes = function (t) {
            if (!this.validate(t)) return null;
            var e = new Uint8Array(this.buffer, this.bufferOffset + this.position, t);
            return this.position += t, this.decodeUTF8(e)
        }, a.writeBoolean = function (t) {
            this.validateBuffer(i.SIZE_OF_BOOLEAN), this.data.setUint8(this.position++, t ? 1 : 0)
        }, a.writeByte = function (t) {
            this.validateBuffer(i.SIZE_OF_INT8), this.data.setInt8(this.position++, t)
        }, a.writeBytes = function (t, e, i) {
            void 0 === e && (e = 0), void 0 === i && (i = 0);
            var n;
            if (!(0 > e) && !(0 > i) && (n = 0 == i ? t.length - e : Math.min(t.length - e, i), n > 0)) {
                this.validateBuffer(n);
                for (var s = new DataView(t.buffer), i = n, a = 4; i > a; i -= a) this.data.setUint32(this._position, s.getUint32(e)), this.position += a, e += a;
                for (; i > 0; i--) this.data.setUint8(this.position++, s.getUint8(e++))
            }
        }, a.writeDouble = function (t) {
            this.validateBuffer(i.SIZE_OF_FLOAT64), this.data.setFloat64(this.position, t, this.endian == e.LITTLE_ENDIAN), this.position += i.SIZE_OF_FLOAT64
        }, a.writeFloat = function (t) {
            this.validateBuffer(i.SIZE_OF_FLOAT32), this.data.setFloat32(this.position, t, this.endian == e.LITTLE_ENDIAN), this.position += i.SIZE_OF_FLOAT32
        }, a.writeInt = function (t) {
            this.validateBuffer(i.SIZE_OF_INT32), this.data.setInt32(this.position, t, this.endian == e.LITTLE_ENDIAN), this.position += i.SIZE_OF_INT32
        }, a.writeShort = function (t) {
            this.validateBuffer(i.SIZE_OF_INT16), this.data.setInt16(this.position, t, this.endian == e.LITTLE_ENDIAN), this.position += i.SIZE_OF_INT16
        }, a.writeUnsignedInt = function (t) {
            this.validateBuffer(i.SIZE_OF_UINT32), this.data.setUint32(this.position, t, this.endian == e.LITTLE_ENDIAN), this.position += i.SIZE_OF_UINT32
        }, a.writeUnsignedShort = function (t) {
            this.validateBuffer(i.SIZE_OF_UINT16), this.data.setUint16(this.position, t, this.endian == e.LITTLE_ENDIAN), this.position += i.SIZE_OF_UINT16
        }, a.writeUTF = function (t) {
            var n = this.encodeUTF8(t), s = n.length;
            this.validateBuffer(i.SIZE_OF_UINT16 + s), this.data.setUint16(this.position, s, this.endian == e.LITTLE_ENDIAN), this.position += i.SIZE_OF_UINT16, this._writeUint8Array(n, !1)
        }, a.writeUTFBytes = function (t) {
            this._writeUint8Array(this.encodeUTF8(t))
        }, a.toString = function () {
            return "[ByteArray] length:" + this.length + ", bytesAvailable:" + this.bytesAvailable
        }, a._writeUint8Array = function (t, e) {
            void 0 === e && (e = !0), e && this.validateBuffer(this.position + t.length);
            for (var i = 0; i < t.length; i++) this.data.setUint8(this.position++, t[i])
        }, a.validate = function (e) {
            return this.data.byteLength > 0 && this._position + e <= this.data.byteLength || void t.$error(1025)
        }, a.validateBuffer = function (t, e) {
            if (void 0 === e && (e = !1), this.write_position = t > this.write_position ? t : this.write_position, t += this._position, this.data.byteLength < t || e) {
                var i = new Uint8Array(new ArrayBuffer(t + this.BUFFER_EXT_SIZE)),
                    n = Math.min(this.data.buffer.byteLength, t + this.BUFFER_EXT_SIZE);
                i.set(new Uint8Array(this.data.buffer, 0, n)), this.buffer = i.buffer
            }
        }, a.encodeUTF8 = function (t) {
            for (var e = 0, i = this.stringToCodePoints(t), n = []; i.length > e;) {
                var s = i[e++];
                if (this.inRange(s, 55296, 57343)) this.encoderError(s); else if (this.inRange(s, 0, 127)) n.push(s); else {
                    var a, r;
                    for (this.inRange(s, 128, 2047) ? (a = 1, r = 192) : this.inRange(s, 2048, 65535) ? (a = 2, r = 224) : this.inRange(s, 65536, 1114111) && (a = 3, r = 240), n.push(this.div(s, Math.pow(64, a)) + r); a > 0;) {
                        var o = this.div(s, Math.pow(64, a - 1));
                        n.push(128 + o % 64), a -= 1
                    }
                }
            }
            return new Uint8Array(n)
        }, a.decodeUTF8 = function (t) {
            for (var e, i = !1, n = 0, s = "", a = 0, r = 0, o = 0, h = 0; t.length > n;) {
                var l = t[n++];
                if (l == this.EOF_byte) e = 0 != r ? this.decoderError(i) : this.EOF_code_point; else if (0 == r) this.inRange(l, 0, 127) ? e = l : (this.inRange(l, 194, 223) ? (r = 1, h = 128, a = l - 192) : this.inRange(l, 224, 239) ? (r = 2, h = 2048, a = l - 224) : this.inRange(l, 240, 244) ? (r = 3, h = 65536, a = l - 240) : this.decoderError(i), a *= Math.pow(64, r), e = null); else if (this.inRange(l, 128, 191)) if (o += 1, a += (l - 128) * Math.pow(64, r - o), o !== r) e = null; else {
                    var u = a, c = h;
                    a = 0, r = 0, o = 0, h = 0, e = this.inRange(u, c, 1114111) && !this.inRange(u, 55296, 57343) ? u : this.decoderError(i, l)
                } else a = 0, r = 0, o = 0, h = 0, n--, e = this.decoderError(i, l);
                null !== e && e !== this.EOF_code_point && (65535 >= e ? e > 0 && (s += String.fromCharCode(e)) : (e -= 65536, s += String.fromCharCode(55296 + (e >> 10 & 1023)), s += String.fromCharCode(56320 + (1023 & e))))
            }
            return s
        }, a.encoderError = function (e) {
            t.$error(1026, e)
        }, a.decoderError = function (e, i) {
            return e && t.$error(1027), i || 65533
        }, a.inRange = function (t, e, i) {
            return t >= e && i >= t
        }, a.div = function (t, e) {
            return Math.floor(t / e)
        }, a.stringToCodePoints = function (t) {
            for (var e = [], i = 0, n = t.length; i < t.length;) {
                var s = t.charCodeAt(i);
                if (this.inRange(s, 55296, 57343)) if (this.inRange(s, 56320, 57343)) e.push(65533); else if (i == n - 1) e.push(65533); else {
                    var a = t.charCodeAt(i + 1);
                    if (this.inRange(a, 56320, 57343)) {
                        var r = 1023 & s, o = 1023 & a;
                        i += 1, e.push(65536 + (r << 10) + o)
                    } else e.push(65533)
                } else e.push(s);
                i += 1
            }
            return e
        }, i.SIZE_OF_BOOLEAN = 1, i.SIZE_OF_INT8 = 1, i.SIZE_OF_INT16 = 2, i.SIZE_OF_INT32 = 4, i.SIZE_OF_UINT8 = 1, i.SIZE_OF_UINT16 = 2, i.SIZE_OF_UINT32 = 4, i.SIZE_OF_FLOAT32 = 4, i.SIZE_OF_FLOAT64 = 8, i
    }();
    t.ByteArray = i, t.registerClass(i, "egret.ByteArray")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function () {
        function t() {
        }

        var e = __define, i = t;
        return i.prototype, e(t, "logLevel", void 0, function (t) {
        }), t.ALL = "all", t.DEBUG = "debug", t.INFO = "info", t.WARN = "warn", t.ERROR = "error", t.OFF = "off", t
    }();
    t.Logger = e, t.registerClass(e, "egret.Logger")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function () {
        function t() {
        }

        var e = t;
        return e.prototype, t.isNumber = function (t) {
            return "number" == typeof t && !isNaN(t)
        }, t.sin = function (e) {
            var i = Math.floor(e), n = i + 1, s = t.sinInt(i), a = t.sinInt(n);
            return (e - i) * a + (n - e) * s
        }, t.sinInt = function (t) {
            return t %= 360, 0 > t && (t += 360), 90 > t ? egret_sin_map[t] : 180 > t ? egret_cos_map[t - 90] : 270 > t ? -egret_sin_map[t - 180] : -egret_cos_map[t - 270]
        }, t.cos = function (e) {
            var i = Math.floor(e), n = i + 1, s = t.cosInt(i), a = t.cosInt(n);
            return (e - i) * a + (n - e) * s
        }, t.cosInt = function (t) {
            return t %= 360, 0 > t && (t += 360), 90 > t ? egret_cos_map[t] : 180 > t ? -egret_sin_map[t - 90] : 270 > t ? -egret_cos_map[t - 180] : egret_sin_map[t - 270]
        }, t
    }();
    t.NumberUtils = e, t.registerClass(e, "egret.NumberUtils")
}(egret || (egret = {}));
for (var egret_sin_map = {}, egret_cos_map = {}, DEG_TO_RAD = Math.PI / 180, NumberUtils_i = 0; 90 >= NumberUtils_i; NumberUtils_i++) egret_sin_map[NumberUtils_i] = Math.sin(NumberUtils_i * DEG_TO_RAD), egret_cos_map[NumberUtils_i] = Math.cos(NumberUtils_i * DEG_TO_RAD);
Function.prototype.bind || (Function.prototype.bind = function (t) {
    "function" != typeof this && egret.$error(1029);
    var e = Array.prototype.slice.call(arguments, 1), i = this, n = function () {
    }, s = function () {
        return i.apply(this instanceof n && t ? this : t, e.concat(Array.prototype.slice.call(arguments)))
    };
    return n.prototype = this.prototype, s.prototype = new n, s
});
var egret;
!function (t) {
    var e = function (e) {
        function i(t, i) {
            void 0 === i && (i = 0), e.call(this), this._delay = 0, this._currentCount = 0, this._running = !1, this.updateInterval = 1e3, this.lastCount = 1e3, this.delay = t, this.repeatCount = 0 | +i
        }

        __extends(i, e);
        var n = __define, s = i, a = s.prototype;
        return n(a, "delay", function () {
            return this._delay
        }, function (t) {
            1 > t && (t = 1), this._delay != t && (this._delay = t, this.lastCount = this.updateInterval = Math.round(60 * t))
        }), n(a, "currentCount", function () {
            return this._currentCount
        }), n(a, "running", function () {
            return this._running
        }), a.reset = function () {
            this.stop(), this._currentCount = 0
        }, a.start = function () {
            this._running || (this.lastCount = this.updateInterval, t.sys.$ticker.$startTick(this.$update, this), this._running = !0)
        }, a.stop = function () {
            this._running && (t.stopTick(this.$update, this), this._running = !1)
        }, a.$update = function (e) {
            if (this.lastCount -= 1e3, this.lastCount > 0) return !1;
            this.lastCount += this.updateInterval, this._currentCount++;
            var i = this.repeatCount > 0 && this._currentCount >= this.repeatCount;
            return t.TimerEvent.dispatchTimerEvent(this, t.TimerEvent.TIMER), i && (this.stop(), t.TimerEvent.dispatchTimerEvent(this, t.TimerEvent.TIMER_COMPLETE)), !1
        }, i
    }(t.EventDispatcher);
    t.Timer = e, t.registerClass(e, "egret.Timer")
}(egret || (egret = {}));
var egret;
!function (t) {
}(egret || (egret = {}));
var egret;
!function (t) {
    function e(e, i) {
        for (var n = [], s = 2; s < arguments.length; s++) n[s - 2] = arguments[s];
        t.$callLaterFunctionList.push(e), t.$callLaterThisList.push(i), t.$callLaterArgsList.push(n)
    }

    function i(e, i) {
        for (var n = [], s = 2; s < arguments.length; s++) n[s - 2] = arguments[s];
        t.$callAsyncFunctionList.push(e), t.$callAsyncThisList.push(i), t.$callAsyncArgsList.push(n)
    }

    t.$callLaterFunctionList = [], t.$callLaterThisList = [], t.$callLaterArgsList = [], t.callLater = e, t.$callAsyncFunctionList = [], t.$callAsyncThisList = [], t.$callAsyncArgsList = [], t.$callAsync = i
}(egret || (egret = {}));
var egret;
!function (t) {
    function e(t, e, i) {
        for (var n = [], s = 3; s < arguments.length; s++) n[s - 3] = arguments[s];
        var a, r = t.prototype;
        t.hasOwnProperty("__sets__") || Object.defineProperty(t, "__sets__", {value: {}}), a = t.__sets__;
        var o = a[i];
        if (o) return o.apply(e, n);
        var h = Object.getPrototypeOf(r);
        if (null != h) {
            for (; !h.hasOwnProperty(i);) if (h = Object.getPrototypeOf(h), null == h) return;
            o = Object.getOwnPropertyDescriptor(h, i).set, a[i] = o, o.apply(e, n)
        }
    }

    function i(t, e, i) {
        var n, s = t.prototype;
        t.hasOwnProperty("__gets__") || Object.defineProperty(t, "__gets__", {value: {}}), n = t.__gets__;
        var a = n[i];
        if (a) return a.call(e);
        var r = Object.getPrototypeOf(s);
        if (null != r) {
            for (; !r.hasOwnProperty(i);) if (r = Object.getPrototypeOf(r), null == r) return;
            return a = Object.getOwnPropertyDescriptor(r, i).get, n[i] = a, a.call(e)
        }
    }

    t.superSetter = e, t.superGetter = i
}(egret || (egret = {}));
var egret;
!function (t) {
    function e(t) {
        if (!t) return null;
        var e = i[t];
        if (e) return e;
        var n = t.split("."), s = n.length;
        e = __global;
        for (var a = 0; s > a; a++) {
            var r = n[a];
            if (e = e[r], !e) return null
        }
        return i[t] = e, e
    }

    var i = {};
    t.getDefinitionByName = e
}(egret || (egret = {}));
var __global = __global || this, egret;
!function (t) {
}(egret || (egret = {}));
var egret;
!function (t) {
    function e(t) {
        var e = typeof t;
        if (!t || "object" != e && !t.prototype) return e;
        var i = t.prototype ? t.prototype : Object.getPrototypeOf(t);
        if (i.hasOwnProperty("__class__")) return i.__class__;
        var n = i.constructor.toString().trim(), s = n.indexOf("("), a = n.substring(9, s);
        return Object.defineProperty(i, "__class__", {value: a, enumerable: !1, writable: !0}), a
    }

    t.getQualifiedClassName = e
}(egret || (egret = {}));
var egret;
!function (t) {
    function e(e) {
        if (!e || "object" != typeof e && !e.prototype) return null;
        var i = e.prototype ? e.prototype : Object.getPrototypeOf(e), n = Object.getPrototypeOf(i);
        if (!n) return null;
        var s = t.getQualifiedClassName(n.constructor);
        return s ? s : null
    }

    t.getQualifiedSuperclassName = e
}(egret || (egret = {}));
var egret;
!function (t) {
    function e() {
        return Date.now() - t.sys.$START_TIME
    }

    t.getTimer = e
}(egret || (egret = {}));
var egret;
!function (t) {
    function e(e) {
        var i = t.getDefinitionByName(e);
        return !!i
    }

    t.hasDefinition = e
}(egret || (egret = {}));
var egret;
!function (t) {
    function e(t, e) {
        if (!t || "object" != typeof t) return !1;
        var i = Object.getPrototypeOf(t), n = i ? i.__types__ : null;
        return !!n && -1 !== n.indexOf(e)
    }

    t.is = e
}(egret || (egret = {}));
var egret;
!function (t) {
    function e(e, i) {
        t.sys.$ticker.$startTick(e, i)
    }

    t.startTick = e
}(egret || (egret = {}));
var egret;
!function (t) {
    function e(e, i) {
        t.sys.$ticker.$stopTick(e, i)
    }

    t.stopTick = e
}(egret || (egret = {}));
var egret;
!function (t) {
    function e(t) {
        0 > t && (t = 0), t > 16777215 && (t = 16777215);
        for (var e = t.toString(16).toUpperCase(); e.length > 6;) e = e.slice(1, e.length);
        for (; e.length < 6;) e = "0" + e;
        return "#" + e
    }

    t.toColorString = e
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        var i = "egret.BitmapData";
        t.registerClass(HTMLImageElement, i), t.registerClass(HTMLCanvasElement, i), t.registerClass(HTMLVideoElement, i)
    }(e = t.web || (t.web = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    function e(e) {
        return e.hashCode = e.$hashCode = t.$hashCount++, e
    }

    t.$toBitmapData = e
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        var i = function () {
            function t() {
            }

            var e = t;
            return e.prototype, t.call = function (t, e) {
            }, t.addCallback = function (t, e) {
            }, t
        }();
        e.WebExternalInterface = i, t.registerClass(i, "egret.web.WebExternalInterface", ["egret.ExternalInterface"]), t.ExternalInterface = i
    }(e = t.web || (t.web = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        var i;
        !function (i) {
            function n(t) {
                return window.localStorage.getItem(t)
            }

            function s(e, i) {
                try {
                    return window.localStorage.setItem(e, i), !0
                } catch (n) {
                    return t.$warn(1018, e, i), !1
                }
            }

            function a(t) {
                window.localStorage.removeItem(t)
            }

            function r() {
                window.localStorage.clear()
            }

            e.getItem = n, e.setItem = s, e.removeItem = a, e.clear = r
        }(i = e.web || (e.web = {}))
    }(e = t.localStorage || (t.localStorage = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        var i = function (i) {
            function n() {
                i.call(this), this.loaded = !1
            }

            __extends(n, i);
            var s = __define, a = n, r = a.prototype;
            return s(r, "length", function () {
                if (this.originAudio) return this.originAudio.duration;
                throw new Error("sound not loaded!")
            }), r.load = function (e) {
                function i() {
                    a(), h.indexOf("firefox") >= 0 && (o.pause(), o.muted = !1), r.loaded = !0, r.dispatchEventWith(t.Event.COMPLETE)
                }

                function s() {
                    a(), r.dispatchEventWith(t.IOErrorEvent.IO_ERROR)
                }

                function a() {
                    o.removeEventListener("canplaythrough", i), o.removeEventListener("error", s)
                }

                var r = this;
                this.url = e;
                var o = new Audio(e);
                o.addEventListener("canplaythrough", i), o.addEventListener("error", s);
                var h = navigator.userAgent.toLowerCase();
                h.indexOf("firefox") >= 0 && (o.autoplay = !0, o.muted = !0), o.load(), this.originAudio = o, n.$recycle(this.url, o)
            }, r.play = function (i, s) {
                i = +i || 0, s = +s || 0;
                var a = n.$pop(this.url);
                null == a && (a = this.originAudio.cloneNode()), a.autoplay = !0;
                var r = new e.HtmlSoundChannel(a);
                return r.$url = this.url, r.$loops = s, r.$startTime = i, r.$play(), t.sys.$pushSoundChannel(r), r
            }, r.close = function () {
                0 == this.loaded && this.originAudio && (this.originAudio.src = ""), this.originAudio && (this.originAudio = null), n.$clear(this.url)
            }, n.$clear = function (t) {
                var e = n.audios[t];
                e && (e.length = 0)
            }, n.$pop = function (t) {
                var e = n.audios[t];
                return e && e.length > 0 ? e.pop() : null
            }, n.$recycle = function (t, e) {
                var i = n.audios[t];
                null == n.audios[t] && (i = n.audios[t] = []), i.push(e)
            }, n.MUSIC = "music", n.EFFECT = "effect", n.audios = {}, n
        }(t.EventDispatcher);
        e.HtmlSound = i, t.registerClass(i, "egret.web.HtmlSound", ["egret.Sound"])
    }(e = t.web || (t.web = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        var i = function (i) {
            function n(e) {
                var n = this;
                i.call(this), this.$startTime = 0, this.audio = null, this.isStopped = !1, this.canPlay = function () {
                    n.audio.removeEventListener("canplay", n.canPlay);
                    try {
                        n.audio.currentTime = n.$startTime
                    } catch (t) {
                    } finally {
                        n.audio.play()
                    }
                }, this.onPlayEnd = function () {
                    return 1 == n.$loops ? (n.stop(), void n.dispatchEventWith(t.Event.SOUND_COMPLETE)) : (n.$loops > 0 && n.$loops--, void n.$play())
                }, e.addEventListener("ended", this.onPlayEnd), this.audio = e
            }

            __extends(n, i);
            var s = __define, a = n, r = a.prototype;
            return r.$play = function () {
                if (this.isStopped) return void t.$error(1036);
                try {
                    this.audio.currentTime = this.$startTime
                } catch (e) {
                    return void this.audio.addEventListener("canplay", this.canPlay)
                }
                this.audio.play()
            }, r.stop = function () {
                if (this.audio) {
                    this.isStopped || t.sys.$popSoundChannel(this), this.isStopped = !0;
                    var i = this.audio;
                    i.pause(), i.removeEventListener("ended", this.onPlayEnd), this.audio = null, e.HtmlSound.$recycle(this.$url, i)
                }
            }, s(r, "volume", function () {
                return this.audio ? this.audio.volume : 1
            }, function (e) {
                return this.isStopped ? void t.$error(1036) : void(this.audio && (this.audio.volume = e))
            }), s(r, "position", function () {
                return this.audio ? this.audio.currentTime : 0
            }), n
        }(t.EventDispatcher);
        e.HtmlSoundChannel = i, t.registerClass(i, "egret.web.HtmlSoundChannel", ["egret.SoundChannel", "egret.IEventDispatcher"])
    }(e = t.web || (t.web = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        var i = function (i) {
            function n() {
                i.call(this), this.loaded = !1
            }

            __extends(n, i);
            var s = __define, a = n, r = a.prototype;
            return r.load = function (i) {
                var n = this;
                this.url = i, QZAppExternal.preloadSound(function (e) {
                    0 == e.code ? (n.loaded = !0, n.dispatchEventWith(t.Event.COMPLETE)) : n.dispatchEventWith(t.IOErrorEvent.IO_ERROR)
                }, {bid: -1, url: e.Html5Capatibility._QQRootPath + i, refresh: 1})
            }, s(r, "length", function () {
                throw new Error("qq sound not supported!")
            }), r.play = function (i, n) {
                i = +i || 0, n = +n || 0;
                var s = new e.QQSoundChannel;
                return s.$url = this.url, s.$loops = n, s.$type = this.type, s.$startTime = i, s.$play(), t.sys.$pushSoundChannel(s), s
            }, r.close = function () {
            }, n.MUSIC = "music", n.EFFECT = "effect", n
        }(t.EventDispatcher);
        e.QQSound = i, t.registerClass(i, "egret.web.QQSound", ["egret.Sound"])
    }(e = t.web || (t.web = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        var i = function (e) {
            function i() {
                var i = this;
                e.call(this), this.$startTime = 0, this.isStopped = !1, this.onPlayEnd = function () {
                    return 1 == i.$loops ? (i.stop(), void i.dispatchEventWith(t.Event.SOUND_COMPLETE)) : (i.$loops > 0 && i.$loops--, void i.$play())
                }, this._startTime = 0
            }

            __extends(i, e);
            var n = __define, s = i, a = s.prototype;
            return a.$play = function () {
                if (this.isStopped) return void t.$error(1036);
                var e = this;
                this._startTime = Date.now();
                var i = 0;
                i = e.$loops > 0 ? e.$loops - 1 : -1, this.$type == t.Sound.EFFECT ? QZAppExternal.playLocalSound(function (t) {
                }, {bid: -1, url: e.$url, loop: i}) : QZAppExternal.playLocalBackSound(function (t) {
                }, {bid: -1, url: e.$url, loop: i})
            }, a.stop = function () {
                this.$type == t.Sound.EFFECT ? QZAppExternal.stopSound() : QZAppExternal.stopBackSound(), this.isStopped || t.sys.$popSoundChannel(this), this.isStopped = !0
            }, n(a, "volume", function () {
                return 1
            }, function (e) {
                return this.isStopped ? void t.$error(1036) : void 0
            }), n(a, "position", function () {
                return (Date.now() - this._startTime) / 1e3
            }), i
        }(t.EventDispatcher);
        e.QQSoundChannel = i, t.registerClass(i, "egret.web.QQSoundChannel", ["egret.SoundChannel", "egret.IEventDispatcher"])
    }(e = t.web || (t.web = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        var i = function () {
            function t() {
            }

            var e = t;
            return e.prototype, t.decodeAudios = function () {
                if (!(t.decodeArr.length <= 0 || t.isDecoding)) {
                    t.isDecoding = !0;
                    var e = t.decodeArr.shift();
                    t.ctx.decodeAudioData(e.buffer, function (i) {
                        e.self.audioBuffer = i, e.success && e.success(), t.isDecoding = !1, t.decodeAudios()
                    }, function () {
                        alert("sound decode error: " + e.url + "！\nsee http://edn.egret.com/cn/docs/page/156"), e.fail && e.fail(), t.isDecoding = !1, t.decodeAudios()
                    })
                }
            }, t.canUseWebAudio = window.AudioContext || window.webkitAudioContext || window.mozAudioContext, t.ctx = t.canUseWebAudio ? new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext) : void 0, t.decodeArr = [], t.isDecoding = !1, t
        }();
        e.WebAudioDecode = i, t.registerClass(i, "egret.web.WebAudioDecode");
        var n = function (n) {
            function s() {
                n.call(this), this.loaded = !1
            }

            __extends(s, n);
            var a = __define, r = s, o = r.prototype;
            return a(o, "length", function () {
                if (this.audioBuffer) return this.audioBuffer.duration;
                throw new Error("sound not loaded!")
            }), o.load = function (e) {
                function n() {
                    a.loaded = !0, a.dispatchEventWith(t.Event.COMPLETE)
                }

                function s() {
                    a.dispatchEventWith(t.IOErrorEvent.IO_ERROR)
                }

                var a = this;
                this.url = e;
                var r = new XMLHttpRequest;
                r.open("GET", e, !0), r.responseType = "arraybuffer", console.log("loadWebAudio"), r.onload = function () {
                    a._arrayBuffer = r.response, i.decodeArr.push({
                        buffer: a._arrayBuffer,
                        success: n,
                        fail: s,
                        self: a,
                        url: a.url
                    }), i.decodeAudios()
                }, r.send()
            }, o.play = function (i, n) {
                i = +i || 0, n = +n || 0;
                var s = new e.WebAudioSoundChannel;
                return s.$url = this.url, s.$loops = n, s.$audioBuffer = this.audioBuffer, s.$startTime = i, s.$play(), t.sys.$pushSoundChannel(s), s
            }, o.close = function () {
            }, s.MUSIC = "music", s.EFFECT = "effect", s
        }(t.EventDispatcher);
        e.WebAudioSound = n, t.registerClass(n, "egret.web.WebAudioSound", ["egret.Sound"])
    }(e = t.web || (t.web = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        var i = function (i) {
            function n() {
                var n = this;
                i.call(this), this.$startTime = 0, this.bufferSource = null, this.context = e.WebAudioDecode.ctx, this.isStopped = !1, this._currentTime = 0, this._volume = 1, this.onPlayEnd = function () {
                    return 1 == n.$loops ? (n.stop(), void n.dispatchEventWith(t.Event.SOUND_COMPLETE)) : (n.$loops > 0 && n.$loops--, void n.$play())
                }, this._startTime = 0, this.context.createGain ? this.gain = this.context.createGain() : this.gain = this.context.createGainNode()
            }

            __extends(n, i);
            var s = __define, a = n, r = a.prototype;
            return r.$play = function () {
                if (this.isStopped) return void t.$error(1036);
                this.bufferSource && (this.bufferSource.onended = null, this.bufferSource = null);
                var e = this.context, i = this.gain, n = e.createBufferSource();
                this.bufferSource = n, n.buffer = this.$audioBuffer, n.connect(i), i.connect(e.destination), n.onended = this.onPlayEnd, this._startTime = Date.now(), this.gain.gain.value = this._volume, n.start(0, this.$startTime), this._currentTime = 0
            }, r.stop = function () {
                if (this.bufferSource) {
                    var e = this.bufferSource;
                    e.stop ? e.stop(0) : e.noteOff(0), this.bufferSource.disconnect(), this.bufferSource = null, this.$audioBuffer = null
                }
                this.isStopped || t.sys.$popSoundChannel(this), this.isStopped = !0
            }, s(r, "volume", function () {
                return this._volume
            }, function (e) {
                return this.isStopped ? void t.$error(1036) : (this._volume = e, void(this.gain.gain.value = e))
            }), s(r, "position", function () {
                return this.bufferSource ? (Date.now() - this._startTime) / 1e3 + this.$startTime : 0
            }), n
        }(t.EventDispatcher);
        e.WebAudioSoundChannel = i, t.registerClass(i, "egret.web.WebAudioSoundChannel", ["egret.SoundChannel", "egret.IEventDispatcher"])
    }(e = t.web || (t.web = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        var i = function (e) {
            function i(i) {
                var n = this;
                e.call(this), this.loaded = !1, this.closed = !1, this.heightSet = NaN, this.widthSet = NaN, this.isPlayed = !1, this.screenChanged = function (t) {
                    var e = !!n.video.webkitDisplayingFullscreen;
                    e || n.checkFullScreen(!1)
                }, this._fullscreen = !0, this.onVideoLoaded = function () {
                    n.video.removeEventListener("canplay", n.onVideoLoaded);
                    var e = n.video;
                    n.loaded = !0, e.pause(), n.posterData && (n.posterData.width = n.getPlayWidth(), n.posterData.height = n.getPlayHeight()), e.width = e.videoWidth, e.height = e.videoHeight, n.$invalidateContentBounds(), n.dispatchEventWith(t.Event.COMPLETE)
                }, this.$renderNode = new t.sys.BitmapNode, this.src = i, this.once(t.Event.ADDED_TO_STAGE, this.loadPoster, this), i && this.load()
            }

            __extends(i, e);
            var n = __define, s = i, a = s.prototype;
            return a.load = function (t) {
                var e = this;
                if (t = t || this.src, this.src = t, !this.video || this.video.src != t) {
                    var i = document.createElement("video");
                    i.controls = null, i.src = t, i.setAttribute("autoplay", "autoplay"), i.setAttribute("webkit-playsinline", "true"), i.addEventListener("canplay", this.onVideoLoaded), i.addEventListener("error", function () {
                        return e.onVideoError()
                    }), i.addEventListener("ended", function () {
                        return e.onVideoEnded()
                    }), i.load(), i.play(), i.style.position = "absolute", i.style.top = "0px", i.style.zIndex = "-88888", i.style.left = "0px", i.height = 1, i.width = 1, window.setTimeout(function () {
                        return i.pause()
                    }, 16), this.video = i
                }
            }, a.play = function (e, i) {
                var n = this;
                if (void 0 === i && (i = !1), 0 == this.loaded) return this.load(this.src), void this.once(t.Event.COMPLETE, function (t) {
                    return n.play(e, i)
                }, this);
                this.isPlayed = !0;
                var s = this.video;
                void 0 != e && (s.currentTime = +e || 0), s.loop = !!i, t.Capabilities.isMobile ? s.style.zIndex = "-88888" : s.style.zIndex = "9999", s.style.position = "absolute", s.style.top = "0px", s.style.left = "0px", s.height = this.heightSet, s.width = this.widthSet, "Windows PC" != t.Capabilities.os && "Mac OS" != t.Capabilities.os && setTimeout(function () {
                    s.width = 0
                }, 1e3), this.checkFullScreen(this._fullscreen)
            }, a.checkFullScreen = function (e) {
                var i = this.video;
                e ? (null == i.parentElement && (i.removeAttribute("webkit-playsinline"), document.body.appendChild(i)), t.stopTick(this.markDirty, this), this.goFullscreen()) : (null != i.parentElement && i.parentElement.removeChild(i), i.setAttribute("webkit-playsinline", "true"), this.setFullScreenMonitor(!1), t.startTick(this.markDirty, this)), i.play()
            }, a.goFullscreen = function () {
                var e, i = this.video;
                return e = t.web.getPrefixStyleName("requestFullscreen", i), !i[e] && (e = t.web.getPrefixStyleName("requestFullScreen", i), !i[e]) || (i.removeAttribute("webkit-playsinline"), i[e](), this.setFullScreenMonitor(!0), !0)
            }, a.setFullScreenMonitor = function (t) {
                var e = this.video;
                t ? (e.addEventListener("mozfullscreenchange", this.screenChanged), e.addEventListener("webkitfullscreenchange", this.screenChanged), e.addEventListener("webkitfullscreenerror", this.screenError), e.addEventListener("webkitfullscreenerror", this.screenError)) : (e.removeEventListener("mozfullscreenchange", this.screenChanged), e.removeEventListener("webkitfullscreenchange", this.screenChanged), e.removeEventListener("webkitfullscreenerror", this.screenError), e.removeEventListener("webkitfullscreenerror", this.screenError))
            }, a.screenError = function () {
                t.$error(3003)
            }, a.exitFullscreen = function () {
                document.exitFullscreen ? document.exitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.oCancelFullScreen ? document.oCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen()
            }, a.onVideoEnded = function () {
                this.pause(), this.isPlayed = !1, this.$invalidateContentBounds(), this.dispatchEventWith(t.Event.ENDED)
            }, a.onVideoError = function () {
                this.dispatchEventWith(t.IOErrorEvent.IO_ERROR)
            }, a.close = function () {
                var t = this;
                this.closed = !0, this.video.removeEventListener("canplay", this.onVideoLoaded), this.video.removeEventListener("error", function () {
                    return t.onVideoError()
                }), this.video.removeEventListener("ended", function () {
                    return t.onVideoEnded()
                }), this.pause(), 0 == this.loaded && this.video && (this.video.src = ""), this.video && this.video.parentElement && (this.video.parentElement.removeChild(this.video), this.video = null), this.loaded = !1
            }, a.pause = function () {
                this.video && this.video.pause(), t.stopTick(this.markDirty, this), this.$invalidate()
            }, n(a, "volume", function () {
                return this.video ? this.video.volume : 1
            }, function (t) {
                this.video && (this.video.volume = t)
            }), n(a, "position", function () {
                return this.video ? this.video.currentTime : 0
            }, function (t) {
                this.video && (this.video.currentTime = t)
            }), n(a, "fullscreen", function () {
                return this._fullscreen
            }, function (e) {
                t.Capabilities.isMobile || (this._fullscreen = !!e, this.video && 0 == this.video.paused && this.checkFullScreen(this._fullscreen))
            }), n(a, "bitmapData", function () {
                return this.video && this.loaded ? (this._bitmapData || (this.video.width = this.video.videoWidth, this.video.height = this.video.videoHeight, this._bitmapData = t.$toBitmapData(this.video)), this._bitmapData) : null
            }), a.loadPoster = function () {
                var e = this, i = this.poster;
                if (i) {
                    var n = new t.ImageLoader;
                    n.once(t.Event.COMPLETE, function (t) {
                        n.data, e.posterData = n.data, e.posterData.width = e.getPlayWidth(), e.posterData.height = e.getPlayHeight(), e.$invalidateContentBounds()
                    }, this), n.load(i)
                }
            }, a.$measureContentBounds = function (t) {
                var e = this.bitmapData, i = this.posterData;
                e ? t.setTo(0, 0, this.getPlayWidth(), this.getPlayHeight()) : i ? t.setTo(0, 0, this.getPlayWidth(), this.getPlayHeight()) : t.setEmpty()
            }, a.getPlayWidth = function () {
                return isNaN(this.widthSet) ? this.bitmapData ? this.bitmapData.width : this.posterData ? this.posterData.width : NaN : this.widthSet
            }, a.getPlayHeight = function () {
                return isNaN(this.heightSet) ? this.bitmapData ? this.bitmapData.height : this.posterData ? this.posterData.height : NaN : this.heightSet
            }, a.$render = function () {
                var e = this.$renderNode, i = this.bitmapData, n = this.posterData, s = this.getPlayWidth(),
                    a = this.getPlayHeight();
                this.isPlayed && !t.Capabilities.isMobile || !n ? this.isPlayed && i && (e.image = i, e.drawImage(0, 0, i.width, i.height, 0, 0, s, a)) : (e.image = n, e.drawImage(0, 0, n.width, n.height, 0, 0, s, a))
            }, a.markDirty = function () {
                return this.$invalidate(), !0
            }, a.$setHeight = function (t) {
                return this.heightSet = +t || 0, e.prototype.$setHeight.call(this, t)
            }, a.$setWidth = function (t) {
                return this.widthSet = +t || 0, e.prototype.$setWidth.call(this, t)
            }, n(a, "paused", function () {
                return !this.video || this.video.paused
            }), i
        }(t.DisplayObject);
        e.WebVideo = i, t.registerClass(i, "egret.web.WebVideo", ["egret.Video"]), t.Video = i
    }(e = t.web || (t.web = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        var i = function (e) {
            function i() {
                e.call(this), this._url = "", this._method = ""
            }

            __extends(i, e);
            var n = __define, s = i, a = s.prototype;
            return n(a, "response", function () {
                return this._xhr ? void 0 != this._xhr.response ? this._xhr.response : "text" == this._responseType ? this._xhr.responseText : "document" == this._responseType ? this._xhr.responseXML : null : null
            }), n(a, "responseType", function () {
                return this._responseType
            }, function (t) {
                this._responseType = t
            }), n(a, "withCredentials", function () {
                return this._withCredentials
            }, function (t) {
                this._withCredentials = t
            }), a.getXHR = function () {
                return window.XMLHttpRequest ? new window.XMLHttpRequest : new ActiveXObject("MSXML2.XMLHTTP")
            }, a.open = function (t, e) {
                void 0 === e && (e = "GET"), this._url = t, this._method = e, this._xhr && (this._xhr.abort(), this._xhr = null), this._xhr = this.getXHR(), this._xhr.onreadystatechange = this.onReadyStateChange.bind(this), this._xhr.onprogress = this.updateProgress.bind(this), this._xhr.open(this._method, this._url, !0)
            }, a.send = function (t) {
                if (null != this._responseType && (this._xhr.responseType = this._responseType), null != this._withCredentials && (this._xhr.withCredentials = this._withCredentials), this.headerObj) for (var e in this.headerObj) this._xhr.setRequestHeader(e, this.headerObj[e]);
                this._xhr.send(t)
            }, a.abort = function () {
                this._xhr && this._xhr.abort()
            }, a.getAllResponseHeaders = function () {
                if (!this._xhr) return null;
                var t = this._xhr.getAllResponseHeaders();
                return t ? t : ""
            }, a.setRequestHeader = function (t, e) {
                this.headerObj || (this.headerObj = {}), this.headerObj[t] = e
            }, a.getResponseHeader = function (t) {
                if (!this._xhr) return null;
                var e = this._xhr.getResponseHeader(t);
                return e ? e : ""
            }, a.onReadyStateChange = function () {
                var e = this._xhr;
                if (4 == e.readyState) {
                    var i = e.status >= 400 || 0 == e.status, n = (this._url, this);
                    window.setTimeout(function () {
                        i ? n.dispatchEventWith(t.IOErrorEvent.IO_ERROR) : n.dispatchEventWith(t.Event.COMPLETE)
                    }, 0)
                }
            }, a.updateProgress = function (e) {
                e.lengthComputable && t.ProgressEvent.dispatchProgressEvent(this, t.ProgressEvent.PROGRESS, e.loaded, e.total)
            }, i
        }(t.EventDispatcher);
        e.WebHttpRequest = i, t.registerClass(i, "egret.web.WebHttpRequest", ["egret.HttpRequest"]), t.HttpRequest = i
    }(e = t.web || (t.web = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        var i = window.URL || window.webkitURL, n = function (n) {
            function s() {
                n.apply(this, arguments), this.data = null, this._crossOrigin = null, this._hasCrossOriginSet = !1, this.currentImage = null, this.request = null
            }

            __extends(s, n);
            var a = __define, r = s, o = r.prototype;
            return a(o, "crossOrigin", function () {
                return this._crossOrigin
            }, function (t) {
                this._hasCrossOriginSet = !0, this._crossOrigin = t
            }), o.load = function (i) {
                if (e.Html5Capatibility._canUseBlob && 0 != i.indexOf("wxLocalResource:") && 0 != i.indexOf("data:") && 0 != i.indexOf("http:") && 0 != i.indexOf("https:")) {
                    var n = this.request;
                    n || (n = this.request = new t.web.WebHttpRequest, n.addEventListener(t.Event.COMPLETE, this.onBlobLoaded, this), n.addEventListener(t.IOErrorEvent.IO_ERROR, this.onBlobError, this), n.responseType = "blob"), n.open(i), n.send()
                } else this.loadImage(i)
            }, o.onBlobLoaded = function (t) {
                var e = this.request.response;
                this.loadImage(i.createObjectURL(e))
            }, o.onBlobError = function (t) {
                this.dispatchIOError(this.currentURL)
            }, o.loadImage = function (t) {
                var e = new Image;
                this.data = null, this.currentImage = e, this._hasCrossOriginSet ? this._crossOrigin && (e.crossOrigin = this._crossOrigin) : s.crossOrigin && (e.crossOrigin = s.crossOrigin), e.onload = this.onImageComplete.bind(this), e.onerror = this.onLoadError.bind(this), e.src = t
            }, o.onImageComplete = function (e) {
                var i = this.getImage(e);
                if (i) {
                    this.data = t.$toBitmapData(i);
                    var n = this;
                    window.setTimeout(function () {
                        n.dispatchEventWith(t.Event.COMPLETE)
                    }, 0)
                }
            }, o.onLoadError = function (t) {
                var e = this.getImage(t);
                e && this.dispatchIOError(e.src)
            }, o.dispatchIOError = function (e) {
                var i = this;
                window.setTimeout(function () {
                    i.dispatchEventWith(t.IOErrorEvent.IO_ERROR)
                }, 0)
            }, o.getImage = function (e) {
                var n = e.target, s = n.src;
                if (0 == s.indexOf("blob:")) try {
                    i.revokeObjectURL(n.src)
                } catch (a) {
                    t.$warn(1037)
                }
                return n.onerror = null, n.onload = null, this.currentImage !== n ? null : (this.currentImage = null, n)
            }, s.crossOrigin = null, s
        }(t.EventDispatcher);
        e.WebImageLoader = n, t.registerClass(n, "egret.web.WebImageLoader", ["egret.ImageLoader"]), t.ImageLoader = n
    }(e = t.web || (t.web = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        var i = function (i) {
            function n() {
                i.call(this), this._isNeedShow = !1, this.inputElement = null, this.inputDiv = null, this._gscaleX = 0, this._gscaleY = 0, this._isNeesHide = !1, this.textValue = "", this.colorValue = 16777215, this._styleInfoes = {}
            }

            __extends(n, i);
            var s = n, a = s.prototype;
            return a.$setTextField = function (t) {
                return this.$textfield = t, !0
            }, a.$addToStage = function () {
                this.htmlInput = t.web.$getTextAdapter(this.$textfield)
            }, a._initElement = function () {
                var t = this.$textfield.localToGlobal(0, 0), e = t.x, i = t.y,
                    n = this.$textfield.$renderNode.renderMatrix, s = n.a, a = n.d, r = this.htmlInput.$scaleX,
                    o = this.htmlInput.$scaleY;
                this.inputDiv.style.left = e * r + "px", this.inputDiv.style.top = i * o + "px", this.$textfield.multiline && this.$textfield.height > this.$textfield.size ? (this.inputDiv.style.top = i * o + "px", this.inputElement.style.top = -this.$textfield.lineSpacing / 2 * o + "px") : (this.inputDiv.style.top = i * o + "px", this.inputElement.style.top = "0px"), this._gscaleX = r * s, this._gscaleY = o * a
            }, a.$show = function () {
                this.htmlInput.isCurrentStageText(this) ? this.inputElement.onblur = null : (this.inputElement = this.htmlInput.getInputElement(this), this.inputDiv = this.htmlInput._inputDIV), this.htmlInput._needShow = !0, this._isNeedShow = !0, this._initElement()
            }, a.onBlurHandler = function () {
                this.htmlInput.clearInputElement(), window.scrollTo(0, 0)
            }, a.executeShow = function () {
                this.inputElement.value = this.$getText(), null == this.inputElement.onblur && (this.inputElement.onblur = this.onBlurHandler.bind(this)), this.$resetStageText(), this.$textfield.maxChars > 0 ? this.inputElement.setAttribute("maxlength", this.$textfield.maxChars) : this.inputElement.removeAttribute("maxlength"), this.inputElement.selectionStart = this.inputElement.value.length, this.inputElement.selectionEnd = this.inputElement.value.length, this.inputElement.focus()
            }, a.$hide = function () {
                this._isNeesHide = !0, this.htmlInput && t.web.Html5Capatibility._System_OS == t.web.SystemOSType.IOS && this.htmlInput.disconnectStageText(this)
            }, a.$getText = function () {
                return this.textValue || (this.textValue = ""), this.textValue
            }, a.$setText = function (t) {
                return this.textValue = t, this.resetText(), !0
            }, a.resetText = function () {
                this.inputElement && (this.inputElement.value = this.textValue)
            }, a.$setColor = function (t) {
                return this.colorValue = t, this.resetColor(), !0
            }, a.resetColor = function () {
                this.inputElement && this.setElementStyle("color", t.toColorString(this.colorValue))
            }, a.$onBlur = function () {
                e.Html5Capatibility._System_OS == e.SystemOSType.WPHONE && t.Event.dispatchEvent(this, "updateText", !1)
            }, a._onInput = function () {
                var i = this;
                if (e.Html5Capatibility._System_OS == e.SystemOSType.WPHONE) {
                    var n = this.$textfield.$TextField;
                    null == n[35] && null == n[36] ? (i.textValue = i.inputElement.value, t.Event.dispatchEvent(i, "updateText", !1)) : window.setTimeout(function () {
                        i.inputElement && i.inputElement.selectionStart && i.inputElement.selectionEnd && i.inputElement.selectionStart == i.inputElement.selectionEnd && (i.textValue = i.inputElement.value, t.Event.dispatchEvent(i, "updateText", !1))
                    }, 0)
                } else window.setTimeout(function () {
                    i.inputElement.selectionStart == i.inputElement.selectionEnd && (i.textValue = i.inputElement.value, t.Event.dispatchEvent(i, "updateText", !1))
                }, 0)
            }, a.setAreaHeight = function () {
                var e = this.$textfield;
                if (e.multiline) {
                    var i = t.TextFieldUtils.$getTextHeight(e);
                    if (e.height <= e.size || e.height < i) this.setElementStyle("height", e.size * this._gscaleY + "px"), this.setElementStyle("padding", "0px"), this.setElementStyle("lineHeight", e.size * this._gscaleY + "px"); else {
                        this.setElementStyle("height", (i + e.lineSpacing) * this._gscaleY + "px");
                        var n = (e.height - i) * this._gscaleY, s = t.TextFieldUtils.$getValign(e), a = n * s,
                            r = n - a;
                        this.setElementStyle("padding", a + "px 0px " + r + "px 0px"), this.setElementStyle("lineHeight", (e.size + e.lineSpacing) * this._gscaleY + "px")
                    }
                }
            }, a._onClickHandler = function (e) {
                this._isNeedShow && (e.stopImmediatePropagation(), this._isNeedShow = !1, this.executeShow(), this.dispatchEvent(new t.Event("focus")))
            }, a._onDisconnect = function () {
                this.inputElement = null, this.dispatchEvent(new t.Event("blur"))
            }, a.setElementStyle = function (t, e) {
                this.inputElement && this._styleInfoes[t] != e && (this.inputElement.style[t] = e)
            }, a.$removeFromStage = function () {
                this.inputElement && this.htmlInput.disconnectStageText(this)
            }, a.$resetStageText = function () {
                if (this.inputElement) {
                    var e = this.$textfield;
                    if (this.setElementStyle("fontFamily", e.fontFamily), this.setElementStyle("fontStyle", e.italic ? "italic" : "normal"), this.setElementStyle("fontWeight", e.bold ? "bold" : "normal"), this.setElementStyle("textAlign", e.textAlign), this.setElementStyle("fontSize", e.size * this._gscaleY + "px"), this.setElementStyle("color", t.toColorString(e.textColor)), e.stage) {
                        var i = e.localToGlobal(0, 0).x;
                        i = Math.min(e.width, e.stage.stageWidth - i)
                    } else i = e.width;
                    if (this.setElementStyle("width", i * this._gscaleX + "px"), this.setElementStyle("verticalAlign", e.verticalAlign), e.multiline) this.setAreaHeight(); else if (this.setElementStyle("lineHeight", e.size * this._gscaleY + "px"), e.height < e.size) {
                        this.setElementStyle("height", e.size * this._gscaleY + "px");
                        var n = e.size / 2 * this._gscaleY;
                        this.setElementStyle("padding", "0px 0px " + n + "px 0px")
                    } else {
                        this.setElementStyle("height", e.size * this._gscaleY + "px");
                        var s = (e.height - e.size) * this._gscaleY, a = t.TextFieldUtils.$getValign(e), r = s * a,
                            n = s - r;
                        n < e.size / 2 * this._gscaleY && (n = e.size / 2 * this._gscaleY), this.setElementStyle("padding", r + "px 0px " + n + "px 0px")
                    }
                    this.inputDiv.style.clip = "rect(0px " + e.width * this._gscaleX + "px " + e.height * this._gscaleY + "px 0px)", this.inputDiv.style.height = e.height * this._gscaleY + "px", this.inputDiv.style.width = i * this._gscaleX + "px"
                }
            }, n
        }(t.EventDispatcher);
        e.HTML5StageText = i, t.registerClass(i, "egret.web.HTML5StageText", ["egret.StageText"]), t.StageText = i
    }(e = t.web || (t.web = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        var i = function () {
            function e() {
                this._needShow = !1, this.$scaleX = 1, this.$scaleY = 1
            }

            var i = e, n = i.prototype;
            return n.isInputOn = function () {
                return null != this._stageText
            }, n.isCurrentStageText = function (t) {
                return this._stageText == t
            }, n.initValue = function (t) {
                t.style.position = "absolute", t.style.left = "0px", t.style.top = "0px", t.style.border = "none", t.style.padding = "0"
            }, n.$updateSize = function () {
                if (this.canvas) {
                    var e = this.canvas.width, i = this.canvas.height, n = this.canvas.style.width.split("px")[0],
                        s = this.canvas.style.height.split("px")[0];
                    this.canvas.style.top = "0px", this.$scaleX = n / e, this.$scaleY = s / i, this.StageDelegateDiv.style.left = this.canvas.style.left, this.StageDelegateDiv.style.top = this.canvas.style.top;
                    var a = t.web.getPrefixStyleName("transform");
                    this.StageDelegateDiv.style[a] = this.canvas.style[a], this.StageDelegateDiv.style[t.web.getPrefixStyleName("transformOrigin")] = "0% 0% 0px"
                }
            }, n._initStageDelegateDiv = function (e, i) {
                this.canvas = i;
                var n, s = this;
                n || (n = document.createElement("div"), this.StageDelegateDiv = n, n.id = "StageDelegateDiv", e.appendChild(n), s.initValue(n), s._inputDIV = document.createElement("div"), s.initValue(s._inputDIV), s._inputDIV.style.width = "0px", s._inputDIV.style.height = "0px", s._inputDIV.style.left = "0px", s._inputDIV.style.top = "-100px", s._inputDIV.style[t.web.getPrefixStyleName("transformOrigin")] = "0% 0% 0px", n.appendChild(s._inputDIV), this.canvas.addEventListener("click", function (t) {
                    s._needShow ? (s._needShow = !1, s._stageText._onClickHandler(t), s.show()) : s._inputElement && (s.clearInputElement(), s._inputElement.blur(), s._inputElement = null)
                }), s.initInputElement(!0), s.initInputElement(!1))
            }, n.initInputElement = function (t) {
                var e, i = this;
                t ? (e = document.createElement("textarea"), e.style.resize = "none", i._multiElement = e, e.id = "egretTextarea") : (e = document.createElement("input"), i._simpleElement = e, e.id = "egretInput"), e.type = "text", i._inputDIV.appendChild(e), e.setAttribute("tabindex", "-1"), e.style.width = "1px", e.style.height = "12px", i.initValue(e), e.style.outline = "thin", e.style.background = "none", e.style.overflow = "hidden", e.style.wordBreak = "break-all", e.style.opacity = 0, e.oninput = function () {
                    i._stageText && i._stageText._onInput()
                }
            }, n.show = function () {
                var e = this, i = e._inputElement;
                t.$callAsync(function () {
                    i.style.opacity = 1
                }, e)
            }, n.disconnectStageText = function (t) {
                (null == this._stageText || this._stageText == t) && (this.clearInputElement(), this._inputElement && this._inputElement.blur())
            }, n.clearInputElement = function () {
                var t = this;
                if (t._inputElement) {
                    t._inputElement.value = "", t._inputElement.onblur = null, t._inputElement.style.width = "1px", t._inputElement.style.height = "12px", t._inputElement.style.left = "0px", t._inputElement.style.top = "0px", t._inputElement.style.opacity = 0;
                    var e;
                    e = t._simpleElement == t._inputElement ? t._multiElement : t._simpleElement, e.style.display = "block", t._inputDIV.style.left = "0px", t._inputDIV.style.top = "-100px", t._inputDIV.style.height = "0px", t._inputDIV.style.width = "0px"
                }
                t._stageText && (t._stageText._onDisconnect(), t._stageText = null, this.canvas.userTyping = !1)
            }, n.getInputElement = function (t) {
                var e = this;
                e.clearInputElement(), e._stageText = t, this.canvas.userTyping = !0, e._stageText.$textfield.multiline ? e._inputElement = e._multiElement : e._inputElement = e._simpleElement;
                var i;
                return i = e._simpleElement == e._inputElement ? e._multiElement : e._simpleElement, i.style.display = "none", e._inputElement
            }, e
        }();
        e.HTMLInput = i, t.registerClass(i, "egret.web.HTMLInput")
    }(e = t.web || (t.web = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (t) {
        function e(t) {
            var e = t.stage ? t.stage.$hashCode : 0, i = n[e], r = s[e], o = a[e];
            return r && o && (delete s[e], delete a[e]), i
        }

        function i(t, e, i, r) {
            t._initStageDelegateDiv(i, r), n[e.$hashCode] = t, s[e.$hashCode] = r, a[e.$hashCode] = i
        }

        var n = {}, s = {}, a = {};
        t.$getTextAdapter = e, t.$cacheTextAdapter = i
    }(e = t.web || (t.web = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        function i(t, e, i, n, r) {
            var o = "";
            r && (o += "italic "), n && (o += "bold "), o += (i || 12) + "px ", o += e || "Arial";
            var h = 0, l = a[o] || (a[o] = {});
            s.font = o;
            for (var u = t.length, c = 0; u > c; c++) {
                var d = t.charCodeAt(c), f = l[d] || (l[d] = s.measureText(t.charAt(c)).width);
                h += f
            }
            return h
        }

        function n() {
            var t = document.createElement("canvas");
            s = t.getContext("2d"), s.textAlign = "left", s.textBaseline = "middle"
        }

        var s = null, a = {};
        n(), t.sys.measureText = i
    }(e = t.web || (t.web = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        function i(e, i) {
            var n = document.createElement("canvas");
            isNaN(e) || isNaN(i) || (n.width = e, n.height = i), t.$toBitmapData(n);
            var s = n.getContext("2d");
            if (void 0 === s.imageSmoothingEnabled) {
                for (var a = ["webkitImageSmoothingEnabled", "mozImageSmoothingEnabled", "msImageSmoothingEnabled"], r = a.length - 1; r >= 0; r--) {
                    var o = a[r];
                    if (void 0 !== s[o]) break
                }
                try {
                    Object.defineProperty(s, "imageSmoothingEnabled", {
                        get: function () {
                            return this[o]
                        }, set: function (t) {
                            this[o] = t
                        }
                    })
                } catch (h) {
                    s.imageSmoothingEnabled = s[o]
                }
            }
            return n
        }

        var n = i(), s = function () {
            function t(t, e) {
                this.surface = i(t, e), this.context = this.surface.getContext("2d")
            }

            var e = __define, s = t, a = s.prototype;
            return e(a, "width", function () {
                return this.surface.width
            }), e(a, "height", function () {
                return this.surface.height
            }), a.resize = function (t, e, i) {
                var n = this.surface;
                if (i) {
                    var s = !1;
                    n.width < t && (n.width = t, s = !0), n.height < e && (n.height = e, s = !0), s || (this.context.globalCompositeOperation = "source-over", this.context.setTransform(1, 0, 0, 1, 0, 0), this.context.globalAlpha = 1)
                } else n.width != t && (n.width = t), n.height != e && (n.height = e);
                this.clear()
            }, a.resizeTo = function (t, e, i, s) {
                var a = (this.context, this.surface), r = n, o = r.getContext("2d");
                n = a, this.context = o, this.surface = r, r.width = Math.max(t, 257), r.height = Math.max(e, 257), o.setTransform(1, 0, 0, 1, 0, 0), o.drawImage(a, i, s), a.height = 1, a.width = 1
            }, a.beginClip = function (t, e, i) {
                e = +e || 0, i = +i || 0;
                var n = this.context;
                n.save(), n.beginPath(), n.setTransform(1, 0, 0, 1, e, i);
                for (var s = t.length, a = 0; s > a; a++) {
                    var r = t[a];
                    n.clearRect(r.minX, r.minY, r.width, r.height), n.rect(r.minX, r.minY, r.width, r.height)
                }
                n.clip()
            }, a.endClip = function () {
                this.context.restore()
            }, a.getPixel = function (t, e) {
                return this.context.getImageData(t, e, 1, 1).data
            }, a.toDataURL = function (t, e) {
                return this.surface.toDataURL(t, e)
            }, a.clear = function () {
                this.context.setTransform(1, 0, 0, 1, 0, 0), this.context.clearRect(0, 0, this.surface.width, this.surface.height)
            }, a.destroy = function () {
                this.surface.width = this.surface.height = 0
            }, t
        }();
        e.CanvasRenderBuffer = s, t.registerClass(s, "egret.web.CanvasRenderBuffer", ["egret.sys.RenderBuffer"]), t.sys.hitTestBuffer = new s(3, 3)
    }(e = t.web || (t.web = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        var i = function (e) {
            function i(i, n) {
                var s = this;
                e.call(this), this.onTouchBegin = function (t) {
                    var e = s.getLocation(t);
                    s.touch.onTouchBegin(e.x, e.y, t.identifier)
                }, this.onTouchMove = function (t) {
                    var e = s.getLocation(t);
                    s.touch.onTouchMove(e.x, e.y, t.identifier)
                }, this.onTouchEnd = function (t) {
                    var e = s.getLocation(t);
                    s.touch.onTouchEnd(e.x, e.y, t.identifier)
                }, this.scaleX = 1, this.scaleY = 1, this.rotation = 0, this.canvas = n, this.touch = new t.sys.TouchHandler(i), this.addListeners()
            }

            __extends(i, e);
            var n = i, s = n.prototype;
            return s.addListeners = function () {
                var e = this;
                window.navigator.msPointerEnabled ? (this.canvas.addEventListener("MSPointerDown", function (t) {
                    t.identifier = t.pointerId, e.onTouchBegin(t), e.prevent(t)
                }, !1), this.canvas.addEventListener("MSPointerMove", function (t) {
                    t.identifier = t.pointerId, e.onTouchMove(t), e.prevent(t)
                }, !1), this.canvas.addEventListener("MSPointerUp", function (t) {
                    t.identifier = t.pointerId, e.onTouchEnd(t), e.prevent(t)
                }, !1)) : (t.Capabilities.$isMobile || this.addMouseListener(), this.addTouchListener())
            }, s.addMouseListener = function () {
                this.canvas.addEventListener("mousedown", this.onTouchBegin), this.canvas.addEventListener("mousemove", this.onTouchMove), this.canvas.addEventListener("mouseup", this.onTouchEnd)
            }, s.addTouchListener = function () {
                var t = this;
                this.canvas.addEventListener("touchstart", function (e) {
                    for (var i = e.changedTouches.length, n = 0; i > n; n++) t.onTouchBegin(e.changedTouches[n]);
                    t.prevent(e)
                }, !1), this.canvas.addEventListener("touchmove", function (e) {
                    for (var i = e.changedTouches.length, n = 0; i > n; n++) t.onTouchMove(e.changedTouches[n]);
                    t.prevent(e)
                }, !1), this.canvas.addEventListener("touchend", function (e) {
                    for (var i = e.changedTouches.length, n = 0; i > n; n++) t.onTouchEnd(e.changedTouches[n]);
                    t.prevent(e)
                }, !1), this.canvas.addEventListener("touchcancel", function (e) {
                    for (var i = e.changedTouches.length, n = 0; i > n; n++) t.onTouchEnd(e.changedTouches[n]);
                    t.prevent(e)
                }, !1)
            }, s.prevent = function (t) {
                t.stopPropagation(), 1 == t.isScroll || this.canvas.userTyping || t.preventDefault()
            }, s.getLocation = function (e) {
                e.identifier = +e.identifier || 0;
                var i = document.documentElement, n = this.canvas.getBoundingClientRect(),
                    s = n.left + window.pageXOffset - i.clientLeft, a = n.top + window.pageYOffset - i.clientTop,
                    r = e.pageX - s, o = r, h = e.pageY - a, l = h;
                return 90 == this.rotation ? (o = h, l = n.width - r) : -90 == this.rotation && (o = n.height - h, l = r), o /= this.scaleX, l /= this.scaleY, t.$TempPoint.setTo(Math.round(o), Math.round(l))
            }, s.updateScaleMode = function (t, e, i) {
                this.scaleX = t, this.scaleY = e, this.rotation = i
            }, s.$updateMaxTouches = function () {
                this.touch.$initMaxTouches()
            }, i
        }(t.HashObject);
        e.WebTouchHandler = i, t.registerClass(i, "egret.web.WebTouchHandler")
    }(e = t.web || (t.web = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        var i = function (e) {
            function i(t) {
                e.call(this), this.isActivate = !0, this.stage = t, this.registerListener()
            }

            __extends(i, e);
            var n = i, s = n.prototype;
            return s.registerListener = function () {
                var e = this, i = function () {
                    e.isActivate && (e.isActivate = !1, e.stage.dispatchEvent(new t.Event(t.Event.DEACTIVATE)))
                }, n = function () {
                    e.isActivate || (e.isActivate = !0, e.stage.dispatchEvent(new t.Event(t.Event.ACTIVATE)))
                }, s = function () {
                    document[a] ? i() : n()
                };
                window.addEventListener("focus", n, !1), window.addEventListener("blur", i, !1);
                var a, r;
                "undefined" != typeof document.hidden ? (a = "hidden", r = "visibilitychange") : "undefined" != typeof document.mozHidden ? (a = "mozHidden", r = "mozvisibilitychange") : "undefined" != typeof document.msHidden ? (a = "msHidden", r = "msvisibilitychange") : "undefined" != typeof document.webkitHidden ? (a = "webkitHidden", r = "webkitvisibilitychange") : "undefined" != typeof document.oHidden && (a = "oHidden", r = "ovisibilitychange"), "onpageshow" in window && "onpagehide" in window && (window.addEventListener("pageshow", n, !1), window.addEventListener("pagehide", i, !1)), a && r && document.addEventListener(r, s, !1);
                var o = navigator.userAgent, h = /micromessenger/gi.test(o), l = /mqq/gi.test(o),
                    u = /mobile.*qq/gi.test(o);
                if ((u || h) && (l = !1), l) {
                    var c = window.browser || {};
                    c.execWebFn = c.execWebFn || {}, c.execWebFn.postX5GamePlayerMessage = function (t) {
                        var e = t.type;
                        "app_enter_background" == e ? i() : "app_enter_foreground" == e && n()
                    }, window.browser = c
                }
            }, i
        }(t.HashObject);
        e.WebHideHandler = i, t.registerClass(i, "egret.web.WebHideHandler")
    }(e = t.web || (t.web = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        function i(t, e) {
            var i = "";
            if (null != e) i = n(t, e); else {
                if (null == o) {
                    var s = document.createElement("div").style;
                    o = n("transform", s)
                }
                i = o
            }
            return "" == i ? t : i + t.charAt(0).toUpperCase() + t.substring(1, t.length)
        }

        function n(t, e) {
            if (t in e) return "";
            t = t.charAt(0).toUpperCase() + t.substring(1, t.length);
            for (var i = ["webkit", "ms", "Moz", "O"], n = 0; n < i.length; n++) {
                var s = i[n] + t;
                if (s in e) return i[n]
            }
            return ""
        }

        var s = function () {
            function t() {
            }

            var e = t;
            return e.prototype, t.QQ_AUDIO = 1, t.WEB_AUDIO = 2, t.HTML5_AUDIO = 3, t
        }();
        e.AudioType = s, t.registerClass(s, "egret.web.AudioType");
        var a = function () {
            function t() {
            }

            var e = t;
            return e.prototype, t.WPHONE = 1, t.IOS = 2, t.ADNROID = 3, t
        }();
        e.SystemOSType = a, t.registerClass(a, "egret.web.SystemOSType");
        var r = function (e) {
            function i() {
                e.call(this)
            }

            __extends(i, e);
            var n = i;
            return n.prototype, i._init = function () {
                var e = navigator.userAgent.toLowerCase();
                if (i.ua = e, t.Capabilities.$isMobile = -1 != e.indexOf("mobile") || -1 != e.indexOf("android"), i._canUseBlob = !1, i._audioType = s.HTML5_AUDIO, i._AudioClass = t.web.HtmlSound, i._audioMustLoad = !0, e.indexOf("windows phone") >= 0) i._System_OS = a.WPHONE, i._audioMustLoad = !1, t.Capabilities.$os = "Windows Phone"; else if (e.indexOf("android") >= 0) {
                    if (i._System_OS = a.ADNROID, e.indexOf("ucbrowser") >= 0 && (i._audioMustLoad = !1), t.Capabilities.$os = "Android", i._System_OS = a.ADNROID, window.hasOwnProperty("QZAppExternal") && e.indexOf("qzone") >= 0) {
                        i._audioType = s.QQ_AUDIO, i._AudioClass = t.web.QQSound;
                        var n = document.getElementsByTagName("base");
                        if (n && n.length > 0) i._QQRootPath = n[0].baseURI; else {
                            var r = window.location.href.indexOf("?");
                            -1 == r && (r = window.location.href.length);
                            var o = window.location.href.substring(0, r);
                            o = o.substring(0, o.lastIndexOf("/")), i._QQRootPath = o + "/"
                        }
                    }
                } else e.indexOf("iphone") >= 0 || e.indexOf("ipad") >= 0 || e.indexOf("ipod") >= 0 ? (t.Capabilities.$os = "iOS", i._System_OS = a.IOS, i.getIOSVersion() >= 7 && (i._canUseBlob = !0, i._AudioClass = t.web.WebAudioSound, i._audioType = s.WEB_AUDIO)) : -1 != e.indexOf("windows nt") ? t.Capabilities.$os = "Windows PC" : -1 != e.indexOf("mac os") && (t.Capabilities.$os = "Mac OS");
                var h = window.URL || window.webkitURL;
                h || (i._canUseBlob = !1);
                var l = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
                l || i._audioType != s.WEB_AUDIO || (i._audioType = s.HTML5_AUDIO, i._AudioClass = t.web.HtmlSound), t.Sound = i._AudioClass
            }, i.getIOSVersion = function () {
                var t = i.ua.toLowerCase().match(/cpu [^\d]*\d.*like mac os x/)[0];
                return parseInt(t.match(/\d(_\d)*/)[0]) || 0
            }, i.checkHtml5Support = function () {
                var e = (navigator.language || navigator.browserLanguage).toLowerCase(), i = e.split("-");
                i.length > 1 && (i[1] = i[1].toUpperCase()), t.Capabilities.$language = i.join("-")
            }, i._canUseBlob = !1, i._audioType = 0, i._audioMustLoad = !1, i._QQRootPath = "", i._System_OS = 0, i.ua = "", i
        }(t.HashObject);
        e.Html5Capatibility = r, t.registerClass(r, "egret.web.Html5Capatibility"), r._init();
        var o = null;
        e.getPrefixStyleName = i, e.getPrefix = n
    }(e = t.web || (t.web = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        function i() {
            if (o) for (var t = document.querySelectorAll(".egret-player"), e = t.length, i = 0; e > i; i++) {
                var n = t[i], s = n["egret-player"];
                s.updateScreenSize()
            }
        }

        function n(i) {
            if (!o) {
                o = !0, i || (i = {}), s(i.renderMode);
                var n = t.sys.$ticker;
                a(n), i.screenAdapter ? t.sys.screenAdapter = i.screenAdapter : t.sys.screenAdapter || (t.sys.screenAdapter = new t.sys.DefaultScreenAdapter);
                for (var r = document.querySelectorAll(".egret-player"), h = r.length, l = 0; h > l; l++) {
                    var u = r[l], c = new e.WebPlayer(u);
                    u["egret-player"] = c
                }
            }
        }

        function s(i) {
            t.sys.RenderBuffer = e.CanvasRenderBuffer, t.sys.systemRenderer = new t.CanvasRenderer
        }

        function a(t) {
            function e() {
                t.update(), i.call(window, e)
            }

            var i = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
            i || (i = function (t) {
                return window.setTimeout(t, 1e3 / 60)
            }), i.call(window, e)
        }

        function r() {
            h = NaN, t.updateAllScreens()
        }

        var o = !1;
        window.isNaN = function (t) {
            return t = +t, t !== t
        }, t.runEgret = n, t.updateAllScreens = i;
        var h = NaN;
        window.addEventListener("resize", function () {
            isNaN(h) && (h = window.setTimeout(r, 300))
        })
    }(e = t.web || (t.web = {}))
}(egret || (egret = {}));
var language, egret;
!function (t) {
    var e;
    !function (e) {
        var i = function () {
            function e() {
            }

            var i = e;
            return i.prototype, e.detect = function () {
                var e = t.Capabilities, i = navigator.userAgent.toLowerCase();
                e.$isMobile = -1 != i.indexOf("mobile") || -1 != i.indexOf("android"), e.$isMobile ? i.indexOf("windows") < 0 && (-1 != i.indexOf("iphone") || -1 != i.indexOf("ipad") || -1 != i.indexOf("ipod")) ? e.$os = "iOS" : -1 != i.indexOf("android") && -1 != i.indexOf("linux") ? e.$os = "Android" : -1 != i.indexOf("windows") && (e.$os = "Windows Phone") : -1 != i.indexOf("windows nt") ? e.$os = "Windows PC" : -1 != i.indexOf("mac os") && (e.$os = "Mac OS");
                var n = (navigator.language || navigator.browserLanguage).toLowerCase(), s = n.split("-");
                s.length > 1 && (s[1] = s[1].toUpperCase()), e.$language = s.join("-")
            }, e
        }();
        e.WebCapability = i, t.registerClass(i, "egret.web.WebCapability"), i.detect()
    }(e = t.web || (t.web = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        function i(t) {
            if (window.location) {
                var e = location.search;
                if ("" == e) return "";
                e = e.slice(1);
                for (var i = e.split("&"), n = i.length, s = 0; n > s; s++) {
                    var a = i[s], r = a.split("=");
                    if (r[0] == t) return r[1]
                }
            }
            return ""
        }

        e.getOption = i, t.getOption = i
    }(e = t.web || (t.web = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        var i = function (i) {
            function n(t) {
                i.call(this), this.init(t), this.initOrientation()
            }

            __extends(n, i);
            var s = n, a = s.prototype;
            return a.init = function (i) {
                var n = this.readOption(i), s = new t.Stage;
                s.$screen = this, s.$scaleMode = n.scaleMode, s.$orientation = n.orientation, s.$maxTouches = n.maxTouches, s.frameRate = n.frameRate, s.textureScaleFactor = n.textureScaleFactor;
                var a = new t.sys.RenderBuffer, r = a.surface;
                this.attachCanvas(i, r);
                var o = new e.WebTouchHandler(s, r), h = new t.sys.Player(a, s, n.entryClassName),
                    l = new t.web.WebHideHandler(s), u = new e.HTMLInput;
                h.showPaintRect(n.showPaintRect), (n.showFPS || n.showLog) && h.displayFPS(n.showFPS, n.showLog, n.logFilter, n.fpsStyles), this.playerOption = n, this.container = i, this.canvas = r, this.stage = s, this.player = h, this.webTouchHandler = o, this.webInput = u, this.webHide = l, t.web.$cacheTextAdapter(u, s, i, r), this.updateScreenSize(), this.updateMaxTouches(), h.start()
            }, a.initOrientation = function () {
                var e = this;
                window.addEventListener("orientationchange", function () {
                    window.setTimeout(function () {
                        t.StageOrientationEvent.dispatchStageOrientationEvent(e.stage, t.StageOrientationEvent.ORIENTATION_CHANGE)
                    }, 350)
                })
            }, a.readOption = function (e) {
                var i = {};
                i.entryClassName = e.getAttribute("data-entry-class"), i.scaleMode = e.getAttribute("data-scale-mode") || t.StageScaleMode.NO_SCALE, i.frameRate = +e.getAttribute("data-frame-rate") || 30, i.contentWidth = +e.getAttribute("data-content-width") || 480, i.contentHeight = +e.getAttribute("data-content-height") || 800, i.orientation = e.getAttribute("data-orientation") || t.OrientationMode.AUTO, i.maxTouches = +e.getAttribute("data-multi-fingered") || 2, i.textureScaleFactor = +e.getAttribute("texture-scale-factor") || 1, i.showPaintRect = "true" == e.getAttribute("data-show-paint-rect"), i.showFPS = "true" == e.getAttribute("data-show-fps");
                for (var n = e.getAttribute("data-show-fps-style") || "", s = n.split(","), a = {}, r = 0; r < s.length; r++) {
                    var o = s[r].split(":");
                    a[o[0]] = o[1]
                }
                return i.fpsStyles = a, i.showLog = "true" == e.getAttribute("data-show-log"), i.logFilter = e.getAttribute("data-log-filter"), i
            }, a.attachCanvas = function (t, e) {
                var i = e.style;
                i.cursor = "inherit", i.position = "absolute", i.top = "0", i.bottom = "0", i.left = "0", i.right = "0", t.appendChild(e), i = t.style, i.overflow = "hidden", i.position = "relative", i.webkitTransform = "translateZ(0)"
            }, a.updateScreenSize = function () {
                var e = this.canvas;
                if (!e.userTyping) {
                    var i = this.playerOption, n = this.container.getBoundingClientRect(), s = !1,
                        a = this.stage.$orientation;
                    a != t.OrientationMode.AUTO && (s = a != t.OrientationMode.PORTRAIT && n.height > n.width || a == t.OrientationMode.PORTRAIT && n.width > n.height);
                    var r = s ? n.height : n.width, o = s ? n.width : n.height,
                        h = t.sys.screenAdapter.calculateStageSize(this.stage.$scaleMode, r, o, i.contentWidth, i.contentHeight),
                        l = h.stageWidth, u = h.stageHeight, c = h.displayWidth, d = h.displayHeight;
                    e.width !== l && (e.width = l), e.height !== u && (e.height = u), e.style[t.web.getPrefixStyleName("transformOrigin")] = "0% 0% 0px", e.style.width = c + "px", e.style.height = d + "px";
                    var f = 0;
                    s ? a == t.OrientationMode.LANDSCAPE ? (f = 90, e.style.top = (n.height - c) / 2 + "px", e.style.left = (n.width + d) / 2 + "px") : (f = -90, e.style.top = (n.height + c) / 2 + "px", e.style.left = (n.width - d) / 2 + "px") : (e.style.top = (n.height - d) / 2 + "px", e.style.left = (n.width - c) / 2 + "px");
                    var g = "rotate(" + f + "deg)";
                    e.style[t.web.getPrefixStyleName("transform")] = g;
                    var p = c / l, _ = d / u;
                    this.webTouchHandler.updateScaleMode(p, _, f), this.webInput.$updateSize(), this.player.updateStageSize(l, u)
                }
            }, a.setContentSize = function (t, e) {
                var i = this.playerOption;
                i.contentWidth = t, i.contentHeight = e, this.updateScreenSize()
            }, a.updateMaxTouches = function () {
                this.webTouchHandler.$updateMaxTouches()
            }, n
        }(t.HashObject);
        e.WebPlayer = i, t.registerClass(i, "egret.web.WebPlayer", ["egret.sys.Screen"])
    }(e = t.web || (t.web = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        function i(e, i) {
            var n = t.sys.hitTestBuffer, s = e.$getTextureWidth(), a = e.$getTextureHeight();
            null == i && (i = t.$TempRectangle, i.x = 0, i.y = 0, i.width = s, i.height = a), i.x = Math.min(i.x, s - 1), i.y = Math.min(i.y, a - 1), i.width = Math.min(i.width, s - i.x), i.height = Math.min(i.height, a - i.y);
            var r = i.width, o = i.height, h = n.surface;
            h.style.width = r + "px", h.style.height = o + "px", n.resize(r, o);
            var l = e, u = Math.round(l._offsetX), c = Math.round(l._offsetY), d = l._bitmapWidth, f = l._bitmapHeight;
            return n.context.drawImage(l._bitmapData, l._bitmapX + i.x / t.$TextureScaleFactor, l._bitmapY + i.y / t.$TextureScaleFactor, d * i.width / s, f * i.height / a, u, c, i.width, i.height), h
        }

        function n(e, n) {
            try {
                var s = i(this, n), a = s.toDataURL(e);
                return a
            } catch (r) {
                t.$error(1033)
            }
            return null
        }

        function s(t, e, i) {
            var s = n.call(this, t, i);
            if (null != s) {
                var a = s.replace(/^data:image[^;]*/, "data:image/octet-stream"), r = document.createElement("a");
                r.download = e, r.href = a;
                var o = document.createEvent("HTMLEvents");
                o.initEvent("click", !1, !1), r.dispatchEvent(o)
            }
        }

        function a(e, i) {
            var n = t.sys.hitTestBuffer;
            n.resize(3, 3);
            var s = n.context;
            s.translate(1 - e, 1 - i);
            var a = this._bitmapWidth, r = this._bitmapHeight, o = t.$TextureScaleFactor;
            s.drawImage(this._bitmapData, this._bitmapX, this._bitmapY, a, this._bitmapHeight, this._offsetX, this._offsetY, a * o, r * o);
            try {
                var h = s.getImageData(1, 1, 1, 1).data
            } catch (l) {
                throw console.log(this), new Error(t.sys.tr(1039))
            }
            return h
        }

        t.Texture.prototype.toDataURL = n, t.Texture.prototype.saveToFile = s, t.Texture.prototype.getPixel32 = a
    }(e = t.web || (t.web = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        function i(t) {
            for (var e = o.parseFromString(t, "text/xml"), i = e.childNodes.length, s = 0; i > s; s++) {
                var a = e.childNodes[s];
                if (1 == a.nodeType) return n(a, null)
            }
            return null
        }

        function n(t, e) {
            if ("parsererror" == t.localName) throw new Error(t.textContent);
            for (var i = new a(t.localName, e, t.prefix, t.namespaceURI, t.nodeName), s = t.attributes, o = i.attributes, h = s.length, l = 0; h > l; l++) {
                var u = s[l], c = u.name;
                0 != c.indexOf("xmlns:") && (o[c] = u.value, i["$" + c] = u.value)
            }
            var d = t.childNodes;
            h = d.length;
            var f = i.children;
            for (l = 0; h > l; l++) {
                var g = d[l], p = g.nodeType, _ = null;
                if (1 == p) _ = n(g, i); else if (3 == p) {
                    var m = g.textContent.trim();
                    m && (_ = new r(m, i))
                }
                _ && f.push(_)
            }
            return i
        }

        var s = function () {
            function t(t, e) {
                this.nodeType = t, this.parent = e
            }

            var e = t;
            return e.prototype, t
        }();
        e.XMLNode = s, t.registerClass(s, "egret.web.XMLNode");
        var a = function (t) {
            function e(e, i, n, s, a) {
                t.call(this, 1, i), this.attributes = {}, this.children = [], this.localName = e, this.prefix = n, this.namespace = s, this.name = a
            }

            __extends(e, t);
            var i = e;
            return i.prototype, e
        }(s);
        e.XML = a, t.registerClass(a, "egret.web.XML");
        var r = function (t) {
            function e(e, i) {
                t.call(this, 3, i), this.text = e
            }

            __extends(e, t);
            var i = e;
            return i.prototype, e
        }(s);
        e.XMLText = r, t.registerClass(r, "egret.web.XMLText");
        var o = new DOMParser;
        t.XML = {parse: i}
    }(e = t.web || (t.web = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        var i = function (e) {
            function i() {
                var i = this;
                e.apply(this, arguments), this.onChange = function (e) {
                    var n = new t.OrientationEvent(t.Event.CHANGE);
                    n.beta = e.beta, n.gamma = e.gamma, n.alpha = e.alpha, i.dispatchEvent(n)
                }
            }

            __extends(i, e);
            var n = i, s = n.prototype;
            return s.start = function () {
                window.addEventListener("deviceorientation", this.onChange)
            }, s.stop = function () {
                window.removeEventListener("deviceorientation", this.onChange)
            }, i
        }(t.EventDispatcher);
        e.WebDeviceOrientation = i, t.registerClass(i, "egret.web.WebDeviceOrientation", ["egret.DeviceOrientation"])
    }(e = t.web || (t.web = {}))
}(egret || (egret = {})), egret.DeviceOrientation = egret.web.WebDeviceOrientation;
var egret;
!function (t) {
    var e;
    !function (e) {
        var i = function (e) {
            function i(i) {
                var n = this;
                e.call(this), this.onUpdate = function (e) {
                    var i = new t.GeolocationEvent(t.Event.CHANGE), s = e.coords;
                    i.altitude = s.altitude, i.heading = s.heading, i.accuracy = s.accuracy, i.latitude = s.latitude, i.longitude = s.longitude, i.speed = s.speed, i.altitudeAccuracy = s.altitudeAccuracy, n.dispatchEvent(i)
                }, this.onError = function (e) {
                    var i = t.GeolocationEvent.UNAVAILABLE;
                    e.code == e.PERMISSION_DENIED && (i = t.GeolocationEvent.PERMISSION_DENIED);
                    var s = new t.GeolocationEvent(t.IOErrorEvent.IO_ERROR);
                    s.errorType = i, s.errorMessage = e.message, n.dispatchEvent(s)
                }, this.geolocation = navigator.geolocation
            }

            __extends(i, e);
            var n = i, s = n.prototype;
            return s.start = function () {
                var e = this.geolocation;
                e ? this.watchId = e.watchPosition(this.onUpdate, this.onError) : this.onError({
                    code: 2,
                    message: t.sys.tr(3004),
                    PERMISSION_DENIED: 1,
                    POSITION_UNAVAILABLE: 2
                })
            }, s.stop = function () {
                var t = this.geolocation;
                t.clearWatch(this.watchId)
            }, i
        }(t.EventDispatcher);
        e.WebGeolocation = i, t.registerClass(i, "egret.web.WebGeolocation", ["egret.Geolocation"]), t.Geolocation = t.web.WebGeolocation
    }(e = t.web || (t.web = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        var i = function (e) {
            function i() {
                var i = this;
                e.apply(this, arguments), this.onChange = function (e) {
                    var n = new t.MotionEvent(t.Event.CHANGE),
                        s = {x: e.acceleration.x, y: e.acceleration.y, z: e.acceleration.z}, a = {
                            x: e.accelerationIncludingGravity.x,
                            y: e.accelerationIncludingGravity.y,
                            z: e.accelerationIncludingGravity.z
                        }, r = {alpha: e.rotationRate.alpha, beta: e.rotationRate.beta, gamma: e.rotationRate.gamma};
                    n.acceleration = s, n.accelerationIncludingGravity = a, n.rotationRate = r, i.dispatchEvent(n)
                }
            }

            __extends(i, e);
            var n = i, s = n.prototype;
            return s.start = function () {
                window.addEventListener("devicemotion", this.onChange)
            }, s.stop = function () {
                window.removeEventListener("devicemotion", this.onChange)
            }, i
        }(t.EventDispatcher);
        e.WebMotion = i, t.registerClass(i, "egret.web.WebMotion", ["egret.Motion"]), t.Motion = t.web.WebMotion
    }(e = t.web || (t.web = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (t) {
    }(e = t.web || (t.web = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function (t) {
        function e(e, i, n) {
            t.call(this), this._name = e, this._frame = 0 | i, n && (this._end = 0 | n)
        }

        __extends(e, t);
        var i = __define, n = e, s = n.prototype;
        return i(s, "name", function () {
            return this._name
        }), i(s, "frame", function () {
            return this._frame
        }), i(s, "end", function () {
            return this._end
        }), s.clone = function () {
            return new e(this._name, this._frame, this._end)
        }, e
    }(t.EventDispatcher);
    t.FrameLabel = e, t.registerClass(e, "egret.FrameLabel")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function (e) {
        function i(i) {
            e.call(this), this.$bitmapData = null, this.offsetPoint = t.Point.create(0, 0), this.$movieClipData = null, this.frames = null, this.$totalFrames = 0, this.frameLabels = null, this.$frameLabelStart = 0, this.$frameLabelEnd = 0, this.frameEvents = null, this.frameIntervalTime = 0, this.$eventPool = null, this.$isPlaying = !1, this.isStopped = !0, this.playTimes = 0, this.$currentFrameNum = 0, this.$nextFrameNum = 0, this.displayedKeyFrameNum = 0, this.passedTime = 0, this.lastTime = 0, this.$smoothing = t.Bitmap.defaultSmoothing, this.$renderNode = new t.sys.BitmapNode, this.setMovieClipData(i)
        }

        __extends(i, e);
        var n = __define, s = i, a = s.prototype;
        return n(a, "smoothing", function () {
            return this.$smoothing
        }, function (t) {
            t = !!t, t != this.$smoothing && (this.$smoothing = t, this.$invalidate())
        }), a.$init = function () {
            this.$reset();
            var t = this.$movieClipData;
            t && t.$isDataValid() && (this.frames = t.frames, this.$totalFrames = t.numFrames, this.frameLabels = t.labels, this.frameEvents = t.events, this.frameIntervalTime = 1e3 / t.frameRate, this._initFrame())
        }, a.$reset = function () {
            this.frames = null, this.playTimes = 0, this.$isPlaying = !1, this.setIsStopped(!0), this.$currentFrameNum = 0, this.$nextFrameNum = 1, this.displayedKeyFrameNum = 0, this.passedTime = 0, this.$eventPool = []
        }, a._initFrame = function () {
            this.$movieClipData.$isTextureValid() && (this.advanceFrame(), this.constructFrame())
        }, a.$render = function () {
            var e = this.$bitmapData;
            if (e) {
                var i = Math.round(this.offsetPoint.x), n = Math.round(this.offsetPoint.y), s = e._bitmapWidth,
                    a = e._bitmapHeight, r = e.$getTextureWidth(), o = e.$getTextureHeight(),
                    h = Math.round(e.$getScaleBitmapWidth()), l = Math.round(e.$getScaleBitmapHeight());
                t.Bitmap.$drawImage(this.$renderNode, e._bitmapData, e._bitmapX, e._bitmapY, s, a, i, n, r, o, h, l, null, t.BitmapFillMode.SCALE, this.$smoothing)
            }
        }, a.$measureContentBounds = function (t) {
            var e = this.$bitmapData;
            if (e) {
                var i = this.offsetPoint.x, n = this.offsetPoint.y, s = e.$getTextureWidth(), a = e.$getTextureHeight();
                t.setTo(i, n, s, a)
            } else t.setEmpty()
        }, a.$onAddToStage = function (t, i) {
            e.prototype.$onAddToStage.call(this, t, i), this.$isPlaying && this.$totalFrames > 1 && this.setIsStopped(!1)
        }, a.$onRemoveFromStage = function () {
            e.prototype.$onRemoveFromStage.call(this), this.setIsStopped(!0)
        }, a.getFrameLabelByName = function (t, e) {
            void 0 === e && (e = !1), e && (t = t.toLowerCase());
            var i = this.frameLabels;
            if (i) for (var n = null, s = 0; s < i.length; s++) if (n = i[s], e ? n.name.toLowerCase() == t : n.name == t) return n;
            return null
        }, a.getFrameStartEnd = function (t) {
            var e = this.frameLabels;
            if (e) for (var i = null, n = 0; n < e.length; n++) if (i = e[n], t == i.name) {
                this.$frameLabelStart = i.frame, this.$frameLabelEnd = i.end;
                break
            }
        }, a.getFrameLabelByFrame = function (t) {
            var e = this.frameLabels;
            if (e) for (var i = null, n = 0; n < e.length; n++) if (i = e[n], i.frame == t) return i;
            return null
        }, a.getFrameLabelForFrame = function (t) {
            var e = null, i = null, n = this.frameLabels;
            if (n) for (var s = 0; s < n.length; s++) {
                if (i = n[s], i.frame > t) return e;
                e = i
            }
            return e
        }, a.play = function (t) {
            void 0 === t && (t = 0), this.$isPlaying = !0, this.setPlayTimes(t), this.$totalFrames > 1 && this.$stage && this.setIsStopped(!1)
        }, a.stop = function () {
            this.$isPlaying = !1, this.setIsStopped(!0)
        }, a.prevFrame = function () {
            this.gotoAndStop(this.$currentFrameNum - 1)
        }, a.nextFrame = function () {
            this.gotoAndStop(this.$currentFrameNum + 1)
        }, a.gotoAndPlay = function (e, i) {
            void 0 === i && (i = 0), (0 == arguments.length || arguments.length > 2) && t.$error(1022, "MovieClip.gotoAndPlay()"), "string" == typeof e ? this.getFrameStartEnd(e) : (this.$frameLabelStart = 0, this.$frameLabelEnd = 0), this.play(i), this.gotoFrame(e)
        }, a.gotoAndStop = function (e) {
            1 != arguments.length && t.$error(1022, "MovieClip.gotoAndStop()"), this.stop(), this.gotoFrame(e)
        }, a.gotoFrame = function (e) {
            var i;
            "string" == typeof e ? i = this.getFrameLabelByName(e).frame : (i = parseInt(e + "", 10), i != e && t.$error(1022, "Frame Label Not Found")), 1 > i ? i = 1 : i > this.$totalFrames && (i = this.$totalFrames), i != this.$nextFrameNum && (this.$nextFrameNum = i, this.advanceFrame(), this.constructFrame(), this.handlePendingEvent())
        }, a.advanceTime = function (e) {
            var i = this, n = e - i.lastTime;
            i.lastTime = e;
            var s = i.frameIntervalTime, a = i.passedTime + n;
            i.passedTime = a % s;
            var r = a / s;
            if (1 > r) return !1;
            for (var o; r >= 1;) {
                if (r--, i.$nextFrameNum++, o = this.frameEvents[i.$nextFrameNum], o && "" != o && t.MovieClipEvent.dispatchMovieClipEvent(i, t.MovieClipEvent.FRAME_LABEL, o), i.$nextFrameNum > i.$totalFrames || i.$frameLabelStart > 0 && i.$nextFrameNum > i.$frameLabelEnd) if (-1 == i.playTimes) i.$eventPool.push(t.Event.LOOP_COMPLETE), i.$nextFrameNum = 1; else {
                    if (i.playTimes--, !(i.playTimes > 0)) {
                        i.$nextFrameNum = i.$totalFrames, i.$eventPool.push(t.Event.COMPLETE), i.stop();
                        break
                    }
                    i.$eventPool.push(t.Event.LOOP_COMPLETE), i.$nextFrameNum = 1
                }
                i.$currentFrameNum == i.$frameLabelEnd && (i.$nextFrameNum = i.$frameLabelStart), i.advanceFrame()
            }
            return i.constructFrame(), i.handlePendingEvent(), !1
        }, a.advanceFrame = function () {
            this.$currentFrameNum = this.$nextFrameNum
        }, a.constructFrame = function () {
            var t = this.$currentFrameNum;
            this.displayedKeyFrameNum != t && (this.$bitmapData = this.$movieClipData.getTextureByFrame(t), this.$movieClipData.$getOffsetByFrame(t, this.offsetPoint), this.$invalidateContentBounds(), this.displayedKeyFrameNum = t)
        }, a.handlePendingEvent = function () {
            if (0 != this.$eventPool.length) {
                this.$eventPool.reverse();
                for (var e = this.$eventPool, i = e.length, n = !1, s = !1, a = 0; i > a; a++) {
                    var r = e.pop();
                    r == t.Event.LOOP_COMPLETE ? s = !0 : r == t.Event.COMPLETE ? n = !0 : this.dispatchEventWith(r)
                }
                s && this.dispatchEventWith(t.Event.LOOP_COMPLETE), n && this.dispatchEventWith(t.Event.COMPLETE)
            }
        }, n(a, "totalFrames", function () {
            return this.$totalFrames
        }), n(a, "currentFrame", function () {
            return this.$currentFrameNum
        }), n(a, "currentFrameLabel", function () {
            var t = this.getFrameLabelByFrame(this.$currentFrameNum);
            return t && t.name
        }), n(a, "currentLabel", function () {
            var t = this.getFrameLabelForFrame(this.$currentFrameNum);
            return t ? t.name : null
        }), n(a, "frameRate", function () {
            return this.$movieClipData.frameRate
        }, function (t) {
            t != this.$movieClipData.frameRate && (this.$movieClipData.frameRate = t, this.frameIntervalTime = 1e3 / this.$movieClipData.frameRate)
        }), n(a, "isPlaying", function () {
            return this.$isPlaying
        }), n(a, "movieClipData", function () {
            return this.$movieClipData
        }, function (t) {
            this.setMovieClipData(t)
        }), a.setMovieClipData = function (t) {
            this.$movieClipData != t && (this.$movieClipData = t, this.$init())
        }, a.setPlayTimes = function (t) {
            (0 > t || t >= 1) && (this.playTimes = 0 > t ? -1 : Math.floor(t))
        }, a.setIsStopped = function (e) {
            this.isStopped != e && (this.isStopped = e, e ? (this.playTimes = 0, t.sys.$ticker.$stopTick(this.advanceTime, this)) : (this.playTimes = 0 == this.playTimes ? 1 : this.playTimes, this.lastTime = t.getTimer(), t.sys.$ticker.$startTick(this.advanceTime, this)))
        }, i
    }(t.DisplayObject);
    t.MovieClip = e, t.registerClass(e, "egret.MovieClip")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function (e) {
        function i() {
            e.call(this), this.$mcData = null, this.numFrames = 1, this.frames = [], this.labels = null, this.events = [], this.frameRate = 0, this.textureData = null, this.spriteSheet = null
        }

        __extends(i, e);
        var n = __define, s = i, a = s.prototype;
        return a.$init = function (t, e, i) {
            this.textureData = e, this.spriteSheet = i, this.setMCData(t)
        }, a.getKeyFrameData = function (t) {
            var e = this.frames[t - 1];
            return e.frame && (e = this.frames[e.frame - 1]), e
        }, a.getTextureByFrame = function (t) {
            var e = this.getKeyFrameData(t);
            if (e.res) {
                var i = this.getTextureByResName(e.res);
                return i
            }
            return null
        }, a.$getOffsetByFrame = function (t, e) {
            var i = this.getKeyFrameData(t);
            i.res && e.setTo(0 | i.x, 0 | i.y)
        }, a.getTextureByResName = function (t) {
            var e = this.spriteSheet.getTexture(t);
            if (!e) {
                var i = this.textureData[t];
                e = this.spriteSheet.createTexture(t, i.x, i.y, i.w, i.h)
            }
            return e
        }, a.$isDataValid = function () {
            return this.frames.length > 0
        }, a.$isTextureValid = function () {
            return null != this.textureData && null != this.spriteSheet
        }, a.$fillMCData = function (t) {
            this.frameRate = t.frameRate || 24, this.fillFramesData(t.frames), this.fillFrameLabelsData(t.labels), this.fillFrameEventsData(t.events)
        }, a.fillFramesData = function (t) {
            for (var e, i = this.frames, n = t ? t.length : 0, s = 0; n > s; s++) {
                var a = t[s];
                if (i.push(a), a.duration) {
                    var r = parseInt(a.duration);
                    if (r > 1) {
                        e = i.length;
                        for (var o = 1; r > o; o++) i.push({frame: e})
                    }
                }
            }
            this.numFrames = i.length
        }, a.fillFrameLabelsData = function (e) {
            if (e) {
                var i = e.length;
                if (i > 0) {
                    this.labels = [];
                    for (var n = 0; i > n; n++) {
                        var s = e[n];
                        this.labels.push(new t.FrameLabel(s.name, s.frame, s.end))
                    }
                }
            }
        }, a.fillFrameEventsData = function (t) {
            if (t) {
                var e = t.length;
                if (e > 0) {
                    this.events = [];
                    for (var i = 0; e > i; i++) {
                        var n = t[i];
                        this.events[n.frame] = n.name
                    }
                }
            }
        }, n(a, "mcData", function () {
            return this.$mcData
        }, function (t) {
            this.setMCData(t)
        }), a.setMCData = function (t) {
            this.$mcData != t && (this.$mcData = t, t && this.$fillMCData(t))
        }, i
    }(t.HashObject);
    t.MovieClipData = e, t.registerClass(e, "egret.MovieClipData")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function (e) {
        function i(t, i) {
            e.call(this), this.enableCache = !0, this.$mcDataCache = {}, this.$mcDataSet = t, this.setTexture(i)
        }

        __extends(i, e);
        var n = __define, s = i, a = s.prototype;
        return a.clearCache = function () {
            this.$mcDataCache = {}
        }, a.generateMovieClipData = function (e) {
            if (void 0 === e && (e = ""), "" == e && this.$mcDataSet) for (e in this.$mcDataSet.mc) break;
            if ("" == e) return null;
            var i = this.findFromCache(e, this.$mcDataCache);
            return i || (i = new t.MovieClipData, this.fillData(e, i, this.$mcDataCache)), i
        }, a.findFromCache = function (t, e) {
            return this.enableCache && e[t] ? e[t] : null
        }, a.fillData = function (t, e, i) {
            if (this.$mcDataSet) {
                var n = this.$mcDataSet.mc[t];
                n && (e.$init(n, this.$mcDataSet.res, this.$spriteSheet), this.enableCache && (i[t] = e))
            }
        }, n(a, "mcDataSet", function () {
            return this.$mcDataSet
        }, function (t) {
            this.$mcDataSet = t
        }), n(a, "texture", void 0, function (t) {
            this.setTexture(t)
        }), n(a, "spriteSheet", function () {
            return this.$spriteSheet
        }), a.setTexture = function (e) {
            this.$spriteSheet = e ? new t.SpriteSheet(e) : null
        }, i
    }(t.EventDispatcher);
    t.MovieClipDataFactory = e, t.registerClass(e, "egret.MovieClipDataFactory")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function (e) {
        function i(t, i, n, s) {
            void 0 === i && (i = !1), void 0 === n && (n = !1), void 0 === s && (s = null), e.call(this, t, i, n), this.frameLabel = null, this.frameLabel = s
        }

        __extends(i, e);
        var n = i;
        return n.prototype, i.dispatchMovieClipEvent = function (e, n, s) {
            void 0 === s && (s = null);
            var a = t.Event.create(i, n);
            a.frameLabel = s;
            var r = e.dispatchEvent(a);
            return t.Event.release(a), r
        }, i.FRAME_LABEL = "frame_label", i
    }(t.Event);
    t.MovieClipEvent = e, t.registerClass(e, "egret.MovieClipEvent")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function () {
        function e() {
            t.$error(1014)
        }

        var i = e;
        return i.prototype, e.get = function (t) {
            return -1 > t && (t = -1), t > 1 && (t = 1), function (e) {
                return 0 == t ? e : 0 > t ? e * (e * -t + 1 + t) : e * ((2 - e) * t + (1 - t))
            }
        }, e.getPowOut = function (t) {
            return function (e) {
                return 1 - Math.pow(1 - e, t)
            }
        }, e.quintOut = e.getPowOut(5), e.quartOut = e.getPowOut(4), e
    }();
    t.ScrollEase = e, t.registerClass(e, "egret.ScrollEase");
    var i = function (e) {
        function i(t, i, n) {
            e.call(this), this._target = null, this._useTicks = !1, this.ignoreGlobalPause = !1, this.loop = !1, this.pluginData = null, this._steps = null, this._actions = null, this.paused = !1, this.duration = 0, this._prevPos = -1, this.position = null, this._prevPosition = 0, this._stepPosition = 0, this.passive = !1, this.initialize(t, i, n)
        }

        __extends(i, e);
        var n = i, s = n.prototype;
        return i.get = function (t, e, n, s) {
            return void 0 === e && (e = null), void 0 === n && (n = null), void 0 === s && (s = !1), s && i.removeTweens(t), new i(t, e, n)
        }, i.removeTweens = function (t) {
            if (t.tween_count) {
                for (var e = i._tweens, n = e.length - 1; n >= 0; n--) e[n]._target == t && (e[n].paused = !0, e.splice(n, 1));
                t.tween_count = 0
            }
        }, i.tick = function (t, e) {
            void 0 === e && (e = !1);
            var n = t - i._lastTime;
            i._lastTime = t;
            for (var s = i._tweens.concat(), a = s.length - 1; a >= 0; a--) {
                var r = s[a];
                e && !r.ignoreGlobalPause || r.paused || r.tick(r._useTicks ? 1 : n)
            }
            return !1
        }, i._register = function (e, n) {
            var s = e._target, a = i._tweens;
            if (n) s && (s.tween_count = s.tween_count > 0 ? s.tween_count + 1 : 1), a.push(e), i._inited || (i._lastTime = t.getTimer(), t.sys.$ticker.$startTick(i.tick, null), i._inited = !0); else {
                s && s.tween_count--;
                for (var r = a.length; r--;) if (a[r] == e) return void a.splice(r, 1)
            }
        }, s.initialize = function (t, e, n) {
            this._target = t, e && (this._useTicks = e.useTicks, this.ignoreGlobalPause = e.ignoreGlobalPause, this.loop = e.loop, e.onChange && this.addEventListener("change", e.onChange, e.onChangeObj), e.override && i.removeTweens(t)), this.pluginData = n || {}, this._curQueueProps = {}, this._initQueueProps = {}, this._steps = [], this._actions = [], e && e.paused ? this.paused = !0 : i._register(this, !0), e && null != e.position && this.setPosition(e.position)
        }, s.setPosition = function (t, e) {
            void 0 === e && (e = 1), 0 > t && (t = 0);
            var i = t, n = !1;
            if (i >= this.duration && (this.loop ? i %= this.duration : (i = this.duration, n = !0)), i == this._prevPos) return n;
            var s = this._prevPos;
            if (this.position = this._prevPos = i, this._prevPosition = t, this._target) if (n) this._updateTargetProps(null, 1); else if (this._steps.length > 0) {
                for (var a = 0, r = this._steps.length; r > a && !(this._steps[a].t > i); a++) ;
                var o = this._steps[a - 1];
                this._updateTargetProps(o, (this._stepPosition = i - o.t) / o.d)
            }
            return n && this.setPaused(!0), 0 != e && this._actions.length > 0 && (this._useTicks ? this._runActions(i, i) : 1 == e && s > i ? (s != this.duration && this._runActions(s, this.duration), this._runActions(0, i, !0)) : this._runActions(s, i)), this.dispatchEventWith("change"), n
        }, s._runActions = function (t, e, i) {
            void 0 === i && (i = !1);
            var n = t, s = e, a = -1, r = this._actions.length, o = 1;
            for (t > e && (n = e, s = t, a = r, r = o = -1); (a += o) != r;) {
                var h = this._actions[a], l = h.t;
                (l == s || l > n && s > l || i && l == t) && h.f.apply(h.o, h.p)
            }
        }, s._updateTargetProps = function (t, e) {
            var n, s, a, r, o, h;
            if (t || 1 != e) {
                if (this.passive = !!t.v, this.passive) return;
                t.e && (e = t.e(e, 0, 1, 1)), n = t.p0, s = t.p1
            } else this.passive = !1, n = s = this._curQueueProps;
            for (var l in this._initQueueProps) {
                null == (r = n[l]) && (n[l] = r = this._initQueueProps[l]), null == (o = s[l]) && (s[l] = o = r), a = r == o || 0 == e || 1 == e || "number" != typeof r ? 1 == e ? o : r : r + (o - r) * e;
                var u = !1;
                if (h = i._plugins[l]) for (var c = 0, d = h.length; d > c; c++) {
                    var f = h[c].tween(this, l, a, n, s, e, !!t && n == s, !t);
                    f == i.IGNORE ? u = !0 : a = f
                }
                u || (this._target[l] = a)
            }
        }, s.setPaused = function (t) {
            return this.paused = t, i._register(this, !t), this
        }, s._cloneProps = function (t) {
            var e = {};
            for (var i in t) e[i] = t[i];
            return e
        }, s._addStep = function (t) {
            return t.d > 0 && (this._steps.push(t), t.t = this.duration, this.duration += t.d), this
        }, s._appendQueueProps = function (t) {
            var e, n, s, a, r;
            for (var o in t) if (void 0 === this._initQueueProps[o]) {
                if (n = this._target[o], e = i._plugins[o]) for (s = 0, a = e.length; a > s; s++) n = e[s].init(this, o, n);
                this._initQueueProps[o] = this._curQueueProps[o] = void 0 === n ? null : n
            } else n = this._curQueueProps[o];
            for (var o in t) {
                if (n = this._curQueueProps[o], e = i._plugins[o]) for (r = r || {}, s = 0, a = e.length; a > s; s++) e[s].step && e[s].step(this, o, n, t[o], r);
                this._curQueueProps[o] = t[o]
            }
            return r && this._appendQueueProps(r), this._curQueueProps
        }, s._addAction = function (t) {
            return t.t = this.duration, this._actions.push(t), this
        }, s.to = function (t, e, i) {
            return void 0 === i && (i = void 0), (isNaN(e) || 0 > e) && (e = 0), this._addStep({
                d: e || 0,
                p0: this._cloneProps(this._curQueueProps),
                e: i,
                p1: this._cloneProps(this._appendQueueProps(t))
            })
        }, s.call = function (t, e, i) {
            return void 0 === e && (e = void 0), void 0 === i && (i = void 0), this._addAction({
                f: t,
                p: i ? i : [],
                o: e ? e : this._target
            })
        }, s.tick = function (t) {
            this.paused || this.setPosition(this._prevPosition + t)
        }, i._tweens = [], i.IGNORE = {}, i._plugins = {}, i._inited = !1, i._lastTime = 0, i
    }(t.EventDispatcher);
    t.ScrollTween = i, t.registerClass(i, "egret.ScrollTween")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function (e) {
        function i(i) {
            void 0 === i && (i = null), e.call(this), this.scrollBeginThreshold = 10, this.scrollSpeed = 1, this._content = null, this.delayTouchBeginEvent = null, this.touchBeginTimer = null, this.touchEnabled = !0, this._ScrV_Props_ = new t.ScrollViewProperties, i && this.setContent(i)
        }

        __extends(i, e);
        var n = __define, s = i, a = s.prototype;
        return n(a, "bounces", function () {
            return this._ScrV_Props_._bounces
        }, function (t) {
            this._ScrV_Props_._bounces = !!t
        }), a.setContent = function (t) {
            this._content !== t && (this.removeContent(), t && (this._content = t, e.prototype.addChild.call(this, t), this._addEvents()))
        }, a.removeContent = function () {
            this._content && (this._removeEvents(), e.prototype.removeChildAt.call(this, 0)), this._content = null
        }, n(a, "verticalScrollPolicy", function () {
            return this._ScrV_Props_._verticalScrollPolicy
        }, function (t) {
            t != this._ScrV_Props_._verticalScrollPolicy && (this._ScrV_Props_._verticalScrollPolicy = t)
        }), n(a, "horizontalScrollPolicy", function () {
            return this._ScrV_Props_._horizontalScrollPolicy
        }, function (t) {
            t != this._ScrV_Props_._horizontalScrollPolicy && (this._ScrV_Props_._horizontalScrollPolicy = t)
        }), n(a, "scrollLeft", function () {
            return this._ScrV_Props_._scrollLeft
        }, function (t) {
            t != this._ScrV_Props_._scrollLeft && (this._ScrV_Props_._scrollLeft = t, this._validatePosition(!1, !0), this._updateContentPosition())
        }), n(a, "scrollTop", function () {
            return this._ScrV_Props_._scrollTop
        }, function (t) {
            t != this._ScrV_Props_._scrollTop && (this._ScrV_Props_._scrollTop = t, this._validatePosition(!0, !1), this._updateContentPosition())
        }), a.setScrollPosition = function (t, e, i) {
            if (void 0 === i && (i = !1), (!i || 0 != t || 0 != e) && (i || this._ScrV_Props_._scrollTop != t || this._ScrV_Props_._scrollLeft != e)) {
                var n = this._ScrV_Props_._scrollTop, s = this._ScrV_Props_._scrollLeft;
                if (i) {
                    var a = this.getMaxScrollLeft(), r = this.getMaxScrollTop();
                    (0 >= n || n >= r) && (t /= 2), (0 >= s || s >= a) && (e /= 2);
                    var o = n + t, h = s + e, l = this._ScrV_Props_._bounces;
                    l || ((0 >= o || o >= r) && (o = Math.max(0, Math.min(o, r))), (0 >= h || h >= a) && (h = Math.max(0, Math.min(h, a)))), this._ScrV_Props_._scrollTop = o, this._ScrV_Props_._scrollLeft = h
                } else this._ScrV_Props_._scrollTop = t, this._ScrV_Props_._scrollLeft = e;
                this._validatePosition(!0, !0), this._updateContentPosition()
            }
        }, a._validatePosition = function (t, e) {
            if (void 0 === t && (t = !1), void 0 === e && (e = !1), t) {
                var i = this.height, n = this._getContentHeight();
                this._ScrV_Props_._scrollTop = Math.max(this._ScrV_Props_._scrollTop, (0 - i) / 2), this._ScrV_Props_._scrollTop = Math.min(this._ScrV_Props_._scrollTop, n > i ? n - i / 2 : i / 2)
            }
            if (e) {
                var s = this.width, a = this._getContentWidth();
                this._ScrV_Props_._scrollLeft = Math.max(this._ScrV_Props_._scrollLeft, (0 - s) / 2), this._ScrV_Props_._scrollLeft = Math.min(this._ScrV_Props_._scrollLeft, a > s ? a - s / 2 : s / 2)
            }
        }, a.$setWidth = function (t) {
            if (this.$getExplicitWidth() == t) return !1;
            var i = e.prototype.$setWidth.call(this, t);
            return this._updateContentPosition(), i
        }, a.$setHeight = function (t) {
            return this.$getExplicitHeight() != t && (e.prototype.$setHeight.call(this, t), this._updateContentPosition(), !0)
        }, a._updateContentPosition = function () {
            var e = this.height, i = this.width;
            this.scrollRect = new t.Rectangle(Math.round(this._ScrV_Props_._scrollLeft), Math.round(this._ScrV_Props_._scrollTop), i, e), this.dispatchEvent(new t.Event(t.Event.CHANGE))
        }, a._checkScrollPolicy = function () {
            var t = this._ScrV_Props_._horizontalScrollPolicy,
                e = this.__checkScrollPolicy(t, this._getContentWidth(), this.width);
            this._ScrV_Props_._hCanScroll = e;
            var i = this._ScrV_Props_._verticalScrollPolicy,
                n = this.__checkScrollPolicy(i, this._getContentHeight(), this.height);
            return this._ScrV_Props_._vCanScroll = n, e || n
        }, a.__checkScrollPolicy = function (t, e, i) {
            return "on" == t || "off" != t && e > i
        }, a._addEvents = function () {
            this.addEventListener(t.TouchEvent.TOUCH_BEGIN, this._onTouchBegin, this), this.addEventListener(t.TouchEvent.TOUCH_BEGIN, this._onTouchBeginCapture, this, !0), this.addEventListener(t.TouchEvent.TOUCH_END, this._onTouchEndCapture, this, !0)
        }, a._removeEvents = function () {
            this.removeEventListener(t.TouchEvent.TOUCH_BEGIN, this._onTouchBegin, this), this.removeEventListener(t.TouchEvent.TOUCH_BEGIN, this._onTouchBeginCapture, this, !0), this.removeEventListener(t.TouchEvent.TOUCH_END, this._onTouchEndCapture, this, !0)
        }, a._onTouchBegin = function (e) {
            if (!e.$isDefaultPrevented) {
                var i = this._checkScrollPolicy();
                i && (this._ScrV_Props_._touchStartPosition.x = e.stageX, this._ScrV_Props_._touchStartPosition.y = e.stageY, (this._ScrV_Props_._isHTweenPlaying || this._ScrV_Props_._isVTweenPlaying) && this._onScrollFinished(), this._tempStage = this.stage, this._tempStage.addEventListener(t.TouchEvent.TOUCH_MOVE, this._onTouchMove, this), this._tempStage.addEventListener(t.TouchEvent.TOUCH_END, this._onTouchEnd, this), this._tempStage.addEventListener(t.TouchEvent.LEAVE_STAGE, this._onTouchEnd, this), this.addEventListener(t.Event.ENTER_FRAME, this._onEnterFrame, this), this._logTouchEvent(e), e.preventDefault())
            }
        }, a._onTouchBeginCapture = function (e) {
            var i = this._checkScrollPolicy();
            if (i) {
                for (var n = e.target; n != this;) {
                    if ("_checkScrollPolicy" in n && (i = n._checkScrollPolicy())) return;
                    n = n.parent
                }
                e.stopPropagation();
                var s = this.cloneTouchEvent(e);
                this.delayTouchBeginEvent = s, this.touchBeginTimer || (this.touchBeginTimer = new t.Timer(100, 1), this.touchBeginTimer.addEventListener(t.TimerEvent.TIMER_COMPLETE, this._onTouchBeginTimer, this)), this.touchBeginTimer.start(), this._onTouchBegin(e)
            }
        }, a._onTouchEndCapture = function (e) {
            var i = this;
            if (this.delayTouchBeginEvent) {
                this._onTouchBeginTimer(), e.stopPropagation();
                var n = this.cloneTouchEvent(e);
                t.callLater(function () {
                    i.stage && i.dispatchPropagationEvent(n)
                }, this)
            }
        }, a._onTouchBeginTimer = function () {
            this.touchBeginTimer.stop();
            var t = this.delayTouchBeginEvent;
            this.delayTouchBeginEvent = null, this.stage && this.dispatchPropagationEvent(t)
        }, a.dispatchPropagationEvent = function (e) {
            for (var i = e.$target, n = this.$getPropagationList(i), s = n.length, a = .5 * n.length, r = -1, o = 0; s > o; o++) if (n[o] === this._content) {
                r = o;
                break
            }
            n.splice(0, r + 1), a -= r + 1, this.$dispatchPropagationEvent(e, n, a), t.Event.release(e)
        }, a._onTouchMove = function (t) {
            if (this._ScrV_Props_._lastTouchPosition.x != t.stageX || this._ScrV_Props_._lastTouchPosition.y != t.stageY) {
                if (!this._ScrV_Props_._scrollStarted) {
                    var e = t.stageX - this._ScrV_Props_._touchStartPosition.x,
                        i = t.stageY - this._ScrV_Props_._touchStartPosition.y, n = Math.sqrt(e * e + i * i);
                    if (n < this.scrollBeginThreshold) return void this._logTouchEvent(t)
                }
                this._ScrV_Props_._scrollStarted = !0, this.delayTouchBeginEvent && (this.delayTouchBeginEvent = null, this.touchBeginTimer.stop()), this.touchChildren = !1;
                var s = this._getPointChange(t);
                this.setScrollPosition(s.y, s.x, !0), this._calcVelocitys(t), this._logTouchEvent(t)
            }
        }, a._onTouchEnd = function (e) {
            this.touchChildren = !0, this._ScrV_Props_._scrollStarted = !1, this._tempStage.removeEventListener(t.TouchEvent.TOUCH_MOVE, this._onTouchMove, this), this._tempStage.removeEventListener(t.TouchEvent.TOUCH_END, this._onTouchEnd, this), this._tempStage.removeEventListener(t.TouchEvent.LEAVE_STAGE, this._onTouchEnd, this), this.removeEventListener(t.Event.ENTER_FRAME, this._onEnterFrame, this), this._moveAfterTouchEnd()
        }, a._onEnterFrame = function (e) {
            var i = t.getTimer();
            i - this._ScrV_Props_._lastTouchTime > 100 && i - this._ScrV_Props_._lastTouchTime < 300 && this._calcVelocitys(this._ScrV_Props_._lastTouchEvent)
        }, a._logTouchEvent = function (e) {
            this._ScrV_Props_._lastTouchPosition.x = e.stageX, this._ScrV_Props_._lastTouchPosition.y = e.stageY, this._ScrV_Props_._lastTouchEvent = this.cloneTouchEvent(e), this._ScrV_Props_._lastTouchTime = t.getTimer()
        }, a._getPointChange = function (t) {
            return {
                x: this._ScrV_Props_._hCanScroll === !1 ? 0 : this._ScrV_Props_._lastTouchPosition.x - t.stageX,
                y: this._ScrV_Props_._vCanScroll === !1 ? 0 : this._ScrV_Props_._lastTouchPosition.y - t.stageY
            }
        }, a._calcVelocitys = function (e) {
            var i = t.getTimer();
            if (0 == this._ScrV_Props_._lastTouchTime) return void(this._ScrV_Props_._lastTouchTime = i);
            var n = this._getPointChange(e), s = i - this._ScrV_Props_._lastTouchTime;
            n.x /= s, n.y /= s, this._ScrV_Props_._velocitys.push(n), this._ScrV_Props_._velocitys.length > 5 && this._ScrV_Props_._velocitys.shift(), this._ScrV_Props_._lastTouchPosition.x = e.stageX, this._ScrV_Props_._lastTouchPosition.y = e.stageY
        }, a._getContentWidth = function () {
            return this._content.$getExplicitWidth() || this._content.width
        }, a._getContentHeight = function () {
            return this._content.$getExplicitHeight() || this._content.height
        }, a.getMaxScrollLeft = function () {
            var t = this._getContentWidth() - this.width;
            return Math.max(0, t)
        }, a.getMaxScrollTop = function () {
            var t = this._getContentHeight() - this.height;
            return Math.max(0, t)
        }, a._moveAfterTouchEnd = function () {
            if (0 != this._ScrV_Props_._velocitys.length) {
                for (var t = {x: 0, y: 0}, e = 0, n = 0; n < this._ScrV_Props_._velocitys.length; n++) {
                    var s = this._ScrV_Props_._velocitys[n], a = i.weight[n];
                    t.x += s.x * a, t.y += s.y * a, e += a
                }
                this._ScrV_Props_._velocitys.length = 0, this.scrollSpeed <= 0 && (this.scrollSpeed = 1);
                var r = t.x / e * this.scrollSpeed, o = t.y / e * this.scrollSpeed, h = Math.abs(r), l = Math.abs(o),
                    u = this.getMaxScrollLeft(), c = this.getMaxScrollTop(),
                    d = h > .02 ? this.getAnimationDatas(r, this._ScrV_Props_._scrollLeft, u) : {
                        position: this._ScrV_Props_._scrollLeft,
                        duration: 1
                    }, f = l > .02 ? this.getAnimationDatas(o, this._ScrV_Props_._scrollTop, c) : {
                        position: this._ScrV_Props_._scrollTop,
                        duration: 1
                    };
                this.setScrollLeft(d.position, d.duration), this.setScrollTop(f.position, f.duration)
            }
        }, a.onTweenFinished = function (t) {
            t == this._ScrV_Props_._vScrollTween && (this._ScrV_Props_._isVTweenPlaying = !1), t == this._ScrV_Props_._hScrollTween && (this._ScrV_Props_._isHTweenPlaying = !1), 0 == this._ScrV_Props_._isHTweenPlaying && 0 == this._ScrV_Props_._isVTweenPlaying && this._onScrollFinished()
        }, a._onScrollStarted = function () {
        }, a._onScrollFinished = function () {
            t.ScrollTween.removeTweens(this), this._ScrV_Props_._hScrollTween = null, this._ScrV_Props_._vScrollTween = null, this._ScrV_Props_._isHTweenPlaying = !1, this._ScrV_Props_._isVTweenPlaying = !1, this.dispatchEvent(new t.Event(t.Event.COMPLETE))
        }, a.setScrollTop = function (e, i) {
            void 0 === i && (i = 0);
            var n = Math.min(this.getMaxScrollTop(), Math.max(e, 0));
            if (0 == i) return void(this.scrollTop = n);
            0 == this._ScrV_Props_._bounces && (e = n);
            var s = t.ScrollTween.get(this).to({scrollTop: e}, i, t.ScrollEase.quartOut);
            n != e && s.to({scrollTop: n}, 300, t.ScrollEase.quintOut), this._ScrV_Props_._isVTweenPlaying = !0, this._ScrV_Props_._vScrollTween = s, s.call(this.onTweenFinished, this, [s]), this._ScrV_Props_._isHTweenPlaying || this._onScrollStarted()
        }, a.setScrollLeft = function (e, i) {
            void 0 === i && (i = 0);
            var n = Math.min(this.getMaxScrollLeft(), Math.max(e, 0));
            if (0 == i) return void(this.scrollLeft = n);
            0 == this._ScrV_Props_._bounces && (e = n);
            var s = t.ScrollTween.get(this).to({scrollLeft: e}, i, t.ScrollEase.quartOut);
            n != e && s.to({scrollLeft: n}, 300, t.ScrollEase.quintOut), this._ScrV_Props_._isHTweenPlaying = !0, this._ScrV_Props_._hScrollTween = s, s.call(this.onTweenFinished, this, [s]), this._ScrV_Props_._isVTweenPlaying || this._onScrollStarted()
        }, a.getAnimationDatas = function (t, e, i) {
            var n = Math.abs(t), s = .95, a = 0, r = .998, o = .02, h = e + 500 * t;
            if (0 > h || h > i) for (h = e; Math.abs(t) != 1 / 0 && Math.abs(t) > o;) h += t, t *= 0 > h || h > i ? r * s : r, a++; else a = 500 * -Math.log(o / n);
            var l = {position: Math.min(i + 50, Math.max(h, -50)), duration: a};
            return l
        }, a.cloneTouchEvent = function (e) {
            var i = new t.TouchEvent(e.type, e.bubbles, e.cancelable);
            return i.touchPointID = e.touchPointID, i.$stageX = e.stageX, i.$stageY = e.stageY, i.touchDown = e.touchDown, i.$isDefaultPrevented = !1, i.$target = e.target, i
        }, a.throwNotSupportedError = function () {
            t.$error(1023)
        }, a.addChild = function (t) {
            return this.throwNotSupportedError(), null
        }, a.addChildAt = function (t, e) {
            return this.throwNotSupportedError(), null
        }, a.removeChild = function (t) {
            return this.throwNotSupportedError(), null
        }, a.removeChildAt = function (t) {
            return this.throwNotSupportedError(), null
        }, a.setChildIndex = function (t, e) {
            this.throwNotSupportedError()
        }, a.swapChildren = function (t, e) {
            this.throwNotSupportedError()
        }, a.swapChildrenAt = function (t, e) {
            this.throwNotSupportedError()
        }, i.weight = [1, 1.33, 1.66, 2, 2.33], i
    }(t.DisplayObjectContainer);
    t.ScrollView = e, t.registerClass(e, "egret.ScrollView")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function () {
        function e() {
            this._verticalScrollPolicy = "auto", this._horizontalScrollPolicy = "auto", this._scrollLeft = 0, this._scrollTop = 0, this._hCanScroll = !1, this._vCanScroll = !1, this._lastTouchPosition = new t.Point(0, 0), this._touchStartPosition = new t.Point(0, 0), this._scrollStarted = !1, this._lastTouchTime = 0, this._lastTouchEvent = null, this._velocitys = [], this._isHTweenPlaying = !1, this._isVTweenPlaying = !1, this._hScrollTween = null, this._vScrollTween = null, this._bounces = !0
        }

        var i = e;
        return i.prototype, e
    }();
    t.ScrollViewProperties = e, t.registerClass(e, "egret.ScrollViewProperties")
}(egret || (egret = {}));
var egret;
!function (t) {
    function e(e) {
        var i = e.url;
        return -1 == i.indexOf("?") && e.method == t.URLRequestMethod.GET && e.data && e.data instanceof t.URLVariables && (i = i + "?" + e.data.toString()), i
    }

    t.$getUrl = e
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function (e) {
        function i(i) {
            void 0 === i && (i = null), e.call(this), this.dataFormat = t.URLLoaderDataFormat.TEXT, this.data = null, this._request = null, this._status = -1, i && this.load(i)
        }

        __extends(i, e);
        var n = i, s = n.prototype;
        return s.load = function (e) {
            this._request = e, this.data = null, t.NetContext.getNetContext().proceed(this)
        }, s.__recycle = function () {
            this._request = null, this.data = null
        }, i
    }(t.EventDispatcher);
    t.URLLoader = e, t.registerClass(e, "egret.URLLoader")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function () {
        function t() {
        }

        var e = t;
        return e.prototype, t.BINARY = "binary", t.TEXT = "text", t.VARIABLES = "variables", t.TEXTURE = "texture", t.SOUND = "sound", t
    }();
    t.URLLoaderDataFormat = e, t.registerClass(e, "egret.URLLoaderDataFormat")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function (e) {
        function i(i) {
            void 0 === i && (i = null), e.call(this), this.data = null, this.method = t.URLRequestMethod.GET, this.url = "", this.requestHeaders = [], this.url = i
        }

        __extends(i, e);
        var n = i;
        return n.prototype, i
    }(t.HashObject);
    t.URLRequest = e, t.registerClass(e, "egret.URLRequest")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function () {
        function t(t, e) {
            this.name = "", this.value = "", this.name = t, this.value = e
        }

        var e = t;
        return e.prototype, t
    }();
    t.URLRequestHeader = e, t.registerClass(e, "egret.URLRequestHeader")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function () {
        function t() {
        }

        var e = t;
        return e.prototype, t.GET = "get", t.POST = "post", t
    }();
    t.URLRequestMethod = e, t.registerClass(e, "egret.URLRequestMethod")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function (t) {
        function e(e) {
            void 0 === e && (e = null), t.call(this), this.variables = null, null !== e && this.decode(e)
        }

        __extends(e, t);
        var i = e, n = i.prototype;
        return n.decode = function (t) {
            this.variables || (this.variables = {}), t = t.split("+").join(" ");
            for (var e, i = /[?&]?([^=]+)=([^&]*)/g; e = i.exec(t);) {
                var n = decodeURIComponent(e[1]), s = decodeURIComponent(e[2]);
                if (n in this.variables != 0) {
                    var a = this.variables[n];
                    a instanceof Array ? a.push(s) : this.variables[n] = [a, s]
                } else this.variables[n] = s
            }
        }, n.toString = function () {
            if (!this.variables) return "";
            var t = this.variables, e = [];
            for (var i in t) e.push(this.encodeValue(i, t[i]));
            return e.join("&")
        }, n.encodeValue = function (t, e) {
            return e instanceof Array ? this.encodeArray(t, e) : encodeURIComponent(t) + "=" + encodeURIComponent(e)
        }, n.encodeArray = function (t, e) {
            return t ? 0 == e.length ? encodeURIComponent(t) + "=" : e.map(function (e) {
                return encodeURIComponent(t) + "=" + encodeURIComponent(e)
            }).join("&") : ""
        }, e
    }(t.HashObject);
    t.URLVariables = e, t.registerClass(e, "egret.URLVariables")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function (e) {
        function i() {
            e.call(this), this._timeScale = 1, this._paused = !1, this._callIndex = -1, this._lastTime = 0, this.callBackList = [], null != i.instance, t.sys.$ticker.$startTick(this.update, this), this._lastTime = t.getTimer()
        }

        __extends(i, e);
        var n = i, s = n.prototype;
        return s.update = function (t) {
            var e = t - this._lastTime;
            if (this._lastTime = t, this._paused) return !1;
            var i = e * this._timeScale;
            for (this._callList = this.callBackList.concat(), this._callIndex = 0; this._callIndex < this._callList.length; this._callIndex++) {
                var n = this._callList[this._callIndex];
                n.listener.call(n.thisObject, i)
            }
            return this._callIndex = -1, this._callList = null, !1
        }, s.register = function (t, e, i) {
            void 0 === i && (i = 0), this.$insertEventBin(this.callBackList, "", t, e, !1, i, !1)
        }, s.unregister = function (t, e) {
            this.$removeEventBin(this.callBackList, t, e)
        }, s.setTimeScale = function (t) {
            this._timeScale = t
        }, s.getTimeScale = function () {
            return this._timeScale
        }, s.pause = function () {
            this._paused = !0
        }, s.resume = function () {
            this._paused = !1
        }, i.getInstance = function () {
            return null == i.instance && (i.instance = new i), i.instance
        }, i
    }(t.EventDispatcher);
    t.Ticker = e, t.registerClass(e, "egret.Ticker")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function (e) {
        function i() {
            e.call(this)
        }

        __extends(i, e);
        var n = __define, s = i, a = s.prototype;
        return n(a, "stage", function () {
            return t.sys.$TempStage
        }), n(i, "runtimeType", function () {
            return t.$warn(1041), i._runtimeType
        }), a.run = function () {
        }, n(i, "instance", function () {
            return null == i._instance && (i._instance = new i), i._instance
        }), i.deviceType = null, i.DEVICE_PC = "web", i.DEVICE_MOBILE = "native", i.RUNTIME_HTML5 = "runtimeHtml5", i.RUNTIME_NATIVE = "runtimeNative", i
    }(t.EventDispatcher);
    t.MainContext = e, t.registerClass(e, "egret.MainContext")
}(egret || (egret = {}));
var testDeviceType1 = function () {
    if (!this.navigator) return !0;
    var t = navigator.userAgent.toLowerCase();
    return -1 != t.indexOf("mobile") || -1 != t.indexOf("android")
}, testRuntimeType1 = function () {
    return !!this.navigator
};
egret.MainContext.deviceType = testDeviceType1() ? egret.MainContext.DEVICE_MOBILE : egret.MainContext.DEVICE_PC, egret.MainContext._runtimeType = testRuntimeType1() ? egret.MainContext.RUNTIME_HTML5 : egret.MainContext.RUNTIME_NATIVE, delete testDeviceType1, delete testRuntimeType1;
var egret;
!function (t) {
    var e = function (e) {
        function i(t) {
            void 0 === t && (t = 300), e.call(this), this.objectPool = [], this._length = 0, 1 > t && (t = 1), this.autoDisposeTime = t, this.frameCount = 0
        }

        __extends(i, e);
        var n = __define, s = i, a = s.prototype;
        return i.$init = function () {
            t.sys.$ticker.$startTick(i.onUpdate, i)
        }, i.onUpdate = function (t) {
            for (var e = i._callBackList, n = e.length - 1; n >= 0; n--) e[n].$checkFrame();
            return !1
        }, a.$checkFrame = function () {
            this.frameCount--, this.frameCount <= 0 && this.dispose()
        }, n(a, "length", function () {
            return this._length
        }), a.push = function (t) {
            var e = this.objectPool;
            -1 == e.indexOf(t) && (e.push(t), t.__recycle && t.__recycle(), this._length++, 0 == this.frameCount && (this.frameCount = this.autoDisposeTime, i._callBackList.push(this)))
        }, a.pop = function () {
            return 0 == this._length ? null : (this._length--, this.objectPool.pop())
        }, a.dispose = function () {
            this._length > 0 && (this.objectPool = [], this._length = 0), this.frameCount = 0;
            var t = i._callBackList, e = t.indexOf(this);
            -1 != e && t.splice(e, 1)
        }, i._callBackList = [], i
    }(t.HashObject);
    t.Recycler = e, t.registerClass(e, "egret.Recycler"), e.$init()
}(egret || (egret = {}));
var egret;
!function (t) {
    function e(e, i, h) {
        for (var l = [], u = 3; u < arguments.length; u++) l[u - 3] = arguments[u];
        var c = {listener: e, thisObject: i, delay: h, originDelay: h, params: l};
        return r++, 1 == r && (o = t.getTimer(), t.sys.$ticker.$startTick(n, null)), a++, s[a] = c, a
    }

    function i(e) {
        s[e] && (r--, delete s[e], 0 == r && t.sys.$ticker.$stopTick(n, null))
    }

    function n(t) {
        var e = t - o;
        o = t;
        for (var i in s) {
            var n = s[i];
            n.delay -= e, n.delay <= 0 && (n.delay = n.originDelay, n.listener.apply(n.thisObject, n.params))
        }
        return !1
    }

    var s = {}, a = 0, r = 0, o = 0;
    t.setInterval = e, t.clearInterval = i
}(egret || (egret = {}));
var egret;
!function (t) {
    function e(e, i, h) {
        for (var l = [], u = 3; u < arguments.length; u++) l[u - 3] = arguments[u];
        var c = {listener: e, thisObject: i, delay: h, params: l};
        return r++, 1 == r && t.sys.$ticker && (o = t.getTimer(), t.sys.$ticker.$startTick(n, null)), a++, s[a] = c, a
    }

    function i(e) {
        s[e] && (r--, delete s[e], 0 == r && t.sys.$ticker && t.sys.$ticker.$stopTick(n, null))
    }

    function n(t) {
        var e = t - o;
        o = t;
        for (var n in s) {
            var a = n, r = s[a];
            r.delay -= e, r.delay <= 0 && (r.listener.apply(r.thisObject, r.params), i(a))
        }
        return !1
    }

    var s = {}, a = 0, r = 0, o = 0;
    t.setTimeout = e, t.clearTimeout = i
}(egret || (egret = {}));
var egret;
!function (t) {
    var e;
    !function (e) {
        var i = function (e) {
            function i() {
                e.call(this)
            }

            __extends(i, e);
            var n = i, s = n.prototype;
            return s.proceed = function (e) {
                function i(t) {
                    e.dispatchEvent(t)
                }

                function n(t) {
                    a(), e.dispatchEvent(t)
                }

                function s() {
                    switch (a(), e.dataFormat) {
                        case t.URLLoaderDataFormat.VARIABLES:
                            e.data = new t.URLVariables(l.response);
                            break;
                        default:
                            e.data = l.response
                    }
                    window.setTimeout(function () {
                        t.Event.dispatchEvent(e, t.Event.COMPLETE)
                    }, 0)
                }

                function a() {
                    l.removeEventListener(t.Event.COMPLETE, s, r), l.removeEventListener(t.IOErrorEvent.IO_ERROR, n, r), l.removeEventListener(t.ProgressEvent.PROGRESS, i, r)
                }

                var r = this;
                if (e.dataFormat == t.URLLoaderDataFormat.TEXTURE) return void this.loadTexture(e);
                if (e.dataFormat == t.URLLoaderDataFormat.SOUND) return void this.loadSound(e);
                var o = e._request, h = r.getVirtualUrl(t.$getUrl(o)), l = new t.HttpRequest;
                if (l.addEventListener(t.Event.COMPLETE, s, this), l.addEventListener(t.IOErrorEvent.IO_ERROR, n, this), l.addEventListener(t.ProgressEvent.PROGRESS, i, this), l.open(h, o.method), l.responseType = this.getResponseType(e.dataFormat), o.method != t.URLRequestMethod.GET && o.data) if (o.data instanceof t.URLVariables) {
                    l.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    var u = o.data;
                    l.send(u.toString())
                } else l.setRequestHeader("Content-Type", "multipart/form-data"), l.send(o.data); else l.send()
            }, s.getResponseType = function (e) {
                switch (e) {
                    case t.URLLoaderDataFormat.TEXT:
                    case t.URLLoaderDataFormat.VARIABLES:
                        return t.URLLoaderDataFormat.TEXT;
                    case t.URLLoaderDataFormat.BINARY:
                        return "arraybuffer";
                    default:
                        return e
                }
            }, s.loadSound = function (e) {
                function i(t) {
                    e.dispatchEvent(t)
                }

                function n(t) {
                    a(), e.dispatchEvent(t)
                }

                function s(i) {
                    a(), e.data = h, window.setTimeout(function () {
                        e.dispatchEventWith(t.Event.COMPLETE)
                    }, 0)
                }

                function a() {
                    h.removeEventListener(t.Event.COMPLETE, s, r), h.removeEventListener(t.IOErrorEvent.IO_ERROR, n, r), h.removeEventListener(t.ProgressEvent.PROGRESS, i, r)
                }

                var r = this, o = this.getVirtualUrl(e._request.url), h = new t.Sound;
                h.addEventListener(t.Event.COMPLETE, s, r), h.addEventListener(t.IOErrorEvent.IO_ERROR, n, r), h.addEventListener(t.ProgressEvent.PROGRESS, i, r), h.load(o)
            }, s.loadTexture = function (e) {
                function i(t) {
                    e.dispatchEvent(t)
                }

                function n(t) {
                    a(), e.dispatchEvent(t)
                }

                function s(i) {
                    a();
                    var n = h.data;
                    n.setAttribute("bitmapSrc", o);
                    var s = new t.Texture;
                    s._setBitmapData(n), e.data = s, window.setTimeout(function () {
                        e.dispatchEventWith(t.Event.COMPLETE)
                    }, r)
                }

                function a() {
                    h.removeEventListener(t.Event.COMPLETE, s, r), h.removeEventListener(t.IOErrorEvent.IO_ERROR, n, r), h.removeEventListener(t.ProgressEvent.PROGRESS, i, r)
                }

                var r = this, o = this.getVirtualUrl(e._request.url), h = new t.ImageLoader;
                h.addEventListener(t.Event.COMPLETE, s, r), h.addEventListener(t.IOErrorEvent.IO_ERROR, n, r), h.addEventListener(t.ProgressEvent.PROGRESS, i, r), h.load(o)
            }, s.getChangeList = function () {
                return []
            }, s.getVirtualUrl = function (t) {
                return t
            }, i.getNetContext = function () {
                return null == i._instance && (i._instance = new i), i._instance
            }, i
        }(t.HashObject);
        e.HTML5NetContext = i, t.registerClass(i, "egret.web.HTML5NetContext", ["egret.NetContext"]), t.NetContext = i
    }(e = t.web || (t.web = {}))
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function () {
        function e() {
            t.$error(1014)
        }

        var i = e;
        return i.prototype, e.get = function (t) {
            return -1 > t && (t = -1), t > 1 && (t = 1), function (e) {
                return 0 == t ? e : 0 > t ? e * (e * -t + 1 + t) : e * ((2 - e) * t + (1 - t))
            }
        }, e.getPowIn = function (t) {
            return function (e) {
                return Math.pow(e, t)
            }
        }, e.getPowOut = function (t) {
            return function (e) {
                return 1 - Math.pow(1 - e, t)
            }
        }, e.getPowInOut = function (t) {
            return function (e) {
                return (e *= 2) < 1 ? .5 * Math.pow(e, t) : 1 - .5 * Math.abs(Math.pow(2 - e, t))
            }
        }, e.sineIn = function (t) {
            return 1 - Math.cos(t * Math.PI / 2)
        }, e.sineOut = function (t) {
            return Math.sin(t * Math.PI / 2)
        }, e.sineInOut = function (t) {
            return -.5 * (Math.cos(Math.PI * t) - 1)
        }, e.getBackIn = function (t) {
            return function (e) {
                return e * e * ((t + 1) * e - t)
            }
        }, e.getBackOut = function (t) {
            return function (e) {
                return --e * e * ((t + 1) * e + t) + 1
            }
        }, e.getBackInOut = function (t) {
            return t *= 1.525, function (e) {
                return (e *= 2) < 1 ? .5 * (e * e * ((t + 1) * e - t)) : .5 * ((e -= 2) * e * ((t + 1) * e + t) + 2)
            }
        }, e.circIn = function (t) {
            return -(Math.sqrt(1 - t * t) - 1)
        }, e.circOut = function (t) {
            return Math.sqrt(1 - --t * t)
        }, e.circInOut = function (t) {
            return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
        }, e.bounceIn = function (t) {
            return 1 - e.bounceOut(1 - t)
        }, e.bounceOut = function (t) {
            return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
        }, e.bounceInOut = function (t) {
            return .5 > t ? .5 * e.bounceIn(2 * t) : .5 * e.bounceOut(2 * t - 1) + .5
        }, e.getElasticIn = function (t, e) {
            var i = 2 * Math.PI;
            return function (n) {
                if (0 == n || 1 == n) return n;
                var s = e / i * Math.asin(1 / t);
                return -(t * Math.pow(2, 10 * (n -= 1)) * Math.sin((n - s) * i / e))
            }
        }, e.getElasticOut = function (t, e) {
            var i = 2 * Math.PI;
            return function (n) {
                if (0 == n || 1 == n) return n;
                var s = e / i * Math.asin(1 / t);
                return t * Math.pow(2, -10 * n) * Math.sin((n - s) * i / e) + 1
            }
        }, e.getElasticInOut = function (t, e) {
            var i = 2 * Math.PI;
            return function (n) {
                var s = e / i * Math.asin(1 / t);
                return (n *= 2) < 1 ? -.5 * (t * Math.pow(2, 10 * (n -= 1)) * Math.sin((n - s) * i / e)) : t * Math.pow(2, -10 * (n -= 1)) * Math.sin((n - s) * i / e) * .5 + 1
            }
        }, e.quadIn = e.getPowIn(2), e.quadOut = e.getPowOut(2), e.quadInOut = e.getPowInOut(2), e.cubicIn = e.getPowIn(3), e.cubicOut = e.getPowOut(3), e.cubicInOut = e.getPowInOut(3), e.quartIn = e.getPowIn(4), e.quartOut = e.getPowOut(4), e.quartInOut = e.getPowInOut(4), e.quintIn = e.getPowIn(5), e.quintOut = e.getPowOut(5), e.quintInOut = e.getPowInOut(5), e.backIn = e.getBackIn(1.7), e.backOut = e.getBackOut(1.7), e.backInOut = e.getBackInOut(1.7), e.elasticIn = e.getElasticIn(1, .3), e.elasticOut = e.getElasticOut(1, .3), e.elasticInOut = e.getElasticInOut(1, .3 * 1.5), e
    }();
    t.Ease = e, t.registerClass(e, "egret.Ease")
}(egret || (egret = {}));
var egret;
!function (t) {
    var e = function (e) {
        function i(t, i, n) {
            e.call(this), this._target = null, this._useTicks = !1, this.ignoreGlobalPause = !1, this.loop = !1, this.pluginData = null, this._steps = null, this._actions = null, this.paused = !1, this.duration = 0, this._prevPos = -1, this.position = null, this._prevPosition = 0, this._stepPosition = 0, this.passive = !1, this.initialize(t, i, n)
        }

        __extends(i, e);
        var n = i, s = n.prototype;
        return i.get = function (t, e, n, s) {
            return void 0 === e && (e = null), void 0 === n && (n = null), void 0 === s && (s = !1), s && i.removeTweens(t), new i(t, e, n)
        }, i.removeTweens = function (t) {
            if (t.tween_count) {
                for (var e = i._tweens, n = e.length - 1; n >= 0; n--) e[n]._target == t && (e[n].paused = !0, e.splice(n, 1));
                t.tween_count = 0
            }
        }, i.pauseTweens = function (e) {
            if (e.tween_count) for (var i = t.Tween._tweens, n = i.length - 1; n >= 0; n--) i[n]._target == e && (i[n].paused = !0)
        }, i.resumeTweens = function (e) {
            if (e.tween_count) for (var i = t.Tween._tweens, n = i.length - 1; n >= 0; n--) i[n]._target == e && (i[n].paused = !1)
        }, i.tick = function (t, e) {
            void 0 === e && (e = !1);
            var n = t - i._lastTime;
            i._lastTime = t;
            for (var s = i._tweens.concat(), a = s.length - 1; a >= 0; a--) {
                var r = s[a];
                e && !r.ignoreGlobalPause || r.paused || r.tick(r._useTicks ? 1 : n)
            }
            return !1
        }, i._register = function (e, n) {
            var s = e._target, a = i._tweens;
            if (n) s && (s.tween_count = s.tween_count > 0 ? s.tween_count + 1 : 1), a.push(e), i._inited || (i._lastTime = t.getTimer(), t.sys.$ticker.$startTick(i.tick, null), i._inited = !0); else {
                s && s.tween_count--;
                for (var r = a.length; r--;) if (a[r] == e) return void a.splice(r, 1)
            }
        }, i.removeAllTweens = function () {
            for (var t = i._tweens, e = 0, n = t.length; n > e; e++) {
                var s = t[e];
                s.paused = !0, s._target.tweenjs_count = 0
            }
            t.length = 0
        }, s.initialize = function (t, e, n) {
            this._target = t, e && (this._useTicks = e.useTicks, this.ignoreGlobalPause = e.ignoreGlobalPause, this.loop = e.loop, e.onChange && this.addEventListener("change", e.onChange, e.onChangeObj), e.override && i.removeTweens(t)), this.pluginData = n || {}, this._curQueueProps = {}, this._initQueueProps = {}, this._steps = [], this._actions = [], e && e.paused ? this.paused = !0 : i._register(this, !0), e && null != e.position && this.setPosition(e.position, i.NONE)
        }, s.setPosition = function (t, e) {
            void 0 === e && (e = 1), 0 > t && (t = 0);
            var i = t, n = !1;
            if (i >= this.duration && (this.loop ? i %= this.duration : (i = this.duration, n = !0)), i == this._prevPos) return n;
            var s = this._prevPos;
            if (this.position = this._prevPos = i, this._prevPosition = t, this._target) if (n) this._updateTargetProps(null, 1); else if (this._steps.length > 0) {
                for (var a = 0, r = this._steps.length; r > a && !(this._steps[a].t > i); a++) ;
                var o = this._steps[a - 1];
                this._updateTargetProps(o, (this._stepPosition = i - o.t) / o.d)
            }
            return n && this.setPaused(!0), 0 != e && this._actions.length > 0 && (this._useTicks ? this._runActions(i, i) : 1 == e && s > i ? (s != this.duration && this._runActions(s, this.duration), this._runActions(0, i, !0)) : this._runActions(s, i)), this.dispatchEventWith("change"), n
        }, s._runActions = function (t, e, i) {
            void 0 === i && (i = !1);
            var n = t, s = e, a = -1, r = this._actions.length, o = 1;
            for (t > e && (n = e, s = t, a = r, r = o = -1); (a += o) != r;) {
                var h = this._actions[a], l = h.t;
                (l == s || l > n && s > l || i && l == t) && h.f.apply(h.o, h.p)
            }
        }, s._updateTargetProps = function (t, e) {
            var n, s, a, r, o, h;
            if (t || 1 != e) {
                if (this.passive = !!t.v, this.passive) return;
                t.e && (e = t.e(e, 0, 1, 1)), n = t.p0, s = t.p1
            } else this.passive = !1, n = s = this._curQueueProps;
            for (var l in this._initQueueProps) {
                null == (r = n[l]) && (n[l] = r = this._initQueueProps[l]), null == (o = s[l]) && (s[l] = o = r), a = r == o || 0 == e || 1 == e || "number" != typeof r ? 1 == e ? o : r : r + (o - r) * e;
                var u = !1;
                if (h = i._plugins[l]) for (var c = 0, d = h.length; d > c; c++) {
                    var f = h[c].tween(this, l, a, n, s, e, !!t && n == s, !t);
                    f == i.IGNORE ? u = !0 : a = f
                }
                u || (this._target[l] = a)
            }
        }, s.setPaused = function (t) {
            return this.paused = t, i._register(this, !t), this
        }, s._cloneProps = function (t) {
            var e = {};
            for (var i in t) e[i] = t[i];
            return e
        }, s._addStep = function (t) {
            return t.d > 0 && (this._steps.push(t), t.t = this.duration, this.duration += t.d), this
        }, s._appendQueueProps = function (t) {
            var e, n, s, a, r;
            for (var o in t) if (void 0 === this._initQueueProps[o]) {
                if (n = this._target[o], e = i._plugins[o]) for (s = 0, a = e.length; a > s; s++) n = e[s].init(this, o, n);
                this._initQueueProps[o] = this._curQueueProps[o] = void 0 === n ? null : n
            } else n = this._curQueueProps[o];
            for (var o in t) {
                if (n = this._curQueueProps[o], e = i._plugins[o]) for (r = r || {}, s = 0, a = e.length; a > s; s++) e[s].step && e[s].step(this, o, n, t[o], r);
                this._curQueueProps[o] = t[o]
            }
            return r && this._appendQueueProps(r), this._curQueueProps
        }, s._addAction = function (t) {
            return t.t = this.duration, this._actions.push(t), this
        }, s._set = function (t, e) {
            for (var i in t) e[i] = t[i]
        }, s.wait = function (t, e) {
            if (null == t || 0 >= t) return this;
            var i = this._cloneProps(this._curQueueProps);
            return this._addStep({d: t, p0: i, p1: i, v: e})
        }, s.to = function (t, e, i) {
            return void 0 === i && (i = void 0), (isNaN(e) || 0 > e) && (e = 0), this._addStep({
                d: e || 0,
                p0: this._cloneProps(this._curQueueProps),
                e: i,
                p1: this._cloneProps(this._appendQueueProps(t))
            })
        }, s.call = function (t, e, i) {
            return void 0 === e && (e = void 0), void 0 === i && (i = void 0), this._addAction({
                f: t,
                p: i ? i : [],
                o: e ? e : this._target
            })
        }, s.set = function (t, e) {
            return void 0 === e && (e = null), this._addAction({f: this._set, o: this, p: [t, e ? e : this._target]})
        }, s.play = function (t) {
            return t || (t = this), this.call(t.setPaused, t, [!1])
        }, s.pause = function (t) {
            return t || (t = this), this.call(t.setPaused, t, [!0])
        }, s.tick = function (t) {
            this.paused || this.setPosition(this._prevPosition + t)
        }, i.NONE = 0, i.LOOP = 1, i.REVERSE = 2, i._tweens = [], i.IGNORE = {}, i._plugins = {}, i._inited = !1, i._lastTime = 0, i
    }(t.EventDispatcher);
    t.Tween = e, t.registerClass(e, "egret.Tween")
}(egret || (egret = {}));
var RES;
!function (t) {
    var e = function () {
        function t(t, e, i) {
            this.groupName = "", this.data = null, this._loaded = !1, this.name = t, this.url = e, this.type = i
        }

        var e = __define, i = t, n = i.prototype;
        return e(n, "loaded", function () {
            return this.data ? this.data.loaded : this._loaded
        }, function (t) {
            this.data && (this.data.loaded = t), this._loaded = t
        }), n.toString = function () {
            return '[ResourceItem name="' + this.name + '" url="' + this.url + '" type="' + this.type + '"]'
        }, t.TYPE_XML = "xml", t.TYPE_IMAGE = "image", t.TYPE_BIN = "bin", t.TYPE_TEXT = "text", t.TYPE_JSON = "json", t.TYPE_SHEET = "sheet", t.TYPE_FONT = "font", t.TYPE_SOUND = "sound", t
    }();
    t.ResourceItem = e, egret.registerClass(e, "RES.ResourceItem")
}(RES || (RES = {}));
var RES;
!function (t) {
    var e = function () {
        function e() {
            this.keyMap = {}, this.groupDic = {}, t.configInstance = this
        }

        var i = e, n = i.prototype;
        return n.getGroupByName = function (t) {
            var e = new Array;
            if (!this.groupDic[t]) return e;
            for (var i = this.groupDic[t], n = i.length, s = 0; n > s; s++) {
                var a = i[s];
                e.push(this.parseResourceItem(a))
            }
            return e
        }, n.getRawGroupByName = function (t) {
            return this.groupDic[t] ? this.groupDic[t] : []
        }, n.createGroup = function (t, e, i) {
            if (void 0 === i && (i = !1), !i && this.groupDic[t] || !e || 0 == e.length) return !1;
            for (var n = this.groupDic, s = [], a = e.length, r = 0; a > r; r++) {
                var o = e[r], h = n[o];
                if (h) for (var l = h.length, u = 0; l > u; u++) {
                    var c = h[u];
                    -1 == s.indexOf(c) && s.push(c)
                } else c = this.keyMap[o], c ? -1 == s.indexOf(c) && s.push(c) : egret.$warn(3200, o)
            }
            return 0 != s.length && (this.groupDic[t] = s, !0)
        }, n.parseConfig = function (t, e) {
            if (t) {
                var i = t.resources;
                if (i) for (var n = i.length, s = 0; n > s; s++) {
                    var a = i[s], r = a.url;
                    r && -1 == r.indexOf("://") && (a.url = e + r), this.addItemToKeyMap(a)
                }
                var o = t.groups;
                if (o) for (n = o.length, s = 0; n > s; s++) {
                    for (var h = o[s], l = [], u = h.keys.split(","), c = u.length, d = 0; c > d; d++) {
                        var f = u[d].trim();
                        a = this.keyMap[f], a && -1 == l.indexOf(a) && l.push(a)
                    }
                    this.groupDic[h.name] = l
                }
            }
        }, n.addSubkey = function (t, e) {
            var i = this.keyMap[e];
            i && !this.keyMap[t] && (this.keyMap[t] = i)
        }, n.addItemToKeyMap = function (t) {
            if (this.keyMap[t.name] || (this.keyMap[t.name] = t), t.hasOwnProperty("subkeys")) {
                var e = t.subkeys.split(",");
                t.subkeys = e;
                for (var i = e.length, n = 0; i > n; n++) {
                    var s = e[n];
                    null == this.keyMap[s] && (this.keyMap[s] = t)
                }
            }
        }, n.getName = function (t) {
            var e = this.keyMap[t];
            return e ? e.name : ""
        }, n.getType = function (t) {
            var e = this.keyMap[t];
            return e ? e.type : ""
        }, n.getRawResourceItem = function (t) {
            return this.keyMap[t]
        }, n.getResourceItem = function (t) {
            var e = this.keyMap[t];
            return e ? this.parseResourceItem(e) : null
        }, n.parseResourceItem = function (e) {
            var i = new t.ResourceItem(e.name, e.url, e.type);
            return i.data = e, i
        }, e
    }();
    t.ResourceConfig = e, egret.registerClass(e, "RES.ResourceConfig")
}(RES || (RES = {}));
var RES;
!function (t) {
    var e = function (e) {
        function i() {
            e.call(this), this.thread = 2, this.loadingCount = 0, this.callBack = null, this.resInstance = null, this.groupTotalDic = {}, this.numLoadedDic = {}, this.itemListDic = {}, this.groupErrorDic = {}, this.retryTimesDic = {}, this.maxRetryTimes = 3, this.failedList = new Array, this.priorityQueue = {}, this.lazyLoadList = new Array, this.analyzerDic = {}, this.queueIndex = 0
        }

        __extends(i, e);
        var n = i, s = n.prototype;
        return s.isGroupInLoading = function (t) {
            return void 0 !== this.itemListDic[t]
        }, s.loadGroup = function (e, i, n) {
            if (void 0 === n && (n = 0), !this.itemListDic[i] && i) {
                if (!e || 0 == e.length) {
                    egret.$warn(3201, i);
                    var s = new t.ResourceEvent(t.ResourceEvent.GROUP_LOAD_ERROR);
                    return s.groupName = i, void this.dispatchEvent(s)
                }
                this.priorityQueue[n] ? this.priorityQueue[n].push(i) : this.priorityQueue[n] = [i], this.itemListDic[i] = e;
                for (var a = e.length, r = 0; a > r; r++) {
                    var o = e[r];
                    o.groupName = i
                }
                this.groupTotalDic[i] = e.length, this.numLoadedDic[i] = 0, this.next()
            }
        }, s.loadItem = function (t) {
            this.lazyLoadList.push(t), t.groupName = "", this.next()
        }, s.next = function () {
            for (; this.loadingCount < this.thread;) {
                var t = this.getOneResourceItem();
                if (!t) break;
                if (this.loadingCount++, t.loaded) this.onItemComplete(t); else {
                    var e = this.resInstance.$getAnalyzerByType(t.type);
                    e.loadFile(t, this.onItemComplete, this)
                }
            }
        }, s.getOneResourceItem = function () {
            if (this.failedList.length > 0) return this.failedList.shift();
            var t = Number.NEGATIVE_INFINITY;
            for (var e in this.priorityQueue) t = Math.max(t, e);
            var i = this.priorityQueue[t];
            if (!i || 0 == i.length) return 0 == this.lazyLoadList.length ? null : this.lazyLoadList.pop();
            for (var n, s = i.length, a = 0; s > a && (this.queueIndex >= s && (this.queueIndex = 0), n = this.itemListDic[i[this.queueIndex]], !(n.length > 0)); a++) this.queueIndex++;
            return 0 == n.length ? null : n.shift()
        }, s.onItemComplete = function (e) {
            this.loadingCount--;
            var i = e.groupName;
            if (!e.loaded) {
                var n = this.retryTimesDic[e.name] || 1;
                if (!(n > this.maxRetryTimes)) return this.retryTimesDic[e.name] = n + 1, this.failedList.push(e), void this.next();
                delete this.retryTimesDic[e.name], t.ResourceEvent.dispatchResourceEvent(this.resInstance, t.ResourceEvent.ITEM_LOAD_ERROR, i, e)
            }
            if (i) {
                this.numLoadedDic[i]++;
                var s = this.numLoadedDic[i], a = this.groupTotalDic[i];
                if (e.loaded || (this.groupErrorDic[i] = !0), t.ResourceEvent.dispatchResourceEvent(this.resInstance, t.ResourceEvent.GROUP_PROGRESS, i, e, s, a), s == a) {
                    var r = this.groupErrorDic[i];
                    this.removeGroupName(i), delete this.groupTotalDic[i], delete this.numLoadedDic[i], delete this.itemListDic[i], delete this.groupErrorDic[i], r ? t.ResourceEvent.dispatchResourceEvent(this, t.ResourceEvent.GROUP_LOAD_ERROR, i) : t.ResourceEvent.dispatchResourceEvent(this, t.ResourceEvent.GROUP_COMPLETE, i)
                }
            } else this.callBack.call(this.resInstance, e);
            this.next()
        }, s.removeGroupName = function (t) {
            for (var e in this.priorityQueue) {
                for (var i = this.priorityQueue[e], n = i.length, s = 0, a = !1, n = i.length, r = 0; n > r; r++) {
                    var o = i[r];
                    if (o == t) {
                        i.splice(s, 1), a = !0;
                        break
                    }
                    s++
                }
                if (a) {
                    0 == i.length && delete this.priorityQueue[e];
                    break
                }
            }
        }, i
    }(egret.EventDispatcher);
    t.ResourceLoader = e, egret.registerClass(e, "RES.ResourceLoader")
}(RES || (RES = {}));
var RES;
!function (t) {
    var e = function (t) {
        function e(e, i, n) {
            void 0 === i && (i = !1), void 0 === n && (n = !1), t.call(this, e, i, n), this.itemsLoaded = 0, this.itemsTotal = 0, this.groupName = "", this.resItem = null
        }

        __extends(e, t);
        var i = e;
        return i.prototype, e.dispatchResourceEvent = function (t, i, n, s, a, r) {
            void 0 === n && (n = ""), void 0 === s && (s = null), void 0 === a && (a = 0), void 0 === r && (r = 0);
            var o = egret.Event.create(e, i);
            o.groupName = n, o.resItem = s, o.itemsLoaded = a, o.itemsTotal = r;
            var h = t.dispatchEvent(o);
            return egret.Event.release(o), h
        }, e.ITEM_LOAD_ERROR = "itemLoadError", e.CONFIG_COMPLETE = "configComplete", e.CONFIG_LOAD_ERROR = "configLoadError", e.GROUP_PROGRESS = "groupProgress", e.GROUP_COMPLETE = "groupComplete", e.GROUP_LOAD_ERROR = "groupLoadError", e
    }(egret.Event);
    t.ResourceEvent = e, egret.registerClass(e, "RES.ResourceEvent")
}(RES || (RES = {}));
var RES;
!function (t) {
    var e = function (e) {
        function i() {
            e.call(this), this.resourceConfig = null, this.resourceConfig = t.configInstance
        }

        __extends(i, e);
        var n = i, s = n.prototype;
        return s.addSubkey = function (t, e) {
            this.resourceConfig.addSubkey(t, e)
        }, s.loadFile = function (t, e, i) {
        }, s.getRes = function (t) {
        }, s.destroyRes = function (t) {
            return !1
        }, i.getStringPrefix = function (t) {
            if (!t) return "";
            var e = t.indexOf(".");
            return -1 != e ? t.substring(0, e) : ""
        }, i.getStringTail = function (t) {
            if (!t) return "";
            var e = t.indexOf(".");
            return -1 != e ? t.substring(e + 1) : ""
        }, i
    }(egret.HashObject);
    t.AnalyzerBase = e, egret.registerClass(e, "RES.AnalyzerBase")
}(RES || (RES = {}));
var RES;
!function (t) {
    var e = function (e) {
        function i() {
            e.call(this), this.fileDic = {}, this.resItemDic = [], this._dataFormat = egret.HttpResponseType.ARRAY_BUFFER, this.recycler = []
        }

        __extends(i, e);
        var n = i, s = n.prototype;
        return s.loadFile = function (e, i, n) {
            if (this.fileDic[e.name]) return void i.call(n, e);
            var s = this.getRequest();
            this.resItemDic[s.hashCode] = {item: e, func: i, thisObject: n}, s.open(t.$getVirtualUrl(e.url)), s.send()
        }, s.getRequest = function () {
            var t = this.recycler.pop();
            return t || (t = new egret.HttpRequest, t.addEventListener(egret.Event.COMPLETE, this.onLoadFinish, this), t.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this)), t.responseType = this._dataFormat, t
        }, s.onLoadFinish = function (t) {
            var e = t.target, i = this.resItemDic[e.hashCode];
            delete this.resItemDic[e.hashCode];
            var n = i.item, s = i.func;
            n.loaded = t.type == egret.Event.COMPLETE, n.loaded && this.analyzeData(n, e.response), this.recycler.push(e), s.call(i.thisObject, n)
        }, s.analyzeData = function (t, e) {
            var i = t.name;
            this.fileDic[i] || "" != e && !e || (this.fileDic[i] = e)
        }, s.getRes = function (t) {
            return this.fileDic[t]
        }, s.hasRes = function (t) {
            var e = this.getRes(t);
            return null != e
        }, s.destroyRes = function (t) {
            return !!this.fileDic[t] && (this.onResourceDestroy(this.fileDic[t]), delete this.fileDic[t], !0)
        }, s.onResourceDestroy = function (t) {
        }, i
    }(t.AnalyzerBase);
    t.BinAnalyzer = e, egret.registerClass(e, "RES.BinAnalyzer")
}(RES || (RES = {}));
var RES;
!function (t) {
    var e = function (e) {
        function i() {
            e.call(this), this.fileDic = {}, this.resItemDic = [], this.recycler = []
        }

        __extends(i, e);
        var n = i, s = n.prototype;
        return s.loadFile = function (e, i, n) {
            if (this.fileDic[e.name]) return void i.call(n, e);
            var s = this.getLoader();
            this.resItemDic[s.$hashCode] = {item: e, func: i, thisObject: n}, s.load(t.$getVirtualUrl(e.url))
        }, s.getLoader = function () {
            var t = this.recycler.pop();
            return t || (t = new egret.ImageLoader, t.addEventListener(egret.Event.COMPLETE, this.onLoadFinish, this), t.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this)), t
        }, s.onLoadFinish = function (t) {
            var e = t.$target, i = this.resItemDic[e.$hashCode];
            delete this.resItemDic[e.$hashCode];
            var n = i.item, s = i.func;
            if (n.loaded = t.$type == egret.Event.COMPLETE, n.loaded) {
                var a = new egret.Texture;
                a._setBitmapData(e.data), this.analyzeData(n, a)
            }
            this.recycler.push(e), s.call(i.thisObject, n)
        }, s.analyzeData = function (t, e) {
            var i = t.name;
            if (!this.fileDic[i] && e) {
                this.fileDic[i] = e;
                var n = t.data;
                if (n && n.scale9grid) {
                    var s = n.scale9grid, a = s.split(",");
                    e.scale9Grid = new egret.Rectangle(parseInt(a[0]), parseInt(a[1]), parseInt(a[2]), parseInt(a[3]))
                }
            }
        }, s.getRes = function (t) {
            return this.fileDic[t]
        }, s.hasRes = function (t) {
            var e = this.getRes(t);
            return null != e
        }, s.destroyRes = function (t) {
            return !!this.fileDic[t] && (this.onResourceDestroy(this.fileDic[t]), delete this.fileDic[t], !0)
        }, s.onResourceDestroy = function (t) {
            t.dispose()
        }, i
    }(t.AnalyzerBase);
    t.ImageAnalyzer = e, egret.registerClass(e, "RES.ImageAnalyzer")
}(RES || (RES = {}));
var RES;
!function (t) {
    var e = function (t) {
        function e() {
            t.call(this), this._dataFormat = egret.HttpResponseType.TEXT
        }

        __extends(e, t);
        var i = e;
        return i.prototype, e
    }(t.BinAnalyzer);
    t.TextAnalyzer = e, egret.registerClass(e, "RES.TextAnalyzer")
}(RES || (RES = {}));
var RES;
!function (t) {
    var e = function (t) {
        function e() {
            t.call(this), this._dataFormat = egret.HttpResponseType.TEXT
        }

        __extends(e, t);
        var i = e, n = i.prototype;
        return n.analyzeData = function (t, e) {
            var i = t.name;
            if (!this.fileDic[i] && e) try {
                var n = e;
                this.fileDic[i] = JSON.parse(n)
            } catch (s) {
                egret.$warn(1017, t.url, e)
            }
        }, e
    }(t.BinAnalyzer);
    t.JsonAnalyzer = e, egret.registerClass(e, "RES.JsonAnalyzer")
}(RES || (RES = {}));
var RES;
!function (t) {
    var e = function (e) {
        function i() {
            e.call(this), this.sheetMap = {}, this.textureMap = {}, this.recyclerIamge = [], this._dataFormat = egret.HttpResponseType.TEXT
        }

        __extends(i, e);
        var n = i, s = n.prototype;
        return s.getRes = function (e) {
            var i = this.fileDic[e];
            if (i || (i = this.textureMap[e]), !i) {
                var n = t.AnalyzerBase.getStringPrefix(e);
                if (i = this.fileDic[n]) {
                    var s = t.AnalyzerBase.getStringTail(e);
                    i = i.getTexture(s)
                }
            }
            return i
        }, s.onLoadFinish = function (t) {
            var e = t.target, i = this.resItemDic[e.$hashCode];
            delete this.resItemDic[e.hashCode];
            var n = i.item, s = i.func;
            if (n.loaded = t.type == egret.Event.COMPLETE, n.loaded) if (e instanceof egret.HttpRequest) {
                n.loaded = !1;
                var a = this.analyzeConfig(n, e.response);
                if (a) return this.loadImage(a, i), void this.recycler.push(e)
            } else {
                var r = new egret.Texture;
                r._setBitmapData(e.data), this.analyzeBitmap(n, r)
            }
            e instanceof egret.HttpRequest ? this.recycler.push(e) : this.recyclerIamge.push(e), s.call(i.thisObject, n)
        }, s.analyzeConfig = function (t, e) {
            var i, n = t.name, s = "";
            try {
                var a = e;
                i = JSON.parse(a)
            } catch (r) {
                egret.$warn(1017, t.url, e)
            }
            return i && (this.sheetMap[n] = i, s = this.getRelativePath(t.url, i.file)), s
        }, s.analyzeBitmap = function (t, e) {
            var i = t.name;
            if (!this.fileDic[i] && e) {
                var n = this.sheetMap[i];
                delete this.sheetMap[i];
                var s = t.data && t.data.subkeys ? "" : i, a = this.parseSpriteSheet(e, n, s);
                this.fileDic[i] = a
            }
        }, s.getRelativePath = function (t, e) {
            t = t.split("\\").join("/");
            var i = t.lastIndexOf("/");
            return t = -1 != i ? t.substring(0, i + 1) + e : e
        }, s.parseSpriteSheet = function (t, e, i) {
            var n = e.frames;
            if (!n) return null;
            var s = new egret.SpriteSheet(t), a = this.textureMap;
            for (var r in n) {
                var o = n[r], t = s.createTexture(r, o.x, o.y, o.w, o.h, o.offX, o.offY, o.sourceW, o.sourceH);
                if (o.scale9grid) {
                    var h = o.scale9grid, l = h.split(",");
                    t.scale9Grid = new egret.Rectangle(parseInt(l[0]), parseInt(l[1]), parseInt(l[2]), parseInt(l[3]))
                }
                null == a[r] && (a[r] = t, i && this.addSubkey(r, i))
            }
            return s
        }, s.destroyRes = function (t) {
            var e = this.fileDic[t];
            if (e) {
                delete this.fileDic[t];
                var i;
                for (var n in e._textureMap) null == i && (i = e._textureMap[n], this.onResourceDestroy(i), i = null), delete this.textureMap[n];
                return !0
            }
            return !1
        }, s.loadImage = function (e, i) {
            var n = this.getImageLoader();
            this.resItemDic[n.hashCode] = i, n.load(t.$getVirtualUrl(e))
        }, s.getImageLoader = function () {
            var t = this.recyclerIamge.pop();
            return t || (t = new egret.ImageLoader, t.addEventListener(egret.Event.COMPLETE, this.onLoadFinish, this), t.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this)), t
        }, s.onResourceDestroy = function (t) {
            t && t.dispose()
        }, i
    }(t.BinAnalyzer);
    t.SheetAnalyzer = e, egret.registerClass(e, "RES.SheetAnalyzer")
}(RES || (RES = {}));
var RES;
!function (t) {
    var e = function (t) {
        function e() {
            t.call(this)
        }

        __extends(e, t);
        var i = e, n = i.prototype;
        return n.analyzeConfig = function (t, e) {
            var i, n = t.name, s = "";
            try {
                var a = e;
                i = JSON.parse(a)
            } catch (r) {
            }
            return i ? s = this.getRelativePath(t.url, i.file) : (i = e, s = this.getTexturePath(t.url, i)), this.sheetMap[n] = i, s
        }, n.analyzeBitmap = function (t, e) {
            var i = t.name;
            if (!this.fileDic[i] && e) {
                var n = this.sheetMap[i];
                delete this.sheetMap[i];
                var s = new egret.BitmapFont(e, n);
                this.fileDic[i] = s
            }
        }, n.getTexturePath = function (t, e) {
            var i = "", n = e.split("\n"), s = n[2], a = s.indexOf('file="');
            -1 != a && (s = s.substring(a + 6), a = s.indexOf('"'), i = s.substring(0, a)), t = t.split("\\").join("/");
            var a = t.lastIndexOf("/");
            return t = -1 != a ? t.substring(0, a + 1) + i : i
        }, n.onResourceDestroy = function (t) {
            t && t.dispose()
        }, e
    }(t.SheetAnalyzer);
    t.FontAnalyzer = e, egret.registerClass(e, "RES.FontAnalyzer")
}(RES || (RES = {}));
var RES;
!function (t) {
    var e = function (e) {
        function i() {
            e.call(this), this.soundDic = {}, this.resItemDic = []
        }

        __extends(i, e);
        var n = i, s = n.prototype;
        return s.loadFile = function (e, i, n) {
            if (this.soundDic[e.name]) return void i.call(n, e);
            var s = new egret.Sound;
            s.addEventListener(egret.Event.COMPLETE, this.onLoadFinish, this), s.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this), this.resItemDic[s.$hashCode] = {
                item: e,
                func: i,
                thisObject: n
            }, s.load(t.$getVirtualUrl(e.url)), e.data && (s.type = e.data.soundType)
        }, s.onLoadFinish = function (t) {
            var e = t.$target;
            e.removeEventListener(egret.Event.COMPLETE, this.onLoadFinish, this), e.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this);
            var i = this.resItemDic[e.$hashCode];
            delete this.resItemDic[e.$hashCode];
            var n = i.item, s = i.func;
            n.loaded = t.$type == egret.Event.COMPLETE, n.loaded && this.analyzeData(n, e), s.call(i.thisObject, n)
        }, s.analyzeData = function (t, e) {
            var i = t.name;
            !this.soundDic[i] && e && (this.soundDic[i] = e)
        }, s.getRes = function (t) {
            return this.soundDic[t]
        }, s.hasRes = function (t) {
            return !!this.getRes(t)
        }, s.destroyRes = function (t) {
            return !!this.soundDic[t] && (delete this.soundDic[t], !0)
        }, i
    }(t.AnalyzerBase);
    t.SoundAnalyzer = e, egret.registerClass(e, "RES.SoundAnalyzer")
}(RES || (RES = {}));
var RES;
!function (t) {
    var e = function (t) {
        function e() {
            t.call(this), this._dataFormat = egret.HttpResponseType.TEXT
        }

        __extends(e, t);
        var i = e, n = i.prototype;
        return n.analyzeData = function (t, e) {
            var i = t.name;
            if (!this.fileDic[i] && e) try {
                var n = e, s = egret.XML.parse(n);
                this.fileDic[i] = s
            } catch (a) {
            }
        }, e
    }(t.BinAnalyzer);
    t.XMLAnalyzer = e, egret.registerClass(e, "RES.XMLAnalyzer")
}(RES || (RES = {}));
var RES;
!function (t) {
}(RES || (RES = {}));
var RES;
!function (t) {
    var e;
    !function (e) {
        var i = function (t) {
            function e() {
                t.call(this), this._versionInfo = {}
            }

            __extends(e, t);
            var i = e, n = i.prototype;
            return n.fetchVersion = function (t) {
                t.onSuccess(null)
            }, n.getChangeList = function () {
                return []
            }, n.getVirtualUrl = function (t) {
                return t
            }, e
        }(egret.EventDispatcher);
        e.Html5VersionController = i, egret.registerClass(i, "RES.web.Html5VersionController", ["RES.VersionController", "RES.IVersionController"]), egret.Capabilities.runtimeType == egret.RuntimeType.WEB && (t.VersionController = i)
    }(e = t.web || (t.web = {}))
}(RES || (RES = {}));
var RES;
!function (t) {
    var e;
    !function (e) {
        var i = function () {
            function t() {
                this._versionInfo = {}, this._versionPath = "", this._localFileArr = []
            }

            var e = t, i = e.prototype;
            return i.fetchVersion = function (t) {
                var e = this;
                if (e._versionPath = "all.manifest", e._versionInfo = e.getLocalData(e._versionPath), null == e._versionInfo) return void egret.callLater(function () {
                    t.onFail(1, null)
                }, e);
                var i = 0, n = function (n) {
                    if (n) for (var s = 0; s < n.length; s++) n[s] && "" != n[s] && e._localFileArr.push("resource/" + n[s]);
                    i++, 2 == i && t.onSuccess(null)
                };
                e.getList(n, "assets", "resource"), e.getList(n, "update", "resource")
            }, i.getList = function (t, e, i) {
                void 0 === i && (i = "");
                var n = egret.PromiseObject.create();
                n.onSuccessFunc = function (e) {
                    t(e)
                }, n.onErrorFunc = function () {
                    console.error("list files error")
                }, "assets" == e ? egret_native.Game.listResource(i, n) : egret_native.Game.listUpdate(i, n)
            }, i.getChangeList = function () {
                var t = [], e = this._localFileArr;
                for (var i in this._versionInfo) e.indexOf(this.getVirtualUrl(i)) < 0 && t.push({
                    url: this.getVirtualUrl(i),
                    size: this._versionInfo[i].s
                });
                return t
            }, i.getVirtualUrl = function (t) {
                return this._versionInfo && this._versionInfo[t] ? "resource/" + this._versionInfo[t].v.substring(0, 2) + "/" + this._versionInfo[t].v + "_" + this._versionInfo[t].s + "." + t.substring(t.lastIndexOf(".") + 1) : t
            }, i.getLocalData = function (t) {
                if (egret_native.readUpdateFileSync && egret_native.readResourceFileSync) {
                    var e = egret_native.readUpdateFileSync(t);
                    if (null != e) return JSON.parse(e);
                    if (e = egret_native.readResourceFileSync(t), null != e) return JSON.parse(e)
                }
                return null
            }, t
        }();
        e.NativeVersionController = i, egret.registerClass(i, "RES.native.NativeVersionController", ["RES.VersionController", "RES.IVersionController"]), egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE && (t.VersionController = i)
    }(e = t["native"] || (t["native"] = {}))
}(RES || (RES = {}));
var RES;
!function (t) {
    function e(t, e) {
        E.registerAnalyzer(t, e)
    }

    function i(t) {
        E.$registerVersionController(t)
    }

    function n() {
        return E.vcs
    }

    function s(t, e, i) {
        void 0 === e && (e = ""), void 0 === i && (i = "json"), E.loadConfig(t, e, i)
    }

    function a(t, e) {
        void 0 === e && (e = 0), E.loadGroup(t, e)
    }

    function r(t) {
        return E.isGroupLoaded(t)
    }

    function o(t) {
        return E.getGroupByName(t)
    }

    function h(t, e, i) {
        return void 0 === i && (i = !1), E.createGroup(t, e, i)
    }

    function l(t) {
        return E.hasRes(t)
    }

    function u(t, e) {
        void 0 === e && (e = ""), E.parseConfig(t, e)
    }

    function c(t) {
        return E.getRes(t)
    }

    function d(t, e, i) {
        E.getResAsync(t, e, i)
    }

    function f(t, e, i, n) {
        void 0 === n && (n = ""), E.getResByUrl(t, e, i, n)
    }

    function g(t, e) {
        return E.destroyRes(t, e)
    }

    function p(t) {
        E.setMaxLoadingThread(t)
    }

    function _(t) {
        E.setMaxRetryTimes(t)
    }

    function m(t, e, i, n, s) {
        void 0 === n && (n = !1), void 0 === s && (s = 0), E.addEventListener(t, e, i, n, s)
    }

    function v(t, e, i, n) {
        void 0 === n && (n = !1), E.removeEventListener(t, e, i, n)
    }

    function T(t) {
        return E.vcs ? E.vcs.getVirtualUrl(t) : t
    }

    t.registerAnalyzer = e, t.registerVersionController = i, t.getVersionController = n, t.loadConfig = s, t.loadGroup = a, t.isGroupLoaded = r, t.getGroupByName = o, t.createGroup = h, t.hasRes = l, t.parseConfig = u, t.getRes = c, t.getResAsync = d, t.getResByUrl = f, t.destroyRes = g, t.setMaxLoadingThread = p, t.setMaxRetryTimes = _, t.addEventListener = m, t.removeEventListener = v, t.$getVirtualUrl = T;
    var y = function (e) {
        function i() {
            e.call(this), this.analyzerDic = {}, this.analyzerClassMap = {}, this.configItemList = [], this.callLaterFlag = !1, this.configComplete = !1, this.loadedGroups = [], this.groupNameList = [], this.asyncDic = {}, this._loadedUrlTypes = {}, this.init()
        }

        __extends(i, e);
        var n = i, s = n.prototype;
        return s.$getAnalyzerByType = function (t) {
            var e = this.analyzerDic[t];
            if (!e) {
                var i = this.analyzerClassMap[t];
                if (!i) return null;
                e = this.analyzerDic[t] = new i
            }
            return e
        }, s.registerAnalyzer = function (t, e) {
            this.analyzerClassMap[t] = e
        }, s.$registerVersionController = function (t) {
            this.vcs = t
        }, s.init = function () {
            this.vcs = new t.VersionController;
            var e = this.analyzerClassMap;
            e[t.ResourceItem.TYPE_BIN] = t.BinAnalyzer, e[t.ResourceItem.TYPE_IMAGE] = t.ImageAnalyzer, e[t.ResourceItem.TYPE_TEXT] = t.TextAnalyzer, e[t.ResourceItem.TYPE_JSON] = t.JsonAnalyzer, e[t.ResourceItem.TYPE_SHEET] = t.SheetAnalyzer, e[t.ResourceItem.TYPE_FONT] = t.FontAnalyzer, e[t.ResourceItem.TYPE_SOUND] = t.SoundAnalyzer, e[t.ResourceItem.TYPE_XML] = t.XMLAnalyzer, this.resConfig = new t.ResourceConfig, this.resLoader = new t.ResourceLoader, this.resLoader.callBack = this.onResourceItemComp, this.resLoader.resInstance = this, this.resLoader.addEventListener(t.ResourceEvent.GROUP_COMPLETE, this.onGroupComp, this), this.resLoader.addEventListener(t.ResourceEvent.GROUP_LOAD_ERROR, this.onGroupError, this)
        }, s.loadConfig = function (t, e, i) {
            void 0 === i && (i = "json");
            var n = {url: t, resourceRoot: e, type: i};
            this.configItemList.push(n), this.callLaterFlag || (egret.callLater(this.startLoadConfig, this), this.callLaterFlag = !0)
        }, s.startLoadConfig = function () {
            var e = this;
            this.callLaterFlag = !1;
            var n = this.configItemList;
            this.configItemList = [], this.loadingConfigList = n;
            for (var s = n.length, a = [], r = 0; s > r; r++) {
                var o = n[r], h = new t.ResourceItem(o.url, o.url, o.type);
                a.push(h)
            }
            var l = {
                onSuccess: function (t) {
                    e.resLoader.loadGroup(a, i.GROUP_CONFIG, Number.MAX_VALUE)
                }, onFail: function (i, n) {
                    t.ResourceEvent.dispatchResourceEvent(e, t.ResourceEvent.CONFIG_LOAD_ERROR)
                }
            };
            this.vcs ? this.vcs.fetchVersion(l) : this.resLoader.loadGroup(a, i.GROUP_CONFIG, Number.MAX_VALUE)
        }, s.isGroupLoaded = function (t) {
            return -1 != this.loadedGroups.indexOf(t)
        }, s.getGroupByName = function (t) {
            return this.resConfig.getGroupByName(t)
        }, s.loadGroup = function (e, i) {
            if (void 0 === i && (i = 0), -1 != this.loadedGroups.indexOf(e)) return void t.ResourceEvent.dispatchResourceEvent(this, t.ResourceEvent.GROUP_COMPLETE, e);
            if (!this.resLoader.isGroupInLoading(e)) if (this.configComplete) {
                var n = this.resConfig.getGroupByName(e);
                this.resLoader.loadGroup(n, e, i)
            } else this.groupNameList.push({name: e, priority: i})
        }, s.createGroup = function (t, e, i) {
            if (void 0 === i && (i = !1), i) {
                var n = this.loadedGroups.indexOf(t);
                -1 != n && this.loadedGroups.splice(n, 1)
            }
            return this.resConfig.createGroup(t, e, i)
        }, s.onGroupComp = function (e) {
            if (e.groupName == i.GROUP_CONFIG) {
                for (var n = this.loadingConfigList.length, s = 0; n > s; s++) {
                    var a = this.loadingConfigList[s], r = this.$getAnalyzerByType(a.type), o = r.getRes(a.url);
                    r.destroyRes(a.url), this.resConfig.parseConfig(o, a.resourceRoot)
                }
                this.configComplete = !0, this.loadingConfigList = null, t.ResourceEvent.dispatchResourceEvent(this, t.ResourceEvent.CONFIG_COMPLETE), this.loadDelayGroups()
            } else this.loadedGroups.push(e.groupName), this.dispatchEvent(e)
        }, s.loadDelayGroups = function () {
            var t = this.groupNameList;
            this.groupNameList = [];
            for (var e = t.length, i = 0; e > i; i++) {
                var n = t[i];
                this.loadGroup(n.name, n.priority)
            }
        }, s.onGroupError = function (e) {
            e.groupName == i.GROUP_CONFIG ? (this.loadingConfigList = null, t.ResourceEvent.dispatchResourceEvent(this, t.ResourceEvent.CONFIG_LOAD_ERROR)) : this.dispatchEvent(e)
        }, s.hasRes = function (e) {
            var i = this.resConfig.getType(e);
            if ("" == i) {
                var n = t.AnalyzerBase.getStringPrefix(e);
                if (i = this.resConfig.getType(n), "" == i) return !1
            }
            return !0
        }, s.parseConfig = function (t, e) {
            this.resConfig.parseConfig(t, e), this.configComplete || this.loadingConfigList || (this.configComplete = !0, this.loadDelayGroups())
        }, s.getRes = function (e) {
            var i = this.resConfig.getType(e);
            if ("" == i) {
                var n = t.AnalyzerBase.getStringPrefix(e);
                if (i = this.resConfig.getType(n), "" == i) return null
            }
            var s = this.$getAnalyzerByType(i);
            return s.getRes(e)
        }, s.getResAsync = function (e, i, n) {
            var s = this.resConfig.getType(e), a = this.resConfig.getName(e);
            if ("" == s && (a = t.AnalyzerBase.getStringPrefix(e), s = this.resConfig.getType(a), "" == s)) return void egret.$callAsync(i, n);
            var r = this.$getAnalyzerByType(s), o = r.getRes(e);
            if (o) return void egret.$callAsync(i, n, o, e);
            var h = {key: e, compFunc: i, thisObject: n};
            if (this.asyncDic[a]) this.asyncDic[a].push(h); else {
                this.asyncDic[a] = [h];
                var l = this.resConfig.getResourceItem(a);
                this.resLoader.loadItem(l)
            }
        }, s.getResByUrl = function (e, i, n, s) {
            if (void 0 === s && (s = ""), !e) return void egret.$callAsync(i, n);
            s || (s = this.getTypeByUrl(e)), null != this._loadedUrlTypes[e] && this._loadedUrlTypes[e] != s && egret.$warn(3202), this._loadedUrlTypes[e] = s;
            var a = this.$getAnalyzerByType(s), r = e, o = a.getRes(r);
            if (o) return void egret.$callAsync(i, n, o, e);
            var h = {key: r, compFunc: i, thisObject: n};
            if (this.asyncDic[r]) this.asyncDic[r].push(h); else {
                this.asyncDic[r] = [h];
                var l = new t.ResourceItem(r, e, s);
                this.resLoader.loadItem(l)
            }
        }, s.getTypeByUrl = function (e) {
            var i = e.substr(e.lastIndexOf(".") + 1);
            i && (i = i.toLowerCase());
            var n;
            switch (i) {
                case t.ResourceItem.TYPE_XML:
                case t.ResourceItem.TYPE_JSON:
                case t.ResourceItem.TYPE_SHEET:
                    n = i;
                    break;
                case"png":
                case"jpg":
                case"gif":
                case"jpeg":
                case"bmp":
                    n = t.ResourceItem.TYPE_IMAGE;
                    break;
                case"fnt":
                    n = t.ResourceItem.TYPE_FONT;
                    break;
                case"txt":
                    n = t.ResourceItem.TYPE_TEXT;
                    break;
                case"mp3":
                case"ogg":
                case"mpeg":
                case"wav":
                case"m4a":
                case"mp4":
                case"aiff":
                case"wma":
                case"mid":
                    n = t.ResourceItem.TYPE_SOUND;
                    break;
                default:
                    n = t.ResourceItem.TYPE_BIN
            }
            return n
        }, s.onResourceItemComp = function (t) {
            var e = this.asyncDic[t.name];
            delete this.asyncDic[t.name];
            for (var i = this.$getAnalyzerByType(t.type), n = e.length, s = 0; n > s; s++) {
                var a = e[s], r = i.getRes(a.key);
                a.compFunc.call(a.thisObject, r, a.key)
            }
        }, s.destroyRes = function (t, e) {
            void 0 === e && (e = !0);
            var i = this.resConfig.getRawGroupByName(t);
            if (i && i.length > 0) {
                var n = this.loadedGroups.indexOf(t);
                -1 != n && this.loadedGroups.splice(n, 1);
                for (var s = i.length, a = 0; s > a; a++) {
                    var r = i[a];
                    if (!e && this.isResInLoadedGroup(r.name)) ; else {
                        r.loaded = !1;
                        var o = this.$getAnalyzerByType(r.type);
                        o.destroyRes(r.name), this.removeLoadedGroupsByItemName(r.name)
                    }
                }
                return !0
            }
            var h = this.resConfig.getType(t);
            if ("" == h) {
                if (h = this._loadedUrlTypes[t], null == h || "" == h) return !1;
                delete this._loadedUrlTypes[t];
                var o = this.$getAnalyzerByType(h);
                return o.destroyRes(t), !0
            }
            r = this.resConfig.getRawResourceItem(t), r.loaded = !1, o = this.$getAnalyzerByType(h);
            var l = o.destroyRes(t);
            return this.removeLoadedGroupsByItemName(r.name), l
        }, s.removeLoadedGroupsByItemName = function (t) {
            for (var e = this.loadedGroups, i = e.length, n = 0; i > n; n++) for (var s = this.resConfig.getRawGroupByName(e[n]), a = s.length, r = 0; a > r; r++) {
                var o = s[r];
                if (o.name == t) {
                    e.splice(n, 1), n--, i = e.length;
                    break
                }
            }
        }, s.isResInLoadedGroup = function (t) {
            for (var e = this.loadedGroups, i = e.length, n = 0; i > n; n++) for (var s = this.resConfig.getRawGroupByName(e[n]), a = s.length, r = 0; a > r; r++) {
                var o = s[r];
                if (o.name == t) return !0
            }
            return !1
        }, s.setMaxLoadingThread = function (t) {
            1 > t && (t = 1), this.resLoader.thread = t
        }, s.setMaxRetryTimes = function (t) {
            t = Math.max(t, 0), this.resLoader.maxRetryTimes = t
        }, i.GROUP_CONFIG = "RES__CONFIG", i
    }(egret.EventDispatcher);
    egret.registerClass(y, "Resource");
    var E = new y
}(RES || (RES = {}));
var RES;
!function (t) {
    var e = function (e) {
        function i() {
            e.call(this), this.sheetMap = {}, this.recyclerIamge = [], this._dataFormat = egret.HttpResponseType.TEXT
        }

        __extends(i, e);
        var n = i, s = n.prototype;
        return s.onLoadFinish = function (t) {
            var e = t.target, i = this.resItemDic[e.$hashCode];
            delete this.resItemDic[e.hashCode];
            var n = i.item, s = i.func;
            if (n.loaded = t.type == egret.Event.COMPLETE, n.loaded) if (e instanceof egret.HttpRequest) {
                n.loaded = !1;
                var a = this.analyzeConfig(n, e.response);
                if (a) return this.loadImage(a, i), void this.recycler.push(e)
            } else this.analyzeBitmap(n, e.data);
            e instanceof egret.HttpRequest ? this.recycler.push(e) : this.recyclerIamge.push(e), s.call(i.thisObject, n)
        }, s.analyzeConfig = function (t, e) {
            var i, n = t.name, s = "";
            try {
                var a = e;
                i = JSON.parse(a)
            } catch (r) {
                egret.$warn(1017, t.url, e)
            }
            if (i) if (this.sheetMap[n] = i, i.file) s = this.getRelativePath(t.url, i.file); else {
                var o = t.url.split("?"), h = o[0].split("/");
                h[h.length - 1] = h[h.length - 1].split(".")[0] + ".png", s = "";
                for (var l = 0; l < h.length; l++) s += h[l] + (l < h.length - 1 ? "/" : "");
                2 == o.length && (s += o[2])
            }
            return s
        }, s.analyzeBitmap = function (t, e) {
            var i = t.name;
            if (!this.fileDic[i] && e) {
                var n = this.sheetMap[i];
                delete this.sheetMap[i];
                var s = t.data && t.data.subkeys ? "" : i, a = this.parseAnimation(e, n, s);
                this.fileDic[i] = a
            }
        }, s.getRelativePath = function (t, e) {
            t = t.split("\\").join("/");
            var i = t.lastIndexOf("/");
            return t = -1 != i ? t.substring(0, i + 1) + e : e
        }, s.parseAnimation = function (t, e, i) {
            for (var n, s = Object.keys(e.mc), a = e.mc[s[0]].frames, r = a.length, o = [], h = 0; r > h; h++) {
                n = e.res[a[h].res];
                var l = new egret.Texture;
                l._bitmapData = t, l.$initData(n.x, n.y, n.w, n.h, a[h].x, a[h].y, a[h].sourceW, a[h].sourceH, t.width, t.height)
            }
            return o
        }, s.destroyRes = function (t) {
            var e = this.fileDic[t];
            return !!e && (delete this.fileDic[t], !0)
        }, s.loadImage = function (e, i) {
            var n = this.getImageLoader();
            this.resItemDic[n.hashCode] = i, n.load(t.$getVirtualUrl(e))
        }, s.getImageLoader = function () {
            var t = this.recyclerIamge.pop();
            return t || (t = new egret.ImageLoader, t.addEventListener(egret.Event.COMPLETE, this.onLoadFinish, this), t.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this)), t
        }, i
    }(t.BinAnalyzer);
    t.AnimationAnalyzer = e, egret.registerClass(e, "RES.AnimationAnalyzer")
}(RES || (RES = {}));
var egret;
!function (t) {
    t.$locale_strings = t.$locale_strings || {}, t.$locale_strings.en_US = t.$locale_strings.en_US || {};
    var e = t.$locale_strings.en_US;
    e[3200] = "RES.createGroup() passed in non-existed key value in configuration: {0}", e[3201] = 'RES loaded non-existed or empty resource group:"{0}"', e[3202] = "Do not use the different types of ways to load the same material!", e[3203] = "Can't find the analyzer of the specified file type:{0}。 Please register the specified analyzer in the initialization of the project first,then start the resource loading process。"
}(egret || (egret = {}));
var egret;
!function (t) {
    t.$locale_strings = t.$locale_strings || {}, t.$locale_strings.zh_CN = t.$locale_strings.zh_CN || {};
    var e = t.$locale_strings.zh_CN;
    e[3200] = "RES.createGroup()传入了配置中不存在的键值: {0}", e[3201] = 'RES加载了不存在或空的资源组:"{0}"', e[3202] = "请不要使用不同的类型方式来加载同一个素材！", e[3203] = "找不到指定文件类型的解析器:{0}。 请先在项目初始化里注册指定文件类型的解析器，再启动资源加载。"
}(egret || (egret = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function t() {
        }

        var e = t;
        return e.prototype, t.DATA_VERSION = "4.0", t.DATA_VERSION_4_5 = "4.5", t.PARENT_COORDINATE_DATA_VERSION = "3.0", t.VERSION = "4.5.10", t
    }();
    t.DragonBones = e, egret.registerClass(e, "dragonBones.DragonBones")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function e(t) {
            this._animationStateCount = 0, this._armature = t, this._animationList = [], this._animationStateList = [], this._timeScale = 1, this._isPlaying = !1, this.tweenEnabled = !0
        }

        var i = __define, n = e, s = n.prototype;
        return s.dispose = function () {
            this._armature && (this._resetAnimationStateList(), this._animationList.length = 0, this._armature = null, this._animationDataList = null, this._animationList = null, this._animationStateList = null)
        }, s._resetAnimationStateList = function () {
            for (var e, i = this._animationStateList.length; i--;) e = this._animationStateList[i], e._resetTimelineStateList(), t.AnimationState._returnObject(e);
            this._animationStateList.length = 0
        }, s.gotoAndPlay = function (i, n, s, a, r, o, h, l, u) {
            if (void 0 === n && (n = -1), void 0 === s && (s = -1), void 0 === a && (a = NaN), void 0 === r && (r = 0), void 0 === o && (o = null), void 0 === h && (h = e.SAME_LAYER_AND_GROUP), void 0 === l && (l = !0), void 0 === u && (u = !0), !this._animationDataList) return null;
            for (var c, d = this._animationDataList.length; d--;) if (this._animationDataList[d].name == i) {
                c = this._animationDataList[d];
                break
            }
            if (!c) return null;
            var f = 0 == this._isPlaying;
            this._isPlaying = !0, this._isFading = !0, n = 0 > n ? c.fadeTime < 0 ? .3 : c.fadeTime : n;
            var g;
            g = 0 > s ? c.scale < 0 ? 1 : c.scale : 1e3 * s / c.duration, a = isNaN(a) ? c.playTimes : a;
            var p;
            switch (h) {
                case e.NONE:
                    break;
                case e.SAME_LAYER:
                    for (d = this._animationStateList.length; d--;) p = this._animationStateList[d], p.layer == r && p.fadeOut(n, l);
                    break;
                case e.SAME_GROUP:
                    for (d = this._animationStateList.length; d--;) p = this._animationStateList[d], p.group == o && p.fadeOut(n, l);
                    break;
                case e.ALL:
                    for (d = this._animationStateList.length; d--;) p = this._animationStateList[d], p.fadeOut(n, l);
                    break;
                case e.SAME_LAYER_AND_GROUP:
                default:
                    for (d = this._animationStateList.length; d--;) p = this._animationStateList[d], p.layer == r && p.group == o && p.fadeOut(n, l)
            }
            this._lastAnimationState = t.AnimationState._borrowObject(), this._lastAnimationState._layer = r, this._lastAnimationState._group = o, this._lastAnimationState.autoTween = this.tweenEnabled, this._lastAnimationState._fadeIn(this._armature, c, n, 1 / g, a, u), this.addState(this._lastAnimationState);
            var _ = this._armature.getSlots(!1);
            for (d = _.length; d--;) {
                var m = _[d];
                m.childArmature && m.childArmature.animation.gotoAndPlay(i, n)
            }
            return f && this._armature.advanceTime(0), this._lastAnimationState
        }, s.gotoAndStop = function (t, i, n, s, a, r, o, h) {
            void 0 === n && (n = -1), void 0 === s && (s = 0), void 0 === a && (a = -1), void 0 === r && (r = 0), void 0 === o && (o = null), void 0 === h && (h = e.ALL);
            var l = this.getState(t, r);
            return l || (l = this.gotoAndPlay(t, s, a, NaN, r, o, h)), n >= 0 ? l.setCurrentTime(l.totalTime * n) : l.setCurrentTime(i), l.stop(), l
        }, s.play = function () {
            this._animationDataList && 0 != this._animationDataList.length && (this._lastAnimationState ? this._isPlaying ? this.gotoAndPlay(this._lastAnimationState.name) : this._isPlaying = !0 : this.gotoAndPlay(this._animationDataList[0].name))
        }, s.stop = function () {
            this._isPlaying = !1
        }, s.getState = function (t, e) {
            void 0 === e && (e = 0);
            for (var i = this._animationStateList.length; i--;) {
                var n = this._animationStateList[i];
                if (n.name == t && n.layer == e) return n
            }
            return null
        }, s.hasAnimation = function (t) {
            for (var e = this._animationDataList.length; e--;) if (this._animationDataList[e].name == t) return !0;
            return !1
        }, s._advanceTime = function (t) {
            if (this._isPlaying) {
                var e = !1;
                t *= this._timeScale;
                for (var i = this._animationStateList.length; i--;) {
                    var n = this._animationStateList[i];
                    n._advanceTime(t) ? this.removeState(n) : 1 != n.fadeState && (e = !0)
                }
                this._isFading = e
            }
        }, s._updateAnimationStates = function () {
            for (var t = this._animationStateList.length; t--;) this._animationStateList[t]._updateTimelineStates()
        }, s.addState = function (t) {
            this._animationStateList.indexOf(t) < 0 && (this._animationStateList.unshift(t), this._animationStateCount = this._animationStateList.length)
        }, s.removeState = function (e) {
            var i = this._animationStateList.indexOf(e);
            i >= 0 && (this._animationStateList.splice(i, 1), t.AnimationState._returnObject(e), this._lastAnimationState == e && (this._animationStateList.length > 0 ? this._lastAnimationState = this._animationStateList[0] : this._lastAnimationState = null), this._animationStateCount = this._animationStateList.length)
        }, i(s, "movementList", function () {
            return this._animationList
        }), i(s, "movementID", function () {
            return this.lastAnimationName
        }), i(s, "lastAnimationState", function () {
            return this._lastAnimationState
        }), i(s, "lastAnimationName", function () {
            return this._lastAnimationState ? this._lastAnimationState.name : null
        }), i(s, "animationList", function () {
            return this._animationList
        }), i(s, "isPlaying", function () {
            return this._isPlaying && !this.isComplete
        }), i(s, "isComplete", function () {
            if (this._lastAnimationState) {
                if (!this._lastAnimationState.isComplete) return !1;
                for (var t = this._animationStateList.length; t--;) if (!this._animationStateList[t].isComplete) return !1;
                return !0
            }
            return !0
        }), i(s, "timeScale", function () {
            return this._timeScale
        }, function (t) {
            (isNaN(t) || 0 > t) && (t = 1), this._timeScale = t
        }), i(s, "animationDataList", function () {
            return this._animationDataList
        }, function (t) {
            this._animationDataList = t, this._animationList.length = 0;
            for (var e = 0, i = this._animationDataList.length; i > e; e++) {
                var n = this._animationDataList[e];
                this._animationList[this._animationList.length] = n.name
            }
        }), e.NONE = "none", e.SAME_LAYER = "sameLayer", e.SAME_GROUP = "sameGroup", e.SAME_LAYER_AND_GROUP = "sameLayerAndGroup", e.ALL = "all", e
    }();
    t.Animation = e, egret.registerClass(e, "dragonBones.Animation")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function e() {
            this._layer = 0, this._currentFrameIndex = 0, this._currentFramePosition = 0, this._currentFrameDuration = 0, this._currentPlayTimes = 0, this._totalTime = 0, this._currentTime = 0, this._lastTime = 0, this._fadeState = 0, this._playTimes = 0, this._timelineStateList = [], this._slotTimelineStateList = [], this._boneMasks = []
        }

        var i = __define, n = e, s = n.prototype;
        return e._borrowObject = function () {
            return 0 == e._pool.length ? new e : e._pool.pop()
        }, e._returnObject = function (t) {
            t.clear(), e._pool.indexOf(t) < 0 && (e._pool[e._pool.length] = t)
        }, e._clear = function () {
            for (var i = e._pool.length; i--;) e._pool[i].clear();
            e._pool.length = 0, t.TimelineState._clear()
        }, s.clear = function () {
            this._resetTimelineStateList(), this._boneMasks.length = 0, this._armature = null, this._clip = null
        }, s._resetTimelineStateList = function () {
            for (var e = this._timelineStateList.length; e--;) t.TimelineState._returnObject(this._timelineStateList[e]);
            for (this._timelineStateList.length = 0, e = this._slotTimelineStateList.length; e--;) t.SlotTimelineState._returnObject(this._slotTimelineStateList[e]);
            this._slotTimelineStateList.length = 0
        }, s.containsBoneMask = function (t) {
            return 0 == this._boneMasks.length || this._boneMasks.indexOf(t) >= 0
        }, s.addBoneMask = function (t, e) {
            if (void 0 === e && (e = !0), this.addBoneToBoneMask(t), e) {
                var i = this._armature.getBone(t);
                if (i) for (var n = this._armature.getBones(!1), s = n.length; s--;) {
                    var a = n[s];
                    i.contains(a) && this.addBoneToBoneMask(a.name)
                }
            }
            return this._updateTimelineStates(), this
        }, s.removeBoneMask = function (t, e) {
            if (void 0 === e && (e = !0), this.removeBoneFromBoneMask(t), e) {
                var i = this._armature.getBone(t);
                if (i) for (var n = this._armature.getBones(!1), s = n.length; s--;) {
                    var a = n[s];
                    i.contains(a) && this.removeBoneFromBoneMask(a.name)
                }
            }
            return this._updateTimelineStates(), this
        }, s.removeAllMixingTransform = function () {
            return this._boneMasks.length = 0, this._updateTimelineStates(), this
        }, s.addBoneToBoneMask = function (t) {
            this._clip.getTimeline(t) && this._boneMasks.indexOf(t) < 0 && this._boneMasks.push(t)
        }, s.removeBoneFromBoneMask = function (t) {
            var e = this._boneMasks.indexOf(t);
            e >= 0 && this._boneMasks.splice(e, 1)
        }, s._updateTimelineStates = function () {
            for (var t, e, i, n = this._timelineStateList.length; n--;) t = this._timelineStateList[n], this._armature.getBone(t.name) || this.removeTimelineState(t);
            for (n = this._slotTimelineStateList.length; n--;) e = this._slotTimelineStateList[n], this._armature.getSlot(e.name) || this.removeSlotTimelineState(e);
            if (this._boneMasks.length > 0) {
                for (n = this._timelineStateList.length; n--;) t = this._timelineStateList[n], this._boneMasks.indexOf(t.name) < 0 && this.removeTimelineState(t);
                for (n = 0, i = this._boneMasks.length; i > n; n++) {
                    var s = this._boneMasks[n];
                    this.addTimelineState(s)
                }
            } else for (n = 0, i = this._clip.timelineList.length; i > n; n++) {
                var a = this._clip.timelineList[n];
                this.addTimelineState(a.name)
            }
            for (n = 0, i = this._clip.slotTimelineList.length; i > n; n++) {
                var r = this._clip.slotTimelineList[n];
                this.addSlotTimelineState(r.name)
            }
        }, s.addTimelineState = function (e) {
            var i = this._armature.getBone(e);
            if (i) {
                for (var n = 0, s = this._timelineStateList.length; s > n; n++) {
                    var a = this._timelineStateList[n];
                    if (a.name == e) return
                }
                var r = t.TimelineState._borrowObject();
                r._fadeIn(i, this, this._clip.getTimeline(e)), this._timelineStateList.push(r)
            }
        }, s.removeTimelineState = function (e) {
            var i = this._timelineStateList.indexOf(e);
            this._timelineStateList.splice(i, 1), t.TimelineState._returnObject(e)
        }, s.addSlotTimelineState = function (e) {
            var i = this._armature.getSlot(e);
            if (i) {
                for (var n = 0, s = this._slotTimelineStateList.length; s > n; n++) {
                    var a = this._slotTimelineStateList[n];
                    if (a.name == e) return
                }
                var r = t.SlotTimelineState._borrowObject();
                r._fadeIn(i, this, this._clip.getSlotTimeline(e)), this._slotTimelineStateList.push(r)
            }
        }, s.removeSlotTimelineState = function (e) {
            var i = this._slotTimelineStateList.indexOf(e);
            this._slotTimelineStateList.splice(i, 1), t.SlotTimelineState._returnObject(e)
        }, s.play = function () {
            return this._isPlaying = !0, this
        }, s.stop = function () {
            return this._isPlaying = !1, this
        }, s._fadeIn = function (t, e, i, n, s, a) {
            return this._armature = t, this._clip = e, this._pausePlayheadInFade = a, this._name = this._clip.name, this._totalTime = this._clip.duration, this.autoTween = this._clip.autoTween, this.setTimeScale(n), this.setPlayTimes(s), this._isComplete = !1, this._currentFrameIndex = -1, this._currentPlayTimes = -1, Math.round(this._totalTime * this._clip.frameRate * .001) < 2 || n == 1 / 0 ? this._currentTime = this._totalTime : this._currentTime = -1, this._time = 0, this._boneMasks.length = 0, this._isFadeOut = !1, this._fadeWeight = 0, this._fadeTotalWeight = 1, this._fadeState = -1, this._fadeCurrentTime = 0, this._fadeBeginTime = this._fadeCurrentTime, this._fadeTotalTime = i * this._timeScale, this._isPlaying = !0, this.displayControl = !0, this.lastFrameAutoTween = !0, this.additiveBlending = !1, this.weight = 1, this.fadeOutTime = i, this._updateTimelineStates(), this
        }, s.fadeOut = function (t, e) {
            if (!this._armature) return null;
            if ((isNaN(t) || 0 > t) && (t = 0), this._pausePlayheadInFade = e, this._isFadeOut) {
                if (t > this._fadeTotalTime / this._timeScale - (this._fadeCurrentTime - this._fadeBeginTime)) return this
            } else for (var i = 0, n = this._timelineStateList.length; n > i; i++) {
                var s = this._timelineStateList[i];
                s._fadeOut()
            }
            return this._isFadeOut = !0, this._fadeTotalWeight = this._fadeWeight, this._fadeState = -1, this._fadeBeginTime = this._fadeCurrentTime, this._fadeTotalTime = this._fadeTotalWeight >= 0 ? t * this._timeScale : 0, this.displayControl = !1, this
        }, s._advanceTime = function (t) {
            return t *= this._timeScale, this.advanceFadeTime(t), this._fadeWeight && this.advanceTimelinesTime(t), this._isFadeOut && 1 == this._fadeState
        }, s.advanceFadeTime = function (e) {
            var i = !1, n = !1;
            if (this._fadeBeginTime >= 0) {
                var s = this._fadeState;
                this._fadeCurrentTime += 0 > e ? -e : e, this._fadeCurrentTime >= this._fadeBeginTime + this._fadeTotalTime ? ((1 == this._fadeWeight || 0 == this._fadeWeight) && (s = 1, this._pausePlayheadInFade && (this._pausePlayheadInFade = !1, this._currentTime = -1)), this._fadeWeight = this._isFadeOut ? 0 : 1) : this._fadeCurrentTime >= this._fadeBeginTime ? (s = 0, this._fadeWeight = (this._fadeCurrentTime - this._fadeBeginTime) / this._fadeTotalTime * this._fadeTotalWeight, this._isFadeOut && (this._fadeWeight = this._fadeTotalWeight - this._fadeWeight)) : (s = -1, this._fadeWeight = this._isFadeOut ? 1 : 0), this._fadeState != s && (-1 == this._fadeState && (i = !0), 1 == s && (n = !0), this._fadeState = s)
            }
            var a;
            i && (this._isFadeOut ? this._armature.hasEventListener(t.AnimationEvent.FADE_OUT) && (a = new t.AnimationEvent(t.AnimationEvent.FADE_OUT), a.animationState = this, this._armature._eventList.push(a)) : (this.hideBones(),
            this._armature.hasEventListener(t.AnimationEvent.FADE_IN) && (a = new t.AnimationEvent(t.AnimationEvent.FADE_IN), a.animationState = this, this._armature._eventList.push(a)))), n && (this._isFadeOut ? this._armature.hasEventListener(t.AnimationEvent.FADE_OUT_COMPLETE) && (a = new t.AnimationEvent(t.AnimationEvent.FADE_OUT_COMPLETE), a.animationState = this, this._armature._eventList.push(a)) : this._armature.hasEventListener(t.AnimationEvent.FADE_IN_COMPLETE) && (a = new t.AnimationEvent(t.AnimationEvent.FADE_IN_COMPLETE), a.animationState = this, this._armature._eventList.push(a)))
        }, s.advanceTimelinesTime = function (e) {
            this._isPlaying && !this._pausePlayheadInFade && (this._time += e);
            var i = !1, n = !1, s = !1, a = !1, r = 0, o = 1e3 * this._time;
            if (0 == this._playTimes) a = !1, r = Math.ceil(Math.abs(o) / this._totalTime) || 1, o -= o >= 0 ? Math.floor(o / this._totalTime) * this._totalTime : Math.ceil(o / this._totalTime) * this._totalTime, 0 > o && (o += this._totalTime); else {
                var h = this._playTimes * this._totalTime;
                o >= h ? (o = h, a = !0) : -h >= o ? (o = -h, a = !0) : a = !1, 0 > o && (o += h), r = Math.ceil(o / this._totalTime) || 1, o -= o >= 0 ? Math.floor(o / this._totalTime) * this._totalTime : Math.ceil(o / this._totalTime) * this._totalTime, a && (o = this._totalTime)
            }
            this._isComplete = a;
            var l = 1e3 * this._time / this._totalTime, u = 0, c = 0;
            for (u = 0, c = this._timelineStateList.length; c > u; u++) {
                var d = this._timelineStateList[u];
                d._update(l), this._isComplete = d._isComplete && this._isComplete
            }
            for (u = 0, c = this._slotTimelineStateList.length; c > u; u++) {
                var f = this._slotTimelineStateList[u];
                f._update(l), this._isComplete = d._isComplete && this._isComplete
            }
            this._currentTime != o && (this._currentPlayTimes != r && (this._currentPlayTimes > 0 && r > 1 && (s = !0), this._currentPlayTimes = r), this._currentTime < 0 && (i = !0), this._isComplete && (n = !0), this._lastTime = this._currentTime, this._currentTime = o, this.updateMainTimeline(a));
            var g;
            i && this._armature.hasEventListener(t.AnimationEvent.START) && (g = new t.AnimationEvent(t.AnimationEvent.START), g.animationState = this, this._armature._eventList.push(g)), n ? (this._armature.hasEventListener(t.AnimationEvent.COMPLETE) && (g = new t.AnimationEvent(t.AnimationEvent.COMPLETE), g.animationState = this, this._armature._eventList.push(g)), this.autoFadeOut && this.fadeOut(this.fadeOutTime, !0)) : s && this._armature.hasEventListener(t.AnimationEvent.LOOP_COMPLETE) && (g = new t.AnimationEvent(t.AnimationEvent.LOOP_COMPLETE), g.animationState = this, this._armature._eventList.push(g))
        }, s.updateMainTimeline = function (t) {
            var e = this._clip.frameList;
            if (e.length > 0) {
                for (var i, n, s = 0, a = this._clip.frameList.length; a > s; ++s) {
                    if (this._currentFrameIndex < 0) this._currentFrameIndex = 0; else {
                        if (!(this._currentTime < this._currentFramePosition || this._currentTime >= this._currentFramePosition + this._currentFrameDuration || this._currentTime < this._lastTime)) break;
                        if (this._currentFrameIndex++, this._lastTime = this._currentTime, this._currentFrameIndex >= e.length) {
                            if (t) {
                                this._currentFrameIndex--;
                                break
                            }
                            this._currentFrameIndex = 0
                        }
                    }
                    n = e[this._currentFrameIndex], i && this._armature._arriveAtFrame(i, null, this, !0), this._currentFrameDuration = n.duration, this._currentFramePosition = n.position, i = n
                }
                n && this._armature._arriveAtFrame(n, null, this, !1)
            }
        }, s.hideBones = function () {
            for (var t = 0, e = this._clip.hideTimelineNameMap.length; e > t; t++) {
                var i = this._clip.hideTimelineNameMap[t], n = this._armature.getBone(i);
                n && n._hideSlots()
            }
            var s;
            for (t = 0, e = this._clip.hideSlotTimelineNameMap.length; e > t; t++) {
                s = this._clip.hideSlotTimelineNameMap[t];
                var a = this._armature.getSlot(s);
                a && a._resetToOrigin()
            }
        }, s.setAdditiveBlending = function (t) {
            return this.additiveBlending = t, this
        }, s.setAutoFadeOut = function (t, e) {
            return void 0 === e && (e = -1), this.autoFadeOut = t, e >= 0 && (this.fadeOutTime = e * this._timeScale), this
        }, s.setWeight = function (t) {
            return (isNaN(t) || 0 > t) && (t = 1), this.weight = t, this
        }, s.setFrameTween = function (t, e) {
            return this.autoTween = t, this.lastFrameAutoTween = e, this
        }, s.setCurrentTime = function (t) {
            return (0 > t || isNaN(t)) && (t = 0), this._time = t, this._currentTime = 1e3 * this._time, this
        }, s.setTimeScale = function (t) {
            return (isNaN(t) || t == 1 / 0) && (t = 1), this._timeScale = t, this
        }, s.setPlayTimes = function (t) {
            return void 0 === t && (t = 0), Math.round(.001 * this._totalTime * this._clip.frameRate) < 2 ? this._playTimes = 0 > t ? -1 : 1 : this._playTimes = 0 > t ? -t : t, this.autoFadeOut = 0 > t, this
        }, i(s, "name", function () {
            return this._name
        }), i(s, "layer", function () {
            return this._layer
        }), i(s, "group", function () {
            return this._group
        }), i(s, "clip", function () {
            return this._clip
        }), i(s, "isComplete", function () {
            return this._isComplete
        }), i(s, "isPlaying", function () {
            return this._isPlaying && !this._isComplete
        }), i(s, "currentPlayTimes", function () {
            return this._currentPlayTimes < 0 ? 0 : this._currentPlayTimes
        }), i(s, "totalTime", function () {
            return .001 * this._totalTime
        }), i(s, "currentTime", function () {
            return this._currentTime < 0 ? 0 : .001 * this._currentTime
        }), i(s, "fadeWeight", function () {
            return this._fadeWeight
        }), i(s, "fadeState", function () {
            return this._fadeState
        }), i(s, "fadeTotalTime", function () {
            return this._fadeTotalTime
        }), i(s, "timeScale", function () {
            return this._timeScale
        }), i(s, "playTimes", function () {
            return this._playTimes
        }), e._pool = [], e
    }();
    t.AnimationState = e, egret.registerClass(e, "dragonBones.AnimationState")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function e() {
            this._totalTime = 0, this._currentTime = 0, this._currentFrameIndex = 0, this._currentFramePosition = 0, this._currentFrameDuration = 0, this._updateMode = 0, this._durationColor = new t.ColorTransform
        }

        var i = e, n = i.prototype;
        return e._borrowObject = function () {
            return 0 == e._pool.length ? new e : e._pool.pop()
        }, e._returnObject = function (t) {
            e._pool.indexOf(t) < 0 && (e._pool[e._pool.length] = t), t.clear()
        }, e._clear = function () {
            for (var t = e._pool.length; t--;) e._pool[t].clear();
            e._pool.length = 0
        }, n.clear = function () {
            this._slot && (this._slot._removeState(this), this._slot = null), this._armature = null, this._animation = null, this._animationState = null, this._timelineData = null
        }, n._fadeIn = function (t, e, i) {
            switch (this._slot = t, this._armature = this._slot.armature, this._animation = this._armature.animation, this._animationState = e, this._timelineData = i, this.name = i.name, this._totalTime = this._timelineData.duration, this._rawAnimationScale = this._animationState.clip.scale, this._isComplete = !1, this._blendEnabled = !1, this._tweenColor = !1, this._currentFrameIndex = -1, this._currentTime = -1, this._tweenEasing = NaN, this._weight = 1, this._timelineData.frameList.length) {
                case 0:
                    this._updateMode = 0;
                    break;
                case 1:
                    this._updateMode = 1;
                    break;
                default:
                    this._updateMode = -1
            }
            this._slot._addState(this)
        }, n._fadeOut = function () {
        }, n._update = function (t) {
            -1 == this._updateMode ? this.updateMultipleFrame(t) : 1 == this._updateMode && (this._updateMode = 0, this.updateSingleFrame())
        }, n.updateMultipleFrame = function (t) {
            var e = 0;
            t /= this._timelineData.scale, t += this._timelineData.offset;
            var i = this._totalTime * t, n = this._animationState.playTimes;
            if (0 == n) this._isComplete = !1, e = Math.ceil(Math.abs(i) / this._totalTime) || 1, i -= i >= 0 ? Math.floor(i / this._totalTime) * this._totalTime : Math.ceil(i / this._totalTime) * this._totalTime, 0 > i && (i += this._totalTime); else {
                var s = n * this._totalTime;
                i >= s ? (i = s, this._isComplete = !0) : -s >= i ? (i = -s, this._isComplete = !0) : this._isComplete = !1, 0 > i && (i += s), e = Math.ceil(i / this._totalTime) || 1, this._isComplete ? i = this._totalTime : i -= i >= 0 ? Math.floor(i / this._totalTime) * this._totalTime : Math.ceil(i / this._totalTime) * this._totalTime
            }
            if (this._currentTime != i) {
                this._currentTime = i;
                for (var a, r, o = this._timelineData.frameList, h = 0, l = this._timelineData.frameList.length; l > h; ++h) {
                    if (this._currentFrameIndex < 0) this._currentFrameIndex = 0; else {
                        if (!(this._currentTime < this._currentFramePosition || this._currentTime >= this._currentFramePosition + this._currentFrameDuration)) break;
                        if (this._currentFrameIndex++, this._currentFrameIndex >= o.length) {
                            if (this._isComplete) {
                                this._currentFrameIndex--;
                                break
                            }
                            this._currentFrameIndex = 0
                        }
                    }
                    r = o[this._currentFrameIndex], a && this._slot._arriveAtFrame(a, this, this._animationState, !0), this._currentFrameDuration = r.duration, this._currentFramePosition = r.position, a = r
                }
                r && (this._slot._arriveAtFrame(r, this, this._animationState, !1), this._blendEnabled = r.displayIndex >= 0, this._blendEnabled ? this.updateToNextFrame(e) : (this._tweenEasing = NaN, this._tweenColor = !1)), this._blendEnabled && this.updateTween()
            }
        }, n.updateToNextFrame = function (t) {
            void 0 === t && (t = 0);
            var e = this._currentFrameIndex + 1;
            e >= this._timelineData.frameList.length && (e = 0);
            var i = this._timelineData.frameList[this._currentFrameIndex], n = this._timelineData.frameList[e], s = !1;
            0 == e && (!this._animationState.lastFrameAutoTween || this._animationState.playTimes && this._animationState.currentPlayTimes >= this._animationState.playTimes && ((this._currentFramePosition + this._currentFrameDuration) / this._totalTime + t - this._timelineData.offset) * this._timelineData.scale > .999999) ? (this._tweenEasing = NaN, s = !1) : i.displayIndex < 0 || n.displayIndex < 0 ? (this._tweenEasing = NaN, s = !1) : this._animationState.autoTween ? (this._tweenEasing = this._animationState.clip.tweenEasing, isNaN(this._tweenEasing) ? (this._tweenEasing = i.tweenEasing, this._tweenCurve = i.curve, isNaN(this._tweenEasing) && null == this._tweenCurve ? s = !1 : (10 == this._tweenEasing && (this._tweenEasing = 0), s = !0)) : s = !0) : (this._tweenEasing = i.tweenEasing, this._tweenCurve = i.curve, !isNaN(this._tweenEasing) && 10 != this._tweenEasing || null != this._tweenCurve ? s = !0 : (this._tweenEasing = NaN, s = !1)), s ? i.color && n.color ? (this._durationColor.alphaOffset = n.color.alphaOffset - i.color.alphaOffset, this._durationColor.redOffset = n.color.redOffset - i.color.redOffset, this._durationColor.greenOffset = n.color.greenOffset - i.color.greenOffset, this._durationColor.blueOffset = n.color.blueOffset - i.color.blueOffset, this._durationColor.alphaMultiplier = n.color.alphaMultiplier - i.color.alphaMultiplier, this._durationColor.redMultiplier = n.color.redMultiplier - i.color.redMultiplier, this._durationColor.greenMultiplier = n.color.greenMultiplier - i.color.greenMultiplier, this._durationColor.blueMultiplier = n.color.blueMultiplier - i.color.blueMultiplier, this._durationColor.alphaOffset || this._durationColor.redOffset || this._durationColor.greenOffset || this._durationColor.blueOffset || this._durationColor.alphaMultiplier || this._durationColor.redMultiplier || this._durationColor.greenMultiplier || this._durationColor.blueMultiplier ? this._tweenColor = !0 : this._tweenColor = !1) : i.color ? (this._tweenColor = !0, this._durationColor.alphaOffset = -i.color.alphaOffset, this._durationColor.redOffset = -i.color.redOffset, this._durationColor.greenOffset = -i.color.greenOffset, this._durationColor.blueOffset = -i.color.blueOffset, this._durationColor.alphaMultiplier = 1 - i.color.alphaMultiplier, this._durationColor.redMultiplier = 1 - i.color.redMultiplier, this._durationColor.greenMultiplier = 1 - i.color.greenMultiplier, this._durationColor.blueMultiplier = 1 - i.color.blueMultiplier) : n.color ? (this._tweenColor = !0, this._durationColor.alphaOffset = n.color.alphaOffset, this._durationColor.redOffset = n.color.redOffset, this._durationColor.greenOffset = n.color.greenOffset, this._durationColor.blueOffset = n.color.blueOffset, this._durationColor.alphaMultiplier = n.color.alphaMultiplier - 1, this._durationColor.redMultiplier = n.color.redMultiplier - 1, this._durationColor.greenMultiplier = n.color.greenMultiplier - 1, this._durationColor.blueMultiplier = n.color.blueMultiplier - 1) : this._tweenColor = !1 : this._tweenColor = !1, !this._tweenColor && this._animationState.displayControl && (i.color ? this._slot._updateDisplayColor(i.color.alphaOffset, i.color.redOffset, i.color.greenOffset, i.color.blueOffset, i.color.alphaMultiplier, i.color.redMultiplier, i.color.greenMultiplier, i.color.blueMultiplier, !0) : this._slot._isColorChanged && this._slot._updateDisplayColor(0, 0, 0, 0, 1, 1, 1, 1, !1))
        }, n.updateTween = function () {
            var e = this._timelineData.frameList[this._currentFrameIndex];
            if (this._tweenColor && this._animationState.displayControl) {
                var i = (this._currentTime - this._currentFramePosition) / this._currentFrameDuration;
                null != this._tweenCurve ? i = this._tweenCurve.getValueByProgress(i) : this._tweenEasing && (i = t.MathUtil.getEaseValue(i, this._tweenEasing)), e.color ? this._slot._updateDisplayColor(e.color.alphaOffset + this._durationColor.alphaOffset * i, e.color.redOffset + this._durationColor.redOffset * i, e.color.greenOffset + this._durationColor.greenOffset * i, e.color.blueOffset + this._durationColor.blueOffset * i, e.color.alphaMultiplier + this._durationColor.alphaMultiplier * i, e.color.redMultiplier + this._durationColor.redMultiplier * i, e.color.greenMultiplier + this._durationColor.greenMultiplier * i, e.color.blueMultiplier + this._durationColor.blueMultiplier * i, !0) : this._slot._updateDisplayColor(this._durationColor.alphaOffset * i, this._durationColor.redOffset * i, this._durationColor.greenOffset * i, this._durationColor.blueOffset * i, 1 + this._durationColor.alphaMultiplier * i, 1 + this._durationColor.redMultiplier * i, 1 + this._durationColor.greenMultiplier * i, 1 + this._durationColor.blueMultiplier * i, !0)
            }
        }, n.updateSingleFrame = function () {
            var t = this._timelineData.frameList[0];
            this._slot._arriveAtFrame(t, this, this._animationState, !1), this._isComplete = !0, this._tweenEasing = NaN, this._tweenColor = !1, this._blendEnabled = t.displayIndex >= 0, this._blendEnabled && this._animationState.displayControl && (t.color ? this._slot._updateDisplayColor(t.color.alphaOffset, t.color.redOffset, t.color.greenOffset, t.color.blueOffset, t.color.alphaMultiplier, t.color.redMultiplier, t.color.greenMultiplier, t.color.blueMultiplier, !0) : this._slot._isColorChanged && this._slot._updateDisplayColor(0, 0, 0, 0, 1, 1, 1, 1, !1))
        }, e.HALF_PI = .5 * Math.PI, e.DOUBLE_PI = 2 * Math.PI, e._pool = [], e
    }();
    t.SlotTimelineState = e, egret.registerClass(e, "dragonBones.SlotTimelineState")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function e() {
            this._totalTime = 0, this._currentTime = 0, this._lastTime = 0, this._currentFrameIndex = 0, this._currentFramePosition = 0, this._currentFrameDuration = 0, this._updateMode = 0, this._transform = new t.DBTransform, this._pivot = new t.Point, this._durationTransform = new t.DBTransform, this._durationPivot = new t.Point, this._durationColor = new t.ColorTransform
        }

        var i = e, n = i.prototype;
        return e._borrowObject = function () {
            return 0 == e._pool.length ? new e : e._pool.pop()
        }, e._returnObject = function (t) {
            e._pool.indexOf(t) < 0 && (e._pool[e._pool.length] = t), t.clear()
        }, e._clear = function () {
            for (var t = e._pool.length; t--;) e._pool[t].clear();
            e._pool.length = 0
        }, n.clear = function () {
            this._bone && (this._bone._removeState(this), this._bone = null), this._armature = null, this._animation = null, this._animationState = null, this._timelineData = null, this._originTransform = null, this._originPivot = null
        }, n._fadeIn = function (t, e, i) {
            switch (this._bone = t, this._armature = this._bone.armature, this._animation = this._armature.animation, this._animationState = e, this._timelineData = i, this._originTransform = this._timelineData.originTransform, this._originPivot = this._timelineData.originPivot, this.name = i.name, this._totalTime = this._timelineData.duration, this._rawAnimationScale = this._animationState.clip.scale, this._isComplete = !1, this._tweenTransform = !1, this._tweenScale = !1, this._currentFrameIndex = -1, this._currentTime = -1, this._tweenEasing = NaN, this._weight = 1, this._transform.x = 0, this._transform.y = 0, this._transform.scaleX = 1, this._transform.scaleY = 1, this._transform.skewX = 0, this._transform.skewY = 0, this._pivot.x = 0, this._pivot.y = 0, this._durationTransform.x = 0, this._durationTransform.y = 0, this._durationTransform.scaleX = 1, this._durationTransform.scaleY = 1, this._durationTransform.skewX = 0, this._durationTransform.skewY = 0, this._durationPivot.x = 0, this._durationPivot.y = 0, this._timelineData.frameList.length) {
                case 0:
                    this._updateMode = 0;
                    break;
                case 1:
                    this._updateMode = 1;
                    break;
                default:
                    this._updateMode = -1
            }
            this._bone._addState(this)
        }, n._fadeOut = function () {
            this._transform.skewX = t.TransformUtil.formatRadian(this._transform.skewX), this._transform.skewY = t.TransformUtil.formatRadian(this._transform.skewY)
        }, n._update = function (t) {
            -1 == this._updateMode ? this.updateMultipleFrame(t) : 1 == this._updateMode && (this._updateMode = 0, this.updateSingleFrame())
        }, n.updateMultipleFrame = function (t) {
            var e = 0;
            t /= this._timelineData.scale, t += this._timelineData.offset;
            var i = this._totalTime * t, n = this._animationState.playTimes;
            if (0 == n) this._isComplete = !1, e = Math.ceil(Math.abs(i) / this._totalTime) || 1, i -= i >= 0 ? Math.floor(i / this._totalTime) * this._totalTime : Math.ceil(i / this._totalTime) * this._totalTime, 0 > i && (i += this._totalTime); else {
                var s = n * this._totalTime;
                i >= s ? (i = s, this._isComplete = !0) : -s >= i ? (i = -s, this._isComplete = !0) : this._isComplete = !1, 0 > i && (i += s), e = Math.ceil(i / this._totalTime) || 1, this._isComplete ? i = this._totalTime : i -= i >= 0 ? Math.floor(i / this._totalTime) * this._totalTime : Math.ceil(i / this._totalTime) * this._totalTime
            }
            if (this._currentTime != i) {
                this._lastTime = this._currentTime, this._currentTime = i;
                for (var a, r, o = this._timelineData.frameList, h = 0, l = this._timelineData.frameList.length; l > h; ++h) {
                    if (this._currentFrameIndex < 0) this._currentFrameIndex = 0; else {
                        if (!(this._currentTime < this._currentFramePosition || this._currentTime >= this._currentFramePosition + this._currentFrameDuration || this._currentTime < this._lastTime)) break;
                        if (this._currentFrameIndex++, this._lastTime = this._currentTime, this._currentFrameIndex >= o.length) {
                            if (this._isComplete) {
                                this._currentFrameIndex--;
                                break
                            }
                            this._currentFrameIndex = 0
                        }
                    }
                    r = o[this._currentFrameIndex], a && this._bone._arriveAtFrame(a, this, this._animationState, !0), this._currentFrameDuration = r.duration, this._currentFramePosition = r.position, a = r
                }
                r && (this._bone._arriveAtFrame(r, this, this._animationState, !1), this.updateToNextFrame(e)), this.updateTween()
            }
        }, n.updateToNextFrame = function (e) {
            void 0 === e && (e = 0);
            var i = this._currentFrameIndex + 1;
            i >= this._timelineData.frameList.length && (i = 0);
            var n = this._timelineData.frameList[this._currentFrameIndex], s = this._timelineData.frameList[i], a = !1;
            0 == i && (!this._animationState.lastFrameAutoTween || this._animationState.playTimes && this._animationState.currentPlayTimes >= this._animationState.playTimes && ((this._currentFramePosition + this._currentFrameDuration) / this._totalTime + e - this._timelineData.offset) * this._timelineData.scale > .999999) ? (this._tweenEasing = NaN, a = !1) : n.displayIndex < 0 || s.displayIndex < 0 ? (this._tweenEasing = NaN, a = !1) : this._animationState.autoTween ? (this._tweenEasing = this._animationState.clip.tweenEasing, isNaN(this._tweenEasing) ? (this._tweenEasing = n.tweenEasing, this._tweenCurve = n.curve, isNaN(this._tweenEasing) && null == this._tweenCurve ? a = !1 : (10 == this._tweenEasing && (this._tweenEasing = 0), a = !0)) : a = !0) : (this._tweenEasing = n.tweenEasing, this._tweenCurve = n.curve, !isNaN(this._tweenEasing) && 10 != this._tweenEasing || null != this._tweenCurve ? a = !0 : (this._tweenEasing = NaN, a = !1)), a ? (this._durationTransform.x = s.transform.x - n.transform.x, this._durationTransform.y = s.transform.y - n.transform.y, this._durationTransform.skewX = s.transform.skewX - n.transform.skewX, this._durationTransform.skewY = s.transform.skewY - n.transform.skewY, this._durationTransform.scaleX = s.transform.scaleX - n.transform.scaleX + s.scaleOffset.x, this._durationTransform.scaleY = s.transform.scaleY - n.transform.scaleY + s.scaleOffset.y, this._durationTransform.normalizeRotation(), 0 == i && (this._durationTransform.skewX = t.TransformUtil.formatRadian(this._durationTransform.skewX), this._durationTransform.skewY = t.TransformUtil.formatRadian(this._durationTransform.skewY)), this._durationPivot.x = s.pivot.x - n.pivot.x, this._durationPivot.y = s.pivot.y - n.pivot.y, this._durationTransform.x || this._durationTransform.y || this._durationTransform.skewX || this._durationTransform.skewY || this._durationTransform.scaleX || this._durationTransform.scaleY || this._durationPivot.x || this._durationPivot.y ? (this._tweenTransform = !0, this._tweenScale = n.tweenScale) : (this._tweenTransform = !1, this._tweenScale = !1)) : (this._tweenTransform = !1, this._tweenScale = !1), this._tweenTransform ? this._tweenScale || (this._animationState.additiveBlending ? (this._transform.scaleX = n.transform.scaleX, this._transform.scaleY = n.transform.scaleY) : (this._transform.scaleX = this._originTransform.scaleX * n.transform.scaleX, this._transform.scaleY = this._originTransform.scaleY * n.transform.scaleY)) : (this._animationState.additiveBlending ? (this._transform.x = n.transform.x, this._transform.y = n.transform.y, this._transform.skewX = n.transform.skewX, this._transform.skewY = n.transform.skewY, this._transform.scaleX = n.transform.scaleX, this._transform.scaleY = n.transform.scaleY, this._pivot.x = n.pivot.x, this._pivot.y = n.pivot.y) : (this._transform.x = this._originTransform.x + n.transform.x, this._transform.y = this._originTransform.y + n.transform.y, this._transform.skewX = this._originTransform.skewX + n.transform.skewX, this._transform.skewY = this._originTransform.skewY + n.transform.skewY, this._transform.scaleX = this._originTransform.scaleX * n.transform.scaleX, this._transform.scaleY = this._originTransform.scaleY * n.transform.scaleY, this._pivot.x = this._originPivot.x + n.pivot.x, this._pivot.y = this._originPivot.y + n.pivot.y), this._bone.invalidUpdate())
        }, n.updateTween = function () {
            var e = this._timelineData.frameList[this._currentFrameIndex];
            if (this._tweenTransform) {
                var i = (this._currentTime - this._currentFramePosition) / this._currentFrameDuration;
                null != this._tweenCurve ? i = this._tweenCurve.getValueByProgress(i) : this._tweenEasing && (i = t.MathUtil.getEaseValue(i, this._tweenEasing));
                var n = e.transform, s = e.pivot;
                this._animationState.additiveBlending ? (this._transform.x = n.x + this._durationTransform.x * i, this._transform.y = n.y + this._durationTransform.y * i, this._transform.skewX = n.skewX + this._durationTransform.skewX * i, this._transform.skewY = n.skewY + this._durationTransform.skewY * i, this._tweenScale && (this._transform.scaleX = n.scaleX + this._durationTransform.scaleX * i, this._transform.scaleY = n.scaleY + this._durationTransform.scaleY * i), this._pivot.x = s.x + this._durationPivot.x * i, this._pivot.y = s.y + this._durationPivot.y * i) : (this._transform.x = this._originTransform.x + n.x + this._durationTransform.x * i, this._transform.y = this._originTransform.y + n.y + this._durationTransform.y * i, this._transform.skewX = this._originTransform.skewX + n.skewX + this._durationTransform.skewX * i, this._transform.skewY = this._originTransform.skewY + n.skewY + this._durationTransform.skewY * i, this._tweenScale && (this._transform.scaleX = this._originTransform.scaleX * n.scaleX + this._durationTransform.scaleX * i, this._transform.scaleY = this._originTransform.scaleY * n.scaleY + this._durationTransform.scaleY * i), this._pivot.x = this._originPivot.x + s.x + this._durationPivot.x * i, this._pivot.y = this._originPivot.y + s.y + this._durationPivot.y * i), this._bone.invalidUpdate()
            }
        }, n.updateSingleFrame = function () {
            var t = this._timelineData.frameList[0];
            this._bone._arriveAtFrame(t, this, this._animationState, !1), this._isComplete = !0, this._tweenEasing = NaN, this._tweenTransform = !1, this._tweenScale = !1, this._tweenColor = !1, this._animationState.additiveBlending ? (this._transform.x = t.transform.x, this._transform.y = t.transform.y, this._transform.skewX = t.transform.skewX, this._transform.skewY = t.transform.skewY, this._transform.scaleX = t.transform.scaleX, this._transform.scaleY = t.transform.scaleY, this._pivot.x = t.pivot.x, this._pivot.y = t.pivot.y) : (this._transform.x = this._originTransform.x + t.transform.x, this._transform.y = this._originTransform.y + t.transform.y, this._transform.skewX = this._originTransform.skewX + t.transform.skewX, this._transform.skewY = this._originTransform.skewY + t.transform.skewY, this._transform.scaleX = this._originTransform.scaleX * t.transform.scaleX, this._transform.scaleY = this._originTransform.scaleY * t.transform.scaleY, this._pivot.x = this._originPivot.x + t.pivot.x, this._pivot.y = this._originPivot.y + t.pivot.y), this._bone.invalidUpdate()
        }, e.HALF_PI = .5 * Math.PI, e.DOUBLE_PI = 2 * Math.PI, e._pool = [], e
    }();
    t.TimelineState = e, egret.registerClass(e, "dragonBones.TimelineState")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function t(t, e) {
            void 0 === t && (t = -1), void 0 === e && (e = 1), this._time = t >= 0 ? t : .001 * (new Date).getTime(), this._timeScale = isNaN(e) ? 1 : e, this._animatableList = []
        }

        var e = __define, i = t, n = i.prototype;
        return e(n, "time", function () {
            return this._time
        }), e(n, "timeScale", function () {
            return this._timeScale
        }, function (t) {
            (isNaN(t) || 0 > t) && (t = 1), this._timeScale = t
        }), n.contains = function (t) {
            return this._animatableList.indexOf(t) >= 0
        }, n.add = function (t) {
            t && -1 == this._animatableList.indexOf(t) && this._animatableList.push(t)
        }, n.remove = function (t) {
            var e = this._animatableList.indexOf(t);
            e >= 0 && (this._animatableList[e] = null)
        }, n.clear = function () {
            this._animatableList.length = 0
        }, n.advanceTime = function (t) {
            if (void 0 === t && (t = -1), 0 > t && (t = .001 * (new Date).getTime() - this._time), t *= this._timeScale, this._time += t, this._length = this._animatableList.length, 0 != this._length) {
                for (this._currentIndex = 0, this._i = 0; this._i < this._length; this._i++) this._animatable = this._animatableList[this._i], this._animatable && (this._currentIndex != this._i && (this._animatableList[this._currentIndex] = this._animatable, this._animatableList[this._i] = null), this._animatable.advanceTime(t), this._currentIndex++);
                if (this._currentIndex != this._i) {
                    for (this._length = this._animatableList.length; this._i < this._length;) this._animatableList[this._currentIndex++] = this._animatableList[this._i++];
                    this._animatableList.length = this._currentIndex
                }
            }
        }, t.clock = new t, t
    }();
    t.WorldClock = e, egret.registerClass(e, "dragonBones.WorldClock", ["dragonBones.IAnimatable"])
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (t) {
        function e(e) {
            void 0 === e && (e = null), t.call(this, e)
        }

        __extends(e, t);
        var i = e;
        return i.prototype, e
    }(egret.EventDispatcher);
    t.EventDispatcher = e, egret.registerClass(e, "dragonBones.EventDispatcher")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (t) {
        function e() {
            if (t.call(this), e._instance) throw new Error("Singleton already constructed!")
        }

        __extends(e, t);
        var i = e;
        return i.prototype, e.getInstance = function () {
            return e._instance || (e._instance = new e), e._instance
        }, e
    }(t.EventDispatcher);
    t.SoundEventManager = e, egret.registerClass(e, "dragonBones.SoundEventManager")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (e) {
        function i(i) {
            e.call(this), this._boneIKList = [], this._display = i, this._animation = new t.Animation(this), this._slotsZOrderChanged = !1, this._slotList = [], this._boneList = [], this._eventList = [], this._ikList = [], this._delayDispose = !1, this._lockDispose = !1, this._armatureData = null
        }

        __extends(i, e);
        var n = __define, s = i, a = s.prototype;
        return n(a, "armatureData", function () {
            return this._armatureData
        }), n(a, "display", function () {
            return this._display
        }), a.getDisplay = function () {
            return this._display
        }, n(a, "animation", function () {
            return this._animation
        }), a.dispose = function () {
            if (this._delayDispose = !0, this._animation && !this._lockDispose) {
                this.userData = null, this._animation.dispose();
                for (var t = this._slotList.length; t--;) this._slotList[t].dispose();
                for (t = this._boneList.length; t--;) this._boneList[t].dispose();
                for (t = this._ikList.length; t--;) this._ikList[t].dispose();
                this._armatureData = null, this._animation = null, this._slotList = null, this._boneList = null, this._eventList = null, this._ikList = null
            }
        }, a.invalidUpdate = function (t) {
            if (void 0 === t && (t = null), t) {
                var e = this.getBone(t);
                e && e.invalidUpdate()
            } else for (var i = this._boneList.length; i--;) this._boneList[i].invalidUpdate()
        }, a.advanceTime = function (e) {
            this._lockDispose = !0, this._animation._advanceTime(e), e *= this._animation.timeScale, this._isFading = this._animation._isFading;
            var i, n, s, a = this._boneIKList.length;
            for (this._i = 0; this._i < a; this._i++) for (n = 0, s = this._boneIKList[this._i].length; s > n; n++) i = this._boneIKList[this._i][n], i._update(this._isFading), i.rotationIK = i.global.rotation, 0 != this._i && i.isIKConstraint && (this._ikList[this._i - 1].compute(), i.adjustGlobalTransformMatrixByIK());
            for (this._i = this._slotList.length; this._i--;) if (this._tmpSlot = this._slotList[this._i], this._tmpSlot._update(), this._tmpSlot._isShowDisplay) {
                var r = this._tmpSlot.childArmature;
                r && r.advanceTime(e)
            }
            if (this._slotsZOrderChanged && (this.updateSlotsZOrder(), this.hasEventListener(t.ArmatureEvent.Z_ORDER_UPDATED) && this.dispatchEvent(new t.ArmatureEvent(t.ArmatureEvent.Z_ORDER_UPDATED))), this._eventList.length > 0) {
                for (this._i = 0, this._len = this._eventList.length; this._i < this._len; this._i++) {
                    var o = this._eventList[this._i];
                    this.dispatchEvent(o)
                }
                this._eventList.length = 0
            }
            this._lockDispose = !1, this._delayDispose && this.dispose()
        }, a.resetAnimation = function () {
            this.animation.stop(), this.animation._resetAnimationStateList();
            for (var t = 0, e = this._boneList.length; e > t; t++) this._boneList[t]._removeAllStates()
        }, a.getSlots = function (t) {
            return void 0 === t && (t = !0), t ? this._slotList.concat() : this._slotList
        }, a.getSlot = function (t) {
            for (var e = this._slotList.length, i = 0; e > i; i++) {
                var n = this._slotList[i];
                if (n.name == t) return n
            }
            return null
        }, a.getSlotByDisplay = function (t) {
            if (t) for (var e = this._slotList.length, i = 0; e > i; i++) {
                var n = this._slotList[i];
                if (n.display == t) return n
            }
            return null
        }, a.addSlot = function (t, e) {
            var i = this.getBone(e);
            if (!i) throw new Error;
            i.addSlot(t)
        }, a.removeSlot = function (t) {
            if (!t || t.armature != this) throw new Error;
            t.parent.removeSlot(t)
        }, a.removeSlotByName = function (t) {
            var e = this.getSlot(t);
            return e && this.removeSlot(e), e
        }, a.getBones = function (t) {
            return void 0 === t && (t = !0), t ? this._boneList.concat() : this._boneList
        }, a.getBone = function (t) {
            for (var e = this._boneList.length, i = 0; e > i; i++) {
                var n = this._boneList[i];
                if (n.name == t) return n
            }
            return null
        }, a.getBoneByDisplay = function (t) {
            var e = this.getSlotByDisplay(t);
            return e ? e.parent : null
        }, a.addBone = function (t, e, i) {
            void 0 === e && (e = null), void 0 === i && (i = !1);
            var n;
            if (e && (n = this.getBone(e), !n)) throw new Error;
            n ? n.addChildBone(t, i) : (t.parent && t.parent.removeChildBone(t, i), t._setArmature(this), i || this._updateAnimationAfterBoneListChanged())
        }, a.removeBone = function (t, e) {
            if (void 0 === e && (e = !1), !t || t.armature != this) throw new Error;
            t.parent ? t.parent.removeChildBone(t, e) : (t._setArmature(null), e || this._updateAnimationAfterBoneListChanged(!1))
        }, a.removeBoneByName = function (t) {
            var e = this.getBone(t);
            return e && this.removeBone(e), e
        }, a._addBoneToBoneList = function (t) {
            this._boneList.indexOf(t) < 0 && (this._boneList[this._boneList.length] = t)
        }, a._removeBoneFromBoneList = function (t) {
            var e = this._boneList.indexOf(t);
            e >= 0 && this._boneList.splice(e, 1)
        }, a._addSlotToSlotList = function (t) {
            this._slotList.indexOf(t) < 0 && (this._slotList[this._slotList.length] = t)
        }, a._removeSlotFromSlotList = function (t) {
            var e = this._slotList.indexOf(t);
            e >= 0 && this._slotList.splice(e, 1)
        }, a.updateSlotsZOrder = function () {
            this._slotList.sort(this.sortSlot);
            for (var t = this._slotList.length; t--;) {
                var e = this._slotList[t];
                e._isShowDisplay && e._addDisplayToContainer(this._display)
            }
            this._slotsZOrderChanged = !1
        }, a._updateAnimationAfterBoneListChanged = function (t) {
            void 0 === t && (t = !0), t && this.sortBoneList(), this._animation._updateAnimationStates()
        }, a.sortBoneList = function () {
            var e = this._boneList.length;
            if (0 != e) {
                for (var i = []; e--;) {
                    for (var n = 0, s = this._boneList[e], a = s; a;) n++, a = a.parent;
                    i[e] = [n, s]
                }
                for (i.sort(t.ArmatureData.sortBoneDataHelpArrayDescending), e = i.length; e--;) this._boneList[e] = i[e][1];
                i.length = 0
            }
        }, a._arriveAtFrame = function (e, n, s, a) {
            if (e.event && this.hasEventListener(t.FrameEvent.ANIMATION_FRAME_EVENT)) {
                var r = new t.FrameEvent(t.FrameEvent.ANIMATION_FRAME_EVENT);
                r.animationState = s, r.frameLabel = e.event, this._eventList.push(r)
            }
            if (e.sound && i._soundManager.hasEventListener(t.SoundEvent.SOUND)) {
                var o = new t.SoundEvent(t.SoundEvent.SOUND);
                o.armature = this, o.animationState = s, o.sound = e.sound, i._soundManager.dispatchEvent(o)
            }
            e.action && s.displayControl && this.animation.gotoAndPlay(e.action)
        }, a.sortSlot = function (t, e) {
            return t.zOrder < e.zOrder ? 1 : -1
        }, a.getAnimation = function () {
            return this._animation
        }, a.getIKs = function (t) {
            return void 0 === t && (t = !0), t ? this._ikList.concat() : this._ikList
        }, a.buildIK = function () {
            var e;
            this._ikList.length = 0;
            for (var i = 0, n = this._armatureData.ikDataList.length; n > i; i++) e = this._armatureData.ikDataList[i], this._ikList.push(new t.IKConstraint(e, this))
        }, a.updateBoneCache = function () {
            this._boneList.reverse();
            var t, e, i, n, s = {}, a = this._ikList.length, r = a + 1;
            for (this._boneIKList = []; this._boneIKList.length < r;) this._boneIKList[this._boneIKList.length] = [];
            for (s[this._boneList[0].name] = 0, t = 0, e = this._ikList.length; e > t; t++) s[this._ikList[t].bones[0].name] = t + 1;
            t:for (t = 0, e = this._boneList.length; e > t; t++) for (i = this._boneList[t], n = i; n;) {
                if (null == n.parent && (s[n.name] = 0), s.hasOwnProperty(n.name)) {
                    this._boneIKList[s[n.name]].push(i);
                    continue t
                }
                n = n.parent
            }
        }, a.getIKTargetData = function (t) {
            for (var e, i = [], n = 0, s = this._ikList.length; s > n; n++) e = this._ikList[n], t.name == e.target.name && i.push(e);
            return i
        }, i._soundManager = t.SoundEventManager.getInstance(), i
    }(t.EventDispatcher);
    t.Armature = e, egret.registerClass(e, "dragonBones.Armature", ["dragonBones.IAnimatable"])
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function t() {
            this.a = 1, this.b = 0,
                this.c = 0, this.d = 1, this.tx = 0, this.ty = 0
        }

        var e = t, i = e.prototype;
        return i.invert = function () {
            var t = this.a, e = this.b, i = this.c, n = this.d, s = this.tx, a = t * n - e * i;
            this.a = n / a, this.b = -e / a, this.c = -i / a, this.d = t / a, this.tx = (i * this.ty - n * s) / a, this.ty = -(t * this.ty - e * s) / a
        }, i.concat = function (t) {
            var e = t.a, i = t.b, n = t.c, s = t.d, a = this.tx, r = this.ty;
            if (1 != e || 0 != i || 0 != n || 1 != s) {
                var o = this.a, h = this.b, l = this.c, u = this.d;
                this.a = o * e + h * n, this.b = o * i + h * s, this.c = l * e + u * n, this.d = l * i + u * s
            }
            this.tx = a * e + r * n + t.tx, this.ty = a * i + r * s + t.ty
        }, i.copyFrom = function (t) {
            this.tx = t.tx, this.ty = t.ty, this.a = t.a, this.b = t.b, this.c = t.c, this.d = t.d
        }, t
    }();
    t.Matrix = e, egret.registerClass(e, "dragonBones.Matrix")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function e() {
            this.x = 0, this.y = 0, this.skewX = 0, this.skewY = 0, this.scaleX = 1, this.scaleY = 1
        }

        var i = __define, n = e, s = n.prototype;
        return i(s, "rotation", function () {
            return this.skewX
        }, function (t) {
            this.skewX = this.skewY = t
        }), s.copy = function (t) {
            this.x = t.x, this.y = t.y, this.skewX = t.skewX, this.skewY = t.skewY, this.scaleX = t.scaleX, this.scaleY = t.scaleY
        }, s.add = function (t) {
            this.x += t.x, this.y += t.y, this.skewX += t.skewX, this.skewY += t.skewY, this.scaleX *= t.scaleX, this.scaleY *= t.scaleY
        }, s.minus = function (t) {
            this.x -= t.x, this.y -= t.y, this.skewX -= t.skewX, this.skewY -= t.skewY, this.scaleX /= t.scaleX, this.scaleY /= t.scaleY
        }, s.normalizeRotation = function () {
            this.skewX = t.TransformUtil.normalizeRotation(this.skewX), this.skewY = t.TransformUtil.normalizeRotation(this.skewY)
        }, s.clone = function () {
            var t = new e;
            return t.copy(this), t
        }, s.toString = function () {
            var t = "x:" + this.x + " y:" + this.y + " skewX:" + this.skewX + " skewY:" + this.skewY + " scaleX:" + this.scaleX + " scaleY:" + this.scaleY;
            return t
        }, e
    }();
    t.DBTransform = e, egret.registerClass(e, "dragonBones.DBTransform")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function e() {
            this._globalTransformMatrix = new t.Matrix, this._global = new t.DBTransform, this._origin = new t.DBTransform, this._offset = new t.DBTransform, this._offset.scaleX = this._offset.scaleY = 1, this._visible = !0, this._armature = null, this._parent = null, this.userData = null, this.inheritRotation = !0, this.inheritScale = !0, this.inheritTranslation = !0
        }

        var i = __define, n = e, s = n.prototype;
        return i(s, "global", function () {
            return this._global
        }), i(s, "origin", function () {
            return this._origin
        }), i(s, "offset", function () {
            return this._offset
        }), i(s, "armature", function () {
            return this._armature
        }), s._setArmature = function (t) {
            this._armature = t
        }, i(s, "parent", function () {
            return this._parent
        }), s._setParent = function (t) {
            this._parent = t
        }, s.dispose = function () {
            this.userData = null, this._globalTransformMatrix = null, this._global = null, this._origin = null, this._offset = null, this._armature = null, this._parent = null
        }, s._calculateRelativeParentTransform = function () {
        }, s._calculateParentTransform = function () {
            if (this.parent && (this.inheritTranslation || this.inheritRotation || this.inheritScale)) {
                var e = this._parent._globalTransformForChild, i = this._parent._globalTransformMatrixForChild;
                return t.ParentTransformObject.create().setTo(e, i)
            }
            return t.TransformUtil.transformToMatrix(this._global, this._globalTransformMatrix), null
        }, s._updateGlobal = function () {
            this._calculateRelativeParentTransform();
            var e = this._calculateParentTransform();
            if (null != e) {
                var i = e.parentGlobalTransformMatrix, n = e.parentGlobalTransform, s = this._global.x,
                    a = this._global.y;
                this._global.x = i.a * s + i.c * a + i.tx, this._global.y = i.d * a + i.b * s + i.ty, this.inheritRotation && (this._global.skewX += n.skewX, this._global.skewY += n.skewY), this.inheritScale && (this._global.scaleX *= n.scaleX, this._global.scaleY *= n.scaleY)
            }
            return t.TransformUtil.transformToMatrix(this._global, this._globalTransformMatrix), e
        }, e._tempParentGlobalTransformMatrix = new t.Matrix, e._tempParentGlobalTransform = new t.DBTransform, e
    }();
    t.DBObject = e, egret.registerClass(e, "dragonBones.DBObject")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (e) {
        function i() {
            e.call(this), this.applyOffsetTranslationToChild = !0, this.applyOffsetRotationToChild = !0, this.applyOffsetScaleToChild = !1, this.isIKConstraint = !1, this.childrenBones = [], this._needUpdate = 0, this._tween = new t.DBTransform, this._tweenPivot = new t.Point, this._tween.scaleX = this._tween.scaleY = 1, this._boneList = [], this._slotList = [], this._timelineStateList = [], this._needUpdate = 2, this._isColorChanged = !1
        }

        __extends(i, e);
        var n = __define, s = i, a = s.prototype;
        return i.initWithBoneData = function (t) {
            var e = new i;
            return e.name = t.name, e.length = t.length, e.inheritRotation = t.inheritRotation, e.inheritScale = t.inheritScale, e.origin.copy(t.transform), e
        }, a.dispose = function () {
            if (this._boneList) {
                e.prototype.dispose.call(this);
                for (var t = this._boneList.length; t--;) this._boneList[t].dispose();
                for (t = this._slotList.length; t--;) this._slotList[t].dispose();
                this._tween = null, this._tweenPivot = null, this._boneList = null, this._slotList = null, this._timelineStateList = null
            }
        }, a.contains = function (t) {
            if (!t) throw new Error;
            if (t == this) return !1;
            for (var e = t; e != this && null != e;) e = e.parent;
            return e == this
        }, a.addChildBone = function (t, e) {
            if (void 0 === e && (e = !1), !t) throw new Error;
            if (t == this || t.contains(this)) throw new Error;
            if (t.parent != this) {
                t.parent && t.parent.removeChildBone(t, e), this._boneList[this._boneList.length] = t, t._setParent(this), t._setArmature(this._armature);
                var i = this.childrenBones.indexOf(t);
                0 > i && this.childrenBones.push(t), this._armature && !e && this._armature._updateAnimationAfterBoneListChanged()
            }
        }, a.removeChildBone = function (t, e) {
            if (void 0 === e && (e = !1), !t) throw new Error;
            var i = this._boneList.indexOf(t);
            if (0 > i) throw new Error;
            this._boneList.splice(i, 1), t._setParent(null), t._setArmature(null);
            var n = this.childrenBones.indexOf(t);
            n >= 0 && this.childrenBones.splice(n, 1), this._armature && !e && this._armature._updateAnimationAfterBoneListChanged(!1)
        }, a.addSlot = function (t) {
            if (!t) throw new Error;
            t.parent && t.parent.removeSlot(t), this._slotList[this._slotList.length] = t, t._setParent(this), t.setArmature(this._armature)
        }, a.removeSlot = function (t) {
            if (!t) throw new Error;
            var e = this._slotList.indexOf(t);
            if (0 > e) throw new Error;
            this._slotList.splice(e, 1), t._setParent(null), t.setArmature(null)
        }, a._setArmature = function (t) {
            if (this._armature != t) {
                this._armature && (this._armature._removeBoneFromBoneList(this), this._armature._updateAnimationAfterBoneListChanged(!1)), this._armature = t, this._armature && this._armature._addBoneToBoneList(this);
                for (var e = this._boneList.length; e--;) this._boneList[e]._setArmature(this._armature);
                for (e = this._slotList.length; e--;) this._slotList[e].setArmature(this._armature)
            }
        }, a.getBones = function (t) {
            return void 0 === t && (t = !0), t ? this._boneList.concat() : this._boneList
        }, a.getSlots = function (t) {
            return void 0 === t && (t = !0), t ? this._slotList.concat() : this._slotList
        }, a.invalidUpdate = function () {
            this._needUpdate = 2, this.operationInvalidUpdate(this);
            var t, e;
            for (t = 0, e = this.childrenBones.length; e > t; t++) 2 != this.childrenBones[t]._needUpdate && (this.operationInvalidUpdate(this.childrenBones[t]), this.childrenBones[t].invalidUpdate())
        }, a.operationInvalidUpdate = function (t) {
            var e, i, n, s, a, r, o = this.armature.getIKTargetData(t);
            for (e = 0, i = o.length; i > e; e++) for (a = o[e], n = 0, s = a.bones.length; s > n; n++) r = a.bones[n], 2 != r._needUpdate && r.invalidUpdate()
        }, a._calculateRelativeParentTransform = function () {
            this._global.scaleX = this._origin.scaleX * this._tween.scaleX * this._offset.scaleX, this._global.scaleY = this._origin.scaleY * this._tween.scaleY * this._offset.scaleY, this._global.skewX = this._origin.skewX + this._tween.skewX + this._offset.skewX, this._global.skewY = this._origin.skewY + this._tween.skewY + this._offset.skewY, this._global.x = this._origin.x + this._tween.x + this._offset.x, this._global.y = this._origin.y + this._tween.y + this._offset.y
        }, a._update = function (e) {
            if (void 0 === e && (e = !1), this._needUpdate--, e || this._needUpdate > 0 || this._parent && this._parent._needUpdate > 0) {
                this._needUpdate = 1, this.blendingTimeline();
                var i, n, s = this._updateGlobal();
                s && (i = s.parentGlobalTransform, n = s.parentGlobalTransformMatrix, s.release());
                var a = 0 != this._offset.x || 0 != this._offset.y,
                    r = 1 != this._offset.scaleX || 1 != this._offset.scaleY,
                    o = 0 != this._offset.skewX || 0 != this._offset.skewY;
                a && !this.applyOffsetTranslationToChild || r && !this.applyOffsetScaleToChild || o && !this.applyOffsetRotationToChild ? (this._tempGlobalTransformForChild || (this._tempGlobalTransformForChild = new t.DBTransform), this._globalTransformForChild = this._tempGlobalTransformForChild, this._tempGlobalTransformMatrixForChild || (this._tempGlobalTransformMatrixForChild = new t.Matrix), this._globalTransformMatrixForChild = this._tempGlobalTransformMatrixForChild, this._globalTransformForChild.x = this._origin.x + this._tween.x, this._globalTransformForChild.y = this._origin.y + this._tween.y, this._globalTransformForChild.scaleX = this._origin.scaleX * this._tween.scaleX, this._globalTransformForChild.scaleY = this._origin.scaleY * this._tween.scaleY, this._globalTransformForChild.skewX = this._origin.skewX + this._tween.skewX, this._globalTransformForChild.skewY = this._origin.skewY + this._tween.skewY, this.applyOffsetTranslationToChild && (this._globalTransformForChild.x += this._offset.x, this._globalTransformForChild.y += this._offset.y), this.applyOffsetScaleToChild && (this._globalTransformForChild.scaleX *= this._offset.scaleX, this._globalTransformForChild.scaleY *= this._offset.scaleY), this.applyOffsetRotationToChild && (this._globalTransformForChild.skewX += this._offset.skewX, this._globalTransformForChild.skewY += this._offset.skewY), t.TransformUtil.transformToMatrix(this._globalTransformForChild, this._globalTransformMatrixForChild), n && (this._globalTransformMatrixForChild.concat(n), t.TransformUtil.matrixToTransform(this._globalTransformMatrixForChild, this._globalTransformForChild, this._globalTransformForChild.scaleX * i.scaleX >= 0, this._globalTransformForChild.scaleY * i.scaleY >= 0))) : (this._globalTransformForChild = this._global, this._globalTransformMatrixForChild = this._globalTransformMatrix)
            }
        }, a._updateColor = function (t, e, i, n, s, a, r, o, h) {
            for (var l = this._slotList.length, u = 0; l > u; u++) {
                var c = this._slotList[u];
                c._updateDisplayColor(t, e, i, n, s, a, r, o)
            }
            this._isColorChanged = h
        }, a.adjustGlobalTransformMatrixByIK = function () {
            this.parent && (this.global.rotation = this.rotationIK, t.TransformUtil.transformToMatrix(this.global, this._globalTransformMatrix), this._globalTransformForChild.rotation = this.rotationIK, t.TransformUtil.transformToMatrix(this._globalTransformForChild, this._globalTransformMatrixForChild))
        }, a._hideSlots = function () {
            for (var t = this._slotList.length, e = 0; t > e; e++) {
                var i = this._slotList[e];
                i._changeDisplay(-1)
            }
        }, a._arriveAtFrame = function (e, n, s, a) {
            var r = s.displayControl && (!this.displayController || this.displayController == s.name) && s.containsBoneMask(this.name);
            if (r) {
                var o, h = e;
                if (h.displayIndex, e.event && this._armature.hasEventListener(t.FrameEvent.BONE_FRAME_EVENT)) {
                    var l = new t.FrameEvent(t.FrameEvent.BONE_FRAME_EVENT);
                    l.bone = this, l.animationState = s, l.frameLabel = e.event, this._armature._eventList.push(l)
                }
                if (e.sound && i._soundManager.hasEventListener(t.SoundEvent.SOUND)) {
                    var u = new t.SoundEvent(t.SoundEvent.SOUND);
                    u.armature = this._armature, u.animationState = s, u.sound = e.sound, i._soundManager.dispatchEvent(u)
                }
                if (e.action) for (var c = this._slotList.length, d = 0; c > d; d++) {
                    o = this._slotList[d];
                    var f = o.childArmature;
                    f && f.animation.gotoAndPlay(e.action)
                }
            }
        }, a._updateGlobal = function () {
            if (!this._armature._skewEnable) return e.prototype._updateGlobal.call(this);
            this._calculateRelativeParentTransform();
            var i = this._calculateParentTransform();
            if (null != i && i.parentGlobalTransformMatrix && i.parentGlobalTransform) {
                var n = i.parentGlobalTransformMatrix, s = i.parentGlobalTransform,
                    a = this._global.scaleX * s.scaleX > 0, r = this._global.scaleY * s.scaleY > 0,
                    o = (this._global.rotation, this._global.scaleX, this._global.scaleY, this.parentBoneRotation);
                this._localTransform = this._global, this.inheritScale && !this.inheritRotation && 0 != o && (this._localTransform = this._localTransform.clone(), this._localTransform.rotation -= o), t.TransformUtil.transformToMatrix(this._localTransform, this._globalTransformMatrix), this._globalTransformMatrix.concat(n), this.inheritScale ? t.TransformUtil.matrixToTransform(this._globalTransformMatrix, this._global, a, r) : (t.TransformUtil.matrixToTransformPosition(this._globalTransformMatrix, this._global), this._global.scaleX = this._localTransform.scaleX, this._global.scaleY = this._localTransform.scaleY, this._global.rotation = this._localTransform.rotation + (this.inheritRotation ? o : 0), t.TransformUtil.transformToMatrix(this._global, this._globalTransformMatrix))
            }
            return i
        }, a._addState = function (t) {
            this._timelineStateList.indexOf(t) < 0 && (this._timelineStateList.push(t), this._timelineStateList.sort(this.sortState))
        }, a._removeState = function (t) {
            var e = this._timelineStateList.indexOf(t);
            e >= 0 && this._timelineStateList.splice(e, 1)
        }, a._removeAllStates = function () {
            this._timelineStateList.length = 0
        }, a.blendingTimeline = function () {
            var t, e, i, n, s = this._timelineStateList.length;
            if (1 == s) t = this._timelineStateList[0], n = t._animationState.weight * t._animationState.fadeWeight, t._weight = n, e = t._transform, i = t._pivot, this._tween.x = e.x * n, this._tween.y = e.y * n, this._tween.skewX = e.skewX * n, this._tween.skewY = e.skewY * n, this._tween.scaleX = 1 + (e.scaleX - 1) * n, this._tween.scaleY = 1 + (e.scaleY - 1) * n, this._tweenPivot.x = i.x * n, this._tweenPivot.y = i.y * n; else if (s > 1) {
                for (var a = 0, r = 0, o = 0, h = 0, l = 1, u = 1, c = 0, d = 0, f = 1, g = 0, p = this._timelineStateList[s - 1]._animationState.layer, _ = 0; s--;) {
                    if (t = this._timelineStateList[s], _ = t._animationState.layer, p != _) {
                        if (g >= f) {
                            t._weight = 0;
                            break
                        }
                        f -= g
                    }
                    p = _, n = t._animationState.weight * t._animationState.fadeWeight * f, t._weight = n, n && (e = t._transform, i = t._pivot, a += e.x * n, r += e.y * n, o += e.skewX * n, h += e.skewY * n, l += (e.scaleX - 1) * n, u += (e.scaleY - 1) * n, c += i.x * n, d += i.y * n, g += n)
                }
                this._tween.x = a, this._tween.y = r, this._tween.skewX = o, this._tween.skewY = h, this._tween.scaleX = l, this._tween.scaleY = u, this._tweenPivot.x = c, this._tweenPivot.y = d
            }
        }, a.sortState = function (t, e) {
            return t._animationState.layer < e._animationState.layer ? -1 : 1
        }, n(a, "childArmature", function () {
            return this.slot ? this.slot.childArmature : null
        }), n(a, "display", function () {
            return this.slot ? this.slot.display : null
        }, function (t) {
            this.slot && (this.slot.display = t)
        }), n(a, "node", function () {
            return this._offset
        }), n(a, "visible", void 0, function (t) {
            if (this._visible != t) {
                this._visible = t;
                for (var e = this._slotList.length, i = 0; e > i; i++) {
                    var n = this._slotList[i];
                    n._updateDisplayVisible(this._visible)
                }
            }
        }), n(a, "slot", function () {
            return this._slotList.length > 0 ? this._slotList[0] : null
        }), n(a, "parentBoneRotation", function () {
            return this.parent ? this.parent.rotationIK : 0
        }), i._soundManager = t.SoundEventManager.getInstance(), i
    }(t.DBObject);
    t.Bone = e, egret.registerClass(e, "dragonBones.Bone")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function e(t, e) {
            this.animationCacheBend = 0, this.animationCacheWeight = -1, this.ikdata = t, this.armature = e, this.weight = t.weight, this.bendDirection = t.bendPositive ? 1 : -1, this.bones = [];
            var i;
            t.chain && (i = e.getBone(t.bones).parent, i.isIKConstraint = !0, this.bones.push(i)), i = e.getBone(t.bones), i.isIKConstraint = !0, this.bones.push(i), this.target = e.getBone(t.target)
        }

        var i = e, n = i.prototype;
        return n.dispose = function () {
        }, n.compute = function () {
            switch (this.bones.length) {
                case 1:
                    var t = this.animationCacheWeight >= 0 ? this.animationCacheWeight : this.weight;
                    this.compute1(this.bones[0], this.target, t);
                    break;
                case 2:
                    var e = 0 != this.animationCacheBend ? this.animationCacheBend : this.bendDirection,
                        i = this.animationCacheWeight >= 0 ? this.animationCacheWeight : this.weight,
                        n = this.compute2(this.bones[0], this.bones[1], this.target.global.x, this.target.global.y, e, i);
                    this.bones[0].rotationIK = n.x, this.bones[1].rotationIK = n.y + n.x
            }
        }, n.compute1 = function (t, e, i) {
            var n = (t.inheritRotation && null != t.parent ? t.parent.global.rotation : 0, t.global.rotation),
                s = Math.atan2(e.global.y - t.global.y, e.global.x - t.global.x);
            t.rotationIK = n + (s - n) * i
        }, n.compute2 = function (e, i, n, s, a, r) {
            if (0 == r) return new t.Point(e.global.rotation, i.global.rotation);
            var o, h, l = new t.Point, u = new t.Point(e.global.x, e.global.y), c = new t.Point(i.global.x, i.global.y),
                d = e.global.scaleX, f = e.global.scaleY, g = i.global.scaleX, p = (i.global.scaleY, i.origin.x * d),
                _ = i.origin.y * f, m = Math.atan2(_, p), v = c.x - u.x, T = c.y - u.y, y = Math.sqrt(v * v + T * T);
            t:if (Math.abs(d - f) <= .001) {
                var E = i.length, x = E * g;
                n -= u.x, s -= u.y;
                var b = 2 * y * x;
                if (1e-4 > b) {
                    var D = Math.atan2(s, n);
                    return l.x = D * r - m, l.y = D * r + m, this.normalize(l.x), this.normalize(l.y), l
                }
                var S = (n * n + s * s - y * y - x * x) / b;
                -1 > S ? S = -1 : S > 1 && (S = 1), h = Math.acos(S) * a;
                var C = y + x * S, w = x * Math.sin(h);
                o = Math.atan2(s * C - n * w, n * C + s * w), l.x = o * r - m, l.y = h * r + m
            } else {
                var L = y, $ = n - u.x, A = s - u.y, O = i.length * i.origin.scaleX, M = d * O, I = f * O,
                    F = Math.atan2(A, $), P = M * M, R = I * I, B = L * L, N = $ * $ + A * A, k = R * B + P * N - P * R,
                    U = -2 * R * L, V = R - P, X = U * U - 4 * V * k;
                if (X >= 0) {
                    var Y = Math.sqrt(X);
                    0 > U && (Y = -Y), Y = -(U + Y) / 2;
                    var H = Y / V, G = k / Y, W = Math.abs(H) < Math.abs(G) ? H : G;
                    if (N >= W * W) {
                        var z = Math.sqrt(N - W * W) * a;
                        o = F - Math.atan2(z, W), h = Math.atan2(z / f, (W - L) / d), l.x = o * r - m, l.y = h * r + m;
                        break t
                    }
                }
                var j = 0, q = Number.MAX_VALUE, Z = 0, K = 0, Q = 0, J = 0, tt = 0, et = 0, it = L + M, nt = it * it;
                nt > J && (Q = 0, J = nt, tt = it), it = L - M, nt = it * it, q > nt && (j = Math.PI, q = nt, Z = it);
                var st = Math.acos(-M * L / (P - R));
                it = M * Math.cos(st) + L;
                var at = I * Math.sin(st);
                nt = it * it + at * at, q > nt && (j = st, q = nt, Z = it, K = at), nt > J && (Q = st, J = nt, tt = it, et = at), (q + J) / 2 >= N ? (o = F - Math.atan2(K * a, Z), h = j * a) : (o = F - Math.atan2(et * a, tt), h = Q * a), l.x = o * r - m, l.y = h * r + m
            }
            return this.normalize(l.x), this.normalize(l.y), l
        }, n.normalize = function (t) {
            t > Math.PI ? t -= 2 * Math.PI : t < -Math.PI && (t += 2 * Math.PI)
        }, e
    }();
    t.IKConstraint = e, egret.registerClass(e, "dragonBones.IKConstraint")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (e) {
        function i() {
            e.call(this), this._currentDisplayIndex = 0, this._displayList = [], this._timelineStateList = [], this._currentDisplayIndex = -1, this._originZOrder = 0, this._tweenZOrder = 0, this._offsetZOrder = 0, this._isShowDisplay = !1, this._colorTransform = new t.ColorTransform, this._displayDataList = null, this._currentDisplay = null, this.inheritRotation = !0, this.inheritScale = !0
        }

        __extends(i, e);
        var n = __define, s = i, a = s.prototype;
        return a.initWithSlotData = function (t) {
            this.name = t.name, this.blendMode = t.blendMode, this._defaultGotoAndPlay = t.gotoAndPlay, this._originZOrder = t.zOrder, this._displayDataList = t.displayDataList, this._originDisplayIndex = t.displayIndex
        }, a.dispose = function () {
            this._displayList && (e.prototype.dispose.call(this), this._displayList.length = 0, this._displayDataList = null, this._displayList = null, this._currentDisplay = null)
        }, a.sortState = function (t, e) {
            return t._animationState.layer < e._animationState.layer ? -1 : 1
        }, a._addState = function (t) {
            this._timelineStateList.indexOf(t) < 0 && (this._timelineStateList.push(t), this._timelineStateList.sort(this.sortState))
        }, a._removeState = function (t) {
            var e = this._timelineStateList.indexOf(t);
            e >= 0 && this._timelineStateList.splice(e, 1)
        }, a.setArmature = function (t) {
            this._armature != t && (this._armature && this._armature._removeSlotFromSlotList(this), this._armature = t, this._armature ? (this._armature._addSlotToSlotList(this), this._armature._slotsZOrderChanged = !0, this._addDisplayToContainer(this._armature.display)) : this._removeDisplayFromContainer())
        }, a._update = function () {
            if (!(this._parent._needUpdate <= 0) || this._needUpdate) {
                var t = this._updateGlobal();
                t && t.release(), this._updateTransform(), this._needUpdate = !1
            }
        }, a._calculateRelativeParentTransform = function () {
            this._global.scaleX = this._origin.scaleX * this._offset.scaleX, this._global.scaleY = this._origin.scaleY * this._offset.scaleY, this._global.skewX = this._origin.skewX + this._offset.skewX, this._global.skewY = this._origin.skewY + this._offset.skewY, this._global.x = this._origin.x + this._offset.x + this._parent._tweenPivot.x, this._global.y = this._origin.y + this._offset.y + this._parent._tweenPivot.y
        }, a.updateChildArmatureAnimation = function () {
            if (this.childArmature) if (this._isShowDisplay) {
                var t = this._gotoAndPlay;
                null == t && (t = this._defaultGotoAndPlay, null == t && this.childArmature.armatureData.defaultAnimation), null == t && this._armature && this._armature.animation.lastAnimationState && (t = this._armature.animation.lastAnimationState.name), t && this.childArmature.animation.hasAnimation(t) ? this.childArmature.animation.gotoAndPlay(t) : this.childArmature.animation.play()
            } else this.childArmature.animation.stop(), this.childArmature.animation._lastAnimationState = null
        }, a._changeDisplay = function (t) {
            if (void 0 === t && (t = 0), 0 > t) this._isShowDisplay && (this._isShowDisplay = !1, this._removeDisplayFromContainer(), this.updateChildArmatureAnimation()); else if (this._displayList.length > 0) {
                var e = this._displayList.length;
                t >= e && (t = e - 1), this._currentDisplayIndex != t ? (this._isShowDisplay = !0, this._currentDisplayIndex = t, this._updateSlotDisplay(), this.updateChildArmatureAnimation(), this._displayDataList && this._displayDataList.length > 0 && this._currentDisplayIndex < this._displayDataList.length && this._origin.copy(this._displayDataList[this._currentDisplayIndex].transform), this._needUpdate = !0) : this._isShowDisplay || (this._isShowDisplay = !0, this._armature && (this._armature._slotsZOrderChanged = !0, this._addDisplayToContainer(this._armature.display)), this.updateChildArmatureAnimation())
            }
        }, a._updateSlotDisplay = function () {
            var e = -1;
            this._currentDisplay && (e = this._getDisplayIndex(), this._removeDisplayFromContainer());
            var i = this._displayList[this._currentDisplayIndex];
            i ? i instanceof t.Armature ? this._currentDisplay = i.display : this._currentDisplay = i : this._currentDisplay = null, this._updateDisplay(this._currentDisplay), this._currentDisplay && (this._armature && this._isShowDisplay && (0 > e ? (this._armature._slotsZOrderChanged = !0, this._addDisplayToContainer(this._armature.display)) : this._addDisplayToContainer(this._armature.display, e)), this._updateDisplayBlendMode(this._blendMode), this._updateDisplayColor(this._colorTransform.alphaOffset, this._colorTransform.redOffset, this._colorTransform.greenOffset, this._colorTransform.blueOffset, this._colorTransform.alphaMultiplier, this._colorTransform.redMultiplier, this._colorTransform.greenMultiplier, this._colorTransform.blueMultiplier, !0), this._updateDisplayVisible(this._visible), this._updateTransform())
        }, n(a, "visible", void 0, function (t) {
            this._visible != t && (this._visible = t, this._updateDisplayVisible(this._visible))
        }), n(a, "displayList", function () {
            return this._displayList
        }, function (t) {
            if (!t) throw new Error;
            this._currentDisplayIndex < 0 && (this._currentDisplayIndex = 0);
            for (var e = this._displayList.length = t.length; e--;) this._displayList[e] = t[e];
            var i = this._currentDisplayIndex;
            this._currentDisplayIndex = -1, this._changeDisplay(i)
        }), n(a, "display", function () {
            return this._currentDisplay
        }, function (t) {
            this._currentDisplayIndex < 0 && (this._currentDisplayIndex = 0), this._displayList[this._currentDisplayIndex] != t && (this._displayList[this._currentDisplayIndex] = t, this._updateSlotDisplay(), this.updateChildArmatureAnimation(), this._updateTransform())
        }), a.getDisplay = function () {
            return this.display
        }, a.setDisplay = function (t) {
            this.display = t
        }, n(a, "childArmature", function () {
            return this._displayList[this._currentDisplayIndex] instanceof t.Armature ? this._displayList[this._currentDisplayIndex] : null
        }, function (t) {
            this.display = t
        }), n(a, "zOrder", function () {
            return this._originZOrder + this._tweenZOrder + this._offsetZOrder
        }, function (t) {
            this.zOrder != t && (this._offsetZOrder = t - this._originZOrder - this._tweenZOrder, this._armature && (this._armature._slotsZOrderChanged = !0))
        }), n(a, "blendMode", function () {
            return this._blendMode
        }, function (t) {
            this._blendMode != t && (this._blendMode = t, this._updateDisplayBlendMode(this._blendMode))
        }), n(a, "gotoAndPlay", void 0, function (t) {
            this._gotoAndPlay != t && (this._gotoAndPlay = t, this.updateChildArmatureAnimation())
        }), a._updateDisplay = function (t) {
            throw new Error("")
        }, a._getDisplayIndex = function () {
            throw new Error(egret.getString(4001))
        }, a._addDisplayToContainer = function (t, e) {
            throw void 0 === e && (e = -1), new Error(egret.getString(4001))
        }, a._removeDisplayFromContainer = function () {
            throw new Error(egret.getString(4001))
        }, a._updateTransform = function () {
            throw new Error(egret.getString(4001))
        }, a._updateDisplayVisible = function (t) {
            throw new Error(egret.getString(4001))
        }, a._updateDisplayColor = function (t, e, i, n, s, a, r, o, h) {
            void 0 === h && (h = !1), this._colorTransform.alphaOffset = t, this._colorTransform.redOffset = e, this._colorTransform.greenOffset = i, this._colorTransform.blueOffset = n, this._colorTransform.alphaMultiplier = s, this._colorTransform.redMultiplier = a, this._colorTransform.greenMultiplier = r, this._colorTransform.blueMultiplier = o, this._isColorChanged = h
        }, a._updateDisplayBlendMode = function (t) {
            throw new Error("Abstract method needs to be implemented in subclass!")
        }, a._arriveAtFrame = function (t, e, i, n) {
            var s = i.displayControl && i.containsBoneMask(this.parent.name);
            if (s) {
                var a = t, r = a.displayIndex;
                this._changeDisplay(r), this._updateDisplayVisible(a.visible), r >= 0 && (isNaN(a.zOrder) || a.zOrder == this._tweenZOrder || (this._tweenZOrder = a.zOrder, this._armature._slotsZOrderChanged = !0)), t.action ? this.childArmature && this.childArmature.animation.gotoAndPlay(t.action) : this.gotoAndPlay = a.gotoAndPlay
            }
        }, a._updateGlobal = function () {
            this._calculateRelativeParentTransform(), t.TransformUtil.transformToMatrix(this._global, this._globalTransformMatrix);
            var e = this._calculateParentTransform();
            return e && (this._globalTransformMatrix.concat(e.parentGlobalTransformMatrix), t.TransformUtil.matrixToTransform(this._globalTransformMatrix, this._global, this._global.scaleX * e.parentGlobalTransform.scaleX >= 0, this._global.scaleY * e.parentGlobalTransform.scaleY >= 0)), e
        }, a._resetToOrigin = function () {
            this._changeDisplay(this._originDisplayIndex), this._updateDisplayColor(0, 0, 0, 0, 1, 1, 1, 1, !0)
        }, i
    }(t.DBObject);
    t.Slot = e, egret.registerClass(e, "dragonBones.Slot")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function e() {
            this.slotTimelineCacheList = [], this.slotTimelineCacheDic = {}, this.frameNum = 0
        }

        var i = e, n = i.prototype;
        return e.initWithAnimationData = function (i, n) {
            var s = new e;
            s.name = i.name;
            for (var a, r, o, h, l = i.timelineList, u = 0, c = l.length; c > u; u++) {
                a = l[u].name;
                for (var d = 0, f = n.slotDataList.length; f > d; d++) r = n.slotDataList[d], h = r.name, r.parent == a && null == s.slotTimelineCacheDic[h] && (o = new t.SlotTimelineCache, o.name = h, s.slotTimelineCacheList.push(o), s.slotTimelineCacheDic[h] = o)
            }
            return s
        }, n.initSlotTimelineCacheDic = function (t, e) {
            var i;
            for (var n in this.slotTimelineCacheDic) {
                var s = this.slotTimelineCacheDic[n];
                i = s.name, s.cacheGenerator = t[i], s.currentFrameCache = e[i]
            }
        }, n.bindCacheUserSlotDic = function (t) {
            for (var e in t) this.slotTimelineCacheDic[e].bindCacheUser(t[e])
        }, n.addFrame = function () {
            this.frameNum++;
            for (var t, e = 0, i = this.slotTimelineCacheList.length; i > e; e++) t = this.slotTimelineCacheList[e], t.addFrame()
        }, n.update = function (t) {
            for (var e, i = Math.floor(t * (this.frameNum - 1)), n = 0, s = this.slotTimelineCacheList.length; s > n; n++) e = this.slotTimelineCacheList[n], e.update(i)
        }, e
    }();
    t.AnimationCache = e, egret.registerClass(e, "dragonBones.AnimationCache")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function e() {
            this.animationCacheDic = {}, this.slotFrameCacheDic = {}
        }

        var i = e, n = i.prototype;
        return e.initWithArmatureData = function (t, i) {
            void 0 === i && (i = 0);
            var n = new e;
            if (n.armatureData = t, 0 >= i) {
                var s = t.animationDataList[0];
                s && (n.frameRate = s.frameRate)
            } else n.frameRate = i;
            return n
        }, n.initAllAnimationCache = function () {
            for (var e = this.armatureData.animationDataList.length, i = 0; e > i; i++) {
                var n = this.armatureData.animationDataList[i];
                this.animationCacheDic[n.name] = t.AnimationCache.initWithAnimationData(n, this.armatureData)
            }
        }, n.initAnimationCache = function (e) {
            this.animationCacheDic[e] = t.AnimationCache.initWithAnimationData(this.armatureData.getAnimationData(e), this.armatureData)
        }, n.bindCacheUserArmatures = function (t) {
            for (var e = t.length, i = 0; e > i; i++) {
                var n = t[i];
                this.bindCacheUserArmature(n)
            }
        }, n.bindCacheUserArmature = function (t) {
            t.animation.animationCacheManager = this;
            var e;
            for (var i in t._slotDic) e = t._slotDic[i], e.frameCache = this.slotFrameCacheDic[e.name]
        }, n.setCacheGeneratorArmature = function (e) {
            this.cacheGeneratorArmature = e;
            var i;
            for (var n in e._slotDic) i = e._slotDic[n], this.slotFrameCacheDic[i.name] = new t.SlotFrameCache;
            for (var s in this.animationCacheDic) {
                var a = this.animationCacheDic[s];
                a.initSlotTimelineCacheDic(e._slotDic, this.slotFrameCacheDic)
            }
        }, n.generateAllAnimationCache = function (t) {
            for (var e in this.animationCacheDic) {
                var i = this.animationCacheDic[e];
                this.generateAnimationCache(i.name, t)
            }
        }, n.generateAnimationCache = function (t, e) {
            var i = this.cacheGeneratorArmature.enableCache;
            this.cacheGeneratorArmature.enableCache = !1;
            var n = this.animationCacheDic[t];
            if (n) {
                var s = this.cacheGeneratorArmature.getAnimation().animationState, a = 1 / this.frameRate;
                e ? this.cacheGeneratorArmature.getAnimation().gotoAndPlay(t, 0, -1, 0) : this.cacheGeneratorArmature.getAnimation().gotoAndPlay(t, 0, -1, 1);
                var r = this.cacheGeneratorArmature.enableEventDispatch;
                this.cacheGeneratorArmature.enableEventDispatch = !1;
                var o;
                do o = s.progress, this.cacheGeneratorArmature.advanceTime(a), n.addFrame(); while (s.progress >= o && s.progress < 1);
                this.cacheGeneratorArmature.enableEventDispatch = r, this.resetCacheGeneratorArmature(), this.cacheGeneratorArmature.enableCache = i
            }
        }, n.resetCacheGeneratorArmature = function () {
            this.cacheGeneratorArmature.resetAnimation()
        }, n.getAnimationCache = function (t) {
            return this.animationCacheDic[t]
        }, e
    }();
    t.AnimationCacheManager = e, egret.registerClass(e, "dragonBones.AnimationCacheManager")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function e() {
            this.globalTransform = new t.DBTransform, this.globalTransformMatrix = new t.Matrix
        }

        var i = e, n = i.prototype;
        return n.copy = function (t) {
            this.globalTransform = t.globalTransform, this.globalTransformMatrix = t.globalTransformMatrix
        }, n.clear = function () {
            this.globalTransform = e.ORIGIN_TRAMSFORM, this.globalTransformMatrix = e.ORIGIN_MATRIX
        }, e.ORIGIN_TRAMSFORM = new t.DBTransform, e.ORIGIN_MATRIX = new t.Matrix, e
    }();
    t.FrameCache = e, egret.registerClass(e, "dragonBones.FrameCache")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (t) {
        function e() {
            t.call(this), this.displayIndex = -1
        }

        __extends(e, t);
        var i = e, n = i.prototype;
        return n.copy = function (e) {
            t.prototype.copy.call(this, e), this.colorTransform = e.colorTransform, this.displayIndex = e.displayIndex, this.gotoAndPlay = e.gotoAndPlay
        }, n.clear = function () {
            t.prototype.clear.call(this), this.colorTransform = null, this.displayIndex = -1, this.gotoAndPlay = null
        }, e
    }(t.FrameCache);
    t.SlotFrameCache = e, egret.registerClass(e, "dragonBones.SlotFrameCache")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function t() {
            this.frameCacheList = new Array
        }

        var e = t, i = e.prototype;
        return i.addFrame = function () {
        }, i.update = function (t) {
            void 0 === t && (t = 0), this.currentFrameCache.copy(this.frameCacheList[t])
        }, i.bindCacheUser = function (t) {
            t.frameCache = this.currentFrameCache
        }, t
    }();
    t.TimelineCache = e, egret.registerClass(e, "dragonBones.TimelineCache")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (e) {
        function i() {
            e.call(this)
        }

        __extends(i, e);
        var n = i, s = n.prototype;
        return s.addFrame = function () {
            var e = new t.SlotFrameCache;
            e.globalTransform.copy(this.cacheGenerator.global), e.globalTransformMatrix.copyFrom(this.cacheGenerator.globalTransformMatrix), this.cacheGenerator.colorChanged && (e.colorTransform = t.ColorTransformUtil.cloneColor(this.cacheGenerator.colorTransform)), e.displayIndex = this.cacheGenerator.displayIndex, e.gotoAndPlay = this.cacheGenerator.gotoAndPlay, this.frameCacheList.push(e)
        }, i
    }(t.TimelineCache);
    t.SlotTimelineCache = e, egret.registerClass(e, "dragonBones.SlotTimelineCache")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (t) {
        function e(e, i, n) {
            void 0 === i && (i = !1), void 0 === n && (n = !1), t.call(this, e, i, n)
        }

        __extends(e, t);
        var i = e;
        return i.prototype, e
    }(egret.Event);
    t.Event = e, egret.registerClass(e, "dragonBones.Event")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (t) {
        function e(e, i) {
            void 0 === i && (i = !1), t.call(this, e)
        }

        __extends(e, t);
        var i = __define, n = e, s = n.prototype;
        return i(e, "MOVEMENT_CHANGE", function () {
            return e.FADE_IN
        }), i(s, "movementID", function () {
            return this.animationName
        }), i(s, "armature", function () {
            return this.target
        }), i(s, "animationName", function () {
            return this.animationState.name
        }), e.FADE_IN = "fadeIn", e.FADE_OUT = "fadeOut", e.START = "start", e.COMPLETE = "complete", e.LOOP_COMPLETE = "loopComplete", e.FADE_IN_COMPLETE = "fadeInComplete", e.FADE_OUT_COMPLETE = "fadeOutComplete", e
    }(t.Event);
    t.AnimationEvent = e, egret.registerClass(e, "dragonBones.AnimationEvent")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (t) {
        function e(e) {
            t.call(this, e)
        }

        __extends(e, t);
        var i = e;
        return i.prototype, e.Z_ORDER_UPDATED = "zOrderUpdated", e
    }(t.Event);
    t.ArmatureEvent = e, egret.registerClass(e, "dragonBones.ArmatureEvent");
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (t) {
        function e(e, i) {
            void 0 === i && (i = !1), t.call(this, e)
        }

        __extends(e, t);
        var i = __define, n = e, s = n.prototype;
        return i(e, "MOVEMENT_FRAME_EVENT", function () {
            return e.ANIMATION_FRAME_EVENT
        }), i(s, "armature", function () {
            return this.target
        }), e.ANIMATION_FRAME_EVENT = "animationFrameEvent", e.BONE_FRAME_EVENT = "boneFrameEvent", e
    }(t.Event);
    t.FrameEvent = e, egret.registerClass(e, "dragonBones.FrameEvent")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (t) {
        function e(e, i) {
            void 0 === i && (i = !1), t.call(this, e)
        }

        __extends(e, t);
        var i = e;
        return i.prototype, e.SOUND = "sound", e
    }(t.Event);
    t.SoundEvent = e, egret.registerClass(e, "dragonBones.SoundEvent")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (e) {
        function n() {
            e.call(this), this.dragonBonesDataDic = {}, this.textureAtlasDic = {}
        }

        __extends(n, e);
        var s = n, a = s.prototype;
        return a.dispose = function (t) {
            if (void 0 === t && (t = !0), t) {
                for (var e in this.dragonBonesDataDic) this.dragonBonesDataDic[e].dispose(), delete this.dragonBonesDataDic[e];
                for (var i in this.textureAtlasDic) {
                    var n = this.textureAtlasDic[i];
                    if (n) for (var s = 0, a = n.length; a > s; s++) n[s].dispose();
                    delete this.textureAtlasDic[i]
                }
            }
            this.dragonBonesDataDic = null, this.textureAtlasDic = null
        }, a.getDragonBonesData = function (t) {
            return this.dragonBonesDataDic[t]
        }, a.getSkeletonData = function (t) {
            return this.getDragonBonesData(t)
        }, a.addDragonBonesData = function (t, e) {
            if (void 0 === e && (e = null), !t) throw new Error;
            if (e = e || t.name, !e) throw new Error(egret.getString(4002));
            this.dragonBonesDataDic[e] = t
        }, a.addSkeletonData = function (t, e) {
            void 0 === e && (e = null), this.addDragonBonesData(t, e)
        }, a.removeDragonBonesData = function (t) {
            delete this.dragonBonesDataDic[t]
        }, a.removeSkeletonData = function (t) {
            delete this.dragonBonesDataDic[t]
        }, a.getTextureAtlas = function (t) {
            return this.textureAtlasDic[t]
        }, a.addTextureAtlas = function (t, e) {
            if (void 0 === e && (e = null), !t) throw new Error;
            if (!e && t.hasOwnProperty("name") && (e = t.name), !e) throw new Error(egret.getString(4002));
            var i = this.textureAtlasDic[e];
            null == i && (i = [], this.textureAtlasDic[e] = i), -1 == i.indexOf(t) && i.push(t)
        }, a.removeTextureAtlas = function (t) {
            delete this.textureAtlasDic[t]
        }, a.getTextureDisplay = function (t, e, i, n) {
            void 0 === e && (e = null), void 0 === i && (i = NaN), void 0 === n && (n = NaN);
            var s, a, r, o;
            if (e) {
                if (a = this.textureAtlasDic[e]) for (r = 0, o = a.length; o > r && (s = a[r], !s.getRegion(t)); r++) s = null
            } else for (e in this.textureAtlasDic) if (a = this.textureAtlasDic[e]) {
                for (r = 0, o = a.length; o > r && (s = a[r], !s.getRegion(t)); r++) s = null;
                if (null != s) break
            }
            if (!s) return null;
            if (isNaN(i) || isNaN(n)) {
                var h = this.dragonBonesDataDic[e];
                if (h = h ? h : this.findFirstDragonBonesData()) {
                    var l = h.getDisplayDataByName(t);
                    l && (i = l.pivot.x, n = l.pivot.y)
                }
            }
            return this._generateDisplay(s, t, i, n)
        }, a.buildArmature = function (t, e, i, n) {
            void 0 === e && (e = null), void 0 === i && (i = null), void 0 === n && (n = null);
            var s = {};
            this.fillBuildArmatureDataPackageArmatureInfo(t, e, s), null == i && (i = s.dragonBonesDataName);
            var a = s.dragonBonesData, r = s.armatureData;
            return r ? this.buildArmatureUsingArmatureDataFromTextureAtlas(a, r, i, n) : null
        }, a.buildFastArmature = function (t, e, n, s) {
            void 0 === e && (e = null), void 0 === n && (n = null), void 0 === s && (s = null);
            var a = new i;
            this.fillBuildArmatureDataPackageArmatureInfo(t, e, a), null == n && (n = a.dragonBonesDataName);
            var r = a.dragonBonesData, o = a.armatureData;
            return o ? this.buildFastArmatureUsingArmatureDataFromTextureAtlas(r, o, n, s) : null
        }, a.buildArmatureUsingArmatureDataFromTextureAtlas = function (t, e, i, n) {
            void 0 === n && (n = null);
            var s = this._generateArmature();
            return s.name = e.name, s.__dragonBonesData = t, s._armatureData = e, s._skewEnable = t.version >= 4.5, s.animation.animationDataList = e.animationDataList, this._buildBones(s), s.buildIK(), +s.updateBoneCache(), this._buildSlots(s, n, i), s.advanceTime(0), s
        }, a.buildFastArmatureUsingArmatureDataFromTextureAtlas = function (t, e, i, n) {
            void 0 === n && (n = null);
            var s = this._generateFastArmature();
            return s.name = e.name, s.__dragonBonesData = t, s._armatureData = e, s._skewEnable = t.version >= 4.5, s.animation.animationDataList = e.animationDataList, this._buildFastBones(s), s.buildIK(), +s.updateBoneCache(), this._buildFastSlots(s, n, i), s.advanceTime(0), s
        }, a.copyAnimationsToArmature = function (e, i, n, s) {
            void 0 === n && (n = null), void 0 === s && (s = !0);
            var a = {};
            if (!this.fillBuildArmatureDataPackageArmatureInfo(i, n, a)) return !1;
            var r = a.armatureData;
            e.animation.animationDataList = r.animationDataList;
            for (var o, h, l, u, c, d, f = r.getSkinData(""), g = e.getSlots(!1), p = 0, _ = g.length, m = 0; _ > m; m++) {
                l = g[m], u = l.displayList, p = u.length;
                for (var v = 0; p > v; v++) c = u[v], c instanceof t.Armature && (d = c, o = f.getSlotData(l.name), h = o.displayDataList[v], h.type == t.DisplayData.ARMATURE && this.copyAnimationsToArmature(d, h.name, a.dragonBonesDataName, s))
            }
            return !0
        }, a.fillBuildArmatureDataPackageArmatureInfo = function (t, e, i) {
            if (e) return i.dragonBonesDataName = e, i.dragonBonesData = this.dragonBonesDataDic[e], i.armatureData = i.dragonBonesData.getArmatureDataByName(t), !0;
            for (e in this.dragonBonesDataDic) if (i.dragonBonesData = this.dragonBonesDataDic[e], i.armatureData = i.dragonBonesData.getArmatureDataByName(t), i.armatureData) return i.dragonBonesDataName = e, !0;
            return !1
        }, a.fillBuildArmatureDataPackageTextureInfo = function (t, e) {
            e.textureAtlas = this.textureAtlasDic[t ? t : e.dragonBonesDataName]
        }, a.findFirstDragonBonesData = function () {
            for (var t in this.dragonBonesDataDic) {
                var e = this.dragonBonesDataDic[t];
                if (e) return e
            }
            return null
        }, a.findFirstTextureAtlas = function () {
            for (var t in this.textureAtlasDic) {
                var e = this.textureAtlasDic[t];
                if (e) return e
            }
            return null
        }, a._buildBones = function (e) {
            for (var i, n, s, a = e.armatureData.boneDataList, r = 0; r < a.length; r++) i = a[r], n = t.Bone.initWithBoneData(i), s = i.parent, s && null == e.armatureData.getBoneData(s) && (s = null), e.addBone(n, s, !0);
            e._updateAnimationAfterBoneListChanged()
        }, a._buildSlots = function (e, i, n) {
            var s = e.armatureData.getSkinData(i);
            if (s) {
                e.armatureData.setSkinData(i);
                for (var a, r, o, h = [], l = e.armatureData.slotDataList, u = 0; u < l.length; u++) if (a = l[u], o = e.getBone(a.parent)) {
                    r = this._generateSlot(), r.initWithSlotData(a), o.addSlot(r), h.length = 0;
                    for (var c = a.displayDataList.length; c--;) {
                        var d = a.displayDataList[c];
                        switch (d.type) {
                            case t.DisplayData.ARMATURE:
                                var f = this.buildArmatureUsingArmatureDataFromTextureAtlas(e.__dragonBonesData, e.__dragonBonesData.getArmatureDataByName(d.name), n, i);
                                h[c] = f;
                                break;
                            case t.DisplayData.IMAGE:
                            default:
                                h[c] = this.getTextureDisplay(d.name, n, d.pivot.x, d.pivot.y)
                        }
                    }
                    for (var g = 0, p = h.length; p > g; g++) {
                        var _ = h[g];
                        if (_ && (_ instanceof t.Armature && (_ = _.display), _.hasOwnProperty("name"))) try {
                            _.name = r.name
                        } catch (m) {
                        }
                    }
                    r.displayList = h, r._changeDisplay(a.displayIndex)
                }
            }
        }, a._buildFastBones = function (e) {
            for (var i, n, s = e.armatureData.boneDataList, a = 0; a < s.length; a++) i = s[a], n = t.FastBone.initWithBoneData(i), e.addBone(n, i.parent)
        }, a._buildFastSlots = function (e, i, n) {
            var s = e.armatureData.getSkinData(i);
            if (s) {
                e.armatureData.setSkinData(i);
                for (var a, r, o = [], h = e.armatureData.slotDataList, l = 0; l < h.length; l++) {
                    o.length = 0, a = h[l], r = this._generateFastSlot(), r.initWithSlotData(a);
                    for (var u = a.displayDataList.length; u--;) {
                        var c = a.displayDataList[u];
                        switch (c.type) {
                            case t.DisplayData.ARMATURE:
                                var d = this.buildFastArmatureUsingArmatureDataFromTextureAtlas(e.__dragonBonesData, e.__dragonBonesData.getArmatureDataByName(c.name), n, i);
                                o[u] = d, r.hasChildArmature = !0;
                                break;
                            case t.DisplayData.IMAGE:
                            default:
                                o[u] = this.getTextureDisplay(c.name, n, c.pivot.x, c.pivot.y)
                        }
                    }
                    for (var f = o.length, g = 0; f > g; g++) {
                        var p = o[g];
                        if (p && (p instanceof t.FastArmature && (p = p.display), p.hasOwnProperty("name"))) try {
                            p.name = r.name
                        } catch (_) {
                        }
                    }
                    r.initDisplayList(o.concat()), e.addSlot(r, a.parent), r._changeDisplayIndex(a.displayIndex)
                }
            }
        }, a._generateArmature = function () {
            return null
        }, a._generateSlot = function () {
            return null
        }, a._generateFastArmature = function () {
            return null
        }, a._generateFastSlot = function () {
            return null
        }, a._generateDisplay = function (t, e, i, n) {
            return null
        }, n._helpMatrix = new t.Matrix, n
    }(t.EventDispatcher);
    t.BaseFactory = e, egret.registerClass(e, "dragonBones.BaseFactory");
    var i = function () {
        function t() {
        }

        var e = t;
        return e.prototype, t
    }();
    t.BuildArmatureDataPackage = i, egret.registerClass(i, "dragonBones.BuildArmatureDataPackage")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (e) {
        function i(i) {
            e.call(this), this.isCacheManagerExclusive = !1, this._boneIKList = [], this._enableEventDispatch = !0, this.useCache = !0, this._display = i, this._animation = new t.FastAnimation(this), this._slotsZOrderChanged = !1, this._armatureData = null, this.boneList = [], this._boneDic = {}, this.slotList = [], this._slotDic = {}, this.slotHasChildArmatureList = [], this._eventList = [], this._ikList = [], this._delayDispose = !1, this._lockDispose = !1
        }

        __extends(i, e);
        var n = __define, s = i, a = s.prototype;
        return a.dispose = function () {
            if (this._delayDispose = !0, this._animation && !this._lockDispose) {
                this.userData = null, this._animation.dispose();
                for (var t = this.slotList.length; t--;) this.slotList[t].dispose();
                for (t = this.boneList.length; t--;) this.boneList[t].dispose();
                for (t = this._ikList.length; t--;) this._ikList[t].dispose();
                this.slotList.length = 0, this.boneList.length = 0, this._armatureData = null, this._animation = null, this.slotList = null, this.boneList = null, this._eventList = null, this._ikList = null
            }
        }, a.advanceTime = function (t) {
            this._lockDispose = !0, this._animation.advanceTime(t);
            var e, i, n, s, a = 0, r = this._boneIKList.length;
            if (this._animation.animationState.isUseCache()) for (this.useCache || (this.useCache = !0), a = this.slotList.length; a--;) i = this.slotList[a], i.updateByCache(); else {
                if (this.useCache) for (this.useCache = !1, a = this.slotList.length; a--;) i = this.slotList[a], i.switchTransformToBackup();
                for (a = 0; r > a; a++) for (n = 0, s = this._boneIKList[a].length; s > n; n++) e = this._boneIKList[a][n], e.update(), e.rotationIK = e.global.rotation, 0 != a && e.isIKConstraint && (this._ikList[a - 1].compute(), e.adjustGlobalTransformMatrixByIK());
                for (a = this.slotList.length; a--;) i = this.slotList[a], i._update()
            }
            for (a = this.slotHasChildArmatureList.length; a--;) {
                i = this.slotHasChildArmatureList[a];
                var o = i.childArmature;
                o && o.advanceTime(t)
            }
            for (this._slotsZOrderChanged && this.updateSlotsZOrder(); this._eventList.length > 0;) this.dispatchEvent(this._eventList.shift());
            this._lockDispose = !1, this._delayDispose && this.dispose()
        }, a.enableAnimationCache = function (e, i, n) {
            void 0 === i && (i = null), void 0 === n && (n = !0);
            var s = t.AnimationCacheManager.initWithArmatureData(this.armatureData, e);
            if (i) for (var a = i.length, r = 0; a > r; r++) {
                var o = i[r];
                s.initAnimationCache(o)
            } else s.initAllAnimationCache();
            return s.setCacheGeneratorArmature(this), s.generateAllAnimationCache(n), s.bindCacheUserArmature(this), this.enableCache = !0, s
        }, a.getBone = function (t) {
            return this._boneDic[t]
        }, a.getSlot = function (t) {
            return this._slotDic[t]
        }, a.getBoneByDisplay = function (t) {
            var e = this.getSlotByDisplay(t);
            return e ? e.parent : null
        }, a.getSlotByDisplay = function (t) {
            if (t) for (var e = 0, i = this.slotList.length; i > e; e++) if (this.slotList[e].display == t) return this.slotList[e];
            return null
        }, a.getSlots = function (t) {
            return void 0 === t && (t = !0), t ? this.slotList.concat() : this.slotList
        }, a._updateBonesByCache = function () {
            for (var t, e = this.boneList.length; e--;) t = this.boneList[e], t.update()
        }, a.addBone = function (t, e) {
            void 0 === e && (e = null);
            var i;
            e && (i = this.getBone(e), i.boneList.push(t)), t.armature = this, t.parentBoneData = i, this.boneList.unshift(t), this._boneDic[t.name] = t
        }, a.addSlot = function (t, e) {
            var i = this.getBone(e);
            if (!i) throw new Error;
            t.armature = this, t.setParent(i), i.slotList.push(t), t._addDisplayToContainer(this.display), this.slotList.push(t), this._slotDic[t.name] = t, t.hasChildArmature && this.slotHasChildArmatureList.push(t)
        }, a.updateSlotsZOrder = function () {
            this.slotList.sort(this.sortSlot);
            for (var t = this.slotList.length; t--;) {
                var e = this.slotList[t];
                (e._frameCache && e._frameCache.displayIndex >= 0 || !e._frameCache && e.displayIndex >= 0) && e._addDisplayToContainer(this._display)
            }
            this._slotsZOrderChanged = !1
        }, a.sortBoneList = function () {
            var e = this.boneList.length;
            if (0 != e) {
                for (var i = []; e--;) {
                    for (var n = 0, s = this.boneList[e], a = s; a;) n++, a = a.parent;
                    i[e] = [n, s]
                }
                for (i.sort(t.ArmatureData.sortBoneDataHelpArrayDescending), e = i.length; e--;) this.boneList[e] = i[e][1];
                i.length = 0
            }
        }, a.arriveAtFrame = function (e, i) {
            if (e.event && this.hasEventListener(t.FrameEvent.ANIMATION_FRAME_EVENT)) {
                var n = new t.FrameEvent(t.FrameEvent.ANIMATION_FRAME_EVENT);
                n.animationState = i, n.frameLabel = e.event, this._addEvent(n)
            }
            e.action && this.animation.gotoAndPlay(e.action)
        }, a.invalidUpdate = function (t) {
            if (void 0 === t && (t = null), t) {
                var e = this.getBone(t);
                e && e.invalidUpdate()
            } else for (var i = this.boneList.length; i--;) this.boneList[i].invalidUpdate()
        }, a.resetAnimation = function () {
            this.animation.animationState._resetTimelineStateList();
            for (var t = this.boneList.length, e = 0; t > e; e++) {
                var i = this.boneList[e];
                i._timelineState = null
            }
            this.animation.stop()
        }, a.sortSlot = function (t, e) {
            return t.zOrder < e.zOrder ? 1 : -1
        }, a.getAnimation = function () {
            return this._animation
        }, n(a, "armatureData", function () {
            return this._armatureData
        }), n(a, "animation", function () {
            return this._animation
        }), n(a, "display", function () {
            return this._display
        }), n(a, "enableCache", function () {
            return this._enableCache
        }, function (t) {
            this._enableCache = t
        }), n(a, "enableEventDispatch", function () {
            return this._enableEventDispatch
        }, function (t) {
            this._enableEventDispatch = t
        }), a._addEvent = function (t) {
            this._enableEventDispatch && this._eventList.push(t)
        }, a.getIKs = function (t) {
            return void 0 === t && (t = !0), t ? this._ikList.concat() : this._ikList
        }, a.buildIK = function () {
            var e;
            this._ikList.length = 0;
            for (var i = 0, n = this._armatureData.ikDataList.length; n > i; i++) e = this._armatureData.ikDataList[i], this._ikList.push(new t.FastIKConstraint(e, this))
        }, a.updateBoneCache = function () {
            this.boneList.reverse();
            var t, e, i, n, s = {}, a = this._ikList.length, r = a + 1;
            for (this._boneIKList = []; this._boneIKList.length < r;) this._boneIKList[this._boneIKList.length] = [];
            for (s[this.boneList[0].name] = 0, t = 0, e = this._ikList.length; e > t; t++) s[this._ikList[t].bones[0].name] = t + 1;
            t:for (t = 0, e = this.boneList.length; e > t; t++) for (i = this.boneList[t], n = i; n;) {
                if (null == n.parent && (s[n.name] = 0), s.hasOwnProperty(n.name)) {
                    this._boneIKList[s[n.name]].push(i);
                    continue t
                }
                n = n.parent
            }
        }, a.getIKTargetData = function (t) {
            for (var e, i = [], n = 0, s = this._ikList.length; s > n; n++) e = this._ikList[n], t.name == e.target.name && i.push(e);
            return i
        }, i
    }(t.EventDispatcher);
    t.FastArmature = e, egret.registerClass(e, "dragonBones.FastArmature", ["dragonBones.ICacheableArmature", "dragonBones.IArmature", "dragonBones.IAnimatable"])
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function e() {
            this._globalTransformMatrix = new t.Matrix, this._global = new t.DBTransform, this._origin = new t.DBTransform, this._visible = !0, this.armature = null, this._parent = null, this.userData = null, this.inheritRotation = !0, this.inheritScale = !0, this.inheritTranslation = !0
        }

        var i = __define, n = e, s = n.prototype;
        return s.updateByCache = function () {
            this._global = this._frameCache.globalTransform, this._globalTransformMatrix = this._frameCache.globalTransformMatrix
        }, s.switchTransformToBackup = function () {
            this._globalBackup || (this._globalBackup = new t.DBTransform, this._globalTransformMatrixBackup = new t.Matrix), this._global = this._globalBackup, this._globalTransformMatrix = this._globalTransformMatrixBackup
        }, s.setParent = function (t) {
            this._parent = t
        }, s.dispose = function () {
            this.userData = null, this._globalTransformMatrix = null, this._global = null, this._origin = null, this.armature = null, this._parent = null
        }, s._calculateParentTransform = function () {
            if (this.parent && (this.inheritTranslation || this.inheritRotation || this.inheritScale)) {
                var e = this._parent._global, i = this._parent._globalTransformMatrix;
                return t.ParentTransformObject.create().setTo(e, i)
            }
            return t.TransformUtil.transformToMatrix(this._global, this._globalTransformMatrix), null
        }, s._updateGlobal = function () {
            this._calculateRelativeParentTransform();
            var e = this._calculateParentTransform();
            if (null != e) {
                var i = e.parentGlobalTransformMatrix, n = e.parentGlobalTransform, s = this._global.x,
                    a = this._global.y;
                this._global.x = i.a * s + i.c * a + i.tx, this._global.y = i.d * a + i.b * s + i.ty, this.inheritRotation && (this._global.skewX += n.skewX, this._global.skewY += n.skewY), this.inheritScale && (this._global.scaleX *= n.scaleX, this._global.scaleY *= n.scaleY)
            }
            return t.TransformUtil.transformToMatrix(this._global, this._globalTransformMatrix), e
        }, s._calculateRelativeParentTransform = function () {
        }, i(s, "name", function () {
            return this._name
        }, function (t) {
            this._name = t
        }), i(s, "global", function () {
            return this._global
        }), i(s, "globalTransformMatrix", function () {
            return this._globalTransformMatrix
        }), i(s, "origin", function () {
            return this._origin
        }), i(s, "parent", function () {
            return this._parent
        }), i(s, "visible", function () {
            return this._visible
        }, function (t) {
            this._visible = t
        }), i(s, "frameCache", void 0, function (t) {
            this._frameCache = t
        }), e._tempParentGlobalTransform = new t.DBTransform, e
    }();
    t.FastDBObject = e, egret.registerClass(e, "dragonBones.FastDBObject")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (e) {
        function i() {
            e.call(this), this.slotList = [], this.boneList = [], this._needUpdate = 0, this.isIKConstraint = !1, this.childrenBones = [], this._needUpdate = 2, this._tweenPivot = new t.Point
        }

        __extends(i, e);
        var n = __define, s = i, a = s.prototype;
        return i.initWithBoneData = function (t) {
            var e = new i;
            return e.name = t.name, e.length = t.length, e.inheritRotation = t.inheritRotation, e.inheritScale = t.inheritScale, e.origin.copy(t.transform), e
        }, a.getBones = function (t) {
            return void 0 === t && (t = !0), t ? this.boneList.concat() : this.boneList
        }, a.getSlots = function (t) {
            return void 0 === t && (t = !0), t ? this.slotList.concat() : this.slotList
        }, a.dispose = function () {
            e.prototype.dispose.call(this), this._timelineState = null, this._tweenPivot = null
        }, a.invalidUpdate = function () {
            this._needUpdate = 2, this.operationInvalidUpdate(this);
            var t, e;
            for (t = 0, e = this.childrenBones.length; e > t; t++) 2 != this.childrenBones[t]._needUpdate && (this.operationInvalidUpdate(this.childrenBones[t]), this.childrenBones[t].invalidUpdate())
        }, a.operationInvalidUpdate = function (t) {
            var e, i, n, s, a, r, o = this.armature.getIKTargetData(t);
            for (e = 0, i = o.length; i > e; e++) for (a = o[e], n = 0, s = a.bones.length; s > n; n++) r = a.bones[n], 2 != r._needUpdate && r.invalidUpdate()
        }, a._calculateRelativeParentTransform = function () {
            this._global.copy(this._origin), this._timelineState && this._global.add(this._timelineState._transform)
        }, a.updateByCache = function () {
            e.prototype.updateByCache.call(this), this._global = this._frameCache.globalTransform, this._globalTransformMatrix = this._frameCache.globalTransformMatrix
        }, a.update = function (t) {
            if (void 0 === t && (t = !1), this._needUpdate--, t || this._needUpdate > 0 || this._parent && this._parent._needUpdate > 0) {
                this._needUpdate = 1, this.blendingTimeline();
                var e = this._updateGlobal();
                e && e.release()
            }
        }, a._updateGlobal = function () {
            if (!this.armature._skewEnable) return e.prototype._updateGlobal.call(this);
            this._calculateRelativeParentTransform();
            var i = this._calculateParentTransform();
            if (null != i && i.parentGlobalTransformMatrix && i.parentGlobalTransform) {
                var n = i.parentGlobalTransformMatrix, s = i.parentGlobalTransform,
                    a = this._global.scaleX * s.scaleX > 0, r = this._global.scaleY * s.scaleY > 0,
                    o = (this._global.rotation, this._global.scaleX, this._global.scaleY, this.parentBoneRotation);
                this._localTransform = this._global, this.inheritScale && !this.inheritRotation && 0 != o && (this._localTransform = this._localTransform.clone(), this._localTransform.rotation -= o), t.TransformUtil.transformToMatrix(this._localTransform, this._globalTransformMatrix), this._globalTransformMatrix.concat(n), this.inheritScale ? t.TransformUtil.matrixToTransform(this._globalTransformMatrix, this._global, a, r) : (t.TransformUtil.matrixToTransformPosition(this._globalTransformMatrix, this._global), this._global.scaleX = this._localTransform.scaleX, this._global.scaleY = this._localTransform.scaleY, this._global.rotation = this._localTransform.rotation + (this.inheritRotation ? o : 0), t.TransformUtil.transformToMatrix(this._global, this._globalTransformMatrix))
            }
            return i
        }, a.adjustGlobalTransformMatrixByIK = function () {
            this.parent && (this.global.rotation = this.rotationIK, t.TransformUtil.transformToMatrix(this.global, this._globalTransformMatrix))
        }, a._hideSlots = function () {
            for (var t = this.slotList.length, e = 0; t > e; e++) {
                var i = this.slotList[e];
                i.hideSlots()
            }
        }, a.blendingTimeline = function () {
            this._timelineState && (this._tweenPivot.x = this._timelineState._pivot.x, this._tweenPivot.y = this._timelineState._pivot.y)
        }, a.arriveAtFrame = function (e, i) {
            if (e.event && this.armature.hasEventListener(t.FrameEvent.BONE_FRAME_EVENT)) {
                var n = new t.FrameEvent(t.FrameEvent.BONE_FRAME_EVENT);
                n.bone = this, n.animationState = i, n.frameLabel = e.event, this.armature._addEvent(n)
            }
        }, n(a, "childArmature", function () {
            var t = this.slot;
            return t ? t.childArmature : null
        }), n(a, "display", function () {
            var t = this.slot;
            return t ? t.display : null
        }, function (t) {
            var e = this.slot;
            e && (e.display = t)
        }), n(a, "visible", void 0, function (t) {
            if (this._visible != t) {
                this._visible = t;
                for (var e = 0, i = this.armature.slotList.length; i > e; e++) this.armature.slotList[e].parent == this && this.armature.slotList[e]._updateDisplayVisible(this._visible)
            }
        }), n(a, "slot", function () {
            return this.slotList.length > 0 ? this.slotList[0] : null
        }), n(a, "parentBoneRotation", function () {
            return this.parent ? this.parent.rotationIK : 0
        }), n(a, "parentBoneData", void 0, function (t) {
            if (this._parent != t) {
                if (null != this._parent) {
                    var e = this._parent.childrenBones.indexOf(this);
                    e >= 0 && this._parent.childrenBones.splice(e, 1)
                }
                if (this.setParent(t), null != this._parent) {
                    var i = this._parent.childrenBones.indexOf(this);
                    0 > i && this._parent.childrenBones.push(this)
                }
            }
        }), i
    }(t.FastDBObject);
    t.FastBone = e, egret.registerClass(e, "dragonBones.FastBone")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function e(t, e) {
            this.animationCacheBend = 0, this.animationCacheWeight = -1, this.ikdata = t, this.armature = e, this.weight = t.weight, this.bendDirection = t.bendPositive ? 1 : -1, this.bones = [];
            var i;
            t.chain && (i = e.getBone(t.bones).parent, i.isIKConstraint = !0, this.bones.push(i)), i = e.getBone(t.bones), i.isIKConstraint = !0, this.bones.push(i), this.target = e.getBone(t.target)
        }

        var i = e, n = i.prototype;
        return n.dispose = function () {
        }, n.compute = function () {
            switch (this.bones.length) {
                case 1:
                    var t = this.animationCacheWeight >= 0 ? this.animationCacheWeight : this.weight;
                    this.compute1(this.bones[0], this.target, t);
                    break;
                case 2:
                    var e = 0 != this.animationCacheBend ? this.animationCacheBend : this.bendDirection,
                        i = this.animationCacheWeight >= 0 ? this.animationCacheWeight : this.weight,
                        n = this.compute2(this.bones[0], this.bones[1], this.target.global.x, this.target.global.y, e, i);
                    this.bones[0].rotationIK = n.x, this.bones[1].rotationIK = n.y + n.x
            }
        }, n.compute1 = function (t, e, i) {
            var n = (t.inheritRotation && null != t.parent ? t.parent.global.rotation : 0, t.global.rotation),
                s = Math.atan2(e.global.y - t.global.y, e.global.x - t.global.x);
            t.rotationIK = n + (s - n) * i
        }, n.compute2 = function (e, i, n, s, a, r) {
            if (0 == r) return new t.Point(e.global.rotation, i.global.rotation);
            var o, h, l = new t.Point, u = new t.Point(e.global.x, e.global.y), c = new t.Point(i.global.x, i.global.y),
                d = e.global.scaleX, f = e.global.scaleY, g = i.global.scaleX, p = (i.global.scaleY, i.origin.x * d),
                _ = i.origin.y * f, m = Math.atan2(_, p), v = c.x - u.x, T = c.y - u.y, y = Math.sqrt(v * v + T * T);
            t:if (Math.abs(d - f) <= .001) {
                var E = i.length, x = E * g;
                n -= u.x, s -= u.y;
                var b = 2 * y * x;
                if (1e-4 > b) {
                    var D = Math.atan2(s, n);
                    return l.x = D * r - m, l.y = D * r + m, this.normalize(l.x), this.normalize(l.y), l
                }
                var S = (n * n + s * s - y * y - x * x) / b;
                -1 > S ? S = -1 : S > 1 && (S = 1), h = Math.acos(S) * a;
                var C = y + x * S, w = x * Math.sin(h);
                o = Math.atan2(s * C - n * w, n * C + s * w), l.x = o * r - m, l.y = h * r + m
            } else {
                var L = y, $ = n - u.x, A = s - u.y, O = i.length * i.origin.scaleX, M = d * O, I = f * O,
                    F = Math.atan2(A, $), P = M * M, R = I * I, B = L * L, N = $ * $ + A * A, k = R * B + P * N - P * R,
                    U = -2 * R * L, V = R - P, X = U * U - 4 * V * k;
                if (X >= 0) {
                    var Y = Math.sqrt(X);
                    0 > U && (Y = -Y), Y = -(U + Y) / 2;
                    var H = Y / V, G = k / Y, W = Math.abs(H) < Math.abs(G) ? H : G;
                    if (N >= W * W) {
                        var z = Math.sqrt(N - W * W) * a;
                        o = F - Math.atan2(z, W), h = Math.atan2(z / f, (W - L) / d), l.x = o * r - m, l.y = h * r + m;
                        break t
                    }
                }
                var j = 0, q = Number.MAX_VALUE, Z = 0, K = 0, Q = 0, J = 0, tt = 0, et = 0, it = L + M, nt = it * it;
                nt > J && (Q = 0, J = nt, tt = it), it = L - M, nt = it * it, q > nt && (j = Math.PI, q = nt, Z = it);
                var st = Math.acos(-M * L / (P - R));
                it = M * Math.cos(st) + L;
                var at = I * Math.sin(st);
                nt = it * it + at * at, q > nt && (j = st, q = nt, Z = it, K = at), nt > J && (Q = st, J = nt, tt = it, et = at), (q + J) / 2 >= N ? (o = F - Math.atan2(K * a, Z), h = j * a) : (o = F - Math.atan2(et * a, tt), h = Q * a), l.x = o * r - m, l.y = h * r + m
            }
            return this.normalize(l.x), this.normalize(l.y), l
        }, n.normalize = function (t) {
            t > Math.PI ? t -= 2 * Math.PI : t < -Math.PI && (t += 2 * Math.PI)
        }, e
    }();
    t.FastIKConstraint = e, egret.registerClass(e, "dragonBones.FastIKConstraint")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (e) {
        function i() {
            e.call(this), this._currentDisplayIndex = 0, this.hasChildArmature = !1, this._currentDisplayIndex = -1, this._originZOrder = 0, this._tweenZOrder = 0, this._offsetZOrder = 0, this._colorTransform = new t.ColorTransform, this._isColorChanged = !1, this._displayDataList = null, this._currentDisplay = null, this.inheritRotation = !0, this.inheritScale = !0
        }

        __extends(i, e);
        var n = __define, s = i, a = s.prototype;
        return a.initWithSlotData = function (t) {
            this.name = t.name, this.blendMode = t.blendMode, this._defaultGotoAndPlay = t.gotoAndPlay, this._originZOrder = t.zOrder, this._displayDataList = t.displayDataList, this._originDisplayIndex = t.displayIndex
        }, a.dispose = function () {
            this._displayList && (e.prototype.dispose.call(this), this._displayDataList = null, this._displayList = null, this._currentDisplay = null)
        }, a.updateByCache = function () {
            e.prototype.updateByCache.call(this), this._updateTransform();
            var i = this._frameCache.colorTransform, n = null != i;
            (this.colorChanged != n || this.colorChanged && n && !t.ColorTransformUtil.isEqual(this._colorTransform, i)) && (i = i || t.ColorTransformUtil.originalColor, this._updateDisplayColor(i.alphaOffset, i.redOffset, i.greenOffset, i.blueOffset, i.alphaMultiplier, i.redMultiplier, i.greenMultiplier, i.blueMultiplier, n)), this._changeDisplayIndex(this._frameCache.displayIndex), this.gotoAndPlay = this._frameCache.gotoAndPlay
        }, a._update = function () {
            if (!(this._parent._needUpdate <= 0)) {
                var t = this._updateGlobal();
                t && t.release(), this._updateTransform()
            }
        }, a._calculateRelativeParentTransform = function () {
            this._global.copy(this._origin), this._global.x += this._parent._tweenPivot.x, this._global.y += this._parent._tweenPivot.y
        }, a.updateChildArmatureAnimation = function () {
            if (this.childArmature) if (this._currentDisplayIndex >= 0) {
                var t = this._gotoAndPlay;
                null == t && (t = this._defaultGotoAndPlay, null == t && this.childArmature.armatureData.defaultAnimation), null == t && this.armature && this.armature.animation.lastAnimationState && (t = this.armature.animation.lastAnimationState.name), t && this.childArmature.animation.hasAnimation(t) ? this.childArmature.animation.gotoAndPlay(t) : this.childArmature.animation.play()
            } else this.childArmature.animation.stop(), this.childArmature.animation._lastAnimationState = null
        }, a.initDisplayList = function (t) {
            this._displayList = t
        }, a.clearCurrentDisplay = function () {
            if (this.hasChildArmature) {
                var t = this.childArmature;
                t && t.resetAnimation()
            }
            var e = this._getDisplayIndex();
            return this._removeDisplayFromContainer(), e
        }, a._changeDisplayIndex = function (t) {
            if (void 0 === t && (t = 0), this._currentDisplayIndex != t) {
                var e = -1;
                this._currentDisplayIndex >= 0 && (e = this.clearCurrentDisplay()), this._currentDisplayIndex = t, this._currentDisplayIndex >= 0 && (this._origin.copy(this._displayDataList[this._currentDisplayIndex].transform), this.initCurrentDisplay(e))
            }
        }, a.changeSlotDisplay = function (t) {
            var e = this.clearCurrentDisplay();
            this._displayList[this._currentDisplayIndex] = t, this.initCurrentDisplay(e)
        }, a.initCurrentDisplay = function (e) {
            void 0 === e && (e = 0);
            var i = this._displayList[this._currentDisplayIndex];
            if (i ? i instanceof t.FastArmature ? this._currentDisplay = i.display : this._currentDisplay = i : this._currentDisplay = null, this._updateDisplay(this._currentDisplay), this._currentDisplay && (-1 != e ? this._addDisplayToContainer(this.armature.display, e) : (this.armature._slotsZOrderChanged = !0, this._addDisplayToContainer(this.armature.display)), this._blendMode && this._updateDisplayBlendMode(this._blendMode), this._isColorChanged && this._updateDisplayColor(this._colorTransform.alphaOffset, this._colorTransform.redOffset, this._colorTransform.greenOffset, this._colorTransform.blueOffset, this._colorTransform.alphaMultiplier, this._colorTransform.redMultiplier, this._colorTransform.greenMultiplier, this._colorTransform.blueMultiplier, !0), this._updateTransform(), i instanceof t.FastArmature)) {
                var n = i;
                this.armature && this.armature.animation.animationState && n.animation.hasAnimation(this.armature.animation.animationState.name) ? n.animation.gotoAndPlay(this.armature.animation.animationState.name) : n.animation.play()
            }
        }, n(a, "visible", void 0, function (t) {
            this._visible != t && (this._visible = t, this._updateDisplayVisible(this._visible))
        }), n(a, "displayList", function () {
            return this._displayList
        }, function (t) {
            if (!t) throw new Error;
            var e = t[this._currentDisplayIndex],
                i = this._currentDisplayIndex >= 0 && this._displayList[this._currentDisplayIndex] != e;
            this._displayList = t, i && this.changeSlotDisplay(e)
        }), n(a, "display", function () {
            return this._currentDisplay
        }, function (t) {
            this._currentDisplayIndex < 0 || this._displayList[this._currentDisplayIndex] != t && this.changeSlotDisplay(t)
        }), n(a, "childArmature", function () {
            return this._displayList[this._currentDisplayIndex] instanceof t.Armature || this._displayList[this._currentDisplayIndex] instanceof t.FastArmature ? this._displayList[this._currentDisplayIndex] : null
        }, function (t) {
            this.display = t
        }), n(a, "zOrder", function () {
            return this._originZOrder + this._tweenZOrder + this._offsetZOrder
        }, function (t) {
            this.zOrder != t && (this._offsetZOrder = t - this._originZOrder - this._tweenZOrder, this.armature && (this.armature._slotsZOrderChanged = !0))
        }), n(a, "blendMode", function () {
            return this._blendMode
        }, function (t) {
            this._blendMode != t && (this._blendMode = t, this._updateDisplayBlendMode(this._blendMode))
        }), n(a, "gotoAndPlay", function () {
            return this._gotoAndPlay
        }, function (t) {
            this._gotoAndPlay != t && (this._gotoAndPlay = t, this.updateChildArmatureAnimation())
        }), n(a, "colorTransform", function () {
            return this._colorTransform
        }), n(a, "displayIndex", function () {
            return this._currentDisplayIndex
        }), n(a, "colorChanged", function () {
            return this._isColorChanged
        }), a._updateDisplay = function (t) {
            throw new Error("Abstract method needs to be implemented in subclass!")
        }, a._getDisplayIndex = function () {
            throw new Error("Abstract method needs to be implemented in subclass!")
        }, a._addDisplayToContainer = function (t, e) {
            throw void 0 === e && (e = -1), new Error("Abstract method needs to be implemented in subclass!")
        }, a._removeDisplayFromContainer = function () {
            throw new Error("Abstract method needs to be implemented in subclass!")
        }, a._updateTransform = function () {
            throw new Error("Abstract method needs to be implemented in subclass!")
        }, a._updateDisplayVisible = function (t) {
            throw new Error("Abstract method needs to be implemented in subclass!")
        }, a._updateDisplayColor = function (t, e, i, n, s, a, r, o, h) {
            void 0 === h && (h = !1), this._colorTransform.alphaOffset = t, this._colorTransform.redOffset = e, this._colorTransform.greenOffset = i, this._colorTransform.blueOffset = n, this._colorTransform.alphaMultiplier = s, this._colorTransform.redMultiplier = a, this._colorTransform.greenMultiplier = r, this._colorTransform.blueMultiplier = o, this._isColorChanged = h
        }, a._updateDisplayBlendMode = function (t) {
            throw new Error("Abstract method needs to be implemented in subclass!")
        }, a._arriveAtFrame = function (t, e) {
            var i = t, n = i.displayIndex;
            if (this._changeDisplayIndex(n), this._updateDisplayVisible(i.visible), n >= 0 && (isNaN(i.zOrder) || i.zOrder == this._tweenZOrder || (this._tweenZOrder = i.zOrder, this.armature._slotsZOrderChanged = !0)), t.action) {
                var s = this.childArmature;
                s && s.getAnimation().gotoAndPlay(t.action)
            } else this.gotoAndPlay = i.gotoAndPlay
        }, a.hideSlots = function () {
            this._changeDisplayIndex(-1), this._removeDisplayFromContainer(), this._frameCache && this._frameCache.clear()
        }, a._updateGlobal = function () {
            this._calculateRelativeParentTransform(), t.TransformUtil.transformToMatrix(this._global, this._globalTransformMatrix);
            var e = this._calculateParentTransform();
            return e && (this._globalTransformMatrix.concat(e.parentGlobalTransformMatrix), t.TransformUtil.matrixToTransform(this._globalTransformMatrix, this._global, this._global.scaleX * e.parentGlobalTransform.scaleX >= 0, this._global.scaleY * e.parentGlobalTransform.scaleY >= 0)), e
        }, a._resetToOrigin = function () {
            this._changeDisplayIndex(this._originDisplayIndex), this._updateDisplayColor(0, 0, 0, 0, 1, 1, 1, 1, !0)
        }, i
    }(t.FastDBObject);
    t.FastSlot = e, egret.registerClass(e, "dragonBones.FastSlot", ["dragonBones.ISlotCacheGenerator", "dragonBones.ICacheUser"])
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function e(e) {
            this.animationState = new t.FastAnimationState, this._armature = e, this.animationState._armature = e, this.animationList = [],
                this._animationDataObj = {}, this._isPlaying = !1, this._timeScale = 1
        }

        var i = __define, n = e, s = n.prototype;
        return s.dispose = function () {
            this._armature && (this._armature = null, this._animationDataList = null, this.animationList = null, this.animationState = null)
        }, s.gotoAndPlay = function (t, e, i, n) {
            if (void 0 === e && (e = -1), void 0 === i && (i = -1), void 0 === n && (n = NaN), !this._animationDataList) return null;
            var s = this._animationDataObj[t];
            if (!s) return null;
            this._isPlaying = !0, e = 0 > e ? s.fadeTime < 0 ? .3 : s.fadeTime : e;
            var a;
            a = 0 > i ? s.scale < 0 ? 1 : s.scale : 1e3 * i / s.duration, n = isNaN(n) ? s.playTimes : n, this.animationState._fadeIn(s, n, 1 / a, e), this._armature.enableCache && this.animationCacheManager && (this.animationState.animationCache = this.animationCacheManager.getAnimationCache(t));
            for (var r = this._armature.slotHasChildArmatureList.length; r--;) {
                var o = this._armature.slotHasChildArmatureList[r], h = o.childArmature;
                h && h.getAnimation().gotoAndPlay(t)
            }
            return this.animationState
        }, s.gotoAndStop = function (t, e, i, n, s) {
            return void 0 === i && (i = -1), void 0 === n && (n = 0), void 0 === s && (s = -1), this.animationState.name != t && this.gotoAndPlay(t, n, s), i >= 0 ? this.animationState.setCurrentTime(this.animationState.totalTime * i) : this.animationState.setCurrentTime(e), this.animationState.stop(), this.animationState
        }, s.play = function () {
            this._animationDataList && (this.animationState.name ? this._isPlaying ? this.gotoAndPlay(this.animationState.name) : this._isPlaying = !0 : this.gotoAndPlay(this._animationDataList[0].name))
        }, s.stop = function () {
            this._isPlaying = !1
        }, s.advanceTime = function (t) {
            this._isPlaying && this.animationState._advanceTime(t * this._timeScale)
        }, s.hasAnimation = function (t) {
            return null != this._animationDataObj[t]
        }, i(s, "timeScale", function () {
            return this._timeScale
        }, function (t) {
            (isNaN(t) || 0 > t) && (t = 1), this._timeScale = t
        }), i(s, "animationDataList", function () {
            return this._animationDataList
        }, function (t) {
            this._animationDataList = t, this.animationList.length = 0;
            for (var e = this._animationDataList.length, i = 0; e > i; i++) {
                var n = this._animationDataList[i];
                this.animationList.push(n.name), this._animationDataObj[n.name] = n
            }
        }), i(s, "movementList", function () {
            return this.animationList
        }), i(s, "movementID", function () {
            return this.lastAnimationName
        }), s.isPlaying = function () {
            return this._isPlaying && !this.isComplete
        }, i(s, "isComplete", function () {
            return this.animationState.isComplete
        }), i(s, "lastAnimationState", function () {
            return this.animationState
        }), i(s, "lastAnimationName", function () {
            return this.animationState ? this.animationState.name : null
        }), e
    }();
    t.FastAnimation = e, egret.registerClass(e, "dragonBones.FastAnimation")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function e() {
            this._boneTimelineStateList = [], this._slotTimelineStateList = [], this._currentFrameIndex = 0, this._currentFramePosition = 0, this._currentFrameDuration = 0, this._currentPlayTimes = 0, this._totalTime = 0, this._currentTime = 0, this._lastTime = 0, this._playTimes = 0, this._fading = !1
        }

        var i = __define, n = e, s = n.prototype;
        return s.dispose = function () {
            this._resetTimelineStateList(), this._armature = null
        }, s.play = function () {
            return this._isPlaying = !0, this
        }, s.stop = function () {
            return this._isPlaying = !1, this
        }, s.setCurrentTime = function (t) {
            return (0 > t || isNaN(t)) && (t = 0), this._time = t, this._currentTime = 1e3 * this._time, this
        }, s._resetTimelineStateList = function () {
            for (var e = this._boneTimelineStateList.length; e--;) t.FastBoneTimelineState.returnObject(this._boneTimelineStateList[e]);
            for (this._boneTimelineStateList.length = 0, e = this._slotTimelineStateList.length; e--;) t.FastSlotTimelineState.returnObject(this._slotTimelineStateList[e]);
            this._slotTimelineStateList.length = 0, this.name = null
        }, s._fadeIn = function (t, e, i, n) {
            this.animationData = t, this.name = this.animationData.name, this._totalTime = this.animationData.duration, this.autoTween = t.autoTween, this.setTimeScale(i), this.setPlayTimes(e), this._isComplete = !1, this._currentFrameIndex = -1, this._currentPlayTimes = -1, Math.round(this._totalTime * this.animationData.frameRate * .001) < 2 ? this._currentTime = this._totalTime : this._currentTime = -1, this._fadeTotalTime = n * this._timeScale, this._fading = this._fadeTotalTime > 0, this._isPlaying = !0, this._armature.enableCache && this.animationCache && this._fading && this._boneTimelineStateList && this.updateTransformTimeline(this.progress), this._time = 0, this._progress = 0, this._updateTimelineStateList(), this.hideBones()
        }, s._updateTimelineStateList = function () {
            this._resetTimelineStateList();
            for (var e, i = this.animationData.timelineList.length, n = 0; i > n; n++) {
                var s = this.animationData.timelineList[n];
                e = s.name;
                var a = this._armature.getBone(e);
                if (a) {
                    var r = t.FastBoneTimelineState.borrowObject();
                    r.fadeIn(a, this, s), this._boneTimelineStateList.push(r)
                }
            }
            for (var o = this.animationData.slotTimelineList.length, h = 0; o > h; h++) {
                var l = this.animationData.slotTimelineList[h];
                e = l.name;
                var u = this._armature.getSlot(e);
                if (u && u.displayList.length > 0) {
                    var c = t.FastSlotTimelineState.borrowObject();
                    c.fadeIn(u, this, l), this._slotTimelineStateList.push(c)
                }
            }
        }, s._advanceTime = function (t) {
            if (t *= this._timeScale, this._fading && (this._time += t, this._progress = this._time / this._fadeTotalTime, this._progress >= 1 && (this._progress = 0, this._time = 0, this._fading = !1)), this._fading) {
                for (var e = this._boneTimelineStateList.length, i = 0; e > i; i++) {
                    var n = this._boneTimelineStateList[i];
                    n.updateFade(this.progress)
                }
                for (var s = this._slotTimelineStateList.length, a = 0; s > a; a++) {
                    var r = this._slotTimelineStateList[a];
                    r.updateFade(this.progress)
                }
            } else this.advanceTimelinesTime(t)
        }, s.advanceTimelinesTime = function (e) {
            this._isPlaying && (this._time += e);
            var i = !1, n = !1, s = !1, a = !1, r = 0, o = 1e3 * this._time;
            0 == this._playTimes || o < this._playTimes * this._totalTime ? (a = !1, this._progress = o / this._totalTime, r = Math.ceil(this.progress) || 1, this._progress -= Math.floor(this.progress), o %= this._totalTime) : (r = this._playTimes, o = this._totalTime, a = !0, this._progress = 1), this._isComplete = a, this.isUseCache() ? this.animationCache.update(this.progress) : this.updateTransformTimeline(this.progress), this._currentTime != o && (this._currentPlayTimes != r && (this._currentPlayTimes > 0 && r > 1 && (n = !0), this._currentPlayTimes = r), this._currentTime < 0 && (i = !0), this._isComplete && (s = !0), this._lastTime = this._currentTime, this._currentTime = o, this.updateMainTimeline(a));
            var h;
            i && this._armature.hasEventListener(t.AnimationEvent.START) && (h = new t.AnimationEvent(t.AnimationEvent.START), h.animationState = this, this._armature._addEvent(h)), s ? this._armature.hasEventListener(t.AnimationEvent.COMPLETE) && (h = new t.AnimationEvent(t.AnimationEvent.COMPLETE), h.animationState = this, this._armature._addEvent(h)) : n && this._armature.hasEventListener(t.AnimationEvent.LOOP_COMPLETE) && (h = new t.AnimationEvent(t.AnimationEvent.LOOP_COMPLETE), h.animationState = this, this._armature._addEvent(h))
        }, s.updateTransformTimeline = function (t) {
            var e, i, n = this._boneTimelineStateList.length;
            if (this._isComplete) {
                for (; n--;) e = this._boneTimelineStateList[n], e.update(t), this._isComplete = e._isComplete && this._isComplete;
                for (n = this._slotTimelineStateList.length; n--;) i = this._slotTimelineStateList[n], i.update(t), this._isComplete = i._isComplete && this._isComplete
            } else {
                for (; n--;) e = this._boneTimelineStateList[n], e.update(t);
                for (n = this._slotTimelineStateList.length; n--;) i = this._slotTimelineStateList[n], i.update(t)
            }
        }, s.updateMainTimeline = function (t) {
            var e = this.animationData.frameList;
            if (e.length > 0) {
                for (var i, n, s = 0, a = this.animationData.frameList.length; a > s; ++s) {
                    if (this._currentFrameIndex < 0) this._currentFrameIndex = 0; else {
                        if (!(this._currentTime < this._currentFramePosition || this._currentTime >= this._currentFramePosition + this._currentFrameDuration || this._currentTime < this._lastTime)) break;
                        if (this._lastTime = this._currentTime, this._currentFrameIndex++, this._currentFrameIndex >= e.length) {
                            if (t) {
                                this._currentFrameIndex--;
                                break
                            }
                            this._currentFrameIndex = 0
                        }
                    }
                    n = e[this._currentFrameIndex], i && this._armature.arriveAtFrame(i, this), this._currentFrameDuration = n.duration, this._currentFramePosition = n.position, i = n
                }
                n && this._armature.arriveAtFrame(n, this)
            }
        }, s.setTimeScale = function (t) {
            return (isNaN(t) || t == 1 / 0) && (t = 1), this._timeScale = t, this
        }, s.setPlayTimes = function (t) {
            return void 0 === t && (t = 0), Math.round(.001 * this._totalTime * this.animationData.frameRate) < 2 ? this._playTimes = 1 : this._playTimes = t, this
        }, i(s, "playTimes", function () {
            return this._playTimes
        }), i(s, "currentPlayTimes", function () {
            return this._currentPlayTimes < 0 ? 0 : this._currentPlayTimes
        }), i(s, "isComplete", function () {
            return this._isComplete
        }), i(s, "isPlaying", function () {
            return this._isPlaying && !this._isComplete
        }), i(s, "totalTime", function () {
            return .001 * this._totalTime
        }), i(s, "currentTime", function () {
            return this._currentTime < 0 ? 0 : .001 * this._currentTime
        }), s.isUseCache = function () {
            return this._armature.enableCache && this.animationCache && !this._fading
        }, s.hideBones = function () {
            for (var t = this.animationData.hideTimelineNameMap.length, e = 0; t > e; e++) {
                var i = this.animationData.hideTimelineNameMap[e], n = this._armature.getBone(i);
                n && n._hideSlots()
            }
            var s;
            for (e = 0, t = this.animationData.hideSlotTimelineNameMap.length; t > e; e++) {
                s = this.animationData.hideSlotTimelineNameMap[e];
                var a = this._armature.getSlot(s);
                a && a._resetToOrigin()
            }
        }, i(s, "progress", function () {
            return this._progress
        }), e
    }();
    t.FastAnimationState = e, egret.registerClass(e, "dragonBones.FastAnimationState", ["dragonBones.IAnimationState"])
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function e() {
            this._totalTime = 0, this._currentTime = 0, this._lastTime = 0, this._currentFrameIndex = 0, this._currentFramePosition = 0, this._currentFrameDuration = 0, this._updateMode = 0, this._transform = new t.DBTransform, this._durationTransform = new t.DBTransform, this._transformToFadein = new t.DBTransform, this._pivot = new t.Point, this._durationPivot = new t.Point
        }

        var i = e, n = i.prototype;
        return e.borrowObject = function () {
            return 0 == e._pool.length ? new e : e._pool.pop()
        }, e.returnObject = function (t) {
            e._pool.indexOf(t) < 0 && (e._pool[e._pool.length] = t), t.clear()
        }, e.clear = function () {
            for (var t = e._pool.length; t--;) e._pool[t].clear();
            e._pool.length = 0
        }, n.clear = function () {
            this._bone && (this._bone._timelineState = null, this._bone = null), this._animationState = null, this._timelineData = null, this._originPivot = null
        }, n.fadeIn = function (e, i, n) {
            switch (this._bone = e, this._animationState = i, this._timelineData = n, this.name = n.name, this._totalTime = this._timelineData.duration, this._isComplete = !1, this._tweenTransform = !1, this._currentFrameIndex = -1, this._currentTime = -1, this._tweenEasing = NaN, this._durationPivot.x = 0, this._durationPivot.y = 0, this._pivot.x = 0, this._pivot.y = 0, this._originPivot = this._timelineData.originPivot, this._timelineData.frameList.length) {
                case 0:
                    this._updateMode = 0;
                    break;
                case 1:
                    this._updateMode = 1;
                    break;
                default:
                    this._updateMode = -1
            }
            if (i._fadeTotalTime > 0) {
                this._bone._timelineState ? this._transformToFadein.copy(this._bone._timelineState._transform) : this._transformToFadein = new t.DBTransform;
                var s = this._timelineData.frameList[0];
                this._durationTransform.copy(s.transform), this._durationTransform.minus(this._transformToFadein)
            }
            this._bone._timelineState = this
        }, n.updateFade = function (t) {
            this._transform.x = this._transformToFadein.x + this._durationTransform.x * t, this._transform.y = this._transformToFadein.y + this._durationTransform.y * t, this._transform.scaleX = this._transformToFadein.scaleX * (1 + (this._durationTransform.scaleX - 1) * t), this._transform.scaleY = this._transformToFadein.scaleX * (1 + (this._durationTransform.scaleY - 1) * t), this._transform.rotation = this._transformToFadein.rotation + this._durationTransform.rotation * t, this._bone.invalidUpdate()
        }, n.update = function (t) {
            1 == this._updateMode ? (this._updateMode = 0, this.updateSingleFrame()) : -1 == this._updateMode && this.updateMultipleFrame(t)
        }, n.updateSingleFrame = function () {
            var t = this._timelineData.frameList[0];
            this._bone.arriveAtFrame(t, this._animationState), this._isComplete = !0, this._tweenEasing = NaN, this._tweenTransform = !1, this._pivot.x = this._originPivot.x + t.pivot.x, this._pivot.y = this._originPivot.y + t.pivot.y, this._transform.copy(t.transform), this._bone.invalidUpdate()
        }, n.updateMultipleFrame = function (t) {
            var e = 0;
            t /= this._timelineData.scale, t += this._timelineData.offset;
            var i = this._totalTime * t, n = this._animationState.playTimes;
            if (0 == n) this._isComplete = !1, e = Math.ceil(Math.abs(i) / this._totalTime) || 1, i -= Math.floor(i / this._totalTime) * this._totalTime, 0 > i && (i += this._totalTime); else {
                var s = n * this._totalTime;
                i >= s ? (i = s, this._isComplete = !0) : -s >= i ? (i = -s, this._isComplete = !0) : this._isComplete = !1, 0 > i && (i += s), e = Math.ceil(i / this._totalTime) || 1, this._isComplete ? i = this._totalTime : i -= Math.floor(i / this._totalTime) * this._totalTime
            }
            if (this._currentTime != i) {
                this._lastTime = this._currentTime, this._currentTime = i;
                for (var a, r, o = this._timelineData.frameList, h = 0, l = this._timelineData.frameList.length; l > h; ++h) {
                    if (this._currentFrameIndex < 0) this._currentFrameIndex = 0; else {
                        if (!(this._currentTime < this._currentFramePosition || this._currentTime >= this._currentFramePosition + this._currentFrameDuration || this._currentTime < this._lastTime)) break;
                        if (this._currentFrameIndex++, this._lastTime = this._currentTime, this._currentFrameIndex >= o.length) {
                            if (this._isComplete) {
                                this._currentFrameIndex--;
                                break
                            }
                            this._currentFrameIndex = 0
                        }
                    }
                    r = o[this._currentFrameIndex], a && this._bone.arriveAtFrame(a, this._animationState), this._currentFrameDuration = r.duration, this._currentFramePosition = r.position, a = r
                }
                r && (this._bone.arriveAtFrame(r, this._animationState), this.updateToNextFrame(e)), this._tweenTransform && this.updateTween()
            }
        }, n.updateToNextFrame = function (e) {
            void 0 === e && (e = 0);
            var i = this._currentFrameIndex + 1;
            i >= this._timelineData.frameList.length && (i = 0);
            var n = this._timelineData.frameList[this._currentFrameIndex], s = this._timelineData.frameList[i], a = !1;
            0 == i && this._animationState.playTimes && this._animationState.currentPlayTimes >= this._animationState.playTimes && ((this._currentFramePosition + this._currentFrameDuration) / this._totalTime + e - this._timelineData.offset) * this._timelineData.scale > .999999 ? (this._tweenEasing = NaN, a = !1) : this._animationState.autoTween ? (this._tweenEasing = this._animationState.animationData.tweenEasing, isNaN(this._tweenEasing) ? (this._tweenEasing = n.tweenEasing, this._tweenCurve = n.curve, isNaN(this._tweenEasing) && null == this._tweenCurve ? a = !1 : (10 == this._tweenEasing && (this._tweenEasing = 0), a = !0)) : a = !0) : (this._tweenEasing = n.tweenEasing, this._tweenCurve = n.curve, !isNaN(this._tweenEasing) && 10 != this._tweenEasing || null != this._tweenCurve ? a = !0 : (this._tweenEasing = NaN, a = !1)), a ? (this._durationTransform.x = s.transform.x - n.transform.x, this._durationTransform.y = s.transform.y - n.transform.y, this._durationTransform.skewX = s.transform.skewX - n.transform.skewX, this._durationTransform.skewY = s.transform.skewY - n.transform.skewY, this._durationTransform.scaleX = s.transform.scaleX - n.transform.scaleX + s.scaleOffset.x, this._durationTransform.scaleY = s.transform.scaleY - n.transform.scaleY + s.scaleOffset.y, this._durationPivot.x = s.pivot.x - n.pivot.x, this._durationPivot.y = s.pivot.y - n.pivot.y, this._durationTransform.normalizeRotation(), 0 == i && (this._durationTransform.skewX = t.TransformUtil.formatRadian(this._durationTransform.skewX), this._durationTransform.skewY = t.TransformUtil.formatRadian(this._durationTransform.skewY)), this._durationTransform.x || this._durationTransform.y || this._durationTransform.skewX || this._durationTransform.skewY || 1 != this._durationTransform.scaleX || 1 != this._durationTransform.scaleY || this._durationPivot.x || this._durationPivot.y ? this._tweenTransform = !0 : this._tweenTransform = !1) : this._tweenTransform = !1, this._tweenTransform || (this._transform.copy(n.transform), this._pivot.x = this._originPivot.x + n.pivot.x, this._pivot.y = this._originPivot.y + n.pivot.y, this._bone.invalidUpdate())
        }, n.updateTween = function () {
            var e = (this._currentTime - this._currentFramePosition) / this._currentFrameDuration;
            this._tweenCurve ? e = this._tweenCurve.getValueByProgress(e) : this._tweenEasing && (e = t.MathUtil.getEaseValue(e, this._tweenEasing));
            var i = this._timelineData.frameList[this._currentFrameIndex], n = i.transform, s = i.pivot;
            this._transform.x = n.x + this._durationTransform.x * e, this._transform.y = n.y + this._durationTransform.y * e, this._transform.skewX = n.skewX + this._durationTransform.skewX * e, this._transform.skewY = n.skewY + this._durationTransform.skewY * e, this._transform.scaleX = n.scaleX + this._durationTransform.scaleX * e, this._transform.scaleY = n.scaleY + this._durationTransform.scaleY * e, this._pivot.x = s.x + this._durationPivot.x * e, this._pivot.y = s.y + this._durationPivot.y * e, this._bone.invalidUpdate()
        }, e._pool = [], e
    }();
    t.FastBoneTimelineState = e, egret.registerClass(e, "dragonBones.FastBoneTimelineState")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function e() {
            this._totalTime = 0, this._currentTime = 0, this._currentFrameIndex = 0, this._currentFramePosition = 0, this._currentFrameDuration = 0, this._updateMode = 0, this._durationColor = new t.ColorTransform
        }

        var i = e, n = i.prototype;
        return e.borrowObject = function () {
            return 0 == e._pool.length ? new e : e._pool.pop()
        }, e.returnObject = function (t) {
            e._pool.indexOf(t) < 0 && (e._pool[e._pool.length] = t), t.clear()
        }, e.clear = function () {
            for (var t = e._pool.length; t--;) e._pool[t].clear();
            e._pool.length = 0
        }, n.clear = function () {
            this._slot = null, this._armature = null, this._animation = null, this._animationState = null, this._timelineData = null
        }, n.fadeIn = function (t, e, i) {
            switch (this._slot = t, this._armature = this._slot.armature, this._animation = this._armature.animation, this._animationState = e, this._timelineData = i, this.name = i.name, this._totalTime = this._timelineData.duration, this._isComplete = !1, this._blendEnabled = !1, this._tweenColor = !1, this._currentFrameIndex = -1, this._currentTime = -1, this._tweenEasing = NaN, this._weight = 1, this._timelineData.frameList.length) {
                case 0:
                    this._updateMode = 0;
                    break;
                case 1:
                    this._updateMode = 1;
                    break;
                default:
                    this._updateMode = -1
            }
        }, n.updateFade = function (t) {
        }, n.update = function (t) {
            -1 == this._updateMode ? this.updateMultipleFrame(t) : 1 == this._updateMode && (this._updateMode = 0, this.updateSingleFrame())
        }, n.updateMultipleFrame = function (t) {
            var e = 0;
            t /= this._timelineData.scale, t += this._timelineData.offset;
            var i = this._totalTime * t, n = this._animationState.playTimes;
            if (0 == n) this._isComplete = !1, e = Math.ceil(Math.abs(i) / this._totalTime) || 1, i -= Math.floor(i / this._totalTime) * this._totalTime, 0 > i && (i += this._totalTime); else {
                var s = n * this._totalTime;
                i >= s ? (i = s, this._isComplete = !0) : -s >= i ? (i = -s, this._isComplete = !0) : this._isComplete = !1, 0 > i && (i += s), e = Math.ceil(i / this._totalTime) || 1, this._isComplete ? i = this._totalTime : i -= Math.floor(i / this._totalTime) * this._totalTime
            }
            if (this._currentTime != i) {
                this._currentTime = i;
                for (var a, r, o = this._timelineData.frameList, h = 0, l = this._timelineData.frameList.length; l > h; ++h) {
                    if (this._currentFrameIndex < 0) this._currentFrameIndex = 0; else {
                        if (!(this._currentTime < this._currentFramePosition || this._currentTime >= this._currentFramePosition + this._currentFrameDuration)) break;
                        if (this._currentFrameIndex++, this._currentFrameIndex >= o.length) {
                            if (this._isComplete) {
                                this._currentFrameIndex--;
                                break
                            }
                            this._currentFrameIndex = 0
                        }
                    }
                    r = o[this._currentFrameIndex], a && this._slot._arriveAtFrame(a, this._animationState), this._currentFrameDuration = r.duration, this._currentFramePosition = r.position, a = r
                }
                r && (this._slot._arriveAtFrame(r, this._animationState), this._blendEnabled = r.displayIndex >= 0, this._blendEnabled ? this.updateToNextFrame(e) : (this._tweenEasing = NaN, this._tweenColor = !1)), this._blendEnabled && this.updateTween()
            }
        }, n.updateToNextFrame = function (e) {
            void 0 === e && (e = 0);
            var i = this._currentFrameIndex + 1;
            i >= this._timelineData.frameList.length && (i = 0);
            var n = this._timelineData.frameList[this._currentFrameIndex], s = this._timelineData.frameList[i], a = !1;
            if (0 == i && this._animationState.playTimes && this._animationState.currentPlayTimes >= this._animationState.playTimes && ((this._currentFramePosition + this._currentFrameDuration) / this._totalTime + e - this._timelineData.offset) * this._timelineData.scale > .999999 ? (this._tweenEasing = NaN, a = !1) : n.displayIndex < 0 || s.displayIndex < 0 ? (this._tweenEasing = NaN, a = !1) : this._animationState.autoTween ? (this._tweenEasing = this._animationState.animationData.tweenEasing, isNaN(this._tweenEasing) ? (this._tweenEasing = n.tweenEasing, this._tweenCurve = n.curve, isNaN(this._tweenEasing) && null == this._tweenCurve ? a = !1 : (10 == this._tweenEasing && (this._tweenEasing = 0), a = !0)) : a = !0) : (this._tweenEasing = n.tweenEasing, this._tweenCurve = n.curve, !isNaN(this._tweenEasing) && 10 != this._tweenEasing || null != this._tweenCurve ? a = !0 : (this._tweenEasing = NaN, a = !1)), a && (n.color || s.color) ? (t.ColorTransformUtil.minus(s.color || t.ColorTransformUtil.originalColor, n.color || t.ColorTransformUtil.originalColor, this._durationColor), this._tweenColor = 0 != this._durationColor.alphaOffset || 0 != this._durationColor.redOffset || 0 != this._durationColor.greenOffset || 0 != this._durationColor.blueOffset || 0 != this._durationColor.alphaMultiplier || 0 != this._durationColor.redMultiplier || 0 != this._durationColor.greenMultiplier || 0 != this._durationColor.blueMultiplier) : this._tweenColor = !1, !this._tweenColor) {
                var r, o;
                n.color ? (r = n.color, o = !0) : (r = t.ColorTransformUtil.originalColor, o = !1), (this._slot._isColorChanged || o) && (t.ColorTransformUtil.isEqual(this._slot._colorTransform, r) || this._slot._updateDisplayColor(r.alphaOffset, r.redOffset, r.greenOffset, r.blueOffset, r.alphaMultiplier, r.redMultiplier, r.greenMultiplier, r.blueMultiplier, o))
            }
        }, n.updateTween = function () {
            var e = this._timelineData.frameList[this._currentFrameIndex];
            if (this._tweenColor) {
                var i = (this._currentTime - this._currentFramePosition) / this._currentFrameDuration;
                null != this._tweenCurve ? i = this._tweenCurve.getValueByProgress(i) : this._tweenEasing && (i = t.MathUtil.getEaseValue(i, this._tweenEasing)), e.color ? this._slot._updateDisplayColor(e.color.alphaOffset + this._durationColor.alphaOffset * i, e.color.redOffset + this._durationColor.redOffset * i, e.color.greenOffset + this._durationColor.greenOffset * i, e.color.blueOffset + this._durationColor.blueOffset * i, e.color.alphaMultiplier + this._durationColor.alphaMultiplier * i, e.color.redMultiplier + this._durationColor.redMultiplier * i, e.color.greenMultiplier + this._durationColor.greenMultiplier * i, e.color.blueMultiplier + this._durationColor.blueMultiplier * i, !0) : this._slot._updateDisplayColor(this._durationColor.alphaOffset * i, this._durationColor.redOffset * i, this._durationColor.greenOffset * i, this._durationColor.blueOffset * i, this._durationColor.alphaMultiplier * i + 1, this._durationColor.redMultiplier * i + 1, this._durationColor.greenMultiplier * i + 1, this._durationColor.blueMultiplier * i + 1, !0)
            }
        }, n.updateSingleFrame = function () {
            var e = this._timelineData.frameList[0];
            if (this._slot._arriveAtFrame(e, this._animationState), this._isComplete = !0, this._tweenEasing = NaN, this._tweenColor = !1, this._blendEnabled = e.displayIndex >= 0, this._blendEnabled) {
                var i, n;
                e.color ? (i = e.color, n = !0) : (i = t.ColorTransformUtil.originalColor, n = !1), (this._slot._isColorChanged || n) && (t.ColorTransformUtil.isEqual(this._slot._colorTransform, i) || this._slot._updateDisplayColor(i.alphaOffset, i.redOffset, i.greenOffset, i.blueOffset, i.alphaMultiplier, i.redMultiplier, i.greenMultiplier, i.blueMultiplier, n))
            }
        }, e.HALF_PI = .5 * Math.PI, e.DOUBLE_PI = 2 * Math.PI, e._pool = [], e
    }();
    t.FastSlotTimelineState = e, egret.registerClass(e, "dragonBones.FastSlotTimelineState")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function t(t, e) {
            void 0 === t && (t = 0), void 0 === e && (e = 0), this.x = t, this.y = e
        }

        var e = t, i = e.prototype;
        return i.toString = function () {
            return "[Point (x=" + this.x + " y=" + this.y + ")]"
        }, t
    }();
    t.Point = e, egret.registerClass(e, "dragonBones.Point")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function t(t, e, i, n) {
            void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === i && (i = 0), void 0 === n && (n = 0), this.x = t, this.y = e, this.width = i, this.height = n
        }

        var e = t;
        return e.prototype, t
    }();
    t.Rectangle = e, egret.registerClass(e, "dragonBones.Rectangle")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function t() {
            this.duration = 0, this._frameList = [], this.duration = 0, this.scale = 1
        }

        var e = __define, i = t, n = i.prototype;
        return n.dispose = function () {
            for (var t = this._frameList.length; t--;) this._frameList[t].dispose();
            this._frameList = null
        }, n.addFrame = function (t) {
            if (!t) throw new Error;
            if (!(this._frameList.indexOf(t) < 0)) throw new Error;
            this._frameList[this._frameList.length] = t
        }, e(n, "frameList", function () {
            return this._frameList
        }), t
    }();
    t.Timeline = e, egret.registerClass(e, "dragonBones.Timeline")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (t) {
        function e() {
            t.call(this), this.frameRate = 0, this.playTimes = 0, this.lastFrameDuration = 0, this.fadeTime = 0, this.playTimes = 0, this.autoTween = !0, this.tweenEasing = NaN, this.hideTimelineNameMap = [], this.hideSlotTimelineNameMap = [], this._timelineList = [], this._slotTimelineList = []
        }

        __extends(e, t);
        var i = __define, n = e, s = n.prototype;
        return i(s, "timelineList", function () {
            return this._timelineList
        }), i(s, "slotTimelineList", function () {
            return this._slotTimelineList
        }), s.dispose = function () {
            t.prototype.dispose.call(this), this.hideTimelineNameMap = null;
            var e = 0, i = 0;
            for (e = 0, i = this._timelineList.length; i > e; e++) {
                var n = this._timelineList[e];
                n.dispose()
            }
            for (this._timelineList = null, e = 0, i = this._slotTimelineList.length; i > e; e++) {
                var s = this._slotTimelineList[e];
                s.dispose()
            }
            this._slotTimelineList = null
        }, s.getTimeline = function (t) {
            for (var e = this._timelineList.length; e--;) if (this._timelineList[e].name == t) return this._timelineList[e];
            return null
        }, s.addTimeline = function (t) {
            if (!t) throw new Error;
            this._timelineList.indexOf(t) < 0 && (this._timelineList[this._timelineList.length] = t)
        }, s.getSlotTimeline = function (t) {
            for (var e = this._slotTimelineList.length; e--;) if (this._slotTimelineList[e].name == t) return this._slotTimelineList[e];
            return null
        }, s.addSlotTimeline = function (t) {
            if (!t) throw new Error;
            this._slotTimelineList.indexOf(t) < 0 && (this._slotTimelineList[this._slotTimelineList.length] = t)
        }, e
    }(t.Timeline);
    t.AnimationData = e, egret.registerClass(e, "dragonBones.AnimationData")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function t() {
            this._boneDataList = [], this._ikDataList = [], this._skinDataList = [], this._slotDataList = [], this._animationDataList = []
        }

        var e = __define, i = t, n = i.prototype;
        return t.sortBoneDataHelpArray = function (t, e) {
            return t[0] > e[0] ? 1 : -1
        }, t.sortBoneDataHelpArrayDescending = function (t, e) {
            return t[0] > e[0] ? -1 : 1
        }, n.setSkinData = function (t) {
            var e = 0, i = this._slotDataList.length;
            for (e = 0; i > e; e++) this._slotDataList[e].dispose();
            var n;
            if (!t && this._skinDataList.length > 0) n = this._skinDataList[0]; else for (e = 0, i = this._skinDataList.length; i > e; e++) if (this._skinDataList[e].name == t) {
                n = this._skinDataList[e];
                break
            }
            if (n) {
                var s;
                for (e = 0, i = n.slotDataList.length, e = 0; i > e; e++) if (s = this.getSlotData(n.slotDataList[e].name)) {
                    var a = 0, r = n.slotDataList[e].displayDataList.length;
                    for (a = 0; r > a; a++) s.addDisplayData(n.slotDataList[e].displayDataList[a])
                }
            }
        }, n.dispose = function () {
            for (var t = this._boneDataList.length; t--;) this._boneDataList[t].dispose();
            for (t = this._ikDataList.length; t--;) this._ikDataList[t].dispose();
            for (t = this._skinDataList.length; t--;) this._skinDataList[t].dispose();
            for (t = this._slotDataList.length; t--;) this._slotDataList[t].dispose();
            for (t = this._animationDataList.length; t--;) this._animationDataList[t].dispose();
            this._boneDataList = null, this._ikDataList = null, this._slotDataList = null, this._skinDataList = null, this._animationDataList = null
        }, n.getBoneData = function (t) {
            for (var e = this._boneDataList.length; e--;) if (this._boneDataList[e].name == t) return this._boneDataList[e];
            return null
        }, n.getIKData = function (t) {
            for (var e = this._ikDataList.length; e--;) if (this._ikDataList[e].name == t) return this._ikDataList[e];
            return null
        }, n.getSlotData = function (t) {
            for (var e = this._slotDataList.length; e--;) if (this._slotDataList[e].name == t) return this._slotDataList[e];
            return null
        }, n.getSkinData = function (t) {
            if (!t && this._skinDataList.length > 0) return this._skinDataList[0];
            for (var e = this._skinDataList.length; e--;) if (this._skinDataList[e].name == t) return this._skinDataList[e];
            return null
        }, n.getAnimationData = function (t) {
            for (var e = this._animationDataList.length; e--;) if (this._animationDataList[e].name == t) return this._animationDataList[e];
            return null
        }, n.addBoneData = function (t) {
            if (!t) throw new Error;
            if (!(this._boneDataList.indexOf(t) < 0)) throw new Error;
            this._boneDataList[this._boneDataList.length] = t
        }, n.addIKData = function (t) {
            if (!t) throw new Error;
            if (!(this._ikDataList.indexOf(t) < 0)) throw new Error;
            this._ikDataList[this._ikDataList.length] = t
        }, n.addSlotData = function (t) {
            if (!t) throw new Error;
            if (!(this._slotDataList.indexOf(t) < 0)) throw new Error;
            this._slotDataList[this._slotDataList.length] = t
        }, n.addSkinData = function (t) {
            if (!t) throw new Error;
            if (!(this._skinDataList.indexOf(t) < 0)) throw new Error;
            this._skinDataList[this._skinDataList.length] = t
        }, n.addAnimationData = function (t) {
            if (!t) throw new Error;
            this._animationDataList.indexOf(t) < 0 && (this._animationDataList[this._animationDataList.length] = t)
        }, n.sortBoneDataList = function () {
            var e = this._boneDataList.length;
            if (0 != e) {
                for (var i = []; e--;) {
                    for (var n = this._boneDataList[e], s = 0, a = n; a;) s++, a = this.getBoneData(a.parent);
                    i[e] = [s, n]
                }
                for (i.sort(t.sortBoneDataHelpArray), e = i.length; e--;) this._boneDataList[e] = i[e][1]
            }
        }, e(n, "boneDataList", function () {
            return this._boneDataList
        }), e(n, "ikDataList", function () {
            return this._ikDataList
        }), e(n, "slotDataList", function () {
            return this._slotDataList
        }), e(n, "skinDataList", function () {
            return this._skinDataList
        }), e(n, "animationDataList", function () {
            return this._animationDataList
        }), t
    }();
    t.ArmatureData = e, egret.registerClass(e, "dragonBones.ArmatureData")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function e() {
            this.length = 0, this.global = new t.DBTransform, this.transform = new t.DBTransform, this.inheritRotation = !0, this.inheritScale = !1
        }

        var i = e, n = i.prototype;
        return n.dispose = function () {
            this.global = null, this.transform = null
        }, e
    }();
    t.BoneData = e, egret.registerClass(e, "dragonBones.BoneData")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function t() {
            this.alphaMultiplier = 1, this.alphaOffset = 0, this.blueMultiplier = 1, this.blueOffset = 0, this.greenMultiplier = 1, this.greenOffset = 0, this.redMultiplier = 1, this.redOffset = 0
        }

        var e = t;
        return e.prototype, t
    }();
    t.ColorTransform = e, egret.registerClass(e, "dragonBones.ColorTransform")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function e() {
            this._dataChanged = !1, this._pointList = [], this.sampling = new Array(e.SamplingTimes);
            for (var i = 0; i < e.SamplingTimes - 1; i++) this.sampling[i] = new t.Point
        }

        var i = __define, n = e, s = n.prototype;
        return s.getValueByProgress = function (t) {
            this._dataChanged && this.refreshSampling();
            for (var i = 0; i < e.SamplingTimes - 1; i++) {
                var n = this.sampling[i];
                if (n.x >= t) {
                    if (0 == i) return n.y * t / n.x;
                    var s = this.sampling[i - 1];
                    return s.y + (n.y - s.y) * (t - s.x) / (n.x - s.x)
                }
            }
            return n.y + (1 - n.y) * (t - n.x) / (1 - n.x)
        }, s.refreshSampling = function () {
            for (var t = 0; t < e.SamplingTimes - 1; t++) this.bezierCurve(e.SamplingStep * (t + 1), this.sampling[t]);
            this._dataChanged = !1
        }, s.bezierCurve = function (t, e) {
            var i = 1 - t;
            e.x = 3 * this.point1.x * t * i * i + 3 * this.point2.x * t * t * i + Math.pow(t, 3), e.y = 3 * this.point1.y * t * i * i + 3 * this.point2.y * t * t * i + Math.pow(t, 3)
        }, i(s, "pointList", function () {
            return this._pointList
        }, function (t) {
            this._pointList = t, this._dataChanged = !0
        }), s.isCurve = function () {
            return 0 != this.point1.x || 0 != this.point1.y || 1 != this.point2.x || 1 != this.point2.y
        }, i(s, "point1", function () {
            return this.pointList[0]
        }), i(s, "point2", function () {
            return this.pointList[1]
        }), e.SamplingTimes = 20, e.SamplingStep = .05, e
    }();
    t.CurveData = e, egret.registerClass(e, "dragonBones.CurveData")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function e() {
            this.transform = new t.DBTransform, this.pivot = new t.Point
        }

        var i = e, n = i.prototype;
        return n.dispose = function () {
            this.transform = null, this.pivot = null
        }, e.ARMATURE = "armature", e.IMAGE = "image", e
    }();
    t.DisplayData = e, egret.registerClass(e, "dragonBones.DisplayData")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function t() {
            this.version = 0, this._armatureDataList = [], this._displayDataDictionary = {}
        }

        var e = __define, i = t, n = i.prototype;
        return n.dispose = function () {
            for (var t = 0, e = this._armatureDataList.length; e > t; t++) {
                var i = this._armatureDataList[t];
                i.dispose()
            }
            this._armatureDataList = null, this.removeAllDisplayData(), this._displayDataDictionary = null
        }, e(n, "armatureDataList", function () {
            return this._armatureDataList
        }), n.getArmatureDataByName = function (t) {
            for (var e = this._armatureDataList.length; e--;) if (this._armatureDataList[e].name == t) return this._armatureDataList[e];
            return null
        }, n.addArmatureData = function (t) {
            if (!t) throw new Error;
            if (!(this._armatureDataList.indexOf(t) < 0)) throw new Error;
            this._armatureDataList[this._armatureDataList.length] = t;
        }, n.removeArmatureData = function (t) {
            var e = this._armatureDataList.indexOf(t);
            e >= 0 && this._armatureDataList.splice(e, 1)
        }, n.removeArmatureDataByName = function (t) {
            for (var e = this._armatureDataList.length; e--;) this._armatureDataList[e].name == t && this._armatureDataList.splice(e, 1)
        }, n.getDisplayDataByName = function (t) {
            return this._displayDataDictionary[t]
        }, n.addDisplayData = function (t) {
            this._displayDataDictionary[t.name] = t
        }, n.removeDisplayDataByName = function (t) {
            delete this._displayDataDictionary[t]
        }, n.removeAllDisplayData = function () {
            for (var t in this._displayDataDictionary) delete this._displayDataDictionary[t]
        }, t
    }();
    t.DragonBonesData = e, egret.registerClass(e, "dragonBones.DragonBonesData")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function t() {
            this.position = 0, this.duration = 0, this.position = 0, this.duration = 0
        }

        var e = t, i = e.prototype;
        return i.dispose = function () {
        }, t
    }();
    t.Frame = e, egret.registerClass(e, "dragonBones.Frame")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function t() {
        }

        var e = t, i = e.prototype;
        return i.constructora = function () {
        }, i.dispose = function () {
        }, t
    }();
    t.IKData = e, egret.registerClass(e, "dragonBones.IKData")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function t() {
        }

        var e = t, i = e.prototype;
        return i.setTo = function (t, e) {
            return this.parentGlobalTransform = t, this.parentGlobalTransformMatrix = e, this
        }, i.release = function () {
            t.dispose(this)
        }, t.create = function () {
            return t._poolSize > 0 ? (t._poolSize--, t._pool.pop()) : new t
        }, t.dispose = function (e) {
            e.parentGlobalTransform = null, e.parentGlobalTransformMatrix = null, t._pool[t._poolSize++] = e
        }, t._pool = [], t._poolSize = 0, t
    }();
    t.ParentTransformObject = e, egret.registerClass(e, "dragonBones.ParentTransformObject")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function t() {
            this._slotDataList = []
        }

        var e = __define, i = t, n = i.prototype;
        return n.dispose = function () {
            for (var t = this._slotDataList.length; t--;) this._slotDataList[t].dispose();
            this._slotDataList = null
        }, n.getSlotData = function (t) {
            for (var e = this._slotDataList.length; e--;) if (this._slotDataList[e].name == t) return this._slotDataList[e];
            return null
        }, n.addSlotData = function (t) {
            if (!t) throw new Error;
            if (!(this._slotDataList.indexOf(t) < 0)) throw new Error;
            this._slotDataList[this._slotDataList.length] = t
        }, e(n, "slotDataList", function () {
            return this._slotDataList
        }), t
    }();
    t.SkinData = e, egret.registerClass(e, "dragonBones.SkinData")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function t() {
            this._displayDataList = [], this.zOrder = 0
        }

        var e = __define, i = t, n = i.prototype;
        return n.dispose = function () {
            this._displayDataList.length = 0
        }, n.addDisplayData = function (t) {
            if (!t) throw new Error;
            if (!(this._displayDataList.indexOf(t) < 0)) throw new Error;
            this._displayDataList[this._displayDataList.length] = t
        }, n.getDisplayData = function (t) {
            for (var e = this._displayDataList.length; e--;) if (this._displayDataList[e].name == t) return this._displayDataList[e];
            return null
        }, e(n, "displayDataList", function () {
            return this._displayDataList
        }), t
    }();
    t.SlotData = e, egret.registerClass(e, "dragonBones.SlotData")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (t) {
        function e() {
            t.call(this), this.displayIndex = 0, this.tweenEasing = 10, this.displayIndex = 0, this.visible = !0, this.zOrder = NaN
        }

        __extends(e, t);
        var i = e, n = i.prototype;
        return n.dispose = function () {
            t.prototype.dispose.call(this), this.color = null
        }, e
    }(t.Frame);
    t.SlotFrame = e, egret.registerClass(e, "dragonBones.SlotFrame")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (t) {
        function e() {
            t.call(this), this.offset = 0
        }

        __extends(e, t);
        var i = e, n = i.prototype;
        return n.dispose = function () {
            t.prototype.dispose.call(this)
        }, e
    }(t.Timeline);
    t.SlotTimeline = e, egret.registerClass(e, "dragonBones.SlotTimeline")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (e) {
        function i() {
            e.call(this), this.tweenRotate = 0, this.displayIndex = 0, this.tweenEasing = 10, this.tweenRotate = 0, this.tweenScale = !0, this.displayIndex = 0, this.visible = !0, this.zOrder = NaN, this.global = new t.DBTransform, this.transform = new t.DBTransform, this.pivot = new t.Point, this.scaleOffset = new t.Point
        }

        __extends(i, e);
        var n = i, s = n.prototype;
        return s.dispose = function () {
            e.prototype.dispose.call(this), this.global = null, this.transform = null, this.pivot = null, this.scaleOffset = null, this.color = null
        }, i
    }(t.Frame);
    t.TransformFrame = e, egret.registerClass(e, "dragonBones.TransformFrame")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (e) {
        function i() {
            e.call(this), this.originTransform = new t.DBTransform, this.originTransform.scaleX = 1, this.originTransform.scaleY = 1, this.originPivot = new t.Point, this.offset = 0
        }

        __extends(i, e);
        var n = i, s = n.prototype;
        return s.dispose = function () {
            e.prototype.dispose.call(this), this.originTransform = null, this.originPivot = null
        }, i
    }(t.Timeline);
    t.TransformTimeline = e, egret.registerClass(e, "dragonBones.TransformTimeline")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function e() {
        }

        var i = e;
        return i.prototype, e.parseDragonBonesData = function (i) {
            if (!i) throw new Error;
            var n = i[t.ConstValues.A_VERSION];
            if (n = n.toString(), n.toString() != t.DragonBones.DATA_VERSION && n.toString() != t.DragonBones.PARENT_COORDINATE_DATA_VERSION && "2.3" != n.toString()) throw new Error("Nonsupport version!");
            var s = e.getNumber(i, t.ConstValues.A_FRAME_RATE, 0) || 0, a = new t.DragonBonesData;
            a.name = i[t.ConstValues.A_NAME], a.isGlobal = "0" != i[t.ConstValues.A_IS_GLOBAL], e.tempDragonBonesData = a;
            for (var r = i[t.ConstValues.ARMATURE], o = 0, h = r.length; h > o; o++) {
                var l = r[o];
                a.addArmatureData(e.parseArmatureData(l, s))
            }
            return e.tempDragonBonesData = null, a
        }, e.parseArmatureData = function (i, n) {
            var s = new t.ArmatureData;
            s.name = i[t.ConstValues.A_NAME];
            var a, r, o = i[t.ConstValues.BONE];
            for (a = 0, r = o.length; r > a; a++) {
                var h = o[a];
                s.addBoneData(e.parseBoneData(h))
            }
            var l = i[t.ConstValues.SKIN];
            for (a = 0, r = l.length; r > a; a++) for (var u = l[a], c = u[t.ConstValues.SLOT], d = 0, f = c.length; f > d; d++) {
                var g = c[d];
                s.addSlotData(e.parseSlotData(g))
            }
            for (a = 0, r = l.length; r > a; a++) {
                var p = l[a];
                s.addSkinData(e.parseSkinData(p))
            }
            e.tempDragonBonesData.isGlobal && t.DBDataUtil.transformArmatureData(s), s.sortBoneDataList();
            var _ = i[t.ConstValues.ANIMATION];
            for (a = 0, r = _.length; r > a; a++) {
                var m = _[a], v = e.parseAnimationData(m, n);
                t.DBDataUtil.addHideTimeline(v, s), t.DBDataUtil.transformAnimationData(v, s, e.tempDragonBonesData.isGlobal), s.addAnimationData(v)
            }
            return s
        }, e.parseBoneData = function (i) {
            var n = new t.BoneData;
            return n.name = i[t.ConstValues.A_NAME], n.parent = i[t.ConstValues.A_PARENT], n.length = Number(i[t.ConstValues.A_LENGTH]) || 0, n.inheritRotation = e.getBoolean(i, t.ConstValues.A_INHERIT_ROTATION, !0), n.inheritScale = e.getBoolean(i, t.ConstValues.A_INHERIT_SCALE, !0), e.parseTransform(i[t.ConstValues.TRANSFORM], n.transform), e.tempDragonBonesData.isGlobal && n.global.copy(n.transform), n
        }, e.parseSkinData = function (i) {
            var n = new t.SkinData;
            n.name = i[t.ConstValues.A_NAME];
            for (var s = i[t.ConstValues.SLOT], a = 0, r = s.length; r > a; a++) {
                var o = s[a];
                n.addSlotData(e.parseSkinSlotData(o))
            }
            return n
        }, e.parseSkinSlotData = function (i) {
            var n = new t.SlotData;
            n.name = i[t.ConstValues.A_NAME], n.parent = i[t.ConstValues.A_PARENT], n.zOrder = i[t.ConstValues.A_Z_ORDER], n.zOrder = e.getNumber(i, t.ConstValues.A_Z_ORDER, 0) || 0, n.blendMode = i[t.ConstValues.A_BLENDMODE];
            var s = i[t.ConstValues.DISPLAY];
            if (s) for (var a = 0, r = s.length; r > a; a++) {
                var o = s[a];
                n.addDisplayData(e.parseDisplayData(o))
            }
            return n
        }, e.parseSlotData = function (i) {
            var n = new t.SlotData;
            return n.name = i[t.ConstValues.A_NAME], n.parent = i[t.ConstValues.A_PARENT], n.zOrder = i[t.ConstValues.A_Z_ORDER], n.zOrder = e.getNumber(i, t.ConstValues.A_Z_ORDER, 0) || 0, n.blendMode = i[t.ConstValues.A_BLENDMODE], n.displayIndex = 0, n
        }, e.parseDisplayData = function (i) {
            var n = new t.DisplayData;
            return n.name = i[t.ConstValues.A_NAME], n.type = i[t.ConstValues.A_TYPE], e.parseTransform(i[t.ConstValues.TRANSFORM], n.transform, n.pivot), null != e.tempDragonBonesData && e.tempDragonBonesData.addDisplayData(n), n
        }, e.parseAnimationData = function (i, n) {
            var s = new t.AnimationData;
            s.name = i[t.ConstValues.A_NAME], s.frameRate = n, s.duration = Math.round(1e3 * (e.getNumber(i, t.ConstValues.A_DURATION, 1) || 1) / n), s.playTimes = e.getNumber(i, t.ConstValues.A_LOOP, 1), s.playTimes = NaN != s.playTimes ? s.playTimes : 1, s.fadeTime = e.getNumber(i, t.ConstValues.A_FADE_IN_TIME, 0) || 0, s.scale = e.getNumber(i, t.ConstValues.A_SCALE, 1) || 0, s.tweenEasing = e.getNumber(i, t.ConstValues.A_TWEEN_EASING, NaN), s.autoTween = e.getBoolean(i, t.ConstValues.A_AUTO_TWEEN, !0);
            var a = i[t.ConstValues.FRAME], r = 0, o = 0;
            if (a) for (r = 0, o = a.length; o > r; r++) {
                var h = a[r], l = e.parseTransformFrame(h, null, n);
                s.addFrame(l)
            }
            e.parseTimeline(i, s);
            var u, c = s.duration, d = i[t.ConstValues.TIMELINE];
            if (d) {
                for (r = 0, o = d.length; o > r; r++) {
                    var f = d[r], g = e.parseTransformTimeline(f, s.duration, n);
                    g = e.parseTransformTimeline(f, s.duration, n), c = Math.min(c, g.frameList[g.frameList.length - 1].duration), s.addTimeline(g);
                    var p = e.parseSlotTimeline(f, s.duration, n);
                    if (s.addSlotTimeline(p), s.autoTween && !u) for (var _, m = 0, v = p.frameList.length; v > m; m++) if (_ = p.frameList[m], _ && _.displayIndex < 0) {
                        u = !0;
                        break
                    }
                }
                var T = s.tweenEasing;
                if (u) {
                    for (o = s.slotTimelineList.length, r = 0; o > r; r++) {
                        p = s.slotTimelineList[r], g = s.timelineList[r];
                        var y, E, x;
                        for (m = 0, v = p.frameList.length; v > m; m++) E = p.frameList[m], y = g.frameList[m], x = m == v - 1 ? p.frameList[0] : p.frameList[m + 1], E.displayIndex < 0 || x.displayIndex < 0 ? y.tweenEasing = E.tweenEasing = NaN : 10 == T ? y.tweenEasing = E.tweenEasing = 0 : isNaN(T) ? 10 == y.tweenEasing && (y.tweenEasing = 0) : y.tweenEasing = E.tweenEasing = T
                    }
                    s.autoTween = !1
                }
            }
            return s.frameList.length > 0 && (c = Math.min(c, s.frameList[s.frameList.length - 1].duration)), s.lastFrameDuration = c, s
        }, e.parseSlotTimeline = function (i, n, s) {
            var a = new t.SlotTimeline;
            a.name = i[t.ConstValues.A_NAME], a.scale = e.getNumber(i, t.ConstValues.A_SCALE, 1) || 0, a.offset = e.getNumber(i, t.ConstValues.A_OFFSET, 0) || 0, a.duration = n;
            for (var r = i[t.ConstValues.FRAME], o = 0, h = r.length; h > o; o++) {
                var l = r[o], u = e.parseSlotFrame(l, s);
                a.addFrame(u)
            }
            return e.parseTimeline(i, a), a
        }, e.parseSlotFrame = function (i, n) {
            var s = new t.SlotFrame;
            e.parseFrame(i, s, n), s.visible = !e.getBoolean(i, t.ConstValues.A_HIDE, !1), s.tweenEasing = e.getNumber(i, t.ConstValues.A_TWEEN_EASING, 10), s.displayIndex = Math.floor(e.getNumber(i, t.ConstValues.A_DISPLAY_INDEX, 0) || 0), s.zOrder = e.getNumber(i, t.ConstValues.A_Z_ORDER, e.tempDragonBonesData.isGlobal ? NaN : 0);
            var a = i[t.ConstValues.COLOR_TRANSFORM];
            return a && (s.color = new t.ColorTransform, e.parseColorTransform(a, s.color)), s
        }, e.parseTransformTimeline = function (i, n, s) {
            var a = new t.TransformTimeline;
            a.name = i[t.ConstValues.A_NAME], a.scale = e.getNumber(i, t.ConstValues.A_SCALE, 1) || 0, a.offset = e.getNumber(i, t.ConstValues.A_OFFSET, 0) || 0, a.originPivot.x = e.getNumber(i, t.ConstValues.A_PIVOT_X, 0) || 0, a.originPivot.y = e.getNumber(i, t.ConstValues.A_PIVOT_Y, 0) || 0, a.duration = n;
            for (var r, o = i[t.ConstValues.FRAME], h = 0, l = o.length; l > h; h++) {
                var u = o[h];
                r = l - 1 > h ? o[h + 1] : 0 != h ? o[0] : null;
                var c = e.parseTransformFrame(u, r, s);
                a.addFrame(c)
            }
            return e.parseTimeline(i, a), a
        }, e.parseTransformFrame = function (i, n, s) {
            var a = new t.TransformFrame;
            return e.parseFrame(i, a, s), a.visible = !e.getBoolean(i, t.ConstValues.A_HIDE, !1), a.tweenEasing = e.getNumber(i, t.ConstValues.A_TWEEN_EASING, 10), a.tweenRotate = Math.floor(e.getNumber(i, t.ConstValues.A_TWEEN_ROTATE, 0) || 0), a.tweenScale = e.getBoolean(i, t.ConstValues.A_TWEEN_SCALE, !0), n && -1 == Math.floor(e.getNumber(n, t.ConstValues.A_DISPLAY_INDEX, 0) || 0) && (a.tweenEasing = NaN), e.parseTransform(i[t.ConstValues.TRANSFORM], a.transform, a.pivot), e.tempDragonBonesData.isGlobal && a.global.copy(a.transform), a.scaleOffset.x = e.getNumber(i, t.ConstValues.A_SCALE_X_OFFSET, 0) || 0, a.scaleOffset.y = e.getNumber(i, t.ConstValues.A_SCALE_Y_OFFSET, 0) || 0, a
        }, e.parseTimeline = function (t, e) {
            for (var i, n = 0, s = e.frameList, a = 0, r = s.length; r > a; a++) i = s[a], i.position = n, n += i.duration;
            i && (i.duration = e.duration - i.position)
        }, e.parseFrame = function (e, i, n) {
            void 0 === n && (n = 0), i.duration = Math.round(1e3 * (e[t.ConstValues.A_DURATION] || 1) / n), i.action = e[t.ConstValues.A_ACTION], i.event = e[t.ConstValues.A_EVENT], i.sound = e[t.ConstValues.A_SOUND]
        }, e.parseTransform = function (i, n, s) {
            void 0 === s && (s = null), i && (n && (n.x = e.getNumber(i, t.ConstValues.A_X, 0) || 0, n.y = e.getNumber(i, t.ConstValues.A_Y, 0) || 0, n.skewX = e.getNumber(i, t.ConstValues.A_SKEW_X, 0) * t.ConstValues.ANGLE_TO_RADIAN || 0, n.skewY = e.getNumber(i, t.ConstValues.A_SKEW_Y, 0) * t.ConstValues.ANGLE_TO_RADIAN || 0, n.scaleX = e.getNumber(i, t.ConstValues.A_SCALE_X, 1) || 0, n.scaleY = e.getNumber(i, t.ConstValues.A_SCALE_Y, 1) || 0), s && (s.x = e.getNumber(i, t.ConstValues.A_PIVOT_X, 0) || 0, s.y = e.getNumber(i, t.ConstValues.A_PIVOT_Y, 0) || 0))
        }, e.parseColorTransform = function (i, n) {
            i && n && (n.alphaOffset = e.getNumber(i, t.ConstValues.A_ALPHA_OFFSET, 0), n.redOffset = e.getNumber(i, t.ConstValues.A_RED_OFFSET, 0), n.greenOffset = e.getNumber(i, t.ConstValues.A_GREEN_OFFSET, 0), n.blueOffset = e.getNumber(i, t.ConstValues.A_BLUE_OFFSET, 0), n.alphaMultiplier = .01 * e.getNumber(i, t.ConstValues.A_ALPHA_MULTIPLIER, 100), n.redMultiplier = .01 * e.getNumber(i, t.ConstValues.A_RED_MULTIPLIER, 100), n.greenMultiplier = .01 * e.getNumber(i, t.ConstValues.A_GREEN_MULTIPLIER, 100), n.blueMultiplier = .01 * e.getNumber(i, t.ConstValues.A_BLUE_MULTIPLIER, 100))
        }, e.getBoolean = function (t, e, i) {
            if (t && e in t) switch (String(t[e])) {
                case"0":
                case"NaN":
                case"":
                case"false":
                case"null":
                case"undefined":
                    return !1;
                case"1":
                case"true":
                default:
                    return !0
            }
            return i
        }, e.getNumber = function (t, e, i) {
            if (t && e in t) switch (String(t[e])) {
                case"NaN":
                case"":
                case"false":
                case"null":
                case"undefined":
                    return NaN;
                default:
                    return Number(t[e])
            }
            return i
        }, e
    }();
    t.Data3Parser = e, egret.registerClass(e, "dragonBones.Data3Parser")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function e() {
        }

        var i = e;
        return i.prototype, e.parseTextureAtlasData = function (i, n) {
            void 0 === n && (n = 1);
            for (var s, a = {}, r = i[t.ConstValues.SUB_TEXTURE], o = 0, h = r.length; h > o; o++) {
                var l = r[o], u = l[t.ConstValues.A_NAME], c = new t.Rectangle;
                c.x = e.getNumber(l, t.ConstValues.A_X, 0) / n, c.y = e.getNumber(l, t.ConstValues.A_Y, 0) / n, c.width = e.getNumber(l, t.ConstValues.A_WIDTH, 0) / n, c.height = e.getNumber(l, t.ConstValues.A_HEIGHT, 0) / n;
                var d = "true" == l[t.ConstValues.A_ROTATED], f = e.getNumber(l, t.ConstValues.A_FRAME_WIDTH, 0) / n,
                    g = e.getNumber(l, t.ConstValues.A_FRAME_HEIGHT, 0) / n;
                f > 0 && g > 0 ? (s = new t.Rectangle, s.x = e.getNumber(l, t.ConstValues.A_FRAME_X, 0) / n, s.y = e.getNumber(l, t.ConstValues.A_FRAME_Y, 0) / n, s.width = f, s.height = g) : s = null, a[u] = new t.TextureData(c, s, d)
            }
            return a
        }, e.parseDragonBonesData = function (i) {
            if (!i) throw new Error;
            var n = i[t.ConstValues.A_VERSION];
            if (n = n.toString(), n.toString() != t.DragonBones.DATA_VERSION && n.toString() != t.DragonBones.DATA_VERSION_4_5 && n.toString() != t.DragonBones.PARENT_COORDINATE_DATA_VERSION && "2.3" != n.toString()) throw new Error(egret.getString(4003));
            if (n.toString() == t.DragonBones.PARENT_COORDINATE_DATA_VERSION || "2.3" == n.toString()) return t.Data3Parser.parseDragonBonesData(i);
            var s = e.getNumber(i, t.ConstValues.A_FRAME_RATE, 0) || 0, a = new t.DragonBonesData;
            a.name = i[t.ConstValues.A_NAME], a.isGlobal = "0" != i[t.ConstValues.A_IS_GLOBAL], a.version = parseFloat(n), e.tempDragonBonesData = a;
            for (var r = i[t.ConstValues.ARMATURE], o = 0, h = r.length; h > o; o++) {
                var l = r[o];
                a.addArmatureData(e.parseArmatureData(l, s))
            }
            return e.tempDragonBonesData = null, a
        }, e.parseArmatureData = function (i, n) {
            var s = new t.ArmatureData;
            s.name = i[t.ConstValues.A_NAME];
            var a = i[t.ConstValues.A_DEFAULT_ACTIONS];
            a && 1 == a.length && (s.defaultAnimation = a[0][t.ConstValues.A_GOTOANDPLAY]), s.frameRate = i[t.ConstValues.A_FRAME_RATE], (isNaN(s.frameRate) || s.frameRate <= 0) && (s.frameRate = n), n = s.frameRate;
            var r, o, h = i[t.ConstValues.BONE];
            for (r = 0, o = h.length; o > r; r++) {
                var l = h[r];
                s.addBoneData(e.parseBoneData(l))
            }
            var u = i[t.ConstValues.IK];
            if (u) for (r = 0, o = u.length; o > r; r++) {
                var c = u[r];
                s.addIKData(e.parseIKData(c))
            }
            var d = i[t.ConstValues.SLOT];
            for (r = 0, o = d.length; o > r; r++) {
                var f = d[r];
                s.addSlotData(e.parseSlotData(f))
            }
            var g = i[t.ConstValues.SKIN];
            for (r = 0, o = g.length; o > r; r++) {
                var p = g[r];
                s.addSkinData(e.parseSkinData(p))
            }
            e.tempDragonBonesData.isGlobal && t.DBDataUtil.transformArmatureData(s), s.sortBoneDataList();
            var _ = i[t.ConstValues.ANIMATION];
            for (r = 0, o = _.length; o > r; r++) {
                var m = _[r], v = e.parseAnimationData(m, n);
                t.DBDataUtil.addHideTimeline(v, s, !0), t.DBDataUtil.transformAnimationData(v, s, e.tempDragonBonesData.isGlobal), s.addAnimationData(v)
            }
            return s
        }, e.parseBoneData = function (i) {
            var n = new t.BoneData;
            return n.name = i[t.ConstValues.A_NAME], n.parent = i[t.ConstValues.A_PARENT], n.length = Number(i[t.ConstValues.A_LENGTH]) || 0, n.inheritRotation = e.getBoolean(i, t.ConstValues.A_INHERIT_ROTATION, !0), n.inheritScale = e.getBoolean(i, t.ConstValues.A_INHERIT_SCALE, !0), e.parseTransform(i[t.ConstValues.TRANSFORM], n.transform), e.tempDragonBonesData.isGlobal && n.global.copy(n.transform), n
        }, e.parseIKData = function (i) {
            var n = new t.IKData;
            return n.name = i[t.ConstValues.A_NAME], n.target = i[t.ConstValues.A_TARGET], i.hasOwnProperty(t.ConstValues.A_WEIGHT) ? n.weight = Number(i[t.ConstValues.A_WEIGHT]) : n.weight = 1, n.bendPositive = e.getBoolean(i, t.ConstValues.A_BENDPOSITIVE, !0), i.hasOwnProperty(t.ConstValues.A_CHAIN) ? n.chain = i[t.ConstValues.A_CHAIN] : n.chain = 0, n.bones = i[t.ConstValues.A_BONES], n
        }, e.parseSkinData = function (i) {
            var n = new t.SkinData;
            n.name = i[t.ConstValues.A_NAME];
            for (var s = i[t.ConstValues.SLOT], a = 0, r = s.length; r > a; a++) {
                var o = s[a];
                n.addSlotData(e.parseSlotDisplayData(o))
            }
            return n
        }, e.parseSlotData = function (i) {
            var n = new t.SlotData;
            n.name = i[t.ConstValues.A_NAME];
            var s = i[t.ConstValues.A_ACTIONS];
            return s && 1 == s.length && (n.gotoAndPlay = s[0][t.ConstValues.A_GOTOANDPLAY]), n.parent = i[t.ConstValues.A_PARENT], n.zOrder = e.getNumber(i, t.ConstValues.A_Z_ORDER, 0) || 0, n.displayIndex = e.getNumber(i, t.ConstValues.A_DISPLAY_INDEX, 0), n.blendMode = i[t.ConstValues.A_BLENDMODE], n
        }, e.parseSlotDisplayData = function (i) {
            var n = new t.SlotData;
            n.name = i[t.ConstValues.A_NAME], n.parent = i[t.ConstValues.A_PARENT], n.zOrder = e.getNumber(i, t.ConstValues.A_Z_ORDER, 0) || 0;
            var s = i[t.ConstValues.DISPLAY];
            if (s) for (var a = 0, r = s.length; r > a; a++) {
                var o = s[a];
                n.addDisplayData(e.parseDisplayData(o))
            }
            return n
        }, e.parseDisplayData = function (i) {
            var n = new t.DisplayData;
            return n.name = i[t.ConstValues.A_NAME], n.type = i[t.ConstValues.A_TYPE], e.parseTransform(i[t.ConstValues.TRANSFORM], n.transform, n.pivot), n.pivot.x = NaN, n.pivot.y = NaN, null != e.tempDragonBonesData && e.tempDragonBonesData.addDisplayData(n), n
        }, e.parseAnimationData = function (i, n) {
            var s = new t.AnimationData;
            s.name = i[t.ConstValues.A_NAME], s.frameRate = n, s.duration = Math.ceil(1e3 * (e.getNumber(i, t.ConstValues.A_DURATION, 1) || 1) / n), s.playTimes = e.getNumber(i, t.ConstValues.A_PLAY_TIMES, 1), s.playTimes = NaN != s.playTimes ? s.playTimes : 1, s.fadeTime = e.getNumber(i, t.ConstValues.A_FADE_IN_TIME, 0) || 0, s.scale = e.getNumber(i, t.ConstValues.A_SCALE, 1) || 0, s.tweenEasing = e.getNumber(i, t.ConstValues.A_TWEEN_EASING, NaN), s.autoTween = e.getBoolean(i, t.ConstValues.A_AUTO_TWEEN, !0);
            var a = i[t.ConstValues.FRAME], r = 0, o = 0;
            if (a) for (r = 0, o = a.length; o > r; r++) {
                var h = a[r], l = e.parseTransformFrame(h, n);
                s.addFrame(l)
            }
            e.parseTimeline(i, s);
            var u = s.duration, c = i[t.ConstValues.BONE];
            if (c) for (r = 0, o = c.length; o > r; r++) {
                var d = c[r];
                if (d) {
                    var f = e.parseTransformTimeline(d, s.duration, n);
                    f.frameList.length > 0 && (u = Math.min(u, f.frameList[f.frameList.length - 1].duration)), s.addTimeline(f)
                }
            }
            var g = i[t.ConstValues.SLOT];
            if (g) for (r = 0, o = g.length; o > r; r++) {
                var p = g[r];
                if (p) {
                    var _ = e.parseSlotTimeline(p, s.duration, n);
                    _.frameList.length > 0 && (u = Math.min(u, _.frameList[_.frameList.length - 1].duration), s.addSlotTimeline(_))
                }
            }
            return s.frameList.length > 0 && (u = Math.min(u, s.frameList[s.frameList.length - 1].duration)), s.lastFrameDuration = u, s
        }, e.parseTransformTimeline = function (i, n, s) {
            var a = new t.TransformTimeline;
            a.name = i[t.ConstValues.A_NAME], a.scale = e.getNumber(i, t.ConstValues.A_SCALE, 1) || 0, a.offset = e.getNumber(i, t.ConstValues.A_OFFSET, 0) || 0, a.originPivot.x = e.getNumber(i, t.ConstValues.A_PIVOT_X, 0) || 0, a.originPivot.y = e.getNumber(i, t.ConstValues.A_PIVOT_Y, 0) || 0, a.duration = n;
            for (var r = i[t.ConstValues.FRAME], o = 0, h = r.length; h > o; o++) {
                var l = r[o], u = e.parseTransformFrame(l, s);
                a.addFrame(u)
            }
            return e.parseTimeline(i, a), a
        }, e.parseSlotTimeline = function (i, n, s) {
            var a = new t.SlotTimeline;
            a.name = i[t.ConstValues.A_NAME], a.scale = e.getNumber(i, t.ConstValues.A_SCALE, 1) || 0, a.offset = e.getNumber(i, t.ConstValues.A_OFFSET, 0) || 0, a.duration = n;
            for (var r = i[t.ConstValues.FRAME], o = 0, h = r.length; h > o; o++) {
                var l = r[o], u = e.parseSlotFrame(l, s);
                a.addFrame(u)
            }
            return e.parseTimeline(i, a), a
        }, e.parseTransformFrame = function (i, n) {
            var s = new t.TransformFrame;
            return e.parseFrame(i, s, n), s.visible = !e.getBoolean(i, t.ConstValues.A_HIDE, !1), s.tweenEasing = e.getNumber(i, t.ConstValues.A_TWEEN_EASING, 10), s.tweenRotate = Math.floor(e.getNumber(i, t.ConstValues.A_TWEEN_ROTATE, 0) || 0), s.tweenScale = e.getBoolean(i, t.ConstValues.A_TWEEN_SCALE, !0), s.displayIndex = Math.floor(e.getNumber(i, t.ConstValues.A_DISPLAY_INDEX, 0) || 0), e.parseTransform(i[t.ConstValues.TRANSFORM], s.transform, s.pivot), e.tempDragonBonesData.isGlobal && s.global.copy(s.transform), s.scaleOffset.x = e.getNumber(i, t.ConstValues.A_SCALE_X_OFFSET, 0) || 0, s.scaleOffset.y = e.getNumber(i, t.ConstValues.A_SCALE_Y_OFFSET, 0) || 0, s
        }, e.parseSlotFrame = function (i, n) {
            var s = new t.SlotFrame;
            e.parseFrame(i, s, n), s.visible = !e.getBoolean(i, t.ConstValues.A_HIDE, !1), s.tweenEasing = e.getNumber(i, t.ConstValues.A_TWEEN_EASING, 10), s.displayIndex = Math.floor(e.getNumber(i, t.ConstValues.A_DISPLAY_INDEX, 0) || 0);
            var a = i[t.ConstValues.A_ACTIONS];
            a && 1 == a.length && (s.gotoAndPlay = a[0][t.ConstValues.A_GOTOANDPLAY]), s.zOrder = e.getNumber(i, t.ConstValues.A_Z_ORDER, e.tempDragonBonesData.isGlobal ? NaN : 0);
            var r = i[t.ConstValues.COLOR];
            return r && (s.color = new t.ColorTransform, e.parseColorTransform(r, s.color)), s
        }, e.parseTimeline = function (t, e) {
            for (var i, n = 0, s = e.frameList, a = 0, r = s.length; r > a; a++) i = s[a], i.position = n, n += i.duration;
            i && (i.duration = e.duration - i.position)
        }, e.parseFrame = function (e, i, n) {
            void 0 === n && (n = 0), i.duration = Math.round(1e3 * (e[t.ConstValues.A_DURATION] || 1) / n), i.action = e[t.ConstValues.A_ACTION], i.event = e[t.ConstValues.A_EVENT], i.sound = e[t.ConstValues.A_SOUND];
            var s = e[t.ConstValues.A_CURVE];
            null != s && 4 == s.length && (i.curve = new t.CurveData, i.curve.pointList = [new t.Point(s[0], s[1]), new t.Point(s[2], s[3])])
        }, e.parseTransform = function (i, n, s) {
            void 0 === s && (s = null), i && (n && (n.x = e.getNumber(i, t.ConstValues.A_X, 0) || 0, n.y = e.getNumber(i, t.ConstValues.A_Y, 0) || 0, n.skewX = e.getNumber(i, t.ConstValues.A_SKEW_X, 0) * t.ConstValues.ANGLE_TO_RADIAN || 0, n.skewY = e.getNumber(i, t.ConstValues.A_SKEW_Y, 0) * t.ConstValues.ANGLE_TO_RADIAN || 0, n.scaleX = e.getNumber(i, t.ConstValues.A_SCALE_X, 1) || 0, n.scaleY = e.getNumber(i, t.ConstValues.A_SCALE_Y, 1) || 0), s && (s.x = e.getNumber(i, t.ConstValues.A_PIVOT_X, 0) || 0, s.y = e.getNumber(i, t.ConstValues.A_PIVOT_Y, 0) || 0))
        }, e.parseColorTransform = function (i, n) {
            n && (n.alphaOffset = e.getNumber(i, t.ConstValues.A_ALPHA_OFFSET, 0), n.redOffset = e.getNumber(i, t.ConstValues.A_RED_OFFSET, 0), n.greenOffset = e.getNumber(i, t.ConstValues.A_GREEN_OFFSET, 0), n.blueOffset = e.getNumber(i, t.ConstValues.A_BLUE_OFFSET, 0), n.alphaMultiplier = .01 * e.getNumber(i, t.ConstValues.A_ALPHA_MULTIPLIER, 100), n.redMultiplier = .01 * e.getNumber(i, t.ConstValues.A_RED_MULTIPLIER, 100), n.greenMultiplier = .01 * e.getNumber(i, t.ConstValues.A_GREEN_MULTIPLIER, 100), n.blueMultiplier = .01 * e.getNumber(i, t.ConstValues.A_BLUE_MULTIPLIER, 100))
        }, e.getBoolean = function (t, e, i) {
            if (t && e in t) switch (String(t[e])) {
                case"0":
                case"NaN":
                case"":
                case"false":
                case"null":
                case"undefined":
                    return !1;
                case"1":
                case"true":
                default:
                    return !0
            }
            return i
        }, e.getNumber = function (t, e, i) {
            if (t && e in t) switch (String(t[e])) {
                case"NaN":
                case"":
                case"false":
                case"null":
                case"undefined":
                    return NaN;
                default:
                    return Number(t[e])
            }
            return i
        }, e
    }();
    t.DataParser = e, egret.registerClass(e, "dragonBones.DataParser")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function t(t, e, i) {
            this.region = t, this.frame = e, this.rotated = i
        }

        var e = t;
        return e.prototype, t
    }();
    t.TextureData = e, egret.registerClass(e, "dragonBones.TextureData")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function e() {
        }

        var i = e;
        return i.prototype, e.cloneColor = function (e) {
            var i = new t.ColorTransform;
            return i.redMultiplier = e.redMultiplier, i.greenMultiplier = e.greenMultiplier, i.blueMultiplier = e.blueMultiplier, i.alphaMultiplier = e.alphaMultiplier, i.redOffset = e.redOffset, i.greenOffset = e.greenOffset, i.blueOffset = e.blueOffset, i.alphaOffset = e.alphaOffset, i
        }, e.isEqual = function (t, e) {
            return t.alphaOffset == e.alphaOffset && t.redOffset == e.redOffset && t.greenOffset == e.greenOffset && t.blueOffset == e.blueOffset && t.alphaMultiplier == e.alphaMultiplier && t.redMultiplier == e.redMultiplier && t.greenMultiplier == e.greenMultiplier && t.blueMultiplier == e.blueMultiplier
        }, e.minus = function (t, e, i) {
            i.alphaOffset = t.alphaOffset - e.alphaOffset, i.redOffset = t.redOffset - e.redOffset, i.greenOffset = t.greenOffset - e.greenOffset, i.blueOffset = t.blueOffset - e.blueOffset, i.alphaMultiplier = t.alphaMultiplier - e.alphaMultiplier, i.redMultiplier = t.redMultiplier - e.redMultiplier, i.greenMultiplier = t.greenMultiplier - e.greenMultiplier, i.blueMultiplier = t.blueMultiplier - e.blueMultiplier
        }, e.originalColor = new t.ColorTransform, e
    }();
    t.ColorTransformUtil = e, egret.registerClass(e, "dragonBones.ColorTransformUtil")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function t() {
        }

        var e = t;
        return e.prototype, t.ANGLE_TO_RADIAN = Math.PI / 180, t.RADIAN_TO_ANGLE = 180 / Math.PI, t.DRAGON_BONES = "dragonBones", t.ARMATURE = "armature", t.SKIN = "skin", t.BONE = "bone", t.IK = "ik", t.SLOT = "slot", t.DISPLAY = "display", t.ANIMATION = "animation", t.TIMELINE = "timeline", t.FRAME = "frame", t.TRANSFORM = "transform", t.COLOR_TRANSFORM = "colorTransform", t.COLOR = "color", t.RECTANGLE = "rectangle", t.ELLIPSE = "ellipse", t.TEXTURE_ATLAS = "TextureAtlas", t.SUB_TEXTURE = "SubTexture", t.A_ROTATED = "rotated", t.A_FRAME_X = "frameX", t.A_FRAME_Y = "frameY", t.A_FRAME_WIDTH = "frameWidth", t.A_FRAME_HEIGHT = "frameHeight", t.A_VERSION = "version", t.A_IMAGE_PATH = "imagePath", t.A_FRAME_RATE = "frameRate", t.A_NAME = "name", t.A_IS_GLOBAL = "isGlobal", t.A_PARENT = "parent", t.A_LENGTH = "length", t.A_TYPE = "type", t.A_FADE_IN_TIME = "fadeInTime", t.A_DURATION = "duration", t.A_SCALE = "scale", t.A_OFFSET = "offset", t.A_LOOP = "loop", t.A_PLAY_TIMES = "playTimes", t.A_EVENT = "event", t.A_EVENT_PARAMETERS = "eventParameters", t.A_SOUND = "sound", t.A_ACTION = "action", t.A_HIDE = "hide", t.A_AUTO_TWEEN = "autoTween", t.A_TWEEN_EASING = "tweenEasing", t.A_TWEEN_ROTATE = "tweenRotate", t.A_TWEEN_SCALE = "tweenScale", t.A_DISPLAY_INDEX = "displayIndex", t.A_Z_ORDER = "z", t.A_BLENDMODE = "blendMode", t.A_WIDTH = "width", t.A_HEIGHT = "height", t.A_INHERIT_SCALE = "inheritScale", t.A_INHERIT_ROTATION = "inheritRotation", t.A_X = "x", t.A_Y = "y", t.A_SKEW_X = "skX", t.A_SKEW_Y = "skY", t.A_SCALE_X = "scX", t.A_SCALE_Y = "scY", t.A_PIVOT_X = "pX", t.A_PIVOT_Y = "pY", t.A_ALPHA_OFFSET = "aO", t.A_RED_OFFSET = "rO", t.A_GREEN_OFFSET = "gO", t.A_BLUE_OFFSET = "bO", t.A_ALPHA_MULTIPLIER = "aM", t.A_RED_MULTIPLIER = "rM", t.A_GREEN_MULTIPLIER = "gM", t.A_BLUE_MULTIPLIER = "bM", t.A_CURVE = "curve", t.A_SCALE_X_OFFSET = "scXOffset", t.A_SCALE_Y_OFFSET = "scYOffset", t.A_SCALE_MODE = "scaleMode", t.A_FIXED_ROTATION = "fixedRotation", t.A_DEFAULT_ACTIONS = "defaultActions", t.A_ACTIONS = "actions", t.A_GOTOANDPLAY = "gotoAndPlay", t.A_TARGET = "target", t.A_WEIGHT = "weight", t.A_BONES = "bone", t.A_BENDPOSITIVE = "bendPositive", t.A_CHAIN = "chain", t
    }();
    t.ConstValues = e, egret.registerClass(e, "dragonBones.ConstValues")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function e() {
        }

        var i = e;
        return i.prototype, e.transformArmatureData = function (e) {
            for (var i = e.boneDataList, n = i.length; n--;) {
                var s = i[n];
                if (s.parent) {
                    var a = e.getBoneData(s.parent);
                    a && (s.transform.copy(s.global), t.TransformUtil.globalToLocal(s.transform, a.global))
                }
            }
        }, e.transformArmatureDataAnimations = function (t) {
            for (var i = t.animationDataList, n = i.length; n--;) e.transformAnimationData(i[n], t, !1)
        }, e.transformRelativeAnimationData = function (t, e) {
        }, e.transformAnimationData = function (i, n, s) {
            if (!s) return void e.transformRelativeAnimationData(i, n);
            var a, r = n.getSkinData(null), o = n.boneDataList;
            r && (a = r.slotDataList);
            for (var h = 0; h < o.length; h++) {
                var l = o[h], u = i.getTimeline(l.name), c = i.getSlotTimeline(l.name);
                if (u || c) {
                    var d = null;
                    if (a) for (var f = 0, g = a.length; g > f && (d = a[f], d.parent != l.name); f++) ;
                    var p = u.frameList;
                    if (c) var _ = c.frameList;
                    for (var m = null, v = p.length, f = 0; v > f; f++) {
                        var T = p[f];
                        if (e.setFrameTransform(i, n, l, T), T.transform.x -= l.transform.x, T.transform.y -= l.transform.y, T.transform.skewX -= l.transform.skewX, T.transform.skewY -= l.transform.skewY, T.transform.scaleX /= l.transform.scaleX, T.transform.scaleY /= l.transform.scaleY, m) {
                            var y = T.transform.skewX - m.transform.skewX;
                            m.tweenRotate ? m.tweenRotate > 0 ? (0 > y && (T.transform.skewX += 2 * Math.PI, T.transform.skewY += 2 * Math.PI), m.tweenRotate > 1 && (T.transform.skewX += 2 * Math.PI * (m.tweenRotate - 1), T.transform.skewY += 2 * Math.PI * (m.tweenRotate - 1))) : (y > 0 && (T.transform.skewX -= 2 * Math.PI, T.transform.skewY -= 2 * Math.PI), m.tweenRotate < 1 && (T.transform.skewX += 2 * Math.PI * (m.tweenRotate + 1), T.transform.skewY += 2 * Math.PI * (m.tweenRotate + 1))) : (T.transform.skewX = m.transform.skewX + t.TransformUtil.formatRadian(T.transform.skewX - m.transform.skewX), T.transform.skewY = m.transform.skewY + t.TransformUtil.formatRadian(T.transform.skewY - m.transform.skewY))
                        }
                        m = T
                    }
                    if (c && _) {
                        v = _.length;
                        for (var f = 0; v > f; f++) {
                            var E = _[f];
                            c.transformed || d && (E.zOrder -= d.zOrder)
                        }
                        c.transformed = !0
                    }
                    u.transformed = !0
                }
            }
        }, e.setFrameTransform = function (i, n, s, a) {
            a.transform.copy(a.global);
            var r = n.getBoneData(s.parent);
            if (r) {
                var o = i.getTimeline(r.name);
                if (o) {
                    for (var h = [], l = []; o;) h.push(o), l.push(r), r = n.getBoneData(r.parent), o = r ? i.getTimeline(r.name) : null;
                    for (var u, c = h.length, d = new t.Matrix, f = new t.DBTransform, g = new t.Matrix; c--;) o = h[c], r = l[c], e.getTimelineTransform(o, a.position, f, !u), u ? (f.x += o.originTransform.x + r.transform.x, f.y += o.originTransform.y + r.transform.y, f.skewX += o.originTransform.skewX + r.transform.skewX, f.skewY += o.originTransform.skewY + r.transform.skewY, f.scaleX *= o.originTransform.scaleX * r.transform.scaleX, f.scaleY *= o.originTransform.scaleY * r.transform.scaleY, t.TransformUtil.transformToMatrix(f, g), g.concat(d), t.TransformUtil.matrixToTransform(g, u, f.scaleX * u.scaleX >= 0, f.scaleY * u.scaleY >= 0)) : (u = new t.DBTransform, u.copy(f)), t.TransformUtil.transformToMatrix(u, d);
                    t.TransformUtil.globalToLocal(a.transform, u)
                }
            }
        }, e.getTimelineTransform = function (e, i, n, s) {
            for (var a = e.frameList, r = a.length; r--;) {
                var o = a[r];
                if (o.position <= i && o.position + o.duration > i) {
                    if (r == a.length - 1 || i == o.position) n.copy(s ? o.global : o.transform); else {
                        var h = o.tweenEasing, l = (i - o.position) / o.duration;
                        h && 10 != h && (l = t.MathUtil.getEaseValue(l, h));
                        var u = a[r + 1], c = s ? o.global : o.transform, d = s ? u.global : u.transform;
                        n.x = c.x + (d.x - c.x) * l, n.y = c.y + (d.y - c.y) * l, n.skewX = t.TransformUtil.formatRadian(c.skewX + (d.skewX - c.skewX) * l), n.skewY = t.TransformUtil.formatRadian(c.skewY + (d.skewY - c.skewY) * l), n.scaleX = c.scaleX + (d.scaleX - c.scaleX) * l, n.scaleY = c.scaleY + (d.scaleY - c.scaleY) * l
                    }
                    break
                }
            }
        }, e.addHideTimeline = function (t, e, i) {
            void 0 === i && (i = !1);
            for (var n = e.boneDataList, s = e.slotDataList, a = n.length; a--;) {
                var r = n[a], o = r.name;
                t.getTimeline(o) || t.hideTimelineNameMap.indexOf(o) < 0 && t.hideTimelineNameMap.push(o)
            }
            if (i) {
                a = s.length;
                for (var h, l; a--;) h = s[a], l = h.name, t.getSlotTimeline(l) || t.hideSlotTimelineNameMap.indexOf(l) < 0 && t.hideSlotTimelineNameMap.push(l)
            }
        }, e
    }();
    t.DBDataUtil = e, egret.registerClass(e, "dragonBones.DBDataUtil")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function t() {
        }

        var e = t;
        return e.prototype, t.getEaseValue = function (e, i) {
            var n = 1;
            return i > 1 ? (n = .5 * (1 - t.cos(e * Math.PI)), i -= 1) : i > 0 ? n = 1 - Math.pow(1 - e, 2) : 0 > i && (i *= -1, n = Math.pow(e, 2)), (n - e) * i + e
        }, t.isNumber = function (t) {
            return "number" == typeof t && !isNaN(t)
        }, t.sin = function (e) {
            e *= t.RADIAN_TO_ANGLE;
            var i = Math.floor(e), n = i + 1, s = t.sinInt(i), a = t.sinInt(n);
            return (e - i) * a + (n - e) * s
        }, t.sinInt = function (t) {
            return t %= 360, 0 > t && (t += 360), 90 > t ? db_sin_map[t] : 180 > t ? db_sin_map[180 - t] : 270 > t ? -db_sin_map[t - 180] : -db_sin_map[360 - t]
        }, t.cos = function (e) {
            return t.sin(Math.PI / 2 - e)
        }, t.ANGLE_TO_RADIAN = Math.PI / 180, t.RADIAN_TO_ANGLE = 180 / Math.PI, t
    }();
    t.MathUtil = e, egret.registerClass(e, "dragonBones.MathUtil")
}(dragonBones || (dragonBones = {}));
for (var db_sin_map = {}, dbMathIndex = 0; 90 >= dbMathIndex; dbMathIndex++) db_sin_map[dbMathIndex] = Math.sin(dbMathIndex * dragonBones.MathUtil.ANGLE_TO_RADIAN);
var dragonBones;
!function (t) {
    var e = function () {
        function e() {
        }

        var i = e;
        return i.prototype, e.isEqual = function (t, i) {
            return t >= i ? t - i <= e.ACCURACY : i - t <= e.ACCURACY
        }, e.globalToLocal = function (t, i) {
            e.transformToMatrix(t, e._helpTransformMatrix),
                e.transformToMatrix(i, e._helpParentTransformMatrix), e._helpParentTransformMatrix.invert(), e._helpTransformMatrix.concat(e._helpParentTransformMatrix), e.matrixToTransform(e._helpTransformMatrix, t, t.scaleX * i.scaleX >= 0, t.scaleY * i.scaleY >= 0)
        }, e.transformToMatrix = function (e, i) {
            i.a = e.scaleX * t.MathUtil.cos(e.skewY), i.b = e.scaleX * t.MathUtil.sin(e.skewY), i.c = -e.scaleY * t.MathUtil.sin(e.skewX), i.d = e.scaleY * t.MathUtil.cos(e.skewX), i.tx = e.x, i.ty = e.y
        }, e.matrixToTransform = function (t, i, n, s) {
            i.x = t.tx, i.y = t.ty, i.scaleX = Math.sqrt(t.a * t.a + t.b * t.b) * (n ? 1 : -1), i.scaleY = Math.sqrt(t.d * t.d + t.c * t.c) * (s ? 1 : -1), e.tmpSkewXArray[0] = Math.acos(t.d / i.scaleY), e.tmpSkewXArray[1] = -e.tmpSkewXArray[0], e.tmpSkewXArray[2] = Math.asin(-t.c / i.scaleY), e.tmpSkewXArray[3] = e.tmpSkewXArray[2] >= 0 ? Math.PI - e.tmpSkewXArray[2] : e.tmpSkewXArray[2] - Math.PI, e.isEqual(e.tmpSkewXArray[0], e.tmpSkewXArray[2]) || e.isEqual(e.tmpSkewXArray[0], e.tmpSkewXArray[3]) ? i.skewX = e.tmpSkewXArray[0] : i.skewX = e.tmpSkewXArray[1], e.tmpSkewYArray[0] = Math.acos(t.a / i.scaleX), e.tmpSkewYArray[1] = -e.tmpSkewYArray[0], e.tmpSkewYArray[2] = Math.asin(t.b / i.scaleX), e.tmpSkewYArray[3] = e.tmpSkewYArray[2] >= 0 ? Math.PI - e.tmpSkewYArray[2] : e.tmpSkewYArray[2] - Math.PI, e.isEqual(e.tmpSkewYArray[0], e.tmpSkewYArray[2]) || e.isEqual(e.tmpSkewYArray[0], e.tmpSkewYArray[3]) ? i.skewY = e.tmpSkewYArray[0] : i.skewY = e.tmpSkewYArray[1]
        }, e.formatRadian = function (t) {
            return t > Math.PI && (t -= e.DOUBLE_PI), t < -Math.PI && (t += e.DOUBLE_PI), t
        }, e.normalizeRotation = function (t) {
            return t = (t + Math.PI) % (2 * Math.PI), t = t > 0 ? t : 2 * Math.PI + t, t - Math.PI
        }, e.matrixToTransformPosition = function (t, e) {
            e.x = t.tx, e.y = t.ty
        }, e.matrixToTransformScale = function (t, e, i, n) {
            e.scaleX = Math.sqrt(t.a * t.a + t.b * t.b) * (i ? 1 : -1), e.scaleY = Math.sqrt(t.d * t.d + t.c * t.c) * (n ? 1 : -1)
        }, e.matrixToTransformRotation = function (t, i, n, s) {
            e.tmpSkewXArray[0] = Math.acos(t.d / s), e.tmpSkewXArray[1] = -e.tmpSkewXArray[0], e.tmpSkewXArray[2] = Math.asin(-t.c / s), e.tmpSkewXArray[3] = e.tmpSkewXArray[2] >= 0 ? Math.PI - e.tmpSkewXArray[2] : e.tmpSkewXArray[2] - Math.PI, e.isEqual(e.tmpSkewXArray[0], e.tmpSkewXArray[2]) || e.isEqual(e.tmpSkewXArray[0], e.tmpSkewXArray[3]) ? i.skewX = e.tmpSkewXArray[0] : i.skewX = e.tmpSkewXArray[1], e.tmpSkewYArray[0] = Math.acos(t.a / n), e.tmpSkewYArray[1] = -e.tmpSkewYArray[0], e.tmpSkewYArray[2] = Math.asin(t.b / n), e.tmpSkewYArray[3] = e.tmpSkewYArray[2] >= 0 ? Math.PI - e.tmpSkewYArray[2] : e.tmpSkewYArray[2] - Math.PI, e.isEqual(e.tmpSkewYArray[0], e.tmpSkewYArray[2]) || e.isEqual(e.tmpSkewYArray[0], e.tmpSkewYArray[3]) ? i.skewY = e.tmpSkewYArray[0] : i.skewY = e.tmpSkewYArray[1]
        }, e.HALF_PI = .5 * Math.PI, e.DOUBLE_PI = 2 * Math.PI, e._helpTransformMatrix = new t.Matrix, e._helpParentTransformMatrix = new t.Matrix, e.tmpSkewXArray = [], e.tmpSkewYArray = [], e.ACCURACY = 1e-4, e
    }();
    t.TransformUtil = e, egret.registerClass(e, "dragonBones.TransformUtil")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (e) {
        function i() {
            e.call(this)
        }

        __extends(i, e);
        var n = i, s = n.prototype;
        return s._generateArmature = function () {
            var e = new t.Armature(new egret.DisplayObjectContainer);
            return e
        }, s._generateSlot = function () {
            var e = new t.EgretSlot;
            return e
        }, s._generateDisplay = function (t, e, i, n) {
            var s = new egret.Bitmap;
            if (s.texture = t.getTexture(e), isNaN(i) || isNaN(n)) {
                var a = t.getFrame(e);
                null != a ? (i = a.width / 2, n = a.height / 2) : (i = s.width / 2, n = s.height / 2)
            }
            return s.anchorOffsetX = i, s.anchorOffsetY = n, s
        }, s._generateFastArmature = function () {
            var e = new t.FastArmature(new egret.DisplayObjectContainer);
            return e
        }, s._generateFastSlot = function () {
            var e = new t.EgretFastSlot;
            return e
        }, i
    }(t.BaseFactory);
    t.EgretFactory = e, egret.registerClass(e, "dragonBones.EgretFactory")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (e) {
        function i() {
            e.call(this), this._egretDisplay = null
        }

        __extends(i, e);
        var n = i, s = n.prototype;
        return s.dispose = function () {
            if (this._displayList) for (var i = this._displayList.length, n = 0; i > n; n++) {
                var s = this._displayList[n];
                s instanceof t.FastArmature && s.dispose()
            }
            e.prototype.dispose.call(this), this._egretDisplay = null
        }, s._updateDisplay = function (t) {
            this._egretDisplay = t
        }, s._getDisplayIndex = function () {
            return this._egretDisplay && this._egretDisplay.parent ? this._egretDisplay.parent.getChildIndex(this._egretDisplay) : -1
        }, s._addDisplayToContainer = function (t, e) {
            void 0 === e && (e = -1);
            var i = t;
            this._egretDisplay && i && (0 > e ? i.addChild(this._egretDisplay) : i.addChildAt(this._egretDisplay, Math.min(e, i.numChildren)))
        }, s._removeDisplayFromContainer = function () {
            this._egretDisplay && this._egretDisplay.parent && this._egretDisplay.parent.removeChild(this._egretDisplay)
        }, s._updateTransform = function () {
            this._egretDisplay && this._egretDisplay.$setMatrix(this._globalTransformMatrix, !1)
        }, s._updateDisplayVisible = function (t) {
        }, s._updateDisplayColor = function (t, i, n, s, a, r, o, h, l) {
            void 0 === l && (l = !1), e.prototype._updateDisplayColor.call(this, t, i, n, s, a, r, o, h, l), this._egretDisplay && (this._egretDisplay.alpha = a)
        }, s._updateDisplayBlendMode = function (t) {
            this._egretDisplay && t && (this._egretDisplay.blendMode = t)
        }, i
    }(t.FastSlot);
    t.EgretFastSlot = e, egret.registerClass(e, "dragonBones.EgretFastSlot")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function e(e, i, n) {
            void 0 === n && (n = 1), this.texture = e, this.textureData = i, this._textureDatas = {}, this.scale = n, this.name = i[t.ConstValues.A_NAME], this.spriteSheet = new egret.SpriteSheet(e), this._textureDatas = i.frames
        }

        var i = e, n = i.prototype;
        return n.getTexture = function (t) {
            var e = this.spriteSheet.getTexture(t);
            if (!e) {
                var i = this._textureDatas[t];
                e = this.spriteSheet.createTexture(t, i.x, i.y, i.w, i.h, i.offX, i.offY, i.sourceW, i.sourceH)
            }
            return e
        }, n.dispose = function () {
            this.texture = null
        }, n.getRegion = function (t) {
            var i = this._textureDatas[t];
            return i ? e.Region : null
        }, e.Region = new egret.Rectangle, e
    }();
    t.EgretSheetAtlas = e, egret.registerClass(e, "dragonBones.EgretSheetAtlas", ["dragonBones.ITextureAtlas"])
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function (e) {
        function i() {
            e.call(this), this._egretDisplay = null
        }

        __extends(i, e);
        var n = i, s = n.prototype;
        return s.dispose = function () {
            if (this._displayList) for (var i = this._displayList.length, n = 0; i > n; n++) {
                var s = this._displayList[n];
                s instanceof t.Armature && s.dispose()
            }
            e.prototype.dispose.call(this), this._egretDisplay = null
        }, s._updateDisplay = function (t) {
            this._egretDisplay = t
        }, s._getDisplayIndex = function () {
            return this._egretDisplay && this._egretDisplay.parent ? this._egretDisplay.parent.getChildIndex(this._egretDisplay) : -1
        }, s._addDisplayToContainer = function (t, e) {
            void 0 === e && (e = -1);
            var i = t;
            this._egretDisplay && i && (0 > e ? i.addChild(this._egretDisplay) : i.addChildAt(this._egretDisplay, Math.min(e, i.numChildren)))
        }, s._removeDisplayFromContainer = function () {
            this._egretDisplay && this._egretDisplay.parent && this._egretDisplay.parent.removeChild(this._egretDisplay)
        }, s._updateTransform = function () {
            this._egretDisplay && this._egretDisplay.$setMatrix(this._globalTransformMatrix, !1)
        }, s._updateDisplayVisible = function (t) {
            this._egretDisplay && this._parent && (this._egretDisplay.visible = this._parent._visible && this._visible && t)
        }, s._updateDisplayColor = function (t, i, n, s, a, r, o, h, l) {
            void 0 === l && (l = !1), e.prototype._updateDisplayColor.call(this, t, i, n, s, a, r, o, h, l), this._egretDisplay && (this._egretDisplay.alpha = a)
        }, s._updateDisplayBlendMode = function (t) {
            this._egretDisplay && t && (this._egretDisplay.blendMode = t)
        }, s._calculateRelativeParentTransform = function () {
            this._global.scaleX = this._origin.scaleX * this._offset.scaleX, this._global.scaleY = this._origin.scaleY * this._offset.scaleY, this._global.skewX = this._origin.skewX + this._offset.skewX, this._global.skewY = this._origin.skewY + this._offset.skewY, this._global.x = this._origin.x + this._offset.x + this._parent._tweenPivot.x, this._global.y = this._origin.y + this._offset.y + this._parent._tweenPivot.y, this._displayDataList && this._currentDisplayIndex >= 0 && this._displayDataList[this._currentDisplayIndex] && 1 == t.EgretTextureAtlas.rotatedDic[this._displayDataList[this._currentDisplayIndex].name] && (this._global.skewX -= 1.57, this._global.skewY -= 1.57)
        }, i
    }(t.Slot);
    t.EgretSlot = e, egret.registerClass(e, "dragonBones.EgretSlot")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function (t) {
    var e = function () {
        function e(e, i, n) {
            void 0 === n && (n = 1), this.texture = e, this.textureAtlasRawData = i, this._textureDatas = {}, this.scale = n, this.name = i[t.ConstValues.A_NAME], this.parseData(i), this.spriteSheet = new egret.SpriteSheet(e)
        }

        var i = e, n = i.prototype;
        return n.getTexture = function (t) {
            var i = this.spriteSheet.getTexture(t);
            if (!i) {
                var n = this._textureDatas[t];
                if (n) {
                    var s = n.frame;
                    i = s ? this.spriteSheet.createTexture(t, n.region.x, n.region.y, n.region.width, n.region.height, -s.x, -s.y, s.width, s.height) : this.spriteSheet.createTexture(t, n.region.x, n.region.y, n.region.width, n.region.height), n.rotated && (e.rotatedDic[t] = 1)
                }
            }
            return i
        }, n.dispose = function () {
            this.texture = null
        }, n.getRegion = function (e) {
            var i = this._textureDatas[e];
            return i && i instanceof t.TextureData ? i.region : null
        }, n.getFrame = function (e) {
            var i = this._textureDatas[e];
            return i && i instanceof t.TextureData ? i.frame : null
        }, n.parseData = function (e) {
            this._textureDatas = t.DataParser.parseTextureAtlasData(e, this.scale)
        }, e.rotatedDic = {}, e
    }();
    t.EgretTextureAtlas = e, egret.registerClass(e, "dragonBones.EgretTextureAtlas", ["dragonBones.ITextureAtlas"])
}(dragonBones || (dragonBones = {}));