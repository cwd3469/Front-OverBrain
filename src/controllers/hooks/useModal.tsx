import { Dialog } from '@headlessui/react';
import { useState } from 'react';

type ModalProps = {
  key: string;
  title: string;
  description?: string;
  context?: React.ReactNode;
};

type Props = {
  entryKey: (key: string) => void;
  modalList?: ModalProps[];
};

const useModal = (props: Props) => {
  let [isOpen, setIsOpen] = useState(true);

  const modal = (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <Dialog.Panel>
        <Dialog.Title>Deactivate account</Dialog.Title>
        <Dialog.Description>This will permanently deactivate your account</Dialog.Description>
      </Dialog.Panel>
    </Dialog>
  );
  return <div></div>;
};

export default useModal;
