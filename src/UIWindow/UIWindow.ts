/// <reference path='../Helpers/UIConstructor/UIConstructor.ts' />
/// <reference path='../UICore/UIEdgeInsets.ts' />
/// <reference path='../UIWidgets/UITab.ts' />
/// <reference path='../UIWidgets/UIStack.ts' />
/// <reference path='UIWindowTheme.ts' />

class UIWindow {

    _uiConstructor = new UIConstructor();
    _interactor = new UIInteractor();

    _window: Window | undefined;

    _singleContentView: UIStack | undefined;
    _tabs: UITab[] | undefined;
    _selectedTabIndex: number = 0;

    _origin!: UIPoint;
    _size!: UISize;
    _initialSize!: UISize;

    _title: string;
    _theme: UIWindowTheme = UIWindowThemeDefault;

    _spacing = 0;
    _padding: UIEdgeInsets = UIEdgeInsetsZero;

    _initialExpandableState: boolean = false;
    _isExpandable: boolean = false;
    _minSize: UISize = UISizeZero;
    _maxSize: UISize = { width: ui.width, height: ui.height };

    _onClose: ((window: this) => void) | undefined;
    _onTabChange: ((window: this, selectedIndex: number) => void) | undefined;

    constructor(title: string, contents: UIWidget<any>[] | UITab[]) {
        this._title = title;

        if (contents.length > 0) {
            if (contents[0] instanceof UIWidget) {
                var widgets: any = contents;
                this._singleContentView = new UIStack(UIAxis.Vertical, widgets);
            } else {
                var tabs: any = contents;
                this._tabs = tabs;
            }
        } else {
            throw new Error('Need to add at least one UITab or UIWidget.');
        }
    }

    //Convenience

    static $(title: string, ...widgets: UIWidget<any>[]): UIWindow {
        return new UIWindow(title, widgets);
    }

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
            var window = this._window!;
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

        var window = this._window;
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

        var window = this._window;
        if (typeof window === 'undefined') {
            return;
        }

        var isSizeChange = window.width != this._size.width || window.height != this._size.height;
        if (isSizeChange) {
            this._size = {
                width: window.width,
                height: window.height
            }
            this._refresh(this._size);
        }
    }

    _internalOnTabChange() {
        var currentTab = this._tabs![this._selectedTabIndex];
        var tabMinSize = currentTab._minSize;
        var tabMaxSize = currentTab._maxSize;
        var size: UISize = {
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
            var tab = this._tabs![this._selectedTabIndex];
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
            var currentTab = this._tabs![this._selectedTabIndex];
            contentView = currentTab._contentView;

            contentView._resetSize();
            
            this._uiConstructor.constructTabs(this._tabs, this._selectedTabIndex, this._interactor, this._spacing, this._padding);

            minSize = currentTab._minSize;
            maxSize = currentTab._maxSize;

        } else if (typeof this._singleContentView !== 'undefined') {
            contentView = this._singleContentView;

            contentView._resetSize();

            var construct = this._uiConstructor.construct(this._singleContentView, this._interactor);

            minSize = construct.size;
            maxSize = this._maxSize;
        }
        
        var size: UISize = {
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

    show(): this {

        if (this._isOpened()) {
            this.bringToFront();
            return this;
        }

        this._initialExpandableState = this._isExpandable;

        var singlecontentView = this._singleContentView?.spacing(this._spacing).padding(this._padding);
        var singleContentViewWidget: Widget[] | undefined;
        if (typeof singlecontentView !== 'undefined') {
            var constructed = this._uiConstructor.construct(singlecontentView, this._interactor);
            singleContentViewWidget = constructed.widgets;
            this._minSize = constructed.size;
        };

        var tabDescriptions: WindowTabDesc[] | undefined;
        if (typeof this._tabs !== 'undefined') {
            var constructed = this._uiConstructor.constructTabs(this._tabs, this._selectedTabIndex, this._interactor, this._spacing, this._padding);
            tabDescriptions = constructed.tabs;
            this._minSize = constructed.size;
            this._isExpandable ||= this._tabs?.[this._selectedTabIndex]._isExpandable ?? false;
        }

        var windowDesc: WindowDesc = {
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

        this._interactor.findWidget((name) => {
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
        }

        return this;
    }

    updateUI(block: (val: this) => void) {
        this._sync();
        block(this);
        this._update();
    }

    close() {
        this._window?.close();
        this._window = undefined;
    }

    bringToFront() {
        this._window?.bringToFront();
    }

    findWidget<T extends Widget>(name: string): T | undefined {
        return this._window?.findWidget(name);
    }

    //---

    spacing(val: number): this {
        this._spacing = val;
        return this;
    }

    padding(val: UIEdgeInsets): this {
        this._padding = val;
        return this;
    }

    origin(val: UIPoint): this {
        this._origin = val;
        return this;
    }

    isExpandable(val: boolean): this {
        this._isExpandable = val;
        return this;
    }

    title(val: string): this {
        this._title = val;
        return this;
    }

    selectedTabIndex(val: number): this {
        if (this._isOpened()) {
            console.log('WARNING: The tab index can set only before opening the window.');
        } else {
            this._selectedTabIndex = val;
        }
        return this;
    }

    theme(val: UIWindowTheme): this {
        this._theme = val;
        return this;
    }

    themePrimaryColor(val: UIColor): this {
        this._theme = {
            primary: val,
            secondary: this._theme.secondary,
            tertiary: this._theme.tertiary
        }
        return this;
    }

    themeSecondaryColor(val: UIColor): this {
        this._theme = {
            primary: this._theme.primary,
            secondary: val,
            tertiary: this._theme.tertiary
        }
        return this;
    }

    themeTertiaryColor(val: UIColor): this {
        this._theme = {
            primary: this._theme.primary,
            secondary: this._theme.secondary,
            tertiary: val
        }
        return this;
    }

    onClose(block: (window: this) => void): this {
        this._onClose = block;
        return this;
    }

    onTabChange(block: (window: this, tabIndex: number) => void): this {
        this._onTabChange = block;
        return this;
    }
}
