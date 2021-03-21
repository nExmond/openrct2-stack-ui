class UIInteractor {

    protected _findWidget!: <T extends Widget>(name: string) => T | undefined;
    protected _refreshWindow!: () => void;

    constructor() { }

    //Private

    _refresh(block: () => void) {
        this._refreshWindow = block;
    }

    //Public

    update<T extends Widget>(name: string, block: (widget: T) => void) {
        var widget: T | undefined = this._findWidget(name);
        if (typeof widget !== 'undefined') {
            block(widget);
        }
    }

    findWidget(block: <T extends Widget>(name: string) => T | undefined) {
        this._findWidget = block;
    }
    
    refreshWindow() {
        this._refreshWindow();
    }
}