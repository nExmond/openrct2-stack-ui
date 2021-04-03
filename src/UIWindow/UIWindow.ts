/// <reference path='../Helpers/UIConstructor/UIConstructor.ts' />
/// <reference path='../UICore/UIEdgeInsets.ts' />
/// <reference path='../UIWidgets/UITab.ts' />
/// <reference path='../UIWidgets/UIStack.ts' />
/// <reference path='UIWindowTheme.ts' />

/**
 * Top-level object managing tabs and widgets.
 */
class UIWindow {

    protected _uiConstructor = new UIConstructor();
    protected _interactor = new UIInteractor();

    protected _window: Window | undefined;

    protected _singleContentView: UIStack | undefined;
    protected _tabs: UITab[] | undefined;
    protected _selectedTabIndex: number = 0;

    protected _origin!: UIPoint;
    protected _size!: UISize;
    protected _initialSize!: UISize;

    protected _title: string;
    protected _theme: UIWindowTheme = UIWindowThemeDefault;

    protected _spacing = 0;
    protected _padding: UIEdgeInsets = UIEdgeInsetsZero;

    protected _initialExpandableState: boolean = false;
    protected _isExpandable: boolean = false;
    protected _minSize: UISize = UISizeZero;
    protected _maxSize: UISize = { width: ui.width, height: ui.height };

    protected _onClose: ((window: this) => void) | undefined;
    protected _onTabChange: ((window: this, selectedIndex: number) => void) | undefined;

    /**
     * Creates an instance of *UIWindow*.
     * @param title 
     * @param contents List of *UITab* or *UIWindget*
     */
    constructor(title: string, contents: UIWidget<any>[] | UITab[]) {
        this._title = title;

        if (contents.length > 0) {
            if (contents[0] instanceof UIWidget) {
                const widgets: any = contents;
                this._singleContentView = new UIStack(UIAxis.Vertical, widgets);
            } else {
                const tabs: any = contents;
                this._tabs = tabs;
            }
        } else {
            throw new Error('Need to add at least one UITab or UIWidget.');
        }
    }

    //Convenience

    /**
     * Create an instance window from a list of widget without using new.
     */
    static $(title: string, ...widgets: UIWidget<any>[]): UIWindow {
        return new UIWindow(title, widgets);
    }

    /**
     * Create an instance window from a list of tab without using new.
     */
    static $T(title: string, ...tabs: UITab[]): UIWindow {
        return new UIWindow(title, tabs);
    }

    //Private

    _usingTab(): boolean {
        return typeof this._tabs !== 'undefined';
    }

    _convertColors(): UIColor[] {
        return [
            this._theme.primary ?? UIColor.Gray,
            this._theme.secondary ?? UIColor.Gray,
            this._theme.tertiary ?? UIColor.Gray
        ];
    }

    _isOpened(): boolean {
        return typeof this._window !== 'undefined';
    }

    _sync() {
        if (this._isOpened()) {
            const window = this._window!;
            this._origin = {
                x: window.x,
                y: window.y
            }
            this._size = {
                width: window.width,
                height: window.height
            }
            this._theme = {
                primary: window.colours[0],
                secondary: window.colours[1],
                tertiary: window.colours[2]
            }
        }
    }

    _update() {

        const window = this._window;
        if (typeof window === 'undefined') {
            return;
        }

        window.title = this._title;

        //Property does not have getter or setter.
        // window.tabIndex = this._selectedTabIndex;

        window.minWidth = this._isExpandable ? this._minSize.width : this._size.width;
        window.minHeight = this._isExpandable ? this._minSize.height : this._size.height;
        window.maxWidth = this._isExpandable ? this._maxSize.width : this._size.width;
        window.maxHeight = this._isExpandable ? this._maxSize.height : this._size.height;

        window.colours = this._convertColors();

        //Because it is not rendered immediately, it moves and revert the coordinates.
        window.x = ui.width + 1;
        window.y = ui.height + 1;

        window.x = this._origin.x;
        window.y = this._origin.y;
    }

