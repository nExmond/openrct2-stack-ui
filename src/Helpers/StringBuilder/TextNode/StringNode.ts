/// <reference path='TextNode.ts' />

class StringNode extends TextNode {

    _string: string;

    constructor(string: string, useEscaping: boolean = true) {
        super([]);
        if (useEscaping) {
            this._string = string.split('\n').join("\\n");
        } else {
            this._string = string;
        }
    }

    //Private

    _isValid(): boolean {
        return this._isLeaf();
    }

    _text(): string {
        return this._string;
    }
}