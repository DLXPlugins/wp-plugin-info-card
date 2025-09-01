/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/lozad/dist/lozad.min.js":
/*!**********************************************!*\
  !*** ./node_modules/lozad/dist/lozad.min.js ***!
  \**********************************************/
/***/ (function(module) {

/*! lozad.js - v1.16.0 - 2020-09-06
* https://github.com/ApoorvSaxena/lozad.js
* Copyright (c) 2020 Apoorv Saxena; Licensed MIT */
!function(t,e){ true?module.exports=e():0}(this,function(){"use strict";
/**
   * Detect IE browser
   * @const {boolean}
   * @private
   */var g="undefined"!=typeof document&&document.documentMode,f={rootMargin:"0px",threshold:0,load:function(t){if("picture"===t.nodeName.toLowerCase()){var e=t.querySelector("img"),r=!1;null===e&&(e=document.createElement("img"),r=!0),g&&t.getAttribute("data-iesrc")&&(e.src=t.getAttribute("data-iesrc")),t.getAttribute("data-alt")&&(e.alt=t.getAttribute("data-alt")),r&&t.append(e)}if("video"===t.nodeName.toLowerCase()&&!t.getAttribute("data-src")&&t.children){for(var a=t.children,o=void 0,i=0;i<=a.length-1;i++)(o=a[i].getAttribute("data-src"))&&(a[i].src=o);t.load()}t.getAttribute("data-poster")&&(t.poster=t.getAttribute("data-poster")),t.getAttribute("data-src")&&(t.src=t.getAttribute("data-src")),t.getAttribute("data-srcset")&&t.setAttribute("srcset",t.getAttribute("data-srcset"));var n=",";if(t.getAttribute("data-background-delimiter")&&(n=t.getAttribute("data-background-delimiter")),t.getAttribute("data-background-image"))t.style.backgroundImage="url('"+t.getAttribute("data-background-image").split(n).join("'),url('")+"')";else if(t.getAttribute("data-background-image-set")){var d=t.getAttribute("data-background-image-set").split(n),u=d[0].substr(0,d[0].indexOf(" "))||d[0];// Substring before ... 1x
u=-1===u.indexOf("url(")?"url("+u+")":u,1===d.length?t.style.backgroundImage=u:t.setAttribute("style",(t.getAttribute("style")||"")+"background-image: "+u+"; background-image: -webkit-image-set("+d+"); background-image: image-set("+d+")")}t.getAttribute("data-toggle-class")&&t.classList.toggle(t.getAttribute("data-toggle-class"))},loaded:function(){}};function A(t){t.setAttribute("data-loaded",!0)}var m=function(t){return"true"===t.getAttribute("data-loaded")},v=function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:document;return t instanceof Element?[t]:t instanceof NodeList?t:e.querySelectorAll(t)};return function(){var r,a,o=0<arguments.length&&void 0!==arguments[0]?arguments[0]:".lozad",t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},e=Object.assign({},f,t),i=e.root,n=e.rootMargin,d=e.threshold,u=e.load,g=e.loaded,s=void 0;"undefined"!=typeof window&&window.IntersectionObserver&&(s=new IntersectionObserver((r=u,a=g,function(t,e){t.forEach(function(t){(0<t.intersectionRatio||t.isIntersecting)&&(e.unobserve(t.target),m(t.target)||(r(t.target),A(t.target),a(t.target)))})}),{root:i,rootMargin:n,threshold:d}));for(var c,l=v(o,i),b=0;b<l.length;b++)(c=l[b]).getAttribute("data-placeholder-background")&&(c.style.background=c.getAttribute("data-placeholder-background"));return{observe:function(){for(var t=v(o,i),e=0;e<t.length;e++)m(t[e])||(s?s.observe(t[e]):(u(t[e]),A(t[e]),g(t[e])))},triggerLoad:function(t){m(t)||(u(t),A(t),g(t))},observer:s}}});


