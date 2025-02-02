import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import SearchField from "../searchField";
import { visuallyHidden } from "@mui/utils";
import DropDownSelect from "../DropDownSelect";
import { TableRow, Stack } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import React, { useMemo, useState, } from "react";
import TableContainer from "@mui/material/TableContainer";
import TableSortLabel from "@mui/material/TableSortLabel";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TablePagination from "@mui/material/TablePagination";

interface Data {
  [key: string]: any;
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

interface HeadCell {
  id: keyof Data;
  label: string;
  numeric: boolean;
}

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
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
  searchParams?: any[];
  headCells?: HeadCell[];
}) {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<Order>("asc");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState<keyof Data>("calories");
  const [filteredRows, setFilteredRows] = useState<Data[]>(rows);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    console.log({ event });
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    console.log({ event });
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

  const visibleRows = useMemo(
    () =>
      [...filteredRows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, filteredRows]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();

    // Filter out rows based on search params
    const filtered = rows.filter((row) => {
      return Object.entries(row).some(([key, value]) => {
        if (typeof value === "string")
          return value.toLowerCase().includes(searchTerm) && searchParams?.includes(key);
        return false;
      });
    });
    setFilteredRows(filtered);
  }

  const handleSelectFilter = (option: string, label: string) => handleFilter(label, option);

  const handleFilter = (label: string, option: string) => {
    if (filterParams) {
      const filtered = rows.filter((row) => filterParams.action(label, option, row));
      setFilteredRows(filtered);
    }
  }

  return (
    <Box sx={{ width: "100%" }} className="flex flex-col gap-3">
      <div className="flex flex-col lg:flex-row lg:items-center md:justify-between gap-2">
        <div className="text-xl text-gray-700">{title}</div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          {/* Search Field */}
          {searchParams && searchParams.length > 0 && <SearchField onChange={handleSearch} />}
          {filterParams && filterParams.data?.length > 0 && (
            <div className="flex items-end gap-1">
              {filterParams.data.map((param, index) => (
                <DropDownSelect
                  key={index}
                  options={param.options}
                  label={param.label}
                  onSelected={handleSelectFilter}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Stack className="bg-white rounded-[8px] border" spacing={1}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy as string}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {visibleRows.map((row) => {
                return (
                  <React.Fragment key={row.id}>
                    <TableRow hover sx={{ cursor: "pointer" }}>
                      {headCells.map((cell, index) => (
                        <TableCell key={cell.id} align={cell.numeric ? "right" : "left"}>
                          {index === 0 && row?.metadata?.itemPhoto ? (
                            <div className="flex items-center gap-2">
                              <span className="flex w-8 h-8 bg-gray-400 rounded-full overflow-hidden">
                                <img
                                  alt=""
                                  className="w-8 h-8 rounded-full"
                                  src={row?.metadata?.itemPhoto || ""}
                                />
                              </span>
                              {row[cell.id]}
                            </div>
                          ) : // add action buttons if available
                          cell.id === "actions" ? (
                            <Stack direction="row">
                              <button
                                key={index + 1}
                                className="btn btn-primary"
                                aria-label={'loan details'}
                              >
                                {/* MUI three-dots menu icon */}
                                <MoreHorizIcon color="success" />
                              </button>
                            </Stack>
                          ) : (
                            row[cell.id]
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  </React.Fragment>
                );
              })}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={headCells.length + 1} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Stack>
    </Box>
  );
}

