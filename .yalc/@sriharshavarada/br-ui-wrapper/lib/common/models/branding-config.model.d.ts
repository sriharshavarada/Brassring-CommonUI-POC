export type BrBrandingMode = 'light' | 'dark';
export interface BrBrandingPalette {
    baseFontColor?: string;
    titleFontColor?: string;
    labelFontColor?: string;
    linkColor?: string;
    foregroundColor?: string;
    accentColor?: string;
    focusColor?: string;
    focusRingColor?: string;
    backgroundColor?: string;
    backgroundImage?: string;
    heroImage?: string;
    headerBackgroundColor?: string;
    headerTextColor?: string;
    sectionBackgroundColor?: string;
    sectionBorderColor?: string;
    tableHeaderBackgroundColor?: string;
    tableHeaderFontColor?: string;
    tableAltColor?: string;
    inputBackgroundColor?: string;
    inputBorderColor?: string;
    inputTextColor?: string;
    inputPlaceholderColor?: string;
    inputDisabledBackgroundColor?: string;
    inputDisabledTextColor?: string;
    primaryButtonColor?: string;
    primaryButtonHoverColor?: string;
    primaryButtonTextColor?: string;
    primaryButtonTextHoverColor?: string;
    secondaryButtonColor?: string;
    secondaryButtonHoverColor?: string;
    secondaryButtonTextColor?: string;
    secondaryButtonTextHoverColor?: string;
    welcomeTextFontColor?: string;
}
export interface BrBrandingConfig {
    fontFamily?: string;
    baseFontSize?: string;
    welcomeTextFontSize?: string;
    light?: Partial<BrBrandingPalette>;
    dark?: Partial<BrBrandingPalette>;
}
export interface EnterpriseBrandingPayload {
    baseFontColor?: string;
    baseFontSize?: string;
    titleFontColor?: string;
    fontFamily?: string;
    primaryButtonColor?: string;
    primaryButtonHoverColor?: string;
    secondaryButtonColor?: string;
    secondaryButtonHoverColor?: string;
    primaryButtonTextColor?: string;
    secondaryButtonTextColor?: string;
    primaryButtonTextHoverColor?: string;
    secondaryButtonTextHoverColor?: string;
    linkColor?: string;
    labelFontColor?: string;
    foreGroundColor?: string;
    welcomeTextFontSize?: string;
    welcomeTextFontColor?: string;
    backgroundImage?: string;
    backgroundColor?: string;
    heroImage?: string;
    headerBackgroundColor?: string;
    headerTextColor?: string;
    sectionBackgroundColor?: string;
    tableHeaderBackgroundColor?: string;
    tableHeaderFontColor?: string;
    tableAltColor?: string;
}
export interface TalentGatewayBrandingPayload {
    Responsive_BackgroundColor?: string;
    Responsive_BackgroundImage?: string;
    Responsive_BaseFontColor?: string;
    Responsive_BaseFontFamily?: string;
    Responsive_BaseFontSize?: string;
    Responsive_ButtonBackgroundColor?: string;
}
export declare const DEFAULT_BRANDING: Required<Pick<BrBrandingConfig, 'fontFamily' | 'baseFontSize' | 'welcomeTextFontSize'>> & {
    light: Required<BrBrandingPalette>;
    dark: Required<BrBrandingPalette>;
};
