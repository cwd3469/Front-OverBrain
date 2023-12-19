import { ButtonHTMLAttributes, FC } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/twMerge';

export const ButtonVariants = cva('rounded-[12px]', {
  variants: {
    variant: {
      contained: 'text-wGray-50',
    },
    size: {
      medium: 'p-[18px] text-base text',
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
  label?: string;
  children?: React.ReactElement | string;
}

const OButton: FC<ButtonProps> = ({ variant, size, children, palette, label, ...props }) => {
  return (
    <button className={cn(ButtonVariants({ variant, size, palette }))} {...props}>
      {label && label}
      {children}
    </button>
  );
};

export default OButton;
