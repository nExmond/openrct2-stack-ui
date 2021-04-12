/// <reference path="../UICore/UIAxis.ts" />
/// <reference path="../UICore/UIPoint.ts" />
/// <reference path="../UICore/UISize.ts" />

/**
 * Raw widget wrapper.
 * UI component used by including it in a window or tab.
 */
class UIWidget<T extends Widget> {

    protected _origin: UIPoint = UIPointZero;
    protected _size: UIOptionalSize = UIOptionalSizeDefulat;
    _name: string;
    protected _tooltip: string | undefined;
    protected _isDisabled: boolean = false;
    protected _isVisible: boolean = true;

    _interactor!: UIInteractor;

    protected _widget!: T | any;

    protected _minSize: UISize = UISizeZero;
    protected _initialSize: UIOptionalSize | undefined;

    protected _offset: UIPoint = UIPointZero;

    protected _font: TextFont | undefined;

    protected _didLoad: ((widget: UIWidget<T>) => void) | undefined;

    constructor() {
        //https://stackoverflow.com/questions/13613524/get-an-objects-class-name-at-runtime
        this._name = this.constructor.name + '-' + uuid();
    }

    //Private

    _getUIWidgets(): UIWidget<any>[] {
        return [this];
    }

    _getWidgets(): Widget[] {
        return [this._widget];
    }

    _estimatedSize(): UISize {
        const minSize = this._minSize;
        return {
            width: this._size.width ?? minSize.width,
            height: this._size.height ?? minSize.height
        }
    }

    _isUndefinedSize(axis: UIAxis): boolean {
        switch (axis) {
            case UIAxis.Vertical: {
                return typeof this._size.height === "undefined";
            }
            case UIAxis.Horizontal: {
                return typeof this._size.width === "undefined";
            }
        }
    }

    _layout(axis: UIAxis, origin: UIPoint, estimatedSize: UISize): UIPoint {
        if (typeof this._initialSize === "undefined") {
            this._initialSize = this._size;
        }

        this._origin = {
            x: origin.x + this._offset.x,
            y: origin.y + this._offset.y
        };
        var size = {
            width: this._size.width ?? estimatedSize.width,
            height: this._size.height ?? estimatedSize.height
        }
        this._size = {
            width: size.width - 1,
            height: size.height
        }
        switch (axis) {
            case UIAxis.Vertical: {
                return {
                    x: origin.x,
                    y: origin.y + size.height!
                }
            }
            case UIAxis.Horizontal: {
                return {
                    x: origin.x + size.width!,
                    y: origin.y
                }
            }
        }
    }

    _build() {
        throw new Error("Method not implemented.");
    }

    _update(widget: T) {
        widget.x = this._origin.x;
        widget.y = this._origin.y;
        widget.width = (this._size.width ?? 0) - 1;
        widget.height = (this._size.height ?? 0) - 1;
        widget.tooltip = this._tooltip;
        widget.isDisabled = this._isDisabled;
        widget.isVisible = this._isVisible;
    }

    protected _buildBaseValues(): {} {
        return {
            x: this._origin.x,
            y: this._origin.y,
            width: this._size.width ?? 0,
            height: this._size.height ?? 0,
            name: this._name,
            tooltip: this._tooltip,
            isDisabled: this._isDisabled,
            isVisible: this._isVisible
        }
    }

    _loadWidget() {
        this._interactor._update(this._name, (widget: T) => {
            this._widget = widget;
        });
        this._didLoad?.call(this, this);
    }

    _resetSize() {
        if (typeof this._initialSize !== "undefined") {
            this._size = this._initialSize;
        }
    }

    _refreshUI() {
        this._update(this._widget);
    }

    protected _applyFont(text: string | undefined): string | undefined {
        if (typeof this._font !== "undefined" && typeof text !== "undefined") {
            return new TextBuilder(text).font(this._font).build();
        } else {
            return text;
        }
    }

    //Public

    /**
     * Modify and update the properties of the widget.
     * When it detects a change in size value, it recalurate the window layout.
     * * If you change the property without using the update block, it will be reflected in the next update.
     * @param block update block
     */
    updateUI(block: ((widget: this) => void) | undefined = undefined) {
        var prevSize = this._size;
        block?.(this);
        var changedSize = this._size;
        if (prevSize.width === changedSize.width && prevSize.height === changedSize.height) {
            this._refreshUI();
        } else {
            this._interactor.refreshWindow();
        }
    }

    getOrigin(): UIPoint {
        return this._origin;
    }

    /**
     * Set the minimum size.
     */
    minSize(val: UISize): this {
        this._minSize = val;
        return this;
    }

    getMinSize(): UISize {
        return this._minSize;
    }

    /**
     * Set the width.
     */
    width(val: number): this {
        this._size = {
            width: val,
            height: this._size.height
        }
        this._initialSize = this._size;
        return this;
    }

    /**
     * Set the height.
     */
    height(val: number): this {
        this._size = {
            width: this._size.width,
            height: val
        }
        this._initialSize = this._size;
        return this;
    }

    /**
     * Set the size.
     */
    size(val: UISize | number): this {
        var size = UISizeZero;
        if (typeof val === "number") {
            size = { width: val, height: val };
        } else {
            size = val;
        }
        this._size = size;
        this._initialSize = size;
        return this;
    }

    getSize(): UISize {
        const size = this._size;
        return {
            width: size.width ?? 0,
            height: size.height ?? 0
        };
    }

    /**
     * Set the tooltip.
     */
    tooltip(val: string): this {
        this._tooltip = val;
        return this;
    }

    getTooltip(): string | undefined {
        return this._tooltip;
    }

    /**
     * Disable the widget.
     */
    isDisabled(val: boolean): this {
        this._isDisabled = val;
        return this;
    }

    getIsDisabled(): boolean {
        return this._isDisabled;
    }

    /**
     * Set the widget to the visible state
     */
    isVisible(val: boolean): this {
        this._isVisible = val;
        return this;
    }

    getIsVisible(): boolean {
        return this._isVisible;
    }

    /**
     * Set the offset.
     */
    offset(val: UIPoint): this {
        this._offset = val;
        return this;
    }

    getOffset(): UIPoint {
        return this._offset;
    }

    /**
     * Set the font.
     */
    font(val: TextFont): this {
        this._font = val;
        return this;
    }

    getFont(): TextFont | undefined {
        return this._font;
    }

    /**
     * Bind with widget proxy.
     */
    bind(proxy: UIWidgetProxy<this>): this {
        proxy._bind(this);
        return this;
    }

    /**
     * Reverts to the initially set size.
     */
    resetSize(): this {
        return this.size(this._minSize);
    }

    /**
     * This function is called immediately after the widget is displayed.
     */
    didLoad(block: (widget: this) => void): this {
        this._didLoad = block as (widget: UIWidget<T>) => void;
        return this;
    }

    /**
     * Descriptions uiwidget
     * @returns description 
     */
    description(): string {
        return `
name: ${this._name}
origin: { x: ${this._origin.x}, y: ${this._origin.y} }
size: { width: ${this._size.width}, height: ${this._size.height} }
`;
    }
}
