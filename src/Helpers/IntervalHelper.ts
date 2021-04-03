
/**
 * Helper to repeat specific commands.
 */
class IntervalHelper {

    protected _intervalInfos: { [ui: string]: number } = {}; 

    constructor() {}

    /**
     * Start iteration
     * @param key unique string
     * @param delay milliseconds
     * @param block function to repeat
     */
    start(key: string, delay: number, block: () => void) {
        const id = context.setInterval(block, delay)
        this._intervalInfos[key] = id;
    }

    /**
     * Ent iteration
     * @param key unique string
     */
    end(key: string) {
        const id = this._intervalInfos[key]
        if (typeof id !== "undefined") {
            context.clearInterval(id);
            delete this._intervalInfos[key];
        }
    }
}

/**
 * Global access to *IntervalHelper*.
 */
const intervalHelper = new IntervalHelper();