/// <reference path="../modules/openrct2.d.ts" />

var Window = function (): UIWindowProxy {

    //Proxy
    const window = UIWDP.$();

    //Construct
    UIWindow.$("StackUI Demo -",

    ).bind(window)
        .isExpandable(true)
        .spacing(2)

    //Bind

    return window;
}

var ViewportWindow = function (): UIWindowProxy {

    //Proxy
    const window = UIWDP.$();

    const checkboxHide = UIWP.$<UICheckbox>();
    const checkboxRights = UIWP.$<UICheckbox>();
    const checkboxHeights = UIWP.$<UICheckbox>();
    const checkboxSoundOn = UIWP.$<UICheckbox>();
    const checkboxInvisible = UIWP.$<UICheckbox>();
    const checkboxSeethrough = UIWP.$<UICheckbox>();
    const checkboxClipView = UIWP.$<UICheckbox>();
    const checkboxGuidelines = UIWP.$<UICheckbox>();
    const checkboxUndergroundInside = UIWP.$<UICheckbox>();
    const checkboxTransparentBackground = UIWP.$<UICheckbox>();

    const viewport = UIWP.$<UIViewport>();

    const buttonZoomIn = UIWP.$<UIButton>();
    const buttonZoomOut = UIWP.$<UIButton>();
    const buttonRocateM2C = UIWP.$<UIButton>();
    const buttonRotate = UIWP.$<UIButton>();

    const buttonRocateC2M = UIWP.$<UIButton>();

    //Data
    const buttonSize = 25;

    //Construct
    UIWindow.$("StackUI Demo - Viewport",
        UIStack.$H(
            UIStack.$V(
                UIStack.$HG(
                    UIStack.$V(
                        UIStack.$H(
                            UIStack.$V(
                                UICheckbox.$("Hide").bind(checkboxHide),
                                UICheckbox.$("Rights").bind(checkboxRights),
                                UICheckbox.$("Heights").bind(checkboxHeights)
                            ),
                            UIStack.$V(
                                UICheckbox.$("SoundOn").bind(checkboxSoundOn),
                                UICheckbox.$("Invisible").bind(checkboxInvisible),
                                UICheckbox.$("Seethrough").bind(checkboxSeethrough)
                            ),
                            UIStack.$V(
                                UICheckbox.$("ClipView").bind(checkboxClipView),
                                UICheckbox.$("Guidelines").bind(checkboxGuidelines),
                            )
                        ).spacing(2),
                        UIStack.$V(
                            UICheckbox.$("Underground Inside").bind(checkboxUndergroundInside),
                            UICheckbox.$("Transparent Background").bind(checkboxTransparentBackground)
                        )
                    )
                ).title("Flags")
                    .padding({ top: 0, right: 2, bottom: 0, left: 2 }),
                UIViewport.$().bind(viewport)
            ),
            UIStack.$V(
                UIButton.$I(UIImageG2ZoomIn).bind(buttonZoomIn)
                    .size(buttonSize),
                UIButton.$I(UIImageG2ZoomOut).bind(buttonZoomOut)
                    .size(buttonSize),
                UIButton.$I(UIImageLocate).bind(buttonRocateM2C)
                    .size(buttonSize),
                UIButton.$I(UIImageRotateArrow).bind(buttonRotate)
                    .size(buttonSize),
                UISpacer.$(),
                UIButton.$I(UIImageG2Search).bind(buttonRocateC2M)
                    .size(buttonSize),
                UISpacer.$(10)
            )
        )
    ).bind(window)
        .isExpandable(true)
        .spacing(2)


    //Bind
    function updateFlags(isChecked: boolean, ...flags: UIViewportFlag[]) {
        viewport.ui?.updateUI(w => {
            const current = w.getFlags();
            if (isChecked) {
                w.flags(current | flags.reduce((acc, val) => acc | val));
            } else {
                w.flags(current ^ flags.reduce((acc, val) => acc ^ val));
            }
        });
    }

    checkboxHide.ui?.onChange((_, isChecked) => {
        updateFlags(isChecked,
            UIViewportFlag.HideBase,
            UIViewportFlag.HideVertical
        );
    });
    checkboxRights.ui?.onChange((_, isChecked) => {
        updateFlags(isChecked,
            UIViewportFlag.LandOwnership,
            UIViewportFlag.ConstructionRights
        );
    });
    checkboxHeights.ui?.onChange((_, isChecked) => {
        updateFlags(isChecked,
            UIViewportFlag.LandHeights,
            UIViewportFlag.TrackHeights,
            UIViewportFlag.PathHeights
        );
    });
    checkboxSoundOn.ui?.onChange((_, isChecked) => {
        updateFlags(isChecked,
            UIViewportFlag.SoundOn
        );
    });
    checkboxInvisible.ui?.onChange((_, isChecked) => {
        updateFlags(isChecked,
            UIViewportFlag.InvisibleSupports,
            UIViewportFlag.InvisiblePeeps,
            UIViewportFlag.InvisibleSprites
        );
    });
    checkboxSeethrough.ui?.onChange((_, isChecked) => {
        updateFlags(isChecked,
            UIViewportFlag.SeethroughRides,
            UIViewportFlag.SeethroughScenery,
            UIViewportFlag.SeethroughPaths
        );
    });
    checkboxClipView.ui?.onChange((_, isChecked) => {
        updateFlags(isChecked,
            UIViewportFlag.ClipView
        );
    });
    checkboxGuidelines.ui?.onChange((_, isChecked) => {
        updateFlags(isChecked,
            UIViewportFlag.Gridlines
        );
    });
    checkboxUndergroundInside.ui?.onChange((_, isChecked) => {
        updateFlags(isChecked,
            UIViewportFlag.UndergroundInside
        );
    });
    checkboxTransparentBackground.ui?.onChange((_, isChecked) => {
        updateFlags(isChecked,
            UIViewportFlag.TransparentBackground
        );
    });

    function updateButton(zoom: UIViewportScale) {
        const inDisable = zoom == 0;
        buttonZoomIn.ui?.updateUI(w => {
            w.isDisabled(inDisable);
        });
        const outDisable = zoom == 3;
        buttonZoomOut.ui?.updateUI(w => {
            w.isDisabled(outDisable);
        });
    }

    viewport.ui?.didLoad(w => {
        updateButton(w.getZoom());
    });

    buttonZoomIn.ui?.onClick(_ => {
        viewport.ui?.updateUI(w => {
            const nextScale = w.getZoom() - 1;
            w.zoom(nextScale);
            updateButton(nextScale);
        });
    });
    buttonZoomOut.ui?.onClick(_ => {
        viewport.ui?.updateUI(w => {
            const nextScale = w.getZoom() + 1;
            w.zoom(nextScale);
            updateButton(nextScale);
        });
    });
    buttonRocateM2C.ui?.onClick(_ => {
        viewport.ui?.mainViewportScrollToThis();
    });
    buttonRotate.ui?.onClick(_ => {
        viewport.ui?.updateUI(w => {
            const nextRotation = (w.getRotation() + 1) % 4;
            w.rotation(nextRotation);
        });
    });
    buttonRocateC2M.ui?.onClick(_ => {
        viewport.ui?.moveToMainViewportCenter();
    });

    return window;
}

