/// <reference path='../../UIWindow/UIWindow.ts' />

class UIWindowProxy {

    window?: UIWindow;

    constructor() {}

    //Convenience

    static $(): UIWindowProxy {
        const proxy = new UIWindowProxy();
        return proxy;
    }

    //Private

    _bind(window: UIWindow) {
        this.window = window;
    }
}

class UIWDP extends UIWindowProxy {}