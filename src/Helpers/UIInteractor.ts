
/**
 * Assisting child widgets to communicate with the window.
 */
class UIInteractor {

    protected __findWidget!: <T extends Widget>(name: string) => T | undefined;
    protected _refreshWindow!: () => void;
    protected _refreshWindowTab!: (isReopen: boolean) => void;
    protected __windowTheme!: () => UIWindowTheme;

    constructor() { }

    //Private

    _findWidget(block: <T extends Widget>(name: string) => T | undefined) {
        this.__findWidget = block;
    }

    _update<T extends Widget>(name: string, block: (widget: T) => void) {
        var widget: T | undefined = this.__findWidget(name);
        if (typeof widget !== "undefined") {
            block(widget);
        }
    }

    _refreshTab(block: (isReopen: boolean) => void) {
        this._refreshWindowTab = block;
    }

    _refresh(block: () => void) {
        this._refreshWindow = block;
    }
    
    _windowTheme(block: () => UIWindowTheme) {
        this.__windowTheme = block;
    }

    //Public
    
    /**
     * Updates the window and its child widgets.
     */
    refreshWindow() {
        this._refreshWindow();
    }

    /**
     * Updates the tab and its child widgets.
     */
    refreshWindowTab(isReopen: boolean) {
        this._refreshWindowTab(isReopen);
    }

    getWindowTheme(): UIWindowTheme {
        return this.__windowTheme();
    }
}