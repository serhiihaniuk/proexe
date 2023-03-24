import { useEffect, useState } from 'react';
import { useTypedSelector } from 'src/hooks/useTypedSelector';
import { useNavigate } from 'react-router-dom';
import './style.scss';
import LoadingSpinner from '@components/LoadingSpinner/LoadingSpinner';
import { useUserMutation } from 'src/hooks/useUserMutation';
import { boundUserActions } from 'src/store';

const useUserProfileForm = (selectedUser?: User) => {
  const [name, setName] = useState(selectedUser?.name || '');
  const [email, setEmail] = useState(selectedUser?.email || '');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const validateForm = () => {
    let valid = true;

    if (!name.trim()) {
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

    return valid;
  };

  return {
    name,
    setName,
    email,
    setEmail,
    nameError,
    setNameError,
    emailError,
    setEmailError,
    validateForm
  };
};

const UserProfilePage = () => {
  const navigate = useNavigate();
  const selectedUser = useTypedSelector((state) => state.user.selectedUser);
  const { name, setName, email, setEmail, nameError, emailError, validateForm } =
    useUserProfileForm(selectedUser);

  const { updateUser, addUser } = useUserMutation();

  const handleSubmit = async () => {
    if (validateForm()) {
      const user = selectedUser ? { ...selectedUser, name, email } : ({ name, email } as User);

      if (selectedUser) {
        await updateUser.mutateAsync(user);
      } else {
        await addUser.mutateAsync(user);
      }

      navigate('/');
    }
  };

  useEffect(() => {
    return () => {
      boundUserActions.unset();
    };
  }, []);

  if (updateUser.isLoading || addUser.isLoading) return <LoadingSpinner />;

  return (
    <div className="user-profile">
      <div className="user-profile__field">
        <label htmlFor="name" className="user-profile__label">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="user-profile__input"
        />
        {nameError && <p className="user-profile__error">Please enter a valid name.</p>}
      </div>
      <div className="user-profile__field">
        <label htmlFor="email" className="user-profile__label">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="user-profile__input"
        />
        {emailError && <p className="user-profile__error">Please enter a valid email address.</p>}
      </div>
      <button onClick={handleSubmit} className="user-profile__submit">
        Submit
      </button>
      <button onClick={()=>{navigate('/')}} className="user-profile__back">Go back</button>
    </div>
  );
};

export default UserProfilePage;
