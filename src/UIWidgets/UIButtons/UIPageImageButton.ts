/// <reference path='UIButton.ts' />

class UIPageImageButton extends UIButton {

    _images: UIImage[];

    constructor(images: UIImage[]) {
        super();
        this._images = images;
    }

    //Convenience

    static $IP(...images: UIImage[]): UIPageImageButton {
        var button = new UIPageImageButton(images);
        var first = images.length > 0 ? images[0] : UIImageNone;
        return button
            .image(first)
            .size({ width: 24, height: 24 })
            .minSize({ width: 50, height: 15 });
    }

    //Public

    onPage(block: (button: this, image: UIImage) => void): this {
        var index = 0;
        return super._internalOnChange((button) => {
            index = (index + 1) % this._images.length;
            var image = this._images[index];
            button.updateUI((widget) => widget.image(image));
            block(button, image);
        });
    }
}
