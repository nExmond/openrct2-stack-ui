/// <reference path='../UICore/UIImage.ts' />

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

    //Public

    build(): string {

        this._root._unifyColor(this._color);
        this._root._unifyOutline(this._outline);

        var text = this._root._text();

        if (typeof text !== 'undefined') {
            if (typeof this._font !== 'undefined') {
                var fontClear = text.remove(TextFont.Tiny, TextFont.Small, TextFont.Medium, TextFont.Big);
                text = `{${this._font}}${fontClear}`;
            }
        }

        //convert newline
        //TODO: 태그에 의해 반으로 나뉘는 경우 이전 태그가 유지되지 않으므로, 줄바꿈 태그를 기준으로 같은 속성값을 갖는 두 노드로 나눈다.
        text = text.replace('\\N', "{NEWLINE}");
        text = text.replace('\\n', "{NEWLINE_SMALLER}");

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

class TB extends TextBuilder {};

class TextNode {

    private _childs: TextNode[] = [];

    private _outline: boolean = false;
    private _color: TextColor | undefined;

    constructor(childs: TextNode[]) {
        this._childs = childs;
    }

    //Convenience

    static $(...childs: TextNode[]): TextNode {
        var node = new TextNode(childs);
        return node;
    }

    static $S(string: string): StringNode {
        var node = new StringNode(string);
        return node;
    }

    static $I(image: UIImage): ImageNode {
        var node = new ImageNode(image);
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

    _unifyOutline(parentExist: boolean = false) {
        if (this._isLeaf() && this instanceof StringNode) {
            if (parentExist) {
                this._string = this._string.remove("{OUTLINE}").remove("{OUTLINE_OFF}")
            } else if (this._outline) {
                this._string = `{OUTLINE}${this._string}{OUTLINE_OFF}`;
            }
        } else if (this._isStopover()) {
            var childs = this._childs!;
            if (childs.length > 0) {
                var apply = parentExist || this._outline;
                for (var child of childs) {
                    child._unifyOutline(apply);
                }
                if (apply) {
                    var first = childs[0];
                    if (first instanceof StringNode) {
                        first._string = `{OUTLINE}${first._string}`;
                    }
                    var last = childs[childs.length - 1];
                    if (last instanceof StringNode) {
                        last._string = `${last._string}{OUTLINE_OFF}`;
                    }
                }
            }
        }
    }

    _unifyColor(parentColor: TextColor | undefined = undefined) {
        var color = this._color ?? parentColor;
        if (this._isLeaf() && this instanceof StringNode) {
            this._string = `{${color}}${this._string}`;
        } else if (this._isStopover()) {
            for (var child of this._childs!) {
                child._unifyColor(color);
            }
        }
    }

    _description(depth: number = 0): string {
        var tabs = [...Array(depth)].map(val => "\t").join('');
        var childs = this._childs?.map(val => val._description(depth + 1)).join('\n' + tabs)
        return `${tabs}| outline: ${this._outline} | color: ${this._color}\n\t${tabs}childs:${childs}`;
    }

    //Public

    outline(val: boolean = true): this {
        this._outline = val;
        return this;
    }

    color(val: TextColor | undefined): this {
        this._color = val;
        return this;
    }
}

class TN extends TextNode {};

class StringNode extends TextNode {

    _string: string;

    constructor(string: string) {
        super([]);
        this._string = string;
    }

    //Private

    _isValid(): boolean {
        return this._isLeaf();
    }

    _text(): string {
        return this._string;
    }
}

class ImageNode extends StringNode {

    constructor(image: UIImage) {
        var imageId = image._frames[0];
        var head = Math.floor(imageId / (256 * 256));
        var section = Math.floor(imageId / 256);
        var item = imageId % 256;
        var width = image.size().width;
        //TODO: 이미지가 텍스트 중간에 들어가는 경우? 앞 텍스트의 너비를 계산해서 수평 위치 지정, 다음 텍스트는 이미지의 너비만큼 띄운 후 그려지도록 해야 함!
        var string = `{INLINE_SPRITE}{${item}}{${section}}{${head}}{0}{MOVE_X}{${width}}`;
        super(string);
    }
}

interface String {
    remove(...strings: string[]): string;
}
String.prototype.remove = function (...strings: string[]): string {
    var newString = this.toString();
    for (var string of strings) {
        newString = newString.replace(string, '');
    }
    return newString;
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
