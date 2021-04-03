/// <reference path="UIWidget.ts" />

/**
 * Text input widget
 * It can only be entered on one line.
 */
class UITextBox extends UIWidget<TextBoxWidget> {

    protected _text: string;
    protected _maxLength: number = 256;
    protected _onChange: ((textBox: this, text: string) => void) | undefined;

    constructor(text: string | undefined = undefined) {
        super();
        this._text = text ?? "";
    }

    //Convenience

    /**
     * Create *UITextBox* instance without using new.
     * @param text initial string
     */
    static $(text: string | undefined = undefined): UITextBox {
        const textBox = new UITextBox(text);
        return textBox.height(15)
            .minSize({ width: 50, height: 15 });
    }

    //Private

    _build() {
        this._widget = {
            ...this._buildBaseValues(),
            type: "textbox",
            text: this._text,
            maxLength: this._maxLength,
            onChange: (text: string) => {
                this._text = text;
                this._onChange?.call(this, this, text);
            }
        }
    }

    _update(widget: TextBoxWidget) {
        super._update(widget);
        widget.text = this._text;
        widget.maxLength = this._maxLength;
    }

    //Public

    /**
     * Set the string.
     */
    text(val: string): this {
        this._text = val;
        return this;
    }

    getText(): string {
        return this._text;
    }

    /**
     * Maximum number of digits. The default is 256 characters.
     */
    maxLength(val: number): this {
        this._maxLength = val;
        return this;
    }

    getMaxLength(): number {
        return this._maxLength;
    }

    /**
     * Observe the change in value.
     * @param block
     */
    onChange(block: (textBox: this, text: string) => void): this {
        this._onChange = block;
        return this;
    }
}
