import { ModalView } from '@/components/modal/ModalView';
import { ModalInfo } from '@/interface/modal';
import { ReactNode, useState } from 'react';
import ReactDOM from 'react-dom';

interface Props {
  info: Map<string, ModalInfo>;
}

interface Return {
  setModalName: (name: string) => void;
  modal: ReactNode;
  modalName: string;
  modalCycle: (name: string) => 'unMount' | 'mount';
  isModalMount: boolean;
}

export const ModalPortal = ({ children }: { children: ReactNode }) => {
  const el = document.getElementById('modal');
  const component = el as Element;
  return ReactDOM.createPortal(children, component);
};

const useModal = ({ info }: Props): Return => {
  const [modalName, setName] = useState<string>('');

  const value = info.get(modalName);
  const modal = value ? (
    <ModalPortal>
      <ModalView {...value} onClose={() => setName('')} />
    </ModalPortal>
  ) : (
    <></>
  );

  const setModalName = (name: string) => setName(name);
  const modalCycle = (name: string) => (modalName === name ? 'mount' : 'unMount');
  const isModalMount = value ? true : false;

  return { modal, setModalName, modalName, modalCycle, isModalMount };
};

export default useModal;
