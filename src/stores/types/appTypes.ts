export interface ThemeType {
  mode: themeMode;
  bgImg: string;
  isWhile: boolean;
  isDark: boolean;
  mainColor: string;
}
export enum themeMode {
  light = 'light',
  dark = 'dark',
}
