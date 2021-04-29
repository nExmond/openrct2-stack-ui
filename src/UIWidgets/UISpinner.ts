/// <reference path="UIWidget.ts" />

/**
 * Widget to select a number within a range.
 */
class UISpinner extends UIWidget<SpinnerWidget> {

    protected _text?: string;
    protected _onChange?: (spinner: this, val: number) => void;

    protected _min: number = 0;
    protected _max: number = 1;
    protected _value: number = 0.5;
    protected _step: number = 0.1;
    protected _fixed?: number;

    protected _formatter?: (val: number) => string;

    protected _dialogueTitle = "Title";
    protected _dialogueMessage = "Message{NEWLINE}(Set it using function 'dialogueInfo')";
    protected _dialogueMaxLength = 256;

    constructor() {
        super();
    }

    //Convenience

    /**
     * Create *UISpinner* instance without using new.
     */
    static $(): UISpinner {
        const spinner = new UISpinner();
        return spinner
            .size({ height: 15 })
            .minSize({ width: 50, height: 15 });
    }

    //Private

    _build() {
        if (this._usingFormatter()) {
            this._text = this._formatter!(this._value);
        } else {
            this._text = this._value.toFixed(this.__fixed());
        }
        this._widget = {
            ...this._buildBaseValues(),
            type: "spinner",
            text: this._applyFont(this._text),
            onDecrement: () => {
                const prev = this._value;
                this._value = Math.max(this._value - this._step, this._min);
                this._signal(prev, this._value);
            },
            onIncrement: () => {
                const prev = this._value;
                this._value = Math.min(this._value + this._step, this._max);
                this._signal(prev, this._value);
            },
            onClick: () => {
                const currentLength = (this._text?.length ?? 0) + 1;
                const maxLength = Math.max(this._dialogueMaxLength, currentLength);
                const desc: TextInputDesc = {
                    title: this._dialogueTitle,
                    description: this._dialogueMessage,
                    initialValue: this._value.toString(),
                    maxLength: maxLength,
                    callback: (value: string) => {
                        const prev = this._value;
                        this._value = Math.max(Math.min(parseFloat(value), this._max), this._min);
                        this._signal(prev, this._value);
                    }
                }
                ui.showTextInput(desc);
            }
        }
    }

    protected _signal(prev: number, current: number) {
        //https://stackoverflow.com/questions/7223359/are-0-and-0-the-same
        const fixedCurrent = current.toFixed(this.__fixed())
        const zero = +0.0;
        const fixedZero = zero.toFixed(this.__fixed());
        const negativeFixedZero = '-' + fixedZero;
        const isNegativeZero = fixedCurrent === negativeFixedZero;
        const usingFormatter = typeof this._formatter !== "undefined";
        const valueChanged = prev.toFixed(this.__fixed()) != fixedCurrent;
        if (valueChanged) {
            if (usingFormatter) {
                if (isNegativeZero) {
                    this._text = this._formatter!(zero);
                } else {
                    this._text = this._formatter!(current);
                }
            } else {
                if (isNegativeZero) {
                    this._text = fixedZero;
                } else {
                    this._text = fixedCurrent;
                }
            }
            this.updateUI();
            this._onChange?.call(this, this, current);
        }
    }

    protected _update(widget: SpinnerWidget) {
        super._update(widget);
        widget.text = this._applyFont(this._text);
    }

    protected __fixed(): number {
        return this._fixed ?? 1;
    }

    protected _usingFormatter(): boolean {
        return typeof this._formatter !== "undefined";
    }

    protected _updateMinWidth() {
        var text: string;
        var correction = this._min < 0 ? 4 : 0;
        if (this._usingFormatter()) {
            text = this._formatter!(this._max);
        } else {
            text = this._max.toFixed(this.__fixed());
        }
        const textMinWidth = text.containerSize().width + correction;
        this.minSize({ width: textMinWidth + 11 * 2 });
    }

    //Public

    /**
     * Set the range of numbers.
     */
    range(val: UIOptionalRange): this {
        const min = val.min ?? Number.MIN_SAFE_INTEGER;
        const max = val.min ?? Number.MAX_SAFE_INTEGER;
        if (min > max) {
            console.log("'min' cannot be greater than 'max'.");
        } else {
            this._min = min;
            this._max = max;
        }
        this._updateMinWidth();
        return this;
    }

    /**
     * Setting the step of increasing or decreasing the number.
     */
    step(val: number): this {
        this._step = val;

        if (typeof this._fixed === "undefined") {
            for (var i = 0; i < Infinity; i++) {
                let mul = Math.pow(10, i);
                if ((val * mul) % 1 == 0) {
                    this._fixed = i;
                    break;
                }
            }
        }
        this._updateMinWidth();

        return this;
    }

    getStep(): number {
        return this._step;
    }

    /**
     * Set the number of decimal places
     * ! Ignored when using a formatter.
     */
    fixed(val: number): this {
        this._fixed = val;
        this._updateMinWidth();
        return this;
    }

    getFixed(): number {
        return this._fixed ?? 1;
    }

    /**
     * Set a new value within the set value range. 
     */
    value(val: number): this {
        this._value = Math.max(this._min, Math.min(this._max, val))
        this._updateMinWidth();
        return this;
    }

    getValue(): number {
        return this._value;
    }

    /**
     * Set formattor
     * @param black formatting block
     */
    formatter(black: (val: number) => string): this {
        this._formatter = black;
        this._updateMinWidth();
        return this;
    }

    getFormatter(): ((val: number) => string) | undefined {
        return this._formatter;
    }

    /**
     * Observe the change in value.
     * @param block
     */
    onChange(block: (spinner: this, val: number) => void): this {
        this._onChange = block;
        return this;
    }

    /**
     * Set the dialog information displayed when selecting a number area.
     * @param title dialogue title
     * @param message dialogue message
     * @param maxLength Maximum number of digits. The default is 256 characters.
     */
    dialogueInfo(title: string, message: string, maxLength: number = 256): this {
        this._dialogueTitle = title;
        this._dialogueMessage = message;
        this._dialogueMaxLength = maxLength;
        return this;
    }
}