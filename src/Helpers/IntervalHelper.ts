
/**
 * Helper to repeat specific commands.
 */
class IntervalHelper {

    protected _intervalInfos: { [ui: string]: { id: number, delay: number, block: () => void , enabled: boolean } } = {}; 

    constructor() {}

    /**
     * Start iteration
     * @param key unique string
     * @param delay milliseconds
     * @param block function to repeat
     */
    start(key: string, delay: number, block: () => void) {
        // const id = context.setInterval(block, delay);
        // this._intervalInfos[key] = { id: id, delay: delay, block: block, enabled: true };
        this._intervalInfos[key] = { id: -1, delay: delay, block: block, enabled: false };
    }

    /**
     * Switch activate iteration
     * @param key unique string
     * @param flag
     */
    enabled(key: string, flag: boolean) {
        const info = this._intervalInfos[key]
        if (typeof info !== "undefined") {
            if (info.enabled !== flag) {
                info.enabled = flag;
                if (flag) {
                    info.id = context.setInterval(info.block, info.delay);
                } else {
                    context.clearInterval(info.id);
                }
            }
        }
    }

    /**
     * End iteration
     * @param key unique string
     */
    end(key: string) {
        const info = this._intervalInfos[key]
        if (typeof info !== "undefined") {
            context.clearInterval(info.id);
            delete this._intervalInfos[key];
        }
    }
}

/**
 * Global access to *IntervalHelper*.
 */
const intervalHelper = new IntervalHelper();