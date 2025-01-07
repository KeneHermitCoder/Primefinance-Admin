import { Box, Skeleton } from "@mui/material";

export default function KPILoadingSkeleton() {
  return (
    <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 md:divide-x-2 divide-y-2 lg:divide-y-0">
      {[...Array(6)].map((_, index) => (
        <Box
          key={index}
          // className={`flex flex-col items-center p-4 ${index === 0? 'rounded-l-xl': index === self.length - 1? 'rounded-r-xl': ''}`}
          className={`flex flex-col items-center p-4`}
          sx={{ textAlign: "center", backgroundColor: "white" }}
        >
          {/* Icon Skeleton */}
          <Skeleton variant="circular" width={40} height={40} />

          {/* Subtitle Skeleton */}
          <Skeleton variant="text" width={100} height={20} />

          {/* Total Skeleton */}
          <Skeleton variant="text" width={80} height={30} />
        </Box>
      ))}
    </Box>
  );
}