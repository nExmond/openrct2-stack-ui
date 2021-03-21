/// <reference path='UIButton.ts' />

class UIPageImageButton extends UIButton {

    private _images: UIImage[];
    private _index = 0;
    private _onPage: ((button: this, image: UIImage) => void) | undefined;

    constructor(images: UIImage[]) {
        super();
        this._images = images;
    }

    //Convenience

    static $IP(...images: UIImage[]): UIPageImageButton {
        var button = new UIPageImageButton(images);
        var first = images.length > 0 ? images[0] : UIImageNone;
        const maxSize = images
            .map(val => val.size())
            .reduce((acc, val) => {
                return {
                    width: Math.max(acc.width, val.width),
                    height: Math.max(acc.height, val.height)
                }
            });
        const imageSize: UISize = {
            width: maxSize.width + 1,
            height: maxSize.height + 2
        }
        return button
            .image(first)
            .size(imageSize)
            .minSize(imageSize);
    }

    //Private

    protected _internalOnChange() {
        this._index = (this._index + 1) % this._images.length;
        var image = this._images[this._index];
        this.updateUI((widget) => widget.image(image));
        this._onPage?.call(this, this, image);
    }

    //Public

    onPage(block: (button: this, image: UIImage) => void): this {
        this._onPage = block;
        return this;
    }
}
