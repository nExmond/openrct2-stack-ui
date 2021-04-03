
/**
 * Item in the list.
 */
class UIListViewItem {

    protected _isSeparator: boolean = false;
    protected _textList: string[];

    /**
     * Creates an instance of list view item.
     * @param textList Items are displayed in the list as many as the number of columns set in the list.
     * @param isSeparator Used as a header or space for a list.
     */
    constructor(textList: string[] = [], isSeparator: boolean) {
        this._textList = textList
    }

    //Convenience

    /**
     * Create a *UIListViewItem* instance without using new.
     * @param textList Set the string as many as the number of columns set in the list.
     */
    static $(textList: string[]): UIListViewItem {
        return new UIListViewItem(textList, false);
    }
    /**
     * Create an instance of *UIListViewItem* with header or empty without using new.
     * @param text header title or empty
     */
    static $S(text: string | undefined = undefined): UIListViewItem {
        const val = typeof text === undefined ? [] : [text!];
        return new UIListViewItem(val, true);
    }

    //Private

    _data(applyFont: (val: string | undefined) => string | undefined): ListViewItem {
        if (this._isSeparator) {
            const text = this._textList.length > 0 ? this._textList[0] : undefined;
            return {
                type: "seperator",
                text: applyFont(text)
            }
        } else {
            return this._textList.map(val => applyFont(val)!);
        }
    }

    //Public

    getIsSeparator(): boolean {
        return this._isSeparator;
    }

    /**
     * text displayed in the columns of the list.
     */
    getElements(): string[] {
        return this._textList;
    }
}