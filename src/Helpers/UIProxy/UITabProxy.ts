/// <reference path="../../UIWidgets/UITab.ts" />

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
}

/**
 * Short name class of *UITabProxy* for simplicity access.
 */
class UITP extends UITabProxy {}