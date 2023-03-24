import { useEffect, useState } from 'react';
import { useTypedSelector } from 'src/hooks/useTypedSelector';
import { boundUserActions } from 'src/store/actions/userActions';

const UserProfilePage = () => {
  const selectedUser = useTypedSelector((state) => state.user.selectedUser);
  console.log('1')

  const [name, setName] = useState(selectedUser?.name || '');
  const [email, setEmail] = useState(selectedUser?.email || '');
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
      setName('');
      setEmail('');
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
    </div>
  );
};

export default UserProfilePage;
