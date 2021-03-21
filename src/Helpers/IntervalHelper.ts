
class IntervalHelper {

    protected _intervalInfos: { [ui: string]: number } = {}; 

    constructor() {}

    start(key: string, delay: number, block: () => void) {
        const id = context.setInterval(block, delay)
        this._intervalInfos[key] = id;
    }

    end(key: string) {
        const id = this._intervalInfos[key]
        if (typeof id !== 'undefined') {
            context.clearInterval(id);
            delete this._intervalInfos[key];
        }
    }
}

const intervalHelper = new IntervalHelper();