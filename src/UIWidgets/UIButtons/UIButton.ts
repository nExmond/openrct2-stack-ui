/// <reference path='../UIWidget.ts' />
/// <reference path='../../UICore/UIImage.ts' />

class UIButton extends UIWidget<ButtonWidget> {

    _border: boolean = true;
    _image: number | undefined;
    _isPressed: boolean = false;
    _title: string | undefined;
    _onClick: ((button: this) => void) | undefined;
    _onChange: ((button: this) => void) | undefined;

    _intervalHelper: IntervalHelper | undefined;
    _uiImage: UIImage | undefined;

    constructor() {
        super();
    }

    //Convenience

    static $<T extends UIButton>(this: StaticThis<T>, title: string): T {
        const button = new this();
        return button.title(title)
            .minSize({ width: 50, height: 15 });
    }

    static $I<T extends UIButton>(this: StaticThis<T>, image: UIImage): T {
        const button = new this();
        return button
            .image(image)
            .size({ width: 24, height: 24 })
            .minSize({ width: 50, height: 15 });
    }

    //Private

    _build() {
        this._widget = {
            ...this._buildBaseValues(),
            type: 'button',
            border: this._border,
            image: this._image,
            isPressed: this._isPressed,
            text: this._applyFont(this._title),
            onClick: () => {
                this._onClick?.call(this, this);
                this._onChange?.call(this, this);
            }
        }
    }

    _update(widget: ButtonWidget) {
        super._update(widget);
        widget.border = this._border;
        widget.image = this._image ?? 0;
        widget.isPressed = this._isPressed;
        if (typeof this._title !== 'undefined') {
            widget.text = this._applyFont(this._title);
        }
    }

    _isImageType(): boolean {
        return typeof this._image !== 'undefined';
    }

    _internalOnChange(block: (button: this) => void): this {
        this._onChange = block;
        return this;
    }

    //Public

    border(val: boolean): this {
        if (!this._isImageType()) {
            this._border = val;
        }
        return this;
    }

    image(val: UIImage): this {

        this._uiImage = val;

        this._intervalHelper?.end();
        if (val._isAnimatable()) {
            var count = 0;
            this._intervalHelper = new IntervalHelper(val._duration * 20, () => {
                var index = count % val._frames.length;
                var frame = val._frames[index];
                this.updateUI((widget) => {
                    widget._image = frame;
                });
                count += 1;
            }).start();
        }

        this._image = val._frames[0];
        this._border = false;
        return this;
    }

    isImage(val: UIImage): boolean {
        return this._uiImage?.isImage(val) ?? false;
    }

    isPressed(val: boolean): this {
        this._isPressed = val;
        return this;
    }

    title(val: string): this {
        if (!this._isImageType()) {
            this._title = val;
        }
        return this;
    }

    onClick(block: (button: this) => void): this {
        this._onClick = block;
        return this;
    }
}
