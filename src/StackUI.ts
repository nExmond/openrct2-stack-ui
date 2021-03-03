/// <reference path='../modules/openrct2.d.ts' />

interface Array<T> {
    flatMap<T>(): T[];
    flatMapFunc<T>(d: number): T[];
    compactMap<T>(): T[];
}
Array.prototype.flatMapFunc = function <T>(d = 1): T[] {
    return d > 0 ? this.reduce((acc, val) => acc.concat(Array.isArray(val) ? val.flatMapFunc(d - 1) : val), []) : this.slice();
}
Array.prototype.flatMap = function <T>(): T[] {
    return this.flatMapFunc(1);
}
Array.prototype.compactMap = function <T>(): T[] {
    return this.filter((val) => val !== undefined);
}

//https://www.cloudhadoop.com/2018/10/guide-to-unique-identifiers-uuid-guid.html
function uuid(): string {
    var uuidValue = '', k, randomValue;
    for (k = 0; k < 32; k++) {
        randomValue = Math.random() * 16 | 0;
        if (k == 8 || k == 12 || k == 16 || k == 20) {
            uuidValue += '-';
        }
        uuidValue += (k == 12 ? 4 : (k == 16 ? (randomValue & 3 | 8) : randomValue)).toString(16);
    }
    return uuidValue;
}

function plusSize(lhs: UISize, rhs: UISize): UISize {
    return {
        width: lhs.width + rhs.width,
        height: lhs.height + rhs.height
    }
}

// Enums
enum UIAxis {
    Vertical,
    Horizontal
}

enum UIColor {
    Black, Gray, White,
    DarkPurple, LightPurple, BrightPurple,
    DarkBlue, LightBlue, IcyBlue,
    DarkWater, LightWater,
    SaturatedGreen, DarkGreen, MossGreen, BrightGreen, OliveGreen, DarkOliveGreen,
    BrightYellow, Yellow, DarkYellow,
    LightOrange, DarkOrange,
    LightBrown, SaturatedBrown, DarkBrown,
    SalmonPink,
    BordeauxRed, SaturatedRed, BrightRed,
    DarkPink, BrightPink, LightPink
}

enum UIColorFlag {
    Outline = 1 << 5,
    Inset = 1 << 6,
    Translucent = 1 << 7
    // , Unknown = 1 << 8
}

enum UITextAlignment {
    Left = 'left',
    Center = 'centred'
}

enum UIViewportScale {
    One, Half, Quater, Eighth
}

enum UIViewportFlag {
    None = 0,
    UndergroundInside = 1 << 0,
    SeethroughRides = 1 << 1,
    SeethroughScenery = 1 << 2,
    InvisibleSupports = 1 << 3,
    LandHeights = 1 << 4,
    TrackHeights = 1 << 5,
    PathHeights = 1 << 6,
    Gridlines = 1 << 7,
    LandOwnership = 1 << 8,
    ConstructionRights = 1 << 9,
    SoundOn = 1 << 10,
    InvisiblePeeps = 1 << 11,
    HideBase = 1 << 12,
    HideVertical = 1 << 13,
    InvisibleSprites = 1 << 15,
    Unknown = 1 << 15,
    SeethroughPaths = 1 << 16,
    ClipView = 1 << 17,
    HighlightPathIssues = 1 << 18,
    TransparentBackground = 1 << 19,
}

enum UIScrollbarType {
    None = 'none',
    Vertical = 'vertical',
    Horizontal = 'horizontal',
    both = 'both'
}

enum UISortOrder {
    None = 'none',
    Ascending = 'ascending',
    Descending = 'descending'
}

// Interfaces
interface UIOptionalRange {
    min: number | undefined
    max: number | undefined
}

const UIPointZero: UIPoint = { x: 0, y: 0 };
interface UIPoint extends ScreenCoordsXY { }

const UIEdgeInsetsZero: UIEdgeInsets = { top: 0, left: 0, bottom: 0, right: 0 };
const UIEdgeInsetsContainer: UIEdgeInsets = { top: 16, left: 2, bottom: 2, right: 2 };
const UIEdgeInsetsTabContainer: UIEdgeInsets = { top: 45, left: 2, bottom: 2, right: 2 };
interface UIEdgeInsets {
    top: number;
    left: number;
    bottom: number;
    right: number;
}

const UIOptionalSizeDefulat: UIOptionalSize = { width: undefined, height: undefined };
interface UIOptionalSize {
    width: number | undefined;
    height: number | undefined;
}

const UISizeZero: UISize = { width: 0, height: 0 };
interface UISize extends UIOptionalSize {
    width: number;
    height: number;
}

interface UIConstructResult {
    size: UISize;
    widgets: Widget[];
    tabs?: WindowTabDesc[];
}

const UIWindowColorPaletteDefault: UIWindowColorPalette = { primary: UIColor.Gray, secondary: UIColor.Gray, tertiary: UIColor.Gray };
interface UIWindowColorPalette {
    primary?: UIColor;
    secondary?: UIColor;
    tertiary?: UIColor;
}

// Classes
class UIInteractor {

    _findWidget!: <T extends Widget>(name: string) => T | undefined;

    constructor() { }

    update<T extends Widget>(name: string, block: (widget: T) => void) {
        var widget: T | undefined = this._findWidget(name);
        if (typeof widget !== 'undefined') {
            block(widget);
        }
    }

    findWidget(block: <T extends Widget>(name: string) => T | undefined) {
        this._findWidget = block;
    }
}

class UIConstructor {

    constructTabs(tabs: UITab[], selectedIndex: number, interactor: UIInteractor): UIConstructResult {
        if (selectedIndex >= tabs.length || selectedIndex < 0) {
            throw new Error('SelectedIndex is less than the count of tabs and must be at least 0.');
        }
        var minWidth = 31 * tabs.length + 6
        for (var i = 0; i < tabs.length; i++) {
            var tab = tabs[i];
            var stack = tab._contentView.spacing(tab._spacing).padding(tab._padding);

            var results = this.construct(stack, interactor, UIEdgeInsetsTabContainer);
            tab._minSize = {
                width: Math.max(minWidth, results.size.width),
                height: results.size.height
            }

            if (tab._maxSize.width < tab._minSize.width || tab._maxSize.height < tab._minSize.height) {
                console.log('WARNING: UITab['+i+'] maximum size is less than its minimum size!');
                console.log('minSize: { width: '+tab._minSize.width+', height: '+tab._minSize.height+' }');
                console.log('maxSize: { width: '+tab._maxSize.width+', height: '+tab._maxSize.height+' }');
                console.log('Errors can occur when resizing windows.');
            }
        }
        var selectedTab = tabs[selectedIndex];
        this.refreshTab(selectedTab, selectedTab._minSize);
        return {
            size: selectedTab._minSize,
            widgets: [],
            tabs: tabs.map((val) => val._data())
        }
    }

    construct(stack: UIStack, interactor: UIInteractor, insets: UIEdgeInsets = UIEdgeInsetsContainer): UIConstructResult {
        this._injectInteractor(stack, interactor);
        return {
            size: this.calculateBounds(stack, insets),
            widgets: stack._getWidgets()
        };
    }

