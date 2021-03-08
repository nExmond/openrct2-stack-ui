/// <reference path='UIWidget.ts' />

class UISpacer extends UIWidget<LabelWidget> {

    _axis!: UIAxis;
    _spacing: number | undefined;

    constructor(spacing: number | undefined = undefined) {
        super();
        this._spacing = spacing;
    }

    //Convenience

    static $(spacing: number | undefined = undefined): UISpacer {
        return new UISpacer(spacing);
    }

    //Private

    _isUndefinedSize(axis: UIAxis): boolean {
        if (axis === this._axis) {
            return super._isUndefinedSize(axis);
        } else {
            return false;
        }
    }

    _confirm(axis: UIAxis) {
        this._axis = axis;
        switch (axis) {
            case UIAxis.Vertical: {
                this._size = { width: undefined, height: this._spacing };
                break;
            }
            case UIAxis.Horizontal: {
                this._size = { width: this._spacing, height: undefined };
                break;
            }
        }
    }

    _build() {
        this._widget = {
            ...this._buildBaseValues(),
            type: 'label'
        }
    }
}