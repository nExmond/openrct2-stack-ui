/// <reference path="../UIWidgets/UIWidget.ts" />

/**
 * Divide the sections by purpose within the window.
 */
class UITab {

    protected _name: string;

    protected _minSize: UISize = UISizeZero;
    protected _maxSize: UISize = { width: ui.width, height: ui.height };

    protected _spacing?: number;
    protected _padding?: UIEdgeInsets;
    protected _isExpandable: boolean = false;

    protected _title?: string;
    protected _theme?: UIWindowTheme;

    protected _image: UIImage;
    protected _contentView: UIStack;

    protected _didLoad?: (tab: this) => void;

    /**
     * Creates an instance of uitab.
     * Initialize with a single stack.
     * @param contentView stack
     * @param image Image to display on the tab
     */
    constructor(contentView: UIStack, image: UIImage | undefined = undefined) {
        this._name = this.constructor.name + '-' + uuid();
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
            image: this._image._data(true),
            widgets: this._contentView._getWidgets()
        }
    }

    _build() {
        var estimatedSize = this._contentView._estimatedSize();
        this._contentView._layout(UIAxis.Vertical, UIPointZero, estimatedSize);
        this._contentView._build();
    }

    _getContentView(): UIStack {
        return this._contentView;
    }

    _setMinSize(val: UISize) {
        this._minSize = val;
    }

    _getDidLoad(): ((tab: this) => void) | undefined {
        return this._didLoad;
    }

    //Public

    /**
     * Set the name.
     */
     name(val: string): this {
        this._name = val;
        return this;
    }

    getName(): string {
        return this._name;
    }

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
    padding(val: UIOptionalEdgeInsets): this {
        this._padding = {
            top: val.top ?? this._padding?.top ?? 0,
            left: val.left ?? this._padding?.left ?? 0,
            bottom: val.bottom ?? this._padding?.bottom ?? 0,
            right: val.right ?? this._padding?.right ?? 0
        };
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
    maxSize(val: UIOptionalSize): this {
        this._maxSize = {
            width: val.width ?? this._maxSize.width,
            height: val.height ?? this._maxSize.height
        };
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
     * Set the title to be displayed in the window when selecting a tab.
     * If not specified, the title set in the window is used by default.
     */
    title(val: string): this {
        this._title = val;
        return this;
    }

    getTitle(): string | undefined {
        return this._title;
    }

    /**
     * Sets the color theme for window and child widgets.
     */
    theme(val: UIWindowTheme): this {
        this._theme = val;
        return this;
    }

    getTheme(): UIWindowTheme | undefined {
        return this._theme;
    }
    
    /**
     * Bind with tab proxy.
     */
    bind(proxy: UITabProxy): this {
        proxy._bind(this);
        return this;
    }
    
    /**
     * This function is called immediately after the window is displayed.
     */
     didLoad(block: (tab: this) => void): this {
        this._didLoad = block;
        return this;
    }

    /**
     * Find the widget contained in tab by its unique name.
     */
    getUIWidget<T extends UIWidget<any>>(name: string): T | undefined {
        return this._contentView._getUIWidgets().first(val => val.getName() === name);
    }
}
