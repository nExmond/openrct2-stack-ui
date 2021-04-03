/// <reference path='UIButton.ts' />

/**
 * Button to switch to the next image when clicked.
 */
class UIPageImageButton extends UIButton {

    protected _images: UIImage[];
    protected _index = 0;
    protected _onPage: ((button: this, image: UIImage) => void) | undefined;

    /**
     * Creates an instance of page image button.
     * @param images 
     */
    constructor(images: UIImage[]) {
        super();
        this._images = images;
    }

    //Convenience

    /**
     * Create *UIPageImageButton* instance without using new.
     */
    static $IP(...images: UIImage[]): UIPageImageButton {
        const button = new UIPageImageButton(images);
        const first = images.length > 0 ? images[0] : UIImageNone;
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
        const image = this._images[this._index];
        this.updateUI((widget) => widget.image(image));
        this._onPage?.call(this, this, image);
    }

    //Public

    getImages(): UIImage[] {
        return this._images;
    }

    getCurrentIndex(): number {
        return this._index;
    }

    /**
     * Observe for changes to the image displayed on the button.
     * @param block
     */
    onPage(block: (button: this, image: UIImage) => void): this {
        this._onPage = block;
        return this;
    }
}
