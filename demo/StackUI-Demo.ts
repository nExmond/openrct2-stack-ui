/// <reference path="../modules/openrct2.d.ts" />

var openWindow = function () {

    //proxy
    const window = UIWDP.$();
    const tab1 = UITP.$();

    const buttonBasicTitle = UIWP.$<UIButton>();
    const buttonBasicImage = UIWP.$<UIButton>();
    const buttonToggleTitle = UIWP.$<UIToggleButton>();
    const buttonToggleImage = UIWP.$<UIToggleButton>();
    const buttonPagingImage = UIWP.$<UIPageImageButton>();

    const temp = UIWP.$<UIButton>();

    //construct
    UIWindow.$T("StackUI Demo",
        UITab.$(
            UIButton.$("dddddd"),
            UISpacer.$(),
            UIStack.$H(
                UIStack.$V(
                    UIButton.$("button").bind(buttonBasicTitle),
                    UIButton.$I(UIImageGuests).bind(buttonBasicImage),
                ).title("Basic"),
                UIStack.$V(
                    UIToggleButton.$("button").bind(buttonToggleTitle),
                    UIToggleButton.$I(UIImageGuests).bind(buttonToggleImage),
                ).title("Toggle"),
                UISpacer.$(),
                UIStack.$V(
                    UIPageImageButton.$IP(...[
                        UIImageAwardBestStaff,
                        UIImageAwardBestValue, 
                        UIImageAwardMostBeautiful
                    ]).bind(buttonPagingImage)
                ).title("Paging")
            ).title("Button")
        ).bind(tab1)
        .isExpandable(true)
        .image(UIImageConstruction.offset({ x: 4, y: 2 })),
        UITab.$(
            UIViewport.$(),
            UISpacer.$(),
            UIButton.$("탭 인덱스").bind(temp),
            UICheckbox.$("체크박스"),
            UIDropdown.$(["1", "2"]),
            UIColorPicker.$(),
            UISpinner.$(),
            UITextBox.$(),
            UIListView.$([UIListViewColumn.$("속성")]).addItem(UIListViewItem.$(["값"]))
        ).image(UIImageTabAwards).isExpandable(true)
    ).bind(window)
    .theme({ primary: UIColor.Gray, secondary: UIColor.DarkYellow })
    .padding({ top: 2, left: 2, bottom: 2, right: 2 })
    .spacing(2)
    .show()

    //action
};

var main = function () {

    // If we do not use the var keyword then the variable acts as a global shared between all plugins and
    // the console. The following code allows the console and other plugins to use our functions.
    if (typeof ui === "undefined") {
        console.log("Plugin not available on headless mode.");
        return;
    }

    // Add a menu item under the map icon on the top toolbar
    ui.registerMenuItem("StackUI Demo", function () {
        openWindow();
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