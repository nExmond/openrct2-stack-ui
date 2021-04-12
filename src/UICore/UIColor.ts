
/**
 * Generally used as widget background color.
 * Can be used with *UIColorFlag* as in the example.
 * * ex) Translucent Yellow: **UIColor.Yellow | UIColorFlag.Translucent**
 */
enum UIColor {
    Black, Gray, White,
    DarkPurple, LightPurple, BrightPurple,
    DarkBlue, LightBlue, IcyBlue,
    DarkWater, LightWater,
    SaturatedGreen, DarkGreen, MossGreen, BrightGreen, OliveGreen, DarkOliveGreen,
    BrightYellow, Yellow, DarkYellow,
    LightOrange, DarkOrange,
    LightBrown, SaturatedBrown, DarkBrown,
    SalmonPink,
    BordeauxRed, SaturatedRed, BrightRed,
    DarkPink, BrightPink, LightPink
}

enum UIColorFlag {
    Outline = 1 << 5,
    Inset = 1 << 6,
    Translucent = 1 << 7,
    Unknown = 1 << 8
}