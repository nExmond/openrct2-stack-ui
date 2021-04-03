/// <reference path="../../UICore/UISize.ts" />

/**
 * The result of building single container in Windows.
 */
interface UIConstructResult {

    /**
     * The minimum size of the calculated window.
     */
    size: UISize;

    /**
     * List of raw widgets to display the window
     */
    widgets: Widget[];

    /**
     * List of raw tap descriptor.
     * Available only when configured with tabs.
     */
    tabs?: WindowTabDesc[];
}