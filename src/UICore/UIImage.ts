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

    /**
     * Offsets uiimage
     * * Currently, it is only valid for images applied to tabs.
     * @param val 
     * @returns offset 
     */
    offset(val: UIPoint): this {
        this._offset = val;
        return this;
    }

    singleFrame(): number {
        return this._frames[0];
    }

    isEqual(val: UIImage): boolean {
        var left = this._frames.map((val) => val.toString()).reduce((acc, val) => acc + '-' + val);
        var right = val._frames.map((val) => val.toString()).reduce((acc, val) => acc + '-' + val);
        return left === right;
    }

    size(): UISize {
        //포함된 이미지의 최대 크기 반환
        return this._frames.map(val => {
            var info = imageHelper.getImage(val)
            return <UISize>{
                width: info?.width ?? 0,
                height: info?.height ?? 0
            }
        }).reduce((acc, val) => {
            return {
                width: Math.max(acc.width, val.width),
                height: Math.max(acc.height, val.height)
            }
        })
    }

    description(): string {
        return 'Duration: '+this._duration+'\nFrames: '+this._frames.map((val) => val.toString()).reduce((acc, val) => acc + '-' + val);
    }
}

//UIImage constants
const UIImageNone = UIImage.$(-1);

//Shop Item
const UIImageShopItemBalloon = UIImage.$(5061);
const UIImageShopItemToy = UIImage.$(5062);
const UIImageShopItemMap = UIImage.$(5063);
const UIImageShopItemPhoto = UIImage.$(5064);
const UIImageShopItemUmbrella = UIImage.$(5065);
const UIImageShopItemDrink = UIImage.$(5066);
const UIImageShopItemBurger = UIImage.$(5067);
const UIImageShopItemChips = UIImage.$(5068);
const UIImageShopItemIceCream = UIImage.$(5069);
const UIImageShopItemCandyfloss = UIImage.$(5070);
const UIImageShopItemEmptyCan = UIImage.$(5071);
const UIImageShopItemRubbish = UIImage.$(5072);
const UIImageShopItemEmptyBurgerBox = UIImage.$(5073);
const UIImageShopItemPizza = UIImage.$(5074);
const UIImageShopItemVoucher = UIImage.$(5075);
const UIImageShopItemPopcorn = UIImage.$(5076);
const UIImageShopItemHotDog = UIImage.$(5077);
const UIImageShopItemTentacle = UIImage.$(5078);
const UIImageShopItemHat = UIImage.$(5079);
const UIImageShopItemToffeeApple = UIImage.$(5080);
const UIImageShopItemTshirt = UIImage.$(5081);
const UIImageShopItemDoughnut = UIImage.$(5082);
const UIImageShopItemCoffee = UIImage.$(5083);
const UIImageShopItemEmptyCup = UIImage.$(5084);
const UIImageShopItemChicken = UIImage.$(5085);
const UIImageShopItemLemonade = UIImage.$(5086);
const UIImageShopItemEmptyBox = UIImage.$(5087);
const UIImageShopItemEmptyBottle = UIImage.$(5088);
const UIImageShopItemPhoto2 = UIImage.$(5089);
const UIImageShopItemPhoto3 = UIImage.$(5090);
const UIImageShopItemPhoto4 = UIImage.$(5091);
const UIImageShopItemPretzel = UIImage.$(5092);
const UIImageShopItemChocolate = UIImage.$(5093);
const UIImageShopItemIcedTea = UIImage.$(5094);
const UIImageShopItemFunnelCake = UIImage.$(5095);
const UIImageShopItemSunglasses = UIImage.$(5096);
const UIImageShopItemBeefNoodles = UIImage.$(5097);
const UIImageShopItemFriedRiceNoodles = UIImage.$(5098);
const UIImageShopItemWontonSoup = UIImage.$(5099);
const UIImageShopItemMeatballSoup = UIImage.$(5100);
const UIImageShopItemFruitJuice = UIImage.$(5101);
const UIImageShopItemSoybeanMilk = UIImage.$(5102);
const UIImageShopItemSujeonggwa = UIImage.$(5103);
const UIImageShopItemSubSandwich = UIImage.$(5104);
const UIImageShopItemCookie = UIImage.$(5105);
const UIImageShopItemEmptyBowlRed = UIImage.$(5106);
const UIImageShopItemEmptyDrinkCarton = UIImage.$(5107);
const UIImageShopItemEmptyJuiceCup = UIImage.$(5108);
const UIImageShopItemRoastSausage = UIImage.$(5109);
const UIImageShopItemEmptyBowlBlue = UIImage.$(5110);