var LabelWindow = function (): UIWindowProxy {

    //Proxy
    const window = UIWDP.$();

    const buttonToggleTitle = UIWP.$<UIToggleButton>();
    const buttonToggleImage = UIWP.$<UIToggleButton>();


    //Data
    //TODO: TextFormat 모두 반영
    const formatted = TB.$(
        TN.$(
            TN.$I(UIImageShopItemChips),
            TN.$S("Chips\n...").color(TextColor.PaleGold),
            TN.$S((1432).format(TextFormat.StringId, 53)).outline(),
            TN.$NL(),
            TN.$S((1432).format(TextFormat.StringId, 53))
        )
    ).build();


    //Construct
    UIWindow.$("StackUI Demo - Basic",
        UIStack.$VG(
            UILabel.$(formatted, true)
        ).title("Label"),
        UIStack.$HG(
            UIStack.$HG(
                UICheckbox.$("checkbox")
            ).title("Basic"),
            UIStack.$HG(
                UICheckbox.$UN(),
                UICheckbox.$UN(),
                UICheckbox.$UN(),
                UICheckbox.$UN()
            ).title("Unnamed")
        ).title("Checkbox"),
        UIStack.$HG(
            UIColorPicker.$(UIColor.BrightRed),
            UIColorPicker.$(UIColor.LightOrange),
            UIColorPicker.$(UIColor.BrightYellow),
            UIColorPicker.$(UIColor.BrightGreen),
            UIColorPicker.$(UIColor.LightBlue),
            UIColorPicker.$(UIColor.DarkBlue),
            UIColorPicker.$(UIColor.LightPurple)
        ).title("ColorPicker"),
        UIStack.$VG(
            UIDropdown.$(["Item1", "Item2", "Item3"]).selected(1)
        ).title("Dropdown"),
        UIStack.$VG(
            UISpinner.$()
        ).title("Spinner"),
        UIStack.$VG(
            UITextBox.$()
        ).title("TextBox"),
        UIStack.$HG(
            UIStack.$HG(
                UIButton.$("button", true),
                UIButton.$I(UIImageGuests)
            ).title("Basic"),
            UIStack.$HG(
                UIToggleButton.$("button").bind(buttonToggleTitle),
                UIToggleButton.$I(UIImageGuests).bind(buttonToggleImage),
            ).title("Toggle"),
            UIStack.$HG(
                UIPageImageButton.$IP(...[
                    UIImageAwardBestValue,
                    UIImageAwardMostBeautiful,
                    UIImageAwardBestStaff
                ])
            ).title("Paging")
        ).title("Button"),
        UISpacer.$(10)
    ).bind(window)
        .isExpandable(true)


    //Bind
    buttonToggleImage.ui?.onClick(() => {
        buttonToggleTitle.ui?.updateUI(w => {
            w.isVisible(!w.getIsVisible());
        })
    });


    return window;
}

