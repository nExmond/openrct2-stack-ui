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
    constructTabs(tabs: UITab[], selectedIndex: number, interactor: UIInteractor, spacing: number, padding: UIEdgeInsets): UIConstructResult {
        if (selectedIndex >= tabs.length || selectedIndex < 0) {
            throw new Error("SelectedIndex is less than the count of tabs and must be at least 0.");
        }
        const minWidth = 31 * tabs.length + 6
        for (var i = 0; i < tabs.length; i++) {
            const tab = tabs[i];
            const stack = tab._contentView
                .spacing(tab._spacing ?? spacing)
                .padding(tab._padding ?? padding);

                const results = this.construct(stack, interactor, UIEdgeInsetsTabContainer);
            tab._minSize = {
                width: Math.max(minWidth, results.size.width),
                height: results.size.height
            }

            if (tab._maxSize.width < tab._minSize.width || tab._maxSize.height < tab._minSize.height) {
                console.log(`
WARNING: UITab[${i}] maximum size is less than its minimum size!
minSize: { width: ${tab._minSize.width}, height: ${tab._minSize.height} }
maxSize: { width: ${tab._maxSize.width}, height: ${tab._maxSize.height} }
Errors can occur when resizing windows.
`);
            }
        }
        const selectedTab = tabs[selectedIndex];
        this.refreshTab(selectedTab, selectedTab._minSize);
        return {
            size: selectedTab._minSize,
            widgets: [],
            tabs: tabs.map((val) => val._data())
        }
    }

    /**
     * Constructs single container
     * @param stack 
     * @param interactor 
     * @param insets 
     * @returns construction result
     */
    construct(stack: UIStack, interactor: UIInteractor, insets: UIEdgeInsets = UIEdgeInsetsContainer): UIConstructResult {
        this._injectInteractor(stack, interactor);
        return {
            size: this.calculateBounds(stack, insets),
            widgets: stack._getWidgets()
        };
    }

    _injectInteractor(stack: UIStack, interactor: UIInteractor) {

        const flattedChilds: UIWidget<any>[] = stack._getUIWidgets();
        stack._interactor = interactor;
        flattedChilds.forEach((val) => val._interactor = interactor);
    }

    protected calculateBounds(stack: UIStack, insets: UIEdgeInsets): UISize {

        const origin: UIPoint = {
            x: insets.left,
            y: insets.top
        };

        const estimatedSize = stack._estimatedSize();

        stack._layout(UIAxis.Vertical, origin, estimatedSize);
        stack._build();

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
        const flattedChilds: UIWidget<any>[] = tabs.map((val) => val._contentView._getUIWidgets()).flatMap();
        flattedChilds.forEach((val) => val._loadWidget());
    }

    /**
     * Notifies all widgets that single container configuration is complete.
     * @param stack 
     */
    didLoad(stack: UIStack) {
        const flattedChilds: UIWidget<any>[] = stack._getUIWidgets();
        flattedChilds.forEach((val) => val._loadWidget());
    }

    /**
     * Updates the tab to the given size.
     * @param tab 
     * @param windowSize 
     */
    refreshTab(tab: UITab, windowSize: UISize) {
        this.refresh(tab._contentView, windowSize, UIEdgeInsetsTabContainer);
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
