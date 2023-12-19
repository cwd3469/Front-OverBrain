import { ButtonHTMLAttributes, FC } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/twMerge';

export const ButtonVariants = cva('rounded-[12px]', {
  variants: {
    size: {
      large: 'p-[22px] text-xl leading-5 font-bold',
      medium: 'p-[18px] text-base leading-5 font-bold',
      small: 'p-3 text-sm font-medium',
    },
    variant: {
      contained: 'text-white',
    },
    palette: {
      primary: 'bg-primary-400',
    },
  },
  defaultVariants: {
    variant: 'contained',
    size: 'medium',
    palette: 'primary',
  },
});

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof ButtonVariants> {
  children?: React.ReactNode;
}

const OButton: FC<ButtonProps> = ({ variant, size, children, palette, ...props }) => {
  return (
    <button className={cn(ButtonVariants({ variant, size, palette }))} {...props}>
      {children}
    </button>
  );
};

export default OButton;
