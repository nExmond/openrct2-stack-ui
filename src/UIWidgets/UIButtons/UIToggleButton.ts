/// <reference path='UIButton.ts' />

class UIToggleButton extends UIButton {

    protected _onPress: ((button: this, isPressed: boolean) => void) | undefined;

    //Private
    
    protected _internalOnChange() {
        const widget: ButtonWidget = this._widget;
        const isPressed = widget.isPressed ?? false
        const toggled = !isPressed;
        this.updateUI((widget) => widget.isPressed(toggled));
        this._onPress?.call(this, this, toggled);
    }

    //Public

    onPress(block: (button: this, isPressed: boolean) => void): this {
        this._onPress = block;
        return this;
    }

    toggle(): this {
        this._isPressed = !this._isPressed;
        return this;
    }
}