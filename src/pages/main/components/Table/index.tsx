import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { columns } from './TableService';
import { FC } from 'react';

type TableProps = {
  tableData: User[];
  onDelete: (id: number) => void;
  onEdit: (user: User) => void;
};

const Table: FC<TableProps> = ({ tableData, onDelete, onEdit }) => {
  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

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
                    edit: () => onEdit(row.original),
                    delete: () => onDelete(row.original.id)
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
