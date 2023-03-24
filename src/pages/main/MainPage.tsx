import React, { useCallback } from 'react';
import Table from './components/Table';
import { useSearchParams } from 'react-router-dom';
import DeleteDialog from './components/DeleteDialog';
import { boundUserActions } from 'src/store/actions/userActions';
import { useNavigate } from 'react-router-dom';
import './style.scss';
import LoadingSpinner from '@components/LoadingSpinner/LoadingSpinner';
import { useUserMutation } from 'src/hooks/useUser';

const MainPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const userID = searchParams.get('id');
  const isDeleteDialogOpen = Boolean(userID);
  const { getUsers, deleteUser } = useUserMutation();

  const onDelete = useCallback(
    (id: number) => {
      setSearchParams({ id: String(id) });
    },
    [setSearchParams]
  );

  const deleteUserHandler = useCallback(async () => {
    await deleteUser.mutateAsync(Number(userID));
    setSearchParams({});
  }, [deleteUser, userID, setSearchParams]);

  const editUserHandler = useCallback(
    (user: User) => {
      boundUserActions.set(user);
      navigate('profile');
    },
    [boundUserActions]
  );

  const addUserHandler = () => {
    navigate('profile');
  };

  if (!getUsers.data) return null;
  if (getUsers.isLoading) return <LoadingSpinner />;

  return (
    <div className="main-page">
      <button className="main-page__add-user-btn" onClick={addUserHandler}>
        Add new user
      </button>
      <Table tableData={getUsers.data} onDelete={onDelete} onEdit={editUserHandler} />
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setSearchParams({})}
        onSubmit={deleteUserHandler}
      />
      {deleteUser.isLoading && <LoadingSpinner />}
    </div>
  );
};

export default MainPage;
