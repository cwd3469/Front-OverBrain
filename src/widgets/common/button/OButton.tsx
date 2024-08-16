import { PaletteKey, PaletteListKey } from '@/styles/palette';
import { useTheme } from '@emotion/react';
import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { ButtonHTMLAttributes } from 'react';
import { hexToRgbaColor } from '@/shared/rgba';

/**
 * 
  Small	sm	
  Medium	md	
  Large	lg	
 */

type Breakpoint = 'lg' | 'md' | 'sm';

type Variant = 'contained' | 'outlined' | 'text';

export type ButtonProps = {
  size?: Breakpoint;
  palette?: PaletteKey;
  variant?: Variant;
};

type ButtonColor = {
  main: PaletteListKey;
  hover: PaletteListKey;
};

const OButtonStyle = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  &:disabled {
    color: #999; /* Gray text color */
    background-color: #f5f5f5; /* Light gray background */
    border-color: #ccc; /* Gray border */
    cursor: not-allowed; /* Show a not-allowed cursor */
    opacity: 0.6; /* Reduce opacity */
  }
`;

type Props = ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps;

const OButton = ({ size, palette, variant, ...props }: Props) => {
  const theme = useTheme();
  const paletteStyle: { [key in PaletteKey]: ButtonColor } = {
    primary: {
      main: '400',
      hover: '600',
    },
    secondary: {
      main: '300',
      hover: '500',
    },
    info: {
      main: '700',
      hover: '900',
    },
    success: {
      main: '400',
      hover: '700',
    },
    warning: {
      main: '300',
      hover: '500',
    },
    error: {
      main: '300',
      hover: '500',
    },
    gray: {
      main: '400',
      hover: '700',
    },
    white: {
      main: '100',
      hover: '100',
    },
    black: {
      main: '900',
      hover: '900',
    },
  };

  const selectColor = paletteStyle[palette || 'primary'];
  const mainColor = theme.palette[palette || 'primary'][selectColor.main];
  const hoverColor = theme.palette[palette || 'primary'][selectColor.hover];

  const rgba = mainColor ? hexToRgbaColor(mainColor, 0.04) : '#fff';

  const variantStyle: { [key in Variant]: string } = {
    contained: css`
      background-color: ${mainColor};
      color: #fff;
      :hover {
        background-color: ${hoverColor};
      }
    `,
    outlined: css`
      border: 1px solid ${mainColor};
      background-color: #fff;
      color: ${mainColor};
      :hover {
        background-color: ${rgba};
        color: ${mainColor};
      }
    `,
    text: css`
      background-color: #fff;
      color: ${mainColor};
      :hover {
        background-color: ${rgba};
        color: ${mainColor};
        box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.08);
      }
    `,
  };

  const sizeStyle: { [key in Breakpoint]: string } = {
    lg: css`
      min-width: 139px;
      padding: 22px 44px;
      ${theme.typography.L1_Label_20_B};
    `,
    md: css`
      min-width: 121px;
      padding: 18px 40px;
      ${theme.typography.L3_Label_16_B};
    `,
    sm: css`
      min-width: 83px;
      padding: 12px 24px;
      ${theme.typography.L5_Label_14_M};
    `,
  };

  return (
    <OButtonStyle
      {...props}
      className={`${sizeStyle[size || 'md']} ${variantStyle[variant || 'contained']} OButton-Root`}
    />
  );
};

export default OButton;
