(function(t, e) {
	if( typeof exports !== "undefined" ) {
		e(t, exports, require("underscore"))
	} else if( typeof define === "function" && define.amd ) {
		define(["underscore", "jquery", "exports"], function(i, r, s) {
			t.Backbone = e(t, s, i, r)
		})
	} else {
		t.Backbone = e(t, {}, t._, t.jQuery || t.Zepto || t.ender || t.$)
	}
})(this, function(t, e, i, r) {
	var s = t.Backbone;
	var n = [];
	var a = n.push;
	var h = n.slice;
	var o = n.splice;
	e.VERSION = "1.0.0";
	e.$ = r;
	e.noConflict = function() {
		t.Backbone = s;
		return this
	};
	e.emulateHTTP = false;
	e.emulateJSON = false;
	var u = e.Events = {on: function(t, e, i) {
		if( !c(this, "on", t, [e, i]) || !e )return this;
		this._events || (this._events = {});
		var r = this._events[t] || (this._events[t] = []);
		r.push({callback: e, context: i, ctx: i || this});
		return this
	}, once: function(t, e, r) {
		if( !c(this, "once", t, [e, r]) || !e )return this;
		var s = this;
		var n = i.once(function() {
			s.off(t, n);
			e.apply(this, arguments)
		});
		n._callback = e;
		return this.on(t, n, r)
	}, off: function(t, e, r) {
		var s, n, a, h, o, u, l, f;
		if( !this._events || !c(this, "off", t, [e, r]) )return this;
		if( !t && !e && !r ) {
			this._events = {};
			return this
		}
		h = t ? [t] : i.keys(this._events);
		for( o = 0, u = h.length; o < u; o++ ) {
			t = h[o];
			if( a = this._events[t] ) {
				this._events[t] = s = [];
				if( e || r ) {
					for( l = 0, f = a.length; l < f; l++ ) {
						n = a[l];
						if( e && e !== n.callback && e !== n.callback._callback || r && r !== n.context ) {
							s.push(n)
						}
					}
				}
				if( !s.length )delete this._events[t]
			}
		}
		return this
	}, trigger: function(t) {
		if( !this._events )return this;
		var e = h.call(arguments, 1);
		if( !c(this, "trigger", t, e) )return this;
		var i = this._events[t];
		var r = this._events.all;
		if( i )f(i, e);
		if( r )f(r, arguments);
		return this
	}, stopListening: function(t, e, i) {
		var r = this._listeners;
		if( !r )return this;
		var s = !e && !i;
		if( typeof e === "object" )i = this;
		if( t )(r = {})[t._listenerId] = t;
		for( var n in r ) {
			r[n].off(e, i, this);
			if( s )delete this._listeners[n]
		}
		return this
	}};
	var l = /\s+/;
	var c = function(t, e, i, r) {
		if( !i )return true;
		if( typeof i === "object" ) {
			for( var s in i ) {
				t[e].apply(t, [s, i[s]].concat(r))
			}
			return false
		}
		if( l.test(i) ) {
			var n = i.split(l);
			for( var a = 0, h = n.length; a < h; a++ ) {
				t[e].apply(t, [n[a]].concat(r))
			}
			return false
		}
		return true
	};
	var f = function(t, e) {
		var i, r = -1, s = t.length, n = e[0], a = e[1], h = e[2];
		switch( e.length ) {
			case 0:
				while( ++r < s )(i = t[r]).callback.call(i.ctx);
				return;
			case 1:
				while( ++r < s )(i = t[r]).callback.call(i.ctx, n);
				return;
			case 2:
				while( ++r < s )(i = t[r]).callback.call(i.ctx, n, a);
				return;
			case 3:
				while( ++r < s )(i = t[r]).callback.call(i.ctx, n, a, h);
				return;
			default:
				while( ++r < s )(i = t[r]).callback.apply(i.ctx, e)
		}
	};
	var d = {listenTo: "on", listenToOnce: "once"};
	i.each(d, function(t, e) {
		u[e] = function(e, r, s) {
			var n = this._listeners || (this._listeners = {});
			var a = e._listenerId || (e._listenerId = i.uniqueId("l"));
			n[a] = e;
			if( typeof r === "object" )s = this;
			e[t](r, s, this);
			return this
		}
	});
	u.bind = u.on;
	u.unbind = u.off;
	i.extend(e, u);
	var p = e.Model = function(t, e) {
		var r;
		var s = t || {};
		e || (e = {});
		this.cid = i.uniqueId("c");
		this.attributes = {};
		i.extend(this, i.pick(e, v));
		if( e.parse )s = this.parse(s, e) || {};
		if( r = i.result(this, "defaults") ) {
			s = i.defaults({}, s, r)
		}
		this.set(s, e);
		this.changed = {};
		this.initialize.apply(this, arguments)
	};
	var v = ["url", "urlRoot", "collection"];
	i.extend(p.prototype, u, {changed: null, validationError: null, idAttribute: "id", initialize: function() {
	}, toJSON: function(t) {
		return i.clone(this.attributes)
	}, sync: function() {
		return e.sync.apply(this, arguments)
	}, get: function(t) {
		return this.attributes[t]
	}, escape: function(t) {
		return i.escape(this.get(t))
	}, has: function(t) {
		return this.get(t) != null
	}, set: function(t, e, r) {
		var s, n, a, h, o, u, l, c;
		if( t == null )return this;
		if( typeof t === "object" ) {
			n = t;
			r = e
		} else {
			(n = {})[t] = e
		}
		r || (r = {});
		if( !this._validate(n, r) )return false;
		a = r.unset;
		o = r.silent;
		h = [];
		u = this._changing;
		this._changing = true;
		if( !u ) {
			this._previousAttributes = i.clone(this.attributes);
			this.changed = {}
		}
		c = this.attributes, l = this._previousAttributes;
		if( this.idAttribute in n )this.id = n[this.idAttribute];
		for( s in n ) {
			e = n[s];
			if( !i.isEqual(c[s], e) )h.push(s);
			if( !i.isEqual(l[s], e) ) {
				this.changed[s] = e
			} else {
				delete this.changed[s]
			}
			a ? delete c[s] : c[s] = e
		}
		if( !o ) {
			if( h.length )this._pending = true;
			for( var f = 0, d = h.length; f < d; f++ ) {
				this.trigger("change:" + h[f], this, c[h[f]], r)
			}
		}
		if( u )return this;
		if( !o ) {
			while( this._pending ) {
				this._pending = false;
				this.trigger("change", this, r)
			}
		}
		this._pending = false;
		this._changing = false;
		return this
	}, unset: function(t, e) {
		return this.set(t, void 0, i.extend({}, e, {unset: true}))
	}, clear: function(t) {
		var e = {};
		for( var r in this.attributes )e[r] = void 0;
		return this.set(e, i.extend({}, t, {unset: true}))
	}, hasChanged: function(t) {
		if( t == null )return!i.isEmpty(this.changed);
		return i.has(this.changed, t)
	}, changedAttributes: function(t) {
		if( !t )return this.hasChanged() ? i.clone(this.changed) : false;
		var e, r = false;
		var s = this._changing ? this._previousAttributes : this.attributes;
		for( var n in t ) {
			if( i.isEqual(s[n], e = t[n]) )continue;
			(r || (r = {}))[n] = e
		}
		return r
	}, previous: function(t) {
		if( t == null || !this._previousAttributes )return null;
		return this._previousAttributes[t]
	}, previousAttributes: function() {
		return i.clone(this._previousAttributes)
	}, fetch: function(t) {
		t = t ? i.clone(t) : {};
		if( t.parse === void 0 )t.parse = true;
		var e = this;
		var r = t.success;
		t.success = function(i) {
			if( !e.set(e.parse(i, t), t) )return false;
			if( r )r(e, i, t);
			e.trigger("sync", e, i, t)
		};
		M(this, t);
		return this.sync("read", this, t)
	}, save: function(t, e, r) {
		var s, n, a, h = this.attributes;
		if( t == null || typeof t === "object" ) {
			s = t;
			r = e
		} else {
			(s = {})[t] = e
		}
		if( s && (!r || !r.wait) && !this.set(s, r) )return false;
		r = i.extend({validate: true}, r);
		if( !this._validate(s, r) )return false;
		if( s && r.wait ) {
			this.attributes = i.extend({}, h, s)
		}
		if( r.parse === void 0 )r.parse = true;
		var o = this;
		var u = r.success;
		r.success = function(t) {
			o.attributes = h;
			var e = o.parse(t, r);
			if( r.wait )e = i.extend(s || {}, e);
			if( i.isObject(e) && !o.set(e, r) ) {
				return false
			}
			if( u )u(o, t, r);
			o.trigger("sync", o, t, r)
		};
		M(this, r);
		n = this.isNew() ? "create" : r.patch ? "patch" : "update";
		if( n === "patch" )r.attrs = s;
		a = this.sync(n, this, r);
		if( s && r.wait )this.attributes = h;
		return a
	}, destroy: function(t) {
		t = t ? i.clone(t) : {};
		var e = this;
		var r = t.success;
		var s = function() {
			e.trigger("destroy", e, e.collection, t)
		};
		t.success = function(i) {
			if( t.wait || e.isNew() )s();
			if( r )r(e, i, t);
			if( !e.isNew() )e.trigger("sync", e, i, t)
		};
		if( this.isNew() ) {
			t.success();
			return false
		}
		M(this, t);
		var n = this.sync("delete", this, t);
		if( !t.wait )s();
		return n
	}, url: function() {
		var t = i.result(this, "urlRoot") || i.result(this.collection, "url") || R();
		if( this.isNew() )return t;
		return t + (t.charAt(t.length - 1) === "/" ? "" : "/") + encodeURIComponent(this.id)
	}, parse: function(t, e) {
		return t
	}, clone: function() {
		return new this.constructor(this.attributes)
	}, isNew: function() {
		return this.id == null
	}, isValid: function(t) {
		return this._validate({}, i.extend(t || {}, {validate: true}))
	}, _validate: function(t, e) {
		if( !e.validate || !this.validate )return true;
		t = i.extend({}, this.attributes, t);
		var r = this.validationError = this.validate(t, e) || null;
		if( !r )return true;
		this.trigger("invalid", this, r, i.extend(e || {}, {validationError: r}));
		return false
	}});
	var g = ["keys", "values", "pairs", "invert", "pick", "omit"];
	i.each(g, function(t) {
		p.prototype[t] = function() {
			var e = h.call(arguments);
			e.unshift(this.attributes);
			return i[t].apply(i, e)
		}
	});
	var m = e.Collection = function(t, e) {
		e || (e = {});
		if( e.url )this.url = e.url;
		if( e.model )this.model = e.model;
		if( e.comparator !== void 0 )this.comparator = e.comparator;
		this._reset();
		this.initialize.apply(this, arguments);
		if( t )this.reset(t, i.extend({silent: true}, e))
	};
	var y = {add: true, remove: true, merge: true};
	var _ = {add: true, merge: false, remove: false};
	i.extend(m.prototype, u, {model: p, initialize: function() {
	}, toJSON: function(t) {
		return this.map(function(e) {
			return e.toJSON(t)
		})
	}, sync: function() {
		return e.sync.apply(this, arguments)
	}, add: function(t, e) {
		return this.set(t, i.defaults(e || {}, _))
	}, remove: function(t, e) {
		t = i.isArray(t) ? t.slice() : [t];
		e || (e = {});
		var r, s, n, a;
		for( r = 0, s = t.length; r < s; r++ ) {
			a = this.get(t[r]);
			if( !a )continue;
			delete this._byId[a.id];
			delete this._byId[a.cid];
			n = this.indexOf(a);
			this.models.splice(n, 1);
			this.length--;
			if( !e.silent ) {
				e.index = n;
				a.trigger("remove", a, this, e)
			}
			this._removeReference(a)
		}
		return this
	}, set: function(t, e) {
		e = i.defaults(e || {}, y);
		if( e.parse )t = this.parse(t, e);
		if( !i.isArray(t) )t = t ? [t] : [];
		var r, s, n, h, u, l;
		var c = e.at;
		var f = this.comparator && c == null && e.sort !== false;
		var d = i.isString(this.comparator) ? this.comparator : null;
		var p = [], v = [], g = {};
		for( r = 0, s = t.length; r < s; r++ ) {
			if( !(n = this._prepareModel(t[r], e)) )continue;
			if( u = this.get(n) ) {
				if( e.remove )g[u.cid] = true;
				if( e.merge ) {
					u.set(n.attributes, e);
					if( f && !l && u.hasChanged(d) )l = true
				}
			} else if( e.add ) {
				p.push(n);
				n.on("all", this._onModelEvent, this);
				this._byId[n.cid] = n;
				if( n.id != null )this._byId[n.id] = n
			}
		}
		if( e.remove ) {
			for( r = 0, s = this.length; r < s; ++r ) {
				if( !g[(n = this.models[r]).cid] )v.push(n)
			}
			if( v.length )this.remove(v, e)
		}
		if( p.length ) {
			if( f )l = true;
			this.length += p.length;
			if( c != null ) {
				o.apply(this.models, [c, 0].concat(p))
			} else {
				a.apply(this.models, p)
			}
		}
		if( l )this.sort({silent: true});
		if( e.silent )return this;
		for( r = 0, s = p.length; r < s; r++ ) {
			(n = p[r]).trigger("add", n, this, e)
		}
		if( l )this.trigger("sort", this, e);
		return this
	}, reset: function(t, e) {
		e || (e = {});
		for( var r = 0, s = this.models.length; r < s; r++ ) {
			this._removeReference(this.models[r])
		}
		e.previousModels = this.models;
		this._reset();
		this.add(t, i.extend({silent: true}, e));
		if( !e.silent )this.trigger("reset", this, e);
		return this
	}, push: function(t, e) {
		t = this._prepareModel(t, e);
		this.add(t, i.extend({at: this.length}, e));
		return t
	}, pop: function(t) {
		var e = this.at(this.length - 1);
		this.remove(e, t);
		return e
	}, unshift: function(t, e) {
		t = this._prepareModel(t, e);
		this.add(t, i.extend({at: 0}, e));
		return t
	}, shift: function(t) {
		var e = this.at(0);
		this.remove(e, t);
		return e
	}, slice: function(t, e) {
		return this.models.slice(t, e)
	}, get: function(t) {
		if( t == null )return void 0;
		return this._byId[t.id != null ? t.id : t.cid || t]
	}, at: function(t) {
		return this.models[t]
	}, where: function(t, e) {
		if( i.isEmpty(t) )return e ? void 0 : [];
		return this[e ? "find" : "filter"](function(e) {
			for( var i in t ) {
				if( t[i] !== e.get(i) )return false
			}
			return true
		})
	}, findWhere: function(t) {
		return this.where(t, true)
	}, sort: function(t) {
		if( !this.comparator )throw new Error("Cannot sort a set without a comparator");
		t || (t = {});
		if( i.isString(this.comparator) || this.comparator.length === 1 ) {
			this.models = this.sortBy(this.comparator, this)
		} else {
			this.models.sort(i.bind(this.comparator, this))
		}
		if( !t.silent )this.trigger("sort", this, t);
		return this
	}, sortedIndex: function(t, e, r) {
		e || (e = this.comparator);
		var s = i.isFunction(e) ? e : function(t) {
			return t.get(e)
		};
		return i.sortedIndex(this.models, t, s, r)
	}, pluck: function(t) {
		return i.invoke(this.models, "get", t)
	}, fetch: function(t) {
		t = t ? i.clone(t) : {};
		if( t.parse === void 0 )t.parse = true;
		var e = t.success;
		var r = this;
		t.success = function(i) {
			var s = t.reset ? "reset" : "set";
			r[s](i, t);
			if( e )e(r, i, t);
			r.trigger("sync", r, i, t)
		};
		M(this, t);
		return this.sync("read", this, t)
	}, create: function(t, e) {
		e = e ? i.clone(e) : {};
		if( !(t = this._prepareModel(t, e)) )return false;
		if( !e.wait )this.add(t, e);
		var r = this;
		var s = e.success;
		e.success = function(i) {
			if( e.wait )r.add(t, e);
			if( s )s(t, i, e)
		};
		t.save(null, e);
		return t
	}, parse: function(t, e) {
		return t
	}, clone: function() {
		return new this.constructor(this.models)
	}, _reset: function() {
		this.length = 0;
		this.models = [];
		this._byId = {}
	}, _prepareModel: function(t, e) {
		if( t instanceof p ) {
			if( !t.collection )t.collection = this;
			return t
		}
		e || (e = {});
		e.collection = this;
		var i = new this.model(t, e);
		if( !i._validate(t, e) ) {
			this.trigger("invalid", this, t, e);
			return false
		}
		return i
	}, _removeReference: function(t) {
		if( this === t.collection )delete t.collection;
		t.off("all", this._onModelEvent, this)
	}, _onModelEvent: function(t, e, i, r) {
		if( (t === "add" || t === "remove") && i !== this )return;
		if( t === "destroy" )this.remove(e, r);
		if( e && t === "change:" + e.idAttribute ) {
			delete this._byId[e.previous(e.idAttribute)];
			if( e.id != null )this._byId[e.id] = e
		}
		this.trigger.apply(this, arguments)
	}});
	var w = ["forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "chain"];
	i.each(w, function(t) {
		m.prototype[t] = function() {
			var e = h.call(arguments);
			e.unshift(this.models);
			return i[t].apply(i, e)
		}
	});
	var b = ["groupBy", "countBy", "sortBy"];
	i.each(b, function(t) {
		m.prototype[t] = function(e, r) {
			var s = i.isFunction(e) ? e : function(t) {
				return t.get(e)
			};
			return i[t](this.models, s, r)
		}
	});
	var x = e.View = function(t) {
		this.cid = i.uniqueId("view");
		this._configure(t || {});
		this._ensureElement();
		this.initialize.apply(this, arguments);
		this.delegateEvents()
	};
	var E = /^(\S+)\s*(.*)$/;
	var k = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
	i.extend(x.prototype, u, {tagName: "div", $: function(t) {
		return this.$el.find(t)
	}, initialize: function() {
	}, render: function() {
		return this
	}, remove: function() {
		this.$el.remove();
		this.stopListening();
		return this
	}, setElement: function(t, i) {
		if( this.$el )this.undelegateEvents();
		this.$el = t instanceof e.$ ? t : e.$(t);
		this.el = this.$el[0];
		if( i !== false )this.delegateEvents();
		return this
	}, delegateEvents: function(t) {
		if( !(t || (t = i.result(this, "events"))) )return this;
		this.undelegateEvents();
		for( var e in t ) {
			var r = t[e];
			if( !i.isFunction(r) )r = this[t[e]];
			if( !r )continue;
			var s = e.match(E);
			var n = s[1], a = s[2];
			r = i.bind(r, this);
			n += ".delegateEvents" + this.cid;
			if( a === "" ) {
				this.$el.on(n, r)
			} else {
				this.$el.on(n, a, r)
			}
		}
		return this
	}, undelegateEvents: function() {
		this.$el.off(".delegateEvents" + this.cid);
		return this
	}, _configure: function(t) {
		if( this.options )t = i.extend({}, i.result(this, "options"), t);
		i.extend(this, i.pick(t, k));
		this.options = t
	}, _ensureElement: function() {
		if( !this.el ) {
			var t = i.extend({}, i.result(this, "attributes"));
			if( this.id )t.id = i.result(this, "id");
			if( this.className )t["class"] = i.result(this, "className");
			var r = e.$("<" + i.result(this, "tagName") + ">").attr(t);
			this.setElement(r, false)
		} else {
			this.setElement(i.result(this, "el"), false)
		}
	}});
	e.sync = function(t, r, s) {
		var n = S[t];
		i.defaults(s || (s = {}), {emulateHTTP: e.emulateHTTP, emulateJSON: e.emulateJSON});
		var a = {type: n, dataType: "json"};
		if( !s.url ) {
			a.url = i.result(r, "url") || R()
		}
		if( s.data == null && r && (t === "create" || t === "update" || t === "patch") ) {
			a.contentType = "application/json";
			a.data = JSON.stringify(s.attrs || r.toJSON(s))
		}
		if( s.emulateJSON ) {
			a.contentType = "application/x-www-form-urlencoded";
			a.data = a.data ? {model: a.data} : {}
		}
		if( s.emulateHTTP && (n === "PUT" || n === "DELETE" || n === "PATCH") ) {
			a.type = "POST";
			if( s.emulateJSON )a.data._method = n;
			var h = s.beforeSend;
			s.beforeSend = function(t) {
				t.setRequestHeader("X-HTTP-Method-Override", n);
				if( h )return h.apply(this, arguments)
			}
		}
		if( a.type !== "GET" && !s.emulateJSON ) {
			a.processData = false
		}
		if( a.type === "PATCH" && window.ActiveXObject && !(window.external && window.external.msActiveXFilteringEnabled) ) {
			a.xhr = function() {
				return new ActiveXObject("Microsoft.XMLHTTP")
			}
		}
		var o = s.xhr = e.ajax(i.extend(a, s));
		r.trigger("request", r, o, s);
		return o
	};
	var S = {create: "POST", update: "PUT", patch: "PATCH", "delete": "DELETE", read: "GET"};
	e.ajax = function() {
		return e.$.ajax.apply(e.$, arguments)
	};
	var $ = e.Router = function(t) {
		t || (t = {});
		if( t.routes )this.routes = t.routes;
		this._bindRoutes();
		this.initialize.apply(this, arguments)
	};
	var T = /\((.*?)\)/g;
	var H = /(\(\?)?:\w+/g;
	var A = /\*\w+/g;
	var I = /[\-{}\[\]+?.,\\\^$|#\s]/g;
	i.extend($.prototype, u, {initialize: function() {
	}, route: function(t, r, s) {
		if( !i.isRegExp(t) )t = this._routeToRegExp(t);
		if( i.isFunction(r) ) {
			s = r;
			r = ""
		}
		if( !s )s = this[r];
		var n = this;
		e.history.route(t, function(i) {
			var a = n._extractParameters(t, i);
			s && s.apply(n, a);
			n.trigger.apply(n, ["route:" + r].concat(a));
			n.trigger("route", r, a);
			e.history.trigger("route", n, r, a)
		});
		return this
	}, navigate: function(t, i) {
		e.history.navigate(t, i);
		return this
	}, _bindRoutes: function() {
		if( !this.routes )return;
		this.routes = i.result(this, "routes");
		var t, e = i.keys(this.routes);
		while( (t = e.pop()) != null ) {
			this.route(t, this.routes[t])
		}
	}, _routeToRegExp: function(t) {
		t = t.replace(I, "\\$&").replace(T, "(?:$1)?").replace(H,function(t, e) {
			return e ? t : "([^/]+)"
		}).replace(A, "(.*?)");
		return new RegExp("^" + t + "$")
	}, _extractParameters: function(t, e) {
		var r = t.exec(e).slice(1);
		return i.map(r, function(t) {
			return t ? decodeURIComponent(t) : null
		})
	}});
	var N = e.History = function() {
		this.handlers = [];
		i.bindAll(this, "checkUrl");
		if( typeof window !== "undefined" ) {
			this.location = window.location;
			this.history = window.history
		}
	};
	var P = /^[#\/]|\s+$/g;
	var O = /^\/+|\/+$/g;
	var C = /msie [\w.]+/;
	var j = /\/$/;
	N.started = false;
	i.extend(N.prototype, u, {interval: 50, getHash: function(t) {
		var e = (t || this).location.href.match(/#(.*)$/);
		return e ? e[1] : ""
	}, getFragment: function(t, e) {
		if( t == null ) {
			if( this._hasPushState || !this._wantsHashChange || e ) {
				t = this.location.pathname;
				var i = this.root.replace(j, "");
				if( !t.indexOf(i) )t = t.substr(i.length)
			} else {
				t = this.getHash()
			}
		}
		return t.replace(P, "")
	}, start: function(t) {
		if( N.started )throw new Error("Backbone.history has already been started");
		N.started = true;
		this.options = i.extend({}, {root: "/"}, this.options, t);
		this.root = this.options.root;
		this._wantsHashChange = this.options.hashChange !== false;
		this._wantsPushState = !!this.options.pushState;
		this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
		var r = this.getFragment();
		var s = document.documentMode;
		var n = C.exec(navigator.userAgent.toLowerCase()) && (!s || s <= 7);
		this.root = ("/" + this.root + "/").replace(O, "/");
		if( n && this._wantsHashChange ) {
			this.iframe = e.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow;
			this.navigate(r)
		}
		if( this._hasPushState ) {
			e.$(window).on("popstate", this.checkUrl)
		} else if( this._wantsHashChange && "onhashchange"in window && !n ) {
			e.$(window).on("hashchange", this.checkUrl)
		} else if( this._wantsHashChange ) {
			this._checkUrlInterval = setInterval(this.checkUrl, this.interval)
		}
		this.fragment = r;
		var a = this.location;
		var h = a.pathname.replace(/[^\/]$/, "$&/") === this.root;
		if( this._wantsHashChange && this._wantsPushState && !this._hasPushState && !h ) {
			this.fragment = this.getFragment(null, true);
			this.location.replace(this.root + this.location.search + "#" + this.fragment);
			return true
		} else if( this._wantsPushState && this._hasPushState && h && a.hash ) {
			this.fragment = this.getHash().replace(P, "");
			this.history.replaceState({}, document.title, this.root + this.fragment + a.search)
		}
		if( !this.options.silent )return this.loadUrl()
	}, stop: function() {
		e.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl);
		clearInterval(this._checkUrlInterval);
		N.started = false
	}, route: function(t, e) {
		this.handlers.unshift({route: t, callback: e})
	}, checkUrl: function(t) {
		var e = this.getFragment();
		if( e === this.fragment && this.iframe ) {
			e = this.getFragment(this.getHash(this.iframe))
		}
		if( e === this.fragment )return false;
		if( this.iframe )this.navigate(e);
		this.loadUrl() || this.loadUrl(this.getHash())
	}, loadUrl: function(t) {
		var e = this.fragment = this.getFragment(t);
		var r = i.any(this.handlers, function(t) {
			if( t.route.test(e) ) {
				t.callback(e);
				return true
			}
		});
		return r
	}, navigate: function(t, e) {
		if( !N.started )return false;
		if( !e || e === true )e = {trigger: e};
		t = this.getFragment(t || "");
		if( this.fragment === t )return;
		this.fragment = t;
		var i = this.root + t;
		if( this._hasPushState ) {
			this.history[e.replace ? "replaceState" : "pushState"]({}, document.title, i)
		} else if( this._wantsHashChange ) {
			this._updateHash(this.location, t, e.replace);
			if( this.iframe && t !== this.getFragment(this.getHash(this.iframe)) ) {
				if( !e.replace )this.iframe.document.open().close();
				this._updateHash(this.iframe.location, t, e.replace)
			}
		} else {
			return this.location.assign(i)
		}
		if( e.trigger )this.loadUrl(t)
	}, _updateHash: function(t, e, i) {
		if( i ) {
			var r = t.href.replace(/(javascript:|#).*$/, "");
			t.replace(r + "#" + e)
		} else {
			t.hash = "#" + e
		}
	}});
	e.history = new N;
	var U = function(t, e) {
		var r = this;
		var s;
		if( t && i.has(t, "constructor") ) {
			s = t.constructor
		} else {
			s = function() {
				return r.apply(this, arguments)
			}
		}
		i.extend(s, r, e);
		var n = function() {
			this.constructor = s
		};
		n.prototype = r.prototype;
		s.prototype = new n;
		if( t )i.extend(s.prototype, t);
		s.__super__ = r.prototype;
		return s
	};
	p.extend = m.extend = $.extend = x.extend = N.extend = U;
	var R = function() {
		throw new Error('A "url" property or function must be specified')
	};
	var M = function(t, e) {
		var i = e.error;
		e.error = function(r) {
			if( i )i(t, r, e);
			t.trigger("error", t, r, e)
		}
	};
	return e
});
//@ sourceMappingURL=backbone-min.map