/// <reference path="../UIWidget.ts" />
/// <reference path="../../UICore/UIImage/UIImage.ts" />

/**
 * Widgets that execute actions with a click.
 */
class UIButton extends UIWidget<ButtonWidget> {

    protected _border: boolean = true;
    protected _image?: number;
    protected _isPressed: boolean = false;
    protected _title?: string;
    protected _onClick?: (button: this) => void;

    protected _intervalHelper?: IntervalHelper;
    protected _uiImage?: UIImage;

    constructor() {
        super();
    }

    //Convenience

    /**
     * Create *UIButton* instance without using new.
     * Button to display text.
     */
    static $<T extends UIButton>(this: StaticThis<T>, title: string, isFit: boolean = false): T {
        const button = new this();
        const buttonWithTitle = button.title(title);
        const minSize = title.containerSize();
        if (isFit) {
            return buttonWithTitle
                .size(minSize)
                .minSize(minSize);
        } else {
            return buttonWithTitle
                .minSize(minSize);
        }
    }

    /**
     * Create *UIButton* instance without using new.
     * Button to display image.
     */
    static $I<T extends UIButton>(this: StaticThis<T>, image: UIImage): T {
        const button = new this();
        const imageSize = image.size();
        const minSize: UISize = {
            width: imageSize.width + 3,
            height: imageSize.height + 2
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
            type: "button",
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

    protected _update(widget: ButtonWidget) {
        super._update(widget);
        widget.border = this._border;
        if (typeof this._image !== "undefined") {
            widget.image = this._image;
        }
        widget.isPressed = this._isPressed;
        if (typeof this._title !== "undefined") {
            widget.text = this._applyFont(this._title);
        }
    }

    protected _isImageType(): boolean {
        return typeof this._image !== "undefined";
    }

    protected _internalOnChange() { }

    //Public

    /**
     * Sets the border.
     * ! Ignored if it is an image type button.
     */
    border(val: boolean): this {
        if (!this._isImageType()) {
            this._border = val;
        }
        return this;
    }

    getBorder(): boolean {
        return this._border;
    }

    /**
     * Sets the image.
     * ! If you set the image after initialization, it is fixed to the image type.
     */
    image(val: UIImage): this {

        this._uiImage = val;

        intervalHelper.end(this._name);
        if (val.isAnimatable()) {
            var count = 0;
            intervalHelper.start(this._name, val.getDuration() * 20, () => {
                var index = count % val._getFrames().length;
                var frame = val._getFrames()[index];
                this.updateUI(widget => {
                    widget._image = frame;
                });
                count += 1;
            })
        }

        this._image = val._getFrames()[0];
        this._border = false;
        return this;
    }

    getImage(): UIImage {
        return this._uiImage ?? UIImageNone;
    }

    /**
     * Determines whether image equal is
     */
    isImageEqual(val: UIImage): boolean {
        return this._uiImage?.isEqual(val) ?? false;
    }

    /**
     * Set button pressed state.
     */
    isPressed(val: boolean): this {
        this._isPressed = val;
        return this;
    }

    getIsPressed(): boolean {
        return this._isPressed;
    }

    /**
     * Set button title.
     * ! If an image is set, it is ignored.
     */
    title(val: string): this {
        if (!this._isImageType()) {
            this._title = val;
        }
        return this;
    }

    getTitle(): string | undefined {
        return this._title;
    }

    /**
     * Observe the click.
     * @param block
     */
    onClick(block: (button: this) => void): this {
        this._onClick = block;
        return this;
    }
}
