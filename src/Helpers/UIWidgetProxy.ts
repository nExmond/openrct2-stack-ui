class UIWidgetProxy<T extends UIWidget<any>> {

    widget?: T;

    constructor() {}

    static $<T extends UIWidget<any>>(): UIWidgetProxy<T> {
        var proxy = new UIWidgetProxy<T>();
        return proxy;
    }

    _bind(widget: T) {
        this.widget = widget;
    }
}

class UIWP<T extends UIWidget<any>> extends UIWidgetProxy<T> {}