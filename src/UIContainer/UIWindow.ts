/// <reference path="../Helpers/UIConstructor/UIConstructor.ts" />
/// <reference path="../UICore/UIEdgeInsets.ts" />
/// <reference path="./UITab.ts" />
/// <reference path="../UIWidgets/UIStack.ts" />
/// <reference path="UIWindowTheme.ts" />

/**
 * Top-level object managing tabs and widgets.
 */
class UIWindow {

    protected _id = this.constructor.name + '-' + uuid();

    protected _uiConstructor = new UIConstructor();
    protected _interactor = new UIInteractor();

    protected _window?: Window;

    protected _singleContentView?: UIStack;
    protected _tabs?: UITab[];

    // protected _prevSelectedTabIndex: number = 0;
    protected _selectedTabIndex: number = 0;

    protected _origin!: UIPoint;
    protected _size!: UISize;
    protected _initialSize!: UISize;

    protected _originalTitle: string;
    protected _title: string;
    protected _defaultTheme: UIWindowTheme = UIWindowThemeDefault;
    protected _theme: UIWindowTheme = UIWindowThemeDefault;

    protected _spacing = 0;
    protected _padding: UIEdgeInsets = UIEdgeInsetsZero;

    protected _initialExpandableState: boolean = false;
    protected _isExpandable: boolean = false;
    protected _minSize: UISize = UISizeZero;
    protected _maxSize: UISize = { width: ui.width, height: ui.height };

    protected _onClose?: (window: this) => void;
    protected _onTabChange?: (window: this, selectedIndex: number) => void;

    protected _didLoad?: (window: this) => void;