var TestWindow = (): UIWindowProxy => {

    //Proxy
    const window = UIWindowProxy.$();

    const checkboxIsExpandable = UIWidgetProxy.$<UICheckbox>();
    const buttonZoom = UIWidgetProxy.$<UIButton>();
    const buttonchangeColor = UIWidgetProxy.$<UIButton>();

    const viewport = UIWidgetProxy.$<UIViewport>();
    const buttonClear = UIWidgetProxy.$<UIButton>();

    //Constants
    var containerPadding: UIEdgeInsets = { top: 2, left: 2, bottom: 2, right: 2 };

    UIWindow.$(
        'Window title',
        UIButton.$('1')
            .tooltip('Tooltip'),
        UIStack.$H(
            UIStack.$VG(
                UIStack.$HG(
                    UIColorPicker.$(),
                    UIColorPicker.$()
                        .isDisabled(true)
                        .color(UIColor.BrightRed),
                    UIColorPicker.$()
                        .color(Math.floor(Math.random() * 32)),
                    UIColorPicker.$()
                        .isDisabled(true)
                        .color(Math.floor(Math.random() * 32)),
                    UIColorPicker.$()
                        .color(Math.floor(Math.random() * 32)),
                    UIColorPicker.$()
                        .color(Math.floor(Math.random() * 32)),
                    UIColorPicker.$()
                        .color(Math.floor(Math.random() * 32)),
                    UIColorPicker.$()
                        .color(Math.floor(Math.random() * 32)),
                    UIColorPicker.$()
                        .color(Math.floor(Math.random() * 32)),
                    UIColorPicker.$()
                        .color(Math.floor(Math.random() * 32)),
                ).title('ColorSet')
                    .isDisabled(true)
                    .padding(containerPadding),
                UIStack.$VG(
                    UIButton.$('2')
                        .isDisabled(true),
                    UIButton.$('2'),
                    UIButton.$('2'),
                    UIButton.$('2')
                ).padding(containerPadding),
                UIButton.$('2'),
                UIStack.$H(
                    UIButton.$('3'),
                    UISpacer.$(10),
                    UIButton.$('4'),
                    UICheckbox.$UN().bind(checkboxIsExpandable)
                ).spacing(4),
                UIButton.$('A')
            ).title('GroupBox')
                .spacing(4)
                .padding(containerPadding),
            UISpacer.$(10),
            UIStack.$HG(
                UIButton.$('5'),
                UIStack.$VG(
                    UIDropdown.$([
                        'first',
                        'second',
                        'third',
                        'fourth'
                    ]).isVisible(true),
                    UISpinner.$()
                        .range(-10, 10)
                        .step(1)
                        .fixed(4)
                        .value(0)
                        .formatter((val): string => {
                            return val.format(TextFormat.Currency2dp) + UIImageShopItemCookie.string();
                        }),
                    UIButton.$('6')
                        .height(15),
                    UIButton.$I(UIImageG2ZoomIn).bind(buttonZoom),
                    UIButton.$('8')
                        .height(20)
                ).spacing(4)
                    .padding(containerPadding),
                UIButton.$('change color').bind(buttonchangeColor)
            ).spacing(4)
                .padding(containerPadding),
            UIViewport.$().bind(viewport)
                .size(200)
                .zoom(UIViewportScale.Quater)
                .flags(UIViewportFlag.InvisibleSupports)
        ).spacing(4),
        UIStack.$H(
            UISpacer.$(),
            UIButton.$('dddd')
                .height(50).width(100)
        ),
        UIStack.$H(
            UIButton.$('10')
                .width(100),
            UIButton.$('Clear!').bind(buttonClear)
                .width(350).height(100),
            UITextBox.$()
                .maxLength(20)
        ).spacing(4),
        UILabel.$('Label----------------------!')
            .align(UITextAlignment.Center)
    ).bind(window)
        .spacing(4)
        .padding(containerPadding)

    //Bind
    checkboxIsExpandable.ui?.onChange((_, isChecked) => {
        console.log(isChecked);
        window.ui?.updateUI(val => {
            if (isChecked) {
                val.isExpandable(true);
            } else {
                val.isExpandable(false);
            }
        });
    });
    buttonZoom.ui?.onClick(_ => {
        viewport.ui?.mainViewportScrollToThis();
        window.ui?.updateUI(w => {
            w.title('Moving........');
        })
    })
    buttonchangeColor.ui?.onClick(_ => {
        window.ui?.updateUI(w => {
            w.theme({
                primary: UIColor.DarkGreen | UIColorFlag.Translucent,
                secondary: UIColor.SalmonPink | UIColorFlag.Outline,
                tertiary: UIColor.SaturatedRed | UIColorFlag.Inset
            });
        });
    });

    buttonClear.ui?.onClick(_ => {
        viewport.ui?.moveTo({ x: Math.random() * ui.width, y: Math.random() * ui.height });
        viewport.ui?.updateUI(w => {
            w.size(Math.random() * 400);
        })
    })

    return window;
}

