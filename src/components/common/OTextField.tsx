import { ForwardedRef, InputHTMLAttributes, forwardRef } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement>;
type Ref = ForwardedRef<HTMLInputElement>;

const OTextField = (props: Props, ref: Ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className="bg-white border-solid border border-[#E1E1E1] cursor-text block w-full rounded-lg py-1.5 pl-4 pr-4 h-12 text-sm 
      text-black  placeholder:text-gray-400 focus:border-[#1ABCB7] focus:outline-none focus:border-2"
    />
  );
};

export default forwardRef<HTMLInputElement, Props>(OTextField);