    _onUpdate() {

        const window = this._window;
        if (typeof window === 'undefined') {
            return;
        }

        const isSizeChange = window.width != this._size.width || window.height != this._size.height;
        if (isSizeChange) {
            this._size = {
                width: window.width,
                height: window.height
            }
            this._refresh(this._size);
        }
    }

    _internalOnTabChange() {
        const currentTab = this._tabs![this._selectedTabIndex];
        const tabMinSize = currentTab._minSize;
        const tabMaxSize = currentTab._maxSize;
        const size: UISize = {
            width: Math.max(Math.min(this._size.width, tabMaxSize.width), tabMinSize.width),
            height: Math.max(Math.min(this._size.height, tabMaxSize.height), tabMinSize.height)
        }
        currentTab._contentView._loadWidget();
        this._refresh(size);
        this.updateUI((window) => {
            window._minSize = tabMinSize;
            window._maxSize = tabMaxSize;
            window._isExpandable = window._initialExpandableState || currentTab._isExpandable;
        })
    }

    _refresh(size: UISize) {
        if (this._usingTab()) {
            const tab = this._tabs![this._selectedTabIndex];
            this._uiConstructor.refreshTab(tab, size);
        } else {
            this._uiConstructor.refresh(this._singleContentView!, size);
        }
    }

    _reflectResizingFromChild() {

        var minSize = this._minSize;
        var maxSize = this._maxSize;
        var contentView = this._singleContentView;

        if (typeof this._tabs !== 'undefined') {
            const currentTab = this._tabs![this._selectedTabIndex];
            contentView = currentTab._contentView;

            contentView._resetSize();
            
            this._uiConstructor.constructTabs(this._tabs, this._selectedTabIndex, this._interactor, this._spacing, this._padding);

            minSize = currentTab._minSize;
            maxSize = currentTab._maxSize;

        } else if (typeof this._singleContentView !== 'undefined') {
            contentView = this._singleContentView;

            contentView._resetSize();

            const construct = this._uiConstructor.construct(this._singleContentView, this._interactor);

            minSize = construct.size;
            maxSize = this._maxSize;
        }
        
        const size: UISize = {
            width: Math.max(Math.min(this._size.width, maxSize.width), minSize.width),
            height: Math.max(Math.min(this._size.height, maxSize.height), minSize.height)
        }
        contentView?._loadWidget();
        this._refresh(size);
        this.updateUI((window) => {
            window._minSize = minSize;
            window._maxSize = maxSize;
        })
    }

    //Public

    /**
     * Shows a window on the screen.
     * Initial data is set at this point.
     */
    show(): this {

        if (this._isOpened()) {
            this.bringToFront();
            return this;
        }

        this._initialExpandableState = this._isExpandable;

        const singlecontentView = this._singleContentView?.spacing(this._spacing).padding(this._padding);
        var singleContentViewWidget: Widget[] | undefined;
        if (typeof singlecontentView !== 'undefined') {
            const constructed = this._uiConstructor.construct(singlecontentView, this._interactor);
            singleContentViewWidget = constructed.widgets;
            this._minSize = constructed.size;
        };

        var tabDescriptions: WindowTabDesc[] | undefined;
        if (typeof this._tabs !== 'undefined') {
            const constructed = this._uiConstructor.constructTabs(this._tabs, this._selectedTabIndex, this._interactor, this._spacing, this._padding);
            tabDescriptions = constructed.tabs;
            this._minSize = constructed.size;
            this._maxSize = this._tabs[this._selectedTabIndex]._maxSize;
            this._isExpandable ||= this._tabs?.[this._selectedTabIndex]._isExpandable ?? false;
        }

        const windowDesc: WindowDesc = {
            classification: this._title,
            width: this._minSize.width,
            height: this._minSize.height,
            title: this._title,
            minWidth: this._isExpandable ? this._minSize.width : undefined,
            maxWidth: this._isExpandable ? this._maxSize.width : undefined,
            minHeight: this._isExpandable ? this._minSize.height : undefined,
            maxHeight: this._isExpandable ? this._maxSize.height : undefined,
            widgets: singleContentViewWidget,
            colours: this._convertColors(),
            tabs: tabDescriptions,
            tabIndex: this._selectedTabIndex,
            onClose: () => {
                this._onClose?.call(this, this);
            },
            onUpdate: () => {
                this._onUpdate();
            },
            onTabChange: () => {
                this._selectedTabIndex = this._window?.tabIndex ?? 0;
                this._internalOnTabChange();
                this._onTabChange?.call(this, this, this._selectedTabIndex);
            }
        }

        this._window = ui.openWindow(windowDesc);
        this._initialSize = {
            width: this._window.width,
            height: this._window.height
        };
        this._sync();

        this._interactor._findWidget((name) => {
            return this.findWidget(name);
        });
        this._interactor._refresh(() => {
            this._reflectResizingFromChild();
        });

        if (typeof singlecontentView !== 'undefined') {
            this._uiConstructor.didLoad(singlecontentView);
        }
        if (typeof this._tabs !== 'undefined') {
            this._uiConstructor.didLoadTabs(this._tabs);
            this._internalOnTabChange();
        }

        return this;
    }

