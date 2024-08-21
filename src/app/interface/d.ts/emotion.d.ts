import '@emotion/react';
import { TypographyValueKey } from '../../app/styles/typography';
import { PaletteValueKey } from '../../app/styles/palette';
import { BreakpointValueKey } from '../../app/styles/size';

declare module '@emotion/react' {
  export interface Theme {
    gap: BreakpointValueKey;
    radius: BreakpointValueKey;
    screens: BreakpointValueKey;
    typography: TypographyValueKey;
    palette: PaletteValueKey;
  }
}
