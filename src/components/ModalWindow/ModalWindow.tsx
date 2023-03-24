import { Dialog, Transition } from '@headlessui/react';
import { FC, Fragment, ReactElement, ReactNode } from 'react';
import './style.scss';

type ModalWindowProps = {
  isOpen: boolean;
  onClose?: () => void;
  title: string;
  children?: ReactNode;
};

const ModalWindow: FC<ModalWindowProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog open={isOpen} onClose={() => onClose && onClose()}>
        <div className="modal__wrapper">
          <Transition.Child
            as={Fragment}
            enter="transition"
            enterFrom="transition__from"
            enterTo="transition__to"
            leave="transition"
            leaveFrom="transition__to"
            leaveTo="transition__from">
            <Dialog.Panel className="modal__window">
              <Dialog.Title>{title}</Dialog.Title>
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalWindow;
