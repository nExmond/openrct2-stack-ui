/// <reference path="../UIWidget.ts" />
/// <reference path="../../UICore/UIScrollbarType.ts" />
/// <reference path="UIListViewColumn.ts" />
/// <reference path="UIListViewItem.ts" />

/**
 * Widget that displays a multicolumn list.
 */
class UIListView extends UIWidget<ListView> {

    protected _scrollbarType: UIScrollbarType = UIScrollbarType.None;
    protected _isStriped: boolean = false;

    protected _showColumnHeaders: boolean = false;
    protected _columns: UIListViewColumn[] | undefined;
    protected _items: UIListViewItem[] = [];

    protected _selectedCell: RowColumn | undefined;
    protected _canSelect: boolean = false;

    protected _onHeighlight: ((listView: this, column: number, item: number) => void) | undefined;
    protected _onClick: ((listView: this, column: number, item: number) => void) | undefined;

    /**
     * Creates an instance of list view.
     * @param columns
     */
    constructor(columns: UIListViewColumn[] | undefined = undefined) {
        super();
        this._columns = columns;
    }

    //Convenience

    /**
     * Create *UIListView* instance without using new.
     */
    static $(columns: UIListViewColumn[] | undefined = undefined): UIListView {
        const listView = new UIListView(columns);
        return listView
            .minSize({ width: 165, height: 120 });
    }

    //Private

    _build() {
        this._widget = {
            ...this._buildBaseValues(),
            type: "listview",
            scrollbars: this._scrollbarType,
            isStriped: this._isStriped,
            showColumnHeaders: this._showColumnHeaders,
            columns: this._columns?.map(val => val._data(val => this._applyFont(val))),
            items: this._items.map(val => val._data(val => this._applyFont(val))!),
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
        widget.columns = this._columns?.map(val => val._data(val => this._applyFont(val)));
        widget.items = this._items.map(val => val._data(val => this._applyFont(val))!);
        widget.selectedCell = this._selectedCell;
        widget.canSelect = this._canSelect;
    }

    //Public

    /**
     * Set the axis of the scroll bar to be displayed.
     */
    scrollbarType(val: UIScrollbarType): this {
        this._scrollbarType = val;
        return this;
    }

    getScrollbarType(): UIScrollbarType {
        return this._scrollbarType;
    }

    /**
     * Set to make it easy to distinguish items.
     */
    isStriped(val: boolean): this {
        this._isStriped = val;
        return this;
    }

    getIsStriped(): boolean {
        return this._isStriped;
    }

    /**
     * Set whether to display the columns in the list.
     */
    showColumnHeaders(val: boolean): this {
        this._showColumnHeaders = val;
        return this;
    }

    getShowColumnHeaders(): boolean {
        return this._showColumnHeaders;
    }

    /**
     * Adds column.
     */
    addColumn(val: UIListViewColumn): this {
        this._columns?.push(val);
        return this;
    }

    /**
     * Adds columns.
     */
    addColumns(val: UIListViewColumn[]): this {
        this._columns = this._columns?.concat(val);
        return this;
    }

    /**
     * Adds item.
     */
    addItem(val: UIListViewItem): this {
        this._items.push(val);
        return this;
    }

    /**
     * Adds items.
     */
    addItems(val: UIListViewItem[]): this {
        this._items = this._items.concat(val);
        return this;
    }

    /**
     * Selects cell
     */
    selectCell(row: number, column: number): this {
        this._selectedCell = { row: row, column: column };
        return this;
    }

    getSelectedCell(): RowColumn | undefined {
        return this._selectedCell;
    }

    /**
     * Determines whether select can
     */
    canSelect(val: boolean): this {
        this._canSelect = val;
        return this;
    }

    getCanSelect(): boolean {
        return this._canSelect;
    }

    /**
     * Gets column data
     */
    getColumnData(val: number): UIListViewColumn | undefined {
        return this._columns?.[val];
    }

    /**
     * Gets item data
     */
    getItemData(val: number): UIListViewItem | undefined {
        return this._items?.[val];
    }

    /**
     * Gets highlighted cell info
     */
    getHighlightedCell(): RowColumn | undefined {
        const widget: ListView = this._widget;
        return widget.highlightedCell;
    }

    /**
     * Observe the highlighted item.
     * @param block
     */
    onHeighlight(block: (listView: this, column: number, item: number) => void): this {
        this._onHeighlight = block;
        return this;
    }

    /**
     * Observe the clicked item.
     * @param block
     */
    onClick(block: (listView: this, column: number, item: number) => void): this {
        this._onClick = block;
        return this;
    }

    getColumns(): UIListViewColumn[] {
        return this._columns ?? [];
    }

    getItems(): UIListViewItem[] {
        return this._items;
    }
}