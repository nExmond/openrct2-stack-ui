"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
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
Array.prototype.flatMapFunc = function (d) {
    if (d === void 0) { d = 1; }
    return d > 0 ? this.reduce(function (acc, val) { return acc.concat(Array.isArray(val) ? val.flatMapFunc(d - 1) : val); }, []) : this.slice();
};
Array.prototype.flatMap = function () {
    return this.flatMapFunc(1);
};
function uuid() {
    var uuidValue = "", k, randomValue;
    for (k = 0; k < 32; k++) {
        randomValue = Math.random() * 16 | 0;
        if (k == 8 || k == 12 || k == 16 || k == 20) {
            uuidValue += "-";
        }
        uuidValue += (k == 12 ? 4 : (k == 16 ? (randomValue & 3 | 8) : randomValue)).toString(16);
    }
    return uuidValue;
}
function plusSize(lhs, rhs) {
    return {
        width: lhs.width + rhs.width,
        height: lhs.height + rhs.height
    };
}
var UIAxis;
(function (UIAxis) {
    UIAxis[UIAxis["Vertical"] = 0] = "Vertical";
    UIAxis[UIAxis["Horizontal"] = 1] = "Horizontal";
})(UIAxis || (UIAxis = {}));
var UIColor;
(function (UIColor) {
    UIColor[UIColor["Black"] = 0] = "Black";
    UIColor[UIColor["Gray"] = 1] = "Gray";
    UIColor[UIColor["White"] = 2] = "White";
    UIColor[UIColor["DarkPurple"] = 3] = "DarkPurple";
    UIColor[UIColor["LightPurple"] = 4] = "LightPurple";
    UIColor[UIColor["BrightPurple"] = 5] = "BrightPurple";
    UIColor[UIColor["DarkBlue"] = 6] = "DarkBlue";
    UIColor[UIColor["LightBlue"] = 7] = "LightBlue";
    UIColor[UIColor["IcyBlue"] = 8] = "IcyBlue";
    UIColor[UIColor["DarkWater"] = 9] = "DarkWater";
    UIColor[UIColor["LightWater"] = 10] = "LightWater";
    UIColor[UIColor["SaturatedGreen"] = 11] = "SaturatedGreen";
    UIColor[UIColor["DarkGreen"] = 12] = "DarkGreen";
    UIColor[UIColor["MossGreen"] = 13] = "MossGreen";
    UIColor[UIColor["BrightGreen"] = 14] = "BrightGreen";
    UIColor[UIColor["OliveGreen"] = 15] = "OliveGreen";
    UIColor[UIColor["DarkOliveGreen"] = 16] = "DarkOliveGreen";
    UIColor[UIColor["BrightYellow"] = 17] = "BrightYellow";
    UIColor[UIColor["Yellow"] = 18] = "Yellow";
    UIColor[UIColor["DarkYellow"] = 19] = "DarkYellow";
    UIColor[UIColor["LightOrange"] = 20] = "LightOrange";
    UIColor[UIColor["DarkOrange"] = 21] = "DarkOrange";
    UIColor[UIColor["LightBrown"] = 22] = "LightBrown";
    UIColor[UIColor["SaturatedBrown"] = 23] = "SaturatedBrown";
    UIColor[UIColor["DarkBrown"] = 24] = "DarkBrown";
    UIColor[UIColor["SalmonPink"] = 25] = "SalmonPink";
    UIColor[UIColor["BordeauxRed"] = 26] = "BordeauxRed";
    UIColor[UIColor["SaturatedRed"] = 27] = "SaturatedRed";
    UIColor[UIColor["BrightRed"] = 28] = "BrightRed";
    UIColor[UIColor["DarkPink"] = 29] = "DarkPink";
    UIColor[UIColor["BrightPink"] = 30] = "BrightPink";
    UIColor[UIColor["LightPink"] = 31] = "LightPink";
})(UIColor || (UIColor = {}));
var UITextAlignment;
(function (UITextAlignment) {
    UITextAlignment["Left"] = "left";
    UITextAlignment["Center"] = "centred";
})(UITextAlignment || (UITextAlignment = {}));
var UIViewportScale;
(function (UIViewportScale) {
    UIViewportScale[UIViewportScale["One"] = 0] = "One";
    UIViewportScale[UIViewportScale["Half"] = 1] = "Half";
    UIViewportScale[UIViewportScale["Quater"] = 2] = "Quater";
    UIViewportScale[UIViewportScale["Eighth"] = 3] = "Eighth";
})(UIViewportScale || (UIViewportScale = {}));
var UIViewportFlag;
(function (UIViewportFlag) {
    UIViewportFlag[UIViewportFlag["None"] = 0] = "None";
    UIViewportFlag[UIViewportFlag["UndergroundInside"] = 1] = "UndergroundInside";
    UIViewportFlag[UIViewportFlag["SeethroughRides"] = 2] = "SeethroughRides";
    UIViewportFlag[UIViewportFlag["SeethroughScenery"] = 4] = "SeethroughScenery";
    UIViewportFlag[UIViewportFlag["InvisibleSupports"] = 8] = "InvisibleSupports";
    UIViewportFlag[UIViewportFlag["LandHeights"] = 16] = "LandHeights";
    UIViewportFlag[UIViewportFlag["TrackHeights"] = 32] = "TrackHeights";
    UIViewportFlag[UIViewportFlag["PathHeights"] = 64] = "PathHeights";
    UIViewportFlag[UIViewportFlag["Gridlines"] = 128] = "Gridlines";
    UIViewportFlag[UIViewportFlag["LandOwnership"] = 256] = "LandOwnership";
    UIViewportFlag[UIViewportFlag["ConstructionRights"] = 512] = "ConstructionRights";
    UIViewportFlag[UIViewportFlag["SoundOn"] = 1024] = "SoundOn";
    UIViewportFlag[UIViewportFlag["InvisiblePeeps"] = 2048] = "InvisiblePeeps";
    UIViewportFlag[UIViewportFlag["HideBase"] = 4096] = "HideBase";
    UIViewportFlag[UIViewportFlag["HideVertical"] = 8192] = "HideVertical";
    UIViewportFlag[UIViewportFlag["InvisibleSprites"] = 32768] = "InvisibleSprites";
    UIViewportFlag[UIViewportFlag["Unknown"] = 32768] = "Unknown";
    UIViewportFlag[UIViewportFlag["SeethroughPaths"] = 65536] = "SeethroughPaths";
    UIViewportFlag[UIViewportFlag["ClipView"] = 131072] = "ClipView";
    UIViewportFlag[UIViewportFlag["HighlightPathIssues"] = 262144] = "HighlightPathIssues";
    UIViewportFlag[UIViewportFlag["TransparentBackground"] = 524288] = "TransparentBackground";
})(UIViewportFlag || (UIViewportFlag = {}));
var UIImage;
(function (UIImage) {
})(UIImage || (UIImage = {}));
var UIPointZero = { x: 0, y: 0 };
var UIEdgeInsetsZero = { top: 0, left: 0, bottom: 0, right: 0 };
var UIEdgeInsetsContainer = { top: 16, left: 2, bottom: 2, right: 2 };
var UIOptionalSizeDefulat = { width: undefined, height: undefined };
var UISizeZero = { width: 0, height: 0 };
var UIInteractor = (function () {
    function UIInteractor() {
    }
    UIInteractor.prototype.update = function (name, block) {
        var widget = this._findWidget(name);
        if (typeof widget !== "undefined") {
            block(widget);
        }
    };
    UIInteractor.prototype.findWidget = function (block) {
        this._findWidget = block;
    };
    return UIInteractor;
}());
var UIConstructor = (function () {
    function UIConstructor() {
    }
    UIConstructor.prototype.construct = function (stack, interactor) {
        var flattedComponents = stack._getUIWidgets();
        flattedComponents.forEach(function (val) { return val._interactor = interactor; });
        return {
            size: this.calculateBounds(stack),
            widgets: stack._getWidgets()
        };
    };
    UIConstructor.prototype.calculateBounds = function (stack) {
        var insets = UIEdgeInsetsContainer;
        var origin = {
            x: insets.left,
            y: insets.top
        };
        var containerSize = stack._estimatedSize();
        stack._layout(UIAxis.Vertical, origin, containerSize);
        stack._build();
        return {
            width: containerSize.width + insets.left + insets.right,
            height: containerSize.height + insets.top + insets.bottom
        };
    };
    UIConstructor.prototype.after = function (stack) {
        var flattedComponents = stack._getUIWidgets();
        flattedComponents.forEach(function (val) { return val._didLoad(); });
    };
    return UIConstructor;
}());
var UIWindow = (function () {
    function UIWindow(title, widgets) {
        this._uiConstructor = new UIConstructor();
        this._interactor = new UIInteractor();
        this._spacing = 0;
        this._padding = UIEdgeInsetsZero;
        this._title = title;
        this._childs = widgets;
    }
    UIWindow.$ = function (title) {
        var widgets = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            widgets[_i - 1] = arguments[_i];
        }
        return new UIWindow(title, widgets);
    };
    UIWindow.prototype.show = function () {
        var _this = this;
        var stack = new UIStack(UIAxis.Vertical, this._childs)
            .spacing(this._spacing).padding(this._padding);
        var constructed = this._uiConstructor.construct(stack, this._interactor);
        var size = constructed.size;
        this._windowDesc = {
            classification: this._title,
            width: size.width,
            height: size.height,
            title: this._title,
            widgets: constructed.widgets
        };
        this._window = ui.openWindow(this._windowDesc);
        this._origin = {
            x: this._window.x,
            y: this._window.y
        };
        this._interactor.findWidget(function (name) {
            return _this.findWidget(name);
        });
        this._uiConstructor.after(stack);
    };
    UIWindow.prototype.close = function () {
        var _a;
        (_a = this._window) === null || _a === void 0 ? void 0 : _a.close();
        this._window = undefined;
    };
    UIWindow.prototype.bringToFront = function () {
        var _a;
        (_a = this._window) === null || _a === void 0 ? void 0 : _a.bringToFront();
    };
    UIWindow.prototype.findWidget = function (name) {
        var _a;
        return (_a = this._window) === null || _a === void 0 ? void 0 : _a.findWidget(name);
    };
    UIWindow.prototype.spacing = function (val) {
        this._spacing = val;
        return this;
    };
    UIWindow.prototype.padding = function (val) {
        this._padding = val;
        return this;
    };
    UIWindow.prototype.updateUI = function (block) {
        block(this);
        this._update();
    };
    UIWindow.prototype._update = function () {
        var window = this._window;
        if (typeof window === "undefined") {
            return;
        }
        window.x = this._origin.x;
        window.y = this._origin.y;
    };
    UIWindow.prototype.origin = function (val) {
        this._origin = val;
        return this;
    };
    return UIWindow;
}());
var UIWidget = (function () {
    function UIWidget() {
        this._origin = UIPointZero;
        this._size = UIOptionalSizeDefulat;
        this._isDisabled = false;
        this._isVisible = true;
        this._name = this.constructor.name + "-" + uuid();
    }
    UIWidget.prototype._getUIWidgets = function () {
        return [this];
    };
    UIWidget.prototype._getWidgets = function () {
        return [this._widget];
    };
    UIWidget.prototype._minSize = function () {
        return UISizeZero;
    };
    UIWidget.prototype._estimatedSize = function () {
        var _a, _b;
        var minSize = this._minSize();
        return {
            width: (_a = this._size.width) !== null && _a !== void 0 ? _a : minSize.width,
            height: (_b = this._size.height) !== null && _b !== void 0 ? _b : minSize.height
        };
    };
    UIWidget.prototype._layout = function (axis, origin, parentSize) {
        var _a, _b;
        this._origin = origin;
        this._size = {
            width: (_a = this._size.width) !== null && _a !== void 0 ? _a : parentSize.width,
            height: (_b = this._size.height) !== null && _b !== void 0 ? _b : parentSize.height
        };
        switch (axis) {
            case UIAxis.Vertical: {
                return {
                    x: origin.x,
                    y: origin.y + this._size.height
                };
            }
            case UIAxis.Horizontal: {
                return {
                    x: origin.x + this._size.width,
                    y: origin.y
                };
            }
        }
    };
    UIWidget.prototype._build = function () {
        throw new Error("Method not implemented.");
    };
    UIWidget.prototype._updateUI = function (block) {
        block(this);
        this._update(this._widget);
    };
    UIWidget.prototype._update = function (widget) {
        var _a, _b;
        widget.x = this._origin.x;
        widget.y = this._origin.y;
        widget.width = (_a = this._size.width) !== null && _a !== void 0 ? _a : 0;
        widget.height = (_b = this._size.height) !== null && _b !== void 0 ? _b : 0;
        widget.tooltip = this._tooltip;
        widget.isDisabled = this._isDisabled;
        widget.isVisible = this._isVisible;
    };
    UIWidget.prototype._buildBaseValues = function () {
        var _a, _b;
        return {
            x: this._origin.x,
            y: this._origin.y,
            width: (_a = this._size.width) !== null && _a !== void 0 ? _a : 0,
            height: (_b = this._size.height) !== null && _b !== void 0 ? _b : 0,
            name: this._name,
            tooltip: this._tooltip,
            isDisabled: this._isDisabled,
            isVisible: this._isVisible
        };
    };
    UIWidget.prototype._didLoad = function () {
        var _this = this;
        this._interactor.update(this._name, function (widget) {
            _this._widget = widget;
        });
    };
    UIWidget.prototype.width = function (val) {
        this._size = {
            width: val,
            height: this._size.height
        };
        return this;
    };
    UIWidget.prototype.height = function (val) {
        this._size = {
            width: this._size.width,
            height: val
        };
        return this;
    };
    UIWidget.prototype.size = function (val) {
        this._size = val;
        return this;
    };
    UIWidget.prototype.tooltop = function (val) {
        this._tooltip = val;
        return this;
    };
    UIWidget.prototype.isDisabled = function (val) {
        this._isDisabled = val;
        return this;
    };
    UIWidget.prototype.isVisible = function (val) {
        this._isVisible = val;
        return this;
    };
    return UIWidget;
}());
var UIStack = (function (_super) {
    __extends(UIStack, _super);
    function UIStack(axis, widgets, isGrouped) {
        if (isGrouped === void 0) { isGrouped = false; }
        var _this = _super.call(this) || this;
        _this._spacing = 0;
        _this._insets = UIEdgeInsetsZero;
        _this._padding = UIEdgeInsetsZero;
        _this._axis = axis;
        _this._child = widgets;
        _this._child.forEach(function (val) {
            if (val instanceof UISpacer) {
                val._confirm(axis);
            }
        });
        _this._isGrouped = isGrouped;
        if (isGrouped) {
            _this._insets = {
                top: 6,
                left: 2,
                bottom: 2,
                right: 2
            };
        }
        return _this;
    }
    UIStack.$ = function (axis, isGrouped) {
        if (isGrouped === void 0) { isGrouped = false; }
        var widgets = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            widgets[_i - 2] = arguments[_i];
        }
        return new UIStack(axis, widgets, isGrouped);
    };
    UIStack.$V = function () {
        var widgets = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            widgets[_i] = arguments[_i];
        }
        return new UIStack(UIAxis.Vertical, widgets, false);
    };
    UIStack.$H = function () {
        var widgets = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            widgets[_i] = arguments[_i];
        }
        return new UIStack(UIAxis.Horizontal, widgets, false);
    };
    UIStack.$VG = function () {
        var widgets = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            widgets[_i] = arguments[_i];
        }
        return new UIStack(UIAxis.Vertical, widgets, true);
    };
    UIStack.$HG = function () {
        var widgets = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            widgets[_i] = arguments[_i];
        }
        return new UIStack(UIAxis.Horizontal, widgets, true);
    };
    UIStack.prototype._getUIWidgets = function () {
        var widgets = this._child.map(function (val) { return val._getUIWidgets(); }).flatMap();
        if (this._isGrouped) {
            widgets.unshift(this);
        }
        return widgets;
    };
    UIStack.prototype._getWidgets = function () {
        var widgets = this._child.map(function (val) { return val._getWidgets(); }).flatMap();
        if (this._isGrouped) {
            widgets.unshift(this._widget);
        }
        return widgets;
    };
    UIStack.prototype._containerSize = function () {
        var _this = this;
        return this._child
            .map(function (val) { return val._estimatedSize(); })
            .reduce(function (acc, val) {
            switch (_this._axis) {
                case UIAxis.Vertical: {
                    return {
                        width: Math.max(acc.width, val.width),
                        height: acc.height + val.height + _this._spacing
                    };
                }
                case UIAxis.Horizontal: {
                    return {
                        width: acc.width + val.width + _this._spacing,
                        height: Math.max(acc.height, val.height)
                    };
                }
            }
        });
    };
    UIStack.prototype._isUnNamedGroup = function () {
        return this._isGrouped && typeof this._groupTitle === "undefined";
    };
    UIStack.prototype._estimatedSize = function () {
        var size = this._containerSize();
        var unNamedGroupCorrect = this._isUnNamedGroup() ? 4 : 0;
        return {
            width: size.width + this._insets.left + this._insets.right + this._padding.left + this._padding.right,
            height: size.height + this._insets.top + this._insets.bottom + this._padding.top + this._padding.bottom - unNamedGroupCorrect
        };
    };
    UIStack.prototype._layout = function (axis, origin, parentSize) {
        var intrinsicSize = this._estimatedSize();
        switch (axis) {
            case UIAxis.Vertical: {
                intrinsicSize = {
                    width: parentSize.width,
                    height: intrinsicSize.height
                };
                break;
            }
            case UIAxis.Horizontal: {
                intrinsicSize = {
                    width: intrinsicSize.width,
                    height: parentSize.height
                };
                break;
            }
        }
        var isUnNamedGroup = this._isUnNamedGroup();
        var unNamedGroupCorrect = isUnNamedGroup ? 4 : 0;
        if (isUnNamedGroup) {
            this._origin = {
                x: origin.x,
                y: origin.y - unNamedGroupCorrect
            };
            this._size = {
                width: intrinsicSize.width,
                height: intrinsicSize.height + unNamedGroupCorrect
            };
        }
        else {
            this._origin = origin;
            this._size = intrinsicSize;
        }
        var childContainerSize = {
            width: intrinsicSize.width - (this._insets.left + this._insets.right + this._padding.left + this._padding.right),
            height: intrinsicSize.height - (this._insets.top + this._insets.bottom + this._padding.top + this._padding.bottom) + unNamedGroupCorrect
        };
        var childOrigin = {
            x: this._origin.x + this._insets.left + this._padding.left,
            y: this._origin.y + this._insets.top + this._padding.top
        };
        var point = childOrigin;
        switch (this._axis) {
            case UIAxis.Vertical: {
                var numberOfUndefinedHeightComponents = this._child
                    .filter(function (val) {
                    if (val instanceof UIStack) {
                        return false;
                    }
                    else {
                        return typeof val._size.height === "undefined";
                    }
                }).length;
                var sumOfExactComponentHeights = this._child
                    .map(function (val) {
                    var _a;
                    if (val instanceof UIStack) {
                        return val._estimatedSize().height;
                    }
                    else {
                        return (_a = val._size.height) !== null && _a !== void 0 ? _a : 0;
                    }
                }).reduce(function (acc, val) { return acc + val; });
                var autoHeight = 0;
                if (numberOfUndefinedHeightComponents > 0) {
                    var sumOfSpacing = this._spacing * (this._child.length - 1);
                    autoHeight = Math.floor((childContainerSize.height - sumOfSpacing - sumOfExactComponentHeights) / numberOfUndefinedHeightComponents);
                }
                for (var _i = 0, _a = this._child; _i < _a.length; _i++) {
                    var component = _a[_i];
                    var isHeightUndefined = typeof component._size.height === "undefined";
                    var parentSize = {
                        width: childContainerSize.width,
                        height: isHeightUndefined ? autoHeight : component._estimatedSize().height
                    };
                    point = component._layout(this._axis, { x: childOrigin.x, y: point.y }, parentSize);
                    point = { x: point.x, y: point.y + this._spacing };
                }
                return {
                    x: this._origin.x + this._size.width,
                    y: this._origin.y + this._size.height
                };
            }
            case UIAxis.Horizontal: {
                var numberOfUndefinedWidthComponents = this._child
                    .filter(function (val) {
                    if (val instanceof UIStack) {
                        return false;
                    }
                    else {
                        return typeof val._size.width === "undefined";
                    }
                }).length;
                var sumOfExactComponentWidths = this._child
                    .map(function (val) {
                    var _a;
                    if (val instanceof UIStack) {
                        return val._estimatedSize().width;
                    }
                    else {
                        return (_a = val._size.width) !== null && _a !== void 0 ? _a : 0;
                    }
                }).reduce(function (acc, val) { return acc + val; });
                var autoWidth = 0;
                if (numberOfUndefinedWidthComponents > 0) {
                    var sumOfSpacing = this._spacing * (this._child.length - 1);
                    autoWidth = Math.floor((childContainerSize.width - sumOfSpacing - sumOfExactComponentWidths) / numberOfUndefinedWidthComponents);
                }
                for (var _b = 0, _c = this._child; _b < _c.length; _b++) {
                    var component = _c[_b];
                    var isWidthUndefined = typeof component._size.width === "undefined";
                    var parentSize = {
                        width: isWidthUndefined ? autoWidth : component._estimatedSize().width,
                        height: childContainerSize.height
                    };
                    point = component._layout(this._axis, { x: point.x, y: childOrigin.y }, parentSize);
                    point = { x: point.x + this._spacing, y: point.y };
                }
                return {
                    x: this._origin.x + this._size.width,
                    y: this._origin.y + this._size.height
                };
            }
        }
    };
    UIStack.prototype._build = function () {
        var _a;
        if (this._isGrouped) {
            this._widget = __assign(__assign({}, this._buildBaseValues()), { text: (_a = this._groupTitle) !== null && _a !== void 0 ? _a : "", type: "groupbox" });
        }
        this._child.forEach(function (val) { return val._build(); });
    };
    UIStack.prototype._update = function (widget) {
        var _a;
        _super.prototype._update.call(this, widget);
        if (this._isGrouped) {
            widget.name = (_a = this._groupTitle) !== null && _a !== void 0 ? _a : "";
        }
    };
    UIStack.prototype.spacing = function (val) {
        this._spacing = val;
        return this;
    };
    UIStack.prototype.padding = function (val) {
        this._padding = val;
        return this;
    };
    UIStack.prototype.title = function (val) {
        if (this._isGrouped) {
            this._insets = {
                top: 16,
                left: 2,
                bottom: 2,
                right: 2
            };
        }
        this._groupTitle = val;
        return this;
    };
    return UIStack;
}(UIWidget));
var UIButton = (function (_super) {
    __extends(UIButton, _super);
    function UIButton() {
        return _super.call(this) || this;
    }
    UIButton.$ = function (title) {
        var button = new UIButton();
        return button.title(title);
    };
    UIButton.$I = function (image) {
        var button = new UIButton();
        return button
            .image(image)
            .size({ width: 24, height: 24 });
    };
    UIButton.prototype._minSize = function () {
        return { width: 50, height: 15 };
    };
    UIButton.prototype._build = function () {
        var _this = this;
        this._widget = __assign(__assign({}, this._buildBaseValues()), { type: "button", border: this._border, image: this._image, isPressed: this._isPressed, text: this._title, onClick: function () {
                var _a;
                (_a = _this._onClick) === null || _a === void 0 ? void 0 : _a.call(_this, _this);
            } });
    };
    UIButton.prototype._update = function (widget) {
        _super.prototype._update.call(this, widget);
        widget.border = this._border;
        widget.image = this._image;
        widget.isPressed = this._isPressed;
        widget.text = this._title;
    };
    UIButton.prototype._isImage = function () {
        return typeof this._image !== "undefined";
    };
    UIButton.prototype.border = function (val) {
        if (!this._isImage()) {
            this._border = val;
        }
        return this;
    };
    UIButton.prototype.image = function (val) {
        this._image = val;
        this._border = false;
        return this;
    };
    UIButton.prototype.isPressed = function (val) {
        this._isPressed = val;
        return this;
    };
    UIButton.prototype.title = function (val) {
        if (!this._isImage()) {
            this._title = val;
        }
        return this;
    };
    UIButton.prototype.onClick = function (block) {
        this._onClick = block;
        return this;
    };
    return UIButton;
}(UIWidget));
var UISpacer = (function (_super) {
    __extends(UISpacer, _super);
    function UISpacer(spacing) {
        var _this = _super.call(this) || this;
        _this._axis = UIAxis.Vertical;
        _this._spacing = spacing;
        return _this;
    }
    UISpacer.$ = function (spacing) {
        return new UISpacer(spacing);
    };
    UISpacer.prototype._confirm = function (axis) {
        var _a;
        this._axis = axis;
        var unit = (_a = this._spacing) !== null && _a !== void 0 ? _a : 1;
        switch (axis) {
            case UIAxis.Vertical: {
                this._size = { width: 1, height: unit };
            }
            case UIAxis.Horizontal: {
                this._size = { width: unit, height: 1 };
            }
        }
    };
    UISpacer.prototype._build = function () {
        this._widget = __assign(__assign({}, this._buildBaseValues()), { type: "label" });
    };
    UISpacer.prototype._update = function (widget) {
        this._confirm(this._axis);
        _super.prototype._update.call(this, widget);
    };
    UISpacer.prototype.spacing = function (val) {
        this._spacing = val;
        return this;
    };
    return UISpacer;
}(UIWidget));
var UILabel = (function (_super) {
    __extends(UILabel, _super);
    function UILabel(text) {
        var _this = _super.call(this) || this;
        _this._align = UITextAlignment.Left;
        _this._text = text;
        return _this;
    }
    UILabel.$ = function (text) {
        var label = new UILabel(text);
        return label.height(15);
    };
    UILabel.prototype._minSize = function () {
        return { width: 50, height: 15 };
    };
    UILabel.prototype._build = function () {
        var _this = this;
        this._widget = __assign(__assign({}, this._buildBaseValues()), { type: "label", text: this._text, textAlign: this._align, onChange: function (index) {
                var _a;
                (_a = _this._onChange) === null || _a === void 0 ? void 0 : _a.call(_this, _this, index);
            } });
    };
    UILabel.prototype._update = function (widget) {
        _super.prototype._update.call(this, widget);
        widget.text = this._text;
        widget.textAlign = this._align;
    };
    UILabel.prototype.align = function (val) {
        this._align = val;
        return this;
    };
    UILabel.prototype.onChange = function (block) {
        this._onChange = block;
        return this;
    };
    return UILabel;
}(UIWidget));
var UICheckbox = (function (_super) {
    __extends(UICheckbox, _super);
    function UICheckbox(text) {
        if (text === void 0) { text = undefined; }
        var _this = _super.call(this) || this;
        _this._isChecked = false;
        _this._text = text;
        return _this;
    }
    UICheckbox.$ = function (text) {
        return new UICheckbox(text);
    };
    UICheckbox.$UN = function () {
        var checkbox = new UICheckbox();
        return checkbox
            .size({ width: 11, height: 11 });
    };
    UICheckbox.prototype._minSize = function () {
        return { width: 50, height: 15 };
    };
    UICheckbox.prototype._build = function () {
        var _this = this;
        var _a;
        this._widget = __assign(__assign({}, this._buildBaseValues()), { type: "checkbox", text: (_a = this._text) !== null && _a !== void 0 ? _a : "", isChecked: this._isChecked, onChange: function (isChecked) {
                var _a;
                _this._isChecked = isChecked;
                (_a = _this._onChange) === null || _a === void 0 ? void 0 : _a.call(_this, _this, _this._isChecked);
            } });
    };
    UICheckbox.prototype._update = function (widget) {
        _super.prototype._update.call(this, widget);
        widget.text = this._text;
        widget.isChecked = this._isChecked;
    };
    UICheckbox.prototype._isUnnamed = function () {
        return typeof this._text === "undefined";
    };
    UICheckbox.prototype.isChecked = function (val) {
        this._isChecked = val;
        return this;
    };
    UICheckbox.prototype.onChange = function (block) {
        this._onChange = block;
        return this;
    };
    return UICheckbox;
}(UIWidget));
var UIColorPicker = (function (_super) {
    __extends(UIColorPicker, _super);
    function UIColorPicker(color) {
        if (color === void 0) { color = undefined; }
        var _this = _super.call(this) || this;
        _this._color = color;
        return _this;
    }
    UIColorPicker.$ = function (color) {
        if (color === void 0) { color = undefined; }
        var colorPicker = new UIColorPicker(color);
        return colorPicker
            .size({ width: 12, height: 12 });
    };
    UIColorPicker.prototype._build = function () {
        var _this = this;
        this._widget = __assign(__assign({}, this._buildBaseValues()), { type: "colourpicker", colour: this._color, onChange: function (color) {
                var _a;
                _this._color = color;
                (_a = _this._onChange) === null || _a === void 0 ? void 0 : _a.call(_this, _this, _this._color);
            } });
    };
    UIColorPicker.prototype._update = function (widget) {
        _super.prototype._update.call(this, widget);
        widget.colour = this._color;
    };
    UIColorPicker.prototype.color = function (val) {
        this._color = val;
        return this;
    };
    UIColorPicker.prototype.onChange = function (block) {
        this._onChange = block;
        return this;
    };
    return UIColorPicker;
}(UIWidget));
var UIDropdown = (function (_super) {
    __extends(UIDropdown, _super);
    function UIDropdown(items) {
        if (items === void 0) { items = []; }
        var _this = _super.call(this) || this;
        _this._selectedIndex = 0;
        _this._items = items;
        return _this;
    }
    UIDropdown.$ = function (items) {
        var dropdown = new UIDropdown(items);
        return dropdown.height(15);
    };
    UIDropdown.prototype._minSize = function () {
        return { width: 50, height: 15 };
    };
    UIDropdown.prototype._build = function () {
        var _this = this;
        this._widget = __assign(__assign({}, this._buildBaseValues()), { type: "dropdown", items: this._items, selectedIndex: this._selectedIndex, onChange: function (index) {
                var _a;
                _this._selectedIndex = index;
                var item = _this._items[index];
                (_a = _this._onChange) === null || _a === void 0 ? void 0 : _a.call(_this, _this, _this._selectedIndex, item);
            } });
    };
    UIDropdown.prototype._update = function (widget) {
        _super.prototype._update.call(this, widget);
        widget.items = this._items;
        widget.selectedIndex = this._selectedIndex;
    };
    UIDropdown.prototype.selected = function (val) {
        this._selectedIndex = val;
        return this;
    };
    UIDropdown.prototype.onChange = function (block) {
        this._onChange = block;
        return this;
    };
    return UIDropdown;
}(UIWidget));
var UISpinner = (function (_super) {
    __extends(UISpinner, _super);
    function UISpinner() {
        var _this = _super.call(this) || this;
        _this._min = 0;
        _this._max = 1;
        _this._value = 0.5;
        _this._step = 0.1;
        _this._fixed = 1;
        return _this;
    }
    UISpinner.$ = function () {
        var spinner = new UISpinner();
        return spinner.height(15);
    };
    UISpinner.prototype._minSize = function () {
        return { width: 50, height: 15 };
    };
    UISpinner.prototype._build = function () {
        var _this = this;
        var usingFormatter = typeof this._formatter !== "undefined";
        var text;
        if (usingFormatter) {
            text = this._formatter(this._value);
        }
        else {
            text = this._value.toFixed(this._fixed);
        }
        this._widget = __assign(__assign({}, this._buildBaseValues()), { type: "spinner", text: text, onDecrement: function () {
                var prev = _this._value;
                _this._value = Math.max(_this._value - _this._step, _this._min);
                _this._signal(prev, _this._value);
            }, onIncrement: function () {
                var prev = _this._value;
                _this._value = Math.min(_this._value + _this._step, _this._max);
                _this._signal(prev, _this._value);
            } });
    };
    UISpinner.prototype._signal = function (prev, current) {
        var _this = this;
        var _a;
        var fixedCurrent = current.toFixed(this._fixed);
        var zero = +0.0;
        var fixedZero = zero.toFixed(this._fixed);
        var negativeFixedZero = "-" + fixedZero;
        var isNegativeZero = fixedCurrent === negativeFixedZero;
        var usingFormatter = typeof this._formatter !== "undefined";
        var valueChanged = prev.toFixed(this._fixed) != fixedCurrent;
        if (valueChanged) {
            this._updateUI(function (widget) {
                if (usingFormatter) {
                    if (isNegativeZero) {
                        widget._text = _this._formatter(zero);
                    }
                    else {
                        widget._text = _this._formatter(current);
                    }
                }
                else {
                    if (isNegativeZero) {
                        widget._text = fixedZero;
                    }
                    else {
                        widget._text = fixedCurrent;
                    }
                }
            });
            (_a = this._onChange) === null || _a === void 0 ? void 0 : _a.call(this, this, current);
        }
    };
    UISpinner.prototype._update = function (widget) {
        _super.prototype._update.call(this, widget);
        widget.text = this._text;
    };
    UISpinner.prototype.range = function (min, max) {
        if (min > max) {
            console.log("'min' cannot be greater than 'max'.");
        }
        else {
            this._min = min;
            this._max = max;
        }
        return this;
    };
    UISpinner.prototype.step = function (step, fixed) {
        if (fixed === void 0) { fixed = undefined; }
        this._step = step;
        if (typeof fixed === "undefined") {
            for (var i = 0; i < Infinity; i++) {
                var mul = Math.pow(10, i);
                if ((step * mul) % 1 == 0) {
                    this._fixed = i;
                    break;
                }
            }
        }
        else {
            this._fixed = fixed;
        }
        return this;
    };
    UISpinner.prototype.value = function (val) {
        this._value = Math.max(this._min, Math.min(this._max, val));
        return this;
    };
    UISpinner.prototype.formatter = function (black) {
        this._formatter = black;
        return this;
    };
    UISpinner.prototype.onChange = function (block) {
        this._onChange = block;
        return this;
    };
    return UISpinner;
}(UIWidget));
var UITextBox = (function (_super) {
    __extends(UITextBox, _super);
    function UITextBox(text) {
        if (text === void 0) { text = undefined; }
        var _this = _super.call(this) || this;
        _this._text = text;
        return _this;
    }
    UITextBox.$ = function (text) {
        if (text === void 0) { text = undefined; }
        var textBox = new UITextBox(text);
        return textBox.height(15);
    };
    UITextBox.prototype._minSize = function () {
        return { width: 50, height: 15 };
    };
    UITextBox.prototype._build = function () {
        var _this = this;
        this._widget = __assign(__assign({}, this._buildBaseValues()), { type: "textbox", text: this._text, maxLength: this._maxLength, onChange: function (text) {
                var _a;
                (_a = _this._onChange) === null || _a === void 0 ? void 0 : _a.call(_this, _this, text);
            } });
    };
    UITextBox.prototype._update = function (widget) {
        _super.prototype._update.call(this, widget);
        widget.text = this._text;
        widget.maxLength = this._maxLength;
    };
    UITextBox.prototype.text = function (val) {
        this._text = val;
        return this;
    };
    UITextBox.prototype.maxLength = function (val) {
        this._maxLength = val;
        return this;
    };
    UITextBox.prototype.onChange = function (block) {
        this._onChange = block;
        return this;
    };
    return UITextBox;
}(UIWidget));
var UIViewport = (function (_super) {
    __extends(UIViewport, _super);
    function UIViewport() {
        var _this = _super.call(this) || this;
        _this._zoom = UIViewportScale.One;
        _this._visibilityFlags = UIViewportFlag.None;
        _this._position = { x: ui.width / 2, y: ui.height / 2 };
        return _this;
    }
    UIViewport.$ = function () {
        return new UIViewport();
    };
    UIViewport.prototype._minSize = function () {
        return { width: 50, height: 50 };
    };
    UIViewport.prototype._build = function () {
        var _a, _b;
        this._viewport = {
            left: this._origin.x,
            top: this._origin.y,
            right: this._origin.x + ((_a = this._size.width) !== null && _a !== void 0 ? _a : 0),
            bottom: this._origin.y + ((_b = this._size.height) !== null && _b !== void 0 ? _b : 0),
            rotation: ui.mainViewport.rotation,
            zoom: ui.mainViewport.zoom,
            visibilityFlags: this._visibilityFlags
        };
        this._widget = __assign(__assign({}, this._buildBaseValues()), { type: "viewport", viewport: this._viewport });
    };
    UIViewport.prototype._update = function (widget) {
        var _a, _b;
        _super.prototype._update.call(this, widget);
        this._viewport.left = this._origin.x;
        this._viewport.top = this._origin.y;
        this._viewport.right = this._origin.x + ((_a = this._size.width) !== null && _a !== void 0 ? _a : 0);
        this._viewport.bottom = this._origin.y + ((_b = this._size.height) !== null && _b !== void 0 ? _b : 0);
        this._viewport.zoom = this._zoom;
        this._viewport.visibilityFlags = this._visibilityFlags;
    };
    UIViewport.prototype._didLoad = function () {
        _super.prototype._didLoad.call(this);
        this._viewport = this._widget.viewport;
        this._zoom = ui.mainViewport.zoom;
        this._viewport.zoom = this._zoom;
        this._viewport.visibilityFlags = this._visibilityFlags;
        this._position = ui.mainViewport.getCentrePosition();
        this.moveTo(this._position);
    };
    UIViewport.prototype.position = function (val) {
        this._position = val;
        return this;
    };
    UIViewport.prototype.zoom = function (val) {
        this._zoom = val;
        return this;
    };
    UIViewport.prototype.flags = function (val) {
        this._visibilityFlags = val;
        return this;
    };
    UIViewport.prototype.getCenterPosition = function () {
        return this._viewport.getCentrePosition();
    };
    UIViewport.prototype.moveTo = function (val) {
        this._viewport.moveTo(val);
    };
    UIViewport.prototype.scrollTo = function (val) {
        this._viewport.scrollTo(val);
    };
    return UIViewport;
}(UIWidget));
var openWindow = function () {
    var containerPadding = { top: 2, left: 2, bottom: 2, right: 2 };
    var viewport = UIViewport.$()
        .size({ width: 200, height: 200 })
        .zoom(UIViewportScale.Quater)
        .flags(UIViewportFlag.InvisibleSupports);
    var window = UIWindow.$("Window title", UIButton.$("1")
        .tooltop("툴팁이다. 어쩌라고~"), UIStack.$H(UIStack.$VG(UIStack.$HG(UIColorPicker.$()
        .onChange(function (picker, color) {
        console.log(color);
    }), UIColorPicker.$()
        .isDisabled(true)
        .color(UIColor.BrightRed), UIColorPicker.$()
        .color(Math.floor(Math.random() * 32)), UIColorPicker.$()
        .isDisabled(true)
        .color(Math.floor(Math.random() * 32)), UIColorPicker.$()
        .color(Math.floor(Math.random() * 32)), UIColorPicker.$()
        .color(Math.floor(Math.random() * 32)), UIColorPicker.$()
        .color(Math.floor(Math.random() * 32)), UIColorPicker.$()
        .color(Math.floor(Math.random() * 32)), UIColorPicker.$()
        .color(Math.floor(Math.random() * 32)), UIColorPicker.$()
        .color(Math.floor(Math.random() * 32))).title("ColorSet")
        .isDisabled(true)
        .padding(containerPadding), UIStack.$VG(UIButton.$("2")
        .isDisabled(true), UIButton.$("2"), UIButton.$("2"), UIButton.$("2")).padding(containerPadding), UIButton.$("2"), UIStack.$H(UIButton.$("3"), UISpacer.$(10), UIButton.$("4"), UICheckbox.$UN()
        .isChecked(true)
        .onChange(function (checkbox, isChecked) {
        console.log(isChecked);
        window.updateUI(function (val) {
            if (isChecked) {
                val.origin({ x: 200, y: 200 });
            }
            else {
                val.origin({ x: 100, y: 100 });
            }
        });
    })).spacing(4), UIButton.$("A")).title("GroupBox")
        .spacing(4)
        .padding(containerPadding), UISpacer.$(10), UIStack.$HG(UIButton.$("5"), UIStack.$VG(UIDropdown.$([
        "first",
        "second",
        "third",
        "fourth"
    ]).onChange(function (dropdown, index, item) {
        console.log(index, item);
    }).isVisible(true), UISpinner.$()
        .range(-1, 1)
        .step(0.1, 2)
        .value(-0.1)
        .formatter(function (val) {
        return val.toFixed(2) + "%";
    })
        .onChange(function (spinner, val) {
        console.log(val);
    }), UIButton.$("6"), UIButton.$I(5167), UIButton.$("8")).spacing(4)
        .padding(containerPadding), UIButton.$("B")
        .onClick(function (button) {
        console.log(button._title);
    })).spacing(4)
        .padding(containerPadding), viewport).spacing(4), UIButton.$("9"), UIStack.$H(UIButton.$("10")
        .width(100), UIButton.$("Clear!")
        .width(350).height(80)
        .onClick(function (button) {
        viewport.moveTo({ x: Math.random() * ui.width, y: Math.random() * ui.height });
        viewport._updateUI(function (widget) {
            widget
                .size({ width: Math.random() * 100, height: Math.random() * 100 });
        });
    }), UITextBox.$()
        .maxLength(20)).spacing(4), UILabel.$("Label----------------------!")
        .align(UITextAlignment.Center));
    window
        .spacing(4)
        .padding(containerPadding)
        .show();
};
var main = function () {
    if (typeof ui === 'undefined') {
        console.log("Plugin not available on headless mode.");
        return;
    }
    ui.registerMenuItem("StackUI Demo", function () {
        openWindow();
    });
};
registerPlugin({
    name: "StackUI",
    version: "0.0.1",
    authors: ["nExmond"],
    type: "local",
    licence: "MIT",
    main: main
});
var UIImage;
(function (UIImage) {
})(UIImage || (UIImage = {}));
