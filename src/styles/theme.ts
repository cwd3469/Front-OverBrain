type TypographyKey =
  | 'H1_Headline_32_B'
  | 'H2_Headline_32_R'
  | 'H3_Headline_28_B'
  | 'H4_Headline_28_R'
  | 'H5_Headline_24_B'
  | 'H6_Headline_24_R'
  | 'T1_Title_22_SB'
  | 'T2_Title_20_B'
  | 'T3_Title_20_M'
  | 'T4_Title_18_B'
  | 'T5_Title_18_M'
  | 'T6_Title_16_B'
  | 'T6_Title_16_M'
  | 'T6_Title_14_M'
  | 'L1_Label_20_B'
  | 'L2_Label_Link_16_B'
  | 'L3_Label_16_B'
  | 'L4_Label_16_M'
  | 'L5_Label_14_M'
  | 'L6_Label_12_M'
  | 'B1_Body_18_R'
  | 'B2_Body_16_B'
  | 'B3_Body_16_SB'
  | 'B4_Body_16_M'
  | 'B5_Body_16_R'
  | 'B6_Body_14_SB'
  | 'B7_Body_14_M'
  | 'B8_Body_14_R'
  | 'B9_Body_12_M'
  | 'B10_Body_12_R';

type FontStyle = {
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
  fontWeight: number;
};

export type TypographyValueKey = {
  [key in TypographyKey]: FontStyle;
};

export const typography: TypographyValueKey = {
  H1_Headline_32_B: {
    /**H1_Headline_32_B */
    fontSize: '1.5rem',
    lineHeight: '2.500rem',
    letterSpacing: '0px',
    fontWeight: 700,
  },
  H2_Headline_32_R: {
    fontSize: '1.5rem',
    lineHeight: '2.500rem',
    letterSpacing: '0px',
    fontWeight: 400,
  },
  H3_Headline_28_B: {
    fontSize: '1.750rem',
    lineHeight: '2.250rem',
    letterSpacing: '0px',
    fontWeight: 700,
  },
  H4_Headline_28_R: {
    fontSize: '1.750rem',
    lineHeight: '2.250rem',
    letterSpacing: '0px',
    fontWeight: 400,
  },
  H5_Headline_24_B: {
    fontSize: '1.500rem',
    lineHeight: '2.000rem',
    letterSpacing: '0px',
    fontWeight: 700,
  },
  H6_Headline_24_R: {
    fontSize: '1.500rem',
    lineHeight: '2.000rem',
    letterSpacing: '0px',
    fontWeight: 400,
  },
  T1_Title_22_SB: {
    fontSize: '1.375rem',
    lineHeight: '1.750rem',
    letterSpacing: '0px',
    fontWeight: 600,
  },
  T2_Title_20_B: {
    fontSize: '1.250rem',
    lineHeight: '1.750rem',
    letterSpacing: '0px',
    fontWeight: 700,
  },
  T3_Title_20_M: {
    fontSize: '1.250rem',
    lineHeight: '1.750rem',
    letterSpacing: '0px',
    fontWeight: 500,
  },
  T4_Title_18_B: {
    fontSize: '1.125rem',
    lineHeight: '1.5rem',
    letterSpacing: '0.15px',
    fontWeight: 700,
  },
  T5_Title_18_M: {
    fontSize: '1.125rem',
    lineHeight: '1.5rem',
    letterSpacing: '0.15px',
    fontWeight: 500,
  },
  T6_Title_16_B: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    letterSpacing: '0.15px',
    fontWeight: 700,
  },
  T6_Title_16_M: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    letterSpacing: '0.15px',
    fontWeight: 500,
  },
  T6_Title_14_M: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    letterSpacing: '0.1px',
    fontWeight: 500,
  },
  L1_Label_20_B: {
    fontSize: '1.125rem',
    lineHeight: '1.25rem',
    letterSpacing: '0.1px',
    fontWeight: 700,
  },
  L2_Label_Link_16_B: {
    fontSize: '1rem',
    lineHeight: '1.25rem',
    letterSpacing: '0.1px',
    fontWeight: 700,
  },
  L3_Label_16_B: {
    fontSize: '1.25rem',
    lineHeight: '1.25rem',
    letterSpacing: '0.1px',
    fontWeight: 700,
  },
  L4_Label_16_M: {
    fontSize: '1.25rem',
    lineHeight: '1.25rem',
    letterSpacing: '0.1px',
    fontWeight: 500,
  },
  L5_Label_14_M: {
    fontSize: '0.875rem',
    lineHeight: '1rem',
    letterSpacing: '0.1px',
    fontWeight: 500,
  },
  L6_Label_12_M: {
    fontSize: '0.750rem',
    lineHeight: '1rem',
    letterSpacing: '0.1px',
    fontWeight: 500,
  },
  B1_Body_18_R: {
    fontSize: '1.125rem',
    lineHeight: '1.5rem',
    letterSpacing: '0.5px',
    fontWeight: 400,
  },
  B2_Body_16_B: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    letterSpacing: '0.5px',
    fontWeight: 700,
  },
  B3_Body_16_SB: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    letterSpacing: '0.5px',
    fontWeight: 600,
  },
  B4_Body_16_M: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    letterSpacing: '0.5px',
    fontWeight: 500,
  },
  B5_Body_16_R: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    letterSpacing: '0.5px',
    fontWeight: 400,
  },
  B6_Body_14_SB: {
    fontSize: '0.875rem',
    lineHeight: '1.5rem',
    letterSpacing: '0.25px',
    fontWeight: 600,
  },
  B7_Body_14_M: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    letterSpacing: '0.25px',
    fontWeight: 500,
  },
  B8_Body_14_R: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    letterSpacing: '0.25px',
    fontWeight: 400,
  },
  B9_Body_12_M: {
    fontSize: '0.750rem',
    lineHeight: '1.25rem',
    letterSpacing: '0.4px',
    fontWeight: 500,
  },
  B10_Body_12_R: {
    fontSize: '0.750rem',
    lineHeight: '1.25rem',
    letterSpacing: '0.4px',
    fontWeight: 400,
  },
};

export const theme = {
  typography,
};
