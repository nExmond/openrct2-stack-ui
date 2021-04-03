/// <reference path="../../UIWindow/UIWindow.ts" />

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
}

/**
 * Short name class of *UIWindowProxy* for simplicity access.
 */
class UIWDP extends UIWindowProxy {}