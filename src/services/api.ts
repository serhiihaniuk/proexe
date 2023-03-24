import axios from 'axios';
import { QueryFunctionContext } from '@tanstack/react-query';

const userDataApi = axios.create({
  baseURL: 'https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb'
});

export const getUsers = async ({ signal }: QueryFunctionContext<string[]>): Promise<User[]> => {
  const response = await userDataApi.get(`/data`, {
    signal
  });

  return response.data;
};