    /**
     * Creates an instance of *UIWindow*.
     * @param title 
     * @param contents List of *UITab* or *UIWindget*
     */
    constructor(title: string, contents: UIWidget<any>[] | UITab[]) {
        this._title = title;
        this._originalTitle = title;

        if (contents.length > 0) {
            if (contents[0] instanceof UIWidget) {
                const widgets: any = contents;
                this._singleContentView = new UIStack(UIAxis.Vertical, widgets);
            } else {
                const tabs: any = contents;
                this._tabs = tabs;
            }
        } else {
            throw new Error("Need to add at least one UITab or UIWidget.");
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

    protected _usingTab(): boolean {
        return typeof this._tabs !== "undefined";
    }

    protected _convertColors(tabIndex: number | undefined = undefined): UIColor[] {
        if (typeof tabIndex !== "undefined") {
            const tab = this._tabs?.[tabIndex];
            const theme = tab?.getTheme()
            return [
                theme?.primary ?? this._theme.primary ?? this._defaultTheme.primary!,
                theme?.secondary ?? this._theme.secondary ?? this._defaultTheme.secondary!,
                theme?.tertiary ?? this._theme.tertiary ?? this._defaultTheme.tertiary!
            ];
        } else {
            return [
                this._theme.primary ?? this._defaultTheme.primary!,
                this._theme.secondary ?? this._defaultTheme.secondary!,
                this._theme.tertiary ?? this._defaultTheme.tertiary!
            ];
        }
    }

    protected _isOpened(): boolean {
        return typeof this._window !== "undefined";
    }

    protected _sync() {
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
        }
    }

    protected _update() {

        const window = this._window;
        if (typeof window === "undefined") {
            return;
        }

        window.title = this._title;

        //Property does not have getter or setter.
        // window.tabIndex = this._selectedTabIndex;

        var expandableValue = (isWidth: boolean, rng: UISize): number => {
            if (isWidth) {
                return this._isExpandable ? rng.width : Math.max(this._minSize.width, this._size.width);
            } else {
                return this._isExpandable ? rng.height : Math.max(this._minSize.height, this._size.height);
            }
        }
        window.minWidth = expandableValue(true, this._minSize);
        window.minHeight = expandableValue(false, this._minSize);
        window.maxWidth = expandableValue(true, this._maxSize);
        window.maxHeight = expandableValue(false, this._maxSize);

        const selectedIndex = this._usingTab() ? this._selectedTabIndex : undefined;
        window.colours = this._convertColors(selectedIndex);

        //Because it is not rendered immediately, it moves and revert the coordinates.
        window.x = ui.width + 1;
        window.y = ui.height + 1;

        window.x = this._origin.x;
        window.y = this._origin.y;
    }

    protected _onUpdate() {

        const window = this._window;
        if (typeof window === "undefined") {
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

    protected _internalOnTabChange() {
        if (typeof this._tabs !== "undefined") {
            const windowMaxSize = this.getMaxSize();

            const currentTab = this._tabs[this._selectedTabIndex];
            const tabMinSize = currentTab.getMinSize();
            const tempTabMaxSize = currentTab.getMaxSize();
            const tabMaxSize = {
                width: tempTabMaxSize?.width ?? windowMaxSize.width,
                height: tempTabMaxSize?.height ?? windowMaxSize.height
            }
            const size: UISize = {
                width: Math.max(Math.min(this._size.width, tabMaxSize.width), tabMinSize.width),
                height: Math.max(Math.min(this._size.height, tabMaxSize.height), tabMinSize.height)
            }
            this._uiConstructor.didLoadTabs(this._tabs);

            this._refresh(size);
            this.updateUI(window => {
                window._minSize = tabMinSize;
                window._maxSize = tabMaxSize;
                window._isExpandable = window._initialExpandableState || currentTab.getIsExpandable();
                window._title = currentTab.getTitle() ?? this._originalTitle;
            });
        }
    }

    protected _refresh(size: UISize) {
        if (this._usingTab()) {
            const tab = this._tabs![this._selectedTabIndex];
            this._uiConstructor.refreshTab(tab, size);
        } else {
            this._uiConstructor.refresh(this._singleContentView!, size);
        }
    }

    protected _reflectResizingFromChild() {

        var minSize = this._minSize;
        var maxSize = this._maxSize;
        var contentView = this._singleContentView;
        var title = this._title;

        if (typeof this._tabs !== "undefined") {
            const currentTab = this._tabs![this._selectedTabIndex];
            contentView = currentTab._getContentView();

            contentView._resetSize();

            this._uiConstructor.constructTabs(this._tabs, this._selectedTabIndex, this._interactor, this._spacing, this._padding, this._maxSize, false);

            minSize = currentTab.getMinSize();
            const tabMaxSize = currentTab.getMaxSize();
            maxSize = {
                width: tabMaxSize?.width ?? maxSize.width,
                height: tabMaxSize?.height ?? maxSize.height
            }
            title = this._tabs?.[this._selectedTabIndex].getTitle() ?? this._originalTitle;

        } else if (typeof this._singleContentView !== "undefined") {
            contentView = this._singleContentView;

            contentView._resetSize();

            const construct = this._uiConstructor.construct(this._singleContentView, this._interactor, UIEdgeInsetsContainer, false);

            minSize = construct.size;
            maxSize = this._maxSize;
        }

        const size: UISize = {
            width: Math.max(Math.min(this._size.width, maxSize.width), minSize.width),
            height: Math.max(Math.min(this._size.height, maxSize.height), minSize.height)
        }
        this._refresh(size);
        this.updateUI(window => {
            window._minSize = minSize;
            window._maxSize = maxSize;
            window._title = title;
        })
    }

    protected _activeInterval(flag: boolean) {

        const singleWidgets = this._singleContentView?._getUIWidgets();
        singleWidgets?.forEach(val => intervalHelper.enabled(val.getName(), flag));

        const tabsWidgets: UIWidget<any>[] | undefined = this._tabs?.map(val => val._getContentView()._getUIWidgets()).flatMap();
        tabsWidgets?.forEach(val => intervalHelper.enabled(val.getName(), flag));
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

        var title!: string;
        var colors!: UIColor[];

        this._initialExpandableState = this._isExpandable;

        const singlecontentView = this._singleContentView?.spacing(this._spacing).padding(this._padding);
        var singleContentViewWidget: Widget[] | undefined;
        if (typeof singlecontentView !== "undefined") {
            const constructed = this._uiConstructor.construct(singlecontentView, this._interactor);
            singleContentViewWidget = constructed.widgets;
            this._minSize = constructed.size;

            title = this._originalTitle;
            colors = this._convertColors();
        };

        var tabDescriptions: WindowTabDesc[] | undefined;
        if (typeof this._tabs !== "undefined") {
            const constructed = this._uiConstructor.constructTabs(this._tabs, this._selectedTabIndex, this._interactor, this._spacing, this._padding, this._maxSize);
            tabDescriptions = constructed.tabs;
            this._minSize = constructed.size;
            const windownMaxSize = this.getMaxSize();
            const tabMaxSize = this._tabs[this._selectedTabIndex].getMaxSize();
            this._maxSize = {
                width: tabMaxSize?.width ?? windownMaxSize.width,
                height: tabMaxSize?.height ?? windownMaxSize.height
            }
            this._isExpandable ||= this._tabs?.[this._selectedTabIndex].getIsExpandable() ?? false;

            title = this._tabs?.[this._selectedTabIndex].getTitle() ?? this._originalTitle;
            colors = this._convertColors(this._selectedTabIndex);
        }

        this._activeInterval(true);

        const windowDesc: WindowDesc = {
            classification: this._title,
            x: this._origin?.x,
            y: this._origin?.y,
            width: this._minSize.width,
            height: this._minSize.height,
            title: title,
            minWidth: this._isExpandable ? this._minSize.width : undefined,
            maxWidth: this._isExpandable ? this._maxSize.width : undefined,
            minHeight: this._isExpandable ? this._minSize.height : undefined,
            maxHeight: this._isExpandable ? this._maxSize.height : undefined,
            widgets: singleContentViewWidget,
            colours: colors,
            tabs: tabDescriptions,
            tabIndex: this._selectedTabIndex,
            onClose: () => {
                this._onClose?.call(this, this);
                this._activeInterval(false);
                this._window = undefined;
            },
            onUpdate: () => {
                this._onUpdate();
            },
            onTabChange: () => {
                const changedTabIndex = this._window?.tabIndex ?? 0;
                // if (changedTabIndex !== this._prevSelectedTabIndex) {
                this._selectedTabIndex = changedTabIndex
                this._internalOnTabChange();
                this._onTabChange?.call(this, this, this._selectedTabIndex);
                //     this._prevSelectedTabIndex = changedTabIndex;
                // }
            }
        }

        this._window = ui.openWindow(windowDesc);
        this._initialSize = {
            width: this._window.width,
            height: this._window.height
        };
        this._sync();

        this._interactor._findWidget(name => {
            return this.findWidget(name);
        });
        this._interactor._refresh(() => {
            this._reflectResizingFromChild();
        });
        this._interactor._refreshTab(isReopen => {
            if (isReopen) {
                this.close();
                this.show();
            } else {
                this._internalOnTabChange();
            }
        });
        this._interactor._windowTheme(() => {
            return this._theme;
        });

        if (typeof singlecontentView !== "undefined") {
            this._uiConstructor.didLoad(singlecontentView);
        }
        if (typeof this._tabs !== "undefined") {
            this._uiConstructor.didLoadTabs(this._tabs);
        }
        this._reflectResizingFromChild();

        this._didLoad?.call(this, this);

        return this;
    }

    /**
     * Modify and update the properties of the window.
     * @param block update block
     */
    updateUI(block: ((val: this) => void) | undefined = undefined) {
        this._sync();
        block?.call(this, this);
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
                top: val.top ?? this._padding.top,
                left: val.left ?? this._padding.left,
                bottom: val.bottom ?? this._padding.bottom,
                right: val.right ?? this._padding.right
            };
        }
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

    maxSize(val: UIOptionalSize): this {
        this._maxSize = {
            width: val.width ?? this._maxSize.width,
            height: val.height ?? this._maxSize.height
        }
        return this;
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
            console.log("WARNING: The tab index can set only before opening the window.");
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

    /**
     * This function is called immediately after the window is displayed.
     */
    didLoad(block: (window: this) => void): this {
        this._didLoad = block;
        return this;
    }

    /**
     * Find the tab contained in window by its unique name.
     */
    getUITab(name: string): UITab | undefined {
        return this._tabs?.first(val => val.getName() === name);
    }

    /**
     * Find the widget contained in window by its unique name.
     */
    getUIWidget<T extends UIWidget<any>>(name: string): T | undefined {
        var finded: T | undefined = this._singleContentView?._getUIWidgets().first(val => val.getName() === name);
        if (typeof finded === "undefined" && typeof this._tabs !== "undefined") {
            for (var index = 0; index < this._tabs.length; index++) {
                finded = this._tabs[index].getUIWidget(name);
                if (typeof finded !== "undefined") {
                    break;
                }
            }
        }
        return finded;
    }
}
