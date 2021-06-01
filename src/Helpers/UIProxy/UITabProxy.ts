/// <reference path="../../UIContainer/UITab.ts" />

/**
 * Proxy for interaction between UITab.
 */
class UITabProxy implements UIProxy<UITab> {

    ui?: UITab;

    constructor() {}

    //Convenience

    /**
     * Create *UITabProxy* instance without using new.
     */
    static $(): UITabProxy {
        const proxy = new UITabProxy();
        return proxy;
    }

    //Private

    _bind(ui: UITab) {
        this.ui = ui;
    }
    
    //Public

    /**
     * Modify and update the properties of the window.
     * @param block update block
     */
    updateUI(block: ((ui: UITab) => void) | undefined = undefined) {
        this.ui?.updateUI(block);
    }

    /**
     * This function is called after the tab has been initialized.
     */
    didLoad(block: (ui: UITab) => void) {
        this.ui?.didLoad(block);
    }
    
    /**
     * This function is called immediately after the tab is displayed.
     */
    didAppear(block: (ui: UITab) => void) {
        this.ui?.didAppear(block);
    }
    
    /**
     * This function is called after the tab is disabled.
     */
     didDisappear(block: (ui: UITab) => void) {
        this.ui?.didDisappear(block);
    }
}

/**
 * Short name class of *UITabProxy* for simplicity access.
 */
class UITP extends UITabProxy {}