import ModalWindow from '@components/ModalWindow/ModalWindow';
import React, { FC } from 'react';

type ConfirmDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

const DeleteDialog: FC<ConfirmDialogProps> = ({ isOpen, onClose, onSubmit }) => {
  return (
    <ModalWindow isOpen={isOpen} onClose={onClose} title="Delete user">
      <p>Are you sure you want to delete this user?</p>
      <div>
        <button onClick={onSubmit}>Delete</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </ModalWindow>
  );
};

export default DeleteDialog;
