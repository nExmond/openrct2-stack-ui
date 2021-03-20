/// <reference path='../modules/openrct2.d.ts' />

var openWindow = function () {

    // var images: UIImage[][] = [
    //     [UIImageTabObjective, UIImageTabRidesShop, UIImageTabRidesTransport, UIImageTabRidesGentle],
    //     [UIImageTabRidesRollerCoasters, UIImageTabRidesWater, UIImageTabRidesThrill, UIImageTabGuests]
    // ];
    // var buttons = images.map((val) => val.map((val) => UIButton.$I(val).size({ width: 31, height: 27 })));
    // var hstacks = buttons.map((val) => new UIStack(UIAxis.Horizontal, val));

    // UIWindow.$('',
    //     UISpinner.$().range(1, 10).step(1).value(2)
    //         .onChange((spinner, value) => {
    //             buttons.forEach((val) => val.forEach((val) => {
    //                 val.updateUI((widget) => {
    //                     var newImage = widget._uiImage!.duration(value);
    //                     widget.image(newImage);
    //                 });
    //             }));
    //         }),
    //     ...hstacks
    // ).show();

    // var currency = (1000000).format(TextFormat.Currency);
    // var monthYear = (120).format(TextFormat.MonthYear);
    // var message = `최소 ${currency} 이상의 공원 가치를 ${monthYear}까지 달성하세요`;
    // var stringId = (1347).format(TextFormat.StringId, 30);

    // var text = TB.$(message)
    //     .font(TextFont.Big)
    //     .color(TextColor.PaleLavender)
    //     .outline()
    //     .build();

    // var builder = TB.$(
    //     TN.$(
    //         TN.$I(UIImageStaffOrdersEmptyBins),
    //         TN.$(
    //             TN.$(
    //                 TN.$S("T\next\nno\nde")
    //             ).color(TextColor.PearlAqua)
    //                 .outline(),
    //             TN.$S("ABC"),
    //             TN.$I(UIImageStaffCostumeTiger),
    //             TN.$S("abc"),
    //             TN.$I(UIImageStaffOrdersSweeping)
    //         ).outline(),
    //         TN.$S("Tex\nt node2").color(TextColor.Yellow).outline(),
    //         TN.$(
    //             TN.$S("Text node3")
    //         ).outline()
    //     ).color(TextColor.Green)
    // )


    // var test = builder.build();

    // UIWindow.$('test',
    //     UILabel.$(text)
    //         .align(UITextAlignment.Center)
    //         .width(500),
    //     UILabel.$(stringId)
    //         .align(UITextAlignment.Center),
    //     UILabel.$(test)
    // ).themeSecondaryColor(UIColor.BrightRed)
    //     .show();

    var images: UIImage[] = [
        UIImageTabGears, UIImageTabWrench, UIImageTabPaint, UIImageTabTimer,
        UIImageTabGraphA, UIImageTabGraph, UIImageTabAdmission, UIImageTabFinancesSummary,
        UIImageTabThoughts, UIImageTabStats, UIImageTabStaffOptions, UIImageTabFinancesResearch,
        UIImageTabMusic, UIImageTabShopsAndStalls, UIImageTabKiosksAndFacilities, UIImageTabFinancesFinancialGraph,
        UIImageTabFinancesProfitGraph, UIImageTabFinancesValueGraph, UIImageTabFinancesMarketing, UIImageTabRide,
        UIImagePeepLargeFaceVerySick, UIImagePeepLargeFaceVeryVerySick, UIImagePeepLargeFaceAngry
    ];

    var window = UIWindow.$T('직원',
        UITab.$(
            UIStack.$H(
                UIStack.$V(
                    UISpacer.$(12),
                    UIStack.$H(
                        UILabel.$('유니폼 색상:')
                            .width(100),
                        UIColorPicker.$(UIColor.BrightRed)
                            .onChange((picker, color) => {
                                window.updateUI((window) => {
                                    window.themePrimaryColor(color);
                                })
                            }),
                        UISpacer.$(10),
                        UIColorPicker.$(UIColor.BrightRed)
                            .onChange((picker, color) => {
                                window.updateUI((window) => {
                                    window.themeSecondaryColor(color);
                                })
                            })
                    )
                ),
                UISpacer.$(),
                UIButton.$I(UIImageClosed)
                    .onClick((val) => {
                        val.updateUI((widget) => {
                            if (widget.isImageEqual(UIImageClosed)) {
                                widget.image(UIImageOpen).size(48);
                            } else {
                                widget.image(UIImageClosed).size(24);
                            }
                        })
                    }),
                UIToggleButton.$I(UIImageOpen)
                    .onPress((button, isPressed) => {
                        console.log(button._name, isPressed);
                    }),
                UIPageImageButton.$IP(...images)
                    .size({ width: 30, height: 27 })
                    .onPage((button, image) => {
                        console.log(image.description());
                    })
            ),
            UIListView.$([
                UIListViewColumn.$('이름')
            ]).showColumnHeaders(true)
                .scrollbarType(UIScrollbarType.both)
                .isStriped(true)
                .canSelect(true)
                .addItems([
                    UIListViewItem.$([TB.$(TN.$(TN.$I(UIImageStaffCostumeTiger), TN.$I(UIImageStaffCostumeSnowman), TN.$I(UIImageStaffCostumeKnight))).build()])
                ]),
            UILabel.$('1 미화원')
        ).image(UIImageTabGears)
            .isExpandable(true)
            .maxSize({ width: 500, height: 500 }),
        UITab.$(
            UILabel.$('두번째 탭'),
            UISpinner.$()
        ).image(UIImageTabFinancesResearch),
        UITab.$(
            UILabel.$('세번째 탭')
        ).image(UIImageTabKiosksAndFacilities)
            .isExpandable(true),
        UITab.$(
            UILabel.$('네번째 탭')
        ).image(UIImageTabFinancesSummary)
            .isExpandable(true)
            .maxSize({ width: 400, height: 100 })
    ).theme({
        primary: UIColor.Gray,
        secondary: UIColor.DarkOliveGreen,
        tertiary: UIColor.LightOrange
    })
    // .isExpandable(true)
        .show();
};

var main = function () {

    // If we do not use the var keyword then the variable acts as a global shared between all plugins and
    // the console. The following code allows the console and other plugins to use our functions.
    if (typeof ui === 'undefined') {
        console.log('Plugin not available on headless mode.');
        return;
    }

    // Add a menu item under the map icon on the top toolbar
    ui.registerMenuItem('StackUI Demo', function () {
        openWindow();
    });
}

registerPlugin(
    {
        name: 'StackUI Demo',
        version: '0.0.1',
        authors: ['nExmond'],
        type: 'local',
        licence: 'MIT',
        main: main
    }
)