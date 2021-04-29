/// <reference path="UIButton.ts" />

/**
 * Button to toggle the pressed state.
 */
class UIToggleButton extends UIButton {

    protected _onPress?: (button: this, isPressed: boolean) => void;

    //Private
    
    protected _internalOnChange() {
        const widget: ButtonWidget = this._widget;
        const isPressed = widget.isPressed ?? false
        const toggled = !isPressed;
        this.updateUI(widget => widget.isPressed(toggled));
        this._onPress?.call(this, this, toggled);
    }

    //Public

    /**
     * Observe the press or release.
     * @param block
     */
    onPress(block: (button: this, isPressed: boolean) => void): this {
        this._onPress = block;
        return this;
    }

    /**
     * Toggles button
     */
    toggle(): this {
        this._isPressed = !this._isPressed;
        return this;
    }
}