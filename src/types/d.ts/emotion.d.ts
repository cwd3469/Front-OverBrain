import '@emotion/react';
import { TypographyValueKey } from '../../styles/typography';
import { PaletteValueKey } from '../../styles/palette';

declare module '@emotion/react' {
  export interface Theme {
    palette: PaletteValueKey;
    typography: TypographyValueKey;
  }
}
