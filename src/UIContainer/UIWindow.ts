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
    protected _originalMinSize: UISize = UISizeZero;
    protected _minSize: UISize = UISizeZero;
    protected _originalMaxSize: UISize = { width: ui.width, height: ui.height };
    protected _maxSize: UISize = { width: ui.width, height: ui.height };

    protected _onClose?: (window: this) => void;
    protected _onTabChange?: (window: this, selectedIndex: number) => void;

    protected _didLoad?: (window: this) => void;
    protected _didAppear?: (window: this) => void;

    protected _internalClose: boolean = false;

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

    protected _getVisibleTabs(): UITab[] | undefined {
        return this._tabs?.filter(val => !val.getIsHidden());
    }

    protected _getSelectedTabIndex(): number {
        const numberOfTabs = this._getVisibleTabs()?.length ?? 0;
        return Math.min(Math.max(numberOfTabs-1, 0), this._selectedTabIndex);
    }

    protected _getSelectedTab(): UITab | undefined {
        return this._getVisibleTabs()?.[this._getSelectedTabIndex()];
    }

    protected _getTab(index: number): UITab | undefined {
        const numberOfTabs = this._getVisibleTabs()?.length ?? 0;
        if (index >= 0 && index < numberOfTabs) {
            return this._getVisibleTabs()?.[index];
        } else {
            return undefined;
        }
    }

    protected _convertColors(tabIndex: number | undefined = undefined): UIColor[] {
        if (typeof tabIndex !== "undefined") {
            const tab = this._getTab(tabIndex);
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

        const selectedIndex = this._usingTab() ? this._getSelectedTabIndex() : undefined;
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

        const isOriginChange = window.x != this._origin.x || window.y != this._origin.y;
        const isSizeChange = window.width != this._size.width || window.height != this._size.height;
        if (isOriginChange || isSizeChange) {
            this._sync();
        }
        if (isSizeChange) {
            this._refresh(this._size);
        }
    }

    protected _internalOnTabChange() {
        const tabs = this._getVisibleTabs();
        if (typeof tabs !== "undefined") {
            var minSize = this._originalMinSize;
            var maxSize = this._originalMaxSize;

            const selectedTabIndex = this._getSelectedTabIndex();
            const currentTab = this._getTab(selectedTabIndex);
            if (typeof currentTab !== "undefined") {

                currentTab._getContentView()._resetSize();
                this._uiConstructor.constructTabs(
                    tabs,
                    selectedTabIndex,
                    this._spacing,
                    this._padding,
                    minSize,
                    maxSize,
                    false,
                    true
                );

                const tempTabMinSize = currentTab._getMinSize();
                const tabMinSize = {
                    width: tempTabMinSize?.width ?? minSize.width,
                    height: tempTabMinSize?.height ?? minSize.height
                }
                const tempTabMaxSize = currentTab._getMaxSize();
                const tabMaxSize = {
                    width: tempTabMaxSize?.width ?? maxSize.width,
                    height: tempTabMaxSize?.height ?? maxSize.height
                }
                const size: UISize = {
                    width: Math.max(Math.min(this._size.width, tabMaxSize.width), tabMinSize.width),
                    height: Math.max(Math.min(this._size.height, tabMaxSize.height), tabMinSize.height)
                }

                const title = currentTab.getTitle() ?? this._originalTitle;
                const isExpandable = this._initialExpandableState || currentTab.getIsExpandable();

                this._uiConstructor.didAppearTab(currentTab);

                this._refresh(size);
                this.updateUI(window => {
                    window._minSize = tabMinSize;
                    window._maxSize = tabMaxSize;
                    window._isExpandable = isExpandable;
                    window._title = title;
                });
            }
        }
    }

    protected _refresh(size: UISize) {
        if (this._usingTab()) {
            const tab = this._getSelectedTab();
            if (typeof tab !== "undefined") {
                this._uiConstructor.refreshTab(tab, size);
            }
        } else {
            this._uiConstructor.refresh(this._singleContentView!, size);
        }
    }

    protected _reflectResizingFromChild() {

        var contentView = this._singleContentView;

        var minSize = this._originalMinSize;
        var maxSize = this._originalMaxSize;
        var isExpandable = this._initialExpandableState;
        var title = this._title;

        const tabs = this._getVisibleTabs();
        if (typeof tabs !== "undefined") {
            const selectedTabIndex = this._getSelectedTabIndex();
            const currentTab = this._getTab(selectedTabIndex);
            if (typeof currentTab !== "undefined") {

                contentView = currentTab._getContentView();

                contentView._resetSize();

                this._uiConstructor.constructTabs(
                    tabs,
                    selectedTabIndex,
                    this._spacing,
                    this._padding,
                    minSize,
                    maxSize,
                    false
                );

                const tabMinSize = currentTab._getMinSize();
                minSize = {
                    width: tabMinSize?.width ?? minSize.width,
                    height: tabMinSize?.height ?? minSize.height
                }
                const tabMaxSize = currentTab._getMaxSize();
                maxSize = {
                    width: tabMaxSize?.width ?? maxSize.width,
                    height: tabMaxSize?.height ?? maxSize.height
                }

                title = currentTab.getTitle() ?? this._originalTitle;
                isExpandable = isExpandable || currentTab.getIsExpandable();
            }
        } else if (typeof this._singleContentView !== "undefined") {
            contentView = this._singleContentView;

            contentView._resetSize();

            const construct = this._uiConstructor.construct(
                this._singleContentView,
                UIEdgeInsetsContainer,
                minSize,
                false
            );

            minSize = construct.size;
        }

        const size: UISize = {
            width: Math.max(Math.min(this._size.width, maxSize.width), minSize.width),
            height: Math.max(Math.min(this._size.height, maxSize.height), minSize.height)
        }
        this._refresh(size);
        this.updateUI(window => {
            window._minSize = minSize;
            window._maxSize = maxSize;
            window._isExpandable = isExpandable;
            window._title = title;
        })
    }

    protected _activeInterval(flag: boolean) {

        const singleWidgets = this._singleContentView?._getUIWidgets();
        singleWidgets?.forEach(val => intervalHelper.enabled(val.getName(), flag));

        const tabsWidgets: UIWidget<any>[] | undefined = this._tabs?.map(val => val._getContentView()._getUIWidgets()).flatMap();
        tabsWidgets?.forEach(val => intervalHelper.enabled(val.getName(), flag));
    }
    
    protected _injectInteractorTabs(tabs: UITab[]) {
        for (var tab of tabs) {
            tab._setInteractor(this._interactor);
            this._injectInteractorSingle(tab._getContentView());
        }
    }

    protected _injectInteractorSingle(stack: UIStack) {
        const flattedChilds: UIWidget<any>[] = stack._getUIWidgets();
        stack._setInteractor(this._interactor);
        flattedChilds.forEach(val => val._setInteractor(this._interactor));
    }

    protected _injectInteractor() {
        if (this._usingTab()) {
            this._injectInteractorTabs(this._tabs!);
        } else {
            this._injectInteractorSingle(this._singleContentView!);
        }
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

        this._injectInteractor();

        var title!: string;
        var colors!: UIColor[];

        const singlecontentView = this._singleContentView?.spacing(this._spacing).padding(this._padding);
        var singleContentViewWidget: Widget[] | undefined;
        if (typeof singlecontentView !== "undefined") {
            const constructed = this._uiConstructor.construct(
                singlecontentView,
                UIEdgeInsetsContainer,
                this._originalMinSize
            );
            singleContentViewWidget = constructed.widgets;
            this._minSize = constructed.size;

            title = this._originalTitle;
            colors = this._convertColors();
        };

        var tabDescriptions: WindowTabDesc[] | undefined;
        const tabs = this._getVisibleTabs();
        const selectedTabIndex = this._getSelectedTabIndex();
        if (typeof tabs !== "undefined") {
            const selectedTab = this._getTab(selectedTabIndex);

            const constructed = this._uiConstructor.constructTabs(
                tabs,
                selectedTabIndex,
                this._spacing,
                this._padding,
                this._originalMinSize,
                this._originalMaxSize
            );
            tabDescriptions = constructed.tabs;
            this._minSize = constructed.size;

            if (typeof selectedTab !== "undefined") {

                const windownMaxSize = this._originalMaxSize;
                const tabMaxSize = selectedTab._getMaxSize();
                this._maxSize = {
                    width: tabMaxSize?.width ?? windownMaxSize.width,
                    height: tabMaxSize?.height ?? windownMaxSize.height
                }

                this._isExpandable ||= selectedTab.getIsExpandable() ?? false;

                title = selectedTab.getTitle() ?? this._originalTitle;
                colors = this._convertColors(selectedTabIndex);
            }
        }

        this._selectedTabIndex = selectedTabIndex;
        
        const size = {
            width: Math.max(Math.min(this._size?.width ?? 0, this._maxSize.width), this._minSize.width),
            height: Math.max(Math.min(this._size?.height ?? 0, this._maxSize.height), this._minSize.height)
        }

        this._activeInterval(true);

        const windowDesc: WindowDesc = {
            classification: this._title,
            x: this._origin?.x,
            y: this._origin?.y,
            width: size.width,
            height: size.height,
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
                if (!this._internalClose) {
                    this._onClose?.call(this, this);
                }
                this._internalClose = false;
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
                this.reopen(true);
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
        if (typeof tabs !== "undefined") {
            this._uiConstructor.didLoadTabs(tabs);
        }
        this._reflectResizingFromChild();

        this._didLoad?.call(this, this);

        //---

        if (typeof singlecontentView !== "undefined") {
            this._uiConstructor.didAppear(singlecontentView);
        }
        if (typeof tabs !== "undefined") {
            const selectedTab = this._getSelectedTab();
            if (typeof selectedTab !== "undefined") {
                this._uiConstructor.didAppearTab(selectedTab);
            }
        }

        this._didAppear?.call(this, this);

        return this;
    }

    /**
     * Modify and update the properties of the window.
     * @param block update block
     */
    updateUI(block: ((val: this) => void) | undefined = undefined) {
        const prevSelectedTabIndex = this._selectedTabIndex;

        block?.call(this, this);
        this._update();

        const selectedTabIndexChanged = this._selectedTabIndex != prevSelectedTabIndex;
        if (selectedTabIndexChanged) {
            this.reopen(true);
        }
    }

    /**
     * Closes window
     */
    close() {
        this._window?.close();
    }

    /**
     * Bring to front
     */
    bringToFront() {
        this._window?.bringToFront();
    }

    /**
     * Reopen window
     */
    reopen(internal: boolean = false) {
        this._internalClose = internal;
        this.close();
        this.show();
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
    origin(val: UIOptionalPoint): this {
        this._origin = {
            x: val.x ?? this._origin.x,
            y: val.y ?? this._origin.y
        }
        return this;
    }

    getOrigin(): UIPoint {
        return this._origin;
    }

    getSize(): UISize {
        return this._size;
    }

    /**
     * Set the minimum size.
     * The minimum size set in the tab takes precedence.
     */
    minSize(val: UIOptionalSize): this {
        this._minSize = {
            width: val.width ?? this._minSize.width,
            height: val.height ?? this._minSize.height
        }
        this._originalMinSize = { ...this._minSize };
        return this;
    }

    getMinSize(): UISize {
        return this._originalMinSize;
    }

    /**
     * Set the maximum size.
     * The maximum size set in the tab takes precedence.
     */
    maxSize(val: UIOptionalSize): this {
        this._maxSize = {
            width: val.width ?? this._maxSize.width,
            height: val.height ?? this._maxSize.height
        }
        this._originalMaxSize = { ...this._maxSize };
        return this;
    }

    getMaxSize(): UISize {
        return this._originalMaxSize;
    }

    /**
     * Whether the window can be enlarged.
     * ! May not apply under certain conditions.
     */
    isExpandable(val: boolean): this {
        this._isExpandable = val;
        this._initialExpandableState = val;
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
     * Set the selected tab index of the window.
     * * If you change this attribute after the window is opened, the window is internally reopened for the changes to apply.
     */
    selectedTabIndex(val: number): this {
        const tabs = this._getVisibleTabs();
        if (typeof tabs !== "undefined") {
            if (val >= 0 && val < tabs.length) {
                this._selectedTabIndex = val;
            } else {
                console.log(`WARNING: Enter a value within a valid range. (0 ~ ${tabs.length - 1})`);
            }
        } else {
            console.log("WARNING: This property is only available if the window is created with a tab type.");
        }
        return this;
    }

    getSelectedTabIndex(): number {
        return this._selectedTabIndex;
    }

    /**
     * Set the selected tab name of the window.
     * * If you change this attribute after the window is opened, the window is internally reopened for the changes to apply.
     */
    selectedTabName(name: string): this {
        const index = this._getVisibleTabs()?.firstIndex(val => val.getName() === name) ?? 0;
        this.selectedTabIndex(index);
        return this;
    }

    getSelectedTabName(): string | undefined {
        return this._getSelectedTab()?.getName();
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
     * This function is called after the window has been initialized.
     */
    didLoad(block: (window: this) => void): this {
        this._didLoad = block;
        return this;
    }

    /**
     * This function is called immediately after the window is displayed.
     */
    didAppear(block: (window: this) => void): this {
        this._didAppear = block;
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
