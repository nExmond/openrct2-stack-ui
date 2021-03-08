class UIListViewItem {

    _isSeparator: boolean = false;
    _textList: string[];

    constructor(textList: string[] = [], isSeparator: boolean) {
        this._textList = textList
    }

    //Convenience

    static $(textList: string[]): UIListViewItem {
        return new UIListViewItem(textList, false);
    }
    static $S(text: string | undefined = undefined): UIListViewItem {
        var val = typeof text === undefined ? [] : [text!];
        return new UIListViewItem(val, true);
    }

    //Private

    _data(): ListViewItem {
        if (this._isSeparator) {
            var text = this._textList.length > 0 ? this._textList[0] : undefined;
            return {
                type: 'seperator',
                text: text
            }
        } else {
            return this._textList;
        }
    }
}