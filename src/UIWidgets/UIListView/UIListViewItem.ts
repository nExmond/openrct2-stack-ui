class UIListViewItem {

    protected _isSeparator: boolean = false;
    protected _textList: string[];

    constructor(textList: string[] = [], isSeparator: boolean) {
        this._textList = textList
    }

    //Convenience

    static $(textList: string[]): UIListViewItem {
        return new UIListViewItem(textList, false);
    }
    static $S(text: string | undefined = undefined): UIListViewItem {
        const val = typeof text === undefined ? [] : [text!];
        return new UIListViewItem(val, true);
    }

    //Private

    _data(applyFont: (val: string | undefined) => string | undefined): ListViewItem {
        if (this._isSeparator) {
            const text = this._textList.length > 0 ? this._textList[0] : undefined;
            return {
                type: 'seperator',
                text: applyFont(text)
            }
        } else {
            return this._textList.map(val => applyFont(val)!);
        }
    }
}