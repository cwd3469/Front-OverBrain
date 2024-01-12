import { ReactNode } from 'react';

type BtnType = {
  onClick?: () => void;
  title?: string;
  bgColor?: string;
  disabled?: boolean;
};

export type ModalViewType = 'alarm' | 'alert' | 'confirm' | 'titleText' | 'left-head';

export interface ModalInfo {
  width?: string;
  type?: ModalViewType;
  header: ReactNode;
  body: ReactNode;
  footer?: {
    confirm: BtnType;
    close?: BtnType;
  };
}
