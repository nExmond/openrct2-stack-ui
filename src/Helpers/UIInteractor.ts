class UIInteractor {

    _findWidget!: <T extends Widget>(name: string) => T | undefined;
    _refreshWindow!: () => void;

    constructor() { }

    update<T extends Widget>(name: string, block: (widget: T) => void) {
        var widget: T | undefined = this._findWidget(name);
        if (typeof widget !== 'undefined') {
            block(widget);
        }
    }

    findWidget(block: <T extends Widget>(name: string) => T | undefined) {
        this._findWidget = block;
    }

    _refresh(block: () => void) {
        this._refreshWindow = block;
    }
    
    refreshWindow() {
        this._refreshWindow();
    }
}