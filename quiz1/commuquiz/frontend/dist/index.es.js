import Me, { createContext as Je, useState as x, useEffect as ne, useContext as Ve } from "react";
import { useNavigate as Be, useParams as kt, BrowserRouter as _t, Routes as St, Route as re, Navigate as Ge } from "react-router-dom";
import { io as Tt } from "socket.io-client";
import ue from "axios";
import { QRCodeSVG as Pt } from "qrcode.react";
var Ne = { exports: {} }, ae = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Fe;
function Ot() {
  if (Fe)
    return ae;
  Fe = 1;
  var l = Me, a = Symbol.for("react.element"), o = Symbol.for("react.fragment"), c = Object.prototype.hasOwnProperty, d = l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: !0, ref: !0, __self: !0, __source: !0 };
  function f(y, h, R) {
    var v, T = {}, j = null, A = null;
    R !== void 0 && (j = "" + R), h.key !== void 0 && (j = "" + h.key), h.ref !== void 0 && (A = h.ref);
    for (v in h)
      c.call(h, v) && !p.hasOwnProperty(v) && (T[v] = h[v]);
    if (y && y.defaultProps)
      for (v in h = y.defaultProps, h)
        T[v] === void 0 && (T[v] = h[v]);
    return { $$typeof: a, type: y, key: j, ref: A, props: T, _owner: d.current };
  }
  return ae.Fragment = o, ae.jsx = f, ae.jsxs = f, ae;
}
var se = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var We;
function At() {
  return We || (We = 1, process.env.NODE_ENV !== "production" && function() {
    var l = Me, a = Symbol.for("react.element"), o = Symbol.for("react.portal"), c = Symbol.for("react.fragment"), d = Symbol.for("react.strict_mode"), p = Symbol.for("react.profiler"), f = Symbol.for("react.provider"), y = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), R = Symbol.for("react.suspense"), v = Symbol.for("react.suspense_list"), T = Symbol.for("react.memo"), j = Symbol.for("react.lazy"), A = Symbol.for("react.offscreen"), z = Symbol.iterator, D = "@@iterator";
    function Q(t) {
      if (t === null || typeof t != "object")
        return null;
      var r = z && t[z] || t[D];
      return typeof r == "function" ? r : null;
    }
    var S = l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function w(t) {
      {
        for (var r = arguments.length, s = new Array(r > 1 ? r - 1 : 0), i = 1; i < r; i++)
          s[i - 1] = arguments[i];
        $("error", t, s);
      }
    }
    function $(t, r, s) {
      {
        var i = S.ReactDebugCurrentFrame, b = i.getStackAddendum();
        b !== "" && (r += "%s", s = s.concat([b]));
        var N = s.map(function(g) {
          return String(g);
        });
        N.unshift("Warning: " + r), Function.prototype.apply.call(console[t], console, N);
      }
    }
    var le = !1, V = !1, W = !1, U = !1, B = !1, G;
    G = Symbol.for("react.module.reference");
    function H(t) {
      return !!(typeof t == "string" || typeof t == "function" || t === c || t === p || B || t === d || t === R || t === v || U || t === A || le || V || W || typeof t == "object" && t !== null && (t.$$typeof === j || t.$$typeof === T || t.$$typeof === f || t.$$typeof === y || t.$$typeof === h || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      t.$$typeof === G || t.getModuleId !== void 0));
    }
    function Z(t, r, s) {
      var i = t.displayName;
      if (i)
        return i;
      var b = r.displayName || r.name || "";
      return b !== "" ? s + "(" + b + ")" : s;
    }
    function Y(t) {
      return t.displayName || "Context";
    }
    function P(t) {
      if (t == null)
        return null;
      if (typeof t.tag == "number" && w("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof t == "function")
        return t.displayName || t.name || null;
      if (typeof t == "string")
        return t;
      switch (t) {
        case c:
          return "Fragment";
        case o:
          return "Portal";
        case p:
          return "Profiler";
        case d:
          return "StrictMode";
        case R:
          return "Suspense";
        case v:
          return "SuspenseList";
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case y:
            var r = t;
            return Y(r) + ".Consumer";
          case f:
            var s = t;
            return Y(s._context) + ".Provider";
          case h:
            return Z(t, t.render, "ForwardRef");
          case T:
            var i = t.displayName || null;
            return i !== null ? i : P(t.type) || "Memo";
          case j: {
            var b = t, N = b._payload, g = b._init;
            try {
              return P(g(N));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var L = Object.assign, u = 0, C, F, n, E, M, Ce, Re;
    function Ee() {
    }
    Ee.__reactDisabledLog = !0;
    function et() {
      {
        if (u === 0) {
          C = console.log, F = console.info, n = console.warn, E = console.error, M = console.group, Ce = console.groupCollapsed, Re = console.groupEnd;
          var t = {
            configurable: !0,
            enumerable: !0,
            value: Ee,
            writable: !0
          };
          Object.defineProperties(console, {
            info: t,
            log: t,
            warn: t,
            error: t,
            group: t,
            groupCollapsed: t,
            groupEnd: t
          });
        }
        u++;
      }
    }
    function tt() {
      {
        if (u--, u === 0) {
          var t = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: L({}, t, {
              value: C
            }),
            info: L({}, t, {
              value: F
            }),
            warn: L({}, t, {
              value: n
            }),
            error: L({}, t, {
              value: E
            }),
            group: L({}, t, {
              value: M
            }),
            groupCollapsed: L({}, t, {
              value: Ce
            }),
            groupEnd: L({}, t, {
              value: Re
            })
          });
        }
        u < 0 && w("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var me = S.ReactCurrentDispatcher, fe;
    function oe(t, r, s) {
      {
        if (fe === void 0)
          try {
            throw Error();
          } catch (b) {
            var i = b.stack.trim().match(/\n( *(at )?)/);
            fe = i && i[1] || "";
          }
        return `
` + fe + t;
      }
    }
    var ge = !1, ie;
    {
      var rt = typeof WeakMap == "function" ? WeakMap : Map;
      ie = new rt();
    }
    function ke(t, r) {
      if (!t || ge)
        return "";
      {
        var s = ie.get(t);
        if (s !== void 0)
          return s;
      }
      var i;
      ge = !0;
      var b = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var N;
      N = me.current, me.current = null, et();
      try {
        if (r) {
          var g = function() {
            throw Error();
          };
          if (Object.defineProperty(g.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(g, []);
            } catch (I) {
              i = I;
            }
            Reflect.construct(t, [], g);
          } else {
            try {
              g.call();
            } catch (I) {
              i = I;
            }
            t.call(g.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (I) {
            i = I;
          }
          t();
        }
      } catch (I) {
        if (I && i && typeof I.stack == "string") {
          for (var m = I.stack.split(`
`), O = i.stack.split(`
`), k = m.length - 1, _ = O.length - 1; k >= 1 && _ >= 0 && m[k] !== O[_]; )
            _--;
          for (; k >= 1 && _ >= 0; k--, _--)
            if (m[k] !== O[_]) {
              if (k !== 1 || _ !== 1)
                do
                  if (k--, _--, _ < 0 || m[k] !== O[_]) {
                    var q = `
` + m[k].replace(" at new ", " at ");
                    return t.displayName && q.includes("<anonymous>") && (q = q.replace("<anonymous>", t.displayName)), typeof t == "function" && ie.set(t, q), q;
                  }
                while (k >= 1 && _ >= 0);
              break;
            }
        }
      } finally {
        ge = !1, me.current = N, tt(), Error.prepareStackTrace = b;
      }
      var X = t ? t.displayName || t.name : "", J = X ? oe(X) : "";
      return typeof t == "function" && ie.set(t, J), J;
    }
    function at(t, r, s) {
      return ke(t, !1);
    }
    function st(t) {
      var r = t.prototype;
      return !!(r && r.isReactComponent);
    }
    function ce(t, r, s) {
      if (t == null)
        return "";
      if (typeof t == "function")
        return ke(t, st(t));
      if (typeof t == "string")
        return oe(t);
      switch (t) {
        case R:
          return oe("Suspense");
        case v:
          return oe("SuspenseList");
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case h:
            return at(t.render);
          case T:
            return ce(t.type, r, s);
          case j: {
            var i = t, b = i._payload, N = i._init;
            try {
              return ce(N(b), r, s);
            } catch {
            }
          }
        }
      return "";
    }
    var ee = Object.prototype.hasOwnProperty, _e = {}, Se = S.ReactDebugCurrentFrame;
    function de(t) {
      if (t) {
        var r = t._owner, s = ce(t.type, t._source, r ? r.type : null);
        Se.setExtraStackFrame(s);
      } else
        Se.setExtraStackFrame(null);
    }
    function nt(t, r, s, i, b) {
      {
        var N = Function.call.bind(ee);
        for (var g in t)
          if (N(t, g)) {
            var m = void 0;
            try {
              if (typeof t[g] != "function") {
                var O = Error((i || "React class") + ": " + s + " type `" + g + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof t[g] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw O.name = "Invariant Violation", O;
              }
              m = t[g](r, g, i, s, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (k) {
              m = k;
            }
            m && !(m instanceof Error) && (de(b), w("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", i || "React class", s, g, typeof m), de(null)), m instanceof Error && !(m.message in _e) && (_e[m.message] = !0, de(b), w("Failed %s type: %s", s, m.message), de(null));
          }
      }
    }
    var lt = Array.isArray;
    function he(t) {
      return lt(t);
    }
    function ot(t) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, s = r && t[Symbol.toStringTag] || t.constructor.name || "Object";
        return s;
      }
    }
    function it(t) {
      try {
        return Te(t), !1;
      } catch {
        return !0;
      }
    }
    function Te(t) {
      return "" + t;
    }
    function Pe(t) {
      if (it(t))
        return w("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", ot(t)), Te(t);
    }
    var te = S.ReactCurrentOwner, ct = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Oe, Ae, be;
    be = {};
    function dt(t) {
      if (ee.call(t, "ref")) {
        var r = Object.getOwnPropertyDescriptor(t, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return t.ref !== void 0;
    }
    function ut(t) {
      if (ee.call(t, "key")) {
        var r = Object.getOwnPropertyDescriptor(t, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return t.key !== void 0;
    }
    function xt(t, r) {
      if (typeof t.ref == "string" && te.current && r && te.current.stateNode !== r) {
        var s = P(te.current.type);
        be[s] || (w('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', P(te.current.type), t.ref), be[s] = !0);
      }
    }
    function mt(t, r) {
      {
        var s = function() {
          Oe || (Oe = !0, w("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        s.isReactWarning = !0, Object.defineProperty(t, "key", {
          get: s,
          configurable: !0
        });
      }
    }
    function ft(t, r) {
      {
        var s = function() {
          Ae || (Ae = !0, w("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        s.isReactWarning = !0, Object.defineProperty(t, "ref", {
          get: s,
          configurable: !0
        });
      }
    }
    var gt = function(t, r, s, i, b, N, g) {
      var m = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: a,
        // Built-in properties that belong on the element
        type: t,
        key: r,
        ref: s,
        props: g,
        // Record the component responsible for creating this element.
        _owner: N
      };
      return m._store = {}, Object.defineProperty(m._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(m, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: i
      }), Object.defineProperty(m, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: b
      }), Object.freeze && (Object.freeze(m.props), Object.freeze(m)), m;
    };
    function ht(t, r, s, i, b) {
      {
        var N, g = {}, m = null, O = null;
        s !== void 0 && (Pe(s), m = "" + s), ut(r) && (Pe(r.key), m = "" + r.key), dt(r) && (O = r.ref, xt(r, b));
        for (N in r)
          ee.call(r, N) && !ct.hasOwnProperty(N) && (g[N] = r[N]);
        if (t && t.defaultProps) {
          var k = t.defaultProps;
          for (N in k)
            g[N] === void 0 && (g[N] = k[N]);
        }
        if (m || O) {
          var _ = typeof t == "function" ? t.displayName || t.name || "Unknown" : t;
          m && mt(g, _), O && ft(g, _);
        }
        return gt(t, m, O, b, i, te.current, g);
      }
    }
    var pe = S.ReactCurrentOwner, ze = S.ReactDebugCurrentFrame;
    function K(t) {
      if (t) {
        var r = t._owner, s = ce(t.type, t._source, r ? r.type : null);
        ze.setExtraStackFrame(s);
      } else
        ze.setExtraStackFrame(null);
    }
    var ye;
    ye = !1;
    function ve(t) {
      return typeof t == "object" && t !== null && t.$$typeof === a;
    }
    function $e() {
      {
        if (pe.current) {
          var t = P(pe.current.type);
          if (t)
            return `

Check the render method of \`` + t + "`.";
        }
        return "";
      }
    }
    function bt(t) {
      {
        if (t !== void 0) {
          var r = t.fileName.replace(/^.*[\\\/]/, ""), s = t.lineNumber;
          return `

Check your code at ` + r + ":" + s + ".";
        }
        return "";
      }
    }
    var Ie = {};
    function pt(t) {
      {
        var r = $e();
        if (!r) {
          var s = typeof t == "string" ? t : t.displayName || t.name;
          s && (r = `

Check the top-level render call using <` + s + ">.");
        }
        return r;
      }
    }
    function qe(t, r) {
      {
        if (!t._store || t._store.validated || t.key != null)
          return;
        t._store.validated = !0;
        var s = pt(r);
        if (Ie[s])
          return;
        Ie[s] = !0;
        var i = "";
        t && t._owner && t._owner !== pe.current && (i = " It was passed a child from " + P(t._owner.type) + "."), K(t), w('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', s, i), K(null);
      }
    }
    function Qe(t, r) {
      {
        if (typeof t != "object")
          return;
        if (he(t))
          for (var s = 0; s < t.length; s++) {
            var i = t[s];
            ve(i) && qe(i, r);
          }
        else if (ve(t))
          t._store && (t._store.validated = !0);
        else if (t) {
          var b = Q(t);
          if (typeof b == "function" && b !== t.entries)
            for (var N = b.call(t), g; !(g = N.next()).done; )
              ve(g.value) && qe(g.value, r);
        }
      }
    }
    function yt(t) {
      {
        var r = t.type;
        if (r == null || typeof r == "string")
          return;
        var s;
        if (typeof r == "function")
          s = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === h || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === T))
          s = r.propTypes;
        else
          return;
        if (s) {
          var i = P(r);
          nt(s, t.props, "prop", i, t);
        } else if (r.PropTypes !== void 0 && !ye) {
          ye = !0;
          var b = P(r);
          w("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", b || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && w("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function vt(t) {
      {
        for (var r = Object.keys(t.props), s = 0; s < r.length; s++) {
          var i = r[s];
          if (i !== "children" && i !== "key") {
            K(t), w("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", i), K(null);
            break;
          }
        }
        t.ref !== null && (K(t), w("Invalid attribute `ref` supplied to `React.Fragment`."), K(null));
      }
    }
    var Le = {};
    function De(t, r, s, i, b, N) {
      {
        var g = H(t);
        if (!g) {
          var m = "";
          (t === void 0 || typeof t == "object" && t !== null && Object.keys(t).length === 0) && (m += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var O = bt(b);
          O ? m += O : m += $e();
          var k;
          t === null ? k = "null" : he(t) ? k = "array" : t !== void 0 && t.$$typeof === a ? (k = "<" + (P(t.type) || "Unknown") + " />", m = " Did you accidentally export a JSX literal instead of a component?") : k = typeof t, w("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", k, m);
        }
        var _ = ht(t, r, s, b, N);
        if (_ == null)
          return _;
        if (g) {
          var q = r.children;
          if (q !== void 0)
            if (i)
              if (he(q)) {
                for (var X = 0; X < q.length; X++)
                  Qe(q[X], t);
                Object.freeze && Object.freeze(q);
              } else
                w("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Qe(q, t);
        }
        if (ee.call(r, "key")) {
          var J = P(t), I = Object.keys(r).filter(function(Et) {
            return Et !== "key";
          }), je = I.length > 0 ? "{key: someKey, " + I.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Le[J + je]) {
            var Rt = I.length > 0 ? "{" + I.join(": ..., ") + ": ...}" : "{}";
            w(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, je, J, Rt, J), Le[J + je] = !0;
          }
        }
        return t === c ? vt(_) : yt(_), _;
      }
    }
    function jt(t, r, s) {
      return De(t, r, s, !0);
    }
    function Nt(t, r, s) {
      return De(t, r, s, !1);
    }
    var wt = Nt, Ct = jt;
    se.Fragment = c, se.jsx = wt, se.jsxs = Ct;
  }()), se;
}
process.env.NODE_ENV === "production" ? Ne.exports = Ot() : Ne.exports = At();
var e = Ne.exports;
const He = Je(null), zt = ({ children: l }) => {
  const [a, o] = x(null);
  return ne(() => {
    const c = window.location.hostname === "localhost" ? "http://localhost:5000" : "http://10.14.125.46:5000", d = Tt(c);
    return o(d), d.on("connect", () => {
      console.log("✅ Socket connected:", d.id);
    }), () => d.disconnect();
  }, []), /* @__PURE__ */ e.jsx(He.Provider, { value: a, children: l });
}, Ke = () => Ve(He), Xe = Je(null), $t = ({ children: l }) => {
  const [a, o] = x(null), [c, d] = x(null), [p, f] = x(!0);
  ne(() => {
    const R = localStorage.getItem("commuquiz_token"), v = localStorage.getItem("commuquiz_user");
    R && v && (d(R), o(JSON.parse(v))), f(!1);
  }, []);
  const y = (R, v) => {
    o(R), d(v), localStorage.setItem("commuquiz_token", v), localStorage.setItem("commuquiz_user", JSON.stringify(R));
  }, h = () => {
    o(null), d(null), localStorage.removeItem("commuquiz_token"), localStorage.removeItem("commuquiz_user");
  };
  return /* @__PURE__ */ e.jsx(Xe.Provider, { value: { user: a, token: c, login: y, logout: h, loading: p }, children: l });
}, xe = () => Ve(Xe), It = "http://172.25.80.1:5000/api";
function qt() {
  const [l, a] = x(!0), [o, c] = x({ name: "", email: "", password: "" }), [d, p] = x(""), [f, y] = x(!1), { login: h } = xe(), R = Be(), v = (j) => {
    c({ ...o, [j.target.name]: j.target.value }), p("");
  }, T = async (j) => {
    var A, z;
    j.preventDefault(), y(!0), p("");
    try {
      const D = l ? "/auth/login" : "/auth/register", Q = l ? { email: o.email, password: o.password } : { name: o.name, email: o.email, password: o.password }, S = await ue.post(`${It}${D}`, Q);
      S.data.success && (h(S.data.user, S.data.token), R("/dashboard"));
    } catch (D) {
      p(((z = (A = D.response) == null ? void 0 : A.data) == null ? void 0 : z.message) || "Something went wrong");
    }
    y(!1);
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "min-h-screen bg-gray-950 flex items-center justify-center p-4", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: [
      /* @__PURE__ */ e.jsx("div", { className: "absolute top-20 left-10 w-72 h-72 bg-teal-500 opacity-5 rounded-full blur-3xl" }),
      /* @__PURE__ */ e.jsx("div", { className: "absolute bottom-20 right-10 w-96 h-96 bg-purple-500 opacity-5 rounded-full blur-3xl" })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "w-full max-w-md relative", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ e.jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 bg-teal-500 rounded-2xl mb-4 shadow-lg", children: /* @__PURE__ */ e.jsx("span", { className: "text-2xl", children: "⚡" }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "text-4xl font-black text-white", children: "CommuQuiz" }),
        /* @__PURE__ */ e.jsx("p", { className: "text-gray-400 mt-1 text-sm", children: "AI-powered live quiz engine" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "bg-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-800", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "flex bg-gray-800 rounded-xl p-1 mb-8", children: [
          /* @__PURE__ */ e.jsx(
            "button",
            {
              onClick: () => {
                a(!0), p("");
              },
              className: `flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${l ? "bg-teal-500 text-white shadow-lg" : "text-gray-400 hover:text-white"}`,
              children: "Sign In"
            }
          ),
          /* @__PURE__ */ e.jsx(
            "button",
            {
              onClick: () => {
                a(!1), p("");
              },
              className: `flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${l ? "text-gray-400 hover:text-white" : "bg-teal-500 text-white shadow-lg"}`,
              children: "Create Account"
            }
          )
        ] }),
        /* @__PURE__ */ e.jsxs("form", { onSubmit: T, className: "space-y-4", children: [
          !l && /* @__PURE__ */ e.jsxs("div", { children: [
            /* @__PURE__ */ e.jsx("label", { className: "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block", children: "Full Name" }),
            /* @__PURE__ */ e.jsx(
              "input",
              {
                name: "name",
                type: "text",
                placeholder: "John Doe",
                value: o.name,
                onChange: v,
                required: !0,
                className: "w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition"
              }
            )
          ] }),
          /* @__PURE__ */ e.jsxs("div", { children: [
            /* @__PURE__ */ e.jsx("label", { className: "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block", children: "Email Address" }),
            /* @__PURE__ */ e.jsx(
              "input",
              {
                name: "email",
                type: "email",
                placeholder: "you@example.com",
                value: o.email,
                onChange: v,
                required: !0,
                className: "w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition"
              }
            )
          ] }),
          /* @__PURE__ */ e.jsxs("div", { children: [
            /* @__PURE__ */ e.jsx("label", { className: "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block", children: "Password" }),
            /* @__PURE__ */ e.jsx(
              "input",
              {
                name: "password",
                type: "password",
                placeholder: "••••••••",
                value: o.password,
                onChange: v,
                required: !0,
                className: "w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition"
              }
            )
          ] }),
          d && /* @__PURE__ */ e.jsxs("div", { className: "bg-red-950 border border-red-800 rounded-xl px-4 py-3 flex items-center gap-2", children: [
            /* @__PURE__ */ e.jsx("span", { className: "text-red-400 text-sm", children: "⚠" }),
            /* @__PURE__ */ e.jsx("p", { className: "text-red-400 text-sm", children: d })
          ] }),
          /* @__PURE__ */ e.jsx(
            "button",
            {
              type: "submit",
              disabled: f,
              className: "w-full bg-teal-500 hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all duration-200 text-sm mt-2 shadow-lg shadow-teal-500/20",
              children: f ? "⏳ Please wait..." : l ? "→ Sign In" : "→ Create Account"
            }
          )
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-3 my-6", children: [
          /* @__PURE__ */ e.jsx("div", { className: "flex-1 h-px bg-gray-800" }),
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-gray-600", children: "OR" }),
          /* @__PURE__ */ e.jsx("div", { className: "flex-1 h-px bg-gray-800" })
        ] }),
        /* @__PURE__ */ e.jsx(
          "button",
          {
            onClick: () => R("/join"),
            className: "w-full bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-3.5 rounded-xl transition text-sm border border-gray-700",
            children: "🎮 Join as Guest Player"
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx("p", { className: "text-center text-gray-600 text-xs mt-6", children: "Powered by CommuQuiz Engine • Team DreamForge" })
    ] })
  ] });
}
function Qt() {
  var d, p;
  const { user: l, logout: a } = xe(), o = Be(), c = () => {
    a(), o("/");
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "min-h-screen bg-gray-950 text-white", children: [
    /* @__PURE__ */ e.jsx("nav", { className: "border-b border-gray-800 px-6 py-4", children: /* @__PURE__ */ e.jsxs("div", { className: "max-w-5xl mx-auto flex justify-between items-center", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ e.jsx("div", { className: "w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center text-sm", children: "⚡" }),
        /* @__PURE__ */ e.jsx("span", { className: "font-black text-lg text-white", children: "CommuQuiz" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e.jsx("div", { className: "w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm font-bold", children: (d = l == null ? void 0 : l.name) == null ? void 0 : d.charAt(0).toUpperCase() }),
          /* @__PURE__ */ e.jsx("span", { className: "text-sm text-gray-300", children: l == null ? void 0 : l.name })
        ] }),
        /* @__PURE__ */ e.jsx(
          "button",
          {
            onClick: c,
            className: "text-sm text-gray-500 hover:text-white transition px-3 py-1.5 rounded-lg hover:bg-gray-800",
            children: "Logout"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ e.jsxs("div", { className: "max-w-5xl mx-auto px-6 py-12", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "mb-12", children: [
        /* @__PURE__ */ e.jsxs("h2", { className: "text-3xl font-black text-white mb-1", children: [
          "Welcome back, ",
          (p = l == null ? void 0 : l.name) == null ? void 0 : p.split(" ")[0],
          "! 👋"
        ] }),
        /* @__PURE__ */ e.jsx("p", { className: "text-gray-400", children: "What would you like to do today?" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-12", children: [
        /* @__PURE__ */ e.jsxs(
          "div",
          {
            onClick: () => o("/host"),
            className: "bg-gradient-to-br from-teal-900 to-teal-950 border border-teal-800 rounded-3xl p-8 cursor-pointer hover:border-teal-600 hover:scale-[1.02] transition-all duration-200 group",
            children: [
              /* @__PURE__ */ e.jsx("div", { className: "w-14 h-14 bg-teal-500 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform", children: "🎮" }),
              /* @__PURE__ */ e.jsx("h3", { className: "text-xl font-black text-white mb-2", children: "Host a Quiz" }),
              /* @__PURE__ */ e.jsx("p", { className: "text-teal-300 text-sm leading-relaxed", children: "Create an AI-powered quiz in seconds. Share room code with participants and go live." }),
              /* @__PURE__ */ e.jsxs("div", { className: "mt-6 flex items-center gap-2 text-teal-400 text-sm font-semibold", children: [
                /* @__PURE__ */ e.jsx("span", { children: "Create Quiz" }),
                /* @__PURE__ */ e.jsx("span", { children: "→" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ e.jsxs(
          "div",
          {
            onClick: () => o("/join"),
            className: "bg-gradient-to-br from-purple-900 to-purple-950 border border-purple-800 rounded-3xl p-8 cursor-pointer hover:border-purple-600 hover:scale-[1.02] transition-all duration-200 group",
            children: [
              /* @__PURE__ */ e.jsx("div", { className: "w-14 h-14 bg-purple-500 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform", children: "🙋" }),
              /* @__PURE__ */ e.jsx("h3", { className: "text-xl font-black text-white mb-2", children: "Join a Quiz" }),
              /* @__PURE__ */ e.jsx("p", { className: "text-purple-300 text-sm leading-relaxed", children: "Enter a room code or scan QR to join a live quiz. Compete on the leaderboard!" }),
              /* @__PURE__ */ e.jsxs("div", { className: "mt-6 flex items-center gap-2 text-purple-400 text-sm font-semibold", children: [
                /* @__PURE__ */ e.jsx("span", { children: "Join Now" }),
                /* @__PURE__ */ e.jsx("span", { children: "→" })
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
        { icon: "🤖", label: "AI Generated", desc: "Questions in 60s" },
        { icon: "⚡", label: "Real-Time", desc: "Socket.io powered" },
        { icon: "🏆", label: "Leaderboard", desc: "Live rankings" },
        { icon: "🔥", label: "Streak Bonus", desc: "3x = double pts" }
      ].map((f, y) => /* @__PURE__ */ e.jsxs("div", { className: "bg-gray-900 border border-gray-800 rounded-2xl p-4 text-center", children: [
        /* @__PURE__ */ e.jsx("div", { className: "text-2xl mb-2", children: f.icon }),
        /* @__PURE__ */ e.jsx("p", { className: "text-white font-bold text-sm", children: f.label }),
        /* @__PURE__ */ e.jsx("p", { className: "text-gray-500 text-xs mt-0.5", children: f.desc })
      ] }, y)) })
    ] })
  ] });
}
const Ye = "http://172.25.80.1:5000/api";
function Ze() {
  const l = Ke(), [a, o] = x("create"), [c, d] = x(""), [p, f] = x(10), [y, h] = x(""), [R, v] = x([]), [T, j] = x(!1), [A, z] = x(""), [D, Q] = x(""), [S, w] = x([]), [$, le] = x(null), [V, W] = x([]), [U, B] = x(null), [G, H] = x(20), Z = async () => {
    if (!c.trim())
      return alert("Enter a topic!");
    j(!0);
    try {
      const u = await ue.post(`${Ye}/quiz/generate`, { topic: c, questionCount: p });
      v(u.data.questions), h(`Quiz on ${c}`), o("review");
    } catch {
      alert("AI generation failed. Check your API key.");
    }
    j(!1);
  }, Y = async () => {
    if (!y.trim())
      return alert("Enter a title!");
    j(!0);
    try {
      const u = await ue.post(`${Ye}/quiz/create`, {
        title: y,
        topic: c,
        questions: R
      }), C = u.data.roomCode, F = u.data.quiz.id;
      z(C), Q(F), l.emit("host:create_room", { roomCode: C, quizId: F }), l.on("host:room_created", () => o("lobby")), l.on("room:player_list", ({ players: n }) => w(n)), l.on("quiz:question", (n) => {
        le(n), H(n.timeLimit), o("quiz");
      }), l.on("leaderboard:update", ({ leaderboard: n }) => W(n)), l.on("quiz:question_ended", ({ correctAnswer: n, leaderboard: E }) => {
        W(E);
      }), l.on("quiz:finished", ({ leaderboard: n }) => {
        B(n), o("results");
      });
    } catch {
      alert("Failed to create quiz");
    }
    j(!1);
  }, P = () => {
    if (S.length === 0)
      return alert("Wait for players to join!");
    l.emit("host:start_quiz", { roomCode: A });
  }, L = () => {
    l.emit("host:next_question", { roomCode: A });
  };
  if (a === "create")
    return /* @__PURE__ */ e.jsx("div", { className: "min-h-screen bg-gray-950 text-white flex items-center justify-center p-6", children: /* @__PURE__ */ e.jsxs("div", { className: "bg-gray-900 rounded-2xl p-8 w-full max-w-lg shadow-xl", children: [
      /* @__PURE__ */ e.jsx("h1", { className: "text-3xl font-bold text-teal-400 mb-2", children: "CommuQuiz" }),
      /* @__PURE__ */ e.jsx("p", { className: "text-gray-400 mb-6", children: "Host — Create a new quiz" }),
      /* @__PURE__ */ e.jsx("label", { className: "text-sm text-gray-400 mb-1 block", children: "Topic" }),
      /* @__PURE__ */ e.jsx(
        "input",
        {
          className: "w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white mb-4 focus:outline-none focus:border-teal-400",
          placeholder: "e.g. React Hooks, JavaScript, System Design",
          value: c,
          onChange: (u) => d(u.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx("label", { className: "text-sm text-gray-400 mb-1 block", children: "Number of Questions" }),
      /* @__PURE__ */ e.jsx(
        "select",
        {
          className: "w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white mb-6",
          value: p,
          onChange: (u) => f(Number(u.target.value)),
          children: [5, 10, 15, 20].map((u) => /* @__PURE__ */ e.jsxs("option", { value: u, children: [
            u,
            " Questions"
          ] }, u))
        }
      ),
      /* @__PURE__ */ e.jsx(
        "button",
        {
          onClick: Z,
          disabled: T,
          className: "w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-lg transition disabled:opacity-50",
          children: T ? "⏳ AI is generating questions..." : "✨ Generate Quiz with AI"
        }
      )
    ] }) });
  if (a === "review")
    return /* @__PURE__ */ e.jsx("div", { className: "min-h-screen bg-gray-950 text-white p-6", children: /* @__PURE__ */ e.jsxs("div", { className: "max-w-3xl mx-auto", children: [
      /* @__PURE__ */ e.jsx("h2", { className: "text-2xl font-bold text-teal-400 mb-2", children: "Review Questions" }),
      /* @__PURE__ */ e.jsxs("p", { className: "text-gray-400 mb-4", children: [
        R.length,
        " questions generated by AI"
      ] }),
      /* @__PURE__ */ e.jsx(
        "input",
        {
          className: "w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white mb-6 focus:outline-none focus:border-teal-400",
          placeholder: "Quiz Title",
          value: y,
          onChange: (u) => h(u.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx("div", { className: "space-y-4 mb-6 max-h-96 overflow-y-auto", children: R.map((u, C) => /* @__PURE__ */ e.jsxs("div", { className: "bg-gray-900 rounded-xl p-4 border border-gray-800", children: [
        /* @__PURE__ */ e.jsxs("p", { className: "font-medium mb-3", children: [
          "Q",
          C + 1,
          ". ",
          u.question
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: "grid grid-cols-2 gap-2", children: u.options.map((F, n) => /* @__PURE__ */ e.jsxs(
          "div",
          {
            className: `text-sm px-3 py-2 rounded-lg ${n === u.correct ? "bg-teal-900 text-teal-300 border border-teal-600" : "bg-gray-800 text-gray-400"}`,
            children: [
              n === u.correct && "✓ ",
              F
            ]
          },
          n
        )) }),
        /* @__PURE__ */ e.jsx("span", { className: "text-xs text-gray-500 mt-2 block capitalize", children: u.difficulty })
      ] }, C)) }),
      /* @__PURE__ */ e.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ e.jsx("button", { onClick: () => o("create"), className: "flex-1 bg-gray-800 hover:bg-gray-700 py-3 rounded-lg font-medium", children: "← Regenerate" }),
        /* @__PURE__ */ e.jsx("button", { onClick: Y, disabled: T, className: "flex-1 bg-teal-500 hover:bg-teal-600 py-3 rounded-lg font-bold disabled:opacity-50", children: T ? "Creating..." : "🚀 Launch Quiz" })
      ] })
    ] }) });
  if (a === "lobby")
    return /* @__PURE__ */ e.jsx("div", { className: "min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-6", children: /* @__PURE__ */ e.jsxs("div", { className: "bg-gray-900 rounded-2xl p-8 w-full max-w-md text-center shadow-xl", children: [
      /* @__PURE__ */ e.jsx("h2", { className: "text-2xl font-bold text-teal-400 mb-1", children: "Waiting for players" }),
      /* @__PURE__ */ e.jsx("p", { className: "text-gray-400 mb-6", children: "Share the room code or QR" }),
      /* @__PURE__ */ e.jsxs("div", { className: "bg-gray-800 rounded-xl p-6 mb-4", children: [
        /* @__PURE__ */ e.jsx("p", { className: "text-sm text-gray-400 mb-1", children: "Room Code" }),
        /* @__PURE__ */ e.jsx("p", { className: "text-5xl font-black text-white tracking-widest", children: A })
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "bg-white rounded-xl p-4 inline-block mb-6", children: /* @__PURE__ */ e.jsx(Pt, { value: `https://emmalyn-centroclinal-unnefariously.ngrok-free.dev/join/${A}`, size: 150 }) }),
      /* @__PURE__ */ e.jsxs("div", { className: "bg-gray-800 rounded-xl p-4 mb-6", children: [
        /* @__PURE__ */ e.jsxs("p", { className: "text-sm text-gray-400 mb-2", children: [
          "Players Joined (",
          S.length,
          ")"
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: "flex flex-wrap gap-2 justify-center", children: S.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "text-gray-500 text-sm", children: "Waiting for players..." }) : S.map((u, C) => /* @__PURE__ */ e.jsx("span", { className: "bg-teal-900 text-teal-300 px-3 py-1 rounded-full text-sm", children: u }, C)) })
      ] }),
      /* @__PURE__ */ e.jsxs(
        "button",
        {
          onClick: P,
          className: "w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 rounded-xl text-lg transition",
          children: [
            "▶ Start Quiz (",
            S.length,
            " players)"
          ]
        }
      )
    ] }) });
  if (a === "quiz")
    return /* @__PURE__ */ e.jsx("div", { className: "min-h-screen bg-gray-950 text-white p-6", children: /* @__PURE__ */ e.jsxs("div", { className: "max-w-2xl mx-auto", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between items-center mb-6", children: [
        /* @__PURE__ */ e.jsxs("span", { className: "text-teal-400 font-bold", children: [
          "Question ",
          $ == null ? void 0 : $.questionNumber,
          "/",
          $ == null ? void 0 : $.totalQuestions
        ] }),
        /* @__PURE__ */ e.jsxs("span", { className: "bg-gray-800 px-4 py-2 rounded-full font-mono text-lg", children: [
          "⏱ ",
          G,
          "s"
        ] })
      ] }),
      $ && /* @__PURE__ */ e.jsxs("div", { className: "bg-gray-900 rounded-2xl p-6 mb-6", children: [
        /* @__PURE__ */ e.jsx("h3", { className: "text-xl font-bold mb-4", children: $.question }),
        /* @__PURE__ */ e.jsx("div", { className: "grid grid-cols-2 gap-3", children: $.options.map((u, C) => /* @__PURE__ */ e.jsx("div", { className: "bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm", children: u }, C)) })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "bg-gray-900 rounded-2xl p-4 mb-4", children: [
        /* @__PURE__ */ e.jsx("h4", { className: "text-sm text-gray-400 mb-3 font-medium", children: "LIVE LEADERBOARD" }),
        V.slice(0, 5).map((u, C) => /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between items-center py-2 border-b border-gray-800 last:border-0", children: [
          /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e.jsxs("span", { className: "text-teal-400 font-bold w-6", children: [
              "#",
              u.rank
            ] }),
            /* @__PURE__ */ e.jsx("span", { children: u.name }),
            u.streak >= 3 && /* @__PURE__ */ e.jsxs("span", { className: "text-orange-400 text-xs", children: [
              "🔥 ",
              u.streak
            ] })
          ] }),
          /* @__PURE__ */ e.jsxs("span", { className: "font-bold text-teal-300", children: [
            u.score,
            " pts"
          ] })
        ] }, C))
      ] }),
      /* @__PURE__ */ e.jsx("button", { onClick: L, className: "w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-xl font-bold transition", children: "Next Question →" })
    ] }) });
  if (a === "results")
    return /* @__PURE__ */ e.jsx("div", { className: "min-h-screen bg-gray-950 text-white p-6", children: /* @__PURE__ */ e.jsxs("div", { className: "max-w-lg mx-auto", children: [
      /* @__PURE__ */ e.jsx("h2", { className: "text-3xl font-black text-center text-teal-400 mb-2", children: "🏆 Final Results" }),
      /* @__PURE__ */ e.jsx("p", { className: "text-center text-gray-400 mb-8", children: "Quiz completed!" }),
      /* @__PURE__ */ e.jsx("div", { className: "space-y-3", children: U == null ? void 0 : U.map((u, C) => /* @__PURE__ */ e.jsxs("div", { className: `flex justify-between items-center p-4 rounded-xl ${C === 0 ? "bg-yellow-900 border border-yellow-600" : C === 1 ? "bg-gray-700" : C === 2 ? "bg-orange-900" : "bg-gray-900"}`, children: [
        /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-2xl", children: C === 0 ? "🥇" : C === 1 ? "🥈" : C === 2 ? "🥉" : `#${C + 1}` }),
          /* @__PURE__ */ e.jsx("span", { className: "font-bold", children: u.name })
        ] }),
        /* @__PURE__ */ e.jsxs("span", { className: "font-black text-xl text-teal-300", children: [
          u.score,
          " pts"
        ] })
      ] }, C)) }),
      /* @__PURE__ */ e.jsx("button", { onClick: () => {
        o("create"), d(""), v([]);
      }, className: "w-full mt-8 bg-teal-500 hover:bg-teal-600 py-3 rounded-xl font-bold", children: "🔄 Create New Quiz" })
    ] }) });
}
const Lt = ["🔥", "😂", "😮", "👏", "💯", "🎉"];
function we() {
  const { roomCode: l } = kt(), a = Ke(), [o, c] = x("join"), [d, p] = x(l || ""), [f, y] = x(""), [h, R] = x(""), [v, T] = x([]), [j, A] = x(null), [z, D] = x(null), [Q, S] = x(null), [w, $] = x(20), [le, V] = x([]), [W, U] = x(null), [B, G] = x(0), [H, Z] = x(0), [Y, P] = x(null);
  ne(() => {
    if (a)
      return a.on("error", ({ message: n }) => R(n)), a.on("player:joined", () => c("lobby")), a.on("room:player_list", ({ players: n }) => T(n)), a.on("quiz:started", () => {
        c("starting"), setTimeout(() => c("quiz"), 2e3);
      }), a.on("quiz:question", (n) => {
        A(n), D(null), S(null), P(null), $(n.timeLimit), c("quiz");
      }), a.on("player:answer_result", (n) => {
        S(n), G(n.totalScore), Z(n.streak);
      }), a.on("quiz:question_ended", ({ correctAnswer: n, leaderboard: E }) => {
        P(n), V(E);
      }), a.on("leaderboard:update", ({ leaderboard: n }) => V(n)), a.on("quiz:finished", ({ leaderboard: n }) => {
        U(n), c("results");
      }), a.on("room:reaction", ({ playerName: n, emoji: E }) => {
        const M = document.createElement("div");
        M.textContent = E, M.style.cssText = `position:fixed;font-size:2rem;top:${Math.random() * 60 + 10}%;left:${Math.random() * 80 + 10}%;animation:fadeUp 2s ease forwards;pointer-events:none;z-index:999`, document.body.appendChild(M), setTimeout(() => M.remove(), 2e3);
      }), () => {
        a.off("error"), a.off("player:joined"), a.off("room:player_list"), a.off("quiz:started"), a.off("quiz:question"), a.off("player:answer_result"), a.off("quiz:question_ended"), a.off("leaderboard:update"), a.off("quiz:finished"), a.off("room:reaction");
      };
  }, [a]), ne(() => {
    if (o !== "quiz" || z !== null || w <= 0)
      return;
    const n = setTimeout(() => $((E) => E - 1), 1e3);
    return () => clearTimeout(n);
  }, [w, o, z]);
  const L = () => {
    if (!f.trim())
      return R("Enter your name!");
    if (!d.trim())
      return R("Enter room code!");
    R(""), a.emit("player:join", { roomCode: d.toUpperCase(), playerName: f });
  }, u = (n) => {
    z === null && (D(n), a.emit("player:submit_answer", {
      roomCode: d,
      answerIndex: n,
      timeLeft: w
    }));
  }, C = (n) => {
    a.emit("player:reaction", { roomCode: d, emoji: n });
  }, F = (n) => Y !== null ? n === Y ? "bg-green-700 border-green-500 text-white" : n === z && n !== Y ? "bg-red-800 border-red-500 text-white" : "bg-gray-800 border-gray-700 opacity-50" : z === n ? "bg-teal-700 border-teal-400 text-white scale-95" : "bg-gray-800 border-gray-700 hover:bg-gray-700 cursor-pointer";
  if (o === "join")
    return /* @__PURE__ */ e.jsx("div", { className: "min-h-screen bg-gray-950 text-white flex items-center justify-center p-6", children: /* @__PURE__ */ e.jsxs("div", { className: "bg-gray-900 rounded-2xl p-8 w-full max-w-sm shadow-xl", children: [
      /* @__PURE__ */ e.jsx("h1", { className: "text-3xl font-bold text-teal-400 mb-1", children: "CommuQuiz" }),
      /* @__PURE__ */ e.jsx("p", { className: "text-gray-400 mb-6", children: "Join a live quiz" }),
      h && /* @__PURE__ */ e.jsx("p", { className: "text-red-400 text-sm mb-4 bg-red-950 px-3 py-2 rounded-lg", children: h }),
      /* @__PURE__ */ e.jsx(
        "input",
        {
          className: "w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white mb-3 focus:outline-none focus:border-teal-400",
          placeholder: "Your Name",
          value: f,
          onChange: (n) => y(n.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(
        "input",
        {
          className: "w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white mb-6 uppercase tracking-widest focus:outline-none focus:border-teal-400",
          placeholder: "Room Code",
          value: d,
          onChange: (n) => p(n.target.value.toUpperCase()),
          maxLength: 6
        }
      ),
      /* @__PURE__ */ e.jsx(
        "button",
        {
          onClick: L,
          className: "w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-lg transition",
          children: "Join Quiz →"
        }
      )
    ] }) });
  if (o === "lobby")
    return /* @__PURE__ */ e.jsx("div", { className: "min-h-screen bg-gray-950 text-white flex items-center justify-center p-6", children: /* @__PURE__ */ e.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ e.jsx("div", { className: "text-6xl mb-4 animate-bounce", children: "⏳" }),
      /* @__PURE__ */ e.jsx("h2", { className: "text-2xl font-bold text-teal-400 mb-2", children: "You are in!" }),
      /* @__PURE__ */ e.jsxs("p", { className: "text-gray-400 mb-4", children: [
        "Welcome, ",
        /* @__PURE__ */ e.jsx("span", { className: "text-white font-bold", children: f })
      ] }),
      /* @__PURE__ */ e.jsx("p", { className: "text-gray-500", children: "Waiting for host to start the quiz..." }),
      /* @__PURE__ */ e.jsxs("div", { className: "mt-6 bg-gray-900 rounded-xl p-4", children: [
        /* @__PURE__ */ e.jsxs("p", { className: "text-sm text-gray-400 mb-2", children: [
          "Players in room (",
          v.length,
          ")"
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: "flex flex-wrap gap-2 justify-center", children: v.map((n, E) => /* @__PURE__ */ e.jsx("span", { className: `px-3 py-1 rounded-full text-sm ${n === f ? "bg-teal-700 text-teal-200" : "bg-gray-800 text-gray-300"}`, children: n }, E)) })
      ] })
    ] }) });
  if (o === "starting")
    return /* @__PURE__ */ e.jsx("div", { className: "min-h-screen bg-gray-950 text-white flex items-center justify-center", children: /* @__PURE__ */ e.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ e.jsx("div", { className: "text-8xl mb-4 animate-pulse", children: "🚀" }),
      /* @__PURE__ */ e.jsx("h2", { className: "text-3xl font-black text-teal-400", children: "Quiz Starting!" })
    ] }) });
  if (o === "quiz")
    return /* @__PURE__ */ e.jsx("div", { className: "min-h-screen bg-gray-950 text-white p-4", children: /* @__PURE__ */ e.jsxs("div", { className: "max-w-lg mx-auto", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
        /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsxs("span", { className: "text-sm text-gray-400", children: [
            "Question ",
            j == null ? void 0 : j.questionNumber,
            "/",
            j == null ? void 0 : j.totalQuestions
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
            /* @__PURE__ */ e.jsxs("span", { className: "text-teal-400 font-bold text-sm", children: [
              "⭐ ",
              B,
              " pts"
            ] }),
            H >= 3 && /* @__PURE__ */ e.jsxs("span", { className: "text-orange-400 text-xs bg-orange-950 px-2 py-0.5 rounded-full", children: [
              "🔥 ",
              H,
              " streak!"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: `text-3xl font-black ${w <= 5 ? "text-red-400 animate-pulse" : "text-white"}`, children: w })
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "w-full bg-gray-800 rounded-full h-2 mb-6", children: /* @__PURE__ */ e.jsx(
        "div",
        {
          className: `h-2 rounded-full transition-all ${w <= 5 ? "bg-red-500" : "bg-teal-500"}`,
          style: { width: `${w / 20 * 100}%` }
        }
      ) }),
      Q && /* @__PURE__ */ e.jsx("div", { className: `mb-4 p-3 rounded-xl text-center font-bold ${Q.isCorrect ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"}`, children: Q.isCorrect ? `✅ Correct! +${Q.points} points${Q.hasStreak ? " 🔥 Streak Bonus!" : ""}` : "❌ Wrong answer" }),
      j && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("div", { className: "bg-gray-900 rounded-2xl p-6 mb-4", children: /* @__PURE__ */ e.jsx("p", { className: "text-lg font-bold leading-relaxed", children: j.question }) }),
        /* @__PURE__ */ e.jsx("div", { className: "grid grid-cols-1 gap-3 mb-6", children: j.options.map((n, E) => /* @__PURE__ */ e.jsxs(
          "button",
          {
            onClick: () => u(E),
            disabled: z !== null,
            className: `w-full text-left px-5 py-4 rounded-xl border-2 font-medium transition-all ${F(E)}`,
            children: [
              /* @__PURE__ */ e.jsxs("span", { className: "text-gray-400 mr-3", children: [
                ["A", "B", "C", "D"][E],
                "."
              ] }),
              n
            ]
          },
          E
        )) })
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "flex justify-center gap-3", children: Lt.map((n) => /* @__PURE__ */ e.jsx(
        "button",
        {
          onClick: () => C(n),
          className: "text-2xl hover:scale-125 transition-transform",
          children: n
        },
        n
      )) })
    ] }) });
  if (o === "results")
    return /* @__PURE__ */ e.jsx("div", { className: "min-h-screen bg-gray-950 text-white p-6", children: /* @__PURE__ */ e.jsxs("div", { className: "max-w-sm mx-auto", children: [
      /* @__PURE__ */ e.jsx("h2", { className: "text-3xl font-black text-center text-teal-400 mb-2", children: "🏆 Results" }),
      /* @__PURE__ */ e.jsxs("p", { className: "text-center text-gray-400 mb-6", children: [
        "Your final score: ",
        /* @__PURE__ */ e.jsxs("span", { className: "text-white font-bold text-xl", children: [
          B,
          " pts"
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "space-y-3", children: W == null ? void 0 : W.map((n, E) => /* @__PURE__ */ e.jsxs("div", { className: `flex justify-between items-center p-4 rounded-xl ${n.name === f ? "bg-teal-900 border border-teal-500" : "bg-gray-900"}`, children: [
        /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ e.jsx("span", { children: E === 0 ? "🥇" : E === 1 ? "🥈" : E === 2 ? "🥉" : `#${E + 1}` }),
          /* @__PURE__ */ e.jsxs("span", { className: n.name === f ? "text-teal-300 font-bold" : "", children: [
            n.name,
            " ",
            n.name === f ? "(You)" : ""
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("span", { className: "font-bold text-teal-300", children: [
          n.score,
          " pts"
        ] })
      ] }, E)) })
    ] }) });
}
const Ue = ({ children: l }) => {
  const { user: a, loading: o } = xe();
  return o ? /* @__PURE__ */ e.jsx("div", { className: "min-h-screen bg-gray-950 flex items-center justify-center", children: /* @__PURE__ */ e.jsx("div", { className: "w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" }) }) : a ? l : /* @__PURE__ */ e.jsx(Ge, { to: "/" });
};
function Dt() {
  const { user: l } = xe();
  return /* @__PURE__ */ e.jsxs(St, { children: [
    /* @__PURE__ */ e.jsx(re, { path: "/", element: l ? /* @__PURE__ */ e.jsx(Ge, { to: "/dashboard" }) : /* @__PURE__ */ e.jsx(qt, {}) }),
    /* @__PURE__ */ e.jsx(re, { path: "/dashboard", element: /* @__PURE__ */ e.jsx(Ue, { children: /* @__PURE__ */ e.jsx(Qt, {}) }) }),
    /* @__PURE__ */ e.jsx(re, { path: "/host", element: /* @__PURE__ */ e.jsx(Ue, { children: /* @__PURE__ */ e.jsx(Ze, {}) }) }),
    /* @__PURE__ */ e.jsx(re, { path: "/join", element: /* @__PURE__ */ e.jsx(we, {}) }),
    /* @__PURE__ */ e.jsx(re, { path: "/join/:roomCode", element: /* @__PURE__ */ e.jsx(we, {}) })
  ] });
}
function Kt() {
  return /* @__PURE__ */ e.jsx($t, { children: /* @__PURE__ */ e.jsx(zt, { children: /* @__PURE__ */ e.jsx(_t, { children: /* @__PURE__ */ e.jsx(Dt, {}) }) }) });
}
function Xt({
  mode: l = null,
  // 'host' or 'player' — if null, shows selection screen
  roomCode: a = "",
  // pre-fill room code for players
  serverUrl: o = "http://localhost:5000",
  theme: c = "dark"
  // future: support light/dark
}) {
  const [d, p] = x(l);
  if (!d)
    return /* @__PURE__ */ e.jsx("div", { className: "min-h-screen bg-gray-950 text-white flex items-center justify-center p-6", children: /* @__PURE__ */ e.jsxs("div", { className: "text-center max-w-md w-full", children: [
      /* @__PURE__ */ e.jsx("h1", { className: "text-5xl font-black text-teal-400 mb-2", children: "CommuQuiz" }),
      /* @__PURE__ */ e.jsx("p", { className: "text-gray-400 mb-10 text-lg", children: "AI-powered real-time quiz engine" }),
      /* @__PURE__ */ e.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
        /* @__PURE__ */ e.jsx(
          "button",
          {
            onClick: () => p("host"),
            className: "bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition",
            children: "🎮 I am a Host"
          }
        ),
        /* @__PURE__ */ e.jsx(
          "button",
          {
            onClick: () => p("player"),
            className: "bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition",
            children: "🙋 I am a Player"
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx("p", { className: "text-xs text-gray-600 mt-8", children: "Powered by CommuQuiz Engine" })
    ] }) });
  if (d === "host")
    return /* @__PURE__ */ e.jsx(Ze, { serverUrl: o });
  if (d === "player")
    return /* @__PURE__ */ e.jsx(we, { serverUrl: o, defaultRoomCode: a });
}
const Ft = ["A", "B", "C", "D"], Wt = [
  "hover:bg-blue-700 border-blue-600",
  "hover:bg-orange-700 border-orange-600",
  "hover:bg-green-700 border-green-600",
  "hover:bg-red-700 border-red-600"
], Yt = [
  "bg-blue-700 border-blue-400",
  "bg-orange-700 border-orange-400",
  "bg-green-700 border-green-400",
  "bg-red-700 border-red-400"
];
function Zt({
  question: l,
  options: a,
  selectedAnswer: o,
  correctAnswer: c,
  onAnswer: d,
  disabled: p
}) {
  const f = (y) => c !== null ? y === c ? "bg-green-700 border-green-400 text-white" : y === o ? "bg-red-800 border-red-500 text-white opacity-80" : "bg-gray-800 border-gray-700 opacity-40" : o === y ? `${Yt[y]} text-white` : `bg-gray-800 border-gray-700 text-gray-200 ${p ? "" : Wt[y]}`;
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx("div", { className: "bg-gray-900 rounded-2xl p-6 mb-5 border border-gray-800", children: /* @__PURE__ */ e.jsx("p", { className: "text-lg font-bold leading-relaxed text-white", children: l }) }),
    /* @__PURE__ */ e.jsx("div", { className: "grid grid-cols-1 gap-3", children: a.map((y, h) => /* @__PURE__ */ e.jsxs(
      "button",
      {
        onClick: () => !p && d(h),
        disabled: p,
        className: `w-full text-left px-5 py-4 rounded-xl border-2 font-medium transition-all duration-150 ${f(h)}`,
        children: [
          /* @__PURE__ */ e.jsxs("span", { className: "font-bold mr-3 opacity-70", children: [
            Ft[h],
            "."
          ] }),
          y,
          c !== null && h === c && /* @__PURE__ */ e.jsx("span", { className: "ml-2 text-green-300", children: "✓" })
        ]
      },
      h
    )) })
  ] });
}
function er({ players: l, currentPlayer: a, title: o = "Live Leaderboard" }) {
  return !l || l.length === 0 ? null : /* @__PURE__ */ e.jsxs("div", { className: "bg-gray-900 rounded-2xl p-4 border border-gray-800", children: [
    /* @__PURE__ */ e.jsx("h4", { className: "text-sm text-gray-400 mb-3 font-medium uppercase tracking-wider", children: o }),
    /* @__PURE__ */ e.jsx("div", { className: "space-y-2", children: l.slice(0, 8).map((c, d) => /* @__PURE__ */ e.jsxs(
      "div",
      {
        className: `flex justify-between items-center py-2 px-3 rounded-lg ${c.name === a ? "bg-teal-900 border border-teal-700" : "bg-gray-800"}`,
        children: [
          /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e.jsx("span", { className: "text-sm font-bold w-6 text-center", children: d === 0 ? "🥇" : d === 1 ? "🥈" : d === 2 ? "🥉" : `#${d + 1}` }),
            /* @__PURE__ */ e.jsxs("span", { className: `text-sm ${c.name === a ? "text-teal-300 font-bold" : "text-gray-200"}`, children: [
              c.name,
              c.name === a && " (You)"
            ] }),
            c.streak >= 3 && /* @__PURE__ */ e.jsxs("span", { className: "text-orange-400 text-xs bg-orange-950 px-1.5 py-0.5 rounded-full", children: [
              "🔥 ",
              c.streak
            ] })
          ] }),
          /* @__PURE__ */ e.jsxs("span", { className: "font-bold text-teal-300 text-sm", children: [
            c.score,
            " pts"
          ] })
        ]
      },
      d
    )) })
  ] });
}
function tr({ timeLeft: l, totalTime: a = 20 }) {
  const o = l / a * 100, c = l <= 5;
  return /* @__PURE__ */ e.jsxs("div", { className: "flex flex-col items-center", children: [
    /* @__PURE__ */ e.jsx("div", { className: `text-4xl font-black mb-2 ${c ? "text-red-400 animate-pulse" : "text-white"}`, children: l }),
    /* @__PURE__ */ e.jsx("div", { className: "w-full bg-gray-800 rounded-full h-3", children: /* @__PURE__ */ e.jsx(
      "div",
      {
        className: `h-3 rounded-full transition-all duration-1000 ${c ? "bg-red-500" : "bg-teal-500"}`,
        style: { width: `${o}%` }
      }
    ) })
  ] });
}
const Ut = ["🔥", "😂", "😮", "👏", "💯", "🎉"];
function rr({ onReact: l }) {
  return /* @__PURE__ */ e.jsx("div", { className: "flex justify-center gap-4 py-2", children: Ut.map((a) => /* @__PURE__ */ e.jsx(
    "button",
    {
      onClick: () => l(a),
      className: "text-2xl hover:scale-125 active:scale-110 transition-transform duration-100",
      title: "React",
      children: a
    },
    a
  )) });
}
const Mt = "http://172.25.80.1:5000/api";
function ar({ quizId: l }) {
  var p;
  const [a, o] = x(null), [c, d] = x(!0);
  return ne(() => {
    l && ue.get(`${Mt}/quiz/${l}/analytics`).then((f) => {
      o(f.data.analytics), d(!1);
    }).catch(() => d(!1));
  }, [l]), c ? /* @__PURE__ */ e.jsx("p", { className: "text-gray-400 text-sm text-center py-4", children: "Loading analytics..." }) : !a || !a.totalPlayers ? null : /* @__PURE__ */ e.jsxs("div", { className: "bg-gray-900 rounded-2xl p-5 border border-gray-800 mt-4", children: [
    /* @__PURE__ */ e.jsx("h3", { className: "text-teal-400 font-bold text-lg mb-4", children: "Post-Quiz Analytics" }),
    /* @__PURE__ */ e.jsxs("div", { className: "grid grid-cols-3 gap-3 mb-5", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "bg-gray-800 rounded-xl p-3 text-center", children: [
        /* @__PURE__ */ e.jsx("p", { className: "text-2xl font-black text-white", children: a.totalPlayers }),
        /* @__PURE__ */ e.jsx("p", { className: "text-xs text-gray-400 mt-1", children: "Players" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "bg-gray-800 rounded-xl p-3 text-center", children: [
        /* @__PURE__ */ e.jsx("p", { className: "text-2xl font-black text-teal-400", children: a.avgScore }),
        /* @__PURE__ */ e.jsx("p", { className: "text-xs text-gray-400 mt-1", children: "Avg Score" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "bg-gray-800 rounded-xl p-3 text-center", children: [
        /* @__PURE__ */ e.jsx("p", { className: "text-2xl font-black text-yellow-400", children: a.highestScore }),
        /* @__PURE__ */ e.jsx("p", { className: "text-xs text-gray-400 mt-1", children: "Top Score" })
      ] })
    ] }),
    a.hardestQuestion && /* @__PURE__ */ e.jsxs("div", { className: "bg-red-950 border border-red-800 rounded-xl p-4 mb-3", children: [
      /* @__PURE__ */ e.jsxs("p", { className: "text-xs text-red-400 font-bold mb-1", children: [
        "HARDEST QUESTION (",
        a.hardestQuestion.wrongPercent,
        "% got it wrong)"
      ] }),
      /* @__PURE__ */ e.jsxs("p", { className: "text-sm text-white", children: [
        "Q",
        a.hardestQuestion.questionNumber,
        ". ",
        a.hardestQuestion.questionText
      ] })
    ] }),
    a.easiestQuestion && /* @__PURE__ */ e.jsxs("div", { className: "bg-green-950 border border-green-800 rounded-xl p-4 mb-3", children: [
      /* @__PURE__ */ e.jsxs("p", { className: "text-xs text-green-400 font-bold mb-1", children: [
        "EASIEST QUESTION (",
        a.easiestQuestion.wrongPercent,
        "% got it wrong)"
      ] }),
      /* @__PURE__ */ e.jsxs("p", { className: "text-sm text-white", children: [
        "Q",
        a.easiestQuestion.questionNumber,
        ". ",
        a.easiestQuestion.questionText
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsx("p", { className: "text-xs text-gray-400 mb-2 font-medium", children: "PER QUESTION BREAKDOWN" }),
      /* @__PURE__ */ e.jsx("div", { className: "space-y-2", children: (p = a.questionStats) == null ? void 0 : p.map((f, y) => /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ e.jsxs("span", { className: "text-xs text-gray-500 w-6", children: [
          "Q",
          f.questionNumber
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: "flex-1 bg-gray-800 rounded-full h-2", children: /* @__PURE__ */ e.jsx(
          "div",
          {
            className: `h-2 rounded-full ${f.wrongPercent > 60 ? "bg-red-500" : f.wrongPercent > 30 ? "bg-yellow-500" : "bg-green-500"}`,
            style: { width: `${100 - f.wrongPercent}%` }
          }
        ) }),
        /* @__PURE__ */ e.jsxs("span", { className: "text-xs text-gray-400 w-12 text-right", children: [
          100 - f.wrongPercent,
          "% correct"
        ] })
      ] }, y)) })
    ] })
  ] });
}
function sr({ message: l = "Loading..." }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center gap-4", children: [
    /* @__PURE__ */ e.jsx("div", { className: "w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" }),
    /* @__PURE__ */ e.jsx("p", { className: "text-gray-400 text-sm", children: l })
  ] });
}
export {
  ar as Analytics,
  Kt as App,
  qt as AuthPage,
  Xt as CommuQuiz,
  Qt as Dashboard,
  rr as EmojiReactions,
  Ze as HostDashboard,
  er as Leaderboard,
  sr as Loader,
  we as PlayerView,
  Zt as QuestionCard,
  tr as Timer,
  Kt as default
};
