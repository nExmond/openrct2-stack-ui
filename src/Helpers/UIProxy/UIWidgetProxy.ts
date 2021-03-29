/// <reference path='../../UIWidgets/UIWidget.ts' />

/**
 * Proxy for interaction between widgets.
 */
class UIWidgetProxy<T extends UIWidget<any>> implements UIProxy<T> {

    ui?: T;

    constructor() {}

    //Convenience

    /**
     * Create *UIWidgetProxy* instance without using new.
     */
    static $<T extends UIWidget<any>>(): UIWidgetProxy<T> {
        const proxy = new UIWidgetProxy<T>();
        return proxy;
    }

    //Private

    _bind(ui: T) {
        this.ui = ui;
    }
}

/**
 * Short name class of *UIWidgetProxy* for simplicity access.
 */
class UIWP<T extends UIWidget<any>> extends UIWidgetProxy<T> {}