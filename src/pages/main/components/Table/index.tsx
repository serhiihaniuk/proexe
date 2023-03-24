import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { columns } from './TableService';
import { FC } from 'react';

type TableProps = {
  tableData: User[];
  onDelete: (id: number) => void;
};

const Table: FC<TableProps> = ({ tableData, onDelete }) => {
  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  function editHandler(user: User) {
    console.log(user);
  }

  function deleteHandler(id: number) {
    onDelete(id);
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
                    edit: () => editHandler(row.original),
                    delete: () => deleteHandler(row.original.id)
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

export default Table;