var MainWindow = function (): UIWindowProxy {

    //Proxy
    const window = UIWDP.$();
    const tab1 = UITP.$();

    const basicButton = UIWP.$<UIButton>();
    const basicWindow = LabelWindow();

    const viewportButton = UIWP.$<UIButton>();
    const viewportWindow = ViewportWindow();

    const testButton = UIWP.$<UIButton>();
    const testWindow = TestWindow();

    //Construct
    UIWindow.$T("StackUI Demo",
        UITab.$(
            UIButton.$("Basic").bind(basicButton),
            UIButton.$("Viewport").bind(viewportButton),
            UIButton.$("Test").bind(testButton),
            UISpacer.$(10)
        ).bind(tab1)
            .isExpandable(true)
    ).bind(window)
        .spacing(2)

    //Bind
    basicButton.ui?.onClick(_ => {
        basicWindow.ui?.show();
    });
    viewportButton.ui?.onClick(_ => {
        viewportWindow.ui?.show();
    });
    testButton.ui?.onClick(_ => {
        testWindow.ui?.show();
    });

    return window;
}

var main = function () {

    // If we do not use the var keyword then the variable acts as a global shared between all plugins and
    // the console. The following code allows the console and other plugins to use our functions.
    if (typeof ui === "undefined") {
        console.log("Plugin not available on headless mode.");
        return;
    }

    var window: UIWindowProxy | undefined;

    // Add a menu item under the map icon on the top toolbar
    ui.registerMenuItem("StackUI Demo", function () {
        if (typeof window === "undefined") {
            window = MainWindow();
        }
        window.ui?.show();
    });
}

registerPlugin(
    {
        name: "StackUI Demo",
        version: "0.0.1",
        authors: ["nExmond"],
        type: "local",
        licence: "MIT",
        main: main
    }
)