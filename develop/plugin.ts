/// <reference path="../modules/openrct2.d.ts" />

/**
Window template
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
*/

var ImageWindow = function (): UIWindowProxy {

    //Proxy
    const window = UIWDP.$();

    const imageView1 = UIWP.$<UIImageView>();
    const imageView2 = UIWP.$<UIImageView>();
    const imageView3 = UIWP.$<UIImageView>();
    const imageView4 = UIWP.$<UIImageView>();

    const primaryColorpicker = UIWP.$<UIColorPicker>();
    const secondaryColorpicker = UIWP.$<UIColorPicker>();
    const tertiaryColorpicker = UIWP.$<UIColorPicker>();

    const primaryTranslucent = UIWP.$<UICheckbox>();
    const secondaryTranslucent = UIWP.$<UICheckbox>();

    const isExpandable = UIWP.$<UICheckbox>();

    //Construct
    UIWindow.$("StackUI Demo - Image",
        UIStack.$H(
            UIImageView.$(UIImageG2Logo).bind(imageView1),
            UISpacer.$(),
            UIImageView.$(UIImageG2Title).bind(imageView2)
        ).spacing(4),
        UISpacer.$(),
        UIStack.$H(
            UIImageView.$(UIImage.$(5627)).bind(imageView3),
            UISpacer.$(),
            UIImageView.$(UIImageTesting).bind(imageView4)
        ).spacing(4),
        UIStack.$H(
            UIStack.$VG(
                UIStack.$H(
                    UILabel.$("Primary:"),
                    UIColorPicker.$().bind(primaryColorpicker)
                        .color(UIColor.LightBlue)
                        .name("primaryColorPicker"),
                    UISpacer.$(),
                    UICheckbox.$("Translucent", true).bind(primaryTranslucent)
                ).spacing(2),
                UIStack.$H(
                    UILabel.$("Secondary:"),
                    UIColorPicker.$().bind(secondaryColorpicker)
                        .color(UIColor.Gray),
                    UISpacer.$(),
                    UICheckbox.$("Translucent", true).bind(secondaryTranslucent)
                ).spacing(2),
                UIStack.$H(
                    UILabel.$("Tertiary:"),
                    UIColorPicker.$().bind(tertiaryColorpicker)
                        .color(UIColor.Yellow)
                ).spacing(2)
            ).title("Colors")
                .spacing(2)
                .padding({ left: 4, right: 4 })
        ),
        UICheckbox.$("isExpandable", true).bind(isExpandable)
    ).bind(window)
        .spacing(2)

    //Bind
    function updateImageViews(block: (widget: UIImageView) => void) {
        imageView1.updateUI(block);
        imageView2.updateUI(block);
        imageView3.updateUI(block);
        imageView4.updateUI(block);
    }

    function updateWindow(theme: UIWindowTheme) {
        window.updateUI((w) => {
            const windowTheme = w.getTheme();
            w.theme({
                primary: theme.primary ?? windowTheme.primary,
                secondary: theme.secondary ?? windowTheme.secondary,
                tertiary: theme.tertiary ?? windowTheme.tertiary
            })
        });
    }

    window.didLoad((w) => {
        const theme = {
            primary: w.getUIWidget<UIColorPicker>("primaryColorPicker")?.getColor(),
            secondary: secondaryColorpicker.ui?.getColor(),
            tertiary: tertiaryColorpicker.ui?.getColor()
        }

        updateImageViews((w) => w.theme(theme));
        updateWindow(theme);
    });

    function primaryColorpickerOnChange() {
        const color = (primaryColorpicker.ui?.getColor() ?? 0) | ((primaryTranslucent.ui?.getIsChecked() ?? false) ? UIColorFlag.Translucent : 0);
        updateImageViews((w) => w.theme({ primary: color }));
        updateWindow({ primary: color });
    }

    function secondaryColorpickerOnChange() {
        const color = (secondaryColorpicker.ui?.getColor() ?? 0) | ((secondaryTranslucent.ui?.getIsChecked() ?? false) ? UIColorFlag.Translucent : 0);
        updateImageViews((w) => w.theme({ secondary: color }));
        updateWindow({ secondary: color });
    }

    function tertiaryColorpickerOnChange() {
        const color = tertiaryColorpicker.ui?.getColor();
        updateImageViews((w) => w.theme({ tertiary: color }));
        updateWindow({ tertiary: color });
    }

    primaryColorpicker.onChange(() => primaryColorpickerOnChange());
    secondaryColorpicker.onChange(() => secondaryColorpickerOnChange());
    tertiaryColorpicker.onChange(() => tertiaryColorpickerOnChange());

    primaryTranslucent.onChange(() => primaryColorpickerOnChange());
    secondaryTranslucent.onChange(() => secondaryColorpickerOnChange());

    isExpandable.onChange((_, isChecked) => {
        window.updateUI((w) => w.isExpandable(isChecked));
    });


    return window;
}

