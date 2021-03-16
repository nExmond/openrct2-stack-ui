
class ImageHelper {

    private _graphincsContext!: GraphicsContext;

    constructor() {
        var widget = <CustomWidget>{
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            isDisabled: true,
            isVisible: true,
            type: "custom",
            onDraw: (g: GraphicsContext) => {
                this._graphincsContext = g;
            }
        }

        var window = <WindowDesc>{
            classification: '',
            x: -100,
            y: 0,
            width: 0,
            height: 0,
            title: '',
            widgets: [widget]
        }

        ui.openWindow(window).close();
    }

    //Public
    getImage(id: number): ImageInfo | undefined {
        return this._graphincsContext.getImage(id);
    }

    measureText(text: string): UISize {
        return this._graphincsContext.measureText(text);
    }
}

//TODO: _graphincsContext 할당이 제대로 되는 지 확인 필요
const imageHelper = new ImageHelper();