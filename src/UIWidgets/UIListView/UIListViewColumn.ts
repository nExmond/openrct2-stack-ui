/// <reference path='../../UICore/UIOptionalRange.ts' />
/// <reference path='../../UICore/UISortOrder.ts' />

/**
 * Attribute of list.
 */
class UIListViewColumn {

    protected _canSort: boolean = false;
    protected _sortOrder: UISortOrder = UISortOrder.None;

    protected _header: string;
    protected _headerTooltip: string | undefined;

    protected _width: number | undefined;
    protected _weight: number | undefined;
    protected _minWidth: number | undefined;
    protected _maxWidth: number | undefined;

    /**
     * Creates an instance of list view column.
     * @param header  
     */
    constructor(header: string) {
        this._header = header;
    }

    //Convenience

    /**
     * Create *UIListViewColumn* instance without using new.
     * Columns with the same width as other columns.
     * @param header 
     */
    static $(header: string): UIListViewColumn {
        return new UIListViewColumn(header);
    }

    /**
     * Create *UIListViewColumn* instance without using new.
     * Fixed width column.
     * @param header 
     * @param width
     */
    static $F(header: string, width: number): UIListViewColumn {
        const listView = new UIListViewColumn(header);
        return listView.width(width);
    }

    /**
     * Create *UIListViewColumn* instance without using new.
     * Column specifying width range.
     * @param header 
     * @param widthRange
     */
    static $R(header: string, widthRange: UIOptionalRange): UIListViewColumn {
        var listView = new UIListViewColumn(header);
        if (typeof widthRange.min !== 'undefined') {
            listView = listView.minWidth(widthRange.min);
        }
        if (typeof widthRange.max !== 'undefined') {
            listView = listView.maxWidth(widthRange.max);
        }
        return listView;
    }

    /**
     * Create *UIListViewColumn* instance without using new.
     * Columns whose width is scaled based on weight.
     * @param header 
     * @param widthRange
     */
    static $W(header: string, weight: number): UIListViewColumn {
        const listView = new UIListViewColumn(header);
        return listView.weight(weight);
    }

    //Private

    _data(applyFont: (val: string | undefined) => string | undefined): ListViewColumn {
        return {
            canSort: this._canSort,
            sortOrder: this._sortOrder,
            header: applyFont(this._header),
            headerTooltip: this._headerTooltip,
            width: this._width,
            ratioWidth: this._weight,
            minWidth: this._minWidth,
            maxWidth: this._maxWidth
        }
    }

    //Public

    /**
     * Sets the sort order of items in the column.
     */
    sortOrder(val: UISortOrder): this {
        this._sortOrder = val;
        return this;
    }

    /**
     * Set whether or not you can change the sorting status arbitrarily.
     */
    canSort(val: boolean): this {
        this._canSort = val;
        return this;
    }

    /**
     * Set the tooltip.
     */
    tooltip(val: string): this {
        this._headerTooltip = val;
        return this;
    }

    /**
     * Set a fixed width.
     * ! It is recommended not to use it after initial setting.
     */
    width(val: number): this {
        this._width = val;
        return this;
    }

    /**
     * Set the weight.
     * ! It is recommended not to use it after initial setting.
     */
    weight(val: number): this {
        this._weight = val;
        return this;
    }

    /**
     * Set the minimum width.
     * ! It is recommended not to use it after initial setting.
     */
    minWidth(val: number): this {
        this._minWidth = val;
        return this;
    }

    /**
     * Set the maximum width.
     * ! It is recommended not to use it after initial setting.
     */
    maxWidth(val: number): this {
        this._maxWidth = val;
        return this;
    }
}