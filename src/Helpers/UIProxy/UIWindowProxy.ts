/// <reference path='../../UIWindow/UIWindow.ts' />

class UIWindowProxy {

    window?: UIWindow;

    constructor() {}

    static $(): UIWindowProxy {
        var proxy = new UIWindowProxy();
        return proxy;
    }

    _bind(window: UIWindow) {
        this.window = window;
    }
}

class UIWDP extends UIWindowProxy {}