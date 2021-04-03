/// <reference path="StringNode.ts" />

/**
 * Single image node.
 * Adding this node allows you to display images between strings.
 */
class ImageNode extends StringNode {

    /**
     * Creates an instance of image node.
     * @param image 
     */
    constructor(image: UIImage) {
        const imageId = image._frames[0];
        const head = Math.floor(imageId / (256 * 256));
        const section = Math.floor(imageId / 256);
        const item = imageId % 256;
        const string = `{INLINE_SPRITE}{${item}}{${section}}{${head}}{0}`;
        super(string, false);
    }
}
