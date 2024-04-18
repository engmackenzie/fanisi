import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import {
  ListItemIcon,
  MenuItem,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const Table = ({ data, onEditUser, onDeleteUser }) => {
  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 150,
      },
      {
        accessorKey: 'phone',
        header: 'Phone',
        size: 200,
      },
      {
        accessorKey: 'company',
        header: 'Company',
        size: 150,
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data,
    initialState: { density: 'comfortable', pagination: { pageSize: 5, pageIndex: 1 } },
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableRowActions: true,
    positionActionsColumn: 'last',
    renderRowActionMenuItems: ({ row, closeMenu }) => [
      <MenuItem
        key={0}
        onClick={() => {
          onEditUser(row.original);
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <Edit />
        </ListItemIcon>
        Edit User
      </MenuItem>,
      <MenuItem
        key={1}
        onClick={() => { 
          onDeleteUser(row.original);
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <Delete />
        </ListItemIcon>
        Delete User
      </MenuItem>,
    ],
  });

  return <MaterialReactTable table={table} />;
};

export default Table;
