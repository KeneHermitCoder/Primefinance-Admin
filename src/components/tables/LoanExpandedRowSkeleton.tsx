import { Box, Typography, Grid, Skeleton } from '@mui/material';

const LoanExpandedRowSkeleton = () => (
  <Box sx={{ padding: 2 }}>
    <Typography variant="h6" gutterBottom>Credit Check</Typography>
    <Grid container spacing={2}>
      {/* Group 1: Last Reported, Creditor Name, Total Debt, Account Type */}
      <Grid container item xs={12} spacing={2}>
        <Grid item xs={3}>
          <Typography variant="caption" sx={{ color: "gray" }}><strong>Last Reported:</strong></Typography>
          <Skeleton variant="text" width="80%" />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="caption" sx={{ color: "gray" }}><strong>Creditor Name:</strong></Typography>
          <Skeleton variant="text" width="80%" />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="caption" sx={{ color: "gray" }}><strong>Total Debt:</strong></Typography>
          <Skeleton variant="text" width="80%" />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="caption" sx={{ color: "gray" }}><strong>Account Type:</strong></Typography>
          <Skeleton variant="text" width="80%" />
        </Grid>
      </Grid>

      {/* Group 2: Outstanding Balance, Active Loan, Loans Taken, Income */}
      <Grid container item xs={12} spacing={2}>
        <Grid item xs={3}>
          <Typography variant="caption" sx={{ color: "gray" }}><strong>Outstanding Balance:</strong></Typography>
          <Skeleton variant="text" width="80%" />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="caption" sx={{ color: "gray" }}><strong>Active Loan:</strong></Typography>
          <Skeleton variant="text" width="80%" />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="caption" sx={{ color: "gray" }}><strong>Loans Taken:</strong></Typography>
          <Skeleton variant="text" width="80%" />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="caption" sx={{ color: "gray" }}><strong>Income:</strong></Typography>
          <Skeleton variant="text" width="80%" />
        </Grid>
      </Grid>

      {/* Group 3: Repayment History, Opened Date, Credit History Length, Remarks */}
      <Grid container item xs={12} spacing={2}>
        <Grid item xs={3}>
          <Typography variant="caption" sx={{ color: "gray" }}><strong>Repayment History:</strong></Typography>
          <Skeleton variant="text" width="80%" />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="caption" sx={{ color: "gray" }}><strong>Opened Date:</strong></Typography>
          <Skeleton variant="text" width="80%" />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="caption" sx={{ color: "gray" }}><strong>Credit History Length:</strong></Typography>
          <Skeleton variant="text" width="80%" />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="caption" sx={{ color: "gray" }}><strong>Remarks:</strong></Typography>
          <Skeleton variant="text" width="80%" />
        </Grid>
      </Grid>
    </Grid>
  </Box>
);

export default LoanExpandedRowSkeleton;