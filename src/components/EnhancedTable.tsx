import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Checkbox,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FlagIcon from '@mui/icons-material/Flag';
import MoreIcon from '@mui/icons-material/MoreVert';

interface Column {
  label: string;
  field: string;
  sortable?: boolean;
}

interface EnhancedTableProps {
  data: { [key: string]: any }[];
  columns: Column[];
}

const EnhancedTable: React.FC<EnhancedTableProps> = ({ data, columns }) => {
  const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = React.useState<string>('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selected, setSelected] = React.useState<string[]>([]);

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedData = [...data].sort((a, b) => {
    if (orderBy) {
      const valueA = a[orderBy];
      const valueB = b[orderBy];
      if (valueA < valueB) return order === 'asc' ? -1 : 1;
      if (valueA > valueB) return order === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const isSelected = (userId: string) => selected.includes(userId);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = sortedData
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => row.UserID);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  const handleSelectRow = (userId: string) => {
    const selectedIndex = selected.indexOf(userId);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, userId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleFlaggedAction = (userId: string) => {
    console.log('Flagged user:', userId);
  }

  const handleEditAction = (userId: string) => {
    console.log('Edit user:', userId);
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={selected.length > 0 && selected.length < rowsPerPage}
                checked={
                  sortedData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .every((row) => selected.includes(row.UserID))
                }
                onChange={handleSelectAll}
              />
            </TableCell>
            {columns.map((column) => (
              <TableCell key={column.field}>
                {column.sortable ? (
                  <TableSortLabel
                    active={orderBy === column.field}
                    direction={orderBy === column.field ? order : 'asc'}
                    onClick={() => handleRequestSort(column.field)}
                  >
                    {column.label}
                  </TableSortLabel>
                ) : (
                  column.label
                )}
              </TableCell>
            ))}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
            <TableRow hover key={index} selected={isSelected(row.UserID)}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={isSelected(row.UserID)}
                  onChange={() => handleSelectRow(row.UserID)}
                />
              </TableCell>
              {columns.map((column) => (
                <TableCell key={column.field}>{row[column.field]}</TableCell>
              ))}
              <TableCell>
                <IconButton onClick={() => handleFlaggedAction(row.UserID)} color="primary">
                  <FlagIcon />
                </IconButton>
                <IconButton onClick={() => handleEditAction(row.UserID)} color="secondary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => console.log('More actions for:', row.UserID)} color="default">
                  <MoreIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default EnhancedTable;
