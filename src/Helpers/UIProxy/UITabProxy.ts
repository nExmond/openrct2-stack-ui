/// <reference path='../../UIWidgets/UITab.ts' />

class UITabProxy {

    tab?: UITab;

    constructor() {}

    static $(): UITabProxy {
        var proxy = new UITabProxy();
        return proxy;
    }

    _bind(tab: UITab) {
        this.tab = tab;
    }
}

class UITP extends UITabProxy {}