//Staff
const UIImageStaffOrdersSweeping = UIImage.$(5111);
const UIImageStaffOrdersWaterFlowers = UIImage.$(5112);
const UIImageStaffOrdersEmptyBins = UIImage.$(5113);
const UIImageStaffOrdersMowing = UIImage.$(5114);
const UIImageStaffOrdersInspectRides = UIImage.$(5115);
const UIImageStaffOrdersFixRides = UIImage.$(5116);
const UIImageStaffPatrolPath = UIImage.$(5117);
const UIImageStaffCostumePanda = UIImage.$(5118);
const UIImageStaffCostumeTiger = UIImage.$(5119);
const UIImageStaffCostumeElephant = UIImage.$(5120);
const UIImageStaffCostumeRoman = UIImage.$(5121);
const UIImageStaffCostumeGorilla = UIImage.$(5122);
const UIImageStaffCostumeSnowman = UIImage.$(5123);
const UIImageStaffCostumeKnight = UIImage.$(5124);
const UIImageStaffCostumeAstronaut = UIImage.$(5125);
const UIImageStaffCostumeBandit = UIImage.$(5126);
const UIImageStaffCostumeSheriff = UIImage.$(5127);
const UIImageStaffCostumePirate = UIImage.$(5128);

const UIImageInformationSmall = UIImage.$(5129);
const UIImageRatingIncrease = UIImage.$(5130);
const UIImageRatingDecrease = UIImage.$(5131);

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

//Award
const UIImageAwardMostUntidy = UIImage.$(5469);
const UIImageAwardMostTidy = UIImage.$(5470);
const UIImageAwardBestRollerCoasters = UIImage.$(5471);
const UIImageAwardBestValue = UIImage.$(5472);
const UIImageAwardMostBeautiful = UIImage.$(5473);
const UIImageAwardWorstValue = UIImage.$(5474);
const UIImageAwardSafest = UIImage.$(5475);
const UIImageAwardBestStaff = UIImage.$(5476);
const UIImageAwardBestFood = UIImage.$(5477);
const UIImageAwardWorstFood = UIImage.$(5478);
const UIImageAwardBestRestrooms = UIImage.$(5479);
const UIImageAwardMostDisappointing = UIImage.$(5480);
const UIImageAwardBestWaterRides = UIImage.$(5481);
const UIImageAwardBestCustomDesignedRides = UIImage.$(5482);
const UIImageAwardMostDazzlingRideColors = UIImage.$(5483);
const UIImageAwardMostConfusingLayout = UIImage.$(5484);
const UIImageAwardBestGentleRides = UIImage.$(5485);

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

const UIImagePeepSmallFaceVeryVeryUnhappy = UIImage.$(5486);
const UIImagePeepSmallFaceVeryUnhappy = UIImage.$(5487);
const UIImagePeepSmallFaceUnhappy = UIImage.$(5488);
const UIImagePeepSmallFaceNormal = UIImage.$(5489);
const UIImagePeepSmallFaceHappy = UIImage.$(5490);
const UIImagePeepSmallFaceVeryHappy = UIImage.$(5491);
const UIImagePeepSmallFaceVeryVeryHappy = UIImage.$(5492);
const UIImagePeepSmallFaceTired = UIImage.$(5493);
const UIImagePeepSmallFaceVeryTired = UIImage.$(5494);
const UIImagePeepSmallFaceSick = UIImage.$(5495);
const UIImagePeepSmallFaceVerySick = UIImage.$(5496);
const UIImagePeepSmallFaceVeryVerySick = UIImage.$(5497);
const UIImagePeepSmallFaceAngry = UIImage.$(5498);

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
const UIImageFloorTextureGridPurple = UIImage.$(5589);
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

