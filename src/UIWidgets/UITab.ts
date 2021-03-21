/// <reference path='UIWidget.ts' />

class UITab {

    _minSize: UISize = UISizeZero;
    _maxSize: UISize = { width: ui.width, height: ui.height };

    _spacing: number | undefined;
    _padding: UIEdgeInsets | undefined;
    _isExpandable: boolean = false;

    protected _image: UIImage;
    _contentView: UIStack;

    constructor(contentView: UIStack, image: UIImage | undefined = undefined) {
        this._image = image ?? UIImageNone;
        this._contentView = contentView;
    }

    //Convenience

    static $(...widgets: UIWidget<any>[]): UITab {
        const stack = new UIStack(UIAxis.Vertical, widgets);
        const tab = new UITab(stack);
        return tab;
    }

    //Private

    _data(): WindowTabDesc {
        return {
            image: this._image._data(),
            widgets: this._contentView._getWidgets()
        }
    }

    _build() {
        var estimatedSize = this._contentView._estimatedSize();
        this._contentView._layout(UIAxis.Vertical, UIPointZero, estimatedSize);
        this._contentView._build();
    }

    //Public

    spacing(val: number): this {
        this._spacing = val;
        return this;
    }

    padding(val: UIEdgeInsets): this {
        this._padding = val;
        return this;
    }

    isExpandable(val: boolean): this {
        this._isExpandable = val;
        return this;
    }

    maxSize(val: UISize): this {
        this._maxSize = val;
        return this;
    }

    image(val: UIImage): this {
        this._image = val;
        return this;
    }
    
    bind(proxy: UITabProxy): this {
        proxy._bind(this);
        return this;
    }
}
