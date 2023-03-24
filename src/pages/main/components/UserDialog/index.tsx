import ModalWindow from '@components/ModalWindow/ModalWindow';
import { FC, useState } from 'react';

type UserDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, email: string) => void;
  user?: User
};

const UserDialog: FC<UserDialogProps> = ({ isOpen, onClose, onSubmit, user }) => {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleSubmit = () => {
    let valid = true;

    if (!name) {
      setNameError(true);
      valid = false;
    } else {
      setNameError(false);
    }

    if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setEmailError(true);
      valid = false;
    } else {
      setEmailError(false);
    }

    if (valid) {
      onSubmit(name, email);
      setName('');
      setEmail('');
      onClose();
    }
    
    
  };

  return (
    <ModalWindow isOpen={isOpen} onClose={onClose} title="Create user">
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {nameError && <p>Please enter a valid name.</p>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {emailError && <p>Please enter a valid email address.</p>}
      </div>
      <div>
        <button onClick={handleSubmit}>Create</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </ModalWindow>
  );
};

export default UserDialog;
