class UIInteractor {

    _findWidget!: <T extends Widget>(name: string) => T | undefined;

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
}