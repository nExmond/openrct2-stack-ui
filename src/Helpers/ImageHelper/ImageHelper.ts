/// <reference path="GraphicsContextWrapper.ts" />

/**
 * Helper for image processing
 */
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
            title: "",
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
     * ! Since you get *GraphicsContext* in an unusual way, it can be undefined for a very short time.
     * @returns graphics context
     */
    graphicsContext(): GraphicsContextWrapper | undefined {
        return this._graphicsContext;
    }
}

const imageHelper = new ImageHelper();