import { ButtonProps } from '@/shared/uiKit/button/OButton';

type BtnType = {
  onClick?: () => void;
  title?: string;
  btnInfo?: ButtonProps;
  disabled?: boolean;
};

export type ModalViewType = 'alarm' | 'alert' | 'confirm';

export interface ModalInfo {
  width?: string;
  type: ModalViewType;
  header: JSX.Element | string;
  body: JSX.Element | string;
  leftBtn?: BtnType;
  rightBtn?: BtnType;
}
