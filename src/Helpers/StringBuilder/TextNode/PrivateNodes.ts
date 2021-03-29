/// <reference path='StringNode.ts' />

/**
 * For internal use only.
 * Use line breaks by adding '**\n**' in *StringNode*.
 */
class _NewlineNode extends StringNode {

    constructor(isSmaller: boolean = false) {
        const string = isSmaller ? "{NEWLINE_SMALLER}{NEWLINE_SMALLER}" : "{NEWLINE}";
        super(string, false);
    }
}

/**
 * For internal use only.
 * Fonts can be specified in *TextBuilder*, *TextNode* and subclasses.
 */
class _FontNode extends StringNode {

    constructor(font: TextFont) {
        const string = `{${font}}`;
        super(string, false);
    }
}
