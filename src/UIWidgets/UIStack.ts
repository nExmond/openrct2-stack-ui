/// <reference path='UIWidget.ts' />

class UIStack extends UIWidget<GroupBoxWidget> {

    _axis: UIAxis;
    _spacing = 0;
    _childs: UIWidget<any>[];

    _isGrouped: boolean;
    _groupTitle: string | undefined;

    _widget: GroupBoxWidget | any;

    _insets: UIEdgeInsets = UIEdgeInsetsZero;
    _padding: UIEdgeInsets = UIEdgeInsetsZero;

    constructor(axis: UIAxis, widgets: UIWidget<any>[], isGrouped: boolean = false) {
        super();
        this._axis = axis;
        this._childs = widgets;
        this._childs.forEach((val) => {
            if (val instanceof UISpacer) {
                val._confirm(axis);
            }
        })
        this._isGrouped = isGrouped;
        if (isGrouped) {
            this._insets = {
                top: 6,
                left: 2,
                bottom: 2,
                right: 2
            };
        }
    }

    //Convenience

    static $(axis: UIAxis, isGrouped: boolean = false, ...widgets: UIWidget<any>[]): UIStack {
        return new UIStack(axis, widgets, isGrouped);
    }
    static $V(...widgets: UIWidget<any>[]): UIStack {
        return new UIStack(UIAxis.Vertical, widgets, false);
    }
    static $H(...widgets: UIWidget<any>[]): UIStack {
        return new UIStack(UIAxis.Horizontal, widgets, false);
    }
    static $VG(...widgets: UIWidget<any>[]): UIStack {
        return new UIStack(UIAxis.Vertical, widgets, true);
    }
    static $HG(...widgets: UIWidget<any>[]): UIStack {
        return new UIStack(UIAxis.Horizontal, widgets, true);
    }

    //Private

    _getUIWidgets(): UIWidget<any>[] {
        var widgets: UIWidget<any>[] = this._childs.map((val) => val._getUIWidgets()).flatMap();
        if (this._isGrouped) {
            widgets.unshift(this);
        }
        return widgets;
    }

    _getWidgets(): Widget[] {
        var widgets: Widget[] = this._childs.map((val) => val._getWidgets()).flatMap();
        if (this._isGrouped) {
            widgets.unshift(this._widget);
        }
        return widgets;
    }

    _containerSize(): UISize {
        return this._childs.map((val) => val._estimatedSize())
            .reduce((acc, val) => {
                switch (this._axis) {
                    case UIAxis.Vertical: {
                        return {
                            width: Math.max(acc.width, val.width),
                            height: acc.height + val.height + this._spacing
                        }
                    }
                    case UIAxis.Horizontal: {
                        return {
                            width: acc.width + val.width + this._spacing,
                            height: Math.max(acc.height, val.height)
                        }
                    }
                }
            });
    }

    _isUnNamedGroup(): boolean {
        return this._isGrouped && typeof this._groupTitle === 'undefined';
    }

    _estimatedSize(): UISize {
        var size = this._containerSize();
        var unNamedGroupCorrect = this._isUnNamedGroup() ? 4 : 0;
        return {
            width: size.width + this._insets.left + this._insets.right + this._padding.left + this._padding.right,
            height: size.height + this._insets.top + this._insets.bottom + this._padding.top + this._padding.bottom - unNamedGroupCorrect
        }
    }

    _isUndefinedSize(axis: UIAxis): boolean {
        return this._childs.filter((val) => val._isUndefinedSize(axis)).length > 0;
    }

    _layout(axis: UIAxis, origin: UIPoint, estimatedSize: UISize): UIPoint {
        if (typeof this._initialSize === 'undefined') {
            this._initialSize = this._size;
        }

        var thisEstimatedSize = this._estimatedSize();
        thisEstimatedSize = {
            width: Math.max(thisEstimatedSize.width, estimatedSize.width),
            height: Math.max(thisEstimatedSize.height, estimatedSize.height)
        }

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
        } else {
            this._origin = origin;
            this._size = thisEstimatedSize;
        }

        var childContainerSize: UISize = {
            width: thisEstimatedSize.width - (this._insets.left + this._insets.right + this._padding.left + this._padding.right),
            height: thisEstimatedSize.height - (this._insets.top + this._insets.bottom + this._padding.top + this._padding.bottom) + unNamedGroupCorrect
        };
        var childOrigin: UIPoint = {
            x: this._origin.x + this._insets.left + this._padding.left + this._offset.x,
            y: this._origin.y + this._insets.top + this._padding.top + this._offset.y
        }
        var point = childOrigin;

        var exactSizeChilds = this._childs.filter((val) => !val._isUndefinedSize(this._axis));
        var undefinedSizeChilds = this._childs.filter((val) => val._isUndefinedSize(this._axis));
        var numberOfUndefinedSizeChilds = undefinedSizeChilds.length;
        var undefinedSizeStacks = undefinedSizeChilds.filter((val) => val instanceof UIStack);

