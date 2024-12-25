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
  Menu,
  MenuItem
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selected, setSelected] = React.useState<string[]>([]);

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    console.log({ event, })
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

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFlaggedAction = (userId: string) => {
    console.log('Flagged user:', userId);
  };

  const handleEditAction = (userId: string) => {
    console.log('Edit user:', userId);
  };

  const handleDropdownAction = (action: string) => {
    console.log(action);
    handleClose();
  };

  return (
    <TableContainer >
      <Table>
        <TableHead >
          <TableRow >
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
          </TableRow>
        </TableHead>
        <TableBody sx={{backgroundColor: '#fff'}}>
          {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
            <TableRow hover key={index} selected={isSelected(row.UserID)}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={isSelected(row.UserID)}
                  onChange={() => handleSelectRow(row.UserID)}
                />
              </TableCell>
              {columns.map((column) => {
                if (column.field === 'Actions') {
                  return (
                    <TableCell key={column.field}>
                      <IconButton onClick={handleClick}>
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={() => handleFlaggedAction(row.UserID)}>Flagged</MenuItem>
                        <MenuItem onClick={() => handleEditAction(row.UserID)}>Edit</MenuItem>
                        <MenuItem onClick={() => handleDropdownAction('Another Action')}>Another Action</MenuItem>
                      </Menu>
                    </TableCell>
                  );
                } else {
                  return <TableCell key={column.field}>{row[column.field]}</TableCell>;
                }
              })}
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
