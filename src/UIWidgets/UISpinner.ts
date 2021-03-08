/// <reference path='UIWidget.ts' />

class UISpinner extends UIWidget<SpinnerWidget> {

    _text: string | undefined;
    _onChange: ((spinner: this, val: number) => void) | undefined;
    _onClick: ((spinner: this) => void) | undefined;

    _min: number = 0;
    _max: number = 1;
    _value: number = 0.5;
    _step: number = 0.1;
    _fixed: number = 1;

    _formatter: ((val: number) => string) | undefined;

    constructor() {
        super();
    }

    //Convenience

    static $(): UISpinner {
        var spinner = new UISpinner();
        return spinner.height(15)
            .minSize({ width: 50, height: 15 });
    }

    //Private

    _build() {
        var usingFormatter = typeof this._formatter !== 'undefined';
        if (usingFormatter) {
            this._text = this._formatter!(this._value);
        } else {
            this._text = this._value.toFixed(this._fixed);
        }
        this._widget = {
            ...this._buildBaseValues(),
            type: 'spinner',
            text: this._text,
            onDecrement: () => {
                var prev = this._value;
                this._value = Math.max(this._value - this._step, this._min);
                this._signal(prev, this._value);
            },
            onIncrement: () => {
                var prev = this._value;
                this._value = Math.min(this._value + this._step, this._max);
                this._signal(prev, this._value);
            },
            onClick: () => {
                this._onClick?.call(this, this);
            }
        }
    }

    _signal(prev: number, current: number) {
        //https://stackoverflow.com/questions/7223359/are-0-and-0-the-same
        var fixedCurrent = current.toFixed(this._fixed)
        var zero = +0.0;
        var fixedZero = zero.toFixed(this._fixed);
        var negativeFixedZero = '-' + fixedZero;
        var isNegativeZero = fixedCurrent === negativeFixedZero;
        var usingFormatter = typeof this._formatter !== 'undefined';
        var valueChanged = prev.toFixed(this._fixed) != fixedCurrent;
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
        widget.text = this._text;
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

    onClick(block: (spinner: this) => void): this {
        this._onClick = block;
        return this;
    }
}