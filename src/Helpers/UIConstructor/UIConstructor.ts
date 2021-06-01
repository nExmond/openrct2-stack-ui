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
     * @param spacing 
     * @param padding 
     * @returns construction result
     */
    constructTabs(
        tabs: UITab[],
        selectedIndex: number,
        spacing: number,
        padding: UIEdgeInsets,
        minSize: UISize,
        maxSize: UISize,
        usingBuild: boolean = true,
        onlySeleted: Boolean = false
    ): UIConstructResult {
        if (selectedIndex >= tabs.length || selectedIndex < 0) {
            throw new Error("SelectedIndex is less than the count of tabs and must be at least 0.");
        }
        const tabButtonMinWidth = 31 * tabs.length + 6;
        for (var i = (onlySeleted ? selectedIndex: 0); onlySeleted ? (i == selectedIndex): (i < tabs.length); i++) {
            const tab = tabs[i];
            const stack = tab._getContentView()
                .spacing(tab.getSpacing() ?? spacing)
                .padding(tab.getPadding() ?? padding);

            const results = this.construct(stack, UIEdgeInsetsTabContainer, minSize, usingBuild);
            const tempTabMinSize = tab.getMinSize();
            const tabMinWidth = tempTabMinSize?.width ?? 0;
            const tabMinHeight = tempTabMinSize?.height ?? 0;
            const tabMinSize = tab._setMinSize({
                width: Math.max(results.size.width, tabMinWidth, tabButtonMinWidth),
                height: Math.max(results.size.height, tabMinHeight)
            });

            const tempTabMaxSize = tab.getMaxSize();
            const tabMaxSize = {
                width: tempTabMaxSize?.width ?? maxSize.width,
                height: tempTabMaxSize?.height ?? maxSize.height
            }

            if (tabMaxSize.width < tabMinSize.width || tabMaxSize.height < tabMinSize.height) {
                console.log(`WARNING: UITab[${i}] maximum size is less than its minimum size!
minSize: { width: ${tabMinSize.width}, height: ${tabMinSize.height} }
maxSize: { width: ${tabMaxSize.width}, height: ${tabMaxSize.height} }
Errors can occur when resizing windows.`);
            }
        }
        const selectedTab = tabs[selectedIndex];
        const tempMinSize = selectedTab._getMinSize();
        const selectedTabMinSize = {
            width: tempMinSize?.width ?? minSize.width,
            height: tempMinSize?.height ?? minSize.height
        }
        return {
            size: selectedTabMinSize,
            widgets: [],
            tabs: tabs.map(val => val._data())
        }
    }

    /**
     * Constructs single container
     * @param stack 
     * @param insets 
     * @returns construction result
     */
    construct(
        stack: UIStack,
        insets: UIEdgeInsets = UIEdgeInsetsContainer,
        minSize: UISize,
        usingBuild: boolean = true
    ): UIConstructResult {
        const size = this.calculateBounds(stack, insets, usingBuild)
        return {
            size: {
                width: Math.max(size.width, minSize.width),
                height: Math.max(size.height, minSize.height)
            },
            widgets: stack._getWidgets()
        };
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
