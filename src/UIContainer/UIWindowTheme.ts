/// <reference path="../UICore/UIColor.ts" />

const UIWindowThemeDefault: UIWindowTheme = { 
    primary: UIColor.Gray, 
    secondary: UIColor.Gray, 
    tertiary: UIColor.Gray 
};

/**
 * In *OpenRCT2*, the theme color can be used in 3 levels depending on the priority.
 */
interface UIWindowTheme {
    /**
     * It is usually used as the background color for windows and widgets.
     */
    primary?: UIColor;
    /**
     * It is usually used as the background color for tabs and widgets.
     */
    secondary?: UIColor;
    tertiary?: UIColor;
}