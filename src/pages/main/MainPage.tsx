import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import userAPI from 'src/services/api';
import Table from './components/Table';

const MainPage: React.FC<Record<string, string>> = () => {
  const queryClient = useQueryClient();
  const { data: userData } = useQuery({
    queryKey: ['users'],
    queryFn: userAPI.getUsers,
    refetchOnWindowFocus: false
  });

  const { mutate: updateUser } = useMutation(userAPI.updateUser, {
    onSuccess: (u) => {
      userAPI.updateUserCacheHandler(u, queryClient);
    }
  });

  const { mutate: deleteUser } = useMutation(userAPI.deleteUser, {
    onSuccess: (id) => {
      userAPI.deleteUserCacheHandler(id, queryClient);
    }
  });

  function deleteUserHandler(id: number) {
    deleteUser(id);
  }

  if (!userData) return null;

  return (
    <div>
      <Table tableData={userData} onDelete={deleteUserHandler} />
    </div>
  );
};

export default MainPage;
