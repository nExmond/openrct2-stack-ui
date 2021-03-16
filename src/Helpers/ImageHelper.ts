
interface GraphicsContextWrapper {
    colour: number | undefined;
    secondaryColour: number | undefined;
    ternaryColour: number | undefined;
    paletteId: number | undefined;

    getImage(id: number): ImageInfo | undefined;
    measureText(text: string): ScreenSize;
}

class ImageHelper {

    private _graphicsContext: GraphicsContext | undefined;

    constructor() {
        this._open();
    }

    private _open() {
        var window = ui.openWindow({
            classification: "_GC_",
            x: 0,
            y: 0,
            width: 15,
            height: 15,
            title: '',
            widgets: [{
                x: 0,
                y: 0,
                width: 15,
                height: 15,
                type: "custom",
                onDraw: (g: GraphicsContext) => {
                    this._graphicsContext = g;
                    window.x = -20;
                }
            }],
            onClose: () => {
                context.setTimeout(() => {
                    this._open();
                }, 1);
            }
        });
    }

    graphicsContext(): GraphicsContextWrapper | undefined {
        return this._graphicsContext;
    }
}

const imageHelper = new ImageHelper();