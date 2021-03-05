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

    static $A(base: number, count: number, duration: number): UIImage {
        var frames = [...Array(count)].map((_, i) => base + i);
        var image = new UIImage(frames);
        return image.duration(duration);
    }

    static $F(frames: number[], duration: number): UIImage {
        var image = new UIImage(frames);
        return image.duration(duration);
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

    singleFrame(): number {
        return this._frames[0];
    }

    isImage(val: UIImage): boolean {
        var left = this._frames.map((val) => val.toString()).reduce((acc, val) => acc + '-' + val);
        var right = val._frames.map((val) => val.toString()).reduce((acc, val) => acc + '-' + val);
        return left === right;
    }

    description(): string {
        return 'Duration: '+this._duration+'\nFrames: '+this._frames.map((val) => val.toString()).reduce((acc, val) => acc + '-' + val);
    }
}

//UIImage constants
const UIImageNone = UIImage.$(-1);

//Ride
const UIImageRideConstructionStraight = UIImage.$(5137);
const UIImageRideConstructionLeftCurve = UIImage.$(5138);
const UIImageRideConstructionRightCurve = UIImage.$(5139);
const UIImageRideConstructionLeftCurveSmall = UIImage.$(5140);
const UIImageRideConstructionRightCurveSmall = UIImage.$(5141);
const UIImageRideConstructionLeftCurveLarge = UIImage.$(5142);
const UIImageRideConstructionRightCurveLarge = UIImage.$(5143);
const UIImageRideConstructionSlopeDownSteep = UIImage.$(5144);
const UIImageRideConstructionSlopeDown = UIImage.$(5145);
const UIImageRideConstructionSlopeLevel = UIImage.$(5146);
const UIImageRideConstructionSlopeUp = UIImage.$(5147);
const UIImageRideConstructionSlopeUpSteep = UIImage.$(5148);
const UIImageRideConstructionVerticalRise = UIImage.$(5149);
const UIImageRideConstructionVerticalDrop = UIImage.$(5150);
const UIImageRideConstructionHelixDown = UIImage.$(5151);
const UIImageRideConstructionHelixUp = UIImage.$(5152);
const UIImageRideConstructionLeftBank = UIImage.$(5153);
const UIImageRideConstructionNoBank = UIImage.$(5154);
const UIImageRideConstructionRightBank = UIImage.$(5155);
const UIImageRideConstructionUShapedTrack = UIImage.$(5156);
const UIImageRideConstructionOShapedTrack = UIImage.$(5157);
const UIImageRideConstructionRCTrack = UIImage.$(5158);
const UIImageRideConstructionWaterChannel = UIImage.$(5159);
const UIImagePrevious = UIImage.$(5160);
const UIImageNext = UIImage.$(5161);
const UIImageDemolishCurrentSection = UIImage.$(5162);
const UIImageChainLift = UIImage.$(5163);
const UIImageConstruction = UIImage.$(5164);
const UIImageDemolish = UIImage.$(5165);
const UIImageHearingViewport = UIImage.$(5166);
const UIImageLocate = UIImage.$(5167);
const UIImageRename = UIImage.$(5168);
const UIImageRotateArrow = UIImage.$(5169);
const UIImageMirrorArrow = UIImage.$(5170);
const UIImageScenery = UIImage.$(5171);
const UIImageSceneryCluster = UIImage.$(5172);
const UIImagePaintbrush = UIImage.$(5173);
const UIImagePickup = UIImage.$(5174);
const UIImagePatrol = UIImage.$(5175);
const UIImageBuyLandRights = UIImage.$(5176);
const UIImageBuyConstructionRights = UIImage.$(5177);
const UIImageNoEntry = UIImage.$(5178);
const UIImageClosed = UIImage.$(5179);
const UIImageOpen = UIImage.$(5180);
const UIImageTesting = UIImage.$(5181);
const UIImageToggleOpenClose = UIImage.$(5182);
const UIImageFloppy = UIImage.$(5183);
const UIImageShowGuestsThoughtsAboutThisRideAttraction = UIImage.$(5184);
const UIImageShowGuestsQueuingForThisRideAttraction = UIImage.$(5185);
const UIImageShowGuestsOnThisRideAttraction = UIImage.$(5186);
const UIImageRide = UIImage.$(5187);
const UIImageTrackPeep = UIImage.$(5188);
const UIImageNewRide = UIImage.$(5189);
const UIImageFinance = UIImage.$(5190);
const UIImageNewScenery = UIImage.$(5191);
const UIImageMap = UIImage.$(5192);
const UIImageGuests = UIImage.$(5193);
const UIImageAward = UIImage.$(5194);
const UIImageGraph = UIImage.$(5195);
const UIImageMechanic = UIImage.$(5196);
const UIImageParkEntrance = UIImage.$(5197);

