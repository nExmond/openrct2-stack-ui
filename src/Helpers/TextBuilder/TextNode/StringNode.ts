/// <reference path="TextNode.ts" />

/**
 * Pure string node.
 * Line breaks can be added with the '**\n**'.
 */
class StringNode extends TextNode {

    _string: string;

    /**
     * Creates an instance of string node.
     * @param string 
     * @param useEscaping This is for internal use only. Use it as the default.
     */
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