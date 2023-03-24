import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { columns } from './TableService';
import { FC } from 'react';
import './style.scss';

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
  
  if(!tableData.length) return <h2>User data is empty</h2>

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead className="table__head">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="table__head-row">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="table__head-cell">
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="table__body">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="table__row">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="table__cell">
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
      <div className="table__spacer" />
    </div>
  );
};

export default Table;
