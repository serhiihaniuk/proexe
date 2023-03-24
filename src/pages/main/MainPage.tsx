import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUsers } from 'src/services/api';
import Table from './components/Table';

const MainPage: React.FC<Record<string, string>> = () => {
  const { data: userData } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ()=>({
      "id": 1,
      "name": "HELLO",
      "username": "HOW",
      "email": "ARE.biz",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "1-770-736-8031 x56442",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    }),
    onSuccess: (data) => {
      console.log(data, 333)
      queryClient.setQueryData(['users', { id: 1 }], data);
    }
  });

  if (!userData) return null;

  return (
    <div>
      <Table data={userData} />
      <button onClick={()=>{mutation.mutate()}}>safdsadfsdaf</button>
    </div>
  );
};

export default MainPage;
