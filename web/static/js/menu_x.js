(function () {
    var util, base, pan, tap, pinch, bezier, timer, scrollbar, _boundry_, core, _event_, _easing_, _pulldown_, _pullup_;
    util = function (exports) {
        function Empty() {
        }

        function createObject(proto, constructor) {
            var newProto;
            if (Object.create) {
                newProto = Object.create(proto)
            } else {
                Empty.prototype = proto;
                newProto = new Empty()
            }
            newProto.constructor = constructor;
            return newProto
        }

        var Util = {
            mix: function (to, from, deep) {
                for (var i in from) {
                    to[i] = from[i]
                }
                return to
            }, extend: function (r, s, px, sx) {
                if (!s || !r) {
                    return r
                }
                var sp = s.prototype, rp;
                rp = createObject(sp, r);
                r.prototype = this.mix(rp, r.prototype);
                r.superclass = createObject(sp, s);
                if (px) {
                    this.mix(rp, px)
                }
                if (sx) {
                    this.mix(r, sx)
                }
                return r
            }, vendor: function () {
                var el = document.createElement("div").style;
                var vendors = ["t", "webkitT", "MozT", "msT", "OT"], transform, i = 0, l = vendors.length;
                for (; i < l; i++) {
                    transform = vendors[i] + "ransform";
                    if (transform in el) {
                        return vendors[i].substr(0, vendors[i].length - 1)
                    }
                }
                return false
            }(), prefixStyle: function (style) {
                if (this.vendor === false) {
                    return false
                }
                if (this.vendor === "") {
                    return style
                }
                return this.vendor + style.charAt(0).toUpperCase() + style.substr(1)
            }, hasClass: function (el, className) {
                return el && el.className && el.className.indexOf(className) != -1
            }, addClass: function (el, className) {
                if (el && !this.hasClass(el, className)) {
                    el.className += " " + className
                }
            }, removeClass: function (el, className) {
                if (el && el.className) {
                    el.className = el.className.replace(className, "")
                }
            }, getOffsetTop: function (e) {
                var offset = e.offsetTop;
                if (e.offsetParent != null) {
                    offset += this.getOffsetTop(e.offsetParent)
                }
                return offset
            }, getOffsetLeft: function (e) {
                var offset = e.offsetLeft;
                if (e.offsetParent != null) {
                    offset += this.getOffsetLeft(e.offsetParent)
                }
                return offset
            }, guid: function () {
                return Math.round(Math.random() * 100000000)
            }, isAndroid: function () {
                return /Android /.test(window.navigator.appVersion)
            }, isBadAndroid: function () {
                return /Android /.test(window.navigator.appVersion) && !/Chrome\/\d/.test(window.navigator.appVersion)
            }
        };
        if (typeof module == "object" && module.exports) {
            exports = Util
        } else {
            return Util
        }
        return exports
    }({});
    base = function (exports) {
        var Util = util;
        var Base = function () {
            this.__events = {}
        };
        Util.mix(Base.prototype, {
            plug: function (plugin) {
                var self = this;
                if (!plugin || !plugin.pluginId) {
                    return
                }
                if (!self.__plugins) {
                    self.__plugins = []
                }
                plugin.pluginInitializer(self);
                self.__plugins.push(plugin)
            }, unplug: function (plugin) {
                var self = this;
                if (!plugin) {
                    return
                }
                var _plugin = typeof plugin == "string" ? self.getPlugin(plugin) : plugin;
                _plugin.pluginDestructor(self);
                for (var i in self.__plugins) {
                    if (self.__plugins[i] == _plugin) {
                        return self.__plugins.splice(i, 1)
                    }
                }
            }, getPlugin: function (pluginId) {
                var self = this;
                var plugins = [];
                for (var i in self.__plugins) {
                    if (self.__plugins[i] && self.__plugins[i].pluginId == pluginId) {
                        plugins.push(self.__plugins[i])
                    }
                }
                return plugins.length > 1 ? plugins : plugins[0] || null
            }, fire: function (evt) {
                var self = this;
                if (self.__events && self.__events[evt] && self.__events[evt].length) {
                    for (var i in self.__events[evt]) {
                        self.__events[evt][i].apply(this, [].slice.call(arguments, 1))
                    }
                }
            }, on: function (evt, fn) {
                var self = this;
                if (!this.__events) {
                    this.__events = {}
                }
                if (!this.__events[evt]) {
                    this.__events[evt] = []
                }
                this.__events[evt].push(fn)
            }, detach: function (evt, fn) {
                var self = this;
                if (!evt || !this.__events || !this.__events[evt]) {
                    return
                }
                var index = this.__events[evt].indexOf(fn);
                if (index > -1) {
                    this.__events[evt].splice(index, 1)
                } else {
                    if (self.__events && self.__events[evt] && undefined === fn) {
                        delete self.__events[evt]
                    }
                }
            }
        });
        if (typeof module == "object" && module.exports) {
            exports = Base
        } else {
            return Base
        }
        return exports
    }({});
    _event_ = function (exports) {
        var Util = util;
        var gestures = {};
        var Gesture = {
            on: function (el, type, handler) {
                el.addEventListener(type, handler);
                this.target = el;
                return this
            }, detach: function (el, type, handler) {
                this.target = null;
                el.removeEventListener(type, handler);
                return this
            }, dispatchEvent: function (tgt, type, args) {
                var event = document.createEvent("Event");
                event.initEvent(type, true, true);
                Util.mix(event, args);
                tgt.dispatchEvent(event)
            }, GESTURE_PREFIX: "xs", prefix: function (evt) {
                return this.GESTURE_PREFIX + evt[0].toUpperCase() + evt.slice(1)
            }
        };
        if (typeof module == "object" && module.exports) {
            exports = Gesture
        } else {
            return Gesture
        }
        return exports
    }({});
    pan = function (exports) {
        var Util = util;
        var Event = _event_;
        var doc = window.document;
        var PAN_START = Event.prefix("panstart"), PAN_END = Event.prefix("panend"), PAN = Event.prefix("pan"),
            MIN_SPEED = 0.35, MAX_SPEED = 8;
        var touch = {}, record = [];
        var startX = 0;
        var startY = 0;

        function touchMoveHandler(e) {
            if (e.touches.length > 1) {
                return
            }
            if (this.gestureType && this.gestureType != "pan") {
                return
            }
            if (this.gestureType == "") {
                record = []
            }
            if (!record.length) {
                touch = {};
                touch.startX = e.touches[0].clientX;
                touch.startY = e.touches[0].clientY;
                touch.deltaX = 0;
                touch.deltaY = 0;
                e.touch = touch;
                touch.prevX = touch.startX;
                touch.prevY = touch.startY;
                record.push({deltaX: touch.deltaX, deltaY: touch.deltaY, timeStamp: e.timeStamp});
                e.deltaX = touch.deltaX;
                e.deltaY = touch.deltaY;
                this.gestureType = "pan";
                Event.dispatchEvent(e.target, PAN_START, e)
            } else {
                if (this.gestureType != "pan") {
                    return
                }
                touch.deltaX = e.touches[0].clientX - touch.startX;
                touch.deltaY = e.touches[0].clientY - touch.startY;
                touch.directionX = e.touches[0].clientX - touch.prevX > 0 ? "right" : "left";
                touch.directionY = e.touches[0].clientY - touch.prevY > 0 ? "bottom" : "top";
                touch.prevX = e.touches[0].clientX;
                touch.prevY = e.touches[0].clientY;
                e.touch = touch;
                record.push({deltaX: touch.deltaX, deltaY: touch.deltaY, timeStamp: e.timeStamp});
                e.deltaX = touch.deltaX;
                e.deltaY = touch.deltaY;
                e.velocityX = 0;
                e.velocityY = 0;
                e.directionX = touch.directionX;
                e.directionY = touch.directionY;
                Event.dispatchEvent(e.target, PAN, e)
            }
        }

        function touchEndHandler(e) {
            var flickStartIndex = 0, flickStartYIndex = 0, flickStartXIndex = 0;
            if (e.touches.length > 1) {
                return
            }
            touch.deltaX = e.changedTouches[0].clientX - touch.startX;
            touch.deltaY = e.changedTouches[0].clientY - touch.startY;
            e.deltaX = touch.deltaX;
            e.deltaY = touch.deltaY;
            e.touch = touch;
            e.touch.record = record;
            var startX = e.touch.startX;
            var startY = e.touch.startY;
            var len = record.length;
            var startTime = record[0] && record[0]["timeStamp"];
            if (len < 2 || !startTime) {
                return
            }
            var duration = record[len - 1]["timeStamp"] - record[0]["timeStamp"];
            for (var i in record) {
                if (i > 0) {
                    record[i]["velocity"] = distance(record[i]["deltaX"], record[i]["deltaY"], record[i - 1]["deltaX"], record[i - 1]["deltaY"]) / (record[i]["timeStamp"] - record[i - 1]["timeStamp"]);
                    record[i]["velocityX"] = (record[i]["deltaX"] - record[i - 1]["deltaX"]) / (record[i]["timeStamp"] - record[i - 1]["timeStamp"]);
                    record[i]["velocityY"] = (record[i]["deltaY"] - record[i - 1]["deltaY"]) / (record[i]["timeStamp"] - record[i - 1]["timeStamp"])
                } else {
                    record[i]["velocity"] = 0;
                    record[i]["velocityX"] = 0;
                    record[i]["velocityY"] = 0
                }
            }
            var flagX = record[0]["velocityX"] / Math.abs(record[0]["velocityX"]);
            for (var i in record) {
                if (record[i]["velocityX"] / Math.abs(record[i]["velocityX"]) != flagX) {
                    flagX = record[i]["velocityX"] / Math.abs(record[i]["velocityX"]);
                    flickStartXIndex = i
                }
            }
            var flagY = record[0]["velocityY"] / Math.abs(record[0]["velocityY"]);
            for (var i in record) {
                if (record[i]["velocityY"] / Math.abs(record[i]["velocityY"]) != flagY) {
                    flagY = record[i]["velocityY"] / Math.abs(record[i]["velocityY"]);
                    flickStartYIndex = i
                }
            }
            flickStartIndex = Math.max(flickStartXIndex, flickStartYIndex);
            var flickStartRecord = record[flickStartIndex];
            e.touch.record = e.touch.record.splice(flickStartIndex - 1);
            var velocityObj = getSpeed(e.touch.record);
            e.velocityX = Math.abs(velocityObj.velocityX) > MAX_SPEED ? velocityObj.velocityX / Math.abs(velocityObj.velocityX) * MAX_SPEED : velocityObj.velocityX;
            e.velocityY = Math.abs(velocityObj.velocityY) > MAX_SPEED ? velocityObj.velocityY / Math.abs(velocityObj.velocityY) * MAX_SPEED : velocityObj.velocityY;
            e.velocity = Math.sqrt(Math.pow(e.velocityX, 2) + Math.pow(e.velocityY, 2));
            touch = {};
            record = [];
            if (this.gestureType == "pan") {
                Event.dispatchEvent(e.target, PAN_END, e);
                this.gestureType = ""
            }
        }

        function distance(x, y, x2, y2) {
            return Math.sqrt(Math.pow(x2 - x, 2) + Math.pow(y2 - y, 2))
        }

        function getSpeed(record) {
            var velocityY = 0;
            var velocityX = 0;
            var len = record.length;
            for (var i = 0; i < len; i++) {
                velocityY += record[i]["velocityY"];
                velocityX += record[i]["velocityX"]
            }
            velocityY /= len;
            velocityX /= len;
            return {
                velocityY: Math.abs(record[len - 1]["velocityY"]) > MIN_SPEED ? velocityY : 0,
                velocityX: Math.abs(record[len - 1]["velocityX"]) > MIN_SPEED ? velocityX : 0
            }
        }

        document.addEventListener("touchmove", touchMoveHandler);
        document.addEventListener("touchend", touchEndHandler);
        var Pan = {
            PAN_START: PAN_START, PAN_END: PAN_END, PAN: PAN, reset: function () {
                record = []
            }
        };
        if (typeof module == "object" && module.exports) {
            exports = Pan
        } else {
            return Pan
        }
        return exports
    }({});
    tap = function (exports) {
        var Util = util;
        var Event = _event_;
        var TAP = Event.prefix("tap");
        var TAP_HOLD = Event.prefix("tapHold");
        var SINGLE_TAP = Event.prefix("singleTap");
        var DOUBLE_TAP = Event.prefix("doubleTap");
        var tap_max_touchtime = 250, tap_max_distance = 10, tap_hold_delay = 750, single_tap_delay = 200;
        var touches = [];
        var singleTouching = false;
        var tapHoldTimer = null;
        var doubleTapTimmer = null;

        function clearTouchArray() {
            if (touches.length > 2) {
                var tmpArray = [];
                for (var i = 1; i < touches.length; i++) {
                    tmpArray[i - 1] = touches[i]
                }
                touches = tmpArray
            }
        }

        function shouldExcludeTouches(touch) {
            clearTouchArray();
            if (touches.length == 0) {
                return false
            }
            var duration = touch.startTime - touches[touches.length - 1].startTime;
            if (duration < 10) {
                return true
            } else {
                return false
            }
        }

        function checkDoubleTap() {
            clearTouchArray();
            if (touches.length == 1) {
                return false
            }
            var duration = touches[1].startTime - touches[0].startTime;
            if (duration < single_tap_delay) {
                return true
            } else {
                return false
            }
        }

        function touchStart(e) {
            if (e.touches.length > 1) {
                singleTouching = false;
                return
            }
            var currentTarget = e.currentTarget;
            var target = e.target;
            var startX = e.changedTouches[0].clientX;
            var startY = e.changedTouches[0].clientY;
            singleTouching = {startX: startX, startY: startY, startTime: Number(new Date()), e: e};
            if (tapHoldTimer) {
                clearTimeout(tapHoldTimer)
            }
            var target = e.target;
            tapHoldTimer = setTimeout(function () {
                if (singleTouching) {
                    var eProxy = {};
                    Util.mix(eProxy, e);
                    Util.mix(eProxy, {type: TAP_HOLD, pageX: startX, pageY: startY, originalEvent: e});
                    Event.dispatchEvent(e.target, TAP_HOLD, eProxy)
                }
                clearTimeout(tapHoldTimer)
            }, tap_hold_delay)
        }

        function touchEnd(e) {
            if (!singleTouching) {
                return
            }
            var endX = e.changedTouches[0].clientX;
            var endY = e.changedTouches[0].clientY;
            var deltaX = Math.abs(endX - singleTouching.startX);
            var deltaY = Math.abs(endY - singleTouching.startY);
            Util.mix(singleTouching, {
                endX: endX,
                endY: endY,
                distance: Math.sqrt(deltaX * deltaX + deltaY * deltaY),
                timeSpan: Number(Number(new Date()) - singleTouching.startTime)
            });
            if (singleTouching.timeSpan > tap_max_touchtime) {
                singleTouching = false;
                return
            }
            if (singleTouching.distance > tap_max_distance) {
                singleTouching = false;
                return
            }
            if (!shouldExcludeTouches(singleTouching)) {
                touches.push(singleTouching)
            } else {
                return
            }
            clearTouchArray();
            var eProxy = {};
            Util.mix(eProxy, e);
            Util.mix(eProxy, {type: TAP, pageX: endX, pageY: endY, originalEvent: e});
            var target = e.target;
            Event.dispatchEvent(target, TAP, eProxy);
            if (doubleTapTimmer) {
                if (checkDoubleTap()) {
                    Util.mix(eProxy, {type: DOUBLE_TAP});
                    Event.dispatchEvent(target, DOUBLE_TAP, eProxy)
                }
                clearTimeout(doubleTapTimmer);
                doubleTapTimmer = null;
                return
            }
            doubleTapTimmer = setTimeout(function () {
                clearTimeout(doubleTapTimmer);
                doubleTapTimmer = null;
                Util.mix(eProxy, {type: SINGLE_TAP});
                Event.dispatchEvent(target, SINGLE_TAP, eProxy)
            }, single_tap_delay)
        }

        document.addEventListener("touchstart", touchStart);
        document.addEventListener("touchend", touchEnd);
        var Tap = {TAP: TAP, TAP_HOLD: TAP_HOLD, SINGLE_TAP: SINGLE_TAP, DOUBLE_TAP: DOUBLE_TAP};
        if (typeof module == "object" && module.exports) {
            exports = Tap
        } else {
            return Tap
        }
        return exports
    }({});
    pinch = function (exports) {
        var Util = util;
        var Event = _event_;
        var doc = window.document;
        var PINCH_START = Event.prefix("pinchStart"), PINCH_END = Event.prefix("pinchEnd"),
            PINCH = Event.prefix("pinch");

        function getDistance(p1, p2) {
            var deltaX = p1.pageX - p2.pageX, deltaY = p1.pageY - p2.pageY;
            return Math.sqrt(deltaX * deltaX + deltaY * deltaY)
        }

        function getOrigin(p1, p2) {
            return {pageX: p1.pageX / 2 + p2.pageX / 2, pageY: p1.pageY / 2 + p2.pageY / 2}
        }

        function pinchMoveHandler(e) {
            if (e.touches.length < 2 || e.changedTouches.length < 1) {
                return
            }
            e.preventDefault();
            var distance = getDistance(e.touches[0], e.touches[1]);
            var origin = getOrigin(e.touches[0], e.touches[1]);
            e.origin = origin;
            if (!this.isStart) {
                this.isStart = 1;
                this.startDistance = distance;
                this.gestureType = "pinch";
                Event.dispatchEvent(e.target, PINCH_START, e)
            } else {
                if (this.gestureType != "pinch") {
                    return
                }
                e.distance = distance;
                e.scale = distance / this.startDistance;
                e.origin = origin;
                Event.dispatchEvent(e.target, PINCH, e)
            }
        }

        function pinchEndHandler(e) {
            this.isStart = 0;
            if (this.gestureType != "pinch") {
                return
            }
            if (e.touches.length == 0) {
                Event.dispatchEvent(e.target, PINCH_END, e);
                this.gestureType = ""
            }
        }

        var Pinch = {
            init: function () {
                document.addEventListener("touchmove", pinchMoveHandler);
                document.addEventListener("touchend", pinchEndHandler)
            }, PINCH_START: PINCH_START, PINCH: PINCH, PINCH_END: PINCH_END
        };
        if (typeof module == "object" && module.exports) {
            exports = Pinch
        } else {
            return Pinch
        }
        return exports
    }({});
    _easing_ = function (exports) {
        var Easing = {
            "linear": [0, 0, 1, 1],
            "ease": [0.25, 0.1, 0.25, 1],
            "ease-out": [0, 0, 0.58, 1],
            "ease-in-out": [0.42, 0, 0.58, 1],
            "quadratic": [0.33, 0.66, 0.66, 1],
            "circular": [0.1, 0.57, 0.1, 1],
            "bounce": [0.71, 1.35, 0.47, 1.41],
            format: function (easing) {
                if (!easing) {
                    return
                }
                if (typeof easing === "string" && this[easing]) {
                    return this[easing] instanceof Array ? [" cubic-bezier(", this[easing], ") "].join("") : this[easing]
                }
                if (easing instanceof Array) {
                    return [" cubic-bezier(", easing, ") "].join("")
                }
                return easing
            }
        };
        if (typeof module == "object" && module.exports) {
            exports = Easing
        } else {
            return Easing
        }
        return exports
    }({});
    bezier = function (exports) {
        function Bezier(x1, y1, x2, y2, epsilon) {
            var curveX = function (t) {
                var v = 1 - t;
                return 3 * v * v * t * x1 + 3 * v * t * t * x2 + t * t * t
            };
            var curveY = function (t) {
                var v = 1 - t;
                return 3 * v * v * t * y1 + 3 * v * t * t * y2 + t * t * t
            };
            var derivativeCurveX = function (t) {
                var v = 1 - t;
                return 3 * (2 * (t - 1) * t + v * v) * x1 + 3 * (-t * t * t + 2 * v * t) * x2
            };
            return function (t) {
                var x = t, t0, t1, t2, x2, d2, i;
                for (t2 = x, i = 0; i < 8; i++) {
                    x2 = curveX(t2) - x;
                    if (Math.abs(x2) < epsilon) {
                        return curveY(t2)
                    }
                    d2 = derivativeCurveX(t2);
                    if (Math.abs(d2) < 0.000001) {
                        break
                    }
                    t2 = t2 - x2 / d2
                }
                t0 = 0, t1 = 1, t2 = x;
                if (t2 < t0) {
                    return curveY(t0)
                }
                if (t2 > t1) {
                    return curveY(t1)
                }
                while (t0 < t1) {
                    x2 = curveX(t2);
                    if (Math.abs(x2 - x) < epsilon) {
                        return curveY(t2)
                    }
                    if (x > x2) {
                        t0 = t2
                    } else {
                        t1 = t2
                    }
                    t2 = (t1 - t0) * 0.5 + t0
                }
                return curveY(t2)
            }
        }

        if (typeof module == "object" && module.exports) {
            exports = Bezier
        } else {
            return Bezier
        }
        return exports
    }({});
    timer = function (exports) {
        var Util = util;
        var Base = base;
        var Easing = _easing_;
        var Bezier = bezier;
        var RAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
            window.setTimeout(callback, 1000 / 60)
        };
        var vendors = ["webkit", "moz", "ms", "o"];
        var cancelRAF = window.cancelAnimationFrame;
        for (var i = 0; i < vendors.length; i++) {
            if (window[vendors[i] + "CancelAnimationFrame"] || window[vendors[i] + "CancelRequestAnimationFrame"]) {
                cancelRAF = window[vendors[i] + "CancelAnimationFrame"] || window[vendors[i] + "CancelRequestAnimationFrame"]
            }
        }
        cancelRAF = cancelRAF || window.clearTimeout;

        function Timer(cfg) {
            var self = this;
            self.cfg = Util.mix({easing: "linear"}, cfg)
        }

        Util.extend(Timer, Base, {
            reset: function (cfg) {
                var self = this;
                Util.mix(self.cfg, cfg);
                self.isfinished = false;
                self.percent = 0;
                delete self._stop
            }, run: function () {
                var self = this;
                var duration = self.cfg.duration;
                if (duration <= 0 || self.isfinished) {
                    return
                }
                self._hasFinishedPercent = self._stop && self._stop.percent || 0;
                delete self._stop;
                self.start = Date.now();
                self.percent = 0;
                var epsilon = 1000 / 60 / duration / 4;
                var b = Easing[self.cfg.easing];
                self.easingFn = Bezier(b[0], b[1], b[2], b[3], epsilon);
                self._run()
            }, _run: function () {
                var self = this;
                cancelRAF(self._raf);
                self._raf = RAF(function () {
                    self.now = Date.now();
                    self.duration = self.now - self.start;
                    self.progress = self.easingFn(self.duration / self.cfg.duration);
                    self.percent = self.duration / self.cfg.duration + self._hasFinishedPercent;
                    if (self.percent >= 1 || self._stop) {
                        self.percent = self._stop && self._stop.percent ? self._stop.percent : 1;
                        self.duration = self._stop && self._stop.duration ? self._stop.duration : self.duration;
                        var param = {percent: self.percent, duration: self.duration};
                        self.fire("run", param);
                        self.fire("stop", param);
                        if (self.percent >= 1) {
                            self.isfinished = true;
                            self.fire("end", {percent: 1, duration: self.duration})
                        }
                        return
                    }
                    self.fire("run", {percent: self.progress, duration: self.duration});
                    self._run()
                })
            }, stop: function () {
                var self = this;
                self._stop = {percent: self.percent, duration: self.duration, now: self.now};
                cancelRAF(self._raf)
            }
        });
        if (typeof module == "object" && module.exports) {
            exports = Timer
        } else {
            return Timer
        }
        return exports
    }({});
    scrollbar = function (exports) {
        var Util = util;
        var MIN_SCROLLBAR_SIZE = 60;
        var BAR_MIN_SIZE = 8;
        var transform = Util.prefixStyle("transform");
        var transformStr = Util.vendor ? ["-", Util.vendor, "-transform"].join("") : "transform";
        var transition = Util.prefixStyle("transition");
        var borderRadius = Util.prefixStyle("borderRadius");
        var transitionDuration = Util.prefixStyle("transitionDuration");
        var ScrollBar = function (cfg) {
            this.userConfig = cfg;
            this.init(cfg.xscroll)
        };
        Util.mix(ScrollBar.prototype, {
            init: function (xscroll) {
                var self = this;
                self.xscroll = xscroll;
                self.type = self.userConfig.type;
                self.isY = self.type == "y" ? true : false;
                var boundry = self.xscroll.boundry;
                self.containerSize = self.isY ? self.xscroll.containerHeight + boundry._xtop + boundry._xbottom : self.xscroll.containerWidth + boundry._xright + boundry._xleft;
                self.indicateSize = self.isY ? self.xscroll.height : self.xscroll.width;
                self.offset = self.xscroll.getOffset();
                self.render();
                self._bindEvt()
            }, destroy: function () {
                var self = this;
                self.scrollbar && self.scrollbar.remove();
                self.xscroll.detach("scaleanimate", self._update, self);
                self.xscroll.detach("scrollend", self._update, self);
                self.xscroll.detach("scrollanimate", self._update, self);
                !self.xscroll.userConfig.useTransition && self.xscroll.detach("scroll", self._update, self);
                delete self
            }, render: function () {
                var self = this;
                if (self.__isRender) {
                    return
                }
                self.__isRender = true;
                var xscroll = self.xscroll;
                var translateZ = xscroll.userConfig.gpuAcceleration ? " translateZ(0) " : "";
                var transform = translateZ ? transformStr + ":" + translateZ + ";" : "";
                var css = self.isY ? "opacity:0;width: 2px;position:absolute;bottom:5px;top:5px;right:2px;z-index:999;overflow:hidden;-webkit-border-radius:2px;-moz-border-radius:2px;-o-border-radius:2px;" + transform : "opacity:0;height:2px;position:absolute;left:5px;right:5px;bottom:2px;z-index:999;overflow:hidden;-webkit-border-radius:2px;-moz-border-radius:2px;-o-border-radius:2px;" + transform;
                self.scrollbar = document.createElement("div");
                self.scrollbar.style.cssText = css;
                xscroll.renderTo.appendChild(self.scrollbar);
                var size = self.isY ? "width:100%;" : "height:100%;";
                self.indicate = document.createElement("div");
                self.indicate.style.cssText = size + "position:absolute;background:rgba(0,0,0,0.3);-webkit-border-radius:2px;-moz-border-radius:2px;-o-border-radius:2px;";
                self.scrollbar.appendChild(self.indicate);
                self._update();
                self.hide()
            }, _update: function (offset, duration, easing) {
                var self = this;
                var offset = offset || self.xscroll.getOffset();
                var barInfo = self.computeScrollBar(offset);
                var size = self.isY ? "height" : "width";
                self.indicate.style[size] = Math.round(barInfo.size) + "px";
                if (duration && easing) {
                    self.scrollTo(barInfo.offset, duration, easing)
                } else {
                    self.moveTo(barInfo.offset)
                }
            }, computeScrollBar: function (offset) {
                var self = this;
                var type = self.isY ? "y" : "x";
                var offset = Math.round(offset && -offset[type]);
                var spacing = 10;
                var boundry = self.xscroll.boundry;
                self.containerSize = self.isY ? self.xscroll.containerHeight + boundry._xtop + boundry._xbottom : self.xscroll.containerWidth + boundry._xright + boundry._xleft;
                self.size = self.isY ? self.xscroll.height : self.xscroll.width;
                self.indicateSize = self.isY ? self.xscroll.height - spacing : self.xscroll.width - spacing;
                var indicateSize = self.indicateSize;
                var containerSize = self.containerSize;
                var offsetout = containerSize - self.size;
                var ratio = offset / containerSize;
                var barOffset = indicateSize * ratio;
                var barSize = Math.round(indicateSize * self.size / containerSize);
                var _barOffset = barOffset * (indicateSize - MIN_SCROLLBAR_SIZE + barSize) / indicateSize;
                if (barSize < MIN_SCROLLBAR_SIZE) {
                    barSize = MIN_SCROLLBAR_SIZE;
                    barOffset = _barOffset
                }
                if (barOffset < 0) {
                    barOffset = Math.abs(offset) * barSize / MIN_SCROLLBAR_SIZE > barSize - BAR_MIN_SIZE ? BAR_MIN_SIZE - barSize : offset * barSize / MIN_SCROLLBAR_SIZE
                } else {
                    if (barOffset + barSize > indicateSize && offset - offsetout > 0) {
                        var _offset = offset - containerSize + indicateSize + spacing;
                        if (_offset * barSize / MIN_SCROLLBAR_SIZE > barSize - BAR_MIN_SIZE) {
                            barOffset = indicateSize + spacing - BAR_MIN_SIZE
                        } else {
                            barOffset = indicateSize + spacing - barSize + _offset * barSize / MIN_SCROLLBAR_SIZE
                        }
                    }
                }
                self.barOffset = Math.round(barOffset);
                var result = {size: Math.round(barSize)};
                var _offset = {};
                _offset[type] = self.barOffset;
                result.offset = _offset;
                return result
            }, scrollTo: function (offset, duration, easing) {
                var self = this;
                var translateZ = self.xscroll.userConfig.gpuAcceleration ? " translateZ(0) " : "";
                self.isY ? self.indicate.style[transform] = "translateY(" + offset.y + "px) " + translateZ : self.indicate.style[transform] = "translateX(" + offset.x + "px) " + translateZ;
                self.indicate.style[transition] = ["all ", duration, "s ", easing, " 0"].join("")
            }, moveTo: function (offset) {
                var self = this;
                self.show();
                var translateZ = self.xscroll.userConfig.gpuAcceleration ? " translateZ(0) " : "";
                self.isY ? self.indicate.style[transform] = "translateY(" + offset.y + "px) " + translateZ : self.indicate.style[transform] = "translateX(" + offset.x + "px) " + translateZ;
                if (Util.isBadAndroid()) {
                    self.indicate.style[transitionDuration] = "0.001s"
                } else {
                    self.indicate.style[transition] = ""
                }
            }, _bindEvt: function () {
                var self = this;
                if (self.__isEvtBind) {
                    return
                }
                self.__isEvtBind = true;
                var type = self.isY ? "y" : "x";
                var isBoundryOut = function (type) {
                    return type == "x" ? self.xscroll.isBoundryOutLeft() && self.xscroll.isBoundryOutRight() : self.xscroll.isBoundryOutTop() && self.xscroll.isBoundryOutBottom()
                };
                if (self.xscroll.userConfig.useTransition) {
                    self.xscroll.on("pan", function (e) {
                        self._update(e.offset)
                    });
                    self.xscroll.on("scrollanimate", function (e) {
                        if (e.zoomType != type) {
                            return
                        }
                        self._update(e.offset, e.duration, e.easing)
                    });
                    self.xscroll.on("scaleanimate", function (e) {
                        self._update(e.offset)
                    })
                } else {
                    self.xscroll.on("scroll", function (e) {
                        self._update(e.offset)
                    })
                }
                self.xscroll.on("panend", function (e) {
                    if (Math.abs(e.velocity == 0) && !isBoundryOut(type)) {
                        self.hide()
                    }
                });
                self.xscroll.on("scrollend", function (e) {
                    if (e.zoomType.indexOf(type) > -1) {
                        self._update(e.offset);
                        if (!isBoundryOut(e.zoomType)) {
                            self.hide()
                        }
                    }
                })
            }, reset: function () {
                var self = this;
                self.offset = {x: 0, y: 0};
                self._update()
            }, hide: function () {
                var self = this;
                self.scrollbar.style.opacity = 0;
                self.scrollbar.style[transition] = "opacity 0.3s ease-out .5s"
            }, show: function () {
                var self = this;
                self.scrollbar.style.opacity = 1;
                if (Util.isBadAndroid()) {
                    self.scrollbar.style[transitionDuration] = "0.001s"
                } else {
                    self.scrollbar.style[transition] = ""
                }
            }
        });
        if (typeof module == "object" && module.exports) {
            exports = ScrollBar
        } else {
            return ScrollBar
        }
        return exports
    }({});
    _pulldown_ = function (exports) {
        var Util = util;
        var Base = base;
        var prefix;
        var containerCls;
        var content = "Pull Down To Refresh";
        var loadingContent = "Loading...";
        var PullDown = function (cfg) {
            PullDown.superclass.constructor.call(this);
            this.userConfig = Util.mix({
                content: content,
                height: 60,
                autoRefresh: true,
                downContent: "Pull Down To Refresh",
                upContent: "Release To Refresh",
                loadingContent: loadingContent,
                prefix: "xs-plugin-pulldown-"
            }, cfg)
        };
        Util.extend(PullDown, Base, {
            pluginId: "xscroll/plugin/pulldown", pluginInitializer: function (xscroll) {
                var self = this;
                self.xscroll = xscroll;
                prefix = self.userConfig.prefix;
                if (self.xscroll) {
                    self.xscroll.on("afterrender", function () {
                        self.render()
                    })
                }
            }, pluginDestructor: function () {
                var self = this;
                self.pulldown && self.pulldown.remove();
                self.xscroll.detach("panstart", self._panStartHandler, self);
                self.xscroll.detach("pan", self._panHandler, self);
                self.xscroll.detach("panend", self._panEndHandler, self);
                delete self
            }, render: function () {
                var self = this;
                if (self.__isRender) {
                    return
                }
                self.__isRender = true;
                var containerCls = prefix + "container";
                var height = self.userConfig.height || 60;
                var pulldown = self.pulldown = document.createElement("div");
                pulldown.className = containerCls;
                pulldown.style.position = "absolute";
                pulldown.style.width = "100%";
                pulldown.style.height = height + "px";
                pulldown.style.top = -height + "px";
                self.xscroll.container.appendChild(pulldown);
                Util.addClass(pulldown, prefix + self.status);
                pulldown.innerHTML = self.userConfig[self.status + "Content"] || self.userConfig.content;
                self._bindEvt()
            }, _bindEvt: function () {
                var self = this;
                if (self._evtBinded) {
                    return
                }
                self._evtBinded = true;
                var pulldown = self.pulldown;
                var xscroll = self.xscroll;
                xscroll.on("pan", function (e) {
                    self._panHandler(e)
                });
                xscroll.on("panstart", function (e) {
                    self._panStartHandler(e)
                });
                xscroll.on("panend", function (e) {
                    self._panEndHandler(e)
                })
            }, _changeStatus: function (status) {
                var prevVal = this.status;
                this.status = status;
                Util.removeClass(this.pulldown, prefix + prevVal);
                Util.addClass(this.pulldown, prefix + status);
                this.setContent(this.userConfig[status + "Content"]);
                if (prevVal != status) {
                    this.fire("statuschange", {prevVal: prevVal, newVal: status});
                    if (status == "loading") {
                        this.fire("loading")
                    }
                }
            }, reset: function (callback) {
                this.xscroll.boundry.resetTop();
                this.xscroll.bounce(true, callback);
                this._expanded = false
            }, _panStartHandler: function (e) {
                clearTimeout(this.loadingItv)
            }, _panHandler: function (e) {
                var self = this;
                var offsetTop = e.offset.y;
                var height = self.userConfig.height || 60;
                if (offsetTop < 0) {
                    return
                }
                self._changeStatus(Math.abs(offsetTop) < height ? "down" : "up")
            }, _panEndHandler: function (e) {
                var self = this;
                var xscroll = self.xscroll;
                var height = self.userConfig.height || 60;
                var offsetTop = xscroll.getOffsetTop();
                if (offsetTop > height) {
                    e.preventDefault();
                    xscroll.boundry.resetTop();
                    xscroll.boundry.expandTop(height);
                    xscroll.bounce(true, function () {
                        self._changeStatus("loading")
                    });
                    if (self.userConfig.autoRefresh) {
                        clearTimeout(self.loadingItv);
                        self.loadingItv = setTimeout(function () {
                            xscroll.boundry.resetTop();
                            xscroll.bounce(true, function () {
                                window.location.reload()
                            })
                        }, 800)
                    }
                }
            }, setContent: function (content) {
                var self = this;
                if (content) {
                    self.pulldown.innerHTML = content
                }
            }
        });
        if (typeof module == "object" && module.exports) {
            exports = PullDown
        } else {
            return PullDown
        }
        return exports
    }({});
    _pullup_ = function (exports) {
        var Util = util;
        var Base = base;
        var prefix;
        var containerCls;
        var loadingContent = "Loading...";
        var upContent = "Pull Up To Refresh";
        var downContent = "Release To Refresh";
        var pageEndContent = "Last Page";
        var PULL_UP_HEIGHT = 60;
        var HEIGHT = 40;
        var PullUp = function (cfg) {
            PullUp.superclass.constructor.call(this);
            this.userConfig = Util.mix({
                upContent: upContent,
                downContent: downContent,
                pageEndContent: pageEndContent,
                pullUpHeight: PULL_UP_HEIGHT,
                height: HEIGHT,
                autoRefresh: true,
                loadingContent: loadingContent,
                boundry: {},
                prefix: "xs-plugin-pullup-"
            }, cfg)
        };
        Util.extend(PullUp, Base, {
            pluginId: "xscroll/plugin/pullup", pluginInitializer: function (xscroll) {
                var self = this;
                self.xscroll = xscroll;
                prefix = self.userConfig.prefix;
                if (self.xscroll) {
                    self.xscroll.on("afterrender", function () {
                        self.render()
                    })
                }
            }, pluginDestructor: function () {
                var self = this;
                self.pullup && self.pullup.remove();
                self.xscroll.detach("scroll", self._scrollHandler);
                delete self
            }, render: function () {
                var self = this;
                if (self.__isRender) {
                    return
                }
                self.__isRender = true;
                var containerCls = prefix + "container";
                var height = self.userConfig.height;
                var pullup = self.pullup = document.createElement("div");
                pullup.className = containerCls;
                pullup.style.position = "absolute";
                pullup.style.width = "100%";
                pullup.style.height = height + "px";
                pullup.style.bottom = -height + "px";
                self.xscroll.container.appendChild(pullup);
                self.xscroll.boundry.expandBottom(40);
                Util.addClass(pullup, prefix + self.status);
                pullup.innerHTML = self.userConfig[self.status + "Content"] || self.userConfig.content;
                self._bindEvt()
            }, _bindEvt: function () {
                var self = this;
                if (self._evtBinded) {
                    return
                }
                self._evtBinded = true;
                var pullup = self.pullup;
                var xscroll = self.xscroll;
                xscroll.on("pan", function (e) {
                    self._scrollHandler(e)
                });
                self.__isBoundryOut = false;
                xscroll.on("boundryout", function () {
                    self.__isBoundryOut = true
                });
                xscroll.on("scroll", function (e) {
                    if (e.offset.y + xscroll.containerHeight > xscroll.height + xscroll.boundry._xtop + xscroll.boundry._xbottom) {
                        self.__isBoundryOut = false
                    }
                });
                if (self.userConfig.bufferHeight > 0) {
                    xscroll.on("scroll", function (e) {
                        if (!self.isLoading && Math.abs(e.offset.y) + xscroll.height + self.userConfig.height + self.userConfig.bufferHeight >= xscroll.containerHeight + xscroll.boundry._xtop + xscroll.boundry._xbottom) {
                            self._changeStatus("loading")
                        }
                    })
                }
                xscroll.on("scrollend", function (e) {
                    if (e.directionY == "top" && e.offset.y == xscroll.height - xscroll.containerHeight - self.userConfig.height) {
                        self._changeStatus("loading")
                    }
                })
            }, _scrollHandler: function (e) {
                var self = this;
                var xscroll = self.xscroll;
                var offsetTop = xscroll.getOffsetTop();
                if (offsetTop < xscroll.height - xscroll.containerHeight - self.userConfig.pullUpHeight) {
                    self._changeStatus("down")
                } else {
                    self._changeStatus("up")
                }
            }, _changeStatus: function (status) {
                if (status != "loading" && this.isLoading) {
                    return
                }
                var prevVal = this.status;
                this.status = status;
                Util.removeClass(this.pullup, prefix + prevVal);
                Util.addClass(this.pullup, prefix + status);
                this.setContent(this.userConfig[status + "Content"]);
                if (prevVal != status) {
                    this.fire("statuschange", {prevVal: prevVal, newVal: status});
                    if (status == "loading") {
                        this.isLoading = true;
                        this.fire("loading")
                    }
                }
            }, complete: function () {
                var self = this;
                var xscroll = self.xscroll;
                self.isLoading = false;
                self._changeStatus("up");
                if (!self.userConfig.bufferHeight) {
                    return
                }
                if (!self.__isBoundryOut) {
                    var trans = xscroll._bounce("y", xscroll._prevSpeed);
                    trans && self.xscroll.scrollY(trans.offset, trans.duration, trans.easing, function (e) {
                        xscroll._scrollEndHandler("y")
                    })
                }
            }, reset: function (callback) {
                this.xscroll.boundry.resetBottom();
                this.xscroll.bounce(true, callback);
                this._expanded = false
            }, setContent: function (content) {
                var self = this;
                if (content) {
                    self.pullup.innerHTML = content
                }
            }
        });
        if (typeof module == "object" && module.exports) {
            exports = PullUp
        } else {
            return PullUp
        }
        return exports
    }({});
    _boundry_ = function (exports) {
        var Util = util;
        var Base = base;
        var Boundry = function (cfg) {
            this.cfg = Util.mix({width: 0, height: 0}, cfg);
            this.init()
        };
        Util.extend(Boundry, Base, {
            init: function () {
                var self = this;
                self._xtop = 0;
                self._xright = 0;
                self._xleft = 0;
                self._xbottom = 0;
                self.refresh({width: self.cfg.width, height: self.cfg.height})
            }, reset: function () {
                this.resetTop();
                this.resetLeft();
                this.resetBottom();
                this.resetRight();
                return this
            }, resetTop: function () {
                this._xtop = 0;
                this.refresh();
                return this
            }, resetLeft: function () {
                this._xleft = 0;
                this.refresh();
                return this
            }, resetBottom: function () {
                this._xbottom = 0;
                this.refresh();
                return this
            }, resetRight: function () {
                this._xright = 0;
                this.refresh();
                return this
            }, expandTop: function (top) {
                this._xtop = top;
                this.refresh();
                return this
            }, expandLeft: function (left) {
                this._xleft = left;
                this.refresh();
                return this
            }, expandRight: function (right) {
                this._xright = right;
                this.refresh();
                return this
            }, expandBottom: function (bottom) {
                this._xbottom = bottom;
                this.refresh();
                return this
            }, refresh: function (cfg) {
                Util.mix(this.cfg, cfg);
                this.top = this._xtop;
                this.left = this._xleft;
                this.bottom = (cfg && cfg.height || this.cfg.height || 0) - this._xbottom;
                this.right = (cfg && cfg.width || this.cfg.width || 0) - this._xright;
                return this
            }
        });
        if (typeof module == "object" && module.exports) {
            exports = Boundry
        } else {
            return Boundry
        }
        return exports
    }({});
    core = function (exports) {
        var Base = base;
        var Util = util;
        var Event = _event_;
        var Pan = pan;
        var Tap = tap;
        var Pinch = pinch;
        var Timer = timer;
        var ScrollBar = scrollbar;
        var PullDown = _pulldown_;
        var PullUp = _pullup_;
        var Boundry = _boundry_;
        var Easing = _easing_;
        var XScroll = function (cfg) {
            XScroll.superclass.constructor.call(this);
            this.userConfig = cfg;
            this.init()
        };
        XScroll.Util = Util;
        XScroll.Plugin = {PullDown: PullDown, PullUp: PullUp};
        XScroll.Gesture = {Pan: Pan, Tap: Tap, Pinch: Pinch};
        var SCROLL_END = "scrollend";
        var SCROLL = "scroll";
        var PAN_END = "panend";
        var PAN_START = "panstart";
        var PAN = "pan";
        var PINCH_START = "pinchstart";
        var PINCH = "pinch";
        var PINCH_END = "pinchend";
        var SCROLL_ANIMATE = "scrollanimate";
        var SCALE_ANIMATE = "scaleanimate";
        var SCALE = "scale";
        var SCALE_END = "scaleend";
        var SNAP_START = "snapstart";
        var SNAP = "snap";
        var SNAP_END = "snapend";
        var AFTER_RENDER = "afterrender";
        var BOUNDRY_OUT = "boundryout";
        var SROLL_ACCELERATION = 0.001;
        var BOUNDRY_CHECK_DURATION = 500;
        var BOUNDRY_CHECK_EASING = "ease";
        var BOUNDRY_CHECK_ACCELERATION = 0.1;
        var PAN_RATE = 0.36;
        var SCALE_RATE = 0.7;
        var SCALE_TO_DURATION = 300;
        var transform = Util.prefixStyle("transform");
        var transition = Util.prefixStyle("transition");
        var transitionDuration = Util.prefixStyle("transitionDuration");
        var transformOrigin = Util.prefixStyle("transformOrigin");
        var transitionEnd = Util.vendor ? Util.prefixStyle("transitionEnd") : "transitionend";
        var transformStr = Util.vendor ? ["-", Util.vendor, "-transform"].join("") : "transform";
        var simulateMouseEvent = function (event, type) {
            if (event.touches.length > 1) {
                return
            }
            var touches = event.changedTouches, first = touches[0], simulatedEvent = document.createEvent("MouseEvent");
            simulatedEvent.initMouseEvent(type, true, true, window, 1, first.screenX, first.screenY, first.clientX, first.clientY, false, false, false, false, 0, null);
            event.target.dispatchEvent(simulatedEvent)
        };
        Util.extend(XScroll, Base, {
            version: "2.3.2", init: function () {
                var self = this;
                var userConfig = self.userConfig = Util.mix({
                    preventDefault: true,
                    snap: false,
                    snapWidth: 100,
                    snapHeight: 100,
                    snapRowIndex: 0,
                    snapColIndex: 0,
                    snapEasing: "ease",
                    snapDuration: 500,
                    snapColsNum: 1,
                    snapRowsNum: 1,
                    bounce: true,
                    bounceDirections: ["top", "right", "bottom", "left"],
                    scalable: false,
                    scrollbarX: true,
                    scrollbarY: true,
                    bounceSize: 100,
                    useTransition: true,
                    gpuAcceleration: true,
                    BOUNDRY_CHECK_EASING: BOUNDRY_CHECK_EASING,
                    BOUNDRY_CHECK_DURATION: BOUNDRY_CHECK_DURATION,
                    BOUNDRY_CHECK_ACCELERATION: BOUNDRY_CHECK_ACCELERATION,
                    easing: "quadratic"
                }, self.userConfig, undefined, undefined, true);
                self.guid = Util.guid();
                self.renderTo = userConfig.renderTo.nodeType ? userConfig.renderTo : document.querySelector(userConfig.renderTo);
                self.scale = userConfig.scale || 1;
                self.timer = {};
                self.boundryCheckEnabled = true;
                var clsPrefix = self.clsPrefix = userConfig.clsPrefix || "xs-";
                self.SROLL_ACCELERATION = userConfig.SROLL_ACCELERATION || SROLL_ACCELERATION;
                self.containerClsName = clsPrefix + "container";
                self.contentClsName = clsPrefix + "content";
                self.boundry = new Boundry();
                self.boundry.refresh()
            }, render: function () {
                var self = this;
                var userConfig = self.userConfig;
                self._createContainer();
                var width = userConfig.width || self.renderTo.offsetWidth;
                var height = userConfig.height || self.renderTo.offsetHeight || 0;
                self.width = width;
                self.height = height;
                var containerWidth = userConfig.containerWidth || self.content.offsetWidth;
                var containerHeight = userConfig.containerHeight || self.content.offsetHeight;
                self.containerWidth = containerWidth < self.width ? self.width : containerWidth;
                self.containerHeight = containerHeight < self.height ? self.height : containerHeight;
                self.initialContainerWidth = self.containerWidth;
                self.initialContainerHeight = self.containerHeight;
                var minScale = self.userConfig.minScale || Math.max(self.width / self.containerWidth, self.height / self.containerHeight);
                var maxScale = self.userConfig.maxScale || 1;
                self.minScale = minScale;
                self.maxScale = maxScale;
                self.boundry.refresh({width: self.scale * self.width, height: self.scale * self.height});
                self.fire(AFTER_RENDER);
                self.renderScrollBars();
                self.userConfig.snap && self.initSnap();
                self._bindEvt()
            }, renderScrollBars: function () {
                var self = this;
                if (self.userConfig.scrollbarX) {
                    self.scrollbarX = self.scrollbarX || new ScrollBar({xscroll: self, type: "x"});
                    self.scrollbarX._update();
                    self.scrollbarX.hide()
                }
                if (self.userConfig.scrollbarY) {
                    self.scrollbarY = self.scrollbarY || new ScrollBar({xscroll: self, type: "y"});
                    self.scrollbarY._update();
                    self.scrollbarY.hide()
                }
            }, _createContainer: function () {
                var self = this;
                if (self.__isContainerCreated) {
                    return
                }
                var renderTo = self.renderTo;
                var container = self.container = self.renderTo.getElementsByClassName(self.containerClsName)[0];
                var content = self.content = self.renderTo.getElementsByClassName(self.contentClsName)[0];
                container.style.position = "absolute";
                container.style.height = "100%";
                container.style.width = "100%";
                container.style[transformOrigin] = "0 0";
                content.style.position = "absolute";
                content.style[transformOrigin] = "0 0";
                self.translate({x: 0, y: 0});
                self.__isContainerCreated = true
            }, translate: function (offset) {
                this.translateX(offset.x);
                this.translateY(offset.y);
                return
            }, _scale: function (scale, originX, originY) {
                var self = this;
                if (!self.userConfig.scalable || self.scale == scale || !scale) {
                    return
                }
                if (!self.isScaling) {
                    self.scaleBegin = self.scale;
                    self.isScaling = true;
                    self.scaleBeginX = self.x;
                    self.scaleBeginY = self.y
                }
                if (originX) {
                    self.originX = originX
                }
                if (originY) {
                    self.originY = originY
                }
                var boundry = self.boundry;
                var containerWidth = scale * self.initialContainerWidth;
                var containerHeight = scale * self.initialContainerHeight;
                self.containerWidth = Math.round(containerWidth > self.width ? containerWidth : self.width);
                self.containerHeight = Math.round(containerHeight > self.height ? containerHeight : self.height);
                self.scale = scale;
                var x = originX * (self.initialContainerWidth * self.scaleBegin - self.containerWidth) + self.scaleBeginX;
                var y = originY * (self.initialContainerHeight * self.scaleBegin - self.containerHeight) + self.scaleBeginY;
                if (x > boundry.left) {
                    x = boundry.left
                }
                if (y > boundry.top) {
                    y = boundry.top
                }
                if (x < boundry.right - self.containerWidth) {
                    x = boundry.right - self.containerWidth
                }
                if (y < boundry.bottom - self.containerHeight) {
                    y = boundry.bottom - self.containerHeight
                }
                self.x = x;
                self.y = y;
                self._transform();
                self._noTransition()
            }, scaleTo: function (scale, originX, originY, duration, easing, callback) {
                var self = this;
                if (!self.userConfig.scalable || self.scale == scale || !scale) {
                    return
                }
                var duration = duration || 1;
                var easing = easing || "ease-out",
                    transitionStr = [transformStr, " ", duration / 1000, "s ", easing, " 0s"].join("");
                var scaleStart = self.scale;
                self.timer.scale = self.timer.scale || new Timer();
                self.timer.scale.reset({duration: duration});
                self.timer.scale.detach("run");
                self.timer.scale.on("run", function (e) {
                    var _scale = (scale - scaleStart) * e.percent + scaleStart;
                    self.fire(SCALE, {type: SCALE, scale: _scale, origin: {x: originX, y: originY}});
                    if (!self.userConfig.useTransition) {
                        self._scale(_scale, originX, originY)
                    }
                });
                self.timer.scale.detach("end");
                self.timer.scale.on("end", function () {
                    self.isScaling = false;
                    self.fire(SCALE_END, {type: SCALE_END, scale: self.scale, origin: {x: originX, y: originY}})
                });
                if (self.userConfig.useTransition) {
                    self._scale(scale, originX, originY);
                    self.container.style[transition] = transitionStr;
                    self.content.style[transition] = transitionStr
                }
                self.timer.scale.run();
                self.fire(SCALE_ANIMATE, {
                    scale: self.scale,
                    duration: duration,
                    easing: easing,
                    offset: {x: self.x, y: self.y},
                    origin: {x: originX, y: originY}
                })
            }, translateX: function (x) {
                this.x = x;
                this._transform()
            }, translateY: function (y) {
                this.y = y;
                this._transform()
            }, _noTransition: function () {
                var self = this;
                if (Util.isBadAndroid()) {
                    self.content.style[transitionDuration] = "0.001s";
                    self.container.style[transitionDuration] = "0.001s"
                } else {
                    self.content.style[transition] = "none";
                    self.container.style[transition] = "none"
                }
            }, stop: function () {
                var self = this;
                if (self.isScaling) {
                    return
                }
                var boundry = self.boundry;
                var offset = self.getOffset();
                if (offset.y > boundry.top || offset.y + self.containerHeight < boundry.bottom || offset.x > boundry.left || offset.x + self.containerWidth < boundry.right) {
                    return
                }
                if (self.userConfig.useTransition) {
                    self.translate(offset);
                    self._noTransition()
                }
                for (var i in self.timer) {
                    self.timer[i].stop()
                }
                self._bouncex = 0;
                self._bouncey = 0;
                self.fire(SCROLL_END, {type: SCROLL_END, offset: offset, scale: self.scale, zoomType: "xy"})
            }, enableGPUAcceleration: function () {
                this.userConfig.gpuAcceleration = true
            }, disableGPUAcceleration: function () {
                this.userConfig.gpuAcceleration = false
            }, _transform: function () {
                var scale = this.userConfig.scalable ? " scale(" + this.scale + ") " : "";
                var translateZ = this.userConfig.gpuAcceleration ? " translateZ(0) " : "";
                this.content.style[transform] = "translate(" + this.x + "px,0px) " + scale + translateZ;
                if (!this.userConfig.lockY) {
                    this.container.style[transform] = "translate(0px," + this.y + "px) " + translateZ
                }
            }, getOffset: function () {
                var self = this;
                return {x: self.getOffsetLeft(), y: self.getOffsetTop()}
            }, getOffsetTop: function () {
                if (this.lockY) {
                    return 0
                }
                var transY = window.getComputedStyle(this.container)[transform].match(/[-\d\.*\d*]+/g);
                return transY ? Math.round(transY[5]) : 0
            }, getOffsetLeft: function () {
                if (this.lockX) {
                    return 0
                }
                var transX = window.getComputedStyle(this.content)[transform].match(/[-\d\.*\d*]+/g);
                return transX ? Math.round(transX[4]) : 0
            }, scrollTo: function (offset, duration, easing, callback) {
                var self = this;
                var _offset = self.getOffset();
                var x = undefined === offset.x || isNaN(offset.x) ? -_offset.x : offset.x;
                var y = undefined === offset.y || isNaN(offset.y) ? -_offset.y : offset.y;
                self.scrollX(x, duration, easing, callback);
                self.scrollY(y, duration, easing, callback)
            }, scrollBy: function (offset, duration, easing, callback) {
                var self = this;
                self.scrollByX(offset.x, duration, easing, callback);
                self.scrollByY(offset.y, duration, easing, callback)
            }, scrollByX: function (x, duration, easing, callback) {
                var self = this;
                var left = -self.getOffsetLeft();
                self.scrollX(Number(x) + Number(left), duration, easing, callback)
            }, scrollByY: function (y, duration, easing, callback) {
                var self = this;
                var top = -self.getOffsetTop();
                self.scrollY(Number(y) + Number(top), duration, easing, callback)
            }, scrollX: function (x, duration, easing, callback) {
                var self = this;
                var x = Math.round(x);
                if (self.userConfig.lockX) {
                    return
                }
                var duration = duration || 0;
                var easing = easing || self.userConfig.easing;
                self._scrollHandler(-x, duration, callback, easing, "x")
            }, scrollY: function (y, duration, easing, callback) {
                var self = this;
                var y = Math.round(y);
                if (self.userConfig.lockY) {
                    return
                }
                var duration = duration || 0;
                var easing = easing || self.userConfig.easing;
                self._scrollHandler(-y, duration, callback, easing, "y")
            }, boundryCheckX: function (callback) {
                var self = this;
                if (!self.boundryCheckEnabled || self.userConfig.lockX) {
                    return
                }
                var offset = self.getOffset();
                var containerWidth = self.containerWidth;
                var boundry = self.boundry;
                if (offset.x > boundry.left) {
                    offset.x = boundry.left;
                    self.scrollX(-offset.x, self.userConfig.BOUNDRY_CHECK_DURATION, self.userConfig.BOUNDRY_CHECK_EASING, callback)
                } else {
                    if (offset.x + containerWidth < boundry.right) {
                        offset.x = boundry.right - containerWidth;
                        self.scrollX(-offset.x, self.userConfig.BOUNDRY_CHECK_DURATION, self.userConfig.BOUNDRY_CHECK_EASING, callback)
                    }
                }
            }, boundryCheckY: function (callback) {
                var self = this;
                if (!self.boundryCheckEnabled || self.userConfig.lockY) {
                    return
                }
                var offset = self.getOffset();
                var containerHeight = self.containerHeight;
                var boundry = self.boundry;
                if (offset.y > boundry.top) {
                    offset.y = boundry.top;
                    self.scrollY(-offset.y, BOUNDRY_CHECK_DURATION, BOUNDRY_CHECK_EASING, callback)
                } else {
                    if (offset.y + containerHeight < boundry.bottom) {
                        offset.y = boundry.bottom - containerHeight;
                        self.scrollY(-offset.y, BOUNDRY_CHECK_DURATION, BOUNDRY_CHECK_EASING, callback)
                    }
                }
            }, boundryCheck: function (callback) {
                this.boundryCheckX(callback);
                this.boundryCheckY(callback)
            }, bounce: function (isEnabled, callback) {
                this.boundryCheckEnabled = isEnabled;
                isEnabled ? this.boundryCheck(callback) : undefined;
                return
            }, _fireTouchStart: function (e) {
                this.fire("touchstart", e)
            }, _firePanStart: function (e) {
                this.fire(PAN_START, e)
            }, _firePan: function (e) {
                this.fire(PAN, e)
            }, _firePanEnd: function (e) {
                this.fire(PAN_END, e)
            }, _fireClick: function (eventName, e) {
                this.fire(eventName, e)
            }, __handlers: {
                touchstart: function (e) {
                    var self = this;
                    if (self.userConfig.preventDefault) {
                        e.preventDefault()
                    }
                    self._fireTouchStart(e);
                    if (self.isScrollingX || self.isScrollingY) {
                        self.stop()
                    }
                }, tap: function (e) {
                    var self = this;
                    self._fireClick("click", e);
                    if (!self.isScrollingX && !self.isScrollingY) {
                        if (Util.isBadAndroid() && e.target.tagName.toLowerCase() == "a") {
                            var href = e.target.getAttribute("href");
                            if (href) {
                                location.href = href
                            }
                        } else {
                            simulateMouseEvent(e, "click")
                        }
                    } else {
                        self.isScrollingX = false;
                        self.isScrollingY = false
                    }
                }, panstart: function (e) {
                    var self = this;
                    self._prevSpeed = 0;
                    var offset = self.offset = self.getOffset();
                    var boundry = self.boundry;
                    var containerWidth = self.containerWidth;
                    var containerHeight = self.containerHeight;
                    var boundry = self.boundry;
                    self.translate(offset);
                    self.__panstarted = true;
                    self._firePanStart(Util.mix(e, {offset: offset}));
                    return offset
                }, pan: function (e) {
                    var self = this;
                    if (!self.__panstarted) {
                        Pan.reset();
                        return
                    }
                    var boundry = self.boundry;
                    self.offset = self.offset || self.getOffset();
                    var posY = self.userConfig.lockY ? Number(self.offset.y) : Number(self.offset.y) + e.deltaY;
                    var posX = self.userConfig.lockX ? Number(self.offset.x) : Number(self.offset.x) + e.deltaX;
                    var bounce = self.userConfig.bounce;
                    var containerWidth = self.containerWidth;
                    var containerHeight = self.containerHeight;
                    if (posY > boundry.top) {
                        posY = bounce || self.getPlugin("xscroll/plugin/pulldown") ? (posY - boundry.top) * PAN_RATE + boundry.top : boundry.top
                    }
                    if (posY < boundry.bottom - containerHeight) {
                        posY = bounce ? posY + (boundry.bottom - containerHeight - posY) * PAN_RATE : boundry.bottom - containerHeight
                    }
                    if (posX > boundry.left) {
                        posX = bounce ? (posX - boundry.left) * PAN_RATE + boundry.left : boundry.left
                    }
                    if (posX < boundry.right - containerWidth) {
                        posX = bounce ? posX + (boundry.right - containerWidth - posX) * PAN_RATE : boundry.right - containerWidth
                    }
                    self.translate({x: posX, y: posY});
                    self._noTransition();
                    self.isScrollingX = false;
                    self.isScrollingY = false;
                    self.directionX = e.directionX == "left" ? "right" : e.directionX == "right" ? "left" : "";
                    self.directionY = e.directionY == "top" ? "bottom" : e.directionY == "bottom" ? "top" : "";
                    self._firePan(Util.mix(e, {
                        offset: {x: posX, y: posY},
                        directionX: e.directionX,
                        directionY: e.directionY,
                        triggerType: PAN
                    }));
                    self.fire(SCROLL, Util.mix(e, {
                        offset: {x: posX, y: posY},
                        directionX: self.directionX,
                        directionY: self.directionY,
                        triggerType: PAN
                    }))
                }, panend: function (e) {
                    var self = this;
                    var offset = self.getOffset();
                    var boundry = self.boundry;
                    self.__panstarted = false;
                    self._firePanEnd(e);
                    if (e.defaultPrevented) {
                        return
                    }
                    self.userConfig.snap ? self._snapAnimate(e) : self._scrollAnimate(e);
                    delete self.offset
                }
            }, _bindEvt: function () {
                var self = this;
                if (self.__isEvtBind) {
                    return
                }
                self.__isEvtBind = true;
                var renderTo = self.renderTo;
                var container = self.container;
                var content = self.content;
                var containerWidth = self.containerWidth;
                var containerHeight = self.containerHeight;
                if (Util.isBadAndroid()) {
                    Event.on(renderTo, "click", function (e) {
                        if (e.target.tagName.toLowerCase() == "a") {
                            e.preventDefault()
                        }
                    })
                }
                Event.on(renderTo, "touchstart", function (e) {
                    self.__handlers.touchstart.call(self, e)
                }).on(renderTo, Tap.TAP, function (e) {
                    self.__handlers.tap.call(self, e)
                }).on(renderTo, Pan.PAN_START, function (e) {
                    self.__handlers.panstart.call(self, e)
                }).on(renderTo, Pan.PAN, function (e) {
                    self.__handlers.pan.call(self, e)
                }).on(renderTo, Pan.PAN_END, function (e) {
                    self.__handlers.panend.call(self, e)
                });
                if (self.userConfig.useTransition) {
                    Event.on(container, transitionEnd, function (e) {
                        if (e.elapsedTime.toFixed(3) <= 0.001) {
                            return
                        }
                        if (e.target == content && !self.isScaling) {
                            self.__scrollEndCallbackX && self.__scrollEndCallbackX({type: "x"})
                        }
                        if (e.target == container && !self.isScaling) {
                            self.__scrollEndCallbackY && self.__scrollEndCallbackY({type: "y"})
                        }
                    }, false)
                }
                if (self.userConfig.scalable) {
                    var originX, originY;
                    Pinch.init();
                    Event.on(renderTo, Pinch.PINCH_START, function (e) {
                        scale = self.scale;
                        originX = (e.origin.pageX - self.x) / self.containerWidth;
                        originY = (e.origin.pageY - self.y) / self.containerHeight;
                        self.fire(PINCH_START, {scale: scale, origin: {x: originX, y: originY}})
                    });
                    Event.on(renderTo, Pinch.PINCH, function (e) {
                        var __scale = scale * e.scale;
                        if (__scale <= self.userConfig.minScale) {
                            __scale = 0.5 * self.userConfig.minScale * Math.pow(2, __scale / self.userConfig.minScale)
                        }
                        if (__scale >= self.userConfig.maxScale) {
                            __scale = 2 * self.userConfig.maxScale * Math.pow(0.5, self.userConfig.maxScale / __scale)
                        }
                        self._scale(__scale, originX, originY);
                        self.fire(PINCH, {scale: __scale, origin: {x: originX, y: originY}})
                    });
                    Event.on(renderTo, Pinch.PINCH_END, function (e) {
                        self.isScaling = false;
                        if (self.scale < self.minScale) {
                            self.scaleTo(self.minScale, originX, originY, SCALE_TO_DURATION)
                        } else {
                            if (self.scale > self.maxScale) {
                                self.scaleTo(self.maxScale, originX, originY, SCALE_TO_DURATION)
                            }
                        }
                        self.fire(PINCH_END, {scale: scale, origin: {x: originX, y: originY}})
                    });
                    Event.on(renderTo, Tap.DOUBLE_TAP, function (e) {
                        originX = (e.pageX - self.x) / self.containerWidth;
                        originY = (e.pageY - self.y) / self.containerHeight;
                        self.scale > self.minScale ? self.scaleTo(self.minScale, originX, originY, 200) : self.scaleTo(self.maxScale, originX, originY, 200)
                    })
                }
                Event.on(window, "resize", function (e) {
                    setTimeout(function () {
                        self.render();
                        self.boundryCheck()
                    }, 100)
                })
            }, initSnap: function () {
                var self = this;
                self.snapRowIndex = self.userConfig.snapRowIndex;
                self.snapColIndex = self.userConfig.snapColIndex
            }, snapTo: function (col, row, callback) {
                var self = this;
                var userConfig = self.userConfig;
                var snapWidth = userConfig.snapWidth;
                var snapHeight = userConfig.snapHeight;
                var snapColsNum = userConfig.snapColsNum;
                var snapRowsNum = userConfig.snapRowsNum;
                col = col >= snapColsNum ? snapColsNum - 1 : col < 0 ? 0 : col;
                row = row >= snapRowsNum ? snapRowsNum - 1 : row < 0 ? 0 : row;
                self.snapRowIndex = row;
                self.snapColIndex = col;
                var top = self.snapRowIndex * snapHeight;
                var left = self.snapColIndex * snapWidth;
                self.scrollTo({x: left, y: top}, userConfig.snapDuration, userConfig.snapEasing, callback)
            }, _snapAnimate: function (e) {
                var self = this;
                var userConfig = self.userConfig;
                var snapWidth = userConfig.snapWidth;
                var snapHeight = userConfig.snapHeight;
                var cx = snapWidth / 2;
                var cy = snapHeight / 2;
                var direction = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.touch.directionX : e.touch.directionY;
                if (e.velocity > 0.5) {
                    direction == "left" ? self.snapColIndex++ : direction == "right" ? self.snapColIndex-- : undefined;
                    direction == "top" ? self.snapRowIndex++ : direction == "bottom" ? self.snapRowIndex-- : undefined
                } else {
                    var offset = self.getOffset();
                    var left = Math.abs(offset.x);
                    var top = Math.abs(offset.y);
                    self.snapColIndex = Math.round(left / snapWidth);
                    self.snapRowIndex = Math.round(top / snapHeight)
                }
                self.snapTo(self.snapColIndex, self.snapRowIndex)
            }, _scrollAnimate: function (e) {
                var self = this;
                var userConfig = self.userConfig;
                var transX = self._bounce("x", e.velocityX);
                var transY = self._bounce("y", e.velocityY);
                var x = transX ? transX.offset : 0;
                var y = transY ? transY.offset : 0;
                var duration;
                if (transX && transY && transX.status && transY.status && transX.duration && transY.duration) {
                    duration = Math.max(transX.duration, transY.duration)
                }
                transX && self.scrollX(x, duration || transX.duration, transX.easing, function (e) {
                    self._scrollEndHandler("x")
                });
                transY && self.scrollY(y, duration || transY.duration, transY.easing, function (e) {
                    self._scrollEndHandler("y")
                });
                self.directionX = e.velocityX < 0 ? "left" : "right";
                self.directionY = e.velocityY < 0 ? "up" : "down"
            }, _scrollEndHandler: function (type) {
                var self = this;
                var TYPE = type.toUpperCase();
                var scrollFn = "scroll" + TYPE;
                var boundryCheckFn = "boundryCheck" + TYPE;
                var _bounce = "_bounce" + type;
                var boundry = self.boundry;
                var bounceSize = self.userConfig.bounceSize || 0;
                if (self[_bounce]) {
                    var minsize = type == "x" ? boundry.left : boundry.top;
                    var maxsize = type == "x" ? boundry.right : boundry.bottom;
                    var containerSize = type == "x" ? self.containerWidth : self.containerHeight;
                    var param = {zoomType: type, velocityX: 0, velocityY: 0, type: BOUNDRY_OUT};
                    param["velocity" + TYPE] = self[_bounce];
                    self.fire(BOUNDRY_OUT, param);
                    if (self.userConfig.bounce) {
                        var v = self[_bounce];
                        var a = 0.01 * v / Math.abs(v);
                        var t = v / a;
                        var s = self.getOffset()[type] + t * v / 2;
                        var tmin = 100;
                        var tmax = 150;
                        var oversize = 0;
                        if (s > minsize) {
                            if (s > minsize + bounceSize) {
                                s = minsize + bounceSize
                            }
                            oversize = Math.abs(s - minsize)
                        } else {
                            if (s < maxsize - containerSize) {
                                if (s < maxsize - containerSize - bounceSize) {
                                    s = maxsize - containerSize - bounceSize
                                }
                                oversize = Math.abs(maxsize - containerSize - s)
                            }
                        }
                        t = oversize / bounceSize * (tmax - tmin) + tmin;
                        self[scrollFn](-s, t, "linear", function () {
                            self[_bounce] = 0;
                            self[boundryCheckFn]()
                        })
                    }
                } else {
                    self[boundryCheckFn]()
                }
            }, isBoundryOut: function () {
                return this.isBoundryOutLeft() || this.isBoundryOutRight() || this.isBoundryOutTop() || this.isBoundryOutBottom()
            }, isBoundryOutLeft: function () {
                return -this.getOffsetLeft() < this.boundry.left
            }, isBoundryOutRight: function () {
                return this.containerWidth + this.getOffsetLeft() < this.boundry.right
            }, isBoundryOutTop: function () {
                return -this.getOffsetTop() < this.boundry.top
            }, isBoundryOutBottom: function () {
                return this.containerHeight + this.getOffsetTop() < this.boundry.bottom
            }, _bounce: function (type, v) {
                var self = this;
                var offset = self.getOffset()[type];
                var boundry = self.boundry;
                var boundryStart = type == "x" ? boundry.left : boundry.top;
                var boundryEnd = type == "x" ? boundry.right : boundry.bottom;
                var innerSize = type == "x" ? self.containerWidth : self.containerHeight;
                var size = boundryEnd - boundryStart;
                var userConfig = self.userConfig;
                var transition = {};
                if (v === 0) {
                    type == "x" ? self.boundryCheckX() : self.boundryCheckY();
                    return
                }
                if (type == "x" && self.userConfig.lockX) {
                    return
                }
                if (type == "y" && self.userConfig.lockY) {
                    return
                }
                var maxSpeed = userConfig.maxSpeed > 0 && userConfig.maxSpeed < 6 ? userConfig.maxSpeed : 3;
                if (v > maxSpeed) {
                    v = maxSpeed
                }
                if (v < -maxSpeed) {
                    v = -maxSpeed
                }
                if (offset > boundryStart || offset < size - innerSize) {
                    var a = userConfig.BOUNDRY_CHECK_ACCELERATION * (v / Math.abs(v));
                    var t = v / a;
                    var s = offset + t * v / 2;
                    transition.offset = -s;
                    transition.duration = t;
                    return transition
                }
                var a = self.SROLL_ACCELERATION * (v / Math.abs(v));
                var t = v / a;
                var s = offset / 1 + t * v / 2;
                if (s > boundryStart) {
                    var _s = boundryStart - offset;
                    var _t = (v - Math.sqrt(-2 * a * _s + v * v)) / a;
                    transition.offset = -boundryStart;
                    transition.duration = _t;
                    transition.easing = "linear";
                    self["_bounce" + type] = v - a * _t;
                    self._prevSpeed = 0
                } else {
                    if (s < size - innerSize) {
                        var _s = size - innerSize - offset;
                        var _t = (v + Math.sqrt(-2 * a * _s + v * v)) / a;
                        transition.offset = innerSize - size;
                        transition.duration = _t;
                        transition.easing = "linear";
                        self["_bounce" + type] = v - a * _t;
                        self._prevSpeed = v - a * _t
                    } else {
                        transition.offset = -s;
                        transition.duration = t;
                        transition.easing = self.userConfig.easing;
                        transition.status = "normal";
                        self["_bounce" + type] = 0;
                        self._prevSpeed = 0
                    }
                }
                self["isScrolling" + type.toUpperCase()] = true;
                return transition
            }, _scrollHandler: function (dest, duration, callback, easing, type) {
                var self = this;
                var offset = self.getOffset();
                var directions = type == "x" ? ["left", "right"] : ["top", "bottom"];
                var Type = type.toUpperCase();
                var el = type == "x" ? self.content : self.container;
                var transitionStr = "none";
                var __scrollEndCallbackFn = function (e) {
                    self["isScrolling" + Type] = false;
                    var _offset = self.getOffset();
                    var boundryout;
                    if (_offset[e.type] == self.boundry.top && Math.abs(self["_bounce" + type]) > 0) {
                        boundryout = type == "x" ? "left" : "top"
                    } else {
                        if (_offset[e.type] + self.containerHeight == self.boundry.bottom && Math.abs(self["_bounce" + type]) > 0) {
                            boundryout = type == "x" ? "right" : "bottom"
                        }
                    }
                    var params = {offset: _offset, zoomType: e.type, type: SCROLL_END};
                    if (boundryout) {
                        params.boundryout = boundryout
                    }
                    params["direction" + e.type.toUpperCase()] = dest - offset[e.type] < 0 ? directions[1] : directions[0];
                    self.fire(SCROLL_END, params);
                    callback && callback(e)
                };
                if (self.userConfig.useTransition) {
                    transitionStr = duration > 0 ? [transformStr, " ", duration / 1000, "s ", Easing.format(easing), " 0s"].join("") : "none";
                    el.style[transition] = transitionStr;
                    type == "x" ? self.translateX(dest) : self.translateY(dest)
                }
                self.timer[type] = self.timer[type] || new Timer();
                self.timer[type].reset({duration: duration, easing: easing});
                self.timer[type].detach("run");
                self.timer[type].on("run", function (e) {
                    var params = {zoomType: type, offset: self.getOffset(), type: SCROLL};
                    params["direction" + type.toUpperCase()] = dest - offset[type] < 0 ? directions[1] : directions[0];
                    if (!self.userConfig.useTransition) {
                        type == "x" ? self.translateX(e.percent * (dest - offset[type]) + offset[type]) : self.translateY(e.percent * (dest - offset[type]) + offset[type])
                    }
                    self.fire(SCROLL, params)
                });
                self.timer[type].detach("end");
                self.timer[type].on("end", function (e) {
                    if (!self.userConfig.useTransition) {
                        __scrollEndCallbackFn({type: type})
                    }
                });
                self.timer[type].stop();
                self.timer[type].run();
                if (duration <= 0 || dest == offset[type]) {
                    self.fire(SCROLL, {zoomType: type, offset: offset, type: SCROLL});
                    self.fire(SCROLL_END, {zoomType: type, offset: offset, type: SCROLL_END});
                    return
                }
                self["isScrolling" + Type] = true;
                if (self.userConfig.useTransition) {
                    self["__scrollEndCallback" + Type] = __scrollEndCallbackFn
                }
                self.fire(SCROLL_ANIMATE, {
                    transition: transitionStr,
                    offset: {x: self.x, y: self.y},
                    type: SCROLL_ANIMATE,
                    duration: duration / 1000,
                    easing: Easing.format(easing),
                    zoomType: type
                })
            }, addView: function (view, viewCfg) {
                var self = this;
                viewCfg = Util.mix({captureBounce: false, stopPropagation: true}, viewCfg);
                if (!view || !view instanceof XScroll) {
                    return
                }
                if (!self.__subViews) {
                    self.__subViews = {}
                }
                if (view.guid && !self.__subViews[view.guid]) {
                    view.__viewControllers = view.__viewControllers || {};
                    view.parentView = {instance: self};
                    view.__viewControllers.boundryout = function (e) {
                        self._scrollAnimate(e)
                    };
                    viewCfg.captureBounce && view.on("boundryout", view.__viewControllers.boundryout);
                    return self.__subViews[view.guid] = view
                }
                return
            }, removeView: function (view) {
                var self = this;
                if (!view || !view.guid) {
                    return
                }
                var subview = self.__subViews[view.guid];
                if (subview) {
                    delete subview.parentView;
                    for (var i in subview.__viewControllers) {
                        subview.detach(i, subview.__viewControllers[i])
                    }
                    subview.__viewControllers = {};
                    delete subview
                }
            }, getViews: function (guid) {
                if (guid) {
                    return this.__subViews[guid]
                }
                return this.__subViews
            }
        });
        if (typeof module == "object" && module.exports) {
            exports = XScroll
        } else {
            return window.XScroll = XScroll
        }
        return exports
    }({})
}());

