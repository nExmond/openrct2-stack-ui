class UIImage {

    _frames: number[] = [];
    _duration: number = 2;
    _offset: UIPoint = UIPointZero;

    constructor(frames: number[]) {
        this._frames = frames;
    }

    //Convenience

    static $(single: number): UIImage {
        var image = new UIImage([single]);
        return image;
    }

    static $A(base: number, count: number): UIImage {
        var frames = [...Array(count)].map((_, i) => base + i);
        var image = new UIImage(frames);
        return image;
    }

    static $F(frames: number[]): UIImage {
        var image = new UIImage(frames);
        return image;
    }

    //Private

    _data(): number | ImageAnimation {
        var frameCount = this._frames.length;
        if (frameCount > 1) {
            var isContiguous = this._frames.reduce((acc, val) => val === acc + 1 ? val : acc) == this._frames[this._frames.length - 1];
            if (isContiguous) {
                return {
                    frameBase: this._frames[0],
                    frameCount: this._frames.length,
                    frameDuration: this._duration,
                    offset: this._offset
                }
            } else {
                return -1;
            }
        } else if (frameCount > 0) {
            return this._frames[0];
        } else {
            return -1;
        }
    }

    _isAnimatable(): boolean {
        return this._frames.length > 1;
    }

    //Public

    duration(val: number): this {
        this._duration = val;
        return this;
    }

    offset(val: UIPoint): this {
        this._offset = val;
        return this;
    }
}

//UIImage constants
const UIImageNone = UIImage.$(-1);

// const UIImage = UIImage.$();
// TODO: -

//TAB
const UIImageTabParkEntrance = UIImage.$(5200);
const UIImageTabGears = UIImage.$A(5201, 4);
const UIImageTabWrench = UIImage.$A(5205, 16);
const UIImageTabPaint = UIImage.$A(5221, 8);
const UIImageTabTimer = UIImage.$A(5229, 8);
const UIImageTabGraphA = UIImage.$A(5237, 8);
const UIImageTabGraph = UIImage.$A(5245, 8);
const UIImageTabAdmission = UIImage.$A(5253, 8);
const UIImageTabFinancesSummary = UIImage.$A(5261, 8);
const UIImageTabThoughts = UIImage.$A(5269, 8);
const UIImageTabStats = UIImage.$A(5277, 7);

const UIImageTabStaffOptions = UIImage.$A(5318, 8);
const UIImageTabGuestInventory = UIImage.$(5326);
const UIImageTabFinancesResearch = UIImage.$A(5327, 8);
const UIImageTabMusic = UIImage.$A(5335, 16);
const UIImageTabShopsAndStalls = UIImage.$A(5351, 16);
const UIImageTabKiosksAndFacilities = UIImage.$A(5367, 8);

const UIImageTabFinancesFinancialGraph = UIImage.$A(5375, 16);
const UIImageTabFinancesProfitGraph = UIImage.$A(5391, 16);
const UIImageTabFinancesValueGraph = UIImage.$A(5407, 16);
const UIImageTabFinancesMarketing = UIImage.$A(5423, 16);

const UIImageTabRide = UIImage.$A(5442, 16);
const UIImageTabRideOne = UIImage.$(5448);

const UIImageTabSceneryTrees = UIImage.$(5459);
const UIImageTabSceneryUrban = UIImage.$(5460);
const UIImageTabSceneryWalls = UIImage.$(5461);
const UIImageTabScenerySignage = UIImage.$(5462);
const UIImageTabSceneryPaths = UIImage.$(5463);
const UIImageTabSceneryPathItems = UIImage.$(5464);
const UIImageTabSceneryStatues = UIImage.$(5465);

const UIImageTabPark = UIImage.$(5466);
const UIImageTabWater = UIImage.$(5467);
const UIImageTabStatsOne = UIImage.$(5468);

// const UIImageTab = UIImage.$A();
// TODO: -

//PEEP
const UIImagePeepLargeFaceVeryVeryUnhappy = UIImage.$(5284);
const UIImagePeepLargeFaceVeryUnhappy = UIImage.$(5285);
const UIImagePeepLargeFaceUnhappy = UIImage.$(5286);
const UIImagePeepLargeFaceNormal = UIImage.$(5287);
const UIImagePeepLargeFaceHappy = UIImage.$(5288);
const UIImagePeepLargeFaceVeryHappy = UIImage.$(5289);
const UIImagePeepLargeFaceVeryVeryHappy = UIImage.$(5290);
const UIImagePeepLargeFaceTired = UIImage.$(5291);
const UIImagePeepLargeFaceVeryTired = UIImage.$(5292);
const UIImagePeepLargeFaceSick = UIImage.$(5293);
const UIImagePeepLargeFaceVerySick = UIImage.$A(5294, 4);
const UIImagePeepLargeFaceVeryVerySick = UIImage.$A(5298, 16);
const UIImagePeepLargeFaceAngry = UIImage.$A(5314, 4);
