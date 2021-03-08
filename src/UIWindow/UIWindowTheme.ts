/// <reference path='../UICore/UIColor.ts' />

const UIWindowThemeDefault: UIWindowTheme = { 
    primary: UIColor.Gray, 
    secondary: UIColor.Gray, 
    tertiary: UIColor.Gray 
};

interface UIWindowTheme {
    primary?: UIColor;
    secondary?: UIColor;
    tertiary?: UIColor;
}