    _injectInteractor(stack: UIStack, interactor: UIInteractor) {

        var flattedChilds: UIWidget<any>[] = stack._getUIWidgets();
        stack._interactor = interactor;
        flattedChilds.forEach((val) => val._interactor = interactor);
    }

    private calculateBounds(stack: UIStack, insets: UIEdgeInsets): UISize {

        var origin: UIPoint = {
            x: insets.left,
            y: insets.top
        };

        var estimatedSize = stack._estimatedSize();

        stack._layout(UIAxis.Vertical, origin, estimatedSize);
        stack._build();

        return {
            width: estimatedSize.width + insets.left + insets.right,
            height: estimatedSize.height + insets.top + insets.bottom
        }
    }

    didLoadTabs(tabs: UITab[]) {
        var flattedChilds: UIWidget<any>[] = tabs.map((val) => val._contentView._getUIWidgets()).flatMap();
        flattedChilds.forEach((val) => val._loadWidget());
    }

    didLoad(stack: UIStack) {
        var flattedChilds: UIWidget<any>[] = stack._getUIWidgets();
        flattedChilds.forEach((val) => val._loadWidget());
    }

    refreshTab(tab: UITab, windowSize: UISize) {
        this.refresh(tab._contentView, windowSize, UIEdgeInsetsTabContainer);
    }

