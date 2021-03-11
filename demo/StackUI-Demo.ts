/// <reference path='../modules/openrct2.d.ts' />

var openWindow = function () {

    var images: UIImage[][] = [
        [UIImageTabObjective, UIImageTabRidesShop, UIImageTabRidesTransport, UIImageTabRidesGentle],
        [UIImageTabRidesRollerCoasters, UIImageTabRidesWater, UIImageTabRidesThrill, UIImageTabGuests]
    ];
    var buttons = images.map((val) => val.map((val) => UIButton.$I(val).size({ width: 31, height: 27 })));
    var hstacks = buttons.map((val) => new UIStack(UIAxis.Horizontal, val));

    UIWindow.$('',
        UISpinner.$().range(1, 10).step(1).value(2)
            .onChange((spinner, value) => {
                buttons.forEach((val) => val.forEach((val) => {
                    val.updateUI((widget) => {
                        var newImage = widget._uiImage!.duration(value);
                        widget.image(newImage);
                    });
                }));
            }),
        ...hstacks
    ).show();

    // var images: UIImage[] = [
    //     UIImageTabGears, UIImageTabWrench, UIImageTabPaint, UIImageTabTimer,
    //     UIImageTabGraphA, UIImageTabGraph, UIImageTabAdmission, UIImageTabFinancesSummary,
    //     UIImageTabThoughts, UIImageTabStats, UIImageTabStaffOptions, UIImageTabFinancesResearch,
    //     UIImageTabMusic, UIImageTabShopsAndStalls, UIImageTabKiosksAndFacilities, UIImageTabFinancesFinancialGraph,
    //     UIImageTabFinancesProfitGraph, UIImageTabFinancesValueGraph, UIImageTabFinancesMarketing, UIImageTabRide,
    //     UIImagePeepLargeFaceVerySick, UIImagePeepLargeFaceVeryVerySick, UIImagePeepLargeFaceAngry
    // ];

    // var window = UIWindow.$T('직원',
    //     UITab.$(
    //         UIStack.$H(
    //             UIStack.$V(
    //                 UISpacer.$(12),
    //                 UIStack.$H(
    //                     UILabel.$('유니폼 색상:')
    //                         .width(100),
    //                     UIColorPicker.$(UIColor.BrightRed)
    //                         .onChange((picker, color) => {
    //                             window.updateUI((window) => {
    //                                 window.themePrimaryColor(color);
    //                             })
    //                         }),
    //                     UISpacer.$(10),
    //                     UIColorPicker.$(UIColor.BrightRed)
    //                         .onChange((picker, color) => {
    //                             window.updateUI((window) => {
    //                                 window.themeSecondaryColor(color);
    //                             })
    //                         })
    //                 )
    //             ),
    //             UISpacer.$(),
    //             UIButton.$I(UIImageClosed)
    //                 .onClick((val) => {
    //                     val.updateUI((widget) => {
    //                         if (widget.isImage(UIImageClosed)) {
    //                             widget.image(UIImageOpen);
    //                         } else {
    //                             widget.image(UIImageClosed);
    //                         }
    //                     })
    //                 }),
    //             UIToggleButton.$I(UIImageOpen)
    //                 .onPress((button, isPressed) => {
    //                     console.log(button._name, isPressed);
    //                 }),
    //             UIPageImageButton.$IP(...images)
    //                 .size({ width: 30, height: 27 })
    //                 .onPage((button, image) => {
    //                     console.log(image.description());
    //                 })
    //         ),
    //         UIListView.$([
    //             UIListViewColumn.$('이름')
    //         ]).showColumnHeaders(true)
    //             .scrollbarType(UIScrollbarType.both)
    //             .isStriped(true)
    //             .canSelect(true)
    //             .addItems([
    //                 //인라인 스프라이트 {INLINE_SPRITE}{a}{b}{00}{00}
    //                 //a = 0~255, b = a 섹션 인덱스
    //                 //스프라이트 id = b*256 + a
    //                 UIListViewItem.$(['{TINYFONT}1234567890']),
    //                 UIListViewItem.$([context.formatString("{RED}{STRING} {INT32} has broken down due to '{STRING}'.", "Twist", 2, "Mechanical failure")]),
    //                 UIListViewItem.$([context.formatString("Queuing for {STRINGID}", 84)]),
    //                 UIListViewItem.$(['{INLINE_SPRITE}{247}{19}{00}{00}A']),
    //                 UIListViewItem.$(['{INLINE_SPRITE}{248}{19}{00}{00}A']),
    //                 UIListViewItem.$(['{INLINE_SPRITE}{249}{19}{00}{00}A']),
    //                 UIListViewItem.$(['{INLINE_SPRITE}{250}{19}{00}{00}A']),
    //                 UIListViewItem.$(['{INLINE_SPRITE}{250}{20}{00}{00}A']),
    //                 UIListViewItem.$(['{INLINE_SPRITE}{09}{20}{00}{00}{SPRITE} {STRINGID}{NEWLINE}({STRINGID})']),
    //                 UIListViewItem.$([context.formatString('{STRINGID} {SPRITE} {SMALLFONT}{WHITE}{COMMA16}g', "1468", 1519, 1111)]),
    //                 UIListViewItem.$S()
    //             ]),
    //         UILabel.$('1 미화원')
    //     ).image(UIImageTabGears)
    //         .isExpandable(true)
    //         .maxSize({ width: 500, height: 500 }),
    //     UITab.$(
    //         UILabel.$('두번째 탭'),
    //         UISpinner.$()
    //     ).image(UIImageTabFinancesResearch),
    //     UITab.$(
    //         UILabel.$('세번째 탭')
    //     ).image(UIImageTabKiosksAndFacilities)
    //         .isExpandable(true),
    //     UITab.$(
    //         UILabel.$('네번째 탭')
    //     ).image(UIImageTabFinancesSummary)
    //         .isExpandable(true)
    //         .maxSize({ width: 400, height: 100 })
    // ).theme({
    //         primary: UIColor.Gray,
    //         secondary: UIColor.DarkOliveGreen,
    //         tertiary: UIColor.LightOrange
    //     })
    //     .padding(containerPadding)
    //     .show();
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