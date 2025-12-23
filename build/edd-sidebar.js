/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/components/InfoCardIcon.js":
/*!***********************************************!*\
  !*** ./src/blocks/components/InfoCardIcon.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const InfoCardIcon = ({
  width = 24,
  height = 24,
  fill = '#DB3939'
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
    version: "1.1",
    id: "Calque_1",
    xmlns: "http://www.w3.org/2000/svg",
    x: "0px",
    y: "0px",
    width: width,
    height: height,
    viewBox: "0 0 850.39 850.39",
    enableBackground: "new 0 0 850.39 850.39",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      fill: fill,
      d: "M425.195,2C190.366,2,0,191.918,0,426.195C0,660.472,190.366,850.39,425.195,850.39 c234.828,0,425.195-189.918,425.195-424.195C850.39,191.918,660.023,2,425.195,2z M662.409,476.302l-2.624,4.533L559.296,654.451 l78.654,45.525l-228.108,105.9L388.046,555.33l78.653,45.523l69.391-119.887l-239.354-0.303l-94.925-0.337l-28.75-0.032l-0.041-0.07 h0l-24.361-42.303l28.111-48.563l109.635-189.419l-78.653-45.524L435.859,48.514l21.797,250.546l-78.654-45.525l-69.391,119.887 l239.353,0.303l123.676,0.37l16.571,28.772l7.831,13.596L662.409,476.302z"
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InfoCardIcon);

/***/ }),

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
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





const Sidebar = props => {
  const [pluginAuthor, setPluginAuthor] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [overrideRatings, setOverrideRatings] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [numRatings, setNumRatings] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
  const [ratingPercentage, setRatingPercentage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
  const [reviewsUrl, setReviewsUrl] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [downloadsUrl, setDownloadsUrl] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const {
    editPost
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useDispatch)('core/editor');
  const setMetaFieldValue = (key, value) => {
    editPost({
      meta: {
        [key]: value
      }
    });
  };

  /* Initialize the initial state */
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const {
      _wppic_plugin_author,
      _wppic_override_ratings,
      _wppic_num_ratings,
      _wppic_rating_percentage,
      _wppic_reviews_url,
      _wppic_downloads_url
    } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.select)('core/editor').getEditedPostAttribute('meta');

    // Set plugin author.
    if (_wppic_plugin_author !== null || typeof _wppic_plugin_author !== 'undefined') {
      setPluginAuthor(_wppic_plugin_author);
    } else {
      setPluginAuthor('');
    }

    // Set override ratings.
    if (_wppic_override_ratings !== null || typeof _wppic_override_ratings !== 'undefined') {
      setOverrideRatings(_wppic_override_ratings);
    }

    // Set number of ratings.
    if (_wppic_num_ratings !== null || typeof _wppic_num_ratings !== 'undefined') {
      setNumRatings(_wppic_num_ratings);
    }

    // Set rating percentage.
    if (_wppic_rating_percentage !== null || typeof _wppic_rating_percentage !== 'undefined') {
      setRatingPercentage(_wppic_rating_percentage);
    }

    // Get reviews URL.
    if (_wppic_reviews_url !== null || typeof _wppic_reviews_url !== 'undefined') {
      setReviewsUrl(_wppic_reviews_url);
    }

    // Get the downloads URL.
    if (_wppic_downloads_url !== null || typeof _wppic_downloads_url !== 'undefined') {
      setDownloadsUrl(_wppic_downloads_url);
    }
  }, []);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Plugin Author', 'wp-plugin-info-card'),
        value: pluginAuthor,
        onChange: value => {
          setPluginAuthor(value);
          setMetaFieldValue('_wppic_plugin_author', value);
        },
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Enter the plugin author name, or the author of the plugin. If this is blank, the post author will be used.', 'wp-plugin-info-card')
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Reviews URL', 'wp-plugin-info-card'),
        value: reviewsUrl,
        onChange: value => {
          setReviewsUrl(value);
          setMetaFieldValue('_wppic_reviews_url', value);
        },
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Enter the URL that will be used to link to reviews. Otherwise, it will link to the download page.', 'wp-plugin-info-card')
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Downloads URL', 'wp-plugin-info-card'),
        value: downloadsUrl,
        onChange: value => {
          setDownloadsUrl(value);
          setMetaFieldValue('_wppic_downloads_url', value);
        },
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Enter the URL that will be used to link to your download. Otherwise, it will link to the EDD download page.', 'wp-plugin-info-card')
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Override the Plugin Rating', 'wp-plugin-info-card'),
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('If the ratings do not match your download, or you need to enter custom values, you can enable overrides to set the rating data manually.', 'wp-plugin-info-card'),
        checked: overrideRatings,
        onChange: value => {
          setOverrideRatings(value);
          setMetaFieldValue('_wppic_override_ratings', value);
        }
      })
    }), overrideRatings && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Number of Ratings', 'wp-plugin-info-card'),
          value: numRatings,
          onChange: value => {
            setNumRatings(value);
            setMetaFieldValue('_wppic_num_ratings', value);
          },
          type: "number",
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Enter the number of ratings for the plugin.', 'wp-plugin-info-card')
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Rating Percentage', 'wp-plugin-info-card'),
          value: ratingPercentage,
          onChange: value => {
            setRatingPercentage(value);
            setMetaFieldValue('_wppic_rating_percentage', value);
          },
          type: "number",
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Enter the rating percentage for the plugin (e.g., 95).', 'wp-plugin-info-card')
        })
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Sidebar);

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

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["ReactJSXRuntime"];

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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************************!*\
  !*** ./src/plugins/EDD/index.js ***!
  \**********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _blocks_components_InfoCardIcon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../blocks/components/InfoCardIcon */ "./src/blocks/components/InfoCardIcon.js");
/* harmony import */ var _sidebar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sidebar */ "./src/plugins/EDD/sidebar.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
const {
  registerPlugin
} = wp.plugins;
const {
  PluginDocumentSettingPanel
} = wp.editPost;
const {
  __
} = wp.i18n;



registerPlugin('wppic-edd-sidebar', {
  render: () => {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(PluginDocumentSettingPanel, {
        title: __('Plugin Info Card', 'wp-plugin-info-card'),
        icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_blocks_components_InfoCardIcon__WEBPACK_IMPORTED_MODULE_0__["default"], {}),
        className: "wppic-edd-sidebar",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_sidebar__WEBPACK_IMPORTED_MODULE_1__["default"], {})
      })
    });
  }
});
})();

/******/ })()
;
//# sourceMappingURL=edd-sidebar.js.map