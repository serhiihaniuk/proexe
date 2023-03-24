import axios from 'axios';
import { QueryClient, QueryFunctionContext } from '@tanstack/react-query';

const userDataApi = axios.create({
  baseURL: 'https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb'
});

const getUsers = async ({ signal }: QueryFunctionContext<string[]>): Promise<User[]> => {
  const response = await userDataApi.get(`/data`, {
    signal
  });

  return response.data;
};

const updateUser = async (user: User): Promise<User> => {
  try {
    await userDataApi.patch(`/data/${user.id}`, {
      body: user
    });
  } catch (e) {
    console.error(e);
  }

  return user;
};

const addUser = async (user: User): Promise<User> => {
  try {
    await userDataApi.post(`/data/`, {
      body: user
    });
  } catch (e) {
    console.error(e);
  }

  return user;
};

const addUserCacheHandler = (user: User, client: QueryClient) => {
  const prevUserList = client.getQueryData<User[]>(['users']);
  const lastID = prevUserList?.at(-1)?.id || 10;
  user.id = lastID + 1;

  if (!prevUserList) return [user];

  const newUserList = [...prevUserList, user];

  client.setQueryData(['users'], newUserList);
};

const updateUserCacheHandler = (user: User, client: QueryClient) => {
  const prevUserList = client.getQueryData<User[]>(['users']);

  if (!prevUserList) return;
  const newUserList = prevUserList.map((u) => {
    if (u.id === user.id) return user;
    return u;
  });

  client.setQueryData(['users'], newUserList);
};

const deleteUser = async (id: number): Promise<number> => {
  try {
    await userDataApi.delete(`/data/${id}`);
  } catch (e) {
    console.error(e);
  }

  return id;
};

const deleteUserCacheHandler = (id: number, client: QueryClient) => {
  const prevUserList = client.getQueryData<User[]>(['users']);

  if (!prevUserList) return;
  const newUserList = prevUserList.filter((u) => u.id !== id);

  client.setQueryData(['users'], newUserList);
};

export default {
  deleteUserCacheHandler,
  deleteUser,
  updateUserCacheHandler,
  updateUser,
  getUsers,
  addUser,
  addUserCacheHandler
};
