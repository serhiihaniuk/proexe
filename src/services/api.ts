import axios from 'axios';
import { QueryClient, QueryFunctionContext } from '@tanstack/react-query';

const userDataApi = axios.create({
  baseURL: 'https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb'
});

const apiRequest = async (method: string, endpoint: string, data?: unknown) => {
  try {
    const response = await userDataApi({
      method,
      url: endpoint,
      data
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getUsers = async ({ signal }: QueryFunctionContext<string[]>): Promise<User[]> => {
  return apiRequest('get', `/data`, { signal }) || [];
};

const updateUser = async (user: User): Promise<User> => {
  await apiRequest('patch', `/data/${user.id}`, user);
  return user;
};

const addUser = async (user: User): Promise<User> => {
  await apiRequest('post', `/data/`, user);
  return user;
};

const deleteUser = async (id: number): Promise<number> => {
  await apiRequest('delete', `/data/${id}`);
  return id;
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
  const newUserList = prevUserList.map((u) => (u.id === user.id ? user : u));

  client.setQueryData(['users'], newUserList);
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
