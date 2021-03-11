enum UIFont {
    Tiny = "TINYFONT",
    Small = "SMALLFONT",
    Medium = "MEDIUMFONT",
    Big = "BIGFONT"
}

enum UITextColor {
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

enum UITextFormat {
    Comma16 = "COMMA16",
    Comma32 = "COMMA32",
    Comma1dp16 = "COMMA1DP16",
    Comma2dp32 = "COMMA2DP32",
    
    Int32 = "Int32",
    UInt16 = "UINT16",

    Currency = "CURRENCY",
    Currency2dp = "CURRENCY2DP",

    StringId = "STRINGID",
    String = "STRING",

    MonthYear = "MONTHYEAR",
    Month = "MONTH",

    DurationShort = "DURATION",
    DurationLong = "REALTIME",

    Velocity = "VELOCITY",

    Length = "LENGTH",

    PUSH16 = "PUSH16",
    Pop16 = "POP16"
}

class TextBuilder {

    constructor() {

    }

    build(): string {
        return "";
    }

    newLine(line: number = 1, isSmall: boolean = false): this {
        return this;
        //NEWLINE
        //NEWLINE_SMALLER
    }

    font(val: UIFont, chain: TextBuilder): this {
        return this;
    }

    color(val: UITextColor, chain: TextBuilder): this {
        return this;
    }

    outline(chain: TextBuilder): this {
        return this;
        //OUTLINE
        //OUTLINE_OFF
    }

    image(val: UIImage, isInline: boolean = true): this {
        return this;
        //INLINE_SPRITE
        //SPRITE
    }

    format(val: any, format: UITextFormat): this {
        return this;
    }

    move(val: number): this {
        return this;
        //MOVE_X
    }
}