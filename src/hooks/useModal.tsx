import { ReactNode, useState } from 'react';
import ReactDOM from 'react-dom';

import { ModalView } from '@/components/modal/ModalView';
import { ModalInfo } from '@/interface/modal';

interface Props<T> {
  info: {
    [K in keyof T]: ModalInfo;
  };
}

interface Return<T, K extends keyof T> {
  setModalName: (name: K | 'close') => void;
  modal: ReactNode;
  modalName: K | 'close';
  isModalMount: boolean;
}

export const ModalPortal = ({ children }: { children: ReactNode }) => {
  const el = document.getElementById('modal');
  const component = el as Element;
  return ReactDOM.createPortal(children, component);
};

const useModal = <T, K extends keyof T>({ info }: Props<T>): Return<T, K> => {
  const [modalName, setName] = useState<K | 'close'>('close');

  const value = modalName !== 'close' ? info[modalName] : undefined;
  const modal = value ? (
    <ModalPortal>
      <ModalView {...value} onClose={() => setName('close')} />
    </ModalPortal>
  ) : (
    <></>
  );

  const setModalName = (name: K | 'close') => setName(name);

  const isModalMount = value ? true : false;

  return { modal, setModalName, modalName, isModalMount };
};

export default useModal;
