import '@emotion/react';
import { TypographyValueKey } from '../../styles/typography';
import { PaletteValueKey } from '../../styles/palette';
import { BreakpointValueKey } from '../../styles/size';

declare module '@emotion/react' {
  export interface Theme {
    gap: BreakpointValueKey;
    radius: BreakpointValueKey;
    screens: BreakpointValueKey;
    typography: TypographyValueKey;
    palette: PaletteValueKey;
  }
}
