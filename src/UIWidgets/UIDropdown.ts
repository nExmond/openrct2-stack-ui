/// <reference path="UIWidget.ts" />
/// <reference path="../UICore/UITextAlignment.ts" />

/**
 * Widget that selects and displays one of several items.
 */
class UIDropdown extends UIWidget<DropdownWidget> {

    protected _items: string[];
    protected _selectedIndex: number = 0;
    protected _onChange?: (dropdown: this, index: number, item: string) => void;

    /**
     * Creates an instance of dropdown.
     * @param items list of string
     */
    constructor(items: string[]) {
        super();
        this._items = items;
    }

    //Convenience

    /**
     * Create *UIDropdown* instance without using new.
     */
    static $(items: string[]): UIDropdown {
        const dropdown = new UIDropdown(items);
        const itemsMinWidth = items.map(val => val.containerSize().width).max();
        return dropdown
            .size({ height: 15 })
            .minSize({ width: itemsMinWidth + 11, height: 15 });
    }

    //Private

    _build() {
        this._widget = {
            ...this._buildBaseValues(),
            type: "dropdown",
            textAlign: UITextAlignment.Center,
            items: this._items.map(val => this._applyFont(val)!),
            selectedIndex: this._selectedIndex,
            onChange: (index: number) => {
                this._selectedIndex = index;
                const item = this._items[index];
                this._onChange?.call(this, this, this._selectedIndex, item);
            }
        }
    }

    protected _update(widget: DropdownWidget) {
        super._update(widget);
        widget.items = this._items.map(val => this._applyFont(val)!);
        widget.selectedIndex = this._selectedIndex;
    }

    //Public

    getItems(): string[] {
        return this._items;
    }

    /**
     * Select an item within a range.
     */
    selectedIndex(val: number): this {
        if (val < this._items.length && val >= 0) {
            this._selectedIndex = val;
        } else {
            const max = Math.max(0, this._items.length - 1);
            throw new Error(`Enter a value between 0 and ${max}.`);
        }
        return this;
    }

    getSelectedIndex(): number {
        return this._selectedIndex;
    }

    /**
     * Observe the change in value.
     * @param block
     */
    onChange(block: (dropdown: this, index: number, item: string) => void): this {
        this._onChange = block;
        return this;
    }
}
