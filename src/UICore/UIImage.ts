/// <reference path='../UICore/UIPoint.ts' />

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

const UIImageTabObjective = UIImage.$A(5511, 16, 4);
const UIImageTabAwards = UIImage.$(5527);
const UIImageTabRidesShop = UIImage.$A(5530, 7, 4);
const UIImageTabRidesTransport = UIImage.$A(5537, 5, 4);
const UIImageTabRidesGentle = UIImage.$A(5542, 4, 8);
const UIImageTabRidesRollerCoasters = UIImage.$A(5546, 5, 2);
const UIImageTabRidesWater = UIImage.$A(5551, 6, 4);
const UIImageTabRidesThrill = UIImage.$F([5562, 5563, 5562, 5561, 5560, 5559, 5558, 5557, 5557, 5557, 5557, 5557, 5557, 5557, 5557, 5557, 5558, 5559, 5560, 5561, ], 4)
const UIImageTabGuests = UIImage.$A(5568, 8, 4);

const UIImageTabLand = UIImage.$(29362);
const UIImageTabNews = UIImage.$(29414);

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

//Texture
const UIImageFloorTextureGrass = UIImage.$(5579);
const UIImageFloorTextureSand = UIImage.$(5580);
const UIImageFloorTextureDirt = UIImage.$(5581);
const UIImageFloorTextureRock = UIImage.$(5582);
const UIImageFloorTextureMartian = UIImage.$(5583);
const UIImageFloorTextureCheckerboard = UIImage.$(5584);
const UIImageFloorTextureGrassClumps = UIImage.$(5585);
const UIImageFloorTextureIce = UIImage.$(5586);
const UIImageFloorTextureGridRed = UIImage.$(5587);
const UIImageFloorTextureGridYellow = UIImage.$(5588);
const UIImageFloorTextureGridBlue = UIImage.$(5589);
const UIImageFloorTextureGridGreen = UIImage.$(5590);
const UIImageFloorTextureSandDark = UIImage.$(5591);
const UIImageFloorTextureSandLight = UIImage.$(5592);
const UIImageWallTextureRock = UIImage.$(5593);
const UIImageWallTextureWoodRed = UIImage.$(5594);
const UIImageWallTextureWoodBlack = UIImage.$(5595);
const UIImageWallTextureIce = UIImage.$(5596);

//Construction
const UIImageMazeConstructionMove = UIImage.$(5577);
const UIImageConstructionDirectionNE = UIImage.$(5635);
const UIImageConstructionDirectionSE = UIImage.$(5636);
const UIImageConstructionDirectionSW = UIImage.$(5637);
const UIImageConstructionDirectionNW = UIImage.$(5638);
const UIImageConstructionFootpathLand = UIImage.$(5639);
const UIImageConstructionFootpathBridge = UIImage.$(5640);

//??
const UIImageFirecracker = UIImage.$A(22927, 28, 2);

//Land
const UIImageLandOwnershipAvailable = UIImage.$(22955);
const UIImageLandConstructionRightsAvailable = UIImage.$(22956);

//Weather
const UIImageNextWeather = UIImage.$(23189);
const UIImageWeatherSun = UIImage.$(23190);
const UIImageWeatherSunCloud = UIImage.$(23191);
const UIImageWeatherCloud = UIImage.$(23192);
const UIImageWeatherLightRain = UIImage.$(23193);
const UIImageWeatherHeavyRain = UIImage.$(23194);
const UIImageWeatherStorm = UIImage.$(23195);
const UIImageWeatherSnow = UIImage.$(23196);

//Rating
const UIImageRatingLow = UIImage.$(23197);
const UIImageRatingHigh = UIImage.$(23198);


//Menu
const UIImageMenuCheckmark = UIImage.$(23199);
const UIImageMenuNewGame = UIImage.$(23207);
const UIImageMenuLoadGame = UIImage.$(23208);
const UIImageMenuTutorial = UIImage.$(23209);
const UIImageMenuExit = UIImage.$(23210);
const UIImageMenuToolbox = UIImage.$(23211);
const UIImageMenuLogo = UIImage.$(23212);
const UIImageMenuLogoSmall = UIImage.$(23213);

