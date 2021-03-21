/// <reference path='../../UICore/TextColor.ts' />
/// <reference path='../../UICore/TextFont.ts' />
/// <reference path='TextNode/TextNode.ts' />

class TextBuilder {

    protected _root: TextNode;
    protected _font: TextFont | undefined;

    protected _outline: boolean = false;
    protected _color: TextColor | undefined;

    constructor(node: TextNode | string) {
        if (typeof node === 'string' || typeof node === 'undefined') {
            this._root = StringNode.$S(node);
        } else {
            this._root = node;
        }
    }

    //Convenience

    static $(node: TextNode | string): TextBuilder {
        var builder = new TextBuilder(node);
        return builder;
    }

    //Private
    _text(): string {

        var font = typeof this._font !== 'undefined' ? `{${this._font}}` : '';
        var text = font + this._root._text();

        return text;
    }

    //Public

    build(): string {

        this._root._unifyNewline(this._font);
        this._root._unifyColor(this._color);
        this._root._unifyOutline(this._outline);

        return this._text();
    }

    font(val: TextFont): this {
        this._font = val;
        return this;
    }

    outline(): this {
        this._outline = true;
        return this;
    }

    color(val: TextColor): this {
        this._color = val;
        return this;
    }

    description(): string {
        return this._root._description();
    }
}

class TB extends TextBuilder { };
