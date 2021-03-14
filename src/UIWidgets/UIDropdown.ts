/// <reference path='UIWidget.ts' />
/// <reference path='../UICore/UITextAlignment.ts' />

class UIDropdown extends UIWidget<DropdownWidget> {

    _items: string[];
    _selectedIndex: number = 0;
    _onChange: ((dropdown: this, index: number, item: string) => void) | undefined;

    constructor(items: string[]) {
        super();
        this._items = items;
    }

    //Convenience

    static $(items: string[]): UIDropdown {
        var dropdown = new UIDropdown(items);
        return dropdown.height(15)
            .minSize({ width: 50, height: 15 });
    }

    //Private

    _build() {
        this._widget = {
            ...this._buildBaseValues(),
            type: 'dropdown',
            textAlign: UITextAlignment.Center,
            items: this._items.map(val => this._applyFont(val)!),
            selectedIndex: this._selectedIndex,
            onChange: (index: number) => {
                this._selectedIndex = index;
                var item = this._items[index];
                this._onChange?.call(this, this, this._selectedIndex, item);
            }
        }
    }

    _update(widget: DropdownWidget) {
        super._update(widget);
        widget.items = this._items.map(val => this._applyFont(val)!);
        widget.selectedIndex = this._selectedIndex;
    }

    //Public

    selected(val: number): this {
        this._selectedIndex = val;
        return this;
    }

    onChange(block: (dropdown: this, index: number, item: string) => void): this {
        this._onChange = block;
        return this;
    }
}
