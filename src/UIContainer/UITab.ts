/// <reference path="../UIWidgets/UIWidget.ts" />

/**
 * Divide the sections by purpose within the window.
 */
class UITab {

    protected _name: string;

    protected _originalMinSize?: UIOptionalSize;
    protected _minSize?: UIOptionalSize;
    protected _originalMaxSize?: UIOptionalSize;
    protected _maxSize?: UIOptionalSize;

    protected _spacing?: number;
    protected _padding?: UIEdgeInsets;
    protected _isExpandable: boolean = false;

    protected _title?: string;
    protected _theme?: UIWindowTheme;

    protected _image: UIImage;
    protected _contentView: UIStack;

    protected _interactor!: UIInteractor;

    protected _didLoad?: (tab: this) => void;
    protected _didAppear?: (tab: this) => void;

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

    _setMinSize(val: UISize): UISize {
        this._minSize = val;
        return val
    }

    _getDidLoad(): ((tab: this) => void) | undefined {
        return this._didLoad;
    }

    _getDidAppear(): ((tab: this) => void) | undefined {
        return this._didAppear;
    }

    _setInteractor(val: UIInteractor) {
        this._interactor = val;
    }

    //Public

    /**
     * Modify and update the properties of the window.
     * @param block update block
     */
     updateUI(block: ((val: this) => void) | undefined = undefined) {
        const prevImage = this._image;
        block?.call(this, this);
        const changedImage = this._image;
        const imageChanged = !changedImage.isEqual(prevImage);
        this._interactor.refreshWindowTab(imageChanged);
    }

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
    padding(val: UIOptionalEdgeInsets | number): this {
        if (typeof val === "number") {
            this._padding = {
                top: val,
                left: val,
                bottom: val,
                right: val
            };
        } else {
            this._padding = {
                top: val.top ?? this._padding?.top ?? 0,
                left: val.left ?? this._padding?.left ?? 0,
                bottom: val.bottom ?? this._padding?.bottom ?? 0,
                right: val.right ?? this._padding?.right ?? 0
            };
        }
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

    /**
     * Set the minimum size of the window in tab.
     * If not set, the window's minimum size is followed.
     */
    minSize(val: UIOptionalSize): this {
        this._minSize = {
            width: val.width ?? this._minSize?.width,
            height: val.height ?? this._minSize?.height
        };
        this._originalMinSize = { ...this._minSize };
        return this;
    }

    getMinSize(): UIOptionalSize | undefined {
        return this._originalMinSize;
    }

    _getMinSize(): UIOptionalSize | undefined {
        return this._minSize;
    }

    /**
     * Set the maximum size of the window in tab.
     * If not set, the window's maximum size is followed.
     */
    maxSize(val: UIOptionalSize): this {
        this._maxSize = {
            width: val.width ?? this._maxSize?.width,
            height: val.height ?? this._maxSize?.height
        };
        this._originalMaxSize = { ...this._maxSize };
        return this;
    }

    getMaxSize(): UIOptionalSize | undefined {
        return this._originalMaxSize;
    }

    _getMaxSize(): UIOptionalSize | undefined {
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
     * This function is called after the tab has been initialized.
     */
    didLoad(block: (tab: this) => void): this {
        this._didLoad = block;
        return this;
    }
    
    /**
     * This function is called immediately after the tab is displayed.
     */
     didAppear(block: (tab: this) => void): this {
        this._didAppear = block;
        return this;
    }

    /**
     * Find the widget contained in tab by its unique name.
     */
    getUIWidget<T extends UIWidget<any>>(name: string): T | undefined {
        return this._contentView._getUIWidgets().first(val => val.getName() === name);
    }
}
