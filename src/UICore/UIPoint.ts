const UIOptionalPointDefault: UIOptionalPoint = {};

interface UIOptionalPoint { 
    x?: number;
    y?: number;
}


const UIPointZero: UIPoint = { x: 0, y: 0 };

interface UIPoint extends UIOptionalPoint {
    x: number;
    y: number;
 }
