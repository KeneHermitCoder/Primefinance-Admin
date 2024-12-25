import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";

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
  numSelected: number;
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

export default function MainTable({
  rows = [],
  // title = "Main Table",
  headCells = [],
}: {
  rows?: Data[];
  title?: string;
  headCells?: HeadCell[];
}) {
  const [page, setPage] = React.useState(0);
  const [order, setOrder] = React.useState<Order>("asc");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [orderBy, setOrderBy] = React.useState<keyof Data>("calories");
  const [selected] = React.useState<readonly number[]>([]);

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
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy as string}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            headCells={headCells}
          />
          <TableBody>
            {visibleRows.map((row) => {
              // const isItemSelected = selected.includes(row.id);
              // const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  // onClick={(event) => handleClick(row.id, event)}
                  role="checkbox"
                  // aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  // selected={isItemSelected}
                  sx={{ cursor: "pointer" }}
                >
                  {headCells.map((cell, index) => {
                    console.log({ cell });
                    return (
                      <TableCell
                        key={cell.id}
                        align={cell.numeric ? "right" : "left"}
                      >
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
                        ) : (
                          row[cell.id]
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
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
    </Box>
  );
}
