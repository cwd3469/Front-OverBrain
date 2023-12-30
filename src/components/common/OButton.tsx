import { ButtonHTMLAttributes, FC } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/twMerge';

const ColorVariants = cva(``, {
  variants: {
    color: {
      primary: 'bg-primary-400 text-primary-400 border-primary-400',
      secondary: 'bg-secondary-400 text-secondary-400 border-secondary-400',
      error: 'bg-error-400 text-error-400 border-error-400',
      warning: 'bg-warning-500 text-warning-500 border-warning-500',
      info: 'bg-info-400 text-info-400 border-info-400',
      success: 'bg-success-400 text-success-400 border-success-400',
      'inherit-text': 'bg-gray-300 text-gray-300 border-gray-300',
      'inherit-white': 'bg-gray-300 text-gray-300 border-gray-300',
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});

const ButtonVariants = cva(``, {
  variants: {
    size: {
      large: 'p-[22px] min-w-[139px] text-xl leading-5 font-bold',
      medium: 'p-[18px] min-w-[121px] text-base leading-5 font-bold',
      small: 'p-3 min-w-[83px] text-sm font-medium',
    },
    variant: {
      contained: 'bg-black hover:bg-gray-800 text-white',
      outlined: 'bg-transparent border border-gray-300 hover:bg-gray-300 hover:text-white text-gray-500',
      text: 'bg-transparent hover:underline text-black-800',
    },
  },
  defaultVariants: {
    variant: 'contained',
    size: 'small',
  },
});

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof ButtonVariants> {
  children?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'inherit-text' | 'inherit-white';
}

//bg , text , border

const OButton: FC<ButtonProps> = ({ variant, size, color, children, ...props }) => {
  const mainColor: { [key: string]: string } = {
    primary: 'primary-400',
    secondary: 'secondary-400',
    error: 'error-400',
    warning: 'warning-500',
    info: 'info-400',
    success: 'success-400',
    'inherit-text': 'gray-300',
    'inherit-white': 'gray-300',
  };

  return (
    <button className={cn(ButtonVariants({ variant, size }))} {...props}>
      {children}
    </button>
  );
};

export default OButton;
