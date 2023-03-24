import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<User>();

export const columns = [
  columnHelper.accessor('id', {
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor('name', {
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Name</span>
  }),
  columnHelper.accessor('username', {
    header: () => 'Username',
    cell: (info) => info.renderValue()
  }),
  columnHelper.accessor('email', {
    header: () => <span>Email</span>
  }),
  columnHelper.accessor((row) => row.address?.city, {
    id: 'city',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>City</span>
  }),
  columnHelper.display({
    id: 'edit',
    cell: (info: unknown) => {
      return <button className="table__button table__button--edit" onClick={(info as { edit: () => void }).edit}>Edit</button>;
    },
    header: () => <span>Edit</span>
  }),
  columnHelper.display({
    id: 'delete',
    cell: (info: unknown) => {
      return <button className="table__button table__button--delete" onClick={(info as { delete: () => void }).delete}>Delete</button>;
    },
    header: () => <span>Delete</span>
  })
];