    refresh(stack: UIStack, windowSize: UISize, insets: UIEdgeInsets = UIEdgeInsetsContainer) {

        var origin: UIPoint = {
            x: insets.left,
            y: insets.top
        };

        var estimatedSize: UISize = {
            width: windowSize.width - (insets.left + insets.right),
            height: windowSize.height - (insets.top + insets.bottom)
        }

        stack._resetSize();
        stack._layout(UIAxis.Vertical, origin, estimatedSize);
        stack._refreshUI();
    }
}

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
    _colorPalette: UIWindowColorPalette = UIWindowColorPaletteDefault;

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
            this._colorPalette.primary ?? UIColor.Gray,
            this._colorPalette.secondary ?? UIColor.Gray,
            this._colorPalette.tertiary ?? UIColor.Gray
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
            this._colorPalette = {
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

    //Public

    show(): this {

        if (this._isOpened()) {
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
            var constructed = this._uiConstructor.constructTabs(this._tabs, this._selectedTabIndex, this._interactor);
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
        this._selectedTabIndex = val;
        return this;
    }

    colorPalette(val: UIWindowColorPalette): this {
        this._colorPalette = val;
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

class UIWidget<T extends Widget> {

    _origin: UIPoint = UIPointZero;
    _size: UIOptionalSize = UIOptionalSizeDefulat;
    _name: string;
    _tooltip: string | undefined;
    _isDisabled: boolean = false;
    _isVisible: boolean = true;

    _interactor!: UIInteractor;

    _widget!: T | any;

    _minSize: UISize = UISizeZero;
    _initialSize: UIOptionalSize | undefined;

    _offset: UIPoint = UIPointZero;

    constructor() {
        //https://stackoverflow.com/questions/13613524/get-an-objects-class-name-at-runtime
        this._name = this.constructor.name + '-' + uuid();
    }

    //Private

    _getUIWidgets(): UIWidget<any>[] {
        return [this];
    }

    _getWidgets(): Widget[] {
        return [this._widget];
    }

    _estimatedSize(): UISize {
        var minSize = this._minSize;
        return {
            width: this._size.width ?? minSize.width,
            height: this._size.height ?? minSize.height
        }
    }

    _isUndefinedSize(axis: UIAxis): boolean {
        switch (axis) {
            case UIAxis.Vertical: {
                return typeof this._size.height === 'undefined';
            }
            case UIAxis.Horizontal: {
                return typeof this._size.width === 'undefined';
            }
        }
    }

    _layout(axis: UIAxis, origin: UIPoint, estimatedSize: UISize): UIPoint {
        if (typeof this._initialSize === 'undefined') {
            this._initialSize = this._size;
        }

        this._origin = {
            x: origin.x + this._offset.x,
            y: origin.y + this._offset.y
        };
        this._size = {
            width: this._size.width ?? estimatedSize.width,
            height: this._size.height ?? estimatedSize.height
        }
        switch (axis) {
            case UIAxis.Vertical: {
                return {
                    x: origin.x,
                    y: origin.y + this._size.height!
                }
            }
            case UIAxis.Horizontal: {
                return {
                    x: origin.x + this._size.width!,
                    y: origin.y
                }
            }
        }
    }

    _build() {
        throw new Error('Method not implemented.');
    }

    _update(widget: T) {
        widget.x = this._origin.x;
        widget.y = this._origin.y;
        widget.width = this._size.width ?? 0;
        widget.height = (this._size.height ?? 0) - 1;
        widget.tooltip = this._tooltip;
        widget.isDisabled = this._isDisabled;
        widget.isVisible = this._isVisible;
    }

    _buildBaseValues(): {} {
        return {
            x: this._origin.x,
            y: this._origin.y,
            width: this._size.width ?? 0,
            height: this._size.height ?? 0,
            name: this._name,
            tooltip: this._tooltip,
            isDisabled: this._isDisabled,
            isVisible: this._isVisible
        }
    }

    _loadWidget() {
        this._interactor.update(this._name, (widget: T) => {
            this._widget = widget;
        });
    }

    _resetSize() {
        if (typeof this._initialSize !== 'undefined') {
            this._size = this._initialSize;
        }
    }

    _refreshUI() {
        this._update(this._widget);
    }

    //Public

    updateUI(block: ((widget: this) => void) | undefined = undefined) {
        block?.(this);
        this._update(this._widget);
    }

    minSize(val: UISize): this {
        this._minSize = val;
        return this;
    }

    width(val: number): this {
        this._size = {
            width: val,
            height: this._size.height
        }
        this._initialSize = this._size;
        return this;
    }

    height(val: number): this {
        this._size = {
            width: this._size.width,
            height: val
        }
        this._initialSize = this._size;
        return this;
    }

    size(val: UISize): this {
        this._size = val;
        this._initialSize = val;
        return this;
    }

    tooltip(val: string): this {
        this._tooltip = val;
        return this;
    }

    isDisabled(val: boolean): this {
        this._isDisabled = val;
        return this;
    }

    isVisible(val: boolean): this {
        this._isVisible = val;
        return this;
    }

    offset(val: UIPoint): this {
        this._offset = val;
        return this;
    }
}

class UIStack extends UIWidget<GroupBoxWidget> {

    _axis: UIAxis;
    _spacing = 0;
    _childs: UIWidget<any>[];

    _isGrouped: boolean;
    _groupTitle: string | undefined;

    _widget: GroupBoxWidget | any;

    _insets: UIEdgeInsets = UIEdgeInsetsZero;
    _padding: UIEdgeInsets = UIEdgeInsetsZero;

    constructor(axis: UIAxis, widgets: UIWidget<any>[], isGrouped: boolean = false) {
        super();
        this._axis = axis;
        this._childs = widgets;
        this._childs.forEach((val) => {
            if (val instanceof UISpacer) {
                val._confirm(axis);
            }
        })
        this._isGrouped = isGrouped;
        if (isGrouped) {
            this._insets = {
                top: 6,
                left: 2,
                bottom: 2,
                right: 2
            };
        }
    }

    //Convenience

    static $(axis: UIAxis, isGrouped: boolean = false, ...widgets: UIWidget<any>[]): UIStack {
        return new UIStack(axis, widgets, isGrouped);
    }
    static $V(...widgets: UIWidget<any>[]): UIStack {
        return new UIStack(UIAxis.Vertical, widgets, false);
    }
    static $H(...widgets: UIWidget<any>[]): UIStack {
        return new UIStack(UIAxis.Horizontal, widgets, false);
    }
    static $VG(...widgets: UIWidget<any>[]): UIStack {
        return new UIStack(UIAxis.Vertical, widgets, true);
    }
    static $HG(...widgets: UIWidget<any>[]): UIStack {
        return new UIStack(UIAxis.Horizontal, widgets, true);
    }

    //Private

    _getUIWidgets(): UIWidget<any>[] {
        var widgets: UIWidget<any>[] = this._childs.map((val) => val._getUIWidgets()).flatMap();
        if (this._isGrouped) {
            widgets.unshift(this);
        }
        return widgets;
    }

    _getWidgets(): Widget[] {
        var widgets: Widget[] = this._childs.map((val) => val._getWidgets()).flatMap();
        if (this._isGrouped) {
            widgets.unshift(this._widget);
        }
        return widgets;
    }

    _containerSize(): UISize {
        return this._childs.map((val) => val._estimatedSize())
            .reduce((acc, val) => {
                switch (this._axis) {
                    case UIAxis.Vertical: {
                        return {
                            width: Math.max(acc.width, val.width),
                            height: acc.height + val.height + this._spacing
                        }
                    }
                    case UIAxis.Horizontal: {
                        return {
                            width: acc.width + val.width + this._spacing,
                            height: Math.max(acc.height, val.height)
                        }
                    }
                }
            });
    }

    _isUnNamedGroup(): boolean {
        return this._isGrouped && typeof this._groupTitle === 'undefined';
    }

    _estimatedSize(): UISize {
        var size = this._containerSize();
        var unNamedGroupCorrect = this._isUnNamedGroup() ? 4 : 0;
        return {
            width: size.width + this._insets.left + this._insets.right + this._padding.left + this._padding.right,
            height: size.height + this._insets.top + this._insets.bottom + this._padding.top + this._padding.bottom - unNamedGroupCorrect
        }
    }

    _isUndefinedSize(axis: UIAxis): boolean {
        return this._childs.filter((val) => val._isUndefinedSize(axis)).length > 0;
    }

    _layout(axis: UIAxis, origin: UIPoint, estimatedSize: UISize): UIPoint {
        if (typeof this._initialSize === 'undefined') {
            this._initialSize = this._size;
        }

        var thisEstimatedSize = this._estimatedSize();
        thisEstimatedSize = {
            width: Math.max(thisEstimatedSize.width, estimatedSize.width),
            height: Math.max(thisEstimatedSize.height, estimatedSize.height)
        }

        var isUnNamedGroup = this._isUnNamedGroup();
        var unNamedGroupCorrect = isUnNamedGroup ? 4 : 0;
        if (isUnNamedGroup) {
            this._origin = {
                x: origin.x,
                y: origin.y - unNamedGroupCorrect
            };
            this._size = {
                width: thisEstimatedSize.width,
                height: thisEstimatedSize.height + unNamedGroupCorrect
            };
        } else {
            this._origin = origin;
            this._size = thisEstimatedSize;
        }

        var childContainerSize: UISize = {
            width: thisEstimatedSize.width - (this._insets.left + this._insets.right + this._padding.left + this._padding.right),
            height: thisEstimatedSize.height - (this._insets.top + this._insets.bottom + this._padding.top + this._padding.bottom) + unNamedGroupCorrect
        };
        var childOrigin: UIPoint = {
            x: this._origin.x + this._insets.left + this._padding.left + this._offset.x,
            y: this._origin.y + this._insets.top + this._padding.top + this._offset.y
        }
        var point = childOrigin;

        var exactSizeChilds = this._childs.filter((val) => !val._isUndefinedSize(this._axis));
        var undefinedSizeChilds = this._childs.filter((val) => val._isUndefinedSize(this._axis));
        var numberOfUndefinedSizeChilds = undefinedSizeChilds.length;
        var undefinedSizeStacks = undefinedSizeChilds.filter((val) => val instanceof UIStack);

        var sumOfSpacing = this._spacing * (this._childs.length - 1);

        switch (this._axis) {
            case UIAxis.Vertical: {
                var sumOfExactChildHeights: number = exactSizeChilds.map((val) => val._estimatedSize().height).reduce((acc, val) => acc + val);

                var autoHeight: number = 0;
                if (numberOfUndefinedSizeChilds > 0) {
                    autoHeight = Math.floor((childContainerSize.height - sumOfSpacing - sumOfExactChildHeights) / numberOfUndefinedSizeChilds);
                }
                var storedAutoHeight = autoHeight;

                var stackMaxHeights = 0;
                if (undefinedSizeStacks.length > 0) {
                    stackMaxHeights = undefinedSizeStacks.map((val) => Math.max(autoHeight, val._estimatedSize().height)).reduce((acc, val) => acc + val);
                }
                var othersCount = numberOfUndefinedSizeChilds - undefinedSizeStacks.length;
                if (othersCount > 0) {
                    autoHeight = Math.floor((childContainerSize.height - sumOfSpacing - sumOfExactChildHeights - stackMaxHeights) / othersCount);
                }

                for (var child of this._childs) {
                    var isStack = child instanceof UIStack;
                    var isHeightUndefined = child._isUndefinedSize(this._axis);
                    var childEstimatedHeight = child._estimatedSize().height;
                    var childEstimatedSize: UISize = {
                        width: childContainerSize.width,
                        height: isHeightUndefined ? (isStack ? Math.max(childEstimatedHeight, storedAutoHeight) : autoHeight) : childEstimatedHeight
                    };
                    point = child._layout(
                        this._axis,
                        { x: childOrigin.x, y: point.y },
                        childEstimatedSize
                    )
                    point = { x: point.x, y: point.y + this._spacing }
                }

                break;
            }
            case UIAxis.Horizontal: {
                var sumOfExactChildWidths: number = exactSizeChilds.map((val) => val._estimatedSize().width).reduce((acc, val) => acc + val);

                var autoWidth: number = 0;
                if (numberOfUndefinedSizeChilds > 0) {
                    autoWidth = Math.floor((childContainerSize.width - sumOfSpacing - sumOfExactChildWidths) / numberOfUndefinedSizeChilds);
                }
                var storedAutoWidth = autoWidth;

                var stackMaxWidths = 0;
                if (undefinedSizeStacks.length > 0) {
                    stackMaxWidths = undefinedSizeStacks.map((val) => Math.max(autoWidth, val._estimatedSize().width)).reduce((acc, val) => acc + val);
                }
                var othersCount = numberOfUndefinedSizeChilds - undefinedSizeStacks.length;
                if (othersCount > 0) {
                    autoWidth = Math.floor((childContainerSize.width - sumOfSpacing - sumOfExactChildWidths - stackMaxWidths) / othersCount);
                }

                for (var child of this._childs) {
                    var isStack = child instanceof UIStack;
                    var isWidthUndefined = child._isUndefinedSize(this._axis);
                    var childEstimatedWidth = child._estimatedSize().width;
                    var childEstimatedSize: UISize = {
                        width: isWidthUndefined ? (isStack ? Math.max(childEstimatedWidth, storedAutoWidth) : autoWidth) : childEstimatedWidth,
                        height: childContainerSize.height
                    };
                    point = child._layout(
                        this._axis,
                        { x: point.x, y: childOrigin.y },
                        childEstimatedSize
                    )
                    point = { x: point.x + this._spacing, y: point.y }
                }

                break;
            }
        }

        return {
            x: this._origin.x + this._size.width!,
            y: this._origin.y + this._size.height!
        }
    }

    _loadWidget() {
        if (this._isGrouped) {
            super._loadWidget();
        }
        this._childs.forEach((val) => val._loadWidget());
    }

    _build() {
        if (this._isGrouped) {
            this._widget = {
                ...this._buildBaseValues(),
                text: this._groupTitle ?? '',
                type: 'groupbox'
            }
        }
        this._childs.forEach((val) => val._build())
    }

    _update(widget: any) {
        super._update(widget);
        if (this._isGrouped) {
            widget.name = this._groupTitle ?? '';
        }
    }

    _resetSize() {
        super._resetSize();
        this._childs.forEach((val) => val._resetSize());
    }

    _refreshUI() {
        if (this._isGrouped) {
            super._refreshUI();
        }
        this._childs.forEach((val) => val._refreshUI());
    }

    //Public

    spacing(val: number): this {
        this._spacing = val;
        return this;
    }

    padding(val: UIEdgeInsets): this {
        this._padding = val;
        return this;
    }

    title(val: string): this {
        if (this._isGrouped) {
            this._insets = {
                top: 16,
                left: 2,
                bottom: 2,
                right: 2
            };
        }
        this._groupTitle = val;
        return this;
    }
}

class UIButton extends UIWidget<ButtonWidget> {

    _border: boolean = true;
    _image: number | undefined;
    _isPressed: boolean = false;
    _title: string | undefined;
    _onClick: ((button: this) => void) | undefined;

    constructor() {
        super();
    }

    //Convenience

    static $(title: string): UIButton {
        var button = new UIButton();
        return button.title(title)
            .minSize({ width: 50, height: 15 });
    }

    static $I(image: number): UIButton {
        var button = new UIButton();
        return button
            .image(image)
            .size({ width: 24, height: 24 })
            .minSize({ width: 50, height: 15 });
    }

    //Private

    _build() {
        this._widget = {
            ...this._buildBaseValues(),
            type: 'button',
            border: this._border,
            image: this._image,
            isPressed: this._isPressed,
            text: this._title,
            onClick: () => {
                this._onClick?.call(this, this);
            }
        }
    }

    _update(widget: ButtonWidget) {
        super._update(widget);
        widget.border = this._border;
        widget.image = this._image ?? 0;
        widget.isPressed = this._isPressed;
        if (typeof this._title !== 'undefined') {
            widget.text = this._title;
        }
    }

    _isImage(): boolean {
        return typeof this._image !== 'undefined';
    }

    //Public

    border(val: boolean): this {
        if (!this._isImage()) {
            this._border = val;
        }
        return this;
    }

    image(val: number): this {
        this._image = val;
        this._border = false;
        return this;
    }

    isPressed(val: boolean): this {
        this._isPressed = val;
        return this;
    }

    title(val: string): this {
        if (!this._isImage()) {
            this._title = val;
        }
        return this;
    }

    onClick(block: (button: this) => void): this {
        this._onClick = block;
        return this;
    }
}

class UISpacer extends UIWidget<LabelWidget> {

    _spacing: number | undefined;
    _fixVertical: boolean = false;
    _fixHorizontal: boolean = false;

    constructor(spacing: number | undefined = undefined) {
        super();
        this._spacing = spacing;
    }

    //Convenience

    static $(spacing: number | undefined = undefined): UISpacer {
        return new UISpacer(spacing);
    }

    //Private

    _isUndefinedSize(axis: UIAxis): boolean {
        switch (axis) {
            case UIAxis.Vertical: {
                return this._fixVertical === false;
            }
            case UIAxis.Horizontal: {
                return this._fixHorizontal === false;
            }
        }
    }

    _confirm(axis: UIAxis) {
        switch (axis) {
            case UIAxis.Vertical: {
                this._size = { width: undefined, height: this._spacing };
                if (typeof this._spacing !== 'undefined') {
                    this._fixVertical ||= true;
                }
                break;
            }
            case UIAxis.Horizontal: {
                this._size = { width: this._spacing, height: undefined };
                if (typeof this._spacing !== 'undefined') {
                    this._fixHorizontal ||= true;
                }
                break;
            }
        }
    }

    _build() {
        this._widget = {
            ...this._buildBaseValues(),
            type: 'label'
        }
    }

    //Public

    fixAxis(axis: UIAxis, flag: boolean): this {
        switch (axis) {
            case UIAxis.Vertical: {
                this._fixVertical = flag;
                break;
            }
            case UIAxis.Horizontal: {
                this._fixHorizontal = flag;
                break;
            }
        }
        return this;
    }
}

class UILabel extends UIWidget<LabelWidget> {

    _text: string;
    _align: UITextAlignment = UITextAlignment.Left;
    _onChange: ((label: this, index: number) => void) | undefined;

    constructor(text: string) {
        super();
        this._text = text;
    }

    //Convenience

    static $(text: string): UILabel {
        var label = new UILabel(text);
        return label.height(15)
            .minSize({ width: 50, height: 15 });
    }

    //Private

    _build() {
        this._widget = {
            ...this._buildBaseValues(),
            type: 'label',
            text: this._text,
            textAlign: this._align,
            onChange: (index: number) => {
                this._onChange?.call(this, this, index);
            }
        }
    }

    _update(widget: LabelWidget) {
        super._update(widget);
        widget.text = this._text;
        widget.textAlign = this._align;
    }

    //Public

    align(val: UITextAlignment): this {
        this._align = val;
        return this;
    }

    text(val: string): this {
        this._text = val;
        return this;
    }

    onChange(block: (label: this, index: number) => void): this {
        this._onChange = block;
        return this;
    }
}

class UICheckbox extends UIWidget<CheckboxWidget> {

    _text: string;
    _isChecked: boolean = false;
    _onChange: ((checkbox: this, isChecked: boolean) => void) | undefined;

    constructor(text: string | undefined) {
        super();
        this._text = text ?? '';
    }

    //Convenience

    static $(text: string): UICheckbox {
        var checkbox = new UICheckbox(text);
        return checkbox
            .minSize({ width: 50, height: 15 });
    }

    static $UN(): UICheckbox {
        var checkbox = new UICheckbox(undefined);
        return checkbox
            .size({ width: 11, height: 11 })
    }

    //Private

    _build() {
        this._widget = {
            ...this._buildBaseValues(),
            type: 'checkbox',
            text: this._text,
            isChecked: this._isChecked,
            onChange: (isChecked: boolean) => {
                this._isChecked = isChecked;
                this._onChange?.call(this, this, this._isChecked);
            }
        }
    }

    _update(widget: CheckboxWidget) {
        super._update(widget);
        widget.text = this._text;
        widget.isChecked = this._isChecked;
    }

    _isUnnamed(): boolean {
        return typeof this._text === 'undefined';
    }

    //Public

    isChecked(val: boolean): this {
        this._isChecked = val;
        return this;
    }

    text(val: string): this {
        this._text = val;
        return this;
    }

    onChange(block: (checkbox: this, isChecked: boolean) => void): this {
        this._onChange = block;
        return this;
    }
}

class UIColorPicker extends UIWidget<ColourPickerWidget> {

    _color: UIColor;
    _onChange: ((picker: this, color: UIColor) => void) | undefined;

    constructor(color: UIColor | undefined) {
        super();
        this._color = color ?? UIColor.Black;
    }

    //Convenience

    static $(color: UIColor | undefined = undefined): UIColorPicker {
        var colorPicker = new UIColorPicker(color);
        return colorPicker
            .size({ width: 12, height: 12 });
    }

    //Private

    _build() {
        this._widget = {
            ...this._buildBaseValues(),
            type: 'colourpicker',
            colour: this._color,
            onChange: (color: number) => {
                this._color = color;
                this._onChange?.call(this, this, this._color);
            }
        }
    }

    _update(widget: ColourPickerWidget) {
        super._update(widget);
        widget.colour = this._color;
    }

    //Public

    color(val: UIColor): this {
        this._color = val;
        return this;
    }

    onChange(block: (picker: this, color: UIColor) => void): this {
        this._onChange = block;
        return this;
    }
}

class UIDropdown extends UIWidget<DropdownWidget> {

    _items: string[];
    _selectedIndex: number = 0;
    _onChange: ((dropdown: this, index: number, item: string) => void) | undefined;

    constructor(items: string[]) {
        super();
        this._items = items;
    }

    //Convenience

    static $(items: string[]): UIDropdown {
        var dropdown = new UIDropdown(items);
        return dropdown.height(15)
            .minSize({ width: 50, height: 15 });
    }

    //Private

    _build() {
        this._widget = {
            ...this._buildBaseValues(),
            type: 'dropdown',
            textAlign: UITextAlignment.Center,
            items: this._items,
            selectedIndex: this._selectedIndex,
            onChange: (index: number) => {
                this._selectedIndex = index;
                var item = this._items[index];
                this._onChange?.call(this, this, this._selectedIndex, item);
            }
        }
    }

    _update(widget: DropdownWidget) {
        super._update(widget);
        widget.items = this._items;
        widget.selectedIndex = this._selectedIndex;
    }

    //Public

    selected(val: number): this {
        this._selectedIndex = val;
        return this;
    }

    onChange(block: (dropdown: this, index: number, item: string) => void): this {
        this._onChange = block;
        return this;
    }
}

class UISpinner extends UIWidget<SpinnerWidget> {

    _text: string | undefined;
    _onChange: ((spinner: this, val: number) => void) | undefined;
    _onClick: ((spinner: this) => void) | undefined;

    _min: number = 0;
    _max: number = 1;
    _value: number = 0.5;
    _step: number = 0.1;
    _fixed: number = 1;

    _formatter: ((val: number) => string) | undefined;

    constructor() {
        super();
    }

    //Convenience

    static $(): UISpinner {
        var spinner = new UISpinner();
        return spinner.height(15)
            .minSize({ width: 50, height: 15 });
    }

    //Private

    _build() {
        var usingFormatter = typeof this._formatter !== 'undefined';
        if (usingFormatter) {
            this._text = this._formatter!(this._value);
        } else {
            this._text = this._value.toFixed(this._fixed);
        }
        this._widget = {
            ...this._buildBaseValues(),
            type: 'spinner',
            text: this._text,
            onDecrement: () => {
                var prev = this._value;
                this._value = Math.max(this._value - this._step, this._min);
                this._signal(prev, this._value);
            },
            onIncrement: () => {
                var prev = this._value;
                this._value = Math.min(this._value + this._step, this._max);
                this._signal(prev, this._value);
            },
            onClick: () => {
                this._onClick?.call(this, this);
            }
        }
    }

    _signal(prev: number, current: number) {
        //https://stackoverflow.com/questions/7223359/are-0-and-0-the-same
        var fixedCurrent = current.toFixed(this._fixed)
        var zero = +0.0;
        var fixedZero = zero.toFixed(this._fixed);
        var negativeFixedZero = '-' + fixedZero;
        var isNegativeZero = fixedCurrent === negativeFixedZero;
        var usingFormatter = typeof this._formatter !== 'undefined';
        var valueChanged = prev.toFixed(this._fixed) != fixedCurrent;
        if (valueChanged) {
            if (usingFormatter) {
                if (isNegativeZero) {
                    this._text = this._formatter!(zero);
                } else {
                    this._text = this._formatter!(current);
                }
            } else {
                if (isNegativeZero) {
                    this._text = fixedZero;
                } else {
                    this._text = fixedCurrent;
                }
            }
            this.updateUI();
            this._onChange?.call(this, this, current);
        }
    }

    _update(widget: SpinnerWidget) {
        super._update(widget);
        widget.text = this._text;
    }

    //Public

    range(min: number, max: number): this {
        if (min > max) {
            console.log("min' cannot be greater than 'max'.");
        } else {
            this._min = min;
            this._max = max;
        }
        return this;
    }

    step(step: number, fixed: number | undefined): this {
        this._step = step;

        if (typeof fixed === 'undefined') {
            for (var i = 0; i < Infinity; i++) {
                let mul = Math.pow(10, i);
                if ((step * mul) % 1 == 0) {
                    this._fixed = i;
                    break;
                }
            }
        } else {
            this._fixed = fixed;
        }

        return this;
    }

    value(val: number): this {
        this._value = Math.max(this._min, Math.min(this._max, val))
        return this;
    }

    formatter(black: (val: number) => string): this {
        this._formatter = black;
        return this;
    }

    onChange(block: (spinner: this, val: number) => void): this {
        this._onChange = block;
        return this;
    }

    onClick(block: (spinner: this) => void): this {
        this._onClick = block;
        return this;
    }
}

class UITextBox extends UIWidget<TextBoxWidget> {

    _text: string;
    _maxLength: number = Number.MAX_VALUE;
    _onChange: ((textBox: this, text: string) => void) | undefined;

    constructor(text: string | undefined = undefined) {
        super();
        this._text = text ?? '';
    }

    //Convenience

    static $(text: string | undefined = undefined): UITextBox {
        var textBox = new UITextBox(text);
        return textBox.height(15)
            .minSize({ width: 50, height: 15 });
    }

    //Private

    _build() {
        this._widget = {
            ...this._buildBaseValues(),
            type: 'textbox',
            text: this._text,
            maxLength: this._maxLength,
            onChange: (text: string) => {
                this._text = text;
                this._onChange?.call(this, this, text);
            }
        }
    }

    _update(widget: TextBoxWidget) {
        super._update(widget);
        widget.text = this._text;
        widget.maxLength = this._maxLength;
    }

    //Public

    text(val: string): this {
        this._text = val;
        return this;
    }

    maxLength(val: number): this {
        this._maxLength = val;
        return this;
    }

    onChange(block: (textBox: this, text: string) => void): this {
        this._onChange = block;
        return this;
    }
}

class UIViewport extends UIWidget<ViewportWidget> {

    _viewport!: Viewport;
    _zoom: UIViewportScale = UIViewportScale.One;
    _visibilityFlags: UIViewportFlag = UIViewportFlag.None;

    _position: CoordsXY | CoordsXYZ = ui.mainViewport.getCentrePosition();

    constructor() {
        super();
    }

    //Convenience

    static $(): UIViewport {
        var viewport = new UIViewport();
        return viewport
            .minSize({ width: 165, height: 120 });
    }

    //Private

    _build() {
        this._viewport = <Viewport>{
            left: this._origin.x,
            top: this._origin.y,
            right: this._origin.x + (this._size.width ?? 0),
            bottom: this._origin.y + (this._size.height ?? 0),
            rotation: ui.mainViewport.rotation,
            zoom: ui.mainViewport.zoom,
            visibilityFlags: this._visibilityFlags
        }
        this._widget = {
            ...this._buildBaseValues(),
            type: 'viewport',
            viewport: this._viewport
        }
    }

    _update(widget: ViewportWidget) {
        super._update(widget);

        this._viewport.left = this._origin.x;
        this._viewport.top = this._origin.y;
        this._viewport.right = this._origin.x + (this._size.width ?? 0);
        this._viewport.bottom = this._origin.y + (this._size.height ?? 0);
        this._viewport.zoom = this._zoom;
        this._viewport.visibilityFlags = this._visibilityFlags;
        this.moveTo(this._position);
    }

    _loadWidget() {
        super._loadWidget();

        this._viewport = this._widget.viewport!;

        this._zoom = ui.mainViewport.zoom;
        this._viewport.zoom = this._zoom;

        this._viewport.visibilityFlags = this._visibilityFlags;

        this._position = ui.mainViewport.getCentrePosition();
        this.moveTo(this._position);
    }

    //Public

    position(val: CoordsXY | CoordsXYZ): this {
        this._position = val;
        return this;
    }

    zoom(val: UIViewportScale): this {
        this._zoom = val;
        return this;
    }

    flags(val: UIViewportFlag): this {
        this._visibilityFlags = val;
        return this;
    }

    getCenterPosition(): CoordsXY | undefined {
        return this._viewport.getCentrePosition();
    }

    moveTo(val: CoordsXY | CoordsXYZ) {
        this._position = val;
        this._viewport.moveTo(val);
    }

    scrollTo(val: CoordsXY | CoordsXYZ) {
        this._position = val;
        this._viewport.scrollTo(val);
    }

    scrollToMainViewportCenter() {
        this.scrollTo(ui.mainViewport.getCentrePosition());
    }

    mainViewportScrollToThis() {
        if (typeof this._viewport !== 'undefined') {
            ui.mainViewport.scrollTo(this.getCenterPosition()!);
        }
    }
}

class UIListViewColumn {

    _canSort: boolean = false;
    _sortOrder: UISortOrder = UISortOrder.None;

    _header: string;
    _headerTooltip: string | undefined;

    _width: number | undefined;
    _weight: number | undefined;
    _minWidth: number | undefined;
    _maxWidth: number | undefined;

    constructor(header: string) {
        this._header = header;
    }

    //Convenience

    static $(header: string): UIListViewColumn {
        return new UIListViewColumn(header);
    }

    static $F(header: string, width: number): UIListViewColumn {
        var listView = new UIListViewColumn(header);
        return listView.width(width);
    }

    static $R(header: string, widthRange: UIOptionalRange): UIListViewColumn {
        var listView = new UIListViewColumn(header);
        if (typeof widthRange.min !== 'undefined') {
            listView = listView.minWidth(widthRange.min);
        }
        if (typeof widthRange.max !== 'undefined') {
            listView = listView.maxWidth(widthRange.max);
        }
        return listView;
    }

    static $W(header: string, weight: number): UIListViewColumn {
        var listView = new UIListViewColumn(header);
        return listView.weight(weight);
    }

    //Private

    _data(): ListViewColumn {
        return {
            canSort: this._canSort,
            sortOrder: this._sortOrder,
            header: this._header,
            headerTooltip: this._headerTooltip,
            width: this._width,
            ratioWidth: this._weight,
            minWidth: this._minWidth,
            maxWidth: this._maxWidth
        }
    }

    //Public

    sortOrder(val: UISortOrder): this {
        this._sortOrder = val;
        return this;
    }

    canSort(val: boolean): this {
        this._canSort = val;
        return this;
    }

    tooltip(val: string): this {
        this._headerTooltip = val;
        return this;
    }

    width(val: number): this {
        this._width = val;
        return this;
    }

    weight(val: number): this {
        this._weight = val;
        return this;
    }

    minWidth(val: number): this {
        this._minWidth = val;
        return this;
    }

    maxWidth(val: number): this {
        this._maxWidth = val;
        return this;
    }
}

class UIListViewItem {

    _isSeparator: boolean = false;
    _textList: string[];

    constructor(textList: string[] = [], isSeparator: boolean) {
        this._textList = textList
    }

    //Convenience

    static $(textList: string[]): UIListViewItem {
        return new UIListViewItem(textList, false);
    }
    static $S(text: string | undefined = undefined): UIListViewItem {
        var val = typeof text === undefined ? [] : [text!];
        return new UIListViewItem(val, true);
    }

    //Private

    _data(): ListViewItem {
        if (this._isSeparator) {
            var text = this._textList.length > 0 ? this._textList[0] : undefined;
            return {
                type: 'seperator',
                text: text
            }
        } else {
            return this._textList;
        }
    }
}

class UIListView extends UIWidget<ListView> {

    _scrollbarType: UIScrollbarType = UIScrollbarType.None;
    _isStriped: boolean = false;

    _showColumnHeaders: boolean = false;
    _columns: UIListViewColumn[] | undefined;
    _items: UIListViewItem[] = [];

    _selectedCell: RowColumn | undefined;
    _canSelect: boolean = false;

    _onHeighlight: ((listView: this, column: number, item: number) => void) | undefined;
    _onClick: ((listView: this, column: number, item: number) => void) | undefined;

    constructor(columns: UIListViewColumn[] | undefined = undefined) {
        super();
        this._columns = columns;
    }

    //Convenience

    static $(columns: UIListViewColumn[] | undefined = undefined): UIListView {
        var listView = new UIListView(columns);
        return listView
            .minSize({ width: 165, height: 120 });
    }

    //Private

    _build() {
        this._widget = {
            ...this._buildBaseValues(),
            type: 'listview',
            scrollbars: this._scrollbarType,
            isStriped: this._isStriped,
            showColumnHeaders: this._showColumnHeaders,
            columns: this._columns?.map((val) => val._data()),
            items: this._items.map((val) => val._data()),
            selectedCell: this._selectedCell,
            canSelect: this._canSelect,
            onHighlight: (item: number, column: number) => {
                this._onHeighlight?.call(this, this, column, item);
            },
            onClick: (item: number, column: number) => {
                this._onClick?.call(this, this, column, item);
            }
        }
    }

    _update(widget: ListView) {
        super._update(widget);
        widget.scrollbars = this._scrollbarType;
        widget.isStriped = this._isStriped;
        widget.showColumnHeaders = this._showColumnHeaders;
        widget.columns = this._columns?.map((val) => val._data());
        widget.items = this._items.map((val) => val._data());
        widget.selectedCell = this._selectedCell;
        widget.canSelect = this._canSelect;
    }

    //Public

    scrollbarType(val: UIScrollbarType): this {
        this._scrollbarType = val;
        return this;
    }

    isStriped(val: boolean): this {
        this._isStriped = val;
        return this;
    }

    showColumnHeaders(val: boolean): this {
        this._showColumnHeaders = val;
        return this;
    }

    addColumn(val: UIListViewColumn): this {
        this._columns?.push(val);
        return this;
    }

    addColumns(val: UIListViewColumn[]): this {
        this._columns = this._columns?.concat(val);
        return this;
    }

    addItem(val: UIListViewItem): this {
        this._items.push(val);
        return this;
    }

    addItems(val: UIListViewItem[]): this {
        this._items = this._items.concat(val);
        return this;
    }

    selectCell(row: number, column: number): this {
        this._selectedCell = { row: row, column: column };
        return this;
    }

    canSelect(val: boolean): this {
        this._canSelect = val;
        return this;
    }

    getColumnData(val: number): UIListViewColumn | undefined {
        return this._columns?.[val];
    }

    getItemData(val: number): UIListViewItem | undefined {
        return this._items?.[val];
    }

    getHighlightedCell(): RowColumn | undefined {
        var widget: ListView = this._widget;
        return widget.highlightedCell;
    }

    onHeighlight(block: (listView: this, column: number, item: number) => void): this {
        this._onHeighlight = block;
        return this;
    }

    onClick(block: (listView: this, column: number, item: number) => void): this {
        this._onClick = block;
        return this;
    }
}

class UITab {

    _minSize: UISize = UISizeZero;
    _maxSize: UISize = { width: ui.width, height: ui.height };

    _spacing = 0;
    _padding: UIEdgeInsets = UIEdgeInsetsZero;
    _isExpandable: boolean = false;

    _image: UIImage;
    _contentView: UIStack;

    constructor(contentView: UIStack, image: UIImage | undefined = undefined) {
        this._image = image ?? UIImageNone;
        this._contentView = contentView;
    }

    //Convenience

    static $(...widgets: UIWidget<any>[]): UITab {
        var stack = new UIStack(UIAxis.Vertical, widgets);
        var tab = new UITab(stack);
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

        this._contentView._isUndefinedSize(UIAxis.Vertical);
        this._contentView._layout(UIAxis.Vertical, UIPointZero, estimatedSize);
        this._contentView._build();
    }

    //Public

    spacing(val: number): this {
        this._spacing = val;
        return this;
    }

    padding(val: UIEdgeInsets): this {
        this._padding = val;
        return this;
    }

    isExpandable(val: boolean): this {
        this._isExpandable = val;
        return this;
    }

    maxSize(val: UISize): this {
        this._maxSize = val;
        return this;
    }

    image(val: UIImage): this {
        this._image = val;
        return this;
    }
}

var openWindow = function () {

    // UIWindow.$('솜사탕 가게 1',
    //     UIStack.$H(
    //         UIStack.$V(
    //             UIStack.$H(
    //                 UISpacer.$(33),
    //                 UIDropdown.$(
    //                     ['전경']
    //                 ),
    //                 UISpacer.$(33)
    //             ),
    //             UIViewport.$(),
    //             UILabel.$('열림')
    //                 .align(UITextAlignment.Center)
    //         ),
    //         UIStack.$V(
    //             UIButton.$I(29360).width(24),
    //             UIButton.$I(29362).width(24),
    //             UIButton.$I(29364).width(24),
    //             UIButton.$I(29366).width(24)
    //         )
    //     )
    // ).isExpandable(true)
    //     .colorPalette({
    //         primary: UIColor.Gray,
    //         secondary: UIColor.BordeauxRed
    //     })
    //     .show();

    var customFrameImage = UIImage.$F([5153, 5154, 5155, 5154]).duration(5);

    UIWindow.$T('직원',
        UITab.$(
            UIStack.$H(
                UIStack.$V(
                    UISpacer.$(10),
                    UIStack.$H(
                        UILabel.$('유니폼 색상:')
                            .width(100),
                        UIColorPicker.$(UIColor.BrightRed)
                    )
                ),
                UISpacer.$(20)
                    .fixAxis(UIAxis.Vertical, true),
                UIButton.$I(5179)
                    .onClick((val) => {
                        val.updateUI((widget) => {
                            if (widget._image == 5179) {
                                widget.image(5180);
                            } else {
                                widget.image(5179);
                            }
                        })
                    }),
                UIButton.$I(5180)
                    .onClick((val) => {
                        val.updateUI((widget) => {
                            widget.isPressed(!widget._isPressed);
                        })
                    }),
                UIButton.$I(5181)
            ).offset({x: 0, y: -26}),
            UIListView.$([
                UIListViewColumn.$W('이름', 2)
                    .tooltip('tooltip')
                    .sortOrder(UISortOrder.Ascending)
                    .canSort(true),
                UIListViewColumn.$('역할'),
                UIListViewColumn.$('상태')
            ]).showColumnHeaders(true)
                .scrollbarType(UIScrollbarType.both)
                .isStriped(true)
                .canSelect(true)
                .addItems([
                    UIListViewItem.$(['미화원 1', '쓸기, 가꾸기, 비우기', '걷는 중']),
                    UIListViewItem.$S()
                ]),
            UILabel.$('1 미화원')
        ).image(UIImageTabGears)
            .isExpandable(true)
            .maxSize({ width: 500, height: 500 }),
        UITab.$(
            UILabel.$('두번째 탭')
        ).image(UIImageTabFinancesResearch),
        UITab.$(
            UILabel.$('세번째 탭')
        ).image(UIImageTabKiosksAndFacilities)
            .isExpandable(true),
        UITab.$(
            UILabel.$('네번째 탭')
        ).image(UIImageTabFinancesSummary)
            .isExpandable(true)
            .maxSize({ width: 300, height: 100 }),
        UITab.$(
            UILabel.$('다섯번째 탭')
        ).image(UIImageTabStats),
        UITab.$(
            UILabel.$('다섯번째 탭')
        ).image(UIImageTabStats),
        UITab.$(
            UILabel.$('다섯번째 탭')
        ).image(UIImageTabStats),
        UITab.$(
            UILabel.$('다섯번째 탭')
        ).image(UIImageTabStats),
        UITab.$(
            UILabel.$('다섯번째 탭')
        ).image(UIImageTabStats),
        UITab.$(
            UILabel.$('여섯번째 탭')
        ).image(UIImageTabRide),
        UITab.$(
            UILabel.$('일곱번째 탭')
        ).image(UIImageTabPark)
    )
        // .isExpandable(true)
        .colorPalette({
            primary: UIColor.Gray,
            secondary: UIColor.DarkOliveGreen,
            tertiary: UIColor.LightOrange
        })
        .show();


    // var containerPadding: UIEdgeInsets = { top: 2, left: 2, bottom: 2, right: 2 };

    // var viewport = UIViewport.$()
    //     .size({ width: 200, height: 200 })
    //     .zoom(UIViewportScale.Quater)
    //     .flags(UIViewportFlag.InvisibleSupports);

    // let window = UIWindow.$(
    //     'Window title',
    //     UIButton.$('1')
    //         .tooltip('Tooltip')
    //         .onClick((val) => {
    //             val.updateUI((val) => {
    //                 val.title('1111111111111')
    //             })
    //         }),
    //     UIStack.$H(
    //         UIStack.$VG(
    //             UIStack.$HG(
    //                 UIColorPicker.$()
    //                     .onChange((picker, color) => {
    //                         console.log(color);
    //                     }),
    //                 UIColorPicker.$()
    //                     .isDisabled(true)
    //                     .color(UIColor.BrightRed),
    //                 UIColorPicker.$()
    //                     .color(Math.floor(Math.random() * 32)),
    //                 UIColorPicker.$()
    //                     .isDisabled(true)
    //                     .color(Math.floor(Math.random() * 32)),
    //                 UIColorPicker.$()
    //                     .color(Math.floor(Math.random() * 32)),
    //                 UIColorPicker.$()
    //                     .color(Math.floor(Math.random() * 32)),
    //                 UIColorPicker.$()
    //                     .color(Math.floor(Math.random() * 32)),
    //                 UIColorPicker.$()
    //                     .color(Math.floor(Math.random() * 32)),
    //                 UIColorPicker.$()
    //                     .color(Math.floor(Math.random() * 32)),
    //                 UIColorPicker.$()
    //                     .color(Math.floor(Math.random() * 32)),
    //             ).title('ColorSet')
    //                 .isDisabled(true)
    //                 .padding(containerPadding),
    //             UIStack.$VG(
    //                 UIButton.$('2')
    //                     .isDisabled(true),
    //                 UIButton.$('2'),
    //                 UIButton.$('2'),
    //                 UIButton.$('2')
    //             ).padding(containerPadding),
    //             UIButton.$('2'),
    //             UIStack.$H(
    //                 UIButton.$('3'),
    //                 UISpacer.$(10),
    //                 UIButton.$('4'),
    //                 UICheckbox.$UN()
    //                     .onChange((checkbox, isChecked) => {
    //                         console.log(isChecked);

    //                         window.updateUI((val) => {
    //                             if (isChecked) {
    //                                 val.isExpandable(true);
    //                             } else {
    //                                 val.isExpandable(false);
    //                             }
    //                         })
    //                     })
    //             ).spacing(4),
    //             UIButton.$('A')
    //         ).title('GroupBox')
    //             .spacing(4)
    //             .padding(containerPadding),
    //         UISpacer.$(10),
    //         UIStack.$HG(
    //             UIButton.$('5')
    //                 .onClick((val) => {
    //                     val.updateUI((val) => {
    //                         val.title('555555555555555')
    //                     })
    //                 }),
    //             UIStack.$VG(
    //                 UIDropdown.$([
    //                     'first',
    //                     'second',
    //                     'third',
    //                     'fourth'
    //                 ]).onChange((dropdown, index, item) => {
    //                     console.log(index, item);
    //                 }).isVisible(true),
    //                 UISpinner.$()
    //                     .range(-1, 1)
    //                     .step(0.1, 2)
    //                     .value(-0.1)
    //                     .formatter((val): string => {
    //                         return val.toFixed(2) + '%'
    //                     })
    //                     .onChange((spinner, val) => {
    //                         console.log(val);
    //                     }),
    //                 UIButton.$('6')
    //                     .height(15),
    //                 UIButton.$I(29364)
    //                     .onClick((button) => {
    //                         viewport.mainViewportScrollToThis();
    //                         window.updateUI((val) => {
    //                             val.title('Moving........')
    //                         })
    //                         button.updateUI((val) => {
    //                             val.image(val._image! + 1);
    //                         })
    //                     }),
    //                 UIButton.$('8')
    //                     .height(20)
    //             ).spacing(4)
    //                 .padding(containerPadding),
    //             UIButton.$('change color')
    //                 .onClick((button) => {
    //                     window.updateUI((val) => {
    //                         val.colorPalette({
    //                             primary: UIColor.DarkGreen | UIColorFlag.Translucent,
    //                             secondary: UIColor.SalmonPink | UIColorFlag.Outline,
    //                             tertiary: UIColor.SaturatedRed | UIColorFlag.Inset
    //                         })
    //                     })
    //                 })
    //         ).spacing(4)
    //             .padding(containerPadding),
    //         viewport
    //     ).spacing(4),
    //     UIStack.$H(
    //         UISpacer.$(),
    //         UIButton.$('dddd')
    //             .height(50).width(100)
    //     ),
    //     UIStack.$H(
    //         UIButton.$('10')
    //             .width(100),
    //         UIButton.$('Clear!')
    //             .width(350).height(100)
    //             .onClick((button) => {
    //                 viewport.moveTo({ x: Math.random() * ui.width, y: Math.random() * ui.height });
    //                 viewport.updateUI((widget) => {
    //                     widget
    //                         .size({ width: Math.random() * 200, height: Math.random() * 200 })
    //                 })
    //             }),
    //         UITextBox.$()
    //             .maxLength(20)
    //     ).spacing(4),
    //     UILabel.$('Label----------------------!')
    //         .align(UITextAlignment.Center)
    // )

    // window
    //     .spacing(4)
    //     .padding(containerPadding)
    //     .show();
};

var main = function () {

    // If we do not use the var keyword then the variable acts as a global shared between all plugins and
    // the console. The following code allows the console and other plugins to use our functions.
    if (typeof ui === 'undefined') {
        console.log('Plugin not available on headless mode.');
        return;
    }

    // Add a menu item under the map icon on the top toolbar
    ui.registerMenuItem('StackUI Demo', function () {
        openWindow();
    });
}

registerPlugin(
    {
        name: 'StackUI',
        version: '0.0.1',
        authors: ['nExmond'],
        type: 'local',
        licence: 'MIT',
        main: main
    }
)