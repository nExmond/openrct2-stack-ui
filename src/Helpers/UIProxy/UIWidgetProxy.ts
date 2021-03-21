/// <reference path='../../UIWidgets/UIWidget.ts' />

class UIWidgetProxy<T extends UIWidget<any>> {

    widget?: T;

    constructor() {}

    //Convenience

    static $<T extends UIWidget<any>>(): UIWidgetProxy<T> {
        const proxy = new UIWidgetProxy<T>();
        return proxy;
    }

    //Private

    _bind(widget: T) {
        this.widget = widget;
    }
}

class UIWP<T extends UIWidget<any>> extends UIWidgetProxy<T> {}