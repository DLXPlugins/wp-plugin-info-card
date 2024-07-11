/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/plugins/EDD/sidebar.js":
/*!************************************!*\
  !*** ./src/plugins/EDD/sidebar.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(a, b, c) { return (b = _toPropertyKey(b)) in a ? Object.defineProperty(a, b, { value: c, enumerable: !0, configurable: !0, writable: !0 }) : a[b] = c, a; }
function _toPropertyKey(a) { var b = _toPrimitive(a, "string"); return "symbol" == (typeof b === "undefined" ? "undefined" : _typeof(b)) ? b : b + ""; }
function _toPrimitive(a, b) { if ("object" != (typeof a === "undefined" ? "undefined" : _typeof(a)) || !a) return a; var c = a[Symbol.toPrimitive]; if (void 0 !== c) { var d = c.call(a, b || "default"); if ("object" != (typeof d === "undefined" ? "undefined" : _typeof(d))) return d; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === b ? String : Number)(a); }
function _slicedToArray(a, b) { return _arrayWithHoles(a) || _iterableToArrayLimit(a, b) || _unsupportedIterableToArray(a, b) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(b, c) { if (b) { if ("string" == typeof b) return _arrayLikeToArray(b, c); var a = {}.toString.call(b).slice(8, -1); return "Object" === a && b.constructor && (a = b.constructor.name), "Map" === a || "Set" === a ? Array.from(b) : "Arguments" === a || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a) ? _arrayLikeToArray(b, c) : void 0; } }
function _arrayLikeToArray(b, c) { (null == c || c > b.length) && (c = b.length); for (var d = 0, f = Array(c); d < c; d++) f[d] = b[d]; return f; }
function _iterableToArrayLimit(b, c) { var d = null == b ? null : "undefined" != typeof Symbol && b[Symbol.iterator] || b["@@iterator"]; if (null != d) { var g, h, j, k, l = [], a = !0, m = !1; try { if (j = (d = d.call(b)).next, 0 === c) { if (Object(d) !== d) return; a = !1; } else for (; !(a = (g = j.call(d)).done) && (l.push(g.value), l.length !== c); a = !0); } catch (a) { m = !0, h = a; } finally { try { if (!a && null != d["return"] && (k = d["return"](), Object(k) !== k)) return; } finally { if (m) throw h; } } return l; } }
function _arrayWithHoles(a) { if (Array.isArray(a)) return a; }





var Sidebar = function Sidebar(a) {
  var b = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
    c = _slicedToArray(b, 2),
    d = c[0],
    e = c[1];
  var f = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    g = _slicedToArray(f, 2),
    h = g[0],
    i = g[1];
  var j = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0),
    k = _slicedToArray(j, 2),
    l = k[0],
    m = k[1];
  var n = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0),
    o = _slicedToArray(n, 2),
    p = o[0],
    q = o[1];
  var r = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useDispatch)('core/editor'),
    s = r.editPost;
  var t = function setMetaFieldValue(a, b) {
    s({
      meta: _defineProperty({}, a, b)
    });
  };

  /* Initialize the initial state */
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var a = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.select)('core/editor').getEditedPostAttribute('meta'),
      b = a._wppic_plugin_author,
      c = a._wppic_override_ratings,
      d = a._wppic_num_ratings,
      f = a._wppic_rating_percentage;

    // Set plugin author.
    if (b !== null || typeof b !== 'undefined') {
      e(b);
    } else {
      e('');
    }

    // Set override ratings.
    if (c !== null || typeof c !== 'undefined') {
      i(c);
    }

    // Set number of ratings.
    if (d !== null || typeof d !== 'undefined') {
      m(d);
    }

    // Set rating percentage.
    if (f !== null || typeof f !== 'undefined') {
      q(f);
    }
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Plugin Author', 'wp-plugin-info-card'),
    value: d,
    onChange: function onChange(a) {
      e(a);
      t('_wppic_plugin_author', a);
    },
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Enter the plugin author name, or the author of the plugin. If this is blank, the post author will be used.', 'wp-plugin-info-card')
  })), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Override the Plugin Rating', 'wp-plugin-info-card'),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('If the ratings do not match your download, or you need to enter custom values, you can enable overrides to set the rating data manually.', 'wp-plugin-info-card'),
    checked: h,
    onChange: function onChange(a) {
      i(a);
      t('_wppic_override_ratings', a);
    }
  })), h && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Number of Ratings', 'wp-plugin-info-card'),
    value: l,
    onChange: function onChange(a) {
      m(a);
      t('_wppic_num_ratings', a);
    },
    type: "number",
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Enter the number of ratings for the plugin.', 'wp-plugin-info-card')
  })), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Rating Percentage', 'wp-plugin-info-card'),
    value: p,
    onChange: function onChange(a) {
      q(a);
      t('_wppic_rating_percentage', a);
    },
    type: "number",
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Enter the rating percentage for the plugin (e.g., 95).', 'wp-plugin-info-card')
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Sidebar);

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ ((module) => {

module.exports = window["lodash"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
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
/*!**********************************!*\
  !*** ./src/plugins/EDD/index.js ***!
  \**********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sidebar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sidebar */ "./src/plugins/EDD/sidebar.js");
var registerPlugin = wp.plugins.registerPlugin;
var PluginDocumentSettingPanel = wp.editPost.PluginDocumentSettingPanel;
var __ = wp.i18n.__;

registerPlugin('wppic-edd-sidebar', {
  render: function render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PluginDocumentSettingPanel, {
      title: __('Plugin Info Card', 'wp-plugin-info-card')
    }, /*#__PURE__*/React.createElement(_sidebar__WEBPACK_IMPORTED_MODULE_0__["default"], null)));
  }
});
/******/ })()
;
//# sourceMappingURL=edd-sidebar.js.map