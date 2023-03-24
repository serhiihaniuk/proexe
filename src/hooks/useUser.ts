import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import userAPI from '../services/api';

export const useUserMutation = () => {
  const queryClient = useQueryClient();
  const updateUser = useMutation(userAPI.updateUser, {
    onSuccess: (u) => {
      userAPI.updateUserCacheHandler(u, queryClient);
    }
  });

  const addUser = useMutation(userAPI.addUser, {
    onSuccess: (u) => {
      userAPI.addUserCacheHandler(u, queryClient);
    }
  });

  const deleteUser = useMutation(userAPI.deleteUser, {
    onSuccess: (id) => {
      userAPI.deleteUserCacheHandler(id, queryClient);
    }
  });

  const getUsers = useQuery({
    queryKey: ['users'],
    queryFn: userAPI.getUsers,
    refetchOnWindowFocus: false,
    staleTime: Infinity
  });

  return { updateUser, addUser, deleteUser, getUsers };
};
