import { MessageBoxProps } from '@/widgets/common/textFiled';
import { FieldErrors } from 'react-hook-form';

export const inputMessage = (err: FieldErrors, name: string) => {
  if (err[name] && err[name]?.message) {
    const message: MessageBoxProps = {
      state: 'error',
      context: err[name]?.message as string,
    };
    return message;
  }
  return undefined;
};
