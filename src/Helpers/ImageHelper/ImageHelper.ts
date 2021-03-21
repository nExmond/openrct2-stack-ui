/// <reference path='GraphicsContextWrapper.ts' />

class ImageHelper {

    protected _graphicsContext: GraphicsContext | undefined;
    protected _timeoutId: number | undefined;

    constructor() {
        this._open();
    }

    protected _open() {       
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
                const timeoutId = context.setTimeout(() => {
                    this._open();
                    context.clearTimeout(timeoutId);
                }, 1);
            }
        });
        console.log("A custom widget that supports GraphicsContext has been opened."); 
    }

    /**
     * Graphics context
     * @returns context 
     */
    graphicsContext(): GraphicsContextWrapper | undefined {
        return this._graphicsContext;
    }
}

const imageHelper = new ImageHelper();