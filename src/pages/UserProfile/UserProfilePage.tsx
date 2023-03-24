import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useTypedSelector } from 'src/hooks/useTypedSelector';
import { boundUserActions } from 'src/store/actions/userActions';
import userAPI from 'src/services/api';
import { useNavigate } from 'react-router-dom';

const useUserUpdateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(userAPI.updateUser, {
    onSuccess: (u) => {
      userAPI.updateUserCacheHandler(u, queryClient);
    }
  });
};

const UserProfilePage = () => {
  const navigate = useNavigate();

  const selectedUser = useTypedSelector((state) => state.user.selectedUser);
  const isEditing = Boolean(selectedUser);

  const [name, setName] = useState(selectedUser?.name || '');
  const [email, setEmail] = useState(selectedUser?.email || '');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const { mutate: updateUser } = useUserUpdateMutation();

  const handleSubmit = () => {
    let valid = true;
    debugger;

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
    debugger;
    if (valid) {
      if (selectedUser) {
        selectedUser.name = name;
        selectedUser.email = email;
        updateUser(selectedUser);

        navigate('');
      }
    }
  };

  useEffect(() => {
    return () => {
      boundUserActions.unset();
    };
  }, []);

  return (
    <div>
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
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default UserProfilePage;
