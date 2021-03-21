/// <reference path='UIWidget.ts' />

class UISpinner extends UIWidget<SpinnerWidget> {

    protected _text: string | undefined;
    protected _onChange: ((spinner: this, val: number) => void) | undefined;

    protected _min: number = 0;
    protected _max: number = 1;
    protected _value: number = 0.5;
    protected _step: number = 0.1;
    protected _fixed: number = 1;

    protected _formatter: ((val: number) => string) | undefined;

    protected _dialogueTitle = "Title";
    protected _dialogueMessage = "Message{NEWLINE}(Set it using function 'dialogueInfo')";
    protected _dialogueMaxLength = 0;

    constructor() {
        super();
    }

    //Convenience

    static $(): UISpinner {
        const spinner = new UISpinner();
        return spinner.height(15)
            .minSize({ width: 50, height: 15 });
    }

    //Private

    _build() {
        const usingFormatter = typeof this._formatter !== 'undefined';
        if (usingFormatter) {
            this._text = this._formatter!(this._value);
        } else {
            this._text = this._value.toFixed(this._fixed);
        }
        this._widget = {
            ...this._buildBaseValues(),
            type: 'spinner',
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
                    initialValue: this._text,
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
        const fixedCurrent = current.toFixed(this._fixed)
        const zero = +0.0;
        const fixedZero = zero.toFixed(this._fixed);
        const negativeFixedZero = '-' + fixedZero;
        const isNegativeZero = fixedCurrent === negativeFixedZero;
        const usingFormatter = typeof this._formatter !== 'undefined';
        const valueChanged = prev.toFixed(this._fixed) != fixedCurrent;
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

    _update(widget: SpinnerWidget) {
        super._update(widget);
        widget.text = this._applyFont(this._text);
    }

    //Public

    range(min: number, max: number): this {
        if (min > max) {
            console.log("min' cannot be greater than 'max'.");
        } else {
            this._min = min;
            this._max = max;
        }
        return this;
    }

    step(step: number, fixed: number | undefined = undefined): this {
        this._step = step;

        if (typeof fixed === 'undefined') {
            for (var i = 0; i < Infinity; i++) {
                let mul = Math.pow(10, i);
                if ((step * mul) % 1 == 0) {
                    this._fixed = i;
                    break;
                }
            }
        } else {
            this._fixed = fixed;
        }

        return this;
    }

    value(val: number): this {
        this._value = Math.max(this._min, Math.min(this._max, val))
        return this;
    }

    formatter(black: (val: number) => string): this {
        this._formatter = black;
        return this;
    }

    onChange(block: (spinner: this, val: number) => void): this {
        this._onChange = block;
        return this;
    }

    dialogueInfo(title: string, message: string, maxLength: number = 0): this {
        this._dialogueTitle = title;
        this._dialogueMessage = message;
        this._dialogueMaxLength = maxLength;
        return this;
    }
}