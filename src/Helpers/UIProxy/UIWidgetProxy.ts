/// <reference path='../../UIWidgets/UIWidget.ts' />

/**
 * Proxy for interaction between UIWidgets.
 */
class UIWidgetProxy<T extends UIWidget<any>> {

    /**
     * Binded widget.
     */
    widget?: T;

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

    _bind(widget: T) {
        this.widget = widget;
    }
}

/**
 * Short name class of *UIWidgetProxy* for simplicity access.
 */
class UIWP<T extends UIWidget<any>> extends UIWidgetProxy<T> {}