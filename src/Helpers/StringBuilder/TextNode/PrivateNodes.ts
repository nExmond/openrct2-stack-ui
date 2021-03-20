/// <reference path='StringNode.ts' />

class _NewlineNode extends StringNode {

    constructor(isSmaller: boolean = false) {
        var string = isSmaller ? "{NEWLINE_SMALLER}{NEWLINE_SMALLER}" : "{NEWLINE}";
        super(string, false);
    }
}

class _FontNode extends StringNode {

    constructor(font: TextFont) {
        var string = `{${font}}`;
        super(string, false);
    }
}
