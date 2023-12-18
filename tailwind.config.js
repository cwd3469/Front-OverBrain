/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontSize: {
        H1_Headline_32_B: [
          '1.5rem',
          {
            lineHeight: '2.500rem',
            letterSpacing: '0px',
            fontWeight: '700',
          },
        ],
        H2_Headline_32_R: [
          '1.5rem',
          {
            lineHeight: '2.500rem',
            letterSpacing: '0px',
            fontWeight: '400',
          },
        ],
        H3_Headline_28_B: [
          '1.750rem',
          {
            lineHeight: '2.250rem',
            letterSpacing: '0px',
            fontWeight: '700',
          },
        ],
        H4_Headline_28_R: [
          '1.750rem',
          {
            lineHeight: '2.250rem',
            letterSpacing: '0px',
            fontWeight: '400',
          },
        ],
        H5_Headline_24_B: [
          '1.500rem',
          {
            lineHeight: '2.000rem',
            letterSpacing: '0px',
            fontWeight: '700',
          },
        ],
        H6_Headline_24_R: [
          '1.500rem',
          {
            lineHeight: '2.000rem',
            letterSpacing: '0px',
            fontWeight: '400',
          },
        ],
        T1_Title_22_SB: [
          '1.375rem',
          {
            lineHeight: '1.750rem',
            letterSpacing: '0px',
            fontWeight: '600',
          },
        ],
        T2_Title_20_B: [
          '1.250rem',
          {
            lineHeight: '1.750rem',
            letterSpacing: '0px',
            fontWeight: '700',
          },
        ],
        T3_Title_20_M: [
          '1.250rem',
          {
            lineHeight: '1.750rem',
            letterSpacing: '0px',
            fontWeight: '500',
          },
        ],
        T4_Title_18_B: [
          '1.125rem',
          {
            lineHeight: '1.5rem',
            letterSpacing: '0.15px',
            fontWeight: '700',
          },
        ],
        T5_Title_18_M: [
          '1.125rem',
          {
            lineHeight: '1.5rem',
            letterSpacing: '0.15px',
            fontWeight: '500',
          },
        ],
        T6_Title_16_B: [
          '1rem',
          {
            lineHeight: '1.5rem',
            letterSpacing: '0.15px',
            fontWeight: '700',
          },
        ],
        T6_Title_16_M: [
          '1rem',
          {
            lineHeight: '1.5rem',
            letterSpacing: '0.15px',
            fontWeight: '500',
          },
        ],
        T6_Title_14_M: [
          '0.875rem',
          {
            lineHeight: '1.25rem',
            letterSpacing: '0.1px',
            fontWeight: '500',
          },
        ],
        L1_Label_20_B: [
          '1.125rem',
          {
            lineHeight: '1.25rem',
            letterSpacing: '0.1px',
            fontWeight: '700',
          },
        ],
        L2_Label_Link_16_B: [
          '1rem',
          {
            lineHeight: '1.25rem',
            letterSpacing: '0.1px',
            fontWeight: '700',
          },
        ],
        L3_Label_16_B: [
          '1.25rem',
          {
            lineHeight: '1.25rem',
            letterSpacing: '0.1px',
            fontWeight: '700',
          },
        ],
        L4_Label_16_M: [
          '1.25rem',
          {
            lineHeight: '1.25rem',
            letterSpacing: '0.1px',
            fontWeight: '500',
          },
        ],
        L5_Label_14_M: [
          '0.875rem',
          {
            lineHeight: '1rem',
            letterSpacing: '0.1px',
            fontWeight: '500',
          },
        ],
        L6_Label_12_M: [
          '0.750rem',
          {
            lineHeight: '1rem',
            letterSpacing: '0.1px',
            fontWeight: '500',
          },
        ],
        B1_Body_18_R: [
          '1.125rem',
          {
            lineHeight: '1.5rem',
            letterSpacing: '0.5px',
            fontWeight: '400',
          },
        ],
        B2_Body_16_B: [
          '1rem',
          {
            lineHeight: '1.5rem',
            letterSpacing: '0.5px',
            fontWeight: '700',
          },
        ],
        B3_Body_16_SB: [
          '1rem',
          {
            lineHeight: '1.5rem',
            letterSpacing: '0.5px',
            fontWeight: '600',
          },
        ],
        B4_Body_16_M: [
          '1rem',
          {
            lineHeight: '1.5rem',
            letterSpacing: '0.5px',
            fontWeight: '500',
          },
        ],
        B5_Body_16_R: [
          '1rem',
          {
            lineHeight: '1.5rem',
            letterSpacing: '0.5px',
            fontWeight: '400',
          },
        ],
        B6_Body_14_SB: [
          '0.875rem',
          {
            lineHeight: '1.5rem',
            letterSpacing: '0.25px',
            fontWeight: '600',
          },
        ],
        B7_Body_14_M: [
          '0.875rem',
          {
            lineHeight: '1.25rem',
            letterSpacing: '0.25px',
            fontWeight: '500',
          },
        ],
        B8_Body_14_R: [
          '0.875rem',
          {
            lineHeight: '1.25rem',
            letterSpacing: '0.25px',
            fontWeight: '400',
          },
        ],
        B9_Body_12_M: [
          '0.750rem',
          {
            lineHeight: '1.25rem',
            letterSpacing: '0.4px',
            fontWeight: '500',
          },
        ],
        B10_Body_12_R: [
          '0.750rem',
          {
            lineHeight: '1.25rem',
            letterSpacing: '0.4px',
            fontWeight: '400',
          },
        ],
      },
      colors: {
        primary: {
          50: '#E0F4FF',
          100: '#B1E4FF',
          200: '#7CD2FF',
          300: '#43C0FF',
          400: '#00B1FF',
          500: '#00A5FD',
          600: '#0097EE',
          700: '#0084D9',
          800: '#0073C5',
          900: '#0152A2',
          default: '#00B1FF',
        },
        secondary: {
          50: '#DDF7F6',
          100: '#A9EAE7',
          200: '#6DDDDA',
          300: '#00CECE',
          400: '#00C4C7',
          500: '#00B9C1',
          600: '#00A9AF',
          700: '#009496',
          800: '#00807F',
          900: '#005C55',
          default: '#00CECE',
        },
        info: {
          50: '#E0F4FF',
          500: '#00B1FF',
          700: '#0084D9',
        },
        success: {
          50: '#E5F5ED',
          400: '#45B889',
          700: '#008A5C',
        },
        warning: {
          50: '#FFF3E1',
          300: '#FFB855',
          500: '#FF8E1C',
        },
        error: {
          50: '#FFF3F4',
          300: '#FF6560',
          400: '#EE2C23',
        },
        wGray: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EEEEEE',
          300: '#E0E0E0',
          400: '#BDBDBD',
          500: '#9E9E9E',
          600: '#757575',
          700: '#616161',
        },
      },
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