//Maze Wall
const UIImageRideMazeWallHedgeThickFull = UIImage.$(21938);
const UIImageRideMazeWallHedgeThickSWNE = UIImage.$(21939);
const UIImageRideMazeWallHedgeThickNWSE = UIImage.$(21940);
const UIImageRideMazeWallHedgeMediumSWNE = UIImage.$(21941);
const UIImageRideMazeWallHedgeMediumNWSE = UIImage.$(21942);
const UIImageRideMazeWallHedgeThinSWNE = UIImage.$(21943);
const UIImageRideMazeWallHedgeThinNWSE = UIImage.$(21944);
const UIImageRideMazeWallBrickThickFull = UIImage.$(21951);
const UIImageRideMazeWallBrickThickSWNE = UIImage.$(21952);
const UIImageRideMazeWallBrickThickNWSE = UIImage.$(21953);
const UIImageRideMazeWallBrickMediumSWNE = UIImage.$(21954);
const UIImageRideMazeWallBrickMediumNWSE = UIImage.$(21955);
const UIImageRideMazeWallBrickThinSWNE = UIImage.$(21956);
const UIImageRideMazeWallBrickThinNWSE = UIImage.$(21957);
const UIImageRideMazeWallIceThickFull = UIImage.$(21964);
const UIImageRideMazeWallIceThickSWNE = UIImage.$(21965);
const UIImageRideMazeWallIceThickNWSE = UIImage.$(21966);
const UIImageRideMazeWallIceMediumSWNE = UIImage.$(21967);
const UIImageRideMazeWallIceMediumNWSE = UIImage.$(21968);
const UIImageRideMazeWallIceThinSWNE = UIImage.$(21969);
const UIImageRideMazeWallIceThinNWSE = UIImage.$(21970);
const UIImageRideMazeWallWoodenThickFull = UIImage.$(21977);
const UIImageRideMazeWallWoodenThickSWNE = UIImage.$(21978);
const UIImageRideMazeWallWoodenThickNWSE = UIImage.$(21979);
const UIImageRideMazeWallWoodenMediumSWNE = UIImage.$(21980);
const UIImageRideMazeWallWoodenMediumNWSE = UIImage.$(21981);
const UIImageRideMazeWallWoodenThinSWNE = UIImage.$(21982);
const UIImageRideMazeWallWoodenThinNWSE = UIImage.$(21983);

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

const UIImageWallMedievalGray = UIImage.$(112511);
const UIImageWallTin = UIImage.$(124211);
const UIImageWallSandBrick = UIImage.$(152747);
const UIImageWallRustyTin = UIImage.$(163772);
const UIImageWallSand = UIImage.$(163784);
const UIImageWallLightSand = UIImage.$(168735);
const UIImageWallBordeauxRed = UIImage.$(171630);
const UIImageWallViolet = UIImage.$(171641);

const UIImageG2Logo = UIImage.$(29357);
const UIImageG2Title = UIImage.$(29358);

const UIImageG2Fastforward = UIImage.$(29359);
const UIImageG2SpeedArrow = UIImage.$(29360);
const UIImageG2HyperArrow = UIImage.$(29361);

const UIImageG2TabLand = UIImage.$(29362);

const UIImageG2Placeholder = UIImage.$(29363);

const UIImageG2ZoomIn = UIImage.$(29364);
const UIImageG2ZoomOut = UIImage.$(29366);

const UIImageG2TabTree = UIImage.$(29368);
const UIImageG2TabPencil = UIImage.$(29369);
const UIImageG2LargeScenery = UIImage.$(29370);
const UIImageG2Trees = UIImage.$(29371);
const UIImageG2Footpath = UIImage.$(29372);

const UIImageG1CloseDisable = UIImage.$(29373);
const UIImageG1CloseEnable = UIImage.$(29375);
const UIImageG1TestDisable = UIImage.$(29377);
const UIImageG1TestEnable = UIImage.$(29379);
const UIImageG1OpenDisable = UIImage.$(29381);
const UIImageG1OpenEnable = UIImage.$(29383);
const UIImageG2Simulate = UIImage.$(29481);
const UIImageG1SimulateDisable = UIImage.$(29482);
const UIImageG1SimulateEnable = UIImage.$(29483);

const UIImageG2Restart = UIImage.$(29385);
const UIImageG2Stop = UIImage.$(29386);
const UIImageG2Play = UIImage.$(29387);
const UIImageG2Skip = UIImage.$(29388);

const UIImageG2Sandbox = UIImage.$(29389);
const UIImageG2TabNews = UIImage.$(29414);

const UIImageG2Locked = UIImage.$(29415);
const UIImageG2MenuMultiplayer = UIImage.$(29416);

const UIImageG2Sort = UIImage.$(29433);
const UIImageG2Copy = UIImage.$(29434);
const UIImageG2Paste = UIImage.$(29435);

const UIImageG2Search = UIImage.$(29461);
const UIImageG2Pipette = UIImage.$(29467);
const UIImageG2Chat = UIImage.$(29468);

const UIImageG2SceneryScatterLow = UIImage.$(29489);
const UIImageG2SceneryScatterMedium = UIImage.$(29490);
const UIImageG2SceneryScatterHigh = UIImage.$(29491);

const UIImageG2View = UIImage.$(29494);