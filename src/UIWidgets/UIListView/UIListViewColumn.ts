/// <reference path='../../UICore/UIOptionalRange.ts' />
/// <reference path='../../UICore/UISortOrder.ts' />

class UIListViewColumn {

    _canSort: boolean = false;
    _sortOrder: UISortOrder = UISortOrder.None;

    _header: string;
    _headerTooltip: string | undefined;

    _width: number | undefined;
    _weight: number | undefined;
    _minWidth: number | undefined;
    _maxWidth: number | undefined;

    constructor(header: string) {
        this._header = header;
    }

    //Convenience

    static $(header: string): UIListViewColumn {
        return new UIListViewColumn(header);
    }

    static $F(header: string, width: number): UIListViewColumn {
        var listView = new UIListViewColumn(header);
        return listView.width(width);
    }

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

    static $W(header: string, weight: number): UIListViewColumn {
        var listView = new UIListViewColumn(header);
        return listView.weight(weight);
    }

    //Private

    _data(): ListViewColumn {
        return {
            canSort: this._canSort,
            sortOrder: this._sortOrder,
            header: this._header,
            headerTooltip: this._headerTooltip,
            width: this._width,
            ratioWidth: this._weight,
            minWidth: this._minWidth,
            maxWidth: this._maxWidth
        }
    }

    //Public

    sortOrder(val: UISortOrder): this {
        this._sortOrder = val;
        return this;
    }

    canSort(val: boolean): this {
        this._canSort = val;
        return this;
    }

    tooltip(val: string): this {
        this._headerTooltip = val;
        return this;
    }

    width(val: number): this {
        this._width = val;
        return this;
    }

    weight(val: number): this {
        this._weight = val;
        return this;
    }

    minWidth(val: number): this {
        this._minWidth = val;
        return this;
    }

    maxWidth(val: number): this {
        this._maxWidth = val;
        return this;
    }
}