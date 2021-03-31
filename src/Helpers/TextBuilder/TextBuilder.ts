/// <reference path='../../UICore/TextColor.ts' />
/// <reference path='../../UICore/TextFont.ts' />
/// <reference path='TextNode/TextNode.ts' />

/**
 * Defines the format of the string as a parent-child relationship.
 * Displayed as a string listing leaf nodes on the screen.
 */
class TextBuilder {

    protected _root: TextNode;
    protected _font: TextFont | undefined;

    protected _outline: boolean = false;
    protected _color: TextColor | undefined;

    /**
     * Creates an instance of text builder.
     * @param node *TextNode* or string
     */
    constructor(node: TextNode | string) {
        if (typeof node === 'string' || typeof node === 'undefined') {
            this._root = StringNode.$S(node);
        } else {
            this._root = node;
        }
    }

    //Convenience

    /**
     * Create *TextBuilder* instance without using new.
     */
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

    /**
     * Build formatted text.
     * @returns formatted text
     */
    build(): string {

        this._root._unifyNewline(this._font);
        this._root._unifyColor(this._color);
        this._root._unifyOutline(this._outline);

        return this._text();
    }

    /**
     * Set the font of the string contained by *TextBuilder*.
     * @param TextFont font 
     * @returns this
     */
    font(val: TextFont): this {
        this._font = val;
        return this;
    }

    /**
     * Set the outline of the text contained in *TextBuilder*.
     * @returns this 
     */
    outline(): this {
        this._outline = true;
        return this;
    }

    /**
     * Set the color of the text contained in *TextBuilder*.
     * @returns this 
     */
    color(val: TextColor): this {
        this._color = val;
        return this;
    }

    /**
     * Describe the TextNode hierarchy.
     * @returns description string
     */
    description(): string {
        return this._root._description();
    }
}

/**
 * Short name class of *TextBuilder* for simplicity access.
 */
class TB extends TextBuilder { };
