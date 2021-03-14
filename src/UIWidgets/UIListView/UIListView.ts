/// <reference path='../UIWidget.ts' />
/// <reference path='../../UICore/UIScrollbarType.ts' />
/// <reference path='UIListViewColumn.ts' />
/// <reference path='UIListViewItem.ts' />

class UIListView extends UIWidget<ListView> {

    _scrollbarType: UIScrollbarType = UIScrollbarType.None;
    _isStriped: boolean = false;

    _showColumnHeaders: boolean = false;
    _columns: UIListViewColumn[] | undefined;
    _items: UIListViewItem[] = [];

    _selectedCell: RowColumn | undefined;
    _canSelect: boolean = false;

    _onHeighlight: ((listView: this, column: number, item: number) => void) | undefined;
    _onClick: ((listView: this, column: number, item: number) => void) | undefined;

    constructor(columns: UIListViewColumn[] | undefined = undefined) {
        super();
        this._columns = columns;
    }

    //Convenience

    static $(columns: UIListViewColumn[] | undefined = undefined): UIListView {
        var listView = new UIListView(columns);
        return listView
            .minSize({ width: 165, height: 120 });
    }

    //Private

    _build() {
        this._widget = {
            ...this._buildBaseValues(),
            type: 'listview',
            scrollbars: this._scrollbarType,
            isStriped: this._isStriped,
            showColumnHeaders: this._showColumnHeaders,
            columns: this._columns?.map((val) => val._data(this._applyFont)),
            items: this._items.map((val) => val._data(this._applyFont)!),
            selectedCell: this._selectedCell,
            canSelect: this._canSelect,
            onHighlight: (item: number, column: number) => {
                this._onHeighlight?.call(this, this, column, item);
            },
            onClick: (item: number, column: number) => {
                this._onClick?.call(this, this, column, item);
            }
        }
    }

    _update(widget: ListView) {
        super._update(widget);
        widget.scrollbars = this._scrollbarType;
        widget.isStriped = this._isStriped;
        widget.showColumnHeaders = this._showColumnHeaders;
        widget.columns = this._columns?.map((val) => val._data(this._applyFont));
        widget.items = this._items.map((val) => val._data(this._applyFont)!);
        widget.selectedCell = this._selectedCell;
        widget.canSelect = this._canSelect;
    }

    //Public

    scrollbarType(val: UIScrollbarType): this {
        this._scrollbarType = val;
        return this;
    }

    isStriped(val: boolean): this {
        this._isStriped = val;
        return this;
    }

    showColumnHeaders(val: boolean): this {
        this._showColumnHeaders = val;
        return this;
    }

    addColumn(val: UIListViewColumn): this {
        this._columns?.push(val);
        return this;
    }

    addColumns(val: UIListViewColumn[]): this {
        this._columns = this._columns?.concat(val);
        return this;
    }

    addItem(val: UIListViewItem): this {
        this._items.push(val);
        return this;
    }

    addItems(val: UIListViewItem[]): this {
        this._items = this._items.concat(val);
        return this;
    }

    selectCell(row: number, column: number): this {
        this._selectedCell = { row: row, column: column };
        return this;
    }

    canSelect(val: boolean): this {
        this._canSelect = val;
        return this;
    }

    getColumnData(val: number): UIListViewColumn | undefined {
        return this._columns?.[val];
    }

    getItemData(val: number): UIListViewItem | undefined {
        return this._items?.[val];
    }

    getHighlightedCell(): RowColumn | undefined {
        var widget: ListView = this._widget;
        return widget.highlightedCell;
    }

    onHeighlight(block: (listView: this, column: number, item: number) => void): this {
        this._onHeighlight = block;
        return this;
    }

    onClick(block: (listView: this, column: number, item: number) => void): this {
        this._onClick = block;
        return this;
    }
}