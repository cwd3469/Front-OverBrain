import { ButtonHTMLAttributes, FC } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/twMerge';

const ColorVariants = cva('rounded-[12px] bg-primary-400', {
  variants: {
    color: {
      primary: '',
      secondary: '',
      error: '',
      warning: '',
      info: '',
      success: '',
      'inherit-text': '',
      'inherit-white': '',
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});

export const ButtonVariants = cva('rounded-[12px] bg-primary-400', {
  variants: {
    size: {
      large: 'p-[22px] min-w-[139px] text-xl leading-5 font-bold',
      medium: 'p-[18px] min-w-[121px] text-base leading-5 font-bold',
      small: 'p-3 min-w-[83px] text-sm font-medium',
    },
    variant: {
      contained: 'text-white',
    },
  },
  defaultVariants: {
    variant: 'contained',
    size: 'medium',
  },
});

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof ButtonVariants> {
  children?: React.ReactNode;
  palette?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'inherit-text' | 'inherit-white';
}

const OButton: FC<ButtonProps> = ({ variant, size, children, palette, ...props }) => {
  const paletteFiled = `bg-${palette}`;
  return (
    <button className={cn(ButtonVariants({ variant, size }))} {...props}>
      {children}
    </button>
  );
};
OButton.defaultProps = {
  palette: 'primary',
};

export default OButton;
