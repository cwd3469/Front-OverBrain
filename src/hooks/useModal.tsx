import { ModalView } from '@/components/modal/ModalView';
import { ModalInfo } from '@/interface/modal';
import { useState } from 'react';

type Modals<T extends string> = {
  [K in T]: boolean;
};

interface ModalProps<T extends string> {
  info?: ModalInfo;
  nameKey: T;
  isOpen: (key: T) => boolean;
  closeModal: (key: T) => void;
}

const Modal = <T extends string>({ nameKey, info, isOpen, closeModal }: ModalProps<T>) => {
  return isOpen(nameKey) && info ? <ModalView {...info} onClose={() => closeModal(nameKey)} /> : <></>;
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
    Modal,
    isOpen,
    openModal,
    closeModal,
  };
}

export default useModal;
