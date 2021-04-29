/// <reference path="UIWidget.ts" />

/**
 * Widget to display selection status.
 */
class UICheckbox extends UIWidget<CheckboxWidget> {

    protected _text: string;
    protected _isChecked: boolean = false;
    protected _onChange?: (checkbox: this, isChecked: boolean) => void;

    /**
     * Creates an instance of checkbox.
     * @param text If no text is entered, only the checkbox is used alone.
     */
    constructor(text: string | undefined) {
        super();
        this._text = text ?? "";
    }

    //Convenience

    /**
     * Create a *UICheckbox* instance containing title without using new.
     */
    static $(text: string, isFit: boolean = false): UICheckbox {
        const checkbox = new UICheckbox(text);
        const containerSize = text.containerSize();
        const minSize = {
            width: containerSize.width + 11,
            height: containerSize.height
        }
        const minSizeCheckbox = checkbox
            .size({ height: 11 })
            .minSize(minSize);
        if (isFit) {
            return minSizeCheckbox
                .size({ width: minSize.width });
        } else {
            return minSizeCheckbox;
        }
    }

    /**
     * Create a *UICheckbox* instance no title without using new.
     */
    static $UN(): UICheckbox {
        const checkbox = new UICheckbox(undefined);
        return checkbox
            .size({ width: 11, height: 11 })
    }

    //Private

    _build() {
        this._widget = {
            ...this._buildBaseValues(),
            type: "checkbox",
            text: this._applyFont(this._text),
            isChecked: this._isChecked,
            onChange: (isChecked: boolean) => {
                this._isChecked = isChecked;
                this._onChange?.call(this, this, this._isChecked);
            }
        }
    }

    protected _update(widget: CheckboxWidget) {
        super._update(widget);
        widget.text = this._applyFont(this._text);
        widget.isChecked = this._isChecked;
    }

    protected _isUnnamed(): boolean {
        return typeof this._text === "undefined";
    }

    //Public

    /**
     * Set the selection state.
     */
    isChecked(val: boolean): this {
        this._isChecked = val;
        return this;
    }

    getIsChecked(): boolean {
        return this._isChecked;
    }

    /**
     * Set the text.
     */
    text(val: string): this {
        this._text = val;
        return this;
    }

    getText() {
        return this._text;
    }

    /**
     * Toggles the selection state.
     */
    toggle(): this {
        return this.isChecked(!this._isChecked);
    }

    /**
     * Observe the change in value.
     * @param block
     */
    onChange(block: (checkbox: this, isChecked: boolean) => void): this {
        this._onChange = block;
        return this;
    }
}