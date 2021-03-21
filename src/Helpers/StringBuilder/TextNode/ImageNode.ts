/// <reference path='StringNode.ts' />

class ImageNode extends StringNode {

    constructor(image: UIImage) {
        const imageId = image._frames[0];
        const head = Math.floor(imageId / (256 * 256));
        const section = Math.floor(imageId / 256);
        const item = imageId % 256;
        const string = `{INLINE_SPRITE}{${item}}{${section}}{${head}}{0}`;
        super(string, false);
    }
}
