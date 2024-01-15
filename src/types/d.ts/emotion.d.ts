import '@emotion/react';
import { TypographyValueKey } from '../../styles/theme';

declare module '@emotion/react' {
  export interface Theme {
    typography: TypographyValueKey;
  }
}
