/// <reference path="../../UIWidgets/UIWidget.ts" />

/**
 * Proxy for interaction between widgets.
 */
class UIWidgetProxy<T extends UIWidget<any>> implements UIProxy<T> {

    ui?: T;

    constructor() { }

    //Convenience

    /**
     * Create *UIWidgetProxy* instance without using new.
     */
    static $<T extends UIWidget<any>>(): UIWidgetProxy<T> {
        const proxy = new UIWidgetProxy<T>();
        return proxy;
    }

    //Private

    _bind(ui: T) {
        this.ui = ui;
    }

    //Public

    /**
     * Modify and update the properties of the widget.
     * When it detects a change in size value, it recalurate the window layout.
     * * If you change the property without using the update block, it will be reflected in the next update.
     * @param block update block
     */
    updateUI(block: ((ui: T) => void) | undefined = undefined) {
        this.ui?.updateUI(block);
    }

    /**
     * This function is called after the widget has been initialized.
     */
    didLoad(block: (ui: T) => void) {
        this.ui?.didLoad(block);
    }

    /**
     * This function is called immediately after the widget is displayed.
     */
    didAppear(block: (ui: T) => void) {
        this.ui?.didAppear(block);
    }

    //---

    /**
     * Observe the click.
     * @param block
     */
    onClick(block: (ui: T, first: any, second: any) => void) {
        const anyUI = this.ui as any;
        if (anyUI) {
            if (anyUI.onClick) {
                anyUI.onClick(block);
            } else {
                throw new Error(`There is no 'onClick' function in widget '${anyUI.getName()}'!`);
            }
        }
    }
    
    /**
     * Observe the change in value.
     * @param block
     */
    onChange(block: (ui: T, first: any, second: any) => void) {
        const anyUI = this.ui as any;
        if (anyUI) {
            if (anyUI.onChange) {
                anyUI.onChange(block);
            } else {
                throw new Error(`There is no 'onChange' function in widget '${anyUI.getName()}'!`);
            }
        }
    }
}

/**
 * Short name class of *UIWidgetProxy* for simplicity access.
 */
class UIWP<T extends UIWidget<any>> extends UIWidgetProxy<T> { }