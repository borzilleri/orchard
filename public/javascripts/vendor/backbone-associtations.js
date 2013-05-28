(function() {
	var f, h, q, l, p, o, s;
	"undefined" !== typeof require ? (f = require("underscore"), h = require("backbone"), exports = module.exports = h) : (f = this._, h = this.Backbone);
	q = h.Model;
	l = h.Collection;
	p = q.prototype;
	s = /[\.\[\]]+/g;
	h.Many = "Many";
	h.One = "One";
	o = h.AssociatedModel = q.extend({relations: void 0, _proxyCalls: void 0, get: function(b) {
		var a = p.get.call(this, b);
		return a ? a : this.getAttr.apply(this, arguments)
	}, set: function(b, a, d) {
		var c, k, e, i, g = this;
		if( f.isObject(b) || b == null ) {
			c = b;
			d = a
		} else {
			c = {};
			c[b] = a
		}
		if( !c )return this;
		for( k in c ) {
			e || (e = {});
			if( k.match(s) ) {
				b = r(k);
				a = f.initial(b);
				b = b[b.length - 1];
				a = this.get(a);
				if( a instanceof o ) {
					a = e[a.cid] || (e[a.cid] = {model: a, data: {}});
					a.data[b] = c[k]
				}
			} else {
				a = e[this.cid] || (e[this.cid] = {model: this, data: {}});
				a.data[k] = c[k]
			}
		}
		if( e )for( i in e ) {
			a = e[i];
			this.setAttr.call(a.model, a.data, d) || (g = false)
		} else return this.setAttr.call(this, c, d);
		return g
	}, setAttr: function(b, a) {
		var d;
		a || (a = {});
		if( a.unset )for( d in b )b[d] = void 0;
		this.relations && f.each(this.relations, function(c) {
			var d = c.key, e = c.relatedModel,
				i = c.collectionType, g, j, n, m;
			if( b[d] ) {
				g = f.result(b, d);
				e && f.isString(e) && (e = eval(e));
				i && f.isString(i) && (i = eval(i));
				j = c.options ? f.extend({}, c.options, a) : a;
				if( c.type === h.Many ) {
					if( i && !i.prototype instanceof l )throw Error("collectionType must inherit from Backbone.Collection");
					if( g instanceof l )n = g; else {
						n = i ? new i : this._createCollection(e);
						n.add(g, j)
					}
					b[d] = n
				} else if( c.type === h.One && e ) {
					n = g instanceof o ? g : new e(g);
					b[d] = n
				}
				if( (m = n) && !m._proxyCallback ) {
					m._proxyCallback = function() {
						return this._bubbleEvent.call(this,
							d, m, arguments)
					};
					m.on("all", m._proxyCallback, this)
				}
			}
		}, this);
		return p.set.call(this, b, a)
	}, _bubbleEvent: function(b, a, d) {
		var c = d[0].split(":"), k = c[0], e = d[1], i = -1, g = a._proxyCalls, j;
		f.size(c) > 1 && (j = c[1]);
		if( a instanceof l && "change" === k && e ) {
			var h = r(j), m = f.initial(h);
			(c = a.find(function(a) {
				if( e === a )return true;
				if( a ) {
					var b = a.get(m);
					if( (b instanceof o || b instanceof l) && e === b )return true;
					b = a.get(h);
					return(b instanceof o || b instanceof l) && e === b
				}
				return false
			})) && (i = a.indexOf(c))
		}
		j = b + (i !== -1 ? "[" + i + "]" : "") + (j ? "." +
			j : "");
		d[0] = k + ":" + j;
		if( g ) {
			if( i = f.find(g, function(a, b) {
				return j.indexOf(b, j.length - b.length) !== -1
			}) )return this
		} else g = a._proxyCalls = {};
		g[j] = true;
		if( "change" === k ) {
			this._previousAttributes[b] = a._previousAttributes;
			this.changed[b] = a
		}
		this.trigger.apply(this, d);
		j && g && delete g[j];
		return this
	}, _createCollection: function(b) {
		var a = b;
		f.isString(a) && (a = eval(a));
		if( a && a.prototype instanceof o ) {
			b = new l;
			b.model = a
		} else throw Error("type must inherit from Backbone.AssociatedModel");
		return b
	}, toJSON: function(b) {
		var a,
			d;
		if( !this.visited ) {
			this.visited = true;
			a = p.toJSON.apply(this, arguments);
			this.relations && f.each(this.relations, function(c) {
				var h = this.attributes[c.key];
				if( h ) {
					d = h.toJSON(b);
					a[c.key] = f.isArray(d) ? f.compact(d) : d
				}
			}, this);
			delete this.visited
		}
		return a
	}, clone: function() {
		return new this.constructor(this.toJSON())
	}, getAttr: function(b) {
		var a = this, b = r(b), d, c;
		if( !(f.size(b) < 1) ) {
			for( c = 0; c < b.length; c++ ) {
				d = b[c];
				if( !a )break;
				a = a instanceof l && !isNaN(d) ? a.at(d) : a.attributes[d]
			}
			return a
		}
	}});
	var t = /[^\.\[\]]+/g, r = function(b) {
		return b ===
			"" ? [""] : f.isString(b) ? b.match(t) : b || []
	}
}).call(this);
