/// <reference path='StringNode.ts' />

class ImageNode extends StringNode {

    _image: UIImage;

    constructor(image: UIImage) {
        var imageId = image._frames[0];
        var head = Math.floor(imageId / (256 * 256));
        var section = Math.floor(imageId / 256);
        var item = imageId % 256;
        var string = `{INLINE_SPRITE}{${item}}{${section}}{${head}}{0}`;
        super(string, false);

        this._image = image;
    }
}
