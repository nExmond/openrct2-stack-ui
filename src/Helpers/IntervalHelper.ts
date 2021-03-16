
class IntervalHelper {

    private _intervalInfos: { [ui: string]: number } = {}; 

    constructor() {}

    start(key: string, delay: number, block: () => void) {
        var id = context.setInterval(block, delay)
        this._intervalInfos[key] = id;
    }

    end(key: string) {
        var id = this._intervalInfos[key]
        context.clearInterval(id);
        delete this._intervalInfos[key];
    }
}

const intervalHelper = new IntervalHelper();