        var sumOfSpacing = this._spacing * (this._childs.length - 1);

        switch (this._axis) {
            case UIAxis.Vertical: {
                var sumOfExactChildHeights = 0;
                if (exactSizeChilds.length > 0) {
                    sumOfExactChildHeights = exactSizeChilds.map((val) => val._estimatedSize().height).reduce((acc, val) => acc + val);
                }

                var autoHeight: number = 0;
                if (numberOfUndefinedSizeChilds > 0) {
                    autoHeight = Math.floor((childContainerSize.height - sumOfSpacing - sumOfExactChildHeights) / numberOfUndefinedSizeChilds);
                }
                var storedAutoHeight = autoHeight;

                var stackMaxHeights = 0;
                if (undefinedSizeStacks.length > 0) {
                    stackMaxHeights = undefinedSizeStacks.map((val) => Math.max(autoHeight, val._estimatedSize().height)).reduce((acc, val) => acc + val);
                }
                var othersCount = numberOfUndefinedSizeChilds - undefinedSizeStacks.length;
                if (othersCount > 0) {
                    autoHeight = Math.floor((childContainerSize.height - sumOfSpacing - sumOfExactChildHeights - stackMaxHeights) / othersCount);
                }

                for (var child of this._childs) {
                    var isStack = child instanceof UIStack;
                    var isHeightUndefined = child._isUndefinedSize(this._axis);
                    var childEstimatedHeight = child._estimatedSize().height;
                    var childEstimatedSize: UISize = {
                        width: childContainerSize.width,
                        height: isHeightUndefined ? (isStack ? Math.max(childEstimatedHeight, storedAutoHeight) : autoHeight) : childEstimatedHeight
                    };
                    point = child._layout(
                        this._axis,
                        { x: childOrigin.x, y: point.y },
                        childEstimatedSize
                    )
                    point = { x: point.x, y: point.y + this._spacing }
                }

                break;
            }
            case UIAxis.Horizontal: {
                var sumOfExactChildWidths = 0;
                if (exactSizeChilds.length > 0) {
                    sumOfExactChildWidths = exactSizeChilds.map((val) => val._estimatedSize().width).reduce((acc, val) => acc + val);
                }

                var autoWidth: number = 0;
                if (numberOfUndefinedSizeChilds > 0) {
                    autoWidth = Math.floor((childContainerSize.width - sumOfSpacing - sumOfExactChildWidths) / numberOfUndefinedSizeChilds);
                }
                var storedAutoWidth = autoWidth;

                var stackMaxWidths = 0;
                if (undefinedSizeStacks.length > 0) {
                    stackMaxWidths = undefinedSizeStacks.map((val) => Math.max(autoWidth, val._estimatedSize().width)).reduce((acc, val) => acc + val);
                }
                var othersCount = numberOfUndefinedSizeChilds - undefinedSizeStacks.length;
                if (othersCount > 0) {
                    autoWidth = Math.floor((childContainerSize.width - sumOfSpacing - sumOfExactChildWidths - stackMaxWidths) / othersCount);
                }

                for (var child of this._childs) {
                    var isStack = child instanceof UIStack;
                    var isWidthUndefined = child._isUndefinedSize(this._axis);
                    var childEstimatedWidth = child._estimatedSize().width;
                    var childEstimatedSize: UISize = {
                        width: isWidthUndefined ? (isStack ? Math.max(childEstimatedWidth, storedAutoWidth) : autoWidth) : childEstimatedWidth,
                        height: childContainerSize.height
                    };
                    point = child._layout(
                        this._axis,
                        { x: point.x, y: childOrigin.y },
                        childEstimatedSize
                    )
                    point = { x: point.x + this._spacing, y: point.y }
                }

                break;
            }
        }

        return {
            x: this._origin.x + this._size.width!,
            y: this._origin.y + this._size.height!
        }
    }

    _loadWidget() {
        if (this._isGrouped) {
            super._loadWidget();
        }
        this._childs.forEach((val) => val._loadWidget());
    }

    _build() {
        if (this._isGrouped) {
            this._widget = {
                ...this._buildBaseValues(),
                text: this._groupTitle ?? '',
                type: 'groupbox'
            }
        }
        this._childs.forEach((val) => val._build())
    }

    _update(widget: any) {
        super._update(widget);
        if (this._isGrouped) {
            widget.name = this._groupTitle ?? '';
        }
    }

    _resetSize() {
        super._resetSize();
        this._childs.forEach((val) => val._resetSize());
    }

    _refreshUI() {
        if (this._isGrouped) {
            super._refreshUI();
        }
        this._childs.forEach((val) => val._refreshUI());
    }

    //Public

    spacing(val: number): this {
        this._spacing = val;
        return this;
    }

    padding(val: UIEdgeInsets): this {
        this._padding = val;
        return this;
    }

    title(val: string): this {
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
    }
}
