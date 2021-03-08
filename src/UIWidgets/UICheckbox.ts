/// <reference path='UIWidget.ts' />

class UICheckbox extends UIWidget<CheckboxWidget> {

    _text: string;
    _isChecked: boolean = false;
    _onChange: ((checkbox: this, isChecked: boolean) => void) | undefined;

    constructor(text: string | undefined) {
        super();
        this._text = text ?? '';
    }

    //Convenience

    static $(text: string): UICheckbox {
        var checkbox = new UICheckbox(text);
        return checkbox
            .minSize({ width: 50, height: 15 });
    }

    static $UN(): UICheckbox {
        var checkbox = new UICheckbox(undefined);
        return checkbox
            .size({ width: 11, height: 11 })
    }

    //Private

    _build() {
        this._widget = {
            ...this._buildBaseValues(),
            type: 'checkbox',
            text: this._text,
            isChecked: this._isChecked,
            onChange: (isChecked: boolean) => {
                this._isChecked = isChecked;
                this._onChange?.call(this, this, this._isChecked);
            }
        }
    }

    _update(widget: CheckboxWidget) {
        super._update(widget);
        widget.text = this._text;
        widget.isChecked = this._isChecked;
    }

    _isUnnamed(): boolean {
        return typeof this._text === 'undefined';
    }

    //Public

    isChecked(val: boolean): this {
        this._isChecked = val;
        return this;
    }

    text(val: string): this {
        this._text = val;
        return this;
    }

    onChange(block: (checkbox: this, isChecked: boolean) => void): this {
        this._onChange = block;
        return this;
    }
}