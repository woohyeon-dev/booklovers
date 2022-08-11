import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    headerColor: string;
    textColor: string;
    borderColor: string;
    lightborderColor: string;
    accentColor: string;
  }
}