var ListWindow = function (): UIWindowProxy {

    //Proxy
    const window = UIWDP.$();
    const tabs = [...Array(4)].map(() => UITP.$());
    const lists = [...Array(4)].map(() => UIWP.$<UIListView>());
    const counts = [...Array(4)].map(() => UIWP.$<UILabel>());

    var createTab = (
        usingColor: boolean,
        defaultColor: UIColor,
        hireTargetTitle: number,
        hireCost: number,
        hireTargetInfo: number,
        tabImage: UIImage,
        tag: number,
    ): UITab => {
        return UITab.$(
            UIStack.$H(
                UIStack.$V(
                    UISpacer.$(10),
                    UIStack.$H(
                        UILabel.$((1791).stringId()).isVisible(usingColor),
                        UIColorPicker.$(defaultColor).isVisible(usingColor)
                    )
                ),
                UISpacer.$(),
                UIStack.$V(
                    UIButton.$(hireTargetTitle.stringId(), true)
                        .occupiedSize({ width: 0 })
                        .size({ width: 145 })
                        .tooltip((1948).stringId()),
                    UILabel.$((1858).stringId(hireCost))
                        .occupiedSize({ width: 0 })
                ).offset({ x: -70, y: -29 }),
                UIStack.$H(
                    UIToggleButton.$I(UIImageDemolish)
                        .size(25)
                        .tooltip((5300).stringId()),
                    UIToggleButton.$I(UIImagePatrol)
                        .size(25)
                        .tooltip((1947).stringId()),
                    UIButton.$I(UIImageMap)
                        .size(25)
                        .tooltip((2804).stringId())
                )
            ),
            UIListView.$([
                UIListViewColumn.$W("Name", 1),
                UIListViewColumn.$F("Orders", 80),
                UIListViewColumn.$W("Status", 2)
            ]).bind(lists[tag])
                .offset({ y: -6 })
                .extends({ bottom: 6 })
                .scrollbarType(UIScrollbarType.Vertical),
            UILabel.$(`${0} ${hireTargetInfo.stringId()}`.color(TextColor.Black)).bind(counts[tag])
                .size({ width: 200 })
        ).bind(tabs[tag])
            .image(tabImage)
    }

    //Construct
    UIWindow.$T("StackUI Demo - List",
        createTab(true, UIColor.BrightRed, 1700, 500, 1859, UIImageTabStaffHandymen, 0),
        createTab(true, UIColor.LightBlue, 1701, 800, 1860, UIImageTabStaffMechanics, 1),
        createTab(true, UIColor.Yellow, 1702, 600, 1861, UIImageTabStaffSecurityGuards, 2),
        createTab(false, UIColor.BrightRed, 1703, 550, 1862, UIImageTabStaffEntertainers, 3)
    ).bind(window)
        .padding({ left: 1, bottom: -3 })
        .theme({ secondary: UIColor.LightPurple })
        .minSize({ width: 276, height: 270 })
        .maxSize({ width: 500, height: 450 })
        .isExpandable(true)
        .spacing(2)

    //Bind
    lists[0].didLoad((w) => {
        console.log("List 1 didLoad");
    });
    lists[0].didAppear((w) => {
        console.log("List 1 didAppear");
    });
    lists[0].didDisappear((w) => {
        console.log("List 1 didDisappear");
    });
    lists[1].didLoad((w) => {
        console.log("List 2 didLoad");
    });
    lists[1].didAppear((w) => {
        console.log("List 2 didAppear");
    });
    lists[1].didDisappear((w) => {
        console.log("List 2 didDisappear");
    });
    lists[2].didLoad((w) => {
        console.log("List 3 didLoad");
    });
    lists[2].didAppear((w) => {
        console.log("List 3 didAppear");
    });
    lists[2].didDisappear((w) => {
        console.log("List 3 didDisappear");
    });
    lists[3].didLoad((w) => {
        console.log("List 4 didLoad");
    });
    lists[3].didAppear((w) => {
        console.log("List 4 didAppear");
    });
    lists[3].didDisappear((w) => {
        console.log("List 4 didDisappear");
    });


    tabs[0].didLoad((w) => {
        console.log("Tab 1 didLoad");
    });
    tabs[0].didAppear((w) => {
        console.log("Tab 1 didAppear");

        var refresh = () => {
            const staffs = map.getAllEntities("peep").filter(val => val.peepType === "staff").sort((a, b) => a.id - b.id) as Staff[]
            const handymans = staffs.filter(val => val.staffType === "handyman")

            lists[0].updateUI((w) => {
                const items = handymans.map((val) => {
                    const name = val.name;
                    const sweep = val.orders & 1 << 0 ? UIImageStaffOrdersSweeping.string() : "";
                    const water = val.orders & 1 << 1 ? UIImageStaffOrdersWaterFlowers.string() : "";
                    const tarsh = val.orders & 1 << 2 ? UIImageStaffOrdersEmptyBins.string() : "";
                    const grass = val.orders & 1 << 3 ? UIImageStaffOrdersMowing.string() : "";
                    const status = (1431).format(TextFormat.StringId);//val.getFlag("slowWalk")
                    return UIListViewItem.$([name, `${sweep}${water}${tarsh}${grass}`, status]);
                });
                w.clearAllItems().addItems(items);
            });
            counts[0].updateUI((w) => {
                w.text(`${handymans.length} ${(1859).stringId()}`.color(TextColor.Black));
            });
        }

        context.subscribe("action.execute", (event) => {
            if (event.action.includes("staff")) {
                refresh();
            }
        });

        refresh();
    });
    tabs[0].didDisappear((w) => {
        console.log("Tab 1 didDisappear");
    });

    tabs[1].didLoad((w) => {
        console.log("Tab 2 didLoad");
    });
    tabs[1].didAppear((w) => {
        console.log("Tab 2 didAppear");

        var refresh = () => {
            const staffs = map.getAllEntities("peep").filter(val => val.peepType === "staff").sort((a, b) => a.id - b.id) as Staff[]
            const mechanics = staffs.filter(val => val.staffType === "mechanic");

            lists[1].updateUI((w) => {
                const items = mechanics.map((val) => {
                    const name = val.name;
                    const inspect = val.orders & 1 << 0 ? UIImageStaffOrdersInspectRides.string() : "";
                    const fix = val.orders & 1 << 1 ? UIImageStaffOrdersFixRides.string() : "";
                    const status = (1431).format(TextFormat.StringId);//val.getFlag("slowWalk")
                    return UIListViewItem.$([name, `${inspect}${fix}`, status]);
                });
                w.clearAllItems().addItems(items);
            });
            counts[1].updateUI((w) => {
                w.text(`${mechanics.length} ${(1860).stringId()}`.color(TextColor.Black));
            });
        }

        context.subscribe("action.execute", (event) => {
            if (event.action.includes("staff")) {
                refresh();
            }
        });

        refresh();
    });
    tabs[1].didDisappear((w) => {
        console.log("Tab 2 didDisappear");
    });

    tabs[2].didLoad((w) => {
        console.log("Tab 3 didLoad");
    });
    tabs[2].didAppear((w) => {
        console.log("Tab 3 didAppear");

        var refresh = () => {
            const staffs = map.getAllEntities("peep").filter(val => val.peepType === "staff").sort((a, b) => a.id - b.id) as Staff[]
            const securites = staffs.filter(val => val.staffType === "security");

            lists[2].updateUI((w) => {
                const items = securites.map((val) => {
                    const name = val.name;
                    const status = (1431).format(TextFormat.StringId);//val.getFlag("slowWalk")
                    return UIListViewItem.$([name, "", status]);
                });
                w.clearAllItems().addItems(items);
            });
            counts[2].updateUI((w) => {
                w.text(`${securites.length} ${(1861).stringId()}`.color(TextColor.Black));
            });
        }

        context.subscribe("action.execute", (event) => {
            if (event.action.includes("staff")) {
                refresh();
            }
        });

        refresh();
    });
    tabs[2].didDisappear((w) => {
        console.log("Tab 3 didDisappear");
    });

    tabs[3].didLoad((w) => {
        console.log("Tab 4 didLoad");
    });
    tabs[3].didAppear((w) => {
        console.log("Tab 4 didAppear");

        var refresh = () => {
            const staffs = map.getAllEntities("peep").filter(val => val.peepType === "staff").sort((a, b) => a.id - b.id) as Staff[]
            const entertainers = staffs.filter(val => val.staffType === "entertainer");

            lists[3].updateUI((w) => {
                const items = entertainers.map((val) => {
                    const name = val.name;
                    const costume = UIImage.$(5118 + val.costume).string();
                    const status = (1431).format(TextFormat.StringId);//val.getFlag("slowWalk")
                    return UIListViewItem.$([name, costume, status]);
                });
                w.clearAllItems().addItems(items);
            });
            counts[3].updateUI((w) => {
                w.text(`${entertainers.length} ${(1862).stringId()}`.color(TextColor.Black));
            });
        }

        context.subscribe("action.execute", (event) => {
            if (event.action.includes("staff")) {
                refresh();
            }
        });

        refresh();
    });
    tabs[3].didDisappear((w) => {
        console.log("Tab 4 didDisappear");
    });

    window.didLoad((window) => {
        console.log("window didLoad");
    });
    window.didAppear((window) => {
        console.log("window didAppear");
    });
    window.didDisappear((w) => {
        console.log("window didDisappear");
    });

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
                    .padding({ right: 2, left: 2 }),
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
        viewport.updateUI((w) => {
            const current = w.getFlags();
            if (isChecked) {
                w.flags(current | flags.reduce((acc, val) => acc | val));
            } else {
                w.flags(current ^ flags.reduce((acc, val) => acc ^ val));
            }
        });
    }

    checkboxHide.onChange((_, isChecked) => {
        updateFlags(isChecked,
            UIViewportFlag.HideBase,
            UIViewportFlag.HideVertical
        );
    });
    checkboxRights.onChange((_, isChecked) => {
        updateFlags(isChecked,
            UIViewportFlag.LandOwnership,
            UIViewportFlag.ConstructionRights
        );
    });
    checkboxHeights.onChange((_, isChecked) => {
        updateFlags(isChecked,
            UIViewportFlag.LandHeights,
            UIViewportFlag.TrackHeights,
            UIViewportFlag.PathHeights
        );
    });
    checkboxSoundOn.onChange((_, isChecked) => {
        updateFlags(isChecked,
            UIViewportFlag.SoundOn
        );
    });
    checkboxInvisible.onChange((_, isChecked) => {
        updateFlags(isChecked,
            UIViewportFlag.InvisibleSupports,
            UIViewportFlag.InvisiblePeeps,
            UIViewportFlag.InvisibleSprites
        );
    });
    checkboxSeethrough.onChange((_, isChecked) => {
        updateFlags(isChecked,
            UIViewportFlag.SeethroughRides,
            UIViewportFlag.SeethroughScenery,
            UIViewportFlag.SeethroughPaths
        );
    });
    checkboxClipView.onChange((_, isChecked) => {
        updateFlags(isChecked,
            UIViewportFlag.ClipView
        );
    });
    checkboxGuidelines.onChange((_, isChecked) => {
        updateFlags(isChecked,
            UIViewportFlag.Gridlines
        );
    });
    checkboxUndergroundInside.onChange((_, isChecked) => {
        updateFlags(isChecked,
            UIViewportFlag.UndergroundInside
        );
    });
    checkboxTransparentBackground.onChange((_, isChecked) => {
        updateFlags(isChecked,
            UIViewportFlag.TransparentBackground
        );
    });

    function updateButton(zoom: UIViewportScale) {
        const inDisable = zoom == 0;
        buttonZoomIn.updateUI((w) => {
            w.isDisabled(inDisable);
        });
        const outDisable = zoom == 3;
        buttonZoomOut.updateUI((w) => {
            w.isDisabled(outDisable);
        });
    }

    viewport.didLoad((w) => {
        updateButton(w.getZoom());
    });

    buttonZoomIn.onClick(() => {
        viewport.updateUI((w) => {
            const nextScale = w.getZoom() - 1;
            w.zoom(nextScale);
            updateButton(nextScale);
        });
    });
    buttonZoomOut.onClick(() => {
        viewport.updateUI((w) => {
            const nextScale = w.getZoom() + 1;
            w.zoom(nextScale);
            updateButton(nextScale);
        });
    });
    buttonRocateM2C.onClick(() => {
        viewport.ui?.mainViewportScrollToThis();
    });
    buttonRotate.onClick(() => {
        viewport.updateUI((w) => {
            const nextRotation = (w.getRotation() + 1) % 4;
            w.rotation(nextRotation);
        });
    });
    buttonRocateC2M.onClick(() => {
        viewport.ui?.moveToMainViewportCenter();
    });

    return window;
}

