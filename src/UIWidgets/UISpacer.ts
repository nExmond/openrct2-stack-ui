/// <reference path="UIWidget.ts" />

/**
 * Widget to flexibly set the distance between widgets.
 * It adjusts flexibly along the axis of the parent stack.
 */
class UISpacer extends UIWidget<LabelWidget> {

    protected _axis!: UIAxis;
    protected _spacing?: number;

    /**
     * Creates an instance of spacer.
     * If you set the spacing, the size will be fixed, otherwise it will be adjusted flexibly.
     * @param spacing 
     */
    constructor(spacing: number | undefined = undefined) {
        super();
        this._spacing = spacing;
    }

    //Convenience

    /**
     * Create *UISpacer* instance without using new.
     */
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
            type: "label"
        }
    }

    //Public

    /**
     * Axis on which to set the spacing.
     */
    getAxis(): UIAxis {
        return this._axis;
    }

    getSpacing(): number | undefined {
        return this._spacing;
    }
}