import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';


const Table = ({ data }) => {
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
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    initialState: { density: 'comfortable', pagination: { pageSize: 5, pageIndex: 1 } },
  });

  return <MaterialReactTable table={table} />;
};

export default Table;
