import { ModalView } from '@/widgets/modal/ModalView';
import { ModalInfo } from '@/interface/modal';
import { useState } from 'react';

type Modals<T extends string> = {
  [K in T]: boolean;
};

export interface OModalProps<T extends string> {
  nameKey: T;
  isOpen: (key: T) => boolean;
  closeModal: (key: T) => void;
}

type ModalProps<T extends string> = OModalProps<T> & ModalInfo;

export const OModal = <T extends string>({ nameKey, isOpen, closeModal, ...props }: ModalProps<T>) => {
  return isOpen(nameKey) && props ? <ModalView {...props} onClose={() => closeModal(nameKey)} /> : <></>;
};

function useModal<T extends string>() {
  const [modals, setModals] = useState<Modals<T>>({} as Modals<T>);

  const openModal = (key: T) => {
    setModals((prev) => ({ ...prev, [key]: true }));
  };

  const closeModal = (key: T) => {
    setModals((prev) => ({ ...prev, [key]: false }));
  };

  const isOpen = (key: T) => modals[key];

  return {
    isOpen,
    openModal,
    closeModal,
  };
}

export default useModal;
