/// <reference path='../UICore/UISize.ts' />
/// <reference path='../UICore/TextFormat.ts' />

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

interface String {
    size(): UISize;
}
String.prototype.size = function (): UISize {
    return imageHelper.graphicsContext()?.measureText(this.toString()) ?? UISizeZero;
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
    toClearString(): string;
}
String.prototype.toClearString = function (): string {
    var strings: string[] = this.toString().split('{').map(val => val.split('}')).flatMap();
    var cleared = strings.filter((_, index) => index % 2 === 0).join('');
    return cleared;
}


interface String {
    format(format: TextFormat, ...arg: any[]): string;
}
String.prototype.format = function (format: TextFormat, ...arg: any[]): string {
    return context.formatString(`{${format}}`, this, ...arg);
}


interface Number {
    format(format: TextFormat, ...arg: any[]): string;
}
Number.prototype.format = function (format: TextFormat, ...arg: any[]): string {
    return context.formatString(`{${format}}`, this, ...arg);
}
