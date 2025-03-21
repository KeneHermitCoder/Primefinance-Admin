import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import { visuallyHidden } from "@mui/utils";
import DropDownSelect from "../DropDownSelect";
import { TableRow, Stack, IconButton, Avatar, Dialog, DialogContent, DialogTitle } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import LoanExpandableRow from "./LoanExpandedRow";
import React, { useMemo, useState, useEffect, useCallback } from "react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TableContainer from "@mui/material/TableContainer";
import TableSortLabel from "@mui/material/TableSortLabel";
import TablePagination from "@mui/material/TablePagination";
import { Skeleton } from "@mui/material";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import ClearIcon from '@mui/icons-material/Clear';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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

export default function LoanSearchFilterSortPaginateTable({
  rows = [],
  filterParams,
  headCells = [],
  title = "Table Title",
  searchParams,
  isLoading = false,
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
}) {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<string>('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredRows, setFilteredRows] = useState<Data[]>(rows);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<{[key: string]: string}>({});
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCustomerName, setSelectedCustomerName] = useState('');

  const handleExpandClick = (id: number) => {
    setExpandedRow((prevRow) => (prevRow === id ? null : id));
  };

  const handleImageClick = (photos: string | string[], customerName: string) => {
    const imageArray = Array.isArray(photos) ? photos : [photos];
    setSelectedImages(imageArray);
    setCurrentImageIndex(0);
    setSelectedCustomerName(customerName);
    setOpenImageDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenImageDialog(false);
    setSelectedImages([]);
    setCurrentImageIndex(0);
    setSelectedCustomerName('');
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : selectedImages.length - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev < selectedImages.length - 1 ? prev + 1 : 0));
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

  const clearSearch = () => {
    setSearchTerm('');
  };

  const clearFilters = () => {
    setFilters({});
  };

  const clearAll = () => {
    clearSearch();
    clearFilters();
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
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative">
            <TextField
              size="small"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              disabled={isLoading}
            />
            {searchTerm && (
              <IconButton
                size="small"
                onClick={clearSearch}
                sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            )}
          </div>
          {filterParams?.data.map((filter) => (
            <DropDownSelect
              key={filter.label}
              label={filter.label}
              options={filter.options}
              onSelected={(value: string) => handleFilter(filter.label, value)}
              value={filters[filter.label] || ''}
            />
          ))}
          {(searchTerm || Object.keys(filters).length > 0) && (
            <button
              onClick={clearAll}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Clear All
            </button>
          )}
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
                <React.Fragment key={`row-${index}`}>
                  <TableRow hover sx={{ cursor: "pointer" }}>
                    {headCells.map((headCell) => (
                      <TableCell key={`cell-${headCell.id}`} align={headCell.numeric ? "right" : "left"}>
                        {headCell.id === "customerName" ? (
                          <div className="flex items-center gap-2">
                            <Avatar 
                              src={Array.isArray(row.metadata?.itemPhoto) ? row.metadata?.itemPhoto[0] : row.metadata?.itemPhoto}
                              alt={row[headCell.id]}
                              sx={{ width: 32, height: 32, cursor: 'pointer' }}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (row.metadata?.itemPhoto) {
                                  handleImageClick(row.metadata.itemPhoto, row.customerName);
                                }
                              }}
                            />
                            {row[headCell.id]}
                          </div>
                        ) : headCell.id === "actions" ? (
                          <Stack direction="row">
                            <button
                              onClick={() => handleExpandClick(row.loanId)}
                              className="btn btn-primary"
                              aria-label="loan details"
                            >
                              <MoreHorizIcon color="success" />
                            </button>
                          </Stack>
                        ) : row[headCell.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                  {expandedRow === row.loanId && (
                    <TableCell colSpan={headCells.length}>
                      <LoanExpandableRow
                        loanDetails={{...row.loanDetails, loanId: row.loanId, userId: row.userId}}
                      />
                    </TableCell>
                  )}
                </React.Fragment>
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

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog 
        open={openImageDialog} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ 
          m: 0, 
          p: 2, 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
        }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 500 }}>
            {selectedCustomerName}'s Loan Documents
          </Typography>
          <IconButton
            onClick={handleCloseDialog}
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div className="relative">
            <img
              src={selectedImages[currentImageIndex]}
              alt={`Image ${currentImageIndex + 1}`}
              style={{ width: '100%', height: 'auto', maxHeight: '70vh', objectFit: 'contain' }}
            />
            {selectedImages.length > 1 && (
              <>
                <IconButton
                  onClick={handlePrevImage}
                  sx={{
                    position: 'absolute',
                    left: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(255, 255, 255, 0.8)',
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' },
                  }}
                >
                  <ArrowBackIosIcon />
                </IconButton>
                <IconButton
                  onClick={handleNextImage}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(255, 255, 255, 0.8)',
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' },
                  }}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </>
            )}
          </div>
          {selectedImages.length > 1 && (
            <Typography align="center" sx={{ mt: 2 }}>
              {currentImageIndex + 1} / {selectedImages.length}
            </Typography>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}