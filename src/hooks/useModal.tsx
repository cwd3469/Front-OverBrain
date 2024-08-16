import { ModalView } from '@/components/modal/ModalView';
import { ModalInfo } from '@/interface/modal';
import { useState } from 'react';

type Modals<T extends string> = {
  [K in T]: boolean;
};

export interface OModalProps<T extends string> extends ModalInfo {
  nameKey: T;
  isOpen: (key: T) => boolean;
  closeModal: (key: T) => void;
}

export const OModal = <T extends string>({ nameKey, isOpen, closeModal, ...props }: OModalProps<T>) => {
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
