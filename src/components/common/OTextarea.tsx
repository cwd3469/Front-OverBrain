import { ForwardedRef, InputHTMLAttributes, forwardRef } from 'react';

type Props = InputHTMLAttributes<HTMLTextAreaElement> & { label?: React.ReactNode };
type Ref = ForwardedRef<HTMLTextAreaElement>;

const OTextarea = (props: Props, ref: Ref) => {
  const { label } = props;
  return (
    <div>
      {label && <p className="text-base">{label}</p>}
      <textarea
        ref={ref}
        {...props}
        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>
  );
};

export default forwardRef<HTMLTextAreaElement, Props>(OTextarea);
