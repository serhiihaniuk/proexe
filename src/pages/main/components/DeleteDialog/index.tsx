import React, { FC } from 'react';
import ModalWindow from '@components/ModalWindow/ModalWindow';
import './style.scss';

type ConfirmDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

const DeleteDialog: FC<ConfirmDialogProps> = ({ isOpen, onClose, onSubmit }) => {
  return (
    <ModalWindow isOpen={isOpen} onClose={onClose} title="Delete user">
      <p>Are you sure you want to delete this user?</p>
      <div className="delete-dialog__buttons">
        <button className="delete-dialog__cancel-btn" onClick={onClose}>
          Cancel
        </button>
        <button className="delete-dialog__delete-btn" onClick={onSubmit}>
          Delete
        </button>
      </div>
    </ModalWindow>
  );
};

export default DeleteDialog;
