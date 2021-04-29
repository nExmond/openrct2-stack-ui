const UIOptionalSizeDefault: UIOptionalSize = {};

interface UIOptionalSize {
    width?: number;
    height?: number;
}


const UISizeZero: UISize = { width: 0, height: 0 };

interface UISize extends UIOptionalSize {
    width: number;
    height: number;
}