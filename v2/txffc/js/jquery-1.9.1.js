! function(e, t) {
	function n(e) {
		var t = e.length,
			n = ae.type(e);
		return !ae.isWindow(e) && (!(1 !== e.nodeType || !t) || ("array" === n || "function" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e)))
	}

	function r(e) {
		var t = we[e] = {};
		return ae.each(e.match(ue) || [], function(e, n) {
			t[n] = !0
		}), t
	}

	function i(e, n, r, i) {
		if(ae.acceptData(e)) {
			var o, a, s = ae.expando,
				u = "string" == typeof n,
				l = e.nodeType,
				c = l ? ae.cache : e,
				f = l ? e[s] : e[s] && s;
			if(f && c[f] && (i || c[f].data) || !u || r !== t) return f || (l ? e[s] = f = K.pop() || ae.guid++ : f = s), c[f] || (c[f] = {}, l || (c[f].toJSON = ae.noop)), "object" != typeof n && "function" != typeof n || (i ? c[f] = ae.extend(c[f], n) : c[f].data = ae.extend(c[f].data, n)), o = c[f], i || (o.data || (o.data = {}), o = o.data), r !== t && (o[ae.camelCase(n)] = r), u ? null == (a = o[n]) && (a = o[ae.camelCase(n)]) : a = o, a
		}
	}

	function o(e, t, n) {
		if(ae.acceptData(e)) {
			var r, i, o, a = e.nodeType,
				u = a ? ae.cache : e,
				l = a ? e[ae.expando] : ae.expando;
			if(u[l]) {
				if(t && (o = n ? u[l] : u[l].data)) {
					for((r = 0, i = (t = ae.isArray(t) ? t.concat(ae.map(t, ae.camelCase)) : t in o ? [t] : (t = ae.camelCase(t)) in o ? [t] : t.split(" ")).length); r < i; r++) delete o[t[r]];
					if(!(n ? s : ae.isEmptyObject)(o)) return
				}(n || (delete u[l].data, s(u[l]))) && (a ? ae.cleanData([e], !0) : ae.support.deleteExpando || u != u.window ? delete u[l] : u[l] = null)
			}
		}
	}

	function a(e, n, r) {
		if(r === t && 1 === e.nodeType) {
			var i = "data-" + n.replace(Ne, "-$1").toLowerCase();
			if("string" == typeof(r = e.getAttribute(i))) {
				try {
					r = "true" === r || "false" !== r && ("null" === r ? null : +r + "" === r ? +r : Te.test(r) ? ae.parseJSON(r) : r)
				} catch(e) {}
				ae.data(e, n, r)
			} else r = t
		}
		return r
	}

	function s(e) {
		var t;
		for(t in e)
			if(("data" !== t || !ae.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
		return !0
	}

	function u() {
		return !0
	}

	function l() {
		return !1
	}

	function c(e, t) {
		do {
			e = e[t]
		} while (e && 1 !== e.nodeType);
		return e
	}

	function f(e, t, n) {
		if(t = t || 0, ae.isFunction(t)) return ae.grep(e, function(e, r) {
			return !!t.call(e, r, e) === n
		});
		if(t.nodeType) return ae.grep(e, function(e) {
			return e === t === n
		});
		if("string" == typeof t) {
			var r = ae.grep(e, function(e) {
				return 1 === e.nodeType
			});
			if(We.test(t)) return ae.filter(t, r, !n);
			t = ae.filter(t, r)
		}
		return ae.grep(e, function(e) {
			return ae.inArray(e, t) >= 0 === n
		})
	}

	function p(e) {
		var t = ze.split("|"),
			n = e.createDocumentFragment();
		if(n.createElement)
			for(; t.length;) n.createElement(t.pop());
		return n
	}

	function d(e, t) {
		return e.getElementsByTagName(t)[0] || e.appendChild(e.ownerDocument.createElement(t))
	}

	function h(e) {
		var t = e.getAttributeNode("type");
		return e.type = (t && t.specified) + "/" + e.type, e
	}

	function g(e) {
		var t = nt.exec(e.type);
		return t ? e.type = t[1] : e.removeAttribute("type"), e
	}

	function m(e, t) {
		for(var n, r = 0; null != (n = e[r]); r++) ae._data(n, "globalEval", !t || ae._data(t[r], "globalEval"))
	}

	function y(e, t) {
		if(1 === t.nodeType && ae.hasData(e)) {
			var n, r, i, o = ae._data(e),
				a = ae._data(t, o),
				s = o.events;
			if(s) {
				delete a.handle, a.events = {};
				for(n in s)
					for(r = 0, i = s[n].length; r < i; r++) ae.event.add(t, n, s[n][r])
			}
			a.data && (a.data = ae.extend({}, a.data))
		}
	}

	function v(e, t) {
		var n, r, i;
		if(1 === t.nodeType) {
			if(n = t.nodeName.toLowerCase(), !ae.support.noCloneEvent && t[ae.expando]) {
				i = ae._data(t);
				for(r in i.events) ae.removeEvent(t, r, i.handle);
				t.removeAttribute(ae.expando)
			}
			"script" === n && t.text !== e.text ? (h(t).text = e.text, g(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), ae.support.html5Clone && e.innerHTML && !ae.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && Ze.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
		}
	}

	function b(e, n) {
		var r, i, o = 0,
			a = typeof e.getElementsByTagName !== U ? e.getElementsByTagName(n || "*") : typeof e.querySelectorAll !== U ? e.querySelectorAll(n || "*") : t;
		if(!a)
			for(a = [], r = e.childNodes || e; null != (i = r[o]); o++) !n || ae.nodeName(i, n) ? a.push(i) : ae.merge(a, b(i, n));
		return n === t || n && ae.nodeName(e, n) ? ae.merge([e], a) : a
	}

	function x(e) {
		Ze.test(e.type) && (e.defaultChecked = e.checked)
	}

	function w(e, t) {
		if(t in e) return t;
		for(var n = t.charAt(0).toUpperCase() + t.slice(1), r = t, i = wt.length; i--;)
			if((t = wt[i] + n) in e) return t;
		return r
	}

	function T(e, t) {
		return e = t || e, "none" === ae.css(e, "display") || !ae.contains(e.ownerDocument, e)
	}

	function N(e, t) {
		for(var n, r, i, o = [], a = 0, s = e.length; a < s; a++)(r = e[a]).style && (o[a] = ae._data(r, "olddisplay"), n = r.style.display, t ? (o[a] || "none" !== n || (r.style.display = ""), "" === r.style.display && T(r) && (o[a] = ae._data(r, "olddisplay", S(r.nodeName)))) : o[a] || (i = T(r), (n && "none" !== n || !i) && ae._data(r, "olddisplay", i ? n : ae.css(r, "display"))));
		for(a = 0; a < s; a++)(r = e[a]).style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[a] || "" : "none"));
		return e
	}

	function C(e, t, n) {
		var r = ht.exec(t);
		return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
	}

	function k(e, t, n, r, i) {
		for(var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; o < 4; o += 2) "margin" === n && (a += ae.css(e, n + xt[o], !0, i)), r ? ("content" === n && (a -= ae.css(e, "padding" + xt[o], !0, i)), "margin" !== n && (a -= ae.css(e, "border" + xt[o] + "Width", !0, i))) : (a += ae.css(e, "padding" + xt[o], !0, i), "padding" !== n && (a += ae.css(e, "border" + xt[o] + "Width", !0, i)));
		return a
	}

	function E(e, t, n) {
		var r = !0,
			i = "width" === t ? e.offsetWidth : e.offsetHeight,
			o = st(e),
			a = ae.support.boxSizing && "border-box" === ae.css(e, "boxSizing", !1, o);
		if(i <= 0 || null == i) {
			if(((i = ut(e, t, o)) < 0 || null == i) && (i = e.style[t]), gt.test(i)) return i;
			r = a && (ae.support.boxSizingReliable || i === e.style[t]), i = parseFloat(i) || 0
		}
		return i + k(e, t, n || (a ? "border" : "content"), r, o) + "px"
	}

	function S(e) {
		var t = V,
			n = yt[e];
		return n || ("none" !== (n = A(e, t)) && n || ((t = ((at = (at || ae("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement))[0].contentWindow || at[0].contentDocument).document).write("<!doctype html><html><body>"), t.close(), n = A(e, t), at.detach()), yt[e] = n), n
	}

	function A(e, t) {
		var n = ae(t.createElement(e)).appendTo(t.body),
			r = ae.css(n[0], "display");
		return n.remove(), r
	}

	function j(e, t, n, r) {
		var i;
		if(ae.isArray(t)) ae.each(t, function(t, i) {
			n || Nt.test(e) ? r(e, i) : j(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r)
		});
		else if(n || "object" !== ae.type(t)) r(e, t);
		else
			for(i in t) j(e + "[" + i + "]", t[i], n, r)
	}

	function D(e) {
		return function(t, n) {
			"string" != typeof t && (n = t, t = "*");
			var r, i = 0,
				o = t.toLowerCase().match(ue) || [];
			if(ae.isFunction(n))
				for(; r = o[i++];) "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
		}
	}

	function L(e, t, n, r) {
		function i(s) {
			var u;
			return o[s] = !0, ae.each(e[s] || [], function(e, s) {
				var l = s(t, n, r);
				return "string" != typeof l || a || o[l] ? a ? !(u = l) : void 0 : (t.dataTypes.unshift(l), i(l), !1)
			}), u
		}
		var o = {},
			a = e === Rt;
		return i(t.dataTypes[0]) || !o["*"] && i("*")
	}

	function H(e, n) {
		var r, i, o = ae.ajaxSettings.flatOptions || {};
		for(i in n) n[i] !== t && ((o[i] ? e : r || (r = {}))[i] = n[i]);
		return r && ae.extend(!0, e, r), e
	}

	function q(e, n, r) {
		var i, o, a, s, u = e.contents,
			l = e.dataTypes,
			c = e.responseFields;
		for(s in c) s in r && (n[c[s]] = r[s]);
		for(;
			"*" === l[0];) l.shift(), o === t && (o = e.mimeType || n.getResponseHeader("Content-Type"));
		if(o)
			for(s in u)
				if(u[s] && u[s].test(o)) {
					l.unshift(s);
					break
				}
		if(l[0] in r) a = l[0];
		else {
			for(s in r) {
				if(!l[0] || e.converters[s + " " + l[0]]) {
					a = s;
					break
				}
				i || (i = s)
			}
			a = a || i
		}
		if(a) return a !== l[0] && l.unshift(a), r[a]
	}

	function M(e, t) {
		var n, r, i, o, a = {},
			s = 0,
			u = e.dataTypes.slice(),
			l = u[0];
		if(e.dataFilter && (t = e.dataFilter(t, e.dataType)), u[1])
			for(i in e.converters) a[i.toLowerCase()] = e.converters[i];
		for(; r = u[++s];)
			if("*" !== r) {
				if("*" !== l && l !== r) {
					if(!(i = a[l + " " + r] || a["* " + r]))
						for(n in a)
							if((o = n.split(" "))[1] === r && (i = a[l + " " + o[0]] || a["* " + o[0]])) {
								!0 === i ? i = a[n] : !0 !== a[n] && (r = o[0], u.splice(s--, 0, r));
								break
							}
					if(!0 !== i)
						if(i && e.throws) t = i(t);
						else try {
							t = i(t)
						} catch(e) {
							return {
								state: "parsererror",
								error: i ? e : "No conversion from " + l + " to " + r
							}
						}
				}
				l = r
			}
		return {
			state: "success",
			data: t
		}
	}

	function _() {
		try {
			return new e.XMLHttpRequest
		} catch(e) {}
	}

	function F() {
		try {
			return new e.ActiveXObject("Microsoft.XMLHTTP")
		} catch(e) {}
	}

	function O() {
		return setTimeout(function() {
			Yt = t
		}), Yt = ae.now()
	}

	function B(e, t) {
		ae.each(t, function(t, n) {
			for(var r = (en[t] || []).concat(en["*"]), i = 0, o = r.length; i < o; i++)
				if(r[i].call(e, t, n)) return
		})
	}

	function P(e, t, n) {
		var r, i, o = 0,
			a = Zt.length,
			s = ae.Deferred().always(function() {
				delete u.elem
			}),
			u = function() {
				if(i) return !1;
				for(var t = Yt || O(), n = Math.max(0, l.startTime + l.duration - t), r = 1 - (n / l.duration || 0), o = 0, a = l.tweens.length; o < a; o++) l.tweens[o].run(r);
				return s.notifyWith(e, [l, r, n]), r < 1 && a ? n : (s.resolveWith(e, [l]), !1)
			},
			l = s.promise({
				elem: e,
				props: ae.extend({}, t),
				opts: ae.extend(!0, {
					specialEasing: {}
				}, n),
				originalProperties: t,
				originalOptions: n,
				startTime: Yt || O(),
				duration: n.duration,
				tweens: [],
				createTween: function(t, n) {
					var r = ae.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
					return l.tweens.push(r), r
				},
				stop: function(t) {
					var n = 0,
						r = t ? l.tweens.length : 0;
					if(i) return this;
					for(i = !0; n < r; n++) l.tweens[n].run(1);
					return t ? s.resolveWith(e, [l, t]) : s.rejectWith(e, [l, t]), this
				}
			}),
			c = l.props;
		for(R(c, l.opts.specialEasing); o < a; o++)
			if(r = Zt[o].call(l, e, c, l.opts)) return r;
		return B(l, c), ae.isFunction(l.opts.start) && l.opts.start.call(e, l), ae.fx.timer(ae.extend(u, {
			elem: e,
			anim: l,
			queue: l.opts.queue
		})), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
	}

	function R(e, t) {
		var n, r, i, o, a;
		for(i in e)
			if(r = ae.camelCase(i), o = t[r], n = e[i], ae.isArray(n) && (o = n[1], n = e[i] = n[0]), i !== r && (e[r] = n, delete e[i]), (a = ae.cssHooks[r]) && "expand" in a) {
				n = a.expand(n), delete e[r];
				for(i in n) i in e || (e[i] = n[i], t[i] = o)
			} else t[r] = o
	}

	function W(e, t, n, r, i) {
		return new W.prototype.init(e, t, n, r, i)
	}

	function $(e, t) {
		var n, r = {
				height: e
			},
			i = 0;
		for(t = t ? 1 : 0; i < 4; i += 2 - t) r["margin" + (n = xt[i])] = r["padding" + n] = e;
		return t && (r.opacity = r.width = e), r
	}

	function I(e) {
		return ae.isWindow(e) ? e : 9 === e.nodeType && (e.defaultView || e.parentWindow)
	}
	var z, X, U = typeof t,
		V = e.document,
		Y = e.location,
		J = e.jQuery,
		G = e.$,
		Q = {},
		K = [],
		Z = K.concat,
		ee = K.push,
		te = K.slice,
		ne = K.indexOf,
		re = Q.toString,
		ie = Q.hasOwnProperty,
		oe = "1.9.1".trim,
		ae = function(e, t) {
			return new ae.fn.init(e, t, X)
		},
		se = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
		ue = /\S+/g,
		le = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
		ce = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,
		fe = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
		pe = /^[\],:{}\s]*$/,
		de = /(?:^|:|,)(?:\s*\[)+/g,
		he = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
		ge = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
		me = /^-ms-/,
		ye = /-([\da-z])/gi,
		ve = function(e, t) {
			return t.toUpperCase()
		},
		be = function(e) {
			(V.addEventListener || "load" === e.type || "complete" === V.readyState) && (xe(), ae.ready())
		},
		xe = function() {
			V.addEventListener ? (V.removeEventListener("DOMContentLoaded", be, !1), e.removeEventListener("load", be, !1)) : (V.detachEvent("onreadystatechange", be), e.detachEvent("onload", be))
		};
	ae.fn = ae.prototype = {
		jquery: "1.9.1",
		constructor: ae,
		init: function(e, n, r) {
			var i, o;
			if(!e) return this;
			if("string" == typeof e) {
				if(!(i = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : ce.exec(e)) || !i[1] && n) return !n || n.jquery ? (n || r).find(e) : this.constructor(n).find(e);
				if(i[1]) {
					if(n = n instanceof ae ? n[0] : n, ae.merge(this, ae.parseHTML(i[1], n && n.nodeType ? n.ownerDocument || n : V, !0)), fe.test(i[1]) && ae.isPlainObject(n))
						for(i in n) ae.isFunction(this[i]) ? this[i](n[i]) : this.attr(i, n[i]);
					return this
				}
				if((o = V.getElementById(i[2])) && o.parentNode) {
					if(o.id !== i[2]) return r.find(e);
					this.length = 1, this[0] = o
				}
				return this.context = V, this.selector = e, this
			}
			return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : ae.isFunction(e) ? r.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), ae.makeArray(e, this))
		},
		selector: "",
		length: 0,
		size: function() {
			return this.length
		},
		toArray: function() {
			return te.call(this)
		},
		get: function(e) {
			return null == e ? this.toArray() : e < 0 ? this[this.length + e] : this[e]
		},
		pushStack: function(e) {
			var t = ae.merge(this.constructor(), e);
			return t.prevObject = this, t.context = this.context, t
		},
		each: function(e, t) {
			return ae.each(this, e, t)
		},
		ready: function(e) {
			return ae.ready.promise().done(e), this
		},
		slice: function() {
			return this.pushStack(te.apply(this, arguments))
		},
		first: function() {
			return this.eq(0)
		},
		last: function() {
			return this.eq(-1)
		},
		eq: function(e) {
			var t = this.length,
				n = +e + (e < 0 ? t : 0);
			return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
		},
		map: function(e) {
			return this.pushStack(ae.map(this, function(t, n) {
				return e.call(t, n, t)
			}))
		},
		end: function() {
			return this.prevObject || this.constructor(null)
		},
		push: ee,
		sort: [].sort,
		splice: [].splice
	}, ae.fn.init.prototype = ae.fn, ae.extend = ae.fn.extend = function() {
		var e, n, r, i, o, a, s = arguments[0] || {},
			u = 1,
			l = arguments.length,
			c = !1;
		for("boolean" == typeof s && (c = s, s = arguments[1] || {}, u = 2), "object" == typeof s || ae.isFunction(s) || (s = {}), l === u && (s = this, --u); u < l; u++)
			if(null != (o = arguments[u]))
				for(i in o) e = s[i], s !== (r = o[i]) && (c && r && (ae.isPlainObject(r) || (n = ae.isArray(r))) ? (n ? (n = !1, a = e && ae.isArray(e) ? e : []) : a = e && ae.isPlainObject(e) ? e : {}, s[i] = ae.extend(c, a, r)) : r !== t && (s[i] = r));
		return s
	}, ae.extend({
		noConflict: function(t) {
			return e.$ === ae && (e.$ = G), t && e.jQuery === ae && (e.jQuery = J), ae
		},
		isReady: !1,
		readyWait: 1,
		holdReady: function(e) {
			e ? ae.readyWait++ : ae.ready(!0)
		},
		ready: function(e) {
			if(!0 === e ? !--ae.readyWait : !ae.isReady) {
				if(!V.body) return setTimeout(ae.ready);
				ae.isReady = !0, !0 !== e && --ae.readyWait > 0 || (z.resolveWith(V, [ae]), ae.fn.trigger && ae(V).trigger("ready").off("ready"))
			}
		},
		isFunction: function(e) {
			return "function" === ae.type(e)
		},
		isArray: Array.isArray || function(e) {
			return "array" === ae.type(e)
		},
		isWindow: function(e) {
			return null != e && e == e.window
		},
		isNumeric: function(e) {
			return !isNaN(parseFloat(e)) && isFinite(e)
		},
		type: function(e) {
			return null == e ? String(e) : "object" == typeof e || "function" == typeof e ? Q[re.call(e)] || "object" : typeof e
		},
		isPlainObject: function(e) {
			if(!e || "object" !== ae.type(e) || e.nodeType || ae.isWindow(e)) return !1;
			try {
				if(e.constructor && !ie.call(e, "constructor") && !ie.call(e.constructor.prototype, "isPrototypeOf")) return !1
			} catch(e) {
				return !1
			}
			var n;
			for(n in e);
			return n === t || ie.call(e, n)
		},
		isEmptyObject: function(e) {
			var t;
			for(t in e) return !1;
			return !0
		},
		error: function(e) {
			throw new Error(e)
		},
		parseHTML: function(e, t, n) {
			if(!e || "string" != typeof e) return null;
			"boolean" == typeof t && (n = t, t = !1), t = t || V;
			var r = fe.exec(e),
				i = !n && [];
			return r ? [t.createElement(r[1])] : (r = ae.buildFragment([e], t, i), i && ae(i).remove(), ae.merge([], r.childNodes))
		},
		parseJSON: function(t) {
			return e.JSON && e.JSON.parse ? e.JSON.parse(t) : null === t ? t : "string" == typeof t && (t = ae.trim(t)) && pe.test(t.replace(he, "@").replace(ge, "]").replace(de, "")) ? new Function("return " + t)() : void ae.error("Invalid JSON: " + t)
		},
		parseXML: function(n) {
			var r, i;
			if(!n || "string" != typeof n) return null;
			try {
				e.DOMParser ? (i = new DOMParser, r = i.parseFromString(n, "text/xml")) : ((r = new ActiveXObject("Microsoft.XMLDOM")).async = "false", r.loadXML(n))
			} catch(e) {
				r = t
			}
			return r && r.documentElement && !r.getElementsByTagName("parsererror").length || ae.error("Invalid XML: " + n), r
		},
		noop: function() {},
		globalEval: function(t) {
			t && ae.trim(t) && (e.execScript || function(t) {
				e.eval.call(e, t)
			})(t)
		},
		camelCase: function(e) {
			return e.replace(me, "ms-").replace(ye, ve)
		},
		nodeName: function(e, t) {
			return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
		},
		each: function(e, t, r) {
			var i = 0,
				o = e.length,
				a = n(e);
			if(r) {
				if(a)
					for(; i < o && !1 !== t.apply(e[i], r); i++);
				else
					for(i in e)
						if(!1 === t.apply(e[i], r)) break
			} else if(a)
				for(; i < o && !1 !== t.call(e[i], i, e[i]); i++);
			else
				for(i in e)
					if(!1 === t.call(e[i], i, e[i])) break;
			return e
		},
		trim: oe && !oe.call("\ufeff聽") ? function(e) {
			return null == e ? "" : oe.call(e)
		} : function(e) {
			return null == e ? "" : (e + "").replace(le, "")
		},
		makeArray: function(e, t) {
			var r = t || [];
			return null != e && (n(Object(e)) ? ae.merge(r, "string" == typeof e ? [e] : e) : ee.call(r, e)), r
		},
		inArray: function(e, t, n) {
			var r;
			if(t) {
				if(ne) return ne.call(t, e, n);
				for(r = t.length, n = n ? n < 0 ? Math.max(0, r + n) : n : 0; n < r; n++)
					if(n in t && t[n] === e) return n
			}
			return -1
		},
		merge: function(e, n) {
			var r = n.length,
				i = e.length,
				o = 0;
			if("number" == typeof r)
				for(; o < r; o++) e[i++] = n[o];
			else
				for(; n[o] !== t;) e[i++] = n[o++];
			return e.length = i, e
		},
		grep: function(e, t, n) {
			var r = [],
				i = 0,
				o = e.length;
			for(n = !!n; i < o; i++) n !== !!t(e[i], i) && r.push(e[i]);
			return r
		},
		map: function(e, t, r) {
			var i, o = 0,
				a = e.length,
				s = [];
			if(n(e))
				for(; o < a; o++) null != (i = t(e[o], o, r)) && (s[s.length] = i);
			else
				for(o in e) null != (i = t(e[o], o, r)) && (s[s.length] = i);
			return Z.apply([], s)
		},
		guid: 1,
		proxy: function(e, n) {
			var r, i, o;
			return "string" == typeof n && (o = e[n], n = e, e = o), ae.isFunction(e) ? (r = te.call(arguments, 2), i = function() {
				return e.apply(n || this, r.concat(te.call(arguments)))
			}, i.guid = e.guid = e.guid || ae.guid++, i) : t
		},
		access: function(e, n, r, i, o, a, s) {
			var u = 0,
				l = e.length,
				c = null == r;
			if("object" === ae.type(r)) {
				o = !0;
				for(u in r) ae.access(e, n, u, r[u], !0, a, s)
			} else if(i !== t && (o = !0, ae.isFunction(i) || (s = !0), c && (s ? (n.call(e, i), n = null) : (c = n, n = function(e, t, n) {
					return c.call(ae(e), n)
				})), n))
				for(; u < l; u++) n(e[u], r, s ? i : i.call(e[u], u, n(e[u], r)));
			return o ? e : c ? n.call(e) : l ? n(e[0], r) : a
		},
		now: function() {
			return(new Date).getTime()
		}
	}), ae.ready.promise = function(t) {
		if(!z)
			if(z = ae.Deferred(), "complete" === V.readyState) setTimeout(ae.ready);
			else if(V.addEventListener) V.addEventListener("DOMContentLoaded", be, !1), e.addEventListener("load", be, !1);
		else {
			V.attachEvent("onreadystatechange", be), e.attachEvent("onload", be);
			var n = !1;
			try {
				n = null == e.frameElement && V.documentElement
			} catch(e) {}
			n && n.doScroll && function e() {
				if(!ae.isReady) {
					try {
						n.doScroll("left")
					} catch(t) {
						return setTimeout(e, 50)
					}
					xe(), ae.ready()
				}
			}()
		}
		return z.promise(t)
	}, ae.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
		Q["[object " + t + "]"] = t.toLowerCase()
	}), X = ae(V);
	var we = {};
	ae.Callbacks = function(e) {
		var n, i, o, a, s, u, l = [],
			c = !(e = "string" == typeof e ? we[e] || r(e) : ae.extend({}, e)).once && [],
			f = function(t) {
				for(i = e.memory && t, o = !0, s = u || 0, u = 0, a = l.length, n = !0; l && s < a; s++)
					if(!1 === l[s].apply(t[0], t[1]) && e.stopOnFalse) {
						i = !1;
						break
					}
				n = !1, l && (c ? c.length && f(c.shift()) : i ? l = [] : p.disable())
			},
			p = {
				add: function() {
					if(l) {
						var t = l.length;
						! function t(n) {
							ae.each(n, function(n, r) {
								var i = ae.type(r);
								"function" === i ? e.unique && p.has(r) || l.push(r) : r && r.length && "string" !== i && t(r)
							})
						}(arguments), n ? a = l.length : i && (u = t, f(i))
					}
					return this
				},
				remove: function() {
					return l && ae.each(arguments, function(e, t) {
						for(var r;
							(r = ae.inArray(t, l, r)) > -1;) l.splice(r, 1), n && (r <= a && a--, r <= s && s--)
					}), this
				},
				has: function(e) {
					return e ? ae.inArray(e, l) > -1 : !(!l || !l.length)
				},
				empty: function() {
					return l = [], this
				},
				disable: function() {
					return l = c = i = t, this
				},
				disabled: function() {
					return !l
				},
				lock: function() {
					return c = t, i || p.disable(), this
				},
				locked: function() {
					return !c
				},
				fireWith: function(e, t) {
					return t = t || [], t = [e, t.slice ? t.slice() : t], !l || o && !c || (n ? c.push(t) : f(t)), this
				},
				fire: function() {
					return p.fireWith(this, arguments), this
				},
				fired: function() {
					return !!o
				}
			};
		return p
	}, ae.extend({
		Deferred: function(e) {
			var t = [
					["resolve", "done", ae.Callbacks("once memory"), "resolved"],
					["reject", "fail", ae.Callbacks("once memory"), "rejected"],
					["notify", "progress", ae.Callbacks("memory")]
				],
				n = "pending",
				r = {
					state: function() {
						return n
					},
					always: function() {
						return i.done(arguments).fail(arguments), this
					},
					then: function() {
						var e = arguments;
						return ae.Deferred(function(n) {
							ae.each(t, function(t, o) {
								var a = o[0],
									s = ae.isFunction(e[t]) && e[t];
								i[o[1]](function() {
									var e = s && s.apply(this, arguments);
									e && ae.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[a + "With"](this === r ? n.promise() : this, s ? [e] : arguments)
								})
							}), e = null
						}).promise()
					},
					promise: function(e) {
						return null != e ? ae.extend(e, r) : r
					}
				},
				i = {};
			return r.pipe = r.then, ae.each(t, function(e, o) {
				var a = o[2],
					s = o[3];
				r[o[1]] = a.add, s && a.add(function() {
					n = s
				}, t[1 ^ e][2].disable, t[2][2].lock), i[o[0]] = function() {
					return i[o[0] + "With"](this === i ? r : this, arguments), this
				}, i[o[0] + "With"] = a.fireWith
			}), r.promise(i), e && e.call(i, i), i
		},
		when: function(e) {
			var t, n, r, i = 0,
				o = te.call(arguments),
				a = o.length,
				s = 1 !== a || e && ae.isFunction(e.promise) ? a : 0,
				u = 1 === s ? e : ae.Deferred(),
				l = function(e, n, r) {
					return function(i) {
						n[e] = this, r[e] = arguments.length > 1 ? te.call(arguments) : i, r === t ? u.notifyWith(n, r) : --s || u.resolveWith(n, r)
					}
				};
			if(a > 1)
				for(t = new Array(a), n = new Array(a), r = new Array(a); i < a; i++) o[i] && ae.isFunction(o[i].promise) ? o[i].promise().done(l(i, r, o)).fail(u.reject).progress(l(i, n, t)) : --s;
			return s || u.resolveWith(r, o), u.promise()
		}
	}), ae.support = function() {
		var t, n, r, i, o, a, s, u, l, c, f = V.createElement("div");
		if(f.setAttribute("className", "t"), f.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = f.getElementsByTagName("*"), r = f.getElementsByTagName("a")[0], !n || !r || !n.length) return {};
		s = (o = V.createElement("select")).appendChild(V.createElement("option")), i = f.getElementsByTagName("input")[0], r.style.cssText = "top:1px;float:left;opacity:.5", t = {
			getSetAttribute: "t" !== f.className,
			leadingWhitespace: 3 === f.firstChild.nodeType,
			tbody: !f.getElementsByTagName("tbody").length,
			htmlSerialize: !!f.getElementsByTagName("link").length,
			style: /top/.test(r.getAttribute("style")),
			hrefNormalized: "/a" === r.getAttribute("href"),
			opacity: /^0.5/.test(r.style.opacity),
			cssFloat: !!r.style.cssFloat,
			checkOn: !!i.value,
			optSelected: s.selected,
			enctype: !!V.createElement("form").enctype,
			html5Clone: "<:nav></:nav>" !== V.createElement("nav").cloneNode(!0).outerHTML,
			boxModel: "CSS1Compat" === V.compatMode,
			deleteExpando: !0,
			noCloneEvent: !0,
			inlineBlockNeedsLayout: !1,
			shrinkWrapBlocks: !1,
			reliableMarginRight: !0,
			boxSizingReliable: !0,
			pixelPosition: !1
		}, i.checked = !0, t.noCloneChecked = i.cloneNode(!0).checked, o.disabled = !0, t.optDisabled = !s.disabled;
		try {
			delete f.test
		} catch(e) {
			t.deleteExpando = !1
		}(i = V.createElement("input")).setAttribute("value", ""), t.input = "" === i.getAttribute("value"), i.value = "t", i.setAttribute("type", "radio"), t.radioValue = "t" === i.value, i.setAttribute("checked", "t"), i.setAttribute("name", "t"), (a = V.createDocumentFragment()).appendChild(i), t.appendChecked = i.checked, t.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked, f.attachEvent && (f.attachEvent("onclick", function() {
			t.noCloneEvent = !1
		}), f.cloneNode(!0).click());
		for(c in {
				submit: !0,
				change: !0,
				focusin: !0
			}) f.setAttribute(u = "on" + c, "t"), t[c + "Bubbles"] = u in e || !1 === f.attributes[u].expando;
		return f.style.backgroundClip = "content-box", f.cloneNode(!0).style.backgroundClip = "", t.clearCloneStyle = "content-box" === f.style.backgroundClip, ae(function() {
			var n, r, i, o = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
				a = V.getElementsByTagName("body")[0];
			a && ((n = V.createElement("div")).style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", a.appendChild(n).appendChild(f), f.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", (i = f.getElementsByTagName("td"))[0].style.cssText = "padding:0;margin:0;border:0;display:none", l = 0 === i[0].offsetHeight, i[0].style.display = "", i[1].style.display = "none", t.reliableHiddenOffsets = l && 0 === i[0].offsetHeight, f.innerHTML = "", f.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", t.boxSizing = 4 === f.offsetWidth, t.doesNotIncludeMarginInBodyOffset = 1 !== a.offsetTop, e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(f, null) || {}).top, t.boxSizingReliable = "4px" === (e.getComputedStyle(f, null) || {
				width: "4px"
			}).width, (r = f.appendChild(V.createElement("div"))).style.cssText = f.style.cssText = o, r.style.marginRight = r.style.width = "0", f.style.width = "1px", t.reliableMarginRight = !parseFloat((e.getComputedStyle(r, null) || {}).marginRight)), typeof f.style.zoom !== U && (f.innerHTML = "", f.style.cssText = o + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = 3 === f.offsetWidth, f.style.display = "block", f.innerHTML = "<div></div>", f.firstChild.style.width = "5px", t.shrinkWrapBlocks = 3 !== f.offsetWidth, t.inlineBlockNeedsLayout && (a.style.zoom = 1)), a.removeChild(n), n = f = i = r = null)
		}), n = o = a = s = r = i = null, t
	}();
	var Te = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
		Ne = /([A-Z])/g;
	ae.extend({
		cache: {},
		expando: "jQuery" + ("1.9.1" + Math.random()).replace(/\D/g, ""),
		noData: {
			embed: !0,
			object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
			applet: !0
		},
		hasData: function(e) {
			return !!(e = e.nodeType ? ae.cache[e[ae.expando]] : e[ae.expando]) && !s(e)
		},
		data: function(e, t, n) {
			return i(e, t, n)
		},
		removeData: function(e, t) {
			return o(e, t)
		},
		_data: function(e, t, n) {
			return i(e, t, n, !0)
		},
		_removeData: function(e, t) {
			return o(e, t, !0)
		},
		acceptData: function(e) {
			if(e.nodeType && 1 !== e.nodeType && 9 !== e.nodeType) return !1;
			var t = e.nodeName && ae.noData[e.nodeName.toLowerCase()];
			return !t || !0 !== t && e.getAttribute("classid") === t
		}
	}), ae.fn.extend({
		data: function(e, n) {
			var r, i, o = this[0],
				s = 0,
				u = null;
			if(e === t) {
				if(this.length && (u = ae.data(o), 1 === o.nodeType && !ae._data(o, "parsedAttrs"))) {
					for(r = o.attributes; s < r.length; s++)(i = r[s].name).indexOf("data-") || (i = ae.camelCase(i.slice(5)), a(o, i, u[i]));
					ae._data(o, "parsedAttrs", !0)
				}
				return u
			}
			return "object" == typeof e ? this.each(function() {
				ae.data(this, e)
			}) : ae.access(this, function(n) {
				if(n === t) return o ? a(o, e, ae.data(o, e)) : null;
				this.each(function() {
					ae.data(this, e, n)
				})
			}, null, n, arguments.length > 1, null, !0)
		},
		removeData: function(e) {
			return this.each(function() {
				ae.removeData(this, e)
			})
		}
	}), ae.extend({
		queue: function(e, t, n) {
			var r;
			if(e) return t = (t || "fx") + "queue", r = ae._data(e, t), n && (!r || ae.isArray(n) ? r = ae._data(e, t, ae.makeArray(n)) : r.push(n)), r || []
		},
		dequeue: function(e, t) {
			t = t || "fx";
			var n = ae.queue(e, t),
				r = n.length,
				i = n.shift(),
				o = ae._queueHooks(e, t);
			"inprogress" === i && (i = n.shift(), r--), o.cur = i, i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, function() {
				ae.dequeue(e, t)
			}, o)), !r && o && o.empty.fire()
		},
		_queueHooks: function(e, t) {
			var n = t + "queueHooks";
			return ae._data(e, n) || ae._data(e, n, {
				empty: ae.Callbacks("once memory").add(function() {
					ae._removeData(e, t + "queue"), ae._removeData(e, n)
				})
			})
		}
	}), ae.fn.extend({
		queue: function(e, n) {
			var r = 2;
			return "string" != typeof e && (n = e, e = "fx", r--), arguments.length < r ? ae.queue(this[0], e) : n === t ? this : this.each(function() {
				var t = ae.queue(this, e, n);
				ae._queueHooks(this, e), "fx" === e && "inprogress" !== t[0] && ae.dequeue(this, e)
			})
		},
		dequeue: function(e) {
			return this.each(function() {
				ae.dequeue(this, e)
			})
		},
		delay: function(e, t) {
			return e = ae.fx ? ae.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
				var r = setTimeout(t, e);
				n.stop = function() {
					clearTimeout(r)
				}
			})
		},
		clearQueue: function(e) {
			return this.queue(e || "fx", [])
		},
		promise: function(e, n) {
			var r, i = 1,
				o = ae.Deferred(),
				a = this,
				s = this.length,
				u = function() {
					--i || o.resolveWith(a, [a])
				};
			for("string" != typeof e && (n = e, e = t), e = e || "fx"; s--;)(r = ae._data(a[s], e + "queueHooks")) && r.empty && (i++, r.empty.add(u));
			return u(), o.promise(n)
		}
	});
	var Ce, ke, Ee = /[\t\r\n]/g,
		Se = /\r/g,
		Ae = /^(?:input|select|textarea|button|object)$/i,
		je = /^(?:a|area)$/i,
		De = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,
		Le = /^(?:checked|selected)$/i,
		He = ae.support.getSetAttribute,
		qe = ae.support.input;
	ae.fn.extend({
		attr: function(e, t) {
			return ae.access(this, ae.attr, e, t, arguments.length > 1)
		},
		removeAttr: function(e) {
			return this.each(function() {
				ae.removeAttr(this, e)
			})
		},
		prop: function(e, t) {
			return ae.access(this, ae.prop, e, t, arguments.length > 1)
		},
		removeProp: function(e) {
			return e = ae.propFix[e] || e, this.each(function() {
				try {
					this[e] = t, delete this[e]
				} catch(e) {}
			})
		},
		addClass: function(e) {
			var t, n, r, i, o, a = 0,
				s = this.length,
				u = "string" == typeof e && e;
			if(ae.isFunction(e)) return this.each(function(t) {
				ae(this).addClass(e.call(this, t, this.className))
			});
			if(u)
				for(t = (e || "").match(ue) || []; a < s; a++)
					if(n = this[a], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(Ee, " ") : " ")) {
						for(o = 0; i = t[o++];) r.indexOf(" " + i + " ") < 0 && (r += i + " ");
						n.className = ae.trim(r)
					}
			return this
		},
		removeClass: function(e) {
			var t, n, r, i, o, a = 0,
				s = this.length,
				u = 0 === arguments.length || "string" == typeof e && e;
			if(ae.isFunction(e)) return this.each(function(t) {
				ae(this).removeClass(e.call(this, t, this.className))
			});
			if(u)
				for(t = (e || "").match(ue) || []; a < s; a++)
					if(n = this[a], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(Ee, " ") : "")) {
						for(o = 0; i = t[o++];)
							for(; r.indexOf(" " + i + " ") >= 0;) r = r.replace(" " + i + " ", " ");
						n.className = e ? ae.trim(r) : ""
					}
			return this
		},
		toggleClass: function(e, t) {
			var n = typeof e,
				r = "boolean" == typeof t;
			return ae.isFunction(e) ? this.each(function(n) {
				ae(this).toggleClass(e.call(this, n, this.className, t), t)
			}) : this.each(function() {
				if("string" === n)
					for(var i, o = 0, a = ae(this), s = t, u = e.match(ue) || []; i = u[o++];) a[(s = r ? s : !a.hasClass(i)) ? "addClass" : "removeClass"](i);
				else n !== U && "boolean" !== n || (this.className && ae._data(this, "__className__", this.className), this.className = this.className || !1 === e ? "" : ae._data(this, "__className__") || "")
			})
		},
		hasClass: function(e) {
			for(var t = " " + e + " ", n = 0, r = this.length; n < r; n++)
				if(1 === this[n].nodeType && (" " + this[n].className + " ").replace(Ee, " ").indexOf(t) >= 0) return !0;
			return !1
		},
		val: function(e) {
			var n, r, i, o = this[0]; {
				if(arguments.length) return i = ae.isFunction(e), this.each(function(n) {
					var o, a = ae(this);
					1 === this.nodeType && (null == (o = i ? e.call(this, n, a.val()) : e) ? o = "" : "number" == typeof o ? o += "" : ae.isArray(o) && (o = ae.map(o, function(e) {
						return null == e ? "" : e + ""
					})), (r = ae.valHooks[this.type] || ae.valHooks[this.nodeName.toLowerCase()]) && "set" in r && r.set(this, o, "value") !== t || (this.value = o))
				});
				if(o) return(r = ae.valHooks[o.type] || ae.valHooks[o.nodeName.toLowerCase()]) && "get" in r && (n = r.get(o, "value")) !== t ? n : "string" == typeof(n = o.value) ? n.replace(Se, "") : null == n ? "" : n
			}
		}
	}), ae.extend({
		valHooks: {
			option: {
				get: function(e) {
					var t = e.attributes.value;
					return !t || t.specified ? e.value : e.text
				}
			},
			select: {
				get: function(e) {
					for(var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || i < 0, a = o ? null : [], s = o ? i + 1 : r.length, u = i < 0 ? s : o ? i : 0; u < s; u++)
						if(((n = r[u]).selected || u === i) && (ae.support.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !ae.nodeName(n.parentNode, "optgroup"))) {
							if(t = ae(n).val(), o) return t;
							a.push(t)
						}
					return a
				},
				set: function(e, t) {
					var n = ae.makeArray(t);
					return ae(e).find("option").each(function() {
						this.selected = ae.inArray(ae(this).val(), n) >= 0
					}), n.length || (e.selectedIndex = -1), n
				}
			}
		},
		attr: function(e, n, r) {
			var i, o, a, s = e.nodeType;
			if(e && 3 !== s && 8 !== s && 2 !== s) return typeof e.getAttribute === U ? ae.prop(e, n, r) : ((o = 1 !== s || !ae.isXMLDoc(e)) && (n = n.toLowerCase(), i = ae.attrHooks[n] || (De.test(n) ? ke : Ce)), r === t ? i && o && "get" in i && null !== (a = i.get(e, n)) ? a : (typeof e.getAttribute !== U && (a = e.getAttribute(n)), null == a ? t : a) : null !== r ? i && o && "set" in i && (a = i.set(e, r, n)) !== t ? a : (e.setAttribute(n, r + ""), r) : void ae.removeAttr(e, n))
		},
		removeAttr: function(e, t) {
			var n, r, i = 0,
				o = t && t.match(ue);
			if(o && 1 === e.nodeType)
				for(; n = o[i++];) r = ae.propFix[n] || n, De.test(n) ? !He && Le.test(n) ? e[ae.camelCase("default-" + n)] = e[r] = !1 : e[r] = !1 : ae.attr(e, n, ""), e.removeAttribute(He ? n : r)
		},
		attrHooks: {
			type: {
				set: function(e, t) {
					if(!ae.support.radioValue && "radio" === t && ae.nodeName(e, "input")) {
						var n = e.value;
						return e.setAttribute("type", t), n && (e.value = n), t
					}
				}
			}
		},
		propFix: {
			tabindex: "tabIndex",
			readonly: "readOnly",
			for: "htmlFor",
			class: "className",
			maxlength: "maxLength",
			cellspacing: "cellSpacing",
			cellpadding: "cellPadding",
			rowspan: "rowSpan",
			colspan: "colSpan",
			usemap: "useMap",
			frameborder: "frameBorder",
			contenteditable: "contentEditable"
		},
		prop: function(e, n, r) {
			var i, o, a = e.nodeType;
			if(e && 3 !== a && 8 !== a && 2 !== a) return(1 !== a || !ae.isXMLDoc(e)) && (n = ae.propFix[n] || n, o = ae.propHooks[n]), r !== t ? o && "set" in o && (i = o.set(e, r, n)) !== t ? i : e[n] = r : o && "get" in o && null !== (i = o.get(e, n)) ? i : e[n]
		},
		propHooks: {
			tabIndex: {
				get: function(e) {
					var n = e.getAttributeNode("tabindex");
					return n && n.specified ? parseInt(n.value, 10) : Ae.test(e.nodeName) || je.test(e.nodeName) && e.href ? 0 : t
				}
			}
		}
	}), ke = {
		get: function(e, n) {
			var r = ae.prop(e, n),
				i = "boolean" == typeof r && e.getAttribute(n),
				o = "boolean" == typeof r ? qe && He ? null != i : Le.test(n) ? e[ae.camelCase("default-" + n)] : !!i : e.getAttributeNode(n);
			return o && !1 !== o.value ? n.toLowerCase() : t
		},
		set: function(e, t, n) {
			return !1 === t ? ae.removeAttr(e, n) : qe && He || !Le.test(n) ? e.setAttribute(!He && ae.propFix[n] || n, n) : e[ae.camelCase("default-" + n)] = e[n] = !0, n
		}
	}, qe && He || (ae.attrHooks.value = {
		get: function(e, n) {
			var r = e.getAttributeNode(n);
			return ae.nodeName(e, "input") ? e.defaultValue : r && r.specified ? r.value : t
		},
		set: function(e, t, n) {
			if(!ae.nodeName(e, "input")) return Ce && Ce.set(e, t, n);
			e.defaultValue = t
		}
	}), He || (Ce = ae.valHooks.button = {
		get: function(e, n) {
			var r = e.getAttributeNode(n);
			return r && ("id" === n || "name" === n || "coords" === n ? "" !== r.value : r.specified) ? r.value : t
		},
		set: function(e, n, r) {
			var i = e.getAttributeNode(r);
			return i || e.setAttributeNode(i = e.ownerDocument.createAttribute(r)), i.value = n += "", "value" === r || n === e.getAttribute(r) ? n : t
		}
	}, ae.attrHooks.contenteditable = {
		get: Ce.get,
		set: function(e, t, n) {
			Ce.set(e, "" !== t && t, n)
		}
	}, ae.each(["width", "height"], function(e, t) {
		ae.attrHooks[t] = ae.extend(ae.attrHooks[t], {
			set: function(e, n) {
				if("" === n) return e.setAttribute(t, "auto"), n
			}
		})
	})), ae.support.hrefNormalized || (ae.each(["href", "src", "width", "height"], function(e, n) {
		ae.attrHooks[n] = ae.extend(ae.attrHooks[n], {
			get: function(e) {
				var r = e.getAttribute(n, 2);
				return null == r ? t : r
			}
		})
	}), ae.each(["href", "src"], function(e, t) {
		ae.propHooks[t] = {
			get: function(e) {
				return e.getAttribute(t, 4)
			}
		}
	})), ae.support.style || (ae.attrHooks.style = {
		get: function(e) {
			return e.style.cssText || t
		},
		set: function(e, t) {
			return e.style.cssText = t + ""
		}
	}), ae.support.optSelected || (ae.propHooks.selected = ae.extend(ae.propHooks.selected, {
		get: function(e) {
			var t = e.parentNode;
			return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
		}
	})), ae.support.enctype || (ae.propFix.enctype = "encoding"), ae.support.checkOn || ae.each(["radio", "checkbox"], function() {
		ae.valHooks[this] = {
			get: function(e) {
				return null === e.getAttribute("value") ? "on" : e.value
			}
		}
	}), ae.each(["radio", "checkbox"], function() {
		ae.valHooks[this] = ae.extend(ae.valHooks[this], {
			set: function(e, t) {
				if(ae.isArray(t)) return e.checked = ae.inArray(ae(e).val(), t) >= 0
			}
		})
	});
	var Me = /^(?:input|select|textarea)$/i,
		_e = /^key/,
		Fe = /^(?:mouse|contextmenu)|click/,
		Oe = /^(?:focusinfocus|focusoutblur)$/,
		Be = /^([^.]*)(?:\.(.+)|)$/;
	ae.event = {
			global: {},
			add: function(e, n, r, i, o) {
				var a, s, u, l, c, f, p, d, h, g, m, y = ae._data(e);
				if(y) {
					for(r.handler && (r = (l = r).handler, o = l.selector), r.guid || (r.guid = ae.guid++), (s = y.events) || (s = y.events = {}), (f = y.handle) || ((f = y.handle = function(e) {
							return typeof ae === U || e && ae.event.triggered === e.type ? t : ae.event.dispatch.apply(f.elem, arguments)
						}).elem = e), u = (n = (n || "").match(ue) || [""]).length; u--;) h = m = (a = Be.exec(n[u]) || [])[1], g = (a[2] || "").split(".").sort(), c = ae.event.special[h] || {}, h = (o ? c.delegateType : c.bindType) || h, c = ae.event.special[h] || {}, p = ae.extend({
						type: h,
						origType: m,
						data: i,
						handler: r,
						guid: r.guid,
						selector: o,
						needsContext: o && ae.expr.match.needsContext.test(o),
						namespace: g.join(".")
					}, l), (d = s[h]) || ((d = s[h] = []).delegateCount = 0, c.setup && !1 !== c.setup.call(e, i, g, f) || (e.addEventListener ? e.addEventListener(h, f, !1) : e.attachEvent && e.attachEvent("on" + h, f))), c.add && (c.add.call(e, p), p.handler.guid || (p.handler.guid = r.guid)), o ? d.splice(d.delegateCount++, 0, p) : d.push(p), ae.event.global[h] = !0;
					e = null
				}
			},
			remove: function(e, t, n, r, i) {
				var o, a, s, u, l, c, f, p, d, h, g, m = ae.hasData(e) && ae._data(e);
				if(m && (c = m.events)) {
					for(l = (t = (t || "").match(ue) || [""]).length; l--;)
						if(s = Be.exec(t[l]) || [], d = g = s[1], h = (s[2] || "").split(".").sort(), d) {
							for(f = ae.event.special[d] || {}, p = c[d = (r ? f.delegateType : f.bindType) || d] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), u = o = p.length; o--;) a = p[o], !i && g !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || r && r !== a.selector && ("**" !== r || !a.selector) || (p.splice(o, 1), a.selector && p.delegateCount--, f.remove && f.remove.call(e, a));
							u && !p.length && (f.teardown && !1 !== f.teardown.call(e, h, m.handle) || ae.removeEvent(e, d, m.handle), delete c[d])
						} else
							for(d in c) ae.event.remove(e, d + t[l], n, r, !0);
					ae.isEmptyObject(c) && (delete m.handle, ae._removeData(e, "events"))
				}
			},
			trigger: function(n, r, i, o) {
				var a, s, u, l, c, f, p, d = [i || V],
					h = ie.call(n, "type") ? n.type : n,
					g = ie.call(n, "namespace") ? n.namespace.split(".") : [];
				if(u = f = i = i || V, 3 !== i.nodeType && 8 !== i.nodeType && !Oe.test(h + ae.event.triggered) && (h.indexOf(".") >= 0 && (h = (g = h.split(".")).shift(), g.sort()), s = h.indexOf(":") < 0 && "on" + h, n = n[ae.expando] ? n : new ae.Event(h, "object" == typeof n && n), n.isTrigger = !0, n.namespace = g.join("."), n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, n.result = t, n.target || (n.target = i), r = null == r ? [n] : ae.makeArray(r, [n]), c = ae.event.special[h] || {}, o || !c.trigger || !1 !== c.trigger.apply(i, r))) {
					if(!o && !c.noBubble && !ae.isWindow(i)) {
						for(l = c.delegateType || h, Oe.test(l + h) || (u = u.parentNode); u; u = u.parentNode) d.push(u), f = u;
						f === (i.ownerDocument || V) && d.push(f.defaultView || f.parentWindow || e)
					}
					for(p = 0;
						(u = d[p++]) && !n.isPropagationStopped();) n.type = p > 1 ? l : c.bindType || h, (a = (ae._data(u, "events") || {})[n.type] && ae._data(u, "handle")) && a.apply(u, r), (a = s && u[s]) && ae.acceptData(u) && a.apply && !1 === a.apply(u, r) && n.preventDefault();
					if(n.type = h, !o && !n.isDefaultPrevented() && (!c._default || !1 === c._default.apply(i.ownerDocument, r)) && ("click" !== h || !ae.nodeName(i, "a")) && ae.acceptData(i) && s && i[h] && !ae.isWindow(i)) {
						(f = i[s]) && (i[s] = null), ae.event.triggered = h;
						try {
							i[h]()
						} catch(e) {}
						ae.event.triggered = t, f && (i[s] = f)
					}
					return n.result
				}
			},
			dispatch: function(e) {
				e = ae.event.fix(e);
				var n, r, i, o, a, s = [],
					u = te.call(arguments),
					l = (ae._data(this, "events") || {})[e.type] || [],
					c = ae.event.special[e.type] || {};
				if(u[0] = e, e.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, e)) {
					for(s = ae.event.handlers.call(this, e, l), n = 0;
						(o = s[n++]) && !e.isPropagationStopped();)
						for(e.currentTarget = o.elem, a = 0;
							(i = o.handlers[a++]) && !e.isImmediatePropagationStopped();) e.namespace_re && !e.namespace_re.test(i.namespace) || (e.handleObj = i, e.data = i.data, (r = ((ae.event.special[i.origType] || {}).handle || i.handler).apply(o.elem, u)) !== t && !1 === (e.result = r) && (e.preventDefault(), e.stopPropagation()));
					return c.postDispatch && c.postDispatch.call(this, e), e.result
				}
			},
			handlers: function(e, n) {
				var r, i, o, a, s = [],
					u = n.delegateCount,
					l = e.target;
				if(u && l.nodeType && (!e.button || "click" !== e.type))
					for(; l != this; l = l.parentNode || this)
						if(1 === l.nodeType && (!0 !== l.disabled || "click" !== e.type)) {
							for(o = [], a = 0; a < u; a++) o[r = (i = n[a]).selector + " "] === t && (o[r] = i.needsContext ? ae(r, this).index(l) >= 0 : ae.find(r, this, null, [l]).length), o[r] && o.push(i);
							o.length && s.push({
								elem: l,
								handlers: o
							})
						}
				return u < n.length && s.push({
					elem: this,
					handlers: n.slice(u)
				}), s
			},
			fix: function(e) {
				if(e[ae.expando]) return e;
				var t, n, r, i = e.type,
					o = e,
					a = this.fixHooks[i];
				for(a || (this.fixHooks[i] = a = Fe.test(i) ? this.mouseHooks : _e.test(i) ? this.keyHooks : {}), r = a.props ? this.props.concat(a.props) : this.props, e = new ae.Event(o), t = r.length; t--;) e[n = r[t]] = o[n];
				return e.target || (e.target = o.srcElement || V), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, a.filter ? a.filter(e, o) : e
			},
			props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
			fixHooks: {},
			keyHooks: {
				props: "char charCode key keyCode".split(" "),
				filter: function(e, t) {
					return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
				}
			},
			mouseHooks: {
				props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
				filter: function(e, n) {
					var r, i, o, a = n.button,
						s = n.fromElement;
					return null == e.pageX && null != n.clientX && (o = (i = e.target.ownerDocument || V).documentElement, r = i.body, e.pageX = n.clientX + (o && o.scrollLeft || r && r.scrollLeft || 0) - (o && o.clientLeft || r && r.clientLeft || 0), e.pageY = n.clientY + (o && o.scrollTop || r && r.scrollTop || 0) - (o && o.clientTop || r && r.clientTop || 0)), !e.relatedTarget && s && (e.relatedTarget = s === e.target ? n.toElement : s), e.which || a === t || (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0), e
				}
			},
			special: {
				load: {
					noBubble: !0
				},
				click: {
					trigger: function() {
						if(ae.nodeName(this, "input") && "checkbox" === this.type && this.click) return this.click(), !1
					}
				},
				focus: {
					trigger: function() {
						if(this !== V.activeElement && this.focus) try {
							return this.focus(), !1
						} catch(e) {}
					},
					delegateType: "focusin"
				},
				blur: {
					trigger: function() {
						if(this === V.activeElement && this.blur) return this.blur(), !1
					},
					delegateType: "focusout"
				},
				beforeunload: {
					postDispatch: function(e) {
						e.result !== t && (e.originalEvent.returnValue = e.result)
					}
				}
			},
			simulate: function(e, t, n, r) {
				var i = ae.extend(new ae.Event, n, {
					type: e,
					isSimulated: !0,
					originalEvent: {}
				});
				r ? ae.event.trigger(i, null, t) : ae.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
			}
		}, ae.removeEvent = V.removeEventListener ? function(e, t, n) {
			e.removeEventListener && e.removeEventListener(t, n, !1)
		} : function(e, t, n) {
			var r = "on" + t;
			e.detachEvent && (typeof e[r] === U && (e[r] = null), e.detachEvent(r, n))
		}, ae.Event = function(e, t) {
			if(!(this instanceof ae.Event)) return new ae.Event(e, t);
			e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || !1 === e.returnValue || e.getPreventDefault && e.getPreventDefault() ? u : l) : this.type = e, t && ae.extend(this, t), this.timeStamp = e && e.timeStamp || ae.now(), this[ae.expando] = !0
		}, ae.Event.prototype = {
			isDefaultPrevented: l,
			isPropagationStopped: l,
			isImmediatePropagationStopped: l,
			preventDefault: function() {
				var e = this.originalEvent;
				this.isDefaultPrevented = u, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
			},
			stopPropagation: function() {
				var e = this.originalEvent;
				this.isPropagationStopped = u, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
			},
			stopImmediatePropagation: function() {
				this.isImmediatePropagationStopped = u, this.stopPropagation()
			}
		}, ae.each({
			mouseenter: "mouseover",
			mouseleave: "mouseout"
		}, function(e, t) {
			ae.event.special[e] = {
				delegateType: t,
				bindType: t,
				handle: function(e) {
					var n, r = this,
						i = e.relatedTarget,
						o = e.handleObj;
					return i && (i === r || ae.contains(r, i)) || (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
				}
			}
		}), ae.support.submitBubbles || (ae.event.special.submit = {
			setup: function() {
				if(ae.nodeName(this, "form")) return !1;
				ae.event.add(this, "click._submit keypress._submit", function(e) {
					var n = e.target,
						r = ae.nodeName(n, "input") || ae.nodeName(n, "button") ? n.form : t;
					r && !ae._data(r, "submitBubbles") && (ae.event.add(r, "submit._submit", function(e) {
						e._submit_bubble = !0
					}), ae._data(r, "submitBubbles", !0))
				})
			},
			postDispatch: function(e) {
				e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && ae.event.simulate("submit", this.parentNode, e, !0))
			},
			teardown: function() {
				if(ae.nodeName(this, "form")) return !1;
				ae.event.remove(this, "._submit")
			}
		}), ae.support.changeBubbles || (ae.event.special.change = {
			setup: function() {
				if(Me.test(this.nodeName)) return "checkbox" !== this.type && "radio" !== this.type || (ae.event.add(this, "propertychange._change", function(e) {
					"checked" === e.originalEvent.propertyName && (this._just_changed = !0)
				}), ae.event.add(this, "click._change", function(e) {
					this._just_changed && !e.isTrigger && (this._just_changed = !1), ae.event.simulate("change", this, e, !0)
				})), !1;
				ae.event.add(this, "beforeactivate._change", function(e) {
					var t = e.target;
					Me.test(t.nodeName) && !ae._data(t, "changeBubbles") && (ae.event.add(t, "change._change", function(e) {
						!this.parentNode || e.isSimulated || e.isTrigger || ae.event.simulate("change", this.parentNode, e, !0)
					}), ae._data(t, "changeBubbles", !0))
				})
			},
			handle: function(e) {
				var t = e.target;
				if(this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type) return e.handleObj.handler.apply(this, arguments)
			},
			teardown: function() {
				return ae.event.remove(this, "._change"), !Me.test(this.nodeName)
			}
		}), ae.support.focusinBubbles || ae.each({
			focus: "focusin",
			blur: "focusout"
		}, function(e, t) {
			var n = 0,
				r = function(e) {
					ae.event.simulate(t, e.target, ae.event.fix(e), !0)
				};
			ae.event.special[t] = {
				setup: function() {
					0 == n++ && V.addEventListener(e, r, !0)
				},
				teardown: function() {
					0 == --n && V.removeEventListener(e, r, !0)
				}
			}
		}), ae.fn.extend({
			on: function(e, n, r, i, o) {
				var a, s;
				if("object" == typeof e) {
					"string" != typeof n && (r = r || n, n = t);
					for(a in e) this.on(a, n, r, e[a], o);
					return this
				}
				if(null == r && null == i ? (i = n, r = n = t) : null == i && ("string" == typeof n ? (i = r, r = t) : (i = r, r = n, n = t)), !1 === i) i = l;
				else if(!i) return this;
				return 1 === o && (s = i, (i = function(e) {
					return ae().off(e), s.apply(this, arguments)
				}).guid = s.guid || (s.guid = ae.guid++)), this.each(function() {
					ae.event.add(this, e, i, r, n)
				})
			},
			one: function(e, t, n, r) {
				return this.on(e, t, n, r, 1)
			},
			off: function(e, n, r) {
				var i, o;
				if(e && e.preventDefault && e.handleObj) return i = e.handleObj, ae(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
				if("object" == typeof e) {
					for(o in e) this.off(o, n, e[o]);
					return this
				}
				return !1 !== n && "function" != typeof n || (r = n, n = t), !1 === r && (r = l), this.each(function() {
					ae.event.remove(this, e, r, n)
				})
			},
			bind: function(e, t, n) {
				return this.on(e, null, t, n)
			},
			unbind: function(e, t) {
				return this.off(e, null, t)
			},
			delegate: function(e, t, n, r) {
				return this.on(t, e, n, r)
			},
			undelegate: function(e, t, n) {
				return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
			},
			trigger: function(e, t) {
				return this.each(function() {
					ae.event.trigger(e, t, this)
				})
			},
			triggerHandler: function(e, t) {
				var n = this[0];
				if(n) return ae.event.trigger(e, t, n, !0)
			}
		}),
		function(e, t) {
			function n(e) {
				return ce.test(e + "")
			}

			function r() {
				var e, t = [];
				return e = function(n, r) {
					return t.push(n += " ") > T.cacheLength && delete e[t.shift()], e[n] = r
				}
			}

			function i(e) {
				return e[O] = !0, e
			}

			function o(e) {
				var t = j.createElement("div");
				try {
					return e(t)
				} catch(e) {
					return !1
				} finally {
					t = null
				}
			}

			function a(e, t, n, r) {
				var i, o, a, s, u, f, p, d, h, g;
				if((t ? t.ownerDocument || t : B) !== j && A(t), t = t || j, n = n || [], !e || "string" != typeof e) return n;
				if(1 !== (s = t.nodeType) && 9 !== s) return [];
				if(!L && !r) {
					if(i = fe.exec(e))
						if(a = i[1]) {
							if(9 === s) {
								if(!(o = t.getElementById(a)) || !o.parentNode) return n;
								if(o.id === a) return n.push(o), n
							} else if(t.ownerDocument && (o = t.ownerDocument.getElementById(a)) && _(t, o) && o.id === a) return n.push(o), n
						} else {
							if(i[2]) return Y.apply(n, J.call(t.getElementsByTagName(e), 0)), n;
							if((a = i[3]) && P.getByClassName && t.getElementsByClassName) return Y.apply(n, J.call(t.getElementsByClassName(a), 0)), n
						}
					if(P.qsa && !H.test(e)) {
						if(p = !0, d = O, h = t, g = 9 === s && e, 1 === s && "object" !== t.nodeName.toLowerCase()) {
							for(f = l(e), (p = t.getAttribute("id")) ? d = p.replace(he, "\\$&") : t.setAttribute("id", d), d = "[id='" + d + "'] ", u = f.length; u--;) f[u] = d + c(f[u]);
							h = le.test(e) && t.parentNode || t, g = f.join(",")
						}
						if(g) try {
							return Y.apply(n, J.call(h.querySelectorAll(g), 0)), n
						} catch(e) {} finally {
							p || t.removeAttribute("id")
						}
					}
				}
				return v(e.replace(ne, "$1"), t, n, r)
			}

			function s(e, t) {
				var n = t && e,
					r = n && (~t.sourceIndex || X) - (~e.sourceIndex || X);
				if(r) return r;
				if(n)
					for(; n = n.nextSibling;)
						if(n === t) return -1;
				return e ? 1 : -1
			}

			function u(e) {
				return i(function(t) {
					return t = +t, i(function(n, r) {
						for(var i, o = e([], n.length, t), a = o.length; a--;) n[i = o[a]] && (n[i] = !(r[i] = n[i]))
					})
				})
			}

			function l(e, t) {
				var n, r, i, o, s, u, l, c = I[e + " "];
				if(c) return t ? 0 : c.slice(0);
				for(s = e, u = [], l = T.preFilter; s;) {
					n && !(r = re.exec(s)) || (r && (s = s.slice(r[0].length) || s), u.push(i = [])), n = !1, (r = ie.exec(s)) && (n = r.shift(), i.push({
						value: n,
						type: r[0].replace(ne, " ")
					}), s = s.slice(n.length));
					for(o in T.filter) !(r = ue[o].exec(s)) || l[o] && !(r = l[o](r)) || (n = r.shift(), i.push({
						value: n,
						type: o,
						matches: r
					}), s = s.slice(n.length));
					if(!n) break
				}
				return t ? s.length : s ? a.error(e) : I(e, u).slice(0)
			}

			function c(e) {
				for(var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
				return r
			}

			function f(e, t, n) {
				var r = t.dir,
					i = n && "parentNode" === r,
					o = W++;
				return t.first ? function(t, n, o) {
					for(; t = t[r];)
						if(1 === t.nodeType || i) return e(t, n, o)
				} : function(t, n, a) {
					var s, u, l, c = R + " " + o;
					if(a) {
						for(; t = t[r];)
							if((1 === t.nodeType || i) && e(t, n, a)) return !0
					} else
						for(; t = t[r];)
							if(1 === t.nodeType || i)
								if(l = t[O] || (t[O] = {}), (u = l[r]) && u[0] === c) {
									if(!0 === (s = u[1]) || s === w) return !0 === s
								} else if(u = l[r] = [c], u[1] = e(t, n, a) || w, !0 === u[1]) return !0
				}
			}

			function p(e) {
				return e.length > 1 ? function(t, n, r) {
					for(var i = e.length; i--;)
						if(!e[i](t, n, r)) return !1;
					return !0
				} : e[0]
			}

			function d(e, t, n, r, i) {
				for(var o, a = [], s = 0, u = e.length, l = null != t; s < u; s++)(o = e[s]) && (n && !n(o, r, i) || (a.push(o), l && t.push(s)));
				return a
			}

			function h(e, t, n, r, o, a) {
				return r && !r[O] && (r = h(r)), o && !o[O] && (o = h(o, a)), i(function(i, a, s, u) {
					var l, c, f, p = [],
						h = [],
						g = a.length,
						m = i || y(t || "*", s.nodeType ? [s] : s, []),
						v = !e || !i && t ? m : d(m, p, e, s, u),
						b = n ? o || (i ? e : g || r) ? [] : a : v;
					if(n && n(v, b, s, u), r)
						for(l = d(b, h), r(l, [], s, u), c = l.length; c--;)(f = l[c]) && (b[h[c]] = !(v[h[c]] = f));
					if(i) {
						if(o || e) {
							if(o) {
								for(l = [], c = b.length; c--;)(f = b[c]) && l.push(v[c] = f);
								o(null, b = [], l, u)
							}
							for(c = b.length; c--;)(f = b[c]) && (l = o ? G.call(i, f) : p[c]) > -1 && (i[l] = !(a[l] = f))
						}
					} else b = d(b === a ? b.splice(g, b.length) : b), o ? o(null, a, b, u) : Y.apply(a, b)
				})
			}

			function g(e) {
				for(var t, n, r, i = e.length, o = T.relative[e[0].type], a = o || T.relative[" "], s = o ? 1 : 0, u = f(function(e) {
						return e === t
					}, a, !0), l = f(function(e) {
						return G.call(t, e) > -1
					}, a, !0), d = [function(e, n, r) {
						return !o && (r || n !== S) || ((t = n).nodeType ? u(e, n, r) : l(e, n, r))
					}]; s < i; s++)
					if(n = T.relative[e[s].type]) d = [f(p(d), n)];
					else {
						if((n = T.filter[e[s].type].apply(null, e[s].matches))[O]) {
							for(r = ++s; r < i && !T.relative[e[r].type]; r++);
							return h(s > 1 && p(d), s > 1 && c(e.slice(0, s - 1)).replace(ne, "$1"), n, s < r && g(e.slice(s, r)), r < i && g(e = e.slice(r)), r < i && c(e))
						}
						d.push(n)
					}
				return p(d)
			}

			function m(e, t) {
				var n = 0,
					r = t.length > 0,
					o = e.length > 0,
					s = function(i, s, u, l, c) {
						var f, p, h, g = [],
							m = 0,
							y = "0",
							v = i && [],
							b = null != c,
							x = S,
							N = i || o && T.find.TAG("*", c && s.parentNode || s),
							C = R += null == x ? 1 : Math.random() || .1;
						for(b && (S = s !== j && s, w = n); null != (f = N[y]); y++) {
							if(o && f) {
								for(p = 0; h = e[p++];)
									if(h(f, s, u)) {
										l.push(f);
										break
									}
								b && (R = C, w = ++n)
							}
							r && ((f = !h && f) && m--, i && v.push(f))
						}
						if(m += y, r && y !== m) {
							for(p = 0; h = t[p++];) h(v, g, s, u);
							if(i) {
								if(m > 0)
									for(; y--;) v[y] || g[y] || (g[y] = V.call(l));
								g = d(g)
							}
							Y.apply(l, g), b && !i && g.length > 0 && m + t.length > 1 && a.uniqueSort(l)
						}
						return b && (R = C, S = x), v
					};
				return r ? i(s) : s
			}

			function y(e, t, n) {
				for(var r = 0, i = t.length; r < i; r++) a(e, t[r], n);
				return n
			}

			function v(e, t, n, r) {
				var i, o, a, s, u, f = l(e);
				if(!r && 1 === f.length) {
					if((o = f[0] = f[0].slice(0)).length > 2 && "ID" === (a = o[0]).type && 9 === t.nodeType && !L && T.relative[o[1].type]) {
						if(!(t = T.find.ID(a.matches[0].replace(me, ye), t)[0])) return n;
						e = e.slice(o.shift().value.length)
					}
					for(i = ue.needsContext.test(e) ? 0 : o.length; i-- && (a = o[i], !T.relative[s = a.type]);)
						if((u = T.find[s]) && (r = u(a.matches[0].replace(me, ye), le.test(o[0].type) && t.parentNode || t))) {
							if(o.splice(i, 1), !(e = r.length && c(o))) return Y.apply(n, J.call(r, 0)), n;
							break
						}
				}
				return k(e, f)(r, t, L, n, le.test(e)), n
			}

			function b() {}
			var x, w, T, N, C, k, E, S, A, j, D, L, H, q, M, _, F, O = "sizzle" + -new Date,
				B = e.document,
				P = {},
				R = 0,
				W = 0,
				$ = r(),
				I = r(),
				z = r(),
				X = 1 << 31,
				U = [],
				V = U.pop,
				Y = U.push,
				J = U.slice,
				G = U.indexOf || function(e) {
					for(var t = 0, n = this.length; t < n; t++)
						if(this[t] === e) return t;
					return -1
				},
				Q = "[\\x20\\t\\r\\n\\f]",
				K = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
				Z = K.replace("w", "w#"),
				ee = "\\[" + Q + "*(" + K + ")" + Q + "*(?:([*^$|!~]?=)" + Q + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + Z + ")|)|)" + Q + "*\\]",
				te = ":(" + K + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + ee.replace(3, 8) + ")*)|.*)\\)|)",
				ne = new RegExp("^" + Q + "+|((?:^|[^\\\\])(?:\\\\.)*)" + Q + "+$", "g"),
				re = new RegExp("^" + Q + "*," + Q + "*"),
				ie = new RegExp("^" + Q + "*([\\x20\\t\\r\\n\\f>+~])" + Q + "*"),
				oe = new RegExp(te),
				se = new RegExp("^" + Z + "$"),
				ue = {
					ID: new RegExp("^#(" + K + ")"),
					CLASS: new RegExp("^\\.(" + K + ")"),
					NAME: new RegExp("^\\[name=['\"]?(" + K + ")['\"]?\\]"),
					TAG: new RegExp("^(" + K.replace("w", "w*") + ")"),
					ATTR: new RegExp("^" + ee),
					PSEUDO: new RegExp("^" + te),
					CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + Q + "*(even|odd|(([+-]|)(\\d*)n|)" + Q + "*(?:([+-]|)" + Q + "*(\\d+)|))" + Q + "*\\)|)", "i"),
					needsContext: new RegExp("^" + Q + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + Q + "*((?:-\\d)?\\d*)" + Q + "*\\)|)(?=[^-]|$)", "i")
				},
				le = /[\x20\t\r\n\f]*[+~]/,
				ce = /^[^{]+\{\s*\[native code/,
				fe = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
				pe = /^(?:input|select|textarea|button)$/i,
				de = /^h\d$/i,
				he = /'|\\/g,
				ge = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
				me = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,
				ye = function(e, t) {
					var n = "0x" + t - 65536;
					return n !== n ? t : n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320)
				};
			try {
				J.call(B.documentElement.childNodes, 0)[0].nodeType
			} catch(e) {
				J = function(e) {
					for(var t, n = []; t = this[e++];) n.push(t);
					return n
				}
			}
			C = a.isXML = function(e) {
				var t = e && (e.ownerDocument || e).documentElement;
				return !!t && "HTML" !== t.nodeName
			}, A = a.setDocument = function(e) {
				var t = e ? e.ownerDocument || e : B;
				return t !== j && 9 === t.nodeType && t.documentElement ? (j = t, D = t.documentElement, L = C(t), P.tagNameNoComments = o(function(e) {
					return e.appendChild(t.createComment("")), !e.getElementsByTagName("*").length
				}), P.attributes = o(function(e) {
					e.innerHTML = "<select></select>";
					var t = typeof e.lastChild.getAttribute("multiple");
					return "boolean" !== t && "string" !== t
				}), P.getByClassName = o(function(e) {
					return e.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", !(!e.getElementsByClassName || !e.getElementsByClassName("e").length) && (e.lastChild.className = "e", 2 === e.getElementsByClassName("e").length)
				}), P.getByName = o(function(e) {
					e.id = O + 0, e.innerHTML = "<a name='" + O + "'></a><div name='" + O + "'></div>", D.insertBefore(e, D.firstChild);
					var n = t.getElementsByName && t.getElementsByName(O).length === 2 + t.getElementsByName(O + 0).length;
					return P.getIdNotName = !t.getElementById(O), D.removeChild(e), n
				}), T.attrHandle = o(function(e) {
					return e.innerHTML = "<a href='#'></a>", e.firstChild && void 0 !== e.firstChild.getAttribute && "#" === e.firstChild.getAttribute("href")
				}) ? {} : {
					href: function(e) {
						return e.getAttribute("href", 2)
					},
					type: function(e) {
						return e.getAttribute("type")
					}
				}, P.getIdNotName ? (T.find.ID = function(e, t) {
					if(void 0 !== t.getElementById && !L) {
						var n = t.getElementById(e);
						return n && n.parentNode ? [n] : []
					}
				}, T.filter.ID = function(e) {
					var t = e.replace(me, ye);
					return function(e) {
						return e.getAttribute("id") === t
					}
				}) : (T.find.ID = function(e, t) {
					if(void 0 !== t.getElementById && !L) {
						var n = t.getElementById(e);
						return n ? n.id === e || void 0 !== n.getAttributeNode && n.getAttributeNode("id").value === e ? [n] : void 0 : []
					}
				}, T.filter.ID = function(e) {
					var t = e.replace(me, ye);
					return function(e) {
						var n = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
						return n && n.value === t
					}
				}), T.find.TAG = P.tagNameNoComments ? function(e, t) {
					if(void 0 !== t.getElementsByTagName) return t.getElementsByTagName(e)
				} : function(e, t) {
					var n, r = [],
						i = 0,
						o = t.getElementsByTagName(e);
					if("*" === e) {
						for(; n = o[i++];) 1 === n.nodeType && r.push(n);
						return r
					}
					return o
				}, T.find.NAME = P.getByName && function(e, t) {
					if(void 0 !== t.getElementsByName) return t.getElementsByName(name)
				}, T.find.CLASS = P.getByClassName && function(e, t) {
					if(void 0 !== t.getElementsByClassName && !L) return t.getElementsByClassName(e)
				}, q = [], H = [":focus"], (P.qsa = n(t.querySelectorAll)) && (o(function(e) {
					e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || H.push("\\[" + Q + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), e.querySelectorAll(":checked").length || H.push(":checked")
				}), o(function(e) {
					e.innerHTML = "<input type='hidden' i=''/>", e.querySelectorAll("[i^='']").length && H.push("[*^$]=" + Q + "*(?:\"\"|'')"), e.querySelectorAll(":enabled").length || H.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), H.push(",.*:")
				})), (P.matchesSelector = n(M = D.matchesSelector || D.mozMatchesSelector || D.webkitMatchesSelector || D.oMatchesSelector || D.msMatchesSelector)) && o(function(e) {
					P.disconnectedMatch = M.call(e, "div"), M.call(e, "[s!='']:x"), q.push("!=", te)
				}), H = new RegExp(H.join("|")), q = new RegExp(q.join("|")), _ = n(D.contains) || D.compareDocumentPosition ? function(e, t) {
					var n = 9 === e.nodeType ? e.documentElement : e,
						r = t && t.parentNode;
					return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
				} : function(e, t) {
					if(t)
						for(; t = t.parentNode;)
							if(t === e) return !0;
					return !1
				}, F = D.compareDocumentPosition ? function(e, n) {
					var r;
					return e === n ? (E = !0, 0) : (r = n.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(n)) ? 1 & r || e.parentNode && 11 === e.parentNode.nodeType ? e === t || _(B, e) ? -1 : n === t || _(B, n) ? 1 : 0 : 4 & r ? -1 : 1 : e.compareDocumentPosition ? -1 : 1
				} : function(e, n) {
					var r, i = 0,
						o = e.parentNode,
						a = n.parentNode,
						u = [e],
						l = [n];
					if(e === n) return E = !0, 0;
					if(!o || !a) return e === t ? -1 : n === t ? 1 : o ? -1 : a ? 1 : 0;
					if(o === a) return s(e, n);
					for(r = e; r = r.parentNode;) u.unshift(r);
					for(r = n; r = r.parentNode;) l.unshift(r);
					for(; u[i] === l[i];) i++;
					return i ? s(u[i], l[i]) : u[i] === B ? -1 : l[i] === B ? 1 : 0
				}, E = !1, [0, 0].sort(F), P.detectDuplicates = E, j) : j
			}, a.matches = function(e, t) {
				return a(e, null, null, t)
			}, a.matchesSelector = function(e, t) {
				if((e.ownerDocument || e) !== j && A(e), t = t.replace(ge, "='$1']"), P.matchesSelector && !L && (!q || !q.test(t)) && !H.test(t)) try {
					var n = M.call(e, t);
					if(n || P.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n
				} catch(e) {}
				return a(t, j, null, [e]).length > 0
			}, a.contains = function(e, t) {
				return(e.ownerDocument || e) !== j && A(e), _(e, t)
			}, a.attr = function(e, t) {
				var n;
				return(e.ownerDocument || e) !== j && A(e), L || (t = t.toLowerCase()), (n = T.attrHandle[t]) ? n(e) : L || P.attributes ? e.getAttribute(t) : ((n = e.getAttributeNode(t)) || e.getAttribute(t)) && !0 === e[t] ? t : n && n.specified ? n.value : null
			}, a.error = function(e) {
				throw new Error("Syntax error, unrecognized expression: " + e)
			}, a.uniqueSort = function(e) {
				var t, n = [],
					r = 1,
					i = 0;
				if(E = !P.detectDuplicates, e.sort(F), E) {
					for(; t = e[r]; r++) t === e[r - 1] && (i = n.push(r));
					for(; i--;) e.splice(n[i], 1)
				}
				return e
			}, N = a.getText = function(e) {
				var t, n = "",
					r = 0,
					i = e.nodeType;
				if(i) {
					if(1 === i || 9 === i || 11 === i) {
						if("string" == typeof e.textContent) return e.textContent;
						for(e = e.firstChild; e; e = e.nextSibling) n += N(e)
					} else if(3 === i || 4 === i) return e.nodeValue
				} else
					for(; t = e[r]; r++) n += N(t);
				return n
			}, T = a.selectors = {
				cacheLength: 50,
				createPseudo: i,
				match: ue,
				find: {},
				relative: {
					">": {
						dir: "parentNode",
						first: !0
					},
					" ": {
						dir: "parentNode"
					},
					"+": {
						dir: "previousSibling",
						first: !0
					},
					"~": {
						dir: "previousSibling"
					}
				},
				preFilter: {
					ATTR: function(e) {
						return e[1] = e[1].replace(me, ye), e[3] = (e[4] || e[5] || "").replace(me, ye), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
					},
					CHILD: function(e) {
						return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || a.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && a.error(e[0]), e
					},
					PSEUDO: function(e) {
						var t, n = !e[5] && e[2];
						return ue.CHILD.test(e[0]) ? null : (e[4] ? e[2] = e[4] : n && oe.test(n) && (t = l(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
					}
				},
				filter: {
					TAG: function(e) {
						return "*" === e ? function() {
							return !0
						} : (e = e.replace(me, ye).toLowerCase(), function(t) {
							return t.nodeName && t.nodeName.toLowerCase() === e
						})
					},
					CLASS: function(e) {
						var t = $[e + " "];
						return t || (t = new RegExp("(^|" + Q + ")" + e + "(" + Q + "|$)")) && $(e, function(e) {
							return t.test(e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "")
						})
					},
					ATTR: function(e, t, n) {
						return function(r) {
							var i = a.attr(r, e);
							return null == i ? "!=" === t : !t || (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? (" " + i + " ").indexOf(n) > -1 : "|=" === t && (i === n || i.slice(0, n.length + 1) === n + "-"))
						}
					},
					CHILD: function(e, t, n, r, i) {
						var o = "nth" !== e.slice(0, 3),
							a = "last" !== e.slice(-4),
							s = "of-type" === t;
						return 1 === r && 0 === i ? function(e) {
							return !!e.parentNode
						} : function(t, n, u) {
							var l, c, f, p, d, h, g = o !== a ? "nextSibling" : "previousSibling",
								m = t.parentNode,
								y = s && t.nodeName.toLowerCase(),
								v = !u && !s;
							if(m) {
								if(o) {
									for(; g;) {
										for(f = t; f = f[g];)
											if(s ? f.nodeName.toLowerCase() === y : 1 === f.nodeType) return !1;
										h = g = "only" === e && !h && "nextSibling"
									}
									return !0
								}
								if(h = [a ? m.firstChild : m.lastChild], a && v) {
									for(d = (l = (c = m[O] || (m[O] = {}))[e] || [])[0] === R && l[1], p = l[0] === R && l[2], f = d && m.childNodes[d]; f = ++d && f && f[g] || (p = d = 0) || h.pop();)
										if(1 === f.nodeType && ++p && f === t) {
											c[e] = [R, d, p];
											break
										}
								} else if(v && (l = (t[O] || (t[O] = {}))[e]) && l[0] === R) p = l[1];
								else
									for(;
										(f = ++d && f && f[g] || (p = d = 0) || h.pop()) && ((s ? f.nodeName.toLowerCase() !== y : 1 !== f.nodeType) || !++p || (v && ((f[O] || (f[O] = {}))[e] = [R, p]), f !== t)););
								return(p -= i) === r || p % r == 0 && p / r >= 0
							}
						}
					},
					PSEUDO: function(e, t) {
						var n, r = T.pseudos[e] || T.setFilters[e.toLowerCase()] || a.error("unsupported pseudo: " + e);
						return r[O] ? r(t) : r.length > 1 ? (n = [e, e, "", t], T.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function(e, n) {
							for(var i, o = r(e, t), a = o.length; a--;) e[i = G.call(e, o[a])] = !(n[i] = o[a])
						}) : function(e) {
							return r(e, 0, n)
						}) : r
					}
				},
				pseudos: {
					not: i(function(e) {
						var t = [],
							n = [],
							r = k(e.replace(ne, "$1"));
						return r[O] ? i(function(e, t, n, i) {
							for(var o, a = r(e, null, i, []), s = e.length; s--;)(o = a[s]) && (e[s] = !(t[s] = o))
						}) : function(e, i, o) {
							return t[0] = e, r(t, null, o, n), !n.pop()
						}
					}),
					has: i(function(e) {
						return function(t) {
							return a(e, t).length > 0
						}
					}),
					contains: i(function(e) {
						return function(t) {
							return(t.textContent || t.innerText || N(t)).indexOf(e) > -1
						}
					}),
					lang: i(function(e) {
						return se.test(e || "") || a.error("unsupported lang: " + e), e = e.replace(me, ye).toLowerCase(),
							function(t) {
								var n;
								do {
									if(n = L ? t.getAttribute("xml:lang") || t.getAttribute("lang") : t.lang) return(n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-")
								} while ((t = t.parentNode) && 1 === t.nodeType);
								return !1
							}
					}),
					target: function(t) {
						var n = e.location && e.location.hash;
						return n && n.slice(1) === t.id
					},
					root: function(e) {
						return e === D
					},
					focus: function(e) {
						return e === j.activeElement && (!j.hasFocus || j.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
					},
					enabled: function(e) {
						return !1 === e.disabled
					},
					disabled: function(e) {
						return !0 === e.disabled
					},
					checked: function(e) {
						var t = e.nodeName.toLowerCase();
						return "input" === t && !!e.checked || "option" === t && !!e.selected
					},
					selected: function(e) {
						return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
					},
					empty: function(e) {
						for(e = e.firstChild; e; e = e.nextSibling)
							if(e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType) return !1;
						return !0
					},
					parent: function(e) {
						return !T.pseudos.empty(e)
					},
					header: function(e) {
						return de.test(e.nodeName)
					},
					input: function(e) {
						return pe.test(e.nodeName)
					},
					button: function(e) {
						var t = e.nodeName.toLowerCase();
						return "input" === t && "button" === e.type || "button" === t
					},
					text: function(e) {
						var t;
						return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || t.toLowerCase() === e.type)
					},
					first: u(function() {
						return [0]
					}),
					last: u(function(e, t) {
						return [t - 1]
					}),
					eq: u(function(e, t, n) {
						return [n < 0 ? n + t : n]
					}),
					even: u(function(e, t) {
						for(var n = 0; n < t; n += 2) e.push(n);
						return e
					}),
					odd: u(function(e, t) {
						for(var n = 1; n < t; n += 2) e.push(n);
						return e
					}),
					lt: u(function(e, t, n) {
						for(var r = n < 0 ? n + t : n; --r >= 0;) e.push(r);
						return e
					}),
					gt: u(function(e, t, n) {
						for(var r = n < 0 ? n + t : n; ++r < t;) e.push(r);
						return e
					})
				}
			};
			for(x in {
					radio: !0,
					checkbox: !0,
					file: !0,
					password: !0,
					image: !0
				}) T.pseudos[x] = function(e) {
				return function(t) {
					return "input" === t.nodeName.toLowerCase() && t.type === e
				}
			}(x);
			for(x in {
					submit: !0,
					reset: !0
				}) T.pseudos[x] = function(e) {
				return function(t) {
					var n = t.nodeName.toLowerCase();
					return("input" === n || "button" === n) && t.type === e
				}
			}(x);
			k = a.compile = function(e, t) {
				var n, r = [],
					i = [],
					o = z[e + " "];
				if(!o) {
					for(t || (t = l(e)), n = t.length; n--;)(o = g(t[n]))[O] ? r.push(o) : i.push(o);
					o = z(e, m(i, r))
				}
				return o
			}, T.pseudos.nth = T.pseudos.eq, T.filters = b.prototype = T.pseudos, T.setFilters = new b, A(), a.attr = ae.attr, ae.find = a, ae.expr = a.selectors, ae.expr[":"] = ae.expr.pseudos, ae.unique = a.uniqueSort, ae.text = a.getText, ae.isXMLDoc = a.isXML, ae.contains = a.contains
		}(e);
	var Pe = /Until$/,
		Re = /^(?:parents|prev(?:Until|All))/,
		We = /^.[^:#\[\.,]*$/,
		$e = ae.expr.match.needsContext,
		Ie = {
			children: !0,
			contents: !0,
			next: !0,
			prev: !0
		};
	ae.fn.extend({
		find: function(e) {
			var t, n, r, i = this.length;
			if("string" != typeof e) return r = this, this.pushStack(ae(e).filter(function() {
				for(t = 0; t < i; t++)
					if(ae.contains(r[t], this)) return !0
			}));
			for(n = [], t = 0; t < i; t++) ae.find(e, this[t], n);
			return n = this.pushStack(i > 1 ? ae.unique(n) : n), n.selector = (this.selector ? this.selector + " " : "") + e, n
		},
		has: function(e) {
			var t, n = ae(e, this),
				r = n.length;
			return this.filter(function() {
				for(t = 0; t < r; t++)
					if(ae.contains(this, n[t])) return !0
			})
		},
		not: function(e) {
			return this.pushStack(f(this, e, !1))
		},
		filter: function(e) {
			return this.pushStack(f(this, e, !0))
		},
		is: function(e) {
			return !!e && ("string" == typeof e ? $e.test(e) ? ae(e, this.context).index(this[0]) >= 0 : ae.filter(e, this).length > 0 : this.filter(e).length > 0)
		},
		closest: function(e, t) {
			for(var n, r = 0, i = this.length, o = [], a = $e.test(e) || "string" != typeof e ? ae(e, t || this.context) : 0; r < i; r++)
				for(n = this[r]; n && n.ownerDocument && n !== t && 11 !== n.nodeType;) {
					if(a ? a.index(n) > -1 : ae.find.matchesSelector(n, e)) {
						o.push(n);
						break
					}
					n = n.parentNode
				}
			return this.pushStack(o.length > 1 ? ae.unique(o) : o)
		},
		index: function(e) {
			return e ? "string" == typeof e ? ae.inArray(this[0], ae(e)) : ae.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
		},
		add: function(e, t) {
			var n = "string" == typeof e ? ae(e, t) : ae.makeArray(e && e.nodeType ? [e] : e),
				r = ae.merge(this.get(), n);
			return this.pushStack(ae.unique(r))
		},
		addBack: function(e) {
			return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
		}
	}), ae.fn.andSelf = ae.fn.addBack, ae.each({
		parent: function(e) {
			var t = e.parentNode;
			return t && 11 !== t.nodeType ? t : null
		},
		parents: function(e) {
			return ae.dir(e, "parentNode")
		},
		parentsUntil: function(e, t, n) {
			return ae.dir(e, "parentNode", n)
		},
		next: function(e) {
			return c(e, "nextSibling")
		},
		prev: function(e) {
			return c(e, "previousSibling")
		},
		nextAll: function(e) {
			return ae.dir(e, "nextSibling")
		},
		prevAll: function(e) {
			return ae.dir(e, "previousSibling")
		},
		nextUntil: function(e, t, n) {
			return ae.dir(e, "nextSibling", n)
		},
		prevUntil: function(e, t, n) {
			return ae.dir(e, "previousSibling", n)
		},
		siblings: function(e) {
			return ae.sibling((e.parentNode || {}).firstChild, e)
		},
		children: function(e) {
			return ae.sibling(e.firstChild)
		},
		contents: function(e) {
			return ae.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : ae.merge([], e.childNodes)
		}
	}, function(e, t) {
		ae.fn[e] = function(n, r) {
			var i = ae.map(this, t, n);
			return Pe.test(e) || (r = n), r && "string" == typeof r && (i = ae.filter(r, i)), i = this.length > 1 && !Ie[e] ? ae.unique(i) : i, this.length > 1 && Re.test(e) && (i = i.reverse()), this.pushStack(i)
		}
	}), ae.extend({
		filter: function(e, t, n) {
			return n && (e = ":not(" + e + ")"), 1 === t.length ? ae.find.matchesSelector(t[0], e) ? [t[0]] : [] : ae.find.matches(e, t)
		},
		dir: function(e, n, r) {
			for(var i = [], o = e[n]; o && 9 !== o.nodeType && (r === t || 1 !== o.nodeType || !ae(o).is(r));) 1 === o.nodeType && i.push(o), o = o[n];
			return i
		},
		sibling: function(e, t) {
			for(var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
			return n
		}
	});
	var ze = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
		Xe = / jQuery\d+="(?:null|\d+)"/g,
		Ue = new RegExp("<(?:" + ze + ")[\\s/>]", "i"),
		Ve = /^\s+/,
		Ye = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
		Je = /<([\w:]+)/,
		Ge = /<tbody/i,
		Qe = /<|&#?\w+;/,
		Ke = /<(?:script|style|link)/i,
		Ze = /^(?:checkbox|radio)$/i,
		et = /checked\s*(?:[^=]|=\s*.checked.)/i,
		tt = /^$|\/(?:java|ecma)script/i,
		nt = /^true\/(.*)/,
		rt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
		it = {
			option: [1, "<select multiple='multiple'>", "</select>"],
			legend: [1, "<fieldset>", "</fieldset>"],
			area: [1, "<map>", "</map>"],
			param: [1, "<object>", "</object>"],
			thead: [1, "<table>", "</table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
			_default: ae.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
		},
		ot = p(V).appendChild(V.createElement("div"));
	it.optgroup = it.option, it.tbody = it.tfoot = it.colgroup = it.caption = it.thead, it.th = it.td, ae.fn.extend({
		text: function(e) {
			return ae.access(this, function(e) {
				return e === t ? ae.text(this) : this.empty().append((this[0] && this[0].ownerDocument || V).createTextNode(e))
			}, null, e, arguments.length)
		},
		wrapAll: function(e) {
			if(ae.isFunction(e)) return this.each(function(t) {
				ae(this).wrapAll(e.call(this, t))
			});
			if(this[0]) {
				var t = ae(e, this[0].ownerDocument).eq(0).clone(!0);
				this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
					for(var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
					return e
				}).append(this)
			}
			return this
		},
		wrapInner: function(e) {
			return ae.isFunction(e) ? this.each(function(t) {
				ae(this).wrapInner(e.call(this, t))
			}) : this.each(function() {
				var t = ae(this),
					n = t.contents();
				n.length ? n.wrapAll(e) : t.append(e)
			})
		},
		wrap: function(e) {
			var t = ae.isFunction(e);
			return this.each(function(n) {
				ae(this).wrapAll(t ? e.call(this, n) : e)
			})
		},
		unwrap: function() {
			return this.parent().each(function() {
				ae.nodeName(this, "body") || ae(this).replaceWith(this.childNodes)
			}).end()
		},
		append: function() {
			return this.domManip(arguments, !0, function(e) {
				1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || this.appendChild(e)
			})
		},
		prepend: function() {
			return this.domManip(arguments, !0, function(e) {
				1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || this.insertBefore(e, this.firstChild)
			})
		},
		before: function() {
			return this.domManip(arguments, !1, function(e) {
				this.parentNode && this.parentNode.insertBefore(e, this)
			})
		},
		after: function() {
			return this.domManip(arguments, !1, function(e) {
				this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
			})
		},
		remove: function(e, t) {
			for(var n, r = 0; null != (n = this[r]); r++)(!e || ae.filter(e, [n]).length > 0) && (t || 1 !== n.nodeType || ae.cleanData(b(n)), n.parentNode && (t && ae.contains(n.ownerDocument, n) && m(b(n, "script")), n.parentNode.removeChild(n)));
			return this
		},
		empty: function() {
			for(var e, t = 0; null != (e = this[t]); t++) {
				for(1 === e.nodeType && ae.cleanData(b(e, !1)); e.firstChild;) e.removeChild(e.firstChild);
				e.options && ae.nodeName(e, "select") && (e.options.length = 0)
			}
			return this
		},
		clone: function(e, t) {
			return e = null != e && e, t = null == t ? e : t, this.map(function() {
				return ae.clone(this, e, t)
			})
		},
		html: function(e) {
			return ae.access(this, function(e) {
				var n = this[0] || {},
					r = 0,
					i = this.length;
				if(e === t) return 1 === n.nodeType ? n.innerHTML.replace(Xe, "") : t;
				if("string" == typeof e && !Ke.test(e) && (ae.support.htmlSerialize || !Ue.test(e)) && (ae.support.leadingWhitespace || !Ve.test(e)) && !it[(Je.exec(e) || ["", ""])[1].toLowerCase()]) {
					e = e.replace(Ye, "<$1></$2>");
					try {
						for(; r < i; r++) 1 === (n = this[r] || {}).nodeType && (ae.cleanData(b(n, !1)), n.innerHTML = e);
						n = 0
					} catch(e) {}
				}
				n && this.empty().append(e)
			}, null, e, arguments.length)
		},
		replaceWith: function(e) {
			return ae.isFunction(e) || "string" == typeof e || (e = ae(e).not(this).detach()), this.domManip([e], !0, function(e) {
				var t = this.nextSibling,
					n = this.parentNode;
				n && (ae(this).remove(), n.insertBefore(e, t))
			})
		},
		detach: function(e) {
			return this.remove(e, !0)
		},
		domManip: function(e, n, r) {
			e = Z.apply([], e);
			var i, o, a, s, u, l, c = 0,
				f = this.length,
				p = this,
				m = f - 1,
				y = e[0],
				v = ae.isFunction(y);
			if(v || !(f <= 1 || "string" != typeof y || ae.support.checkClone) && et.test(y)) return this.each(function(i) {
				var o = p.eq(i);
				v && (e[0] = y.call(this, i, n ? o.html() : t)), o.domManip(e, n, r)
			});
			if(f && (l = ae.buildFragment(e, this[0].ownerDocument, !1, this), i = l.firstChild, 1 === l.childNodes.length && (l = i), i)) {
				for(n = n && ae.nodeName(i, "tr"), a = (s = ae.map(b(l, "script"), h)).length; c < f; c++) o = l, c !== m && (o = ae.clone(o, !0, !0), a && ae.merge(s, b(o, "script"))), r.call(n && ae.nodeName(this[c], "table") ? d(this[c], "tbody") : this[c], o, c);
				if(a)
					for(u = s[s.length - 1].ownerDocument, ae.map(s, g), c = 0; c < a; c++) o = s[c], tt.test(o.type || "") && !ae._data(o, "globalEval") && ae.contains(u, o) && (o.src ? ae.ajax({
						url: o.src,
						type: "GET",
						dataType: "script",
						async: !1,
						global: !1,
						throws: !0
					}) : ae.globalEval((o.text || o.textContent || o.innerHTML || "").replace(rt, "")));
				l = i = null
			}
			return this
		}
	}), ae.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function(e, t) {
		ae.fn[e] = function(e) {
			for(var n, r = 0, i = [], o = ae(e), a = o.length - 1; r <= a; r++) n = r === a ? this : this.clone(!0), ae(o[r])[t](n), ee.apply(i, n.get());
			return this.pushStack(i)
		}
	}), ae.extend({
		clone: function(e, t, n) {
			var r, i, o, a, s, u = ae.contains(e.ownerDocument, e);
			if(ae.support.html5Clone || ae.isXMLDoc(e) || !Ue.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (ot.innerHTML = e.outerHTML, ot.removeChild(o = ot.firstChild)), !(ae.support.noCloneEvent && ae.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || ae.isXMLDoc(e)))
				for(r = b(o), s = b(e), a = 0; null != (i = s[a]); ++a) r[a] && v(i, r[a]);
			if(t)
				if(n)
					for(s = s || b(e), r = r || b(o), a = 0; null != (i = s[a]); a++) y(i, r[a]);
				else y(e, o);
			return(r = b(o, "script")).length > 0 && m(r, !u && b(e, "script")), r = s = i = null, o
		},
		buildFragment: function(e, t, n, r) {
			for(var i, o, a, s, u, l, c, f = e.length, d = p(t), h = [], g = 0; g < f; g++)
				if((o = e[g]) || 0 === o)
					if("object" === ae.type(o)) ae.merge(h, o.nodeType ? [o] : o);
					else if(Qe.test(o)) {
				for(s = s || d.appendChild(t.createElement("div")), u = (Je.exec(o) || ["", ""])[1].toLowerCase(), c = it[u] || it._default, s.innerHTML = c[1] + o.replace(Ye, "<$1></$2>") + c[2], i = c[0]; i--;) s = s.lastChild;
				if(!ae.support.leadingWhitespace && Ve.test(o) && h.push(t.createTextNode(Ve.exec(o)[0])), !ae.support.tbody)
					for(i = (o = "table" !== u || Ge.test(o) ? "<table>" !== c[1] || Ge.test(o) ? 0 : s : s.firstChild) && o.childNodes.length; i--;) ae.nodeName(l = o.childNodes[i], "tbody") && !l.childNodes.length && o.removeChild(l);
				for(ae.merge(h, s.childNodes), s.textContent = ""; s.firstChild;) s.removeChild(s.firstChild);
				s = d.lastChild
			} else h.push(t.createTextNode(o));
			for(s && d.removeChild(s), ae.support.appendChecked || ae.grep(b(h, "input"), x), g = 0; o = h[g++];)
				if((!r || -1 === ae.inArray(o, r)) && (a = ae.contains(o.ownerDocument, o), s = b(d.appendChild(o), "script"), a && m(s), n))
					for(i = 0; o = s[i++];) tt.test(o.type || "") && n.push(o);
			return s = null, d
		},
		cleanData: function(e, t) {
			for(var n, r, i, o, a = 0, s = ae.expando, u = ae.cache, l = ae.support.deleteExpando, c = ae.event.special; null != (n = e[a]); a++)
				if((t || ae.acceptData(n)) && (i = n[s], o = i && u[i])) {
					if(o.events)
						for(r in o.events) c[r] ? ae.event.remove(n, r) : ae.removeEvent(n, r, o.handle);
					u[i] && (delete u[i], l ? delete n[s] : typeof n.removeAttribute !== U ? n.removeAttribute(s) : n[s] = null, K.push(i))
				}
		}
	});
	var at, st, ut, lt = /alpha\([^)]*\)/i,
		ct = /opacity\s*=\s*([^)]*)/,
		ft = /^(top|right|bottom|left)$/,
		pt = /^(none|table(?!-c[ea]).+)/,
		dt = /^margin/,
		ht = new RegExp("^(" + se + ")(.*)$", "i"),
		gt = new RegExp("^(" + se + ")(?!px)[a-z%]+$", "i"),
		mt = new RegExp("^([+-])=(" + se + ")", "i"),
		yt = {
			BODY: "block"
		},
		vt = {
			position: "absolute",
			visibility: "hidden",
			display: "block"
		},
		bt = {
			letterSpacing: 0,
			fontWeight: 400
		},
		xt = ["Top", "Right", "Bottom", "Left"],
		wt = ["Webkit", "O", "Moz", "ms"];
	ae.fn.extend({
		css: function(e, n) {
			return ae.access(this, function(e, n, r) {
				var i, o, a = {},
					s = 0;
				if(ae.isArray(n)) {
					for(o = st(e), i = n.length; s < i; s++) a[n[s]] = ae.css(e, n[s], !1, o);
					return a
				}
				return r !== t ? ae.style(e, n, r) : ae.css(e, n)
			}, e, n, arguments.length > 1)
		},
		show: function() {
			return N(this, !0)
		},
		hide: function() {
			return N(this)
		},
		toggle: function(e) {
			var t = "boolean" == typeof e;
			return this.each(function() {
				(t ? e : T(this)) ? ae(this).show(): ae(this).hide()
			})
		}
	}), ae.extend({
		cssHooks: {
			opacity: {
				get: function(e, t) {
					if(t) {
						var n = ut(e, "opacity");
						return "" === n ? "1" : n
					}
				}
			}
		},
		cssNumber: {
			columnCount: !0,
			fillOpacity: !0,
			fontWeight: !0,
			lineHeight: !0,
			opacity: !0,
			orphans: !0,
			widows: !0,
			zIndex: !0,
			zoom: !0
		},
		cssProps: {
			float: ae.support.cssFloat ? "cssFloat" : "styleFloat"
		},
		style: function(e, n, r, i) {
			if(e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
				var o, a, s, u = ae.camelCase(n),
					l = e.style;
				if(n = ae.cssProps[u] || (ae.cssProps[u] = w(l, u)), s = ae.cssHooks[n] || ae.cssHooks[u], r === t) return s && "get" in s && (o = s.get(e, !1, i)) !== t ? o : l[n];
				if(!("string" == (a = typeof r) && (o = mt.exec(r)) && (r = (o[1] + 1) * o[2] + parseFloat(ae.css(e, n)), a = "number"), null == r || "number" === a && isNaN(r) || ("number" !== a || ae.cssNumber[u] || (r += "px"), ae.support.clearCloneStyle || "" !== r || 0 !== n.indexOf("background") || (l[n] = "inherit"), s && "set" in s && (r = s.set(e, r, i)) === t))) try {
					l[n] = r
				} catch(e) {}
			}
		},
		css: function(e, n, r, i) {
			var o, a, s, u = ae.camelCase(n);
			return n = ae.cssProps[u] || (ae.cssProps[u] = w(e.style, u)), (s = ae.cssHooks[n] || ae.cssHooks[u]) && "get" in s && (a = s.get(e, !0, r)), a === t && (a = ut(e, n, i)), "normal" === a && n in bt && (a = bt[n]), "" === r || r ? (o = parseFloat(a), !0 === r || ae.isNumeric(o) ? o || 0 : a) : a
		},
		swap: function(e, t, n, r) {
			var i, o, a = {};
			for(o in t) a[o] = e.style[o], e.style[o] = t[o];
			i = n.apply(e, r || []);
			for(o in t) e.style[o] = a[o];
			return i
		}
	}), e.getComputedStyle ? (st = function(t) {
		return e.getComputedStyle(t, null)
	}, ut = function(e, n, r) {
		var i, o, a, s = r || st(e),
			u = s ? s.getPropertyValue(n) || s[n] : t,
			l = e.style;
		return s && ("" !== u || ae.contains(e.ownerDocument, e) || (u = ae.style(e, n)), gt.test(u) && dt.test(n) && (i = l.width, o = l.minWidth, a = l.maxWidth, l.minWidth = l.maxWidth = l.width = u, u = s.width, l.width = i, l.minWidth = o, l.maxWidth = a)), u
	}) : V.documentElement.currentStyle && (st = function(e) {
		return e.currentStyle
	}, ut = function(e, n, r) {
		var i, o, a, s = r || st(e),
			u = s ? s[n] : t,
			l = e.style;
		return null == u && l && l[n] && (u = l[n]), gt.test(u) && !ft.test(n) && (i = l.left, (a = (o = e.runtimeStyle) && o.left) && (o.left = e.currentStyle.left), l.left = "fontSize" === n ? "1em" : u, u = l.pixelLeft + "px", l.left = i, a && (o.left = a)), "" === u ? "auto" : u
	}), ae.each(["height", "width"], function(e, t) {
		ae.cssHooks[t] = {
			get: function(e, n, r) {
				if(n) return 0 === e.offsetWidth && pt.test(ae.css(e, "display")) ? ae.swap(e, vt, function() {
					return E(e, t, r)
				}) : E(e, t, r)
			},
			set: function(e, n, r) {
				var i = r && st(e);
				return C(0, n, r ? k(e, t, r, ae.support.boxSizing && "border-box" === ae.css(e, "boxSizing", !1, i), i) : 0)
			}
		}
	}), ae.support.opacity || (ae.cssHooks.opacity = {
		get: function(e, t) {
			return ct.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
		},
		set: function(e, t) {
			var n = e.style,
				r = e.currentStyle,
				i = ae.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
				o = r && r.filter || n.filter || "";
			n.zoom = 1, (t >= 1 || "" === t) && "" === ae.trim(o.replace(lt, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || r && !r.filter) || (n.filter = lt.test(o) ? o.replace(lt, i) : o + " " + i)
		}
	}), ae(function() {
		ae.support.reliableMarginRight || (ae.cssHooks.marginRight = {
			get: function(e, t) {
				if(t) return ae.swap(e, {
					display: "inline-block"
				}, ut, [e, "marginRight"])
			}
		}), !ae.support.pixelPosition && ae.fn.position && ae.each(["top", "left"], function(e, t) {
			ae.cssHooks[t] = {
				get: function(e, n) {
					if(n) return n = ut(e, t), gt.test(n) ? ae(e).position()[t] + "px" : n
				}
			}
		})
	}), ae.expr && ae.expr.filters && (ae.expr.filters.hidden = function(e) {
		return e.offsetWidth <= 0 && e.offsetHeight <= 0 || !ae.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || ae.css(e, "display"))
	}, ae.expr.filters.visible = function(e) {
		return !ae.expr.filters.hidden(e)
	}), ae.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function(e, t) {
		ae.cssHooks[e + t] = {
			expand: function(n) {
				for(var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; r < 4; r++) i[e + xt[r] + t] = o[r] || o[r - 2] || o[0];
				return i
			}
		}, dt.test(e) || (ae.cssHooks[e + t].set = C)
	});
	var Tt = /%20/g,
		Nt = /\[\]$/,
		Ct = /\r?\n/g,
		kt = /^(?:submit|button|image|reset|file)$/i,
		Et = /^(?:input|select|textarea|keygen)/i;
	ae.fn.extend({
		serialize: function() {
			return ae.param(this.serializeArray())
		},
		serializeArray: function() {
			return this.map(function() {
				var e = ae.prop(this, "elements");
				return e ? ae.makeArray(e) : this
			}).filter(function() {
				var e = this.type;
				return this.name && !ae(this).is(":disabled") && Et.test(this.nodeName) && !kt.test(e) && (this.checked || !Ze.test(e))
			}).map(function(e, t) {
				var n = ae(this).val();
				return null == n ? null : ae.isArray(n) ? ae.map(n, function(e) {
					return {
						name: t.name,
						value: e.replace(Ct, "\r\n")
					}
				}) : {
					name: t.name,
					value: n.replace(Ct, "\r\n")
				}
			}).get()
		}
	}), ae.param = function(e, n) {
		var r, i = [],
			o = function(e, t) {
				t = ae.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
			};
		if(n === t && (n = ae.ajaxSettings && ae.ajaxSettings.traditional), ae.isArray(e) || e.jquery && !ae.isPlainObject(e)) ae.each(e, function() {
			o(this.name, this.value)
		});
		else
			for(r in e) j(r, e[r], n, o);
		return i.join("&").replace(Tt, "+")
	}, ae.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
		ae.fn[t] = function(e, n) {
			return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
		}
	}), ae.fn.hover = function(e, t) {
		return this.mouseenter(e).mouseleave(t || e)
	};
	var St, At, jt = ae.now(),
		Dt = /\?/,
		Lt = /#.*$/,
		Ht = /([?&])_=[^&]*/,
		qt = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
		Mt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		_t = /^(?:GET|HEAD)$/,
		Ft = /^\/\//,
		Ot = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
		Bt = ae.fn.load,
		Pt = {},
		Rt = {},
		Wt = "*/".concat("*");
	try {
		At = Y.href
	} catch(e) {
		(At = V.createElement("a")).href = "", At = At.href
	}
	St = Ot.exec(At.toLowerCase()) || [], ae.fn.load = function(e, n, r) {
		if("string" != typeof e && Bt) return Bt.apply(this, arguments);
		var i, o, a, s = this,
			u = e.indexOf(" ");
		return u >= 0 && (i = e.slice(u, e.length), e = e.slice(0, u)), ae.isFunction(n) ? (r = n, n = t) : n && "object" == typeof n && (a = "POST"), s.length > 0 && ae.ajax({
			url: e,
			type: a,
			dataType: "html",
			data: n
		}).done(function(e) {
			o = arguments, s.html(i ? ae("<div>").append(ae.parseHTML(e)).find(i) : e)
		}).complete(r && function(e, t) {
			s.each(r, o || [e.responseText, t, e])
		}), this
	}, ae.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
		ae.fn[t] = function(e) {
			return this.on(t, e)
		}
	}), ae.each(["get", "post"], function(e, n) {
		ae[n] = function(e, r, i, o) {
			return ae.isFunction(r) && (o = o || i, i = r, r = t), ae.ajax({
				url: e,
				type: n,
				dataType: o,
				data: r,
				success: i
			})
		}
	}), ae.extend({
		active: 0,
		lastModified: {},
		etag: {},
		ajaxSettings: {
			url: At,
			type: "GET",
			isLocal: Mt.test(St[1]),
			global: !0,
			processData: !0,
			async: !0,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			accepts: {
				"*": Wt,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},
			contents: {
				xml: /xml/,
				html: /html/,
				json: /json/
			},
			responseFields: {
				xml: "responseXML",
				text: "responseText"
			},
			converters: {
				"* text": e.String,
				"text html": !0,
				"text json": ae.parseJSON,
				"text xml": ae.parseXML
			},
			flatOptions: {
				url: !0,
				context: !0
			}
		},
		ajaxSetup: function(e, t) {
			return t ? H(H(e, ae.ajaxSettings), t) : H(ae.ajaxSettings, e)
		},
		ajaxPrefilter: D(Pt),
		ajaxTransport: D(Rt),
		ajax: function(e, n) {
			function r(e, n, r, i) {
				var o, f, v, b, w, N = n;
				2 !== x && (x = 2, u && clearTimeout(u), c = t, s = i || "", T.readyState = e > 0 ? 4 : 0, r && (b = q(p, T, r)), e >= 200 && e < 300 || 304 === e ? (p.ifModified && ((w = T.getResponseHeader("Last-Modified")) && (ae.lastModified[a] = w), (w = T.getResponseHeader("etag")) && (ae.etag[a] = w)), 204 === e ? (o = !0, N = "nocontent") : 304 === e ? (o = !0, N = "notmodified") : (N = (o = M(p, b)).state, f = o.data, o = !(v = o.error))) : (v = N, !e && N || (N = "error", e < 0 && (e = 0))), T.status = e, T.statusText = (n || N) + "", o ? g.resolveWith(d, [f, N, T]) : g.rejectWith(d, [T, N, v]), T.statusCode(y), y = t, l && h.trigger(o ? "ajaxSuccess" : "ajaxError", [T, p, o ? f : v]), m.fireWith(d, [T, N]), l && (h.trigger("ajaxComplete", [T, p]), --ae.active || ae.event.trigger("ajaxStop")))
			}
			"object" == typeof e && (n = e, e = t), n = n || {};
			var i, o, a, s, u, l, c, f, p = ae.ajaxSetup({}, n),
				d = p.context || p,
				h = p.context && (d.nodeType || d.jquery) ? ae(d) : ae.event,
				g = ae.Deferred(),
				m = ae.Callbacks("once memory"),
				y = p.statusCode || {},
				v = {},
				b = {},
				x = 0,
				w = "canceled",
				T = {
					readyState: 0,
					getResponseHeader: function(e) {
						var t;
						if(2 === x) {
							if(!f)
								for(f = {}; t = qt.exec(s);) f[t[1].toLowerCase()] = t[2];
							t = f[e.toLowerCase()]
						}
						return null == t ? null : t
					},
					getAllResponseHeaders: function() {
						return 2 === x ? s : null
					},
					setRequestHeader: function(e, t) {
						var n = e.toLowerCase();
						return x || (e = b[n] = b[n] || e, v[e] = t), this
					},
					overrideMimeType: function(e) {
						return x || (p.mimeType = e), this
					},
					statusCode: function(e) {
						var t;
						if(e)
							if(x < 2)
								for(t in e) y[t] = [y[t], e[t]];
							else T.always(e[T.status]);
						return this
					},
					abort: function(e) {
						var t = e || w;
						return c && c.abort(t), r(0, t), this
					}
				};
			if(g.promise(T).complete = m.add, T.success = T.done, T.error = T.fail, p.url = ((e || p.url || At) + "").replace(Lt, "").replace(Ft, St[1] + "//"), p.type = n.method || n.type || p.method || p.type, p.dataTypes = ae.trim(p.dataType || "*").toLowerCase().match(ue) || [""], null == p.crossDomain && (i = Ot.exec(p.url.toLowerCase()), p.crossDomain = !(!i || i[1] === St[1] && i[2] === St[2] && (i[3] || ("http:" === i[1] ? 80 : 443)) == (St[3] || ("http:" === St[1] ? 80 : 443)))), p.data && p.processData && "string" != typeof p.data && (p.data = ae.param(p.data, p.traditional)), L(Pt, p, n, T), 2 === x) return T;
			(l = p.global) && 0 == ae.active++ && ae.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !_t.test(p.type), a = p.url, p.hasContent || (p.data && (a = p.url += (Dt.test(a) ? "&" : "?") + p.data, delete p.data), !1 === p.cache && (p.url = Ht.test(a) ? a.replace(Ht, "$1_=" + jt++) : a + (Dt.test(a) ? "&" : "?") + "_=" + jt++)), p.ifModified && (ae.lastModified[a] && T.setRequestHeader("If-Modified-Since", ae.lastModified[a]), ae.etag[a] && T.setRequestHeader("If-None-Match", ae.etag[a])), (p.data && p.hasContent && !1 !== p.contentType || n.contentType) && T.setRequestHeader("Content-Type", p.contentType), T.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + Wt + "; q=0.01" : "") : p.accepts["*"]);
			for(o in p.headers) T.setRequestHeader(o, p.headers[o]);
			if(p.beforeSend && (!1 === p.beforeSend.call(d, T, p) || 2 === x)) return T.abort();
			w = "abort";
			for(o in {
					success: 1,
					error: 1,
					complete: 1
				}) T[o](p[o]);
			if(c = L(Rt, p, n, T)) {
				T.readyState = 1, l && h.trigger("ajaxSend", [T, p]), p.async && p.timeout > 0 && (u = setTimeout(function() {
					T.abort("timeout")
				}, p.timeout));
				try {
					x = 1, c.send(v, r)
				} catch(e) {
					if(!(x < 2)) throw e;
					r(-1, e)
				}
			} else r(-1, "No Transport");
			return T
		},
		getScript: function(e, n) {
			return ae.get(e, t, n, "script")
		},
		getJSON: function(e, t, n) {
			return ae.get(e, t, n, "json")
		}
	}), ae.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /(?:java|ecma)script/
		},
		converters: {
			"text script": function(e) {
				return ae.globalEval(e), e
			}
		}
	}), ae.ajaxPrefilter("script", function(e) {
		e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
	}), ae.ajaxTransport("script", function(e) {
		if(e.crossDomain) {
			var n, r = V.head || ae("head")[0] || V.documentElement;
			return {
				send: function(t, i) {
					(n = V.createElement("script")).async = !0, e.scriptCharset && (n.charset = e.scriptCharset), n.src = e.url, n.onload = n.onreadystatechange = function(e, t) {
						(t || !n.readyState || /loaded|complete/.test(n.readyState)) && (n.onload = n.onreadystatechange = null, n.parentNode && n.parentNode.removeChild(n), n = null, t || i(200, "success"))
					}, r.insertBefore(n, r.firstChild)
				},
				abort: function() {
					n && n.onload(t, !0)
				}
			}
		}
	});
	var $t = [],
		It = /(=)\?(?=&|$)|\?\?/;
	ae.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function() {
			var e = $t.pop() || ae.expando + "_" + jt++;
			return this[e] = !0, e
		}
	}), ae.ajaxPrefilter("json jsonp", function(n, r, i) {
		var o, a, s, u = !1 !== n.jsonp && (It.test(n.url) ? "url" : "string" == typeof n.data && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && It.test(n.data) && "data");
		if(u || "jsonp" === n.dataTypes[0]) return o = n.jsonpCallback = ae.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, u ? n[u] = n[u].replace(It, "$1" + o) : !1 !== n.jsonp && (n.url += (Dt.test(n.url) ? "&" : "?") + n.jsonp + "=" + o), n.converters["script json"] = function() {
			return s || ae.error(o + " was not called"), s[0]
		}, n.dataTypes[0] = "json", a = e[o], e[o] = function() {
			s = arguments
		}, i.always(function() {
			e[o] = a, n[o] && (n.jsonpCallback = r.jsonpCallback, $t.push(o)), s && ae.isFunction(a) && a(s[0]), s = a = t
		}), "script"
	});
	var zt, Xt, Ut = 0,
		Vt = e.ActiveXObject && function() {
			var e;
			for(e in zt) zt[e](t, !0)
		};
	ae.ajaxSettings.xhr = e.ActiveXObject ? function() {
		return !this.isLocal && _() || F()
	} : _, Xt = ae.ajaxSettings.xhr(), ae.support.cors = !!Xt && "withCredentials" in Xt, (Xt = ae.support.ajax = !!Xt) && ae.ajaxTransport(function(n) {
		if(!n.crossDomain || ae.support.cors) {
			var r;
			return {
				send: function(i, o) {
					var a, s, u = n.xhr();
					if(n.username ? u.open(n.type, n.url, n.async, n.username, n.password) : u.open(n.type, n.url, n.async), n.xhrFields)
						for(s in n.xhrFields) u[s] = n.xhrFields[s];
					n.mimeType && u.overrideMimeType && u.overrideMimeType(n.mimeType), n.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
					try {
						for(s in i) u.setRequestHeader(s, i[s])
					} catch(e) {}
					u.send(n.hasContent && n.data || null), r = function(e, i) {
						var s, l, c, f;
						try {
							if(r && (i || 4 === u.readyState))
								if(r = t, a && (u.onreadystatechange = ae.noop, Vt && delete zt[a]), i) 4 !== u.readyState && u.abort();
								else {
									f = {}, s = u.status, l = u.getAllResponseHeaders(), "string" == typeof u.responseText && (f.text = u.responseText);
									try {
										c = u.statusText
									} catch(e) {
										c = ""
									}
									s || !n.isLocal || n.crossDomain ? 1223 === s && (s = 204) : s = f.text ? 200 : 404
								}
						} catch(e) {
							i || o(-1, e)
						}
						f && o(s, c, f, l)
					}, n.async ? 4 === u.readyState ? setTimeout(r) : (a = ++Ut, Vt && (zt || (zt = {}, ae(e).unload(Vt)), zt[a] = r), u.onreadystatechange = r) : r()
				},
				abort: function() {
					r && r(t, !0)
				}
			}
		}
	});
	var Yt, Jt, Gt = /^(?:toggle|show|hide)$/,
		Qt = new RegExp("^(?:([+-])=|)(" + se + ")([a-z%]*)$", "i"),
		Kt = /queueHooks$/,
		Zt = [function(e, t, n) {
			var r, i, o, a, s, u, l, c, f, p = this,
				d = e.style,
				h = {},
				g = [],
				m = e.nodeType && T(e);
			n.queue || (null == (c = ae._queueHooks(e, "fx")).unqueued && (c.unqueued = 0, f = c.empty.fire, c.empty.fire = function() {
				c.unqueued || f()
			}), c.unqueued++, p.always(function() {
				p.always(function() {
					c.unqueued--, ae.queue(e, "fx").length || c.empty.fire()
				})
			})), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [d.overflow, d.overflowX, d.overflowY], "inline" === ae.css(e, "display") && "none" === ae.css(e, "float") && (ae.support.inlineBlockNeedsLayout && "inline" !== S(e.nodeName) ? d.zoom = 1 : d.display = "inline-block")), n.overflow && (d.overflow = "hidden", ae.support.shrinkWrapBlocks || p.always(function() {
				d.overflow = n.overflow[0], d.overflowX = n.overflow[1], d.overflowY = n.overflow[2]
			}));
			for(i in t)
				if(a = t[i], Gt.exec(a)) {
					if(delete t[i], u = u || "toggle" === a, a === (m ? "hide" : "show")) continue;
					g.push(i)
				}
			if(o = g.length) {
				"hidden" in (s = ae._data(e, "fxshow") || ae._data(e, "fxshow", {})) && (m = s.hidden), u && (s.hidden = !m), m ? ae(e).show() : p.done(function() {
					ae(e).hide()
				}), p.done(function() {
					var t;
					ae._removeData(e, "fxshow");
					for(t in h) ae.style(e, t, h[t])
				});
				for(i = 0; i < o; i++) r = g[i], l = p.createTween(r, m ? s[r] : 0), h[r] = s[r] || ae.style(e, r), r in s || (s[r] = l.start, m && (l.end = l.start, l.start = "width" === r || "height" === r ? 1 : 0))
			}
		}],
		en = {
			"*": [function(e, t) {
				var n, r, i = this.createTween(e, t),
					o = Qt.exec(t),
					a = i.cur(),
					s = +a || 0,
					u = 1,
					l = 20;
				if(o) {
					if(n = +o[2], "px" !== (r = o[3] || (ae.cssNumber[e] ? "" : "px")) && s) {
						s = ae.css(i.elem, e, !0) || n || 1;
						do {
							s /= u = u || ".5", ae.style(i.elem, e, s + r)
						} while (u !== (u = i.cur() / a) && 1 !== u && --l)
					}
					i.unit = r, i.start = s, i.end = o[1] ? s + (o[1] + 1) * n : n
				}
				return i
			}]
		};
	ae.Animation = ae.extend(P, {
		tweener: function(e, t) {
			ae.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
			for(var n, r = 0, i = e.length; r < i; r++) n = e[r], en[n] = en[n] || [], en[n].unshift(t)
		},
		prefilter: function(e, t) {
			t ? Zt.unshift(e) : Zt.push(e)
		}
	}), ae.Tween = W, W.prototype = {
		constructor: W,
		init: function(e, t, n, r, i, o) {
			this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (ae.cssNumber[n] ? "" : "px")
		},
		cur: function() {
			var e = W.propHooks[this.prop];
			return e && e.get ? e.get(this) : W.propHooks._default.get(this)
		},
		run: function(e) {
			var t, n = W.propHooks[this.prop];
			return this.options.duration ? this.pos = t = ae.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : W.propHooks._default.set(this), this
		}
	}, W.prototype.init.prototype = W.prototype, W.propHooks = {
		_default: {
			get: function(e) {
				var t;
				return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = ae.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0 : e.elem[e.prop]
			},
			set: function(e) {
				ae.fx.step[e.prop] ? ae.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[ae.cssProps[e.prop]] || ae.cssHooks[e.prop]) ? ae.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
			}
		}
	}, W.propHooks.scrollTop = W.propHooks.scrollLeft = {
		set: function(e) {
			e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
		}
	}, ae.each(["toggle", "show", "hide"], function(e, t) {
		var n = ae.fn[t];
		ae.fn[t] = function(e, r, i) {
			return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate($(t, !0), e, r, i)
		}
	}), ae.fn.extend({
		fadeTo: function(e, t, n, r) {
			return this.filter(T).css("opacity", 0).show().end().animate({
				opacity: t
			}, e, n, r)
		},
		animate: function(e, t, n, r) {
			var i = ae.isEmptyObject(e),
				o = ae.speed(t, n, r),
				a = function() {
					var t = P(this, ae.extend({}, e), o);
					a.finish = function() {
						t.stop(!0)
					}, (i || ae._data(this, "finish")) && t.stop(!0)
				};
			return a.finish = a, i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a)
		},
		stop: function(e, n, r) {
			var i = function(e) {
				var t = e.stop;
				delete e.stop, t(r)
			};
			return "string" != typeof e && (r = n, n = e, e = t), n && !1 !== e && this.queue(e || "fx", []), this.each(function() {
				var t = !0,
					n = null != e && e + "queueHooks",
					o = ae.timers,
					a = ae._data(this);
				if(n) a[n] && a[n].stop && i(a[n]);
				else
					for(n in a) a[n] && a[n].stop && Kt.test(n) && i(a[n]);
				for(n = o.length; n--;) o[n].elem !== this || null != e && o[n].queue !== e || (o[n].anim.stop(r), t = !1, o.splice(n, 1));
				!t && r || ae.dequeue(this, e)
			})
		},
		finish: function(e) {
			return !1 !== e && (e = e || "fx"), this.each(function() {
				var t, n = ae._data(this),
					r = n[e + "queue"],
					i = n[e + "queueHooks"],
					o = ae.timers,
					a = r ? r.length : 0;
				for(n.finish = !0, ae.queue(this, e, []), i && i.cur && i.cur.finish && i.cur.finish.call(this), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
				for(t = 0; t < a; t++) r[t] && r[t].finish && r[t].finish.call(this);
				delete n.finish
			})
		}
	}), ae.each({
		slideDown: $("show"),
		slideUp: $("hide"),
		slideToggle: $("toggle"),
		fadeIn: {
			opacity: "show"
		},
		fadeOut: {
			opacity: "hide"
		},
		fadeToggle: {
			opacity: "toggle"
		}
	}, function(e, t) {
		ae.fn[e] = function(e, n, r) {
			return this.animate(t, e, n, r)
		}
	}), ae.speed = function(e, t, n) {
		var r = e && "object" == typeof e ? ae.extend({}, e) : {
			complete: n || !n && t || ae.isFunction(e) && e,
			duration: e,
			easing: n && t || t && !ae.isFunction(t) && t
		};
		return r.duration = ae.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in ae.fx.speeds ? ae.fx.speeds[r.duration] : ae.fx.speeds._default, null != r.queue && !0 !== r.queue || (r.queue = "fx"), r.old = r.complete, r.complete = function() {
			ae.isFunction(r.old) && r.old.call(this), r.queue && ae.dequeue(this, r.queue)
		}, r
	}, ae.easing = {
		linear: function(e) {
			return e
		},
		swing: function(e) {
			return .5 - Math.cos(e * Math.PI) / 2
		}
	}, ae.timers = [], ae.fx = W.prototype.init, ae.fx.tick = function() {
		var e, n = ae.timers,
			r = 0;
		for(Yt = ae.now(); r < n.length; r++)(e = n[r])() || n[r] !== e || n.splice(r--, 1);
		n.length || ae.fx.stop(), Yt = t
	}, ae.fx.timer = function(e) {
		e() && ae.timers.push(e) && ae.fx.start()
	}, ae.fx.interval = 13, ae.fx.start = function() {
		Jt || (Jt = setInterval(ae.fx.tick, ae.fx.interval))
	}, ae.fx.stop = function() {
		clearInterval(Jt), Jt = null
	}, ae.fx.speeds = {
		slow: 600,
		fast: 200,
		_default: 400
	}, ae.fx.step = {}, ae.expr && ae.expr.filters && (ae.expr.filters.animated = function(e) {
		return ae.grep(ae.timers, function(t) {
			return e === t.elem
		}).length
	}), ae.fn.offset = function(e) {
		if(arguments.length) return e === t ? this : this.each(function(t) {
			ae.offset.setOffset(this, e, t)
		});
		var n, r, i = {
				top: 0,
				left: 0
			},
			o = this[0],
			a = o && o.ownerDocument;
		if(a) return n = a.documentElement, ae.contains(n, o) ? (typeof o.getBoundingClientRect !== U && (i = o.getBoundingClientRect()), r = I(a), {
			top: i.top + (r.pageYOffset || n.scrollTop) - (n.clientTop || 0),
			left: i.left + (r.pageXOffset || n.scrollLeft) - (n.clientLeft || 0)
		}) : i
	}, ae.offset = {
		setOffset: function(e, t, n) {
			var r = ae.css(e, "position");
			"static" === r && (e.style.position = "relative");
			var i, o, a = ae(e),
				s = a.offset(),
				u = ae.css(e, "top"),
				l = ae.css(e, "left"),
				c = {},
				f = {};
			("absolute" === r || "fixed" === r) && ae.inArray("auto", [u, l]) > -1 ? (i = (f = a.position()).top, o = f.left) : (i = parseFloat(u) || 0, o = parseFloat(l) || 0), ae.isFunction(t) && (t = t.call(e, n, s)), null != t.top && (c.top = t.top - s.top + i), null != t.left && (c.left = t.left - s.left + o), "using" in t ? t.using.call(e, c) : a.css(c)
		}
	}, ae.fn.extend({
		position: function() {
			if(this[0]) {
				var e, t, n = {
						top: 0,
						left: 0
					},
					r = this[0];
				return "fixed" === ae.css(r, "position") ? t = r.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), ae.nodeName(e[0], "html") || (n = e.offset()), n.top += ae.css(e[0], "borderTopWidth", !0), n.left += ae.css(e[0], "borderLeftWidth", !0)), {
					top: t.top - n.top - ae.css(r, "marginTop", !0),
					left: t.left - n.left - ae.css(r, "marginLeft", !0)
				}
			}
		},
		offsetParent: function() {
			return this.map(function() {
				for(var e = this.offsetParent || V.documentElement; e && !ae.nodeName(e, "html") && "static" === ae.css(e, "position");) e = e.offsetParent;
				return e || V.documentElement
			})
		}
	}), ae.each({
		scrollLeft: "pageXOffset",
		scrollTop: "pageYOffset"
	}, function(e, n) {
		var r = /Y/.test(n);
		ae.fn[e] = function(i) {
			return ae.access(this, function(e, i, o) {
				var a = I(e);
				if(o === t) return a ? n in a ? a[n] : a.document.documentElement[i] : e[i];
				a ? a.scrollTo(r ? ae(a).scrollLeft() : o, r ? o : ae(a).scrollTop()) : e[i] = o
			}, e, i, arguments.length, null)
		}
	}), ae.each({
		Height: "height",
		Width: "width"
	}, function(e, n) {
		ae.each({
			padding: "inner" + e,
			content: n,
			"": "outer" + e
		}, function(r, i) {
			ae.fn[i] = function(i, o) {
				var a = arguments.length && (r || "boolean" != typeof i),
					s = r || (!0 === i || !0 === o ? "margin" : "border");
				return ae.access(this, function(n, r, i) {
					var o;
					return ae.isWindow(n) ? n.document.documentElement["client" + e] : 9 === n.nodeType ? (o = n.documentElement, Math.max(n.body["scroll" + e], o["scroll" + e], n.body["offset" + e], o["offset" + e], o["client" + e])) : i === t ? ae.css(n, r, s) : ae.style(n, r, i, s)
				}, n, a ? i : t, a, null)
			}
		})
	}), e.jQuery = e.$ = ae, "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function() {
		return ae
	})
}(window);