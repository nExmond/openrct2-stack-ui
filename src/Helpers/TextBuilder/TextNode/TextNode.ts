/// <reference path="../../../UICore/TextColor.ts" />
/// <reference path="../../../UICore/UIImage/UIImage.ts" />

/**
 * Top level node used to apply formatting.
 * Use it as a parent node.
 */
class TextNode {

    protected _childs: TextNode[] = [];

    protected _outline: boolean = false;
    protected _color: TextColor | undefined;

    /**
     * Creates an instance of *TextNode*.
     * @param childs list of *TextNode*
     */
    constructor(childs: TextNode[]) {
        this._childs = childs;
    }

    //Convenience

    /**
     * Create *TextNode* instance without using new.
     */
    static $(...childs: TextNode[]): TextNode {
        const node = new TextNode(childs);
        return node;
    }

    /**
     * Create *StringNode* instance without using new.
     */
    static $S(string: string): StringNode {
        const node = new StringNode(string);
        return node;
    }

    /**
     * Create *ImageNode* instance without using new.
     */
    static $I(image: UIImage): ImageNode {
        const node = new ImageNode(image);
        return node;
    }

    /**
     * Create *ImageNode* instance without using new.
     */
    static $NL(isSmaller: boolean = false): _NewlineNode {
        const node = new _NewlineNode(isSmaller);
        return node;
    }

    //Private

    _isLeaf(): boolean {
        return this._childs.length === 0;
    }

    _isStopover(): boolean {
        return this._childs.length > 0;
    }

    _isValid(): boolean {
        return true;
    }

    _text(): string {
        return this._childs.map(val => val._text()).join('');
    }

    _unifyNewline(font: TextFont | undefined = undefined) {
        const existFont = typeof font !== "undefined";
        const isSmaller = existFont && font! === TextFont.Tiny;
        if (this._isStopover()) {
            const numberOfChilds = this._childs.length;
            for (var i = 0; i < numberOfChilds; i++) {
                const child = this._childs[i];
                if (child._isLeaf() && child instanceof StringNode) {
                    const splitted = child._string.split("\\n");
                    if (splitted.length > 1) {
                        const newChilds = splitted
                            .map((val, index, array) => {
                                const node = new StringNode(val, false);
                                node._outline = child._outline;
                                node._color = child._color;
                                const nodes = [node];
                                if (index < array.length - 1) {
                                    nodes.push(new _NewlineNode(isSmaller));
                                    if (existFont) {
                                        nodes.push(new _FontNode(font!))
                                    }
                                }
                                return nodes;
                            }).reduce((acc, val) => acc.concat(val));
                        const newNode = TextNode.$(...newChilds);
                        this._childs[i] = newNode;
                    }
                } else {
                    child._unifyNewline(font);
                }
            }
        }
    }

    _unifyOutline(parentExist: boolean = false) {
        if (this._isLeaf() && this instanceof StringNode) {
            if (parentExist) {
                this._string = this._string.remove("{OUTLINE}").remove("{OUTLINE_OFF}")
            } else if (this._outline && this._isPureString()) {
                this._string = `{OUTLINE}${this._string}{OUTLINE_OFF}`;
            }
        } else if (this._isStopover()) {
            const childs = this._childs!;
            if (childs.length > 0) {
                const apply = parentExist || this._outline;
                for (var child of childs) {
                    child._unifyOutline(apply);
                }
                if (apply) {
                    var isBegin = true
                    var prevChild: StringNode | undefined;
                    for (var i = 0; i < childs.length; i++) {
                        const child = this._childs[i];
                        if (isBegin && child instanceof StringNode) {
                            child._string = `{OUTLINE}${child._string}`;
                            isBegin = false;
                        }
                        if (child instanceof _NewlineNode) {
                            if (typeof prevChild !== "undefined") {
                                prevChild._string = `${prevChild._string}{OUTLINE_OFF}`;
                            }
                            isBegin = true;
                        }
                        if (child instanceof StringNode) {
                            prevChild = child;
                            if (i >= this._childs.length - 1) {
                                child._string = `${child._string}{OUTLINE_OFF}`;
                            }
                        }
                    }
                }
            }
        }
    }

    _unifyColor(parentColor: TextColor | undefined = undefined) {
        const color = this._color ?? parentColor ?? TextColor.WindowSecondary;
        if (this._isLeaf() && this._isPureString() && this instanceof StringNode) {
            this._string = `{${color}}${this._string}`;
        } else if (this._isStopover()) {
            for (var child of this._childs!) {
                child._unifyColor(color);
            }
        }
    }

    __leafs(): StringNode[] {
        if (this._isLeaf()) {
            const string = this as unknown as StringNode;
            return [string];
        } else {
            return this._childs.map(val => val.__leafs()).flatMap();
        }
    }

    _description(depth: number = 0, index: number | undefined = undefined): string {
        const tab = "│ "
        const tabs = [...Array(depth)].map(_ => tab).join('');
        const childTabs = tabs + tab;
        var childs = "[]";
        if (typeof this._childs !== "undefined" && this._childs.length > 0) {
            childs = `[${this._childs.map((val, index) => val._description(depth + 1, index)).join(",")}]`
        }
        return `${typeof index !== "undefined" ? '[' + index + ']' : ""}{
${childTabs}type: ${this.constructor.name},${this instanceof StringNode ? "\n" + childTabs + "string: " + this._string + "," : ""}
${childTabs}outline: ${this._outline},
${childTabs}color: ${this._color},
${childTabs}childs: ${childs}
${tabs}}`;
    }

    _isPureString(): boolean {
        return this instanceof ImageNode === false && !this._isPrivate();
    }

    _isPrivate(): boolean {
        return this instanceof _NewlineNode || this instanceof _FontNode;
    }

    //Public

    /**
     * Set outline for this node and its subnodes.
     */
    outline(val: boolean = true): this {
        this._outline = val;
        return this;
    }

    /**
     * Set color for this node and its subnodes.
     */
    color(val: TextColor): this {
        this._color = val;
        return this;
    }
}

/**
 * Short name class of *TextNode* for simplicity access.
 */
class TN extends TextNode { };