/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/url":
/*!*****************************!*\
  !*** external ["wp","url"] ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["url"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!***************************************************************!*\
  !*** ./src/js/github-info-card/github-info-card-lazy-load.js ***!
  \***************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lozad__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lozad */ "./node_modules/lozad/dist/lozad.min.js");
/* harmony import */ var lozad__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lozad__WEBPACK_IMPORTED_MODULE_2__);


/**
 * Lazy load and queue the GitHub info card.
 *
 * @since 1.2.0
 */
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return j; }; var b, j = {}, e = Object.prototype, k = e.hasOwnProperty, m = Object.defineProperty || function (a, b, c) { a[b] = c.value; }, n = "function" == typeof Symbol ? Symbol : {}, q = n.iterator || "@@iterator", a = n.asyncIterator || "@@asyncIterator", c = n.toStringTag || "@@toStringTag"; function i(a, b, c) { return Object.defineProperty(a, b, { value: c, enumerable: !0, configurable: !0, writable: !0 }), a[b]; } try { i({}, ""); } catch (a) { i = function i(a, b, c) { return a[b] = c; }; } function u(b, d, e, f) { var g = d && d.prototype instanceof o ? d : o, h = Object.create(g.prototype), a = new F(f || []); return m(h, "_invoke", { value: B(b, e, a) }), h; } function w(a, b, c) { try { return { type: "normal", arg: a.call(b, c) }; } catch (a) { return { type: "throw", arg: a }; } } j.wrap = u; var x = "suspendedStart", h = "suspendedYield", l = "executing", f = "completed", s = {}; function o() {} function r() {} function y() {} var z = {}; i(z, q, function () { return this; }); var t = Object.getPrototypeOf, d = t && t(t(G([]))); d && d !== e && k.call(d, q) && (z = d); var v = y.prototype = o.prototype = Object.create(z); function g(a) { ["next", "throw", "return"].forEach(function (b) { i(a, b, function (a) { return this._invoke(b, a); }); }); } function A(b, d) { function c(e, f, g, i) { var a = w(b[e], b, f); if ("throw" !== a.type) { var j = a.arg, l = j.value; return l && "object" == _typeof(l) && k.call(l, "__await") ? d.resolve(l.__await).then(function (a) { c("next", a, g, i); }, function (a) { c("throw", a, g, i); }) : d.resolve(l).then(function (a) { j.value = a, g(j); }, function (a) { return c("throw", a, g, i); }); } i(a.arg); } var e; m(this, "_invoke", { value: function value(a, b) { function f() { return new d(function (d, e) { c(a, b, d, e); }); } return e = e ? e.then(f, f) : f(); } }); } function B(a, d, e) { var g = x; return function (j, i) { if (g === l) throw Error("Generator is already running"); if (g === f) { if ("throw" === j) throw i; return { value: b, done: !0 }; } for (e.method = j, e.arg = i;;) { var k = e.delegate; if (k) { var m = C(k, e); if (m) { if (m === s) continue; return m; } } if ("next" === e.method) e.sent = e._sent = e.arg;else if ("throw" === e.method) { if (g === x) throw g = f, e.arg; e.dispatchException(e.arg); } else "return" === e.method && e.abrupt("return", e.arg); g = l; var n = w(a, d, e); if ("normal" === n.type) { if (g = e.done ? f : h, n.arg === s) continue; return { value: n.arg, done: e.done }; } "throw" === n.type && (g = f, e.method = "throw", e.arg = n.arg); } }; } function C(c, d) { var e = d.method, f = c.iterator[e]; if (f === b) return d.delegate = null, "throw" === e && c.iterator["return"] && (d.method = "return", d.arg = b, C(c, d), "throw" === d.method) || "return" !== e && (d.method = "throw", d.arg = new TypeError("The iterator does not provide a '" + e + "' method")), s; var g = w(f, c.iterator, d.arg); if ("throw" === g.type) return d.method = "throw", d.arg = g.arg, d.delegate = null, s; var h = g.arg; return h ? h.done ? (d[c.resultName] = h.value, d.next = c.nextLoc, "return" !== d.method && (d.method = "next", d.arg = b), d.delegate = null, s) : h : (d.method = "throw", d.arg = new TypeError("iterator result is not an object"), d.delegate = null, s); } function D(a) { var b = { tryLoc: a[0] }; 1 in a && (b.catchLoc = a[1]), 2 in a && (b.finallyLoc = a[2], b.afterLoc = a[3]), this.tryEntries.push(b); } function E(a) { var b = a.completion || {}; b.type = "normal", delete b.arg, a.completion = b; } function F(a) { this.tryEntries = [{ tryLoc: "root" }], a.forEach(D, this), this.reset(!0); } function G(a) { if (a || "" === a) { var c = a[q]; if (c) return c.call(a); if ("function" == typeof a.next) return a; if (!isNaN(a.length)) { var d = -1, e = function c() { for (; ++d < a.length;) if (k.call(a, d)) return c.value = a[d], c.done = !1, c; return c.value = b, c.done = !0, c; }; return e.next = e; } } throw new TypeError(_typeof(a) + " is not iterable"); } return r.prototype = y, m(v, "constructor", { value: y, configurable: !0 }), m(y, "constructor", { value: r, configurable: !0 }), r.displayName = i(y, c, "GeneratorFunction"), j.isGeneratorFunction = function (a) { var b = "function" == typeof a && a.constructor; return !!b && (b === r || "GeneratorFunction" === (b.displayName || b.name)); }, j.mark = function (a) { return Object.setPrototypeOf ? Object.setPrototypeOf(a, y) : (a.__proto__ = y, i(a, c, "GeneratorFunction")), a.prototype = Object.create(v), a; }, j.awrap = function (a) { return { __await: a }; }, g(A.prototype), i(A.prototype, a, function () { return this; }), j.AsyncIterator = A, j.async = function (b, c, d, e, f) { void 0 === f && (f = Promise); var g = new A(u(b, c, d, e), f); return j.isGeneratorFunction(c) ? g : g.next().then(function (a) { return a.done ? a.value : g.next(); }); }, g(v), i(v, c, "Generator"), i(v, q, function () { return this; }), i(v, "toString", function () { return "[object Generator]"; }), j.keys = function (a) { var b = Object(a), c = []; for (var d in b) c.push(d); return c.reverse(), function a() { for (; c.length;) { var d = c.pop(); if (d in b) return a.value = d, a.done = !1, a; } return a.done = !0, a; }; }, j.values = G, F.prototype = { constructor: F, reset: function reset(a) { if (this.prev = 0, this.next = 0, this.sent = this._sent = b, this.done = !1, this.delegate = null, this.method = "next", this.arg = b, this.tryEntries.forEach(E), !a) for (var c in this) "t" === c.charAt(0) && k.call(this, c) && !isNaN(+c.slice(1)) && (this[c] = b); }, stop: function stop() { this.done = !0; var a = this.tryEntries[0].completion; if ("throw" === a.type) throw a.arg; return this.rval; }, dispatchException: function dispatchException(d) { if (this.done) throw d; var e = this; function f(a, c) { return j.type = "throw", j.arg = d, e.next = a, c && (e.method = "next", e.arg = b), !!c; } for (var g = this.tryEntries.length - 1; g >= 0; --g) { var h = this.tryEntries[g], j = h.completion; if ("root" === h.tryLoc) return f("end"); if (h.tryLoc <= this.prev) { var l = k.call(h, "catchLoc"), m = k.call(h, "finallyLoc"); if (l && m) { if (this.prev < h.catchLoc) return f(h.catchLoc, !0); if (this.prev < h.finallyLoc) return f(h.finallyLoc); } else if (l) { if (this.prev < h.catchLoc) return f(h.catchLoc, !0); } else { if (!m) throw Error("try statement without catch or finally"); if (this.prev < h.finallyLoc) return f(h.finallyLoc); } } } }, abrupt: function abrupt(b, c) { for (var d = this.tryEntries.length - 1; d >= 0; --d) { var e = this.tryEntries[d]; if (e.tryLoc <= this.prev && k.call(e, "finallyLoc") && this.prev < e.finallyLoc) { var f = e; break; } } f && ("break" === b || "continue" === b) && f.tryLoc <= c && c <= f.finallyLoc && (f = null); var g = f ? f.completion : {}; return g.type = b, g.arg = c, f ? (this.method = "next", this.next = f.finallyLoc, s) : this.complete(g); }, complete: function complete(a, b) { if ("throw" === a.type) throw a.arg; return "break" === a.type || "continue" === a.type ? this.next = a.arg : "return" === a.type ? (this.rval = this.arg = a.arg, this.method = "return", this.next = "end") : "normal" === a.type && b && (this.next = b), s; }, finish: function finish(a) { for (var b = this.tryEntries.length - 1; b >= 0; --b) { var c = this.tryEntries[b]; if (c.finallyLoc === a) return this.complete(c.completion, c.afterLoc), E(c), s; } }, "catch": function _catch(a) { for (var b = this.tryEntries.length - 1; b >= 0; --b) { var c = this.tryEntries[b]; if (c.tryLoc === a) { var d = c.completion; if ("throw" === d.type) { var f = d.arg; E(c); } return f; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(a, c, d) { return this.delegate = { iterator: G(a), resultName: c, nextLoc: d }, "next" === this.method && (this.arg = b), s; } }, j; }
function asyncGeneratorStep(b, d, f, e, g, h, a) { try { var c = b[h](a), i = c.value; } catch (a) { return void f(a); } c.done ? d(i) : Promise.resolve(i).then(e, g); }
function _asyncToGenerator(b) { return function () { var c = this, d = arguments; return new Promise(function (e, f) { var g = b.apply(c, d); function a(b) { asyncGeneratorStep(g, e, f, a, h, "next", b); } function h(b) { asyncGeneratorStep(g, e, f, a, h, "throw", b); } a(void 0); }); }; }



(function () {
  var a = {
    selector: '[data-is-github-card-loading="true"]',
    endpoint: '/wp-json/wppic/v2/get_github_card_html'
  };
  var b = function b(a) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', a, {
        once: true
      });
    } else {
      a();
    }
  };

  // Global state.
  var c = [];
  var d = false;
  var e = null;
  var f = /*#__PURE__*/function () {
    var b = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function c(b) {
      var d, e, f;
      return _regeneratorRuntime().wrap(function g(c) {
        while (1) switch (c.prev = c.next) {
          case 0:
            d = {
              username: (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_1__.safeDecodeURIComponent)(b.dataset.username),
              repo: (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_1__.safeDecodeURIComponent)(b.dataset.repo),
              nonce: (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_1__.safeDecodeURIComponent)(b.dataset.nonce),
              cardAttributes: wppicGithubInfoCardLazyLoad.cardAttributes[b.dataset.username + '_' + b.dataset.repo] /* todo: harden */
            };
            c.next = 3;
            return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
              url: a.endpoint,
              parse: true,
              headers: {
                'X-WP-Nonce': wppicGithubInfoCardLazyLoad.restNonce,
                'Content-Type': 'application/json'
              },
              method: 'POST',
              body: JSON.stringify(d)
            });
          case 3:
            e = c.sent;
            console.log('response', e);
            // Replace element with response.html.
            // Create element from new html.
            f = document.createElement('div');
            f.innerHTML = e.html;
            b.replaceWith(f);
            return c.abrupt("return", e.html);
          case 9:
          case "end":
            return c.stop();
        }
      }, c);
    }));
    return function a(_x) {
      return b.apply(this, arguments);
    };
  }();
  var g = function b() {
    if (d) {
      return;
    }
    var g = document.querySelectorAll(a.selector);
    if (g.length === 0) {
      return;
    }
    c = Array.from(g);
    if (c.length > 0 && !d) {
      d = true;
    }
    d = true;
    e = lozad__WEBPACK_IMPORTED_MODULE_2___default()(g, {
      load: function b(a) {
        f(a);
      }
    });
    e.observe();
  };
  b(g);
})();
})();

/******/ })()
;
//# sourceMappingURL=github-info-card-lazy-load.js.map