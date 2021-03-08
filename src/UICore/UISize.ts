
const UIOptionalSizeDefulat: UIOptionalSize = { width: undefined, height: undefined };

interface UIOptionalSize {
    width: number | undefined;
    height: number | undefined;
}


const UISizeZero: UISize = { width: 0, height: 0 };

interface UISize extends UIOptionalSize {
    width: number;
    height: number;
}