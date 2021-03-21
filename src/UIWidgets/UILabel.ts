/// <reference path='UIWidget.ts' />
/// <reference path='../UICore/UITextAlignment.ts' />

class UILabel extends UIWidget<LabelWidget> {

    _text: string;
    _align: UITextAlignment = UITextAlignment.Left;
    _onChange: ((label: this, index: number) => void) | undefined;

    constructor(text: string) {
        super();
        this._text = text;
    }

    //Convenience

    static $(text: string): UILabel {
        var label = new UILabel(text);
        return label.height(15)
            .minSize({ width: 50, height: 15 });
    }

    //Private

    _build() {
        this._widget = {
            ...this._buildBaseValues(),
            type: 'label',
            text: this._applyFont(this._text),
            textAlign: this._align,
            onChange: (index: number) => {
                this._onChange?.call(this, this, index);
            }
        }
    }

    _update(widget: LabelWidget) {
        super._update(widget);
        widget.text = this._applyFont(this._text);
        widget.textAlign = this._align;
    }

    //Public

    align(val: UITextAlignment): this {
        this._align = val;
        return this;
    }

    text(val: string): this {
        this._text = val;
        return this;
    }

    onChange(block: (label: this, index: number) => void): this {
        this._onChange = block;
        return this;
    }
}
