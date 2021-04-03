/// <reference path="UIWidget.ts" />

/**
 * Divide the sections by purpose within the window.
 */
class UITab {

    _minSize: UISize = UISizeZero;
    _maxSize: UISize = { width: ui.width, height: ui.height };

    _spacing: number | undefined;
    _padding: UIEdgeInsets | undefined;
    _isExpandable: boolean = false;

    protected _image: UIImage;
    _contentView: UIStack;

    /**
     * Creates an instance of uitab.
     * Initialize with a single stack.
     * @param contentView stack
     * @param image Image to display on the tab
     */
    constructor(contentView: UIStack, image: UIImage | undefined = undefined) {
        this._image = image ?? UIImageNone;
        this._contentView = contentView;
    }

    //Convenience

    /**
     * Create *UITab* instance without using new.
     */
    static $(...widgets: UIWidget<any>[]): UITab {
        const stack = new UIStack(UIAxis.Vertical, widgets);
        const tab = new UITab(stack);
        return tab;
    }

    //Private

    _data(): WindowTabDesc {
        return {
            image: this._image._data(),
            widgets: this._contentView._getWidgets()
        }
    }

    _build() {
        var estimatedSize = this._contentView._estimatedSize();
        this._contentView._layout(UIAxis.Vertical, UIPointZero, estimatedSize);
        this._contentView._build();
    }

    //Public

    /**
     * Widget spacing on top stack.
     */
    spacing(val: number): this {
        this._spacing = val;
        return this;
    }

    getSpacing(): number | undefined {
        return this._spacing;
    }

    /**
     * Top stack padding.
     */
    padding(val: UIEdgeInsets): this {
        this._padding = val;
        return this;
    }

    getPadding(): UIEdgeInsets | undefined {
        return this._padding;
    }

    /**
     * Whether the window can be enlarged in tab.
     * ! May not apply under certain conditions.
     */
    isExpandable(val: boolean): this {
        this._isExpandable = val;
        return this;
    }

    getIsExpandable(): boolean {
        return this._isExpandable;
    }

    getMinSize(): UISize {
        return this._minSize;
    }

    /**
     * Set the maximum size of the window in tab.
     */
    maxSize(val: UISize): this {
        this._maxSize = val;
        return this;
    }

    getMaxSize(): UISize {
        return this._maxSize;
    }

    /**
     * Set the image.
     */
    image(val: UIImage): this {
        this._image = val;
        return this;
    }

    getImage(): UIImage {
        return this._image;
    }
    
    /**
     * Bind with tab proxy.
     */
    bind(proxy: UITabProxy): this {
        proxy._bind(this);
        return this;
    }
}