//Tab
const UIImageTabParkEntrance = UIImage.$(5200);
const UIImageTabGears = UIImage.$A(5201, 4, 2);
const UIImageTabWrench = UIImage.$A(5205, 16, 2);
const UIImageTabPaint = UIImage.$A(5221, 8, 4);
const UIImageTabTimer = UIImage.$A(5229, 8, 8);
const UIImageTabGraphA = UIImage.$A(5237, 8, 4);
const UIImageTabGraph = UIImage.$A(5245, 8, 4);
const UIImageTabAdmission = UIImage.$A(5253, 8, 2);
const UIImageTabFinancesSummary = UIImage.$A(5261, 8, 2);
const UIImageTabThoughts = UIImage.$A(5269, 8, 2);
const UIImageTabStats = UIImage.$A(5277, 7, 4);

const UIImageTabStaffOptions = UIImage.$A(5318, 7, 2);
const UIImageTabStaffOptionsOne = UIImage.$(5325);
const UIImageTabGuestInventory = UIImage.$(5326);
const UIImageTabFinancesResearch = UIImage.$A(5327, 8, 2);
const UIImageTabMusic = UIImage.$A(5335, 16, 2);
const UIImageTabShopsAndStalls = UIImage.$A(5351, 16, 4);
const UIImageTabKiosksAndFacilities = UIImage.$A(5367, 8, 4);

const UIImageTabFinancesFinancialGraph = UIImage.$A(5375, 16, 2);
const UIImageTabFinancesProfitGraph = UIImage.$A(5391, 16, 2);
const UIImageTabFinancesValueGraph = UIImage.$A(5407, 16, 2);
const UIImageTabFinancesMarketing = UIImage.$A(5423, 19, 2);

const UIImageTabRide = UIImage.$A(5442, 16, 4);
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

//여기부터
const UIImageTabObjective = UIImage.$A(5511, 16, 2);
const UIImageTabAwards = UIImage.$(5527);
const UIImageTabRidesShop = UIImage.$A(5530, 7, 4);
const UIImageTabRidesTransport = UIImage.$A(5537, 5, 4);
const UIImageTabRidesGentle = UIImage.$A(5542, 4, 4);
const UIImageTabRidesRollerCoasters = UIImage.$A(5546, 5, 4);
const UIImageTabRidesWater = UIImage.$A(5551, 6, 4);
const UIImageTabRidesThrill = UIImage.$A(5557, 7, 4);
const UIImageTabGuests = UIImage.$A(5568, 8, 4);

const UIImageTabLand = UIImage.$(29362);
const UIImageTabNews = UIImage.$(29414);
//여기까지 duration 미정

//Peep
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
const UIImagePeepLargeFaceVerySick = UIImage.$A(5294, 4, 8);
const UIImagePeepLargeFaceVeryVerySick = UIImage.$A(5298, 16, 4);
const UIImagePeepLargeFaceAngry = UIImage.$A(5314, 4, 8);
