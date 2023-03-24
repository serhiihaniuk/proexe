import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor('id', {
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor('name', {
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Name</span>
  }),
  columnHelper.accessor('username', {
    header: () => 'username',
    cell: (info) => info.renderValue()
  }),
  columnHelper.accessor('email', {
    header: () => <span>Visits</span>
  }),
  columnHelper.accessor((row) => row.address.city, {
    id: 'city',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>City</span>
  })
];

const Table = ({ data }: { data: User[] }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  function editUserHandler(id: string | number) {
    console.log(id);
  }

  function deleteUserHandler(id: string | number) {
    console.log(id);
  }

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, {
                    ...cell.getContext(),
                    edit: () => {
                      editUserHandler(cell.id);
                    }
                  })}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-4" />
    </div>
  );
};

// const Table: React.FC<any> = () => {
//   return (
//     <div>
//       asdsadfasdf
//     </div>
//   )
// }

export default Table;
