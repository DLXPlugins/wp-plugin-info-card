/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@splidejs/react-splide/dist/js/react-splide.esm.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@splidejs/react-splide/dist/js/react-splide.esm.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Splide: function() { return /* binding */ Splide2; },
/* harmony export */   SplideSlide: function() { return /* binding */ SplideSlide; },
/* harmony export */   SplideTrack: function() { return /* binding */ SplideTrack; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
// node_modules/@splidejs/splide/dist/js/splide.esm.js
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
var MEDIA_PREFERS_REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
var CREATED = 1;
var MOUNTED = 2;
var IDLE = 3;
var MOVING = 4;
var SCROLLING = 5;
var DRAGGING = 6;
var DESTROYED = 7;
var STATES = {
  CREATED,
  MOUNTED,
  IDLE,
  MOVING,
  SCROLLING,
  DRAGGING,
  DESTROYED
};
function empty(array) {
  array.length = 0;
}
function slice(arrayLike, start, end) {
  return Array.prototype.slice.call(arrayLike, start, end);
}
function apply(func) {
  return func.bind.apply(func, [null].concat(slice(arguments, 1)));
}
var nextTick = setTimeout;
var noop = function noop2() {
};
function raf(func) {
  return requestAnimationFrame(func);
}
function typeOf(type, subject) {
  return typeof subject === type;
}
function isObject(subject) {
  return !isNull(subject) && typeOf("object", subject);
}
var isArray = Array.isArray;
var isFunction = apply(typeOf, "function");
var isString = apply(typeOf, "string");
var isUndefined = apply(typeOf, "undefined");
function isNull(subject) {
  return subject === null;
}
function isHTMLElement(subject) {
  try {
    return subject instanceof (subject.ownerDocument.defaultView || window).HTMLElement;
  } catch (e) {
    return false;
  }
}
function toArray(value) {
  return isArray(value) ? value : [value];
}
function forEach(values, iteratee) {
  toArray(values).forEach(iteratee);
}
function includes(array, value) {
  return array.indexOf(value) > -1;
}
function push(array, items) {
  array.push.apply(array, toArray(items));
  return array;
}
function toggleClass(elm, classes, add) {
  if (elm) {
    forEach(classes, function(name) {
      if (name) {
        elm.classList[add ? "add" : "remove"](name);
      }
    });
  }
}
function addClass(elm, classes) {
  toggleClass(elm, isString(classes) ? classes.split(" ") : classes, true);
}
function append(parent, children2) {
  forEach(children2, parent.appendChild.bind(parent));
}
function before(nodes, ref) {
  forEach(nodes, function(node) {
    var parent = (ref || node).parentNode;
    if (parent) {
      parent.insertBefore(node, ref);
    }
  });
}
function matches(elm, selector) {
  return isHTMLElement(elm) && (elm["msMatchesSelector"] || elm.matches).call(elm, selector);
}
function children(parent, selector) {
  var children2 = parent ? slice(parent.children) : [];
  return selector ? children2.filter(function(child2) {
    return matches(child2, selector);
  }) : children2;
}
function child(parent, selector) {
  return selector ? children(parent, selector)[0] : parent.firstElementChild;
}
var ownKeys = Object.keys;
function forOwn(object, iteratee, right) {
  if (object) {
    (right ? ownKeys(object).reverse() : ownKeys(object)).forEach(function(key) {
      key !== "__proto__" && iteratee(object[key], key);
    });
  }
  return object;
}
function assign(object) {
  slice(arguments, 1).forEach(function(source) {
    forOwn(source, function(value, key) {
      object[key] = source[key];
    });
  });
  return object;
}
function merge(object) {
  slice(arguments, 1).forEach(function(source) {
    forOwn(source, function(value, key) {
      if (isArray(value)) {
        object[key] = value.slice();
      } else if (isObject(value)) {
        object[key] = merge({}, isObject(object[key]) ? object[key] : {}, value);
      } else {
        object[key] = value;
      }
    });
  });
  return object;
}
function omit(object, keys) {
  forEach(keys || ownKeys(object), function(key) {
    delete object[key];
  });
}
function removeAttribute(elms, attrs) {
  forEach(elms, function(elm) {
    forEach(attrs, function(attr) {
      elm && elm.removeAttribute(attr);
    });
  });
}
function setAttribute(elms, attrs, value) {
  if (isObject(attrs)) {
    forOwn(attrs, function(value2, name) {
      setAttribute(elms, name, value2);
    });
  } else {
    forEach(elms, function(elm) {
      isNull(value) || value === "" ? removeAttribute(elm, attrs) : elm.setAttribute(attrs, String(value));
    });
  }
}
function create(tag, attrs, parent) {
  var elm = document.createElement(tag);
  if (attrs) {
    isString(attrs) ? addClass(elm, attrs) : setAttribute(elm, attrs);
  }
  parent && append(parent, elm);
  return elm;
}
function style(elm, prop, value) {
  if (isUndefined(value)) {
    return getComputedStyle(elm)[prop];
  }
  if (!isNull(value)) {
    elm.style[prop] = "" + value;
  }
}
function display(elm, display2) {
  style(elm, "display", display2);
}
function focus(elm) {
  elm["setActive"] && elm["setActive"]() || elm.focus({
    preventScroll: true
  });
}
function getAttribute(elm, attr) {
  return elm.getAttribute(attr);
}
function hasClass(elm, className) {
  return elm && elm.classList.contains(className);
}
function rect(target) {
  return target.getBoundingClientRect();
}
function remove(nodes) {
  forEach(nodes, function(node) {
    if (node && node.parentNode) {
      node.parentNode.removeChild(node);
    }
  });
}
function parseHtml(html) {
  return child(new DOMParser().parseFromString(html, "text/html").body);
}
function prevent(e, stopPropagation) {
  e.preventDefault();
  if (stopPropagation) {
    e.stopPropagation();
    e.stopImmediatePropagation();
  }
}
function query(parent, selector) {
  return parent && parent.querySelector(selector);
}
function queryAll(parent, selector) {
  return selector ? slice(parent.querySelectorAll(selector)) : [];
}
function removeClass(elm, classes) {
  toggleClass(elm, classes, false);
}
function timeOf(e) {
  return e.timeStamp;
}
function unit(value) {
  return isString(value) ? value : value ? value + "px" : "";
}
var PROJECT_CODE = "splide";
var DATA_ATTRIBUTE = "data-" + PROJECT_CODE;
function assert(condition, message) {
  if (!condition) {
    throw new Error("[" + PROJECT_CODE + "] " + (message || ""));
  }
}
var min = Math.min;
var max = Math.max;
var floor = Math.floor;
var ceil = Math.ceil;
var abs = Math.abs;
function approximatelyEqual(x, y, epsilon) {
  return abs(x - y) < epsilon;
}
function between(number, x, y, exclusive) {
  var minimum = min(x, y);
  var maximum = max(x, y);
  return exclusive ? minimum < number && number < maximum : minimum <= number && number <= maximum;
}
function clamp(number, x, y) {
  var minimum = min(x, y);
  var maximum = max(x, y);
  return min(max(minimum, number), maximum);
}
function sign(x) {
  return +(x > 0) - +(x < 0);
}
function format(string, replacements) {
  forEach(replacements, function(replacement) {
    string = string.replace("%s", "" + replacement);
  });
  return string;
}
function pad(number) {
  return number < 10 ? "0" + number : "" + number;
}
var ids = {};
function uniqueId(prefix) {
  return "" + prefix + pad(ids[prefix] = (ids[prefix] || 0) + 1);
}
function EventBinder() {
  var listeners = [];
  function bind(targets, events, callback, options) {
    forEachEvent(targets, events, function(target, event, namespace) {
      var isEventTarget = "addEventListener" in target;
      var remover = isEventTarget ? target.removeEventListener.bind(target, event, callback, options) : target["removeListener"].bind(target, callback);
      isEventTarget ? target.addEventListener(event, callback, options) : target["addListener"](callback);
      listeners.push([target, event, namespace, callback, remover]);
    });
  }
  function unbind(targets, events, callback) {
    forEachEvent(targets, events, function(target, event, namespace) {
      listeners = listeners.filter(function(listener) {
        if (listener[0] === target && listener[1] === event && listener[2] === namespace && (!callback || listener[3] === callback)) {
          listener[4]();
          return false;
        }
        return true;
      });
    });
  }
  function dispatch(target, type, detail) {
    var e;
    var bubbles = true;
    if (typeof CustomEvent === "function") {
      e = new CustomEvent(type, {
        bubbles,
        detail
      });
    } else {
      e = document.createEvent("CustomEvent");
      e.initCustomEvent(type, bubbles, false, detail);
    }
    target.dispatchEvent(e);
    return e;
  }
  function forEachEvent(targets, events, iteratee) {
    forEach(targets, function(target) {
      target && forEach(events, function(events2) {
        events2.split(" ").forEach(function(eventNS) {
          var fragment = eventNS.split(".");
          iteratee(target, fragment[0], fragment[1]);
        });
      });
    });
  }
  function destroy() {
    listeners.forEach(function(data) {
      data[4]();
    });
    empty(listeners);
  }
  return {
    bind,
    unbind,
    dispatch,
    destroy
  };
}
var EVENT_MOUNTED = "mounted";
var EVENT_READY = "ready";
var EVENT_MOVE = "move";
var EVENT_MOVED = "moved";
var EVENT_CLICK = "click";
var EVENT_ACTIVE = "active";
var EVENT_INACTIVE = "inactive";
var EVENT_VISIBLE = "visible";
var EVENT_HIDDEN = "hidden";
var EVENT_REFRESH = "refresh";
var EVENT_UPDATED = "updated";
var EVENT_RESIZE = "resize";
var EVENT_RESIZED = "resized";
var EVENT_DRAG = "drag";
var EVENT_DRAGGING = "dragging";
var EVENT_DRAGGED = "dragged";
var EVENT_SCROLL = "scroll";
var EVENT_SCROLLED = "scrolled";
var EVENT_OVERFLOW = "overflow";
var EVENT_DESTROY = "destroy";
var EVENT_ARROWS_MOUNTED = "arrows:mounted";
var EVENT_ARROWS_UPDATED = "arrows:updated";
var EVENT_PAGINATION_MOUNTED = "pagination:mounted";
var EVENT_PAGINATION_UPDATED = "pagination:updated";
var EVENT_NAVIGATION_MOUNTED = "navigation:mounted";
var EVENT_AUTOPLAY_PLAY = "autoplay:play";
var EVENT_AUTOPLAY_PLAYING = "autoplay:playing";
var EVENT_AUTOPLAY_PAUSE = "autoplay:pause";
var EVENT_LAZYLOAD_LOADED = "lazyload:loaded";
var EVENT_SLIDE_KEYDOWN = "sk";
var EVENT_SHIFTED = "sh";
var EVENT_END_INDEX_CHANGED = "ei";
function EventInterface(Splide22) {
  var bus = Splide22 ? Splide22.event.bus : document.createDocumentFragment();
  var binder = EventBinder();
  function on(events, callback) {
    binder.bind(bus, toArray(events).join(" "), function(e) {
      callback.apply(callback, isArray(e.detail) ? e.detail : []);
    });
  }
  function emit(event) {
    binder.dispatch(bus, event, slice(arguments, 1));
  }
  if (Splide22) {
    Splide22.event.on(EVENT_DESTROY, binder.destroy);
  }
  return assign(binder, {
    bus,
    on,
    off: apply(binder.unbind, bus),
    emit
  });
}
function RequestInterval(interval, onInterval, onUpdate, limit) {
  var now = Date.now;
  var startTime;
  var rate = 0;
  var id;
  var paused = true;
  var count = 0;
  function update() {
    if (!paused) {
      rate = interval ? min((now() - startTime) / interval, 1) : 1;
      onUpdate && onUpdate(rate);
      if (rate >= 1) {
        onInterval();
        startTime = now();
        if (limit && ++count >= limit) {
          return pause();
        }
      }
      id = raf(update);
    }
  }
  function start(resume) {
    resume || cancel();
    startTime = now() - (resume ? rate * interval : 0);
    paused = false;
    id = raf(update);
  }
  function pause() {
    paused = true;
  }
  function rewind() {
    startTime = now();
    rate = 0;
    if (onUpdate) {
      onUpdate(rate);
    }
  }
  function cancel() {
    id && cancelAnimationFrame(id);
    rate = 0;
    id = 0;
    paused = true;
  }
  function set(time) {
    interval = time;
  }
  function isPaused() {
    return paused;
  }
  return {
    start,
    rewind,
    pause,
    cancel,
    set,
    isPaused
  };
}
function State(initialState) {
  var state = initialState;
  function set(value) {
    state = value;
  }
  function is(states) {
    return includes(toArray(states), state);
  }
  return {
    set,
    is
  };
}
function Throttle(func, duration) {
  var interval = RequestInterval(duration || 0, func, null, 1);
  return function() {
    interval.isPaused() && interval.start();
  };
}
function Media(Splide22, Components2, options) {
  var state = Splide22.state;
  var breakpoints = options.breakpoints || {};
  var reducedMotion = options.reducedMotion || {};
  var binder = EventBinder();
  var queries = [];
  function setup() {
    var isMin = options.mediaQuery === "min";
    ownKeys(breakpoints).sort(function(n, m) {
      return isMin ? +n - +m : +m - +n;
    }).forEach(function(key) {
      register(breakpoints[key], "(" + (isMin ? "min" : "max") + "-width:" + key + "px)");
    });
    register(reducedMotion, MEDIA_PREFERS_REDUCED_MOTION);
    update();
  }
  function destroy(completely) {
    if (completely) {
      binder.destroy();
    }
  }
  function register(options2, query2) {
    var queryList = matchMedia(query2);
    binder.bind(queryList, "change", update);
    queries.push([options2, queryList]);
  }
  function update() {
    var destroyed = state.is(DESTROYED);
    var direction = options.direction;
    var merged = queries.reduce(function(merged2, entry) {
      return merge(merged2, entry[1].matches ? entry[0] : {});
    }, {});
    omit(options);
    set(merged);
    if (options.destroy) {
      Splide22.destroy(options.destroy === "completely");
    } else if (destroyed) {
      destroy(true);
      Splide22.mount();
    } else {
      direction !== options.direction && Splide22.refresh();
    }
  }
  function reduce(enable) {
    if (matchMedia(MEDIA_PREFERS_REDUCED_MOTION).matches) {
      enable ? merge(options, reducedMotion) : omit(options, ownKeys(reducedMotion));
    }
  }
  function set(opts, base, notify) {
    merge(options, opts);
    base && merge(Object.getPrototypeOf(options), opts);
    if (notify || !state.is(CREATED)) {
      Splide22.emit(EVENT_UPDATED, options);
    }
  }
  return {
    setup,
    destroy,
    reduce,
    set
  };
}
var ARROW = "Arrow";
var ARROW_LEFT = ARROW + "Left";
var ARROW_RIGHT = ARROW + "Right";
var ARROW_UP = ARROW + "Up";
var ARROW_DOWN = ARROW + "Down";
var RTL = "rtl";
var TTB = "ttb";
var ORIENTATION_MAP = {
  width: ["height"],
  left: ["top", "right"],
  right: ["bottom", "left"],
  x: ["y"],
  X: ["Y"],
  Y: ["X"],
  ArrowLeft: [ARROW_UP, ARROW_RIGHT],
  ArrowRight: [ARROW_DOWN, ARROW_LEFT]
};
function Direction(Splide22, Components2, options) {
  function resolve(prop, axisOnly, direction) {
    direction = direction || options.direction;
    var index = direction === RTL && !axisOnly ? 1 : direction === TTB ? 0 : -1;
    return ORIENTATION_MAP[prop] && ORIENTATION_MAP[prop][index] || prop.replace(/width|left|right/i, function(match, offset) {
      var replacement = ORIENTATION_MAP[match.toLowerCase()][index] || match;
      return offset > 0 ? replacement.charAt(0).toUpperCase() + replacement.slice(1) : replacement;
    });
  }
  function orient(value) {
    return value * (options.direction === RTL ? 1 : -1);
  }
  return {
    resolve,
    orient
  };
}
var ROLE = "role";
var TAB_INDEX = "tabindex";
var DISABLED = "disabled";
var ARIA_PREFIX = "aria-";
var ARIA_CONTROLS = ARIA_PREFIX + "controls";
var ARIA_CURRENT = ARIA_PREFIX + "current";
var ARIA_SELECTED = ARIA_PREFIX + "selected";
var ARIA_LABEL = ARIA_PREFIX + "label";
var ARIA_LABELLEDBY = ARIA_PREFIX + "labelledby";
var ARIA_HIDDEN = ARIA_PREFIX + "hidden";
var ARIA_ORIENTATION = ARIA_PREFIX + "orientation";
var ARIA_ROLEDESCRIPTION = ARIA_PREFIX + "roledescription";
var ARIA_LIVE = ARIA_PREFIX + "live";
var ARIA_BUSY = ARIA_PREFIX + "busy";
var ARIA_ATOMIC = ARIA_PREFIX + "atomic";
var ALL_ATTRIBUTES = [ROLE, TAB_INDEX, DISABLED, ARIA_CONTROLS, ARIA_CURRENT, ARIA_LABEL, ARIA_LABELLEDBY, ARIA_HIDDEN, ARIA_ORIENTATION, ARIA_ROLEDESCRIPTION];
var CLASS_PREFIX = PROJECT_CODE + "__";
var STATUS_CLASS_PREFIX = "is-";
var CLASS_ROOT = PROJECT_CODE;
var CLASS_TRACK = CLASS_PREFIX + "track";
var CLASS_LIST = CLASS_PREFIX + "list";
var CLASS_SLIDE = CLASS_PREFIX + "slide";
var CLASS_CLONE = CLASS_SLIDE + "--clone";
var CLASS_CONTAINER = CLASS_SLIDE + "__container";
var CLASS_ARROWS = CLASS_PREFIX + "arrows";
var CLASS_ARROW = CLASS_PREFIX + "arrow";
var CLASS_ARROW_PREV = CLASS_ARROW + "--prev";
var CLASS_ARROW_NEXT = CLASS_ARROW + "--next";
var CLASS_PAGINATION = CLASS_PREFIX + "pagination";
var CLASS_PAGINATION_PAGE = CLASS_PAGINATION + "__page";
var CLASS_PROGRESS = CLASS_PREFIX + "progress";
var CLASS_PROGRESS_BAR = CLASS_PROGRESS + "__bar";
var CLASS_TOGGLE = CLASS_PREFIX + "toggle";
var CLASS_TOGGLE_PLAY = CLASS_TOGGLE + "__play";
var CLASS_TOGGLE_PAUSE = CLASS_TOGGLE + "__pause";
var CLASS_SPINNER = CLASS_PREFIX + "spinner";
var CLASS_SR = CLASS_PREFIX + "sr";
var CLASS_INITIALIZED = STATUS_CLASS_PREFIX + "initialized";
var CLASS_ACTIVE = STATUS_CLASS_PREFIX + "active";
var CLASS_PREV = STATUS_CLASS_PREFIX + "prev";
var CLASS_NEXT = STATUS_CLASS_PREFIX + "next";
var CLASS_VISIBLE = STATUS_CLASS_PREFIX + "visible";
var CLASS_LOADING = STATUS_CLASS_PREFIX + "loading";
var CLASS_FOCUS_IN = STATUS_CLASS_PREFIX + "focus-in";
var CLASS_OVERFLOW = STATUS_CLASS_PREFIX + "overflow";
var STATUS_CLASSES = [CLASS_ACTIVE, CLASS_VISIBLE, CLASS_PREV, CLASS_NEXT, CLASS_LOADING, CLASS_FOCUS_IN, CLASS_OVERFLOW];
var CLASSES = {
  slide: CLASS_SLIDE,
  clone: CLASS_CLONE,
  arrows: CLASS_ARROWS,
  arrow: CLASS_ARROW,
  prev: CLASS_ARROW_PREV,
  next: CLASS_ARROW_NEXT,
  pagination: CLASS_PAGINATION,
  page: CLASS_PAGINATION_PAGE,
  spinner: CLASS_SPINNER
};
function closest(from, selector) {
  if (isFunction(from.closest)) {
    return from.closest(selector);
  }
  var elm = from;
  while (elm && elm.nodeType === 1) {
    if (matches(elm, selector)) {
      break;
    }
    elm = elm.parentElement;
  }
  return elm;
}
var FRICTION = 5;
var LOG_INTERVAL = 200;
var POINTER_DOWN_EVENTS = "touchstart mousedown";
var POINTER_MOVE_EVENTS = "touchmove mousemove";
var POINTER_UP_EVENTS = "touchend touchcancel mouseup click";
function Elements(Splide22, Components2, options) {
  var _EventInterface = EventInterface(Splide22), on = _EventInterface.on, bind = _EventInterface.bind;
  var root = Splide22.root;
  var i18n = options.i18n;
  var elements = {};
  var slides = [];
  var rootClasses = [];
  var trackClasses = [];
  var track;
  var list;
  var isUsingKey;
  function setup() {
    collect();
    init();
    update();
  }
  function mount() {
    on(EVENT_REFRESH, destroy);
    on(EVENT_REFRESH, setup);
    on(EVENT_UPDATED, update);
    bind(document, POINTER_DOWN_EVENTS + " keydown", function(e) {
      isUsingKey = e.type === "keydown";
    }, {
      capture: true
    });
    bind(root, "focusin", function() {
      toggleClass(root, CLASS_FOCUS_IN, !!isUsingKey);
    });
  }
  function destroy(completely) {
    var attrs = ALL_ATTRIBUTES.concat("style");
    empty(slides);
    removeClass(root, rootClasses);
    removeClass(track, trackClasses);
    removeAttribute([track, list], attrs);
    removeAttribute(root, completely ? attrs : ["style", ARIA_ROLEDESCRIPTION]);
  }
  function update() {
    removeClass(root, rootClasses);
    removeClass(track, trackClasses);
    rootClasses = getClasses(CLASS_ROOT);
    trackClasses = getClasses(CLASS_TRACK);
    addClass(root, rootClasses);
    addClass(track, trackClasses);
    setAttribute(root, ARIA_LABEL, options.label);
    setAttribute(root, ARIA_LABELLEDBY, options.labelledby);
  }
  function collect() {
    track = find("." + CLASS_TRACK);
    list = child(track, "." + CLASS_LIST);
    assert(track && list, "A track/list element is missing.");
    push(slides, children(list, "." + CLASS_SLIDE + ":not(." + CLASS_CLONE + ")"));
    forOwn({
      arrows: CLASS_ARROWS,
      pagination: CLASS_PAGINATION,
      prev: CLASS_ARROW_PREV,
      next: CLASS_ARROW_NEXT,
      bar: CLASS_PROGRESS_BAR,
      toggle: CLASS_TOGGLE
    }, function(className, key) {
      elements[key] = find("." + className);
    });
    assign(elements, {
      root,
      track,
      list,
      slides
    });
  }
  function init() {
    var id = root.id || uniqueId(PROJECT_CODE);
    var role = options.role;
    root.id = id;
    track.id = track.id || id + "-track";
    list.id = list.id || id + "-list";
    if (!getAttribute(root, ROLE) && root.tagName !== "SECTION" && role) {
      setAttribute(root, ROLE, role);
    }
    setAttribute(root, ARIA_ROLEDESCRIPTION, i18n.carousel);
    setAttribute(list, ROLE, "presentation");
  }
  function find(selector) {
    var elm = query(root, selector);
    return elm && closest(elm, "." + CLASS_ROOT) === root ? elm : void 0;
  }
  function getClasses(base) {
    return [base + "--" + options.type, base + "--" + options.direction, options.drag && base + "--draggable", options.isNavigation && base + "--nav", base === CLASS_ROOT && CLASS_ACTIVE];
  }
  return assign(elements, {
    setup,
    mount,
    destroy
  });
}
var SLIDE = "slide";
var LOOP = "loop";
var FADE = "fade";
function Slide$1(Splide22, index, slideIndex, slide) {
  var event = EventInterface(Splide22);
  var on = event.on, emit = event.emit, bind = event.bind;
  var Components = Splide22.Components, root = Splide22.root, options = Splide22.options;
  var isNavigation = options.isNavigation, updateOnMove = options.updateOnMove, i18n = options.i18n, pagination = options.pagination, slideFocus = options.slideFocus;
  var resolve = Components.Direction.resolve;
  var styles = getAttribute(slide, "style");
  var label = getAttribute(slide, ARIA_LABEL);
  var isClone = slideIndex > -1;
  var container = child(slide, "." + CLASS_CONTAINER);
  var destroyed;
  function mount() {
    if (!isClone) {
      slide.id = root.id + "-slide" + pad(index + 1);
      setAttribute(slide, ROLE, pagination ? "tabpanel" : "group");
      setAttribute(slide, ARIA_ROLEDESCRIPTION, i18n.slide);
      setAttribute(slide, ARIA_LABEL, label || format(i18n.slideLabel, [index + 1, Splide22.length]));
    }
    listen();
  }
  function listen() {
    bind(slide, "click", apply(emit, EVENT_CLICK, self));
    bind(slide, "keydown", apply(emit, EVENT_SLIDE_KEYDOWN, self));
    on([EVENT_MOVED, EVENT_SHIFTED, EVENT_SCROLLED], update);
    on(EVENT_NAVIGATION_MOUNTED, initNavigation);
    if (updateOnMove) {
      on(EVENT_MOVE, onMove);
    }
  }
  function destroy() {
    destroyed = true;
    event.destroy();
    removeClass(slide, STATUS_CLASSES);
    removeAttribute(slide, ALL_ATTRIBUTES);
    setAttribute(slide, "style", styles);
    setAttribute(slide, ARIA_LABEL, label || "");
  }
  function initNavigation() {
    var controls = Splide22.splides.map(function(target) {
      var Slide2 = target.splide.Components.Slides.getAt(index);
      return Slide2 ? Slide2.slide.id : "";
    }).join(" ");
    setAttribute(slide, ARIA_LABEL, format(i18n.slideX, (isClone ? slideIndex : index) + 1));
    setAttribute(slide, ARIA_CONTROLS, controls);
    setAttribute(slide, ROLE, slideFocus ? "button" : "");
    slideFocus && removeAttribute(slide, ARIA_ROLEDESCRIPTION);
  }
  function onMove() {
    if (!destroyed) {
      update();
    }
  }
  function update() {
    if (!destroyed) {
      var curr = Splide22.index;
      updateActivity();
      updateVisibility();
      toggleClass(slide, CLASS_PREV, index === curr - 1);
      toggleClass(slide, CLASS_NEXT, index === curr + 1);
    }
  }
  function updateActivity() {
    var active = isActive();
    if (active !== hasClass(slide, CLASS_ACTIVE)) {
      toggleClass(slide, CLASS_ACTIVE, active);
      setAttribute(slide, ARIA_CURRENT, isNavigation && active || "");
      emit(active ? EVENT_ACTIVE : EVENT_INACTIVE, self);
    }
  }
  function updateVisibility() {
    var visible = isVisible();
    var hidden = !visible && (!isActive() || isClone);
    if (!Splide22.state.is([MOVING, SCROLLING])) {
      setAttribute(slide, ARIA_HIDDEN, hidden || "");
    }
    setAttribute(queryAll(slide, options.focusableNodes || ""), TAB_INDEX, hidden ? -1 : "");
    if (slideFocus) {
      setAttribute(slide, TAB_INDEX, hidden ? -1 : 0);
    }
    if (visible !== hasClass(slide, CLASS_VISIBLE)) {
      toggleClass(slide, CLASS_VISIBLE, visible);
      emit(visible ? EVENT_VISIBLE : EVENT_HIDDEN, self);
    }
    if (!visible && document.activeElement === slide) {
      var Slide2 = Components.Slides.getAt(Splide22.index);
      Slide2 && focus(Slide2.slide);
    }
  }
  function style$1(prop, value, useContainer) {
    style(useContainer && container || slide, prop, value);
  }
  function isActive() {
    var curr = Splide22.index;
    return curr === index || options.cloneStatus && curr === slideIndex;
  }
  function isVisible() {
    if (Splide22.is(FADE)) {
      return isActive();
    }
    var trackRect = rect(Components.Elements.track);
    var slideRect = rect(slide);
    var left = resolve("left", true);
    var right = resolve("right", true);
    return floor(trackRect[left]) <= ceil(slideRect[left]) && floor(slideRect[right]) <= ceil(trackRect[right]);
  }
  function isWithin(from, distance) {
    var diff = abs(from - index);
    if (!isClone && (options.rewind || Splide22.is(LOOP))) {
      diff = min(diff, Splide22.length - diff);
    }
    return diff <= distance;
  }
  var self = {
    index,
    slideIndex,
    slide,
    container,
    isClone,
    mount,
    destroy,
    update,
    style: style$1,
    isWithin
  };
  return self;
}
function Slides(Splide22, Components2, options) {
  var _EventInterface2 = EventInterface(Splide22), on = _EventInterface2.on, emit = _EventInterface2.emit, bind = _EventInterface2.bind;
  var _Components2$Elements = Components2.Elements, slides = _Components2$Elements.slides, list = _Components2$Elements.list;
  var Slides2 = [];
  function mount() {
    init();
    on(EVENT_REFRESH, destroy);
    on(EVENT_REFRESH, init);
  }
  function init() {
    slides.forEach(function(slide, index) {
      register(slide, index, -1);
    });
  }
  function destroy() {
    forEach$1(function(Slide2) {
      Slide2.destroy();
    });
    empty(Slides2);
  }
  function update() {
    forEach$1(function(Slide2) {
      Slide2.update();
    });
  }
  function register(slide, index, slideIndex) {
    var object = Slide$1(Splide22, index, slideIndex, slide);
    object.mount();
    Slides2.push(object);
    Slides2.sort(function(Slide1, Slide2) {
      return Slide1.index - Slide2.index;
    });
  }
  function get(excludeClones) {
    return excludeClones ? filter(function(Slide2) {
      return !Slide2.isClone;
    }) : Slides2;
  }
  function getIn(page) {
    var Controller2 = Components2.Controller;
    var index = Controller2.toIndex(page);
    var max2 = Controller2.hasFocus() ? 1 : options.perPage;
    return filter(function(Slide2) {
      return between(Slide2.index, index, index + max2 - 1);
    });
  }
  function getAt(index) {
    return filter(index)[0];
  }
  function add(items, index) {
    forEach(items, function(slide) {
      if (isString(slide)) {
        slide = parseHtml(slide);
      }
      if (isHTMLElement(slide)) {
        var ref = slides[index];
        ref ? before(slide, ref) : append(list, slide);
        addClass(slide, options.classes.slide);
        observeImages(slide, apply(emit, EVENT_RESIZE));
      }
    });
    emit(EVENT_REFRESH);
  }
  function remove$1(matcher) {
    remove(filter(matcher).map(function(Slide2) {
      return Slide2.slide;
    }));
    emit(EVENT_REFRESH);
  }
  function forEach$1(iteratee, excludeClones) {
    get(excludeClones).forEach(iteratee);
  }
  function filter(matcher) {
    return Slides2.filter(isFunction(matcher) ? matcher : function(Slide2) {
      return isString(matcher) ? matches(Slide2.slide, matcher) : includes(toArray(matcher), Slide2.index);
    });
  }
  function style2(prop, value, useContainer) {
    forEach$1(function(Slide2) {
      Slide2.style(prop, value, useContainer);
    });
  }
  function observeImages(elm, callback) {
    var images = queryAll(elm, "img");
    var length = images.length;
    if (length) {
      images.forEach(function(img) {
        bind(img, "load error", function() {
          if (!--length) {
            callback();
          }
        });
      });
    } else {
      callback();
    }
  }
  function getLength(excludeClones) {
    return excludeClones ? slides.length : Slides2.length;
  }
  function isEnough() {
    return Slides2.length > options.perPage;
  }
  return {
    mount,
    destroy,
    update,
    register,
    get,
    getIn,
    getAt,
    add,
    remove: remove$1,
    forEach: forEach$1,
    filter,
    style: style2,
    getLength,
    isEnough
  };
}
function Layout(Splide22, Components2, options) {
  var _EventInterface3 = EventInterface(Splide22), on = _EventInterface3.on, bind = _EventInterface3.bind, emit = _EventInterface3.emit;
  var Slides2 = Components2.Slides;
  var resolve = Components2.Direction.resolve;
  var _Components2$Elements2 = Components2.Elements, root = _Components2$Elements2.root, track = _Components2$Elements2.track, list = _Components2$Elements2.list;
  var getAt = Slides2.getAt, styleSlides = Slides2.style;
  var vertical;
  var rootRect;
  var overflow;
  function mount() {
    init();
    bind(window, "resize load", Throttle(apply(emit, EVENT_RESIZE)));
    on([EVENT_UPDATED, EVENT_REFRESH], init);
    on(EVENT_RESIZE, resize);
  }
  function init() {
    vertical = options.direction === TTB;
    style(root, "maxWidth", unit(options.width));
    style(track, resolve("paddingLeft"), cssPadding(false));
    style(track, resolve("paddingRight"), cssPadding(true));
    resize(true);
  }
  function resize(force) {
    var newRect = rect(root);
    if (force || rootRect.width !== newRect.width || rootRect.height !== newRect.height) {
      style(track, "height", cssTrackHeight());
      styleSlides(resolve("marginRight"), unit(options.gap));
      styleSlides("width", cssSlideWidth());
      styleSlides("height", cssSlideHeight(), true);
      rootRect = newRect;
      emit(EVENT_RESIZED);
      if (overflow !== (overflow = isOverflow())) {
        toggleClass(root, CLASS_OVERFLOW, overflow);
        emit(EVENT_OVERFLOW, overflow);
      }
    }
  }
  function cssPadding(right) {
    var padding = options.padding;
    var prop = resolve(right ? "right" : "left");
    return padding && unit(padding[prop] || (isObject(padding) ? 0 : padding)) || "0px";
  }
  function cssTrackHeight() {
    var height = "";
    if (vertical) {
      height = cssHeight();
      assert(height, "height or heightRatio is missing.");
      height = "calc(" + height + " - " + cssPadding(false) + " - " + cssPadding(true) + ")";
    }
    return height;
  }
  function cssHeight() {
    return unit(options.height || rect(list).width * options.heightRatio);
  }
  function cssSlideWidth() {
    return options.autoWidth ? null : unit(options.fixedWidth) || (vertical ? "" : cssSlideSize());
  }
  function cssSlideHeight() {
    return unit(options.fixedHeight) || (vertical ? options.autoHeight ? null : cssSlideSize() : cssHeight());
  }
  function cssSlideSize() {
    var gap = unit(options.gap);
    return "calc((100%" + (gap && " + " + gap) + ")/" + (options.perPage || 1) + (gap && " - " + gap) + ")";
  }
  function listSize() {
    return rect(list)[resolve("width")];
  }
  function slideSize(index, withoutGap) {
    var Slide2 = getAt(index || 0);
    return Slide2 ? rect(Slide2.slide)[resolve("width")] + (withoutGap ? 0 : getGap()) : 0;
  }
  function totalSize(index, withoutGap) {
    var Slide2 = getAt(index);
    if (Slide2) {
      var right = rect(Slide2.slide)[resolve("right")];
      var left = rect(list)[resolve("left")];
      return abs(right - left) + (withoutGap ? 0 : getGap());
    }
    return 0;
  }
  function sliderSize(withoutGap) {
    return totalSize(Splide22.length - 1) - totalSize(0) + slideSize(0, withoutGap);
  }
  function getGap() {
    var Slide2 = getAt(0);
    return Slide2 && parseFloat(style(Slide2.slide, resolve("marginRight"))) || 0;
  }
  function getPadding(right) {
    return parseFloat(style(track, resolve("padding" + (right ? "Right" : "Left")))) || 0;
  }
  function isOverflow() {
    return Splide22.is(FADE) || sliderSize(true) > listSize();
  }
  return {
    mount,
    resize,
    listSize,
    slideSize,
    sliderSize,
    totalSize,
    getPadding,
    isOverflow
  };
}
var MULTIPLIER = 2;
function Clones(Splide22, Components2, options) {
  var event = EventInterface(Splide22);
  var on = event.on;
  var Elements2 = Components2.Elements, Slides2 = Components2.Slides;
  var resolve = Components2.Direction.resolve;
  var clones = [];
  var cloneCount;
  function mount() {
    on(EVENT_REFRESH, remount);
    on([EVENT_UPDATED, EVENT_RESIZE], observe);
    if (cloneCount = computeCloneCount()) {
      generate(cloneCount);
      Components2.Layout.resize(true);
    }
  }
  function remount() {
    destroy();
    mount();
  }
  function destroy() {
    remove(clones);
    empty(clones);
    event.destroy();
  }
  function observe() {
    var count = computeCloneCount();
    if (cloneCount !== count) {
      if (cloneCount < count || !count) {
        event.emit(EVENT_REFRESH);
      }
    }
  }
  function generate(count) {
    var slides = Slides2.get().slice();
    var length = slides.length;
    if (length) {
      while (slides.length < count) {
        push(slides, slides);
      }
      push(slides.slice(-count), slides.slice(0, count)).forEach(function(Slide2, index) {
        var isHead = index < count;
        var clone = cloneDeep(Slide2.slide, index);
        isHead ? before(clone, slides[0].slide) : append(Elements2.list, clone);
        push(clones, clone);
        Slides2.register(clone, index - count + (isHead ? 0 : length), Slide2.index);
      });
    }
  }
  function cloneDeep(elm, index) {
    var clone = elm.cloneNode(true);
    addClass(clone, options.classes.clone);
    clone.id = Splide22.root.id + "-clone" + pad(index + 1);
    return clone;
  }
  function computeCloneCount() {
    var clones2 = options.clones;
    if (!Splide22.is(LOOP)) {
      clones2 = 0;
    } else if (isUndefined(clones2)) {
      var fixedSize = options[resolve("fixedWidth")] && Components2.Layout.slideSize(0);
      var fixedCount = fixedSize && ceil(rect(Elements2.track)[resolve("width")] / fixedSize);
      clones2 = fixedCount || options[resolve("autoWidth")] && Splide22.length || options.perPage * MULTIPLIER;
    }
    return clones2;
  }
  return {
    mount,
    destroy
  };
}
function Move(Splide22, Components2, options) {
  var _EventInterface4 = EventInterface(Splide22), on = _EventInterface4.on, emit = _EventInterface4.emit;
  var set = Splide22.state.set;
  var _Components2$Layout = Components2.Layout, slideSize = _Components2$Layout.slideSize, getPadding = _Components2$Layout.getPadding, totalSize = _Components2$Layout.totalSize, listSize = _Components2$Layout.listSize, sliderSize = _Components2$Layout.sliderSize;
  var _Components2$Directio = Components2.Direction, resolve = _Components2$Directio.resolve, orient = _Components2$Directio.orient;
  var _Components2$Elements3 = Components2.Elements, list = _Components2$Elements3.list, track = _Components2$Elements3.track;
  var Transition;
  function mount() {
    Transition = Components2.Transition;
    on([EVENT_MOUNTED, EVENT_RESIZED, EVENT_UPDATED, EVENT_REFRESH], reposition);
  }
  function reposition() {
    if (!Components2.Controller.isBusy()) {
      Components2.Scroll.cancel();
      jump(Splide22.index);
      Components2.Slides.update();
    }
  }
  function move(dest, index, prev, callback) {
    if (dest !== index && canShift(dest > prev)) {
      cancel();
      translate(shift(getPosition(), dest > prev), true);
    }
    set(MOVING);
    emit(EVENT_MOVE, index, prev, dest);
    Transition.start(index, function() {
      set(IDLE);
      emit(EVENT_MOVED, index, prev, dest);
      callback && callback();
    });
  }
  function jump(index) {
    translate(toPosition(index, true));
  }
  function translate(position, preventLoop) {
    if (!Splide22.is(FADE)) {
      var destination = preventLoop ? position : loop(position);
      style(list, "transform", "translate" + resolve("X") + "(" + destination + "px)");
      position !== destination && emit(EVENT_SHIFTED);
    }
  }
  function loop(position) {
    if (Splide22.is(LOOP)) {
      var index = toIndex(position);
      var exceededMax = index > Components2.Controller.getEnd();
      var exceededMin = index < 0;
      if (exceededMin || exceededMax) {
        position = shift(position, exceededMax);
      }
    }
    return position;
  }
  function shift(position, backwards) {
    var excess = position - getLimit(backwards);
    var size = sliderSize();
    position -= orient(size * (ceil(abs(excess) / size) || 1)) * (backwards ? 1 : -1);
    return position;
  }
  function cancel() {
    translate(getPosition(), true);
    Transition.cancel();
  }
  function toIndex(position) {
    var Slides2 = Components2.Slides.get();
    var index = 0;
    var minDistance = Infinity;
    for (var i = 0; i < Slides2.length; i++) {
      var slideIndex = Slides2[i].index;
      var distance = abs(toPosition(slideIndex, true) - position);
      if (distance <= minDistance) {
        minDistance = distance;
        index = slideIndex;
      } else {
        break;
      }
    }
    return index;
  }
  function toPosition(index, trimming) {
    var position = orient(totalSize(index - 1) - offset(index));
    return trimming ? trim(position) : position;
  }
  function getPosition() {
    var left = resolve("left");
    return rect(list)[left] - rect(track)[left] + orient(getPadding(false));
  }
  function trim(position) {
    if (options.trimSpace && Splide22.is(SLIDE)) {
      position = clamp(position, 0, orient(sliderSize(true) - listSize()));
    }
    return position;
  }
  function offset(index) {
    var focus2 = options.focus;
    return focus2 === "center" ? (listSize() - slideSize(index, true)) / 2 : +focus2 * slideSize(index) || 0;
  }
  function getLimit(max2) {
    return toPosition(max2 ? Components2.Controller.getEnd() : 0, !!options.trimSpace);
  }
  function canShift(backwards) {
    var shifted = orient(shift(getPosition(), backwards));
    return backwards ? shifted >= 0 : shifted <= list[resolve("scrollWidth")] - rect(track)[resolve("width")];
  }
  function exceededLimit(max2, position) {
    position = isUndefined(position) ? getPosition() : position;
    var exceededMin = max2 !== true && orient(position) < orient(getLimit(false));
    var exceededMax = max2 !== false && orient(position) > orient(getLimit(true));
    return exceededMin || exceededMax;
  }
  return {
    mount,
    move,
    jump,
    translate,
    shift,
    cancel,
    toIndex,
    toPosition,
    getPosition,
    getLimit,
    exceededLimit,
    reposition
  };
}
function Controller(Splide22, Components2, options) {
  var _EventInterface5 = EventInterface(Splide22), on = _EventInterface5.on, emit = _EventInterface5.emit;
  var Move2 = Components2.Move;
  var getPosition = Move2.getPosition, getLimit = Move2.getLimit, toPosition = Move2.toPosition;
  var _Components2$Slides = Components2.Slides, isEnough = _Components2$Slides.isEnough, getLength = _Components2$Slides.getLength;
  var omitEnd = options.omitEnd;
  var isLoop = Splide22.is(LOOP);
  var isSlide = Splide22.is(SLIDE);
  var getNext = apply(getAdjacent, false);
  var getPrev = apply(getAdjacent, true);
  var currIndex = options.start || 0;
  var endIndex;
  var prevIndex = currIndex;
  var slideCount;
  var perMove;
  var perPage;
  function mount() {
    init();
    on([EVENT_UPDATED, EVENT_REFRESH, EVENT_END_INDEX_CHANGED], init);
    on(EVENT_RESIZED, onResized);
  }
  function init() {
    slideCount = getLength(true);
    perMove = options.perMove;
    perPage = options.perPage;
    endIndex = getEnd();
    var index = clamp(currIndex, 0, omitEnd ? endIndex : slideCount - 1);
    if (index !== currIndex) {
      currIndex = index;
      Move2.reposition();
    }
  }
  function onResized() {
    if (endIndex !== getEnd()) {
      emit(EVENT_END_INDEX_CHANGED);
    }
  }
  function go(control, allowSameIndex, callback) {
    if (!isBusy()) {
      var dest = parse(control);
      var index = loop(dest);
      if (index > -1 && (allowSameIndex || index !== currIndex)) {
        setIndex(index);
        Move2.move(dest, index, prevIndex, callback);
      }
    }
  }
  function scroll(destination, duration, snap, callback) {
    Components2.Scroll.scroll(destination, duration, snap, function() {
      var index = loop(Move2.toIndex(getPosition()));
      setIndex(omitEnd ? min(index, endIndex) : index);
      callback && callback();
    });
  }
  function parse(control) {
    var index = currIndex;
    if (isString(control)) {
      var _ref = control.match(/([+\-<>])(\d+)?/) || [], indicator = _ref[1], number = _ref[2];
      if (indicator === "+" || indicator === "-") {
        index = computeDestIndex(currIndex + +("" + indicator + (+number || 1)), currIndex);
      } else if (indicator === ">") {
        index = number ? toIndex(+number) : getNext(true);
      } else if (indicator === "<") {
        index = getPrev(true);
      }
    } else {
      index = isLoop ? control : clamp(control, 0, endIndex);
    }
    return index;
  }
  function getAdjacent(prev, destination) {
    var number = perMove || (hasFocus() ? 1 : perPage);
    var dest = computeDestIndex(currIndex + number * (prev ? -1 : 1), currIndex, !(perMove || hasFocus()));
    if (dest === -1 && isSlide) {
      if (!approximatelyEqual(getPosition(), getLimit(!prev), 1)) {
        return prev ? 0 : endIndex;
      }
    }
    return destination ? dest : loop(dest);
  }
  function computeDestIndex(dest, from, snapPage) {
    if (isEnough() || hasFocus()) {
      var index = computeMovableDestIndex(dest);
      if (index !== dest) {
        from = dest;
        dest = index;
        snapPage = false;
      }
      if (dest < 0 || dest > endIndex) {
        if (!perMove && (between(0, dest, from, true) || between(endIndex, from, dest, true))) {
          dest = toIndex(toPage(dest));
        } else {
          if (isLoop) {
            dest = snapPage ? dest < 0 ? -(slideCount % perPage || perPage) : slideCount : dest;
          } else if (options.rewind) {
            dest = dest < 0 ? endIndex : 0;
          } else {
            dest = -1;
          }
        }
      } else {
        if (snapPage && dest !== from) {
          dest = toIndex(toPage(from) + (dest < from ? -1 : 1));
        }
      }
    } else {
      dest = -1;
    }
    return dest;
  }
  function computeMovableDestIndex(dest) {
    if (isSlide && options.trimSpace === "move" && dest !== currIndex) {
      var position = getPosition();
      while (position === toPosition(dest, true) && between(dest, 0, Splide22.length - 1, !options.rewind)) {
        dest < currIndex ? --dest : ++dest;
      }
    }
    return dest;
  }
  function loop(index) {
    return isLoop ? (index + slideCount) % slideCount || 0 : index;
  }
  function getEnd() {
    var end = slideCount - (hasFocus() || isLoop && perMove ? 1 : perPage);
    while (omitEnd && end-- > 0) {
      if (toPosition(slideCount - 1, true) !== toPosition(end, true)) {
        end++;
        break;
      }
    }
    return clamp(end, 0, slideCount - 1);
  }
  function toIndex(page) {
    return clamp(hasFocus() ? page : perPage * page, 0, endIndex);
  }
  function toPage(index) {
    return hasFocus() ? min(index, endIndex) : floor((index >= endIndex ? slideCount - 1 : index) / perPage);
  }
  function toDest(destination) {
    var closest2 = Move2.toIndex(destination);
    return isSlide ? clamp(closest2, 0, endIndex) : closest2;
  }
  function setIndex(index) {
    if (index !== currIndex) {
      prevIndex = currIndex;
      currIndex = index;
    }
  }
  function getIndex(prev) {
    return prev ? prevIndex : currIndex;
  }
  function hasFocus() {
    return !isUndefined(options.focus) || options.isNavigation;
  }
  function isBusy() {
    return Splide22.state.is([MOVING, SCROLLING]) && !!options.waitForTransition;
  }
  return {
    mount,
    go,
    scroll,
    getNext,
    getPrev,
    getAdjacent,
    getEnd,
    setIndex,
    getIndex,
    toIndex,
    toPage,
    toDest,
    hasFocus,
    isBusy
  };
}
var XML_NAME_SPACE = "http://www.w3.org/2000/svg";
var PATH = "m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z";
var SIZE = 40;
function Arrows(Splide22, Components2, options) {
  var event = EventInterface(Splide22);
  var on = event.on, bind = event.bind, emit = event.emit;
  var classes = options.classes, i18n = options.i18n;
  var Elements2 = Components2.Elements, Controller2 = Components2.Controller;
  var placeholder = Elements2.arrows, track = Elements2.track;
  var wrapper = placeholder;
  var prev = Elements2.prev;
  var next = Elements2.next;
  var created;
  var wrapperClasses;
  var arrows = {};
  function mount() {
    init();
    on(EVENT_UPDATED, remount);
  }
  function remount() {
    destroy();
    mount();
  }
  function init() {
    var enabled = options.arrows;
    if (enabled && !(prev && next)) {
      createArrows();
    }
    if (prev && next) {
      assign(arrows, {
        prev,
        next
      });
      display(wrapper, enabled ? "" : "none");
      addClass(wrapper, wrapperClasses = CLASS_ARROWS + "--" + options.direction);
      if (enabled) {
        listen();
        update();
        setAttribute([prev, next], ARIA_CONTROLS, track.id);
        emit(EVENT_ARROWS_MOUNTED, prev, next);
      }
    }
  }
  function destroy() {
    event.destroy();
    removeClass(wrapper, wrapperClasses);
    if (created) {
      remove(placeholder ? [prev, next] : wrapper);
      prev = next = null;
    } else {
      removeAttribute([prev, next], ALL_ATTRIBUTES);
    }
  }
  function listen() {
    on([EVENT_MOUNTED, EVENT_MOVED, EVENT_REFRESH, EVENT_SCROLLED, EVENT_END_INDEX_CHANGED], update);
    bind(next, "click", apply(go, ">"));
    bind(prev, "click", apply(go, "<"));
  }
  function go(control) {
    Controller2.go(control, true);
  }
  function createArrows() {
    wrapper = placeholder || create("div", classes.arrows);
    prev = createArrow(true);
    next = createArrow(false);
    created = true;
    append(wrapper, [prev, next]);
    !placeholder && before(wrapper, track);
  }
  function createArrow(prev2) {
    var arrow = '<button class="' + classes.arrow + " " + (prev2 ? classes.prev : classes.next) + '" type="button"><svg xmlns="' + XML_NAME_SPACE + '" viewBox="0 0 ' + SIZE + " " + SIZE + '" width="' + SIZE + '" height="' + SIZE + '" focusable="false"><path d="' + (options.arrowPath || PATH) + '" />';
    return parseHtml(arrow);
  }
  function update() {
    if (prev && next) {
      var index = Splide22.index;
      var prevIndex = Controller2.getPrev();
      var nextIndex = Controller2.getNext();
      var prevLabel = prevIndex > -1 && index < prevIndex ? i18n.last : i18n.prev;
      var nextLabel = nextIndex > -1 && index > nextIndex ? i18n.first : i18n.next;
      prev.disabled = prevIndex < 0;
      next.disabled = nextIndex < 0;
      setAttribute(prev, ARIA_LABEL, prevLabel);
      setAttribute(next, ARIA_LABEL, nextLabel);
      emit(EVENT_ARROWS_UPDATED, prev, next, prevIndex, nextIndex);
    }
  }
  return {
    arrows,
    mount,
    destroy,
    update
  };
}
var INTERVAL_DATA_ATTRIBUTE = DATA_ATTRIBUTE + "-interval";
function Autoplay(Splide22, Components2, options) {
  var _EventInterface6 = EventInterface(Splide22), on = _EventInterface6.on, bind = _EventInterface6.bind, emit = _EventInterface6.emit;
  var interval = RequestInterval(options.interval, Splide22.go.bind(Splide22, ">"), onAnimationFrame);
  var isPaused = interval.isPaused;
  var Elements2 = Components2.Elements, _Components2$Elements4 = Components2.Elements, root = _Components2$Elements4.root, toggle = _Components2$Elements4.toggle;
  var autoplay = options.autoplay;
  var hovered;
  var focused;
  var stopped = autoplay === "pause";
  function mount() {
    if (autoplay) {
      listen();
      toggle && setAttribute(toggle, ARIA_CONTROLS, Elements2.track.id);
      stopped || play();
      update();
    }
  }
  function listen() {
    if (options.pauseOnHover) {
      bind(root, "mouseenter mouseleave", function(e) {
        hovered = e.type === "mouseenter";
        autoToggle();
      });
    }
    if (options.pauseOnFocus) {
      bind(root, "focusin focusout", function(e) {
        focused = e.type === "focusin";
        autoToggle();
      });
    }
    if (toggle) {
      bind(toggle, "click", function() {
        stopped ? play() : pause(true);
      });
    }
    on([EVENT_MOVE, EVENT_SCROLL, EVENT_REFRESH], interval.rewind);
    on(EVENT_MOVE, onMove);
  }
  function play() {
    if (isPaused() && Components2.Slides.isEnough()) {
      interval.start(!options.resetProgress);
      focused = hovered = stopped = false;
      update();
      emit(EVENT_AUTOPLAY_PLAY);
    }
  }
  function pause(stop) {
    if (stop === void 0) {
      stop = true;
    }
    stopped = !!stop;
    update();
    if (!isPaused()) {
      interval.pause();
      emit(EVENT_AUTOPLAY_PAUSE);
    }
  }
  function autoToggle() {
    if (!stopped) {
      hovered || focused ? pause(false) : play();
    }
  }
  function update() {
    if (toggle) {
      toggleClass(toggle, CLASS_ACTIVE, !stopped);
      setAttribute(toggle, ARIA_LABEL, options.i18n[stopped ? "play" : "pause"]);
    }
  }
  function onAnimationFrame(rate) {
    var bar = Elements2.bar;
    bar && style(bar, "width", rate * 100 + "%");
    emit(EVENT_AUTOPLAY_PLAYING, rate);
  }
  function onMove(index) {
    var Slide2 = Components2.Slides.getAt(index);
    interval.set(Slide2 && +getAttribute(Slide2.slide, INTERVAL_DATA_ATTRIBUTE) || options.interval);
  }
  return {
    mount,
    destroy: interval.cancel,
    play,
    pause,
    isPaused
  };
}
function Cover(Splide22, Components2, options) {
  var _EventInterface7 = EventInterface(Splide22), on = _EventInterface7.on;
  function mount() {
    if (options.cover) {
      on(EVENT_LAZYLOAD_LOADED, apply(toggle, true));
      on([EVENT_MOUNTED, EVENT_UPDATED, EVENT_REFRESH], apply(cover, true));
    }
  }
  function cover(cover2) {
    Components2.Slides.forEach(function(Slide2) {
      var img = child(Slide2.container || Slide2.slide, "img");
      if (img && img.src) {
        toggle(cover2, img, Slide2);
      }
    });
  }
  function toggle(cover2, img, Slide2) {
    Slide2.style("background", cover2 ? 'center/cover no-repeat url("' + img.src + '")' : "", true);
    display(img, cover2 ? "none" : "");
  }
  return {
    mount,
    destroy: apply(cover, false)
  };
}
var BOUNCE_DIFF_THRESHOLD = 10;
var BOUNCE_DURATION = 600;
var FRICTION_FACTOR = 0.6;
var BASE_VELOCITY = 1.5;
var MIN_DURATION = 800;
function Scroll(Splide22, Components2, options) {
  var _EventInterface8 = EventInterface(Splide22), on = _EventInterface8.on, emit = _EventInterface8.emit;
  var set = Splide22.state.set;
  var Move2 = Components2.Move;
  var getPosition = Move2.getPosition, getLimit = Move2.getLimit, exceededLimit = Move2.exceededLimit, translate = Move2.translate;
  var isSlide = Splide22.is(SLIDE);
  var interval;
  var callback;
  var friction = 1;
  function mount() {
    on(EVENT_MOVE, clear);
    on([EVENT_UPDATED, EVENT_REFRESH], cancel);
  }
  function scroll(destination, duration, snap, onScrolled, noConstrain) {
    var from = getPosition();
    clear();
    if (snap && (!isSlide || !exceededLimit())) {
      var size = Components2.Layout.sliderSize();
      var offset = sign(destination) * size * floor(abs(destination) / size) || 0;
      destination = Move2.toPosition(Components2.Controller.toDest(destination % size)) + offset;
    }
    var noDistance = approximatelyEqual(from, destination, 1);
    friction = 1;
    duration = noDistance ? 0 : duration || max(abs(destination - from) / BASE_VELOCITY, MIN_DURATION);
    callback = onScrolled;
    interval = RequestInterval(duration, onEnd, apply(update, from, destination, noConstrain), 1);
    set(SCROLLING);
    emit(EVENT_SCROLL);
    interval.start();
  }
  function onEnd() {
    set(IDLE);
    callback && callback();
    emit(EVENT_SCROLLED);
  }
  function update(from, to, noConstrain, rate) {
    var position = getPosition();
    var target = from + (to - from) * easing(rate);
    var diff = (target - position) * friction;
    translate(position + diff);
    if (isSlide && !noConstrain && exceededLimit()) {
      friction *= FRICTION_FACTOR;
      if (abs(diff) < BOUNCE_DIFF_THRESHOLD) {
        scroll(getLimit(exceededLimit(true)), BOUNCE_DURATION, false, callback, true);
      }
    }
  }
  function clear() {
    if (interval) {
      interval.cancel();
    }
  }
  function cancel() {
    if (interval && !interval.isPaused()) {
      clear();
      onEnd();
    }
  }
  function easing(t) {
    var easingFunc = options.easingFunc;
    return easingFunc ? easingFunc(t) : 1 - Math.pow(1 - t, 4);
  }
  return {
    mount,
    destroy: clear,
    scroll,
    cancel
  };
}
var SCROLL_LISTENER_OPTIONS = {
  passive: false,
  capture: true
};
function Drag(Splide22, Components2, options) {
  var _EventInterface9 = EventInterface(Splide22), on = _EventInterface9.on, emit = _EventInterface9.emit, bind = _EventInterface9.bind, unbind = _EventInterface9.unbind;
  var state = Splide22.state;
  var Move2 = Components2.Move, Scroll2 = Components2.Scroll, Controller2 = Components2.Controller, track = Components2.Elements.track, reduce = Components2.Media.reduce;
  var _Components2$Directio2 = Components2.Direction, resolve = _Components2$Directio2.resolve, orient = _Components2$Directio2.orient;
  var getPosition = Move2.getPosition, exceededLimit = Move2.exceededLimit;
  var basePosition;
  var baseEvent;
  var prevBaseEvent;
  var isFree;
  var dragging;
  var exceeded = false;
  var clickPrevented;
  var disabled;
  var target;
  function mount() {
    bind(track, POINTER_MOVE_EVENTS, noop, SCROLL_LISTENER_OPTIONS);
    bind(track, POINTER_UP_EVENTS, noop, SCROLL_LISTENER_OPTIONS);
    bind(track, POINTER_DOWN_EVENTS, onPointerDown, SCROLL_LISTENER_OPTIONS);
    bind(track, "click", onClick, {
      capture: true
    });
    bind(track, "dragstart", prevent);
    on([EVENT_MOUNTED, EVENT_UPDATED], init);
  }
  function init() {
    var drag = options.drag;
    disable(!drag);
    isFree = drag === "free";
  }
  function onPointerDown(e) {
    clickPrevented = false;
    if (!disabled) {
      var isTouch = isTouchEvent(e);
      if (isDraggable(e.target) && (isTouch || !e.button)) {
        if (!Controller2.isBusy()) {
          target = isTouch ? track : window;
          dragging = state.is([MOVING, SCROLLING]);
          prevBaseEvent = null;
          bind(target, POINTER_MOVE_EVENTS, onPointerMove, SCROLL_LISTENER_OPTIONS);
          bind(target, POINTER_UP_EVENTS, onPointerUp, SCROLL_LISTENER_OPTIONS);
          Move2.cancel();
          Scroll2.cancel();
          save(e);
        } else {
          prevent(e, true);
        }
      }
    }
  }
  function onPointerMove(e) {
    if (!state.is(DRAGGING)) {
      state.set(DRAGGING);
      emit(EVENT_DRAG);
    }
    if (e.cancelable) {
      if (dragging) {
        Move2.translate(basePosition + constrain(diffCoord(e)));
        var expired = diffTime(e) > LOG_INTERVAL;
        var hasExceeded = exceeded !== (exceeded = exceededLimit());
        if (expired || hasExceeded) {
          save(e);
        }
        clickPrevented = true;
        emit(EVENT_DRAGGING);
        prevent(e);
      } else if (isSliderDirection(e)) {
        dragging = shouldStart(e);
        prevent(e);
      }
    }
  }
  function onPointerUp(e) {
    if (state.is(DRAGGING)) {
      state.set(IDLE);
      emit(EVENT_DRAGGED);
    }
    if (dragging) {
      move(e);
      prevent(e);
    }
    unbind(target, POINTER_MOVE_EVENTS, onPointerMove);
    unbind(target, POINTER_UP_EVENTS, onPointerUp);
    dragging = false;
  }
  function onClick(e) {
    if (!disabled && clickPrevented) {
      prevent(e, true);
    }
  }
  function save(e) {
    prevBaseEvent = baseEvent;
    baseEvent = e;
    basePosition = getPosition();
  }
  function move(e) {
    var velocity = computeVelocity(e);
    var destination = computeDestination(velocity);
    var rewind = options.rewind && options.rewindByDrag;
    reduce(false);
    if (isFree) {
      Controller2.scroll(destination, 0, options.snap);
    } else if (Splide22.is(FADE)) {
      Controller2.go(orient(sign(velocity)) < 0 ? rewind ? "<" : "-" : rewind ? ">" : "+");
    } else if (Splide22.is(SLIDE) && exceeded && rewind) {
      Controller2.go(exceededLimit(true) ? ">" : "<");
    } else {
      Controller2.go(Controller2.toDest(destination), true);
    }
    reduce(true);
  }
  function shouldStart(e) {
    var thresholds = options.dragMinThreshold;
    var isObj = isObject(thresholds);
    var mouse = isObj && thresholds.mouse || 0;
    var touch = (isObj ? thresholds.touch : +thresholds) || 10;
    return abs(diffCoord(e)) > (isTouchEvent(e) ? touch : mouse);
  }
  function isSliderDirection(e) {
    return abs(diffCoord(e)) > abs(diffCoord(e, true));
  }
  function computeVelocity(e) {
    if (Splide22.is(LOOP) || !exceeded) {
      var time = diffTime(e);
      if (time && time < LOG_INTERVAL) {
        return diffCoord(e) / time;
      }
    }
    return 0;
  }
  function computeDestination(velocity) {
    return getPosition() + sign(velocity) * min(abs(velocity) * (options.flickPower || 600), isFree ? Infinity : Components2.Layout.listSize() * (options.flickMaxPages || 1));
  }
  function diffCoord(e, orthogonal) {
    return coordOf(e, orthogonal) - coordOf(getBaseEvent(e), orthogonal);
  }
  function diffTime(e) {
    return timeOf(e) - timeOf(getBaseEvent(e));
  }
  function getBaseEvent(e) {
    return baseEvent === e && prevBaseEvent || baseEvent;
  }
  function coordOf(e, orthogonal) {
    return (isTouchEvent(e) ? e.changedTouches[0] : e)["page" + resolve(orthogonal ? "Y" : "X")];
  }
  function constrain(diff) {
    return diff / (exceeded && Splide22.is(SLIDE) ? FRICTION : 1);
  }
  function isDraggable(target2) {
    var noDrag = options.noDrag;
    return !matches(target2, "." + CLASS_PAGINATION_PAGE + ", ." + CLASS_ARROW) && (!noDrag || !matches(target2, noDrag));
  }
  function isTouchEvent(e) {
    return typeof TouchEvent !== "undefined" && e instanceof TouchEvent;
  }
  function isDragging() {
    return dragging;
  }
  function disable(value) {
    disabled = value;
  }
  return {
    mount,
    disable,
    isDragging
  };
}
var NORMALIZATION_MAP = {
  Spacebar: " ",
  Right: ARROW_RIGHT,
  Left: ARROW_LEFT,
  Up: ARROW_UP,
  Down: ARROW_DOWN
};
function normalizeKey(key) {
  key = isString(key) ? key : key.key;
  return NORMALIZATION_MAP[key] || key;
}
var KEYBOARD_EVENT = "keydown";
function Keyboard(Splide22, Components2, options) {
  var _EventInterface10 = EventInterface(Splide22), on = _EventInterface10.on, bind = _EventInterface10.bind, unbind = _EventInterface10.unbind;
  var root = Splide22.root;
  var resolve = Components2.Direction.resolve;
  var target;
  var disabled;
  function mount() {
    init();
    on(EVENT_UPDATED, destroy);
    on(EVENT_UPDATED, init);
    on(EVENT_MOVE, onMove);
  }
  function init() {
    var keyboard = options.keyboard;
    if (keyboard) {
      target = keyboard === "global" ? window : root;
      bind(target, KEYBOARD_EVENT, onKeydown);
    }
  }
  function destroy() {
    unbind(target, KEYBOARD_EVENT);
  }
  function disable(value) {
    disabled = value;
  }
  function onMove() {
    var _disabled = disabled;
    disabled = true;
    nextTick(function() {
      disabled = _disabled;
    });
  }
  function onKeydown(e) {
    if (!disabled) {
      var key = normalizeKey(e);
      if (key === resolve(ARROW_LEFT)) {
        Splide22.go("<");
      } else if (key === resolve(ARROW_RIGHT)) {
        Splide22.go(">");
      }
    }
  }
  return {
    mount,
    destroy,
    disable
  };
}
var SRC_DATA_ATTRIBUTE = DATA_ATTRIBUTE + "-lazy";
var SRCSET_DATA_ATTRIBUTE = SRC_DATA_ATTRIBUTE + "-srcset";
var IMAGE_SELECTOR = "[" + SRC_DATA_ATTRIBUTE + "], [" + SRCSET_DATA_ATTRIBUTE + "]";
function LazyLoad(Splide22, Components2, options) {
  var _EventInterface11 = EventInterface(Splide22), on = _EventInterface11.on, off = _EventInterface11.off, bind = _EventInterface11.bind, emit = _EventInterface11.emit;
  var isSequential = options.lazyLoad === "sequential";
  var events = [EVENT_MOVED, EVENT_SCROLLED];
  var entries = [];
  function mount() {
    if (options.lazyLoad) {
      init();
      on(EVENT_REFRESH, init);
    }
  }
  function init() {
    empty(entries);
    register();
    if (isSequential) {
      loadNext();
    } else {
      off(events);
      on(events, check);
      check();
    }
  }
  function register() {
    Components2.Slides.forEach(function(Slide2) {
      queryAll(Slide2.slide, IMAGE_SELECTOR).forEach(function(img) {
        var src = getAttribute(img, SRC_DATA_ATTRIBUTE);
        var srcset = getAttribute(img, SRCSET_DATA_ATTRIBUTE);
        if (src !== img.src || srcset !== img.srcset) {
          var className = options.classes.spinner;
          var parent = img.parentElement;
          var spinner = child(parent, "." + className) || create("span", className, parent);
          entries.push([img, Slide2, spinner]);
          img.src || display(img, "none");
        }
      });
    });
  }
  function check() {
    entries = entries.filter(function(data) {
      var distance = options.perPage * ((options.preloadPages || 1) + 1) - 1;
      return data[1].isWithin(Splide22.index, distance) ? load(data) : true;
    });
    entries.length || off(events);
  }
  function load(data) {
    var img = data[0];
    addClass(data[1].slide, CLASS_LOADING);
    bind(img, "load error", apply(onLoad, data));
    setAttribute(img, "src", getAttribute(img, SRC_DATA_ATTRIBUTE));
    setAttribute(img, "srcset", getAttribute(img, SRCSET_DATA_ATTRIBUTE));
    removeAttribute(img, SRC_DATA_ATTRIBUTE);
    removeAttribute(img, SRCSET_DATA_ATTRIBUTE);
  }
  function onLoad(data, e) {
    var img = data[0], Slide2 = data[1];
    removeClass(Slide2.slide, CLASS_LOADING);
    if (e.type !== "error") {
      remove(data[2]);
      display(img, "");
      emit(EVENT_LAZYLOAD_LOADED, img, Slide2);
      emit(EVENT_RESIZE);
    }
    isSequential && loadNext();
  }
  function loadNext() {
    entries.length && load(entries.shift());
  }
  return {
    mount,
    destroy: apply(empty, entries),
    check
  };
}
function Pagination(Splide22, Components2, options) {
  var event = EventInterface(Splide22);
  var on = event.on, emit = event.emit, bind = event.bind;
  var Slides2 = Components2.Slides, Elements2 = Components2.Elements, Controller2 = Components2.Controller;
  var hasFocus = Controller2.hasFocus, getIndex = Controller2.getIndex, go = Controller2.go;
  var resolve = Components2.Direction.resolve;
  var placeholder = Elements2.pagination;
  var items = [];
  var list;
  var paginationClasses;
  function mount() {
    destroy();
    on([EVENT_UPDATED, EVENT_REFRESH, EVENT_END_INDEX_CHANGED], mount);
    var enabled = options.pagination;
    placeholder && display(placeholder, enabled ? "" : "none");
    if (enabled) {
      on([EVENT_MOVE, EVENT_SCROLL, EVENT_SCROLLED], update);
      createPagination();
      update();
      emit(EVENT_PAGINATION_MOUNTED, {
        list,
        items
      }, getAt(Splide22.index));
    }
  }
  function destroy() {
    if (list) {
      remove(placeholder ? slice(list.children) : list);
      removeClass(list, paginationClasses);
      empty(items);
      list = null;
    }
    event.destroy();
  }
  function createPagination() {
    var length = Splide22.length;
    var classes = options.classes, i18n = options.i18n, perPage = options.perPage;
    var max2 = hasFocus() ? Controller2.getEnd() + 1 : ceil(length / perPage);
    list = placeholder || create("ul", classes.pagination, Elements2.track.parentElement);
    addClass(list, paginationClasses = CLASS_PAGINATION + "--" + getDirection());
    setAttribute(list, ROLE, "tablist");
    setAttribute(list, ARIA_LABEL, i18n.select);
    setAttribute(list, ARIA_ORIENTATION, getDirection() === TTB ? "vertical" : "");
    for (var i = 0; i < max2; i++) {
      var li = create("li", null, list);
      var button = create("button", {
        class: classes.page,
        type: "button"
      }, li);
      var controls = Slides2.getIn(i).map(function(Slide2) {
        return Slide2.slide.id;
      });
      var text = !hasFocus() && perPage > 1 ? i18n.pageX : i18n.slideX;
      bind(button, "click", apply(onClick, i));
      if (options.paginationKeyboard) {
        bind(button, "keydown", apply(onKeydown, i));
      }
      setAttribute(li, ROLE, "presentation");
      setAttribute(button, ROLE, "tab");
      setAttribute(button, ARIA_CONTROLS, controls.join(" "));
      setAttribute(button, ARIA_LABEL, format(text, i + 1));
      setAttribute(button, TAB_INDEX, -1);
      items.push({
        li,
        button,
        page: i
      });
    }
  }
  function onClick(page) {
    go(">" + page, true);
  }
  function onKeydown(page, e) {
    var length = items.length;
    var key = normalizeKey(e);
    var dir = getDirection();
    var nextPage = -1;
    if (key === resolve(ARROW_RIGHT, false, dir)) {
      nextPage = ++page % length;
    } else if (key === resolve(ARROW_LEFT, false, dir)) {
      nextPage = (--page + length) % length;
    } else if (key === "Home") {
      nextPage = 0;
    } else if (key === "End") {
      nextPage = length - 1;
    }
    var item = items[nextPage];
    if (item) {
      focus(item.button);
      go(">" + nextPage);
      prevent(e, true);
    }
  }
  function getDirection() {
    return options.paginationDirection || options.direction;
  }
  function getAt(index) {
    return items[Controller2.toPage(index)];
  }
  function update() {
    var prev = getAt(getIndex(true));
    var curr = getAt(getIndex());
    if (prev) {
      var button = prev.button;
      removeClass(button, CLASS_ACTIVE);
      removeAttribute(button, ARIA_SELECTED);
      setAttribute(button, TAB_INDEX, -1);
    }
    if (curr) {
      var _button = curr.button;
      addClass(_button, CLASS_ACTIVE);
      setAttribute(_button, ARIA_SELECTED, true);
      setAttribute(_button, TAB_INDEX, "");
    }
    emit(EVENT_PAGINATION_UPDATED, {
      list,
      items
    }, prev, curr);
  }
  return {
    items,
    mount,
    destroy,
    getAt,
    update
  };
}
var TRIGGER_KEYS = [" ", "Enter"];
function Sync(Splide22, Components2, options) {
  var isNavigation = options.isNavigation, slideFocus = options.slideFocus;
  var events = [];
  function mount() {
    Splide22.splides.forEach(function(target) {
      if (!target.isParent) {
        sync(Splide22, target.splide);
        sync(target.splide, Splide22);
      }
    });
    if (isNavigation) {
      navigate();
    }
  }
  function destroy() {
    events.forEach(function(event) {
      event.destroy();
    });
    empty(events);
  }
  function remount() {
    destroy();
    mount();
  }
  function sync(splide, target) {
    var event = EventInterface(splide);
    event.on(EVENT_MOVE, function(index, prev, dest) {
      target.go(target.is(LOOP) ? dest : index);
    });
    events.push(event);
  }
  function navigate() {
    var event = EventInterface(Splide22);
    var on = event.on;
    on(EVENT_CLICK, onClick);
    on(EVENT_SLIDE_KEYDOWN, onKeydown);
    on([EVENT_MOUNTED, EVENT_UPDATED], update);
    events.push(event);
    event.emit(EVENT_NAVIGATION_MOUNTED, Splide22.splides);
  }
  function update() {
    setAttribute(Components2.Elements.list, ARIA_ORIENTATION, options.direction === TTB ? "vertical" : "");
  }
  function onClick(Slide2) {
    Splide22.go(Slide2.index);
  }
  function onKeydown(Slide2, e) {
    if (includes(TRIGGER_KEYS, normalizeKey(e))) {
      onClick(Slide2);
      prevent(e);
    }
  }
  return {
    setup: apply(Components2.Media.set, {
      slideFocus: isUndefined(slideFocus) ? isNavigation : slideFocus
    }, true),
    mount,
    destroy,
    remount
  };
}
function Wheel(Splide22, Components2, options) {
  var _EventInterface12 = EventInterface(Splide22), bind = _EventInterface12.bind;
  var lastTime = 0;
  function mount() {
    if (options.wheel) {
      bind(Components2.Elements.track, "wheel", onWheel, SCROLL_LISTENER_OPTIONS);
    }
  }
  function onWheel(e) {
    if (e.cancelable) {
      var deltaY = e.deltaY;
      var backwards = deltaY < 0;
      var timeStamp = timeOf(e);
      var _min = options.wheelMinThreshold || 0;
      var sleep = options.wheelSleep || 0;
      if (abs(deltaY) > _min && timeStamp - lastTime > sleep) {
        Splide22.go(backwards ? "<" : ">");
        lastTime = timeStamp;
      }
      shouldPrevent(backwards) && prevent(e);
    }
  }
  function shouldPrevent(backwards) {
    return !options.releaseWheel || Splide22.state.is(MOVING) || Components2.Controller.getAdjacent(backwards) !== -1;
  }
  return {
    mount
  };
}
var SR_REMOVAL_DELAY = 90;
function Live(Splide22, Components2, options) {
  var _EventInterface13 = EventInterface(Splide22), on = _EventInterface13.on;
  var track = Components2.Elements.track;
  var enabled = options.live && !options.isNavigation;
  var sr = create("span", CLASS_SR);
  var interval = RequestInterval(SR_REMOVAL_DELAY, apply(toggle, false));
  function mount() {
    if (enabled) {
      disable(!Components2.Autoplay.isPaused());
      setAttribute(track, ARIA_ATOMIC, true);
      sr.textContent = "\u2026";
      on(EVENT_AUTOPLAY_PLAY, apply(disable, true));
      on(EVENT_AUTOPLAY_PAUSE, apply(disable, false));
      on([EVENT_MOVED, EVENT_SCROLLED], apply(toggle, true));
    }
  }
  function toggle(active) {
    setAttribute(track, ARIA_BUSY, active);
    if (active) {
      append(track, sr);
      interval.start();
    } else {
      remove(sr);
      interval.cancel();
    }
  }
  function destroy() {
    removeAttribute(track, [ARIA_LIVE, ARIA_ATOMIC, ARIA_BUSY]);
    remove(sr);
  }
  function disable(disabled) {
    if (enabled) {
      setAttribute(track, ARIA_LIVE, disabled ? "off" : "polite");
    }
  }
  return {
    mount,
    disable,
    destroy
  };
}
var ComponentConstructors = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Media,
  Direction,
  Elements,
  Slides,
  Layout,
  Clones,
  Move,
  Controller,
  Arrows,
  Autoplay,
  Cover,
  Scroll,
  Drag,
  Keyboard,
  LazyLoad,
  Pagination,
  Sync,
  Wheel,
  Live
});
var I18N = {
  prev: "Previous slide",
  next: "Next slide",
  first: "Go to first slide",
  last: "Go to last slide",
  slideX: "Go to slide %s",
  pageX: "Go to page %s",
  play: "Start autoplay",
  pause: "Pause autoplay",
  carousel: "carousel",
  slide: "slide",
  select: "Select a slide to show",
  slideLabel: "%s of %s"
};
var DEFAULTS = {
  type: "slide",
  role: "region",
  speed: 400,
  perPage: 1,
  cloneStatus: true,
  arrows: true,
  pagination: true,
  paginationKeyboard: true,
  interval: 5e3,
  pauseOnHover: true,
  pauseOnFocus: true,
  resetProgress: true,
  easing: "cubic-bezier(0.25, 1, 0.5, 1)",
  drag: true,
  direction: "ltr",
  trimSpace: true,
  focusableNodes: "a, button, textarea, input, select, iframe",
  live: true,
  classes: CLASSES,
  i18n: I18N,
  reducedMotion: {
    speed: 0,
    rewindSpeed: 0,
    autoplay: "pause"
  }
};
function Fade(Splide22, Components2, options) {
  var Slides2 = Components2.Slides;
  function mount() {
    EventInterface(Splide22).on([EVENT_MOUNTED, EVENT_REFRESH], init);
  }
  function init() {
    Slides2.forEach(function(Slide2) {
      Slide2.style("transform", "translateX(-" + 100 * Slide2.index + "%)");
    });
  }
  function start(index, done) {
    Slides2.style("transition", "opacity " + options.speed + "ms " + options.easing);
    nextTick(done);
  }
  return {
    mount,
    start,
    cancel: noop
  };
}
function Slide(Splide22, Components2, options) {
  var Move2 = Components2.Move, Controller2 = Components2.Controller, Scroll2 = Components2.Scroll;
  var list = Components2.Elements.list;
  var transition = apply(style, list, "transition");
  var endCallback;
  function mount() {
    EventInterface(Splide22).bind(list, "transitionend", function(e) {
      if (e.target === list && endCallback) {
        cancel();
        endCallback();
      }
    });
  }
  function start(index, done) {
    var destination = Move2.toPosition(index, true);
    var position = Move2.getPosition();
    var speed = getSpeed(index);
    if (abs(destination - position) >= 1 && speed >= 1) {
      if (options.useScroll) {
        Scroll2.scroll(destination, speed, false, done);
      } else {
        transition("transform " + speed + "ms " + options.easing);
        Move2.translate(destination, true);
        endCallback = done;
      }
    } else {
      Move2.jump(index);
      done();
    }
  }
  function cancel() {
    transition("");
    Scroll2.cancel();
  }
  function getSpeed(index) {
    var rewindSpeed = options.rewindSpeed;
    if (Splide22.is(SLIDE) && rewindSpeed) {
      var prev = Controller2.getIndex(true);
      var end = Controller2.getEnd();
      if (prev === 0 && index >= end || prev >= end && index === 0) {
        return rewindSpeed;
      }
    }
    return options.speed;
  }
  return {
    mount,
    start,
    cancel
  };
}
var _Splide = /* @__PURE__ */ function() {
  function _Splide2(target, options) {
    this.event = EventInterface();
    this.Components = {};
    this.state = State(CREATED);
    this.splides = [];
    this._o = {};
    this._E = {};
    var root = isString(target) ? query(document, target) : target;
    assert(root, root + " is invalid.");
    this.root = root;
    options = merge({
      label: getAttribute(root, ARIA_LABEL) || "",
      labelledby: getAttribute(root, ARIA_LABELLEDBY) || ""
    }, DEFAULTS, _Splide2.defaults, options || {});
    try {
      merge(options, JSON.parse(getAttribute(root, DATA_ATTRIBUTE)));
    } catch (e) {
      assert(false, "Invalid JSON");
    }
    this._o = Object.create(merge({}, options));
  }
  var _proto = _Splide2.prototype;
  _proto.mount = function mount(Extensions, Transition) {
    var _this = this;
    var state = this.state, Components2 = this.Components;
    assert(state.is([CREATED, DESTROYED]), "Already mounted!");
    state.set(CREATED);
    this._C = Components2;
    this._T = Transition || this._T || (this.is(FADE) ? Fade : Slide);
    this._E = Extensions || this._E;
    var Constructors = assign({}, ComponentConstructors, this._E, {
      Transition: this._T
    });
    forOwn(Constructors, function(Component, key) {
      var component = Component(_this, Components2, _this._o);
      Components2[key] = component;
      component.setup && component.setup();
    });
    forOwn(Components2, function(component) {
      component.mount && component.mount();
    });
    this.emit(EVENT_MOUNTED);
    addClass(this.root, CLASS_INITIALIZED);
    state.set(IDLE);
    this.emit(EVENT_READY);
    return this;
  };
  _proto.sync = function sync(splide) {
    this.splides.push({
      splide
    });
    splide.splides.push({
      splide: this,
      isParent: true
    });
    if (this.state.is(IDLE)) {
      this._C.Sync.remount();
      splide.Components.Sync.remount();
    }
    return this;
  };
  _proto.go = function go(control) {
    this._C.Controller.go(control);
    return this;
  };
  _proto.on = function on(events, callback) {
    this.event.on(events, callback);
    return this;
  };
  _proto.off = function off(events) {
    this.event.off(events);
    return this;
  };
  _proto.emit = function emit(event) {
    var _this$event;
    (_this$event = this.event).emit.apply(_this$event, [event].concat(slice(arguments, 1)));
    return this;
  };
  _proto.add = function add(slides, index) {
    this._C.Slides.add(slides, index);
    return this;
  };
  _proto.remove = function remove2(matcher) {
    this._C.Slides.remove(matcher);
    return this;
  };
  _proto.is = function is(type) {
    return this._o.type === type;
  };
  _proto.refresh = function refresh() {
    this.emit(EVENT_REFRESH);
    return this;
  };
  _proto.destroy = function destroy(completely) {
    if (completely === void 0) {
      completely = true;
    }
    var event = this.event, state = this.state;
    if (state.is(CREATED)) {
      EventInterface(this).on(EVENT_READY, this.destroy.bind(this, completely));
    } else {
      forOwn(this._C, function(component) {
        component.destroy && component.destroy(completely);
      }, true);
      event.emit(EVENT_DESTROY);
      event.destroy();
      completely && empty(this.splides);
      state.set(DESTROYED);
    }
    return this;
  };
  _createClass(_Splide2, [{
    key: "options",
    get: function get() {
      return this._o;
    },
    set: function set(options) {
      this._C.Media.set(options, true, true);
    }
  }, {
    key: "length",
    get: function get() {
      return this._C.Slides.getLength(true);
    }
  }, {
    key: "index",
    get: function get() {
      return this._C.Controller.getIndex();
    }
  }]);
  return _Splide2;
}();
var Splide = _Splide;
Splide.defaults = {};
Splide.STATES = STATES;

// src/js/components/Splide/Splide.tsx


// src/js/constants/events.ts
var EVENTS = [
  [EVENT_MOUNTED, "onMounted"],
  [EVENT_READY, "onReady"],
  [EVENT_MOVE, "onMove"],
  [EVENT_MOVED, "onMoved"],
  [EVENT_CLICK, "onClick"],
  [EVENT_ACTIVE, "onActive"],
  [EVENT_INACTIVE, "onInactive"],
  [EVENT_VISIBLE, "onVisible"],
  [EVENT_HIDDEN, "onHidden"],
  [EVENT_REFRESH, "onRefresh"],
  [EVENT_UPDATED, "onUpdated"],
  [EVENT_RESIZE, "onResize"],
  [EVENT_RESIZED, "onResized"],
  [EVENT_DRAG, "onDrag"],
  [EVENT_DRAGGING, "onDragging"],
  [EVENT_DRAGGED, "onDragged"],
  [EVENT_SCROLL, "onScroll"],
  [EVENT_SCROLLED, "onScrolled"],
  [EVENT_DESTROY, "onDestroy"],
  [EVENT_ARROWS_MOUNTED, "onArrowsMounted"],
  [EVENT_ARROWS_UPDATED, "onArrowsUpdated"],
  [EVENT_PAGINATION_MOUNTED, "onPaginationMounted"],
  [EVENT_PAGINATION_UPDATED, "onPaginationUpdated"],
  [EVENT_NAVIGATION_MOUNTED, "onNavigationMounted"],
  [EVENT_AUTOPLAY_PLAY, "onAutoplayPlay"],
  [EVENT_AUTOPLAY_PLAYING, "onAutoplayPlaying"],
  [EVENT_AUTOPLAY_PAUSE, "onAutoplayPause"],
  [EVENT_LAZYLOAD_LOADED, "onLazyLoadLoaded"]
];

// src/js/utils/classNames/classNames.ts
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// src/js/utils/isObject/isObject.ts
function isObject2(subject) {
  return subject !== null && typeof subject === "object";
}

// src/js/utils/isEqualDeep/isEqualDeep.ts
function isEqualDeep(subject1, subject2) {
  if (Array.isArray(subject1) && Array.isArray(subject2)) {
    return subject1.length === subject2.length && !subject1.some((elm, index) => !isEqualDeep(elm, subject2[index]));
  }
  if (isObject2(subject1) && isObject2(subject2)) {
    const keys1 = Object.keys(subject1);
    const keys2 = Object.keys(subject2);
    return keys1.length === keys2.length && !keys1.some((key) => {
      return !Object.prototype.hasOwnProperty.call(subject2, key) || !isEqualDeep(subject1[key], subject2[key]);
    });
  }
  return subject1 === subject2;
}

// src/js/utils/isEqualShallow/isEqualShallow.ts
function isEqualShallow(array1, array2) {
  return array1.length === array2.length && !array1.some((elm, index) => elm !== array2[index]);
}

// src/js/utils/forOwn/forOwn.ts
function forOwn2(object, iteratee) {
  if (object) {
    const keys = Object.keys(object);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (key !== "__proto__") {
        if (iteratee(object[key], key) === false) {
          break;
        }
      }
    }
  }
  return object;
}

// src/js/utils/merge/merge.ts
function merge2(object, source) {
  const merged = object;
  forOwn2(source, (value, key) => {
    if (Array.isArray(value)) {
      merged[key] = value.slice();
    } else if (isObject2(value)) {
      merged[key] = merge2(isObject2(merged[key]) ? merged[key] : {}, value);
    } else {
      merged[key] = value;
    }
  });
  return merged;
}

// src/js/components/SplideTrack/SplideTrack.tsx

var SplideTrack = ({ children: children2, className, ...props }) => {
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: classNames("splide__track", className),
    ...props
  }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", {
    className: "splide__list"
  }, children2));
};

// src/js/components/Splide/Splide.tsx
var Splide2 = class extends (react__WEBPACK_IMPORTED_MODULE_0___default().Component) {
  constructor() {
    super(...arguments);
    this.splideRef = react__WEBPACK_IMPORTED_MODULE_0___default().createRef();
    this.slides = [];
  }
  componentDidMount() {
    const { options, extensions, transition } = this.props;
    const { current } = this.splideRef;
    if (current) {
      this.splide = new Splide(current, options);
      this.bind(this.splide);
      this.splide.mount(extensions, transition);
      this.options = merge2({}, options || {});
      this.slides = this.getSlides();
    }
  }
  componentWillUnmount() {
    if (this.splide) {
      this.splide.destroy();
      this.splide = void 0;
    }
    this.options = void 0;
    this.slides.length = 0;
  }
  componentDidUpdate() {
    if (!this.splide) {
      return;
    }
    const { options } = this.props;
    if (options && !isEqualDeep(this.options, options)) {
      this.splide.options = options;
      this.options = merge2({}, options);
    }
    const newSlides = this.getSlides();
    if (!isEqualShallow(this.slides, newSlides)) {
      this.splide.refresh();
      this.slides = newSlides;
    }
  }
  sync(splide) {
    var _a;
    (_a = this.splide) == null ? void 0 : _a.sync(splide);
  }
  go(control) {
    var _a;
    (_a = this.splide) == null ? void 0 : _a.go(control);
  }
  getSlides() {
    var _a;
    if (this.splide) {
      const children2 = (_a = this.splide.Components.Elements) == null ? void 0 : _a.list.children;
      return children2 && Array.prototype.slice.call(children2) || [];
    }
    return [];
  }
  bind(splide) {
    EVENTS.forEach(([event, name]) => {
      const handler = this.props[name];
      if (typeof handler === "function") {
        splide.on(event, (...args) => {
          handler(splide, ...args);
        });
      }
    });
  }
  omit(props, keys) {
    keys.forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(props, key)) {
        delete props[key];
      }
    });
    return props;
  }
  render() {
    const { className, tag: Root = "div", hasTrack = true, children: children2, ...props } = this.props;
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Root, {
      className: classNames("splide", className),
      ref: this.splideRef,
      ...this.omit(props, ["options", ...EVENTS.map((event) => event[1])])
    }, hasTrack ? /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(SplideTrack, null, children2) : children2);
  }
};

// src/js/components/SplideSlide/SplideSlide.tsx

var SplideSlide = ({ children: children2, className, ...props }) => {
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    className: classNames("splide__slide", className),
    ...props
  }, children2);
};

/*!
 * Splide.js
 * Version  : 4.1.3
 * License  : MIT
 * Copyright: 2022 Naotoshi Fujita
 */


/***/ }),

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
        request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(
        timeoutErrorMessage,
        config,
        config.transitional && config.transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

// Expose isAxiosError
axios.isAxiosError = __webpack_require__(/*! ./helpers/isAxiosError */ "./node_modules/axios/lib/helpers/isAxiosError.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports["default"] = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/***/ (function(module) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/***/ (function(module) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var validator = __webpack_require__(/*! ../helpers/validator */ "./node_modules/axios/lib/helpers/validator.js");

var validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  var transitional = config.transitional;

  if (transitional !== undefined) {
    validator.assertOptions(transitional, {
      silentJSONParsing: validators.transitional(validators.boolean, '1.0.0'),
      forcedJSONParsing: validators.transitional(validators.boolean, '1.0.0'),
      clarifyTimeoutError: validators.transitional(validators.boolean, '1.0.0')
    }, false);
  }

  // filter out skipped interceptors
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return;
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });

  var promise;

  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined];

    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);

    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }


  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }

  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }

  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/***/ (function(module) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var defaults = __webpack_require__(/*! ./../defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  var context = this || defaults;
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");
var enhanceError = __webpack_require__(/*! ./core/enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

var defaults = {

  transitional: {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  },

  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data) || (headers && headers['Content-Type'] === 'application/json')) {
      setContentTypeIfUnset(headers, 'application/json');
      return stringifySafely(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    var transitional = this.transitional;
    var silentJSONParsing = transitional && transitional.silentJSONParsing;
    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

    if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw enhanceError(e, this, 'E_JSON_PARSE');
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;


/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/***/ (function(module) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/***/ (function(module) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/***/ (function(module) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAxiosError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAxiosError.js ***!
  \********************************************************/
/***/ (function(module) {

"use strict";


/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return (typeof payload === 'object') && (payload.isAxiosError === true);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/***/ (function(module) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/validator.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/validator.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var pkg = __webpack_require__(/*! ./../../package.json */ "./node_modules/axios/package.json");

var validators = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

var deprecatedWarnings = {};
var currentVerArr = pkg.version.split('.');

/**
 * Compare package versions
 * @param {string} version
 * @param {string?} thanVersion
 * @returns {boolean}
 */
function isOlderVersion(version, thanVersion) {
  var pkgVersionArr = thanVersion ? thanVersion.split('.') : currentVerArr;
  var destVer = version.split('.');
  for (var i = 0; i < 3; i++) {
    if (pkgVersionArr[i] > destVer[i]) {
      return true;
    } else if (pkgVersionArr[i] < destVer[i]) {
      return false;
    }
  }
  return false;
}

/**
 * Transitional option validator
 * @param {function|boolean?} validator
 * @param {string?} version
 * @param {string} message
 * @returns {function}
 */
validators.transitional = function transitional(validator, version, message) {
  var isDeprecated = version && isOlderVersion(version);

  function formatMessage(opt, desc) {
    return '[Axios v' + pkg.version + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return function(value, opt, opts) {
    if (validator === false) {
      throw new Error(formatMessage(opt, ' has been removed in ' + version));
    }

    if (isDeprecated && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new TypeError('options must be an object');
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator = schema[opt];
    if (validator) {
      var value = options[opt];
      var result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new TypeError('option ' + opt + ' must be ' + result);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw Error('Unknown option ' + opt);
    }
  }
}

module.exports = {
  isOlderVersion: isOlderVersion,
  assertOptions: assertOptions,
  validators: validators
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};


/***/ }),

/***/ "./src/blocks/Logo.js":
/*!****************************!*\
  !*** ./src/blocks/Logo.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Logo = function Logo(a) {
  return /*#__PURE__*/React.createElement("svg", {
    version: "1.1",
    id: "Calque_1",
    xmlns: "http://www.w3.org/2000/svg",
    x: "0px",
    y: "0px",
    width: "".concat(a.size, "px"),
    height: "".concat(a.size, "px"),
    viewBox: "0 0 850.39 850.39",
    enableBackground: "new 0 0 850.39 850.39"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "".concat(a.fill),
    d: "M425.195,2C190.366,2,0,191.918,0,426.195C0,660.472,190.366,850.39,425.195,850.39 c234.828,0,425.195-189.918,425.195-424.195C850.39,191.918,660.023,2,425.195,2z M662.409,476.302l-2.624,4.533L559.296,654.451 l78.654,45.525l-228.108,105.9L388.046,555.33l78.653,45.523l69.391-119.887l-239.354-0.303l-94.925-0.337l-28.75-0.032l-0.041-0.07 h0l-24.361-42.303l28.111-48.563l109.635-189.419l-78.653-45.524L435.859,48.514l21.797,250.546l-78.654-45.525l-69.391,119.887 l239.353,0.303l123.676,0.37l16.571,28.772l7.831,13.596L662.409,476.302z"
  }));
};
Logo.defaultProps = {
  size: '75',
  fill: '#DB3939'
};
/* harmony default export */ __webpack_exports__["default"] = (Logo);

/***/ }),

/***/ "./src/blocks/PluginInfoCard/block.js":
/*!********************************************!*\
  !*** ./src/blocks/PluginInfoCard/block.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./block.json */ "./src/blocks/PluginInfoCard/block.json");
/* harmony import */ var _components_InfoCardIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/InfoCardIcon */ "./src/blocks/components/InfoCardIcon.js");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./src/blocks/PluginInfoCard/edit.js");




//  Import main block file.

var registerBlockType = wp.blocks.registerBlockType; // Import registerBlockType() from wp.blocks

registerBlockType(_block_json__WEBPACK_IMPORTED_MODULE_0__, {
  icon: /*#__PURE__*/React.createElement(_components_InfoCardIcon__WEBPACK_IMPORTED_MODULE_1__["default"], {
    fill: "#333"
  }),
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"],
  save: function save() {
    return null;
  },
  transforms: {
    from: [{
      type: 'block',
      blocks: ['core/embed'],
      transform: function transform(a) {
        var b = a.url,
          c = a.providerNameSlug;
        var d = /https:\/\/wordpress\.org\/plugins\/([a-z0-9-]+)\/?/i;
        var e = /https:\/\/wordpress\.org\/themes\/([a-z0-9-]+)\/?/i;
        var f = d.exec(b);
        if (f) {
          return (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__.createBlock)('wp-plugin-info-card/wp-plugin-info-card', {
            slug: f[1],
            type: 'plugin',
            loading: false,
            defaultsApplied: false
          });
        }
        var g = e.exec(b);
        if (g) {
          return (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__.createBlock)('wp-plugin-info-card/wp-plugin-info-card', {
            slug: g[1],
            type: 'theme',
            loading: false,
            defaultsApplied: false
          });
        }
      }
    }, {
      type: 'raw',
      isMatch: function isMatch(a) {
        if (a.nodeName === 'P') {
          // RegEx for detecting plugin slug in WordPress URL.
          var b = /https:\/\/wordpress\.org\/plugins\/([a-z0-9-]+)\/?/i;
          var c = /https:\/\/wordpress\.org\/themes\/([a-z0-9-]+)\/?/i;
          var d = b.exec(a.textContent);
          var e = c.exec(a.textContent);
          if (d || e) {
            return true;
          }
        }
        return false;
      },
      priority: 5,
      transform: function transform(a) {
        // Extract slug from URL.
        var b = /https:\/\/wordpress\.org\/plugins\/([a-z0-9-]+)\/?/i;
        var c = /https:\/\/wordpress\.org\/themes\/([a-z0-9-]+)\/?/i;
        var d = b.exec(a.textContent);
        var e = c.exec(a.textContent);
        var f = '';
        if (d) {
          f = d[1];
        }
        if (e) {
          f = e[1];
        }
        return (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__.createBlock)('wp-plugin-info-card/wp-plugin-info-card', {
          slug: f,
          type: d ? 'plugin' : 'theme',
          loading: false,
          defaultsApplied: false
        });
      }
    }]
  }
});

/***/ }),

/***/ "./src/blocks/PluginInfoCard/edit.js":
/*!*******************************************!*\
  !*** ./src/blocks/PluginInfoCard/edit.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _templates_PluginFlex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../templates/PluginFlex */ "./src/blocks/templates/PluginFlex.js");
/* harmony import */ var _templates_PluginCard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../templates/PluginCard */ "./src/blocks/templates/PluginCard.js");
/* harmony import */ var _templates_PluginLarge__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../templates/PluginLarge */ "./src/blocks/templates/PluginLarge.js");
/* harmony import */ var _templates_PluginWordPress__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../templates/PluginWordPress */ "./src/blocks/templates/PluginWordPress.js");
/* harmony import */ var _templates_ThemeFlex__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../templates/ThemeFlex */ "./src/blocks/templates/ThemeFlex.js");
/* harmony import */ var _templates_ThemeWordPress__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../templates/ThemeWordPress */ "./src/blocks/templates/ThemeWordPress.js");
/* harmony import */ var _templates_ThemeLarge__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../templates/ThemeLarge */ "./src/blocks/templates/ThemeLarge.js");
/* harmony import */ var _templates_ThemeCard__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../templates/ThemeCard */ "./src/blocks/templates/ThemeCard.js");
/* harmony import */ var _Logo__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../Logo */ "./src/blocks/Logo.js");
/* harmony import */ var _components_Numbers__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/Numbers */ "./src/blocks/components/Numbers.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_12__);
function _slicedToArray(a, b) { return _arrayWithHoles(a) || _iterableToArrayLimit(a, b) || _unsupportedIterableToArray(a, b) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(a, b) { if (!a) return; if (typeof a === "string") return _arrayLikeToArray(a, b); var c = Object.prototype.toString.call(a).slice(8, -1); if (c === "Object" && a.constructor) c = a.constructor.name; if (c === "Map" || c === "Set") return Array.from(a); if (c === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)) return _arrayLikeToArray(a, b); }
function _arrayLikeToArray(a, b) { if (b == null || b > a.length) b = a.length; for (var c = 0, d = new Array(b); c < b; c++) d[c] = a[c]; return d; }
function _iterableToArrayLimit(b, c) { var d = null == b ? null : "undefined" != typeof Symbol && b[Symbol.iterator] || b["@@iterator"]; if (null != d) { var g, h, j, k, l = [], a = !0, m = !1; try { if (j = (d = d.call(b)).next, 0 === c) { if (Object(d) !== d) return; a = !1; } else for (; !(a = (g = j.call(d)).done) && (l.push(g.value), l.length !== c); a = !0); } catch (a) { m = !0, h = a; } finally { try { if (!a && null != d["return"] && (k = d["return"](), Object(k) !== k)) return; } finally { if (m) throw h; } } return l; } }
function _arrayWithHoles(a) { if (Array.isArray(a)) return a; }
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
/**
 * External dependencies
 */













var _wp$element = wp.element,
  Fragment = _wp$element.Fragment,
  useEffect = _wp$element.useEffect,
  useState = _wp$element.useState;
var __ = wp.i18n.__;
var _wp$components = wp.components,
  PanelBody = _wp$components.PanelBody,
  PanelRow = _wp$components.PanelRow,
  SelectControl = _wp$components.SelectControl,
  Spinner = _wp$components.Spinner,
  TextControl = _wp$components.TextControl,
  ToolbarGroup = _wp$components.ToolbarGroup,
  ToolbarButton = _wp$components.ToolbarButton,
  ToolbarItem = _wp$components.ToolbarItem,
  DropdownMenu = _wp$components.DropdownMenu,
  TabPanel = _wp$components.TabPanel,
  Button = _wp$components.Button,
  MenuItemsChoice = _wp$components.MenuItemsChoice,
  BaseControl = _wp$components.BaseControl,
  ButtonGroup = _wp$components.ButtonGroup,
  Notice = _wp$components.Notice;
var _wp$blockEditor = wp.blockEditor,
  InspectorControls = _wp$blockEditor.InspectorControls,
  BlockAlignmentToolbar = _wp$blockEditor.BlockAlignmentToolbar,
  MediaUpload = _wp$blockEditor.MediaUpload,
  BlockControls = _wp$blockEditor.BlockControls,
  useBlockProps = _wp$blockEditor.useBlockProps;
var useInstanceId = wp.compose.useInstanceId;
var WPPluginInfoCard = function WPPluginInfoCard(a) {
  var b = a.attributes,
    c = a.setAttributes;
  var d = b.cols,
    e = b.colGap,
    f = b.rowGap;
  var g = useInstanceId(WPPluginInfoCard, 'wp-plugin-info-card-id');
  var h = useState(b.type),
    i = _slicedToArray(h, 2),
    j = i[0],
    k = i[1];
  var l = useState(b.slug),
    m = _slicedToArray(l, 2),
    n = m[0],
    o = m[1];
  var p = useState(false),
    q = _slicedToArray(p, 2),
    r = q[0],
    s = q[1];
  var t = useState(b.loading),
    u = _slicedToArray(t, 2),
    v = u[0],
    w = u[1];
  var x = useState(b.image),
    y = _slicedToArray(x, 2),
    z = y[0],
    A = y[1];
  var B = useState(b.containerid),
    C = _slicedToArray(B, 2),
    D = C[0],
    E = C[1];
  var F = useState(b.scheme),
    G = _slicedToArray(F, 2),
    H = G[0],
    I = G[1];
  var J = useState(b.layout),
    K = _slicedToArray(J, 2),
    L = K[0],
    M = K[1];
  var N = useState(true),
    O = _slicedToArray(N, 2),
    P = O[0],
    Q = O[1];
  var R = useState(false),
    S = _slicedToArray(R, 2),
    T = S[0],
    U = S[1];
  var V = useState(b.preview),
    W = _slicedToArray(V, 2),
    X = W[0],
    Y = W[1];
  var Z = useState(b.assetData),
    $ = _slicedToArray(Z, 2),
    _ = $[0],
    aa = $[1];
  var ba = useState(b.align),
    ca = _slicedToArray(ba, 2),
    da = ca[0],
    ea = ca[1];
  var fa = useState(false),
    ga = _slicedToArray(fa, 2),
    ha = ga[0],
    ia = ga[1];
  useEffect(function () {
    c({
      uniqueId: g
    });
  }, []);
  useEffect(function () {
    if (Object.values(b.assetData).length > 1) {
      U(true);
    } else {
      U(false);
    }
  }, [b.assetData]);
  var ja = function loadData() {
    s(false);
    w(true);
    ia(false);
    var a = wppic.rest_url + 'wppic/v2/get_data';
    axios__WEBPACK_IMPORTED_MODULE_0___default().get(a + "?type=".concat(j, "&slug=").concat(encodeURIComponent(n))).then(function (a) {
      if (a.data.success) {
        // Now Set State
        aa(a.data.data);
        c({
          assetData: a.data.data
        });
        w(false);
      } else {
        ia(true);
        w(false);
        s(true);
      }
    });
  };
  var ka = function pluginOnClick(a, b) {
    ja();
  };
  useEffect(function () {
    if (!_ || 0 === _.length) {
      ja();
    }
    A(b.image);
    M(b.layout);
    s(b.loading);
    k(b.type);
    o(b.slug);
    if (!b.defaultsApplied && 'default' === b.scheme) {
      c({
        defaultsApplied: true,
        scheme: wppic.default_scheme,
        layout: wppic.default_layout
      });
      I(wppic.default_scheme);
      M(wppic.default_layout);
    }
  }, []);
  var la = function outputInfoCards(a) {
    return a.map(function (a, b) {
      return /*#__PURE__*/React.createElement(Fragment, {
        key: b
      }, 'flex' === L && 'plugin' === j && /*#__PURE__*/React.createElement(_templates_PluginFlex__WEBPACK_IMPORTED_MODULE_2__["default"], {
        scheme: H,
        image: z,
        data: a,
        align: da
      }), 'card' === L && 'plugin' === j && /*#__PURE__*/React.createElement(_templates_PluginCard__WEBPACK_IMPORTED_MODULE_3__["default"], {
        scheme: H,
        image: z,
        data: a,
        align: da
      }), 'large' === L && 'plugin' === j && /*#__PURE__*/React.createElement(_templates_PluginLarge__WEBPACK_IMPORTED_MODULE_4__["default"], {
        scheme: H,
        image: z,
        data: a,
        align: da
      }), 'wordpress' === L && 'plugin' === j && /*#__PURE__*/React.createElement(_templates_PluginWordPress__WEBPACK_IMPORTED_MODULE_5__["default"], {
        scheme: H,
        image: z,
        data: a,
        align: da
      }), 'flex' === L && 'theme' === j && /*#__PURE__*/React.createElement(_templates_ThemeFlex__WEBPACK_IMPORTED_MODULE_6__["default"], {
        scheme: H,
        image: z,
        data: a,
        align: da
      }), 'wordpress' === L && 'theme' === j && /*#__PURE__*/React.createElement(_templates_ThemeWordPress__WEBPACK_IMPORTED_MODULE_7__["default"], {
        scheme: H,
        image: z,
        data: a,
        align: da
      }), 'large' === L && 'theme' === j && /*#__PURE__*/React.createElement(_templates_ThemeLarge__WEBPACK_IMPORTED_MODULE_8__["default"], {
        scheme: H,
        image: z,
        data: a,
        align: da
      }), 'card' === L && 'theme' === j && /*#__PURE__*/React.createElement(_templates_ThemeCard__WEBPACK_IMPORTED_MODULE_9__["default"], {
        scheme: H,
        image: z,
        data: a,
        align: da
      }));
    });
  };

  /**
   * Retrieve colums interface for sidebar options.
   *
   * @return {Element} The columns interface.
   */
  var ma = function getCols() {
    return /*#__PURE__*/React.createElement(BaseControl, {
      id: "col-count",
      label: __('Select How Many Columns', 'wp-plugin-info-card')
    }, /*#__PURE__*/React.createElement(ButtonGroup, null, /*#__PURE__*/React.createElement(Button, {
      isPrimary: d === 1,
      isSecondary: d !== 1,
      onClick: function onClick() {
        c({
          cols: 1
        });
      }
    }, __('One', 'wp-plugin-info-card')), /*#__PURE__*/React.createElement(Button, {
      isPrimary: d === 2,
      isSecondary: d !== 2,
      onClick: function onClick() {
        c({
          cols: 2
        });
      }
    }, __('Two', 'wp-plugin-info-card')), /*#__PURE__*/React.createElement(Button, {
      isPrimary: d === 3,
      isSecondary: d !== 3,
      onClick: function onClick() {
        c({
          cols: 3
        });
      }
    }, __('Three', 'wp-plugin-info-card'))));
  };
  var na = [{
    icon: 'edit',
    title: __('Edit and Configure', 'wp-plugin-info-card'),
    onClick: function onClick() {
      return s(true);
    }
  }];
  var oa = [{
    value: 'plugin',
    label: __('Plugin', 'wp-plugin-info-card')
  }, {
    value: 'theme',
    label: __('Theme', 'wp-plugin-info-card')
  }];
  var pa = [{
    value: 'none',
    label: __('None', 'wp-plugin-info-card')
  }, {
    value: 'before',
    label: __('Before', 'wp-plugin-info-card')
  }, {
    value: 'after',
    label: __('After', 'wp-plugin-info-card')
  }];
  var qa = [{
    value: 'false',
    label: __('No', 'wp-plugin-info-card')
  }, {
    value: 'true',
    label: __('Yes', 'wp-plugin-info-card')
  }];
  var ra = [{
    value: 'default',
    label: __('Default', 'wp-plugin-info-card')
  }, {
    value: 'scheme1',
    label: __('Scheme 1', 'wp-plugin-info-card')
  }, {
    value: 'scheme2',
    label: __('Scheme 2', 'wp-plugin-info-card')
  }, {
    value: 'scheme3',
    label: __('Scheme 3', 'wp-plugin-info-card')
  }, {
    value: 'scheme4',
    label: __('Scheme 4', 'wp-plugin-info-card')
  }, {
    value: 'scheme5',
    label: __('Scheme 5', 'wp-plugin-info-card')
  }, {
    value: 'scheme6',
    label: __('Scheme 6', 'wp-plugin-info-card')
  }, {
    value: 'scheme7',
    label: __('Scheme 7', 'wp-plugin-info-card')
  }, {
    value: 'scheme8',
    label: __('Scheme 8', 'wp-plugin-info-card')
  }, {
    value: 'scheme9',
    label: __('Scheme 9', 'wp-plugin-info-card')
  }, {
    value: 'scheme10',
    label: __('Scheme 10', 'wp-plugin-info-card')
  }, {
    value: 'scheme11',
    label: __('Scheme 11', 'wp-plugin-info-card')
  }, {
    value: 'scheme12',
    label: __('Scheme 12', 'wp-plugin-info-card')
  }, {
    value: 'scheme13',
    label: __('Scheme 13', 'wp-plugin-info-card')
  }, {
    value: 'scheme14',
    label: __('Scheme 14', 'wp-plugin-info-card')
  }];
  var sa = [{
    value: 'card',
    label: __('Card', 'wp-plugin-info-card')
  }, {
    value: 'large',
    label: __('Large', 'wp-plugin-info-card')
  }, {
    value: 'wordpress',
    label: __('WordPress', 'wp-plugin-info-card')
  }, {
    value: 'flex',
    label: __('Flex', 'wp-plugin-info-card')
  }];
  var ta = 'card' === L ? 'wp-pic-card' : L;
  var ua = v ? 'wp-pic-spin' : '';
  var va = /*#__PURE__*/React.createElement(InspectorControls, null, /*#__PURE__*/React.createElement(PanelBody, {
    title: __('Layout', 'wp-plugin-info-card')
  }, /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(SelectControl, {
    label: __('Scheme', 'wp-plugin-info-card'),
    options: ra,
    value: H,
    onChange: function onChange(a) {
      c({
        scheme: a
      });
      I(a);
    }
  })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(SelectControl, {
    label: __('Layout', 'wp-plugin-info-card'),
    options: sa,
    value: L,
    onChange: function onChange(a) {
      if ('flex' === a) {
        c({
          layout: a,
          align: 'full'
        });
        M(a);
        ea('full');
      } else {
        c({
          layout: a,
          align: 'center'
        });
        M(a);
        ea('center');
      }
    }
  })), T && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PanelRow, {
    className: "wppic-panel-rows-cols"
  }, ma()), /*#__PURE__*/React.createElement(PanelRow, {
    className: "wppic-panel-rows-numbers"
  }, /*#__PURE__*/React.createElement(_components_Numbers__WEBPACK_IMPORTED_MODULE_11__["default"], {
    value: e,
    label: __('Column Gap (in px)', 'wp-plugin-info-card'),
    numbers: [20, 40, 60, 80],
    onClick: function onClick(a) {
      c({
        colGap: parseInt(a)
      });
    },
    id: "wppic-col-gap"
  })), /*#__PURE__*/React.createElement(PanelRow, {
    className: "wppic-panel-rows-numbers"
  }, /*#__PURE__*/React.createElement(_components_Numbers__WEBPACK_IMPORTED_MODULE_11__["default"], {
    value: f,
    label: __('Row Gap (in px)', 'wp-plugin-info-card'),
    numbers: [20, 40, 60, 80],
    onClick: function onClick(a) {
      c({
        rowGap: parseInt(a)
      });
    },
    id: "wppic-row-gap"
  })))), /*#__PURE__*/React.createElement(PanelBody, {
    title: __('Options', 'wp-plugin-info-card'),
    initialOpen: false
  }, /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(MediaUpload, {
    onSelect: function onSelect(a) {
      c({
        image: a.url
      });
      A(a.url);
    },
    type: "image",
    value: z,
    render: function render(a) {
      var b = a.open;
      return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("button", {
        className: "components-button is-button",
        onClick: b
      }, __('Upload Image!', 'wp-plugin-info-card')), z && /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
        src: z,
        alt: __('Plugin Card Image', 'wp-plugin-info-card'),
        width: "250",
        height: "250"
      })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
        className: "components-button is-button",
        onClick: function onClick(a) {
          c({
            image: ''
          });
          A('');
        }
      }, __('Reset Image', 'wp-plugin-info-card')))));
    }
  })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(TextControl, {
    label: __('Container ID', 'wp-plugin-info-card'),
    type: "text",
    value: D,
    onChange: function onChange(a) {
      c({
        containerid: a
      });
      E(a);
    }
  }))));
  var wa = "\n\t\t#".concat(b.uniqueId, " {\n\t\t\tdisplay: grid;\n\t\t\tcolumn-gap: ").concat(e, "px;\n\t\t\trow-gap: ").concat(f, "px;\n\t\t}\n\t");
  var xa = useBlockProps({
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()("wp-plugin-info-card align".concat(da))
  });
  if (X) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: wppic.wppic_preview,
      alt: "",
      style: {
        width: '100%',
        height: 'auto'
      }
    }));
  }
  if (v) {
    return /*#__PURE__*/React.createElement("div", xa, /*#__PURE__*/React.createElement("div", {
      className: "wppic-loading-placeholder"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wppic-loading"
    }, /*#__PURE__*/React.createElement(_Logo__WEBPACK_IMPORTED_MODULE_10__["default"], {
      size: "45"
    }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
      className: "wppic-spinner"
    }, /*#__PURE__*/React.createElement(Spinner, null)))));
  }
  var ya = /*#__PURE__*/React.createElement(Fragment, null, r && /*#__PURE__*/React.createElement("div", {
    className: "wppic-query-block wppic-query-block-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wppic-block-svg"
  }, /*#__PURE__*/React.createElement(_Logo__WEBPACK_IMPORTED_MODULE_10__["default"], {
    size: "75"
  })), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-tab-panel"
  }, /*#__PURE__*/React.createElement(TabPanel, {
    activeClass: "active-tab",
    initialTabName: "slug",
    tabs: [{
      title: __('Type', 'wp-plugin-info-card'),
      name: 'slug',
      className: 'wppic-tab-slug'
    }, {
      title: __('Appearance', 'wp-plugin-info-card'),
      name: 'layout',
      className: 'wppic-tab-layout'
    }]
  }, function (a) {
    var b;
    if ('slug' === a.name) {
      b = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SelectControl, {
        label: __('Select a Plugin or Theme', 'wp-plugin-info-card'),
        options: oa,
        value: j,
        onChange: function onChange(a) {
          c({
            type: a
          });
          k(a);
        }
      }), /*#__PURE__*/React.createElement(TextControl, {
        label: __('Plugin or Theme Slug', 'wp-plugin-info-card'),
        value: n,
        onChange: function onChange(a) {
          c({
            slug: a
          });
          o(a);
        },
        help: __('Comma separated slugs are supported.', 'wp-plugin-info-card')
      }), ha && /*#__PURE__*/React.createElement(Notice, {
        status: "error",
        isDismissible: false
      }, __('No data found for the given slug.', 'wp-plugin-info-card')));
    } else if ('layout' === a.name) {
      b = /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SelectControl, {
        label: __('Select an initial layout', 'wp-plugin-info-card'),
        options: sa,
        value: L,
        onChange: function onChange(a) {
          if ('flex' === a) {
            c({
              layout: a,
              align: 'full'
            });
            M(a);
            ea('full');
          } else {
            c({
              layout: a,
              align: 'center'
            });
            M(a);
            ea('center');
          }
        }
      }), /*#__PURE__*/React.createElement(SelectControl, {
        label: __('Scheme', 'wp-plugin-info-card'),
        options: ra,
        value: H,
        onChange: function onChange(a) {
          c({
            scheme: a
          });
          I(a);
        }
      })));
    } else {
      b = /*#__PURE__*/React.createElement(Fragment, null, "no data found");
    }
    return /*#__PURE__*/React.createElement("div", null, b);
  })), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-gutenberg-button"
  }, /*#__PURE__*/React.createElement(Button, {
    iconSize: 20,
    icon: /*#__PURE__*/React.createElement(_Logo__WEBPACK_IMPORTED_MODULE_10__["default"], {
      size: "25"
    }),
    isSecondary: true,
    id: "wppic-input-submit",
    onClick: function onClick(a) {
      a.preventDefault();
      c({
        loading: false
      });
      ka(a);
    }
  }, __('Preview and Configure', 'wp-plugin-info-card')))), v && /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "wppic-loading-placeholder"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wppic-loading"
  }, /*#__PURE__*/React.createElement(_Logo__WEBPACK_IMPORTED_MODULE_10__["default"], {
    size: "45"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
    className: "wppic-spinner"
  }, /*#__PURE__*/React.createElement(Spinner, null))))), !r && !v && /*#__PURE__*/React.createElement(Fragment, null, va, /*#__PURE__*/React.createElement(BlockControls, null, /*#__PURE__*/React.createElement(ToolbarGroup, null, /*#__PURE__*/React.createElement(ToolbarButton, {
    icon: "edit",
    title: __('Edit and Configure', 'wp-plugin-info-card'),
    onClick: function onClick() {
      return s(true);
    }
  })), /*#__PURE__*/React.createElement(ToolbarGroup, null, /*#__PURE__*/React.createElement(ToolbarItem, {
    as: "button"
  }, function (a) {
    return /*#__PURE__*/React.createElement(DropdownMenu, {
      toggleProps: a,
      label: __('Select Color Scheme', 'wp-plugin-info-card'),
      icon: "admin-customizer"
    }, function (a) {
      var b = a.onClose;
      return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(MenuItemsChoice, {
        choices: ra,
        onSelect: function onSelect(a) {
          c({
            scheme: a
          });
          I(a);
          b();
        },
        value: H
      }));
    });
  })), /*#__PURE__*/React.createElement(ToolbarGroup, null, /*#__PURE__*/React.createElement(ToolbarItem, {
    as: "button"
  }, function (a) {
    return /*#__PURE__*/React.createElement(DropdownMenu, {
      toggleProps: a,
      label: __('Select a Layout', 'wp-plugin-info-card'),
      icon: "layout"
    }, function (a) {
      var b = a.onClose;
      return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(MenuItemsChoice, {
        choices: sa,
        onSelect: function onSelect(a) {
          c({
            layout: a
          });
          M(a);
          b();
        },
        value: L
      }));
    });
  }))), T && /*#__PURE__*/React.createElement("style", null, wa), /*#__PURE__*/React.createElement("div", {
    id: b.uniqueId,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('is-placeholder', ta, 'wp-block-plugin-info-card', "align".concat(da), "cols-".concat(d), {
      'has-grid': T
    })
  }, la(_))));
  return /*#__PURE__*/React.createElement("div", xa, ya);
};
/* harmony default export */ __webpack_exports__["default"] = (WPPluginInfoCard);

/***/ }),

/***/ "./src/blocks/PluginInfoCardQuery/edit-query.js":
/*!******************************************************!*\
  !*** ./src/blocks/PluginInfoCardQuery/edit-query.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _templates_PluginFlex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../templates/PluginFlex */ "./src/blocks/templates/PluginFlex.js");
/* harmony import */ var _templates_PluginCard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../templates/PluginCard */ "./src/blocks/templates/PluginCard.js");
/* harmony import */ var _templates_PluginLarge__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../templates/PluginLarge */ "./src/blocks/templates/PluginLarge.js");
/* harmony import */ var _templates_PluginWordPress__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../templates/PluginWordPress */ "./src/blocks/templates/PluginWordPress.js");
/* harmony import */ var _templates_ThemeFlex__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../templates/ThemeFlex */ "./src/blocks/templates/ThemeFlex.js");
/* harmony import */ var _templates_ThemeWordPress__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../templates/ThemeWordPress */ "./src/blocks/templates/ThemeWordPress.js");
/* harmony import */ var _templates_ThemeLarge__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../templates/ThemeLarge */ "./src/blocks/templates/ThemeLarge.js");
/* harmony import */ var _templates_ThemeCard__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../templates/ThemeCard */ "./src/blocks/templates/ThemeCard.js");
/* harmony import */ var _Logo__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../Logo */ "./src/blocks/Logo.js");
function _slicedToArray(a, b) { return _arrayWithHoles(a) || _iterableToArrayLimit(a, b) || _unsupportedIterableToArray(a, b) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(a, b) { if (!a) return; if (typeof a === "string") return _arrayLikeToArray(a, b); var c = Object.prototype.toString.call(a).slice(8, -1); if (c === "Object" && a.constructor) c = a.constructor.name; if (c === "Map" || c === "Set") return Array.from(a); if (c === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)) return _arrayLikeToArray(a, b); }
function _arrayLikeToArray(a, b) { if (b == null || b > a.length) b = a.length; for (var c = 0, d = new Array(b); c < b; c++) d[c] = a[c]; return d; }
function _iterableToArrayLimit(b, c) { var d = null == b ? null : "undefined" != typeof Symbol && b[Symbol.iterator] || b["@@iterator"]; if (null != d) { var g, h, j, k, l = [], a = !0, m = !1; try { if (j = (d = d.call(b)).next, 0 === c) { if (Object(d) !== d) return; a = !1; } else for (; !(a = (g = j.call(d)).done) && (l.push(g.value), l.length !== c); a = !0); } catch (a) { m = !0, h = a; } finally { try { if (!a && null != d["return"] && (k = d["return"](), Object(k) !== k)) return; } finally { if (m) throw h; } } return l; } }
function _arrayWithHoles(a) { if (Array.isArray(a)) return a; }
// @ts-nocheck
/**
 * External dependencies
 */


var HtmlToReactParser = (__webpack_require__(/*! html-to-react */ "./node_modules/html-to-react/index.js").Parser);
var __ = wp.i18n.__;
var _wp$element = wp.element,
  useState = _wp$element.useState,
  useEffect = _wp$element.useEffect,
  Fragment = _wp$element.Fragment;
var _wp$components = wp.components,
  PanelBody = _wp$components.PanelBody,
  SelectControl = _wp$components.SelectControl,
  Spinner = _wp$components.Spinner,
  TextControl = _wp$components.TextControl,
  Button = _wp$components.Button,
  ToolbarGroup = _wp$components.ToolbarGroup,
  Notice = _wp$components.Notice;
var _wp$blockEditor = wp.blockEditor,
  InspectorControls = _wp$blockEditor.InspectorControls,
  BlockControls = _wp$blockEditor.BlockControls,
  MediaUpload = _wp$blockEditor.MediaUpload,
  AlignmentToolbar = _wp$blockEditor.AlignmentToolbar,
  BlockAlignmentToolbar = _wp$blockEditor.BlockAlignmentToolbar,
  useBlockProps = _wp$blockEditor.useBlockProps;









var WP_Plugin_Card_Query = function WP_Plugin_Card_Query(a) {
  var b = a.attributes,
    c = a.setAttributes;
  var d = useState(false),
    e = _slicedToArray(d, 2),
    f = e[0],
    g = e[1];
  var h = useState(false),
    i = _slicedToArray(h, 2),
    j = i[0],
    k = i[1];
  var l = useState(false),
    m = _slicedToArray(l, 2),
    n = m[0],
    o = m[1];
  var p = b.assetData,
    q = b.type,
    r = b.slug,
    s = b.html,
    t = b.align,
    u = b.image,
    v = b.containerid,
    w = b.margin,
    x = b.clear,
    y = b.expiration,
    z = b.ajax,
    A = b.scheme,
    B = b.layout,
    C = b.width,
    D = b.search,
    E = b.tag,
    F = b.author,
    G = b.user,
    H = b.browse,
    I = b.per_page,
    J = b.preview,
    K = b.cols,
    L = b.sortby,
    M = b.sort;
  useEffect(function () {
    // If we have HTML, then we don't need to load it.
    if (!s) {
      g(true);
    } else {
      g(false);
    }

    // Apply defaults.
    if (!b.defaultsApplied && 'default' === b.scheme) {
      c({
        defaultsApplied: true,
        scheme: wppic.default_scheme,
        layout: wppic.default_layout
      });
    }
  }, []);
  var N = function pluginOnClick(a) {
    if ('' !== q) {
      k(true);
      var d = wppic.rest_url + 'wppic/v1/get_query/';
      axios__WEBPACK_IMPORTED_MODULE_0___default().get(d + "?type=".concat(b.type, "&slug=").concat(b.slug, "&align=").concat(b.align, "&image=").concat(b.image, "&containerid=").concat(b.containerid, "&margin=").concat(b.margin, "&clear=").concat(b.clear, "&expiration=").concat(b.expiration, "&ajax=").concat(b.ajax, "&scheme=").concat(b.scheme, "&layout=").concat(b.layout, "&search=").concat(b.search, "&tag=").concat(b.tag, "&author=").concat(b.author, "&user=").concat(b.user, "&browse=").concat(b.browse, "&per_page=").concat(b.per_page, "&cols=").concat(b.cols, "}&sortby=").concat(b.sortby, "&sort=").concat(b.sort)).then(function (a) {
        // Now Set State
        g(false);
        k(false);
        if (a.data.success) {
          c({
            assetData: a.data.data.api_response,
            html: a.data.data.html
          });
        } else {
          c({
            assetData: [],
            html: ''
          });
          o(true);
          g(true);
        }
      });
    }
  };
  var O = function outputInfoCards() {
    return p.map(function (a, b) {
      return /*#__PURE__*/React.createElement(Fragment, {
        key: b
      }, 'flex' === B && 'plugin' === q && /*#__PURE__*/React.createElement(_templates_PluginFlex__WEBPACK_IMPORTED_MODULE_2__["default"], {
        scheme: A,
        image: u,
        data: a,
        align: t
      }), 'card' === B && 'plugin' === q && /*#__PURE__*/React.createElement(_templates_PluginCard__WEBPACK_IMPORTED_MODULE_3__["default"], {
        scheme: A,
        image: u,
        data: a,
        align: t
      }), 'large' === B && 'plugin' === q && /*#__PURE__*/React.createElement(_templates_PluginLarge__WEBPACK_IMPORTED_MODULE_4__["default"], {
        scheme: A,
        image: u,
        data: a,
        align: t
      }), 'wordpress' === B && 'plugin' === q && /*#__PURE__*/React.createElement(_templates_PluginWordPress__WEBPACK_IMPORTED_MODULE_5__["default"], {
        scheme: A,
        image: u,
        data: a,
        align: t
      }), 'flex' === B && 'theme' === q && /*#__PURE__*/React.createElement(_templates_ThemeFlex__WEBPACK_IMPORTED_MODULE_6__["default"], {
        scheme: A,
        image: u,
        data: a,
        align: t
      }), 'wordpress' === B && 'theme' === q && /*#__PURE__*/React.createElement(_templates_ThemeWordPress__WEBPACK_IMPORTED_MODULE_7__["default"], {
        scheme: A,
        image: u,
        data: a,
        align: t
      }), 'large' === B && 'theme' === q && /*#__PURE__*/React.createElement(_templates_ThemeLarge__WEBPACK_IMPORTED_MODULE_8__["default"], {
        scheme: A,
        image: u,
        data: a,
        align: t
      }), 'card' === B && 'theme' === q && /*#__PURE__*/React.createElement(_templates_ThemeCard__WEBPACK_IMPORTED_MODULE_9__["default"], {
        scheme: A,
        image: u,
        data: a,
        align: t
      }));
    });
  };
  var P = new HtmlToReactParser();
  var Q = [{
    icon: 'edit',
    title: __('Reset', 'wp-plugin-info-card'),
    onClick: function onClick() {
      return g(true);
    }
  }];
  var R = [{
    value: 'none',
    label: __('None', 'wp-plugin-info-card')
  }, {
    value: 'before',
    label: __('Before', 'wp-plugin-info-card')
  }, {
    value: 'after',
    label: __('After', 'wp-plugin-info-card')
  }];
  var S = [{
    value: 'false',
    label: __('No', 'wp-plugin-info-card')
  }, {
    value: 'true',
    label: __('Yes', 'wp-plugin-info-card')
  }];
  var T = [{
    value: 'default',
    label: __('Default', 'wp-plugin-info-card')
  }, {
    value: 'scheme1',
    label: __('Scheme 1', 'wp-plugin-info-card')
  }, {
    value: 'scheme2',
    label: __('Scheme 2', 'wp-plugin-info-card')
  }, {
    value: 'scheme3',
    label: __('Scheme 3', 'wp-plugin-info-card')
  }, {
    value: 'scheme4',
    label: __('Scheme 4', 'wp-plugin-info-card')
  }, {
    value: 'scheme5',
    label: __('Scheme 5', 'wp-plugin-info-card')
  }, {
    value: 'scheme6',
    label: __('Scheme 6', 'wp-plugin-info-card')
  }, {
    value: 'scheme7',
    label: __('Scheme 7', 'wp-plugin-info-card')
  }, {
    value: 'scheme8',
    label: __('Scheme 8', 'wp-plugin-info-card')
  }, {
    value: 'scheme9',
    label: __('Scheme 9', 'wp-plugin-info-card')
  }, {
    value: 'scheme10',
    label: __('Scheme 10', 'wp-plugin-info-card')
  }, {
    value: 'scheme11',
    label: __('Scheme 11', 'wp-plugin-info-card')
  }, {
    value: 'scheme12',
    label: __('Scheme 12', 'wp-plugin-info-card')
  }, {
    value: 'scheme13',
    label: __('Scheme 13', 'wp-plugin-info-card')
  }, {
    value: 'scheme14',
    label: __('Scheme 14', 'wp-plugin-info-card')
  }];
  var U = [{
    value: 'card',
    label: __('Card', 'wp-plugin-info-card')
  }, {
    value: 'large',
    label: __('Large', 'wp-plugin-info-card')
  }, {
    value: 'wordpress',
    label: __('WordPress', 'wp-plugin-info-card')
  }, {
    value: 'flex',
    label: __('Flex', 'wp-plugin-info-card')
  }];
  var V = [{
    value: '',
    label: __('None', 'wp-plugin-info-card')
  }, {
    value: 'url',
    label: __('URL', 'wp-plugin-info-card')
  }, {
    value: 'name',
    label: __('Name', 'wp-plugin-info-card')
  }, {
    value: 'version',
    label: __('Version', 'wp-plugin-info-card')
  }, {
    value: 'author',
    label: __('Author', 'wp-plugin-info-card')
  }, {
    value: 'screenshot_url',
    label: __('Screenshot URL', 'wp-plugin-info-card')
  }, {
    value: 'rating',
    label: __('Ratings', 'wp-plugin-info-card')
  }, {
    value: 'num_ratings',
    label: __('Number of Ratings', 'wp-plugin-info-card')
  }, {
    value: 'active_installs',
    label: __('Active Installs', 'wp-plugin-info-card')
  }, {
    value: 'last_updated',
    label: __('Last Updated', 'wp-plugin-info-card')
  }, {
    value: 'homepage',
    label: __('Homepage', 'wp-plugin-info-card')
  }, {
    value: 'download_link',
    label: __('Download Link', 'wp-plugin-info-card')
  }];
  var W = [{
    value: 'none',
    label: __('Default', 'wp-plugin-info-card')
  }, {
    value: 'full',
    label: __('Full Width', 'wp-plugin-info-card')
  }];
  var X = /*#__PURE__*/React.createElement(InspectorControls, null, /*#__PURE__*/React.createElement(PanelBody, {
    title: __('WP Plugin Info Card', 'wp-plugin-info-card')
  }, /*#__PURE__*/React.createElement(SelectControl, {
    label: __('Scheme', 'wp-plugin-info-card'),
    options: T,
    value: A,
    onChange: function onChange(a) {
      c({
        scheme: a
      });
    }
  }), /*#__PURE__*/React.createElement(SelectControl, {
    label: __('Layout', 'wp-plugin-info-card'),
    options: U,
    value: B,
    onChange: function onChange(a) {
      c({
        layout: a
      });
    }
  }), /*#__PURE__*/React.createElement(SelectControl, {
    label: __('Width', 'wp-plugin-info-card'),
    options: W,
    value: C,
    onChange: function onChange(a) {
      c({
        width: a
      });
    }
  }), /*#__PURE__*/React.createElement(MediaUpload, {
    onSelect: function onSelect(a) {
      c({
        image: a.url
      });
      b.image = a.url;
      N();
    },
    type: "image",
    value: u,
    render: function render(a) {
      var d = a.open;
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
        className: "components-button is-button",
        onClick: d
      }, __('Upload Image!', 'wp-plugin-info-card')), u && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
        src: u,
        alt: __('Plugin Card Image', 'wp-plugin-info-card'),
        width: "250",
        height: "250"
      })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
        className: "components-button is-button",
        onClick: function onClick(a) {
          c({
            image: ''
          });
          b.image = '';
          N();
        }
      }, __('Reset Image', 'wp-plugin-info-card')))));
    }
  }), /*#__PURE__*/React.createElement(TextControl, {
    label: __('Container ID', 'wp-plugin-info-card'),
    type: "text",
    value: v,
    onChange: function onChange(a) {
      c({
        containerid: a
      });
      b.containerId = a;
      setTimeout(function () {
        N();
      }, 5000);
    }
  }), /*#__PURE__*/React.createElement(TextControl, {
    label: __('Margin', 'wp-plugin-info-card'),
    type: "text",
    value: w,
    onChange: function onChange(a) {
      c({
        margin: a
      });
      b.margin = a;
      setTimeout(function () {
        N();
      }, 5000);
    }
  }), /*#__PURE__*/React.createElement(SelectControl, {
    label: __('Clear', 'wp-plugin-info-card'),
    options: R,
    value: x,
    onChange: function onChange(a) {
      c({
        clear: a
      });
    }
  }), /*#__PURE__*/React.createElement(TextControl, {
    label: __('Expiration in minutes', 'wp-plugin-info-card'),
    type: "number",
    value: y,
    onChange: function onChange(a) {
      c({
        expiration: a
      });
    }
  }), /*#__PURE__*/React.createElement(SelectControl, {
    label: __('Load card via Ajax?', 'wp-plugin-info-card'),
    options: S,
    value: z,
    onChange: function onChange(a) {
      c({
        ajax: a
      });
    }
  })));
  var Y = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(React.Fragment, null, f && /*#__PURE__*/React.createElement("div", {
    className: "wppic-query-block wppic-query-block-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wppic-block-svg"
  }, /*#__PURE__*/React.createElement(_Logo__WEBPACK_IMPORTED_MODULE_10__["default"], {
    size: "75"
  })), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-tabs-panel"
  }, n && /*#__PURE__*/React.createElement("div", {
    className: "wppic-no-data"
  }, /*#__PURE__*/React.createElement(Notice, {
    status: "error",
    isDismissible: false
  }, __('No data found. Please check your query.', 'wp-plugin-info-card'))), /*#__PURE__*/React.createElement(SelectControl, {
    label: __('Select a Type', 'wp-plugin-info-card'),
    options: [{
      label: __('Plugin', 'wp-plugin-info-card'),
      value: 'plugin'
    }, {
      label: __('Theme', 'wp-plugin-info-card'),
      value: 'theme'
    }],
    value: q,
    onChange: function onChange(a) {
      c({
        type: a
      });
    }
  }), /*#__PURE__*/React.createElement(TextControl, {
    label: __('Search', 'wp-plugin-info-card'),
    value: D,
    onChange: function onChange(a) {
      c({
        search: a
      });
    }
  }), /*#__PURE__*/React.createElement(TextControl, {
    label: __('Tags', 'wp-plugin-info-card'),
    value: E,
    onChange: function onChange(a) {
      c({
        tag: a
      });
    },
    help: __('Comma separated', 'wp-plugin-info-card')
  }), /*#__PURE__*/React.createElement(TextControl, {
    label: __('Author', 'wp-plugin-info-card'),
    value: F,
    onChange: function onChange(a) {
      c({
        author: a
      });
    }
  }), /*#__PURE__*/React.createElement(TextControl, {
    label: __('User (Username)', 'wp-plugin-info-card'),
    value: G,
    onChange: function onChange(a) {
      c({
        user: a
      });
    },
    help: __('See the favorites from this username', 'wp-plugin-info-card')
  }), /*#__PURE__*/React.createElement(SelectControl, {
    label: __('Browse', 'wp-plugin-info-card'),
    options: [{
      label: __('None', 'wp-plugin-info-card'),
      value: ''
    }, {
      label: __('Featured', 'wp-plugin-info-card'),
      value: 'featured'
    }, {
      label: __('Updated', 'wp-plugin-info-card'),
      value: 'updated'
    }, {
      label: __('Favorites', 'wp-plugin-info-card'),
      value: 'favorites'
    }, {
      label: __('Popular', 'wp-plugin-info-card'),
      value: 'popular'
    }],
    value: H,
    onChange: function onChange(a) {
      c({
        browse: a
      });
    }
  }), /*#__PURE__*/React.createElement(TextControl, {
    type: "number",
    label: __('Per Page', 'wp-plugin-info-card'),
    value: I,
    onChange: function onChange(a) {
      c({
        per_page: a
      });
    },
    help: __('Set how many cards to return.', 'wp-plugin-info-card')
  }), /*#__PURE__*/React.createElement(SelectControl, {
    label: __('Columns', 'wp-plugin-info-card'),
    options: [{
      label: __('1', 'wp-plugin-info-card'),
      value: '1'
    }, {
      label: __('2', 'wp-plugin-info-card'),
      value: '2'
    }, {
      label: __('3', 'wp-plugin-info-card'),
      value: '3'
    }],
    value: K,
    onChange: function onChange(a) {
      c({
        cols: a
      });
    }
  }), /*#__PURE__*/React.createElement(SelectControl, {
    label: __('Sort results by:', 'wp-plugin-info-card'),
    options: [{
      label: __('None', 'wp-plugin-info-card'),
      value: 'none'
    }, {
      label: __('Active Installs (Plugins only)', 'wp-plugin-info-card'),
      value: 'active_installs'
    }, {
      label: __('Downloads', 'wp-plugin-info-card'),
      value: 'downloaded'
    }, {
      label: __('Last Updated', 'wp-plugin-info-card'),
      value: 'last_updated'
    }],
    value: L,
    onChange: function onChange(a) {
      c({
        sortby: a
      });
    }
  }), /*#__PURE__*/React.createElement(SelectControl, {
    label: __('Sort Order:', 'wp-plugin-info-card'),
    options: [{
      label: __('ASC', 'wp-plugin-info-card'),
      value: 'ASC'
    }, {
      label: __('DESC', 'wp-plugin-info-card'),
      value: 'DESC'
    }],
    value: M,
    onChange: function onChange(a) {
      c({
        sort: a
      });
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-gutenberg-button"
  }, /*#__PURE__*/React.createElement(Button, {
    iconSize: 20,
    icon: /*#__PURE__*/React.createElement(_Logo__WEBPACK_IMPORTED_MODULE_10__["default"], {
      size: "25"
    }),
    isSecondary: true,
    id: "wppic-input-submit",
    onClick: function onClick(a) {
      a.preventDefault();
      g(false);
      o(false);
      N(a);
    }
  }, __('Query and Configure', 'wp-plugin-info-card')))), j && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "wppic-loading-placeholder"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wppic-loading"
  }, /*#__PURE__*/React.createElement(_Logo__WEBPACK_IMPORTED_MODULE_10__["default"], {
    size: "45"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
    className: "wppic-spinner"
  }, /*#__PURE__*/React.createElement(Spinner, null))))), !f && !j && /*#__PURE__*/React.createElement(React.Fragment, null, X, /*#__PURE__*/React.createElement(BlockControls, null, /*#__PURE__*/React.createElement(ToolbarGroup, {
    controls: Q
  }), 'flex' === B && /*#__PURE__*/React.createElement(BlockAlignmentToolbar, {
    value: t,
    onChange: function onChange(a) {
      c({
        align: a
      });
      N(a);
    }
  }), 'card' === B && /*#__PURE__*/React.createElement(AlignmentToolbar, {
    value: t,
    onChange: function onChange(a) {
      c({
        align: a
      });
      N(a);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: '' !== C ? 'wp-pic-full-width' : ''
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-1-".concat(K)
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-grid cols-".concat(K)
  }, O()))))));
  var Z = useBlockProps({
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()("wp-plugin-info-card-query align".concat(t))
  });
  if (J) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("img", {
      src: wppic.query_preview,
      style: {
        width: '100%',
        height: 'auto'
      }
    }));
  }
  return /*#__PURE__*/React.createElement("div", Z, Y);
};
/* harmony default export */ __webpack_exports__["default"] = (WP_Plugin_Card_Query);

/***/ }),

/***/ "./src/blocks/PluginInfoCardQuery/wppic-query.js":
/*!*******************************************************!*\
  !*** ./src/blocks/PluginInfoCardQuery/wppic-query.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _edit_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./edit-query */ "./src/blocks/PluginInfoCardQuery/edit-query.js");
/* harmony import */ var _components_GearIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/GearIcon */ "./src/blocks/components/GearIcon.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./block.json */ "./src/blocks/PluginInfoCardQuery/block.json");
//  Import CSS.



var registerBlockType = wp.blocks.registerBlockType;
registerBlockType(_block_json__WEBPACK_IMPORTED_MODULE_2__, {
  icon: /*#__PURE__*/React.createElement(_components_GearIcon__WEBPACK_IMPORTED_MODULE_1__["default"], {
    fill: "#333"
  }),
  edit: _edit_query__WEBPACK_IMPORTED_MODULE_0__["default"],
  save: function save() {
    return null;
  }
});

/***/ }),

/***/ "./src/blocks/PluginScreenshotsInfoCard/block.js":
/*!*******************************************************!*\
  !*** ./src/blocks/PluginScreenshotsInfoCard/block.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./block.json */ "./src/blocks/PluginScreenshotsInfoCard/block.json");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit */ "./src/blocks/PluginScreenshotsInfoCard/edit.js");


//  Import main block file.

var registerBlockType = wp.blocks.registerBlockType; // Import registerBlockType() from wp.blocks

registerBlockType(_block_json__WEBPACK_IMPORTED_MODULE_0__, {
  icon: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 7509 6702",
    width: "24",
    height: "24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M677.904 0h6152.96c186.275 0 356.237 75.859 479.153 198.763 121.94 122.903 198.75 291.901 198.75 479.14v5346.39c0 186.289-76.81 355.273-198.75 478.177-122.916 122.917-292.878 198.776-479.153 198.776H677.904c-187.227 0-356.237-75.859-479.141-198.776C75.872 6379.566 0 6210.582 0 6024.293V677.903c0-187.239 75.872-356.237 198.763-479.14C321.667 75.859 490.677 0 677.904 0Z",
    fill: "#231f20"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m542.526 5434.75 2021.21-2499.41c49.935-60.507 122.904-96.991 200.69-99.856 78.737-2.891 153.62 27.839 207.396 85.456l1364.44 1447.98 611.654-519.479 15.365-13.437c48.971-38.399 110.416-58.594 173.788-54.753 62.409 2.93 121.94 28.815 166.12 72.044l14.401 14.401 1648.67 1720.68v435.925c0 36.497-15.364 70.104-39.362 95.078-24.987 24.935-58.594 40.312-96.041 40.312H677.897c-37.448 0-71.055-15.377-96.016-40.312-24.01-24.974-39.362-58.581-39.362-95.078v-589.544Z",
    fill: "#FFF"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4788.52 1254.02c156.497-156.511 373.515-253.49 611.641-253.49 239.101 0 455.156 96.979 612.603 253.49 156.524 156.523 252.552 373.515 252.552 611.64 0 239.102-96.028 455.143-252.552 611.654-157.447 156.51-373.502 253.476-612.603 253.476-238.126 0-455.144-96.966-611.641-253.476-156.498-156.511-252.526-372.552-252.526-611.654 0-238.125 96.028-455.117 252.526-611.64Z"
  })),
  edit: _edit__WEBPACK_IMPORTED_MODULE_1__["default"],
  // Render via PHP
  save: function save() {
    return null;
  }
});

/***/ }),

/***/ "./src/blocks/PluginScreenshotsInfoCard/edit.js":
/*!******************************************************!*\
  !*** ./src/blocks/PluginScreenshotsInfoCard/edit.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _templates_PluginScreenshots__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../templates/PluginScreenshots */ "./src/blocks/templates/PluginScreenshots.js");
/* harmony import */ var _Logo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Logo */ "./src/blocks/Logo.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _screens_ScreenSlugEntry__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./screens/ScreenSlugEntry */ "./src/blocks/PluginScreenshotsInfoCard/screens/ScreenSlugEntry/index.js");
/* harmony import */ var _screens_ScreenImageProcessor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./screens/ScreenImageProcessor */ "./src/blocks/PluginScreenshotsInfoCard/screens/ScreenImageProcessor/index.js");
/* harmony import */ var _screens_ScreenImageLoader__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./screens/ScreenImageLoader */ "./src/blocks/PluginScreenshotsInfoCard/screens/ScreenImageLoader/index.js");
/* harmony import */ var _screens_ScreenNoImages__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./screens/ScreenNoImages */ "./src/blocks/PluginScreenshotsInfoCard/screens/ScreenNoImages/index.js");
/* harmony import */ var _screens_ScreenPluginPreview__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./screens/ScreenPluginPreview */ "./src/blocks/PluginScreenshotsInfoCard/screens/ScreenPluginPreview/index.js");
function _slicedToArray(a, b) { return _arrayWithHoles(a) || _iterableToArrayLimit(a, b) || _unsupportedIterableToArray(a, b) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(a, b) { if (!a) return; if (typeof a === "string") return _arrayLikeToArray(a, b); var c = Object.prototype.toString.call(a).slice(8, -1); if (c === "Object" && a.constructor) c = a.constructor.name; if (c === "Map" || c === "Set") return Array.from(a); if (c === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)) return _arrayLikeToArray(a, b); }
function _arrayLikeToArray(a, b) { if (b == null || b > a.length) b = a.length; for (var c = 0, d = new Array(b); c < b; c++) d[c] = a[c]; return d; }
function _iterableToArrayLimit(b, c) { var d = null == b ? null : "undefined" != typeof Symbol && b[Symbol.iterator] || b["@@iterator"]; if (null != d) { var g, h, j, k, l = [], a = !0, m = !1; try { if (j = (d = d.call(b)).next, 0 === c) { if (Object(d) !== d) return; a = !1; } else for (; !(a = (g = j.call(d)).done) && (l.push(g.value), l.length !== c); a = !0); } catch (a) { m = !0, h = a; } finally { try { if (!a && null != d["return"] && (k = d["return"](), Object(k) !== k)) return; } finally { if (m) throw h; } } return l; } }
function _arrayWithHoles(a) { if (Array.isArray(a)) return a; }
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
/**
 * External dependencies
 */






var __ = wp.i18n.__;
var _wp$components = wp.components,
  PanelBody = _wp$components.PanelBody,
  PanelRow = _wp$components.PanelRow,
  SelectControl = _wp$components.SelectControl,
  Spinner = _wp$components.Spinner,
  TextControl = _wp$components.TextControl,
  Toolbar = _wp$components.Toolbar,
  ToolbarGroup = _wp$components.ToolbarGroup,
  ToolbarButton = _wp$components.ToolbarButton,
  ToolbarItem = _wp$components.ToolbarItem,
  ToolbarDropdownMenu = _wp$components.ToolbarDropdownMenu,
  DropdownMenu = _wp$components.DropdownMenu,
  CheckboxControl = _wp$components.CheckboxControl,
  TabPanel = _wp$components.TabPanel,
  Button = _wp$components.Button,
  MenuGroup = _wp$components.MenuGroup,
  MenuItemsChoice = _wp$components.MenuItemsChoice,
  MenuItem = _wp$components.MenuItem;
var _wp$blockEditor = wp.blockEditor,
  InspectorControls = _wp$blockEditor.InspectorControls,
  BlockAlignmentToolbar = _wp$blockEditor.BlockAlignmentToolbar,
  MediaUpload = _wp$blockEditor.MediaUpload,
  BlockControls = _wp$blockEditor.BlockControls,
  useBlockProps = _wp$blockEditor.useBlockProps;






// For storing unique IDs.
var uniqueIds = [];
var PluginScreenshotsInfoCard = function PluginScreenshotsInfoCard(a) {
  var b = a.attributes,
    c = a.setAttributes,
    d = a.clientId;
  var e = b.uniqueId;
  var f = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(b.type),
    g = _slicedToArray(f, 2),
    h = g[0],
    i = g[1];
  var j = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(b.slug),
    k = _slicedToArray(j, 2),
    l = k[0],
    m = k[1];
  var n = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(true),
    o = _slicedToArray(n, 2),
    p = o[0],
    q = o[1];
  var r = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(false),
    s = _slicedToArray(r, 2),
    t = s[0],
    u = s[1];
  var v = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(b.image),
    w = _slicedToArray(v, 2),
    x = w[0],
    y = w[1];
  var z = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(b.containerid),
    A = _slicedToArray(z, 2),
    B = A[0],
    C = A[1];
  var D = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(b.scheme),
    E = _slicedToArray(D, 2),
    F = E[0],
    G = E[1];
  var H = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(b.layout),
    I = _slicedToArray(H, 2),
    J = I[0],
    K = I[1];
  var L = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(true),
    M = _slicedToArray(L, 2),
    N = M[0],
    O = M[1];
  var P = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(b.preview),
    Q = _slicedToArray(P, 2),
    R = Q[0],
    S = Q[1];
  var T = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(b.assetData),
    U = _slicedToArray(T, 2),
    V = U[0],
    W = U[1];
  var X = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(b.align),
    Y = _slicedToArray(X, 2),
    Z = Y[0],
    $ = Y[1];
  var _ = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(false),
    aa = _slicedToArray(_, 2),
    ba = aa[0],
    ca = aa[1];
  var da = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(b.screen),
    ea = _slicedToArray(da, 2),
    fa = ea[0],
    ga = ea[1];
  if (R) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: wppic.screenshots_card_preview,
      alt: "",
      style: {
        width: '100%',
        height: 'auto'
      }
    }));
  }
  var ha = function loadData() {
    q(false);
    u(true);
    var a = wppic.rest_url + 'wppic/v2/get_data';
    axios__WEBPACK_IMPORTED_MODULE_0___default().get(a + "?type=".concat(h, "&slug=").concat(encodeURIComponent(l))).then(function (a) {
      // Now Set State
      c({
        assetData: a.data.data
      });
      W(a.data.data);
      ca(a.data.data.hasOwnProperty('screenshots'));
      u(false);
    });
  };

  /**
   * Get a unique ID for the block for inline styling if necessary.
   */
  (0,react__WEBPACK_IMPORTED_MODULE_5__.useEffect)(function () {
    if (null === e || '' === e || uniqueIds.includes(e)) {
      var a = 'wppic-' + d.substr(2, 9).replace('-', '');
      c({
        uniqueId: a
      });
      uniqueIds.push(a);
    } else {
      uniqueIds.push(e);
    }
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_5__.useEffect)(function () {
    if (V.length <= 0) {
      return;
    }
    u(false);
  }, [V]);
  var ia = [{
    icon: 'edit',
    title: __('Edit and Configure', 'wp-plugin-info-card'),
    onClick: function onClick() {
      return q(true);
    }
  }];
  var ja = [{
    value: 'plugin',
    label: __('Plugin', 'wp-plugin-info-card')
  }, {
    value: 'theme',
    label: __('Theme', 'wp-plugin-info-card')
  }];
  var ka = [{
    value: 'none',
    label: __('None', 'wp-plugin-info-card')
  }, {
    value: 'before',
    label: __('Before', 'wp-plugin-info-card')
  }, {
    value: 'after',
    label: __('After', 'wp-plugin-info-card')
  }];
  var la = [{
    value: 'false',
    label: __('No', 'wp-plugin-info-card')
  }, {
    value: 'true',
    label: __('Yes', 'wp-plugin-info-card')
  }];
  var ma = [{
    value: 'default',
    label: __('Default', 'wp-plugin-info-card')
  }, {
    value: 'scheme1',
    label: __('Scheme 1', 'wp-plugin-info-card')
  }, {
    value: 'scheme2',
    label: __('Scheme 2', 'wp-plugin-info-card')
  }, {
    value: 'scheme3',
    label: __('Scheme 3', 'wp-plugin-info-card')
  }, {
    value: 'scheme4',
    label: __('Scheme 4', 'wp-plugin-info-card')
  }, {
    value: 'scheme5',
    label: __('Scheme 5', 'wp-plugin-info-card')
  }, {
    value: 'scheme6',
    label: __('Scheme 6', 'wp-plugin-info-card')
  }, {
    value: 'scheme7',
    label: __('Scheme 7', 'wp-plugin-info-card')
  }, {
    value: 'scheme8',
    label: __('Scheme 8', 'wp-plugin-info-card')
  }, {
    value: 'scheme9',
    label: __('Scheme 9', 'wp-plugin-info-card')
  }, {
    value: 'scheme10',
    label: __('Scheme 10', 'wp-plugin-info-card')
  }, {
    value: 'scheme11',
    label: __('Scheme 11', 'wp-plugin-info-card')
  }, {
    value: 'scheme12',
    label: __('Scheme 12', 'wp-plugin-info-card')
  }, {
    value: 'scheme13',
    label: __('Scheme 13', 'wp-plugin-info-card')
  }, {
    value: 'scheme14',
    label: __('Scheme 14', 'wp-plugin-info-card')
  }];
  var na = [{
    value: 'card',
    label: __('Card', 'wp-plugin-info-card')
  }, {
    value: 'large',
    label: __('Large', 'wp-plugin-info-card')
  }, {
    value: 'wordpress',
    label: __('WordPress', 'wp-plugin-info-card')
  }, {
    value: 'flex',
    label: __('Flex', 'wp-plugin-info-card')
  }];
  var oa = 'card' === J ? 'wp-pic-card' : J;
  var pa = t ? 'wp-pic-spin' : '';
  var qa = /*#__PURE__*/React.createElement(InspectorControls, null, /*#__PURE__*/React.createElement(PanelBody, {
    title: __('Layout', 'wp-plugin-info-card')
  }, /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(SelectControl, {
    label: __('Scheme', 'wp-plugin-info-card'),
    options: ma,
    value: F,
    onChange: function onChange(a) {
      c({
        scheme: a
      });
      G(a);
    }
  })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(SelectControl, {
    label: __('Layout', 'wp-plugin-info-card'),
    options: na,
    value: J,
    onChange: function onChange(a) {
      if ('flex' === a) {
        c({
          layout: a,
          align: 'full'
        });
        K(a);
        $('full');
      } else {
        c({
          layout: a,
          align: 'center'
        });
        K(a);
        $('center');
      }
    }
  }))), /*#__PURE__*/React.createElement(PanelBody, {
    title: __('Options', 'wp-plugin-info-card'),
    initialOpen: false
  }, /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(MediaUpload, {
    onSelect: function onSelect(a) {
      c({
        image: a.url
      });
      y(a.url);
    },
    type: "image",
    value: x,
    render: function render(a) {
      var b = a.open;
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
        className: "components-button is-button",
        onClick: b
      }, __('Upload Image!', 'wp-plugin-info-card')), x && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
        src: x,
        alt: __('Plugin Card Image', 'wp-plugin-info-card'),
        width: "250",
        height: "250"
      })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
        className: "components-button is-button",
        onClick: function onClick(a) {
          c({
            image: ''
          });
          y('');
        }
      }, __('Reset Image', 'wp-plugin-info-card')))));
    }
  })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(TextControl, {
    label: __('Container ID', 'wp-plugin-info-card'),
    type: "text",
    value: B,
    onChange: function onChange(a) {
      c({
        containerid: a
      });
      C(a);
    }
  }))));
  var ra = useBlockProps({
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()("wp-plugin-info-card align".concat(Z)),
    id: e
  });

  /**
   * Get the screen to display.
   *
   * @return {Element} The screen to display.
   */
  var sa = function getCurrentScreen() {
    //return <ScreenNoImages attributes={ attributes } setAttributes={ setAttributes } />;

    // Otherwise get the screen based on the current screen.
    switch (b.screen) {
      case 'slug-entry':
        return /*#__PURE__*/React.createElement(_screens_ScreenSlugEntry__WEBPACK_IMPORTED_MODULE_6__["default"], {
          attributes: b,
          setAttributes: c
        });
      case 'image-loader':
        return /*#__PURE__*/React.createElement(_screens_ScreenImageLoader__WEBPACK_IMPORTED_MODULE_8__["default"], {
          attributes: b,
          setAttributes: c
        });
      case 'image-processor':
        return /*#__PURE__*/React.createElement(_screens_ScreenImageProcessor__WEBPACK_IMPORTED_MODULE_7__["default"], {
          attributes: b,
          setAttributes: c
        });
      case 'no-images':
        return /*#__PURE__*/React.createElement(_screens_ScreenNoImages__WEBPACK_IMPORTED_MODULE_9__["default"], {
          attributes: b,
          setAttributes: c
        });
      case 'plugin-preview':
        return /*#__PURE__*/React.createElement(_screens_ScreenPluginPreview__WEBPACK_IMPORTED_MODULE_10__["default"], {
          attributes: b,
          setAttributes: c,
          clientId: d
        });
    }
    return null;
  };
  if (R) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("img", {
      src: wppic.wppic_preview,
      alt: "",
      style: {
        width: '100%',
        height: 'auto'
      }
    }));
  }
  if (t) {
    return /*#__PURE__*/React.createElement("div", ra, /*#__PURE__*/React.createElement("div", {
      className: "wppic-loading-placeholder"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wppic-loading"
    }, /*#__PURE__*/React.createElement(_Logo__WEBPACK_IMPORTED_MODULE_4__["default"], {
      size: "45"
    }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
      className: "wppic-spinner"
    }, /*#__PURE__*/React.createElement(Spinner, null)))));
  }
  return /*#__PURE__*/React.createElement("div", ra, /*#__PURE__*/React.createElement("div", {
    id: e
  }, sa()));
};
/* harmony default export */ __webpack_exports__["default"] = (PluginScreenshotsInfoCard);

/***/ }),

/***/ "./src/blocks/PluginScreenshotsInfoCard/screens/ScreenImageLoader/index.js":
/*!*********************************************************************************!*\
  !*** ./src/blocks/PluginScreenshotsInfoCard/screens/ScreenImageLoader/index.js ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Logo__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../Logo */ "./src/blocks/Logo.js");
/* harmony import */ var _components_Loading__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../components/Loading */ "./src/blocks/components/Loading.js");
/* harmony import */ var _components_LoadingImageProgress__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../components/LoadingImageProgress */ "./src/blocks/components/LoadingImageProgress.js");
function _slicedToArray(a, b) { return _arrayWithHoles(a) || _iterableToArrayLimit(a, b) || _unsupportedIterableToArray(a, b) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(a, b) { if (!a) return; if (typeof a === "string") return _arrayLikeToArray(a, b); var c = Object.prototype.toString.call(a).slice(8, -1); if (c === "Object" && a.constructor) c = a.constructor.name; if (c === "Map" || c === "Set") return Array.from(a); if (c === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)) return _arrayLikeToArray(a, b); }
function _arrayLikeToArray(a, b) { if (b == null || b > a.length) b = a.length; for (var c = 0, d = new Array(b); c < b; c++) d[c] = a[c]; return d; }
function _iterableToArrayLimit(b, c) { var d = null == b ? null : "undefined" != typeof Symbol && b[Symbol.iterator] || b["@@iterator"]; if (null != d) { var g, h, j, k, l = [], a = !0, m = !1; try { if (j = (d = d.call(b)).next, 0 === c) { if (Object(d) !== d) return; a = !1; } else for (; !(a = (g = j.call(d)).done) && (l.push(g.value), l.length !== c); a = !0); } catch (a) { m = !0, h = a; } finally { try { if (!a && null != d["return"] && (k = d["return"](), Object(k) !== k)) return; } finally { if (m) throw h; } } return l; } }
function _arrayWithHoles(a) { if (Array.isArray(a)) return a; }
/**
 * This is the initial screen of the block. It is the first screen that the user sees when they add the block to the editor.
 */











/**
 * ScreenImageLoader component.
 *
 * @param {Object} props - Component props.
 * @return {Function} Component.
 */
var ScreenImageLoader = function ScreenImageLoader(a) {
  var b = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    c = _slicedToArray(b, 2),
    d = c[0],
    e = c[1];
  var f = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    g = _slicedToArray(f, 2),
    h = g[0],
    i = g[1];
  var j = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    k = _slicedToArray(j, 2),
    l = k[0],
    m = k[1];
  var n = a.attributes,
    o = a.setAttributes;
  var p = n.slug,
    q = n.assetData;
  var r = function loadImages(a) {
    e(true);
    var b = wppic.rest_url + 'wppic/v2/get_plugin_images';
    axios__WEBPACK_IMPORTED_MODULE_3___default().get(b + "?type=plugin&slug=".concat(encodeURIComponent(a)), {
      headers: {
        'X-WP-Nonce': wppic.rest_nonce
      }
    }).then(function (a) {
      var b = a.data.data;
      if (a.data.success) {
        if (!b.hasScreenshots) {
          o({
            assetData: b.pluginData
          });
          o({
            screen: 'no-images'
          });
          return;
        }
        if (b.hasPluginScreenshots) {
          o({
            assetData: b.pluginData
          });
          o({
            screen: 'plugin-preview'
          });
          return;
        }
        o({
          screen: 'image-processor'
        });
      } else {
        m(a.data.data.message);
        i(true);
      }
    })["catch"](function (a) {}).then(function () {});
  };

  // Load images.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    r(p);
  }, []);
  if (d) {
    return /*#__PURE__*/React.createElement(_components_Loading__WEBPACK_IMPORTED_MODULE_7__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Gathering plugin images...', 'wp-plugin-info-card')
    });
  }
  return null;
};
/* harmony default export */ __webpack_exports__["default"] = (ScreenImageLoader);

/***/ }),

/***/ "./src/blocks/PluginScreenshotsInfoCard/screens/ScreenImageProcessor/index.js":
/*!************************************************************************************!*\
  !*** ./src/blocks/PluginScreenshotsInfoCard/screens/ScreenImageProcessor/index.js ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Logo__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../Logo */ "./src/blocks/Logo.js");
/* harmony import */ var _components_Loading__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../components/Loading */ "./src/blocks/components/Loading.js");
/* harmony import */ var _components_LoadingImageProgress__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../components/LoadingImageProgress */ "./src/blocks/components/LoadingImageProgress.js");
function _slicedToArray(a, b) { return _arrayWithHoles(a) || _iterableToArrayLimit(a, b) || _unsupportedIterableToArray(a, b) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(a, b) { if (!a) return; if (typeof a === "string") return _arrayLikeToArray(a, b); var c = Object.prototype.toString.call(a).slice(8, -1); if (c === "Object" && a.constructor) c = a.constructor.name; if (c === "Map" || c === "Set") return Array.from(a); if (c === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)) return _arrayLikeToArray(a, b); }
function _arrayLikeToArray(a, b) { if (b == null || b > a.length) b = a.length; for (var c = 0, d = new Array(b); c < b; c++) d[c] = a[c]; return d; }
function _iterableToArrayLimit(b, c) { var d = null == b ? null : "undefined" != typeof Symbol && b[Symbol.iterator] || b["@@iterator"]; if (null != d) { var g, h, j, k, l = [], a = !0, m = !1; try { if (j = (d = d.call(b)).next, 0 === c) { if (Object(d) !== d) return; a = !1; } else for (; !(a = (g = j.call(d)).done) && (l.push(g.value), l.length !== c); a = !0); } catch (a) { m = !0, h = a; } finally { try { if (!a && null != d["return"] && (k = d["return"](), Object(k) !== k)) return; } finally { if (m) throw h; } } return l; } }
function _arrayWithHoles(a) { if (Array.isArray(a)) return a; }
/**
 * This is the initial screen of the block. It is the first screen that the user sees when they add the block to the editor.
 */











/**
 * ScreenImageProcessor component.
 *
 * @param {Object} props - Component props.
 * @return {Function} Component.
 */
var ScreenImageProcessor = function ScreenImageProcessor(a) {
  var b = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    c = _slicedToArray(b, 2),
    d = c[0],
    e = c[1];
  var f = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    g = _slicedToArray(f, 2),
    h = g[0],
    i = g[1];
  var j = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    k = _slicedToArray(j, 2),
    l = k[0],
    m = k[1];
  var n = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    o = _slicedToArray(n, 2),
    p = o[0],
    q = o[1];
  var r = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    s = _slicedToArray(r, 2),
    t = s[0],
    u = s[1];
  var v = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    w = _slicedToArray(v, 2),
    x = w[0],
    y = w[1];
  var z = a.attributes,
    A = a.setAttributes;
  var B = z.slug,
    C = z.assetData;
  var D = function loadImages(a) {
    var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
    var c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    e(true);
    var d = wppic.rest_url + 'wppic/v2/get_plugin_images_to_process';
    axios__WEBPACK_IMPORTED_MODULE_3___default().get(d + "?type=plugin&slug=".concat(encodeURIComponent(a), "&order=").concat(b, "&needsSideload=").concat(c), {
      headers: {
        'X-WP-Nonce': wppic.rest_nonce
      }
    }).then(function (b) {
      var c = b.data.data;
      if (b.data.success) {
        var d = c.sideloadOrder;
        var e = c.needsSideload;
        var f = c.totalScreenshots;
        q(f);
        if (f >= d) {
          m(d);
          i(true);
          D(a, d, e);
        } else {
          A({
            assetData: c.pluginData,
            screen: 'plugin-preview'
          });
        }
      } else {
        y(b.data.data.message);
        u(true);
      }
    })["catch"](function (a) {}).then(function () {});
  };

  // Load images.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    D(B);
  }, []);
  if (h || d) {
    return /*#__PURE__*/React.createElement(_components_LoadingImageProgress__WEBPACK_IMPORTED_MODULE_8__["default"], {
      totalImageCount: p,
      currentCount: l,
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Processing images...', 'wp-plugin-info-card')
    });
  }
  if (d) {
    return /*#__PURE__*/React.createElement(_components_Loading__WEBPACK_IMPORTED_MODULE_7__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Determining if there are images to process...', 'wp-plugin-info-card')
    });
  }
  return null;
};
/* harmony default export */ __webpack_exports__["default"] = (ScreenImageProcessor);

/***/ }),

/***/ "./src/blocks/PluginScreenshotsInfoCard/screens/ScreenNoImages/index.js":
/*!******************************************************************************!*\
  !*** ./src/blocks/PluginScreenshotsInfoCard/screens/ScreenNoImages/index.js ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/undo.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/forward.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Logo__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../Logo */ "./src/blocks/Logo.js");
/* harmony import */ var _components_Loading__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../components/Loading */ "./src/blocks/components/Loading.js");
function _slicedToArray(a, b) { return _arrayWithHoles(a) || _iterableToArrayLimit(a, b) || _unsupportedIterableToArray(a, b) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(a, b) { if (!a) return; if (typeof a === "string") return _arrayLikeToArray(a, b); var c = Object.prototype.toString.call(a).slice(8, -1); if (c === "Object" && a.constructor) c = a.constructor.name; if (c === "Map" || c === "Set") return Array.from(a); if (c === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)) return _arrayLikeToArray(a, b); }
function _arrayLikeToArray(a, b) { if (b == null || b > a.length) b = a.length; for (var c = 0, d = new Array(b); c < b; c++) d[c] = a[c]; return d; }
function _iterableToArrayLimit(b, c) { var d = null == b ? null : "undefined" != typeof Symbol && b[Symbol.iterator] || b["@@iterator"]; if (null != d) { var g, h, j, k, l = [], a = !0, m = !1; try { if (j = (d = d.call(b)).next, 0 === c) { if (Object(d) !== d) return; a = !1; } else for (; !(a = (g = j.call(d)).done) && (l.push(g.value), l.length !== c); a = !0); } catch (a) { m = !0, h = a; } finally { try { if (!a && null != d["return"] && (k = d["return"](), Object(k) !== k)) return; } finally { if (m) throw h; } } return l; } }
function _arrayWithHoles(a) { if (Array.isArray(a)) return a; }
/**
 * This is the initial screen of the block. It is the first screen that the user sees when they add the block to the editor.
 */











/**
 * InitialScreen component.
 *
 * @param {Object} props - Component props.
 * @return {Function} Component.
 */
var ScreenNoImages = function ScreenNoImages(a) {
  var b = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    c = _slicedToArray(b, 2),
    d = c[0],
    e = c[1];
  var f = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    g = _slicedToArray(f, 2),
    h = g[0],
    i = g[1];
  var j = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    k = _slicedToArray(j, 2),
    l = k[0],
    m = k[1];
  var n = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    o = _slicedToArray(n, 2),
    p = o[0],
    q = o[1];
  var r = a.attributes,
    s = a.setAttributes;
  var t = r.slug,
    u = r.assetData;

  // Set the local inspector controls.
  var v = /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, null);
  var w = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "wppic-query-block wppic-query-block-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wppic-block-svg"
  }, /*#__PURE__*/React.createElement(_Logo__WEBPACK_IMPORTED_MODULE_6__["default"], {
    size: "75"
  })), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-tab-panel"
  }, /*#__PURE__*/React.createElement("p", {
    className: "wp-pic-admin-description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('No plugin screenshots have been found. Proceed to preview without images, or go back to the plugin slug.', 'wp-plugin-info-card')), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-button-row"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "secondary",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Back to Plugin Slug', 'wp-plugin-info-card'),
    onClick: function onClick() {
      s({
        screen: 'slug-entry'
      });
    },
    className: "wp-pic-admin-button wp-pic-admin-button-secondary",
    icon: /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_8__["default"], null)
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Back to Slug', 'wp-plugin-info-card')), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "primary",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Proceed to Preview', 'wp-plugin-info-card'),
    onClick: function onClick() {
      s({
        screen: 'plugin-preview'
      });
    },
    className: "wp-pic-admin-button wp-pic-admin-button-primary",
    icon: /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_9__["default"], null),
    iconPosition: "right"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Proceed to Preview', 'wp-plugin-info-card'))))));
  return /*#__PURE__*/React.createElement(React.Fragment, null, v, w);
};
/* harmony default export */ __webpack_exports__["default"] = (ScreenNoImages);

/***/ }),

/***/ "./src/blocks/PluginScreenshotsInfoCard/screens/ScreenPluginPreview/index.js":
/*!***********************************************************************************!*\
  !*** ./src/blocks/PluginScreenshotsInfoCard/screens/ScreenPluginPreview/index.js ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Logo__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../Logo */ "./src/blocks/Logo.js");
/* harmony import */ var _components_Loading__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../components/Loading */ "./src/blocks/components/Loading.js");
/* harmony import */ var _templates_PluginScreenshots__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../templates/PluginScreenshots */ "./src/blocks/templates/PluginScreenshots.js");
/* harmony import */ var _components_CustomPresets__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../components/CustomPresets */ "./src/blocks/components/CustomPresets/index.js");
/* harmony import */ var _components_PresetButton_PresetButton__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../components/PresetButton/PresetButton */ "./src/blocks/components/PresetButton/PresetButton.js");
/**
 * This is the initial screen of the block. It is the first screen that the user sees when they add the block to the editor.
 */













/**
 * InitialScreen component.
 *
 * @param {Object} props - Component props.
 * @return {Function} Component.
 */
var ScreenPluginPreview = function ScreenPluginPreview(a) {
  var b = a.attributes,
    c = a.setAttributes,
    d = a.clientId;
  var e = b.assetData,
    f = b.enableScreenshots,
    g = b.maxHeight,
    h = b.imageSize,
    i = b.enableRoundedIcon,
    j = b.iconStyle,
    k = b.enableContextMenu,
    l = b.pluginTitle,
    m = b.colorTheme,
    n = b.uniqueId;

  // Set the local inspector controls.
  var o = /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Block Customization', 'wp-plugin-info-card'),
    initialOpen: true
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Rounded Icon', 'wp-plugin-info-card'),
    checked: i,
    onChange: function onChange(a) {
      c({
        enableRoundedIcon: a
      });
    },
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Make the icon rounded.', 'wp-plugin-info-card')
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Icon Style', 'wp-plugin-info-card'),
    value: j,
    onChange: function onChange(a) {
      c({
        iconStyle: a
      });
    },
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Set the style of the icon.', 'wp-plugin-info-card'),
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('None', 'wp-plugin-info-card'),
      value: 'none'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Border', 'wp-plugin-info-card'),
      value: 'border'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('B&W With Border', 'wp-plugin-info-card'),
      value: 'bw'
    }]
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Enable Context Menu', 'wp-plugin-info-card'),
    checked: k,
    onChange: function onChange(a) {
      c({
        enableContextMenu: a
      });
    },
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Make the icon rounded.', 'wp-plugin-info-card')
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Override Plugin Title', 'wp-plugin-info-card'),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Leave blank for no override. Otherwise enter a custom title for the plugin.', 'wp-plugin-info-card'),
    value: l,
    onChange: function onChange(a) {
      c({
        pluginTitle: a
      });
    }
  })), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Color Themes', 'wp-plugin-info-card'),
    initialOpen: false,
    className: "wppic-presets-panel",
    icon: "admin-customizer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wppic-screenshot-presets-button-group"
  }, /*#__PURE__*/React.createElement("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Select a color theme', 'wp-plugin-info-card')), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ButtonGroup, null, /*#__PURE__*/React.createElement(_components_PresetButton_PresetButton__WEBPACK_IMPORTED_MODULE_10__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Default', 'wp-plugin-info-card'),
    setAttributes: c,
    attributes: b,
    uniqueId: n,
    isPressed: 'default' === m,
    theme: "default"
  }), /*#__PURE__*/React.createElement(_components_PresetButton_PresetButton__WEBPACK_IMPORTED_MODULE_10__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Blossom', 'wp-plugin-info-card'),
    setAttributes: c,
    attributes: b,
    uniqueId: n,
    isPressed: 'blossom' === m,
    theme: "blossom"
  }), /*#__PURE__*/React.createElement(_components_PresetButton_PresetButton__WEBPACK_IMPORTED_MODULE_10__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Crimson', 'wp-plugin-info-card'),
    setAttributes: c,
    attributes: b,
    uniqueId: n,
    isPressed: 'crimson' === m,
    theme: "crimson"
  }), /*#__PURE__*/React.createElement(_components_PresetButton_PresetButton__WEBPACK_IMPORTED_MODULE_10__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Velvet', 'wp-plugin-info-card'),
    setAttributes: c,
    attributes: b,
    uniqueId: n,
    isPressed: 'velvet' === m,
    theme: "velvet"
  }))), /*#__PURE__*/React.createElement(_components_CustomPresets__WEBPACK_IMPORTED_MODULE_9__["default"], {
    clientId: d,
    uniqueId: n,
    attributes: b,
    setAttributes: c
  })), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Screenshot Customization', 'wp-plugin-info-card'),
    initialOpen: true
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Enable Screenshots', 'wp-plugin-info-card'),
    checked: f,
    onChange: function onChange(a) {
      c({
        enableScreenshots: a
      });
    },
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Enable or disable screenshots.', 'wp-plugin-info-card')
  })), f && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Image Size', 'wp-plugin-info-card'),
    value: h,
    onChange: function onChange(a) {
      c({
        imageSize: a
      });
    },
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Set the image size of the screenshots.', 'wp-plugin-info-card'),
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Thumbnail', 'wp-plugin-info-card'),
      value: 'thumbnail'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Medium', 'wp-plugin-info-card'),
      value: 'medium'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Large', 'wp-plugin-info-card'),
      value: 'large'
    }]
  }))));
  var p = /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.BlockControls, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToolbarGroup, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToolbarButton, {
    icon: "edit",
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Edit Plugin Slug', 'wp-plugin-info-card'),
    onClick: function onClick() {
      return c({
        screen: 'slug-entry'
      });
    }
  })), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToolbarGroup, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToolbarItem, {
    as: "button"
  }, function (a) {
    return /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.DropdownMenu, {
      toggleProps: a,
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Select a Color Theme', 'wp-plugin-info-card'),
      icon: "admin-customizer"
    }, function (a) {
      var b = a.onClose;
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.MenuItemsChoice, {
        choices: [{
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Default', 'wp-plugin-info-card'),
          value: 'default'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Blossom', 'wp-plugin-info-card'),
          value: 'blossom'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Crimson', 'wp-plugin-info-card'),
          value: 'crimson'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Velvet', 'wp-plugin-info-card'),
          value: 'velvet'
        }],
        onSelect: function onSelect(a) {
          c({
            colorTheme: a
          });
          setScheme(a);
          b();
        },
        value: m
      }));
    });
  })));
  var q = /*#__PURE__*/React.createElement(React.Fragment, null, p, /*#__PURE__*/React.createElement(_templates_PluginScreenshots__WEBPACK_IMPORTED_MODULE_8__["default"], {
    assetData: e,
    attributes: b
  }));
  return /*#__PURE__*/React.createElement(React.Fragment, null, o, q);
};
/* harmony default export */ __webpack_exports__["default"] = (ScreenPluginPreview);

/***/ }),

/***/ "./src/blocks/PluginScreenshotsInfoCard/screens/ScreenSlugEntry/index.js":
/*!*******************************************************************************!*\
  !*** ./src/blocks/PluginScreenshotsInfoCard/screens/ScreenSlugEntry/index.js ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Logo__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../Logo */ "./src/blocks/Logo.js");
/* harmony import */ var _components_Loading__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../components/Loading */ "./src/blocks/components/Loading.js");
function _slicedToArray(a, b) { return _arrayWithHoles(a) || _iterableToArrayLimit(a, b) || _unsupportedIterableToArray(a, b) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(a, b) { if (!a) return; if (typeof a === "string") return _arrayLikeToArray(a, b); var c = Object.prototype.toString.call(a).slice(8, -1); if (c === "Object" && a.constructor) c = a.constructor.name; if (c === "Map" || c === "Set") return Array.from(a); if (c === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)) return _arrayLikeToArray(a, b); }
function _arrayLikeToArray(a, b) { if (b == null || b > a.length) b = a.length; for (var c = 0, d = new Array(b); c < b; c++) d[c] = a[c]; return d; }
function _iterableToArrayLimit(b, c) { var d = null == b ? null : "undefined" != typeof Symbol && b[Symbol.iterator] || b["@@iterator"]; if (null != d) { var g, h, j, k, l = [], a = !0, m = !1; try { if (j = (d = d.call(b)).next, 0 === c) { if (Object(d) !== d) return; a = !1; } else for (; !(a = (g = j.call(d)).done) && (l.push(g.value), l.length !== c); a = !0); } catch (a) { m = !0, h = a; } finally { try { if (!a && null != d["return"] && (k = d["return"](), Object(k) !== k)) return; } finally { if (m) throw h; } } return l; } }
function _arrayWithHoles(a) { if (Array.isArray(a)) return a; }
/**
 * This is the initial screen of the block. It is the first screen that the user sees when they add the block to the editor.
 */










/**
 * InitialScreen component.
 *
 * @param {Object} props - Component props.
 * @return {Function} Component.
 */
var SlugEntryScreen = function SlugEntryScreen(a) {
  var b = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    c = _slicedToArray(b, 2),
    d = c[0],
    e = c[1];
  var f = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    g = _slicedToArray(f, 2),
    h = g[0],
    i = g[1];
  var j = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    k = _slicedToArray(j, 2),
    l = k[0],
    m = k[1];
  var n = a.attributes,
    o = a.setAttributes;
  var p = n.slug;
  var q = function loadData() {
    e(true);
    var a = wppic.rest_url + 'wppic/v2/get_data';
    axios__WEBPACK_IMPORTED_MODULE_3___default().get(a + "?type=plugin&slug=".concat(encodeURIComponent(p))).then(function (a) {
      if (a.data.success) {
        // Set asset data.
        o({
          screen: 'image-loader'
        });
      } else {
        m(a.data.data.message);
        i(true);
      }
    })["catch"](function (a) {}).then(function () {
      e(false);
    });
  };
  if (d) {
    return /*#__PURE__*/React.createElement(_components_Loading__WEBPACK_IMPORTED_MODULE_7__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Loading plugin data...', 'wp-plugin-info-card')
    });
  }

  // Set the local inspector controls.
  var r = /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, null);
  var s = function maybeShowModal() {
    if (h) {
      return /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Modal, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Error', 'wp-plugin-info-card'),
        onRequestClose: function onRequestClose() {
          i(false);
        }
      }, /*#__PURE__*/React.createElement("p", null, l), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
        variant: "primary",
        onClick: function onClick() {
          i(false);
        }
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Close', 'wp-plugin-info-card')));
    }
    return null;
  };
  var t = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "wppic-query-block wppic-query-block-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wppic-block-svg"
  }, /*#__PURE__*/React.createElement(_Logo__WEBPACK_IMPORTED_MODULE_6__["default"], {
    size: "75"
  })), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-tab-panel"
  }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Plugin Slug', 'wp-plugin-info-card'),
    value: n.slug,
    onChange: function onChange(a) {
      if (!(0,_wordpress_url__WEBPACK_IMPORTED_MODULE_5__.isURL)(a)) {
        o({
          slug: a
        });
      }
    },
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Please only enter one slug.', 'wp-plugin-info-card'),
    onPaste: function onPaste(a) {
      // Get contents from clipboard.
      var b = a.clipboardData.getData('text/plain').trim();
      if ((0,_wordpress_url__WEBPACK_IMPORTED_MODULE_5__.isURL)(b)) {
        // Extract out the slug from the URL.
        var c = /([^\/]*)\/$/;
        var d = c.exec(b)[1];
        o({
          slug: d
        });
      }
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-gutenberg-button"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    iconSize: 20,
    icon: /*#__PURE__*/React.createElement(_Logo__WEBPACK_IMPORTED_MODULE_6__["default"], {
      size: "25"
    }),
    variant: "secondary",
    id: "wppic-input-submit",
    onClick: function onClick(a) {
      a.preventDefault();
      q();
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Preview and Configure', 'wp-plugin-info-card')))));
  return /*#__PURE__*/React.createElement(React.Fragment, null, s(), r, t);
};
/* harmony default export */ __webpack_exports__["default"] = (SlugEntryScreen);

/***/ }),

/***/ "./src/blocks/SitePluginsCardGrid/block.js":
/*!*************************************************!*\
  !*** ./src/blocks/SitePluginsCardGrid/block.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./block.json */ "./src/blocks/SitePluginsCardGrid/block.json");
/* harmony import */ var _components_GridIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/GridIcon */ "./src/blocks/components/GridIcon.js");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/blocks/SitePluginsCardGrid/edit.js");



//  Import main block file.

var registerBlockType = wp.blocks.registerBlockType;
registerBlockType(_block_json__WEBPACK_IMPORTED_MODULE_0__, {
  icon: /*#__PURE__*/React.createElement(_components_GridIcon__WEBPACK_IMPORTED_MODULE_1__["default"], {
    fill: "#333"
  }),
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  save: function save() {
    return null;
  }
});

/***/ }),

/***/ "./src/blocks/SitePluginsCardGrid/edit.js":
/*!************************************************!*\
  !*** ./src/blocks/SitePluginsCardGrid/edit.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _templates_PluginFlex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../templates/PluginFlex */ "./src/blocks/templates/PluginFlex.js");
/* harmony import */ var _templates_PluginCard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../templates/PluginCard */ "./src/blocks/templates/PluginCard.js");
/* harmony import */ var _templates_PluginLarge__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../templates/PluginLarge */ "./src/blocks/templates/PluginLarge.js");
/* harmony import */ var _templates_PluginWordPress__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../templates/PluginWordPress */ "./src/blocks/templates/PluginWordPress.js");
/* harmony import */ var _Logo__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Logo */ "./src/blocks/Logo.js");
/* harmony import */ var _components_ProgressBar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/ProgressBar */ "./src/blocks/components/ProgressBar.js");
/* harmony import */ var _components_Numbers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/Numbers */ "./src/blocks/components/Numbers.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_9__);
function _slicedToArray(a, b) { return _arrayWithHoles(a) || _iterableToArrayLimit(a, b) || _unsupportedIterableToArray(a, b) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(a, b) { if (!a) return; if (typeof a === "string") return _arrayLikeToArray(a, b); var c = Object.prototype.toString.call(a).slice(8, -1); if (c === "Object" && a.constructor) c = a.constructor.name; if (c === "Map" || c === "Set") return Array.from(a); if (c === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)) return _arrayLikeToArray(a, b); }
function _arrayLikeToArray(a, b) { if (b == null || b > a.length) b = a.length; for (var c = 0, d = new Array(b); c < b; c++) d[c] = a[c]; return d; }
function _iterableToArrayLimit(b, c) { var d = null == b ? null : "undefined" != typeof Symbol && b[Symbol.iterator] || b["@@iterator"]; if (null != d) { var g, h, j, k, l = [], a = !0, m = !1; try { if (j = (d = d.call(b)).next, 0 === c) { if (Object(d) !== d) return; a = !1; } else for (; !(a = (g = j.call(d)).done) && (l.push(g.value), l.length !== c); a = !0); } catch (a) { m = !0, h = a; } finally { try { if (!a && null != d["return"] && (k = d["return"](), Object(k) !== k)) return; } finally { if (m) throw h; } } return l; } }
function _arrayWithHoles(a) { if (Array.isArray(a)) return a; }
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
/**
 * External dependencies
 */










var _wp$element = wp.element,
  Fragment = _wp$element.Fragment,
  useEffect = _wp$element.useEffect,
  useState = _wp$element.useState;
var __ = wp.i18n.__;
var _wp$components = wp.components,
  PanelBody = _wp$components.PanelBody,
  PanelRow = _wp$components.PanelRow,
  SelectControl = _wp$components.SelectControl,
  Spinner = _wp$components.Spinner,
  ToolbarGroup = _wp$components.ToolbarGroup,
  ToolbarButton = _wp$components.ToolbarButton,
  ToolbarItem = _wp$components.ToolbarItem,
  DropdownMenu = _wp$components.DropdownMenu,
  ButtonGroup = _wp$components.ButtonGroup,
  Button = _wp$components.Button,
  Notice = _wp$components.Notice,
  MenuItemsChoice = _wp$components.MenuItemsChoice,
  BaseControl = _wp$components.BaseControl;
var _wp$blockEditor = wp.blockEditor,
  InspectorControls = _wp$blockEditor.InspectorControls,
  BlockAlignmentToolbar = _wp$blockEditor.BlockAlignmentToolbar,
  MediaUpload = _wp$blockEditor.MediaUpload,
  BlockControls = _wp$blockEditor.BlockControls,
  useBlockProps = _wp$blockEditor.useBlockProps;
var useInstanceId = wp.compose.useInstanceId;
var SitePluginsCardGrid = function SitePluginsCardGrid(a) {
  var b = a.attributes,
    c = a.setAttributes;
  var d = useInstanceId(SitePluginsCardGrid, 'wp-plugin-info-card-id');
  var e = b.assetData,
    f = b.scheme,
    g = b.layout,
    h = b.preview,
    i = b.defaultsApplied,
    j = b.sortby,
    k = b.sort,
    l = b.cols,
    m = b.colGap,
    n = b.rowGap,
    o = b.align,
    p = b.uniqueId;
  var q = useState(b.loading),
    r = _slicedToArray(q, 2),
    s = r[0],
    t = r[1];
  var u = useState(false),
    v = _slicedToArray(u, 2),
    w = v[0],
    x = v[1];
  var y = useState(''),
    z = _slicedToArray(y, 2),
    A = z[0],
    B = z[1];
  var C = useState(0),
    D = _slicedToArray(C, 2),
    E = D[0],
    F = D[1];
  var G = useState([]),
    H = _slicedToArray(G, 2),
    I = H[0],
    J = H[1];

  /**
   * Load plugins recursively until all plugins are processed.
   *
   * @param {number} page The page to retrieve.
   */
  var K = function loadPlugins() {
    var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    x(true);
    t(true);
    var b = wppic.rest_url + 'wppic/v2/get_site_plugins';
    axios__WEBPACK_IMPORTED_MODULE_0___default().get(b, {
      params: {
        page: a
      },
      headers: {
        'X-WP-Nonce': wppic.rest_nonce
      }
    }).then(function (a) {
      if (a.data.success) {
        var b = a.data.data;

        // Calculate percentage.
        var d = b.percentage_complete;
        var e = b.more_results;
        var f = b.page;
        var g = b.plugins;
        F(d);

        // Merge arrays assetData and pluginData.
        var h = I;
        Object.values(g).forEach(function (a) {
          h.push(a);
        });
        J(h);
        if (e) {
          K(f);
        } else {
          // Set plugins and update status.
          t(false);
          c({
            loading: false
          });
          x(false);
          c({
            assetData: I
          });
        }
      }
    });
  };
  var L = function pluginOnClick() {
    J([]);
    t(false);
    c({
      loading: false
    });
    x(true);

    // Do ajax request to get activeplugins.
    K();
  };
  useEffect(function () {
    c({
      uniqueId: d
    });
    if (!i && 'default' === f) {
      c({
        defaultsApplied: true,
        scheme: wppic.default_scheme,
        layout: wppic.default_layout
      });
    }
  }, []);
  var M = function outputInfoCards(a) {
    return Object.values(a).map(function (a, b) {
      return /*#__PURE__*/React.createElement(Fragment, {
        key: b
      }, 'flex' === g && /*#__PURE__*/React.createElement(_templates_PluginFlex__WEBPACK_IMPORTED_MODULE_2__["default"], {
        scheme: f,
        data: a,
        align: o
      }), 'card' === g && /*#__PURE__*/React.createElement(_templates_PluginCard__WEBPACK_IMPORTED_MODULE_3__["default"], {
        scheme: f,
        data: a,
        align: o
      }), 'large' === g && /*#__PURE__*/React.createElement(_templates_PluginLarge__WEBPACK_IMPORTED_MODULE_4__["default"], {
        scheme: f,
        data: a,
        align: o
      }), 'wordpress' === g && /*#__PURE__*/React.createElement(_templates_PluginWordPress__WEBPACK_IMPORTED_MODULE_5__["default"], {
        scheme: f,
        data: a,
        align: o
      }));
    });
  };

  /**
   * Retrieve colums interface for sidebar options.
   *
   * @return {Element} The columns interface.
   */
  var N = function getCols() {
    return /*#__PURE__*/React.createElement(BaseControl, {
      id: "col-count",
      label: __('Select How Many Columns', 'wp-plugin-info-card')
    }, /*#__PURE__*/React.createElement(ButtonGroup, null, /*#__PURE__*/React.createElement(Button, {
      isPrimary: l === 1,
      isSecondary: l !== 1,
      onClick: function onClick() {
        c({
          cols: 1
        });
      }
    }, __('One', 'wp-plugin-info-card')), /*#__PURE__*/React.createElement(Button, {
      isPrimary: l === 2,
      isSecondary: l !== 2,
      onClick: function onClick() {
        c({
          cols: 2
        });
      }
    }, __('Two', 'wp-plugin-info-card')), /*#__PURE__*/React.createElement(Button, {
      isPrimary: l === 3,
      isSecondary: l !== 3,
      onClick: function onClick() {
        c({
          cols: 3
        });
      }
    }, __('Three', 'wp-plugin-info-card'))));
  };
  var O = [{
    value: 'default',
    label: __('Default', 'wp-plugin-info-card')
  }, {
    value: 'scheme1',
    label: __('Scheme 1', 'wp-plugin-info-card')
  }, {
    value: 'scheme2',
    label: __('Scheme 2', 'wp-plugin-info-card')
  }, {
    value: 'scheme3',
    label: __('Scheme 3', 'wp-plugin-info-card')
  }, {
    value: 'scheme4',
    label: __('Scheme 4', 'wp-plugin-info-card')
  }, {
    value: 'scheme5',
    label: __('Scheme 5', 'wp-plugin-info-card')
  }, {
    value: 'scheme6',
    label: __('Scheme 6', 'wp-plugin-info-card')
  }, {
    value: 'scheme7',
    label: __('Scheme 7', 'wp-plugin-info-card')
  }, {
    value: 'scheme8',
    label: __('Scheme 8', 'wp-plugin-info-card')
  }, {
    value: 'scheme9',
    label: __('Scheme 9', 'wp-plugin-info-card')
  }, {
    value: 'scheme10',
    label: __('Scheme 10', 'wp-plugin-info-card')
  }, {
    value: 'scheme11',
    label: __('Scheme 11', 'wp-plugin-info-card')
  }, {
    value: 'scheme12',
    label: __('Scheme 12', 'wp-plugin-info-card')
  }, {
    value: 'scheme13',
    label: __('Scheme 13', 'wp-plugin-info-card')
  }, {
    value: 'scheme14',
    label: __('Scheme 14', 'wp-plugin-info-card')
  }];
  var P = [{
    value: 'card',
    label: __('Card', 'wp-plugin-info-card')
  }, {
    value: 'large',
    label: __('Large', 'wp-plugin-info-card')
  }, {
    value: 'wordpress',
    label: __('WordPress', 'wp-plugin-info-card')
  }, {
    value: 'flex',
    label: __('Flex', 'wp-plugin-info-card')
  }];
  var Q = 'card' === g ? 'wp-pic-card' : g;
  var R = /*#__PURE__*/React.createElement(InspectorControls, null, /*#__PURE__*/React.createElement(PanelBody, {
    title: __('Layout', 'wp-plugin-info-card')
  }, /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(SelectControl, {
    label: __('Scheme', 'wp-plugin-info-card'),
    options: O,
    value: f,
    onChange: function onChange(a) {
      c({
        scheme: a
      });
    }
  })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(SelectControl, {
    label: __('Layout', 'wp-plugin-info-card'),
    options: P,
    value: g,
    onChange: function onChange(a) {
      if ('flex' === a) {
        c({
          layout: a,
          align: 'full'
        });
      } else {
        c({
          layout: a,
          align: 'center'
        });
      }
    }
  })), /*#__PURE__*/React.createElement(PanelRow, {
    className: "wppic-panel-rows-cols"
  }, N()), /*#__PURE__*/React.createElement(PanelRow, {
    className: "wppic-panel-rows-numbers"
  }, /*#__PURE__*/React.createElement(_components_Numbers__WEBPACK_IMPORTED_MODULE_8__["default"], {
    value: m,
    label: __('Column Gap (in px)', 'wp-plugin-info-card'),
    numbers: [20, 40, 60, 80],
    onClick: function onClick(a) {
      c({
        colGap: parseInt(a)
      });
    },
    id: "wppic-col-gap"
  })), /*#__PURE__*/React.createElement(PanelRow, {
    className: "wppic-panel-rows-numbers"
  }, /*#__PURE__*/React.createElement(_components_Numbers__WEBPACK_IMPORTED_MODULE_8__["default"], {
    value: n,
    label: __('Row Gap (in px)', 'wp-plugin-info-card'),
    numbers: [20, 40, 60, 80],
    onClick: function onClick(a) {
      c({
        rowGap: parseInt(a)
      });
    },
    id: "wppic-row-gap"
  }))));
  var S = "\n\t\t#".concat(p, " {\n\t\t\tdisplay: grid;\n\t\t\tcolumn-gap: ").concat(m, "px;\n\t\t\trow-gap: ").concat(n, "px;\n\t\t}\n\t");
  var T = useBlockProps({
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()("site-plugins-card-grid align".concat(o))
  });
  if (h) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: wppic.site_plugins_preview,
      alt: "",
      style: {
        height: '415px',
        width: 'auto',
        textAlign: 'center'
      }
    }));
  }
  var U = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-gutenberg-button"
  }, /*#__PURE__*/React.createElement(Button, {
    iconSize: 20,
    icon: !w ? /*#__PURE__*/React.createElement(_Logo__WEBPACK_IMPORTED_MODULE_6__["default"], {
      size: "25"
    }) : /*#__PURE__*/React.createElement(Spinner, null),
    isSecondary: true,
    disabled: w,
    id: "wppic-input-submit",
    onClick: function onClick(a) {
      F(0);
      L(a);
    }
  }, !w ? __('Load Plugins', 'wp-plugin-info-card') : __('Loading…', 'wp-plugin-info-card'))), w && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_components_ProgressBar__WEBPACK_IMPORTED_MODULE_7__["default"], {
    percentage: E
  })));
  var V = /*#__PURE__*/React.createElement(React.Fragment, null, s && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(BlockControls, null, /*#__PURE__*/React.createElement(ToolbarGroup, null, /*#__PURE__*/React.createElement(ToolbarButton, {
    icon: "welcome-view-site",
    title: __('View Preview', 'wp-plugin-info-card'),
    onClick: function onClick() {
      return t(false);
    }
  }, __('View Preview', 'wp-plugin-info-card')))), /*#__PURE__*/React.createElement("div", {
    className: "wppic-site-plugins-block wppic-site-plugins-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wppic-block-svg"
  }, /*#__PURE__*/React.createElement(_Logo__WEBPACK_IMPORTED_MODULE_6__["default"], {
    size: "75"
  })), /*#__PURE__*/React.createElement("div", {
    className: "wppic-site-plugins-description"
  }, /*#__PURE__*/React.createElement("p", null, __('Click "Load Plugins" to load your active plugins. Please note that plugins not hosted on the WordPress Plugin Directory will not be displayed.', 'wp-plugin-info-card'))), U)), !s && Object.keys(e).length <= 0 && !w && /*#__PURE__*/React.createElement("div", {
    className: "wppic-site-plugins-block wppic-site-plugins-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wppic-block-svg"
  }, /*#__PURE__*/React.createElement(_Logo__WEBPACK_IMPORTED_MODULE_6__["default"], {
    size: "75"
  })), /*#__PURE__*/React.createElement("div", {
    className: "wppic-site-plugins-description"
  }, /*#__PURE__*/React.createElement(Notice, {
    status: "warning",
    isDismissible: false
  }, __('No plugins have been loaded or found. Please try again.', 'wp-plugin-info-card'))), U), !s && Object.keys(e).length > 0 && !w && /*#__PURE__*/React.createElement(Fragment, null, R, /*#__PURE__*/React.createElement(BlockControls, null, /*#__PURE__*/React.createElement(ToolbarGroup, null, /*#__PURE__*/React.createElement(ToolbarButton, {
    icon: "edit",
    title: __('Edit and Configure', 'wp-plugin-info-card'),
    onClick: function onClick() {
      return t(true);
    }
  }, __('Edit', 'wp-plugin-info-card')), /*#__PURE__*/React.createElement(ToolbarButton, {
    icon: "image-rotate",
    title: __('Refresh Plugins', 'wp-plugin-info-card'),
    onClick: function onClick() {
      return L();
    }
  }, __('Refresh', 'wp-plugin-info-card'))), /*#__PURE__*/React.createElement(ToolbarGroup, null, /*#__PURE__*/React.createElement(ToolbarItem, {
    as: "button"
  }, function (a) {
    return /*#__PURE__*/React.createElement(DropdownMenu, {
      toggleProps: a,
      label: __('Select Color Scheme', 'wp-plugin-info-card'),
      icon: "admin-customizer"
    }, function (a) {
      var b = a.onClose;
      return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(MenuItemsChoice, {
        choices: O,
        onSelect: function onSelect(a) {
          c({
            scheme: a
          });
          b();
        },
        value: f
      }));
    });
  })), /*#__PURE__*/React.createElement(ToolbarGroup, null, /*#__PURE__*/React.createElement(ToolbarItem, {
    as: "button"
  }, function (a) {
    return /*#__PURE__*/React.createElement(DropdownMenu, {
      toggleProps: a,
      label: __('Select a Layout', 'wp-plugin-info-card'),
      icon: "layout"
    }, function (a) {
      var b = a.onClose;
      return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(MenuItemsChoice, {
        choices: P,
        onSelect: function onSelect(a) {
          c({
            layout: a
          });
          b();
        },
        value: g
      }));
    });
  }))), /*#__PURE__*/React.createElement("style", null, S), /*#__PURE__*/React.createElement("div", {
    id: p,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('is-placeholder', Q, 'wp-block-plugin-info-card', 'wp-site-plugin-info-card', "align".concat(o), "cols-".concat(l))
  }, M(e))));
  return /*#__PURE__*/React.createElement("div", T, V);
};
/* harmony default export */ __webpack_exports__["default"] = (SitePluginsCardGrid);

/***/ }),

/***/ "./src/blocks/components/BannerWrapper.js":
/*!************************************************!*\
  !*** ./src/blocks/components/BannerWrapper.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Fragment = wp.element.Fragment;
var BannerWrapper = function BannerWrapper(a) {
  var b = a.defaultBanner;
  if ('high' in a.bannerImage && false !== a.bannerImage.high) {
    b = a.bannerImage.high;
  } else if ('low' in a.bannerImage && false !== a.bannerImage) {
    b = a.bannerImage.low;
  }
  if (a.image) {
    b = a.image;
  }
  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-banner-wrapper"
  }, /*#__PURE__*/React.createElement("img", {
    src: b,
    alt: a.name
  })));
};
BannerWrapper.defaultProps = {
  name: '',
  banners: {},
  hasBanner: false,
  bannerImage: {},
  // eslint-disable-next-line no-undef
  defaultBanner: wppic.wppic_banner_default,
  image: false
};
/* harmony default export */ __webpack_exports__["default"] = (BannerWrapper);

/***/ }),

/***/ "./src/blocks/components/BlockPreview.js":
/*!***********************************************!*\
  !*** ./src/blocks/components/BlockPreview.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);


var BlockPreview = function BlockPreview(a) {
  var b = a.blocks,
    c = a.viewportWidth,
    d = c === void 0 ? 1200 : c,
    e = a.minHeight,
    f = a.additionalStyles,
    g = f === void 0 ? [] : f;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.BlockPreview, {
    blocks: b,
    viewportWidth: d,
    minHeight: e,
    additionalStyles: g
  });
};
/* harmony default export */ __webpack_exports__["default"] = (BlockPreview);

/***/ }),

/***/ "./src/blocks/components/ColorPicker/index.js":
/*!****************************************************!*\
  !*** ./src/blocks/components/ColorPicker/index.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor.scss */ "./src/blocks/components/ColorPicker/editor.scss");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var hex_to_rgba__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! hex-to-rgba */ "./node_modules/hex-to-rgba/build/index.js");
/* harmony import */ var hex_to_rgba__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(hex_to_rgba__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var rgb2hex__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rgb2hex */ "./node_modules/rgb2hex/index.js");
/* harmony import */ var rgb2hex__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(rgb2hex__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__);
function _slicedToArray(a, b) { return _arrayWithHoles(a) || _iterableToArrayLimit(a, b) || _unsupportedIterableToArray(a, b) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(a, b) { if (!a) return; if (typeof a === "string") return _arrayLikeToArray(a, b); var c = Object.prototype.toString.call(a).slice(8, -1); if (c === "Object" && a.constructor) c = a.constructor.name; if (c === "Map" || c === "Set") return Array.from(a); if (c === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)) return _arrayLikeToArray(a, b); }
function _arrayLikeToArray(a, b) { if (b == null || b > a.length) b = a.length; for (var c = 0, d = new Array(b); c < b; c++) d[c] = a[c]; return d; }
function _iterableToArrayLimit(b, c) { var d = null == b ? null : "undefined" != typeof Symbol && b[Symbol.iterator] || b["@@iterator"]; if (null != d) { var g, h, j, k, l = [], a = !0, m = !1; try { if (j = (d = d.call(b)).next, 0 === c) { if (Object(d) !== d) return; a = !1; } else for (; !(a = (g = j.call(d)).done) && (l.push(g.value), l.length !== c); a = !0); } catch (a) { m = !0, h = a; } finally { try { if (!a && null != d["return"] && (k = d["return"](), Object(k) !== k)) return; } finally { if (m) throw h; } } return l; } }
function _arrayWithHoles(a) { if (Array.isArray(a)) return a; }
/**
 * Color Picker.
 *
 * Credit: Forked from @generateblocks
 */








var ColorPickerControl = function ColorPickerControl(a) {
  var b = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(a.slug),
    c = _slicedToArray(b, 2),
    d = c[0],
    e = c[1];
  var f = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    g = _slicedToArray(f, 2),
    h = g[0],
    i = g[1];
  var j = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(a.value),
    k = _slicedToArray(j, 2),
    l = k[0],
    m = k[1];
  var n = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(a.opacity),
    o = _slicedToArray(n, 2),
    p = o[0],
    q = o[1];
  var r = a.defaultColor,
    s = a.defaultColors,
    t = a.value,
    u = a.onChange,
    v = a.onOpacityChange,
    w = a.label,
    x = a.alpha,
    y = x === void 0 ? false : x,
    z = a.slug,
    A = a.hideLabelFromVision,
    B = A === void 0 ? false : A;
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    m(t);
  }, [t]);

  /**
   * Return a color based on passed alpha value.
   *
   * @param {string} colorValue   hex, rgb, rgba, or CSS var.
   * @param {number} opacityValue The opacity (from 0 - 1).
   * @return {string} The color in hex, rgba, or CSS var format.
   */
  var C = function getColor(a) {
    var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    // Test for CSS var values in color value.
    if (a.indexOf('var(') === 0) {
      return a;
    }

    // Test for RGBA at the beginning, and return value.
    if (a.indexOf('rgba') === 0) {
      // Calculate hex value from rgba.
      var c = rgb2hex__WEBPACK_IMPORTED_MODULE_4___default()(a).hex;
      return hex_to_rgba__WEBPACK_IMPORTED_MODULE_3___default()(c, b);
    }

    // Test for RGB at the beginning, and return hex if found.
    if (a.indexOf('rgb') === 0) {
      return hex_to_rgba__WEBPACK_IMPORTED_MODULE_3___default()(rgb2hex__WEBPACK_IMPORTED_MODULE_4___default()(a).hex, b);
    }
    if (y) {
      return hex_to_rgba__WEBPACK_IMPORTED_MODULE_3___default()(a, b);
    }
    return a;
  };

  // Retrieve colors while avoiding duplicates.
  var D = function getDefaultColors() {
    var a = [];
    var b = [];
    s.forEach(function (c, d) {
      if (!a.includes(c.color)) {
        a.push(c.color);
        b.push(c);
      }
    });
    return b;
  };
  var E = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 488.47 488.47"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("path", {
    d: "M244.235 0S61.058 174.454 61.058 314.016c0 96.347 82.011 174.454 183.177 174.454s183.177-78.107 183.177-174.454C427.412 174.454 244.235 0 244.235 0zm0 91.588c46.976 52.953 97.174 123.655 114.946 183.177H129.292c17.771-59.522 67.968-130.223 114.943-183.177z"
  }));

  /**
   * Toggle whether the color popup is showing.
   */
  var F = function toggleVisible() {
    i(true);
  };

  /**
   * Close color popup if visible.
   */
  var G = function toggleClose() {
    if (h) {
      i(false);
    }
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.BaseControl, {
    className: "wppic-component-color-picker-wrapper"
  }, !!w && !B && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("h3", {
    className: "wppic-color-component-label"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", null, w)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "wppic-component-color-picker"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "wppic-color-picker-area wppic-component-color-picker-palette"
  }, !h && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('components-color-palette__item-wrapper components-circular-option-picker__option-wrapper wppic-color-picker-area wppic-component-color-picker-palette', t ? '' : 'components-color-palette__custom-color')
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Tooltip, {
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Choose Color', 'wp-plugin-info-card')
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("button", {
    type: "button",
    "aria-expanded": h,
    className: "components-button components-circular-option-picker__option is-pressed",
    onClick: F,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Custom color picker', 'wp-plugin-info-card'),
    style: {
      background: C(l, p)
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", {
    className: "components-color-palette__custom-color-gradient"
  }))))), h && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('components-color-palette__item-wrapper components-circular-option-picker__option-wrapper wppic-color-picker-area wppic-component-color-picker-palette', t ? '' : 'components-color-palette__custom-color')
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Tooltip, {
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Choose Color', 'wp-plugin-info-card')
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("button", {
    type: "button",
    "aria-expanded": h,
    className: "components-button components-circular-option-picker__option is-pressed",
    onClick: G,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Custom color picker', 'wp-plugin-info-card'),
    style: {
      background: C(l, p)
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", {
    className: "components-color-palette__custom-color-gradient"
  })))), h && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Popover, {
    className: "wppic-component-color-picker",
    onClose: G,
    noArrow: false
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.BaseControl, {
    key: d
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.ColorPicker, {
    key: d,
    color: l,
    onChangeComplete: function onChangeComplete(a) {
      var b = C(a.hex, p);
      m(b);
      u(z, b);
    },
    disableAlpha: true,
    defaultValue: r
  })), y && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "wppic-component-color-opacity"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Tooltip, {
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Opacity', 'wp-plugin-info-card')
  }, E), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.RangeControl, {
    value: p,
    onChange: function onChange(a) {
      var b = C(l, a);
      q(a);
      m(b);
      u(z, b);
      v(a);
    },
    min: 0,
    max: 1,
    step: 0.01,
    initialPosition: 1
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.BaseControl, {
    className: "wppic-component-color-picker-palette"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.ColorPalette, {
    colors: D(),
    value: l,
    onChange: function onChange(a) {
      var b = C(a);
      u(z, b);
      m(b);
    },
    disableCustomColors: true,
    clearable: false
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "components-color-clear-color"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Button, {
    onClick: function onClick() {
      u(z, r);
      m(r);
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Clear Color', 'wp-plugin-info-card')))))));
};
ColorPickerControl.propTypes = {
  label: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().string),
  onChange: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().func).isRequired,
  onOpacityChange: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().func),
  value: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().string),
  defaultColor: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().string),
  alpha: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().bool),
  hideLabelFromVision: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().bool),
  defaultColors: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().array).isRequired
};
ColorPickerControl.defaultProps = {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Color', 'wp-plugin-info-card'),
  value: '',
  defaultColor: 'transparent',
  alpha: false,
  hideLabelFromVision: false,
  onOpacityChange: function onOpacityChange() {}
};
/* harmony default export */ __webpack_exports__["default"] = (ColorPickerControl);

/***/ }),

/***/ "./src/blocks/components/CustomPresets/CustomPresetContainer.js":
/*!**********************************************************************!*\
  !*** ./src/blocks/components/CustomPresets/CustomPresetContainer.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./context */ "./src/blocks/components/CustomPresets/context.js");
/* harmony import */ var _CustomPresetSaveModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CustomPresetSaveModal */ "./src/blocks/components/CustomPresets/CustomPresetSaveModal.js");
/* harmony import */ var _PresetButtonEdit__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PresetButtonEdit */ "./src/blocks/components/CustomPresets/PresetButtonEdit.js");
/* harmony import */ var _CustomPresetEditModal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./CustomPresetEditModal */ "./src/blocks/components/CustomPresets/CustomPresetEditModal.js");
/* harmony import */ var _CustomPresetDeleteModal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./CustomPresetDeleteModal */ "./src/blocks/components/CustomPresets/CustomPresetDeleteModal.js");
/* harmony import */ var _ColorPicker__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../ColorPicker */ "./src/blocks/components/ColorPicker/index.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (a) { for (var b = 1; b < arguments.length; b++) { var c = arguments[b]; for (var d in c) { if (Object.prototype.hasOwnProperty.call(c, d)) { a[d] = c[d]; } } } return a; }; return _extends.apply(this, arguments); }
function ownKeys(a, b) { var c = Object.keys(a); if (Object.getOwnPropertySymbols) { var d = Object.getOwnPropertySymbols(a); b && (d = d.filter(function (b) { return Object.getOwnPropertyDescriptor(a, b).enumerable; })), c.push.apply(c, d); } return c; }
function _objectSpread(a) { for (var b = 1; b < arguments.length; b++) { var c = null != arguments[b] ? arguments[b] : {}; b % 2 ? ownKeys(Object(c), !0).forEach(function (b) { _defineProperty(a, b, c[b]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(c)) : ownKeys(Object(c)).forEach(function (b) { Object.defineProperty(a, b, Object.getOwnPropertyDescriptor(c, b)); }); } return a; }
function _defineProperty(a, b, c) { b = _toPropertyKey(b); if (b in a) { Object.defineProperty(a, b, { value: c, enumerable: true, configurable: true, writable: true }); } else { a[b] = c; } return a; }
function _toPropertyKey(a) { var b = _toPrimitive(a, "string"); return (typeof b === "undefined" ? "undefined" : _typeof(b)) === "symbol" ? b : String(b); }
function _toPrimitive(a, b) { if ((typeof a === "undefined" ? "undefined" : _typeof(a)) !== "object" || a === null) return a; var c = a[Symbol.toPrimitive]; if (c !== undefined) { var d = c.call(a, b || "default"); if ((typeof d === "undefined" ? "undefined" : _typeof(d)) !== "object") return d; throw new TypeError("@@toPrimitive must return a primitive value."); } return (b === "string" ? String : Number)(a); }
function _slicedToArray(a, b) { return _arrayWithHoles(a) || _iterableToArrayLimit(a, b) || _unsupportedIterableToArray(a, b) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(a, b) { if (!a) return; if (typeof a === "string") return _arrayLikeToArray(a, b); var c = Object.prototype.toString.call(a).slice(8, -1); if (c === "Object" && a.constructor) c = a.constructor.name; if (c === "Map" || c === "Set") return Array.from(a); if (c === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)) return _arrayLikeToArray(a, b); }
function _arrayLikeToArray(a, b) { if (b == null || b > a.length) b = a.length; for (var c = 0, d = new Array(b); c < b; c++) d[c] = a[c]; return d; }
function _iterableToArrayLimit(b, c) { var d = null == b ? null : "undefined" != typeof Symbol && b[Symbol.iterator] || b["@@iterator"]; if (null != d) { var g, h, j, k, l = [], a = !0, m = !1; try { if (j = (d = d.call(b)).next, 0 === c) { if (Object(d) !== d) return; a = !1; } else for (; !(a = (g = j.call(d)).done) && (l.push(g.value), l.length !== c); a = !0); } catch (a) { m = !0, h = a; } finally { try { if (!a && null != d["return"] && (k = d["return"](), Object(k) !== k)) return; } finally { if (m) throw h; } } return l; } }
function _arrayWithHoles(a) { if (Array.isArray(a)) return a; }











// Array with key value.
var colorKeysWithLabel = [{
  key: 'colorBackground',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Background Color', 'wp-plugin-info-card')
}, {
  key: 'colorText',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Text Color', 'wp-plugin-info-card')
}, {
  key: 'colorBorder',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Border Color', 'wp-plugin-info-card')
}, {
  key: 'colorStar',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Star Color', 'wp-plugin-info-card')
}, {
  key: 'colorMenu',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Menu Background Color', 'wp-plugin-info-card')
}, {
  key: 'colorMenuBorder',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Menu Border Color', 'wp-plugin-info-card')
}, {
  key: 'colorMenuHover',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Menu Hover Background Color', 'wp-plugin-info-card')
}, {
  key: 'colorMenuText',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Menu Text Color', 'wp-plugin-info-card')
}, {
  key: 'colorMenuTextHover',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Menu Hover Text Color', 'wp-plugin-info-card')
}, {
  key: 'colorScreenshotsBackground',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Screenshots Background Color', 'wp-plugin-info-card')
}, {
  key: 'colorScreenshotsBorder',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Screenshots Border Color', 'wp-plugin-info-card')
}, {
  key: 'colorScreenshotsArrowBackground',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Arrow Background Color', 'wp-plugin-info-card')
}, {
  key: 'colorScreenshotsArrowBackgroundHover',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Arrow Hover Background Color', 'wp-plugin-info-card')
}, {
  key: 'colorScreenshotsArrow',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Arrow Color', 'wp-plugin-info-card')
}, {
  key: 'colorScreenshotsArrowHover',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Arrow Hover Color', 'wp-plugin-info-card')
}, {
  key: 'colorMetaBackground',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Meta Background Color', 'wp-plugin-info-card')
}, {
  key: 'colorMetaText',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Meta Text Color', 'wp-plugin-info-card')
}];
var CustomPresetContainer = function CustomPresetContainer(a) {
  var b = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    c = _slicedToArray(b, 2),
    d = c[0],
    e = c[1];
  var f = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('new'),
    g = _slicedToArray(f, 2),
    h = g[0],
    i = g[1];
  var j = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    k = _slicedToArray(j, 2),
    l = k[0],
    m = k[1];
  var n = a.attributes,
    o = a.setAttributes,
    p = a.clientId,
    q = a.uniqueId;
  var r = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context__WEBPACK_IMPORTED_MODULE_3__["default"]),
    s = r.savedPresets,
    t = r.setSavedPresets,
    u = r.savingPreset,
    v = r.setSavingPreset,
    w = r.editPresets,
    x = r.setEditPresets,
    y = r.showEditModal,
    z = r.showDeleteModal;
  var A = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    B = _slicedToArray(A, 2),
    C = B[0],
    D = B[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (C) {
      // Perform fetch request to ajax endpoint.
      var a = "".concat(ajaxurl); // eslint-disable-line no-undef
      var b = new FormData();
      b.append('action', 'wppic_load_screenshot_presets');
      b.append('nonce', wppic.screenshot_preset_get_nonce);
      fetch(a, {
        method: 'POST',
        body: b,
        /* get return in json */
        headers: {
          Accept: 'application/json'
        }
      }).then(function (a) {
        return a.json();
      }).then(function (a) {
        var b = a.data.presets;
        e(false);
        t(b);
      })["catch"](function (a) {
        e(false);
      });
    }
  }, [C]);

  /**
   * Show a loading spinner.
   *
   * @param {string} label Label of the loading spinner.
   * @return {JSX} Loading spinner.
   */
  var E = function showLoading(a) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "wppic-custom-preset-loading-container"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "wppic-custom-preset-loading-label"
    }, a), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, null));
  };
  var F = function getSavedPresets() {
    if (s.length > 0) {
      // Map to preset buttons.
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "wppic-presets"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ButtonGroup, null, s.map(function (a) {
        var b;
        var c = _objectSpread(_objectSpread(_objectSpread({}, n), a.content.formData), {}, {
          colorTheme: "custom-".concat(a.slug)
        });
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_PresetButtonEdit__WEBPACK_IMPORTED_MODULE_5__["default"], {
          key: a.id,
          editId: a.id,
          title: a.title,
          setAttributes: o,
          uniqueId: q,
          clientId: p,
          slug: a.slug,
          isPressed: n.colorTheme === "custom-".concat(a.slug),
          attributes: c,
          saveNonce: a.save_nonce,
          deleteNonce: a.delete_nonce,
          theme: "custom-".concat(a.slug),
          customFormData: (b = a.content.formData) !== null && b !== void 0 ? b : {}
        });
      })));
    }
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No custom color themes have been saved yet.', 'wp-plugin-info-card')));
  };

  // Read in localized var and determine if user can save or edit presets.
  var G = wppic.can_edit_others_posts;
  if (d) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "wppic-screenshot-presets-button-group",
      ref: D
    }, E((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Loading Custom Color Themes', 'wp-plugin-info-card')));
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, y && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_CustomPresetEditModal__WEBPACK_IMPORTED_MODULE_6__["default"], {
    editId: y.editId,
    title: y.title,
    saveNonce: y.saveNonce
  }), z && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_CustomPresetDeleteModal__WEBPACK_IMPORTED_MODULE_7__["default"], {
    editId: z.editId,
    title: z.title,
    deleteNonce: z.deleteNonce
  }), !d && s.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "wppic-screenshot-presets-button-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Custom Color Themes', 'wp-plugin-info-card')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "wppic-custom-preset-container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, F(), !w && !u && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: 'secondary',
    onClick: function onClick(a) {
      a.preventDefault();
      x(true);
    },
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Edit Presets', 'wp-plugin-info-card')
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Edit Presets', 'wp-plugin-info-card')), w && !u && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: 'primary',
    onClick: function onClick(a) {
      a.preventDefault();
      x(false);
    },
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Exit Edit Mode', 'wp-plugin-info-card')
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Exit Edit Mode', 'wp-plugin-info-card'))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Customize the colors', 'wp-plugin-info-card'),
    checked: n.customColors,
    onChange: function onChange(a) {
      o({
        customColors: a
      });
    },
    help: G ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Customize the colors of the plugin info card. You can save your customizations as a color theme.', 'wp-plugin-info-card') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Customize the colors of the plugin info card.', 'wp-plugin-info-card')
  }), G && n.customColors && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "wppic-custom-preset-colors"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Customize the Colors', 'wp-plugin-info-card')), Object.values(colorKeysWithLabel).map(function (a, b) {
    var c;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "wppic-custom-preset-color",
      key: b
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ColorPicker__WEBPACK_IMPORTED_MODULE_8__["default"], {
      value: (c = n[a.key]) !== null && c !== void 0 ? c : 'transparent',
      key: b,
      onChange: function onChange(b, c) {
        var d = _objectSpread({}, n);
        d[a.key] = c;
        o(d);
      },
      label: a.label,
      defaultColors: wppic.palette,
      defaultColor: '#FFFFFF',
      slug: a.key
    }));
  })), G && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "wppic-custom-preset-actions"
  }, !w && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: 'primary',
    onClick: function onClick(a) {
      a.preventDefault();
      v(true);
    },
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Save Colors as a New Theme', 'wp-plugin-info-card')
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Save Colors as a New Theme', 'wp-plugin-info-card')))), u && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_CustomPresetSaveModal__WEBPACK_IMPORTED_MODULE_4__["default"], _extends({
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Save Color Theme?', 'wp-plugin-info-card')
  }, a)));
};
/* harmony default export */ __webpack_exports__["default"] = (CustomPresetContainer);

/***/ }),

/***/ "./src/blocks/components/CustomPresets/CustomPresetDeleteModal.js":
/*!************************************************************************!*\
  !*** ./src/blocks/components/CustomPresets/CustomPresetDeleteModal.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./context */ "./src/blocks/components/CustomPresets/context.js");
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (a) { for (var b = 1; b < arguments.length; b++) { var c = arguments[b]; for (var d in c) { if (Object.prototype.hasOwnProperty.call(c, d)) { a[d] = c[d]; } } } return a; }; return _extends.apply(this, arguments); }
function _slicedToArray(a, b) { return _arrayWithHoles(a) || _iterableToArrayLimit(a, b) || _unsupportedIterableToArray(a, b) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(a, b) { if (!a) return; if (typeof a === "string") return _arrayLikeToArray(a, b); var c = Object.prototype.toString.call(a).slice(8, -1); if (c === "Object" && a.constructor) c = a.constructor.name; if (c === "Map" || c === "Set") return Array.from(a); if (c === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)) return _arrayLikeToArray(a, b); }
function _arrayLikeToArray(a, b) { if (b == null || b > a.length) b = a.length; for (var c = 0, d = new Array(b); c < b; c++) d[c] = a[c]; return d; }
function _iterableToArrayLimit(b, c) { var d = null == b ? null : "undefined" != typeof Symbol && b[Symbol.iterator] || b["@@iterator"]; if (null != d) { var g, h, j, k, l = [], a = !0, m = !1; try { if (j = (d = d.call(b)).next, 0 === c) { if (Object(d) !== d) return; a = !1; } else for (; !(a = (g = j.call(d)).done) && (l.push(g.value), l.length !== c); a = !0); } catch (a) { m = !0, h = a; } finally { try { if (!a && null != d["return"] && (k = d["return"](), Object(k) !== k)) return; } finally { if (m) throw h; } } return l; } }
function _arrayWithHoles(a) { if (Array.isArray(a)) return a; }





var CustomPresetDeleteModal = function CustomPresetDeleteModal(a) {
  var b = a.title,
    c = a.editId,
    d = a.deleteNonce;
  var e = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    f = _slicedToArray(e, 2),
    g = f[0],
    h = f[1];
  var i = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context__WEBPACK_IMPORTED_MODULE_3__["default"]),
    j = i.setSavedPresets,
    k = i.showDeleteModal,
    l = i.setShowDeleteModal;
  var m = function getDefaultValues() {
    return {
      editId: c
    };
  };
  var n = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_4__.useForm)({
      defaultValues: m()
    }),
    o = n.control,
    p = n.handleSubmit;
  var q = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_4__.useFormState)({
      control: o
    }),
    r = q.errors;
  var s = function onSubmit(a) {
    h(true);
    var b = "".concat(ajaxurl); // eslint-disable-line no-undef
    var c = new FormData();
    c.append('action', 'wppic_delete_screenshot_preset');
    c.append('nonce', d);
    c.append('editId', a.editId);
    fetch(b, {
      method: 'POST',
      body: c,
      /* get return in json */
      headers: {
        Accept: 'application/json'
      }
    }).then(function (a) {
      return a.json();
    }).then(function (a) {
      var b = a.data.presets;
      j(b);
      h(false);
      l(false);
    })["catch"](function (a) {
      h(false);
    });
  };

  // Don't show modal unless explicitly set.
  if (!k) {
    return null;
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Modal, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Delete Preset', 'wp-plugin-info-card'),
    onRequestClose: function onRequestClose() {
      return l(false);
    },
    className: "has-preset-modal",
    shouldCloseOnClickOutside: false
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", {
    onSubmit: p(s)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_4__.Controller, {
    name: "editId",
    control: o,
    render: function render(a) {
      var b = a.field;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, _extends({
        type: "hidden"
      }, b));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    type: "submit",
    variant: "primary",
    className: "has-preset-modal-apply-button",
    disabled: g
  }, g ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Deleting…', 'wp-plugin-info-card') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Delete Preset', 'wp-plugin-info-card')), !g && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "secondary",
    onClick: function onClick() {
      l(false);
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Cancel', 'wp-plugin-info-card'))));
};
/* harmony default export */ __webpack_exports__["default"] = (CustomPresetDeleteModal);

/***/ }),

/***/ "./src/blocks/components/CustomPresets/CustomPresetEditModal.js":
/*!**********************************************************************!*\
  !*** ./src/blocks/components/CustomPresets/CustomPresetEditModal.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/alert-circle.js");
/* harmony import */ var _Notice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Notice */ "./src/blocks/components/Notice/index.js");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./context */ "./src/blocks/components/CustomPresets/context.js");
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (a) { for (var b = 1; b < arguments.length; b++) { var c = arguments[b]; for (var d in c) { if (Object.prototype.hasOwnProperty.call(c, d)) { a[d] = c[d]; } } } return a; }; return _extends.apply(this, arguments); }
function _slicedToArray(a, b) { return _arrayWithHoles(a) || _iterableToArrayLimit(a, b) || _unsupportedIterableToArray(a, b) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(a, b) { if (!a) return; if (typeof a === "string") return _arrayLikeToArray(a, b); var c = Object.prototype.toString.call(a).slice(8, -1); if (c === "Object" && a.constructor) c = a.constructor.name; if (c === "Map" || c === "Set") return Array.from(a); if (c === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)) return _arrayLikeToArray(a, b); }
function _arrayLikeToArray(a, b) { if (b == null || b > a.length) b = a.length; for (var c = 0, d = new Array(b); c < b; c++) d[c] = a[c]; return d; }
function _iterableToArrayLimit(b, c) { var d = null == b ? null : "undefined" != typeof Symbol && b[Symbol.iterator] || b["@@iterator"]; if (null != d) { var g, h, j, k, l = [], a = !0, m = !1; try { if (j = (d = d.call(b)).next, 0 === c) { if (Object(d) !== d) return; a = !1; } else for (; !(a = (g = j.call(d)).done) && (l.push(g.value), l.length !== c); a = !0); } catch (a) { m = !0, h = a; } finally { try { if (!a && null != d["return"] && (k = d["return"](), Object(k) !== k)) return; } finally { if (m) throw h; } } return l; } }
function _arrayWithHoles(a) { if (Array.isArray(a)) return a; }







var CustomPresetEditModal = function CustomPresetEditModal(a) {
  var b, c;
  var d = a.title,
    e = a.editId,
    f = a.saveNonce;
  var g = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    h = _slicedToArray(g, 2),
    i = h[0],
    j = h[1];
  var k = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context__WEBPACK_IMPORTED_MODULE_4__["default"]),
    l = k.setSavedPresets,
    m = k.showEditModal,
    n = k.setShowEditModal;
  var o = function getDefaultValues() {
    return {
      title: d,
      editId: e
    };
  };
  var p = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_5__.useForm)({
      defaultValues: o()
    }),
    q = p.control,
    r = p.handleSubmit;
  var s = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_5__.useFormState)({
      control: q
    }),
    t = s.errors;
  var u = function onSubmit(a) {
    j(true);
    var b = "".concat(ajaxurl); // eslint-disable-line no-undef
    var c = new FormData();
    c.append('action', 'has_save_preset');
    c.append('nonce', f);
    c.append('editId', a.editId);
    c.append('title', a.title);
    fetch(b, {
      method: 'POST',
      body: c,
      /* get return in json */
      headers: {
        Accept: 'application/json'
      }
    }).then(function (a) {
      return a.json();
    }).then(function (a) {
      var b = a.data.presets;
      l(b);
      j(false);
      n(false);
    })["catch"](function (a) {
      j(false);
    });
  };

  // Don't show modal unless explicitly set.
  if (!m) {
    return null;
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Modal, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Update Preset', 'wp-plugin-info-card'),
    onRequestClose: function onRequestClose() {
      return n(false);
    },
    className: "has-preset-modal",
    shouldCloseOnClickOutside: false
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", {
    onSubmit: r(u)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_5__.Controller, {
    name: "title",
    control: q,
    rules: {
      required: true,
      pattern: /^[a-zA-Z0-9-_ ]+$/
    },
    render: function render(a) {
      var b = a.field;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, _extends({}, b, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Preset Name', 'wp-plugin-info-card'),
        className: "is-required"
      }));
    }
  }), 'required' === ((b = t.title) === null || b === void 0 ? void 0 : b.type) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Notice__WEBPACK_IMPORTED_MODULE_3__["default"], {
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('This field is required.'),
    status: "error",
    politeness: "assertive",
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], null)
  }), 'pattern' === ((c = t.title) === null || c === void 0 ? void 0 : c.type) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Notice__WEBPACK_IMPORTED_MODULE_3__["default"], {
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('This field contains invalid characters.'),
    status: "error",
    politeness: "assertive",
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], null)
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_5__.Controller, {
    name: "editId",
    control: q,
    render: function render(a) {
      var b = a.field;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, _extends({
        type: "hidden"
      }, b));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    type: "submit",
    variant: "primary",
    className: "has-preset-modal-apply-button",
    disabled: i
  }, i ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Saving…', 'wp-plugin-info-card') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Apply Changes', 'wp-plugin-info-card')), !i && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "secondary",
    onClick: function onClick() {
      n(false);
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Cancel', 'wp-plugin-info-card'))));
};
/* harmony default export */ __webpack_exports__["default"] = (CustomPresetEditModal);

/***/ }),

/***/ "./src/blocks/components/CustomPresets/CustomPresetSaveModal.js":
/*!**********************************************************************!*\
  !*** ./src/blocks/components/CustomPresets/CustomPresetSaveModal.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/alert-circle.js");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./context */ "./src/blocks/components/CustomPresets/context.js");
/* harmony import */ var _Notice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Notice */ "./src/blocks/components/Notice/index.js");
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (a) { for (var b = 1; b < arguments.length; b++) { var c = arguments[b]; for (var d in c) { if (Object.prototype.hasOwnProperty.call(c, d)) { a[d] = c[d]; } } } return a; }; return _extends.apply(this, arguments); }
function _slicedToArray(a, b) { return _arrayWithHoles(a) || _iterableToArrayLimit(a, b) || _unsupportedIterableToArray(a, b) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(a, b) { if (!a) return; if (typeof a === "string") return _arrayLikeToArray(a, b); var c = Object.prototype.toString.call(a).slice(8, -1); if (c === "Object" && a.constructor) c = a.constructor.name; if (c === "Map" || c === "Set") return Array.from(a); if (c === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)) return _arrayLikeToArray(a, b); }
function _arrayLikeToArray(a, b) { if (b == null || b > a.length) b = a.length; for (var c = 0, d = new Array(b); c < b; c++) d[c] = a[c]; return d; }
function _iterableToArrayLimit(b, c) { var d = null == b ? null : "undefined" != typeof Symbol && b[Symbol.iterator] || b["@@iterator"]; if (null != d) { var g, h, j, k, l = [], a = !0, m = !1; try { if (j = (d = d.call(b)).next, 0 === c) { if (Object(d) !== d) return; a = !1; } else for (; !(a = (g = j.call(d)).done) && (l.push(g.value), l.length !== c); a = !0); } catch (a) { m = !0, h = a; } finally { try { if (!a && null != d["return"] && (k = d["return"](), Object(k) !== k)) return; } finally { if (m) throw h; } } return l; } }
function _arrayWithHoles(a) { if (Array.isArray(a)) return a; }







var CustomPresetSaveModal = function CustomPresetSaveModal(a) {
  var b, c, d;
  var e = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('new'),
    f = _slicedToArray(e, 2),
    g = f[0],
    h = f[1];
  var i = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    j = _slicedToArray(i, 2),
    k = j[0],
    l = j[1];
  var m = a.title,
    n = a.attributes,
    o = a.setAttributes,
    p = a.clientId;
  var q = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context__WEBPACK_IMPORTED_MODULE_3__["default"]),
    r = q.savedPresets,
    s = q.setSavedPresets,
    t = q.savingPreset,
    u = q.setSavingPreset;
  var v = function getDefaultValues() {
    var a, b, c, d, e, f, g, h, i, j, k, l, m, o, p, q, r;
    return {
      presetTitle: '',
      selectedPreset: null,
      colorBackground: (a = n.colorBackground) !== null && a !== void 0 ? a : 'transparent',
      colorText: (b = n.colorText) !== null && b !== void 0 ? b : 'transparent',
      colorBorder: (c = n.colorBorder) !== null && c !== void 0 ? c : 'transparent',
      colorMenu: (d = n.colorMenu) !== null && d !== void 0 ? d : 'transparent',
      colorMenuBorder: (e = n.colorMenuBorder) !== null && e !== void 0 ? e : 'transparent',
      colorMenuHover: (f = n.colorMenuHover) !== null && f !== void 0 ? f : 'transparent',
      colorMenuText: (g = n.colorMenuText) !== null && g !== void 0 ? g : 'transparent',
      colorMenuTextHover: (h = n.colorMenuTextHover) !== null && h !== void 0 ? h : 'transparent',
      colorScreenshotsBackground: (i = n.colorScreenshotsBackground) !== null && i !== void 0 ? i : 'transparent',
      colorScreenshotsBorder: (j = n.colorScreenshotsBorder) !== null && j !== void 0 ? j : 'transparent',
      colorStar: (k = n.colorStar) !== null && k !== void 0 ? k : 'transparent',
      colorMetaBackground: (l = n.colorMetaBackground) !== null && l !== void 0 ? l : 'transparent',
      colorMetaText: (m = n.colorMetaText) !== null && m !== void 0 ? m : 'transparent',
      colorScreenshotsArrowBackground: (o = n.colorScreenshotsArrowBackground) !== null && o !== void 0 ? o : 'transparent',
      colorScreenshotsArrowBackgroundHover: (p = n.colorScreenshotsArrowBackgroundHover) !== null && p !== void 0 ? p : 'transparent',
      colorScreenshotsArrow: (q = n.colorScreenshotsArrow) !== null && q !== void 0 ? q : 'transparent',
      colorScreenshotsArrowHover: (r = n.colorScreenshotsArrowHover) !== null && r !== void 0 ? r : 'transparent'
    };
  };
  var w = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_5__.useForm)({
      defaultValues: v()
    }),
    x = w.control,
    y = w.handleSubmit,
    z = w.setValue;
  var A = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_5__.useFormState)({
      control: x
    }),
    B = A.errors;
  var C = function onSubmit(a) {
    if ('new' === g) {
      D(a);
    } else {
      E(a);
    }
  };

  /**
   * Save a new preset via Ajax.
   *
   * @param {Array} formData Form data array.
   */
  var D = function saveNewPreset(a) {
    l(true);
    var b = "".concat(ajaxurl); // eslint-disable-line no-undef
    var c = new FormData();
    c.append('action', 'wppic_save_screenshot_presets');
    c.append('nonce', wppic.screenshot_preset_save_nonce);
    c.append('formData', JSON.stringify(a));
    fetch(b, {
      method: 'POST',
      body: c,
      /* get return in json */
      headers: {
        Accept: 'application/json'
      }
    }).then(function (a) {
      return a.json();
    }).then(function (a) {
      var b = a.data.presets;
      l(false);
      u(false);
      s(b);
    })["catch"](function (a) {
      u(false);
    });
  };

  /**
   * Save a new preset via Ajax.
   *
   * @param {Array} formData Form data array.
   */
  var E = function overridePreset(a) {
    l(true);
    var b = "".concat(ajaxurl); // eslint-disable-line no-undef
    var c = new FormData();
    c.append('action', 'has_override_preset');
    c.append('nonce', has_gutenberg.blockPresetsNonceSave);
    c.append('attributes', JSON.stringify(n));
    c.append('editId', a.selectedPreset);
    fetch(b, {
      method: 'POST',
      body: c,
      /* get return in json */
      headers: {
        Accept: 'application/json'
      }
    }).then(function (a) {
      return a.json();
    }).then(function (a) {
      var b = a.data.presets;
      l(false);
      u(false);
      s(b);
    })["catch"](function (a) {
      u(false);
    });
  };

  /**
   * Get the preset options in radio group format.
   *
   * @return {Array} Array of objects with label and value properties.
   */
  var F = function getPresetRadioOptions() {
    var a = [];
    r.forEach(function (b) {
      a.push({
        label: b.title,
        value: b.id + ''
      });
    });
    return a;
  };
  var G = [{
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Save Preset', 'wp-plugin-info-card'),
    value: 'new'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Override Preset', 'wp-plugin-info-card'),
    value: 'override'
  }];
  if (r.length === 0) {
    G = [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Save Preset', 'wp-plugin-info-card'),
      value: 'new'
    }];
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-custom-preset-modal"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Modal, {
    title: m,
    onRequestClose: function onRequestClose() {
      return u(false);
    },
    className: "has-preset-modal",
    shouldCloseOnClickOutside: false
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RadioControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Save a new preset or override an existing one.', 'wp-plugin-info-card'),
    className: "has-preset-modal-radio-control",
    selected: g,
    options: G,
    onChange: function onChange(a) {
      h(a);
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", {
    onSubmit: y(C)
  }, 'new' === g && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-preset-modal-new-preset"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_5__.Controller, {
    name: "presetTitle",
    control: x,
    rules: {
      required: true,
      pattern: /^[a-zA-Z0-9-_ ]+$/
    },
    render: function render(a) {
      var b = a.field;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, _extends({}, b, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Preset Name', 'wp-plugin-info-card'),
        className: "is-required"
      }));
    }
  }), 'required' === ((b = B.presetTitle) === null || b === void 0 ? void 0 : b.type) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Notice__WEBPACK_IMPORTED_MODULE_4__["default"], {
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('This field is required.'),
    status: "error",
    politeness: "assertive",
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], null)
  }), 'pattern' === ((c = B.presetTitle) === null || c === void 0 ? void 0 : c.type) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Notice__WEBPACK_IMPORTED_MODULE_4__["default"], {
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('This field contains invalid characters.'),
    status: "error",
    politeness: "assertive",
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], null)
  }))), 'override' === g && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, r.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-preset-modal-override-preset"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_5__.Controller, {
    name: "selectedPreset",
    control: x,
    rules: {
      required: true
    },
    render: function render(a) {
      var b = a.field,
        c = b.onChange,
        d = b.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RadioControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select a preset to override', 'wp-plugin-info-card'),
        className: "is-required",
        selected: d,
        options: F(),
        onChange: function onChange(a) {
          return c(a);
        }
      });
    }
  }), 'required' === ((d = B.selectedPreset) === null || d === void 0 ? void 0 : d.type) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Notice__WEBPACK_IMPORTED_MODULE_4__["default"], {
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('This field is required.'),
    status: "error",
    politeness: "assertive",
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], null)
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-preset-modal-button-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    type: "submit",
    variant: "primary",
    className: "has-preset-modal-apply-button",
    disabled: k
  }, k ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Saving…', 'wp-plugin-info-card') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Save Preset', 'wp-plugin-info-card')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "secondary",
    onClick: function onClick() {
      u(false);
    },
    className: "has-preset-modal-cancel-button",
    disabled: k
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Cancel', 'wp-plugin-info-card'))))));
};
/* harmony default export */ __webpack_exports__["default"] = (CustomPresetSaveModal);

/***/ }),

/***/ "./src/blocks/components/CustomPresets/PresetButtonEdit.js":
/*!*****************************************************************!*\
  !*** ./src/blocks/components/CustomPresets/PresetButtonEdit.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _PresetButton_PresetButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../PresetButton/PresetButton */ "./src/blocks/components/PresetButton/PresetButton.js");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./context */ "./src/blocks/components/CustomPresets/context.js");
function _typeof(a) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (a) { return typeof a; } : function (a) { return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a; }, _typeof(a); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (a) { for (var b = 1; b < arguments.length; b++) { var c = arguments[b]; for (var d in c) { if (Object.prototype.hasOwnProperty.call(c, d)) { a[d] = c[d]; } } } return a; }; return _extends.apply(this, arguments); }
function ownKeys(a, b) { var c = Object.keys(a); if (Object.getOwnPropertySymbols) { var d = Object.getOwnPropertySymbols(a); b && (d = d.filter(function (b) { return Object.getOwnPropertyDescriptor(a, b).enumerable; })), c.push.apply(c, d); } return c; }
function _objectSpread(a) { for (var b = 1; b < arguments.length; b++) { var c = null != arguments[b] ? arguments[b] : {}; b % 2 ? ownKeys(Object(c), !0).forEach(function (b) { _defineProperty(a, b, c[b]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(c)) : ownKeys(Object(c)).forEach(function (b) { Object.defineProperty(a, b, Object.getOwnPropertyDescriptor(c, b)); }); } return a; }
function _defineProperty(a, b, c) { b = _toPropertyKey(b); if (b in a) { Object.defineProperty(a, b, { value: c, enumerable: true, configurable: true, writable: true }); } else { a[b] = c; } return a; }
function _toPropertyKey(a) { var b = _toPrimitive(a, "string"); return (typeof b === "undefined" ? "undefined" : _typeof(b)) === "symbol" ? b : String(b); }
function _toPrimitive(a, b) { if (_typeof(a) !== "object" || a === null) return a; var c = a[Symbol.toPrimitive]; if (c !== undefined) { var d = c.call(a, b || "default"); if (_typeof(d) !== "object") return d; throw new TypeError("@@toPrimitive must return a primitive value."); } return (b === "string" ? String : Number)(a); }






var PresetButtonEdit = function PresetButtonEdit(a) {
  var b = a.title,
    c = a.slug,
    d = a.setAttributes,
    e = a.attributes,
    f = a.uniqueId,
    g = a.editId,
    h = a.clientId,
    i = a.saveNonce,
    j = a.deleteNonce,
    k = a.theme,
    l = a.customFormData,
    m = l === void 0 ? {} : l;
  var n = _objectSpread({}, e);
  var o = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context__WEBPACK_IMPORTED_MODULE_5__["default"]),
    p = o.editPresets,
    q = o.setShowEditModal,
    r = o.setShowDeleteModal;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('has-preset-edit-container', {
      'has-preset-edit-container--edit': p
    })
  }, p && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-preset-edit-buttons"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: 'secondary',
    onClick: function onClick(a) {
      q({
        show: true,
        editId: g,
        title: b,
        saveNonce: i
      });
    },
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Edit Preset', 'wp-plugin-info-card'),
    icon: "edit",
    className: "has-preset-edit-button"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: 'secondary',
    onClick: function onClick(a) {
      r({
        show: true,
        editId: g,
        deleteNonce: j
      });
    },
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Delete Preset', 'wp-plugin-info-card'),
    icon: "trash",
    className: "has-preset-delete-button"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_PresetButton_PresetButton__WEBPACK_IMPORTED_MODULE_4__["default"], _extends({
    key: g,
    label: '' === b ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Untitled Preset', 'wp-plugin-info-card') : b,
    setAttributes: d,
    uniqueId: f,
    className: "has-preset-button",
    clientId: h,
    attributes: n,
    disabled: p,
    theme: k,
    customFormData: m !== null && m !== void 0 ? m : {}
  }, a))));
};
/* harmony default export */ __webpack_exports__["default"] = (PresetButtonEdit);

/***/ }),

/***/ "./src/blocks/components/CustomPresets/context.js":
/*!********************************************************!*\
  !*** ./src/blocks/components/CustomPresets/context.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var CustomPresetsContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createContext();
/* harmony default export */ __webpack_exports__["default"] = (CustomPresetsContext);

/***/ }),

/***/ "./src/blocks/components/CustomPresets/index.js":
/*!******************************************************!*\
  !*** ./src/blocks/components/CustomPresets/index.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./context */ "./src/blocks/components/CustomPresets/context.js");
/* harmony import */ var _CustomPresetContainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CustomPresetContainer */ "./src/blocks/components/CustomPresets/CustomPresetContainer.js");
function _slicedToArray(a, b) { return _arrayWithHoles(a) || _iterableToArrayLimit(a, b) || _unsupportedIterableToArray(a, b) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(a, b) { if (!a) return; if (typeof a === "string") return _arrayLikeToArray(a, b); var c = Object.prototype.toString.call(a).slice(8, -1); if (c === "Object" && a.constructor) c = a.constructor.name; if (c === "Map" || c === "Set") return Array.from(a); if (c === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)) return _arrayLikeToArray(a, b); }
function _arrayLikeToArray(a, b) { if (b == null || b > a.length) b = a.length; for (var c = 0, d = new Array(b); c < b; c++) d[c] = a[c]; return d; }
function _iterableToArrayLimit(b, c) { var d = null == b ? null : "undefined" != typeof Symbol && b[Symbol.iterator] || b["@@iterator"]; if (null != d) { var g, h, j, k, l = [], a = !0, m = !1; try { if (j = (d = d.call(b)).next, 0 === c) { if (Object(d) !== d) return; a = !1; } else for (; !(a = (g = j.call(d)).done) && (l.push(g.value), l.length !== c); a = !0); } catch (a) { m = !0, h = a; } finally { try { if (!a && null != d["return"] && (k = d["return"](), Object(k) !== k)) return; } finally { if (m) throw h; } } return l; } }
function _arrayWithHoles(a) { if (Array.isArray(a)) return a; }



var CustomPresets = function CustomPresets(a) {
  var b = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    c = _slicedToArray(b, 2),
    d = c[0],
    e = c[1];
  var f = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    g = _slicedToArray(f, 2),
    h = g[0],
    i = g[1];
  var j = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    k = _slicedToArray(j, 2),
    l = k[0],
    m = k[1];
  var n = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    o = _slicedToArray(n, 2),
    p = o[0],
    q = o[1];
  var r = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    s = _slicedToArray(r, 2),
    t = s[0],
    u = s[1];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_context__WEBPACK_IMPORTED_MODULE_1__["default"].Provider, {
    value: {
      savedPresets: d,
      setSavedPresets: e,
      savingPreset: h,
      setSavingPreset: i,
      editPresets: l,
      setEditPresets: m,
      showEditModal: p,
      setShowEditModal: q,
      showDeleteModal: t,
      setShowDeleteModal: u
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_CustomPresetContainer__WEBPACK_IMPORTED_MODULE_2__["default"], a));
};
/* harmony default export */ __webpack_exports__["default"] = (CustomPresets);

/***/ }),

/***/ "./src/blocks/components/GearIcon.js":
/*!*******************************************!*\
  !*** ./src/blocks/components/GearIcon.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
 // ES6

var GearIcon = function GearIcon(a) {
  return /*#__PURE__*/React.createElement("svg", {
    height: a.height,
    width: a.width,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512"
  }, /*#__PURE__*/React.createElement("path", {
    fill: a.fill,
    d: "M256 140c-63.962 0-116 52.038-116 116s52.038 116 116 116 116-52.038 116-116-52.038-116-116-116zm-60.25 59.875h86.635l-4.578-5.045c-5.566-6.135-5.106-15.622 1.029-21.188 6.136-5.567 15.621-5.106 21.188 1.029l27.333 30.125c5.188 5.718 5.188 14.441 0 20.159l-27.333 30.125a14.958 14.958 0 0 1-11.113 4.92 14.945 14.945 0 0 1-10.075-3.891c-6.135-5.567-6.596-15.053-1.029-21.188l4.578-5.045H195.75c-8.284 0-15-6.716-15-15s6.716-15.001 15-15.001zm120.5 112.25h-86.635l4.578 5.045c5.566 6.135 5.106 15.622-1.029 21.188a14.948 14.948 0 0 1-10.075 3.891 14.964 14.964 0 0 1-11.113-4.92l-27.333-30.125c-5.188-5.718-5.188-14.441 0-20.159l27.333-30.125c5.567-6.135 15.054-6.596 21.188-1.029 6.135 5.567 6.596 15.053 1.029 21.188l-4.578 5.045h86.635c8.284 0 15 6.716 15 15s-6.716 15.001-15 15.001z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: a.fill,
    d: "M497 199.92h-33.479a212.647 212.647 0 0 0-21.142-50.991l23.688-23.688c5.858-5.858 5.858-15.355 0-21.213l-58.095-58.095c-5.857-5.858-15.355-5.858-21.213 0L363.07 69.621a212.647 212.647 0 0 0-50.991-21.142V15c0-8.284-6.716-15-15-15H214.92c-8.284 0-15 6.716-15 15v33.479a212.664 212.664 0 0 0-50.991 21.142l-23.688-23.688c-5.857-5.858-15.355-5.858-21.213 0l-58.095 58.095c-5.858 5.858-5.858 15.355 0 21.213l23.688 23.688a212.647 212.647 0 0 0-21.142 50.991H15c-8.284 0-15 6.716-15 15v82.159c0 8.284 6.716 15 15 15h33.479a212.664 212.664 0 0 0 21.142 50.991l-23.688 23.688c-5.858 5.858-5.858 15.355 0 21.213l58.095 58.095c5.857 5.858 15.355 5.858 21.213 0l23.688-23.688a212.633 212.633 0 0 0 50.991 21.143V497c0 8.284 6.716 15 15 15h82.159c8.284 0 15-6.716 15-15v-33.479a212.568 212.568 0 0 0 50.991-21.143l23.688 23.688c5.857 5.858 15.355 5.858 21.213 0l58.095-58.095c5.858-5.858 5.858-15.355 0-21.213l-23.688-23.688a212.647 212.647 0 0 0 21.142-50.991H497c8.284 0 15-6.716 15-15V214.92c0-8.284-6.716-15-15-15zM256 402c-80.505 0-146-65.495-146-146s65.495-146 146-146 146 65.495 146 146-65.495 146-146 146z"
  }));
};
GearIcon.defaultProps = {
  width: 24,
  height: 24,
  fill: '#333333'
};
GearIcon.propTypes = {
  width: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().number),
  height: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().number),
  fill: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string)
};
/* harmony default export */ __webpack_exports__["default"] = (GearIcon);

/***/ }),

/***/ "./src/blocks/components/GridIcon.js":
/*!*******************************************!*\
  !*** ./src/blocks/components/GridIcon.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
 // ES6

var GridIcon = function GridIcon(a) {
  return /*#__PURE__*/React.createElement("svg", {
    height: a.width,
    viewBox: "0 0 122.88 122.88",
    width: a.height,
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    fill: a.fill,
    d: "M0 0v122.88h122.88V0zm115.2 38.4H84.479V7.68H115.2zM46.08 76.8V46.08H76.8V76.8zm30.72 7.68v30.72H46.08V84.48zM38.4 76.8H7.68V46.08H38.4zm7.68-38.4V7.68H76.8V38.4zm38.399 7.68H115.2V76.8H84.479zM38.4 7.68V38.4H7.68V7.68zM7.68 84.48H38.4v30.72H7.68zm76.799 30.72V84.48H115.2v30.72z"
  }));
};
GridIcon.defaultProps = {
  width: 24,
  height: 24,
  fill: '#333333'
};
GridIcon.propTypes = {
  width: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().number),
  height: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().number),
  fill: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string)
};
/* harmony default export */ __webpack_exports__["default"] = (GridIcon);

/***/ }),

/***/ "./src/blocks/components/InfoCardIcon.js":
/*!***********************************************!*\
  !*** ./src/blocks/components/InfoCardIcon.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
 // ES6

var InfoCardIcon = function InfoCardIcon(a) {
  return /*#__PURE__*/React.createElement("svg", {
    version: "1.1",
    id: "Calque_1",
    xmlns: "http://www.w3.org/2000/svg",
    x: "0px",
    y: "0px",
    width: a.width,
    height: a.height,
    viewBox: "0 0 850.39 850.39",
    enableBackground: "new 0 0 850.39 850.39"
  }, /*#__PURE__*/React.createElement("path", {
    fill: a.fill,
    d: "M425.195,2C190.366,2,0,191.918,0,426.195C0,660.472,190.366,850.39,425.195,850.39\nc234.828,0,425.195-189.918,425.195-424.195C850.39,191.918,660.023,2,425.195,2z M662.409,476.302l-2.624,4.533L559.296,654.451\nl78.654,45.525l-228.108,105.9L388.046,555.33l78.653,45.523l69.391-119.887l-239.354-0.303l-94.925-0.337l-28.75-0.032l-0.041-0.07\nh0l-24.361-42.303l28.111-48.563l109.635-189.419l-78.653-45.524L435.859,48.514l21.797,250.546l-78.654-45.525l-69.391,119.887\nl239.353,0.303l123.676,0.37l16.571,28.772l7.831,13.596L662.409,476.302z"
  }));
};
InfoCardIcon.defaultProps = {
  width: 24,
  height: 24,
  fill: '#DB3939'
};
InfoCardIcon.propTypes = {
  width: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().number),
  height: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().number),
  fill: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string)
};
/* harmony default export */ __webpack_exports__["default"] = (InfoCardIcon);

/***/ }),

/***/ "./src/blocks/components/Loading.js":
/*!******************************************!*\
  !*** ./src/blocks/components/Loading.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-spinners */ "./node_modules/react-spinners/esm/BarLoader.js");
/* harmony import */ var _Logo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Logo */ "./src/blocks/Logo.js");



var Spinner = wp.components.Spinner;
var LoadingScreen = function LoadingScreen(a) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "wppic-loading-placeholder"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "wppic-loading"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Logo__WEBPACK_IMPORTED_MODULE_1__["default"], {
    size: "45"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, a.label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "wppic-spinner"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_spinners__WEBPACK_IMPORTED_MODULE_2__["default"], {
    color: '#DB3939',
    speedMultiplier: 1
  })))));
};
/* harmony default export */ __webpack_exports__["default"] = (LoadingScreen);

/***/ }),

/***/ "./src/blocks/components/LoadingImageProgress.js":
/*!*******************************************************!*\
  !*** ./src/blocks/components/LoadingImageProgress.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Logo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Logo */ "./src/blocks/Logo.js");


var LoadingImageProgressScreen = function LoadingImageProgressScreen(a) {
  var b = a.totalImageCount,
    c = a.currentCount,
    d = a.label;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "wppic-loading-placeholder"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "wppic-loading"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Logo__WEBPACK_IMPORTED_MODULE_1__["default"], {
    size: "45"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, d), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "progress-bar-wrapper",
    style: {
      width: '100%'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "progress-bar",
    style: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      height: '8px',
      background: '#DDDDDD',
      borderRadius: '10px',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "progress-bar-inner",
    style: {
      borderRadius: '10px',
      display: 'block',
      height: '4px',
      background: '#44873F',
      transition: "width 0.5s ease-in-out",
      width: "".concat(c / b * 100, "%")
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "progress-bar-label",
    style: {
      textAlign: 'center',
      marginTop: '15px'
    }
  }, c, " / ", b)))));
};
/* harmony default export */ __webpack_exports__["default"] = (LoadingImageProgressScreen);

/***/ }),

/***/ "./src/blocks/components/Notice/index.js":
/*!***********************************************!*\
  !*** ./src/blocks/components/Notice/index.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_a11y__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/a11y */ "@wordpress/a11y");
/* harmony import */ var _wordpress_a11y__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_a11y__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
function _typeof(a) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (a) { return typeof a; } : function (a) { return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a; }, _typeof(a); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (a) { for (var b = 1; b < arguments.length; b++) { var c = arguments[b]; for (var d in c) { if (Object.prototype.hasOwnProperty.call(c, d)) { a[d] = c[d]; } } } return a; }; return _extends.apply(this, arguments); }
function _defineProperty(a, b, c) { b = _toPropertyKey(b); if (b in a) { Object.defineProperty(a, b, { value: c, enumerable: true, configurable: true, writable: true }); } else { a[b] = c; } return a; }
function _toPropertyKey(a) { var b = _toPrimitive(a, "string"); return (typeof b === "undefined" ? "undefined" : _typeof(b)) === "symbol" ? b : String(b); }
function _toPrimitive(a, b) { if (_typeof(a) !== "object" || a === null) return a; var c = a[Symbol.toPrimitive]; if (c !== undefined) { var d = c.call(a, b || "default"); if (_typeof(d) !== "object") return d; throw new TypeError("@@toPrimitive must return a primitive value."); } return (b === "string" ? String : Number)(a); }
// eslint-disable-next-line no-unused-vars

 // ES6




var Notice = function Notice(a) {
  var b;
  var c = a.message,
    d = a.status,
    e = a.politeness,
    f = a.icon,
    g = a.className,
    h = a.inline,
    i = a.children,
    j = a.hasToTop,
    k = j === void 0 ? false : j;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    (0,_wordpress_a11y__WEBPACK_IMPORTED_MODULE_1__.speak)(c, e);
  }, [c, d, e]);
  var l = function hasIcon() {
    return f !== null;
  };
  var m = function getIcon(a) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(a, {
      width: 16,
      height: 16,
      fill: "#6c757d"
    });
  };
  var n = classnames__WEBPACK_IMPORTED_MODULE_4___default()(g, 'ajaxify-admin__notice', (b = {
    'ajaxify-admin__notice--has-icon': l()
  }, _defineProperty(b, "ajaxify-admin__notice-type--".concat(d), true), _defineProperty(b, "ajaxify-admin__notice-appearance--inline", h), _defineProperty(b, "ajaxify-admin__notice-appearance--block", !h), b));
  var o = [{
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Back to Top', 'wp-ajaxify-comments'),
    url: '#ajaxify-admin-header',
    variant: 'link',
    className: 'ajaxify-admin__notice-action ajaxify-admin__notice-action--to-top'
  }];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: n
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Notice, _extends({
    isDismissible: false,
    spokenMessage: c,
    actions: k ? o : []
  }, a), l() && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "ajaxify-admin__notice-icon"
  }, m(f)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "ajaxify-admin__notice-message"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, c, " ", i, " "))));
};
Notice.defaultProps = {
  message: '',
  status: 'info',
  politeness: 'polite',
  icon: null,
  className: '',
  inline: false,
  hasToTop: false
};
Notice.propTypes = {
  message: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().string).isRequired,
  status: prop_types__WEBPACK_IMPORTED_MODULE_5___default().oneOf(['info', 'warning', 'success', 'error']),
  politeness: prop_types__WEBPACK_IMPORTED_MODULE_5___default().oneOf(['assertive', 'polite']),
  icon: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().func),
  className: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().string),
  inline: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().bool),
  hasToTop: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().bool)
};
/* harmony default export */ __webpack_exports__["default"] = (Notice);

/***/ }),

/***/ "./src/blocks/components/Numbers.js":
/*!******************************************!*\
  !*** ./src/blocks/components/Numbers.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SwitchIcon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SwitchIcon */ "./src/blocks/components/SwitchIcon.js");
function _slicedToArray(a, b) { return _arrayWithHoles(a) || _iterableToArrayLimit(a, b) || _unsupportedIterableToArray(a, b) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(a, b) { if (!a) return; if (typeof a === "string") return _arrayLikeToArray(a, b); var c = Object.prototype.toString.call(a).slice(8, -1); if (c === "Object" && a.constructor) c = a.constructor.name; if (c === "Map" || c === "Set") return Array.from(a); if (c === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)) return _arrayLikeToArray(a, b); }
function _arrayLikeToArray(a, b) { if (b == null || b > a.length) b = a.length; for (var c = 0, d = new Array(b); c < b; c++) d[c] = a[c]; return d; }
function _iterableToArrayLimit(b, c) { var d = null == b ? null : "undefined" != typeof Symbol && b[Symbol.iterator] || b["@@iterator"]; if (null != d) { var g, h, j, k, l = [], a = !0, m = !1; try { if (j = (d = d.call(b)).next, 0 === c) { if (Object(d) !== d) return; a = !1; } else for (; !(a = (g = j.call(d)).done) && (l.push(g.value), l.length !== c); a = !0); } catch (a) { m = !0, h = a; } finally { try { if (!a && null != d["return"] && (k = d["return"](), Object(k) !== k)) return; } finally { if (m) throw h; } } return l; } }
function _arrayWithHoles(a) { if (Array.isArray(a)) return a; }
/**
 * Number Component.
 */

var _wp$i18n = wp.i18n,
  __ = _wp$i18n.__,
  sprintf = _wp$i18n.sprintf,
  _x = _wp$i18n._x;
var _wp$element = wp.element,
  useState = _wp$element.useState,
  useEffect = _wp$element.useEffect;
var _wp$components = wp.components,
  ButtonGroup = _wp$components.ButtonGroup,
  Button = _wp$components.Button,
  Tooltip = _wp$components.Tooltip,
  BaseControl = _wp$components.BaseControl,
  TextControl = _wp$components.TextControl;

var NumbersComponent = function NumbersComponent(a) {
  var b = useState(false),
    c = _slicedToArray(b, 2),
    d = c[0],
    e = c[1];
  var f = a.label,
    g = a.value,
    h = a.onClick,
    i = a.numbers,
    j = a.id;
  useEffect(function () {
    if (!i.includes(g)) {
      e(true);
    } else {
      e(false);
    }
  }, []);
  return /*#__PURE__*/React.createElement(BaseControl, {
    className: "wppic-numbers-component",
    label: f,
    id: j
  }, /*#__PURE__*/React.createElement("div", {
    className: "wppic-numbers-component-buttons"
  }, !d && /*#__PURE__*/React.createElement(ButtonGroup, {
    className: "wppic-numbers-component-buttons__numbers cols-".concat(i.length)
  }, i.map(function (a) {
    var b = a;
    return /*#__PURE__*/React.createElement(Tooltip, {
      text: sprintf( /* translators: Unit type (px, em, %) */
      __('%spx Gap', 'wp-plugin-info-card'), b),
      key: b
    }, /*#__PURE__*/React.createElement(Button, {
      key: b,
      className: 'components-wppic-control-button__number',
      isPrimary: g === a,
      "aria-pressed": g === a,
      onClick: function onClick() {
        return h(a);
      },
      text: b
    }));
  }), /*#__PURE__*/React.createElement(Tooltip, {
    text: __('Custom', 'wp-plugin-info-card')
  }, /*#__PURE__*/React.createElement(Button, {
    className: 'components-wppic-control-button__number',
    isPrimary: d,
    "aria-pressed": d,
    onClick: function onClick() {
      return e(!d);
    },
    label: __('Custom', 'wp-plugin-info-card'),
    icon: _SwitchIcon__WEBPACK_IMPORTED_MODULE_0__["default"]
  }))), d && /*#__PURE__*/React.createElement(ButtonGroup, {
    className: "wppic-numbers-component-buttons__custom"
  }, /*#__PURE__*/React.createElement(TextControl, {
    type: "number",
    value: g,
    onChange: function onChange(a) {
      return h(a);
    },
    "aria-label": __('Enter a custom value', 'wp-plugin-info-card')
  }), /*#__PURE__*/React.createElement(Tooltip, {
    text: __('View Presets', 'wp-plugin-info-card')
  }, /*#__PURE__*/React.createElement(Button, {
    className: 'components-wppic-control-button__number',
    isPrimary: d,
    "aria-pressed": d,
    onClick: function onClick() {
      return e(!d);
    },
    label: __('Custom', 'wp-plugin-info-card'),
    icon: _SwitchIcon__WEBPACK_IMPORTED_MODULE_0__["default"]
  })))));
};
/* harmony default export */ __webpack_exports__["default"] = (NumbersComponent);

/***/ }),

/***/ "./src/blocks/components/PicIcon.js":
/*!******************************************!*\
  !*** ./src/blocks/components/PicIcon.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Fragment = wp.element.Fragment;
var PicIcon = function PicIcon(a) {
  var b = a.defaultIcon;
  if (a.image) {
    b = a.image;
  } else if (a.data.icons.svg) {
    b = a.data.icons.svg;
  } else if (a.data.icons['2x']) {
    b = a.data.icons['2x'];
  } else if (a.data.icons['1x']) {
    b = a.data.icons['1x'];
  }
  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("img", {
    src: b,
    className: "wp-pic-plugin-icon",
    alt: a.data.name
  }));
};
PicIcon.defaultProps = {
  name: '',
  image: false
};
/* harmony default export */ __webpack_exports__["default"] = (PicIcon);

/***/ }),

/***/ "./src/blocks/components/PresetButton/PresetButton.js":
/*!************************************************************!*\
  !*** ./src/blocks/components/PresetButton/PresetButton.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor.scss */ "./src/blocks/components/PresetButton/editor.scss");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _templates_PluginScreenshots__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../templates/PluginScreenshots */ "./src/blocks/templates/PluginScreenshots.js");
/* harmony import */ var _BlockPreview__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../BlockPreview */ "./src/blocks/components/BlockPreview.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (a) { for (var b = 1; b < arguments.length; b++) { var c = arguments[b]; for (var d in c) { if (Object.prototype.hasOwnProperty.call(c, d)) { a[d] = c[d]; } } } return a; }; return _extends.apply(this, arguments); }
function ownKeys(a, b) { var c = Object.keys(a); if (Object.getOwnPropertySymbols) { var d = Object.getOwnPropertySymbols(a); b && (d = d.filter(function (b) { return Object.getOwnPropertyDescriptor(a, b).enumerable; })), c.push.apply(c, d); } return c; }
function _objectSpread(a) { for (var b = 1; b < arguments.length; b++) { var c = null != arguments[b] ? arguments[b] : {}; b % 2 ? ownKeys(Object(c), !0).forEach(function (b) { _defineProperty(a, b, c[b]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(c)) : ownKeys(Object(c)).forEach(function (b) { Object.defineProperty(a, b, Object.getOwnPropertyDescriptor(c, b)); }); } return a; }
function _defineProperty(a, b, c) { b = _toPropertyKey(b); if (b in a) { Object.defineProperty(a, b, { value: c, enumerable: true, configurable: true, writable: true }); } else { a[b] = c; } return a; }
function _toPropertyKey(a) { var b = _toPrimitive(a, "string"); return (typeof b === "undefined" ? "undefined" : _typeof(b)) === "symbol" ? b : String(b); }
function _toPrimitive(a, b) { if ((typeof a === "undefined" ? "undefined" : _typeof(a)) !== "object" || a === null) return a; var c = a[Symbol.toPrimitive]; if (c !== undefined) { var d = c.call(a, b || "default"); if ((typeof d === "undefined" ? "undefined" : _typeof(d)) !== "object") return d; throw new TypeError("@@toPrimitive must return a primitive value."); } return (b === "string" ? String : Number)(a); }
function _slicedToArray(a, b) { return _arrayWithHoles(a) || _iterableToArrayLimit(a, b) || _unsupportedIterableToArray(a, b) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(a, b) { if (!a) return; if (typeof a === "string") return _arrayLikeToArray(a, b); var c = Object.prototype.toString.call(a).slice(8, -1); if (c === "Object" && a.constructor) c = a.constructor.name; if (c === "Map" || c === "Set") return Array.from(a); if (c === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)) return _arrayLikeToArray(a, b); }
function _arrayLikeToArray(a, b) { if (b == null || b > a.length) b = a.length; for (var c = 0, d = new Array(b); c < b; c++) d[c] = a[c]; return d; }
function _iterableToArrayLimit(b, c) { var d = null == b ? null : "undefined" != typeof Symbol && b[Symbol.iterator] || b["@@iterator"]; if (null != d) { var g, h, j, k, l = [], a = !0, m = !1; try { if (j = (d = d.call(b)).next, 0 === c) { if (Object(d) !== d) return; a = !1; } else for (; !(a = (g = j.call(d)).done) && (l.push(g.value), l.length !== c); a = !0); } catch (a) { m = !0, h = a; } finally { try { if (!a && null != d["return"] && (k = d["return"](), Object(k) !== k)) return; } finally { if (m) throw h; } } return l; } }
function _arrayWithHoles(a) { if (Array.isArray(a)) return a; }







var PresetButton = function PresetButton(a) {
  var b;
  var c = a.setAttributes,
    d = a.label,
    f = a.attributes,
    g = a.uniqueId,
    h = a.theme,
    i = a.customFormData,
    j = i === void 0 ? {} : i,
    k = a.isPresssed,
    l = k === void 0 ? false : k;

  // Define state for the popover visibility
  var m = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    n = _slicedToArray(m, 2),
    o = n[0],
    p = n[1];
  var q = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(),
    r = _slicedToArray(q, 2),
    s = r[0],
    t = r[1];

  // Define state for modal options.
  var u = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    v = _slicedToArray(u, 2),
    w = v[0],
    x = v[1];
  var y = function handlePopoverOpen() {
    p(true);
  };
  var z = function handlePopoverClose() {
    p(false);
  };
  var A = function popoverContent() {
    var a = _objectSpread({}, f.formData);
    var b = _objectSpread(_objectSpread({}, f), a);
    b.enableScreenshots = false;
    b.colorTheme = h;
    b.uniqueId = "".concat(g, "-preview");
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
      className: "wppic-screenshot-popover-wrapper"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_templates_PluginScreenshots__WEBPACK_IMPORTED_MODULE_4__["default"], {
      assetData: f.assetData,
      attributes: b,
      isPreview: true
    }));
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, _extends({
    variant: 'secondary',
    onClick: function onClick(a) {
      a.preventDefault();
      var b = _objectSpread(_objectSpread(_objectSpread({}, f), j), {
        uniqueId: g,
        colorTheme: h
      });
      c(b);
    },
    className: "wppic-preset-button",
    onMouseEnter: function onMouseEnter() {
      return y(true);
    },
    onMouseLeave: function onMouseLeave() {
      return z(false);
    },
    label: d,
    ref: t,
    disabled: (b = a.disabled) !== null && b !== void 0 ? b : false
  }, a), d), w && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Modal, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Apply Preset?', 'wp-plugin-info-card'),
    onRequestClose: function onRequestClose() {
      return x(false);
    },
    className: "wppic-preset-modal"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Are you sure you want to apply this preset?', 'wp-plugin-info-card')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "primary",
    onClick: function onClick() {
      var b = {
        uniqueId: g
      };
      var d = _objectSpread(_objectSpread({}, a.attributes), {}, {
        customFormData: j,
        uniqueIdAttribute: b
      });
      c(d);
      x(false);
    },
    className: "wppic-preset-modal-apply-button"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Apply Preset', 'wp-plugin-info-card')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "secondary",
    onClick: function onClick() {
      x(false);
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Cancel', 'wp-plugin-info-card')))), o && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Popover, {
    className: "wppic-preset-popover",
    placement: "left",
    onClose: function onClose() {
      return z(false);
    },
    noArrow: false,
    offset: 30,
    anchor: s,
    expandOnMobile: true
  }, A())));
};
PresetButton.propTypes = {
  previewBlock: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().element).isRequired,
  setAttributes: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().func).isRequired,
  label: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string).isRequired,
  presetData: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().object).isRequired
};
PresetButton.defaultProps = {
  label: 'Purple',
  previewBlock: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null),
  setAttributes: function setAttributes() {},
  presetData: {}
};
/* harmony default export */ __webpack_exports__["default"] = (PresetButton);

/***/ }),

/***/ "./src/blocks/components/ProgressBar.js":
/*!**********************************************!*\
  !*** ./src/blocks/components/ProgressBar.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
function _slicedToArray(a, b) { return _arrayWithHoles(a) || _iterableToArrayLimit(a, b) || _unsupportedIterableToArray(a, b) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(a, b) { if (!a) return; if (typeof a === "string") return _arrayLikeToArray(a, b); var c = Object.prototype.toString.call(a).slice(8, -1); if (c === "Object" && a.constructor) c = a.constructor.name; if (c === "Map" || c === "Set") return Array.from(a); if (c === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)) return _arrayLikeToArray(a, b); }
function _arrayLikeToArray(a, b) { if (b == null || b > a.length) b = a.length; for (var c = 0, d = new Array(b); c < b; c++) d[c] = a[c]; return d; }
function _iterableToArrayLimit(b, c) { var d = null == b ? null : "undefined" != typeof Symbol && b[Symbol.iterator] || b["@@iterator"]; if (null != d) { var g, h, j, k, l = [], a = !0, m = !1; try { if (j = (d = d.call(b)).next, 0 === c) { if (Object(d) !== d) return; a = !1; } else for (; !(a = (g = j.call(d)).done) && (l.push(g.value), l.length !== c); a = !0); } catch (a) { m = !0, h = a; } finally { try { if (!a && null != d["return"] && (k = d["return"](), Object(k) !== k)) return; } finally { if (m) throw h; } } return l; } }
function _arrayWithHoles(a) { if (Array.isArray(a)) return a; }
 // ES6

var baseColor = '#99cc33';
var progressColor = '#4F8A10';
var ProgressBar = function ProgressBar(a) {
  var b = a.percentage;
  var c = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({
      width: '0',
      backgroundColor: baseColor
    }),
    d = _slicedToArray(c, 2),
    e = d[0],
    f = d[1];
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    f({
      width: g(),
      backgroundColor: progressColor
    });
  }, [b]);
  var g = function getPercentage() {
    if (b >= 100) {
      return '100%';
    }
    return b + '%';
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "wppic-line-count"
  }, /*#__PURE__*/React.createElement("span", {
    style: e
  }));
};
ProgressBar.defaultProps = {
  percentage: 0
};
ProgressBar.propTypes = {
  percentage: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().number)
};
/* harmony default export */ __webpack_exports__["default"] = (ProgressBar);

/***/ }),

/***/ "./src/blocks/components/SwitchIcon.js":
/*!*********************************************!*\
  !*** ./src/blocks/components/SwitchIcon.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
 // ES6

var SwitchIcon = function SwitchIcon(a) {
  return /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: a.width,
    height: a.height,
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    fill: a.fill,
    d: "M14.5 13.8c-1.1 0-2.1.7-2.4 1.8H4V17h8.1c.3 1 1.3 1.8 2.4 1.8s2.1-.7 2.4-1.8H20v-1.5h-3.1c-.3-1-1.3-1.7-2.4-1.7zM11.9 7c-.3-1-1.3-1.8-2.4-1.8S7.4 6 7.1 7H4v1.5h3.1c.3 1 1.3 1.8 2.4 1.8s2.1-.7 2.4-1.8H20V7h-8.1z"
  }));
};
SwitchIcon.defaultProps = {
  width: 24,
  height: 24,
  fill: '#333333'
};
SwitchIcon.propTypes = {
  width: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().number),
  height: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().number),
  fill: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string)
};
/* harmony default export */ __webpack_exports__["default"] = (SwitchIcon);

/***/ }),

/***/ "./src/blocks/components/WordPressIcon.js":
/*!************************************************!*\
  !*** ./src/blocks/components/WordPressIcon.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
 // ES6

var WordPressIcon = function WordPressIcon(a) {
  return /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512",
    width: a.width,
    height: a.height
  }, /*#__PURE__*/React.createElement("path", {
    fill: a.fill,
    d: "M256 8C119.3 8 8 119.2 8 256c0 136.7 111.3 248 248 248s248-111.3 248-248C504 119.2 392.7 8 256 8zM33 256c0-32.3 6.9-63 19.3-90.7l106.4 291.4C84.3 420.5 33 344.2 33 256zm223 223c-21.9 0-43-3.2-63-9.1l66.9-194.4 68.5 187.8c.5 1.1 1 2.1 1.6 3.1-23.1 8.1-48 12.6-74 12.6zm30.7-327.5c13.4-.7 25.5-2.1 25.5-2.1 12-1.4 10.6-19.1-1.4-18.4 0 0-36.1 2.8-59.4 2.8-21.9 0-58.7-2.8-58.7-2.8-12-.7-13.4 17.7-1.4 18.4 0 0 11.4 1.4 23.4 2.1l34.7 95.2L200.6 393l-81.2-241.5c13.4-.7 25.5-2.1 25.5-2.1 12-1.4 10.6-19.1-1.4-18.4 0 0-36.1 2.8-59.4 2.8-4.2 0-9.1-.1-14.4-.3C109.6 73 178.1 33 256 33c58 0 110.9 22.2 150.6 58.5-1-.1-1.9-.2-2.9-.2-21.9 0-37.4 19.1-37.4 39.6 0 18.4 10.6 33.9 21.9 52.3 8.5 14.8 18.4 33.9 18.4 61.5 0 19.1-7.3 41.2-17 72.1l-22.2 74.3-80.7-239.6zm81.4 297.2 68.1-196.9c12.7-31.8 17-57.2 17-79.9 0-8.2-.5-15.8-1.5-22.9 17.4 31.8 27.3 68.2 27.3 107 0 82.3-44.6 154.1-110.9 192.7z"
  }));
};
WordPressIcon.defaultProps = {
  width: 24,
  height: 24,
  fill: '#333333'
};
WordPressIcon.propTypes = {
  width: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().number),
  height: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().number),
  fill: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string)
};
/* harmony default export */ __webpack_exports__["default"] = (WordPressIcon);

/***/ }),

/***/ "./src/blocks/templates/PluginCard.js":
/*!********************************************!*\
  !*** ./src/blocks/templates/PluginCard.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var validator_lib_isNumeric__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator/lib/isNumeric */ "./node_modules/validator/lib/isNumeric.js");
/* harmony import */ var validator_lib_isNumeric__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isNumeric__WEBPACK_IMPORTED_MODULE_1__);


var HtmlToReactParser = (__webpack_require__(/*! html-to-react */ "./node_modules/html-to-react/index.js").Parser);
var __ = wp.i18n.__;
var PluginCard = function PluginCard(a) {
  var b = classnames__WEBPACK_IMPORTED_MODULE_0___default()({
    'wp-pic-wrapper': true,
    'wp-pic-card': true
  });
  var c = classnames__WEBPACK_IMPORTED_MODULE_0___default()(a.scheme, {
    'wp-pic': true,
    'wp-pic-card': true,
    plugin: true
  });
  // WordPress Requires.
  var d = a.data.requires;
  if (d && validator_lib_isNumeric__WEBPACK_IMPORTED_MODULE_1___default()(d)) {
    d = 'WP ' + d + '+';
  } else {
    d = a.data.tested;
  }
  var e = '';
  if (a.data.icons.svg) {
    e = a.data.icons.svg;
  } else if (a.data.icons['2x']) {
    e = a.data.icons['2x'];
  } else if (a.data.icons['1x']) {
    e = a.data.icons['1x'];
  } else {
    e = a.defaultIcon;
  }
  var f = {
    backgroundImage: "url(".concat(e, ")"),
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  };
  var g = new HtmlToReactParser();
  return /*#__PURE__*/React.createElement("div", {
    className: b
  }, /*#__PURE__*/React.createElement("div", {
    className: c
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-flip",
    style: {
      display: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-face wp-pic-front"
  }, /*#__PURE__*/React.createElement("span", {
    className: "wp-pic-logo",
    style: f
  }), /*#__PURE__*/React.createElement("span", {
    className: "wp-pic-name"
  }, g.parse(a.data.name)), /*#__PURE__*/React.createElement("p", {
    className: "wp-pic-author"
  }, __('Author(s):', 'wp-plugin-info-card'), ' ', g.parse(a.data.author)), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-bottom"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-bar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "wp-pic-rating"
  }, a.data.rating, "%", /*#__PURE__*/React.createElement("em", null, __('Ratings', 'wp-plugin-info-card'))), /*#__PURE__*/React.createElement("span", {
    className: "wp-pic-downloaded"
  }, a.data.active_installs.toLocaleString('en'), "+", /*#__PURE__*/React.createElement("em", null, __('Installs', 'wp-plugin-info-card'))), /*#__PURE__*/React.createElement("span", {
    className: "wp-pic-requires"
  }, d, /*#__PURE__*/React.createElement("em", null, __('Requires', 'wp-plugin-info-card')))), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-download"
  }, /*#__PURE__*/React.createElement("span", null, __('More info', 'wp-plugin-info-card'))))))));
};
/* harmony default export */ __webpack_exports__["default"] = (PluginCard);

/***/ }),

/***/ "./src/blocks/templates/PluginFlex.js":
/*!********************************************!*\
  !*** ./src/blocks/templates/PluginFlex.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_BannerWrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/BannerWrapper */ "./src/blocks/components/BannerWrapper.js");


var HtmlToReactParser = (__webpack_require__(/*! html-to-react */ "./node_modules/html-to-react/index.js").Parser);
var __ = wp.i18n.__;
var PluginFlex = function PluginFlex(a) {
  var b = classnames__WEBPACK_IMPORTED_MODULE_0___default()({
    flex: true,
    'wp-pic-wrapper': true,
    'wp-pic-card': true
  });
  var c = classnames__WEBPACK_IMPORTED_MODULE_0___default()(a.scheme, {
    'wp-pic': true,
    flex: true,
    'wp-pic-card': true,
    plugin: true
  });
  var d = new HtmlToReactParser();
  return /*#__PURE__*/React.createElement("div", {
    className: b
  }, /*#__PURE__*/React.createElement("div", {
    className: c
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-flip",
    style: {
      display: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-face wp-pic-front"
  }, /*#__PURE__*/React.createElement(_components_BannerWrapper__WEBPACK_IMPORTED_MODULE_1__["default"], {
    name: a.data.name,
    bannerImage: a.data.banners,
    image: a.image
  }), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-name-wrapper"
  }, /*#__PURE__*/React.createElement("span", {
    className: "wp-pic-name"
  }, /*#__PURE__*/React.createElement("strong", null, d.parse(a.data.name)))), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-version-wrapper"
  }, /*#__PURE__*/React.createElement("p", {
    className: "wp-pic-version"
  }, /*#__PURE__*/React.createElement("span", null, __('Current Version:', 'wp-plugin-info-card')), ' ', a.data.version)), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-updated-wrapper"
  }, /*#__PURE__*/React.createElement("p", {
    className: "wp-pic-updated"
  }, /*#__PURE__*/React.createElement("span", null, __('Last Updated:', 'wp-plugin-info-card')), ' ', a.data.last_updated)), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-tested-wrapper"
  }, /*#__PURE__*/React.createElement("p", {
    className: "wp-pic-tested"
  }, /*#__PURE__*/React.createElement("span", null, __('Tested Up To:', 'wp-plugin-info-card')), ' ', a.data.tested)), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-author-wrapper"
  }, /*#__PURE__*/React.createElement("p", {
    className: "wp-pic-author"
  }, __('Author(s):', 'wp-plugin-info-card'), ' ', d.parse(a.data.author))), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-bottom"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-bar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "wp-pic-rating"
  }, a.data.rating, "%", ' ', /*#__PURE__*/React.createElement("em", null, __('Ratings', 'wp-plugin-info-card'))), /*#__PURE__*/React.createElement("span", {
    className: "wp-pic-downloaded"
  }, a.data.active_installs.toLocaleString('en'), '+', ' ', /*#__PURE__*/React.createElement("em", null, __('Installs', 'wp-plugin-info-card'))), /*#__PURE__*/React.createElement("span", {
    className: "wp-pic-requires"
  }, a.data.requires, /*#__PURE__*/React.createElement("em", null, __('Requires', 'wp-plugin-info-card')))), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-download-link"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", null, __('Download', 'wp-plugin-info-card'), ' ', d.parse(a.data.name)))))))));
};
/* harmony default export */ __webpack_exports__["default"] = (PluginFlex);

/***/ }),

/***/ "./src/blocks/templates/PluginLarge.js":
/*!*********************************************!*\
  !*** ./src/blocks/templates/PluginLarge.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var validator_lib_isNumeric__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! validator/lib/isNumeric */ "./node_modules/validator/lib/isNumeric.js");
/* harmony import */ var validator_lib_isNumeric__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isNumeric__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_BannerWrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/BannerWrapper */ "./src/blocks/components/BannerWrapper.js");



var HtmlToReactParser = (__webpack_require__(/*! html-to-react */ "./node_modules/html-to-react/index.js").Parser);
var __ = wp.i18n.__;
var PluginLarge = function PluginLarge(a) {
  var b = classnames__WEBPACK_IMPORTED_MODULE_0___default()({
    large: true,
    'wp-pic-wrapper': true,
    'wp-pic-card': true
  });
  var c = classnames__WEBPACK_IMPORTED_MODULE_0___default()(a.scheme, {
    'wp-pic': true,
    'wp-pic-card': true,
    large: true,
    plugin: true
  });
  // WordPress Requires.
  var d = a.data.requires;
  if (d && validator_lib_isNumeric__WEBPACK_IMPORTED_MODULE_2___default()(d)) {
    d = 'WP ' + d + '+';
  } else {
    d = a.data.tested;
  }
  var e = '';
  if (a.data.icons.svg) {
    e = a.data.icons.svg;
  } else if (a.data.icons['2x']) {
    e = a.data.icons['2x'];
  } else if (a.data.icons['1x']) {
    e = a.data.icons['1x'];
  } else {
    e = a.defaultIcon;
  }
  var f = {
    backgroundImage: "url(".concat(e, ")"),
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  };
  var g = new HtmlToReactParser();
  return /*#__PURE__*/React.createElement("div", {
    className: b
  }, /*#__PURE__*/React.createElement("div", {
    className: c
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-large",
    style: {
      display: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-large-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-asset-bg"
  }, /*#__PURE__*/React.createElement(_components_BannerWrapper__WEBPACK_IMPORTED_MODULE_1__["default"], {
    name: g.parse(a.data.name),
    bannerImage: a.data.banners,
    image: a.image
  }), /*#__PURE__*/React.createElement("span", {
    className: "wp-pic-asset-bg-title"
  }, /*#__PURE__*/React.createElement("span", null, g.parse(a.data.name)))), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-half-first"
  }, /*#__PURE__*/React.createElement("span", {
    className: "wp-pic-logo",
    style: f
  }), /*#__PURE__*/React.createElement("p", {
    className: "wp-pic-author"
  }, __('Author(s):', 'wp-plugin-info-card'), ' ', g.parse(a.data.author)), /*#__PURE__*/React.createElement("p", {
    className: "wp-pic-version"
  }, /*#__PURE__*/React.createElement("span", null, __('Current Version:', 'wp-plugin-info-card')), ' ', a.data.version), /*#__PURE__*/React.createElement("p", {
    className: "wp-pic-updated"
  }, /*#__PURE__*/React.createElement("span", null, __('Last Updated:', 'wp-plugin-info-card')), ' ', a.data.last_updated)), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-half-last"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-bottom"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-bar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "wp-pic-rating"
  }, a.data.rating, "%", ' ', /*#__PURE__*/React.createElement("em", null, __('Ratings', 'wp-plugin-info-card'))), /*#__PURE__*/React.createElement("span", {
    className: "wp-pic-downloaded"
  }, a.data.active_installs.toLocaleString('en'), '+', ' ', /*#__PURE__*/React.createElement("em", null, __('Installs', 'wp-plugin-info-card'))), /*#__PURE__*/React.createElement("span", {
    className: "wp-pic-requires"
  }, d, /*#__PURE__*/React.createElement("em", null, __('Requires', 'wp-plugin-info-card'))))))))));
};
/* harmony default export */ __webpack_exports__["default"] = (PluginLarge);

/***/ }),

/***/ "./src/blocks/templates/PluginScreenshots.js":
/*!***************************************************!*\
  !*** ./src/blocks/templates/PluginScreenshots.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var validator_lib_isNumeric__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! validator/lib/isNumeric */ "./node_modules/validator/lib/isNumeric.js");
/* harmony import */ var validator_lib_isNumeric__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isNumeric__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_simple_star_rating__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-simple-star-rating */ "./node_modules/react-simple-star-rating/dist/index.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/star.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/line-chart.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/download.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/code.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/download-cloud.js");
/* harmony import */ var _splidejs_react_splide__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @splidejs/react-splide */ "./node_modules/@splidejs/react-splide/dist/js/react-splide.esm.js");
/* harmony import */ var _components_WordPressIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/WordPressIcon */ "./src/blocks/components/WordPressIcon.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(a, b, c) { b = _toPropertyKey(b); if (b in a) { Object.defineProperty(a, b, { value: c, enumerable: true, configurable: true, writable: true }); } else { a[b] = c; } return a; }
function _toPropertyKey(a) { var b = _toPrimitive(a, "string"); return (typeof b === "undefined" ? "undefined" : _typeof(b)) === "symbol" ? b : String(b); }
function _toPrimitive(a, b) { if ((typeof a === "undefined" ? "undefined" : _typeof(a)) !== "object" || a === null) return a; var c = a[Symbol.toPrimitive]; if (c !== undefined) { var d = c.call(a, b || "default"); if ((typeof d === "undefined" ? "undefined" : _typeof(d)) !== "object") return d; throw new TypeError("@@toPrimitive must return a primitive value."); } return (b === "string" ? String : Number)(a); }
function _slicedToArray(a, b) { return _arrayWithHoles(a) || _iterableToArrayLimit(a, b) || _unsupportedIterableToArray(a, b) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(a, b) { if (!a) return; if (typeof a === "string") return _arrayLikeToArray(a, b); var c = Object.prototype.toString.call(a).slice(8, -1); if (c === "Object" && a.constructor) c = a.constructor.name; if (c === "Map" || c === "Set") return Array.from(a); if (c === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)) return _arrayLikeToArray(a, b); }
function _arrayLikeToArray(a, b) { if (b == null || b > a.length) b = a.length; for (var c = 0, d = new Array(b); c < b; c++) d[c] = a[c]; return d; }
function _iterableToArrayLimit(b, c) { var d = null == b ? null : "undefined" != typeof Symbol && b[Symbol.iterator] || b["@@iterator"]; if (null != d) { var g, h, j, k, l = [], a = !0, m = !1; try { if (j = (d = d.call(b)).next, 0 === c) { if (Object(d) !== d) return; a = !1; } else for (; !(a = (g = j.call(d)).done) && (l.push(g.value), l.length !== c); a = !0); } catch (a) { m = !0, h = a; } finally { try { if (!a && null != d["return"] && (k = d["return"](), Object(k) !== k)) return; } finally { if (m) throw h; } } return l; } }
function _arrayWithHoles(a) { if (Array.isArray(a)) return a; }






var HtmlToReactParser = (__webpack_require__(/*! html-to-react */ "./node_modules/html-to-react/index.js").Parser);


var _wp$i18n = wp.i18n,
  __ = _wp$i18n.__,
  sprintf = _wp$i18n.sprintf;
var PluginScreenshots = function PluginScreenshots(a) {
  var b, c;
  var d = a.assetData,
    e = a.attributes,
    f = a.isPreview,
    g = f === void 0 ? false : f;
  var h = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    i = _slicedToArray(h, 2),
    j = i[0],
    k = i[1];
  var l = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(d.rating),
    m = _slicedToArray(l, 2),
    n = m[0],
    o = m[1];
  var p = classnames__WEBPACK_IMPORTED_MODULE_0___default()({
    large: true,
    'wp-pic-plugin-screenshots-wrapper': true,
    'wp-pic-card': true
  });
  var q = classnames__WEBPACK_IMPORTED_MODULE_0___default()("wppic-plugin-screenshot-theme-".concat(e.colorTheme), {
    'wp-pic-plugin-screenshots': true,
    'wp-pic-screenshots': true,
    large: true,
    plugin: true,
    'wp-pic-has-screenshots': null !== j && j.length > 0 ? true : false
  });
  // WordPress Requires.
  var r = d.requires;
  if (r && validator_lib_isNumeric__WEBPACK_IMPORTED_MODULE_6___default()(r)) {
    r = 'WP ' + r + '+';
  } else {
    r = d.tested;
  }
  var s = '';
  if (d.hasOwnProperty('icons')) {
    if (d.icons.hasOwnProperty('svg')) {
      s = d.icons.svg;
    } else if (d.icons.hasOwnProperty('2x')) {
      s = d.icons['2x'];
    } else if (d.icons.hasOwnProperty('1x')) {
      s = d.icons['1x'];
    } else {
      s = wppic.wppic_plugin_icon_default;
    }
  }
  var t = (b = d === null || d === void 0 ? void 0 : d.local_screenshots) !== null && b !== void 0 ? b : [];
  var u = {
    backgroundImage: "url(".concat(s, ")"),
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  };
  var v = new HtmlToReactParser();
  var w = n / 20;
  var x = '';
  var y = false;
  // Check to see if color theme has `custom` in the name.
  if (e.customColors && !g) {
    y = true;
    x = "\n\t\t\t#".concat(e.uniqueId, " {\n\t\t\t\t--wppic-plugin-screenshots-card-background: ").concat(e.colorBackground, ";\n\t\t\t\t--wppic-plugin-screenshots-card-text-color: ").concat(e.colorText, ";\n\t\t\t\t--wppic-plugin-screenshots-card-border-color: ").concat(e.colorBorder, ";\n\t\t\t\t--wppic-plugin-screenshots-card-menu-border-color: ").concat(e.colorMenuBorder, ";\n\t\t\t\t--wppic-plugin-screenshots-card-menu-color: ").concat(e.colorMenu, ";\n\t\t\t\t--wppic-plugin-screenshots-card-menu-color-hover: ").concat(e.colorMenuHover, ";\n\t\t\t\t--wppic-plugin-screenshots-card-menu-text-color: ").concat(e.colorMenuText, ";\n\t\t\t\t--wppic-plugin-screenshots-card-menu-text-color-hover: ").concat(e.colorMenuTextHover, ";\n\t\t\t\t--wppic-plugin-screenshots-card-screenshots-background: ").concat(e.colorScreenshotsBackground, ";\n\t\t\t\t--wppic-plugin-screenshots-card-screenshots-border-color: ").concat(e.colorScreenshotsBorder, ";\n\t\t\t\t--wppic-plugin-screenshots-card-screenshots-star-color: ").concat(e.colorStar, ";\n\t\t\t\t--wppic-plugin-screenshots-card-meta-background-color: ").concat(e.colorMetaBackground, ";\n\t\t\t\t--wppic-plugin-screenshots-card-meta-text-color: ").concat(e.colorMetaText, ";\n\t\t\t\t--wppic-plugin-screenshots-card-screenshots-arrow-background-color: ").concat(e.colorScreenshotsArrowBackground, ";\n\t\t\t\t--wppic-plugin-screenshots-card-screenshots-arrow-background-color-hover: ").concat(e.colorScreenshotsArrowBackgroundHover, ";\n\t\t\t\t--wppic-plugin-screenshots-card-screenshots-arrow-color: ").concat(e.colorScreenshotsArrow, ";\n\t\t\t\t--wppic-plugin-screenshots-card-screenshots-arrow-color-hover: ").concat(e.colorScreenshotsArrowHover, ";\n\t\t\t}\n\t\t");
  }
  return /*#__PURE__*/React.createElement("div", {
    className: p
  }, /*#__PURE__*/React.createElement("style", null, x), /*#__PURE__*/React.createElement("div", {
    className: q,
    id: y ? e.uniqueId : null
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-plugin-screenshots-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-plugin-screenshots-avatar-wrapper"
  }, /*#__PURE__*/React.createElement("a", {
    href: d.url,
    onClick: function onClick(a) {
      return a.preventDefault();
    },
    target: "_blank",
    rel: "noopener noreferrer",
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()("wp-pic-plugin-screenshots-avatar style-".concat(e.iconStyle), {
      'is-rounded': e.enableRoundedIcon
    })
  }, /*#__PURE__*/React.createElement("img", {
    src: s,
    width: "125",
    height: "125",
    alt: d.name
  })), e.enableContextMenu && /*#__PURE__*/React.createElement("div", {
    className: "wppic-meatball-menu wppic-meatball-menu-theme-light",
    style: {
      display: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wppic-meatball-content"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    "aria-label": __('Toggle Plugin Actions', 'wp-plugin-info-card')
  }), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", {
    className: "wppic-meatball-menu-item wppic-meatball-menu-item-edit-comment",
    "data-comment-action": "edit"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "button-reset",
    onClick: function onClick(a) {
      return a.preventDefault();
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "wppic-meatball-menu-icon"
  }, /*#__PURE__*/React.createElement(_components_WordPressIcon__WEBPACK_IMPORTED_MODULE_4__["default"], null)), /*#__PURE__*/React.createElement("span", {
    className: "wppic-meatball-menu-label"
  }, __('View Plugin Page', 'wp-plugin-info-card')))), /*#__PURE__*/React.createElement("li", {
    className: "wppic-meatball-menu-item wppic-meatball-menu-item-approve-comment",
    "data-comment-action": "approve"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "button-reset",
    onClick: function onClick(a) {
      return a.preventDefault();
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "wppic-meatball-menu-icon"
  }, /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_7__["default"], null)), /*#__PURE__*/React.createElement("span", {
    className: "wppic-meatball-menu-label"
  }, __('View Ratings', 'wp-plugin-info-card')))), /*#__PURE__*/React.createElement("li", {
    className: "wppic-meatball-menu-item wppic-meatball-menu-item-approve-comment",
    "data-comment-action": "approve"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "button-reset",
    onClick: function onClick(a) {
      return a.preventDefault();
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "wppic-meatball-menu-icon"
  }, /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_8__["default"], null)), /*#__PURE__*/React.createElement("span", {
    className: "wppic-meatball-menu-label"
  }, __('View Plugin Stats', 'wp-plugin-info-card')))), /*#__PURE__*/React.createElement("li", {
    className: "wppic-meatball-menu-item wppic-meatball-menu-item-moderate-comment",
    "data-comment-action": "pending"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "button-reset",
    onClick: function onClick(a) {
      return a.preventDefault();
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "wppic-meatball-menu-icon"
  }, /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_9__["default"], null)), /*#__PURE__*/React.createElement("span", {
    className: "wppic-meatball-menu-label"
  }, __('Download Plugin', 'wp-plugin-info-card'))))), /*#__PURE__*/React.createElement("div", {
    className: "wppic-meatball-icon-wrapper",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wppic-meatball-icon"
  }, /*#__PURE__*/React.createElement("span", null)))))), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-plugin-screenshots-title"
  }, /*#__PURE__*/React.createElement("h2", null, '' === e.pluginTitle ? d.name : e.pluginTitle)), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-plugin-screenshots-author"
  }, "".concat(__('By:', 'wp-plugin-info-card'), " ").concat(d.author)), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-plugin-screenshots-rating"
  }, /*#__PURE__*/React.createElement(react_simple_star_rating__WEBPACK_IMPORTED_MODULE_2__.Rating, {
    initialValue: w,
    readonly: true,
    allowFraction: true,
    allowHover: false,
    disableFillHover: true,
    fillColor: "var( --wppic-plugin-screenshots-card-screenshots-star-color )"
  }), /*#__PURE__*/React.createElement("span", {
    className: "wp-pic-plugin-screenshots-rating-count"
  }, d.num_ratings.toLocaleString('en'), " ", __('Ratings', 'wp-plugin-info-card'))), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-plugin-screenshots-last-updated"
  }, sprintf(__('Last Updated: %s ago', 'wp-plugin-info-card'), d.last_updated_human_time)), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-plugin-screenshots-description"
  }, v.parse(d.short_description))), /*#__PURE__*/React.createElement("footer", {
    className: "wp-pic-plugin-screenshots-footer"
  }, Object.values(t).length > 0 && e.enableScreenshots && /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-plugin-screenshots-images"
  }, /*#__PURE__*/React.createElement(_splidejs_react_splide__WEBPACK_IMPORTED_MODULE_3__.Splide, {
    options: (c = {
      type: 'loop',
      width: '100%',
      gap: '20px',
      rewind: true,
      perPage: Object.values(t).length > 3 ? 3 : Object.values(t).length,
      perMove: 1,
      arrows: Object.values(t).length > 3 ? true : false,
      pagination: false,
      drag: true,
      autoplay: false,
      lazyload: 'nearby'
    }, _defineProperty(c, "perPage", Object.values(t).length < 2 ? 1 : 2), _defineProperty(c, "mediaQuery", 'min'), _defineProperty(c, "breakpoints", {
      500: {
        perPage: Object.values(t).length < 3 ? Object.values(t).length : 3
      },
      625: {
        perPage: Object.values(t).length < 4 ? Object.values(t).length : 4
      }
    }), c)
  }, Object.values(t).map(function (a, b) {
    return /*#__PURE__*/React.createElement(_splidejs_react_splide__WEBPACK_IMPORTED_MODULE_3__.SplideSlide, {
      className: "wp-pic-plugin-screenshots-image",
      key: b
    }, /*#__PURE__*/React.createElement("a", {
      href: a.full,
      "data-fancybox": true,
      "data-caption": a.caption,
      onClick: function onClick(a) {
        return a.preventDefault();
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: a[e.imageSize],
      alt: a.alt
    })));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-plugin-screenshots-meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-plugin-screenshots-meta-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-plugin-screenshots-meta-item-svg"
  }, /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_10__["default"], null)), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-plugin-screenshots-meta-item-label"
  }, "v", d.version)), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-plugin-screenshots-meta-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-plugin-screenshots-meta-item-svg"
  }, /*#__PURE__*/React.createElement(_components_WordPressIcon__WEBPACK_IMPORTED_MODULE_4__["default"], null)), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-plugin-screenshots-meta-item-label"
  }, __('Requires', 'wp-plugin-info-card'), " ", "".concat(r))), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-plugin-screenshots-meta-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-plugin-screenshots-meta-item-svg"
  }, /*#__PURE__*/React.createElement(lucide_react__WEBPACK_IMPORTED_MODULE_11__["default"], null)), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-plugin-screenshots-meta-item-label"
  }, d.active_installs.toLocaleString('en'), " ", __('Installs', 'wp-plugin-info-card')))))));
};
/* harmony default export */ __webpack_exports__["default"] = (PluginScreenshots);

/***/ }),

/***/ "./src/blocks/templates/PluginWordPress.js":
/*!*************************************************!*\
  !*** ./src/blocks/templates/PluginWordPress.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var validator_lib_isNumeric__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! validator/lib/isNumeric */ "./node_modules/validator/lib/isNumeric.js");
/* harmony import */ var validator_lib_isNumeric__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isNumeric__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_PicIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/PicIcon */ "./src/blocks/components/PicIcon.js");
/* harmony import */ var react_star_ratings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-star-ratings */ "./node_modules/react-star-ratings/build/index.js");
/* eslint-disable @wordpress/i18n-translator-comments */




var HtmlToReactParser = (__webpack_require__(/*! html-to-react */ "./node_modules/html-to-react/index.js").Parser);
var _wp$i18n = wp.i18n,
  __ = _wp$i18n.__,
  _n = _wp$i18n._n,
  sprintf = _wp$i18n.sprintf;
var PluginWordPress = function PluginWordPress(a) {
  var b = classnames__WEBPACK_IMPORTED_MODULE_0___default()({
    wordpress: true,
    'wp-pic-wrapper': true,
    'wp-pic-card': true
  });
  var c = classnames__WEBPACK_IMPORTED_MODULE_0___default()(a.scheme, "align".concat(a.align), {
    'wp-pic': true,
    'wp-pic-wordpress': true,
    wordpress: true,
    full: false,
    plugin: true
  });
  // WordPress Requires.
  var d = a.data.requires;
  if (d && validator_lib_isNumeric__WEBPACK_IMPORTED_MODULE_3___default()(d)) {
    d = 'WP ' + d + '+';
  } else {
    d = a.data.tested;
  }
  var e = new HtmlToReactParser();
  return /*#__PURE__*/React.createElement("div", {
    className: b
  }, /*#__PURE__*/React.createElement("div", {
    className: c
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-wordpress",
    style: {
      display: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-wordpress-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-plugin-card-top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-column-name"
  }, /*#__PURE__*/React.createElement("h3", null, e.parse(a.data.name), /*#__PURE__*/React.createElement(_components_PicIcon__WEBPACK_IMPORTED_MODULE_1__["default"], {
    image: a.image,
    data: a.data
  }))), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-action-links"
  }, /*#__PURE__*/React.createElement("span", {
    className: "wp-pic-action-buttons"
  }, __('Download', 'wp-plugin-info-card'))), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-column-description"
  }, /*#__PURE__*/React.createElement("p", null, a.data.short_description), /*#__PURE__*/React.createElement("p", {
    className: "authors"
  }, /*#__PURE__*/React.createElement("cite", null, e.parse(sprintf(__('By %s', 'wp-plugin-info-card'), a.data.author)))))), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-plugin-card-bottom"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-column-rating",
    title: sprintf(_n('(based on %s rating)', '(based on %s ratings)', a.data.num_ratings, 'wp-plugin-info-card'), a.data.num_ratings)
  }, /*#__PURE__*/React.createElement("span", {
    className: "wp-pic-num-ratings",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement(react_star_ratings__WEBPACK_IMPORTED_MODULE_2__["default"], {
    rating: a.data.rating / 100 * 5,
    starRatedColor: "orange",
    starDimension: "20px",
    starSpacing: "0",
    numberOfStars: 5,
    name: ""
  }), "\xA0 (", a.data.num_ratings, ")")), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-column-updated"
  }, /*#__PURE__*/React.createElement("strong", null, __('Last Updated:', 'wp-plugin-info-card')), ' ', a.data.last_updated), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-column-downloaded"
  }, sprintf(__('%s+ Active Installs', 'wp-plugin-info-card'), a.data.active_installs.toLocaleString('en'))), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-column-compatibility"
  }, /*#__PURE__*/React.createElement("span", {
    className: "wp-pic-compatibility-compatible"
  }, __('Compatible with WordPress', 'wp-plugin-info-card'), ' ', d)))))));
};
/* harmony default export */ __webpack_exports__["default"] = (PluginWordPress);

/***/ }),

/***/ "./src/blocks/templates/ThemeCard.js":
/*!*******************************************!*\
  !*** ./src/blocks/templates/ThemeCard.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);

var HtmlToReactParser = (__webpack_require__(/*! html-to-react */ "./node_modules/html-to-react/index.js").Parser);
var __ = wp.i18n.__;
var ThemeCard = function ThemeCard(a) {
  var b = classnames__WEBPACK_IMPORTED_MODULE_0___default()({
    'wp-pic-wrapper': true,
    'wp-pic-card': true
  });
  var c = classnames__WEBPACK_IMPORTED_MODULE_0___default()(a.scheme, {
    'wp-pic': true,
    'wp-pic-card': true,
    theme: true
  });
  var d = a.image || a.data.screenshot_url;
  var e = {
    backgroundImage: "url(".concat(d, ")"),
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  };
  var f = a.data.author;
  if (f.hasOwnProperty('author')) {
    f = f.author;
  }
  var g = new HtmlToReactParser();
  return /*#__PURE__*/React.createElement("div", {
    className: b
  }, /*#__PURE__*/React.createElement("div", {
    className: c
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-flip",
    style: {
      display: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-face wp-pic-front"
  }, /*#__PURE__*/React.createElement("span", {
    className: "wp-pic-logo",
    style: e
  }), /*#__PURE__*/React.createElement("span", {
    className: "wp-pic-name"
  }, g.parse(a.data.name)), /*#__PURE__*/React.createElement("p", {
    className: "wp-pic-author"
  }, __('Author(s):', 'wp-plugin-info-card'), ' ', f), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-bottom"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-bar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "wp-pic-rating"
  }, a.data.rating, "%", /*#__PURE__*/React.createElement("em", null, __('Ratings', 'wp-plugin-info-card'))), /*#__PURE__*/React.createElement("span", {
    className: "wp-pic-downloaded"
  }, a.data.downloaded.toLocaleString('en'), /*#__PURE__*/React.createElement("em", null, __('Downloads', 'wp-plugin-info-card'))), /*#__PURE__*/React.createElement("span", {
    className: "wp-pic-requires"
  }, a.data.version, /*#__PURE__*/React.createElement("em", null, __('Version', 'wp-plugin-info-card')))), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-download"
  }, /*#__PURE__*/React.createElement("span", null, __('More info', 'wp-plugin-info-card'))))))));
};
/* harmony default export */ __webpack_exports__["default"] = (ThemeCard);

/***/ }),

/***/ "./src/blocks/templates/ThemeFlex.js":
/*!*******************************************!*\
  !*** ./src/blocks/templates/ThemeFlex.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_BannerWrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/BannerWrapper */ "./src/blocks/components/BannerWrapper.js");


var HtmlToReactParser = (__webpack_require__(/*! html-to-react */ "./node_modules/html-to-react/index.js").Parser);
var __ = wp.i18n.__;
var PluginFlex = function PluginFlex(a) {
  var b = classnames__WEBPACK_IMPORTED_MODULE_0___default()({
    flex: true,
    'wp-pic-wrapper': true,
    'wp-pic-card': true
  });
  var c = classnames__WEBPACK_IMPORTED_MODULE_0___default()(a.scheme, {
    'wp-pic': true,
    flex: true,
    'wp-pic-card': true,
    theme: true
  });
  var d = a.data.author;
  if (d.hasOwnProperty('author')) {
    d = d.author;
  }
  var e = new HtmlToReactParser();
  return /*#__PURE__*/React.createElement("div", {
    className: b
  }, /*#__PURE__*/React.createElement("div", {
    className: c
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-flip",
    style: {
      display: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-face wp-pic-front"
  }, /*#__PURE__*/React.createElement(_components_BannerWrapper__WEBPACK_IMPORTED_MODULE_1__["default"], {
    name: e.parse(a.data.name),
    bannerImage: a.data.banners,
    image: a.image || a.data.screenshot_url
  }), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-name-wrapper"
  }, /*#__PURE__*/React.createElement("span", {
    className: "wp-pic-name"
  }, /*#__PURE__*/React.createElement("strong", null, e.parse(a.data.name)))), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-preview-wrapper"
  }, /*#__PURE__*/React.createElement("span", {
    className: "wp-pic-preview"
  }, /*#__PURE__*/React.createElement("span", null, __('Theme Preview', 'wp-plugin-info-card'))), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-updated-wrapper"
  }, /*#__PURE__*/React.createElement("p", {
    className: "wp-pic-updated"
  }, /*#__PURE__*/React.createElement("span", null, __('Last Updated:', 'wp-plugin-info-card')), ' ', a.data.last_updated)), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-author-wrapper"
  }, /*#__PURE__*/React.createElement("p", {
    className: "wp-pic-author"
  }, __('Author(s):', 'wp-plugin-info-card'), ' ', d)), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-bottom"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-bar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "wp-pic-rating"
  }, a.data.rating, "%", ' ', /*#__PURE__*/React.createElement("em", null, __('Ratings', 'wp-plugin-info-card'))), /*#__PURE__*/React.createElement("span", {
    className: "wp-pic-downloaded"
  }, a.data.downloaded.toLocaleString('en'), '+', ' ', /*#__PURE__*/React.createElement("em", null, __('Downloads', 'wp-plugin-info-card'))), /*#__PURE__*/React.createElement("span", {
    className: "wp-pic-version"
  }, a.data.version, /*#__PURE__*/React.createElement("em", null, __('Version', 'wp-plugin-info-card')))), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-download-link"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", null, __('Download', 'wp-plugin-info-card'), ' ', a.data.name)))))))));
};
/* harmony default export */ __webpack_exports__["default"] = (PluginFlex);

/***/ }),

/***/ "./src/blocks/templates/ThemeLarge.js":
/*!********************************************!*\
  !*** ./src/blocks/templates/ThemeLarge.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_BannerWrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/BannerWrapper */ "./src/blocks/components/BannerWrapper.js");


var HtmlToReactParser = (__webpack_require__(/*! html-to-react */ "./node_modules/html-to-react/index.js").Parser);
var __ = wp.i18n.__;
var PluginLarge = function PluginLarge(a) {
  var b = classnames__WEBPACK_IMPORTED_MODULE_0___default()({
    large: true,
    'wp-pic-wrapper': true,
    'wp-pic-card': true
  });
  var c = classnames__WEBPACK_IMPORTED_MODULE_0___default()(a.scheme, {
    'wp-pic': true,
    'wp-pic-card': true,
    large: true,
    theme: true
  });
  var d = a.data.author;
  if (d.hasOwnProperty('author')) {
    d = d.author;
  }
  var e = new HtmlToReactParser();
  return /*#__PURE__*/React.createElement("div", {
    className: b
  }, /*#__PURE__*/React.createElement("div", {
    className: c
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-large",
    style: {
      display: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-large-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-asset-bg"
  }, /*#__PURE__*/React.createElement(_components_BannerWrapper__WEBPACK_IMPORTED_MODULE_1__["default"], {
    name: e.parse(a.data.name),
    bannerImage: a.data.banners,
    image: a.image || a.data.screenshot_url
  }), /*#__PURE__*/React.createElement("span", {
    className: "wp-pic-asset-bg-title"
  }, /*#__PURE__*/React.createElement("span", null, e.parse(a.data.name)))), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-half-first"
  }, /*#__PURE__*/React.createElement("span", {
    className: "wp-pic-logo",
    href: "#"
  }), /*#__PURE__*/React.createElement("p", {
    className: "wp-pic-author"
  }, __('Author(s):', 'wp-plugin-info-card'), ' ', d), /*#__PURE__*/React.createElement("p", {
    className: "wp-pic-version"
  }, /*#__PURE__*/React.createElement("span", null, __('Current Version:', 'wp-plugin-info-card')), ' ', a.data.version), /*#__PURE__*/React.createElement("p", {
    className: "wp-pic-updated"
  }, /*#__PURE__*/React.createElement("span", null, __('Last Updated:', 'wp-plugin-info-card')), ' ', a.data.last_updated)), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-half-last"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-bottom"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-bar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "wp-pic-rating"
  }, a.data.rating, "%", ' ', /*#__PURE__*/React.createElement("em", null, __('Ratings', 'wp-plugin-info-card'))), /*#__PURE__*/React.createElement("span", {
    className: "wp-pic-downloaded"
  }, a.data.downloaded.toLocaleString('en'), '+', ' ', /*#__PURE__*/React.createElement("em", null, __('Downloads', 'wp-plugin-info-card'))), /*#__PURE__*/React.createElement("span", {
    className: "wp-pic-requires"
  }, a.data.version, /*#__PURE__*/React.createElement("em", null, __('Version', 'wp-plugin-info-card'))))))))));
};
/* harmony default export */ __webpack_exports__["default"] = (PluginLarge);

/***/ }),

/***/ "./src/blocks/templates/ThemeWordPress.js":
/*!************************************************!*\
  !*** ./src/blocks/templates/ThemeWordPress.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_star_ratings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-star-ratings */ "./node_modules/react-star-ratings/build/index.js");
/* harmony import */ var _components_BannerWrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/BannerWrapper */ "./src/blocks/components/BannerWrapper.js");
/* eslint-disable @wordpress/i18n-translator-comments */



var HtmlToReactParser = (__webpack_require__(/*! html-to-react */ "./node_modules/html-to-react/index.js").Parser);
var _wp$i18n = wp.i18n,
  __ = _wp$i18n.__,
  _n = _wp$i18n._n,
  sprintf = _wp$i18n.sprintf;
var ThemeWordPress = function ThemeWordPress(a) {
  var b = classnames__WEBPACK_IMPORTED_MODULE_0___default()({
    wordpress: true,
    'wp-pic-wrapper': true,
    'wp-pic-card': true
  });
  var c = classnames__WEBPACK_IMPORTED_MODULE_0___default()(a.scheme, {
    'wp-pic': true,
    'wp-pic-wordpress': true,
    wordpress: true,
    theme: true
  });
  var d = new HtmlToReactParser();
  return /*#__PURE__*/React.createElement("div", {
    className: b
  }, /*#__PURE__*/React.createElement("div", {
    className: c
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-wordpress",
    style: {
      display: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-theme-card-top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-theme-screenshot"
  }, /*#__PURE__*/React.createElement(_components_BannerWrapper__WEBPACK_IMPORTED_MODULE_2__["default"], {
    name: d.parse(a.data.name),
    bannerImage: a.data.banners,
    image: a.image || a.data.screenshot_url
  }), /*#__PURE__*/React.createElement("span", {
    className: "wp-pic-theme-preview"
  }, __('Theme Preview', 'wp-plugin-info-card'))), /*#__PURE__*/React.createElement("h3", null, d.parse(a.data.name), "\xA0", /*#__PURE__*/React.createElement("span", {
    className: "wp-pic-author"
  }, sprintf(__('By %s', 'wp-plugin-info-card'), a.data.author))), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-action-links"
  }, /*#__PURE__*/React.createElement("span", {
    className: "wp-pic-action-buttons"
  }, __('Download', 'wp-plugin-info-card')))), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-theme-card-bottom"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-column-rating",
    title: sprintf(_n('(based on %s rating)', '(based on %s ratings)', a.data.num_ratings, 'wp-plugin-info-card'), a.data.num_ratings)
  }, /*#__PURE__*/React.createElement("span", {
    className: "wp-pic-num-ratings",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement(react_star_ratings__WEBPACK_IMPORTED_MODULE_1__["default"], {
    rating: a.data.rating / 100 * 5,
    starRatedColor: "orange",
    starDimension: "20px",
    starSpacing: "0",
    numberOfStars: 5,
    name: ""
  }), "\xA0 (", a.data.num_ratings, ")")), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-column-updated"
  }, /*#__PURE__*/React.createElement("strong", null, __('Last Updated:', 'wp-plugin-info-card')), ' ', a.data.last_updated), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-column-downloaded"
  }, sprintf(__('%s+ Downloads', 'wp-plugin-info-card'), a.data.downloaded.toLocaleString('en'))), /*#__PURE__*/React.createElement("div", {
    className: "wp-pic-column-version"
  }, /*#__PURE__*/React.createElement("span", null, __('Version', 'wp-plugin-info-card'), ' ', a.data.version))))));
};
/* harmony default export */ __webpack_exports__["default"] = (ThemeWordPress);

/***/ }),

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;
	var nativeCodeString = '[native code]';

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
					classes.push(arg.toString());
					continue;
				}

				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "./node_modules/dom-serializer/lib/foreignNames.js":
/*!*********************************************************!*\
  !*** ./node_modules/dom-serializer/lib/foreignNames.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.attributeNames = exports.elementNames = void 0;
exports.elementNames = new Map([
    "altGlyph",
    "altGlyphDef",
    "altGlyphItem",
    "animateColor",
    "animateMotion",
    "animateTransform",
    "clipPath",
    "feBlend",
    "feColorMatrix",
    "feComponentTransfer",
    "feComposite",
    "feConvolveMatrix",
    "feDiffuseLighting",
    "feDisplacementMap",
    "feDistantLight",
    "feDropShadow",
    "feFlood",
    "feFuncA",
    "feFuncB",
    "feFuncG",
    "feFuncR",
    "feGaussianBlur",
    "feImage",
    "feMerge",
    "feMergeNode",
    "feMorphology",
    "feOffset",
    "fePointLight",
    "feSpecularLighting",
    "feSpotLight",
    "feTile",
    "feTurbulence",
    "foreignObject",
    "glyphRef",
    "linearGradient",
    "radialGradient",
    "textPath",
].map(function (val) { return [val.toLowerCase(), val]; }));
exports.attributeNames = new Map([
    "definitionURL",
    "attributeName",
    "attributeType",
    "baseFrequency",
    "baseProfile",
    "calcMode",
    "clipPathUnits",
    "diffuseConstant",
    "edgeMode",
    "filterUnits",
    "glyphRef",
    "gradientTransform",
    "gradientUnits",
    "kernelMatrix",
    "kernelUnitLength",
    "keyPoints",
    "keySplines",
    "keyTimes",
    "lengthAdjust",
    "limitingConeAngle",
    "markerHeight",
    "markerUnits",
    "markerWidth",
    "maskContentUnits",
    "maskUnits",
    "numOctaves",
    "pathLength",
    "patternContentUnits",
    "patternTransform",
    "patternUnits",
    "pointsAtX",
    "pointsAtY",
    "pointsAtZ",
    "preserveAlpha",
    "preserveAspectRatio",
    "primitiveUnits",
    "refX",
    "refY",
    "repeatCount",
    "repeatDur",
    "requiredExtensions",
    "requiredFeatures",
    "specularConstant",
    "specularExponent",
    "spreadMethod",
    "startOffset",
    "stdDeviation",
    "stitchTiles",
    "surfaceScale",
    "systemLanguage",
    "tableValues",
    "targetX",
    "targetY",
    "textLength",
    "viewBox",
    "viewTarget",
    "xChannelSelector",
    "yChannelSelector",
    "zoomAndPan",
].map(function (val) { return [val.toLowerCase(), val]; }));


/***/ }),

/***/ "./node_modules/dom-serializer/lib/index.js":
/*!**************************************************!*\
  !*** ./node_modules/dom-serializer/lib/index.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.render = void 0;
/*
 * Module dependencies
 */
var ElementType = __importStar(__webpack_require__(/*! domelementtype */ "./node_modules/domelementtype/lib/index.js"));
var entities_1 = __webpack_require__(/*! entities */ "./node_modules/entities/lib/index.js");
/**
 * Mixed-case SVG and MathML tags & attributes
 * recognized by the HTML parser.
 *
 * @see https://html.spec.whatwg.org/multipage/parsing.html#parsing-main-inforeign
 */
var foreignNames_js_1 = __webpack_require__(/*! ./foreignNames.js */ "./node_modules/dom-serializer/lib/foreignNames.js");
var unencodedElements = new Set([
    "style",
    "script",
    "xmp",
    "iframe",
    "noembed",
    "noframes",
    "plaintext",
    "noscript",
]);
function replaceQuotes(value) {
    return value.replace(/"/g, "&quot;");
}
/**
 * Format attributes
 */
function formatAttributes(attributes, opts) {
    var _a;
    if (!attributes)
        return;
    var encode = ((_a = opts.encodeEntities) !== null && _a !== void 0 ? _a : opts.decodeEntities) === false
        ? replaceQuotes
        : opts.xmlMode || opts.encodeEntities !== "utf8"
            ? entities_1.encodeXML
            : entities_1.escapeAttribute;
    return Object.keys(attributes)
        .map(function (key) {
        var _a, _b;
        var value = (_a = attributes[key]) !== null && _a !== void 0 ? _a : "";
        if (opts.xmlMode === "foreign") {
            /* Fix up mixed-case attribute names */
            key = (_b = foreignNames_js_1.attributeNames.get(key)) !== null && _b !== void 0 ? _b : key;
        }
        if (!opts.emptyAttrs && !opts.xmlMode && value === "") {
            return key;
        }
        return "".concat(key, "=\"").concat(encode(value), "\"");
    })
        .join(" ");
}
/**
 * Self-enclosing tags
 */
var singleTag = new Set([
    "area",
    "base",
    "basefont",
    "br",
    "col",
    "command",
    "embed",
    "frame",
    "hr",
    "img",
    "input",
    "isindex",
    "keygen",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
]);
/**
 * Renders a DOM node or an array of DOM nodes to a string.
 *
 * Can be thought of as the equivalent of the `outerHTML` of the passed node(s).
 *
 * @param node Node to be rendered.
 * @param options Changes serialization behavior
 */
function render(node, options) {
    if (options === void 0) { options = {}; }
    var nodes = "length" in node ? node : [node];
    var output = "";
    for (var i = 0; i < nodes.length; i++) {
        output += renderNode(nodes[i], options);
    }
    return output;
}
exports.render = render;
exports["default"] = render;
function renderNode(node, options) {
    switch (node.type) {
        case ElementType.Root:
            return render(node.children, options);
        // @ts-expect-error We don't use `Doctype` yet
        case ElementType.Doctype:
        case ElementType.Directive:
            return renderDirective(node);
        case ElementType.Comment:
            return renderComment(node);
        case ElementType.CDATA:
            return renderCdata(node);
        case ElementType.Script:
        case ElementType.Style:
        case ElementType.Tag:
            return renderTag(node, options);
        case ElementType.Text:
            return renderText(node, options);
    }
}
var foreignModeIntegrationPoints = new Set([
    "mi",
    "mo",
    "mn",
    "ms",
    "mtext",
    "annotation-xml",
    "foreignObject",
    "desc",
    "title",
]);
var foreignElements = new Set(["svg", "math"]);
function renderTag(elem, opts) {
    var _a;
    // Handle SVG / MathML in HTML
    if (opts.xmlMode === "foreign") {
        /* Fix up mixed-case element names */
        elem.name = (_a = foreignNames_js_1.elementNames.get(elem.name)) !== null && _a !== void 0 ? _a : elem.name;
        /* Exit foreign mode at integration points */
        if (elem.parent &&
            foreignModeIntegrationPoints.has(elem.parent.name)) {
            opts = __assign(__assign({}, opts), { xmlMode: false });
        }
    }
    if (!opts.xmlMode && foreignElements.has(elem.name)) {
        opts = __assign(__assign({}, opts), { xmlMode: "foreign" });
    }
    var tag = "<".concat(elem.name);
    var attribs = formatAttributes(elem.attribs, opts);
    if (attribs) {
        tag += " ".concat(attribs);
    }
    if (elem.children.length === 0 &&
        (opts.xmlMode
            ? // In XML mode or foreign mode, and user hasn't explicitly turned off self-closing tags
                opts.selfClosingTags !== false
            : // User explicitly asked for self-closing tags, even in HTML mode
                opts.selfClosingTags && singleTag.has(elem.name))) {
        if (!opts.xmlMode)
            tag += " ";
        tag += "/>";
    }
    else {
        tag += ">";
        if (elem.children.length > 0) {
            tag += render(elem.children, opts);
        }
        if (opts.xmlMode || !singleTag.has(elem.name)) {
            tag += "</".concat(elem.name, ">");
        }
    }
    return tag;
}
function renderDirective(elem) {
    return "<".concat(elem.data, ">");
}
function renderText(elem, opts) {
    var _a;
    var data = elem.data || "";
    // If entities weren't decoded, no need to encode them back
    if (((_a = opts.encodeEntities) !== null && _a !== void 0 ? _a : opts.decodeEntities) !== false &&
        !(!opts.xmlMode &&
            elem.parent &&
            unencodedElements.has(elem.parent.name))) {
        data =
            opts.xmlMode || opts.encodeEntities !== "utf8"
                ? (0, entities_1.encodeXML)(data)
                : (0, entities_1.escapeText)(data);
    }
    return data;
}
function renderCdata(elem) {
    return "<![CDATA[".concat(elem.children[0].data, "]]>");
}
function renderComment(elem) {
    return "<!--".concat(elem.data, "-->");
}


/***/ }),

/***/ "./node_modules/domelementtype/lib/index.js":
/*!**************************************************!*\
  !*** ./node_modules/domelementtype/lib/index.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Doctype = exports.CDATA = exports.Tag = exports.Style = exports.Script = exports.Comment = exports.Directive = exports.Text = exports.Root = exports.isTag = exports.ElementType = void 0;
/** Types of elements found in htmlparser2's DOM */
var ElementType;
(function (ElementType) {
    /** Type for the root element of a document */
    ElementType["Root"] = "root";
    /** Type for Text */
    ElementType["Text"] = "text";
    /** Type for <? ... ?> */
    ElementType["Directive"] = "directive";
    /** Type for <!-- ... --> */
    ElementType["Comment"] = "comment";
    /** Type for <script> tags */
    ElementType["Script"] = "script";
    /** Type for <style> tags */
    ElementType["Style"] = "style";
    /** Type for Any tag */
    ElementType["Tag"] = "tag";
    /** Type for <![CDATA[ ... ]]> */
    ElementType["CDATA"] = "cdata";
    /** Type for <!doctype ...> */
    ElementType["Doctype"] = "doctype";
})(ElementType = exports.ElementType || (exports.ElementType = {}));
/**
 * Tests whether an element is a tag or not.
 *
 * @param elem Element to test
 */
function isTag(elem) {
    return (elem.type === ElementType.Tag ||
        elem.type === ElementType.Script ||
        elem.type === ElementType.Style);
}
exports.isTag = isTag;
// Exports for backwards compatibility
/** Type for the root element of a document */
exports.Root = ElementType.Root;
/** Type for Text */
exports.Text = ElementType.Text;
/** Type for <? ... ?> */
exports.Directive = ElementType.Directive;
/** Type for <!-- ... --> */
exports.Comment = ElementType.Comment;
/** Type for <script> tags */
exports.Script = ElementType.Script;
/** Type for <style> tags */
exports.Style = ElementType.Style;
/** Type for Any tag */
exports.Tag = ElementType.Tag;
/** Type for <![CDATA[ ... ]]> */
exports.CDATA = ElementType.CDATA;
/** Type for <!doctype ...> */
exports.Doctype = ElementType.Doctype;


/***/ }),

/***/ "./node_modules/domhandler/lib/index.js":
/*!**********************************************!*\
  !*** ./node_modules/domhandler/lib/index.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomHandler = void 0;
var domelementtype_1 = __webpack_require__(/*! domelementtype */ "./node_modules/domelementtype/lib/index.js");
var node_js_1 = __webpack_require__(/*! ./node.js */ "./node_modules/domhandler/lib/node.js");
__exportStar(__webpack_require__(/*! ./node.js */ "./node_modules/domhandler/lib/node.js"), exports);
// Default options
var defaultOpts = {
    withStartIndices: false,
    withEndIndices: false,
    xmlMode: false,
};
var DomHandler = /** @class */ (function () {
    /**
     * @param callback Called once parsing has completed.
     * @param options Settings for the handler.
     * @param elementCB Callback whenever a tag is closed.
     */
    function DomHandler(callback, options, elementCB) {
        /** The elements of the DOM */
        this.dom = [];
        /** The root element for the DOM */
        this.root = new node_js_1.Document(this.dom);
        /** Indicated whether parsing has been completed. */
        this.done = false;
        /** Stack of open tags. */
        this.tagStack = [this.root];
        /** A data node that is still being written to. */
        this.lastNode = null;
        /** Reference to the parser instance. Used for location information. */
        this.parser = null;
        // Make it possible to skip arguments, for backwards-compatibility
        if (typeof options === "function") {
            elementCB = options;
            options = defaultOpts;
        }
        if (typeof callback === "object") {
            options = callback;
            callback = undefined;
        }
        this.callback = callback !== null && callback !== void 0 ? callback : null;
        this.options = options !== null && options !== void 0 ? options : defaultOpts;
        this.elementCB = elementCB !== null && elementCB !== void 0 ? elementCB : null;
    }
    DomHandler.prototype.onparserinit = function (parser) {
        this.parser = parser;
    };
    // Resets the handler back to starting state
    DomHandler.prototype.onreset = function () {
        this.dom = [];
        this.root = new node_js_1.Document(this.dom);
        this.done = false;
        this.tagStack = [this.root];
        this.lastNode = null;
        this.parser = null;
    };
    // Signals the handler that parsing is done
    DomHandler.prototype.onend = function () {
        if (this.done)
            return;
        this.done = true;
        this.parser = null;
        this.handleCallback(null);
    };
    DomHandler.prototype.onerror = function (error) {
        this.handleCallback(error);
    };
    DomHandler.prototype.onclosetag = function () {
        this.lastNode = null;
        var elem = this.tagStack.pop();
        if (this.options.withEndIndices) {
            elem.endIndex = this.parser.endIndex;
        }
        if (this.elementCB)
            this.elementCB(elem);
    };
    DomHandler.prototype.onopentag = function (name, attribs) {
        var type = this.options.xmlMode ? domelementtype_1.ElementType.Tag : undefined;
        var element = new node_js_1.Element(name, attribs, undefined, type);
        this.addNode(element);
        this.tagStack.push(element);
    };
    DomHandler.prototype.ontext = function (data) {
        var lastNode = this.lastNode;
        if (lastNode && lastNode.type === domelementtype_1.ElementType.Text) {
            lastNode.data += data;
            if (this.options.withEndIndices) {
                lastNode.endIndex = this.parser.endIndex;
            }
        }
        else {
            var node = new node_js_1.Text(data);
            this.addNode(node);
            this.lastNode = node;
        }
    };
    DomHandler.prototype.oncomment = function (data) {
        if (this.lastNode && this.lastNode.type === domelementtype_1.ElementType.Comment) {
            this.lastNode.data += data;
            return;
        }
        var node = new node_js_1.Comment(data);
        this.addNode(node);
        this.lastNode = node;
    };
    DomHandler.prototype.oncommentend = function () {
        this.lastNode = null;
    };
    DomHandler.prototype.oncdatastart = function () {
        var text = new node_js_1.Text("");
        var node = new node_js_1.CDATA([text]);
        this.addNode(node);
        text.parent = node;
        this.lastNode = text;
    };
    DomHandler.prototype.oncdataend = function () {
        this.lastNode = null;
    };
    DomHandler.prototype.onprocessinginstruction = function (name, data) {
        var node = new node_js_1.ProcessingInstruction(name, data);
        this.addNode(node);
    };
    DomHandler.prototype.handleCallback = function (error) {
        if (typeof this.callback === "function") {
            this.callback(error, this.dom);
        }
        else if (error) {
            throw error;
        }
    };
    DomHandler.prototype.addNode = function (node) {
        var parent = this.tagStack[this.tagStack.length - 1];
        var previousSibling = parent.children[parent.children.length - 1];
        if (this.options.withStartIndices) {
            node.startIndex = this.parser.startIndex;
        }
        if (this.options.withEndIndices) {
            node.endIndex = this.parser.endIndex;
        }
        parent.children.push(node);
        if (previousSibling) {
            node.prev = previousSibling;
            previousSibling.next = node;
        }
        node.parent = parent;
        this.lastNode = null;
    };
    return DomHandler;
}());
exports.DomHandler = DomHandler;
exports["default"] = DomHandler;


/***/ }),

/***/ "./node_modules/domhandler/lib/node.js":
/*!*********************************************!*\
  !*** ./node_modules/domhandler/lib/node.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.cloneNode = exports.hasChildren = exports.isDocument = exports.isDirective = exports.isComment = exports.isText = exports.isCDATA = exports.isTag = exports.Element = exports.Document = exports.CDATA = exports.NodeWithChildren = exports.ProcessingInstruction = exports.Comment = exports.Text = exports.DataNode = exports.Node = void 0;
var domelementtype_1 = __webpack_require__(/*! domelementtype */ "./node_modules/domelementtype/lib/index.js");
/**
 * This object will be used as the prototype for Nodes when creating a
 * DOM-Level-1-compliant structure.
 */
var Node = /** @class */ (function () {
    function Node() {
        /** Parent of the node */
        this.parent = null;
        /** Previous sibling */
        this.prev = null;
        /** Next sibling */
        this.next = null;
        /** The start index of the node. Requires `withStartIndices` on the handler to be `true. */
        this.startIndex = null;
        /** The end index of the node. Requires `withEndIndices` on the handler to be `true. */
        this.endIndex = null;
    }
    Object.defineProperty(Node.prototype, "parentNode", {
        // Read-write aliases for properties
        /**
         * Same as {@link parent}.
         * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
         */
        get: function () {
            return this.parent;
        },
        set: function (parent) {
            this.parent = parent;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "previousSibling", {
        /**
         * Same as {@link prev}.
         * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
         */
        get: function () {
            return this.prev;
        },
        set: function (prev) {
            this.prev = prev;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "nextSibling", {
        /**
         * Same as {@link next}.
         * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
         */
        get: function () {
            return this.next;
        },
        set: function (next) {
            this.next = next;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Clone this node, and optionally its children.
     *
     * @param recursive Clone child nodes as well.
     * @returns A clone of the node.
     */
    Node.prototype.cloneNode = function (recursive) {
        if (recursive === void 0) { recursive = false; }
        return cloneNode(this, recursive);
    };
    return Node;
}());
exports.Node = Node;
/**
 * A node that contains some data.
 */
var DataNode = /** @class */ (function (_super) {
    __extends(DataNode, _super);
    /**
     * @param data The content of the data node
     */
    function DataNode(data) {
        var _this = _super.call(this) || this;
        _this.data = data;
        return _this;
    }
    Object.defineProperty(DataNode.prototype, "nodeValue", {
        /**
         * Same as {@link data}.
         * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
         */
        get: function () {
            return this.data;
        },
        set: function (data) {
            this.data = data;
        },
        enumerable: false,
        configurable: true
    });
    return DataNode;
}(Node));
exports.DataNode = DataNode;
/**
 * Text within the document.
 */
var Text = /** @class */ (function (_super) {
    __extends(Text, _super);
    function Text() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = domelementtype_1.ElementType.Text;
        return _this;
    }
    Object.defineProperty(Text.prototype, "nodeType", {
        get: function () {
            return 3;
        },
        enumerable: false,
        configurable: true
    });
    return Text;
}(DataNode));
exports.Text = Text;
/**
 * Comments within the document.
 */
var Comment = /** @class */ (function (_super) {
    __extends(Comment, _super);
    function Comment() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = domelementtype_1.ElementType.Comment;
        return _this;
    }
    Object.defineProperty(Comment.prototype, "nodeType", {
        get: function () {
            return 8;
        },
        enumerable: false,
        configurable: true
    });
    return Comment;
}(DataNode));
exports.Comment = Comment;
/**
 * Processing instructions, including doc types.
 */
var ProcessingInstruction = /** @class */ (function (_super) {
    __extends(ProcessingInstruction, _super);
    function ProcessingInstruction(name, data) {
        var _this = _super.call(this, data) || this;
        _this.name = name;
        _this.type = domelementtype_1.ElementType.Directive;
        return _this;
    }
    Object.defineProperty(ProcessingInstruction.prototype, "nodeType", {
        get: function () {
            return 1;
        },
        enumerable: false,
        configurable: true
    });
    return ProcessingInstruction;
}(DataNode));
exports.ProcessingInstruction = ProcessingInstruction;
/**
 * A `Node` that can have children.
 */
var NodeWithChildren = /** @class */ (function (_super) {
    __extends(NodeWithChildren, _super);
    /**
     * @param children Children of the node. Only certain node types can have children.
     */
    function NodeWithChildren(children) {
        var _this = _super.call(this) || this;
        _this.children = children;
        return _this;
    }
    Object.defineProperty(NodeWithChildren.prototype, "firstChild", {
        // Aliases
        /** First child of the node. */
        get: function () {
            var _a;
            return (_a = this.children[0]) !== null && _a !== void 0 ? _a : null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NodeWithChildren.prototype, "lastChild", {
        /** Last child of the node. */
        get: function () {
            return this.children.length > 0
                ? this.children[this.children.length - 1]
                : null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NodeWithChildren.prototype, "childNodes", {
        /**
         * Same as {@link children}.
         * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
         */
        get: function () {
            return this.children;
        },
        set: function (children) {
            this.children = children;
        },
        enumerable: false,
        configurable: true
    });
    return NodeWithChildren;
}(Node));
exports.NodeWithChildren = NodeWithChildren;
var CDATA = /** @class */ (function (_super) {
    __extends(CDATA, _super);
    function CDATA() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = domelementtype_1.ElementType.CDATA;
        return _this;
    }
    Object.defineProperty(CDATA.prototype, "nodeType", {
        get: function () {
            return 4;
        },
        enumerable: false,
        configurable: true
    });
    return CDATA;
}(NodeWithChildren));
exports.CDATA = CDATA;
/**
 * The root node of the document.
 */
var Document = /** @class */ (function (_super) {
    __extends(Document, _super);
    function Document() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = domelementtype_1.ElementType.Root;
        return _this;
    }
    Object.defineProperty(Document.prototype, "nodeType", {
        get: function () {
            return 9;
        },
        enumerable: false,
        configurable: true
    });
    return Document;
}(NodeWithChildren));
exports.Document = Document;
/**
 * An element within the DOM.
 */
var Element = /** @class */ (function (_super) {
    __extends(Element, _super);
    /**
     * @param name Name of the tag, eg. `div`, `span`.
     * @param attribs Object mapping attribute names to attribute values.
     * @param children Children of the node.
     */
    function Element(name, attribs, children, type) {
        if (children === void 0) { children = []; }
        if (type === void 0) { type = name === "script"
            ? domelementtype_1.ElementType.Script
            : name === "style"
                ? domelementtype_1.ElementType.Style
                : domelementtype_1.ElementType.Tag; }
        var _this = _super.call(this, children) || this;
        _this.name = name;
        _this.attribs = attribs;
        _this.type = type;
        return _this;
    }
    Object.defineProperty(Element.prototype, "nodeType", {
        get: function () {
            return 1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Element.prototype, "tagName", {
        // DOM Level 1 aliases
        /**
         * Same as {@link name}.
         * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
         */
        get: function () {
            return this.name;
        },
        set: function (name) {
            this.name = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Element.prototype, "attributes", {
        get: function () {
            var _this = this;
            return Object.keys(this.attribs).map(function (name) {
                var _a, _b;
                return ({
                    name: name,
                    value: _this.attribs[name],
                    namespace: (_a = _this["x-attribsNamespace"]) === null || _a === void 0 ? void 0 : _a[name],
                    prefix: (_b = _this["x-attribsPrefix"]) === null || _b === void 0 ? void 0 : _b[name],
                });
            });
        },
        enumerable: false,
        configurable: true
    });
    return Element;
}(NodeWithChildren));
exports.Element = Element;
/**
 * @param node Node to check.
 * @returns `true` if the node is a `Element`, `false` otherwise.
 */
function isTag(node) {
    return (0, domelementtype_1.isTag)(node);
}
exports.isTag = isTag;
/**
 * @param node Node to check.
 * @returns `true` if the node has the type `CDATA`, `false` otherwise.
 */
function isCDATA(node) {
    return node.type === domelementtype_1.ElementType.CDATA;
}
exports.isCDATA = isCDATA;
/**
 * @param node Node to check.
 * @returns `true` if the node has the type `Text`, `false` otherwise.
 */
function isText(node) {
    return node.type === domelementtype_1.ElementType.Text;
}
exports.isText = isText;
/**
 * @param node Node to check.
 * @returns `true` if the node has the type `Comment`, `false` otherwise.
 */
function isComment(node) {
    return node.type === domelementtype_1.ElementType.Comment;
}
exports.isComment = isComment;
/**
 * @param node Node to check.
 * @returns `true` if the node has the type `ProcessingInstruction`, `false` otherwise.
 */
function isDirective(node) {
    return node.type === domelementtype_1.ElementType.Directive;
}
exports.isDirective = isDirective;
/**
 * @param node Node to check.
 * @returns `true` if the node has the type `ProcessingInstruction`, `false` otherwise.
 */
function isDocument(node) {
    return node.type === domelementtype_1.ElementType.Root;
}
exports.isDocument = isDocument;
/**
 * @param node Node to check.
 * @returns `true` if the node has children, `false` otherwise.
 */
function hasChildren(node) {
    return Object.prototype.hasOwnProperty.call(node, "children");
}
exports.hasChildren = hasChildren;
/**
 * Clone a node, and optionally its children.
 *
 * @param recursive Clone child nodes as well.
 * @returns A clone of the node.
 */
function cloneNode(node, recursive) {
    if (recursive === void 0) { recursive = false; }
    var result;
    if (isText(node)) {
        result = new Text(node.data);
    }
    else if (isComment(node)) {
        result = new Comment(node.data);
    }
    else if (isTag(node)) {
        var children = recursive ? cloneChildren(node.children) : [];
        var clone_1 = new Element(node.name, __assign({}, node.attribs), children);
        children.forEach(function (child) { return (child.parent = clone_1); });
        if (node.namespace != null) {
            clone_1.namespace = node.namespace;
        }
        if (node["x-attribsNamespace"]) {
            clone_1["x-attribsNamespace"] = __assign({}, node["x-attribsNamespace"]);
        }
        if (node["x-attribsPrefix"]) {
            clone_1["x-attribsPrefix"] = __assign({}, node["x-attribsPrefix"]);
        }
        result = clone_1;
    }
    else if (isCDATA(node)) {
        var children = recursive ? cloneChildren(node.children) : [];
        var clone_2 = new CDATA(children);
        children.forEach(function (child) { return (child.parent = clone_2); });
        result = clone_2;
    }
    else if (isDocument(node)) {
        var children = recursive ? cloneChildren(node.children) : [];
        var clone_3 = new Document(children);
        children.forEach(function (child) { return (child.parent = clone_3); });
        if (node["x-mode"]) {
            clone_3["x-mode"] = node["x-mode"];
        }
        result = clone_3;
    }
    else if (isDirective(node)) {
        var instruction = new ProcessingInstruction(node.name, node.data);
        if (node["x-name"] != null) {
            instruction["x-name"] = node["x-name"];
            instruction["x-publicId"] = node["x-publicId"];
            instruction["x-systemId"] = node["x-systemId"];
        }
        result = instruction;
    }
    else {
        throw new Error("Not implemented yet: ".concat(node.type));
    }
    result.startIndex = node.startIndex;
    result.endIndex = node.endIndex;
    if (node.sourceCodeLocation != null) {
        result.sourceCodeLocation = node.sourceCodeLocation;
    }
    return result;
}
exports.cloneNode = cloneNode;
function cloneChildren(childs) {
    var children = childs.map(function (child) { return cloneNode(child, true); });
    for (var i = 1; i < children.length; i++) {
        children[i].prev = children[i - 1];
        children[i - 1].next = children[i];
    }
    return children;
}


/***/ }),

/***/ "./node_modules/domutils/lib/feeds.js":
/*!********************************************!*\
  !*** ./node_modules/domutils/lib/feeds.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getFeed = void 0;
var stringify_js_1 = __webpack_require__(/*! ./stringify.js */ "./node_modules/domutils/lib/stringify.js");
var legacy_js_1 = __webpack_require__(/*! ./legacy.js */ "./node_modules/domutils/lib/legacy.js");
/**
 * Get the feed object from the root of a DOM tree.
 *
 * @category Feeds
 * @param doc - The DOM to to extract the feed from.
 * @returns The feed.
 */
function getFeed(doc) {
    var feedRoot = getOneElement(isValidFeed, doc);
    return !feedRoot
        ? null
        : feedRoot.name === "feed"
            ? getAtomFeed(feedRoot)
            : getRssFeed(feedRoot);
}
exports.getFeed = getFeed;
/**
 * Parse an Atom feed.
 *
 * @param feedRoot The root of the feed.
 * @returns The parsed feed.
 */
function getAtomFeed(feedRoot) {
    var _a;
    var childs = feedRoot.children;
    var feed = {
        type: "atom",
        items: (0, legacy_js_1.getElementsByTagName)("entry", childs).map(function (item) {
            var _a;
            var children = item.children;
            var entry = { media: getMediaElements(children) };
            addConditionally(entry, "id", "id", children);
            addConditionally(entry, "title", "title", children);
            var href = (_a = getOneElement("link", children)) === null || _a === void 0 ? void 0 : _a.attribs["href"];
            if (href) {
                entry.link = href;
            }
            var description = fetch("summary", children) || fetch("content", children);
            if (description) {
                entry.description = description;
            }
            var pubDate = fetch("updated", children);
            if (pubDate) {
                entry.pubDate = new Date(pubDate);
            }
            return entry;
        }),
    };
    addConditionally(feed, "id", "id", childs);
    addConditionally(feed, "title", "title", childs);
    var href = (_a = getOneElement("link", childs)) === null || _a === void 0 ? void 0 : _a.attribs["href"];
    if (href) {
        feed.link = href;
    }
    addConditionally(feed, "description", "subtitle", childs);
    var updated = fetch("updated", childs);
    if (updated) {
        feed.updated = new Date(updated);
    }
    addConditionally(feed, "author", "email", childs, true);
    return feed;
}
/**
 * Parse a RSS feed.
 *
 * @param feedRoot The root of the feed.
 * @returns The parsed feed.
 */
function getRssFeed(feedRoot) {
    var _a, _b;
    var childs = (_b = (_a = getOneElement("channel", feedRoot.children)) === null || _a === void 0 ? void 0 : _a.children) !== null && _b !== void 0 ? _b : [];
    var feed = {
        type: feedRoot.name.substr(0, 3),
        id: "",
        items: (0, legacy_js_1.getElementsByTagName)("item", feedRoot.children).map(function (item) {
            var children = item.children;
            var entry = { media: getMediaElements(children) };
            addConditionally(entry, "id", "guid", children);
            addConditionally(entry, "title", "title", children);
            addConditionally(entry, "link", "link", children);
            addConditionally(entry, "description", "description", children);
            var pubDate = fetch("pubDate", children) || fetch("dc:date", children);
            if (pubDate)
                entry.pubDate = new Date(pubDate);
            return entry;
        }),
    };
    addConditionally(feed, "title", "title", childs);
    addConditionally(feed, "link", "link", childs);
    addConditionally(feed, "description", "description", childs);
    var updated = fetch("lastBuildDate", childs);
    if (updated) {
        feed.updated = new Date(updated);
    }
    addConditionally(feed, "author", "managingEditor", childs, true);
    return feed;
}
var MEDIA_KEYS_STRING = ["url", "type", "lang"];
var MEDIA_KEYS_INT = [
    "fileSize",
    "bitrate",
    "framerate",
    "samplingrate",
    "channels",
    "duration",
    "height",
    "width",
];
/**
 * Get all media elements of a feed item.
 *
 * @param where Nodes to search in.
 * @returns Media elements.
 */
function getMediaElements(where) {
    return (0, legacy_js_1.getElementsByTagName)("media:content", where).map(function (elem) {
        var attribs = elem.attribs;
        var media = {
            medium: attribs["medium"],
            isDefault: !!attribs["isDefault"],
        };
        for (var _i = 0, MEDIA_KEYS_STRING_1 = MEDIA_KEYS_STRING; _i < MEDIA_KEYS_STRING_1.length; _i++) {
            var attrib = MEDIA_KEYS_STRING_1[_i];
            if (attribs[attrib]) {
                media[attrib] = attribs[attrib];
            }
        }
        for (var _a = 0, MEDIA_KEYS_INT_1 = MEDIA_KEYS_INT; _a < MEDIA_KEYS_INT_1.length; _a++) {
            var attrib = MEDIA_KEYS_INT_1[_a];
            if (attribs[attrib]) {
                media[attrib] = parseInt(attribs[attrib], 10);
            }
        }
        if (attribs["expression"]) {
            media.expression = attribs["expression"];
        }
        return media;
    });
}
/**
 * Get one element by tag name.
 *
 * @param tagName Tag name to look for
 * @param node Node to search in
 * @returns The element or null
 */
function getOneElement(tagName, node) {
    return (0, legacy_js_1.getElementsByTagName)(tagName, node, true, 1)[0];
}
/**
 * Get the text content of an element with a certain tag name.
 *
 * @param tagName Tag name to look for.
 * @param where Node to search in.
 * @param recurse Whether to recurse into child nodes.
 * @returns The text content of the element.
 */
function fetch(tagName, where, recurse) {
    if (recurse === void 0) { recurse = false; }
    return (0, stringify_js_1.textContent)((0, legacy_js_1.getElementsByTagName)(tagName, where, recurse, 1)).trim();
}
/**
 * Adds a property to an object if it has a value.
 *
 * @param obj Object to be extended
 * @param prop Property name
 * @param tagName Tag name that contains the conditionally added property
 * @param where Element to search for the property
 * @param recurse Whether to recurse into child nodes.
 */
function addConditionally(obj, prop, tagName, where, recurse) {
    if (recurse === void 0) { recurse = false; }
    var val = fetch(tagName, where, recurse);
    if (val)
        obj[prop] = val;
}
/**
 * Checks if an element is a feed root node.
 *
 * @param value The name of the element to check.
 * @returns Whether an element is a feed root node.
 */
function isValidFeed(value) {
    return value === "rss" || value === "feed" || value === "rdf:RDF";
}
//# sourceMappingURL=feeds.js.map

/***/ }),

/***/ "./node_modules/domutils/lib/helpers.js":
/*!**********************************************!*\
  !*** ./node_modules/domutils/lib/helpers.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.uniqueSort = exports.compareDocumentPosition = exports.DocumentPosition = exports.removeSubsets = void 0;
var domhandler_1 = __webpack_require__(/*! domhandler */ "./node_modules/domhandler/lib/index.js");
/**
 * Given an array of nodes, remove any member that is contained by another
 * member.
 *
 * @category Helpers
 * @param nodes Nodes to filter.
 * @returns Remaining nodes that aren't contained by other nodes.
 */
function removeSubsets(nodes) {
    var idx = nodes.length;
    /*
     * Check if each node (or one of its ancestors) is already contained in the
     * array.
     */
    while (--idx >= 0) {
        var node = nodes[idx];
        /*
         * Remove the node if it is not unique.
         * We are going through the array from the end, so we only
         * have to check nodes that preceed the node under consideration in the array.
         */
        if (idx > 0 && nodes.lastIndexOf(node, idx - 1) >= 0) {
            nodes.splice(idx, 1);
            continue;
        }
        for (var ancestor = node.parent; ancestor; ancestor = ancestor.parent) {
            if (nodes.includes(ancestor)) {
                nodes.splice(idx, 1);
                break;
            }
        }
    }
    return nodes;
}
exports.removeSubsets = removeSubsets;
/**
 * @category Helpers
 * @see {@link http://dom.spec.whatwg.org/#dom-node-comparedocumentposition}
 */
var DocumentPosition;
(function (DocumentPosition) {
    DocumentPosition[DocumentPosition["DISCONNECTED"] = 1] = "DISCONNECTED";
    DocumentPosition[DocumentPosition["PRECEDING"] = 2] = "PRECEDING";
    DocumentPosition[DocumentPosition["FOLLOWING"] = 4] = "FOLLOWING";
    DocumentPosition[DocumentPosition["CONTAINS"] = 8] = "CONTAINS";
    DocumentPosition[DocumentPosition["CONTAINED_BY"] = 16] = "CONTAINED_BY";
})(DocumentPosition = exports.DocumentPosition || (exports.DocumentPosition = {}));
/**
 * Compare the position of one node against another node in any other document,
 * returning a bitmask with the values from {@link DocumentPosition}.
 *
 * Document order:
 * > There is an ordering, document order, defined on all the nodes in the
 * > document corresponding to the order in which the first character of the
 * > XML representation of each node occurs in the XML representation of the
 * > document after expansion of general entities. Thus, the document element
 * > node will be the first node. Element nodes occur before their children.
 * > Thus, document order orders element nodes in order of the occurrence of
 * > their start-tag in the XML (after expansion of entities). The attribute
 * > nodes of an element occur after the element and before its children. The
 * > relative order of attribute nodes is implementation-dependent.
 *
 * Source:
 * http://www.w3.org/TR/DOM-Level-3-Core/glossary.html#dt-document-order
 *
 * @category Helpers
 * @param nodeA The first node to use in the comparison
 * @param nodeB The second node to use in the comparison
 * @returns A bitmask describing the input nodes' relative position.
 *
 * See http://dom.spec.whatwg.org/#dom-node-comparedocumentposition for
 * a description of these values.
 */
function compareDocumentPosition(nodeA, nodeB) {
    var aParents = [];
    var bParents = [];
    if (nodeA === nodeB) {
        return 0;
    }
    var current = (0, domhandler_1.hasChildren)(nodeA) ? nodeA : nodeA.parent;
    while (current) {
        aParents.unshift(current);
        current = current.parent;
    }
    current = (0, domhandler_1.hasChildren)(nodeB) ? nodeB : nodeB.parent;
    while (current) {
        bParents.unshift(current);
        current = current.parent;
    }
    var maxIdx = Math.min(aParents.length, bParents.length);
    var idx = 0;
    while (idx < maxIdx && aParents[idx] === bParents[idx]) {
        idx++;
    }
    if (idx === 0) {
        return DocumentPosition.DISCONNECTED;
    }
    var sharedParent = aParents[idx - 1];
    var siblings = sharedParent.children;
    var aSibling = aParents[idx];
    var bSibling = bParents[idx];
    if (siblings.indexOf(aSibling) > siblings.indexOf(bSibling)) {
        if (sharedParent === nodeB) {
            return DocumentPosition.FOLLOWING | DocumentPosition.CONTAINED_BY;
        }
        return DocumentPosition.FOLLOWING;
    }
    if (sharedParent === nodeA) {
        return DocumentPosition.PRECEDING | DocumentPosition.CONTAINS;
    }
    return DocumentPosition.PRECEDING;
}
exports.compareDocumentPosition = compareDocumentPosition;
/**
 * Sort an array of nodes based on their relative position in the document,
 * removing any duplicate nodes. If the array contains nodes that do not belong
 * to the same document, sort order is unspecified.
 *
 * @category Helpers
 * @param nodes Array of DOM nodes.
 * @returns Collection of unique nodes, sorted in document order.
 */
function uniqueSort(nodes) {
    nodes = nodes.filter(function (node, i, arr) { return !arr.includes(node, i + 1); });
    nodes.sort(function (a, b) {
        var relative = compareDocumentPosition(a, b);
        if (relative & DocumentPosition.PRECEDING) {
            return -1;
        }
        else if (relative & DocumentPosition.FOLLOWING) {
            return 1;
        }
        return 0;
    });
    return nodes;
}
exports.uniqueSort = uniqueSort;
//# sourceMappingURL=helpers.js.map

/***/ }),

/***/ "./node_modules/domutils/lib/index.js":
/*!********************************************!*\
  !*** ./node_modules/domutils/lib/index.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.hasChildren = exports.isDocument = exports.isComment = exports.isText = exports.isCDATA = exports.isTag = void 0;
__exportStar(__webpack_require__(/*! ./stringify.js */ "./node_modules/domutils/lib/stringify.js"), exports);
__exportStar(__webpack_require__(/*! ./traversal.js */ "./node_modules/domutils/lib/traversal.js"), exports);
__exportStar(__webpack_require__(/*! ./manipulation.js */ "./node_modules/domutils/lib/manipulation.js"), exports);
__exportStar(__webpack_require__(/*! ./querying.js */ "./node_modules/domutils/lib/querying.js"), exports);
__exportStar(__webpack_require__(/*! ./legacy.js */ "./node_modules/domutils/lib/legacy.js"), exports);
__exportStar(__webpack_require__(/*! ./helpers.js */ "./node_modules/domutils/lib/helpers.js"), exports);
__exportStar(__webpack_require__(/*! ./feeds.js */ "./node_modules/domutils/lib/feeds.js"), exports);
/** @deprecated Use these methods from `domhandler` directly. */
var domhandler_1 = __webpack_require__(/*! domhandler */ "./node_modules/domhandler/lib/index.js");
Object.defineProperty(exports, "isTag", ({ enumerable: true, get: function () { return domhandler_1.isTag; } }));
Object.defineProperty(exports, "isCDATA", ({ enumerable: true, get: function () { return domhandler_1.isCDATA; } }));
Object.defineProperty(exports, "isText", ({ enumerable: true, get: function () { return domhandler_1.isText; } }));
Object.defineProperty(exports, "isComment", ({ enumerable: true, get: function () { return domhandler_1.isComment; } }));
Object.defineProperty(exports, "isDocument", ({ enumerable: true, get: function () { return domhandler_1.isDocument; } }));
Object.defineProperty(exports, "hasChildren", ({ enumerable: true, get: function () { return domhandler_1.hasChildren; } }));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/domutils/lib/legacy.js":
/*!*********************************************!*\
  !*** ./node_modules/domutils/lib/legacy.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getElementsByTagType = exports.getElementsByTagName = exports.getElementById = exports.getElements = exports.testElement = void 0;
var domhandler_1 = __webpack_require__(/*! domhandler */ "./node_modules/domhandler/lib/index.js");
var querying_js_1 = __webpack_require__(/*! ./querying.js */ "./node_modules/domutils/lib/querying.js");
/**
 * A map of functions to check nodes against.
 */
var Checks = {
    tag_name: function (name) {
        if (typeof name === "function") {
            return function (elem) { return (0, domhandler_1.isTag)(elem) && name(elem.name); };
        }
        else if (name === "*") {
            return domhandler_1.isTag;
        }
        return function (elem) { return (0, domhandler_1.isTag)(elem) && elem.name === name; };
    },
    tag_type: function (type) {
        if (typeof type === "function") {
            return function (elem) { return type(elem.type); };
        }
        return function (elem) { return elem.type === type; };
    },
    tag_contains: function (data) {
        if (typeof data === "function") {
            return function (elem) { return (0, domhandler_1.isText)(elem) && data(elem.data); };
        }
        return function (elem) { return (0, domhandler_1.isText)(elem) && elem.data === data; };
    },
};
/**
 * Returns a function to check whether a node has an attribute with a particular
 * value.
 *
 * @param attrib Attribute to check.
 * @param value Attribute value to look for.
 * @returns A function to check whether the a node has an attribute with a
 *   particular value.
 */
function getAttribCheck(attrib, value) {
    if (typeof value === "function") {
        return function (elem) { return (0, domhandler_1.isTag)(elem) && value(elem.attribs[attrib]); };
    }
    return function (elem) { return (0, domhandler_1.isTag)(elem) && elem.attribs[attrib] === value; };
}
/**
 * Returns a function that returns `true` if either of the input functions
 * returns `true` for a node.
 *
 * @param a First function to combine.
 * @param b Second function to combine.
 * @returns A function taking a node and returning `true` if either of the input
 *   functions returns `true` for the node.
 */
function combineFuncs(a, b) {
    return function (elem) { return a(elem) || b(elem); };
}
/**
 * Returns a function that executes all checks in `options` and returns `true`
 * if any of them match a node.
 *
 * @param options An object describing nodes to look for.
 * @returns A function that executes all checks in `options` and returns `true`
 *   if any of them match a node.
 */
function compileTest(options) {
    var funcs = Object.keys(options).map(function (key) {
        var value = options[key];
        return Object.prototype.hasOwnProperty.call(Checks, key)
            ? Checks[key](value)
            : getAttribCheck(key, value);
    });
    return funcs.length === 0 ? null : funcs.reduce(combineFuncs);
}
/**
 * Checks whether a node matches the description in `options`.
 *
 * @category Legacy Query Functions
 * @param options An object describing nodes to look for.
 * @param node The element to test.
 * @returns Whether the element matches the description in `options`.
 */
function testElement(options, node) {
    var test = compileTest(options);
    return test ? test(node) : true;
}
exports.testElement = testElement;
/**
 * Returns all nodes that match `options`.
 *
 * @category Legacy Query Functions
 * @param options An object describing nodes to look for.
 * @param nodes Nodes to search through.
 * @param recurse Also consider child nodes.
 * @param limit Maximum number of nodes to return.
 * @returns All nodes that match `options`.
 */
function getElements(options, nodes, recurse, limit) {
    if (limit === void 0) { limit = Infinity; }
    var test = compileTest(options);
    return test ? (0, querying_js_1.filter)(test, nodes, recurse, limit) : [];
}
exports.getElements = getElements;
/**
 * Returns the node with the supplied ID.
 *
 * @category Legacy Query Functions
 * @param id The unique ID attribute value to look for.
 * @param nodes Nodes to search through.
 * @param recurse Also consider child nodes.
 * @returns The node with the supplied ID.
 */
function getElementById(id, nodes, recurse) {
    if (recurse === void 0) { recurse = true; }
    if (!Array.isArray(nodes))
        nodes = [nodes];
    return (0, querying_js_1.findOne)(getAttribCheck("id", id), nodes, recurse);
}
exports.getElementById = getElementById;
/**
 * Returns all nodes with the supplied `tagName`.
 *
 * @category Legacy Query Functions
 * @param tagName Tag name to search for.
 * @param nodes Nodes to search through.
 * @param recurse Also consider child nodes.
 * @param limit Maximum number of nodes to return.
 * @returns All nodes with the supplied `tagName`.
 */
function getElementsByTagName(tagName, nodes, recurse, limit) {
    if (recurse === void 0) { recurse = true; }
    if (limit === void 0) { limit = Infinity; }
    return (0, querying_js_1.filter)(Checks["tag_name"](tagName), nodes, recurse, limit);
}
exports.getElementsByTagName = getElementsByTagName;
/**
 * Returns all nodes with the supplied `type`.
 *
 * @category Legacy Query Functions
 * @param type Element type to look for.
 * @param nodes Nodes to search through.
 * @param recurse Also consider child nodes.
 * @param limit Maximum number of nodes to return.
 * @returns All nodes with the supplied `type`.
 */
function getElementsByTagType(type, nodes, recurse, limit) {
    if (recurse === void 0) { recurse = true; }
    if (limit === void 0) { limit = Infinity; }
    return (0, querying_js_1.filter)(Checks["tag_type"](type), nodes, recurse, limit);
}
exports.getElementsByTagType = getElementsByTagType;
//# sourceMappingURL=legacy.js.map

/***/ }),

/***/ "./node_modules/domutils/lib/manipulation.js":
/*!***************************************************!*\
  !*** ./node_modules/domutils/lib/manipulation.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.prepend = exports.prependChild = exports.append = exports.appendChild = exports.replaceElement = exports.removeElement = void 0;
/**
 * Remove an element from the dom
 *
 * @category Manipulation
 * @param elem The element to be removed
 */
function removeElement(elem) {
    if (elem.prev)
        elem.prev.next = elem.next;
    if (elem.next)
        elem.next.prev = elem.prev;
    if (elem.parent) {
        var childs = elem.parent.children;
        var childsIndex = childs.lastIndexOf(elem);
        if (childsIndex >= 0) {
            childs.splice(childsIndex, 1);
        }
    }
    elem.next = null;
    elem.prev = null;
    elem.parent = null;
}
exports.removeElement = removeElement;
/**
 * Replace an element in the dom
 *
 * @category Manipulation
 * @param elem The element to be replaced
 * @param replacement The element to be added
 */
function replaceElement(elem, replacement) {
    var prev = (replacement.prev = elem.prev);
    if (prev) {
        prev.next = replacement;
    }
    var next = (replacement.next = elem.next);
    if (next) {
        next.prev = replacement;
    }
    var parent = (replacement.parent = elem.parent);
    if (parent) {
        var childs = parent.children;
        childs[childs.lastIndexOf(elem)] = replacement;
        elem.parent = null;
    }
}
exports.replaceElement = replaceElement;
/**
 * Append a child to an element.
 *
 * @category Manipulation
 * @param parent The element to append to.
 * @param child The element to be added as a child.
 */
function appendChild(parent, child) {
    removeElement(child);
    child.next = null;
    child.parent = parent;
    if (parent.children.push(child) > 1) {
        var sibling = parent.children[parent.children.length - 2];
        sibling.next = child;
        child.prev = sibling;
    }
    else {
        child.prev = null;
    }
}
exports.appendChild = appendChild;
/**
 * Append an element after another.
 *
 * @category Manipulation
 * @param elem The element to append after.
 * @param next The element be added.
 */
function append(elem, next) {
    removeElement(next);
    var parent = elem.parent;
    var currNext = elem.next;
    next.next = currNext;
    next.prev = elem;
    elem.next = next;
    next.parent = parent;
    if (currNext) {
        currNext.prev = next;
        if (parent) {
            var childs = parent.children;
            childs.splice(childs.lastIndexOf(currNext), 0, next);
        }
    }
    else if (parent) {
        parent.children.push(next);
    }
}
exports.append = append;
/**
 * Prepend a child to an element.
 *
 * @category Manipulation
 * @param parent The element to prepend before.
 * @param child The element to be added as a child.
 */
function prependChild(parent, child) {
    removeElement(child);
    child.parent = parent;
    child.prev = null;
    if (parent.children.unshift(child) !== 1) {
        var sibling = parent.children[1];
        sibling.prev = child;
        child.next = sibling;
    }
    else {
        child.next = null;
    }
}
exports.prependChild = prependChild;
/**
 * Prepend an element before another.
 *
 * @category Manipulation
 * @param elem The element to prepend before.
 * @param prev The element be added.
 */
function prepend(elem, prev) {
    removeElement(prev);
    var parent = elem.parent;
    if (parent) {
        var childs = parent.children;
        childs.splice(childs.indexOf(elem), 0, prev);
    }
    if (elem.prev) {
        elem.prev.next = prev;
    }
    prev.parent = parent;
    prev.prev = elem.prev;
    prev.next = elem;
    elem.prev = prev;
}
exports.prepend = prepend;
//# sourceMappingURL=manipulation.js.map

/***/ }),

/***/ "./node_modules/domutils/lib/querying.js":
/*!***********************************************!*\
  !*** ./node_modules/domutils/lib/querying.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.findAll = exports.existsOne = exports.findOne = exports.findOneChild = exports.find = exports.filter = void 0;
var domhandler_1 = __webpack_require__(/*! domhandler */ "./node_modules/domhandler/lib/index.js");
/**
 * Search a node and its children for nodes passing a test function. If `node` is not an array, it will be wrapped in one.
 *
 * @category Querying
 * @param test Function to test nodes on.
 * @param node Node to search. Will be included in the result set if it matches.
 * @param recurse Also consider child nodes.
 * @param limit Maximum number of nodes to return.
 * @returns All nodes passing `test`.
 */
function filter(test, node, recurse, limit) {
    if (recurse === void 0) { recurse = true; }
    if (limit === void 0) { limit = Infinity; }
    return find(test, Array.isArray(node) ? node : [node], recurse, limit);
}
exports.filter = filter;
/**
 * Search an array of nodes and their children for nodes passing a test function.
 *
 * @category Querying
 * @param test Function to test nodes on.
 * @param nodes Array of nodes to search.
 * @param recurse Also consider child nodes.
 * @param limit Maximum number of nodes to return.
 * @returns All nodes passing `test`.
 */
function find(test, nodes, recurse, limit) {
    var result = [];
    /** Stack of the arrays we are looking at. */
    var nodeStack = [nodes];
    /** Stack of the indices within the arrays. */
    var indexStack = [0];
    for (;;) {
        // First, check if the current array has any more elements to look at.
        if (indexStack[0] >= nodeStack[0].length) {
            // If we have no more arrays to look at, we are done.
            if (indexStack.length === 1) {
                return result;
            }
            // Otherwise, remove the current array from the stack.
            nodeStack.shift();
            indexStack.shift();
            // Loop back to the start to continue with the next array.
            continue;
        }
        var elem = nodeStack[0][indexStack[0]++];
        if (test(elem)) {
            result.push(elem);
            if (--limit <= 0)
                return result;
        }
        if (recurse && (0, domhandler_1.hasChildren)(elem) && elem.children.length > 0) {
            /*
             * Add the children to the stack. We are depth-first, so this is
             * the next array we look at.
             */
            indexStack.unshift(0);
            nodeStack.unshift(elem.children);
        }
    }
}
exports.find = find;
/**
 * Finds the first element inside of an array that matches a test function. This is an alias for `Array.prototype.find`.
 *
 * @category Querying
 * @param test Function to test nodes on.
 * @param nodes Array of nodes to search.
 * @returns The first node in the array that passes `test`.
 * @deprecated Use `Array.prototype.find` directly.
 */
function findOneChild(test, nodes) {
    return nodes.find(test);
}
exports.findOneChild = findOneChild;
/**
 * Finds one element in a tree that passes a test.
 *
 * @category Querying
 * @param test Function to test nodes on.
 * @param nodes Node or array of nodes to search.
 * @param recurse Also consider child nodes.
 * @returns The first node that passes `test`.
 */
function findOne(test, nodes, recurse) {
    if (recurse === void 0) { recurse = true; }
    var elem = null;
    for (var i = 0; i < nodes.length && !elem; i++) {
        var node = nodes[i];
        if (!(0, domhandler_1.isTag)(node)) {
            continue;
        }
        else if (test(node)) {
            elem = node;
        }
        else if (recurse && node.children.length > 0) {
            elem = findOne(test, node.children, true);
        }
    }
    return elem;
}
exports.findOne = findOne;
/**
 * Checks if a tree of nodes contains at least one node passing a test.
 *
 * @category Querying
 * @param test Function to test nodes on.
 * @param nodes Array of nodes to search.
 * @returns Whether a tree of nodes contains at least one node passing the test.
 */
function existsOne(test, nodes) {
    return nodes.some(function (checked) {
        return (0, domhandler_1.isTag)(checked) &&
            (test(checked) || existsOne(test, checked.children));
    });
}
exports.existsOne = existsOne;
/**
 * Search an array of nodes and their children for elements passing a test function.
 *
 * Same as `find`, but limited to elements and with less options, leading to reduced complexity.
 *
 * @category Querying
 * @param test Function to test nodes on.
 * @param nodes Array of nodes to search.
 * @returns All nodes passing `test`.
 */
function findAll(test, nodes) {
    var result = [];
    var nodeStack = [nodes];
    var indexStack = [0];
    for (;;) {
        if (indexStack[0] >= nodeStack[0].length) {
            if (nodeStack.length === 1) {
                return result;
            }
            // Otherwise, remove the current array from the stack.
            nodeStack.shift();
            indexStack.shift();
            // Loop back to the start to continue with the next array.
            continue;
        }
        var elem = nodeStack[0][indexStack[0]++];
        if (!(0, domhandler_1.isTag)(elem))
            continue;
        if (test(elem))
            result.push(elem);
        if (elem.children.length > 0) {
            indexStack.unshift(0);
            nodeStack.unshift(elem.children);
        }
    }
}
exports.findAll = findAll;
//# sourceMappingURL=querying.js.map

/***/ }),

/***/ "./node_modules/domutils/lib/stringify.js":
/*!************************************************!*\
  !*** ./node_modules/domutils/lib/stringify.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.innerText = exports.textContent = exports.getText = exports.getInnerHTML = exports.getOuterHTML = void 0;
var domhandler_1 = __webpack_require__(/*! domhandler */ "./node_modules/domhandler/lib/index.js");
var dom_serializer_1 = __importDefault(__webpack_require__(/*! dom-serializer */ "./node_modules/dom-serializer/lib/index.js"));
var domelementtype_1 = __webpack_require__(/*! domelementtype */ "./node_modules/domelementtype/lib/index.js");
/**
 * @category Stringify
 * @deprecated Use the `dom-serializer` module directly.
 * @param node Node to get the outer HTML of.
 * @param options Options for serialization.
 * @returns `node`'s outer HTML.
 */
function getOuterHTML(node, options) {
    return (0, dom_serializer_1.default)(node, options);
}
exports.getOuterHTML = getOuterHTML;
/**
 * @category Stringify
 * @deprecated Use the `dom-serializer` module directly.
 * @param node Node to get the inner HTML of.
 * @param options Options for serialization.
 * @returns `node`'s inner HTML.
 */
function getInnerHTML(node, options) {
    return (0, domhandler_1.hasChildren)(node)
        ? node.children.map(function (node) { return getOuterHTML(node, options); }).join("")
        : "";
}
exports.getInnerHTML = getInnerHTML;
/**
 * Get a node's inner text. Same as `textContent`, but inserts newlines for `<br>` tags. Ignores comments.
 *
 * @category Stringify
 * @deprecated Use `textContent` instead.
 * @param node Node to get the inner text of.
 * @returns `node`'s inner text.
 */
function getText(node) {
    if (Array.isArray(node))
        return node.map(getText).join("");
    if ((0, domhandler_1.isTag)(node))
        return node.name === "br" ? "\n" : getText(node.children);
    if ((0, domhandler_1.isCDATA)(node))
        return getText(node.children);
    if ((0, domhandler_1.isText)(node))
        return node.data;
    return "";
}
exports.getText = getText;
/**
 * Get a node's text content. Ignores comments.
 *
 * @category Stringify
 * @param node Node to get the text content of.
 * @returns `node`'s text content.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent}
 */
function textContent(node) {
    if (Array.isArray(node))
        return node.map(textContent).join("");
    if ((0, domhandler_1.hasChildren)(node) && !(0, domhandler_1.isComment)(node)) {
        return textContent(node.children);
    }
    if ((0, domhandler_1.isText)(node))
        return node.data;
    return "";
}
exports.textContent = textContent;
/**
 * Get a node's inner text, ignoring `<script>` and `<style>` tags. Ignores comments.
 *
 * @category Stringify
 * @param node Node to get the inner text of.
 * @returns `node`'s inner text.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/innerText}
 */
function innerText(node) {
    if (Array.isArray(node))
        return node.map(innerText).join("");
    if ((0, domhandler_1.hasChildren)(node) && (node.type === domelementtype_1.ElementType.Tag || (0, domhandler_1.isCDATA)(node))) {
        return innerText(node.children);
    }
    if ((0, domhandler_1.isText)(node))
        return node.data;
    return "";
}
exports.innerText = innerText;
//# sourceMappingURL=stringify.js.map

/***/ }),

/***/ "./node_modules/domutils/lib/traversal.js":
/*!************************************************!*\
  !*** ./node_modules/domutils/lib/traversal.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.prevElementSibling = exports.nextElementSibling = exports.getName = exports.hasAttrib = exports.getAttributeValue = exports.getSiblings = exports.getParent = exports.getChildren = void 0;
var domhandler_1 = __webpack_require__(/*! domhandler */ "./node_modules/domhandler/lib/index.js");
/**
 * Get a node's children.
 *
 * @category Traversal
 * @param elem Node to get the children of.
 * @returns `elem`'s children, or an empty array.
 */
function getChildren(elem) {
    return (0, domhandler_1.hasChildren)(elem) ? elem.children : [];
}
exports.getChildren = getChildren;
/**
 * Get a node's parent.
 *
 * @category Traversal
 * @param elem Node to get the parent of.
 * @returns `elem`'s parent node, or `null` if `elem` is a root node.
 */
function getParent(elem) {
    return elem.parent || null;
}
exports.getParent = getParent;
/**
 * Gets an elements siblings, including the element itself.
 *
 * Attempts to get the children through the element's parent first. If we don't
 * have a parent (the element is a root node), we walk the element's `prev` &
 * `next` to get all remaining nodes.
 *
 * @category Traversal
 * @param elem Element to get the siblings of.
 * @returns `elem`'s siblings, including `elem`.
 */
function getSiblings(elem) {
    var _a, _b;
    var parent = getParent(elem);
    if (parent != null)
        return getChildren(parent);
    var siblings = [elem];
    var prev = elem.prev, next = elem.next;
    while (prev != null) {
        siblings.unshift(prev);
        (_a = prev, prev = _a.prev);
    }
    while (next != null) {
        siblings.push(next);
        (_b = next, next = _b.next);
    }
    return siblings;
}
exports.getSiblings = getSiblings;
/**
 * Gets an attribute from an element.
 *
 * @category Traversal
 * @param elem Element to check.
 * @param name Attribute name to retrieve.
 * @returns The element's attribute value, or `undefined`.
 */
function getAttributeValue(elem, name) {
    var _a;
    return (_a = elem.attribs) === null || _a === void 0 ? void 0 : _a[name];
}
exports.getAttributeValue = getAttributeValue;
/**
 * Checks whether an element has an attribute.
 *
 * @category Traversal
 * @param elem Element to check.
 * @param name Attribute name to look for.
 * @returns Returns whether `elem` has the attribute `name`.
 */
function hasAttrib(elem, name) {
    return (elem.attribs != null &&
        Object.prototype.hasOwnProperty.call(elem.attribs, name) &&
        elem.attribs[name] != null);
}
exports.hasAttrib = hasAttrib;
/**
 * Get the tag name of an element.
 *
 * @category Traversal
 * @param elem The element to get the name for.
 * @returns The tag name of `elem`.
 */
function getName(elem) {
    return elem.name;
}
exports.getName = getName;
/**
 * Returns the next element sibling of a node.
 *
 * @category Traversal
 * @param elem The element to get the next sibling of.
 * @returns `elem`'s next sibling that is a tag, or `null` if there is no next
 * sibling.
 */
function nextElementSibling(elem) {
    var _a;
    var next = elem.next;
    while (next !== null && !(0, domhandler_1.isTag)(next))
        (_a = next, next = _a.next);
    return next;
}
exports.nextElementSibling = nextElementSibling;
/**
 * Returns the previous element sibling of a node.
 *
 * @category Traversal
 * @param elem The element to get the previous sibling of.
 * @returns `elem`'s previous sibling that is a tag, or `null` if there is no
 * previous sibling.
 */
function prevElementSibling(elem) {
    var _a;
    var prev = elem.prev;
    while (prev !== null && !(0, domhandler_1.isTag)(prev))
        (_a = prev, prev = _a.prev);
    return prev;
}
exports.prevElementSibling = prevElementSibling;
//# sourceMappingURL=traversal.js.map

/***/ }),

/***/ "./node_modules/entities/lib/decode.js":
/*!*********************************************!*\
  !*** ./node_modules/entities/lib/decode.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.decodeXML = exports.decodeHTMLStrict = exports.decodeHTMLAttribute = exports.decodeHTML = exports.determineBranch = exports.EntityDecoder = exports.DecodingMode = exports.BinTrieFlags = exports.fromCodePoint = exports.replaceCodePoint = exports.decodeCodePoint = exports.xmlDecodeTree = exports.htmlDecodeTree = void 0;
var decode_data_html_js_1 = __importDefault(__webpack_require__(/*! ./generated/decode-data-html.js */ "./node_modules/entities/lib/generated/decode-data-html.js"));
exports.htmlDecodeTree = decode_data_html_js_1.default;
var decode_data_xml_js_1 = __importDefault(__webpack_require__(/*! ./generated/decode-data-xml.js */ "./node_modules/entities/lib/generated/decode-data-xml.js"));
exports.xmlDecodeTree = decode_data_xml_js_1.default;
var decode_codepoint_js_1 = __importStar(__webpack_require__(/*! ./decode_codepoint.js */ "./node_modules/entities/lib/decode_codepoint.js"));
exports.decodeCodePoint = decode_codepoint_js_1.default;
var decode_codepoint_js_2 = __webpack_require__(/*! ./decode_codepoint.js */ "./node_modules/entities/lib/decode_codepoint.js");
Object.defineProperty(exports, "replaceCodePoint", ({ enumerable: true, get: function () { return decode_codepoint_js_2.replaceCodePoint; } }));
Object.defineProperty(exports, "fromCodePoint", ({ enumerable: true, get: function () { return decode_codepoint_js_2.fromCodePoint; } }));
var CharCodes;
(function (CharCodes) {
    CharCodes[CharCodes["NUM"] = 35] = "NUM";
    CharCodes[CharCodes["SEMI"] = 59] = "SEMI";
    CharCodes[CharCodes["EQUALS"] = 61] = "EQUALS";
    CharCodes[CharCodes["ZERO"] = 48] = "ZERO";
    CharCodes[CharCodes["NINE"] = 57] = "NINE";
    CharCodes[CharCodes["LOWER_A"] = 97] = "LOWER_A";
    CharCodes[CharCodes["LOWER_F"] = 102] = "LOWER_F";
    CharCodes[CharCodes["LOWER_X"] = 120] = "LOWER_X";
    CharCodes[CharCodes["LOWER_Z"] = 122] = "LOWER_Z";
    CharCodes[CharCodes["UPPER_A"] = 65] = "UPPER_A";
    CharCodes[CharCodes["UPPER_F"] = 70] = "UPPER_F";
    CharCodes[CharCodes["UPPER_Z"] = 90] = "UPPER_Z";
})(CharCodes || (CharCodes = {}));
/** Bit that needs to be set to convert an upper case ASCII character to lower case */
var TO_LOWER_BIT = 32;
var BinTrieFlags;
(function (BinTrieFlags) {
    BinTrieFlags[BinTrieFlags["VALUE_LENGTH"] = 49152] = "VALUE_LENGTH";
    BinTrieFlags[BinTrieFlags["BRANCH_LENGTH"] = 16256] = "BRANCH_LENGTH";
    BinTrieFlags[BinTrieFlags["JUMP_TABLE"] = 127] = "JUMP_TABLE";
})(BinTrieFlags = exports.BinTrieFlags || (exports.BinTrieFlags = {}));
function isNumber(code) {
    return code >= CharCodes.ZERO && code <= CharCodes.NINE;
}
function isHexadecimalCharacter(code) {
    return ((code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_F) ||
        (code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_F));
}
function isAsciiAlphaNumeric(code) {
    return ((code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_Z) ||
        (code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_Z) ||
        isNumber(code));
}
/**
 * Checks if the given character is a valid end character for an entity in an attribute.
 *
 * Attribute values that aren't terminated properly aren't parsed, and shouldn't lead to a parser error.
 * See the example in https://html.spec.whatwg.org/multipage/parsing.html#named-character-reference-state
 */
function isEntityInAttributeInvalidEnd(code) {
    return code === CharCodes.EQUALS || isAsciiAlphaNumeric(code);
}
var EntityDecoderState;
(function (EntityDecoderState) {
    EntityDecoderState[EntityDecoderState["EntityStart"] = 0] = "EntityStart";
    EntityDecoderState[EntityDecoderState["NumericStart"] = 1] = "NumericStart";
    EntityDecoderState[EntityDecoderState["NumericDecimal"] = 2] = "NumericDecimal";
    EntityDecoderState[EntityDecoderState["NumericHex"] = 3] = "NumericHex";
    EntityDecoderState[EntityDecoderState["NamedEntity"] = 4] = "NamedEntity";
})(EntityDecoderState || (EntityDecoderState = {}));
var DecodingMode;
(function (DecodingMode) {
    /** Entities in text nodes that can end with any character. */
    DecodingMode[DecodingMode["Legacy"] = 0] = "Legacy";
    /** Only allow entities terminated with a semicolon. */
    DecodingMode[DecodingMode["Strict"] = 1] = "Strict";
    /** Entities in attributes have limitations on ending characters. */
    DecodingMode[DecodingMode["Attribute"] = 2] = "Attribute";
})(DecodingMode = exports.DecodingMode || (exports.DecodingMode = {}));
/**
 * Token decoder with support of writing partial entities.
 */
var EntityDecoder = /** @class */ (function () {
    function EntityDecoder(
    /** The tree used to decode entities. */
    decodeTree, 
    /**
     * The function that is called when a codepoint is decoded.
     *
     * For multi-byte named entities, this will be called multiple times,
     * with the second codepoint, and the same `consumed` value.
     *
     * @param codepoint The decoded codepoint.
     * @param consumed The number of bytes consumed by the decoder.
     */
    emitCodePoint, 
    /** An object that is used to produce errors. */
    errors) {
        this.decodeTree = decodeTree;
        this.emitCodePoint = emitCodePoint;
        this.errors = errors;
        /** The current state of the decoder. */
        this.state = EntityDecoderState.EntityStart;
        /** Characters that were consumed while parsing an entity. */
        this.consumed = 1;
        /**
         * The result of the entity.
         *
         * Either the result index of a numeric entity, or the codepoint of a
         * numeric entity.
         */
        this.result = 0;
        /** The current index in the decode tree. */
        this.treeIndex = 0;
        /** The number of characters that were consumed in excess. */
        this.excess = 1;
        /** The mode in which the decoder is operating. */
        this.decodeMode = DecodingMode.Strict;
    }
    /** Resets the instance to make it reusable. */
    EntityDecoder.prototype.startEntity = function (decodeMode) {
        this.decodeMode = decodeMode;
        this.state = EntityDecoderState.EntityStart;
        this.result = 0;
        this.treeIndex = 0;
        this.excess = 1;
        this.consumed = 1;
    };
    /**
     * Write an entity to the decoder. This can be called multiple times with partial entities.
     * If the entity is incomplete, the decoder will return -1.
     *
     * Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
     * entity is incomplete, and resume when the next string is written.
     *
     * @param string The string containing the entity (or a continuation of the entity).
     * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    EntityDecoder.prototype.write = function (str, offset) {
        switch (this.state) {
            case EntityDecoderState.EntityStart: {
                if (str.charCodeAt(offset) === CharCodes.NUM) {
                    this.state = EntityDecoderState.NumericStart;
                    this.consumed += 1;
                    return this.stateNumericStart(str, offset + 1);
                }
                this.state = EntityDecoderState.NamedEntity;
                return this.stateNamedEntity(str, offset);
            }
            case EntityDecoderState.NumericStart: {
                return this.stateNumericStart(str, offset);
            }
            case EntityDecoderState.NumericDecimal: {
                return this.stateNumericDecimal(str, offset);
            }
            case EntityDecoderState.NumericHex: {
                return this.stateNumericHex(str, offset);
            }
            case EntityDecoderState.NamedEntity: {
                return this.stateNamedEntity(str, offset);
            }
        }
    };
    /**
     * Switches between the numeric decimal and hexadecimal states.
     *
     * Equivalent to the `Numeric character reference state` in the HTML spec.
     *
     * @param str The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    EntityDecoder.prototype.stateNumericStart = function (str, offset) {
        if (offset >= str.length) {
            return -1;
        }
        if ((str.charCodeAt(offset) | TO_LOWER_BIT) === CharCodes.LOWER_X) {
            this.state = EntityDecoderState.NumericHex;
            this.consumed += 1;
            return this.stateNumericHex(str, offset + 1);
        }
        this.state = EntityDecoderState.NumericDecimal;
        return this.stateNumericDecimal(str, offset);
    };
    EntityDecoder.prototype.addToNumericResult = function (str, start, end, base) {
        if (start !== end) {
            var digitCount = end - start;
            this.result =
                this.result * Math.pow(base, digitCount) +
                    parseInt(str.substr(start, digitCount), base);
            this.consumed += digitCount;
        }
    };
    /**
     * Parses a hexadecimal numeric entity.
     *
     * Equivalent to the `Hexademical character reference state` in the HTML spec.
     *
     * @param str The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    EntityDecoder.prototype.stateNumericHex = function (str, offset) {
        var startIdx = offset;
        while (offset < str.length) {
            var char = str.charCodeAt(offset);
            if (isNumber(char) || isHexadecimalCharacter(char)) {
                offset += 1;
            }
            else {
                this.addToNumericResult(str, startIdx, offset, 16);
                return this.emitNumericEntity(char, 3);
            }
        }
        this.addToNumericResult(str, startIdx, offset, 16);
        return -1;
    };
    /**
     * Parses a decimal numeric entity.
     *
     * Equivalent to the `Decimal character reference state` in the HTML spec.
     *
     * @param str The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    EntityDecoder.prototype.stateNumericDecimal = function (str, offset) {
        var startIdx = offset;
        while (offset < str.length) {
            var char = str.charCodeAt(offset);
            if (isNumber(char)) {
                offset += 1;
            }
            else {
                this.addToNumericResult(str, startIdx, offset, 10);
                return this.emitNumericEntity(char, 2);
            }
        }
        this.addToNumericResult(str, startIdx, offset, 10);
        return -1;
    };
    /**
     * Validate and emit a numeric entity.
     *
     * Implements the logic from the `Hexademical character reference start
     * state` and `Numeric character reference end state` in the HTML spec.
     *
     * @param lastCp The last code point of the entity. Used to see if the
     *               entity was terminated with a semicolon.
     * @param expectedLength The minimum number of characters that should be
     *                       consumed. Used to validate that at least one digit
     *                       was consumed.
     * @returns The number of characters that were consumed.
     */
    EntityDecoder.prototype.emitNumericEntity = function (lastCp, expectedLength) {
        var _a;
        // Ensure we consumed at least one digit.
        if (this.consumed <= expectedLength) {
            (_a = this.errors) === null || _a === void 0 ? void 0 : _a.absenceOfDigitsInNumericCharacterReference(this.consumed);
            return 0;
        }
        // Figure out if this is a legit end of the entity
        if (lastCp === CharCodes.SEMI) {
            this.consumed += 1;
        }
        else if (this.decodeMode === DecodingMode.Strict) {
            return 0;
        }
        this.emitCodePoint((0, decode_codepoint_js_1.replaceCodePoint)(this.result), this.consumed);
        if (this.errors) {
            if (lastCp !== CharCodes.SEMI) {
                this.errors.missingSemicolonAfterCharacterReference();
            }
            this.errors.validateNumericCharacterReference(this.result);
        }
        return this.consumed;
    };
    /**
     * Parses a named entity.
     *
     * Equivalent to the `Named character reference state` in the HTML spec.
     *
     * @param str The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    EntityDecoder.prototype.stateNamedEntity = function (str, offset) {
        var decodeTree = this.decodeTree;
        var current = decodeTree[this.treeIndex];
        // The mask is the number of bytes of the value, including the current byte.
        var valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
        for (; offset < str.length; offset++, this.excess++) {
            var char = str.charCodeAt(offset);
            this.treeIndex = determineBranch(decodeTree, current, this.treeIndex + Math.max(1, valueLength), char);
            if (this.treeIndex < 0) {
                return this.result === 0 ||
                    // If we are parsing an attribute
                    (this.decodeMode === DecodingMode.Attribute &&
                        // We shouldn't have consumed any characters after the entity,
                        (valueLength === 0 ||
                            // And there should be no invalid characters.
                            isEntityInAttributeInvalidEnd(char)))
                    ? 0
                    : this.emitNotTerminatedNamedEntity();
            }
            current = decodeTree[this.treeIndex];
            valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
            // If the branch is a value, store it and continue
            if (valueLength !== 0) {
                // If the entity is terminated by a semicolon, we are done.
                if (char === CharCodes.SEMI) {
                    return this.emitNamedEntityData(this.treeIndex, valueLength, this.consumed + this.excess);
                }
                // If we encounter a non-terminated (legacy) entity while parsing strictly, then ignore it.
                if (this.decodeMode !== DecodingMode.Strict) {
                    this.result = this.treeIndex;
                    this.consumed += this.excess;
                    this.excess = 0;
                }
            }
        }
        return -1;
    };
    /**
     * Emit a named entity that was not terminated with a semicolon.
     *
     * @returns The number of characters consumed.
     */
    EntityDecoder.prototype.emitNotTerminatedNamedEntity = function () {
        var _a;
        var _b = this, result = _b.result, decodeTree = _b.decodeTree;
        var valueLength = (decodeTree[result] & BinTrieFlags.VALUE_LENGTH) >> 14;
        this.emitNamedEntityData(result, valueLength, this.consumed);
        (_a = this.errors) === null || _a === void 0 ? void 0 : _a.missingSemicolonAfterCharacterReference();
        return this.consumed;
    };
    /**
     * Emit a named entity.
     *
     * @param result The index of the entity in the decode tree.
     * @param valueLength The number of bytes in the entity.
     * @param consumed The number of characters consumed.
     *
     * @returns The number of characters consumed.
     */
    EntityDecoder.prototype.emitNamedEntityData = function (result, valueLength, consumed) {
        var decodeTree = this.decodeTree;
        this.emitCodePoint(valueLength === 1
            ? decodeTree[result] & ~BinTrieFlags.VALUE_LENGTH
            : decodeTree[result + 1], consumed);
        if (valueLength === 3) {
            // For multi-byte values, we need to emit the second byte.
            this.emitCodePoint(decodeTree[result + 2], consumed);
        }
        return consumed;
    };
    /**
     * Signal to the parser that the end of the input was reached.
     *
     * Remaining data will be emitted and relevant errors will be produced.
     *
     * @returns The number of characters consumed.
     */
    EntityDecoder.prototype.end = function () {
        var _a;
        switch (this.state) {
            case EntityDecoderState.NamedEntity: {
                // Emit a named entity if we have one.
                return this.result !== 0 &&
                    (this.decodeMode !== DecodingMode.Attribute ||
                        this.result === this.treeIndex)
                    ? this.emitNotTerminatedNamedEntity()
                    : 0;
            }
            // Otherwise, emit a numeric entity if we have one.
            case EntityDecoderState.NumericDecimal: {
                return this.emitNumericEntity(0, 2);
            }
            case EntityDecoderState.NumericHex: {
                return this.emitNumericEntity(0, 3);
            }
            case EntityDecoderState.NumericStart: {
                (_a = this.errors) === null || _a === void 0 ? void 0 : _a.absenceOfDigitsInNumericCharacterReference(this.consumed);
                return 0;
            }
            case EntityDecoderState.EntityStart: {
                // Return 0 if we have no entity.
                return 0;
            }
        }
    };
    return EntityDecoder;
}());
exports.EntityDecoder = EntityDecoder;
/**
 * Creates a function that decodes entities in a string.
 *
 * @param decodeTree The decode tree.
 * @returns A function that decodes entities in a string.
 */
function getDecoder(decodeTree) {
    var ret = "";
    var decoder = new EntityDecoder(decodeTree, function (str) { return (ret += (0, decode_codepoint_js_1.fromCodePoint)(str)); });
    return function decodeWithTrie(str, decodeMode) {
        var lastIndex = 0;
        var offset = 0;
        while ((offset = str.indexOf("&", offset)) >= 0) {
            ret += str.slice(lastIndex, offset);
            decoder.startEntity(decodeMode);
            var len = decoder.write(str, 
            // Skip the "&"
            offset + 1);
            if (len < 0) {
                lastIndex = offset + decoder.end();
                break;
            }
            lastIndex = offset + len;
            // If `len` is 0, skip the current `&` and continue.
            offset = len === 0 ? lastIndex + 1 : lastIndex;
        }
        var result = ret + str.slice(lastIndex);
        // Make sure we don't keep a reference to the final string.
        ret = "";
        return result;
    };
}
/**
 * Determines the branch of the current node that is taken given the current
 * character. This function is used to traverse the trie.
 *
 * @param decodeTree The trie.
 * @param current The current node.
 * @param nodeIdx The index right after the current node and its value.
 * @param char The current character.
 * @returns The index of the next node, or -1 if no branch is taken.
 */
function determineBranch(decodeTree, current, nodeIdx, char) {
    var branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
    var jumpOffset = current & BinTrieFlags.JUMP_TABLE;
    // Case 1: Single branch encoded in jump offset
    if (branchCount === 0) {
        return jumpOffset !== 0 && char === jumpOffset ? nodeIdx : -1;
    }
    // Case 2: Multiple branches encoded in jump table
    if (jumpOffset) {
        var value = char - jumpOffset;
        return value < 0 || value >= branchCount
            ? -1
            : decodeTree[nodeIdx + value] - 1;
    }
    // Case 3: Multiple branches encoded in dictionary
    // Binary search for the character.
    var lo = nodeIdx;
    var hi = lo + branchCount - 1;
    while (lo <= hi) {
        var mid = (lo + hi) >>> 1;
        var midVal = decodeTree[mid];
        if (midVal < char) {
            lo = mid + 1;
        }
        else if (midVal > char) {
            hi = mid - 1;
        }
        else {
            return decodeTree[mid + branchCount];
        }
    }
    return -1;
}
exports.determineBranch = determineBranch;
var htmlDecoder = getDecoder(decode_data_html_js_1.default);
var xmlDecoder = getDecoder(decode_data_xml_js_1.default);
/**
 * Decodes an HTML string.
 *
 * @param str The string to decode.
 * @param mode The decoding mode.
 * @returns The decoded string.
 */
function decodeHTML(str, mode) {
    if (mode === void 0) { mode = DecodingMode.Legacy; }
    return htmlDecoder(str, mode);
}
exports.decodeHTML = decodeHTML;
/**
 * Decodes an HTML string in an attribute.
 *
 * @param str The string to decode.
 * @returns The decoded string.
 */
function decodeHTMLAttribute(str) {
    return htmlDecoder(str, DecodingMode.Attribute);
}
exports.decodeHTMLAttribute = decodeHTMLAttribute;
/**
 * Decodes an HTML string, requiring all entities to be terminated by a semicolon.
 *
 * @param str The string to decode.
 * @returns The decoded string.
 */
function decodeHTMLStrict(str) {
    return htmlDecoder(str, DecodingMode.Strict);
}
exports.decodeHTMLStrict = decodeHTMLStrict;
/**
 * Decodes an XML string, requiring all entities to be terminated by a semicolon.
 *
 * @param str The string to decode.
 * @returns The decoded string.
 */
function decodeXML(str) {
    return xmlDecoder(str, DecodingMode.Strict);
}
exports.decodeXML = decodeXML;
//# sourceMappingURL=decode.js.map

/***/ }),

/***/ "./node_modules/entities/lib/decode_codepoint.js":
/*!*******************************************************!*\
  !*** ./node_modules/entities/lib/decode_codepoint.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

// Adapted from https://github.com/mathiasbynens/he/blob/36afe179392226cf1b6ccdb16ebbb7a5a844d93a/src/he.js#L106-L134
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.replaceCodePoint = exports.fromCodePoint = void 0;
var decodeMap = new Map([
    [0, 65533],
    // C1 Unicode control character reference replacements
    [128, 8364],
    [130, 8218],
    [131, 402],
    [132, 8222],
    [133, 8230],
    [134, 8224],
    [135, 8225],
    [136, 710],
    [137, 8240],
    [138, 352],
    [139, 8249],
    [140, 338],
    [142, 381],
    [145, 8216],
    [146, 8217],
    [147, 8220],
    [148, 8221],
    [149, 8226],
    [150, 8211],
    [151, 8212],
    [152, 732],
    [153, 8482],
    [154, 353],
    [155, 8250],
    [156, 339],
    [158, 382],
    [159, 376],
]);
/**
 * Polyfill for `String.fromCodePoint`. It is used to create a string from a Unicode code point.
 */
exports.fromCodePoint = 
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, node/no-unsupported-features/es-builtins
(_a = String.fromCodePoint) !== null && _a !== void 0 ? _a : function (codePoint) {
    var output = "";
    if (codePoint > 0xffff) {
        codePoint -= 0x10000;
        output += String.fromCharCode(((codePoint >>> 10) & 0x3ff) | 0xd800);
        codePoint = 0xdc00 | (codePoint & 0x3ff);
    }
    output += String.fromCharCode(codePoint);
    return output;
};
/**
 * Replace the given code point with a replacement character if it is a
 * surrogate or is outside the valid range. Otherwise return the code
 * point unchanged.
 */
function replaceCodePoint(codePoint) {
    var _a;
    if ((codePoint >= 0xd800 && codePoint <= 0xdfff) || codePoint > 0x10ffff) {
        return 0xfffd;
    }
    return (_a = decodeMap.get(codePoint)) !== null && _a !== void 0 ? _a : codePoint;
}
exports.replaceCodePoint = replaceCodePoint;
/**
 * Replace the code point if relevant, then convert it to a string.
 *
 * @deprecated Use `fromCodePoint(replaceCodePoint(codePoint))` instead.
 * @param codePoint The code point to decode.
 * @returns The decoded code point.
 */
function decodeCodePoint(codePoint) {
    return (0, exports.fromCodePoint)(replaceCodePoint(codePoint));
}
exports["default"] = decodeCodePoint;
//# sourceMappingURL=decode_codepoint.js.map

/***/ }),

/***/ "./node_modules/entities/lib/encode.js":
/*!*********************************************!*\
  !*** ./node_modules/entities/lib/encode.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.encodeNonAsciiHTML = exports.encodeHTML = void 0;
var encode_html_js_1 = __importDefault(__webpack_require__(/*! ./generated/encode-html.js */ "./node_modules/entities/lib/generated/encode-html.js"));
var escape_js_1 = __webpack_require__(/*! ./escape.js */ "./node_modules/entities/lib/escape.js");
var htmlReplacer = /[\t\n!-,./:-@[-`\f{-}$\x80-\uFFFF]/g;
/**
 * Encodes all characters in the input using HTML entities. This includes
 * characters that are valid ASCII characters in HTML documents, such as `#`.
 *
 * To get a more compact output, consider using the `encodeNonAsciiHTML`
 * function, which will only encode characters that are not valid in HTML
 * documents, as well as non-ASCII characters.
 *
 * If a character has no equivalent entity, a numeric hexadecimal reference
 * (eg. `&#xfc;`) will be used.
 */
function encodeHTML(data) {
    return encodeHTMLTrieRe(htmlReplacer, data);
}
exports.encodeHTML = encodeHTML;
/**
 * Encodes all non-ASCII characters, as well as characters not valid in HTML
 * documents using HTML entities. This function will not encode characters that
 * are valid in HTML documents, such as `#`.
 *
 * If a character has no equivalent entity, a numeric hexadecimal reference
 * (eg. `&#xfc;`) will be used.
 */
function encodeNonAsciiHTML(data) {
    return encodeHTMLTrieRe(escape_js_1.xmlReplacer, data);
}
exports.encodeNonAsciiHTML = encodeNonAsciiHTML;
function encodeHTMLTrieRe(regExp, str) {
    var ret = "";
    var lastIdx = 0;
    var match;
    while ((match = regExp.exec(str)) !== null) {
        var i = match.index;
        ret += str.substring(lastIdx, i);
        var char = str.charCodeAt(i);
        var next = encode_html_js_1.default.get(char);
        if (typeof next === "object") {
            // We are in a branch. Try to match the next char.
            if (i + 1 < str.length) {
                var nextChar = str.charCodeAt(i + 1);
                var value = typeof next.n === "number"
                    ? next.n === nextChar
                        ? next.o
                        : undefined
                    : next.n.get(nextChar);
                if (value !== undefined) {
                    ret += value;
                    lastIdx = regExp.lastIndex += 1;
                    continue;
                }
            }
            next = next.v;
        }
        // We might have a tree node without a value; skip and use a numeric entity.
        if (next !== undefined) {
            ret += next;
            lastIdx = i + 1;
        }
        else {
            var cp = (0, escape_js_1.getCodePoint)(str, i);
            ret += "&#x".concat(cp.toString(16), ";");
            // Increase by 1 if we have a surrogate pair
            lastIdx = regExp.lastIndex += Number(cp !== char);
        }
    }
    return ret + str.substr(lastIdx);
}
//# sourceMappingURL=encode.js.map

/***/ }),

/***/ "./node_modules/entities/lib/escape.js":
/*!*********************************************!*\
  !*** ./node_modules/entities/lib/escape.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.escapeText = exports.escapeAttribute = exports.escapeUTF8 = exports.escape = exports.encodeXML = exports.getCodePoint = exports.xmlReplacer = void 0;
exports.xmlReplacer = /["&'<>$\x80-\uFFFF]/g;
var xmlCodeMap = new Map([
    [34, "&quot;"],
    [38, "&amp;"],
    [39, "&apos;"],
    [60, "&lt;"],
    [62, "&gt;"],
]);
// For compatibility with node < 4, we wrap `codePointAt`
exports.getCodePoint = 
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
String.prototype.codePointAt != null
    ? function (str, index) { return str.codePointAt(index); }
    : // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
        function (c, index) {
            return (c.charCodeAt(index) & 0xfc00) === 0xd800
                ? (c.charCodeAt(index) - 0xd800) * 0x400 +
                    c.charCodeAt(index + 1) -
                    0xdc00 +
                    0x10000
                : c.charCodeAt(index);
        };
/**
 * Encodes all non-ASCII characters, as well as characters not valid in XML
 * documents using XML entities.
 *
 * If a character has no equivalent entity, a
 * numeric hexadecimal reference (eg. `&#xfc;`) will be used.
 */
function encodeXML(str) {
    var ret = "";
    var lastIdx = 0;
    var match;
    while ((match = exports.xmlReplacer.exec(str)) !== null) {
        var i = match.index;
        var char = str.charCodeAt(i);
        var next = xmlCodeMap.get(char);
        if (next !== undefined) {
            ret += str.substring(lastIdx, i) + next;
            lastIdx = i + 1;
        }
        else {
            ret += "".concat(str.substring(lastIdx, i), "&#x").concat((0, exports.getCodePoint)(str, i).toString(16), ";");
            // Increase by 1 if we have a surrogate pair
            lastIdx = exports.xmlReplacer.lastIndex += Number((char & 0xfc00) === 0xd800);
        }
    }
    return ret + str.substr(lastIdx);
}
exports.encodeXML = encodeXML;
/**
 * Encodes all non-ASCII characters, as well as characters not valid in XML
 * documents using numeric hexadecimal reference (eg. `&#xfc;`).
 *
 * Have a look at `escapeUTF8` if you want a more concise output at the expense
 * of reduced transportability.
 *
 * @param data String to escape.
 */
exports.escape = encodeXML;
/**
 * Creates a function that escapes all characters matched by the given regular
 * expression using the given map of characters to escape to their entities.
 *
 * @param regex Regular expression to match characters to escape.
 * @param map Map of characters to escape to their entities.
 *
 * @returns Function that escapes all characters matched by the given regular
 * expression using the given map of characters to escape to their entities.
 */
function getEscaper(regex, map) {
    return function escape(data) {
        var match;
        var lastIdx = 0;
        var result = "";
        while ((match = regex.exec(data))) {
            if (lastIdx !== match.index) {
                result += data.substring(lastIdx, match.index);
            }
            // We know that this character will be in the map.
            result += map.get(match[0].charCodeAt(0));
            // Every match will be of length 1
            lastIdx = match.index + 1;
        }
        return result + data.substring(lastIdx);
    };
}
/**
 * Encodes all characters not valid in XML documents using XML entities.
 *
 * Note that the output will be character-set dependent.
 *
 * @param data String to escape.
 */
exports.escapeUTF8 = getEscaper(/[&<>'"]/g, xmlCodeMap);
/**
 * Encodes all characters that have to be escaped in HTML attributes,
 * following {@link https://html.spec.whatwg.org/multipage/parsing.html#escapingString}.
 *
 * @param data String to escape.
 */
exports.escapeAttribute = getEscaper(/["&\u00A0]/g, new Map([
    [34, "&quot;"],
    [38, "&amp;"],
    [160, "&nbsp;"],
]));
/**
 * Encodes all characters that have to be escaped in HTML text,
 * following {@link https://html.spec.whatwg.org/multipage/parsing.html#escapingString}.
 *
 * @param data String to escape.
 */
exports.escapeText = getEscaper(/[&<>\u00A0]/g, new Map([
    [38, "&amp;"],
    [60, "&lt;"],
    [62, "&gt;"],
    [160, "&nbsp;"],
]));
//# sourceMappingURL=escape.js.map

/***/ }),

/***/ "./node_modules/entities/lib/generated/decode-data-html.js":
/*!*****************************************************************!*\
  !*** ./node_modules/entities/lib/generated/decode-data-html.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

// Generated using scripts/write-decode-map.ts
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = new Uint16Array(
// prettier-ignore
"\u1d41<\xd5\u0131\u028a\u049d\u057b\u05d0\u0675\u06de\u07a2\u07d6\u080f\u0a4a\u0a91\u0da1\u0e6d\u0f09\u0f26\u10ca\u1228\u12e1\u1415\u149d\u14c3\u14df\u1525\0\0\0\0\0\0\u156b\u16cd\u198d\u1c12\u1ddd\u1f7e\u2060\u21b0\u228d\u23c0\u23fb\u2442\u2824\u2912\u2d08\u2e48\u2fce\u3016\u32ba\u3639\u37ac\u38fe\u3a28\u3a71\u3ae0\u3b2e\u0800EMabcfglmnoprstu\\bfms\x7f\x84\x8b\x90\x95\x98\xa6\xb3\xb9\xc8\xcflig\u803b\xc6\u40c6P\u803b&\u4026cute\u803b\xc1\u40c1reve;\u4102\u0100iyx}rc\u803b\xc2\u40c2;\u4410r;\uc000\ud835\udd04rave\u803b\xc0\u40c0pha;\u4391acr;\u4100d;\u6a53\u0100gp\x9d\xa1on;\u4104f;\uc000\ud835\udd38plyFunction;\u6061ing\u803b\xc5\u40c5\u0100cs\xbe\xc3r;\uc000\ud835\udc9cign;\u6254ilde\u803b\xc3\u40c3ml\u803b\xc4\u40c4\u0400aceforsu\xe5\xfb\xfe\u0117\u011c\u0122\u0127\u012a\u0100cr\xea\xf2kslash;\u6216\u0176\xf6\xf8;\u6ae7ed;\u6306y;\u4411\u0180crt\u0105\u010b\u0114ause;\u6235noullis;\u612ca;\u4392r;\uc000\ud835\udd05pf;\uc000\ud835\udd39eve;\u42d8c\xf2\u0113mpeq;\u624e\u0700HOacdefhilorsu\u014d\u0151\u0156\u0180\u019e\u01a2\u01b5\u01b7\u01ba\u01dc\u0215\u0273\u0278\u027ecy;\u4427PY\u803b\xa9\u40a9\u0180cpy\u015d\u0162\u017aute;\u4106\u0100;i\u0167\u0168\u62d2talDifferentialD;\u6145leys;\u612d\u0200aeio\u0189\u018e\u0194\u0198ron;\u410cdil\u803b\xc7\u40c7rc;\u4108nint;\u6230ot;\u410a\u0100dn\u01a7\u01adilla;\u40b8terDot;\u40b7\xf2\u017fi;\u43a7rcle\u0200DMPT\u01c7\u01cb\u01d1\u01d6ot;\u6299inus;\u6296lus;\u6295imes;\u6297o\u0100cs\u01e2\u01f8kwiseContourIntegral;\u6232eCurly\u0100DQ\u0203\u020foubleQuote;\u601duote;\u6019\u0200lnpu\u021e\u0228\u0247\u0255on\u0100;e\u0225\u0226\u6237;\u6a74\u0180git\u022f\u0236\u023aruent;\u6261nt;\u622fourIntegral;\u622e\u0100fr\u024c\u024e;\u6102oduct;\u6210nterClockwiseContourIntegral;\u6233oss;\u6a2fcr;\uc000\ud835\udc9ep\u0100;C\u0284\u0285\u62d3ap;\u624d\u0580DJSZacefios\u02a0\u02ac\u02b0\u02b4\u02b8\u02cb\u02d7\u02e1\u02e6\u0333\u048d\u0100;o\u0179\u02a5trahd;\u6911cy;\u4402cy;\u4405cy;\u440f\u0180grs\u02bf\u02c4\u02c7ger;\u6021r;\u61a1hv;\u6ae4\u0100ay\u02d0\u02d5ron;\u410e;\u4414l\u0100;t\u02dd\u02de\u6207a;\u4394r;\uc000\ud835\udd07\u0100af\u02eb\u0327\u0100cm\u02f0\u0322ritical\u0200ADGT\u0300\u0306\u0316\u031ccute;\u40b4o\u0174\u030b\u030d;\u42d9bleAcute;\u42ddrave;\u4060ilde;\u42dcond;\u62c4ferentialD;\u6146\u0470\u033d\0\0\0\u0342\u0354\0\u0405f;\uc000\ud835\udd3b\u0180;DE\u0348\u0349\u034d\u40a8ot;\u60dcqual;\u6250ble\u0300CDLRUV\u0363\u0372\u0382\u03cf\u03e2\u03f8ontourIntegra\xec\u0239o\u0274\u0379\0\0\u037b\xbb\u0349nArrow;\u61d3\u0100eo\u0387\u03a4ft\u0180ART\u0390\u0396\u03a1rrow;\u61d0ightArrow;\u61d4e\xe5\u02cang\u0100LR\u03ab\u03c4eft\u0100AR\u03b3\u03b9rrow;\u67f8ightArrow;\u67faightArrow;\u67f9ight\u0100AT\u03d8\u03derrow;\u61d2ee;\u62a8p\u0241\u03e9\0\0\u03efrrow;\u61d1ownArrow;\u61d5erticalBar;\u6225n\u0300ABLRTa\u0412\u042a\u0430\u045e\u047f\u037crrow\u0180;BU\u041d\u041e\u0422\u6193ar;\u6913pArrow;\u61f5reve;\u4311eft\u02d2\u043a\0\u0446\0\u0450ightVector;\u6950eeVector;\u695eector\u0100;B\u0459\u045a\u61bdar;\u6956ight\u01d4\u0467\0\u0471eeVector;\u695fector\u0100;B\u047a\u047b\u61c1ar;\u6957ee\u0100;A\u0486\u0487\u62a4rrow;\u61a7\u0100ct\u0492\u0497r;\uc000\ud835\udc9frok;\u4110\u0800NTacdfglmopqstux\u04bd\u04c0\u04c4\u04cb\u04de\u04e2\u04e7\u04ee\u04f5\u0521\u052f\u0536\u0552\u055d\u0560\u0565G;\u414aH\u803b\xd0\u40d0cute\u803b\xc9\u40c9\u0180aiy\u04d2\u04d7\u04dcron;\u411arc\u803b\xca\u40ca;\u442dot;\u4116r;\uc000\ud835\udd08rave\u803b\xc8\u40c8ement;\u6208\u0100ap\u04fa\u04fecr;\u4112ty\u0253\u0506\0\0\u0512mallSquare;\u65fberySmallSquare;\u65ab\u0100gp\u0526\u052aon;\u4118f;\uc000\ud835\udd3csilon;\u4395u\u0100ai\u053c\u0549l\u0100;T\u0542\u0543\u6a75ilde;\u6242librium;\u61cc\u0100ci\u0557\u055ar;\u6130m;\u6a73a;\u4397ml\u803b\xcb\u40cb\u0100ip\u056a\u056fsts;\u6203onentialE;\u6147\u0280cfios\u0585\u0588\u058d\u05b2\u05ccy;\u4424r;\uc000\ud835\udd09lled\u0253\u0597\0\0\u05a3mallSquare;\u65fcerySmallSquare;\u65aa\u0370\u05ba\0\u05bf\0\0\u05c4f;\uc000\ud835\udd3dAll;\u6200riertrf;\u6131c\xf2\u05cb\u0600JTabcdfgorst\u05e8\u05ec\u05ef\u05fa\u0600\u0612\u0616\u061b\u061d\u0623\u066c\u0672cy;\u4403\u803b>\u403emma\u0100;d\u05f7\u05f8\u4393;\u43dcreve;\u411e\u0180eiy\u0607\u060c\u0610dil;\u4122rc;\u411c;\u4413ot;\u4120r;\uc000\ud835\udd0a;\u62d9pf;\uc000\ud835\udd3eeater\u0300EFGLST\u0635\u0644\u064e\u0656\u065b\u0666qual\u0100;L\u063e\u063f\u6265ess;\u62dbullEqual;\u6267reater;\u6aa2ess;\u6277lantEqual;\u6a7eilde;\u6273cr;\uc000\ud835\udca2;\u626b\u0400Aacfiosu\u0685\u068b\u0696\u069b\u069e\u06aa\u06be\u06caRDcy;\u442a\u0100ct\u0690\u0694ek;\u42c7;\u405eirc;\u4124r;\u610clbertSpace;\u610b\u01f0\u06af\0\u06b2f;\u610dizontalLine;\u6500\u0100ct\u06c3\u06c5\xf2\u06a9rok;\u4126mp\u0144\u06d0\u06d8ownHum\xf0\u012fqual;\u624f\u0700EJOacdfgmnostu\u06fa\u06fe\u0703\u0707\u070e\u071a\u071e\u0721\u0728\u0744\u0778\u078b\u078f\u0795cy;\u4415lig;\u4132cy;\u4401cute\u803b\xcd\u40cd\u0100iy\u0713\u0718rc\u803b\xce\u40ce;\u4418ot;\u4130r;\u6111rave\u803b\xcc\u40cc\u0180;ap\u0720\u072f\u073f\u0100cg\u0734\u0737r;\u412ainaryI;\u6148lie\xf3\u03dd\u01f4\u0749\0\u0762\u0100;e\u074d\u074e\u622c\u0100gr\u0753\u0758ral;\u622bsection;\u62c2isible\u0100CT\u076c\u0772omma;\u6063imes;\u6062\u0180gpt\u077f\u0783\u0788on;\u412ef;\uc000\ud835\udd40a;\u4399cr;\u6110ilde;\u4128\u01eb\u079a\0\u079ecy;\u4406l\u803b\xcf\u40cf\u0280cfosu\u07ac\u07b7\u07bc\u07c2\u07d0\u0100iy\u07b1\u07b5rc;\u4134;\u4419r;\uc000\ud835\udd0dpf;\uc000\ud835\udd41\u01e3\u07c7\0\u07ccr;\uc000\ud835\udca5rcy;\u4408kcy;\u4404\u0380HJacfos\u07e4\u07e8\u07ec\u07f1\u07fd\u0802\u0808cy;\u4425cy;\u440cppa;\u439a\u0100ey\u07f6\u07fbdil;\u4136;\u441ar;\uc000\ud835\udd0epf;\uc000\ud835\udd42cr;\uc000\ud835\udca6\u0580JTaceflmost\u0825\u0829\u082c\u0850\u0863\u09b3\u09b8\u09c7\u09cd\u0a37\u0a47cy;\u4409\u803b<\u403c\u0280cmnpr\u0837\u083c\u0841\u0844\u084dute;\u4139bda;\u439bg;\u67ealacetrf;\u6112r;\u619e\u0180aey\u0857\u085c\u0861ron;\u413ddil;\u413b;\u441b\u0100fs\u0868\u0970t\u0500ACDFRTUVar\u087e\u08a9\u08b1\u08e0\u08e6\u08fc\u092f\u095b\u0390\u096a\u0100nr\u0883\u088fgleBracket;\u67e8row\u0180;BR\u0899\u089a\u089e\u6190ar;\u61e4ightArrow;\u61c6eiling;\u6308o\u01f5\u08b7\0\u08c3bleBracket;\u67e6n\u01d4\u08c8\0\u08d2eeVector;\u6961ector\u0100;B\u08db\u08dc\u61c3ar;\u6959loor;\u630aight\u0100AV\u08ef\u08f5rrow;\u6194ector;\u694e\u0100er\u0901\u0917e\u0180;AV\u0909\u090a\u0910\u62a3rrow;\u61a4ector;\u695aiangle\u0180;BE\u0924\u0925\u0929\u62b2ar;\u69cfqual;\u62b4p\u0180DTV\u0937\u0942\u094cownVector;\u6951eeVector;\u6960ector\u0100;B\u0956\u0957\u61bfar;\u6958ector\u0100;B\u0965\u0966\u61bcar;\u6952ight\xe1\u039cs\u0300EFGLST\u097e\u098b\u0995\u099d\u09a2\u09adqualGreater;\u62daullEqual;\u6266reater;\u6276ess;\u6aa1lantEqual;\u6a7dilde;\u6272r;\uc000\ud835\udd0f\u0100;e\u09bd\u09be\u62d8ftarrow;\u61daidot;\u413f\u0180npw\u09d4\u0a16\u0a1bg\u0200LRlr\u09de\u09f7\u0a02\u0a10eft\u0100AR\u09e6\u09ecrrow;\u67f5ightArrow;\u67f7ightArrow;\u67f6eft\u0100ar\u03b3\u0a0aight\xe1\u03bfight\xe1\u03caf;\uc000\ud835\udd43er\u0100LR\u0a22\u0a2ceftArrow;\u6199ightArrow;\u6198\u0180cht\u0a3e\u0a40\u0a42\xf2\u084c;\u61b0rok;\u4141;\u626a\u0400acefiosu\u0a5a\u0a5d\u0a60\u0a77\u0a7c\u0a85\u0a8b\u0a8ep;\u6905y;\u441c\u0100dl\u0a65\u0a6fiumSpace;\u605flintrf;\u6133r;\uc000\ud835\udd10nusPlus;\u6213pf;\uc000\ud835\udd44c\xf2\u0a76;\u439c\u0480Jacefostu\u0aa3\u0aa7\u0aad\u0ac0\u0b14\u0b19\u0d91\u0d97\u0d9ecy;\u440acute;\u4143\u0180aey\u0ab4\u0ab9\u0aberon;\u4147dil;\u4145;\u441d\u0180gsw\u0ac7\u0af0\u0b0eative\u0180MTV\u0ad3\u0adf\u0ae8ediumSpace;\u600bhi\u0100cn\u0ae6\u0ad8\xeb\u0ad9eryThi\xee\u0ad9ted\u0100GL\u0af8\u0b06reaterGreate\xf2\u0673essLes\xf3\u0a48Line;\u400ar;\uc000\ud835\udd11\u0200Bnpt\u0b22\u0b28\u0b37\u0b3areak;\u6060BreakingSpace;\u40a0f;\u6115\u0680;CDEGHLNPRSTV\u0b55\u0b56\u0b6a\u0b7c\u0ba1\u0beb\u0c04\u0c5e\u0c84\u0ca6\u0cd8\u0d61\u0d85\u6aec\u0100ou\u0b5b\u0b64ngruent;\u6262pCap;\u626doubleVerticalBar;\u6226\u0180lqx\u0b83\u0b8a\u0b9bement;\u6209ual\u0100;T\u0b92\u0b93\u6260ilde;\uc000\u2242\u0338ists;\u6204reater\u0380;EFGLST\u0bb6\u0bb7\u0bbd\u0bc9\u0bd3\u0bd8\u0be5\u626fqual;\u6271ullEqual;\uc000\u2267\u0338reater;\uc000\u226b\u0338ess;\u6279lantEqual;\uc000\u2a7e\u0338ilde;\u6275ump\u0144\u0bf2\u0bfdownHump;\uc000\u224e\u0338qual;\uc000\u224f\u0338e\u0100fs\u0c0a\u0c27tTriangle\u0180;BE\u0c1a\u0c1b\u0c21\u62eaar;\uc000\u29cf\u0338qual;\u62ecs\u0300;EGLST\u0c35\u0c36\u0c3c\u0c44\u0c4b\u0c58\u626equal;\u6270reater;\u6278ess;\uc000\u226a\u0338lantEqual;\uc000\u2a7d\u0338ilde;\u6274ested\u0100GL\u0c68\u0c79reaterGreater;\uc000\u2aa2\u0338essLess;\uc000\u2aa1\u0338recedes\u0180;ES\u0c92\u0c93\u0c9b\u6280qual;\uc000\u2aaf\u0338lantEqual;\u62e0\u0100ei\u0cab\u0cb9verseElement;\u620cghtTriangle\u0180;BE\u0ccb\u0ccc\u0cd2\u62ebar;\uc000\u29d0\u0338qual;\u62ed\u0100qu\u0cdd\u0d0cuareSu\u0100bp\u0ce8\u0cf9set\u0100;E\u0cf0\u0cf3\uc000\u228f\u0338qual;\u62e2erset\u0100;E\u0d03\u0d06\uc000\u2290\u0338qual;\u62e3\u0180bcp\u0d13\u0d24\u0d4eset\u0100;E\u0d1b\u0d1e\uc000\u2282\u20d2qual;\u6288ceeds\u0200;EST\u0d32\u0d33\u0d3b\u0d46\u6281qual;\uc000\u2ab0\u0338lantEqual;\u62e1ilde;\uc000\u227f\u0338erset\u0100;E\u0d58\u0d5b\uc000\u2283\u20d2qual;\u6289ilde\u0200;EFT\u0d6e\u0d6f\u0d75\u0d7f\u6241qual;\u6244ullEqual;\u6247ilde;\u6249erticalBar;\u6224cr;\uc000\ud835\udca9ilde\u803b\xd1\u40d1;\u439d\u0700Eacdfgmoprstuv\u0dbd\u0dc2\u0dc9\u0dd5\u0ddb\u0de0\u0de7\u0dfc\u0e02\u0e20\u0e22\u0e32\u0e3f\u0e44lig;\u4152cute\u803b\xd3\u40d3\u0100iy\u0dce\u0dd3rc\u803b\xd4\u40d4;\u441eblac;\u4150r;\uc000\ud835\udd12rave\u803b\xd2\u40d2\u0180aei\u0dee\u0df2\u0df6cr;\u414cga;\u43a9cron;\u439fpf;\uc000\ud835\udd46enCurly\u0100DQ\u0e0e\u0e1aoubleQuote;\u601cuote;\u6018;\u6a54\u0100cl\u0e27\u0e2cr;\uc000\ud835\udcaaash\u803b\xd8\u40d8i\u016c\u0e37\u0e3cde\u803b\xd5\u40d5es;\u6a37ml\u803b\xd6\u40d6er\u0100BP\u0e4b\u0e60\u0100ar\u0e50\u0e53r;\u603eac\u0100ek\u0e5a\u0e5c;\u63deet;\u63b4arenthesis;\u63dc\u0480acfhilors\u0e7f\u0e87\u0e8a\u0e8f\u0e92\u0e94\u0e9d\u0eb0\u0efcrtialD;\u6202y;\u441fr;\uc000\ud835\udd13i;\u43a6;\u43a0usMinus;\u40b1\u0100ip\u0ea2\u0eadncareplan\xe5\u069df;\u6119\u0200;eio\u0eb9\u0eba\u0ee0\u0ee4\u6abbcedes\u0200;EST\u0ec8\u0ec9\u0ecf\u0eda\u627aqual;\u6aaflantEqual;\u627cilde;\u627eme;\u6033\u0100dp\u0ee9\u0eeeuct;\u620fortion\u0100;a\u0225\u0ef9l;\u621d\u0100ci\u0f01\u0f06r;\uc000\ud835\udcab;\u43a8\u0200Ufos\u0f11\u0f16\u0f1b\u0f1fOT\u803b\"\u4022r;\uc000\ud835\udd14pf;\u611acr;\uc000\ud835\udcac\u0600BEacefhiorsu\u0f3e\u0f43\u0f47\u0f60\u0f73\u0fa7\u0faa\u0fad\u1096\u10a9\u10b4\u10bearr;\u6910G\u803b\xae\u40ae\u0180cnr\u0f4e\u0f53\u0f56ute;\u4154g;\u67ebr\u0100;t\u0f5c\u0f5d\u61a0l;\u6916\u0180aey\u0f67\u0f6c\u0f71ron;\u4158dil;\u4156;\u4420\u0100;v\u0f78\u0f79\u611cerse\u0100EU\u0f82\u0f99\u0100lq\u0f87\u0f8eement;\u620builibrium;\u61cbpEquilibrium;\u696fr\xbb\u0f79o;\u43a1ght\u0400ACDFTUVa\u0fc1\u0feb\u0ff3\u1022\u1028\u105b\u1087\u03d8\u0100nr\u0fc6\u0fd2gleBracket;\u67e9row\u0180;BL\u0fdc\u0fdd\u0fe1\u6192ar;\u61e5eftArrow;\u61c4eiling;\u6309o\u01f5\u0ff9\0\u1005bleBracket;\u67e7n\u01d4\u100a\0\u1014eeVector;\u695dector\u0100;B\u101d\u101e\u61c2ar;\u6955loor;\u630b\u0100er\u102d\u1043e\u0180;AV\u1035\u1036\u103c\u62a2rrow;\u61a6ector;\u695biangle\u0180;BE\u1050\u1051\u1055\u62b3ar;\u69d0qual;\u62b5p\u0180DTV\u1063\u106e\u1078ownVector;\u694feeVector;\u695cector\u0100;B\u1082\u1083\u61bear;\u6954ector\u0100;B\u1091\u1092\u61c0ar;\u6953\u0100pu\u109b\u109ef;\u611dndImplies;\u6970ightarrow;\u61db\u0100ch\u10b9\u10bcr;\u611b;\u61b1leDelayed;\u69f4\u0680HOacfhimoqstu\u10e4\u10f1\u10f7\u10fd\u1119\u111e\u1151\u1156\u1161\u1167\u11b5\u11bb\u11bf\u0100Cc\u10e9\u10eeHcy;\u4429y;\u4428FTcy;\u442ccute;\u415a\u0280;aeiy\u1108\u1109\u110e\u1113\u1117\u6abcron;\u4160dil;\u415erc;\u415c;\u4421r;\uc000\ud835\udd16ort\u0200DLRU\u112a\u1134\u113e\u1149ownArrow\xbb\u041eeftArrow\xbb\u089aightArrow\xbb\u0fddpArrow;\u6191gma;\u43a3allCircle;\u6218pf;\uc000\ud835\udd4a\u0272\u116d\0\0\u1170t;\u621aare\u0200;ISU\u117b\u117c\u1189\u11af\u65a1ntersection;\u6293u\u0100bp\u118f\u119eset\u0100;E\u1197\u1198\u628fqual;\u6291erset\u0100;E\u11a8\u11a9\u6290qual;\u6292nion;\u6294cr;\uc000\ud835\udcaear;\u62c6\u0200bcmp\u11c8\u11db\u1209\u120b\u0100;s\u11cd\u11ce\u62d0et\u0100;E\u11cd\u11d5qual;\u6286\u0100ch\u11e0\u1205eeds\u0200;EST\u11ed\u11ee\u11f4\u11ff\u627bqual;\u6ab0lantEqual;\u627dilde;\u627fTh\xe1\u0f8c;\u6211\u0180;es\u1212\u1213\u1223\u62d1rset\u0100;E\u121c\u121d\u6283qual;\u6287et\xbb\u1213\u0580HRSacfhiors\u123e\u1244\u1249\u1255\u125e\u1271\u1276\u129f\u12c2\u12c8\u12d1ORN\u803b\xde\u40deADE;\u6122\u0100Hc\u124e\u1252cy;\u440by;\u4426\u0100bu\u125a\u125c;\u4009;\u43a4\u0180aey\u1265\u126a\u126fron;\u4164dil;\u4162;\u4422r;\uc000\ud835\udd17\u0100ei\u127b\u1289\u01f2\u1280\0\u1287efore;\u6234a;\u4398\u0100cn\u128e\u1298kSpace;\uc000\u205f\u200aSpace;\u6009lde\u0200;EFT\u12ab\u12ac\u12b2\u12bc\u623cqual;\u6243ullEqual;\u6245ilde;\u6248pf;\uc000\ud835\udd4bipleDot;\u60db\u0100ct\u12d6\u12dbr;\uc000\ud835\udcafrok;\u4166\u0ae1\u12f7\u130e\u131a\u1326\0\u132c\u1331\0\0\0\0\0\u1338\u133d\u1377\u1385\0\u13ff\u1404\u140a\u1410\u0100cr\u12fb\u1301ute\u803b\xda\u40dar\u0100;o\u1307\u1308\u619fcir;\u6949r\u01e3\u1313\0\u1316y;\u440eve;\u416c\u0100iy\u131e\u1323rc\u803b\xdb\u40db;\u4423blac;\u4170r;\uc000\ud835\udd18rave\u803b\xd9\u40d9acr;\u416a\u0100di\u1341\u1369er\u0100BP\u1348\u135d\u0100ar\u134d\u1350r;\u405fac\u0100ek\u1357\u1359;\u63dfet;\u63b5arenthesis;\u63ddon\u0100;P\u1370\u1371\u62c3lus;\u628e\u0100gp\u137b\u137fon;\u4172f;\uc000\ud835\udd4c\u0400ADETadps\u1395\u13ae\u13b8\u13c4\u03e8\u13d2\u13d7\u13f3rrow\u0180;BD\u1150\u13a0\u13a4ar;\u6912ownArrow;\u61c5ownArrow;\u6195quilibrium;\u696eee\u0100;A\u13cb\u13cc\u62a5rrow;\u61a5own\xe1\u03f3er\u0100LR\u13de\u13e8eftArrow;\u6196ightArrow;\u6197i\u0100;l\u13f9\u13fa\u43d2on;\u43a5ing;\u416ecr;\uc000\ud835\udcb0ilde;\u4168ml\u803b\xdc\u40dc\u0480Dbcdefosv\u1427\u142c\u1430\u1433\u143e\u1485\u148a\u1490\u1496ash;\u62abar;\u6aeby;\u4412ash\u0100;l\u143b\u143c\u62a9;\u6ae6\u0100er\u1443\u1445;\u62c1\u0180bty\u144c\u1450\u147aar;\u6016\u0100;i\u144f\u1455cal\u0200BLST\u1461\u1465\u146a\u1474ar;\u6223ine;\u407ceparator;\u6758ilde;\u6240ThinSpace;\u600ar;\uc000\ud835\udd19pf;\uc000\ud835\udd4dcr;\uc000\ud835\udcb1dash;\u62aa\u0280cefos\u14a7\u14ac\u14b1\u14b6\u14bcirc;\u4174dge;\u62c0r;\uc000\ud835\udd1apf;\uc000\ud835\udd4ecr;\uc000\ud835\udcb2\u0200fios\u14cb\u14d0\u14d2\u14d8r;\uc000\ud835\udd1b;\u439epf;\uc000\ud835\udd4fcr;\uc000\ud835\udcb3\u0480AIUacfosu\u14f1\u14f5\u14f9\u14fd\u1504\u150f\u1514\u151a\u1520cy;\u442fcy;\u4407cy;\u442ecute\u803b\xdd\u40dd\u0100iy\u1509\u150drc;\u4176;\u442br;\uc000\ud835\udd1cpf;\uc000\ud835\udd50cr;\uc000\ud835\udcb4ml;\u4178\u0400Hacdefos\u1535\u1539\u153f\u154b\u154f\u155d\u1560\u1564cy;\u4416cute;\u4179\u0100ay\u1544\u1549ron;\u417d;\u4417ot;\u417b\u01f2\u1554\0\u155boWidt\xe8\u0ad9a;\u4396r;\u6128pf;\u6124cr;\uc000\ud835\udcb5\u0be1\u1583\u158a\u1590\0\u15b0\u15b6\u15bf\0\0\0\0\u15c6\u15db\u15eb\u165f\u166d\0\u1695\u169b\u16b2\u16b9\0\u16becute\u803b\xe1\u40e1reve;\u4103\u0300;Ediuy\u159c\u159d\u15a1\u15a3\u15a8\u15ad\u623e;\uc000\u223e\u0333;\u623frc\u803b\xe2\u40e2te\u80bb\xb4\u0306;\u4430lig\u803b\xe6\u40e6\u0100;r\xb2\u15ba;\uc000\ud835\udd1erave\u803b\xe0\u40e0\u0100ep\u15ca\u15d6\u0100fp\u15cf\u15d4sym;\u6135\xe8\u15d3ha;\u43b1\u0100ap\u15dfc\u0100cl\u15e4\u15e7r;\u4101g;\u6a3f\u0264\u15f0\0\0\u160a\u0280;adsv\u15fa\u15fb\u15ff\u1601\u1607\u6227nd;\u6a55;\u6a5clope;\u6a58;\u6a5a\u0380;elmrsz\u1618\u1619\u161b\u161e\u163f\u164f\u1659\u6220;\u69a4e\xbb\u1619sd\u0100;a\u1625\u1626\u6221\u0461\u1630\u1632\u1634\u1636\u1638\u163a\u163c\u163e;\u69a8;\u69a9;\u69aa;\u69ab;\u69ac;\u69ad;\u69ae;\u69aft\u0100;v\u1645\u1646\u621fb\u0100;d\u164c\u164d\u62be;\u699d\u0100pt\u1654\u1657h;\u6222\xbb\xb9arr;\u637c\u0100gp\u1663\u1667on;\u4105f;\uc000\ud835\udd52\u0380;Eaeiop\u12c1\u167b\u167d\u1682\u1684\u1687\u168a;\u6a70cir;\u6a6f;\u624ad;\u624bs;\u4027rox\u0100;e\u12c1\u1692\xf1\u1683ing\u803b\xe5\u40e5\u0180cty\u16a1\u16a6\u16a8r;\uc000\ud835\udcb6;\u402amp\u0100;e\u12c1\u16af\xf1\u0288ilde\u803b\xe3\u40e3ml\u803b\xe4\u40e4\u0100ci\u16c2\u16c8onin\xf4\u0272nt;\u6a11\u0800Nabcdefiklnoprsu\u16ed\u16f1\u1730\u173c\u1743\u1748\u1778\u177d\u17e0\u17e6\u1839\u1850\u170d\u193d\u1948\u1970ot;\u6aed\u0100cr\u16f6\u171ek\u0200ceps\u1700\u1705\u170d\u1713ong;\u624cpsilon;\u43f6rime;\u6035im\u0100;e\u171a\u171b\u623dq;\u62cd\u0176\u1722\u1726ee;\u62bded\u0100;g\u172c\u172d\u6305e\xbb\u172drk\u0100;t\u135c\u1737brk;\u63b6\u0100oy\u1701\u1741;\u4431quo;\u601e\u0280cmprt\u1753\u175b\u1761\u1764\u1768aus\u0100;e\u010a\u0109ptyv;\u69b0s\xe9\u170cno\xf5\u0113\u0180ahw\u176f\u1771\u1773;\u43b2;\u6136een;\u626cr;\uc000\ud835\udd1fg\u0380costuvw\u178d\u179d\u17b3\u17c1\u17d5\u17db\u17de\u0180aiu\u1794\u1796\u179a\xf0\u0760rc;\u65efp\xbb\u1371\u0180dpt\u17a4\u17a8\u17adot;\u6a00lus;\u6a01imes;\u6a02\u0271\u17b9\0\0\u17becup;\u6a06ar;\u6605riangle\u0100du\u17cd\u17d2own;\u65bdp;\u65b3plus;\u6a04e\xe5\u1444\xe5\u14adarow;\u690d\u0180ako\u17ed\u1826\u1835\u0100cn\u17f2\u1823k\u0180lst\u17fa\u05ab\u1802ozenge;\u69ebriangle\u0200;dlr\u1812\u1813\u1818\u181d\u65b4own;\u65beeft;\u65c2ight;\u65b8k;\u6423\u01b1\u182b\0\u1833\u01b2\u182f\0\u1831;\u6592;\u65914;\u6593ck;\u6588\u0100eo\u183e\u184d\u0100;q\u1843\u1846\uc000=\u20e5uiv;\uc000\u2261\u20e5t;\u6310\u0200ptwx\u1859\u185e\u1867\u186cf;\uc000\ud835\udd53\u0100;t\u13cb\u1863om\xbb\u13cctie;\u62c8\u0600DHUVbdhmptuv\u1885\u1896\u18aa\u18bb\u18d7\u18db\u18ec\u18ff\u1905\u190a\u1910\u1921\u0200LRlr\u188e\u1890\u1892\u1894;\u6557;\u6554;\u6556;\u6553\u0280;DUdu\u18a1\u18a2\u18a4\u18a6\u18a8\u6550;\u6566;\u6569;\u6564;\u6567\u0200LRlr\u18b3\u18b5\u18b7\u18b9;\u655d;\u655a;\u655c;\u6559\u0380;HLRhlr\u18ca\u18cb\u18cd\u18cf\u18d1\u18d3\u18d5\u6551;\u656c;\u6563;\u6560;\u656b;\u6562;\u655fox;\u69c9\u0200LRlr\u18e4\u18e6\u18e8\u18ea;\u6555;\u6552;\u6510;\u650c\u0280;DUdu\u06bd\u18f7\u18f9\u18fb\u18fd;\u6565;\u6568;\u652c;\u6534inus;\u629flus;\u629eimes;\u62a0\u0200LRlr\u1919\u191b\u191d\u191f;\u655b;\u6558;\u6518;\u6514\u0380;HLRhlr\u1930\u1931\u1933\u1935\u1937\u1939\u193b\u6502;\u656a;\u6561;\u655e;\u653c;\u6524;\u651c\u0100ev\u0123\u1942bar\u803b\xa6\u40a6\u0200ceio\u1951\u1956\u195a\u1960r;\uc000\ud835\udcb7mi;\u604fm\u0100;e\u171a\u171cl\u0180;bh\u1968\u1969\u196b\u405c;\u69c5sub;\u67c8\u016c\u1974\u197el\u0100;e\u1979\u197a\u6022t\xbb\u197ap\u0180;Ee\u012f\u1985\u1987;\u6aae\u0100;q\u06dc\u06db\u0ce1\u19a7\0\u19e8\u1a11\u1a15\u1a32\0\u1a37\u1a50\0\0\u1ab4\0\0\u1ac1\0\0\u1b21\u1b2e\u1b4d\u1b52\0\u1bfd\0\u1c0c\u0180cpr\u19ad\u19b2\u19ddute;\u4107\u0300;abcds\u19bf\u19c0\u19c4\u19ca\u19d5\u19d9\u6229nd;\u6a44rcup;\u6a49\u0100au\u19cf\u19d2p;\u6a4bp;\u6a47ot;\u6a40;\uc000\u2229\ufe00\u0100eo\u19e2\u19e5t;\u6041\xee\u0693\u0200aeiu\u19f0\u19fb\u1a01\u1a05\u01f0\u19f5\0\u19f8s;\u6a4don;\u410ddil\u803b\xe7\u40e7rc;\u4109ps\u0100;s\u1a0c\u1a0d\u6a4cm;\u6a50ot;\u410b\u0180dmn\u1a1b\u1a20\u1a26il\u80bb\xb8\u01adptyv;\u69b2t\u8100\xa2;e\u1a2d\u1a2e\u40a2r\xe4\u01b2r;\uc000\ud835\udd20\u0180cei\u1a3d\u1a40\u1a4dy;\u4447ck\u0100;m\u1a47\u1a48\u6713ark\xbb\u1a48;\u43c7r\u0380;Ecefms\u1a5f\u1a60\u1a62\u1a6b\u1aa4\u1aaa\u1aae\u65cb;\u69c3\u0180;el\u1a69\u1a6a\u1a6d\u42c6q;\u6257e\u0261\u1a74\0\0\u1a88rrow\u0100lr\u1a7c\u1a81eft;\u61baight;\u61bb\u0280RSacd\u1a92\u1a94\u1a96\u1a9a\u1a9f\xbb\u0f47;\u64c8st;\u629birc;\u629aash;\u629dnint;\u6a10id;\u6aefcir;\u69c2ubs\u0100;u\u1abb\u1abc\u6663it\xbb\u1abc\u02ec\u1ac7\u1ad4\u1afa\0\u1b0aon\u0100;e\u1acd\u1ace\u403a\u0100;q\xc7\xc6\u026d\u1ad9\0\0\u1ae2a\u0100;t\u1ade\u1adf\u402c;\u4040\u0180;fl\u1ae8\u1ae9\u1aeb\u6201\xee\u1160e\u0100mx\u1af1\u1af6ent\xbb\u1ae9e\xf3\u024d\u01e7\u1afe\0\u1b07\u0100;d\u12bb\u1b02ot;\u6a6dn\xf4\u0246\u0180fry\u1b10\u1b14\u1b17;\uc000\ud835\udd54o\xe4\u0254\u8100\xa9;s\u0155\u1b1dr;\u6117\u0100ao\u1b25\u1b29rr;\u61b5ss;\u6717\u0100cu\u1b32\u1b37r;\uc000\ud835\udcb8\u0100bp\u1b3c\u1b44\u0100;e\u1b41\u1b42\u6acf;\u6ad1\u0100;e\u1b49\u1b4a\u6ad0;\u6ad2dot;\u62ef\u0380delprvw\u1b60\u1b6c\u1b77\u1b82\u1bac\u1bd4\u1bf9arr\u0100lr\u1b68\u1b6a;\u6938;\u6935\u0270\u1b72\0\0\u1b75r;\u62dec;\u62dfarr\u0100;p\u1b7f\u1b80\u61b6;\u693d\u0300;bcdos\u1b8f\u1b90\u1b96\u1ba1\u1ba5\u1ba8\u622arcap;\u6a48\u0100au\u1b9b\u1b9ep;\u6a46p;\u6a4aot;\u628dr;\u6a45;\uc000\u222a\ufe00\u0200alrv\u1bb5\u1bbf\u1bde\u1be3rr\u0100;m\u1bbc\u1bbd\u61b7;\u693cy\u0180evw\u1bc7\u1bd4\u1bd8q\u0270\u1bce\0\0\u1bd2re\xe3\u1b73u\xe3\u1b75ee;\u62ceedge;\u62cfen\u803b\xa4\u40a4earrow\u0100lr\u1bee\u1bf3eft\xbb\u1b80ight\xbb\u1bbde\xe4\u1bdd\u0100ci\u1c01\u1c07onin\xf4\u01f7nt;\u6231lcty;\u632d\u0980AHabcdefhijlorstuwz\u1c38\u1c3b\u1c3f\u1c5d\u1c69\u1c75\u1c8a\u1c9e\u1cac\u1cb7\u1cfb\u1cff\u1d0d\u1d7b\u1d91\u1dab\u1dbb\u1dc6\u1dcdr\xf2\u0381ar;\u6965\u0200glrs\u1c48\u1c4d\u1c52\u1c54ger;\u6020eth;\u6138\xf2\u1133h\u0100;v\u1c5a\u1c5b\u6010\xbb\u090a\u016b\u1c61\u1c67arow;\u690fa\xe3\u0315\u0100ay\u1c6e\u1c73ron;\u410f;\u4434\u0180;ao\u0332\u1c7c\u1c84\u0100gr\u02bf\u1c81r;\u61catseq;\u6a77\u0180glm\u1c91\u1c94\u1c98\u803b\xb0\u40b0ta;\u43b4ptyv;\u69b1\u0100ir\u1ca3\u1ca8sht;\u697f;\uc000\ud835\udd21ar\u0100lr\u1cb3\u1cb5\xbb\u08dc\xbb\u101e\u0280aegsv\u1cc2\u0378\u1cd6\u1cdc\u1ce0m\u0180;os\u0326\u1cca\u1cd4nd\u0100;s\u0326\u1cd1uit;\u6666amma;\u43ddin;\u62f2\u0180;io\u1ce7\u1ce8\u1cf8\u40f7de\u8100\xf7;o\u1ce7\u1cf0ntimes;\u62c7n\xf8\u1cf7cy;\u4452c\u026f\u1d06\0\0\u1d0arn;\u631eop;\u630d\u0280lptuw\u1d18\u1d1d\u1d22\u1d49\u1d55lar;\u4024f;\uc000\ud835\udd55\u0280;emps\u030b\u1d2d\u1d37\u1d3d\u1d42q\u0100;d\u0352\u1d33ot;\u6251inus;\u6238lus;\u6214quare;\u62a1blebarwedg\xe5\xfan\u0180adh\u112e\u1d5d\u1d67ownarrow\xf3\u1c83arpoon\u0100lr\u1d72\u1d76ef\xf4\u1cb4igh\xf4\u1cb6\u0162\u1d7f\u1d85karo\xf7\u0f42\u026f\u1d8a\0\0\u1d8ern;\u631fop;\u630c\u0180cot\u1d98\u1da3\u1da6\u0100ry\u1d9d\u1da1;\uc000\ud835\udcb9;\u4455l;\u69f6rok;\u4111\u0100dr\u1db0\u1db4ot;\u62f1i\u0100;f\u1dba\u1816\u65bf\u0100ah\u1dc0\u1dc3r\xf2\u0429a\xf2\u0fa6angle;\u69a6\u0100ci\u1dd2\u1dd5y;\u445fgrarr;\u67ff\u0900Dacdefglmnopqrstux\u1e01\u1e09\u1e19\u1e38\u0578\u1e3c\u1e49\u1e61\u1e7e\u1ea5\u1eaf\u1ebd\u1ee1\u1f2a\u1f37\u1f44\u1f4e\u1f5a\u0100Do\u1e06\u1d34o\xf4\u1c89\u0100cs\u1e0e\u1e14ute\u803b\xe9\u40e9ter;\u6a6e\u0200aioy\u1e22\u1e27\u1e31\u1e36ron;\u411br\u0100;c\u1e2d\u1e2e\u6256\u803b\xea\u40ealon;\u6255;\u444dot;\u4117\u0100Dr\u1e41\u1e45ot;\u6252;\uc000\ud835\udd22\u0180;rs\u1e50\u1e51\u1e57\u6a9aave\u803b\xe8\u40e8\u0100;d\u1e5c\u1e5d\u6a96ot;\u6a98\u0200;ils\u1e6a\u1e6b\u1e72\u1e74\u6a99nters;\u63e7;\u6113\u0100;d\u1e79\u1e7a\u6a95ot;\u6a97\u0180aps\u1e85\u1e89\u1e97cr;\u4113ty\u0180;sv\u1e92\u1e93\u1e95\u6205et\xbb\u1e93p\u01001;\u1e9d\u1ea4\u0133\u1ea1\u1ea3;\u6004;\u6005\u6003\u0100gs\u1eaa\u1eac;\u414bp;\u6002\u0100gp\u1eb4\u1eb8on;\u4119f;\uc000\ud835\udd56\u0180als\u1ec4\u1ece\u1ed2r\u0100;s\u1eca\u1ecb\u62d5l;\u69e3us;\u6a71i\u0180;lv\u1eda\u1edb\u1edf\u43b5on\xbb\u1edb;\u43f5\u0200csuv\u1eea\u1ef3\u1f0b\u1f23\u0100io\u1eef\u1e31rc\xbb\u1e2e\u0269\u1ef9\0\0\u1efb\xed\u0548ant\u0100gl\u1f02\u1f06tr\xbb\u1e5dess\xbb\u1e7a\u0180aei\u1f12\u1f16\u1f1als;\u403dst;\u625fv\u0100;D\u0235\u1f20D;\u6a78parsl;\u69e5\u0100Da\u1f2f\u1f33ot;\u6253rr;\u6971\u0180cdi\u1f3e\u1f41\u1ef8r;\u612fo\xf4\u0352\u0100ah\u1f49\u1f4b;\u43b7\u803b\xf0\u40f0\u0100mr\u1f53\u1f57l\u803b\xeb\u40ebo;\u60ac\u0180cip\u1f61\u1f64\u1f67l;\u4021s\xf4\u056e\u0100eo\u1f6c\u1f74ctatio\xee\u0559nential\xe5\u0579\u09e1\u1f92\0\u1f9e\0\u1fa1\u1fa7\0\0\u1fc6\u1fcc\0\u1fd3\0\u1fe6\u1fea\u2000\0\u2008\u205allingdotse\xf1\u1e44y;\u4444male;\u6640\u0180ilr\u1fad\u1fb3\u1fc1lig;\u8000\ufb03\u0269\u1fb9\0\0\u1fbdg;\u8000\ufb00ig;\u8000\ufb04;\uc000\ud835\udd23lig;\u8000\ufb01lig;\uc000fj\u0180alt\u1fd9\u1fdc\u1fe1t;\u666dig;\u8000\ufb02ns;\u65b1of;\u4192\u01f0\u1fee\0\u1ff3f;\uc000\ud835\udd57\u0100ak\u05bf\u1ff7\u0100;v\u1ffc\u1ffd\u62d4;\u6ad9artint;\u6a0d\u0100ao\u200c\u2055\u0100cs\u2011\u2052\u03b1\u201a\u2030\u2038\u2045\u2048\0\u2050\u03b2\u2022\u2025\u2027\u202a\u202c\0\u202e\u803b\xbd\u40bd;\u6153\u803b\xbc\u40bc;\u6155;\u6159;\u615b\u01b3\u2034\0\u2036;\u6154;\u6156\u02b4\u203e\u2041\0\0\u2043\u803b\xbe\u40be;\u6157;\u615c5;\u6158\u01b6\u204c\0\u204e;\u615a;\u615d8;\u615el;\u6044wn;\u6322cr;\uc000\ud835\udcbb\u0880Eabcdefgijlnorstv\u2082\u2089\u209f\u20a5\u20b0\u20b4\u20f0\u20f5\u20fa\u20ff\u2103\u2112\u2138\u0317\u213e\u2152\u219e\u0100;l\u064d\u2087;\u6a8c\u0180cmp\u2090\u2095\u209dute;\u41f5ma\u0100;d\u209c\u1cda\u43b3;\u6a86reve;\u411f\u0100iy\u20aa\u20aerc;\u411d;\u4433ot;\u4121\u0200;lqs\u063e\u0642\u20bd\u20c9\u0180;qs\u063e\u064c\u20c4lan\xf4\u0665\u0200;cdl\u0665\u20d2\u20d5\u20e5c;\u6aa9ot\u0100;o\u20dc\u20dd\u6a80\u0100;l\u20e2\u20e3\u6a82;\u6a84\u0100;e\u20ea\u20ed\uc000\u22db\ufe00s;\u6a94r;\uc000\ud835\udd24\u0100;g\u0673\u061bmel;\u6137cy;\u4453\u0200;Eaj\u065a\u210c\u210e\u2110;\u6a92;\u6aa5;\u6aa4\u0200Eaes\u211b\u211d\u2129\u2134;\u6269p\u0100;p\u2123\u2124\u6a8arox\xbb\u2124\u0100;q\u212e\u212f\u6a88\u0100;q\u212e\u211bim;\u62e7pf;\uc000\ud835\udd58\u0100ci\u2143\u2146r;\u610am\u0180;el\u066b\u214e\u2150;\u6a8e;\u6a90\u8300>;cdlqr\u05ee\u2160\u216a\u216e\u2173\u2179\u0100ci\u2165\u2167;\u6aa7r;\u6a7aot;\u62d7Par;\u6995uest;\u6a7c\u0280adels\u2184\u216a\u2190\u0656\u219b\u01f0\u2189\0\u218epro\xf8\u209er;\u6978q\u0100lq\u063f\u2196les\xf3\u2088i\xed\u066b\u0100en\u21a3\u21adrtneqq;\uc000\u2269\ufe00\xc5\u21aa\u0500Aabcefkosy\u21c4\u21c7\u21f1\u21f5\u21fa\u2218\u221d\u222f\u2268\u227dr\xf2\u03a0\u0200ilmr\u21d0\u21d4\u21d7\u21dbrs\xf0\u1484f\xbb\u2024il\xf4\u06a9\u0100dr\u21e0\u21e4cy;\u444a\u0180;cw\u08f4\u21eb\u21efir;\u6948;\u61adar;\u610firc;\u4125\u0180alr\u2201\u220e\u2213rts\u0100;u\u2209\u220a\u6665it\xbb\u220alip;\u6026con;\u62b9r;\uc000\ud835\udd25s\u0100ew\u2223\u2229arow;\u6925arow;\u6926\u0280amopr\u223a\u223e\u2243\u225e\u2263rr;\u61fftht;\u623bk\u0100lr\u2249\u2253eftarrow;\u61a9ightarrow;\u61aaf;\uc000\ud835\udd59bar;\u6015\u0180clt\u226f\u2274\u2278r;\uc000\ud835\udcbdas\xe8\u21f4rok;\u4127\u0100bp\u2282\u2287ull;\u6043hen\xbb\u1c5b\u0ae1\u22a3\0\u22aa\0\u22b8\u22c5\u22ce\0\u22d5\u22f3\0\0\u22f8\u2322\u2367\u2362\u237f\0\u2386\u23aa\u23b4cute\u803b\xed\u40ed\u0180;iy\u0771\u22b0\u22b5rc\u803b\xee\u40ee;\u4438\u0100cx\u22bc\u22bfy;\u4435cl\u803b\xa1\u40a1\u0100fr\u039f\u22c9;\uc000\ud835\udd26rave\u803b\xec\u40ec\u0200;ino\u073e\u22dd\u22e9\u22ee\u0100in\u22e2\u22e6nt;\u6a0ct;\u622dfin;\u69dcta;\u6129lig;\u4133\u0180aop\u22fe\u231a\u231d\u0180cgt\u2305\u2308\u2317r;\u412b\u0180elp\u071f\u230f\u2313in\xe5\u078ear\xf4\u0720h;\u4131f;\u62b7ed;\u41b5\u0280;cfot\u04f4\u232c\u2331\u233d\u2341are;\u6105in\u0100;t\u2338\u2339\u621eie;\u69dddo\xf4\u2319\u0280;celp\u0757\u234c\u2350\u235b\u2361al;\u62ba\u0100gr\u2355\u2359er\xf3\u1563\xe3\u234darhk;\u6a17rod;\u6a3c\u0200cgpt\u236f\u2372\u2376\u237by;\u4451on;\u412ff;\uc000\ud835\udd5aa;\u43b9uest\u803b\xbf\u40bf\u0100ci\u238a\u238fr;\uc000\ud835\udcben\u0280;Edsv\u04f4\u239b\u239d\u23a1\u04f3;\u62f9ot;\u62f5\u0100;v\u23a6\u23a7\u62f4;\u62f3\u0100;i\u0777\u23aelde;\u4129\u01eb\u23b8\0\u23bccy;\u4456l\u803b\xef\u40ef\u0300cfmosu\u23cc\u23d7\u23dc\u23e1\u23e7\u23f5\u0100iy\u23d1\u23d5rc;\u4135;\u4439r;\uc000\ud835\udd27ath;\u4237pf;\uc000\ud835\udd5b\u01e3\u23ec\0\u23f1r;\uc000\ud835\udcbfrcy;\u4458kcy;\u4454\u0400acfghjos\u240b\u2416\u2422\u2427\u242d\u2431\u2435\u243bppa\u0100;v\u2413\u2414\u43ba;\u43f0\u0100ey\u241b\u2420dil;\u4137;\u443ar;\uc000\ud835\udd28reen;\u4138cy;\u4445cy;\u445cpf;\uc000\ud835\udd5ccr;\uc000\ud835\udcc0\u0b80ABEHabcdefghjlmnoprstuv\u2470\u2481\u2486\u248d\u2491\u250e\u253d\u255a\u2580\u264e\u265e\u2665\u2679\u267d\u269a\u26b2\u26d8\u275d\u2768\u278b\u27c0\u2801\u2812\u0180art\u2477\u247a\u247cr\xf2\u09c6\xf2\u0395ail;\u691barr;\u690e\u0100;g\u0994\u248b;\u6a8bar;\u6962\u0963\u24a5\0\u24aa\0\u24b1\0\0\0\0\0\u24b5\u24ba\0\u24c6\u24c8\u24cd\0\u24f9ute;\u413amptyv;\u69b4ra\xee\u084cbda;\u43bbg\u0180;dl\u088e\u24c1\u24c3;\u6991\xe5\u088e;\u6a85uo\u803b\xab\u40abr\u0400;bfhlpst\u0899\u24de\u24e6\u24e9\u24eb\u24ee\u24f1\u24f5\u0100;f\u089d\u24e3s;\u691fs;\u691d\xeb\u2252p;\u61abl;\u6939im;\u6973l;\u61a2\u0180;ae\u24ff\u2500\u2504\u6aabil;\u6919\u0100;s\u2509\u250a\u6aad;\uc000\u2aad\ufe00\u0180abr\u2515\u2519\u251drr;\u690crk;\u6772\u0100ak\u2522\u252cc\u0100ek\u2528\u252a;\u407b;\u405b\u0100es\u2531\u2533;\u698bl\u0100du\u2539\u253b;\u698f;\u698d\u0200aeuy\u2546\u254b\u2556\u2558ron;\u413e\u0100di\u2550\u2554il;\u413c\xec\u08b0\xe2\u2529;\u443b\u0200cqrs\u2563\u2566\u256d\u257da;\u6936uo\u0100;r\u0e19\u1746\u0100du\u2572\u2577har;\u6967shar;\u694bh;\u61b2\u0280;fgqs\u258b\u258c\u0989\u25f3\u25ff\u6264t\u0280ahlrt\u2598\u25a4\u25b7\u25c2\u25e8rrow\u0100;t\u0899\u25a1a\xe9\u24f6arpoon\u0100du\u25af\u25b4own\xbb\u045ap\xbb\u0966eftarrows;\u61c7ight\u0180ahs\u25cd\u25d6\u25derrow\u0100;s\u08f4\u08a7arpoon\xf3\u0f98quigarro\xf7\u21f0hreetimes;\u62cb\u0180;qs\u258b\u0993\u25falan\xf4\u09ac\u0280;cdgs\u09ac\u260a\u260d\u261d\u2628c;\u6aa8ot\u0100;o\u2614\u2615\u6a7f\u0100;r\u261a\u261b\u6a81;\u6a83\u0100;e\u2622\u2625\uc000\u22da\ufe00s;\u6a93\u0280adegs\u2633\u2639\u263d\u2649\u264bppro\xf8\u24c6ot;\u62d6q\u0100gq\u2643\u2645\xf4\u0989gt\xf2\u248c\xf4\u099bi\xed\u09b2\u0180ilr\u2655\u08e1\u265asht;\u697c;\uc000\ud835\udd29\u0100;E\u099c\u2663;\u6a91\u0161\u2669\u2676r\u0100du\u25b2\u266e\u0100;l\u0965\u2673;\u696alk;\u6584cy;\u4459\u0280;acht\u0a48\u2688\u268b\u2691\u2696r\xf2\u25c1orne\xf2\u1d08ard;\u696bri;\u65fa\u0100io\u269f\u26a4dot;\u4140ust\u0100;a\u26ac\u26ad\u63b0che\xbb\u26ad\u0200Eaes\u26bb\u26bd\u26c9\u26d4;\u6268p\u0100;p\u26c3\u26c4\u6a89rox\xbb\u26c4\u0100;q\u26ce\u26cf\u6a87\u0100;q\u26ce\u26bbim;\u62e6\u0400abnoptwz\u26e9\u26f4\u26f7\u271a\u272f\u2741\u2747\u2750\u0100nr\u26ee\u26f1g;\u67ecr;\u61fdr\xeb\u08c1g\u0180lmr\u26ff\u270d\u2714eft\u0100ar\u09e6\u2707ight\xe1\u09f2apsto;\u67fcight\xe1\u09fdparrow\u0100lr\u2725\u2729ef\xf4\u24edight;\u61ac\u0180afl\u2736\u2739\u273dr;\u6985;\uc000\ud835\udd5dus;\u6a2dimes;\u6a34\u0161\u274b\u274fst;\u6217\xe1\u134e\u0180;ef\u2757\u2758\u1800\u65cange\xbb\u2758ar\u0100;l\u2764\u2765\u4028t;\u6993\u0280achmt\u2773\u2776\u277c\u2785\u2787r\xf2\u08a8orne\xf2\u1d8car\u0100;d\u0f98\u2783;\u696d;\u600eri;\u62bf\u0300achiqt\u2798\u279d\u0a40\u27a2\u27ae\u27bbquo;\u6039r;\uc000\ud835\udcc1m\u0180;eg\u09b2\u27aa\u27ac;\u6a8d;\u6a8f\u0100bu\u252a\u27b3o\u0100;r\u0e1f\u27b9;\u601arok;\u4142\u8400<;cdhilqr\u082b\u27d2\u2639\u27dc\u27e0\u27e5\u27ea\u27f0\u0100ci\u27d7\u27d9;\u6aa6r;\u6a79re\xe5\u25f2mes;\u62c9arr;\u6976uest;\u6a7b\u0100Pi\u27f5\u27f9ar;\u6996\u0180;ef\u2800\u092d\u181b\u65c3r\u0100du\u2807\u280dshar;\u694ahar;\u6966\u0100en\u2817\u2821rtneqq;\uc000\u2268\ufe00\xc5\u281e\u0700Dacdefhilnopsu\u2840\u2845\u2882\u288e\u2893\u28a0\u28a5\u28a8\u28da\u28e2\u28e4\u0a83\u28f3\u2902Dot;\u623a\u0200clpr\u284e\u2852\u2863\u287dr\u803b\xaf\u40af\u0100et\u2857\u2859;\u6642\u0100;e\u285e\u285f\u6720se\xbb\u285f\u0100;s\u103b\u2868to\u0200;dlu\u103b\u2873\u2877\u287bow\xee\u048cef\xf4\u090f\xf0\u13d1ker;\u65ae\u0100oy\u2887\u288cmma;\u6a29;\u443cash;\u6014asuredangle\xbb\u1626r;\uc000\ud835\udd2ao;\u6127\u0180cdn\u28af\u28b4\u28c9ro\u803b\xb5\u40b5\u0200;acd\u1464\u28bd\u28c0\u28c4s\xf4\u16a7ir;\u6af0ot\u80bb\xb7\u01b5us\u0180;bd\u28d2\u1903\u28d3\u6212\u0100;u\u1d3c\u28d8;\u6a2a\u0163\u28de\u28e1p;\u6adb\xf2\u2212\xf0\u0a81\u0100dp\u28e9\u28eeels;\u62a7f;\uc000\ud835\udd5e\u0100ct\u28f8\u28fdr;\uc000\ud835\udcc2pos\xbb\u159d\u0180;lm\u2909\u290a\u290d\u43bctimap;\u62b8\u0c00GLRVabcdefghijlmoprstuvw\u2942\u2953\u297e\u2989\u2998\u29da\u29e9\u2a15\u2a1a\u2a58\u2a5d\u2a83\u2a95\u2aa4\u2aa8\u2b04\u2b07\u2b44\u2b7f\u2bae\u2c34\u2c67\u2c7c\u2ce9\u0100gt\u2947\u294b;\uc000\u22d9\u0338\u0100;v\u2950\u0bcf\uc000\u226b\u20d2\u0180elt\u295a\u2972\u2976ft\u0100ar\u2961\u2967rrow;\u61cdightarrow;\u61ce;\uc000\u22d8\u0338\u0100;v\u297b\u0c47\uc000\u226a\u20d2ightarrow;\u61cf\u0100Dd\u298e\u2993ash;\u62afash;\u62ae\u0280bcnpt\u29a3\u29a7\u29ac\u29b1\u29ccla\xbb\u02deute;\u4144g;\uc000\u2220\u20d2\u0280;Eiop\u0d84\u29bc\u29c0\u29c5\u29c8;\uc000\u2a70\u0338d;\uc000\u224b\u0338s;\u4149ro\xf8\u0d84ur\u0100;a\u29d3\u29d4\u666el\u0100;s\u29d3\u0b38\u01f3\u29df\0\u29e3p\u80bb\xa0\u0b37mp\u0100;e\u0bf9\u0c00\u0280aeouy\u29f4\u29fe\u2a03\u2a10\u2a13\u01f0\u29f9\0\u29fb;\u6a43on;\u4148dil;\u4146ng\u0100;d\u0d7e\u2a0aot;\uc000\u2a6d\u0338p;\u6a42;\u443dash;\u6013\u0380;Aadqsx\u0b92\u2a29\u2a2d\u2a3b\u2a41\u2a45\u2a50rr;\u61d7r\u0100hr\u2a33\u2a36k;\u6924\u0100;o\u13f2\u13f0ot;\uc000\u2250\u0338ui\xf6\u0b63\u0100ei\u2a4a\u2a4ear;\u6928\xed\u0b98ist\u0100;s\u0ba0\u0b9fr;\uc000\ud835\udd2b\u0200Eest\u0bc5\u2a66\u2a79\u2a7c\u0180;qs\u0bbc\u2a6d\u0be1\u0180;qs\u0bbc\u0bc5\u2a74lan\xf4\u0be2i\xed\u0bea\u0100;r\u0bb6\u2a81\xbb\u0bb7\u0180Aap\u2a8a\u2a8d\u2a91r\xf2\u2971rr;\u61aear;\u6af2\u0180;sv\u0f8d\u2a9c\u0f8c\u0100;d\u2aa1\u2aa2\u62fc;\u62facy;\u445a\u0380AEadest\u2ab7\u2aba\u2abe\u2ac2\u2ac5\u2af6\u2af9r\xf2\u2966;\uc000\u2266\u0338rr;\u619ar;\u6025\u0200;fqs\u0c3b\u2ace\u2ae3\u2aeft\u0100ar\u2ad4\u2ad9rro\xf7\u2ac1ightarro\xf7\u2a90\u0180;qs\u0c3b\u2aba\u2aealan\xf4\u0c55\u0100;s\u0c55\u2af4\xbb\u0c36i\xed\u0c5d\u0100;r\u0c35\u2afei\u0100;e\u0c1a\u0c25i\xe4\u0d90\u0100pt\u2b0c\u2b11f;\uc000\ud835\udd5f\u8180\xac;in\u2b19\u2b1a\u2b36\u40acn\u0200;Edv\u0b89\u2b24\u2b28\u2b2e;\uc000\u22f9\u0338ot;\uc000\u22f5\u0338\u01e1\u0b89\u2b33\u2b35;\u62f7;\u62f6i\u0100;v\u0cb8\u2b3c\u01e1\u0cb8\u2b41\u2b43;\u62fe;\u62fd\u0180aor\u2b4b\u2b63\u2b69r\u0200;ast\u0b7b\u2b55\u2b5a\u2b5flle\xec\u0b7bl;\uc000\u2afd\u20e5;\uc000\u2202\u0338lint;\u6a14\u0180;ce\u0c92\u2b70\u2b73u\xe5\u0ca5\u0100;c\u0c98\u2b78\u0100;e\u0c92\u2b7d\xf1\u0c98\u0200Aait\u2b88\u2b8b\u2b9d\u2ba7r\xf2\u2988rr\u0180;cw\u2b94\u2b95\u2b99\u619b;\uc000\u2933\u0338;\uc000\u219d\u0338ghtarrow\xbb\u2b95ri\u0100;e\u0ccb\u0cd6\u0380chimpqu\u2bbd\u2bcd\u2bd9\u2b04\u0b78\u2be4\u2bef\u0200;cer\u0d32\u2bc6\u0d37\u2bc9u\xe5\u0d45;\uc000\ud835\udcc3ort\u026d\u2b05\0\0\u2bd6ar\xe1\u2b56m\u0100;e\u0d6e\u2bdf\u0100;q\u0d74\u0d73su\u0100bp\u2beb\u2bed\xe5\u0cf8\xe5\u0d0b\u0180bcp\u2bf6\u2c11\u2c19\u0200;Ees\u2bff\u2c00\u0d22\u2c04\u6284;\uc000\u2ac5\u0338et\u0100;e\u0d1b\u2c0bq\u0100;q\u0d23\u2c00c\u0100;e\u0d32\u2c17\xf1\u0d38\u0200;Ees\u2c22\u2c23\u0d5f\u2c27\u6285;\uc000\u2ac6\u0338et\u0100;e\u0d58\u2c2eq\u0100;q\u0d60\u2c23\u0200gilr\u2c3d\u2c3f\u2c45\u2c47\xec\u0bd7lde\u803b\xf1\u40f1\xe7\u0c43iangle\u0100lr\u2c52\u2c5ceft\u0100;e\u0c1a\u2c5a\xf1\u0c26ight\u0100;e\u0ccb\u2c65\xf1\u0cd7\u0100;m\u2c6c\u2c6d\u43bd\u0180;es\u2c74\u2c75\u2c79\u4023ro;\u6116p;\u6007\u0480DHadgilrs\u2c8f\u2c94\u2c99\u2c9e\u2ca3\u2cb0\u2cb6\u2cd3\u2ce3ash;\u62adarr;\u6904p;\uc000\u224d\u20d2ash;\u62ac\u0100et\u2ca8\u2cac;\uc000\u2265\u20d2;\uc000>\u20d2nfin;\u69de\u0180Aet\u2cbd\u2cc1\u2cc5rr;\u6902;\uc000\u2264\u20d2\u0100;r\u2cca\u2ccd\uc000<\u20d2ie;\uc000\u22b4\u20d2\u0100At\u2cd8\u2cdcrr;\u6903rie;\uc000\u22b5\u20d2im;\uc000\u223c\u20d2\u0180Aan\u2cf0\u2cf4\u2d02rr;\u61d6r\u0100hr\u2cfa\u2cfdk;\u6923\u0100;o\u13e7\u13e5ear;\u6927\u1253\u1a95\0\0\0\0\0\0\0\0\0\0\0\0\0\u2d2d\0\u2d38\u2d48\u2d60\u2d65\u2d72\u2d84\u1b07\0\0\u2d8d\u2dab\0\u2dc8\u2dce\0\u2ddc\u2e19\u2e2b\u2e3e\u2e43\u0100cs\u2d31\u1a97ute\u803b\xf3\u40f3\u0100iy\u2d3c\u2d45r\u0100;c\u1a9e\u2d42\u803b\xf4\u40f4;\u443e\u0280abios\u1aa0\u2d52\u2d57\u01c8\u2d5alac;\u4151v;\u6a38old;\u69bclig;\u4153\u0100cr\u2d69\u2d6dir;\u69bf;\uc000\ud835\udd2c\u036f\u2d79\0\0\u2d7c\0\u2d82n;\u42dbave\u803b\xf2\u40f2;\u69c1\u0100bm\u2d88\u0df4ar;\u69b5\u0200acit\u2d95\u2d98\u2da5\u2da8r\xf2\u1a80\u0100ir\u2d9d\u2da0r;\u69beoss;\u69bbn\xe5\u0e52;\u69c0\u0180aei\u2db1\u2db5\u2db9cr;\u414dga;\u43c9\u0180cdn\u2dc0\u2dc5\u01cdron;\u43bf;\u69b6pf;\uc000\ud835\udd60\u0180ael\u2dd4\u2dd7\u01d2r;\u69b7rp;\u69b9\u0380;adiosv\u2dea\u2deb\u2dee\u2e08\u2e0d\u2e10\u2e16\u6228r\xf2\u1a86\u0200;efm\u2df7\u2df8\u2e02\u2e05\u6a5dr\u0100;o\u2dfe\u2dff\u6134f\xbb\u2dff\u803b\xaa\u40aa\u803b\xba\u40bagof;\u62b6r;\u6a56lope;\u6a57;\u6a5b\u0180clo\u2e1f\u2e21\u2e27\xf2\u2e01ash\u803b\xf8\u40f8l;\u6298i\u016c\u2e2f\u2e34de\u803b\xf5\u40f5es\u0100;a\u01db\u2e3as;\u6a36ml\u803b\xf6\u40f6bar;\u633d\u0ae1\u2e5e\0\u2e7d\0\u2e80\u2e9d\0\u2ea2\u2eb9\0\0\u2ecb\u0e9c\0\u2f13\0\0\u2f2b\u2fbc\0\u2fc8r\u0200;ast\u0403\u2e67\u2e72\u0e85\u8100\xb6;l\u2e6d\u2e6e\u40b6le\xec\u0403\u0269\u2e78\0\0\u2e7bm;\u6af3;\u6afdy;\u443fr\u0280cimpt\u2e8b\u2e8f\u2e93\u1865\u2e97nt;\u4025od;\u402eil;\u6030enk;\u6031r;\uc000\ud835\udd2d\u0180imo\u2ea8\u2eb0\u2eb4\u0100;v\u2ead\u2eae\u43c6;\u43d5ma\xf4\u0a76ne;\u660e\u0180;tv\u2ebf\u2ec0\u2ec8\u43c0chfork\xbb\u1ffd;\u43d6\u0100au\u2ecf\u2edfn\u0100ck\u2ed5\u2eddk\u0100;h\u21f4\u2edb;\u610e\xf6\u21f4s\u0480;abcdemst\u2ef3\u2ef4\u1908\u2ef9\u2efd\u2f04\u2f06\u2f0a\u2f0e\u402bcir;\u6a23ir;\u6a22\u0100ou\u1d40\u2f02;\u6a25;\u6a72n\u80bb\xb1\u0e9dim;\u6a26wo;\u6a27\u0180ipu\u2f19\u2f20\u2f25ntint;\u6a15f;\uc000\ud835\udd61nd\u803b\xa3\u40a3\u0500;Eaceinosu\u0ec8\u2f3f\u2f41\u2f44\u2f47\u2f81\u2f89\u2f92\u2f7e\u2fb6;\u6ab3p;\u6ab7u\xe5\u0ed9\u0100;c\u0ece\u2f4c\u0300;acens\u0ec8\u2f59\u2f5f\u2f66\u2f68\u2f7eppro\xf8\u2f43urlye\xf1\u0ed9\xf1\u0ece\u0180aes\u2f6f\u2f76\u2f7approx;\u6ab9qq;\u6ab5im;\u62e8i\xed\u0edfme\u0100;s\u2f88\u0eae\u6032\u0180Eas\u2f78\u2f90\u2f7a\xf0\u2f75\u0180dfp\u0eec\u2f99\u2faf\u0180als\u2fa0\u2fa5\u2faalar;\u632eine;\u6312urf;\u6313\u0100;t\u0efb\u2fb4\xef\u0efbrel;\u62b0\u0100ci\u2fc0\u2fc5r;\uc000\ud835\udcc5;\u43c8ncsp;\u6008\u0300fiopsu\u2fda\u22e2\u2fdf\u2fe5\u2feb\u2ff1r;\uc000\ud835\udd2epf;\uc000\ud835\udd62rime;\u6057cr;\uc000\ud835\udcc6\u0180aeo\u2ff8\u3009\u3013t\u0100ei\u2ffe\u3005rnion\xf3\u06b0nt;\u6a16st\u0100;e\u3010\u3011\u403f\xf1\u1f19\xf4\u0f14\u0a80ABHabcdefhilmnoprstux\u3040\u3051\u3055\u3059\u30e0\u310e\u312b\u3147\u3162\u3172\u318e\u3206\u3215\u3224\u3229\u3258\u326e\u3272\u3290\u32b0\u32b7\u0180art\u3047\u304a\u304cr\xf2\u10b3\xf2\u03ddail;\u691car\xf2\u1c65ar;\u6964\u0380cdenqrt\u3068\u3075\u3078\u307f\u308f\u3094\u30cc\u0100eu\u306d\u3071;\uc000\u223d\u0331te;\u4155i\xe3\u116emptyv;\u69b3g\u0200;del\u0fd1\u3089\u308b\u308d;\u6992;\u69a5\xe5\u0fd1uo\u803b\xbb\u40bbr\u0580;abcfhlpstw\u0fdc\u30ac\u30af\u30b7\u30b9\u30bc\u30be\u30c0\u30c3\u30c7\u30cap;\u6975\u0100;f\u0fe0\u30b4s;\u6920;\u6933s;\u691e\xeb\u225d\xf0\u272el;\u6945im;\u6974l;\u61a3;\u619d\u0100ai\u30d1\u30d5il;\u691ao\u0100;n\u30db\u30dc\u6236al\xf3\u0f1e\u0180abr\u30e7\u30ea\u30eer\xf2\u17e5rk;\u6773\u0100ak\u30f3\u30fdc\u0100ek\u30f9\u30fb;\u407d;\u405d\u0100es\u3102\u3104;\u698cl\u0100du\u310a\u310c;\u698e;\u6990\u0200aeuy\u3117\u311c\u3127\u3129ron;\u4159\u0100di\u3121\u3125il;\u4157\xec\u0ff2\xe2\u30fa;\u4440\u0200clqs\u3134\u3137\u313d\u3144a;\u6937dhar;\u6969uo\u0100;r\u020e\u020dh;\u61b3\u0180acg\u314e\u315f\u0f44l\u0200;ips\u0f78\u3158\u315b\u109cn\xe5\u10bbar\xf4\u0fa9t;\u65ad\u0180ilr\u3169\u1023\u316esht;\u697d;\uc000\ud835\udd2f\u0100ao\u3177\u3186r\u0100du\u317d\u317f\xbb\u047b\u0100;l\u1091\u3184;\u696c\u0100;v\u318b\u318c\u43c1;\u43f1\u0180gns\u3195\u31f9\u31fcht\u0300ahlrst\u31a4\u31b0\u31c2\u31d8\u31e4\u31eerrow\u0100;t\u0fdc\u31ada\xe9\u30c8arpoon\u0100du\u31bb\u31bfow\xee\u317ep\xbb\u1092eft\u0100ah\u31ca\u31d0rrow\xf3\u0feaarpoon\xf3\u0551ightarrows;\u61c9quigarro\xf7\u30cbhreetimes;\u62ccg;\u42daingdotse\xf1\u1f32\u0180ahm\u320d\u3210\u3213r\xf2\u0feaa\xf2\u0551;\u600foust\u0100;a\u321e\u321f\u63b1che\xbb\u321fmid;\u6aee\u0200abpt\u3232\u323d\u3240\u3252\u0100nr\u3237\u323ag;\u67edr;\u61fer\xeb\u1003\u0180afl\u3247\u324a\u324er;\u6986;\uc000\ud835\udd63us;\u6a2eimes;\u6a35\u0100ap\u325d\u3267r\u0100;g\u3263\u3264\u4029t;\u6994olint;\u6a12ar\xf2\u31e3\u0200achq\u327b\u3280\u10bc\u3285quo;\u603ar;\uc000\ud835\udcc7\u0100bu\u30fb\u328ao\u0100;r\u0214\u0213\u0180hir\u3297\u329b\u32a0re\xe5\u31f8mes;\u62cai\u0200;efl\u32aa\u1059\u1821\u32ab\u65b9tri;\u69celuhar;\u6968;\u611e\u0d61\u32d5\u32db\u32df\u332c\u3338\u3371\0\u337a\u33a4\0\0\u33ec\u33f0\0\u3428\u3448\u345a\u34ad\u34b1\u34ca\u34f1\0\u3616\0\0\u3633cute;\u415bqu\xef\u27ba\u0500;Eaceinpsy\u11ed\u32f3\u32f5\u32ff\u3302\u330b\u330f\u331f\u3326\u3329;\u6ab4\u01f0\u32fa\0\u32fc;\u6ab8on;\u4161u\xe5\u11fe\u0100;d\u11f3\u3307il;\u415frc;\u415d\u0180Eas\u3316\u3318\u331b;\u6ab6p;\u6abaim;\u62e9olint;\u6a13i\xed\u1204;\u4441ot\u0180;be\u3334\u1d47\u3335\u62c5;\u6a66\u0380Aacmstx\u3346\u334a\u3357\u335b\u335e\u3363\u336drr;\u61d8r\u0100hr\u3350\u3352\xeb\u2228\u0100;o\u0a36\u0a34t\u803b\xa7\u40a7i;\u403bwar;\u6929m\u0100in\u3369\xf0nu\xf3\xf1t;\u6736r\u0100;o\u3376\u2055\uc000\ud835\udd30\u0200acoy\u3382\u3386\u3391\u33a0rp;\u666f\u0100hy\u338b\u338fcy;\u4449;\u4448rt\u026d\u3399\0\0\u339ci\xe4\u1464ara\xec\u2e6f\u803b\xad\u40ad\u0100gm\u33a8\u33b4ma\u0180;fv\u33b1\u33b2\u33b2\u43c3;\u43c2\u0400;deglnpr\u12ab\u33c5\u33c9\u33ce\u33d6\u33de\u33e1\u33e6ot;\u6a6a\u0100;q\u12b1\u12b0\u0100;E\u33d3\u33d4\u6a9e;\u6aa0\u0100;E\u33db\u33dc\u6a9d;\u6a9fe;\u6246lus;\u6a24arr;\u6972ar\xf2\u113d\u0200aeit\u33f8\u3408\u340f\u3417\u0100ls\u33fd\u3404lsetm\xe9\u336ahp;\u6a33parsl;\u69e4\u0100dl\u1463\u3414e;\u6323\u0100;e\u341c\u341d\u6aaa\u0100;s\u3422\u3423\u6aac;\uc000\u2aac\ufe00\u0180flp\u342e\u3433\u3442tcy;\u444c\u0100;b\u3438\u3439\u402f\u0100;a\u343e\u343f\u69c4r;\u633ff;\uc000\ud835\udd64a\u0100dr\u344d\u0402es\u0100;u\u3454\u3455\u6660it\xbb\u3455\u0180csu\u3460\u3479\u349f\u0100au\u3465\u346fp\u0100;s\u1188\u346b;\uc000\u2293\ufe00p\u0100;s\u11b4\u3475;\uc000\u2294\ufe00u\u0100bp\u347f\u348f\u0180;es\u1197\u119c\u3486et\u0100;e\u1197\u348d\xf1\u119d\u0180;es\u11a8\u11ad\u3496et\u0100;e\u11a8\u349d\xf1\u11ae\u0180;af\u117b\u34a6\u05b0r\u0165\u34ab\u05b1\xbb\u117car\xf2\u1148\u0200cemt\u34b9\u34be\u34c2\u34c5r;\uc000\ud835\udcc8tm\xee\xf1i\xec\u3415ar\xe6\u11be\u0100ar\u34ce\u34d5r\u0100;f\u34d4\u17bf\u6606\u0100an\u34da\u34edight\u0100ep\u34e3\u34eapsilo\xee\u1ee0h\xe9\u2eafs\xbb\u2852\u0280bcmnp\u34fb\u355e\u1209\u358b\u358e\u0480;Edemnprs\u350e\u350f\u3511\u3515\u351e\u3523\u352c\u3531\u3536\u6282;\u6ac5ot;\u6abd\u0100;d\u11da\u351aot;\u6ac3ult;\u6ac1\u0100Ee\u3528\u352a;\u6acb;\u628alus;\u6abfarr;\u6979\u0180eiu\u353d\u3552\u3555t\u0180;en\u350e\u3545\u354bq\u0100;q\u11da\u350feq\u0100;q\u352b\u3528m;\u6ac7\u0100bp\u355a\u355c;\u6ad5;\u6ad3c\u0300;acens\u11ed\u356c\u3572\u3579\u357b\u3326ppro\xf8\u32faurlye\xf1\u11fe\xf1\u11f3\u0180aes\u3582\u3588\u331bppro\xf8\u331aq\xf1\u3317g;\u666a\u0680123;Edehlmnps\u35a9\u35ac\u35af\u121c\u35b2\u35b4\u35c0\u35c9\u35d5\u35da\u35df\u35e8\u35ed\u803b\xb9\u40b9\u803b\xb2\u40b2\u803b\xb3\u40b3;\u6ac6\u0100os\u35b9\u35bct;\u6abeub;\u6ad8\u0100;d\u1222\u35c5ot;\u6ac4s\u0100ou\u35cf\u35d2l;\u67c9b;\u6ad7arr;\u697bult;\u6ac2\u0100Ee\u35e4\u35e6;\u6acc;\u628blus;\u6ac0\u0180eiu\u35f4\u3609\u360ct\u0180;en\u121c\u35fc\u3602q\u0100;q\u1222\u35b2eq\u0100;q\u35e7\u35e4m;\u6ac8\u0100bp\u3611\u3613;\u6ad4;\u6ad6\u0180Aan\u361c\u3620\u362drr;\u61d9r\u0100hr\u3626\u3628\xeb\u222e\u0100;o\u0a2b\u0a29war;\u692alig\u803b\xdf\u40df\u0be1\u3651\u365d\u3660\u12ce\u3673\u3679\0\u367e\u36c2\0\0\0\0\0\u36db\u3703\0\u3709\u376c\0\0\0\u3787\u0272\u3656\0\0\u365bget;\u6316;\u43c4r\xeb\u0e5f\u0180aey\u3666\u366b\u3670ron;\u4165dil;\u4163;\u4442lrec;\u6315r;\uc000\ud835\udd31\u0200eiko\u3686\u369d\u36b5\u36bc\u01f2\u368b\0\u3691e\u01004f\u1284\u1281a\u0180;sv\u3698\u3699\u369b\u43b8ym;\u43d1\u0100cn\u36a2\u36b2k\u0100as\u36a8\u36aeppro\xf8\u12c1im\xbb\u12acs\xf0\u129e\u0100as\u36ba\u36ae\xf0\u12c1rn\u803b\xfe\u40fe\u01ec\u031f\u36c6\u22e7es\u8180\xd7;bd\u36cf\u36d0\u36d8\u40d7\u0100;a\u190f\u36d5r;\u6a31;\u6a30\u0180eps\u36e1\u36e3\u3700\xe1\u2a4d\u0200;bcf\u0486\u36ec\u36f0\u36f4ot;\u6336ir;\u6af1\u0100;o\u36f9\u36fc\uc000\ud835\udd65rk;\u6ada\xe1\u3362rime;\u6034\u0180aip\u370f\u3712\u3764d\xe5\u1248\u0380adempst\u3721\u374d\u3740\u3751\u3757\u375c\u375fngle\u0280;dlqr\u3730\u3731\u3736\u3740\u3742\u65b5own\xbb\u1dbbeft\u0100;e\u2800\u373e\xf1\u092e;\u625cight\u0100;e\u32aa\u374b\xf1\u105aot;\u65ecinus;\u6a3alus;\u6a39b;\u69cdime;\u6a3bezium;\u63e2\u0180cht\u3772\u377d\u3781\u0100ry\u3777\u377b;\uc000\ud835\udcc9;\u4446cy;\u445brok;\u4167\u0100io\u378b\u378ex\xf4\u1777head\u0100lr\u3797\u37a0eftarro\xf7\u084fightarrow\xbb\u0f5d\u0900AHabcdfghlmoprstuw\u37d0\u37d3\u37d7\u37e4\u37f0\u37fc\u380e\u381c\u3823\u3834\u3851\u385d\u386b\u38a9\u38cc\u38d2\u38ea\u38f6r\xf2\u03edar;\u6963\u0100cr\u37dc\u37e2ute\u803b\xfa\u40fa\xf2\u1150r\u01e3\u37ea\0\u37edy;\u445eve;\u416d\u0100iy\u37f5\u37farc\u803b\xfb\u40fb;\u4443\u0180abh\u3803\u3806\u380br\xf2\u13adlac;\u4171a\xf2\u13c3\u0100ir\u3813\u3818sht;\u697e;\uc000\ud835\udd32rave\u803b\xf9\u40f9\u0161\u3827\u3831r\u0100lr\u382c\u382e\xbb\u0957\xbb\u1083lk;\u6580\u0100ct\u3839\u384d\u026f\u383f\0\0\u384arn\u0100;e\u3845\u3846\u631cr\xbb\u3846op;\u630fri;\u65f8\u0100al\u3856\u385acr;\u416b\u80bb\xa8\u0349\u0100gp\u3862\u3866on;\u4173f;\uc000\ud835\udd66\u0300adhlsu\u114b\u3878\u387d\u1372\u3891\u38a0own\xe1\u13b3arpoon\u0100lr\u3888\u388cef\xf4\u382digh\xf4\u382fi\u0180;hl\u3899\u389a\u389c\u43c5\xbb\u13faon\xbb\u389aparrows;\u61c8\u0180cit\u38b0\u38c4\u38c8\u026f\u38b6\0\0\u38c1rn\u0100;e\u38bc\u38bd\u631dr\xbb\u38bdop;\u630eng;\u416fri;\u65f9cr;\uc000\ud835\udcca\u0180dir\u38d9\u38dd\u38e2ot;\u62f0lde;\u4169i\u0100;f\u3730\u38e8\xbb\u1813\u0100am\u38ef\u38f2r\xf2\u38a8l\u803b\xfc\u40fcangle;\u69a7\u0780ABDacdeflnoprsz\u391c\u391f\u3929\u392d\u39b5\u39b8\u39bd\u39df\u39e4\u39e8\u39f3\u39f9\u39fd\u3a01\u3a20r\xf2\u03f7ar\u0100;v\u3926\u3927\u6ae8;\u6ae9as\xe8\u03e1\u0100nr\u3932\u3937grt;\u699c\u0380eknprst\u34e3\u3946\u394b\u3952\u395d\u3964\u3996app\xe1\u2415othin\xe7\u1e96\u0180hir\u34eb\u2ec8\u3959op\xf4\u2fb5\u0100;h\u13b7\u3962\xef\u318d\u0100iu\u3969\u396dgm\xe1\u33b3\u0100bp\u3972\u3984setneq\u0100;q\u397d\u3980\uc000\u228a\ufe00;\uc000\u2acb\ufe00setneq\u0100;q\u398f\u3992\uc000\u228b\ufe00;\uc000\u2acc\ufe00\u0100hr\u399b\u399fet\xe1\u369ciangle\u0100lr\u39aa\u39afeft\xbb\u0925ight\xbb\u1051y;\u4432ash\xbb\u1036\u0180elr\u39c4\u39d2\u39d7\u0180;be\u2dea\u39cb\u39cfar;\u62bbq;\u625alip;\u62ee\u0100bt\u39dc\u1468a\xf2\u1469r;\uc000\ud835\udd33tr\xe9\u39aesu\u0100bp\u39ef\u39f1\xbb\u0d1c\xbb\u0d59pf;\uc000\ud835\udd67ro\xf0\u0efbtr\xe9\u39b4\u0100cu\u3a06\u3a0br;\uc000\ud835\udccb\u0100bp\u3a10\u3a18n\u0100Ee\u3980\u3a16\xbb\u397en\u0100Ee\u3992\u3a1e\xbb\u3990igzag;\u699a\u0380cefoprs\u3a36\u3a3b\u3a56\u3a5b\u3a54\u3a61\u3a6airc;\u4175\u0100di\u3a40\u3a51\u0100bg\u3a45\u3a49ar;\u6a5fe\u0100;q\u15fa\u3a4f;\u6259erp;\u6118r;\uc000\ud835\udd34pf;\uc000\ud835\udd68\u0100;e\u1479\u3a66at\xe8\u1479cr;\uc000\ud835\udccc\u0ae3\u178e\u3a87\0\u3a8b\0\u3a90\u3a9b\0\0\u3a9d\u3aa8\u3aab\u3aaf\0\0\u3ac3\u3ace\0\u3ad8\u17dc\u17dftr\xe9\u17d1r;\uc000\ud835\udd35\u0100Aa\u3a94\u3a97r\xf2\u03c3r\xf2\u09f6;\u43be\u0100Aa\u3aa1\u3aa4r\xf2\u03b8r\xf2\u09eba\xf0\u2713is;\u62fb\u0180dpt\u17a4\u3ab5\u3abe\u0100fl\u3aba\u17a9;\uc000\ud835\udd69im\xe5\u17b2\u0100Aa\u3ac7\u3acar\xf2\u03cer\xf2\u0a01\u0100cq\u3ad2\u17b8r;\uc000\ud835\udccd\u0100pt\u17d6\u3adcr\xe9\u17d4\u0400acefiosu\u3af0\u3afd\u3b08\u3b0c\u3b11\u3b15\u3b1b\u3b21c\u0100uy\u3af6\u3afbte\u803b\xfd\u40fd;\u444f\u0100iy\u3b02\u3b06rc;\u4177;\u444bn\u803b\xa5\u40a5r;\uc000\ud835\udd36cy;\u4457pf;\uc000\ud835\udd6acr;\uc000\ud835\udcce\u0100cm\u3b26\u3b29y;\u444el\u803b\xff\u40ff\u0500acdefhiosw\u3b42\u3b48\u3b54\u3b58\u3b64\u3b69\u3b6d\u3b74\u3b7a\u3b80cute;\u417a\u0100ay\u3b4d\u3b52ron;\u417e;\u4437ot;\u417c\u0100et\u3b5d\u3b61tr\xe6\u155fa;\u43b6r;\uc000\ud835\udd37cy;\u4436grarr;\u61ddpf;\uc000\ud835\udd6bcr;\uc000\ud835\udccf\u0100jn\u3b85\u3b87;\u600dj;\u600c"
    .split("")
    .map(function (c) { return c.charCodeAt(0); }));
//# sourceMappingURL=decode-data-html.js.map

/***/ }),

/***/ "./node_modules/entities/lib/generated/decode-data-xml.js":
/*!****************************************************************!*\
  !*** ./node_modules/entities/lib/generated/decode-data-xml.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

// Generated using scripts/write-decode-map.ts
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = new Uint16Array(
// prettier-ignore
"\u0200aglq\t\x15\x18\x1b\u026d\x0f\0\0\x12p;\u4026os;\u4027t;\u403et;\u403cuot;\u4022"
    .split("")
    .map(function (c) { return c.charCodeAt(0); }));
//# sourceMappingURL=decode-data-xml.js.map

/***/ }),

/***/ "./node_modules/entities/lib/generated/encode-html.js":
/*!************************************************************!*\
  !*** ./node_modules/entities/lib/generated/encode-html.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

// Generated using scripts/write-encode-map.ts
Object.defineProperty(exports, "__esModule", ({ value: true }));
function restoreDiff(arr) {
    for (var i = 1; i < arr.length; i++) {
        arr[i][0] += arr[i - 1][0] + 1;
    }
    return arr;
}
// prettier-ignore
exports["default"] = new Map(/* #__PURE__ */ restoreDiff([[9, "&Tab;"], [0, "&NewLine;"], [22, "&excl;"], [0, "&quot;"], [0, "&num;"], [0, "&dollar;"], [0, "&percnt;"], [0, "&amp;"], [0, "&apos;"], [0, "&lpar;"], [0, "&rpar;"], [0, "&ast;"], [0, "&plus;"], [0, "&comma;"], [1, "&period;"], [0, "&sol;"], [10, "&colon;"], [0, "&semi;"], [0, { v: "&lt;", n: 8402, o: "&nvlt;" }], [0, { v: "&equals;", n: 8421, o: "&bne;" }], [0, { v: "&gt;", n: 8402, o: "&nvgt;" }], [0, "&quest;"], [0, "&commat;"], [26, "&lbrack;"], [0, "&bsol;"], [0, "&rbrack;"], [0, "&Hat;"], [0, "&lowbar;"], [0, "&DiacriticalGrave;"], [5, { n: 106, o: "&fjlig;" }], [20, "&lbrace;"], [0, "&verbar;"], [0, "&rbrace;"], [34, "&nbsp;"], [0, "&iexcl;"], [0, "&cent;"], [0, "&pound;"], [0, "&curren;"], [0, "&yen;"], [0, "&brvbar;"], [0, "&sect;"], [0, "&die;"], [0, "&copy;"], [0, "&ordf;"], [0, "&laquo;"], [0, "&not;"], [0, "&shy;"], [0, "&circledR;"], [0, "&macr;"], [0, "&deg;"], [0, "&PlusMinus;"], [0, "&sup2;"], [0, "&sup3;"], [0, "&acute;"], [0, "&micro;"], [0, "&para;"], [0, "&centerdot;"], [0, "&cedil;"], [0, "&sup1;"], [0, "&ordm;"], [0, "&raquo;"], [0, "&frac14;"], [0, "&frac12;"], [0, "&frac34;"], [0, "&iquest;"], [0, "&Agrave;"], [0, "&Aacute;"], [0, "&Acirc;"], [0, "&Atilde;"], [0, "&Auml;"], [0, "&angst;"], [0, "&AElig;"], [0, "&Ccedil;"], [0, "&Egrave;"], [0, "&Eacute;"], [0, "&Ecirc;"], [0, "&Euml;"], [0, "&Igrave;"], [0, "&Iacute;"], [0, "&Icirc;"], [0, "&Iuml;"], [0, "&ETH;"], [0, "&Ntilde;"], [0, "&Ograve;"], [0, "&Oacute;"], [0, "&Ocirc;"], [0, "&Otilde;"], [0, "&Ouml;"], [0, "&times;"], [0, "&Oslash;"], [0, "&Ugrave;"], [0, "&Uacute;"], [0, "&Ucirc;"], [0, "&Uuml;"], [0, "&Yacute;"], [0, "&THORN;"], [0, "&szlig;"], [0, "&agrave;"], [0, "&aacute;"], [0, "&acirc;"], [0, "&atilde;"], [0, "&auml;"], [0, "&aring;"], [0, "&aelig;"], [0, "&ccedil;"], [0, "&egrave;"], [0, "&eacute;"], [0, "&ecirc;"], [0, "&euml;"], [0, "&igrave;"], [0, "&iacute;"], [0, "&icirc;"], [0, "&iuml;"], [0, "&eth;"], [0, "&ntilde;"], [0, "&ograve;"], [0, "&oacute;"], [0, "&ocirc;"], [0, "&otilde;"], [0, "&ouml;"], [0, "&div;"], [0, "&oslash;"], [0, "&ugrave;"], [0, "&uacute;"], [0, "&ucirc;"], [0, "&uuml;"], [0, "&yacute;"], [0, "&thorn;"], [0, "&yuml;"], [0, "&Amacr;"], [0, "&amacr;"], [0, "&Abreve;"], [0, "&abreve;"], [0, "&Aogon;"], [0, "&aogon;"], [0, "&Cacute;"], [0, "&cacute;"], [0, "&Ccirc;"], [0, "&ccirc;"], [0, "&Cdot;"], [0, "&cdot;"], [0, "&Ccaron;"], [0, "&ccaron;"], [0, "&Dcaron;"], [0, "&dcaron;"], [0, "&Dstrok;"], [0, "&dstrok;"], [0, "&Emacr;"], [0, "&emacr;"], [2, "&Edot;"], [0, "&edot;"], [0, "&Eogon;"], [0, "&eogon;"], [0, "&Ecaron;"], [0, "&ecaron;"], [0, "&Gcirc;"], [0, "&gcirc;"], [0, "&Gbreve;"], [0, "&gbreve;"], [0, "&Gdot;"], [0, "&gdot;"], [0, "&Gcedil;"], [1, "&Hcirc;"], [0, "&hcirc;"], [0, "&Hstrok;"], [0, "&hstrok;"], [0, "&Itilde;"], [0, "&itilde;"], [0, "&Imacr;"], [0, "&imacr;"], [2, "&Iogon;"], [0, "&iogon;"], [0, "&Idot;"], [0, "&imath;"], [0, "&IJlig;"], [0, "&ijlig;"], [0, "&Jcirc;"], [0, "&jcirc;"], [0, "&Kcedil;"], [0, "&kcedil;"], [0, "&kgreen;"], [0, "&Lacute;"], [0, "&lacute;"], [0, "&Lcedil;"], [0, "&lcedil;"], [0, "&Lcaron;"], [0, "&lcaron;"], [0, "&Lmidot;"], [0, "&lmidot;"], [0, "&Lstrok;"], [0, "&lstrok;"], [0, "&Nacute;"], [0, "&nacute;"], [0, "&Ncedil;"], [0, "&ncedil;"], [0, "&Ncaron;"], [0, "&ncaron;"], [0, "&napos;"], [0, "&ENG;"], [0, "&eng;"], [0, "&Omacr;"], [0, "&omacr;"], [2, "&Odblac;"], [0, "&odblac;"], [0, "&OElig;"], [0, "&oelig;"], [0, "&Racute;"], [0, "&racute;"], [0, "&Rcedil;"], [0, "&rcedil;"], [0, "&Rcaron;"], [0, "&rcaron;"], [0, "&Sacute;"], [0, "&sacute;"], [0, "&Scirc;"], [0, "&scirc;"], [0, "&Scedil;"], [0, "&scedil;"], [0, "&Scaron;"], [0, "&scaron;"], [0, "&Tcedil;"], [0, "&tcedil;"], [0, "&Tcaron;"], [0, "&tcaron;"], [0, "&Tstrok;"], [0, "&tstrok;"], [0, "&Utilde;"], [0, "&utilde;"], [0, "&Umacr;"], [0, "&umacr;"], [0, "&Ubreve;"], [0, "&ubreve;"], [0, "&Uring;"], [0, "&uring;"], [0, "&Udblac;"], [0, "&udblac;"], [0, "&Uogon;"], [0, "&uogon;"], [0, "&Wcirc;"], [0, "&wcirc;"], [0, "&Ycirc;"], [0, "&ycirc;"], [0, "&Yuml;"], [0, "&Zacute;"], [0, "&zacute;"], [0, "&Zdot;"], [0, "&zdot;"], [0, "&Zcaron;"], [0, "&zcaron;"], [19, "&fnof;"], [34, "&imped;"], [63, "&gacute;"], [65, "&jmath;"], [142, "&circ;"], [0, "&caron;"], [16, "&breve;"], [0, "&DiacriticalDot;"], [0, "&ring;"], [0, "&ogon;"], [0, "&DiacriticalTilde;"], [0, "&dblac;"], [51, "&DownBreve;"], [127, "&Alpha;"], [0, "&Beta;"], [0, "&Gamma;"], [0, "&Delta;"], [0, "&Epsilon;"], [0, "&Zeta;"], [0, "&Eta;"], [0, "&Theta;"], [0, "&Iota;"], [0, "&Kappa;"], [0, "&Lambda;"], [0, "&Mu;"], [0, "&Nu;"], [0, "&Xi;"], [0, "&Omicron;"], [0, "&Pi;"], [0, "&Rho;"], [1, "&Sigma;"], [0, "&Tau;"], [0, "&Upsilon;"], [0, "&Phi;"], [0, "&Chi;"], [0, "&Psi;"], [0, "&ohm;"], [7, "&alpha;"], [0, "&beta;"], [0, "&gamma;"], [0, "&delta;"], [0, "&epsi;"], [0, "&zeta;"], [0, "&eta;"], [0, "&theta;"], [0, "&iota;"], [0, "&kappa;"], [0, "&lambda;"], [0, "&mu;"], [0, "&nu;"], [0, "&xi;"], [0, "&omicron;"], [0, "&pi;"], [0, "&rho;"], [0, "&sigmaf;"], [0, "&sigma;"], [0, "&tau;"], [0, "&upsi;"], [0, "&phi;"], [0, "&chi;"], [0, "&psi;"], [0, "&omega;"], [7, "&thetasym;"], [0, "&Upsi;"], [2, "&phiv;"], [0, "&piv;"], [5, "&Gammad;"], [0, "&digamma;"], [18, "&kappav;"], [0, "&rhov;"], [3, "&epsiv;"], [0, "&backepsilon;"], [10, "&IOcy;"], [0, "&DJcy;"], [0, "&GJcy;"], [0, "&Jukcy;"], [0, "&DScy;"], [0, "&Iukcy;"], [0, "&YIcy;"], [0, "&Jsercy;"], [0, "&LJcy;"], [0, "&NJcy;"], [0, "&TSHcy;"], [0, "&KJcy;"], [1, "&Ubrcy;"], [0, "&DZcy;"], [0, "&Acy;"], [0, "&Bcy;"], [0, "&Vcy;"], [0, "&Gcy;"], [0, "&Dcy;"], [0, "&IEcy;"], [0, "&ZHcy;"], [0, "&Zcy;"], [0, "&Icy;"], [0, "&Jcy;"], [0, "&Kcy;"], [0, "&Lcy;"], [0, "&Mcy;"], [0, "&Ncy;"], [0, "&Ocy;"], [0, "&Pcy;"], [0, "&Rcy;"], [0, "&Scy;"], [0, "&Tcy;"], [0, "&Ucy;"], [0, "&Fcy;"], [0, "&KHcy;"], [0, "&TScy;"], [0, "&CHcy;"], [0, "&SHcy;"], [0, "&SHCHcy;"], [0, "&HARDcy;"], [0, "&Ycy;"], [0, "&SOFTcy;"], [0, "&Ecy;"], [0, "&YUcy;"], [0, "&YAcy;"], [0, "&acy;"], [0, "&bcy;"], [0, "&vcy;"], [0, "&gcy;"], [0, "&dcy;"], [0, "&iecy;"], [0, "&zhcy;"], [0, "&zcy;"], [0, "&icy;"], [0, "&jcy;"], [0, "&kcy;"], [0, "&lcy;"], [0, "&mcy;"], [0, "&ncy;"], [0, "&ocy;"], [0, "&pcy;"], [0, "&rcy;"], [0, "&scy;"], [0, "&tcy;"], [0, "&ucy;"], [0, "&fcy;"], [0, "&khcy;"], [0, "&tscy;"], [0, "&chcy;"], [0, "&shcy;"], [0, "&shchcy;"], [0, "&hardcy;"], [0, "&ycy;"], [0, "&softcy;"], [0, "&ecy;"], [0, "&yucy;"], [0, "&yacy;"], [1, "&iocy;"], [0, "&djcy;"], [0, "&gjcy;"], [0, "&jukcy;"], [0, "&dscy;"], [0, "&iukcy;"], [0, "&yicy;"], [0, "&jsercy;"], [0, "&ljcy;"], [0, "&njcy;"], [0, "&tshcy;"], [0, "&kjcy;"], [1, "&ubrcy;"], [0, "&dzcy;"], [7074, "&ensp;"], [0, "&emsp;"], [0, "&emsp13;"], [0, "&emsp14;"], [1, "&numsp;"], [0, "&puncsp;"], [0, "&ThinSpace;"], [0, "&hairsp;"], [0, "&NegativeMediumSpace;"], [0, "&zwnj;"], [0, "&zwj;"], [0, "&lrm;"], [0, "&rlm;"], [0, "&dash;"], [2, "&ndash;"], [0, "&mdash;"], [0, "&horbar;"], [0, "&Verbar;"], [1, "&lsquo;"], [0, "&CloseCurlyQuote;"], [0, "&lsquor;"], [1, "&ldquo;"], [0, "&CloseCurlyDoubleQuote;"], [0, "&bdquo;"], [1, "&dagger;"], [0, "&Dagger;"], [0, "&bull;"], [2, "&nldr;"], [0, "&hellip;"], [9, "&permil;"], [0, "&pertenk;"], [0, "&prime;"], [0, "&Prime;"], [0, "&tprime;"], [0, "&backprime;"], [3, "&lsaquo;"], [0, "&rsaquo;"], [3, "&oline;"], [2, "&caret;"], [1, "&hybull;"], [0, "&frasl;"], [10, "&bsemi;"], [7, "&qprime;"], [7, { v: "&MediumSpace;", n: 8202, o: "&ThickSpace;" }], [0, "&NoBreak;"], [0, "&af;"], [0, "&InvisibleTimes;"], [0, "&ic;"], [72, "&euro;"], [46, "&tdot;"], [0, "&DotDot;"], [37, "&complexes;"], [2, "&incare;"], [4, "&gscr;"], [0, "&hamilt;"], [0, "&Hfr;"], [0, "&Hopf;"], [0, "&planckh;"], [0, "&hbar;"], [0, "&imagline;"], [0, "&Ifr;"], [0, "&lagran;"], [0, "&ell;"], [1, "&naturals;"], [0, "&numero;"], [0, "&copysr;"], [0, "&weierp;"], [0, "&Popf;"], [0, "&Qopf;"], [0, "&realine;"], [0, "&real;"], [0, "&reals;"], [0, "&rx;"], [3, "&trade;"], [1, "&integers;"], [2, "&mho;"], [0, "&zeetrf;"], [0, "&iiota;"], [2, "&bernou;"], [0, "&Cayleys;"], [1, "&escr;"], [0, "&Escr;"], [0, "&Fouriertrf;"], [1, "&Mellintrf;"], [0, "&order;"], [0, "&alefsym;"], [0, "&beth;"], [0, "&gimel;"], [0, "&daleth;"], [12, "&CapitalDifferentialD;"], [0, "&dd;"], [0, "&ee;"], [0, "&ii;"], [10, "&frac13;"], [0, "&frac23;"], [0, "&frac15;"], [0, "&frac25;"], [0, "&frac35;"], [0, "&frac45;"], [0, "&frac16;"], [0, "&frac56;"], [0, "&frac18;"], [0, "&frac38;"], [0, "&frac58;"], [0, "&frac78;"], [49, "&larr;"], [0, "&ShortUpArrow;"], [0, "&rarr;"], [0, "&darr;"], [0, "&harr;"], [0, "&updownarrow;"], [0, "&nwarr;"], [0, "&nearr;"], [0, "&LowerRightArrow;"], [0, "&LowerLeftArrow;"], [0, "&nlarr;"], [0, "&nrarr;"], [1, { v: "&rarrw;", n: 824, o: "&nrarrw;" }], [0, "&Larr;"], [0, "&Uarr;"], [0, "&Rarr;"], [0, "&Darr;"], [0, "&larrtl;"], [0, "&rarrtl;"], [0, "&LeftTeeArrow;"], [0, "&mapstoup;"], [0, "&map;"], [0, "&DownTeeArrow;"], [1, "&hookleftarrow;"], [0, "&hookrightarrow;"], [0, "&larrlp;"], [0, "&looparrowright;"], [0, "&harrw;"], [0, "&nharr;"], [1, "&lsh;"], [0, "&rsh;"], [0, "&ldsh;"], [0, "&rdsh;"], [1, "&crarr;"], [0, "&cularr;"], [0, "&curarr;"], [2, "&circlearrowleft;"], [0, "&circlearrowright;"], [0, "&leftharpoonup;"], [0, "&DownLeftVector;"], [0, "&RightUpVector;"], [0, "&LeftUpVector;"], [0, "&rharu;"], [0, "&DownRightVector;"], [0, "&dharr;"], [0, "&dharl;"], [0, "&RightArrowLeftArrow;"], [0, "&udarr;"], [0, "&LeftArrowRightArrow;"], [0, "&leftleftarrows;"], [0, "&upuparrows;"], [0, "&rightrightarrows;"], [0, "&ddarr;"], [0, "&leftrightharpoons;"], [0, "&Equilibrium;"], [0, "&nlArr;"], [0, "&nhArr;"], [0, "&nrArr;"], [0, "&DoubleLeftArrow;"], [0, "&DoubleUpArrow;"], [0, "&DoubleRightArrow;"], [0, "&dArr;"], [0, "&DoubleLeftRightArrow;"], [0, "&DoubleUpDownArrow;"], [0, "&nwArr;"], [0, "&neArr;"], [0, "&seArr;"], [0, "&swArr;"], [0, "&lAarr;"], [0, "&rAarr;"], [1, "&zigrarr;"], [6, "&larrb;"], [0, "&rarrb;"], [15, "&DownArrowUpArrow;"], [7, "&loarr;"], [0, "&roarr;"], [0, "&hoarr;"], [0, "&forall;"], [0, "&comp;"], [0, { v: "&part;", n: 824, o: "&npart;" }], [0, "&exist;"], [0, "&nexist;"], [0, "&empty;"], [1, "&Del;"], [0, "&Element;"], [0, "&NotElement;"], [1, "&ni;"], [0, "&notni;"], [2, "&prod;"], [0, "&coprod;"], [0, "&sum;"], [0, "&minus;"], [0, "&MinusPlus;"], [0, "&dotplus;"], [1, "&Backslash;"], [0, "&lowast;"], [0, "&compfn;"], [1, "&radic;"], [2, "&prop;"], [0, "&infin;"], [0, "&angrt;"], [0, { v: "&ang;", n: 8402, o: "&nang;" }], [0, "&angmsd;"], [0, "&angsph;"], [0, "&mid;"], [0, "&nmid;"], [0, "&DoubleVerticalBar;"], [0, "&NotDoubleVerticalBar;"], [0, "&and;"], [0, "&or;"], [0, { v: "&cap;", n: 65024, o: "&caps;" }], [0, { v: "&cup;", n: 65024, o: "&cups;" }], [0, "&int;"], [0, "&Int;"], [0, "&iiint;"], [0, "&conint;"], [0, "&Conint;"], [0, "&Cconint;"], [0, "&cwint;"], [0, "&ClockwiseContourIntegral;"], [0, "&awconint;"], [0, "&there4;"], [0, "&becaus;"], [0, "&ratio;"], [0, "&Colon;"], [0, "&dotminus;"], [1, "&mDDot;"], [0, "&homtht;"], [0, { v: "&sim;", n: 8402, o: "&nvsim;" }], [0, { v: "&backsim;", n: 817, o: "&race;" }], [0, { v: "&ac;", n: 819, o: "&acE;" }], [0, "&acd;"], [0, "&VerticalTilde;"], [0, "&NotTilde;"], [0, { v: "&eqsim;", n: 824, o: "&nesim;" }], [0, "&sime;"], [0, "&NotTildeEqual;"], [0, "&cong;"], [0, "&simne;"], [0, "&ncong;"], [0, "&ap;"], [0, "&nap;"], [0, "&ape;"], [0, { v: "&apid;", n: 824, o: "&napid;" }], [0, "&backcong;"], [0, { v: "&asympeq;", n: 8402, o: "&nvap;" }], [0, { v: "&bump;", n: 824, o: "&nbump;" }], [0, { v: "&bumpe;", n: 824, o: "&nbumpe;" }], [0, { v: "&doteq;", n: 824, o: "&nedot;" }], [0, "&doteqdot;"], [0, "&efDot;"], [0, "&erDot;"], [0, "&Assign;"], [0, "&ecolon;"], [0, "&ecir;"], [0, "&circeq;"], [1, "&wedgeq;"], [0, "&veeeq;"], [1, "&triangleq;"], [2, "&equest;"], [0, "&ne;"], [0, { v: "&Congruent;", n: 8421, o: "&bnequiv;" }], [0, "&nequiv;"], [1, { v: "&le;", n: 8402, o: "&nvle;" }], [0, { v: "&ge;", n: 8402, o: "&nvge;" }], [0, { v: "&lE;", n: 824, o: "&nlE;" }], [0, { v: "&gE;", n: 824, o: "&ngE;" }], [0, { v: "&lnE;", n: 65024, o: "&lvertneqq;" }], [0, { v: "&gnE;", n: 65024, o: "&gvertneqq;" }], [0, { v: "&ll;", n: new Map(/* #__PURE__ */ restoreDiff([[824, "&nLtv;"], [7577, "&nLt;"]])) }], [0, { v: "&gg;", n: new Map(/* #__PURE__ */ restoreDiff([[824, "&nGtv;"], [7577, "&nGt;"]])) }], [0, "&between;"], [0, "&NotCupCap;"], [0, "&nless;"], [0, "&ngt;"], [0, "&nle;"], [0, "&nge;"], [0, "&lesssim;"], [0, "&GreaterTilde;"], [0, "&nlsim;"], [0, "&ngsim;"], [0, "&LessGreater;"], [0, "&gl;"], [0, "&NotLessGreater;"], [0, "&NotGreaterLess;"], [0, "&pr;"], [0, "&sc;"], [0, "&prcue;"], [0, "&sccue;"], [0, "&PrecedesTilde;"], [0, { v: "&scsim;", n: 824, o: "&NotSucceedsTilde;" }], [0, "&NotPrecedes;"], [0, "&NotSucceeds;"], [0, { v: "&sub;", n: 8402, o: "&NotSubset;" }], [0, { v: "&sup;", n: 8402, o: "&NotSuperset;" }], [0, "&nsub;"], [0, "&nsup;"], [0, "&sube;"], [0, "&supe;"], [0, "&NotSubsetEqual;"], [0, "&NotSupersetEqual;"], [0, { v: "&subne;", n: 65024, o: "&varsubsetneq;" }], [0, { v: "&supne;", n: 65024, o: "&varsupsetneq;" }], [1, "&cupdot;"], [0, "&UnionPlus;"], [0, { v: "&sqsub;", n: 824, o: "&NotSquareSubset;" }], [0, { v: "&sqsup;", n: 824, o: "&NotSquareSuperset;" }], [0, "&sqsube;"], [0, "&sqsupe;"], [0, { v: "&sqcap;", n: 65024, o: "&sqcaps;" }], [0, { v: "&sqcup;", n: 65024, o: "&sqcups;" }], [0, "&CirclePlus;"], [0, "&CircleMinus;"], [0, "&CircleTimes;"], [0, "&osol;"], [0, "&CircleDot;"], [0, "&circledcirc;"], [0, "&circledast;"], [1, "&circleddash;"], [0, "&boxplus;"], [0, "&boxminus;"], [0, "&boxtimes;"], [0, "&dotsquare;"], [0, "&RightTee;"], [0, "&dashv;"], [0, "&DownTee;"], [0, "&bot;"], [1, "&models;"], [0, "&DoubleRightTee;"], [0, "&Vdash;"], [0, "&Vvdash;"], [0, "&VDash;"], [0, "&nvdash;"], [0, "&nvDash;"], [0, "&nVdash;"], [0, "&nVDash;"], [0, "&prurel;"], [1, "&LeftTriangle;"], [0, "&RightTriangle;"], [0, { v: "&LeftTriangleEqual;", n: 8402, o: "&nvltrie;" }], [0, { v: "&RightTriangleEqual;", n: 8402, o: "&nvrtrie;" }], [0, "&origof;"], [0, "&imof;"], [0, "&multimap;"], [0, "&hercon;"], [0, "&intcal;"], [0, "&veebar;"], [1, "&barvee;"], [0, "&angrtvb;"], [0, "&lrtri;"], [0, "&bigwedge;"], [0, "&bigvee;"], [0, "&bigcap;"], [0, "&bigcup;"], [0, "&diam;"], [0, "&sdot;"], [0, "&sstarf;"], [0, "&divideontimes;"], [0, "&bowtie;"], [0, "&ltimes;"], [0, "&rtimes;"], [0, "&leftthreetimes;"], [0, "&rightthreetimes;"], [0, "&backsimeq;"], [0, "&curlyvee;"], [0, "&curlywedge;"], [0, "&Sub;"], [0, "&Sup;"], [0, "&Cap;"], [0, "&Cup;"], [0, "&fork;"], [0, "&epar;"], [0, "&lessdot;"], [0, "&gtdot;"], [0, { v: "&Ll;", n: 824, o: "&nLl;" }], [0, { v: "&Gg;", n: 824, o: "&nGg;" }], [0, { v: "&leg;", n: 65024, o: "&lesg;" }], [0, { v: "&gel;", n: 65024, o: "&gesl;" }], [2, "&cuepr;"], [0, "&cuesc;"], [0, "&NotPrecedesSlantEqual;"], [0, "&NotSucceedsSlantEqual;"], [0, "&NotSquareSubsetEqual;"], [0, "&NotSquareSupersetEqual;"], [2, "&lnsim;"], [0, "&gnsim;"], [0, "&precnsim;"], [0, "&scnsim;"], [0, "&nltri;"], [0, "&NotRightTriangle;"], [0, "&nltrie;"], [0, "&NotRightTriangleEqual;"], [0, "&vellip;"], [0, "&ctdot;"], [0, "&utdot;"], [0, "&dtdot;"], [0, "&disin;"], [0, "&isinsv;"], [0, "&isins;"], [0, { v: "&isindot;", n: 824, o: "&notindot;" }], [0, "&notinvc;"], [0, "&notinvb;"], [1, { v: "&isinE;", n: 824, o: "&notinE;" }], [0, "&nisd;"], [0, "&xnis;"], [0, "&nis;"], [0, "&notnivc;"], [0, "&notnivb;"], [6, "&barwed;"], [0, "&Barwed;"], [1, "&lceil;"], [0, "&rceil;"], [0, "&LeftFloor;"], [0, "&rfloor;"], [0, "&drcrop;"], [0, "&dlcrop;"], [0, "&urcrop;"], [0, "&ulcrop;"], [0, "&bnot;"], [1, "&profline;"], [0, "&profsurf;"], [1, "&telrec;"], [0, "&target;"], [5, "&ulcorn;"], [0, "&urcorn;"], [0, "&dlcorn;"], [0, "&drcorn;"], [2, "&frown;"], [0, "&smile;"], [9, "&cylcty;"], [0, "&profalar;"], [7, "&topbot;"], [6, "&ovbar;"], [1, "&solbar;"], [60, "&angzarr;"], [51, "&lmoustache;"], [0, "&rmoustache;"], [2, "&OverBracket;"], [0, "&bbrk;"], [0, "&bbrktbrk;"], [37, "&OverParenthesis;"], [0, "&UnderParenthesis;"], [0, "&OverBrace;"], [0, "&UnderBrace;"], [2, "&trpezium;"], [4, "&elinters;"], [59, "&blank;"], [164, "&circledS;"], [55, "&boxh;"], [1, "&boxv;"], [9, "&boxdr;"], [3, "&boxdl;"], [3, "&boxur;"], [3, "&boxul;"], [3, "&boxvr;"], [7, "&boxvl;"], [7, "&boxhd;"], [7, "&boxhu;"], [7, "&boxvh;"], [19, "&boxH;"], [0, "&boxV;"], [0, "&boxdR;"], [0, "&boxDr;"], [0, "&boxDR;"], [0, "&boxdL;"], [0, "&boxDl;"], [0, "&boxDL;"], [0, "&boxuR;"], [0, "&boxUr;"], [0, "&boxUR;"], [0, "&boxuL;"], [0, "&boxUl;"], [0, "&boxUL;"], [0, "&boxvR;"], [0, "&boxVr;"], [0, "&boxVR;"], [0, "&boxvL;"], [0, "&boxVl;"], [0, "&boxVL;"], [0, "&boxHd;"], [0, "&boxhD;"], [0, "&boxHD;"], [0, "&boxHu;"], [0, "&boxhU;"], [0, "&boxHU;"], [0, "&boxvH;"], [0, "&boxVh;"], [0, "&boxVH;"], [19, "&uhblk;"], [3, "&lhblk;"], [3, "&block;"], [8, "&blk14;"], [0, "&blk12;"], [0, "&blk34;"], [13, "&square;"], [8, "&blacksquare;"], [0, "&EmptyVerySmallSquare;"], [1, "&rect;"], [0, "&marker;"], [2, "&fltns;"], [1, "&bigtriangleup;"], [0, "&blacktriangle;"], [0, "&triangle;"], [2, "&blacktriangleright;"], [0, "&rtri;"], [3, "&bigtriangledown;"], [0, "&blacktriangledown;"], [0, "&dtri;"], [2, "&blacktriangleleft;"], [0, "&ltri;"], [6, "&loz;"], [0, "&cir;"], [32, "&tridot;"], [2, "&bigcirc;"], [8, "&ultri;"], [0, "&urtri;"], [0, "&lltri;"], [0, "&EmptySmallSquare;"], [0, "&FilledSmallSquare;"], [8, "&bigstar;"], [0, "&star;"], [7, "&phone;"], [49, "&female;"], [1, "&male;"], [29, "&spades;"], [2, "&clubs;"], [1, "&hearts;"], [0, "&diamondsuit;"], [3, "&sung;"], [2, "&flat;"], [0, "&natural;"], [0, "&sharp;"], [163, "&check;"], [3, "&cross;"], [8, "&malt;"], [21, "&sext;"], [33, "&VerticalSeparator;"], [25, "&lbbrk;"], [0, "&rbbrk;"], [84, "&bsolhsub;"], [0, "&suphsol;"], [28, "&LeftDoubleBracket;"], [0, "&RightDoubleBracket;"], [0, "&lang;"], [0, "&rang;"], [0, "&Lang;"], [0, "&Rang;"], [0, "&loang;"], [0, "&roang;"], [7, "&longleftarrow;"], [0, "&longrightarrow;"], [0, "&longleftrightarrow;"], [0, "&DoubleLongLeftArrow;"], [0, "&DoubleLongRightArrow;"], [0, "&DoubleLongLeftRightArrow;"], [1, "&longmapsto;"], [2, "&dzigrarr;"], [258, "&nvlArr;"], [0, "&nvrArr;"], [0, "&nvHarr;"], [0, "&Map;"], [6, "&lbarr;"], [0, "&bkarow;"], [0, "&lBarr;"], [0, "&dbkarow;"], [0, "&drbkarow;"], [0, "&DDotrahd;"], [0, "&UpArrowBar;"], [0, "&DownArrowBar;"], [2, "&Rarrtl;"], [2, "&latail;"], [0, "&ratail;"], [0, "&lAtail;"], [0, "&rAtail;"], [0, "&larrfs;"], [0, "&rarrfs;"], [0, "&larrbfs;"], [0, "&rarrbfs;"], [2, "&nwarhk;"], [0, "&nearhk;"], [0, "&hksearow;"], [0, "&hkswarow;"], [0, "&nwnear;"], [0, "&nesear;"], [0, "&seswar;"], [0, "&swnwar;"], [8, { v: "&rarrc;", n: 824, o: "&nrarrc;" }], [1, "&cudarrr;"], [0, "&ldca;"], [0, "&rdca;"], [0, "&cudarrl;"], [0, "&larrpl;"], [2, "&curarrm;"], [0, "&cularrp;"], [7, "&rarrpl;"], [2, "&harrcir;"], [0, "&Uarrocir;"], [0, "&lurdshar;"], [0, "&ldrushar;"], [2, "&LeftRightVector;"], [0, "&RightUpDownVector;"], [0, "&DownLeftRightVector;"], [0, "&LeftUpDownVector;"], [0, "&LeftVectorBar;"], [0, "&RightVectorBar;"], [0, "&RightUpVectorBar;"], [0, "&RightDownVectorBar;"], [0, "&DownLeftVectorBar;"], [0, "&DownRightVectorBar;"], [0, "&LeftUpVectorBar;"], [0, "&LeftDownVectorBar;"], [0, "&LeftTeeVector;"], [0, "&RightTeeVector;"], [0, "&RightUpTeeVector;"], [0, "&RightDownTeeVector;"], [0, "&DownLeftTeeVector;"], [0, "&DownRightTeeVector;"], [0, "&LeftUpTeeVector;"], [0, "&LeftDownTeeVector;"], [0, "&lHar;"], [0, "&uHar;"], [0, "&rHar;"], [0, "&dHar;"], [0, "&luruhar;"], [0, "&ldrdhar;"], [0, "&ruluhar;"], [0, "&rdldhar;"], [0, "&lharul;"], [0, "&llhard;"], [0, "&rharul;"], [0, "&lrhard;"], [0, "&udhar;"], [0, "&duhar;"], [0, "&RoundImplies;"], [0, "&erarr;"], [0, "&simrarr;"], [0, "&larrsim;"], [0, "&rarrsim;"], [0, "&rarrap;"], [0, "&ltlarr;"], [1, "&gtrarr;"], [0, "&subrarr;"], [1, "&suplarr;"], [0, "&lfisht;"], [0, "&rfisht;"], [0, "&ufisht;"], [0, "&dfisht;"], [5, "&lopar;"], [0, "&ropar;"], [4, "&lbrke;"], [0, "&rbrke;"], [0, "&lbrkslu;"], [0, "&rbrksld;"], [0, "&lbrksld;"], [0, "&rbrkslu;"], [0, "&langd;"], [0, "&rangd;"], [0, "&lparlt;"], [0, "&rpargt;"], [0, "&gtlPar;"], [0, "&ltrPar;"], [3, "&vzigzag;"], [1, "&vangrt;"], [0, "&angrtvbd;"], [6, "&ange;"], [0, "&range;"], [0, "&dwangle;"], [0, "&uwangle;"], [0, "&angmsdaa;"], [0, "&angmsdab;"], [0, "&angmsdac;"], [0, "&angmsdad;"], [0, "&angmsdae;"], [0, "&angmsdaf;"], [0, "&angmsdag;"], [0, "&angmsdah;"], [0, "&bemptyv;"], [0, "&demptyv;"], [0, "&cemptyv;"], [0, "&raemptyv;"], [0, "&laemptyv;"], [0, "&ohbar;"], [0, "&omid;"], [0, "&opar;"], [1, "&operp;"], [1, "&olcross;"], [0, "&odsold;"], [1, "&olcir;"], [0, "&ofcir;"], [0, "&olt;"], [0, "&ogt;"], [0, "&cirscir;"], [0, "&cirE;"], [0, "&solb;"], [0, "&bsolb;"], [3, "&boxbox;"], [3, "&trisb;"], [0, "&rtriltri;"], [0, { v: "&LeftTriangleBar;", n: 824, o: "&NotLeftTriangleBar;" }], [0, { v: "&RightTriangleBar;", n: 824, o: "&NotRightTriangleBar;" }], [11, "&iinfin;"], [0, "&infintie;"], [0, "&nvinfin;"], [4, "&eparsl;"], [0, "&smeparsl;"], [0, "&eqvparsl;"], [5, "&blacklozenge;"], [8, "&RuleDelayed;"], [1, "&dsol;"], [9, "&bigodot;"], [0, "&bigoplus;"], [0, "&bigotimes;"], [1, "&biguplus;"], [1, "&bigsqcup;"], [5, "&iiiint;"], [0, "&fpartint;"], [2, "&cirfnint;"], [0, "&awint;"], [0, "&rppolint;"], [0, "&scpolint;"], [0, "&npolint;"], [0, "&pointint;"], [0, "&quatint;"], [0, "&intlarhk;"], [10, "&pluscir;"], [0, "&plusacir;"], [0, "&simplus;"], [0, "&plusdu;"], [0, "&plussim;"], [0, "&plustwo;"], [1, "&mcomma;"], [0, "&minusdu;"], [2, "&loplus;"], [0, "&roplus;"], [0, "&Cross;"], [0, "&timesd;"], [0, "&timesbar;"], [1, "&smashp;"], [0, "&lotimes;"], [0, "&rotimes;"], [0, "&otimesas;"], [0, "&Otimes;"], [0, "&odiv;"], [0, "&triplus;"], [0, "&triminus;"], [0, "&tritime;"], [0, "&intprod;"], [2, "&amalg;"], [0, "&capdot;"], [1, "&ncup;"], [0, "&ncap;"], [0, "&capand;"], [0, "&cupor;"], [0, "&cupcap;"], [0, "&capcup;"], [0, "&cupbrcap;"], [0, "&capbrcup;"], [0, "&cupcup;"], [0, "&capcap;"], [0, "&ccups;"], [0, "&ccaps;"], [2, "&ccupssm;"], [2, "&And;"], [0, "&Or;"], [0, "&andand;"], [0, "&oror;"], [0, "&orslope;"], [0, "&andslope;"], [1, "&andv;"], [0, "&orv;"], [0, "&andd;"], [0, "&ord;"], [1, "&wedbar;"], [6, "&sdote;"], [3, "&simdot;"], [2, { v: "&congdot;", n: 824, o: "&ncongdot;" }], [0, "&easter;"], [0, "&apacir;"], [0, { v: "&apE;", n: 824, o: "&napE;" }], [0, "&eplus;"], [0, "&pluse;"], [0, "&Esim;"], [0, "&Colone;"], [0, "&Equal;"], [1, "&ddotseq;"], [0, "&equivDD;"], [0, "&ltcir;"], [0, "&gtcir;"], [0, "&ltquest;"], [0, "&gtquest;"], [0, { v: "&leqslant;", n: 824, o: "&nleqslant;" }], [0, { v: "&geqslant;", n: 824, o: "&ngeqslant;" }], [0, "&lesdot;"], [0, "&gesdot;"], [0, "&lesdoto;"], [0, "&gesdoto;"], [0, "&lesdotor;"], [0, "&gesdotol;"], [0, "&lap;"], [0, "&gap;"], [0, "&lne;"], [0, "&gne;"], [0, "&lnap;"], [0, "&gnap;"], [0, "&lEg;"], [0, "&gEl;"], [0, "&lsime;"], [0, "&gsime;"], [0, "&lsimg;"], [0, "&gsiml;"], [0, "&lgE;"], [0, "&glE;"], [0, "&lesges;"], [0, "&gesles;"], [0, "&els;"], [0, "&egs;"], [0, "&elsdot;"], [0, "&egsdot;"], [0, "&el;"], [0, "&eg;"], [2, "&siml;"], [0, "&simg;"], [0, "&simlE;"], [0, "&simgE;"], [0, { v: "&LessLess;", n: 824, o: "&NotNestedLessLess;" }], [0, { v: "&GreaterGreater;", n: 824, o: "&NotNestedGreaterGreater;" }], [1, "&glj;"], [0, "&gla;"], [0, "&ltcc;"], [0, "&gtcc;"], [0, "&lescc;"], [0, "&gescc;"], [0, "&smt;"], [0, "&lat;"], [0, { v: "&smte;", n: 65024, o: "&smtes;" }], [0, { v: "&late;", n: 65024, o: "&lates;" }], [0, "&bumpE;"], [0, { v: "&PrecedesEqual;", n: 824, o: "&NotPrecedesEqual;" }], [0, { v: "&sce;", n: 824, o: "&NotSucceedsEqual;" }], [2, "&prE;"], [0, "&scE;"], [0, "&precneqq;"], [0, "&scnE;"], [0, "&prap;"], [0, "&scap;"], [0, "&precnapprox;"], [0, "&scnap;"], [0, "&Pr;"], [0, "&Sc;"], [0, "&subdot;"], [0, "&supdot;"], [0, "&subplus;"], [0, "&supplus;"], [0, "&submult;"], [0, "&supmult;"], [0, "&subedot;"], [0, "&supedot;"], [0, { v: "&subE;", n: 824, o: "&nsubE;" }], [0, { v: "&supE;", n: 824, o: "&nsupE;" }], [0, "&subsim;"], [0, "&supsim;"], [2, { v: "&subnE;", n: 65024, o: "&varsubsetneqq;" }], [0, { v: "&supnE;", n: 65024, o: "&varsupsetneqq;" }], [2, "&csub;"], [0, "&csup;"], [0, "&csube;"], [0, "&csupe;"], [0, "&subsup;"], [0, "&supsub;"], [0, "&subsub;"], [0, "&supsup;"], [0, "&suphsub;"], [0, "&supdsub;"], [0, "&forkv;"], [0, "&topfork;"], [0, "&mlcp;"], [8, "&Dashv;"], [1, "&Vdashl;"], [0, "&Barv;"], [0, "&vBar;"], [0, "&vBarv;"], [1, "&Vbar;"], [0, "&Not;"], [0, "&bNot;"], [0, "&rnmid;"], [0, "&cirmid;"], [0, "&midcir;"], [0, "&topcir;"], [0, "&nhpar;"], [0, "&parsim;"], [9, { v: "&parsl;", n: 8421, o: "&nparsl;" }], [44343, { n: new Map(/* #__PURE__ */ restoreDiff([[56476, "&Ascr;"], [1, "&Cscr;"], [0, "&Dscr;"], [2, "&Gscr;"], [2, "&Jscr;"], [0, "&Kscr;"], [2, "&Nscr;"], [0, "&Oscr;"], [0, "&Pscr;"], [0, "&Qscr;"], [1, "&Sscr;"], [0, "&Tscr;"], [0, "&Uscr;"], [0, "&Vscr;"], [0, "&Wscr;"], [0, "&Xscr;"], [0, "&Yscr;"], [0, "&Zscr;"], [0, "&ascr;"], [0, "&bscr;"], [0, "&cscr;"], [0, "&dscr;"], [1, "&fscr;"], [1, "&hscr;"], [0, "&iscr;"], [0, "&jscr;"], [0, "&kscr;"], [0, "&lscr;"], [0, "&mscr;"], [0, "&nscr;"], [1, "&pscr;"], [0, "&qscr;"], [0, "&rscr;"], [0, "&sscr;"], [0, "&tscr;"], [0, "&uscr;"], [0, "&vscr;"], [0, "&wscr;"], [0, "&xscr;"], [0, "&yscr;"], [0, "&zscr;"], [52, "&Afr;"], [0, "&Bfr;"], [1, "&Dfr;"], [0, "&Efr;"], [0, "&Ffr;"], [0, "&Gfr;"], [2, "&Jfr;"], [0, "&Kfr;"], [0, "&Lfr;"], [0, "&Mfr;"], [0, "&Nfr;"], [0, "&Ofr;"], [0, "&Pfr;"], [0, "&Qfr;"], [1, "&Sfr;"], [0, "&Tfr;"], [0, "&Ufr;"], [0, "&Vfr;"], [0, "&Wfr;"], [0, "&Xfr;"], [0, "&Yfr;"], [1, "&afr;"], [0, "&bfr;"], [0, "&cfr;"], [0, "&dfr;"], [0, "&efr;"], [0, "&ffr;"], [0, "&gfr;"], [0, "&hfr;"], [0, "&ifr;"], [0, "&jfr;"], [0, "&kfr;"], [0, "&lfr;"], [0, "&mfr;"], [0, "&nfr;"], [0, "&ofr;"], [0, "&pfr;"], [0, "&qfr;"], [0, "&rfr;"], [0, "&sfr;"], [0, "&tfr;"], [0, "&ufr;"], [0, "&vfr;"], [0, "&wfr;"], [0, "&xfr;"], [0, "&yfr;"], [0, "&zfr;"], [0, "&Aopf;"], [0, "&Bopf;"], [1, "&Dopf;"], [0, "&Eopf;"], [0, "&Fopf;"], [0, "&Gopf;"], [1, "&Iopf;"], [0, "&Jopf;"], [0, "&Kopf;"], [0, "&Lopf;"], [0, "&Mopf;"], [1, "&Oopf;"], [3, "&Sopf;"], [0, "&Topf;"], [0, "&Uopf;"], [0, "&Vopf;"], [0, "&Wopf;"], [0, "&Xopf;"], [0, "&Yopf;"], [1, "&aopf;"], [0, "&bopf;"], [0, "&copf;"], [0, "&dopf;"], [0, "&eopf;"], [0, "&fopf;"], [0, "&gopf;"], [0, "&hopf;"], [0, "&iopf;"], [0, "&jopf;"], [0, "&kopf;"], [0, "&lopf;"], [0, "&mopf;"], [0, "&nopf;"], [0, "&oopf;"], [0, "&popf;"], [0, "&qopf;"], [0, "&ropf;"], [0, "&sopf;"], [0, "&topf;"], [0, "&uopf;"], [0, "&vopf;"], [0, "&wopf;"], [0, "&xopf;"], [0, "&yopf;"], [0, "&zopf;"]])) }], [8906, "&fflig;"], [0, "&filig;"], [0, "&fllig;"], [0, "&ffilig;"], [0, "&ffllig;"]]));
//# sourceMappingURL=encode-html.js.map

/***/ }),

/***/ "./node_modules/entities/lib/index.js":
/*!********************************************!*\
  !*** ./node_modules/entities/lib/index.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.decodeXMLStrict = exports.decodeHTML5Strict = exports.decodeHTML4Strict = exports.decodeHTML5 = exports.decodeHTML4 = exports.decodeHTMLAttribute = exports.decodeHTMLStrict = exports.decodeHTML = exports.decodeXML = exports.DecodingMode = exports.EntityDecoder = exports.encodeHTML5 = exports.encodeHTML4 = exports.encodeNonAsciiHTML = exports.encodeHTML = exports.escapeText = exports.escapeAttribute = exports.escapeUTF8 = exports.escape = exports.encodeXML = exports.encode = exports.decodeStrict = exports.decode = exports.EncodingMode = exports.EntityLevel = void 0;
var decode_js_1 = __webpack_require__(/*! ./decode.js */ "./node_modules/entities/lib/decode.js");
var encode_js_1 = __webpack_require__(/*! ./encode.js */ "./node_modules/entities/lib/encode.js");
var escape_js_1 = __webpack_require__(/*! ./escape.js */ "./node_modules/entities/lib/escape.js");
/** The level of entities to support. */
var EntityLevel;
(function (EntityLevel) {
    /** Support only XML entities. */
    EntityLevel[EntityLevel["XML"] = 0] = "XML";
    /** Support HTML entities, which are a superset of XML entities. */
    EntityLevel[EntityLevel["HTML"] = 1] = "HTML";
})(EntityLevel = exports.EntityLevel || (exports.EntityLevel = {}));
var EncodingMode;
(function (EncodingMode) {
    /**
     * The output is UTF-8 encoded. Only characters that need escaping within
     * XML will be escaped.
     */
    EncodingMode[EncodingMode["UTF8"] = 0] = "UTF8";
    /**
     * The output consists only of ASCII characters. Characters that need
     * escaping within HTML, and characters that aren't ASCII characters will
     * be escaped.
     */
    EncodingMode[EncodingMode["ASCII"] = 1] = "ASCII";
    /**
     * Encode all characters that have an equivalent entity, as well as all
     * characters that are not ASCII characters.
     */
    EncodingMode[EncodingMode["Extensive"] = 2] = "Extensive";
    /**
     * Encode all characters that have to be escaped in HTML attributes,
     * following {@link https://html.spec.whatwg.org/multipage/parsing.html#escapingString}.
     */
    EncodingMode[EncodingMode["Attribute"] = 3] = "Attribute";
    /**
     * Encode all characters that have to be escaped in HTML text,
     * following {@link https://html.spec.whatwg.org/multipage/parsing.html#escapingString}.
     */
    EncodingMode[EncodingMode["Text"] = 4] = "Text";
})(EncodingMode = exports.EncodingMode || (exports.EncodingMode = {}));
/**
 * Decodes a string with entities.
 *
 * @param data String to decode.
 * @param options Decoding options.
 */
function decode(data, options) {
    if (options === void 0) { options = EntityLevel.XML; }
    var level = typeof options === "number" ? options : options.level;
    if (level === EntityLevel.HTML) {
        var mode = typeof options === "object" ? options.mode : undefined;
        return (0, decode_js_1.decodeHTML)(data, mode);
    }
    return (0, decode_js_1.decodeXML)(data);
}
exports.decode = decode;
/**
 * Decodes a string with entities. Does not allow missing trailing semicolons for entities.
 *
 * @param data String to decode.
 * @param options Decoding options.
 * @deprecated Use `decode` with the `mode` set to `Strict`.
 */
function decodeStrict(data, options) {
    var _a;
    if (options === void 0) { options = EntityLevel.XML; }
    var opts = typeof options === "number" ? { level: options } : options;
    (_a = opts.mode) !== null && _a !== void 0 ? _a : (opts.mode = decode_js_1.DecodingMode.Strict);
    return decode(data, opts);
}
exports.decodeStrict = decodeStrict;
/**
 * Encodes a string with entities.
 *
 * @param data String to encode.
 * @param options Encoding options.
 */
function encode(data, options) {
    if (options === void 0) { options = EntityLevel.XML; }
    var opts = typeof options === "number" ? { level: options } : options;
    // Mode `UTF8` just escapes XML entities
    if (opts.mode === EncodingMode.UTF8)
        return (0, escape_js_1.escapeUTF8)(data);
    if (opts.mode === EncodingMode.Attribute)
        return (0, escape_js_1.escapeAttribute)(data);
    if (opts.mode === EncodingMode.Text)
        return (0, escape_js_1.escapeText)(data);
    if (opts.level === EntityLevel.HTML) {
        if (opts.mode === EncodingMode.ASCII) {
            return (0, encode_js_1.encodeNonAsciiHTML)(data);
        }
        return (0, encode_js_1.encodeHTML)(data);
    }
    // ASCII and Extensive are equivalent
    return (0, escape_js_1.encodeXML)(data);
}
exports.encode = encode;
var escape_js_2 = __webpack_require__(/*! ./escape.js */ "./node_modules/entities/lib/escape.js");
Object.defineProperty(exports, "encodeXML", ({ enumerable: true, get: function () { return escape_js_2.encodeXML; } }));
Object.defineProperty(exports, "escape", ({ enumerable: true, get: function () { return escape_js_2.escape; } }));
Object.defineProperty(exports, "escapeUTF8", ({ enumerable: true, get: function () { return escape_js_2.escapeUTF8; } }));
Object.defineProperty(exports, "escapeAttribute", ({ enumerable: true, get: function () { return escape_js_2.escapeAttribute; } }));
Object.defineProperty(exports, "escapeText", ({ enumerable: true, get: function () { return escape_js_2.escapeText; } }));
var encode_js_2 = __webpack_require__(/*! ./encode.js */ "./node_modules/entities/lib/encode.js");
Object.defineProperty(exports, "encodeHTML", ({ enumerable: true, get: function () { return encode_js_2.encodeHTML; } }));
Object.defineProperty(exports, "encodeNonAsciiHTML", ({ enumerable: true, get: function () { return encode_js_2.encodeNonAsciiHTML; } }));
// Legacy aliases (deprecated)
Object.defineProperty(exports, "encodeHTML4", ({ enumerable: true, get: function () { return encode_js_2.encodeHTML; } }));
Object.defineProperty(exports, "encodeHTML5", ({ enumerable: true, get: function () { return encode_js_2.encodeHTML; } }));
var decode_js_2 = __webpack_require__(/*! ./decode.js */ "./node_modules/entities/lib/decode.js");
Object.defineProperty(exports, "EntityDecoder", ({ enumerable: true, get: function () { return decode_js_2.EntityDecoder; } }));
Object.defineProperty(exports, "DecodingMode", ({ enumerable: true, get: function () { return decode_js_2.DecodingMode; } }));
Object.defineProperty(exports, "decodeXML", ({ enumerable: true, get: function () { return decode_js_2.decodeXML; } }));
Object.defineProperty(exports, "decodeHTML", ({ enumerable: true, get: function () { return decode_js_2.decodeHTML; } }));
Object.defineProperty(exports, "decodeHTMLStrict", ({ enumerable: true, get: function () { return decode_js_2.decodeHTMLStrict; } }));
Object.defineProperty(exports, "decodeHTMLAttribute", ({ enumerable: true, get: function () { return decode_js_2.decodeHTMLAttribute; } }));
// Legacy aliases (deprecated)
Object.defineProperty(exports, "decodeHTML4", ({ enumerable: true, get: function () { return decode_js_2.decodeHTML; } }));
Object.defineProperty(exports, "decodeHTML5", ({ enumerable: true, get: function () { return decode_js_2.decodeHTML; } }));
Object.defineProperty(exports, "decodeHTML4Strict", ({ enumerable: true, get: function () { return decode_js_2.decodeHTMLStrict; } }));
Object.defineProperty(exports, "decodeHTML5Strict", ({ enumerable: true, get: function () { return decode_js_2.decodeHTMLStrict; } }));
Object.defineProperty(exports, "decodeXMLStrict", ({ enumerable: true, get: function () { return decode_js_2.decodeXML; } }));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/hex-to-rgba/build/index.js":
/*!*************************************************!*\
  !*** ./node_modules/hex-to-rgba/build/index.js ***!
  \*************************************************/
/***/ (function(module) {

"use strict";


var removeHash = function removeHash(hex) {
  return hex.charAt(0) === '#' ? hex.slice(1) : hex;
};

var parseHex = function parseHex(nakedHex) {
  var isShort = nakedHex.length === 3 || nakedHex.length === 4;
  var twoDigitHexR = isShort ? "".concat(nakedHex.slice(0, 1)).concat(nakedHex.slice(0, 1)) : nakedHex.slice(0, 2);
  var twoDigitHexG = isShort ? "".concat(nakedHex.slice(1, 2)).concat(nakedHex.slice(1, 2)) : nakedHex.slice(2, 4);
  var twoDigitHexB = isShort ? "".concat(nakedHex.slice(2, 3)).concat(nakedHex.slice(2, 3)) : nakedHex.slice(4, 6);
  var twoDigitHexA = (isShort ? "".concat(nakedHex.slice(3, 4)).concat(nakedHex.slice(3, 4)) : nakedHex.slice(6, 8)) || 'ff'; // const numericA = +((parseInt(a, 16) / 255).toFixed(2));

  return {
    r: twoDigitHexR,
    g: twoDigitHexG,
    b: twoDigitHexB,
    a: twoDigitHexA
  };
};

var hexToDecimal = function hexToDecimal(hex) {
  return parseInt(hex, 16);
};

var hexesToDecimals = function hexesToDecimals(_ref) {
  var r = _ref.r,
      g = _ref.g,
      b = _ref.b,
      a = _ref.a;
  return {
    r: hexToDecimal(r),
    g: hexToDecimal(g),
    b: hexToDecimal(b),
    a: +(hexToDecimal(a) / 255).toFixed(2)
  };
};

var isNumeric = function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}; // eslint-disable-line no-restricted-globals, max-len


var formatRgb = function formatRgb(decimalObject, parameterA) {
  var r = decimalObject.r,
      g = decimalObject.g,
      b = decimalObject.b,
      parsedA = decimalObject.a;
  var a = isNumeric(parameterA) ? parameterA : parsedA;
  return "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(a, ")");
};
/**
 * Turns an old-fashioned css hex color value into a rgb color value.
 *
 * If you specify an alpha value, you'll get a rgba() value instead.
 *
 * @param The hex value to convert. ('123456'. '#123456', ''123', '#123')
 * @param An alpha value to apply. (optional) ('0.5', '0.25')
 * @return An rgb or rgba value. ('rgb(11, 22, 33)'. 'rgba(11, 22, 33, 0.5)')
 */


var hexToRgba = function hexToRgba(hex, a) {
  var hashlessHex = removeHash(hex);
  var hexObject = parseHex(hashlessHex);
  var decimalObject = hexesToDecimals(hexObject);
  return formatRgb(decimalObject, a);
};

module.exports = hexToRgba;

/***/ }),

/***/ "./node_modules/html-to-react/index.js":
/*!*********************************************!*\
  !*** ./node_modules/html-to-react/index.js ***!
  \*********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


const parser = __webpack_require__(/*! ./lib/parser */ "./node_modules/html-to-react/lib/parser.js");
const processingInstructions = __webpack_require__(/*! ./lib/processing-instructions */ "./node_modules/html-to-react/lib/processing-instructions.js");
const isValidNodeDefinitions = __webpack_require__(/*! ./lib/is-valid-node-definitions */ "./node_modules/html-to-react/lib/is-valid-node-definitions.js");
const processNodeDefinitions = __webpack_require__(/*! ./lib/process-node-definitions */ "./node_modules/html-to-react/lib/process-node-definitions.js");

module.exports = {
  Parser: parser,
  ProcessingInstructions: processingInstructions,
  IsValidNodeDefinitions: isValidNodeDefinitions,
  ProcessNodeDefinitions: processNodeDefinitions,
};


/***/ }),

/***/ "./node_modules/html-to-react/lib/camel-case-attribute-names.js":
/*!**********************************************************************!*\
  !*** ./node_modules/html-to-react/lib/camel-case-attribute-names.js ***!
  \**********************************************************************/
/***/ (function(module) {

"use strict";
// These are all sourced from https://facebook.github.io/react/docs/tags-and-attributes.html -
// all attributes regardless of whether they have a different case to their HTML equivalents are
// listed to reduce the chance of human error and make it easier to just copy-paste the new list if
// it changes.

const HTML_ATTRIBUTES = [
  'accept', 'acceptCharset', 'accessKey', 'action', 'allowFullScreen', 'allowTransparency',
  'alt', 'async', 'autoComplete', 'autoFocus', 'autoPlay', 'capture', 'cellPadding',
  'cellSpacing', 'challenge', 'charSet', 'checked', 'cite', 'classID', 'className',
  'colSpan', 'cols', 'content', 'contentEditable', 'contextMenu', 'controls', 'coords',
  'crossOrigin', 'data', 'dateTime', 'default', 'defer', 'dir', 'disabled', 'download',
  'draggable', 'encType', 'form', 'formAction', 'formEncType', 'formMethod', 'formNoValidate',
  'formTarget', 'frameBorder', 'headers', 'height', 'hidden', 'high', 'href', 'hrefLang',
  'htmlFor', 'httpEquiv', 'icon', 'id', 'inputMode', 'integrity', 'is', 'keyParams', 'keyType',
  'kind', 'label', 'lang', 'list', 'loop', 'low', 'manifest', 'marginHeight', 'marginWidth',
  'max', 'maxLength', 'media', 'mediaGroup', 'method', 'min', 'minLength', 'multiple', 'muted',
  'name', 'noValidate', 'nonce', 'open', 'optimum', 'pattern', 'placeholder', 'poster',
  'preload', 'profile', 'radioGroup', 'readOnly', 'rel', 'required', 'reversed', 'role',
  'rowSpan', 'rows', 'sandbox', 'scope', 'scoped', 'scrolling', 'seamless', 'selected',
  'shape', 'size', 'sizes', 'span', 'spellCheck', 'src', 'srcDoc', 'srcLang', 'srcSet', 'start',
  'step', 'style', 'summary', 'tabIndex', 'target', 'title', 'type', 'useMap', 'value', 'width',
  'wmode', 'wrap', 'onClick',
];

const NON_STANDARD_ATTRIBUTES = [
  'autoCapitalize', 'autoCorrect', 'color', 'itemProp', 'itemScope', 'itemType', 'itemRef',
  'itemID', 'security', 'unselectable', 'results', 'autoSave',
];

const SVG_ATTRIBUTES = [
  'accentHeight', 'accumulate', 'additive', 'alignmentBaseline', 'allowReorder', 'alphabetic',
  'amplitude', 'arabicForm', 'ascent', 'attributeName', 'attributeType', 'autoReverse', 'azimuth',
  'baseFrequency', 'baseProfile', 'baselineShift', 'bbox', 'begin', 'bias', 'by', 'calcMode',
  'capHeight', 'clip', 'clipPath', 'clipPathUnits', 'clipRule', 'colorInterpolation',
  'colorInterpolationFilters', 'colorProfile', 'colorRendering', 'contentScriptType',
  'contentStyleType', 'cursor', 'cx', 'cy', 'd', 'decelerate', 'descent', 'diffuseConstant',
  'direction', 'display', 'divisor', 'dominantBaseline', 'dur', 'dx', 'dy', 'edgeMode',
  'elevation', 'enableBackground', 'end', 'exponent', 'externalResourcesRequired', 'fill',
  'fillOpacity', 'fillRule', 'filter', 'filterRes', 'filterUnits', 'floodColor', 'floodOpacity',
  'focusable', 'fontFamily', 'fontSize', 'fontSizeAdjust', 'fontStretch', 'fontStyle',
  'fontVariant', 'fontWeight', 'format', 'from', 'fx', 'fy', 'g1', 'g2', 'glyphName',
  'glyphOrientationHorizontal', 'glyphOrientationVertical', 'glyphRef',
  'gradientTransform', 'gradientUnits', 'hanging', 'horizAdvX', 'horizOriginX', 'ideographic',
  'imageRendering', 'in', 'in2', 'intercept', 'k', 'k1', 'k2', 'k3', 'k4', 'kernelMatrix',
  'kernelUnitLength', 'kerning', 'keyPoints', 'keySplines', 'keyTimes', 'lengthAdjust',
  'letterSpacing', 'lightingColor', 'limitingConeAngle', 'local', 'markerEnd', 'markerHeight',
  'markerMid', 'markerStart', 'markerUnits', 'markerWidth', 'mask', 'maskContentUnits',
  'maskUnits', 'mathematical', 'mode', 'numOctaves', 'offset', 'opacity', 'operator', 'order',
  'orient', 'orientation', 'origin', 'overflow', 'overlinePosition', 'overlineThickness',
  'paintOrder', 'panose1', 'pathLength', 'patternContentUnits', 'patternTransform',
  'patternUnits', 'pointerEvents', 'points', 'pointsAtX', 'pointsAtY', 'pointsAtZ',
  'preserveAlpha', 'preserveAspectRatio', 'primitiveUnits', 'r', 'radius', 'refX', 'refY',
  'renderingIntent', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures',
  'restart', 'result', 'rotate', 'rx', 'ry', 'scale', 'seed', 'shapeRendering', 'slope',
  'spacing', 'specularConstant', 'specularExponent', 'speed', 'spreadMethod', 'startOffset',
  'stdDeviation', 'stemh', 'stemv', 'stitchTiles', 'stopColor', 'stopOpacity',
  'strikethroughPosition', 'strikethroughThickness', 'string', 'stroke', 'strokeDasharray',
  'strokeDashoffset', 'strokeLinecap', 'strokeLinejoin', 'strokeMiterlimit', 'strokeOpacity',
  'strokeWidth', 'surfaceScale', 'systemLanguage', 'tableValues', 'targetX', 'targetY',
  'textAnchor', 'textDecoration', 'textLength', 'textRendering', 'to', 'transform', 'u1',
  'u2', 'underlinePosition', 'underlineThickness', 'unicode', 'unicodeBidi', 'unicodeRange',
  'unitsPerEm', 'vAlphabetic', 'vHanging', 'vIdeographic', 'vMathematical', 'values',
  'vectorEffect', 'version', 'vertAdvY', 'vertOriginX', 'vertOriginY', 'viewBox',
  'viewTarget', 'visibility', 'widths', 'wordSpacing', 'writingMode', 'x', 'x1', 'x2',
  'xChannelSelector', 'xHeight', 'xlinkActuate', 'xlinkArcrole', 'xlinkHref', 'xlinkRole',
  'xlinkShow', 'xlinkTitle', 'xlinkType', 'xmlns', 'xmlnsXlink', 'xmlBase', 'xmlLang',
  'xmlSpace', 'y', 'y1', 'y2', 'yChannelSelector', 'z', 'zoomAndPan',
];

const camelCaseMap = HTML_ATTRIBUTES
  .concat(NON_STANDARD_ATTRIBUTES)
  .concat(SVG_ATTRIBUTES)
  .reduce(function (soFar, attr) {
    const lower = attr.toLowerCase();
    if (lower !== attr) {
      soFar[lower] = attr;
    }
    return soFar;
  }, {});

module.exports = camelCaseMap;


/***/ }),

/***/ "./node_modules/html-to-react/lib/is-valid-node-definitions.js":
/*!*********************************************************************!*\
  !*** ./node_modules/html-to-react/lib/is-valid-node-definitions.js ***!
  \*********************************************************************/
/***/ (function(module) {

"use strict";

function alwaysValid() {
  return true;
}

module.exports = {
  alwaysValid: alwaysValid,
};


/***/ }),

/***/ "./node_modules/html-to-react/lib/parser.js":
/*!**************************************************!*\
  !*** ./node_modules/html-to-react/lib/parser.js ***!
  \**************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

const HtmlParser = (__webpack_require__(/*! htmlparser2 */ "./node_modules/htmlparser2/lib/index.js").Parser);
const DomHandler = (__webpack_require__(/*! domhandler */ "./node_modules/domhandler/lib/index.js").DomHandler);
const ProcessingInstructions = __webpack_require__(/*! ./processing-instructions */ "./node_modules/html-to-react/lib/processing-instructions.js");
const IsValidNodeDefinitions = __webpack_require__(/*! ./is-valid-node-definitions */ "./node_modules/html-to-react/lib/is-valid-node-definitions.js");
const utils = __webpack_require__(/*! ./utils */ "./node_modules/html-to-react/lib/utils.js");

function Html2ReactParser(options) {
  function parseHtmlToTree(html) {
    options = options || {};
    options.decodeEntities = true;
    const handler = new DomHandler();
    const parser = new HtmlParser(handler, options);
    parser.parseComplete(html);
    return handler.dom.filter(function (element) {
      return element.type !== 'directive';
    });
  };

  function traverseDom(node, isValidNode, processingInstructions, preprocessingInstructions,
    index) {
    if (isValidNode(node)) {
      (preprocessingInstructions || []).forEach((instruction) => {
        if (instruction.shouldPreprocessNode(node)) {
          instruction.preprocessNode(node, index);
        }
      });

      const processingInstruction = (processingInstructions || []).find((instruction) => {
        return instruction.shouldProcessNode(node);
      });
      if (processingInstruction != null) {
        const children = (node.children || []).map((child, i) => {
          return traverseDom(child, isValidNode, processingInstructions,
            preprocessingInstructions, i);
        }).filter((child) => {
          return child != null && child !== false;
        });

        if (processingInstruction.replaceChildren) {
          return utils.createElement(node, index, node.data, [
            processingInstruction.processNode(node, children, index),
          ]);
        } else {
          return processingInstruction.processNode(node, children, index);
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  function parseWithInstructions(html, isValidNode, processingInstructions,
      preprocessingInstructions) {
    const domTree = parseHtmlToTree(html);
    const list = domTree.map(function (domTreeItem, index) {
      return traverseDom(domTreeItem, isValidNode, processingInstructions,
        preprocessingInstructions, index);
    });
    return list.length <= 1 ? list[0] : list;
  };

  function parse(html) {
    const processingInstructions = new ProcessingInstructions();
    return parseWithInstructions(html,
      IsValidNodeDefinitions.alwaysValid,
      processingInstructions.defaultProcessingInstructions);
  };

  return {
    parse: parse,
    parseWithInstructions: parseWithInstructions,
  };
};

module.exports = Html2ReactParser;


/***/ }),

/***/ "./node_modules/html-to-react/lib/process-node-definitions.js":
/*!********************************************************************!*\
  !*** ./node_modules/html-to-react/lib/process-node-definitions.js ***!
  \********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

const utils = __webpack_require__(/*! ./utils */ "./node_modules/html-to-react/lib/utils.js");

// eslint-disable-next-line max-len
// https://github.com/facebook/react/blob/15.0-stable/src/renderers/dom/shared/ReactDOMComponent.js#L457
const voidElementTags = [
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param',
  'source', 'track', 'wbr', 'menuitem', 'textarea',
];

function ProcessNodeDefinitions() {
  function processDefaultNode(node, children, index) {
    if (node.type === 'text') {
      return node.data;
    } else if (node.type === 'comment') {
      // FIXME: The following doesn't work as the generated HTML results in
      // "&lt;!--  This is a comment  --&gt;"
      // return '<!-- ' + node.data + ' -->';
      return false;
    }

    if (voidElementTags.indexOf(node.name) > -1) {
      return utils.createElement(node, index);
    } else {
      return utils.createElement(node, index, node.data, children);
    }
  }

  return {
    processDefaultNode: processDefaultNode,
  };
}

module.exports = ProcessNodeDefinitions;


/***/ }),

/***/ "./node_modules/html-to-react/lib/processing-instructions.js":
/*!*******************************************************************!*\
  !*** ./node_modules/html-to-react/lib/processing-instructions.js ***!
  \*******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

const ShouldProcessNodeDefinitions = __webpack_require__(/*! ./should-process-node-definitions */ "./node_modules/html-to-react/lib/should-process-node-definitions.js");
const ProcessNodeDefinitions = __webpack_require__(/*! ./process-node-definitions */ "./node_modules/html-to-react/lib/process-node-definitions.js");

function ProcessingInstructions() {
  const processNodeDefinitions = new ProcessNodeDefinitions();

  return {
    defaultProcessingInstructions: [{
      shouldProcessNode: ShouldProcessNodeDefinitions.shouldProcessEveryNode,
      processNode: processNodeDefinitions.processDefaultNode,
    },],
  };
};

module.exports = ProcessingInstructions;


/***/ }),

/***/ "./node_modules/html-to-react/lib/should-process-node-definitions.js":
/*!***************************************************************************!*\
  !*** ./node_modules/html-to-react/lib/should-process-node-definitions.js ***!
  \***************************************************************************/
/***/ (function(module) {

"use strict";

function shouldProcessEveryNode(node) {
  return true;
}

module.exports = {
  shouldProcessEveryNode: shouldProcessEveryNode,
};


/***/ }),

/***/ "./node_modules/html-to-react/lib/utils.js":
/*!*************************************************!*\
  !*** ./node_modules/html-to-react/lib/utils.js ***!
  \*************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

const camelCase = __webpack_require__(/*! lodash.camelcase */ "./node_modules/lodash.camelcase/index.js");
const React = __webpack_require__(/*! react */ "react");
const camelCaseAttrMap = __webpack_require__(/*! ./camel-case-attribute-names */ "./node_modules/html-to-react/lib/camel-case-attribute-names.js");

function createStyleJsonFromString(styleString) {
  styleString = styleString || '';
  const styles = styleString.split(/;(?!base64)/);
  let singleStyle, key, value, jsonStyles = {};
  for (let i = 0; i < styles.length; ++i) {
    singleStyle = styles[i].split(':');
    if (singleStyle.length > 2) {
      singleStyle[1] = singleStyle.slice(1).join(':');
    }

    key = singleStyle[0];
    value = singleStyle[1];
    if (typeof value === 'string'){
      value = value.trim();
    }

    if (key != null && value != null && key.length > 0 && value.length > 0) {
      key = key.trim();

      // Don't camelCase CSS custom properties
      if (key.indexOf('--') !== 0) {
        key = camelCase(key);
      }

      jsonStyles[key] = value;
    }
  }
  return jsonStyles;
}

// Boolean HTML attributes, copied from https://meiert.com/en/blog/boolean-attributes-of-html/,
// on the form React expects.
const booleanAttrs = [
  'allowFullScreen',
  'allowpaymentrequest',
  'async',
  'autoFocus',
  'autoPlay',
  'checked',
  'controls',
  'default',
  'disabled',
  'formNoValidate',
  'hidden',
  'ismap',
  'itemScope',
  'loop',
  'multiple',
  'muted',
  'nomodule',
  'noValidate',
  'open',
  'playsinline',
  'readOnly',
  'required',
  'reversed',
  'selected',
  'truespeed',
];

function createElement(node, index, data, children) {
  let elementProps = {
    key: index,
  };
  if (node.attribs) {
    elementProps = Object.entries(node.attribs).reduce((result, [key, value,]) => {
      key = camelCaseAttrMap[key.replace(/[-:]/, '')] || key;
      if (key === 'style') {
        value = createStyleJsonFromString(value);
      } else if (key === 'class') {
        key = 'className';
      } else if (key === 'for') {
        key = 'htmlFor';
      } else if (key.startsWith('on')) {
        value = Function(value);
      }

      if (booleanAttrs.includes(key) && (value || '') === '') {
        value = key;
      }

      result[key] = value;
      return result;
    }, elementProps);
  }

  children = children || [];
  const allChildren = data != null ? [data,].concat(children) : children;
  return React.createElement.apply(
    null, [node.name, elementProps,].concat(allChildren)
  );
}

module.exports = {
  createElement,
};


/***/ }),

/***/ "./node_modules/htmlparser2/lib/Parser.js":
/*!************************************************!*\
  !*** ./node_modules/htmlparser2/lib/Parser.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Parser = void 0;
var Tokenizer_js_1 = __importStar(__webpack_require__(/*! ./Tokenizer.js */ "./node_modules/htmlparser2/lib/Tokenizer.js"));
var decode_js_1 = __webpack_require__(/*! entities/lib/decode.js */ "./node_modules/entities/lib/decode.js");
var formTags = new Set([
    "input",
    "option",
    "optgroup",
    "select",
    "button",
    "datalist",
    "textarea",
]);
var pTag = new Set(["p"]);
var tableSectionTags = new Set(["thead", "tbody"]);
var ddtTags = new Set(["dd", "dt"]);
var rtpTags = new Set(["rt", "rp"]);
var openImpliesClose = new Map([
    ["tr", new Set(["tr", "th", "td"])],
    ["th", new Set(["th"])],
    ["td", new Set(["thead", "th", "td"])],
    ["body", new Set(["head", "link", "script"])],
    ["li", new Set(["li"])],
    ["p", pTag],
    ["h1", pTag],
    ["h2", pTag],
    ["h3", pTag],
    ["h4", pTag],
    ["h5", pTag],
    ["h6", pTag],
    ["select", formTags],
    ["input", formTags],
    ["output", formTags],
    ["button", formTags],
    ["datalist", formTags],
    ["textarea", formTags],
    ["option", new Set(["option"])],
    ["optgroup", new Set(["optgroup", "option"])],
    ["dd", ddtTags],
    ["dt", ddtTags],
    ["address", pTag],
    ["article", pTag],
    ["aside", pTag],
    ["blockquote", pTag],
    ["details", pTag],
    ["div", pTag],
    ["dl", pTag],
    ["fieldset", pTag],
    ["figcaption", pTag],
    ["figure", pTag],
    ["footer", pTag],
    ["form", pTag],
    ["header", pTag],
    ["hr", pTag],
    ["main", pTag],
    ["nav", pTag],
    ["ol", pTag],
    ["pre", pTag],
    ["section", pTag],
    ["table", pTag],
    ["ul", pTag],
    ["rt", rtpTags],
    ["rp", rtpTags],
    ["tbody", tableSectionTags],
    ["tfoot", tableSectionTags],
]);
var voidElements = new Set([
    "area",
    "base",
    "basefont",
    "br",
    "col",
    "command",
    "embed",
    "frame",
    "hr",
    "img",
    "input",
    "isindex",
    "keygen",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
]);
var foreignContextElements = new Set(["math", "svg"]);
var htmlIntegrationElements = new Set([
    "mi",
    "mo",
    "mn",
    "ms",
    "mtext",
    "annotation-xml",
    "foreignobject",
    "desc",
    "title",
]);
var reNameEnd = /\s|\//;
var Parser = /** @class */ (function () {
    function Parser(cbs, options) {
        if (options === void 0) { options = {}; }
        var _a, _b, _c, _d, _e;
        this.options = options;
        /** The start index of the last event. */
        this.startIndex = 0;
        /** The end index of the last event. */
        this.endIndex = 0;
        /**
         * Store the start index of the current open tag,
         * so we can update the start index for attributes.
         */
        this.openTagStart = 0;
        this.tagname = "";
        this.attribname = "";
        this.attribvalue = "";
        this.attribs = null;
        this.stack = [];
        this.foreignContext = [];
        this.buffers = [];
        this.bufferOffset = 0;
        /** The index of the last written buffer. Used when resuming after a `pause()`. */
        this.writeIndex = 0;
        /** Indicates whether the parser has finished running / `.end` has been called. */
        this.ended = false;
        this.cbs = cbs !== null && cbs !== void 0 ? cbs : {};
        this.lowerCaseTagNames = (_a = options.lowerCaseTags) !== null && _a !== void 0 ? _a : !options.xmlMode;
        this.lowerCaseAttributeNames =
            (_b = options.lowerCaseAttributeNames) !== null && _b !== void 0 ? _b : !options.xmlMode;
        this.tokenizer = new ((_c = options.Tokenizer) !== null && _c !== void 0 ? _c : Tokenizer_js_1.default)(this.options, this);
        (_e = (_d = this.cbs).onparserinit) === null || _e === void 0 ? void 0 : _e.call(_d, this);
    }
    // Tokenizer event handlers
    /** @internal */
    Parser.prototype.ontext = function (start, endIndex) {
        var _a, _b;
        var data = this.getSlice(start, endIndex);
        this.endIndex = endIndex - 1;
        (_b = (_a = this.cbs).ontext) === null || _b === void 0 ? void 0 : _b.call(_a, data);
        this.startIndex = endIndex;
    };
    /** @internal */
    Parser.prototype.ontextentity = function (cp) {
        var _a, _b;
        /*
         * Entities can be emitted on the character, or directly after.
         * We use the section start here to get accurate indices.
         */
        var index = this.tokenizer.getSectionStart();
        this.endIndex = index - 1;
        (_b = (_a = this.cbs).ontext) === null || _b === void 0 ? void 0 : _b.call(_a, (0, decode_js_1.fromCodePoint)(cp));
        this.startIndex = index;
    };
    Parser.prototype.isVoidElement = function (name) {
        return !this.options.xmlMode && voidElements.has(name);
    };
    /** @internal */
    Parser.prototype.onopentagname = function (start, endIndex) {
        this.endIndex = endIndex;
        var name = this.getSlice(start, endIndex);
        if (this.lowerCaseTagNames) {
            name = name.toLowerCase();
        }
        this.emitOpenTag(name);
    };
    Parser.prototype.emitOpenTag = function (name) {
        var _a, _b, _c, _d;
        this.openTagStart = this.startIndex;
        this.tagname = name;
        var impliesClose = !this.options.xmlMode && openImpliesClose.get(name);
        if (impliesClose) {
            while (this.stack.length > 0 &&
                impliesClose.has(this.stack[this.stack.length - 1])) {
                var element = this.stack.pop();
                (_b = (_a = this.cbs).onclosetag) === null || _b === void 0 ? void 0 : _b.call(_a, element, true);
            }
        }
        if (!this.isVoidElement(name)) {
            this.stack.push(name);
            if (foreignContextElements.has(name)) {
                this.foreignContext.push(true);
            }
            else if (htmlIntegrationElements.has(name)) {
                this.foreignContext.push(false);
            }
        }
        (_d = (_c = this.cbs).onopentagname) === null || _d === void 0 ? void 0 : _d.call(_c, name);
        if (this.cbs.onopentag)
            this.attribs = {};
    };
    Parser.prototype.endOpenTag = function (isImplied) {
        var _a, _b;
        this.startIndex = this.openTagStart;
        if (this.attribs) {
            (_b = (_a = this.cbs).onopentag) === null || _b === void 0 ? void 0 : _b.call(_a, this.tagname, this.attribs, isImplied);
            this.attribs = null;
        }
        if (this.cbs.onclosetag && this.isVoidElement(this.tagname)) {
            this.cbs.onclosetag(this.tagname, true);
        }
        this.tagname = "";
    };
    /** @internal */
    Parser.prototype.onopentagend = function (endIndex) {
        this.endIndex = endIndex;
        this.endOpenTag(false);
        // Set `startIndex` for next node
        this.startIndex = endIndex + 1;
    };
    /** @internal */
    Parser.prototype.onclosetag = function (start, endIndex) {
        var _a, _b, _c, _d, _e, _f;
        this.endIndex = endIndex;
        var name = this.getSlice(start, endIndex);
        if (this.lowerCaseTagNames) {
            name = name.toLowerCase();
        }
        if (foreignContextElements.has(name) ||
            htmlIntegrationElements.has(name)) {
            this.foreignContext.pop();
        }
        if (!this.isVoidElement(name)) {
            var pos = this.stack.lastIndexOf(name);
            if (pos !== -1) {
                if (this.cbs.onclosetag) {
                    var count = this.stack.length - pos;
                    while (count--) {
                        // We know the stack has sufficient elements.
                        this.cbs.onclosetag(this.stack.pop(), count !== 0);
                    }
                }
                else
                    this.stack.length = pos;
            }
            else if (!this.options.xmlMode && name === "p") {
                // Implicit open before close
                this.emitOpenTag("p");
                this.closeCurrentTag(true);
            }
        }
        else if (!this.options.xmlMode && name === "br") {
            // We can't use `emitOpenTag` for implicit open, as `br` would be implicitly closed.
            (_b = (_a = this.cbs).onopentagname) === null || _b === void 0 ? void 0 : _b.call(_a, "br");
            (_d = (_c = this.cbs).onopentag) === null || _d === void 0 ? void 0 : _d.call(_c, "br", {}, true);
            (_f = (_e = this.cbs).onclosetag) === null || _f === void 0 ? void 0 : _f.call(_e, "br", false);
        }
        // Set `startIndex` for next node
        this.startIndex = endIndex + 1;
    };
    /** @internal */
    Parser.prototype.onselfclosingtag = function (endIndex) {
        this.endIndex = endIndex;
        if (this.options.xmlMode ||
            this.options.recognizeSelfClosing ||
            this.foreignContext[this.foreignContext.length - 1]) {
            this.closeCurrentTag(false);
            // Set `startIndex` for next node
            this.startIndex = endIndex + 1;
        }
        else {
            // Ignore the fact that the tag is self-closing.
            this.onopentagend(endIndex);
        }
    };
    Parser.prototype.closeCurrentTag = function (isOpenImplied) {
        var _a, _b;
        var name = this.tagname;
        this.endOpenTag(isOpenImplied);
        // Self-closing tags will be on the top of the stack
        if (this.stack[this.stack.length - 1] === name) {
            // If the opening tag isn't implied, the closing tag has to be implied.
            (_b = (_a = this.cbs).onclosetag) === null || _b === void 0 ? void 0 : _b.call(_a, name, !isOpenImplied);
            this.stack.pop();
        }
    };
    /** @internal */
    Parser.prototype.onattribname = function (start, endIndex) {
        this.startIndex = start;
        var name = this.getSlice(start, endIndex);
        this.attribname = this.lowerCaseAttributeNames
            ? name.toLowerCase()
            : name;
    };
    /** @internal */
    Parser.prototype.onattribdata = function (start, endIndex) {
        this.attribvalue += this.getSlice(start, endIndex);
    };
    /** @internal */
    Parser.prototype.onattribentity = function (cp) {
        this.attribvalue += (0, decode_js_1.fromCodePoint)(cp);
    };
    /** @internal */
    Parser.prototype.onattribend = function (quote, endIndex) {
        var _a, _b;
        this.endIndex = endIndex;
        (_b = (_a = this.cbs).onattribute) === null || _b === void 0 ? void 0 : _b.call(_a, this.attribname, this.attribvalue, quote === Tokenizer_js_1.QuoteType.Double
            ? '"'
            : quote === Tokenizer_js_1.QuoteType.Single
                ? "'"
                : quote === Tokenizer_js_1.QuoteType.NoValue
                    ? undefined
                    : null);
        if (this.attribs &&
            !Object.prototype.hasOwnProperty.call(this.attribs, this.attribname)) {
            this.attribs[this.attribname] = this.attribvalue;
        }
        this.attribvalue = "";
    };
    Parser.prototype.getInstructionName = function (value) {
        var index = value.search(reNameEnd);
        var name = index < 0 ? value : value.substr(0, index);
        if (this.lowerCaseTagNames) {
            name = name.toLowerCase();
        }
        return name;
    };
    /** @internal */
    Parser.prototype.ondeclaration = function (start, endIndex) {
        this.endIndex = endIndex;
        var value = this.getSlice(start, endIndex);
        if (this.cbs.onprocessinginstruction) {
            var name = this.getInstructionName(value);
            this.cbs.onprocessinginstruction("!".concat(name), "!".concat(value));
        }
        // Set `startIndex` for next node
        this.startIndex = endIndex + 1;
    };
    /** @internal */
    Parser.prototype.onprocessinginstruction = function (start, endIndex) {
        this.endIndex = endIndex;
        var value = this.getSlice(start, endIndex);
        if (this.cbs.onprocessinginstruction) {
            var name = this.getInstructionName(value);
            this.cbs.onprocessinginstruction("?".concat(name), "?".concat(value));
        }
        // Set `startIndex` for next node
        this.startIndex = endIndex + 1;
    };
    /** @internal */
    Parser.prototype.oncomment = function (start, endIndex, offset) {
        var _a, _b, _c, _d;
        this.endIndex = endIndex;
        (_b = (_a = this.cbs).oncomment) === null || _b === void 0 ? void 0 : _b.call(_a, this.getSlice(start, endIndex - offset));
        (_d = (_c = this.cbs).oncommentend) === null || _d === void 0 ? void 0 : _d.call(_c);
        // Set `startIndex` for next node
        this.startIndex = endIndex + 1;
    };
    /** @internal */
    Parser.prototype.oncdata = function (start, endIndex, offset) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        this.endIndex = endIndex;
        var value = this.getSlice(start, endIndex - offset);
        if (this.options.xmlMode || this.options.recognizeCDATA) {
            (_b = (_a = this.cbs).oncdatastart) === null || _b === void 0 ? void 0 : _b.call(_a);
            (_d = (_c = this.cbs).ontext) === null || _d === void 0 ? void 0 : _d.call(_c, value);
            (_f = (_e = this.cbs).oncdataend) === null || _f === void 0 ? void 0 : _f.call(_e);
        }
        else {
            (_h = (_g = this.cbs).oncomment) === null || _h === void 0 ? void 0 : _h.call(_g, "[CDATA[".concat(value, "]]"));
            (_k = (_j = this.cbs).oncommentend) === null || _k === void 0 ? void 0 : _k.call(_j);
        }
        // Set `startIndex` for next node
        this.startIndex = endIndex + 1;
    };
    /** @internal */
    Parser.prototype.onend = function () {
        var _a, _b;
        if (this.cbs.onclosetag) {
            // Set the end index for all remaining tags
            this.endIndex = this.startIndex;
            for (var index = this.stack.length; index > 0; this.cbs.onclosetag(this.stack[--index], true))
                ;
        }
        (_b = (_a = this.cbs).onend) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    /**
     * Resets the parser to a blank state, ready to parse a new HTML document
     */
    Parser.prototype.reset = function () {
        var _a, _b, _c, _d;
        (_b = (_a = this.cbs).onreset) === null || _b === void 0 ? void 0 : _b.call(_a);
        this.tokenizer.reset();
        this.tagname = "";
        this.attribname = "";
        this.attribs = null;
        this.stack.length = 0;
        this.startIndex = 0;
        this.endIndex = 0;
        (_d = (_c = this.cbs).onparserinit) === null || _d === void 0 ? void 0 : _d.call(_c, this);
        this.buffers.length = 0;
        this.bufferOffset = 0;
        this.writeIndex = 0;
        this.ended = false;
    };
    /**
     * Resets the parser, then parses a complete document and
     * pushes it to the handler.
     *
     * @param data Document to parse.
     */
    Parser.prototype.parseComplete = function (data) {
        this.reset();
        this.end(data);
    };
    Parser.prototype.getSlice = function (start, end) {
        while (start - this.bufferOffset >= this.buffers[0].length) {
            this.shiftBuffer();
        }
        var slice = this.buffers[0].slice(start - this.bufferOffset, end - this.bufferOffset);
        while (end - this.bufferOffset > this.buffers[0].length) {
            this.shiftBuffer();
            slice += this.buffers[0].slice(0, end - this.bufferOffset);
        }
        return slice;
    };
    Parser.prototype.shiftBuffer = function () {
        this.bufferOffset += this.buffers[0].length;
        this.writeIndex--;
        this.buffers.shift();
    };
    /**
     * Parses a chunk of data and calls the corresponding callbacks.
     *
     * @param chunk Chunk to parse.
     */
    Parser.prototype.write = function (chunk) {
        var _a, _b;
        if (this.ended) {
            (_b = (_a = this.cbs).onerror) === null || _b === void 0 ? void 0 : _b.call(_a, new Error(".write() after done!"));
            return;
        }
        this.buffers.push(chunk);
        if (this.tokenizer.running) {
            this.tokenizer.write(chunk);
            this.writeIndex++;
        }
    };
    /**
     * Parses the end of the buffer and clears the stack, calls onend.
     *
     * @param chunk Optional final chunk to parse.
     */
    Parser.prototype.end = function (chunk) {
        var _a, _b;
        if (this.ended) {
            (_b = (_a = this.cbs).onerror) === null || _b === void 0 ? void 0 : _b.call(_a, new Error(".end() after done!"));
            return;
        }
        if (chunk)
            this.write(chunk);
        this.ended = true;
        this.tokenizer.end();
    };
    /**
     * Pauses parsing. The parser won't emit events until `resume` is called.
     */
    Parser.prototype.pause = function () {
        this.tokenizer.pause();
    };
    /**
     * Resumes parsing after `pause` was called.
     */
    Parser.prototype.resume = function () {
        this.tokenizer.resume();
        while (this.tokenizer.running &&
            this.writeIndex < this.buffers.length) {
            this.tokenizer.write(this.buffers[this.writeIndex++]);
        }
        if (this.ended)
            this.tokenizer.end();
    };
    /**
     * Alias of `write`, for backwards compatibility.
     *
     * @param chunk Chunk to parse.
     * @deprecated
     */
    Parser.prototype.parseChunk = function (chunk) {
        this.write(chunk);
    };
    /**
     * Alias of `end`, for backwards compatibility.
     *
     * @param chunk Optional final chunk to parse.
     * @deprecated
     */
    Parser.prototype.done = function (chunk) {
        this.end(chunk);
    };
    return Parser;
}());
exports.Parser = Parser;
//# sourceMappingURL=Parser.js.map

/***/ }),

/***/ "./node_modules/htmlparser2/lib/Tokenizer.js":
/*!***************************************************!*\
  !*** ./node_modules/htmlparser2/lib/Tokenizer.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QuoteType = void 0;
var decode_js_1 = __webpack_require__(/*! entities/lib/decode.js */ "./node_modules/entities/lib/decode.js");
var CharCodes;
(function (CharCodes) {
    CharCodes[CharCodes["Tab"] = 9] = "Tab";
    CharCodes[CharCodes["NewLine"] = 10] = "NewLine";
    CharCodes[CharCodes["FormFeed"] = 12] = "FormFeed";
    CharCodes[CharCodes["CarriageReturn"] = 13] = "CarriageReturn";
    CharCodes[CharCodes["Space"] = 32] = "Space";
    CharCodes[CharCodes["ExclamationMark"] = 33] = "ExclamationMark";
    CharCodes[CharCodes["Number"] = 35] = "Number";
    CharCodes[CharCodes["Amp"] = 38] = "Amp";
    CharCodes[CharCodes["SingleQuote"] = 39] = "SingleQuote";
    CharCodes[CharCodes["DoubleQuote"] = 34] = "DoubleQuote";
    CharCodes[CharCodes["Dash"] = 45] = "Dash";
    CharCodes[CharCodes["Slash"] = 47] = "Slash";
    CharCodes[CharCodes["Zero"] = 48] = "Zero";
    CharCodes[CharCodes["Nine"] = 57] = "Nine";
    CharCodes[CharCodes["Semi"] = 59] = "Semi";
    CharCodes[CharCodes["Lt"] = 60] = "Lt";
    CharCodes[CharCodes["Eq"] = 61] = "Eq";
    CharCodes[CharCodes["Gt"] = 62] = "Gt";
    CharCodes[CharCodes["Questionmark"] = 63] = "Questionmark";
    CharCodes[CharCodes["UpperA"] = 65] = "UpperA";
    CharCodes[CharCodes["LowerA"] = 97] = "LowerA";
    CharCodes[CharCodes["UpperF"] = 70] = "UpperF";
    CharCodes[CharCodes["LowerF"] = 102] = "LowerF";
    CharCodes[CharCodes["UpperZ"] = 90] = "UpperZ";
    CharCodes[CharCodes["LowerZ"] = 122] = "LowerZ";
    CharCodes[CharCodes["LowerX"] = 120] = "LowerX";
    CharCodes[CharCodes["OpeningSquareBracket"] = 91] = "OpeningSquareBracket";
})(CharCodes || (CharCodes = {}));
/** All the states the tokenizer can be in. */
var State;
(function (State) {
    State[State["Text"] = 1] = "Text";
    State[State["BeforeTagName"] = 2] = "BeforeTagName";
    State[State["InTagName"] = 3] = "InTagName";
    State[State["InSelfClosingTag"] = 4] = "InSelfClosingTag";
    State[State["BeforeClosingTagName"] = 5] = "BeforeClosingTagName";
    State[State["InClosingTagName"] = 6] = "InClosingTagName";
    State[State["AfterClosingTagName"] = 7] = "AfterClosingTagName";
    // Attributes
    State[State["BeforeAttributeName"] = 8] = "BeforeAttributeName";
    State[State["InAttributeName"] = 9] = "InAttributeName";
    State[State["AfterAttributeName"] = 10] = "AfterAttributeName";
    State[State["BeforeAttributeValue"] = 11] = "BeforeAttributeValue";
    State[State["InAttributeValueDq"] = 12] = "InAttributeValueDq";
    State[State["InAttributeValueSq"] = 13] = "InAttributeValueSq";
    State[State["InAttributeValueNq"] = 14] = "InAttributeValueNq";
    // Declarations
    State[State["BeforeDeclaration"] = 15] = "BeforeDeclaration";
    State[State["InDeclaration"] = 16] = "InDeclaration";
    // Processing instructions
    State[State["InProcessingInstruction"] = 17] = "InProcessingInstruction";
    // Comments & CDATA
    State[State["BeforeComment"] = 18] = "BeforeComment";
    State[State["CDATASequence"] = 19] = "CDATASequence";
    State[State["InSpecialComment"] = 20] = "InSpecialComment";
    State[State["InCommentLike"] = 21] = "InCommentLike";
    // Special tags
    State[State["BeforeSpecialS"] = 22] = "BeforeSpecialS";
    State[State["SpecialStartSequence"] = 23] = "SpecialStartSequence";
    State[State["InSpecialTag"] = 24] = "InSpecialTag";
    State[State["BeforeEntity"] = 25] = "BeforeEntity";
    State[State["BeforeNumericEntity"] = 26] = "BeforeNumericEntity";
    State[State["InNamedEntity"] = 27] = "InNamedEntity";
    State[State["InNumericEntity"] = 28] = "InNumericEntity";
    State[State["InHexEntity"] = 29] = "InHexEntity";
})(State || (State = {}));
function isWhitespace(c) {
    return (c === CharCodes.Space ||
        c === CharCodes.NewLine ||
        c === CharCodes.Tab ||
        c === CharCodes.FormFeed ||
        c === CharCodes.CarriageReturn);
}
function isEndOfTagSection(c) {
    return c === CharCodes.Slash || c === CharCodes.Gt || isWhitespace(c);
}
function isNumber(c) {
    return c >= CharCodes.Zero && c <= CharCodes.Nine;
}
function isASCIIAlpha(c) {
    return ((c >= CharCodes.LowerA && c <= CharCodes.LowerZ) ||
        (c >= CharCodes.UpperA && c <= CharCodes.UpperZ));
}
function isHexDigit(c) {
    return ((c >= CharCodes.UpperA && c <= CharCodes.UpperF) ||
        (c >= CharCodes.LowerA && c <= CharCodes.LowerF));
}
var QuoteType;
(function (QuoteType) {
    QuoteType[QuoteType["NoValue"] = 0] = "NoValue";
    QuoteType[QuoteType["Unquoted"] = 1] = "Unquoted";
    QuoteType[QuoteType["Single"] = 2] = "Single";
    QuoteType[QuoteType["Double"] = 3] = "Double";
})(QuoteType = exports.QuoteType || (exports.QuoteType = {}));
/**
 * Sequences used to match longer strings.
 *
 * We don't have `Script`, `Style`, or `Title` here. Instead, we re-use the *End
 * sequences with an increased offset.
 */
var Sequences = {
    Cdata: new Uint8Array([0x43, 0x44, 0x41, 0x54, 0x41, 0x5b]),
    CdataEnd: new Uint8Array([0x5d, 0x5d, 0x3e]),
    CommentEnd: new Uint8Array([0x2d, 0x2d, 0x3e]),
    ScriptEnd: new Uint8Array([0x3c, 0x2f, 0x73, 0x63, 0x72, 0x69, 0x70, 0x74]),
    StyleEnd: new Uint8Array([0x3c, 0x2f, 0x73, 0x74, 0x79, 0x6c, 0x65]),
    TitleEnd: new Uint8Array([0x3c, 0x2f, 0x74, 0x69, 0x74, 0x6c, 0x65]), // `</title`
};
var Tokenizer = /** @class */ (function () {
    function Tokenizer(_a, cbs) {
        var _b = _a.xmlMode, xmlMode = _b === void 0 ? false : _b, _c = _a.decodeEntities, decodeEntities = _c === void 0 ? true : _c;
        this.cbs = cbs;
        /** The current state the tokenizer is in. */
        this.state = State.Text;
        /** The read buffer. */
        this.buffer = "";
        /** The beginning of the section that is currently being read. */
        this.sectionStart = 0;
        /** The index within the buffer that we are currently looking at. */
        this.index = 0;
        /** Some behavior, eg. when decoding entities, is done while we are in another state. This keeps track of the other state type. */
        this.baseState = State.Text;
        /** For special parsing behavior inside of script and style tags. */
        this.isSpecial = false;
        /** Indicates whether the tokenizer has been paused. */
        this.running = true;
        /** The offset of the current buffer. */
        this.offset = 0;
        this.currentSequence = undefined;
        this.sequenceIndex = 0;
        this.trieIndex = 0;
        this.trieCurrent = 0;
        /** For named entities, the index of the value. For numeric entities, the code point. */
        this.entityResult = 0;
        this.entityExcess = 0;
        this.xmlMode = xmlMode;
        this.decodeEntities = decodeEntities;
        this.entityTrie = xmlMode ? decode_js_1.xmlDecodeTree : decode_js_1.htmlDecodeTree;
    }
    Tokenizer.prototype.reset = function () {
        this.state = State.Text;
        this.buffer = "";
        this.sectionStart = 0;
        this.index = 0;
        this.baseState = State.Text;
        this.currentSequence = undefined;
        this.running = true;
        this.offset = 0;
    };
    Tokenizer.prototype.write = function (chunk) {
        this.offset += this.buffer.length;
        this.buffer = chunk;
        this.parse();
    };
    Tokenizer.prototype.end = function () {
        if (this.running)
            this.finish();
    };
    Tokenizer.prototype.pause = function () {
        this.running = false;
    };
    Tokenizer.prototype.resume = function () {
        this.running = true;
        if (this.index < this.buffer.length + this.offset) {
            this.parse();
        }
    };
    /**
     * The current index within all of the written data.
     */
    Tokenizer.prototype.getIndex = function () {
        return this.index;
    };
    /**
     * The start of the current section.
     */
    Tokenizer.prototype.getSectionStart = function () {
        return this.sectionStart;
    };
    Tokenizer.prototype.stateText = function (c) {
        if (c === CharCodes.Lt ||
            (!this.decodeEntities && this.fastForwardTo(CharCodes.Lt))) {
            if (this.index > this.sectionStart) {
                this.cbs.ontext(this.sectionStart, this.index);
            }
            this.state = State.BeforeTagName;
            this.sectionStart = this.index;
        }
        else if (this.decodeEntities && c === CharCodes.Amp) {
            this.state = State.BeforeEntity;
        }
    };
    Tokenizer.prototype.stateSpecialStartSequence = function (c) {
        var isEnd = this.sequenceIndex === this.currentSequence.length;
        var isMatch = isEnd
            ? // If we are at the end of the sequence, make sure the tag name has ended
                isEndOfTagSection(c)
            : // Otherwise, do a case-insensitive comparison
                (c | 0x20) === this.currentSequence[this.sequenceIndex];
        if (!isMatch) {
            this.isSpecial = false;
        }
        else if (!isEnd) {
            this.sequenceIndex++;
            return;
        }
        this.sequenceIndex = 0;
        this.state = State.InTagName;
        this.stateInTagName(c);
    };
    /** Look for an end tag. For <title> tags, also decode entities. */
    Tokenizer.prototype.stateInSpecialTag = function (c) {
        if (this.sequenceIndex === this.currentSequence.length) {
            if (c === CharCodes.Gt || isWhitespace(c)) {
                var endOfText = this.index - this.currentSequence.length;
                if (this.sectionStart < endOfText) {
                    // Spoof the index so that reported locations match up.
                    var actualIndex = this.index;
                    this.index = endOfText;
                    this.cbs.ontext(this.sectionStart, endOfText);
                    this.index = actualIndex;
                }
                this.isSpecial = false;
                this.sectionStart = endOfText + 2; // Skip over the `</`
                this.stateInClosingTagName(c);
                return; // We are done; skip the rest of the function.
            }
            this.sequenceIndex = 0;
        }
        if ((c | 0x20) === this.currentSequence[this.sequenceIndex]) {
            this.sequenceIndex += 1;
        }
        else if (this.sequenceIndex === 0) {
            if (this.currentSequence === Sequences.TitleEnd) {
                // We have to parse entities in <title> tags.
                if (this.decodeEntities && c === CharCodes.Amp) {
                    this.state = State.BeforeEntity;
                }
            }
            else if (this.fastForwardTo(CharCodes.Lt)) {
                // Outside of <title> tags, we can fast-forward.
                this.sequenceIndex = 1;
            }
        }
        else {
            // If we see a `<`, set the sequence index to 1; useful for eg. `<</script>`.
            this.sequenceIndex = Number(c === CharCodes.Lt);
        }
    };
    Tokenizer.prototype.stateCDATASequence = function (c) {
        if (c === Sequences.Cdata[this.sequenceIndex]) {
            if (++this.sequenceIndex === Sequences.Cdata.length) {
                this.state = State.InCommentLike;
                this.currentSequence = Sequences.CdataEnd;
                this.sequenceIndex = 0;
                this.sectionStart = this.index + 1;
            }
        }
        else {
            this.sequenceIndex = 0;
            this.state = State.InDeclaration;
            this.stateInDeclaration(c); // Reconsume the character
        }
    };
    /**
     * When we wait for one specific character, we can speed things up
     * by skipping through the buffer until we find it.
     *
     * @returns Whether the character was found.
     */
    Tokenizer.prototype.fastForwardTo = function (c) {
        while (++this.index < this.buffer.length + this.offset) {
            if (this.buffer.charCodeAt(this.index - this.offset) === c) {
                return true;
            }
        }
        /*
         * We increment the index at the end of the `parse` loop,
         * so set it to `buffer.length - 1` here.
         *
         * TODO: Refactor `parse` to increment index before calling states.
         */
        this.index = this.buffer.length + this.offset - 1;
        return false;
    };
    /**
     * Comments and CDATA end with `-->` and `]]>`.
     *
     * Their common qualities are:
     * - Their end sequences have a distinct character they start with.
     * - That character is then repeated, so we have to check multiple repeats.
     * - All characters but the start character of the sequence can be skipped.
     */
    Tokenizer.prototype.stateInCommentLike = function (c) {
        if (c === this.currentSequence[this.sequenceIndex]) {
            if (++this.sequenceIndex === this.currentSequence.length) {
                if (this.currentSequence === Sequences.CdataEnd) {
                    this.cbs.oncdata(this.sectionStart, this.index, 2);
                }
                else {
                    this.cbs.oncomment(this.sectionStart, this.index, 2);
                }
                this.sequenceIndex = 0;
                this.sectionStart = this.index + 1;
                this.state = State.Text;
            }
        }
        else if (this.sequenceIndex === 0) {
            // Fast-forward to the first character of the sequence
            if (this.fastForwardTo(this.currentSequence[0])) {
                this.sequenceIndex = 1;
            }
        }
        else if (c !== this.currentSequence[this.sequenceIndex - 1]) {
            // Allow long sequences, eg. --->, ]]]>
            this.sequenceIndex = 0;
        }
    };
    /**
     * HTML only allows ASCII alpha characters (a-z and A-Z) at the beginning of a tag name.
     *
     * XML allows a lot more characters here (@see https://www.w3.org/TR/REC-xml/#NT-NameStartChar).
     * We allow anything that wouldn't end the tag.
     */
    Tokenizer.prototype.isTagStartChar = function (c) {
        return this.xmlMode ? !isEndOfTagSection(c) : isASCIIAlpha(c);
    };
    Tokenizer.prototype.startSpecial = function (sequence, offset) {
        this.isSpecial = true;
        this.currentSequence = sequence;
        this.sequenceIndex = offset;
        this.state = State.SpecialStartSequence;
    };
    Tokenizer.prototype.stateBeforeTagName = function (c) {
        if (c === CharCodes.ExclamationMark) {
            this.state = State.BeforeDeclaration;
            this.sectionStart = this.index + 1;
        }
        else if (c === CharCodes.Questionmark) {
            this.state = State.InProcessingInstruction;
            this.sectionStart = this.index + 1;
        }
        else if (this.isTagStartChar(c)) {
            var lower = c | 0x20;
            this.sectionStart = this.index;
            if (!this.xmlMode && lower === Sequences.TitleEnd[2]) {
                this.startSpecial(Sequences.TitleEnd, 3);
            }
            else {
                this.state =
                    !this.xmlMode && lower === Sequences.ScriptEnd[2]
                        ? State.BeforeSpecialS
                        : State.InTagName;
            }
        }
        else if (c === CharCodes.Slash) {
            this.state = State.BeforeClosingTagName;
        }
        else {
            this.state = State.Text;
            this.stateText(c);
        }
    };
    Tokenizer.prototype.stateInTagName = function (c) {
        if (isEndOfTagSection(c)) {
            this.cbs.onopentagname(this.sectionStart, this.index);
            this.sectionStart = -1;
            this.state = State.BeforeAttributeName;
            this.stateBeforeAttributeName(c);
        }
    };
    Tokenizer.prototype.stateBeforeClosingTagName = function (c) {
        if (isWhitespace(c)) {
            // Ignore
        }
        else if (c === CharCodes.Gt) {
            this.state = State.Text;
        }
        else {
            this.state = this.isTagStartChar(c)
                ? State.InClosingTagName
                : State.InSpecialComment;
            this.sectionStart = this.index;
        }
    };
    Tokenizer.prototype.stateInClosingTagName = function (c) {
        if (c === CharCodes.Gt || isWhitespace(c)) {
            this.cbs.onclosetag(this.sectionStart, this.index);
            this.sectionStart = -1;
            this.state = State.AfterClosingTagName;
            this.stateAfterClosingTagName(c);
        }
    };
    Tokenizer.prototype.stateAfterClosingTagName = function (c) {
        // Skip everything until ">"
        if (c === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) {
            this.state = State.Text;
            this.baseState = State.Text;
            this.sectionStart = this.index + 1;
        }
    };
    Tokenizer.prototype.stateBeforeAttributeName = function (c) {
        if (c === CharCodes.Gt) {
            this.cbs.onopentagend(this.index);
            if (this.isSpecial) {
                this.state = State.InSpecialTag;
                this.sequenceIndex = 0;
            }
            else {
                this.state = State.Text;
            }
            this.baseState = this.state;
            this.sectionStart = this.index + 1;
        }
        else if (c === CharCodes.Slash) {
            this.state = State.InSelfClosingTag;
        }
        else if (!isWhitespace(c)) {
            this.state = State.InAttributeName;
            this.sectionStart = this.index;
        }
    };
    Tokenizer.prototype.stateInSelfClosingTag = function (c) {
        if (c === CharCodes.Gt) {
            this.cbs.onselfclosingtag(this.index);
            this.state = State.Text;
            this.baseState = State.Text;
            this.sectionStart = this.index + 1;
            this.isSpecial = false; // Reset special state, in case of self-closing special tags
        }
        else if (!isWhitespace(c)) {
            this.state = State.BeforeAttributeName;
            this.stateBeforeAttributeName(c);
        }
    };
    Tokenizer.prototype.stateInAttributeName = function (c) {
        if (c === CharCodes.Eq || isEndOfTagSection(c)) {
            this.cbs.onattribname(this.sectionStart, this.index);
            this.sectionStart = -1;
            this.state = State.AfterAttributeName;
            this.stateAfterAttributeName(c);
        }
    };
    Tokenizer.prototype.stateAfterAttributeName = function (c) {
        if (c === CharCodes.Eq) {
            this.state = State.BeforeAttributeValue;
        }
        else if (c === CharCodes.Slash || c === CharCodes.Gt) {
            this.cbs.onattribend(QuoteType.NoValue, this.index);
            this.state = State.BeforeAttributeName;
            this.stateBeforeAttributeName(c);
        }
        else if (!isWhitespace(c)) {
            this.cbs.onattribend(QuoteType.NoValue, this.index);
            this.state = State.InAttributeName;
            this.sectionStart = this.index;
        }
    };
    Tokenizer.prototype.stateBeforeAttributeValue = function (c) {
        if (c === CharCodes.DoubleQuote) {
            this.state = State.InAttributeValueDq;
            this.sectionStart = this.index + 1;
        }
        else if (c === CharCodes.SingleQuote) {
            this.state = State.InAttributeValueSq;
            this.sectionStart = this.index + 1;
        }
        else if (!isWhitespace(c)) {
            this.sectionStart = this.index;
            this.state = State.InAttributeValueNq;
            this.stateInAttributeValueNoQuotes(c); // Reconsume token
        }
    };
    Tokenizer.prototype.handleInAttributeValue = function (c, quote) {
        if (c === quote ||
            (!this.decodeEntities && this.fastForwardTo(quote))) {
            this.cbs.onattribdata(this.sectionStart, this.index);
            this.sectionStart = -1;
            this.cbs.onattribend(quote === CharCodes.DoubleQuote
                ? QuoteType.Double
                : QuoteType.Single, this.index);
            this.state = State.BeforeAttributeName;
        }
        else if (this.decodeEntities && c === CharCodes.Amp) {
            this.baseState = this.state;
            this.state = State.BeforeEntity;
        }
    };
    Tokenizer.prototype.stateInAttributeValueDoubleQuotes = function (c) {
        this.handleInAttributeValue(c, CharCodes.DoubleQuote);
    };
    Tokenizer.prototype.stateInAttributeValueSingleQuotes = function (c) {
        this.handleInAttributeValue(c, CharCodes.SingleQuote);
    };
    Tokenizer.prototype.stateInAttributeValueNoQuotes = function (c) {
        if (isWhitespace(c) || c === CharCodes.Gt) {
            this.cbs.onattribdata(this.sectionStart, this.index);
            this.sectionStart = -1;
            this.cbs.onattribend(QuoteType.Unquoted, this.index);
            this.state = State.BeforeAttributeName;
            this.stateBeforeAttributeName(c);
        }
        else if (this.decodeEntities && c === CharCodes.Amp) {
            this.baseState = this.state;
            this.state = State.BeforeEntity;
        }
    };
    Tokenizer.prototype.stateBeforeDeclaration = function (c) {
        if (c === CharCodes.OpeningSquareBracket) {
            this.state = State.CDATASequence;
            this.sequenceIndex = 0;
        }
        else {
            this.state =
                c === CharCodes.Dash
                    ? State.BeforeComment
                    : State.InDeclaration;
        }
    };
    Tokenizer.prototype.stateInDeclaration = function (c) {
        if (c === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) {
            this.cbs.ondeclaration(this.sectionStart, this.index);
            this.state = State.Text;
            this.sectionStart = this.index + 1;
        }
    };
    Tokenizer.prototype.stateInProcessingInstruction = function (c) {
        if (c === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) {
            this.cbs.onprocessinginstruction(this.sectionStart, this.index);
            this.state = State.Text;
            this.sectionStart = this.index + 1;
        }
    };
    Tokenizer.prototype.stateBeforeComment = function (c) {
        if (c === CharCodes.Dash) {
            this.state = State.InCommentLike;
            this.currentSequence = Sequences.CommentEnd;
            // Allow short comments (eg. <!-->)
            this.sequenceIndex = 2;
            this.sectionStart = this.index + 1;
        }
        else {
            this.state = State.InDeclaration;
        }
    };
    Tokenizer.prototype.stateInSpecialComment = function (c) {
        if (c === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) {
            this.cbs.oncomment(this.sectionStart, this.index, 0);
            this.state = State.Text;
            this.sectionStart = this.index + 1;
        }
    };
    Tokenizer.prototype.stateBeforeSpecialS = function (c) {
        var lower = c | 0x20;
        if (lower === Sequences.ScriptEnd[3]) {
            this.startSpecial(Sequences.ScriptEnd, 4);
        }
        else if (lower === Sequences.StyleEnd[3]) {
            this.startSpecial(Sequences.StyleEnd, 4);
        }
        else {
            this.state = State.InTagName;
            this.stateInTagName(c); // Consume the token again
        }
    };
    Tokenizer.prototype.stateBeforeEntity = function (c) {
        // Start excess with 1 to include the '&'
        this.entityExcess = 1;
        this.entityResult = 0;
        if (c === CharCodes.Number) {
            this.state = State.BeforeNumericEntity;
        }
        else if (c === CharCodes.Amp) {
            // We have two `&` characters in a row. Stay in the current state.
        }
        else {
            this.trieIndex = 0;
            this.trieCurrent = this.entityTrie[0];
            this.state = State.InNamedEntity;
            this.stateInNamedEntity(c);
        }
    };
    Tokenizer.prototype.stateInNamedEntity = function (c) {
        this.entityExcess += 1;
        this.trieIndex = (0, decode_js_1.determineBranch)(this.entityTrie, this.trieCurrent, this.trieIndex + 1, c);
        if (this.trieIndex < 0) {
            this.emitNamedEntity();
            this.index--;
            return;
        }
        this.trieCurrent = this.entityTrie[this.trieIndex];
        var masked = this.trieCurrent & decode_js_1.BinTrieFlags.VALUE_LENGTH;
        // If the branch is a value, store it and continue
        if (masked) {
            // The mask is the number of bytes of the value, including the current byte.
            var valueLength = (masked >> 14) - 1;
            // If we have a legacy entity while parsing strictly, just skip the number of bytes
            if (!this.allowLegacyEntity() && c !== CharCodes.Semi) {
                this.trieIndex += valueLength;
            }
            else {
                // Add 1 as we have already incremented the excess
                var entityStart = this.index - this.entityExcess + 1;
                if (entityStart > this.sectionStart) {
                    this.emitPartial(this.sectionStart, entityStart);
                }
                // If this is a surrogate pair, consume the next two bytes
                this.entityResult = this.trieIndex;
                this.trieIndex += valueLength;
                this.entityExcess = 0;
                this.sectionStart = this.index + 1;
                if (valueLength === 0) {
                    this.emitNamedEntity();
                }
            }
        }
    };
    Tokenizer.prototype.emitNamedEntity = function () {
        this.state = this.baseState;
        if (this.entityResult === 0) {
            return;
        }
        var valueLength = (this.entityTrie[this.entityResult] & decode_js_1.BinTrieFlags.VALUE_LENGTH) >>
            14;
        switch (valueLength) {
            case 1: {
                this.emitCodePoint(this.entityTrie[this.entityResult] &
                    ~decode_js_1.BinTrieFlags.VALUE_LENGTH);
                break;
            }
            case 2: {
                this.emitCodePoint(this.entityTrie[this.entityResult + 1]);
                break;
            }
            case 3: {
                this.emitCodePoint(this.entityTrie[this.entityResult + 1]);
                this.emitCodePoint(this.entityTrie[this.entityResult + 2]);
            }
        }
    };
    Tokenizer.prototype.stateBeforeNumericEntity = function (c) {
        if ((c | 0x20) === CharCodes.LowerX) {
            this.entityExcess++;
            this.state = State.InHexEntity;
        }
        else {
            this.state = State.InNumericEntity;
            this.stateInNumericEntity(c);
        }
    };
    Tokenizer.prototype.emitNumericEntity = function (strict) {
        var entityStart = this.index - this.entityExcess - 1;
        var numberStart = entityStart + 2 + Number(this.state === State.InHexEntity);
        if (numberStart !== this.index) {
            // Emit leading data if any
            if (entityStart > this.sectionStart) {
                this.emitPartial(this.sectionStart, entityStart);
            }
            this.sectionStart = this.index + Number(strict);
            this.emitCodePoint((0, decode_js_1.replaceCodePoint)(this.entityResult));
        }
        this.state = this.baseState;
    };
    Tokenizer.prototype.stateInNumericEntity = function (c) {
        if (c === CharCodes.Semi) {
            this.emitNumericEntity(true);
        }
        else if (isNumber(c)) {
            this.entityResult = this.entityResult * 10 + (c - CharCodes.Zero);
            this.entityExcess++;
        }
        else {
            if (this.allowLegacyEntity()) {
                this.emitNumericEntity(false);
            }
            else {
                this.state = this.baseState;
            }
            this.index--;
        }
    };
    Tokenizer.prototype.stateInHexEntity = function (c) {
        if (c === CharCodes.Semi) {
            this.emitNumericEntity(true);
        }
        else if (isNumber(c)) {
            this.entityResult = this.entityResult * 16 + (c - CharCodes.Zero);
            this.entityExcess++;
        }
        else if (isHexDigit(c)) {
            this.entityResult =
                this.entityResult * 16 + ((c | 0x20) - CharCodes.LowerA + 10);
            this.entityExcess++;
        }
        else {
            if (this.allowLegacyEntity()) {
                this.emitNumericEntity(false);
            }
            else {
                this.state = this.baseState;
            }
            this.index--;
        }
    };
    Tokenizer.prototype.allowLegacyEntity = function () {
        return (!this.xmlMode &&
            (this.baseState === State.Text ||
                this.baseState === State.InSpecialTag));
    };
    /**
     * Remove data that has already been consumed from the buffer.
     */
    Tokenizer.prototype.cleanup = function () {
        // If we are inside of text or attributes, emit what we already have.
        if (this.running && this.sectionStart !== this.index) {
            if (this.state === State.Text ||
                (this.state === State.InSpecialTag && this.sequenceIndex === 0)) {
                this.cbs.ontext(this.sectionStart, this.index);
                this.sectionStart = this.index;
            }
            else if (this.state === State.InAttributeValueDq ||
                this.state === State.InAttributeValueSq ||
                this.state === State.InAttributeValueNq) {
                this.cbs.onattribdata(this.sectionStart, this.index);
                this.sectionStart = this.index;
            }
        }
    };
    Tokenizer.prototype.shouldContinue = function () {
        return this.index < this.buffer.length + this.offset && this.running;
    };
    /**
     * Iterates through the buffer, calling the function corresponding to the current state.
     *
     * States that are more likely to be hit are higher up, as a performance improvement.
     */
    Tokenizer.prototype.parse = function () {
        while (this.shouldContinue()) {
            var c = this.buffer.charCodeAt(this.index - this.offset);
            switch (this.state) {
                case State.Text: {
                    this.stateText(c);
                    break;
                }
                case State.SpecialStartSequence: {
                    this.stateSpecialStartSequence(c);
                    break;
                }
                case State.InSpecialTag: {
                    this.stateInSpecialTag(c);
                    break;
                }
                case State.CDATASequence: {
                    this.stateCDATASequence(c);
                    break;
                }
                case State.InAttributeValueDq: {
                    this.stateInAttributeValueDoubleQuotes(c);
                    break;
                }
                case State.InAttributeName: {
                    this.stateInAttributeName(c);
                    break;
                }
                case State.InCommentLike: {
                    this.stateInCommentLike(c);
                    break;
                }
                case State.InSpecialComment: {
                    this.stateInSpecialComment(c);
                    break;
                }
                case State.BeforeAttributeName: {
                    this.stateBeforeAttributeName(c);
                    break;
                }
                case State.InTagName: {
                    this.stateInTagName(c);
                    break;
                }
                case State.InClosingTagName: {
                    this.stateInClosingTagName(c);
                    break;
                }
                case State.BeforeTagName: {
                    this.stateBeforeTagName(c);
                    break;
                }
                case State.AfterAttributeName: {
                    this.stateAfterAttributeName(c);
                    break;
                }
                case State.InAttributeValueSq: {
                    this.stateInAttributeValueSingleQuotes(c);
                    break;
                }
                case State.BeforeAttributeValue: {
                    this.stateBeforeAttributeValue(c);
                    break;
                }
                case State.BeforeClosingTagName: {
                    this.stateBeforeClosingTagName(c);
                    break;
                }
                case State.AfterClosingTagName: {
                    this.stateAfterClosingTagName(c);
                    break;
                }
                case State.BeforeSpecialS: {
                    this.stateBeforeSpecialS(c);
                    break;
                }
                case State.InAttributeValueNq: {
                    this.stateInAttributeValueNoQuotes(c);
                    break;
                }
                case State.InSelfClosingTag: {
                    this.stateInSelfClosingTag(c);
                    break;
                }
                case State.InDeclaration: {
                    this.stateInDeclaration(c);
                    break;
                }
                case State.BeforeDeclaration: {
                    this.stateBeforeDeclaration(c);
                    break;
                }
                case State.BeforeComment: {
                    this.stateBeforeComment(c);
                    break;
                }
                case State.InProcessingInstruction: {
                    this.stateInProcessingInstruction(c);
                    break;
                }
                case State.InNamedEntity: {
                    this.stateInNamedEntity(c);
                    break;
                }
                case State.BeforeEntity: {
                    this.stateBeforeEntity(c);
                    break;
                }
                case State.InHexEntity: {
                    this.stateInHexEntity(c);
                    break;
                }
                case State.InNumericEntity: {
                    this.stateInNumericEntity(c);
                    break;
                }
                default: {
                    // `this._state === State.BeforeNumericEntity`
                    this.stateBeforeNumericEntity(c);
                }
            }
            this.index++;
        }
        this.cleanup();
    };
    Tokenizer.prototype.finish = function () {
        if (this.state === State.InNamedEntity) {
            this.emitNamedEntity();
        }
        // If there is remaining data, emit it in a reasonable way
        if (this.sectionStart < this.index) {
            this.handleTrailingData();
        }
        this.cbs.onend();
    };
    /** Handle any trailing data. */
    Tokenizer.prototype.handleTrailingData = function () {
        var endIndex = this.buffer.length + this.offset;
        if (this.state === State.InCommentLike) {
            if (this.currentSequence === Sequences.CdataEnd) {
                this.cbs.oncdata(this.sectionStart, endIndex, 0);
            }
            else {
                this.cbs.oncomment(this.sectionStart, endIndex, 0);
            }
        }
        else if (this.state === State.InNumericEntity &&
            this.allowLegacyEntity()) {
            this.emitNumericEntity(false);
            // All trailing data will have been consumed
        }
        else if (this.state === State.InHexEntity &&
            this.allowLegacyEntity()) {
            this.emitNumericEntity(false);
            // All trailing data will have been consumed
        }
        else if (this.state === State.InTagName ||
            this.state === State.BeforeAttributeName ||
            this.state === State.BeforeAttributeValue ||
            this.state === State.AfterAttributeName ||
            this.state === State.InAttributeName ||
            this.state === State.InAttributeValueSq ||
            this.state === State.InAttributeValueDq ||
            this.state === State.InAttributeValueNq ||
            this.state === State.InClosingTagName) {
            /*
             * If we are currently in an opening or closing tag, us not calling the
             * respective callback signals that the tag should be ignored.
             */
        }
        else {
            this.cbs.ontext(this.sectionStart, endIndex);
        }
    };
    Tokenizer.prototype.emitPartial = function (start, endIndex) {
        if (this.baseState !== State.Text &&
            this.baseState !== State.InSpecialTag) {
            this.cbs.onattribdata(start, endIndex);
        }
        else {
            this.cbs.ontext(start, endIndex);
        }
    };
    Tokenizer.prototype.emitCodePoint = function (cp) {
        if (this.baseState !== State.Text &&
            this.baseState !== State.InSpecialTag) {
            this.cbs.onattribentity(cp);
        }
        else {
            this.cbs.ontextentity(cp);
        }
    };
    return Tokenizer;
}());
exports["default"] = Tokenizer;
//# sourceMappingURL=Tokenizer.js.map

/***/ }),

/***/ "./node_modules/htmlparser2/lib/index.js":
/*!***********************************************!*\
  !*** ./node_modules/htmlparser2/lib/index.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomUtils = exports.parseFeed = exports.getFeed = exports.ElementType = exports.Tokenizer = exports.createDomStream = exports.parseDOM = exports.parseDocument = exports.DefaultHandler = exports.DomHandler = exports.Parser = void 0;
var Parser_js_1 = __webpack_require__(/*! ./Parser.js */ "./node_modules/htmlparser2/lib/Parser.js");
var Parser_js_2 = __webpack_require__(/*! ./Parser.js */ "./node_modules/htmlparser2/lib/Parser.js");
Object.defineProperty(exports, "Parser", ({ enumerable: true, get: function () { return Parser_js_2.Parser; } }));
var domhandler_1 = __webpack_require__(/*! domhandler */ "./node_modules/domhandler/lib/index.js");
var domhandler_2 = __webpack_require__(/*! domhandler */ "./node_modules/domhandler/lib/index.js");
Object.defineProperty(exports, "DomHandler", ({ enumerable: true, get: function () { return domhandler_2.DomHandler; } }));
// Old name for DomHandler
Object.defineProperty(exports, "DefaultHandler", ({ enumerable: true, get: function () { return domhandler_2.DomHandler; } }));
// Helper methods
/**
 * Parses the data, returns the resulting document.
 *
 * @param data The data that should be parsed.
 * @param options Optional options for the parser and DOM builder.
 */
function parseDocument(data, options) {
    var handler = new domhandler_1.DomHandler(undefined, options);
    new Parser_js_1.Parser(handler, options).end(data);
    return handler.root;
}
exports.parseDocument = parseDocument;
/**
 * Parses data, returns an array of the root nodes.
 *
 * Note that the root nodes still have a `Document` node as their parent.
 * Use `parseDocument` to get the `Document` node instead.
 *
 * @param data The data that should be parsed.
 * @param options Optional options for the parser and DOM builder.
 * @deprecated Use `parseDocument` instead.
 */
function parseDOM(data, options) {
    return parseDocument(data, options).children;
}
exports.parseDOM = parseDOM;
/**
 * Creates a parser instance, with an attached DOM handler.
 *
 * @param callback A callback that will be called once parsing has been completed.
 * @param options Optional options for the parser and DOM builder.
 * @param elementCallback An optional callback that will be called every time a tag has been completed inside of the DOM.
 */
function createDomStream(callback, options, elementCallback) {
    var handler = new domhandler_1.DomHandler(callback, options, elementCallback);
    return new Parser_js_1.Parser(handler, options);
}
exports.createDomStream = createDomStream;
var Tokenizer_js_1 = __webpack_require__(/*! ./Tokenizer.js */ "./node_modules/htmlparser2/lib/Tokenizer.js");
Object.defineProperty(exports, "Tokenizer", ({ enumerable: true, get: function () { return __importDefault(Tokenizer_js_1).default; } }));
/*
 * All of the following exports exist for backwards-compatibility.
 * They should probably be removed eventually.
 */
exports.ElementType = __importStar(__webpack_require__(/*! domelementtype */ "./node_modules/domelementtype/lib/index.js"));
var domutils_1 = __webpack_require__(/*! domutils */ "./node_modules/domutils/lib/index.js");
var domutils_2 = __webpack_require__(/*! domutils */ "./node_modules/domutils/lib/index.js");
Object.defineProperty(exports, "getFeed", ({ enumerable: true, get: function () { return domutils_2.getFeed; } }));
var parseFeedDefaultOptions = { xmlMode: true };
/**
 * Parse a feed.
 *
 * @param feed The feed that should be parsed, as a string.
 * @param options Optionally, options for parsing. When using this, you should set `xmlMode` to `true`.
 */
function parseFeed(feed, options) {
    if (options === void 0) { options = parseFeedDefaultOptions; }
    return (0, domutils_1.getFeed)(parseDOM(feed, options));
}
exports.parseFeed = parseFeed;
exports.DomUtils = __importStar(__webpack_require__(/*! domutils */ "./node_modules/domutils/lib/index.js"));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/lodash.camelcase/index.js":
/*!************************************************!*\
  !*** ./node_modules/lodash.camelcase/index.js ***!
  \************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match words composed of alphanumeric characters. */
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

/** Used to match Latin Unicode letters (excluding mathematical operators). */
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
    rsComboSymbolsRange = '\\u20d0-\\u20f0',
    rsDingbatRange = '\\u2700-\\u27bf',
    rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
    rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
    rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
    rsPunctuationRange = '\\u2000-\\u206f',
    rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
    rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
    rsVarRange = '\\ufe0e\\ufe0f',
    rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

/** Used to compose unicode capture groups. */
var rsApos = "['\u2019]",
    rsAstral = '[' + rsAstralRange + ']',
    rsBreak = '[' + rsBreakRange + ']',
    rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']',
    rsDigits = '\\d+',
    rsDingbat = '[' + rsDingbatRange + ']',
    rsLower = '[' + rsLowerRange + ']',
    rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsUpper = '[' + rsUpperRange + ']',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var rsLowerMisc = '(?:' + rsLower + '|' + rsMisc + ')',
    rsUpperMisc = '(?:' + rsUpper + '|' + rsMisc + ')',
    rsOptLowerContr = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
    rsOptUpperContr = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
    reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq,
    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match apostrophes. */
var reApos = RegExp(rsApos, 'g');

/**
 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
 */
var reComboMark = RegExp(rsCombo, 'g');

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

/** Used to match complex or compound words. */
var reUnicodeWord = RegExp([
  rsUpper + '?' + rsLower + '+' + rsOptLowerContr + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
  rsUpperMisc + '+' + rsOptUpperContr + '(?=' + [rsBreak, rsUpper + rsLowerMisc, '$'].join('|') + ')',
  rsUpper + '?' + rsLowerMisc + '+' + rsOptLowerContr,
  rsUpper + '+' + rsOptUpperContr,
  rsDigits,
  rsEmoji
].join('|'), 'g');

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboMarksRange + rsComboSymbolsRange + rsVarRange + ']');

/** Used to detect strings that need a more robust regexp to match words. */
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

/** Used to map Latin Unicode letters to basic Latin letters. */
var deburredLetters = {
  // Latin-1 Supplement block.
  '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
  '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
  '\xc7': 'C',  '\xe7': 'c',
  '\xd0': 'D',  '\xf0': 'd',
  '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
  '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
  '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
  '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
  '\xd1': 'N',  '\xf1': 'n',
  '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
  '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
  '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
  '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
  '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
  '\xc6': 'Ae', '\xe6': 'ae',
  '\xde': 'Th', '\xfe': 'th',
  '\xdf': 'ss',
  // Latin Extended-A block.
  '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
  '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
  '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
  '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
  '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
  '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
  '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
  '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
  '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
  '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
  '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
  '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
  '\u0134': 'J',  '\u0135': 'j',
  '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
  '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
  '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
  '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
  '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
  '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
  '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
  '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
  '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
  '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
  '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
  '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
  '\u0163': 't',  '\u0165': 't', '\u0167': 't',
  '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
  '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
  '\u0174': 'W',  '\u0175': 'w',
  '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
  '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
  '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
  '\u0132': 'IJ', '\u0133': 'ij',
  '\u0152': 'Oe', '\u0153': 'oe',
  '\u0149': "'n", '\u017f': 'ss'
};

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array ? array.length : 0;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function asciiToArray(string) {
  return string.split('');
}

/**
 * Splits an ASCII `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function asciiWords(string) {
  return string.match(reAsciiWord) || [];
}

/**
 * The base implementation of `_.propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyOf(object) {
  return function(key) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
 * letters to basic Latin letters.
 *
 * @private
 * @param {string} letter The matched letter to deburr.
 * @returns {string} Returns the deburred letter.
 */
var deburrLetter = basePropertyOf(deburredLetters);

/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode(string) {
  return reHasUnicode.test(string);
}

/**
 * Checks if `string` contains a word composed of Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a word is found, else `false`.
 */
function hasUnicodeWord(string) {
  return reHasUnicodeWord.test(string);
}

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function stringToArray(string) {
  return hasUnicode(string)
    ? unicodeToArray(string)
    : asciiToArray(string);
}

/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function unicodeToArray(string) {
  return string.match(reUnicode) || [];
}

/**
 * Splits a Unicode `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function unicodeWords(string) {
  return string.match(reUnicodeWord) || [];
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var Symbol = root.Symbol;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Casts `array` to a slice if it's needed.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {number} start The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the cast slice.
 */
function castSlice(array, start, end) {
  var length = array.length;
  end = end === undefined ? length : end;
  return (!start && end >= length) ? array : baseSlice(array, start, end);
}

/**
 * Creates a function like `_.lowerFirst`.
 *
 * @private
 * @param {string} methodName The name of the `String` case method to use.
 * @returns {Function} Returns the new case function.
 */
function createCaseFirst(methodName) {
  return function(string) {
    string = toString(string);

    var strSymbols = hasUnicode(string)
      ? stringToArray(string)
      : undefined;

    var chr = strSymbols
      ? strSymbols[0]
      : string.charAt(0);

    var trailing = strSymbols
      ? castSlice(strSymbols, 1).join('')
      : string.slice(1);

    return chr[methodName]() + trailing;
  };
}

/**
 * Creates a function like `_.camelCase`.
 *
 * @private
 * @param {Function} callback The function to combine each word.
 * @returns {Function} Returns the new compounder function.
 */
function createCompounder(callback) {
  return function(string) {
    return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
  };
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the camel cased string.
 * @example
 *
 * _.camelCase('Foo Bar');
 * // => 'fooBar'
 *
 * _.camelCase('--foo-bar--');
 * // => 'fooBar'
 *
 * _.camelCase('__FOO_BAR__');
 * // => 'fooBar'
 */
var camelCase = createCompounder(function(result, word, index) {
  word = word.toLowerCase();
  return result + (index ? capitalize(word) : word);
});

/**
 * Converts the first character of `string` to upper case and the remaining
 * to lower case.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to capitalize.
 * @returns {string} Returns the capitalized string.
 * @example
 *
 * _.capitalize('FRED');
 * // => 'Fred'
 */
function capitalize(string) {
  return upperFirst(toString(string).toLowerCase());
}

/**
 * Deburrs `string` by converting
 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
 * letters to basic Latin letters and removing
 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to deburr.
 * @returns {string} Returns the deburred string.
 * @example
 *
 * _.deburr('déjà vu');
 * // => 'deja vu'
 */
function deburr(string) {
  string = toString(string);
  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
}

/**
 * Converts the first character of `string` to upper case.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.upperFirst('fred');
 * // => 'Fred'
 *
 * _.upperFirst('FRED');
 * // => 'FRED'
 */
var upperFirst = createCaseFirst('toUpperCase');

/**
 * Splits `string` into an array of its words.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {RegExp|string} [pattern] The pattern to match words.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the words of `string`.
 * @example
 *
 * _.words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 *
 * _.words('fred, barney, & pebbles', /[^, ]+/g);
 * // => ['fred', 'barney', '&', 'pebbles']
 */
function words(string, pattern, guard) {
  string = toString(string);
  pattern = guard ? undefined : pattern;

  if (pattern === undefined) {
    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
  }
  return string.match(pattern) || [];
}

module.exports = camelCase;


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/createLucideIcon.js":
/*!****************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/createLucideIcon.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ createLucideIcon; },
/* harmony export */   toKebabCase: function() { return /* binding */ toKebabCase; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _defaultAttributes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./defaultAttributes.js */ "./node_modules/lucide-react/dist/esm/defaultAttributes.js");
/**
 * lucide-react v0.271.0 - ISC
 */




const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const createLucideIcon = (iconName, iconNode) => {
  const Component = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(
    ({ color = "currentColor", size = 24, strokeWidth = 2, absoluteStrokeWidth, children, ...rest }, ref) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(
      "svg",
      {
        ref,
        ..._defaultAttributes_js__WEBPACK_IMPORTED_MODULE_1__["default"],
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: `lucide lucide-${toKebabCase(iconName)}`,
        ...rest
      },
      [
        ...iconNode.map(([tag, attrs]) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(tag, attrs)),
        ...(Array.isArray(children) ? children : [children]) || []
      ]
    )
  );
  Component.displayName = `${iconName}`;
  return Component;
};


//# sourceMappingURL=createLucideIcon.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/defaultAttributes.js":
/*!*****************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/defaultAttributes.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ defaultAttributes; }
/* harmony export */ });
/**
 * lucide-react v0.271.0 - ISC
 */

var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};


//# sourceMappingURL=defaultAttributes.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/alert-circle.js":
/*!******************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/alert-circle.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ AlertCircle; }
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * lucide-react v0.271.0 - ISC
 */



const AlertCircle = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("AlertCircle", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
]);


//# sourceMappingURL=alert-circle.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/code.js":
/*!**********************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/code.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Code; }
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * lucide-react v0.271.0 - ISC
 */



const Code = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("Code", [
  ["polyline", { points: "16 18 22 12 16 6", key: "z7tu5w" }],
  ["polyline", { points: "8 6 2 12 8 18", key: "1eg1df" }]
]);


//# sourceMappingURL=code.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/download-cloud.js":
/*!********************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/download-cloud.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ DownloadCloud; }
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * lucide-react v0.271.0 - ISC
 */



const DownloadCloud = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("DownloadCloud", [
  [
    "path",
    {
      d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",
      key: "1pljnt"
    }
  ],
  ["path", { d: "M12 12v9", key: "192myk" }],
  ["path", { d: "m8 17 4 4 4-4", key: "1ul180" }]
]);


//# sourceMappingURL=download-cloud.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/download.js":
/*!**************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/download.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Download; }
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * lucide-react v0.271.0 - ISC
 */



const Download = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("Download", [
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["polyline", { points: "7 10 12 15 17 10", key: "2ggqvy" }],
  ["line", { x1: "12", x2: "12", y1: "15", y2: "3", key: "1vk2je" }]
]);


//# sourceMappingURL=download.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/forward.js":
/*!*************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/forward.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Forward; }
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * lucide-react v0.271.0 - ISC
 */



const Forward = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("Forward", [
  ["polyline", { points: "15 17 20 12 15 7", key: "1w3sku" }],
  ["path", { d: "M4 18v-2a4 4 0 0 1 4-4h12", key: "jmiej9" }]
]);


//# sourceMappingURL=forward.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/line-chart.js":
/*!****************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/line-chart.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ LineChart; }
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * lucide-react v0.271.0 - ISC
 */



const LineChart = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("LineChart", [
  ["path", { d: "M3 3v18h18", key: "1s2lah" }],
  ["path", { d: "m19 9-5 5-4-4-3 3", key: "2osh9i" }]
]);


//# sourceMappingURL=line-chart.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/star.js":
/*!**********************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/star.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Star; }
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * lucide-react v0.271.0 - ISC
 */



const Star = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("Star", [
  [
    "polygon",
    {
      points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",
      key: "8f66p6"
    }
  ]
]);


//# sourceMappingURL=star.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/undo.js":
/*!**********************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/undo.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Undo; }
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * lucide-react v0.271.0 - ISC
 */



const Undo = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("Undo", [
  ["path", { d: "M3 7v6h6", key: "1v2h90" }],
  ["path", { d: "M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13", key: "1r6uu6" }]
]);


//# sourceMappingURL=undo.js.map


/***/ }),

/***/ "./src/blocks/components/ColorPicker/editor.scss":
/*!*******************************************************!*\
  !*** ./src/blocks/components/ColorPicker/editor.scss ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/blocks/components/PresetButton/editor.scss":
/*!********************************************************!*\
  !*** ./src/blocks/components/PresetButton/editor.scss ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/***/ (function(module) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "./node_modules/prop-types/checkPropTypes.js":
/*!***************************************************!*\
  !*** ./node_modules/prop-types/checkPropTypes.js ***!
  \***************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var printWarning = function() {};

if (true) {
  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
  var loggedTypeFailures = {};
  var has = __webpack_require__(/*! ./lib/has */ "./node_modules/prop-types/lib/has.js");

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) { /**/ }
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' +
              'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (true) {
    loggedTypeFailures = {};
  }
}

module.exports = checkPropTypes;


/***/ }),

/***/ "./node_modules/prop-types/factoryWithTypeCheckers.js":
/*!************************************************************!*\
  !*** ./node_modules/prop-types/factoryWithTypeCheckers.js ***!
  \************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/prop-types/node_modules/react-is/index.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
var has = __webpack_require__(/*! ./lib/has */ "./node_modules/prop-types/lib/has.js");
var checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ "./node_modules/prop-types/checkPropTypes.js");

var printWarning = function() {};

if (true) {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bigint: createPrimitiveTypeChecker('bigint'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message, data) {
    this.message = message;
    this.data = data && typeof data === 'object' ? data: {};
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if ( true && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError(
          'Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'),
          {expectedType: expectedType}
        );
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!ReactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (true) {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      var expectedTypes = [];
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        var checkerResult = checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
        if (checkerResult == null) {
          return null;
        }
        if (checkerResult.data && has(checkerResult.data, 'expectedType')) {
          expectedTypes.push(checkerResult.data.expectedType);
        }
      }
      var expectedTypesMessage = (expectedTypes.length > 0) ? ', expected one of type [' + expectedTypes.join(', ') + ']': '';
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`' + expectedTypesMessage + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function invalidValidatorError(componentName, location, propFullName, key, type) {
    return new PropTypeError(
      (componentName || 'React class') + ': ' + location + ' type `' + propFullName + '.' + key + '` is invalid; ' +
      'it must be a function, usually from the `prop-types` package, but received `' + type + '`.'
    );
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (has(shapeTypes, key) && typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ "./node_modules/prop-types/index.js":
/*!******************************************!*\
  !*** ./node_modules/prop-types/index.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/prop-types/node_modules/react-is/index.js");

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ "./node_modules/prop-types/factoryWithTypeCheckers.js")(ReactIs.isElement, throwOnDirectAccess);
} else {}


/***/ }),

/***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!*************************************************************!*\
  !*** ./node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \*************************************************************/
/***/ (function(module) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ "./node_modules/prop-types/lib/has.js":
/*!********************************************!*\
  !*** ./node_modules/prop-types/lib/has.js ***!
  \********************************************/
/***/ (function(module) {

module.exports = Function.call.bind(Object.prototype.hasOwnProperty);


/***/ }),

/***/ "./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}


/***/ }),

/***/ "./node_modules/prop-types/node_modules/react-is/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/prop-types/node_modules/react-is/index.js ***!
  \****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js");
}


/***/ }),

/***/ "./node_modules/react-simple-star-rating/dist/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/react-simple-star-rating/dist/index.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:!0}));var e=__webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js"),t=__webpack_require__(/*! react */ "react"),o=function(){return o=Object.assign||function(e){for(var t,o=1,n=arguments.length;o<n;o++)for(var i in t=arguments[o])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},o.apply(this,arguments)};function n(e,t,o){if(o||2===arguments.length)for(var n,i=0,r=t.length;i<r;i++)!n&&i in t||(n||(n=Array.prototype.slice.call(t,0,i)),n[i]=t[i]);return e.concat(n||Array.prototype.slice.call(t))}function i(t){var n=t.size,i=void 0===n?25:n,r=t.SVGstrokeColor,l=void 0===r?"currentColor":r,a=t.SVGstorkeWidth,s=void 0===a?0:a,c=t.SVGclassName,d=void 0===c?"star-svg":c,u=t.SVGstyle;return e.jsx("svg",o({className:d,style:u,stroke:l,fill:"currentColor",strokeWidth:s,viewBox:"0 0 24 24",width:i,height:i,xmlns:"http://www.w3.org/2000/svg"},{children:e.jsx("path",{d:"M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"})}))}function r(e,t){switch(t.type){case"PointerMove":return o(o({},e),{hoverValue:t.payload,hoverIndex:t.index});case"PointerLeave":return o(o({},e),{ratingValue:e.ratingValue,hoverIndex:0,hoverValue:null});case"MouseClick":return o(o({},e),{valueIndex:e.hoverIndex,ratingValue:t.payload});default:return e}}var l="style-module_starRatingWrap__q-lJC",a="style-module_simpleStarRating__nWUxf",s="style-module_fillIcons__6---A",c="style-module_emptyIcons__Bg-FZ",d="style-module_tooltip__tKc3i";function u(){return"undefined"!=typeof window&&window.matchMedia("(pointer: coarse)").matches||"ontouchstart"in window||"undefined"!=typeof navigator&&navigator.maxTouchPoints>0}!function(e,t){void 0===t&&(t={});var o=t.insertAt;if(e&&"undefined"!=typeof document){var n=document.head||document.getElementsByTagName("head")[0],i=document.createElement("style");i.type="text/css","top"===o&&n.firstChild?n.insertBefore(i,n.firstChild):n.appendChild(i),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(document.createTextNode(e))}}(".style-module_starRatingWrap__q-lJC{display:inline-block;touch-action:none}.style-module_simpleStarRating__nWUxf{display:inline-block;overflow:hidden;position:relative;touch-action:none;-webkit-user-select:none;-moz-user-select:none;user-select:none;vertical-align:middle;white-space:nowrap}.style-module_fillIcons__6---A{display:inline-block;overflow:hidden;position:absolute;top:0;white-space:nowrap}.style-module_emptyIcons__Bg-FZ{display:inline-block}.style-module_tooltip__tKc3i{background-color:#333;border-radius:5px;color:#fff;display:inline-block;padding:5px 15px;vertical-align:middle}"),exports.Rating=function(v){var p,f,h=v.onClick,y=v.onPointerMove,m=v.onPointerEnter,g=v.onPointerLeave,x=v.initialValue,_=void 0===x?0:x,C=v.iconsCount,w=void 0===C?5:C,V=v.size,k=void 0===V?40:V,S=v.readonly,b=void 0!==S&&S,M=v.rtl,G=void 0!==M&&M,I=v.customIcons,N=void 0===I?[]:I,j=v.allowFraction,P=void 0!==j&&j,A=v.style,L=v.className,R=void 0===L?"react-simple-star-rating":L,T=v.transition,W=void 0!==T&&T,z=v.allowHover,B=void 0===z||z,E=v.disableFillHover,F=void 0!==E&&E,q=v.fillIcon,O=void 0===q?null:q,H=v.fillColor,J=void 0===H?"#ffbc0b":H,K=v.fillColorArray,U=void 0===K?[]:K,Z=v.fillStyle,D=v.fillClassName,X=void 0===D?"filled-icons":D,Y=v.emptyIcon,Q=void 0===Y?null:Y,$=v.emptyColor,ee=void 0===$?"#cccccc":$,te=v.emptyStyle,oe=v.emptyClassName,ne=void 0===oe?"empty-icons":oe,ie=v.allowTitleTag,re=void 0===ie||ie,le=v.showTooltip,ae=void 0!==le&&le,se=v.tooltipDefaultText,ce=void 0===se?"Your Rate":se,de=v.tooltipArray,ue=void 0===de?[]:de,ve=v.tooltipStyle,pe=v.tooltipClassName,fe=void 0===pe?"react-simple-star-rating-tooltip":pe,he=v.SVGclassName,ye=void 0===he?"star-svg":he,me=v.titleSeparator,ge=void 0===me?"out of":me,xe=v.SVGstyle,_e=v.SVGstorkeWidth,Ce=void 0===_e?0:_e,we=v.SVGstrokeColor,Ve=void 0===we?"currentColor":we,ke=t.useReducer(r,{hoverIndex:0,valueIndex:0,ratingValue:_,hoverValue:null}),Se=ke[0],be=Se.ratingValue,Me=Se.hoverValue,Ge=Se.hoverIndex,Ie=Se.valueIndex,Ne=ke[1];t.useEffect((function(){_&&Ne({type:"MouseClick",payload:0})}),[_]);var je=t.useMemo((function(){return P?2*w:w}),[P,w]),Pe=t.useMemo((function(){return _>je?0:P||Math.floor(_)===_?Math.round(_/w*100):2*Math.ceil(_)*10}),[P,_,w,je]),Ae=t.useMemo((function(){return(P?2*_-1:_-1)||0}),[P,_]),Le=t.useCallback((function(e){return w%2!=0?e/2/10:e*w/100}),[w]),Re=function(e){for(var t=e.clientX,o=e.currentTarget.children[0].getBoundingClientRect(),n=o.left,i=o.right,r=o.width,l=G?i-t:t-n,a=je,s=Math.round(r/je),c=0;c<=je;c+=1)if(l<=s*c){a=0===c&&l<s?0:c;break}var d=a-1;a>0&&(Ne({type:"PointerMove",payload:100*a/je,index:d}),y&&Me&&y(Le(Me),d,e))},Te=function(e){Me&&(Ne({type:"MouseClick",payload:Me}),h&&h(Le(Me),Ge,e))},We=t.useMemo((function(){if(B){if(F){var e=be&&be||Pe;return Me&&Me>e?Me:e}return Me&&Me||be&&be||Pe}return be&&be||Pe}),[B,F,Me,be,Pe]);t.useEffect((function(){ue.length>je&&console.error("tooltipArray Array length is bigger then Icons Count length.")}),[ue.length,je]);var ze=t.useCallback((function(e){return Me&&e[Ge]||be&&e[Ie]||_&&e[Ae]}),[Me,Ge,be,Ie,_,Ae]),Be=t.useMemo((function(){return Me&&Le(Me)||be&&Le(be)||_&&Le(Pe)}),[Me,Le,be,_,Pe]);return e.jsxs("span",o({className:l,style:{direction:"".concat(G?"rtl":"ltr")}},{children:[e.jsxs("span",o({className:"".concat(a," ").concat(R),style:o({cursor:b?"":"pointer"},A),onPointerMove:b?void 0:Re,onPointerEnter:b?void 0:function(e){m&&m(e),u()&&Re(e)},onPointerLeave:b?void 0:function(e){u()&&Te(),Ne({type:"PointerLeave"}),g&&g(e)},onClick:b?void 0:Te,"aria-hidden":"true"},{children:[e.jsx("span",o({className:"".concat(c," ").concat(ne),style:o({color:ee},te)},{children:n([],Array(w),!0).map((function(o,n){var r;return e.jsx(t.Fragment,{children:(null===(r=N[n])||void 0===r?void 0:r.icon)||Q||e.jsx(i,{SVGclassName:ye,SVGstyle:xe,SVGstorkeWidth:Ce,SVGstrokeColor:Ve,size:k})},n)}))})),e.jsx("span",o({className:"".concat(s," ").concat(X),style:o((p={},p[G?"right":"left"]=0,p.color=ze(U)||J,p.transition=W?"width .2s ease, color .2s ease":"",p.width="".concat(We,"%"),p),Z),title:re?"".concat(Be," ").concat(ge," ").concat(w):void 0},{children:n([],Array(w),!0).map((function(o,n){var r;return e.jsx(t.Fragment,{children:(null===(r=N[n])||void 0===r?void 0:r.icon)||O||e.jsx(i,{SVGclassName:ye,SVGstyle:xe,SVGstorkeWidth:Ce,SVGstrokeColor:Ve,size:k})},n)}))}))]})),ae&&e.jsx("span",o({className:"".concat(d," ").concat(fe),style:o((f={},f[G?"marginRight":"marginLeft"]=20,f),ve)},{children:(ue.length>0?ze(ue):Be)||ce}))]}))};
//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./node_modules/react-spinners/esm/BarLoader.js":
/*!******************************************************!*\
  !*** ./node_modules/react-spinners/esm/BarLoader.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helpers_unitConverter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers/unitConverter */ "./node_modules/react-spinners/esm/helpers/unitConverter.js");
/* harmony import */ var _helpers_animation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/animation */ "./node_modules/react-spinners/esm/helpers/animation.js");
/* harmony import */ var _helpers_colors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers/colors */ "./node_modules/react-spinners/esm/helpers/colors.js");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};




var long = (0,_helpers_animation__WEBPACK_IMPORTED_MODULE_1__.createAnimation)("BarLoader", "0% {left: -35%;right: 100%} 60% {left: 100%;right: -90%} 100% {left: 100%;right: -90%}", "long");
var short = (0,_helpers_animation__WEBPACK_IMPORTED_MODULE_1__.createAnimation)("BarLoader", "0% {left: -200%;right: 100%} 60% {left: 107%;right: -8%} 100% {left: 107%;right: -8%}", "short");
function BarLoader(_a) {
    var _b = _a.loading, loading = _b === void 0 ? true : _b, _c = _a.color, color = _c === void 0 ? "#000000" : _c, _d = _a.speedMultiplier, speedMultiplier = _d === void 0 ? 1 : _d, _e = _a.cssOverride, cssOverride = _e === void 0 ? {} : _e, _f = _a.height, height = _f === void 0 ? 4 : _f, _g = _a.width, width = _g === void 0 ? 100 : _g, additionalprops = __rest(_a, ["loading", "color", "speedMultiplier", "cssOverride", "height", "width"]);
    var wrapper = __assign({ display: "inherit", position: "relative", width: (0,_helpers_unitConverter__WEBPACK_IMPORTED_MODULE_2__.cssValue)(width), height: (0,_helpers_unitConverter__WEBPACK_IMPORTED_MODULE_2__.cssValue)(height), overflow: "hidden", backgroundColor: (0,_helpers_colors__WEBPACK_IMPORTED_MODULE_3__.calculateRgba)(color, 0.2), backgroundClip: "padding-box" }, cssOverride);
    var style = function (i) {
        return {
            position: "absolute",
            height: (0,_helpers_unitConverter__WEBPACK_IMPORTED_MODULE_2__.cssValue)(height),
            overflow: "hidden",
            backgroundColor: color,
            backgroundClip: "padding-box",
            display: "block",
            borderRadius: 2,
            willChange: "left, right",
            animationFillMode: "forwards",
            animation: "".concat(i === 1 ? long : short, " ").concat(2.1 / speedMultiplier, "s ").concat(i === 2 ? "".concat(1.15 / speedMultiplier, "s") : "", " ").concat(i === 1 ? "cubic-bezier(0.65, 0.815, 0.735, 0.395)" : "cubic-bezier(0.165, 0.84, 0.44, 1)", " infinite"),
        };
    };
    if (!loading) {
        return null;
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", __assign({ style: wrapper }, additionalprops),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: style(1) }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: style(2) })));
}
/* harmony default export */ __webpack_exports__["default"] = (BarLoader);


/***/ }),

/***/ "./node_modules/react-spinners/esm/helpers/animation.js":
/*!**************************************************************!*\
  !*** ./node_modules/react-spinners/esm/helpers/animation.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createAnimation: function() { return /* binding */ createAnimation; }
/* harmony export */ });
var createAnimation = function (loaderName, frames, suffix) {
    var animationName = "react-spinners-".concat(loaderName, "-").concat(suffix);
    if (typeof window == "undefined" || !window.document) {
        return animationName;
    }
    var styleEl = document.createElement("style");
    document.head.appendChild(styleEl);
    var styleSheet = styleEl.sheet;
    var keyFrames = "\n    @keyframes ".concat(animationName, " {\n      ").concat(frames, "\n    }\n  ");
    if (styleSheet) {
        styleSheet.insertRule(keyFrames, 0);
    }
    return animationName;
};


/***/ }),

/***/ "./node_modules/react-spinners/esm/helpers/colors.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-spinners/esm/helpers/colors.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calculateRgba: function() { return /* binding */ calculateRgba; }
/* harmony export */ });
var BasicColors;
(function (BasicColors) {
    BasicColors["maroon"] = "#800000";
    BasicColors["red"] = "#FF0000";
    BasicColors["orange"] = "#FFA500";
    BasicColors["yellow"] = "#FFFF00";
    BasicColors["olive"] = "#808000";
    BasicColors["green"] = "#008000";
    BasicColors["purple"] = "#800080";
    BasicColors["fuchsia"] = "#FF00FF";
    BasicColors["lime"] = "#00FF00";
    BasicColors["teal"] = "#008080";
    BasicColors["aqua"] = "#00FFFF";
    BasicColors["blue"] = "#0000FF";
    BasicColors["navy"] = "#000080";
    BasicColors["black"] = "#000000";
    BasicColors["gray"] = "#808080";
    BasicColors["silver"] = "#C0C0C0";
    BasicColors["white"] = "#FFFFFF";
})(BasicColors || (BasicColors = {}));
var calculateRgba = function (color, opacity) {
    if (Object.keys(BasicColors).includes(color)) {
        color = BasicColors[color];
    }
    if (color[0] === "#") {
        color = color.slice(1);
    }
    if (color.length === 3) {
        var res_1 = "";
        color.split("").forEach(function (c) {
            res_1 += c;
            res_1 += c;
        });
        color = res_1;
    }
    var rgbValues = (color.match(/.{2}/g) || []).map(function (hex) { return parseInt(hex, 16); }).join(", ");
    return "rgba(".concat(rgbValues, ", ").concat(opacity, ")");
};


/***/ }),

/***/ "./node_modules/react-spinners/esm/helpers/unitConverter.js":
/*!******************************************************************!*\
  !*** ./node_modules/react-spinners/esm/helpers/unitConverter.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cssValue: function() { return /* binding */ cssValue; },
/* harmony export */   parseLengthAndUnit: function() { return /* binding */ parseLengthAndUnit; }
/* harmony export */ });
var cssUnit = {
    cm: true,
    mm: true,
    in: true,
    px: true,
    pt: true,
    pc: true,
    em: true,
    ex: true,
    ch: true,
    rem: true,
    vw: true,
    vh: true,
    vmin: true,
    vmax: true,
    "%": true,
};
/**
 * If size is a number, append px to the value as default unit.
 * If size is a string, validate against list of valid units.
 * If unit is valid, return size as is.
 * If unit is invalid, console warn issue, replace with px as the unit.
 *
 * @param {(number | string)} size
 * @return {LengthObject} LengthObject
 */
function parseLengthAndUnit(size) {
    if (typeof size === "number") {
        return {
            value: size,
            unit: "px",
        };
    }
    var value;
    var valueString = (size.match(/^[0-9.]*/) || "").toString();
    if (valueString.includes(".")) {
        value = parseFloat(valueString);
    }
    else {
        value = parseInt(valueString, 10);
    }
    var unit = (size.match(/[^0-9]*$/) || "").toString();
    if (cssUnit[unit]) {
        return {
            value: value,
            unit: unit,
        };
    }
    console.warn("React Spinners: ".concat(size, " is not a valid css value. Defaulting to ").concat(value, "px."));
    return {
        value: value,
        unit: "px",
    };
}
/**
 * Take value as an input and return valid css value
 *
 * @param {(number | string)} value
 * @return {string} valid css value
 */
function cssValue(value) {
    var lengthWithunit = parseLengthAndUnit(value);
    return "".concat(lengthWithunit.value).concat(lengthWithunit.unit);
}


/***/ }),

/***/ "./node_modules/react-star-ratings/build/index.js":
/*!********************************************************!*\
  !*** ./node_modules/react-star-ratings/build/index.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _starRatings = __webpack_require__(/*! ./star-ratings */ "./node_modules/react-star-ratings/build/star-ratings.js");

var _starRatings2 = _interopRequireDefault(_starRatings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// polyfill for ie
Number.isInteger = Number.isInteger || function (value) {
  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
};

exports["default"] = _starRatings2.default;

/***/ }),

/***/ "./node_modules/react-star-ratings/build/star-ratings.js":
/*!***************************************************************!*\
  !*** ./node_modules/react-star-ratings/build/star-ratings.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _star = __webpack_require__(/*! ./star */ "./node_modules/react-star-ratings/build/star.js");

var _star2 = _interopRequireDefault(_star);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StarRatings = function (_React$Component) {
  _inherits(StarRatings, _React$Component);

  function StarRatings() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, StarRatings);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = StarRatings.__proto__ || Object.getPrototypeOf(StarRatings)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      highestStarHovered: -Infinity
    }, _this.fillId = 'starGrad' + Math.random().toFixed(15).slice(2), _this.hoverOverStar = function (starRating) {
      return function () {
        _this.setState({
          highestStarHovered: starRating
        });
      };
    }, _this.unHoverOverStar = function () {
      _this.setState({
        highestStarHovered: -Infinity
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(StarRatings, [{
    key: 'stopColorStyle',
    value: function stopColorStyle(color) {
      var stopColorStyle = {
        stopColor: color,
        stopOpacity: '1'
      };
      return this.props.ignoreInlineStyles ? {} : stopColorStyle;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          starRatedColor = _props.starRatedColor,
          starEmptyColor = _props.starEmptyColor;


      return _react2.default.createElement(
        'div',
        {
          className: 'star-ratings',
          title: this.titleText,
          style: this.starRatingsStyle
        },
        _react2.default.createElement(
          'svg',
          {
            className: 'star-grad',
            style: this.starGradientStyle
          },
          _react2.default.createElement(
            'defs',
            null,
            _react2.default.createElement(
              'linearGradient',
              { id: this.fillId, x1: '0%', y1: '0%', x2: '100%', y2: '0%' },
              _react2.default.createElement('stop', { offset: '0%', className: 'stop-color-first', style: this.stopColorStyle(starRatedColor) }),
              _react2.default.createElement('stop', { offset: this.offsetValue, className: 'stop-color-first', style: this.stopColorStyle(starRatedColor) }),
              _react2.default.createElement('stop', { offset: this.offsetValue, className: 'stop-color-final', style: this.stopColorStyle(starEmptyColor) }),
              _react2.default.createElement('stop', { offset: '100%', className: 'stop-color-final', style: this.stopColorStyle(starEmptyColor) })
            )
          )
        ),
        this.renderStars
      );
    }
  }, {
    key: 'starRatingsStyle',
    get: function get() {
      var starRatingsStyle = {
        position: 'relative',
        boxSizing: 'border-box',
        display: 'inline-block'
      };
      return this.props.ignoreInlineStyles ? {} : starRatingsStyle;
    }
  }, {
    key: 'starGradientStyle',
    get: function get() {
      var starGradientStyle = {
        position: 'absolute',
        zIndex: '0',
        width: '0',
        height: '0',
        visibility: 'hidden'
      };
      return this.props.ignoreInlineStyles ? {} : starGradientStyle;
    }
  }, {
    key: 'titleText',
    get: function get() {
      var _props2 = this.props,
          typeOfWidget = _props2.typeOfWidget,
          selectedRating = _props2.rating;

      var hoveredRating = this.state.highestStarHovered;
      var currentRating = hoveredRating > 0 ? hoveredRating : selectedRating;
      // fix it at 2 decimal places and remove trailing 0s
      var formattedRating = parseFloat(currentRating.toFixed(2)).toString();
      if (Number.isInteger(currentRating)) {
        formattedRating = String(currentRating);
      }
      var starText = typeOfWidget + 's';
      if (formattedRating === '1') {
        starText = typeOfWidget;
      }
      return formattedRating + ' ' + starText;
    }
  }, {
    key: 'offsetValue',
    get: function get() {
      var rating = this.props.rating;
      var ratingIsInteger = Number.isInteger(rating);
      var offsetValue = '0%';
      if (!ratingIsInteger) {
        var firstTwoDecimals = rating.toFixed(2).split('.')[1].slice(0, 2);
        offsetValue = firstTwoDecimals + '%';
      }
      return offsetValue;
    }
  }, {
    key: 'renderStars',
    get: function get() {
      var _this2 = this;

      var _props3 = this.props,
          changeRating = _props3.changeRating,
          selectedRating = _props3.rating,
          numberOfStars = _props3.numberOfStars,
          starDimension = _props3.starDimension,
          starSpacing = _props3.starSpacing,
          starRatedColor = _props3.starRatedColor,
          starEmptyColor = _props3.starEmptyColor,
          starHoverColor = _props3.starHoverColor,
          gradientPathName = _props3.gradientPathName,
          ignoreInlineStyles = _props3.ignoreInlineStyles,
          svgIconPath = _props3.svgIconPath,
          svgIconViewBox = _props3.svgIconViewBox,
          name = _props3.name;
      var highestStarHovered = this.state.highestStarHovered;


      var numberOfStarsArray = Array.apply(null, Array(numberOfStars));

      return numberOfStarsArray.map(function (_, index) {
        var starRating = index + 1;
        var isStarred = starRating <= selectedRating;

        // hovered only matters when changeRating is true
        var hoverMode = highestStarHovered > 0;
        var isHovered = starRating <= highestStarHovered;
        var isCurrentHoveredStar = starRating === highestStarHovered;

        // only matters when changeRating is false
        // given star 5 and rating 4.2:  5 > 4.2 && 4 < 4.2;
        var isPartiallyFullStar = starRating > selectedRating && starRating - 1 < selectedRating;

        var isFirstStar = starRating === 1;
        var isLastStar = starRating === numberOfStars;

        return _react2.default.createElement(_star2.default, {
          key: starRating,
          fillId: _this2.fillId,
          changeRating: changeRating ? function () {
            return changeRating(starRating, name);
          } : null,
          hoverOverStar: changeRating ? _this2.hoverOverStar(starRating) : null,
          unHoverOverStar: changeRating ? _this2.unHoverOverStar : null,
          isStarred: isStarred,
          isPartiallyFullStar: isPartiallyFullStar,
          isHovered: isHovered,
          hoverMode: hoverMode,
          isCurrentHoveredStar: isCurrentHoveredStar,
          isFirstStar: isFirstStar,
          isLastStar: isLastStar,
          starDimension: starDimension,
          starSpacing: starSpacing,
          starHoverColor: starHoverColor,
          starRatedColor: starRatedColor,
          starEmptyColor: starEmptyColor,
          gradientPathName: gradientPathName,
          ignoreInlineStyles: ignoreInlineStyles,
          svgIconPath: svgIconPath,
          svgIconViewBox: svgIconViewBox
        });
      });
    }
  }]);

  return StarRatings;
}(_react2.default.Component);

StarRatings.propTypes = {
  rating: _propTypes2.default.number.isRequired,
  numberOfStars: _propTypes2.default.number.isRequired,
  changeRating: _propTypes2.default.func,
  starHoverColor: _propTypes2.default.string.isRequired,
  starRatedColor: _propTypes2.default.string.isRequired,
  starEmptyColor: _propTypes2.default.string.isRequired,
  starDimension: _propTypes2.default.string.isRequired,
  starSpacing: _propTypes2.default.string.isRequired,
  gradientPathName: _propTypes2.default.string.isRequired,
  ignoreInlineStyles: _propTypes2.default.bool.isRequired,
  svgIconPath: _propTypes2.default.string.isRequired,
  svgIconViewBox: _propTypes2.default.string.isRequired,
  name: _propTypes2.default.string
};

StarRatings.defaultProps = {
  rating: 0,
  typeOfWidget: 'Star',
  numberOfStars: 5,
  changeRating: null,
  starHoverColor: 'rgb(230, 67, 47)',
  starRatedColor: 'rgb(109, 122, 130)',
  starEmptyColor: 'rgb(203, 211, 227)',
  starDimension: '50px',
  starSpacing: '7px',
  gradientPathName: '',
  ignoreInlineStyles: false,
  svgIconPath: 'm25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z',
  svgIconViewBox: '0 0 51 48'
};

exports["default"] = StarRatings;

/***/ }),

/***/ "./node_modules/react-star-ratings/build/star.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-star-ratings/build/star.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Star = function (_React$Component) {
  _inherits(Star, _React$Component);

  function Star() {
    _classCallCheck(this, Star);

    return _possibleConstructorReturn(this, (Star.__proto__ || Object.getPrototypeOf(Star)).apply(this, arguments));
  }

  _createClass(Star, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          changeRating = _props.changeRating,
          hoverOverStar = _props.hoverOverStar,
          unHoverOverStar = _props.unHoverOverStar,
          svgIconViewBox = _props.svgIconViewBox,
          svgIconPath = _props.svgIconPath;

      return _react2.default.createElement(
        'div',
        {
          className: 'star-container',
          style: this.starContainerStyle,
          onMouseEnter: hoverOverStar,
          onMouseLeave: unHoverOverStar,
          onClick: changeRating
        },
        _react2.default.createElement(
          'svg',
          {
            viewBox: svgIconViewBox,
            className: this.starClasses,
            style: this.starSvgStyle
          },
          _react2.default.createElement('path', {
            className: 'star',
            style: this.pathStyle,
            d: svgIconPath
          })
        )
      );
    }
  }, {
    key: 'starContainerStyle',
    get: function get() {
      var _props2 = this.props,
          changeRating = _props2.changeRating,
          starSpacing = _props2.starSpacing,
          isFirstStar = _props2.isFirstStar,
          isLastStar = _props2.isLastStar,
          ignoreInlineStyles = _props2.ignoreInlineStyles;


      var starContainerStyle = {
        position: 'relative',
        display: 'inline-block',
        verticalAlign: 'middle',
        paddingLeft: isFirstStar ? undefined : starSpacing,
        paddingRight: isLastStar ? undefined : starSpacing,
        cursor: changeRating ? 'pointer' : undefined
      };
      return ignoreInlineStyles ? {} : starContainerStyle;
    }
  }, {
    key: 'starSvgStyle',
    get: function get() {
      var _props3 = this.props,
          ignoreInlineStyles = _props3.ignoreInlineStyles,
          isCurrentHoveredStar = _props3.isCurrentHoveredStar,
          starDimension = _props3.starDimension;

      var starSvgStyle = {
        width: starDimension,
        height: starDimension,
        transition: 'transform .2s ease-in-out',
        transform: isCurrentHoveredStar ? 'scale(1.1)' : undefined
      };

      return ignoreInlineStyles ? {} : starSvgStyle;
    }
  }, {
    key: 'pathStyle',
    get: function get() {
      var _props4 = this.props,
          isStarred = _props4.isStarred,
          isPartiallyFullStar = _props4.isPartiallyFullStar,
          isHovered = _props4.isHovered,
          hoverMode = _props4.hoverMode,
          starEmptyColor = _props4.starEmptyColor,
          starRatedColor = _props4.starRatedColor,
          starHoverColor = _props4.starHoverColor,
          gradientPathName = _props4.gradientPathName,
          fillId = _props4.fillId,
          ignoreInlineStyles = _props4.ignoreInlineStyles;


      var fill = void 0;
      if (hoverMode) {
        if (isHovered) fill = starHoverColor;else fill = starEmptyColor;
      } else {
        if (isPartiallyFullStar) fill = 'url(\'' + gradientPathName + '#' + fillId + '\')';else if (isStarred) fill = starRatedColor;else fill = starEmptyColor;
      }

      var pathStyle = {
        fill: fill,
        transition: 'fill .2s ease-in-out'
      };

      return ignoreInlineStyles ? {} : pathStyle;
    }
  }, {
    key: 'starClasses',
    get: function get() {
      var _props5 = this.props,
          isSelected = _props5.isSelected,
          isPartiallyFullStar = _props5.isPartiallyFullStar,
          isHovered = _props5.isHovered,
          isCurrentHoveredStar = _props5.isCurrentHoveredStar,
          ignoreInlineStyles = _props5.ignoreInlineStyles;


      var starClasses = (0, _classnames2.default)({
        'widget-svg': true,
        'widget-selected': isSelected,
        'multi-widget-selected': isPartiallyFullStar,
        'hovered': isHovered,
        'current-hovered': isCurrentHoveredStar
      });

      return ignoreInlineStyles ? {} : starClasses;
    }
  }]);

  return Star;
}(_react2.default.Component);

Star.propTypes = {
  fillId: _propTypes2.default.string.isRequired,
  changeRating: _propTypes2.default.func,
  hoverOverStar: _propTypes2.default.func,
  unHoverOverStar: _propTypes2.default.func,
  isStarred: _propTypes2.default.bool.isRequired,
  isPartiallyFullStar: _propTypes2.default.bool.isRequired,
  isHovered: _propTypes2.default.bool.isRequired,
  hoverMode: _propTypes2.default.bool.isRequired,
  isCurrentHoveredStar: _propTypes2.default.bool.isRequired,
  isFirstStar: _propTypes2.default.bool.isRequired,
  isLastStar: _propTypes2.default.bool.isRequired,
  starDimension: _propTypes2.default.string.isRequired,
  starSpacing: _propTypes2.default.string.isRequired,
  starHoverColor: _propTypes2.default.string.isRequired,
  starRatedColor: _propTypes2.default.string.isRequired,
  starEmptyColor: _propTypes2.default.string.isRequired,
  gradientPathName: _propTypes2.default.string.isRequired,
  ignoreInlineStyles: _propTypes2.default.bool.isRequired,
  svgIconPath: _propTypes2.default.string.isRequired,
  svgIconViewBox: _propTypes2.default.string.isRequired
};

exports["default"] = Star;

/***/ }),

/***/ "./node_modules/react/cjs/react-jsx-runtime.development.js":
/*!*****************************************************************!*\
  !*** ./node_modules/react/cjs/react-jsx-runtime.development.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (true) {
  (function() {
'use strict';

var React = __webpack_require__(/*! react */ "react");

// ATTENTION
// When adding new symbols to this file,
// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
// The Symbol used to tag the ReactElement-like types.
var REACT_ELEMENT_TYPE = Symbol.for('react.element');
var REACT_PORTAL_TYPE = Symbol.for('react.portal');
var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
var REACT_PROVIDER_TYPE = Symbol.for('react.provider');
var REACT_CONTEXT_TYPE = Symbol.for('react.context');
var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
var REACT_MEMO_TYPE = Symbol.for('react.memo');
var REACT_LAZY_TYPE = Symbol.for('react.lazy');
var REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');
var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';
function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable !== 'object') {
    return null;
  }

  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }

  return null;
}

var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

function error(format) {
  {
    {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      printWarning('error', format, args);
    }
  }
}

function printWarning(level, format, args) {
  // When changing this logic, you might want to also
  // update consoleWithStackDev.www.js as well.
  {
    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
    var stack = ReactDebugCurrentFrame.getStackAddendum();

    if (stack !== '') {
      format += '%s';
      args = args.concat([stack]);
    } // eslint-disable-next-line react-internal/safe-string-coercion


    var argsWithFormat = args.map(function (item) {
      return String(item);
    }); // Careful: RN currently depends on this prefix

    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
    // breaks IE9: https://github.com/facebook/react/issues/13610
    // eslint-disable-next-line react-internal/no-production-logging

    Function.prototype.apply.call(console[level], console, argsWithFormat);
  }
}

// -----------------------------------------------------------------------------

var enableScopeAPI = false; // Experimental Create Event Handle API.
var enableCacheElement = false;
var enableTransitionTracing = false; // No known bugs, but needs performance testing

var enableLegacyHidden = false; // Enables unstable_avoidThisFallback feature in Fiber
// stuff. Intended to enable React core members to more easily debug scheduling
// issues in DEV builds.

var enableDebugTracing = false; // Track which Fiber(s) schedule render work.

var REACT_MODULE_REFERENCE;

{
  REACT_MODULE_REFERENCE = Symbol.for('react.module.reference');
}

function isValidElementType(type) {
  if (typeof type === 'string' || typeof type === 'function') {
    return true;
  } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


  if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing  || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden  || type === REACT_OFFSCREEN_TYPE || enableScopeAPI  || enableCacheElement  || enableTransitionTracing ) {
    return true;
  }

  if (typeof type === 'object' && type !== null) {
    if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
    // types supported by any Flight configuration anywhere since
    // we don't know which Flight build this will end up being used
    // with.
    type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== undefined) {
      return true;
    }
  }

  return false;
}

function getWrappedName(outerType, innerType, wrapperName) {
  var displayName = outerType.displayName;

  if (displayName) {
    return displayName;
  }

  var functionName = innerType.displayName || innerType.name || '';
  return functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName;
} // Keep in sync with react-reconciler/getComponentNameFromFiber


function getContextName(type) {
  return type.displayName || 'Context';
} // Note that the reconciler package should generally prefer to use getComponentNameFromFiber() instead.


function getComponentNameFromType(type) {
  if (type == null) {
    // Host root, text node or just invalid type.
    return null;
  }

  {
    if (typeof type.tag === 'number') {
      error('Received an unexpected object in getComponentNameFromType(). ' + 'This is likely a bug in React. Please file an issue.');
    }
  }

  if (typeof type === 'function') {
    return type.displayName || type.name || null;
  }

  if (typeof type === 'string') {
    return type;
  }

  switch (type) {
    case REACT_FRAGMENT_TYPE:
      return 'Fragment';

    case REACT_PORTAL_TYPE:
      return 'Portal';

    case REACT_PROFILER_TYPE:
      return 'Profiler';

    case REACT_STRICT_MODE_TYPE:
      return 'StrictMode';

    case REACT_SUSPENSE_TYPE:
      return 'Suspense';

    case REACT_SUSPENSE_LIST_TYPE:
      return 'SuspenseList';

  }

  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        var context = type;
        return getContextName(context) + '.Consumer';

      case REACT_PROVIDER_TYPE:
        var provider = type;
        return getContextName(provider._context) + '.Provider';

      case REACT_FORWARD_REF_TYPE:
        return getWrappedName(type, type.render, 'ForwardRef');

      case REACT_MEMO_TYPE:
        var outerName = type.displayName || null;

        if (outerName !== null) {
          return outerName;
        }

        return getComponentNameFromType(type.type) || 'Memo';

      case REACT_LAZY_TYPE:
        {
          var lazyComponent = type;
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;

          try {
            return getComponentNameFromType(init(payload));
          } catch (x) {
            return null;
          }
        }

      // eslint-disable-next-line no-fallthrough
    }
  }

  return null;
}

var assign = Object.assign;

// Helpers to patch console.logs to avoid logging during side-effect free
// replaying on render function. This currently only patches the object
// lazily which won't cover if the log function was extracted eagerly.
// We could also eagerly patch the method.
var disabledDepth = 0;
var prevLog;
var prevInfo;
var prevWarn;
var prevError;
var prevGroup;
var prevGroupCollapsed;
var prevGroupEnd;

function disabledLog() {}

disabledLog.__reactDisabledLog = true;
function disableLogs() {
  {
    if (disabledDepth === 0) {
      /* eslint-disable react-internal/no-production-logging */
      prevLog = console.log;
      prevInfo = console.info;
      prevWarn = console.warn;
      prevError = console.error;
      prevGroup = console.group;
      prevGroupCollapsed = console.groupCollapsed;
      prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

      var props = {
        configurable: true,
        enumerable: true,
        value: disabledLog,
        writable: true
      }; // $FlowFixMe Flow thinks console is immutable.

      Object.defineProperties(console, {
        info: props,
        log: props,
        warn: props,
        error: props,
        group: props,
        groupCollapsed: props,
        groupEnd: props
      });
      /* eslint-enable react-internal/no-production-logging */
    }

    disabledDepth++;
  }
}
function reenableLogs() {
  {
    disabledDepth--;

    if (disabledDepth === 0) {
      /* eslint-disable react-internal/no-production-logging */
      var props = {
        configurable: true,
        enumerable: true,
        writable: true
      }; // $FlowFixMe Flow thinks console is immutable.

      Object.defineProperties(console, {
        log: assign({}, props, {
          value: prevLog
        }),
        info: assign({}, props, {
          value: prevInfo
        }),
        warn: assign({}, props, {
          value: prevWarn
        }),
        error: assign({}, props, {
          value: prevError
        }),
        group: assign({}, props, {
          value: prevGroup
        }),
        groupCollapsed: assign({}, props, {
          value: prevGroupCollapsed
        }),
        groupEnd: assign({}, props, {
          value: prevGroupEnd
        })
      });
      /* eslint-enable react-internal/no-production-logging */
    }

    if (disabledDepth < 0) {
      error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
    }
  }
}

var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
var prefix;
function describeBuiltInComponentFrame(name, source, ownerFn) {
  {
    if (prefix === undefined) {
      // Extract the VM specific prefix used by each line.
      try {
        throw Error();
      } catch (x) {
        var match = x.stack.trim().match(/\n( *(at )?)/);
        prefix = match && match[1] || '';
      }
    } // We use the prefix to ensure our stacks line up with native stack frames.


    return '\n' + prefix + name;
  }
}
var reentry = false;
var componentFrameCache;

{
  var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
  componentFrameCache = new PossiblyWeakMap();
}

function describeNativeComponentFrame(fn, construct) {
  // If something asked for a stack inside a fake render, it should get ignored.
  if ( !fn || reentry) {
    return '';
  }

  {
    var frame = componentFrameCache.get(fn);

    if (frame !== undefined) {
      return frame;
    }
  }

  var control;
  reentry = true;
  var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

  Error.prepareStackTrace = undefined;
  var previousDispatcher;

  {
    previousDispatcher = ReactCurrentDispatcher.current; // Set the dispatcher in DEV because this might be call in the render function
    // for warnings.

    ReactCurrentDispatcher.current = null;
    disableLogs();
  }

  try {
    // This should throw.
    if (construct) {
      // Something should be setting the props in the constructor.
      var Fake = function () {
        throw Error();
      }; // $FlowFixMe


      Object.defineProperty(Fake.prototype, 'props', {
        set: function () {
          // We use a throwing setter instead of frozen or non-writable props
          // because that won't throw in a non-strict mode function.
          throw Error();
        }
      });

      if (typeof Reflect === 'object' && Reflect.construct) {
        // We construct a different control for this case to include any extra
        // frames added by the construct call.
        try {
          Reflect.construct(Fake, []);
        } catch (x) {
          control = x;
        }

        Reflect.construct(fn, [], Fake);
      } else {
        try {
          Fake.call();
        } catch (x) {
          control = x;
        }

        fn.call(Fake.prototype);
      }
    } else {
      try {
        throw Error();
      } catch (x) {
        control = x;
      }

      fn();
    }
  } catch (sample) {
    // This is inlined manually because closure doesn't do it for us.
    if (sample && control && typeof sample.stack === 'string') {
      // This extracts the first frame from the sample that isn't also in the control.
      // Skipping one frame that we assume is the frame that calls the two.
      var sampleLines = sample.stack.split('\n');
      var controlLines = control.stack.split('\n');
      var s = sampleLines.length - 1;
      var c = controlLines.length - 1;

      while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
        // We expect at least one stack frame to be shared.
        // Typically this will be the root most one. However, stack frames may be
        // cut off due to maximum stack limits. In this case, one maybe cut off
        // earlier than the other. We assume that the sample is longer or the same
        // and there for cut off earlier. So we should find the root most frame in
        // the sample somewhere in the control.
        c--;
      }

      for (; s >= 1 && c >= 0; s--, c--) {
        // Next we find the first one that isn't the same which should be the
        // frame that called our sample function and the control.
        if (sampleLines[s] !== controlLines[c]) {
          // In V8, the first line is describing the message but other VMs don't.
          // If we're about to return the first line, and the control is also on the same
          // line, that's a pretty good indicator that our sample threw at same line as
          // the control. I.e. before we entered the sample frame. So we ignore this result.
          // This can happen if you passed a class to function component, or non-function.
          if (s !== 1 || c !== 1) {
            do {
              s--;
              c--; // We may still have similar intermediate frames from the construct call.
              // The next one that isn't the same should be our match though.

              if (c < 0 || sampleLines[s] !== controlLines[c]) {
                // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
                var _frame = '\n' + sampleLines[s].replace(' at new ', ' at '); // If our component frame is labeled "<anonymous>"
                // but we have a user-provided "displayName"
                // splice it in to make the stack more readable.


                if (fn.displayName && _frame.includes('<anonymous>')) {
                  _frame = _frame.replace('<anonymous>', fn.displayName);
                }

                {
                  if (typeof fn === 'function') {
                    componentFrameCache.set(fn, _frame);
                  }
                } // Return the line we found.


                return _frame;
              }
            } while (s >= 1 && c >= 0);
          }

          break;
        }
      }
    }
  } finally {
    reentry = false;

    {
      ReactCurrentDispatcher.current = previousDispatcher;
      reenableLogs();
    }

    Error.prepareStackTrace = previousPrepareStackTrace;
  } // Fallback to just using the name if we couldn't make it throw.


  var name = fn ? fn.displayName || fn.name : '';
  var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';

  {
    if (typeof fn === 'function') {
      componentFrameCache.set(fn, syntheticFrame);
    }
  }

  return syntheticFrame;
}
function describeFunctionComponentFrame(fn, source, ownerFn) {
  {
    return describeNativeComponentFrame(fn, false);
  }
}

function shouldConstruct(Component) {
  var prototype = Component.prototype;
  return !!(prototype && prototype.isReactComponent);
}

function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {

  if (type == null) {
    return '';
  }

  if (typeof type === 'function') {
    {
      return describeNativeComponentFrame(type, shouldConstruct(type));
    }
  }

  if (typeof type === 'string') {
    return describeBuiltInComponentFrame(type);
  }

  switch (type) {
    case REACT_SUSPENSE_TYPE:
      return describeBuiltInComponentFrame('Suspense');

    case REACT_SUSPENSE_LIST_TYPE:
      return describeBuiltInComponentFrame('SuspenseList');
  }

  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_FORWARD_REF_TYPE:
        return describeFunctionComponentFrame(type.render);

      case REACT_MEMO_TYPE:
        // Memo may contain any component type so we recursively resolve it.
        return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);

      case REACT_LAZY_TYPE:
        {
          var lazyComponent = type;
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;

          try {
            // Lazy may contain any component type so we recursively resolve it.
            return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
          } catch (x) {}
        }
    }
  }

  return '';
}

var hasOwnProperty = Object.prototype.hasOwnProperty;

var loggedTypeFailures = {};
var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;

function setCurrentlyValidatingElement(element) {
  {
    if (element) {
      var owner = element._owner;
      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
      ReactDebugCurrentFrame.setExtraStackFrame(stack);
    } else {
      ReactDebugCurrentFrame.setExtraStackFrame(null);
    }
  }
}

function checkPropTypes(typeSpecs, values, location, componentName, element) {
  {
    // $FlowFixMe This is okay but Flow doesn't know it.
    var has = Function.call.bind(hasOwnProperty);

    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.

        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            // eslint-disable-next-line react-internal/prod-error-codes
            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
            err.name = 'Invariant Violation';
            throw err;
          }

          error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
        } catch (ex) {
          error$1 = ex;
        }

        if (error$1 && !(error$1 instanceof Error)) {
          setCurrentlyValidatingElement(element);

          error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);

          setCurrentlyValidatingElement(null);
        }

        if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error$1.message] = true;
          setCurrentlyValidatingElement(element);

          error('Failed %s type: %s', location, error$1.message);

          setCurrentlyValidatingElement(null);
        }
      }
    }
  }
}

var isArrayImpl = Array.isArray; // eslint-disable-next-line no-redeclare

function isArray(a) {
  return isArrayImpl(a);
}

/*
 * The `'' + value` pattern (used in in perf-sensitive code) throws for Symbol
 * and Temporal.* types. See https://github.com/facebook/react/pull/22064.
 *
 * The functions in this module will throw an easier-to-understand,
 * easier-to-debug exception with a clear errors message message explaining the
 * problem. (Instead of a confusing exception thrown inside the implementation
 * of the `value` object).
 */
// $FlowFixMe only called in DEV, so void return is not possible.
function typeName(value) {
  {
    // toStringTag is needed for namespaced types like Temporal.Instant
    var hasToStringTag = typeof Symbol === 'function' && Symbol.toStringTag;
    var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || 'Object';
    return type;
  }
} // $FlowFixMe only called in DEV, so void return is not possible.


function willCoercionThrow(value) {
  {
    try {
      testStringCoercion(value);
      return false;
    } catch (e) {
      return true;
    }
  }
}

function testStringCoercion(value) {
  // If you ended up here by following an exception call stack, here's what's
  // happened: you supplied an object or symbol value to React (as a prop, key,
  // DOM attribute, CSS property, string ref, etc.) and when React tried to
  // coerce it to a string using `'' + value`, an exception was thrown.
  //
  // The most common types that will cause this exception are `Symbol` instances
  // and Temporal objects like `Temporal.Instant`. But any object that has a
  // `valueOf` or `[Symbol.toPrimitive]` method that throws will also cause this
  // exception. (Library authors do this to prevent users from using built-in
  // numeric operators like `+` or comparison operators like `>=` because custom
  // methods are needed to perform accurate arithmetic or comparison.)
  //
  // To fix the problem, coerce this object or symbol value to a string before
  // passing it to React. The most reliable way is usually `String(value)`.
  //
  // To find which value is throwing, check the browser or debugger console.
  // Before this exception was thrown, there should be `console.error` output
  // that shows the type (Symbol, Temporal.PlainDate, etc.) that caused the
  // problem and how that type was used: key, atrribute, input value prop, etc.
  // In most cases, this console output also shows the component and its
  // ancestor components where the exception happened.
  //
  // eslint-disable-next-line react-internal/safe-string-coercion
  return '' + value;
}
function checkKeyStringCoercion(value) {
  {
    if (willCoercionThrow(value)) {
      error('The provided key is an unsupported type %s.' + ' This value must be coerced to a string before before using it here.', typeName(value));

      return testStringCoercion(value); // throw (to help callers find troubleshooting comments)
    }
  }
}

var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};
var specialPropKeyWarningShown;
var specialPropRefWarningShown;
var didWarnAboutStringRefs;

{
  didWarnAboutStringRefs = {};
}

function hasValidRef(config) {
  {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }

  return config.ref !== undefined;
}

function hasValidKey(config) {
  {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }

  return config.key !== undefined;
}

function warnIfStringRefCannotBeAutoConverted(config, self) {
  {
    if (typeof config.ref === 'string' && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
      var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);

      if (!didWarnAboutStringRefs[componentName]) {
        error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://reactjs.org/link/strict-mode-string-ref', getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);

        didWarnAboutStringRefs[componentName] = true;
      }
    }
  }
}

function defineKeyPropWarningGetter(props, displayName) {
  {
    var warnAboutAccessingKey = function () {
      if (!specialPropKeyWarningShown) {
        specialPropKeyWarningShown = true;

        error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
      }
    };

    warnAboutAccessingKey.isReactWarning = true;
    Object.defineProperty(props, 'key', {
      get: warnAboutAccessingKey,
      configurable: true
    });
  }
}

function defineRefPropWarningGetter(props, displayName) {
  {
    var warnAboutAccessingRef = function () {
      if (!specialPropRefWarningShown) {
        specialPropRefWarningShown = true;

        error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
      }
    };

    warnAboutAccessingRef.isReactWarning = true;
    Object.defineProperty(props, 'ref', {
      get: warnAboutAccessingRef,
      configurable: true
    });
  }
}
/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, instanceof check
 * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} props
 * @param {*} key
 * @param {string|object} ref
 * @param {*} owner
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @internal
 */


var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,
    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,
    // Record the component responsible for creating this element.
    _owner: owner
  };

  {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.

    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    }); // self and source are DEV only properties.

    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    }); // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.

    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source
    });

    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};
/**
 * https://github.com/reactjs/rfcs/pull/107
 * @param {*} type
 * @param {object} props
 * @param {string} key
 */

function jsxDEV(type, config, maybeKey, source, self) {
  {
    var propName; // Reserved names are extracted

    var props = {};
    var key = null;
    var ref = null; // Currently, key can be spread in as a prop. This causes a potential
    // issue if key is also explicitly declared (ie. <div {...props} key="Hi" />
    // or <div key="Hi" {...props} /> ). We want to deprecate key spread,
    // but as an intermediary step, we will use jsxDEV for everything except
    // <div {...props} key="Hi" />, because we aren't currently able to tell if
    // key is explicitly declared to be undefined or not.

    if (maybeKey !== undefined) {
      {
        checkKeyStringCoercion(maybeKey);
      }

      key = '' + maybeKey;
    }

    if (hasValidKey(config)) {
      {
        checkKeyStringCoercion(config.key);
      }

      key = '' + config.key;
    }

    if (hasValidRef(config)) {
      ref = config.ref;
      warnIfStringRefCannotBeAutoConverted(config, self);
    } // Remaining properties are added to a new props object


    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    } // Resolve default props


    if (type && type.defaultProps) {
      var defaultProps = type.defaultProps;

      for (propName in defaultProps) {
        if (props[propName] === undefined) {
          props[propName] = defaultProps[propName];
        }
      }
    }

    if (key || ref) {
      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

      if (key) {
        defineKeyPropWarningGetter(props, displayName);
      }

      if (ref) {
        defineRefPropWarningGetter(props, displayName);
      }
    }

    return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
  }
}

var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;

function setCurrentlyValidatingElement$1(element) {
  {
    if (element) {
      var owner = element._owner;
      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
      ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
    } else {
      ReactDebugCurrentFrame$1.setExtraStackFrame(null);
    }
  }
}

var propTypesMisspellWarningShown;

{
  propTypesMisspellWarningShown = false;
}
/**
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a ReactElement.
 * @final
 */


function isValidElement(object) {
  {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  }
}

function getDeclarationErrorAddendum() {
  {
    if (ReactCurrentOwner$1.current) {
      var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);

      if (name) {
        return '\n\nCheck the render method of `' + name + '`.';
      }
    }

    return '';
  }
}

function getSourceInfoErrorAddendum(source) {
  {
    if (source !== undefined) {
      var fileName = source.fileName.replace(/^.*[\\\/]/, '');
      var lineNumber = source.lineNumber;
      return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
    }

    return '';
  }
}
/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */


var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  {
    var info = getDeclarationErrorAddendum();

    if (!info) {
      var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

      if (parentName) {
        info = "\n\nCheck the top-level render call using <" + parentName + ">.";
      }
    }

    return info;
  }
}
/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */


function validateExplicitKey(element, parentType) {
  {
    if (!element._store || element._store.validated || element.key != null) {
      return;
    }

    element._store.validated = true;
    var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

    if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
      return;
    }

    ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
    // property, it may be the creator of the child that's responsible for
    // assigning it a key.

    var childOwner = '';

    if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
      // Give the component that originally created this child.
      childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
    }

    setCurrentlyValidatingElement$1(element);

    error('Each child in a list should have a unique "key" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);

    setCurrentlyValidatingElement$1(null);
  }
}
/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */


function validateChildKeys(node, parentType) {
  {
    if (typeof node !== 'object') {
      return;
    }

    if (isArray(node)) {
      for (var i = 0; i < node.length; i++) {
        var child = node[i];

        if (isValidElement(child)) {
          validateExplicitKey(child, parentType);
        }
      }
    } else if (isValidElement(node)) {
      // This element was passed in a valid location.
      if (node._store) {
        node._store.validated = true;
      }
    } else if (node) {
      var iteratorFn = getIteratorFn(node);

      if (typeof iteratorFn === 'function') {
        // Entry iterators used to provide implicit keys,
        // but now we print a separate warning for them later.
        if (iteratorFn !== node.entries) {
          var iterator = iteratorFn.call(node);
          var step;

          while (!(step = iterator.next()).done) {
            if (isValidElement(step.value)) {
              validateExplicitKey(step.value, parentType);
            }
          }
        }
      }
    }
  }
}
/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */


function validatePropTypes(element) {
  {
    var type = element.type;

    if (type === null || type === undefined || typeof type === 'string') {
      return;
    }

    var propTypes;

    if (typeof type === 'function') {
      propTypes = type.propTypes;
    } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
    // Inner props are checked in the reconciler.
    type.$$typeof === REACT_MEMO_TYPE)) {
      propTypes = type.propTypes;
    } else {
      return;
    }

    if (propTypes) {
      // Intentionally inside to avoid triggering lazy initializers:
      var name = getComponentNameFromType(type);
      checkPropTypes(propTypes, element.props, 'prop', name, element);
    } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
      propTypesMisspellWarningShown = true; // Intentionally inside to avoid triggering lazy initializers:

      var _name = getComponentNameFromType(type);

      error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');
    }

    if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
      error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
    }
  }
}
/**
 * Given a fragment, validate that it can only be provided with fragment props
 * @param {ReactElement} fragment
 */


function validateFragmentProps(fragment) {
  {
    var keys = Object.keys(fragment.props);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];

      if (key !== 'children' && key !== 'key') {
        setCurrentlyValidatingElement$1(fragment);

        error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);

        setCurrentlyValidatingElement$1(null);
        break;
      }
    }

    if (fragment.ref !== null) {
      setCurrentlyValidatingElement$1(fragment);

      error('Invalid attribute `ref` supplied to `React.Fragment`.');

      setCurrentlyValidatingElement$1(null);
    }
  }
}

function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
  {
    var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
    // succeed and there will likely be errors in render.

    if (!validType) {
      var info = '';

      if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
        info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
      }

      var sourceInfo = getSourceInfoErrorAddendum(source);

      if (sourceInfo) {
        info += sourceInfo;
      } else {
        info += getDeclarationErrorAddendum();
      }

      var typeString;

      if (type === null) {
        typeString = 'null';
      } else if (isArray(type)) {
        typeString = 'array';
      } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
        typeString = "<" + (getComponentNameFromType(type.type) || 'Unknown') + " />";
        info = ' Did you accidentally export a JSX literal instead of a component?';
      } else {
        typeString = typeof type;
      }

      error('React.jsx: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
    }

    var element = jsxDEV(type, props, key, source, self); // The result can be nullish if a mock or a custom function is used.
    // TODO: Drop this when these are no longer allowed as the type argument.

    if (element == null) {
      return element;
    } // Skip key warning if the type isn't valid since our key validation logic
    // doesn't expect a non-string/function type and can throw confusing errors.
    // We don't want exception behavior to differ between dev and prod.
    // (Rendering will throw with a helpful message and as soon as the type is
    // fixed, the key warnings will appear.)


    if (validType) {
      var children = props.children;

      if (children !== undefined) {
        if (isStaticChildren) {
          if (isArray(children)) {
            for (var i = 0; i < children.length; i++) {
              validateChildKeys(children[i], type);
            }

            if (Object.freeze) {
              Object.freeze(children);
            }
          } else {
            error('React.jsx: Static children should always be an array. ' + 'You are likely explicitly calling React.jsxs or React.jsxDEV. ' + 'Use the Babel transform instead.');
          }
        } else {
          validateChildKeys(children, type);
        }
      }
    }

    if (type === REACT_FRAGMENT_TYPE) {
      validateFragmentProps(element);
    } else {
      validatePropTypes(element);
    }

    return element;
  }
} // These two functions exist to still get child warnings in dev
// even with the prod transform. This means that jsxDEV is purely
// opt-in behavior for better messages but that we won't stop
// giving you warnings if you use production apis.

function jsxWithValidationStatic(type, props, key) {
  {
    return jsxWithValidation(type, props, key, true);
  }
}
function jsxWithValidationDynamic(type, props, key) {
  {
    return jsxWithValidation(type, props, key, false);
  }
}

var jsx =  jsxWithValidationDynamic ; // we may want to special case jsxs internally to take advantage of static children.
// for now we can ship identical prod functions

var jsxs =  jsxWithValidationStatic ;

exports.Fragment = REACT_FRAGMENT_TYPE;
exports.jsx = jsx;
exports.jsxs = jsxs;
  })();
}


/***/ }),

/***/ "./node_modules/react/jsx-runtime.js":
/*!*******************************************!*\
  !*** ./node_modules/react/jsx-runtime.js ***!
  \*******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-jsx-runtime.development.js */ "./node_modules/react/cjs/react-jsx-runtime.development.js");
}


/***/ }),

/***/ "./node_modules/rgb2hex/index.js":
/*!***************************************!*\
  !*** ./node_modules/rgb2hex/index.js ***!
  \***************************************/
/***/ (function(module) {

/**
 * rgb2hex
 *
 * @author Christian Bromann <mail@christian-bromann.com>
 * @description converts rgba color to HEX
 *
 * @param  {String} color  rgb or rgba color
 * @return {Object}        object with hex and alpha value
 */

var rgb2hex = module.exports = function rgb2hex(color) {
    if(typeof color !== 'string') {
        // throw error of input isn't typeof string
        throw new Error('color has to be type of `string`');
    } else if (color.substr(0, 1) === '#') {
        // or return if already rgb color
        return {
            hex: color,
            alpha: 1
        };
    }

    /**
     * strip spaces
     */
    var strippedColor = color.replace(/\s+/g,'');

    /**
     * parse input
     */
    var digits = /(.*?)rgb(a)??\((\d{1,3}),(\d{1,3}),(\d{1,3})(,([01]|1.0*|0??\.([0-9]{0,})))??\)/.exec(strippedColor);

    if(!digits) {
        // or throw error if input isn't a valid rgb(a) color
        throw new Error('given color (' + color + ') isn\'t a valid rgb or rgba color');
    }

    var red = parseInt(digits[3], 10);
    var green = parseInt(digits[4], 10);
    var blue = parseInt(digits[5], 10);
    var alpha = digits[6] ? /([0-9\.]+)/.exec(digits[6])[0] : '1';
    var rgb = ((blue | green << 8 | red << 16) | 1 << 24).toString(16).slice(1);

    // parse alpha value into float
    if(alpha.substr(0,1) === '.') {
        alpha = parseFloat('0' + alpha);
    }

    // cut alpha value after 2 digits after comma
    alpha = parseFloat(Math.round(alpha * 100)) / 100;

    return {
        hex: '#' + rgb.toString(16),
        alpha: alpha
    };
};


/***/ }),

/***/ "./node_modules/validator/lib/alpha.js":
/*!*********************************************!*\
  !*** ./node_modules/validator/lib/alpha.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.commaDecimal = exports.dotDecimal = exports.bengaliLocales = exports.farsiLocales = exports.arabicLocales = exports.englishLocales = exports.decimal = exports.alphanumeric = exports.alpha = void 0;
var alpha = {
  'en-US': /^[A-Z]+$/i,
  'az-AZ': /^[A-VXYZÇƏĞİıÖŞÜ]+$/i,
  'bg-BG': /^[А-Я]+$/i,
  'cs-CZ': /^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,
  'da-DK': /^[A-ZÆØÅ]+$/i,
  'de-DE': /^[A-ZÄÖÜß]+$/i,
  'el-GR': /^[Α-ώ]+$/i,
  'es-ES': /^[A-ZÁÉÍÑÓÚÜ]+$/i,
  'fa-IR': /^[ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی]+$/i,
  'fi-FI': /^[A-ZÅÄÖ]+$/i,
  'fr-FR': /^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,
  'it-IT': /^[A-ZÀÉÈÌÎÓÒÙ]+$/i,
  'ja-JP': /^[ぁ-んァ-ヶｦ-ﾟ一-龠ー・。、]+$/i,
  'nb-NO': /^[A-ZÆØÅ]+$/i,
  'nl-NL': /^[A-ZÁÉËÏÓÖÜÚ]+$/i,
  'nn-NO': /^[A-ZÆØÅ]+$/i,
  'hu-HU': /^[A-ZÁÉÍÓÖŐÚÜŰ]+$/i,
  'pl-PL': /^[A-ZĄĆĘŚŁŃÓŻŹ]+$/i,
  'pt-PT': /^[A-ZÃÁÀÂÄÇÉÊËÍÏÕÓÔÖÚÜ]+$/i,
  'ru-RU': /^[А-ЯЁ]+$/i,
  'kk-KZ': /^[А-ЯЁ\u04D8\u04B0\u0406\u04A2\u0492\u04AE\u049A\u04E8\u04BA]+$/i,
  'sl-SI': /^[A-ZČĆĐŠŽ]+$/i,
  'sk-SK': /^[A-ZÁČĎÉÍŇÓŠŤÚÝŽĹŔĽÄÔ]+$/i,
  'sr-RS@latin': /^[A-ZČĆŽŠĐ]+$/i,
  'sr-RS': /^[А-ЯЂЈЉЊЋЏ]+$/i,
  'sv-SE': /^[A-ZÅÄÖ]+$/i,
  'th-TH': /^[ก-๐\s]+$/i,
  'tr-TR': /^[A-ZÇĞİıÖŞÜ]+$/i,
  'uk-UA': /^[А-ЩЬЮЯЄIЇҐі]+$/i,
  'vi-VN': /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴĐÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸ]+$/i,
  'ko-KR': /^[ㄱ-ㅎㅏ-ㅣ가-힣]*$/,
  'ku-IQ': /^[ئابپتجچحخدرڕزژسشعغفڤقکگلڵمنوۆھەیێيطؤثآإأكضصةظذ]+$/i,
  ar: /^[ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/,
  he: /^[א-ת]+$/,
  fa: /^['آاءأؤئبپتثجچحخدذرزژسشصضطظعغفقکگلمنوهةی']+$/i,
  bn: /^['ঀঁংঃঅআইঈউঊঋঌএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহ়ঽািীুূৃৄেৈোৌ্ৎৗড়ঢ়য়ৠৡৢৣৰৱ৲৳৴৵৶৷৸৹৺৻']+$/,
  'hi-IN': /^[\u0900-\u0961]+[\u0972-\u097F]*$/i,
  'si-LK': /^[\u0D80-\u0DFF]+$/
};
exports.alpha = alpha;
var alphanumeric = {
  'en-US': /^[0-9A-Z]+$/i,
  'az-AZ': /^[0-9A-VXYZÇƏĞİıÖŞÜ]+$/i,
  'bg-BG': /^[0-9А-Я]+$/i,
  'cs-CZ': /^[0-9A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,
  'da-DK': /^[0-9A-ZÆØÅ]+$/i,
  'de-DE': /^[0-9A-ZÄÖÜß]+$/i,
  'el-GR': /^[0-9Α-ω]+$/i,
  'es-ES': /^[0-9A-ZÁÉÍÑÓÚÜ]+$/i,
  'fi-FI': /^[0-9A-ZÅÄÖ]+$/i,
  'fr-FR': /^[0-9A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,
  'it-IT': /^[0-9A-ZÀÉÈÌÎÓÒÙ]+$/i,
  'ja-JP': /^[0-9０-９ぁ-んァ-ヶｦ-ﾟ一-龠ー・。、]+$/i,
  'hu-HU': /^[0-9A-ZÁÉÍÓÖŐÚÜŰ]+$/i,
  'nb-NO': /^[0-9A-ZÆØÅ]+$/i,
  'nl-NL': /^[0-9A-ZÁÉËÏÓÖÜÚ]+$/i,
  'nn-NO': /^[0-9A-ZÆØÅ]+$/i,
  'pl-PL': /^[0-9A-ZĄĆĘŚŁŃÓŻŹ]+$/i,
  'pt-PT': /^[0-9A-ZÃÁÀÂÄÇÉÊËÍÏÕÓÔÖÚÜ]+$/i,
  'ru-RU': /^[0-9А-ЯЁ]+$/i,
  'kk-KZ': /^[0-9А-ЯЁ\u04D8\u04B0\u0406\u04A2\u0492\u04AE\u049A\u04E8\u04BA]+$/i,
  'sl-SI': /^[0-9A-ZČĆĐŠŽ]+$/i,
  'sk-SK': /^[0-9A-ZÁČĎÉÍŇÓŠŤÚÝŽĹŔĽÄÔ]+$/i,
  'sr-RS@latin': /^[0-9A-ZČĆŽŠĐ]+$/i,
  'sr-RS': /^[0-9А-ЯЂЈЉЊЋЏ]+$/i,
  'sv-SE': /^[0-9A-ZÅÄÖ]+$/i,
  'th-TH': /^[ก-๙\s]+$/i,
  'tr-TR': /^[0-9A-ZÇĞİıÖŞÜ]+$/i,
  'uk-UA': /^[0-9А-ЩЬЮЯЄIЇҐі]+$/i,
  'ko-KR': /^[0-9ㄱ-ㅎㅏ-ㅣ가-힣]*$/,
  'ku-IQ': /^[٠١٢٣٤٥٦٧٨٩0-9ئابپتجچحخدرڕزژسشعغفڤقکگلڵمنوۆھەیێيطؤثآإأكضصةظذ]+$/i,
  'vi-VN': /^[0-9A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴĐÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸ]+$/i,
  ar: /^[٠١٢٣٤٥٦٧٨٩0-9ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/,
  he: /^[0-9א-ת]+$/,
  fa: /^['0-9آاءأؤئبپتثجچحخدذرزژسشصضطظعغفقکگلمنوهةی۱۲۳۴۵۶۷۸۹۰']+$/i,
  bn: /^['ঀঁংঃঅআইঈউঊঋঌএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহ়ঽািীুূৃৄেৈোৌ্ৎৗড়ঢ়য়ৠৡৢৣ০১২৩৪৫৬৭৮৯ৰৱ৲৳৴৵৶৷৸৹৺৻']+$/,
  'hi-IN': /^[\u0900-\u0963]+[\u0966-\u097F]*$/i,
  'si-LK': /^[0-9\u0D80-\u0DFF]+$/
};
exports.alphanumeric = alphanumeric;
var decimal = {
  'en-US': '.',
  ar: '٫'
};
exports.decimal = decimal;
var englishLocales = ['AU', 'GB', 'HK', 'IN', 'NZ', 'ZA', 'ZM'];
exports.englishLocales = englishLocales;

for (var locale, i = 0; i < englishLocales.length; i++) {
  locale = "en-".concat(englishLocales[i]);
  alpha[locale] = alpha['en-US'];
  alphanumeric[locale] = alphanumeric['en-US'];
  decimal[locale] = decimal['en-US'];
} // Source: http://www.localeplanet.com/java/


var arabicLocales = ['AE', 'BH', 'DZ', 'EG', 'IQ', 'JO', 'KW', 'LB', 'LY', 'MA', 'QM', 'QA', 'SA', 'SD', 'SY', 'TN', 'YE'];
exports.arabicLocales = arabicLocales;

for (var _locale, _i = 0; _i < arabicLocales.length; _i++) {
  _locale = "ar-".concat(arabicLocales[_i]);
  alpha[_locale] = alpha.ar;
  alphanumeric[_locale] = alphanumeric.ar;
  decimal[_locale] = decimal.ar;
}

var farsiLocales = ['IR', 'AF'];
exports.farsiLocales = farsiLocales;

for (var _locale2, _i2 = 0; _i2 < farsiLocales.length; _i2++) {
  _locale2 = "fa-".concat(farsiLocales[_i2]);
  alphanumeric[_locale2] = alphanumeric.fa;
  decimal[_locale2] = decimal.ar;
}

var bengaliLocales = ['BD', 'IN'];
exports.bengaliLocales = bengaliLocales;

for (var _locale3, _i3 = 0; _i3 < bengaliLocales.length; _i3++) {
  _locale3 = "bn-".concat(bengaliLocales[_i3]);
  alpha[_locale3] = alpha.bn;
  alphanumeric[_locale3] = alphanumeric.bn;
  decimal[_locale3] = decimal['en-US'];
} // Source: https://en.wikipedia.org/wiki/Decimal_mark


var dotDecimal = ['ar-EG', 'ar-LB', 'ar-LY'];
exports.dotDecimal = dotDecimal;
var commaDecimal = ['bg-BG', 'cs-CZ', 'da-DK', 'de-DE', 'el-GR', 'en-ZM', 'es-ES', 'fr-CA', 'fr-FR', 'id-ID', 'it-IT', 'ku-IQ', 'hi-IN', 'hu-HU', 'nb-NO', 'nn-NO', 'nl-NL', 'pl-PL', 'pt-PT', 'ru-RU', 'kk-KZ', 'si-LK', 'sl-SI', 'sr-RS@latin', 'sr-RS', 'sv-SE', 'tr-TR', 'uk-UA', 'vi-VN'];
exports.commaDecimal = commaDecimal;

for (var _i4 = 0; _i4 < dotDecimal.length; _i4++) {
  decimal[dotDecimal[_i4]] = decimal['en-US'];
}

for (var _i5 = 0; _i5 < commaDecimal.length; _i5++) {
  decimal[commaDecimal[_i5]] = ',';
}

alpha['fr-CA'] = alpha['fr-FR'];
alphanumeric['fr-CA'] = alphanumeric['fr-FR'];
alpha['pt-BR'] = alpha['pt-PT'];
alphanumeric['pt-BR'] = alphanumeric['pt-PT'];
decimal['pt-BR'] = decimal['pt-PT']; // see #862

alpha['pl-Pl'] = alpha['pl-PL'];
alphanumeric['pl-Pl'] = alphanumeric['pl-PL'];
decimal['pl-Pl'] = decimal['pl-PL']; // see #1455

alpha['fa-AF'] = alpha.fa;

/***/ }),

/***/ "./node_modules/validator/lib/isNumeric.js":
/*!*************************************************!*\
  !*** ./node_modules/validator/lib/isNumeric.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isNumeric;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _alpha = __webpack_require__(/*! ./alpha */ "./node_modules/validator/lib/alpha.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var numericNoSymbols = /^[0-9]+$/;

function isNumeric(str, options) {
  (0, _assertString.default)(str);

  if (options && options.no_symbols) {
    return numericNoSymbols.test(str);
  }

  return new RegExp("^[+-]?([0-9]*[".concat((options || {}).locale ? _alpha.decimal[options.locale] : '.', "])?[0-9]+$")).test(str);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/util/assertString.js":
/*!*********************************************************!*\
  !*** ./node_modules/validator/lib/util/assertString.js ***!
  \*********************************************************/
/***/ (function(module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = assertString;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function assertString(input) {
  var isString = typeof input === 'string' || input instanceof String;

  if (!isString) {
    var invalidType = _typeof(input);

    if (input === null) invalidType = 'null';else if (invalidType === 'object') invalidType = input.constructor.name;
    throw new TypeError("Expected a string but received a ".concat(invalidType));
  }
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ (function(module) {

"use strict";
module.exports = window["lodash"];

/***/ }),

/***/ "@wordpress/a11y":
/*!******************************!*\
  !*** external ["wp","a11y"] ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["a11y"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/url":
/*!*****************************!*\
  !*** external ["wp","url"] ***!
  \*****************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["url"];

/***/ }),

/***/ "./node_modules/react-hook-form/dist/index.esm.mjs":
/*!*********************************************************!*\
  !*** ./node_modules/react-hook-form/dist/index.esm.mjs ***!
  \*********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Controller: function() { return /* binding */ Controller; },
/* harmony export */   Form: function() { return /* binding */ Form; },
/* harmony export */   FormProvider: function() { return /* binding */ FormProvider; },
/* harmony export */   appendErrors: function() { return /* binding */ appendErrors; },
/* harmony export */   get: function() { return /* binding */ get; },
/* harmony export */   set: function() { return /* binding */ set; },
/* harmony export */   useController: function() { return /* binding */ useController; },
/* harmony export */   useFieldArray: function() { return /* binding */ useFieldArray; },
/* harmony export */   useForm: function() { return /* binding */ useForm; },
/* harmony export */   useFormContext: function() { return /* binding */ useFormContext; },
/* harmony export */   useFormState: function() { return /* binding */ useFormState; },
/* harmony export */   useWatch: function() { return /* binding */ useWatch; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");


var isCheckBoxInput = (element) => element.type === 'checkbox';

var isDateObject = (value) => value instanceof Date;

var isNullOrUndefined = (value) => value == null;

const isObjectType = (value) => typeof value === 'object';
var isObject = (value) => !isNullOrUndefined(value) &&
    !Array.isArray(value) &&
    isObjectType(value) &&
    !isDateObject(value);

var getEventValue = (event) => isObject(event) && event.target
    ? isCheckBoxInput(event.target)
        ? event.target.checked
        : event.target.value
    : event;

var getNodeParentName = (name) => name.substring(0, name.search(/\.\d+(\.|$)/)) || name;

var isNameInFieldArray = (names, name) => names.has(getNodeParentName(name));

var isPlainObject = (tempObject) => {
    const prototypeCopy = tempObject.constructor && tempObject.constructor.prototype;
    return (isObject(prototypeCopy) && prototypeCopy.hasOwnProperty('isPrototypeOf'));
};

var isWeb = typeof window !== 'undefined' &&
    typeof window.HTMLElement !== 'undefined' &&
    typeof document !== 'undefined';

function cloneObject(data) {
    let copy;
    const isArray = Array.isArray(data);
    if (data instanceof Date) {
        copy = new Date(data);
    }
    else if (data instanceof Set) {
        copy = new Set(data);
    }
    else if (!(isWeb && (data instanceof Blob || data instanceof FileList)) &&
        (isArray || isObject(data))) {
        copy = isArray ? [] : {};
        if (!isArray && !isPlainObject(data)) {
            copy = data;
        }
        else {
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    copy[key] = cloneObject(data[key]);
                }
            }
        }
    }
    else {
        return data;
    }
    return copy;
}

var compact = (value) => Array.isArray(value) ? value.filter(Boolean) : [];

var isUndefined = (val) => val === undefined;

var get = (obj, path, defaultValue) => {
    if (!path || !isObject(obj)) {
        return defaultValue;
    }
    const result = compact(path.split(/[,[\].]+?/)).reduce((result, key) => isNullOrUndefined(result) ? result : result[key], obj);
    return isUndefined(result) || result === obj
        ? isUndefined(obj[path])
            ? defaultValue
            : obj[path]
        : result;
};

const EVENTS = {
    BLUR: 'blur',
    FOCUS_OUT: 'focusout',
    CHANGE: 'change',
};
const VALIDATION_MODE = {
    onBlur: 'onBlur',
    onChange: 'onChange',
    onSubmit: 'onSubmit',
    onTouched: 'onTouched',
    all: 'all',
};
const INPUT_VALIDATION_RULES = {
    max: 'max',
    min: 'min',
    maxLength: 'maxLength',
    minLength: 'minLength',
    pattern: 'pattern',
    required: 'required',
    validate: 'validate',
};

const HookFormContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
/**
 * This custom hook allows you to access the form context. useFormContext is intended to be used in deeply nested structures, where it would become inconvenient to pass the context as a prop. To be used with {@link FormProvider}.
 *
 * @remarks
 * [API](https://react-hook-form.com/docs/useformcontext) • [Demo](https://codesandbox.io/s/react-hook-form-v7-form-context-ytudi)
 *
 * @returns return all useForm methods
 *
 * @example
 * ```tsx
 * function App() {
 *   const methods = useForm();
 *   const onSubmit = data => console.log(data);
 *
 *   return (
 *     <FormProvider {...methods} >
 *       <form onSubmit={methods.handleSubmit(onSubmit)}>
 *         <NestedInput />
 *         <input type="submit" />
 *       </form>
 *     </FormProvider>
 *   );
 * }
 *
 *  function NestedInput() {
 *   const { register } = useFormContext(); // retrieve all hook methods
 *   return <input {...register("test")} />;
 * }
 * ```
 */
const useFormContext = () => react__WEBPACK_IMPORTED_MODULE_0__.useContext(HookFormContext);
/**
 * A provider component that propagates the `useForm` methods to all children components via [React Context](https://reactjs.org/docs/context.html) API. To be used with {@link useFormContext}.
 *
 * @remarks
 * [API](https://react-hook-form.com/docs/useformcontext) • [Demo](https://codesandbox.io/s/react-hook-form-v7-form-context-ytudi)
 *
 * @param props - all useFrom methods
 *
 * @example
 * ```tsx
 * function App() {
 *   const methods = useForm();
 *   const onSubmit = data => console.log(data);
 *
 *   return (
 *     <FormProvider {...methods} >
 *       <form onSubmit={methods.handleSubmit(onSubmit)}>
 *         <NestedInput />
 *         <input type="submit" />
 *       </form>
 *     </FormProvider>
 *   );
 * }
 *
 *  function NestedInput() {
 *   const { register } = useFormContext(); // retrieve all hook methods
 *   return <input {...register("test")} />;
 * }
 * ```
 */
const FormProvider = (props) => {
    const { children, ...data } = props;
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(HookFormContext.Provider, { value: data }, children));
};

var getProxyFormState = (formState, control, localProxyFormState, isRoot = true) => {
    const result = {
        defaultValues: control._defaultValues,
    };
    for (const key in formState) {
        Object.defineProperty(result, key, {
            get: () => {
                const _key = key;
                if (control._proxyFormState[_key] !== VALIDATION_MODE.all) {
                    control._proxyFormState[_key] = !isRoot || VALIDATION_MODE.all;
                }
                localProxyFormState && (localProxyFormState[_key] = true);
                return formState[_key];
            },
        });
    }
    return result;
};

var isEmptyObject = (value) => isObject(value) && !Object.keys(value).length;

var shouldRenderFormState = (formStateData, _proxyFormState, updateFormState, isRoot) => {
    updateFormState(formStateData);
    const { name, ...formState } = formStateData;
    return (isEmptyObject(formState) ||
        Object.keys(formState).length >= Object.keys(_proxyFormState).length ||
        Object.keys(formState).find((key) => _proxyFormState[key] ===
            (!isRoot || VALIDATION_MODE.all)));
};

var convertToArrayPayload = (value) => (Array.isArray(value) ? value : [value]);

var shouldSubscribeByName = (name, signalName, exact) => exact && signalName
    ? name === signalName ||
        (Array.isArray(name) &&
            name.some((currentName) => currentName && exact && currentName === signalName))
    : !name ||
        !signalName ||
        name === signalName ||
        convertToArrayPayload(name).some((currentName) => currentName &&
            (currentName.startsWith(signalName) ||
                signalName.startsWith(currentName)));

function useSubscribe(props) {
    const _props = react__WEBPACK_IMPORTED_MODULE_0__.useRef(props);
    _props.current = props;
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
        const subscription = !props.disabled &&
            _props.current.subject &&
            _props.current.subject.subscribe({
                next: _props.current.next,
            });
        return () => {
            subscription && subscription.unsubscribe();
        };
    }, [props.disabled]);
}

/**
 * This custom hook allows you to subscribe to each form state, and isolate the re-render at the custom hook level. It has its scope in terms of form state subscription, so it would not affect other useFormState and useForm. Using this hook can reduce the re-render impact on large and complex form application.
 *
 * @remarks
 * [API](https://react-hook-form.com/docs/useformstate) • [Demo](https://codesandbox.io/s/useformstate-75xly)
 *
 * @param props - include options on specify fields to subscribe. {@link UseFormStateReturn}
 *
 * @example
 * ```tsx
 * function App() {
 *   const { register, handleSubmit, control } = useForm({
 *     defaultValues: {
 *     firstName: "firstName"
 *   }});
 *   const { dirtyFields } = useFormState({
 *     control
 *   });
 *   const onSubmit = (data) => console.log(data);
 *
 *   return (
 *     <form onSubmit={handleSubmit(onSubmit)}>
 *       <input {...register("firstName")} placeholder="First Name" />
 *       {dirtyFields.firstName && <p>Field is dirty.</p>}
 *       <input type="submit" />
 *     </form>
 *   );
 * }
 * ```
 */
function useFormState(props) {
    const methods = useFormContext();
    const { control = methods.control, disabled, name, exact } = props || {};
    const [formState, updateFormState] = react__WEBPACK_IMPORTED_MODULE_0__.useState(control._formState);
    const _mounted = react__WEBPACK_IMPORTED_MODULE_0__.useRef(true);
    const _localProxyFormState = react__WEBPACK_IMPORTED_MODULE_0__.useRef({
        isDirty: false,
        isLoading: false,
        dirtyFields: false,
        touchedFields: false,
        isValidating: false,
        isValid: false,
        errors: false,
    });
    const _name = react__WEBPACK_IMPORTED_MODULE_0__.useRef(name);
    _name.current = name;
    useSubscribe({
        disabled,
        next: (value) => _mounted.current &&
            shouldSubscribeByName(_name.current, value.name, exact) &&
            shouldRenderFormState(value, _localProxyFormState.current, control._updateFormState) &&
            updateFormState({
                ...control._formState,
                ...value,
            }),
        subject: control._subjects.state,
    });
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
        _mounted.current = true;
        _localProxyFormState.current.isValid && control._updateValid(true);
        return () => {
            _mounted.current = false;
        };
    }, [control]);
    return getProxyFormState(formState, control, _localProxyFormState.current, false);
}

var isString = (value) => typeof value === 'string';

var generateWatchOutput = (names, _names, formValues, isGlobal, defaultValue) => {
    if (isString(names)) {
        isGlobal && _names.watch.add(names);
        return get(formValues, names, defaultValue);
    }
    if (Array.isArray(names)) {
        return names.map((fieldName) => (isGlobal && _names.watch.add(fieldName), get(formValues, fieldName)));
    }
    isGlobal && (_names.watchAll = true);
    return formValues;
};

/**
 * Custom hook to subscribe to field change and isolate re-rendering at the component level.
 *
 * @remarks
 *
 * [API](https://react-hook-form.com/docs/usewatch) • [Demo](https://codesandbox.io/s/react-hook-form-v7-ts-usewatch-h9i5e)
 *
 * @example
 * ```tsx
 * const { watch } = useForm();
 * const values = useWatch({
 *   name: "fieldName"
 *   control,
 * })
 * ```
 */
function useWatch(props) {
    const methods = useFormContext();
    const { control = methods.control, name, defaultValue, disabled, exact, } = props || {};
    const _name = react__WEBPACK_IMPORTED_MODULE_0__.useRef(name);
    _name.current = name;
    useSubscribe({
        disabled,
        subject: control._subjects.values,
        next: (formState) => {
            if (shouldSubscribeByName(_name.current, formState.name, exact)) {
                updateValue(cloneObject(generateWatchOutput(_name.current, control._names, formState.values || control._formValues, false, defaultValue)));
            }
        },
    });
    const [value, updateValue] = react__WEBPACK_IMPORTED_MODULE_0__.useState(control._getWatch(name, defaultValue));
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => control._removeUnmounted());
    return value;
}

var isKey = (value) => /^\w*$/.test(value);

var stringToPath = (input) => compact(input.replace(/["|']|\]/g, '').split(/\.|\[/));

function set(object, path, value) {
    let index = -1;
    const tempPath = isKey(path) ? [path] : stringToPath(path);
    const length = tempPath.length;
    const lastIndex = length - 1;
    while (++index < length) {
        const key = tempPath[index];
        let newValue = value;
        if (index !== lastIndex) {
            const objValue = object[key];
            newValue =
                isObject(objValue) || Array.isArray(objValue)
                    ? objValue
                    : !isNaN(+tempPath[index + 1])
                        ? []
                        : {};
        }
        object[key] = newValue;
        object = object[key];
    }
    return object;
}

/**
 * Custom hook to work with controlled component, this function provide you with both form and field level state. Re-render is isolated at the hook level.
 *
 * @remarks
 * [API](https://react-hook-form.com/docs/usecontroller) • [Demo](https://codesandbox.io/s/usecontroller-0o8px)
 *
 * @param props - the path name to the form field value, and validation rules.
 *
 * @returns field properties, field and form state. {@link UseControllerReturn}
 *
 * @example
 * ```tsx
 * function Input(props) {
 *   const { field, fieldState, formState } = useController(props);
 *   return (
 *     <div>
 *       <input {...field} placeholder={props.name} />
 *       <p>{fieldState.isTouched && "Touched"}</p>
 *       <p>{formState.isSubmitted ? "submitted" : ""}</p>
 *     </div>
 *   );
 * }
 * ```
 */
function useController(props) {
    const methods = useFormContext();
    const { name, disabled, control = methods.control, shouldUnregister } = props;
    const isArrayField = isNameInFieldArray(control._names.array, name);
    const value = useWatch({
        control,
        name,
        defaultValue: get(control._formValues, name, get(control._defaultValues, name, props.defaultValue)),
        exact: true,
    });
    const formState = useFormState({
        control,
        name,
    });
    const _registerProps = react__WEBPACK_IMPORTED_MODULE_0__.useRef(control.register(name, {
        ...props.rules,
        value,
    }));
    _registerProps.current = control.register(name, props.rules);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
        const _shouldUnregisterField = control._options.shouldUnregister || shouldUnregister;
        const updateMounted = (name, value) => {
            const field = get(control._fields, name);
            if (field) {
                field._f.mount = value;
            }
        };
        updateMounted(name, true);
        if (_shouldUnregisterField) {
            const value = cloneObject(get(control._options.defaultValues, name));
            set(control._defaultValues, name, value);
            if (isUndefined(get(control._formValues, name))) {
                set(control._formValues, name, value);
            }
        }
        return () => {
            (isArrayField
                ? _shouldUnregisterField && !control._state.action
                : _shouldUnregisterField)
                ? control.unregister(name)
                : updateMounted(name, false);
        };
    }, [name, control, isArrayField, shouldUnregister]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
        control._updateDisabledField({
            disabled,
            fields: control._fields,
            name,
        });
    }, [disabled, name, control]);
    return {
        field: {
            name,
            value,
            disabled,
            onChange: react__WEBPACK_IMPORTED_MODULE_0__.useCallback((event) => _registerProps.current.onChange({
                target: {
                    value: getEventValue(event),
                    name: name,
                },
                type: EVENTS.CHANGE,
            }), [name]),
            onBlur: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(() => _registerProps.current.onBlur({
                target: {
                    value: get(control._formValues, name),
                    name: name,
                },
                type: EVENTS.BLUR,
            }), [name, control]),
            ref: (elm) => {
                const field = get(control._fields, name);
                if (field && elm) {
                    field._f.ref = {
                        focus: () => elm.focus(),
                        select: () => elm.select(),
                        setCustomValidity: (message) => elm.setCustomValidity(message),
                        reportValidity: () => elm.reportValidity(),
                    };
                }
            },
        },
        formState,
        fieldState: Object.defineProperties({}, {
            invalid: {
                enumerable: true,
                get: () => !!get(formState.errors, name),
            },
            isDirty: {
                enumerable: true,
                get: () => !!get(formState.dirtyFields, name),
            },
            isTouched: {
                enumerable: true,
                get: () => !!get(formState.touchedFields, name),
            },
            error: {
                enumerable: true,
                get: () => get(formState.errors, name),
            },
        }),
    };
}

/**
 * Component based on `useController` hook to work with controlled component.
 *
 * @remarks
 * [API](https://react-hook-form.com/docs/usecontroller/controller) • [Demo](https://codesandbox.io/s/react-hook-form-v6-controller-ts-jwyzw) • [Video](https://www.youtube.com/watch?v=N2UNk_UCVyA)
 *
 * @param props - the path name to the form field value, and validation rules.
 *
 * @returns provide field handler functions, field and form state.
 *
 * @example
 * ```tsx
 * function App() {
 *   const { control } = useForm<FormValues>({
 *     defaultValues: {
 *       test: ""
 *     }
 *   });
 *
 *   return (
 *     <form>
 *       <Controller
 *         control={control}
 *         name="test"
 *         render={({ field: { onChange, onBlur, value, ref }, formState, fieldState }) => (
 *           <>
 *             <input
 *               onChange={onChange} // send value to hook form
 *               onBlur={onBlur} // notify when input is touched
 *               value={value} // return updated value
 *               ref={ref} // set ref for focus management
 *             />
 *             <p>{formState.isSubmitted ? "submitted" : ""}</p>
 *             <p>{fieldState.isTouched ? "touched" : ""}</p>
 *           </>
 *         )}
 *       />
 *     </form>
 *   );
 * }
 * ```
 */
const Controller = (props) => props.render(useController(props));

const POST_REQUEST = 'post';
/**
 * Form component to manage submission.
 *
 * @param props - to setup submission detail. {@link FormProps}
 *
 * @returns form component or headless render prop.
 *
 * @example
 * ```tsx
 * function App() {
 *   const { control, formState: { errors } } = useForm();
 *
 *   return (
 *     <Form action="/api" control={control}>
 *       <input {...register("name")} />
 *       <p>{errors?.root?.server && 'Server error'}</p>
 *       <button>Submit</button>
 *     </Form>
 *   );
 * }
 * ```
 */
function Form(props) {
    const methods = useFormContext();
    const [mounted, setMounted] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
    const { control = methods.control, onSubmit, children, action, method = POST_REQUEST, headers, encType, onError, render, onSuccess, validateStatus, ...rest } = props;
    const submit = async (event) => {
        let hasError = false;
        let type = '';
        await control.handleSubmit(async (data) => {
            const formData = new FormData();
            let formDataJson = '';
            try {
                formDataJson = JSON.stringify(data);
            }
            catch (_a) { }
            for (const name of control._names.mount) {
                formData.append(name, get(data, name));
            }
            if (onSubmit) {
                await onSubmit({
                    data,
                    event,
                    method,
                    formData,
                    formDataJson,
                });
            }
            if (action) {
                try {
                    const shouldStringifySubmissionData = [
                        headers && headers['Content-Type'],
                        encType,
                    ].some((value) => value && value.includes('json'));
                    const response = await fetch(action, {
                        method,
                        headers: {
                            ...headers,
                            ...(encType ? { 'Content-Type': encType } : {}),
                        },
                        body: shouldStringifySubmissionData ? formDataJson : formData,
                    });
                    if (response &&
                        (validateStatus
                            ? !validateStatus(response.status)
                            : response.status < 200 || response.status >= 300)) {
                        hasError = true;
                        onError && onError({ response });
                        type = String(response.status);
                    }
                    else {
                        onSuccess && onSuccess({ response });
                    }
                }
                catch (error) {
                    hasError = true;
                    onError && onError({ error });
                }
            }
        })(event);
        if (hasError && props.control) {
            props.control._subjects.state.next({
                isSubmitSuccessful: false,
            });
            props.control.setError('root.server', {
                type,
            });
        }
    };
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
        setMounted(true);
    }, []);
    return render ? (react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, render({
        submit,
    }))) : (react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", { noValidate: mounted, action: action, method: method, encType: encType, onSubmit: submit, ...rest }, children));
}

var appendErrors = (name, validateAllFieldCriteria, errors, type, message) => validateAllFieldCriteria
    ? {
        ...errors[name],
        types: {
            ...(errors[name] && errors[name].types ? errors[name].types : {}),
            [type]: message || true,
        },
    }
    : {};

const focusFieldBy = (fields, callback, fieldsNames) => {
    for (const key of fieldsNames || Object.keys(fields)) {
        const field = get(fields, key);
        if (field) {
            const { _f, ...currentField } = field;
            if (_f && callback(_f.name)) {
                if (_f.ref.focus) {
                    _f.ref.focus();
                    break;
                }
                else if (_f.refs && _f.refs[0].focus) {
                    _f.refs[0].focus();
                    break;
                }
            }
            else if (isObject(currentField)) {
                focusFieldBy(currentField, callback);
            }
        }
    }
};

var generateId = () => {
    const d = typeof performance === 'undefined' ? Date.now() : performance.now() * 1000;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16 + d) % 16 | 0;
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
};

var getFocusFieldName = (name, index, options = {}) => options.shouldFocus || isUndefined(options.shouldFocus)
    ? options.focusName ||
        `${name}.${isUndefined(options.focusIndex) ? index : options.focusIndex}.`
    : '';

var getValidationModes = (mode) => ({
    isOnSubmit: !mode || mode === VALIDATION_MODE.onSubmit,
    isOnBlur: mode === VALIDATION_MODE.onBlur,
    isOnChange: mode === VALIDATION_MODE.onChange,
    isOnAll: mode === VALIDATION_MODE.all,
    isOnTouch: mode === VALIDATION_MODE.onTouched,
});

var isWatched = (name, _names, isBlurEvent) => !isBlurEvent &&
    (_names.watchAll ||
        _names.watch.has(name) ||
        [..._names.watch].some((watchName) => name.startsWith(watchName) &&
            /^\.\w+/.test(name.slice(watchName.length))));

var updateFieldArrayRootError = (errors, error, name) => {
    const fieldArrayErrors = compact(get(errors, name));
    set(fieldArrayErrors, 'root', error[name]);
    set(errors, name, fieldArrayErrors);
    return errors;
};

var isBoolean = (value) => typeof value === 'boolean';

var isFileInput = (element) => element.type === 'file';

var isFunction = (value) => typeof value === 'function';

var isHTMLElement = (value) => {
    if (!isWeb) {
        return false;
    }
    const owner = value ? value.ownerDocument : 0;
    return (value instanceof
        (owner && owner.defaultView ? owner.defaultView.HTMLElement : HTMLElement));
};

var isMessage = (value) => isString(value);

var isRadioInput = (element) => element.type === 'radio';

var isRegex = (value) => value instanceof RegExp;

const defaultResult = {
    value: false,
    isValid: false,
};
const validResult = { value: true, isValid: true };
var getCheckboxValue = (options) => {
    if (Array.isArray(options)) {
        if (options.length > 1) {
            const values = options
                .filter((option) => option && option.checked && !option.disabled)
                .map((option) => option.value);
            return { value: values, isValid: !!values.length };
        }
        return options[0].checked && !options[0].disabled
            ? // @ts-expect-error expected to work in the browser
                options[0].attributes && !isUndefined(options[0].attributes.value)
                    ? isUndefined(options[0].value) || options[0].value === ''
                        ? validResult
                        : { value: options[0].value, isValid: true }
                    : validResult
            : defaultResult;
    }
    return defaultResult;
};

const defaultReturn = {
    isValid: false,
    value: null,
};
var getRadioValue = (options) => Array.isArray(options)
    ? options.reduce((previous, option) => option && option.checked && !option.disabled
        ? {
            isValid: true,
            value: option.value,
        }
        : previous, defaultReturn)
    : defaultReturn;

function getValidateError(result, ref, type = 'validate') {
    if (isMessage(result) ||
        (Array.isArray(result) && result.every(isMessage)) ||
        (isBoolean(result) && !result)) {
        return {
            type,
            message: isMessage(result) ? result : '',
            ref,
        };
    }
}

var getValueAndMessage = (validationData) => isObject(validationData) && !isRegex(validationData)
    ? validationData
    : {
        value: validationData,
        message: '',
    };

var validateField = async (field, formValues, validateAllFieldCriteria, shouldUseNativeValidation, isFieldArray) => {
    const { ref, refs, required, maxLength, minLength, min, max, pattern, validate, name, valueAsNumber, mount, disabled, } = field._f;
    const inputValue = get(formValues, name);
    if (!mount || disabled) {
        return {};
    }
    const inputRef = refs ? refs[0] : ref;
    const setCustomValidity = (message) => {
        if (shouldUseNativeValidation && inputRef.reportValidity) {
            inputRef.setCustomValidity(isBoolean(message) ? '' : message || '');
            inputRef.reportValidity();
        }
    };
    const error = {};
    const isRadio = isRadioInput(ref);
    const isCheckBox = isCheckBoxInput(ref);
    const isRadioOrCheckbox = isRadio || isCheckBox;
    const isEmpty = ((valueAsNumber || isFileInput(ref)) &&
        isUndefined(ref.value) &&
        isUndefined(inputValue)) ||
        (isHTMLElement(ref) && ref.value === '') ||
        inputValue === '' ||
        (Array.isArray(inputValue) && !inputValue.length);
    const appendErrorsCurry = appendErrors.bind(null, name, validateAllFieldCriteria, error);
    const getMinMaxMessage = (exceedMax, maxLengthMessage, minLengthMessage, maxType = INPUT_VALIDATION_RULES.maxLength, minType = INPUT_VALIDATION_RULES.minLength) => {
        const message = exceedMax ? maxLengthMessage : minLengthMessage;
        error[name] = {
            type: exceedMax ? maxType : minType,
            message,
            ref,
            ...appendErrorsCurry(exceedMax ? maxType : minType, message),
        };
    };
    if (isFieldArray
        ? !Array.isArray(inputValue) || !inputValue.length
        : required &&
            ((!isRadioOrCheckbox && (isEmpty || isNullOrUndefined(inputValue))) ||
                (isBoolean(inputValue) && !inputValue) ||
                (isCheckBox && !getCheckboxValue(refs).isValid) ||
                (isRadio && !getRadioValue(refs).isValid))) {
        const { value, message } = isMessage(required)
            ? { value: !!required, message: required }
            : getValueAndMessage(required);
        if (value) {
            error[name] = {
                type: INPUT_VALIDATION_RULES.required,
                message,
                ref: inputRef,
                ...appendErrorsCurry(INPUT_VALIDATION_RULES.required, message),
            };
            if (!validateAllFieldCriteria) {
                setCustomValidity(message);
                return error;
            }
        }
    }
    if (!isEmpty && (!isNullOrUndefined(min) || !isNullOrUndefined(max))) {
        let exceedMax;
        let exceedMin;
        const maxOutput = getValueAndMessage(max);
        const minOutput = getValueAndMessage(min);
        if (!isNullOrUndefined(inputValue) && !isNaN(inputValue)) {
            const valueNumber = ref.valueAsNumber ||
                (inputValue ? +inputValue : inputValue);
            if (!isNullOrUndefined(maxOutput.value)) {
                exceedMax = valueNumber > maxOutput.value;
            }
            if (!isNullOrUndefined(minOutput.value)) {
                exceedMin = valueNumber < minOutput.value;
            }
        }
        else {
            const valueDate = ref.valueAsDate || new Date(inputValue);
            const convertTimeToDate = (time) => new Date(new Date().toDateString() + ' ' + time);
            const isTime = ref.type == 'time';
            const isWeek = ref.type == 'week';
            if (isString(maxOutput.value) && inputValue) {
                exceedMax = isTime
                    ? convertTimeToDate(inputValue) > convertTimeToDate(maxOutput.value)
                    : isWeek
                        ? inputValue > maxOutput.value
                        : valueDate > new Date(maxOutput.value);
            }
            if (isString(minOutput.value) && inputValue) {
                exceedMin = isTime
                    ? convertTimeToDate(inputValue) < convertTimeToDate(minOutput.value)
                    : isWeek
                        ? inputValue < minOutput.value
                        : valueDate < new Date(minOutput.value);
            }
        }
        if (exceedMax || exceedMin) {
            getMinMaxMessage(!!exceedMax, maxOutput.message, minOutput.message, INPUT_VALIDATION_RULES.max, INPUT_VALIDATION_RULES.min);
            if (!validateAllFieldCriteria) {
                setCustomValidity(error[name].message);
                return error;
            }
        }
    }
    if ((maxLength || minLength) &&
        !isEmpty &&
        (isString(inputValue) || (isFieldArray && Array.isArray(inputValue)))) {
        const maxLengthOutput = getValueAndMessage(maxLength);
        const minLengthOutput = getValueAndMessage(minLength);
        const exceedMax = !isNullOrUndefined(maxLengthOutput.value) &&
            inputValue.length > +maxLengthOutput.value;
        const exceedMin = !isNullOrUndefined(minLengthOutput.value) &&
            inputValue.length < +minLengthOutput.value;
        if (exceedMax || exceedMin) {
            getMinMaxMessage(exceedMax, maxLengthOutput.message, minLengthOutput.message);
            if (!validateAllFieldCriteria) {
                setCustomValidity(error[name].message);
                return error;
            }
        }
    }
    if (pattern && !isEmpty && isString(inputValue)) {
        const { value: patternValue, message } = getValueAndMessage(pattern);
        if (isRegex(patternValue) && !inputValue.match(patternValue)) {
            error[name] = {
                type: INPUT_VALIDATION_RULES.pattern,
                message,
                ref,
                ...appendErrorsCurry(INPUT_VALIDATION_RULES.pattern, message),
            };
            if (!validateAllFieldCriteria) {
                setCustomValidity(message);
                return error;
            }
        }
    }
    if (validate) {
        if (isFunction(validate)) {
            const result = await validate(inputValue, formValues);
            const validateError = getValidateError(result, inputRef);
            if (validateError) {
                error[name] = {
                    ...validateError,
                    ...appendErrorsCurry(INPUT_VALIDATION_RULES.validate, validateError.message),
                };
                if (!validateAllFieldCriteria) {
                    setCustomValidity(validateError.message);
                    return error;
                }
            }
        }
        else if (isObject(validate)) {
            let validationResult = {};
            for (const key in validate) {
                if (!isEmptyObject(validationResult) && !validateAllFieldCriteria) {
                    break;
                }
                const validateError = getValidateError(await validate[key](inputValue, formValues), inputRef, key);
                if (validateError) {
                    validationResult = {
                        ...validateError,
                        ...appendErrorsCurry(key, validateError.message),
                    };
                    setCustomValidity(validateError.message);
                    if (validateAllFieldCriteria) {
                        error[name] = validationResult;
                    }
                }
            }
            if (!isEmptyObject(validationResult)) {
                error[name] = {
                    ref: inputRef,
                    ...validationResult,
                };
                if (!validateAllFieldCriteria) {
                    return error;
                }
            }
        }
    }
    setCustomValidity(true);
    return error;
};

function append(data, value) {
    return [...data, ...convertToArrayPayload(value)];
}

var fillEmptyArray = (value) => Array.isArray(value) ? value.map(() => undefined) : undefined;

function insert(data, index, value) {
    return [
        ...data.slice(0, index),
        ...convertToArrayPayload(value),
        ...data.slice(index),
    ];
}

var moveArrayAt = (data, from, to) => {
    if (!Array.isArray(data)) {
        return [];
    }
    if (isUndefined(data[to])) {
        data[to] = undefined;
    }
    data.splice(to, 0, data.splice(from, 1)[0]);
    return data;
};

function prepend(data, value) {
    return [...convertToArrayPayload(value), ...convertToArrayPayload(data)];
}

function removeAtIndexes(data, indexes) {
    let i = 0;
    const temp = [...data];
    for (const index of indexes) {
        temp.splice(index - i, 1);
        i++;
    }
    return compact(temp).length ? temp : [];
}
var removeArrayAt = (data, index) => isUndefined(index)
    ? []
    : removeAtIndexes(data, convertToArrayPayload(index).sort((a, b) => a - b));

var swapArrayAt = (data, indexA, indexB) => {
    data[indexA] = [data[indexB], (data[indexB] = data[indexA])][0];
};

function baseGet(object, updatePath) {
    const length = updatePath.slice(0, -1).length;
    let index = 0;
    while (index < length) {
        object = isUndefined(object) ? index++ : object[updatePath[index++]];
    }
    return object;
}
function isEmptyArray(obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && !isUndefined(obj[key])) {
            return false;
        }
    }
    return true;
}
function unset(object, path) {
    const paths = Array.isArray(path)
        ? path
        : isKey(path)
            ? [path]
            : stringToPath(path);
    const childObject = paths.length === 1 ? object : baseGet(object, paths);
    const index = paths.length - 1;
    const key = paths[index];
    if (childObject) {
        delete childObject[key];
    }
    if (index !== 0 &&
        ((isObject(childObject) && isEmptyObject(childObject)) ||
            (Array.isArray(childObject) && isEmptyArray(childObject)))) {
        unset(object, paths.slice(0, -1));
    }
    return object;
}

var updateAt = (fieldValues, index, value) => {
    fieldValues[index] = value;
    return fieldValues;
};

/**
 * A custom hook that exposes convenient methods to perform operations with a list of dynamic inputs that need to be appended, updated, removed etc. • [Demo](https://codesandbox.io/s/react-hook-form-usefieldarray-ssugn) • [Video](https://youtu.be/4MrbfGSFY2A)
 *
 * @remarks
 * [API](https://react-hook-form.com/docs/usefieldarray) • [Demo](https://codesandbox.io/s/react-hook-form-usefieldarray-ssugn)
 *
 * @param props - useFieldArray props
 *
 * @returns methods - functions to manipulate with the Field Arrays (dynamic inputs) {@link UseFieldArrayReturn}
 *
 * @example
 * ```tsx
 * function App() {
 *   const { register, control, handleSubmit, reset, trigger, setError } = useForm({
 *     defaultValues: {
 *       test: []
 *     }
 *   });
 *   const { fields, append } = useFieldArray({
 *     control,
 *     name: "test"
 *   });
 *
 *   return (
 *     <form onSubmit={handleSubmit(data => console.log(data))}>
 *       {fields.map((item, index) => (
 *          <input key={item.id} {...register(`test.${index}.firstName`)}  />
 *       ))}
 *       <button type="button" onClick={() => append({ firstName: "bill" })}>
 *         append
 *       </button>
 *       <input type="submit" />
 *     </form>
 *   );
 * }
 * ```
 */
function useFieldArray(props) {
    const methods = useFormContext();
    const { control = methods.control, name, keyName = 'id', shouldUnregister, } = props;
    const [fields, setFields] = react__WEBPACK_IMPORTED_MODULE_0__.useState(control._getFieldArray(name));
    const ids = react__WEBPACK_IMPORTED_MODULE_0__.useRef(control._getFieldArray(name).map(generateId));
    const _fieldIds = react__WEBPACK_IMPORTED_MODULE_0__.useRef(fields);
    const _name = react__WEBPACK_IMPORTED_MODULE_0__.useRef(name);
    const _actioned = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    _name.current = name;
    _fieldIds.current = fields;
    control._names.array.add(name);
    props.rules &&
        control.register(name, props.rules);
    useSubscribe({
        next: ({ values, name: fieldArrayName, }) => {
            if (fieldArrayName === _name.current || !fieldArrayName) {
                const fieldValues = get(values, _name.current);
                if (Array.isArray(fieldValues)) {
                    setFields(fieldValues);
                    ids.current = fieldValues.map(generateId);
                }
            }
        },
        subject: control._subjects.array,
    });
    const updateValues = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((updatedFieldArrayValues) => {
        _actioned.current = true;
        control._updateFieldArray(name, updatedFieldArrayValues);
    }, [control, name]);
    const append$1 = (value, options) => {
        const appendValue = convertToArrayPayload(cloneObject(value));
        const updatedFieldArrayValues = append(control._getFieldArray(name), appendValue);
        control._names.focus = getFocusFieldName(name, updatedFieldArrayValues.length - 1, options);
        ids.current = append(ids.current, appendValue.map(generateId));
        updateValues(updatedFieldArrayValues);
        setFields(updatedFieldArrayValues);
        control._updateFieldArray(name, updatedFieldArrayValues, append, {
            argA: fillEmptyArray(value),
        });
    };
    const prepend$1 = (value, options) => {
        const prependValue = convertToArrayPayload(cloneObject(value));
        const updatedFieldArrayValues = prepend(control._getFieldArray(name), prependValue);
        control._names.focus = getFocusFieldName(name, 0, options);
        ids.current = prepend(ids.current, prependValue.map(generateId));
        updateValues(updatedFieldArrayValues);
        setFields(updatedFieldArrayValues);
        control._updateFieldArray(name, updatedFieldArrayValues, prepend, {
            argA: fillEmptyArray(value),
        });
    };
    const remove = (index) => {
        const updatedFieldArrayValues = removeArrayAt(control._getFieldArray(name), index);
        ids.current = removeArrayAt(ids.current, index);
        updateValues(updatedFieldArrayValues);
        setFields(updatedFieldArrayValues);
        control._updateFieldArray(name, updatedFieldArrayValues, removeArrayAt, {
            argA: index,
        });
    };
    const insert$1 = (index, value, options) => {
        const insertValue = convertToArrayPayload(cloneObject(value));
        const updatedFieldArrayValues = insert(control._getFieldArray(name), index, insertValue);
        control._names.focus = getFocusFieldName(name, index, options);
        ids.current = insert(ids.current, index, insertValue.map(generateId));
        updateValues(updatedFieldArrayValues);
        setFields(updatedFieldArrayValues);
        control._updateFieldArray(name, updatedFieldArrayValues, insert, {
            argA: index,
            argB: fillEmptyArray(value),
        });
    };
    const swap = (indexA, indexB) => {
        const updatedFieldArrayValues = control._getFieldArray(name);
        swapArrayAt(updatedFieldArrayValues, indexA, indexB);
        swapArrayAt(ids.current, indexA, indexB);
        updateValues(updatedFieldArrayValues);
        setFields(updatedFieldArrayValues);
        control._updateFieldArray(name, updatedFieldArrayValues, swapArrayAt, {
            argA: indexA,
            argB: indexB,
        }, false);
    };
    const move = (from, to) => {
        const updatedFieldArrayValues = control._getFieldArray(name);
        moveArrayAt(updatedFieldArrayValues, from, to);
        moveArrayAt(ids.current, from, to);
        updateValues(updatedFieldArrayValues);
        setFields(updatedFieldArrayValues);
        control._updateFieldArray(name, updatedFieldArrayValues, moveArrayAt, {
            argA: from,
            argB: to,
        }, false);
    };
    const update = (index, value) => {
        const updateValue = cloneObject(value);
        const updatedFieldArrayValues = updateAt(control._getFieldArray(name), index, updateValue);
        ids.current = [...updatedFieldArrayValues].map((item, i) => !item || i === index ? generateId() : ids.current[i]);
        updateValues(updatedFieldArrayValues);
        setFields([...updatedFieldArrayValues]);
        control._updateFieldArray(name, updatedFieldArrayValues, updateAt, {
            argA: index,
            argB: updateValue,
        }, true, false);
    };
    const replace = (value) => {
        const updatedFieldArrayValues = convertToArrayPayload(cloneObject(value));
        ids.current = updatedFieldArrayValues.map(generateId);
        updateValues([...updatedFieldArrayValues]);
        setFields([...updatedFieldArrayValues]);
        control._updateFieldArray(name, [...updatedFieldArrayValues], (data) => data, {}, true, false);
    };
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
        control._state.action = false;
        isWatched(name, control._names) &&
            control._subjects.state.next({
                ...control._formState,
            });
        if (_actioned.current &&
            (!getValidationModes(control._options.mode).isOnSubmit ||
                control._formState.isSubmitted)) {
            if (control._options.resolver) {
                control._executeSchema([name]).then((result) => {
                    const error = get(result.errors, name);
                    const existingError = get(control._formState.errors, name);
                    if (existingError
                        ? (!error && existingError.type) ||
                            (error &&
                                (existingError.type !== error.type ||
                                    existingError.message !== error.message))
                        : error && error.type) {
                        error
                            ? set(control._formState.errors, name, error)
                            : unset(control._formState.errors, name);
                        control._subjects.state.next({
                            errors: control._formState.errors,
                        });
                    }
                });
            }
            else {
                const field = get(control._fields, name);
                if (field && field._f) {
                    validateField(field, control._formValues, control._options.criteriaMode === VALIDATION_MODE.all, control._options.shouldUseNativeValidation, true).then((error) => !isEmptyObject(error) &&
                        control._subjects.state.next({
                            errors: updateFieldArrayRootError(control._formState.errors, error, name),
                        }));
                }
            }
        }
        control._subjects.values.next({
            name,
            values: { ...control._formValues },
        });
        control._names.focus &&
            focusFieldBy(control._fields, (key) => !!key && key.startsWith(control._names.focus || ''));
        control._names.focus = '';
        control._updateValid();
        _actioned.current = false;
    }, [fields, name, control]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
        !get(control._formValues, name) && control._updateFieldArray(name);
        return () => {
            (control._options.shouldUnregister || shouldUnregister) &&
                control.unregister(name);
        };
    }, [name, control, keyName, shouldUnregister]);
    return {
        swap: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(swap, [updateValues, name, control]),
        move: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(move, [updateValues, name, control]),
        prepend: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(prepend$1, [updateValues, name, control]),
        append: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(append$1, [updateValues, name, control]),
        remove: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(remove, [updateValues, name, control]),
        insert: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(insert$1, [updateValues, name, control]),
        update: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(update, [updateValues, name, control]),
        replace: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(replace, [updateValues, name, control]),
        fields: react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => fields.map((field, index) => ({
            ...field,
            [keyName]: ids.current[index] || generateId(),
        })), [fields, keyName]),
    };
}

function createSubject() {
    let _observers = [];
    const next = (value) => {
        for (const observer of _observers) {
            observer.next && observer.next(value);
        }
    };
    const subscribe = (observer) => {
        _observers.push(observer);
        return {
            unsubscribe: () => {
                _observers = _observers.filter((o) => o !== observer);
            },
        };
    };
    const unsubscribe = () => {
        _observers = [];
    };
    return {
        get observers() {
            return _observers;
        },
        next,
        subscribe,
        unsubscribe,
    };
}

var isPrimitive = (value) => isNullOrUndefined(value) || !isObjectType(value);

function deepEqual(object1, object2) {
    if (isPrimitive(object1) || isPrimitive(object2)) {
        return object1 === object2;
    }
    if (isDateObject(object1) && isDateObject(object2)) {
        return object1.getTime() === object2.getTime();
    }
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (const key of keys1) {
        const val1 = object1[key];
        if (!keys2.includes(key)) {
            return false;
        }
        if (key !== 'ref') {
            const val2 = object2[key];
            if ((isDateObject(val1) && isDateObject(val2)) ||
                (isObject(val1) && isObject(val2)) ||
                (Array.isArray(val1) && Array.isArray(val2))
                ? !deepEqual(val1, val2)
                : val1 !== val2) {
                return false;
            }
        }
    }
    return true;
}

var isMultipleSelect = (element) => element.type === `select-multiple`;

var isRadioOrCheckbox = (ref) => isRadioInput(ref) || isCheckBoxInput(ref);

var live = (ref) => isHTMLElement(ref) && ref.isConnected;

var objectHasFunction = (data) => {
    for (const key in data) {
        if (isFunction(data[key])) {
            return true;
        }
    }
    return false;
};

function markFieldsDirty(data, fields = {}) {
    const isParentNodeArray = Array.isArray(data);
    if (isObject(data) || isParentNodeArray) {
        for (const key in data) {
            if (Array.isArray(data[key]) ||
                (isObject(data[key]) && !objectHasFunction(data[key]))) {
                fields[key] = Array.isArray(data[key]) ? [] : {};
                markFieldsDirty(data[key], fields[key]);
            }
            else if (!isNullOrUndefined(data[key])) {
                fields[key] = true;
            }
        }
    }
    return fields;
}
function getDirtyFieldsFromDefaultValues(data, formValues, dirtyFieldsFromValues) {
    const isParentNodeArray = Array.isArray(data);
    if (isObject(data) || isParentNodeArray) {
        for (const key in data) {
            if (Array.isArray(data[key]) ||
                (isObject(data[key]) && !objectHasFunction(data[key]))) {
                if (isUndefined(formValues) ||
                    isPrimitive(dirtyFieldsFromValues[key])) {
                    dirtyFieldsFromValues[key] = Array.isArray(data[key])
                        ? markFieldsDirty(data[key], [])
                        : { ...markFieldsDirty(data[key]) };
                }
                else {
                    getDirtyFieldsFromDefaultValues(data[key], isNullOrUndefined(formValues) ? {} : formValues[key], dirtyFieldsFromValues[key]);
                }
            }
            else {
                dirtyFieldsFromValues[key] = !deepEqual(data[key], formValues[key]);
            }
        }
    }
    return dirtyFieldsFromValues;
}
var getDirtyFields = (defaultValues, formValues) => getDirtyFieldsFromDefaultValues(defaultValues, formValues, markFieldsDirty(formValues));

var getFieldValueAs = (value, { valueAsNumber, valueAsDate, setValueAs }) => isUndefined(value)
    ? value
    : valueAsNumber
        ? value === ''
            ? NaN
            : value
                ? +value
                : value
        : valueAsDate && isString(value)
            ? new Date(value)
            : setValueAs
                ? setValueAs(value)
                : value;

function getFieldValue(_f) {
    const ref = _f.ref;
    if (_f.refs ? _f.refs.every((ref) => ref.disabled) : ref.disabled) {
        return;
    }
    if (isFileInput(ref)) {
        return ref.files;
    }
    if (isRadioInput(ref)) {
        return getRadioValue(_f.refs).value;
    }
    if (isMultipleSelect(ref)) {
        return [...ref.selectedOptions].map(({ value }) => value);
    }
    if (isCheckBoxInput(ref)) {
        return getCheckboxValue(_f.refs).value;
    }
    return getFieldValueAs(isUndefined(ref.value) ? _f.ref.value : ref.value, _f);
}

var getResolverOptions = (fieldsNames, _fields, criteriaMode, shouldUseNativeValidation) => {
    const fields = {};
    for (const name of fieldsNames) {
        const field = get(_fields, name);
        field && set(fields, name, field._f);
    }
    return {
        criteriaMode,
        names: [...fieldsNames],
        fields,
        shouldUseNativeValidation,
    };
};

var getRuleValue = (rule) => isUndefined(rule)
    ? rule
    : isRegex(rule)
        ? rule.source
        : isObject(rule)
            ? isRegex(rule.value)
                ? rule.value.source
                : rule.value
            : rule;

var hasValidation = (options) => options.mount &&
    (options.required ||
        options.min ||
        options.max ||
        options.maxLength ||
        options.minLength ||
        options.pattern ||
        options.validate);

function schemaErrorLookup(errors, _fields, name) {
    const error = get(errors, name);
    if (error || isKey(name)) {
        return {
            error,
            name,
        };
    }
    const names = name.split('.');
    while (names.length) {
        const fieldName = names.join('.');
        const field = get(_fields, fieldName);
        const foundError = get(errors, fieldName);
        if (field && !Array.isArray(field) && name !== fieldName) {
            return { name };
        }
        if (foundError && foundError.type) {
            return {
                name: fieldName,
                error: foundError,
            };
        }
        names.pop();
    }
    return {
        name,
    };
}

var skipValidation = (isBlurEvent, isTouched, isSubmitted, reValidateMode, mode) => {
    if (mode.isOnAll) {
        return false;
    }
    else if (!isSubmitted && mode.isOnTouch) {
        return !(isTouched || isBlurEvent);
    }
    else if (isSubmitted ? reValidateMode.isOnBlur : mode.isOnBlur) {
        return !isBlurEvent;
    }
    else if (isSubmitted ? reValidateMode.isOnChange : mode.isOnChange) {
        return isBlurEvent;
    }
    return true;
};

var unsetEmptyArray = (ref, name) => !compact(get(ref, name)).length && unset(ref, name);

const defaultOptions = {
    mode: VALIDATION_MODE.onSubmit,
    reValidateMode: VALIDATION_MODE.onChange,
    shouldFocusError: true,
};
function createFormControl(props = {}, flushRootRender) {
    let _options = {
        ...defaultOptions,
        ...props,
    };
    let _formState = {
        submitCount: 0,
        isDirty: false,
        isLoading: isFunction(_options.defaultValues),
        isValidating: false,
        isSubmitted: false,
        isSubmitting: false,
        isSubmitSuccessful: false,
        isValid: false,
        touchedFields: {},
        dirtyFields: {},
        errors: {},
    };
    let _fields = {};
    let _defaultValues = isObject(_options.defaultValues) || isObject(_options.values)
        ? cloneObject(_options.defaultValues || _options.values) || {}
        : {};
    let _formValues = _options.shouldUnregister
        ? {}
        : cloneObject(_defaultValues);
    let _state = {
        action: false,
        mount: false,
        watch: false,
    };
    let _names = {
        mount: new Set(),
        unMount: new Set(),
        array: new Set(),
        watch: new Set(),
    };
    let delayErrorCallback;
    let timer = 0;
    const _proxyFormState = {
        isDirty: false,
        dirtyFields: false,
        touchedFields: false,
        isValidating: false,
        isValid: false,
        errors: false,
    };
    const _subjects = {
        values: createSubject(),
        array: createSubject(),
        state: createSubject(),
    };
    const shouldCaptureDirtyFields = props.resetOptions && props.resetOptions.keepDirtyValues;
    const validationModeBeforeSubmit = getValidationModes(_options.mode);
    const validationModeAfterSubmit = getValidationModes(_options.reValidateMode);
    const shouldDisplayAllAssociatedErrors = _options.criteriaMode === VALIDATION_MODE.all;
    const debounce = (callback) => (wait) => {
        clearTimeout(timer);
        timer = setTimeout(callback, wait);
    };
    const _updateValid = async (shouldUpdateValid) => {
        if (_proxyFormState.isValid || shouldUpdateValid) {
            const isValid = _options.resolver
                ? isEmptyObject((await _executeSchema()).errors)
                : await executeBuiltInValidation(_fields, true);
            if (isValid !== _formState.isValid) {
                _subjects.state.next({
                    isValid,
                });
            }
        }
    };
    const _updateIsValidating = (value) => _proxyFormState.isValidating &&
        _subjects.state.next({
            isValidating: value,
        });
    const _updateFieldArray = (name, values = [], method, args, shouldSetValues = true, shouldUpdateFieldsAndState = true) => {
        if (args && method) {
            _state.action = true;
            if (shouldUpdateFieldsAndState && Array.isArray(get(_fields, name))) {
                const fieldValues = method(get(_fields, name), args.argA, args.argB);
                shouldSetValues && set(_fields, name, fieldValues);
            }
            if (shouldUpdateFieldsAndState &&
                Array.isArray(get(_formState.errors, name))) {
                const errors = method(get(_formState.errors, name), args.argA, args.argB);
                shouldSetValues && set(_formState.errors, name, errors);
                unsetEmptyArray(_formState.errors, name);
            }
            if (_proxyFormState.touchedFields &&
                shouldUpdateFieldsAndState &&
                Array.isArray(get(_formState.touchedFields, name))) {
                const touchedFields = method(get(_formState.touchedFields, name), args.argA, args.argB);
                shouldSetValues && set(_formState.touchedFields, name, touchedFields);
            }
            if (_proxyFormState.dirtyFields) {
                _formState.dirtyFields = getDirtyFields(_defaultValues, _formValues);
            }
            _subjects.state.next({
                name,
                isDirty: _getDirty(name, values),
                dirtyFields: _formState.dirtyFields,
                errors: _formState.errors,
                isValid: _formState.isValid,
            });
        }
        else {
            set(_formValues, name, values);
        }
    };
    const updateErrors = (name, error) => {
        set(_formState.errors, name, error);
        _subjects.state.next({
            errors: _formState.errors,
        });
    };
    const updateValidAndValue = (name, shouldSkipSetValueAs, value, ref) => {
        const field = get(_fields, name);
        if (field) {
            const defaultValue = get(_formValues, name, isUndefined(value) ? get(_defaultValues, name) : value);
            isUndefined(defaultValue) ||
                (ref && ref.defaultChecked) ||
                shouldSkipSetValueAs
                ? set(_formValues, name, shouldSkipSetValueAs ? defaultValue : getFieldValue(field._f))
                : setFieldValue(name, defaultValue);
            _state.mount && _updateValid();
        }
    };
    const updateTouchAndDirty = (name, fieldValue, isBlurEvent, shouldDirty, shouldRender) => {
        let shouldUpdateField = false;
        let isPreviousDirty = false;
        const output = {
            name,
        };
        if (!isBlurEvent || shouldDirty) {
            if (_proxyFormState.isDirty) {
                isPreviousDirty = _formState.isDirty;
                _formState.isDirty = output.isDirty = _getDirty();
                shouldUpdateField = isPreviousDirty !== output.isDirty;
            }
            const isCurrentFieldPristine = deepEqual(get(_defaultValues, name), fieldValue);
            isPreviousDirty = get(_formState.dirtyFields, name);
            isCurrentFieldPristine
                ? unset(_formState.dirtyFields, name)
                : set(_formState.dirtyFields, name, true);
            output.dirtyFields = _formState.dirtyFields;
            shouldUpdateField =
                shouldUpdateField ||
                    (_proxyFormState.dirtyFields &&
                        isPreviousDirty !== !isCurrentFieldPristine);
        }
        if (isBlurEvent) {
            const isPreviousFieldTouched = get(_formState.touchedFields, name);
            if (!isPreviousFieldTouched) {
                set(_formState.touchedFields, name, isBlurEvent);
                output.touchedFields = _formState.touchedFields;
                shouldUpdateField =
                    shouldUpdateField ||
                        (_proxyFormState.touchedFields &&
                            isPreviousFieldTouched !== isBlurEvent);
            }
        }
        shouldUpdateField && shouldRender && _subjects.state.next(output);
        return shouldUpdateField ? output : {};
    };
    const shouldRenderByError = (name, isValid, error, fieldState) => {
        const previousFieldError = get(_formState.errors, name);
        const shouldUpdateValid = _proxyFormState.isValid &&
            isBoolean(isValid) &&
            _formState.isValid !== isValid;
        if (props.delayError && error) {
            delayErrorCallback = debounce(() => updateErrors(name, error));
            delayErrorCallback(props.delayError);
        }
        else {
            clearTimeout(timer);
            delayErrorCallback = null;
            error
                ? set(_formState.errors, name, error)
                : unset(_formState.errors, name);
        }
        if ((error ? !deepEqual(previousFieldError, error) : previousFieldError) ||
            !isEmptyObject(fieldState) ||
            shouldUpdateValid) {
            const updatedFormState = {
                ...fieldState,
                ...(shouldUpdateValid && isBoolean(isValid) ? { isValid } : {}),
                errors: _formState.errors,
                name,
            };
            _formState = {
                ..._formState,
                ...updatedFormState,
            };
            _subjects.state.next(updatedFormState);
        }
        _updateIsValidating(false);
    };
    const _executeSchema = async (name) => _options.resolver(_formValues, _options.context, getResolverOptions(name || _names.mount, _fields, _options.criteriaMode, _options.shouldUseNativeValidation));
    const executeSchemaAndUpdateState = async (names) => {
        const { errors } = await _executeSchema(names);
        if (names) {
            for (const name of names) {
                const error = get(errors, name);
                error
                    ? set(_formState.errors, name, error)
                    : unset(_formState.errors, name);
            }
        }
        else {
            _formState.errors = errors;
        }
        return errors;
    };
    const executeBuiltInValidation = async (fields, shouldOnlyCheckValid, context = {
        valid: true,
    }) => {
        for (const name in fields) {
            const field = fields[name];
            if (field) {
                const { _f, ...fieldValue } = field;
                if (_f) {
                    const isFieldArrayRoot = _names.array.has(_f.name);
                    const fieldError = await validateField(field, _formValues, shouldDisplayAllAssociatedErrors, _options.shouldUseNativeValidation && !shouldOnlyCheckValid, isFieldArrayRoot);
                    if (fieldError[_f.name]) {
                        context.valid = false;
                        if (shouldOnlyCheckValid) {
                            break;
                        }
                    }
                    !shouldOnlyCheckValid &&
                        (get(fieldError, _f.name)
                            ? isFieldArrayRoot
                                ? updateFieldArrayRootError(_formState.errors, fieldError, _f.name)
                                : set(_formState.errors, _f.name, fieldError[_f.name])
                            : unset(_formState.errors, _f.name));
                }
                fieldValue &&
                    (await executeBuiltInValidation(fieldValue, shouldOnlyCheckValid, context));
            }
        }
        return context.valid;
    };
    const _removeUnmounted = () => {
        for (const name of _names.unMount) {
            const field = get(_fields, name);
            field &&
                (field._f.refs
                    ? field._f.refs.every((ref) => !live(ref))
                    : !live(field._f.ref)) &&
                unregister(name);
        }
        _names.unMount = new Set();
    };
    const _getDirty = (name, data) => (name && data && set(_formValues, name, data),
        !deepEqual(getValues(), _defaultValues));
    const _getWatch = (names, defaultValue, isGlobal) => generateWatchOutput(names, _names, {
        ...(_state.mount
            ? _formValues
            : isUndefined(defaultValue)
                ? _defaultValues
                : isString(names)
                    ? { [names]: defaultValue }
                    : defaultValue),
    }, isGlobal, defaultValue);
    const _getFieldArray = (name) => compact(get(_state.mount ? _formValues : _defaultValues, name, props.shouldUnregister ? get(_defaultValues, name, []) : []));
    const setFieldValue = (name, value, options = {}) => {
        const field = get(_fields, name);
        let fieldValue = value;
        if (field) {
            const fieldReference = field._f;
            if (fieldReference) {
                !fieldReference.disabled &&
                    set(_formValues, name, getFieldValueAs(value, fieldReference));
                fieldValue =
                    isHTMLElement(fieldReference.ref) && isNullOrUndefined(value)
                        ? ''
                        : value;
                if (isMultipleSelect(fieldReference.ref)) {
                    [...fieldReference.ref.options].forEach((optionRef) => (optionRef.selected = fieldValue.includes(optionRef.value)));
                }
                else if (fieldReference.refs) {
                    if (isCheckBoxInput(fieldReference.ref)) {
                        fieldReference.refs.length > 1
                            ? fieldReference.refs.forEach((checkboxRef) => (!checkboxRef.defaultChecked || !checkboxRef.disabled) &&
                                (checkboxRef.checked = Array.isArray(fieldValue)
                                    ? !!fieldValue.find((data) => data === checkboxRef.value)
                                    : fieldValue === checkboxRef.value))
                            : fieldReference.refs[0] &&
                                (fieldReference.refs[0].checked = !!fieldValue);
                    }
                    else {
                        fieldReference.refs.forEach((radioRef) => (radioRef.checked = radioRef.value === fieldValue));
                    }
                }
                else if (isFileInput(fieldReference.ref)) {
                    fieldReference.ref.value = '';
                }
                else {
                    fieldReference.ref.value = fieldValue;
                    if (!fieldReference.ref.type) {
                        _subjects.values.next({
                            name,
                            values: { ..._formValues },
                        });
                    }
                }
            }
        }
        (options.shouldDirty || options.shouldTouch) &&
            updateTouchAndDirty(name, fieldValue, options.shouldTouch, options.shouldDirty, true);
        options.shouldValidate && trigger(name);
    };
    const setValues = (name, value, options) => {
        for (const fieldKey in value) {
            const fieldValue = value[fieldKey];
            const fieldName = `${name}.${fieldKey}`;
            const field = get(_fields, fieldName);
            (_names.array.has(name) ||
                !isPrimitive(fieldValue) ||
                (field && !field._f)) &&
                !isDateObject(fieldValue)
                ? setValues(fieldName, fieldValue, options)
                : setFieldValue(fieldName, fieldValue, options);
        }
    };
    const setValue = (name, value, options = {}) => {
        const field = get(_fields, name);
        const isFieldArray = _names.array.has(name);
        const cloneValue = cloneObject(value);
        set(_formValues, name, cloneValue);
        if (isFieldArray) {
            _subjects.array.next({
                name,
                values: { ..._formValues },
            });
            if ((_proxyFormState.isDirty || _proxyFormState.dirtyFields) &&
                options.shouldDirty) {
                _subjects.state.next({
                    name,
                    dirtyFields: getDirtyFields(_defaultValues, _formValues),
                    isDirty: _getDirty(name, cloneValue),
                });
            }
        }
        else {
            field && !field._f && !isNullOrUndefined(cloneValue)
                ? setValues(name, cloneValue, options)
                : setFieldValue(name, cloneValue, options);
        }
        isWatched(name, _names) && _subjects.state.next({ ..._formState });
        _subjects.values.next({
            name,
            values: { ..._formValues },
        });
        !_state.mount && flushRootRender();
    };
    const onChange = async (event) => {
        const target = event.target;
        let name = target.name;
        let isFieldValueUpdated = true;
        const field = get(_fields, name);
        const getCurrentFieldValue = () => target.type ? getFieldValue(field._f) : getEventValue(event);
        if (field) {
            let error;
            let isValid;
            const fieldValue = getCurrentFieldValue();
            const isBlurEvent = event.type === EVENTS.BLUR || event.type === EVENTS.FOCUS_OUT;
            const shouldSkipValidation = (!hasValidation(field._f) &&
                !_options.resolver &&
                !get(_formState.errors, name) &&
                !field._f.deps) ||
                skipValidation(isBlurEvent, get(_formState.touchedFields, name), _formState.isSubmitted, validationModeAfterSubmit, validationModeBeforeSubmit);
            const watched = isWatched(name, _names, isBlurEvent);
            set(_formValues, name, fieldValue);
            if (isBlurEvent) {
                field._f.onBlur && field._f.onBlur(event);
                delayErrorCallback && delayErrorCallback(0);
            }
            else if (field._f.onChange) {
                field._f.onChange(event);
            }
            const fieldState = updateTouchAndDirty(name, fieldValue, isBlurEvent, false);
            const shouldRender = !isEmptyObject(fieldState) || watched;
            !isBlurEvent &&
                _subjects.values.next({
                    name,
                    type: event.type,
                    values: { ..._formValues },
                });
            if (shouldSkipValidation) {
                _proxyFormState.isValid && _updateValid();
                return (shouldRender &&
                    _subjects.state.next({ name, ...(watched ? {} : fieldState) }));
            }
            !isBlurEvent && watched && _subjects.state.next({ ..._formState });
            _updateIsValidating(true);
            if (_options.resolver) {
                const { errors } = await _executeSchema([name]);
                const previousErrorLookupResult = schemaErrorLookup(_formState.errors, _fields, name);
                const errorLookupResult = schemaErrorLookup(errors, _fields, previousErrorLookupResult.name || name);
                error = errorLookupResult.error;
                name = errorLookupResult.name;
                isValid = isEmptyObject(errors);
            }
            else {
                error = (await validateField(field, _formValues, shouldDisplayAllAssociatedErrors, _options.shouldUseNativeValidation))[name];
                isFieldValueUpdated =
                    isNaN(fieldValue) ||
                        fieldValue === get(_formValues, name, fieldValue);
                if (isFieldValueUpdated) {
                    if (error) {
                        isValid = false;
                    }
                    else if (_proxyFormState.isValid) {
                        isValid = await executeBuiltInValidation(_fields, true);
                    }
                }
            }
            if (isFieldValueUpdated) {
                field._f.deps &&
                    trigger(field._f.deps);
                shouldRenderByError(name, isValid, error, fieldState);
            }
        }
    };
    const trigger = async (name, options = {}) => {
        let isValid;
        let validationResult;
        const fieldNames = convertToArrayPayload(name);
        _updateIsValidating(true);
        if (_options.resolver) {
            const errors = await executeSchemaAndUpdateState(isUndefined(name) ? name : fieldNames);
            isValid = isEmptyObject(errors);
            validationResult = name
                ? !fieldNames.some((name) => get(errors, name))
                : isValid;
        }
        else if (name) {
            validationResult = (await Promise.all(fieldNames.map(async (fieldName) => {
                const field = get(_fields, fieldName);
                return await executeBuiltInValidation(field && field._f ? { [fieldName]: field } : field);
            }))).every(Boolean);
            !(!validationResult && !_formState.isValid) && _updateValid();
        }
        else {
            validationResult = isValid = await executeBuiltInValidation(_fields);
        }
        _subjects.state.next({
            ...(!isString(name) ||
                (_proxyFormState.isValid && isValid !== _formState.isValid)
                ? {}
                : { name }),
            ...(_options.resolver || !name ? { isValid } : {}),
            errors: _formState.errors,
            isValidating: false,
        });
        options.shouldFocus &&
            !validationResult &&
            focusFieldBy(_fields, (key) => key && get(_formState.errors, key), name ? fieldNames : _names.mount);
        return validationResult;
    };
    const getValues = (fieldNames) => {
        const values = {
            ..._defaultValues,
            ...(_state.mount ? _formValues : {}),
        };
        return isUndefined(fieldNames)
            ? values
            : isString(fieldNames)
                ? get(values, fieldNames)
                : fieldNames.map((name) => get(values, name));
    };
    const getFieldState = (name, formState) => ({
        invalid: !!get((formState || _formState).errors, name),
        isDirty: !!get((formState || _formState).dirtyFields, name),
        isTouched: !!get((formState || _formState).touchedFields, name),
        error: get((formState || _formState).errors, name),
    });
    const clearErrors = (name) => {
        name &&
            convertToArrayPayload(name).forEach((inputName) => unset(_formState.errors, inputName));
        _subjects.state.next({
            errors: name ? _formState.errors : {},
        });
    };
    const setError = (name, error, options) => {
        const ref = (get(_fields, name, { _f: {} })._f || {}).ref;
        set(_formState.errors, name, {
            ...error,
            ref,
        });
        _subjects.state.next({
            name,
            errors: _formState.errors,
            isValid: false,
        });
        options && options.shouldFocus && ref && ref.focus && ref.focus();
    };
    const watch = (name, defaultValue) => isFunction(name)
        ? _subjects.values.subscribe({
            next: (payload) => name(_getWatch(undefined, defaultValue), payload),
        })
        : _getWatch(name, defaultValue, true);
    const unregister = (name, options = {}) => {
        for (const fieldName of name ? convertToArrayPayload(name) : _names.mount) {
            _names.mount.delete(fieldName);
            _names.array.delete(fieldName);
            if (!options.keepValue) {
                unset(_fields, fieldName);
                unset(_formValues, fieldName);
            }
            !options.keepError && unset(_formState.errors, fieldName);
            !options.keepDirty && unset(_formState.dirtyFields, fieldName);
            !options.keepTouched && unset(_formState.touchedFields, fieldName);
            !_options.shouldUnregister &&
                !options.keepDefaultValue &&
                unset(_defaultValues, fieldName);
        }
        _subjects.values.next({
            values: { ..._formValues },
        });
        _subjects.state.next({
            ..._formState,
            ...(!options.keepDirty ? {} : { isDirty: _getDirty() }),
        });
        !options.keepIsValid && _updateValid();
    };
    const _updateDisabledField = ({ disabled, name, field, fields, }) => {
        if (isBoolean(disabled)) {
            const value = disabled
                ? undefined
                : get(_formValues, name, getFieldValue(field ? field._f : get(fields, name)._f));
            set(_formValues, name, value);
            updateTouchAndDirty(name, value, false, false, true);
        }
    };
    const register = (name, options = {}) => {
        let field = get(_fields, name);
        const disabledIsDefined = isBoolean(options.disabled);
        set(_fields, name, {
            ...(field || {}),
            _f: {
                ...(field && field._f ? field._f : { ref: { name } }),
                name,
                mount: true,
                ...options,
            },
        });
        _names.mount.add(name);
        if (field) {
            _updateDisabledField({
                field,
                disabled: options.disabled,
                name,
            });
        }
        else {
            updateValidAndValue(name, true, options.value);
        }
        return {
            ...(disabledIsDefined ? { disabled: options.disabled } : {}),
            ...(_options.progressive
                ? {
                    required: !!options.required,
                    min: getRuleValue(options.min),
                    max: getRuleValue(options.max),
                    minLength: getRuleValue(options.minLength),
                    maxLength: getRuleValue(options.maxLength),
                    pattern: getRuleValue(options.pattern),
                }
                : {}),
            name,
            onChange,
            onBlur: onChange,
            ref: (ref) => {
                if (ref) {
                    register(name, options);
                    field = get(_fields, name);
                    const fieldRef = isUndefined(ref.value)
                        ? ref.querySelectorAll
                            ? ref.querySelectorAll('input,select,textarea')[0] || ref
                            : ref
                        : ref;
                    const radioOrCheckbox = isRadioOrCheckbox(fieldRef);
                    const refs = field._f.refs || [];
                    if (radioOrCheckbox
                        ? refs.find((option) => option === fieldRef)
                        : fieldRef === field._f.ref) {
                        return;
                    }
                    set(_fields, name, {
                        _f: {
                            ...field._f,
                            ...(radioOrCheckbox
                                ? {
                                    refs: [
                                        ...refs.filter(live),
                                        fieldRef,
                                        ...(Array.isArray(get(_defaultValues, name)) ? [{}] : []),
                                    ],
                                    ref: { type: fieldRef.type, name },
                                }
                                : { ref: fieldRef }),
                        },
                    });
                    updateValidAndValue(name, false, undefined, fieldRef);
                }
                else {
                    field = get(_fields, name, {});
                    if (field._f) {
                        field._f.mount = false;
                    }
                    (_options.shouldUnregister || options.shouldUnregister) &&
                        !(isNameInFieldArray(_names.array, name) && _state.action) &&
                        _names.unMount.add(name);
                }
            },
        };
    };
    const _focusError = () => _options.shouldFocusError &&
        focusFieldBy(_fields, (key) => key && get(_formState.errors, key), _names.mount);
    const handleSubmit = (onValid, onInvalid) => async (e) => {
        if (e) {
            e.preventDefault && e.preventDefault();
            e.persist && e.persist();
        }
        let fieldValues = cloneObject(_formValues);
        _subjects.state.next({
            isSubmitting: true,
        });
        if (_options.resolver) {
            const { errors, values } = await _executeSchema();
            _formState.errors = errors;
            fieldValues = values;
        }
        else {
            await executeBuiltInValidation(_fields);
        }
        unset(_formState.errors, 'root');
        if (isEmptyObject(_formState.errors)) {
            _subjects.state.next({
                errors: {},
            });
            await onValid(fieldValues, e);
        }
        else {
            if (onInvalid) {
                await onInvalid({ ..._formState.errors }, e);
            }
            _focusError();
            setTimeout(_focusError);
        }
        _subjects.state.next({
            isSubmitted: true,
            isSubmitting: false,
            isSubmitSuccessful: isEmptyObject(_formState.errors),
            submitCount: _formState.submitCount + 1,
            errors: _formState.errors,
        });
    };
    const resetField = (name, options = {}) => {
        if (get(_fields, name)) {
            if (isUndefined(options.defaultValue)) {
                setValue(name, get(_defaultValues, name));
            }
            else {
                setValue(name, options.defaultValue);
                set(_defaultValues, name, options.defaultValue);
            }
            if (!options.keepTouched) {
                unset(_formState.touchedFields, name);
            }
            if (!options.keepDirty) {
                unset(_formState.dirtyFields, name);
                _formState.isDirty = options.defaultValue
                    ? _getDirty(name, get(_defaultValues, name))
                    : _getDirty();
            }
            if (!options.keepError) {
                unset(_formState.errors, name);
                _proxyFormState.isValid && _updateValid();
            }
            _subjects.state.next({ ..._formState });
        }
    };
    const _reset = (formValues, keepStateOptions = {}) => {
        const updatedValues = formValues ? cloneObject(formValues) : _defaultValues;
        const cloneUpdatedValues = cloneObject(updatedValues);
        const values = formValues && !isEmptyObject(formValues)
            ? cloneUpdatedValues
            : _defaultValues;
        if (!keepStateOptions.keepDefaultValues) {
            _defaultValues = updatedValues;
        }
        if (!keepStateOptions.keepValues) {
            if (keepStateOptions.keepDirtyValues || shouldCaptureDirtyFields) {
                for (const fieldName of _names.mount) {
                    get(_formState.dirtyFields, fieldName)
                        ? set(values, fieldName, get(_formValues, fieldName))
                        : setValue(fieldName, get(values, fieldName));
                }
            }
            else {
                if (isWeb && isUndefined(formValues)) {
                    for (const name of _names.mount) {
                        const field = get(_fields, name);
                        if (field && field._f) {
                            const fieldReference = Array.isArray(field._f.refs)
                                ? field._f.refs[0]
                                : field._f.ref;
                            if (isHTMLElement(fieldReference)) {
                                const form = fieldReference.closest('form');
                                if (form) {
                                    form.reset();
                                    break;
                                }
                            }
                        }
                    }
                }
                _fields = {};
            }
            _formValues = props.shouldUnregister
                ? keepStateOptions.keepDefaultValues
                    ? cloneObject(_defaultValues)
                    : {}
                : cloneObject(values);
            _subjects.array.next({
                values: { ...values },
            });
            _subjects.values.next({
                values: { ...values },
            });
        }
        _names = {
            mount: new Set(),
            unMount: new Set(),
            array: new Set(),
            watch: new Set(),
            watchAll: false,
            focus: '',
        };
        !_state.mount && flushRootRender();
        _state.mount = !_proxyFormState.isValid || !!keepStateOptions.keepIsValid;
        _state.watch = !!props.shouldUnregister;
        _subjects.state.next({
            submitCount: keepStateOptions.keepSubmitCount
                ? _formState.submitCount
                : 0,
            isDirty: keepStateOptions.keepDirty
                ? _formState.isDirty
                : !!(keepStateOptions.keepDefaultValues &&
                    !deepEqual(formValues, _defaultValues)),
            isSubmitted: keepStateOptions.keepIsSubmitted
                ? _formState.isSubmitted
                : false,
            dirtyFields: keepStateOptions.keepDirtyValues
                ? _formState.dirtyFields
                : keepStateOptions.keepDefaultValues && formValues
                    ? getDirtyFields(_defaultValues, formValues)
                    : {},
            touchedFields: keepStateOptions.keepTouched
                ? _formState.touchedFields
                : {},
            errors: keepStateOptions.keepErrors ? _formState.errors : {},
            isSubmitting: false,
            isSubmitSuccessful: false,
        });
    };
    const reset = (formValues, keepStateOptions) => _reset(isFunction(formValues)
        ? formValues(_formValues)
        : formValues, keepStateOptions);
    const setFocus = (name, options = {}) => {
        const field = get(_fields, name);
        const fieldReference = field && field._f;
        if (fieldReference) {
            const fieldRef = fieldReference.refs
                ? fieldReference.refs[0]
                : fieldReference.ref;
            if (fieldRef.focus) {
                fieldRef.focus();
                options.shouldSelect && fieldRef.select();
            }
        }
    };
    const _updateFormState = (updatedFormState) => {
        _formState = {
            ..._formState,
            ...updatedFormState,
        };
    };
    const _resetDefaultValues = () => isFunction(_options.defaultValues) &&
        _options.defaultValues().then((values) => {
            reset(values, _options.resetOptions);
            _subjects.state.next({
                isLoading: false,
            });
        });
    return {
        control: {
            register,
            unregister,
            getFieldState,
            handleSubmit,
            setError,
            _executeSchema,
            _getWatch,
            _getDirty,
            _updateValid,
            _removeUnmounted,
            _updateFieldArray,
            _updateDisabledField,
            _getFieldArray,
            _reset,
            _resetDefaultValues,
            _updateFormState,
            _subjects,
            _proxyFormState,
            get _fields() {
                return _fields;
            },
            get _formValues() {
                return _formValues;
            },
            get _state() {
                return _state;
            },
            set _state(value) {
                _state = value;
            },
            get _defaultValues() {
                return _defaultValues;
            },
            get _names() {
                return _names;
            },
            set _names(value) {
                _names = value;
            },
            get _formState() {
                return _formState;
            },
            set _formState(value) {
                _formState = value;
            },
            get _options() {
                return _options;
            },
            set _options(value) {
                _options = {
                    ..._options,
                    ...value,
                };
            },
        },
        trigger,
        register,
        handleSubmit,
        watch,
        setValue,
        getValues,
        reset,
        resetField,
        clearErrors,
        unregister,
        setError,
        setFocus,
        getFieldState,
    };
}

/**
 * Custom hook to manage the entire form.
 *
 * @remarks
 * [API](https://react-hook-form.com/docs/useform) • [Demo](https://codesandbox.io/s/react-hook-form-get-started-ts-5ksmm) • [Video](https://www.youtube.com/watch?v=RkXv4AXXC_4)
 *
 * @param props - form configuration and validation parameters.
 *
 * @returns methods - individual functions to manage the form state. {@link UseFormReturn}
 *
 * @example
 * ```tsx
 * function App() {
 *   const { register, handleSubmit, watch, formState: { errors } } = useForm();
 *   const onSubmit = data => console.log(data);
 *
 *   console.log(watch("example"));
 *
 *   return (
 *     <form onSubmit={handleSubmit(onSubmit)}>
 *       <input defaultValue="test" {...register("example")} />
 *       <input {...register("exampleRequired", { required: true })} />
 *       {errors.exampleRequired && <span>This field is required</span>}
 *       <button>Submit</button>
 *     </form>
 *   );
 * }
 * ```
 */
function useForm(props = {}) {
    const _formControl = react__WEBPACK_IMPORTED_MODULE_0__.useRef();
    const _values = react__WEBPACK_IMPORTED_MODULE_0__.useRef();
    const [formState, updateFormState] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
        isDirty: false,
        isValidating: false,
        isLoading: isFunction(props.defaultValues),
        isSubmitted: false,
        isSubmitting: false,
        isSubmitSuccessful: false,
        isValid: false,
        submitCount: 0,
        dirtyFields: {},
        touchedFields: {},
        errors: {},
        defaultValues: isFunction(props.defaultValues)
            ? undefined
            : props.defaultValues,
    });
    if (!_formControl.current) {
        _formControl.current = {
            ...createFormControl(props, () => updateFormState((formState) => ({ ...formState }))),
            formState,
        };
    }
    const control = _formControl.current.control;
    control._options = props;
    useSubscribe({
        subject: control._subjects.state,
        next: (value) => {
            if (shouldRenderFormState(value, control._proxyFormState, control._updateFormState, true)) {
                updateFormState({ ...control._formState });
            }
        },
    });
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
        if (props.values && !deepEqual(props.values, _values.current)) {
            control._reset(props.values, control._options.resetOptions);
            _values.current = props.values;
        }
        else {
            control._resetDefaultValues();
        }
    }, [props.values, control]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
        if (!control._state.mount) {
            control._updateValid();
            control._state.mount = true;
        }
        if (control._state.watch) {
            control._state.watch = false;
            control._subjects.state.next({ ...control._formState });
        }
        control._removeUnmounted();
    });
    _formControl.current.formState = getProxyFormState(formState, control);
    return _formControl.current;
}


//# sourceMappingURL=index.esm.mjs.map


/***/ }),

/***/ "./node_modules/axios/package.json":
/*!*****************************************!*\
  !*** ./node_modules/axios/package.json ***!
  \*****************************************/
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"name":"axios","version":"0.21.4","description":"Promise based HTTP client for the browser and node.js","main":"index.js","scripts":{"test":"grunt test","start":"node ./sandbox/server.js","build":"NODE_ENV=production grunt build","preversion":"npm test","version":"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json","postversion":"git push && git push --tags","examples":"node ./examples/server.js","coveralls":"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js","fix":"eslint --fix lib/**/*.js"},"repository":{"type":"git","url":"https://github.com/axios/axios.git"},"keywords":["xhr","http","ajax","promise","node"],"author":"Matt Zabriskie","license":"MIT","bugs":{"url":"https://github.com/axios/axios/issues"},"homepage":"https://axios-http.com","devDependencies":{"coveralls":"^3.0.0","es6-promise":"^4.2.4","grunt":"^1.3.0","grunt-banner":"^0.6.0","grunt-cli":"^1.2.0","grunt-contrib-clean":"^1.1.0","grunt-contrib-watch":"^1.0.0","grunt-eslint":"^23.0.0","grunt-karma":"^4.0.0","grunt-mocha-test":"^0.13.3","grunt-ts":"^6.0.0-beta.19","grunt-webpack":"^4.0.2","istanbul-instrumenter-loader":"^1.0.0","jasmine-core":"^2.4.1","karma":"^6.3.2","karma-chrome-launcher":"^3.1.0","karma-firefox-launcher":"^2.1.0","karma-jasmine":"^1.1.1","karma-jasmine-ajax":"^0.1.13","karma-safari-launcher":"^1.0.0","karma-sauce-launcher":"^4.3.6","karma-sinon":"^1.0.5","karma-sourcemap-loader":"^0.3.8","karma-webpack":"^4.0.2","load-grunt-tasks":"^3.5.2","minimist":"^1.2.0","mocha":"^8.2.1","sinon":"^4.5.0","terser-webpack-plugin":"^4.2.3","typescript":"^4.0.5","url-search-params":"^0.10.0","webpack":"^4.44.2","webpack-dev-server":"^3.11.0"},"browser":{"./lib/adapters/http.js":"./lib/adapters/xhr.js"},"jsdelivr":"dist/axios.min.js","unpkg":"dist/axios.min.js","typings":"./index.d.ts","dependencies":{"follow-redirects":"^1.14.0"},"bundlesize":[{"path":"./dist/axios.min.js","threshold":"5kB"}]}');

/***/ }),

/***/ "./src/blocks/PluginInfoCard/block.json":
/*!**********************************************!*\
  !*** ./src/blocks/PluginInfoCard/block.json ***!
  \**********************************************/
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","title":"WP Plugin Info Card","apiVersion":2,"name":"wp-plugin-info-card/wp-plugin-info-card","category":"wp-plugin-info-card","icon":"<svg version=\'1.1\' id=\'Calque_1\' xmlns=\'http://www.w3.org/2000/svg\' x=\'0px\' y=\'0px\' width=\'24\' height=\'24\' viewBox=\'0 0 850.39 850.39\' enable-background=\'new 0 0 850.39 850.39\'><path fill=\'#333\' d=\'M425.195,2C190.366,2,0,191.918,0,426.195C0,660.472,190.366,850.39,425.195,850.39 c234.828,0,425.195-189.918,425.195-424.195C850.39,191.918,660.023,2,425.195,2z M662.409,476.302l-2.624,4.533L559.296,654.451 l78.654,45.525l-228.108,105.9L388.046,555.33l78.653,45.523l69.391-119.887l-239.354-0.303l-94.925-0.337l-28.75-0.032l-0.041-0.07 h0l-24.361-42.303l28.111-48.563l109.635-189.419l-78.653-45.524L435.859,48.514l21.797,250.546l-78.654-45.525l-69.391,119.887 l239.353,0.303l123.676,0.37l16.571,28.772l7.831,13.596L662.409,476.302z\'></path></svg>","description":"Add a beautiful plugin or theme info card to your site.","keywords":["wp plugin","plugin","card","theme"],"version":"1.0.0","textdomain":"wp-plugin-info-card","attributes":{"assetData":{"type":"array","default":[]},"type":{"type":"string","default":"plugin"},"slug":{"type":"string","default":"wp-plugin-info-card"},"loading":{"type":"boolean","default":true},"html":{"type":"string","default":""},"align":{"type":"string","default":"full"},"image":{"type":"string","default":""},"containerid":{"type":"string","default":""},"margin":{"type":"string","default":""},"clear":{"type":"string","default":"none"},"expiration":{"type":"number","default":0},"ajax":{"type":"string","default":"false"},"scheme":{"type":"string","default":"default"},"layout":{"type":"string","default":"card"},"custom":{"type":"string","default":""},"width":{"type":"string","default":""},"preview":{"type":"boolean","default":false},"multi":{"type":"boolean","default":false},"defaultsApplied":{"type":"boolean","default":false},"cols":{"type":"number","default":1},"colGap":{"type":"number","default":20},"rowGap":{"type":"number","default":20},"uniqueId":{"type":"string","default":""}},"example":{"attributes":{"preview":true}},"supports":{"anchor":true,"align":["left","center","right","full"],"className":true},"editorScript":"wp-plugin-info-card-block-js","editorStyle":["wp-plugin-info-card-block-editor-css","wp-plugin-info-card-block-styles-css"]}');

/***/ }),

/***/ "./src/blocks/PluginInfoCardQuery/block.json":
/*!***************************************************!*\
  !*** ./src/blocks/PluginInfoCardQuery/block.json ***!
  \***************************************************/
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","title":"WP Plugin Info Card Query","apiVersion":2,"name":"wp-plugin-info-card/wp-plugin-info-card-query","category":"wp-plugin-info-card","icon":"<svg height=\'24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 512 512\'><path fill=\'#333\' d=\'M256 140c-63.962 0-116 52.038-116 116s52.038 116 116 116 116-52.038 116-116-52.038-116-116-116zm-60.25 59.875h86.635l-4.578-5.045c-5.566-6.135-5.106-15.622 1.029-21.188 6.136-5.567 15.621-5.106 21.188 1.029l27.333 30.125c5.188 5.718 5.188 14.441 0 20.159l-27.333 30.125a14.958 14.958 0 0 1-11.113 4.92 14.945 14.945 0 0 1-10.075-3.891c-6.135-5.567-6.596-15.053-1.029-21.188l4.578-5.045H195.75c-8.284 0-15-6.716-15-15s6.716-15.001 15-15.001zm120.5 112.25h-86.635l4.578 5.045c5.566 6.135 5.106 15.622-1.029 21.188a14.948 14.948 0 0 1-10.075 3.891 14.964 14.964 0 0 1-11.113-4.92l-27.333-30.125c-5.188-5.718-5.188-14.441 0-20.159l27.333-30.125c5.567-6.135 15.054-6.596 21.188-1.029 6.135 5.567 6.596 15.053 1.029 21.188l-4.578 5.045h86.635c8.284 0 15 6.716 15 15s-6.716 15.001-15 15.001z\'></path><path fill=\'#333\' d=\'M497 199.92h-33.479a212.647 212.647 0 0 0-21.142-50.991l23.688-23.688c5.858-5.858 5.858-15.355 0-21.213l-58.095-58.095c-5.857-5.858-15.355-5.858-21.213 0L363.07 69.621a212.647 212.647 0 0 0-50.991-21.142V15c0-8.284-6.716-15-15-15H214.92c-8.284 0-15 6.716-15 15v33.479a212.664 212.664 0 0 0-50.991 21.142l-23.688-23.688c-5.857-5.858-15.355-5.858-21.213 0l-58.095 58.095c-5.858 5.858-5.858 15.355 0 21.213l23.688 23.688a212.647 212.647 0 0 0-21.142 50.991H15c-8.284 0-15 6.716-15 15v82.159c0 8.284 6.716 15 15 15h33.479a212.664 212.664 0 0 0 21.142 50.991l-23.688 23.688c-5.858 5.858-5.858 15.355 0 21.213l58.095 58.095c5.857 5.858 15.355 5.858 21.213 0l23.688-23.688a212.633 212.633 0 0 0 50.991 21.143V497c0 8.284 6.716 15 15 15h82.159c8.284 0 15-6.716 15-15v-33.479a212.568 212.568 0 0 0 50.991-21.143l23.688 23.688c5.857 5.858 15.355 5.858 21.213 0l58.095-58.095c5.858-5.858 5.858-15.355 0-21.213l-23.688-23.688a212.647 212.647 0 0 0 21.142-50.991H497c8.284 0 15-6.716 15-15V214.92c0-8.284-6.716-15-15-15zM256 402c-80.505 0-146-65.495-146-146s65.495-146 146-146 146 65.495 146 146-65.495 146-146 146z\'></path></svg>","description":"Query and display a list of plugins or themes in a beautiful card format.","keywords":["wp plugin","plugin","card","theme","query"],"version":"1.0.0","textdomain":"wp-plugin-info-card","attributes":{"assetData":{"type":"array","default":[]},"search":{"type":"string","default":""},"tag":{"type":"string","default":""},"author":{"type":"string","default":""},"user":{"type":"string","default":""},"browse":{"type":"string","default":""},"per_page":{"type":"string","default":"8"},"cols":{"type":"number","default":2},"type":{"type":"string","default":"plugin"},"slug":{"type":"string","default":""},"loading":{"type":"boolean","default":false},"html":{"type":"string","default":""},"align":{"type":"string","default":"full"},"image":{"type":"string","default":""},"containerid":{"type":"string","default":""},"margin":{"type":"string","default":""},"clear":{"type":"string","default":"none"},"expiration":{"type":"number","default":0},"ajax":{"type":"string","default":"false"},"scheme":{"type":"string","default":"default"},"layout":{"type":"string","default":"card"},"custom":{"type":"string","default":""},"width":{"type":"string","default":""},"preview":{"type":"boolean","default":false},"defaultsApplied":{"type":"boolean","default":false},"sortby":{"type":"string","default":"none"},"sort":{"type":"string","default":"ASC"}},"example":{"attributes":{"preview":true}},"supports":{"anchor":true,"align":false,"className":true},"editorScript":"wp-plugin-info-card-block-js","editorStyle":["wp-plugin-info-card-block-editor-css","wp-plugin-info-card-block-styles-css"]}');

/***/ }),

/***/ "./src/blocks/PluginScreenshotsInfoCard/block.json":
/*!*********************************************************!*\
  !*** ./src/blocks/PluginScreenshotsInfoCard/block.json ***!
  \*********************************************************/
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","title":"Plugin Screenshots Info Card","apiVersion":2,"name":"wp-plugin-info-card/plugin-screenshots-info-card","category":"wp-plugin-info-card","icon":"<svg viewBox=\'0 0 80 80\'><path d=\'M47,41.5c0,3.9-3.1,7-7,7s-7-3.1-7-7s3.1-7,7-7S47,37.6,47,41.5z M59,31.5v20c0,1.7-1.3,3-3,3H24c-1.7,0-3-1.3-3-3v-20 c0-1.7,1.3-3,3-3h8c0.4,0,0.8-0.3,0.9-0.7l1.8-5.3h10.6l1.8,5.3c0.1,0.4,0.5,0.7,0.9,0.7h8C57.7,28.5,59,29.8,59,31.5z M49,41.5 c0-5-4-9-9-9s-9,4-9,9s4,9,9,9S49,46.5,49,41.5z M76,40c0,19.9-16.1,36-36,36S4,59.9,4,40S20.1,4,40,4S76,20.1,76,40z M61,31.5 c0-2.8-2.2-5-5-5h-7.3l-1.8-5.3c-0.1-0.4-0.5-0.7-0.9-0.7H34c-0.4,0-0.8,0.3-0.9,0.7l-1.8,5.3H24c-2.8,0-5,2.2-5,5v20 c0,2.8,2.2,5,5,5h32c2.8,0,5-2.2,5-5V31.5z\'/></svg>","description":"Add a beautiful plugin card with screenshots.","keywords":["wp plugin","plugin","card","theme","screenshot"],"version":"1.0.0","textdomain":"wp-plugin-info-card","attributes":{"uniqueId":{"type":"string","default":""},"preview":{"type":"boolean","default":false},"screen":{"type":"string","default":"slug-entry"},"assetData":{"type":"object","default":{}},"type":{"type":"string","default":"plugin"},"slug":{"type":"string","default":"highlight-and-share"},"loading":{"type":"boolean","default":true},"imageSize":{"type":"string","default":"thumbnail"},"iconStyle":{"type":"string","default":"border"},"enableRoundedIcon":{"type":"boolean","default":true},"colorTheme":{"type":"string","default":"default"},"customColors":{"type":"boolean","default":false},"pluginTitle":{"type":"string","default":""},"enableContextMenu":{"type":"boolean","default":true},"enableScreenshots":{"type":"boolean","default":true},"imageSource":{"type":"string","default":"local"},"images":{"type":"array","default":[]},"align":{"type":"string","default":"center"},"colorBackground":{"type":"string","default":"#FFFFFF"},"colorText":{"type":"string","default":"#000000"},"colorBorder":{"type":"string","default":"#000000"},"colorMenuBorder":{"type":"string","default":"#000000"},"colorMenu":{"type":"string","default":"#000000"},"colorMenuHover":{"type":"string","default":"#DDDDDD"},"colorMenuText":{"type":"string","default":"#FFFFFF"},"colorMenuTextHover":{"type":"string","default":"#000000"},"colorScreenshotsBackground":{"type":"string","default":"#DDDDDD"},"colorScreenshotsBorder":{"type":"string","default":"#000000"},"colorScreenshotsArrowBackground":{"type":"string","default":"#333333"},"colorScreenshotsArrowBackgroundHover":{"type":"string","default":"#000000"},"colorScreenshotsArrow":{"type":"string","default":"#EEEEEE"},"colorScreenshotsArrowHover":{"type":"string","default":"#FFFFFF"},"colorStar":{"type":"string","default":"#FF9529"},"colorMetaBackground":{"type":"string","default":"#000000"},"colorMetaText":{"type":"string","default":"#FFFFFF"}},"example":{"attributes":{"preview":true}},"supports":{"anchor":true,"align":["wide","center","full"],"className":true},"editorScript":"wp_plugin_info_card-cgb-block-js","editorStyle":["wp_plugin_info_card-cgb-block-editor-css","wp_plugin_info_card-cgb-style-css","wp-plugin-info-card-block-editor-css-inline"],"style":"has-style-frontend-css"}');

/***/ }),

/***/ "./src/blocks/SitePluginsCardGrid/block.json":
/*!***************************************************!*\
  !*** ./src/blocks/SitePluginsCardGrid/block.json ***!
  \***************************************************/
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","title":"Site Plugins Card Grid","apiVersion":2,"name":"wp-plugin-info-card/site-plugins-card-grid","category":"wp-plugin-info-card","icon":"<svg height=\'24\' viewBox=\'0 0 122.88 122.88\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path fill=\'#333\' d=\'M0 0v122.88h122.88V0zm115.2 38.4H84.479V7.68H115.2zM46.08 76.8V46.08H76.8V76.8zm30.72 7.68v30.72H46.08V84.48zM38.4 76.8H7.68V46.08H38.4zm7.68-38.4V7.68H76.8V38.4zm38.399 7.68H115.2V76.8H84.479zM38.4 7.68V38.4H7.68V7.68zM7.68 84.48H38.4v30.72H7.68zm76.799 30.72V84.48H115.2v30.72z\'></path></svg>","description":"Display all your active plugins in a grid layout.","keywords":["wp plugin","site","grid","plugin","card","active"],"version":"1.0.0","textdomain":"wp-plugin-info-card","attributes":{"assetData":{"type":"array","default":[]},"uniqueId":{"type":"string","default":""},"align":{"type":"string","default":"center"},"loading":{"type":"boolean","default":true},"scheme":{"type":"string","default":"default"},"layout":{"type":"string","default":"card"},"preview":{"type":"boolean","default":false},"defaultsApplied":{"type":"boolean","default":false},"sortby":{"type":"string","default":"none"},"sort":{"type":"string","default":"ASC"},"cols":{"type":"number","default":2},"colGap":{"type":"number","default":20},"rowGap":{"type":"number","default":20}},"example":{"attributes":{"preview":true}},"supports":{"anchor":true,"align":false,"className":true},"editorScript":"wp-plugin-info-card-block-js","editorStyle":["wp-plugin-info-card-block-editor-css","wp-plugin-info-card-block-styles-css"]}');

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
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _blocks_components_InfoCardIcon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./blocks/components/InfoCardIcon */ "./src/blocks/components/InfoCardIcon.js");
/* harmony import */ var _blocks_PluginInfoCard_block__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./blocks/PluginInfoCard/block */ "./src/blocks/PluginInfoCard/block.js");
/* harmony import */ var _blocks_PluginInfoCardQuery_wppic_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./blocks/PluginInfoCardQuery/wppic-query */ "./src/blocks/PluginInfoCardQuery/wppic-query.js");
/* harmony import */ var _blocks_SitePluginsCardGrid_block__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./blocks/SitePluginsCardGrid/block */ "./src/blocks/SitePluginsCardGrid/block.js");
/* harmony import */ var _blocks_PluginScreenshotsInfoCard_block__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./blocks/PluginScreenshotsInfoCard/block */ "./src/blocks/PluginScreenshotsInfoCard/block.js");
/**
 * Gutenberg Blocks
 *
 * All blocks related JavaScript files should be imported here.
 * You can create a new block folder in this dir and include code
 * for that block here as well.
 *
 * All blocks should be included here since this is the file that
 * Webpack is compiling as the input file.
 */






/**
 * Add Block Category Icon.
 */
(function () {
  var a = /*#__PURE__*/React.createElement(_blocks_components_InfoCardIcon__WEBPACK_IMPORTED_MODULE_0__["default"], {
    fill: "#DB3939"
  });
  wp.blocks.updateCategory('wp-plugin-info-card', {
    icon: a
  });
})();
}();
/******/ })()
;
//# sourceMappingURL=wppic-blocks.js.map