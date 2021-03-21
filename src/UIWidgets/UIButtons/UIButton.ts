/// <reference path='../UIWidget.ts' />
/// <reference path='../../UICore/UIImage.ts' />

class UIButton extends UIWidget<ButtonWidget> {

    protected _border: boolean = true;
    protected _image: number | undefined;
    protected _isPressed: boolean = false;
    protected _title: string | undefined;
    protected _onClick: ((button: this) => void) | undefined;

    _intervalHelper: IntervalHelper | undefined;
    _uiImage: UIImage | undefined;

    constructor() {
        super();
    }

    //Convenience

    static $<T extends UIButton>(this: StaticThis<T>, title: string): T {
        const button = new this();
        const minSize = title.containerSize();
        return button.title(title)
            .size(minSize)
            .minSize(minSize);
    }

    static $I<T extends UIButton>(this: StaticThis<T>, image: UIImage): T {
        const button = new this();
        const imageSize = image.size();
        const minSize: UISize = {
            width: imageSize.width + 4,
            height: imageSize.height + 4
        }
        return button
            .image(image)
            .size(minSize)
            .minSize(minSize);
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
                this._internalOnChange();
            }
        }
    }

    _update(widget: ButtonWidget) {
        super._update(widget);
        widget.border = this._border;
        if (typeof this._image !== 'undefined') {
            widget.image = this._image;
        }
        widget.isPressed = this._isPressed;
        if (typeof this._title !== 'undefined') {
            widget.text = this._applyFont(this._title);
        }
    }

    _isImageType(): boolean {
        return typeof this._image !== 'undefined';
    }

    protected _internalOnChange() {}

    //Public

    border(val: boolean): this {
        if (!this._isImageType()) {
            this._border = val;
        }
        return this;
    }

    image(val: UIImage): this {

        this._uiImage = val;

        intervalHelper.end(this._name);
        if (val._isAnimatable()) {
            var count = 0;
            intervalHelper.start(this._name, val._duration * 20, () => {
                var index = count % val._frames.length;
                var frame = val._frames[index];
                this.updateUI((widget) => {
                    widget._image = frame;
                });
                count += 1;
            })
        }

        this._image = val._frames[0];
        this._border = false;
        return this;
    }

    isImageEqual(val: UIImage): boolean {
        return this._uiImage?.isEqual(val) ?? false;
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
