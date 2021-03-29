/// <reference path='../UICore/UISize.ts' />
/// <reference path='../UICore/TextFormat.ts' />

////////////////////////////////////////////////////////////////////////////////////

interface Array<T> {
    flatMap<T>(): T[];
    flatMapFunc<T>(d: number): T[];
    compactMap<T>(): T[];
}
Array.prototype.flatMapFunc = function <T>(d = 1): T[] {
    return d > 0 ? this.reduce((acc, val) => acc.concat(Array.isArray(val) ? val.flatMapFunc(d - 1) : val), []) : this.slice();
}
Array.prototype.flatMap = function <T>(): T[] {
    return this.flatMapFunc(1);
}
Array.prototype.compactMap = function <T>(): T[] {
    return this.filter((val) => val !== undefined);
}

//https://www.cloudhadoop.com/2018/10/guide-to-unique-identifiers-uuid-guid.html
function uuid(): string {
    var uuidValue = '', k, randomValue;
    for (k = 0; k < 32; k++) {
        randomValue = Math.random() * 16 | 0;
        if (k == 8 || k == 12 || k == 16 || k == 20) {
            uuidValue += '-';
        }
        uuidValue += (k == 12 ? 4 : (k == 16 ? (randomValue & 3 | 8) : randomValue)).toString(16);
    }
    return uuidValue;
}

type StaticThis<T> = { new(): T };

////////////////////////////////////////////////////////////////////////////////////

interface String {

    /**
     * Calculate the actual size of the string.
     * @returns size 
     */
    size(): UISize;
    containerSize(): UISize;
}
String.prototype.size = function (): UISize {
    const g = imageHelper.graphicsContext();
    
    var imageBounds = UISizeZero;

    const regex = new RegExp(/{INLINE_SPRITE}{(\d{1,3})}{\d{1,3}}{\d{1,3}}/g);
    const match = this.match(regex);
    if (match !== null) {
        console.log('WARNING: Images inserted in text may be displayed incorrectly.');

        const images = match.map(val => {
            const strings: string[] = val.split('{').map(val => val.split('}')).flatMap();
            const values = strings.filter((_, index) => index % 2 === 1);
            const id = parseInt(values[3]) * (256 * 256) + parseInt(values[2]) * 256 + parseInt(values[1]);
            return id;
        }) ?? [];

        imageBounds = images.map(val => {
            const size = g?.getImage(val);
            return <UISize>{
                width: size?.width ?? 0,
                height: size?.height ?? 0
            }
        }).reduce((acc, val) => {
            return {
                width: acc.width + val.width,
                height: Math.max(acc.height, val.height)
            }
        })
    }

    const splitted = this.split(regex);
    const textSize = g?.measureText(splitted.join('')) ?? UISizeZero;
    return {
        width: textSize.width + imageBounds.width,
        height: Math.max(textSize.height, imageBounds.height)
    }
}
String.prototype.containerSize = function (): UISize {
    const size = this.toString().size();
    return {
        width: size.width + 5,
        height: size.height + 5
    }
}

interface String {
    remove(...strings: string[]): string;
}
String.prototype.remove = function (...strings: string[]): string {
    var newString = this.toString();
    for (var string of strings) {
        newString = newString.split(string).join('');
    }
    return newString;
}

interface String {

    /**
     * Remove all formatting tags.
     * @returns string with formatting removed
     */
    toClearString(): string;
}
String.prototype.toClearString = function (): string {
    const strings: string[] = this.toString().split('{').map(val => val.split('}')).flatMap();
    const cleared = strings.filter((_, index) => index % 2 === 0).join('');
    return cleared;
}


interface String {

    /**
     * Format this string.
     * @param format 
     * @param arg 
     * @returns formatted string 
     */
    format(format: TextFormat, ...arg: any[]): string;
}
String.prototype.format = function (format: TextFormat, ...arg: any[]): string {
    return context.formatString(`{${format}}`, this, ...arg);
}


interface Number {
    
    /**
     * Format this number.
     * @param format 
     * @param arg 
     * @returns formatted string 
     */
    format(format: TextFormat, ...arg: any[]): string;
}
Number.prototype.format = function (format: TextFormat, ...arg: any[]): string {
    return context.formatString(`{${format}}`, this, ...arg);
}
