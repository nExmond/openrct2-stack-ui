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

var LabelWindow = function (): UIWindowProxy {

    //Proxy
    const window = UIWDP.$();

    //Data
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
    UIWindow.$("StackUI Demo - Label",
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
                UICheckbox.$UN(),
                UICheckbox.$UN()
            ).title("Unnamed")
        ).title("Checkbox")
    ).bind(window)

    return window;
}

var ButtonWindow = function (): UIWindowProxy {

    //Proxy
    const window = UIWDP.$();

    const buttonToggleTitle = UIWP.$<UIToggleButton>();
    const buttonToggleImage = UIWP.$<UIToggleButton>();

    //Construct
    UIWindow.$("StackUI Demo - Button",
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
        .spacing(2)

    //Bind
    buttonToggleImage.ui?.onClick(() => {
        buttonToggleTitle.ui?.updateUI(w => {
            w.isVisible(!w.getIsVisible());
        })
    });

    return window;
}

var MainWindow = function (): UIWindowProxy {

    //Proxy
    const window = UIWDP.$();
    const tab1 = UITP.$();

    const buttonButton = UIWP.$<UIButton>();
    const buttonWindow = ButtonWindow();

    const labelButton = UIWP.$<UIButton>();
    const labelWindow = LabelWindow();

    //Construct
    UIWindow.$T("StackUI Demo",
        UITab.$(
            UIButton.$("UIButton").bind(buttonButton),
            UIButton.$("UILabel").bind(labelButton),
            UISpacer.$(10)
        ).bind(tab1)
            .isExpandable(true)
    ).bind(window)
        .spacing(2)

    //Bind
    buttonButton.ui?.onClick(_ => {
        buttonWindow.ui?.show();
    });
    labelButton.ui?.onClick(_ => {
        labelWindow.ui?.show();
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