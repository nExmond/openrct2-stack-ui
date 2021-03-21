/// <reference path='UIWidget.ts' />
/// <reference path='../UICore/UIColor.ts' />

class UIColorPicker extends UIWidget<ColourPickerWidget> {

    protected _color: UIColor;
    protected _onChange: ((picker: this, color: UIColor) => void) | undefined;

    constructor(color: UIColor | undefined) {
        super();
        this._color = color ?? UIColor.Black;
    }

    //Convenience

    static $(color: UIColor | undefined = undefined): UIColorPicker {
        const colorPicker = new UIColorPicker(color);
        return colorPicker
            .size({ width: 12, height: 12 });
    }

    //Private

    _build() {
        this._widget = {
            ...this._buildBaseValues(),
            type: 'colourpicker',
            colour: this._color,
            onChange: (color: number) => {
                this._color = color;
                this._onChange?.call(this, this, this._color);
            }
        }
    }

    _update(widget: ColourPickerWidget) {
        super._update(widget);
        widget.colour = this._color;
    }

    //Public

    color(val: UIColor): this {
        this._color = val;
        return this;
    }

    onChange(block: (picker: this, color: UIColor) => void): this {
        this._onChange = block;
        return this;
    }
}
