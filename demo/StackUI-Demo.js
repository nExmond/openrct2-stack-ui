"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var openWindow = function () {
    var window = UIWDP.$();
    var tab1 = UITP.$();
    var buttonBasicTitle = UIWP.$();
    var buttonBasicImage = UIWP.$();
    var buttonToggleTitle = UIWP.$();
    var buttonToggleImage = UIWP.$();
    var buttonPagingImage = UIWP.$();
    var temp = UIWP.$();
    UIWindow.$T("StackUI Demo", UITab.$(UIButton.$("dddddd"), UISpacer.$(), UIStack.$H(UIStack.$V(UIButton.$("button").bind(buttonBasicTitle), UIButton.$I(UIImageGuests).bind(buttonBasicImage)).title("Basic"), UIStack.$V(UIToggleButton.$("button").bind(buttonToggleTitle), UIToggleButton.$I(UIImageGuests).bind(buttonToggleImage)).title("Toggle"), UISpacer.$(), UIStack.$V(UIPageImageButton.$IP.apply(UIPageImageButton, [
        UIImageAwardBestStaff,
        UIImageAwardBestValue,
        UIImageAwardMostBeautiful
    ]).bind(buttonPagingImage)).title("Paging")).title("Button")).bind(tab1)
        .isExpandable(true)
        .image(UIImageConstruction.offset({ x: 4, y: 2 })), UITab.$(UIButton.$("탭 인덱스").bind(temp), UICheckbox.$("체크박스"), UIDropdown.$(["1", "2"]), UIColorPicker.$(), UISpinner.$(), UITextBox.$(), UIListView.$([UIListViewColumn.$("속성")]).addItem(UIListViewItem.$(["값"]))).image(UIImageTabAwards).isExpandable(true)
        .title("Other title"), UITab.$(UIButton.$("탭 인덱스").bind(temp), UICheckbox.$("체크박스"), UIDropdown.$(["1", "2"]), UIColorPicker.$(), UISpinner.$(), UITextBox.$(), UIListView.$([UIListViewColumn.$("속성")]).addItem(UIListViewItem.$(["값"]))).image(UIImageTabAwards).isExpandable(true)
        .title("Other title22222")).bind(window)
        .theme({ primary: UIColor.Gray, secondary: UIColor.DarkYellow })
        .padding({ top: 2, left: 2, bottom: 2, right: 2 })
        .spacing(2)
        .show();
};
var main = function () {
    if (typeof ui === "undefined") {
        console.log("Plugin not available on headless mode.");
        return;
    }
    ui.registerMenuItem("StackUI Demo", function () {
        openWindow();
    });
};
registerPlugin({
    name: "StackUI Demo",
    version: "0.0.1",
    authors: ["nExmond"],
    type: "local",
    licence: "MIT",
    main: main
});
var IntervalHelper = (function () {
    function IntervalHelper() {
        this._intervalInfos = {};
    }
    IntervalHelper.prototype.start = function (key, delay, block) {
        var id = context.setInterval(block, delay);
        this._intervalInfos[key] = id;
    };
    IntervalHelper.prototype.end = function (key) {
        var id = this._intervalInfos[key];
        if (typeof id !== "undefined") {
            context.clearInterval(id);
            delete this._intervalInfos[key];
        }
    };
    return IntervalHelper;
}());
var intervalHelper = new IntervalHelper();
var UIInteractor = (function () {
    function UIInteractor() {
    }
    UIInteractor.prototype._findWidget = function (block) {
        this.__findWidget = block;
    };
    UIInteractor.prototype._update = function (name, block) {
        var widget = this.__findWidget(name);
        if (typeof widget !== "undefined") {
            block(widget);
        }
    };
    UIInteractor.prototype._refresh = function (block) {
        this._refreshWindow = block;
    };
    UIInteractor.prototype.refreshWindow = function () {
        this._refreshWindow();
    };
    return UIInteractor;
}());
var UIOptionalSizeDefulat = { width: undefined, height: undefined };
var UISizeZero = { width: 0, height: 0 };
var TextFormat;
(function (TextFormat) {
    TextFormat["Comma16"] = "COMMA16";
    TextFormat["Comma32"] = "COMMA32";
    TextFormat["Comma1dp16"] = "COMMA1DP16";
    TextFormat["Comma2dp32"] = "COMMA2DP32";
    TextFormat["Int32"] = "Int32";
    TextFormat["UInt16"] = "UINT16";
    TextFormat["Currency"] = "CURRENCY";
    TextFormat["Currency2dp"] = "CURRENCY2DP";
    TextFormat["MonthYear"] = "MONTHYEAR";
    TextFormat["Month"] = "MONTH";
    TextFormat["DurationShort"] = "DURATION";
    TextFormat["DurationLong"] = "REALTIME";
    TextFormat["Velocity"] = "VELOCITY";
    TextFormat["Length"] = "LENGTH";
    TextFormat["StringId"] = "STRINGID";
})(TextFormat || (TextFormat = {}));
Array.prototype.flatMapFunc = function (d) {
    if (d === void 0) { d = 1; }
    return d > 0 ? this.reduce(function (acc, val) { return acc.concat(Array.isArray(val) ? val.flatMapFunc(d - 1) : val); }, []) : this.slice();
};
Array.prototype.flatMap = function () {
    return this.flatMapFunc(1);
};
Array.prototype.compactMap = function () {
    return this.filter(function (val) { return val !== undefined; });
};
function uuid() {
    var uuidValue = '', k, randomValue;
    for (k = 0; k < 32; k++) {
        randomValue = Math.random() * 16 | 0;
        if (k == 8 || k == 12 || k == 16 || k == 20) {
            uuidValue += '-';
        }
        uuidValue += (k == 12 ? 4 : (k == 16 ? (randomValue & 3 | 8) : randomValue)).toString(16);
    }
    return uuidValue;
}
String.prototype.size = function () {
    var _a, _b;
    var g = imageHelper.graphicsContext();
    var imageBounds = UISizeZero;
    var regex = new RegExp(/{INLINE_SPRITE}{(\d{1,3})}{\d{1,3}}{\d{1,3}}/g);
    var match = this.match(regex);
    if (match !== null) {
        console.log("WARNING: Images inserted in text may be displayed incorrectly.");
        var images = (_a = match.map(function (val) {
            var strings = val.split('{').map(function (val) { return val.split('}'); }).flatMap();
            var values = strings.filter(function (_, index) { return index % 2 === 1; });
            var id = parseInt(values[3]) * (256 * 256) + parseInt(values[2]) * 256 + parseInt(values[1]);
            return id;
        })) !== null && _a !== void 0 ? _a : [];
        imageBounds = images.map(function (val) {
            var _a, _b;
            var size = g === null || g === void 0 ? void 0 : g.getImage(val);
            return {
                width: (_a = size === null || size === void 0 ? void 0 : size.width) !== null && _a !== void 0 ? _a : 0,
                height: (_b = size === null || size === void 0 ? void 0 : size.height) !== null && _b !== void 0 ? _b : 0
            };
        }).reduce(function (acc, val) {
            return {
                width: acc.width + val.width,
                height: Math.max(acc.height, val.height)
            };
        });
    }
    var splitted = this.split(regex);
    var textSize = (_b = g === null || g === void 0 ? void 0 : g.measureText(splitted.join(''))) !== null && _b !== void 0 ? _b : UISizeZero;
    return {
        width: textSize.width + imageBounds.width,
        height: Math.max(textSize.height, imageBounds.height)
    };
};
String.prototype.containerSize = function () {
    var size = this.toString().size();
    return {
        width: size.width + 5,
        height: size.height + 5
    };
};
String.prototype.remove = function () {
    var strings = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        strings[_i] = arguments[_i];
    }
    var newString = this.toString();
    for (var _a = 0, strings_1 = strings; _a < strings_1.length; _a++) {
        var string = strings_1[_a];
        newString = newString.split(string).join('');
    }
    return newString;
};
String.prototype.toClearString = function () {
    var strings = this.toString().split('{').map(function (val) { return val.split('}'); }).flatMap();
    var cleared = strings.filter(function (_, index) { return index % 2 === 0; }).join('');
    return cleared;
};
String.prototype.format = function (format) {
    var arg = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        arg[_i - 1] = arguments[_i];
    }
    return context.formatString.apply(context, __spreadArray(["{" + format + "}", this], arg));
};
Number.prototype.format = function (format) {
    var arg = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        arg[_i - 1] = arguments[_i];
    }
    return context.formatString.apply(context, __spreadArray(["{" + format + "}", this], arg));
};
var ImageHelper = (function () {
    function ImageHelper() {
        this._open();
    }
    ImageHelper.prototype._open = function () {
        var _this = this;
        var window = ui.openWindow({
            classification: "_GC_",
            x: 0,
            y: 0,
            width: 15,
            height: 15,
            title: "",
            widgets: [{
                    x: 0,
                    y: 0,
                    width: 15,
                    height: 15,
                    type: "custom",
                    onDraw: function (g) {
                        _this._graphicsContext = g;
                        window.x = -20;
                    }
                }],
            onClose: function () {
                var timeoutId = context.setTimeout(function () {
                    _this._open();
                    context.clearTimeout(timeoutId);
                }, 1);
            }
        });
        console.log("A custom widget that supports GraphicsContext has been opened.");
    };
    ImageHelper.prototype.graphicsContext = function () {
        return this._graphicsContext;
    };
    return ImageHelper;
}());
var imageHelper = new ImageHelper();
var TextColor;
(function (TextColor) {
    TextColor["WindowPrimary"] = "WINDOW_COLOUR_1";
    TextColor["WindowSecondary"] = "WINDOW_COLOUR_2";
    TextColor["WindowTertiary"] = "WINDOW_COLOUR_3";
    TextColor["Black"] = "BLACK";
    TextColor["Gray"] = "GREY";
    TextColor["White"] = "WHITE";
    TextColor["Red"] = "RED";
    TextColor["Green"] = "GREEN";
    TextColor["Yellow"] = "YELLOW";
    TextColor["Topaz"] = "TOPAZ";
    TextColor["Celadon"] = "CELADON";
    TextColor["BabyBlue"] = "BABYBLUE";
    TextColor["PaleLavender"] = "PALELAVENDER";
    TextColor["PaleGold"] = "PALEGOLD";
    TextColor["LightPink"] = "LIGHTPINK";
    TextColor["PearlAqua"] = "PEARLAQUA";
    TextColor["PaleSilver"] = "PALESILVER";
})(TextColor || (TextColor = {}));
var TextFont;
(function (TextFont) {
    TextFont["Tiny"] = "TINYFONT";
    TextFont["Small"] = "SMALLFONT";
    TextFont["Medium"] = "MEDIUMFONT";
    TextFont["Big"] = "BIGFONT";
})(TextFont || (TextFont = {}));
var UIPointZero = { x: 0, y: 0 };
var UIImage = (function () {
    function UIImage(frames) {
        this._frames = [];
        this._duration = 2;
        this._offset = UIPointZero;
        this._frames = frames;
    }
    UIImage.$ = function (single) {
        var image = new UIImage([single]);
        return image;
    };
    UIImage.$A = function (base, count, duration) {
        var frames = __spreadArray([], Array(count)).map(function (_, i) { return base + i; });
        var image = new UIImage(frames);
        return image.duration(duration);
    };
    UIImage.$F = function (frames, duration) {
        var image = new UIImage(frames);
        return image.duration(duration);
    };
    UIImage.prototype._data = function (usingTab) {
        if (usingTab === void 0) { usingTab = false; }
        var frameCount = this._frames.length;
        if (usingTab) {
            var isContiguous = this._frames.reduce(function (acc, val) { return val === acc + 1 ? val : acc; }) == this._frames[this._frames.length - 1];
            return {
                frameBase: this._frames[0],
                frameCount: this._frames.length,
                frameDuration: this._duration,
                offset: this._offset
            };
        }
        else {
            if (frameCount > 0) {
                return this._frames[0];
            }
            else {
                return -1;
            }
        }
    };
    UIImage.prototype._isAnimatable = function () {
        return this._frames.length > 1;
    };
    UIImage.prototype.duration = function (val) {
        this._duration = val;
        return this;
    };
    UIImage.prototype.getDuration = function () {
        return this._duration;
    };
    UIImage.prototype.offset = function (val) {
        this._offset = val;
        return this;
    };
    UIImage.prototype.getOffset = function () {
        return this._offset;
    };
    UIImage.prototype.singleFrame = function () {
        return this._frames[0];
    };
    UIImage.prototype.isEqual = function (val) {
        var left = this._frames.map(function (val) { return val.toString(); }).reduce(function (acc, val) { return acc + '-' + val; });
        var right = val._frames.map(function (val) { return val.toString(); }).reduce(function (acc, val) { return acc + '-' + val; });
        return left === right;
    };
    UIImage.prototype.size = function () {
        var graphicsContext = imageHelper.graphicsContext();
        return this._frames.map(function (val) {
            var _a, _b;
            var info = graphicsContext === null || graphicsContext === void 0 ? void 0 : graphicsContext.getImage(val);
            return {
                width: (_a = info === null || info === void 0 ? void 0 : info.width) !== null && _a !== void 0 ? _a : 0,
                height: (_b = info === null || info === void 0 ? void 0 : info.height) !== null && _b !== void 0 ? _b : 0
            };
        }).reduce(function (acc, val) {
            return {
                width: Math.max(acc.width, val.width),
                height: Math.max(acc.height, val.height)
            };
        });
    };
    UIImage.prototype.description = function () {
        return "Duration: " + this._duration + "\nFrames: " + this._frames.map(function (val) { return val.toString(); }).reduce(function (acc, val) { return acc + '-' + val; });
    };
    return UIImage;
}());
var UIImageNone = UIImage.$(-1);
var UIImageShopItemBalloon = UIImage.$(5061);
var UIImageShopItemToy = UIImage.$(5062);
var UIImageShopItemMap = UIImage.$(5063);
var UIImageShopItemPhoto = UIImage.$(5064);
var UIImageShopItemUmbrella = UIImage.$(5065);
var UIImageShopItemDrink = UIImage.$(5066);
var UIImageShopItemBurger = UIImage.$(5067);
var UIImageShopItemChips = UIImage.$(5068);
var UIImageShopItemIceCream = UIImage.$(5069);
var UIImageShopItemCandyfloss = UIImage.$(5070);
var UIImageShopItemEmptyCan = UIImage.$(5071);
var UIImageShopItemRubbish = UIImage.$(5072);
var UIImageShopItemEmptyBurgerBox = UIImage.$(5073);
var UIImageShopItemPizza = UIImage.$(5074);
var UIImageShopItemVoucher = UIImage.$(5075);
var UIImageShopItemPopcorn = UIImage.$(5076);
var UIImageShopItemHotDog = UIImage.$(5077);
var UIImageShopItemTentacle = UIImage.$(5078);
var UIImageShopItemHat = UIImage.$(5079);
var UIImageShopItemToffeeApple = UIImage.$(5080);
var UIImageShopItemTshirt = UIImage.$(5081);
var UIImageShopItemDoughnut = UIImage.$(5082);
var UIImageShopItemCoffee = UIImage.$(5083);
var UIImageShopItemEmptyCup = UIImage.$(5084);
var UIImageShopItemChicken = UIImage.$(5085);
var UIImageShopItemLemonade = UIImage.$(5086);
var UIImageShopItemEmptyBox = UIImage.$(5087);
var UIImageShopItemEmptyBottle = UIImage.$(5088);
var UIImageShopItemPhoto2 = UIImage.$(5089);
var UIImageShopItemPhoto3 = UIImage.$(5090);
var UIImageShopItemPhoto4 = UIImage.$(5091);
var UIImageShopItemPretzel = UIImage.$(5092);
var UIImageShopItemChocolate = UIImage.$(5093);
var UIImageShopItemIcedTea = UIImage.$(5094);
var UIImageShopItemFunnelCake = UIImage.$(5095);
var UIImageShopItemSunglasses = UIImage.$(5096);
var UIImageShopItemBeefNoodles = UIImage.$(5097);
var UIImageShopItemFriedRiceNoodles = UIImage.$(5098);
var UIImageShopItemWontonSoup = UIImage.$(5099);
var UIImageShopItemMeatballSoup = UIImage.$(5100);
var UIImageShopItemFruitJuice = UIImage.$(5101);
var UIImageShopItemSoybeanMilk = UIImage.$(5102);
var UIImageShopItemSujeonggwa = UIImage.$(5103);
var UIImageShopItemSubSandwich = UIImage.$(5104);
var UIImageShopItemCookie = UIImage.$(5105);
var UIImageShopItemEmptyBowlRed = UIImage.$(5106);
var UIImageShopItemEmptyDrinkCarton = UIImage.$(5107);
var UIImageShopItemEmptyJuiceCup = UIImage.$(5108);
var UIImageShopItemRoastSausage = UIImage.$(5109);
var UIImageShopItemEmptyBowlBlue = UIImage.$(5110);
var UIImageStaffOrdersSweeping = UIImage.$(5111);
var UIImageStaffOrdersWaterFlowers = UIImage.$(5112);
var UIImageStaffOrdersEmptyBins = UIImage.$(5113);
var UIImageStaffOrdersMowing = UIImage.$(5114);
var UIImageStaffOrdersInspectRides = UIImage.$(5115);
var UIImageStaffOrdersFixRides = UIImage.$(5116);
var UIImageStaffPatrolPath = UIImage.$(5117);
var UIImageStaffCostumePanda = UIImage.$(5118);
var UIImageStaffCostumeTiger = UIImage.$(5119);
var UIImageStaffCostumeElephant = UIImage.$(5120);
var UIImageStaffCostumeRoman = UIImage.$(5121);
var UIImageStaffCostumeGorilla = UIImage.$(5122);
var UIImageStaffCostumeSnowman = UIImage.$(5123);
var UIImageStaffCostumeKnight = UIImage.$(5124);
var UIImageStaffCostumeAstronaut = UIImage.$(5125);
var UIImageStaffCostumeBandit = UIImage.$(5126);
var UIImageStaffCostumeSheriff = UIImage.$(5127);
var UIImageStaffCostumePirate = UIImage.$(5128);
var UIImageInformationSmall = UIImage.$(5129);
var UIImageRatingIncrease = UIImage.$(5130);
var UIImageRatingDecrease = UIImage.$(5131);
var UIImageRideConstructionStraight = UIImage.$(5137);
var UIImageRideConstructionLeftCurve = UIImage.$(5138);
var UIImageRideConstructionRightCurve = UIImage.$(5139);
var UIImageRideConstructionLeftCurveSmall = UIImage.$(5140);
var UIImageRideConstructionRightCurveSmall = UIImage.$(5141);
var UIImageRideConstructionLeftCurveLarge = UIImage.$(5142);
var UIImageRideConstructionRightCurveLarge = UIImage.$(5143);
var UIImageRideConstructionSlopeDownSteep = UIImage.$(5144);
var UIImageRideConstructionSlopeDown = UIImage.$(5145);
var UIImageRideConstructionSlopeLevel = UIImage.$(5146);
var UIImageRideConstructionSlopeUp = UIImage.$(5147);
var UIImageRideConstructionSlopeUpSteep = UIImage.$(5148);
var UIImageRideConstructionVerticalRise = UIImage.$(5149);
var UIImageRideConstructionVerticalDrop = UIImage.$(5150);
var UIImageRideConstructionHelixDown = UIImage.$(5151);
var UIImageRideConstructionHelixUp = UIImage.$(5152);
var UIImageRideConstructionLeftBank = UIImage.$(5153);
var UIImageRideConstructionNoBank = UIImage.$(5154);
var UIImageRideConstructionRightBank = UIImage.$(5155);
var UIImageRideConstructionUShapedTrack = UIImage.$(5156);
var UIImageRideConstructionOShapedTrack = UIImage.$(5157);
var UIImageRideConstructionRCTrack = UIImage.$(5158);
var UIImageRideConstructionWaterChannel = UIImage.$(5159);
var UIImagePrevious = UIImage.$(5160);
var UIImageNext = UIImage.$(5161);
var UIImageDemolishCurrentSection = UIImage.$(5162);
var UIImageChainLift = UIImage.$(5163);
var UIImageConstruction = UIImage.$(5164);
var UIImageDemolish = UIImage.$(5165);
var UIImageHearingViewport = UIImage.$(5166);
var UIImageLocate = UIImage.$(5167);
var UIImageRename = UIImage.$(5168);
var UIImageRotateArrow = UIImage.$(5169);
var UIImageMirrorArrow = UIImage.$(5170);
var UIImageScenery = UIImage.$(5171);
var UIImageSceneryCluster = UIImage.$(5172);
var UIImagePaintbrush = UIImage.$(5173);
var UIImagePickup = UIImage.$(5174);
var UIImagePatrol = UIImage.$(5175);
var UIImageBuyLandRights = UIImage.$(5176);
var UIImageBuyConstructionRights = UIImage.$(5177);
var UIImageNoEntry = UIImage.$(5178);
var UIImageClosed = UIImage.$(5179);
var UIImageOpen = UIImage.$(5180);
var UIImageTesting = UIImage.$(5181);
var UIImageToggleOpenClose = UIImage.$(5182);
var UIImageFloppy = UIImage.$(5183);
var UIImageShowGuestsThoughtsAboutThisRideAttraction = UIImage.$(5184);
var UIImageShowGuestsQueuingForThisRideAttraction = UIImage.$(5185);
var UIImageShowGuestsOnThisRideAttraction = UIImage.$(5186);
var UIImageRide = UIImage.$(5187);
var UIImageTrackPeep = UIImage.$(5188);
var UIImageNewRide = UIImage.$(5189);
var UIImageFinance = UIImage.$(5190);
var UIImageNewScenery = UIImage.$(5191);
var UIImageMap = UIImage.$(5192);
var UIImageGuests = UIImage.$(5193);
var UIImageAward = UIImage.$(5194);
var UIImageGraph = UIImage.$(5195);
var UIImageMechanic = UIImage.$(5196);
var UIImageParkEntrance = UIImage.$(5197);
var UIImageTabParkEntrance = UIImage.$(5200);
var UIImageTabGears = UIImage.$A(5201, 4, 2);
var UIImageTabWrench = UIImage.$A(5205, 16, 2);
var UIImageTabPaint = UIImage.$A(5221, 8, 4);
var UIImageTabTimer = UIImage.$A(5229, 8, 8);
var UIImageTabGraphA = UIImage.$A(5237, 8, 4);
var UIImageTabGraph = UIImage.$A(5245, 8, 4);
var UIImageTabAdmission = UIImage.$A(5253, 8, 2);
var UIImageTabFinancesSummary = UIImage.$A(5261, 8, 2);
var UIImageTabThoughts = UIImage.$A(5269, 8, 2);
var UIImageTabStats = UIImage.$A(5277, 7, 4);
var UIImageTabStaffOptions = UIImage.$A(5318, 7, 2);
var UIImageTabStaffOptionsOne = UIImage.$(5325);
var UIImageTabGuestInventory = UIImage.$(5326);
var UIImageTabFinancesResearch = UIImage.$A(5327, 8, 2);
var UIImageTabMusic = UIImage.$A(5335, 16, 2);
var UIImageTabShopsAndStalls = UIImage.$A(5351, 16, 4);
var UIImageTabKiosksAndFacilities = UIImage.$A(5367, 8, 4);
var UIImageTabFinancesFinancialGraph = UIImage.$A(5375, 16, 2);
var UIImageTabFinancesProfitGraph = UIImage.$A(5391, 16, 2);
var UIImageTabFinancesValueGraph = UIImage.$A(5407, 16, 2);
var UIImageTabFinancesMarketing = UIImage.$A(5423, 19, 2);
var UIImageTabRide = UIImage.$A(5442, 16, 4);
var UIImageTabRideOne = UIImage.$(5448);
var UIImageTabSceneryTrees = UIImage.$(5459);
var UIImageTabSceneryUrban = UIImage.$(5460);
var UIImageTabSceneryWalls = UIImage.$(5461);
var UIImageTabScenerySignage = UIImage.$(5462);
var UIImageTabSceneryPaths = UIImage.$(5463);
var UIImageTabSceneryPathItems = UIImage.$(5464);
var UIImageTabSceneryStatues = UIImage.$(5465);
var UIImageTabPark = UIImage.$(5466);
var UIImageTabWater = UIImage.$(5467);
var UIImageTabStatsOne = UIImage.$(5468);
var UIImageTabObjective = UIImage.$A(5511, 16, 4);
var UIImageTabAwards = UIImage.$(5527);
var UIImageTabRidesShop = UIImage.$A(5530, 7, 4);
var UIImageTabRidesTransport = UIImage.$A(5537, 5, 4);
var UIImageTabRidesGentle = UIImage.$A(5542, 4, 8);
var UIImageTabRidesRollerCoasters = UIImage.$A(5546, 5, 2);
var UIImageTabRidesWater = UIImage.$A(5551, 6, 4);
var UIImageTabRidesThrill = UIImage.$F([5562, 5563, 5562, 5561, 5560, 5559, 5558, 5557, 5557, 5557, 5557, 5557, 5557, 5557, 5557, 5557, 5558, 5559, 5560, 5561], 4);
var UIImageTabGuests = UIImage.$A(5568, 8, 4);
var UIImageAwardMostUntidy = UIImage.$(5469);
var UIImageAwardMostTidy = UIImage.$(5470);
var UIImageAwardBestRollerCoasters = UIImage.$(5471);
var UIImageAwardBestValue = UIImage.$(5472);
var UIImageAwardMostBeautiful = UIImage.$(5473);
var UIImageAwardWorstValue = UIImage.$(5474);
var UIImageAwardSafest = UIImage.$(5475);
var UIImageAwardBestStaff = UIImage.$(5476);
var UIImageAwardBestFood = UIImage.$(5477);
var UIImageAwardWorstFood = UIImage.$(5478);
var UIImageAwardBestRestrooms = UIImage.$(5479);
var UIImageAwardMostDisappointing = UIImage.$(5480);
var UIImageAwardBestWaterRides = UIImage.$(5481);
var UIImageAwardBestCustomDesignedRides = UIImage.$(5482);
var UIImageAwardMostDazzlingRideColors = UIImage.$(5483);
var UIImageAwardMostConfusingLayout = UIImage.$(5484);
var UIImageAwardBestGentleRides = UIImage.$(5485);
var UIImagePeepLargeFaceVeryVeryUnhappy = UIImage.$(5284);
var UIImagePeepLargeFaceVeryUnhappy = UIImage.$(5285);
var UIImagePeepLargeFaceUnhappy = UIImage.$(5286);
var UIImagePeepLargeFaceNormal = UIImage.$(5287);
var UIImagePeepLargeFaceHappy = UIImage.$(5288);
var UIImagePeepLargeFaceVeryHappy = UIImage.$(5289);
var UIImagePeepLargeFaceVeryVeryHappy = UIImage.$(5290);
var UIImagePeepLargeFaceTired = UIImage.$(5291);
var UIImagePeepLargeFaceVeryTired = UIImage.$(5292);
var UIImagePeepLargeFaceSick = UIImage.$(5293);
var UIImagePeepLargeFaceVerySick = UIImage.$A(5294, 4, 8);
var UIImagePeepLargeFaceVeryVerySick = UIImage.$A(5298, 16, 4);
var UIImagePeepLargeFaceAngry = UIImage.$A(5314, 4, 8);
var UIImagePeepSmallFaceVeryVeryUnhappy = UIImage.$(5486);
var UIImagePeepSmallFaceVeryUnhappy = UIImage.$(5487);
var UIImagePeepSmallFaceUnhappy = UIImage.$(5488);
var UIImagePeepSmallFaceNormal = UIImage.$(5489);
var UIImagePeepSmallFaceHappy = UIImage.$(5490);
var UIImagePeepSmallFaceVeryHappy = UIImage.$(5491);
var UIImagePeepSmallFaceVeryVeryHappy = UIImage.$(5492);
var UIImagePeepSmallFaceTired = UIImage.$(5493);
var UIImagePeepSmallFaceVeryTired = UIImage.$(5494);
var UIImagePeepSmallFaceSick = UIImage.$(5495);
var UIImagePeepSmallFaceVerySick = UIImage.$(5496);
var UIImagePeepSmallFaceVeryVerySick = UIImage.$(5497);
var UIImagePeepSmallFaceAngry = UIImage.$(5498);
var UIImageFloorTextureGrass = UIImage.$(5579);
var UIImageFloorTextureSand = UIImage.$(5580);
var UIImageFloorTextureDirt = UIImage.$(5581);
var UIImageFloorTextureRock = UIImage.$(5582);
var UIImageFloorTextureMartian = UIImage.$(5583);
var UIImageFloorTextureCheckerboard = UIImage.$(5584);
var UIImageFloorTextureGrassClumps = UIImage.$(5585);
var UIImageFloorTextureIce = UIImage.$(5586);
var UIImageFloorTextureGridRed = UIImage.$(5587);
var UIImageFloorTextureGridYellow = UIImage.$(5588);
var UIImageFloorTextureGridPurple = UIImage.$(5589);
var UIImageFloorTextureGridGreen = UIImage.$(5590);
var UIImageFloorTextureSandDark = UIImage.$(5591);
var UIImageFloorTextureSandLight = UIImage.$(5592);
var UIImageWallTextureRock = UIImage.$(5593);
var UIImageWallTextureWoodRed = UIImage.$(5594);
var UIImageWallTextureWoodBlack = UIImage.$(5595);
var UIImageWallTextureIce = UIImage.$(5596);
var UIImageMazeConstructionMove = UIImage.$(5577);
var UIImageConstructionDirectionNE = UIImage.$(5635);
var UIImageConstructionDirectionSE = UIImage.$(5636);
var UIImageConstructionDirectionSW = UIImage.$(5637);
var UIImageConstructionDirectionNW = UIImage.$(5638);
var UIImageConstructionFootpathLand = UIImage.$(5639);
var UIImageConstructionFootpathBridge = UIImage.$(5640);
var UIImageRideMazeWallHedgeThickFull = UIImage.$(21938);
var UIImageRideMazeWallHedgeThickSWNE = UIImage.$(21939);
var UIImageRideMazeWallHedgeThickNWSE = UIImage.$(21940);
var UIImageRideMazeWallHedgeMediumSWNE = UIImage.$(21941);
var UIImageRideMazeWallHedgeMediumNWSE = UIImage.$(21942);
var UIImageRideMazeWallHedgeThinSWNE = UIImage.$(21943);
var UIImageRideMazeWallHedgeThinNWSE = UIImage.$(21944);
var UIImageRideMazeWallBrickThickFull = UIImage.$(21951);
var UIImageRideMazeWallBrickThickSWNE = UIImage.$(21952);
var UIImageRideMazeWallBrickThickNWSE = UIImage.$(21953);
var UIImageRideMazeWallBrickMediumSWNE = UIImage.$(21954);
var UIImageRideMazeWallBrickMediumNWSE = UIImage.$(21955);
var UIImageRideMazeWallBrickThinSWNE = UIImage.$(21956);
var UIImageRideMazeWallBrickThinNWSE = UIImage.$(21957);
var UIImageRideMazeWallIceThickFull = UIImage.$(21964);
var UIImageRideMazeWallIceThickSWNE = UIImage.$(21965);
var UIImageRideMazeWallIceThickNWSE = UIImage.$(21966);
var UIImageRideMazeWallIceMediumSWNE = UIImage.$(21967);
var UIImageRideMazeWallIceMediumNWSE = UIImage.$(21968);
var UIImageRideMazeWallIceThinSWNE = UIImage.$(21969);
var UIImageRideMazeWallIceThinNWSE = UIImage.$(21970);
var UIImageRideMazeWallWoodenThickFull = UIImage.$(21977);
var UIImageRideMazeWallWoodenThickSWNE = UIImage.$(21978);
var UIImageRideMazeWallWoodenThickNWSE = UIImage.$(21979);
var UIImageRideMazeWallWoodenMediumSWNE = UIImage.$(21980);
var UIImageRideMazeWallWoodenMediumNWSE = UIImage.$(21981);
var UIImageRideMazeWallWoodenThinSWNE = UIImage.$(21982);
var UIImageRideMazeWallWoodenThinNWSE = UIImage.$(21983);
var UIImageFirecracker = UIImage.$A(22927, 28, 2);
var UIImageLandOwnershipAvailable = UIImage.$(22955);
var UIImageLandConstructionRightsAvailable = UIImage.$(22956);
var UIImageNextWeather = UIImage.$(23189);
var UIImageWeatherSun = UIImage.$(23190);
var UIImageWeatherSunCloud = UIImage.$(23191);
var UIImageWeatherCloud = UIImage.$(23192);
var UIImageWeatherLightRain = UIImage.$(23193);
var UIImageWeatherHeavyRain = UIImage.$(23194);
var UIImageWeatherStorm = UIImage.$(23195);
var UIImageWeatherSnow = UIImage.$(23196);
var UIImageRatingLow = UIImage.$(23197);
var UIImageRatingHigh = UIImage.$(23198);
var UIImageMenuCheckmark = UIImage.$(23199);
var UIImageMenuNewGame = UIImage.$(23207);
var UIImageMenuLoadGame = UIImage.$(23208);
var UIImageMenuTutorial = UIImage.$(23209);
var UIImageMenuExit = UIImage.$(23210);
var UIImageMenuToolbox = UIImage.$(23211);
var UIImageMenuLogo = UIImage.$(23212);
var UIImageMenuLogoSmall = UIImage.$(23213);
var UIImageFlatTextureGrass1 = UIImage.$(28959);
var UIImageFlatTextureGrass2 = UIImage.$(28960);
var UIImageFlatTextureGrass3 = UIImage.$(28961);
var UIImageFlatTextureGrass4 = UIImage.$(28962);
var UIImageFlatTextureGrass5 = UIImage.$(28963);
var UIImageFlatTextureGrass6 = UIImage.$(28964);
var UIImageFlatTextureSandLight1 = UIImage.$(28965);
var UIImageFlatTextureSandLight2 = UIImage.$(28966);
var UIImageFlatTextureSandLight3 = UIImage.$(28967);
var UIImageFlatTextureSandLight4 = UIImage.$(28968);
var UIImageFlatTextureSandLight5 = UIImage.$(28969);
var UIImageFlatTextureSandLight6 = UIImage.$(28970);
var UIImageFlatTextureSandDark1 = UIImage.$(28971);
var UIImageFlatTextureSandDark2 = UIImage.$(28972);
var UIImageFlatTextureSandDark3 = UIImage.$(28973);
var UIImageFlatTextureSandDark4 = UIImage.$(28974);
var UIImageFlatTextureSandDark5 = UIImage.$(28975);
var UIImageFlatTextureSandDark6 = UIImage.$(28976);
var UIImageFlatTextureDirt1 = UIImage.$(28977);
var UIImageFlatTextureDirt2 = UIImage.$(28978);
var UIImageFlatTextureDirt3 = UIImage.$(28979);
var UIImageFlatTextureDirt4 = UIImage.$(28980);
var UIImageFlatTextureDirt5 = UIImage.$(28981);
var UIImageFlatTextureDirt6 = UIImage.$(28982);
var UIImageFlatTextureSand1 = UIImage.$(28983);
var UIImageFlatTextureSand2 = UIImage.$(28984);
var UIImageFlatTextureSand3 = UIImage.$(28985);
var UIImageFlatTextureSand4 = UIImage.$(28986);
var UIImageFlatTextureSand5 = UIImage.$(28987);
var UIImageFlatTextureSand6 = UIImage.$(28988);
var UIImageFlatTextureRock1 = UIImage.$(28989);
var UIImageFlatTextureRock2 = UIImage.$(28990);
var UIImageFlatTextureRock3 = UIImage.$(28991);
var UIImageFlatTextureRock4 = UIImage.$(28992);
var UIImageFlatTextureRock5 = UIImage.$(28993);
var UIImageFlatTextureRock6 = UIImage.$(28994);
var UIImageFlatTextureMartian1 = UIImage.$(28995);
var UIImageFlatTextureMartian2 = UIImage.$(28996);
var UIImageFlatTextureMartian3 = UIImage.$(28997);
var UIImageFlatTextureMartian4 = UIImage.$(28998);
var UIImageFlatTextureMartian5 = UIImage.$(28999);
var UIImageFlatTextureMartian6 = UIImage.$(29000);
var UIImageFlatTextureGrassClumps1 = UIImage.$(29001);
var UIImageFlatTextureGrassClumps2 = UIImage.$(29002);
var UIImageFlatTextureGrassClumps3 = UIImage.$(29003);
var UIImageFlatTextureGrassClumps4 = UIImage.$(29004);
var UIImageFlatTextureGrassClumps5 = UIImage.$(29005);
var UIImageFlatTextureGrassClumps6 = UIImage.$(29006);
var UIImageFlatTextureIce1 = UIImage.$(29007);
var UIImageFlatTextureIce2 = UIImage.$(29008);
var UIImageFlatTextureIce3 = UIImage.$(29009);
var UIImageFlatTextureIce4 = UIImage.$(29010);
var UIImageFlatTextureIce5 = UIImage.$(29011);
var UIImageFlatTextureIce6 = UIImage.$(29012);
var UIImageWallMedievalGray = UIImage.$(112511);
var UIImageWallTin = UIImage.$(124211);
var UIImageWallSandBrick = UIImage.$(152747);
var UIImageWallRustyTin = UIImage.$(163772);
var UIImageWallSand = UIImage.$(163784);
var UIImageWallLightSand = UIImage.$(168735);
var UIImageWallBordeauxRed = UIImage.$(171630);
var UIImageWallViolet = UIImage.$(171641);
var UIImageG2Logo = UIImage.$(29357);
var UIImageG2Title = UIImage.$(29358);
var UIImageG2Fastforward = UIImage.$(29359);
var UIImageG2SpeedArrow = UIImage.$(29360);
var UIImageG2HyperArrow = UIImage.$(29361);
var UIImageG2TabLand = UIImage.$(29362);
var UIImageG2Placeholder = UIImage.$(29363);
var UIImageG2ZoomIn = UIImage.$(29364);
var UIImageG2ZoomOut = UIImage.$(29366);
var UIImageG2TabTree = UIImage.$(29368);
var UIImageG2TabPencil = UIImage.$(29369);
var UIImageG2LargeScenery = UIImage.$(29370);
var UIImageG2Trees = UIImage.$(29371);
var UIImageG2Footpath = UIImage.$(29372);
var UIImageG1CloseDisable = UIImage.$(29373);
var UIImageG1CloseEnable = UIImage.$(29375);
var UIImageG1TestDisable = UIImage.$(29377);
var UIImageG1TestEnable = UIImage.$(29379);
var UIImageG1OpenDisable = UIImage.$(29381);
var UIImageG1OpenEnable = UIImage.$(29383);
var UIImageG2Simulate = UIImage.$(29481);
var UIImageG1SimulateDisable = UIImage.$(29482);
var UIImageG1SimulateEnable = UIImage.$(29483);
var UIImageG2Restart = UIImage.$(29385);
var UIImageG2Stop = UIImage.$(29386);
var UIImageG2Play = UIImage.$(29387);
var UIImageG2Skip = UIImage.$(29388);
var UIImageG2Sandbox = UIImage.$(29389);
var UIImageG2TabNews = UIImage.$(29414);
var UIImageG2Locked = UIImage.$(29415);
var UIImageG2MenuMultiplayer = UIImage.$(29416);
var UIImageG2Sort = UIImage.$(29433);
var UIImageG2Copy = UIImage.$(29434);
var UIImageG2Paste = UIImage.$(29435);
var UIImageG2Search = UIImage.$(29461);
var UIImageG2Pipette = UIImage.$(29467);
var UIImageG2Chat = UIImage.$(29468);
var UIImageG2SceneryScatterLow = UIImage.$(29489);
var UIImageG2SceneryScatterMedium = UIImage.$(29490);
var UIImageG2SceneryScatterHigh = UIImage.$(29491);
var UIImageG2View = UIImage.$(29494);
var TextNode = (function () {
    function TextNode(childs) {
        this._childs = [];
        this._outline = false;
        this._childs = childs;
    }
    TextNode.$ = function () {
        var childs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            childs[_i] = arguments[_i];
        }
        var node = new TextNode(childs);
        return node;
    };
    TextNode.$S = function (string) {
        var node = new StringNode(string);
        return node;
    };
    TextNode.$I = function (image) {
        var node = new ImageNode(image);
        return node;
    };
    TextNode.prototype._isLeaf = function () {
        return this._childs.length === 0;
    };
    TextNode.prototype._isStopover = function () {
        return this._childs.length > 0;
    };
    TextNode.prototype._isValid = function () {
        return true;
    };
    TextNode.prototype._text = function () {
        return this._childs.map(function (val) { return val._text(); }).join('');
    };
    TextNode.prototype._unifyNewline = function (font) {
        if (font === void 0) { font = undefined; }
        var existFont = typeof font !== "undefined";
        var isSmaller = existFont && font === TextFont.Tiny;
        if (this._isStopover()) {
            var numberOfChilds = this._childs.length;
            var _loop_1 = function () {
                var child = this_1._childs[i];
                if (child._isLeaf() && child instanceof StringNode) {
                    var splitted = child._string.split("\\n");
                    if (splitted.length > 1) {
                        var newChilds = splitted
                            .map(function (val, index, array) {
                            var node = new StringNode(val, false);
                            node._outline = child._outline;
                            node._color = child._color;
                            var nodes = [node];
                            if (index < array.length - 1) {
                                nodes.push(new _NewlineNode(isSmaller));
                                if (existFont) {
                                    nodes.push(new _FontNode(font));
                                }
                            }
                            return nodes;
                        }).reduce(function (acc, val) { return acc.concat(val); });
                        var newNode = TextNode.$.apply(TextNode, newChilds);
                        this_1._childs[i] = newNode;
                    }
                }
                else {
                    child._unifyNewline(font);
                }
            };
            var this_1 = this;
            for (var i = 0; i < numberOfChilds; i++) {
                _loop_1();
            }
        }
    };
    TextNode.prototype._unifyOutline = function (parentExist) {
        if (parentExist === void 0) { parentExist = false; }
        if (this._isLeaf() && this instanceof StringNode) {
            if (parentExist) {
                this._string = this._string.remove("{OUTLINE}").remove("{OUTLINE_OFF}");
            }
            else if (this._outline && this._isPureString()) {
                this._string = "{OUTLINE}" + this._string + "{OUTLINE_OFF}";
            }
        }
        else if (this._isStopover()) {
            var childs = this._childs;
            if (childs.length > 0) {
                var apply = parentExist || this._outline;
                for (var _i = 0, childs_1 = childs; _i < childs_1.length; _i++) {
                    var child = childs_1[_i];
                    child._unifyOutline(apply);
                }
                if (apply) {
                    var isBegin = true;
                    var prevChild;
                    for (var i = 0; i < childs.length; i++) {
                        var child_1 = this._childs[i];
                        if (isBegin && child_1 instanceof StringNode) {
                            child_1._string = "{OUTLINE}" + child_1._string;
                            isBegin = false;
                        }
                        if (child_1 instanceof _NewlineNode) {
                            if (typeof prevChild !== "undefined") {
                                prevChild._string = prevChild._string + "{OUTLINE_OFF}";
                            }
                            isBegin = true;
                        }
                        if (child_1 instanceof StringNode) {
                            prevChild = child_1;
                            if (i >= this._childs.length - 1) {
                                child_1._string = child_1._string + "{OUTLINE_OFF}";
                            }
                        }
                    }
                }
            }
        }
    };
    TextNode.prototype._unifyColor = function (parentColor) {
        var _a;
        if (parentColor === void 0) { parentColor = undefined; }
        var color = (_a = this._color) !== null && _a !== void 0 ? _a : parentColor;
        if (this._isLeaf() && this._isPureString() && this instanceof StringNode) {
            this._string = "{" + color + "}" + this._string;
        }
        else if (this._isStopover()) {
            for (var _i = 0, _b = this._childs; _i < _b.length; _i++) {
                var child = _b[_i];
                child._unifyColor(color);
            }
        }
    };
    TextNode.prototype.__leafs = function () {
        if (this._isLeaf()) {
            var string = this;
            return [string];
        }
        else {
            return this._childs.map(function (val) { return val.__leafs(); }).flatMap();
        }
    };
    TextNode.prototype._description = function (depth, index) {
        if (depth === void 0) { depth = 0; }
        if (index === void 0) { index = undefined; }
        var tab = "│ ";
        var tabs = __spreadArray([], Array(depth)).map(function (_) { return tab; }).join('');
        var childTabs = tabs + tab;
        var childs = "[]";
        if (typeof this._childs !== "undefined" && this._childs.length > 0) {
            childs = "[" + this._childs.map(function (val, index) { return val._description(depth + 1, index); }).join(",") + "]";
        }
        return (typeof index !== "undefined" ? '[' + index + ']' : "") + "{\n" + childTabs + "type: " + this.constructor.name + "," + (this instanceof StringNode ? "\n" + childTabs + "string: " + this._string + "," : "") + "\n" + childTabs + "outline: " + this._outline + ",\n" + childTabs + "color: " + this._color + ",\n" + childTabs + "childs: " + childs + "\n" + tabs + "}";
    };
    TextNode.prototype._isPureString = function () {
        return this instanceof ImageNode === false && !this._isPrivate();
    };
    TextNode.prototype._isPrivate = function () {
        return this instanceof _NewlineNode || this instanceof _FontNode;
    };
    TextNode.prototype.outline = function (val) {
        if (val === void 0) { val = true; }
        this._outline = val;
        return this;
    };
    TextNode.prototype.color = function (val) {
        this._color = val;
        return this;
    };
    return TextNode;
}());
var TN = (function (_super) {
    __extends(TN, _super);
    function TN() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TN;
}(TextNode));
;
var TextBuilder = (function () {
    function TextBuilder(node) {
        this._outline = false;
        if (typeof node === "string" || typeof node === "undefined") {
            this._root = StringNode.$S(node);
        }
        else {
            this._root = node;
        }
    }
    TextBuilder.$ = function (node) {
        var builder = new TextBuilder(node);
        return builder;
    };
    TextBuilder.prototype._text = function () {
        var font = typeof this._font !== "undefined" ? "{" + this._font + "}" : "";
        var text = font + this._root._text();
        return text;
    };
    TextBuilder.prototype.build = function () {
        this._root._unifyNewline(this._font);
        this._root._unifyColor(this._color);
        this._root._unifyOutline(this._outline);
        return this._text();
    };
    TextBuilder.prototype.font = function (val) {
        this._font = val;
        return this;
    };
    TextBuilder.prototype.outline = function () {
        this._outline = true;
        return this;
    };
    TextBuilder.prototype.color = function (val) {
        this._color = val;
        return this;
    };
    TextBuilder.prototype.description = function () {
        return this._root._description();
    };
    return TextBuilder;
}());
var TB = (function (_super) {
    __extends(TB, _super);
    function TB() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TB;
}(TextBuilder));
;
var StringNode = (function (_super) {
    __extends(StringNode, _super);
    function StringNode(string, useEscaping) {
        if (useEscaping === void 0) { useEscaping = true; }
        var _this = _super.call(this, []) || this;
        if (useEscaping) {
            _this._string = string.split('\n').join("\\n");
        }
        else {
            _this._string = string;
        }
        return _this;
    }
    StringNode.prototype._isValid = function () {
        return this._isLeaf();
    };
    StringNode.prototype._text = function () {
        return this._string;
    };
    return StringNode;
}(TextNode));
var ImageNode = (function (_super) {
    __extends(ImageNode, _super);
    function ImageNode(image) {
        var _this = this;
        var imageId = image._frames[0];
        var head = Math.floor(imageId / (256 * 256));
        var section = Math.floor(imageId / 256);
        var item = imageId % 256;
        var string = "{INLINE_SPRITE}{" + item + "}{" + section + "}{" + head + "}{0}";
        _this = _super.call(this, string, false) || this;
        return _this;
    }
    return ImageNode;
}(StringNode));
var _NewlineNode = (function (_super) {
    __extends(_NewlineNode, _super);
    function _NewlineNode(isSmaller) {
        if (isSmaller === void 0) { isSmaller = false; }
        var _this = this;
        var string = isSmaller ? "{NEWLINE_SMALLER}{NEWLINE_SMALLER}" : "{NEWLINE}";
        _this = _super.call(this, string, false) || this;
        return _this;
    }
    return _NewlineNode;
}(StringNode));
var _FontNode = (function (_super) {
    __extends(_FontNode, _super);
    function _FontNode(font) {
        var _this = this;
        var string = "{" + font + "}";
        _this = _super.call(this, string, false) || this;
        return _this;
    }
    return _FontNode;
}(StringNode));
var UIEdgeInsetsZero = { top: 0, left: 0, bottom: 0, right: 0 };
var UIEdgeInsetsContainer = { top: 16, left: 2, bottom: 2, right: 2 };
var UIEdgeInsetsTabContainer = { top: 45, left: 2, bottom: 2, right: 2 };
var UIAxis;
(function (UIAxis) {
    UIAxis[UIAxis["Vertical"] = 0] = "Vertical";
    UIAxis[UIAxis["Horizontal"] = 1] = "Horizontal";
})(UIAxis || (UIAxis = {}));
var UIWidget = (function () {
    function UIWidget() {
        this._origin = UIPointZero;
        this._size = UIOptionalSizeDefulat;
        this._isDisabled = false;
        this._isVisible = true;
        this._minSize = UISizeZero;
        this._offset = UIPointZero;
        this._name = this.constructor.name + '-' + uuid();
    }
    UIWidget.prototype._getUIWidgets = function () {
        return [this];
    };
    UIWidget.prototype._getWidgets = function () {
        return [this._widget];
    };
    UIWidget.prototype._estimatedSize = function () {
        var _a, _b;
        var minSize = this._minSize;
        return {
            width: (_a = this._size.width) !== null && _a !== void 0 ? _a : minSize.width,
            height: (_b = this._size.height) !== null && _b !== void 0 ? _b : minSize.height
        };
    };
    UIWidget.prototype._isUndefinedSize = function (axis) {
        switch (axis) {
            case UIAxis.Vertical: {
                return typeof this._size.height === "undefined";
            }
            case UIAxis.Horizontal: {
                return typeof this._size.width === "undefined";
            }
        }
    };
    UIWidget.prototype._layout = function (axis, origin, estimatedSize) {
        var _a, _b;
        if (typeof this._initialSize === "undefined") {
            this._initialSize = this._size;
        }
        this._origin = {
            x: origin.x + this._offset.x,
            y: origin.y + this._offset.y
        };
        var size = {
            width: (_a = this._size.width) !== null && _a !== void 0 ? _a : estimatedSize.width,
            height: (_b = this._size.height) !== null && _b !== void 0 ? _b : estimatedSize.height
        };
        this._size = {
            width: size.width - 1,
            height: size.height
        };
        switch (axis) {
            case UIAxis.Vertical: {
                return {
                    x: origin.x,
                    y: origin.y + size.height
                };
            }
            case UIAxis.Horizontal: {
                return {
                    x: origin.x + size.width,
                    y: origin.y
                };
            }
        }
    };
    UIWidget.prototype._build = function () {
        throw new Error("Method not implemented.");
    };
    UIWidget.prototype._update = function (widget) {
        var _a, _b;
        widget.x = this._origin.x;
        widget.y = this._origin.y;
        widget.width = ((_a = this._size.width) !== null && _a !== void 0 ? _a : 0) - 1;
        widget.height = ((_b = this._size.height) !== null && _b !== void 0 ? _b : 0) - 1;
        widget.tooltip = this._tooltip;
        widget.isDisabled = this._isDisabled;
        widget.isVisible = this._isVisible;
    };
    UIWidget.prototype._buildBaseValues = function () {
        var _a, _b;
        return {
            x: this._origin.x,
            y: this._origin.y,
            width: (_a = this._size.width) !== null && _a !== void 0 ? _a : 0,
            height: (_b = this._size.height) !== null && _b !== void 0 ? _b : 0,
            name: this._name,
            tooltip: this._tooltip,
            isDisabled: this._isDisabled,
            isVisible: this._isVisible
        };
    };
    UIWidget.prototype._loadWidget = function () {
        var _this = this;
        this._interactor._update(this._name, function (widget) {
            _this._widget = widget;
        });
    };
    UIWidget.prototype._resetSize = function () {
        if (typeof this._initialSize !== "undefined") {
            this._size = this._initialSize;
        }
    };
    UIWidget.prototype._refreshUI = function () {
        this._update(this._widget);
    };
    UIWidget.prototype._applyFont = function (text) {
        if (typeof this._font !== "undefined" && typeof text !== "undefined") {
            return new TextBuilder(text).font(this._font).build();
        }
        else {
            return text;
        }
    };
    UIWidget.prototype.updateUI = function (block) {
        if (block === void 0) { block = undefined; }
        var prevSize = this._size;
        block === null || block === void 0 ? void 0 : block(this);
        var changedSize = this._size;
        if (prevSize.width === changedSize.width && prevSize.height === changedSize.height) {
            this._refreshUI();
        }
        else {
            this._interactor.refreshWindow();
        }
    };
    UIWidget.prototype.getOrigin = function () {
        return this._origin;
    };
    UIWidget.prototype.minSize = function (val) {
        this._minSize = val;
        return this;
    };
    UIWidget.prototype.getMinSize = function () {
        return this._minSize;
    };
    UIWidget.prototype.width = function (val) {
        this._size = {
            width: val,
            height: this._size.height
        };
        this._initialSize = this._size;
        return this;
    };
    UIWidget.prototype.height = function (val) {
        this._size = {
            width: this._size.width,
            height: val
        };
        this._initialSize = this._size;
        return this;
    };
    UIWidget.prototype.size = function (val) {
        var size = UISizeZero;
        if (typeof val === "number") {
            size = { width: val, height: val };
        }
        else {
            size = val;
        }
        this._size = size;
        this._initialSize = size;
        return this;
    };
    UIWidget.prototype.getSize = function () {
        var _a, _b;
        var size = this._size;
        return {
            width: (_a = size.width) !== null && _a !== void 0 ? _a : 0,
            height: (_b = size.height) !== null && _b !== void 0 ? _b : 0
        };
    };
    UIWidget.prototype.tooltip = function (val) {
        this._tooltip = val;
        return this;
    };
    UIWidget.prototype.getTooltip = function () {
        return this._tooltip;
    };
    UIWidget.prototype.isDisabled = function (val) {
        this._isDisabled = val;
        return this;
    };
    UIWidget.prototype.getIsDisabled = function () {
        return this._isDisabled;
    };
    UIWidget.prototype.isVisible = function (val) {
        this._isVisible = val;
        return this;
    };
    UIWidget.prototype.getIsVisible = function () {
        return this._isVisible;
    };
    UIWidget.prototype.offset = function (val) {
        this._offset = val;
        return this;
    };
    UIWidget.prototype.getOffset = function () {
        return this._offset;
    };
    UIWidget.prototype.font = function (val) {
        this._font = val;
        return this;
    };
    UIWidget.prototype.getFont = function () {
        return this._font;
    };
    UIWidget.prototype.bind = function (proxy) {
        proxy._bind(this);
        return this;
    };
    UIWidget.prototype.resetSize = function () {
        return this.size(this._minSize);
    };
    UIWidget.prototype.description = function () {
        return "\nname: " + this._name + "\norigin: { x: " + this._origin.x + ", y: " + this._origin.y + " }\nsize: { width: " + this._size.width + ", height: " + this._size.height + " }\n";
    };
    return UIWidget;
}());
var UITab = (function () {
    function UITab(contentView, image) {
        if (image === void 0) { image = undefined; }
        this._minSize = UISizeZero;
        this._maxSize = { width: ui.width, height: ui.height };
        this._isExpandable = false;
        this._image = image !== null && image !== void 0 ? image : UIImageNone;
        this._contentView = contentView;
    }
    UITab.$ = function () {
        var widgets = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            widgets[_i] = arguments[_i];
        }
        var stack = new UIStack(UIAxis.Vertical, widgets);
        var tab = new UITab(stack);
        return tab;
    };
    UITab.prototype._data = function () {
        return {
            image: this._image._data(true),
            widgets: this._contentView._getWidgets()
        };
    };
    UITab.prototype._build = function () {
        var estimatedSize = this._contentView._estimatedSize();
        this._contentView._layout(UIAxis.Vertical, UIPointZero, estimatedSize);
        this._contentView._build();
    };
    UITab.prototype.spacing = function (val) {
        this._spacing = val;
        return this;
    };
    UITab.prototype.getSpacing = function () {
        return this._spacing;
    };
    UITab.prototype.padding = function (val) {
        this._padding = val;
        return this;
    };
    UITab.prototype.getPadding = function () {
        return this._padding;
    };
    UITab.prototype.isExpandable = function (val) {
        this._isExpandable = val;
        return this;
    };
    UITab.prototype.getIsExpandable = function () {
        return this._isExpandable;
    };
    UITab.prototype.getMinSize = function () {
        return this._minSize;
    };
    UITab.prototype.maxSize = function (val) {
        this._maxSize = val;
        return this;
    };
    UITab.prototype.getMaxSize = function () {
        return this._maxSize;
    };
    UITab.prototype.image = function (val) {
        this._image = val;
        return this;
    };
    UITab.prototype.getImage = function () {
        return this._image;
    };
    UITab.prototype.title = function (val) {
        this._title = val;
        return this;
    };
    UITab.prototype.getTitle = function () {
        return this._title;
    };
    UITab.prototype.bind = function (proxy) {
        proxy._bind(this);
        return this;
    };
    return UITab;
}());
var UIStack = (function (_super) {
    __extends(UIStack, _super);
    function UIStack(axis, widgets, isGrouped) {
        if (isGrouped === void 0) { isGrouped = false; }
        var _this = _super.call(this) || this;
        _this._spacing = 0;
        _this._insets = UIEdgeInsetsZero;
        _this._padding = UIEdgeInsetsZero;
        _this._axis = axis;
        _this._childs = widgets;
        _this._childs.forEach(function (val) {
            if (val instanceof UISpacer) {
                val._confirm(axis);
            }
        });
        _this._isGrouped = isGrouped;
        if (isGrouped) {
            _this._insets = {
                top: 6,
                left: 2,
                bottom: 2,
                right: 2
            };
        }
        return _this;
    }
    UIStack.$ = function (axis, isGrouped) {
        if (isGrouped === void 0) { isGrouped = false; }
        var widgets = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            widgets[_i - 2] = arguments[_i];
        }
        return new UIStack(axis, widgets, isGrouped);
    };
    UIStack.$V = function () {
        var widgets = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            widgets[_i] = arguments[_i];
        }
        return new UIStack(UIAxis.Vertical, widgets, false);
    };
    UIStack.$H = function () {
        var widgets = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            widgets[_i] = arguments[_i];
        }
        return new UIStack(UIAxis.Horizontal, widgets, false);
    };
    UIStack.$VG = function () {
        var widgets = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            widgets[_i] = arguments[_i];
        }
        return new UIStack(UIAxis.Vertical, widgets, true);
    };
    UIStack.$HG = function () {
        var widgets = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            widgets[_i] = arguments[_i];
        }
        return new UIStack(UIAxis.Horizontal, widgets, true);
    };
    UIStack.prototype._getUIWidgets = function () {
        var widgets = this._childs.map(function (val) { return val._getUIWidgets(); }).flatMap();
        if (this._isGrouped) {
            widgets.unshift(this);
        }
        return widgets;
    };
    UIStack.prototype._getWidgets = function () {
        var widgets = this._childs.map(function (val) { return val._getWidgets(); }).flatMap();
        if (this._isGrouped) {
            widgets.unshift(this._widget);
        }
        return widgets;
    };
    UIStack.prototype._containerSize = function () {
        var _this = this;
        return this._childs.map(function (val) { return val._estimatedSize(); })
            .reduce(function (acc, val) {
            switch (_this._axis) {
                case UIAxis.Vertical: {
                    return {
                        width: Math.max(acc.width, val.width),
                        height: acc.height + val.height + _this._spacing
                    };
                }
                case UIAxis.Horizontal: {
                    return {
                        width: acc.width + val.width + _this._spacing,
                        height: Math.max(acc.height, val.height)
                    };
                }
            }
        });
    };
    UIStack.prototype._isUnNamedGroup = function () {
        return this._isGrouped && typeof this._groupTitle === "undefined";
    };
    UIStack.prototype._isNamedGroup = function () {
        return this._isGrouped && typeof this._groupTitle !== "undefined";
    };
    UIStack.prototype._estimatedSize = function () {
        var _a, _b;
        var size = this._containerSize();
        if (this._isNamedGroup()) {
            var minWidth = ((_b = (_a = this._groupTitle) === null || _a === void 0 ? void 0 : _a.size().width) !== null && _b !== void 0 ? _b : 0) + 8;
            size = {
                width: Math.max(size.width, minWidth),
                height: size.height
            };
        }
        var unNamedGroupCorrect = this._isUnNamedGroup() ? 4 : 0;
        return {
            width: size.width + this._insets.left + this._insets.right + this._padding.left + this._padding.right,
            height: size.height + this._insets.top + this._insets.bottom + this._padding.top + this._padding.bottom - unNamedGroupCorrect
        };
    };
    UIStack.prototype._isUndefinedSize = function (axis) {
        return this._childs.filter(function (val) { return val._isUndefinedSize(axis); }).length > 0;
    };
    UIStack.prototype._layout = function (axis, origin, estimatedSize) {
        var _this = this;
        if (typeof this._initialSize === "undefined") {
            this._initialSize = this._size;
        }
        var thisEstimatedSize = this._estimatedSize();
        thisEstimatedSize = {
            width: Math.max(thisEstimatedSize.width, estimatedSize.width),
            height: Math.max(thisEstimatedSize.height, estimatedSize.height)
        };
        var isUnNamedGroup = this._isUnNamedGroup();
        var unNamedGroupCorrect = isUnNamedGroup ? 4 : 0;
        if (isUnNamedGroup) {
            this._origin = {
                x: origin.x,
                y: origin.y - unNamedGroupCorrect
            };
            this._size = {
                width: thisEstimatedSize.width,
                height: thisEstimatedSize.height + unNamedGroupCorrect
            };
        }
        else {
            this._origin = origin;
            this._size = thisEstimatedSize;
        }
        var childContainerSize = {
            width: thisEstimatedSize.width - (this._insets.left + this._insets.right + this._padding.left + this._padding.right),
            height: thisEstimatedSize.height - (this._insets.top + this._insets.bottom + this._padding.top + this._padding.bottom) + unNamedGroupCorrect
        };
        var childOrigin = {
            x: this._origin.x + this._insets.left + this._padding.left + this._offset.x,
            y: this._origin.y + this._insets.top + this._padding.top + this._offset.y
        };
        var point = childOrigin;
        var exactSizeChilds = this._childs.filter(function (val) { return !val._isUndefinedSize(_this._axis); });
        var undefinedSizeChilds = this._childs.filter(function (val) { return val._isUndefinedSize(_this._axis); });
        var numberOfUndefinedSizeChilds = undefinedSizeChilds.length;
        var undefinedSizeStacks = undefinedSizeChilds.filter(function (val) { return val instanceof UIStack; });
        var sumOfSpacing = this._spacing * (this._childs.length - 1);
        switch (this._axis) {
            case UIAxis.Vertical: {
                var sumOfExactChildHeights = 0;
                if (exactSizeChilds.length > 0) {
                    sumOfExactChildHeights = exactSizeChilds.map(function (val) { return val._estimatedSize().height; }).reduce(function (acc, val) { return acc + val; });
                }
                var autoHeight = 0;
                if (numberOfUndefinedSizeChilds > 0) {
                    autoHeight = Math.floor((childContainerSize.height - sumOfSpacing - sumOfExactChildHeights) / numberOfUndefinedSizeChilds);
                }
                var storedAutoHeight = autoHeight;
                var stackMaxHeights = 0;
                if (undefinedSizeStacks.length > 0) {
                    stackMaxHeights = undefinedSizeStacks.map(function (val) { return Math.max(autoHeight, val._estimatedSize().height); }).reduce(function (acc, val) { return acc + val; });
                }
                var othersCount = numberOfUndefinedSizeChilds - undefinedSizeStacks.length;
                if (othersCount > 0) {
                    autoHeight = Math.floor((childContainerSize.height - sumOfSpacing - sumOfExactChildHeights - stackMaxHeights) / othersCount);
                }
                for (var _i = 0, _a = this._childs; _i < _a.length; _i++) {
                    var child = _a[_i];
                    var isStack = child instanceof UIStack;
                    var isHeightUndefined = child._isUndefinedSize(this._axis);
                    var childEstimatedHeight = child._estimatedSize().height;
                    var childEstimatedSize = {
                        width: childContainerSize.width,
                        height: isHeightUndefined ? (isStack ? Math.max(childEstimatedHeight, storedAutoHeight) : autoHeight) : childEstimatedHeight
                    };
                    point = child._layout(this._axis, { x: childOrigin.x, y: point.y }, childEstimatedSize);
                    point = { x: point.x, y: point.y + this._spacing };
                }
                break;
            }
            case UIAxis.Horizontal: {
                var sumOfExactChildWidths = 0;
                if (exactSizeChilds.length > 0) {
                    sumOfExactChildWidths = exactSizeChilds.map(function (val) { return val._estimatedSize().width; }).reduce(function (acc, val) { return acc + val; });
                }
                var autoWidth = 0;
                if (numberOfUndefinedSizeChilds > 0) {
                    autoWidth = Math.floor((childContainerSize.width - sumOfSpacing - sumOfExactChildWidths) / numberOfUndefinedSizeChilds);
                }
                var storedAutoWidth = autoWidth;
                var stackMaxWidths = 0;
                if (undefinedSizeStacks.length > 0) {
                    stackMaxWidths = undefinedSizeStacks.map(function (val) { return Math.max(autoWidth, val._estimatedSize().width); }).reduce(function (acc, val) { return acc + val; });
                }
                var othersCount = numberOfUndefinedSizeChilds - undefinedSizeStacks.length;
                if (othersCount > 0) {
                    autoWidth = Math.floor((childContainerSize.width - sumOfSpacing - sumOfExactChildWidths - stackMaxWidths) / othersCount);
                }
                for (var _b = 0, _c = this._childs; _b < _c.length; _b++) {
                    var child = _c[_b];
                    var isStack = child instanceof UIStack;
                    var isWidthUndefined = child._isUndefinedSize(this._axis);
                    var childEstimatedWidth = child._estimatedSize().width;
                    var childEstimatedSize = {
                        width: isWidthUndefined ? (isStack ? Math.max(childEstimatedWidth, storedAutoWidth) : autoWidth) : childEstimatedWidth,
                        height: childContainerSize.height
                    };
                    point = child._layout(this._axis, { x: point.x, y: childOrigin.y }, childEstimatedSize);
                    point = { x: point.x + this._spacing, y: point.y };
                }
                break;
            }
        }
        return {
            x: this._origin.x + this._size.width,
            y: this._origin.y + this._size.height
        };
    };
    UIStack.prototype._loadWidget = function () {
        if (this._isGrouped) {
            _super.prototype._loadWidget.call(this);
        }
        this._childs.forEach(function (val) { return val._loadWidget(); });
    };
    UIStack.prototype._build = function () {
        var _a;
        if (this._isGrouped) {
            this._widget = __assign(__assign({}, this._buildBaseValues()), { text: (_a = this._groupTitle) !== null && _a !== void 0 ? _a : "", type: "groupbox" });
        }
        this._childs.forEach(function (val) { return val._build(); });
    };
    UIStack.prototype._update = function (widget) {
        var _a;
        _super.prototype._update.call(this, widget);
        if (this._isGrouped) {
            widget.name = (_a = this._groupTitle) !== null && _a !== void 0 ? _a : "";
        }
    };
    UIStack.prototype._resetSize = function () {
        _super.prototype._resetSize.call(this);
        this._childs.forEach(function (val) { return val._resetSize(); });
    };
    UIStack.prototype._refreshUI = function () {
        if (this._isGrouped) {
            _super.prototype._refreshUI.call(this);
        }
        this._childs.forEach(function (val) { return val._refreshUI(); });
    };
    UIStack.prototype.getAxis = function () {
        return this._axis;
    };
    UIStack.prototype.spacing = function (val) {
        this._spacing = val;
        return this;
    };
    UIStack.prototype.getSpacing = function () {
        return this._spacing;
    };
    UIStack.prototype.padding = function (val) {
        this._padding = val;
        return this;
    };
    UIStack.prototype.getPadding = function () {
        return this._padding;
    };
    UIStack.prototype.getIsGrouped = function () {
        return this._isGrouped;
    };
    UIStack.prototype.title = function (val) {
        if (this._isGrouped) {
            this._insets = {
                top: 16,
                left: 2,
                bottom: 2,
                right: 2
            };
        }
        this._groupTitle = val;
        return this;
    };
    UIStack.prototype.getGroupBoxTitle = function () {
        return this._groupTitle;
    };
    UIStack.prototype.getChilds = function () {
        return this._childs;
    };
    return UIStack;
}(UIWidget));
var UIConstructor = (function () {
    function UIConstructor() {
    }
    UIConstructor.prototype.constructTabs = function (tabs, selectedIndex, interactor, spacing, padding) {
        var _a, _b;
        if (selectedIndex >= tabs.length || selectedIndex < 0) {
            throw new Error("SelectedIndex is less than the count of tabs and must be at least 0.");
        }
        var minWidth = 31 * tabs.length + 6;
        for (var i = 0; i < tabs.length; i++) {
            var tab = tabs[i];
            var stack = tab._contentView
                .spacing((_a = tab._spacing) !== null && _a !== void 0 ? _a : spacing)
                .padding((_b = tab._padding) !== null && _b !== void 0 ? _b : padding);
            var results = this.construct(stack, interactor, UIEdgeInsetsTabContainer);
            tab._minSize = {
                width: Math.max(minWidth, results.size.width),
                height: results.size.height
            };
            if (tab._maxSize.width < tab._minSize.width || tab._maxSize.height < tab._minSize.height) {
                console.log("\nWARNING: UITab[" + i + "] maximum size is less than its minimum size!\nminSize: { width: " + tab._minSize.width + ", height: " + tab._minSize.height + " }\nmaxSize: { width: " + tab._maxSize.width + ", height: " + tab._maxSize.height + " }\nErrors can occur when resizing windows.\n");
            }
        }
        var selectedTab = tabs[selectedIndex];
        this.refreshTab(selectedTab, selectedTab._minSize);
        return {
            size: selectedTab._minSize,
            widgets: [],
            tabs: tabs.map(function (val) { return val._data(); })
        };
    };
    UIConstructor.prototype.construct = function (stack, interactor, insets) {
        if (insets === void 0) { insets = UIEdgeInsetsContainer; }
        this._injectInteractor(stack, interactor);
        return {
            size: this.calculateBounds(stack, insets),
            widgets: stack._getWidgets()
        };
    };
    UIConstructor.prototype._injectInteractor = function (stack, interactor) {
        var flattedChilds = stack._getUIWidgets();
        stack._interactor = interactor;
        flattedChilds.forEach(function (val) { return val._interactor = interactor; });
    };
    UIConstructor.prototype.calculateBounds = function (stack, insets) {
        var origin = {
            x: insets.left,
            y: insets.top
        };
        var estimatedSize = stack._estimatedSize();
        stack._layout(UIAxis.Vertical, origin, estimatedSize);
        stack._build();
        return {
            width: estimatedSize.width + insets.left + insets.right,
            height: estimatedSize.height + insets.top + insets.bottom
        };
    };
    UIConstructor.prototype.didLoadTabs = function (tabs) {
        var flattedChilds = tabs.map(function (val) { return val._contentView._getUIWidgets(); }).flatMap();
        flattedChilds.forEach(function (val) { return val._loadWidget(); });
    };
    UIConstructor.prototype.didLoad = function (stack) {
        var flattedChilds = stack._getUIWidgets();
        flattedChilds.forEach(function (val) { return val._loadWidget(); });
    };
    UIConstructor.prototype.refreshTab = function (tab, windowSize) {
        this.refresh(tab._contentView, windowSize, UIEdgeInsetsTabContainer);
    };
    UIConstructor.prototype.refresh = function (stack, windowSize, insets) {
        if (insets === void 0) { insets = UIEdgeInsetsContainer; }
        var origin = {
            x: insets.left,
            y: insets.top
        };
        var estimatedSize = {
            width: windowSize.width - (insets.left + insets.right),
            height: windowSize.height - (insets.top + insets.bottom)
        };
        stack._resetSize();
        stack._layout(UIAxis.Vertical, origin, estimatedSize);
        stack._refreshUI();
    };
    return UIConstructor;
}());
var UITabProxy = (function () {
    function UITabProxy() {
    }
    UITabProxy.$ = function () {
        var proxy = new UITabProxy();
        return proxy;
    };
    UITabProxy.prototype._bind = function (ui) {
        this.ui = ui;
    };
    return UITabProxy;
}());
var UITP = (function (_super) {
    __extends(UITP, _super);
    function UITP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UITP;
}(UITabProxy));
var UIWidgetProxy = (function () {
    function UIWidgetProxy() {
    }
    UIWidgetProxy.$ = function () {
        var proxy = new UIWidgetProxy();
        return proxy;
    };
    UIWidgetProxy.prototype._bind = function (ui) {
        this.ui = ui;
    };
    return UIWidgetProxy;
}());
var UIWP = (function (_super) {
    __extends(UIWP, _super);
    function UIWP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UIWP;
}(UIWidgetProxy));
var UIColor;
(function (UIColor) {
    UIColor[UIColor["Black"] = 0] = "Black";
    UIColor[UIColor["Gray"] = 1] = "Gray";
    UIColor[UIColor["White"] = 2] = "White";
    UIColor[UIColor["DarkPurple"] = 3] = "DarkPurple";
    UIColor[UIColor["LightPurple"] = 4] = "LightPurple";
    UIColor[UIColor["BrightPurple"] = 5] = "BrightPurple";
    UIColor[UIColor["DarkBlue"] = 6] = "DarkBlue";
    UIColor[UIColor["LightBlue"] = 7] = "LightBlue";
    UIColor[UIColor["IcyBlue"] = 8] = "IcyBlue";
    UIColor[UIColor["DarkWater"] = 9] = "DarkWater";
    UIColor[UIColor["LightWater"] = 10] = "LightWater";
    UIColor[UIColor["SaturatedGreen"] = 11] = "SaturatedGreen";
    UIColor[UIColor["DarkGreen"] = 12] = "DarkGreen";
    UIColor[UIColor["MossGreen"] = 13] = "MossGreen";
    UIColor[UIColor["BrightGreen"] = 14] = "BrightGreen";
    UIColor[UIColor["OliveGreen"] = 15] = "OliveGreen";
    UIColor[UIColor["DarkOliveGreen"] = 16] = "DarkOliveGreen";
    UIColor[UIColor["BrightYellow"] = 17] = "BrightYellow";
    UIColor[UIColor["Yellow"] = 18] = "Yellow";
    UIColor[UIColor["DarkYellow"] = 19] = "DarkYellow";
    UIColor[UIColor["LightOrange"] = 20] = "LightOrange";
    UIColor[UIColor["DarkOrange"] = 21] = "DarkOrange";
    UIColor[UIColor["LightBrown"] = 22] = "LightBrown";
    UIColor[UIColor["SaturatedBrown"] = 23] = "SaturatedBrown";
    UIColor[UIColor["DarkBrown"] = 24] = "DarkBrown";
    UIColor[UIColor["SalmonPink"] = 25] = "SalmonPink";
    UIColor[UIColor["BordeauxRed"] = 26] = "BordeauxRed";
    UIColor[UIColor["SaturatedRed"] = 27] = "SaturatedRed";
    UIColor[UIColor["BrightRed"] = 28] = "BrightRed";
    UIColor[UIColor["DarkPink"] = 29] = "DarkPink";
    UIColor[UIColor["BrightPink"] = 30] = "BrightPink";
    UIColor[UIColor["LightPink"] = 31] = "LightPink";
})(UIColor || (UIColor = {}));
var UIColorFlag;
(function (UIColorFlag) {
    UIColorFlag[UIColorFlag["Outline"] = 32] = "Outline";
    UIColorFlag[UIColorFlag["Inset"] = 64] = "Inset";
    UIColorFlag[UIColorFlag["Translucent"] = 128] = "Translucent";
})(UIColorFlag || (UIColorFlag = {}));
var UIWindowThemeDefault = {
    primary: UIColor.Gray,
    secondary: UIColor.Gray,
    tertiary: UIColor.Gray
};
var UIWindow = (function () {
    function UIWindow(title, contents) {
        this._uiConstructor = new UIConstructor();
        this._interactor = new UIInteractor();
        this._selectedTabIndex = 0;
        this._theme = UIWindowThemeDefault;
        this._spacing = 0;
        this._padding = UIEdgeInsetsZero;
        this._initialExpandableState = false;
        this._isExpandable = false;
        this._minSize = UISizeZero;
        this._maxSize = { width: ui.width, height: ui.height };
        this._title = title;
        this._originalTitle = title;
        if (contents.length > 0) {
            if (contents[0] instanceof UIWidget) {
                var widgets = contents;
                this._singleContentView = new UIStack(UIAxis.Vertical, widgets);
            }
            else {
                var tabs = contents;
                this._tabs = tabs;
            }
        }
        else {
            throw new Error("Need to add at least one UITab or UIWidget.");
        }
    }
    UIWindow.$ = function (title) {
        var widgets = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            widgets[_i - 1] = arguments[_i];
        }
        return new UIWindow(title, widgets);
    };
    UIWindow.$T = function (title) {
        var tabs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            tabs[_i - 1] = arguments[_i];
        }
        return new UIWindow(title, tabs);
    };
    UIWindow.prototype._usingTab = function () {
        return typeof this._tabs !== "undefined";
    };
    UIWindow.prototype._convertColors = function () {
        var _a, _b, _c;
        return [
            (_a = this._theme.primary) !== null && _a !== void 0 ? _a : UIColor.Gray,
            (_b = this._theme.secondary) !== null && _b !== void 0 ? _b : UIColor.Gray,
            (_c = this._theme.tertiary) !== null && _c !== void 0 ? _c : UIColor.Gray
        ];
    };
    UIWindow.prototype._isOpened = function () {
        return typeof this._window !== "undefined";
    };
    UIWindow.prototype._sync = function () {
        if (this._isOpened()) {
            var window = this._window;
            this._origin = {
                x: window.x,
                y: window.y
            };
            this._size = {
                width: window.width,
                height: window.height
            };
            this._theme = {
                primary: window.colours[0],
                secondary: window.colours[1],
                tertiary: window.colours[2]
            };
        }
    };
    UIWindow.prototype._update = function () {
        var window = this._window;
        if (typeof window === "undefined") {
            return;
        }
        window.title = this._title;
        window.minWidth = this._isExpandable ? this._minSize.width : this._size.width;
        window.minHeight = this._isExpandable ? this._minSize.height : this._size.height;
        window.maxWidth = this._isExpandable ? this._maxSize.width : this._size.width;
        window.maxHeight = this._isExpandable ? this._maxSize.height : this._size.height;
        window.colours = this._convertColors();
        window.x = ui.width + 1;
        window.y = ui.height + 1;
        window.x = this._origin.x;
        window.y = this._origin.y;
    };
    UIWindow.prototype._onUpdate = function () {
        var window = this._window;
        if (typeof window === "undefined") {
            return;
        }
        var isSizeChange = window.width != this._size.width || window.height != this._size.height;
        if (isSizeChange) {
            this._size = {
                width: window.width,
                height: window.height
            };
            this._refresh(this._size);
        }
    };
    UIWindow.prototype._internalOnTabChange = function () {
        var _this = this;
        var currentTab = this._tabs[this._selectedTabIndex];
        var tabMinSize = currentTab._minSize;
        var tabMaxSize = currentTab._maxSize;
        var size = {
            width: Math.max(Math.min(this._size.width, tabMaxSize.width), tabMinSize.width),
            height: Math.max(Math.min(this._size.height, tabMaxSize.height), tabMinSize.height)
        };
        currentTab._contentView._loadWidget();
        this._refresh(size);
        this.updateUI(function (window) {
            var _a;
            window._minSize = tabMinSize;
            window._maxSize = tabMaxSize;
            window._isExpandable = window._initialExpandableState || currentTab._isExpandable;
            window._title = (_a = currentTab.getTitle()) !== null && _a !== void 0 ? _a : _this._originalTitle;
        });
    };
    UIWindow.prototype._refresh = function (size) {
        if (this._usingTab()) {
            var tab = this._tabs[this._selectedTabIndex];
            this._uiConstructor.refreshTab(tab, size);
        }
        else {
            this._uiConstructor.refresh(this._singleContentView, size);
        }
    };
    UIWindow.prototype._reflectResizingFromChild = function () {
        var minSize = this._minSize;
        var maxSize = this._maxSize;
        var contentView = this._singleContentView;
        if (typeof this._tabs !== "undefined") {
            var currentTab = this._tabs[this._selectedTabIndex];
            contentView = currentTab._contentView;
            contentView._resetSize();
            this._uiConstructor.constructTabs(this._tabs, this._selectedTabIndex, this._interactor, this._spacing, this._padding);
            minSize = currentTab._minSize;
            maxSize = currentTab._maxSize;
        }
        else if (typeof this._singleContentView !== "undefined") {
            contentView = this._singleContentView;
            contentView._resetSize();
            var construct = this._uiConstructor.construct(this._singleContentView, this._interactor);
            minSize = construct.size;
            maxSize = this._maxSize;
        }
        var size = {
            width: Math.max(Math.min(this._size.width, maxSize.width), minSize.width),
            height: Math.max(Math.min(this._size.height, maxSize.height), minSize.height)
        };
        contentView === null || contentView === void 0 ? void 0 : contentView._loadWidget();
        this._refresh(size);
        this.updateUI(function (window) {
            window._minSize = minSize;
            window._maxSize = maxSize;
        });
    };
    UIWindow.prototype.show = function () {
        var _this = this;
        var _a, _b, _c, _d, _e;
        if (this._isOpened()) {
            this.bringToFront();
            return this;
        }
        var title;
        this._initialExpandableState = this._isExpandable;
        var singlecontentView = (_a = this._singleContentView) === null || _a === void 0 ? void 0 : _a.spacing(this._spacing).padding(this._padding);
        var singleContentViewWidget;
        if (typeof singlecontentView !== "undefined") {
            var constructed = this._uiConstructor.construct(singlecontentView, this._interactor);
            singleContentViewWidget = constructed.widgets;
            this._minSize = constructed.size;
            title = this._originalTitle;
        }
        ;
        var tabDescriptions;
        if (typeof this._tabs !== "undefined") {
            var constructed = this._uiConstructor.constructTabs(this._tabs, this._selectedTabIndex, this._interactor, this._spacing, this._padding);
            tabDescriptions = constructed.tabs;
            this._minSize = constructed.size;
            this._maxSize = this._tabs[this._selectedTabIndex]._maxSize;
            this._isExpandable || (this._isExpandable = (_c = (_b = this._tabs) === null || _b === void 0 ? void 0 : _b[this._selectedTabIndex]._isExpandable) !== null && _c !== void 0 ? _c : false);
            title = (_e = (_d = this._tabs) === null || _d === void 0 ? void 0 : _d[this._selectedTabIndex].getTitle()) !== null && _e !== void 0 ? _e : this._originalTitle;
        }
        var windowDesc = {
            classification: this._title,
            width: this._minSize.width,
            height: this._minSize.height,
            title: this._title,
            minWidth: this._isExpandable ? this._minSize.width : undefined,
            maxWidth: this._isExpandable ? this._maxSize.width : undefined,
            minHeight: this._isExpandable ? this._minSize.height : undefined,
            maxHeight: this._isExpandable ? this._maxSize.height : undefined,
            widgets: singleContentViewWidget,
            colours: this._convertColors(),
            tabs: tabDescriptions,
            tabIndex: this._selectedTabIndex,
            onClose: function () {
                var _a;
                (_a = _this._onClose) === null || _a === void 0 ? void 0 : _a.call(_this, _this);
            },
            onUpdate: function () {
                _this._onUpdate();
            },
            onTabChange: function () {
                var _a, _b, _c;
                _this._selectedTabIndex = (_b = (_a = _this._window) === null || _a === void 0 ? void 0 : _a.tabIndex) !== null && _b !== void 0 ? _b : 0;
                _this._internalOnTabChange();
                (_c = _this._onTabChange) === null || _c === void 0 ? void 0 : _c.call(_this, _this, _this._selectedTabIndex);
            }
        };
        this._window = ui.openWindow(windowDesc);
        this._initialSize = {
            width: this._window.width,
            height: this._window.height
        };
        this._sync();
        this._interactor._findWidget(function (name) {
            return _this.findWidget(name);
        });
        this._interactor._refresh(function () {
            _this._reflectResizingFromChild();
        });
        if (typeof singlecontentView !== "undefined") {
            this._uiConstructor.didLoad(singlecontentView);
        }
        if (typeof this._tabs !== "undefined") {
            this._uiConstructor.didLoadTabs(this._tabs);
            this._internalOnTabChange();
        }
        return this;
    };
    UIWindow.prototype.updateUI = function (block) {
        this._sync();
        block(this);
        this._update();
    };
    UIWindow.prototype.close = function () {
        var _a;
        (_a = this._window) === null || _a === void 0 ? void 0 : _a.close();
        this._window = undefined;
    };
    UIWindow.prototype.bringToFront = function () {
        var _a;
        (_a = this._window) === null || _a === void 0 ? void 0 : _a.bringToFront();
    };
    UIWindow.prototype.findWidget = function (name) {
        var _a;
        return (_a = this._window) === null || _a === void 0 ? void 0 : _a.findWidget(name);
    };
    UIWindow.prototype.spacing = function (val) {
        this._spacing = val;
        return this;
    };
    UIWindow.prototype.getSpacing = function () {
        return this._spacing;
    };
    UIWindow.prototype.padding = function (val) {
        this._padding = val;
        return this;
    };
    UIWindow.prototype.getPadding = function () {
        return this._padding;
    };
    UIWindow.prototype.origin = function (val) {
        this._origin = val;
        return this;
    };
    UIWindow.prototype.getOrigin = function () {
        return this._origin;
    };
    UIWindow.prototype.getSize = function () {
        return this._size;
    };
    UIWindow.prototype.getMinSize = function () {
        return this._minSize;
    };
    UIWindow.prototype.getMaxSize = function () {
        return this._maxSize;
    };
    UIWindow.prototype.isExpandable = function (val) {
        this._isExpandable = val;
        return this;
    };
    UIWindow.prototype.getIsExpandable = function () {
        return this._isExpandable;
    };
    UIWindow.prototype.title = function (val) {
        this._title = val;
        return this;
    };
    UIWindow.prototype.getTitle = function () {
        return this._title;
    };
    UIWindow.prototype.selectedTabIndex = function (val) {
        if (this._isOpened()) {
            console.log("WARNING: The tab index can set only before opening the window.");
        }
        else {
            this._selectedTabIndex = val;
        }
        return this;
    };
    UIWindow.prototype.getSelectedTabIndex = function () {
        return this._selectedTabIndex;
    };
    UIWindow.prototype.theme = function (val) {
        this._theme = val;
        return this;
    };
    UIWindow.prototype.themePrimaryColor = function (val) {
        this._theme = {
            primary: val,
            secondary: this._theme.secondary,
            tertiary: this._theme.tertiary
        };
        return this;
    };
    UIWindow.prototype.themeSecondaryColor = function (val) {
        this._theme = {
            primary: this._theme.primary,
            secondary: val,
            tertiary: this._theme.tertiary
        };
        return this;
    };
    UIWindow.prototype.themeTertiaryColor = function (val) {
        this._theme = {
            primary: this._theme.primary,
            secondary: this._theme.secondary,
            tertiary: val
        };
        return this;
    };
    UIWindow.prototype.getTheme = function () {
        return this._theme;
    };
    UIWindow.prototype.onClose = function (block) {
        this._onClose = block;
        return this;
    };
    UIWindow.prototype.onTabChange = function (block) {
        this._onTabChange = block;
        return this;
    };
    UIWindow.prototype.bind = function (proxy) {
        proxy._bind(this);
        return this;
    };
    return UIWindow;
}());
var UIWindowProxy = (function () {
    function UIWindowProxy() {
    }
    UIWindowProxy.$ = function () {
        var proxy = new UIWindowProxy();
        return proxy;
    };
    UIWindowProxy.prototype._bind = function (ui) {
        this.ui = ui;
    };
    return UIWindowProxy;
}());
var UIWDP = (function (_super) {
    __extends(UIWDP, _super);
    function UIWDP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UIWDP;
}(UIWindowProxy));
var UIScrollbarType;
(function (UIScrollbarType) {
    UIScrollbarType["None"] = "none";
    UIScrollbarType["Vertical"] = "vertical";
    UIScrollbarType["Horizontal"] = "horizontal";
    UIScrollbarType["both"] = "both";
})(UIScrollbarType || (UIScrollbarType = {}));
var UISortOrder;
(function (UISortOrder) {
    UISortOrder["None"] = "none";
    UISortOrder["Ascending"] = "ascending";
    UISortOrder["Descending"] = "descending";
})(UISortOrder || (UISortOrder = {}));
var UITextAlignment;
(function (UITextAlignment) {
    UITextAlignment["Left"] = "left";
    UITextAlignment["Center"] = "centred";
})(UITextAlignment || (UITextAlignment = {}));
var UICheckbox = (function (_super) {
    __extends(UICheckbox, _super);
    function UICheckbox(text) {
        var _this = _super.call(this) || this;
        _this._isChecked = false;
        _this._text = text !== null && text !== void 0 ? text : "";
        return _this;
    }
    UICheckbox.$ = function (text) {
        var checkbox = new UICheckbox(text);
        var minSize = text.containerSize();
        return checkbox
            .height(15)
            .minSize(minSize);
    };
    UICheckbox.$UN = function () {
        var checkbox = new UICheckbox(undefined);
        return checkbox
            .size({ width: 11, height: 11 });
    };
    UICheckbox.prototype._build = function () {
        var _this = this;
        this._widget = __assign(__assign({}, this._buildBaseValues()), { type: "checkbox", text: this._applyFont(this._text), isChecked: this._isChecked, onChange: function (isChecked) {
                var _a;
                _this._isChecked = isChecked;
                (_a = _this._onChange) === null || _a === void 0 ? void 0 : _a.call(_this, _this, _this._isChecked);
            } });
    };
    UICheckbox.prototype._update = function (widget) {
        _super.prototype._update.call(this, widget);
        widget.text = this._applyFont(this._text);
        widget.isChecked = this._isChecked;
    };
    UICheckbox.prototype._isUnnamed = function () {
        return typeof this._text === "undefined";
    };
    UICheckbox.prototype.isChecked = function (val) {
        this._isChecked = val;
        return this;
    };
    UICheckbox.prototype.getIsChecked = function () {
        return this._isChecked;
    };
    UICheckbox.prototype.text = function (val) {
        this._text = val;
        return this;
    };
    UICheckbox.prototype.getText = function () {
        return this._text;
    };
    UICheckbox.prototype.toggle = function () {
        return this.isChecked(!this._isChecked);
    };
    UICheckbox.prototype.onChange = function (block) {
        this._onChange = block;
        return this;
    };
    return UICheckbox;
}(UIWidget));
var UIColorPicker = (function (_super) {
    __extends(UIColorPicker, _super);
    function UIColorPicker(color) {
        var _this = _super.call(this) || this;
        _this._color = color !== null && color !== void 0 ? color : UIColor.Black;
        return _this;
    }
    UIColorPicker.$ = function (color) {
        if (color === void 0) { color = undefined; }
        var colorPicker = new UIColorPicker(color);
        return colorPicker
            .size({ width: 12, height: 12 });
    };
    UIColorPicker.prototype._build = function () {
        var _this = this;
        this._widget = __assign(__assign({}, this._buildBaseValues()), { type: "colourpicker", colour: this._color, onChange: function (color) {
                var _a;
                _this._color = color;
                (_a = _this._onChange) === null || _a === void 0 ? void 0 : _a.call(_this, _this, _this._color);
            } });
    };
    UIColorPicker.prototype._update = function (widget) {
        _super.prototype._update.call(this, widget);
        widget.colour = this._color;
    };
    UIColorPicker.prototype.color = function (val) {
        this._color = val;
        return this;
    };
    UIColorPicker.prototype.getColor = function () {
        return this._color;
    };
    UIColorPicker.prototype.onChange = function (block) {
        this._onChange = block;
        return this;
    };
    return UIColorPicker;
}(UIWidget));
var UIDropdown = (function (_super) {
    __extends(UIDropdown, _super);
    function UIDropdown(items) {
        var _this = _super.call(this) || this;
        _this._selectedIndex = 0;
        _this._items = items;
        return _this;
    }
    UIDropdown.$ = function (items) {
        var dropdown = new UIDropdown(items);
        return dropdown.height(15)
            .minSize({ width: 50, height: 15 });
    };
    UIDropdown.prototype._build = function () {
        var _this = this;
        this._widget = __assign(__assign({}, this._buildBaseValues()), { type: "dropdown", textAlign: UITextAlignment.Center, items: this._items.map(function (val) { return _this._applyFont(val); }), selectedIndex: this._selectedIndex, onChange: function (index) {
                var _a;
                _this._selectedIndex = index;
                var item = _this._items[index];
                (_a = _this._onChange) === null || _a === void 0 ? void 0 : _a.call(_this, _this, _this._selectedIndex, item);
            } });
    };
    UIDropdown.prototype._update = function (widget) {
        var _this = this;
        _super.prototype._update.call(this, widget);
        widget.items = this._items.map(function (val) { return _this._applyFont(val); });
        widget.selectedIndex = this._selectedIndex;
    };
    UIDropdown.prototype.getItems = function () {
        return this._items;
    };
    UIDropdown.prototype.selected = function (val) {
        if (val < this._items.length && val >= 0) {
            this._selectedIndex = val;
        }
        else {
            var max = Math.max(0, this._items.length - 1);
            throw new Error("Enter a value between 0 and " + max + ".");
        }
        return this;
    };
    UIDropdown.prototype.getSelectedIndex = function () {
        return this._selectedIndex;
    };
    UIDropdown.prototype.onChange = function (block) {
        this._onChange = block;
        return this;
    };
    return UIDropdown;
}(UIWidget));
var UILabel = (function (_super) {
    __extends(UILabel, _super);
    function UILabel(text) {
        var _this = _super.call(this) || this;
        _this._align = UITextAlignment.Left;
        _this._text = text;
        return _this;
    }
    UILabel.$ = function (text) {
        var label = new UILabel(text);
        var minSize = text.containerSize();
        console.log(minSize);
        return label
            .height(15)
            .minSize(minSize);
    };
    UILabel.prototype._build = function () {
        var _this = this;
        this._widget = __assign(__assign({}, this._buildBaseValues()), { type: "label", text: this._applyFont(this._text), textAlign: this._align, onChange: function (index) {
                var _a;
                (_a = _this._onChange) === null || _a === void 0 ? void 0 : _a.call(_this, _this, index);
            } });
    };
    UILabel.prototype._update = function (widget) {
        _super.prototype._update.call(this, widget);
        widget.text = this._applyFont(this._text);
        widget.textAlign = this._align;
    };
    UILabel.prototype.align = function (val) {
        this._align = val;
        return this;
    };
    UILabel.prototype.getAlign = function () {
        return this._align;
    };
    UILabel.prototype.text = function (val) {
        this._text = val;
        var minSize = val.containerSize();
        this.minSize(minSize);
        return this;
    };
    UILabel.prototype.getText = function () {
        return this._text;
    };
    UILabel.prototype.onChange = function (block) {
        this._onChange = block;
        return this;
    };
    return UILabel;
}(UIWidget));
var UIALabel = (function (_super) {
    __extends(UIALabel, _super);
    function UIALabel(text, useLineSpacing) {
        if (useLineSpacing === void 0) { useLineSpacing = false; }
        var _this = this;
        var label = UILabel.$(text);
        var height = text.containerSize().height;
        var labelHeight = 15;
        var spacerHeight = Math.ceil((height - (useLineSpacing ? 0 : labelHeight)) / 2);
        _this = _super.call(this, UIAxis.Vertical, [UISpacer.$(spacerHeight), label, UISpacer.$(spacerHeight)]) || this;
        _this._label = label;
        return _this;
    }
    UIALabel.$L = function (text, useLineSpacing) {
        if (useLineSpacing === void 0) { useLineSpacing = false; }
        var alignedLabel = new UIALabel(text, useLineSpacing);
        return alignedLabel;
    };
    UIALabel.prototype.align = function (val) {
        this._label.align(val);
        return this;
    };
    UIALabel.prototype.getAlign = function () {
        return this._label.getAlign();
    };
    UIALabel.prototype.text = function (val) {
        this._label.text(val);
        return this;
    };
    UIALabel.prototype.getText = function () {
        return this._label.getText();
    };
    UIALabel.prototype.onChange = function (block) {
        this._label.onChange(block);
        return this;
    };
    return UIALabel;
}(UIStack));
var UISpacer = (function (_super) {
    __extends(UISpacer, _super);
    function UISpacer(spacing) {
        if (spacing === void 0) { spacing = undefined; }
        var _this = _super.call(this) || this;
        _this._spacing = spacing;
        return _this;
    }
    UISpacer.$ = function (spacing) {
        if (spacing === void 0) { spacing = undefined; }
        return new UISpacer(spacing);
    };
    UISpacer.prototype._isUndefinedSize = function (axis) {
        if (axis === this._axis) {
            return _super.prototype._isUndefinedSize.call(this, axis);
        }
        else {
            return false;
        }
    };
    UISpacer.prototype._confirm = function (axis) {
        this._axis = axis;
        switch (axis) {
            case UIAxis.Vertical: {
                this._size = { width: undefined, height: this._spacing };
                break;
            }
            case UIAxis.Horizontal: {
                this._size = { width: this._spacing, height: undefined };
                break;
            }
        }
    };
    UISpacer.prototype._build = function () {
        this._widget = __assign(__assign({}, this._buildBaseValues()), { type: "label" });
    };
    UISpacer.prototype.getAxis = function () {
        return this._axis;
    };
    UISpacer.prototype.getSpacing = function () {
        return this._spacing;
    };
    return UISpacer;
}(UIWidget));
var UISpinner = (function (_super) {
    __extends(UISpinner, _super);
    function UISpinner() {
        var _this = _super.call(this) || this;
        _this._min = 0;
        _this._max = 1;
        _this._value = 0.5;
        _this._step = 0.1;
        _this._fixed = 1;
        _this._dialogueTitle = "Title";
        _this._dialogueMessage = "Message{NEWLINE}(Set it using function 'dialogueInfo')";
        _this._dialogueMaxLength = 256;
        return _this;
    }
    UISpinner.$ = function () {
        var spinner = new UISpinner();
        return spinner.height(15)
            .minSize({ width: 50, height: 15 });
    };
    UISpinner.prototype._build = function () {
        var _this = this;
        var usingFormatter = typeof this._formatter !== "undefined";
        if (usingFormatter) {
            this._text = this._formatter(this._value);
        }
        else {
            this._text = this._value.toFixed(this._fixed);
        }
        this._widget = __assign(__assign({}, this._buildBaseValues()), { type: "spinner", text: this._applyFont(this._text), onDecrement: function () {
                var prev = _this._value;
                _this._value = Math.max(_this._value - _this._step, _this._min);
                _this._signal(prev, _this._value);
            }, onIncrement: function () {
                var prev = _this._value;
                _this._value = Math.min(_this._value + _this._step, _this._max);
                _this._signal(prev, _this._value);
            }, onClick: function () {
                var _a, _b;
                var currentLength = ((_b = (_a = _this._text) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) + 1;
                var maxLength = Math.max(_this._dialogueMaxLength, currentLength);
                var desc = {
                    title: _this._dialogueTitle,
                    description: _this._dialogueMessage,
                    initialValue: _this._text,
                    maxLength: maxLength,
                    callback: function (value) {
                        var prev = _this._value;
                        _this._value = Math.max(Math.min(parseFloat(value), _this._max), _this._min);
                        _this._signal(prev, _this._value);
                    }
                };
                ui.showTextInput(desc);
            } });
    };
    UISpinner.prototype._signal = function (prev, current) {
        var _a;
        var fixedCurrent = current.toFixed(this._fixed);
        var zero = +0.0;
        var fixedZero = zero.toFixed(this._fixed);
        var negativeFixedZero = '-' + fixedZero;
        var isNegativeZero = fixedCurrent === negativeFixedZero;
        var usingFormatter = typeof this._formatter !== "undefined";
        var valueChanged = prev.toFixed(this._fixed) != fixedCurrent;
        if (valueChanged) {
            if (usingFormatter) {
                if (isNegativeZero) {
                    this._text = this._formatter(zero);
                }
                else {
                    this._text = this._formatter(current);
                }
            }
            else {
                if (isNegativeZero) {
                    this._text = fixedZero;
                }
                else {
                    this._text = fixedCurrent;
                }
            }
            this.updateUI();
            (_a = this._onChange) === null || _a === void 0 ? void 0 : _a.call(this, this, current);
        }
    };
    UISpinner.prototype._update = function (widget) {
        _super.prototype._update.call(this, widget);
        widget.text = this._applyFont(this._text);
    };
    UISpinner.prototype.range = function (min, max) {
        if (min > max) {
            console.log("'min' cannot be greater than 'max'.");
        }
        else {
            this._min = min;
            this._max = max;
        }
        return this;
    };
    UISpinner.prototype.step = function (step, fixed) {
        if (fixed === void 0) { fixed = undefined; }
        this._step = step;
        if (typeof fixed === "undefined") {
            for (var i = 0; i < Infinity; i++) {
                var mul = Math.pow(10, i);
                if ((step * mul) % 1 == 0) {
                    this._fixed = i;
                    break;
                }
            }
        }
        else {
            this._fixed = fixed;
        }
        return this;
    };
    UISpinner.prototype.getStep = function () {
        return this._step;
    };
    UISpinner.prototype.getFixed = function () {
        return this._fixed;
    };
    UISpinner.prototype.value = function (val) {
        this._value = Math.max(this._min, Math.min(this._max, val));
        return this;
    };
    UISpinner.prototype.getValue = function () {
        return this._value;
    };
    UISpinner.prototype.formatter = function (black) {
        this._formatter = black;
        return this;
    };
    UISpinner.prototype.getFormatter = function () {
        return this._formatter;
    };
    UISpinner.prototype.onChange = function (block) {
        this._onChange = block;
        return this;
    };
    UISpinner.prototype.dialogueInfo = function (title, message, maxLength) {
        if (maxLength === void 0) { maxLength = 256; }
        this._dialogueTitle = title;
        this._dialogueMessage = message;
        this._dialogueMaxLength = maxLength;
        return this;
    };
    return UISpinner;
}(UIWidget));
var UITextBox = (function (_super) {
    __extends(UITextBox, _super);
    function UITextBox(text) {
        if (text === void 0) { text = undefined; }
        var _this = _super.call(this) || this;
        _this._maxLength = 256;
        _this._text = text !== null && text !== void 0 ? text : "";
        return _this;
    }
    UITextBox.$ = function (text) {
        if (text === void 0) { text = undefined; }
        var textBox = new UITextBox(text);
        return textBox.height(15)
            .minSize({ width: 50, height: 15 });
    };
    UITextBox.prototype._build = function () {
        var _this = this;
        this._widget = __assign(__assign({}, this._buildBaseValues()), { type: "textbox", text: this._text, maxLength: this._maxLength, onChange: function (text) {
                var _a;
                _this._text = text;
                (_a = _this._onChange) === null || _a === void 0 ? void 0 : _a.call(_this, _this, text);
            } });
    };
    UITextBox.prototype._update = function (widget) {
        _super.prototype._update.call(this, widget);
        widget.text = this._text;
        widget.maxLength = this._maxLength;
    };
    UITextBox.prototype.text = function (val) {
        this._text = val;
        return this;
    };
    UITextBox.prototype.getText = function () {
        return this._text;
    };
    UITextBox.prototype.maxLength = function (val) {
        this._maxLength = val;
        return this;
    };
    UITextBox.prototype.getMaxLength = function () {
        return this._maxLength;
    };
    UITextBox.prototype.onChange = function (block) {
        this._onChange = block;
        return this;
    };
    return UITextBox;
}(UIWidget));
var UIButton = (function (_super) {
    __extends(UIButton, _super);
    function UIButton() {
        var _this = _super.call(this) || this;
        _this._border = true;
        _this._isPressed = false;
        return _this;
    }
    UIButton.$ = function (title) {
        var button = new this();
        var minSize = title.containerSize();
        return button.title(title)
            .size(minSize)
            .minSize(minSize);
    };
    UIButton.$I = function (image) {
        var button = new this();
        var imageSize = image.size();
        var minSize = {
            width: imageSize.width + 4,
            height: imageSize.height + 4
        };
        return button
            .image(image)
            .size(minSize)
            .minSize(minSize);
    };
    UIButton.prototype._build = function () {
        var _this = this;
        this._widget = __assign(__assign({}, this._buildBaseValues()), { type: "button", border: this._border, image: this._image, isPressed: this._isPressed, text: this._applyFont(this._title), onClick: function () {
                var _a;
                (_a = _this._onClick) === null || _a === void 0 ? void 0 : _a.call(_this, _this);
                _this._internalOnChange();
            } });
    };
    UIButton.prototype._update = function (widget) {
        _super.prototype._update.call(this, widget);
        widget.border = this._border;
        if (typeof this._image !== "undefined") {
            widget.image = this._image;
        }
        widget.isPressed = this._isPressed;
        if (typeof this._title !== "undefined") {
            widget.text = this._applyFont(this._title);
        }
    };
    UIButton.prototype._isImageType = function () {
        return typeof this._image !== "undefined";
    };
    UIButton.prototype._internalOnChange = function () { };
    UIButton.prototype.border = function (val) {
        if (!this._isImageType()) {
            this._border = val;
        }
        return this;
    };
    UIButton.prototype.getBorder = function () {
        return this._border;
    };
    UIButton.prototype.image = function (val) {
        var _this = this;
        this._uiImage = val;
        intervalHelper.end(this._name);
        if (val._isAnimatable()) {
            var count = 0;
            intervalHelper.start(this._name, val._duration * 20, function () {
                var index = count % val._frames.length;
                var frame = val._frames[index];
                _this.updateUI(function (widget) {
                    widget._image = frame;
                });
                count += 1;
            });
        }
        this._image = val._frames[0];
        this._border = false;
        return this;
    };
    UIButton.prototype.getImage = function () {
        var _a;
        return (_a = this._uiImage) !== null && _a !== void 0 ? _a : UIImageNone;
    };
    UIButton.prototype.isImageEqual = function (val) {
        var _a, _b;
        return (_b = (_a = this._uiImage) === null || _a === void 0 ? void 0 : _a.isEqual(val)) !== null && _b !== void 0 ? _b : false;
    };
    UIButton.prototype.isPressed = function (val) {
        this._isPressed = val;
        return this;
    };
    UIButton.prototype.getIsPressed = function () {
        return this._isPressed;
    };
    UIButton.prototype.title = function (val) {
        if (!this._isImageType()) {
            this._title = val;
        }
        return this;
    };
    UIButton.prototype.getTitle = function () {
        return this._title;
    };
    UIButton.prototype.onClick = function (block) {
        this._onClick = block;
        return this;
    };
    return UIButton;
}(UIWidget));
var UIPageImageButton = (function (_super) {
    __extends(UIPageImageButton, _super);
    function UIPageImageButton(images) {
        var _this = _super.call(this) || this;
        _this._index = 0;
        _this._images = images;
        return _this;
    }
    UIPageImageButton.$IP = function () {
        var images = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            images[_i] = arguments[_i];
        }
        var button = new UIPageImageButton(images);
        var first = images.length > 0 ? images[0] : UIImageNone;
        var maxSize = images
            .map(function (val) { return val.size(); })
            .reduce(function (acc, val) {
            return {
                width: Math.max(acc.width, val.width),
                height: Math.max(acc.height, val.height)
            };
        });
        var imageSize = {
            width: maxSize.width + 1,
            height: maxSize.height + 2
        };
        return button
            .image(first)
            .size(imageSize)
            .minSize(imageSize);
    };
    UIPageImageButton.prototype._internalOnChange = function () {
        var _a;
        this._index = (this._index + 1) % this._images.length;
        var image = this._images[this._index];
        this.updateUI(function (widget) { return widget.image(image); });
        (_a = this._onPage) === null || _a === void 0 ? void 0 : _a.call(this, this, image);
    };
    UIPageImageButton.prototype.getImages = function () {
        return this._images;
    };
    UIPageImageButton.prototype.getCurrentIndex = function () {
        return this._index;
    };
    UIPageImageButton.prototype.onPage = function (block) {
        this._onPage = block;
        return this;
    };
    return UIPageImageButton;
}(UIButton));
var UIToggleButton = (function (_super) {
    __extends(UIToggleButton, _super);
    function UIToggleButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UIToggleButton.prototype._internalOnChange = function () {
        var _a, _b;
        var widget = this._widget;
        var isPressed = (_a = widget.isPressed) !== null && _a !== void 0 ? _a : false;
        var toggled = !isPressed;
        this.updateUI(function (widget) { return widget.isPressed(toggled); });
        (_b = this._onPress) === null || _b === void 0 ? void 0 : _b.call(this, this, toggled);
    };
    UIToggleButton.prototype.onPress = function (block) {
        this._onPress = block;
        return this;
    };
    UIToggleButton.prototype.toggle = function () {
        this._isPressed = !this._isPressed;
        return this;
    };
    return UIToggleButton;
}(UIButton));
var UIListViewColumn = (function () {
    function UIListViewColumn(header) {
        this._canSort = false;
        this._sortOrder = UISortOrder.None;
        this._header = header;
    }
    UIListViewColumn.$ = function (header) {
        return new UIListViewColumn(header);
    };
    UIListViewColumn.$F = function (header, width) {
        var listView = new UIListViewColumn(header);
        return listView.width(width);
    };
    UIListViewColumn.$R = function (header, widthRange) {
        var listView = new UIListViewColumn(header);
        if (typeof widthRange.min !== "undefined") {
            listView = listView.minWidth(widthRange.min);
        }
        if (typeof widthRange.max !== "undefined") {
            listView = listView.maxWidth(widthRange.max);
        }
        return listView;
    };
    UIListViewColumn.$W = function (header, weight) {
        var listView = new UIListViewColumn(header);
        return listView.weight(weight);
    };
    UIListViewColumn.prototype._data = function (applyFont) {
        return {
            canSort: this._canSort,
            sortOrder: this._sortOrder,
            header: applyFont(this._header),
            headerTooltip: this._headerTooltip,
            width: this._width,
            ratioWidth: this._weight,
            minWidth: this._minWidth,
            maxWidth: this._maxWidth
        };
    };
    UIListViewColumn.prototype.sortOrder = function (val) {
        this._sortOrder = val;
        return this;
    };
    UIListViewColumn.prototype.getSortOrder = function () {
        return this._sortOrder;
    };
    UIListViewColumn.prototype.canSort = function (val) {
        this._canSort = val;
        return this;
    };
    UIListViewColumn.prototype.getCanSort = function () {
        return this._canSort;
    };
    UIListViewColumn.prototype.tooltip = function (val) {
        this._headerTooltip = val;
        return this;
    };
    UIListViewColumn.prototype.getTooltip = function () {
        return this._headerTooltip;
    };
    UIListViewColumn.prototype.width = function (val) {
        this._width = val;
        return this;
    };
    UIListViewColumn.prototype.getWidth = function () {
        return this._width;
    };
    UIListViewColumn.prototype.weight = function (val) {
        this._weight = val;
        return this;
    };
    UIListViewColumn.prototype.getWeight = function () {
        return this._width;
    };
    UIListViewColumn.prototype.minWidth = function (val) {
        this._minWidth = val;
        return this;
    };
    UIListViewColumn.prototype.maxWidth = function (val) {
        this._maxWidth = val;
        return this;
    };
    UIListViewColumn.prototype.getWidthRange = function () {
        return {
            min: this._minWidth,
            max: this._maxWidth
        };
    };
    return UIListViewColumn;
}());
var UIListViewItem = (function () {
    function UIListViewItem(textList, isSeparator) {
        if (textList === void 0) { textList = []; }
        this._isSeparator = false;
        this._textList = textList;
    }
    UIListViewItem.$ = function (textList) {
        return new UIListViewItem(textList, false);
    };
    UIListViewItem.$S = function (text) {
        if (text === void 0) { text = undefined; }
        var val = typeof text === undefined ? [] : [text];
        return new UIListViewItem(val, true);
    };
    UIListViewItem.prototype._data = function (applyFont) {
        if (this._isSeparator) {
            var text = this._textList.length > 0 ? this._textList[0] : undefined;
            return {
                type: "seperator",
                text: applyFont(text)
            };
        }
        else {
            return this._textList.map(function (val) { return applyFont(val); });
        }
    };
    UIListViewItem.prototype.getIsSeparator = function () {
        return this._isSeparator;
    };
    UIListViewItem.prototype.getElements = function () {
        return this._textList;
    };
    return UIListViewItem;
}());
var UIListView = (function (_super) {
    __extends(UIListView, _super);
    function UIListView(columns) {
        if (columns === void 0) { columns = undefined; }
        var _this = _super.call(this) || this;
        _this._scrollbarType = UIScrollbarType.None;
        _this._isStriped = false;
        _this._showColumnHeaders = false;
        _this._items = [];
        _this._canSelect = false;
        _this._columns = columns;
        return _this;
    }
    UIListView.$ = function (columns) {
        if (columns === void 0) { columns = undefined; }
        var listView = new UIListView(columns);
        return listView
            .minSize({ width: 165, height: 120 });
    };
    UIListView.prototype._build = function () {
        var _this = this;
        var _a;
        this._widget = __assign(__assign({}, this._buildBaseValues()), { type: "listview", scrollbars: this._scrollbarType, isStriped: this._isStriped, showColumnHeaders: this._showColumnHeaders, columns: (_a = this._columns) === null || _a === void 0 ? void 0 : _a.map(function (val) { return val._data(function (val) { return _this._applyFont(val); }); }), items: this._items.map(function (val) { return val._data(function (val) { return _this._applyFont(val); }); }), selectedCell: this._selectedCell, canSelect: this._canSelect, onHighlight: function (item, column) {
                var _a;
                (_a = _this._onHeighlight) === null || _a === void 0 ? void 0 : _a.call(_this, _this, column, item);
            }, onClick: function (item, column) {
                var _a;
                (_a = _this._onClick) === null || _a === void 0 ? void 0 : _a.call(_this, _this, column, item);
            } });
    };
    UIListView.prototype._update = function (widget) {
        var _this = this;
        var _a;
        _super.prototype._update.call(this, widget);
        widget.scrollbars = this._scrollbarType;
        widget.isStriped = this._isStriped;
        widget.showColumnHeaders = this._showColumnHeaders;
        widget.columns = (_a = this._columns) === null || _a === void 0 ? void 0 : _a.map(function (val) { return val._data(function (val) { return _this._applyFont(val); }); });
        widget.items = this._items.map(function (val) { return val._data(function (val) { return _this._applyFont(val); }); });
        widget.selectedCell = this._selectedCell;
        widget.canSelect = this._canSelect;
    };
    UIListView.prototype.scrollbarType = function (val) {
        this._scrollbarType = val;
        return this;
    };
    UIListView.prototype.getScrollbarType = function () {
        return this._scrollbarType;
    };
    UIListView.prototype.isStriped = function (val) {
        this._isStriped = val;
        return this;
    };
    UIListView.prototype.getIsStriped = function () {
        return this._isStriped;
    };
    UIListView.prototype.showColumnHeaders = function (val) {
        this._showColumnHeaders = val;
        return this;
    };
    UIListView.prototype.getShowColumnHeaders = function () {
        return this._showColumnHeaders;
    };
    UIListView.prototype.addColumn = function (val) {
        var _a;
        (_a = this._columns) === null || _a === void 0 ? void 0 : _a.push(val);
        return this;
    };
    UIListView.prototype.addColumns = function (val) {
        var _a;
        this._columns = (_a = this._columns) === null || _a === void 0 ? void 0 : _a.concat(val);
        return this;
    };
    UIListView.prototype.addItem = function (val) {
        this._items.push(val);
        return this;
    };
    UIListView.prototype.addItems = function (val) {
        this._items = this._items.concat(val);
        return this;
    };
    UIListView.prototype.selectCell = function (row, column) {
        this._selectedCell = { row: row, column: column };
        return this;
    };
    UIListView.prototype.getSelectedCell = function () {
        return this._selectedCell;
    };
    UIListView.prototype.canSelect = function (val) {
        this._canSelect = val;
        return this;
    };
    UIListView.prototype.getCanSelect = function () {
        return this._canSelect;
    };
    UIListView.prototype.getColumnData = function (val) {
        var _a;
        return (_a = this._columns) === null || _a === void 0 ? void 0 : _a[val];
    };
    UIListView.prototype.getItemData = function (val) {
        var _a;
        return (_a = this._items) === null || _a === void 0 ? void 0 : _a[val];
    };
    UIListView.prototype.getHighlightedCell = function () {
        var widget = this._widget;
        return widget.highlightedCell;
    };
    UIListView.prototype.onHeighlight = function (block) {
        this._onHeighlight = block;
        return this;
    };
    UIListView.prototype.onClick = function (block) {
        this._onClick = block;
        return this;
    };
    UIListView.prototype.getColumns = function () {
        var _a;
        return (_a = this._columns) !== null && _a !== void 0 ? _a : [];
    };
    UIListView.prototype.getItems = function () {
        return this._items;
    };
    return UIListView;
}(UIWidget));
var UIViewportFlag;
(function (UIViewportFlag) {
    UIViewportFlag[UIViewportFlag["None"] = 0] = "None";
    UIViewportFlag[UIViewportFlag["UndergroundInside"] = 1] = "UndergroundInside";
    UIViewportFlag[UIViewportFlag["SeethroughRides"] = 2] = "SeethroughRides";
    UIViewportFlag[UIViewportFlag["SeethroughScenery"] = 4] = "SeethroughScenery";
    UIViewportFlag[UIViewportFlag["InvisibleSupports"] = 8] = "InvisibleSupports";
    UIViewportFlag[UIViewportFlag["LandHeights"] = 16] = "LandHeights";
    UIViewportFlag[UIViewportFlag["TrackHeights"] = 32] = "TrackHeights";
    UIViewportFlag[UIViewportFlag["PathHeights"] = 64] = "PathHeights";
    UIViewportFlag[UIViewportFlag["Gridlines"] = 128] = "Gridlines";
    UIViewportFlag[UIViewportFlag["LandOwnership"] = 256] = "LandOwnership";
    UIViewportFlag[UIViewportFlag["ConstructionRights"] = 512] = "ConstructionRights";
    UIViewportFlag[UIViewportFlag["SoundOn"] = 1024] = "SoundOn";
    UIViewportFlag[UIViewportFlag["InvisiblePeeps"] = 2048] = "InvisiblePeeps";
    UIViewportFlag[UIViewportFlag["HideBase"] = 4096] = "HideBase";
    UIViewportFlag[UIViewportFlag["HideVertical"] = 8192] = "HideVertical";
    UIViewportFlag[UIViewportFlag["InvisibleSprites"] = 32768] = "InvisibleSprites";
    UIViewportFlag[UIViewportFlag["Unknown"] = 32768] = "Unknown";
    UIViewportFlag[UIViewportFlag["SeethroughPaths"] = 65536] = "SeethroughPaths";
    UIViewportFlag[UIViewportFlag["ClipView"] = 131072] = "ClipView";
    UIViewportFlag[UIViewportFlag["HighlightPathIssues"] = 262144] = "HighlightPathIssues";
    UIViewportFlag[UIViewportFlag["TransparentBackground"] = 524288] = "TransparentBackground";
})(UIViewportFlag || (UIViewportFlag = {}));
var UIViewportScale;
(function (UIViewportScale) {
    UIViewportScale[UIViewportScale["One"] = 0] = "One";
    UIViewportScale[UIViewportScale["Half"] = 1] = "Half";
    UIViewportScale[UIViewportScale["Quater"] = 2] = "Quater";
    UIViewportScale[UIViewportScale["Eighth"] = 3] = "Eighth";
})(UIViewportScale || (UIViewportScale = {}));
var UIViewport = (function (_super) {
    __extends(UIViewport, _super);
    function UIViewport() {
        var _this = _super.call(this) || this;
        _this._zoom = UIViewportScale.One;
        _this._visibilityFlags = UIViewportFlag.None;
        _this._position = ui.mainViewport.getCentrePosition();
        return _this;
    }
    UIViewport.$ = function () {
        var viewport = new UIViewport();
        return viewport
            .minSize({ width: 165, height: 120 });
    };
    UIViewport.prototype._build = function () {
        var _a, _b;
        this._viewport = {
            left: this._origin.x,
            top: this._origin.y,
            right: this._origin.x + ((_a = this._size.width) !== null && _a !== void 0 ? _a : 0),
            bottom: this._origin.y + ((_b = this._size.height) !== null && _b !== void 0 ? _b : 0),
            rotation: ui.mainViewport.rotation,
            zoom: ui.mainViewport.zoom,
            visibilityFlags: this._visibilityFlags
        };
        this._widget = __assign(__assign({}, this._buildBaseValues()), { type: "viewport", viewport: this._viewport });
    };
    UIViewport.prototype._update = function (widget) {
        var _a, _b;
        _super.prototype._update.call(this, widget);
        this._viewport.left = this._origin.x;
        this._viewport.top = this._origin.y;
        this._viewport.right = this._origin.x + ((_a = this._size.width) !== null && _a !== void 0 ? _a : 0);
        this._viewport.bottom = this._origin.y + ((_b = this._size.height) !== null && _b !== void 0 ? _b : 0);
        this._viewport.zoom = this._zoom;
        this._viewport.visibilityFlags = this._visibilityFlags;
        this.moveTo(this._position);
    };
    UIViewport.prototype._loadWidget = function () {
        _super.prototype._loadWidget.call(this);
        this._viewport = this._widget.viewport;
        this._zoom = ui.mainViewport.zoom;
        this._viewport.zoom = this._zoom;
        this._viewport.visibilityFlags = this._visibilityFlags;
        this.moveTo(this._position);
    };
    UIViewport.prototype.position = function (val) {
        this._position = val;
        return this;
    };
    UIViewport.prototype.getPosition = function () {
        return this._position;
    };
    UIViewport.prototype.zoom = function (val) {
        this._zoom = val;
        return this;
    };
    UIViewport.prototype.getZoom = function () {
        return this._zoom;
    };
    UIViewport.prototype.flags = function (val) {
        this._visibilityFlags = val;
        return this;
    };
    UIViewport.prototype.getFlags = function () {
        return this._visibilityFlags;
    };
    UIViewport.prototype.getCenterPosition = function () {
        return this._viewport.getCentrePosition();
    };
    UIViewport.prototype.moveTo = function (val) {
        this._position = val;
        if (typeof this._viewport.moveTo !== "undefined") {
            this._viewport.moveTo(val);
        }
    };
    UIViewport.prototype.scrollTo = function (val) {
        this._position = val;
        if (typeof this._viewport.scrollTo !== "undefined") {
            this._viewport.scrollTo(val);
        }
    };
    UIViewport.prototype.scrollToMainViewportCenter = function () {
        this.scrollTo(ui.mainViewport.getCentrePosition());
    };
    UIViewport.prototype.mainViewportScrollToThis = function () {
        if (typeof this._viewport !== "undefined") {
            ui.mainViewport.scrollTo(this.getCenterPosition());
        }
    };
    return UIViewport;
}(UIWidget));
