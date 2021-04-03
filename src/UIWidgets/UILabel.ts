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
    static $(text: string): UILabel {
        const label = new UILabel(text);
        const minSize = text.containerSize();
        console.log(minSize);
        return label
            .height(15)
            .minSize(minSize);
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

/**
 * A label that displays a string with multiple line breaks.
 */
class UIALabel extends UIStack {

    protected _label: UILabel

    /**
     * Creates an instance of label.
     * @param text 
     */
    constructor(text: string, useLineSpacing: boolean = false) {
        const label = UILabel.$(text);
        const height = text.containerSize().height;
        const labelHeight = 15;
        const spacerHeight = Math.ceil((height - (useLineSpacing ?  0: labelHeight)) / 2);
        super(UIAxis.Vertical, [UISpacer.$(spacerHeight), label, UISpacer.$(spacerHeight)]);
        this._label = label;
    }

    //Convenience

    /**
     * Create *UIALabel* instance without using new.
     */
    static $L(text: string, useLineSpacing: boolean = false): UIALabel {
        const alignedLabel = new UIALabel(text, useLineSpacing);
        return alignedLabel;
    }

    //Public

    /**
     * Set the alignment of string.
     * align left or center. The default is left.
     */
    align(val: UITextAlignment): this {
        this._label.align(val);
        return this;
    }

    getAlign(): UITextAlignment {
        return this._label.getAlign();
    }

    /**
     * Set the text.
     */
    text(val: string): this {
        this._label.text(val);
        return this;
    }

    getText(): string {
        return this._label.getText();
    }

    /**
     * Observe the change in value.
     * @param block
     */
    onChange(block: (label: UILabel, index: number) => void): this {
        this._label.onChange(block);
        return this;
    }
}