/// <reference path="UIWidget.ts" />
/// <reference path="../UICore/UITextAlignment.ts" />

/**
 * Widget that displays static text.
 */
class UILabel extends UIWidget<LabelWidget> {

    protected _text: string;
    protected _align: UITextAlignment = UITextAlignment.Left;
    protected _onChange: ((label: this, index: number) => void) | undefined;

    /**
     * Creates an instance of label.
     * @param text 
     */
    constructor(text: string) {
        super();
        this._text = text;
    }

    //Convenience

    /**
     * Create *UILabel* instance without using new.
     */
    static $(text: string, isFit: boolean = false): UILabel {
        const label = new UILabel(text);
        const minSize = text.containerSize();
        if (isFit) {
            return label
                .height(minSize.height)
                .minSize(minSize);
        } else {
            return label
                .minSize(minSize);
        }
    }

    //Private

    _build() {
        this._widget = {
            ...this._buildBaseValues(),
            type: "label",
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

    /**
     * Set the alignment of string.
     * align left or center. The default is left.
     */
    align(val: UITextAlignment): this {
        this._align = val;
        return this;
    }

    getAlign(): UITextAlignment {
        return this._align;
    }

    /**
     * Set the text.
     */
    text(val: string): this {
        this._text = val;
        const minSize = val.containerSize();
        this.minSize(minSize);
        return this;
    }

    getText(): string {
        return this._text;
    }

    /**
     * Observe the change in value.
     * @param block
     */
    onChange(block: (label: this, index: number) => void): this {
        this._onChange = block;
        return this;
    }
}