    /**
     * Modify and update the properties of the window.
     * @param block update block
     */
    updateUI(block: (val: this) => void) {
        this._sync();
        block(this);
        this._update();
    }

    /**
     * Closes window
     */
    close() {
        this._window?.close();
        this._window = undefined;
    }

    /**
     * Bring to front
     */
    bringToFront() {
        this._window?.bringToFront();
    }

    /**
     * Finds widget
     * @param name 
     * @returns widget 
     */
    findWidget<T extends Widget>(name: string): T | undefined {
        return this._window?.findWidget(name);
    }

    //---

    /**
     * Widget spacing on top stack.
     */
    spacing(val: number): this {
        this._spacing = val;
        return this;
    }

    getSpacing(): number {
        return this._spacing;
    }

    /**
     * Top stack padding.
     */
    padding(val: UIEdgeInsets): this {
        this._padding = val;
        return this;
    }

    getPadding(): UIEdgeInsets {
        return this._padding;
    }

    /**
     * Window coordinates on the screen.
     */
    origin(val: UIPoint): this {
        this._origin = val;
        return this;
    }

    getOrigin(): UIPoint {
        return this._origin;
    }

    getSize(): UISize {
        return this._size;
    }

    getMinSize(): UISize {
        return this._minSize;
    }

    getMaxSize(): UISize {
        return this._maxSize;
    }

    /**
     * Whether the window can be enlarged.
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
     * Set the title of the window.
     */
    title(val: string): this {
        this._title = val;
        return this;
    }

    getTitle(): string {
        return this._title;
    }

    /**
     * !If the window is configured with the tab list, select the initial tab before showing the window.
     */
    selectedTabIndex(val: number): this {
        if (this._isOpened()) {
            console.log('WARNING: The tab index can set only before opening the window.');
        } else {
            this._selectedTabIndex = val;
        }
        return this;
    }

    getSelectedTabIndex(): number {
        return this._selectedTabIndex;
    }

    /**
     * Sets the color theme for window and child widgets.
     */
    theme(val: UIWindowTheme): this {
        this._theme = val;
        return this;
    }

    /**
     * Set the primary theme color.
     */
    themePrimaryColor(val: UIColor): this {
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
    themeSecondaryColor(val: UIColor): this {
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
    themeTertiaryColor(val: UIColor): this {
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

    /**
     * Execute the function when the window is closed.
     */
    onClose(block: (window: this) => void): this {
        this._onClose = block;
        return this;
    }

    /**
     * Execute the function when selecting a tab.
     */
    onTabChange(block: (window: this, tabIndex: number) => void): this {
        this._onTabChange = block;
        return this;
    }
    
    /**
     * Bind with window proxy.
     */
    bind(proxy: UIWindowProxy): this {
        proxy._bind(this);
        return this;
    }
}
