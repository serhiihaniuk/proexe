import React, { FC, Fragment, ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';
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
        <div className="modal-window__wrapper">
          <Transition.Child
            as={Fragment}
            enter="modal-window__transition"
            enterFrom="modal-window__transition-from"
            enterTo="modal-window__transition-to"
            leave="modal-window__transition"
            leaveFrom="modal-window__transition-to"
            leaveTo="modal-window__transition-from"
          >
            <Dialog.Panel className="modal-window__window">
              <Dialog.Title className="modal-window__title">{title}</Dialog.Title>
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalWindow;
