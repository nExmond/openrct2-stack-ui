/// <reference path='UIButton.ts' />

class UIToggleButton extends UIButton {

    //Public

    onPress(block: (button: this, isPressed: boolean) => void): this {
        return super._internalOnChange((button) => {
            var toggled = !button._isPressed;
            button.updateUI((widget) => widget.isPressed(toggled));
            block(button, toggled);
        });
    }
}