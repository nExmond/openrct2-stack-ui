/// <reference path="../../UIContainer/UIWindow.ts" />

/**
 * Proxy for interaction between UIWindow.
 */
class UIWindowProxy implements UIProxy<UIWindow> {

    ui?: UIWindow;

    constructor() {}

    //Convenience

    /**
     * Create *UIWindowProxy* instance without using new.
     */
    static $(): UIWindowProxy {
        const proxy = new UIWindowProxy();
        return proxy;
    }

    //Private

    _bind(ui: UIWindow) {
        this.ui = ui;
    }

    //Public

    /**
     * Shows a window on the screen.
     * Initial data is set at this point.
     */
    show() {
        this.ui?.show();
    }

    /**
     * Modify and update the properties of the window.
     * @param block update block
     */
    updateUI(block: (ui: UIWindow) => void) {
        this.ui?.updateUI(block);
    }

    /**
     * This function is called after the window has been initialized.
     */
    didLoad(block: (ui: UIWindow) => void) {
        this.ui?.didLoad(block);
    }
    
    /**
     * This function is called immediately after the window is displayed.
     */
    didAppear(block: (ui: UIWindow) => void) {
        this.ui?.didAppear(block);
    }

    /**
     * Execute the function when selecting a tab.
     */
    onTabChange(block: (ui: UIWindow, tabIndex: number) => void) {
        this.ui?.onTabChange(block);
    }

    /**
     * Execute the function when the window is closed.
     */
    onClose(block: (ui: UIWindow) => void) {
        this.ui?.onClose(block);
    }

    /**
     * Closes window
     */
    close() {
        this.ui?.close();
    }
}

/**
 * Short name class of *UIWindowProxy* for simplicity access.
 */
class UIWDP extends UIWindowProxy {}