
/**
 * String Formatting tag.
 */
enum TextFormat {

    /**
     * Set a comma every 3 digits from the 1's digit.
     */
    Comma16 = "COMMA16",
    /**
     * Set a comma every 3 digits from the 1's digit.
     */
    Comma32 = "COMMA32",
    /**
     * Set a comma every 3 digits from the 1's digit. Display to one decimal place.
     */
    Comma1dp16 = "COMMA1DP16",
    /**
     * Set a comma every 3 digits from the 1's digit. Display to two decimal place.
     */
    Comma2dp32 = "COMMA2DP32",

    /**
     * -32768 ~ 32767
     */
    Int32 = "Int32",
    /**
     * 0 ~ 65535
     */
    UInt16 = "UINT16",

    /**
     * Currency formatting by language.
     */
    Currency = "CURRENCY",
    /**
     * Currency two decimal places formatting by language.
     */
    Currency2dp = "CURRENCY2DP",

    MonthYear = "MONTHYEAR",
    Month = "MONTH",

    DurationShort = "DURATION",
    DurationLong = "REALTIME",

    Velocity = "VELOCITY",

    Length = "LENGTH",

    /**
    * * Select the txt file for your language in https://github.com/OpenRCT2/OpenRCT2/tree/develop/data/language.
    * * Check the comment at the top of the txt file. 
    */
    StringId = "STRINGID"
}