var BasicWindow = function (): UIWindowProxy {

    //Proxy
    const window = UIWDP.$();

    const buttonBasicTitle = UIWP.$<UIButton>();
    const buttonBasicImage = UIWP.$<UIButton>();

    const buttonToggleTitle = UIWP.$<UIToggleButton>();
    const buttonToggleImage = UIWP.$<UIToggleButton>();


    //Data
    const formatted = TB.$(
        TN.$(
            TN.$I(UIImageShopItemChips),
            TN.$(
                TN.$S("Chips\n..."),
                TN.$(
                    TN.$S((1432).format(TextFormat.StringId, 53))
                        .color(TextColor.BabyBlue),
                    TN.$NL()
                ).outline()
            ).color(TextColor.Celadon),
            TN.$S((767).format(TextFormat.StringId, 77)),
            TN.$I(UIImageShopItemDoughnut),
            TN.$I(UIImageShopItemIceCream)
        ).color(TextColor.Topaz)
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
            UIDropdown.$(["Item1", "Item2", "Item3"]).selectedIndex(1)
        ).title("Dropdown"),
        UIStack.$VG(
            UISpinner.$()
        ).title("Spinner"),
        UIStack.$VG(
            UITextBox.$()
        ).title("TextBox"),
        UIStack.$HG(
            UIStack.$HG(
                UIButton.$("button", true).bind(buttonBasicTitle),
                UIButton.$I(UIImageGuests).bind(buttonBasicImage)
            ).title("Basic"),
            UIStack.$HG(
                UIToggleButton.$("button").bind(buttonToggleTitle),
                UIToggleButton.$I(UIImageTabPaint).bind(buttonToggleImage),
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
    buttonBasicTitle.onClick(() => {
        buttonBasicImage.updateUI((w) => {
            w.isDisabled(!w.getIsDisabled());
        });
    });

    buttonToggleImage.onClick(() => {
        buttonToggleTitle.updateUI((w) => {
            w.isVisible(!w.getIsVisible());
        });
    });


    return window;
}

var MainWindow = function (): UIWindowProxy {

    //Proxy
    const window = UIWDP.$();
    const tab1 = UITP.$();
    const tab2 = UITP.$();
    const tab3 = UITP.$();
    const tab4 = UITP.$();
    const tab5 = UITP.$();

    const basicButton = UIWP.$<UIButton>();
    const basicWindow = BasicWindow();

    const viewportButton = UIWP.$<UIButton>();
    const viewportWindow = ViewportWindow();

    const listButton = UIWP.$<UIButton>();
    const listWindow = ListWindow();

    const imageButton = UIWP.$<UIButton>();
    const imageWindow = ImageWindow();

    const tabVisibleCheckbox1_1 = UIWP.$<UICheckbox>();
    const tabVisibleCheckbox1_2 = UIWP.$<UICheckbox>();
    const tabVisibleCheckbox1_3 = UIWP.$<UICheckbox>();
    const tabVisibleCheckbox1_4 = UIWP.$<UICheckbox>();
    const tabVisibleButton1 = UIWP.$<UIButton>();
    const tabVisibleButton2 = UIWP.$<UIButton>();
    const tabVisibleButton3 = UIWP.$<UIButton>();

    const updateTabButton = UIWP.$<UIButton>();

    //Construct
    UIWindow.$T("StackUI Demo",
        UITab.$(
            UIButton.$("Basic").bind(basicButton),
            UIButton.$("Viewport").bind(viewportButton),
            UIButton.$("List").bind(listButton),
            UIButton.$("Image").bind(imageButton),
            UIStack.$VG(
                UICheckbox.$("Tab 2").bind(tabVisibleCheckbox1_1)
                    .isChecked(true),
                UICheckbox.$("Tab 3").bind(tabVisibleCheckbox1_2),
                UICheckbox.$("Tab 4").bind(tabVisibleCheckbox1_3),
                UICheckbox.$("Tab 5").bind(tabVisibleCheckbox1_4)
            ).title("Tabs"),
            UISpacer.$(10)
        ).bind(tab1)
            .image(UIImageTabPark)
            .title("StackUI Demo: Tab 1")
            .isExpandable(true),
        UITab.$(
            UIStack.$H(
                UISpacer.$(),
                UIImageView.$(UIImageMenuLogo),
                UISpacer.$()
            ),
            UIButton.$("Update and move to first tab").bind(updateTabButton)
        ).bind(tab2)
            .image(UIImageTabRide)
            .title("StackUI Demo: Tab 2"),
        UITab.$(
            UIButton.$("Hide this tab").bind(tabVisibleButton1)
        ).bind(tab3)
            .image(UIImageTabTimer)
            .theme({ primary: UIColor.DarkBrown })
            .title("StackUI Demo: Tab 3")
            .isHidden(true),
        UITab.$(
            UIButton.$("Hide this tab").bind(tabVisibleButton2)
        ).bind(tab4)
            .image(UIImageTabPaint)
            .theme({ primary: UIColor.DarkOliveGreen })
            .title("StackUI Demo: Tab 4")
            .isHidden(true),
        UITab.$(
            UIButton.$("Hide this tab").bind(tabVisibleButton3)
        ).bind(tab5)
            .image(UIImageTabMusic)
            .theme({ primary: UIColor.DarkPurple })
            .title("StackUI Demo: Tab 5")
            .isHidden(true)
    ).bind(window)
        .spacing(2)
        .theme({ primary: UIColor.DarkOrange });

    //Bind
    basicButton.onClick(() => {
        const mainOrigin = window.ui?.getOrigin() ?? UIPointZero;
        basicWindow.show();
        basicWindow.updateUI((w) => {
            const width = w.getSize().width;
            w.origin({ x: mainOrigin.x - width, y: mainOrigin.y - 160 });
        });
    });
    viewportButton.onClick(() => {
        const mainOrigin = window.ui?.getOrigin() ?? UIPointZero;
        viewportWindow.show();
        viewportWindow.updateUI((w) => {
            const width = w.getSize().width;
            w.origin({ x: mainOrigin.x - width, y: mainOrigin.y + 170 });
        });
    });
    listButton.onClick(() => {
        const mainOrigin = window.ui?.getOrigin() ?? UIPointZero;
        const mainSize = window.ui?.getSize() ?? UISizeZero;
        listWindow.show();
        listWindow.updateUI((w) => {
            w.origin({ x: mainOrigin.x + mainSize.width, y: mainOrigin.y - 160 });
        });
    });
    imageButton.onClick(() => {
        const mainOrigin = window.ui?.getOrigin() ?? UIPointZero;
        const mainSize = window.ui?.getSize() ?? UISizeZero;
        imageWindow.show();
        imageWindow.updateUI((w) => {
            w.origin({ x: mainOrigin.x + mainSize.width, y: mainOrigin.y + 110 });
        });
    });
    tabVisibleCheckbox1_1.onChange((_, isChecked: boolean) => {
        tab2.updateUI((tab) => {
            tab.isHidden(!isChecked);
        });
    });
    tabVisibleCheckbox1_2.onChange((_, isChecked: boolean) => {
        tab3.updateUI((tab) => {
            tab.isHidden(!isChecked);
        });
    });
    tabVisibleCheckbox1_3.onChange((_, isChecked: boolean) => {
        tab4.updateUI((tab) => {
            tab.isHidden(!isChecked);
        });
    });
    tabVisibleCheckbox1_4.onChange((_, isChecked: boolean) => {
        tab5.updateUI((tab) => {
            tab.isHidden(!isChecked);
        });
    });
    tabVisibleButton1.onClick(() => {
        tab3.updateUI((tab) => {
            tab.isHidden(true);
        });
        tabVisibleCheckbox1_2.ui?.isChecked(false);
    });
    tabVisibleButton2.onClick(() => {
        tab4.updateUI((tab) => {
            tab.isHidden(true);
        });
        tabVisibleCheckbox1_3.ui?.isChecked(false);
    });
    tabVisibleButton3.onClick(() => {
        tab5.updateUI((tab) => {
            tab.isHidden(true);
        });
        tabVisibleCheckbox1_4.ui?.isChecked(false);
    });
    updateTabButton.onClick((w) => {
        tab2.updateUI((tab) => {
            tab.title("StackUI Demo: Tab 2 [Updated]");
            tab.theme({ primary: UIColor.DarkBlue });
            tab.image(UIImageTabStaffOptions);
            tab.isExpandable(true);
            tab.padding(10);
            tab.spacing(8);
            tab.maxSize({ height: 600 });
        });
        w.updateUI(() => {
            w.title("Move to first tab")
        });
        window.updateUI((window) => {
            window.selectedTabIndex(0);
        });
    });

    window.onClose(() => {
        basicWindow.close();
        viewportWindow.close();
        listWindow.close();
        imageWindow.close();
    });
    window.didLoad((w) => {
        const width = w.getSize().width;
        w.updateUI((w) => {
            w.origin({ x: (ui.width - width) / 2, y: ui.height / 4 });
        });
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
    var show = () => {
        if (typeof window === "undefined") {
            window = MainWindow();
        }
        window.show();
    }

    // Add a menu item under the map icon on the top toolbar
    ui.registerMenuItem("StackUI Demo", show);
    ui.registerShortcut({
        id: "stackui.demo",
        text: "StackUI Demo",
        bindings: ["ALT+S+D"],
        callback: show
    });
}

registerPlugin(
    {
        name: "StackUI Demo",
        version: "0.1.0",
        authors: ["nExmond"],
        type: "local",
        licence: "MIT",
        main: main
    }
)