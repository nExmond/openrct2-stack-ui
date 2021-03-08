/// <reference path='../modules/openrct2.d.ts' />

var openWindow = function () {

    var containerPadding: UIEdgeInsets = { top: 2, left: 2, bottom: 0, right: 2 };
    var customFrameImage = UIImage.$F([5153, 5154, 5155, 5154], 4);

    // var images: UIImage[][] = [
    //     [UIImageTabGears, UIImageTabWrench, UIImageTabPaint, UIImageTabTimer],
    //     [UIImageTabGraphA, UIImageTabGraph, UIImageTabAdmission, UIImageTabFinancesSummary],
    //     [UIImageTabThoughts, UIImageTabStats, UIImageTabStaffOptions, UIImageTabFinancesResearch],
    //     [UIImageTabMusic, UIImageTabShopsAndStalls, UIImageTabKiosksAndFacilities, UIImageTabFinancesFinancialGraph],
    //     [UIImageTabFinancesProfitGraph, UIImageTabFinancesValueGraph, UIImageTabFinancesMarketing, UIImageTabRide],
    //     [UIImagePeepLargeFaceVerySick, UIImagePeepLargeFaceVeryVerySick, UIImagePeepLargeFaceAngry]
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

    var images: UIImage[] = [
        UIImageTabGears, UIImageTabWrench, UIImageTabPaint, UIImageTabTimer,
        UIImageTabGraphA, UIImageTabGraph, UIImageTabAdmission, UIImageTabFinancesSummary,
        UIImageTabThoughts, UIImageTabStats, UIImageTabStaffOptions, UIImageTabFinancesResearch,
        UIImageTabMusic, UIImageTabShopsAndStalls, UIImageTabKiosksAndFacilities, UIImageTabFinancesFinancialGraph,
        UIImageTabFinancesProfitGraph, UIImageTabFinancesValueGraph, UIImageTabFinancesMarketing, UIImageTabRide,
        UIImagePeepLargeFaceVerySick, UIImagePeepLargeFaceVeryVerySick, UIImagePeepLargeFaceAngry
    ];

    const strDefault = 1;
    const strBoardHire = 10;

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
                            if (widget.isImage(UIImageClosed)) {
                                widget.image(UIImageOpen);
                            } else {
                                widget.image(UIImageClosed);
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
                    //인라인 스프라이트 {INLINE_SPRITE}{a}{b}{00}{00}
                    //a = 0~255, b = a 섹션 인덱스
                    //스프라이트 id = b*256 + a
                    UIListViewItem.$(['{TINYFONT}1234567890']),
                    UIListViewItem.$([context.formatString("{RED}{STRING} {INT32} has broken down due to '{STRING}'.", "Twist", 2, "Mechanical failure")]),
                    UIListViewItem.$([context.formatString("Queuing for {STRINGID}", 84)]),
                    UIListViewItem.$(['{INLINE_SPRITE}{247}{19}{00}{00}A']),
                    UIListViewItem.$(['{INLINE_SPRITE}{248}{19}{00}{00}A']),
                    UIListViewItem.$(['{INLINE_SPRITE}{249}{19}{00}{00}A']),
                    UIListViewItem.$(['{INLINE_SPRITE}{250}{19}{00}{00}A']),
                    UIListViewItem.$(['{INLINE_SPRITE}{250}{20}{00}{00}A']),
                    UIListViewItem.$(['{INLINE_SPRITE}{09}{20}{00}{00}{SPRITE} {STRINGID}{NEWLINE}({STRINGID})']),
                    UIListViewItem.$([context.formatString('{STRINGID} {SPRITE} {SMALLFONT}{WHITE}{COMMA16}g', "1468", 1519, 1111)]),
                    UIListViewItem.$S()
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
            .maxSize({ width: 400, height: 100 }),
        UITab.$(
            UILabel.$('다섯번째 탭')
        ).image(UIImageTabStats),
        UITab.$(
            UILabel.$('다섯번째 탭')
        ).image(UIImageTabStats),
        UITab.$(
            UILabel.$('다섯번째 탭')
        ).image(UIImageTabStats),
        UITab.$(
            UILabel.$('다섯번째 탭')
        ).image(UIImageTabStats),
        UITab.$(
            UILabel.$('다섯번째 탭')
        ).image(UIImageTabStats),
        UITab.$(
            UILabel.$('여섯번째 탭')
        ).image(UIImageTabRide),
        UITab.$(
            UILabel.$('일곱번째 탭')
        ).image(UIImageTabPark)
    )
        // .isExpandable(true)
        .theme({
            primary: UIColor.Gray,
            secondary: UIColor.DarkOliveGreen,
            tertiary: UIColor.LightOrange
        })
        .padding(containerPadding)
        .show();

    // UIWindow.$('솜사탕 가게 1',
    //     UIStack.$H(
    //         UIStack.$V(
    //             UIStack.$H(
    //                 UISpacer.$(33),
    //                 UIDropdown.$(
    //                     ['전경']
    //                 ),
    //                 UISpacer.$(33)
    //             ),
    //             UIViewport.$(),
    //             UILabel.$('열림')
    //                 .align(UITextAlignment.Center)
    //         ),
    //         UIStack.$V(
    //             UIButton.$I(29360).width(24),
    //             UIButton.$I(29362).width(24),
    //             UIButton.$I(29364).width(24),
    //             UIButton.$I(29366).width(24)
    //         )
    //     )
    // ).isExpandable(true)
    //     .theme({
    //         primary: UIColor.Gray,
    //         secondary: UIColor.BordeauxRed
    //     })
    //     .show();

    // var viewport = UIViewport.$()
    //     .size({ width: 200, height: 200 })
    //     .zoom(UIViewportScale.Quater)
    //     .flags(UIViewportFlag.InvisibleSupports);

    // let window = UIWindow.$(
    //     'Window title',
    //     UIButton.$('1')
    //         .tooltip('Tooltip')
    //         .onClick((val) => {
    //             val.updateUI((val) => {
    //                 val.title('1111111111111')
    //             })
    //         }),
    //     UIStack.$H(
    //         UIStack.$VG(
    //             UIStack.$HG(
    //                 UIColorPicker.$()
    //                     .onChange((picker, color) => {
    //                         console.log(color);
    //                     }),
    //                 UIColorPicker.$()
    //                     .isDisabled(true)
    //                     .color(UIColor.BrightRed),
    //                 UIColorPicker.$()
    //                     .color(Math.floor(Math.random() * 32)),
    //                 UIColorPicker.$()
    //                     .isDisabled(true)
    //                     .color(Math.floor(Math.random() * 32)),
    //                 UIColorPicker.$()
    //                     .color(Math.floor(Math.random() * 32)),
    //                 UIColorPicker.$()
    //                     .color(Math.floor(Math.random() * 32)),
    //                 UIColorPicker.$()
    //                     .color(Math.floor(Math.random() * 32)),
    //                 UIColorPicker.$()
    //                     .color(Math.floor(Math.random() * 32)),
    //                 UIColorPicker.$()
    //                     .color(Math.floor(Math.random() * 32)),
    //                 UIColorPicker.$()
    //                     .color(Math.floor(Math.random() * 32)),
    //             ).title('ColorSet')
    //                 .isDisabled(true)
    //                 .padding(containerPadding),
    //             UIStack.$VG(
    //                 UIButton.$('2')
    //                     .isDisabled(true),
    //                 UIButton.$('2'),
    //                 UIButton.$('2'),
    //                 UIButton.$('2')
    //             ).padding(containerPadding),
    //             UIButton.$('2'),
    //             UIStack.$H(
    //                 UIButton.$('3'),
    //                 UISpacer.$(10),
    //                 UIButton.$('4'),
    //                 UICheckbox.$UN()
    //                     .onChange((checkbox, isChecked) => {
    //                         console.log(isChecked);

    //                         window.updateUI((val) => {
    //                             if (isChecked) {
    //                                 val.isExpandable(true);
    //                             } else {
    //                                 val.isExpandable(false);
    //                             }
    //                         })
    //                     })
    //             ).spacing(4),
    //             UIButton.$('A')
    //         ).title('GroupBox')
    //             .spacing(4)
    //             .padding(containerPadding),
    //         UISpacer.$(10),
    //         UIStack.$HG(
    //             UIButton.$('5')
    //                 .onClick((val) => {
    //                     val.updateUI((val) => {
    //                         val.title('555555555555555')
    //                     })
    //                 }),
    //             UIStack.$VG(
    //                 UIDropdown.$([
    //                     'first',
    //                     'second',
    //                     'third',
    //                     'fourth'
    //                 ]).onChange((dropdown, index, item) => {
    //                     console.log(index, item);
    //                 }).isVisible(true),
    //                 UISpinner.$()
    //                     .range(-1, 1)
    //                     .step(0.1, 2)
    //                     .value(-0.1)
    //                     .formatter((val): string => {
    //                         return val.toFixed(2) + '%'
    //                     })
    //                     .onChange((spinner, val) => {
    //                         console.log(val);
    //                     }),
    //                 UIButton.$('6')
    //                     .height(15),
    //                 UIButton.$I(29364)
    //                     .onClick((button) => {
    //                         viewport.mainViewportScrollToThis();
    //                         window.updateUI((val) => {
    //                             val.title('Moving........')
    //                         })
    //                         button.updateUI((val) => {
    //                             val.image(val._image! + 1);
    //                         })
    //                     }),
    //                 UIButton.$('8')
    //                     .height(20)
    //             ).spacing(4)
    //                 .padding(containerPadding),
    //             UIButton.$('change color')
    //                 .onClick((button) => {
    //                     window.updateUI((val) => {
    //                         val.theme({
    //                             primary: UIColor.DarkGreen | UIColorFlag.Translucent,
    //                             secondary: UIColor.SalmonPink | UIColorFlag.Outline,
    //                             tertiary: UIColor.SaturatedRed | UIColorFlag.Inset
    //                         })
    //                     })
    //                 })
    //         ).spacing(4)
    //             .padding(containerPadding),
    //         viewport
    //     ).spacing(4),
    //     UIStack.$H(
    //         UIButton.$('10')
    //             .width(100),
    //         UIButton.$('Clear!')
    //             .width(350).height(100)
    //             .onClick((button) => {
    //                 viewport.moveTo({ x: Math.random() * ui.width, y: Math.random() * ui.height });
    //                 viewport.updateUI((widget) => {
    //                     widget
    //                         .size({ width: Math.random() * 200, height: Math.random() * 200 })
    //                 })
    //             }),
    //         UITextBox.$()
    //             .maxLength(20)
    //     ).spacing(4),
    //     UILabel.$('Label----------------------!')
    //         .align(UITextAlignment.Center)
    // )

    // window
    // .isExpandable(true)
    //     .spacing(4)
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