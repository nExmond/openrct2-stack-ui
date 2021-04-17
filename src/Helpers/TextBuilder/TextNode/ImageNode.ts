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
        const imageId = image.singleFrame();
        const string = imageId.imageString();
        super(string, false);
    }
}
