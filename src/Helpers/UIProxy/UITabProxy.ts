/// <reference path='../../UIWidgets/UITab.ts' />

class UITabProxy {

    tab?: UITab;

    constructor() {}

    //Convenience

    static $(): UITabProxy {
        const proxy = new UITabProxy();
        return proxy;
    }

    //Private

    _bind(tab: UITab) {
        this.tab = tab;
    }
}

class UITP extends UITabProxy {}