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
Array.prototype.compactMap = function () {
    return this.filter(function (val) { return val !== undefined; });
};
function uuid() {
    var uuidValue = '', k, randomValue;
    for (k = 0; k < 32; k++) {
        randomValue = Math.random() * 16 | 0;
        if (k == 8 || k == 12 || k == 16 || k == 20) {
            uuidValue += '-';
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
var UIColorFlag;
(function (UIColorFlag) {
    UIColorFlag[UIColorFlag["Outline"] = 32] = "Outline";
    UIColorFlag[UIColorFlag["Inset"] = 64] = "Inset";
    UIColorFlag[UIColorFlag["Translucent"] = 128] = "Translucent";
})(UIColorFlag || (UIColorFlag = {}));
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
var UIWindowColorPaletteDefault = { primary: UIColor.Gray, secondary: UIColor.Gray, tertiary: UIColor.Gray };
var UIInteractor = (function () {
    function UIInteractor() {
    }
    UIInteractor.prototype.update = function (name, block) {
        var widget = this._findWidget(name);
        if (typeof widget !== 'undefined') {
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
        var flattedChilds = stack._getUIWidgets();
        stack._interactor = interactor;
        flattedChilds.forEach(function (val) { return val._interactor = interactor; });
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
        var estimatedSize = stack._estimatedSize();
        stack._isUndefinedSize(UIAxis.Vertical);
        stack._layout(UIAxis.Vertical, origin, estimatedSize);
        stack._build();
        return {
            width: estimatedSize.width + insets.left + insets.right,
            height: estimatedSize.height + insets.top + insets.bottom
        };
    };
    UIConstructor.prototype.didLoad = function (stack) {
        var flattedChilds = stack._getUIWidgets();
        flattedChilds.forEach(function (val) { return val._didLoad(); });
    };
    UIConstructor.prototype.refresh = function (stack, windowSize) {
        var insets = UIEdgeInsetsContainer;
        var origin = {
            x: insets.left,
            y: insets.top
        };
        var estimatedSize = {
            width: windowSize.width - (insets.left + insets.right),
            height: windowSize.height - (insets.top + insets.bottom)
        };
        stack._resetSize();
        stack._layout(UIAxis.Vertical, origin, estimatedSize);
        stack._refreshUI();
    };
    return UIConstructor;
}());
var UIWindow = (function () {
    function UIWindow(title, widgets) {
        this._uiConstructor = new UIConstructor();
        this._interactor = new UIInteractor();
        this._spacing = 0;
        this._padding = UIEdgeInsetsZero;
        this._isExpandable = false;
        this._colorPalette = UIWindowColorPaletteDefault;
        this._title = title;
        this._childss = widgets;
    }
    UIWindow.$ = function (title) {
        var widgets = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            widgets[_i - 1] = arguments[_i];
        }
        return new UIWindow(title, widgets);
    };
    UIWindow.prototype._convertColors = function () {
        var _a, _b, _c;
        return [
            (_a = this._colorPalette.primary) !== null && _a !== void 0 ? _a : UIColor.Gray,
            (_b = this._colorPalette.secondary) !== null && _b !== void 0 ? _b : UIColor.Gray,
            (_c = this._colorPalette.tertiary) !== null && _c !== void 0 ? _c : UIColor.Gray
        ];
    };
    UIWindow.prototype._isOpened = function () {
        return typeof this._window !== 'undefined';
    };
    UIWindow.prototype._sync = function () {
        if (this._isOpened()) {
            var window = this._window;
            this._origin = {
                x: window.x,
                y: window.y
            };
            this._size = {
                width: window.width,
                height: window.height
            };
            this._colorPalette = {
                primary: window.colours[0],
                secondary: window.colours[1],
                tertiary: window.colours[2]
            };
        }
    };
    UIWindow.prototype._update = function () {
        var window = this._window;
        if (typeof window === 'undefined') {
            return;
        }
        window.title = this._title;
        window.minWidth = this._isExpandable ? this._initialSize.width : this._size.width;
        window.minHeight = this._isExpandable ? this._initialSize.height : this._size.height;
        window.maxWidth = this._isExpandable ? ui.width : this._size.width;
        window.maxHeight = this._isExpandable ? ui.height : this._size.height;
        window.colours = this._convertColors();
        window.x = ui.width + 1;
        window.y = ui.height + 1;
        window.x = this._origin.x;
        window.y = this._origin.y;
    };
    UIWindow.prototype._onUpdate = function () {
        var window = this._window;
        if (typeof window === 'undefined') {
            return;
        }
        var isSizeChange = window.width != this._size.width || window.height != this._size.height;
        if (isSizeChange) {
            this._size = {
                width: window.width,
                height: window.height
            };
            this._uiConstructor.refresh(this._contentView, this._size);
        }
    };
    UIWindow.prototype.show = function () {
        var _this = this;
        if (this._isOpened()) {
            return this;
        }
        var stack = new UIStack(UIAxis.Vertical, this._childss)
            .spacing(this._spacing).padding(this._padding);
        var constructed = this._uiConstructor.construct(stack, this._interactor);
        var size = constructed.size;
        var windowDesc = {
            classification: this._title,
            width: size.width,
            height: size.height,
            title: this._title,
            minWidth: this._isExpandable ? size.width : undefined,
            maxWidth: this._isExpandable ? ui.width : undefined,
            minHeight: this._isExpandable ? size.height : undefined,
            maxHeight: this._isExpandable ? ui.height : undefined,
            widgets: constructed.widgets,
            colours: this._convertColors(),
            onClose: function () {
                var _a;
                (_a = _this._onClose) === null || _a === void 0 ? void 0 : _a.call(_this, _this);
            },
            onUpdate: function () {
                _this._onUpdate();
            },
            onTabChange: function () {
                var _a, _b, _c;
                var tabIndex = (_b = (_a = _this._window) === null || _a === void 0 ? void 0 : _a.tabIndex) !== null && _b !== void 0 ? _b : 0;
                (_c = _this._onTabChange) === null || _c === void 0 ? void 0 : _c.call(_this, _this, tabIndex);
            }
        };
        this._window = ui.openWindow(windowDesc);
        this._contentView = stack;
        this._initialSize = {
            width: this._window.width,
            height: this._window.height
        };
        this._sync();
        this._interactor.findWidget(function (name) {
            return _this.findWidget(name);
        });
        this._uiConstructor.didLoad(stack);
        return this;
    };
    UIWindow.prototype.updateUI = function (block) {
        this._sync();
        block(this);
        this._update();
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
    UIWindow.prototype.origin = function (val) {
        this._origin = val;
        return this;
    };
    UIWindow.prototype.isExpandable = function (val) {
        this._isExpandable = val;
        return this;
    };
    UIWindow.prototype.title = function (val) {
        this._title = val;
        return this;
    };
    UIWindow.prototype.colorPalette = function (val) {
        this._colorPalette = val;
        return this;
    };
    UIWindow.prototype.onClose = function (block) {
        this._onClose = block;
        return this;
    };
    UIWindow.prototype.onTabChange = function (block) {
        this._onTabChange = block;
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
        this._minSize = UISizeZero;
        this._name = this.constructor.name + '-' + uuid();
    }
    UIWidget.prototype._getUIWidgets = function () {
        return [this];
    };
    UIWidget.prototype._getWidgets = function () {
        return [this._widget];
    };
    UIWidget.prototype._estimatedSize = function () {
        var _a, _b;
        var minSize = this._minSize;
        return {
            width: (_a = this._size.width) !== null && _a !== void 0 ? _a : minSize.width,
            height: (_b = this._size.height) !== null && _b !== void 0 ? _b : minSize.height
        };
    };
    UIWidget.prototype._isUndefinedSize = function (axis) {
        switch (axis) {
            case UIAxis.Vertical: {
                return typeof this._size.width === 'undefined';
            }
            case UIAxis.Horizontal: {
                return typeof this._size.height === 'undefined';
            }
        }
    };
    UIWidget.prototype._layout = function (axis, origin, estimatedSize) {
        var _a, _b;
        if (typeof this._initialSize === 'undefined') {
            this._initialSize = this._size;
        }
        this._origin = origin;
        this._size = {
            width: (_a = this._size.width) !== null && _a !== void 0 ? _a : estimatedSize.width,
            height: (_b = this._size.height) !== null && _b !== void 0 ? _b : estimatedSize.height
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
        throw new Error('Method not implemented.');
    };
    UIWidget.prototype._update = function (widget) {
        var _a, _b;
        widget.x = this._origin.x;
        widget.y = this._origin.y;
        widget.width = (_a = this._size.width) !== null && _a !== void 0 ? _a : 0;
        widget.height = ((_b = this._size.height) !== null && _b !== void 0 ? _b : 0) - 1;
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
    UIWidget.prototype._resetSize = function () {
        if (typeof this._initialSize !== 'undefined') {
            this._size = this._initialSize;
        }
    };
    UIWidget.prototype._refreshUI = function () {
        this._update(this._widget);
    };
    UIWidget.prototype.updateUI = function (block) {
        if (block === void 0) { block = undefined; }
        block === null || block === void 0 ? void 0 : block(this);
        this._update(this._widget);
    };
    UIWidget.prototype.minSize = function (val) {
        this._minSize = val;
        return this;
    };
    UIWidget.prototype.width = function (val) {
        this._size = {
            width: val,
            height: this._size.height
        };
        this._initialSize = this._size;
        return this;
    };
    UIWidget.prototype.height = function (val) {
        this._size = {
            width: this._size.width,
            height: val
        };
        this._initialSize = this._size;
        return this;
    };
    UIWidget.prototype.size = function (val) {
        this._size = val;
        this._initialSize = val;
        return this;
    };
    UIWidget.prototype.tooltip = function (val) {
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
        _this._childs = widgets;
        _this._childs.forEach(function (val) {
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
        var widgets = this._childs.map(function (val) { return val._getUIWidgets(); }).flatMap();
        if (this._isGrouped) {
            widgets.unshift(this);
        }
        return widgets;
    };
    UIStack.prototype._getWidgets = function () {
        var widgets = this._childs.map(function (val) { return val._getWidgets(); }).flatMap();
        if (this._isGrouped) {
            widgets.unshift(this._widget);
        }
        return widgets;
    };
    UIStack.prototype._containerSize = function () {
        var _this = this;
        return this._childs.map(function (val) { return val._estimatedSize(); })
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
        return this._isGrouped && typeof this._groupTitle === 'undefined';
    };
    UIStack.prototype._estimatedSize = function () {
        var size = this._containerSize();
        var unNamedGroupCorrect = this._isUnNamedGroup() ? 4 : 0;
        return {
            width: size.width + this._insets.left + this._insets.right + this._padding.left + this._padding.right,
            height: size.height + this._insets.top + this._insets.bottom + this._padding.top + this._padding.bottom - unNamedGroupCorrect
        };
    };
    UIStack.prototype._isUndefinedSize = function (axis) {
        var _this = this;
        var sizeUndefinedChilds = this._childs.filter(function (val) { return val._isUndefinedSize(_this._axis); });
        if (sizeUndefinedChilds.length == 0) {
            switch (this._axis) {
                case UIAxis.Vertical: {
                    this._size = {
                        width: this._estimatedSize().width,
                        height: this._size.height
                    };
                }
                case UIAxis.Horizontal: {
                    this._size = {
                        width: this._size.width,
                        height: this._estimatedSize().height
                    };
                }
            }
        }
        return sizeUndefinedChilds.length > 0;
    };
    UIStack.prototype._layout = function (axis, origin, estimatedSize) {
        if (typeof this._initialSize === 'undefined') {
            this._initialSize = this._size;
        }
        var thisEstimatedSize = this._estimatedSize();
        thisEstimatedSize = {
            width: Math.max(thisEstimatedSize.width, estimatedSize.width),
            height: Math.max(thisEstimatedSize.height, estimatedSize.height)
        };
        var isUnNamedGroup = this._isUnNamedGroup();
        var unNamedGroupCorrect = isUnNamedGroup ? 4 : 0;
        if (isUnNamedGroup) {
            this._origin = {
                x: origin.x,
                y: origin.y - unNamedGroupCorrect
            };
            this._size = {
                width: thisEstimatedSize.width,
                height: thisEstimatedSize.height + unNamedGroupCorrect
            };
        }
        else {
            this._origin = origin;
            this._size = thisEstimatedSize;
        }
        var childContainerSize = {
            width: thisEstimatedSize.width - (this._insets.left + this._insets.right + this._padding.left + this._padding.right),
            height: thisEstimatedSize.height - (this._insets.top + this._insets.bottom + this._padding.top + this._padding.bottom) + unNamedGroupCorrect
        };
        var childOrigin = {
            x: this._origin.x + this._insets.left + this._padding.left,
            y: this._origin.y + this._insets.top + this._padding.top
        };
        var point = childOrigin;
        var sumOfSpacing = this._spacing * (this._childs.length - 1);
        switch (this._axis) {
            case UIAxis.Vertical: {
                var undefinedHeightChilds = this._childs.filter(function (val) { return typeof val._size.height === 'undefined'; });
                var numberOfUndefinedHeightChilds = undefinedHeightChilds.length;
                var sumOfExactChildHeights = this._childs.map(function (val) { var _a; return (_a = val._size.height) !== null && _a !== void 0 ? _a : 0; }).reduce(function (acc, val) { return acc + val; });
                var autoHeight = 0;
                if (numberOfUndefinedHeightChilds > 0) {
                    autoHeight = Math.floor((childContainerSize.height - sumOfSpacing - sumOfExactChildHeights) / numberOfUndefinedHeightChilds);
                }
                var storedAutoHeight = autoHeight;
                var stacks = undefinedHeightChilds.filter(function (val) { return val instanceof UIStack; });
                var stackMaxHeights = 0;
                if (stacks.length > 0) {
                    stackMaxHeights = stacks.map(function (val) { return Math.max(autoHeight, val._estimatedSize().height); }).reduce(function (acc, val) { return acc + val; });
                }
                var othersCount = numberOfUndefinedHeightChilds - stacks.length;
                if (othersCount > 0) {
                    autoHeight = Math.floor((childContainerSize.height - sumOfSpacing - sumOfExactChildHeights - stackMaxHeights) / othersCount);
                }
                for (var _i = 0, _a = this._childs; _i < _a.length; _i++) {
                    var child = _a[_i];
                    var isStack = child instanceof UIStack;
                    var isHeightUndefined = typeof child._size.height === 'undefined';
                    var childEstimatedHeight = child._estimatedSize().height;
                    var childEstimatedSize = {
                        width: childContainerSize.width,
                        height: isHeightUndefined ? (isStack ? Math.max(childEstimatedHeight, storedAutoHeight) : autoHeight) : childEstimatedHeight
                    };
                    point = child._layout(this._axis, { x: childOrigin.x, y: point.y }, childEstimatedSize);
                    point = { x: point.x, y: point.y + this._spacing };
                }
                return {
                    x: this._origin.x + this._size.width,
                    y: this._origin.y + this._size.height
                };
            }
            case UIAxis.Horizontal: {
                var undefinedWidthChilds = this._childs.filter(function (val) { return typeof val._size.width === 'undefined'; });
                var numberOfUndefinedWidthChilds = undefinedWidthChilds.length;
                var sumOfExactChildWidths = this._childs.map(function (val) { var _a; return (_a = val._size.width) !== null && _a !== void 0 ? _a : 0; }).reduce(function (acc, val) { return acc + val; });
                var autoWidth = 0;
                if (numberOfUndefinedWidthChilds > 0) {
                    autoWidth = Math.floor((childContainerSize.width - sumOfSpacing - sumOfExactChildWidths) / numberOfUndefinedWidthChilds);
                }
                var storedAutoWidth = autoWidth;
                var stacks = undefinedWidthChilds.filter(function (val) { return val instanceof UIStack; });
                var stackMaxWidths = 0;
                if (stacks.length > 0) {
                    stackMaxWidths = stacks.map(function (val) { return Math.max(autoWidth, val._estimatedSize().width); }).reduce(function (acc, val) { return acc + val; });
                }
                var othersCount = numberOfUndefinedWidthChilds - stacks.length;
                if (othersCount > 0) {
                    autoWidth = Math.floor((childContainerSize.width - sumOfSpacing - sumOfExactChildWidths - stackMaxWidths) / othersCount);
                }
                for (var _b = 0, _c = this._childs; _b < _c.length; _b++) {
                    var child = _c[_b];
                    var isStack = child instanceof UIStack;
                    var isWidthUndefined = typeof child._size.width === 'undefined';
                    var childEstimatedWidth = child._estimatedSize().width;
                    var childEstimatedSize = {
                        width: isWidthUndefined ? (isStack ? Math.max(childEstimatedWidth, storedAutoWidth) : autoWidth) : childEstimatedWidth,
                        height: childContainerSize.height
                    };
                    point = child._layout(this._axis, { x: point.x, y: childOrigin.y }, childEstimatedSize);
                    point = { x: point.x + this._spacing, y: point.y };
                }
                return {
                    x: this._origin.x + this._size.width,
                    y: this._origin.y + this._size.height
                };
            }
        }
    };
    UIStack.prototype._didLoad = function () {
        if (this._isGrouped) {
            _super.prototype._didLoad.call(this);
        }
        this._childs.forEach(function (val) { return val._didLoad(); });
    };
    UIStack.prototype._build = function () {
        var _a;
        if (this._isGrouped) {
            this._widget = __assign(__assign({}, this._buildBaseValues()), { text: (_a = this._groupTitle) !== null && _a !== void 0 ? _a : '', type: 'groupbox' });
        }
        this._childs.forEach(function (val) { return val._build(); });
    };
    UIStack.prototype._update = function (widget) {
        var _a;
        _super.prototype._update.call(this, widget);
        if (this._isGrouped) {
            widget.name = (_a = this._groupTitle) !== null && _a !== void 0 ? _a : '';
        }
    };
    UIStack.prototype._resetSize = function () {
        _super.prototype._resetSize.call(this);
        this._childs.forEach(function (val) { return val._resetSize(); });
    };
    UIStack.prototype._refreshUI = function () {
        if (this._isGrouped) {
            _super.prototype._refreshUI.call(this);
        }
        this._childs.forEach(function (val) { return val._refreshUI(); });
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
        var _this = _super.call(this) || this;
        _this._border = true;
        _this._isPressed = false;
        return _this;
    }
    UIButton.$ = function (title) {
        var button = new UIButton();
        return button.title(title)
            .minSize({ width: 50, height: 15 });
    };
    UIButton.$I = function (image) {
        var button = new UIButton();
        return button
            .image(image)
            .size({ width: 24, height: 24 })
            .minSize({ width: 50, height: 15 });
    };
    UIButton.prototype._build = function () {
        var _this = this;
        this._widget = __assign(__assign({}, this._buildBaseValues()), { type: 'button', border: this._border, image: this._image, isPressed: this._isPressed, text: this._title, onClick: function () {
                var _a;
                (_a = _this._onClick) === null || _a === void 0 ? void 0 : _a.call(_this, _this);
            } });
    };
    UIButton.prototype._update = function (widget) {
        var _a;
        _super.prototype._update.call(this, widget);
        widget.border = this._border;
        widget.image = (_a = this._image) !== null && _a !== void 0 ? _a : 0;
        widget.isPressed = this._isPressed;
        if (typeof this._title !== 'undefined') {
            widget.text = this._title;
        }
    };
    UIButton.prototype._isImage = function () {
        return typeof this._image !== 'undefined';
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
        if (spacing === void 0) { spacing = undefined; }
        var _this = _super.call(this) || this;
        _this._axis = UIAxis.Vertical;
        _this._spacing = spacing;
        return _this;
    }
    UISpacer.$ = function (spacing) {
        if (spacing === void 0) { spacing = undefined; }
        return new UISpacer(spacing);
    };
    UISpacer.prototype._isUndefinedSize = function (axis) {
        return false;
    };
    UISpacer.prototype._confirm = function (axis) {
        this._axis = axis;
        switch (axis) {
            case UIAxis.Vertical: {
                this._size = { width: undefined, height: this._spacing };
            }
            case UIAxis.Horizontal: {
                this._size = { width: this._spacing, height: undefined };
            }
        }
    };
    UISpacer.prototype._build = function () {
        this._widget = __assign(__assign({}, this._buildBaseValues()), { type: 'label' });
    };
    UISpacer.prototype._update = function (widget) {
        this._confirm(this._axis);
        _super.prototype._update.call(this, widget);
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
        return label.height(15)
            .minSize({ width: 50, height: 15 });
    };
    UILabel.prototype._build = function () {
        var _this = this;
        this._widget = __assign(__assign({}, this._buildBaseValues()), { type: 'label', text: this._text, textAlign: this._align, onChange: function (index) {
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
    UILabel.prototype.text = function (val) {
        this._text = val;
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
        var _this = _super.call(this) || this;
        _this._isChecked = false;
        _this._text = text !== null && text !== void 0 ? text : '';
        return _this;
    }
    UICheckbox.$ = function (text) {
        var checkbox = new UICheckbox(text);
        return checkbox
            .minSize({ width: 50, height: 15 });
    };
    UICheckbox.$UN = function () {
        var checkbox = new UICheckbox(undefined);
        return checkbox
            .size({ width: 11, height: 11 });
    };
    UICheckbox.prototype._build = function () {
        var _this = this;
        this._widget = __assign(__assign({}, this._buildBaseValues()), { type: 'checkbox', text: this._text, isChecked: this._isChecked, onChange: function (isChecked) {
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
        return typeof this._text === 'undefined';
    };
    UICheckbox.prototype.isChecked = function (val) {
        this._isChecked = val;
        return this;
    };
    UICheckbox.prototype.text = function (val) {
        this._text = val;
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
        var _this = _super.call(this) || this;
        _this._color = color !== null && color !== void 0 ? color : UIColor.Black;
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
        this._widget = __assign(__assign({}, this._buildBaseValues()), { type: 'colourpicker', colour: this._color, onChange: function (color) {
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
        var _this = _super.call(this) || this;
        _this._selectedIndex = 0;
        _this._items = items;
        return _this;
    }
    UIDropdown.$ = function (items) {
        var dropdown = new UIDropdown(items);
        return dropdown.height(15)
            .minSize({ width: 50, height: 15 });
    };
    UIDropdown.prototype._build = function () {
        var _this = this;
        this._widget = __assign(__assign({}, this._buildBaseValues()), { type: 'dropdown', textAlign: UITextAlignment.Center, items: this._items, selectedIndex: this._selectedIndex, onChange: function (index) {
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
        return spinner.height(15)
            .minSize({ width: 50, height: 15 });
    };
    UISpinner.prototype._build = function () {
        var _this = this;
        var usingFormatter = typeof this._formatter !== 'undefined';
        if (usingFormatter) {
            this._text = this._formatter(this._value);
        }
        else {
            this._text = this._value.toFixed(this._fixed);
        }
        this._widget = __assign(__assign({}, this._buildBaseValues()), { type: 'spinner', text: this._text, onDecrement: function () {
                var prev = _this._value;
                _this._value = Math.max(_this._value - _this._step, _this._min);
                _this._signal(prev, _this._value);
            }, onIncrement: function () {
                var prev = _this._value;
                _this._value = Math.min(_this._value + _this._step, _this._max);
                _this._signal(prev, _this._value);
            }, onClick: function () {
                var _a;
                (_a = _this._onClick) === null || _a === void 0 ? void 0 : _a.call(_this, _this);
            } });
    };
    UISpinner.prototype._signal = function (prev, current) {
        var _a;
        var fixedCurrent = current.toFixed(this._fixed);
        var zero = +0.0;
        var fixedZero = zero.toFixed(this._fixed);
        var negativeFixedZero = '-' + fixedZero;
        var isNegativeZero = fixedCurrent === negativeFixedZero;
        var usingFormatter = typeof this._formatter !== 'undefined';
        var valueChanged = prev.toFixed(this._fixed) != fixedCurrent;
        if (valueChanged) {
            if (usingFormatter) {
                if (isNegativeZero) {
                    this._text = this._formatter(zero);
                }
                else {
                    this._text = this._formatter(current);
                }
            }
            else {
                if (isNegativeZero) {
                    this._text = fixedZero;
                }
                else {
                    this._text = fixedCurrent;
                }
            }
            this.updateUI();
            (_a = this._onChange) === null || _a === void 0 ? void 0 : _a.call(this, this, current);
        }
    };
    UISpinner.prototype._update = function (widget) {
        _super.prototype._update.call(this, widget);
        widget.text = this._text;
    };
    UISpinner.prototype.range = function (min, max) {
        if (min > max) {
            console.log("min' cannot be greater than 'max'.");
        }
        else {
            this._min = min;
            this._max = max;
        }
        return this;
    };
    UISpinner.prototype.step = function (step, fixed) {
        this._step = step;
        if (typeof fixed === 'undefined') {
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
    UISpinner.prototype.onClick = function (block) {
        this._onClick = block;
        return this;
    };
    return UISpinner;
}(UIWidget));
var UITextBox = (function (_super) {
    __extends(UITextBox, _super);
    function UITextBox(text) {
        if (text === void 0) { text = undefined; }
        var _this = _super.call(this) || this;
        _this._maxLength = Number.MAX_VALUE;
        _this._text = text !== null && text !== void 0 ? text : '';
        return _this;
    }
    UITextBox.$ = function (text) {
        if (text === void 0) { text = undefined; }
        var textBox = new UITextBox(text);
        return textBox.height(15)
            .minSize({ width: 50, height: 15 });
    };
    UITextBox.prototype._build = function () {
        var _this = this;
        this._widget = __assign(__assign({}, this._buildBaseValues()), { type: 'textbox', text: this._text, maxLength: this._maxLength, onChange: function (text) {
                var _a;
                _this._text = text;
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
        _this._position = ui.mainViewport.getCentrePosition();
        return _this;
    }
    UIViewport.$ = function () {
        var viewport = new UIViewport();
        return viewport
            .minSize({ width: 165, height: 120 });
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
        this._widget = __assign(__assign({}, this._buildBaseValues()), { type: 'viewport', viewport: this._viewport });
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
        this.moveTo(this._position);
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
        this._position = val;
        this._viewport.moveTo(val);
    };
    UIViewport.prototype.scrollTo = function (val) {
        this._position = val;
        this._viewport.scrollTo(val);
    };
    UIViewport.prototype.scrollToMainViewportCenter = function () {
        this.scrollTo(ui.mainViewport.getCentrePosition());
    };
    UIViewport.prototype.mainViewportScrollToThis = function () {
        if (typeof this._viewport !== 'undefined') {
            ui.mainViewport.scrollTo(this.getCenterPosition());
        }
    };
    return UIViewport;
}(UIWidget));
var UIScrollbarType;
(function (UIScrollbarType) {
    UIScrollbarType["None"] = "none";
    UIScrollbarType["Vertical"] = "vertical";
    UIScrollbarType["Horizontal"] = "horizontal";
    UIScrollbarType["both"] = "both";
})(UIScrollbarType || (UIScrollbarType = {}));
var UISortOrder;
(function (UISortOrder) {
    UISortOrder["None"] = "none";
    UISortOrder["Ascending"] = "ascending";
    UISortOrder["Descending"] = "descending";
})(UISortOrder || (UISortOrder = {}));
var UIListViewColum = (function () {
    function UIListViewColum(header) {
        this._canSort = false;
        this._sortOrder = UISortOrder.None;
        this._header = header;
    }
    UIListViewColum.$ = function (header) {
        return new UIListViewColum(header);
    };
    UIListViewColum.$F = function (header, width) {
        var listView = new UIListViewColum(header);
        return listView.width(width);
    };
    UIListViewColum.$R = function (header, widthRange) {
        var listView = new UIListViewColum(header);
        if (typeof widthRange.min !== 'undefined') {
            listView = listView.minWidth(widthRange.min);
        }
        if (typeof widthRange.max !== 'undefined') {
            listView = listView.maxWidth(widthRange.max);
        }
        return listView;
    };
    UIListViewColum.$W = function (header, weight) {
        var listView = new UIListViewColum(header);
        return listView.weight(weight);
    };
    UIListViewColum.prototype._data = function () {
        return {
            canSort: this._canSort,
            sortOrder: this._sortOrder,
            header: this._header,
            headerTooltip: this._headerTooltip,
            width: this._width,
            ratioWidth: this._weight,
            minWidth: this._minWidth,
            maxWidth: this._maxWidth
        };
    };
    UIListViewColum.prototype.sortOrder = function (val) {
        this._sortOrder = val;
        return this;
    };
    UIListViewColum.prototype.canSort = function (val) {
        this._canSort = val;
        return this;
    };
    UIListViewColum.prototype.tooltip = function (val) {
        this._headerTooltip = val;
        return this;
    };
    UIListViewColum.prototype.width = function (val) {
        this._width = val;
        return this;
    };
    UIListViewColum.prototype.weight = function (val) {
        this._weight = val;
        return this;
    };
    UIListViewColum.prototype.minWidth = function (val) {
        this._minWidth = val;
        return this;
    };
    UIListViewColum.prototype.maxWidth = function (val) {
        this._maxWidth = val;
        return this;
    };
    return UIListViewColum;
}());
var UIListViewItem = (function () {
    function UIListViewItem(textList, isSeparator) {
        if (textList === void 0) { textList = []; }
        this._isSeparator = false;
        this._textList = textList;
    }
    UIListViewItem.$ = function (textList) {
        return new UIListViewItem(textList, false);
    };
    UIListViewItem.$S = function (text) {
        if (text === void 0) { text = undefined; }
        var val = typeof text === undefined ? [] : [text];
        return new UIListViewItem(val, true);
    };
    UIListViewItem.prototype._data = function () {
        if (this._isSeparator) {
            var text = this._textList.length > 0 ? this._textList[0] : undefined;
            return {
                type: 'seperator',
                text: text
            };
        }
        else {
            return this._textList;
        }
    };
    return UIListViewItem;
}());
var UIListView = (function (_super) {
    __extends(UIListView, _super);
    function UIListView(columns) {
        if (columns === void 0) { columns = undefined; }
        var _this = _super.call(this) || this;
        _this._scrollbarType = UIScrollbarType.None;
        _this._isStriped = false;
        _this._showColumnHeaders = false;
        _this._items = [];
        _this._canSelect = false;
        _this._columns = columns;
        return _this;
    }
    UIListView.$ = function (columns) {
        if (columns === void 0) { columns = undefined; }
        var listView = new UIListView(columns);
        return listView
            .minSize({ width: 165, height: 120 });
    };
    UIListView.prototype._build = function () {
        var _this = this;
        var _a;
        this._widget = __assign(__assign({}, this._buildBaseValues()), { type: 'listview', scrollbars: this._scrollbarType, isStriped: this._isStriped, showColumnHeaders: this._showColumnHeaders, columns: (_a = this._columns) === null || _a === void 0 ? void 0 : _a.map(function (val) { return val._data(); }), items: this._items.map(function (val) { return val._data(); }), selectedCell: this._selectedCell, canSelect: this._canSelect, onHighlight: function (item, column) {
                var _a;
                (_a = _this._onHeighlight) === null || _a === void 0 ? void 0 : _a.call(_this, _this, column, item);
            }, onClick: function (item, column) {
                var _a;
                (_a = _this._onClick) === null || _a === void 0 ? void 0 : _a.call(_this, _this, column, item);
            } });
    };
    UIListView.prototype._update = function (widget) {
        var _a;
        _super.prototype._update.call(this, widget);
        widget.scrollbars = this._scrollbarType;
        widget.isStriped = this._isStriped;
        widget.showColumnHeaders = this._showColumnHeaders;
        widget.columns = (_a = this._columns) === null || _a === void 0 ? void 0 : _a.map(function (val) { return val._data(); });
        widget.items = this._items.map(function (val) { return val._data(); });
        widget.selectedCell = this._selectedCell;
        widget.canSelect = this._canSelect;
    };
    UIListView.prototype.scrollbarType = function (val) {
        this._scrollbarType = val;
        return this;
    };
    UIListView.prototype.isStriped = function (val) {
        this._isStriped = val;
        return this;
    };
    UIListView.prototype.showColumnHeaders = function (val) {
        this._showColumnHeaders = val;
        return this;
    };
    UIListView.prototype.addColumn = function (val) {
        var _a;
        (_a = this._columns) === null || _a === void 0 ? void 0 : _a.push(val);
        return this;
    };
    UIListView.prototype.addColumns = function (val) {
        var _a;
        this._columns = (_a = this._columns) === null || _a === void 0 ? void 0 : _a.concat(val);
        return this;
    };
    UIListView.prototype.addItem = function (val) {
        this._items.push(val);
        return this;
    };
    UIListView.prototype.addItems = function (val) {
        this._items = this._items.concat(val);
        return this;
    };
    UIListView.prototype.selectCell = function (row, column) {
        this._selectedCell = { row: row, column: column };
        return this;
    };
    UIListView.prototype.canSelect = function (val) {
        this._canSelect = val;
        return this;
    };
    UIListView.prototype.getColumnData = function (val) {
        var _a;
        return (_a = this._columns) === null || _a === void 0 ? void 0 : _a[val];
    };
    UIListView.prototype.getItemData = function (val) {
        var _a;
        return (_a = this._items) === null || _a === void 0 ? void 0 : _a[val];
    };
    UIListView.prototype.getHighlightedCell = function () {
        var widget = this._widget;
        return widget.highlightedCell;
    };
    UIListView.prototype.onHeighlight = function (block) {
        this._onHeighlight = block;
        return this;
    };
    UIListView.prototype.onClick = function (block) {
        this._onClick = block;
        return this;
    };
    return UIListView;
}(UIWidget));
var openWindow = function () {
    UIWindow.$('직원', UIStack.$H(UIStack.$V(UISpacer.$(), UIStack.$H(UILabel.$('유니폼 색상:')
        .width(100), UIColorPicker.$(UIColor.BrightRed))), UISpacer.$(), UIButton.$I(5179)
        .onClick(function (val) {
        val.updateUI(function (widget) {
            if (widget._image == 5179) {
                widget.image(5180);
            }
            else {
                widget.image(5179);
            }
        });
    }), UIButton.$I(5180)
        .onClick(function (val) {
        val.updateUI(function (widget) {
            widget.isPressed(!widget._isPressed);
        });
    }), UIButton.$I(5181)), UIListView.$([
        UIListViewColum.$W('이름', 2)
            .tooltip('tooltip')
            .sortOrder(UISortOrder.Ascending)
            .canSort(true),
        UIListViewColum.$('역할'),
        UIListViewColum.$('상태')
    ]).showColumnHeaders(true)
        .scrollbarType(UIScrollbarType.both)
        .isStriped(true)
        .canSelect(true)
        .addItems([
        UIListViewItem.$(['미화원 1', '쓸기, 가꾸기, 비우기', '걷는 중']),
        UIListViewItem.$S()
    ])
        .onHeighlight(function (listView, column, item) {
        var itemData = listView.getItemData(item);
        console.log(itemData === null || itemData === void 0 ? void 0 : itemData._textList[column]);
    })
        .onClick(function (listView, column, item) {
        var itemData = listView.getItemData(item);
        console.log(itemData === null || itemData === void 0 ? void 0 : itemData._textList[column]);
    }), UILabel.$('1 미화원')).isExpandable(true)
        .colorPalette({
        primary: UIColor.Gray,
        secondary: UIColor.LightPurple
    })
        .show();
};
var main = function () {
    if (typeof ui === 'undefined') {
        console.log('Plugin not available on headless mode.');
        return;
    }
    ui.registerMenuItem('StackUI Demo', function () {
        openWindow();
    });
};
registerPlugin({
    name: 'StackUI',
    version: '0.0.1',
    authors: ['nExmond'],
    type: 'local',
    licence: 'MIT',
    main: main
});
