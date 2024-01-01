import { ButtonHTMLAttributes, FC } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/twMerge';

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
  return (
    <button className={cn(ButtonVariants({ variant, size }))} {...props}>
      {children}
    </button>
  );
};

export default OButton;
