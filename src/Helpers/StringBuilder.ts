enum TextFont {
    Tiny = "TINYFONT",
    Small = "SMALLFONT",
    Medium = "MEDIUMFONT",
    Big = "BIGFONT"
}

enum TextColor {
    WindowPrimary = "WINDOW_COLOUR_1",
    WindowSecondary = "WINDOW_COLOUR_2",
    WindowTertiary = "WINDOW_COLOUR_3",

    Black = "BLACK",
    Gray = "GREY",
    White = "WHITE",
    Red = "RED",
    Green = "GREEN",
    Yellow = "YELLOW",
    Topaz = "TOPAZ",
    Celadon = "CELADON",
    BabyBlue = "BABYBLUE",
    PaleLavender = "PALELAVENDER",
    PaleGold = "PALEGOLD",
    LightPink = "LIGHTPINK",
    PearlAqua = "PEARLAQUA",
    PaleSilver = "PALESILVER"
}

enum TextFormat {
    Comma16 = "COMMA16",
    Comma32 = "COMMA32",
    Comma1dp16 = "COMMA1DP16",
    Comma2dp32 = "COMMA2DP32",

    Int32 = "Int32",
    UInt16 = "UINT16",

    Currency = "CURRENCY",
    Currency2dp = "CURRENCY2DP",

    MonthYear = "MONTHYEAR",
    Month = "MONTH",

    DurationShort = "DURATION",
    DurationLong = "REALTIME",

    Velocity = "VELOCITY",

    Length = "LENGTH",

    /**
    * * Select the txt file for your language in https://github.com/OpenRCT2/OpenRCT2/tree/develop/data/language.
    * * Check the comment at the top of the txt file. 
    */
    StringId = "STRINGID"
}

class TextBuilder {

    private _root: TextNode;
    private _font: TextFont | undefined;

    private _outline: boolean = false;
    private _color: TextColor | undefined;

    constructor(node: TextNode | string | undefined) {
        if (typeof node === 'string' || typeof node === 'undefined') {
            this._root = new TextNode(node);
        } else {
            this._root = node;
        }
    }

    //Public

    build(): string {
        if (this._root._isInvalid()) {
            return '';
        }

        this._root._unifyColor(this._color);
        this._root._unifyOutline(this._outline);
        console.log(this.description());
        var text = this._root._text();

        if (typeof text !== 'undefined') {
            if (typeof this._font !== 'undefined') {
                text = text.split(TextFont.Tiny).join('')
                    .split(TextFont.Small).join('')
                    .split(TextFont.Medium).join('')
                    .split(TextFont.Big).join('');
                text = `{${this._font}}${text}`;
            }
        }

        return text ?? '';
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

class TB extends TextBuilder {

    //Convenience

    static $(node: TextNode | string | undefined): TB {
        var builder = new TB(node);
        return builder;
    }
}

class TextNode {

    _string: string | undefined;
    private _childs: TextNode[] | undefined;

    private _outline: boolean = false;
    private _color: TextColor | undefined;

    constructor(arg: string | TextNode[] | undefined) {
        if (typeof arg === 'undefined') {
        } else if (typeof arg === 'string') {
            this._string = arg;
        } else {
            this._childs = arg;
        }
    }

    //Convenience

    static $(arg: string | TextNode[] | undefined = undefined): TextNode {
        var node = new TextNode(arg);
        return node;
    }

    //Private

    _isLeaf(): boolean {
        return typeof this._string !== 'undefined' || (typeof this._childs !== 'undefined' && this._childs.length === 0);
    }

    _isInternal(): boolean {
        return typeof this._childs !== 'undefined' && this._childs.length > 0;
    }

    _isInvalid(): boolean {
        return typeof this._string === 'undefined' && typeof this._childs === 'undefined';
    }

    _containdNodes(): TextNode[] {
        if (this._isLeaf()) {
            return [this];
        } else {
            return this._childs ?? [];
        }
    }

    _text(): string | undefined {
        if (this._isLeaf()) {
            return this._string;
        } else {
            return this._childs?.map(val => val._text()).join('');
        }
    }

    _unifyOutline(parentExist: boolean = false) {
        if ((this._isLeaf())) {
            if (parentExist) {
                this._string = this._string!.split("{OUTLINE}").join('')
                    .split("{OUTLINE_OFF}").join('')
            } else if (this._outline) {
                this._string = `{OUTLINE}${this._string}{OUTLINE_OFF}`;
            }
        } else if (this._isInternal()) {
            var childs = this._childs!;
            if (childs.length > 0) {
                var apply = parentExist || this._outline;
                for (var child of childs) {
                    child._unifyOutline(apply);
                }
                if (apply) {
                    childs[0]._string = `{OUTLINE}${childs[0]._string}`;
                    childs[childs.length - 1]._string = `${childs[childs.length - 1]._string}{OUTLINE_OFF}`;
                }
            }
        }
    }

    _unifyColor(parentColor: TextColor | undefined = undefined) {
        var color = this._color ?? parentColor;
        if ((this._isLeaf())) {
            if (typeof color !== 'undefined') {
                this._string = `{${color}}${this._string}`;
            }
        } else if (this._isInternal()) {
            for (var child of this._childs!) {
                child._unifyColor(color);
            }
        }
    }

    _description(depth: number = 0): string {
        var tabs = [...Array(depth)].map(val => "\t").join("");
        var childs = this._childs?.map(val => val._description(depth+1)).join("\n"+tabs)
        return `${tabs}| outline: ${this._outline} | color: ${this._color}\n\t${tabs}childs:${childs}`;
    }

    //Public

    append(val: TextNode): TextNode {
        var newParent = new TextNode([...this._containdNodes(), ...val._containdNodes()]);
        this.outline(false).color(undefined);
        return newParent.outline(this._outline).color(this._color);
    }

    outline(val: boolean = true): this {
        this._outline = val;
        return this;
    }

    color(val: TextColor | undefined): this {
        this._color = val;
        return this;
    }
}

class ImageNode extends TextNode {

    constructor(image: UIImage) {
        var imageId = image._frames[0];
        var head = Math.floor(imageId / (256 * 256));
        var section = Math.floor(imageId / 256);
        var item = imageId % 256;
        var string = `{INLINE_SPRITE}{${item}}{${section}}{${head}}{0}`;
        super(string);
    }

    //Convenience

    static $I(image: UIImage): ImageNode {
        var node = new ImageNode(image);
        return node;
    }
}

class NewlineNode extends TextNode {

    constructor(line: number = 1, isSmall: boolean = false) {
        var string = [...Array(line)].map((): string => isSmall ? "{NEWLINE_SMALLER}" : "{NEWLINE}").reduce((acc, val) => acc + val);
        super(string);
    }

    //Convenience

    static $NL(line: number = 1, isSmall: boolean = false): ImageNode {
        var node = new NewlineNode(line, isSmall);
        return node;
    }
}

class MoveNode extends TextNode {

    constructor(x: number) {
        var string = `{MOVE_X}{${x}}`;
        super(string);
    }
    
    //Convenience

    static $M(x: number): ImageNode {
        var node = new MoveNode(x);
        return node;
    }
}


interface String {
    format(format: TextFormat, ...arg: any[]): string;
}
String.prototype.format = function (format: TextFormat, ...arg: any[]): string {
    return context.formatString(`{${format}}`, this, ...arg);
}


interface Number {
    format(format: TextFormat, ...arg: any[]): string;
}

Number.prototype.format = function (format: TextFormat, ...arg: any[]): string {
    return context.formatString(`{${format}}`, this, ...arg);
}
