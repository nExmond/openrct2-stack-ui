
class IntervalHelper {

    _delay: number;
    _block: (() => void);

    _currentInterval: number | undefined;

    constructor(delay: number, block: () => void) {
        this._delay = delay;
        this._block = block;
    }

    start(): this {
        this._currentInterval = context.setInterval(this._block, this._delay);
        return this;
    }

    end(): this {
        var intervalId = this._currentInterval;
        if (typeof intervalId !== 'undefined') {
            context.clearInterval(intervalId);
        }
        return this;
    }
}