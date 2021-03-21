/// <reference path='UIWidget.ts' />
/// <reference path='../UICore/UITextAlignment.ts' />

class UILabel extends UIWidget<LabelWidget> {

    protected _text: string;
    protected _align: UITextAlignment = UITextAlignment.Left;
    protected _onChange: ((label: this, index: number) => void) | undefined;

    constructor(text: string) {
        super();
        this._text = text;
    }

    //Convenience

    static $(text: string): UILabel {
        const label = new UILabel(text);
        const minSize = text.containerSize();
        return label.height(15)
            .minSize(minSize);
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
