/// <reference path="../../UICore/UIPoint.ts" />

/**
 * A wrapper that contains and processes sprite information.
 */
class UIImage {

    _frames: number[] = [];
    _duration: number = 2;
    _baseOffset: UIPoint = UIPointZero;
    protected _offset: UIPoint = UIPointZero;

    /**
     * ! **Warning**: Instead of accessing the constructor directly, define it through *UIImage.$, UIImage.$A, UIImage.$F*.
     */
    constructor(frames: number[]) {
        this._frames = frames;
    }

    //Convenience

    /**
     * Define the image as a single sprite.
     * @param single sprite id
     */
    static $(single: number): UIImage {
        const image = new UIImage([single]);
        image._baseOffset = imageHelper.graphicsContext()?.getImage(single)?.offset ?? UIPointZero;
        return image;
    }

    /**
     * Define an animatable image with multiple sprites.
     * @param base sprite id as starting frame
     * @param count number of frames
     * @param duration Set the duration of the animation. Use seconds unit.
     */
    static $A(base: number, count: number, duration: number): UIImage {
        const frames = [...Array(count)].map((_, i) => base + i);
        const image = new UIImage(frames);
        image._baseOffset = imageHelper.graphicsContext()?.getImage(base)?.offset ?? UIPointZero;
        return image.duration(duration);
    }

    /**
     * Defines custom frame animatable images.
     * @param frames list of sprite id
     * @param duration Set the duration of the animation. Use seconds unit.
     */
    static $F(frames: number[], duration: number): UIImage {
        const image = new UIImage(frames);
        image._baseOffset = imageHelper.graphicsContext()?.getImage(frames[0])?.offset ?? UIPointZero;
        return image.duration(duration);
    }

    //Private

    _data(usingTab: boolean = false): number | ImageAnimation {
        const frameCount = this._frames.length;
        if (usingTab) {
            //연속된 프레임으로 이루어진 이미지인지 확인
            const isContiguous = this._frames.reduce((acc, val) => val === acc + 1 ? val : acc) == this._frames[this._frames.length - 1];
            return {
                frameBase: this._frames[0],
                frameCount: this._frames.length,
                frameDuration: this._duration,
                offset: {
                    x: this._baseOffset.x + this._offset.x,
                    y: this._baseOffset.y + this._offset.y
                }
            }
        } else {
            if (frameCount > 0) {
                return this._frames[0];
            } else {
                return -1;
            }
        }
    }

    _isAnimatable(): boolean {
        return this._frames.length > 1;
    }

    //Public

    /**
     * Set the duration of the animation. Use seconds unit.
     */
    duration(val: number): this {
        this._duration = val;
        return this;
    }

    getDuration(): number {
        return this._duration;
    }

    /**
     * Set the offset of the image.
     * * Currently, it is only valid for images applied to tabs.
     */
    offset(val: UIPoint): this {
        this._offset = val;
        return this;
    }
    
    getOffset(): UIPoint {
        return this._offset;
    }

    /**
     * Get the first sprite id of the image.
     */
    singleFrame(): number {
        return this._frames[0];
    }

    /**
     * Compare the sprite IDs that make up the image and the order of the same.
     */
    isEqual(val: UIImage): boolean {
        const left = this._frames.map(val => val.toString()).reduce((acc, val) => acc + '-' + val);
        const right = val._frames.map(val => val.toString()).reduce((acc, val) => acc + '-' + val);
        return left === right;
    }

    /**
     * Minimum size of the image
     * @returns size 
     */
    size(): UISize {
        const graphicsContext = imageHelper.graphicsContext();
        return this._frames.map(val => {
            const info = graphicsContext?.getImage(val);
            if (typeof info !== "undefined") {
                return <UISize>{
                    width: info.width + Math.max(info.offset.x, 0),
                    height: info.height + Math.max(info.offset.y, 0)
                }
            } else {
                return UISizeZero;
            }
        }).reduce((acc, val) => {
            return {
                width: Math.max(acc.width, val.width),
                height: Math.max(acc.height, val.height)
            }
        });
    }

    /**
     * Descriptions uiimage
     * @returns description 
     */
    description(): string {
        return "Duration: " + this._duration + "\nFrames: " + this._frames.map(val => val.toString()).reduce((acc, val) => acc + '-' + val);
    }

    /**
     * A string converted to a form usable in string.
     */
    string(): string {
        return this.singleFrame().imageString();
    }
}