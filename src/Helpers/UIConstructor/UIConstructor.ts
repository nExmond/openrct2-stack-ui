/// <reference path='../../UICore/UIEdgeInsets.ts' />
/// <reference path='../../UIWidgets/UITab.ts' />
/// <reference path='../../UIWidgets/UIStack.ts' />
/// <reference path='../UIInteractor.ts' />
/// <reference path='UIConstructResult.ts' />

class UIConstructor {

    constructTabs(tabs: UITab[], selectedIndex: number, interactor: UIInteractor, spacing: number, padding: UIEdgeInsets): UIConstructResult {
        if (selectedIndex >= tabs.length || selectedIndex < 0) {
            throw new Error('SelectedIndex is less than the count of tabs and must be at least 0.');
        }
        var minWidth = 31 * tabs.length + 6
        for (var i = 0; i < tabs.length; i++) {
            var tab = tabs[i];
            var stack = tab._contentView
                .spacing(tab._spacing ?? spacing)
                .padding(tab._padding ?? padding);

            var results = this.construct(stack, interactor, UIEdgeInsetsTabContainer);
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
