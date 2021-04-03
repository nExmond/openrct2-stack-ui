/// <reference path="UIWidget.ts" />

/**
 * The core part responsible for the placement of widgets.
 * All widgets can be laid out regularly with a combination of stacks.
 * *GroupBox* widget included.
 */
class UIStack extends UIWidget<GroupBoxWidget> {

    protected _axis: UIAxis;
    protected _spacing = 0;
    protected _childs: UIWidget<any>[];

    protected _isGrouped: boolean;
    protected _groupTitle: string | undefined;

    _widget: GroupBoxWidget | any;

    protected _insets: UIEdgeInsets = UIEdgeInsetsZero;
    protected _padding: UIEdgeInsets = UIEdgeInsetsZero;

    /**
     * Creates an instance of uistack.
     * @param axis vertical or horizontal
     * @param widgets 
     * @param isGrouped If set to true, it is used as a group box. The default is false.
     */
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

    /**
     * Create *UIStack* instance without using new.
     */
    static $(axis: UIAxis, isGrouped: boolean = false, ...widgets: UIWidget<any>[]): UIStack {
        return new UIStack(axis, widgets, isGrouped);
    }
    /**
     * Create vertical *UIStack* instance without using new.
     */
    static $V(...widgets: UIWidget<any>[]): UIStack {
        return new UIStack(UIAxis.Vertical, widgets, false);
    }
    /**
     * Create horizontal *UIStack* instance without using new.
     */
    static $H(...widgets: UIWidget<any>[]): UIStack {
        return new UIStack(UIAxis.Horizontal, widgets, false);
    }
    /**
     * Create vertical *UIStack* instance containing *GroupBox* without using new.
     */
    static $VG(...widgets: UIWidget<any>[]): UIStack {
        return new UIStack(UIAxis.Vertical, widgets, true);
    }
    /**
     * Create horizontal *UIStack* instance containing *GroupBox* without using new.
     */
    static $HG(...widgets: UIWidget<any>[]): UIStack {
        return new UIStack(UIAxis.Horizontal, widgets, true);
    }

    //Private

    _getUIWidgets(): UIWidget<any>[] {
        const widgets: UIWidget<any>[] = this._childs.map((val) => val._getUIWidgets()).flatMap();
        if (this._isGrouped) {
            widgets.unshift(this);
        }
        return widgets;
    }

    _getWidgets(): Widget[] {
        const widgets: Widget[] = this._childs.map((val) => val._getWidgets()).flatMap();
        if (this._isGrouped) {
            widgets.unshift(this._widget);
        }
        return widgets;
    }

    protected _containerSize(): UISize {
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

    protected _isUnNamedGroup(): boolean {
        return this._isGrouped && typeof this._groupTitle === "undefined";
    }

    _estimatedSize(): UISize {
        const size = this._containerSize();
        const unNamedGroupCorrect = this._isUnNamedGroup() ? 4 : 0;
        return {
            width: size.width + this._insets.left + this._insets.right + this._padding.left + this._padding.right,
            height: size.height + this._insets.top + this._insets.bottom + this._padding.top + this._padding.bottom - unNamedGroupCorrect
        }
    }

    _isUndefinedSize(axis: UIAxis): boolean {
        return this._childs.filter((val) => val._isUndefinedSize(axis)).length > 0;
    }

    _layout(axis: UIAxis, origin: UIPoint, estimatedSize: UISize): UIPoint {
        if (typeof this._initialSize === "undefined") {
            this._initialSize = this._size;
        }

        var thisEstimatedSize = this._estimatedSize();
        thisEstimatedSize = {
            width: Math.max(thisEstimatedSize.width, estimatedSize.width),
            height: Math.max(thisEstimatedSize.height, estimatedSize.height)
        }

        const isUnNamedGroup = this._isUnNamedGroup();
        const unNamedGroupCorrect = isUnNamedGroup ? 4 : 0;
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

        const childContainerSize: UISize = {
            width: thisEstimatedSize.width - (this._insets.left + this._insets.right + this._padding.left + this._padding.right),
            height: thisEstimatedSize.height - (this._insets.top + this._insets.bottom + this._padding.top + this._padding.bottom) + unNamedGroupCorrect
        };
        const childOrigin: UIPoint = {
            x: this._origin.x + this._insets.left + this._padding.left + this._offset.x,
            y: this._origin.y + this._insets.top + this._padding.top + this._offset.y
        }
        var point = childOrigin;

        const exactSizeChilds = this._childs.filter((val) => !val._isUndefinedSize(this._axis));
        const undefinedSizeChilds = this._childs.filter((val) => val._isUndefinedSize(this._axis));
        const numberOfUndefinedSizeChilds = undefinedSizeChilds.length;
        const undefinedSizeStacks = undefinedSizeChilds.filter((val) => val instanceof UIStack);

        const sumOfSpacing = this._spacing * (this._childs.length - 1);

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
                const storedAutoHeight = autoHeight;

                var stackMaxHeights = 0;
                if (undefinedSizeStacks.length > 0) {
                    stackMaxHeights = undefinedSizeStacks.map((val) => Math.max(autoHeight, val._estimatedSize().height)).reduce((acc, val) => acc + val);
                }
                var othersCount = numberOfUndefinedSizeChilds - undefinedSizeStacks.length;
                if (othersCount > 0) {
                    autoHeight = Math.floor((childContainerSize.height - sumOfSpacing - sumOfExactChildHeights - stackMaxHeights) / othersCount);
                }

                for (var child of this._childs) {
                    const isStack = child instanceof UIStack;
                    const isHeightUndefined = child._isUndefinedSize(this._axis);
                    const childEstimatedHeight = child._estimatedSize().height;
                    const childEstimatedSize: UISize = {
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
                const storedAutoWidth = autoWidth;

                var stackMaxWidths = 0;
                if (undefinedSizeStacks.length > 0) {
                    stackMaxWidths = undefinedSizeStacks.map((val) => Math.max(autoWidth, val._estimatedSize().width)).reduce((acc, val) => acc + val);
                }
                var othersCount = numberOfUndefinedSizeChilds - undefinedSizeStacks.length;
                if (othersCount > 0) {
                    autoWidth = Math.floor((childContainerSize.width - sumOfSpacing - sumOfExactChildWidths - stackMaxWidths) / othersCount);
                }

                for (var child of this._childs) {
                    const isStack = child instanceof UIStack;
                    const isWidthUndefined = child._isUndefinedSize(this._axis);
                    const childEstimatedWidth = child._estimatedSize().width;
                    const childEstimatedSize: UISize = {
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
                text: this._groupTitle ?? "",
                type: "groupbox"
            }
        }
        this._childs.forEach((val) => val._build())
    }

    _update(widget: any) {
        super._update(widget);
        if (this._isGrouped) {
            widget.name = this._groupTitle ?? "";
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

    getAxis(): UIAxis {
        return this._axis;
    }

    /**
     * Widget spacing on stack.
     */
    spacing(val: number): this {
        this._spacing = val;
        return this;
    }

    getSpacing(): number {
        return this._spacing;
    }

    /**
     * stack padding.
     */
    padding(val: UIEdgeInsets): this {
        this._padding = val;
        return this;
    }

    getPadding(): UIEdgeInsets {
        return this._padding;
    }

    getIsGrouped(): boolean {
        return this._isGrouped;
    }

    /**
     * Title when used as *GroupBox*
     */
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

    getGroupBoxTitle(): string | undefined {
        return this._groupTitle;
    }

    getChilds(): UIWidget<any>[] {
        return this._childs;
    }
}
