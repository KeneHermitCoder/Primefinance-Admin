import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import { visuallyHidden } from "@mui/utils";
import DropDownSelect from "../DropDownSelect";
import { TableRow, Stack } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import React, { useMemo, useState, useEffect, useCallback } from "react";
import TableContainer from "@mui/material/TableContainer";
import TableSortLabel from "@mui/material/TableSortLabel";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TablePagination from "@mui/material/TablePagination";
import { Skeleton } from "@mui/material";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

interface Data {
  [key: string]: any;
}

interface Action {
  label: string;
  onClick: (row: Data) => void;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  id: keyof Data;
  label: string;
  numeric: boolean;
}

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: string | number
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  headCells: HeadCell[];
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort, headCells } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={"normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function SearchFilterSortPaginateTable({
  rows = [],
  filterParams,
  headCells = [],
  title = "Table Title",
  searchParams,
  isLoading = false,
  actions,
}: {
  rows?: Data[];
  title?: string;
  filterParams?: {
    data: {
      label: string;
      options: string[];
    }[];
    action: (label: string, selected: any, option: any) => boolean;
  };
  searchParams?: string[];
  headCells?: HeadCell[];
  isLoading?: boolean;
  actions?: Action[];
}) {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<string>('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredRows, setFilteredRows] = useState<Data[]>(rows);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<{[key: string]: string}>({});
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<Data | null>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, row: Data) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleActionClick = (action: Action) => {
    if (selectedRow) {
      action.onClick(selectedRow);
      handleMenuClose();
    }
  };

  // Reset pagination when rows change
  useEffect(() => {
    setPage(0);
    setFilteredRows(rows);
  }, [rows]);

  // Handle search and filter
  useEffect(() => {
    let result = [...rows];

    // Apply search
    if (searchTerm) {
      result = result.filter((row) =>
        searchParams?.some((param) => {
          const value = row[param];
          return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
        })
      );
    }

    // Apply filters
    if (filterParams && Object.keys(filters).length > 0) {
      result = result.filter((row) => {
        return Object.entries(filters).every(([label, selected]) => {
          if (!selected) return true;
          return filterParams.action(label, selected, row);
        });
      });
    }

    setFilteredRows(result);
    setPage(0);
  }, [searchTerm, filters, rows, searchParams, filterParams]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (label: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [label]: value
    }));
  };

  const visibleRows = useMemo(() => {
    if (isLoading) return [];
    
    return stableSort(filteredRows, getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [filteredRows, order, orderBy, page, rowsPerPage, isLoading]);

  const handleRequestSort = useCallback((
    _: React.MouseEvent<unknown>,
    property: string | number,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property.toString());
  }, [order, orderBy]);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: "100%" }} className="flex flex-col gap-3">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Typography variant="h6" className="font-medium">
          {title}
        </Typography>
        <div className="flex flex-col md:flex-row gap-4">
          {searchParams && searchParams.length > 0 && (
            <TextField
              size="small"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              disabled={isLoading}
            />
          )}
          {filterParams?.data.map((filter) => (
            <DropDownSelect
              key={filter.label}
              label={filter.label}
              options={filter.options}
              onSelected={(value: string) => handleFilter(filter.label, value)}
            />
          ))}
        </div>
      </div>

      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={filteredRows.length}
            headCells={headCells}
          />
          <TableBody>
            {isLoading ? (
              [...Array(rowsPerPage)].map((_, index) => (
                <TableRow key={`skeleton-${index}`}>
                  {headCells.map((_, cellIndex) => (
                    <TableCell key={`skeleton-cell-${cellIndex}`}>
                      <Skeleton animation="wave" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : visibleRows.length > 0 ? (
              visibleRows.map((row: Data, index: number) => (
                <TableRow key={`row-${index}`} hover>
                  {headCells.map((headCell) => (
                    <TableCell key={`cell-${headCell.id}`} align={headCell.numeric ? "right" : "left"}>
                      {headCell.id === "actions" && actions ? (
                        <Stack direction="row">
                          <button
                            onClick={(e) => handleMenuClick(e, row)}
                            className="btn btn-primary"
                            aria-label="actions"
                          >
                            <MoreHorizIcon color="success" />
                          </button>
                        </Stack>
                      ) : row[headCell.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={headCells.length} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {actions?.map((action, index) => (
          <MenuItem 
            key={index}
            onClick={() => handleActionClick(action)}
          >
            {action.label}
          </MenuItem>
        ))}
      </Menu>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}