/// <reference path="UIWidget.ts" />

/**
 * 
 */
class UIImageView extends UIWidget<CustomWidget> {

    protected _image: UIImage = UIImageNone;
    protected _theme: UIWindowTheme = { tertiary: UIColor.Yellow };

    protected _graphicsContext: GraphicsContext | undefined;

    /**
     * Creates an instance of image view.
     * @param image sprite id or uiimage or empty
     */
    constructor(image: number | UIImage | undefined = undefined) {
        super();
        this.image(image);
    }

    //Convenience

    /**
     * Create *UIImageView* instance without using new.
     */
    static $(image: number | UIImage | undefined = undefined): UIImageView {
        return new UIImageView(image);
    }

    //Private

    _build() {
        this._widget = {
            ...this._buildBaseValues(),
            type: "custom",
            onDraw: (g: GraphicsContext) => {
                this._graphicsContext = g;
                // if (!this._image._isAnimatable()) {
                    this._onDraw(this._image.singleFrame());
                // }
            }
        }
    }

    /**
     * ! Animatable images cannot be applied because clear and fill of custom widgets behave abnormally.
     */
    protected _onDraw(frame: number) {
        const g = this._graphicsContext;
        if (typeof g !== "undefined") {
            // g.clear();

            const theme = this._interactor.getWindowTheme();

            g.colour = this._theme.primary ?? theme.primary;
            g.paletteId = this._theme.primary ?? theme.primary;
            g.secondaryColour = this._theme.secondary ?? theme.secondary;
            g.ternaryColour = this._theme.tertiary ?? theme.tertiary;

            const offset = g.getImage(frame)?.offset ?? UIPointZero;
            g.image(frame, -offset.x, -offset.y);
        }
    }

    //Public

    /**
     * Set image
     */
    image(image: number | UIImage | undefined): this {
        if (typeof image === "undefined") {
            this._image = UIImage.$(-1);
        } else if (typeof image === "number") {
            this._image = UIImage.$(image);
        } else {
            this._image = image;
        }
        const size = this._image.size();
        this.size(size);

        // intervalHelper.end(this._name);
        // if (this._image._isAnimatable()) {
        //     var count = 0;
        //     intervalHelper.start(this._name, this._image._duration * 20, () => {
        //         var index = count % this._image._frames.length;
        //         var frame = this._image._frames[index];
        //         console.log(count, frame);
        //         this._onDraw(frame);
        //         count += 1;
        //     });
        // }

        return this;
    }

    getImage(): UIImage {
        return this._image;
    }

    /**
     * Sets the color theme for image.
     */
    theme(val: UIWindowTheme): this {
        this._theme = val;
        return this;
    }

    /**
     * Set the primary theme color.
     */
    themePrimaryColor(val: UIColor | undefined): this {
        this._theme = {
            primary: val,
            secondary: this._theme.secondary,
            tertiary: this._theme.tertiary
        }
        return this;
    }

    /**
     * Set the secondary theme color.
     */
    themeSecondaryColor(val: UIColor | undefined): this {
        this._theme = {
            primary: this._theme.primary,
            secondary: val,
            tertiary: this._theme.tertiary
        }
        return this;
    }

    /**
     * Set the terriary theme color.
     */
    themeTertiaryColor(val: UIColor | undefined): this {
        this._theme = {
            primary: this._theme.primary,
            secondary: this._theme.secondary,
            tertiary: val
        }
        return this;
    }

    getTheme(): UIWindowTheme {
        return this._theme;
    }
}