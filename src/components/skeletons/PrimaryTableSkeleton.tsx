import {
  Box,
  Stack,
  Table,
  Skeleton,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  TableContainer,
} from "@mui/material";

export default function PrimaryTableSkeleton() {
  return (
    <Box sx={{ width: "100%" }} className="flex flex-col gap-3">
      {/* Title and Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center md:justify-between gap-2">
        <Skeleton variant="text" animation='wave' width={150} height={30} />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          {/* Search Field */}
          <Skeleton variant="rounded"animation='wave' width={200} height={30} />
          <div className="flex items-end gap-1">
            {[...Array(2)].map((_, index) => (
              <Skeleton key={index} variant="rounded" animation='wave' width={100} height={25} />
            ))}
          </div>
        </div>
      </div>

      {/* Table Skeleton */}
      <Stack className="bg-white rounded-[8px] border" spacing={1}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }}>
            <TableHead>
              <TableRow>
                {[...Array(5)].map((_, index) => (
                  <TableCell key={index}>
                    <Skeleton variant="text" animation='wave' width={100} />
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {[...Array(5)].map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  {[...Array(5)].map((_, cellIndex) =>
                    cellIndex === 0 ? (
                      <TableCell>
                        <Stack direction='row' alignItems={'center'} spacing={1} width='90%'>
                          <Skeleton variant="circular" animation='wave' width={30} height={30} />
                          <Skeleton variant="text" width="80%" />
                        </Stack>
                      </TableCell>
                    ) : (
                      <TableCell key={cellIndex}>
                        <Skeleton variant="text" animation='wave' width="80%" />
                      </TableCell>
                    )
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination Skeleton */}
        <Skeleton variant="rectangular" animation='wave' width="100%" height={50} />
      </Stack>
    </Box>
  );
}