//Flat Texture
const UIImageFlatTextureGrass1 = UIImage.$(28959);
const UIImageFlatTextureGrass2 = UIImage.$(28960);
const UIImageFlatTextureGrass3 = UIImage.$(28961);
const UIImageFlatTextureGrass4 = UIImage.$(28962);
const UIImageFlatTextureGrass5 = UIImage.$(28963);
const UIImageFlatTextureGrass6 = UIImage.$(28964);

const UIImageFlatTextureSandLight1 = UIImage.$(28965);
const UIImageFlatTextureSandLight2 = UIImage.$(28966);
const UIImageFlatTextureSandLight3 = UIImage.$(28967);
const UIImageFlatTextureSandLight4 = UIImage.$(28968);
const UIImageFlatTextureSandLight5 = UIImage.$(28969);
const UIImageFlatTextureSandLight6 = UIImage.$(28970);

const UIImageFlatTextureSandDark1 = UIImage.$(28971);
const UIImageFlatTextureSandDark2 = UIImage.$(28972);
const UIImageFlatTextureSandDark3 = UIImage.$(28973);
const UIImageFlatTextureSandDark4 = UIImage.$(28974);
const UIImageFlatTextureSandDark5 = UIImage.$(28975);
const UIImageFlatTextureSandDark6 = UIImage.$(28976);

const UIImageFlatTextureDirt1 = UIImage.$(28977);
const UIImageFlatTextureDirt2 = UIImage.$(28978);
const UIImageFlatTextureDirt3 = UIImage.$(28979);
const UIImageFlatTextureDirt4 = UIImage.$(28980);
const UIImageFlatTextureDirt5 = UIImage.$(28981);
const UIImageFlatTextureDirt6 = UIImage.$(28982);

const UIImageFlatTextureSand1 = UIImage.$(28983);
const UIImageFlatTextureSand2 = UIImage.$(28984);
const UIImageFlatTextureSand3 = UIImage.$(28985);
const UIImageFlatTextureSand4 = UIImage.$(28986);
const UIImageFlatTextureSand5 = UIImage.$(28987);
const UIImageFlatTextureSand6 = UIImage.$(28988);

const UIImageFlatTextureRock1 = UIImage.$(28989);
const UIImageFlatTextureRock2 = UIImage.$(28990);
const UIImageFlatTextureRock3 = UIImage.$(28991);
const UIImageFlatTextureRock4 = UIImage.$(28992);
const UIImageFlatTextureRock5 = UIImage.$(28993);
const UIImageFlatTextureRock6 = UIImage.$(28994);

const UIImageFlatTextureMartian1 = UIImage.$(28995);
const UIImageFlatTextureMartian2 = UIImage.$(28996);
const UIImageFlatTextureMartian3 = UIImage.$(28997);
const UIImageFlatTextureMartian4 = UIImage.$(28998);
const UIImageFlatTextureMartian5 = UIImage.$(28999);
const UIImageFlatTextureMartian6 = UIImage.$(29000);

const UIImageFlatTextureGrassClumps1 = UIImage.$(29001);
const UIImageFlatTextureGrassClumps2 = UIImage.$(29002);
const UIImageFlatTextureGrassClumps3 = UIImage.$(29003);
const UIImageFlatTextureGrassClumps4 = UIImage.$(29004);
const UIImageFlatTextureGrassClumps5 = UIImage.$(29005);
const UIImageFlatTextureGrassClumps6 = UIImage.$(29006);

const UIImageFlatTextureIce1 = UIImage.$(29007);
const UIImageFlatTextureIce2 = UIImage.$(29008);
const UIImageFlatTextureIce3 = UIImage.$(29009);
const UIImageFlatTextureIce4 = UIImage.$(29010);
const UIImageFlatTextureIce5 = UIImage.$(29011);
const UIImageFlatTextureIce6 = UIImage.$(29012);

//29357부터



// const UIImage = UIImage.$();
