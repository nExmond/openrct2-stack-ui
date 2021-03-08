/// <reference path='../UICore/UIAxis.ts' />
/// <reference path='../UICore/UIPoint.ts' />
/// <reference path='../UICore/UISize.ts' />

class UIWidget<T extends Widget> {

    _origin: UIPoint = UIPointZero;
    _size: UIOptionalSize = UIOptionalSizeDefulat;
    _name: string;
    _tooltip: string | undefined;
    _isDisabled: boolean = false;
    _isVisible: boolean = true;

    _interactor!: UIInteractor;

    _widget!: T | any;

    _minSize: UISize = UISizeZero;
    _initialSize: UIOptionalSize | undefined;

    _offset: UIPoint = UIPointZero;

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
        var minSize = this._minSize;
        return {
            width: this._size.width ?? minSize.width,
            height: this._size.height ?? minSize.height
        }
    }

    _isUndefinedSize(axis: UIAxis): boolean {
        switch (axis) {
            case UIAxis.Vertical: {
                return typeof this._size.height === 'undefined';
            }
            case UIAxis.Horizontal: {
                return typeof this._size.width === 'undefined';
            }
        }
    }

    _layout(axis: UIAxis, origin: UIPoint, estimatedSize: UISize): UIPoint {
        if (typeof this._initialSize === 'undefined') {
            this._initialSize = this._size;
        }

        this._origin = {
            x: origin.x + this._offset.x,
            y: origin.y + this._offset.y
        };
        this._size = {
            width: this._size.width ?? estimatedSize.width,
            height: this._size.height ?? estimatedSize.height
        }
        switch (axis) {
            case UIAxis.Vertical: {
                return {
                    x: origin.x,
                    y: origin.y + this._size.height!
                }
            }
            case UIAxis.Horizontal: {
                return {
                    x: origin.x + this._size.width!,
                    y: origin.y
                }
            }
        }
    }

    _build() {
        throw new Error('Method not implemented.');
    }

    _update(widget: T) {
        widget.x = this._origin.x;
        widget.y = this._origin.y;
        widget.width = this._size.width ?? 0;
        widget.height = (this._size.height ?? 0) - 1;
        widget.tooltip = this._tooltip;
        widget.isDisabled = this._isDisabled;
        widget.isVisible = this._isVisible;
    }

    _buildBaseValues(): {} {
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
        this._interactor.update(this._name, (widget: T) => {
            this._widget = widget;
        });
    }

    _resetSize() {
        if (typeof this._initialSize !== 'undefined') {
            this._size = this._initialSize;
        }
    }

    _refreshUI() {
        this._update(this._widget);
    }

    //Public

    updateUI(block: ((widget: this) => void) | undefined = undefined) {
        block?.(this);
        this._refreshUI();
    }

    minSize(val: UISize): this {
        this._minSize = val;
        return this;
    }

    width(val: number): this {
        this._size = {
            width: val,
            height: this._size.height
        }
        this._initialSize = this._size;
        return this;
    }

    height(val: number): this {
        this._size = {
            width: this._size.width,
            height: val
        }
        this._initialSize = this._size;
        return this;
    }

    size(val: UISize): this {
        this._size = val;
        this._initialSize = val;
        return this;
    }

    tooltip(val: string): this {
        this._tooltip = val;
        return this;
    }

    isDisabled(val: boolean): this {
        this._isDisabled = val;
        return this;
    }

    isVisible(val: boolean): this {
        this._isVisible = val;
        return this;
    }

    offset(val: UIPoint): this {
        this._offset = val;
        return this;
    }
}