//menu_x
function menuX(renderTo, cfg) {
    var xscroll = new XScroll({
        renderTo: renderTo,
        scrollbarY: false,
        scrollbarX: false,
        lockY: true
    });
    xscroll.render();
    var menuWidth = document.querySelector(renderTo + " li").offsetWidth;
    var curIndex = 0;

    //click to move
    xscroll.renderTo.addEventListener("click", function (e) {
        var offsetX = xscroll.getOffsetLeft();
        var index = Math.floor((e.pageX - 90) / menuWidth);
        switchTo(index);
        cfg && cfg.onSwitch && cfg.onSwitch(index);
        var content = document.getElementsByClassName("cur")[0].innerHTML;
        var _url = "http://localhost/CTicket/api/showTimesApi?show_date=" + content;
        ajaxRequest(_url);
    });
    var menus = document.querySelectorAll(renderTo + " li");
    switchTo(0);

    var content = document.getElementsByClassName("cur")[0].innerHTML;
    console.log(content);
    var _url = "http://localhost/CTicket/api/showTimesApi?show_date=" + content;
    ajaxRequest(_url);



    function ajaxRequest(_url) {
        var xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.open("GET", _url, true);
        xmlHttpRequest.onreadystatechange = function () {
            if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
                var jsonobj = JSON.parse(xmlHttpRequest.responseText);
                var tickets_list = document.getElementsByClassName("tickets-list")[0];
                var addelementContent = "<ul>";
                var show_time = jsonobj.object;
                var i = 0;
                for(;i<show_time.length;i++) {
                    addelementContent += "<li> <div class=\"ticket-info\"> ";
                    addelementContent += " <span class=\"start\">"+show_time[i].startTime+"</span>";
                    addelementContent += "   <span class=\"styles\">原版3D</span>";
                    addelementContent += "    <span>"+show_time[i].endTime+"(结束)</span>";
                    addelementContent += "   <span>"+show_time[i].room+"</span></div>";
                    addelementContent += "  <div class=\"buy-btn\">";
                    addelementContent += "  <span>"+show_time[i].price+"<b>元</b></span>";
                    addelementContent += " <a href=\"/CTicket/pages/order/choose_seat.jsp\" >选座购票</a></div> </li>";
                }
                tickets_list.innerHTML = addelementContent;
                console.log(jsonobj);
            }
        };
        xmlHttpRequest.send();
    };


    function switchTo(index) {
        if (index < 0 || index > menus.length - 1) return;
        for (var i in menus) {
            menus[i].className = "";
        }
        menus[index].className = "cur";
        var offset = index * menuWidth - xscroll.width / 2 + menuWidth / 2;
        if (offset < 0) {
            offset = 0;
        } else if (offset > xscroll.containerWidth - xscroll.width) {
            offset = xscroll.containerWidth - xscroll.width
        }
        xscroll.scrollX(offset, 200);
        curIndex = index;
    }

    function prevTo() {
        if (curIndex <= 0) {
            switchTo(curIndex);
            return;
        }
        curIndex--;
        switchTo(curIndex);
    }

    function nextTo() {
        if (curIndex >= menus.length - 1) {
            switchTo(curIndex);
            return;
        }
        curIndex++;
        switchTo(curIndex);
    }
}