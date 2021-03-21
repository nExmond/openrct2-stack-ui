/// <reference path='UIButton.ts' />

class UIToggleButton extends UIButton {

    private _onPress: ((button: this, isPressed: boolean) => void) | undefined;

    //Private
    
    protected _internalOnChange() {
        var widget: ButtonWidget = this._widget;
        var isPressed = widget.isPressed ?? false
        var toggled = !isPressed;
        this.updateUI((widget) => widget.isPressed(toggled));
        this._onPress?.call(this, this, toggled);
    }

    //Public

    onPress(block: (button: this, isPressed: boolean) => void): this {
        this._onPress = block;
        return this;
    }
}