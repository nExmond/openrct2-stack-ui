/// <reference path="../../UICore/UIEdgeInsets.ts" />
/// <reference path="../../UIContainer/UITab.ts" />
/// <reference path="../../UIWidgets/UIStack.ts" />
/// <reference path="../UIInteractor.ts" />
/// <reference path="UIConstructResult.ts" />

/**
 * Place the window child widget.
 */
class UIConstructor {

    /**
     * Constructs tabs
     * @param tabs 
     * @param selectedIndex After configuring the tab, specify the first tab to be used.
     * @param interactor 
     * @param spacing 
     * @param padding 
     * @returns construction result
     */
    constructTabs(tabs: UITab[], selectedIndex: number, interactor: UIInteractor, spacing: number, padding: UIEdgeInsets, minSize: UISize, maxSize: UISize, usingBuild: boolean = true): UIConstructResult {
        if (selectedIndex >= tabs.length || selectedIndex < 0) {
            throw new Error("SelectedIndex is less than the count of tabs and must be at least 0.");
        }
        const tabButtonMinWidth = 31 * tabs.length + 6
        for (var i = 0; i < tabs.length; i++) {
            const tab = tabs[i];
            const stack = tab._getContentView()
                .spacing(tab.getSpacing() ?? spacing)
                .padding(tab.getPadding() ?? padding);

            tab._setInteractor(interactor);
            const results = this.construct(stack, interactor, UIEdgeInsetsTabContainer, minSize, usingBuild);
            const tabMinWidth = tab.getMinSize()?.width ?? 0;
            const tabMinHeight = tab.getMinSize()?.height ?? 0;
            const tabMinSize = tab._setMinSize({
                width: Math.max(results.size.width, minSize.width, tabMinWidth, tabButtonMinWidth),
                height: Math.max(results.size.height, minSize.height, tabMinHeight)
            })

            const tempTabMaxSize = tab.getMaxSize();
            const tabMaxSize = {
                width: tempTabMaxSize?.width ?? maxSize.width,
                height: tempTabMaxSize?.height ?? maxSize.height
            }

            if (tabMaxSize.width < tabMinSize.width || tabMaxSize.height < tabMinSize.height) {
                console.log(`
WARNING: UITab[${i}] maximum size is less than its minimum size!
minSize: { width: ${tabMinSize.width}, height: ${tabMinSize.height} }
maxSize: { width: ${tabMaxSize.width}, height: ${tabMaxSize.height} }
Errors can occur when resizing windows.
`);
            }
        }
        const selectedTab = tabs[selectedIndex];
        const tempMinSize = selectedTab.getMinSize();
        const selectedTabMinSize = {
            width: tempMinSize?.width ?? minSize.width,
            height: tempMinSize?.height ?? minSize.height
        }
        this.refreshTab(selectedTab, selectedTabMinSize);
        return {
            size: selectedTabMinSize,
            widgets: [],
            tabs: tabs.map(val => val._data())
        }
    }

    /**
     * Constructs single container
     * @param stack 
     * @param interactor 
     * @param insets 
     * @returns construction result
     */
    construct(stack: UIStack, interactor: UIInteractor, insets: UIEdgeInsets = UIEdgeInsetsContainer, minSize: UISize, usingBuild: boolean = true): UIConstructResult {
        this._injectInteractor(stack, interactor);
        const size = this.calculateBounds(stack, insets, usingBuild)
        return {
            size: {
                width: Math.max(size.width, minSize.width),
                height: Math.max(size.height, minSize.height)
            },
            widgets: stack._getWidgets()
        };
    }

    _injectInteractor(stack: UIStack, interactor: UIInteractor) {

        const flattedChilds: UIWidget<any>[] = stack._getUIWidgets();
        stack._setInteractor(interactor);
        flattedChilds.forEach(val => val._setInteractor(interactor));
    }

    protected calculateBounds(stack: UIStack, insets: UIEdgeInsets, usingBuild: boolean = true): UISize {

        const origin: UIPoint = {
            x: insets.left,
            y: insets.top
        };

        const estimatedSize = stack._estimatedSize();

        stack._layout(UIAxis.Vertical, origin, estimatedSize);
        if (usingBuild) {
            stack._build();
        }

        return {
            width: estimatedSize.width + insets.left + insets.right,
            height: estimatedSize.height + insets.top + insets.bottom
        }
    }

    /**
     * Notifies all widgets that tab configuration is complete.
     * @param tabs 
     */
    didLoadTabs(tabs: UITab[]) {
        const flattedChilds: UIWidget<any>[] = tabs.map(val => val._getContentView()._getUIWidgets()).flatMap();
        flattedChilds.forEach(val => val._loadWidget());
        tabs.forEach(val => val._getDidLoad()?.call(val, val));
    }

    /**
     * Notifies all widgets that single container configuration is complete.
     * @param stack 
     */
    didLoad(stack: UIStack) {
        const flattedChilds: UIWidget<any>[] = stack._getUIWidgets();
        flattedChilds.forEach(val => val._loadWidget());
    }

    /**
     * Updates the tab to the given size.
     * @param tab 
     * @param windowSize 
     */
    refreshTab(tab: UITab, windowSize: UISize) {
        this.refresh(tab._getContentView(), windowSize, UIEdgeInsetsTabContainer);
    }

    /**
     * Update single container to the given size.
     * @param stack 
     * @param windowSize 
     * @param insets
     */
    refresh(stack: UIStack, windowSize: UISize, insets: UIEdgeInsets = UIEdgeInsetsContainer) {

        const origin: UIPoint = {
            x: insets.left,
            y: insets.top
        };

        const estimatedSize: UISize = {
            width: windowSize.width - (insets.left + insets.right),
            height: windowSize.height - (insets.top + insets.bottom)
        }

        stack._resetSize();
        stack._layout(UIAxis.Vertical, origin, estimatedSize);
        stack._refreshUI();
    }
}
