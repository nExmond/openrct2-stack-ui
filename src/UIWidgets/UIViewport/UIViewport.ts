/// <reference path='../UIWidget.ts' />
/// <reference path='UIViewportFlag.ts' />
/// <reference path='UIViewportScale.ts' />

class UIViewport extends UIWidget<ViewportWidget> {

    _viewport!: Viewport;
    _zoom: UIViewportScale = UIViewportScale.One;
    _visibilityFlags: UIViewportFlag = UIViewportFlag.None;

    _position: CoordsXY | CoordsXYZ = ui.mainViewport.getCentrePosition();

    constructor() {
        super();
    }

    //Convenience

    static $(): UIViewport {
        var viewport = new UIViewport();
        return viewport
            .minSize({ width: 165, height: 120 });
    }

    //Private

    _build() {
        this._viewport = <Viewport>{
            left: this._origin.x,
            top: this._origin.y,
            right: this._origin.x + (this._size.width ?? 0),
            bottom: this._origin.y + (this._size.height ?? 0),
            rotation: ui.mainViewport.rotation,
            zoom: ui.mainViewport.zoom,
            visibilityFlags: this._visibilityFlags
        }
        this._widget = {
            ...this._buildBaseValues(),
            type: 'viewport',
            viewport: this._viewport
        }
    }

    _update(widget: ViewportWidget) {
        super._update(widget);
        this._viewport.left = this._origin.x;
        this._viewport.top = this._origin.y;
        this._viewport.right = this._origin.x + (this._size.width ?? 0);
        this._viewport.bottom = this._origin.y + (this._size.height ?? 0);
        this._viewport.zoom = this._zoom;
        this._viewport.visibilityFlags = this._visibilityFlags;
        this.moveTo(this._position);
    }

    _loadWidget() {
        super._loadWidget();

        this._viewport = this._widget.viewport!;

        this._zoom = ui.mainViewport.zoom;
        this._viewport.zoom = this._zoom;

        this._viewport.visibilityFlags = this._visibilityFlags;

        this._position = ui.mainViewport.getCentrePosition();
        this.moveTo(this._position);
    }

    //Public

    position(val: CoordsXY | CoordsXYZ): this {
        this._position = val;
        return this;
    }

    zoom(val: UIViewportScale): this {
        this._zoom = val;
        return this;
    }

    flags(val: UIViewportFlag): this {
        this._visibilityFlags = val;
        return this;
    }

    getCenterPosition(): CoordsXY | undefined {
        return this._viewport.getCentrePosition();
    }

    moveTo(val: CoordsXY | CoordsXYZ) {
        this._position = val;
        this._viewport.moveTo(val);
    }

    scrollTo(val: CoordsXY | CoordsXYZ) {
        this._position = val;
        this._viewport.scrollTo(val);
    }

    scrollToMainViewportCenter() {
        this.scrollTo(ui.mainViewport.getCentrePosition());
    }

    mainViewportScrollToThis() {
        if (typeof this._viewport !== 'undefined') {
            ui.mainViewport.scrollTo(this.getCenterPosition()!);
        }
    }
}
