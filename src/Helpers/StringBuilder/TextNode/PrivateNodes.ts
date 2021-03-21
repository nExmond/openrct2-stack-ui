/// <reference path='StringNode.ts' />

class _NewlineNode extends StringNode {

    constructor(isSmaller: boolean = false) {
        const string = isSmaller ? "{NEWLINE_SMALLER}{NEWLINE_SMALLER}" : "{NEWLINE}";
        super(string, false);
    }
}

class _FontNode extends StringNode {

    constructor(font: TextFont) {
        const string = `{${font}}`;
        super(string, false);
    }
}
