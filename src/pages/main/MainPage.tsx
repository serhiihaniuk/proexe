import React, { useCallback, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import userAPI from 'src/services/api';
import Table from './components/Table';
import { useSearchParams } from 'react-router-dom';
import DeleteDialog from './components/DeleteDialog';
import UserDialog from './components/UserDialog';
import { boundUserActions } from 'src/store/actions/userActions';
import { useTypedSelector } from 'src/hooks/useTypedSelector';
import { useNavigate } from 'react-router-dom';

const useUserQuery = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: userAPI.getUsers,
    refetchOnWindowFocus: false
  });
};

const useUserDeleteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(userAPI.deleteUser, {
    onSuccess: (id) => {
      userAPI.deleteUserCacheHandler(id, queryClient);
    }
  });
};

const MainPage: React.FC<Record<string, string>> = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const userID = searchParams.get('id');
  const isDeleteDialogOpen = Boolean(userID);

  const { data: userData } = useUserQuery();
  const { mutate: deleteUser, isLoading } = useUserDeleteMutation();

  const onDelete = useCallback(
    (id: number) => {
      setSearchParams({ id: String(id) });
    },
    [setSearchParams]
  );

  const deleteUserHandler = useCallback(() => {
    deleteUser(Number(userID));
    setSearchParams({});
  }, [deleteUser, userID, setSearchParams]);

  const editUserHandler = useCallback(
    (user: User) => {
      boundUserActions.set(user);
      navigate('profile')
    },
    [boundUserActions]
  );

  if (!userData) return null;
  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <Table tableData={userData} onDelete={onDelete} onEdit={editUserHandler} />
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setSearchParams({})}
        onSubmit={deleteUserHandler}
      />
    </div>
  );
};

export default MainPage;
